<script setup lang="ts">
import type { ArticleMeta } from '~~/server/utils/articles'
import { formatDate } from '~/utils/format'

useHead({ title: '管理控制台 · AIHot' })

/* ---------- 登录 ---------- */
const password = ref('')
const authed = ref(false)
const authError = ref('')

onMounted(() => {
  const saved = localStorage.getItem('aihot_admin_pw')
  if (saved) {
    password.value = saved
    verify()
  }
})

async function verify() {
  authError.value = ''
  const res = await $fetch<{ ok: boolean }>('/api/admin/login', {
    method: 'POST',
    body: { password: password.value },
  }).catch(() => null)
  if (res?.ok) {
    authed.value = true
    localStorage.setItem('aihot_admin_pw', password.value)
  } else {
    authError.value = '管理密码错误'
  }
}

function logout() {
  authed.value = false
  localStorage.removeItem('aihot_admin_pw')
  password.value = ''
}

/* ---------- 上传表单 ---------- */
const title = ref('')
const tagsInput = ref('')
const summary = ref('')
const slugInput = ref('')
const markdown = ref('')
const submitting = ref(false)
const result = ref<{ ok: boolean; msg: string; url?: string } | null>(null)

function onFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    const text = String(reader.result || '')
    markdown.value = text
    if (!title.value) {
      const heading = text.match(/^#\s+(.+)$/m)
      title.value = heading ? heading[1].trim() : file.name.replace(/\.md$/i, '')
    }
    result.value = null
  }
  reader.readAsText(file)
}

async function submit() {
  result.value = null
  submitting.value = true
  try {
    const res = await $fetch<{ ok: boolean; slug: string; url: string }>('/api/admin/articles', {
      method: 'POST',
      headers: { 'x-admin-password': password.value },
      body: {
        title: title.value,
        markdown: markdown.value,
        tags: tagsInput.value,
        summary: summary.value || undefined,
        slug: slugInput.value || undefined,
      },
    })
    result.value = { ok: true, msg: `发布成功:${res.slug}`, url: res.url }
    title.value = tagsInput.value = summary.value = slugInput.value = markdown.value = ''
    page.value = 1 // 新文章排在最前,回到第一页可见
    await loadList()
  } catch (err: any) {
    result.value = { ok: false, msg: err?.data?.statusMessage || err?.message || '发布失败' }
  } finally {
    submitting.value = false
  }
}

/* ---------- 左侧功能菜单 ---------- */
type AdminTab = 'articles' | 'agg' | 'tools'
const activeTab = ref<AdminTab>('articles')
const menus: { key: AdminTab; icon: string; label: string }[] = [
  { key: 'articles', icon: '📚', label: '文章管理' },
  { key: 'agg', icon: '⚡', label: '聚合任务' },
  { key: 'tools', icon: '🔧', label: '手动工具' },
]

/* ---------- 文章列表管理(分页) ---------- */
const articles = ref<ArticleMeta[]>([])
const page = ref(1)
const pageSize = 20
const totalArticles = ref(0)
const totalPages = computed(() => Math.max(1, Math.ceil(totalArticles.value / pageSize)))

async function loadList() {
  const res = await $fetch<{ items: ArticleMeta[]; total: number }>(`/api/articles?page=${page.value}&pageSize=${pageSize}`)
  articles.value = res.items
  totalArticles.value = res.total
  // 删除后当前页可能越界,自动回退
  if (!res.items.length && page.value > 1) {
    page.value = totalPages.value
    await loadList()
  }
}

function goPage(p: number) {
  if (p < 1 || p > totalPages.value || p === page.value) return
  page.value = p
  loadList()
}

watch(authed, (v) => { if (v) { loadList(); loadAgg() } }, { immediate: true })

async function remove(slug: string) {
  if (!confirm(`确认删除文章「${slug}」?不可恢复。`)) return
  await $fetch(`/api/admin/articles/${slug}`, {
    method: 'DELETE',
    headers: { 'x-admin-password': password.value },
  }).catch(() => null)
  await loadList()
}

/* ---------- 聚合任务(P2) ---------- */
interface RunItem {
  title: string
  xiaohuUrl: string
  upstreamUrl?: string
  sourceName?: string
  status: 'published' | 'failed' | 'skipped'
  slug?: string
  /** 是否会员(付费)文章 */
  paid?: boolean
  /** 溯源方式:anchor=阅读原文锚点 / search=网络搜索 */
  resolution?: string
  /** 正文抓取方式(固定三值):upstream-http=上游原文·HTTP / upstream-cdp=上游原文·CDP / xiaohu=小互站点爬取 */
  fetchMethod?: 'upstream-http' | 'upstream-cdp' | 'xiaohu'
  error?: string
}

/** 抓取方式展示文案(管理台每个链接标注,固定三值) */
const FETCH_METHOD_LABEL: Record<NonNullable<RunItem['fetchMethod']>, string> = {
  'upstream-http': '上游原文 · HTTP',
  'upstream-cdp': '上游原文 · CDP',
  'xiaohu': '小互站点爬取',
}
interface RunReport {
  id: string
  trigger: 'cron' | 'manual' | 'catchup'
  /** 运行类别:member=会员文章列表聚合 */
  kind?: string
  startedAt: string
  finishedAt: string
  durationMs: number
  discovered: number
  published: number
  failed: number
  skipped: number
  items: RunItem[]
}
interface AggStatus {
  enabled: boolean
  cron: string
  lastRunAt: string | null
  nextRunAt: string
  publishedCount: number
  processedCount: number
  runs: RunReport[]
}

const agg = ref<AggStatus | null>(null)
const aggError = ref('')
const runningAgg = ref(false)
const expandedRun = ref<string | null>(null)

/** 手动爬取表单 */
const crawlUrl = ref('')
const crawlTitle = ref('')
const crawlTags = ref('')
const crawling = ref(false)
const crawlResult = ref<{ ok: boolean; msg: string; url?: string } | null>(null)

/** 会员单链接实验:输入一个 best.xiaohu.ai 文章链接,走会员管线(来源名网络搜索→抓原文→翻译→发布) */
const memberUrl = ref('')
const memberRunning = ref(false)
const memberResult = ref<{ ok: boolean; msg: string } | null>(null)

async function runMemberOne() {
  let url = memberUrl.value.trim()
  if (!url) return
  // 仅接受 best.xiaohu.ai 的文章链接,其他交给普通手动爬取
  if (!/xiaohu\.ai\/article\//i.test(url)) {
    memberResult.value = { ok: false, msg: '请粘贴 best.xiaohu.ai/article/<slug>/ 的会员文章链接(非会员站链接请用下方「手动爬取」)' }
    return
  }
  if (!/^https?:\/\//i.test(url)) url = `https://${url}`
  memberRunning.value = true
  memberResult.value = null
  try {
    const res = await $fetch<{ ok: boolean; report: RunReport }>('/api/admin/aggregator/member-run', {
      method: 'POST',
      headers: { 'x-admin-password': password.value },
      query: { urls: url },
    })
    const it = res.report?.items?.[0]
    memberResult.value = it?.status === 'published'
      ? { ok: true, msg: `✓ 发布成功(${it.resolution || ''} 溯源)· 上游: ${it.upstreamUrl || '—'}` }
      : { ok: false, msg: `✗ 失败: ${it?.error || '未知原因'}` }
    await Promise.all([loadAgg(), loadList()])
    if (memberResult.value.ok) memberUrl.value = ''
  } catch (e: any) {
    memberResult.value = { ok: false, msg: e?.data?.statusMessage || e?.message || '会员聚合执行失败' }
  } finally {
    memberRunning.value = false
  }
}

async function runMemberAll() {
  if (!confirm('对 best.xiaohu.ai/jiedu/?acc=paid 列表页的全部会员文章执行聚合?数量较多(含抓取与翻译),可能耗时很久。')) return
  memberRunning.value = true
  memberResult.value = null
  try {
    const res = await $fetch<{ ok: boolean; report: RunReport }>('/api/admin/aggregator/member-run', {
      method: 'POST',
      headers: { 'x-admin-password': password.value },
    })
    const r = res.report
    memberResult.value = { ok: true, msg: `✓ 完成: 发现 ${r.discovered} / 发布 ${r.published} / 失败 ${r.failed}` }
    await Promise.all([loadAgg(), loadList()])
  } catch (e: any) {
    memberResult.value = { ok: false, msg: e?.data?.statusMessage || e?.message || '会员聚合执行失败' }
  } finally {
    memberRunning.value = false
  }
}

async function loadAgg() {
  aggError.value = ''
  const res = await $fetch<AggStatus>('/api/admin/aggregator', {
    headers: { 'x-admin-password': password.value },
  }).catch((e: any) => {
    aggError.value = e?.data?.statusMessage || '加载聚合状态失败'
    return null
  })
  if (res) agg.value = res
}

async function runNow() {
  if (!confirm('立即执行一次聚合?包含抓取与翻译,可能需要数分钟。')) return
  runningAgg.value = true
  aggError.value = ''
  try {
    await $fetch('/api/admin/aggregator/run', {
      method: 'POST',
      headers: { 'x-admin-password': password.value },
    })
    await Promise.all([loadAgg(), loadList()])
  } catch (e: any) {
    aggError.value = e?.data?.statusMessage || e?.message || '聚合执行失败'
  } finally {
    runningAgg.value = false
  }
}

async function crawl(url?: string, title?: string) {
  const target = (url || crawlUrl.value).trim()
  if (!target) return
  crawling.value = true
  crawlResult.value = null
  try {
    const res = await $fetch<{ ok: boolean; slug: string; url: string; translated: boolean }>('/api/admin/crawl', {
      method: 'POST',
      headers: { 'x-admin-password': password.value },
      body: {
        url: target,
        title: title || crawlTitle.value || undefined,
        tags: crawlTags.value || undefined,
      },
    })
    crawlResult.value = {
      ok: true,
      msg: `发布成功:${res.slug}${res.translated ? '(已翻译)' : '(原文即中文)'}`,
      url: res.url,
    }
    if (!url) crawlUrl.value = crawlTitle.value = crawlTags.value = ''
    await loadList()
  } catch (e: any) {
    crawlResult.value = { ok: false, msg: e?.data?.statusMessage || e?.message || '爬取失败' }
  } finally {
    crawling.value = false
  }
}

function fmtTime(iso?: string | null): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('zh-CN', { hour12: false })
}

function fmtDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`
  if (ms < 60_000) return `${(ms / 1000).toFixed(1)}s`
  return `${(ms / 60_000).toFixed(1)}min`
}

/** 最近一次运行里失败的文章(待人工处理) */
const failedItems = computed<RunItem[]>(() => {
  const run = agg.value?.runs?.[0]
  if (!run) return []
  return run.items.filter(i => i.status === 'failed')
})
</script>

<template>
  <div class="container admin-page">
    <!-- 未登录:密码页 -->
    <form v-if="!authed" class="admin-login" @submit.prevent="verify">
      <h2>🔐 管理控制台</h2>
      <input v-model="password" type="password" placeholder="管理密码" aria-label="管理密码" />
      <p v-if="authError" class="admin-error">{{ authError }}</p>
      <button class="btn" type="submit" style="width: 100%">登录</button>
    </form>

    <!-- 已登录:控制台 -->
    <template v-else>
      <h1>管理控制台</h1>
      <p class="admin-hint">
        登录后可直接上传 Markdown 文章,发布后立即可见。
        <a href="#" style="color: var(--accent)" @click.prevent="logout">退出登录</a>
      </p>

      <div class="admin-layout">
        <!-- 左侧功能菜单 -->
        <aside class="admin-menu">
          <button
            v-for="m in menus" :key="m.key" type="button"
            class="menu-item" :class="{ active: activeTab === m.key }"
            @click="activeTab = m.key"
          >
            <span class="menu-icon">{{ m.icon }}</span>{{ m.label }}
          </button>
        </aside>

        <div class="admin-panel">
          <!-- ========== 文章管理 ========== -->
          <template v-if="activeTab === 'articles'">
        <!-- 上传 -->
        <section class="admin-section">
          <h2>📝 上传新文章</h2>
          <div class="form-grid">
            <div class="form-field">
              标题 *
              <input v-model="title" type="text" placeholder="文章标题" />
            </div>
            <div class="form-field">
              标签(逗号分隔)
              <input v-model="tagsInput" type="text" placeholder="如:大模型, OpenAI" />
            </div>
            <div class="form-field full">
              摘要(留空自动截取正文)
              <input v-model="summary" type="text" placeholder="一句话摘要" />
            </div>
            <div class="form-field full">
              <span>选择本地 .md 文件(自动填入标题)</span>
              <input type="file" accept=".md,.markdown,text/markdown" @change="onFileChange" />
              <span class="file-hint">也可以直接在下面粘贴 Markdown 全文</span>
            </div>
            <div class="form-field full">
              正文(Markdown)*
              <textarea v-model="markdown" class="code" placeholder="# 标题&#10;&#10;正文内容,支持 GFM…" />
            </div>
            <div class="form-field">
              自定义 slug(可选)
              <input v-model="slugInput" type="text" placeholder="my-first-post" />
            </div>
          </div>
          <div class="form-actions">
            <button class="btn" :disabled="submitting || !title.trim() || !markdown.trim()" @click="submit">
              {{ submitting ? '发布中…' : '发布文章' }}
            </button>
            <span class="form-tip">frontmatter 会自动生成,无需手写</span>
          </div>
          <p v-if="result" class="admin-result" :class="result.ok ? 'ok' : 'err'">
            {{ result.msg }}
            <NuxtLink v-if="result.url" :to="result.url">→ 查看文章</NuxtLink>
          </p>
        </section>

        <!-- 管理 -->
        <section class="admin-section">
          <h2>📚 文章管理(共 {{ totalArticles }} 篇)</h2>
          <table class="admin-table">
            <thead>
              <tr><th>标题</th><th>日期</th><th>标签</th><th>操作</th></tr>
            </thead>
            <tbody>
              <tr v-for="a in articles" :key="a.slug">
                <td><NuxtLink class="link" :to="`/articles/${a.slug}`" target="_blank">{{ a.title }}</NuxtLink></td>
                <td>{{ formatDate(a.date) }}</td>
                <td>{{ a.tags.map(t => `#${t}`).join(' ') }}</td>
                <td><button class="delete-btn" @click="remove(a.slug)">删除</button></td>
              </tr>
              <tr v-if="!articles.length"><td colspan="4" class="empty-tip" style="padding: 24px 0">暂无文章</td></tr>
            </tbody>
          </table>
          <!-- 分页 -->
          <div class="pager">
            <button class="btn btn-plain pager-btn" :disabled="page <= 1" @click="goPage(page - 1)">← 上一页</button>
            <span class="pager-info">第 {{ page }} / {{ totalPages }} 页</span>
            <button class="btn btn-plain pager-btn" :disabled="page >= totalPages" @click="goPage(page + 1)">下一页 →</button>
          </div>
        </section>
          </template>

        <!-- ========== 聚合任务 ========== -->
        <section v-else-if="activeTab === 'agg'" class="admin-section">
          <h2>⚡ 聚合任务 · 小互热点自动聚合</h2>

          <!-- 状态卡 -->
          <div v-if="agg" class="agg-status">
            <div class="agg-stat">
              <span class="agg-label">定时</span>
              <span class="agg-value">{{ agg.enabled ? '每天北京时间 23:59:59(严格槽位)' : '已停用' }}</span>
            </div>
            <div class="agg-stat">
              <span class="agg-label">上次运行</span>
              <span class="agg-value">{{ fmtTime(agg.lastRunAt) }}</span>
            </div>
            <div class="agg-stat">
              <span class="agg-label">下次运行</span>
              <span class="agg-value">{{ agg.enabled ? fmtTime(agg.nextRunAt) : '—' }}</span>
            </div>
            <div class="agg-stat">
              <span class="agg-label">累计发布</span>
              <span class="agg-value">{{ agg.publishedCount }} 篇 / 已处理 {{ agg.processedCount }} 条</span>
            </div>
            <div class="agg-actions">
              <button class="btn" :disabled="runningAgg" @click="runNow">
                {{ runningAgg ? '聚合运行中…' : '▶ 立即运行' }}
              </button>
              <button class="btn btn-plain" @click="loadAgg">刷新</button>
            </div>
          </div>
          <p v-if="aggError" class="admin-result err">{{ aggError }}</p>
          <p v-else-if="runningAgg" class="admin-hint">
            正在抓取并翻译文章,请勿关闭页面(每篇约 0.5~2 分钟)…
          </p>

          <!-- 失败待处理 -->
          <div v-if="failedItems.length" class="agg-failed">
            <h3>⚠️ 待人工处理(最近一次运行失败 {{ failedItems.length }} 篇)</h3>
            <div v-for="(f, i) in failedItems" :key="i" class="agg-failed-row">
              <div class="agg-failed-main">
                <strong>{{ f.title }}</strong>
                <span class="agg-error">{{ f.error }}</span>
              </div>
              <div class="agg-failed-links">
                <a v-if="f.upstreamUrl" :href="f.upstreamUrl" target="_blank" rel="noopener">原文 ↗</a>
                <a v-if="f.xiaohuUrl" :href="f.xiaohuUrl" target="_blank" rel="noopener">小互 ↗</a>
                <button v-if="f.upstreamUrl" class="btn btn-plain" :disabled="crawling" @click="crawl(f.upstreamUrl, f.title)">
                  重爬发布
                </button>
              </div>
            </div>
          </div>

          <!-- 运行历史 -->
          <h3 class="agg-sub">运行历史</h3>
          <table class="admin-table">
            <thead>
              <tr><th>时间</th><th>类型</th><th>触发</th><th>发现</th><th>发布</th><th>失败</th><th>耗时</th><th>明细</th></tr>
            </thead>
            <tbody>
              <template v-for="run in agg?.runs || []" :key="run.id">
                <tr>
                  <td>{{ fmtTime(run.startedAt) }}</td>
                  <td><span class="chip" :class="run.kind === 'member' ? 'chip-published' : 'chip-skipped'">{{ run.kind === 'member' ? '会员' : 'RSS' }}</span></td>
                  <td>{{ { cron: '定时', manual: '手动', catchup: '补跑' }[run.trigger] || run.trigger }}</td>
                  <td>{{ run.discovered }}</td>
                  <td>{{ run.published }}</td>
                  <td :class="{ 'num-err': run.failed > 0 }">{{ run.failed }}</td>
                  <td>{{ fmtDuration(run.durationMs) }}</td>
                  <td>
                    <a v-if="run.items.length" href="#" class="link" @click.prevent="expandedRun = expandedRun === run.id ? null : run.id">
                      {{ expandedRun === run.id ? '收起' : `展开(${run.items.length})` }}
                    </a>
                    <span v-else class="empty-tip">—</span>
                  </td>
                </tr>
                <tr v-if="expandedRun === run.id">
                  <td colspan="8" class="agg-detail">
                    <div v-for="(item, j) in run.items" :key="j" class="agg-item">
                      <span class="chip" :class="`chip-${item.status}`">
                        {{ { published: '✓ 已发布', failed: '✗ 失败', skipped: '− 跳过' }[item.status] }}
                      </span>
                      <span v-if="typeof item.paid === 'boolean'" class="chip" :class="item.paid ? 'chip-paid' : 'chip-free'">
                        {{ item.paid ? '🔒 会员' : '免费' }}
                      </span>
                      <span v-if="item.fetchMethod" class="chip chip-fetch" :class="`chip-fetch-${item.fetchMethod}`">
                        {{ FETCH_METHOD_LABEL[item.fetchMethod] }}
                      </span>
                      <NuxtLink v-if="item.slug" class="link" :to="`/articles/${item.slug}`" target="_blank">{{ item.title }}</NuxtLink>
                      <span v-else>{{ item.title }}</span>
                      <a v-if="item.xiaohuUrl" :href="item.xiaohuUrl" target="_blank" rel="noopener" class="agg-src">小互AI解读 ↗</a>
                      <a v-if="item.upstreamUrl" :href="item.upstreamUrl" target="_blank" rel="noopener" class="agg-src">原文 ↗</a>
                      <span v-if="item.sourceName" class="agg-src">{{ item.sourceName }}</span>
                      <span v-if="item.error" class="agg-error">{{ item.error }}</span>
                    </div>
                  </td>
                </tr>
              </template>
              <tr v-if="agg && !agg.runs.length"><td colspan="8" class="empty-tip" style="padding: 24px 0">尚无运行记录</td></tr>
            </tbody>
          </table>
        </section>

        <!-- ========== 手动工具 ========== -->
        <template v-else>
        <!-- 会员文章实验 -->
        <section class="admin-section">
          <h2>🔒 会员文章实验(best.xiaohu.ai)</h2>
          <p class="admin-hint">
            输入一个 <code>best.xiaohu.ai/article/&lt;slug&gt;/</code> 会员文章链接,单独走会员管线做实验:
            解析「来源 ·」标注 → 阅读原文锚点/来源名网络搜索溯源 → 抓上游原文 → 翻译 → 发布。
            结果计入「聚合任务」页的运行历史(类型「会员」)。
          </p>
          <div class="form-grid">
            <div class="form-field full">
              会员文章链接 *
              <input v-model="memberUrl" type="url" placeholder="https://best.xiaohu.ai/article/higgsfield-production-skills/" />
            </div>
          </div>
          <div class="form-actions">
            <button class="btn" :disabled="memberRunning || !memberUrl.trim()" @click="runMemberOne">
              {{ memberRunning ? '实验运行中…' : '▶ 单链接实验' }}
            </button>
            <button class="btn btn-plain" :disabled="memberRunning" @click="runMemberAll">
              全量会员列表
            </button>
            <span class="form-tip">单篇约 1~5 分钟(含翻译)</span>
          </div>
          <p v-if="memberResult" class="admin-result" :class="memberResult.ok ? 'ok' : 'err'">{{ memberResult.msg }}</p>
        </section>

        <!-- 手动爬取(P2) -->
        <section class="admin-section">
          <h2>🔗 手动爬取翻译</h2>
          <p class="admin-hint">输入任意文章/仓库链接,自动抓取原文 → GLM 翻译为中文 → 发布(失败项可在「聚合任务」页「待人工处理」重爬)。</p>
          <div class="form-grid">
            <div class="form-field full">
              链接 *
              <input v-model="crawlUrl" type="url" placeholder="https://blog.google/... 或 https://github.com/owner/repo" />
            </div>
            <div class="form-field">
              标题(留空自动取原文标题)
              <input v-model="crawlTitle" type="text" placeholder="自动识别" />
            </div>
            <div class="form-field">
              标签(逗号分隔,默认加 #聚合)
              <input v-model="crawlTags" type="text" placeholder="如:Gemini, 发布" />
            </div>
          </div>
          <div class="form-actions">
            <button class="btn" :disabled="crawling || !crawlUrl.trim()" @click="crawl()">
              {{ crawling ? '抓取翻译中…' : '抓取并发布' }}
            </button>
          </div>
          <p v-if="crawlResult" class="admin-result" :class="crawlResult.ok ? 'ok' : 'err'">
            {{ crawlResult.msg }}
            <NuxtLink v-if="crawlResult.url" :to="crawlResult.url">→ 查看文章</NuxtLink>
          </p>
        </section>
        </template>
      </div>
      </div>
    </template>
  </div>
</template>
