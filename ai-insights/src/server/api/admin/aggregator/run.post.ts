import { defineEventHandler, createError } from 'h3'
import { requireAdmin } from '../../../utils/auth'
import { runAggregation } from '../../../utils/aggregator'

/**
 * POST /api/admin/aggregator/run 立即执行一次聚合(测试/补跑用)。
 * 单次运行含抓取与翻译,可能耗时数分钟。
 */
export default defineEventHandler(async (event) => {
  requireAdmin(event)
  try {
    const report = await runAggregation('manual')
    return { ok: true, report }
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: err instanceof Error ? err.message : '聚合执行失败',
    })
  }
})
