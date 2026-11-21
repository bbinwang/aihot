import { describe, it, expect, vi, beforeEach } from 'vitest'

/* crawlAndPublish 打桩:任务注册表只管状态流转,不真正抓取 */
const crawlAndPublishMock = vi.hoisted(() => vi.fn(async () => ({ slug: 'ok', translated: true, summarized: true })))

vi.mock('../src/server/utils/aggregator', () => ({ crawlAndPublish: crawlAndPublishMock }))

import { startCrawlTask, getCrawlTask, listCrawlTasks } from '../src/server/utils/crawlTasks'

const flush = () => new Promise(r => setTimeout(r, 0))

describe('crawlTasks 手动抓取任务注册表', () => {
  beforeEach(() => {
    crawlAndPublishMock.mockReset()
    crawlAndPublishMock.mockImplementation(async () => ({ slug: 'ok-slug', translated: true, summarized: true }))
  })

  it('提交即入列表(最新在前),保存参数快照供「编辑后重试」回填', () => {
    const t = startCrawlTask('https://example.com/a', { title: '标题', tags: ['x', 'y'], summary: '总结内容', fetchOriginal: false })
    expect(t.status).toBe('running')
    expect(t.fetchOriginal).toBe(false)
    expect(t.title).toBe('标题')
    expect(t.tags).toEqual(['x', 'y'])
    expect(t.summary).toBe('总结内容')
    expect(listCrawlTasks()[0].id).toBe(t.id)
    expect(getCrawlTask(t.id)?.url).toBe('https://example.com/a')
  })

  it('同 URL 任务进行中时拒绝重复提交(尾斜杠归一)', () => {
    crawlAndPublishMock.mockImplementation(() => new Promise(() => {})) // 永不完成 → 保持 running
    startCrawlTask('https://example.com/dup/', {})
    expect(() => startCrawlTask('https://example.com/dup', {})).toThrow(/正在抓取中/)
  })

  it('后台完成 → done + slug;失败 → error + 原因', async () => {
    crawlAndPublishMock.mockResolvedValueOnce({ slug: 'good', translated: true, summarized: false })
    const ok = startCrawlTask('https://example.com/ok', {})
    await flush()
    expect(getCrawlTask(ok.id)?.status).toBe('done')
    expect(getCrawlTask(ok.id)?.slug).toBe('good')

    crawlAndPublishMock.mockRejectedValueOnce(new Error('boom 上游失败'))
    const bad = startCrawlTask('https://example.com/bad', {})
    await flush()
    expect(getCrawlTask(bad.id)?.status).toBe('error')
    expect(getCrawlTask(bad.id)?.error).toContain('boom')
  })

  it('列表按提交时间新→旧排序', async () => {
    const t1 = startCrawlTask('https://example.com/order-1', {})
    await flush()
    const t2 = startCrawlTask('https://example.com/order-2', {})
    await flush()
    const ids = listCrawlTasks().filter(t => t.id === t1.id || t.id === t2.id).map(t => t.id)
    expect(ids).toEqual([t2.id, t1.id])
  })
})
