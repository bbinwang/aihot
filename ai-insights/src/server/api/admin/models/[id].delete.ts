import { defineEventHandler, createError } from 'h3'
import { requireAdmin } from '../../../utils/auth'
import { deleteModelUpdate } from '../../../utils/modelUpdates'

/** DELETE /api/admin/models/:id 删除模型动态(Header: x-admin-password) */
export default defineEventHandler((event) => {
  requireAdmin(event)
  const id = event.context.params?.id || ''
  if (!deleteModelUpdate(id)) {
    throw createError({ statusCode: 404, statusMessage: '动态不存在或已删除' })
  }
  return { ok: true }
})
