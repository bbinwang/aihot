---
title: "Claude Motion 与 Dashboards 完整上手指南 把任何数据和内容做成动画视频"
date: 2026-10-09T00:00:00.000Z
tags: ["会员", "深度", "Claude", "Claude Motion", "Dashboards", "Artifacts", "教程", "聚合"]
summary: "完整解读为会员内容 → best.xiaohu.ai/membership/"
---
> **原文链接**: [https://support.claude.com/en/articles/17454997-get-started-with-claude-motion](https://support.claude.com/en/articles/17454997-get-started-with-claude-motion)
> **来源**: Anthropic 官方帮助中心
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/claude-dashboards-motion-guide/) · 2026/10/9
> **说明**: 本文由 AIHot 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

## 开始使用 Claude Motion

Claude Motion 可将您的内容转化为短视频动画，例如全员大会的解说视频、董事会演示文稿中的动态图表，或客户入职引导的产品操作演示。本指南介绍如何创建、编辑动画，以及导出或分享动画。

Claude Motion 在 Team 和 Enterprise 计划中以测试版形式提供。Team 计划默认开启此功能。Enterprise 计划默认关闭此功能，需由所有者在 **[组织设置 > 工件](https://claude.ai/admin-settings/artifacts)** 中手动开启。

### Claude Motion 的工作原理

动画是一种基于 Motion 模板生成的工件（artifact）。Claude 会根据您的提示词，将文本、图表、形状和图像中的元素转化为代码并生成动画，其播放效果类似短视频。

Claude Motion 不使用视频生成模型，因此不会生成逼真的影像或人物。由于每个动画均由代码构成，您可以修改单个细节（如某个单词、数字或时间节奏），而其余部分保持不变。

您创建的每个动画都会保存在 **工件** 标签页中。了解更多关于 **[工件及其使用方法](https://support.claude.com/en/articles/17153992)** 的信息。

### 创建动画

#### 从聊天窗口

在任何聊天中向 Claude 请求生成动画。例如：

- “将此季度报告转化为 30 秒的全员大会解说视频。”

- “为销售启动会制作一个动态对比我们定价方案的动画。”

- “为新客户制作简短的设置步骤操作演示。”

您也可以在消息框中选择“输出”并选择“Motion”。

#### 从工件标签页

1. 前往 **工件** 标签页。

2. 选择一个 Motion 模板。

3. 描述您想要的动画效果。

#### 提升效果的小贴士

说明目标观众、播放场景以及大致的时长。附上您希望 Claude 使用的报告、数据或图片，以便动画基于您自己的内容生成。

### 编辑动画

- **向 Claude 提出修改请求：** 在聊天中要求更改，例如“放慢第二场景的节奏”或“将 Q3 的数据改为 18%”。

- **直接编辑：** 在编辑器中自行调整动画。

### 导出与分享

要下载动画，请点击“导出”并选择 MP4 格式。动画默认仅对您本人可见。如需分享，请打开动画并点击“分享”。了解更多关于 **[分享工件](https://support.claude.com/en/articles/9547008)** 的信息。

### 使用情况

Claude Motion 会占用您计划的使用额度，与使用 Claude 的其他工作一样。较长或更复杂的动画会比普通消息消耗更多的额度。了解更多关于 **[使用情况和长度限制的工作原理](https://support.claude.com/en/articles/11647753)** 的信息。

### 为您的组织开启 Claude Motion

本节内容适用于 Team 和 Enterprise 计划中的所有者（Owners）和主要所有者（Primary Owners）。

所有者可在 **[组织设置 > 工件](https://claude.ai/admin-settings/artifacts)** 中开启或关闭 Claude Motion。Team 计划默认开启，Enterprise 计划默认关闭。在 Enterprise 计划中，所有者还可通过自定义角色将其限制为特定组使用。了解更多详情，请参阅 **[Team 和 Enterprise 计划的工件管理指南](https://support.claude.com/en/articles/16994751)**。
