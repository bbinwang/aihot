import fs from 'node:fs'
import path from 'node:path'
import { parseMarkdown, renderMarkdown, plainText, slugify, readingMinutes } from './markdown'

export interface ArticleMeta {
  slug: string
  title: string
  date: string
  tags: string[]
  summary: string
  cover?: string
  readingMinutes: number
}

export interface ArticleDetail extends ArticleMeta {
  html: string
}

export interface CreateArticleInput {
  title: string
  markdown: string
  tags?: string[]
  summary?: string
  slug?: string
  date?: string
}

const SLUG_RE = /^[a-z0-9][a-z0-9-]*$/

/** 文章存储目录,可用 ARTICLES_DIR 覆盖(测试/部署用) */
export function articlesDir(): string {
  return process.env.ARTICLES_DIR || path.join(process.cwd(), 'content', 'articles')
}

function ensureDir(dir: string): void {
  fs.mkdirSync(dir, { recursive: true })
}

function safeSlug(slug: string): boolean {
  return SLUG_RE.test(slug) && slug.length <= 100
}

/** 读取单篇文章元数据,失败返回 null */
function readMeta(dir: string, file: string): ArticleMeta | null {
  const full = path.join(dir, file)
  try {
    const raw = fs.readFileSync(full, 'utf-8')
    const { data, content } = parseMarkdown(raw)
    const slug = file.replace(/\.md$/i, '')
    const text = plainText(content)
    if (!data.title) return null
    const stat = fs.statSync(full)
    // gray-matter 会把 YAML 日期解析成 Date 对象,统一转为 ISO 字符串
    const parsedDate = data.date ? new Date(data.date as unknown as string) : stat.mtime
    const date = Number.isNaN(parsedDate.getTime()) ? stat.mtime.toISOString() : parsedDate.toISOString()
    return {
      slug,
      title: data.title,
      date,
      tags: Array.isArray(data.tags) ? data.tags.filter(t => typeof t === 'string' && t.trim()).map(t => t.trim()) : [],
      summary: data.summary || text.slice(0, 120),
      cover: data.cover,
      readingMinutes: readingMinutes(text),
    }
  } catch {
    return null
  }
}

/** 全部文章元数据,按日期倒序 */
export function listArticles(): ArticleMeta[] {
  const dir = articlesDir()
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter(f => f.toLowerCase().endsWith('.md'))
    .map(f => readMeta(dir, f))
    .filter((a): a is ArticleMeta => a !== null)
    .sort((a, b) => b.date.localeCompare(a.date))
}

/** 单篇详情(含渲染后的 HTML),不存在返回 null */
export function getArticle(slug: string): ArticleDetail | null {
  if (!safeSlug(slug)) return null
  const full = path.join(articlesDir(), `${slug}.md`)
  if (!fs.existsSync(full)) return null
  const raw = fs.readFileSync(full, 'utf-8')
  const { data, content } = parseMarkdown(raw)
  const meta = readMeta(articlesDir(), `${slug}.md`)
  if (!meta || !data.title) return null
  return { ...meta, html: renderMarkdown(content) }
}

/** 校验并写入新文章,返回元数据;slug 冲突自动追加序号 */
export function createArticle(input: CreateArticleInput): ArticleMeta {
  const title = (input.title || '').trim()
  const markdown = (input.markdown || '').trim()
  if (!title) throw new Error('标题(title)不能为空')
  if (!markdown) throw new Error('正文(markdown)不能为空')

  let date = new Date().toISOString()
  if (input.date) {
    const d = new Date(input.date)
    if (Number.isNaN(d.getTime())) throw new Error(`日期格式无效: ${input.date}`)
    date = d.toISOString()
  }

  let slug = slugify(input.slug || title) || `post-${Date.now().toString(36)}`
  if (!safeSlug(slug)) slug = `post-${Date.now().toString(36)}`

  const dir = articlesDir()
  ensureDir(dir)
  let finalSlug = slug
  for (let n = 2; fs.existsSync(path.join(dir, `${finalSlug}.md`)); n++) {
    finalSlug = `${slug}-${n}`
  }

  const text = plainText(markdown)
  const tags = Array.from(new Set((input.tags || []).map(t => t.trim()).filter(Boolean))).slice(0, 8)
  const frontmatter = [
    '---',
    `title: ${JSON.stringify(title)}`,
    `date: ${date}`,
    tags.length ? `tags: [${tags.map(t => JSON.stringify(t)).join(', ')}]` : 'tags: []',
    `summary: ${JSON.stringify(input.summary?.trim() || text.slice(0, 120))}`,
    '---',
    '',
  ].join('\n')

  fs.writeFileSync(path.join(dir, `${finalSlug}.md`), `${frontmatter}${markdown}\n`, 'utf-8')
  return {
    slug: finalSlug,
    title,
    date,
    tags,
    summary: input.summary?.trim() || text.slice(0, 120),
    readingMinutes: readingMinutes(text),
  }
}

/** 删除文章,成功返回 true */
export function deleteArticle(slug: string): boolean {
  if (!safeSlug(slug)) return false
  const full = path.join(articlesDir(), `${slug}.md`)
  if (!fs.existsSync(full)) return false
  fs.unlinkSync(full)
  return true
}

/** 全文搜索:标题/标签/摘要/正文加权打分,返回前 20 条 */
export function searchArticles(q: string): Array<ArticleMeta & { score: number }> {
  const needle = q.trim().toLowerCase()
  if (!needle) return []
  const results: Array<ArticleMeta & { score: number }> = []
  for (const a of listArticles()) {
    let score = 0
    const title = a.title.toLowerCase()
    const summary = a.summary.toLowerCase()
    const tags = a.tags.map(t => t.toLowerCase())
    if (title.includes(needle)) score += 10
    if (tags.some(t => t.includes(needle))) score += 5
    if (summary.includes(needle)) score += 3
    const detail = getArticle(a.slug)
    if (detail && detail.html.toLowerCase().includes(needle)) score += 1
    if (score > 0) results.push({ ...a, score })
  }
  return results.sort((a, b) => b.score - a.score || b.date.localeCompare(a.date)).slice(0, 20)
}

/** 标签聚合:[{tag, count}] 按数量倒序 */
export function listTags(): Array<{ tag: string; count: number }> {
  const map = new Map<string, number>()
  for (const a of listArticles()) {
    for (const t of a.tags) map.set(t, (map.get(t) || 0) + 1)
  }
  return [...map.entries()].map(([tag, count]) => ({ tag, count })).sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
}

function xmlEscape(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}

/** 生成 RSS 2.0 XML */
export function toRss(items: ArticleMeta[], siteUrl: string, title = 'AIHot · AI 热点洞察'): string {
  const base = siteUrl.replace(/\/$/, '')
  const channel = [
    `    <title>${xmlEscape(title)}</title>`,
    `    <link>${xmlEscape(base)}</link>`,
    `    <description>AI 热点资讯与洞察</description>`,
    `    <language>zh-CN</language>`,
  ]
  const entries = items.slice(0, 20).map(a =>
    [
      '    <item>',
      `      <title>${xmlEscape(a.title)}</title>`,
      `      <link>${xmlEscape(`${base}/articles/${a.slug}`)}</link>`,
      `      <guid>${xmlEscape(`${base}/articles/${a.slug}`)}</guid>`,
      `      <description>${xmlEscape(a.summary)}</description>`,
      `      <pubDate>${new Date(a.date).toUTCString()}</pubDate>`,
      ...a.tags.map(t => `      <category>${xmlEscape(t)}</category>`),
      '    </item>',
    ].join('\n'),
  )
  return ['<?xml version="1.0" encoding="UTF-8"?>', '<rss version="2.0">', '  <channel>', ...channel, ...entries, '  </channel>', '</rss>', ''].join('\n')
}
