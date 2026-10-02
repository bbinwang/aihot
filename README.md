# AIHot · AI 热点洞察站

基于 **Nuxt 3 + Nitro** 的 AI 资讯站点:文章以 Markdown 存储,支持 **Web 管理控制台上传/删除文章**、标签分类、全文搜索、RSS 订阅与暗色模式。

> 状态:**已实现并部署**(P0 + P1 + 管理控制台,30 个测试用例全部通过)。

---

## 1. 技术栈

| 层 | 选型 | 说明 |
|---|---|---|
| 框架 | Nuxt 3.21(Vue 3) | SSR,`srcDir: 'src'` |
| 内容 | 自研轻量内容层 | gray-matter 解析 frontmatter + marked 渲染,运行时读写,上传即可见 |
| 服务端 | Nitro(h3) | API 路由 + 静态服务 + 定时任务(scheduledTasks) |
| 聚合 | 自研管线 | 小互 RSS 溯源 → 上游抓取 → GLM 翻译 → 自动发布 |
| 测试 | Vitest | 50 个用例覆盖解析/存储/搜索/RSS/聚合管线 |

> 为什么不用 Nuxt Content?它的集合在**构建期**打包,无法支持"Web 上传文章后立即可见"的运行时写入需求,故采用文件型自研内容层(`content/articles/*.md`)。

## 2.1 P2 热点自动聚合管线

```
每天北京时间 23:59:59(严格槽位门控,与宿主机时区无关;错过自动补跑)
   │  秒级 + 小时级 cron 触发 + UTC+8 槽位判定(state.lastSlotAt),每个北京 23:59:59 槽位恰好一次
   ▼
best.xiaohu.ai/rss.xml ──► 统一单管线数据源(标题/摘要/RSS分类即标签/pubDate)
   │                        待处理 = pubDate 落在「执行时刻 -24h ~ 执行时刻」的所有文章(5 分钟时钟容差)
   │                        会员文章:RSS 描述带会员推广尾即标记 → 优先挂「会员」标签
   ▼ 逐篇打开小互文章页
提取「来源」名 + 「阅读原文 ↗」上游链接 ◄── 用户核心交付物
   │                          (会员文章无锚点时,用「来源」名网络搜索溯源)
   ▼ 抓上游原文(整体重试 3 次)
   ├─ GitHub 仓库 → api.github.com README 原文
   ├─ 文档站 URL+.md 捷径(llms.txt 风格)
   └─ HTML → 正文提取转 Markdown(node-html-parser)
   │
   ▼ 智谱 GLM 翻译(glm-5.3-flash,代码块/链接保留;限流自动降级本机模型)
   │
   ▼ 按 AIHot 格式发布(frontmatter + 来源 blockquote + 译文正文)
   │
   ▼ 运行日志落盘 content/aggregator/{state,runs}.json → 管理台汇报
```

- **定时严格性**:北京时间 23:59:59 = UTC 15:59:59(中国无夏令时),槽位门控纯 UTC 数学计算,宿主机任意时区下都准点;睡眠/停机错过的槽位在启动或下一整点补跑;**跨进程文件锁**(`content/aggregator/run-lock/`,mkdir 原子抢占,持有者退出/超时 90 分钟自动回收)保证 dev 与 prod 服务共用数据目录时同一时刻只有一边聚合(2026-09-30 曾因双服务并存两边同跑,造成重复文章与重复运行记录)
- **24 小时窗口**:按 RSS `pubDate`(秒级精度)取「执行时刻 -24h ~ 执行时刻」,processedUrls 去重;管理台「会员文章实验」保留 /jiedu/?acc=paid 列表模式作为手动工具(日粒度窗口)
- **失败处理(分级兜底)**:上游原文重试 3 次仍失败后,按文章类型走不同降级路线,尽力不漏文:
  - **非会员文章** → 正文取自**小互 AI 解读站**(解读页正文公开可读,先纯 HTTP,再 CDP 渲染小互页兜底)
  - **会员文章** → 先 **CDP 真浏览器渲染直爬上游原文**(经 ego-browser);上游登录墙/反爬拿不到时,最终兜底仍取**小互解读站正文**
  - CDP 兜底经本机 ego-browser(CDP 协议)执行,可用 `CDP_FETCH=0` 停用;全链失败才记入管理台「待人工处理」,不发半成品
  - **失败不标记已处理**:抓取失败的文章不写入 `processedUrls`,留在 24h 窗口内由下次运行自动重试(2026-09-30 豆包一文 09-29 失败后被误标已处理,09-30 直接跳过导致缺文,已修复)
  - 兜底发布的文章,说明行会注明正文来源(如「正文取自小互 AI 解读」)
- **冒烟回归**:`npm run smoke` 回放 2026-09-30 北京 23:59:59 那次真实聚合(5 篇文章的真实上游与失败原因),验证分级兜底能把 4 篇缺文全部救回;后续改动聚合管线必须跑通
- **去重**:按小互文章 URL 增量(`state.processedUrls`,RSS 与会员管线共用),首次运行回补最近 3 天
- **手动爬取**:管理台输入任意 URL → 同一管线抓取翻译发布
- **本机模型兜底**:智谱限流(429/五小时超限)时自动切换 `127.0.0.1:1234` / `:8080` 的 OpenAI 兼容服务(key=`1234`,需本机启动 LM Studio/mlx_lm)

## 2. 项目架构

```
aihot/
├── README.md
└── ai-insights/                 # 应用根
    ├── nuxt.config.ts           # srcDir: 'src',RSS 路由头,站点元信息
    ├── package.json             # dev/build/start/test 脚本
    ├── vitest.config.ts
    ├── content/
    │   ├── articles/*.md        # ★ 文章数据层(Markdown + frontmatter,运行时可写)
    │   └── aggregator/*.json    # 聚合状态与运行历史(state.json / runs.json)
    ├── src/
    │   ├── app.vue              # 入口:暗色模式防闪烁脚本 + 布局
    │   ├── assets/css/main.css  # 亮/暗双主题 CSS 变量
    │   ├── layouts/default.vue  # Header + 主区 + Footer
    │   ├── components/          # AppHeader / AppFooter / ArticleCard / TagBadge / Pagination / ThemeToggle
    │   ├── pages/               # 路由
    │   │   ├── index.vue        # /            首页·最新文章(P0)
    │   │   ├── articles/[slug].vue  # /articles/:slug  详情(P0)
    │   │   ├── tags/index.vue   # /tags        标签云(P0)
    │   │   ├── tags/[tag].vue   # /tags/:tag   按标签筛选(P0)
    │   │   ├── search.vue       # /search      全文搜索(P1)
    │   │   ├── admin.vue        # /admin       管理控制台(上传/删除/聚合任务/手动爬取)
    │   │   └── about.vue
    │   ├── server/              # Nitro 服务端(新版 Nuxt 中相对 srcDir 解析)
    │   │   ├── utils/
    │   │   │   ├── markdown.ts  # frontmatter 解析 / marked 渲染 / slugify / 阅读时长
    │   │   │   ├── articles.ts  # ★ 存储服务:增删查/排序/搜索/标签聚合/RSS 生成
    │   │   │   ├── auth.ts      # 管理密码校验(ADMIN_PASSWORD,默认 aihot2026)
    │   │   │   ├── llm.ts       # 智谱 GLM(Anthropic 兼容)→限流降级本机模型
    │   │   │   ├── translate.ts # Markdown 中文翻译(围栏感知分块)
    │   │   │   ├── html2md.ts   # HTML 正文提取→Markdown(噪声剥离)
    │   │   │   └── aggregator.ts# ★ 聚合管线:RSS 溯源/上游抓取/发布/运行日志
    │   │   ├── tasks/aggregator/run.ts      # Nitro 定时任务(每天 23:59:59)
    │   │   ├── plugins/aggregator-catchup.ts# 错过 23:59:59 的补跑机制
    │   │   ├── api/
    │   │   │   ├── articles/    # GET 列表(分页+标签) / GET :slug 详情
    │   │   │   ├── search.get.ts / tags.get.ts
    │   │   │   └── admin/       # login / articles 上传删除 / aggregator 状态+运行 / crawl 手动爬取
    │   │   └── routes/rss.xml.ts
    │   └── utils/format.ts
    └── tests/                   # Vitest:markdown / articles / search / rss / aggregator / llm(共 50 例)
    └── tests/                   # Vitest:markdown / articles / search / rss(共 30 例)
```

### 2.1 数据流

```
管理控制台上传(标题/标签/正文)          手工放置 .md
        │                                   │
        ▼                                   ▼
POST /api/admin/articles ──► content/articles/<slug>.md(frontmatter 自动生成)
        │
        ▼
读取时:gray-matter 解析 → marked 渲染 HTML → 阅读时长/摘要计算
        │
        ▼
SSR 页面 / JSON API / RSS(读时渲染,写入即生效)
```

### 2.2 API 一览

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | `/api/articles?page=&pageSize=&tag=` | 分页列表 |
| GET | `/api/articles/:slug` | 详情(含 HTML) |
| GET | `/api/search?q=` | 全文搜索(标题10分/标签5分/摘要3分/正文1分) |
| GET | `/api/tags` | 标签聚合 |
| GET | `/rss.xml` | RSS 2.0 |
| POST | `/api/admin/login` | 校验管理密码 |
| POST | `/api/admin/articles` | 上传文章(Header `x-admin-password`) |
| DELETE | `/api/admin/articles/:slug` | 删除文章(同上) |
| GET | `/api/admin/aggregator` | 聚合任务状态 + 运行历史(同上) |
| POST | `/api/admin/aggregator/run` | 立即执行一次聚合(同上) |
| POST | `/api/admin/crawl` | 手动爬取翻译发布 `{ url, title?, tags? }`(同上) |

## 3. 功能清单(已实现)

- **P0**:首页文章列表(分页)、文章详情(代码高亮排版)、标签页 + 筛选
- **P1**:全文搜索、RSS 订阅、暗色模式(跟随系统 + 手动切换 + 防闪烁)
- **P2 热点自动聚合**:每天**北京时间 23:59:59**(严格槽位门控)定时抓取 best.xiaohu.ai RSS——**pubDate 在倒推 24 小时窗口内的所有文章**作为待处理列表(会员文章自动挂「会员」标签) → 溯源上游原文链接 → 抓原文 → GLM 翻译 → 自动发布;错过自动补跑;管理台运行历史/失败待处理/一键重爬;任意 URL 手动爬取翻译
- **管理控制台**:密码登录、上传 .md 文件或粘贴 Markdown、自动生成 frontmatter、中文标题自动兜底 slug、文章删除、聚合任务汇报、手动爬取;运行历史明细中每篇文章附**小互 AI 解读站链接**与原文链接
- **安全**:slug 白名单校验(防路径穿越)、上传/管理接口需密码、404/401 错误处理

## 4. 本地开发

```bash
cd ai-insights
npm install
npm run dev        # http://localhost:3000
npm test           # Vitest,30 个用例
npm run build && npm start   # 生产构建 + 启动(默认 3000,PORT 可改)
```

环境变量:

| 变量 | 默认 | 说明 |
|---|---|---|
| `ADMIN_PASSWORD` | `aihot2026` | 管理密码 |
| `ARTICLES_DIR` | `content/articles` | 文章目录 |
| `SITE_URL` | 请求 host | RSS 中的站点地址 |
| `AGGREGATOR_ENABLED` | 启用 | 置 `0` 停用定时聚合 |
| `XIAOHU_RSS` | best.xiaohu.ai/rss.xml | 聚合源 |
| `ZHIPU_API_KEY` | `ANTHROPIC_AUTH_TOKEN` | 智谱翻译用 Key |
| `TRANSLATE_MODEL` | `glm-5.3-flash` | 翻译模型 |
| `LOCAL_LLM_BASES` | `127.0.0.1:1234,8080` | 限流降级的本机模型服务 |
| `LOCAL_LLM_API_KEY` | `1234` | 本机模型服务 key |
| `AGGREGATOR_DIR` | `content/aggregator` | 聚合状态/日志目录 |
| `CDP_FETCH` | 启用 | 置 `0` 停用 CDP 真浏览器兜底(需本机安装 [ego-browser](https://github.com) Chromium CDP 驱动) |

## 5. 部署

当前通过 **cloudflared 隧道**将本机生产服务暴露公网体验(适合演示;正式部署建议任意支持 Node 的 VM/容器,数据在 `content/articles/` 持久化即可)。

```bash
npm run build && PORT=3210 npm start
cloudflared tunnel --url http://localhost:3210
```
