import { defineEventHandler, getRequestURL } from 'h3'
import { listArticles, toRss } from '../utils/articles'

/** GET /rss.xml RSS 订阅 */
export default defineEventHandler((event) => {
  const url = getRequestURL(event)
  const site = process.env.SITE_URL || `${url.protocol}//${url.host}`
  return toRss(listArticles(), site)
})
