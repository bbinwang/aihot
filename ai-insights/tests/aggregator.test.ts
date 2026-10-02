import { describe, it, expect, beforeAll, afterEach, beforeEach } from 'vitest'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import {
  parseRss,
  extractArticleSource,
  runAggregation,
  runMemberAggregation,
  runScheduledAggregation,
  findUpstreamBySearch,
  parseMemberListing,
  pendingMemberItems,
  lastBeijingSlot,
  dueSlot,
  crawlAndPublish,
  fetchUpstreamMarkdown,
  readState,
  listRuns,
} from '../src/server/utils/aggregator'
import type { FeedItem } from '../src/server/utils/aggregator'
import { extractMarkdown } from '../src/server/utils/html2md'
import { splitMarkdownChunks, translateMarkdown, isMostlyChinese, cjkRatio } from '../src/server/utils/translate'
import type { Fetcher } from '../src/server/utils/llm'

/* ---------- 测试环境:临时目录 + mock 网络 ---------- */

let articlesDir: string
let aggDir: string

beforeAll(() => {
  articlesDir = fs.mkdtempSync(path.join(os.tmpdir(), 'aihot-agg-articles-'))
  aggDir = fs.mkdtempSync(path.join(os.tmpdir(), 'aihot-agg-state-'))
  process.env.ARTICLES_DIR = articlesDir
  process.env.AGGREGATOR_DIR = aggDir
  process.env.ZHIPU_API_KEY = 'test-key'
  process.env.CDP_FETCH = '0' // 测试中禁用真实 CDP(ego-browser),兜底用例一律注入 browserFetcher
})

type Route = { match: RegExp | string; status?: number; body: string }

/** 按 routes 顺序匹配的 mock fetch */
function mockFetch(routes: Route[]): Fetcher {
  return (async (url: string) => {
    for (const r of routes) {
      const hit = typeof r.match === 'string' ? url.includes(r.match) : r.match.test(url)
      if (hit) return new Response(r.body, { status: r.status ?? 200 })
    }
    return new Response('not found', { status: 404 })
  }) as unknown as Fetcher
}

const ZHIPU_OK = {
  match: 'bigmodel.cn',
  body: JSON.stringify({ content: [{ type: 'text', text: '## 重大发布\n\n今天我们宣布[新文档](https://example.com/docs)正式上线,支持 **多模态** 输入。' }] }),
}

const ARTICLE_PAGE = `<html><body>
<span class="lbl mono">来源</span><span class="src" style="cursor:default">Example Corp</span>
<div class="art-actions"><a class="act" href="https://example.com/post" target="_blank" rel="noopener">阅读原文 ↗</a></div>
</body></html>`

const UPSTREAM_HTML = `<html><head><title>x</title></head><body>
<nav>Home About Contact Login</nav>
<article><h1>Big Launch</h1>
<p>Today we announce something great with <a href="/docs">new docs</a> and details.</p>
<pre><code class="language-bash">npm install example</code></pre>
<p>${'More details about the launch and implications. '.repeat(8)}</p>
</article>
<footer>Copyright Noise</footer>
</body></html>`

function rssXml(withItem = true): string {
  const item = withItem ? `
  <item>
    <title><![CDATA[Test &amp; Article]]></title>
    <link>https://best.xiaohu.ai/article/test-one/</link>
    <description><![CDATA[Summary text ｜ 完整解读为会员内容 → best.xiaohu.ai/membership/]]></description>
    <category>产品发布</category><category>Example</category>
    <pubDate>${new Date(Date.now() - 3600_000).toUTCString()}</pubDate>
  </item>` : ''
  return `<?xml version="1.0"?><rss version="2.0"><channel><title>feed</title>${item}</channel></rss>`
}

/** e2e 全链路 mock:RSS → 小互文章页 → 上游 .md(404)→ 上游 HTML → 智谱翻译 */
function happyFetch(): Fetcher {
  return mockFetch([
    { match: 'rss.xml', body: rssXml(true) },
    { match: 'best.xiaohu.ai/article/test-one', body: ARTICLE_PAGE },
    { match: /\.md$/, status: 404, body: '' },          // .md 捷径失败
    { match: 'example.com/post', body: UPSTREAM_HTML }, // HTML 兜底
    ZHIPU_OK,
  ])
}

/* ---------- parseRss ---------- */

describe('parseRss', () => {
  it('解析条目:CDATA/实体/分类/会员尾巴清理', () => {
    const items = parseRss(rssXml(true))
    expect(items.length).toBe(1)
    expect(items[0].title).toBe('Test & Article')
    expect(items[0].link).toBe('https://best.xiaohu.ai/article/test-one/')
    expect(items[0].summary).toBe('Summary text')
    expect(items[0].categories).toEqual(['产品发布', 'Example'])
    expect(Date.parse(items[0].pubDate)).not.toBeNaN()
    expect(items[0].paid).toBe(true) // 会员推广尾 = 会员文章标记
  })

  it('无会员推广尾的条目不是会员文章', () => {
    const xml = `<rss><channel><item>
      <title>Free One</title><link>https://best.xiaohu.ai/article/free-one/</link>
      <description>普通摘要</description><pubDate>${new Date().toUTCString()}</pubDate>
    </item></channel></rss>`
    const items = parseRss(xml)
    expect(items[0].paid).toBeFalsy()
    expect(items[0].summary).toBe('普通摘要')
  })

  it('缺标题/链接的条目被跳过', () => {
    const xml = `<rss><channel><item><description>no title</description></item></channel></rss>`
    expect(parseRss(xml)).toEqual([])
  })
})

/* ---------- extractArticleSource ---------- */

describe('extractArticleSource', () => {
  it('提取来源名与「阅读原文」上游链接', () => {
    const src = extractArticleSource(ARTICLE_PAGE, 'https://best.xiaohu.ai/article/test-one/')
    expect(src?.sourceName).toBe('Example Corp')
    expect(src?.upstreamUrl).toBe('https://example.com/post')
  })

  it('无「阅读原文」时从外链兜底推断(过滤本站噪音)', () => {
    const html = `<a href="https://best.xiaohu.ai/x">self</a><a href="https://t.me/xiaohubest_bot">tg</a><a href="https://open.example.org/p/1">real</a>`
    const src = extractArticleSource(html, 'https://best.xiaohu.ai/article/a/')
    expect(src?.upstreamUrl).toBe('https://open.example.org/p/1')
  })

  it('无任何外链时返回空上游(仅来源名)', () => {
    const src = extractArticleSource('<p>纯文本</p>', 'https://best.xiaohu.ai/a/')
    expect(src?.upstreamUrl).toBeUndefined()
    expect(src?.sourceName).toBe('')
  })
})

/* ---------- html2md ---------- */

describe('extractMarkdown', () => {
  it('提取正文并转 Markdown(相对链接绝对化/代码块保留/导航页脚剔除)', () => {
    const md = extractMarkdown(UPSTREAM_HTML, 'https://example.com/post')
    expect(md).toContain('# Big Launch')
    expect(md).toContain('[new docs](https://example.com/docs)')
    expect(md).toContain('```bash')
    expect(md).toContain('npm install example')
    expect(md).not.toContain('Home About Contact')
    expect(md).not.toContain('Copyright Noise')
  })

  it('引用与列表转换(回归:曾因自递归爆栈)', () => {
    const html = `<article>
      <blockquote><p>Quoted important note here.</p></blockquote>
      <ul><li>first item <a href="/a">link</a></li><li>second item</li></ul>
      <ol><li>step one</li><li>step two</li></ol>
      <p>${'padding text to pass threshold. '.repeat(10)}</p>
    </article>`
    const md = extractMarkdown(html, 'https://example.com/x')
    expect(md).toContain('> Quoted important note here.')
    expect(md).toContain('- first item [link](https://example.com/a)')
    expect(md).toContain('- second item')
    expect(md).toContain('1. step one')
    expect(md).toContain('2. step two')
  })

  it('figure/figcaption 转换(回归:曾因自递归爆栈)', () => {
    const html = `<article>
      <figure><img src="/img/demo.png" alt="Demo shot"><figcaption>Screenshot of the new feature in action</figcaption></figure>
      <p>${'Body padding text to pass the content threshold. '.repeat(10)}</p>
    </article>`
    const md = extractMarkdown(html, 'https://example.com/x')
    expect(md).toContain('![Demo shot](https://example.com/img/demo.png)')
    expect(md).toContain('Screenshot of the new feature in action')
  })

  it('畸形深嵌套不爆栈(深度护栏)', () => {
    const deep = '<div>'.repeat(300) + 'innermost text content here' + '</div>'.repeat(300)
    const md = extractMarkdown(`<body><main>${deep}</main></body>`, 'https://example.com/x')
    expect(md).toContain('innermost text content here')
  })

  it('非 HTML 输入原样返回', () => {
    expect(extractMarkdown('# already markdown')).toBe('# already markdown')
  })
})

/* ---------- translate ---------- */

describe('translateMarkdown', () => {
  it('中文检测', () => {
    expect(cjkRatio('这是中文')).toBeGreaterThan(0.5)
    expect(isMostlyChinese('# 中文标题\n\n正文是中文的内容')).toBe(true)
    expect(isMostlyChinese('# English Title\n\nThis is English body text')).toBe(false)
  })

  it('代码围栏不被拆开', () => {
    const code = 'const x = 1\n'.repeat(500) // ~6000 字符的代码块
    const md = `Intro text\n\n\`\`\`js\n${code}\`\`\`\n\nOutro text`
    const chunks = splitMarkdownChunks(md)
    expect(chunks.length).toBeGreaterThan(1)
    const fenceChunks = chunks.filter(c => c.includes('```'))
    for (const c of fenceChunks) {
      expect((c.match(/```/g) || []).length % 2).toBe(0) // 围栏成对
    }
  })

  it('多块分块翻译后重组(注入 mock llm)', async () => {
    const longPara = 'This is a long english paragraph for translation testing. '.repeat(80)
    const md = `# Title\n\n${longPara}\n\n${longPara}`
    let calls = 0
    const outcome = await translateMarkdown(md, {
      llm: async () => {
        calls++
        return { text: `第${calls}块译文`, engine: 'zhipu', model: 'glm-5.3-flash' }
      },
    })
    expect(calls).toBeGreaterThan(1)
    expect(outcome.skipped).toBe(false)
    expect(outcome.text).toContain('第1块译文')
    expect(outcome.text).toContain('第2块译文')
  })

  it('原文已是中文则跳过翻译', async () => {
    let called = false
    const outcome = await translateMarkdown('# 中文\n\n这段完全是中文内容,无需翻译。', {
      llm: async () => {
        called = true
        return { text: '不应调用', engine: 'zhipu', model: 'm' }
      },
    })
    expect(called).toBe(false)
    expect(outcome.skipped).toBe(true)
  })
})

/* ---------- runAggregation e2e ---------- */

describe('runAggregation 全链路(mock 网络)', () => {
  it('发现→溯源→抓取→翻译→发布→状态落盘', async () => {
    const report = await runAggregation('manual', { fetcher: happyFetch() })

    expect(report.discovered).toBe(1)
    expect(report.published).toBe(1)
    expect(report.failed).toBe(0)
    const item = report.items[0]
    expect(item.status).toBe('published')
    expect(item.slug).toBe('test-one')
    expect(item.upstreamUrl).toBe('https://example.com/post')
    expect(item.sourceName).toBe('Example Corp')

    // 文章已写入,含来源 blockquote、翻译正文、聚合标签
    const file = path.join(articlesDir, 'test-one.md')
    expect(fs.existsSync(file)).toBe(true)
    const raw = fs.readFileSync(file, 'utf-8')
    expect(raw).toContain('tags: [')
    expect(raw).toContain('聚合')
    expect(raw).toContain('会员') // 会员文章(rssXml 条目带会员推广尾)优先挂「会员」标签
    expect(raw).toContain('> **原文链接**: [https://example.com/post]')
    expect(raw).toContain('重大发布') // 翻译后的正文已入文

    // 状态与运行日志落盘
    const state = readState()
    expect(state.lastRunAt).toBeTruthy()
    expect(state.processedUrls).toContain('https://best.xiaohu.ai/article/test-one/')
    expect(state.publishedCount).toBe(1)
    expect(listRuns().length).toBe(1)
  }, 60_000)

  it('第二次运行去重(已处理不再发现,且计入跳过明细)', async () => {
    const report = await runAggregation('cron', { fetcher: happyFetch() })
    expect(report.discovered).toBe(0)
    expect(report.published).toBe(0)
    expect(report.items).toHaveLength(1)
    expect(report.items[0].status).toBe('skipped')
  }, 60_000)

  it('24 小时窗口:仅处理 pubDate ∈ [执行时刻-24h, 执行时刻] 的条目(含 5 分钟时钟容差)', async () => {
    const now = new Date('2026-09-29T16:00:00Z')
    const item = (slug: string, date: Date) => `
  <item>
    <title>${slug}</title>
    <link>https://best.xiaohu.ai/article/${slug}/</link>
    <description>desc</description>
    <pubDate>${date.toUTCString()}</pubDate>
  </item>`
    const xml = `<rss><channel>${item('window-fresh', new Date(now.getTime() - 2 * 3600_000))}${item('window-stale', new Date(now.getTime() - 30 * 3600_000))}${item('window-future', new Date(now.getTime() + 2 * 60_000))}</channel></rss>`
    const fetcher = mockFetch([
      { match: 'rss.xml', body: xml },
      { match: 'best.xiaohu.ai/article/window-fresh', body: ARTICLE_PAGE },
      { match: /\.md$/, status: 404, body: '' },
      { match: 'example.com/post', body: UPSTREAM_HTML },
      ZHIPU_OK,
    ])

    const report = await runAggregation('manual', { fetcher, now })

    // 窗口内:2 小时前 + 2 分钟未来(容差);30 小时前的老条目不发现也不入明细
    expect(report.discovered).toBe(2)
    expect(report.items.find(i => i.xiaohuUrl.includes('window-stale'))).toBeUndefined()
    expect(fs.existsSync(path.join(articlesDir, 'window-fresh.md'))).toBe(true)
    expect(fs.existsSync(path.join(articlesDir, 'window-stale.md'))).toBe(false)
  }, 60_000)

  it('上游抓取失败:重试 3 次后记录原因,不发半成品', async () => {
    // 新条目:链接 different
    const xml = `<rss><channel><item>
      <title>Fail Case</title>
      <link>https://best.xiaohu.ai/article/fail-case/</link>
      <description>desc</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item></channel></rss>`
    const page = ARTICLE_PAGE.replace('https://example.com/post', 'https://down.example.com/x')
    const fetcher = mockFetch([
      { match: 'rss.xml', body: xml },
      { match: 'best.xiaohu.ai/article/fail-case', body: page },
      { match: 'down.example.com', status: 500, body: 'boom' },
      ZHIPU_OK,
    ])

    const report = await runAggregation('manual', { fetcher })
    expect(report.failed).toBe(1)
    const item = report.items.find(i => i.title === 'Fail Case')
    expect(item?.status).toBe('failed')
    expect(item?.error).toContain('已重试3次')
    expect(item?.upstreamUrl).toBe('https://down.example.com/x') // 失败项也带上游链接供重爬
    expect(fs.existsSync(path.join(articlesDir, 'fail-case.md'))).toBe(false)
    // 失败不标记已处理:留在窗口内由下次运行自动重试(2026-09-30 豆包缺文教训)
    expect(readState().processedUrls).not.toContain('https://best.xiaohu.ai/article/fail-case/')
  }, 60_000)

  it('并发触发被运行锁拒绝(回归:catchup 与手动触发曾重叠互抢配额)', async () => {
    const fetcher = mockFetch([
      { match: 'rss.xml', body: rssXml(false) }, // 空列表,第一次运行也快速结束
      ZHIPU_OK,
    ])
    const [a, b] = await Promise.allSettled([
      runAggregation('manual', { fetcher }),
      runAggregation('manual', { fetcher }),
    ])
    const statuses = [a, b].map(r => r.status).sort()
    expect(statuses).toEqual(['fulfilled', 'rejected'])
    const rejected = [a, b].find(r => r.status === 'rejected') as PromiseRejectedResult
    expect(rejected.reason.message).toContain('仍在执行中')
  }, 30_000)
})

/* ---------- parseMemberListing ---------- */

describe('parseMemberListing', () => {
  it('从会员列表页提取文章链接与标题', () => {
    const html = `
      <a class="art-card card" href="/article/higgsfield-production-skills/">
        <div class="cat"><span class="sq"></span>深度</div>
        <div class="srcbar"><span class="t mono">来源 · Higgsfield</span></div>
        <div class="card-body"><h3>Higgsfield 的 11 个制作技能</h3><p class="dek">让 Claude 帮你搭三维场景</p></div>
      </a>
      <a class="art-card card" href="/article/spending-your-effort/">
        <div class="card-body"><h3>把你的精力花在哪</h3><p class="dek">摘要</p></div>
      </a>
      <a class="art-card card" href="/article/higgsfield-production-skills/">
        <div class="card-body"><h3>重复链接应去重</h3></div>
      </a>
    `
    const items = parseMemberListing(html, 'https://best.xiaohu.ai')
    expect(items.length).toBe(2)
    expect(items[0].link).toBe('https://best.xiaohu.ai/article/higgsfield-production-skills/')
    expect(items[0].title).toBe('Higgsfield 的 11 个制作技能')
    expect(items[0].categories).toContain('Higgsfield')
    expect(items.every(i => i.categories.includes('会员'))).toBe(true)
  })
})

/* ---------- findUpstreamBySearch ---------- */

describe('findUpstreamBySearch', () => {
  it('优先返回与来源名同域的搜索结果', async () => {
    const ddg = `
      <a class="result__a" href="//duckduckgo.com/l/?uddg=https%3A%2F%2Fother.com%2Fx">Other</a>
      <a class="result__a" href="//duckduckgo.com/l/?uddg=https%3A%2F%2Fhiggsfield.ai%2Fmcp%2Fbundles%2Fproduction-skills">Higgsfield Production Skills</a>
    `
    const fetcher = mockFetch([{ match: 'duckduckgo.com', body: ddg }])
    const res = await findUpstreamBySearch('Higgsfield', 'Higgsfield 生产级技能包', { fetcher })
    expect(res?.url).toBe('https://higgsfield.ai/mcp/bundles/production-skills')
  })

  it('无结果返回 null', async () => {
    const fetcher = mockFetch([{ match: 'duckduckgo.com', body: '<html>no results</html>' }])
    const res = await findUpstreamBySearch('Higgsfield', 'title', { fetcher })
    expect(res).toBeNull()
  })
})

/* ---------- runMemberAggregation e2e ---------- */

describe('runMemberAggregation(会员文章,无阅读原文→网络搜索)', () => {
  it('会员文章无「阅读原文」时用来源名搜索找回上游并成功发布', async () => {
    // 会员文章页:只有「来源」名,没有阅读原文锚点
    const memberPage = `<html><head><title>Higgsfield 的 11 个制作技能 · 小互</title></head><body>
      <span class="lbl mono">来源</span><span class="src">Higgsfield</span>
      <p>会员正文……</p>
    </body></html>`
    const fetcher = mockFetch([
      { match: 'best.xiaohu.ai/article/higgsfield', body: memberPage },
      { match: 'duckduckgo.com', body: `<a class="result__a" href="//duckduckgo.com/l/?uddg=https%3A%2F%2Fhiggsfield.ai%2Fmcp%2Fbundles%2Fproduction-skills">Higgsfield</a>` },
      { match: /\.md$/, status: 404, body: '' },
      { match: 'higgsfield.ai/mcp', body: UPSTREAM_HTML },
      ZHIPU_OK,
    ])
    const report = await runMemberAggregation('manual', {
      fetcher,
      urls: ['https://best.xiaohu.ai/article/higgsfield-production-skills/'],
    })
    expect(report.kind).toBe('member')
    expect(report.discovered).toBe(1)
    expect(report.published).toBe(1)
    expect(report.failed).toBe(0)
    const item = report.items[0]
    expect(item.status).toBe('published')
    expect(item.resolution).toBe('web-search')
    expect(item.upstreamUrl).toBe('https://higgsfield.ai/mcp/bundles/production-skills')
    expect(item.sourceName).toBe('Higgsfield')
  }, 60_000)
})

/* ---------- crawlAndPublish(手动爬取) ---------- */

describe('crawlAndPublish', () => {
  it('手动 URL → 抓取翻译发布', async () => {
    const fetcher = mockFetch([
      { match: /\.md$/, status: 404, body: '' },
      { match: 'example.com/manual', body: UPSTREAM_HTML },
      ZHIPU_OK,
    ])
    const res = await crawlAndPublish('https://example.com/manual', { fetcher })
    expect(res.slug).toBeTruthy()
    expect(res.translated).toBe(true)
    const file = path.join(articlesDir, `${res.slug}.md`)
    expect(fs.readFileSync(file, 'utf-8')).toContain('管理台手动提交')
  }, 30_000)

  it('GitHub 仓库链接走 README 通道', async () => {
    const fetcher = mockFetch([
      { match: 'api.github.com/repos/foo/bar/readme', body: '# Bar Project\n\nA useful tool.' },
      ZHIPU_OK,
    ])
    const res = await crawlAndPublish('https://github.com/foo/bar', { title: 'Bar 项目', fetcher })
    expect(res.slug).toBe('bar')
  }, 30_000)

  it('非法 URL 报错', async () => {
    await expect(crawlAndPublish('not-a-url')).rejects.toThrow(/URL 无效/)
  })

  it('地区限制/反爬拦截页判废(回归:曾把封锁页当正文发布)', async () => {
    const regionBlocked = `<html><body><main><article>
      <h1>Unavailable</h1>
      <p>很遗憾，Claude 目前仅在某些地区可用。如果您认为收到此消息有误，请联系支持团队。</p>
    </article></main></body></html>`
    const fetcher = mockFetch([
      { match: /\.md$/, status: 404, body: '' },
      { match: 'example.com/blocked', body: regionBlocked },
    ])
    await expect(crawlAndPublish('https://example.com/blocked', { fetcher })).rejects.toThrow(/疑似地区限制|正文过短/)
  }, 30_000)

  it('单篇被地区限制时走 llms-full.txt 兜底(回归:兜底函数曾实现但未接线)', async () => {
    const docUrl = 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5-5'
    // 伪造全量文档:frontmatter 登记本篇 URL,正文 400 字符以上;整体 ≥10KB 才像真文档
    const body = 'This guide covers the prompting patterns specific to Claude Opus 5.5. ' +
      'Effort calibration, thinking behavior in API integrations, progress updates, and more. '.repeat(30)
    const llmsFull = `${'x'.repeat(10_000)}\n---\ntitle: Prompting Claude Opus 5.5\nurl: ${docUrl}\ndescription: "test doc"\n---\n\n${body}\n\n---\ntitle: Next Doc\nurl: https://platform.claude.com/docs/en/next\n---\n\nshould not appear in extracted segment.\n`
    const regionBlocked = '<html><body><p>App unavailable in your region. 仅在某些地区可用。</p></body></html>'
    const fetcher = mockFetch([
      { match: /\.md$/, status: 404, body: '' },
      { match: 'llms-full.txt', body: llmsFull },
      { match: 'platform.claude.com/docs', body: regionBlocked },
    ])
    const res = await fetchUpstreamMarkdown(docUrl, { fetcher })
    expect(res.strategy).toBe('llms-full')
    expect(res.markdown).toContain('prompting patterns specific to Claude Opus 5.5')
    expect(res.markdown).not.toContain('should not appear in extracted segment')
  }, 30_000)

  it('llms-full.txt 不存在的 host:缓存「无」后二次调用不崩溃(回归:缓存 null 读取崩溃)', async () => {
    const regionBlocked = '<html><body><p>App unavailable in your region. 仅在某些地区可用。</p></body></html>'
    const fetcher = mockFetch([
      { match: /\.md$/, status: 404, body: '' },
      { match: 'llms-full.txt', status: 404, body: 'not found' },
      { match: 'noblog.example.org', body: regionBlocked },
    ])
    // 两次失败:第二次走「该 host 无 llms-full」缓存分支,不得抛 TypeError
    await expect(fetchUpstreamMarkdown('https://noblog.example.org/a', { fetcher }))
      .rejects.toThrow(/已重试3次/)
    await expect(fetchUpstreamMarkdown('https://noblog.example.org/b', { fetcher }))
      .rejects.toThrow(/已重试3次/)
  }, 60_000)
})

/* ---------- 北京时间 23:59:59 槽位门控 ---------- */

describe('lastBeijingSlot / dueSlot(严格北京时间 23:59:59,与宿主机时区无关)', () => {
  it('槽位边界:UTC 15:59:59 即北京 23:59:59', () => {
    // 北京 23:59:59 整 → 槽位即此刻
    expect(lastBeijingSlot(new Date('2026-09-29T15:59:59Z')).toISOString()).toBe('2026-09-29T15:59:59.000Z')
    // 北京 23:59:58 → 仍是昨天的槽位
    expect(lastBeijingSlot(new Date('2026-09-29T15:59:58Z')).toISOString()).toBe('2026-09-28T15:59:59.000Z')
    // 北京次日凌晨 00:30 → 昨天的槽位(今天 23:59:59 未到)
    expect(lastBeijingSlot(new Date('2026-09-29T16:30:00Z')).toISOString()).toBe('2026-09-29T15:59:59.000Z')
    // 北京次日上午 10:00 → 昨天的槽位
    expect(lastBeijingSlot(new Date('2026-09-30T02:00:00Z')).toISOString()).toBe('2026-09-29T15:59:59.000Z')
  })

  it('门控:槽位未运行(含首次)→ 触发;已运行 → 不再触发', () => {
    const now = new Date('2026-09-29T16:30:00Z') // 北京 09-30 00:30
    const slotDue = '2026-09-29T15:59:59.000Z'
    const mk = (lastSlotAt: string | null) => ({ lastRunAt: null, processedUrls: [], publishedCount: 0, lastSlotAt })
    // 首次(无槽位记录)→ 立即回补
    expect(dueSlot(mk(null), now)?.toISOString()).toBe(slotDue)
    // 昨天槽位已运行,今天的未运行 → 触发今天槽位
    expect(dueSlot(mk('2026-09-28T15:59:59.000Z'), now)?.toISOString()).toBe(slotDue)
    // 今天槽位已运行 → 不触发
    expect(dueSlot(mk(slotDue), now)).toBeNull()
  })
})

/* ---------- parseMemberListing:付费标记 + 日期提取 ---------- */

describe('parseMemberListing(付费标记 + MM-DD 日期提取)', () => {
  const card = (slug: string, paid: 0 | 1, when: string, title = `文章 ${slug}`) => `
    <a class="art-card card" data-paid="${paid}" href="/article/${slug}/">
      <div class="cover"><span class="acc-flag ${paid ? 'paid' : 'free'}">${paid ? '🔒 会员' : '免费'}</span></div>
      <div class="srcbar"><span class="t mono">来源 · Test Src</span></div>
      <div class="card-body"><h3>${title}</h3><p class="dek">摘要</p>
      <div class="card-foot"><span class="foot-right"><span class="when mono">${when} · 约 8 分钟</span></span></div></div>
    </a>`

  it('提取 data-paid 付费标记与 .when 日期(MM-DD 按执行时刻推断年份)', () => {
    const items = parseMemberListing(
      card('paid-one', 1, '09-28') + card('free-one', 0, '09-28'),
      'https://best.xiaohu.ai',
      new Date('2026-09-28T13:00:00Z'),
    )
    expect(items).toHaveLength(2)
    const paid = items.find(i => i.link.includes('paid-one'))!
    const free = items.find(i => i.link.includes('free-one'))!
    expect(paid.paid).toBe(true)
    expect(paid.pubDate).toBe('2026-09-28')
    expect(free.paid).toBe(false)
  })

  it('年初看到「12-30」推断为上一年(跨年容差)', () => {
    const items = parseMemberListing(card('year-edge', 1, '12-30'), 'https://best.xiaohu.ai', new Date('2027-01-02T13:00:00Z'))
    expect(items[0].pubDate).toBe('2026-12-30')
  })

  it('真实站点卡片结构(data-paid 在锚点属性、when 在 card-foot)可解析', () => {
    const html = `<a class="art-card card has-photo" data-paid="1" data-cover="/covers/x.webp" style="--tint:#0e7490" href="/article/higgsfield-passport-rush-animation/">
      <div class="cover"><span class="acc-flag paid" title="会员">🔒 会员</span><div class="cat"><span class="sq"></span>AI 实操</div><div class="no mono">№ 1611</div>
      <div class="srcbar"><span class="t mono">来源 · Higgsfield Animation</span></div></div>
      <div class="card-body"><h3>3 天做完 18 个镜头</h3><p class="dek">摘要文字</p>
      <div class="card-foot"><span class="foot-tags"><span class="tag-chip">Higgsfield</span></span><span class="foot-right"><span class="when mono">09-28 · 约 15 分钟</span></span></div></div>
    </a>`
    const items = parseMemberListing(html, 'https://best.xiaohu.ai', new Date('2026-09-28T13:00:00Z'))
    expect(items).toHaveLength(1)
    expect(items[0].paid).toBe(true)
    expect(items[0].pubDate).toBe('2026-09-28')
    expect(items[0].categories).toContain('Higgsfield Animation')
  })
})

/* ---------- pendingMemberItems:倒推 24 小时的新付费文章 = 待处理列表 ---------- */

describe('pendingMemberItems(待处理 = 倒推 24 小时内的新付费文章)', () => {
  const now = new Date('2026-09-28T12:00:00Z') // 北京 20:00(会员列表模式的手动工具,与槽位无关)
  const item = (slug: string, paid: boolean, pubDate: string): FeedItem => ({
    title: slug,
    link: `https://best.xiaohu.ai/article/${slug}/`,
    summary: '',
    categories: ['会员'],
    pubDate,
    paid,
  })

  it('窗口内付费新文章 → 待处理;免费/窗口外/无日期 → 不入列表', () => {
    const items = [
      item('today-paid', true, '2026-09-28'),
      item('yesterday-paid', true, '2026-09-27'), // now-24h 所在日,日粒度窗口内
      item('twodays-paid', true, '2026-09-26'),   // 窗口外
      item('today-free', false, '2026-09-28'),    // 非付费
      item('today-nodate', true, ''),             // 无日期,无法判定「新」
    ]
    const { pending, skipped } = pendingMemberItems(items, [], now)
    expect(pending.map(i => i.title)).toEqual(['today-paid', 'yesterday-paid'])
    expect(skipped).toEqual([])
  })

  it('窗口内已处理过的付费文章 → 计入跳过明细,不重抓;窗口外已处理的不关心', () => {
    const items = [
      item('done', true, '2026-09-28'),
      item('fresh', true, '2026-09-28'),
      item('done-old', true, '2026-09-26'), // 窗口外,虽已处理也不入明细
    ]
    const doneUrls = ['https://best.xiaohu.ai/article/done/', 'https://best.xiaohu.ai/article/done-old/']
    const { pending, skipped } = pendingMemberItems(items, doneUrls, now)
    expect(pending.map(i => i.title)).toEqual(['fresh'])
    expect(skipped.map(i => i.title)).toEqual(['done'])
  })
})

/* ---------- runMemberAggregation e2e:24 小时窗口 ---------- */

describe('runMemberAggregation(24 小时窗口端到端)', () => {
  it('待处理列表只含窗口内新付费文章:已处理→跳过,窗口外/免费→不处理', async () => {
    // 预置状态:processed-paid 已处理过
    fs.writeFileSync(path.join(aggDir, 'state.json'), JSON.stringify({
      lastRunAt: '2026-09-27T13:00:00.000Z',
      lastSlotAt: '2026-09-27T13:00:00.000Z',
      processedUrls: ['https://best.xiaohu.ai/article/processed-paid/'],
      publishedCount: 0,
    }))

    const card = (slug: string, paid: 0 | 1, when: string) => `
      <a class="art-card card" data-paid="${paid}" href="/article/${slug}/">
        <div class="srcbar"><span class="t mono">来源 · Test Src</span></div>
        <div class="card-body"><h3>${slug}</h3><p class="dek">摘要</p>
        <div class="card-foot"><span class="foot-right"><span class="when mono">${when} · 约 8 分钟</span></span></div></div>
      </a>`
    const listing = card('processed-paid', 1, '09-28') + card('fresh-paid', 1, '09-28')
      + card('old-paid', 1, '09-26') + card('free-today', 0, '09-28')

    const memberPage = `<html><head><title>fresh-paid · 小互</title></head><body>
      <span class="lbl mono">来源</span><span class="src">Test Src</span>
      <p>会员正文……</p>
    </body></html>`
    const fetcher = mockFetch([
      { match: 'jiedu', body: listing },
      { match: 'best.xiaohu.ai/article/fresh-paid', body: memberPage },
      { match: 'duckduckgo.com', body: `<a class="result__a" href="//duckduckgo.com/l/?uddg=https%3A%2F%2Fsrc.example.com%2Fskill">Test Src</a>` },
      { match: /\.md$/, status: 404, body: '' },
      { match: 'src.example.com', body: UPSTREAM_HTML },
      ZHIPU_OK,
    ])

    const now = new Date('2026-09-28T12:00:00Z') // 北京 20:00,窗口 = 09-27 起
    const report = await runMemberAggregation('cron', { fetcher, now })

    expect(report.discovered).toBe(1) // 仅 fresh-paid
    expect(report.published).toBe(1)
    expect(report.failed).toBe(0)
    expect(report.skipped).toBe(1) // processed-paid:窗口内已处理 → 跳过明细
    const fresh = report.items.find(i => i.xiaohuUrl.includes('fresh-paid'))!
    expect(fresh.status).toBe('published')
    expect(fresh.resolution).toBe('web-search')
    expect(report.items.find(i => i.xiaohuUrl.includes('processed-paid'))?.status).toBe('skipped')
    expect(report.items.find(i => i.xiaohuUrl.includes('old-paid'))).toBeUndefined()
    expect(report.items.find(i => i.xiaohuUrl.includes('free-today'))).toBeUndefined()
    expect(readState().processedUrls).toContain('https://best.xiaohu.ai/article/fresh-paid/')
  }, 60_000)
})

/* ---------- runScheduledAggregation:槽位门控(统一单管线) ---------- */

describe('runScheduledAggregation(北京时间 23:59:59 槽位门控,统一单管线)', () => {
  const now = new Date('2026-09-29T16:00:00Z') // 北京 09-30 00:00(09-29 槽位已过)
  const writeAggState = (s: Record<string, unknown>) =>
    fs.writeFileSync(path.join(aggDir, 'state.json'), JSON.stringify(s))

  it('本槽位已运行 → ran:false,不发起任何网络请求', async () => {
    writeAggState({
      lastRunAt: '2026-09-29T15:59:59.000Z',
      lastSlotAt: '2026-09-29T15:59:59.000Z',
      processedUrls: [],
      publishedCount: 0,
    })
    // 空路由表:任何请求都 404,若发起请求必然失败
    const r = await runScheduledAggregation('cron', { now, fetcher: mockFetch([]) })
    expect(r.ran).toBe(false)
    expect(r.reason).toBeTruthy()
  })

  it('槽位未运行 → 执行统一聚合(RSS 单管线,不再拉会员列表),推进 lastSlotAt', async () => {
    writeAggState({
      lastRunAt: '2026-09-28T15:59:59.000Z',
      lastSlotAt: '2026-09-28T15:59:59.000Z',
      processedUrls: [],
      publishedCount: 0,
    })
    const fetcher = mockFetch([
      { match: 'rss.xml', body: rssXml(false) }, // RSS 空 → discovered 0;jiedu 列表不应被请求
    ])
    const r = await runScheduledAggregation('cron', { now, fetcher })
    expect(r.ran).toBe(true)
    expect(r.slot).toBe('2026-09-29T15:59:59.000Z')
    expect(readState().lastSlotAt).toBe('2026-09-29T15:59:59.000Z')
    expect(r.report?.discovered).toBe(0)
    expect(r.report?.kind).toBeUndefined() // 统一单管线,不再有 member 类别的运行
  }, 60_000)
})

/* ---------- 跨进程运行锁(回归:dev+prod 双服务同槽位两边聚合,曾致重复文章与重复运行记录) ---------- */

describe('跨进程运行锁(dev/prod 服务共用数据目录时互斥)', () => {
  const lockDir = () => path.join(aggDir, 'run-lock')
  const mkLock = (pid: number, startedAt: string) => {
    fs.rmSync(lockDir(), { recursive: true, force: true })
    fs.mkdirSync(lockDir())
    fs.writeFileSync(path.join(lockDir(), 'lock.json'), JSON.stringify({ pid, startedAt }))
  }
  afterEach(() => fs.rmSync(lockDir(), { recursive: true, force: true }))

  it('锁被存活进程新鲜持有 → 拒绝运行(另一边 23:59:59 已在聚合)', async () => {
    mkLock(process.pid, new Date().toISOString()) // 本进程存活 = 模拟另一服务的活锁
    await expect(runAggregation('manual', { fetcher: mockFetch([]) }))
      .rejects.toThrow(/另一聚合进程正在运行/)
  })

  it('持有者进程已退出 → 视为崩溃残留,抢占后正常运行并释放锁', async () => {
    mkLock(400000, new Date().toISOString()) // 超出 pid 上限,必为已退出进程
    const report = await runAggregation('manual', { fetcher: mockFetch([{ match: 'rss.xml', body: rssXml(false) }]) })
    expect(report.published).toBe(0)
    expect(fs.existsSync(lockDir())).toBe(false) // 运行结束锁已释放
  })

  it('锁超时(>90 分钟)即使持有者存活也可抢占;运行 ID 带随机尾缀不再撞号', async () => {
    mkLock(process.pid, new Date(Date.now() - 2 * 60 * 60_000).toISOString())
    const report = await runAggregation('manual', { fetcher: mockFetch([{ match: 'rss.xml', body: rssXml(false) }]) })
    expect(report.id).toMatch(/^run-[0-9a-z]+-[0-9a-z]{4}$/)
  })
})

/* ---------- processedUrls 写入去重(回归:重跑/并发曾在数组中累积重复项) ---------- */

describe('processedUrls 写入去重', () => {
  it('同一 URL 再次处理后 processedUrls 只保留一份', async () => {
    const url = 'https://best.xiaohu.ai/article/dedup-one/'
    // 预置已处理记录;会员管线显式 urls 不受过滤限制,会再次处理同一篇
    fs.writeFileSync(path.join(aggDir, 'state.json'), JSON.stringify({
      lastRunAt: null, lastSlotAt: null, processedUrls: [url], publishedCount: 0,
    }))
    const memberPage = `<html><head><title>dedup-one · 小互</title></head><body>
      <span class="lbl mono">来源</span><span class="src">Test Src</span><p>会员正文……</p>
    </body></html>`
    const fetcher = mockFetch([
      { match: 'best.xiaohu.ai/article/dedup-one', body: memberPage },
      { match: 'duckduckgo.com', body: `<a class="result__a" href="//duckduckgo.com/l/?uddg=https%3A%2F%2Fsrc.example.com%2Fx">Test Src</a>` },
      { match: /\.md$/, status: 404, body: '' },
      { match: 'src.example.com', body: UPSTREAM_HTML },
      ZHIPU_OK,
    ])
    const report = await runMemberAggregation('manual', { fetcher, urls: [url] })
    expect(report.published).toBe(1)
    expect(readState().processedUrls.filter(u => u === url)).toHaveLength(1)
  }, 60_000)
})

/* ---------- 分级兜底:上游失败后 会员→CDP爬原文 / 非会员→小互解读站→CDP ---------- */

describe('分级兜底(上游多次抓取失败后的降级路线)', () => {
  /** 小互文章页:来源 + 阅读原文锚点 + article-body 公开解读正文 */
  const xiaohuPage = (upstream: string, marker: string) => `<html><body>
<nav>解读 深度</nav>
<span class="lbl mono">来源</span><span class="src">Test Src</span>
<div class="art-actions"><a class="act" href="${upstream}" target="_blank" rel="noopener">阅读原文 ↗</a></div>
<div class="body-divider"><span class="mono">↓ 以下为文章正文</span></div>
<article class="article-body"><p>${`${marker}小互解读站的公开正文,涵盖背景、要点与实操建议。`.repeat(40)}</p></article>
<div class="body-end">END</div>
<div class="related">相关推荐</div>
</body></html>`
  const rssOne = (slug: string, paid: boolean) => `<rss><channel><item>
    <title>${slug}</title><link>https://best.xiaohu.ai/article/${slug}/</link>
    <description>${paid ? '摘要 ｜ 完整解读为会员内容 → best.xiaohu.ai/membership/' : '普通摘要'}</description>
    <category>AI 实操</category><pubDate>${new Date().toUTCString()}</pubDate>
  </item></channel></rss>`
  const resetState = () => fs.writeFileSync(path.join(aggDir, 'state.json'), JSON.stringify({
    lastRunAt: null, lastSlotAt: null, processedUrls: [], publishedCount: 0,
  }))
  beforeEach(resetState)

  it('非会员:上游 403 → 纯 HTTP 取小互解读正文发布(resolution=xiaohu,说明行注明来源)', async () => {
    const fetcher = mockFetch([
      { match: 'rss.xml', body: rssOne('tier-free', false) },
      { match: 'best.xiaohu.ai/article/tier-free', body: xiaohuPage('https://closed.example.com/x', '免费篇') },
      { match: 'closed.example.com', status: 403, body: '' },
      ZHIPU_OK,
    ])
    const report = await runAggregation('manual', { fetcher })
    expect(report.published).toBe(1)
    expect(report.items[0].resolution).toBe('xiaohu')
    const raw = fs.readFileSync(path.join(articlesDir, 'tier-free.md'), 'utf-8')
    expect(raw).toContain('正文取自小互 AI 解读')
    expect(raw).toContain('免费篇')
  }, 60_000)

  it('非会员:上游 + 小互纯 HTTP 均失败 → CDP 渲染小互页兜底(resolution=cdp-xiaohu)', async () => {
    // 小互页纯 HTTP 可达(溯源用)但正文是空壳(无 article-body → 过短),CDP 才返回完整页
    const stubPage = `<html><body>
<span class="lbl mono">来源</span><span class="src">Test Src</span>
<div class="art-actions"><a class="act" href="https://closed.example.com/x" target="_blank" rel="noopener">阅读原文 ↗</a></div>
<p>空壳页</p></body></html>`
    const fetcher = mockFetch([
      { match: 'rss.xml', body: rssOne('tier-cdp-xiaohu', false) },
      { match: 'best.xiaohu.ai/article/tier-cdp-xiaohu', body: stubPage },
      { match: 'closed.example.com', status: 403, body: '' },
      ZHIPU_OK,
    ])
    const browserFetcher = async (url: string) => {
      expect(url).toContain('best.xiaohu.ai/article/tier-cdp-xiaohu')
      return xiaohuPage('https://closed.example.com/x', 'CDP 篇')
    }
    const report = await runAggregation('manual', { fetcher, browserFetcher })
    expect(report.published).toBe(1)
    expect(report.items[0].resolution).toBe('cdp-xiaohu')
    expect(fs.readFileSync(path.join(articlesDir, 'tier-cdp-xiaohu.md'), 'utf-8')).toContain('CDP 篇')
  }, 60_000)

  it('会员:上游失败 → CDP 直爬上游原文发布(resolution=cdp,不走小互正文)', async () => {
    const memberPage = `<html><body>
<span class="lbl mono">来源</span><span class="src">Test Src</span><p>会员正文不可见……</p>
</body></html>`
    const fetcher = mockFetch([
      { match: 'rss.xml', body: rssOne('tier-member-cdp', true) },
      { match: 'best.xiaohu.ai/article/tier-member-cdp', body: memberPage },
      { match: 'duckduckgo.com', body: `<a class="result__a" href="//duckduckgo.com/l/?uddg=https%3A%2F%2Fsrc.example.com%2Fdoc">Test Src</a>` },
      { match: 'src.example.com', status: 404, body: '' },
      ZHIPU_OK,
    ])
    const browserFetcher = async (url: string) => {
      expect(url).toBe('https://src.example.com/doc') // 会员兜底爬的是上游原文,不是小互页
      return UPSTREAM_HTML
    }
    const report = await runAggregation('manual', { fetcher, browserFetcher })
    expect(report.published).toBe(1)
    expect(report.items[0].resolution).toBe('cdp')
    expect(fs.readFileSync(path.join(articlesDir, 'tier-member-cdp.md'), 'utf-8')).toContain('CDP 浏览器渲染获取')
  }, 60_000)

  it('会员:上游 + CDP 爬原文均失败(如登录墙)→ 兜底小互解读站正文,不漏文', async () => {
    // 2026-09-30 豆包真实场景:会员文章,上游飞书文档登录墙,CDP 也拿不到
    const memberPage = `<html><body>
<span class="lbl mono">来源</span><span class="src">Test Src</span><p>会员正文不可见……</p>
</body></html>`
    const xiaohuPage = `<html><body>
<span class="lbl mono">来源</span><span class="src">Test Src</span>
<article class="article-body"><p>${`会员文章的公开解读正文,内容足够长以通过校验。`.repeat(40)}</p></article>
<div class="body-end">END</div></body></html>`
    const fetcher = mockFetch([
      { match: 'rss.xml', body: rssOne('tier-member-xiaohu', true) },
      { match: 'best.xiaohu.ai/article/tier-member-xiaohu', body: xiaohuPage },
      { match: 'duckduckgo.com', body: `<a class="result__a" href="//duckduckgo.com/l/?uddg=https%3A%2F%2Fsrc.example.com%2Fdoc">Test Src</a>` },
      { match: 'src.example.com', status: 404, body: '' },
      ZHIPU_OK,
    ])
    // CDP 爬上游原文(登录墙)拿不到;但小互页纯 HTTP 可读
    const browserFetcher = async (url: string) => { throw new Error('CDP 渲染失败: 登录墙') }
    const report = await runAggregation('manual', { fetcher, browserFetcher })
    expect(report.published).toBe(1)
    expect(report.items[0].resolution).toBe('xiaohu')
    const raw = fs.readFileSync(path.join(articlesDir, 'tier-member-xiaohu.md'), 'utf-8')
    expect(raw).toContain('正文取自小互 AI 解读')
  }, 60_000)

  it('全链失败:错误保留上游原因且不标记已处理(下次运行自动重试)', async () => {
    // 上游 500(非拦截类)不走代理;小互页可达但正文空壳(过短),CDP 再抛错 → 全链失败
    const stubPage = `<html><body>
<span class="lbl mono">来源</span><span class="src">Test Src</span>
<div class="art-actions"><a class="act" href="https://down.example.com/y" target="_blank" rel="noopener">阅读原文 ↗</a></div>
<p>空壳页</p></body></html>`
    const fetcher = mockFetch([
      { match: 'rss.xml', body: rssOne('tier-allfail', false) },
      { match: 'best.xiaohu.ai/article/tier-allfail', body: stubPage },
      { match: 'down.example.com', status: 500, body: 'boom' },
    ])
    const report = await runAggregation('manual', {
      fetcher,
      browserFetcher: async () => { throw new Error('CDP 兜底不可用') },
    })
    expect(report.failed).toBe(1)
    expect(report.items[0].error).toContain('已重试3次')
    expect(report.items[0].error).toContain('分级兜底亦失败')
    expect(readState().processedUrls).not.toContain('https://best.xiaohu.ai/article/tier-allfail/')
    expect(fs.existsSync(path.join(articlesDir, 'tier-allfail.md'))).toBe(false)
  }, 60_000)
})
