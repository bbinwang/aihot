---
title: "Sonnet 5.5 上手指南：怎么选、多少钱、从 Sonnet 5 怎么迁"
date: 2026-09-29T00:00:00.000Z
tags: ["会员", "深度", "Claude", "Sonnet 5.5", "API", "聚合"]
summary: "Anthropic 官方指南讲透：Sonnet 5.5 和 Opus 5.5 的分工、单价不变账单却会变的原因，以及迁移时会直接报错的几处改动。"
---
> **原文链接**: [https://claude.dev/blog/building-with-claude-sonnet-5-5/](https://claude.dev/blog/building-with-claude-sonnet-5-5/)
> **来源**: Addy Osmani
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/building-with-claude-sonnet-5-5/) · 2026/9/29
> **说明**: 本文由 AIHot 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

Claude Sonnet 5.5 是我们继 Opus 5.5 之后推出的 Claude 5.5 家族第二款模型。它相比 Sonnet 5 是一次明确的升级,更智能、更高效,速度提升 30%。每 token 价格保持不变,而且由于 Sonnet 5.5 完成同样的工作通常所需 token 要少得多,因此对大多数工作而言,成本最多可降低 30%。

[视频/音频](https://claude.dev/media/63c0bb81af17992642b05cdd8eb1d21a252a79c897ada4de85aeb93b6afc0aed.mp4)
![两块分别标注 Claude Sonnet 5 和 Claude Sonnet 5.5 的空白画布被逐笔填充,每块画布下方持续统计笔刷引擎的调用次数,与此同时每个模型编写的代码正在绘制一幅夕阳下城市天际线的俯瞰图。结尾是并排的四个画面:照片原图,以及 Claude Sonnet 5、Claude Sonnet 5.5 和 Claude Opus 5.5 各自绘制的作品。](https://claude.dev/media/dca9efdc2515061f31f7244c9c4825c7e29f9e8d9b0b0da5e1259a4bca669d3d.jpg)

**VIDEO**Lance Martin 的代码转绘画演示:每个模型编写代码来重新绘制同一张照片。从左到右依次为:照片原图、Claude Sonnet 5、Claude Sonnet 5.5 和 Claude Opus 5.5 的作品。

*感谢 [@jkeatn](https://x.com/jkeatn) 提供代码转绘画相关的创意,以及 [@IceSolst](https://x.com/IceSolst) 提供参考图片。*

本指南介绍如何基于该模型进行构建。要试用它,请按原样运行以下请求:

CODEPython

```
<span class="kw">import</span><span class="pl"> anthropic

client = anthropic.Anthropic()

response = client.messages.create(
    model=</span><span class="ar">"claude-sonnet-5-5"</span><span class="pl">,
    max_tokens=</span><span class="nm">4096</span><span class="pl">,
    messages=[
        {
            </span><span class="ar">"role"</span><span class="pl">: </span><span class="ar">"user"</span><span class="pl">,
            </span><span class="ar">"content"</span><span class="pl">: </span><span class="ar">"Analyze the trade-offs between microservices and monolithic architectures"</span><span class="pl">,
        }
    ],
    output_config={</span><span class="ar">"effort"</span><span class="pl">: </span><span class="ar">"medium"</span><span class="pl">},
)

</span><span class="kw">for</span><span class="pl"> block </span><span class="kw">in</span><span class="pl"> response.content:
    </span><span class="kw">if</span><span class="pl"> block.</span><span class="kw">type</span><span class="pl"> == </span><span class="ar">"text"</span><span class="pl">:
        </span><span class="kw">print</span><span class="pl">(block.text)</span>
```

这段循环按类型读取每个 block,因为 Sonnet 5.5 默认会进行思考,所以响应可能以 `thinking` block 开头,而读取 `content[0].text` 的代码会因此出错。

### 在 SONNET 5.5 与 OPUS 5.5 之间做选择

在 Claude 5.5 家族中,Opus 5.5 专为需要审慎判断的复杂工作而打造。Sonnet 5.5 则适用于边界清晰的日常任务,例如修复 bug 和快速迭代功能。它还能制作精美的文档、幻灯片和电子表格,并拥有出色的设计眼光。其速度使它非常适合快速迭代。Claude Haiku 5.5 将在未来几周加入这个家族,面向高吞吐量、低延迟的工作流。

| 你的工作负载 | 建议首选 |
| --- | --- |
| 边界清晰的日常编码:修复 bug、快速迭代功能、对照需求进行验证 | Sonnet 5.5 |
| 高吞吐量日常开发 | Sonnet 5.5 |
| 精美的文档、幻灯片和电子表格,例如单页简介、图表、摘要幻灯片、文档编辑和电子表格整理,这类工作受益于设计眼光 | Sonnet 5.5 |
| 你会反复运行的边界明确的 Agent 任务:调查、审查、起草 | Sonnet 5.5 |
| 需要审慎判断的复杂工作,包括长程 agentic 编码和知识工作 | Opus 5.5 |
| 最困难的问题,需要最强的智能 | Opus 5.5 |

> "在 Epic 的早期测试中,Claude Sonnet 5.5 达到了你对更高层级模型所期望的质量标准,在系统设计审计和数据流审查中均表现稳固。新模型管理了数万行游戏玩法系统架构相关的代码,响应保持迅捷,能够处理持续数小时的任务,并且在更少的限定性提示下即可交付成果。"(Daniel Vogel,Epic Games 首席运营官)

Sonnet 5.5 最适合在任务有明确规范且结果可验证的情况下使用。正如[提示指南](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-sonnet-5-5)所言，"对于最困难的长周期工作，Opus 模型是更好的选择。"

### 定价

| 每百万 tokens | Sonnet 5.5 | Opus 5.5 |
| --- | --- | --- |
| 输入 | $2 | $4 |
| 输出 | $10 | $20 |
| 缓存写入，5分钟 | $2.50 | $5 |
| 缓存写入，1小时 | $4 | $8 |
| 缓存读取 | $0.20 | $0.20 |

所有 Sonnet 5.5 的价格，包括批处理和提示缓存，都与 Sonnet 5 保持一致，因此仅更换模型 ID 不会改变你的单 token 费用。仅限美国地区的推理（`inference_geo: "us"`）价格为标准价格的 1.1 倍。

虽然每 token 价格不变，但总账单会发生变化，因为如前所述，Sonnet 5.5 在每个任务上通常比 Sonnet 5 使用更少的 token。

请注意，各个平台为 Sonnet 设置的默认 effort 可能不同，例如在 Claude Platform 上为 `high`，在 Claude Code 中为 `medium`。

Sonnet 5.5 使用高分辨率图片层级，长边最高支持 2576 像素，一张 2000×1500 的图片消耗的 token 数约为 Sonnet 4.6、Sonnet 4.5 或 Haiku 4.5 的 2.5 倍。如果不需要如此精细度，请在发送前缩小图片。

### 模型详情

| 详情 | Sonnet 5.5 |
| --- | --- |
| **模型 ID** | 在 Claude API、AWS 上的 Claude Platform、Google Cloud 和 Microsoft Foundry 中为 `claude-sonnet-5-5`；在 Amazon Bedrock 中为 `anthropic.claude-sonnet-5-5` |
| **上下文窗口** | 100万 tokens，原生支持，无需 beta 标头 |
| **最大输出** | 128k tokens；在 Message Batches API 中使用 `output-300k-2026-03-24` beta 标头时最高可达 300k tokens |
| **知识截止日期** | 2026年6月 |
| **思考** | 默认开启（自适应思考）；`between_tools` 可关闭前置思考 |
| **Effort 级别** | `low`、`medium`、`high`、`xhigh`、`max` |
| **默认 Effort** | 在 Claude API 中为 `high`；在 Claude Code 中为 `medium` |
| **分词器** | 与 Sonnet 5 相同 |
| **最小可缓存提示** | 512 tokens（Sonnet 5 为 1,024） |
| **速率限制** | 与 Sonnet 5 独立，采用相同的默认层级值 |
| **优先级层级** | 在 Claude API 上可用 |
| **数据保留** | 符合条件的客户可享零数据保留 |

Claude API 默认使用 `high`，因此你可以从强大的结果开始。从那里开始，进行评估，然后选择你的工作负载所需的 effort 级别。如果你倾向于使用 `xhigh` 或 `max` effort，请记住，Sonnet 5.5 会思考更长时间，成本也更高。在某些任务上，你可能会失去 Sonnet 的一些优势：它在质量、速度和成本之间的平衡。在这种情况下，请考虑使用 Opus 5.5。

### 从 Sonnet 5 迁移

思考默认开启。如果你在关闭思考的情况下运行 Sonnet 5，可以使用 `between_tools` 来关闭前置思考。下面的步骤1展示了具体方法。

将模型 ID 更改为 `claude-sonnet-5-5`，然后处理五个重大变更和一个响应结构变化。[Sonnet 5.5 迁移指南](https://platform.claude.com/docs/en/models/sonnet-5-5/migration-guide) 详细介绍了每一项内容。

Claude Code 也可以为你执行迁移。运行 `/claude-api migrate this project to claude-sonnet-5-5` 来调用内置的 [Claude API 技能](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/claude-api-skill#migrating-to-a-newer-claude-model)，该技能会在你的代码库中应用模型 ID 替换和重大参数更改。

#### 1. 使用 between_tools 关闭前置思考

在 Sonnet 5.5 上，不带 `thinking` 字段的请求将以自适应思考模式运行，而 `thinking: {"type": "disabled"}` 会返回 400 错误。请改用新的 `between_tools` 设置。使用 `between_tools` 时，思考仅在工具调用之间发生，总响应时间相同或更快。

CODEPython

```
<span class="cm"># 之前：Claude Sonnet 5</span><span class="pl">
client.messages.create(
    model=</span><span class="ar">"claude-sonnet-5"</span><span class="pl">,
    max_tokens=</span><span class="nm">16000</span><span class="pl">,
    thinking={</span><span class="ar">"type"</span><span class="pl">: </span><span class="ar">"disabled"</span><span class="pl">},
    output_config={</span><span class="ar">"effort"</span><span class="pl">: </span><span class="ar">"xhigh"</span><span class="pl">},
    messages=[{</span><span class="ar">"role"</span><span class="pl">: </span><span class="ar">"user"</span><span class="pl">, </span><span class="ar">"content"</span><span class="pl">: </span><span class="ar">"..."</span><span class="pl">}],
)

</span><span class="cm"># 之后：Claude Sonnet 5.5</span><span class="pl">
client.messages.create(
    model=</span><span class="ar">"claude-sonnet-5-5"</span><span class="pl">,
    max_tokens=</span><span class="nm">16000</span><span class="pl">,
    thinking={</span><span class="ar">"type"</span><span class="pl">: </span><span class="ar">"between_tools"</span><span class="pl">},
    output_config={</span><span class="ar">"effort"</span><span class="pl">: </span><span class="ar">"high"</span><span class="pl">},
    messages=[{</span><span class="ar">"role"</span><span class="pl">: </span><span class="ar">"user"</span><span class="pl">, </span><span class="ar">"content"</span><span class="pl">: </span><span class="ar">"..."</span><span class="pl">}],
)</span>
```

示例还将 `xhigh` 的 effort（努力程度）降为 `high`，因为 `between_tools` 存在以下限制：

- `between_tools` 仅在 `low`、`medium` 和 `high` 的 effort 下工作。在 `xhigh` 或 `max` 下会返回 400 错误；如需在此类 setting 下运行，请使用 adaptive thinking。
- 它不接受其他字段。发送 `display`、`budget_tokens` 或 `block_binding` 会返回 400 错误。
- 使用 `between_tools` 时，effort 不能在对话中途更改。如需每轮变换 effort，请使用 adaptive thinking。
- 模型在工具调用之间编写的简短进度更新仍会以 `thinking` 块的形式返回，并带有摘要文本。按类型读取内容块，并在返回助手轮次时，将这些块连同其他内容原样传递。如果没有工具，响应将仅包含文本。
- 它在每个提供 Sonnet 5.5 的平台上都可以工作，无需 beta header。如果你的 SDK 版本未定义 `between_tools`，请更新它。

如果在使用 `between_tools` 时关闭 upfront thinking，请在不带工具且需要几步推理的请求中改用 adaptive thinking。

#### 2. 将强制的 tool_choice 替换为 auto 加 strict 工具

类型为 `any` 或 `tool` 的 `tool_choice` 会返回 400 错误，包括在 token 计数端点。发送 `auto`，将工具标记为 `strict: true`，使其输入符合 schema，并在提示词中说明何时使用它：

CODEPython

```
<span class="pl">weather_tool = {
    </span><span class="ar">"name"</span><span class="pl">: </span><span class="ar">"get_weather"</span><span class="pl">,
    </span><span class="ar">"description"</span><span class="pl">: </span><span class="ar">"Get the current weather in a given location"</span><span class="pl">,
    </span><span class="ar">"input_schema"</span><span class="pl">: {
        </span><span class="ar">"type"</span><span class="pl">: </span><span class="ar">"object"</span><span class="pl">,
        </span><span class="ar">"properties"</span><span class="pl">: {</span><span class="ar">"location"</span><span class="pl">: {</span><span class="ar">"type"</span><span class="pl">: </span><span class="ar">"string"</span><span class="pl">}},
        </span><span class="ar">"required"</span><span class="pl">: [</span><span class="ar">"location"</span><span class="pl">],
        </span><span class="ar">"additionalProperties"</span><span class="pl">: </span><span class="kw">False</span><span class="pl">,
    },
    </span><span class="ar">"strict"</span><span class="pl">: </span><span class="kw">True</span><span class="pl">,
}

client.messages.create(
    model=</span><span class="ar">"claude-sonnet-5-5"</span><span class="pl">,
    max_tokens=</span><span class="nm">1024</span><span class="pl">,
    tools=[weather_tool],
    tool_choice={</span><span class="ar">"type"</span><span class="pl">: </span><span class="ar">"auto"</span><span class="pl">},  </span><span class="cm"># 原来是 {"type": "tool", "name": "get_weather"}</span><span class="pl">
    messages=[
        {</span><span class="ar">"role"</span><span class="pl">: </span><span class="ar">"user"</span><span class="pl">, </span><span class="ar">"content"</span><span class="pl">: </span><span class="ar">"What's the weather in Paris? Use the get_weather tool."</span><span class="pl">}
    ],
)</span>
```

使用 strict 工具需要在每个对象上设置 `additionalProperties: false`。

#### 3. 保持对话仅追加

Sonnet 5.5 thinking 块与模型和对话绑定。Sonnet 5.5 可以读取 Sonnet 5 的 thinking 块，因此如果你将对话从 Sonnet 5 切换到 Sonnet 5.5，其推理过程会保留。没有其他模型能读取 Sonnet 5.5 的块。

#### 4. 将 computer use 移至工具集

在 Claude API 和 Google Cloud 上，Sonnet 5.5 仅通过 `{"type": "computer_toolset_20260801"}` 支持 computer use；声明 `computer_20251124` 的请求会返回 400 错误。从你的请求中移除 `anthropic-beta: computer-use-2025-11-24` header，在 SDK 中，移除 `betas` 参数，并通过标准客户端（而不是 beta 命名空间）调用 Messages API。替换 `tools` 条目，并更新你的 agent 循环以处理成员 `tool_use` 块、批量操作和结果上的 `toolset_name`。如果你发送了 `fine-grained-tool-streaming-2025-05-14` beta header，也将其移除，因为它与工具集条目一起使用会返回 400 错误；改为在需要该功能的每个工具上设置 `eager_input_streaming: true`。Amazon Bedrock 仍然接受 `computer_20251124`。

#### 5. 检查你的 advisor 配对

使用 advisor 工具时，Sonnet 5.5 执行器会拒绝 Opus 4.8、Opus 4.7 和 Sonnet 5 作为 advisor。可接受的 advisor 包括 Opus 5.5、Opus 5 和 Sonnet 5.5 本身。来自每个被接受 advisor 的建议都会以 `advisor_redacted_result` 块的形式加密返回，因此你的代码无法读取建议文本。

#### 6. 从思考块中读取工具调用之间的文本

此更改不会导致错误，但用户界面可以停止显示模型在工具调用之间的笔记。这些笔记如果长度超过一两句话，会以进度更新的 `thinking` 块形式返回，这些块在默认的 `display` 下是空的。

使用自适应思考时，将 `thinking.display` 设置为 `"updates"`（测试版，需使用 `thinking-display-updates-2026-08-18` 标头）或 `"summarized"`，并在每个非空的 `thinking` 块之后、紧随其后的 `tool_use` 块之前渲染该块。使用 `between_tools` 时，文本返回但不会带有 `display`。

Sonnet 5.5 还增加了每条消息的努力程度（测试版）、对话中途的系统消息以及对话中途的工具变更（测试版）。如果你从 Sonnet 4.6 或更早版本，或从 Haiku 4.5 迁移过来，[迁移指南](https://platform.claude.com/docs/en/models/sonnet-5-5/migration-guide) 中有针对每个起始模型的检查清单。

### 调优

#### 重新运行你的努力程度扫描

努力程度级别已重新校准，因此同一级别产生的思考量不再与 Sonnet 5 时相同，你的旧设置也将无法延续。除非你的工作负载是代理型或对延迟敏感的，否则从 `high` 开始。对于代理型编码和多步骤工具使用，对明确指定的任务从 `medium` 开始，对于更困难或更长的任务则切换到 `high`。对于聊天和其他对延迟敏感的工作，从 `medium` 或 `low` 开始。只有在你的评估显示质量提升时，才使用 `xhigh` 或 `max`。

思考量会计入 `max_tokens`，因此要留出空间。对于代理型编码，将 `max_tokens` 设置为模型的最大值 128,000，并流式传输响应。要想减少思考量，可以降低努力程度级别，因为在系统提示中要求模型少思考并不能可靠地减少思考量。

#### 移除 Sonnet 5 的变通做法

现有的 Sonnet 5 提示应该无需更改即可良好运行。如果你的提示带有诸如拒绝行为引导、工具调用重试垫片或“不要偷懒”等变通做法，请在调整任何其他内容之前移除它们并重新运行你的评估。

#### 在低努力程度下要求进行真实检查

Sonnet 5.5 通常会在报告变更完成之前检查自己的工作，但在 `low` 努力程度下，它有时会跳过对变更进行实际验证的检查。如果你看到变更在没有测试或构建输出的情况下被报告为完成，提示指南建议使用以下系统提示段落：

CODEText

```
<span class="pl">当你更改了可以运行、构建或进行类型检查的代码时，在报告完成之前，请运行一个能实际验证该更改的真实检查：即项目的测试、类型检查器、构建，或者被更改的命令本身。仅进行语法检查，或者启动失败的检查命令，都不算数；如果缺少的只是项目声明的依赖项，请使用其自己的包管理器和锁定文件（例如 npm install、pip install -r requirements.txt）来安装它们，切勿通过 sudo 或系统包管理器来安装，除非被告知不要这样做。只有当无法在此处运行任何真实的检查时，才说明你未运行哪个检查及其原因，而不是将更改报告为已完成。</span>
```

#### 使用 thinking.display 显示进度

不要要求模型在响应中写出其推理过程，因为这会导致 `reasoning_extraction` 被拒绝。请改为读取总结后的思考内容：

CODEPython

```
<span class="pl">thinking={</span><span class="ar">"type"</span><span class="pl">: </span><span class="ar">"adaptive"</span><span class="pl">, </span><span class="ar">"display"</span><span class="pl">: </span><span class="ar">"summarized"</span><span class="pl">}</span>
```

对于给用户看的、独立的进度提示，请使用 `display: "updates"`（测试版）。如果你希望在可预测的时间点获得更新，例如在第一次工具调用之前添加一行，并在末尾添加简短回顾，请在系统提示中说明。

#### 缓存更多提示内容

最小可缓存提示词降至 512 个 token，因此较短的 system prompt 和工具定义现在也符合条件。缓存读取成本仅为输入价格的十分之一。在请求之间更改顶层 effort 会使缓存失效；若要以不同 effort 运行单轮对话，请使用 per-message effort（beta），该模式会保留缓存。

### 拒绝与回退

在我们的自动化行为审计中，Sonnet 5.5 在大多数对齐和诚实性指标上相比 Sonnet 5 有所提升或持平。它也是首个具备与我们最强大模型类似网络安全防护措施的 Sonnet 模型。大多数常规软件开发不受影响。

被拒绝的请求会返回 HTTP 200，并附带 `stop_reason: "refusal"`，`stop_details` 会指明以下五个类别之一：`cyber`、`bio`、`frontier_llm`、`reasoning_extraction` 或 `general_harms`。服务端回退（`fallbacks: "default"`，beta，Claude API）会在 Sonnet 5 上重试 `cyber` 和 `frontier_llm` 的拒绝情况，不会重试其他三类。你也可以使用 SDK 中间件或自行实现重试。

对于合法的安全研究工作，网络安全验证计划（Cyber Verification Program）将很快扩展至包含 Sonnet 5.5。

### 可用性

Claude Sonnet 5.5 即日起在以下平台可用。在开发者平台上，请使用以下模型 ID：

- Claude API，作为 `claude-sonnet-5-5`
- Amazon Bedrock，作为 `anthropic.claude-sonnet-5-5`
- AWS 上的 Claude Platform，作为 `claude-sonnet-5-5`
- Google Cloud，作为 `claude-sonnet-5-5`
- Microsoft Foundry，作为 `claude-sonnet-5-5`，仅限 Global Standard 部署

#### 在 Claude Code 中

从 Claude Code v2.1.284（Agent SDK for TypeScript v0.3.284 或更高版本）开始，`sonnet` 别名在 Claude API 上解析为 Sonnet 5.5。默认以 `medium` effort 运行，原生支持 1M 上下文窗口。在 Claude Code 中无法关闭 Sonnet 5.5 的思考功能，effort 决定了模型的思考量。Sonnet 5.5 没有快速模式。`default` 模型仍为 Opus 5.5，因此对于范围明确的任务，请使用 `/model sonnet` 切换。

希望您喜欢试用 Sonnet 5.5，并一如既往地欢迎分享反馈。
