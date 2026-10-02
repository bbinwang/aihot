/**
 * LLM 调用层:智谱 GLM(Anthropic 兼容端点)优先;
 * 命中限流(429/配额)时熔断 10 分钟并降级到本机 OpenAI 兼容服务
 * (LM Studio 默认 127.0.0.1:1234 / mlx_lm 默认 127.0.0.1:8080,key=1234)。
 */

const ZHIPU_BASE = () => process.env.ZHIPU_BASE_URL || 'https://open.bigmodel.cn/api/anthropic'
const ZHIPU_KEY = () => process.env.ZHIPU_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN || ''
export const TRANSLATE_MODEL = () => process.env.TRANSLATE_MODEL || 'glm-5.3-flash'

/** OpenRouter 兜底后端(无智谱 Key / 本机模型时启用,需 OPENROUTER_API_KEY) */
const OPENROUTER_BASE = () => process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1'
const OPENROUTER_KEY = () => process.env.OPENROUTER_API_KEY || ''
const OPENROUTER_MODEL = () => process.env.OPENROUTER_MODEL || 'deepseek/deepseek-v4-flash'

/** 本地 OpenAI 兼容服务候选地址,逗号分隔 */
const LOCAL_BASES = () =>
  (process.env.LOCAL_LLM_BASES || 'http://127.0.0.1:1234/v1,http://127.0.0.1:8080/v1')
    .split(',').map(s => s.trim()).filter(Boolean)
const LOCAL_KEY = () => process.env.LOCAL_LLM_API_KEY || '1234'

/** 智谱限流熔断到期时间戳(模块级内存态) */
let zhipuBlockedUntil = 0

export type Fetcher = (url: string, init?: RequestInit) => Promise<Response>

export interface LlmResult {
  text: string
  /** 实际使用的后端 */
  engine: 'zhipu' | 'openrouter' | 'local'
  model: string
}

function rateLimited(status: number, body: string): boolean {
  if (status === 429) return true
  return /rate.?limit|限流|配额|quota|exceeded|too many requests/i.test(body)
}

async function fetchJson(fetcher: Fetcher, url: string, init: RequestInit, timeoutMs: number): Promise<{ status: number; body: string }> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetcher(url, { ...init, signal: controller.signal })
    return { status: res.status, body: await res.text() }
  } finally {
    clearTimeout(timer)
  }
}

/** 调用智谱 Anthropic 兼容 /v1/messages */
async function callZhipu(system: string, user: string, maxTokens: number, fetcher: Fetcher): Promise<string> {
  const key = ZHIPU_KEY()
  if (!key) throw new Error('未配置智谱 API Key(ZHIPU_API_KEY / ANTHROPIC_AUTH_TOKEN)')
  const { status, body } = await fetchJson(fetcher, `${ZHIPU_BASE()}/v1/messages`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': key,
      authorization: `Bearer ${key}`,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: TRANSLATE_MODEL(),
      max_tokens: maxTokens,
      system,
      messages: [{ role: 'user', content: user }],
    }),
  }, 120_000)
  if (rateLimited(status, body)) {
    zhipuBlockedUntil = Date.now() + 10 * 60 * 1000
    throw Object.assign(new Error(`智谱限流(HTTP ${status})`), { rateLimited: true })
  }
  if (status >= 400) throw new Error(`智谱调用失败(HTTP ${status}): ${body.slice(0, 200)}`)
  const data = JSON.parse(body)
  const text = (data.content || []).filter((c: { type?: string }) => c.type === 'text').map((c: { text?: string }) => c.text || '').join('')
  if (!text.trim()) throw new Error('智谱返回空内容')
  return text
}

/** 本地模型 id 发现(带 10 分钟缓存) */
const localModelCache = new Map<string, { id: string; at: number }>()

async function discoverLocalModel(base: string, fetcher: Fetcher): Promise<string> {
  const hit = localModelCache.get(base)
  if (hit && Date.now() - hit.at < 10 * 60 * 1000) return hit.id
  const { status, body } = await fetchJson(fetcher, `${base}/models`, {
    headers: { authorization: `Bearer ${LOCAL_KEY()}` },
  }, 5000)
  if (status >= 400) throw new Error(`本地模型服务 ${base} 不可用(HTTP ${status})`)
  const data = JSON.parse(body)
  const id = data?.data?.[0]?.id
  if (!id) throw new Error(`本地模型服务 ${base} 无可用模型`)
  localModelCache.set(base, { id, at: Date.now() })
  return id
}

/** 调用 OpenRouter /chat/completions(OpenAI 兼容) */
async function callOpenRouter(system: string, user: string, maxTokens: number, fetcher: Fetcher): Promise<string> {
  const key = OPENROUTER_KEY()
  if (!key) throw new Error('未配置 OPENROUTER_API_KEY')
  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))
  let lastErr: unknown
  // OpenRouter 偶发 5xx/超时,重试 3 次(指数退避)
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const { status, body } = await fetchJson(fetcher, `${OPENROUTER_BASE()}/chat/completions`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${key}`,
          'x-title': 'AIHot Aggregator',
        },
        body: JSON.stringify({
          model: OPENROUTER_MODEL(),
          max_tokens: maxTokens,
          temperature: 0.3,
          messages: [
            { role: 'system', content: system },
            { role: 'user', content: user },
          ],
        }),
      }, 180_000)
      if (status >= 400) throw new Error(`OpenRouter 调用失败(HTTP ${status}): ${body.slice(0, 200)}`)
      const text = JSON.parse(body)?.choices?.[0]?.message?.content || ''
      if (!text.trim()) throw new Error('OpenRouter 返回空内容')
      return text
    } catch (err) {
      lastErr = err
      // 4xx(非 429)不重试;其余退避后重试
      const msg = err instanceof Error ? err.message : String(err)
      if (/HTTP 4[0-9]{2}/.test(msg) && !/HTTP 429/.test(msg)) break
      if (attempt < 3) await sleep(2000 * attempt)
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error(String(lastErr))
}

/** 调用本地 OpenAI 兼容 /chat/completions(逐个候选地址尝试) */
async function callLocal(system: string, user: string, maxTokens: number, fetcher: Fetcher): Promise<{ text: string; model: string }> {
  const errors: string[] = []
  for (const base of LOCAL_BASES()) {
    try {
      const model = await discoverLocalModel(base, fetcher)
      const { status, body } = await fetchJson(fetcher, `${base}/chat/completions`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', authorization: `Bearer ${LOCAL_KEY()}` },
        body: JSON.stringify({
          model,
          max_tokens: maxTokens,
          temperature: 0.3,
          messages: [
            { role: 'system', content: system },
            { role: 'user', content: user },
          ],
        }),
      }, 300_000)
      if (status >= 400) throw new Error(`HTTP ${status}: ${body.slice(0, 150)}`)
      const text = JSON.parse(body)?.choices?.[0]?.message?.content || ''
      if (!text.trim()) throw new Error('返回空内容')
      return { text, model }
    } catch (err) {
      errors.push(`${base}: ${err instanceof Error ? err.message : String(err)}`)
    }
  }
  throw new Error(`本地模型均不可用 → ${errors.join(';')}`)
}

/**
 * 单次补全:智谱优先,限流/失败自动降级本地模型。
 * 智谱因「非限流原因」失败时同样降级本地,保证任务尽量完成。
 */
export async function llmComplete(opts: {
  system: string
  user: string
  maxTokens?: number
  fetcher?: Fetcher
}): Promise<LlmResult> {
  const fetcher = opts.fetcher || (globalThis.fetch as unknown as Fetcher)
  const maxTokens = opts.maxTokens ?? 8192
  const zhipuAvailable = ZHIPU_KEY() && Date.now() >= zhipuBlockedUntil

  if (zhipuAvailable) {
    try {
      const text = await callZhipu(opts.system, opts.user, maxTokens, fetcher)
      return { text, engine: 'zhipu', model: TRANSLATE_MODEL() }
    } catch {
      // 降级:OpenRouter → 本地
    }
  }
  if (OPENROUTER_KEY()) {
    try {
      const text = await callOpenRouter(opts.system, opts.user, maxTokens, fetcher)
      return { text, engine: 'openrouter', model: OPENROUTER_MODEL() }
    } catch {
      // 降级本地
    }
  }
  const local = await callLocal(opts.system, opts.user, maxTokens, fetcher)
  return { text: local.text, engine: 'local', model: local.model }
}
