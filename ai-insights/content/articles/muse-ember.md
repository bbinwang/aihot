---
title: "单次任务 0.14 美元：Meta 发布最小多模态模型 Muse Ember，三分之一成本追平 Haiku 5.5"
date: 2026-11-10T00:00:00.000Z
tags: ["产品发布", "Meta", "Muse Ember", "AI Agent", "多模态模型", "聚合"]
summary: "首款由旗舰模型 Muse Wonder Full 训练的轻量级多模态模型，单次任务成本约 0.14 美元，比 Muse Spark 1.3 便宜约 17 倍，专为 Agent 高频调用工具、编程子任务与百万 token 长文档解析打造。"
---
> **原文链接**: [https://research.meta.ai/blog/muse-ember](https://research.meta.ai/blog/muse-ember)
> **来源**: research.meta.ai
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/muse-ember/) · 2026/11/10
> **说明**: 本文由 AIHot汪 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

## 隆重推出我们最小、最高效的模型：Muse Ember
- 作者： Meta AI Research
- 日期： 2026-11-09T00:00:00.000Z
- 来源： https://research.meta.ai/blog/muse-ember
- 摘要： Muse Ember 是我们最小、最高效的模型，专为复杂推理执行以及 Agent 全天不断重复的工作而设计。
---
隆重推出我们最小、最高效的模型：Muse Ember
2026年11月9日
·
阅读时长 4 分钟

今天，我们推出 Muse Ember——我们最小、最高效的模型，专为复杂推理执行以及 Agent 全天不断重复的工作而设计：tool call、编码子任务、路由、信息提取和长文档解析。

在任何 reasoning 设置下，Muse Ember 每一美元所提供的智能都超过 Claude Haiku 5.5 或 GPT-6 Luna:它以大约三分之一的成本达到 Haiku 的最佳分数，并超越 Luna 的所有设置。它还位于完整 Artificial Analysis 排行榜的效率前沿：没有任何模型能以更低的每任务成本获得更高分数。

智能 vs. 每任务成本

基于 Artificial Analysis 的原始结果，在各 reasoning effort 级别下，Artificial Analysis Intelligence Index 与每任务成本的对比。Muse Ember 成本为按拟议定价的估算值。

智能 vs. 每任务成本
$0.00
$0.10
$0.20
$0.30
$0.40
15
20
25
30
35
40
每任务成本(USD)
Artificial Analysis Intelligence Index
xhigh
max
medium
high
xhigh
max
high
xhigh
max
Muse Ember
Claude Haiku 5.5
GPT-6 Luna
xhigh
max
medium
high
xhigh
max
high
xhigh
max
Muse Ember
Claude Haiku 5.5
GPT-6 Luna
智能 vs. 每任务成本：智能 vs. 每任务成本
系列	测量项	数值
Muse Ember	每任务成本(USD)	$0.116
Muse Ember	分数	33.9
Muse Ember	每任务成本(USD)	$0.136
Muse Ember	分数	35.8
Claude Haiku 5.5	每任务成本(USD)	$0.092
Claude Haiku 5.5	分数	24.6
Claude Haiku 5.5	每任务成本(USD)	$0.159
Claude Haiku 5.5	分数	29.6
Claude Haiku 5.5	每任务成本(USD)	$0.248
Claude Haiku 5.5	分数	34.3
Claude Haiku 5.5	每任务成本(USD)	$0.411
Claude Haiku 5.5	分数	36.2
GPT-6 Luna	每任务成本(USD)	$0.073
GPT-6 Luna	分数	21.4
GPT-6 Luna	每任务成本(USD)	$0.104
GPT-6 Luna	分数	23.3
GPT-6 Luna	每任务成本(USD)	$0.152
GPT-6 Luna	分数	27.8

Artificial Analysis | 2026年11月9日。每个数据点代表一个 reasoning effort 设置。Muse Ember 成本按官方标价计算。

Muse Ember 评估结果
Muse Ember 评估结果：评估结果
	
精选模型。
Muse Ember (max)	Claude Haiku 5.5 (max)	GPT-6 Luna (max)

Agent
	
AutomationBench-AA
端到端业务流程
	
最佳结果。
37.8	13.9	20.2

Agents' Last Exam
端到端 Agent 任务
	
最佳结果。
61.6	57.0	57.1

Personal Superintelligence Index
面向个人与知识工作的内部综合指数
	
最佳结果。
46.8	36.1	37.0

编码
	
Terminal-Bench 4.0
Agentic 终端编码，已发布的最佳 harness
	
最佳结果。
40.9	39.2	16.4

Coding Agent Index-AA
在真实 Agent harness 中进行编码
	
最佳结果。
46	37	31

FrontierCode 2.0-AA
以 mergeability 评判的真实工程任务
	27.2	
最佳结果。
34.9	25.2

多模态
	
GDP.pdf-AA
长文档上的专业工作
	
最佳结果。
22.8	20.8	
最佳结果。
22.8

OSWorld 2.1
跨桌面应用的 computer use
	
最佳结果。
69.5
(partial)
33.8
(binary)
	68.9
(partial)
27.8
(binary)
	50.5
(partial)
17.0
(binary)


PerceptionBench (w/ tools)
细粒度视觉感知
	
最佳结果。
80.6	78.6	62.8

通用
	
Artificial Analysis Index
	
最佳结果。
36	
最佳结果。
36	28

有关我们评估的更多细节，请参阅我们的报告。

Muse Ember 即日起可通过 Meta Model API 使用，定价为每百万输入 token $0.10、每百万输出 token $0.50。

在早期测试中，我们的合作伙伴让 Muse Ember 承担 Agent 全天不断重复的那类任务，从审查合同到编写代码。

Box
Cline
Oracle
Cloudflare
You.com
上一张
下一张

“在 Box AI Complex Work Eval 上，Muse Ember 展现了令人瞩目的准确性、速度与 token 效率。它可以对照公司的谈判手册逐条为合同评分，得出正确的整体风险评级；也可以根据详细的职位简报筛选候选人，并标出那些仍够格作为备选的边缘人选。对于在企业内容上开展真实工作的 Agent 而言，Muse Ember 是一个快速而高效的基础。”

作者
YASHODHA BHAVNANI
职位
AI 产品副总裁
公司
Box

“看到 Meta 发布一款轻量级模型，让那些需要快速、低成本且可靠模型的开发者受益，也让通过在其 harness 中将其作为 subagent 运行来削减成本的团队受益，这实在令人惊叹。Muse Ember 是专为 subagent 工作而打造，并在编码和文档分析等 subagent 任务中表现出色。”

作者
SAOUD RIZWAN
职位
创始人
公司
Cline

目录

Agent
编码
多模态
安全
可用性
Agent

Agent 的大部分 token 都消耗在许多细小的结构化步骤上，而 Muse Ember 正是为此而打造。它可以端到端地执行完整的业务工作流：拉取记录、按顺序调用工具，并跨应用更新系统。

凭借 1M token 的上下文窗口和高达 512K 的输出 token,它可以在单次调用中读取完整的代码库或文档集。

AutomationBench-AA

max reasoning 下的 AutomationBench-AA 结果，复现自文档当前图表。分数

AutomationBench-AA
Muse Ember(max)
GPT-6 Luna(max)
ClaudeHaiku 5.5(max)
0%
10%
20%
30%
40%
分数
37.8%
20.2%
13.9%
AutomationBench-AA: AutomationBench-AA
系列	度量	数值
Muse Ember (max)	模型	Muse Ember (max)
Muse Ember (max)	分数	37.8%
GPT-6 Luna (max)	模型	GPT-6 Luna (max)
GPT-6 Luna (max)	分数	20.2%
Claude Haiku 5.5 (max)	模型	Claude Haiku 5.5 (max)
Claude Haiku 5.5 (max)	分数	13.9%

Artificial Analysis | 2026 年 11 月 9 日。Strict pass@1。

Agents‘ Last Exam

max reasoning 下的 Agents’ Last Exam 结果，复现自文档当前图表。分数

Agents‘ Last Exam
Muse Ember(max)
GPT-6 Luna(max)
ClaudeHaiku 5.5(max)
0%
10%
20%
30%
40%
50%
60%
70%
分数
61.6%
57.1%
57.0%
Agents’ Last Exam: Agents' Last Exam
系列	度量	数值
Muse Ember (max)	模型	Muse Ember (max)
Muse Ember (max)	分数	61.6%
GPT-6 Luna (max)	模型	GPT-6 Luna (max)
GPT-6 Luna (max)	分数	57.1%
Claude Haiku 5.5 (max)	模型	Claude Haiku 5.5 (max)
Claude Haiku 5.5 (max)	分数	57.0%

Meta 内部评估。Linux 子集。

Personal Superintelligence Index

max reasoning 下的 Personal Superintelligence Index 结果，复现自文档当前图表。分数

Personal Superintelligence Index
Muse Ember(max)
GPT-6 Luna(max)
ClaudeHaiku 5.5(max)
0%
10%
20%
30%
40%
50%
分数
46.8%
37.0%
36.1%
Personal Superintelligence Index: Personal Superintelligence Index
系列	度量	数值
Muse Ember (max)	模型	Muse Ember (max)
Muse Ember (max)	分数	46.8%
GPT-6 Luna (max)	模型	GPT-6 Luna (max)
GPT-6 Luna (max)	分数	37.0%
Claude Haiku 5.5 (max)	模型	Claude Haiku 5.5 (max)
Claude Haiku 5.5 (max)	分数	36.1%

衡量个人工作与知识工作的内部综合指数。

编码

Muse Ember 专为 Agent 在一次会话中成百次发出的编码子任务而打造：读取文件、运行测试、进行针对性修复。

Terminal-Bench 4.0

max reasoning 下的 Terminal-Bench 4.0 结果，复现自文档当前图表。分数

Terminal-Bench 4.0
Muse Ember(max)
ClaudeHaiku 5.5(max)
GPT-6 Luna(max)
0%
10%
20%
30%
40%
50%
分数
40.9%
39.2%
16.4%
Terminal-Bench 4.0: Terminal-Bench 4.0
系列	度量	数值
Muse Ember (max)	模型	Muse Ember (max)
Muse Ember (max)	分数	40.9%
Claude Haiku 5.5 (max)	模型	Claude Haiku 5.5 (max)
Claude Haiku 5.5 (max)	分数	39.2%
GPT-6 Luna (max)	模型	GPT-6 Luna (max)
GPT-6 Luna (max)	分数	16.4%

每个模型均采用其已公布的最佳 harness。参见脚注 1。

Coding Agent Index-AA

max reasoning 下的 Coding Agent Index-AA 结果，复现自文档当前图表。分数

Coding Agent Index-AA
Muse Ember(max)
ClaudeHaiku 5.5(max)
GPT-6 Luna(max)
0
10
20
30
40
50
分数
46
37
31
Coding Agent Index-AA: Coding Agent Index-AA
系列	度量	数值
Muse Ember (max)	模型	Muse Ember (max)
Muse Ember (max)	分数	46
Claude Haiku 5.5 (max)	模型	Claude Haiku 5.5 (max)
Claude Haiku 5.5 (max)	分数	37
GPT-6 Luna (max)	模型	GPT-6 Luna (max)
GPT-6 Luna (max)	分数	31

Artificial Analysis | 2026 年 11 月 9 日

FrontierCode 2.0-AA

max reasoning 下的 FrontierCode 2.0-AA 结果，复现自文档当前图表。分数

FrontierCode 2.0-AA
ClaudeHaiku 5.5(max)
Muse Ember(max)
GPT-6 Luna(max)
0%
10%
20%
30%
40%
得分
34.9%
27.2%
25.2%
FrontierCode 2.0-AA: FrontierCode 2.0-AA
系列	指标	数值
Claude Haiku 5.5 (max)	模型	Claude Haiku 5.5 (max)
Claude Haiku 5.5 (max)	得分	34.9%
Muse Ember (max)	模型	Muse Ember (max)
Muse Ember (max)	得分	27.2%
GPT-6 Luna (max)	模型	GPT-6 Luna (max)
GPT-6 Luna (max)	得分	25.2%

Artificial Analysis | 2026年11月9日

面对最困难的问题，可将它与 Muse Wonder 搭配使用：Muse Wonder 负责规划，Muse Ember 负责批量执行。

多模态

Muse Ember 原生理解文本、图像、音频和视频，因此 Agent 无需单独的模型即可读取截图、图表和扫描文档，或基于语音备忘录、会议录音和视频开展工作。它能够处理冗长的真实世界文档、直接根据截图操作计算机，并捕捉细微的视觉细节。

GDP.pdf-AA

GDP.pdf-AA 在最大推理(max reasoning)设置下的结果，复制自文档当前图表。得分

GDP.pdf-AA
Muse Ember(max)
GPT-6 Luna(max)
ClaudeHaiku 5.5(max)
0%
10%
20%
30%
得分
22.8%
22.8%
20.8%
GDP.pdf-AA: GDP.pdf-AA
系列	指标	数值
Muse Ember (max)	模型	Muse Ember (max)
Muse Ember (max)	得分	22.8%
GPT-6 Luna (max)	模型	GPT-6 Luna (max)
GPT-6 Luna (max)	得分	22.8%
Claude Haiku 5.5 (max)	模型	Claude Haiku 5.5 (max)
Claude Haiku 5.5 (max)	得分	20.8%

Artificial Analysis | 2026年11月9日

OSWorld 2.1

OSWorld 2.1 在最大推理(max reasoning)设置下的结果，复制自文档当前图表。得分

OSWorld 2.1
Muse Ember(max)
ClaudeHaiku 5.5(max)
GPT-6 Luna(max)
0%
10%
20%
30%
40%
50%
60%
70%
得分
69.5%
68.9%
50.5%
OSWorld 2.1: OSWorld 2.1
系列	指标	数值
Muse Ember (max)	模型	Muse Ember (max)
Muse Ember (max)	得分	69.5%
Claude Haiku 5.5 (max)	模型	Claude Haiku 5.5 (max)
Claude Haiku 5.5 (max)	得分	68.9%
GPT-6 Luna (max)	模型	GPT-6 Luna (max)
GPT-6 Luna (max)	得分	50.5%

Meta 内部评估。采用部分得分奖励(partial-credit reward)。

PerceptionBench

PerceptionBench 在最大推理(max reasoning)设置下的结果，复制自文档当前图表。得分

PerceptionBench
Muse Ember(max)
ClaudeHaiku 5.5(max)
GPT-6 Luna(max)
0%
10%
20%
30%
40%
50%
60%
70%
80%
90%
得分
80.6%
78.6%
62.8%
PerceptionBench: PerceptionBench
系列	指标	数值
Muse Ember (max)	模型	Muse Ember (max)
Muse Ember (max)	得分	80.6%
Claude Haiku 5.5 (max)	模型	Claude Haiku 5.5 (max)
Claude Haiku 5.5 (max)	得分	78.6%
GPT-6 Luna (max)	模型	GPT-6 Luna (max)
GPT-6 Luna (max)	得分	62.8%

Meta 内部评估。使用工具。

安全性

在发布之前，我们依据 Meta 超级智能扩展框架(Meta Superintelligence Scaling Framework)对 Muse Ember 进行了评估，涵盖化学与生物、网络安全以及失控风险。在所有评估类别中，评估结果均显示 Muse Ember 低于该框架的高风险阈值。尽管它是一个小模型，但接受了与其他模型相同的核心安全训练和测试。我们还评估了 Muse Ember 在代表用户执行操作时的表现，包括：是否尊重用户意图、是否妥善处理敏感信息、能否抵御隐藏在网页、文档或工具输出中试图将其引向歧途的指令，以及是否在高影响操作之前寻求人工确认。

可用性

Muse Ember 即日起可通过 Muse Code 和 Meta Model API 使用，模型名称为 muse-ember-1.0。定价为每百万输入 token $0.10,每百万缓存输入 token $0.004,每百万输出 token $0.50,上下文窗口为 1M token,输出最多可达 512K token。Muse Ember 支持 Responses API。

在我们发布 Muse Wonder 和 Muse Wonder Full 时曾表示，将利用它们开发能够带给所有人的专用模型。Muse Ember 是首个使用 Muse Wonder Full 训练的模型。它补全了我们的模型组合：Muse Wonder 用于最困难的问题，Muse Spark 用于编程和 Agent 工作流，而 Muse Ember 则用于大规模可重复的编程与 Agent 任务，每个 Artificial Analysis 任务的成本约为 $0.14——这一成本低到足以在每款产品中为所有人运行。

Muse Ember 与 Muse Spark 1.3 对比
Muse Ember 与 Muse Spark 1.3 对比：Artificial Analysis 对比
Artificial Analysis	
精选模型。
Muse Ember (max)	
精选模型。
Muse Spark 1.3 (max)

Intelligence Index
	36	
最佳结果。
37

每个 Intelligence Index 任务的成本
	
最佳结果。
$0.14	$2.39

每 1M 输入 / 输出 token 的价格
	
最佳结果。
$0.10
(输入)
$0.50
(输出)
	$1.25
(输入)
$4.25
(输出)

我们的目标是个人超级智能：能够帮助你追求目标、创造你所想象的事物、深化你的人际关系，并对你最珍视之事采取行动的模型。要让每个人都用上它，仅有前沿能力还不够，还需要以可规模化扩展的价格提供前沿能力。我们还有更高效的模型正在训练中，期待与大家分享后续进展。Muse Ember、Muse Spark 和 Muse Wonder 现已在 Google Cloud 和 Oracle Cloud 上可用。

立即试用 Muse Ember
1.
所有模型均以最大推理强度运行。Artificial Analysis 的结果来自 Intelligence Index v5(2026 年 11 月 9 日发布)；每个任务的成本采用各模型的官方定价。内部结果来自 Meta 的评估套件。Personal Superintelligence Index(PSI)是一项内部综合评估，由八项评估组成：Agents' Last Exam、AutomationBench、FocusBench、JobBench、OfficeQA Pro、GDP.pdf、GDP.xlsx 和 VBT。Terminal-Bench 4.0 使用各模型已发布的最佳 harness:mini-swe-agent(Muse Ember)、Claude Code(Claude Haiku 5.5)和 Codex(GPT-6 Luna)。OSWorld 2.1 采用部分得分奖励;PerceptionBench 使用工具进行评分。
2.
所示定价适用于不超过 200K token 的 prompt。对于更长的 prompt,Muse Ember 的价格为每百万输入 token $0.30、每百万缓存输入 token $0.012、每百万输出 token $1.50。
