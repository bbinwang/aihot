import { describe, it, expect } from 'vitest'
import { parseMarkdown, renderMarkdown, plainText, slugify, readingMinutes } from '../src/server/utils/markdown'

describe('parseMarkdown', () => {
  it('解析 frontmatter 与正文', () => {
    const raw = `---\ntitle: 测试标题\ntags: [a, b]\nsummary: 摘要\n---\n\n正文内容`
    const { data, content } = parseMarkdown(raw)
    expect(data.title).toBe('测试标题')
    expect(data.tags).toEqual(['a', 'b'])
    expect(data.summary).toBe('摘要')
    expect(content.trim()).toBe('正文内容')
  })

  it('无 frontmatter 时返回空对象', () => {
    const { data, content } = parseMarkdown('# 只有正文')
    expect(data.title).toBeUndefined()
    expect(content).toBe('# 只有正文')
  })
})

describe('renderMarkdown', () => {
  it('渲染标题与代码块', () => {
    const html = renderMarkdown('# 你好\n\n```js\nconst a = 1\n```')
    expect(html).toContain('<h1')
    expect(html).toContain('你好')
    expect(html).toContain('<code')
    expect(html).toContain('const a = 1')
  })

  it('渲染列表与链接', () => {
    const html = renderMarkdown('- [OpenAI](https://openai.com)')
    expect(html).toContain('<ul>')
    expect(html).toContain('href="https://openai.com"')
  })
})

describe('plainText', () => {
  it('去除 Markdown 标记', () => {
    expect(plainText('# 标题 **加粗** `code`')).not.toContain('#')
    expect(plainText('[链接文字](http://x.com)')).toBe('链接文字')
  })
})

describe('slugify', () => {
  it('英文转 slug', () => {
    expect(slugify('Hello World!')).toBe('hello-world')
    expect(slugify('My_First Post 2026')).toBe('my-first-post-2026')
  })
  it('非法字符被剥离,中文标题返回空串(触发兜底)', () => {
    expect(slugify('中文标题')).toBe('')
    expect(slugify('  --a--  ')).toBe('a')
  })
})

describe('readingMinutes', () => {
  it('中文 400 字约 1 分钟起步', () => {
    const text = '字'.repeat(400)
    expect(readingMinutes(text)).toBe(1)
  })
  it('长文时长按比例增长,且至少 1 分钟', () => {
    expect(readingMinutes('字'.repeat(1600))).toBe(4)
    expect(readingMinutes('short')).toBe(1)
  })
})
