---
title: "Meta 推出 Muse Wonder 前沿系列模型：主动记忆，遇阻换方法继续推进，Agent 编程媲美 Opus 5.5"
date: 2026-10-13T00:00:00.000Z
tags: ["洞察", "Meta", "Muse", "Agent", "记忆", "模型评测", "聚合"]
summary: "跨会话记住背景，遇到变化接着推进任务；用对应评测和官方演示，看清两款模型的能力与差别。"
---
> **原文链接**: [https://research.meta.ai/blog/muse-wonder](https://research.meta.ai/blog/muse-wonder)
> **来源**: Meta Superintelligence Labs
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/meta-muse-wonder/) · 2026/10/13
> **说明**: 本文由 AIHot 自动聚合(原文即中文,未翻译)。正文取自小互 AI 解读

---

**已核对**Meta Superintelligence Labs10-13 · 约 10 分钟

Meta 推出了 **Muse Wonder** 前沿系列模型。本次发布包含 **Muse Wonder** 与能力更强的 **Muse Wonder Full** 两款主力模型。两款模型拥有 100 万 token 的推理上下文窗口，支持文本、图像、音频与视频的多模态输入，输出则为纯文本，并在千兆瓦级规模的 Prometheus 数据中心完成训练。

主要功能特点包括：

- **Active Memory（主动记忆）**：跨会话保留重要背景，新任务中找回相关信息，并识别事实更新。
- **Active Focus（持续推进）**：遇到阻碍调整方案，跟进多步骤任务，必要时提问、重要操作前确认。
- **专业领域知识（Domain Expertise）**：结合合同、财报和健康资料，分析问题并起草供审阅的文件。
- **持续软件开发（Frontier Coding）**：跟踪需求、跨文件修改代码，反复测试和修错，支持长期项目。

Meta 将它定位为迈向“个人超级智能”的一步：让 AI 结合个人背景，持续完成生活事务和专业工作。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/meta-muse-wonder/hero-bilingual-e7313ce3b2eb.mp4)

研究员介绍：主动记忆与持续推进

### 两个版本，现在分别在哪里用？

- **现在**：Muse Wonder 可通过 [Meta Model API](https://dev.meta.ai/) 和 [Muse Code](https://dev.meta.ai/code) 使用；Full 仅向 Muse Code 订阅用户开放。
- **后续**：Wonder 将接入 [Muse](https://muse.ai/)，订阅用户优先，用于生成交互应用等需要更强智能的功能。Meta 还计划基于它开发面向全体 Muse 用户的专用模型。

[延伸阅读 · Muse 的运行环境 Meta 推出个人 AI Agent Muse：每人一台云端电脑，可持续在后台推进任务 了解模型如何与云端电脑、后台任务和独立权限系统配合。 阅读介绍文章 →](https://best.xiaohu.ai/article/muse-personal-ai-agent/)

### 四项能力，分别解决什么问题？

长期任务需要把前面的背景、执行中的变化和最后的结果连起来。记住要求只是起点，过程中还要调整做法，交付前再检查是否做对。

#### 1. 主动记忆：记住背景，按新要求更新

每次办新事情都重新交代背景，会让助理很难用。Active Memory 会跨会话保留重要信息，在相关任务出现时主动找回，并识别更新。例如，规划出差时沿用你说过的出行偏好，要求改变后采用新条件。

100 万 token 上下文对应一次推理能处理的材料量。跨会话记忆还要把有用背景带到后续会话，在需要时调取。

Meta 内部的 **MemoryBench** 用 64K–100K token 的长对话，加入无关谈话、冲突事实和后续更正，再由大模型按加权标准评分，检验模型能否从混杂信息中找回有效细节、识别事实更新。

| 评测与指标 | Full | Wonder | Opus 5.5 | Astra | Fable 5.1 |
| --- | --- | --- | --- | --- | --- |
| MemoryBench：记忆加权得分（%） | 85.5 | **85.6** | 81.5 | 81.4 | 79.0 |

两款模型得分接近，且都高于所列对照，长对话记忆是共同强项。

![MemoryBench：长对话中的记忆表现。普通 Wonder 为 85.6%，Full 为 85.5%，是加权评分](https://best.xiaohu.ai/media/meta-muse-wonder/memorybench-light-v2.webp)

MemoryBench：长对话记忆得分

#### 2. 持续推进：遇到阻碍，换方法接着做

任务做到一半，工具可能报错，资料可能缺失，用户也可能改变要求。Active Focus 会围绕目标尝试替代方案，根据新信息调整后续步骤；关键条件不明确时向用户提问，重要操作前先确认。计划需要随着执行结果更新，才能把任务继续推进。

**FocusBench** 是 Meta 内部的动态场景测试，覆盖住房、旅行、IT、金融等领域，考察受阻后的坚持与调整。**AutomationBench-AA** 则在模拟业务应用中检查最终状态，所有检查都通过才算一次成功。前者看能否应对变化，后者看整个流程是否做对。

| 评测与指标 | Full | Wonder | Opus 5.5 | Astra | Fable 5.1 |
| --- | --- | --- | --- | --- | --- |
| FocusBench：持续推进得分（%） | **54.2** | 44.9 | 45.8 | 47.7 | 36.6 |
| AutomationBench-AA：完整流程通过率（%） | **45.4** | 39.1 | 41.2 | 41.6 | 32.1 |

Full 在两项中领先所列对照，比普通版分别高出 9.3 和 6.3 个百分点；普通版低于 Astra 和 Opus。与记忆得分接近相比，持续执行是 Full 更明显的提升所在。但 AutomationBench 的完整通过率仍为 45.4%，未达到半数。

![FocusBench：动态阻碍下的持续执行。Full 为 54.2%，普通 Wonder 为 44.9%，是 Meta 内部测试](https://best.xiaohu.ai/media/meta-muse-wonder/focusbench-light-v1.webp)

FocusBench：持续推进得分

![AutomationBench-AA：所有终态检查通过的工作流比例，Full 为 45.4%，Wonder 为 39.1%](https://best.xiaohu.ai/media/meta-muse-wonder/automationbench-aa-light-v3.webp)

AutomationBench-AA：完整流程通过率

实际操作软件，还需要看 **OSWorld 2.1**。模型在 Ubuntu 桌面虚拟机中，通过截图、点击、输入和滚动完成 108 项工作流，分别报告部分得分与完整完成率。

| 评测与指标 | Full | Wonder | Opus 5.5 | Astra | Fable 5.1 |
| --- | --- | --- | --- | --- | --- |
| OSWorld 2.1：桌面任务部分得分（%） | 78.4 | 72.6 | **81.8** | 75.8 | 80.7 |
| OSWorld 2.1：桌面任务完整完成率（%） | 39.4 | 34.3 | — | 34.3 | **43.1** |

部分做对也能得到分数，完整完成率只算整个任务达标。Full 的两项成绩分别为 78.4% 和 39.4%；Opus、Fable 的部分得分更高，Fable 的完整完成率也更高。

#### 3. 专业知识：读懂材料，完成专业任务

Domain Expertise 用于处理合同、财报和健康资料：结合原始文件找依据，再按要求分析或起草成果。法律、金融和健康任务的要求不同，评测也分别进行。

**法律：Harvey LAB-AA 1.1。** 模型根据案件材料生成法律成果，评审系统逐项检查任务要求与编造信息问题，全部达标才算成功。

| 评测与指标 | Full | Wonder | Opus 5.5 | Astra | Fable 5.1 |
| --- | --- | --- | --- | --- | --- |
| Harvey LAB-AA：法律文件全部达标率（%） | **13.1** | 10.0 | 4.2 | 8.6 | 6.4 |

两款模型领先所列对照，但 Full 的通过率仍是 13.1%，大多数成果未同时满足全部标准。

![Harvey LAB-AA：法律交付物须满足全部标准并通过幻觉检查，Full 的通过率为 13.1%](https://best.xiaohu.ai/media/meta-muse-wonder/harvey-lab-aa-light-v1.webp)

Harvey LAB-AA：法律文书通过率

**金融：Vals Finance Agent V2。** 模型结合财报和市场资料完成分析，在 Vals AI 私有测试集上计算准确率。

| 评测与指标 | Full | Wonder | Opus 5.5 | Astra | Fable 5.1 |
| --- | --- | --- | --- | --- | --- |
| Vals Finance Agent V2：金融准确率（%） | **59.1** | 56.6 | 58.6 | 53.5 | 58.9 |

Full 比 Fable 高 0.2 个百分点，与 Opus 的成绩也接近，优势很小。普通版的成绩低于这三款模型。

![Vals Finance Agent V2：金融分析任务。Full 为 59.1%，普通 Wonder 为 56.6%](https://best.xiaohu.ai/media/meta-muse-wonder/vals-finance-agent-v2-light-v1.webp)

Vals Finance Agent V2：金融分析准确率

**健康：HealthBench Pro。** 模型不调用外部工具，回答 525 道专业健康问题，由大模型按医生制定的标准评分，并按回答长度调整。

| 评测与指标 | Full | Wonder | Opus 5.5 | Astra | Fable 5.1 |
| --- | --- | --- | --- | --- | --- |
| HealthBench Pro：健康回答加权得分（%） | 62.3 | 60.5 | **65.6** | 65.3 | 62.1 |

两款 Wonder 都低于 Opus 和 Astra，健康问答尚未领先。

#### 4. Agent 编程：跨文件修改，反复测试和修错

软件开发需要持续跟踪需求，理解代码库，修改相互依赖的文件，再用测试检查新功能和已有行为，根据报错继续修复。Frontier Coding 将记忆、专业知识和持续推进用到这一过程。Meta 用多样、长期开发任务训练两款模型，支持从小应用到复杂软件的持续开发。

**DeepSWE 1.1** 覆盖 91 个仓库、5 种语言的 113 个任务，用功能和回归测试判断一次尝试是否成功。**SWE-Marathon** 则让模型完成较大的软件项目，再运行项目测试检查成果。

| 评测与指标 | Full | Wonder | Opus 5.5 | Astra | Fable 5.1 |
| --- | --- | --- | --- | --- | --- |
| DeepSWE 1.1：开发任务通过率（%） | **79.0** | 78.8 | 74.2 | 74.1 | 67.4 |
| SWE-Marathon：长期项目通过率（%） | **57.5** | 53.1 | 46.3 | 42.5 | 45.6 |

两款模型在这两项长期项目评测中，得分均高于 Opus 5.5 和 Astra。DeepSWE 上两者只差 0.2 个百分点，SWE-Marathon 上 Full 高出普通版 4.4 个百分点。

SWE-Marathon 中，Full 使用 xhigh 推理档位，Astra 和 Fable 分别使用 Codex、Claude Code 等 Agent 环境。多数其他结果采用 max 推理档位。

![DeepSWE：长流程代码任务，Full 为 79.0%，普通 Wonder 为 78.8%](https://best.xiaohu.ai/media/meta-muse-wonder/deep-swe-light-v3.webp)

DeepSWE：长期开发任务通过率

![SWE-Marathon：超长流程软件工程。Full 使用 xhigh，各对照的 Agent 环境不同](https://best.xiaohu.ai/media/meta-muse-wonder/swe-marathon-light-v3.webp)

SWE-Marathon：长期项目通过率

其他工程任务的表现有所不同。**Terminal-Bench 4.0** 在隔离终端中检查最终环境状态；**ProgramBench** 要模型在不能联网的环境中重建完整程序，每次尝试通过至少 95% 的隐藏行为测试才算达标。

| 评测与指标 | Full | Wonder | Opus 5.5 | Astra | Fable 5.1 |
| --- | --- | --- | --- | --- | --- |
| Terminal-Bench 4.0：终端任务准确率（%） | 57.1 | 52.0 | **59.6** | 59.1 | 52.0 |
| ProgramBench：程序重建达标率（%） | 59.0 | 50.0 | **70.5** | 52.5 | 55.5 |

终端任务中，Opus 和 Astra 高于 Full；程序重建中，Opus 的 70.5% 明显高于 Full 的 59.0%。

官方厨房演示把这种开发能力用到了一个小应用：根据可定制的图片输入，编写代码，生成可游玩的 **3D 厨房小游戏**。模型原生输出是文本，游戏由生成的代码交给运行环境执行。

3D 厨房游戏 · [打开原始演示 ↗](https://research.meta.ai/artifacts/introducing-muse-wonder/kitchen-game/v6/index.html)

#### 综合评测：两种指标为什么排名不同？

综合指标把多项任务的表现汇总起来。Meta 内部的 **Personal Superintelligence Index（PSI）** 包含 7 项个人与知识工作评测，涵盖持续执行、业务流程、职业任务、浏览和研究。第三方 **Artificial Analysis 综合智能指数** 则汇集另一组工作、编程、科学与通用推理测试。

| 评测与指标 | Full | Wonder | Opus 5.5 | Astra | Fable 5.1 |
| --- | --- | --- | --- | --- | --- |
| PSI：个人与知识工作综合指标 | **59.1** | 54.3 | 55.2 | 54.5 | 49.9 |
| AA 综合智能指数（分） | 56 | 52 | **58** | 53 | 53 |

Full 在 PSI 中领先，在 AA 综合指数中低于 Opus。两种排名并不矛盾：任务选取和汇总方式不同，衡量的侧重点也不同。

![Meta 内部的 Personal Superintelligence Index 原图](https://best.xiaohu.ai/media/meta-muse-wonder/personal-superintelligence-index-light-v2.webp)

PSI：个人任务综合指标

![Artificial Analysis 综合智能指数：Full 为 56 分，Wonder 为 52 分，Opus 5.5 为 58 分](https://best.xiaohu.ai/media/meta-muse-wonder/aa-intelligence-index-light-v5.webp)

AA 综合智能指数

![官方评测总表：各行任务和计分方式不同，OSWorld 的部分奖励与完整成功率分别列出](https://best.xiaohu.ai/media/meta-muse-wonder/muse-evaluation-table-light-v6.webp)

官方评测总表

### 遇到陌生任务，能否灵活应对？

固定测试覆盖有限任务，现实中的目标、工具和要求却不断变化。两个模型的常用测试分数接近，遇到陌生任务时仍可能表现不同。“Benchmaxxing”讨论的正是这种差距：针对固定测试优化，未必能带来同样的现实适应能力。

Meta 对比 Muse Spark 1.3 与 Wonder Full，增加推理时的计算投入，观察它们在后训练未专门针对的任务上表现如何。

#### 怎样看这两条线？

深蓝是 Wonder Full，浅蓝是 Spark 1.3。原图比较两款模型在不同任务上的表现。

![Meta 原始泛化图：横轴是后训练重点任务表现，纵轴是未专门后训练任务表现；Wonder Full轨迹位于Spark 1.3上方。](https://best.xiaohu.ai/media/meta-muse-wonder/ttc-controlled-iid-ood-scaling-light-v5.webp)

圆点代表不同推理投入，虚线表示趋势。

选择上方按钮，看横轴、纵轴和两条线的差距。

图中横轴是后训练重点优化的任务成绩，纵轴是后训练未专门针对的任务成绩，每个点对应一种推理投入。两条轨迹都随投入增加而上升；横轴成绩相近时，Wonder Full 的纵轴更高，即它在这组未针对任务上表现更好。

Meta 将提升归因于更大、更强的基础模型，使后训练获得的能力更容易迁移。

个人 Agent 会遇到不同日程、偏好、工具和临时变化形成的新组合，训练无法逐一预设，需要把已有能力用到这些组合中，处理新的需求。

### 应用演示：从个人资料到具体结果

官方演示让模型调取个人资料，通过浏览器与应用交付路线、订单、座位图或跟进邮件。任务中的偏好、约束和变化，分别用到了前面的记忆、执行与专业理解能力。

#### 跑步：结合健康习惯和日程规划路线

规划周六长跑时，模型从日历和健康记录中找到三项要求：长跑每周增加 1 公里、走平路保护膝盖、10 点前到图书馆。它据此安排 8 点出发的 15.1 公里路线，在基于 OpenStreetMap 数据的地图上每隔 5 公里加标记，生成分享链接，再把带链接的跑步安排写入日历。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/meta-muse-wonder/marathon-planning-bilingual-d94abccd4778.mp4)

跑步规划：结合日程与健康记录

#### 礼品：用猫的照片设计 T 恤并下单

用户想给猫 Coco 做生日 T 恤。模型浏览 Coco 的 Instagram 主页，选取真实照片，按偏好设计带金色“COCO”字样的复古乐队风 T 恤，再进入结算、完成订单确认。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/meta-muse-wonder/swag-business-bilingual-278cde510e15.mp4)

定制礼品：从照片到生日 T 恤

#### 婚礼：按宾客要求排座，逐项检查

用户提供 47 位宾客名单，备注无障碍需求、过敏情况和哪些人要分开。模型查看场地布局，把备注转成规则，按这些规则在规划工具里逐桌安排，最后重新对照原始要求逐项检查并导出座位图。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/meta-muse-wonder/wedding-bilingual-b438f1062c3c.mp4)

婚礼排座：按宾客要求生成方案

#### 保险：从核对账单到邮件跟进

用户上传门诊账单和保险卡正反面照片。模型对照材料，解释收费问题及保险为何未被应用，提出方案并拟好与诊所账单部门沟通的电话要点。用户希望改用文字跟进，它便调整为起草并发送邮件，最终由诊所账单部门向保险公司提交理赔。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/meta-muse-wonder/insurance-claim-bilingual-16319a3c0e45.mp4)

保险账单：识别问题并跟进理赔

#### 健康：把旅行与症状线索联系起来

模型从日历、消息和邮件中找旅行与症状线索，在连接 Withings、HealthEx 等健康服务前请求许可，再联系海拔和症状出现的时间，帮助用户理解情况。

旅途中的健康资料辅助 · [打开原始演示 ↗](https://research.meta.ai/artifacts/introducing-muse-wonder/health-advice/v6/index.html)

### 能代办，也要管好权限

个人 Agent 处理邮件、日程和私密资料时，可能读到夹带恶意指令的外部内容。在 Meta 测试中，Full 的个人信息处理违规率为 2.2%，诱导越权执行代码的攻击成功率为 10.7%。付款、外发信息、修改或删除数据等操作，仍需要系统权限限制与必要确认。

![私人信息处理违规率：Full 为 2.2%，Wonder 为 3.4%，越低越好](https://best.xiaohu.ai/media/meta-muse-wonder/discretion-failure-light-v2.webp)

个人信息处理违规率

![未经授权执行代码的攻击成功率：Wonder 为 10.5%，Full 为 10.7%，越低越好](https://best.xiaohu.ai/media/meta-muse-wonder/unauthorized-code-execution-light-v2.webp)

越权执行代码的攻击成功率

Meta 强化了对化学、生物、放射性、核风险及网络滥用请求的拒答，也保留合规网络防御能力。Full 在 BioTIER 英文测试中的高风险生物请求拒答率为 98.7%，合规网络防御任务配合率为 93.3%，分别衡量拒绝危险用途和帮助正当防御。

![BioTIER 高风险生物请求的拒答率](https://best.xiaohu.ai/media/meta-muse-wonder/bioweapon-refusal-light-v2.webp)

BioTIER：生物高风险请求拒答率

![恶意网络请求的拒答率](https://best.xiaohu.ai/media/meta-muse-wonder/cyber-misuse-refusal-light-v2.webp)

恶意网络请求拒答率

![合规网络防御请求的配合率](https://best.xiaohu.ai/media/meta-muse-wonder/cyber-defense-compliance-light-v3.webp)

合规网络防御请求配合率

依据 Meta 的[超级智能扩展框架](https://research.meta.ai/static/meta-superintelligence-scaling-framework)，未采取缓解措施时，无法排除 Full 在化学与生物领域达到高风险阈值；加入安全后训练和系统级分类器后，Meta 将各领域的剩余风险评为“中度或更低”。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/meta-muse-wonder/model-overview-bilingual-fd3a9ee06369.mp4)

概念视频：持续推进个人目标

来源Muse Wonder: A Frontier Model For Personal & Professional AI AgentsMeta Superintelligence Labs·[查看主材料](https://research.meta.ai/blog/muse-wonder)延伸[Muse Wonder Model Card](https://research.meta.ai/static/muse-wonder-model-card)

Meta Muse Wonder 深度解读

## Meta 推出 Muse Wonder 前沿系列模型：主动记忆，遇阻换方法继续推进，Agent 编程媲美 Opus 5.5

涵盖基础版 Wonder 与能力更强的 Full。两款模型具备 100 万 token 推理窗口与多模态输入，长对话记忆得分接近；Full 版更明显的提升在于遭遇阻碍时持续推进任务与长流程 Agent 编程。

**规格：**100万 token 推理窗口
**模态：**文本/图像/音频/视频输入，纯文本输出
**训练：**千兆瓦级 Prometheus 数据中心
**入口：**API / Muse Code（Full 需订阅）；后续接入 Muse

核心对照：长对话记忆接近，Full 在遇阻推进上拉开显著差距

100 万 token 是一次推理能处理的材料量。Active Memory 会跨会话保留重要背景，在新任务中找回相关信息并识别更新。MemoryBench 用 64K–100K token 长对话、干扰与事实更正来检验信息使用；两款模型在记忆测试中的成绩接近。

| 评测场景与考察重点 | Full | Wonder | Opus 5.5 |
| --- | --- | --- | --- |
| **MemoryBench**（长对话加权记忆） | 85.5% | 85.6% | 81.5% |
| **FocusBench**（受阻调整与坚持） | 54.2% | 44.9% | 45.8% |
| **AutomationBench-AA**（业务终态全通过） | 45.4% | 39.1% | 41.2% |
| **OSWorld 2.1**（桌面端虚拟机操作） | 78.4% / 39.4% | 72.6% / 34.3% | 81.8% / — |

Active Focus 围绕目标尝试替代方案，根据新信息调整步骤；缺少关键条件时提问，重要操作前确认。Full 比普通版在 FocusBench 高 9.3 个百分点、AutomationBench 高 6.3 个百分点，后者要求全部终态检查通过，Full 的通过率仍为 45.4%。OSWorld 两个数依次为部分得分与完整完成率；Fable 为 80.7% / 43.1%，均高于 Full。

Agent 编程评测：对标 Opus 5.5
Frontier Coding

跟踪需求、跨文件修改代码，反复运行测试并按报错修复。

DeepSWE 1.1（长流程开发通过率）
Full 79.0% / Wonder 78.8% (Opus 74.2%)

SWE-Marathon（大型长期项目）
Full 57.5% / Wonder 53.1% (Opus 46.3%)

Terminal-Bench 4.0（隔离终端准确率）
Full 57.1% < Opus 59.6% (Wonder 52.0%)

ProgramBench（离线完整程序重建）
Full 59.0% < Opus 70.5% (Wonder 50.0%)

两款在长期项目（DeepSWE 与 SWE-Marathon）上均高于 Opus 5.5；但在终端操作与程序重建任务中 Opus 仍具明显优势。（SWE-Marathon 中 Full 采用 xhigh 档位，各对照 Agent 环境略有不同）。

法律、金融和健康评测
Domain Expertise

Harvey LAB-AA 1.1（法律文件全达标）
Full 13.1% / Wonder 10.0% (Opus 4.2%)

Vals Finance Agent V2（金融分析）
Full 59.1% / Wonder 56.6%，Fable 58.9% (Opus 58.6%)

HealthBench Pro（健康回答加权分）
Full 62.3% / Wonder 60.5% < Opus 65.6% (Astra 65.3%)

法律任务在严查与防幻觉下虽领先但通过率仅 13.1%；金融任务对 Fable 与 Opus 仅微弱优势；健康领域问答尚未领先，低于 Opus 与 Astra。

真实落地案例：从个人背景到可交付结果

跑步：日程与健康规划

提取“每周增 1km、走平路保护膝盖、10 点前到图书馆”三项要求，规划 8 点出发的 15.1km 路线，在地图上每 5km 标记并写入日历。

保险：按沟通偏好调整跟进

核对门诊账单和保险卡，解释收费问题；用户希望把电话跟进改为文字，模型转而起草、发送邮件，最终由诊所账单部门提交理赔。

婚礼：47 人约束排座与复核

将无障碍、食物过敏及分开就座等备注转为规划规则，在工具中逐桌安排，最终重新对照原始名单逐项复核后导出座位图。

礼品定制与轻代码小游戏

浏览猫 Coco 的照片定制金色文字复古 T 恤并完成结算下单；根据图片输入生成代码，交由环境运行 3D 厨房小游戏。

健康演示从日历、消息、邮件串联旅行与症状线索，连接 Withings、HealthEx 等健康服务前先请求许可。

陌生任务（OOD）迁移与综合指标解析

Meta 对比 Wonder Full 与 Spark 1.3：在后训练重点优化任务的成绩相近时，Full 在后训练未专门针对的任务上得分更高。Meta 将提升归因于更大、更强的基础模型，更容易迁移已有能力。PSI 汇总 7 项个人与知识工作评测，Full 为 59.1、Opus 为 55.2；AA 综合智能指数中 Full 为 56 分、Opus 为 58 分。排名不同，来自测试组合与汇总方式的差别。

权限底线与系统防线
安全基准

代办任务深度接管邮件、日程与私密数据时易接触夹带恶意指令的外部内容。Meta 评测显示，Full 的**个人信息处理违规率为 2.2%**，**诱导越权执行代码的攻击成功率为 10.7%**。付款、外发信息、修改或删除关键数据等操作，需要系统级权限限制与必要确认。在危险用途防御上，Full 在 BioTIER 英文高风险生物请求拒答率达到 98.7%，对恶意网络利用严格拦截，合规网络防御配合率为 93.3%。

↑ 正文结束
✓ 本篇全文免费开放

会员可复制、下载全文 Markdown，并解锁更多深度内容与播客。
[订年卡 $59/年](https://best.xiaohu.ai/buy/?plan=year)[看权益对比 →](https://best.xiaohu.ai/membership/)

[阅读原文 ↗](https://research.meta.ai/blog/muse-wonder)

📮 新解读第一时间进邮箱

读完觉得有用？留个邮箱，每篇新解读发布就送达，随时退订。

### 相关解读

[产品发布 Meta 发布 Muse Spark 1.1 模型，在多个代理评估中，媲美 GPT-5.5 和 Opus 4.8 07-09 · 10 分钟](https://best.xiaohu.ai/article/muse-spark-1-1-api/)[产品发布 Meta 发布 Muse Image：生图会自己查资料、自己纠错，评分排全球第二 07-08 · 7 分钟](https://best.xiaohu.ai/article/meta-muse-image-video/)[深度 SpaceXAI 团队分享构建 Grok Bot 的工程经验：涉及分布式系统设计、操作安全策略与上下文工程取舍 10-12 ·](https://best.xiaohu.ai/article/stanford-always-on-agents/)
