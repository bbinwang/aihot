import matter from 'gray-matter'
import { marked } from 'marked'

marked.use({ gfm: true, breaks: false })

export interface ArticleFrontmatter {
  title?: string
  date?: string
  tags?: string[]
  summary?: string
  cover?: string
}

export interface ParsedMarkdown {
  data: ArticleFrontmatter
  content: string
}

/** 解析带 frontmatter 的 Markdown 文本 */
export function parseMarkdown(raw: string): ParsedMarkdown {
  const { data, content } = matter(raw)
  return { data: data as ArticleFrontmatter, content }
}

/** Markdown 正文渲染为 HTML */
export function renderMarkdown(md: string): string {
  return marked.parse(md, { async: false }) as string
}

/** 去掉 Markdown 标记,取纯文本(用于摘要/搜索/阅读时长) */
export function plainText(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_~\-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** 生成 URL 安全 slug:仅小写字母/数字/连字符 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/** 阅读时长(分钟):中文按 400 字/分,英文按 200 词/分 */
export function readingMinutes(text: string): number {
  const cjk = (text.match(/[一-龥]/g) || []).length
  const words = (text.replace(/[一-龥]/g, ' ').match(/[a-zA-Z0-9]+/g) || []).length
  return Math.max(1, Math.round(cjk / 400 + words / 200))
}
