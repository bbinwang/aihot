import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { runAggregation, readState } from '../src/server/utils/aggregator'
import type { Fetcher } from '../src/server/utils/llm'

/**
 * 冒烟用例:回放 2026-09-30 北京 23:59:59 那次真实聚合(5 篇文章,真实上游与失败原因)。
 * 当晚实际结果:EmDash 发布,OpenAI 两篇 403、YouTube 不可达、豆包(飞书文档登录墙,
 * 且 09-29 失败后被误标已处理)全部缺文。
 * 分级兜底上线后的预期结果:5 篇全部发布 —— 失败的 4 篇非会员文章降级取小互解读站正文。
 * 后续改动聚合管线,必须跑通本用例:npm run smoke
 */

let articlesDir: string
let aggDir: string

beforeAll(() => {
  articlesDir = fs.mkdtempSync(path.join(os.tmpdir(), 'aihot-smoke-articles-'))
  aggDir = fs.mkdtempSync(path.join(os.tmpdir(), 'aihot-smoke-state-'))
  process.env.ARTICLES_DIR = articlesDir
  process.env.AGGREGATOR_DIR = aggDir
  process.env.ZHIPU_API_KEY = 'test-key'
  process.env.CDP_FETCH = '0'
})

type Route = { match: RegExp | string; status?: number; body: string }

function mockFetch(routes: Route[]): Fetcher {
  return (async (url: string) => {
    for (const r of routes) {
      const hit = typeof r.match === 'string' ? url.includes(r.match) : r.match.test(url)
      if (hit) return new Response(r.body, { status: r.status ?? 200 })
    }
    return new Response('not found', { status: 404 })
  }) as unknown as Fetcher
}

const ZHIPU_OK = {
  match: 'bigmodel.cn',
  body: JSON.stringify({ content: [{ type: 'text', text: '## EmDash 1.0 发布\n\n翻译后的正文内容,支持[链接](https://example.com)与 **加粗**。' }] }),
}

/** 小互文章页(真实结构:来源 + 阅读原文锚点 + article-body 公开解读正文 + body-end) */
const xiaohuPage = (upstream: string, marker: string) => `<html><head><title>${marker} · 小互</title></head><body>
<nav>解读 深度 首页</nav>
<span class="lbl mono">来源</span><span class="src">Test Src</span>
<div class="art-actions"><a class="act" href="${upstream}" target="_blank" rel="noopener">阅读原文 ↗</a></div>
<div class="body-divider"><span class="mono">↓ 以下为文章正文</span></div>
<article class="article-body"><h2>${marker}</h2><p>${`${marker}的解读正文:背景、要点、实操建议与结论,内容足够长以通过有效性校验。`.repeat(50)}</p></article>
<div class="body-end">END</div>
<div class="related">相关推荐</div>
</body></html>`

const UPSTREAM_OK = `<html><head><title>x</title></head><body>
<article><h1>EmDash 1.0</h1>
<p>Today Cloudflare announces EmDash 1.0 with <a href="/docs">new docs</a> and a plugin registry.</p>
<p>${'More details about the launch and implications. '.repeat(8)}</p>
</article></body></html>`

/** 2026-09-30 运行窗口内(pubDate ∈ [09-29T15:59:59Z, 09-30T15:59:59Z])的真实 5 篇
 *  doubao 是会员文章(真实 RSS 描述带「完整解读为会员内容」尾),其上游飞书文档有登录墙——
 *  走「会员:上游失败 → CDP 爬原文(登录墙拿不到)→ 兜底小互解读站正文」这条完整降级链 */
const ITEMS = [
  { slug: 'openai-dots', upstream: 'https://openai.com/zh-Hans-CN/index/introducing-dots/', pub: '2026-09-30T01:00:00Z', fail: '403', paid: false },
  { slug: 'typesafe-jev-a16z', upstream: 'https://youtu.be/Ut3LOjKNJaE', pub: '2026-09-30T03:00:00Z', fail: 'net', paid: false },
  { slug: 'openai-devday-2026-recap', upstream: 'https://openai.com/zh-Hans-CN/index/devday-2026-recap/', pub: '2026-09-30T05:00:00Z', fail: '403', paid: false },
  { slug: 'cloudflare-emdash-plugin-registry', upstream: 'https://blog.cloudflare.com/emdash-cms-plugin-registry/', pub: '2026-09-30T02:00:00Z', fail: null, paid: false },
  { slug: 'doubao-creative-design-upgrade', upstream: 'https://bytedance.larkoffice.com/wiki/PPi6wZ6tWiVLWckmEnOcL3ynnSg', pub: '2026-09-29T16:02:00Z', fail: '500', paid: true },
]

const rssXml = () => `<?xml version="1.0"?><rss version="2.0"><channel><title>feed</title>${ITEMS.map(it => `
  <item>
    <title>${it.slug}</title>
    <link>https://best.xiaohu.ai/article/${it.slug}/</link>
    <description>${it.paid ? `摘要 ${it.slug} ｜ 完整解读为会员内容 → best.xiaohu.ai/membership/` : `摘要 ${it.slug}`}</description>
    <category>${it.paid ? '会员' : '产品发布'}</category>
    <pubDate>${new Date(it.pub).toUTCString()}</pubDate>
  </item>`).join('')}</channel></rss>`

describe('冒烟:回放 2026-09-30 北京 23:59:59 聚合(5 篇,分级兜底后应全部发布)', () => {
  it('上游 403/不可达/登录墙的 4 篇降级取小互解读,EmDash 走原文,5/5 发布', async () => {
    // 其中 doubao 是会员文章:上游飞书登录墙,CDP 爬原文(CDP_FETCH=0 不可用)拿不到
    // → 兜底取小互解读站正文,最终仍发布——会员「上游+CDP 双失败」不再漏文
    // 预置状态:09-29 已发布的 cloudflare-cf-cli 在册;失败的豆包不再被标记(修复点)
    fs.writeFileSync(path.join(aggDir, 'state.json'), JSON.stringify({
      lastRunAt: '2026-09-29T16:04:42.285Z',
      lastSlotAt: '2026-09-29T15:59:59.000Z',
      processedUrls: ['https://best.xiaohu.ai/article/cloudflare-cf-cli/'],
      publishedCount: 1,
    }))

    const fetcher = mockFetch([
      { match: 'rss.xml', body: rssXml() },
      // 小互文章页:5 篇全部可解析出「来源 + 阅读原文」
      ...ITEMS.map(it => ({
        match: `best.xiaohu.ai/article/${it.slug}`,
        body: xiaohuPage(it.upstream, it.slug),
      })),
      // 上游:真实失败原因复刻
      { match: 'openai.com', status: 403, body: '' },                              // Cloudflare 403
      { match: 'youtu.be', status: 404, body: '' },                                 // 本机网络不可达
      { match: 'larkoffice.com', status: 500, body: '' },                           // 登录墙/渲染页
      { match: 'blog.cloudflare.com', body: UPSTREAM_OK },                          // EmDash 正常
      { match: /\.md$/, status: 404, body: '' },
      ZHIPU_OK,
    ])

    const report = await runAggregation('cron', { fetcher, now: new Date('2026-09-30T15:59:59.003Z') })

    // 5 篇全发现、全发布、零失败:分级兜底把当晚 4 篇缺文全部救回
    expect(report.discovered).toBe(5)
    expect(report.published).toBe(5)
    expect(report.failed).toBe(0)

    const by = (slug: string) => report.items.find(i => i.xiaohuUrl.includes(slug))!
    // EmDash:上游正常,走原文锚点
    expect(by('cloudflare-emdash-plugin-registry').resolution).toBe('read-original')
    expect(by('cloudflare-emdash-plugin-registry').fetchMethod).toBe('upstream-http')
    // 4 篇失败上游全部降级为小互解读正文
    for (const slug of ['openai-dots', 'typesafe-jev-a16z', 'openai-devday-2026-recap', 'doubao-creative-design-upgrade']) {
      expect(by(slug).resolution).toBe('xiaohu')
      expect(by(slug).fetchMethod).toBe('xiaohu')
      expect(by(slug).status).toBe('published')
    }
    // 豆包(当晚缺文主角)确实落盘,且说明行注明兜底来源
    const raw = fs.readFileSync(path.join(articlesDir, 'doubao-creative-design-upgrade.md'), 'utf-8')
    expect(raw).toContain('正文取自小互 AI 解读')
    expect(raw).toContain('doubao-creative-design-upgrade')
    // 全部入已处理;失败零篇,无遗留重试项
    const state = readState()
    for (const it of ITEMS) expect(state.processedUrls).toContain(`https://best.xiaohu.ai/article/${it.slug}/`)
  }, 120_000)

  it('会员分级:上游失败时 CDP 直爬原文(不走付费的小互正文)', async () => {
    fs.writeFileSync(path.join(aggDir, 'state.json'), JSON.stringify({
      lastRunAt: null, lastSlotAt: null, processedUrls: [], publishedCount: 0,
    }))
    const memberRss = `<rss><channel><item>
      <title>member-cdp-demo</title><link>https://best.xiaohu.ai/article/member-cdp-demo/</link>
      <description>摘要 ｜ 完整解读为会员内容 → best.xiaohu.ai/membership/</description>
      <category>会员</category><pubDate>${new Date('2026-09-30T06:00:00Z').toUTCString()}</pubDate>
    </item></channel></rss>`
    const memberPage = `<html><body>
<span class="lbl mono">来源</span><span class="src">Test Src</span>
<p>会员正文付费不可见……</p></body></html>`
    const fetcher = mockFetch([
      { match: 'rss.xml', body: memberRss },
      { match: 'best.xiaohu.ai/article/member-cdp-demo', body: memberPage },
      { match: 'duckduckgo.com', body: `<a class="result__a" href="//duckduckgo.com/l/?uddg=https%3A%2F%2Fsrc.example.com%2Fdoc">Test Src</a>` },
      { match: 'src.example.com', status: 404, body: '' },
      ZHIPU_OK,
    ])
    const browserFetcher = async (url: string) => {
      expect(url).toBe('https://src.example.com/doc') // 会员兜底爬上游原文
      return UPSTREAM_OK
    }
    const report = await runAggregation('cron', { fetcher, browserFetcher, now: new Date('2026-09-30T15:59:59.003Z') })
    expect(report.published).toBe(1)
    expect(report.items[0].resolution).toBe('cdp')
    expect(report.items[0].fetchMethod).toBe('upstream-cdp')
    expect(report.items[0].paid).toBe(true)
    expect(report.items[0].slug).toBe('member-cdp-demo')
    expect(fs.readFileSync(path.join(articlesDir, 'member-cdp-demo.md'), 'utf-8')).toContain('CDP 浏览器渲染获取')
  }, 120_000)
})
