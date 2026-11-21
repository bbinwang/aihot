---
title: "一次构建，任意代理运行：Agent Skills 实用指南"
date: 2026-11-13T04:55:12.684Z
tags: ["Agent Skills", "AI Agent", "Claude Code", "GitHub Copilot", "Cursor", "开发工作流"]
summary: "总结：Build once, run on any agent: A practical guide to agent skills 这篇文章介绍了如何用 Agent Skills 把可重复的工程工作固化成可共享、可复用的文件，让同一套技能"
---
> **原文链接**: [https://github.blog/ai-and-ml/github-copilot/build-once-run-on-any-agent-a-practical-guide-to-agent-skills/](https://github.blog/ai-and-ml/github-copilot/build-once-run-on-any-agent-a-practical-guide-to-agent-skills/)
> **来源**: github.blog
> **发现于**: 管理台手动提交
> **说明**: 本文由 AIHot汪 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

## AI 总结

**总结：Build once, run on any agent: A practical guide to agent skills**

这篇文章介绍了如何用 **Agent Skills** 把可重复的工程工作固化成可共享、可复用的文件，让同一套技能能在不同 AI 代理（GitHub Copilot、Claude Code、Cursor 等）上运行。

### 核心概念
- **Agent Skill** 是一个以 `SKILL.md` 为中心的版本化目录，描述“何时做”和“怎么做”某个可重复任务。
- 技能只负责**指令和判断逻辑**，工具、凭据、权限仍由运行它的宿主环境提供。

### 主要实践

1. **明确单一职责**  
   技能应有清晰的任务、输入和输出。例如 Proof Agent 用独立验证者检查 AI 生成的代码，避免“自己验证自己”。

2. **多技能协作**  
   以 Data Forge 为例：多个技能分工协作（初始化、构建、查询、规范检查），共享项目清单（manifest），而不是各自重新发现上下文。

3. **项目配置与技能分离**  
   项目特定信息（表名、引擎、命名规范等）放在独立的 manifest 文件中，技能只读取它，提升可移植性。

4. **统一执行路径**  
   相关技能共用同一套平台访问方式（如统一的数据库适配器），避免重复实现连接和查询逻辑。

5. **嵌入检查与人工审批**  
   在关键决策点设置人工确认，用 CI 验证结果。技能负责引导，测试和仓库规则负责强制把关。

6. **为不同客户端打包并验证**  
   以 `SKILL.md` 为源，用脚本生成各客户端格式，并验证技能能否被正确识别和使用。

### 三条核心建议
1. 把业务上下文集中在一个文件（manifest）里。  
2. 给相关技能提供统一的平台访问方式。  
3. 用指令指导工作，用检查验证结果。

**一句话总结**：把可重复的判断和流程写成技能文件，配置与权限留给环境，这样同一套技能就能在不同代理上复用，减少重复解释，提升团队协作效率。

---

[Andrea Griffiths](https://github.blog/author/andreagriffiths11/)·[@AndreaGriffiths11](https://github.com/AndreaGriffiths11)			
							

	
	
		
			2026年11月12日		

							
				|
				
				6 分钟阅读			
			

				

- 分享:
- [https://x.com/share?text=Build%20once%2C%20run%20on%20any%20agent%3A%20A%20practical%20guide%20to%20agent%20skills&url=https%3A%2F%2Fgithub.blog%2Fai-and-ml%2Fgithub-copilot%2Fbuild-once-run-on-any-agent-a-practical-guide-to-agent-skills%2F](https://x.com/share?text=Build%20once%2C%20run%20on%20any%20agent%3A%20A%20practical%20guide%20to%20agent%20skills&url=https%3A%2F%2Fgithub.blog%2Fai-and-ml%2Fgithub-copilot%2Fbuild-once-run-on-any-agent-a-practical-guide-to-agent-skills%2F)
- [https://www.facebook.com/sharer/sharer.php?t=Build%20once%2C%20run%20on%20any%20agent%3A%20A%20practical%20guide%20to%20agent%20skills&u=https%3A%2F%2Fgithub.blog%2Fai-and-ml%2Fgithub-copilot%2Fbuild-once-run-on-any-agent-a-practical-guide-to-agent-skills%2F](https://www.facebook.com/sharer/sharer.php?t=Build%20once%2C%20run%20on%20any%20agent%3A%20A%20practical%20guide%20to%20agent%20skills&u=https%3A%2F%2Fgithub.blog%2Fai-and-ml%2Fgithub-copilot%2Fbuild-once-run-on-any-agent-a-practical-guide-to-agent-skills%2F)
- [https://www.linkedin.com/shareArticle?title=Build%20once%2C%20run%20on%20any%20agent%3A%20A%20practical%20guide%20to%20agent%20skills&url=https%3A%2F%2Fgithub.blog%2Fai-and-ml%2Fgithub-copilot%2Fbuild-once-run-on-any-agent-a-practical-guide-to-agent-skills%2F](https://www.linkedin.com/shareArticle?title=Build%20once%2C%20run%20on%20any%20agent%3A%20A%20practical%20guide%20to%20agent%20skills&url=https%3A%2F%2Fgithub.blog%2Fai-and-ml%2Fgithub-copilot%2Fbuild-once-run-on-any-agent-a-practical-guide-to-agent-skills%2F)

			
			
		
	

	
		
			
	<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">

本周你向 Agent 重新解释同一个任务多少次了？你向拥有深厚组织知识的同事询问如何解决特定问题的次数又有多少？这些上下文信息不应在聊天中丢失，也不应锁定在某一个人的脑海中。Agent 技能（Agent skills）让你能够捕获可重复的指令，以便你和你的 Agent 可以重复使用它们。你今晚为自己编写的技能，稍后可能成为团队流水线的一部分。

Agent 技能是一个以 `SKILL.md` 文件为中心的带版本控制的目录，其中描述了何时以及如何执行可重复的任务。你可以跨 Agent 共享这些指令，但环境仍需提供执行这些指令所需的工具、凭据和权限。例如，一个技能可以描述如何查询数据库，但它本身并不授予对该数据库的访问权限。

*我在 GitHub Universe 2026 期间与 Procore 数据工程高级经理 Shishir Tewari 就这一主题进行了直播讨论。我们的会议主题是 [“Build once, run on any agent: a practical guide to agent skills”](https://reg.githubuniverse.com/flow/github/universe26/attendee-portal/page/sessioncatalog?search=BLD1787B)。*

### 定义一个任务及其适用场景

当技能具有明确的任务、输入和输出时，效果最佳。例如，假设你正在构建一个 Agent，用于将 AI 生成的更改与原始请求进行比对。如果同一个 Agent 评估自己的工作，其解释可能会影响审查结果。使用 [Proof Agent](https://github.com/githubevents/build-once-run-on-any-agent/tree/main/demos/proof-agent)，我们使用一个独立的验证器来检查更改并提供其发现的证据。技能的 frontmatter 命名了任务并描述了其目的：

```
---
name: proof-agent
description: Adversarial verification of AI-generated work. Spawns an independent verifier to check for false claims, broken code, and security issues.
---
```

核心原则很简单：自我验证不是验证。

Proof Agent 的 [SKILL.md](https://github.com/githubevents/build-once-run-on-any-agent/blob/main/demos/proof-agent/SKILL.md) 中的 `When to Verify` 部分说明了何时调用该技能。其余指令解释了验证器审查的内容以及在其发现中应包含哪些证据。

### 为更大的工作流协调多个 skill

当让数据管道保持正确所需的判断只存在于四个不同人的脑海中时,这四个人本身就是路线图。管道的每一次变更都取决于他们是否有空以及对数据的了解。[Data Forge](https://github.com/githubevents/build-once-run-on-any-agent/tree/main/demos/dataforge) 展示了如何将其中一部分判断沉淀到可以协同工作的 skill 中。

在 [support-desk 管道示例](https://github.com/githubevents/build-once-run-on-any-agent/blob/main/demos/dataforge/examples/support-desk/DEMO.md)中,我们从一个统计已创建和已解决事件的指标请求开始。在构建管道之前,`forge-init` skill 会发现诸如源表和命名约定等细节,然后将它们写入 resolved manifest。其他 skill 读取该 manifest,以获取所需的项目上下文。

随后,`forge-builder` skill 协调从 issue 到 pull request 的整个工作。它在设计和构建管道的过程中,使用 `forge-dbx` 查询数据平台,并使用 `forge-lint` 应用团队的标准。在此过程中,由人来审查提出的决策,最终生成的 pull request 包含管道代码、schema 变更和测试。

每个 skill 都有明确的职责,它们共享项目上下文,而不是各自独立地重复发现。当某个步骤发生变化时,你只需修改一个 skill,其余的保持不变。

skill 适合有边界、可重复且能从可复用判断中受益的工作,例如清单检查、发布、迁移或指标管道。如果工作流需要稳定接口、共享状态、审计记录、长时间运行的控制,或在模型之外强制执行的权限,那么应用程序是更好的选择。

### 不要将项目配置写死在 skill 中

我们不想把每个项目的名称、数据库或约定硬编码到 skill 中。在 Data Forge support-desk 示例中,[manifest](https://github.com/githubevents/build-once-run-on-any-agent/blob/main/demos/dataforge/examples/support-desk/dataforge.manifest.yaml) 描述了项目、指标存储和平台,这样 skill 就能使用正确的项目细节,而无需将其固化到自身指令中:

```
project:
  name: "support-desk"
  store_name: "support_metric_store"

platform:
  engine: "duckdb"
  pipeline_framework: "spark_python"
  duckdb_dir: "warehouse"
```

有了 resolved manifest 中已发现的细节,其他 skill 就不必对项目做出各自的假设。

将已发现的项目细节与团队标准分开。`forge-init` 初始化 skill 可以检查现有的 schema 和代码模式;`forge-lint` skill 则提供代码生成之前需要遵循的规则。在仓库中发现的模式并不会自动成为需要保留的规则,因此要让已发现的细节可供审查,并在需要业务判断的地方让人们确认或修改。要检验可移植性,可以问:另一个团队能否用自己的 manifest 使用这些 skill 而无需重写它们?

### 在 skill 之间共享执行路径

`forge-dbx` skill 为其他 Data Forge skill 提供统一的访问数据平台的方式。它读取 manifest 并选择 Databricks 或 DuckDB adapter,因此每个 skill 不需要各自维护连接和查询逻辑。

manifest 可以在本地的 support-desk 演示中选择 DuckDB,但它无法安装 DuckDB CLI,也无法授予数据库访问权限。这些仍然是环境及其用户的配置责任。manifest 负责选择引擎;主机负责提供访问。

### 在工作流中设置检查和审批点

Data Forge support-desk 工作流共有七个阶段,每个阶段都设有一个人工检查点。[工作流概览](https://github.com/githubevents/build-once-run-on-any-agent/blob/main/demos/dataforge/README.md#the-skills)展示了这些 skill 如何协同配合。在一个阶段继续之前,工作流会检查前一阶段是否已完成;在 schema 变更执行之前,它会请求审批。

Proof Agent 示例将同样的原则应用于代码审查。GitHub Actions workflow 会向 verifier 提供原始请求和代码变更，但不提供 coding agent 自己的评估结论。verifier 会返回 `PASS`、`FAIL` 或 `PARTIAL`,并且必须引用变更文件中的证据。这个 GitHub Action 对 diff 进行静态审查，不会执行代码或运行测试。在演示 workflow 中，我们设置了 `block-on-fail: false`,因此审查结果是建议性的。默认情况下，`FAIL` 会使检查失败，如果该检查被设为必需，则会阻止合并。我们的目标是把测试结果和合并要求保留在你仓库的 CI checks 和规则中。

### 为每个 agent client 打包，然后验证其设置

支持多个 client 可能意味着要同步维护多份相同的指令副本。在 Data Forge 示例中，我们以 `skills/*/SKILL.md` 作为源文件，并使用打包脚本生成 client 专属的文件:`.claude-plugin/plugin.json` 用于 Claude Code,`.cursor-plugin/plugin.json` 用于 Cursor,`.github/agents/*.agent.md` 用于 GitHub Copilot。该脚本还包含一个用于 CI 的检查模式：

```
node scripts/package.mjs --check
```

不同 client 在可用的模型、工具、凭证和权限方面可能存在差异。安装 skill 之后，请检查该 client 能否针对目标任务识别它、加载其参考内容、使用所需的工具，并返回该 skill 所要求的证据。

### 构建 agent skills 的三个实践

1. **将业务上下文放在一个文件中。**把项目专属的名称、schema 和约定保存在一个 manifest 中，让每个 skill 去读取它，而不是重复这些信息。这样团队就有一个清晰可见的地方来更新配置。
2. **让相关 skill 以一致的方式使用平台。**让相关 skill 使用相同的路径来运行查询、作业和 schema 变更，而不是各自定义自己的命令和连接逻辑。这样能让 workflow 的访问方式更易于理解，其行为在各 client 中也更易于核查。
3. **用指令引导工作，用检查来验证工作。**skill 可以告诉 agent 应遵循哪些标准、何时需要请求批准。在需要上下文或判断力的决策环节加入人工审查，并利用测试和 CI checks 在变更推进之前发现问题。如果某项检查必须阻止合并或部署，请在仓库的规则中配置该要求。

从你厌倦反复解释的那个任务开始。写下它需要什么、在哪里停下来，以及审查者能看到什么。然后用另一个 agent 试一试，并在你了解什么有效的过程中不断改进它。

[为 GitHub Copilot 添加 agent skill >](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills)

	

	

---

	
		

### 标签：

		

- [GitHub Copilot](https://github.blog/tag/github-copilot/)
- [GitHub Universe](https://github.blog/tag/github-universe/)

	

	
	

### 作者

	
			
	
					
				
					
					![Andrea Griffiths](https://github.blog/wp-content/uploads/2025/08/Andrea-Griffiths_avatar_1755783168-200x200.jpeg)
				
			
				
					
				

Andrea 是 GitHub 的资深开发者布道师(Senior Developer Advocate),在开发者工具领域拥有十余年经验。她将深厚的技术功底与让前沿技术更易于普及的使命相结合。在从军队服役和施工管理转型为软件开发者之后，她为复杂工程概念与实际落地之间的衔接带来了独特的视角。她和她的威尔士伴侣、两个儿子以及两只狗住在佛罗里达州，继续通过 GitHub 的全球计划推动创新并支持开源。你可以在网上找到她:@acolombiadev。

			
			

	

		
	
	
	

### 相关文章

	
	
	
		
			
			![Copilot 出现在散布着绿色方块的装饰性背景上。](https://github.blog/wp-content/uploads/2026/01/generic-github-copilot-logo-stripe.png?resize=400%2C212)					
		[AI & ML](https://github.blog/ai-and-ml/)		
			

#### 超越代码生成：开发者的 agentic engineering 指南

写代码变快了，但围绕代码的工作并没有。了解如何借助 GitHub Copilot 进行规划、编写代码、审查变更和排查生产问题，以及哪些工作仍需要你的判断。

		

	
	
		![Copilot 出现在漂浮的立方体之间，旁边是一个刷新图标，暗示更新或自动化工作流程的主题。](https://github.blog/wp-content/uploads/2026/01/generic-github-copilot-logo.png?resize=400%2C212)					
		[AI & ML](https://github.blog/ai-and-ml/)		
		

#### 3 位 Java Champion 如何使用 GitHub Copilot 提升工作效率

		

三位 Java Champion 分享了他们如何使用 GitHub Copilot 解决问题、加速开发，并让人类对结果负责。

		

	
	
		![Copilot 应用与 VS Code 之间来回](https://github.blog/wp-content/uploads/2026/10/Screenshot-2026-10-15-at-3.11.02-PM.png?resize=400%2C212)		
	
	[AI & ML](https://github.blog/ai-and-ml/)		
		

#### 如何在 VS Code 中继续 GitHub Copilot 应用的会话

		

了解如何将 Agent 会话从 GitHub Copilot 应用迁移到 VS Code,而不会丢失对话、代码变更或工作上下文。

		

	
	
	
		

### 我们也出品新闻通讯

在我们专为开发者打造的半月刊新闻通讯中，发现技巧、技术指南和最佳实践。
		
		
			你的电子邮件地址
