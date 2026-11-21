---
title: "Claude Code 团队公开让 AI 自己检查代码的方法：想同时开几十个 Claude 一定要看"
date: 2026-11-17T00:00:00.000Z
tags: ["AI 实操", "Claude Code", "代码审查", "测试", "Agent", "验证循环"]
summary: "没有验证循环，你同时只能开一两个 Claude，因为每份改动都得自己看；有了它，可以开几十上百个。"
---
> **原文链接**: [https://claude.dev/blog/how-the-claude-code-team-thinks-about-verification/](https://claude.dev/blog/how-the-claude-code-team-thinks-about-verification/)
> **来源**: claude.dev
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/claude-code-verification/) · 2026/11/17
> **说明**: 本文由 AIHot汪 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

在 Claude Code 团队，我们绝大部分代码（约 90%）都是由 Claude 编写并[由 Claude 审查](https://claude.dev/blog/solving-code-review-at-anthropic/)的。在这样的规模下，如何让我们的 agent 能用证据来验证自己的工作就变得极其重要。

验证循环（verification loop）是让你能把更多工作委派给 Claude 的基本构件。没有它们，你实际上一次只能运行一两个 Claude，因为所有事情都得你自己检查。有了它们，你就可以并行运行数十个甚至数百个。

这是因为给 agent 提供[一种验证其输出的方法](https://claude.com/blog/building-verification-loops-in-claude-code-with-skills)是提升质量的有效途径。在围绕结构化文件生成的内部测试中，用一个独立的 grader 依据 rubric（评分标准）检查 Claude 的工作，相比标准 prompting 循环[最多可将任务成功率提升 10 个百分点](https://claude.com/blog/claude-managed-agents)，而在最难的问题上收益最大。

过去验证起来成本高昂的东西（测试、benchmark、spec、真实的端到端运行），如今让 agent 来做已经变得很便宜。和代码一样，agent 可以快速生成测试、benchmark 和 spec。而一旦生成，这些测试和 benchmark 就以软件的形式运行，因此可以频繁运行而不会消耗太多额外的 token。

你还可以利用验证结果来改进 agent 在该任务上的表现，从而闭合验证循环。例如，如果某个 agent 反复未通过一项检查日志中是否包含用户数据的测试，你可以创建一个 hook，或在你的 CLAUDE.md 中写一条更明确的规则，以避免将来再次出现问题。这样（基本上）能防止问题再次发生。

既然验证对高速产出高质量代码至关重要，那么你应该使用哪些类型的测试，又该如何在整个 pipeline 中应用它们呢？本文回答这些问题，并分享 Claude Code 团队所使用的流程。

### 并非所有测试都生而平等：值得投入的 3 类测试

无论你选择哪种测试类型，都有一些失败模式需要避免。

如果你的测试不稳定（flaky），你会把 agent 训练成重新跑一遍测试，而不是修复失败的代码。如果你的测试很慢，agent 在每个批次中会做更少的测试，这会让定位问题变得困难。较重的测试最好在你提交（commit）更改之前部署。

下面就是我认为最值得投入的三种测试类型。

#### E2E 测试

如果只能专注于一种测试类型，那就选端到端（E2E）。这类测试描述真实的用户流程，比如把商品加入购物车、结账，然后跳转到确认页面。

E2E 测试之所以如此有效，是因为它们很难被糊弄——整个功能要么能用，要么不能用。它们还有明确的完成标准，并能具体告诉你哪里坏了。

![单元测试失败与端到端测试失败的对比。左侧：checkout.test.ts 只显示 “FAIL checkout.test.ts / Error: Timeout after 30s”，配文为“盲打。没有步骤，没有踪迹。”右侧：checkout.spec.ts 显示步骤追踪（Register、Add item to cart、Checkout failed、未到达 See confirmation page）、一张 shop.example/checkout 的截图，其中有“Payment form failed to load”提示和一个禁用的“Place order”按钮，以及“失败步骤：Checkout：‘Place order’保持禁用，因为支付表单始终未加载”，配文为“截图、追踪，以及对失败步骤的描述。”](https://claude.dev/media/3c9c60f4b0696a20f33ef62b6ddcb99c322fd19c440c28de234a6c804f7912a4.png)

**图 A**单元测试可能只显示 “Error: Timeout after 30 seconds”，而端到端测试则能通过截图告诉你具体哪里出了问题。

单元测试虽然更快、更稳定，但有可能全部通过却依然把功能搞坏了。这是因为无论 agent 还是测试，都不理解完整的任务。

对于 E2E 测试，让 agent 能实际操作和观察真实运行的系统会很有效。你可以用一个 skill 来启动、驱动和检查应用，工具可以是 [CDP](https://chromedevtools.github.io/devtools-protocol/)、模拟器或 API harness。

功能图谱可以作为 Agent 的指引和评分标准，因为它们通常从用户视角列出功能，并附上路径、键盘快捷键、selector 和预期结果的描述。

#### Property tests: 不会被打破的约束

很多测试都基于你认为可能出问题的地方。Property tests 关注的是人们容易忽略的边界情况，而这正是 Agent 经常失败的地方。

你先写下一个你认为不可能失败的命题，然后使用测试库(JS/TS 用 [fast-check](https://fast-check.dev/)、Python 用 [Hypothesis](https://hypothesis.readthedocs.io/en/latest/)、Rust 用 [proptest](https://proptest-rs.github.io/proptest/) 等)生成数千个输入，试图证明该命题不成立。

几乎每个软件项目中都存在许多这样的性质，例如：

- **往返编码(Round-trip encoding)**:“如果你对 X 进行编码后再解码，你会得到 X。”这同样适用于解析和序列化。
- **不变量(Invariants)**:必须始终为真的东西，比如“账户余额永远不能变为负数”。
- **幂等性(Idempotency)**:执行一个操作(迁移、归一化、重试)两次的效果与执行一次相同。
- **等价性(Equivalence)**:优化后的代码与朴素但正确的代码产生相同的结果。

Property 库是让 Agent 保持诚实的好方法，因为它使用了与编写原始代码的 Agent 不同的偏见生成的边界情况。它们对于重写(rewrite)场景也特别有用——当 spec 已经偏离生产行为、不再作为可靠的验证依据时。

#### Differential tests: 旧系统就是 oracle

Differential tests 对于[大规模迁移](https://claude.com/resources/articles/ai-code-migration)用例尤其有效，因为在这类用例中，功能预期保持不变。对于这类测试，你用相同的输入分别运行旧系统和新系统，看结果是否不同。如果不同，就存在一个需要修复的 bug 或破坏性变更。

Differential tests 的关键在于使用随机生成的输入或生产流量的样本。你还需要对无关因素(如空白字符)进行归一化，并维护一份已批准变更的清单，以应对新环境理应不同于旧环境的情况。

### CLAUDE CODE 团队如何看待验证

我们之前写过[Anthropic 的 code review 是如何运作的](https://claude.dev/blog/solving-code-review-at-anthropic/),但这篇文章旨在更深入地探讨我们如何验证我们的工作。

#### 验证意味着运行变更

端到端运行应用比测试更重要。你不会不经模拟器验证就直接发布 iOS 变更，Claude 也是如此。

Claude 可以像人类或 QA 工程师那样测试整个应用。对于 web 变更，让它使用 Claude Chrome 扩展；对于移动端，使用 iOS 或 Android MCP;对于桌面端，使用 computer use;对于后端工作，让它在本地运行服务。

为了固化如何启动模拟器或运行你的应用，创建一个名为 verify 的 skill。把它放在仓库中的 .claude/skills/ 文件夹里，尽量靠近相关代码，并按需添加任意数量的 skill。Claude 知道在提交变更之前使用 verify skill。

然后在让 verify skill 快速可靠这方面投入精力。让 Claude 对其进行迭代和压力测试。它是你的 smoke test 测试框架，所以你要让它坚如磐石。

当你给 Claude 提供一种端到端 smoke test 其变更的方法时，你会得到好得多的结果。你会看到它更快地迭代并捕捉到真实的错误，就像人类一样。这就是我们在 Anthropic 测试几乎所有变更的方式。

#### 失败的测试需要人工关注

没有人能读完每一个变更，所以我们把失败作为决定哪些变更需要人来处理的一种方式。Claude 运行检查并尝试修复所有失败的问题。如果某个检查在三轮之后仍然失败，Claude 会停下来并引入人工介入。

#### Code owners 编写自己的检查

代码的 owner 为自己的代码编写检查，并不断打磨，直到检查能标记出 owner 本人会标记的问题。当某个检查拉入一位 reviewer 时，它应该说明原因，这样 reviewer 就不必从 diff 中自行推断。

#### 可靠性检查基于 diff 触发

我们维护一份包含 39 项的可靠性清单,每一项都有一个可以从 diff 中读出的触发条件、一项检查,以及它背后对应的事故或 PR。其中一项是 “--resume 能加载旧的 transcripts”。当 session 存储或消息类型发生变化时,我们会追问新字段能否被安全加载,因为更早的 transcripts 中不会包含它。

Claude 会读取 diff,只检查触发条件与之匹配的条目——通常是 3 到 10 条——这样就无需任何人记住过去的事故。

#### 一个评审者,多轮评审

我们不会通过叠加更多评审者来改进评审。在主评审者之上再加一个更昂贵的第二评审者,往往比调优主评审者的做法效果更差。相反,我们用一份 [REVIEW.md](https://code.claude.com/docs/en/code-review-customize) 来说明评审者针对这段代码应当关注什么。

我们还认为评审和验证的各轮之间应当相互承接。每一轮检查我们都会指向早前轮次的上下文和过去的失败记录,而不是从头重新检查所有内容。这样成本更低,发现的问题也更多。

#### 变更不能修改针对自身的检查

如果一个变更可以修改评判它的检查,那么这个检查就已经失效了。Code Review 会从 base 分支或默认分支读取 REVIEW.md 文件,[绝不会从 pull request 的变更中读取](https://code.claude.com/docs/en/code-review-customize)。Claude Code 团队确保对变更起把关作用的规则放在变更无法修改的分支上。

Claude Code 团队还把评审绑定到特定的 commit。如果有人在评审进行的同时推送了代码,评审结果就不再有用。在一个过时的 commit 上通过的评审毫无意义。

团队还会先运行廉价的检查。如果一个 Agent 在本地测试之前就推送代码,它既消耗了共享的评审和 CI 时间,而这些 bug 本可以由它自己发现。在我们团队,Claude 会在打开 pull request 之前运行测试、build 和 linter。你可以用一个在 Claude 结束时运行测试的 [hook](https://code.claude.com/docs/en/hooks) 来强制执行这一点,或者设置一个以测试套件全部通过为目标的 [/goal](https://code.claude.com/docs/en/goal)。

#### 以 observe 模式启动新的门禁

在我们自己的仓库中,我们为每个 commit 打上验证方式的标记。这个标记甚至包含 "none",这样我们就能查询未经验证的 commit。

我们还创建了一个 commit 门禁,当 session 中不包含 /code-review 或 /verify 时,它可以阻止 commit。我们为它配置了 off、observe 和 enforce 三种模式。

observe 模式会记录原本会被阻止的内容,这样我们就能审查任何误报,并确保没有人受到影响。

enforce 模式会阻止 commit。任何 commit 都可以在其 message 中附带说明,解释它为什么未经验证。如果 session 中已经有两个 commit 被阻止,下一个将被放行,以免 Claude 卡住——Claude Code 并不完美。

#### 用真正重要的内容测试你的检查

Claude Code 团队也会定期评审这些评审者本身。我们追踪有多少已合并的变更被 revert、有多少变更在合并前被维护者拒绝,以及一个规模匹配的、始终保持干净的变更子集。

这也可以通过正式的 evaluation 来实现。在我们的[代码评审博文](https://claude.dev/blog/solving-code-review-at-anthropic/)中,我们描述了 Code Review 团队如何基于以往的事故和 revert 搭建了一套 evaluation。他们会对每个示例将仓库重建到评审时的状态,并提供一句话的答案要点,说明 bug 是什么。只有正确描述了对应 bug 的发现才能得分。他们将已合并且保持稳定的变更作为对照组,以防止过度标记。他们的 tuning 集与他们用于评估系统的固定测试集是分开的。

他们还分别评估了原始发现、验证之后以及最终评审阶段的 recall rate。这能让他们看出系统是否丢失了它本来已经找到的 bug。任何将这些视为单一端到端分数的 evaluation 都无法捕捉到这种细微差别。

除了有效性之外,我们关心的另一个维度是这个改动有多重要。一个好的评审者能发现大多数技术上成立的问题,但人们关心的是某个 bug 到底是 must-fix、should-fix 还是 nit。

Code Review 拥有完全相同的理念，它会将问题标记为 [Important（重要）、Nit（小瑕疵）或 Pre-existing（已有问题）](https://code.claude.com/docs/en/code-review-pull-requests)。“Pre-existing”标签意味着审查者不应让作者为已经是 Bug 的问题承担责任。

最后，Claude Code 团队将召回率调整到这样一个程度：任何进一步的提升都会导致对评估集过拟合，而不是真正发现 Bug。

#### 将遗漏转化为规则

在 Claude Code 仓库中，我们有两种将遗漏案例转化为规则的方法。第一种是从人工代码审查评论和 PR 回滚中提取模式，以识别常见问题。这些模式必须在至少两个 PR 中出现，并且能够从差异（diff）中识别出来，才能被视为潜在规则。三个 Agent 将尝试反驳这些规则，然后由人类在 PR 中进行审查和批准。

第二种方法是将三个 Bug 查找器针对与已知事故相关的 PR 进行回放。如果至少有两个查找器发现了该 Bug，则这是一个可检测的 Bug。如果该 Bug 在小型差异中被遗漏，那么这就是一个值得在 `REVIEW.md` 中转化为规则的缺口。

不稳定的测试（Flaky tests）也接受同样的处理。Claude 不能跳过它们、添加休眠或重试直到通过。如果它无法找到根本原因，它会删除该测试并记录原因。

规则也需要清理。测试套件、验证步骤和 `.md` 文件如果不加以管理只会不断增长，因此我们会定期整理它们。

### 好的测试，好的结果

我们发现，让你的 Agent 能够通过强大的反馈循环来验证其工作，这是产生巨大差异的关键。对待你的验证层，就像对待任何其他系统一样。让它远离它们所评判的变更，根据对你重要的 Bug 对其进行评分，并在它们遗漏某些内容时记录教训，以避免再次发生，同时修剪这些教训，以保持其运行价值。

做到这一点，你的工作将从阅读每一个差异转变为定义“完成”的标准并审查证据，这正是让你能够同时运行多个 Claude 的关键。
