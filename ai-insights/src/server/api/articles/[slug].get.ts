import { defineEventHandler, getRouterParam, createError } from 'h3'
import { getArticle } from '../../utils/articles'

/** GET /api/articles/:slug 文章详情(含 HTML) */
export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug') || ''
  const article = getArticle(slug)
  if (!article) {
    throw createError({ statusCode: 404, statusMessage: '文章不存在' })
  }
  return article
})
