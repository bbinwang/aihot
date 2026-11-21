import { defineEventHandler } from 'h3'
import { requireAdmin } from '../../../utils/auth'
import { listCrawlTasks } from '../../../utils/crawlTasks'

/**
 * GET /api/admin/crawl/tasks 任务管理页列表:返回全部手动抓取任务(新→旧),
 * 含提交参数快照(url/title/tags/summary/fetchOriginal),供前端展示与「编辑后重试」回填。
 */
export default defineEventHandler((event) => {
  requireAdmin(event)
  return {
    ok: true,
    items: listCrawlTasks().map(t => ({
      id: t.id,
      url: t.url,
      status: t.status,
      startedAt: t.startedAt,
      finishedAt: t.finishedAt,
      slug: t.slug,
      translated: t.translated,
      summarized: t.summarized,
      fetchOriginal: t.fetchOriginal,
      error: t.error,
      title: t.title,
      tags: t.tags,
      summary: t.summary,
      articleUrl: t.status === 'done' && t.slug ? `/articles/${t.slug}` : undefined,
    })),
  }
})
