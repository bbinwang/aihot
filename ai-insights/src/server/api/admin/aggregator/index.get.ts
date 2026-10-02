import { defineEventHandler } from 'h3'
import { requireAdmin } from '../../../utils/auth'
import { listRuns, readState, lastBeijingSlot } from '../../../utils/aggregator'

/** 下一个「北京时间 23:59:59」槽位时刻(= 最近已过去槽位 +24h;纯 UTC+8 计算,与宿主机时区无关) */
function nextRunAt(): string {
  return new Date(lastBeijingSlot().getTime() + 86_400_000).toISOString()
}

/** GET /api/admin/aggregator 聚合任务状态 + 运行历史 */
export default defineEventHandler((event) => {
  requireAdmin(event)
  const state = readState()
  return {
    enabled: process.env.AGGREGATOR_ENABLED !== '0',
    cron: '59 59 23 * * *', // 北京时区宿主机秒级准点;小时级 '0 * * * *' 兜底(实际由槽位门控保证)
    lastRunAt: state.lastRunAt,
    lastSlotAt: state.lastSlotAt ?? null,
    nextRunAt: nextRunAt(),
    publishedCount: state.publishedCount,
    processedCount: state.processedUrls.length,
    runs: listRuns().slice(0, 20),
  }
})
