---
title: "GitHub 官方实操指南：怎样写出跨 Agent 复用的生产级技能"
date: 2026-11-14T00:00:00.000Z
tags: ["AI 实操", "GitHub Copilot", "Agent Skills", "Claude Code", "Cursor", "AI 工程化"]
summary: "GitHub 联合 Procore 团队总结了从个人日常提效到团队生产级流水线的实践，讲透如何把工程判断沉淀为标准技能，在多个主流 Agent 间无缝复用。"
---
> **原文链接**: [https://github.blog/ai-and-ml/github-copilot/build-once-run-on-any-agent-a-practical-guide-to-agent-skills/](https://github.blog/ai-and-ml/github-copilot/build-once-run-on-any-agent-a-practical-guide-to-agent-skills/)
> **来源**: github.blog
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/github-agent-skills-guide/) · 2026/11/14
> **说明**: 本文由 AIHot汪 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

[Andrea Griffiths](https://github.blog/author/andreagriffiths11/)·[@AndreaGriffiths11](https://github.com/AndreaGriffiths11)			
							

	
	
		
			2026年11月12日		

							
				|
				
				6 分钟阅读			
			

				

- 分享：
- [https://x.com/share?text=Build%20once%2C%20run%20on%20any%20agent%3A%20A%20practical%20guide%20to%20agent%20skills&url=https%3A%2F%2Fgithub.blog%2Fai-and-ml%2Fgithub-copilot%2Fbuild-once-run-on-any-agent-a-practical-guide-to-agent-skills%2F](https://x.com/share?text=Build%20once%2C%20run%20on%20any%20agent%3A%20A%20practical%20guide%20to%20agent%20skills&url=https%3A%2F%2Fgithub.blog%2Fai-and-ml%2Fgithub-copilot%2Fbuild-once-run-on-any-agent-a-practical-guide-to-agent-skills%2F)
- [https://www.facebook.com/sharer/sharer.php?t=Build%20once%2C%20run%20on%20any%20agent%3A%20A%20practical%20guide%20to%20agent%20skills&u=https%3A%2F%2Fgithub.blog%2Fai-and-ml%2Fgithub-copilot%2Fbuild-once-run-on-any-agent-a-practical-guide-to-agent-skills%2F](https://www.facebook.com/sharer/sharer.php?t=Build%20once%2C%20run%20on%20any%20agent%3A%20A%20practical%20guide%20to%20agent%20skills&u=https%3A%2F%2Fgithub.blog%2Fai-and-ml%2Fgithub-copilot%2Fbuild-once-run-on-any-agent-a-practical-guide-to-agent-skills%2F)
- [https://www.linkedin.com/shareArticle?title=Build%20once%2C%20run%20on%20any%20agent%3A%20A%20practical%20guide%20to%20agent%20skills&url=https%3A%2F%2Fgithub.blog%2Fai-and-ml%2Fgithub-copilot%2Fbuild-once-run-on-any-agent-a-practical-guide-to-agent-skills%2F](https://www.linkedin.com/shareArticle?title=Build%20once%2C%20run%20on%20any%20agent%3A%20A%20practical%20guide%20to%20agent%20skills&url=https%3A%2F%2Fgithub.blog%2Fai-and-ml%2Fgithub-copilot%2Fbuild-once-run-on-any-agent-a-practical-guide-to-agent-skills%2F)

			
			
		
	

	
		
			
	<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">

本周你向 Agent 重新解释同一个任务多少次了？你向拥有深厚内部知识的同事询问如何解决特定问题多少次了？这些上下文不应在聊天中丢失，也不应锁定在某个人的头脑中。Agent Skills（技能）让你能够捕获可重复的指令，以便你和你的 Agents 可以重复使用它们。你今晚为自己编写的 Skill，稍后可以成为团队流水线的一部分。

Agent Skill 是一个以 `SKILL.md` 文件为中心的版本化目录，描述了何时以及如何执行可重复的任务。你可以跨 Agents 共享这些指令，但环境仍需提供执行它们所需的工具、凭据和权限。例如，一个 Skill 可以描述如何查询数据库，但它并不授予对该数据库的访问权限。

*我在 GitHub Universe 2026 期间与 Procore 数据工程高级经理 Shishir Tewari 一起现场讨论了这一主题。我们的会议主题为 [“Build once, run on any agent: a practical guide to agent skills”](https://reg.githubuniverse.com/flow/github/universe26/attendee-portal/page/sessioncatalog?search=BLD1787B)。*

### 定义一个任务及其适用场景

当 Skill 具有明确的任务、输入和输出时，效果最佳。例如，假设你正在构建一个 Agent，用于将 AI 生成的更改与原始请求进行对比检查。如果同一个 Agent 评估自己的工作，其解释可能会影响审查结果。使用 [Proof Agent](https://github.com/githubevents/build-once-run-on-any-agent/tree/main/demos/proof-agent)，我们使用一个独立的验证器来检查更改并提供其发现的证据。Skill 的 frontmatter 命名了任务并描述了其目的：

```
---
name: proof-agent
description: Adversarial verification of AI-generated work. Spawns an independent verifier to check for false claims, broken code, and security issues.
---
```

核心规则很简单：自我验证不是验证。

Proof Agent 的 [SKILL.md](https://github.com/githubevents/build-once-run-on-any-agent/blob/main/demos/proof-agent/SKILL.md) 中的 `When to Verify`（何时验证）部分说明了何时调用该 Skill。其余指令解释了验证器审查的内容以及应在其发现中包含哪些证据。

### 协调多项技能以执行更复杂的工作流

当确保数据管道正确的判断分散在四个不同人的脑海中时，这四个人就是路线图。管道的每一次更改都依赖于他们的可用性和对数据的了解。[Data Forge](https://github.com/githubevents/build-once-run-on-any-agent/tree/main/demos/dataforge) 是一个示例，展示了如何将部分判断捕获到协同工作的技能（skills）中。

在 [支持台管道示例](https://github.com/githubevents/build-once-run-on-any-agent/blob/main/demos/dataforge/examples/support-desk/DEMO.md) 中，我们从一个统计创建和解决的事件数量的指标请求开始。在构建管道之前，`forge-init` 技能会发现源表和命名约定等详细信息，然后将它们写入已解析的清单（manifest）。其他技能则读取该清单以获取所需的项目上下文。

`forge-builder` 技能随后协调从问题（issue）到拉取请求（pull request）的工作。它使用 `forge-dbx` 查询数据平台，并使用 `forge-lint` 在设计及构建管道时应用团队的标准。在此过程中，人员会审查提出的决策，最终的拉取请求包含管道代码、架构更改和测试。

每个技能都有明确的职责，它们共享项目上下文，而不是独立地重新发现这些信息。当某个步骤发生变化时，您可以仅更改一个技能而保留其余部分不变。

技能适用于界限明确、可重复且受益于可复用判断的工作，例如检查清单、发布、迁移或指标管道。如果工作流需要稳定的接口、共享状态、审计跟踪、长期运行控制或在模型外部执行的权限，那么应用程序是更好的选择。

### 将项目配置与技能分离

我们不希望将每个项目的名称、数据库或约定硬编码到技能中。在 Data Forge 支持台示例中，[清单](https://github.com/githubevents/build-once-run-on-any-agent/blob/main/demos/dataforge/examples/support-desk/dataforge.manifest.yaml) 描述了项目、指标存储和平台，以便技能可以使用正确的项目细节，而无需将这些细节烘焙到它们的指令中：

```
project:
  name: "support-desk"
  store_name: "support_metric_store"

platform:
  engine: "duckdb"
  pipeline_framework: "spark_python"
  duckdb_dir: "warehouse"
```

借助已解析清单中的发现详情，其他技能无需对项目做出自己的假设。

将发现的项目细节与团队标准分开。`forge-init` 初始化技能可以检查现有的架构和代码模式；`forge-lint` 技能提供在生成代码之前要遵循的规则。在仓库中发现的模式并不自动成为需要保留的规则，因此请使发现的细节可审查，并允许人员在需要业务判断的地方确认或更改它们。为了检查可移植性，请问：另一个团队是否可以使用这些技能及其自己的清单而无需重写它们？

### 在技能之间共享执行路径

`forge-dbx` 技能为其他 Data Forge 技能提供了一种访问数据平台的方式。它读取清单并选择 Databricks 或 DuckDB 适配器，因此每个技能都不需要拥有自己的连接和查询逻辑。

清单可以选择 DuckDB 用于本地支持台演示，但它无法安装 DuckDB CLI 或授予数据库访问权限。这些仍然是环境和用户的环境设置职责。清单选择引擎；主机提供访问权限。

### 在工作流中设置检查和审批点

Data Forge 支持台工作流有七个阶段，每个阶段都有一个人工检查点。[工作流概览](https://github.com/githubevents/build-once-run-on-any-agent/blob/main/demos/dataforge/README.md#the-skills) 展示了技能如何协同工作。在阶段推进之前，工作流会检查前一阶段是否已完成；在运行架构更改之前，它会请求批准。

Proof Agent 示例将同一原则应用于代码审查。GitHub Actions 工作流将原始请求和代码变更提供给验证器，但不提供编码 Agent 自身的评估结果。验证器返回 `PASS`、`FAIL` 或 `PARTIAL`，并必须在变更的文件中引用证据。GitHub Action 会对 diff 进行静态审查；它不执行代码或运行测试。在演示工作流中，我们设置了 `block-on-fail: false`，因此发现的问题仅作为建议。默认情况下，`FAIL` 会导致检查失败，如果该检查是必需的，则会阻止合并。目的是将测试结果和合并要求保留在存储库的 CI 检查和规则中。

### 为每个 Agent 客户端打包，然后验证其设置

支持多个客户端可能意味着需要保持多份相同指令的同步。在 Data Forge 示例中，我们将 `skills/*/SKILL.md` 作为源文件，并使用打包脚本生成特定于客户端的文件：Claude Code 使用 `.claude-plugin/plugin.json`，Cursor 使用 `.cursor-plugin/plugin.json`，GitHub Copilot 使用 `.github/agents/*.agent.md`。该脚本还包含用于 CI 的检查模式：

```
node scripts/package.mjs --check
```

客户端在可用模型、工具、凭据和权限方面可能存在差异。安装技能后，请检查客户端是否识别出该技能用于预期任务，加载了其引用，能够使用所需的工具，并返回该技能要求的证据。

### 构建 Agent 技能的三种实践

1. **将业务上下文放在一个文件中。** 将特定于项目的名称、模式和约定保存在清单中，让每个技能读取该清单，而不是重复这些事实。这为团队提供了一个可见的配置更新位置。
2. **让相关技能以一致的方式使用平台。** 让相关技能使用相同的路径来运行查询、作业和模式更改，而不是各自定义自己的命令和连接逻辑。这使得工作流的访问更易于理解，其行为在每个客户端中也更易于检查。
3. **使用指令指导工作，使用检查来验证工作。** 技能可以告诉 Agent 遵循哪些标准以及在何时请求批准。在需要上下文或判断的决策处添加人工审查，并使用测试和 CI 检查在变更推进之前发现问题。如果检查必须阻止合并或部署，请在存储库的规则中配置该要求。

从你厌倦了解释的任务开始。写下它需要什么、在哪里停止以及审查者看到什么。然后尝试用另一个 Agent 来执行它，并根据你的学习成果进行改进。

[向 GitHub Copilot 添加 Agent 技能 >](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills)

	

	

---

	
		

### 标签：

		

- [GitHub Copilot](https://github.blog/tag/github-copilot/)
- [GitHub Universe](https://github.blog/tag/github-universe/)

	

	
	

### 作者

	
			
	
					
				
					
					![Andrea Griffiths](https://github.blog/wp-content/uploads/2025/08/Andrea-Griffths_avatar_1755783168-200x200.jpeg)
				
			
				
					
				

Andrea 是 GitHub 的高级开发者倡导者，在开发者工具领域拥有超过十年的经验。她将技术深度与使先进技术更易用的使命相结合。在从陆军服役和施工管理转型到软件开发后，她带来了独特的视角，致力于将复杂的工程概念与实际实施联系起来。她住在佛罗里达，与威尔士伴侣、两个儿子和两只狗一起生活，在那里她继续通过 GitHub 的全球倡议推动创新并支持开源。她在网上 @acolombiadev。

			
			

	

		
	
	
	

### 相关文章

	
	
	
		
			
			![Copilot 出现在带有散落绿色方块的装饰背景前。](https://github.blog/wp-content/uploads/2026/01/generic-github-copilot-logo-stripe.png?resize=400%2C212)					
		[AI & ML](https://github.blog/ai-and-ml/)		
			

#### 超越代码生成：开发者代理工程指南

编写代码的速度加快了，但围绕代码的工作却没有。了解如何使用 GitHub Copilot 来规划、编写代码、审查变更以及调查生产环境问题，以及哪些工作仍需你做出判断。

![Copilot 出现在浮动立方体中，旁边有一个刷新图标，暗示更新或自动化工作流主题。](https://github.blog/wp-content/uploads/2026/01/generic-github-copilot-logo.png?resize=400%2C212)
[AI & ML](https://github.blog/ai-and-ml/)

#### 三位 Java Champions 如何使用 GitHub Copilot 提高生产力

三位 Java Champions 分享了他们如何使用 GitHub Copilot 解决问题、加速开发，并确保人类对结果负责。

![Copilot 应用与 VS Code 之间的交互](https://github.blog/wp-content/uploads/2026/10/Screenshot-2026-10-15-at-3.11.02-PM.png?resize=400%2C212)
[AI & ML](https://github.blog/ai-and-ml/)

#### 如何在 VS Code 中继续 GitHub Copilot 应用会话

了解如何将 Agent 会话从 GitHub Copilot 应用移至 VS Code，同时不丢失对话、代码更改或工作上下文。

### 我们也有通讯简报

在我们的双周刊通讯中获取技巧、技术指南和最佳实践，专为开发者打造。
			
				您的电子邮件地址
