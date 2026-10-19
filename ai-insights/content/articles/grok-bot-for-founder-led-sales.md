---
title: "Grok Bot 创始人销售指南：Founder Mode 串起首批客户与产品反馈"
date: 2026-10-10T00:00:00.000Z
tags: ["会员", "AI 实操", "Grok Bot", "Agent", "工作流", "聚合"]
summary: "一名幕僚长和八个专岗，覆盖客户画像、触达、会谈、需求整理与产品迭代。"
---
> **原文链接**: [https://x.ai/bot/guides/grok-bot-for-founder-led-sales](https://x.ai/bot/guides/grok-bot-for-founder-led-sales)
> **来源**: Simon Lackowski
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/grok-bot-for-founder-led-sales/) · 2026/10/10
> **说明**: 本文由 AIHot 自动聚合(原文即中文,未翻译)。上游原文多次抓取失败(含登录墙/反爬,CDP 渲染亦无法获取),正文取自小互 AI 解读

---

**已核对**Simon Lackowski10-10 · 约 11 分钟

Grok Bot 的 Founder Mode，是 Simon Lackowski 为创始人亲自做早期销售设计的一套工作配置：一名幕僚长，八个专业 Bot。它们准备客户研究、触达与会谈材料，再把客户反馈接到产品改进和后续沟通。

在招聘首位销售之前，创始人仍需要亲自学习客户为什么愿意买、如何定价，以及怎样形成可重复的打法。Bot 把相关背景与草稿提前准备好，发送、合同、价格和代码合并仍需要批准。

---

#### 一、起步配置与 8+1 架构：给创始人配一支 24 小时待命的协作团队

许多人尝试用 AI 辅助工作时，最常犯的错误就是把所有需求塞进同一个对话框，最后让上下文变成一锅无法理清的乱炖。在 Founder Mode 的设定中，核心设计原则是**「一个 Bot 只认领一件具体的工作」**，并通过四个彩色文件夹（Pipeline、Customers、Product、Marketing）进行归类隔离。

常驻在云端虚拟机上的 Grok Bot 即使在你的笔记本合上时依然保持运转。每天清晨走进办公室时，夜间准备好的任务已经分门别类暂存在对应的待办格中。Bot 具备记忆能力，可读取往期邮件理解外拓风格，提炼语气指南供所有起草 Bot 遵循。

##### 起步配置：Founder Mode setup pack 与工具接入

部署的第一步是安装 Founder Mode setup pack，它包含 1 位数字幕僚长 Bot、4 个侧边栏文件夹、8 位专职 Bot、16 个处于暂停状态的例行任务（paused routines）以及 1 个共享数据文件夹：

- **约 20 个初始提问（Onboarding）**：系统会询问公司的业务与宣讲重点、创始人语气样本、ICP 画像、目标账户、竞对名单、P0 级问题定义、连接器选择，以及决定开启哪些例行任务。
- **调度确认后启用**：所有例行任务初始均为暂停状态，只有当创始人明确确认了偏好的执行时间表（preferred schedule）后，对应的 routine 才会正式启用。
- **工具接入节奏**：优先连接已在使用的工具——Gmail 与 Calendar（仅授予草稿起草与只读权限）、交易跟踪表 CSV（直到业务体量超出表格承载）、LinkedIn 与 X（仅草稿与只读权限，保持手动发帖），以及通话纪要工具 Granola。CRM（如 HubSpot、Attio）、供 Product Bot 联动工程的 GitHub、用于现金核对的 Stripe 或 Mercury，以及用于实时联动的 Zapier 或 Make 等 Webhooks，均可在后续按需接入。

##### 映射创始人销售的六步旅程

这套架构直接映射了初创团队在招募首位专职销售之前必须经历的 6 个关键业务阶段：

1. **明确 ICP（Define your ICP）**：明确谁能从产品中获得真正价值、分布在何处，并清晰区分出谁是掏钱的经济买家（economic buyer），谁是日常承受业务痛点的人（who feels the pain）。
2. **寻找设计伙伴（Find design partners）**：将 ICP 转化为一份精准的目标客户短名单，并在人脉网络与历史互动中寻找温和破冰路径（warm paths in）。
3. **准备首次会谈（Prep for first meetings）**：提前深入调研目标账户背景，进行沟通排练，并规划好关键的需求挖掘（discovery）框架。
4. **沉淀首套销售剧本（Build your first playbook）**：把早期的面对面沟通动作打磨成一套可重复、并最终能够交接给新销售的标准化动作机制。
5. **推进交易管道与预测（Run pipeline and forecasting）**：持续推进商机走向，看清究竟是哪些因素在实际驱动收入增长。
6. **驱动产品持续迭代（Make your product better）**：把从一线收集到的客户与产品反馈，转化为新功能研发优先级的直接依据。

整个架构包含 1 位幕僚长与 8 位专职专家：

##### 1. 总控中枢：Founder Mode（幕僚长 Bot）

这是创始人**日常唯一需要直接打交道**的 Bot。它负责统领全局：

- **每天早晨 8:00**：把其他 8 个 Bot 夜间运行产出的所有半成品合并，生成一份唯一的「每日行动清单（Daily Action List）」。
- **每周一**：对照实际入账收入（incoming revenue）进行核对。
- **每周五**：输出整周交易管道进展与赢单/输单分析摘要（Win/Loss Digest）。
- **每月一次**：起草投资人月度更新信草稿（需经创始人批准），并结合市场反馈提出 ICP（理想客户画像）的调整提议。
- **全局熔断机制**：任何系统监测到的 P0 级严重客诉与紧急 Bug，会直接绕过批处理，第一时间呈报到这里。

##### 2. Pipeline 文件夹：交易推进组

- **Sell Bot（销售现场会谈与跟进）**：专注于正在进行的真实商机。开会前，它从日历、Granola 通话录音和利益相关者地图中提炼出 1 页「会前简报」；会议结束后几分钟内，自动在草稿箱拟好会议纪要、针对性跟进邮件，并向创始人提出 CRM 阶段（Stage）变更建议。**核心红线：方案报价、定价变动和合同条款，严禁擅自决断**。
- **Outreach Bot（外拓触达）**：每天清晨 7:00 暂存当天的外拓触达批次：包含冷邮件、按作者所称“5 至 6 天的跟进节奏”安排，并在约 8 次触达后停止（原文未给出逐次间隔表），以及针对每个潜在客户成对起草的 LinkedIn 留言。运行前它会先读取交易跟踪表（Deal Tracker），自动排除处于活跃交易中或标记为免打扰的对象；温线索则来自 Social Bot。整批草稿全部等待创始人审批，绝不自动外发。

🔒 MEMBERS ONLY

### 后面约 8 分钟，是会员的。

免费部分到这里。墙内还有：

约 8 分钟正文
🔓 380 篇存量深度 / 研究解读全文一并解锁🎧 全部播客音频 + 私有播客源⧉ 全文 Markdown 导出
🔥 创始 100 席已售罄 · 350+ 位会员在读

[解锁全站 $59/年](https://best.xiaohu.ai/buy/?plan=year&slug=grok-bot-for-founder-led-sales)
[先读这篇 $1.99](https://best.xiaohu.ai/buy/?plan=single&slug=grok-bot-for-founder-led-sales)
[按月 $6.99](https://best.xiaohu.ai/buy/?plan=monthly&slug=grok-bot-for-founder-led-sales)

单篇费用 30 天内升年卡可全额抵扣（回复收据邮件即可）

[已是会员？邮箱登录 →](https://best.xiaohu.ai/login/?next=%2Farticle%2Fgrok-bot-for-founder-led-sales%2F)
美元结算 · 年卡 / 单篇支持支付宝、微信；月卡需银行卡 · 年付 7 天不满意全额退。

暂时不开会员？

留个邮箱，新解读第一时间发你。确认订阅后，我把**这篇的一页纸**一起发过去。

[全部订阅方式（RSS / Telegram / 播客）→](https://best.xiaohu.ai/subscribe/)

↑ 正文结束

[阅读原文 ↗](https://x.ai/bot/guides/grok-bot-for-founder-led-sales)

### 相关解读

[AI 实操 Grok Bot 多项目指南：一个频道、一组成员和两层 Notion 看板 10-10 · 约 8 分钟](https://best.xiaohu.ai/article/how-i-run-multiple-teams-of-grok-bots/)[AI 实操 Grok Bot 日常办公指南：让四个 Bot 管好消息、日历与工作情报 10-10 · 约 12 分钟](https://best.xiaohu.ai/article/grok-bot-for-work/)[AI 实操 Grok Bot SDR 指南：Cursor 写调研与草稿，Bot 做查重与待发分流 10-10 · 约 12 分钟](https://best.xiaohu.ai/article/grok-bot-for-sdrs/)
