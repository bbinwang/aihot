---
title: "Claude Sonnet 5.5 发布：编码性能和 Opus 5.5不相上下 价格是后者一半"
date: 2026-09-29T00:00:00.000Z
tags: ["产品发布", "Claude", "Sonnet 5.5", "Anthropic", "AI 编码", "聚合"]
summary: "同价升级的重点，不是单个基准分数，而是修 bug、操作工具和制作文档时少等待、少迭代；结合官方演示看清它能做什么。"
---
> **原文链接**: [https://www.anthropic.com/claude-sonnet-5-5](https://www.anthropic.com/claude-sonnet-5-5)
> **来源**: Anthropic
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/claude-sonnet-5-5/) · 2026/9/29
> **说明**: 本文由 AIHot 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

## Claude Sonnet 5.5

2026年9月28日

我们隆重推出 Claude Sonnet 5.5,Claude 5.5 系列中的第二款模型。它是 Claude Sonnet 5 的显著升级，运行速度快 30% 以上，而且大多数工作的成本最多可降低 30%。

Sonnet 5.5 是 Claude Opus 5.5 的更快、更低成本的补充。Opus 5.5 专为需要审慎判断的复杂工作而构建，而 Sonnet 5.5 最擅长处理范围明确的日常任务、修复 bug,以及制作精美的文档、幻灯片和电子表格。它在设计方面也有敏锐的眼光。Claude Haiku 5.5 专为高吞吐量和对成本敏感的应用而构建，将在未来几周内加入 Claude 5.5 家族。

Sonnet 5.5 在以下方面较 Sonnet 5 有所提升：

**性能。** 在 agentic 编程评估 Terminal-Bench 4.0 上，Sonnet 5.5 得分为 70.6%,而 Sonnet 5 为 10.3%。在涵盖多种职业的现实工作测试 GDPval-AA 上，它的得分仅比 Opus 5.5 低两个百分点。它在长程工作和图像理解方面同样表现出色——它是首个仅凭截图通关 *Pokémon Red* 的 Sonnet 模型。

**协作。** 与 Opus 5.5 一样，Sonnet 5.5 的写作比我们上一代模型更加清晰；早期测试者认为它是比 Sonnet 5 更好的协作伙伴。它的速度也使其非常适合在复杂度较低的任务上进行快速迭代。

**成本。** Sonnet 5.5 的定价与 Sonnet 5 相同：每百万输入 token 2 美元，每百万输出 token 10 美元，缓存读取每百万 token 0.20 美元，但完成同样的工作，它通常所需的 token 要少得多。在我们的测试中，每个任务的成本比前代最多低 30%。

**速度。** Sonnet 5.5 的输出生成速度比 Sonnet 5 快 30% 以上，是我们迄今为止最快的 Sonnet 模型。

**对齐与安全。** 在我们的自动化行为审计中，Sonnet 5.5 在大多数对齐指标上优于或持平于 Sonnet 5。由于其网络安全(cybersecurity)能力与 Opus 5 相当，它是首个在发布时就配备网络安全防护措施与回退机制的 Sonnet 模型，类似我们为最强模型所开发的那些。它的生物学防护措施与 Sonnet 5 相同。这两类防护措施仅针对少数高风险请求；常规软件开发和大多数生命科学工作不受影响。

### 性能

Sonnet 5.5 在各个领域都超越了 Sonnet 5——在某些领域提升尤为显著。在若干评估中，以 Max effort 运行的 Sonnet 5.5 甚至可以与 Opus 5.5 相媲美。然而，基准测试分数只能反映模型能力的一个侧面；在我们自己以及外部测试者的测试中，Opus 5.5 在需要持续判断的复杂开放式工作中仍明显更强。

|  | Sonnet 5.5 | Sonnet 5 | Opus 5.5 | GPT-6 Sol |
| --- | --- | --- | --- | --- |
| Agentic 编程Terminal-Bench 4.0 |  |
| Agentic 编程Terminal-Bench 4.0 | 70.6% | 10.3% | 66.4%¹ | — |
| Agentic 编程FrontierCode 1.1 (Main) |  |
| Agentic 编程FrontierCode 1.1 (Main) | 46.2%Max² | 42.4% | 54.4% | 49.3% |
| 52.1%Xhigh |
| Agentic 编程CursorBench 4.0 |  |
| Agentic 编程CursorBench 4.0 | 55.5% | 34.1% | 57.8% | — |
| 知识工作GDPval-AA v2.1³ |  |
| 知识工作GDPval-AA v2.1³ | 1844 | 1449 | 1846 | 1487⁴ |
| 知识工作AA-Briefcase v1.1³ |  |
| 知识工作AA-Briefcase v1.1³ | 1811 | 1359 | 1822 | 1483⁴ |
| 多学科推理Humanity’s Last Exam |  |
| 多学科推理Humanity’s Last Exam | 64.5%使用工具 | 54.9%使用工具 | 67.7%使用工具 | — |
| 计算机使用OSWorld 2.1 |  |
| 计算机使用OSWorld 2.1 | 80.1%部分 | 57.0%部分 | 81.8%部分 | — |
| 视觉图表识别Chartography |  |
| 视觉图表识别Chartography | 61.6%无工具 | 15.6%无工具 | 64.4%无工具 | 53.6%⁴无工具 |

有关我们如何运行评估的详细信息，请参阅 [Sonnet 5.5 System Card](https://www.anthropic.com/claude-sonnet-5-5-system-card)。

下图绘制了各模型在每个 effort 等级下的得分与其每任务成本的关系。随着 effort 提高，模型通常工作得更久，导致每任务成本更高，但得分通常也更高。图中的点越靠近左上角，每美元所能提供的能力就越强。

在若干基准测试中，以 Low 或 Medium effort 运行的 Sonnet 5.5 能以约十分之一的单任务成本超越 Sonnet 5 的最佳成绩。当以较低的 effort 设置运行时，它与 Opus 5.5 的互补效果最佳，此时单任务成本也更低。在更高的设置下，它能以相近的成本实现相当的性能。

Agentic 终端编码Agentic 编码：FrontierCodeAgentic 编码：CursorBench知识工作：AA-Briefcase

Terminal-Bench 4.0准确率 vs. 成本

Terminal-Bench 4.0 衡量模型在命令行界面中完成复杂的多步骤专业任务的能力。在 Medium effort(Claude 应用中的默认设置)下，Sonnet 5.5 以不到十分之一的单任务成本大幅超越 Sonnet 5 的最佳成绩。

Terminal-Bench 和 OpenAI 均未公开报告 GPT-6 Sol 的性能，因此我们在此报告 GPT-5.6 Sol 的成绩。

FrontierCode v1.1,主集准确率 vs. 成本

FrontierCode 衡量 Agent 的代码改动能否被合并。在 High effort(Claude Platform 上的默认设置)下，Sonnet 5.5 以约五分之一的单任务成本达到 GPT-6 Sol 的最佳成绩。²

CursorBench 4.0准确率 vs. 成本

CursorBench 在取自真实 Cursor 会话的模糊、多文件任务上评估编码 Agent。以 Low effort 运行的 Sonnet 5.5 以不到十分之一的单任务成本超越 Sonnet 5 的最佳成绩。

CursorBench 4.0 未公开报告 GPT-6 Sol 的性能，因此我们在此报告 GPT-5.6 Sol 的成绩。

AA-Briefcase v1.1准确率 vs. 成本

在 AA-Briefcase——一项全新的长时程知识工作基准——上，以 Medium effort 运行的 Sonnet 5.5 以约九分之一的单任务成本超越 Sonnet 5 的最佳成绩。³

### 编码

Sonnet 5.5 的性能跃升在编码领域尤为显著。在 FrontierCode 的 High effort 下，其得分比相同设置下的 Sonnet 5 高出 10 分，而单任务成本约为后者的十五分之一。在 CursorBench——以真实 Cursor 编码会话中的任务测试模型——上，其最佳成绩与 Opus 5.5 的差距在 2 分以内。

早期测试者非常欣赏 Sonnet 5.5 理解 codebase 的速度。其效率也令他们印象深刻：在一对一对比测试中，它比 Sonnet 5 更倾向于将 tool calls 批量执行，从而减少步骤、降低成本。

Epic GamesEveryCodeRabbitSpaceXAIBase44UnityCreatorQuote

> "在 Epic 的早期测试中，Claude Sonnet 5.5 达到了你对更高档位模型所期望的质量标准，在系统设计审计和数据流审查中均表现出色。新模型管理了数万行游戏玩法系统架构代码，响应保持迅捷，能处理长达数小时的任务，并且在更少的指令式提示下即可交付。"

公司Epic Games作者Daniel Vogel,首席运营官引言

> "Claude Sonnet 5.5 表现惊艳。编码速度快，在迭代工作流中能被快速引导。但需要时它也能长时间持续工作。它还带有 Opus 5.5 在自然写作方面的一些升级，这让与它协作更有乐趣。"

公司Every作者Tyler Nishida,设计师引言

> "Claude Sonnet 5.5 在不同复杂度的任务上都展现出比 Sonnet 5 更好的判断力，同时输出 token 消耗显著减少。Sonnet 5 过于频繁调用 web search 的倾向和高 token 消耗，在这个新模型中都已消失。我们计划现在就将简单和中等难度的审查迁移过去，并在未来几周内迁移更多。"

公司CodeRabbit作者David Loker,AI 副总裁引言

> "Claude Sonnet 5.5 在 CursorBench 4.0 上以 55.5% 的成绩实现了前沿级性能，仅次于 Opus 5.5。我们认为它定会受到希望在性能与成本之间取得平衡的开发者的青睐。"

公司SpaceXAI作者Sualeh Asif,ML 总监引言

> "在 118 次真实应用构建中，Claude Sonnet 5.5 构建的应用得分与 Opus 5 持平。它平均每次构建仅需 3.6 次迭代，而 Opus 5 需要 7.7 次。在我们对比的所有模型中，它的 tool call 失败次数最少。它还很少在构建中途停下来向用户提问，因此更少出现构建因等待回复而停滞的情况。"

公司Base44作者Gabriel Grinberg,AI 工程负责人引言

> "在 Unity,我们对任务完成有着很高的标准。项目会被重新打开并在运行时检查结果，因此只有改动真正可用时任务才算完成，而不是模型声称完成就算数。Claude Sonnet 5.5 的大部分工作都通过了这项检查。它还在我们的多步骤 Unity Editor 与编码基准中完成了 90% 的任务，超越了同类模型。"

公司Unity作者Sam Zhang,创意技术专家引言

> “当 Claude Opus 5.5 为一个游戏设定架构和整体框架后，我可以放心地让 Sonnet 5.5 来完成实现。Sonnet 5.5 在处理长时间运行的复杂任务方面的表现令我印象深刻。”
CompanyCreatorAuthorKevin Ngo，创意程序员

### 知识工作

Sonnet 5.5 在知识工作的多个领域均有提升。在 GDPval-AA 上——该基准以横跨 44 种职业和九大主要行业的真实任务测试模型——Sonnet 5.5 的得分与 Opus 5.5 几乎持平，比 Sonnet 5 高出约 400 分。在 computer use 和图表识别方面，它接近 Opus 5.5,在长程知识工作上则明显优于 Sonnet 5 和 GPT-6 Sol。

早期测试者强调了一些难以量化的改进。他们发现它是一个更自然的对话伙伴，并称赞其设计天赋——指出它能为用户界面增添精致感，并能按照幻灯片模板制作几乎无需再编辑的演示文稿。在一次内部测试中，我们向它提供了一家上市公司的季度财报材料和电话会议记录，以及一份幻灯片模板，要求它制作一份 10 页的运营回顾。两位专家认为其初稿可以直接原样发出。
SlackZendeskBalyasny Asset ManagementBoxLovableAtlassianQuote

> “在不更改任何提示词的情况下，Claude Sonnet 5.5 在我们几乎所有的离线 Slackbot 测试中都优于 Sonnet 5,步骤更少，输出 token 约减少 14%。当用户向 Slackbot 下达任务时，质量和速度最为重要，而 Sonnet 5.5 让 Slackbot 能够更快地为用户交付更好的结果。”
CompanySlackAuthorCurtis Allen，首席工程师Quote

> “我们向 Claude Sonnet 5.5 输入了数百个真实的客服用例，涵盖回复和升级请求。与我们目前生产环境中使用的 Claude 模型相比，它做出错误判断的次数更少，解决工单的速度更快。工单处理速度提升了 20%,让客户无需等待即可获得所需帮助。”
CompanyZendeskAuthorAbhinay Kathuria，AI 总监Quote

> “在我们涵盖问答、信息抽取、分析和预测的 2,441 项金融任务私有测试集上，Claude Sonnet 5.5 的得分超过 Sonnet 5,每个回答约使用 121k token,而 Sonnet 5 使用 497k。在我们的分析师搜索与检索工作中，它在几乎所有方面都优于 Sonnet 5。对于高工作量工作流，它是我们测试的七个模型中质量与成本权衡最佳的。”
CompanyBalyasny Asset ManagementAuthorJoe Poirier，高级 AI 工程师Quote

> “Claude Sonnet 5.5 将让我们金融服务和医疗保健领域的客户有信心将其用于最敏感的工作。Sonnet 5.5 会重新核对源文档中的数据，捕捉 Sonnet 5 未能发现的错误。与上一代模型相比，Sonnet 5.5 更准确，速度快 2.4 倍，总 token 使用量减少 12%。”
CompanyBoxAuthorYashodha Bhavnani，AI 产品副总裁Quote

> “Claude Sonnet 5.5 以更少、更稳健的步骤完成思考，开发者等待查看进展的时间更短。我们的编码评测显示，工具调用减少了三分之一，完成任务所需的 shell 运行次数约减少一半。对于日常编码和高强度对话，这意味着更快的迭代和更流畅的构建循环。”
CompanyLovableAuthorFabian Hedin，联合创始人兼 CTOQuote

> “每月有数百万次 Rovo 辅助操作支撑着客户的工作流，执行速度至关重要。Claude Sonnet 5.5 将使团队运行 Rovo Agents 的速度比使用 Sonnet 5 时最快提升 30%。我们很高兴为客户提供这一选择。”
CompanyAtlassianAuthorJamil Valliani，AI 产品负责人

### 成本与速度

定价

| 每 1M token 价格 | **Claude Sonnet 5.5** | Claude Opus 5.5 |
| --- | --- | --- |
| 缓存读取 | $0.20 | $0.20 |
| 缓存写入 | $2.50 | $5 |
| 输入 token | $2 | $4 |
| 输出 token | $10 | $20 |

Sonnet 5.5 完成每项任务所需的 token 比 Sonnet 5 更少，因此运行成本更低。它的输出生成速度还快 30% 以上，效率提升立竿见影:
Prompt:

在一个 HTML 文件中呈现 400 只椋鸟的群体飞舞

Claude Sonnet 5![上一个模型编写椋鸟群飞程序并运行它。](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2Fc3945915dad02168b631b238c900b98b23964539-1600x1000.png%3Frect%3D0%252C0%252C1600%252C1000&w=3840&q=75)

Claude Sonnet 5.5![最新模型编写椋鸟群飞程序并运行它。](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2Fcf0eae4b26b6fbe29e370d300ecac766cb94bc2d-1600x1000.png%3Frect%3D0%252C0%252C1600%252C1000&w=3840&q=75)
提示词:

风塑造沙丘,单个 HTML 文件

Claude Sonnet 5![上一个模型编写沙丘程序并运行它。](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2Fdac9adf55898f7da5fbd40cfb562784289ab9048-1600x1000.png%3Frect%3D0%252C0%252C1600%252C1000&w=3840&q=75)

Claude Sonnet 5.5![最新模型编写沙丘程序并运行它。](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2Fd71a0217af7efe761f190d4bceea9a38e9a7dbad-1600x1000.png%3Frect%3D0%252C0%252C1600%252C1000&w=3840&q=75)
提示词:

由 24 个小时钟组成的时钟,单个 HTML 文件

Claude Sonnet 5![上一个模型编写时钟钟阵程序并运行它。](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2F21053b0cbc6e93a7388f173ed8fb3bd4bb2ed85b-1600x1000.png%3Frect%3D0%252C0%252C1600%252C1000&w=3840&q=75)

Claude Sonnet 5.5![最新模型编写时钟钟阵程序并运行它。](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2Fb521482c2a09be87ac40f01e8949c216c426eeaa-1600x1000.png%3Frect%3D0%252C0%252C1600%252C1000&w=3840&q=75)

调整 [effort level(努力程度)](https://academy.claude.com/tutorials/choosing-the-right-effort-level-in-claude-code)可让您在成本、速度与整体质量之间取得平衡。在 Claude Code 和我们的应用中,默认努力程度为 Medium,而 Claude Platform 默认为 High。在较低的设置下,Claude 回答更快、消耗的 token 更少,适合日常例行工作;在较高的设置下,Claude 会进行更长时间的推理,并更彻底地检查自己的工作。

### 安全性

#### 对齐

Sonnet 5.5 并未推进我们模型能力的前沿,因此我们的对齐评估聚焦于一组针对性的风险,这些风险适用于任何能力水平的模型,包括违背用户利益、误导用户以及配合高风险的滥用行为。

在我们的自动化行为审计(该审计在大约 1,850 个场景中对 Claude 进行测试)中,Sonnet 5.5 在对齐、抵御滥用和诚实性方面的大多数指标上均优于或持平于 Sonnet 5。在我们较新的遏制(containment)评估中,Sonnet 5.5 在试图逃离 sandbox 的频率方面接近我们所测试的最佳模型 Opus 5.5,并且在我们所有模型中,它最不可能探测自身容器的边界限制。在整项审计中,Opus 5.5 的整体表现仍略胜一筹,但我们没有发现任何证据表明 Sonnet 5.5 会追求与用户意图相冲突的目标。

正如我们在[最近的对齐评估](https://www.anthropic.com/research/alignment-assessment-cybersecurity-incidents)中所述,没有任何一组评估能够可靠地捕捉到所有失效情况,Sonnet 5.5 可能还存在我们尚未发现的倾向——这正是我们要将自身的对齐工作与下述安全保障措施相结合的原因。

#### 安全保障

**网络安全。** Sonnet 5.5 的网络攻防能力较 Sonnet 5 有大幅提升,因此我们部署它时采用了与 Opus 5.5 类似的安全保障措施。用户仍然可以在日常软件开发过程中查找并修复代码中的 bug,但较高风险的网络安全任务将明显回落到 Sonnet 5 上。不久之后,网络防御人员将可以申请加入我们扩展后的 [Cyber Verification Program(网络安全验证计划)](https://support.claude.com/en/articles/14604842-real-time-cyber-safeguards-on-claude-opus-and-sonnet),以分级方式获得 Sonnet 5.5、Opus 5.5 以及 Claude Mythos 模型上更高级的能力。

**生物学。** Sonnet 5.5 采用了与 Sonnet 5 相同的一套生物学安全防护措施。这些措施针对有害请求；大多数研究、教育和临床工作不受影响，不过部分微生物学和病毒学方面的请求可能被误报。组织可以申请加入我们的 [Life Sciences Verification Program](https://www.anthropic.com/news/life-sciences-verification-program),以获得专为生物学相关工作的完整广度而设计的安全防护。

**蒸馏(Distillation)。** 蒸馏攻击是指攻击者利用数千个虚假账户以工业规模提取模型能力，使恶意行为者能够绕过我们内置在 Claude 中的安全防护来创建能力强大的模型。由于 Sonnet 5.5 比其前代模型强大得多，它是首个在发布时配备防止推理提取(reasoning extraction)安全分类器的 Sonnet 模型。Sonnet 5.5 还扩展了 [preserved thinking](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking),使 Claude 的思考过程无法与创建它的账户解耦。大多数开发者不会察觉到任何变化。如果你需要在账户之间移动对话，包括在 Claude Code 中途切换账户，我们的[文档](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking)解释了这一变化。

### 快速上手

与 Opus 5.5 和 Sonnet 5 一样，Claude Sonnet 5.5 支持零数据保留(zero data retention)。

Claude Sonnet 5.5 现已在所有平台上可用，包括 Amazon Web Services、Google Cloud 和 Microsoft Azure。开发者可以在 Claude Platform 上使用 `claude-sonnet-5-5` 开始使用。如果你在关闭 thinking 的情况下运行 Sonnet,在迁移到 Sonnet 5.5 之前，你需要切换到新的 `between_tools` 设置，该设置会保持前置 thinking 处于关闭状态。详情请参阅我们的[迁移指南](https://platform.claude.com/docs/en/models/sonnet-5-5/migration-guide#turn-thinking-off)。

### 脚注

1 Terminal-Bench 4.0 的结果报告的是 Claude Opus 5.5 在 Xhigh effort 档位下的成绩，这是该模型的最高得分。

2 Sonnet 5.5 在 Max effort 档位下的得分低于 Xhigh 档位。FrontierCode 评估的是一次代码更改能否在无需人工修改的情况下被合并。它会对超出范围的更改进行惩罚，即使这些更改质量很高或有帮助。在 Max effort 档位下，Sonnet 5.5 更频繁地运行了 Claude Code 的 code-review skill,该 skill 会将审查拆分给许多 subagent;在 Cognition 检查的两个案例中，这导致了超时或超出任务范围的额外编辑，因此得分更低。

3 Artificial Analysis 在 Claude Platform 上 Sonnet 5.5 的预发布部署上运行了 GDPval-AA 和 AA-Briefcase,我们发现该部署存在一个 bug,可能会降低对使用 structured outputs 的请求的响应质量。我们预计该 bug 对 Sonnet 5.5 得分的影响(如果有的话)很小，且会导致其性能被低估。该 bug 此后已被修复。

4 OpenAI 最近修复了一个会降低 GPT-6 Sol 图像理解能力的 bug。Artificial Analysis 给出的官方 AA-Briefcase v1.1 和 GDPval-AA v2.1 分数，以及 Surge AI 给出的 Chartography 分数，可能尚未更新以反映该模型的最新版本。Artificial Analysis 预计 AA-Briefcase v1.1 和 GDPval-AA v2.1 不会受到重大影响。对 Chartography 的内部测试表明其分数未受影响。
