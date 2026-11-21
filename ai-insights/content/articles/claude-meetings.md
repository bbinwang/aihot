---
title: "Anthropic 发布 Claude Meetings：Claude 可作为参会人替你开会，会还没散，方案已经写好了"
date: 2026-11-14T00:00:00.000Z
tags: ["产品发布", "Anthropic", "Claude Meetings", "Claude", "AI 会议助手", "Google Meet"]
summary: "Anthropic 发布测试版 Claude Meetings：Claude 作为看得见的参会人进入团队的视频会议，听着讨论当场建文档和白板，纪要和待办也归它。会还没散，东西已经摆在那儿了。"
---
> **原文链接**: [https://claude.com/blog/claude-meetings](https://claude.com/blog/claude-meetings)
> **来源**: claude.com
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/claude-meetings/) · 2026/11/14
> **说明**: 本文由 AIHot汪 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

Claude 现在可以作为可见参与者加入你的视频通话，跟随对话并在会议期间开始工作。Claude Meetings 现已进入测试阶段。

在会议期间，你的团队可以通过语音或聊天向 Claude 提问。默认情况下，Claude 以书面形式回答，并且在获得你的许可后，它可以使用你连接的工具。

![screenshot off a meeting with Claude as a participant](https://assets.claude.com/c3058c8a8e4222788e9d908be5c697697137faaa.png)

Claude 还会与你实时协作，共同构建文档、[白板 (opens in new tab)](https://claude.com/resources/articles/sheets-whiteboards-data) 或其他工件，而邀请列表中的其他同事可以对其进行完善。Claude 会撰写笔记和行动项，因此通话中的任何人都无需手动记录。

Claude Meetings 正在 Team 和 Enterprise 计划中逐步推出测试版。对其他视频会议平台的支持即将推出。

### 它长什么样

假设你的团队正在策划一场客户活动，Claude 也在通话中。你说：“Claude，为此计划创建一个文档。” Claude 会整理团队目前讨论的内容，而邀请列表中的同事可以在你继续发言的同时编辑该计划。

当你们开始讨论预算时，有人问 Claude 去年活动的花费是多少。Claude 会请求他们的批准来查询数据，将其发布到会议聊天中，并将其与当前计划进行比较。当你们开始讨论时间线时，有人要求 Claude 将其放在白板上，团队就可以一边查看文档，一边共同完善时间表。

![Screenshot showing a meeting with customer plan](https://assets.claude.com/6230bdd7ee4d9bd1415ac139dc9e54e4f0defe0e.png)

在会议结束前，有人要求 Claude 向团队分享一份回顾。通话结束后，所有笔记、行动项、计划和白板内容都会显示在 [claude.ai (opens in new tab)](http://claude.ai/) 上该会议的页面中。

![Screenshot showing a meetings document in progress](https://assets.claude.com/a8f4de962073f5e5b755fbefdb73a4bc4a764785.png)

稍后，你可以回顾你参与过的会议并向 Claude 提问，或者从 claude.ai 的日历中将 Claude 添加到下一次会议中。

我们正在与 Gong、Attention、Granola、Fireflies.ai、Otter 和 Plaud 等合作伙伴合作，因此你很快就能将会议转录内容发送到你团队已经使用的工具中。

### 安全与隐私

Claude 会在 [claude.ai (opens in new tab)](http://claude.ai/) 上为每次会议添加一个单独的页面，其中包含笔记、转录内容以及它生成的所有内容。邀请列表中的你所在组织的成员可以查看并编辑 Claude 生成的内容，并且可以从该页面将其分享给组织中的其他人。

默认情况下，当邀请来自你所在组织之外的人员时，Claude 会避免加入通话；如果中途有外部人员加入，Claude 会退出。管理员可以允许 Claude 在与外部客人的通话中参与。在这些通话中，Claude 会在通话聊天中发布通知，但不会在那里回复，而客人所说的内容会被包含在笔记和转录内容中。

Claude 会在获得每个人许可的情况下使用其连接的工具。第一次使用时会进行询问，一旦同意，后续将默认应用此设置。目前，当有人通过语音提问时，Claude 每次都会询问以确认发言者身份。在通话聊天中发布的答案对通话中的所有人都可见。

当 Claude 加入时，它会作为参与者出现，并在通话聊天中发布通知。它会保存转录内容、摘要和屏幕描述，但不保存音频。

在添加 Claude 或开启自动加入功能之前，请确保通话中的所有人员都同意进行转录。

### 入门指南

当有人添加 Claude 或开启自动加入功能时，Claude 就会加入。目前支持 Google Meet，其他平台的支持即将推出。在 Team 计划中，默认情况下允许将 Claude 邀请到你的会议中，管理员可以关闭此功能。在 Enterprise 计划中，管理员可以为整个组织或部分组织开启此功能。在测试期间，某些组织无法使用此功能，包括具有零数据保留 (ZDR)、HIPAA 就绪配置或客户管理加密密钥 (CMEK) 的组织。

在测试期间，Claude 的笔记和转录内容在 Team 和 Enterprise 计划中免费使用。因此，通话中 Claude 的回答也是免费的，除非回答使用了您连接的某个工具，这种情况下将计入您计划的用量。Claude 在通话中生成的文档、[白板（新标签页打开）](https://claude.com/resources/articles/sheets-whiteboards-data) 和其他工件在 2027 年 2 月 10 日之前均免费使用。

设置步骤请参阅 [帮助中心](https://support.claude.com/en/articles/18325154)。

[文章 2026年11月12日 在您的安全边界内运行 Claude Managed Agents 介绍自托管的 Claude Managed Agents。现在您可以在自己的环境中运行 Agent，无论是在您的云环境中还是本地部署。您负责托管 Agent、凭据和会话历史，并选择将请求发送到 Claude 的位置。Claude Platform Claude Managed Agents](https://claude.com/resources/articles/self-hosted-claude-managed-agents)

[文章 2026年11月12日 推出 Claude for Manufacturing 一款拥有 17 项技能和四个连接器插件，帮助制造商从他们已运行的系统中起草报价单、质量报告和供应商请求。](https://claude.com/resources/articles/claude-for-manufacturing)

[文章 2026年11月10日 您的应用现在可以在 Claude 中打开，Claude 也可以在应用中工作 我们的合作伙伴现在可以将他们的应用直接嵌入 Claude，这样您就可以和 Claude 在同一个工具、同一个屏幕上工作，无需切换标签页。Claude 应用 MCP](https://claude.com/resources/articles/interactive-connectors-full-tool)

[文章 2026年11月10日 更多与 Claude 协作的方式：Sheets、Whiteboards 和 Interactive Connectors 以思维的速度工作 Claude 应用](https://claude.com/resources/articles/more-ways-to-work-with-claude-sheets-whiteboards-and-interactive-connectors)

### 通过 Claude 变革您组织的运营方式
[查看定价](https://claude.com/pricing#api)[联系销售](https://claude.com/contact-sales)

#### 订阅开发者通讯

获取产品更新、操作指南、社区亮点等内容。每月发送至您的邮箱。

如果您希望接收我们的每月开发者通讯，请提供您的电子邮件地址。您可以随时取消订阅。
