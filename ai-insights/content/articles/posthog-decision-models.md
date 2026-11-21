---
title: "PostHog 分享决策模型的四种用法：拦在大模型前面、给模型派活、给搜索重排、替规则挑图表"
date: 2026-11-18T00:00:00.000Z
tags: ["AI 实操", "决策模型", "Jev", "PostHog", "TypeSafe", "模型路由"]
summary: "简单的问题丢给大模型，常常换来几百字的「看情况」；决策模型只回一个答案加一个概率，比如「是，0.99」，代码拿着这个数就能决定下一步。"
---
> **原文链接**: [https://newsletter.posthog.com/p/decision-models](https://newsletter.posthog.com/p/decision-models)
> **来源**: newsletter.posthog.com
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/posthog-decision-models/) · 2026/11/18
> **说明**: 本文由 AIHot汪 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

## 并非所有场景都需要大语言模型

#### 我们如何使用决策模型
[https://substack.com/@jinajay](https://substack.com/@jinajay)[Jina Yoon](https://substack.com/@jinajay)2026年11月9日

LLM 喜欢喋喋不休。问一个简单的问题，你会得到几百字的“这取决于”。这让人非常恼火。

这就是为什么我们喜欢为更简单的任务使用 [像 Jev 这样的决策模型](https://typesafe.ai/)。你提出一个结构化的问题，得到一个带有概率的类型化答案，看起来像这样：

- **Noul。** 刺猬是哺乳动物吗？ → 是，0.99
- **Choice。** 刺猬属于哪个动物科？ → 哺乳动物，0.99
- **Score.** 刺猬目前的保护状况如何？ → 无危，0.77

与 LLM 返回自由格式且过度自信的文本不同，决策模型使模型的不确定性显式化。在经过校准的模型中，得分为 0.8 的答案大约 80% 的时间是正确的。这意味着得分为 0.5 相当于抛硬币。

我们一直在 PostHog 对其进行实验，几个用例已经投入生产。这是我们迄今为止在使用决策模型方面学到的所有内容：何时使用它们、如何使用它们以及需要避免的错误。

---

### 1. 用它们来过滤昂贵的大语言模型调用

决策模型比前沿模型便宜多达 444.6 倍，速度快 193.6 倍，[1](https://newsletter.posthog.com/p/decision-models#footnote-1) 因此你可以使用它们来检查是否真的需要进行昂贵的大语言模型调用。

我们在一个用于清除 [Replay Vision](https://posthog.com/replay-vision?utm_source=posthog-newsletter&utm_medium=post&utm_campaign=decision-models) 中个人信息的管道中执行此操作，Replay Vision 是我们的一款产品，用于观看和总结用户会话录制视频。其工作原理如下：

- 每个会话摘要都会经过决策模型的两个是/否问题。使用这种狭窄的问题可以将误报率降低到单个问题产生结果的约十分之一。
  - 1. “这是否指代真实的人？”
  - 2. “这是否显示联系方式或身份证？”
- 如果任一得分达到 0.4 或以上，Gemini 将重写摘要以去除个人信息，并再次进行检查。
- 否则，它就是干净的，并通过关卡。[在生产环境中](https://github.com/PostHog/posthog/pull/120387)，98.7% 的情况完全跳过了大语言模型调用。

[https://substackcdn.com/image/fetch/$s_!q5Ow!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa914005d-963b-49d5-8581-70159c7e6a46_1920x1080.png](https://substackcdn.com/image/fetch/$s_!q5Ow!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa914005d-963b-49d5-8581-70159c7e6a46_1920x1080.png)

如果没有决策模型，我们就不得不不断调整提示词和正则表达式，这些方法往往会遗漏内容，或者将每个摘要都发送给 Gemini 以捕获那 1% 需要处理的内容。

#### 但要记住它们也会出错

0.85 的概率得分仍意味着每 1,000 次检查中有约 150 次错误回答，因此要提前计划好应对假阳性和假阴性。

在 PII（个人身份信息）示例中，假阳性只会导致我们多进行一次大语言模型调用，而假阴性则会将个人数据存储为干净数据。这就是我们将阈值设为较低的 0.4 的原因。

当假阳性是更昂贵的错误时，使用*更高*的阈值。例如，我们最近更新了 Slack 中的 PostHog 机器人，使其可以在 [未被标记的情况下](https://github.com/PostHog/posthog/blob/master/products/slack_app/backend/temporal/activities/untagged_question.py) 回答问题。为了避免令人反感，它会检查频道中的每条消息，以查看 (1) 它是否在询问信息，以及 (2) PostHog 是否可以回答它。只有通过这两项且得分在 0.85 以上的消息才会通过。

> **要点：** 使用决策模型在任务触及昂贵的大语言模型调用之前进行过滤，并根据哪种错误代价更高来设置阈值。

---

### 2. 用它们作为模型路由器

我们的 [Slack 中的 PostHog](https://posthog.com/slack?utm_source=posthog-newsletter&utm_medium=post&utm_campaign=decision-models) 机器人也使用决策模型作为 [模型路由器](https://github.com/PostHog/posthog/blob/master/products/slack_app/backend/services/model_router.py)。

当机器人被提及时，它首先检查消息是否指定了特定的模型。如果没有，一个 `choice` 问题会从列表中选择一个选项：

*“选择最有可能在第一次尝试中就正确完成任务的最便宜选项。一次失败的运行比更智能的选项成本更高。”*

[https://substackcdn.com/image/fetch/$s_!28Ha!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffe76f7bf-59ca-48ca-8a92-4f23c2a2532c_1920x1235.png](https://substackcdn.com/image/fetch/$s_!28Ha!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffe76f7bf-59ca-48ca-8a92-4f23c2a2532c_1920x1235.png)

列表中的每个选项都附带一段简短说明，解释该模型擅长什么。GPT Luna 被描述为“一款轻量且非常便宜的模型。适用于简短回答、查询、摘要和非常小的编辑。”然后，决策模型会根据每个选项的文本对请求进行评分。

#### 但不要假设它们可以互换

不同的任务、模型和提供商都有不同的阈值。

我们曾尝试使用它们来自动合并 [Error Tracking](https://posthog.com/error-tracking?utm_source=posthog-newsletter&utm_medium=post&utm_campaign=decision-models) 中相似的日志，发现同一模型的 v1 和 v2 版本之间的阈值发生了变化。我们不得不使阈值在 PostHog 项目中可配置，并在基于 [人工标注数据](https://github.com/PostHog/posthog/pull/117014) 重新校准时将裁判模型保持在影子模式。

这也是为什么我们增长团队中的 [Fernando](https://posthog.com/community/profiles/42799?utm_source=posthog-newsletter&utm_medium=post&utm_campaign=decision-models) 早期就推动采用模型无关的接口。现在我们有一个内部 AI 网关，用于交换和测试模型，包括自托管模型。

> **要点：** 使用 `choice` 问题将自由形式的 LLM 请求路由到能够处理该请求的最便宜模型。请注意，阈值不会继承，因此请针对每个任务和每个模型设置阈值。

---

### 3. 用于表面价值检查

如果一个问题需要更多的上下文或推理链，最好使用 LLM。但是，如果你有办法扁平化或预处理输入，使其可以进行表面价值检查，你仍然可以使用决策模型。

在 Replay Vision 中，当用户搜索诸如“入职摩擦”之类的主题时，由于嵌入距离的工作方式，查询可能会返回一些意想不到的结果。

决策模型无法“排名包含与用户搜索查询匹配的摘要的前 10 个会话”。这太复杂了。

相反，我们首先使用嵌入来生成一个初始会话录制列表，然后将其传递给决策模型。然后，决策模型剩下的唯一任务就是查看列表中的每个结果与用户原始搜索词的匹配程度：

*“这个摘要是否描述了一个符合搜索要求的会话？”*

[https://substackcdn.com/image/fetch/$s_!Qn-G!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F42bb4937-025f-4a62-87fc-f6bff543fc98_3840x2160.png](https://substackcdn.com/image/fetch/$s_!Qn-G!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F42bb4937-025f-4a62-87fc-f6bff543fc98_3840x2160.png)

结果随后根据该概率进行 [重排序](https://github.com/PostHog/posthog/pull/107372)。在 20 个测试查询中，这使排序质量提高了约 25%。

#### 但避免多步推理

我们之前曾尝试 [使用决策模型](https://github.com/PostHog/posthog/pull/114045) 进行多步推理。在 Replay Vision 中嵌入功能就绪之前，我们曾尝试对值得人类关注的会话“亮点”提要进行排名。问题如下：

1. 这个会话值得观看吗？
2. 如果是，为什么值得观看？（选项包括“屏幕上有错误”、“缓慢或卡住”、“用户困惑”、“用户放弃”等）

按顺序处理这两个问题需要一个每小时运行的作业，该作业发送大型请求——多达 32 个会话，每个会话 12,000 到 38,000 个 token——这导致模型服务器过载，并阻塞了其他产品的调用长达数小时。

因此，从技术上讲，你可以将决策模型链接成多步判断，但这在运营上并不划算。将这类任务留给 LLM，或者在决策模型看到数据之前完成繁重的工作，就像上面嵌入搜索示例中那样。

> **要点：** 决策模型在一次传递中判断眼前的内容。将多步推理留给 LLM。

---

### 4. 用它们替代大材小用的 LLM

决策模型可以接管那些 LLM 大材小用的任务，无论是因为它太慢还是太贵。

一个例子是我们用于 SQL 查询的[更智能的图表选择器](https://github.com/PostHog/posthog/pull/108065)。PostHog 过去使用确定性规则来选择可视化图表，例如：

- 一个日期列、一个数字列和多行数据 → 折线图
- 两个或更多文本列加上一个数字 → 热力图
- 任何数字列 → 柱状图

现在，如果组织选择加入，决策模型会查看 SQL 本身以及结果的前三行，以建议更好的图表。

下面的示例基于一个关于按浏览器划分的页面浏览量的简单查询。原始规则选择了一个基本的聚合折线图；而使用 Jev 时，它选择了一个按浏览器拆分的柱状图：

[https://substackcdn.com/image/fetch/$s_!znnn!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe9acecfe-6efb-4778-8cc9-0a945db68be1_1920x1184.png](https://substackcdn.com/image/fetch/$s_!znnn!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe9acecfe-6efb-4778-8cc9-0a945db68be1_1920x1184.png)

#### 但将开放式任务留给 LLM

任何更开放的任务仍应交给 LLM。

尽管如此，出于好奇，我们尝试使用 Jev 对内部 PR 审查代理的发现进行排名，提出了五个大致询问“该更改是否值得开发人员关注”的新问题。结果模棱两可，AUC 为 0.52。

如果 Jev 是一个 LLM，我们会通过发送更多上下文来解决这个问题，但 Jev 无法处理大型请求。它的长上下文模式也更慢且准确性较低。[2](https://newsletter.posthog.com/p/decision-models#footnote-2) 典型的决策模型根本不是为了这种类型的推理而构建的。

不过，混合决策模型如 [Jeeves](https://github.com/PostHog/jeeves) 可以帮助弥合这一差距。Jeeves 由我们的[内部 AI 研究团队](https://posthog.com/teams/ai-research?utm_source=posthog-newsletter&utm_medium=post&utm_campaign=decision-models)开发，是一种在不确定时会先推理再做出决策的决策模型。

它现在是我们 PostHog 中任何未指定模型的决策调用的默认选择，其他开发者也有类似的变体，如 [Kev](https://github.com/jaredpalmer/kev)。

> **要点：** 将决策模型用作评估器的角色，适用于那些对于语言模型来说过于简单、但对于正则表达式来说又过于模糊的输入。任何更复杂的任务目前仍不适合交给决策模型。至少目前是这种情况。

*Jina Yoon 著，她预计这篇文章将在两个月内过时。*

---

### 📚 值得阅读的佳作

- **[PostHog AI 中的用户提示词分析](https://posthog.com/blog/what-people-are-prompting?utm_source=posthog-newsletter&utm_medium=post&utm_campaign=decision-models) – Cleo Lant**
- **[软件背后的那个人](https://karrisaarinen.com/posts/someone-behind-the-software/) – Karri Saarinen**
- **[为什么我们将仓库产品从 DuckDB 迁移](https://posthog.com/blog/moving-off-duckdb?utm_source=posthog-newsletter&utm_medium=post&utm_campaign=decision-models) – Benjamin Knofe-Vider**
- **[睡眠框架：LLM 在持续学习中保留知识的新方法](https://research.google/blog/the-sleep-framework-a-new-way-for-llms-to-retain-knowledge-in-continual-learning/) – Ali Behrouz, Vahab Mirrokni**
- **[我们如何利用预计算使实验查询速度提升 4 倍](https://posthog.com/blog/how-we-made-experiment-queries-fast?utm_source=posthog-newsletter&utm_medium=post&utm_campaign=decision-models) – Juraj Majerik**

订阅是正确的`选择`

---

### 💼 你会喜欢这里，0.99

- **[技术客户成功经理 - EMEA](https://posthog.com/careers/technical-customer-success-manager-emea?utm_source=posthog-newsletter&utm_medium=post&utm_campaign=decision-models)**
- **[技术客户成功经理 - 美洲](https://posthog.com/careers/technical-customer-success-manager-americas?utm_source=posthog-newsletter&utm_medium=post&utm_campaign=decision-models)**
- **[AI 研究工程师](https://posthog.com/careers/ai-research-engineer?utm_source=posthog-newsletter&utm_medium=post&utm_campaign=decision-models)**
- **[动画师与动态图形设计师](https://posthog.com/careers/animator-and-motion-graphics-designer?utm_source=posthog-newsletter&utm_medium=post&utm_campaign=decision-models)**
- **[产品经理，可观测性（前创始人或前产品工程师）](https://posthog.com/careers/product-manager-observability-(ex-founder-or-ex-product-engineer)?utm_source=posthog-newsletter&utm_medium=post&utm_campaign=decision-models)**
- **[站点可靠性工程师（美国太平洋时间）](https://posthog.com/careers/site-reliability-engineer-(us-pacific-time)?utm_source=posthog-newsletter&utm_medium=post&utm_campaign=decision-models)**
[1](https://newsletter.posthog.com/p/decision-models#footnote-anchor-1)

根据 [TypeSafe AI](https://typesafe.ai/blog/introducing-system-one-models-and-jev)。
[2](https://newsletter.posthog.com/p/decision-models#footnote-anchor-2)

Jev 默认每次请求处理 64k token，每个问题处理 32k token。尽管 TypeSafe 添加了一个可选头部，将两者都提升至 262k，但他们仍警告说，长上下文模式速度更慢且准确性更低。来源：[TypeSafe 文档](https://docs.typesafe.ai/models)

##### 关于此帖的讨论
[https://substack.com/profile/18542263-rohan?utm_source=comment](https://substack.com/profile/18542263-rohan?utm_source=comment)[Rohan](https://substack.com/profile/18542263-rohan?utm_source=substack-feed-item)[7天前](https://newsletter.posthog.com/p/decision-models/comment/384363833)

让几个简单的检查在大多数时候跳过 LLM 调用是一个如此低成本的优势。你是如何确定阈值的？
回复分享[2 条回复](https://newsletter.posthog.com/p/decision-models/comment/384363833)[https://substack.com/profile/171112536-mohith-kumar?utm_source=comment](https://substack.com/profile/171112536-mohith-kumar?utm_source=substack-feed-item)[Mohith kumar](https://substack.com/profile/171112536-mohith-kumar?utm_source=substack-feed-item)[11月10日](https://newsletter.posthog.com/p/decision-models/comment/383495742)

对于 PII 的 0.4 阈值以及 Slack 机器人的 0.85 阈值对我来说是最有用的部分，因为它将“哪个错误成本更高”转化为一个你可以实际设置的数值。而且 98.7% 的摘要跳过了 LLM 调用，对于两个是非问题来说，这是一个惊人的结果。将一个大问题拆分为两个窄问题需要大量的调整吗，还是说第一次尝试就接近成功了？
回复分享[2 条回复](https://newsletter.posthog.com/p/decision-models/comment/383495742)[还有 12 条评论...](https://newsletter.posthog.com/p/decision-models/comments)

#### 准备好迎接更多内容了吗？
