import { defineNitroPlugin } from 'nitropack/runtime'
import { runScheduledAggregation } from '../utils/aggregator'

/**
 * 补跑机制:Mac 睡眠/进程中断会错过北京时间 23:59:59 的槽位。
 * 启动 20 秒后 + 每小时检查:若「最近一个已过去的北京 23:59:59 槽位」尚未运行,则补跑
 * (与 cron 共用同一槽位门控,重复触发会被槽位状态与运行锁挡住)。
 */
export default defineNitroPlugin(() => {
  if (process.env.AGGREGATOR_ENABLED === '0') return

  let running = false
  const check = async () => {
    if (running) return
    running = true
    try {
      const r = await runScheduledAggregation('catchup')
      if (r.ran) console.log('[aggregator] 补跑完成,槽位:', r.slot)
    } catch (err) {
      console.error('[aggregator] 补跑失败:', err)
    } finally {
      running = false
    }
  }

  setTimeout(check, 20_000)
  setInterval(check, 60 * 60 * 1000)
})
