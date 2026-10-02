import { defineEventHandler } from 'h3'
import { listTags } from '../utils/articles'

/** GET /api/tags 标签聚合 */
export default defineEventHandler(() => listTags())
