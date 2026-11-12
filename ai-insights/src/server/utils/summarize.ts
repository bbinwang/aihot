/**
 * AI 总结与标签提炼(手动爬取管线):
 *   翻译后的中文正文 → LLM 生成 Markdown 总结(文章标题下方的「AI 总结」区)
 *   → 再基于总结提炼标签(替代人工填标签)。
 * 后端与限流降级复用 llm.ts(智谱 GLM 优先 → OpenRouter → 本机模型)。
 */
import { llmComplete, type Fetcher } from './llm'

/** 总结输入正文字符上限(超长截断,控制 token 成本;总结只需开篇与主体) */
const SUMMARY_INPUT_CAP = 24_000

/** 总结系统提示(含唯一标记「资深技术编辑」,测试按请求体路由 mock 用) */
const SUMMARY_SYSTEM = [
  '你是资深技术编辑。基于用户提供的文章正文,用简体中文写一份 Markdown 格式的内容总结,严格遵守:',
  '- 用 3-6 个要点组织:每条形如「- **小标题**:一两句话说明」,概括核心观点/发布内容/关键数据/结论',
  '- 关键数据、产品名、模型名保留原文(如 Claude、GPT-5、Transformer)',
  '- 只总结正文已有信息,不编造、不评论;不添加开场白或结尾(如「以下是总结」),直接输出要点列表',
].join('\n')

/** 标签提炼系统提示(含唯一标记「内容运营」) */
const TAGS_SYSTEM = [
  '你是内容运营。基于用户提供的文章总结提炼文章标签,严格遵守:',
  '- 输出 3-6 个标签:覆盖主题领域(如 大模型评测、AI Agent、开源项目、编程语言)与关键实体(产品/公司/模型名,保留英文)',
  '- 每个标签不超过 12 个字;宽泛词不要(如 AI、人工智能、技术、科技、总结)',
  '- 只输出一个 JSON 字符串数组,例如 ["AI Agent","Claude","产品发布"],不要输出任何其他文字',
].join('\n')

export interface SummaryOutcome {
  /** Markdown 格式总结(生成失败时抛错,由调用方决定是否降级) */
  summary: string
  /** 基于总结提炼的标签(提炼失败为空数组,不影响总结本身) */
  tags: string[]
  engine?: 'zhipu' | 'openrouter' | 'local'
  model?: string
}

/** 标签清洗:去编号/列表符/加粗/引号/#前缀,限长去重,最多 6 个 */
function cleanTags(list: string[]): string[] {
  const out: string[] = []
  for (const raw of list) {
    const t = raw.trim()
      .replace(/^\d+[.)、]\s*/, '')     // 序号:1. / 2) / 3、
      .replace(/^[-*•]\s*/, '')         // 列表符
      .replace(/^#+\s*/, '')            // #话题
      .replace(/\*/g, '')               // **加粗**
      .replace(/^[“"'‘『「]/, '')
      .replace(/[”"'’』」]$/, '')
      .trim()
    if (t && t.length <= 24 && !out.includes(t)) out.push(t)
  }
  return out.slice(0, 6)
}

/**
 * 从 LLM 标签应答解析标签数组:容忍 JSON 数组 / 代码围栏 / 前后缀说明 /
 * 逗号·顿号分隔等噪音;解析不出有效标签返回空数组。
 */
export function parseTagsResponse(text: string): string[] {
  let t = (text || '').trim()
  t = t.replace(/^```[a-z]*\s*/i, '').replace(/```\s*$/, '').trim()
  // 优先截取 JSON 数组段(容忍「以下是标签:」之类前后缀)
  const m = t.match(/\[[\s\S]*?\]/)
  if (m) {
    try {
      const arr = JSON.parse(m[0])
      if (Array.isArray(arr)) return cleanTags(arr.map(String))
    } catch { /* 落到分隔符切分 */ }
  }
  return cleanTags(t.split(/[,，、;\n]/))
}

/** 生成 Markdown 总结;LLM 失败/空返回时抛错(由调用方降级) */
export async function generateSummary(
  markdown: string,
  opts: { fetcher?: Fetcher; llm?: typeof llmComplete } = {},
): Promise<{ summary: string; engine: 'zhipu' | 'openrouter' | 'local'; model: string }> {
  const llm = opts.llm || llmComplete
  const input = markdown.trim().slice(0, SUMMARY_INPUT_CAP)
  const res = await llm({ system: SUMMARY_SYSTEM, user: input, maxTokens: 2048, fetcher: opts.fetcher })
  const summary = res.text
    .replace(/^```(?:markdown)?\s*\n?/, '')
    .replace(/\n?```\s*$/, '')
    .trim()
  if (!summary) throw new Error('AI 总结生成失败:模型返回空内容')
  return { summary, engine: res.engine, model: res.model }
}

/** 基于总结文本提炼标签;失败抛错(由调用方决定降级) */
export async function extractTags(
  summary: string,
  opts: { fetcher?: Fetcher; llm?: typeof llmComplete } = {},
): Promise<string[]> {
  const llm = opts.llm || llmComplete
  const res = await llm({ system: TAGS_SYSTEM, user: summary.slice(0, 4000), maxTokens: 256, fetcher: opts.fetcher })
  return parseTagsResponse(res.text)
}

/**
 * 总结 + 标签一步到位:总结失败整体抛错(调用方降级为无总结区);
 * 标签提炼失败仅放弃标签,总结照常使用。
 */
export async function summarizeArticle(
  markdown: string,
  opts: { fetcher?: Fetcher; llm?: typeof llmComplete } = {},
): Promise<SummaryOutcome> {
  const { summary, engine, model } = await generateSummary(markdown, opts)
  let tags: string[] = []
  try {
    tags = await extractTags(summary, opts)
  } catch (err) {
    console.warn(`[summarize] 标签提炼失败(仅跳过 AI 标签): ${err instanceof Error ? err.message : err}`)
  }
  return { summary, tags, engine, model }
}
