---
title: "Claude Haiku 5.5 迁移指南：旧请求为什么报错，现有代码应该怎样改？"
date: 2026-10-09T00:00:00.000Z
tags: ["AI 实操", "Claude", "Haiku", "API", "迁移指南", "聚合"]
summary: "从 Haiku 4.5 或更早版本升级：对照请求改写、思考块解析、电脑操作工具集与会话回放规则，附升级核对清单。"
---
> **原文链接**: [https://platform.claude.com/docs/en/models/haiku-5-5/migration-guide](https://platform.claude.com/docs/en/models/haiku-5-5/migration-guide)
> **来源**: Anthropic
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/claude-haiku-5-5-migration-guide/) · 2026/10/9
> **说明**: 本文由 AIHot 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

<Note>
  本指南涵盖迁移 [Messages API](https://platform.claude.com/docs/en/build-with-claude/working-with-messages) 代码。如果您使用 [Claude Managed Agents](https://platform.claude.com/docs/en/managed-agents/overview)，则除了更新模型名称外，无需进行其他更改。
</Note>

<Tip>
  **使用 Claude API skill 自动化您的迁移过程。** 在 Claude Code 中，运行 `/claude-api migrate` 以调用内置的 [Claude API skill](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/claude-api-skill#migrating-to-a-newer-claude-model)。它支持将任何当前的 Claude 模型作为目标：

  ```text wrap
  /claude-api migrate this project to claude-haiku-5-5
  ```

  该 skill 会在您的代码库中执行模型 ID 替换，并根据需要应用破坏性参数更改、prefill 替换以及针对目标模型的 effort 校准。随后，它会生成一份需要手动验证的项目清单。在编辑任何文件之前，该 skill 会要求您确认迁移范围（整个工作目录、子目录或特定文件列表）。该 skill 还会检测 Amazon Bedrock 和 AWS 上的 Claude Platform 客户端，并针对这些平台调整模型 ID 格式和功能更改。
</Tip>

本指南涵盖将调用 Claude Haiku 4.5 的代码迁移至 Claude Haiku 5.5。对于调用 Claude Haiku 3.5 或 Claude Haiku 3 的代码，还需在 [从 Claude Haiku 3.5 及更早的 Haiku 模型迁移到 Claude Haiku 5.5](https://platform.claude.com/docs/en/models/haiku-5-5/migration-guide#migrating-from-haiku-35) 中进行相应更改。若要升级至 Sonnet 或 Opus 模型，请参阅 [模型版本间升级](https://platform.claude.com/docs/en/about-claude/models/migration-guide)。有关 Claude Haiku 4.5 的可用期限，请参阅 [模型弃用](https://platform.claude.com/docs/en/about-claude/model-deprecations)。

### 按起始模型划分的迁移清单

按顺序处理各组，并在找到包含您当前模型的那一组后停止。如果您使用的是 Claude Haiku 4.5，则第一组即为整个列表。每项对应代码中需要执行的一项更改。

#### 所有起始模型通用

1. 将模型 ID 替换为您平台对应的 Claude Haiku 5.5 ID。请参阅 [使用 Claude Haiku 5.5 模型 ID](https://platform.claude.com/docs/en/models/haiku-5-5/migration-guide#use-the-claude-haiku-5-5-model-id)。
2. 重新计算您的 prompts，并重新审视 `max_tokens` 限制和成本估算，因为相同的文本会占用更多的 token，且大图像会占用更多的 visual tokens。请参阅 [重新计算 token](https://platform.claude.com/docs/en/models/haiku-5-5/migration-guide#recount-tokens)。
3. 如果您的请求发送了 `thinking: {"type": "enabled", "budget_tokens": N}`，请将 `thinking` 更改为 `{"type": "adaptive"}`。请参阅 [配置 thinking](https://platform.claude.com/docs/en/models/haiku-5-5/migration-guide#configure-thinking)。
4. 如果您的代码将第一个 content block 视为答案，请改为按 `type` 选择 blocks。请参阅 [配置 thinking](https://platform.claude.com/docs/en/models/haiku-5-5/migration-guide#configure-thinking)。
5. 从您的请求中移除 `temperature`、`top_p` 和 `top_k`。请参阅 [移除采样参数](https://platform.claude.com/docs/en/models/haiku-5-5/migration-guide#remove-sampling-parameters)。
6. 如果您的请求在 `messages` 末尾使用 assistant turn 让模型继续生成，请改为在末尾使用 user turn。请参阅 [替换 assistant prefill](https://platform.claude.com/docs/en/models/haiku-5-5/migration-guide#replace-assistant-prefill)。
7. 如果您使用 computer use，请将 Claude API 和 Google Cloud 上的 `computer_20250124` 替换为 `computer_toolset_20260801` toolset；在 Amazon Bedrock 上，请替换为 `computer_20251124` 和 `computer-use-2025-11-24` beta header。请参阅 [将 computer use 迁移至 toolset](https://platform.claude.com/docs/en/models/haiku-5-5/migration-guide#computer-use-toolset)。
8. 如果您通过不同的账户重放存储的对话，请通过生成该对话的原始账户重放每一个对话。请参阅 [通过生成账户重放 thinking blocks](https://platform.claude.com/docs/en/models/haiku-5-5/migration-guide#replay-thinking-blocks-through-the-producing-account)。
9. 如果您的代码在对话的请求之间更改了 `system`、`tools` 或早期的 `messages` 并返回 thinking blocks，请保持对话仅追加（append-only）。请参阅 [保持早期轮次不变](https://platform.claude.com/docs/en/models/haiku-5-5/migration-guide#keep-earlier-turns-unchanged)。
10. 处理 `stop_reason: "refusal"`。Claude Haiku 5.5 运行安全分类器，可能会拒绝请求，且没有服务端回退机制。请参阅 [防护拒绝响应](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-haiku-5-5#safeguard-refusals)。
11. 如果您在 Amazon Bedrock 上使用 [structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs)（`output_config.format` 或 `strict: true` tools），请在 prompt 中描述格式或使用不带 `strict` 的 tool，并在代码中验证输出。Claude Haiku 5.5 在 Amazon Bedrock 上不支持 structured outputs。

如果您的组织在 Claude Haiku 4.5 上有 [优先级层级](https://platform.claude.com/docs/en/api/service-tiers#supported-models) 承诺，请单独规划容量：Claude Haiku 5.5 不支持优先级层级。

#### Claude Haiku 3.5 或更早版本

1. 将 Claude Haiku 3.5 或 Claude Haiku 3 的模型 ID 替换为您平台的 Claude Haiku 5.5 ID。请参阅 [从 Claude Haiku 3.5 及更早的 Haiku 模型迁移到 Claude Haiku 5.5](https://platform.claude.com/docs/en/models/haiku-5-5/migration-guide#migrating-from-haiku-35)。
2. 如果您使用旧的 `code_execution_20250522` 工具，请迁移到 `code_execution_20250825` 或更高版本。
3. 如果您使用文本编辑器工具，请迁移到 `text_editor_20250728`。
4. 处理 `refusal` 和 `model_context_window_exceeded` 停止原因。
5. 如果您的代码完全匹配工具调用字符串参数，请允许存在尾部换行符。
6. 审查您的提示词。

### 使用 Claude Haiku 5.5 模型 ID

将 Claude Haiku 4.5 模型 ID 替换为您平台的 Claude Haiku 5.5 ID。

| 平台               | Claude Haiku 4.5                                  | Claude Haiku 5.5             |
| ------------------ | ------------------------------------------------- | ---------------------------- |
| Claude API         | `claude-haiku-4-5-20251001` 或 `claude-haiku-4-5` | `claude-haiku-5-5`           |
| Amazon Bedrock     | `anthropic.claude-haiku-4-5`                      | `anthropic.claude-haiku-5-5` |
| AWS 上的 Claude 平台 | `claude-haiku-4-5`                                | `claude-haiku-5-5`           |
| Google Cloud       | `claude-haiku-4-5@20251001`                       | `claude-haiku-5-5`           |
| Microsoft Foundry  | `claude-haiku-4-5`                                | `claude-haiku-5-5`           |

`claude-haiku-5-5` 是一个固定的模型 ID，没有日期后缀，也没有单独的别名。

### 重新计算 token

Claude Haiku 5.5 使用与 Claude 4.7 及更高版本相同的较新分词器。与所有使用该分词器的模型一样，在 Claude Haiku 5.5 上，相同的输入文本产生的 token 数量比在 Claude Haiku 4.5 上多约 30%。确切的增长量取决于内容。请求、响应和流式事件的结构保持不变。发生变化的是您以 token 为单位测量或预算的任何内容：

* 对于相同的文本，`usage` 字段和 [token 计数](https://platform.claude.com/docs/en/build-with-claude/token-counting) 结果更高。
* 给定数量的 token 包含的文本更少。
* 为 Claude Haiku 4.5 调优的 `max_tokens` 限制可能会截断等效的输出。
* 基于 Claude Haiku 4.5 的 token 计数做出的成本估算需要使用 Claude Haiku 5.5 的计数和 [价格](https://platform.claude.com/docs/en/about-claude/pricing) 重新计算，包括其对长提示词更高的价格。请参阅 [长上下文定价](https://platform.claude.com/docs/en/about-claude/pricing#long-context-pricing)。

大图像也可能消耗更多 token。Claude Haiku 5.5 使用高分辨率图像层级，该层级会对长边超过 2,576 像素或 4,784 个视觉 token 的图像进行下采样。Claude Haiku 4.5 及更早的 Haiku 模型使用标准层级，该层级会对长边超过 1,568 像素或 1,568 个视觉 token 的图像进行下采样。一张 2,000 x 1,500 像素的图像在 Claude Haiku 5.5 上消耗的视觉 token 数量约为在 Claude Haiku 4.5 上的 2.5 倍。请参阅 [分辨率和 token 成本](https://platform.claude.com/docs/en/build-with-claude/vision#evaluate-image-size)。

使用 `model` 设置为 `claude-haiku-5-5` 来计数您的提示词，而不是重用之前在 Claude Haiku 4.5 上测量的计数。

### 配置思考

Claude Haiku 5.5 的思考配置方式与 Claude Haiku 4.5 不同。值为 `{"type": "enabled", "budget_tokens": N}` 的 `thinking` 会返回 400 错误，因此发送该值的请求需要一个新的 `thinking` 值。

以前，对 Claude Haiku 4.5 的请求将 `thinking` 设置为 `enabled` 并附带 token 预算：

```json
{
  "model": "claude-haiku-4-5",
  "max_tokens": 16000,
  "thinking": { "type": "enabled", "budget_tokens": 8000 },
  "messages": [{ "role": "user", "content": "..." }]
}
```

之后，对 Claude Haiku 5.5 的相同请求使用自适应思考（adaptive thinking）。`thinking` 值发生变化，`output_config.effort` 设置模型思考的程度：

```json
{
  "model": "claude-haiku-5-5",
  "max_tokens": 16000,
  "thinking": { "type": "adaptive" },
  "output_config": { "effort": "medium" },
  "messages": [{ "role": "user", "content": "..." }]
}
```

自适应思考默认开启，因此即使请求未设置 `thinking`，响应也可能以一个或多个 `thinking` 块开始。保持 `thinking` 未设置或将其设置为 `{"type": "adaptive"}`，并使用 [effort](https://platform.claude.com/docs/en/build-with-claude/effort) 作为调节杠杆：如果 Claude Haiku 4.5 在不思考的情况下运行，或者为了节省 token 而使用较小的预算，请选择较低的 effort 级别。在较低级别下，模型思考得更少，并且在处理较简单的请求时甚至可以完全跳过思考。有关提示词指导，请参阅 [使用 effort 控制思考](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-haiku-5-5#use-effort-to-control-thinking)。按 `type` 字段而非位置选择内容块，并将 `thinking` 块连同工具结果一起原样返回。

思考 token 计入 `max_tokens`，因此带有较小 `max_tokens` 的请求可能在 `thinking` 块之后、任何文本之前以 `stop_reason: "max_tokens"` 停止。如果为 Claude Haiku 4.5 设置了较小的 `max_tokens`，请提高该值以留出思考空间，或选择较低的 [effort](https://platform.claude.com/docs/en/build-with-claude/effort) 级别。

早期助手轮次中的思考块保留在上下文中，并计入输入 token，而 Claude Haiku 4.5 仅保留最新轮次的。因此，多轮对话携带的输入 token 多于仅由 tokenizer 更改所解释的数量。要移除较早的块，请使用 [思考块清除](https://platform.claude.com/docs/en/build-with-claude/context-editing#thinking-block-clearing)。请参阅 [模型特定的思考块保留](https://platform.claude.com/docs/en/build-with-claude/thinking#thinking-block-preservation-by-model)。

默认情况下，Claude Haiku 5.5 返回每个 `thinking` 块，其中 `thinking` 字段为空，仅包含 `signature`，而 Claude Haiku 4.5 返回的是总结后的思考内容。若要接收总结后的思考内容，请设置 `thinking: {"type": "adaptive", "display": "summarized"}`。

Claude Haiku 5.5 接受强制性的 `tool_choice`（`any` 或命名工具），但响应将以工具调用开始，并且没有 `thinking` 块。若要让模型在调用工具之前进行思考，请使用 `tool_choice: {"type": "auto"}`，并在提示词中说明何时使用工具。

Claude Haiku 5.5 可以读取来自 Claude Sonnet 5、Claude Opus 4.8、Claude Haiku 4.5 及更早模型思考块，因此将对话从 Claude Haiku 4.5 切换到 Claude Haiku 5.5 时，其推理过程得以保留。它不会读取来自 Claude Opus 5、Claude Opus 5.5、Claude Sonnet 5.5 或任何 Claude Fable 或 Claude Mythos 模型的块；API 会静默丢弃这些块而不报错。在 Claude API 和 Google Cloud 上，Claude Opus 5.5 和 Claude Sonnet 5.5 可以读取 Claude Haiku 5.5 的块。请参阅 [对话中途切换模型](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#switching-models)。

### 移除采样参数

Claude Haiku 4.5 接受 `temperature`、`top_p` 和 `top_k`。在 Claude Haiku 5.5 上，省略这三个参数，改用提示词来引导模型行为。如果请求包含 `temperature`，则必须为 `1`。如果包含 `top_p`，则必须为 `0.99`（其默认值）。任何其他 `temperature` 或 `top_p` 值将返回 400 错误，包括 `top_p` 为 `1` 的情况。任何 `top_k` 值也是如此，包含 `temperature` 和 `top_p` 的请求也是如此。

### 替换助手预填充（prefill）

预填充（prefill）是 `messages` 中模型会继续生成的最后一个助手轮次。Claude Haiku 4.5 在思考关闭时接受预填充。Claude Haiku 5.5 即使思考关闭也会拒绝它，并返回 400 错误。以用户轮次结束 `messages`，并根据预填充的用途替换每个预填充：

* **输出格式：** 使用 [结构化输出](https://platform.claude.com/docs/en/build-with-claude/structured-outputs)，或使用带有枚举字段的工具进行分类。在 Amazon Bedrock 上，Claude Haiku 5.5 尚不支持结构化输出。在这种情况下，请在提示词中描述格式，或使用不带 `strict` 的工具，并在代码中验证输出。
* **前言（Preambles）：** 在系统提示词中要求直接回答。
* **续写（Continuations）：** 将其移至用户消息中，例如“你之前的回复被中断，结束于 `[previous_response]`。请从断点处继续。”
* **上下文提醒：** 将其放在用户消息轮次中。

### 将 Computer Use 移至工具集

Claude Haiku 4.5 通过 `computer_20250124` 工具（配合 `computer-use-2025-01-24` beta 头）支持 [Computer Use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool)。在 Claude API 和 Google Cloud 上，Claude Haiku 5.5 仅通过 `computer_toolset_20260801` 工具集支持 Computer Use，若请求中声明了 `computer_20250124` 则返回 400 错误。在 Amazon Bedrock 上，Claude Haiku 5.5 也不接受 `computer_20250124`；请使用 `computer_20251124` 工具版本并配合 `computer-use-2025-11-24` beta 头。

要将集成迁移至工具集，请移除 `computer-use-2025-01-24` beta 头，并将 `tools` 条目替换为 `{"type": "computer_toolset_20260801"}`。然后执行 [从 `computer_20251124` 迁移](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool#migrate-from-computer-20251124) 中的其他请求和 Agent 循环更改：根据每个 `tool_use` 块的 `name` 和 `toolset_name` 进行分发，而不是基于 `input.action`；处理轮次中的每个此类块，并在结果中回显 `toolset_name`。工具集默认启用 Zoom；如果你的环境未实现它，请添加 `"configs": {"zoom": {"enabled": false}}`。如果你发送了 `fine-grained-tool-streaming-2025-05-14` beta 头，请将其移除。它与工具集条目同时使用时会返回 400 错误。对于其他平台，请参阅 Computer Use 工具的 [兼容性](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool#compatibility) 部分。

在 Claude API 和 Google Cloud 上，Claude Haiku 5.5 还支持 [Browser Use 工具](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool)（`browser_toolset_20260801`），用于处理网页内的任务。Claude Haiku 4.5 不支持此功能。

### 通过生成它们的账户重放思考块（Thinking Blocks）

来自 Claude Haiku 5.5 的思考块仅在其生成的账户或与其关联的账户中有效。当另一个账户发送这些块时，API 会在模型看到之前丢弃该块，请求成功但不包含该推理过程。这会影响存储对话并通过不同账户重放它们的代码，例如从单一对话存储为多个客户提供服务的系统。请通过生成该对话的账户重放每个对话。请参阅 [思考块保留在生成它们的账户中](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#account-bound-thinking)。

### 保持早期轮次不变

Claude Haiku 5.5 的思考块仅在之前发送的所有内容未发生改变时才有效：如果在修改了 `system`、`tools` 或早期 `messages` 之后重新发送思考块，请求将返回 400 错误。Claude Haiku 4.5 不执行此检查。请保持对话为仅追加模式（append-only）。在 2026 年 8 月 31 日 00:00 UTC 之前创建的账户中，仅在设置 `thinking.block_binding.prefix_mismatch_behavior` 的请求上才会出现此错误。有关触发此错误的更改及相应的替代方案，请参阅 [谁需要更改内容](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#who-is-affected)。

### 从 Claude Haiku 3.5 及更早的 Haiku 模型迁移到 Claude Haiku 5.5

Claude Haiku 3.5 已在 Claude API 和 Amazon Bedrock 上退役，Claude Haiku 3 已在 Claude API 和 Google Cloud 上退役。对已退役模型的请求将失败。Google Cloud 将 Claude Haiku 3.5 列为已弃用，且仅对现有客户可用。请参阅 [模型弃用](https://platform.claude.com/docs/en/about-claude/model-deprecations)。

从任一模型开始，首先应用前面的所有部分，然后进行以下更改：

* **模型 ID：** 将 `claude-3-5-haiku-20241022`、其别名 `claude-3-5-haiku-latest` 或 `claude-3-haiku-20240307` 替换为 `claude-haiku-5-5`。在 Google Cloud 上，将 `claude-3-5-haiku@20241022` 替换为 `claude-haiku-5-5`。在 Amazon Bedrock 上，使用来自 [使用 Claude Haiku 5.5 模型 ID](https://platform.claude.com/docs/en/models/haiku-5-5/migration-guide#use-the-claude-haiku-5-5-model-id) 的 Claude Haiku 5.5 ID。
* **代码执行：** Claude Haiku 5.5 接受 `code_execution_20250825` 及更高版本。如果你使用的是仅限 Python 的旧版 `code_execution_20250522`，请迁移到其中一个版本。请参阅 [升级到最新工具版本](https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool#upgrade-to-latest-tool-version)。
* **文本编辑器：** 如果你使用文本编辑器工具，请迁移到 `text_editor_20250728`（工具名称为 `str_replace_based_edit_tool`），该版本没有 `undo_edit` 命令。请参阅 [文本编辑器工具](https://platform.claude.com/docs/en/agents-and-tools/tool-use/text-editor-tool)。
* **停止原因：** 处理 `refusal` 和 `model_context_window_exceeded`。请参阅 [处理停止原因](https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons)。
* **尾部换行符：** Claude 4.5 及更高版本的模型会在工具调用字符串参数中保留尾部换行符。如果你的代码精确匹配这些字符串，请允许存在这些换行符。
* **提示词：** Claude 4 及更高版本的模型具有更简洁、直接的沟通风格，并且需要明确的指示。请根据 [提示 Claude Haiku 5.5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-haiku-5-5) 和 [提示最佳实践](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) 审查你的提示词。
