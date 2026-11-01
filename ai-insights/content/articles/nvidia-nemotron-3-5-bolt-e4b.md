---
title: "NVIDIA 发布 Bolt E4B：给本地助手和机器人用的小模型，少说废话，更会调用工具"
date: 2026-10-24T00:00:00.000Z
tags: ["产品发布", "NVIDIA", "Nemotron", "端侧 AI", "Agent", "聚合"]
summary: "从 Gemma 4 继续训练，兼顾简短对话和连续工具调用。约 6GB 内存的说法、机器人演示和性能数字，各有需要看清的条件。"
---
> **原文链接**: [https://research.nvidia.com/labs/nemotron/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB/](https://research.nvidia.com/labs/nemotron/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB/)
> **来源**: research.nvidia.com
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/nvidia-nemotron-3-5-bolt-e4b/) · 2026/10/24
> **说明**: 本文由 AIHot 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

![NVIDIA](https://research.nvidia.com/labs/nemotron/images/nvidia-ai.jpg)
    
  

  
    
    

#### NVIDIA

    
  

  
    
    
  

  
  

  
    
    
    
    

    
      
        
      

      
        

##### 技术报告

---

## Introducing NVIDIA Nemotron 3.5 Bolt E4B 4GB

今天，我们很高兴发布 [Nemotron 3.5 Bolt E4B 4GB](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB)——这是我们最新的开源小型语言模型，专为对话式 Agent 场景中的速度和每 GB 智能水平进行了优化。

Bolt E4B 基于 Gemma 4 E4B 构建，并经过 Nemotron 后训练。它将自然对话与多轮 agentic 能力相结合，可为运行在 NVIDIA [GeForce RTX](https://www.nvidia.com/en-us/geforce/rtx/)、[Jetson](https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/)、[RTX Spark](https://www.nvidia.com/en-us/products/rtx-spark/) 和 [DGX Spark](https://www.nvidia.com/en-us/products/workstations/dgx-spark/) 上的语音/设备助手、交互式角色以及机器人/IoT 界面提供支持。

与我们[之前的模型](https://huggingface.co/blog/nvidia/nemotron-3-nano-4b)相比，Bolt E4B 在关键对话式 Agent 基准测试中的平均质量提升了约 40%,同时与同类模型相比输出 token 数量最多减少约 80%。

Bolt E4B 旨在将其目标工作负载中的对话式 Agent 智能压缩到约 4GB 以内，在提供响应迅速的本地体验的同时，为同一流水线中的应用程序和其他模型保留充足的余量。

### 模型特性

- **多轮工具使用**：在整个对话过程中调用应用程序 API 来执行任务，并提供异步工具调用的集成指南
- **对话模式**：可切换以鼓励生成简洁、适合语音的回复，实现自然的双向交互
- **可配置的推理**：针对复杂请求启用推理，或禁用推理以获得更快的响应，并提供集成选项来限制思考量以满足延迟目标
- **64k 上下文**：可容纳对话历史、指令、工具定义、检索到的信息以及应用程序状态
- **多语言能力**：支持 35 种语言，基于在超过 140 种语言上预训练的基础模型

### 每台设备上的 Agent

我们一直在向 NVIDIA Jetson、GeForce RTX 和 DGX Spark 的客户——无论是企业还是爱好者——学习他们如何使用我们的硬件来加速其工作负载。

随着语言模型能力的不断增强，我们看到客户对将它们用于以下体验的兴趣日益浓厚：

- **设备与语音助手**：面向 PC、移动设备、应用程序、家居或操作系统控制的快速本地助手；客户服务；以及车载座舱体验
- **虚拟与交互式角色**：游戏内 NPC、陪伴角色以及其他在保持人设的同时将对话与动作相结合的交互式角色
- **嵌入式与工业 Agent**:机器人和重型机械的人机界面；系统自动化和工业 IoT

  ![在 Jetson Orin Nano 8GB 上运行的 Reachy Mini](https://research.nvidia.com/labs/nemotron/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB/images/nvidia-nemotron-3.5-bolt-e4b-4gb/bolt_reachy.gif)
  

  

在 Jetson Orin Nano 8GB 上运行的 Reachy Mini。Cosmos 3 Edge 为 Bolt E4B 提供对现实世界的实时视觉理解，Bolt E4B 则调用机器人动画库中的脚本并驱动其语音回复。

  ![在铁匠商贩 NPC 上测试 Bolt E4B。](https://research.nvidia.com/labs/nemotron/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB/images/nvidia-nemotron-3.5-bolt-e4b-4gb/bolt_blacksmith.gif)
  

  

在铁匠商贩 NPC 上测试 Bolt E4B。该 Agent 会验证某件物品的付款是否正确，然后自主调用工具来查看制作配方、收集材料、制作物品并将其交付给用户。

许多大型模型都有能力驱动这些 Agent——但内存、延迟、硬件兼容性、成本或隐私方面的限制使开发者无法将其部署到生产环境中。

因此，他们转向速度更快、成本更低、体积更小的本地模型，以实现这些体验。

### 评估实时交互式 Agent

为这类体验选择模型，并不像在当今的 LLM 排行榜上挑选最高分那么简单。

擅长 agentic coding 的模型，往往并不最适合一个响应迅速、互动有趣的家用助手——这些 Agent 需要的是另一种能力组合。通过与客户的交流，我们总结出以下几个共同特征：

- 模型通常需要扮演一个 Agent,在同一物理或虚拟空间中与人类自然对话
- 它必须知道是否、何时以及如何在对话中穿插正确的 tool calls 来执行操作
- 它必须可靠地遵守明确的行为、persona、品牌或输出约束
- 它必须通过解读提供的 app/世界遥测数据、检索到的数据库 payload 或 tool 结果来理解其所处的环境
- 而且，它必须将所有对话和操作建立在上述全部上下文的相关部分之上——尤其是在存在干扰信息时，或随着上下文在对话过程中不断累积时

当前的 benchmark 只能部分反映这些 Agent 良好运作所需的要素，而且没有任何一个单独的 benchmark 能覆盖应用所需的全部能力。归根结底，benchmark 上的提升必须能够转化为目标应用中更好的实际表现。

### 模型 Benchmark 与性能

我们选取了与客户工作负载高度契合或客户已在使用的互补性 benchmark,并将它们归纳为五类能力。下图对比了 Bolt E4B 与不同规模模型在代表性 benchmark 质量、time to first token 和 VRAM 占用方面的表现：

  ![NVIDIA Nemotron 3.5 Bolt E4B 4GB 在各开源模型中的 benchmark 准确率与 TTFT 对比](https://research.nvidia.com/labs/nemotron/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB/images/nvidia-nemotron-3.5-bolt-e4b-4gb/bolt_ttft-vs-accuracy.png)
  

  

MultiChallenge、RoleMRC、BFCL-v3、IHEval、SysBench 和 RelyToolBench 上的平均 Q4_K_M 分数。在 RTX 5090 上以 ~3K/50 ISL/OSL 测得。云端参考结果(分数/TTFT):Gemini 3.8 Flash (77.1 / 2,449.5ms);Claude Sonnet 5.5 (76.2 / 3,002.2ms)。

**对话与 Persona**

| Benchmark(指标) | 描述 | Nemotron 3.5 Bolt E4B 4GB | Nemotron 3 Nano 4B | Qwen 3.5 4B | Gemma 4 E4B |
| --- | --- | --- | --- | --- | --- |
| Brevity Bench(平均质量/简洁度) | 回答质量与简洁度 | 82.5 | 73.6 | 75.3 | 80.0 |
| [EQ-Bench v3](https://eqbench.com/eqbench3.html)(Rubric) | 角色扮演中的情商 | 39.4 | 19.3 | 32.9 | 41.1 |
| [MultiChallenge](https://labs.scale.com/leaderboard/multichallenge)(总分) | 跨轮次一致性 | 53.1 | 35.3 | 51.8 | 42.1 |
| [RoleBench](https://github.com/InteractiveNLP-Team/RoleLLM-public)(相对参考的 Custom Win %) | 角色说话风格 | 67.0 | 12.0 | 53.7 | 49.9 |
| [RoleMRC](https://github.com/LuJunru/RoleMRC)(Judge 平均分，不含多轮) | 角色身份一致性 | 80.6 | 47.0 | 65.8 | 74.6 |

**多轮 Tool Use**

| Benchmark(指标) | 描述 | Nemotron 3.5 Bolt E4B 4GB | Nemotron 3 Nano 4B | Qwen 3.5 4B | Gemma 4 E4B |
| --- | --- | --- | --- | --- | --- |
| [BFCL-v3](https://github.com/ShishirPatil/gorilla/tree/main/berkeley-function-call-leaderboard)(平均准确率) | 正确的 tools 与参数 | 68.5 | 61.1 | 70.9 | 66.4 |
| [Tau2-Bench](https://taubench.com/leaderboard/?benchmark=core)(平均准确率) | 多轮客户任务 | 55.1 | 29.2 | 75.1 | 38.5 |
| [ToolSandbox](https://github.com/apple-aiml-research/ToolSandbox)(平均准确率) | 状态变化下的 tool use | 68.8 | 57.9 | 69.5 | 65.4 |
| When2Call-MT(总体准确率) | 何时调用、澄清或放弃 | 63.4 | 27.7 | 37.8 | 62.9 |

**指令与控制**

| Benchmark(指标) | 描述 | Nemotron 3.5 Bolt E4B 4GB | Nemotron 3 Nano 4B | Qwen 3.5 4B | Gemma 4 E4B |
| --- | --- | --- | --- | --- | --- |
| [AgentIF](https://agentif.github.io/)(指令成功率) | 复杂的 agentic 指令 | 25.8 | 20.1 | 20.4 | 21.9 |
| [IFBench](https://artificialanalysis.ai/evaluations/ifbench)(Prompt loose 准确率) | 精确的输出约束 | 63.8 | 60.1 | 58.9 | 42.8 |
| [IHEval](https://github.com/ytyz1307zzh/IHEval)(冲突准确率) | 指令层级/优先级 | 84.8 | 51.3 | 60.6 | 67.0 |
| [InverseIFEval](https://arxiv.org/abs/2509.04292)(总体准确率) | 反直觉指令 | 46.8 | 35.2 | 31.0 | 42.0 |
| [StructEval-T](https://structeval.github.io/)(平均准确率) | 有效的结构化输出 | 80.4 | 63.5 | 76.0 | 79.3 |

**上下文鲁棒性**

| 基准测试(指标) | 描述 | Nemotron 3.5 Bolt E4B 4GB | Nemotron 3 Nano 4B | Qwen 3.5 4B | Gemma 4 E4B |
| --- | --- | --- | --- | --- | --- |
| [LongBench v2](https://longbench2.github.io/) (48K, 总体准确率) | 理解长提示词 | 50.5 | 31.4 | 59.9 | 49.3 |
| [LongMemEval](https://github.com/xiaowu0162/LongMemEval) (总体准确率) | 跨对话的记忆召回 | 72.1 | 25.2 | 66.8 | 70.9 |
| [RULER (64K)](https://github.com/NVIDIA/RULER) (总体准确率) | 上下文检索与推理 | 87.0 | 91.5 | 95.1 | 86.5 |
| [SysBench](https://github.com/PKU-Baichuan-MLSystemLab/SysBench) (指令成功率) | 遵循长提示词中的规则 | 67.9 | 60.9 | 67.3 | 65.8 |

**状态与动作接地**

| 基准测试(指标) | 描述 | Nemotron 3.5 Bolt E4B 4GB | Nemotron 3 Nano 4B | Qwen 3.5 4B | Gemma 4 E4B |
| --- | --- | --- | --- | --- | --- |
| [GaRAGe](https://github.com/amazon-science/GaRAGe) (相关性感知的事实性) | 基于所提供来源的事实 | 42.6 | 25.2 | 24.7 | 34.7 |
| [RAGTruth](https://github.com/ParticleMedia/RAGTruth) (F1) | 避免无依据的断言 | 77.6 | 71.4 | 75.6 | 77.0 |
| [RelyToolBench](https://github.com/X-LANCE/ToolHallucination) (原生/真实通过率 %) | 工具接地与幻觉 | 63.2 | 41.2 | 43.3 | 61.6 |

所有结果均为 BF16。每个基准测试在所有模型上使用相同的推理模式。推理模式因基准测试而异。Brevity Bench 和 When2Call-MT 弥补了现有评估的不足——将在稍后发布。

在所有这些基准测试中，Bolt E4B 的平均得分比我们先前的模型 Nano 4B 高出约 40%,比其他受评测的同类模型高出约 10%。

这些质量提升还伴随着更少的输出 token——在启用推理的对比中最多减少 80%。减少不必要的生成可降低解码工作量与成本，并有望缩短响应时间。

  ![NVIDIA Nemotron 3.5 Bolt E4B 4GB 在各开源模型间的基准准确率与 token 冗长度对比](https://research.nvidia.com/labs/nemotron/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB/images/nvidia-nemotron-3.5-bolt-e4b-4gb/bolt_verbosity-vs-accuracy.png)
  

好的回答在其目标工作负载中仍然需要足够快——通常为单会话(batch size 1)场景，输入 token 在 2.5K 到 16K 之间，输出 token 少于 500。

下表报告了在代表性硬件和工作负载下的峰值内存占用、首 token 生成时间(TTFT)和生成吞吐量。

**RTX**

| SKU | 缓存 / ISL / OSL | VRAM 占用 (GB) | TTFT (ms) | TPS (tokens/s) |
| --- | --- | --- | --- | --- |
| RTX 5070 (12GB) | 0 / 3K / 50 | 3.5 | 548 | 133.4 |
| 32k / 2K / 256 | 4.3 | 1,238 | 106.2 |
| RTX Spark (32GB) | 0 / 3K / 50 | 3.1 | 930 | 67.0 |
| 32k / 2K / 256 | 4.2 | 1,988 | 52.0 |

跨硬件的推理性能。所有配置均在 llama.cpp (CUDA) 上使用 Q4_K_M、batch size 1 并配合 AIPerf 进行测量。Cache/ISL/OSL 分别表示缓存上下文、新输入和输出的长度(以 token 计)。结果可能因硬件、推理软件和配置而异。

**Jetson**

| SKU | 缓存 / ISL / OSL | VRAM 占用 (GB) | TTFT (ms) | TPS (tokens/s) |
| --- | --- | --- | --- | --- |
| Jetson Orin Nano (8GB) | 0 / 3K / 50 | 4.2 | 5,785 | 15.5 |
| 32k / 2K / 256 | 4.9 | 6,259 | 13.0 |
| Jetson AGX Orin (32GB) | 0 / 3K / 50 | 4.2 | 3,687 | 24.0 |
| 32k / 2K / 256 | 5.0 | 4,091 | 20.3 |

跨硬件的推理性能。所有配置均在 llama.cpp (CUDA) 上使用 Q4_K_M、batch size 1 并配合 AIPerf 进行测量。Cache/ISL/OSL 分别表示缓存上下文、新输入和输出的长度(以 token 计)。结果可能因硬件、推理软件和配置而异。

### 训练方法与开放配方

Bolt E4B 基于 [Gemma4-E4B-it](https://huggingface.co/google/gemma-4-E4B-it),通过 Nemotron 后训练方法，在针对指令遵循、多轮 tool-calling 和对话能力的多个环境中构建而成。

我们使用了基于可验证奖励的强化学习(RLVR)和基于人类反馈的强化学习(RLHF),由 [NeMo-RL](https://github.com/nvidia-nemo/rl) 和 [NeMo-Gym](https://github.com/NVIDIA-NeMo/gym) 驱动。训练数据集如下所列，完整配方可在[此处](https://github.com/NVIDIA-NeMo/Automodel/blob/main/docs/model-coverage/vlm/nvidia/nvidia-nemotron-3-5-bolt-e4b-4gb-bf16.mdx)获取：

- Tool-Calling:  [Conversational Tool Use Pivot](https://huggingface.co/datasets/nvidia/Nemotron-RL-Agentic-Conversational-Tool-Use-Pivot-v1)
- Tool-call schema:  [Function Calling Pivot](https://huggingface.co/datasets/nvidia/Nemotron-RL-Agentic-Function-Calling-Pivot-v1)
- Instruction Following:  [Instruction Following](https://huggingface.co/datasets/nvidia/Nemotron-RL-instruction_following), [SysBench](https://huggingface.co/datasets/nvidia/Nemotron-RL-SysBench-v1), [InverseIFEval](https://huggingface.co/datasets/nvidia/Nemotron-RL-InverseIFEval-v1), [CFBench](https://huggingface.co/datasets/nvidia/Nemotron-RL-CFBench-v1), [MultiTurnChat](https://huggingface.co/datasets/nvidia/Nemotron-RL-Instruction-Following-MultiTurnChat-v1), [Calendar](https://huggingface.co/datasets/nvidia/Nemotron-RL-Instruction-Following-Calendar-v2)
- Instruction Hierarchy: [System-User-Instruction-Hierarchy](https://huggingface.co/datasets/nvidia/Nemotron-System-User-Instruction-Hierarchy-v1)
- Structured Outputs:  [Structured Outputs](https://huggingface.co/datasets/nvidia/Nemotron-RL-Instruction-Following-Structured-Outputs-v2)
- Free-form formatting:  [Free-Form Formatting](https://huggingface.co/datasets/nvidia/Nemotron-RL-Instruction-Following-Free-Form-Formatting-v1)
- GenRM: [Nemotron-RLHF-GenRM-v1](https://huggingface.co/datasets/nvidia/Nemotron-RLHF-GenRM-v1) 的更新版本

为了强调非推理(non-reasoning)模式的准确性,我们在推理和非推理两种模式下使用了 RLVR/RLHF 训练混合数据中的全部样本。我们在两种模式下分别分析了每个数据集的奖励,并在每个训练批次中保持非推理样本与推理样本 2:1 的比例。

随着后训练(post-training)的推进,推理轨迹和最终答案都变得显著更长。为了控制冗长度,我们在 GenRM 环境中增加了针对推理长度和答案长度的组相对长度惩罚。在所有其他环境中,我们禁用了过长过滤。

后训练完成后,我们使用 llama.cpp 并结合重要性矩阵(importance-matrix,imatrix)校准,将选定的 BF16 checkpoint 量化为 Q4_K_M。校准使用了来自与选定 checkpoint 相同训练步骤的约 1M token 的 RL rollout。

本次发布还包括一个 DFlash 并行 drafter。它在一次前向传播中提出所有 draft token,由目标模型并行验证,同时保持目标模型的输出分布。相较于 Gemma-4-E4B 原有的 MTP drafter,DFlash 可带来高达 21% 的吞吐量提升。

请查看我们的[技术报告](https://research.nvidia.com/labs/nemotron/files/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB-Technical-Report.pdf)了解更多详情!

### 部署、配置,并为你的用例进行定制

立即通过 [Hugging Face](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB)、[Ollama](https://ollama.com/library/nemotron-3.5-bolt)、LM Studio、[Unsloth](https://unsloth.ai/docs/models/nemotron-3.5-bolt)、Canonical、[Jetson AI Lab](https://www.jetson-ai-lab.com/models/Nemotron-3-5-Bolt-E4B-4GB) 以及 [NVIDIA In-Game Inferencing SDK](https://developer.nvidia.com/rtx/in-game-inferencing) 开始使用 Bolt E4B。

探索我们的模型卡和部署代码片段、训练配方,以及提示词/应用设置指南。

我们期待看到你构建的作品!

#### Checkpoints

- [NVIDIA-Nemotron-3.5-Bolt-E4B-4GB](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB) - GGUF 格式的后训练模型
- [NVIDIA-Nemotron-3.5-Bolt-E4B-4GB-DFlash](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB-DFlash) - GGUF checkpoint 对应的 drafter 模型
- [NVIDIA-Nemotron-3.5-Bolt-E4B-BF16](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-BF16) - BF16 HF 格式的后训练模型
- [NVIDIA-Nemotron-3.5-Bolt-E4B-BF16-DFlash-NVFP4](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-BF16-DFlash-NVFP4) - HF checkpoint 对应的 drafter 模型

        
      

      

      

  
    

##### 分享到

  

  [Twitter](https://twitter.com/intent/tweet?text=https://research.nvidia.com/labs/nemotron/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB/)

[Facebook](https://www.facebook.com/sharer/sharer.php?u=https://research.nvidia.com/labs/nemotron/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB/)

[LinkedIn](https://www.linkedin.com/shareArticle?mini=true&url=https://research.nvidia.com/labs/nemotron/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB/)
