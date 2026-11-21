import { defineEventHandler, readBody, createError } from 'h3'
import { requireAdmin } from '../../utils/auth'
import { findArticleByUpstreamUrl } from '../../utils/articles'
import { startCrawlTask } from '../../utils/crawlTasks'

/**
 * POST /api/admin/crawl 手动爬取:输入任意 URL → 抓原文 → 翻译 → 发布。
 * 抓取+翻译耗时可达数分钟,同步等待会被客户端(移动网络约 60s)空闲超时掐断,
 * 故立即返回 taskId,前端轮询 GET /api/admin/crawl/status?taskId=... 获取进度。
 * 提交时同步拦截:已发布过的链接直接 409(否则 slug 冲突会生成 -2 重复文章),
 * 进行中的同链接任务由 startCrawlTask 拒绝。body: { url, title?, tags?, summary? }
 */
export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const body = await readBody(event).catch(() => null)
  const url = body && typeof body.url === 'string' ? body.url.trim() : ''
  if (!url) throw createError({ statusCode: 400, statusMessage: '缺少 url 参数' })
  // URL 合法性在提交时同步校验,无效链接直接 400 而不是等轮询才发现
  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    throw createError({ statusCode: 400, statusMessage: `URL 无效: ${url}` })
  }
  if (!/^https?:$/.test(parsed.protocol)) throw createError({ statusCode: 400, statusMessage: '仅支持 http/https 链接' })

  // 同一原文链接已发布过:拒绝重复爬取,提示先删原文(重爬场景)
  const existed = findArticleByUpstreamUrl(url)
  if (existed) {
    throw createError({
      statusCode: 409,
      statusMessage: `该链接已发布过:《${existed.title}》,如需重新抓取请先在文章管理中删除 ${existed.slug}`,
    })
  }

  let tags: string[] = []
  if (Array.isArray(body.tags)) tags = body.tags.map(String)
  else if (typeof body.tags === 'string' && body.tags.trim()) tags = body.tags.split(/[,，]/).map(s => s.trim())

  /** 是否爬取原文:默认 true。取消后仅用提供的 AI 总结发布,不抓取上游内容 */
  const fetchOriginal = body.fetchOriginal !== false

  let task
  try {
    task = startCrawlTask(url, {
      title: typeof body.title === 'string' ? body.title : undefined,
      tags,
      summary: typeof body.summary === 'string' ? body.summary : undefined,
      fetchOriginal,
    })
  } catch (err) {
    throw createError({ statusCode: 400, statusMessage: err instanceof Error ? err.message : '任务创建失败' })
  }
  return { ok: true, taskId: task.id }
})
