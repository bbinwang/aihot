import { describe, it, expect } from 'vitest'
import { toRss } from '../src/server/utils/articles'
import type { ArticleMeta } from '../src/server/utils/articles'

const item = (over: Partial<ArticleMeta> = {}): ArticleMeta => ({
  slug: 'demo',
  title: '标题 <带标签> & 引号',
  date: '2026-09-24T10:00:00.000Z',
  tags: ['大模型', 'OpenAI'],
  summary: '摘要含 <xml> & 特殊字符',
  readingMinutes: 3,
  ...over,
})

describe('toRss', () => {
  const xml = toRss([item(), item({ slug: 'two', title: '第二篇' })], 'https://aihot.example.com/')

  it('RSS 2.0 结构完整', () => {
    expect(xml).toContain('<?xml version="1.0"')
    expect(xml).toContain('<rss version="2.0">')
    expect(xml).toContain('<channel>')
    expect(xml).toContain('</channel>')
    expect(xml).toContain('</rss>')
  })

  it('包含 item / link / pubDate / category', () => {
    expect((xml.match(/<item>/g) || []).length).toBe(2)
    expect(xml).toContain('<link>https://aihot.example.com/articles/demo</link>')
    expect(xml).toContain('<pubDate>Thu, 24 Sep 2026 10:00:00 GMT</pubDate>')
    expect(xml).toContain('<category>大模型</category>')
  })

  it('XML 特殊字符被转义', () => {
    expect(xml).toContain('标题 &lt;带标签&gt; &amp; 引号')
    expect(xml).not.toContain('标题 <带标签>')
  })

  it('站点地址末尾斜杠被规范化', () => {
    expect(xml).toContain('https://aihot.example.com/articles/two')
  })
})
