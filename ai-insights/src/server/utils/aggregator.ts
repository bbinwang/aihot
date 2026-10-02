/**
 * AI 热点自动聚合管线(参考 source-article-to-feishu-md 技能方法论):
 *
 *   best.xiaohu.ai RSS → 文章页提取「来源 + 阅读原文(上游链接)」
 *   → 抓上游原文(.md 捷径 / GitHub README / HTML→MD)→ 智谱翻译成中文
 *   → 按 AIHot 格式自动发布 → 运行日志持久化供管理台汇报。
 *
 * 失败处理:上游抓取重试 3 次,仍失败记录原因,不发半成品,管理台人工处理。
 */
import fs from 'node:fs'
import path from 'node:path'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { createArticle } from './articles'
import { extractMarkdown } from './html2md'
import { translateMarkdown } from './translate'
import type { Fetcher } from './llm'

const XIAOHU_RSS = () => process.env.XIAOHU_RSS || 'https://best.xiaohu.ai/rss.xml'
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152 Safari/537.36'
/** 单次运行最多处理的文章数(安全上限) */
const MAX_PER_RUN = 30
/** 已处理 URL 记录上限 */
const MAX_PROCESSED = 1000
/** 运行历史保留条数 */
const MAX_RUNS = 50

export interface FeedItem {
  title: string
  link: string
  summary: string
  categories: string[]
  pubDate: string
  /** 是否付费(会员)文章:RSS 描述带会员推广尾,或会员列表页卡片 data-paid="1" */
  paid?: boolean
}

export interface ArticleSource {
  sourceName: string
  upstreamUrl?: string
  /** 上游链接的解析来源(仅在 upstreamUrl 存在时) */
  resolution?: 'read-original' | 'external-link'
}

export type RunItemStatus = 'published' | 'failed' | 'skipped'

export interface RunItem {
  title: string
  xiaohuUrl: string
  upstreamUrl?: string
  sourceName?: string
  status: RunItemStatus
  slug?: string
  error?: string
  /** 上游链接解析方式:阅读原文锚点 / 外链兜底 / 网络搜索 / 人工指定;兜底正文来源:CDP 渲染上游 / 小互解读站 / CDP 渲染小互页 */
  resolution?: 'read-original' | 'external-link' | 'web-search' | 'manual' | 'cdp' | 'xiaohu' | 'cdp-xiaohu'
}

export interface RunReport {
  id: string
  trigger: 'cron' | 'manual' | 'catchup'
  startedAt: string
  finishedAt: string
  durationMs: number
  discovered: number
  published: number
  failed: number
  skipped: number
  items: RunItem[]
  /** 运行类别,如 member(会员文章) */
  kind?: string
}

export interface AggregatorState {
  lastRunAt: string | null
  processedUrls: string[]
  publishedCount: number
  /** 最近一次「北京时间 23:59:59 槽位」定时运行覆盖的槽位时刻(手动运行不占槽位) */
  lastSlotAt: string | null
}

// ---------------------------------------------------------------------------
// 状态与运行日志持久化(content/aggregator/*.json)
// ---------------------------------------------------------------------------

export function aggregatorDir(): string {
  return process.env.AGGREGATOR_DIR || path.join(process.cwd(), 'content', 'aggregator')
}

function readJson<T>(file: string, fallback: T): T {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf-8')) as T
  } catch {
    return fallback
  }
}

export function readState(): AggregatorState {
  return readJson(path.join(aggregatorDir(), 'state.json'), {
    lastRunAt: null,
    processedUrls: [],
    publishedCount: 0,
    lastSlotAt: null,
  })
}

function writeState(state: AggregatorState): void {
  const dir = aggregatorDir()
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'state.json'), JSON.stringify(state, null, 2), 'utf-8')
}

export function listRuns(): RunReport[] {
  return readJson<RunReport[]>(path.join(aggregatorDir(), 'runs.json'), [])
}

function appendRun(report: RunReport): void {
  const dir = aggregatorDir()
  fs.mkdirSync(dir, { recursive: true })
  const runs = [report, ...listRuns()].slice(0, MAX_RUNS)
  fs.writeFileSync(path.join(dir, 'runs.json'), JSON.stringify(runs, null, 2), 'utf-8')
}

// ---------------------------------------------------------------------------
// 跨进程运行锁:dev 与 prod 服务可能共用同一 content 目录同时运行,
// 各自持有独立的进程内锁与槽位状态,会在北京 23:59:59 两边同时聚合造成重复。
// mkdir 的原子性(EEXIST)保证多进程下只有一个能创建锁目录。
// ---------------------------------------------------------------------------

/** 运行最长约 20 分钟(30 篇上限),超过 90 分钟视为崩溃残留,可被抢占 */
const RUN_LOCK_STALE_MS = 90 * 60_000

function lockDirPath(): string {
  return path.join(aggregatorDir(), 'run-lock')
}

function isPidAlive(pid: number): boolean {
  try {
    process.kill(pid, 0)
    return true
  } catch {
    return false
  }
}

/** 原子抢占跨进程锁;持有者进程已退出或锁超时则视为残留,清除后重抢一次 */
function acquireRunLock(): boolean {
  const dir = lockDirPath()
  try {
    fs.mkdirSync(dir)
  } catch (err) {
    if ((err as NodeJS.ErrnoException)?.code !== 'EEXIST') throw err
    try {
      const info = readJson<{ pid?: number; startedAt?: string }>(path.join(dir, 'lock.json'), {})
      const age = Date.now() - (info.startedAt ? Date.parse(info.startedAt) : fs.statSync(dir).birthtimeMs)
      const alive = typeof info.pid === 'number' && isPidAlive(info.pid)
      if (alive && age < RUN_LOCK_STALE_MS) return false
      fs.rmSync(dir, { recursive: true, force: true })
      fs.mkdirSync(dir)
    } catch {
      return false // 并发抢占等异常,保守放弃
    }
  }
  try {
    fs.writeFileSync(path.join(dir, 'lock.json'), JSON.stringify({ pid: process.pid, startedAt: new Date().toISOString() }))
  } catch { /* 锁信息写失败不影响互斥 */ }
  return true
}

function releaseRunLock(): void {
  fs.rmSync(lockDirPath(), { recursive: true, force: true })
}

/** 运行 ID:毫秒时间戳(base36)+ 随机尾缀。纯时间戳在多进程同毫秒启动时会撞号(曾致运行历史重复键) */
function newRunId(startedAt: Date): string {
  return `run-${startedAt.getTime().toString(36)}-${Math.random().toString(36).slice(2, 6)}`
}

// ---------------------------------------------------------------------------
// RSS 与文章页解析
// ---------------------------------------------------------------------------

function decodeEntities(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
}

/** 解析 best.xiaohu.ai 的 RSS 2.0 */
export function parseRss(xml: string): FeedItem[] {
  const items: FeedItem[] = []
  const blocks = xml.split(/<item>/i).slice(1)
  for (const block of blocks) {
    const seg = block.split(/<\/item>/i)[0]
    const pick = (re: RegExp): string => {
      const m = seg.match(re)
      return m ? decodeEntities(m[1]).trim() : ''
    }
    const title = pick(/<title>([\s\S]*?)<\/title>/i)
    const link = pick(/<link>([\s\S]*?)<\/link>/i)
    if (!title || !link) continue
    const summaryRaw = pick(/<description>([\s\S]*?)<\/description>/i)
    // 会员推广尾巴同时是会员文章的可靠标记:「… ｜ 完整解读为会员内容 → best.xiaohu.ai/membership/…」
    const paid = /完整解读为会员内容|best\.xiaohu\.ai\/membership/.test(summaryRaw)
    const summary = summaryRaw
      // 去掉小互 RSS 里的会员推广尾巴
      .replace(/\s*[||｜]\s*完整解读.*$/, '')
      .replace(/<[^>]+>/g, '')
    const categories = [...seg.matchAll(/<category>([\s\S]*?)<\/category>/gi)]
      .map(m => decodeEntities(m[1]).trim())
      .filter(Boolean)
    const pubDate = pick(/<pubDate>([\s\S]*?)<\/pubDate>/i)
    items.push({ title, link, summary, categories, pubDate, paid })
  }
  return items
}

/**
 * 从小互文章页 HTML 提取来源名与上游原文链接。
 * 主通道:「阅读原文 ↗」锚点;兜底:正文里第一条非本站外链。
 * 始终返回对象(至少含来源名),upstreamUrl 可能为空(会员文章需再搜索)。
 */
export function extractArticleSource(html: string, pageUrl = ''): ArticleSource {
  const srcMatch = html.match(/class="src"[^>]*>([^<]+)</)
  const sourceName = srcMatch ? srcMatch[1].trim() : ''

  // 主通道:阅读原文 锚点
  const readOriginal = html.match(/<a[^>]+href="(https?:\/\/[^"]+)"[^>]*>\s*阅读原文/)
  if (readOriginal) {
    return { sourceName, upstreamUrl: readOriginal[1], resolution: 'read-original' }
  }

  // 兜底:外链列表推断(过滤本站/统计/推送噪音)
  const selfHost = pageUrl ? new URL(pageUrl).hostname : 'xiaohu.ai'
  const noise = /xiaohu\.ai|cloudflare|sentry|t\.me|telegram|javascript:|^mailto:/i
  const links = [...html.matchAll(/href="(https?:\/\/[^"]+)"/g)].map(m => m[1])
  const upstream = links.find(u => {
    try {
      return !noise.test(u) && new URL(u).hostname !== selfHost
    } catch {
      return false
    }
  })
  if (upstream) return { sourceName, upstreamUrl: upstream, resolution: 'external-link' }
  return { sourceName }
}

/**
 * 会员文章常无「阅读原文」锚点,仅有「来源」名(如 "Higgsfield")。
 * 用来源名 + 文章标题在网页搜索,从对应站点找回上游原文链接。
 * 优先返回与来源名同域的结果;找不到返回 null(由调用方决定失败)。
 */
export async function findUpstreamBySearch(
  sourceName: string,
  title: string,
  opts: { fetcher?: Fetcher } = {},
): Promise<{ url: string; sourceName: string } | null> {
  const fetcher = opts.fetcher || (globalThis.fetch as unknown as Fetcher)
  const q = `${sourceName} ${title}`.trim().slice(0, 180)
  const searchUrl = `https://duckduckgo.com/html/?q=${encodeURIComponent(q)}`
  let results: { url: string; title: string }[] = []
  try {
    const html = await fetchText(searchUrl, { fetcher })
    results = [...html.matchAll(/result__a"[\s\S]*?href="([^"]+)"[\s\S]*?>([\s\S]*?)<\/a>/g)]
      .map(m => {
        let url = decodeEntities(m[1])
        // DuckDuckGo html 结果常包在 /l/?uddg=<encoded> 里
        const uddg = url.match(/[?&]uddg=([^&]+)/)
        if (uddg) url = decodeURIComponent(uddg[1])
        return { url, title: m[2].replace(/<[^>]+>/g, '').trim() }
      })
      .filter(r => /^https?:/.test(r.url))
  } catch {
    return null
  }

  // 候选域名:来源名里出现的域名片段(如 Higgsfield → higgsfield.ai)
  const nameDomain = sourceName.toLowerCase().replace(/[^a-z0-9]/g, '')
  const score = (r: { url: string; title: string }): number => {
    let s = 0
    try {
      const host = new URL(r.url).hostname.toLowerCase()
      if (nameDomain && host.includes(nameDomain)) s += 100
      if (sourceName && r.title.toLowerCase().includes(sourceName.toLowerCase())) s += 10
    } catch { /* ignore */ }
    return s
  }
  const ranked = results
    .filter(r => !/duckduckgo\.com|best\.xiaohu\.ai/.test(r.url))
    .map(r => ({ r, s: score(r) }))
    .sort((a, b) => b.s - a.s)
  if (!ranked.length) return null
  return { url: ranked[0].r.url, sourceName }
}

/** 「MM-DD」卡片日期 → 「YYYY-MM-DD」(无年份,按 now 推断;年初的 12-30 属上一年) */
function parseWhenDate(when: string, now: Date): string {
  const m = when.match(/(\d{1,2})-(\d{1,2})/)
  if (!m) return ''
  const mk = (y: number) => new Date(y, Number(m[1]) - 1, Number(m[2]))
  let d = mk(now.getFullYear())
  if (isNaN(d.getTime())) return ''
  if (d.getTime() - now.getTime() > 48 * 3600_000) d = mk(now.getFullYear() - 1)
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

/**
 * 解析会员文章列表页(/jiedu/?acc=paid)→ FeedItem[]。
 * 页面为整页文章卡片:每张卡 <a class="art-card" data-paid="1|0" href="/article/<slug>/"> 内含
 * 「来源 · <name>」、<h3>标题</h3>、<p class="dek">摘要</p> 与 <span class="when">MM-DD</span>。
 * 注意 ?acc=paid 的列表仍混有免费卡,付费与否以 data-paid/「🔒 会员」标记为准;
 * pubDate 由 .when 的 MM-DD 推断年份得到(无年份,调用方可注入 now 保证可测)。
 */
export function parseMemberListing(
  html: string,
  baseUrl = 'https://best.xiaohu.ai',
  now: Date = new Date(),
): FeedItem[] {
  const items: FeedItem[] = []
  const seen = new Set<string>()
  // 逐张卡片:按 art-card 锚点切分,每段取第一个 /article/<slug> 链接
  const segments = html.split(/<a class="art-card/).slice(1)
  for (const seg of segments) {
    const slug = seg.match(/href="\/article\/([\w-]+)\/?"/)?.[1]
    if (!slug) continue
    const link = `${baseUrl}/article/${slug}/`
    if (seen.has(link)) continue
    seen.add(link)
    const inner = seg
    const title = inner.match(/<h3[^>]*>([\s\S]*?)<\/h3>/)?.[1]
      ?.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim() || slug
    const dek = inner.match(/class="dek"[^>]*>([\s\S]*?)<\/p>/)?.[1]
      ?.replace(/<[^>]+>/g, '').trim() || ''
    const src = inner.match(/来源\s*·\s*([^<]+)</)?.[1]?.trim() || ''
    const cat = inner.match(/class="cat">[\s\S]*?<\/span>([^<]+)</)?.[1]?.trim()
    // 付费标记:锚点 data-paid="1" 为准,兜底看「🔒 会员」徽标
    const attrs = inner.slice(0, inner.indexOf('>') + 1)
    const paid = /data-paid="1"/.test(attrs) || /class="acc-flag paid"/.test(inner)
    const when = inner.match(/class="when[^"]*"[^>]*>([^<]+)</)?.[1] || ''
    items.push({
      title,
      link,
      summary: dek,
      categories: Array.from(new Set([cat, src, '会员'].filter(Boolean))),
      pubDate: parseWhenDate(when, now),
      paid,
    })
  }
  return items
}

/** Date → 「YYYY-MM-DD」(本机日历日) */
function dayKeyOf(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

export interface MemberPending {
  /** 待处理:倒推 24 小时内(日粒度)的新付费文章 */
  pending: FeedItem[]
  /** 窗口内但已处理过的付费文章(计入跳过明细,不重抓) */
  skipped: FeedItem[]
}

/**
 * 会员管线待处理列表:**倒推 24 小时到执行时刻**的新付费文章。
 * - 仅付费卡(paid === true);
 * - 列表日期只有 MM-DD(无时刻),窗口按日粒度取「执行时刻 -24h 所在日起至今」——
 *   宁可多看一天(processedUrls 去重兜底),不漏抓 21 点运行后到午夜发布的文章;
 * - 无日期的卡片无法判定「新」,不入待处理。
 */
export function pendingMemberItems(
  items: FeedItem[],
  processedUrls: string[],
  now: Date = new Date(),
): MemberPending {
  const since = dayKeyOf(new Date(now.getTime() - 24 * 3600_000))
  const pending: FeedItem[] = []
  const skipped: FeedItem[] = []
  for (const it of items) {
    if (it.paid !== true) continue
    const day = (it.pubDate || '').slice(0, 10)
    if (!day) continue
    // 窗口外的老文章不关心(既不待处理,也不计入跳过明细)
    if (day < since) continue
    if (processedUrls.includes(it.link)) {
      skipped.push(it)
      continue
    }
    pending.push(it)
  }
  return { pending: pending.slice(0, MAX_PER_RUN), skipped }
}

// ---------------------------------------------------------------------------
// 网络抓取
// ---------------------------------------------------------------------------

async function fetchText(
  url: string,
  opts: { fetcher?: Fetcher; timeoutMs?: number; headers?: Record<string, string> } = {},
): Promise<string> {
  const fetcher = opts.fetcher || (globalThis.fetch as unknown as Fetcher)
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), opts.timeoutMs ?? 25_000)
  try {
    const res = await fetcher(url, {
      headers: { 'user-agent': UA, accept: 'text/html,application/xhtml+xml,text/markdown,text/plain,*/*', ...(opts.headers || {}) },
      signal: controller.signal,
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.text()
  } finally {
    clearTimeout(timer)
  }
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

/** 抓小互页面:HTTPS 失败(SSL 握手坑)自动降级 HTTP */
async function fetchXiaohu(url: string, opts: { fetcher?: Fetcher } = {}): Promise<string> {
  try {
    return await fetchText(url, opts)
  } catch (err) {
    const httpUrl = url.replace(/^https:/, 'http:')
    if (httpUrl !== url) return fetchText(httpUrl, opts)
    throw err
  }
}

interface UpstreamResult {
  markdown: string
  strategy: 'github-readme' | 'md-suffix' | 'html' | 'llms-full'
}

/** 拦截页特征:地区限制 / 反爬盾 / 要求开 JS */
const GARBAGE_RE = /仅在某些地区可用|not available in (your|some) region|unusual traffic|access denied|just a moment|enable javascript|请开启 ?javascript|are you a robot|verify you are human|app unavailable/i

/** 内容有效性校验:拦截页判废,过短疑似空壳页 */
function assertUsableContent(markdown: string): void {
  const text = markdown.trim()
  if (GARBAGE_RE.test(text)) throw new Error('抓到疑似地区限制/反爬拦截页')
  if (text.length < 400) throw new Error(`正文过短(${text.length} 字符,疑似动态渲染页或拦截页)`)
}

/** 是否为「地区限制/拦截」类失败(用于触发代理兜底) */
function isBlockedError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err)
  return /地区限制|拦截页|正文过短|正文提取结果为空|HTTP 403|HTTP 404/.test(msg)
}

/**
 * 阅读器代理兜底:直连被地区限制/反爬拦截时,经代理从其他 IP 抓取。
 * 代理列表由 READER_PROXIES 配置(逗号分隔的 URL 前缀模板,含 {url} 占位)。
 */
const READER_PROXIES = () =>
  (process.env.READER_PROXIES || 'https://r.jina.ai/{url},https://api.allorigins.win/raw?url={url}')
    .split(',').map(s => s.trim()).filter(Boolean)

async function fetchViaProxies(url: string, fetcher: Fetcher): Promise<string | null> {
  for (const tpl of READER_PROXIES()) {
    if (!tpl.includes('{url}')) continue
    const proxyUrl = tpl.replace('{url}', encodeURIComponent(url))
    try {
      const text = await fetchText(proxyUrl, { fetcher, timeoutMs: 40_000 })
      if (text.trim().length > 400 && !GARBAGE_RE.test(text)) return text
    } catch { /* 尝试下一个代理 */ }
  }
  return null
}

/** llms-full.txt 全量文档缓存(同一 host 只取一次,文件常达数 MB) */
const llmsFullCache = new Map<string, string | null>()

/**
 * llms-full.txt 兜底:文档站(如 Anthropic platform.claude.com)对「单篇页面」做地区
 * 限制,但同一站点的 `llms-full.txt`(全量文档拼接)通常放行。它内含每篇文档的完整
 * 正文,且每篇以 `url: <原文地址>` 标注。命中时按原文 URL 抽取该篇正文。
 * 仅当请求 URL 恰好是该 llms-full.txt 内部登记的文档 URL 时才有意义。
 */
async function fetchViaLlmsFull(url: string, fetcher: Fetcher): Promise<string | null> {
  let host: string
  try { host = new URL(url).host } catch { return null }
  let full: string
  const cached = llmsFullCache.get(host)
  if (cached !== undefined) {
    if (cached === null) return null // 该 host 已判定:无 llms-full.txt 全量文档
    full = cached
  } else {
    try {
      full = await fetchText(`https://${host}/llms-full.txt`, { fetcher, timeoutMs: 60_000 })
    } catch { llmsFullCache.set(host, null); return null }
    if (full.length < 10_000) { llmsFullCache.set(host, null); return null } // 不像全量文档
    llmsFullCache.set(host, full)
  }
  // 定位本篇的 `url: <原文地址>` frontmatter 行(去掉 .md 归一化)。
  const needle = url.replace(/\.md$/, '')
  let at = full.indexOf(`\nurl: ${needle}\n`)
  if (at === -1) at = full.indexOf(`\nurl: ${needle}.md\n`)
  if (at === -1) return null
  // 向前找该 frontmatter 的开 `---`(本行之前最近的独立 `---` 行)。
  const fmOpen = full.lastIndexOf('\n---\n', at)
  if (fmOpen === -1) return null
  // 向后找 frontmatter 的闭 `---`(本行之后最近的独立 `---` 行),正文自其后开始。
  // `fmClose` 指向闭 `---` 前的换行符,5 字符的 `\n---\n` 之后即正文。
  const fmClose = full.indexOf('\n---\n', at + 1)
  const bodyStart = fmClose !== -1 ? fmClose + 5 : fmOpen
  // 正文到「下一篇文档」的 frontmatter 头(`\n---\ntitle: `)为止——正文内部的小节
  // 分隔线只有 `---` 而无 `title:`,不会被误切。createArticle 会另写 frontmatter,
  // 故此处只取正文,丢弃本篇自身的 frontmatter 头。
  const nextDoc = full.indexOf('\n---\ntitle: ', fmClose)
  const end = nextDoc !== -1 ? nextDoc : full.length
  const seg = full.slice(bodyStart, end).trim()
  if (seg.length < 400) return null
  return seg
}

async function fetchUpstreamOnce(url: string, fetcher: Fetcher): Promise<UpstreamResult> {
  // 策略 1:GitHub 仓库根路径 → README 原文(国内直连可达)
  const gh = url.match(/^https?:\/\/(?:www\.)?github\.com\/([\w.-]+)\/([\w.-]+)\/?$/)
  if (gh) {
    try {
      const readme = await fetchText(`https://api.github.com/repos/${gh[1]}/${gh[2]}/readme`, {
        fetcher,
        headers: { accept: 'application/vnd.github.raw+json' },
      })
      if (readme.trim()) return { markdown: readme, strategy: 'github-readme' }
    } catch { /* 落到下一策略 */ }
  }

  // 策略 2:.md 后缀捷径(llms.txt 风格文档站)
  if (!/\.(md|png|jpe?g|gif|pdf|zip)$/i.test(url)) {
    try {
      const md = await fetchText(url.replace(/\/$/, '') + '.md', { fetcher })
      if (md.trim().length > 50 && !/^\s*<(!doctype|html)/i.test(md)) {
        assertUsableContent(md)
        return { markdown: md, strategy: 'md-suffix' }
      }
    } catch { /* 落到 HTML 策略 */ }
  }

  // 策略 3:HTML → Markdown
  const html = await fetchText(url, { fetcher })
  const markdown = extractMarkdown(html, url)
  if (!markdown.trim()) throw new Error('正文提取结果为空')
  assertUsableContent(markdown)
  return { markdown, strategy: 'html' }
}

/** 抓上游原文,整体重试 3 次(指数退避) */
export async function fetchUpstreamMarkdown(
  url: string,
  opts: { fetcher?: Fetcher } = {},
): Promise<UpstreamResult> {
  const fetcher = opts.fetcher || (globalThis.fetch as unknown as Fetcher)
  let lastError: unknown
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      return await fetchUpstreamOnce(url, fetcher)
    } catch (err) {
      lastError = err
      // 地区限制/反爬拦截 → 阅读器代理兜底
      if (isBlockedError(err)) {
        const proxied = await fetchViaProxies(url, fetcher)
        if (proxied) {
          try {
            const markdown = extractMarkdown(proxied, url)
            assertUsableContent(markdown)
            return { markdown, strategy: 'html' }
          } catch { /* 代理内容也不可用,继续重试 */ }
        }
        // 文档站单篇被地区限制 → llms-full.txt 全量文档兜底(同站通常放行)
        const llmsFull = await fetchViaLlmsFull(url, fetcher)
        if (llmsFull) {
          assertUsableContent(llmsFull)
          return { markdown: llmsFull, strategy: 'llms-full' }
        }
      }
      if (attempt < 3) await sleep(1500 * attempt)
    }
  }
  throw new Error(`上游原文抓取失败(已重试3次): ${lastError instanceof Error ? lastError.message : String(lastError)}`)
}

// ---------------------------------------------------------------------------
// 分级兜底:上游原文(重试 3 次)失败后,会员/非会员文章走不同的降级路线
//   会员文章   → 先 CDP 真浏览器渲染直爬上游原文;上游登录墙/反爬拿不到时,
//                最后兜底取小互解读站正文(解读页正文公开可读),避免漏文
//   非会员文章 → 直接用公开的小互解读站正文(先纯 HTTP,再 CDP 渲染小互页兜底)
// CDP 经 ego-browser(本机 Chromium,CDP 协议驱动)执行,可用 CDP_FETCH=0 停用。
// ---------------------------------------------------------------------------

/** 浏览器渲染抓取:url → 渲染后的完整 HTML(可注入 mock 用于测试) */
export type BrowserFetcher = (url: string) => Promise<string>

const execFileAsync = promisify(execFile)
const CDP_HTML_MARKER = '__AIHOT_HTML__'
let egoBrowserMissing = false

/** 经 ego-browser(CDP)渲染页面取回 HTML;登录墙/断网/未安装时抛错 */
export async function fetchHtmlViaBrowser(url: string): Promise<string> {
  if (egoBrowserMissing || process.env.CDP_FETCH === '0') {
    throw new Error('CDP 兜底不可用(未安装 ego-browser 或已设 CDP_FETCH=0)')
  }
  const script = `
const task = await taskSpace("aihot-aggregator")
const page = task.page("p1")
await page.goto(${JSON.stringify(url)}, { waitUntil: "domcontentloaded", timeout: 60000 })
try { await page.waitForFunction(() => ((document.body && document.body.innerText) || "").trim().length > 500, null, { timeout: 20000 }) } catch {}
const html = await page.evaluate(() => document.documentElement.outerHTML)
console.log(${JSON.stringify(CDP_HTML_MARKER)} + btoa(unescape(encodeURIComponent(html))))
`.trim()
  let stdout: string
  try {
    ;({ stdout } = await execFileAsync('ego-browser', ['nodejs', '-e', script], {
      timeout: 110_000,
      maxBuffer: 30 * 1024 * 1024,
    }))
  } catch (err) {
    if ((err as NodeJS.ErrnoException)?.code === 'ENOENT') {
      egoBrowserMissing = true
      throw new Error('CDP 兜底不可用(未找到 ego-browser 命令)')
    }
    throw new Error(`CDP 渲染失败: ${(err as Error).message?.slice(0, 200)}`)
  }
  const line = stdout.split('\n').find(l => l.includes(CDP_HTML_MARKER))
  const b64 = line?.slice(line.indexOf(CDP_HTML_MARKER) + CDP_HTML_MARKER.length).trim()
  if (!b64) throw new Error('CDP 渲染结果为空')
  return Buffer.from(b64, 'base64').toString('utf-8')
}

/** 小互文章页 → 解读正文 Markdown(正文位于 <article class="article-body"> 内,其后紧跟 .body-end 标记) */
function extractXiaohuBody(html: string, url: string): string {
  const start = html.indexOf('article-body')
  if (start !== -1) {
    const open = html.lastIndexOf('<', start)
    const close = html.indexOf('</article>', start)
    if (open !== -1 && close !== -1) {
      return extractMarkdown(html.slice(open, close + '</article>'.length), url)
    }
  }
  return extractMarkdown(html, url)
}

/** 兜底取小互解读站正文:先纯 HTTP,失败再 CDP 渲染小互页;两者都拿不到时抛错 */
async function fetchViaXiaohu(
  item: FeedItem,
  opts: { fetcher?: Fetcher; browserFetcher?: BrowserFetcher },
): Promise<{ markdown: string; note: string; resolution: RunItem['resolution'] }> {
  const browser = opts.browserFetcher || fetchHtmlViaBrowser
  try {
    const pageHtml = await fetchXiaohu(item.link, { fetcher: opts.fetcher })
    const markdown = extractXiaohuBody(pageHtml, item.link)
    assertUsableContent(markdown)
    return { markdown, note: '正文取自小互 AI 解读', resolution: 'xiaohu' }
  } catch {
    const pageHtml = await browser(item.link)
    const markdown = extractXiaohuBody(pageHtml, item.link)
    assertUsableContent(markdown)
    return { markdown, note: '正文取自小互 AI 解读(CDP 渲染)', resolution: 'cdp-xiaohu' }
  }
}

/** 分级抓取正文:上游(重试 3 次)→ 会员:CDP 直爬原文 / 非会员:小互解读站(纯 HTTP → CDP) */
async function fetchTieredContent(
  item: FeedItem,
  source: { sourceName: string; upstreamUrl: string },
  opts: { fetcher?: Fetcher; browserFetcher?: BrowserFetcher; resolution?: RunItem['resolution'] },
): Promise<{ markdown: string; note?: string; resolution?: RunItem['resolution'] }> {
  let upErr: unknown
  try {
    const upstream = await fetchUpstreamMarkdown(source.upstreamUrl, { fetcher: opts.fetcher })
    if (!upstream.markdown.trim()) throw new Error('上游原文内容为空')
    return { markdown: upstream.markdown, resolution: opts.resolution }
  } catch (err) {
    upErr = err
  }

  const upMsg = upErr instanceof Error ? upErr.message : String(upErr)
  const browser = opts.browserFetcher || fetchHtmlViaBrowser
  const bail = (tierErr: unknown): Error =>
    new Error(`${upMsg};分级兜底亦失败: ${tierErr instanceof Error ? tierErr.message : String(tierErr)}`)

  if (!item.paid) {
    // 非会员文章:小互解读站正文公开,直接降级取解读(纯 HTTP → CDP 渲染)
    try {
      return await fetchViaXiaohu(item, { fetcher: opts.fetcher, browserFetcher: opts.browserFetcher })
    } catch (tierErr) {
      throw bail(tierErr)
    }
  }

  // 会员文章:内容源优先上游原文 → CDP 渲染直爬;上游登录墙/反爬拿不到时,
  // 最后兜底取小互解读站正文(解读页正文公开可读),避免「会员 + 上游登录墙」组合漏文
  try {
    const html = await browser(source.upstreamUrl)
    const markdown = extractMarkdown(html, source.upstreamUrl)
    assertUsableContent(markdown)
    return { markdown, note: '上游多次抓取失败,正文经 CDP 浏览器渲染获取', resolution: 'cdp' }
  } catch {
    try {
      const viaXiaohu = await fetchViaXiaohu(item, { fetcher: opts.fetcher, browserFetcher: opts.browserFetcher })
      return { ...viaXiaohu, note: '上游原文多次抓取失败(含登录墙/反爬,CDP 渲染亦无法获取),正文取自小互 AI 解读' }
    } catch (xiaohuErr) {
      throw bail(`CDP 爬原文与解析小互解读均失败: ${xiaohuErr instanceof Error ? xiaohuErr.message : String(xiaohuErr)}`)
    }
  }
}

// ---------------------------------------------------------------------------
// 文章组装与发布
// ---------------------------------------------------------------------------

/** 上游标题降一级,避免与站点详情页的大标题重复 */
function demoteHeadings(md: string): string {
  return md.replace(/^(#{1,5}) /gm, (m, hashes: string) => `${'#'.repeat(Math.min(6, hashes.length + 1))} `)
}

function composeBody(opts: {
  upstreamUrl: string
  sourceName: string
  viaLabel: string
  viaUrl?: string
  pubDate?: string
  translated: boolean
  content: string
  /** 兜底策略说明(如「正文取自小互 AI 解读」),追加在说明行 */
  note?: string
}): string {
  const lines = [
    `> **原文链接**: [${opts.upstreamUrl}](${opts.upstreamUrl})`,
    `> **来源**: ${opts.sourceName}`,
  ]
  if (opts.viaUrl) lines.push(`> **发现于**: [${opts.viaLabel}](${opts.viaUrl})${opts.pubDate ? ` · ${opts.pubDate}` : ''}`)
  else lines.push(`> **发现于**: ${opts.viaLabel}${opts.pubDate ? ` · ${opts.pubDate}` : ''}`)
  lines.push(`> **说明**: 本文由 AIHot 自动聚合${opts.translated ? ',并由 GLM 翻译为中文(保留全部代码与链接)' : '(原文即中文,未翻译)'}${opts.note ? `。${opts.note}` : ''}`)
  return `${lines.join('\n')}\n\n---\n\n${demoteHeadings(opts.content.trim())}`
}

async function publishFromUpstream(opts: {
  title: string
  tags: string[]
  summary: string
  date?: string
  slug?: string
  upstreamUrl: string
  sourceName: string
  viaLabel: string
  viaUrl?: string
  markdown: string
  note?: string
  fetcher?: Fetcher
}): Promise<{ slug: string; translated: boolean }> {
  const outcome = await translateMarkdown(opts.markdown, { fetcher: opts.fetcher })
  const body = composeBody({
    upstreamUrl: opts.upstreamUrl,
    sourceName: opts.sourceName,
    viaLabel: opts.viaLabel,
    viaUrl: opts.viaUrl,
    pubDate: opts.date ? new Date(opts.date).toLocaleDateString('zh-CN') : undefined,
    translated: !outcome.skipped,
    content: outcome.text,
    note: opts.note,
  })
  const meta = createArticle({
    title: opts.title,
    markdown: body,
    tags: opts.tags,
    summary: opts.summary || undefined,
    date: opts.date,
    slug: opts.slug,
  })
  return { slug: meta.slug, translated: !outcome.skipped }
}

// ---------------------------------------------------------------------------
// 主流程
// ---------------------------------------------------------------------------

/** 单篇小互文章:溯源 → 抓原文(分级兜底)→ 翻译 → 发布 */
async function processItem(
  item: FeedItem,
  opts: { fetcher?: Fetcher; viaLabel?: string; searchFallback?: boolean; browserFetcher?: BrowserFetcher },
): Promise<RunItem> {
  const base: RunItem = { title: item.title, xiaohuUrl: item.link, status: 'failed' }
  let source: ArticleSource | null = null
  let resolution: RunItem['resolution']
  let title = item.title
  try {
    const page = await fetchXiaohu(item.link, opts)
    // 限定模式(仅给 URL)时标题为空,从文章页 <title>/h1 补齐
    if (!title.trim()) {
      title = (page.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1] || '')
        .replace(/\s*[·|]\s*小互.*$/, '').replace(/<[^>]+>/g, '').trim()
        || page.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]?.replace(/<[^>]+>/g, '').trim()
        || ''
    }
    base.title = title
    source = extractArticleSource(page, item.link)
    if (source.upstreamUrl) {
      resolution = source.resolution
    } else if (opts.searchFallback) {
      // 会员文章:无「阅读原文」锚点,用「来源」名做网络搜索找回上游链接
      const sourceName = source?.sourceName || ''
      if (!sourceName) throw new Error('会员文章缺少「来源」名,无法溯源')
      const found = await findUpstreamBySearch(sourceName, title, opts)
      if (!found) throw new Error('网络搜索未找到上游原文链接')
      source = { sourceName: found.sourceName, upstreamUrl: found.url, resolution: 'external-link' }
      resolution = 'web-search'
    } else {
      throw new Error('未能提取上游原文链接')
    }

    const fetched = await fetchTieredContent(item, { sourceName: source.sourceName, upstreamUrl: source.upstreamUrl }, {
      fetcher: opts.fetcher,
      browserFetcher: opts.browserFetcher,
      resolution,
    })

    // 会员文章优先挂「会员」标签(避免被 8 个上限截掉)
    const tags = Array.from(new Set([...(item.paid ? ['会员'] : []), ...item.categories, '聚合'])).slice(0, 8)
    const slugHint = item.link.match(/\/article\/([^/]+)\/?$/)?.[1]
    const { slug } = await publishFromUpstream({
      title,
      tags,
      summary: item.summary.slice(0, 120),
      date: item.pubDate || undefined,
      slug: slugHint,
      upstreamUrl: source.upstreamUrl,
      sourceName: source.sourceName || new URL(source.upstreamUrl).hostname,
      viaLabel: opts.viaLabel || '小互 · AI 解读站',
      viaUrl: item.link,
      markdown: fetched.markdown,
      note: fetched.note,
      fetcher: opts.fetcher,
    })
    return { ...base, status: 'published', slug, upstreamUrl: source.upstreamUrl, sourceName: source.sourceName, resolution: fetched.resolution }
  } catch (err) {
    // 失败也要带上已溯源到的上游链接,管理台「待人工处理」才能一键重爬
    return {
      ...base,
      upstreamUrl: source?.upstreamUrl,
      sourceName: source?.sourceName || undefined,
      resolution,
      error: err instanceof Error ? err.message : String(err),
    }
  }
}

// ---------------------------------------------------------------------------
// 北京时间 23:59:59 定时槽位(严格遵循,与宿主机时区无关)
// ---------------------------------------------------------------------------

/** 北京时间(UTC+8,无夏令时)最近一个**已过去**的 23:59:59,返回其 UTC 时刻 */
export function lastBeijingSlot(now: Date = new Date()): Date {
  const t = now.getTime()
  const bj = new Date(t + 8 * 3_600_000) // 此刻的北京墙上时间
  // 北京当天 23:59:59 = UTC 当天 15:59:59
  const slot = Date.UTC(bj.getUTCFullYear(), bj.getUTCMonth(), bj.getUTCDate(), 15, 59, 59, 0)
  return new Date(slot > t ? slot - 86_400_000 : slot)
}

/** 槽位门控:返回待运行的槽位(最近一个北京 23:59:59);null = 本槽位已运行,无需执行 */
export function dueSlot(state: AggregatorState, now: Date = new Date()): Date | null {
  const slot = lastBeijingSlot(now).getTime()
  const last = state.lastSlotAt ? Date.parse(state.lastSlotAt) : 0
  return last < slot ? new Date(slot) : null
}

/** 进程内运行锁:同一时刻只允许一次聚合(catchup/手动触发/cron 可能并发,RSS 与会员管线共用) */
let runInFlight = false

/**
 * 执行一次聚合(定时/手动/补跑共用,统一单管线)。
 * 待处理列表 = RSS 中 pubDate 落在「执行时刻 -24h ~ 执行时刻」的所有文章;
 * 会员文章(RSS 描述带会员推广尾)自动加「会员」标签,无「阅读原文」时用「来源」名网络搜索溯源。
 */
export async function runAggregation(
  trigger: RunReport['trigger'],
  opts: { fetcher?: Fetcher; now?: Date; browserFetcher?: BrowserFetcher } = {},
): Promise<RunReport> {
  if (runInFlight) throw new Error('上一次聚合仍在执行中,请稍后再试')
  if (!acquireRunLock()) throw new Error('另一聚合进程正在运行(dev/prod 服务共用数据目录时互斥),请稍后再试')
  runInFlight = true
  try {
    return await doRunAggregation(trigger, opts)
  } finally {
    runInFlight = false
    releaseRunLock()
  }
}

async function doRunAggregation(
  trigger: RunReport['trigger'],
  opts: { fetcher?: Fetcher; now?: Date; browserFetcher?: BrowserFetcher } = {},
): Promise<RunReport> {
  const startedAt = new Date()
  const report: RunReport = {
    id: newRunId(startedAt),
    trigger,
    startedAt: startedAt.toISOString(),
    finishedAt: '',
    durationMs: 0,
    discovered: 0,
    published: 0,
    failed: 0,
    skipped: 0,
    items: [],
  }

  if (process.env.AGGREGATOR_ENABLED === '0') {
    report.finishedAt = new Date().toISOString()
    report.items = [{ title: '(聚合已停用 AGGREGATOR_ENABLED=0)', xiaohuUrl: '', status: 'skipped' }]
    report.skipped = 1
    appendRun(report)
    return report
  }

  const state = readState()

  try {
    const xml = await (async () => {
      try {
        return await fetchText(XIAOHU_RSS(), opts)
      } catch (err) {
        const httpUrl = XIAOHU_RSS().replace(/^https:/, 'http:')
        if (httpUrl !== XIAOHU_RSS()) return fetchText(httpUrl, opts)
        throw err
      }
    })()
    const all = parseRss(xml)

    // 统一 24 小时窗口:执行时刻 -24h ~ 执行时刻(按 RSS pubDate;留 5 分钟时钟偏差容差)
    const now = opts.now || startedAt
    const sinceMs = now.getTime() - 24 * 3600_000
    const inWindow = (item: FeedItem): boolean => {
      const t = item.pubDate ? Date.parse(item.pubDate) : now.getTime()
      return t >= sinceMs && t <= now.getTime() + 5 * 60_000
    }

    // 窗口内且未处理过;已处理过的直接跳过(不再重抓/重译/重发)
    const fresh = all.filter(item => inWindow(item) && !state.processedUrls.includes(item.link))
      .slice(0, MAX_PER_RUN)

    report.discovered = fresh.length
    const processed: string[] = []

    for (const item of fresh) {
      // 会员文章:允许无「阅读原文」锚点时用「来源」名做网络搜索溯源
      const result = await processItem(item, { ...opts, searchFallback: item.paid === true })
      report.items.push(result)
      if (result.status === 'published') report.published++
      else if (result.status === 'failed') report.failed++
      else report.skipped++
      // 仅成功(或跳过)才记「已处理」;失败的不标记,留在 24h 窗口内由下次运行自动重试
      // (2026-09-30 教训:豆包一文 09-29 失败后被永久标记,09-30 直接跳过导致缺文)
      if (result.status !== 'failed') processed.push(item.link)
      await sleep(1000) // 对上游站点保持礼貌
    }
    // 窗口内已处理过的文章计入跳过(仅明细,不重抓)
    for (const item of all) {
      if (inWindow(item) && state.processedUrls.includes(item.link)) {
        report.skipped++
        report.items.push({ title: item.title, xiaohuUrl: item.link, status: 'skipped' })
      }
    }

    // 已处理记录(无论成败,不再重复)
    state.processedUrls = Array.from(new Set([...processed, ...state.processedUrls])).slice(0, MAX_PROCESSED)
    state.publishedCount += report.published
  } catch (err) {
    report.failed += 1
    report.items.push({
      title: '(RSS 获取失败)',
      xiaohuUrl: XIAOHU_RSS(),
      status: 'failed',
      error: err instanceof Error ? err.message : String(err),
    })
  }

  report.finishedAt = new Date().toISOString()
  report.durationMs = Date.parse(report.finishedAt) - Date.parse(report.startedAt)
  state.lastRunAt = report.finishedAt
  writeState(state)
  appendRun(report)
  return report
}

/**
 * 会员文章聚合:从 /jiedu/?acc=paid 列表页提取会员文章,
 * 待处理列表 = **倒推 24 小时到执行时刻的新付费文章**(见 pendingMemberItems);
 * 逐篇溯源(无「阅读原文」时用「来源」名做网络搜索)→ 抓原文 → 翻译 → 发布。
 * 可传入 urls 限定只处理指定文章(测试集/重爬,不受窗口与付费过滤限制)。
 */
export async function runMemberAggregation(
  trigger: RunReport['trigger'],
  opts: { fetcher?: Fetcher; urls?: string[]; baseUrl?: string; now?: Date; browserFetcher?: BrowserFetcher } = {},
): Promise<RunReport> {
  if (runInFlight) throw new Error('上一次聚合仍在执行中,请稍后再试')
  if (!acquireRunLock()) throw new Error('另一聚合进程正在运行(dev/prod 服务共用数据目录时互斥),请稍后再试')
  runInFlight = true
  try {
    return await doRunMemberAggregation(trigger, opts)
  } finally {
    runInFlight = false
    releaseRunLock()
  }
}

async function doRunMemberAggregation(
  trigger: RunReport['trigger'],
  opts: { fetcher?: Fetcher; urls?: string[]; baseUrl?: string; now?: Date; browserFetcher?: BrowserFetcher } = {},
): Promise<RunReport> {
  const startedAt = new Date()
  const report: RunReport = {
    id: newRunId(startedAt),
    trigger,
    kind: 'member',
    startedAt: startedAt.toISOString(),
    finishedAt: '',
    durationMs: 0,
    discovered: 0,
    published: 0,
    failed: 0,
    skipped: 0,
    items: [],
  }

  const baseUrl = opts.baseUrl || 'https://best.xiaohu.ai'
  let pending: FeedItem[] = []
  let windowSkipped: FeedItem[] = []
  try {
    if (opts.urls?.length) {
      // 限定模式:仅处理指定 URL(标题稍后从文章页补齐),不受窗口/付费过滤限制
      pending = opts.urls.map(u => ({
        title: '',
        link: u.startsWith('http') ? u : `${baseUrl}/article/${u}/`,
        summary: '',
        categories: ['会员'],
        pubDate: '',
        paid: true,
      }))
    } else {
      const listing = await fetchXiaohu(`${baseUrl}/jiedu/?acc=paid`, opts)
      const all = parseMemberListing(listing, baseUrl, opts.now || startedAt)
      // 待处理 = 倒推 24 小时内的新付费文章;窗口内已处理的只记跳过明细
      const state0 = readState()
      const picked = pendingMemberItems(all, state0.processedUrls, opts.now || startedAt)
      pending = picked.pending
      windowSkipped = picked.skipped
    }
  } catch (err) {
    report.failed += 1
    report.items.push({
      title: '(会员列表获取失败)',
      xiaohuUrl: `${baseUrl}/jiedu/?acc=paid`,
      status: 'failed',
      error: err instanceof Error ? err.message : String(err),
    })
    report.finishedAt = new Date().toISOString()
    report.durationMs = Date.parse(report.finishedAt) - Date.parse(report.startedAt)
    appendRun(report)
    return report
  }

  const state = readState()
  const processed: string[] = []
  report.discovered = pending.length

  for (const item of pending) {
    const result = await processItem(item, {
      fetcher: opts.fetcher,
      browserFetcher: opts.browserFetcher,
      viaLabel: '小互 · 会员解读',
      searchFallback: true,
    })
    report.items.push(result)
    if (result.status === 'published') report.published++
    else if (result.status === 'failed') report.failed++
    else report.skipped++
    // 同统一管线:失败不标记已处理,保持可重试
    if (result.status !== 'failed') processed.push(item.link)
    await sleep(1000)
  }
  // 窗口内已处理过的付费文章:计入跳过明细(不重抓/重译/重发)
  for (const item of windowSkipped) {
    report.skipped++
    report.items.push({ title: item.title, xiaohuUrl: item.link, status: 'skipped' })
  }

  state.processedUrls = Array.from(new Set([...processed, ...state.processedUrls])).slice(0, MAX_PROCESSED)
  state.publishedCount += report.published
  report.finishedAt = new Date().toISOString()
  report.durationMs = Date.parse(report.finishedAt) - Date.parse(report.startedAt)
  state.lastRunAt = report.finishedAt
  writeState(state)
  appendRun(report)
  return report
}

export interface ScheduledRunResult {
  ran: boolean
  /** 本次覆盖的北京 23:59:59 槽位时刻(ran 时存在) */
  slot?: string
  /** 未运行原因(ran=false 时存在) */
  reason?: string
  report?: RunReport
}

/**
 * 定时统一入口(每天**北京时间 23:59:59** 严格一次,单管线):
 * cron 触发 + 槽位门控(dueSlot)共同保证——任一宿主机时区下,
 * 每个北京 23:59:59 槽位恰好执行一次统一聚合(RSS 24h 窗口,会员文章带「会员」标签),
 * 错过的槽位(睡眠/停机)在启动补跑或下一个整点补上。
 * 手动触发不走此入口,也不占槽位(state.lastSlotAt 仅在此推进)。
 */
export async function runScheduledAggregation(
  trigger: 'cron' | 'catchup',
  opts: { fetcher?: Fetcher; now?: Date } = {},
): Promise<ScheduledRunResult> {
  const slot = dueSlot(readState(), opts.now || new Date())
  if (!slot) return { ran: false, reason: '北京时间 23:59:59 槽位已运行,本次跳过' }

  // 统一单管线;因运行锁冲突等抛错则不推进槽位,下个整点重试
  const report = await runAggregation(trigger, opts)

  const state = readState()
  state.lastSlotAt = slot.toISOString()
  writeState(state)
  return { ran: true, slot: state.lastSlotAt, report }
}

/** 手动爬取:任意 URL → 抓原文 → 翻译 → 发布 */
export async function crawlAndPublish(
  url: string,
  opts: { title?: string; tags?: string[]; summary?: string; fetcher?: Fetcher } = {},
): Promise<{ slug: string; translated: boolean }> {
  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    throw new Error(`URL 无效: ${url}`)
  }
  if (!/^https?:$/.test(parsed.protocol)) throw new Error('仅支持 http/https 链接')

  const upstream = await fetchUpstreamMarkdown(url, opts)
  const title = (opts.title || '').trim() ||
    upstream.markdown.match(/^#\s+(.+)$/m)?.[1]?.trim() ||
    parsed.hostname
  const tags = Array.from(new Set([...(opts.tags || []), '聚合'])).slice(0, 8)

  return publishFromUpstream({
    title: title.slice(0, 100),
    tags,
    summary: (opts.summary || '').slice(0, 120),
    upstreamUrl: url,
    sourceName: parsed.hostname,
    viaLabel: '管理台手动提交',
    markdown: upstream.markdown,
    fetcher: opts.fetcher,
  })
}
