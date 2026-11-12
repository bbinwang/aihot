import { describe, it, expect } from 'vitest'
import { generateSummary, extractTags, summarizeArticle, parseTagsResponse } from '../src/server/utils/summarize'
import type { LlmResult } from '../src/server/utils/llm'

/* ---------- parseTagsResponse(应答解析,纯函数) ---------- */

describe('parseTagsResponse', () => {
  it('标准 JSON 数组', () => {
    expect(parseTagsResponse('["AI Agent","Claude","产品发布"]')).toEqual(['AI Agent', 'Claude', '产品发布'])
  })

  it('代码围栏包裹的 JSON', () => {
    expect(parseTagsResponse('```json\n["开源项目","LLM"]\n```')).toEqual(['开源项目', 'LLM'])
  })

  it('前后缀说明文字中的 JSON 数组段', () => {
    expect(parseTagsResponse('好的,以下是标签:\n["RAG","向量数据库"]')).toEqual(['RAG', '向量数据库'])
  })

  it('非 JSON 输出退化为分隔符切分(去列表符/引号/序号)', () => {
    expect(parseTagsResponse('1. 大模型评测, 2. “基准测试”\n- 开源权重')).toEqual(['大模型评测', '基准测试', '开源权重'])
  })

  it('清洗:过滤超长项(>24 字)、去重、最多 6 个', () => {
    const tags = ['a', 'a', ...Array.from({ length: 10 }, (_, i) => `t${i}`)]
    expect(parseTagsResponse(JSON.stringify(tags))).toEqual(['a', 't0', 't1', 't2', 't3', 't4'])
  })

  it('空/垃圾输入返回空数组', () => {
    expect(parseTagsResponse('')).toEqual([])
    expect(parseTagsResponse('无法提炼标签')).toEqual(['无法提炼标签'])
  })
})

/* ---------- generateSummary / extractTags / summarizeArticle(注入 mock llm,无网络) ---------- */

const ok = (text: string): LlmResult => ({ text, engine: 'zhipu', model: 'glm-5.3-flash' })

describe('summarizeArticle', () => {
  const md = '# Title\n\n' + '这是一段足够长的中文正文,介绍新模型的发布与评测结果。'.repeat(5)

  it('生成 Markdown 总结,再基于总结提炼标签', async () => {
    const calls: Array<{ system: string; user: string }> = []
    const llm = async (o: { system: string; user: string }): Promise<LlmResult> => {
      calls.push({ system: o.system, user: o.user })
      if (o.system.includes('资深技术编辑')) {
        return ok('- **发布**:新模型上线\n- **评测**:15 项基准全面提升')
      }
      return ok('["大模型评测","产品发布"]')
    }
    const res = await summarizeArticle(md, { llm })
    expect(res.summary).toContain('- **发布**:新模型上线')
    expect(res.tags).toEqual(['大模型评测', '产品发布'])
    // 第二次调用(标签提炼)的输入必须是第一次产出的总结
    expect(calls).toHaveLength(2)
    expect(calls[1].user).toBe(res.summary)
  })

  it('总结失败整体抛错(调用方降级)', async () => {
    const llm = async (): Promise<LlmResult> => { throw new Error('智谱限流') }
    await expect(summarizeArticle(md, { llm })).rejects.toThrow(/智谱限流/)
  })

  it('标签提炼失败不影响总结(返回空标签)', async () => {
    const llm = async (o: { system: string }): Promise<LlmResult> => {
      if (o.system.includes('资深技术编辑')) return ok('- **要点**:内容')
      throw new Error('标签模型故障')
    }
    const res = await summarizeArticle(md, { llm })
    expect(res.summary).toContain('- **要点**:内容')
    expect(res.tags).toEqual([])
  })

  it('模型返回空内容视为失败', async () => {
    await expect(generateSummary(md, { llm: async () => ok('  ') })).rejects.toThrow(/空内容/)
  })

  it('extractTags 直接解析应答', async () => {
    const tags = await extractTags('总结内容', { llm: async () => ok('["AI Agent"]') })
    expect(tags).toEqual(['AI Agent'])
  })
})
