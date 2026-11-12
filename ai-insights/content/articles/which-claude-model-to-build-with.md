---
title: "Claude 四个模型到底用哪个？Anthropic 官方选型指南：从 Opus 5.5 起步，先调 effort 再换模型"
date: 2026-11-10T00:00:00.000Z
tags: ["AI 实操", "Claude", "Anthropic", "Claude Code", "模型选型", "effort", "聚合"]
summary: "Anthropic 官方的 Claude 选型指南：Fable、Opus、Sonnet、Haiku 各接什么活，一件活真正花多少钱，几个模型怎么搭着用，换模型前要避开哪些坑。"
---
> **原文链接**: [https://claude.dev/blog/which-claude-model-should-you-build-with/](https://claude.dev/blog/which-claude-model-should-you-build-with/)
> **来源**: claude.dev
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/which-claude-model-to-build-with/) · 2026/11/10
> **说明**: 本文由 AIHot汪 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

## 应该用哪个 Claude 模型来构建?Fable、Opus、Sonnet 还是 Haiku

如何选择 Claude 模型、它们的成本如何,以及如何搭配使用。

- 作者：Addy Osmani(技术成员)
- 发布日期：2026-11-09
- URL: <https://claude.dev/blog/which-claude-model-should-you-build-with/>

---

当前 Claude 产品线包含四个正式开放的模型：Claude Haiku 5.5、Claude Sonnet 5.5、Claude Opus 5.5 和 Claude Fable 5.2。Claude Mythos 5.2 是我们在网络安全与生命科学研究领域最强大的模型，需通过我们的验证计划获取。

如果你在 Claude Platform 上构建应用，或在 Claude Code 中工作，你可能会疑惑日常任务该用哪个模型。本文将帮你解答这个问题，并说明如何权衡取舍。

[视频：一张小巷的照片，分别由 Claude Haiku 5.5、Sonnet 5.5、Opus 5.5 和 Fable 5.2 用代码渲染。每幅图像都是一个模型编写的 Python 程序，调用它自己编写的绘图引擎，从第一层到最终成品逐步展示。演示:Lance Martin。](https://claude.dev/media/c5d7df0a1f47ff734b6d8c6e050bbb99217ca37684b34f154e6939b14c06c99d.mp4) — 一张夜晚狭窄小巷的照片，旁边是 Haiku 5.5、Sonnet 5.5、Opus 5.5 和 Fable 5.2 用代码渲染出的四幅图像，每幅都从第一层逐步构建至完成。

### TL;DR

简短的回答是：大多数工作都应从 Opus 5.5 的默认 effort 级别 `medium` 开始。

它之所以是 Claude Code 的默认模型，是有原因的。它每个输入和输出 token 的成本只有 Fable 5.2 的一半，而且是我们推荐大多数编码和知识型工作起步使用的模型。

在此基础上：

- 向下换到 Sonnet 5.5,处理范围明确的日常工作，例如修复 bug 或按 spec 构建功能。不过，有清晰的 spec 并不意味着就该用 Sonnet。一次迁移或性能优化可能有清晰的 spec,但难度仍足以使用 Opus 5.5,重大的项目则可以用 Fable 5.2。
- 再向下换到 Haiku 5.5,处理最简单的高批量工作，例如分类、路由和提取。Haiku 5.5 也适合搭配 subagent 使用，让它们处理更大模型的辅助任务。
- 向上换到 Claude Fable 5.2,处理编码、金融和科学领域最艰难的技术项目。当 Opus 5.5 在 `high` 级别仍力不从心时，或需要长时间无人值守运行时，也可以向上换。

在更换模型之前，先尝试调整 effort 级别。它是同时控制成本和能力的更精细的旋钮。超过 `high` 之后，再往上一档 effort 的成本可能等同于换一个更大的模型，所以要在你自己的工作上对两者进行对比。如果你的 effort 已超过 `high`,不妨改用上一级模型并配以更低的 effort 来测试。反之，下调一档 effort 也可能以更低的价格获得你所需的结果。

更高的 effort 在模型需要思考更久、调用更多工具或更多地检查自身工作时会有帮助。但请注意，它也会增加延迟。此外，调高 effort 级别并不会赋予模型它原本不具备的知识或技能。要做到这一点，你仍需换用更高一级的模型。

### 按任务选择模型

| 任务                                                                              | 起步模型                                            | 起步 effort                                       | 原因                                                                                                                                                          |
| --------------------------------------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 日常工程与调试，涉及多个 PR 的功能开发                                            | Opus 5.5                                            | `medium`(默认)，然后 `high`                      | 在日常任务中兼顾成本与能力。                                                                                                                                  |
| 分类、路由、打标签和高批量提取                                                    | Haiku 5.5                                           | `medium`(默认)                                  | 模型家族中成本和延迟最低。                                                                                                                                    |
| 搜索文件、读取日志或做摘要的 subagent                                             | Haiku 5.5 或 Sonnet 5.5                             | 该模型的默认值                                    | 错误答案很容易发现，而且判断决策反正由主模型来做。                                                                                                            |
| 聊天和交互式会话                                                                  | Sonnet 5.5(大批量的简单对话用 Haiku 5.5)           | `low` 或 `medium`                                 | Sonnet 5.5 速度快，尤其在 `low` 或 `medium` effort 下。                                                                                                       |
| 范围明确的编码工作，例如修复 bug、功能迭代和 spec 驱动的工作                      | Sonnet 5.5                                          | `medium`,较难任务用 `high`                        | 它能以 Opus 5.5 一半的 token 价格出色完成范围明确的任务。                                                                                                     |
| 日常文档、幻灯片和电子表格                                                        | Sonnet 5.5                                          | `high`(默认;在 Claude Code 中为 `medium`)        | 它迭代速度快，设计眼光出色。对于复杂的财务模型，或基于大量源材料构建的文档，请从 Opus 5.5 开始。                                                               |

| 反复运行的 Agent 任务，如调查、审查或起草 | Sonnet 5.5 | `medium` | 定义明确、重复执行的任务很少需要更大的模型。 |
| Computer use 和视觉密集型工作流 | Opus 5.5 | `medium` | 这类运行是对大量截图和图像展开的长程 agentic 循环，正是 Opus 5.5 为之打造的那种长时间运行的 agentic 工作。 |
| 大型重构与迁移、架构规划，以及指挥众多 subagent | Fable 5.2 | `medium`，然后 `high`（API 默认为 `high`） | 它是 Anthropic 面向技术领域最强大的公开可用模型。 |
| 深度研究以及科学或定量分析 | Fable 5.2 | `medium`，然后 `high`（API 默认为 `high`） | 它专为编码、金融和科学领域最难的技术项目而打造。 |
| 还不确定 | Opus 5.5 | `medium`（默认） | Claude Code 在 Pro、Max、Ultra、Team、Enterprise 和 Anthropic API 上默认使用它，平台文档也推荐将其作为起点。 |

### 四款模型一览对比

|                                                                                      | Haiku 5.5                                                           | Sonnet 5.5                                                  | Opus 5.5                                               | Fable 5.2                                    |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------ | -------------------------------------------- |
| **设计目标**                                                                         | 高吞吐量、对成本敏感的任务                                          | 为范围明确的任务提供快速而强大的协助                        | 我们处理复杂编码和知识工作的日常主力                   | 最具雄心的开放式技术工作                     |
| **相对延迟**                                                                         | 最快                                                                | 快                                                          | 中等                                                   | 中等                                         |
| **输入 / 输出（每百万 token）**                                                      | 提示词在 100K token 以内为 $0.10 / $0.50，超过 100K 为 $0.50 / $2.50 | $2 / $10                                                    | $4 / $20                                               | $8 / $40                                     |
| **缓存读取（每百万 token）**                                                         | 100K 以内 $0.01，超过 100K $0.05                                    | $0.10                                                       | $0.20                                                  | $0.20                                        |
| **上下文窗口**                                                                       | 1M token                                                            | 1M token                                                    | 1M token                                               | 1M token                                     |
| **最大输出**                                                                         | 128K token                                                          | 128K token                                                  | 128K token                                             | 128K token                                   |
| **API 端的 Thinking**                                                                | 自适应，默认开启，且可以关闭                                        | 自适应，默认开启；`between_tools` 会跳过前置 thinking       | 自适应，始终开启                                       | 自适应，始终开启                             |
| **API 上的默认 effort**（Claude Code 中可能不同；`/effort status` 可查看你的设置）  | `medium`                                                            | `high`（Claude Code 中为 `medium`）                         | `medium`                                               | `high`（Claude Code 中为 `medium`）          |
| **Fast mode**                                                                        | 否                                                                  | 否                                                          | 是                                                     | 是                                           |

价格为 Claude API 官方定价。基准测试结果请参见 [Fable 5.2 页面](https://www.anthropic.com/claude/fable)。

[视频：Claude Fable 5.2、Opus 5.5、Sonnet 5.5 与 Haiku 5.5 各自构建同一个作品集网站，并排展示。演示:Addy Osmani。](https://claude.dev/media/fbb65d6e837fa666cd299a517960de215dab52aaf70d4a59f654d8164383d4c7.mp4) — 由 Fable 5.2、Opus 5.5、Sonnet 5.5 与 Haiku 5.5 构建的四个作品集网站，并排展示。

### 权衡取舍

在模型之间做选择时，你就是在做权衡。例如，选择更大的模型，就意味着以延迟换取能力。以下是需要仔细考虑的主要权衡。

#### 能力与每个已完成任务的成本

一般来说，更大的模型每 token 的成本更高，能力也更强，但在任务层面，这种成本与能力的权衡并不总是成立。

每 token 更高的价格并不总是意味着每任务更高的成本或更好的结果。正如我们在 [Spending your effort](https://claude.dev/blog/spending-your-effort/) 中所示，在 Anthropic 运行 Terminal-Bench 3.0 时，上一代 Fable 5.1 在 `max` 档得分 58.0%,而 Opus 5.5 在 `high` 档只用一半的 token 就取得了 58.9% 的成绩。

在最难的工作上，价格差距可能会消失。在 FrontierCode 2.0 上，Fable 5.2 在 `high` 档的得分与 Opus 5.5 在 `max` 档大致相当(45.3% 对 45.5%),而每任务成本约为后者的一半。因此，在困难任务上把 Opus 5.5 提升到 `high` 以上之前，先测试一下 Fable 5.2。对于日常工作，Opus 5.5 在 `medium` 档仍是首选起点。基准测试结果请参见[发布文章](https://www.anthropic.com/claude-fable-and-mythos-5-2)。

不过，Claude Platform 的[成本与智能测量](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence)也显示了小模型的局限。小模型通常在输出可检验的大批量工作上表现出色，而不太适合长的 agentic 循环。

在比较两个模型时，除了典型任务，还要对你任务集中最难的任务进行成本估算，因为最难的任务占据了大部分支出。在一个包含 20 道题的搜索基准上，两道题就占了总支出的 43%。

[视频：Fable 5.2 展示游戏引擎如何构建一个世界。它以十六种外观绘制同一个 3D 场景，从线框图和像素画到光线追踪，并为每种技术标注名称。演示:Dan Fein。](https://claude.dev/media/256138a2f0c93acabc4e4c891626530d7df56bf9eca51b6a9b92b100b7af3ccd.mp4) — 一个 3D 湖畔场景以十六种渲染风格重绘，从线框图和像素画到光线追踪。

#### 延迟与准确性

更快的配置能更早完成，但也可能漏掉更多。在选定模型和 effort 等级之前，先想清楚一个人能等多久。对于需要人等待的回复，可以从 `low` 或 `medium` 档的 Sonnet 5.5 开始。

新一代模型通常比前代更快。Fable 5.2 的输出生成速度比 Fable 5.1 快至多 30%。Sonnet 5.5 的运行速度比 Sonnet 5 快 30%。

effort 等级与延迟大致相关。你需要判断由此获得的准确性是否值得额外的延迟。例如，在 SWE-bench Pro 上，Opus 5.5 在 `medium` 档的得分比 `high` effort 设置约低 2.5 分，成本约为其 70%。在 `low` 档，得分约低 8 分，成本约为三分之一。在 `xhigh` 档，得分约高 1.4 分，成本是 `high` 档的 2.5 倍。

提供一种自我验证的手段，往往比调整 effort 等级更划算，且增加的延迟更少。当某个模型不足以胜任某项任务时，按以下顺序采取这些步骤：

1. 用一个测试、一次构建或一个调用 endpoint 的脚本，检查模型能否验证自己的工作。
2. 将 effort 提升一级。
3. 升级到高一级的模型，并从比之前用于较小模型的 effort 等级更低的一档开始。

如果你能自动检查结果，可以让所有任务都以低档运行，只对失败的任务以高档重跑。在同一个 SWE-bench Pro 子集上，Opus 5.5 在 `low` 档运行、失败任务以 `high` 档重跑，通过了约 97% 的任务，每个任务成本约 $0.17;相比之下，所有任务均以 `high` 档运行时，通过率为 95.3%,成本为每个任务 $0.29。

如果你需要同一个模型给出更快的回复，可以付费购买速度，而不必放弃能力。在 Claude API 上，Opus 5.5 和 Fable 5.2 都提供[快速模式(fast mode)](https://platform.claude.com/docs/en/build-with-claude/fast-mode),以更高的价格换取更快的输出速度。

#### 上下文与成本

当前这一代的所有模型都拥有 1M token 的上下文窗口。大的上下文有助于模型完成任务，但每一轮都会产生费用，因为每一轮都会重新发送它。话虽如此，[在长时间运行中，你的大部分输入会按 cache read 计费](https://claude.com/blog/claude-opus-5-5-built-for-coding-sessions-that-use-more-context)。

Opus 5.5 的 cache read 价格为每百万 token $0.20,Sonnet 5.5 为 $0.10。Fable 5.2 同样是 $0.20,因此在长时间、大量依赖缓存的运行中，Fable 与 Opus 之间的差距主要落在未缓存的输入和输出上——在这两项上，Fable 的每 token 价格是 Opus 的两倍。

在 [在 Opus 5.5 上一个任务要花多少钱](https://claude.dev/blog/what-a-task-costs-on-opus-5-5/) 一文中，当上下文达到 150K token 时，一轮的 cache read 约花费 $0.03;在 20K 时约花费 $0.004。

由此可以得出一点：主模型越大，保持精简的主上下文就越重要。让昂贵模型的上下文只用于决策，把冗长的阅读工作交给更便宜的 subagent。

Haiku 5.5 是唯一一个 token 价格随 prompt 长度变化的模型。不超过 100K token 的 prompt 按较低档位计费，超过 100K 的 prompt 按该价的五倍计费。长 prompt 档位仍只有 Sonnet 5.5 每 token 价格的四分之一。因此 Haiku 5.5 在短 prompt 上最划算，此时它的输入价格只有 Sonnet 5.5 的二十分之一。

当每次调用都需要长 prompt 时，请以每个完成任务的成本来比较 Haiku 5.5 与 Sonnet 5.5,而不是标价。

### 混用模型

[视频：一个项目，四个模型，各自负责一种工作。Claude Fable 5.2 将一家网店从 JavaScript 迁移到 TypeScript,Opus 5.5 构建月度订阅功能，Sonnet 5.5 撰写产品页面，Haiku 5.5 对客户消息进行分类。Fable 5.2 的新代码合入后，Opus 5.5 才开始它的功能。演示:Dan Fein。](https://claude.dev/media/c8e9be266023661b9979d9af80bb8bc3e45766be6f55eb6726c788217b64e6d7.mp4) — 一家同时由四个模型构建的网上咖啡店：Fable 5.2 将代码迁移到 TypeScript,Opus 5.5 构建订阅功能，Sonnet 5.5 撰写产品页面，Haiku 5.5 对客户消息进行分类。

#### 在自然的间歇点切换

prompt cache 属于写入它的那个模型。在新模型上的第一轮要为整个对话支付 cache write 的价格。为了让这一轮更小，先在 Claude Code 中运行 `/compact`,或者带上简短的书面计划开启一个全新会话。在 API 上，用迄今为止工作的摘要而非完整历史来开启新模型的对话。

每个 thinking block 都记录了产生它的模型，而每个模型只能读取部分其他模型的 block。在 Claude API 和 Claude Models on Google Cloud(Google 托管)上，Opus 5.5 能读取 Sonnet 5.5 和 Haiku 5.5 的 thinking block;Sonnet 5.5 能读取 Haiku 5.5 的；Fable 5.2 能读取 Opus 5.5、Sonnet 5.5 和 Haiku 5.5 的；在 Claude API 上，Fable 5.1 能读取 Opus 5.5 的。

降级到更低档位会丢失先前的推理，因为模型从不读取高于它的模型的 block。其他方向的切换也可能丢失推理。当新模型无法读取先前模型的 thinking block 时，API 会将其丢弃，请求仍然会成功。新模型随后在没有这些推理的情况下继续工作。

[Preserved thinking](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking) 列出了所有情况。从 Fable 5.2 切换到任何其他正式发布(generally available)的模型都会丢失其推理。

#### 让 subagent 使用更小的模型

subagent 在自己的上下文窗口中运行，并交回一份摘要。它的 token 按其所运行模型的费率计费。在 Claude Code 中，可以在 subagent 的定义中设置 `model: haiku` 或 `model: sonnet`。环境变量 `CLAUDE_CODE_SUBAGENT_MODEL` 为未指定模型的 subagent 设置默认值。

将此保存为 `.claude/agents/log-reader.md`:

```markdown
---
name: log-reader
description: Reads test output and logs, and reports each failing case. Use after a test run.
tools: Read, Grep, Glob, Bash
model: haiku
---

Read the logs you're given. For each failure, report the file, the test name and the first error line. Don't edit any files.
```

把小模型用在出错容易发现的工作上,比如查找文件、运行测试和读取日志。把代码修改和判断性决策留给主模型。当小模型误读一个搜索结果时,主模型就会打开错误的文件并为此耗费 token。

[视频:观看者请求一个图层,例如海拔、骑行路线、雾或温度。Opus 5.5 规划工作,并行的 Haiku 5.5 subagent 在共享地图上绘制各自的区块。温度仅为示意,雾是一种印象而非预报。地图数据 © OpenStreetMap contributors;海拔数据来自 USGS 3DEP lidar。演示由 Lance Martin 制作。](https://claude.dev/media/950d272911f41476f75100a3b79841d819cb624f5a702082e58e46bae75d3557.mp4) —— 一幅旧金山 Presidio 的地图。在侧边栏中,输入的海拔、骑行路线、雾和温度请求分别扇出到一列 Haiku 5.5 subagent,它们把各自的区块绘制到地图上。

在当前版本的 Claude Code 中,内置的 Explore subagent 运行在你当前会话的模型上,而不是总是运行在 Haiku 上。在 Claude API 上,该模型最高只能到 Opus。为了让探索保持低成本,可以自己定义一个名为 `Explore` 的 subagent 并设置 `model: haiku`。你可以用 `ANTHROPIC_DEFAULT_HAIKU_MODEL` 固定 `haiku` 别名所使用的模型。

在 Anthropic API 上,`haiku` 别名现在解析为 Haiku 5.5,这需要 Claude Code v2.1.293 或更高版本。在 Amazon Bedrock、Google Cloud、Microsoft Foundry 以及 AWS 上的 Claude Platform 上,它仍解析为 Haiku 4.5。Claude Code 的[模型配置](https://code.claude.com/docs/en/model-config)文档有详细说明。

Claude Code 还有 `opusplan` 别名,它在 plan mode 中用 Opus 规划,然后用 Sonnet 执行该计划。这会把你的代码修改放到 Sonnet 上。上文建议的做法正好相反:代码修改保留在主模型上,只把出错容易发现的工作交给更小的模型。在把 `opusplan` 设为默认之前,先在你自己的任务上实测它。

#### 将艰难决策升级给 advisor

[advisor 工具](https://platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool)(beta)将一个更快、更便宜的 executor 模型与一个更强的 advisor 模型配对。executor 执行任务,并可以在中途向 advisor 请求指导。大部分 token 按 executor 的费率计费。advisor 只有在补足 executor 所缺能力、且 executor 主动请求建议时才发挥作用,而 executor 在低 effort 档位下较少这么做。

可能划算的场景:大多数回合都是例行操作的 agentic 工作。平台的成本指南较为谨慎:在其 advisor 表格的四种配对中,没有一个明显优于单独使用其 executor,而且 advisor 只有在 executor 咨询它时才能起作用。先测量你的 executor 的咨询率,再确认你的 executor 接受哪些 advisor。例如,Sonnet 5.5 executor 接受 Fable 5.2、Opus 5.5、Opus 5 和 Sonnet 5.5,而 Fable 5.2 executor 只接受 Fable 5.2 或 Mythos 5.2。

收效甚微的场景:其中一个配对是在一个内部编码基准上,使用 `high` 档位的 Opus 5.5 executor 搭配 Fable 5.1 advisor。它以每次尝试 $2.92 的成本得到 90.1% 的分数。这比单独使用 `high` 档位的 Opus 5.5 高出 1.7 个百分点,但花费约为其 2.1 倍。这种幅度的提升处于运行间噪声的边缘,大约相当于提高 effort 档位所能带来的收益。

#### 把批量工作委托给更便宜的 worker

上文所说的 subagent 处理的是辅助任务,同时由一个主模型维持上下文主线。这一模式适用于超出单个 context window 的工作:由一个顶级模型主导,拆分任务,把各部分并行交给许多更便宜的 worker,再合并返回的结果。在一个覆盖约 2200 万 token 源代码的内部缺陷搜索基准上,由 Opus 5.5 主导、最多同时 25 个 Sonnet 5.5 worker 的方案,比默认 effort 档位下单独使用 Opus 5.5 的成本低约三分之一,得分大致相同。

在 Claude 平台上，[多智能体编排](https://platform.claude.com/docs/en/managed-agents/multiagent-orchestration)在 Claude Managed Agents 中为您提供一个协调员智能体（coordinator agent）和一组工作者智能体（workers）名单。如果工作仅涉及单链依赖步骤，或能容纳在一个上下文窗口内，请跳过此功能。在这种情况下，规划和合并的成本高于其节省的成本。[何时将子智能体折叠到主智能体循环中](https://claude.com/resources/articles/building-agents-when-to-fold-subagents-into-your-main-agent-loop) 一文探讨了何时单个智能体循环优于子智能体团队。

### 迁移前检查兼容性

模型选择主要涉及能力和成本问题，但您不能总是仅更改模型名称。每个当前模型都支持工具使用和图像输入，但在将请求从一个模型迁移到另一个模型之前，有一些差异需要测试。

- **Fable 5.2 将保留的思考（preserved thinking）扩展到所有 API 账户。** 当 Fable 5.2 思考块之前的任何内容（包括系统提示、工具或早期消息）发生更改时，API 会返回 400 错误拒绝请求，除非您选择放弃受影响的思考。如果您通过 Claude Code、Claude Agent SDK 或 Claude Managed Agents 构建请求，则无需进行任何更改。如果您的代码编辑历史记录，请保持追加模式（append-only），并在切换前进行测试。
- **思考（Thinking）。** Opus 5.5 和 Fable 5.2 始终进行思考，关闭思考的请求会返回错误。Sonnet 5.5 默认进行思考，`between_tools` 将思考限制在工具调用之间的间隙。Haiku 5.5 默认进行思考，您可以在 `high` 或更低的工作级别关闭思考。在所有模型上，请按 `type` 读取内容块，因为响应可能以思考块开头。
- **强制工具使用（Forced tool use）。** 在 Sonnet 5.5、Opus 5.5 和 Fable 5.2 上，`tool_choice` 为 `any` 或 `tool` 时会返回 400 错误。发送 `auto`，将工具标记为 `strict: true`，并在提示中说明何时使用它。
- **计算机使用（Computer use）。** Opus 5.5、Sonnet 5.5、Haiku 5.5 和 Fable 5.2 仅通过 Claude API 和 Google Cloud 上的 Claude Models（Google 托管）中的 `computer_toolset_20260801` 工具集支持计算机使用。
- **Haiku 4.5 到 Haiku 5.5。** 用工作级别替换 `budget_tokens`，并删除非默认 `temperature`、`top_p` 和 `top_k` 值，这些值会返回 400 错误。以用户轮次结束 `messages`，因为模型继续的最后一个助手轮次也会返回 400 错误。
- **安全回退（Safety fallbacks）。** Opus 5.5、Sonnet 5.5 和 Fable 5.2 运行安全分类器，最常标记网络安全和生物学内容。在 Claude Code 中，被标记的请求可以在旧模型上重新运行，转录本中的通知会告诉您使用的是哪个模型。Fable 5.2 保留了 Fable 5.1 使用的回退模型。被标记的网络安全请求回退到 Opus 4.8，被标记的生物学请求回退到 Opus 5。

如果一个系统运行多个模型，请为其中最严格的模型构建每个请求：保持历史记录追加模式，发送 `tool_choice: auto` 并配合严格工具，按 `type` 读取内容块，并编写足够精确的提示和工具描述以适配最字面化的模型。这样，步骤可以在不同层级之间移动而无需更改代码。当路由规则简单时（例如每个步骤类型对应一个模型），让代码选择模型，而不是让模型来选择。

### 基于您自己的工作进行衡量

发布的基准测试结果，如上述 SWE-bench Pro 和 Terminal-Bench 数据，可帮助您确定起始模型。然后在提交之前，在您自己的任务上测试候选模型。

1. 抽取真实任务的样本。为每个任务编写结果检查，例如通过测试、关闭的工单或正确的行数。
2. 以两个或三个工作级别运行每个候选模型，每个级别在独立会话中运行，以便运行不共享缓存。记录每个已完成任务的成本，该成本来自每个响应的 `usage` 字段。
3. 绘制得分与支出的图表。仅当多模型设置在该图表上优于每个单模型点时，才保留多模型设置。
4. 在切换之前，在真实流量片段上以影子模式（shadow）运行获胜者。

要在 Claude Code 中进行快速检查，请使用 `/model` 命令在两个模型上运行积压任务中的一个，并比较 `/usage` 报告的内容。

### 了解更多

- [使用 Claude Sonnet 5.5 构建](https://claude.dev/blog/building-with-claude-sonnet-5-5/) 涵盖了何时选择 Sonnet 而非 Opus、定价、迁移和调优。
- [在 Claude 和 Claude Code 中充分利用 Opus 5.5](https://claude.dev/blog/getting-the-most-out-of-opus-5-5/) 涵盖了如何对 Opus 5.5 进行提示以及引导长运行任务。
- [Opus 5.5 上的任务成本](https://claude.dev/blog/what-a-task-costs-on-opus-5-5/) 介绍了 Effort、模型选择和 Subagents 的定价。
- 在 Claude 博客上，[为您的用例选择最佳的 Claude 模型](https://claude.com/blog/claude-models-explained-choosing-the-best-model-for-your-use-case) 和 [在 Claude Code 中选择模型和 Effort 级别](https://claude.com/blog/claude-model-and-effort-level-in-claude-code) 提供了更深入的介绍。
- 在文档中，请参阅 [选择模型](https://platform.claude.com/docs/en/about-claude/models/choosing-a-model)、[优化成本与智能](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence)、[Effort](https://platform.claude.com/docs/en/build-with-claude/effort)、Claude Code 的 [模型配置](https://code.claude.com/docs/en/model-config) 和 [Subagents](https://code.claude.com/docs/en/sub-agents)。
