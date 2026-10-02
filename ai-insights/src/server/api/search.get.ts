import { defineEventHandler, getQuery, createError } from 'h3'
import { searchArticles } from '../utils/articles'

/** GET /api/search?q=关键词 全文搜索 */
export default defineEventHandler((event) => {
  const q = getQuery(event)
  const keyword = typeof q.q === 'string' ? q.q : ''
  if (!keyword.trim()) {
    throw createError({ statusCode: 400, statusMessage: '缺少搜索关键词 q' })
  }
  return { q: keyword.trim(), results: searchArticles(keyword) }
})
