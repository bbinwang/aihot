import { defineEventHandler, readBody, createError } from 'h3'
import { requireAdmin } from '../../utils/auth'
import { crawlAndPublish } from '../../utils/aggregator'

/**
 * POST /api/admin/crawl 手动爬取:输入任意 URL → 抓原文 → 翻译 → 发布。
 * body: { url, title?, tags?, summary? }
 */
export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const body = await readBody(event).catch(() => null)
  const url = body && typeof body.url === 'string' ? body.url.trim() : ''
  if (!url) throw createError({ statusCode: 400, statusMessage: '缺少 url 参数' })

  let tags: string[] = []
  if (Array.isArray(body.tags)) tags = body.tags.map(String)
  else if (typeof body.tags === 'string' && body.tags.trim()) tags = body.tags.split(/[,，]/).map(s => s.trim())

  try {
    const result = await crawlAndPublish(url, {
      title: typeof body.title === 'string' ? body.title : undefined,
      tags,
      summary: typeof body.summary === 'string' ? body.summary : undefined,
    })
    return { ok: true, ...result, url: `/articles/${result.slug}` }
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: err instanceof Error ? err.message : '爬取失败',
    })
  }
})
