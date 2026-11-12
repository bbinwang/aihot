---
title: "Fable 5.2 提示指南：赋予代码所有权提升重构率"
date: 2026-11-10T00:00:00.000Z
tags: ["AI 实操", "Anthropic", "Claude Fable 5.2", "提示词", "Agent", "effort", "聚合"]
summary: "Fable 5.2 很听话：提示词里写明的规则，它都照字面执行，连你早忘了的旧规矩也照办。官方这份指南列了十种常见毛病，告诉你该加哪几句、删哪些旧句子，提示词可以直接复制。"
---
> **原文链接**: [https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-2](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-2)
> **来源**: platform.claude.com
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/claude-fable-5-2-prompting-guide/) · 2026/11/10
> **说明**: 本文由 AIHot汪 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

本指南介绍 Claude Fable 5.2 特有的提示模式(prompting patterns)。关于该模型的能力和 API 变更，请参阅 [Claude Fable 5.2 新增内容](https://platform.claude.com/docs/en/models/fable-5-2/whats-new-fable-5-2)。关于适用于当前所有 Claude 模型的技巧，请参阅[提示最佳实践](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)。

Claude Fable 5.2 在若干方面与早期模型的行为不同。请从与你观察到的现象相符的章节入手：

* 不确定该用哪个 effort 等级，或者简单请求耗时过长：[校准 effort](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-2#calibrate-effort)
* turn 在工作完成前就结束了：[完成整个任务](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-2#finish-the-whole-task)
* 在 agent 工作时你需要逐步批准，或者你的 system prompt 中包含批准规则：[批准](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-2#approvals)
* 编码 agent 重复实现已有代码而非合并，或报告了邻近的问题却不予修复：[说明代码归谁所有](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-2#say-who-owns-the-code)
* 长时间 agentic turn 看起来毫无动静：[在长 turn 期间让用户保持知情](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-2#keep-users-informed-during-long-turns)
* Agent 会话启动的 subagent 数量超过任务所需：[为 subagent 设定期望](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-2#set-expectations-for-subagents)
* Agent 请求不必要的批准，或迟迟不执行例行工作：[避免谨慎层层累积](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-2#keep-caution-from-piling-up)
* 你沿用了为 Claude Fable 5.1 或 Claude Opus 5.5 编写的 system prompt、skills 或 harness:[复查为早期模型编写的指令](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-2#review-instructions-written-for-earlier-models)
* 你的用户会在长任务结束后阅读最终报告或交接内容：[让报告易于阅读](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-2#make-reports-easy-to-follow)
* 请求返回 `stop_reason: "refusal"`:[应对 safeguard 拒绝](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-2#safeguard-refusals)

<Note>
  关于从早期模型迁移时的 API 变更，请参阅 [Claude Fable 5.2 与 Claude Mythos 5.2 迁移指南](https://platform.claude.com/docs/en/models/fable-5-2/migration-guide)。关于迁移时应用这些指导的先后顺序，请参阅[从哪里开始](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-2#where-to-start)。

  本页多个章节建议向你的 system prompt 添加文本、从中或从你的 agent 携带的说明与规则中删除某些行，或修改 tool description。这些更改请只在新会话中进行。在 Claude Fable 5.2 上，API 会对每个账户强制执行 [prefix check](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#prefix-check)。如果在 `system`、`tools` 或较早的消息发生更改后仍把 thinking blocks 发回，请求可能返回 400 错误，因此在恢复已存储的会话时加入新文本可能导致失败。若要在会话中途更改指令，请[将其放入最新的 turn](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#changing-context)。在支持 [mid-conversation system messages](https://platform.claude.com/docs/en/build-with-claude/mid-conversation-system-messages) 的地方，你可以改为[向会话追加一条 system message](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#new-instructions)。
</Note>

### 校准 effort

从 `high` 开始，这是 Claude API 的默认值。如果你的使用场景需要，可以上调或下调 effort,并用你自己的 evals 测试每一次改动。[effort](https://platform.claude.com/docs/en/build-with-claude/effort) 级别决定了 Claude Fable 5.2 思考的深度、一个 turn 的耗时以及使用的 token 数量。请在调整 prompt 的同时调整 effort,因为该级别还会改变模型的思考方式以及 tool call 的次数。

总体而言，effort 级别在各 Claude 模型中的排序是一致的，但每个级别背后的思考量因模型而异。因此请重新跑一遍 effort sweep,而不是直接沿用你在 Claude Fable 5.1 或 Claude Opus 5.5 上调好的设置。

根据工作类型选择级别：

* `low` 适合快速来回交互、需求明确的任务，以及大批量工作负载，例如快速、智能的 subagent。在 Anthropic 的测试中，模型在 `low` 级别的得分接近 Claude Fable 5.1 在更高 effort 级别的得分。
* `medium` 适合交互式编码、聊天和日常知识工作。
* `high` 适合高难度编码、研究、agentic 工作和长时间无人值守的运行。turn 完成所需的时间明显长于 `medium`。
* `xhigh` 适用于你最困难的长时编码和 agentic 工作，前提是你已经实测到了收益。在 Anthropic 的内部编码评估中，它略微提高了得分，但消耗了多得多的 token。
* `max` 用于测量模型的能力上限，或用于时间和 token 都无关紧要的罕见任务。它最适合开放式问题，例如科学发现和数学。turn 很慢，消耗的 token 也远多于 `xhigh`。

能力提升的大部分在 `high` 级别就已具备。从 `medium` 升到 `high` 提高了 Anthropic 追踪的大多数编码和知识工作评估的得分。但这一步也会消耗更多 token 和更多时间，因此只要你的 evals 表明质量仍然保持，就可以下调到 `medium`。在 `high` 之上，收益并不均匀，取决于具体任务。

选择级别时，请注意三种行为：

* 在较低的 effort 级别，模型更可能提前停止。对于 `low` 或 `medium` 级别的 agentic 工作，请添加[完成整个任务](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-2#finish-the-whole-task)一节中的文本。
* 在 `high` 及以上级别，模型在几乎每次回复前都会思考，包括对问候语的回复。如果简单请求耗时过长或成本过高，可以在这些 turn 使用更低的 effort 级别。在 Anthropic 的测试中，要求直接回答、不加思索的指令并不能阻止模型在 `medium` 及以上级别思考。
* effort 几乎不会改变模型回复的长度。要改变回复的长度和语气，请使用你的 prompt。

你也可以在同一 workflow 中混合使用不同级别。例如，你可以在 `medium` 级别与模型一起规划和迭代，然后在长时间无人值守的部分调高 effort。要在对话中途更改级别并保留 prompt cache,请使用[按消息更改 effort](https://platform.claude.com/docs/en/build-with-claude/effort#change-effort-mid-conversation-beta)(beta,`mid-conversation-output-config-2026-07-01` header);该小节列出了此功能可用的平台。一次更改会一直生效，直到被另一次更改取代。在按消息更改 effort 不可用的地方，可以在下一个请求上设置新的顶层 `effort` 值，这会使缓存重新开始。

### 完成整个任务

在长且多步骤的任务中，Claude Fable 5.2 有时会在工作完成前结束一个 turn。该 turn 会以剩余事项清单、继续的提议，或在超时等普通障碍处的停止而告终。这种情况在 `low` 和 `medium` effort 下更常出现。

如果你在你的 Agent 中看到这类停止，请在 system prompt 中添加类似这样的文本：

```text wrap
## Finishing work
Please avoid stopping while you still owe work the user asked for. Be persistent and do not stop unless needed.

While status notes are welcome, as is clarifying with the user on open decisions, carry on with work that does not depend on the user's answer without unnecessary stops.

If you notice yourself inviting the user to redirect you or offering to wait, instead proceed on the next part of the task. You may meet ordinary obstacles like errors, timeouts, locked files, empty results or failing tools. Diagnose them first, and when they are not real blockers, work through them with the access you have (wait and retry, fix the request, use another tool or source) rather than stopping unnecessarily.

If someone clearly decided something is a hard blocker, such as a file marked not to be touched, access that was intentionally withheld, or a safety guardrail, leave it alone, say plainly what you found, and look for another safe way to finish the task. Stopping before the task is complete is very rarely merited, as in when the task can't move forward without user input, or where the blocker is deliberate and should not be worked past. This does not override the need for confirmation on risky or destructive actions.
```

这段文本区分了两种类型的障碍。它指示模型诊断并处理普通障碍，例如错误、超时和失败的工具。它指示模型不要触碰故意设置的障碍（例如标记为不可修改的文件），并向用户报告这些障碍。将这段文本作为起点，并在将其适配到你的应用时保持这种区分。

Anthropic 在 `medium` 级别的努力下重放了来自一个代理式编码产品的记录会话。使用这段文本后，以遗留可执行工作结束会话的数量减少了一半。这段文本消除了大多数请求许可或提供继续服务的结尾，但保留了列出剩余工作后停止的结尾。输出 token 增加了约 30%。

由于使用这段文本时模型提问的频率降低，请为你的高风险或不可逆操作保留自己的确认步骤。

#### 审批

当你指示模型继续进行时，明确说明你希望它做什么，而不是发送一个孤零零的“继续”。例如，回复“是的，在暂存数据库上运行迁移”，而不是发送“go”或竖起大拇指。

如果你的系统提示词包含审批规则，请明确指出它们涵盖的具体操作，因为模型会按字面意思应用这些规则。在 Anthropic 针对无人审批的模拟任务进行的测试中，有一条规则将“向本对话之外的人员发送消息”列为需要审批的步骤。有了这条规则，模型抑制了大约一半的日常请求，不再向同事和其他团队发送。

### 明确代码的所有权

Claude Fable 5.2 对提示词中关于代码所有权的描述反应非常敏感。在 Anthropic 针对小型编码任务的测试中，当提示词未提及所有权或将代码库呈现为他人的所有物时，模型倾向于在现有结构上进行添加，即使这意味着重复现有代码。它还倾向于报告附近的问题而不是修复它们。当提示词说明代码库属于模型时，模型通常会合并重复代码并进行相关修复，而无需额外指示。

如果你希望模型在工作的同时改进代码结构，请说明代码是它的：

```text wrap
This codebase is yours: what it's for and how it's built are your call, and you'll keep building on it.
```

在 Anthropic 针对小型编码任务的测试中，使用这句话时，模型在约一半的尝试中合并了重复代码；不使用这句话时，这一比例不到十分之一。该比率因任务而异。当这句话位于长系统提示词内部时，结果依然成立。无论是否使用这句话，请求的功能在几乎每次尝试中都成功实现。

在相同的测试中，使用这句话时，模型的输出 token 数量约为原来的 1.5 倍，并进行了多项未经请求的更改，其中许多是新测试和文档。除了修复 bug 外，在每六到十次尝试中，有一次它会改变现有功能的行为方式，且在较高努力级别下更为频繁。其总结部分列出了较大的更改，但通常遗漏了较小的更改，因此请审查 diff 而不仅仅是总结。

如果用户拥有代码并希望尽可能少地更改它，请省略所有权句子。提示词中其他地方限制范围的规则并不能抵消所有权句子的作用。在 Anthropic 的测试中，即使在同一提示词的较早部分有“禁止随意重构、重命名或清理”的规则，模型在约三分之一的尝试中仍然合并了重复代码。

### 在长时间运行期间保持用户知情

Claude Fable 5.2 有时在长时间的工具调用过程中会生成很少的用户可见文本。模型也可能在未说明即将做什么的情况下发起第一次工具调用。

首先，检查你的客户端是否接收到了模型的更新。在 Claude Fable 5.2 上，模型在工具调用之间编写的更新作为 [progress-update `thinking` blocks](https://platform.claude.com/docs/en/build-with-claude/thinking#progress-updates) 返回。这些更新说明了模型发现了什么以及接下来要做什么。在默认的 `thinking.display` 为 `"omitted"` 时，它们的文本为空。因此，仅渲染 `text` 块的客户端在长时间的代理式交互过程中可能看起来处于静默状态。设置 `display: "updates"`（beta 版，需使用 `thinking-display-updates-2026-08-18` 头部）以接收每个更新的简短摘要，或设置为 `"summarized"` 以接收带有总结性推理的更新。然后渲染工具调用之间非空的 `thinking` blocks。

当用户实时观看工作过程时(例如交互式编码),频繁的进度更新最为重要。如果你的用户在观看工作过程,但收到的更新仍然太少,请使用以下一项或多项选项。

如果你可以修改 harness,一个有效的选项是让它统计那些不给用户提供任何可读内容的连续 tool-calling 步骤:既没有 `text` 块,也没有带文字的 `thinking` 块。统计时将 `display` 设置为 `"updates"` 或 `"summarized"`,因为在 `"omitted"` 模式下每个 `thinking` 块都是空的。此选项适用于你的平台支持 [mid-conversation system messages](https://platform.claude.com/docs/en/build-with-claude/mid-conversation-system-messages) 的场景。当这类步骤连续出现数次后,让 harness 在最新的 tool results 之后追加这条提醒,作为一条 [turn-scoped system message](https://platform.claude.com/docs/en/build-with-claude/mid-conversation-system-messages#turn-scoped-system-messages)(`clear_at: "next_user_message"`, beta, `mid-conversation-system-clear-at-2026-08-21` header):

```text wrap
The user hasn't heard from you in a while: say in a few words what you're doing, then continue.
```

在 Anthropic 针对多轮编码任务的测试中,这条提醒大致将最长静默时段缩短了一半,且 token 和时间均没有明显增加。

在后续请求中,请将每条提醒保留在 `messages` 中。删除或改写某条提醒会修改较早的轮次,导致其后的 thinking blocks 失效。参见[将每轮提醒作为 turn-scoped system messages 发送](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#per-turn-reminders)。

如果还想让模型在第一次 tool call 之前给出开场说明、过程中提供简要更新、并在结束时给出总结,请在你的 system prompt 中加入这段文字:

```text wrap
Before you start, say in a line what you're about to do; brief updates while you work help the user follow along. Close with a short recap that stands on its own (what you found, what you did, and what's next), so a reader who only sees the last message has the full picture.
```

在 Anthropic 针对编码任务的测试中,加入这段文字后,模型在每次任务中都会在第一次 tool call 之前先行说明。这段文字还使每个任务的 output tokens 增加了约 20%。请在有人直接参与(human in the loop)的场景中使用这段文字。要获得最多的更新,可将其与 harness 追加的提醒搭配使用。

如果你无法修改 harness,或者你的平台不支持 mid-conversation system messages,请在你的 system prompt 中加入这句话:

```text wrap
Every few tool calls, give the user a one-line update on where things stand.
```

在 Anthropic 针对工作流自动化任务的测试中,这句话消除了大多数较长的静默时段。

即使同时使用提醒、开场说明和结尾总结文字,也要预期两次更新之间仍会出现连续多次 tool call 的情况。Claude Fable 5.2 在长时间运行的异步任务上表现良好:在这类任务中,用户回来查看结果,而不是观看每一步。在这类场景下,更新之间的间隔不那么重要。

### 为 subagents 设定预期

Claude Fable 5.2 将多少工作委派给 subagents,取决于你的 harness 和任务。在 Anthropic 针对短任务、并使用一个用于启动 subagents 的极简 tool 的测试中,它很少启动 subagent。而在一个 prompt 鼓励委派的 agentic 编码产品中,它会积极进行委派。

如果你的 system prompt、skills 或 agent files 指示模型进行委派,请首先检查这些内容。仅当 Claude Fable 5.2 仍会启动超出任务所需的 subagents 时,才修改启动 subagents 的 tool 的 description。如果该 tool 的 description 很简单,而且你的 prompt 中没有其他地方要求委派,那么你很可能不需要新的 description。

在新的 description 中,应说明 subagent 会给会话增加哪些成本,说明何时值得委派、何时不值得,并告诉模型如何为它启动的 subagent 做任务简报。Anthropic 测试的 description 做到了这三点,并把成本放在首位。当你的 harness 已经鼓励委派,且 subagents 占你 token 用量的很大比例时,这类 description 最为有用。

在 Anthropic 针对短任务的测试中,与一条主要罗列委派理由的描述相比,模型在被测描述下进行委派的频率降低了约三分之一。任务成功率相同。

在被测描述中,开头关于成本的句子抑制了委派行为。如果模型委派得太少,就少谈成本。如果它仍然委派得太多,就多谈谈 subagent 在你的 harness 中会花费多少,并测试这一改动。

Anthropic 还观察到,在较高的 effort 级别(如 `xhigh` 和 `max`)下,Claude Fable 5.2 会在一个 agentic 编码产品中使用 subagent 来审查自己的工作。在相同的任务上,Claude Fable 5.1 并未这样做。早期测试者让 Claude Fable 5.2 担任其他模型的规划者和编排者,取得了良好效果。委派可以加速适合并行执行的工作。不过,subagent 可能占一个会话成本的很大一部分,因此请检查你的 harness 默认用哪个模型运行 subagent。

### 防止谨慎不断累积

凡是上下文会延续的地方——记忆、笔记、指令文件以及 agent 之间的消息——谨慎的指令都会累积。Claude Fable 5.2 会严格遵循这些指令,因此它可能请求并不需要的批准,或者搁置常规工作。少数早期测试者观察到了这种行为,主要出现在多个 agent 协作的场合。更早的模型也会遵循这类指令,但在本文所述的一种设置中,只有 Claude Fable 5.2 搁置了工作。

如果你看到这种行为,请清理你的 agent 所携带的内容:

* **删除不再需要的笔记。** 在 Anthropic 针对模拟任务的测试中,来自此前会话的十几条笔记中有一条写着绝不重试。当这些笔记位于上下文中、且 prompt 中没有任何允许重试的内容时,模型在工具被占用后进行重试的比例约为十分之四,而没有这些笔记时几乎全部都会重试。
* **明确列出无需批准的步骤。** 在 Anthropic 针对模拟任务的测试中,上下文包含"绝不"规则、笔记以及一位审查者的条件。在规则末尾加一行,把重试列入无需批准的步骤,使重试比例从几乎为零提升到约一半。在相同设置下,一条让模型更自由行动的一般性指令没有任何效果。仅对可安全重复的调用列出重试。
* **检查审查类 agent 附加的内容。** 在 Anthropic 针对模拟任务的测试中,一种设置在 prompt 中有一行把重试列入无需批准的步骤,同时上下文中还有审查者的"遇到第一个错误就停止"。Claude Fable 5.2 在约三分之一的尝试中没有重试。Claude Fable 5.1 和 Claude Opus 5.5 则进行了重试。
* **把例外写进规则本身。** 在 Anthropic 针对模拟任务的测试中,负责人已经批准了某个步骤。在一条"绝不"规则下,模型在约十分之一的尝试中执行了该步骤。另加一行说明已批准的步骤可直接进行,并未明显改变该比例。当规则本身写明需先获得批准时,模型在约十分之九的尝试中执行了该步骤。参见[批准](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-2#approvals)。

对于有风险或不可逆的操作,仍要保留你自己的确认环节。

### 审视为更早模型编写的指令

迁移到 Claude Fable 5.2 时,请审查你的 prompt。在 Anthropic 的测试中,一些为更早模型编写的指令提高了成本、产生了副作用,或不再起作用。请重新审视这些指令:

* **长期存在的委派指令:** 推动工作交给 subagent 的语句可能位于 system prompt、skills 和 agent 文件中。迁移前请先阅读这些文件。如果在你的测试中,模型启动的 subagent 多于任务所需,请删除不再需要的语句。参见[为 subagent 设定预期](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-2#set-expectations-for-subagents)。
* **你的 harness 写入 prompt 的 token 预算:** 一些 harness 会在 prompt 中告诉模型任务可用多少 token、还剩多少。该预算的大小会影响 Claude Fable 5.2 的花费。在 Anthropic 针对 `high` 和 `xhigh` effort 级别编码任务的测试中,移除较大的预算降低了成本,且性能相当。请在没有该预算的情况下测试你的任务。这一发现针对的是 prompt 中的文本,而非 API 的[任务预算](https://platform.claude.com/docs/en/build-with-claude/task-budgets)——后者是一项 beta 功能,测试未覆盖。

* **修改早前轮次的 harness 代码：** Claude Fable 5.2 使用 [preserved thinking](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking)。如果你的 harness 在请求之间更改了 system prompt、工具或早前的某条消息，那么历史中位于该更改点之后的 thinking 块会失效。默认情况下，Messages API 会拒绝该请求，而 Message Batches API 会丢弃这些块。要在不触发此错误的情况下缩短历史，请使用 [context editing](https://platform.claude.com/docs/en/build-with-claude/context-editing)，或使用摘要之后不保留任何早前轮次的 [compaction](https://platform.claude.com/docs/en/build-with-claude/compaction)。要让 Messages API 也丢弃这些块，请将 `thinking.block_binding.prefix_mismatch_behavior` 设置为 `"drop_block"`(beta,需 `thinking-binding-controls-2026-08-01` header)。在 Anthropic 的测试中，当每一轮的早前 thinking 都被丢弃时，模型会重新思考并消耗更多 output token。这是最坏的情况，增幅取决于你的 harness 修改早前轮次的频率。除 compaction 和 context editing 之外，请保持历史记录为 append-only。这能保持较高的缓存命中率，且不会有任何 thinking 被丢弃。在依赖 `"drop_block"` 之前，请先在自己的任务上测量 output token。参见 [API 如何处理失效的块](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#mismatch-behavior) 和 [在不编辑前缀的情况下进行修改](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#replace-prefix-edits)。
* **“把那个回答视为已完成”的语句：** [Prompting Claude Opus 5.5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5-5#thinking-instructions-in-chat-system-prompts) 为聊天 system prompt 提供了两句话。它们告诉模型把早前的回答视为已完成，并将思考集中在新的消息上。在 Anthropic 以 `high` effort 进行的测试中，这些句子减少了 Claude Fable 5.2 在后续问题上的思考，但模型指出自己早前回答中错误的可能性也大幅降低。在你希望模型持续重新审视其早前回答的场景中，请省略这些语句。在其他场景中，采用这些语句前，请先测试模型是否仍会指出自己的错误。
* **要求少思考的指令：** Claude Fable 5.1 通常会遵循诸如“直接回答，无需斟酌”这样的语句。在 Anthropic 的测试中，这样的语句无法阻止 Claude Fable 5.2 在 `medium` 及更高的 effort 下进行思考。请移除这些语句并降低 effort 级别，如 [校准 effort](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-2#calibrate-effort) 所述。
* **写作风格规则：** Claude Fable 5.2 会严格遵守风格规则，因此诸如“每句只含一条指令，且不超过 20 个词”这样的硬性限制可能使其行文支离破碎。在添加 [让报告易于理解](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-2#make-reports-easy-to-follow) 中的文本之前，请先移除你不再需要的规则。
* **日积月累的规则、笔记和记忆：** 记忆文件、笔记和指令文件会随时间累积各种告诫，其中一些可能是模型自己写下的。迁移之前，请删除理由已不再成立的告诫，并重写绝对化的规则，使其说明适用范围和理由。如果某个系统已经陷入僵化，可以考虑在精简其记忆和笔记后重启它，并保留原始内容的副本。参见 [避免告诫越积越多](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-2#keep-caution-from-piling-up)。

### 让报告易于理解

在长时间的 agentic 工作之后，阅读 Claude Fable 5.2 最终报告的人通常没有见过其背后的 tool call 或文件。报告需要做到不依赖上下文也能让人读懂。

如果你要求 Claude Fable 5.2 撰写最终报告或交接文档，请将以下文本添加到你的 system prompt 中，并根据你的读者和产品进行调整：

```text wrap
## 清晰沟通
面向聪明但缺乏上下文的读者写作。阅读者没有看到你的 tool calls、你的推理过程或你打开的文件,而且可能是从其他工作切换过来的。消息通常应当自成一体:读者无需挖掘其他上下文就能理解你的意思。把要点放在最前面的几句话中。在句子顺序上实践 progressive disclosure,不要在第 1 行使用直到读者读到第 12 行才能明白的未定义引用和概念。

使用平实的词语,用清晰、易懂的完整句子写作。不要使用你在工作过程中自造的术语或缩写。用任何读者都能理解的方式说明事物是什么。写作大体遵循 ASD-STE100 Simplified Technical English 的风格:句子简短,每句一个观点,使用主动语态,并对同一事物始终使用同一个词。在观点相互关联的地方使用连贯成段的散文,列表符号仅用于罗列相互独立的事项。除非读者提问,否则省去不必要的细节并保持简洁,但务必确保消息包含关键上下文。力求让你面向用户的文本尽可能易读、清晰。
```

在 Anthropic 针对 agentic 任务的测试中,这段文本使最终报告的密度降低,分号使用减少。在 workflow automation 任务中,它还使句子变得更短。你也可以添加关于篇幅的指令,或要求模型包含特定细节。

### 安全防护拒答

Claude Fable 5.2 运行可拒绝请求的安全分类器。被拒绝的请求会返回 `stop_reason: "refusal"`,而 `stop_details.category` 会指明[拒答类别](https://platform.claude.com/docs/en/build-with-claude/refusals-and-fallback#refusal-response):

* `cyber`:该请求可能促成网络危害,例如恶意软件或 exploit 开发。
* `bio`:该请求可能促成生物危害,例如危险的实验室方法。
* `frontier_llm`:该请求可能有助于竞争性 AI 模型的开发。
* `reasoning_extraction`:该请求要求模型在响应文本中复现其内部推理。
* `general_harms`:该请求属于其他使用政策范畴。

良性的网络安全和生命科学工作也可能触发 `cyber` 和 `bio` 分类器。如果它们阻碍了你所在组织的合法工作,请参阅 Anthropic 的 [Cyber Verification Program](https://support.claude.com/en/articles/14604842) 和 [Life Sciences Verification Program](https://www.anthropic.com/news/life-sciences-verification-program)。[Claude Mythos 5.2](https://platform.claude.com/docs/en/models/mythos-5-2/overview) 仅向通过这些计划认证的组织提供与 Claude Fable 5.2 相同的能力。

如果你的 prompts、skills 或工具描述要求模型在响应中写出其推理过程,请删除这些指令。要查看模型的推理方式,请设置 `display: "summarized"` 并读取 thinking blocks。参见[将推理保留在 thinking blocks 中](https://platform.claude.com/docs/en/build-with-claude/refusals-and-fallback#keep-reasoning-in-thinking-blocks)。

要在其他模型上重试被拒绝的请求,请参阅 [Refusals, fallback, and billing](https://platform.claude.com/docs/en/models/fable-5-2/whats-new-fable-5-2#refusals-fallback-and-billing)。

### 从哪里开始

迁移时,请按顺序完成以下步骤:

1. 将 `effort` 显式设置为 `high`,然后在 `medium` 和 `xhigh` 下同样运行你的 evals。
2. 通读你带入的 system prompts、skills、agent 文件、memory 文件、notes 和 harness 文本。删除或测试[Review instructions written for earlier models](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-2#review-instructions-written-for-earlier-models) 中列出的指令。
3. 运行你耗时最长的 agentic 任务。记录模型在哪些地方提前停止、请求了并不需要的批准、陷入沉默、委托的程度超出任务所需,或者在你希望重构现有代码时却在原代码上追加内容。
4. 针对你观察到的每种行为逐一应用相应的指导,并在你自己的任务上衡量其效果和 token 成本。
