/**
 * 模型动态存储:content/models/updates.json(JSON 数组,手动维护的轻量内容)。
 * 与文章(.md)不同,单条内容小、结构固定,整体读写即可;可用 MODELS_DIR 覆盖(测试用)。
 */
import fs from 'node:fs'
import path from 'node:path'
import { MODEL_CATEGORIES } from '../../data/modelCategories'

export interface ModelUpdate {
  id: string
  title: string
  /** 一句话描述 */
  description: string
  /** 信源链接(https) */
  sourceUrl: string
  /** 模型分类(MODEL_CATEGORIES 之一) */
  category: string
  /** 添加时间 ISO */
  date: string
}

export interface ModelUpdateInput {
  title: string
  description?: string
  sourceUrl: string
  category: string
}

/** 存储目录,可用 MODELS_DIR 覆盖(测试/部署用) */
export function modelsDir(): string {
  return process.env.MODELS_DIR || path.join(process.cwd(), 'content', 'models')
}

function updatesFile(): string {
  return path.join(modelsDir(), 'updates.json')
}

/** 全部动态,按添加时间倒序;文件不存在/损坏返回空数组 */
export function listModelUpdates(): ModelUpdate[] {
  try {
    const raw = JSON.parse(fs.readFileSync(updatesFile(), 'utf-8')) as ModelUpdate[]
    if (!Array.isArray(raw)) return []
    return raw
      .filter(it => it && typeof it.id === 'string')
      .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
  } catch {
    return []
  }
}

function saveAll(items: ModelUpdate[]): void {
  const dir = modelsDir()
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(updatesFile(), JSON.stringify(items, null, 2), 'utf-8')
}

/** 校验输入,返回错误信息(null = 通过) */
export function validateModelUpdateInput(input: ModelUpdateInput): string | null {
  const title = (input.title || '').trim()
  if (!title) return '标题不能为空'
  if (title.length > 100) return '标题过长(上限 100 字)'

  const sourceUrl = (input.sourceUrl || '').trim()
  if (!sourceUrl) return '信源链接不能为空'
  try {
    const u = new URL(sourceUrl)
    if (!/^https?:$/.test(u.protocol)) throw new Error('bad protocol')
  } catch {
    return '信源链接无效(仅支持 http/https)'
  }

  const category = (input.category || '').trim()
  if (!(MODEL_CATEGORIES as readonly string[]).includes(category)) {
    return `模型分类无效,可选:${MODEL_CATEGORIES.join('、')}`
  }

  const description = (input.description || '').trim()
  if (description.length > 500) return '描述过长(上限 500 字)'
  return null
}

/** 添加一条动态;输入非法或同信源链接已存在时抛错 */
export function createModelUpdate(input: ModelUpdateInput): ModelUpdate {
  const err = validateModelUpdateInput(input)
  if (err) throw new Error(err)

  const sourceUrl = input.sourceUrl.trim()
  const existed = listModelUpdates().find(it => it.sourceUrl === sourceUrl)
  if (existed) throw new Error(`该信源链接已收录:《${existed.title}》`)

  const item: ModelUpdate = {
    id: `mu-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
    title: input.title.trim(),
    description: (input.description || '').trim(),
    sourceUrl,
    category: input.category.trim(),
    date: new Date().toISOString(),
  }
  saveAll([item, ...listModelUpdates()])
  return item
}

/** 删除一条动态,成功返回 true */
export function deleteModelUpdate(id: string): boolean {
  const all = listModelUpdates()
  const next = all.filter(it => it.id !== id)
  if (next.length === all.length) return false
  saveAll(next)
  return true
}
