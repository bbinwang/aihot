import { defineEventHandler, getQuery } from 'h3'
import { listModelUpdates } from '../../utils/modelUpdates'

/** GET /api/models 模型动态列表(可选 ?category= 筛选),按添加时间倒序 */
export default defineEventHandler((event) => {
  const q = getQuery(event)
  const category = typeof q.category === 'string' ? q.category.trim() : ''
  const items = listModelUpdates()
  const filtered = category ? items.filter(it => it.category === category) : items
  return { ok: true, items: filtered, total: items.length }
})
