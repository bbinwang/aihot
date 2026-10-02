import { defineEventHandler, getRouterParam, createError } from 'h3'
import { requireAdmin } from '../../../utils/auth'
import { deleteArticle } from '../../../utils/articles'

/** DELETE /api/admin/articles/:slug 删除文章(Header: x-admin-password) */
export default defineEventHandler((event) => {
  requireAdmin(event)
  const slug = getRouterParam(event, 'slug') || ''
  if (!deleteArticle(slug)) {
    throw createError({ statusCode: 404, statusMessage: '文章不存在' })
  }
  return { ok: true }
})
