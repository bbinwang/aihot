---
title: "NVIDIA 推出开源机器人模型 GR00T 2：给机械手装上懂物理因果的「运动小脑」可以拿捏草莓"
date: 2026-11-10T00:00:00.000Z
tags: ["产品发布", "NVIDIA", "GR00T 2", "具身智能", "机器人仿真", "Isaac Lab", "Agent", "聚合"]
summary: "从开源世界动作模型 GR00T 2、Isaac Lab 3.0 与 Newton 柔性物理仿真，到百万环境错题加练与 Agent 自动编排控制图，拆解具身智能如何跨过工业落地的最后一毫米。"
---
> **原文链接**: [https://blogs.nvidia.com/blog/robotics-simulation-advancements-corl/](https://blogs.nvidia.com/blog/robotics-simulation-advancements-corl/)
> **来源**: blogs.nvidia.com
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/robotics-simulation-advancements-corl/) · 2026/11/10
> **说明**: 本文由 AIHot汪 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

## 熟能生巧:在 CoRL 上,NVIDIA 与合作伙伴揭示机器人如何在仿真中演练精细工作

在机器人学习大会(Conference on Robot Learning)上,NVIDIA 推出 GR00T 2、Isaac Lab 3.0 以及与合作伙伴共同打造的全新开放基准,为机器人训练带来精度与规模。

2026年11月9日,作者:[Sasa Docca](https://blogs.nvidia.com/blog/author/akhildocca.md)

![](https://blogs.nvidia.com/wp-content/uploads/2026/11/corl-corp-blog-promo-pack-1920x1080-1-1280x720.png)

仿真长期以来一直是机器人学习行走、滚动和跳跃的试验场,如今它正帮助研究人员教会机器人需要更精细操作的任务:对齐齿轮、连接线缆以及组装小型组件。

从移动(locomotion)到操作(manipulation)的转变是本周在得克萨斯州奥斯汀举行的[机器人学习大会(Conference on Robot Learning, CoRL)](https://www.nvidia.com/en-us/events/corl.md)上的焦点,与此同时,agentic robotics 正在兴起——这是一种融合前沿 Agent、为实体机器人系统创建可解释代码的新范式。

在 CoRL 上,NVIDIA 推出全新的开放机器人技术,包括 [world action models](https://www.nvidia.com/en-us/glossary/world-action-model.md)、仿真工具、基准以及 agentic 工作流。

在 CoRL 最佳论文奖的数千篇投稿中,有两篇 NVIDIA 论文入围六强:

*   [GRAIL](https://research.nvidia.com/labs/dair/grail/)(Generating Humanoid Loco-Manipulation from World Models),提出了一套面向机器人学习的 3D 资产与仿真就绪场景的数字生成流水线。
*   [RoboTTT: Context Scaling for Robot Policies](https://research.nvidia.com/labs/gear/robottt/),提出了一种机器人模型与训练方案,可在不增加推理延迟的情况下,将视觉运动(visuomotor)上下文规模较最先进策略扩大三个数量级。

这些进展帮助研究人员训练机器人执行复杂任务,评估其在变化条件下的表现,并利用失败指导进一步学习——从而构建起从实验室演示迈向工业部署所需的精度、适应性与自主性。

NVIDIA 正与 [Ambi Robotics](https://www.ambirobotics.com/)、Bosch Research、[Dexmate](https://www.dexmate.com/blog/an-anatomy-of-coding-agents-tackling-robotics-tasks)、Dyna Robotics、FieldAI、Flexion、Noitom Robotics、Siemens、[Skild AI](http://skild.ai/blogs/steel-solver)、RLWRLD、UC Berkeley、Walden Robotics 以及 University of Washington 等合作伙伴携手,将这些进展带给更广泛的机器人社区。

### **World Action Models 助力机器人自主性迈向新高度**

更高级的机器人自主性要求机器人能够感知周围环境,预判其动作将如何改变环境,并以高精度执行复杂的多步骤任务。World action models 正是实现这一目标的关键。

在 CoRL 上,NVIDIA 推出 [GR00T 2](https://research.nvidia.com/labs/gear/gr00t-2),一个基于 NVIDIA Cosmos 构建的开放前沿 world action model。该模型基于多样化的机器人和人类数据训练,其中包括 10 万小时的 [NVIDIA 开源人类第一视角数据](https://huggingface.co/spaces/nvidia/PhysicalAI-Human-1M-Explorer),使机器人能够学习灵巧操作技能。主要特性包括:

*   **开箱即用的性能:** 无需任务专属演示,即在 50 项评估任务中至少成功完成其中的 40 项。
*   **技能迁移:** 从人类演示中学习,并在无需机器人演示的情况下,将技能迁移到不同的机器人本体上
*   **少数据下的泛化能力:** 每项任务仅需一次演示,即可在 50 项任务上实现平均 71% 的成功率;演示增至五次时,成功率提升至 95%。
*   **Agent 控制:** AI Agent 可以使用 GR00T 2 的应用程序接口(API)及配套工具,按顺序运行技能并从错误中恢复。

在 RoboCasa365、RoboLab、RoboDojo 和 MolmoSpaces 基准测试中,GR00T 2 目前在所有 vision language action 和 world action model 类别中均位列前三,并多次登顶排行榜。

Nexuni 正在测试将其用于机器人衣物处理，富士康(Foxconn)正将 GR00T 2 应用于服务器制造领域的工厂自动化，西门子(Siemens)则在多种工业用例中对其进行评估。

MicroAGI 正在使用经过强化学习后训练的 GR00T 2,通过 YAM 机械臂执行以太网线缆插拔任务。其 agentic robotics 方法利用 Isaac Lab 3.0 和 Newton 自动创建并校准仿真环境——策略(policy)正是在这些环境中进行训练的。

训练能力强大的机器人需要多样化的数据。NVIDIA 开放的工作流与模型为研究人员提供了更好的数据收集与标注工具：

*   对于构建机器人训练数据集的研究人员而言，NVIDIA 全新的开放 Video to Data 工作流可将人类视频转化为仿真机器人演示数据，并附有一项[挑战赛](https://nvidia-isaac.github.io/video_to_data/v2d_challenge/),邀请研究人员对其加以改进。
*   [NVIDIA EgoHand 开放模型](https://huggingface.co/nvidia/EgoHand-v1)——正在 CoRL 上进行演示，发布两周内在 Hugging Face 上的下载量已超过 40,000 次——可重建 3D 手部运动，其训练数据来自 Noitom Robotics。

### **训练与规模化的实现之地——仿真**

预训练模型赋予机器人一套核心技能。仿真让研究人员能够大规模地训练、优化和评估这些技能，然后再将其部署到实体机器人上。

[NVIDIA Isaac Lab](https://developer.nvidia.com/isaac/lab) 是一个开源的机器人学习框架，为这项工作奠定了基础。其最新版本 [Isaac Lab 3.0](https://github.com/isaac-sim/IsaacLab/releases/tag/v3.0.0) 让研究人员可以使用 Agent 快速搭建带有 [simulation-ready assets](https://www.nvidia.com/en-us/glossary/simready.md) 的训练环境、在 [NVIDIA PhysX](https://developer.nvidia.com/physx-sdk) 与 [Newton 物理求解器](https://developer.nvidia.com/newton-physics)之间切换、为基于感知的训练选择渲染器，并将全新的强化学习后训练库应用于 GR00T 等基础模型。

[精准物理](https://www.nvidia.com/en-us/use-cases/physics-simulation-for-robotics.md)对于将习得的技能从仿真迁移到实体机器人至关重要。通过与开源物理引擎 Newton 更紧密的集成，Isaac Lab 现在能够对线缆和布料等可变形物体，以及机械手这类包含大量相互作用关节的复杂铰接系统进行建模。

_与 Newton 的集成可模拟草莓在机器人抓握下发生的形变。_

Isaac Lab 与 Newton 相结合，将精准物理与规模化能力融为一体，使研究人员能够并行训练数千台仿真机器人。在一个基于视觉的灵巧操作基准测试中，配合 Newton 的 Isaac Lab 3.0 实现了配合 PhysX 的 Isaac Lab 2.3 最高 2.5 倍的训练吞吐量。

_Isaac Lab 支持基于 Newton 与 NVIDIA PhysX 的机器人仿真。_

开发者们正在扩展 Newton 的能力。在 CoRL 上，[Skild AI](http://skild.ai/blogs/steel-solver) 发布了 Scalable Throughput-optimized Engine for Embodied Learning(简称 STEEL)——一个基于 Newton 构建的全新刚体物理求解器，用于加速基于 Isaac Lab 的机器人训练。

__Skild AI 的 STEEL 求解器。__

Flexion 展示了 Isaac Lab 和 Newton 如何助力训练其结合推理与全身操作的机器人智能模型 Reflect。

_Flexion 将 Newton 与 Isaac Lab 结合用于 RL。_

FieldAI 正在使用 Newton——以及基于 NVIDIA Omniverse 库构建的 Isaac Lab 和 Isaac Sim——来训练和验证机器人策略，以便部署到非结构化的真实世界环境中。Dyna Robotics 将展示 Isaac Lab 中的并行仿真如何帮助为其[半人形机器人 Taku](https://www.dyna.co/dyna-2.1) 训练全身控制器，以应用于仓库、酒店和餐饮服务场景。

Walden Robotics 正在利用 Isaac Sim 的照片级真实感渲染，在面向制造和物流的虚拟环境中训练并评估其通用机器人；与此同时，[Dexmate](https://www.dexmate.com/blog/an-anatomy-of-coding-agents-tackling-robotics-tasks) 正在探索编码 Agent 如何在 Isaac Sim 中预演和优化操作策略，然后再在其 Vega 机器人上执行。

[AlphaNIST](https://alpha-nist.github.io/) 基于 Isaac Lab 构建,展示了高效的练习如何转化为精准度。单一策略即可学会 NIST Assembly Task Board 上的全部 20 项任务,仅使用“是/否”形式的成功信号来操作毫米级零件。它的训练成功率超过 98%,而逐任务单独训练的策略为 81%,且 GPU 时间消耗减少约 39 倍。

_AlphaNIST 使用 Isaac Lab 训练单一机器人策略,覆盖 NIST Assembly Task Board 上的 20 项精密操作任务。_

这些成果的背后是来自华盛顿大学和 NVIDIA 的 [Success-Guided Sampling](https://sgs-rl.github.io/)(SGS)。该方法将练习聚焦于策略成功率约为 50% 的任务,把训练引导至策略仍在学习的技能上。借助 SGS,机器人训练可以扩展到超过一百万个并行环境。

德克萨斯大学奥斯汀分校的计算学院与 Texas Robotics 利用 Isaac Sim 和 Isaac Lab 在仿真中训练机器人技能,让学生在物理硬件到位之前就能开始开发。

### **机器人评估的全新工业基准**

学会一项技能是一回事,在不断变化的条件下稳定地执行它是另一回事。

[NVIDIA Isaac Lab-Arena](https://developer.nvidia.com/isaac/lab-arena) 是一个用于规模化策略评估的开源框架,让开发者能够组合多样化且可重复的评估,并在数千种变体上并行运行策略。分析结果可以揭示哪些条件导致失败,让研究人员知道下次训练时需要改进什么。其最新版本 0.4 的开发者预览版将在 CoRL 上亮相。

DexBench 和 VABAR 是两个全新的开放基准,属于首批旨在利用 Isaac Lab-Arena 和 Newton 衡量机器人在工业任务中灵巧性与适应性的基准。

[DexBench](https://dexbench.ai/) 由 [RLWRLD](https://www.rlwrld.ai/en) 与 NVIDIA 合作开发,将灵巧性评估从桌面场景带入真实工作流。它基于 NVIDIA Isaac Lab-Arena 构建,涵盖零售、物流、制造和酒店四大场景的 15 项任务,测试在物体、空间和物理方面的泛化能力。

Genesis AI、mimic robotics 以及其他行业合作伙伴正在通过早期访问计划评估 DexBench。

团队可以在 Manifold——Bifrost 用于扩展机器人仿真的评估平台——上运行 DexBench,无需任何配置,内置失败分析功能,并可免费获得用于初始评估的额度。

[VABAR](https://berkeleyautomation.github.io/vabar-website/)——Variational Automation Benchmark for Agentic Robotics(面向 Agent 机器人技术的变分自动化基准)——由加州大学伯克利分校和 NVIDIA 推出,在六项工业任务上评估机器人。每项任务都带有标准化的变体、难度层级和成功指标。

_一个仿真的工具分拣任务展示了 VABAR 如何评估机器人在工业工作流中的操作技能。_

### **Agent 将技能转化为机器人程序**

成功完成任务需要机器人协调多项技能,并在出现问题时进行自适应调整。为这类多步骤任务构建可靠的程序仍然是一项挑战。

Agentic robotics 有助于解决这一挑战。

加州大学伯克利分校新推出的 [Graph-as-Policy](https://graph-robots.github.io/gap/)(GaP)框架使用 Agent 将单个技能连接成机器人程序。Agent 利用 NVIDIA Isaac 开放仿真技术测试这些程序,并根据失败情况进行改进。这有助于研究人员以更少的数据扩展开发,同时保持程序的可解释性,便于工程师在部署前进行审查和验证。

_GaP 使用 Agent 和仿真将单个机器人技能转化为协调动作,例如擦拭横杆。_

“对我而言,agentic robotics 是自 1995 年互联网诞生以来最令人兴奋的技术发展,”加州大学伯克利分校机器人学教授、VABAR 和 GaP 项目负责人 Ken Goldberg 表示。

![](https://blogs.nvidia.com/wp-content/uploads/2026/11/ambi-robotics-1680x1120.jpg)Ambi Robotics 正在探索将 GaP 应用于工业自动化。

[Ambi Robotics](https://www.ambirobotics.com/blog/agentic-robotics/)、Bosch Research 和 Siemens 都在探索将 GaP 用于跨多种工业场景的 agentic robotics 工作流。

_欢迎参加_ [_NVIDIA at CoRL_](https://www.nvidia.com/en-us/events/corl.md)_了解更多。_

*   分类：
*   [机器人](https://blogs.nvidia.com/blog/category/robotics.md)

*   标签：
*   [Agentic AI](https://blogs.nvidia.com/blog/tag/agentic-ai.md)
*   [人工智能](https://blogs.nvidia.com/blog/tag/artificial-intelligence.md)
*   [Cosmos](https://blogs.nvidia.com/blog/tag/cosmos.md)
*   [活动](https://blogs.nvidia.com/blog/tag/events.md)
*   [工业与制造](https://blogs.nvidia.com/blog/tag/industrial-manufacturing.md)
*   [Isaac](https://blogs.nvidia.com/blog/tag/isaac.md)
*   [NVIDIA Research](https://blogs.nvidia.com/blog/tag/nvidia-research.md)
*   [Omniverse](https://blogs.nvidia.com/blog/tag/omniverse.md)
*   [开源](https://blogs.nvidia.com/blog/tag/open-source.md)
*   [Physical AI](https://blogs.nvidia.com/blog/tag/physical-ai.md)
*   [机器人](https://blogs.nvidia.com/blog/tag/robotics.md)
*   [仿真与设计](https://blogs.nvidia.com/blog/tag/simulation-and-design.md)
