---
title: "Google 发布 Nano Banana 2.1：画面更自然，改图更连贯"
date: 2026-10-07T00:00:00.000Z
tags: ["产品发布", "Nano Banana", "Google", "图像生成", "聚合"]
summary: "保持 Flash 级效率，改善画质、文字排版、主体一致性与局部编辑，并支持多图、搜索和视频参考。"
---
> **原文链接**: [https://deepmind.google/models/model-cards/nano-banana-2-1/](https://deepmind.google/models/model-cards/nano-banana-2-1/)
> **来源**: Google DeepMind
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/nano-banana-2-1/) · 2026/10/7
> **说明**: 本文由 AIHot 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

发布于 2026年10月6日

## Nano Banana 2.1
[https://deepmind.google/models](https://deepmind.google/models) 了解更多 [查看 PDF 版本](https://storage.googleapis.com/deepmind-media/Model-Cards/Nano-Banana-2-1-Model-Card.pdf)

Model Card 旨在提供 Gemini 模型的关键信息，包括已知限制、缓解措施和安全性能。Model Card 可能会不时更新；例如，随着模型不断改进或修订，纳入更新的评估结果。

发布时间：2026年10月

- [模型信息](https://deepmind.google/models/model-cards/nano-banana-2-1/#model-information)
- [模型数据](https://deepmind.google/models/model-cards/nano-banana-2-1/#model-data)
- [实现与可持续性](https://deepmind.google/models/model-cards/nano-banana-2-1/#implementation-and-sustainability)
- [分发](https://deepmind.google/models/model-cards/nano-banana-2-1/#distribution)
- [评估](https://deepmind.google/models/model-cards/nano-banana-2-1/#evaluation)
- [预期用途与限制](https://deepmind.google/models/model-cards/nano-banana-2-1/#intended-usage-and-limitations)
- [伦理与内容安全](https://deepmind.google/models/model-cards/nano-banana-2-1/#ethics-and-content-safety)

### 模型信息

#### 描述

Nano Banana 2.1 是 Gemini 3 系列模型的一员，该系列是一套能力强大、原生多模态的推理模型。Nano Banana 2.1 能够理解来自不同信息源(包括文本和图像)的输入，并在响应中生成图像和文本输出。

#### 模型依赖

Nano Banana 2.1 基于 Gemini 3.6 Flash。

#### 输入

文本字符串(例如，一个 prompt、一份或多份文档)和图像，token 上下文窗口最高可达 1M。

#### 输出

图像，最大输出为 4K token;文本，最大输出为 64K token。

#### 架构

Nano Banana 2.1 基于 Gemini 3.6 Flash。有关 Gemini 3.6 Flash 模型架构的更多信息，请参阅 Gemini 3.6 Flash 的[模型卡](https://deepmind.google/models/model-cards/gemini-3-6-flash/)。

---

### 模型数据

#### 训练数据集

Nano Banana 2.1 基于 Gemini 3.6 Flash。有关 Gemini 3.6 Flash 训练数据集的更多信息，请参阅 Gemini 3.6 Flash 的[模型卡](https://deepmind.google/models/model-cards/gemini-3-6-flash/)。

#### 训练数据处理

有关 Nano Banana 2.1 训练数据处理的更多信息，请参阅 Gemini 3.6 Flash 的[模型卡](https://deepmind.google/models/model-cards/gemini-3-6-flash/)。

---

### 实现与可持续性

#### 硬件

Nano Banana 2.1 基于 Gemini 3.6 Flash。有关 Nano Banana 2.1 的硬件以及我们持续[践行可持续运营承诺](https://sustainability.google/operating-sustainably/)的更多信息，请参阅 Gemini 3.6 Flash 的[模型卡](https://deepmind.google/models/model-cards/gemini-3-6-flash/)。

#### 软件

Nano Banana 2.1 基于 Gemini 3.6 Flash。有关 Gemini 3.6 Flash 软件的更多信息，请参阅 Gemini 3.6 Flash 的[模型卡](https://deepmind.google/models/model-cards/gemini-3-6-flash/)。

---

### 分发

Nano Banana 2.1 通过以下渠道分发；各渠道相关文档随附于对应链接：

- [Gemini App](http://gemini.google.com/)
- [Google AI Studio](https://aistudio.google.com/)
- [Gemini API](https://ai.google.dev/gemini-api/docs/models)
- [Google Search AI Mode](https://search.google/ways-to-search/ai-mode/)
- [Google Ads](http://adwords.google.com/)
- [Google Flow](http://flow.google.com/)
- [Google Stitch](http://stitch.google.com/)

我们的模型通过应用程序接口(API)向下游提供商提供，并须遵守相关使用条款。使用该模型无需特定的硬件或软件。对于 AI Studio 和 Gemini API,请参阅 [Gemini API Additional Terms of Service](https://ai.google.dev/gemini-api/terms);对于 Gemini Enterprise Agent Platform,请参阅 [Google Cloud Platform Terms of Service](https://cloud.google.com/terms/)。更多信息，请参阅 [Gemini Model API instructions](https://ai.google.dev/gemini-api/docs/) 和 [Gemini API quickstart](https://ai.google.dev/gemini-api/docs/quickstart?_gl=1*wgdvnb*_up*MQ..*_ga*MTM5MTAyNTI1NC4xNzc4ODYyMjcy*_ga_P1DBVKWT6V*czE3Nzg4NjIyNzEkbzEkZzAkdDE3Nzg4NjIyNzEkajYwJGwwJGg0MjkzMDc0NTE。)

---

### 评估

#### 评估方法

Nano Banana 2.1 采用以下方法进行评估：

- **能力 / 基准测试** 涵盖图像生成的多个不同质量维度，大致分为两大类：
  - 能力集：使用多样化的 Text-to-Image(T2I)与编辑类公开基准测试以及内部评估，覆盖广泛的能力范围。
    - T2I:通用 Text-to-Image、i18n 文本渲染、事实性(Factuality)(世界知识、EDU 等)、Tool-Use、视觉设计。
    - 编辑：通用图像编辑、风格化、角色编辑、物体/环境编辑、基于墨迹(涂鸦)的编辑、多图像(多产品重构上下文、多角色等)，
    - 多轮对话(Multi-Turn):涵盖静态与动态对话。
  - 回归集：基于在 Gemini 2.5 Flash Image 和 Gemini 3 Pro Image 上观察到的热门用例，确保 Nano Banana 2.1 不出现任何明显的能力回退。
- **评估方法**
  - 通过 SxS 人工评估获得多样化 T2I 与编辑任务在整体偏好、设计质量等方面的 Elo 分数。
  - 使用单侧 AutoRater 评估事实性。

#### 结果

以下为截至 2026 年 10 月的结果：

**能力：Text-to-Image**

| 能力基准测试 | Nano Banana 2.1 (Thinking) | Nano Banana 2.1 (No Thinking) | Gemini 3.1 Flash Image (“Nano Banana 2” Thinking) | Gemini 3 Pro Image (“Nano Banana Pro”) |
| --- | --- | --- | --- | --- |
| 整体偏好 | 1050 +/- 14 | 1015 +/- 13 | 990 +/- 7 | 935 +/- 8 |
| 信息图表设计 | 1048 +/ 17 | 1001 +/- 17 | 961 +/- 12 | 912 +/- 12 |
| 信息图表事实性 | 0.521 | 0.328 | 0.179 | 0.265 |

**能力：编辑**

| 能力基准测试 | Nano Banana 2.1 (Thinking) | Nano Banana 2.1 (No Thinking) | Gemini 3.1 Flash Image (“Nano Banana 2” Thinking) | Gemini 3 Pro Image (“Nano Banana Pro”) |
| --- | --- | --- | --- | --- |
| 通用编辑 | 1026 +/- 12 | 980 +/- 15 | 938 +/- 11 | 939 +/- 10 |
| 单角色一致性 | 1028 +/- 14 | 1021 +/- 14 | 981 +/- 10 | 991 +/- 9 |
| 多角色一致性 | 1106 +/- 14 | 1068 +/- 14 | 978 +/- 10 | 1011 +/- 10 |
| 基于遮罩/墨迹的编辑 | 1049 +/- 15 | 1042 +/- 16 | 965 +/- 12 | 927 +/- 12 |
| 产品一致性 | 1024 +/- 18 | 981 +/- 18 | 955 +/- 22 | 965 +/- 14 |
| 风格化 | 1062 +/- 20 | 1036 +/- 17 | 991 +/- 12 | 990 +/- 12 |
| 多参考图编辑 | 1066 +/- 22 | 1041 +/- 20 | 988 +/- 13 | 989 +/- 12 |

### 预期用途与限制

#### 优势与预期用途

Nano Banana 2.1 能够利用 Gemini 的现实世界知识提供精确的结果，并真实反映你周围的世界——从复杂的信息图表到符合历史事实的场景。它非常适合以下类型的应用：

- 以专业级别的精度和控制力创建与编辑图像，并支持多次快速迭代
- 为海报和复杂图表生成清晰的文本
- 长上下文的现实世界知识
- 跨多种语言的本地化文本渲染

#### 已知限制

Nano Banana 2.1 可能表现出基础模型的一些普遍性局限，例如幻觉。此外，偶尔可能出现响应缓慢或超时问题。

Nano Banana 2.1 在以下方面仍有质量提升空间：

- 小字号文本渲染效果不佳(在 1k 模型中常常模糊)、长段落、页面长度方面表现欠佳
- 输入图像与生成的输出图像之间的角色一致性并非总是完美
- 在基于遮罩/涂鸦的编辑中，指令遵循和墨迹保持能力不完整
- 在图像编辑过程中，我们观察到极少数主体姿态持续保留的情况，即输入图像的结构对齐被保留在生成的输出图像中
- 偶尔在空间定位上出现混淆(例如左/右等)
- 在涉及世界知识、3D 推理和事实性的高级能力方面仍然有限

除此之外，我们还在持续提升越狱(jailbreak)抵抗力，并最近在 Frontier Safety 方面加强了缓解措施。

Gemini 3.6 Flash 的知识截止日期为 2026 年 3 月——在某些领域，用户可以获得更新的信息；而在另一些领域，模型的知识可能仅限于 2025 年 1 月(与 Gemini 3 Model Family 保持一致)。有关已知限制的更多信息，请参阅 Gemini 3.6 Flash [模型卡](https://deepmind.google/models/model-cards/gemini-3-6-flash/)。

#### 可接受使用

有关 Nano Banana 2.1 可接受使用的更多信息，请参阅 Gemini 3.6 Flash [模型卡片](https://deepmind.google/models/model-cards/gemini-3-6-flash/)。

---

### 伦理与内容安全

#### 评估方法

有关 Nano Banana 2.1 评估方法的更多信息，请参阅 Gemini 3.6 Flash [模型卡片](https://deepmind.google/models/model-cards/gemini-3-6-flash/)。

#### 安全政策

有关 Nano Banana 2.1 安全政策的更多信息，请参阅 Gemini 3.6 Flash [模型卡片](https://deepmind.google/models/model-cards/gemini-3-6-flash/)。

#### 人工红队测试结果

我们由模型开发团队之外的专业团队开展人工红队测试，并将高层次发现反馈给模型团队。在儿童安全评估方面，Nano Banana 2.1 满足了规定的发布阈值；这些阈值由专家团队制定，旨在保护在线儿童，并践行 Google 在旗下所有模型和 Google 产品中对儿童安全的[承诺](https://blog.google/technology/safety-security/an-update-on-our-child-safety-efforts-and-commitments/)。总体而言，在包括儿童安全在内的内容安全政策方面，与 Gemini 3 Flash 相比，我们观察到了相当或更好的安全表现。此外，红队测试的范围还涵盖了我们严格政策之外的潜在问题，并与 Gemini 3.1 Pro 进行了性能比较，未发现任何严重隐患。

#### 前沿安全评估

Nano Banana 2.1 是 Gemini 3 模型家族的一员。为对 Nano Banana 2.1 进行前沿安全评估，我们依据[前沿安全框架](https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf)中所述的对 Gemini 3.1 Pro 和 Gemini 3.7 Flash 的评估结果。我们发现 Gemini 3.1 Pro 和 Gemini 3.7 Flash 均未达到任何追踪或关键能力水平。我们的评估表明，与 Gemini 3.1 Pro 或 Gemini 3.7 Flash 相比，Nano Banana 2.1 不具备有意义的新能力，也没有实质性的性能提升；因此基于这些结果，我们确信 Nano Banana 2.1 同样不太可能达到任何追踪或关键能力水平。

有关我们前沿安全评估的更多信息，请阅读 [Gemini 3.1 Pro 模型卡片](https://deepmind.google/models/model-cards/gemini-3-1-pro/)和 [Gemini 3.7 Flash 模型卡片](https://deepmind.google/models/model-cards/gemini-3-7-flash/)。

#### 风险与缓解措施

有关 Gemini 3 系列(包括 Nano Banana 2.1)风险与缓解措施的更多信息，请参阅 Gemini 3.1 Pro [模型卡片](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-3-1-Pro-Model-Card.pdf)。

### 最新模型卡片
[https://deepmind.google/models/model-cards/nano-banana-2-1/](https://deepmind.google/models/model-cards/nano-banana-2-1/)

#### Nano Banana 2.1
[https://deepmind.google/models/model-cards/nano-banana-2-1](https://deepmind.google/models/model-cards/nano-banana-2-1)  了解更多 [https://deepmind.google/models/model-cards/gemini-3-8-flash/](https://deepmind.google/models/model-cards/gemini-3-8-flash/)

#### Gemini 3.8 Flash
[https://deepmind.google/models/model-cards/gemini-3-8-flash](https://deepmind.google/models/model-cards/gemini-3-8-flash)  了解更多 [https://deepmind.google/models/model-cards/gemini-robotics-on-device-2/](https://deepmind.google/models/model-cards/gemini-robotics-on-device-2/)

#### Gemini Robotics On-Device 2
[https://deepmind.google/models/model-cards/gemini-robotics-on-device-2](https://deepmind.google/models/model-cards/gemini-robotics-on-device-2)  了解更多 [https://deepmind.google/models/model-cards/gemini-robotics-er-2/](https://deepmind.google/models/model-cards/gemini-robotics-er-2/)

#### Gemini Robotics ER 2
[https://deepmind.google/models/model-cards/gemini-robotics-er-2](https://deepmind.google/models/model-cards/gemini-robotics-er-2)  了解更多 [https://deepmind.google/models/model-cards/lyria-3-5/](https://deepmind.google/models/model-cards/lyria-3-5/)

#### Lyria 3.5
[https://deepmind.google/models/model-cards/lyria-3-5](https://deepmind.google/models/model-cards/lyria-3-5)  了解更多 [https://deepmind.google/models/model-cards/gemini-3-6-flash/](https://deepmind.google/models/model-cards/gemini-3-6-flash/)

#### Gemini 3.6 Flash
[https://deepmind.google/models/model-cards/gemini-3-6-flash](https://deepmind.google/models/model-cards/gemini-3-6-flash)  了解更多
