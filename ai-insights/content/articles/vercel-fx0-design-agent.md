---
title: "Vercel Labs 开源 fx0：超快的 HTML 工件构建器"
date: 2026-10-21T00:00:00.000Z
tags: ["产品发布", "Vercel", "fx0", "Agent", "HTML", "交互设计", "聚合"]
summary: "fx0 主打快速生成与局部修改：高速模型、紧凑 HTML、精确替换和流式预览怎样配合？附三个真实可玩案例与完整提示词。"
---
> **原文链接**: [https://github.com/vercel-labs/fx0](https://github.com/vercel-labs/fx0)
> **来源**: github.com
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/vercel-fx0-design-agent/) · 2026/10/21
> **说明**: 本文由 AIHot 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

## fx0

fx0 是一个开源、轻量级的设计 Agent，基于 [libfx](https://www.npmjs.com/package/libfx) 构建。你描述一个页面，Agent 将其编写为一个 HTML 文件。

fx0 也是基于 libfx 构建的应用的一个实际示例。[一次 `createFxAgent()` 调用](#durability) 赋予它 Agent 循环、流式传输、工具调用、重试和持久化会话功能，而 `createFxEngine()` 运行每个子 Agent。

在 [fx0.vercel.dev](https://fx0.vercel.dev) 上试用，或克隆它并使其成为你自己的项目。

### 功能特性

- 使用 Vercel 登录，通过 [AI Gateway](https://vercel.com/docs/ai-gateway) 为你的团队支付模型调用费用。
- 可选择为每个 IP 提供五个免费的 Opus 5.5 Fast 提示，无需登录或绑定卡片。[BotID](https://vercel.com/docs/botid) 保护试用额度；服务器专用的 Gateway 密钥为其获批准的提示提供资金。
- 聊天在回复中途函数崩溃时得以幸存：对话会在停止的地方继续。参见 [持久化](#durability)。
- 每一轮对话都保留其设计版本。你可以重新打开任何版本，并复制 HTML 或将其下载。
- 选择每个聊天的模型，包括其推理强度和快速模式。新聊天默认使用快速模式的 Claude Opus 5.5，或者在设置 `FX0_MODEL` 时使用该模型。
- Agent 可以搜索网页并抓取页面作为参考。
- 从十个 `design.md` 风格之一开始，或上传你自己的风格。这十种风格以及选择器中的一行描述来自 VoltAgent 的 [awesome-design-md](https://github.com/VoltAgent/awesome-design-md)，你可以在 [getdesign.md](https://getdesign.md) 浏览。感谢 VoltAgent 发布这些内容。
- 在登录前输入消息。草稿（包括图片）会在标签页中等待 15 分钟，直到你完成登录。
- 一轮对话在 64 个模型步骤后停止，包括其子 Agent 的步骤，这可以防止陷入循环的 Agent 产生高额费用。
- 在仅限付费的聊天中，当 Agent 工作时发送文本消息可以引导其方向，类似于 fx CLI 中的行为。试用聊天将每个输入作为独立的一轮对话运行，以便免费和付费资金保持分离。

### fx0 如何使用 libfx

fx0 是应用。libfx 是其内部的 Agent。Vercel 确保 Agent 在运行期间的数据安全。

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/diagrams/pieces-dark.svg">
  <img alt="fx0 的聊天和 API 路由将聊天数据保存在 Redis 中，将账户和历史记录保存在 Neon 中。路由将每条消息传递给 libfx Agent，该 Agent 调用 AI Gateway，将每一步保存到 Workflow World，并在崩溃后由 Vercel Queues 重启。" src="docs/diagrams/pieces-light.svg" width="720">
</picture>

- **fx0** 拥有你看到的内容以及属于你的内容：聊天和实时预览、登录、Agent 调用的设计工具，以及存储在 Redis 和 Neon 中的聊天记录。
- **libfx** 运行每一轮对话，即一条消息以及 Agent 为回答该消息所做的一切：模型循环、工具调用、重试和引导。fx0 使用 `createFxAgent()` 创建一个 Agent，并将每个聊天的消息传递给它。
- **Workflow World** 是 Vercel Workflow 背后的存储库，libfx 在运行过程中将每一轮对话保存于此：包括未被接受前的提示，以及随后的每一步。
- **Vercel Queues** 为每个提示提供备份。当运行对话的函数崩溃或达到时间限制时，队列会在 `/api/libfx` 唤醒一个新的函数，libfx 从最后保存的步骤继续执行。
- **AI Gateway** 接收所有模型调用。付费轮次使用发送者的 OAuth 令牌和团队；明确赞助的轮次使用服务器的试用密钥。

### 持久化

fx0 在每个服务器上运行一个持久的 libfx Agent。libfx 将每个聊天的对话保存为会话，并通过 Vercel Queues 备份每一轮对话，因此即使运行对话的函数崩溃，对话也能完成。fx0 本身没有用于恢复对话的代码。持久化依赖于三个部分。

**Agent。** fx0 未传递任何持久化选项，因此 `createFxAgent()` 使用 libfx 的默认设置：在 Vercel 上，libfx 将其会话存储在 Vercel 的 World 中（即 Vercel Workflow 背后的存储），并使用 Vercel Queues。libfx 捆绑了这两个客户端，因此 fx0 既不编写工作流，也不直接调用 Vercel Queues。提示在其发送的请求中运行其对话轮次，因此回复无需经过队列跳转即可开始，而 Vercel Queues 会将提示保留为后备措施，直到该请求的 800 秒限制之后不久。当聊天处于空闲状态时，fx0 发送一条消息作为提示。当对话正在运行或等待开始时发送的消息则被视为引导，libfx 会通过 Vercel Queues 将其传递给正在运行的对话轮次。

```ts
// lib/libfx-agent.ts, simplified
const agent = createFxAgent({
  // No durability option: Vercel's World and Queues on Vercel, local files elsewhere.
  apiKey: 'session-authenticated',
  fetch: chatFetch,
  tools,
})

// lib/agent.ts, simplified: a chat gets a libfx session on its first message,
// and each message is one turn of it
const libfxSessionId = await agent.newSessionId()
const session = agent.session(libfxSessionId, { model, instructions, context: { chatId, turnId } })
session.prompt(`[${author}] ${text}`, { messageId: `m${turnId}` })
```

**路由。** Vercel Queues 会将请求自身无法运行完的 turn 投递到 [`app/api/libfx`](app/api/libfx/route.ts):一是超出其 prompt 请求存续时间的 turn 的剩余部分,二是在该请求死掉时对 prompt 的兜底。libfx 的 handler 负责运行它们:

```ts
// app/api/libfx/route.ts
export const maxDuration = 800
export const POST = agent().wakeHandler()
```

**触发器。** [`vercel.json`](vercel.json) 中的一条配置项将该路由订阅到 libfx 的 queue topic:

```json
{
  "functions": {
    "app/api/libfx/route.ts": {
      "experimentalTriggers": [{ "type": "queue/v2beta", "topic": "__libfx_wkf_workflow_session", "retryAfterSeconds": 5 }]
    }
  }
}
```

fx0 将 transcript、design 和设置保存在 Redis 中。下面是一条消息从发送到回复的全过程,图中的编号与下文步骤一一对应:

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/diagrams/message-dark.svg">
  <img alt="1. fx0 保存你的消息。2. fx0 封存你的 token,由你自己的团队付费。3. libfx 运行该 turn,并随运行逐步保存每一步。4. 你在回复被写出的同时看到它。5. 如果函数崩溃,Vercel Queues 会启动一个新函数,从最后保存的一步继续,回复稍后送达,任何内容都不会丢失。" src="docs/diagrams/message-light.svg" width="440">
</picture>

**1. 先保存消息,再回答。** `POST /api/prompt` 在一个 Redis 脚本中把消息追加到 transcript,然后连同其 message id 一起交给 libfx。libfx 在确认之前先将其存储,因此显示为已发送的消息不会丢失,重试的请求也会命中同一个 turn。

**2. 保住该 turn 的 funding。** queue 投递不携带浏览器 cookie,因此 prompt 路由会将其 funding 封存在 Redis 中。每条消息都会记录下它所开启的 turn 的 funding:要么是已获准入的 sponsorship,要么是其付费发送者的 OAuth grant 和团队。新取回的 SDK diagnostics 和 journal 的 restore hook 用于在崩溃后识别正在执行的 turn。Refresh token 留在 cookie 里,server trial key 则绝不进入任何被存储的凭据。缺失或过期的 trial funding 绝不会回退到客户的付费 grant。

**3. libfx 运行该 turn。** 同一时间只有一个 worker 持有 session,libfx 会把其他 worker 全部 fence 在外。prompt 请求率先运行该 turn;它和每一次对 `/api/libfx` 的投递都可以运行 800 秒,即各自的 `maxDuration`。libfx 会在距该上限还剩 30 秒时停止 turn,保留迄今完成的部分,随后由一次对 `/api/libfx` 的投递接续运行,因此一个长 turn 可以跨越多次调用。

**4. 将 stream 复制进 transcript。** 任何跟进该对话的路由——无论是 prompt 自身的响应,还是一个打开的标签页——都会把 libfx 的 stream 复制进 transcript。凭借 cursor 检查,无论有多少个跟随者,每一行都恰好落盘一次。同一个 Redis 脚本会在某 turn 的起始行落盘时将其标记为运行中,当其结束行落盘时,则把该 turn 的 history 留作待写,并附上该 turn 留下的 design。复制随后把这份 history 和 design 版本写入 Neon;失败的写入会留在 Redis 中,等待下一次复制时重试。

**5. 从停止处继续。** 在 Vercel 上,libfx 分不清一个崩溃的函数和一个只是运行缓慢的函数,因此运行 turn 的请求会一直持有其 session,直到达到时间上限。prompt 的兜底会在该上限过后 5 秒到期:若请求已死,兜底便接管 session,turn 从其记录的末尾继续。在对 `/api/libfx` 的投递中,已退出的进程会让其投递在约一秒后重新运行;未退出就停止的函数则会一直持有其消息,直到队列的 hold 耗尽,最长五分钟。模型会被告知该 turn 曾被中断,从而可以在继续之前先查清发生了什么。只是短暂停滞、之后才醒来的函数会在它的下一次写入处停下,因此绝不会出现两方同时写入的情况。

被崩溃中断的工具调用，只有在重复执行是安全的情况下才会重新运行。libfx 会拒绝没有声明自己属于哪一类的工具，而 fx0 在 [`lib/libfx-agent.ts`](lib/libfx-agent.ts) 中为它的工具做了标记：读取设计、发布设计、抓取页面、分页浏览工具结果和搜索工具这些操作会重新运行。编辑、提问和子 Agent 则不会，因此模型会被告知这些调用可能已经运行过，由它自行决定如何处理。只要模型发出请求，读取操作就立即开始，与此同时 libfx 保存这次调用。

子 Agent 是在其工具调用内部运行的一个内存中的 `createFxEngine()`,计费到同一个聊天。它拥有同样的设计工具，只是不能自己再启动子 Agent。它的模型请求计入父 turn 的 64 步限额，该计数保存在 Redis 中([`lib/turn-budget.ts`](lib/turn-budget.ts)),因此子 Agent 无法让单个 turn 的开销成倍增加。重试或恢复的请求只计一次。

TL;DR:

- 崩溃会延迟回复，最多延迟约 13 分钟，但绝不会丢失聊天或正在进行的回复。
- turn 会继续而不是从头开始，已完成的模型调用不会被重复付费。
- 每次 turn 在崩溃后同样保留其已获授权的额度。

你可以观察这一过程。从页眉打开 session 诊断，即可查看该聊天的 libfx session、正在运行的 turn,以及 transcript 已复制 libfx 流的进度。

### 限制

- 如果一个 prompt 请求在运行 turn 时崩溃，例如内存耗尽，无论崩溃发生得多早，该 turn 都会持续运行到发送后约 13 分钟。在 Vercel 上，libfx 无法区分崩溃的函数和缓慢的函数，因此崩溃的请求仍会占用 session 直到 800 秒上限，而 prompt 的兜底机制会在 5 秒后接管。在此期间页面仍会显示回复正在运行。单纯运行时间长的 turn 不受影响：libfx 会在到达上限前 30 秒停止它，并立即将其余部分排入队列，等待投递到 `/api/libfx`。
- 在工具运行期间发送的文本消息，例如正在编写设计时，会等到该工具完成之后才被模型看到。带有图片的消息会作为独立的 turn 运行，排在当前正在运行的 turn 结束之后。
- 每个 turn 都向发送了启动该 turn 的那条消息的登录账号和团队计费；后发送的消息无法更改更早 turn 的额度。加入正在运行 turn 的文本消息按该 turn 计费。来自同一登录账号的 token 续期会保持该 turn 的计费团队不变。
- 免费 prompt 以低 effort 在 Opus 5.5 Fast 上于新设计中启动。既有仅限付费的聊天保持其原有计费。试用额度为每个 IP 五次，跨聊天和浏览器计数，不会定期补充；清除 cookie 也不会重置。额度用尽后，请登录以使用你自己的团队继续。
- 正在编写的设计通过一个有容量限制且会过期的 Redis 通道流式传输，因此其他实例上的查看者也能看到。重新连接会从完整前缀恢复；generation ID 和偏移量防止出现重复字节。临时预览会剥离活动标记，并在无脚本状态下运行。发布或结束 turn 会先关闭其草稿，使其无法替换已完成的预览。
- 删除聊天会移除 fx0 的记录和凭证。libfx 的 session 数据随 World 的保留策略到期。
- 当没有 route 跟随某个聊天时，其 transcript 会在下一次有人打开该聊天时补齐。
- transcript 从不裁剪，因此非常长的聊天打开速度会变慢。

### 代码位置

| 路径 | 内容 |
|---|---|
| [`lib/agent.ts`](lib/agent.ts) | 每个聊天的 prompt、提问、取消、删除与登出 |
| [`lib/libfx-agent.ts`](lib/libfx-agent.ts) | 持久化 Agent、其每聊天的 `fetch` 以及它的工具 |
| [`lib/projector.ts`](lib/projector.ts) | 将聊天的 libfx 流复制进其 transcript |
| [`lib/turn-credential.ts`](lib/turn-credential.ts) | 每个聊天的各 turn 计费所用的密封凭证 |
| [`lib/trial.ts`](lib/trial.ts) | 访客身份与原子的每 IP 试用额度 |
| [`lib/journal.ts`](lib/journal.ts) | Redis 日志。每次写入都是单个 Lua 脚本，因此具有原子性。 |
| [`app/api/libfx/`](app/api/libfx) | Vercel Queues 投递 libfx turn 的目的地 |
| [`lib/tools.ts`](lib/tools.ts) | Agent 的工具：读取、发布和编辑设计，抓取 URL,提问，分页浏览较长的工具结果，搜索可用工具以及启动子 Agent。AI Gateway 的 web 搜索与它们并行运行。 |
| [`lib/design-artifact.ts`](lib/design-artifact.ts) | 校验设计是否为单个不超过 512 KB 的 HTML 文件，且不含外部资源 |
| [`app/api/`](app/api) | Route 处理器。聊天 route 会先检查登录与所有权，然后再执行其他操作。 |
| [`components/`](components) | 聊天界面、composer、预览与诊断面板 |

Neon Postgres 存储账户、每个 chat 的所有者、已完成的 turn 以及每个设计版本([`migrations/`](migrations))。

### 本地运行

你需要 Node.js 24 和三个服务:

1. 一个 [Sign in with Vercel](https://vercel.com/docs/sign-in-with-vercel) 应用,scopes 为 `openid profile email offline_access`,权限为 AI Gateway: Use 和 Team: Read Only。添加 `http://localhost:3000/api/auth/callback` 作为回调 URL。不要漏掉 `offline_access`:没有它,Vercel 不会发送 refresh token,登录会失败。
2. 一个 Neon Postgres 数据库。本地开发请使用单独的分支。
3. 一个 Upstash Redis 数据库。

将 `.env.example` 复制为 `.env.local` 并填写。`SESSION_SECRET` 必须是至少 32 个字符的随机字符串。如果你的本地应用与某个部署共享 Redis,请设置 `FX0_REDIS_PREFIX`(例如 `fx0:local`)以隔离 chat 数据。`FX0_MODEL` 用于更改新 chat 默认使用的模型。

```sh
npm ci
npm run db:migrate
npm run dev
```

`db:migrate` 按顺序应用 `migrations/` 中的文件。每个文件都是幂等的,因此重复运行没有问题。应用本身永远不会自动执行迁移。

### 部署

在 Vercel 上设置相同的变量。Vercel Marketplace 中的 Neon 和 Upstash 集成会自动为你填入 `DATABASE_URL`、`KV_REST_API_URL` 和 `KV_REST_API_TOKEN`。将 `APP_URL` 设置为你的生产环境 URL,并在你的 Sign in with Vercel 应用中添加 `<APP_URL>/api/auth/callback`。

OAuth 重定向从不信任请求的 Host header。它们会跳转到 `APP_URL`,或者在未设置该变量的 preview deployment 上,跳转到该部署自身的 Vercel URL。

要启用免费试用,请先应用迁移,设置 `FX0_FREE_PROMPTS=1` 和仅限服务端使用的 `AI_GATEWAY_API_KEY`,然后重新构建并部署。BotID 的客户端防护和服务端验证均已包含在内。生产环境使用 Vercel 的可信客户端 IP;本地开发则共享同一个本地额度。请确保本地 Redis prefix 与生产环境相互隔离。

### 测试

```sh
npm run typecheck                 # generates the route types, then runs tsc
npm run test:core
npm run test:auth
npm run build
npm run test:smoke                # runs the production build with fake sessions
npm run test:journal:integration  # needs KV_REST_API_URL/TOKEN, writes under its own prefix
npm run test:trial:integration    # needs local redis-server/redis-cli; no remote services
npm run test:artifact:browser     # needs local Chrome (or CHROME_PATH); checks design CSP enforcement
npm run test:budget:integration   # needs local redis-server/redis-cli; no remote services
npm run test:turns:integration    # needs local redis-server/redis-cli; no remote services
```

auth 和 route 测试会 mock Vercel、AI Gateway 和两个数据库,因此请在实际部署上验证真实的登录和真实的计费。

### 安全

生成的页面在一个不透明 origin 的沙箱化 iframe 中运行。它们无法读取应用的 cookie、storage 或凭据,其 Content Security Policy 会阻止网络请求(`connect-src 'none'`)。不过,这一切仍是由浏览器来强制执行的,并非一个封闭的 VM。

付费的模型请求仅将发送者的 OAuth token 发送给 AI Gateway。在请求之间,它被密封保存在 Redis 中,并随 token 一同过期。赞助请求需要存在已记录的试用准入;服务端密钥绝不会发送到浏览器、cookie、journal 或模型 prompt 中。退出登录会删除该登录所存储的凭据并撤销其 token。由其资助的正在运行的 turn 会在下一次模型请求时停止;其他登录的 turn 则继续运行。请将 session cookie 和 `SESSION_SECRET` 视为凭据。

### 许可证

[Apache-2.0](LICENSE)。[`lib/design-md/`](lib/design-md) 中的 `design.md` 样式来自 [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md),遵循 [MIT 许可证](lib/design-md/LICENSE)。
