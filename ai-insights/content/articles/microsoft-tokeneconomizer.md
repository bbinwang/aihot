---
title: "微软开源 TokenEconomizer Token成本控制插件：接入 Claude Code、Codex 最高可省约三成费用"
date: 2026-11-01T00:00:00.000Z
tags: ["洞察", "TokenEconomizer", "AI编程", "Claude Code", "Codex", "Token成本", "聚合"]
summary: "给“Token 碎纸机”装一个外挂管家：留下项目经验，卸下闲置工具，在反复卡住时提醒换路。"
---
> **原文链接**: [https://arxiv.org/html/2610.22732v1](https://arxiv.org/html/2610.22732v1)
> **来源**: arxiv.org
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/microsoft-tokeneconomizer/) · 2026/11/1
> **说明**: 本文由 AIHot 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

## TokenEconomizer:面向编程 Agent 的经验驱动黑盒成本控制
- 来源： https://arxiv.org/html/2610.22732v1
---
TokenEconomizer:面向编程 Agent 的经验驱动黑盒成本控制
Aaron J. Li1,*    Weijia Xu2    Chandan Singh2    Zixiao Chen3    Jeevana Priya Inala2    Charlotte Siska3    Acar Tamersoy3    Bin Yu1    Ion Stoica1    Michel Galley2    Jianfeng Gao2
摘要

前沿编程 Agent 的进展大幅推高了 AI 辅助软件工程的 token 成本。这类 Agent 的 token 效率通常在孤立任务上进行评估，而现实中的开发者则使用它们持续地构建、更新和维护大型项目。这种不匹配促使我们在一系列真实编程任务序列上评估 Agent,我们发现 Agent 会表现出反复出现的、依赖环境的 token 成本，而现有方法难以降低这些成本。为了将这些成本降至最低，我们提出了 TokenEconomizer,这是一个外部控制器，能够在任务序列上削减环境特定的 token 成本。这些削减来自三方面的决策:(i) 注入哪些操作性微技能;(ii) 裁剪哪些持续无关的工具;(iii) 何时介入无成效的失败循环。在 Claude Code、Codex 和 GitHub Copilot CLI 搭配前沿模型的多种组合上，TokenEconomizer 在任务成功率相当的前提下将平均 token 成本降低了 18.4–30.9%。在所测试的每一种 Agent–模型设置下，节省在每个代码仓库中均成立，并泛化到顺序 Web 开发和安全审计等多样化领域，成本降幅因任务结构而异，为 6.4–21.2%。我们的工作确立了自适应黑盒成本控制作为降低编程 Agent 在现实场景中 token 成本的一个有前景的方向。

1引言

前沿大语言模型(LLM)与支持工具使用的 Agent 框架相结合，在完成真实的长时程软件工程任务方面能力日益增强。这些组件通常被打包为商业产品，包括 Claude Code、Codex 和 GitHub Copilot CLI。这些 Agent 的设计初衷主要是通用的任务成功，但其能力的提升伴随着可观的 token 成本。如图 1(a) 所示，每一轮计费的上下文包含持久的系统与用户指令，以及不断增长的模型输出与工具交互历史，导致较早的内容在整个轨迹中被反复计费。

计费轨迹剖析(示意图)
SWE-Bench 上的成本–质量权衡
图 1:轨迹剖析与成本–质量权衡。(a) 持久前缀与交互历史如何随 Agent 轮次累积的示意图。(b) 每种方法相对于高推理力度默认执行的成本与 Pass@1 变化，五个 Agent–模型设置中每种方法各对应一个点；虚线标出 Pareto 前沿。

token 效率的研究与优化主要停留在单个任务层面。模型级控制手段(如降低推理力度)能节省 token,但以牺牲任务成功为代价(表 1),而框架级控制手段(如工具可用性和辅助指令)通常需要手动配置。更具针对性的方法，如轨迹压缩、观测过滤和专门的仓库探索，往往需要修改 Agent 循环或额外的训练组件，限制了其即插即用的部署。更重要的是，任务局部优化忽视了软件开发的连续性—— successive 的变更发生在不断演化的代码库之内。这种连续性为成本控制创造了机会：在共享环境中(如一个代码仓库)，已完成的执行可以为未来任务提供可复用的经验。因此，我们优化的是该环境中跨任务序列的累计成本，而非将每次执行视为孤立个体。

我们首先检验固定的、外部施加的成本控制策略能否带来一致的 token 节省。我们的成本剖析覆盖 6 个仓库的 60 个 SWE-Bench 任务(Jimenez et al., 2024),并评估了来自流行开源插件的三个代表性固定策略：使用 Rust Token Killer (RTK) 进行命令输出压缩、使用 Serena 进行语义代码导航，以及使用 Aider 的仓库地图进行结构化上下文注入。实证结果表明，没有任何固定策略能一致地降低成本：每个策略在仓库层面都同时存在正面和负面影响，且其汇总效应很小(Fig. 2)。与此同时，默认轨迹揭示了三个反复出现的提升空间来源：操作知识被反复重新发现、大多数已加载的工具从未被使用、以及失败的轨迹消耗了不成比例的成本。综合来看，这些发现指向了从各环境累积的轨迹中进行自适应的策略，而非统一施加的固定策略。

受这些发现的启发，我们提出 TokenEconomizer,一个面向 coding agents 的经验驱动外部控制器。它将每个 agent 视为黑盒：通过暴露的 prompt 和工具设置进行操作，监控执行事件，且不修改模型权重或 agent-loop 代码。其核心在于，控制器应用通用的成本控制 meta-strategies,从已完成的执行轨迹中持续细化环境特定的策略。这些策略自适应地决定： 激活哪些关于环境的单行操作事实作为 micro-skills;(ii) 剪枝哪些已加载但无关的工具；以及 (iii) 何时干预无成效的失败循环。我们使用 Claude Code、Codex 和 GitHub Copilot CLI 搭配前沿模型，在 6 个仓库的 277 个 SWE-Bench 任务、5 个 Web 开发项目的 102 个 Web-Bench 任务，以及来自两个安全审计基准的 200 个任务上评估 TokenEconomizer。计入所有控制器开销后，我们的方法将 SWE-Bench 上的平均单任务成本降低了 18.4–30.9%,同时在 5 个 agent–模型设置中的 4 个里使 Pass@1 相比默认执行有所提升。在每个测试的 agent–模型设置下，所有仓库均实现成本节省(Fig. 5(a));在处于或高于默认通过率的成本–质量 Pareto 前沿上，每一个点均由 TokenEconomizer 变体占据(Fig. 1(b))。在 Web-Bench 和安全基准上，成本分别降低 16.0–21.2% 和 6.4–19.6%,同时 Pass@2 和检测 F1 与默认执行保持相当。我们的结果表明，我们的外部成本控制框架能够在不同的 agent harness 之间实现一致且可迁移的成本降低，同时保持相当的任务质量。

我们的贡献可以总结如下：

1. 我们将 coding-agent 成本优化形式化为任务序列上的优化问题，并定义了累计式端到端核算的标准化协议。我们的成本剖析识别出固定策略的仓库依赖效应，以及三个可操作的提升空间来源。

2. 我们提出 TokenEconomizer,一个外部控制器，它学习用于 micro-skill 激活、工具剪枝和失败循环干预的环境特定策略。

3. 我们在三个流行的 coding agents 和四个覆盖 579 个任务的基准上评估 TokenEconomizer,展示了在我们测量的所有设置下均成立的成本降低，同时任务成功率保持相当。

2成本剖析与固定成本控制策略分析

我们对来自 verified split 的 60 个 SWE-Bench 任务(6 个仓库各 10 个任务)进行了回顾性剖析分析，以检验固定策略是否能一致地节省成本，以及已完成的轨迹是否揭示了自适应控制的机会。如 Fig. 1(a) 所示，每一轮都会对持久的系统与工具前缀以及累积的交互历史进行计费；缓存虽对重放上下文提供了折扣，但并未消除其成本。详细协议见 Appendix B。

2.1固定策略的仓库特定效应

我们将 agent 的默认执行与三种固定策略进行比较，在每个仓库中使用相同的配置:(1)Rust Token Killer(RTK)重写 shell 命令以压缩其输出;(2)Serena 添加语义代码导航接口;(3)Aider 的 RepoMap 注入仓库符号的结构化地图。尽管它们的输出可能依赖于当前任务，但没有任何一种会从已完成的执行中学习，也不会基于先前经验进行选择性激活。

图 2:在 60 个被剖析的任务上，三种固定策略相对于默认执行的按仓库 cache 感知成本变化(负值表示更便宜)。每种策略都会在某些仓库中降低成本，而在其他仓库中提高成本。

图 2 显示，每种策略都会产生参差不齐的仓库级成本变化。例如，三者都降低了 Django 上的成本，却增加了 SymPy 上的成本；在 scikit-learn 上只有 RTK 有帮助，而在 Sphinx 上只有 RepoMap 有帮助。这些混合效应促使我们从已完成的任务中学习仓库特定的策略。

2.2 三种可移除的成本来源

图 3 在基于未经修改的 agent 运行的轨迹中识别出三个潜在的成本降低来源。

操作工作在仓库内重复出现。

在仓库至少一半的任务中重复出现的动作，占其工具调用收发字节数的 12–28%(附录 B 描述了调用如何与动作匹配)。与来自更早任务的动作匹配的调用比例，从第二、第三个任务的 14% 上升到当前任务之前至少有 5 个任务时的 30%(图 3(a))。相对于另一个仓库的完整历史，只有 7% 的调用匹配，且主要通过通用的设置和测试命令。这促使我们学习仓库特定的操作知识，并仅在相关时注入。

(a)重复的 agent 动作
(b)已加载但无关的工具
(c)失败任务的成本
图 3:60 个被剖析任务上三个源自轨迹的成本控制空间:(a)同一仓库中从更早任务重复的动作，以另一个仓库的历史作为对照;(b)各仓库使用的已加载工具，频率以方块大小表示;(c)失败任务的成本份额与轨迹长度。

大多数已加载的工具未被使用。

agent 在每一轮都会看到 23 个工具 schema,但没有任何仓库调用超过 7 个(图 3(b))。在这些工具中，16 个从未被调用，3 个占所有调用的 98%;其余工具在各仓库中稀疏且不均匀地使用。因此，固定的精简接口虽然可以移除共同的开销，但也会抑制某个在本地有用的工具，这促使我们采用基于证据的剪枝方式，并能够恢复被剪枝的工具。

失败的轨迹消耗不成比例的成本。

10 次失败的执行占任务的 17%,却占总花费的 32%(图 3(c))。通用的轮次上限无法识别它们：Matplotlib 的失败运行远长于其成功运行(45 对 20 轮)，而 Sphinx 的失败运行仅比其成功运行略长(36 对 31)。总体而言，45 条轨迹重复了更早出现的失败签名(failure signature),即失败输出经归一化的首行错误(附录 F),并且 60 个任务总花费的 51% 落在某条轨迹首次重复之后。然而，仅凭重复并不能标记失败：50 次成功运行中有 36 次也重复了某个签名，且重复发生后超过一半的花费落在最终成功的运行中。因此，防护机制必须将持续性循环与可恢复的循环区分开来，例如通过将一次运行的长度与该仓库的成功运行进行比较，并且应在终止之前进行重定向。

综上，这些观察促使我们做出三项自适应决策，第 3 节将其实现为元策略(meta-strategies),其策略在每个环境内分别学习：注入哪些操作知识、剪枝哪些持续无关的工具，以及何时干预无效的失败循环。

3 TokenEconomizer

我们提出 TokenEconomizer,这是一个外部控制器，它应用三种与仓库无关的元策略(meta-strategies),从已完成的轨迹中学习仓库特定的策略。在不修改底层 agent 的情况下，它通过指令前缀、已加载的工具和实时事件流，来合成并选择性激活操作微技能(micro-skills)、剪枝不必要的工具，以及干预无效的失败循环(图 4)。在后文中，元策略(meta-strategy)指这三种与环境无关的程序之一，策略(policy)指它在特定环境中学习到的决策，而固定策略(fixed strategy),如 RTK 或 RepoMap,则在每个环境中应用同一种配置。

我们的优化单元是环境中的一个按时间排序的任务流 
𝜏
1
,
…
,
𝜏
𝑛
。默认情况下,agent 在指令前缀 
𝑃
𝑖
 下运行任务 
𝜏
𝑖
,该前缀由 harness 的系统指令加上 
𝜏
𝑖
 的描述组成,并加载 harness 目录中的所有工具。当 controller 处于激活状态时,它维护仓库状态 
𝑆
𝑖
−
1
,记录从已完成的任务 
𝜏
1
,
…
,
𝜏
𝑖
−
1
 累积的 micro-skills 及其支持证据、工具使用历史和轮次统计,其中 
𝑆
0
 为空。在 
𝜏
𝑖
 开始之前,controller 
𝒞
 根据任务描述和当前状态确定激活策略集:

	
(
Δ
​
𝑃
𝑖
,
𝒰
𝑖
,
𝐵
𝑖
)
=
𝒞
⁡
(
𝜏
𝑖
,
𝑆
𝑖
−
1
)
.
		
(1)

𝒞
 给出的策略包括:任务 i 时激活的 micro-skills 集合 
Δ
​
𝑃
𝑖
,它仅取决于 
𝑆
𝑖
−
1
,并被渲染为一段简短手册,插入到 
𝑃
𝑖
 中 harness 指令与任务描述之间;加载的工具集 
𝒰
𝑖
,仅限于目录中仍然可能有用的工具;以及轮次预算 
𝐵
𝑖
,用于校准 in-flight failure-loop guard 何时可以重定向或终止 rollout。随后 agent 在这些策略下运行 
𝜏
𝑖
,产生轨迹 
𝜉
𝑖
,controller 据此将仓库状态更新为 
𝑆
𝑖
。controller 也可以保持 agent 的默认配置不变,即不激活任何 micro-skills、保持完整工具目录加载,或从不干预。其目标是在保持成功率接近默认执行的同时,最小化平均单任务成本(包括其自身的调用成本)(附录 E,式 6)。

图 4:TokenEconomizer 在各仓库间应用相同的三种 meta-strategy,而已完成的 trace 则用于细化仓库特定的策略,涵盖指令、加载工具和实时干预。

### 3.1 Meta-strategy I:基于经验的 Micro-skills

**提案与证据收集。**

controller 定期将一段有界的已完成轨迹窗口压缩为紧凑的操作证据摘要,例如命令模板、测试调用、编辑过的文件名以及遇到的错误。LLM proposer 根据这些摘要起草若干候选 micro-skills;其 token 消耗与 controller 的其他 LLM 调用一样,计入触发该调用的任务。每个候选 
𝑓
 将一条简单的操作性指令与可执行检测器配对,检测器是正则表达式或内置谓词,用于在实际任务轨迹上检验该 skill。在每个任务 
𝜏
𝑖
 之后,controller 在其轨迹 
𝜉
𝑖
 中的 shell 命令和输出上运行这些检测器。scope 检测器检查 
𝜉
𝑖
 是否触发了该 skill,即其所针对的情形是否出现过;例如,一个关于复现 issue 的 skill,只有当 agent 尝试编写复现脚本时才算被触发。被触发的任务如果表明指令是错误的(例如 skill 声称已安装的包出现了 import 错误),则与该 skill 相矛盾,否则即为确认。need 检测器记录任务是否需要该 skill:agent 要么产生了目标浪费(例如不必要的重新安装),要么使用了所述事实(例如原生 test runner);如果没有 need 检测器,则每个被触发的任务都算作需要。这些记录进入 
𝑆
𝑖
,并决定哪些 skill 被激活或退役(示例见附录 I)。

**激活与退役。**

一个候选只有在满足两个条件时才会被激活,进入 
Δ
​
𝑃
𝑖
。其一,它必须在多个编辑文件集互不重叠的任务上得到确认,使其证据反映仓库级别的重复出现,而非 issue 局部性重复。其二,其 need rate(即触发它的轨迹中需要它的比例)必须保持在阈值或以上。第一个条件衡量 skill 是否可靠,第二个条件衡量反复呈现它是否值得。f 在任务 i 时的 support 为

	
𝑞
𝑖
​
(
𝑓
)
=
∑
𝑗
<
𝑖
𝛾
𝑖
−
𝑗
​
(
𝟏
​
[
𝜉
𝑗
​
confirms
​
𝑓
]
−
𝜆
​
 1
​
[
𝜉
𝑗
​
contradicts
​
𝑓
]
)
,

(2)

其中 $\mathbb{1}[\cdot]$ 为指示函数，衰减因子 $\gamma < 1$ 对较旧的证据进行折扣，权重 $\lambda > 1$ 使得一个矛盾足以抵销一个确认。当 $q_i(f) < 0$ 时，满足确认条件的技能将被退休，其标识符不再被激活。这种不对称性是刻意为之，因为两种错误的成本并不对称：本应退休的技能会在随后的每个前缀上被重新计费，而过早退休的技能可能会以新的标识符再次被提出。因此，技能的状态从候选变为已确认，再变为已退休（表 5）；低于需求阈值的已确认技能不会从 $\Delta P_i$ 中扣除，但也不会被退休。

#### 3.2 元策略 II：工具剪枝

工具剪枝通过省略在当前任务中不太可能有帮助的工具模式（schemas），来降低智能体工具接口的重复成本。控制器始终保留用于 shell 执行以及文件读取、写入和编辑的核心工具。其他工具在连续完成固定数量的任务后仍未被调用时将被移除。此外，LLM 裁判会评估每个尚未移除且从未被调用的工具的相关性，依据是工具描述和 $\tau_i$ 的描述，其中指向仓库的拉取请求（pull requests）、问题（issues）、提交（commits）和文件的链接已被屏蔽。当工具满足“未使用历史”标准或裁判认为其不相关时，该工具将被移除；剩余的工具构成 $\mathcal{U}_i$ 并加载用于任务 $\tau_i$。为了从错误的排除中恢复，控制器会定期恢复完整的工具目录以供重新审计。在重新审计期间被调用的工具将不再被屏蔽，因为只有从未被调用的工具才会被屏蔽。

#### 3.3 元策略 III：失败循环干预

控制器还从先前的轨迹中推导出针对特定仓库的轮次预算（turn budget）。令 $|\xi_j|$ 表示轨迹 $\xi_j$ 中的轮次数量，令 $y_j \in \{0, 1\}$ 指示任务 $\tau_j$ 是否成功。令 $Q_p$ 表示先前成功任务轮次数量的经验 $p$-百分位数。$\tau_i$ 的预算为

$$
B_i = \beta \cdot Q_p(\{|\xi_j| : j < i, y_j = 1\}), \quad (3)
$$

其中 $p$ 较高，且存在边际系数 $\beta > 1$。此处 $y_j$ 来自基准测试评分器，但在实际场景中，任何类似的信号均可使用。该预算是用于识别异常长轨迹的参考，而非独立的停止点。在每次工具调用后，基于规则的检查会查找重复的失败特征、密集的错误输出或超过 $B_i$ 的轨迹，且无需进行模型调用。当触发时，LLM 裁判会审查近期操作和运行计数器的紧凑摘要，包括命令、编辑的文件名和失败特征，以区分无效循环与仍在进展中的困难任务。如果裁判确信智能体陷入停滞，首先会通过提供近期操作摘要并要求尝试不同方法来重定向智能体。如果失败模式再次出现且裁判再次发现智能体陷入停滞，控制器将终止 rollout。对于有效或不确定 verdict，允许其继续执行超过 $B_i$，直到下方的强制停止。作为裁判无法否决的后盾，一旦达到 $\kappa B_i$ 轮次（其中 $\kappa > 1$ 为固定值），且满足严格的停滞规则：编辑变更、密集错误和重复的失败特征同时出现（附录 F），强制停止将结束 rollout。

附录 C 给出了超参数值，附录 F 给出了实现细节。

### 4 实验

我们将 TokenEconomizer 与默认执行、减少推理努力以及固定策略在成本和任务成功率方面进行比较，涵盖不同的仓库和智能体-模型设置，然后测试其在 Web 开发和安全审计中的迁移能力。

#### 4.1 设置

**智能体、基准和方法。**

我们评估五种智能体-模型设置：使用 Sonnet 5 和 Opus 4.8 的 Claude Code，使用 Sonnet 5 的 Copilot CLI，以及使用 GPT-5.6 Terra 和 GPT-5.6 Sol 的 Codex。每种设置均运行来自 6 个仓库的相同 277 个 SWE-Bench 任务 (Jimenez et al., 2024)：scikit-learn (60)、SymPy (60)、Django (40)、Sphinx (44)、Matplotlib (34) 和 xarray (39)。这些任务涵盖了已验证集以及来自完整集的更难任务。在同一个仓库内，任务按时间顺序运行，因此控制器仅从该仓库历史中较早发生的工作中学习。另外三个基准测试评估向其他领域的泛化能力（第 4.3 节）：来自 5 个项目的 102 个 Web-Bench 顺序任务 (Xu et al., 2025)，以及来自 CredData（凭据检测）和 ReposVul（漏洞检测）的各 100 个安全任务 (Wang et al., 2024a)。附录 D 描述了我们如何为每个基准测试选择任务和流。在每种设置中，默认执行是指未修改的智能体在高推理努力下运行，且没有外部控制。我们将其与中等和低努力下的智能体原生执行、两种固定策略 RTK 和 RepoMap、TokenEconomizer，以及 TokenEconomizer 结合 RTK 或 RepoMap 的情况进行比较。Serena 被排除在外，因为工具剪枝可能会移除其未使用的服务器，从而混淆比较结果（附录 B）；它也是唯一在成本分析中提高总体成本的固定策略（图 2）。

评估指标。

我们的质量指标包括：在 SWE-Bench 上使用官方 grader 的 Pass@1、在 Web-Bench 上按原始基准推荐计算的累积 Pass@2，以及在安全基准测试中的检测 F1 分数（更多细节见附录 D）；效率指标为平均缓存感知成本（Appendix E, Eq. 4），该指标将每次辅助控制器调用所产生的开销计入触发该调用的任务中。附录 C 列出了所有基准测试共享的控制器配置。

4.2 SWE-Bench 结果

表 1 显示，TokenEconomizer 单独使用即可在所有五种设置下将平均缓存感知成本降低 18.4–30.9%。Pass@1 在四种设置中有所提升，仅在 Opus 4.8 上下降了 1.0 个百分点。相比之下，降低推理努力会导致 Pass@1 下降 1.8–10.3 个百分点，而单独使用 RTK 或 RepoMap 的节省效果并不一致。TokenEconomizer 也可以与上述任一方法结合使用：这两种组合在所有五种设置下均降低了成本，并且在 Claude Code 配合 Opus 4.8 时，添加 RTK 将节省率从 30.9% 提升至 33.2%，同时 Pass@1 高于默认值。

表 1：各方法的 SWE-Bench 成本与 Pass@1。成本为相对于高努力默认执行的配对相对变化，包含所有控制器开销；Pass@1 为绝对比率。每种设置均运行完整的六个仓库集合，并使用三个随机种子。所有数值均为百分比；下标表示三个随机种子间的标准差。粗体标记表示在每种设置中，Pass@1 超过默认执行且成本最低的方法；灰色背景的成本值对应 Pass@1 低于默认执行的情况。

| | Claude Code | | Codex | | Copilot CLI | | |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **Method** | **Sonnet 5** | | **Opus 4.8** | | **GPT-5.6 Terra** | | **GPT-5.6 Sol** | | **Sonnet 5** |
| | **Δ Cost ↓** | **Pass@1 ↑** | **Δ Cost ↓** | **Pass@1 ↑** | **Δ Cost ↓** | **Pass@1 ↑** | **Δ Cost ↓** | **Pass@1 ↑** | **Δ Cost ↓** | **Pass@1 ↑** |
| **Default** | — | 74.7 ± 1.3 | — | 74.0 ± 0.6 | — | 73.8 ± 1.0 | — | 80.1 ± 0.8 | — | 75.0 ± 1.5 |
| **Default (medium effort)** | −26.6 ± 1.4 | 70.0 ± 1.8 | −16.8 ± 2.1 | 72.2 ± 0.4 | −25.7 ± 2.0 | 69.6 ± 1.2 | −28.9 ± 1.9 | 76.7 ± 0.7 | −25.4 ± 2.4 | 72.6 ± 1.2 |
| **Default (low effort)** | −45.5 ± 1.7 | 65.1 ± 0.4 | −31.0 ± 0.8 | 70.4 ± 0.4 | −33.0 ± 2.2 | 65.3 ± 1.4 | −43.9 ± 1.8 | 69.8 ± 0.4 | −41.9 ± 1.8 | 65.9 ± 0.8 |
| **RTK** | −1.1 ± 2.9 | 73.1 ± 0.6 | −3.6 ± 3.5 | 74.0 ± 1.4 | −4.7 ± 2.1 | 74.3 ± 1.1 | +4.5 ± 2.5 | 79.2 ± 1.2 | −8.9 ± 3.7 | 76.9 ± 1.0 |
| **RepoMap** | −1.4 ± 1.9 | 74.1 ± 1.5 | +6.5 ± 2.7 | 74.6 ± 1.5 | +3.1 ± 2.4 | 70.0 ± 1.8 | −6.1 ± 2.6 | 78.7 ± 1.6 | −3.3 ± 2.7 | 74.9 ± 1.3 |
| **TokenEconomizer** | −23.6 ± 1.8 | 76.0 ± 1.2 | −30.9 ± 2.1 | 73.0 ± 0.6 | −24.7 ± 1.2 | 74.7 ± 1.0 | −26.1 ± 2.1 | 81.7 ± 0.7 | −18.4 ± 1.5 | 77.6 ± 1.3 |
| **TokenEconomizer + RTK** | −23.5 ± 1.2 | 76.4 ± 2.4 | −33.2 ± 1.7 | 74.8 ± 1.2 | −23.8 ± 1.5 | 75.2 ± 0.9 | −23.3 ± 1.9 | 81.3 ± 1.4 | −13.2 ± 2.2 | 77.4 ± 1.1 |
| **TokenEconomizer + RepoMap** | −18.3 ± 3.2 | 76.7 ± 1.1 | −24.9 ± 3.9 | 75.1 ± 0.7 | −21.9 ± 3.2 | 73.5 ± 1.6 | −29.2 ± 2.2 | 79.0 ± 1.3 | −6.3 ± 1.6 | 76.8 ± 0.4 |

(a) 环境间一致性
(b) 累积成本变化
图 5：SWE-Bench 结果相对于默认执行的对比。(a) 30 个仓库–设置单元格中每个单元格的成本变化。(b) TokenEconomizer 在每个仓库任务流上的累积成本变化，针对两个 Claude Code 设置取平均值。成本–质量前沿面见图 1(b)。

节省效果是一致的。

汇总的节省数据可能会掩盖单个环境中成本增加的情况，如第 2 节中的固定策略所示。图 5(a) 报告了五种智能体–模型设置下每个仓库的成本变化，共涵盖 30 个仓库–设置单元格。TokenEconomizer 在所有 30 个单元格中均降低了成本，降幅为 5.2–40.1%；TokenEconomizer+RTK 也是如此。TokenEconomizer+RepoMap 在 30 个单元格中的 29 个降低了成本。相比之下，单独使用 RTK 会在 12 个单元格中增加成本，单独使用 RepoMap 会在 15 个单元格中增加成本。

适应性扩展了帕累托前沿。

图 1(b) 展示了每种方法相对于其智能体–模型设置中默认执行的成本和 Pass@1 变化。降低推理努力实现了大幅节省，但导致 Pass@1 显著下降，而 RTK 和 RepoMap 则更接近默认值，且变化方向不一。TokenEconomizer 变体占据了帕累托前沿上所有维持或提高默认通过率的数据点，表明自适应控制实现了跨设置更有利的成本–质量权衡。

节省在任务流中累积。

TokenEconomizer 在启动每个仓库时均无先前的轨迹记录，因此其收益可能需要经过多个任务才能显现。图 5(b) 绘制了 TokenEconomizer（不含集成模块）相对于默认执行在每个仓库内的累计成本变化，该数据基于两种 Claude Code 设置取平均值。除 xarray 外，所有仓库在 TokenEconomizer 下的初始成本均较高，但到第六个任务时所有仓库的成本均变得更低，并在此后保持较低水平，最终实现 16.9–32.0% 的累计节省。

消融实验。

我们单独运行每种元策略。在两种 Claude Code 设置中，工具剪枝占据最大的单一份额，分别为 −13.2% 和 −17.7%，因为它作用于每个任务的每一步；微技能注入紧随其后，分别为 −11.8% 和 −14.3%；而失败循环守卫仅在个位数百分比范围内。Pass@1 对于每种变体均保持在默认值的 3 个百分点以内，因此没有任何变体以牺牲任务成功率为代价换取成本降低，且没有任何单一策略能复现完整堆栈的节省效果（表 2(a)；活动计数见附录 H）。

4.3 对多样化任务结构的泛化

为了评估 SWE-Bench 之外的泛化能力，我们在顺序 Web 开发（Web-Bench）和两个安全审计基准（CredData 和 ReposVul）上评估 TokenEconomizer。Web-Bench 通常涉及比 SWE-Bench 更小的代码库和工作区，但其任务仍属于同一个连续项目，并自然继承早期工作区的更改。在安全基准测试中，每个任务针对固定审计提示下的不同仓库，因此过程在缺乏仓库连续性的情况下递归进行。由于没有仓库重复出现，我们禁用了针对特定仓库的微技能注入，仅保留两种元策略处于激活状态。

表 2(b) 显示，Web-Bench 上的成本降低幅度为 16.0–21.2%，CredData 上为 16.5–19.6%。后者的结果表明，在共享审计程序下，剩余的元策略仍能在新的仓库中实现显著的成本节省。ReposVul 上的降低幅度较小，为 6.4–9.3%，这是因为较短的轨迹留下了更少的可移除成本。因此，节省效果在这些工作负载中得以泛化，而其幅度则因轨迹中可复用结构和成本降低空间的不同而变化。

表 2：相对于默认执行的成本和质量（%）；下标表示三个随机种子的标准差。(a) 在 SWE-Bench 上单独使用每种元策略以及完整堆栈，配合 Claude Code。(b) TokenEconomizer (TE) 在 Web-Bench（102 个任务；早期停止后的任务失败；成本在两个分支均完成的任务上配对比较）和安全基准（各 100 个任务）上的表现；Claude Code 平均了 Sonnet 5 和 Opus 4.8。

(a) 元策略消融
		SWE-Bench
模型	方法	
Δ 成本 
↓
	Pass@1 
↑

Sonnet 5	默认	—	
74.7
±
1.3

	微技能	
−
11.8
±
2.1
	
77.3
±
0.4

	工具剪枝	
−
13.2
±
1.3
	
74.3
±
0.5

	失败循环守卫	
−
7.1
±
2.2
	
76.2
±
0.9

	组合	
−
23.6
±
1.8
	
76.0
±
1.2

Opus 4.8	默认	—	
74.0
±
0.6

	微技能	
−
14.3
±
2.3
	
74.2
±
1.1

	工具剪枝	
−
17.7
±
1.5
	
73.5
±
0.6

	失败循环守卫	
−
5.4
±
1.8
	
72.6
±
0.5

	组合	
−
30.9
±
2.1
	
73.0
±
0.6
(b) 对其他基准的泛化能力
			质量 
↑

工作负载	代理	
Δ 成本 
↓
	默认	TE
Web-Bench	Claude Code	
−
21.2
±
1.3
	
69.3
±
1.4
	
73.3
±
1.6

(Pass@2)	Codex	
−
16.0
±
1.5
	
64.0
±
1.5
	
66.5
±
0.7

	Copilot CLI	
−
18.7
±
1.9
	
60.8
±
2.2
	
59.3
±
1.9

CredData	Claude Code	
−
19.6
±
0.7
	
67.9
±
0.5
	
70.1
±
0.8

(F1)	Codex	
−
16.5
±
1.0
	
68.0
±
0.4
	
69.2
±
0.3

	Copilot CLI	
−
18.3
±
1.4
	
68.2
±
0.4
	
67.7
±
0.7

ReposVul	Claude Code	
−
7.5
±
1.6
	
17.5
±
1.1
	
19.6
±
0.8

(F1)	Codex	
−
6.4
±
1.2
	
19.4
±
0.9
	
20.1
±
0.6

	Copilot CLI	
−
9.3
±
1.6
	
21.6
±
1.4
	
22.5
±
0.9
5 相关工作
LLM 和编码代理的成本降低。

经典的研究方向是通过选择哪个模型回答每个查询来降低推理成本：级联方法从较便宜的模型开始，逐步升级到更强的模型，直到答案被判定为可靠 (Chen et al., 2023; Yue et al., 2024; Aggarwal et al., 2024)；路由器方法则在生成前预测最便宜且足够的模型 (Ding et al., 2024; Ong et al., 2024)。这些方法在每个查询上以答案质量为代价换取成本降低，而 TokenEconomizer 保持模型和努力固定，并移除在环境中重复出现的成本。对于编码代理，现有方法通过控制上下文、接口或 rollout 长度来降低轨迹内的成本。上下文控制方法压缩提示 (Jiang et al., 2023)、使用 RTK 压缩 shell 输出、工具观察 (Kovács, 2026) 或累积轨迹 (Xiao et al., 2025)；其他方法通过仓库地图、知识图谱 (Vogel et al., 2026)、结构感知侦察 (Li et al., 2026b) 或训练好的检索代理 (Bashir et al., 2026) 缩小检索范围。接口级方法限制或检索候选工具 (Paramanayakam et al., 2024; Du et al., 2024)、丰富工具接口 (Liu et al., 2025)，或通过 Ponytail 等插件鼓励最小化实现。运行时方法提供纠正反馈 (Zhu et al., 2025)、提前退出检查 (Lu et al., 2025)、预算估计 (Lin et al., 2026) 或隐藏状态故障检测 (Ruan et al., 2026)。通过代理暴露接口部署的方法通常是固定的且局限于特定任务；我们的成本分析（第 2 节）发现它们的效果在不同仓库间存在差异。TokenEconomizer 则利用已完成的轨迹，将指令前缀、工具集和停止策略适配到每个环境中。

编码 Agent 的跨任务经验。

最近的基准测试开始评估 Agent 在持续修复、相关任务上下文复用以及流式任务序列方面的表现 (Joshi et al., 2025; Zhu et al., 2026; Yan et al., 2026)。先前的方法将已完成的执行过程作为口头教训或工作流进行复用 (Shinn et al., 2023; Zhao et al., 2024; Wang et al., 2024c)，或者从提交历史和修复轨迹中提取仓库知识 (Wang et al., 2026a; Chen et al., 2025)。另一条互补的研究路线将经验打包为可复用的能力，包括可执行技能和工具库 (Wang et al., 2023; Cai et al., 2024; Yuan et al., 2024)、经过验证的程序化技能 (Wang et al., 2025b)、优化的技能 API (Zheng et al., 2025) 以及不断演进的时间测试库 (Xu et al., 2026)。最近的系统进一步自动化了技能的构建和演进过程 (Wang et al., 2026b; Ni et al., 2026; Ma et al., 2026; Zhang et al., 2026; Chen et al., 2026; Li et al., 2026a)。由于不加选择地引入仓库上下文可能会增加成本而无法普遍提高成功率 (Gloaguen et al., 2026)，因此必须选择性复用这些经验。基于这一原则，TokenEconomizer 利用跨任务经验来学习通过 Agent 暴露的接口应用的成本控制策略。

6 局限性与结论

局限性。

每种元策略仍可能做出错误决策：微技能可能过时，被剪枝的工具可能变得必要，而一个困难但富有成效的任务可能被误判为失败循环。然而，每个决策都附带一条恢复路径以限制损害：一旦轨迹与过时技能相矛盾，该技能就会被退役；被错误剪枝的工具会在下一次重新审计时返回；失败循环干预会在停止之前重定向，并保留不确定的案例。我们的实验涵盖了三种广泛使用的编码 Agent，但未涵盖更精简的框架（如 Pi）；由于 TokenEconomizer 仅依赖于提示、工具配置和事件流，支持此类框架只需要适配器，而无需新的元策略。最后，我们的 SWE-Bench 流由相关但独立的修复组成，而非实际的用户会话。连续会话应能提供更多可复用的经验（附录 A），因此交互式编码工作流是下一个自然的测试场景。

结论。

编码 Agent 的成本在 recurring 环境中跨任务累积，而孤立任务的评估往往忽略了这一点。TokenEconomizer 表明，外部控制器可以从已完成的工作中学习，从而使未改变的 Agent 成本更低，同时很大程度上保持任务成功率，这适用于软件工程、Web 开发和安全审计等领域。

参考文献

Aggarwal et al. (2024)
Pranjal Aggarwal, Aman Madaan, Ankit Anand, Srividya Pranavi Potharaju, Swaroop Mishra, Pei Zhou, Aditya Gupta, Dheeraj Rajagopal, Karthik Kappaganthu, Yiming Yang, Shyam Upadhyay, Manaal Faruqui, and Mausam.
AutoMix: Automatically mixing language models.
In Advances in Neural Information Processing Systems, 2024.

Bashir et al. (2026)
Hammad Bashir, Kelly Hong, Patrick Jiang, and Zhiyi Shi.
Chroma Context-1: Training a self-editing search agent.
Technical report, Chroma, 2026.
URL https://www.trychroma.com/research/context-1.

Cai et al. (2024)
Tianle Cai, Xuezhi Wang, Tengyu Ma, Xinyun Chen, and Denny Zhou.
Large language models as tool makers.
In International Conference on Learning Representations, 2024.

Chen et al. (2023)
Lingjiao Chen, Matei Zaharia, and James Zou.
FrugalGPT: How to use large language models while reducing cost and improving performance.
arXiv preprint arXiv:2305.05176, 2023.

Chen et al. (2026)
Shiqi Chen, Jingze Gai, Ruochen Zhou, Jinghan Zhang, Tongyao Zhu, Junlong Li, Kangrui Wang, Zihan Wang, Zhengyu Chen, Klara Kaleb, Ning Miao, Siyang Gao, Cong Lu, Manling Li, Junxian He, and Yee Whye Teh.
SkillCraft: Can LLM agents learn to use tools skillfully?
arXiv preprint arXiv:2603.00718, 2026.

Chen et al. (2025)
Silin Chen, Shaoxin Lin, Yuling Shi, Heng Lian, Xiaodong Gu, Longfei Yun, Dong Chen, Lin Cao, Jiyang Liu, Nu Xia, and Qianxiang Wang.
SWE-Exp: Experience-driven software issue resolution.
arXiv preprint arXiv:2507.23361, 2025.

Deng et al. (2025)
Xiang Deng, Jeff Da, Edwin Pan, Yannis Yiming He, Charles Ide, Kanak Garg, Niklas Lauffer, Andrew Park, Nitin Pasari, Chetan Rane, et al.
SWE-Bench Pro: Can AI agents solve long-horizon software engineering tasks?
arXiv preprint arXiv:2509.16941, 2025.

Ding et al. (2024)
Dujian Ding, Ankur Mallick, Chi Wang, Robert Sim, Subhabrata Mukherjee, Victor Rühle, Laks V. S. Lakshmanan, and Ahmed Hassan Awadallah.
Hybrid LLM: Cost-efficient and quality-aware query routing.
In International Conference on Learning Representations, 2024.

Du et al. (2024)
Yu Du, Fangyun Wei, and Hongyang Zhang.
AnyTool: Self-reflective, hierarchical agents for large-scale API calls.
arXiv preprint arXiv:2402.04253, 2024.

Gloaguen et al. (2026)
Thibaud Gloaguen, Niels Mündler, Mark Müller, Veselin Raychev, and Martin Vechev.
Evaluating AGENTS.md: Are repository-level context files helpful for coding agents?
arXiv preprint arXiv:2602.11988, 2026.

Huang et al. (2026)
Wenqi Huang, Charley Lee, Leonard Tng, and Serena Ge.
DeepSWE: Measuring frontier coding agents on original, long-horizon engineering tasks.
arXiv preprint arXiv:2607.07946, 2026.

Jiang et al. (2023)
Huiqiang Jiang, Qianhui Wu, Chin-Yew Lin, Yuqing Yang, and Lili Qiu.
LLMLingua: Compressing prompts for accelerated inference of large language models.
arXiv preprint arXiv:2310.05736, 2023.

Jimenez et al. (2024)
Carlos E. Jimenez, John Yang, Alexander Wettig, Shunyu Yao, Kexin Pei, Ofir Press, and Karthik Narasimhan.
SWE-bench: Can language models resolve real-world GitHub issues?
In International Conference on Learning Representations, 2024.

Joshi et al. (2025)
Thomas Joshi, Shayan Chowdhury, and Fatih Uysal.
SWE-Bench-CL: Continual learning for coding agents.
arXiv preprint arXiv:2507.00014, 2025.

Kovács (2026)
Ádám Kovács.

Squeez: 面向编码 Agent 的任务条件化工具输出剪枝。
arXiv 预印本 arXiv:2604.04979, 2026.

Lekssays 等人 (2025)
Ahmed Lekssays, Hamza Mouhcine, Khang Tran, Ting Yu, 和 Issa Khalil。
LLMxCPG: 通过代码属性图引导的大语言模型实现上下文感知的漏洞检测。
第 34 届 USENIX 安全研讨会 (USENIX Security 25), 2025.

Li 等人 (2026a)
Yanzhou Li, Yiran Zhang, Xiaoyu Zhang, Xiaoxia Liu, 和 Yang Liu。
CODESKILL: 学习编码 Agent 的自我进化技能。
arXiv 预印本 arXiv:2605.25430, 2026a.

Li 等人 (2026b)
Zhonghang Li, Zongwei Li, Yuxuan Chen, Han Shi, Jiawei Li, Jierun Chen, Haoli Bai, 和 Chao Huang。
FastCode: 快速且具成本效益的代码理解与推理。
arXiv 预印本 arXiv:2603.01012, 2026b.

Lin 等人 (2026)
Yuxiang Lin, Zihan Wang, Mengyang Liu, Yuxuan Shan, Longju Bai, Junyao Zhang, Xing Jin, Boshan Chen, Jinyan Su, Xingyao Wang, Jiaxin Pei, 和 Manling Li。
BAGEN: LLM Agent 是否具有预算意识？
arXiv 预印本 arXiv:2606.00198, 2026.

Liu 等人 (2025)
Kaiming Liu, Xuanyu Lei, Ziyue Wang, Peng Li, 和 Yang Liu。
通过自动化接口生成实现 Agent 与环境对齐。
arXiv 预印本 arXiv:2505.21055, 2025.

Lu 等人 (2025)
Qingyu Lu, Liang Ding, Siyi Cao, Xuebo Liu, Kanjian Zhang, Jinxia Zhang, 和 Dacheng Tao。
Runaway 感到羞愧但乐于助人：基于大语言模型的 Agent 在具身环境中的早退行为研究。
计算语言学协会 EMNLP 2025 发现论文集, 页码 24014–24027, 2025.
doi: 10.18653/v1/2025.findings-emnlp.1304.
URL https://aclanthology.org/2025.findings-emnlp.1304/.

Ma 等人 (2026)
Yuchen Ma, Yue Huang, Han Bao, Haomin Zhuang, Swadheen Shukla, Michel Galley, Xiangliang Zhang, 和 Stefan Feuerriegel。
SkillGen: 经过验证的推理时 Agent 技能合成。
arXiv 预印本 arXiv:2605.10999, 2026.

Merrill 等人 (2026)
Mike Merrill, Alexander Shaw, Nicholas Carlini, Boxuan Li, Harsh Raj, Ivan Bercovich, Lin Shi, Jeong Shin, Thomas Walshe, E Kelly Buchanan, 等。
Terminal-Bench: 在命令行界面中针对困难、真实任务对 Agent 进行基准测试。
国际学习表征会议, 2026.

Ni 等人 (2026)
Jingwei Ni, Yihao Liu, Xinpeng Liu, Yutao Sun, Mengyu Zhou, Pengyu Cheng, Dexin Wang, Erchao Zhao, Xiaoxi Jiang, 和 Guanjun Jiang。
Trace2Skill: 将轨迹局部经验提炼为可迁移的 Agent 技能。
arXiv 预印本 arXiv:2603.25158, 2026.

Ong 等人 (2024)
Isaac Ong, Amjad Almahairi, Vincent Wu, Wei-Lin Chiang, Tianhao Wu, Joseph E. Gonzalez, M Waleed Kadous, 和 Ion Stoica。
RouteLLM: 利用偏好数据学习 LLM 路由。
arXiv 预印本 arXiv:2406.18665, 2024.

Paramanayakam 等人 (2024)
Varatheepan Paramanayakam, Andreas Karatzas, Iraklis Anagnostopoulos, 和 Dimitrios Stamoulis。
少即是多：优化边缘设备上 LLM 执行的功能调用。
arXiv 预印本 arXiv:2411.15399, 2024.

Ruan 等人 (2026)
Kai Ruan, Zihe Huang, Ziqi Zhou, Qianshan Wei, Jinghao Lin, Xuan Wang, 和 Hao Sun。
生来 doomed：通过召回控制的探针级联提前终止 LLM Agent 会话。
arXiv 预印本 arXiv:2607.06503, 2026.

Shinn 等人 (2023)
Noah Shinn, Federico Cassano, Ashwin Gopinath, Karthik Narasimhan, 和 Shunyu Yao。
Reflexion: 具有口头强化学习的语言 Agent。
神经信息处理系统进展, 2023.

Vogel 等人 (2026)
Martin Vogel, Falk Meyer-Eschenbach, Severin Kohler, Elias Grünewald, 和 Felix Balzer。
Codebase-Memory: 基于 Tree-sitter 的知识图谱，通过 MCP 实现 LLM 代码探索。
arXiv 预印本 arXiv:2603.27277, 2026.

Wang 等人 (2026a)
Boshi Wang, Weijian Xu, Yunsheng Li, Mei Gao, Yujia Xie, Huan Sun, 和 Dongdong Chen。
利用仓库记忆改进代码定位。
国际学习表征会议, 2026a.

Wang 等人 (2026b)
Chenxi Wang, Zhuoyun Yu, Xin Xie, Wuguannan Yao, Runnan Fang, Shuofei Qiao, Kexin Cao, Guozhou Zheng, Xiang Qi, Peng Zhang, 等。
SkillX: 自动为 Agent 构建技能知识库。
arXiv 预印本 arXiv:2604.04804, 2026b.

Wang 等人 (2023)
Guanzhi Wang, Yuqi Xie, Yunfan Jiang, Ajay Mandlekar, Chaowei Xiao, Yuke Zhu, Linxi Fan, 和 Anima Anandkumar。
Voyager: 具有大语言模型的开放式具身 Agent。
arXiv 预印本 arXiv:2305.16291, 2023.

Wang 等人 (2024a)
Xinchen Wang, Ruida Hu, Cuiyun Gao, Xin-Cheng Wen, Yujia Chen, 和 Qing Liao。
ReposVul: 一个仓库级高质量漏洞数据集。
2024 IEEE/ACM 第 46 届国际软件工程会议论文集：伴生会议, 页码 472–483, 2024a.

Wang 等人 (2024b)
Xingyao Wang, Yangyi Chen, Lifan Yuan, Yizhe Zhang, Yunzhu Li, Hao Peng, 和 Heng Ji。
可执行代码动作能激发更好的 LLM Agent。
arXiv 预印本 arXiv:2402.01030, 2024b.

Wang 等人 (2025a)
Xingyao Wang, Boxuan Li, Yufan Song, Frank F Xu, Xiangru Tang, Mingchen Zhuge, Jiayi Pan, Yueqi Song, Bowen Li, Jaskirat Singh, 等。
OpenHands: 作为通用 Agent 的 AI 软件开发人员的开放平台。
国际学习表征会议, 2025a.

Wang 等人 (2024c)
Zora Zhiruo Wang, Jiayuan Mao, Daniel Fried, 和 Graham Neubig。
Agent 工作流记忆。
arXiv 预印本 arXiv:2409.07429, 2024c.

Wang 等人 (2025b)
Zora Zhiruo Wang, Apurva Gandhi, Graham Neubig, 和 Daniel Fried。
为 Agent 任务诱导程序化技能。
arXiv 预印本 arXiv:2504.06821, 2025b.

Xiao 等人 (2025)
Yuan-An Xiao, Pengfei Gao, Chao Peng, 和 Yingfei Xiong。
通过轨迹缩减降低 LLM Agent 的成本。
arXiv 预印本 arXiv:2509.23586, 2025.

Xu 等人 (2025)
Kai Xu, YiWei Mao, XinYi Guan, 和 ZiLong Feng。
Web-Bench: 基于 Web 标准和框架的 LLM 代码基准测试。
arXiv 预印本 arXiv:2505.07473, 2025.

Xu 等人 (2026)
Weijia Xu, Alessandro Sordoni, Chandan Singh, Zelalem Gero, Michel Galley, Xingdi Yuan, 和 Jianfeng Gao。
使用不断发展的库进行测试时学习。
arXiv 预印本 arXiv:2605.14477, 2026.

Yan 等人 (2026)
Dong Yan, Jian Liang, Dapeng Hu, Ran He, Nicholas Jing Yuan, Qi Zhang, 和 Tieniu Tan.
AgentStream: 自进化 LLM Agent 在流式任务中的表现如何？
arXiv 预印本 arXiv:2608.00155, 2026.

Yang 等人 (2024)
John Yang, Carlos E. Jimenez, Alexander Wettig, Kilian Lieret, Shunyu Yao, Karthik Narasimhan, 和 Ofir Press.
SWE-agent: Agent-计算机接口实现自动化软件工程。
在神经信息处理系统进展中, 2024.

Yuan 等人 (2024)
Lifan Yuan, Yangyi Chen, Xingyao Wang, Yi Fung, Hao Peng, 和 Heng Ji.
CRAFT: 通过创建和检索专用工具集来自定义 LLM。
在国际表征学习会议中, 2024.

Yue 等人 (2024)
Murong Yue, Jie Zhao, Min Zhang, Liang Du, 和 Ziyu Yao.
具有思维表示混合的大语言模型级联，用于成本高效的推理。
在国际表征学习会议中, 2024.

Zhang 等人 (2026)
Hanrong Zhang, Shicheng Fan, Henry Peng Zou, Yankai Chen, Zhenting Wang, Jiayu Zhou, Chengze Li, Wei-Chieh Huang, Yifei Yao, Kening Zheng, 等.
CoEvoSkills: 通过协同进化验证实现 Agent 技能的自进化。
arXiv 预印本 arXiv:2604.01687, 2026.

Zhao 等人 (2024)
Andrew Zhao, Daniel Huang, Quentin Xu, Matthieu Lin, Yong-Jin Liu, 和 Gao Huang.
ExpeL: LLM Agent 是经验学习者。
在 AAAI 人工智能会议论文集, 第 38 卷, pp. 19632–19642, 2024.
doi: 10.1609/aaai.v38i17.29936.
URL https://ojs.aaai.org/index.php/AAAI/article/view/29936.

Zheng 等人 (2025)
Boyuan Zheng, Michael Y Fatemi, Xiaolong Jin, Zora Zhiruo Wang, Apurva Gandhi, Yueqi Song, Yu Gu, Jayanth Srinivasa, Gaowen Liu, Graham Neubig, 等.
SkillWeaver: Web Agent 可以通过发现和磨练技能来自我改进。
arXiv 预印本 arXiv:2504.07079, 2025.

Zhou 等人 (2024)
Shuyan Zhou, Frank F Xu, Hao Zhu, Xuhui Zhou, Robert Lo, Abishek Sridhar, Xianyi Cheng, Tianyue Ou, Yonatan Bisk, Daniel Fried, 等.
WebArena: 用于构建自主 Agent 的真实 Web 环境。
在国际表征学习会议中, 2024.

Zhu 等人 (2026)
Jiayuan Zhu, Junde Wu, Minhao Hu, Shengda Zhu, Jiazhen Pan, Weixiang Shen, Yijun Yang, Fenglin Liu, Jianye Hao, Yueming Jin, 等.
SWE Context Bench: 编码上下文学习的基准测试。
arXiv 预印本 arXiv:2602.08316, 2026.

Zhu 等人 (2025)
Kunlun Zhu, Zijia Liu, Bingxuan Li, Muxin Tian, Yingxuan Yang, Jiaxun Zhang, Pengrui Han, Qipeng Xie, Fuyang Cui, Weijia Zhang, Xiaoteng Ma, Xiaodong Yu, Gowtham Ramesh, Jialian Wu, Zicheng Liu, Pan Lu, James Zou, 和 Jiaxuan You.
LLM Agent 在何处失败以及它们如何从失败中学习。
arXiv 预印本 arXiv:2509.25370, 2025.

附录 A 扩展讨论
TokenEconomizer 作为更广泛类别的一个实例。

TokenEconomizer 占据着一个更大的设计空间中的一个点：外部控制器应用固定的、与环境无关的元策略，并让已完成的轨迹设置环境特定的策略。我们的每个元策略都遵循相同的模式，将来自轨迹的廉价信号与保守的操作以及从错误中恢复的方法相结合：微技能由检测器确认并在出现矛盾时退役，修剪的工具通过重新审计返回，失败循环守卫在停止之前进行重定向。相同的模式也适用于其他利用暴露的控制，例如为每个任务选择推理努力或模型，在学到的点压缩上下文，或在任务之间重用环境设置，并且每个策略都可以进一步专门化以适应部署，例如使用更长的历史、跨相关仓库共享的微技能，或者来自用户而非基准测试评分者的成功信号。由于控制器不需要模型访问、重新训练或对 Agent 的更改，它可以随着 Agent 的演进而跟进。因此，我们将我们的结果视为表明这一方向是有前景且未被充分探索的，而不是其上限。

无需针对每个环境进行调整的泛化。

单个配置（表 4）服务于三个 harness、五个 agent–model 设置以及四个基准测试；唯一的基准测试特定变更源于流的结构（附录 C）。在未经过微调的情况下，所有 30 个 SWE-Bench 仓库–设置单元格中均实现了节省，这表明元策略捕捉到了智能体工作的规律性，即反复出现的操作事实、未使用的接口以及低效循环，而非某一特定智能体或数据集的产物。共享配置是一种默认设置而非约束条件，其参数也可作为具有可预测方向的调节旋钮：更少的所需确认或更低的门槛会提前激活微技能，更短的未使用间隔或更长的重新审计期会保留更多被剪枝的工具，而更小的预算边际 $\beta$、更低的裁判置信度阈值或更小的 $\kappa$ 则会让护栏更早介入。每项调整都在额外节省与更高的错误决策风险之间进行权衡，因此用户可以根据自身优先级沿成本–质量前沿进行调整，这与推理努力的权衡类似，其节省伴随着 Pass@1 的更大损失（图 1(b)）。SWE-Bench 也是对经验复用的保守测试。连续任务是相互独立的：每个任务都从其各自的基础提交的全新检出开始，不继承智能体之前的任何编辑，且每个流跨越其仓库 1.9 至 8.5 年的历史，在此期间，布局、测试命令和依赖项会发生漂移。相比之下，开发者的会话是回到一个逐步变化的代码库中，通常是通过智能体自身的工作进行的，因此一个任务所教的内容更有可能对下一个任务保持有效。Web-Bench 的任务继承工作空间，更接近该设置，尽管其流仅包含 20 或 21 个任务，TokenEconomizer 仍在此节省了 16.0–21.2%。

与固定策略的互补性。

单独使用时，RTK 和 RepoMap 对 Pass@1 的影响不一致，在不同设置间变化范围为 $-3.8$ 到 $+1.9$ 分（表 1）。它们与 TokenEconomizer 的组合则更具信息量。在 Claude Code 配合 Opus 4.8 的场景中，TokenEconomizer 单独使用时比默认值低 1.0 分，但加入 RepoMap 或 RTK 后，Pass@1 分别提升至 75.1 和 74.8，高于默认值，且某种组合在五个设置中的三个里达到了最高的 Pass@1。一个合理的解释是这些策略提供了不同的信息。微技能说明了如何在仓库中操作，例如如何运行其测试，但设计上不涉及修复应位于何处；RepoMap 的排名签名解决了这一定位问题，而 RTK 的压缩日志则在较短的上下文中使失败消息保持显著。然而，节省效果并非简单叠加：RepoMap 在每一步都调用其地图，因此在五个设置中的四个里，TokenEconomizer+RepoMap 的节省少于单独使用 TokenEconomizer；而 RTK 自身的节省效果不一致，在 Opus 4.8 上增加了 TokenEconomizer 的节省，但在其他地方却降低了多达 5.2 分。因此，结合固定策略和自适应策略是以部分节省换取质量，哪种组合更优取决于具体设置。

为何使用微技能。

我们将注入的知识称为微技能，以区别于先前工作中的两种可复用经验形式（第 5 节）。技能和工具库打包了用于重复子任务的可执行代码、程序或 API，而经验教训、工作流和仓库记忆则将过去的轨迹提炼为关于如何解决问题的自然语言指导。微技能比两者都更窄：它是关于某一环境的单一操作事实，例如哪个测试运行器可用、源代码位于何处或哪一步设置是不必要的。三个特性使得这种粒度适合成本控制。首先，它针对我们观察到的成本：前沿智能体已经解决了大部分任务，而它们可移除的支出主要用于从任务到任务地重新发现相同的环境事实（第 2 节），而非用于弥补问题解决能力的缺失。其次，它是持续可验证的：检测器在后续的每一个轨迹中无需模型调用即可确认或反驳关于命令和输出的一行声明，因此其有效性在整个流中不断被重新检查，而不是在创建时仅检查一次；相比之下，一般性经验或程序是否有帮助很难从轨迹中解读。第三，它成本低且风险小：手册在每一步都计费，因此每条条目必须简短并证明其存在的价值；并且由于微技能陈述的是事实而非解决方案，它不会将早期任务中的特定任务内容带入后续任务中，且错误的微技能会在少量证据后就被淘汰，如附录 I 中的示例 (c) 所示。

附录 B 成本分析协议与详细结果

成本分析使用 Opus 4.8 模型并以高推理强度运行 Claude Code。我们从 6 个仓库中各选取 10 个任务，并在相同的 60 个任务上分别运行默认执行模式以及三种固定策略各一次。每种策略的成本变化是相对于默认执行的平均成本而言的。表 3 报告了按仓库划分的数值结果。

表 3：按仓库划分的成本分析结果：10 个任务中的通过数量，以及每种策略相对于相同任务默认执行的成本变化。

| 仓库 | Pass@1 ↑ | Δ 成本 ↓ | Pass@1 ↑ | Δ 成本 ↓ | Pass@1 ↑ | Δ 成本 ↓ | Pass@1 ↑ |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **默认** | | | **RTK** | | **Serena** | | **RepoMap** |
| sklearn | 10/10 | −6.9% | 10/10 | +28.6% | 10/10 | +30.5% | 10/10 |
| SymPy | 10/10 | +7.3% | 10/10 | +30.8% | 10/10 | +9.8% | 8/10 |
| Django | 9/10 | −19.9% | 9/10 | −15.4% | 8/10 | −16.2% | 9/10 |
| Sphinx | 6/10 | +0.6% | 8/10 | +2.1% | 6/10 | −7.5% | 8/10 |
| Matplotlib | 8/10 | −4.9% | 9/10 | −4.8% | 8/10 | +5.0% | 9/10 |
| xarray | 7/10 | −16.8% | 7/10 | +4.7% | 6/10 | −20.2% | 7/10 |

**外部成本节约策略。**

*   **RTK (v0.45.0)** 注册为代理 shell 工具的预执行钩子。它将每个 shell 命令重写为通过 RTK 运行，RTK 会在代理看到之前压缩命令的输出，例如测试日志、文件列表和差异。代理的工具和提示词保持不变。
*   **Serena** 是一个由语言服务器支持的 MCP 服务器。它添加了基于符号级别的导航工具，例如查找符号定义、列出文件符号以及查找引用。指示代理优先使用这些工具，而不是其原生的文件读取和搜索功能（这些功能仍然可用）。
*   **RepoMap** 指的是 Aider 的仓库地图。它解析仓库的 Python 源代码，根据交叉引用图中的中心性对文件和符号进行排名，并偏向于任务描述中提到的标识符，然后在 2,048 token 的预算内渲染排名靠前的签名。地图在每个任务中生成一次，并作为项目指令提供，因此成为每轮计费的前缀部分。

主要实验使用相同的 RTK 版本和地图预算，并测试 TokenEconomizer+RTK 和 TokenEconomizer+RepoMap，以确定自适应节约是否补充了输出压缩和静态仓库上下文。没有 TokenEconomizer+Serena 变体，因为工具剪除可能会移除未使用的 Serena 服务器，从而直接混淆这两种方法；出于同样的原因，Serena 未出现在表 1 中。

**余量测量。**

所有三种测量都读取默认执行轨迹，并估计可移除成本的风险敞口，应将其解释为上限而非可实现的成本节约。

*   **重复操作（图 3(a)）**。我们将每个工具调用简化为一个操作键。对于 shell 命令，键是小写的命令，空白符被压缩，任何前导目录更改被移除，且仅保留前 6 个 token。对于文件工具，键是工具名称和文件的基名。在每个仓库内，任务按时间顺序选取，对于每个任务，我们测量其工具调用中键已在同一仓库的早期任务中出现的比例。跨任务控制则针对其他每个仓库的完整历史测量相同的比例，并对这五个仓库取平均值。
*   **未使用的工具（图 3(b)）**。我们将代理在会话开始时接收到的工具目录（包含 23 个工具，且在每个仓库中相同）与其实际进行的工具调用进行比较，按仓库计数。
*   **失败的任务（图 3(c)）**。我们测量默认支出中用于失败任务的比例，以及通过和失败任务的平均轮数。对于轨迹首次重复失败签名之后的支出，每次运行的成本均匀分摊到其工具调用上，这低估了后期的支出，因为每一轮都会重新计费之前累积的上下文。

附录 C 控制器配置

表 4 列出了控制器配置，附录 J 描述了每个测试框架如何实现该配置。在基准测试中，每个仓库和项目使用相同的值，且没有针对特定仓库、项目或流进行调优。所有值都在主要运行之前固定，是在相同的六个 SWE-Bench 仓库上的早期开发运行中确定的。这些值服务于六个 SWE-Bench 仓库（其流包含 34 到 60 个任务，默认通过率、轮次和工具使用差异很大）以及五个涵盖 Web 标准和框架的 Web-Bench 项目。

设置仅在流结构要求的情况下在不同基准测试中有所不同。Web-Bench 流包含 20 或 21 个任务，对于在大多数流运行之前让通过回合数的百分位数进行预热来说，任务数量太少。因此，失败循环保护机制从预注册的 30 个回合预算开始，直到 5 个任务通过为止。在安全基准测试中，每个任务都是不同的代码库，因此特定于代码库的微技能永远无法在同一个代码库中找到后续任务来应用；微技能注入被禁用。它们的任务也是在固定简报下的只读审计，因此未使用工具的历史记录反映的是审计程序，而不是任何单个代码库，裁判会根据该简报评估每个候选者。

表 4：控制器配置，由所有三个框架共享。

| 配置项 | 值 |
| :--- | :--- |
| **微技能注入** | |
| 技能来源 | proposer |
| 提议者频率 | 每 5 个任务 |
| 确认 | 在不重叠的编辑文件上进行 3 次确认 |
| 需要门控 | 在 ≥ 4 个练习中比率 ≥ 0.4 |
| 支持 𝛾, 𝜆 | 0.8, 5 |
| **工具剪枝** | |
| 剪枝单位 | 工具 (Codex: 能力包) |
| 移除 | 未使用 3 个任务，加上每个任务的裁判 |
| 恢复 | 每 5 个任务完整目录 |
| **失败循环干预** | |
| 预算 𝐵𝑖 | 通过回合数第 90 百分位数的 1.25 倍 |
| 卡住检测 | LLM 裁判，置信度 0.7 |
| 重定向 | 1 次，然后停止 |
| 强制停止 𝜅 | 2.5，如果严格停滞规则成立 |

附录 D 任务和流选择

所有方法和种子以相同的顺序运行相同的任务，因此种子仅在代理自身的非确定性方面有所不同。

**SWE-Bench**

我们使用第 2 节中分析的六个代码库，它们都是 SWE-Bench Verified 中最大的代码库之一。在 277 个任务中，199 个来自 SWE-Bench Verified，78 个来自完整的 SWE-Bench 测试集：

*   Django (40)、Matplotlib (34) 和 Sphinx (44) 仅使用 Verified 任务。Matplotlib 和 Sphinx 使用所有 Verified 任务；Django 使用其 231 个 Verified 任务中的 40 个，全部来自其 Verified 历史的开头（2016 年 11 月至 2019 年 9 月），因此连续任务通常相隔数天（问题日期的中位间隔为 5 天），而不是分散在完整的 6.7 年中。
*   scikit-learn (60) 结合了 31 个 Verified 任务和 29 个来自完整集的任务。
*   SymPy (60) 结合了 41 个 Verified 任务和 19 个来自完整集的任务。
*   xarray (39) 仅有 22 个 Verified 任务，其中 13 个最老的任务稀疏分布在 2019 年至 2021 年之间。其流改用 2022 年 4 月之后的 9 个 Verified 任务，按 base-commit 顺序与 30 个完整集任务交错排列，一个来自 2021 年 2 月，其余来自 2022 年 3 月至 2023 年 1 月，因此连续任务通常相隔数天（问题日期的中位间隔为 4 天）。

我们从完整集中抽取额外的 scikit-learn 和 SymPy 任务以提高这两个流的难度。仅使用 Verified 任务时，几乎所有方法都能通过几乎每个代码库中的任务，因此无法区分默认执行与其低努力变体。添加的任务具有 61–200 行更改的金补丁，并且包版本已经出现在流中；我们按补丁大小对候选者进行排序并以均匀间隔采样。由于完整集未经人工标注者验证，我们通过在其官方镜像中应用其金补丁并运行官方评估来检查每个添加的任务，并且全部通过。每个代码库的流按 base-commit 顺序运行。由于修复提交是公开的，每种方法都在答案键保护下运行，该保护阻止直接访问 GitHub 上的金补丁（附录 J）。

**Web-Bench**

Web-Bench 由 50 个项目组成，每个项目是 20 个依赖任务的序列，并且某些项目以额外的 init 任务开头，用于设置脚手架。我们在基准测试的任务顺序中运行五个项目作为流：calculator (21 个任务)、table (21)、expressjs (20)、react (20) 和 zustand (20)，总共 102 个任务。每个设置使用三个种子运行每个流。我们选择了这五个项目，以涵盖基准测试的两个部分：Web 标准和 Web 框架。Calculator 和 table 基于纯 HTML、CSS 和 JavaScript 构建，后者围绕 HTML `<table>` 元素。React 是一个前端 UI 框架，zustand 是一个与 React 一起使用的状态管理库，expressjs 是一个带有数据库的 Node.js 后端。我们还排除了默认执行早期失败的项目：官方协议在第一个同时两次失败的任务处停止流，因此此类项目留下的流太短，无法比较方法。

我们遵循官方的 Web-Bench 评估协议 (Xu et al., 2025)，该协议允许每个任务进行两次尝试。如果第一次尝试未能通过项目的测试，代理将使用测试错误作为上下文重试同一任务。重试至关重要，因为每个任务都建立在前一个任务之上：如果没有重试，单次失败的尝试就会中断整个流程，导致后续所有任务无法进行评估。因此，我们报告 Pass@2（即在两次尝试中通过的任务比例），并且我们的成本数据包含了两次尝试的费用。与 SWE-Bench 类似，由于评分规范是公开的，每种方法都在答案键保护机制下运行（附录 J）。

CredData。

CredData 包含 333 个仓库。我们排除了那 19 个不包含任何真实秘密行的仓库：对于这些仓库，预测为空得分为 F1 1，因此它们仅衡量精确度。我们将剩余的 314 个仓库按每个仓库中真实秘密行的数量分为四分位数，由于数据分布严重偏斜（分界点为 4、8.5 和 24.75），我们按比例分配 100 个名额（分别为 28、22、25 和 25），并从每个四分位数中选出相应数量的仓库。所选仓库包含 1 到 799 个真实秘密行（中位数为 8.5）。

ReposVul。

从 Python 划分的 1,310 个实例中，我们剔除了 298 个其修复操作未删除任何行因而无可检测内容的实例，以及 ReposVul 标记为过时的 109 个实例。从剩余的 903 个实例中，我们像处理 CredData 一样，按漏洞行数的四分位数（分界点为 2、5 和 17；名额分配为 31、21、24 和 24）并使用固定种子采样出 100 个实例。所选实例包含 1 到 411 个漏洞行（中位数为 5）。与 CredData 一样，每个任务都是使用相同固定审计提示词的不同仓库，且每个种子运行全部 100 个任务。我们严格在行级别进行评分：报告的定位仅在文件行与修复提交删除的行匹配时才计数，且精确度是基于漏洞文件中报告的行计算的。先前的工作则在平衡集上报告整个函数或代码样本的二进制 F1 分数 (Lekssays et al., 2025)；而在我们的指标下，即使指出了正确的函数但行号错误，得分也为零。我们保留这一严格指标，因为它与 CredData 的行级 F1 分数相呼应，且不需要额外的标签。

附录 E 任务流公式化与成本核算

任务流形式化。

第 3 节定义了任务流、前缀 $P_i$ 以及公式 1 中的控制器映射 $\mathcal{C}$；我们在此复用该符号，将状态更新写为 $S_i = F(S_{i-1}, \tau_i, \xi_i, y_i)$。轨迹交替呈现观察结果和智能体动作，$\xi_i = (o_0, a_0, o_1, \dots, a_T, o_{T+1})$，因此公式 3 中的回合数为 $|\xi_i| = T + 1$，其成功标签为 $y_i \in \{0, 1\}$。由于 $S_{i-1}$ 仅由 $i$ 之前的任务形成，且失败循环保护机制仅观察前缀 $\xi_{i, \le t}$，因此对 $\tau_i$ 的任何决策都不依赖于流中后续的任务。

成本归属与目标。

对于任务 $\tau_i$，令 $N_i^u$、$N_i^c$ 和 $N_i^o$ 分别表示任务代理消耗的未缓存输入、缓存读取和输出 token。令 $\mathcal{H}_i$ 包含归因于该任务的所有辅助模型调用，包括微技能提议、工具判断、轨迹判断和重定向编写。对于每个辅助调用 $h$，我们记录相同的三类 token。控制器开销和总缓存感知成本随后为

$$
\begin{aligned}
H_i &= \sum_{h \in \mathcal{H}_i} (w_u N_{i,h}^u + w_c N_{i,h}^c + w_o N_{i,h}^o), \quad (4) \\
C_{\text{eff}}(\tau_i, \mathcal{C}) &= w_u N_i^u + w_c N_i^c + w_o N_i^o + H_i,
\end{aligned}
$$

其中权重为适用的价格，或者当成本以新鲜输入 token 等价物表示时的比率。我们使用供应商报告的 token 类别，因此缓存上下文按缓存读取使用量定价，而不是重构为新鲜输入。

每个辅助调用仅向调用它的任务边界收费一次。例如，定期的任务后更新被分配给触发该更新的任务完成边界。对于环境 $r$ 的流，产生的成本和成功率为

$$
\bar{C}_r(\mathcal{C}) = \frac{1}{n} \sum_{i=1}^{n} C_{\text{eff}}(\tau_i, \mathcal{C}), \quad (5)
$$

$$
\bar{Y}_r(\mathcal{C}) = \frac{1}{n} \sum_{i=1}^{n} y_i.
$$

从概念上讲，TokenEconomizer 旨在降低摊销成本，同时保持默认执行的成功率：

$$
\begin{aligned}
& \min_{\mathcal{C}} \mathbb{E}[\bar{C}_r(\mathcal{C})] \\
& \text{subject to } \mathbb{E}[\bar{Y}_r(\mathcal{C})] \ge \mathbb{E}[\bar{Y}_r(\text{default})] - \epsilon.
\end{aligned} \quad (6)
$$

期望是对随机 Agent 执行过程而言的。公式 (6) 陈述的是设计目标，而非评估时的调优规则：我们不会在观察结果后选择 $\epsilon$。相反，实验报告的是相对于匹配默认执行所观察到的成本变化及成功率差异。

在最终确定阶段，任务-Agent 使用情况和所有归因的控制器调用均在评估公式 (4) 之前写入同一执行记录。这种共享的记账路径防止了优化后的方法跳过移入辅助调用的工作，或通过不同的模型路由获得未报告的折扣。

附录 F 其他元策略细节

微技能注入。

提议者（proposer）在任务 4 之后被调用，此后每 5 个任务调用一次。每次调用都会看到仓库最近 8 个任务的摘要，其中不包含解决方案文本或黄金补丁（gold patches），并返回最多 4 个候选项。除非候选项引用了窗口内至少 2 个任务，且其确认检测器（confirming detector）与之匹配，否则该候选项将被丢弃。被接纳的候选项的检测器会在窗口内的任务上进行回溯运行，因此它带着证据进入，并可以立即激活。在处理过的任务上，会在确认之前检查矛盾，且没有需求检测器的技能会将每个处理过的任务计为所需。如果提议者标记某项技能为高风险（例如测试命令或构建步骤），一旦满足确认条件并在首次出现矛盾时，该技能将退休。表 5 总结了生命周期。这三个标准在不同阶段起作用：确认计数使候选项变为已确认状态，需求率决定在每个任务上是否注入已确认的技能，而支持度 $q_i(f)$ 决定退休。支持度仅在技能确认后才进行检查，因此具有负支持度的候选项（永远不会被注入）将保持候选状态；如果它后来被确认，它将在下一个任务后退休，除非其支持度变为正数。

表 5：微技能生命周期。只有已确认的技能才能进入 $\Delta P_i$，且退休是永久性的。

| 状态 | 注入到 $\Delta P_i$ | 离开该状态的条件 |
| :--- | :--- | :--- |
| 候选项 (Candidate) | 从不 | 在 3 个具有不重叠编辑文件的任务上获得确认 $\rightarrow$ 已确认 |
| 已确认 (Confirmed) | 在每个任务上注入，如果其需求率在至少 4 个处理过的任务上 $\ge 0.4$；否则保留，并在下一个任务前重新检查 | $q_i(f) < 0$，或任何高风险技能出现矛盾 $\rightarrow$ 退休 |
| 退休 (Retired) | 从不 | 从不；提议者可以使用新标识符提议替换项 |

工具剪枝。

每当工具被调用时，其未使用 streak（连续未使用次数）都会重置。在每个任务之前，未受保护且从未被调用且 streak 达到 3 的工具会被屏蔽；其他未受保护且从未被调用的工具会被发送给裁判（judge），裁判标记为不相关的工具也会被屏蔽；如果裁判调用失败，它们保持加载状态。屏蔽在整个任务期间是固定的。重新审计会加载完整目录，而不调用裁判。

失败循环干预。

基于规则的触发器会持续运行重复命令和错误、编辑扰动（edit churn）、不同编辑文件、状态变更缺失以及重复验证失败的计数器，裁判的摘要也会报告这些内容。裁判仅在触发器开启时咨询，每 5 个回合最多咨询一次；每次产生有效裁决后，此间隔增加 5 个回合，最多至 20。强制停止在裁判之前进行检查，且裁判不能否决：一旦轨迹的回合数（跨重定向计数）达到 $\kappa B_i$（其中 $\kappa = 2.5$），且严格停滞规则成立，则 rollout 结束，不再进行进一步的重定向。失败签名是失败工具输出的第一行错误，例如回溯（traceback）、测试失败或断言，其中数字、内存地址和文件路径已被移除，以便以相同方式失败的两个输出能够匹配。当同时满足以下三个条件时，严格停滞规则成立：编辑扰动，即对至少 1 个文件进行了至少 4 次编辑或对至少 3 个文件进行了编辑；密集错误输出，即至少有 6 个错误输出；以及重复性，即至少 20% 的失败输出重复了早期的失败签名。公式 (3) 中的预算使用通过回合数的较高百分位数，而不是最大值，因此一个异常长的成功不会使其膨胀，而成功运行通常较长的仓库仍会获得按比例更大的预算。重定向是由 LLM 撰写的关于 Agent 自身行动的摘要，要求它尝试一个实质不同的假设。

附录 GPrompt 模板

本附录提供了控制器模型调用的提示词，以及微技能注入添加到智能体提示词中的前缀部分。在运行时填充的槽位以花括号显示。

G.1 微技能注入
提议者（Proposer）。

提议者在任务 4 之后以及随后的每 5 个任务时被调用，并附带仓库最近 8 个任务的摘要。提示词中的 `fired` 字段对应第 3.1 节的需求检测器。

你的任务是从单个仓库中最近完成的任务摘要中，挖掘出一套持久的、针对该仓库的微技能集，供编码智能体使用。每个摘要列出了编辑的文件、命令模板、测试调用和布尔标志，而非原始日志。

发出那些在**未来**处理此仓库中的任务时，希望提前声明以避免浪费命令的微技能：例如标准的测试调用、复制脚本是否冗余、必需的环境变量、所需（或不需要）的构建或重新安装步骤、会重新格式化的 lint 或格式化工具钩子等。不要发出针对特定任务的修复方案或需要更改的行；只发出在该仓库中跨任务保持不变的持久事实。

对于**每个**技能，返回一个包含以下字段的对象：

  id           简短的 kebab-case  slug

  claim        一句话，陈述关于该仓库的事实

  injection    添加到智能体提示词的确切行，以关于该仓库的陈述性事实形式表述
               （例如位置在哪里、标准命令是什么）。
               切勿将其表述为对探索或工具使用的禁止：不要告诉
               智能体避免使用 find/grep/搜索/阅读或跳过发现文件。

  high_stakes  如果信念错误会导致运行中断，则为 true（如测试命令、构建步骤）

  detector     {scope, confirm, contradict?, fired?}。scope 是命令上的正则表达式，或
               内置谓词（repro_written, importerror, badarg, ran_tests），用于
               选择技能相关的任务；confirm 是正则表达式，其在
               命令和输出中的匹配意味着该技能在此任务中成立；contradict（可选）
               意味着该技能不成立；fired（可选）意味着它防止的浪费发生了。

  cite         来自窗口期内的至少 2 个任务 ID，其中 confirm 匹配



最多返回 4 个技能。保持保守：一个无法用有效的检测器和两个引用支撑的技能，比没有技能更糟。



如果某个技能需要证据，而摘要中未包含该证据，首先定义一个提取器来展示它，格式为 {name, kind, pattern}，其中 kind 属于 {cmd_regex, out_regex, cmd_count}，并将其命名为 detector 的 scope 或 fired。



若要修订现有技能，请重新发出该技能，使用**相同的** id 并仅更改 `detector.contradict`；它将保留其历史记录。对现有 id 的任何其他更改都将被拒绝。



仓库：{repository}

现有技能 ID：{skill IDs}

现有提取器名称：{extractor names}

任务摘要（按时间顺序）：{digests, as JSON}

当前提取器未覆盖的原始命令片段：{commands}



返回一个 JSON 对象 `{"extractors": [...], "skills": [...]}`。

微技能手册。

手册在每次任务前渲染，基于已激活的技能，并置于任务提示词之前；附录 I 展示了各个技能。

## 仓库手册 ({repository})，从本仓库中的先前任务中学习得出

- {skill 1}

- {skill 2}

...



{task prompt}

G.2 工具剪枝
工具法官（Tool judge）。

工具法官在每个任务之前被调用，除了对未受保护的、从未使用过的工具进行的重新审计，这些工具的证据尚未被屏蔽；任务文本是基准测试本身的任务描述，其中指向仓库的拉取请求、问题、提交和文件的链接被占位符替换。智能体接收未修改的描述，其链接在答案键守卫（附录 J）后面不可达。

你正在为一个自主编码智能体配置工具集，该智能体即将通过阅读、编辑和测试单个仓库中的源代码来解决**一个**特定问题，且处于无头、单次运行模式（无人类参与、一个密封容器、无子智能体、无调度或外部内存）。每个加载的工具的模式在每一轮都会重新发送并消耗 token。以下是该问题和候选工具。针对**此**问题，标记每个工具：

LOAD  对于阅读、导航、编辑、运行或测试与此问题相关的代码，可能有用

  DROP  此问题将不再需要它

保持保守：仅在确信该工具与此问题无关时才 DROP。不要仅仅因为工具存在就假设它被需要。



ISSUE: {任务文本，前 4,000 个字符}

TOOLS: {每个候选工具一行：名称和描述}



仅返回一个 JSON 对象 {tool_name: {"load": true|false, "reason": "<简短说明>"}}。

G.3 失败循环干预

两个调用都读取相同的路径摘要：其运行计数器、最近 24 个操作，以及一旦 $B_i$ 可用，该路径相对于它的长度。摘要记录了工具名称、命令、搜索模式、编辑的文件名和错误签名，但从不记录文件内容或任务文本。

Trace judge（轨迹裁判）。

仅当基于规则的触发器处于开启状态时，才会调用轨迹裁判。

你正在监控一个正在软件仓库中执行单个任务的 AI 编码代理。基于规则的触发器将其最近的过程标记为可能的低效循环。阅读其最近操作的摘要，并判断它是否真的陷入停滞（重复进行相同类型的编辑、测试或失败，且没有向通过测试取得进展，如果继续以相同方式操作，不太可能恢复）还是仍在取得实质性进展（改变失败情况、缩小问题范围、探索新假设）。



仅判断摘要中的工作流；不要推断任务的解决方案或需要更改的行。当有任何进展迹象时，倾向于放过代理（stuck=false）；仅在明确、重复的死胡同时，才以高置信度返回 stuck=true。



最近的过程摘要：

turns={t} edit_churn={c} distinct_edit_files={f} error_outputs={e} test_runs={r}

repeated_identical_failures={k} stagnation={s}

此仓库中的任务通常在大约 {B_i} 轮内通过；此轨迹已进行到 {t} 轮，长度为典型值的 {t/B_i} 倍，且其测试尚未通过。如果轨迹远超典型长度且反复出现失败，则很可能是一个死循环，即使它涉及多个文件。

最近的操作（从旧到新）：{最近 24 个操作}



仅返回一个 JSON 对象 {"stuck": bool, "confidence": 0.0-1.0, "reason": "<简短理由>"}.

Redirect writer（重定向写入器）。

当守卫介入时，会调用重定向写入器，以编写针对该循环的重定向。

一个 AI 编码代理在软件仓库中执行单个任务的过程中，陷入了重复且低效的循环。你仅获得了其最近操作的摘要（工具名称、shell 命令、搜索模式、编辑的文件名和错误签名；绝不包含文件内容或任务描述）。编写一个简短的重定向（2-4 句话），面向代理，其中 (1) 指出你在摘要中实际看到的特定重复模式（例如，重新编辑同一文件、重新运行同一测试导致相同失败），以及 (2) 提出一个实质不同的下一步（考虑不同的文件或根本原因、重新阅读失败测试的预期、在再次编辑前验证新假设）。



不要告诉代理停止、放弃或减少努力；仅进行重定向。不要推断任务的解决方案、命名需要更改的具体行，或引用你在摘要中看不到的任何代码或标识符。仅以纯文本形式输出重定向内容。



最近的过程摘要：{摘要，与轨迹裁判相同}

附录 H 元策略的消融实验

每个单元策略变体都使用与完整堆栈相同的参数（表 4），因此没有变体针对其自身的消融实验进行调整。表 2(a) 报告了每个变体的成本和 Pass@1，并与表 1 中相同任务-种子单元上的默认执行结果配对。表 6 报告了每个元策略的行动频率，表 7 定义了其列。所有列均为流内均值，但其单位不同。Needed（需要）统计的是事件数量，即每个需要技能的已执行任务计为一个事件，因此其数值是旁边确认技能数量的 33 到 37 倍。Masked（屏蔽）是流结束时仍处于屏蔽状态的工具数量，而 Re-audits（重新审计）统计的是使用完整目录运行的任务数量，因此这两者不可比。变体禁用的元策略报告为零。

在每个设置中，组合堆栈的计数与相应的单一元策略变体的计数保持接近，这表明三种元策略很少相互干扰彼此的决策。计数还显示了每种元策略的选择性。大约每五个提议的技能中就有一个在其流中被退役，因此账本会修正其信念，而不是积累它们。每个流中会咨询跟踪裁判约 10 到 13 次，但大约每十个任务中有一个会重定向，少于二十分之一的任务会中止，因为大多数升级最终会产生有效或不确定的裁决。

表 6：两个 Claude Code 设置中消融变体的元策略活动，按流平均值。表 7 定义了列，表 2(a) 给出了每个变体的成本和 Pass@1。

| Micro-skills | Tool schemas | Failure loops |
| :--- | :--- | :--- |
| **Method** | **Proposed** | **Confirmed** | **Needed** | **Retired** | **Masked** | **Re-audits** | **Judged** | **Redirects** | **Aborts** |
| Claude Code, Sonnet 5 | | | | | | | | | |
| Micro-skills | 11.4 | 7.2 | 268 | 2.1 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 |
| Tool pruning | 0.0 | 0.0 | 0 | 0.0 | 15.1 | 3.3 | 0.0 | 0.0 | 0.0 |
| Failure-loop guard | 0.0 | 0.0 | 0 | 0.0 | 0.0 | 0.0 | 10.8 | 4.4 | 1.4 |
| Combined | 12.1 | 8.4 | 301 | 2.6 | 14.8 | 3.1 | 9.9 | 3.9 | 2.0 |
| Claude Code, Opus 4.8 | | | | | | | | | |
| Micro-skills | 9.6 | 6.5 | 214 | 1.7 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 |
| Tool pruning | 0.0 | 0.0 | 0 | 0.0 | 14.6 | 5.2 | 0.0 | 0.0 | 0.0 |
| Failure-loop guard | 0.0 | 0.0 | 0 | 0.0 | 0.0 | 0.0 | 13.1 | 4.8 | 1.7 |
| Combined | 10.3 | 7.1 | 241 | 2.2 | 14.5 | 4.3 | 12.2 | 5.3 | 2.2 |

表 7：表 6 的列定义。每个条目是变体在六个仓库流上的平均值。

| Group | Column | Unit | Definition |
| :--- | :--- | :--- | :--- |
| Micro-skills | Proposed | skills / stream | 流最终账本中的候选技能 |
| | Confirmed | skills / stream | 满足确认条件且未被退役的候选项 |
| | Needed | tasks / stream | 需要技能的已执行任务，按技能求和 |
| | Retired | skills / stream | 退役的技能 |
| Tool schemas | Masked | schemas / stream | 在最后一个任务时仍处于屏蔽状态的工具，非累积计数 |
| | Re-audits | tasks / stream | 作为完整目录重新审计运行的任务 |
| Failure loops | Judged | consultations / stream | 升级到跟踪裁判的咨询 |
| | Redirects | redirects / stream | 写入轨迹的重定向 |
| | Aborts | terminations / stream | 在完成之前停止的轨迹 |

附录 I 元策略决策示例

本附录通过 SWE-Bench 中的示例展示了每种元策略：(a)–(e) 中的微技能，(f) 和 (g) 中的工具屏蔽，以及 (h) 和 (i) 中的故障循环干预。示例 (a)、(b) 和 (f)–(i) 比较了 TokenEconomizer 与同一任务上的默认执行。

I.1 微技能注入

每个微技能示例给出了注入的技能、提议者编写的检测器，以及在学习该技能的流中的生命周期。示例 (a) 和 (b) 被激活并注入，并且每个示例都以一个获得该技能的任务结束，与默认执行相比。其余三个说明了其他结果：(c) 因矛盾而被退役，(d) 被确认但从未通过需求门控，(e) 从未满足确认条件。

任务按其在流中的位置编号，因此提议者在任务 4、9、14 等之后运行。检测器是任务命令和输出上的正则表达式，除非它命名了一个内置谓词（如 `ran_tests`）或提议者定义的提取器，其模式在括号中给出；破折号标记提议者省略的检测器。在轨迹中，以 `$` 或工具名称（如 `Edit`）开头的每一行都是一个工具调用，缩进的灰色文本是其输出，括号中的灰色计数代表未显示的工具调用。

(a) sympy Claude Code, Opus 4.8 sympy-13615

技能

除了 pytest，还可以通过原生运行器 `python -c "import sympy; sympy.test('sympy/.../test_x.py')"` 或 `python -m sympy.utilities.runtests` 运行测试。

检测器

```
scope       ran_tests

confirm     sympy\.utilities\.runtests|sympy\.test\(

contradict  -

need        sympy_test_runner (sympy\.utilities\.runtests|sympy\.test\( in a command)
```

生命周期，60 个任务

在任务 9 之后提出，引用任务 5 和 6

在准入时激活：在任务 3、5 和 6 上得到确认，后两者的编辑不重叠

            (matexpr.py | permutations.py | sparse.py)；需要 4/4

注入    任务 10-60；以下轨迹为任务 11

结束    活跃状态；在 10 个已执行任务中有 10 次确认且无矛盾


默认，15 轮

  (10 次工具调用：定位并编辑 Complement，运行复现)

$ python -m pytest sympy/sets/tests/test_sets.py -q 2>&1 | tail -15

  /opt/miniconda3/envs/testbed/bin/python: No module named pytest

$ python -m sympy.utilities.runtests sympy/sets/tests/test_sets.py 2>&1 | tail -20

  (仅弃用警告；未运行测试)

$ python -c "import sympy; sympy.test('sympy/sets/tests/test_sets.py')" 2>&1 | tail -20

  tests finished: 72 passed, 2 expected to fail, in 5.48 seconds

  (1 次工具调用：运行整个 sympy/sets 包)


TokenEconomizer，11 轮

  (9 次工具调用：定位并编辑 Complement，运行复现)

$ python -c "import sympy; sympy.test('sympy/sets/tests/test_sets.py')" 2>&1 | tail -15

  tests finished: 72 passed, 2 expected to fail, in 5.37 seconds


(b) sphinx Claude Code, Sonnet 5 sphinx-7889

技能

在此仓库中复现问题的标准方法是在 /tmp 下构建一个包含 conf.py 的最小 Sphinx 项目，并运行 `python -m sphinx -b <builder> <srcdir> <outdir>`。


检测器

scope       python -m sphinx -b

confirm     python -m sphinx -b \S+ \S+ \S+

contradict  -

need        -


生命周期，44 个任务

提出    在任务 4 之后，引用任务 1-3

候选    在任务 1 和 3 上得到确认，但两者都编辑了一个名为 conf.py 的文件，因此这两个

            算作具有非重叠编辑的 3 次确认中的 1 次

激活    在任务 6 之后，一旦任务 5 (inheritance_diagram.py) 和任务 6 (other.py, toctree.py)

            确认它；需要 4/4

注入    任务 7-44；以下轨迹为任务 15

结束    活跃状态；在 32 个已执行任务中有 32 次确认且无矛盾


默认，11 轮

  (7 次工具调用：读取和编辑 mock.py，检查 git log 和已安装版本)

$ python -c "from sphinx.ext.autodoc.mock import _MockObject; ...; print(obj[T])"

  _MockObject.~T

  (1 次工具调用：第二次内联检查)

$ python -m pytest tests/test_ext_autodoc_mock.py -q 2>&1 | tail -20


TokenEconomizer，10 轮

  (5 次工具调用：读取 mock.py，搜索 git log，编辑，运行内联检查)

$ mkdir -p /tmp/genericmock/mymod; cat > /tmp/genericmock/conf.py <<'EOF' ...

    autodoc_mock_imports = ['missingdep'] ... EOF; cd /tmp/genericmock && python -m sphinx -b html . _build

  build succeeded, 1 warning.

$ git stash && cd /tmp/genericmock && python -m sphinx -b html . _build ...; git stash pop

  (2 次工具调用：运行 tests/test_ext_autodoc_mock.py，清理)


(c) sympy Claude Code, Sonnet 5 在一次注入后退休

技能，高风险

使用 `python -m pytest sympy/<subpackage>/tests/test_<name>.py -q` 运行 sympy 测试；这是此仓库的标准测试调用方式。


检测器

scope       pytest_module_used (命令中包含 python -m pytest sympy/.*test_.*\.py)

confirm     python -m pytest sympy/.*test_.*\.py

contradict  ImportError|ModuleNotFoundError|no tests ran|error: unrecognized

need        -


生命周期，60 个任务

提出    在任务 4 之后，引用任务 2 和 4

确认    在准入时确认：任务 2、3 和 4，其编辑不重叠

            (function.py | matexpr.py, summations.py | permutations.py)

激活    在任务 5 之后，一旦需要门控有 4 个已执行任务

注入    仅任务 6

退休    在任务 6 之后，其轨迹与之矛盾，这导致其支持度降至零以下

结束    已退休；在 51 个已执行任务中有 40 次确认和 11 次矛盾


TokenEconomizer，任务 6，sympy-13031，15 轮

  (11 次工具调用：定位堆叠代码，运行复现，读取 git 历史)

$ python -m pytest sympy/matrices/tests/test_commonmatrix.py -q -k "hstack or vstack" 2>&1 | tail -20

  /opt/miniconda3/envs/testbed/bin/python: No module named pytest

$ source activate testbed 2>/dev/null; which python; python -c "import pytest" 2>&1; conda env list

  ModuleNotFoundError: No module named 'pytest'

  （1 次工具调用：使用 bin/test 运行测试）

该指令对此环境而言是错误的，因为该环境没有 pytest：流中的全部 57 条轨迹在调用 pytest 时均因 `No module named pytest` 而失败。尽管技能被激活，是因为其确认检测器匹配的是 pytest 命令本身，而非成功的执行结果，因此智能体在任务 2–5 上的失败尝试被计为确认。第一个接收该技能的任务尝试了命令并探测了模块，而探测结果中的 `ModuleNotFoundError` 匹配了矛盾检测器。在权重 $\lambda=5$ 下，这唯一的矛盾超过了衰减后的确认值，导致该技能在一次注入后即从手册中移除。示例 (a) 展示了另一条流为同一仓库学到的原生运行器。

(d) sympy Claude Code, Opus 4.8 从未清除需求门

技能，高风险

sympy 包从树内源码导入，因此对 .py 文件的编辑会立即生效；在测试前无需执行 `pip install` 或 `setup.py develop` 重新安装。

检测器

scope       ran_tests

confirm     python -m pytest\s+sympy/|sympy\.test\(

contradict  pip install|setup\.py\s+(develop|install)

need        reinstall_invoked (pip install|setup\.py\s+(develop|install) 出现在命令中)

生命周期，60 个任务

proposed    在任务 9 之后提出，引用任务 3 和 6

confirmed   在准入时确认：任务 3、5 和 6，其编辑不重叠

            (matexpr.py | permutations.py | sparse.py)；need 0/4

activated   从未激活：没有经过练习的任务执行过重新安装，因此 need 率保持为 0 < 0.4

end         未激活；10 次确认，无矛盾，need 0/10

该技能与 (a) 来自同一条流，且具有相同的确认值。其确认值成立，但智能体从未尝试它警告要避免的重新安装，因此注入它只会将它的 token 添加到每一轮中，而无法防止任何浪费。

(e) sphinx Claude Code, Sonnet 5 从未激活

技能，高风险

sphinx/domains/python.py 的标准测试文件是 tests/test_domain_py.py；Python 域编辑使用 `python -m pytest tests/test_domain_py.py` 进行验证。

检测器

scope       domains/python\.py|test_domain_py

confirm     test_domain_py\.py

contradict  test_domain_py\.py.{0,20}(FAILED|ERROR|not found)

need        -

生命周期，44 个任务

proposed    在任务 34 之后提出，引用任务 30 和 34

candidate   在任务 30、33、34、38、39、40 和 43 上确认，这些任务编辑了

            python.py | docfields.py | python.py | __init__.py, inspect.py, python.py |

            python.py | python.py | python.py

end         候选状态；7 次确认，仅 2 次具有非重叠编辑

除一次确认外，所有确认均来自编辑了名为 python.py 的文件的任务，因此证据反映的是一个在多个任务中重复出现的模块，而非在整个仓库中通用的实践，因此该技能从未激活。

I.2 工具剪枝

示例 (f) 和 (g) 展示了 Claude Code 和 Copilot CLI 上 Django 流前 4 个任务的工具掩码，以及每个任务首次请求的提示 token。

(f) django Claude Code, Sonnet 5 前 4 个任务 工具剪枝

掩码工具

AskUserQuestion, CronCreate, CronDelete, CronList, EnterPlanMode, EnterWorktree, ExitPlanMode, ExitWorktree, NotebookEdit, ScheduleWakeup, Skill, Task, TaskCreate, TaskGet, TaskList, TaskOutput, TaskStop, TaskUpdate, Workflow

默认，每个任务

  加载 23 个工具；每个任务的首次请求：42-46k 提示 token

TokenEconomizer，首次请求提示 token（默认值在括号内）

task 1  django-10097  23 tools loaded             42,866 (42,866)

task 2  django-10554  judge masks the 19 above    16,295 (43,351)

task 3  django-10880  judge masks the same 19     15,003 (42,059)

task 4  django-10914  evidence masks the same 19  15,299 (42,355)

                      （在 3 个任务中均未使用）

从任务 2 加载于：Bash、Edit、Read、Write

(g) django Copilot CLI，Sonnet 5 前 4 个任务 工具剪枝

屏蔽的工具

factories_manage, fetch_copilot_cli_documentation, list_agents, read_agent, run_factory, session_store_sql, skill, sql, task, write_agent

默认，每个任务

  加载了 19 个工具；每个任务的第一个请求：25-26k prompt tokens

TokenEconomizer，首个请求的 prompt tokens（默认值在括号中）

任务 1  django-10097  加载了 19 个工具             25,765 (25,760)

任务 2  django-10554  judge 屏蔽了上述 10 个    11,347 (26,249)

任务 3  django-10880  judge 屏蔽了相同的 10 个     10,066 (24,969)

任务 4  django-10914  evidence 屏蔽了相同的 10 个  10,343 (25,248)

                      （在 3 个任务中均未使用）

  从任务 2 加载：bash, create, edit, glob, grep, list_bash, read_bash, stop_bash, view

I.3 失败循环干预

示例 (h) 显示重定向后，智能体测试其更改并在比默认执行更少的轮次中完成，而 (i) 显示在默认执行也失败的任务上强制停止。

(h) sphinx Claude Code, Opus 4.8 sphinx-11445 重定向

默认，42 轮

  对 sphinx/util/rst.py 进行 18 次编辑，并在任务通过前进行了 3 次测试运行

TokenEconomizer，31 轮

  第 1-18 轮：对 sphinx/util/rst.py 进行 11 次编辑，无测试运行，相同的失败重复了 3 次

重定向（trace judge：卡住，置信度 0.72）

  进程检查（自动化）：到目前为止，您已在 1 个文件中进行了 11 次编辑 ... 并运行了 0

  验证 ... 尝试一个本质上不同的假设：重新阅读失败测试的预期 ...

$ grep -rn "prepend_prolog\|rst_prolog\|docinfo" /testbed/tests/test_util_rst.py

$ python -c "from sphinx.util.rst import prepend_prolog; ..."

$ python -m pytest tests/test_util_rst.py -q 2>&1 | tail -15

  7 个通过，耗时 0.65 秒

(i) xarray Claude Code, Opus 4.8 xarray-6798 强制停止

默认，32 轮，失败

  对 xarray/core/coordinates.py 进行 6 次编辑，进行了 3 次测试运行；任务仍然失败

TokenEconomizer，25 轮，失败

  学习到的轮次预算 B_i = 10.25 轮；在 2.5 B_i 时强制停止

  至此：对 xarray/core/coordinates.py 进行 7 次编辑，14 个错误输出，相同的失败重复了 3 次

停止：超过 2.5 B_i，且严格停滞规则触发

  任务失败，正如在默认执行中一样，提前了 7 轮

附录 J 特定于 Harness 的定制

TokenEconomizer 仅通过其 harness 已经暴露的接口访问每个智能体：任务 prompt、启动时应用的工具配置，以及 harness 在运行期间发出的事件流。三种元策略和标准化 trace 格式在 harness 之间共享，而特定于 harness 的适配器实现可用的控制。每个付费控制器调用都使用与任务智能体相同的模型和路由。

特定供应商的事件流被转换为包含工具名称、参数、观察结果、模型输出、使用情况和评分结果的通用表示。元策略实现仅消耗此标准化接口。所有实验均使用 Claude Code 2.1.170、Codex 0.153.1 和 GitHub Copilot CLI 1.0.84-7。

答案键保护。

Web-Bench 评分规范和 SWE-Bench 修复提交在 GitHub 上公开，因此具有网络访问权限的智能体可以读取答案而不是解决任务。在这两个基准测试中，每种方法（包括默认执行）因此在所有三个 harness 上都受到相同的保护：任务容器将 GitHub 主机解析为不可达地址，因此任何按名称查找它们的命令都无法连接。Claude Code 和 Copilot CLI 还运行一个预执行钩子，拒绝引用 GitHub 的 shell 命令；Codex 0.153.1 接受钩子配置，但在我们的测试中未调用它，这可能是该版本的限制，因此它仅依赖第一层。

Claude Code。

Claude Code 无头运行并发出 JSON 事件流，控制器实时读取该流并将其作为任务的 trace 保留。工具目录来自流的 session-start 事件。

• 

微技能。渲染后的手册被前置到任务 prompt 中。

• 

工具剪枝（Tool pruning）。被屏蔽的工具会通过 CLI 的 `disallowed-tools` 选项传递，从而从每个请求中移除它们的 schema。

• 

失败循环干预（Failure-loop intervention）。Guard 在流到达时读取流内容。为了实现重定向，它会停止当前的 CLI 并在新容器中启动新的调用，将重定向指令放入 prompt 中，同时保留代理（agent）对磁盘的编辑。第二次判定为“卡住”则终止任务。两次调用的 token 用量将累加。

Codex。

Codex 也以无头模式运行，并输出 JSON 事件流。它与另外两个测试框架的区别在于一个接口特性：其工具无法逐个移除，因为相关工具组和指令只能在配置文件中整体开启或关闭。

• 

微技能（Micro-skills）。渲染后的手册会前置到任务 prompt 中，类似于 Claude Code 的做法。

• 

工具剪枝（Tool pruning）。剪枝的基本单位是能力包（capability package）而非单个工具：包括子代理协作、目标跟踪、图像输入、捆绑技能，以及基础 prompt 中对交互式聊天的指导（无头运行从不使用这些）。第 3.2 节的规则对能力包保持不变。屏蔽掩码（mask）会写入每个任务的配置文件中。

• 

失败循环干预（Failure-loop intervention）。与 Claude Code 类似，重定向会在同一容器中启动新的调用，第二次判定为“卡住”则终止任务。

Copilot CLI。

Copilot CLI 的事件流不报告 token 用量，因此控制器从 CLI 的调试日志中读取用量和工具目录。

• 

微技能（Micro-skills）。渲染后的手册会前置到任务 prompt 中，类似于 Claude Code 的做法。

• 

工具剪枝（Tool pruning）。被屏蔽的工具会通过 CLI 的 `excluded-tools` 选项传递，从而从请求中移除它们的 schema；而其 `deny-tool` 选项仅拒绝执行，但仍会在每一轮中计费每个 schema。

• 

失败循环干预（Failure-loop intervention）。与 Claude Code 类似，重定向会在同一容器中启动新的调用，第二次判定为“卡住”则终止任务。
