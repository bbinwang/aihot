import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { createArticle, searchArticles } from '../src/server/utils/articles'

beforeAll(() => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'aihot-search-'))
  process.env.ARTICLES_DIR = dir
  createArticle({ title: 'GPT-5 深度解析', markdown: '多模态推理成本下降', tags: ['大模型'], date: '2026-09-20T00:00:00.000Z' })
  createArticle({ title: '开源模型盘点', markdown: '推理侧 gpt-5 差距缩小', tags: ['开源'], date: '2026-09-18T00:00:00.000Z' })
})

describe('searchArticles', () => {
  it('空关键词返回空', () => {
    expect(searchArticles('   ')).toEqual([])
  })

  it('标题命中得分最高,排最前', () => {
    const r = searchArticles('gpt-5')
    expect(r.length).toBe(2)
    expect(r[0].title).toBe('GPT-5 深度解析') // 标题命中(10 分) > 正文命中(1 分)
    expect(r[0].score).toBeGreaterThanOrEqual(10)
  })

  it('大小写不敏感', () => {
    expect(searchArticles('GPT-5').length).toBe(2)
  })

  it('标签命中', () => {
    const r = searchArticles('大模型')
    expect(r.length).toBe(1)
    expect(r[0].tags).toContain('大模型')
  })

  it('无命中返回空', () => {
    expect(searchArticles('不存在的关键词xyz')).toEqual([])
  })

  it('结果不超过 20 条', () => {
    const r = searchArticles('模型')
    expect(r.length).toBeLessThanOrEqual(20)
  })
})
