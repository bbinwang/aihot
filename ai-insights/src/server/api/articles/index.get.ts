import { defineEventHandler, getQuery } from 'h3'
import { listArticles } from '../../utils/articles'

/** GET /api/articles?page=1&pageSize=10&tag=xxx 文章列表(分页 + 标签筛选) */
export default defineEventHandler((event) => {
  const q = getQuery(event)
  const page = Math.max(1, Number.parseInt(String(q.page || '1'), 10) || 1)
  const pageSize = Math.min(50, Math.max(1, Number.parseInt(String(q.pageSize || '10'), 10) || 10))
  const tag = typeof q.tag === 'string' && q.tag.trim() ? q.tag.trim() : null

  let items = listArticles()
  if (tag) items = items.filter(a => a.tags.includes(tag))

  return {
    total: items.length,
    page,
    pageSize,
    items: items.slice((page - 1) * pageSize, page * pageSize),
  }
})
