import { getHeader, createError } from 'h3'

/** 管理密码,可用环境变量 ADMIN_PASSWORD 覆盖 */
export function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || 'aihot2026'
}

export function isAdmin(event: any): boolean {
  try {
    return getHeader(event, 'x-admin-password') === adminPassword()
  } catch {
    return false
  }
}

/** 管理接口鉴权,失败抛 401 */
export function requireAdmin(event: any): void {
  if (!isAdmin(event)) {
    throw createError({ statusCode: 401, statusMessage: '管理密码错误' })
  }
}
