import { defineEventHandler, readBody, createError } from 'h3'
import { requireAdmin } from '../../utils/auth'
import { createArticle } from '../../utils/articles'

/** POST /api/admin/articles 上传新文章(Header: x-admin-password) */
export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const body = await readBody(event).catch(() => null)
  if (!body || typeof body !== 'object') {
    throw createError({ statusCode: 400, statusMessage: '请求体无效' })
  }

  let tags: string[] = []
  if (Array.isArray(body.tags)) tags = body.tags.map(String)
  else if (typeof body.tags === 'string' && body.tags.trim()) {
    tags = body.tags.split(/[,，]/).map(s => s.trim())
  }

  try {
    const meta = createArticle({
      title: String(body.title || ''),
      markdown: String(body.markdown || ''),
      tags,
      summary: body.summary ? String(body.summary) : undefined,
      slug: body.slug ? String(body.slug) : undefined,
      date: body.date ? String(body.date) : undefined,
    })
    return { ok: true, slug: meta.slug, url: `/articles/${meta.slug}` }
  } catch (err) {
    throw createError({ statusCode: 400, statusMessage: err instanceof Error ? err.message : '创建失败' })
  }
})
