---
title: "Databricks Genie One 技能指南：让 AI 先采访你，再像带新人一样验收"
date: 2026-11-16T00:00:00.000Z
tags: ["AI 实操", "Databricks", "Genie One", "Agent Skills", "企业 AI", "工作流"]
summary: "团队里只存在某个人脑子里的做事方法，可以写成一份 AI 每次照做、全公司共用的配方。"
---
> **原文链接**: [https://www.databricks.com/blog/teach-genie-one-your-workflows-ultimate-guide-skills-genie-one](https://www.databricks.com/blog/teach-genie-one-your-workflows-ultimate-guide-skills-genie-one)
> **来源**: www.databricks.com
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/databricks-genie-one-skills/) · 2026/11/16
> **说明**: 本文由 AIHot汪 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

[跳转到主要内容](https://www.databricks.com/blog/teach-genie-one-your-workflows-ultimate-guide-skills-genie-one#main)

- Genie One 理解你的业务；Skills（技能）教会它你的工作方式：Genie Ontology 保存你的定义，而 Skills 则捕获你依赖的步骤、流程、检查点和格式。
- 映射你的工作流，然后用 Genie One 构建它：思考工具、顺序、检查点和触发器，让 Genie One 对你进行访谈并编写 Skill。
- 像 Genie 在新任务的第一周那样测试它：用人们真正提问的方式提问，将结果与黄金参考标准进行比对，并在对话中进行纠正。

每个团队都有规范其工作方式的“配方”（recipes）。财务部门如何组装月末报告，销售运营在预测通话前执行哪些检查，领导层在回顾会议时期望的格式。这些模板存在于人们的脑海中、旧邮件中以及那些无人能找到的“我是这样做的”文档中。

[Genie One](https://docs.databricks.com/aws/en/genie-one/) 已经对你的业务有了很多了解。通过 [Genie Ontology](https://docs.databricks.com/aws/en/genie/genie-ontology)，它不仅学习你的业务定义，还学习你的团队如何使用数据。Skills 增加了一层额外的控制：即你喜欢的工作方式。Skill 是一种 Genie One 可按需遵循的工作流配方，确保每次都能返回一致的格式和输出。例如，有了 Skill，用户可以提示 Genie One “为我们整理上个月的交易报告”，并知道它将按照你们团队准备报告的方式返回报告，包括相同的检查、相同的结构和相同详细程度。

当用户直接调用 Skill 时，或者当 Genie One 认为它与你的请求相关时，它会利用这些 Skill。这意味着你可以不断添加 Skill，每个 Skill 都包含与其任务需求一样多的细节，并且它们的指导仅针对该任务，而不会溢出到你的其他工作中。

Skills 是持久、可重用的资产。Skill 是以自然语言编写的团队工作方式记录，采用开放的 [Agent Skills](https://agentskills.io/) 格式，因此它属于你，你可以保留、审查并在此基础上构建。通过 Unity Gateway 发布后，任何支持 MCP 的代理（包括你的团队已经使用的编码代理）都可以使用相同的配方。一旦它运行良好，就可以在组织中共享，让一个人的最佳工作方式成为每个人的工作方式。

使用 Skills 很容易上手。你可以直接在 Genie One 中通过一次对话构建一个 Skill，只需详细说明你的工作流程即可。

![Genie One 检查 Skill 列表的示意图，它只阅读符合请求的那个 Skill，并遵循其步骤、检查和格式。](https://www.databricks.com/sites/default/files/blog_images/teach-genie-one-your-workflows-the-ultimate-blog-img-og.png)

### 何时使用 Skill

当你发现自己向 Genie One 解释同一件事超过一次时，就应该考虑使用 Skill。良好的迹象包括：

- **它是定期执行的：** 每周更新、按客户进行的调查、按请求生成的工单、会前摘要。
- **它有步骤：** 提取这个，与那个进行比较，然后撰写报告。
- **格式很重要：** 必须包含特定的数字，领导层期望先看标题，再看表格，最后看风险。
- **你有始终适用的规则：** 什么算作异常，哪些数字需要四舍五入，如何签署批准。
- **你一直在手动进行相同的调整：** 如果每个响应都需要相同的调整，那么该调整步骤应包含在 Skill 中。

Skills 与 Genie One 学习你组织方式的其他方法并存。

- **你的业务定义** 属于 Genie Ontology。你在 [Unity Catalog Semantics](https://www.databricks.com/product/unity-catalog/business-semantics) 中整理最重要的定义，Genie Ontology 将它们与你从数据使用方式中学到的上下文相结合。
- [Metric views](https://www.databricks.com/resources/demos/videos/unity-catalog-metric-views-overview) 存储可重用的结构化指标，例如如何计算“净销售额”或“毛利率”。
- [Pages](https://docs.databricks.com/aws/en/uc-semantics/pages) 存储概念和分类法的书面定义，例如什么算作“活跃客户”或“合格销售线索”。
- [Domains](https://docs.databricks.com/aws/en/uc-semantics/domains) 按业务领域（如财务或销售）组织内容。
- **适用于每次对话的约定** 属于工作区指令（workspace instructions）。
- **个人事实**，如你的角色或报告货币，属于记忆（memory）。

**技能包含方法：** 即完成某项工作的步骤、检查项和格式。Genie 本体（Genie Ontology）告诉 Genie One 事物的含义，而技能则告诉它以特定方式完成某项任务。

技能还与 [Genie 智能体](https://www.databricks.com/product/genie/agents) 协同工作。Genie 智能体是组织中某一领域的专家。它了解特定领域（如销售、财务或人力资源）的指标定义、表、连接关系和业务规则。技能则是针对特定任务的配方：包括步骤、检查清单和输出格式。例如，销售管道 Genie 智能体了解管道表、连接关系和阶段定义。“每周预测风险备忘录”技能指示 Genie One 将本周的管道与上周进行比较，标记滑落的交易，并生成一页纸的备忘录。Genie 智能体提供领域知识，而技能则为 Genie One 提供工作流。

### 在构建之前映射工作流

技能的质量取决于你对工作描述的准确程度。在开始之前，请从头到尾梳理任务并回答以下几个问题：

- **在什么条件下应使用它？** 用户会说什么或问什么，表明此技能适用？
- **它使用哪些工具和数据？** 涉及哪些数据、Genie 智能体、文档或 Gmail、Google Drive 等连接工具？
- **事情发生的顺序是什么？** 某些步骤依赖于其他步骤，例如在提取数据之前先确认哪个月份已完成。
- **在哪里需要深入挖掘？** 某些步骤应重复执行，直到问题得到解答，例如将异常结果分解，直到能用一句话解释为止。
- **每次都需要检查什么？** 检查不仅限于数字。它们还可以是结果必须满足的条件，例如文档始终包含团队期望的四列表格。
- **结果应该是什么样？** 输出是书面摘要？一封电子邮件？一个需要归档的工单？包括章节、长度、语气以及最终存放位置。
- **你希望在何处拥有话语权？** 决定技能是直接生成完整结果，还是暂停供你审查，或先回答一些前置问题。

然后将其交给 Genie One。用你自己的语言描述工作流，并要求它在编写任何内容之前先对你进行采访。Genie One 利用通过 Genie 本体已知的知识，因此它的问题侧重于你的工作方式，而不是你的数据含义。

#### 示例：构建月度交易简报

商业财务团队每月为管理层撰写交易简报。工作流描述起来很简单：提取上个月的数字，根据几条规则检查每个渠道，深入调查任何异常，查找团队解释这些异常的电邮，然后撰写简短的简报。

![月度交易简报技能的六步流程，包含一个深入调查异常情况的循环和一个细化结果的循环。](https://www.databricks.com/sites/default/files/blog_images/teach-genie-one-your-workflows-the-ultimate-blog-img-1.png)

用几句话描述后，这就足以让 Genie One 开始工作了。它通过 Genie 本体自行找到了相关的 Genie 智能体和受管指标视图，然后询问方法：哪些指标每月都重要，显示哪些细分，什么算作异常，撰写内容应该是什么样，以及是否暂停供审查。用自然语言回答就足以让 Genie One 编写技能。

![Genie One 在创建月度交易简报技能之前，就范围、细分和什么算作异常提出结构化问题。](https://www.databricks.com/sites/default/files/blog_images/teach-genie-one-your-workflows-the-ultimate-blog-img-2.png)

### 决定每个部分的严格程度

判断力是使技能超越定时报告的关键。仪表板或固定作业每次执行相同的操作。Genie One 可以使用技能来做出决策，例如选择最值得管理层关注的三个变化，追踪异常结果直到其合理并用自然语言解释，就像你信任一位经验丰富的同事那样。

这并不意味着所有事情都应该保持开放。有些部分每次都需要完全一致地输出，而另一些部分则更适合交由 Genie One 自行判断。要有意识地明确哪些属于哪一类。严格的规则适用于那些他人依赖的内容：随时间推移进行对比的数据、其他团队或系统期望的格式、决定哪些内容需要进一步审查的阈值，以及必须始终存在的免责声明或签批。

条件也值得明确说明：哪些内容必须始终出现，以及当某些内容缺失时应该发生什么。例如，交易简报始终包含观察列表，即使它仅显示“未突破任何阈值”，因为缺失的章节看起来像是遗漏了步骤。

### 小技能，串联使用

由于 Genie One 只读取它所需的技能，因此保持技能具体且专注是有利的。一个能出色完成单一任务的技能，比试图包揽一切的技能更容易测试、修复和复用。真正的收益在于小技能可以串联起来。

一种有用的思考方式如下：

- **某些技能执行特定任务**，例如生成交易简报。
- **某些技能持有共享知识**，例如团队针对领导层文档的风格指南。
- **某些技能按顺序运行其他技能**，例如月度打包流程，先运行交易简报，然后运行现金摘要，最后将它们整合在一起。

例如，只需更新一次风格指南技能，其他所有使用该技能的都会自动获取更改。从一个技能开始，然后在指令开始涵盖两个不同任务时，或者当你注意到相同的规则被复制到第二个技能中时，将其拆分。

### 像 Genie 在新任务上的第一周那样进行测试

Genie One 配合新技能，就像一个有能力的新员工：聪明且学习迅速，但你需要检查其最初几次的工作成果，以确保其交付内容符合你的期望。以人们实际使用的方式测试该技能。用自己的语言提问，而不是直接提及技能名称，并根据你已知的内容检查结果。

以下习惯可以使测试更快：

- **保留黄金参考：** 一旦结果以你期望的方式返回，要求 Genie One 将其保存为技能中的匹配示例。这为 Genie One 提供了明确的目标，并在技能发生变化时为你提供比较基准。
- **在对话中纠正：** 说明哪里错了以及你期望的结果是什么。Genie One 会编辑技能并立即重新运行工作。
- **开启新聊天以重新测试：** 这可以确认更新后的技能独立工作，而不仅仅是在你修复它的那个对话中有效。

#### 示例：测试技能

假设已构建了一个月度交易简报技能。Genie One 提取上个月的数字，标记任何异常（例如某产品线增长远快于其他产品），检查团队收件箱以获取上下文，并撰写简短简报。在第一次运行时，有两处需要修复。它报告的是九月，但该月的数据仍不完整；并且它标记的产品线规模过小，其变动并不重要。

这两点在一条消息中都得到了修复。Genie One 被指示仅在数据完整时才报告某个月份，并忽略销售额低于 50,000 美元的任何内容。它更新了技能并重新运行了八月的简报，显示了文档中的每一项更改。

![在 Genie One 聊天中纠正技能，交易简报文档已从九月更新为八月，并跟踪了更改。](https://www.databricks.com/sites/default/files/blog_images/teach-genie-one-your-workflows-the-ultimate-blog-img-3.png)

随后，Genie One 在新聊天中重新进行了测试。“为我们整理上月的交易报告”加载了该技能，但未提及名称。这次 Genie One 报告的是八月，即最新的完整月份，并且仅标记了两个足够重要的项目：在线市场退货率的上升和业务销售的激增。它在 Gmail 中搜索了团队的“Trading Notes”标签，并找到了一封解释每个项目的电子邮件：一家零售商的免费退货活动和一个一次性酒店订单。

![Genie One 从简单请求中加载交易简报技能，检查哪个月份已完成，并搜索 Gmail 以获取上下文。](https://www.databricks.com/sites/default/files/blog_images/teach-genie-one-your-workflows-the-ultimate-blog-img-4.png)

### 通过 Unity Gateway 管理技能

技能应像其他可信资产一样进行管理。Unity Gateway Skills（Beta 版）为您的组织提供了一个中央平台，用于发布、发现和治理技能。当您在 Genie One 中发布技能时，它会成为 Unity Catalog 对象，受与其他数据资产相同的权限、标签和审计保护。您可以决定谁可以使用它以及谁可以编辑它，无需维护多个副本以保持同步，团队可以找到已存在的技能，而不是重新构建。

### 与团队共享

技能最初是供您个人使用的。当某个技能对组织中的其他人也有价值时，请通过 Unity Gateway 发布它，并与需要它的个人或组共享。他们可以在 Genie One 中立即启用它。任何获得编辑权限的人都可以改进该技能，使其对所有人受益，而其他任何人都可以克隆它以创建自己的版本。

### 设置定时任务

定期运行的技能不需要您手动请求。在 Genie One 中创建定时任务，并将其指向该技能，例如“在每月的第一个工作日运行月度交易简报”。结果会出现在聊天线程和电子邮件中。如果该技能通常需要您进行审核，请告诉它在定时运行时该做什么，因为此时没有人来回答。

### 探索细节

您不需要打开技能即可使用它，但了解其内部结构会有所帮助。Genie One 编写的每个技能都会保存在您的工作区中，作为一个包含 SKILL.md 文件的文件夹，您可以在 Genie One 的 **Customizations > Skills** 下找到所有自定义技能。每个技能都以名称和描述开头，Genie One 会根据这些信息判断技能是否相关。支持性文本文件（如模板或黄金参考文档）与其并列存放，仅在步骤需要时读取。

接下来的说明是自然语言。这部分交易简报技能说明了 Genie One 生成的文档，包括对“哪些因素发生了变化及其原因”的判断，以及必须始终存在的观察列表。

![月度交易简报技能指令结合了基于判断的](https://www.databricks.com/sites/default/files/blog_images/teach-genie-one-your-workflows-the-ultimate-blog-img-5.png)

您可以直接编辑技能，或选择 **Edit with Genie**。即使技能运行正常，也值得阅读 Genie One 编写的说明。每一行都是它每次都会遵循的指令，审查它是发现未意图包含的规则或步骤的最快方法，也是添加新内容的最佳途径。

### 编写您的第一个技能配方

Genie One 已经了解您的业务。技能教会它您的工作方式。您编写的每个技能都意味着减少了一个仅存在于某人头脑中的流程。选择一个您经常解释的任务，将其梳理出来，使用 Genie One 构建它，并测试直到它按照您自己处理的方式返回结果。

文本：打开 Genie One 并描述您每月执行的一项任务，然后请求它帮助您将其转化为技能。了解更多关于 [Genie One 中的用户技能](https://docs.databricks.com/aws/en/genie-one/chat)、[Unity Catalog 语义](https://docs.databricks.com/aws/en/uc-semantics) 和 [Unity Gateway 技能](https://docs.databricks.com/aws/en/agents/uc-skills) 的信息。

相关标签：

[最佳实践](https://www.databricks.com/blog/tag/best-practices)

#### 在您的收件箱中获取最新文章

订阅我们的博客，将最新文章直接发送到您的收件箱。

### 注册
[查看所有博客](https://www.databricks.com/blog)
