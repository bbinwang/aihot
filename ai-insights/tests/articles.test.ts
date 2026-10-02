import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import {
  listArticles,
  getArticle,
  createArticle,
  deleteArticle,
  listTags,
} from '../src/server/utils/articles'

let dir: string

beforeAll(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'aihot-articles-'))
  process.env.ARTICLES_DIR = dir
})

describe('createArticle 校验', () => {
  it('缺少标题报错', () => {
    expect(() => createArticle({ title: '', markdown: '正文' })).toThrow(/标题/)
  })

  it('缺少正文报错', () => {
    expect(() => createArticle({ title: '标题', markdown: '' })).toThrow(/正文/)
  })

  it('非法日期报错', () => {
    expect(() => createArticle({ title: '标题', markdown: '正文', date: 'not-a-date' })).toThrow(/日期/)
  })
})

describe('文章增删查', () => {
  it('创建 → 查询详情(含渲染 HTML)', () => {
    const meta = createArticle({ title: 'First Post', markdown: '# 你好\n\n正文', tags: ['ai', 'test'] })
    expect(meta.slug).toBe('first-post')

    const detail = getArticle('first-post')
    expect(detail).not.toBeNull()
    expect(detail!.title).toBe('First Post')
    expect(detail!.tags).toEqual(['ai', 'test'])
    expect(detail!.html).toContain('<h1')
    expect(detail!.readingMinutes).toBeGreaterThanOrEqual(1)
  })

  it('slug 冲突自动追加序号', () => {
    const a = createArticle({ title: 'First Post', markdown: '第二篇同题' })
    expect(a.slug).toBe('first-post-2')
  })

  it('中文标题无 slug 时走 post- 兜底', () => {
    const a = createArticle({ title: '纯中文标题', markdown: '正文' })
    expect(a.slug).toMatch(/^post-/)
  })

  it('自定义 slug 生效且非法字符被清理', () => {
    const a = createArticle({ title: '随便', markdown: '正文', slug: 'My Custom Slug!' })
    expect(a.slug).toBe('my-custom-slug')
  })

  it('列表按日期倒序', () => {
    createArticle({ title: 'Older', markdown: '旧文', date: '2020-01-01T00:00:00.000Z' })
    const titles = listArticles().map(a => a.title)
    expect(titles.indexOf('Older')).toBe(titles.length - 1)
  })

  it('非法 slug 访问返回 null(防路径穿越)', () => {
    expect(getArticle('../etc/passwd')).toBeNull()
    expect(getArticle('a/b')).toBeNull()
  })

  it('删除文章', () => {
    expect(deleteArticle('first-post-2')).toBe(true)
    expect(deleteArticle('first-post-2')).toBe(false)
    expect(getArticle('first-post-2')).toBeNull()
  })
})

describe('标签聚合', () => {
  it('统计数量并去重', () => {
    const tags = listTags()
    const ai = tags.find(t => t.tag === 'ai')
    expect(ai?.count).toBe(1)
    expect(tags.length).toBeGreaterThan(0)
  })
})
