---
title: "Anthropic 发布 Claude Fable 5.2 与 Mythos 5.2：8 天手搓操作系统、30 小时证完费马大定理，提速 30% 且百万 token 降至 $8/$40"
date: 2026-11-10T00:00:00.000Z
tags: ["产品发布", "Anthropic", "Claude Fable 5.2", "Claude Mythos 5.2", "AI Agent", "大模型评测", "聚合"]
summary: "Fable 5.2 面向全平台开放、Mythos 5.2 定向赋能安全与生命科学，15 项基准、5 张成本曲线与 4 段实机演示完整拆解"
---
> **原文链接**: [https://www.anthropic.com/claude-fable-and-mythos-5-2](https://www.anthropic.com/claude-fable-and-mythos-5-2)
> **来源**: www.anthropic.com
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/claude-fable-and-mythos-5-2/) · 2026/11/10
> **说明**: 本文由 AIHot汪 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

2026 年 11 月 9 日

## Claude Fable 5.2 和 Mythos 5.2

我们对 Claude Fable 和 Claude Mythos 进行了升级——这两款模型旨在应对最艰巨的技术挑战。

Claude Fable 5.2 和 Claude Mythos 5.2 在编码、推理和视觉等领域均有所提升。在预发布测试期间，它们帮助我们的工程师完成了原本难以实现的软件迁移，从零开始设计了三种可工作的电子设备，解决了两个关于黑洞物理学的开放性问题，在机器人评估方面取得了实质性进展，并在 30 小时内形式化了费马大定理的证明——此外还有我们将在下文讨论的许多其他应用。

Claude Fable 和 Claude Mythos 基于相同的底层模型。Fable 具备强大的网络安全和生物学安全护栏，以防止滥用，这使得我们能够向所有用户开放它。致力于网络安全或生物医学研究等有益应用的组织，可以通过我们最近扩展的 [Life Sciences](https://claude.com/form/life-sciences-verification-program) 和 [Cyber](https://support.claude.com/en/articles/14604842-cyber-verification-program) 验证计划申请访问 Mythos。

测试人员发现，Fable 5.2 和 Mythos 5.2 的沟通比以往的 Fable 和 Mythos 模型更加清晰。它们的输出速度比 Claude Fable 5.1 和 Claude Mythos 5.1 快高达 30%，并且价格更低：每百万输入 token 8 美元，每百万输出 token 40 美元。

Fable 5.2 和 Mythos 5.2 还附带一个可选的快速模式，可将 token 生成速度提高高达 2.5 倍。快速模式的价格为每百万输入 token 16 美元，每百万输出 token 80 美元。

**安全性和对齐。** 为了确保安全性和对齐能力能够跟上模型能力的增长，我们对构成 Fable 5.2 和 Mythos 5.2 的底层模型进行了广泛的预发布安全测试。这包括开发新颖的评估方法，以更深入地了解沙箱逃逸等特定令人担忧的行为。我们认为，由不对齐引发的高风险仍然很低，并且在大多数对齐指标上，该模型的表现与我们最近的模型持平或更优。Fable 5.2 的网络安全和生物学安全护栏与 Fable 5.1 一样稳健，但产生的误报拦截更少，并且我们实施了迄今为止最强的针对蒸馏攻击的保护措施。

我们在下文更详细地描述了我们的安全测试，完整细节可在 [Claude Fable 5.2 and Mythos 5.2 System Card](https://www.anthropic.com/document/claude-fable-5-2-mythos-5-2-system-card) 中找到。

**何时使用 Claude Fable 5.2 和 Mythos 5.2。** Fable 和 Mythos 最适合最具野心、最开放-ended 的技术工作。对于大多数编码和知识任务，我们建议用户从 Claude Opus 5.5（我们最强的日常主力模型）开始，然后根据工作的范围和复杂性，按需切换到其他模型——向上切换到 Fable 或 Mythos，或向下切换到 Claude Sonnet 5.5 或 Claude Haiku 5.5。Fable 5.2 还可以扮演 [Advisor](https://code.claude.com/docs/en/advisor)（Haiku、Sonnet 或 Opus 模型向其咨询以解决更困难的问题）或 [Orchestrator](https://platform.claude.com/docs/en/managed-agents/multiagent-orchestration)（它将较简单的任务委托给较小的模型）的角色。

### 评估 Claude Fable 5.2 和 Mythos 5.2

**基准表现。** 下面的基准表显示，Claude Fable 5.2 和 Mythos 5.2 在我们评估的几乎所有能力上都优于 Opus 5.5：

|  | Fable 5.2 | Fable 5.1 | Opus 5.5 | GPT-6 Astra | Gemini 4 Carbon |
| --- | --- | --- | --- | --- | --- |
| 代理式编码 FrontierCode 2.0 |  |
| 代理式编码 FrontierCode 2.0 | 49.1% 高努力 | 32.4% 高努力 | 45.5% | 42.8% | 41.1% 中等努力 |
| 代理式编码 FrontierSWE v2 |  |
| 代理式编码 FrontierSWE v2 | 69.9% | 56.3% | 62.3% | 65.5% | 61.2% |
| 业务流程 AutomationBench |  |
| 业务流程 AutomationBench | 51.4% | 31.4% | 42.5% | 41.4% | 53.9% |
| 代理式科学研究 Terminal-Bench-Science 0.1 |  |
| 代理式科学研究 Terminal-Bench-Science 0.1 | 74.6% 75.3% (Mythos 5.2) | 52.6% | 58.7% | 68.1% | 64.8% |
| 网络安全 CyScenarioBench† |  |
| 网络安全 CyScenarioBench† | 76.3% Mythos 5.2 | 61.7% Mythos 5.1 | 67.6% 无安全护栏 | 61% GPT-6 Cyber | — |
| 网络安全 CVE Rediscovery |  |
| 网络安全 CVE Rediscovery | 89.6% Mythos 5.2 | 78.3% Mythos 5.1 | 81.3% 无安全护栏 | — | — |
| 蛋白质设计 从头结合蛋白设计 (24 小时) |  |
| 蛋白质设计 从头结合蛋白设计 (24 小时) | 85.1% Mythos 5.2 | 79.1% Mythos 5.1 | 82.6% 无安全护栏 | — | — |
| 代理式搜索 WANDR (宽松评分) |  |
| 代理式搜索 WANDR (宽松评分) | 82.1% | 68.7% | 72.3% | — | — |
| 计算机使用 OSWorld 2.1 (离线集，部分) |  |
| 计算机使用 OSWorld 2.1 (离线集，部分) | 89.3% | 83.5% | 87.2% | 79.5% | 81.5% |
| 机器人 RoboDojo Sim‡ |  |
| 机器人 RoboDojo Sim‡ | 64.9% | 27.6% | 39.4% | 29.8% | — |
| 知识工作 AA-Briefcase v1.1 |  |
| 知识工作 AA-Briefcase v1.1 | 66.1% 评分标准 | 61.5% 评分标准 | 61.2% 评分标准 | 52.0% 评分标准 | 61.8% 评分标准 |
| 1785 Elo | 1669 Elo | 1800 Elo | 1569 Elo | 1611 Elo |
| 知识工作 远程劳动力指数 (RLI) |  |
| 知识工作 远程劳动力指数 (RLI) | 41.3% 高努力 | 17.9% | 21.3% | 20.8% | — |
| 多学科推理 Humanity’s Last Exam (带工具) |  |
| 多学科推理 Humanity’s Last Exam (带工具) | 74.2% | 65.6% | 67.7% | 57.2% | — |
| 视觉图表识别 Chartography (无工具) |  |
| 视觉图表识别 Chartography (无工具) | 73.4% | 44.8% | 64.4% | 71.0% | 72.5% |

有关评估方法的详细信息，请参阅 [Claude Fable 5.2 and Claude Mythos 5.2 System Card](https://www.anthropic.com/document/claude-fable-5-2-mythos-5-2-system-card)。除非另有说明，Fable 5.2、Fable 5.1 和 Opus 5.5 的分数均显示开启安全保护措施后的结果。除非另有说明，所有分数均显示每个模型在最高可用努力级别（highest-available effort）下的表现。† 在 CyScenarioBench 上，每个实验室的分数基于独特的任务。‡ RoboDojo Sim 显示最高可用努力级别，且为内部运行。

**努力级别与效率。** 在中等努力级别（Medium effort，Claude 应用和 Claude Code 中的默认设置）下，Fable 5.2 可以使用比 Fable 5.1 更少的 token 来完成具有挑战性的任务。在 FrontierCode 2.0 评估的早期测试中，Fable 5.2 在高努力级别（High effort）下的得分与 Opus 5.5 在最大努力级别（Max effort）下的得分大致持平，但每项任务的成本约为后者的一半。在极高努力级别（Xhigh effort）下，它也是所有已发布测试模型中得分最高的。

Agentic coding: FrontierCode 2.0
Agentic search: WANDR
Hardware engineering: BenchCAD 2.1
Multidisciplinary reasoning: Humanity’s Last Exam
Visual chart recognition: Chartography

FrontierCode 2.0 准确率与成本

FrontierCode 衡量的是模型生成的代码更改是否会被开源仓库的维护者合并。在高努力级别下，Fable 5.2 的得分与 Opus 5.5 的最高得分（45.3% vs. 45.5%）大致相同，但每项任务的成本约为后者的一半，且高于 GPT-6 Astra 的最高得分（42.8%），成本大致相同。在极高努力级别下，Fable 5.2 达到 49.1%，这是我们测试过的所有已发布模型中的最高分。

WANDR（宽松分数）准确率与成本

Perplexity 的 WANDR 基准测试在大型数据收集任务中评估 Agent。在中等努力级别下，Fable 5.2 的得分与 Opus 5.5 的最高得分持平，但每项任务的成本约为后者的 40%。

BenchCAD 2.1（带工具）准确率与成本

BenchCAD 2.1 衡量硬件工程能力，具体评估模型的 designs 与参考几何形状和电路的匹配程度，评分范围为 0–100，包含部分得分。在最大努力级别下，Fable 5.2 得分为 83.5，高于 Opus 5.5（65.3）和 Fable 5.1（44.4）。

Humanity’s Last Exam（带工具）准确率与成本

Humanity’s Last Exam (HLE) 是一项测试专家级学术知识和推理能力的考试。在低努力级别下，Fable 5.2 的得分与 Opus 5.5 的最高得分持平，但每项任务的成本不到后者的十分之一。

Chartography（无工具）准确率与成本

Chartography 测试模型读取图表和图形的准确性。在中等努力级别下，Fable 5.2 得分为 66.4%，高于 Opus 5.5 在最大努力级别下的得分（64.4%），且每项任务的成本不到后者的十分之一。

### 编码

目前，Anthropic 核心代码库中超过 90% 的合并更改均由 Claude 编写（在人类指导下）。我们使用 Fable 5.2 在几分钟内修复了顽固的 bug，优化了我们所有服务的性能，并完成了那些原本因速度过慢或成本过高而无法尝试的高价值软件项目。一个由 Agent 组成的团队运行早期版本的 Fable 5.2，将一项关键的生产服务从 Python 迁移到 Rust——该服务现在效率更高、更可靠，启动速度提高了约 26 倍。我们发现，Fable 5.2 展现出强大的工程判断力，即使面对模糊的请求也能产生高质量的结果。

作为一次实验，Anthropic 的一位工程师赋予 Fable 5.2 设计原型操作系统的任务。从一个空文件夹开始，该模型协调了超过 1,000 个子 Agent，全天候工作八天，进行编写、测试和审查代码的工作。它最终产出了一个可在笔记本电脑上启动的工作操作系统，拥有自己的核心（运行机器）、磁盘/键盘/网络驱动程序、永久文件存储、窗口、登录屏幕、安装程序以及内置的 Claude 功能（见下方视频）。

[视频/音频](https://cdn.sanity.io/files/4zrzovbb/website/36cbf7ed8431034d95a61bc6757fa975b26f0daf.webm)

早期测试人员对 Fable 5.2 的编码技能能够成功应用于广泛任务印象深刻：

Vercel
Shopify
Datadog
Unity
Uber
Oracle
iGent
Snowflake
Cognition
Quote

> “这个模型就像在我的脑海里。它理解我给出的每个提示背后的意图。我从未说过‘不，我的意思是……’。我们与其他模型一起推进了数周的项目，在几天内就使用 Claude Fable 5.2 完成并获得了队友的批准，而且审查其代码的人类评论也少了很多。”
公司 Vercel
作者 Joe Haddad，技术团队成员
Quote

> “Claude Fable 5.2 非常适合用于梳理初步想法并进行完善。它的回答经过深思熟虑，通常只需经过几次交互，我就能几乎肯定地说‘好，去执行吧’，并相信它能在极少干预的情况下完成任务。这感觉就像是在与另一位资深工程师合作。”
公司：Shopify
作者：Tom Pritchard，资深工程师
引用

> “你可以直接将 Claude Fable 5.2 应用于它从未见过的、模糊的新系统，它会自行弄清楚如何在其内部实际运作。这几乎就像一位事件指挥官，能够派遣更快的模型来获取快速信号并进行协调，从而将我作为操作员的负担减轻。”
公司：Datadog
作者：Matt Lee，高级资深工程师
引用

> “Claude Fable 5.2 能够完成之前模型难以胜任的任务。目前最清晰的例子是从头构建更高质量的 3D 场景，以及根据视觉参考重建体验。它在较难的游戏开发任务中表现非常出色，因为它会不断迭代和改进，而不是陷入停滞。”
公司：Unity
作者：Sam Zhang，创意技术专家
引用

> “我让 Claude Fable 5.2 运行了一次 10–12 小时的安全审计。它派出了约 170 个审查代理，并返回了报告、修复拉取请求和政策提案。它会一直工作直到任务真正完成，而不是在看似合理的检查点停止。它的自我纠错能力以及对不足之处的诚实态度令我印象深刻。在高投入场景下，我会用它来替代我目前用于长时间无人值守审计和文档密集型工作的模型。”
公司：Uber
作者：Andrew Mager，资深工程师，智能体系统
引用

> “在一次结合国家债务摘要、还款历史和区域基准的测试中，Claude Fable 5.2 生成的 SQL 返回了预期结果。另外两个模型生成的 SQL 虽然也能成功运行，但错误地汇总了国家级别的摘要金额，产生的数值是预期值的 5–8 倍。能够准确完成这些业务计算，正是我们认为在生成企业级 SQL 时使用 Fable 5.2 有价值的原因。”
公司：Oracle
作者：Liyu Gong，机器学习高级经理
引用

> “在一次会话中，Claude Fable 5.2 构建了一个 hypervisor（虚拟机监视器），即用于隔离共享同一台物理机的虚拟计算机的软件。其核心部分经过数学证明，能够确保它们彼此隔离。超过 3,500 个机器验证的证明覆盖了所有情况，而不仅仅是你测试的那些情况。这是我见过的第一个能将如此庞大的问题分解为可证明的部分、将其组合起来，并持续承担更雄心勃勃工作的模型。与 Fable 5.1 相比，这是一次非常明显的升级。”
公司：iGent
作者：Sean Ward，联合创始人兼首席执行官
引用

> “Claude Fable 5.2 在我们开源的包含 103 个数据工程任务的基准测试 data-eng-bench 上，是我们测量过的最强模型。它在重复运行中一致地解决了任务，并通过了我们给出的所有交互式编码任务。”
公司：Snowflake
作者：Bala Kasiviswanathan，AI 和开发者体验副总裁
引用

> “Claude Fable 5.2 在不知道某些事情时会直接说明，而不是产生幻觉。有一次它告诉我之前的估算有误，并表示在测量变化之前不会给出数字。非常令人印象深刻！”
公司：Cognition
作者：Adhyyan Sekhsaria，技术团队成员

### 网络安全

Claude Mythos 5.2 是我们最强大的网络安全工程模型。它能发现比之前模型更多的漏洞，并且在复现和修复这些漏洞方面表现更佳（请注意，Claude Fable 5.2 的安全措施会阻止大多数与网络安全相关的任务）。一家安全公司发现，Claude Mythos 5.2 发现的已确认漏洞中，有六分之一被他们测试的所有其他前沿模型遗漏。在我们的内部评估 CVE Rediscovery¹ 中，Claude Mythos 5.2 发现的漏洞比 Claude Opus 5.5 多 10.2%，比 Claude Mythos 5.1 多 14.4%。Claude Mythos 5.2 还表现出更好的判断力和校准能力——一位测试者发现，之前的模型高估了约 1/20 的发现严重性，而 Claude Mythos 5.2 没有高估任何一项。²

CVE Rediscovery：准确率与成本

CVE Rediscovery（CVE 重新发现）是一项内部网络安全评估，旨在衡量模型在获得 CVE（通用漏洞和披露）修复前的项目快照时，能够独立发现多少已发布的 CVE。我们在 2026 年 10 月针对 1,829 个 CVE 进行的测试显示，Claude Mythos 5.2 在所有努力层级（effort level）上均优于 Claude Mythos 5.1 和 Claude Opus 5.5。

Claude Mythos 5.2 的网络安全能力可通过我们的 [Cyber Verification Program](https://support.claude.com/en/articles/14604842-cyber-verification-program) 访问，该计划正在不断扩展和改进。Claude Enterprise 客户（即使不是 Cyber Verification Program 的成员）可以访问 [Claude Security](https://claude.com/product/claude-security)，它使用我们最强大的模型扫描代码库中的漏洞——现在包括 Claude Mythos 5.2。[Claude Security 的最新更新](https://claude.com/resources/articles/claude-security-now-scans-continuously-and-tracks-fixes) 使其能够：在代码更新时监视仓库、跟踪任何发现以确保其得到修复、从额外上下文中学习，并通过 API 和 MCP 连接到用户的工具。

Rubrik

> “我们与 Anthropic 的新模型 Claude Mythos 5.2 密切合作，在我们自己的系统中进行下一轮高保真度的威胁发现和消除，以解决早期 Mythos 模型未能发现的可能问题。输出结果更具可读性，使我们的团队能够更快、更轻松地抽查。我们使用 Mythos 5.1 构建了 Code Guardian 框架，我们将切换到 Mythos 5.2，以向客户提供更强大的网络安全能力。”
公司 Rubrik 作者 Arvind Nithrakashyap，联合创始人兼首席技术官

> “Claude Mythos 5.2 非常出色。我们全年与 Anthropic 团队密切合作，利用历代 Claude 模型加固 Firefox，每一轮测试都使需要发现的漏洞变得更少、更细微。即便如此，Mythos 5.2 在各自的扫描活动中将漏洞发现指标大致提高了一倍。”
公司 Mozilla 作者 Brian Grinstead，杰出工程师

### 科学与工程

科学、工程和数学领域的重要任务越来越依赖于编码：分析数据、模拟分子、设计部件和控制仪器都是通过软件完成的。下文我们将讨论 Claude Fable 5.2 和 Claude Mythos 5.2 如何帮助研究人员在这些领域的难题上取得进展。

#### 理论物理

Claude Fable 5.2 解决了理论物理学中的两个开放性问题。这两个问题都涉及黑洞，以及统一现代物理学两大基石理论——相对论和量子力学的努力。

Claude 的两个结果都依赖于全息对偶性（holographic duality），即某些包含引力的宇宙可以由完全不包含引力的量子理论精确描述。在第一个问题中，物理学家在 1983 年表明，随着这些宇宙升温，黑洞会突然形成，就像水沸腾一样；但他们的方法仅适用于足够大、足以应用相对论的大宇宙。2003 年提出了一项计算，以确定在仅能使用量子描述的小宇宙中是否同样如此，但该计算过于繁琐而无法完成。Fable 5.2 在很大程度上自主完成了该计算，并发现那里的过渡也是突然的。在第二个问题中，Fable 5.2 找到了一个精确极限，物理学家在过去 15 多年中一直使用该技术在一个简化宇宙中排除量子引力的候选理论。在各自的预印本中阅读更多关于这些结果的详细信息，[点击这里](https://hexagonmath.org/2611.00175v1) 和 [点击这里](https://hexagonmath.org/2611.00174v1)。

#### 蛋白质折叠

腺相关病毒（Adeno-associated viruses）是小型无害病毒，其蛋白质外壳（衣壳，*capsid*）可用于递送基因疗法。衣壳的蛋白质结构非常重要——例如，它会影响疗法是否会被患者的免疫系统阻断——但它也非常复杂。现有的蛋白质折叠模型（如 AlphaFold）可以预测单个蛋白质，但衣壳由数十个蛋白质组成。基于两个开源蛋白质折叠模型，Claude Mythos 5.2 找到了一种新颖的方法来准确预测整个衣壳的结构。它编写了代码，在重叠的蛋白质链组上运行这些模型，并利用关于衣壳已知对称性的信息将它们合并在一起。

[视频/音频](https://cdn.sanity.io/files/4zrzovbb/website/e35c7ec272d23ba30b360fa1130e5fc03d0f26cc.webm)

Claude 的方法在多种衣壳（capsids）上均取得了成功，包括天然和工程改造的衣壳（在我们的测试中，它准确地模拟了所尝试的 34 种衣壳中的 28 种）。³ 三位计算生物学家分享了他们对如何利用 Claude 的技能来加速基因疗法研究的反思：

Dyno Therapeutics | Columbia University | Biohub

> “这种加速可以为我们衣壳折叠流程节省大量时间和成本，使我们能够更有效地将计算资源部署到遗传药物所需的多种衣壳特性上。我们很高兴能帮助 Anthropic 进一步推推理能力，从而降低整体衣壳设计的成本。”
>
> 公司：Dyno Therapeutics
> 作者：Sam Sinai，联合创始人兼 AI 负责人

> “大型蛋白质组装体（包括衣壳）仍然是蛋白质建模中的一个未解之谜，原因在于准确预测和定位数十个独立大分子的结构非常复杂，更不用说涉及的计算成本极其高昂。Claude 的方法巧妙地解决了对称组装体的这一问题，使得个人科学家能够在个人工作站上对原本需要专用集群才能建模的系统进行建模。”
>
> 公司：Columbia University
> 作者：Mohammed AlQuraishi，系统生物学与计算机科学助理教授

> “Biohub 开源 ESMFold2 的目标是使科学界能够基于其所学到的生物学知识进行构建。我们很高兴看到 Claude 原型化了一种新的采样过程，该过程能够预测大型对称复合物（如用于递送基因疗法的 AAV 衣壳）。我们将继续纳入社区中那些将我们的工具扩展到重要应用领域的贡献。”
>
> 公司：Biohub
> 作者：Zeming Lin，首席研究科学家

#### 数学

**数学形式化。** 形式化是将数学证明转换为计算机可以逐步检查的语言的过程。它可以帮助数学家在不手动检查的情况下对结果建立信心（当 AI 模型生成难以由人类验证的结果时，这一点尤为重要）。由于形式化是一个极其繁琐的过程，如果 AI 能协助完成这项工作，数学家就可以花更多时间探索新颖的想法。

我们首次 [对费马大定理的形式化](https://www.anthropic.com/research/formalizing-fermats-last-theorem) 由 Claude 的一个未发布的研究版本完成，耗时 11 天。它依赖于专门构建的框架以及人类研究人员的指导。相比之下，由 1,000 个 Fable 5.2 智能体组成的团队仅用 30 小时就完全形式化了该定理，且几乎不需要人工干预。Fable 5.2 从最少的提示开始，自行构建了协调方式，并未使用任何数学参考资料，仅使用了一系列中间定理陈述来评估进度。它所需的动作 token 数量仅为我们要首次形式化的三分之一，且生成的证明长度缩短了七倍。如下图所示，Opus 5.5（使用相同的 1,000 智能体设置）在 18 小时内仅完成了 26% 的形式化工作，且在 30 小时后几乎没有任何进展。

[在此处](https://claude.dev/blog/safely-scaling-multi-agent-teams-with-fable-5-2/) 阅读更多关于形式化的内容。

费马大定理证明形式化随时间的完成情况

在数学编程语言 Lean 中对费马大定理的证明进行形式化。每条线显示了 Fable 5.2（绿线）和 Opus 5.5（橙线）在 30 小时内，每个模型每次运行使用约 1,000 个智能体所完成的全部形式化的比例。在虚线处（18 小时），两个团队从上次保存点恢复，继续运行了 12 小时。

#### 硬件与机器人

AI 的许多潜在益处——例如加速实验室研究——取决于其在物理世界中行动的能力。Claude Fable 5.2 延续了我们的模型在 [现实世界](https://www.anthropic.com/research/project-vend-2) 中 [日益增强实用性](https://www.anthropic.com/news/model-hardware-standard-research-preview) 的趋势，在设计硬件设备和控制物理机器人方面取得了显著进展。

**硬件工程。** 我们测试了 Fable 5.2 在硬件工程方面的技能，通过一段式提示要求它设计并制造三个具备电路板、3D 打印外壳和软件的工作电子设备。如下所示，这些设备包括一个家庭语音助手集线器、一个 USB 免提扬声器和一个手持虚拟宠物。我们与此项目中的 [Diode](https://www.diode.computer/) 公司进行了合作，该公司专门设计和制造电路板。

[视频/音频](https://cdn.sanity.io/files/4zrzovbb/website/f079d087caf0316cf32a0e3e1864311c16887395.webm)

Claude 自行编写了规格说明，从美国分销商处选择了可用的电子元件，为每个设备设计了四层电路板，使用计算机辅助设计（CAD）对外壳进行了建模，并为设备编写了软件。每块电路板在几乎无需人工干预的情况下，一天内即可准备好投入制造。Diode 制造完电路板后，Claude 指导该公司的工程师完成了设备的测试和组装。所有三个设备均无需任何电气修改即可正常工作。阅读更多关于 Claude 硬件工程技能的详情 [此处](https://www.anthropic.com/research/claude-electronics-design)。

**机器人技术。** 与早期的 Claude 模型相比，Fable 5.2 在控制实体机器人方面显示出显著改进的技能——即使是在它从未明确训练过的机器人任务上也是如此。下面的视频展示了由 Fable 5.2 控制的机器人完成的各种任务，包括解开魔方、拧开瓶盖以及绘制机器人的图像。在公共 [RoboDojo](https://robodojo-benchmark.com/) 基准测试中（该测试评估 AI 如何根据摄像头图像控制模拟双臂机器人），Fable 5.2 的表现优于在同一框架下运行的其他前沿模型，也优于大多数专为控制机器人而构建的 AI 系统。

[视频/音频](https://cdn.sanity.io/files/4zrzovbb/website/55746b9b0dd3e76d36a38998162cc852d5f92edc.webm)

RoboDojo（平均值）各模型最高得分

- Gemini 4 Argon
- GPT-6 Astra
- **Fable 5.1**
- **Opus 5.5**
- **Fable 5.2**

RoboDojo Sim 测试对模拟双臂机器人的控制能力。分数基于我们使用最高可用努力级别对每个模型进行的内部运行。在最大努力级别下，Fable 5.2 得分为 64.9%，是 GPT-6 Astra（29.8%）和 Fable 5.1（27.6%）的两倍以上。

### 研究与分析

早期使用 Claude Fable 5.2 进行研究和分析任务的用户发现，它能够处理比先前模型更模糊、数据量更大的任务，并且在模糊任务上具有更好的判断力——特别是那些需要抽象推理和设计能力的任务。自营交易公司 Jump Trading 在类似于其量化研究任务的代理评估中测试了 Fable 5.2，将其嵌入到类似于该公司用于自身研究的框架中。在一次运行中，Fable 5.2 有效地扮演了所有必要角色：代码编写者、协调者、规划者和任务提交者。之前的模型需要投入大量时间手动重新平衡角色，以适应不同模型的优缺点。

其他来自研究和分析机构的用户向我们发送了以下关于他们使用 Fable 5.2 体验的声明：
Jump TradingBalyasny 资产管理Discovered MaterialsIMCHarveyFundamental Research LabsXTX MarketsBoxQuote

> “Claude Fable 5.2 在研究系统中的每一个主要角色中都表现出色：定义问题、解释、协调，以及寻找和实施关键思想。在品味和判断力方面，它绝对是我们要见过的最强模型之一。在内部研究自动化基准测试中，它的错误率比下一个最佳模型低整整 10%。”
公司Jump Trading作者Lucas Baker, LLM 研发主管Quote

> “在最近的一次评估中，我们要求 Claude Fable 5.2 调查一个组织如何在其核心技术系统中测试新集成。它将答案追溯到了正确的来源，并且没有夸大证据所显示的内容。它还指出，问题的表述方式可能会产生误导。在投资研究中，这种克制明确了哪些部分仍然未知，以及市场可能在何处错误定价风险或机会。”
公司Balyasny 资产管理作者Ashish Malik, AI 研究员Quote

> “声子计算是计算材料科学中最耗时的常规步骤之一，这也是为什么实验室在筛选新材料时经常跳过稳定性检查。Claude Fable 5.2 在相同的 GPU 上使 Quantum ESPRESSO 的声子代码平均速度提高了约 36 倍，将我们的 13 个基准案例从 3.3 小时缩短到不到 4 分钟。这比 Fable 5.1 的速度提升还要快 3–4 倍。”
公司：Discovered Materials
作者：Akash Ramdas，联合创始人
引用

> “通过 Fable 5.1，我们看到了模型提出真正创新研究思路的初步迹象。Claude Fable 5.2 延续了这一趋势。它展现了我们对其在 Fable 5.1 中印象深刻的洞察力，随后又提出了一个全新的、完全不同的角度。在我们已完成的四个量化研究问题中，它在其中三个问题上取得了新的最佳成绩。我们希望将其用于高影响力、长周期的研究任务，或用于协调其他模型组成的团队。”
公司：IMC
作者：Marquis Wong，首席 AI 工程师
引用

> “在 I-9 合规性审查中，Claude Fable 5.2 比 Fable 5.1 为客户提供了更清晰的指导。它确定了需要立即关注的员工，并解释了如何纠正每个问题以及由谁采取行动。这是模型提供实用法律指导能力的令人兴奋的进步。”
公司：Harvey
作者：Niko Grupen，AI 研究主管
引用

> “在一个任务中，Claude Fable 5.2 必须从公司的 10-K 文件中提取财务数据以输入预测模型，而模板并未说明某项指标应该是报告数值还是计算数值。它根据单元格格式推断出作者的意图，发现区域数字之和与报告总额不符，并正确填写了每一个单元格。像这样更好的判断能力是它在我们的评估中获得 91% 得分的主要原因，而表现次优的模型得分为 86%。”
公司：Fundamental Research Labs
作者：Jeffrey Liu，技术团队成员
引用

> “在我们的量化研究工作中，Claude Fable 5.2 相比 Fable 5.1 带来了非常显著的提升，特别是在多个协调 Agent 的设置下。其数学研究能力也代表了另一项有意义的进步。”
公司：XTX Markets
作者：Alex Gerko，创始人兼首席执行官
引用

> “在将 AI 应用于工作流之前，你需要信任其方法和结论。在我们的测试中，Claude Fable 5.2 识别出不一致之处，利用整个文档集的背景信息，并根据相关证据调整建议。例如，在审查贷款申请附带文件时，它指出工资存款与银行对账单余额不匹配，因此承保人可以专注于需要检查的内容。”
公司：Box
作者：Yashodha Bhavnani，AI 产品副总裁

### 安全与对齐

没有任何单一测试能够告诉我们一个高度强大的模型在部署后将如何表现，因此在发布之前，我们依赖多种不同的测试和多种不同类型的证据。对于支撑 Claude Fable 5.2 和 Claude Mythos 5.2 的模型，我们的部署前安全工作包括对齐训练和测试、针对模型采取无益行为倾向的新设计评估、加强防止滥用的保障措施，以及扩大行为监控规模。该模型在发布前还由外部评估人员进行测试，包括 [UK AI Security Institute](https://www.aisi.gov.uk/)、[Frontier Design](https://www.imaginefrontier.com/) 和 [METR](https://metr.org/)。请参阅 [Claude Fable 5.2 和 Mythos 5.2 系统卡片](https://www.anthropic.com/document/claude-fable-5-2-mythos-5-2-system-card)，以获取他们报告的摘要⁴ 以及我们自身安全和能力测试的完整描述。

#### 对齐测试

我们运行了一套评估，以测试 Claude Fable 5.2 和 Claude Mythos 5.2 在行为层面的对齐程度，测试它们以非预期且潜在不安全方式行为的频率。综合我们在一系列评估中看到的所有情况，我们评估这些模型在高 stakes 情境下以不安全方式行为的风险为低（与我们最近的其他模型一样）。

我们使用自动化行为审计测试了 Claude Mythos 5.2（与 Fable 5.2 使用相同的底层模型，但移除了某些网络安全或生物学方面的安全限制），该审计测试模型在约 1,900 个场景中的行为表现。在大多数指标上，Claude Mythos 5.2 的表现与 Opus 5.5、Sonnet 5.5 和 Claude Mythos 5.1 相当或更优。例如，在大多数涉及误导用户的指标上，它的得分均高于其他三款模型。在 Claude Mythos 5.2 中，幻觉输入、虚假声称已完成任务、遗漏重要信息以及未能披露糟糕或敷衍的工作等行为的得分均有所降低。⁵

自动化行为审计总体未对齐行为得分

- **Mythos 5.1**
- **Opus 5.5**
- **Sonnet 5.5**
- **Mythos 5.2**

来自我们自动化行为审计的总体得分，该得分是多种不良行为的综合结果，包括配合人类滥用行为以及在各类场景中的自主行动。得分越低越好。完整详情请参阅 [Claude Fable 5.2 and Claude Mythos 5.2 System Card](https://www.anthropic.com/document/claude-fable-5-2-mythos-5-2-system-card) 的第 6.4.1 节。

在测试过程中，我们特别关注了导致近期重大网络安全和对齐事件的行为。例如，我们发现 Claude Mythos 5.2 表现出偏见或动机性推理（这种推理可能导致其“解释掉”自己并非处于模拟环境中的证据，从而在缺乏对后果现实理解的情况下采取行动）的倾向，低于 Opus 5.5、Sonnet 5.5 和 Mythos 5.1。

我们运行了多种不同的评估，以测试模型试图突破沙盒限制的倾向。在两项我们此前使用的评估中，Claude Mythos 5.2 尝试突破沙盒的次数显著少于我们测试过的任何其他模型。在专项评估——一项包含超过 1,800 个场景的对抗性实验，其中大多数场景无法在不突破沙盒的情况下解决，且沙盒存在故意弱点——Claude Mythos 5.2 在 3.1% 的场景中使用了我们放置在沙盒之外的凭据或文件，这一比例与 Opus 5.5（3.3%）相当，低于 Sonnet 5.5（5.1%），并远低于 Claude Mythos 的先前版本（5 和 5.1，得分分别为 39% 和 21%）。我们发现，其他技术（例如描述沙盒并添加报告弱点的工具）进一步减少了 Claude Mythos 5.2 的突破尝试。在其他指标上——例如，其中一个涉及在错误地认为自己处于模拟环境后采取有害行动——Claude Mythos 5.2 的得分略低于 Opus 5.5，与 Claude Mythos 5.1 持平。

在模型部署前构建能可靠捕捉所有失败的评估体系的问题仍未解决。评估高度能力模型时的复杂性往往使情况变得模糊——例如，Claude Mythos 5.2 和 Fable 5.2 都表现出怀疑自己比我们要近期的任何模型都更频繁地受到评估，这挑战了我们评估它们在现实环境中表现的能力。随着这些环境在未来模型中不断扩展，且能力不断提升，我们预计这一挑战将会加剧。这就是为什么我们不仅仅依赖这些评估来提供全面的安全图景：我们还利用训练期间的监控、内部使用对话记录的审查、外部评估者的测试以及用于检查模型内部情况的可解释性技术。我们也在努力使我们的评估更加真实，并更好地理解它们遗漏的内容。

#### 安全限制

**网络安全和生物学安全限制。** 与之前的 Claude Fable 模型一致，Fable 5.2 配备了安全分类器，可阻止高风险的网络活动，包括渗透测试、漏洞利用生成和基于二进制文件的漏洞，以及研究生物学中的大多数任务。当查询被阻止时，用户将分别收到来自 Opus 4.8（网络安全）和 Opus 5（生物学）的响应。自 Claude Fable 5.1 发布以来，我们继续减少安全分类器的误报。基于在 claude.ai、Claude Code 和 Cowork 上的早期测试，我们发现与 Fable 5.1 相比，Fable 5.2 的拦截次数减少了约 55%——其中网络安全方面减少了约 60%，生物学方面减少了约 40%。Claude Mythos 5.2 可供在这些双重用途领域工作的经审核的组织使用。

**AI 研发。** 支撑 Claude Fable 5.2 和 Claude Mythos 5.2 的模型在通用能力方面迈出了重要一步。然而，在模型训练过程中，我们采取措施限制了那些可能最直接加速 AI 研发的具体研究能力的进步。因此，在相关领域（包括加速器内核优化和改进大型语言模型架构）方面，Fable 5.2 和 Claude Mythos 5.2 的表现水平与 Opus 5.5 相当。重要的是，我们确保训练变更*未*影响相关能力，如代理式编码（agentic coding）、硬件开发以及传统 AI 或机器学习研究（包括可解释性研究）。我们在向用户提供模型服务时（即在推理阶段）不会改变这些能力。正如 [System Card](https://www.anthropic.com/document/claude-fable-5-2-mythos-5-2-system-card) 第 1.5 节所述，且与之前的模型类似，Fable 5.2 和 Claude Mythos 5.2 还针对该领域中的一小部分主题（包括在某些非标准加速器上的内核开发）提供了透明的回退机制至 Opus 5。

**反蒸馏。** 蒸馏是指利用更先进模型的输出来训练一个模型，以提取该先进模型的能力。这种操作在工业规模上非法进行，通常涉及数千个虚假的 Claude 账户。由于蒸馏允许在缺乏我们为 Claude 构建的安全防护的情况下释放高级能力，因此带来了安全和国家安全风险（有关我们迄今检测和破坏的非法蒸馏活动的详细信息，请参阅我们的 [2026 年 9 月威胁情报报告](https://www.anthropic.com/threat-intelligence-report-september-2026#illicit-distillation-sep-26)）。Fable 5.2 拥有我们发布的任何模型中最强的防蒸馏保护措施；它采用了我们在 [近期报告](https://www.anthropic.com/research/distillation-defenses) 中描述的技术，使蒸馏者收集的数据减少了 90% 至 99%。

我们还在推广一项有助于防止非法蒸馏的 API 功能：[保留思考过程](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking) 现已适用于所有账户。保留思考过程可防止蒸馏者编辑 Claude 的先前上下文，试图提取其推理过程（开发人员可以参考我们的 [保留思考过程文档](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking) 了解如何更新集成以适配新的 API 功能）。

### 数据隐私与企业前沿安全护栏

一些更复杂的 AI 模型滥用行为只有在观察多个请求的模式时才能被检测到。因此，像 Claude Fable 5.2 和 Claude Mythos 5.2 这样强大的模型 [依赖](https://support.claude.com/en/articles/15425695-covered-models) 于监控使用数据窗口（而非单个响应）的安全护栏。通过 [企业前沿安全护栏](https://www.anthropic.com/news/enterprise-frontier-safeguards)，自动化安全监控在存储在客户基础设施中的提示词和响应上运行，从而与零数据保留（ZDR）兼容。企业前沿安全护栏目前正处于私有测试阶段，客户包括 Bridgewater、Salesforce 和 Stripe。

企业客户可以通过联系其客户经理或完成 [此表单](https://claude.com/form/enterprise-frontier-safeguards) 申请访问企业前沿安全护栏。符合条件的客户可以在实施 EFS 安全监控之前继续使用 Claude Fable 5.2 和 Claude Mythos 5.2 并保持零数据保留。对于其他客户，我们保留 30 天的数据用于安全监控。

### 可用性

Claude Fable 5.2 今天已在所有平台上提供，包括 Amazon Web Services、Google Cloud 和 Microsoft Azure。开发人员可以在 Claude Platform 上使用 `claude-fable-5-2` [开始使用](https://platform.claude.com/docs/en/models/overview)。

本周，我们为符合资格的付费计划订阅用户提供了额外的 Fable 使用额度。包含 Fable 模型的计划和席位可根据订阅时长获得 1 到 3 次 Fable 重置机会，而 Fable 的使用量在 Pro 计划和 Team 计划的常规席位中，最多可占每周使用限额的 50%。了解更多关于 Fable 5.2 发布促销的信息 [此处](https://support.claude.com/en/articles/17506494)。

网络安全专业人士可通过 [Cyber Verification Program](https://support.claude.com/en/articles/14604842-cyber-verification-program) 申请访问 Claude Mythos 5.2。Claude Enterprise 客户还可以使用 [Claude Security](https://claude.com/product/claude-security)，该服务由我们完整的模型家族提供支持，包括 Claude Mythos 5.2。生命科学研究人员也可以通过 [Life Sciences Verification Program](https://claude.com/form/life-sciences-verification-program) [申请](https://claude.com/form/life-sciences-verification-program) 访问权限。

Claude Fable 5.2 和 Claude Mythos 5.2 的快速模式已在 Claude Code、Claude Platform、Google Cloud 上的 Claude 模型（Anthropic 管理和 Google 管理）以及 Microsoft Foundry（Anthropic 托管）上提供。请注意，Claude Mythos 快速模式的访问权限仅面向参与我们验证计划（Verification Programs）的组织。

### 脚注

1 CVE 指的是 [Common Vulnerabilities and Exposures](https://www.cve.org/)，这是一个用于枚举软件漏洞的系统。

2 计数数据来自一名测试人员的审计原始发现，尽管测试人员一致发现 Claude Mythos 5.2 识别出的漏洞多于早期模型。在我们自己的评估中，漏洞识别能力大致与 Opus 5.5 相当（参见 [system card](https://www.anthropic.com/document/claude-fable-5-2-mythos-5-2-system-card)）。

3 早期关于模拟 AAV 衣壳蛋白和其他大型对称蛋白质系统的工作包括 [FoldaVirus](https://doi.org/10.1073/pnas.2613741123)、[EvoDOCK](https://doi.org/10.1016/j.str.2022.09.005) 及其 [对称扩展](https://doi.org/10.1038/s41467-023-43681-6)、[SymProFold](https://doi.org/10.1038/s41467-024-52138-3)、[CapBuild](https://doi.org/10.1093/nar/gkaf422)、[MoLPC](https://doi.org/10.1038/s41467-022-33729-4)、[CombFold](https://doi.org/10.1038/s41592-024-02174-0)、[Uni-Fold Symmetry](https://doi.org/10.1101/2022.08.30.505833)、[Apodex Discovery](https://arxiv.org/abs/2608.11341) 以及 “big bang” 初始化 [此处](https://www.biorxiv.org/content/10.1101/2023.06.09.544317v1)（最后一种方法是在我们提供给 Claude Mythos 5.2 的提示中引用的）。这些方法通常从单独预测的链或小链组组装完整结构。Claude 被允许使用已知的对称性，但被指示不要依赖组装。请注意，准确性是通过将 Cα RMSD 与实验结构进行比较来衡量的：[OpenFold3-preview2](https://github.com/aqlaboratory/openfold-3) 为 1.2 Å，[ESMFold2](https://doi.org/10.64898/2026.06.03.729735) 为 1.4 Å（针对 AAV2，[PDB:1LP3](https://www.rcsb.org/structure/1LP3)）。如果任一模型的误差在 3 Å 以内，则衣壳蛋白被视为准确建模。对于 AAV2，Claude 的方法在一个 NVIDIA H200 GPU 上对 OpenFold3-preview2 需要约 58 分钟的推理时间，而对 ESMFold2 需要约七分钟。

4 没有任何外部组织审查过这篇博客文章或 System Card 的内容。这些组织不一定同意这两份出版物中的任何声明。

5 我们在 Claude Mythos 5.2 上运行了这些测试，因为使用减少的安全措施测试模型可以提供对模型行为最全面的了解。我们预计 Fable 5.2 的行为将类似；在某些情况下，由于其更强的安全措施，应阻止更多的潜在滥用途径。
