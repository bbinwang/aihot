---
title: "Grok Bot 多项目指南：一个频道、一组成员和两层 Notion 看板"
date: 2026-10-10T00:00:00.000Z
tags: ["会员", "AI 实操", "Grok Bot", "Agent", "工作流", "聚合"]
summary: "Eric Zakariasson 的实验性组织方式：复用岗位、追踪任务状态，在阻塞处交回人。"
---
> **原文链接**: [https://x.ai/bot/guides/how-i-run-multiple-teams-of-grok-bots](https://x.ai/bot/guides/how-i-run-multiple-teams-of-grok-bots)
> **来源**: Eric Zakariasson
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/how-i-run-multiple-teams-of-grok-bots/) · 2026/10/10
> **说明**: 本文由 AIHot 自动聚合(原文即中文,未翻译)。上游原文多次抓取失败(含登录墙/反爬,CDP 渲染亦无法获取),正文取自小互 AI 解读

---

**已核对**Eric Zakariasson10-10 · 约 8 分钟

当你只用一两个 AI Bot 处理零散琐事时，在左侧开两个独立对话窗口——一个用来写代码，一个用来写文案——确实足够直观。但如果手头同时推进两三个复杂的实际业务项目，这种「一对一单聊（1:1 Chats）」的模式就会很快陷入混乱：上下文被切得七零八落，你很难在信噪比极低的窗口列表里分清谁在推进哪件事，更无法让负责不同环节的 Bot 彼此同步进度。

来自 xAI 的工程师 Eric Zakariasson 在工程指南中分享了他探索出的一套组织模式。他的核心思路非常朴素，却切中了多智能体落地的关键痛点：**既然人类团队是靠「项目制」来协作的，为什么不直接把人类这套经过验证的工作流完整搬给 AI？**

在人类组织中，每个项目都有专属的立项说明（Spec）、行动计划、专用的沟通群（如 Slack 频道），以及分派到具体负责人的任务看板。Eric 将这套机制映射到了 Grok Bot 中，提炼出一个高凝聚力的组织单元：

> **一个项目 = 侧栏的一个专属频道（Channel） + 固定的成员花名册（Roster） + Notion 里的双层看板（Notion Board）。**

这并不是一份宣称包办一切的官方终极方案，而是一个正在实际工作中不断迭代的实验性协作框架。

---

#### 系统的骨架：双层 Notion 数据库与「项目经理」Bot

要让多个 Bot 像团队一样协同，首先必须把项目的全局元信息（Meta work）从具体的业务细节中抽离出来。

Eric 在 Notion 中搭建了两个互相联动的底层数据库，分别管理宏观项目与微观任务：

1. **Projects 数据库（项目看板）**：记录宏观项目的生命周期。看板列包括 `Planning`（规划中）、`In progress`（进行中）、`Paused`（已暂停）以及 `Backlog`（待办池）。例如官方示例中推进的 TypeScript 客户端 SDK 开发或排行榜功能，都在这里作为独立的项目卡片存在。
2. **Tasks 数据库（任务看板）**：记录原子粒度的执行事项。每一个任务卡片都强关联到所属的 Project。看板的核心状态列包括 `Todo`（待办）、`In progress`（进行中）、`Blocked`（被阻塞）以及 `Done`（已完成）。

![Notion 中的 Projects 数据库看板](https://best.xiaohu.ai/media/how-i-run-multiple-teams-of-grok-bots/source-03.jpg)

Notion 中的 Projects 看板，以高层视角跟踪不同业务项目的阶段状态。

有了数据结构后，如何驱动它？如果让人类每次手动去创建群组、拉人、更新状态，效率反而会倒退。因此，整个体系的核心枢纽是一个被命名为 **Projects Manager（项目经理 Bot，简称 PM）** 的常驻智能体。

🔒 MEMBERS ONLY

### 后面约 6 分钟，是会员的。

免费部分到这里。墙内还有：

约 6 分钟正文6 处图表与交互
🔓 380 篇存量深度 / 研究解读全文一并解锁🎧 全部播客音频 + 私有播客源⧉ 全文 Markdown 导出
🔥 创始 100 席已售罄 · 350+ 位会员在读

[解锁全站 $59/年](https://best.xiaohu.ai/buy/?plan=year&slug=how-i-run-multiple-teams-of-grok-bots)
[先读这篇 $1.99](https://best.xiaohu.ai/buy/?plan=single&slug=how-i-run-multiple-teams-of-grok-bots)
[按月 $6.99](https://best.xiaohu.ai/buy/?plan=monthly&slug=how-i-run-multiple-teams-of-grok-bots)

单篇费用 30 天内升年卡可全额抵扣（回复收据邮件即可）

[已是会员？邮箱登录 →](https://best.xiaohu.ai/login/?next=%2Farticle%2Fhow-i-run-multiple-teams-of-grok-bots%2F)
美元结算 · 年卡 / 单篇支持支付宝、微信；月卡需银行卡 · 年付 7 天不满意全额退。

暂时不开会员？

留个邮箱，新解读第一时间发你。确认订阅后，我把**这篇的一页纸**一起发过去。

[全部订阅方式（RSS / Telegram / 播客）→](https://best.xiaohu.ai/subscribe/)

↑ 正文结束

[阅读原文 ↗](https://x.ai/bot/guides/how-i-run-multiple-teams-of-grok-bots)

### 相关解读

[AI 实操 Grok Bot 日常办公指南：让四个 Bot 管好消息、日历与工作情报 10-10 · 约 12 分钟](https://best.xiaohu.ai/article/grok-bot-for-work/)[AI 实操 Grok Bot SDR 指南：Cursor 写调研与草稿，Bot 做查重与待发分流 10-10 · 约 12 分钟](https://best.xiaohu.ai/article/grok-bot-for-sdrs/)[AI 实操 Grok Bot 招聘指南：把寻访、面试准备和评分卡连成一条工作流 10-10 · 约 9 分钟](https://best.xiaohu.ai/article/grok-bot-for-recruiting/)
