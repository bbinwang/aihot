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
  error?: string
}

const tasks = new Map<string, CrawlTask>()
/** 终态任务保留时长,过期清理防止 Map 无限增长 */
const TTL_MS = 30 * 60 * 1000

function sweep() {
  const now = Date.now()
  for (const [id, t] of tasks) {
    if (t.status !== 'running' && t.finishedAt && now - t.finishedAt > TTL_MS) tasks.delete(id)
  }
}

export function startCrawlTask(url: string, opts: { title?: string; tags?: string[]; summary?: string }): CrawlTask {
  // 同 URL 任务进行中时拒绝重复提交(双击/连点/误以为失败重试都会撞上)
  const norm = (u: string) => u.trim().replace(/\/+$/, '').toLowerCase()
  for (const t of tasks.values()) {
    if (t.status === 'running' && norm(t.url) === norm(url)) {
      throw new Error('该链接正在抓取中,请等待当前任务完成(页面上有进度提示)')
    }
  }
  sweep()
  const task: CrawlTask = { id: randomUUID(), url, status: 'running', startedAt: Date.now() }
  tasks.set(task.id, task)
  void crawlAndPublish(url, opts)
    .then((r) => {
      task.status = 'done'
      task.finishedAt = Date.now()
      task.slug = r.slug
      task.translated = r.translated
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
