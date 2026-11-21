---
title: "Anthropic 发布打造24小时常驻 Agent 的指南：AI 助手怎么做到「一直在线」"
date: 2026-11-14T00:00:00.000Z
tags: ["AI 实操", "Anthropic", "Claude", "AI Agent", "常驻 Agent", "Agent 架构"]
summary: "Anthropic 出了一份搭常驻 Agent 的官方指南：一个能自己醒来、记得上次做到哪、做完会来找你的 Agent，靠收件箱、定时器、记忆、权限、发件箱五个部件拼成一个循环。"
---
> **原文链接**: [https://claude.com/resources/articles/building-always-on-agents](https://claude.com/resources/articles/building-always-on-agents)
> **来源**: 数据：Claude 开发者文档《Optimizing for cost and intelligence》
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/claude-always-on-agents/) · 2026/11/14
> **说明**: 本文由 AIHot汪 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

在过去的几个月里，我们看到了始终在线 Agent（always-on agents）的复兴。

始终在线 Agent 是有状态的且具备主动性（proactive），这意味着它们能够跨会话管理上下文，并在无需直接监督的情况下采取行动。在底层，它们与其他 Agent 一样运行在相同的[核心循环](https://www.anthropic.com/research/building-effective-agents)之上。区别在于周围的架构，该架构由控制 Agent 何时唤醒、哪些内容在运行之间延续以及其工作如何传递给用户的原语（primitives）构建而成。

这种复兴主要归功于最近模型能力的进步，这使得运行始终在线 Agent 变得更加实用。首先，最新的模型具有更好的判断力：它们在理解用户意图和知道何时进行检查方面更加可靠。其次，智能正在变得更便宜，长周期任务（long-horizon tasks）受益最大。例如，在[一项长周期编码基准测试](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence)中，Opus 5.5 解决每个任务的成本比 Opus 5 降低了 78%，而在典型工作负载中降低了 40%。

客户开始询问我们如何将这种类型的体验集成到他们自己的产品中。一些公司希望使现有的 Agent 更具主动性，而另一些公司则希望从头开始构建它们。

本文拆解了始终在线 Agent 背后的原语，并逐步介绍它们如何组合在一起。

### 始终在线 Agent 的循环

始终在线 Agent 实际上并不是“始终在线”。这仅仅是对用户体验的描述。

实际上，Agent 大部分时间处于休眠状态，定期醒来执行工作。每一段工作时间被称为一次**运行（run）**：Agent 接收一个事件，完成任务，然后保存关于发生情况的信息。一次运行在一个**会话（session）**内进行，会话是消息和工具调用的记录。一旦运行结束，Agent 回到休眠状态，循环无限重复。

![始终在线 Agent 时间线的动画图：长时间休眠不消耗 token，被短暂的运行打断。每次运行有四个步骤：事件到达，会话开始，Agent 循环运行，运行将结果写回存储在运行之间的状态。](https://assets.claude.com/5dc803bf06d6e92e4aecae762da096626e2fa9ec.gif)

### 核心原语

始终在线 Agent 的周围架构有五个核心原语：事件收件箱（event inbox）、定时器（timers）、记忆（memory）、权限（permissions）和发件箱（outbox）。让我们逐一查看。

#### 事件收件箱

大多数 AI Agent 仅在用户发送消息时运行。相比之下，始终在线 Agent 可以由多种类型的事件触发，包括 Webhook、定时任务和后台作业。

一种诱人的方法是让每个事件源直接调用 Agent，但这有一些故障模式。例如，两个同时到达的事件可能启动竞争性的运行，而崩溃可能导致事件完全丢失。

这就是事件收件箱发挥作用的地方。每个源不是直接调用 Agent，而是将事件发送到收件箱，由工作进程（worker）拾取。

最简单的版本包含三个组件：

- 持久的事件列表，通常是数据库表；
- 处理程序，通常是 HTTP 端点，将事件写入列表；以及
- 工作进程，通常是后台服务，从列表中读取。

收件箱应跟踪每个事件的状态，并且可以根据来自源的唯一标识符对事件进行去重。关系数据库非常适合用作收件箱，每个事件作为新行追加。我们建议从每个用户一个收件箱开始，但如果需要更高的并行度，可以进一步拆分。

![事件收件箱的图表。处理程序（HTTP 端点）将每个事件写入收件箱，这是一个跟踪状态并丢弃重复项的数据库表，并唤醒工作进程。工作进程读取待处理的内容，启动运行，等待其完成，并将事件标记为完成。](https://assets.claude.com/bb08543a505cea3a24c88c718ceec4405e9c0a79.png)

当事件到达时，处理程序将事件写入收件箱并唤醒工作进程。工作进程读取任何待处理的内容并启动一次运行。延续先前工作的事件（例如用户的回复）会恢复现有会话，而所有其他事件则启动新会话。

从那里，Worker 将事件传递给 Agent 循环，等待运行结束，并将相应的事件标记为完成。实现细节可能比较复杂，因此这里有一些最佳实践：

- **Handler 应快速确认事件**。某些来源（如 webhook 提供商）会将慢速响应视为失败。Handler 仍可运行轻量级检查，但任何更深入的验证（例如检查提示注入）应在运行期间进行。
- **Inbox 应是唯一事实来源**。当 Worker 被唤醒时，它应首先从 Inbox 中拉取最新事件。这样，如果 Worker 在运行中途死亡，新的 Worker 可以拾取相同的事件并重试。
- **Inbox 一次只能有一个活跃的 Worker**。这可以防止两个运行重复工作或相互覆盖。当新事件在运行期间出现时，你可以将其推送到下一个运行、合并到当前运行，或者中断并重新启动。
- **Worker 应将待处理的事件批量处理**。例如，如果用户连续发送多条消息，Worker 可以将它们合并为一次运行，这样 Agent 只需回复一次。

#### 定时器

结合事件 Inbox，定时器使始终在线的 Agent 能够主动行事。定时器通常分为两类：跟进（follow-ups）或计划（schedules）。跟进是 Agent 为自己设定的截止时间，例如检查回复。另一方面，计划是按已知周期发生的重复任务，例如每日新闻通讯。

定时器存在于自己的持久化存储中，通常是另一个数据库表，与 Inbox 分开。Inbox 应仅包含准备好处理的事件。跟进和计划可以共享类似的架构，但计划还需要跟踪其重复性。

![定时器示意图。运行在数据库表中设置定时器，可以是 Agent 设置的跟进或用户设置的计划。调度器查找到期的定时器并将事件添加到事件 Inbox，从而启动下一次运行。](https://assets.claude.com/c16694e6d979a2ace84d03da0544297b7245c0a8.png)

定时器本身不会启动运行。相反，调度器（通常是后台服务）以固定间隔轮询存储，并触发任何到期的定时器。在每次轮询中，调度器：

1. 扫描存储并找到到期的定时器。
2. 根据其类别更新每个定时器。
   1. 跟进应标记为完成。
   2. 计划应将其到期时间更新为下一次发生的时间。
3. 将事件添加到 Inbox 并唤醒 Worker。

对于调度器，你可以构建自己的服务或使用持久化执行引擎。

#### 记忆

始终在线的 Agent 跨多个不连续的运行工作，并依赖记忆来维持连续性。

与事件 Inbox 和定时器类似，记忆应有自己的存储。在我们的产品中，例如 Claude Code 的 [auto memory](https://code.claude.com/docs/en/memory) 和 Messages API 的 [memory tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool)，这是以文件目录的形式实现的。对于始终在线的 Agent，目录应映射到持久化存储，通常是数据库或对象存储。这样，记忆可以比 Worker 存活更久。

作为经验法则，记忆应仅保存 Agent 无法再次查找的内容。如果某事物已经存在于其他系统中（例如问题跟踪器），你应该保存一个指针。以下是始终在线的 Agent 应存储的记忆类型分解：

- **用户指令：** 用户关于 Agent 行为的任何指令都应保存在其自己的文件中，并在每次运行开始时加载。用户并不总是随时引导 Agent，因此指令必须在运行之间延续。
- **用户笔记：** Agent 应保存它关于用户所学到的内容，例如其角色、偏好或任何更正。你可以从单个文件开始，随着笔记的增长转移到多个小文件。在后一种情况下，每次运行开始时只加载索引，但 Agent 可以在需要更多细节时将单个文件拉入上下文。
- **历史消息：** Agent 应跟踪它已经告诉用户的内容，以免重复。它可以将其存储在每次运行开始时加载的单独文件中，或者让 Worker 加载 Agent 与用户的最后几条消息。
- **任务进度：** 对于每个正在进行的任务，Agent 应保存一个进度文件，涵盖已完成和剩余的内容。任何新的运行都可以读取该文件，并从上一次运行结束的地方继续。与用户笔记类似，每次运行开始时只加载索引，但 Agent 可以在需要更多细节时将单个文件拉入上下文。

下图展示了一个示例设置。

![示例内存设置的图表，显示为文件目录。instructions.md、index.md 和 reported.md 在每个运行开始时加载，而 notes/ 和 progress/ 文件夹则在需要时读取。代理在运行期间向内存写入数据。](https://assets.claude.com/e5d209d7ef9b3455dec8a27b777dc12bdf806699.png)

上述所有内容描述的是在运行期间保存的内存。您还可以添加“梦境”（dreaming）功能，通过回顾过去的会话来整理记忆。梦境可以替换过时的条目，并发现仅在多次运行中才显现的模式。如果您想了解更多，我们的 [关于代理内存的文章](https://www.anthropic.com/research/components-of-agent-memory) 对此进行了更详细的介绍。

##### 上下文窗口内部

在执行任何工作之前，代理会加载系统提示词、工具定义和内存文件。这些初始的上下文“开销”包含在每次运行中，因此我们建议保持精简，并使用 [提示词缓存](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) 来降低成本。

新会话仅包含此上下文开销和触发运行的事件。而现有会话则会恢复其早期运行中的消息和工具调用。

如果会话变得过长，您可以 [压缩旧消息](https://platform.claude.com/docs/en/build-with-claude/compaction) 或开始新会话。这两种方法都会丢失细节，因此任何需要持久化的内容都应在此过程中保存到内存中。

![上下文使用情况的动画图表。每次运行都存在用于系统提示词、工具和内存的固定带宽。现有会话会恢复其完整对话记录并持续增长，直到压缩将旧对话记录转换为摘要。](https://assets.claude.com/48757f0a147acfe841c943674c6214d34ed4405a.gif)

#### 权限

权限是始终在线的代理（always-on agents）风险最大的地方。一次运行持有用户的访问权限，并且设计上是在无人值守的情况下运行。对于每次工具调用，代理需要决定是自行继续、阻止该操作，还是等待批准。

权限的组件与其他代理使用的组件相同：

- **凭据存储：** 始终在线的代理通常需要敏感的用户凭据（如密码或访问令牌）才能发挥作用。[推荐模式](https://code.claude.com/docs/en/agent-sdk/secure-deployment#credential-management) 是在代理环境之外设置一个代理服务器，将凭据添加到出站请求中。代理发送不带凭据的请求，代理服务器在转发前注入真实凭据。
- **自动模式：** 始终在线的代理应能够在没有用户持续输入的情况下工作。我们已经在 Claude Code 的 [自动模式](https://www.anthropic.com/research/claude-code-auto-mode) 中解决了这个问题的一个版本。自动模式使用分类器来审查高风险操作，并阻止被识别为危险的操作，以便 Claude 找到更安全的方法。然而，对于最重要的决策，用户审查仍然是必要的。
- **延迟工具调用：** 在 Claude Code 中，[钩子可以延迟工具调用](https://code.claude.com/docs/en/hooks#defer-a-tool-call-for-later) 并等待用户的额外输入。同样的模式也适用于始终在线的代理，它们在执行某些操作之前可能需要澄清或批准。当调用被延迟时，运行结束，会话在调用中途保存。请求会显示给用户（例如，通过基于 [MCP Apps](https://modelcontextprotocol.io/extensions/apps/overview) 构建的交互式卡片），用户的回答作为事件返回到收件箱。该事件启动一个新的运行，该运行使用用户的输入恢复保存的会话。在延迟调用等待响应时，工作进程可以处理其他事件，因此代理不会被阻塞。

#### 发件箱

对于大多数 AI 代理，响应是在生成时流式传输给用户的，这样他们就可以跟随 Claude 推理问题、调用工具并写出答案的过程。

另一方面，始终在线的 Agent（Always-on agents）主要在后台完成大部分工作。用户获得的是结果和少量细节，而不是完整的逐步分解。

![Outbox 的示意图。一次运行以无内容发送、发送工具调用或请求用户输入的延迟工具调用结束。消息被发送到 Outbox（一个数据库表），调度器（Dispatcher）将它们分发给用户。延迟请求可以经过 Outbox 或在您自己的界面中显示。](https://assets.claude.com/700b5f3a446f22493c0307ec65751b6b2f82ccb7.png)

一次运行可以通过以下三种方式之一结束：

- Agent 向 Outbox 发送消息，
- Agent 决定无需发送任何内容，或者
- Agent 使用延迟工具调用（deferred tool call）来请求权限或额外输入。

大多数始终在线的 Agent 只需一个“发送”工具即可直接将消息交付给用户。只有当您希望控制 Agent 消息的节奏或允许 Agent 从错误中恢复时，才需要正式的 Outbox。

Outbox 是一个独立的外发消息表，类似于事件收件箱（event inbox）。还有一个调度器（dispatcher），通常是一个后台服务，类似于 Worker。调度器读取待处理的消息，决定发送哪些内容，并将其发送给最终用户。来自延迟工具调用的请求既可以经过 Outbox，也可以直接在界面中显示。

除了交付之外，调整 Agent 发送消息的数量也很重要。发送过多消息的 Agent 会变得嘈杂，而发送消息不足的 Agent 则会遗漏用户需要知道的内容。我们建议构建评估（evals）以找到合适的平衡点。在实践中，让 Agent 从安静开始，然后随着时间的推移赢得用户更多的注意力，效果会更好。

### 各部分如何协同工作

以下是五个基本原语（primitives）如何协同工作的：

![五个基本原语协同工作的动画示意图。计时器和事件收件箱启动一次运行，运行在会话内利用记忆和权限进行操作，Outbox 将消息交付给用户，用户的回复作为事件返回。](https://assets.claude.com/9f8df7b2dcc9d4637d27f37dae6e40a2a5851c8a.gif)

每次运行都始于收件箱中的一个事件，无论是用户消息、Webhook 还是计时器。当 Worker 拾取一个事件时，它会启动一次运行，并在新的或现有的会话中唤醒 Agent。Agent 读取其记忆以获取基线，在其权限范围内采取行动，然后使用所学内容更新其记忆。一旦运行结束，Agent 将一行数据推送到 Outbox，调度器将消息交付给用户。

这些组件共同形成一个循环。一次运行可以设置一个计时器，以便稍后再次唤醒 Agent；当用户回复消息时，他们的回答会作为事件返回到收件箱。每次运行都很短暂，但循环会无限期地持续下去，这正是让 Agent 感觉始终在线的原因。

### 致谢

*由 William Hu 撰写。特别感谢 Rodrigo Olivares 和 Michael Segner 的贡献。*
[文章 2026年11月13日 初创公司的 Claude Tag 指南：领先初创公司如何利用 Claude Tag 加速交付并扩展运营 Claude Tag](https://claude.com/resources/articles/claude-tag-guide-for-startups)[文章 2026年11月10日 Curative 如何利用 Claude 上的 Agent 构建全国性提供商网络 Curative 的交易 Agent 每周谈判 2000 多个提供商合同。 Claude Platform Claude Code](https://claude.com/resources/articles/how-curative-is-building-a-national-provider-network-with-agents-on-claude)[文章 2026年11月9日 使用 Claude Fable 5.2 安全地扩展多 Agent 团队 一个由 1000 个 Agent 组成的团队，运行 Claude Fable 5.2 的早期版本，利用通用工具、共享数据库和分层安全控制，重现了费马大定理的形式证明。(在新窗口中打开)](https://claude.dev/blog/safely-scaling-multi-agent-teams-with-fable-5-2/)[文章 2026年11月9日 您应该使用哪个 Claude 模型进行开发？ 根据任务、成本和精力水平，在 Claude Fable 5.2、Opus 5.5、Sonnet 5.5 和 Haiku 5.5 之间如何选择。 Claude Platform Claude Code(在新窗口中打开)](https://claude.dev/blog/which-claude-model-should-you-build-with/)

### 通过 Claude 变革您的组织运营模式
[查看定价](https://claude.com/pricing#api)[联系销售](https://claude.com/contact-sales)

#### 订阅开发者通讯

获取产品更新、操作指南、社区亮点等内容，每月发送至您的邮箱。

如果您希望接收我们的月度开发者通讯，请提供您的电子邮件地址。您可以随时取消订阅。
