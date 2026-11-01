---
title: "Anthropic 官方指南：随着模型能力的提升，很多子 Agent 其实可以换成技能和工具"
date: 2026-10-24T00:00:00.000Z
tags: ["洞察", "Anthropic", "Agent", "Skills", "MCP", "架构设计", "聚合"]
summary: "把业务流程整理成技能，把业务接口接成工具，让同一个 Agent 持续处理请求；哪些子 Agent 值得保留，用实际任务来判断。"
---
> **原文链接**: [https://claude.com/resources/articles/building-agents-when-to-fold-subagents-into-your-main-agent-loop](https://claude.com/resources/articles/building-agents-when-to-fold-subagents-into-your-main-agent-loop)
> **来源**: claude.com
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/claude-fold-subagents/) · 2026/10/24
> **说明**: 本文由 AIHot 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

*如果你在 Claude Platform 上构建了一个包含多个 subagent 的 agent,可以通过我们的[迁移工具包](https://github.com/anthropics/single-agent-loop-kit)查看哪些 subagent 适合折叠进主 agent 循环。它会运行一个引导式工作流,帮你识别自己的模式、评估备选方案并验证最佳方法。工具包中包含一个演示,你可以先在模拟系统上试用,再运行到你的 agent 上。*

Subagent——拥有自己独立的 context window、工具和指令、[由协调器编排](https://claude.com/resources/articles/multi-agent-coordination-patterns)的 agent——是 agent 设计的核心组成部分。它们在验证、并行工作和模块化权限管理方面非常有效。在我们使用 Claude Platform 构建的许多自有 agent 中都用到了 subagent,例如我们的[多 agent 研究系统](https://www.anthropic.com/engineering/multi-agent-research-system)。

然而,最近 Applied AI 团队发现了一类企业级 agent 部署模式,它们通过将 router、planner 和领域 subagent 折叠进主 agent 循环而获益。在[我们对多个企业部署的对比](https://claude.com/resources/articles/the-anatomy-of-effective-commerce-agents#:~:text=In%20our%20comparisons%20across%20several%20enterprise%20deployments,latency%20per%20task)中,[带 skills 的单个 agent](https://claude.com/resources/articles/building-agents-with-skills-equipping-agents-for-specialized-work)在质量上经常优于"一个 prompt 包打天下"的设计和 subagent 设计,而且通常每项任务的成本和延迟更低。

例如,有一家公司发现,其面向客户的 agent 中的十几个专业 subagent 使得一致的品牌化体验难以维护,并且由此增加的延迟损害了用户体验。

我们还经常看到被提议的 agent 设计遵循一种似曾相识的套路:意图分类器、固定的多步推理 pipeline、用户分群分桶、独立的推荐分支,以及顶层的多 agent 编排器。

在这些案例中,反馈往往是:这些结构中的大部分都在做模型已经不再需要别人代劳的工作;一个清晰的 system prompt、4-5 个精简的数据工具,以及严格的输出 guardrails,就能覆盖大部分用例。

![subagent design](https://assets.claude.com/a7cb2cf08bfcef461166310c0c55f28b72c33b0d.gif)

需要说明的是,subagent 仍然有其用武之地,包括在研究前沿。在以下情况使用它们:

- 单个 agent 循环因 context 膨胀而出现可测量的性能下降,或者
- 多个任务需要并行处理,且各任务使用全新的 context window,任务完成后即可丢弃,或者
- 单个 agent 难以选择合适的工具,或 system prompt 中存在相互冲突的指令。

但太常见的情况是,企业为每个团队或每种问题类型分配一个专属 subagent,agent 架构因此变成了组织架构图的复制品(Conway 定律在起作用)。

本文将结合我们在大型组织中构建 agent 所学到的最佳实践,介绍何时应考虑将 subagent 折叠进主 agent 循环。

### 大型组织中构建 agent 的失败模式

企业通常希望构建一个将多种产品和能力整合到单一客户界面中的 agent。

通常,每种能力由单独的团队负责,于是企业先让每个团队各自构建自己的 agent,再由中央平台团队在其之上构建一个 orchestrator。这可以采用多种结构,包括 orchestrator-subagent 模式,或将特定 agent 暴露为 MCP 工具的单个 agent 模式。

这看起来是最简单的解决方案,但会立即引入以下几方面的复杂性:

- **Context 管理:**你需要决定在 agent 之间交换哪些 context,而且信息在来回传递中经常丢失细节。
- **Subagent 泛滥**:每个团队都发布自己的 subagent,结果企业最终拥有数百个相互重叠的 subagent,既没有强制执行的标准,也没有明确的负责人。
- **Frankenprompt**:每个团队都往 system prompt 里加一句话,导致规则相互冲突、语气无法统一。
- **未经审核、过度局部化的 evals**:每个人都添加针对自己子任务过度优化的 evals。没有人负责或维护整套 evals,领导层基于被稀释的、过度局部化的分数做决策。
- **Latency**:多 agent 架构的复杂性会增加延迟。一位将多 agent 框架与单个 agent 循环进行对比评估的客户发现,后者的运行速度快了约 2 倍。

### 使用带渐进式披露（progressive disclosure）的 Agent 循环

上文描述的 orchestrator-subagent 设计是协调跨团队构建的专家 Agent 的一种合理方式，但通常更有效的方法是**通过 skills 渐进式披露上下文**和**通过 tool search 渐进式披露工具**。换句话说，Agent 只看到 skills 和工具的简短描述，只有在需要时才完整加载。

这种方式之所以合理，有三个原因：

- **共享上下文能带来更好的回答：** 对于运行时间较长的 Agent，我们希望来自多个不同任务的上下文都保留在主 context window 中。一个看到过之前每一步结果的 Agent 能够将这些结果关联起来，这比由 subagent 交回的一堆摘要能产生更丰富的输出和更深入的洞察。这也意味着[更少的 context window 与更少的有损交接](https://claude.com/resources/articles/building-multi-agent-systems-when-and-how-to-use-them)。
- **渐进式披露可防止上下文膨胀：** 这一技术让团队能够构建单个 Agent 来完成各种各样的任务，而无需将所有上下文立即加载进一个冗长的 system prompt。这消除了团队此前将工作拆分给多个 subagent 的主要原因。事实上，我们[面向更先进的模型将 Claude Code 的 system prompt 削减了 80% 以上](https://claude.dev/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models/)，其中包括与渐进式披露 skills 和工具相关的削减。
- **模型能力更强：** 从 Opus 4.5 开始，模型在单个循环中所能管理的内容远超大多数团队的预期。在 Opus 5.5 和 Fable 5.1 上你无法关闭 thinking，而近期的模型越来越多地会边执行边叙述自己的进展并检查自己的工作，这使得 harness 中的某些元素变得冗余。每一代新模型都让你能把更多的决策从 harness 中转移到模型本身。更简单的循环也更容易迁移到下一个模型；在我们协助客户完成的迁移中，僵化的多 Agent 结构往往是阻碍新模型承担更多工作的原因。

单 Agent 循环设计需要严格的纪律：精心管理的 system prompt、能在恰当时机触发的 skill 和工具描述，以及对 context window、记忆和笔记记录的有意识处理。本文将在后续章节深入探讨迁移和设计方面的考量。

应由一个中心团队负责端到端质量和 system prompt，在每个新工具和 eval 上线前进行审核。保持这个中心团队的精简有助于快速迭代，并降低大型组织中的协调成本。

如果你选择多 Agent 路线，请从最简单可行的模式开始（generator-verifier、orchestrator-subagent 或其他模式）。通过**按上下文划分：给每个 subagent 一项几乎不需要依赖系统其余部分的工作，并让它交回一个紧凑的结果**来有效分解边界（好的候选包括独立的研究路径、接口清晰且相互独立的组件，或黑盒验证）。当 Agent 按问题类型拆分时，它们会陷入“传话游戏”，信息来回传递，每次交接都会损失保真度。

![按问题拆分的 subagent](https://assets.claude.com/cd4b9c4417d5ba31776e8aa79e204966c08c6a43.png)

### 如何将 subagent 融入主 Agent 循环

许多团队已经在生产环境中拥有一个 orchestrator 和一组专家 Agent。以下是我们建议逐步演进到的单循环设计：

- 一个模型和一个 context window 运行开放式的工具循环，限制条件（轮次和成本预算、write gates）设置在 harness 中。
- 每一轮，模型发出一批 tool call。harness 并行运行它们，并将原始结果返回给同一个模型，由该模型决定下一步：再执行一批、向用户提问，还是给出答案。
- 当模型给出答案或触及[预算](https://platform.claude.com/docs/en/build-with-claude/task-budgets)时，循环停止。可以选择在答案之后运行 goal 或 verifier 检查。
- 模型在第一轮将计划写入上下文，并随结果的到来不断修订计划。这是与 orchestrator 加专家 Agent 架构的主要区别：编写计划的模型同时也是执行计划的模型，因此它可以在轮次中途更改计划。
- 上下文仍然会被加载，但由 Agent 自身管理：
  - 不再需要根据规则目录重写计划的代码步骤，因为模型会自行决定每一步。
  - 排序和领域流程移入 **skills**。
  - 硬性限制（validation、审批门控）以及对话中途出现的其他事项（例如 memory lookup）移入 **tools**。
  - 代码仍然可以用于加载那些开销小且几乎总是相关的内容（例如 entity resolution 步骤），以及在循环所调用的工具内部处理各种机械性部分（payload 构造、stream parsing、恢复澄清流程）。

这种单循环设计也有助于实现许多团队正在努力达成的最终形态(一个能理解用户高层目标并代表其行事的 Agent),因为它能让 Agent 学到的所有内容都保留在同一个上下文中。

以下建议说明了团队如何分阶段从 multi-agent 系统过渡到单一 Agent 循环，以及在此过程中多个团队如何持续为该 Agent 做出贡献。

#### 任务完成 evals

第一步是创建一个 eval set,帮助你判断是否应该将某个 subagent 合并进主 Agent 循环。我们验证过有效的 eval 结构是：由一个中央团队维护一套共享的端到端 eval set,同时每个 skill 由其所属团队附带更小的 eval set 一同发布。哪怕只有 10 个 golden example 也足以起步。

依据 rubric 对 Agent 的最终消息进行评分，是跟踪回答质量的一个良好起点。当你仍在使用 orchestrator 时，还应跟踪路由准确性(是否选择了正确的 subagent?)。一旦某个 subagent 被合并进来，则应改为检查 Agent 是否加载了正确的 skill 或调用了正确的 tool。随时间推移逐步建立任务完成 evals 很有帮助，因为在比较不同架构时，这一点最为重要。

在内部系统难以重放、用户交互难以模拟的环境中，这可能比较复杂。我们在内部行之有效的一种方法是为重要事件记录时间戳，以便日后可以重放这些事件，作为针对性的 evals 运行。

#### 逐步减少 subagents

向单一 Agent 循环演进的过程，涉及将 subagents 合并为 tools 和 skills。可以通过合并领域 subagents、将其作为 tools 调用，或用 skills 和 tools 加以替换来实现。

![合并 subagents](https://assets.claude.com/ed6bd97496ffdab88763806d9e14f1ec61ed9255.gif)

#### 合并领域 Agent

在首次合并之前，先构建一个小型端到端 eval。然后，**按共享上下文进行合并，从使用最频繁的 subagents 开始。**

[合并那些在彼此输出基础上串联、访问相同数据或经常被一起调用的 specialist](https://claude.com/resources/articles/building-multi-agent-systems-when-and-how-to-use-them)。例如，如果生产流量中有相当大的比例是先调用一个 specialist 再调用另一个，那么这就是一对紧耦合的组合，可考虑将其合并为一个领域 Agent。

#### 作为 tools 调用的 subagents

当满足上述三个条件之一且你决定保留某个 subagent 时，让主 Agent 将 subagent 作为 tools 来调用会比较有效，这样主 Agent 就能继续与用户保持对话。

只有在 subagent 需要直接与用户对话时，我们才建议采用完全交接(full handoff),即由 subagent 接管对话。其他所有情况都可以作为主循环中的 skill 加 tools 来处理。

这样你就能为 subagents 定义共享的 response schema,由主 Agent 根据真实数据验证结论，并精简最终综合步骤的输入。这是一个很好的第一步，因为你无需**重写** subagents。它还能在你决定将任何 subagent 合并进主 Agent 之前，为任务完成 eval 提供一个**基线**。

不过，某些 failure mode 仍会存在：

- 每个 specialist 都有自己的 prompt、context、负责团队和 evals
- 每次调用仍会返回一个有损(lossy)的摘要
- 每次调用都是一个嵌套的模型循环，会增加延迟

#### 通过 skills 和 tools 将 subagents 合并进主 Agent

将每个 subagent 的 prompts 转化为 skills、API 调用转化为 MCP tools,逐一将 subagents 合并进主 Agent。比较合并与不合并 subagent 时的 eval 表现，然后决定保留哪一个。

比较时，不要只看最终分数，还要看看哪些任务的结果发生了反转。当我们在一个示例支持 Agent 上测试时，将一个 subagent 合并进另一个降低了延迟，但也破坏了一个原本通过的流程：主 Agent 自己持有订单查询 tool 并直接回答，而没有向物流 specialist 询问交货日期。

每次更改之前，请确保你的 eval 中包含针对生产环境中每个会一起运行的 agent 链的任务，以及针对 agent 不能违反的每条规则的任务，并且每个任务要运行多次，因为像这样的违规只会在两次运行中的一次显现出来。

### 多个团队如何共同为一个单一 agent 做出贡献

领域推理可以从知识库、skills 和 MCP 工具中获取。各个团队可以将其所有权从 agent 转移到 skills 和工具上，由一个小型的中央团队保留 system prompt 和端到端质量的所有权。这包括在新的 skills、工具和 evals 上线之前对其进行审查。

#### MCP tools

当 agent 需要执行某个操作、从系统中读取实时数据，或以固定格式返回结果时，工具是合适的选择。在迁移过程中，你也可以使用工具作为继续调用 subagents 的方式。我们建议按用户意图对工具进行分组(而不是每个 API 一个工具)，因为一旦 system prompt 中的工具定义超过 30-50 个，工具选择往往会退化。

使用带延迟加载的 [tool search](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool),限制硬性前置条件，并将任何必要的条件移入工具中。例如，如果 Y 需要 X 的输出，Y 的工具会检查它并返回一条模型可以据此行动的指令。按用户的权限也是同样的工作方式。每个工具检查调用用户可以查看或执行什么操作，并返回模型可以读取的明确拒绝信息，这样一个 loop 就可以服务于具有不同访问权限的用户，而无需为每个权限级别设置单独的 agent。

#### Skills

当 agent 需要了解某个团队如何工作时，Skills 是合适的选择，比如以前由专业 subagent 的 prompt 所承载的步骤、规则和判断决策。

我们扩展 skill 库的方法是把维护工作交还给编写 skills 的人。Claude 可以承担繁重的工作，使用能够构建、测试和修剪其他 skills 的 skills。

为了防止 skill 无序蔓延，你可以让每个团队的 DRI 拥有自己的 skills,并确保它们精心打磨、边界清晰，并附带适当的 evals 一同发布。

- **/skill-creator** 允许你创建格式良好的新 skills,并审计现有 skills 以进行精简、去重和重构。
- **/skill-doctor** 允许你查看库中每个 skill 的成本及其实际使用频率，并删除冗余无用的部分。

#### 知识库

知识库适合存放 agent 只在部分时间才需要的参考资料。事实和参考资料(政策、指标定义、产品规格)可以放在模型调用的搜索或查询工具之后，或者作为 skill 内部的参考文件一同发布。避免让[代码检索并将这些上下文粘贴到 prompt 中](https://claude.com/resources/articles/seeing-like-an-agent)。

### 加速这项工作的工具

我们最近[发布了](https://code.claude.com/docs/en/commands)一组 Claude API skills,可以帮助完成上述大部分工作。我们的[迁移工具包](https://github.com/anthropics/single-agent-loop-kit)将这些 skills 串联到一个引导式工作流中，用于评估多 agent 系统并将其迁移到单一 agent loop。它包含一个演示，你可以在真实环境上运行之前先试用：

- **/claude-api build-eval:** 可以帮助创建由中央团队拥有的首个端到端 eval 集合，或每个团队随其 skill 一起发布的小型 evals
- **/claude-api prompt-audit:** 可以标记你的 prompts、skills 和工具描述中为旧模型编写的指令，并以 diff 形式提出修复建议。可以在你的 system prompts 上运行它，以找出任何为早期模型添加、如今正使 agent 变慢或更僵硬的规则。每个团队的 DRI 也可以在自己的 skills 和工具描述上运行它。
- **/claude-api hillclimb:** 可以针对现有的 eval 迭代改进应用。这可用于“合并与保留”的比较(将一个 subagent 合并为一个 skill 加工具后，让它对 skill 和工具描述进行迭代，看看合并后的版本是否达到或超过 subagent 的水平)，也可用于你的 system prompt。
- **/claude-api cost-optimize:** 分析你的调用花费在哪里，并从 prompt caching、削减不必要的输入和输出 token、effort 以及模型选择等选项中提出节省方案，每次只改一处。这有助于在给定设计下降低成本和延迟。

随着模型的演进，我们对如何最好地使用它们以及最佳实践指导的理解也在不断演进。这使得任何单一架构都不如其背后的原则重要：衡量、一次只改变一件事，并保留经得起考验的做法。

这正是其中一例。随着模型能力越来越强、Agent 的运行时间越来越长，你的更多 subagent 可以变成 skills 和 tools。不过，你不必一步到位。构建一个小型的端到端 eval,把一个 subagent 折叠进去，只有当折叠后的版本得分更差时才将其保留为 subagent,然后如此循环往复。

[文章2026年10月19日重新设计 Anthropic 的源代码管理随着合并到 Anthropic monorepo 的次数从每天约 2,500 次增长到超过 30,000 次，源代码管理成为最大的开发瓶颈。本文介绍了团队如何构建 Scion——一个为始终在线的 Agent 设计的内部版本控制系统——并在五个月内从 git 迁移出来。Claude Code(在新标签页中打开)](https://www.anthropic.com/engineering/redesigning-source-control)[文章2026年10月16日Anthropic 的一位日本 BDR 如何用 Claude Managed Agents 安排他的一天一位业务拓展代表如何用 Claude Managed Agents 和 Claude Tag 清空他的入站队列并起草双语客户邮件。Claude Managed Agents](https://claude.com/resources/articles/how-an-anthropic-japan-business-development-representative-runs-his-day)[文章2026年10月16日Claude Code 团队如何进行代码评审当 Agent 以这样的规模产出代码时，你该如何评审？Claude Code 团队分享了它的评审流程，从 Claude 验证自己的工作到按风险分级的人工审批，并提供了一份采用该流程的检查清单。Claude Code(在新标签页中打开)](https://claude.dev/blog/solving-code-review-at-anthropic/)[文章2026年10月13日Uber 的 CISO 谈如何为 AI 构建内部威胁防护计划Uber 的 CISO Philip Martin 谈对 AI Agent 进行监控和可观测性的重要性，以及 Uber 的开源工具如何与 Enterprise Frontier Safeguards 协同工作。](https://claude.com/resources/articles/uber-s-ciso-on-building-an-insider-threat-program-for-ai)

### 用 Claude 转变你的组织运作方式
[查看定价](https://claude.com/pricing#api)[联系销售](https://claude.com/contact-sales)

#### 订阅开发者通讯

产品更新、使用指南、社区聚焦等更多内容。每月发送到你的收件箱。

如果你想接收我们的每月开发者通讯，请提供你的电子邮箱地址。你可以随时取消订阅。
