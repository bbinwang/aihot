import { describe, it, expect, beforeAll } from 'vitest'
import { llmComplete, type Fetcher } from '../src/server/utils/llm'

/* 模块级限流熔断状态会影响后续调用,故「成功」用例在前,「429 降级」在后 */

beforeAll(() => {
  process.env.ZHIPU_API_KEY = 'test-key'
})

type Route = { match: RegExp | string; status?: number; body: string }

function mockFetch(routes: Route[]): Fetcher {
  return (async (url: string) => {
    for (const r of routes) {
      const hit = typeof r.match === 'string' ? url.includes(r.match) : r.match.test(url)
      if (hit) return new Response(r.body, { status: r.status ?? 200 })
    }
    return new Response('not found', { status: 404 })
  }) as unknown as Fetcher
}

describe('llmComplete', () => {
  it('智谱正常路径(Anthropic 兼容 /v1/messages)', async () => {
    const fetcher = mockFetch([
      {
        match: 'bigmodel.cn',
        body: JSON.stringify({ content: [{ type: 'text', text: '智谱译文' }] }),
      },
    ])
    const res = await llmComplete({ system: 's', user: 'u', fetcher })
    expect(res.engine).toBe('zhipu')
    expect(res.text).toBe('智谱译文')
  })

  it('智谱 429 限流 → 自动降级本机模型(OpenAI 兼容)', async () => {
    const fetcher = mockFetch([
      {
        match: 'bigmodel.cn',
        status: 429,
        body: JSON.stringify({ type: 'error', error: { type: 'rate_limit_error', message: 'Rate limit exceeded (配额)' } }),
      },
      {
        match: '127.0.0.1:18000/v1/models',
        body: JSON.stringify({ data: [{ id: 'Qwen3.5-27B-Distilled' }, { id: 'MacJd-Qwen36-35B' }] }),
      },
      {
        match: '127.0.0.1:18000/v1/chat/completions',
        body: JSON.stringify({ choices: [{ message: { content: '本地模型译文' } }] }),
      },
    ])
    const res = await llmComplete({ system: 's', user: 'u', fetcher })
    expect(res.engine).toBe('local')
    expect(res.model).toBe('MacJd-Qwen36-35B')
    expect(res.text).toBe('本地模型译文')
  })

  it('智谱与本地均不可用时抛出可读错误', async () => {
    const fetcher = mockFetch([])
    await expect(llmComplete({ system: 's', user: 'u', fetcher })).rejects.toThrow(/本地模型均不可用/)
  })
})
