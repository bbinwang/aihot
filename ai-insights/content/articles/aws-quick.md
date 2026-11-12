---
title: "技能和代理如何在AWS Quick中运作"
date: 2026-11-11T11:36:33.976Z
tags: []
summary: "原文链接 : https://aws.amazon.com/cn/blogs/machine learning/how skills and agents work in aws quick/ 来源 : aws.amazon.com 发现于"
---
> **原文链接**: [https://aws.amazon.com/cn/blogs/machine-learning/how-skills-and-agents-work-in-aws-quick/](https://aws.amazon.com/cn/blogs/machine-learning/how-skills-and-agents-work-in-aws-quick/)
> **来源**: aws.amazon.com
> **发现于**: 管理台手动提交
> **说明**: 本文由 AIHot汪 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

### 人工智能

## AWS Quick 中技能与智能体（Agent）的工作原理

如果你使用 AI 智能体（AI agents），你可能已经不止一次地解释过同一个任务。你可能会描述如何构建每周状态更新、编写发布说明、管理项目或创建工单。这些都是可重复的任务，你可以使用 [AWS Quick](https://aws.amazon.com/quick/) 通过智能体和技能（skills）对其进行编码。AWS Quick 是一项由 AI 驱动的服务，用于自动化任务、分析数据、构建 Web 应用程序以及进行研究。你可以使用自然语言与其交互，Quick 会使用 AI 智能体根据你的连接数据源和应用程序来处理你的请求。

在本文中，我们将介绍智能体、技能以及你的数据如何在 AWS Quick 中协同工作，以及如何构建和共享适用于你团队的技能。我们还将展示官方目录和自定义智能体如何帮助你利用这些技能。

### 理解基础概念

在本节中，我们将解释帮助你在智能体、技能和数据背景下理解 AWS Quick 的基础概念。

[https://d2908q01vomqb2.cloudfront.net/f1f836cb4ea6efb2a0b1b99f41ad8b103eff4b59/2026/11/04/ML-22266-1.png](https://d2908q01vomqb2.cloudfront.net/f1f836cb4ea6efb2a0b1b99f41ad8b103eff4b59/2026/11/04/ML-22266-1.png)

图 1：Quick 智能体如何遵循指令、加载任务所需的技能、通过连接器采取行动，并基于你的数据提供答案

智能体位于图 1 的中心。它遵循其指令，加载任务所需的技能，通过连接器采取行动，并基于你的数据（空间、知识库、数据集和仪表板）提供答案。

#### 与智能体协作

[AWS Quick 中的智能体](https://docs.aws.amazon.com/quick/latest/userguide/agents-desktop.html) 是一个可配置的 AI，拥有自己的指令、知识来源（空间）和连接器，用于回答问题并为你完成工作。你可以在聊天中与智能体交互，或者让它使用 [例行程序](https://docs.aws.amazon.com/quick/latest/userguide/agents-desktop.html) 独立运行。智能体只能访问你能够访问的资源和服务，并且你可以决定每个智能体被允许执行的操作。

**Quick** 是每个用户都可以访问的默认内置智能体。它没有固定的范围，因此在每次对话中，它会使用你有权访问的任何资源，如你的空间、知识库、仪表板、连接器和技能。你无需预先决定请求需要哪些数据或工具，因此你可以使用 Quick 开始大多数工作。

**自定义智能体** 是你或团队成员为特定工作配置的智能体。例如，人力资源（HR）入职助手，它可以从 HR 团队的空间中回答新员工的提问。你为它提供自己的指令，并将其限制在你用例所需的特定空间、连接器和技能范围内。经过测试并发布后，你可以将其分享给 AWS Quick 账户中的其他用户和群组。有关构建自定义智能体的分步指南，请参阅 [使用 AWS Quick 构建由 AI 驱动的员工入职智能体](https://aws.amazon.com/blogs/machine-learning/build-ai-powered-employee-onboarding-agents-with-amazon-quick/)。

#### 与数据协作

智能体基于你连接到 Quick 的数据提供答案。**空间（Space）** 是经过策划的文档和 AWS Quick 资源的集合，智能体将其作为信息来源。你可以为自己、你的团队或组织中的其他组创建一个空间。你可以将文件和文件夹上传到空间，也可以添加仪表板、知识库、操作连接器和数据集等资源。当你开始与 Quick 的对话时，你可以附加一个空间，以缩小 Quick 在该对话中使用的数据范围。当你将空间添加到智能体时，该空间成为智能体配置的一部分，智能体会在请求需要时利用它。

**知识库**是源自数据源、经过组织和索引的文档或内容集合，旨在优化检索和问答效果。Quick 会从 Google Drive、Microsoft OneDrive、Confluence、Microsoft SharePoint、Amazon Simple Storage Service (Amazon S3)、网络爬虫或 [Amazon Bedrock Managed Knowledge Bases](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html) 等来源同步知识库，并按照同步计划保持其最新状态。

数据集和仪表板来自 [AWS Quick Sight](https://docs.aws.amazon.com/quick/latest/userguide/quick-bi.html)，这是 Quick 中的商业智能功能，仅在通过 AWS Management Console 配置权限的账户中可用。**数据集**是已准备好的数据集合，可直接用于分析和仪表板。**仪表板**是你与其他 Quick 用户共享的分析结果的发布版本。借助数据集，你可以为结构化数据（如数据库表）构建语义丰富的元数据，从而通过自然语言实现复杂的分析用例。

最后，**连接器**将 AWS Quick 链接到外部应用程序或原生工具，使代理能够读取数据并代表你采取行动。**云连接器**将 Quick 连接到 Microsoft Outlook、Slack、Jira、Asana 和 Salesforce 等服务，以及远程托管的 Model Context Protocol (MCP) 服务器。它们在您使用 Quick 的任何设备上均可用。**本地连接器**运行在您自己的计算机上（例如您自行托管的 MCP 服务器），因此只有在该计算机开机并连接时，其工具才可用。有关连接器的完整列表，请参阅 AWS Quick 用户指南中的 [连接器](https://docs.aws.amazon.com/quick/latest/userguide/connections-desktop.html) 和 [特定集成指南](https://docs.aws.amazon.com/quick/latest/userguide/integration-guides.html)。

综上所述，这些功能使你的数据、文档和应用程序可以通过自然语言进行访问，从而让你能够在已连接的数据源中提出问题并采取行动。

#### 使用技能

[技能](https://docs.aws.amazon.com/quick/latest/userguide/skills-desktop.html) 是一套可重用的指令，用于教代理如何执行特定任务。技能也是 Quick 中代理的行为方式和完成工作的基础。与其他代理一样，Quick 中的代理在 harness（托管的代理循环）中运行，遵循推理和行动（ReAct）模式。当你向 AWS Quick 提供提示时，代理会利用其可用工具和指令来实现目标，并向你提供响应。[Strands Agents SDK](https://strandsagents.com/) 等代理框架也是围绕相同的模型驱动循环构建的。

Quick 默认执行的许多操作都源自 **系统技能**。例如，你可以要求 Quick 生成 Word 文档、PowerPoint 演示文稿、Excel 电子表格或 PDF。系统技能随后可以使用技能捆绑的脚本通过代码来创建或编辑文档。其他系统技能可以浏览网页、运行代码、执行深度研究、转录音视频以及生成图像。有些技能用于管理 Quick 本身，例如构建 [AWS Quick Flows](https://docs.aws.amazon.com/quick/latest/userguide/using-amazon-quick-flows.html)、安排例行程序、将工作移交给出代码代理（如 Kiro）、管理你的记忆和知识图谱，或跟踪你的待办事项。在 Quick 内部，你可以开启或关闭系统技能，但不能编辑、复制、导出、发布、共享或删除它们。

由于 AWS Quick 提供了多种能力和工具，技能可以执行多种类型的工作。例如，一个技能可以生成交付物，如基于你的模板构建的每周状态更新。另一个技能可以自动化跨连接器的流程，例如收集本周的 Jira 更新并将摘要发布到 Slack。技能还可以运行 Python 脚本中的计算，并使用 JavaScript 对结果进行图表化展示。

### 什么是技能（Skill）？

技能遵循 [Agent Skills](https://agentskills.io/) 规范，该规范由 Anthropic 最初开发并发布为开放标准。AWS Quick 桌面版（于 [2026 年 4 月进入预览阶段](https://aws.amazon.com/about-aws/whats-new/2026/04/amazon-quick-macos-windows-preview/)，并于 [2026 年 9 月全面可用](https://aws.amazon.com/blogs/machine-learning/amazon-quick-is-now-generally-available-on-desktop/)）使用了此规范。

技能是一个文件夹，其根目录下包含一个 Markdown 文件 `SKILL.md`，以及其指令所使用的任何可选脚本或其他参考文件。文件的前置元数据（frontmatter，即两条 `---` 行之间的属性）包含名称、描述以及与此技能相关的任何其他元数据。以下是一个名为 `release-notes-generator` 的技能的简化示例：

```yaml
---
name: release-notes-generator
description: "Generates human-readable release notes from merged pull requests, commits, or changelogs ... Use when asked to 'generate release notes', 'write changelog', ..."
---
```

描述和名称是触发技能的两个最重要方面。Quick 在将技能加载到 Agent 的提示词（prompt）时采用**渐进式披露（progressive disclosure）**机制。Agent 仅读取每个技能的名称和描述，直到请求需要该技能。随后，它会加载该技能的完整指令，如 [Agent 如何加载技能](https://docs.aws.amazon.com/quick/latest/userguide/skills-desktop.html#desktop-how-quick-loads-skills) 所述。这意味着某些短语可以帮助触发技能，例如“为我生成 2.3 版本的发布说明”。规范规定 `name` 最多为 64 个字符，`description` 最多为 1,024 个字符，并建议技能内的指令内容不超过 5,000 个 token。

[https://d2908q01vomqb2.cloudfront.net/f1f836cb4ea6efb2a0b1b99f41ad8b103eff4b59/2026/11/04/ML-22266-2.png](https://d2908q01vomqb2.cloudfront.net/f1f836cb4ea6efb2a0b1b99f41ad8b103eff4b59/2026/11/04/ML-22266-2.png)

图 2：`release-notes-generator` 技能文件夹，包含必需的 `SKILL.md` 文件以及可选的脚本和参考文件夹

### 在 Quick 中构建和共享技能

你可以从聊天、文件（.md 或 .zip 文件）或根目录下有 `SKILL.md` 文件的文件夹中创建技能。本文重点介绍通过聊天创建技能。首先，在聊天中向 Quick 描述你的任务。例如，你可以使用以下模板（将 <> 括号之间的内容替换为你的需求）：

```auto
Every <specify your cadence e.g. every day, on monday, or none at all>, I have to grab data from the following sources:
- <List your sources and how you want to query them>
...

And do <describe how you want to transform the data and the exact sequence of steps>. 

Once I am finished, I have to create a report <describe your report format or provide an example> and send to the following stakeholders <describe your recipients> using the following connector <describe your connector>.

Create a skill from this requirement, and help me come up with testing scenarios to test the skill. 
```

这就是开始构建你自己的技能所需的全部内容。或者，你也可以使用之前为完成任务而进行的对话，并要求 Quick 从中生成一个技能。对最终结果满意后，发布并共享你的技能：

1. 选择 **Customize**，然后选择 **Skills**。
2. 在草稿中找到你的技能，并打开其详细信息面板。
3. 选择 **Publish**。
4. 选择 **Share**，然后选择要共享的人员或群组。

发布和共享是两个独立的步骤，因此仅发布并不会让任何人访问该技能。你共享给的人员会从 **Shared with me** 下的 **Add to Quick** 中添加该技能，并且每次你再次发布时，他们的版本都会保持同步。有关当前步骤，请参阅 AWS Quick 用户指南中的 [草稿和已发布版本](https://docs.aws.amazon.com/quick/latest/userguide/skills-desktop.html#desktop-skill-draft-published) 以及 [共享你的技能](https://docs.aws.amazon.com/quick/latest/userguide/skills-desktop.html#desktop-sharing-skills)。

#### 通过最佳实践提升技能

你通过简短描述或对话构建的技能可能对你个人有效，但在构建要与团队共享的生产级技能时，有许多因素需要考虑。技能就像代码一样，许多工程最佳实践可以帮助任何知识工作者构建它们。

- “在我的机器上能运行”是软件工程师中的一句常用语。它描述的是软件在构建者自己的机器上运行正常，但当其他人安装或使用时就出错了。在构建技能时，你必须考虑你的环境。技能指令可以使用智能体（Agent）来查询数据源或调用连接器或工具。软件工程师通常通过记录使用软件的前置条件来解决这一限制。例如，如果你单独共享一个技能，你可能希望创建一个 README 文件来记录这些要求。如果你共享一个使用你技能的智能体，请同时共享它连接的数据源，否则与你共享的人只能从他们已有权限访问的数据源中获得答案。
- 计划应对失败。智能体使用依赖于第三方和第一方服务的连接源。当工程师编写代码时，他们需要理解如果某部分软件失败该怎么办。如果你将这些场景纳入你的技能指令中，你的智能体可以根据具体指令进行调整。你不需要成为下游服务的专家，因为智能体会朝着目标努力，并在某一步骤失败时重试或尝试其他方法。你需要列出当失败影响你的任务或业务流程时该怎么做。以下是一个可能因失败而产生影响的技能工作流片段。

    ```text
    [智能体] 通过电子邮件将报告发送给 {{recipient}}。
    ```

    如果发送电子邮件失败，智能体应该怎么做？你可能希望添加在该场景下该做什么的指令。

    ```text
    [智能体] 通过电子邮件将报告发送给 {{recipient}}。
    验证：报告出现在你的已发送文件夹中。
    如果失败：停止，并告知用户报告未发送及原因，以便他们自行发送。
    ```

    在没有人工介入的定时执行智能体时，处理失败场景更为重要。

- 测试每一次更改。软件工程师编写多种形式的测试，如单元测试和集成测试，以帮助测试软件。这些测试会在每次更改时运行。对于技能而言，同样重要的是你要为各种场景生成自己的测试用例，并在进行更改时继续添加新测试。有多种方法可以做到这一点，但最好使用你期望下游用户使用的环境进行测试。

在构建生产级技能时，还有许多其他方面需要考虑：

- 为每次更改添加发布说明。
- 将随时间变化的硬编码值（如 `/Users/me/notes` 或 `#my-team`）移出步骤，并将其声明为每个人提供的输入。
- 以人类可读的日期记录技能更改的时间。
- 记录每个参考文件的来源，以便在源发生变化时，你也可以更新你的技能指令。
- 存储校验和（checksum），即技能文件的指纹，用于显示副本是否与已检查的版本不同。
- 在每次更改后检查结构，就像 linter 在任何人审查代码之前捕获错误一样。
- 以一致的方式构建技能，以便你的团队可以更快地贡献更改并进行审查。

对于任何用户来说，这些都是很多需要考量的因素。这就是为什么 [AWS Quick 官方目录](https://amazon-quick.github.io/Amazon-Quick-official-catalog/) 提供了预构建的资源（如技能），这些资源在设计时已考虑了这些最佳实践。

#### AWS Quick 官方目录

该目录是一组智能体资源的集合，你可以直接安装和使用它们，也可以将其作为起点并根据你的工作进行调整。该目录声明，其中的每个资源在发布之前都经过测试，并扫描了质量、安全性等因素。这些技能涵盖了日常生产力工作，以及销售、营销、人力资源、法律、项目管理、客户成功和软件工程等团队的工作。它们还涵盖了金融、医疗保健和生命科学、能源和公用事业、酒店业以及供应链和物流等行业。

目录包含 **Skill Architect** 技能，这是一个预构建的技能，可为您应用这些工程最佳实践，如 [在 AWS Quick 中使用软件工程实践构建技能](https://amazon-quick.github.io/Amazon-Quick-official-catalog/build-skills/) 所述。要安装它，请选择 **Customize**（自定义）、**Skills**（技能）、**Browse all**（浏览全部），然后选择 **Official**（官方）。在搜索框中输入 `skill architect`，然后选择 **Install**（安装）。当前步骤请参阅 [在桌面版 AWS Quick 上安装技能](https://amazon-quick.github.io/Amazon-Quick-official-catalog/install/)。

#### 将技能连接到您的 Agent

创建 Agent 时，您需要配置其名称、描述和指令，并选择它读取的空间、可用的连接器以及可加载的技能。详情请参阅 AWS Quick 用户指南中的 [Agent 配置](https://docs.aws.amazon.com/quick/latest/userguide/agents-desktop.html#desktop-agent-configuration)。当 Agent 解决特定用例（例如回答新员工问题或准备每周状态报告）时，其表现最佳，并且应将 **bounding**（边界）限制在该用例所需的空间、技能和连接器范围内。默认情况下，Agent 可以使用您所有的技能；当您添加特定技能时，Agent 将被限制仅使用这些技能。这在共享 Agent 时会产生问题，因为 Agent 将以使用者的权限运行。相同的请求对每个人而言可能访问不同的数据和技能，并且在需要仅您能访问的源时，可能会返回不完整的回答。

如果您希望将所有内容（Agent、技能和空间）整合在一起，请尝试在链接的工作坊中运行 [个人 Agent 架构师模块](https://catalog.us-east-1.prod.workshops.aws/workshops/a8484e57-2e30-40ee-bd98-0122f0d05acc/en-US/2000-build-your-personal-setup/2100-run-personal-agent-architect)。

### 结论

在本文中，我们展示了 Agent 如何在 AWS Quick 中使用技能和您的数据，以及如何构建和共享适用于您团队的技能。我们还展示了官方目录和自定义 Agent 如何帮助您利用这些技能。

要了解更多信息、查找活动或与 AWS Quick 分享您的成功，请访问 [AWS Quick 社区](https://community.amazonquick.com/)。AWS Quick 社区提供学习资料、功能公告、活动以及其他用户的示例。您还可以在其问答论坛中提问。

关于本文主题的录制会话，请观看 [在 AWS Quick 上使用 Agent 和技能编码您的企业](https://www.youtube.com/watch?v=m9gN2GapOps)。该会话涵盖了技能的构建和加载方式、技能如何与 Agent、空间和连接器协同工作，以及构建共享技能的 best practices（最佳实践）。最后演示了官方目录和 Skill Architect 技能。

以下是由每天从事 AWS Quick 工作的专家设计的一些其他资源：

- [AWS Quick 完整指南：Agentic AI 业务工作区](https://catalog.workshops.aws/amazon-quick-suite-workshop)。
- [AWS Quick：具有丰富集成的端到端业务用例](https://catalog.us-east-1.prod.workshops.aws/workshops/8724e6e3-1115-4f40-9770-8a24199ce308/en-US)。
- [AWS Quick 管理工作坊](https://catalog.us-east-1.prod.workshops.aws/workshops/767bc5b8-1d33-40e2-8969-f8653db64756/en-US)。
- [深入探索 AWS Quick Sight](https://catalog.workshops.aws/quicksight/en-US)。
- [AWS Quick 知识库 – 官方代码示例和解决方案](https://aws-samples.github.io/sample-amazon-quick-suite-knowledge-hub/)。
- [关于 AWS Quick 的 AWS 博客文章](https://aws.amazon.com/search/?searchQuery=Amazon%20Quick&filters=((id:provider,value:(blogs)))&sort=(id:relevance,direction:desc))。

---

### 关于作者
