---
title: "微软披露自研大模型 MAI-Base-2：2.8 万亿参数，1.6 万块 GPU 训练了 38 天"
date: 2026-10-16T00:00:00.000Z
tags: ["会员", "研究解读", "微软", "MAI-Base-2", "预训练", "MoE", "聚合"]
summary: "从小模型的重复数据，到专家挤爆内存时的分轮调度，拆开微软这份前沿预训练报告里的方法、证据与取舍。"
---
> **原文链接**: [https://microsoft.ai/news/frontier-pre-training-at-microsoft-ai/](https://microsoft.ai/news/frontier-pre-training-at-microsoft-ai/)
> **来源**: Microsoft AI
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/microsoft-mai-base-2-pretraining/) · 2026/10/16
> **说明**: 本文由 AIHot 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

Lab Notes      
      


## Microsoft AI 的前沿预训练

  
  
      
  
  
    
    
      2026 年 10 月 15 日    

    
              
          Lab Notes        
          
    
          

    

- [LI](https://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fmicrosoft.ai%2Fnews%2Ffrontier-pre-training-at-microsoft-ai%2F&title=Frontier+Pre-training+at+Microsoft+AI&source=https%3A%2F%2Fmicrosoft.ai%2Fnews%2Ffrontier-pre-training-at-microsoft-ai%2F)
- [X](https://x.com/intent/tweet?text=Frontier+Pre-training+at+Microsoft+AI&url=https%3A%2F%2Fmicrosoft.ai%2Fnews%2Ffrontier-pre-training-at-microsoft-ai%2F)
- [FB](https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fmicrosoft.ai%2Fnews%2Ffrontier-pre-training-at-microsoft-ai%2F)

  

        
    
      
      
        

[https://microsoft.ai/pdf/Frontier-Pre-training-at-Microsoft-AI.pdf?v=2](https://microsoft.ai/pdf/Frontier-Pre-training-at-Microsoft-AI.pdf?v=2)

六月，我们发布了 [MAI-Thinking-1](https://microsoft.ai/wp-content/uploads/2026/06/main_20260602_2.pdf),这是一个在 MAI-Base-1 之上进行后训练的通用基础模型，具有出色的推理性能。我们最近完成了新一代最先进模型 MAI-Base-2 的预训练，这是一个 MoE 基础模型，拥有 800 亿激活参数和 2.8 万亿总参数。

在我们的 held-out 评估中，MAI-Base-2 的表现优于我们测试过的所有开放权重模型。与最强的开放基础模型 DeepSeek-V4-Pro-Base 相比，其预训练 FLOPs 效率高出 4-12 倍(见下方图 3),而我们将这部分节省投入到了训练一个更大的模型中。

图 1 展示了 MAI-Base-2 以及其他总参数量不低于一万亿的模型在一系列预训练评估中的表现(数值越低越好)。

      

      
    

  


    
                    
                                
            
        
            


        
    
      
      
        

端到端地掌控我们的模型流水线，使 Microsoft 能够为客户提供独特的产品。对于进入我们模型的训练 token,Microsoft 拥有可靠的数据溯源。我们的预训练建立在有机数据之上，不涉及从其他模型蒸馏。这将使我们能够通过 Foundry 将模型权重授权给值得信赖的合作伙伴，为企业提供一个满足其需求、值得信赖的世界级智能来源。

掌控全栈使我们能够协同调优模型与基础设施，以最低的成本实现最佳性能——首先应用于我们自己的产品，然后服务于 Foundry 客户。MAI-Base-2 目前正在进行后训练，我们期待尽快分享更多成果。

### MAI-Base-2 的对比表现

当我们完成 MAI-Base-1 的训练时，预训练的前进道路已经很明确：扩大规模。虽然就其体量而言 MAI-Base-1 已经是一个强大的模型，但与处于前沿的开放权重和专有模型相比，它仍然更小。

三项举措对 MAI-Base-2 预训练的成功尤为重要：

- Scaling science:考虑了训练数据重复的 scaling ladder,以及经验性的超参数 scaling law。
- 模型-基础设施协同设计：改进的 MoE 和 Muon 实现，以及 activation gradient clipping。
- Scaling data:扩充的数据管道，并整合了视觉数据。

与 MAI-Base-1 相比，MAI-Base-2 是一个更大、更稀疏的模型，训练所用的数据也更多。我们在 2026 年 8 月至 9 月期间，使用 16k GB200 GPU 训练 MAI-Base-2,历时 38 天。在整个训练过程中，平均 MFU(model FLOPs utilization)为 21%,goodput(训练实际推进的时间占比)为 89%。我们的 MFU 以 2.5 PFLOPS(GB200 在 BF16 下的理论上限)为基准进行归一化，并且不包含用于 rematerialization 和优化器的 FLOPs。

      

      
    

  


    
                    
                                
            
        
            


        
    
      
      
        

我们使用 bits-per-byte(BPB)在 held-out 文本上比较各预训练模型，该指标与各模型的 tokenizer 无关。对于 held-out 代码，我们使用 MAI 自己的代码库，而 STEM、Math 和 Q&A 评估则委托给供应商进行，以降低训练集污染的风险。此外，我们还针对自己的训练数据对所有评估集进行了去污染处理。

我们将 MAI-Base-2 与 2026 年 10 月之前可用的前沿模型检查点进行了比较：

- DeepSeek-V4-Pro-Base 是权重开放的最强 base model。
- Kimi K3、Qwen3.8-2.4T-A95B 和 MiMo-V2.6-Pro-RL 是能力很强的权重开放模型。这些模型仅有 post-trained 检查点可用。我们报告它们的结果时附带说明：post-training 可能会影响这些评估结果。

在这些 held-out 评估中，MAI-Base-2 取得了比我们测试的其他模型更低的 BPB。下面，我们深入探讨实现这一目标的几项进展。

### 稳健的 scaling ladder

我们使用 scaling ladder(一组采用固定训练配方、不同尺寸的模型)来评估模型改动。ladder 的每一级都以层数 \( L \) 命名，且仅由 \( L \) 即可确定其余架构。例如，hidden size 为 \( (256/3) \cdot L \),query heads 数量为 \( L \) 并取最接近的 16 的倍数。我们训练尺寸递增的模型，同时保持每个 active parameter 的训练 token 数(TPP)恒定。

为了考虑小规模下的多 epoch 训练，我们使用了一种称为 *source scaling* 的技术。在 scaling ladder 的较低层级，source scaling 会人为限制模型训练所用的唯一样本集合，使得每个数据集的重复次数相同，而与训练时长无关。例如，如果在完整的 50T-token 训练中某个数据集重复了 8 次，那么一个 5T-token 的训练将仅对该数据的 1/10 循环 8 次。

在固定的 TPP 下，source scaling 有效地保持了唯一数据与参数的比例恒定，这有助于确保结果在各规模之间平滑迁移。如果没有 source scaling,较小规模的实验可能会偏向欠正则化的架构和超参数选择，而这些选择在较大规模下会导致过拟合。在 scaling ladder 中纳入 source scaling 是我们能够可靠扩展到 2.8T 参数模型的关键。图 2 展示了如何使用 scaling ladder 准确预测 MAI-Base-2 的性能。

### 将建模效率与计算量分离

模型之间的直接比较会把训练配方的质量与模型尺寸和训练计算量的差异混在一起。为了分离出配方的影响，我们估计我们的配方需要多少计算量才能匹敌一个强大的外部 base model。我们以 DeepSeek-V4-Pro-Base 作为参照：它是唯一发布了超过一万亿参数的 base pretraining 检查点的模型，不过其训练所用的 FLOPs 仍明显少于 MAI-Base-2。

对于图 1 中的四个 held-out 评估，我们分别拟合了 BPB 与训练 FLOPs 之间的独立 scaling law,并估计我们 ladder 上的模型需要多少计算量才能匹敌 DeepSeek-V4-Pro-Base 的 BPB。MAI-Base-2 的最终性能是已知的，我们将其纳入拟合中，因此匹配点落在我们拟合模型的范围内，而不是超出该范围。将这些估计值与 DeepSeek-V4-Pro-Base 的训练计算量进行比较，我们发现我们的配方的 FLOPs 效率高出 4.2–12.3 倍，如图 3 所示。我们还与 MAI-Base-1 进行了比较，发现自该模型于今年 6 月发布以来，我们的进展带来了 6.3-12.7 倍的 FLOPs 效率提升。我们将 MAI-Base-2 的 FLOPs 效率归因于我们数据的质量和相关性，以及我们的建模选择所带来的效率提升，两者将在下文各节中分别介绍。

### 超参数的 scaling law

为大型训练任务选择最优超参数十分复杂，原因在于超参数优化的组合空间：改变一个超参数可能会影响其他超参数的最优值。对于 MAI-Base-2,我们重新审视了解决这一问题的方法。

我们对学习率 (\(LR\)) 和权重衰减 (\(WD\)) 进行了联合扫描，因为它们对训练的影响是相互耦合的。模型性能对 \(LR\) 与 \(WD\) 的乘积最为敏感，因此好的配置位于 \((\log{LR}, \log{WD})\) 平面上一条狭窄的对角带内。在 \((\log{LR}, \log{WD})\) 上做矩形网格采样对该对角带的覆盖效率很低，因此我们改为在 \((\log{LR}, \log{(LR \times WD)})\) 上进行网格扫描。

对于若干模型规模与 TPP 的组合，我们沿搜索网格训练模型，并在预训练评估集上对其进行评估。我们对评估结果拟合了一个二维二次函数，并解析地提取出最小值点 \((LR^*, LR^* \times WD^*)\)。图 4 展示了该实验的几个切面。

随后，我们将 \(\log{(LR^* \times WD^*)}\) 和 \(\log{LR^*}\) 建模为模型规模、TPP 或其他特征(如 log steps)的函数。通过模型选择，我们发现 \(LR^* \times WD^*\) 主要取决于训练步数，而 \(\log{LR^*}\) 还额外依赖于 \(\log{TPP}\)。\(LR^* \times WD^*\) 相对于步数的经验指数非常接近 −1,这与如下观点相符：解耦权重衰减的时间尺度 (\(\dfrac{1}{LR \times WD}\)) 应占训练过程的固定比例。LR 相对于步数的经验指数接近 −0.5,这与广泛使用的经验法则相符：当 batch size 加倍时，应将学习率乘以 \(\sqrt{2}\)。我们最终得到的 \(LR^*\) 和 \(WD^*\) 的 scaling laws 为：

\[LR^* \times WD^* = 17.04 / \text{steps}\] \[\log{LR^*} = -1.51 + 0.175\log{\text{TPP}} - 0.573\log{\text{steps}}\]

采用类似的方法，我们还推导出了以下针对 dropout 的 scaling law:

\[\small \mathrm{Dropout}=\operatorname{sigmoid}\big(0.526\,(\log \mathrm{ActiveParams}-27.2)\big)\]

我们在小规模实验中估计了这些新的 scaling laws,随后在一个中间规模上进行了验证，结果表明它们始终优于以往的经验规则。这些 scaling laws 决定了 MAI-Base-2 的超参数。

### 基础设施与 MAI-Base-2 的协同设计

在给定计算预算内训练前沿模型，需要围绕评估质量和计算效率对模型与基础设施进行协同设计。我们使用效率增益 (efficiency gain, EG) 指标来辅助决策：即候选方案达到与基线相同评估损失所需计算量与基线之比。计算量可以用 FLOPs (EGFLOPs) 或挂钟时间 (EGtime) 来度量，两者互补。我们主要依赖 EGtime,因为它反映了我们基础设施的当前状态。而 EGFLOPs 则衡量一个原型方案的潜力，并指导未来的基础设施开发：一项在 FLOPs 上占优但在挂钟时间上落后的改动，向我们指明了值得投入的方向。这种建模与基础设施的联合优化体现在下文的若干设计选择中。

### 扩展 MoE

我们过去的建模实验表明，每一层都使用 MoE 相比交替使用 dense FFN 层与 MoE 层，具有稳定的 EGFLOPs 优势。然而，我们 MoE 实现中的低效问题使得对于 MAI-Base-1 而言，每隔一层使用 MoE 在 EGtime 上才是最优的。对于 MAI-Base-2,我们识别出了导致 MoE MFU 未达最优的两个低效问题：

1. 动态路由加剧了内存碎片化，并为罕见、极端的专家负载不均衡占用了更多内存，而这些内存本可用于减少激活值重计算 (activation recomputation)。
2. 增加更多、更细粒度的专家增加了每个专家的开销。

解决这些低效问题后，我们 MoE 层的 MFU 从 24% 提升到了 35%,这使我们得以在 MAI-Base-2 的每一层都采用 MoE。

***具有可调固定大小内存占用的 Dropless MoE***

在 MoE 层中，每个 expert 看到的 token 数量是可变的。这带来了 GPU 显存方面的挑战，因为过载的 expert 可能会耗尽显存。一种解决方案是为每个 expert 设置固定阈值，超出阈值的额外 token 会被丢弃。我们的实验发现，丢弃 token 会导致性能下降。一种朴素的做法是简单地为每个 expert 分配足够的显存以应对最大的不均衡，但在正常负载下这会导致显存使用效率低下。我们的多轮无丢弃 MoE(multi-round dropless MoE),如图 6 所示，可在任意路由不均衡下实现固定的显存占用，消除了内存碎片化和显存耗尽(out-of-memory)导致的崩溃。

      

      
    

  


    
                    
                                
            
        
            


        
    
      
      
        

我们将每个 expert 并行秩(expert parallel rank)上的 expert 分组为一个或多个可配置大小的组。每个 expert 组以固定的每 expert token 容量，执行一轮或多轮 *dispatch → compute → collect* 轮次。如果某个 expert 收到的 token 超出了其可容纳的数量，expert 组会在额外的轮次中处理这些溢出 token。为了减少额外轮次的数量，我们允许过载的 expert 使用同组中其他 expert 未使用的 token 容量。在反向传播中，我们随后按照类似的多轮调度，对每个 expert 组执行细粒度的重计算。这使得无论 token 如何不均衡，显存使用都保持固定。token 容量是可配置的：容量越大意味着占用显存越多，容量越小则意味着可能需要更多轮次，从而带来额外计算。在实践中，容量被配置为在稳态下保持单轮。

*Dispatch*、*compute* 和 *collect* 在所有 expert 组的所有轮次之间以流水线方式执行，因此除第一个 *dispatch* 和最后一个 *collect* 之外，其余部分都与 expert 计算相重叠。在前向传播中，权重量化(weight quantization)和 shared-expert 计算与暴露在外的通信相重叠。在反向传播中，所有 expert 通信都被完全重叠：暴露在外的输入 *dispatch* 与同一层的重计算相重叠，暴露在外的梯度 *collect* 与权重梯度计算相重叠。

***降低每 expert 的开销***

我们从四个方面降低每 expert 的开销。第一，通过为每个 expert 组对计算和通信进行分组，提升 GEMM 和 NVLink 的效率，从而减少 kernel 启动开销和尾部效应。第二，通过使用驻留在设备端的 token 元数据并直接从 GPU 发起 all-to-all 通信，减少主机与设备之间的同步。第三，我们使用对称内存(symmetric memory)进一步优化 all-to-all,通过 NVLink 直接交换 token 而无需暂存拷贝，提升了通信吞吐量，并在并发运行 GEMM 时减少了 HBM 争用。最后，我们跨层批量处理负载均衡损失，用一次覆盖所有层的批量归约取代每层的 all-reduce。这些优化使我们能够在不显著降低 MFU 的情况下训练更稀疏的模型。

### 扩展 Muon

在扩展到 MAI-Base-2 时，我们发现 Muon 相比 AdamW 带来了更稳定的训练动态和显著的效率提升。在我们最大的模型上采用 Muon,需要降低其每步开销。

Muon 使用 Newton–Schulz 对每个权重矩阵的动量进行正交化，这是一种由若干次矩阵乘法组成的迭代算法。这需要完整的矩阵，与 ZeRO 在数据并行维度上对动量进行分片的方式相冲突。借鉴先前工作，我们在优化器步骤中对动量重新分片(reshard)。每个 GPU 更新其本地 FP32 动量分片，并将其转换为 BF16。随后，通过一次按相同形状参数批量进行的 all-to-all 交换，每个 GPU 获得一组完整动量矩阵子集的所有权。每个 GPU 使用支持对称性的 Newton–Schulz kernel 在本地对完整动量矩阵进行正交化。第二次 all-to-all 将更新返回到其原始分片，在那里它们被转换回 FP32 并应用到权重上。

我们进一步应用了几项优化，以提升在 16K GPU 上的训练效率：

- 我们通过预取多个 batch 来重叠通信与计算。
- 我们缓存并复用 resharding 元数据，以避免重复的索引逻辑。这在拥有数千个相同形状参数的稀疏 MoE 模型中尤为有用。
- 部分选定的权重（如 MoE router 权重）在 GPU 间进行复制而非分片。第一个通信阶段被跳过，我们改为在 Newton-Schulz 之后发起 all-gather 集合通信，以获取完整的复制更新集合。

经过优化，Muon 占 MAI-Base-2 平均训练迭代时间的 2.1%（165 ms）。我们持续跟踪实现质量，并基于 profile 确定变更的优先级，同时使用了大规模和小规模两种测试环境。我们将测试测量结果与理论峰值性能进行对比——对于 MAI-Base-2 的最终训练配置，我们估计理论峰值为 55 ms，瓶颈在于通信。我们将理论与实测性能之间的差距归因于 stragglers、kernel 调度开销、负载不均衡，以及 resharding 过程中的内存拷贝/分配。

### 激活梯度裁剪

梯度裁剪是一种通过降低异常梯度影响来稳定训练的常用方法。标准梯度裁剪作用于整个 batch 的权重梯度全局范数。然而，异常梯度通常由 batch 内的一小部分数据引发。因此，一个异常值可能导致整个 batch 的梯度被缩小，其中也包括那些本身表现良好的样本的贡献。作为一种更有针对性的缓解手段，我们在网络中选定的位置对激活的梯度进行裁剪。结合 Muon，这使 MAI-Base-2 的梯度范数保持在比 MAI-Base-1 紧凑得多的范围内（图 7）。

      

      
    

  


	
					
							
			
		
			


        
    
      
      
        

激活梯度裁剪还使优化过程更加稳定，并且如图 8 所示，其收益随规模增长而增加。相比之下，我们测试过的大多数变更在不同规模下带来的效率提升大致恒定。

      

      
    

  


	
					
							
			
		
			


        
    
      
      
        

我们还将激活梯度裁剪用作验证训练数据的诊断工具。图 9 展示了通过激活梯度裁剪识别出的一个格式异常的训练样本。在我们代码数据的一个 pull request 中，某个 license header 在句子中途被突然截断。追踪这个被裁剪的样本后发现，我们的预处理 pipeline 中存在一个 bug，目前已被修复。

      

      
    

  


	
					
							
			
		
			


        
    
      
      
        

### 数据扩展

MAI-Base-2 遵循与 MAI-Base-1 相同的数据原则：我们通往前沿性能的路径建立在有机数据之上，而非从其他模型蒸馏。对自建数据 pipeline 的投入持续获得回报，所有训练 token 均由我们内部处理。以 unique 训练 token 计，我们的语料库从 MAI-Base-1 到 MAI-Base-2 增长了约 36%（见图 10）。

自 MAI-Thinking-1 以来，我们改进了质量分类、主题分箱、网页解析、去重以及评估去污染。针对 MAI-Base-2，我们扩展了 pipeline 以处理多得多的网页内容1，知识截止日期为 2026 年 3 月。我们还使用了基于 embedding 的多样性采样，以优先纳入新颖数据并减少重复内容。我们的实验表明，这些方法显著提升了模型性能。

与 MAI-Base-1 不同，MAI-Base-2 采用 encoder-free 的 VLM 架构原生进行视觉预训练。因此，我们投入大量资源扩充 VLM 语料库，涵盖图文对以及文本与图像交错的文档。该语料库覆盖的任务包括来自网页的图像描述、图表理解、visual grounding、空间推理、医学理解、computer use、乐谱阅读，以及其他我们预计用户会觉得有用的领域。我们的 VLM 语料库包含 4.5T 个 unique token；计入重复后，VLM 数据占 50T token 训练混合数据的 18%。

### 下一步计划

MAI-Base-2 是我们下一代模型的基础，我们期待很快分享更多相关信息。在 MAI-Base-2 进行 post-training 的同时，MAI-Base-3 的准备工作也已在进行中。自 MAI-Base-1 以来，我们所有的模型都遵循同样的原则构建：

- 智能应当从第一性原理中学习。
- 简单的方法最具扩展性。
- 科学严谨胜过捷径。

我们坚信，这些原则将推动我们持续向前沿扩展。训练前沿 AI 需要建模、数据和基础设施领域的研究人员与工程师作为一个团队协同工作。如果这吸引了你，[我们正在招聘](https://microsoft.ai/careers/)！

---

1 对于网络数据，我们使用专有的爬虫，遵守 Robots Exclusion Protocol(robots.txt)以及相关的 meta 标签和 HTML 控制，使网站所有者能够管理其网站内容的访问和使用方式。我们还排除了违反 Microsoft Responsible AI 政策或出现在美国贸易代表办公室(USTR)恶名市场名单上的来源。

### 与我们共创未来

我们是一个精简、行动迅速的实验室，汇聚了世界上一些最具才华的人才。MAI 有一份令人兴奋的算力路线图，正在快速且大规模地扩展。我们还有一个真正坚信的宏伟使命。我们也有幸与出色的产品团队合作，让我们的模型有机会触达数十亿用户并创造巨大的积极影响。如果你是一位才华横溢、雄心勃勃且不自负的人，你将非常适合这里——来加入我们，一起开发下一代模型吧！

[浏览所有职位](https://microsoft.ai/careers/#join-the-team)

### 更多故事

[推出 MAI-Thinking-1](https://microsoft.ai/news/introducing-mai-thinking-1/)

模型

![一幅色彩丰富的插图，描绘了生动的公园场景：人们在蜿蜒的小径上骑行、在河中游泳，四周环绕着生机勃勃的绿色植物、鲜花和树木，头顶是晴朗的天空。](https://microsoft.ai/wp-content/uploads/2025/11/image-17.jpg)

[迈向人文主义超级智能](https://microsoft.ai/news/towards-humanist-superintelligence/)

公告

![黑色背景上的拼贴画，包含复古计算机、打字机、汽车、电路板、蘑菇、陶器和机器零件，随机排列，没有明显的规律。](https://microsoft.ai/wp-content/uploads/2025/01/Screenshot-2025-09-03-at-5.04.51%E2%80%AFPM-1.png)

[AI 到底是什么？](https://microsoft.ai/news/what-is-ai-anyway/)

ted-talk
