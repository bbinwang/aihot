---
title: "Anthropic 的 Agents 记忆框架"
date: 2026-11-08T00:50:40.571Z
tags: ["聚合"]
summary: "原文链接 : https://www.anthropic.com/research/components of agent memory 来源 : www.anthropic.com 发现于 : 管理台手动提交 说明 : 本文由 AIHot"
---
> **原文链接**: [https://www.anthropic.com/research/components-of-agent-memory](https://www.anthropic.com/research/components-of-agent-memory)
> **来源**: www.anthropic.com
> **发现于**: 管理台手动提交
> **说明**: 本文由 AIHot汪 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

克尔凯郭尔(Søren Kierkegaard)曾写道,生活只能被*向后*理解,却必须被*向前*经历。在设计 AI Agent 的记忆时,我们遇到了类似的困境。

人类在日常生活中会持续不断地编码记忆。[海马体](https://stanford.edu/~jlmcc/papers/McCMcNaughtonOReilly95.pdf)在其中扮演核心角色,它实时捕捉经历,使记忆快速形成并立即可用。但只有[部分经历](https://www.science.org/doi/10.1126/science.adk8261?referrer=https%3A%2F%2Fwww.google.com%2F)会被巩固为长期知识。

大部分巩固过程似乎发生在大脑离线时。在睡眠以及安静的[休息](https://www.nature.com/articles/s41467-018-06213-1)期间,海马体会重放我们最近的经历。据认为,这一过程逐渐[提炼这些经历并将其整合](https://www.nature.com/articles/s41593-019-0467-3)进新皮质——即我们大脑中存储绝大部分知识信息的部分。

Agent 的记忆可以采用类似的分工机制。Agent 将其大部分工作记录在日志或转录文本中。Letta 和 UC Berkeley 的研究者提出了 [sleep-time compute](https://arxiv.org/abs/2504.13171),让模型利用交互之间的空闲时间来重组已有上下文。同样的思路可以帮助 Agent 通过反思日志来修正错误,或生成新的笔记与记忆表征,从而整理自己的记忆。这一过程通常被[称](https://platform.claude.com/docs/en/managed-agents/dreams)[为 dreaming](https://research.google/blog/the-sleep-framework-a-new-way-for-llms-to-retain-knowledge-in-continual-learning/)(图 1)。

我们发现,dreaming 是帮助我们赋予 Claude 有效记忆的实用工具。在这篇文章中,我们分享了我们如何看待 Agent 记忆,并介绍了我们用于探索 Agent 记忆的多项评估方法,包括对 dreaming 的运用,以及各组成部分对记忆组织的贡献。

![会话之间记忆层级的示意图。从下到上依次为:转录文本(可搜索的事件日志)、Claude 撰写的记忆笔记、记忆表征(如 wiki),以及注入每次会话的预加载上下文。在一个标注为 "Dreaming" 的方框内,箭头从转录文本指向上面各层,并在相邻上层之间双向连接。](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2Fa0bcfa203214d817d2b4261b7188aba8be6db5b2-3840x1754.png&w=3840&q=75)

Claude 可以利用 dreaming 来整理记忆。这可以修正错误、创建笔记、构建新的记忆表征,或决定未来会话预加载的内容。

#### 记忆笔记

所谓 "Agent 记忆",我们指 Claude 从经验中获得的知识——包括与用户的交互以及被分配的任务——并在会话之间保留,保存为后续可读取的上下文。它不包括模型学习或管理上下文的其他方式,例如对*权重*(训练过程中设定的内部参数)的更改、[in-context learning](https://www.anthropic.com/research/in-context-learning-and-induction-heads)(单次对话中获得的知识),以及 [compaction](https://platform.claude.com/docs/en/build-with-claude/compaction)(由 Claude 撰写的摘要,替换其较早的对话轮次,使其能在新的上下文窗口中继续工作)。

在人脑中,在经历之前、期间或之后释放的化学信号可以[将一段记忆标记](https://www.nature.com/articles/385533a0)为重要。在离线时段,被标记的记忆往往比未标记的记忆更频繁地被重放。这一过程称为 *replay*,有助于将它们稳定并整合进长期记忆。

类似地,Claude 可以在会话日志发生时为显著事件打上标签,以便日后更容易查找,也可以将它们[写入](https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool)记忆存储中,例如一个记忆笔记文件夹(图 2)。但在还不知道接下来会发生什么的情况下,Claude 如何在当时判断什么才是显著的呢?

![相同的记忆层级，其中记忆笔记层被高亮显示。一条箭头从会话直接指向记忆笔记，说明为 Claude 写下的显著观察。](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2F2ef2bf5c81ea6d578749782782eff10cf3136de4-3840x1754.png&w=3840&q=75)

Claude 可以将笔记写入记忆。

#### 记忆可以是对未来所需内容的预测

记忆，有时是一种预测。通过写下一条规则，Agent 预测它所描述的模式将再次变得相关。例如，写下一个经过验证的事实，就是预测未来的会话中的 Agent 将希望依赖该事实而无需再次核对。随着时间推移，Claude 在做出这类预测方面已经变得好得多。

考虑 [Continual Learning Bench (CL-Bench) 1.0](https://continual-learning-bench.com/news/cl-bench-1-0/) 中的一项任务，这是一个衡量 Agent 利用记忆处理长周期任务能力的基准测试。其中一个特定任务要求 Claude 通过在数据库中查找信息来回答一系列问题。在 Claude 给出答案后，它会被告知正确答案，并可以写一条记忆来帮助回答后续问题。

记忆可以在此支持一个学习循环。如果 Claude 答错了某个问题，它可以记录这次失败，提出关于哪里出了问题的理论，测试这些理论，并将其发现转化为关于未来如何作答的规则。

我们使用 [Claude Managed Agents](https://platform.claude.com/docs/en/managed-agents/overview) 运行了 CL-Bench 1.0 任务。Claude 在全新的会话中开始每个问题，只有一个例外：它可以从一个在会话之间持续存在的[记忆目录](https://platform.claude.com/docs/en/managed-agents/memory)中检索文件。

不同模型在创建自己的学习循环方面取得了不同程度的成功。Claude Sonnet 4.6 最多只能生成关于答案为何错误的理论。它的记忆目录中散布着一些文件，每个文件列出了若干未经测试的猜测。

![左：CL-Bench 数据库任务上平均奖励的柱状图，无状态基线对比记忆存储。Opus 5.5：0.655, 0.838。Sonnet 5.5：0.644, 0.833。Opus 5：0.564, 0.828。Opus 4.7：0.383, 0.700。Sonnet 5：0.306, 0.610。Sonnet 4.6：0.330, 0.364。右：相同模型在 30 个问题上运行平均奖励的折线图，分别对比有无记忆的情况。](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2Fbb0d44c78cc431fb5e84fbf2cb17c4303bc6bd65-3840x2160.png&w=3840&q=75)

CL-Bench 数据库任务，跨模型比较记忆与无状态基线。

Claude Opus 4.7 将其笔记整合到一份参考文档中，并开始标记哪些事实已经核查过、哪些仍未确认。Claude Sonnet 5 在评分器核查后将每个答案标记为已确认，并在答错时写下更正。

Claude Opus 5 是这些模型中第一个闭合学习循环的模型。它的大多数条目都包含一条规则（以及它如何得知该规则为真）、早前问题的答案，以及关于它在过程中发现的陷阱的明确警告（图 3）。

与 Opus 5 一样，Claude Opus 5.5 和 Claude Sonnet 5.5 都闭合了学习循环，利用记忆来捕获关于如何最好地回答未来问题的经验证规则。在启用记忆的情况下，两者的得分与 Opus 5 大致相同，不过它们在没有记忆时的基线表现略高一些。

#### Claude 已经学会判断显著性

我们还评估了 Claude 玩*Pokémon Red* 的能力，这款游戏[挑战 Claude 导航](https://www.youtube.com/watch?v=CXhYDOvgpuU)复杂的长周期任务，以此测试 Claude 对*哪些*内容值得保存到记忆的判断力。在每次运行开始时，我们为每个模型提供了一个记忆文件文件夹，它在游戏过程中可以读取和写入该文件夹（图 4）。

我们比较了 Claude Sonnet 3.7 和 Claude Fable 5 各一次运行的记忆文件夹，当时各自已进行到游戏中约 10,000 步。我们注意到的一个关键差异是每个模型认为什么值得记住。Sonnet 3.7 假设一切可能都很重要，并不加区分地写入记忆。它的记忆文件夹包含一份遭遇记录档案，通常为它经历的每场战斗、找到的每件物品、遇到的每个非玩家角色（NPC）都单独建一个文件。最终，Sonnet 3.7 在 225 个文件夹中写入了 413 个记忆文件，并获得了一枚徽章（徽章标记玩家在游戏中的进度）。

相比之下，Fable 5 在两个文件夹中编写了九个文件，外加一个名为 `global.md` 的顶层文件，并获得了四个徽章。

![两张相同比例尺下的 Pokémon 记忆目录树状图，面积表示记忆中的字符数。Claude Sonnet 3.7 的目录较大且拥挤，包含 413 个文件和 977,930 个字符，分布在 locations、main、battles 以及多个“consolidated”文件夹中。Claude Fable 5 的目录较小，包含 10 个文件和 43,406 个字符，分布在 locations、gameplay 和 global.md 中。](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2F5e15e10f665773050d90fafc38ab8dd76ae5368b-3840x2545.png&w=3840&q=75)

Claude 在游玩 Pokémon 时，Sonnet 3.7 与 Fable 5 的记忆目录对比。

Sonnet 3.7 的方法主要存在问题，因为 Pokémon 的游戏状态不断变化——Sonnet 3.7 的详细记录会不断过时。结果，随着 Claude 的推进，它不得不花费更多时间和资源来梳理其记忆，而不是专注于玩游戏。例如，在第 10,000 步左右，Sonnet 3.7 开始创建其第四个“master”记忆文件文件夹。在接下来的 17 步中，它创建了六个文件，删除了九个其他文件，而在游戏本身中没有采取任何行动。

Fable 5 的方法将记忆用于游戏未明确告知它的信息。Sonnet 3.7 写入记忆的一些信息类型——例如玩家拥有的金钱数量或玩家在地图上的位置——每回合都可以从屏幕上读取，因此存储这些信息是多余的。相比之下，关于策略、计划和经过测试的规则的记忆文件，只有在 Claude 自行推导出来时才存在，除非 Claude 将其写下来，否则这些文件就会消失。

Fable 5 据此组织了其记忆。其 `global.md` 文件充当仪表板，保存当前目标、针对道馆（赢得徽章的挑战）的预写计划，以及模型自身的使用记忆规则。`locations` 文件夹保存了导航特定路线的计划，`gameplay` 文件夹保存了基于其对游戏运作方式所学到的策略。例如，在连续七个精灵球未能抓住一只鲤鱼王（最容易捕捉的 Pokémon 之一）后，Claude 写道：“如果连续 3 个或更多球失败，请改变时机（在菜单步骤之间插入额外的‘等待’按键）——捕获是在这样做之后立即成功的。”

凭借小得多的记忆文件夹，Fable 5 在游戏中取得了比 Sonnet 3.7 更远的进展。Opus 5.5 采用了类似的方法：它保留了一个小的记忆笔记文件夹，用于跟踪当前目标和下一步操作，并在游玩过程中重写这些笔记，最终击败了游戏。

#### 引导 Claude 编写记忆

我们发现，告诉 Claude 记忆的作用，而不是*如何*使用它，会有所帮助。在 CL-Bench 上，我们只是告诉 Claude 有一个记忆文件夹可用。这种一般性指导足以让 Opus 4.7 和 Opus 5 有效使用记忆，并显著提升了它们的性能（图 3）。

我们还测试了向模型提供关于它们应该写入记忆的特定规则，每个测试对应一条规则。我们比较了每条规则下每个模型从记忆中获得的提升与没有该规则时的提升。当我们将规则设置为“仅记录失败”时，Opus 5 和 Opus 4.7 都失去了记忆带来的大部分性能提升（图 5，右侧）。对于更强的模型，赋予它们判断显著性的自由比预先设定固定规则更有效，而这些固定规则最终可能会削弱性能。

![左侧：Sonnet 4.6 在 CL-Bench 数据库任务中的平均奖励柱状图：基线为 0.330，使用记忆时为 0.364，使用记忆并优化指令时为 0.641。参考线标记了使用记忆的 Opus 4.7（0.700）和使用记忆的 Opus 5（0.828）。右侧：被告知仅记录失败时记忆增益的变化：Opus 5，−0.234；Opus 4.7，−0.150；Sonnet 4.6，−0.020。](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2Fda03e864e4eba93a91314fa5f2a5d0e4c14b2a0f-3840x2310.png&w=3840&q=75)

左图：Sonnet 4.6 在 CL-Bench 数据库任务中，使用与不使用提示来引导记忆使用的对比。右图：当模型被指示仅记录失败案例时，各模型因记忆获得的提升幅度变化。

我们还注意到，引导（steering）对较旧模型的帮助最大。例如，Sonnet 4.6 经常不会从其记忆目录中读取文件，也无法测试其关于答案为何错误的理论。

在这种情况下，提示 Claude 在回答前阅读其记忆文件，然后明确测试其理论，几乎使其基准测试得分翻倍（图 5，左侧）。Sonnet 5 则能自主完成这一过程。即使未被提示，它在 10 次中有 9 次会在回答前读取记忆。相比之下，Sonnet 4.6 这样做不到一半的次数。

对于前沿 Claude 模型，我们通常仅在用户明确要求或某事明显值得记忆时，提供简单的指导以创建记忆笔记，并将判断权留给 Claude。

#### 梦境可以修正记忆

由于 Claude 基于其在会话中判断为重要的内容写入记忆，因此从一开始就错误或在环境变化后发生漂移的笔记，可能会在后续会话中被 Claude 读取并信任。

Dreaming 为 Claude 提供了一种将笔记与原始转录文本进行比对的方法（图 6）。当 Claude 使用带有挂载目录作为记忆的 Managed Agents 玩《宝可梦》时，我们看到了这方面的一个正面案例。

![带有梦境的记忆层级结构，突出显示了从转录文本层指向记忆笔记层的箭头，表明梦境正在根据转录文本修正笔记。](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2F55ce85bd12860090704a5543a3da7504334ad9a9-3840x1754.png&w=3840&q=75)

Dreaming 可以修正记忆中的错误。

在游戏的一个部分中，玩家必须穿过月见山（Mt. Moon），这是一个洞穴系统，入口位于地图西侧，出口位于东侧。入口附近有一个陷阱：一个单向 ledge，会将玩家掉落回他们来的路线，且没有明显的攀爬回去的方法。Claude 将位于山入口处的宝可梦中心（PokéCenter）作为地标，因此它是否会掉下 ledge 取决于它认为宝可梦中心位于山的哪一侧。

有一次，Claude 错误地记录宝可梦中心位于东侧。当它走出宝可梦中心时，它宣布：“月见山在我身后”，并更新了笔记：“月见山已完成。”但月见山实际上并不在它身后。几轮操作后，Claude 越过了 ledge，回到了它来的路线上（图 7）。由于其导航工具未显示掉落情况，Claude 得出结论：“我偏西太多了”，并认为自己一直在正确的侧边。但这并非事实。

![两张宝可梦地图面板，代理站在 ledge 旁。左侧为“原始记忆”，存储的笔记是错误的：箭头显示代理正前往下一座城市。右侧为“记忆 + 梦境”，离线过程修正了笔记：箭头显示代理正返回洞穴入口。](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2Fd906d6ed9ac92db36631a624ad517183b07a545d-3840x2101.png&w=3840&q=75)

修正后的记忆笔记改变了《宝可梦》游戏中的结果。在未修正的笔记下，Claude 说：“月见山在我身后”，前往下一座城市，最终回到了它来的路线。在通过梦境修正笔记后，它说：“现在我需要找到月见山洞穴入口以重新进入”，并返回洞穴。

随后，我们测试了 Dreaming 是否能帮助 Claude 避免这个陷阱。我们在包含宝可梦中心错误位置的记忆文件夹上运行了 Dreaming：Claude 将笔记与会话转录文本进行比对，发现了错误并重写了笔记。转录文本为 Claude 提供了验证记忆的真实基准。在修正记忆笔记后，Claude 直接返回月见山，并最终抵达了华蓝市（Cerulean City）。

在未修正笔记的实验中，Claude 三次退回到之前的路线。第三次失败后，Claude 似乎放弃了，写道：“我选择停止，而不是继续循环。”我们系统的自动回复指示它继续执行。于是它确实继续了，一路退回至山前的城镇——金属城（Pewter City），它希望在那里恢复状态并补充物资。最终，Claude 从未到达华蓝市（Cerulean City），实验结束。

![关于向华蓝市进度的折线图，涵盖 3,000 次累计操作。带有“记忆+梦境”功能的运行在第 1,935 次操作时到达华蓝市。原始记忆运行掉下悬崖并回溯至金属城。无记忆运行从未到达华蓝市。](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2F2eb2bfe6d01e9a1fca74a41e952d948c09d42008-3840x2636.png&w=3840&q=75)

“梦境”修正了记忆，Claude 重新进入洞穴并抵达了下一个城市。带有未修正笔记（“原始记忆”）的运行从未翻越山脉，无记忆运行也是如此。

#### 梦境可以构建新的记忆表征

借助“梦境”，Claude 能够构建有助于导航记忆的代表性结构（图 9）。它使用的一种记忆表征类型被称为 [wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)，即由 Claude 编写和维护的一系列页面集合，用于汇总 Claude 对某一主题的了解，并将其链接至其他笔记。这些链接实际上为 Claude 提供了一张地图，使其能够筛选记忆并在需要时高效地定位记忆。

![带有梦境的记忆层级结构，突出显示了从转录文本和记忆笔记指向记忆表征层（如 wiki）的箭头。](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2F30923242548d746ee77784c87826cadc46574c34-3840x1754.png&w=3840&q=75)

“梦境”可以构建记忆表征。

像 wiki 这样的表征结构可以帮助 Claude 遍历其不断扩大的知识库。我们使用一个内部文档语料库——约 350,000 个文件，总计约 4.2 亿 token——来自我们于 5 月收购的软件公司 Stainless，来探索 wiki 作为记忆表征的优势。我们创建了一个包含 25 个关于该语料库问题的评估集，并赋予 Claude 一个搜索工具以供探索。我们还指示 Claude 使用“梦境”基于这些文件构建 wiki。在 128 个会话中，我们提示 Opus 5 Agent 探索文件、编写或修正链接的 wiki 页面、合并重复项，并对照源文件核查声明。

每个会话都建立在 Agent 先前会话取得的进展之上，并使用共享日志来协调工作。随着我们将“梦境”规模从两个会话扩展到 128 个，在 25 个问题上的表现从满足评分标准的 13% 增长至 48%（图 10）。

Claude 增量式地构建其 wiki。在创建初始 wiki 后，它利用后续的“梦境”轮次来添加、编辑或修剪内容。在早期的“梦境”轮次中，Claude 的知识水平如同新员工，仅凭 wiki 回答问题的能力有限。随着“梦境”次数的增加，其知识地图变得日益丰富，如同资深员工。在我们的测试中，我们发现当同时赋予 Claude 搜索工具权限时，wiki 对 Claude 的帮助最大。当它同时使用搜索工具和 wiki 时，随着 wiki 的增长，Claude 的综合得分从 54% 上升至 61%，而仅使用搜索工具时得分为 53%。当 Claude 仅使用 wiki 回答问题时，其最佳得分为 48%。使用搜索工具和 wiki 还使每个问题的 token 消耗节省了约 20,000。

![中心：随着 wiki 生成量从 2M 增长至 128M 梦境 token，所满足评分标准的折线图。“Wiki 加搜索工具”从 54% 上升至 61%，“仅 Wiki”从 13% 上升至 48%，而“仅搜索工具”保持在 53% 不变。左右两侧：示例 wiki 的网络图，经过 2 个会话后包含 103 个页面和 766 个链接，经过 128 个会话后包含 222 个页面和 12,893 个链接。](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2F336832b5015f1bfcfd7d786fae8120c533f26ecd-3136x1432.png&w=3840&q=75)

中心图：在 Claude 构建维基的连续会话中，针对一家公司文档语料库的 25 个问题进行的评分。左侧和右侧：分别展示了经过两次和 128 次会话后的维基示例；每个点代表一个页面，连线表示页面之间的链接关系。

我们希望测试哪些类型的任务能从 Claude 拥有维基中受益。为此，我们使用了 [Harvey LAB](https://github.com/harveyai/harvey-labs) 基准测试，并结合了一组关于并购的文档。该基准测试向 Claude 提供一组文档，并要求 Claude 根据其内容生成法律简报。随后，基准测试会根据一系列标准对简报进行评分。虽然这些评估可能不如玩《宝可梦》有趣，但它们为我们提供了多样化的文档集合，用于构建维基。

我们指示 Claude 根据文档构建维基。然后，我们要求 Claude 基于维基以及直接文件搜索两种方式，回答关于并购的问题（或生成法律简报，即 LAB 基准测试）。一项测试包含 24 个关于并购的问题（图 11，左侧），其中超过一半的问题需要 Claude 在多个文档中查找信息，许多问题还需要 Claude 运用判断力或进行数学计算。在这些项目（红色和橙色线条）上，当 Claude 查阅维基时得分为 87%，而仅使用搜索时得分为 73%。

![两个图表，将评分标准与源文档关联起来。左侧，维基显示出更大优势的任务：24 个标准中的大多数连接到 10 个文档中的两个或更多，其中九个需要判断或算术运算。右侧，维基显示出较小优势的任务：大多数标准可以通过在单个文档中进行文本搜索找到，通常是交易概述备忘录。](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2F3677eab5e938466cc41fbac4d47f3118135d0563-3840x3694.png&w=3840&q=75)

每个面板列出了被评分的内容（左侧）和满足每个标准所需的源文档（右侧）。左侧：24 个关于并购的问题，主要通过查看大部分公开文件即可回答。超过一半的标准要求结合多个文档中的信息。右侧：一个 LAB 任务，维基未显示出明显的增益。大多数标准可以从单个文档中满足。

在其他情况下，维基的作用较小。在一个 LAB 任务中（图 11，右侧），简报标准通常可以通过在单个文档中进行文本搜索获得，与仅使用搜索相比，维基在性能上没有显示出明显的提升。在另一个 LAB 任务中，维基的规模超过了原始文档本身（图 12）。就像博尔赫斯那篇名为《论科学的精确性》的短篇小说中的制图师一样，他们绘制了一幅如此详细的地图，其大小与它所代表的帝国相当，Claude 也构建了一个极其详细的维基，但几乎没有任何抽象提炼。

![维基构建和第二遍处理的示意图。左侧，一个圆圈包含语料库：10 个文档，115 KB 文本。一个箭头指向一个更大的圆圈，其中包含由此构建的维基：68 个页面，255 个链接，203 KB，即语料库的 1.77 倍。维基的一些页面没有链接。](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2Fffa35479b1dea63b7948f76995b488d08854e86d-3840x2150.png&w=3840&q=75)

维基的规模变得比原始文件更大。

#### 梦境可以促进笔记在记忆层级中向上移动

梦境还可以将笔记浮到记忆层级的顶部，并且 Agent 框架可以在每个会话开始时将其预先加载到 Claude 的上下文中（图 13）。这意味着 Claude 不需要搜索它们，甚至不需要知道有东西需要搜索。

将记忆注入新会话（这是一种 *上下文注入* 形式）必须谨慎进行。注入的记忆会消耗宝贵的 token，而且错误的笔记会被带入每个会话。加载笔记也不能保证 Claude 会执行它：我们的 [Claude Code](https://code.claude.com/docs/en/memory) 文档警告说，较长的指令文件会降低遵循度。因此，记忆层级的顶层必须保持相对较小，而梦境在此处的大部分工作就是保持这种状态——通过将一些细节下移到层级深处，并留下链接。

[Claude Code 的自动记忆](https://code.claude.com/docs/en/memory) 以同样的方式保持其注入层较小，Claude 会在会话期间维护它。Claude 不会将所有的自动记忆加载到每个会话的上下文窗口中。它只加载 `MEMORY.md` 的前 200 行或 25 KB。该头部充当索引，向 Claude 展示它所知道的内容以及在哪里可以找到这些信息。

![带有“梦境”功能的记忆层级结构，突出显示了来自转录和记忆表示的箭头，向上指向顶部的注入上下文层，该层再传递到下一个会话。](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2Fc88bcc04c5d0e77db5828c9dbe72faf1c4421f8f-3840x1754.png&w=3840&q=75)

“梦境”可以写入记忆层级的顶部。注入的上下文会加载到每个会话中，而当 Claude 需要时，会读取或搜索其下方的层级。

#### “梦境”可以将记忆聚焦于特定目标

“梦境”还可以塑造记忆的增长方式。例如，[Claude Duet](https://support.claude.com/en/articles/17631495-get-started-with-claude-duet) 这样的助手通常受益于围绕其帮助的人员组织的记忆，并且可以调整“梦境”以服务于特定目标来构建记忆。

指导记忆增长的指令因任务而异，并告诉 Claude 哪些信息真正重要。例如，LAB 基准测试中的一个任务模拟了公司收购，并提供了一套合同。评分标准在于简报是否正确描述了合同条款。

我们最初使用生成 wiki 的基本指令，这些指令并未告诉 Claude *如何* 使用 wiki。该任务严重依赖合同条款。在构建 wiki 的过程中，多个代理同时向共享的合同条款表写入数据（图 14，左侧）。

![两张图表。之前：四个代理写入同一个共享页面 provisions.md，其中一个代理的保存操作覆盖了另一个代理的行；57 个已评分事实中有 41 个幸存。之后：每个代理各自写入其合同页面，逐字复制条款；57 个已评分事实全部幸存。](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2F592f604d38e90537553ab7127d1d3115924fda92-3840x1822.png&w=3840&q=75)

指令更改前后，有多少已评分的合同事实进入了 wiki。左侧：多个代理写入一个共享页面；57 个事实中有 41 个幸存。右侧：每个合同一个代理，各自写入其页面并逐字引用条款；57 个事实全部幸存。

结果是一个缺少关键事实的 wiki。当我们对从 wiki 生成的简报进行评分时，Claude 仅包含了 57 个事实中的 41 个（72%）。当我们查看出错原因时，发现共享表对合同条款的总结很差，并且完全遗漏了一些条款，因为代理们相互覆盖了彼此的工作。

合同条款是 wiki 最重要的部分，但指令中并未说明这一点。为了找到更好的指令，我们运行了一个循环，Claude 在其中反思其失败，提出对指令的更改，并重新构建 wiki。这个循环使 Claude 发现遵循合同条款的重要性，并据此重写了构建 wiki 的指令。

每个合同在 wiki 中都有自己的页面，由单个代理编写，逐字引用条款，而不是将它们总结到共享表中。当我们对从这个改进后的 wiki 生成的简报进行评分时，100% 的标准都能满足，从之前的 72% 提升而来。

#### “梦境”可以填补会话留下的空白

当 Claude 编写记忆笔记时，它只能看到 *该* 特定会话中的上下文。“梦境”可以跨多个会话搜索，以发现常见模式或纠正常见错误。

在构建 LAB 基准测试的 wiki 时（例如，见图 14），有时 Claude 会链接到尚未创建的页面。第二次“梦境”处理填补了许多这些空白。在一个任务中（图 15），“梦境”发现了九条指向 wiki 中缺失页面的链接，并将它们重新指向同一文档的现有页面。它还添加了三个新页面，包括一个索引，以改进 wiki。

![维基的两个网络图。第二遍“做梦”之前：38 个条目和 225 个链接，其中九个来自六个页面的链接指向一个不存在的页面“escrow-agreement”。之后：41 个条目和 278 个链接，所有九个链接都指向“buyer-form-escrow-agreement”以及三个新页面：index、instructions email 和 escalations。](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2Ff1afeef9a2d986a6155c0789db46b8fa372a20eb-3840x1812.png&w=3840&q=75)

第二遍“做梦”前后的维基。

#### 向后思考，向前展望

关于如何为 Agent 设计记忆系统，仍有许多未解之谜。其中一个问题是 Claude 应该在何时创建记忆。当 Claude 处理任务时，它可以向记忆存储（例如文件夹、文件或数据库）写入内容，在源头捕捉显著性，并使重要细节立即可用于未来的交互或会话。然而，即时记录笔记不可避免地会将 Claude 的注意力从其主要任务上分散开来。相比之下，“做梦”可以将记忆创建推至后台，但“做梦”产生的任何输出可能不会立即对 Claude 可用。

另一个问题是如何保持记忆的可靠更新。Claude 可能会做出错误的预测，或者从一开始就将错误的规则写入记忆。随着环境的变化，记忆也可能发生漂移并变得无关紧要。“做梦”是纠正这些错误的一种方法（图 8），但这需要计算资源。指示 Claude 持续检查*所有*记忆可能并不切实际。相反，重要的是将“做梦”集中在可能变化的信息上，或者仔细调整“做梦”的频率（例如，基于记忆被访问的频率）。

将转录搜索作为 Claude 记忆的基础也是合理的。将表示形式（例如维基）与搜索相结合（图 10）有时是有效的。但 Claude 需要使用计算资源来维护记忆表示，并确保它们不会积累错误或幻觉。

尽管 Claude 对显著性的判断有所改进，但没有任何模型能真正知道未来交互中会发生什么。“做梦”为 Claude 提供了一个机会，让它能够*向后*看，并使用计算资源来组织其记忆、纠正错误，并维护表示形式，以便未来的会话可以更轻松地访问记忆。随着 Claude 能力的提升，记忆系统也将不断演进，我们在设计 Claude 的记忆系统方面仍有大量知识需要学习。

请参阅我们的 Cookbook，了解[如何开始使用“做梦”](https://platform.claude.com/cookbook/managed-agents-cma-dreaming-with-a-dynamic-workflow)和[知识维基](https://github.com/anthropics/claude-quickstarts/tree/main/managed-agents/knowledge-wiki)。

### 作者与致谢

#### 致谢

本文由 Lance Martin 撰写，Caitlin Love、Tom Chivers、Rebecca Hiscott、Jake Eaton 和 Blake Wilson 提供了编辑指导。我们要感谢 Barry Zhang、Theodora Chu、Daliang Li、Mahesh Murag、Jake Noble、Ravi Trivedi、Tina Vachovsky、Brad Abrams、Henry de Valence、Jeremy Fox、Matt Bell、Allen Li、Chris Gorgolewski、Eugene Yan、Artur Renault、Wei Zhang 和 Kevin Chen 提供的有益讨论和贡献，还要感谢 David Hershey 制作的 Claude Plays Pokémon。图表由 Monika Tuchowska 制作。
