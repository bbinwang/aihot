import { defineEventHandler, readBody, createError } from 'h3'
import { requireAdmin } from '../../utils/auth'
import { createModelUpdate } from '../../utils/modelUpdates'

/**
 * POST /api/admin/models 新增模型动态(Header: x-admin-password)。
 * body: { title, description?, sourceUrl, category } —— 校验与同链接去重见 modelUpdates.ts。
 */
export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const body = await readBody(event).catch(() => null)
  if (!body || typeof body !== 'object') {
    throw createError({ statusCode: 400, statusMessage: '请求体无效' })
  }
  try {
    const item = createModelUpdate({
      title: String(body.title || ''),
      description: body.description ? String(body.description) : '',
      sourceUrl: String(body.sourceUrl || ''),
      category: String(body.category || ''),
    })
    return { ok: true, id: item.id }
  } catch (err) {
    // 同信源链接重复等业务校验失败 → 409;字段非法 → 400
    const msg = err instanceof Error ? err.message : '创建失败'
    const status = /已收录/.test(msg) ? 409 : 400
    throw createError({ statusCode: status, statusMessage: msg })
  }
})
