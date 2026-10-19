---
title: "Anthropic 内部就业报告：初级技术招聘占比从27%降至9%，员工开始管理 Agent"
date: 2026-10-18T00:00:00.000Z
tags: ["研究解读", "Anthropic", "AI就业", "Agent", "工作方式", "聚合"]
summary: "AI先接走一部分任务，再改变人的工作重心。沿着销售、文案与研发的真实变化，看懂招聘、协作和新人成长正在承受什么影响。"
---
> **原文链接**: [https://www.anthropic.com/research/employment-at-anthropic](https://www.anthropic.com/research/employment-at-anthropic)
> **来源**: Anthropic
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/anthropic-employment/) · 2026/10/18
> **说明**: 本文由 AIHot 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

经济学

## Anthropic 的就业变化
2026 年 10 月 16 日[以 PDF 格式阅读](https://www-cdn.anthropic.com/72628f1863c53432195db83279252dfd2cb53158/Employment%20at%20Anthropic.pdf)![Anthropic 的就业变化](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2Fe6c18d30f931ae76d4b600558f5a11377306f1d9-2000x1125.jpg&w=3840&q=75)

*Nathan Wilmers, Regina Catipon, Maxim Massenkoff, Peter McCrory*

AI 如何重塑 Anthropic 的工作和就业？作为一家处于 AI 应用前沿的公司，Anthropic 可能成为 AI 将如何改变整个经济体的工作组织、招聘和劳动力需求的重要先行指标。

### 主要发现

- Anthropic 招聘初级技术岗位的比例有所下降。这一现象发生在 AI Agent 的工作时长相对于员工工作时长迅速扩张的背景下。截至 8 月，交互式 AI Agent 的工作时长与员工工作时长之比达到 6:1。
- 随着 AI Agent 在公司内的普及，Anthropic 的人均代码产出量增加，每位销售代表的签约量增加，处理的合同数量也增加。追踪同一批员工随时间的变化发现，随着他们采用新的 AI 工具，其产出量有所上升。
- 这种加速使得人类注意力成为 Agent 产出的瓶颈。即使对于非技术员工来说，阅读其 Claude Agent 的全部输出也需要占用他们一半的工作周。对此，员工转向“元工作”（meta-work），即构建可视化工具和监控 Agent 管道。
- 工作组织的变化反映在招聘经理优先事项的转变上，他们越来越强调自主性和判断力，而非特定的技术领域专业知识和实施能力。

### 引言

在日益强大的 AI 背景下，我们可以期待工作和就业发生哪些变革？Anthropic 值得研究，因为它已经围绕 AI 彻底重塑了其工作流程。Agent 穿梭于 Slack 聊天中并安排会议。它们自主修复错误，并集体处理庞大的工程项目。Agent 的工作时长是人类的 6 倍。Anthropic 正在发生的变化为工作和就业的未来提供了先进的信号。

本报告基于 Anthropic 全面的内部数据，涵盖就业、AI 使用、产出指标、员工调查、内部沟通模式、员工日历数据和招聘决策记录。报告结合 17 次员工访谈对这些定量数据进行了背景化分析。

我们发现，尽管公司规模在扩大，但初级技术岗位的相对招聘速度放缓。工程师和非技术员工的生产力都大幅提升，尤其是在他们采用编码 Agent 时，提升尤为显著。招聘经理越来越强调应聘者的自主性和判断力，而非特定的技术专业知识。在 AI 密集型组织中工作的一个显著特征是，当可能时，员工会不断面临将自己从这一瓶颈位置中“精简”出去的压力。一位工程师形容工作面临着“一支由 Claude 组成的军队，每一个都在请求我的注意力”。Anthropic 的员工仍然至关重要。但他们贡献的性质已经改变。

Anthropic 通过建立早期预警系统来追踪面临中断风险的职位，并随着职位的演变优先考虑内部重新部署，以应对这些变化。这些在 AI 发展和工作场所变革前沿采取的行动，展示了特定的组织承诺如何塑造 AI 对就业的影响。但它们也提出了关于这些承诺究竟应该是什么的困难问题。

### 前沿的劳动力需求

Anthropic 迅速扩张。但与早期一代大型科技公司相比，其每单位收入所雇佣的人员更少。Anthropic 成立五年，其人均收入是 Meta 和 Google 在其自身快速增长高峰期人均收入的 2 到 4 倍。[1](https://www.anthropic.com/research/employment-at-anthropic#footnote-1)

哪些职位消失了？在 Anthropic 内部，2026 年 1 月，在核心技术职能中出现了关于初级技术员工需求下降的讨论。那些在工作中最依赖 Claude 的团队发现，编写代码和查找错误越来越多地可以外包给 Claude。新能力的模型加剧了这种认知：“引起关注的是性能工程师的提升尤为明显，这基本上在一夜之间改变了我们的招聘标准。”

到四月，工程和研发团队已降低了对低级别技术岗位招聘的重视程度。当月进行的调查显示，多数经理表示由于人工智能的影响，他们正在针对不同的技能组合进行招聘。约三分之一的机器学习（ML）经理和五分之一的软件工程（SWE）经理表示，由于人工智能的影响，招聘量有所减少。

就业结构的变化引人注目。图 1 显示，自 2025 年初以来，Anthropic 技术部门初级员工的占比从 21% 降至 14%。初级技术人员的招聘比例下降得更快，从 27% 降至 9%。自 2025 年 12 月以来，初级岗位的招聘数量下降尤为明显。

![](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2Fe5dc89d3bceb2fcb9509ec35aa22f11131a9d8eb-1920x1080.png&w=3840&q=75)

**图 1：Anthropic 初级技术招聘的减少。**

与此同时，Anthropic 内部技术部门的整体就业占比也在下降，从去年同期的 61% 降至 56%。随着公司扩张，技术招聘在绝对数量上持续增长，但销售、财务和招聘领域的密集招聘速度超过了技术招聘。这部分转变是公司规模扩大时业务职能自然扩张的结果。另一部分可能反映了编码工具日益成熟，使得非技术员工能够自行开发软件。例如，一位销售代表设计了一个定制仪表板和管道，以适配其工作需求：“这种构建原本超出了我的专业范围，尤其是涉及用户界面、连接所有工具以及 MCP 的部分。但我花了大约三到四个小时，通过不断迭代完成了它。”针对非技术员工的以编码为重点的 AI Agent 会话（定义为基线时无代码提交的新员工除外）从 2025 年 8 月的每月 2 次激增至 2026 年 5 月的 90 次。

然而，这种招聘结构的变化不仅仅是一个关于自动化编码使其扩散至 [其他领域专家](https://www.anthropic.com/research/claude-code-expertise) 的故事。在技术部门内部，截至 2026 年 4 月的一年中，不活跃编码的员工占比（定义为过去 30 天内无代码提交）下降了近一半。这部分原因是非工程师占比的减少：例如，工程师与产品经理的比例约为 17:1，且自 2025 年以来有所增加。经理的代码提交数量也翻了一番。技术团队中的监督和协调角色越来越多地涉及编写和发布代码。

非技术招聘并未加速的一个领域通常是随公司规模扩张而增加的管理职能。得益于 Agent 助手、自动化审核以及工单服务外包，Anthropic 在迅速增长的同时，行政事务依然精简。一位财务经理构建了一个采购请求审核 Agent，并向同事解释道：“它只是试图找出那些耗费大量小时数的任务，以便大家能专注于其他工作。”

即使是与面对面互动紧密相关的行政工作，增长也较为缓慢。一位行政助理构建了一个用于调度和邮件筛选的个人助手 Agent，并解释道：“我认为我们已经超越了 Claude 替代真正入门级行政角色的阶段，”转而将工作重心放在更高层级的“幕僚长”任务上。

这些变化已经涉及人员重新分配：在 2026 年，在公司工作至少一年的员工每月跨部门调动的可能性比 2025 年高出 50%。随着团队将工作移交给人工智能 Agent，整个团队也被重新分配。考虑一个产品设计团队，他们曾撰写如 Claude.ai 上的问候语等内容：“你好，夜猫子；”“咖啡和 Claude 时间？”在 2026 年春季，该团队开发了一个上下文图，有效地引导 Agent 编写引人入胜的产品内容。其经理解释说，这“扩大了团队的规模”，但也引发了一个问题：人类作家还有什么可做的？随后，该团队转向了 Agent 提示工程，开始为 Claude 编写模型评估和提示词。“使用语言来驱动人类行为的作家，现在正利用它来驱动 Claude 的行为。”

### AI 是否正在推动 Anthropic 的生产力提升？

这些变化是否归因于 AI？在 Anthropic，人类只是覆盖在日益壮大的 AI Agent 群体之上的一层薄纱。基于 Agent 会话遥测数据，2026 年 3 月，自主和交互式 Agent 的工作时长总和首次超过人类工作时长。这部分原因是由大量 Agent 集群进行的工业级软件工程工作，包括填补无数常规测试和检查、维护不断增长的基础设施代码库，以及推动大规模代码库的翻译工作。但即使仅关注由个别员工部署的 Agent（如图 2 所示），到 8 月份，Agent 的工作时长也达到了其人类处理者的 6 倍。

![](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2F042b829f8c8850b596dfb6feaa323d1e911b21bb-1920x1080.png&w=3840&q=75)

**图 2：Agent 时长超越人类时长。** 注：我们仅限于员工主导的交互式会话，并合并子 Agent。工作时间概念为 Agent 运行时间，包括推理和主动工具使用，但排除任何超过 30 分钟的等待时间。人类工作时长按人头计算，假设每周工作 40 小时。

Anthropic 是一家软件生产商，流经这些 Agent 的大量 token 主要用于生成软件代码。仪表板监控着在公司范围内运行的 Agent 集群。但个人助手 Agent 也会监控员工的日历和消息，安排日程、发送从传入消息中积累的待办事项列表，并自动向员工介绍其即将举行的会议的人员和目的。token 触及的范围日益广泛的日常工作任务。

![](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2F1865c3a561e790824826f29a27c771ce62c67eaf-1920x1252.png&w=3840&q=75)

**图 3：各职能领域的生产力繁荣。** 注：对底层索引输出数据进行的 Loess 平滑拟合。

所有这些 token 意味着什么？图 3 绘制了具有可衡量产出的各类职位随时间变化的产出情况。这与之前[调查 Anthropic 工程师](https://www.anthropic.com/research/how-ai-is-transforming-work-at-anthropic)和描述[模型训练和研究的自动化](https://www.anthropic.com/institute/recursive-self-improvement)的报告一致，工程师的代码提交量增长最快，速度是六个月前的 5 倍。数据科学家也在更多地查询 Anthropic 不断增长的数据量，要求 Claude Agent 将实时指标获取到仪表板和决策者手中。但图 3 显示，即使非技术员工也看到了产出的提升，随着编码 Agent 的普及：律师处理了更多合同；应付账款部门加快了发票处理速度；销售人员达成了更多交易。

但这所有的一切都是由于 Claude 的使用吗？在同一时期，公司业务实现了爆炸式增长。销售强大的模型时，更容易达成交易。为了评估 AI 的独立影响，我们将采用 Agent 编码工具的员工与尚未采用这些工具的员工进行对比。这使我们能够比较同一月份在公司工作的员工，因此他们面临相似的业务背景，但使用不同的工具进行处理。然而，请注意，工具采用并非随机的：例如，如果即将推动某个重大新项目的员工决定为此升级工具，这将导致我们的估计产生偏差。

我们跟踪了 192 名工程师，观察他们采用编码 Agent 的情况，并与研究期间未采用 Agent 的 74 名工程师进行对比。图 4 显示，在采用后的几个月里，工程师添加的代码量急剧上升。更多的代码并不一定意味着更好的代码或[业务影响](https://www.nber.org/papers/w35275)。为了测试 AI 生成的代码垃圾（code slop），我们研究了 Anthropic 的代码提交。我们比较了同一员工、在同一月份、在同一编码目录中提交的代码，但区别在于代码是由编码 Agent 生成的，而不是由人类员工直接编写的。代码质量有许多维度，AI 错误可能比人类错误更难识别。但我们发现，随后被移除或回滚的代码行比率没有差异。

图 4 还考察了工程师采用首个完全自主 Agent 之后发生的情况。与未采用者相比，采用者原本就处于陡峭的上升轨迹中。这表明，转向完全自主 Agent 的员工此前已经在提升其产出。

![](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2F15abba062e588ec86e0f9466f16bccbc701444e3-1920x1641.png&w=3840&q=75)

**图 4：基于个体内估计的生产力提升，来自交错式 AI 采用。** 注：系数比较了 coding agent 采用者与未采用者，并控制了个人和日历月的双向固定效应。处理时间基于个人拥有至少五个 agentic sessions 的第一个月。条形图表示从按个人聚类标准误计算的 95% 置信区间。质量面板比较了由个人直接编写的代码与由同一人的 coding agent 编写的代码。质量代理变量包括：90 天内因任何原因被删除的行数占比；因 bug 修复 specifically 被删除的占比；整个 commit 是否被明确 revert；添加 lint 抑制注释；添加需要修复的注释；以及标记测试为跳过、重试或允许失败。

这些模式是否超越了编码领域，延伸至知识工作的更广泛转型？Anthropic 的销售代表自去年九月起稳步采用 AI Agent。图 4 显示，在销售代表采用 Agent 后，他们与更多客户达成了交易。这一模式的部分原因可能是拥有更多销售机会的代表选择了自动化。但也可能反映了记录和常规沟通的自动化。一位客户经理解释说，Claude 自动化处理了电子邮件起草和客户管理软件集成，替代了他们之前约 20% 的工作任务。另一位则表示，类似的自动化使他们能够专注于面对面交流，使他们能够比之前多接触 30% 的客户：“每次你第二次做某事时，你都会想，好吧，我该如何利用 Claude 让它不再需要我做第三次？”

除了销售之外，Anthropic 的一位律师构建了一系列 Claude 自动化流程，用于扫描风险和机会、分类法律问题，并对面向公众的文案进行初步法律审查。一位招聘人员使用 Claude 协助候选人搜寻、跟踪申请，并完成一项原本需要“也许几周”才能完成的分析工作，这使他得以重新设计过时的面试问题并会见更多申请人。

所有这些都表明，随着 AI 能力的提升，它影响了 Anthropic 范围内的广泛职位。描述性数据显示，在使用 Claude 处理最复杂任务的职位中，初级职位的增长放缓（图 5）。

![](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2Ff68fdd1f18d36b4e45e17f0aaaa49541bade7dcd-1920x1331.png&w=3840&q=75)

**图 5：按 Claude 使用复杂度划分的初级职位增长。** 注：按职位级别绘图。增长率比较了 2026 年 1 月与 2026 年 7 月的人员数量。AI 复杂度基于对 Agent 日志的自动化编码器（在人员减少之前，即 2025 年 10 月至 12 月）并进行百分位转换。点的大小按该职位 1 月的人员数量缩放；回归线是根据加权点拟合的。

### 瓶颈与流程：AI 密集型工作场所中的新旧任务

重度 AI 采用不仅重塑了就业和生产力，还推动了工作流程的持续变化，产生了新任务并改变了员工对其工作场所的认知。一位员工将其描述为“Anthropic 内部不断施加的压力，要求尽可能快地行动并为所有事情使用 Claude”，另一位则表示“我们预期一周内完成的事情，在其他地方可能需要三个月”。一项内部员工调查询问 Anthropic 的工作流程是否让受访者达到了最大生产力：2024 年底有 44% 的员工表示同意；到 2025 年 11 月这一比例升至 58%（2026 年 4 月，75% 的人回答“是”，但问题因省略了“尽可能”而变得弱化）。截至八月，[Anthropic 的员工预计](https://www.anthropic.com/research/ai-expectations-gap) AI 将在 2030 年能够完成他们 75% 的工作，而其他美国人的这一比例为 28%。

这些不断攀升的生产力预期通过内部模型发布的节奏得到了生动体现。一旦新模型可用，Anthropic 的员工便开始在交互式编码 Agent 会话中挑战更困难的问题。我们通过自动化的 Claude 评分器来衡量这一点，该评分器根据深度、范围和涉及的系统数量对去标识化会话的任务需求进行评级。旧模型难度第 90 百分位以上的任务占比急剧上升，约增加 30%（从所有任务的 10% 增至 13%），并在模型发布后的几周内保持高位。而分配给 Agent 的简单任务端几乎没有变化。

Agent 生产力的螺旋式上升转化为投射在人类屏幕和注意力上的输出。一位工程师将其比作 babysitting（保姆式看护）：

> “他们就像在说：‘我需要打开我的果汁盒，而且果汁盒没打开是紧急情况。’并且他们表达这种关切的方式，与那个切伤手指正在流血的人所表达的关切程度一模一样。[...] 当你当保姆时，每个孩子都会向你提出同等程度的关注需求，而各种 [Claude] 也是如此。”

在 2026 年 4 月的调查中，关于 AI 如何影响日常工作的开放式问题中，27% 的人描述了 Claude 工具带来的生产力提升，20% 的人描述了他们的角色从实际执行工作转变为管理 Claude。

在这种由模型驱动的加速背景下，人类注意力成为一个持续的瓶颈。在交互式多轮会话中，绝大多数 Agent 的会话时间并没有用于实际工作，而是用于等待。我们通过从每个交互式会话的总时钟时间中减去每个 Agent 的活跃工作时间来追踪空闲时间。Claude 会话中约有 80% 的时间在空闲等待人类输入。正如一位工程师所说，人们正在“成为 Agent 的瓶颈”。

阅读交互式会话中 Claude 的所有输出究竟需要多少时间？对于每个交互式会话，我们将每个会话的 Agent 输出 token 转换为单词数，假设采用平均人类阅读速度。图 6 显示，在过去六个月中，技术职能部门的编码 Agent 输出量急剧上升。但对于非技术团队而言，交互式 Claude 会话输出的内容量也占据了工作周的一半以上。Claude 文本的洪流需要整理。

![](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2F1eb1610d350eeae63bf6300c5a17b66a42667da6-1920x1200.png&w=3840&q=75)

**图 6：将阅读 Claude 视为全职工作。** 注：小时数通过将输出 token 转换为单词估算，假设每个 token 0.75 个单词，每分钟阅读 250 个单词。

应对这种洪流的一个解决方案是日益增长的自动化。但这需要不同性质的工作。为 Agent 编写的书面操作指南从 2025 年 7 月的几百份增长到一年后的 8,500 份。一位工程师设立了 Agent 幕僚长（chief of staff）来分类处理 Agent 请求。另一位为他们的 Claude 团队撰写了绩效评估：“嘿，我们来谈谈我们的沟通风格中哪些有效、哪些无效。”招聘人员构建了集成仪表板，利用 Agent 揭示问题并启动操作。一位律师将注意力从审查法律问题转移到为法律建议做“SEO”，你需要编写框架让 [客户] 的 Agent 能够发现这些内容。

图 7 显示，这类元工作（meta-work）从 2025 年秋季占员工平均交互式 Claude 会话的 10% 跃升至 2026 年春季的 22%。这一增长很大程度上归因于特定的 Agent 管理：编写多 Agent 运行的规范、让一个 Agent 审核另一个 Agent 的输出，以及监控管道。跨职能领域，人类的参与越来越从特定的代码或写作内容抽象出来，转向确保 Agent 有效完成任务所需的工具链。

![](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2F94aede8c44a52ad7ecf8efdc9cb72156d72b7c6d-1920x1187.png&w=3840&q=75)

**图 7：成为 Claude 的管理者。** 注：Meta-work（元工作）的估算基于自动编码器对 2,000 条单行聊天摘要样本的评估，依据是这些摘要是否侧重于为其他 Agent 构建 Claude 技能、计划和审查、Agent 管道的仪表板和监控器，以及记录工作是如何完成的，而非实际工作本身。

尽管 Agent 的可靠性有所提高，并且在这些用于监督它们的工具上进行了大量投资，但人类的信任和问责制仍然至关重要。一名员工解释说，越来越多的情况下，追查 bug “揭示了这些实际上需要一定程度的人类召集、决策和治理来解决的组织性或系统性或技术债务问题。” 在一次次采访中，员工们描述面对面的协调是必不可少的。根据日历数据，中位数员工花在会议上的时间比一年前多了 20%。这部分反映了公司的增长，以及向会议密集型的非技术角色的转变。但即使在技术个人贡献者角色的员工中，过去一年的会议时间也增加了 16%。宏观战略问题触及广泛的相关职位，通常需要与他人进行辩论和互动。从管理 Agent 中抽身出来的典型表现通常是跳进一场会议。

总体而言，技术和非技术角色的工作实施部分都实现了自动化（编写代码、识别 bug、记录进度、起草邮件）。工程师描述自己成为了 Agent 的领导和管理者；非技术员工则描述了越来越多的从事他们工作中战略性的部分：“原本占 20% 的战略部分变成了工作的 90%。” 但对于许多非技术角色来说，核心实施工作也是人际性质的：销售电话、面试、针对复杂问题的跨职能对齐。所有这些仍然属于人类。

还要考虑到 Slack 频道，它们既提供了 Anthropic 沟通的前台页面，也提供了后台渠道。Agent 渗透进 Slack，最终出现在近一半的活跃公开频道中。图 8 聚焦于单个大型部门的沟通网络，基于该部门成员互动的所有公开 Slack 频道。它通过是否参与了 Slack 线程来链接人类和 Agent 参与者。该图显示了 Agent 的显著增长，橙色圆点蓬勃发展并主导了整个网络。

[视频/音频](https://cdn.sanity.io/files/4zrzovbb/website/8f9591116db7ee91487f770222ddc524d551d867.mp4)

**图 8：Agent 进入沟通网络。** 注：蓝色圆点为员工；橙色圆点为 Agent 线程。连线表示同一线程中人类或 Agent 之间的互动。

Agent 更多地出现在专门用于 Claude-人类互动的频道中，而不是在现有的主要人类频道中大量发消息。人类沟通的基础结构和密度变化不大。Agent 并没有取代人类互动，而是对其进行了补充：该部门的人类线程保持了相同数量的人类回复，同时额外增加了 Agent 回复。Agent 成为单个员工的团队，而不是同时与许多员工有高连接性的节点。

随着人类在日益庞大的 AI Agent 舰队中工作，他们面临着将人类工作转移到 Agent 可见频道的压力。如果在一个面对面的会议上做出了决定，而没有笔记或报告出现，Agent 就会错过更新其目标和假设的关键上下文。一名员工解释说，由于他们的名字出现在一份关于 Claude 周边产品的几个月前的文档上，导致 Agent 在他们职责发生变化很久之后，仍然不断提出关于 T 恤和马克杯的请求。在未记录的会议和直接消息中的私人工作，在 AI 密集的工作场所中是看不见的、令人困惑的，并且受到劝阻。一名研究人员将这种默认的开明态度描述为 Anthropic 全面整合 AI 的关键：“大多数组织并不这样运作，我认为这是一个巨大的转变，因为领导者必须在公开场合捍卫反馈。” 为 AI 提供上下文的需求要求对人类工作和决策具有可观测性。

在这样的职场中，谁能蓬勃发展？Anthropic 工作内容的转变也体现在招聘经理在招聘决策中优先考虑的技能变化上。我们使用自动化代码工具处理了自 2024 年以来在 Anthropic 招聘的数千名员工的招聘经理面试评分卡。这些评论是面试官对候选人表现的定性评估。最明显的变化是，更加强调候选人是否展示了创造性地使用 AI 工具的能力。在 2024 年，招聘经理在约 5% 的技术岗位评估和 7% 的非技术岗位评估中提到了候选人在 AI 工具方面的记录。到 2026 年，技术岗位的这一比例翻了三倍，非技术岗位翻了两番。招聘经理越来越关注候选人是否有效使用 AI。

评估中的更深层次变化也显而易见。在针对技术候选人的面试中，增长幅度最大的是关于申请人自主性和判断力的评论。对领域专业知识的讨论在整体评估中的占比缩小。正如一位经理所解释的：“我预计模型将继续存在不稳定性，因此对于我的团队，我希望他们能够在各个领域之间灵活转换。”同样，对于非技术候选人，客户导向和使命导向增加了，而对执行技能的讨论则减少了。招聘经理越来越多地根据候选人的判断力和承诺度来评估申请人，而不是那些被 AI 工具自动化的领域特定技能和执行力。

### 雇主可以采取的措施

Anthropic 对 AI 的深度采用使其成为一个有用的案例。随着 AI 的普及和改进，工作的组织方式可能会像以往的技术变革浪潮一样发生变化。铁路带来了管理型公司，蒸汽动力使工厂成为可能，个人电脑催生了初创企业。使用工具、具备推理能力的 LLM 将需要什么样的新组织形式，而我们在其中的角色又是什么？一种可能性是单人初创公司，每位人类创始人驾驭一群 Agent 以赚取数十亿美元的收入。另一种可能性是由 AI 天才 CEO 建立的公司，仅雇佣人类 Agent 来操作移液管或在国会作证。

Anthropic 看起来并不像这两种情况。它在过去一年中规模扩大了三倍。它不再是一家小型初创公司。它也没有将行政控制权让渡给其模型。书面 Slack 辩论和面对面会议主导着从公司战略到团队决策的一切，AI Agent 的参与很少。在整个公司保持人类工作的可见性，确保自主 Agent 能够从新鲜的情境中进行推理。在知识需求和工作的相互依赖性方面，协调 Agent 团队的个体贡献者看起来更像管理者。在 AI 密集型的组织中，公开地工作和决策至关重要。

随着员工越来越多地将自己的工作视为管理 Claude 团队，他们花费更多时间构建在其各自独特领域内有效完成此任务所需的工具。这种实验意味着员工不断自动化自己的任务。在某些角色中，他们越来越远离最初构建其技能的基础层面工作。当 Agent 快速推进工作流程时，人类的注意力和判断力成为系统努力克服的瓶颈。从销售到法律，人类员工被期望承担更多且不同的任务。角色范围扩大，包括构建产品、管理 Agent 以及处理最佳 LLM 范围之外的战略性和人际性工作。

这些工作和组织及内容的变化伴随着初级技术岗位在员工总数、招聘和职位发布中所占比例的下降。招聘经理越来越关注申请人的自主性和判断力，而不是执行力和狭窄的专业知识。总体而言，Anthropic 的收入增长相对于其就业增长的速度，甚至超过了上一代科技公司早期的快速生产力增长。

将这些模式向前并扩展到整个经济中阅读，表明 AI 的扩散可能会导致工人被取代。先前的研究也发现，[AI 原生初创公司](https://www.hbs.edu/ris/Publication%20Files/26-090_96f92aa0-37d9-4789-beaa-5c0cb87a4032.pdf) 和 [AI 采用者](https://www.nber.org/papers/w34162) 的组织结构更扁平，且雇佣的 [初级员工更少](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5425555)。我们从 Anthropic 能学到什么，以便以服务于周围人类的方式管理 AI 带来的动荡？

我们希望在此谨慎行事。Anthropic 的用工实践中有许多方面无法在整个经济体中复制。

但有三点特征尤为突出。首先，广泛的股票所有权使员工对公司的成功抱有强烈的利益关切。当然，对于一家估值大幅上涨的公司来说，这是一种容易采取的姿态。对于许多公司而言，共享所有权可能不足或不可取。但我们很难想象一种工人友好的 AI 采用方式，其中工人不在成功推广中持有经济利益。如果个体贡献者被期望像受访者所说的那样“管理 AI 智能体”、“做出副总裁级别的决策”并“成为自己的业务线”，那么将他们的利益与组织对齐至关重要。二战后在 1950 年代达成的工会-管理协议正是基于这种交易：美国汽车工人联合会（United Auto Workers）和美国钢铁工人联合会（United Steel Workers）等工会允许管理层对工作重组（甚至强化）拥有特权，以换取与生产率提高挂钩的工资增长以及丰富的福利包。无论受 AI 影响的员工与其雇主之间的新协议如何，分享采用红利的机制都是必不可少的。在 Anthropic，工人将专业知识编码给机器，目睹自己的工作流程不断动荡和中断，并看到他们工作的很大一部分变成了快速阅读其 AI 协作伙伴的输出。他们这样做并非免费。

其次，Anthropic 正在建立一个持续的早期预警系统，以监测面临 AI 驱动转型的工作。一系列针对需求和生产力的岗位级别指标会与 AI 能力和使用情况相对照。这些聚合指标有助于标记工作转移的位置。早期预警系统使公司能够开始将受影响的员工重新分配到技能匹配且风险较低的岗位。随着整个经济体内的公司重新调整以适应加速的工作重组步伐，指导内部员工重新分配的有效系统将变得日益宝贵。随着 AI 进步加快，转向外部劳动力市场来满足 AI 进步提出的每一项新任务将成为更严重的瓶颈。在本报告中，我们发现部门间的流动性增加，工作内容发生变化，以及随着旧任务被自动化，员工转向新任务。建立灵活地在内部重新分配工人的系统对于 AI 密集型组织至关重要。

这种对内部工人重新分配的承诺引发了重要的权衡。一个运转良好的劳动力市场应将工人转移到他们最具生产力的职位，无论是在当前雇主处还是其他雇主处。对重新分配在职员工的承诺可能会使雇主对在招聘新员工时承担风险犹豫不决。在正常的经济条件下，特别是在竞争激烈的情况下，此类承诺可能是昂贵的。

但是，优先重新分配迫使采用 AI 的公司考虑 AI 如何为新产品和新市场创造新任务，而不是将 AI 应用引导至取代人类工人以节省劳动力成本。这可以帮助雇主抵制“[平庸](https://pubs.aeaweb.org/doi/pdfplus/10.1257/jep.33.2.3)”或“[低效](https://academic.oup.com/restud/article-abstract/92/1/69/7612958?redirectedFrom=fulltext)”自动化的诱惑，即 AI 或其他技术仅仅勉强胜过人类工人：雇主取代人类工人，给被取代的工人带来巨大的社会成本（收入损失），同时仅提供最小的生产力收益。

从我们在 Anthropic 看到的情况来看，新颖且持续需要人类的任务与高强度的 AI 使用并存。对这些任务未来集合的不确定性表明，应保持一支灵活的劳动力队伍。正如一位 Anthropic 高管所指出的那样，“一支焦虑不安的劳动力队伍无法发挥其最佳工作状态。”

这些举措中的任何一项都无法阻止强大的 AI 对工作的干扰。事实上，它们也没有直接解决本报告中记录的初级员工招聘放缓问题。对在职员工的就业保护不会惠及那些最初未被雇佣的人。雇主方面的私人行动必须与关于[再培训](https://www.anthropic.com/research/reviewing-the-evidence-on-worker-retraining-programs)和收入支持的远见卓识的政府政策并行。此类政策应基于对 AI 可能带来的工作场所变革规模的清晰认识。

### 引用建议

```
@techreport{wilmers2026employment,

author = {Nathan Wilmers and Regina Catipon and Maxim Massenkoff and Peter McCrory},

title = {How employment is changing at Anthropic},

institution = {The Anthropic Institute},

type = {Technical Report},

year = {2026},

month = oct,

url = {https://www.anthropic.com/research/employment-at-anthropic}

}
```

### 致谢

我们要感谢那些抽出时间接受采访、分享其工作如何发生变化的 Anthropic 员工。此外，我们要感谢 Kate Astbury、Shehzad Bashir、Zoe Blumenfeld、Scott Booth、Henry Brill、Yena Cho、Henry de Valence、Adam Farina、Johannes Hermle、Zoe Hitzig、Hasnain Lakhani、Eva Lyubich、Kerry Persen、Kristina Pham、Sarah Pollack、Hannah Pritchett、Georg Rilinger、Santi Ruiz、Szymon Sacher、Florian Scholz、Meg Tong、Monika Tuchowska、Helen Wang、Kim Withee、Charles Yang 和 Jack Clark 提供的宝贵意见和建议及协助。

### 参考文献

Acemoglu, Daron, and Pascual Restrepo. 2019. “Automation and New Tasks: How Technology Displaces and Reinstates Labor.” *Journal of Economic Perspectives* 33 (2): 3–30. [https://doi.org/10.1257/jep.33.2.3](https://doi.org/10.1257/jep.33.2.3)

Beraja, Martin, and Nathan Zorzi. 2025. “Inefficient Automation.” *Review of Economic Studies* 92 (1): 69–96. [https://academic.oup.com/restud/article-abstract/92/1/69/7612958](https://academic.oup.com/restud/article-abstract/92/1/69/7612958)

Demirer, Mert, Leon Musolff, and Liyuan Yang. 2026. “Writing Code vs. Shipping Code: Productivity Effects Across Generations of AI Coding Tools.” NBER Working Paper 35275. [https://doi.org/10.3386/w35275](https://doi.org/10.3386/w35275)

Ewens, Michael, and Xavier Giroud. 2025. “Corporate Hierarchy.” NBER Working Paper 34162. [https://doi.org/10.3386/w34162](https://doi.org/10.3386/w34162)

Favaro, Marina, and Jack Clark. 2026. “When AI Builds Itself.” The Anthropic Institute. [https://www.anthropic.com/institute/recursive-self-improvement](https://www.anthropic.com/institute/recursive-self-improvement)

Hitzig, Zoe, Maxim Massenkoff, Eva Lyubich, Shaoyi Zhang, Ryan Heller, and Peter McCrory. 2026. “Agentic Coding and Persistent Returns to Expertise.” Anthropic, June 16. [https://www.anthropic.com/research/claude-code-expertise](https://www.anthropic.com/research/claude-code-expertise)

Hosseini Maasoum, Seyed Mahdi, and Guy Lichtinger. 2025. “Generative AI as Seniority-Biased Technological Change: Evidence from U.S. Résumé and Job Posting Data.” SSRN Working Paper 5425555. [https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5425555](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5425555)

Huang, Saffron, Bryan Seethor, Esin Durmus, Kunal Handa, Miles McCain, Michael Stern, and Deep Ganguli. 2025. “How AI Is Transforming Work at Anthropic.” Anthropic, December 2. [https://www.anthropic.com/research/how-ai-is-transforming-work-at-anthropic](https://www.anthropic.com/research/how-ai-is-transforming-work-at-anthropic)

Kim, Hyunjin, and Rembrand Koning. 2026. “AI-Native Firms.” Harvard Business School Working Paper 26-090. [https://www.hbs.edu/ris/Publication%20Files/26-090_96f92aa0-37d9-4789-beaa-5c0cb87a4032.pdf](https://www.hbs.edu/ris/Publication%20Files/26-090_96f92aa0-37d9-4789-beaa-5c0cb87a4032.pdf)

Roodman, David, and Maxim Massenkoff. 2026. “An Evidence Review of Subsidized Job Training.” The Anthropic Institute Working Paper 2026-01. [https://www.anthropic.com/research/reviewing-the-evidence-on-worker-retraining-programs](https://www.anthropic.com/research/reviewing-the-evidence-on-worker-retraining-programs)

##### 脚注

1. Anthropic 的估算数据来自截至 2026 年 4 月的十二个月内部财务和员工人数记录（成立后约五年）。Google 和 Meta 的员工人数和收入数据基于成立后 5 年（分别为 2003 年和 2009 年）提交的 Form 10-K 文件。所有数据均已折算为 2025 年美元。[https://www.anthropic.com/research/employment-at-anthropic#footnote-ref-1](https://www.anthropic.com/research/employment-at-anthropic#footnote-ref-1)
[https://twitter.com/intent/tweet?text=https://www.anthropic.com/research/employment-at-anthropic](https://twitter.com/intent/tweet?text=https://www.anthropic.com/research/employment-at-anthropic)[https://www.linkedin.com/shareArticle?mini=true&url=https://www.anthropic.com/research/employment-at-anthropic](https://www.linkedin.com/shareArticle?mini=true&url=https://www.anthropic.com/research/employment-at-anthropic)

### 相关内容

#### 使用 Claude 设计更高效的量子电路

我们为 Claude 提供了八个量子电路的自然语言规范，并配备了自动评估器来检查和评分其设计。Claude 在很大程度上独立工作，改进了已发表的最佳电路设计，在某些情况下提升了数量级或更多，这可能使实用量子计算机比此前预期的更早实现。
[阅读更多](https://www.anthropic.com/research/designing-efficient-quantum-circuits)

#### Claude 揭示 ECDSA 曲线的起源

困扰数十年的关于最流行的加密标准之一的起源之谜已得到解释。
[阅读更多](https://www.anthropic.com/research/ecdsa-curve-origins)

#### AI 期望差距

在未来几年，AI 将如何重塑经济？关于 AI 对未来经济影响的核心分歧来源是什么？本笔记展示了关于这些问题的新调查证据。
[阅读更多](https://www.anthropic.com/research/ai-expectations-gap)
