import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import {
  listModelUpdates,
  createModelUpdate,
  deleteModelUpdate,
  validateModelUpdateInput,
} from '../src/server/utils/modelUpdates'
import { MODEL_CATEGORIES } from '../src/data/modelCategories'

let dir: string

beforeAll(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'aihot-models-'))
  process.env.MODELS_DIR = dir
})

afterAll(() => {
  delete process.env.MODELS_DIR
  fs.rmSync(dir, { recursive: true, force: true })
})

const ok = { title: 'GLM-5 正式发布', description: '开源权重,综合评测提升', sourceUrl: 'https://zhipu.ai/glm-5', category: '大语言模型' }

describe('validateModelUpdateInput', () => {
  it('合法输入通过', () => {
    expect(validateModelUpdateInput(ok)).toBeNull()
  })

  it('标题/信源必填,链接须 http(s),分类须在可选列表', () => {
    expect(validateModelUpdateInput({ ...ok, title: ' ' })).toMatch(/标题/)
    expect(validateModelUpdateInput({ ...ok, sourceUrl: '' })).toMatch(/信源链接/)
    expect(validateModelUpdateInput({ ...ok, sourceUrl: 'ftp://x.com' })).toMatch(/http\/https/)
    expect(validateModelUpdateInput({ ...ok, sourceUrl: 'not-a-url' })).toMatch(/无效/)
    expect(validateModelUpdateInput({ ...ok, category: '不存在分类' })).toMatch(/模型分类无效/)
  })
})

describe('createModelUpdate / listModelUpdates / deleteModelUpdate', () => {
  it('创建 → 列表按时间倒序;落盘为 updates.json', () => {
    const a = createModelUpdate(ok)
    expect(a.id).toMatch(/^mu-/)
    expect(a.category).toBe('大语言模型')
    const b = createModelUpdate({ ...ok, title: 'Whisper v4', sourceUrl: 'https://openai.com/whisper-v4', category: '语音模型' })
    const list = listModelUpdates()
    expect(list.map(x => x.id)).toEqual([b.id, a.id])
    expect(fs.existsSync(path.join(dir, 'updates.json'))).toBe(true)
  })

  it('同信源链接重复收录被拦截', () => {
    expect(() => createModelUpdate({ ...ok, title: '重复条目' })).toThrow(/已收录/)
  })

  it('标题/描述做 trim;描述可空', () => {
    const c = createModelUpdate({ title: '  Sora 3  ', sourceUrl: 'https://openai.com/sora-3', category: '视频生成' })
    expect(c.title).toBe('Sora 3')
    expect(c.description).toBe('')
  })

  it('非法输入在创建入口同样抛错(双保险)', () => {
    expect(() => createModelUpdate({ ...ok, sourceUrl: 'https://x.com/y', category: '随意的分类' })).toThrow(/模型分类无效/)
  })

  it('删除:存在返回 true 并移除;不存在返回 false', () => {
    const list = listModelUpdates()
    const target = list[list.length - 1] // 最旧一条
    expect(deleteModelUpdate(target.id)).toBe(true)
    expect(listModelUpdates().some(x => x.id === target.id)).toBe(false)
    expect(deleteModelUpdate('mu-nonexistent')).toBe(false)
  })

  it('空目录/损坏文件返回空列表不抛错', () => {
    fs.writeFileSync(path.join(dir, 'updates.json'), 'not json', 'utf-8')
    expect(listModelUpdates()).toEqual([])
  })

  it('分类列表覆盖主要维度且无重复', () => {
    expect(new Set(MODEL_CATEGORIES).size).toBe(MODEL_CATEGORIES.length)
    expect(MODEL_CATEGORIES.length).toBeGreaterThanOrEqual(8)
  })
})
