---
title: "Meta 开放 Muse Spark 权重：816B、100 万 token 上下文，两台 Mac Studio 可运行，支持本地编程与 Agent 任务"
date: 2026-10-17T00:00:00.000Z
tags: ["产品发布", "Meta", "Muse Spark Open", "开放权重", "Agent", "MoE", "聚合"]
summary: "从本地改代码、处理视频，到低比特单机与双 Mac 部署：看懂 Muse Spark Open 的能力、硬件门槛和加速方法。"
---
> **原文链接**: [https://x.com/aiatmeta/status/2110779754274292212?s=46](https://x.com/aiatmeta/status/2110779754274292212?s=46)
> **来源**: AI at Meta
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/meta-muse-spark-open/) · 2026/10/17
> **说明**: 本文由 AIHot 自动聚合(原文即中文,未翻译)。正文取自小互 AI 解读

---

**已核对**AI at Meta10-17 · 约15分钟

Meta 发布了开放权重模型 Muse Spark Open，官方将其定位为目前性能最强的美国开放权重模型。它的主要特点是：

- **专为代码与 Agent 设计**：聚焦端到端复杂软件工程、长程规划与多步推理。
- **混合模态输入与纯文本输出**：原生支持文本、图像、视频与音频混合输入，统一输出文本与结构化调用。
- **支持私有化与本地部署**：除云端 API 外，也可在自己的设备上运行。官方桌面路线采用两台各配 512GB 统一内存的 M5 Ultra Mac Studio，运行 NVFP4 量化版本。

#### 它怎样接手编程和剪辑任务

在实际任务中，Muse Spark Open 支持多模态混合输入与纯文本输出，并提供最高 100 万 token（1M）的上下文窗口。1M 属于窗口容量上限，并不等同于在任意超长材料下都能保证可靠检索或百分之百执行成功。

模型面向的核心场景是端到端 Agent（智能体）开发。下载模型权重并不等于直接获得了操作电脑的现成能力。模型本身负责理解输入、规划步骤并生成符合接口规范的工具调用文本；具体动作必须由外部 Agent 框架（如 Muse Code 或开源运行框架）在沙箱、终端或操作系统中代为执行。这套工作按以下过程进行：

1. **读取输入与环境反馈**：模型接收代码文件、用户需求、截屏或上一步工具返回的执行结果。
2. **生成工具调用**：模型分析当前状态，生成下一步要调用的工具名称与参数（例如编辑文件、执行命令或查询接口）。
3. **外部框架执行并返回**：外部 Agent 框架调用实际环境执行该操作，并将标准输出、错误日志或新截图反馈给模型。
4. **模型分析并修正方案**：如果执行出现依赖冲突、编译错误或测试未通过，模型根据返回的报错信息调整参数、修改代码并再次尝试。每一步仍需核对结果。

假设一个典型的界面修复任务：用户给 Agent 提供一张样式错位的页面截图以及对应的前端组件代码。模型首先比对截图中的视觉错位与代码结构，推测出冲突的样式属性，输出一段修改补丁；外部 Agent 框架将修改写入文件并运行本地构建命令；如果构建工具返回了语法报错，框架将错误日志传回模型；模型阅读报错后修正代码，再让框架运行并检查结果。这个例子说明的是工作方式，不代表模型每次都能修好。

在 Meta 官方公布的技术案例中，也展示了类似的流程协同：

- **iOS 客户端 Ice Cubes 开发**：在本地设备（on-device，不等于完全离线）上，通过模型驱动 Muse Code 读取开源 Mastodon 客户端代码、定位缺陷、编写补丁并完成了本地项目构建。
- **DaVinci Resolve 视频处理**：模型作为 Agent 驱动 DaVinci Resolve，逐帧审阅素材画面寻找精彩片段（strongest moments），并执行竖屏画面重新裁切。

#### 只用 42B 参数计算，为什么还要装下 816B 权重？

这次发布的模型有 8160 亿总参数。Muse Spark Open 能够实现两台桌面设备协同运行，核心在于其稀疏混合专家（MoE）结构：

- **MoE 专家架构**：模型总参数量为 816B，共 62 层。每个 MoE 层包含 256 个专家前馈网络，单 token 生成时前端路由器挑选最相关的 8 个专家参与计算，整套模型每 token 活跃参数约为 42B。
- **算力与访存开销**：单 token 虽然仅激活 42B 参数，但实际浮点计算量与时延不能简单等同于同规模密集模型，注意力层、路由选择、访存带宽以及多机通信都会带来额外开销。
- **权重驻留**：官方这条部署路线仍需在内存或显存中加载整套权重。只调用少量专家，减少的是每一步参与计算的部分，没有把其余参数从模型中删除。

两台 Mac Studio 运行这套模型，需要以下条件：

1. **统一内存配置**：采用两台搭载 Apple M5 Ultra 芯片、各配置 512GB 统一内存的 Mac Studio（合计 1TB 统一内存），或者四台 256GB 机型。内存容量解决权重放在哪里，带宽决定读取权重的速度：每台 M5 Ultra 提供 1.2TB/s 统一内存带宽，让 GPU 快速读取当前 token 所需的权重。实际生成速度还取决于计算和双机通信。
2. **NVFP4 量化版本**：运行的是 NVFP4 权重，主要将 MoE 专家权重压缩为 4-bit，部分层仍保留 BF16，静态文件体积约为 537GB。537GB 仅是权重文件体积；运行时还要为缓存已处理内容的 KV Cache、中间计算结果和系统留出内存，因此不能用总内存减去权重体积，就保证能跑满 1M 窗口。
3. **MLX 张量并行切分**：依托最新版 Apple MLX 框架，每一层的 256 个专家在两台机器间进行张量切分，两台设备各存储一部分权重参数（不是前 128 给 A、后 128 给 B），推理时权重保持在本地，设备之间通过 Thunderbolt 5 直连并启用 RDMA 来传输中间激活结果。

同一套权重，两种看法

#### 只算一部分，整套仍要存

**816B**总参数 · 存储看整套
**42B**每 token 活跃参数
**约 537GB**NVFP4 权重文件

**一个 MoE 层里的专家**256 个专家全部在场

每个格子表示一个专家。计算时每层选 8 个；点阵只说明选取关系，不表示整套模型的参数比例。

MAC STUDIO A**512GB 统一内存**每层的一半权重分片

权重留在本机

↔**中间计算结果**Thunderbolt 5 / RDMA
MAC STUDIO B**512GB 统一内存**每层的另一半权重分片

权重留在本机

存储：采用 NVFP4 与 MLX，两台机器合计约 1TB 统一内存，分担整套权重。缓存、系统和运行时还会额外占用内存；权重文件大小不能当成完整推理需求。

教学示意：专家位置与每次选取为演示设定，不是模型实测。两台机器切分每层张量，并非各自独占一半专家；本图不估算速度或满窗口可用内存。

除双机 Mac 桌面环境外，官方文档还给出了数据中心 GPU 的配置示例：

- **NVFP4 部署路线**：静态权重约 537GB，官方要求至少 700GB 显存，已在单节点 4 张 NVIDIA Blackwell Ultra 显卡（通过 TensorRT-LLM 运行）或 8 张 H200 上完成验证。
- **BF16 参考路线**：全精度权重约 1.65TB，文档示例给出的显存预算约为 2TB（例如 8 张 NVIDIA B300 集群）。

第三方 Unsloth 还提供 **Dynamic GGUF 单工作站路线**。其 2-bit 版本列出的总内存需求约为 250–316GB，指系统内存与显存合计，或 Apple 设备的统一内存。最小的 `UD-IQ2_XXS` 可装入 256GB 配置；但 Unsloth 建议 Agent 任务至少选择 `UD-IQ2_S`，更小版本在通用任务上会退化，聊天任务可以采用更小的规格。因此，想让模型简单聊天和让它连续改代码，用的未必是同一份量化文件。更长上下文也会额外占用内存，具体版本的任务质量和速度仍需分别试用。版本与选择依据可查阅 [Unsloth 指南](https://unsloth.ai/docs/models/muse-spark-open)。

![Unsloth Desktop：左侧是Muse Spark Open量化版的回复，右侧预览生成的Flappy Bird页面](https://best.xiaohu.ai/media/meta-muse-spark-open/unsloth-desktop.png)

Unsloth Desktop 的代码生成示例。左侧为模型回复，右侧预览 Flappy Bird 页面；图中使用的低比特规格与前文的 Agent 建议规格不同。

![Unsloth GGUF量化KLD对比：横轴为磁盘文件体积，三条曲线分别对应通用、聊天和合并测试](https://best.xiaohu.ai/media/meta-muse-spark-open/unsloth-kld.png)

Unsloth 的量化偏差比较：KLD 越低越好，纵轴采用对数刻度。横轴是 GGUF 文件的磁盘体积，不是运行所需的总内存。

![Unsloth GGUF量化Top-1指标：通用和聊天测试集随文件体积变化的两条曲线](https://best.xiaohu.ai/media/meta-muse-spark-open/unsloth-top1.png)

同一批量化版本的 top-1 指标，分别展示通用与聊天测试集。它用于比较量化质量，不能直接当作编程或 Agent 任务通过率。

装下权重以后，还可以通过**推测解码**减少生成等待：小型草稿模型先提出多个 token，Muse Spark Open 再一次核验这一批候选，接纳符合要求的部分，减少大模型逐个生成的轮次。SGLang 对应 DFlash V2，vLLM 对应 DSpark。官方开发指南报告，DFlash 在 AMD MI355X 上单请求吞吐提升 3.7 倍，16 个并发请求下为 2.9 倍；这是对应 GPU 与测试配置的结果，不能换算成双 Mac 的速度。

底层计算也有优化：SGLang 中的 Helion GPU 内核在 NVIDIA、AMD GPU 上取得 1.03–3.95 倍的内核级加速，而 AMD MI350 上的端到端提升为 3%。一个局部算子快了多少，与整个请求快了多少，是不同的指标。

#### 它的成绩，放到实际任务里怎么看？

Meta 将 Muse Spark Open 定位为“目前最强的美国开放权重模型”。根据官方评测方法说明，本次公布的评测数据并非全部由 Meta 自测，而是混合了第三方官方榜单（如 Scale AI、Artificial Analysis）、Meta 内部测试以及部分厂商自报数据。各模型测试时均开启了各自官方推荐的最高思考档位（如 Muse 为 xhigh、GLM 与 Kimi 为 max、Nemotron 开启 thinking），最高档位的名称相似，并不意味着花费相同计算量、时间或费用。

同一张成绩表里，领先与落后的项目同时存在：

| 任务与基准 | Muse Spark Open | 同表对手参照 | 设置与含义 |
| --- | --- | --- | --- |
| 综合能力 · AA Intelligence Index | 39 | GLM 5.3：45 / Kimi K3：44 | 综合指数；Muse 低于这两款模型 |
| 岗位任务 · JobBench | 61.8 | GLM 5.3：61.4 | 官方榜单成绩；Muse 在所列模型中最高 |
| 工具调用 · MCP-Atlas | 89.2 | Qwen3.8：84.5 | Muse 在所列模型中最高；Beam 为自报数据 |
| 长程工具 · Toolathlon Verified | 72.8 | Kimi K3：76.5 | 跨多款软件完成长程任务；Muse 未领先 |
| 终端任务 · Terminal-Bench 2.1 | 76.4 | Kimi K3：85.0 | 这两项用 Terminus 2 框架；Muse 未领先 |
| 代码工程 · DeepSWE 1.1 | 60 | Kimi K3：68 | 各自优选或自报框架，比较的是模型与框架的组合 |

展开查看官方横向基准测试原始对比图

![Muse Spark Open 官方基准测试横向对比数据表](https://best.xiaohu.ai/media/meta-muse-spark-open/benchmark.jpg)

官方公布的横向基准成绩。

      涵盖 Agent 工作流、纯逻辑推理、代码修复与多模态评测；各模型采用各自官方公布的最高思考档位（Muse Spark Open 采用 xhigh，Kimi K3 与 GLM 5.3 采用 max，Nemotron 开启 thinking），测试运行框架与推理预算并不均等。

- **强势项**：在涉及实际业务岗位流程的 **JobBench**（61.8）以及考察真实 MCP 协议工具调用的 **MCP-Atlas**（89.2）中，Muse Spark Open 处于领先位置；在无工具辅助的 **HLE-Diamond** 高难知识与推理问答中取得 26.1 分，**AA-Omniscience** 知识可靠性测试取得 25 分；在多模态视觉基准 **ZeroBench** 中取得 50.0 分（需注意该项为工具辅助下 5 次采样中至少 1 次正确的 pass@5 口径，非单次准确率）。
- **差距项**：在真实终端交互执行的 **Terminal-Bench 2.1** 中得分为 76.4，低于 Kimi K3（85.0）、GLM 5.3（83.9）、Qwen3.8（82.0）与 Beam（80.1，注：Beam 未披露运行框架，其余所列终端成绩基于 Terminus 2）；在代码缺陷修复 **DeepSWE 1.1** 中得分为 60，低于 Kimi K3（68）与 GLM 5.3（67）。DeepSWE 各模型是在各自优选的 Agent 运行框架（如 Muse Code、Claude Code、Kimi Code 等）下运行，该分数体现的是模型与对应运行框架组合的综合表现。

这些结果支持的是具体任务上的优势：Muse Spark Open 在 JobBench 和 MCP-Atlas 上领先所列模型，却没有在综合指数、Toolathlon 长程工具任务和代码工程上全部领先。选择时可以先拿自己的岗位流程与 MCP 工具试用；如果任务侧重终端操作、代码修复或跨软件长程执行，也应比较同表其他模型与对应运行框架的组合。模型经过了额外的安全后训练。实际接入工具时，系统外层仍要管理执行权限，对不可逆操作引入人工确认。

#### 从哪里开始用，费用怎么算？

开发者与企业团队可以根据实际需求选择适配的使用方式：

1. **云端托管 API**：
  第三方推理服务商已接入模型支持，包括 [Baseten](https://www.baseten.co/)、[Fireworks AI](https://fireworks.ai/)、[Modal](https://modal.com/)、[Nebius](https://tokenfactory.nebius.com/)、[OpenRouter](https://openrouter.ai/) 以及 [Together AI](https://www.together.ai/)；[Groq](https://console.groq.com/) 目前提供面向多步 Agent 循环的有限预览。Muse 许可赋予的免费使用权指的是模型权重本身，并不代表云端 API 推理免费，各服务平台均按照各自的 Token 用量或专用算力资源独立计费。
2. **云端模型目录**：
  在 Amazon SageMaker AI、Google Cloud Model Garden 和 Microsoft Foundry Models 的在线模型目录中，均提供了模型权重的获取与私有化部署入口。
3. **本地与私有集群部署**：
  开发者可访问 Hugging Face [模型集合](https://huggingface.co/collections/meta-models/muse-spark-open) 获取 NVFP4 或 BF16 权重。双机 Mac 路线从 [Meta 官方 Mac 部署指南](https://dev.meta.ai/docs/cookbook/muse-spark-open-mac) 开始：每台需运行 macOS 26.2 或更新版本、MLX 0.30.1 或更新版本，机器之间通过 Thunderbolt 5 直连并启用 RDMA，主控机能通过无密码 SSH 启动另一台的程序。
  **磁盘存完整文件，内存加载各自分片。** 按该指南，每台 Mac 的磁盘都需要容纳完整的约 537GB NVFP4 checkpoint；启动时，MLX 才将各自负责的张量分片加载进统一内存。因此，每台机器不能只准备一半权重文件的磁盘空间。
  私有 GPU 节点可配合 SGLang、vLLM 或 TensorRT-LLM 运行，具体配置参见[开发说明](https://dev.meta.ai/resources/blog/build-with-muse-spark-open)；选择单工作站低比特版本则参考前面的 Unsloth 路线。
4. **后训练与定制**：
  需要针对自己业务继续训练时，可以使用 PyTorch 的 TorchTitan 等已适配框架。

调用时还可以用 `reasoning_effort` 在 `low`、`medium`、`high`、`xhigh` 四档之间选择。模型卡默认 `xhigh`，复杂编程与 Agent 任务建议用 `high` 或 `xhigh`，简单、需要更快回复的任务可用 `low` 或 `medium`。官方建议的采样设置为 `temperature = 1.0`、`top_p = 1.0`，并禁用 `top_k`。

#### 许可规则（Muse Model License）

Muse Spark Open 采用开放权重的 Muse Model License。在满足条款的前提下，可以修改、微调、蒸馏、合并及再分发，Meta 也明确不主张模型生成输出的所有权。使用时仍需遵守署名、使用政策（Usage Policy）和商业服务条件，主要约束包含三项：

1. **署名要求**：在基于该模型或其衍生品构建的产品与服务的用户界面、随附文档、网站或设置中，显著展示 **"Built with Muse Spark Open"**。
2. **遵守使用政策**：使用与分发需符合许可附带的 Usage Policy 安全与合规要求。
3. **MaaS 额外协议要求**：若向第三方提供模型服务（Model as a Service，即通过 API 或类似接口向第三方提供模型输出），且该实体及其关联方在任意连续 12 个月内的累计总营收超过 **2000 万美元**，必须事先通知 Meta 并另行签署书面协议。

该 MaaS 限制明确豁免了企业内部使用、研究、其他非 MaaS 商业活动，以及将模型作为组件嵌入自身非 MaaS 产品中提供功能支持。

来源Muse Spark Open 官方发布主题帖（3条）AI at Meta·[查看主材料](https://x.com/AIatMeta/status/2110779754274292212)延伸[Muse Spark Open 研究发布](https://research.meta.ai/blog/muse-spark-open)·[开发总览与硬件条件](https://dev.meta.ai/docs/muse-spark-open)·[模型卡与 Muse Model License](https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B)·[Build with Muse Spark Open](https://dev.meta.ai/resources/blog/build-with-muse-spark-open)·[评测方法报告](https://research.meta.ai/static/muse-spark-open-evaluation-methodology)·[Unsloth 本地量化与任务质量选择](https://unsloth.ai/docs/models/muse-spark-open)·[双 Mac Studio 官方部署指南](https://dev.meta.ai/docs/cookbook/muse-spark-open-mac)

META 开放权重模型解读

## Meta 开放 Muse Spark 权重：816B、100 万 token 上下文，两台 Mac Studio 可运行，支持本地编程与 Agent 任务

每步仅用约 42B 参数计算，仍要装下整套权重；两台 Mac 的关键在量化、内存容量与直连通信。
从模型如何调用工具，到权重怎样分布在双机，再看选型与许可条件。

Meta 发布了开放权重模型 Muse Spark Open，官方将其定位为目前性能最强的美国开放权重模型。它原生支持文本、图像、视频与音频混合输入并统一输出文本与结构化调用，提供最高 100 万 token（1M）的上下文窗口。

**关于 1M 上下文的实际含义：**1M 属于窗口容量上限，并不等同于在任意超长材料下都能保证可靠检索或百分之百执行成功。
    

下载模型权重并不等于直接获得了操作电脑的现成能力。模型本身负责理解输入、规划步骤并生成符合接口规范的工具调用文本；具体动作必须由外部 Agent 框架（如 Muse Code 或开源运行框架）在沙箱、终端或操作系统中代为执行。

STEP 01
感知与输入
接收代码文件、用户提示、页面截屏或上一步工具返回的执行日志。

STEP 02
规划与调用
模型完成长程思考，输出符合格式规范的工具名称及具体执行参数。

STEP 03
框架沙箱执行
外部运行框架在隔离沙箱或终端中调用实际指令，并捕获标准返回。

STEP 04
报错修正闭环
若遇编译错误或依赖冲突，模型依据回传报错修正代码并重复尝试。

Meta 公布的案例包括：用 Muse Code 修复 Ice Cubes 客户端并完成本地构建；驱动 DaVinci Resolve 挑选精彩画面、重新裁为竖屏。

CORE MECHANISM

### 816B 权重驻留与 42B 激活的桌面 MoE 协同

这次发布的模型有 8160 亿总参数。单 token 生成时虽然只有约 42B 活跃参数参与计算，但全量 816B 权重必须完整驻留在内存中。稀疏计算降低的是每一步的浮点运算量，并未把未激活的参数从模型中删除。

**816B**总参数：全部保留**≈42B**每 token 活跃参数

稀疏混合专家（MoE）结构
全模型共 62 层 · 每个 MoE 层含 256 个专家前馈网络

Top-8 动态路由 → 单 Token 仅激活 ~42B

NODE 01 (主控机)
Mac Studio M5 Ultra

          • 统一内存：512GB (1.2TB/s 带宽)

          • 权重分片：MLX 张量并行切分

          • 内存加载：各自负责的权重分片
        

↕中间激活结果
Thunderbolt 5 · RDMA

NODE 02 (协同机)
Mac Studio M5 Ultra

          • 统一内存：512GB (1.2TB/s 带宽)

          • 权重分片：MLX 张量并行切分

          • 内存加载：各自负责的权重分片
        

**通信与磁盘边界：**每一层的 256 个专家在两台机器间进行张量切分，推理时权重完全保持在本地，设备之间通过 Thunderbolt 5 直连并启用 RDMA 仅传输中间激活结果。每台 Mac 的磁盘都需要容纳完整的约 537GB NVFP4 checkpoint；启动时才由 MLX 加载各自负责的张量分片。运行还需为 KV Cache、中间结果及系统预留内存，不能据此保证跑满 1M 上下文。
    

**装下之后，怎样减少等待？**

推测解码先让小草稿模型提出多个 token，大模型再批量核验。SGLang 的 DFlash V2 在 AMD MI355X 上报告单请求吞吐提升 3.7 倍；该 GPU 结果不能换算成双 Mac 的速度。

### 官方基准：岗位与工具调用领先，终端与代码仍有差距

Meta 将其定位为“目前最强的美国开放权重模型”，成绩混合第三方榜单、Meta 内部测试与厂商自报；各模型采用各自最高思考档位，耗时和预算不等。但同一张成绩表里，领先与落后的项目同时存在：

89.2
MCP-Atlas（工具调用 · 同表最高）

61.8
JobBench（岗位流程 · 同表最高）

76.4
Terminal-Bench (终端真实操作 · 低于Kimi 85.0)

优势项目：业务流程与协议交互
优势领先

在涉及实际业务流程的 JobBench（61.8）以及考察标准 MCP 协议工具调用的 MCP-Atlas（89.2）中处于领先位置；在多模态视觉基准 ZeroBench 达到 50.0（工具辅助下 5 次采样至少 1 次正确，并非单次准确率）。

差距项目：长程代码补丁与真实终端操作
存在差距

真实终端操作 Terminal-Bench 2.1 得分 76.4，低于 Kimi K3（85.0）与 GLM 5.3（83.9）；代码缺陷修复 DeepSWE 1.1 得分 60，低于 Kimi K3（68）与 GLM 5.3（67）。

结论提示：Muse Spark Open 在 JobBench 和 MCP-Atlas 上领先所列模型，却没有在综合指数、Toolathlon 长程工具任务和代码工程上全部领先。DeepSWE 考察的是模型与对应运行框架组合的综合表现。

### 部署路线与开放权重许可

开发者可根据业务规模与算力预算，在以下部署方案中选择。也可使用托管 API；权重的免费使用权不等于 API 推理免费。

单工作站量化
Unsloth Dynamic GGUF 2-bit，总内存需求 250–316GB，Agent 任务建议选 UD-IQ2_S。

双机桌面 Studio
两台 512GB M5 Ultra Mac Studio，雷雳 5 RDMA 直连，运行 537GB NVFP4 权重。

数据中心 GPU
NVFP4 需 ≥700GB 显存（4x Blackwell Ultra / 8x H200）；BF16 全精度需约 2TB 显存。

**Muse Model License 核心约束规则**

        1. **署名要求：**在基于该模型构建的产品界面或文档中显著展示 "Built with Muse Spark Open"。

        2. **使用政策：**遵守 Usage Policy 安全与合规要求，Meta 不主张模型生成输出的所有权。

        3. **MaaS 商业限制：**若向第三方提供模型服务（Model as a Service，即通过 API 或类似接口向第三方提供模型输出），且该实体及其关联方在任意连续 12 个月内的累计总营收超过 2000 万美元，必须事先通知 Meta 并另行签署书面协议。企业内部使用，以及嵌入自身非 MaaS 产品提供功能等情形，明确豁免该项额外协议要求。
      

↑ 正文结束
✓ 本篇全文免费开放

会员可复制、下载全文 Markdown，并解锁更多深度内容与播客。
[订年卡 $59/年](https://best.xiaohu.ai/buy/?plan=year)[看权益对比 →](https://best.xiaohu.ai/membership/)

[阅读原文 ↗](https://x.com/aiatmeta/status/2110779754274292212?s=46)

📮 新解读第一时间进邮箱

读完觉得有用？留个邮箱，每篇新解读发布就送达，随时退订。

### 相关解读

[洞察 Meta 推出 Muse Wonder 前沿系列模型：主动记忆，遇阻换方法继续推进，Agent 编程媲美 Opus 5.5 10-13 · 约 10 分钟](https://best.xiaohu.ai/article/meta-muse-wonder/)[洞察 Meta Muse 设计负责人分享 Muse 的设计思路：如何让 Agent 融入日常生活 10-13 ·](https://best.xiaohu.ai/article/meta-muse-product-design-cases/)[产品发布 Meta 发布 Muse Spark 1.1 模型，在多个代理评估中，媲美 GPT-5.5 和 Opus 4.8 07-09 · 10 分钟](https://best.xiaohu.ai/article/muse-spark-1-1-api/)
