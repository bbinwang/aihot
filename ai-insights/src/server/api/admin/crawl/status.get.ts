import { defineEventHandler, createError, getQuery } from 'h3'
import { requireAdmin } from '../../../utils/auth'
import { getCrawlTask } from '../../../utils/crawlTasks'

/** GET /api/admin/crawl/status?taskId=... 查询手动抓取任务进度(running/done/error)。 */
export default defineEventHandler((event) => {
  requireAdmin(event)
  const q = getQuery(event)
  const taskId = typeof q.taskId === 'string' ? q.taskId.trim() : ''
  const task = taskId ? getCrawlTask(taskId) : undefined
  if (!task) throw createError({ statusCode: 404, statusMessage: '任务不存在或已过期(服务重启后记录丢失,请到文章列表确认结果)' })
  return {
    ok: true,
    status: task.status,
    url: task.url,
    startedAt: task.startedAt,
    finishedAt: task.finishedAt,
    slug: task.slug,
    translated: task.translated,
    articleUrl: task.status === 'done' && task.slug ? `/articles/${task.slug}` : undefined,
    error: task.error,
  }
})
