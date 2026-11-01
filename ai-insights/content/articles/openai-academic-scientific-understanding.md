---
title: "OpenAI 宣布其内部模型在三项基础科学上取得突破：AI 写出了证明，人类还要弄懂什么？"
date: 2026-10-27T00:00:00.000Z
tags: ["研究解读", "OpenAI", "AI 科研", "数学", "Lean", "复杂性理论", "量子场论", "聚合"]
summary: "从波的短暂聚焦、SAT 算法的速度极限到量子场论的数学基础，讲清三项结果的意义，以及机器核查之后仍需完成的理解工作。"
---
> **原文链接**: [https://openai.com/index/building-scientific-understanding-with-academic-communities/](https://openai.com/index/building-scientific-understanding-with-academic-communities/)
> **来源**: openai.com
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/openai-academic-scientific-understanding/) · 2026/10/27
> **说明**: 本文由 AIHot 自动聚合(原文即中文,未翻译)。正文取自小互 AI 解读

---

全文 Markdown · 会员

作者：OpenAI10-27 · 18 分钟🎧 听播客版0:00 / --:--

[视频/音频](https://xiaohu.ai/media/openai-academic-scientific-understanding/podcast.zh-64c0a455c58a.mp3)
0:00 / --:--![](https://pic.xiaohu.ai/jiedu-media/openai-academic-scientific-understanding/social/zh-c9dcba310c16.png)

OpenAI 宣布，它的内部 AI 模型在数学、计算机科学和物理学中得到了三项重要结果：证明了波传播中的一个长期猜想，提出了打破指数时间假说的算法，并为某些四维量子场论给出了数学存在性证明。数学结果还牵动了著名的挂谷猜想和施泰因限制猜想；算法结果则挑战了数百篇论文用来判断计算难度的一个前提。

这些结果来自尚未具名的内部模型。OpenAI 把机器生成的推导视为“原始研究数据”，并邀请外部学者组织研读。数学与算法方向的自然语言稿和 Lean 形式化材料已经公开；物理方向暂缓公开原件，由学者团队自行撰写。

一份证明能被计算机检查，和一群科学家能够解释它为什么成立、把方法用于下一项研究，是两种不同的进展。

---

### 波能聚到多强，最强的瞬间能持续多久？

在偏微分方程与调和分析领域，克里斯托弗·索格（Christopher Sogge）提出了局部光滑猜想。这个猜想探讨的核心问题是：波在空间与时间中传播时，极端的能量汇聚能够持续多久？

#### 把最坏一刻和一段过程分开看

水波汇聚成巨浪，或者光线穿过透镜形成焦点，都是波在传播中的能量聚焦现象。如果在某个单一时刻对空间截面进行观察，来自不同方向和频率的波分量可能正好同相位叠加，造成局域振幅剧烈激增。如果仅按这一个瞬间的最坏情况来估计，波的峰值可能非常尖锐。

然而，波在本质上是运动和色散的。如果将观察尺度从单一片刻拉长到一段完整的时间过程，就会发现极端的瞬时汇聚无法永久维持。局部光滑猜想正是用来定量衡量这种“单时刻最坏峰值”与“时段内整体表现”之间的差异：在空间维数 n ≥ 2 的欧氏空间中，波在一段持续时间内的能量积分估计，其表现会显著优于最坏瞬间的离散极大值。在数学上，这意味着控制波动在时空柱体内的范数，所需的初始波形导数阶数比单个时间切片更低，从而获得了平滑性增益。也就是对起点波形的细碎起伏少提一些要求，仍能控制随后一段时间的整体表现。

这里的“平均”是一种数学上的观察与积分估计方式，而不是通过外力或某种操作把波强行冲散。波本身严格依照波动方程自由演化，局部的极端聚焦随着波的行进天然会向外色散。

补充查阅：形式化覆盖的 Sobolev 导数指标

在 OpenAI 发布的 Lean 形式化证明中，对于空间维数 n ≥ 2 和任意积分指标 2 ≤ p < ∞，证明给出的 Sobolev 导数阶数为 s = max(0, (n − 1) / 2 − n / p) + ε（其中 ε 为任意微小的正数）。当 p = 2 时，由于能量守恒，没有额外的导数损失（s = 0）；而当 p 偏离 2 时，光滑性增益由维数 n 与指标 p 精确决定。三维情形下，这给出了带任意小正导数损失的临界 L³ 估计。

观察阶段 正在汇聚

青线：当前轮廓；虚线：最强聚焦时的轮廓。横向为空间位置，纵向为示意振幅。

**固定在聚焦瞬间看**
不同方向的贡献可能叠在一起，出现很高的局部峰值。

**把一段时间一起衡量**
尖峰持续多久也进入计算，短暂聚焦不等于持续集中。

定性示意：形状由教学函数绘制，不是波动方程的数值求解，也不展示论文的定量界。时间平均是一种衡量方法，不会改变波本身的传播。

#### 不同方向的线段，能挤进多小的空间？

局部光滑猜想与几何学中的挂谷猜想存在着深刻的联系。在高频极限下，波的能量传播轨迹表现为沿特定方向行进的细长波包，类似一束束细窄的光线或管道。如果想要构造一个反例来打破局部光滑猜想，就需要让大量来自不同传播方向的高频波包，在极其狭窄的空间区域内发生持续、密集的重叠。

将这些波包抽象为纯几何对象，就引出了著名的挂谷问题：在 n 维空间中，如果一个集合包含各个可能方向的单位长度线段，这个集合在测度与分形维数上最小可以缩到多大？

贝西科维奇早已证明了这类集合的体积（勒贝格测度）可以严格为零。但体积为零并不代表集合没有空间广度。当我们用极小的细块去覆盖这个集合时，随着观察尺度不断缩小，覆盖所有方向线段所需的细块数量增长得非常快。这提供了理解分形维数的一种直觉。豪斯多夫维数的严格定义允许覆盖块大小不同，再考察相应的覆盖总量如何随尺度变化，不能直接等同于数同样大小的网格块。数学家猜想，在 n 维空间中，任何包含所有方向单位线段的集合，其豪斯多夫维数都必须达到满维数 n。虽然波包重叠的几何图像架起了波动方程与线段集合之间的桥梁，但几何草图本身并不能直接替代偏微分方程的严格分析证明。

补充查阅：管道体积的对数下界估计

挂谷集合虽然在勒贝格测度意义下可以具有零体积，但其豪斯多夫维数依然占满全空间维数 n。形式化证明中还包含三维管道并集体积的对数估计：对于至少 δ⁻² 根半径为 δ、方向相互 δ 分离的单位长度管道，当半径 δ 趋近于 0 时，其并集体积满足下界 c / (1 + log(1 / δ))⁶⁶。

#### 新方法怎样控制聚焦？

在学术脉络上，拉里·古斯（Larry Guth）、王虹（Hong Wang）与张瑞祥此前证明了二维波动方程的局部光滑猜想；王虹与乔舒亚·扎尔（Joshua Zahl）后来攻克了三维挂谷猜想。

本次 AI 模型提出了一种全新的辅助偏微分方程路线，将局部光滑猜想与挂谷全维数猜想推向了任意空间维度 n ≥ 2。论文提出的证明从保留波的干涉入手：先把各个方向的波叠加，再度量总波的强度。如果先把每个波的强度分别算出再相加，就丢失了聚焦时最关键的相互叠加效果。

随后，论文按方向筛选波的贡献，构造可以追踪的守恒量，再引入辅助偏微分方程，把难控制的聚焦问题转化为能量估计。最后用微分不等式，把观察时段内的波与初始状态联系起来。突破的关键在于这些构造和估计能否严格成立，直觉图像本身不能代替证明。

补充查阅：这条证明路线的技术步骤

首先，为了保留导致聚焦的干涉现象，证明必须先将各个方向的波进行叠加，然后再做模平方度量，而不是直接把各自的平方相加；
随后，通过在虚时空方向进行解析平移，按波的传播方向进行精确筛选，并利用一阶对称双曲系统构造出时间分量非负、各列散度为零的正守恒流；
接着，引入一组辅助偏微分方程，在纤维截面上求解由正守恒流决定的辅助行列式方程，将原本局部的极端聚焦几何特征，转化为一种带曲率背景的全局可控能量；
最后，通过能量所满足的标量微分不等式建立跨时间区间的比较，把观测时段内波的时空积分与初始时刻的能量状态紧密联系起来。

按照公开论文的结论，这套方法把局部光滑的结果推进到所有空间维数 n ≥ 2，并由此推出挂谷集合的满维结论。

---

### 一道真假开关题，为什么牵动算法的速度极限？

在理论计算机科学领域，OpenAI 提出了一种针对布尔公式满足解的确定性精确计数算法，声称推翻了长年被广泛引用的指数时间假说（ETH）。

#### 先问有没有解，再问一共有多少解

理解布尔可满足性问题（SAT），可以从一个具体的开关规则例子入手。假设房间里有三个开关 A、B、C，每个开关只能处于“开”或“关”两种状态。现在给出几条必须同时满足的要求：

- 第一条：A 为开，或者 B 为关；
- 第二条：B 为开，或者 C 为开；
- 第三条：A 为关，或者 C 为关。

寻找是否存在一种开关状态组合，使得所有要求同时得到满足，就是 SAT 问题。当每个条件限制的开关数量至多为 k 个时，该问题被称为 k-SAT。

除了判定“是否存在至少一组可行解”，还有一个难度更高的问题是“精确计算一共有多少组满足解”，即精确计数问题。如果能准确算出可行解的总数，只要该数字大于零，就自然判定了公式的可满足性。

1. A 开 或 B 关**满足**
2. B 开 或 C 开**冲突**
3. A 关 或 C 关**满足**

当前组合：关、关、关。有条件冲突，不是解。

**一共有 2 个解**

统计所有 8 种组合，2 种能同时满足三条条件。计数大于 0，就回答了“有没有解”。

对照全部 8 种组合

| A / B / C | 三条条件是否全部满足 |
| --- | --- |
| 关 / 关 / 关 | 否（第 2 条冲突） |
| 关 / 关 / 开 | 是 |
| 关 / 开 / 关 | 否（第 1 条冲突） |
| 关 / 开 / 开 | 否（第 1 条冲突） |
| 开 / 关 / 关 | 否（第 2 条冲突） |
| 开 / 关 / 开 | 否（第 3 条冲突） |
| 开 / 开 / 关 | 是 |
| 开 / 开 / 开 | 否（第 3 条冲突） |

此处逐个枚举小例子的组合，帮助理解 SAT 与计数的关系；它没有实现或复现论文提出的新算法。

#### 一个长期使用的速度假说被挑战

对于包含 n 个布尔变量的公式，通过逐一尝试所有开关组合，总共需要检查 2ⁿ 种可能。在最坏情况下，是否存在比这种指数级穷举快得多的通用算法？

拉塞尔·因帕利亚佐（Russell Impagliazzo）与拉马莫汉·帕图里（Ramamohan Paturi）等人提出了指数时间假说。该假说猜测：在最坏情况下，求解 3-SAT 问题无论如何优化算法，其运行时间都无法摆脱 2 的正线性次方增长（即 2 的常数乘 n 次方）。在此后的研究中，指数时间假说成为理论计算机科学中极其重要的研究假说。学者们以“假定该假说成立”为前提，推导出了图论、计算几何与复杂性分类中诸多问题的计算难度下界。

如果指数时间假说被算法推翻，需要准确理解相关结论的演变：原先那些推导在逻辑形式上是完全成立的条件命题（即“若假说成立，则某问题具有某下界”）。一旦假说的前提被否定，我们便不能再单凭该条件命题来断言原问题具有相应的无条件下界；但这绝不意味着原下界已经被推翻，也不能泛称所有结论都退回未被证明——许多问题的下界仍然可以依托其他尚未被否定的前提，或者有待学者寻找新的无条件证明路径。

#### 比指数增长慢，离高效求解还有多远？

本次 OpenAI 提出的算法，能够对任意固定的子句宽度 k，在次指数时间内精确计算满足解数量。

在理论定义中，次指数增长率是指其指数部分随规模 n 的增长严格慢于线性增长。需要注意的是，广义的次指数范围本身包含多项式时间（因为多项式增长 nᶜ 的指数形式增长率也是次线性的）。但本次算法给出的上界仍然具有指数依赖，未提供多项式时间保证；同时，我们也不能单凭该上界就反推算法“不可能提供多项式时间”或断言其在实际中必然超多项式。P 与 NP 是否相等，依然是尚未解决的问题。

在具体给出的运行时间界限上，形式化代码与论文预印本展示了不同精细程度的保证：前者在指数中包含 (log log n)² 因子，后者则少了一个 log log n 因子；当公式的子句数量与变量数量成线性比例时，还可以得到更强的指数改善。

补充查阅：精确计数算法的渐近时间上界

在 Lean 形式化代码覆盖的有理插值算法中，对于包含 n 个变量、编码长度为 L 的规范 k-CNF 公式，确定性计数时间上界为 (L + 1) 的多项式阶乘以 2 的 O_k(n (log log n)² / √(log n)) 次方，且整个运行过程仅占用多项式大小的内存空间。

在论文正文中，通过张量网络收缩分析将时间界限优化为：输入规模的多项式阶乘以 2 的 O_k(n log log n / √(log n)) 次方；当子句数量 m 与变量数量 n 满足 m ≤ Dn 时，进一步改善为输入规模的多项式阶乘以 2 的 O_{k,D}(n / √(log n)) 次方。

#### 新算法怎样拆开互相牵连的条件？

针对一般布尔公式的精确计数，为什么能突破传统的正线性指数瓶颈？算法在方法上建立了一套清晰的代数插值框架：

首先是变量分组与组间约束的解耦。如果把 n 个变量划分成若干个小组，在理想情况下，如果每个约束只涉及组内变量，那么只需在各个组内独立枚举局部解，总耗时就会大幅降低。然而，实际公式中的子句往往横跨不同组的变量，组间约束紧密交织，通常无法直接独立拆解。

论文的做法是先固定各组共同遵守的一组测量值，让各组分别计算贡献，再汇总这些贡献。这里的测量值必须足以承接组间依赖，数量也必须受控；随便给变量分组并不能做到这一点。

为实现这套构造，算法引入了一个辅助插值参数 T，为每个变量出现构造了低阶的线性替换形式。在 T = 0 时，替换形式严格还原原本的布尔变量；而在选定的非零采样点上，替换形式把跨组之间的复杂依赖，归结为数量受控的一组、在各组之间共享的整数线性测量摘要。一旦这几个共享测量值被固定，各个组对公式的贡献便可以互相独立计算，每个组只需在固定测量值的前提下枚举局部赋值并求和。对每一组可能的共享测量值，把各组贡献相乘，再对所有测量组合相加，才能恢复全局计数。

替换形式被构造成一个次数受控的代数关系，因此取得足够的采样值和相应导数信息后，可以恢复它在原始位置 T = 0 的答案。这一步称为代数插值。

最后，通过代数插值重构精确计数。借助特殊的置换矩阵构造，替换形式的代数次数被严格控制。算法在各个非零采样点处利用容斥原理提取出局部的低阶泰勒展开系数，再通过有理埃尔米特插值，精确重建出公式在 T = 0 时的取值，从而直接得到原始公式满足解的准确总数。对于一般子句较多的公式，算法还通过保持解计数的稀疏化分解与扩展图校验，将问题规约为变量出现受控的稀疏多项式方程组公共零点计数，从而整体跑通次指数流程。

---

### 物理预测已经很成功，为什么还要证明理论“存在”？

在理论物理学与数学物理领域，OpenAI 提出了一项关于特定四维相互作用量子规范场论严格数学存在性的证明，涉及量子色动力学（QCD）以及粒子物理标准模型的大统一补全。

#### 从可计算的网格走向连续时空

量子色动力学是描述夸克与胶子在强核力下相互作用的非阿贝尔规范场论。在物理学中，该理论取得了巨大的实证成就。戴维·格罗斯（David Gross）等人的渐近自由研究，解释了强相互作用在极短距离下耦合变弱、高能粒子表现如同自由粒子的物理图景；实验和格点数值模拟也长期支持这一理论对强相互作用的描述。

然而，对这类四维、含相互作用的量子规范场理论，严格构造仍是长期难题。物理上的微扰级数展开往往是发散的渐近级数，无法直接给出完整的非微扰定义；而格点计算是将连续时空离散化为有限网格间距的格点，虽然让体系可以在离散状态下计算，但要回到真实的连续世界，必须在网格间距趋于零的同时将体积推向无穷大。这里要排除两类失败：网格越来越细，相关预测却无法形成受控的极限；或者极限虽然存在，原本要研究的相互作用却消失了。在这一极限过程中，必须从数学上严格证明能够消除无穷大发散，得到满足相应公理化体系（如怀特曼公理或欧氏空间反射正性公理）的非平凡、良定义的连续量子场论及其相关函数。

在构造路线上，该研究基于巴拉班（Tadeusz Bałaban）开创的构造性重整化群方法。声明中指出的“标准模型的统一补全”，背景在于粒子物理标准模型本身在极短距离下无法无条件自洽外推，因此该数学工作声称构造的是一个包含标准模型规范场与费米子的最简单大统一理论的数学模型；这属于纯数学上的理论构造，绝非实验确证该特定大统一模型就是真实物理世界。

千禧难题要求两件事

#### 先构造理论，再研究它的能量门槛

01 · 存在性

##### 理论本身能被严格定义

从带截断的近似出发，控制移去截断的过程，构造满足相应公理的量子场理论。
**OpenAI 此次宣布的成果范围**

公告明确完成形式化的是纯杨–米尔斯存在性；物理原始证明材料尚未公开。
02 · 正质量间隙

##### 非真空激发与真空之间有正的门槛
非真空激发的能量能量空档 Δ > 0真空：能量为 0

需要另行证明能量区间 (0, Δ) 中没有谱。理论存在性本身不自动给出这个结论。
**公告没有宣布完成这一部分**

示意图没有数值刻度，不表示真实能级分布或已测出的质量间隙；正质量间隙与禁闭也是不同的性质。

#### 杨–米尔斯千禧难题还有另一部分

在克雷数学研究所设立的千禧年大奖难题中，“量子杨-米尔斯理论的存在性与质量间隙”包含了前后承接的两个数学命题：

第一个命题是四维理论的数学存在性，要求在严格公理下建立纯杨-米尔斯规范场论；本次成果中纯杨-米尔斯理论的存在性作为特例被包含在内。第二个命题是正质量间隙，即理论的能量算子谱中，真空状态的能量定为零，而所有非真空激发态的能量与真空之间存在一个严格大于零的下界。

在强相互作用中，质量间隙与夸克禁闭都是重要的物理特征，但拥有质量间隙并不能自动解释或直接证明禁闭现象。更为关键的是，证明量子场论在连续极限下的数学存在性，是开展一切公理化讨论的舞台基础，但拥有存在性并不等同于已经证明了正质量间隙。

根据官方公告的披露，在形式化代码方面，目前仅明确完成了纯杨-米尔斯理论存在性的形式化，并未声称全部量子色动力学或统一补全理论都已完成机器代码核查。同时，由于物理成果的自然语言手稿与形式化原件尚未向公众发布，其具体的证明技术细节仍有待后续公开材料呈现。

---

### AI 写出了证明，学界怎样把它变成共同知识？

面对机器生成的理论推导，OpenAI 在发布形式上没有采取单一模式，而是向外部专家咨询，试验了三种不同的公开策略。

#### 机器检查推导，人还要理解方法

在本次发布中，数学与计算复杂性领域的成果均附带了交互式定理证明器（Lean）的代码。形式化系统把定义、定理和证明写成机器能检查的形式，在所用公理和检查器可信的前提下，核对推导能否成立。人还要核对代码中的命题是否忠实对应原来的问题，并理解关键方法，才能继续修改条件、迁移到其他研究对象。

为此，OpenAI 邀请了外部资深学者担任学术组织者与牵头人（公告中称为 shepherds），协助组织学术共同体对推导展开理解与消化。需要指出的是，学者参与牵头组织工作，并不等于他们已经为成果的科学正确性进行了学术背书。

#### 三项成果，采用三种公开方式

依据外部专家给出的建议，OpenAI 针对三个成果采取了不同的材料公开策略：

1. **数学成果：直接公开机器产物**
  直接公开发布 AI 生成的自然语言推导手稿与形式化代码，由数学界研究人员自行组织研读和解读。公开后，任何人都可以查看同一份原始材料，但也意味着学术界需要直接面对繁重未加工的机器推导。
2. **理论计算机科学成果：牵头人组织解读并公开代码**
  由指数时间假说的提出者拉塞尔·因帕利亚佐（Russell Impagliazzo）、拉马莫汉·帕图里（Ramamohan Paturi）以及算法复杂性专家瑞安·威廉姆斯（Ryan Williams）牵头成立外部合作小组；同时在公共仓库全面公开自然语言稿与形式化证明，并由 OpenAI 资助召开学术会议供同行共同研讨。
3. **理论物理成果：暂缓公开原件，由学者自行撰写**
  由诺贝尔物理学奖得主戴维·格罗斯（David Gross）牵头，包括阿瑟·贾菲（Arthur Jaffe）、迈克尔·道格拉斯（Michael Douglas）、伊戈尔·克列巴诺夫（Igor Klebanov）与尼基塔·涅克拉索夫（Nikita Nekrasov）组成工作组。根据工作组的决定，物理方向由 AI 生成的原始产物暂缓公开发布，改由学者团队在深入研读后自行撰写学术论文，并设立了专用联络邮箱。

#### 理解工作也需要功劳、资源与独立性

OpenAI 声明在与学者群体的外部合作中遵循四项原则：

- 合作关系公开透明，参与者无需签署保密协议，可自由讨论、分享阶段性材料并发表独立学术结论；
- OpenAI 不为其内部模型推导出的科学发现谋求学术署名与学术发现贡献认可；
- 学者应为自己形成的理解、撰写的材料获得认可，并尊重已有研究的贡献；担任牵头人本身，不意味着他们是原始发现者；
- 学者参与完全自愿、无偿且保持独立，既不代表 OpenAI，OpenAI 也不代表学者发言。

这种机制在实践中也伴随着现实取舍。挑选先期的学术牵头人，不可避免地决定了谁最先接触到研究材料，从而在学术界内部带来了一定的信息与参与不对称。此外，OpenAI 近期宣布向西蒙斯基金会（Simons Foundation）提供 500 万美元资助，由基金会独立管理和分配，用于支持学术界研讨和消化 AI 科研成果的工作坊与会议；这笔资助支持更广泛的学术活动，工作组成员个人无偿参与是另一项安排。OpenAI 也表示，目前尚不知道三种公开方式哪一种最有用，仍在征求学界反馈。

---

### 得到答案之后，还要能继续使用它

这三项理论成果均由未具名的 OpenAI 内部研究模型生成，这些研究推导属于内部前沿探索，并不代表相关能力已经自动进入面向公众开放的日常模型或产品之中。

对于科学研究而言，机器推导通过形式化检查，能够为所编码命题的逻辑正确性提供强有力的支持；但要让一项推导真正进入科学共同体的知识体系，核心在于将复杂的符号堆叠转化为研究人员能够直观理解、解释并迁移应用的思想与分析方法。如何通过学术共同体的研讨，把机器输出的原始数据逐步提炼为透明、通用的研究范式，将是检验此类成果科学价值的关键所在。

[延伸阅读 · 此前的 AI 数学成果 OpenAI 公布 722 篇数学手稿：AI 在哪些未解难题上提出了突破？ 用六项成果理解 AI 提出的数学推进，以及 Lean 与 Comparator 怎样帮助检查证明。题目中的数量属于此前批次。 阅读背景解读 →](https://xiaohu.ai/article/openai-ai-mathematics-progress/)

来源Working with academic communities to build scientific understandingOpenAI·[查看主材料](https://openai.com/index/building-scientific-understanding-with-academic-communities/)延伸[局部光滑：Lean 形式化范围](https://github.com/openai/math/blob/main/lean/docs/079.md)·[ETH：Lean 形式化范围](https://github.com/openai/math/blob/main/lean/docs/378.md)·[ETH 自然语言论文](https://github.com/openai/math/blob/main/preprints/The-Exponential-Time-Hypothesis-is-False-October-25-2026/paper.pdf)·[局部光滑自然语言论文](https://github.com/openai/math/blob/main/preprints/Local-smoothing-for-the-Euclidean-wave-equation-October-25-2026/paper.pdf)·[Clay：Yang–Mills Existence and Mass Gap](https://www.claymath.org/wp-content/uploads/2022/06/yangmills.pdf)·[OpenAI 数学成果库](https://github.com/openai/math)
OpenAI · 三项基础研究

## OpenAI 宣布其内部模型在三项基础科学上取得突破：AI 写出了证明，人类还要弄懂什么？

波的峰值、算法的速度极限、量子场论的数学基础，都出现了新的推导。接下来，要把机器的答案变成研究者能理解、能继续使用的方法。

中文一页纸 · 依据 OpenAI 公告及公开材料；物理原件尚未公开

OpenAI 宣布，尚未具名的内部研究模型得到了三项理论结果。数学与算法的手稿、Lean 代码已公开；物理原件暂缓公开，由学者研读后自行撰写论文。这些能力尚不等于已进入公众日常使用的模型。

### 写出证明之后，还有两件不同的工作

机器核查：每一步能否成立？

Lean 把命题与推导写成代码，在给定公理和检查器可信的前提下，检查逻辑是否成立。

人类理解：为什么这样证明？

学者还要核对代码证明的是不是原问题，找出关键思想，才能修改条件、把方法用于下一项研究。

OpenAI 把模型推导称为“原始研究数据”。外部学者参与组织研读，也不等于已经为结果正确性背书。

### 数学｜波能聚多强，最强一刻能持续多久？

水波聚成巨浪、光线汇成焦点，可能有很尖的瞬时峰值。局部光滑猜想问：看一段时间的整体表现，能否比只按最坏一刻估计得更好？这关系到我们怎样控制波的传播。

**先保留干涉：**把不同方向的波叠加后再算强度，保留聚焦时的相互影响。

**再追踪能量：**按方向筛选贡献，构造守恒量，并引入辅助偏微分方程。

**最后跨时间比较：**用能量估计连接初始波形与随后一段时间的表现。

公开论文声称把局部光滑推进到所有空间维数 n ≥ 2，并推出挂谷集合的满维结论。

挂谷集合包含所有方向的单位线段；它的体积可以为零，但分形维数仍占满所在空间。“满维”不等于“有正体积”。

### 算法｜真假开关的可行组合，能否数得更快？

每个开关只能开或关，多条规则要同时满足。n 个开关有 2ⁿ 种组合。SAT 问有没有可行组合；精确计数还要算一共有多少种。只要计数大于零，就知道有解。

**难处：**规则跨组牵连，不能随便分组、各算各的。

**拆解：**把组间依赖归结为少量共享测量值；固定这些值后，各组分别计算贡献，再汇总。

**复原：**用代数插值，从受控的采样信息精确恢复原公式的解总数。

每条规则最多涉及 k 个开关时，对任意固定 k，算法给出次指数时间的精确计数，声称推翻指数时间假说（ETH）。

ETH 猜测：最坏情况下，3-SAT 的耗时无法摆脱 2 的正线性次方增长。新结果未给出多项式时间保证，**不等于解决 P 与 NP 问题**，不能因此说这类难题都能快速解决。依赖 ETH 的条件推导不能再单凭该前提作断言，也不等于相关下界已被推翻。

**机器检查与论文范围不同：**Lean 上界的指数中有 (log log n)² 因子；论文少一个 log log n 因子；子句数与变量数成线性比例时，论文给出更强界限。不能把论文全部改进都说成已由 Lean 核查。

### 物理｜网格越分越细，还能得到同一个有相互作用的理论吗？

量子色动力学描述夸克与胶子的强相互作用，实验与格点模拟已很成功。数学上的难处是：网格间距趋零、体积趋向无穷时，预测能否形成受控极限，同时保留相互作用？

OpenAI 声称证明了某些四维相互作用量子规范场论的数学存在性，涉及 QCD 与标准模型的大统一补全。

存在性：先搭起数学舞台

严格构造连续量子场论。公告仅明确纯杨–米尔斯存在性已完成形式化；物理原件尚未公开。

质量间隙：还要另证

非真空激发态的能量与真空之间，要有严格大于零的下界。存在性不等于质量间隙；质量间隙也不自动证明禁闭。

因此，这不等于已经解决“杨–米尔斯存在性与质量间隙”整个千禧难题。大统一模型的数学构造，也不是实验确认它就是真实世界。

### 同样是机器推导，公开方式分三路

**数学**

直接公开 AI 自然语言稿与形式化代码，学界可基于同一份原件研读。

**算法**

公开手稿与代码，由因帕利亚佐、帕图里和威廉姆斯牵头组织外部合作与研讨。

**物理**

格罗斯等学者组成工作组，暂缓公开 AI 原件；先深入研读，再由学者自行撰写。

OpenAI 尚不知道哪条路线更有用。学者独立、自愿、无偿参与；OpenAI 不谋求这些发现的学术署名。机器提供推导之后，理解、检验与传播本身仍是需要资源和认可的研究工作。

原文版权归原作者，这里只供对照阅读。 [看原网页 ↗](https://openai.com/index/building-scientific-understanding-with-academic-communities/)

## Working with academic communities to build scientific understanding

OpenAI shares model results on the Kakeya conjecture, Exponential Time Hypothesis, and quantum chromodynamics—and how researchers can verify and build on them.

We are announcing three new discoveries in mathematics, computer science, and physics about harmonic analysis, complexity theory, and quantum field theory.

Our release process continues to evolve in response to feedback from the associated academic communities. In our view, these manuscripts are best understood as a form of raw research data. To convert this raw research data into scientific understanding, in this release we are experimenting with a new approach. We reached out to external experts and asked them to act as shepherds, organizing groups to understand the new results. They advised three different release strategies:

- For the math result, release the AI output, leaving researchers free to organize their own efforts to explain the result.
- For the computer science result, form an external group of collaborators to explain the result, while making the AI output publicly available for anyone to examine and build on.
- For the physics result, form an external group of collaborators and defer to them on the release of materials.

We do not yet know which of these three approaches will be most useful, and we welcome feedback on what works and what we can improve.

The external collaborations will follow four principles:

1. **Transparency.** We are transparent about the existence of our collaborations. Participants will not be asked to sign nondisclosure agreements and will be free to discuss the work, share intermediate products, and publish their conclusions.
2. **No Academic Credit.** We do not seek academic credit for the discoveries produced by our internal models. Inviting a researcher to help steward a collaboration also does not imply that they or their working group made the original discovery.
3. **Recognition.** This group should receive recognition for the understanding they develop, the writeups they author, and the other materials they create. The group will also help ensure that the work appropriately credits researchers, techniques, and ideas that it draws on.
4. **Independence.** Participation is voluntary and unpaid. Working-group members participate independently, and their conclusions are their own. They do not speak on behalf of OpenAI, and OpenAI does not speak on their behalf.

We will turn over materials and artifacts related to these results to the collaborations. For the computer science collaboration, the group has decided to make the natural language proof and Lean formalization public immediately, and we are publishing them directly to our GitHub repository. For the physics collaboration, the group has decided to hold off on releasing the AI-produced artifacts and instead work on writing it up themselves.

All of these approaches involve tradeoffs. On the one hand, the collaborations empower experts to foster unpacking the results and contextualizing them in the broader academic community. On the other hand, choosing initial shepherds necessarily shapes who gets involved first and creates asymmetry of information. We welcome feedback on how to broaden participation and make this process more useful.

### Local smoothing and the Kakeya conjecture

The result in mathematics concerns harmonic analysis. In 1991, Sogge proposed the local smoothing conjecture, which concerns the behavior of waves as they become focused. In particular, the conjecture states that the most extreme focusing must be short-lived. The amount of focusing at a typical random time is always much smaller than what can happen at the worst-case time. This is a familiar pattern throughout mathematics: what can happen in the worst case is more extreme than what is observed after averaging. Because of how fundamental this conjectured phenomenon is, it also has wide ranging implications throughout mathematical analysis. For instance, it implies the Kakeya conjecture and Stein’s restriction conjecture.

In 2019, [Guth, Wang, and Zhang⁠(opens in a new window)](https://annals.math.princeton.edu/2020/192-2/p06) proved the local smoothing conjecture in two spatial dimensions. In 2025, [Wang and Zahl⁠(opens in a new window)](https://www.ias.edu/news/once-century-proof-settles-maths-kakeya-conjecture) proved the Kakeya conjecture in three dimensions. Our models produced a proof of the local smoothing conjecture in every dimension and therefore also resolve the Kakeya conjecture and Stein’s restriction conjecture in all dimensions. The new proof is based on a novel auxiliary partial differential equation.

We obtained our AI output on October 18th, 2026, which was formalized in Lean the following day, and then we reached out to an expert to discuss forming a collaboration around this result. Following their recommendation, we decided to release the AI output publicly, following the same strategy for this result as our October 6th, 2026 [release⁠](https://openai.com/index/sharing-ai-progress-in-mathematics/). We have released both an [AI natural language output writeup⁠(opens in a new window)](https://github.com/openai/math/blob/main/preprints/Local-smoothing-for-the-Euclidean-wave-equation-October-25-2026/paper.pdf) produced by our models and a [Lean proof ⁠(opens in a new window)](https://github.com/openai/math/blob/main/lean/docs/079.md)in our public GitHub repository.

### The Exponential Time Hypothesis is false

The computer science collaboration will understand and explain a result concerning the Exponential Time Hypothesis (ETH), a longstanding conjecture about the computational complexity of Boolean formula satisfiability, a problem deeply related to the P vs. NP problem. The ETH has been widely believed to be true, and has been used in hundreds of papers to derive conditional computational hardness results across a wide variety of fields including graph theory, computational biology, databases, computational geometry, and more. Surprisingly, our system has recently proved that the ETH is false, a result that was subsequently verified in Lean. The refutation of the ETH reopens questions about how much faster these tasks could become, and may help guide the search for better algorithms. Finding such algorithms, and turning theoretical advances into practical improvements, will require significant further research.

This work will be verified and shepherded by a group led by Russell Impagliazzo (UC San Diego), Ramamohan Paturi (UC San Diego), and Ryan Williams (MIT). All three are experts in algorithm design and complexity theory.

We have agreed to the group’s requests that all raw data of the results be made public to facilitate independent verification by the community, and that OpenAI commit to funding a conference to understand the implications of this work on the field as a whole. The group invites the community to help organize an open examination of the ETH claim and to discuss the broader questions that AI-generated breakthroughs raise about verification, access, credit, and the future of research.

Our AI found its natural language disproof for the ETH on October 16th, 2026 and then subsequently we formalized the result in Lean on October 17th, 2026, which led us to develop the collaboration described here. To that end, we have released both an [AI natural language output writeup⁠(opens in a new window)](https://github.com/openai/math/blob/main/preprints/The-Exponential-Time-Hypothesis-is-False-October-25-2026/paper.pdf) produced by our models and a [Lean proof ⁠(opens in a new window)](https://github.com/openai/math/blob/main/lean/docs/378.md)in our public GitHub repository.

Computational complexity has many open questions and conjectures, whose proofs or refutations have so far eluded the best efforts of scientists. We hope that humans with AI can provide new understanding in this field, and shed light on the inherent capabilities and limits of efficient computation.

### Existence of quantum chromodynamics and completions of the Standard Model

The physics collaboration will understand and explain a result that gives a mathematically rigorous existence proof of certain interacting quantum field theories containing gauge fields and fermions in four dimensions, including Quantum Chromodynamics (QCD) and a unified completion of the Standard Model of particle physics. Our work builds on [Balaban’s approach⁠(opens in a new window)](https://www.worldscientific.com/doi/abs/10.1142/S0129055X13300100) in constructive quantum field theory. As a subproblem, this work also includes a proof of the existence of pure Yang–Mills theory, which is part of the [Quantum Yang–Mills Theory Clay Mathematics Institute Millennium Prize problem⁠(opens in a new window)](https://www.claymath.org/wp-content/uploads/2022/06/yangmills.pdf).

The Standard Model describes the interaction of fundamental subatomic particles for three of the four fundamental forces, excepting gravity. The existence proof pertains to the simplest grand unified theory that includes the gauge fields and fermions of the Standard Model (as the Standard Model itself cannot be extrapolated to arbitrarily short distances). QCD describes the interaction of particles such as quarks and gluons via the strong force. Pure Yang–Mills theory only describes the self-interactions of the gluons, the force carriers, rather than matter such as quarks.

David Gross will lead a group including Michael Douglas, Arthur Jaffe, Igor Klebanov, and Nikita Nekrasov that will shepherd this work.

- Gross’s 1973 work on asymptotic freedom in Yang-Mills theories helped establish QCD as the theory of the strong interactions and earned him a share of the [2004 Nobel Prize in Physics⁠(opens in a new window)](https://www.nobelprize.org/prizes/physics/2004/gross/facts/). Asymptotic freedom is also the key mechanism underlying the existence of these theories as mathematically rigorous objects.
- Jaffe formulated the [Quantum Yang-Mills Theory Millenium Prize problem⁠(opens in a new window)](https://www.claymath.org/wp-content/uploads/2022/06/yangmills.pdf) with Witten and also envisioned the idea of Millennium Prize problems and co-founded the Clay Mathematics Institute.
- Douglas has already been a steward of this problem over the last 20 years, [reporting on its status in 2004⁠(opens in a new window)](https://www.claymath.org/library/annual_report/douglas_quantum_yang_mills.pdf) and then providing a [comprehensive update on the progress⁠(opens in a new window)](https://www.nature.com/articles/s42254-025-00909-2) at the beginning of this year.
- Klebanov helped pioneer the application of gauge–string duality to confinement, an important property of QCD, and now directs the [Simons Collaboration on Confinement and QCD Strings⁠(opens in a new window)](https://simonsconfinementcollaboration.org/),
- Nekrasov has done groundbreaking work on exact methods for generalizations of Yang–Mills theory and won the Dannie Heineman Prize for Mathematical Physics in 2023.

The group requests that all communications with any and all members of the group regarding this effort be directed to the following email account: [[email protected]](https://xiaohu.ai/cdn-cgi/l/email-protection).

Our models produced a natural language proof for Yang–Mills existence on September 9th, 2026, and then subsequently produced a proof for QCD on September 18th, 2026. Given the length and complexity of the work, we postponed release until the Lean formalization completed. We finished our formalization of Yang–Mills’ existence on October 16th, 2026, which led us to develop the collaboration described here.

We hope that these results mark the beginning of a transition in which quantum field theory, the most important framework in modern theoretical physics, becomes a mathematically rigorous field. We are excited to provide resources for academic-led progress towards that goal.

### Supporting scientists

We are committed to supporting the broader work of understanding and building on these results. These collaborations complement our recently announced [$5 million contribution⁠(opens in a new window)](https://www.simonsfoundation.org/news/simons-foundation-launches-15m-effort-to-help-mathematicians-navigate-ai-era/) to the Simons Foundation. Managed and awarded by the Simons Foundation, that funding will support workshops, conferences, and special programs to help researchers understand and build on results produced by AI. We are committed to ensuring funding for researchers to independently examine, explain, and build on the results above.

We continue to invite feedback on the best way to disclose results and engage with scientists to accelerate discovery.

↑ 正文结束
✓ 本篇全文免费开放

会员可复制、下载全文 Markdown，还能让你的 AI 订阅和提问。
[订年卡 $59/年](https://xiaohu.ai/buy/?plan=year)[看权益对比 →](https://xiaohu.ai/membership/)

[阅读原文 ↗](https://openai.com/index/building-scientific-understanding-with-academic-communities/)

📮 新解读每晚进邮箱

读完觉得有用？留个邮箱，每晚一封当天的新解读，随时退订。
