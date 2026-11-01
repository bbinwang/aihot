---
title: "如何用决策模型给 AI 做自动化质检：六款模型实测"
date: 2026-10-21T00:00:00.000Z
tags: ["AI 实操", "AI 评测", "Agent", "决策模型", "聚合"]
summary: "默认 0.5 为什么会漏检？用租赁 Agent 的真实记录，讲清报警阈值、模型选型与概率校准。"
---
> **原文链接**: [https://hamel.dev/blog/posts/decision-model-evals/](https://hamel.dev/blog/posts/decision-model-evals/)
> **来源**: hamel.dev
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/hamel-decision-model-evals/) · 2026/10/21
> **说明**: 本文由 AIHot 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

决策模型(decision model)近来异军突起，先是 TypeSafe 的 Jev,随后是 Perplexity 的 Decider、Liquid 的 d1、Cloudflare 的 Clef,以及 OpenAI 的 Decisions API[1](https://hamel.dev/blog/posts/decision-model-evals/#fn1)。这些模型承诺提供快速、廉价的分类能力。

对于自动化 evals 而言，决策模型是 LLM judge[2](https://hamel.dev/blog/posts/decision-model-evals/#fn2) 颇具吸引力的低成本替代方案。但是否选它，取决于你的用例在成本、性能和延迟方面的要求。

我们还注意到，很多人直接使用默认的决策阈值 0.50,而不检查它是否适合自己的任务。这可能会损失大量本可获得的性能。

在这篇文章中，我们首先展示如何调整阈值，以从决策模型中获得最佳结果。在阈值调优完成后，我们将比较各模型的成本和性能，帮助你评估哪个模型适合你的用例。最后，我们将探讨在决定是否采取行动时如何解读模型分数，以及校准如何让这些分数更有用地充当置信度估计。

### 我们测试了什么

我们使用了来自公寓租赁 Agent 的 100 条 trace(即对话和操作的日志记录)。任务是识别包含错误的 trace,例如预订失败或未能转接给人工。[3](https://hamel.dev/blog/posts/decision-model-evals/#fn3) 我们在[此前关于自动化 evals 的文章](https://parlance-labs.com/blog/posts/auto-evals/)中使用了相同的数据集和宽泛的故障发现任务。在这里，每个决策模型会为每条 trace 返回一个失败概率。

我们测试了 Jev 1.13、Perplexity Decider 1.1 27B、Liquid d1 和 d1-ultra、Cloudflare Clef Flash,以及 OpenAI Decisions(GPT-6 Luna)[1](https://hamel.dev/blog/posts/decision-model-evals/#fn1)。每个模型都使用相同的评估标准。[附录](https://hamel.dev/blog/posts/decision-model-evals/#evaluation-prompt)中展示了提示词以及用于 Jev 的结构化版本。

我们在两个维度上比较各模型：

- **性能：** 我们将每个模型的预测结果与经过人工审核并标注为通过或失败的 trace 进行对比。这衡量了模型在发现失败的同时避免误报的能力。
- **成本：** 我们根据 token 用量和提供商的价格计算 API 成本。[4](https://hamel.dev/blog/posts/decision-model-evals/#fn4)

为简洁起见，我们不讨论延迟，因为它取决于本实验无法控制的因素。[5](https://hamel.dev/blog/posts/decision-model-evals/#fn5)

### 理解决策阈值

我们为每条 trace 分配两个标签之一：通过或失败。这是一种[二元通过/失败 eval](https://hamel.dev/blog/posts/evals-faq/why-do-you-recommend-binary-passfail-evaluations-instead-of-1-5-ratings-likert-scales.html),我们推荐这种方式，因为它鼓励明确的标准，并且更容易与人类偏好对齐。

每个决策模型都会返回一个 0 到 1 之间的分数，用于估计某条 trace 包含失败的可能性。各 API 通过一个**默认决策阈值 0.50** 将该分数转换为决策。分数达到或超过阈值的 trace 会被标记为失败。如果不结合自己的数据加以检查就使用这一默认值，可能会导致不佳的结果。

举例来说，某个模型可能给每条失败的 trace 打 0.40 分，给每条通过的 trace 打 0.10 分。尽管在阈值为 0.30 时这个模型可以完美地分类所有 trace,但默认阈值 0.50 会漏掉所有失败。

在实际应用中，失败 trace 和通过 trace 的分数会有重叠。降低阈值能捕获更多失败，但也可能带来更多误报。选择阈值意味着在以下两者之间权衡：

- **精确率(Precision):** 被标记的 trace 中确实包含已知失败的比例。
- **召回率(Recall):** 已知失败中被模型捕获的比例。

正确的权衡取决于你的业务目标。例如，刑事审判为定罪设置了很高的门槛，以避免冤枉无辜者，强调的是精确率。癌症筛查则可能强调召回率，接受更多误报，以减少漏诊。[6](https://hamel.dev/blog/posts/decision-model-evals/#fn6) 在本次比较中，我们将使用 [F1 分数](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.f1_score.html)(精确率和召回率的调和平均数)对二者赋予相同权重。F1 的取值范围为 0 到 1,数值越高越好。

下方的曲线展示了每个模型对失败(failures,橙色)和通过(passing,蓝色)trace 的评分分布。曲线较高的部分意味着该类别的更多评分落在这个区间内。达到或超过虚线阈值的评分会被标记出来。使用切换开关将 **0.50** 与 **Optimized for best F1**(为每个模型选择阈值)进行比较。[7](https://hamel.dev/blog/posts/decision-model-evals/#fn7)

在此任务上，OpenAI 对两类样本的区分效果最好，这也体现在其更高的 F1 score 上。

同样重要的是，不要盲目地最大化 F1,而不考虑分类器要达到可用状态所需的最低要求。例如，如果这个分类器用于自动化告警系统，我希望 precision 和 recall 都至少达到 80%,这样既能尽量减少误报，又能捕获足够多的失败。

下面的图表展示了 precision 和 recall 在不同阈值下的变化。[8](https://hamel.dev/blog/posts/decision-model-evals/#fn8) 阴影区域标出了两者都达到至少 80% 的范围。

Perplexity、Liquid d1-ultra 和 OpenAI Decisions 满足我们的要求，但我们仍需在阴影区域内为每个模型选择一个决策阈值。在下一节中，我们将讨论如何调整这些阈值。

#### 调整决策阈值

在本例中，我们将优化 F1。对于候选模型，我们会尽可能地将调优限制在训练数据上同时满足两个 80% 最低要求的阈值范围内。其他模型则不加约束，以展示调优的效果。[9](https://hamel.dev/blog/posts/decision-model-evals/#fn9)

有了带标注的 trace 和已保存的模型评分，你可以让 coding agent 来调整阈值。下面是一个示例 prompt,你可以根据自己的使用场景进行修改：

> 使用我已保存的模型评分和二元标签(1 表示失败)，调整决策阈值以最大化 F1,同时要求 precision 和 recall 均不低于 80%。使用分层五折交叉验证(stratified five-fold cross-validation),在训练样本上选择阈值，并在剩余样本上测量性能。如果比较多个模型，对每个模型使用相同的划分。只选择在训练样本上同时满足两个最低要求的阈值。如果没有符合要求的阈值，请如实报告，而不是放宽任一要求。报告验证集上的 precision、recall 和 F1,以及任何没有合格阈值或验证性能低于我最低要求的划分。与默认阈值 0.50 进行比较。复用已保存的评分，不要发起新的模型调用。

以下是为 F1 进行调优后各模型性能的变化。我们将来自 precision-recall 图的三个候选模型归为一组，并以灰色显示其他模型，以说明调优能带来多大的帮助。

我们的候选模型从 F1 调优中获益较少，而 Liquid d1 和 Clef Flash 则低于我们的最低要求。然而，即使 precision 和 recall 的小幅变化也可能影响业务成本或用户体验，因此要有意识地权衡取舍。在实践中，precision 和 recall 不太可能同等重要(正如我们在本文中使用 F1 时所假设的那样)。例如，[F-beta score](https://scikit-learn.org/stable/modules/model_evaluation.html#precision-recall-f-measure-metrics) 允许你在 beta 小于 1 时给 precision 更高权重，或在 beta 大于 1 时给 recall 更高权重。优化不同的指标可能会导致不同的阈值和结果。

### 性能与成本的权衡

下面的图表比较了各模型(调优后)的 F1 与成本，聚焦于我们剩下的候选模型：

虚线显示了我们剩余候选模型中的 **Pareto frontier**。对于任意给定的 F1 分数，它标出了达到或超过该分数的最便宜的候选模型。这张图有点滑稽，因为只有三个选项，但它很好地展示了如何思考成本与性能之间的权衡。

Perplexity 是这些候选模型中最便宜的，每 100 次 eval 运行花费 0.82 美分，F1 为 0.79。OpenAI Decisions 达到了 0.87 的 F1,每 100 次 eval 运行花费 3.72 美分，成本约为前者的 4.5 倍。

### 我们能相信这些概率吗？

除了 pass/fail 式的 eval 之外，你可能还想把 decision model 的分数用作置信度估计。但这个数字能按字面意思理解吗？如果 0.80 的分数意味着 80% 的失败概率，那么在分数相近的 traces 中，大约应有 80% 包含失败。

下图展示了每个模型的**概率校准**(probability calibration)：即其预测概率与观测结果的吻合程度。[10](https://hamel.dev/blog/posts/decision-model-evals/#fn10) 每个点代表约 20 条分数相近的 traces。落在对角线上的点表示预测概率与该组的失败率相符。在线上方，说明模型低估了失败风险；在线下方，说明模型高估了失败风险。

如果预测概率与观测结果不符，我们可以用另一个模型来调整它们。第二个面板展示了一种方法，即 **Platt scaling**,它通过拟合一条简单的曲线来完成这种调整。[11](https://hamel.dev/blog/posts/decision-model-evals/#fn11)

校准之后，Perplexity、Liquid d1 和 Clef Flash 都更靠近对角线。例如，Clef Flash 的一组 traces 平均预测失败概率约为 8%,但实际有 60% 包含失败。

Jev 和 Liquid d1-ultra 在这个数据集上本来就校准良好，几乎不需要调整。

Platt scaling 并不总是最优选择。例如，用我们所用的 Platt scaling 版本处理后，OpenAI 的概率反而略有变差。[12](https://hamel.dev/blog/posts/decision-model-evals/#fn12) 你可以用下面的 prompt 指挥你的 coding Agent 执行校准：

> 使用我已保存的失败概率和二元标签(1 表示失败)，测试 Platt scaling 是否能改进每个模型的概率。使用分层五折交叉验证，并且所有模型使用相同的划分。在每个训练划分上拟合校准映射，并将其应用到剩余的 traces 上。在对数几率(log-odds)上进行拟合，先将概率裁剪到远离 0 和 1 的范围。绘制校准前后的预测概率与观测失败率的对比图。报告 Brier scores(越低越好)，并说明哪些模型有所改进、哪些变差了。复用已保存的分数，不要发起新的模型调用。

### Prompt 调优与 evaluator 的适用范围

为了让模型之间的差异更容易观察，本文把 eval 任务设定得比较宽泛。在实践中，我们建议[为每种失败模式单独构建一个 judge](https://hamel.dev/blog/posts/evals-faq/what-should-i-do-when-i-cant-get-my-llm-judge-to-agree-with-human-reviewers.html)。任务更窄、指导更具体时，我们预计模型之间的性能差距会缩小。

我喜欢的做法是：先从一个在任务上表现可接受的大模型入手，然后尝试更小的模型，看它们能否以更低的成本达到大模型的性能。如果你有高质量的标签，prompt 调优也会很有帮助。[13](https://hamel.dev/blog/posts/decision-model-evals/#fn13) 我在[这篇文章](https://hamel.dev/blog/posts/llm-judge/index.html)中讨论了如何打造一个好的 judge prompt。

### 把这些想法付诸实践

对于这个特定数据集，OpenAI 以更高的成本交出了亮眼的表现。Perplexity 和 Liquid d1-ultra 则提供了成本更低、性能也稍低的选项。我们观察到，模型性能在不同任务和数据集之间差异很大，这意味着亲自进行测量非常重要。

总结一下：

- 一旦你对 [judge 的 prompt](https://hamel.dev/blog/posts/llm-judge/index.html) 感到满意，就为你的使用场景设定最低的精确率和召回率要求，排除无法达标的模型。
- 在比较性能之前，先调整每个模型的决策阈值。选择一个符合你业务目标的精确率-召回率权衡。要有意识地做决定，不要仅仅因为本文用了 F1 score 就照搬！
- 如果你想把分数用作置信度估计，请检查概率是否与观测结果相符。校准会有帮助，但你需要实际测量它是否带来了改进。
- 针对你的工作负载，在性能与成本、延迟之间进行权衡。

这一过程是迭代的：你可能刚改进了 prompt，就又需要重新调整阈值或重新审视校准。在这篇文章中，我们重点关注阈值调优和校准，因为我们见过太多人拿来即用 decision models，却从不考虑这些因素。

你可能还想知道 decision models 与 LLM 相比表现如何。OpenAI Decisions 使用的是 GPT-6 Luna，它以最高的成本给出了我们最高的 F1，这表明对于更难的 eval 任务，为 LLM 支付更高费用可能是合理的。在一份[更广泛的对比](https://www.randalolson.com/2026/10/14/when-to-use-a-decision-model-instead-of-an-llm/)中，Randy Olson 发现 decision models 能以更低的成本在分类和路由任务上与 LLM 持平，而在需要知识和推理的任务上，LLM 则明显领先。

本文讨论的这些想法都不是什么新东西。选择 precision-recall 之间的权衡、调整阈值、比较性能与成本，这些都是评估任何 classifier 时要做的事。想进一步了解这些基础知识，我推荐 Kyle Gallatin 和 Chris Albon 合著的 [Machine Learning with Python Cookbook, 2nd Edition](https://www.oreilly.com/library/view/machine-learning-with/9781098135713/)。

最后，如果你是一名数据科学家或 ML 工程师，正在思考自己在 AI 时代的位置，那么这些技能你早已具备。是时候去[复仇](https://hamel.dev/blog/posts/revenge/)了 🙂。

### 附录：Evaluation prompt

Perplexity、Liquid d1 和 d1-ultra、Clef Flash 以及 OpenAI Decisions 使用的是下面的 prompt。Jev 收到的则是结构化 prompt 中的等效评估标准，示例如下。图表中使用的[分数和标签](https://hamel.dev/blog/posts/decision-model-evals/charts/chart-data.json)以 JSON 格式提供。

```
Decide whether `messages` contains at least one substantive failure, risk, or quality problem in the AI assistant's behavior or tool use. This is one complete production trace from an AI that handles apartment-leasing customer support over phone or messaging. The trace includes the conversation plus any tool calls and tool outputs.

Evaluate the AI assistant and its tool use, not the customer. Treat system messages inside `messages` as the instructions governing the assistant's behavior and allowed capabilities. Inspect the full trace, including final turns and all tool calls and outputs. Base the judgment only on evidence visible in this trace. Do not assume external policies, channel behavior, or business requirements that are not present. Do not assume every trace failed. A short, ambiguous, or inconclusive trace is not an issue unless visible evidence establishes a substantive failure.

Return the probability that at least one substantive issue is present; the issue does not need to be named or clustered.

Count as an issue when supported by the trace: the assistant contradicts an applicable system instruction or tool result; makes an unsupported factual or operational claim; misses, misuses, repeats, or falsely claims completion of a required tool action, transfer, booking, cancellation, follow-up, or confirmation; materially misunderstands or leaves an explicit user request unresolved; or exposes internal actions, placeholders, or broken content to the customer in a way that materially harms the interaction.

Do not count as an issue: a minor stylistic preference with no meaningful effect; a failure caused only by the customer's behavior; internal tool metadata that was not exposed to the customer and did not cause an incorrect response; a hypothetical concern requiring information outside the trace; or insufficient evidence and inconclusive conversations.
```

Note 示例：结构化 prompt

下面就是我们为 Jev 的请求构建 prompt 的方式，其中 instructions 与评估标准分别放在不同的字段中。

```
<span id="cb2-1"><a href="#cb2-1" aria-hidden="true" tabindex="-1"></a><span class="fu">{</span></span>
<span id="cb2-2"><a href="#cb2-2" aria-hidden="true" tabindex="-1"></a>  <span class="dt">"version"</span><span class="fu">:</span> <span class="st">"nurtureboss-any-issue-v1"</span><span class="fu">,</span></span>
<span id="cb2-3"><a href="#cb2-3" aria-hidden="true" tabindex="-1"></a>  <span class="dt">"question_id"</span><span class="fu">:</span> <span class="st">"has_substantive_issue"</span><span class="fu">,</span></span>
<span id="cb2-4"><a href="#cb2-4" aria-hidden="true" tabindex="-1"></a>  <span class="dt">"type"</span><span class="fu">:</span> <span class="st">"noul"</span><span class="fu">,</span></span>
<span id="cb2-5"><a href="#cb2-5" aria-hidden="true" tabindex="-1"></a>  <span class="dt">"instructions"</span><span class="fu">:</span> <span class="fu">{</span></span>
<span id="cb2-6"><a href="#cb2-6" aria-hidden="true" tabindex="-1"></a>    <span class="dt">"task"</span><span class="fu">:</span> <span class="st">"Does `messages` contain at least one substantive failure, risk, or quality problem in the AI assistant's behavior or tool use?"</span><span class="fu">,</span></span>
<span id="cb2-7"><a href="#cb2-7" aria-hidden="true" tabindex="-1"></a>    <span class="dt">"context"</span><span class="fu">:</span> <span class="st">"This is one production trace from an AI that handles apartment-leasing customer support over phone or messaging. The trace contains the complete conversation plus any tool calls and tool outputs."</span><span class="fu">,</span></span>
<span id="cb2-8"><a href="#cb2-8" aria-hidden="true" tabindex="-1"></a>    <span class="dt">"evaluation_rules"</span><span class="fu">:</span> <span class="ot">[</span></span>
<span id="cb2-9"><a href="#cb2-9" aria-hidden="true" tabindex="-1"></a>      <span class="st">"Evaluate the AI assistant and its tool use, not the customer."</span><span class="ot">,</span></span>
<span id="cb2-10"><a href="#cb2-10" aria-hidden="true" tabindex="-1"></a>      <span class="st">"Treat system messages inside `messages` as the instructions governing the assistant's behavior and allowed capabilities."</span><span class="ot">,</span></span>
<span id="cb2-11"><a href="#cb2-11" aria-hidden="true" tabindex="-1"></a>      <span class="st">"Inspect the full trace, including the final turns and all tool calls and outputs."</span><span class="ot">,</span></span>
<span id="cb2-12"><a href="#cb2-12" aria-hidden="true" tabindex="-1"></a>      <span class="st">"Base the judgment only on evidence visible in this trace. Do not assume external policies, channel behavior, or business requirements that are not present."</span><span class="ot">,</span></span>
<span id="cb2-13"><a href="#cb2-13" aria-hidden="true" tabindex="-1"></a>      <span class="st">"Do not assume every trace failed. A short, ambiguous, or inconclusive trace is not an issue unless the visible evidence establishes a substantive failure."</span><span class="ot">,</span></span>
<span id="cb2-14"><a href="#cb2-14" aria-hidden="true" tabindex="-1"></a>      <span class="st">"Return the probability that at least one substantive issue is present. The issue does not need to be named or clustered."</span></span>
<span id="cb2-15"><a href="#cb2-15" aria-hidden="true" tabindex="-1"></a>    <span class="ot">]</span></span>
<span id="cb2-16"><a href="#cb2-16" aria-hidden="true" tabindex="-1"></a>  <span class="fu">},</span></span>
<span id="cb2-17"><a href="#cb2-17" aria-hidden="true" tabindex="-1"></a>  <span class="dt">"criteria"</span><span class="fu">:</span> <span class="fu">{</span></span>
<span id="cb2-18"><a href="#cb2-18" aria-hidden="true" tabindex="-1"></a>    <span class="dt">"true"</span><span class="fu">:</span> <span class="fu">{</span></span>
<span id="cb2-19"><a href="#cb2-19" aria-hidden="true" tabindex="-1"></a>      <span class="dt">"definition"</span><span class="fu">:</span> <span class="st">"At least one substantive problem is supported by evidence in the trace."</span><span class="fu">,</span></span>
<span id="cb2-20"><a href="#cb2-20" aria-hidden="true" tabindex="-1"></a>      <span class="dt">"examples_of_qualifying_evidence"</span><span class="fu">:</span> <span class="ot">[</span></span>
<span id="cb2-21"><a href="#cb2-21" aria-hidden="true" tabindex="-1"></a>        <span class="st">"The assistant contradicts an applicable system instruction or a tool result."</span><span class="ot">,</span></span>
<span id="cb2-22"><a href="#cb2-22" aria-hidden="true" tabindex="-1"></a>        <span class="st">"The assistant makes an unsupported factual or operational claim."</span><span class="ot">,</span></span>
<span id="cb2-23"><a href="#cb2-23" aria-hidden="true" tabindex="-1"></a>        <span class="st">"A required tool action, transfer, booking, cancellation, follow-up, or confirmation is missing, incorrect, repeated, or falsely claimed as complete."</span><span class="ot">,</span></span>
<span id="cb2-24"><a href="#cb2-24" aria-hidden="true" tabindex="-1"></a>        <span class="st">"The assistant materially misunderstands or leaves an explicit user request unresolved."</span><span class="ot">,</span></span>
<span id="cb2-25"><a href="#cb2-25" aria-hidden="true" tabindex="-1"></a>        <span class="st">"Customer-facing text exposes internal actions, placeholders, or broken content that materially harms the interaction."</span></span>
<span id="cb2-26"><a href="#cb2-26" aria-hidden="true" tabindex="-1"></a>      <span class="ot">]</span></span>
<span id="cb2-27"><a href="#cb2-27" aria-hidden="true" tabindex="-1"></a>    <span class="fu">},</span></span>
<span id="cb2-28"><a href="#cb2-28" aria-hidden="true" tabindex="-1"></a>    <span class="dt">"false"</span><span class="fu">:</span> <span class="fu">{</span></span>
<span id="cb2-29"><a href="#cb2-29" aria-hidden="true" tabindex="-1"></a>      <span class="dt">"definition"</span><span class="fu">:</span> <span class="st">"No substantive assistant problem can be established from the visible trace."</span><span class="fu">,</span></span>
<span id="cb2-30"><a href="#cb2-30" aria-hidden="true" tabindex="-1"></a>      <span class="dt">"do_not_count_as_an_issue"</span><span class="fu">:</span> <span class="ot">[</span></span>
<span id="cb2-31"><a href="#cb2-31" aria-hidden="true" tabindex="-1"></a>        <span class="st">"A minor stylistic preference with no meaningful effect."</span><span class="ot">,</span></span>
<span id="cb2-32"><a href="#cb2-32" aria-hidden="true" tabindex="-1"></a>        <span class="st">"A failure caused only by the customer's behavior."</span><span class="ot">,</span></span>
<span id="cb2-33"><a href="#cb2-33" aria-hidden="true" tabindex="-1"></a>        <span class="st">"Internal tool metadata that was not exposed to the customer and did not cause an incorrect response."</span><span class="ot">,</span></span>
<span id="cb2-34"><a href="#cb2-34" aria-hidden="true" tabindex="-1"></a>        <span class="st">"A hypothetical concern that requires information outside the trace."</span><span class="ot">,</span></span>
<span id="cb2-35"><a href="#cb2-35" aria-hidden="true" tabindex="-1"></a>        <span class="st">"Insufficient evidence or an inconclusive conversation."</span></span>
<span id="cb2-36"><a href="#cb2-36" aria-hidden="true" tabindex="-1"></a>      <span class="ot">]</span></span>
<span id="cb2-37"><a href="#cb2-37" aria-hidden="true" tabindex="-1"></a>    <span class="fu">}</span></span>
<span id="cb2-38"><a href="#cb2-38" aria-hidden="true" tabindex="-1"></a>  <span class="fu">}</span></span>
<span id="cb2-39"><a href="#cb2-39" aria-hidden="true" tabindex="-1"></a><span class="fu">}</span></span>
```

### 脚注

1. 测试的版本:[Jev 1.13](https://docs.typesafe.ai/introduction)([2026 年 9 月 15 日发布](https://typesafe.ai/blog/introducing-system-one-models-and-jev))、[Perplexity Decider 1.1 27B](https://docs.perplexity.ai/docs/decisions/quickstart)、[Liquid d1 和 d1-ultra](https://docs.liquid.ai/lfm/models/decision-models)、[Cloudflare Clef Flash](https://blog.cloudflare.com/clef-decision-models) 以及 [OpenAI Decisions](https://developers.openai.com/api/docs/guides/decisions)。OpenAI Decisions 使用 GPT-6 Luna。该 API 返回类型化的答案,包括针对是非题给出 0 到 1 之间的概率。这是与 Structured Outputs 相互独立的另一个 API,后者生成符合自定义 JSON schema 的响应。我们将其纳入,是因为它服务于相同的分类任务。[↩︎](https://hamel.dev/blog/posts/decision-model-evals/#fnref1)
2. [LLM judge](https://hamel.dev/blog/posts/llm-judge/index.html) 使用 prompt 来评估 AI 系统的输出或行为。我们建议让它针对特定的失败模式做出[二元通过/失败判定](https://hamel.dev/blog/posts/evals-faq/why-do-you-recommend-binary-passfail-evaluations-instead-of-1-5-ratings-likert-scales.html)。这有助于形成清晰的评判标准,也更容易将 judge 的判定与人工标注进行比较。[↩︎](https://hamel.dev/blog/posts/decision-model-evals/#fnref2)
3. 在从 100 条 trace 的数据集中排除两条内部 QA 示例后,我们对 98 条生产 trace 进行了评分。冻结的参考集包含 61 个已知失败和 37 条未标注失败的 trace:39 个失败来自最初的人工审查,另有 22 个来自 Braintrust 和 Arize 的发现并由我们人工验证。模型接收的是经过遮蔽的 trace,不含人工标注或审查者备注。Perplexity、Liquid、Clef Flash 和 OpenAI 接收相同的指令和序列化输入;Jev 则通过其结构化 API 接收等效的评判标准。原始对话是私密的。[↩︎](https://hamel.dev/blog/posts/decision-model-evals/#fnref3)
4. API 成本涵盖 100 次 eval 运行,每条 trace 运行一次。我们采用 [Liquid 截至 2026 年 10 月 17 日的价格](https://www.liquid.ai/pricing),d1 为每百万 input tokens $0.02,d1-ultra 为 $0.042。实验记录中 d1 的价格为 $0.04;我们已按其保存的 token 用量重新计价。其他模型使用实验运营指标中的费率。性能数据排除了两条内部 QA trace。阈值调优使用已保存的评分,无需额外的模型调用。[↩︎](https://hamel.dev/blog/posts/decision-model-evals/#fnref4)
5. 延迟取决于你如何批处理或并行化请求、你与供应商之间的协议安排,以及你与其基础设施的距离等诸多因素。批处理和并发也会改变成本和吞吐量。参见 TypeSafe 的[多问题请求](https://docs.typesafe.ai/primitives#ask-multiple-questions-together)和[客户端性能指南](https://docs.typesafe.ai/sdk/python/usage/advanced)。其[发布讨论](https://typesafe.ai/blog/introducing-system-one-models-and-jev)还指出了其延迟测试相对于其服务的位置。平均响应时间为:Jev 4.33 秒、Perplexity 7.85 秒、Liquid d1 7.38 秒、Liquid d1-ultra 1.56 秒、Clef Flash 2.09 秒、OpenAI 2.77 秒。这些数据来自不同的运行,并不构成对吞吐量或尾延迟的比较结论。[↩︎](https://hamel.dev/blog/posts/decision-model-evals/#fnref5)
6. 这些例子说明了错误的后果如何影响权衡。在美国刑事审判中,[排除合理怀疑的证明](https://www.law.cornell.edu/wex/reasonable_doubt)为定罪设置了很高的门槛。在癌症筛查中,漏诊可能延误治疗,而误报则可能导致焦虑和不必要的操作。筛查阳性结果通常需要进一步检测。[NCI 解释了这两种风险](https://www.cancer.gov/about-cancer/screening/patient-screening-overview-pdq);恰当的平衡取决于筛查检测手段和人群。[↩︎](https://hamel.dev/blog/posts/decision-model-evals/#fnref6)
7. 密度图展示的是无约束的 F1 调优,即在我们引入最低 precision 和 recall 要求之前的结果。后面的对比图表在可行的情况下将这些要求应用于候选模型。所有这些都使用相同的五折交叉验证切分。阈值在训练 trace 上选定,而 precision、recall 和 F1 则在单独的 trace 上测量。我们把这些测量值在重复切分上取平均。在优化后的密度图中,虚线表示所选阈值的平均值。图中显示的分数来自各个切分,而不是将该平均阈值应用于整个数据集。密度曲线使用带宽为 0.07 的高斯平滑,并在 0 和 1 处做反射。每个类别的曲线面积均为一。平滑仅影响显示效果。[↩︎](https://hamel.dev/blog/posts/decision-model-evals/#fnref7)
8. precision-recall 曲线描绘的是决策阈值变化时 precision 与 recall 之间的关系。它展示了模型在各阈值下可用的权衡。Scikit-learn 的 [precision-recall 指南](https://scikit-learn.org/stable/auto_examples/model_selection/plot_precision_recall.html)解释了如何读取和绘制这些曲线。[↩︎](https://hamel.dev/blog/posts/decision-model-evals/#fnref8)

9. 我们从全样本的 precision-recall 曲线中识别候选。在每个训练划分中，我们从达到至少 80% precision 和 80% recall 的阈值中选取 F1 最高的阈值。当没有任何阈值符合条件时，我们使用无约束的 F1 最优值，并将该划分记录为不可行(infeasible)。这种情况在 100 个训练划分中，Perplexity 出现了 36 次，Liquid d1-ultra 出现了 29 次，OpenAI 则从未出现。非候选始终使用无约束的 F1 调优。我们保留了所有验证预测，包括来自回退划分的预测，计入报告的平均值。这些最小值仅在选择期间适用，并不能保证在新样本上达到相同性能。[阈值选择审计](https://hamel.dev/blog/posts/decision-model-evals/charts/threshold-selection-audit.json)记录了每个划分，但不包含 trace ID。[↩︎](https://hamel.dev/blog/posts/decision-model-evals/#fnref9)
10. 校准后的失败概率为 0.80 意味着，在众多得分接近 0.80 的样本中，大约 80% 包含失败。Platt scaling 和 isotonic regression 使用带标签的样本来学习从模型得分到概率的调整。Platt scaling 拟合一条 sigmoid 曲线。Isotonic regression 拟合一种更灵活、且保持得分顺序的映射，但在小数据集上更容易过拟合。两者都不保证在新样本上有所改进。Scikit-learn 的[概率校准指南](https://scikit-learn.org/stable/modules/calibration.html)解释了这两种方法以及如何评估它们。[↩︎](https://hamel.dev/blog/posts/decision-model-evals/#fnref10)
11. 可靠性图表将每个模型的得分按概率排序，分成五组，每组 19 或 20 个 trace。调整后的得分是每个 trace 在保存的 cross-validation 结果中的平均 out-of-fold 概率。我们将 Platt scaling 拟合到原始概率的 log-odds 上。每个映射在拟合时都不包含它所预测的 trace。该图表只是对这一小样本的总结，并不能确定未来某个 trace 的精确失败率。[绘制的校准结果](https://hamel.dev/blog/posts/decision-model-evals/charts/calibration-reliability-data.json)以 JSON 格式提供。[↩︎](https://hamel.dev/blog/posts/decision-model-evals/#fnref11)
12. 在保存的 out-of-fold 概率汇总上，Jev 的 Brier score 调整前为 0.187,调整后为 0.188。Liquid d1-ultra 的分别为 0.173 和 0.172,而 OpenAI 的分别为 0.159 和 0.164。Brier score 衡量的是平均平方概率误差，因此越低越好。它同时反映区分能力(discrimination)和校准(calibration)。这些结果描述的是图表中展示的 log-odds Platt 拟合。在相同的 folds 上直接对概率进行探索性重新拟合，使 OpenAI 的 Brier score 达到了 0.154。这说明了结果对拟合方法的敏感性，但并不能确定哪种方法在新数据上效果最好。[↩︎](https://hamel.dev/blog/posts/decision-model-evals/#fnref12)
13. [GEPA](https://arxiv.org/abs/2507.19457) 利用模型运行的反馈来提出 prompt 修订建议，并对照带标签的样本进行测试。它会保留具有不同优势的候选项，因此一个有助于困难样本的 prompt 可以继续留在考虑范围内。错误的标签可能会将这一搜索引向错误的修改方向。请在 prompt 开发之外保留一个[独立的测试集](https://hamel.dev/blog/posts/evals-faq/how-do-i-know-if-i-can-trust-my-automated-eval.html),用于最终检查。在我们对 Jev 的小型手动实验中，默认阈值下的 F1 从简单 prompt 的 0.78 提高到包含失败类型清单的 prompt 的 0.80。该实验并未使用 GEPA,也未确定系统性优化能带来多大帮助。我们关于[如何选择 eval 模型的 FAQ](https://hamel.dev/blog/posts/evals-faq/what-model-or-llm-should-i-use-to-build-automated-evals.html) 讨论了 prompt 优化和模型比较。[↩︎](https://hamel.dev/blog/posts/decision-model-evals/#fnref13)
