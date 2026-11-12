import { describe, it, expect } from 'vitest'
import { resourceSites } from '../src/data/resources'

describe('热链资源数据', () => {
  it('至少包含一个资源站点,且每个站点至少有一条链接', () => {
    expect(resourceSites.length).toBeGreaterThanOrEqual(1)
    for (const site of resourceSites) {
      expect(site.links.length).toBeGreaterThanOrEqual(1)
    }
  })

  it('站点 id 唯一', () => {
    const ids = resourceSites.map(s => s.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('所有链接为合法 https 地址且站内不重复', () => {
    const seen = new Set<string>()
    for (const site of resourceSites) {
      for (const link of site.links) {
        const url = new URL(link.url) // 非法地址会抛错
        expect(url.protocol).toBe('https:')
        expect(seen.has(link.url), `重复链接: ${link.url}`).toBe(false)
        seen.add(link.url)
      }
    }
  })

  it('链接名称非空', () => {
    for (const site of resourceSites) {
      for (const link of site.links) {
        expect(link.name.trim().length).toBeGreaterThan(0)
      }
    }
  })

  it('收录向阳乔木播客精读站(不少于 8 个播客)', () => {
    const qiaomu = resourceSites.find(s => s.id === 'qiaomu-podcast')
    expect(qiaomu).toBeDefined()
    expect(qiaomu!.links.length).toBeGreaterThanOrEqual(8)
    expect(qiaomu!.links.every(l => l.url.endsWith('.qiaomu.ai'))).toBe(true)
  })
})
