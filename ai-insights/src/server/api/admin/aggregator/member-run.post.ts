import { defineEventHandler, createError, getQuery } from 'h3'
import { requireAdmin } from '../../../utils/auth'
import { runMemberAggregation } from '../../../utils/aggregator'

/**
 * POST /api/admin/aggregator/member-run 立即执行一次会员文章聚合。
 * 数据源 best.xiaohu.ai/jiedu/?acc=paid;可传 ?urls=a,b 限定只处理指定文章。
 * 会员文章常无「阅读原文」锚点,管线会用「来源」名做网络搜索找回上游链接。
 */
export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const q = getQuery(event)
  const urls = typeof q.urls === 'string'
    ? q.urls.split(',').map(s => s.trim()).filter(Boolean)
    : undefined
  try {
    const report = await runMemberAggregation('manual', { urls })
    return { ok: true, report }
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: err instanceof Error ? err.message : '会员聚合执行失败',
    })
  }
})
