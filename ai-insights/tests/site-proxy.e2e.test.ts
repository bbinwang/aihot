import { describe, it, expect } from 'vitest'
import { fetchUpstreamMarkdown } from '../src/server/utils/aggregator'

/**
 * site-proxy 端到端(真实代理服务):未配置时整套跳过,提供正式代理地址后运行——
 *
 *   SITE_PROXY_URL='https://<代理>/fetch?url={url}&token=xxx' \
 *   SITE_PROXY_E2E_TARGET='https://x.com/<某条推文>,https://www.reddit.com/r/<版块>/comments/<id>/<slug>' \
 *   npx vitest run tests/site-proxy.e2e.test.ts
 *
 * 白名单按目标 host 自动推导(含子域名),无需另配 PROXY_SITES;
 * 每个目标 URL 独立成用例,断言:走路由(strategy=site-proxy)、正文 ≥400 字符、非拦截页。
 */
const proxyTpl = process.env.SITE_PROXY_URL || ''
const targets = (process.env.SITE_PROXY_E2E_TARGET || '')
  .split(',').map(s => s.trim()).filter(Boolean)
  .filter(t => { try { new URL(t); return true } catch { return false } })

if (proxyTpl && targets.length) {
  const hosts = Array.from(new Set(targets.map(t => new URL(t).hostname.toLowerCase())))
  process.env.PROXY_SITES = hosts.join(',')
}

describe.skipIf(!(proxyTpl && targets.length))('site-proxy 端到端(真实代理服务)', () => {
  it.each(targets)('%s → 代理返回可用正文', async (target: string) => {
    const res = await fetchUpstreamMarkdown(target)
    expect(res.strategy).toBe('site-proxy')
    expect(res.markdown.trim().length).toBeGreaterThanOrEqual(400)
    expect(res.markdown).not.toMatch(/仅在某些地区可用|are you a robot|verify you are human|enable javascript/i)
  }, 120_000)
})
