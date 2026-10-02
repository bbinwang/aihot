import { defineEventHandler, readBody } from 'h3'
import { adminPassword } from '../../utils/auth'

/** POST /api/admin/login {password} 校验管理密码 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event).catch(() => ({}))
  const password = String(body?.password || '')
  return { ok: password === adminPassword() }
})
