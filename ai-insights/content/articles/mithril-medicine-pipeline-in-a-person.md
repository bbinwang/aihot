---
title: "Anthropic 收购一家药企 公司只有一个人：一个研究员如何用 Claude 协调 11 家实验室"
date: 2026-10-28T00:00:00.000Z
tags: ["洞察", "Anthropic", "一人公司", "AI 制药", "聚合"]
summary: "只有一名全职员工，Cody 却能借助 Claude、顾问和 11 家外部实验室推进药物研发。一人公司的新可能，发生在这些工作的连接处。"
---
> **原文链接**: [https://www.anthropic.com/research/early-progress-drug-development](https://www.anthropic.com/research/early-progress-drug-development)
> **来源**: www.anthropic.com
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/mithril-medicine-pipeline-in-a-person/) · 2026/10/28
> **说明**: 本文由 AIHot 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

*Anthropic 的[生命科学团队](https://www.anthropic.com/science)致力于加速疾病治愈。在过去几个月里,我们的科学家与六家开发新药的组织开展了深入的研究合作:[BigHat Biosciences](https://www.bighatbio.com/)、[Bristol Myers Squibb](https://www.bms.com/)、[Divergence Labs](https://divergencelabs.com/)、[Enveda](https://enveda.com/)、[Generate Biomedicines](https://generatebiomedicines.com/) 和 [The Column Group](https://www.thecolumngroup.com/)。我们也已启动自己的药物研发工作。在此过程中,我们对 Claude 如何支持药物开发、以及我们需要如何进一步改进 Claude 才能实现 AI 在医学领域的潜力有了诸多了解。我们计划在此基础上大幅扩展这项工作*。

加速药物开发的机会很多,甚至超出了人们最常讨论的 AI 应用,比如为新分子[提出初始设计](https://www.anthropic.com/research/Claude-accelerates-protein-design)。开发一种药物涉及许多不同的任务:开展早期研究以确定药物靶点以及与之作用的合适药物类型、设计具有理想性质的分子、对其进行优化以便能可靠地规模化生产、起草开展临床试验所需的监管申报文件、设计并管理这些临床试验,等等。

我们实现 AI 医学效益的战略,是让 AI 越来越深入地参与所有这些任务。不存在某个单一的待解决问题;瓶颈遍布药物开发流程的各个环节。识别并攻克这些瓶颈的最佳方式,就是深入参与真实的药物项目,覆盖多种不同的疾病领域和开发阶段。

因此,在过去几个月里,我们与六个组织合作开展这项工作。我们也已启动自己的药物研发项目,包括针对儿童罕见型肌营养不良症的项目,在这些项目中 Claude 承担了大量的科学和运营工作。

这项工作从三个方面服务于我们的目标。首先,它让我们能够更好地理解我们的模型在更广泛的药物开发任务中的优势与局限(基于迄今为止的所学,我们已优先规划了针对模型的具体改进)。其次,这些项目可以作为面向更广泛生命科学社区的案例研究。如果要让 Claude 显著提升新疗法的产出速度,我们需要与更多生物技术公司合作,并将 Claude 更深度地整合到它们的开发流程中。第三,如果这些项目的良好态势得以延续,它们本身也应产生直接影响。我们乐观地认为,其中一些项目可能会为它们所针对的疾病带来有效的新药,包括食物过敏、儿童罕见病和多种癌症。

在这篇文章中,我们提供了与合作伙伴协作进展的最新情况,并附上更详细描述我们思考过程、方法和早期结果的技术报告与预印本。随后我们简要概述了这项工作接下来的方向。

### 案例研究

**Generate Biomedicines:模态工程(modality engineering)。** Generate Biomedicines 一直在致力于提升一种名为 CAR T-cell therapy 的癌症疗法的实用性。这种疗法历来用于治疗血液肿瘤;Generate 旨在对其进行重新工程改造,使其也能治疗实体瘤癌症。为此,他们计划缩短该疗法遗传指令中的一部分,从而为适用于其他癌症类型的额外指令腾出空间。六位 Generate 科学家使用 Claude Code 为这一部分提出了新设计。其中一个设计比标准版本短约 70%,并且在实验室测试中表现更为有效:它使免疫细胞能产生大约 10 倍数量的受体(即它们用于识别癌细胞的蛋白质),能更高效地杀伤肿瘤细胞,并且免疫细胞保持活性的时间更长。欲了解更多,请参阅 [Generate 的技术报告](https://generatebiomedicines.com/publications/refactored-intracellular-domains-enhance-car-expression-and-function/)。

**Divergence Labs:hit(苗头化合物)生成。** Divergence Labs 正在研究一种治疗食物过敏的新型方法。食物过敏由一种名为 IgE 的分子引发的反应所触发,其中一部分附着在我们的免疫细胞上,另一部分则游离于血液之中。Divergence Labs 正在开发的药物可以将 IgE 从免疫细胞上彻底剥离,而不是像标准药物那样仅中和循环在血液中的 IgE。这可能带来疗效显著更佳的治疗手段,但这需要一种精确的设计,具有两条"臂":一条与 IgE 紧密结合,另一条帮助将 IgE 从免疫细胞上撬离。Claude 将 Divergence Labs 的目标转化为一份详细的设计方案,随后在很大程度上自主地于约一个月内生成了约 35,000 个抗体设计,供后续筛选和测试。在这些早期测试中,Divergence 为两条"臂"均找到了 "hit":三个能够与 IgE 结合的设计,以及 20 个能够将 IgE 撬离的设计。这 20 个设计中有 3 个撬离 IgE 的效果优于标准药物。下一步是构建一种将两条"臂"结合于一体的药物。了解更多信息,并参阅 [Divergence 的技术报告](https://divergencelabs.com/publications/ige-preprint.pdf)。

**BigHat Biosciences:lead(先导化合物)优化。** BigHat Biosciences 将 AI 与自动化实验室相结合,以改进潜在药物(即 "lead"),这些药物必须与靶点紧密结合,在制造和储存过程中保持稳定,并避免聚集结块(此外还有其他多项标准)。BigHat 的科学家与一位 Anthropic 研究员合作,利用 Claude 改进两种 lead 的上述三项特性——两者均为抗体片段,可能成为未来药物的组成部分:一个旨在靶向癌细胞,另一个旨在延长药物在体内的存留时间。Claude 接入了 BigHat 的实验室数据系统 Reccy,为每个分子提出了修改建议,BigHat 的实验室在大约 10 周内制造并测试了约 1,010 个变体。中途,团队怀疑标准的热稳定性与聚集度指标存在误导性。Claude 与该研究员重新分析了原始数据,随后提出了不同的指标以及一套用于验证这些指标的流程变更方案。BigHat 的科学家对其加以完善并执行,主要预测均得到验证。与原始版本相比,最佳版本与靶点的结合能力提高了 10 倍以上,靶向癌细胞的 lead 在高出 18°C 的温度下仍保持溶解状态,而用于长效药物的 lead 聚集速度慢了 100 倍以上。了解更多信息,并参阅 [BigHat 的技术报告](https://www.bighatbio.com/bighat-anthropic-collaboration-report-10-27-2026)。

**Enveda:制造与申报。** 要开展临床试验,公司需要提供记录,证明每一批新药均严格按照质量标准生产,并向监管机构提交申请,此外还有其他要求。在 Enveda,生产化学家们曾将多达 75% 的时间花在文书工作上。为减轻负担,Enveda 构建了一套系统,将其所有生产文档与 Claude 相连,再让 Claude 标记出任何可能的问题。在对 1,061 页文档的测试中,Claude 发现了人工审核人员发现的全部 11 个问题,还额外标记出他们遗漏的 7 个问题。在这一过程中,该方法将人工审核时间减少了 89%,从超过 25 小时缩短到不足 3 小时。此外,Claude 撰写了两份重要监管文件的首稿。其中一份耗时 4 小时,而人工完成大约需要 3 个月;另一份经 Enveda 标准的人工审核流程仅发现一处小错误。了解更多信息,并参阅 [Enveda 的技术报告](https://enveda.com/CMC-Document-Processor/)。

**The Column Group(TCG):公司创建。** 由于药物发现过程缓慢、昂贵且容易失败,生物技术公司的投资者往往更青睐更安全、此前已获验证的想法,而非风险更高的新想法,即便后者能够帮助更多患者。我们一直在与 TCG 合作,探究 Claude 能否通过缩短药物发现所需的时间和成本来改变这一局面,让投资者能够放心支持更大胆的想法。具体而言,TCG 正在成立 Pleiades,这是一家新公司,将利用 Claude 运行比小团队常规水平多得多的——也更复杂的——药物项目。这可以成为一个范例,展示 Claude 如何同时降低运营一家生物技术公司所需的科学层面以及运营和行政层面的开销。如果这一模式奏效,它可以在整个行业复制推广,并将投资引向医学中更为困难的问题。Pleiades 目前正在为 Claude 开发新的工具和工作流程;其首个 Claude skill(用于帮助 Claude 评估药物靶点是否值得投入)已在 45 个靶点-疾病对上完成评估。了解更多信息。

最近，我们还开始与 [Bristol Myers Squibb](https://www.bms.com/)(BMS)合作，寻找并解决临床试验规划中的瓶颈。BMS 正在使用 Claude 评估早期药物的临床试验方案，并估算这些试验成功的可能性。我们双方计划在 2027 年扩大这项工作，以了解其在提高早期研发成功概率方面的潜力。

> *“我们在临床试验阶段使用 Claude 分析专有数据、制定临床研究方案，并权衡研究成功的几率。仅凭一个 prompt,Claude 就生成了一份可靠的初步分析，帮助我们评估不同的研发选项——而这些工作原本需要数天才能完成。我们在确保高度敏感数据安全的前提下完成了这一切。我们期待将这项工作扩展到我们的整个研发管线，以支持组合层面的决策。”*

***Michael Pourdehnad, MD**,高级副总裁，血液学、肿瘤学与细胞治疗早期临床开发负责人。*

除了与这些合作伙伴的合作之外，我们也开始自己运营一些研究项目。我们收购了 Mithril Medicine——一家致力于开发针对两种罕见类型肌营养不良症疗法的一人公司。其创始人 Cody Tranbarger 使用 Claude 来管理合同、后勤事务以及与 11 家外部实验室的合作实验，并将 Mithril 运营的许多其他方面委托给 Claude。因此，Mithril 在不到 18 个月的时间里，将一种针对某类肌营养不良症的潜在疗法从一个想法推进到在小鼠实验中取得令人鼓舞的结果。现在，Cody 已加入 Anthropic,正在继续这项研究，并计划启动几个新项目。如果他的候选药物持续表现良好，我们预计最早在 2028 年底就会有一种药物准备好开始人体临床试验。了解更多信息，请查看[我们的技术报告](https://www-cdn.anthropic.com/52e1f5d50c47ca3818f56704c27cf19e59b62e77.pdf)。

### 扩展我们在生命科学领域的工作

所有这些研究仍处于早期阶段。特别是，到目前为止，这些工作大多还处于*临床前*阶段——也就是说，在很大程度上，尚未进入在人体上测试药物的阶段。随着这些药物项目的推进，以及我们与更多药物研发项目已进入临床阶段的组织开展合作，我们计划继续将 Claude 的角色扩展到临床试验中。

这项研究只是我们加速药物发现努力的一部分。最终，我们希望与尽可能多的药物研发研究人员共享我们的模型。为此，我们推出了面向研究人员的 AI 工作台 [Claude Science](https://www.anthropic.com/news/claude-science-ai-workbench),并为生命科学家提供 [Claude credits](https://www.anthropic.com/news/ai-for-science-program)。我们还创建了[生命科学验证计划(Life Sciences Verification Program)](https://www.anthropic.com/news/life-sciences-verification-program),允许受信任的组织在更为宽松的安全防护版本下使用我们最强大的模型——这些安全防护对于防止滥用必不可少，但也可能阻碍合法的生物学研究。我们最近还发起了生命科学领域[客座研究员的公开征集](https://www.anthropic.com/news/open-call-guest-investigators-life-sciences);我们正在征集希望使用 Claude 研究药物发现及其他领域关键问题的研究团队的提案。

我们期待在扩展生命科学研究的过程中与更多组织合作。如果您在一家专注于药物发现的组织工作，并有兴趣与我们合作，可以通过下方方式与我们联系。

#### 联系我们

如果您在一家专注于药物研发的组织工作并希望与我们联系，请填写以下表格。
