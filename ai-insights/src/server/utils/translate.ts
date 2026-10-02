/**
 * Markdown 中文翻译:智谱 GLM 优先(限流自动降级本机模型,见 llm.ts)。
 * 长文按代码栅栏感知的分块策略拆分翻译后重组;原文已是中文则跳过。
 */
import { llmComplete, type Fetcher } from './llm'

/** 单块最大字符数(LLM 上下文与稳定性折中) */
const CHUNK_LIMIT = 4000
/** 单篇文章最多翻译块数,超出部分截断并标注 */
const MAX_CHUNKS = 25

const SYSTEM_PROMPT = [
  '你是专业技术翻译。把用户提供的 Markdown 片段翻译成简体中文,严格遵守:',
  '- 只翻译自然语言;代码块、命令、URL、变量名、API/模型名保持原样',
  '- 保留全部 Markdown 结构:标题层级、列表、表格、链接、图片、加粗斜体、引用',
  '- 技术术语保留英文原词(如 Transformer、token、Agent、RAG)',
  '- 不添加任何解释,直接输出翻译后的 Markdown,不要输出原文',
].join('\n')

/** CJK 字符数 / 全部字母类字符数(用于判断是否已是中文) */
export function cjkRatio(text: string): number {
  const letters = text.match(/[\p{L}\p{N}]/gu) || []
  if (!letters.length) return 0
  const cjk = letters.filter(ch => /[一-鿿㐀-䶿]/.test(ch)).length
  return cjk / letters.length
}

/** 原文是否基本已是中文(无需翻译) */
export function isMostlyChinese(markdown: string): boolean {
  return cjkRatio(markdown) > 0.25
}

/**
 * 把 Markdown 切成翻译块:代码围栏整体不拆(内容再长也不跨块),
 * 段落在 4000 字符内累积;超长代码硬截断保护上下文。
 */
export function splitMarkdownChunks(markdown: string): string[] {
  const lines = markdown.split('\n')
  const chunks: string[] = []
  let current: string[] = []
  let inFence = false
  let size = 0
  /** 代码块内容硬上限,超过截断 */
  const HARD_CODE_CAP = 50_000

  const flush = () => {
    if (current.length) {
      chunks.push(current.join('\n'))
      current = []
      size = 0
    }
  }

  for (const line of lines) {
    if (/^\s*(```|~~~)/.test(line)) {
      current.push(line)
      size += line.length + 1
      inFence = !inFence
      continue
    }
    if (inFence) {
      if (size < HARD_CODE_CAP) {
        current.push(line)
        size += line.length + 1
      } else if (size < HARD_CODE_CAP + 500) {
        current.push('…(超长代码已截断,见原文)')
        size += 500
      }
      continue
    }
    if (line.trim() === '' && size >= CHUNK_LIMIT) {
      flush()
      continue
    }
    if (size + line.length + 1 > CHUNK_LIMIT * 1.5) {
      // 单行超长(如超长段落/表格):硬切保护上下文
      flush()
      current.push(line)
      size = line.length + 1
      if (size >= CHUNK_LIMIT) flush()
      continue
    }
    current.push(line)
    size += line.length + 1
  }
  flush()
  return chunks.filter(c => c.trim())
}

export interface TranslateOutcome {
  text: string
  /** true = 原文已是中文,未调用模型 */
  skipped: boolean
  engine?: 'zhipu' | 'openrouter' | 'local'
  model?: string
  truncated?: boolean
}

/** 翻译整篇 Markdown;已是中文直接返回原文 */
export async function translateMarkdown(
  markdown: string,
  opts: { fetcher?: Fetcher; llm?: typeof llmComplete } = {},
): Promise<TranslateOutcome> {
  const text = markdown.trim()
  if (!text) return { text, skipped: true }
  if (isMostlyChinese(text)) return { text, skipped: true }

  const llm = opts.llm || llmComplete
  const chunks = splitMarkdownChunks(text)
  const limited = chunks.slice(0, MAX_CHUNKS)
  const out: string[] = []
  let engine: 'zhipu' | 'openrouter' | 'local' | undefined
  let model: string | undefined

  // 串行翻译,避免触发限流
  for (const chunk of limited) {
    const res = await llm({ system: SYSTEM_PROMPT, user: chunk, maxTokens: 8192, fetcher: opts.fetcher })
    engine = res.engine
    model = res.model
    out.push(res.text.trim())
  }

  let translated = out.join('\n\n')
  const truncated = chunks.length > limited.length
  if (truncated) {
    translated += '\n\n> ⚠️ 原文较长,超出部分未翻译,请通过上方原文链接查看完整内容。'
  }
  return { text: translated, skipped: false, engine, model, truncated }
}
