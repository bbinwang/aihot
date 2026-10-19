---
title: "Claude 发布实时数据看板 Dashboards 和代码驱动动态解说工具 Claude Motion：让一切都被做成视频能动起来"
date: 2026-10-09T00:00:00.000Z
tags: ["产品发布", "Anthropic", "Claude", "Dashboards", "Claude Motion", "Artifacts", "聚合"]
summary: "从问一个业务问题，到核对数据、做成动画、交给团队继续改：这次更新把分析与表达接到了同一段对话里。"
---
> **原文链接**: [https://claude.com/resources/articles/dashboards-and-motion](https://claude.com/resources/articles/dashboards-and-motion)
> **来源**: Anthropic
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/claude-dashboards-motion/) · 2026/10/9
> **说明**: 本文由 AIHot 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

从今天起，Claude 可以将你的数据转化为实时更新的仪表板，并将你的创意转化为下一次演示的动画解说视频。Claude Dashboards 可连接 BigQuery、Databricks 或 Snowflake 等数据平台，或 Salesforce 等 CRM 工具，目前已在付费计划中提供测试版。Claude Motion 在 Team 和 Enterprise 计划中提供测试版。Claude Docs、Slides 和 Design 已正式结束测试，在所有计划（包括免费版）中均可使用。

向公司数据提问通常意味着提交工单或编写 SQL 代码。而更适合以动态形式呈现的创意，往往最终变成另一张静态幻灯片。因此，人们常常选择等待或直接跳过。Claude 此前已能协助完成其中部分工作。现在，你可以直接要求生成仪表板或动画，并查看 Claude 的制作过程。每个图表都显示其背后的查询语句，每个动画均以可编辑的代码形式构建。Claude 生成初版，由你决定哪些内容可以分享。

### Claude Dashboards：快速查询公司数据

连接 Amazon Redshift、BigQuery、ClickHouse、Databricks 或 Snowflake 等公司数据平台，用自然语言提出问题。Claude 从你的数据中提取答案，构建仪表板，并随着数据更新保持其最新状态。它还能与其他连接器配合使用。例如，你可以要求生成 Salesforce 机会的仪表板。仪表板非常适合快速探索性问题，例如本周注册人数与上个月的对比。点击任意数字即可查看其背后的查询语句，或要求 Claude 进行解释。每个图表都会显示其数据上次刷新的时间。

![Claude 基于一年骑行数据构建共享单车仪表板，包含总行程数以及按日和按小时划分的骑行图表。](https://assets.claude.com/7688d4d3b888c17cf4b3553f537f291882a92656.png)

仪表板可与你的 BI 和分析工具协同工作。当问题需要更深入的分析时，可将 Claude 生成的仪表板直接发送至 Amplitude、Grafana、Hex、Mixpanel、Omni、Perplexity、PostHog 或 Sigma，并在此基础上继续分析。Looker、monday.com 和 Tableau 的集成即将推出。

### Claude Motion：用动画阐释你的创意

要求 Claude 将季度报告转化为面向全员会议的 30 秒解说视频，为董事会演示文稿中的图表添加动态效果，或为客户入职流程制作产品导览。Claude 根据你的提示生成动画，并以短视频形式播放。你可以在编辑器中调整动画，或要求 Claude 进行修改，然后将其下载为 MP4 文件。

![在 Claude 消息框中输入“/motion”会调出 Motion 选项。](https://assets.claude.com/46f88e8de631c732fa245ad453262e6ef35c0e73.png)

Claude Motion 专为展示你自己的工作内容而设计。Claude 编写代码来动画化你的文本、图表、形状和图片，因此你可以修改任何文字、数字或时间节奏。它不使用视频生成模型，因此不会生成虚假影像或 AI 生成的人物。当你希望进一步编辑时，可将其导入 Adobe、Descript、HeyGen、Higgsfield、invideo、Luma AI 或 Runway，Canva 和 Captions 的集成即将推出。

### Docs、Slides 和 Design 已就绪，适用于日常工作

[自我们在每次 Claude 对话中引入 Docs、Slides 和 Design（在新标签页中打开）](https://claude.com/blog/cowork-is-now-claude) 以来，用户已在 Claude 中创建了超过 4500 万份文档、演示文稿和设计稿。我们后续推出的大部分功能都来自你的反馈，旨在让日常使用更加便捷。因此，我们正式移除测试版标识。

- **适用于企业环境。** Artifacts 现支持 CMEK，管理员可选择组织使用的 Artifacts 模板。
- **与团队协同编辑。** 你和团队可以与 Claude 共同编辑同一份文档、演示文稿、设计稿或仪表板。
- **向团队外分享。** 如果管理员允许，你可以向组织外部人员或任何拥有链接的人分享幻灯片、设计稿、仪表板和动画。
- **保留格式的导出功能。** PowerPoint 和 PDF 下载文件与编辑器中的外观一致，演示文稿可直接作为可编辑文件导入 Google Slides。
- **手机端编辑。** 在 Claude 移动应用中修改文档、演示文稿或设计稿。

### Claude Design 已整合至 Claude

Claude Design 最初拥有独立的访问地址 claude.ai/design。自 9 月 16 日起，Design 功能也集成在每一个 Claude 对话中，能够利用您的上下文、文件和连接器。维持两个版本会拖慢两者的修复进度，因此我们将独立站点整合进 Claude。该独立站点将保留至 12 月 14 日，以便您有时间进行迁移。

- **立即迁移您的设计系统。** 在 Claude 的 Artifacts 页面中，点击“Migrate team design systems”。一次迁移即可将您组织内的所有设计系统导入，且原始版本在独立站点关闭前保持不变。
- **您的项目目前无需任何操作。** 它们在独立站点关闭前将继续正常运行。
- **保存您的聊天记录和评论。** 与 Claude 的聊天记录以及您项目中的评论将保留在独立站点中，并在其关闭后不再可用。指向独立站点的公开链接届时也将失效。

阅读[迁移指南](https://support.claude.com/en/articles/17440474)以获取更多信息。

### 入门指南

打开 Claude 并输入您的需求，例如“构建本季度按地区划分的收入仪表板”、“为销售启动会制作我们定价方案对比的动画演示”，或“将这些笔记转化为周一的演示文稿”。从您原本需要等待的仪表板或需要超过一张幻灯片的报告开始。

**针对企业管理员：** Dashboards 和 Motion 功能默认处于关闭状态，您可以在“组织设置 > Artifacts”中开启它们。Docs、Slides 和 Design 功能将于 10 月 15 日默认开启，或者您也可以立即开启它们。

[文章 2026 年 10 月 7 日 Claude Haiku 5.5 介绍 Claude Haiku 5.5：我们发布过的最便宜、最快且能力最强的小型模型。](https://www.anthropic.com/claude-haiku-5-5)
[文章 2026 年 10 月 6 日 Claude 现支持 Google Docs、Sheets 和 Slides](https://claude.com/resources/articles/claude-now-works-in-google-docs-sheets-and-slides) 在 Google Workspace 上运行的团队现在可以通过我们的新插件以及 Google Docs、Sheets 和 Slides 连接器（测试版）将 Claude 引入其文件或直接从 Claude 处理文件。Claude Enterprise
[文章 2026 年 10 月 6 日 我们扩展 Claude Startups 计划以助力创始人构建](https://claude.com/resources/articles/were-expanding-the-claude-startups-program-to-help-founders-build)
[文章 2026 年 10 月 6 日 扩展网络验证计划](https://www.anthropic.com/news/cyber-verification-program) 我们推出了新版扩展版网络验证计划 (CVP)，使符合条件的安全专业人员能够使用高级网络功能和降低的拦截分类器。

### 通过 Claude 变革组织的运营模式
[查看定价](https://claude.com/pricing#api) [联系销售](https://claude.com/contact-sales)

#### 订阅开发者通讯

获取产品更新、操作指南、社区亮点等内容。每月发送至您的邮箱。

如果您希望接收我们的每月开发者通讯，请提供您的电子邮件地址。您可以随时取消订阅。
