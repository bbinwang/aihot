import { randomUUID } from 'node:crypto'
import { crawlAndPublish } from './aggregator'

/**
 * 手动抓取任务注册表:POST /api/admin/crawl 立即返回 taskId,后台执行抓取+翻译,
 * 前端轮询 GET /api/admin/crawl/status 拿进度——避免同步长任务被客户端/移动网络
 * 约 60s 的空闲超时掐断(浏览器报 Failed to fetch,nginx 记 499)。
 * 进程内存存储:服务重启后记录丢失,但任务本身也无法在重启后存活,语义一致。
 */
export interface CrawlTask {
  id: string
  url: string
  status: 'running' | 'done' | 'error'
  startedAt: number
  finishedAt?: number
  slug?: string
  translated?: boolean
  /** 是否生成了「AI 总结」区(总结失败时 false,文章仍发布) */
  summarized?: boolean
  /** 是否爬取了原文(跳过爬取时字段为 false) */
  fetchOriginal?: boolean
  error?: string
  /** 提交参数快照(任务管理页展示与「编辑后重试」回填用) */
  title?: string
  tags?: string[]
  summary?: string
}

const tasks = new Map<string, CrawlTask>()
/** 终态任务保留时长(任务管理页需要回看失败原因/重试,比轮询场景放得更宽),过期清理防止 Map 无限增长 */
const TTL_MS = 2 * 60 * 60 * 1000
/** 任务总数上限(含运行中),超出时淘汰最旧的终态任务 */
const MAX_TASKS = 100

function sweep() {
  const now = Date.now()
  for (const [id, t] of tasks) {
    if (t.status !== 'running' && t.finishedAt && now - t.finishedAt > TTL_MS) tasks.delete(id)
  }
  // 超上限时按提交时间淘汰最旧的终态任务(运行中的永不淘汰)
  if (tasks.size > MAX_TASKS) {
    const sorted = [...tasks.entries()].sort((a, b) => a[1].startedAt - b[1].startedAt)
    for (const [id, t] of sorted) {
      if (tasks.size <= MAX_TASKS) break
      if (t.status !== 'running') tasks.delete(id)
    }
  }
}

export function startCrawlTask(url: string, opts: { title?: string; tags?: string[]; summary?: string; fetchOriginal?: boolean }): CrawlTask {
  const fetchOriginal = opts.fetchOriginal !== false
  // 同 URL 任务进行中时拒绝重复提交(双击/连点/误以为失败重试都会撞上)
  const norm = (u: string) => u.trim().replace(/\/+$/, '').toLowerCase()
  for (const t of tasks.values()) {
    if (t.status === 'running' && norm(t.url) === norm(url)) {
      throw new Error('该链接正在抓取中,请等待当前任务完成(页面上有进度提示)')
    }
  }
  sweep()
  const task: CrawlTask = {
    id: randomUUID(),
    url,
    status: 'running',
    startedAt: Date.now(),
    fetchOriginal,
    title: opts.title,
    tags: opts.tags,
    summary: opts.summary,
  }
  tasks.set(task.id, task)
  void crawlAndPublish(url, opts)
    .then((r) => {
      task.status = 'done'
      task.finishedAt = Date.now()
      task.slug = r.slug
      task.translated = r.translated
      task.summarized = r.summarized
      task.fetchOriginal = fetchOriginal
    })
    .catch((err) => {
      task.status = 'error'
      task.finishedAt = Date.now()
      task.error = err instanceof Error ? err.message : '爬取失败'
      console.error(`[crawl] 任务失败 ${url}:`, err)
    })
  return task
}

export function getCrawlTask(id: string): CrawlTask | undefined {
  return tasks.get(id)
}

/** 全部任务(新→旧),任务管理页列表用;顺带执行过期清理 */
export function listCrawlTasks(): CrawlTask[] {
  sweep()
  return [...tasks.values()].sort((a, b) => b.startedAt - a.startedAt)
}
