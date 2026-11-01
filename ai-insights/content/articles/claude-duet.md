---
title: "Anthropic 推出自己的个人Agent： Claude Duet 能主动跟进工作，电脑合上也能继续干活"
date: 2026-10-22T00:00:00.000Z
tags: ["产品发布", "Anthropic", "Claude Duet", "个人Agent", "主动式AI", "聚合"]
summary: "它会查看已连接的应用、准备简报和工作结果，再把需要你决定的事送到面前；对外发送、付款、签名和删除仍要先获批准。"
---
> **原文链接**: [https://claude.com/resources/articles/claude-duet](https://claude.com/resources/articles/claude-duet)
> **来源**: claude.com
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/claude-duet/) · 2026/10/22
> **说明**: 本文由 AIHot 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

今天，我们推出 Claude Duet 的研究预览版。这是一款全新应用，Claude 在其中作为主动式 Agent 发挥作用。它会主动提示你需要关注的事项，完成你交代的任务，即使你暂时离开也能持续工作，并在代表你采取行动前与你确认。我们打造 Claude Duet，是为了帮助那些事务繁杂、难以全面兼顾的专业人士和小企业主。

Claude Duet 可作为独立应用在 iOS 和 Android 上使用，也可在 claude.ai 上使用。在本次研究预览期间，Claude Duet 包含在 Pro 和 Max 计划中，并沿用 Claude 其他功能的使用限额。如需获取访问权限，[加入等待列表（新标签页打开）](https://claude.com/product/claude-duet)。

### 将你的注意力集中在最重要的事情上

我们设计 Claude Duet 是为了成为你可信赖的伙伴。各类专业人士每天都需要应对大量决策，我们相信他们会发现 Claude Duet 极具价值。它能帮助你优先安排时间与精力，并为那些曾经觉得不可能或令人望而生畏的雄心勃勃的项目留出空间。

Claude Duet 之所以如此有用，在于其判断力。我们基于 [Claude Opus 5.5（新标签页打开）](https://www.anthropic.com/claude-opus-5-5) 构建它，使其具备资源调度能力，能够判断什么是你需要关注的、什么可以暂缓，以及何时应先与你确认。

每天早晨，它会向你发送一份简短摘要，列出你已连接应用中最重要的事项。全天中，它会持续监控这些应用，仅在需要你的关注时向你发送消息。你也可以将各种任务交给它——从安排会议等简单的行政任务，到使用数十种工具构建仪表板、创建财务或销售预测、原型设计以及构建 Web 应用等更复杂的任务。

### 安全与隐私内置其中

Claude Duet 借鉴了我们在 Agent 领域多年积累的安全、安全与隐私工作成果，包括我们自身的工作以及企业用于运行其 Agent 的基础设施：

- Claude Duet 基于我们的 [可信 Agent 框架（新标签页打开）](https://www.anthropic.com/research/trustworthy-agents)，该框架同样指导着 Claude Code 和 Chrome 中的 Claude 等 Agent。
- Claude Duet 对凭据的处理遵循我们为 [Claude Managed Agents（新标签页打开）](https://www.anthropic.com/engineering/managed-agents) 所采用的设计，因此它不会直接看到你的密码或登录令牌。
- 所有操作均通过我们的 [自动模式分类器（新标签页打开）](https://www.anthropic.com/engineering/claude-code-auto-mode) 批准，这与保护 Claude 和 Claude Code 不会执行你未请求操作的 safeguards 相同。
- Claude Duet 针对隐藏指令和 prompt injection 的防御措施源自我们的 [browser-use 研究（新标签页打开）](https://www.anthropic.com/research/prompt-injection-defenses)，我们的模型和 safeguards 也在此方面提供了更广泛的覆盖。
- 我们对 Claude Duet 的安全基础设施进行了对抗性测试。红队和一家外部公司对其进行了渗透测试，且它受我们公开的 [漏洞赏金计划（新标签页打开）](https://hackerone.com/anthropic) 保护。

**Claude Duet 如何处理敏感信息。** 我们还发布了 Claude Duet，并配备了一个新的专用分类器和安全系统提示，用于检查每条消息并防止敏感信息泄露。一个能读取邮件并代表你发送消息的 Agent 需要不断决定信息应流向何处。这个新的分类器和提示旨在拒绝分享最高级别敏感信息的请求，包括信用卡号码和政府身份证件。其他敏感信息（如健康或个人财务信息）仅在你明确指示 Claude Duet 发送时才会被允许发出。

我们仍在持续开发并加强这些保护措施，并将在未来几天分享更多关于 Claude Duet 安全设计的详细信息。

### 测试者如何使用 Claude Duet

Anthropic 的员工一直在使用 Claude Duet 以完成更多工作，同时也为思考和保持专注留出更多空间。负责 Claude Code 团队的 Boris Cherny 在散步时与 Claude Duet 沟通他的待办事项，而不是将工作留到办公桌前处理。负责模型和产品行为设计团队的 Chelsea Larsson 在离开去陪伴孩子之前，将她的待办事项交给 Claude Duet，并保存结果以便晚间汇报。而 Claude Duet 团队本身也使用它来构建产品。团队负责人 Karan Ahuja 与它协作安排用户访谈、共同进行原型设计，甚至提交代码。

我们向小型企业主和创业者提前开放了 Claude Duet 的访问权限，其中一些人已经开始用它来帮助运营业务。以下是他们的一些反馈：

![](https://assets.claude.com/04a24f1e5f837cd4772f819fdf835bf695d545e0.jpg?w=168&q=75&fm=webp&fit=max)

> 杰西（Jess）每天早晨都会从 Claude Duet 那里获得一份简报。有一天，它未经请求就标记了一个日历上日期错误的房源展示。“这正是我希望它在我没有询问时就发现的情况，”她说。
杰西·普罗文彻（Jess Provencher），经纪人兼 Pro Homes 所有者 ![](https://assets.claude.com/28f5d3327f8406423e470308445e55db43409b73.jpg?w=168&q=75&fm=webp&fit=max)

> 阿明（Amin）在南佛罗里达州经营着 Shahs of Kabob，拥有约 110 名员工。他使用 Claude Duet 进行会计、客户支持和营销工作，并逐店处理发票。“它将所有事情整合在一起，”他说，“我不需要打开 100 个标签页。”
阿明·易卜拉希米（Amin Ebrahimi），Shahs of Kabob 所有者 ![](https://assets.claude.com/f1e82e9c902af913a2d794c587841fdf39cfda50.jpg?w=168&q=75&fm=webp&fit=max)

> 迈亚（Mya）即将与潜在客户进行通话。Claude Duet 在日历上看到了这一安排并准备了简报。它还注意到通话时间正好在她的航班之前，并建议调整时间。“我没有意识到那正好是我的航班之前，”她说，“我喜欢这种主动性。”
迈亚·道尔顿（Mya Dalton），品牌策略师

### Claude Duet 的工作原理

**来自 Claude 的上下文是基础。** Claude Duet 会从你的 Claude 账户继承记忆、技能和已连接的应用程序，因此设置过程几乎无需额外工作。变化在于协作方式：Claude Duet 会主动向你靠近，你可以通过打字或语音在同一个持续对话线程中与其交流，因此快速回复和为期一周的项目都始于同一处。

**当你离开时，工作仍在继续。** Claude Duet 拥有一台带有独立浏览器的虚拟机，因此不需要你的笔记本电脑或手机保持开启状态。用简短的消息描述任务，它会在后台自行决定使用哪些应用程序以及采取哪些步骤。任务完成或需要你的审查时，你会收到通知。

**当有事情需要你时，你会收到消息。** Claude Duet 每隔几小时检查一次你的已连接账户，因为持续检查会更快耗尽你计划中的使用额度。我们仍在测试它判断何时向你发送消息的能力，并将根据测试者的反馈继续调整。你也可以告诉它你想了解哪些内容以及频率。

**重要决策仍由你掌控。** Claude Duet 可以自行阅读、起草和准备工作。但在发送消息、付款、签署文件或删除任何内容之前，它会向你展示即将执行的操作并等待你的批准。即使获得你的批准，某些操作也是禁止的，例如交易证券或在账户间转移资金。你还可以断开 Claude Duet 访问的任何应用程序。

**连接你的业务所依赖的工具。** Claude Duet 可以使用 [Claude Marketplace (opens in new tab)](https://claude.com/marketplace/connectors-plugins) 中的 6,000 多个连接器和插件来：

- 查找你错过的 Gmail 和 Slack 消息并帮助你回复。
- 检查 Intuit QuickBooks 或 Stripe 中的未付发票并起草提醒。
- 在 Gusto 中准备并运行工资单，填写工时、奖金和报销金额。
- 起草招聘启事，经你编辑和批准后，发布到 LinkedIn。
- 帮助准备协议并通过 Docusign 发送以供审查和签署。
- 利用 HubSpot 中的联系人和交易历史起草跟进邮件。
- 在 Canva 中将你的产品发布转化为社交媒体活动。
- 设置、设计和运营你的 Shopify 商店。即将推出更丰富的视觉编辑器，让你在设计店面后、任何内容上线前进行预览。

你还可以使用 Claude Duet 通过 Link（Stripe 的数字钱包）为业务购买物品。Claude Duet 会与你确认商品，Link 会要求你批准支出。然后使用虚拟卡进行支付，因此不会泄露你的真实卡号。它还可以使用 Shopify 的 Shop Pay 在在线商店结账。即将推出，经你许可后，它将能够使用保存在 1Password 中的登录信息登录网站。

![Claude Duet 兼容的应用程序 Logo](https://assets.claude.com/c3618d5ce675bcaa9716a06d180879c2b94161c3.png)

### 加入研究预览

这是 Claude Duet 的早期版本，它仍可能误读线程或对紧急程度判断失准。我们围绕工作场景构建了其核心功能，因此处理预订机票等个人琐事的能力尚不够强，且目前它还无法向您展示其浏览器界面。目前，Claude Duet 拥有独立于主 Claude 应用程序的应用程序。我们将根据早期用户的使用反馈来塑造两者的协作方式。

在研究预览期间，Claude Duet 会与其余 Claude 功能共享您计划的使用限额，并且其使用方式与典型对话有所不同。其后台检查会占用这些限额，而构建财务模型或演示文稿等大型任务则需要更多的模型轮次和后台工作。

我们今天首先面向美国的 Pro 和 Max 用户推出此功能。加入 [等待名单（在新标签页中打开）](https://claude.com/product/claude-duet)，一旦 Claude Duet 准备就绪，我们将通过电子邮件通知您。

[文章 2026年10月21日 HCLTech 加入 Claude 合作伙伴网络，成为全球首选合作伙伴 HCLTech 将把 Claude 引入其为银行、医院、电信公司和制造商提供的解决方案中。](https://claude.com/resources/articles/hcltech-joins-claude-partner-network) [文章 2026年10月21日 Claude Security 现在进行持续扫描并跟踪修复 Claude Security 现在会随着代码更改持续跟踪您的代码库，跟踪发现项直至修复，从团队添加的上下文中学习，并通过 API 和 MCP 连接到您的工具。Claude Enterprise 客户可参与公开测试版。Claude Security](https://claude.com/resources/articles/claude-security-now-scans-continuously-and-tracks-fixes) [文章 2026年10月15日 Code Review 现已全面可用 在生产环境部署前捕获更多错误。Claude Code](https://claude.com/resources/articles/code-review-is-now-generally-available) [文章 2026年10月8日 使用 Claude 构建实时仪表板并制作动画解说视频 Claude Dashboards 和 Claude Motion 现已进入测试版。Docs、Slides 和 Design 已脱离测试版，并适用于所有 Claude 计划，包括免费版。Claude 应用 Claude Design 更多：Claude Cowork 和 Claude Code Claude Cowork Claude Code](https://claude.com/resources/articles/dashboards-and-motion)

### 使用 Claude 变革您组织的运营方式
[查看定价](https://claude.com/pricing#api) [联系销售](https://claude.com/contact-sales)

#### 订阅开发者通讯

产品更新、操作指南、社区亮点等。每月发送至您的邮箱。

如果您希望接收我们的每月开发者通讯，请提供您的电子邮件地址。您可以随时取消订阅。
