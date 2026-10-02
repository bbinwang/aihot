import { defineTask } from 'nitropack/runtime'
import { runScheduledAggregation } from '../../utils/aggregator'

/**
 * Nitro 定时任务:cron 触发配置见 nuxt.config.ts
 * (秒级 '59 59 23 * * *' 在北京时区宿主机上于北京时间 23:59:59 准点触发,
 *  小时级 '0 * * * *' 兜底其他时区与错过的槽位),
 * 由 runScheduledAggregation 的「北京时间(UTC+8) 23:59:59 槽位」门控保证
 * 每天严格在北京时间 23:59:59 运行一次(统一单管线:RSS 24h 窗口,会员文章带「会员」标签)。
 */
export default defineTask({
  meta: { name: 'aggregator:run', description: '聚合 best.xiaohu.ai RSS(北京时间 23:59:59 门控,24h 窗口)→ 溯源 → 抓原文 → 翻译 → 发布' },
  async run() {
    try {
      const r = await runScheduledAggregation('cron')
      if (!r.ran) return { result: r.reason }
      const rep = r.report
      return { result: `发布 ${rep?.published ?? 0} / 失败 ${rep?.failed ?? 0} / 跳过 ${rep?.skipped ?? 0}` }
    } catch (err) {
      return { result: `本次未执行: ${err instanceof Error ? err.message : String(err)}` }
    }
  },
})
