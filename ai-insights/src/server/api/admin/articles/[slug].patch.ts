import { defineEventHandler, getRouterParam, readBody, createError } from 'h3'
import { requireAdmin } from '../../../utils/auth'
import { updateArticleMeta } from '../../../utils/articles'

/**
 * PATCH /api/admin/articles/:slug 修改文章元数据(Header: x-admin-password)。
 * body: { title?, tags? }——tags 为全量替换(前端给出增删后的完整列表)。
 */
export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const slug = getRouterParam(event, 'slug') || ''
  const body = await readBody(event).catch(() => null)
  const patch: { title?: string; tags?: string[] } = {}
  if (body && typeof body.title === 'string') patch.title = body.title
  if (body && Array.isArray(body.tags)) patch.tags = body.tags.map(String)
  if (!patch.title && !patch.tags) {
    throw createError({ statusCode: 400, statusMessage: '无待更新字段(title/tags)' })
  }
  let meta
  try {
    meta = updateArticleMeta(slug, patch)
  } catch (err) {
    throw createError({ statusCode: 400, statusMessage: err instanceof Error ? err.message : '更新失败' })
  }
  if (!meta) throw createError({ statusCode: 404, statusMessage: '文章不存在' })
  return { ok: true, article: meta }
})
