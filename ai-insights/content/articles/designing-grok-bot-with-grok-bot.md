---
title: "Grok Bot 设计指南：用真实动画资产与 Figma 母版缩短试做循环"
date: 2026-10-10T00:00:00.000Z
tags: ["会员", "AI 实操", "Grok Bot", "Agent", "工作流", "聚合"]
summary: "John Bai 的四个设计 Agent：探索桌面原型、调动画手感、批量填充生产组件。"
---
> **原文链接**: [https://x.ai/bot/guides/designing-grok-bot-with-grok-bot](https://x.ai/bot/guides/designing-grok-bot-with-grok-bot)
> **来源**: John Bai
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/designing-grok-bot-with-grok-bot/) · 2026/10/10
> **说明**: 本文由 AIHot 自动聚合(原文即中文,未翻译)。上游原文多次抓取失败(含登录墙/反爬,CDP 渲染亦无法获取),正文取自小互 AI 解读

---

**已核对**John Bai10-10 · 约 10 分钟

Grok Bot 的设计指南，来自 John Bai 用 Grok Bot 设计产品本身的实践。四个常驻 Agent 分担概念试做、动效打磨、Figma 重复生产与工程咨询，让设计师更早接触可以实际体验的版本。

这套方法沿用已有设计工具，也使用真实动画规范和 Figma 母版。Agent 加快制作、体验、修改的循环；选择哪个版本，以及它在日常工作中是否有帮助，仍由设计师判断。

---

#### 四位设计 Agent 的角色定位与拉通机制

要想让多个 Agent 协同工作而不陷入混乱，首先必须理清每个角色的职责边界。在这套工作流中，4 个 Bot 并不是泛泛的聊天机器人，而是分工严密、各持不同工具链的专项搭档：

![四位专项 Agent：Experiments、Motion God、Figma Bro 与 DevBot](https://best.xiaohu.ai/media/designing-grok-bot-with-grok-bot/source-01.webp)

四位专项 Agent 头像与分工：各自负责前沿探索、动效打磨、画板规范与工程支撑

1. **Experiments（脑洞试水员）**：专接不成熟、没想清楚最终形态的前沿想法。它的唯一目标是把概念迅速做成能上手的实物，启动前不需要证明商业价值或技术排期。
2. **Motion God（动效调优师）**：手握真实动画规范文件，负责在本地启动调试沙盒，听取设计师的感性指令，实时调整微观手感。
3. **Figma Bro（规范搬砖工）**：接入 Figma MCP（Model Context Protocol，模型上下文协议），以画板中的母版组件和自动布局（Auto-layout）为绝对基准，专门处理批量生成、图标对齐等重复性高精度工作。
4. **Devbot（工程落地顾问）**：解答底层技术可行性、系统级 API 限制，帮助其他几个 Bot 理解设计概念在实际代码中该如何编写。

这四位 Agent 并不处于割裂的单线问答状态，它们能够「开小会（Huddle）」并互相分工。当一个前沿想法提出时，负责探索的 Experiments 会自主把角色动作与过渡分派给 Motion God，把系统调用与工程问题交给 Devbot，最后再把成果整合为可实际体验的原型。

---

#### 工作流一：模糊设想的无负担具象化（Experiments 模式）

**解决什么问题**：打破「只有先论证可行性才能动手做原型」的传统流程，让荒谬或未经验证的交互能够低成本显形。

在探索如何让 Grok Bot 在桌面端随时随地被唤起（Ambient Bot Access）时，团队内部并不知道哪种形式体验最好。John Bai 没有停留在脑暴或画草图，而是让 **Experiments** 直接构建了三种截然不同的系统级原型：

1. **Mac 屏幕刘海常驻（Notch）**：把 Bot 嵌在屏幕刘海区域。平时安稳收拢、不抢占宝贵的工作窗口；有事件需提醒时轻微探出；点击时展开成小巧的工作面板。
2. **桌面角落悬停探出（Corner Peek）**：平时完全隐藏，鼠标滑过屏幕边缘时探头登场。这种形式弱化了「软件常驻面板」的工具感，更像一个被召唤的角色。
3. **光标随行伴侣（Cursor Companion）**：让 Bot 如影随形地跟着鼠标指针，与用户当前的实时操作保持高密度交互。

##### 协作与串联链条

- **输入**：设计师给出纯口语的功能设想（例如：“试试把 Bot 塞在 Mac 刘海里，展开变成小面板”）。
- **执行动作**：Experiments 接单后发现涉及系统底层窗口行为，向 **Devbot** 咨询桌面行为与实现问题；涉及展开收起的过渡手感，再委托 **Motion God** 编写动效曲线；最后将各部分组装成本地可运行的应用。
- **交付成果**：不是静态汇报文档，而是安装在电脑上能点、能划、能日常体验的实际 Demo。
- **人工决定**：设计师在全天的日常工作中自然接触每个版本，体会它们在何时带来助益、何时造成干扰，或者介于两者之间。

> **这三个探索概念最终都没有原样上线**。探索的目的并非直接交付上线，而是在真实使用中体会不同交互何时提供帮助、何时产生干扰，并从中获得认知。

---

#### 工作流二：基于真实生产资产的直觉调优（Motion God 模式）

**解决什么问题**：告别以往动效必须甩给人肉动效师、改一次参数等半天的脱节状态，让设计师能够用直觉体感在真实代码资产上调手感。

🔒 MEMBERS ONLY

### 后面约 7 分钟，是会员的。

免费部分到这里。墙内还有：

约 7 分钟正文6 处图表与交互
🔓 380 篇存量深度 / 研究解读全文一并解锁🎧 全部播客音频 + 私有播客源⧉ 全文 Markdown 导出
🔥 创始 100 席已售罄 · 350+ 位会员在读

[解锁全站 $59/年](https://best.xiaohu.ai/buy/?plan=year&slug=designing-grok-bot-with-grok-bot)
[先读这篇 $1.99](https://best.xiaohu.ai/buy/?plan=single&slug=designing-grok-bot-with-grok-bot)
[按月 $6.99](https://best.xiaohu.ai/buy/?plan=monthly&slug=designing-grok-bot-with-grok-bot)

单篇费用 30 天内升年卡可全额抵扣（回复收据邮件即可）

[已是会员？邮箱登录 →](https://best.xiaohu.ai/login/?next=%2Farticle%2Fdesigning-grok-bot-with-grok-bot%2F)
美元结算 · 年卡 / 单篇支持支付宝、微信；月卡需银行卡 · 年付 7 天不满意全额退。

暂时不开会员？

留个邮箱，新解读第一时间发你。确认订阅后，我把**这篇的一页纸**一起发过去。

[全部订阅方式（RSS / Telegram / 播客）→](https://best.xiaohu.ai/subscribe/)

↑ 正文结束

[阅读原文 ↗](https://x.ai/bot/guides/designing-grok-bot-with-grok-bot)

### 相关解读

[AI 实操 Grok Bot 多项目指南：一个频道、一组成员和两层 Notion 看板 10-10 · 约 8 分钟](https://best.xiaohu.ai/article/how-i-run-multiple-teams-of-grok-bots/)[AI 实操 Grok Bot 日常办公指南：让四个 Bot 管好消息、日历与工作情报 10-10 · 约 12 分钟](https://best.xiaohu.ai/article/grok-bot-for-work/)[AI 实操 Grok Bot SDR 指南：Cursor 写调研与草稿，Bot 做查重与待发分流 10-10 · 约 12 分钟](https://best.xiaohu.ai/article/grok-bot-for-sdrs/)
