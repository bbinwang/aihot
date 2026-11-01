---
title: "Claude Code Mods 上手指南：你可以定制自己的 Claude Code"
date: 2026-10-29T00:00:00.000Z
tags: ["AI 实操", "Claude Code", "Mods", "插件", "AI 编程", "聚合"]
summary: "从“Mod 是什么、怎样接住一次操作”讲起，带你用自然语言做出上下文天气条，继续修改，再保存为长期插件。"
---
> **原文链接**: [https://x.com/addyosmani/status/2115326629488824753](https://x.com/addyosmani/status/2115326629488824753)
> **来源**: x.com
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/claude-code-mods/) · 2026/10/29
> **说明**: 本文由 AIHot 自动聚合(原文即中文,未翻译)。正文取自小互 AI 解读

---

全文 Markdown · 会员

作者：Addy Osmani10-29 · 约 13 分钟![](https://pic.xiaohu.ai/jiedu-media/claude-code-mods/social/zh-1b5b078e2a3c.png)

### 什么是 Claude Code Mods？

Claude Code Mods（模组）是运行在 Claude Code 会话内部的小型 JavaScript 或 TypeScript 扩展脚本。如果把 Claude Code 比作一个终端里的 AI 编程代理，那么 Mods 就是运行在它内部的**专属中间件与自定义 UI 插件**。

这里的“中间件”，可以理解为插在操作过程中的一层处理代码。例如 Claude 准备执行一条命令，Mod 可以在执行前接住这次请求，先显示可能带来的影响、修改命令参数，或者直接返回拒绝；“自定义 UI”则是把这些信息画成你能看到、能操作的天气条、按钮或面板。

以往以 Shell 命令形式运行的 Settings Hook，每次触发都会启动脚本，如果需要跨次记录数据，通常得自己写入外部文件；同时它也无法直接在终端输入框上方绘制界面，或在侧边展开可交互的面板。

Mod 则直接运行在当前会话中。例如天气条要比较上一轮与这一轮的 Token 变化，它必须记住上一次的读数，收到新读数后再更新界面；此外，插件还能打开面板、注册斜杠命令，以及注册供模型调用的工具。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/claude-code-mods/tweet-intro.mp4)

Claude Code Mods 官方全景演示。

    依次展示在终端输入框上方常驻渲染的上下文天气条（Token Weather）、拦截危险删除的高危命令预演面板（Blast Radius），以及单轮改动逐帧回放工具（Replay Theater）。

---

### 一次请求怎样经过 Mod：观察、改写和回答

假设 Claude 准备在终端里执行一条命令（例如 `git status`），Claude Code 会在这个时刻派发事件。此时 Mod 的介入过程可以概括为三个角色：

- **事件（Event）**：准备执行什么操作的消息（例如这次工具调用的命令数据）。
- **钩子（Hook）**：你在 Mod 中注册的处理函数，用来在这个特定时刻接住事件。
- **`next`**：把控制权交给下一个插件或交回给 Claude Code 的函数。

事件会依次经过各插件注册的钩子，最后交给 Claude Code 执行默认动作；执行结果再沿调用链返回。请求向内传、结果向外回，这种层层经过的关系，就是“洋葱式”中间件。

当事件流经 Mod 时，钩子可以采取三种处理方式：

1. **Observe（观察）**：先调用 `const r = await next(e)` 放行事件，等执行结果返回后再读取。例如记录每次文件改动，或在每轮交互结束后记录 Token 读数。
2. **Rewrite（改写）**：调用 `next(...)` 时传入修改后的数据，例如 `return next({ ...e, command: saferCommand })`，后续插件和 Claude Code 看到的将是修改后的命令。
3. **Answer（接管/自答）**：**不调用 `next(e)`**，由 Mod 自己直接返回结果。拒绝执行只是其中的一种（例如返回 `{ deny: "用户取消了本次操作" }`）；Mod 也可以直接返回结果来自己实现某个命令或工具。此时事件不会继续往下传，Claude Code 也不会执行默认动作。

各钩子函数的结构示意如下：

```javascript
// 钩子结构示意
on("tool.call", { tool: "Bash" }, async ($, e, next) => {
  // $    提供 Mod API：界面 ui、会话 session、状态 state、进程 process 等
  // e    当前事件携带的数据（如 command）
  // next 将事件传给下一个插件或 Claude Code
  return next(e);
});
```

同一次工具调用，三种处理方式

教学示意：Claude 准备运行 `git status`。切换处理方式，沿着同一条路径看参数和结果怎样变化；这里不会执行命令。

1 · 工具调用事件**准备执行什么？**`git status`
2 · 你的 Mod**原样传下去**`next(e)`
3 · 其他插件**收到原命令**`git status`
4 · 默认工具动作**继续处理原命令**后续插件与权限检查允许后，工具运行。

结果沿调用链返回，Mod 可以记录结果，再原样交回调用方。

**观察：参数不变**

把 `git status` 传下去，读取返回结果；例如记录这次调用。

**改写：参数变了**

改成 `git status --short` 后再传下去；后续收到的是新参数。

**回答：在这里返回**

例如用户取消后直接返回拒绝原因，不调用 `next`，这次命令不会沿此链继续执行。

---

### 做出第一个 Mod：直接告诉 Claude 你想要什么

编写 Mod 不需要预先学习完整的 API。Claude Code 本身就了解如何编写 Mod，你只需要用自然语言描述想要的效果，让它为你生成并加载。

#### 运行环境核对

开始前的前提是，你已经能在本地正常使用 Claude Code。版本要求如下：

```bash
claude --version   # 需为 2.1.287 或更高
claude             # 启动会话
```

如果你使用的是 Claude 桌面客户端，可在 Code 标签页的本地会话中输入 `/status`，确认 Claude Code 核心版本为 2.1.286 或更高。

#### 发送初始需求提示词

启动 `claude` 开启会话后，直接发送以下提示词。中文提示词与英文提示词任选一个发送即可，不要两段都发送：

##### 中文提示词（推荐直接发送）

```text
请为我编写一个名为 token-weather 的 Claude Code 模组：在输入框上方的提示条中，实时显示当前上下文窗口的使用预报。

单行展示内容要求：
- 天气图标与天气词，对应上下文占用比例：25% 以下 ☀ Clear（黄色），25–49% ☁ Cloudy（青色），50–74% ☂ Showers（蓝色），75–89% ☇ Storm（洋红），90% 及以上 ↯ Compact soon（红色）。
- 占用百分比，以及窗口已用 Token 与总容量，例如 "134.4k / 200k"。
- 最近 12 轮交互的迷你走势图，字符使用 ▁▂▃▄▅▆▇█。
- 上一轮交互新增的 Token 数量，例如 "▲ +98.3k last turn"。

每轮交互结束后自动更新读数。
```

##### 英文提示词（原文）

```text
Make me a Claude Code mod called token-weather: a live forecast of my context window, shown in the band above the prompt.

What it should show, on one line:

A weather icon and word for how full the context window is: 

under 25% ☀ Clear (yellow), 
25–49% ☁ Cloudy (cyan), 
50–74% ☂ Showers (blue), 
75–89% ☇ Storm (magenta), 
90% and up ↯ Compact soon (red).

The percentage used, then the tokens used out of the window, like "134.4k / 200k".

A small chart of the last 12 turns, drawn with ▁▂▃▄▅▆▇█.

How much the last turn added, like "▲ +98.3k last turn".
It should update after every turn.
```

#### 批准文件与开启热重载

1. Claude 会在当前会话的临时开发目录中生成插件结构，终端会提示确认新建文件，按提示予以批准。
2. 随后 Claude Code 会弹出一道系统询问：是否为当前会话开启热重载（hot reloading）？选择确认（Yes / Allow）。
3. 本轮交互结束时，终端输入框上方会立即出现一行彩色的实时天气条。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/claude-code-mods/source-05.mp4)

Token Weather 随上下文填充逐步变色。

    终端随着读取更多文件，状态栏读数从 18%（Clear 晴天 36.1k/200k）逐步攀升至 67%（Showers 阵雨 134.4k/200k），最终达到 81%（Storm 暴风雨 161.1k/200k）。

#### 继续对话与微调

在热重载保持开启的状态下，你可以直接通过追问继续调整样式和业务规则，无需重启客户端：

- 调整阈值规则：`"make Storm start at 70%"`（让 Storm 暴风雨从 70% 阈值开始触发）
- 增加字段显示：`"add the dollar cost at the end"`（在末尾添加费用显示）

Claude 修改代码保存后，终端上方的条带会原地刷新。热重载就是在当前会话里重新加载保存后的代码，因此不必退出再启动。

如果修改后条带消失，先保留当前会话，让 Claude 检查刚生成的 Mod。需要调试日志时，先取得这个 Mod 文件夹的完整路径，把整个目录复制到长期保存的位置，再在终端显式加载这份插件：

```bash
claude --debug --plugin-dir "/实际完整路径/token-weather"
```

将路径替换成已保存插件的真实位置，查看日志中是否存在组件树校验错误（`tree that does not validate`），并让 Claude 按 `.claude-plugin/types/` 下本版本的类型定义修正。单独新开一个没有加载该 Mod 的会话，无法复现它的界面问题。

---

### 深入机制：Token Weather 是如何运作的？

在前面的演示中，随着读取文件增多，读数从 18%（36.1k）变到 67%（134.4k），再到 81%。Token Weather 所做的工作本质上就是三步：**每轮结束取新数——把上一轮记录留住——重画天气条**。

#### 1. 理解上下文窗口与天气挡位

上下文窗口指的是模型一次回答所能参考的对话历史与文件内容容量（例如演示中的 200k tokens 是当前模型的容量示例，不同模型会有所不同）。读入更多文件通常会增加当前上下文的占用。

在 Token Weather 模组中，作者设计了直观的预报映射：

- **< 25%**：☀ Clear（晴）
- **25–49%**：☁ Cloudy（多云）
- **50–74%**：☂ Showers（阵雨）
- **75–89%**：☇ Storm（暴风雨）
- **≥ 90%**：↯ Compact soon（建议整理）

90% 以上显示的 "Compact soon" 只是该 Mod 设定的提醒阈值，并不是 Claude 的强制截断线；这里的上下文占用反映的是当前内容占容量的比例，而不是费用账单。

#### 2. 状态为什么保存在 $.state？

如果只在脚本里写 `let history = []` 来存数据，每次修改代码触发热重载时，整个文件重新执行，模块变量就会被重置清空。

为了在热重载时保住数据，Claude Code 提供了 `$.state` 接口：数据保存在当前会话中，因此即使代码热重载，上一轮的记录依然存在（需注意：它是在当前会话里跨热重载保存，并不等于新开任何会话都会带着这份数据）。

```javascript
// 核心片段，非完整插件
const readingsKey = { plugin: "token-weather", key: "readings" };

async function takeReading($) {
  const { context } = await $.session.usage();
  if (!context?.window) return;
  const tokens = context.tokens ?? 0;
  const percent = context.percent ?? Math.round((tokens / context.window) * 100);

  // 读取旧记录，追加本轮新读数，并通过 slice 保持最近 12 条
  const { value: history = [] } = await $.state.get(readingsKey);
  await $.state.set(readingsKey, [...history, { tokens, window: context.window, percent }].slice(-12));
}
```

此外，插件目录下的 `types/index.d.ts` 会声明状态的结构，`claude plugin validate` 在检查插件时会核对该声明是否存在且结构一致。

#### 3. 自动重绘的订阅机制

天气条之所以能在每轮数据更新后自动刷新，是因为渲染钩子在绘制时调用了 `$.state.get(readingsKey)`，Claude Code 会自动把该界面区域与这个状态建立订阅。之后只要 `takeReading` 调用 `$.state.set` 写入新数据，条带就会自动重绘，不需要手动调用刷新命令。

---

### 从临时体验到持久保存与跨机分享

通过自然语言直接生成的 Mod 只在当前会话中加载，其文件夹之后会被清理。如果你想长期保留，需要将整个插件目录复制出来。

首先在当前会话中让 Claude 告诉你：“刚才生成的 Mod 文件夹的完整路径在哪里？”，然后根据 Claude 给出的实际路径，把整个插件目录完整复制到你常用的开发目录下。

#### 1. 检查插件目录结构

复制出来的 Mod 本身就是一个完整的插件目录：

```text
token-weather/
├── .claude-plugin/
│   ├── plugin.json       # 插件清单
│   └── types/            # 宿主生成的类型定义
├── hooks/
│   ├── hooks.json        # 模块入口指向
│   └── token-weather.mjs # 核心实现逻辑
└── types/
    └── index.d.ts        # 状态声明
```

核对 `.claude-plugin/plugin.json` 中的插件名，以及 `hooks/hooks.json` 的 `modules` 所指向的 JS/TS 文件是否实际存在；保留生成的状态声明。图中的 `token-weather.mjs` 是示例入口名，文件名以你实际生成的插件为准，不必为了和图一致而改名。

#### 2. 本地单次挂载测试

在终端启动新会话时指定插件目录，验证其在新会话中是否正常运行：

```bash
claude --plugin-dir "/实际完整路径/token-weather"
```

命令中的 `/实际完整路径/token-weather` 要替换成刚才复制出的目录路径；保留双引号，路径中有空格也能正确处理。

#### 3. 建立本地市场（Marketplace）进行持久化安装

为了让当前用户在任何工作目录下开启的 Claude Code 会话都能直接使用，可以创建一个市场文件夹（例如 `my-mods`），把刚才保存好的整个 `token-weather` 插件目录放进去：

```text
my-mods/
├── .claude-plugin/
│   └── marketplace.json
└── token-weather/
    └── ... (上述完整插件目录)
```

在 `my-mods/.claude-plugin/marketplace.json` 中配置插件源：

```json
{
  "name": "my-mods",
  "owner": { "name": "YourName" },
  "plugins": [
    {
      "name": "token-weather",
      "source": "./token-weather"
    }
  ]
}
```

随后在 Shell 中执行安装命令：

```bash
## 注册本地市场源（请替换为实际完整路径）
claude plugin marketplace add "/实际完整路径/my-mods"

## 安装插件（--scope user 代表对当前操作系统的当前用户生效）
claude plugin install token-weather@my-mods --scope user
```

这里 `--scope user` 只代表当前操作系统用户后续会话的安装范围，而不是整机系统全局。安装完成后，启动新的会话即可通过 `/plugin` 命令核对是否已加载；如果在当前打开的会话中未立即生效，可运行 `/reload-plugins` 刷新。

#### 4. 通过 GitHub 分享给团队与社区

如果你将该市场仓库推送到 GitHub（例如 `your-org/my-mods`），其他人在 Claude Code 终端中执行三条命令即可安装使用：

```text
/plugin marketplace add your-org/my-mods
/plugin install token-weather@my-mods
/reload-plugins
```

（注：实际分享或安装时，请将命令中的 `your-org/my-mods` 替换为你自己的实际仓库路径，将 `token-weather` 替换为你创建的插件名，并根据需要在交互提示中选择安装范围 scope。）

---

### 用两个案例看懂：执行前确认，修改后回放

Token Weather 把会话数据变成常驻读数。Blast Radius 和 Replay Theater 则分别把操作前的确认、操作后的复核接入同一个工作界面。

#### Blast Radius：命令执行前，先看会影响什么

Claude 准备通过 Bash 执行删除、重置或迁移命令时，你可能想先知道：哪些文件会消失，哪些未提交修改会丢掉？

Blast Radius 会先暂停识别到的危险命令，收集影响信息，让你决定是否继续。它的核心逻辑是：**在工具即将执行前挂起调用，利用只读预演工具评估影响范围，并向用户展示确认面板。**

[视频/音频](https://pic.xiaohu.ai/jiedu-media/claude-code-mods/source-07.mp4)

Blast Radius 阻断高危删除命令。

    当检测到 rm -rf build 时，模组暂停工具执行，通过只读分析列出即将被删除的 9 个文件（共 1.1 MB）；用户按 2 或点 Cancel 即可阻止本次删除并向 Claude 返回拒绝原因。

##### 运行流程

1. **识别命令**：拦截发给 Bash 的工具调用并识别命令内容；如果命令没有命中这个 Mod 设定的规则，直接交由 `next(e)` 放行。
2. **汇总影响**：通过调用 `git status --porcelain`、`git clean -n` 等只读或预演命令，收集该命令将要修改或删除的文件列表与体积。
3. **显示确认**：在终端足够宽时在侧边停靠面板，较窄时降级在输入框上方显示。如果该提示条已被其他 Mod 占用，确认按钮可能无法出现，命令在等待 10 分钟后会自动拒绝；用户也可以随时按 Esc 键取消。
4. **执行或拒绝**：如果用户选择 Proceed（快捷键 1），调用 `next(e)` 放行命令继续运行；如果用户按 2 或点 Cancel（或按 Esc），则直接返回包含原因的 `{ deny: "..." }`，命令不会被执行。

![窄屏终端下 Blast Radius 降级在输入框上方渲染](https://pic.xiaohu.ai/jiedu-media/claude-code-mods/source-09.png)

120 列紧凑终端下的降级渲染效果。

    当屏幕空间无法在右侧停靠面板时，git reset --hard 涉及的两个未提交文件（NOTES.md 与 src/math.js）会在输入框上方的黄色警告盒内展示并等待输入。

（安全提示：Blast Radius 相当于一个安全辅助网，而不是严格的安全防火墙。它通过读取命令文本来进行匹配，因此像别名、外部脚本内部的删除操作或 `$(...)` 子命令替换等情况可能会绕过它。如果需要进行硬性限制，应当配置 Claude Code 自带的权限拒绝规则。）

---

#### Replay Theater：一轮结束后，逐次查看改动

在面对涉及多个文件的复杂重构时，Claude 可能会在一轮对话中连续调用多次 Edit 和 Write 工具。Replay Theater 的作用是在当前轮次中把每一次编辑的前后代码快照记录下来，并在轮末提供像播放器一样的逐步 Diff 检视界面。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/claude-code-mods/source-10.mp4)

Replay Theater 逐文件走查重构过程。

    一轮跨 3 个文件的 5 次编辑操作结束后，输入框上方出现回放提示条；进入面板后可使用 Prev、Next 逐步核对代码差异，确认无误后点击 Close 退出。

##### 关键机制与交互方式

1. **按轮次归集改动**：本轮开始时开一份记录；在 Edit 或 Write 调用到来时，结合文件旧内容与编辑参数记录前后差异，修改本身照常执行；在主轮次结束时提供查看入口。其中包含子 Agent 的编辑，通过 `e.agentId` 区分子轮结束和主轮结束。
2. **呼出回放面板**：可以通过 `/replay` 命令打开，也可以按 `ctrl+x`、按 `Tab` 聚焦上方提示条再按 `r` 打开面板。
3. **只读走查不回滚**：Replay Theater 是只读检视工具，查看后点击 Close 仅退出面板，文件不会发生回滚。

![80 列终端内联回放](https://pic.xiaohu.ai/jiedu-media/claude-code-mods/source-12.png)

80 列紧凑终端下的内联回放模式。

    在标准宽屏下面板停靠于右侧；在紧凑宽度终端中，Diff 回放盒自动以内联方式渲染在输入框正上方。

---

### 社区创意：开发者们用 Mods 做了什么？

许多开发者利用 Mods 做了实用的工具与界面尝试：

#### 1. 工具看板：Stack Viewer（Daniel Avila）

注册 `/stack` 命令，在会话中直接列出当前所有已安装和可用的工具：包括技能、子代理、命令、钩子、MCP 服务与插件。

#### 2. 渐进式展开阅读：cc-stretch（pro-vi）

当 Claude 回复时默认先显示简短版本；点击带下划线的短句，内容会在原地展开为完整细节，点击 `«` 即可收起。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/claude-code-mods/cc-stretch-x.mp4)

cc-stretch 原位文本伸展效果。

    点击段落中的短句原地展开细节说明，文字在同一段落中展开或收起。

（技术细节：模型会提前生成各层文本，因此该插件节约的是用户的阅读精力与视线跳跃，并不减少大模型生成的 Token 消耗与计费；在终端中使用鼠标点击需要运行 `/tui fullscreen` 启用全屏渲染器支持。）

#### 3. 等待呼吸图案：Mindful Claude（halluton）

当 Claude 开始工作时，输入框上方会显示橙色呼吸图案，带有 "Breathe in... 4s" 的节奏提示。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/claude-code-mods/mindful-x.mp4)

Mindful Claude 在等待阶段显示呼吸图案。

    输入框上方显示橙色呼吸图案与 4 秒节奏提示。

#### 4. 今日提醒：RemCTL Today（Federico Viticci）

配合 Apple Reminders CLI 工具，Today 模组可以在输入框上方显示今天的待办提醒。

![RemCTL CLI 提醒事项看板](https://pic.xiaohu.ai/jiedu-media/claude-code-mods/remctl-x.png)

RemCTL CLI 工具界面。

    原图展示的是 RemCTL CLI 自身的逾期与当日清单列表，并非 Today Mod 在输入框上方的实际运行画面。

社区中还有开发者演示了在 Claude Code 会话中运行 Doom 游戏。

---

### 安全边界与开发准则

赋予插件深度的介入能力，同时也意味着需要了解其安全边界。

#### 1. Mods 没有安全沙箱

Mod 运行在 Claude Code 内部，**可以调用 Claude Code 的文件、进程与网络能力，没有用于限制机器访问的安全沙箱**：

- Mod 可以读取你的环境变量（包括可能存放的 API Key）与本地文件，也可以启动进程或发起网络请求。
- 权限请求的批准并非在所有配置下都能随意绕过：在受管设置或团队策略下，权限行为受到策略限制。
- 如果在设置中开启了 `sandboxing`，该沙箱仅隔离 Claude 自身运行的 Bash 命令，Mod 启动的进程则在沙箱之外运行。
- 在安装第三方 Mod 前，可以使用 `claude plugin validate` 查看它挂载的钩子（hooks）和调用的 API（calls），但该命令只做静态解析，不提供安全认证。安装第三方 Mod 应像安装代码包一样谨慎，只安装来自可信来源的插件。

#### 2. 企业与组织管理

在企业或团队环境中，管理者可以通过集中设置（Managed Settings）控制哪些 Mods 可以加载。例如可以通过策略限制用户安装的 Mod，或配置 `allowManagedModsOnly` 仅允许组织管理的 Mod 代码加载。具体配置以官方最新文档为准。

#### 3. 定制方案选型对照

当你考虑扩展 Claude Code 时，可以根据是否需要绘制界面和运行位置来选择：

| 定制形态 | 运行方式 | 是否直接扩展内部 UI | 适合场景 |
| --- | --- | --- | --- |
| **Mod（模组）** | 插件函数（会话进程中） | **是**（输入框上方条带、侧边面板、Spinner 等） | 需要自定义界面、接管或改写事件、维护跨热重载状态 |
| **Settings Hook** | 设置中指定的外部脚本、HTTP 等 | **否** | 使用现有脚本或接口做检查、记录日志 |
| **Skill（技能）** | 指导文件（Markdown） | **否** | 教给 Claude 特定工作流或编码规范 |
| **MCP Server** | 外部进程（标准协议） | **否** | 为 Claude 连接外部数据库或第三方 API |

---

### 开始构建你自己的 Mod

Claude Code 本身的许多内置功能（例如 `/diff` 面板和 `AGENTS.md` 支持）底层就是以 Mod 的形式实现的，官方源码与测试用例可在开源仓库 `anthropics/claude-code` 的 `mods/` 目录中查看。

如果你想读到更多官方完整示例的实现源码，可以访问官方示例库 [anthropics/claude-code-playground](https://github.com/anthropics/claude-code-playground)。

想要拥有自己的 Mod，可以从一个最具体的日常需求开始：开启 `claude` 会话，把你想在界面上看到什么或在什么条件下拦截命令直接告诉它。生成之后观察效果，再通过追问逐步调整规则。

来源Getting started with Claude Code ModsAddy Osmani·[查看主材料](https://x.com/addyosmani/status/2115326629488824753)延伸[官方代码教程与完整示例](https://claude.dev/blog/getting-started-with-claude-code-mods/)·[Mods overview · 当前官方文档](https://code.claude.com/docs/en/plugins/mods/overview)·[cc-stretch · 项目说明](https://github.com/pro-vi/cc-stretch)
CLAUDE CODE MODS · 上手指南

## Claude Code Mods 上手指南：你可以定制自己的 Claude Code

让 Claude Code 在你需要的地方显示信息、检查操作；先用自然语言试出效果，再保存成下次也能用的插件。
从上下文天气条开始，看懂生成、修改、保存和执行前检查。

Mod 是什么？先看一个具体需求

想在输入框上方常驻显示“当前上下文用了多少、比上一轮增加多少”？Claude Code Mods（模组）就是运行在当前会话里的小型 JavaScript 或 TypeScript 扩展脚本，能把这类读数画成天气条、按钮或面板。

它还能插进操作过程：Claude 准备执行命令时，Mod 可以先接住请求，显示影响、修改参数或直接拒绝。Settings Hook 通常每次另起外部脚本，跨次记录要另存文件；Mod 能在会话中留住状态并直接绘制界面。

先试出来，再保存给下次用

1. **提出一个具体需求。**CLI 需 2.1.287+；先运行 `claude`，描述“在输入框上方显示上下文占用比例和最近 12 轮走势”。完整提示词见正文。
2. **生成后边用边改。**批准新建文件并允许热重载；本轮结束查看天气条，再追问“让 Storm 从 70% 开始”。保存后的代码会在当前会话重新加载，无需重启。
3. **退出前保存整个插件目录。**先问 Claude 实际完整路径，复制到长期目录。新会话用 `claude --plugin-dir "/实际完整路径/token-weather"` 测试；要自动加载，再按正文建立本地市场并安装。临时会话加载不等于已永久安装。

CORE MECHANISM · ONION PIPELINE
核心机制：一次请求如何穿过 Mod 洋葱模型
事件会依次经过各插件注册的钩子，最后交给 Claude Code 执行默认动作；执行结果再沿调用链返回。请求向内传、结果向外回，这种层层经过的关系，就是“洋葱式”中间件。钩子对事件的处理方式严格取决于是否调用 next(e) 以及如何传参。

EVENT
1. 触发工具调用 (如 Bash)

→

HOOK
2. Mod 拦截点 ($, e, next)

→

DECISION
3. 三向策略分流执行

01 · OBSERVE 观察
放行并等待结果
`const r = await next(e);`

原请求继续执行，结果回来后再记录。例如操作完成后统计读数或文件变化。

02 · REWRITE 改写
修改参数后传递
`next({ ...e, command: "git status --short" })`

例如把 git status 改为 git status --short；后续插件和 Claude 收到的是新参数。改写本身不保证安全。

03 · ANSWER 接管/自答
自己返回，不调用 next
`return { deny: "..." };`

可以直接拒绝，也可以自行提供结果；请求不再往下传，默认动作不会执行。

天气条如何留住记录，又自动更新？

代码热重载会重新执行文件，普通模块变量里的历史记录可能清空。放入宿主提供的 $.state 后，记录能在当前会话中跨热重载保留；这不表示新开会话也会保留旧记录。

界面绘制时读取 $.state.get，就会订阅这份状态；每轮结束写入新读数，订阅它的天气条便自动重画。

STEP 01
会话采集

轮末调用 $.session.usage() 获取当前上下文窗口的总量、已用 Token 与比例。

STEP 02
留住本轮记录

写入 $.state.set，数据托管于当前宿主会话，跨代码热重载不丢失历史。

STEP 03
响应式自动重绘

UI 层的 $.state.get 自动建立响应式监听，状态更新立刻原地触发条带渲染。

天气挡位对应上下文占用比例，走势图保留最近 12 轮。90% 的 Compact soon 是这个示例的提醒阈值，不是 Claude 强制截断线，也不是账单金额。

< 25%
☀ Clear 晴

25–49%
☁ Cloudy 多云

50–74%
☂ Showers 阵雨

75–89%
☇ Storm 暴风雨

≥ 90%
↯ Compact 建议整理

生命周期护栏：执行前确认与修改后回放

两个示例分别帮助你在执行前决定是否放行，以及在修改后逐次检查结果。命令匹配可能漏过别名或脚本内部操作，确认面板不能代替权限拒绝规则。

PRE-EXECUTION · 执行前阻断
Blast Radius
挂起高危命令，只读预演评估影响并展示确认面板

• **识别与挂起：**拦截 Bash 调用，匹配 rm -rf 或 git reset 等破坏性命令并挂起执行。
• **只读预演：**静默调用 git status 或 git clean -n 收集即将被删改的文件列表与体积。
• **分支决策：**侧边或输入框上方弹出确认面板；用户按 1 放行 next(e)，按 2 或 Esc 则返回 { deny } 阻断。

POST-EXECUTION · 执行后复核
Replay Theater
按轮次归集改动快照，轮末提供播放器式逐步走查

• **快照捕获：**在当前轮次监听多次 Edit 和 Write 工具，记录每次编辑前后的代码快照与差异。
• **轮末入口：**主轮次结束时在输入框上方渲染查看入口，可通过 /replay 或快捷键唤起。
• **只读检视：**提供 Prev / Next 逐步核对代码差异，确认无误点击 Close 退出，不会引起文件回滚。

扩展选型矩阵与安全边界

当你考虑扩展 Claude Code 时，可以根据是否需要绘制界面和运行位置来选择：

| 定制形态 | 运行方式 | 是否直接扩展内部 UI | 适合场景 |
| --- | --- | --- | --- |
| Mod（模组） | 插件函数（会话进程中） | **是**（输入框上方条带、侧边面板等） | 需要自定义界面、接管或改写事件、维护跨热重载状态 |
| Settings Hook | 设置中指定的外部脚本或 HTTP | 否 | 使用现有脚本或接口做被动检查、记录日志 |
| Skill（技能） | 指导文件（Markdown） | 否 | 教给 Claude 特定工作流或编码规范 |
| MCP Server | 外部服务（标准协议） | 否 | 为 Claude 连接外部数据库或第三方 API |

安装第三方 Mod 相当于运行代码包：它能读本地文件和环境变量、启动进程及联网，没有限制机器访问的安全沙箱；Bash 沙箱不隔离 Mod。claude plugin validate 只做静态检查，不是安全认证。只安装可信来源。

原文版权归原作者，这里只供对照阅读。 [看原网页 ↗](https://x.com/addyosmani/status/2115326629488824753)

## Getting started with Claude Code Mods

[Mods](https://code.claude.com/docs/en/plugins/mods/overview) were released in Claude Code a few weeks ago, and I'm sharing this guide to make it easier to get started with them.

Mods are small JavaScript or TypeScript files that you run within your Claude Code session. They allow you to react to events, modify the behavior of Claude Code or render your own interfaces in both the terminal and desktop applications. Here's a nice ~3m video on mods by Lydia:

What I love most about mods is that they can be created without learning their API. Run claude and describe the mod you want it to create. Approve the files as Claude writes them, say yes when asked to enable hot reloading, and your mod will be shown when the turn ends.

In this guide, you'll find a high-level overview of the capabilities of mods and how to prompt Claude Code to create one. You'll also learn how to persist, distribute and install your own mods. Btw, a more [code-heavy](https://claude.dev/blog/getting-started-with-claude-code-mods/) version of this write-up is available too but also just ask Claude to help build your mods.

While Claude Code already lets you customize a lot of its behavior, such as configuration settings, permission policies, slash commands, skills and status lines, mods allow you to do so much more. With mods you can alter or override the behavior of Claude Code or render your own custom interfaces. Folks have been having fun building mods, including multiplayer Doom!

That was pretty neat. With mods you can create a tailored experience for your own workflow. Create a constant display that you monitor. Have a safety net for risky commands. Design your own diff renderer in a way you prefer to read.

For our walkthrough we'll begin with **Token Weather**, a mod that displays a turn-by-turn forecast of the context window above the prompt. Then we'll look at two more complex mods, **Blast Radius** and **Replay Theater**, to explore the possibilities of mods further.

If you want to explore the finished code for all three mods at any point, you can find them in [anthropics/claude-code-playground](https://github.com/anthropics/claude-code-playground/tree/main/claude-code/mods).

### How mods work

At a technical level, mods are hooks bundled with plugins. Each hook can see all events occurring within the session, such as when tool calls are made, prompts are submitted, turns start and end, sessions start and end, slash commands are executed, and every rendering of any part of the UI.

Hooks are chained together like middleware. When an event occurs, it is passed through your hook, then through other plugins, before finally hitting Claude Code and performing its default action.

A hook can do one of three things when an event occurs:

- **Observe:** Allow the event to continue and observe the outcome. For instance, a hook could log every time a file is modified or take a snapshot after every turn.
- **Rewrite:** Change the event for the remaining hooks. For instance, a hook could add text to a prompt or change a tool call's input.
- **Answer:** Handle the event itself, so the default behavior doesn't run. For instance, a hook could deny a tool call or answer a command.

These terms are helpful when thinking about what a mod does and how to ask Claude for one: "Refuse this kind of command" is an answer, whereas "Take a snapshot after every turn" is an observation.

**What makes mods different from settings hooks**

A [settings hook](https://claude.com/resources/articles/how-to-configure-hooks) is a shell command that runs each time an event occurs. A mod is loaded once into a session and maintains its own state and UI which it can update in response to events. A mod can also call back into Claude Code. For example, it can open a pane, spawn a process, or register a slash command or tool that's callable by the model.

We use mods to implement some of Claude Code's own features, such as AGENTS.md support and the /diff pane. The code and tests are available in the public [anthropics/claude-code](https://github.com/anthropics/claude-code) repo in the mods/ directory.

### Write your first mod: Token Weather

Token Weather tells you how full the context window is, after each turn, by displaying one line in the band above the prompt that includes a weather icon and the percentage of the context window that's used. It also displays how many tokens have been used from the context window, a miniature chart showing the progression of the context window over the last few turns, and how many tokens have been added since the last turn.

Here's a demonstration of the mod in action. The terminal session shows progressively more files being read, with the band changing color from ☀ Clear to ☂ Showers to ☇ Storm:

**Tell it to Claude, and watch Claude build it**

Claude Code has an inbuilt way of creating mods, so you can just describe the mod you want, and Claude will make it for you. Start a claude session and paste the following into it:

```
Make me a Claude Code mod called token-weather: a live forecast of my context window, shown in the band above the prompt.

What it should show, on one line:

A weather icon and word for how full the context window is: 

under 25% ☀ Clear (yellow), 
25–49% ☁ Cloudy (cyan), 
50–74% ☂ Showers (blue), 
75–89% ☇ Storm (magenta), 
90% and up ↯ Compact soon (red).

The percentage used, then the tokens used out of the window, like "134.4k / 200k".

A small chart of the last 12 turns, drawn with ▁▂▃▄▅▆▇█.

How much the last turn added, like "▲ +98.3k last turn".
It should update after every turn.
```

Approve the files as Claude writes them, then say yes when Claude Code asks to enable hot reloading for the session. The band shows up above the prompt when the turn ends.

You'll notice the prompt never mentions events, state or the API. It only says what you want to see. Claude Code ships with a guide for writing mods, so it already knows the how: where to keep state so a reload doesn't wipe it, how to check the plugin with claude plugin validate, which events to hook.

Change the "What it should show" bits and it's your mod, not ours.

**Iterate, by asking**

From then on you can change things on the fly, no restart needed. Ask for "make Storm start at 70%" or "add the dollar cost at the end" and the band updates right there in front of you. For me, that quick loop is most of what makes mods fun.

If a mod's visuals go missing, run claude --debug and look for a line saying a hook returned a tree that does not validate.

The API may change between releases. When Claude Code loads a mod, it writes the type declarations for your build into the mod's .claude-plugin/types/ folder, so treat those as the reference for your version.

**Staying around**

A mod built this way only loads for the current session, and its folder gets cleaned up later. To hold on to it, copy the folder out of ~/.claude/dev-mods/<session-id>/ and install it like any other plugin, which the next section covers.

If you'd like to see an example of the final product, you can see the [full Token Weather mod](https://github.com/anthropics/claude-code-playground/tree/main/claude-code/mods/token-weather) in anthropics/claude-code-playground.

### Publishing and installing mods

Mods are just Claude Code plugins, so publishing and installing them is the same as with any other plugin. To publish a mod, just put it in a GitHub repo and include a marketplace file in it; that will make it a marketplace you can publish to, and you can push updates to it in the usual way.

To install a mod, use three commands in Claude Code:

- /plugin marketplace add the GitHub repo (e.g. your-org/my-mods)
- /plugin install the mod name from that marketplace (e.g. token-weather@my-mods), then pick a scope
- /reload-plugins if the mod doesn't start on its own

You can add your mod as a plugin in the Claude directory if you like; submit it at [claude.ai/directory/manage](https://claude.ai/directory/manage) for discoverability without needing a link to your repo.

**Safety**

Mods are code that runs within Claude Code on your local machine, with your permissions. Mods aren't sandboxed: they can read your files and secrets, start processes, make network requests and approve tool calls. Mods are written by their author, not Anthropic.

As you would with any package, read the source and only install mods from people you trust. To see what a mod hooks and calls before you install it, run claude plugin validate on its folder.

### Two more examples

So far, Token Weather has been just observation and rendering. These next two mods involve events, panes, and user interaction. You can see the full code for both in anthropics/claude-code-playground: [Blast Radius](https://github.com/anthropics/claude-code-playground/tree/main/claude-code/mods/blast-radius) and [Replay Theater](https://github.com/anthropics/claude-code-playground/tree/main/claude-code/mods/replay-theater), each with a README explaining how it was made.

**Blast Radius: preview changes for a dangerous command**

Blast Radius intercepts calls from Claude to Bash that are potentially dangerous (e.g. rm -rf, git reset --hard, git clean, force push, database migration) and calculates what they would do. A pane opens with a **Proceed** or **Cancel** button.

- If you press 2, Claude gets a refusal with the reason.
- If you press 1, the command runs as usual.

In effect, this is the "answer" move from before. Blast Radius compiles the report from dry run output from each tool (e.g. git status --porcelain, git clean -n). It waits for a button press, or cancels if you press Esc.

If the terminal is wide enough, the pane docks on the side next to the transcript. If not, Blast Radius renders the report above the prompt. Only one mod can use that band at a time, so if another mod holds it the buttons may not appear, and the command is refused after 10 minutes.

Think of this as a safety net rather than a real firewall. It reads the command text, so $(…), aliases and scripts that call rm will get past it. If you want a hard block, use permission rules.

**Replay Theater: reviewing what happened at the end of the turn**

When a turn is running, Replay Theater watches all of the Edit and Write calls to see which files changed and what they changed to. At the end of a turn, you can see a message above the prompt to let you know that you can replay them. Type /replay (or press ctrl+x then Tab to focus the band, then r) and you'll see a pane that'll show the changes for each edit with diffs. It'll have a list of the step numbers and **Prev**, **Next** and **Close** buttons.

It never blocks or affects edits, it just watches.

Each turn gets its own replay, and subagent edits are included in the main turn's replay. Where the pane goes depends on the space: it's docked on the right in fullscreen and inline above the prompt at 80 columns.

### A few community mods I love

As you can imagine, there have been a bunch of creations that I would never have thought of since we launched. Here are just a few of my favorites.

**Stack viewer** by Daniel Avila. A /stack mod that displays all installed and available tools in your Claude Code session: skills, subagents, commands, hooks, MCP servers, plugins. Check out the video and installation instructions in the post.

[cc-stretch](https://github.com/pro-vi/cc-stretch) by pro-vi. Stretchtext mod for Claude Code. When Claude Code responds, it will respond briefly and any linked phrase you click on will be expanded to the full length. It's a beautiful modern expression of old hypertext concepts.

[Mindful Claude](https://github.com/halluton/Mindful-Claude) by halluton. When Claude starts working, you'll see an animation above the prompt that'll help you take a deep breath. This was also featured in an [XDA article](https://www.xda-developers.com/tried-claude-code-mods-now-waiting-for-it-to-finish-is-actually-fun/).

[RemCTL](https://github.com/viticci/remctl) by Federico Viticci. An Apple Reminders CLI and Claude Code plugin. The Today mod displays your reminders for today above the prompt.

### What will you mod?

Each of the three demos here began from a single question: *How much context do I have? What command is about to be run? What did Claude just change? Your* questions are likely to be different than mine, and so will your mods.

Follow the same process as in the Token Weather demo: Tell Claude what you want to see, under what conditions and leave the implementation details to Claude. Enjoy another game mod and link to a few more below!

**Share your mod!**

Once you've developed a mod that you use daily, please take a moment to post a video of it in action, so other developers can see what's possible. (You can also add your plugin to a marketplace and share the link. Anyone who likes your mod can install it with a few simple commands.)

We can't wait to see what you build!

↑ 正文结束
✓ 本篇全文免费开放

会员可复制、下载全文 Markdown，还能让你的 AI 订阅和提问。
[订年卡 $59/年](https://xiaohu.ai/buy/?plan=year)[看权益对比 →](https://xiaohu.ai/membership/)

[阅读原文 ↗](https://x.com/addyosmani/status/2115326629488824753)

📮 新解读每晚进邮箱

读完觉得有用？留个邮箱，每晚一封当天的新解读，随时退订。
