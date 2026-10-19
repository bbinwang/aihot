---
title: "Cloudflare 开源其多模态决策模型 Clef：能听声音、看视频、直接做判断"
date: 2026-10-10T00:00:00.000Z
tags: ["产品发布", "Cloudflare", "Clef", "决策模型", "多模态", "Agent", "聚合"]
summary: "基于阿里 Qwen3-Omni，Clef-omni 能结合图文音视频给选项打分；Flash 降价，Clef 提速。看懂它省掉的步骤、实际账单，以及该选哪款模型。"
---
> **原文链接**: [https://blog.cloudflare.com/clef-faster-cheaper-multimodal/](https://blog.cloudflare.com/clef-faster-cheaper-multimodal/)
> **来源**: Cloudflare
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/cloudflare-clef-omni/) · 2026/10/10
> **说明**: 本文由 AIHot 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

![](https://blog.cloudflare.com/_image?href=https%3A%2F%2Fblog.cloudflare.com%2F_emdash%2Fapi%2Fmedia%2Ffile%2F01M4GV0AV5F55NC2CCEBK9XCTA.png&w=1999&h=1125&f=webp&fit=cover&position=center)![](data:image/bmp;base64,Qk32BAAAAAAAADYAAAAoAAAACAAAAAgAAAABABgAAAAAAMAAAAATCwAAEwsAAAAAAAAAAAAA///////99fHu5+fl5+nr7/Ly9PXx8/Lp////////8vDx4OPp3uPu5uz27/L18vLs////////7/D12N/t093z3Ob76e768PLw////////7/H61d7zzNr41+P/5+7/8vT1////////8vT/1+D4ztv92uX/6vH/9fj6////////9vj/3eP81uD/4ur/8fb/+v3+////////+/v/4+f/3uT/6vD/9/v//////////////Pz/5uj/4ub/7fL/+v3/////)

继上周发布 [Clef 和 Clef-flash](https://blog.cloudflare.com/clef-decision-models/)（Cloudflare 的开源权重决策模型）之后，我们决定带来更多惊喜。今天，我们发布 Clef-omni，它支持音频和视频输入，同时处理文本和图像。我们还降低了 Clef-flash 的价格，使其现在比 Jev 更便宜，并提升了 Clef 的速度。

尽管 Cloudflare 在模型领域仍处于早期阶段，但创新和迭代是我们的 DNA，我们将这些原则应用于我们所做的每一件事。事实上，Clef 的故事在不到一周的时间内就成型了。我们决定在周五晚上做一些关于决策模型的事情，在周末训练模型，并在周四发布。即使时间如此紧迫，我们仍然能够为社区提供高性能、高质量的开源权重模型——想象一下未来我们还能做到什么。

今天，我们很高兴通过 Clef 模型家族的新增功能和改进来保持这一势头。这仅仅是开始，我们将继续变得更好、更快、更便宜、更具创新性。

### Clef-omni 接受音频、视频、图像和文本输入

我们的新 Clef-omni 模型能够接受音频、视频、图像和文本输入。这改变了决策模型的范式，自 TypeSafe 推出 Jev 以来，决策模型 largely 仅限于文本。使用 Clef，我们支持图像和视频帧数组，但 Clef-omni 能够接受音频（wav 或 mp3）和视频（mp4 或 webm），同时处理文本和图像。

无需设置级联模型管道来将语音转录为文本，或从视频中分离音频和图像通道，您只需调用一个模型即可跨任何模态做出决策。我们离一个能够像我们体验世界一样通过音频、视觉和文本交流进行互动的模型又近了一步。

查看我们的开发者文档，了解新的 [Clef-omni](https://developers.cloudflare.com/workers-ai/models/clef-omni) 模型。我们还在 [HuggingFace](https://huggingface.co/Cloudflare/clef-omni) 上发布了该模型的 [开源权重](https://huggingface.co/Cloudflare/clef-omni)。以下是如何向 Clef-omni 发送新模态输入的快速入门指南：

```
<span class="line"><span>curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/cloudflare/clef-omni \</span></span>
<span class="line"><span>  -X POST \</span></span>
<span class="line"><span>  -H "Authorization: Bearer $CLOUDFLARE_AUTH_TOKEN" \</span></span>
<span class="line"><span>  -H "Content-Type: application/json" \</span></span>
<span class="line"><span>  -d '{</span></span>
<span class="line"><span>    "model": "clef-omni",</span></span>
<span class="line"><span>    "state": "Review the installation: a photo of the unit, an audio recording of it running, and a video of the fan.",</span></span>
<span class="line"><span>    "images": ["data:image/png;base64,<base64-png>"],</span></span>
<span class="line"><span>    "audio": ["data:audio/mpeg;base64,<base64-mp3>"],</span></span>
<span class="line"><span>    "videos": ["data:video/mp4;base64,<base64-mp4>"],</span></span>
<span class="line"><span>    "questions": {</span></span>
<span class="line"><span>      "label_visible": {"type": "noul", "instructions": "Is the model and serial number label visible in the photo?"},</span></span>
<span class="line"><span>      "sounds_normal": {"type": "noul", "instructions": "Does the unit sound like it is running smoothly, without rattling or grinding?"},</span></span>
<span class="line"><span>      "fan_running": {"type": "noul", "instructions": "Is the fan running in the video?"}</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }'</span></span>
```

Clef-omni 将我们的开源权重决策架构扩展至原生支持多模态工作流。我们基于 Qwen3-Omni-30B-A3B-Instruct 混合专家（MoE）模型构建了这一能力，该模型已具备在单一管道中直接处理文本、图像、音频和视频的能力。然而，我们仅保留主要的理解主干网络，并舍弃了文本转语音（TTS）输出组件。在生产环境中，Clef-omni 会对完整载荷执行一次快速预填充（prefill）传递，同时对所有模态和有效的参数选项进行评分。

由于 Clef 模型并非大型语言模型（LLMs），我们跳过输出 token 的生成，从而消除了转录或为传入文件添加字幕的开销。媒体元素直接映射到统一序列中，视频和音频与视觉帧同步以进行联合处理。Clef-omni 随后通过我们的两阶段注意力路由机制直接从内部嵌入中提取候选值：每个有效选项都会从输入中收集关键证据（无论这些证据隐藏在文本片段、视觉元素还是音频流中），随后字段向量在整个上下文中进行交叉注意力计算以得出置信度分数。我们内置了一种词汇语法，以保留选项的语义，从而能够在每种输入类型上提供快速且受模式约束的评分。

我们使用与训练 Clef 相同的技术来训练该模型：冻结 Qwen3 主干网络，训练低秩适配器（LoRA），并应用我们标准的后训练方法：结合标签平滑交叉熵损失与 Brier 分数校准。结果是一个具有弹性的模型，无论模式变化、字段顺序还是提示结构如何，都能确保成功运行。

这为 Clef 模型家族带来了多项核心升级。经过校准且绑定模式的决策现在能够通过单次 API 调用无缝处理文本、图像、音频和同步视频。速度也很快。纯文本决策的中位返回时间约为 130 毫秒，图像输入约为 150 毫秒，音频片段则在几百毫秒内完成。即使是带有声音的完整 21 秒视频片段，也能在约 1.5 秒内完成评分，且全部通过单次 API 调用实现。

我们的基准测试显示，即使在新的模态和 MoE 架构下，性能依然强劲。

| **基准测试** | [Clef-omni](https://huggingface.co/Cloudflare/clef-omni) | [Clef](https://huggingface.co/Cloudflare/clef) | [Clef-flash](https://huggingface.co/Cloudflare/clef-flash) | [Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev) |
| --- | --- | --- | --- | --- |
| BFCL · case exact | 98.2 | 98.47 | **98.76** | 95.75 |
| ToolRet · nDCG@10 | 66.6 | **69.19** | 66.43 | 65.28 |
| API-Bank · accuracy | 92.7 | 91.93 | **93.11** | 88.19 |
| Home appliances · case exact | 69.3 | 82.95 | **97.73** | 52.27 |
| When2Call · accuracy | 63.3 | 72.37 | 65.58 | **80.97** |
| BANKING77 · macro-F1 | **94.8** | 94.20 | 90.93 | 79.74 |
| CLINC150+OOS · macro-F1 | **97.7** | 97.43 | 66.77 | 89.27 |
| BRIGHT · nDCG@10 | 42.0 | 45.91 | 39.26 | **47.52** |
| Amazon ESCI · macro-F1 | **57.8** | 57.48 | 57.39 | 55.21 |
| PhishNChips · accuracy | 73.2 | **79.60** | 75.05 | 62.55 |

我们还针对 [TypeSafe 评估](https://evals.typesafe.ai/) 进行了基准测试，以展示 Clef-omni 的性能表现。

| **工作流** | **指标** | **Clef-Omni** | **Clef** | **Clef-flash** | **Jev** |
| --- | --- | --- | --- | --- | --- |
| 发票处理 | Exact actions | 60.2 | **64.7** | 57.1 | 61.8 |
| 发票处理 | Primary action | 82.0 | **86.2** | 73.3 | 83.1 |
| 客户服务 | Exact actions | 71.6 | 76.3 | **77.0** | 76.0 |
| 安全事件 | Exact actions | 61.7 | **62.9** | 61.7 | 61.7 |
| 智能体追踪可观测性 | Primary action | 65.8 | 68.5 | 69.8 | **71.6** |

### Clef-flash 模型现在更便宜

我们听到了您的反馈——您需要一种足够实惠、能够融入任何工作流的决策模型。我们进行了一些优化，现在可以提供更低价的 Clef-flash。我们希望 Clef 能够为您在所有智能体工作流中提供可扩展的决策能力，现在我们的定价策略也旨在激励这一目标。

我们成功将模型优化至 Clef-flash 现在比 Jev **更便宜**，同时仍保持高性能和高品质。请随时查阅 [开发者文档](https://developers.cloudflare.com/ai/models/) 以获取最新的定价信息，包括有关如何将图像和音频模态转换为用于计费的输入 token 的更多细节。

- Clef-flash – 原为每百万输入 token $0.09，现降至 **每百万输入 token $0.038**
- Clef – 保持 **每百万输入 token $0.24**
- Clef-omni – 今日发布，定价为 **每百万输入 token $0.15**

然而，为了实现更低的定价，我们不得不做出的一个权衡是缩减 Clef-flash 的上下文窗口。托管版 Clef-flash 的上下文窗口现在为 24k，而非此前宣传的 64k。Hugging Face 上的模型权重未受影响，经过训练以支持 256k 上下文窗口，如果您选择自行托管，可以使用该配置。

根据我们的使用数据，仅有 0.24% 的请求输入 token 数超过 24k。基于此数据，我们决定将 Clef-flash 的上下文窗口降至 24k，从而提供更易入门的定价。我们的 Clef 模型仍保持 64k 上下文窗口，我们建议有更大上下文需求的用户改用 Clef 而非 Clef-flash。

### Clef 模型现在更快

Clef 模型的速度也提升了，我们对 Workers AI 上托管版 Clef 进行了新的优化。我们没有发布新的模型权重，因为我们所做的优化主要位于服务基础设施层，而非实质性改变模型权重或架构。请查看我们新的速度数据：

| 输入大小 | 之前：中位数 / p95 (ms) | 现在：中位数 / p95 (ms) | 中位数加速比 |
| --- | --- | --- | --- |
| ~800 tokens | 262 / 438 | 152 / 351 | 1.7× |
| ~3,400 tokens | 616 / 777 | 305 / 531 | 2.0× |
| ~16,000 tokens | 2,721 / 3,250 | 1,635 / 1,805 | 1.7× |

我们做出的优化之一是采用 SGLang 来服务模型。我们与 SGLang 团队合作，并提交了合并请求以集成 Clef（PR [#42721](https://github.com/sgl-project/sglang/pull/42721)），该功能将在 SGLang 0.5.22 版本中发布。由于我们已发布模型权重，您也可以自行托管 Clef，新的 SGLang 启动命令可在我们的 [更新后的 Hugging Face 仓库](https://huggingface.co/collections/Cloudflare/clef) 以及 [SGLang cookbooks](https://docs.sglang.io/cookbook/autoregressive/Cloudflare/clef#hw=h200&variant=clef&quant=bf16&strategy=balanced&nodes=single) 中找到。

### 人们如何使用 Clef？

在 Cloudflare，我们的一些团队正在尝试将 Clef 用作一个能够辅助对广泛领域进行分类的模型。观察团队采用 Clef 最酷的一点是，检测和分类的能力已下沉至模型层，使得任何人都可以将决策模型集成到其用例中。以前，即使使用零样本分类器，小模型可能也不足以在不进行进一步微调的情况下对任何领域进行分类。您可能需要组建专门的机器学习团队来帮助针对您的特定领域进行训练，并收集语料库以训练更好的模型。现在，您只需调用模型即可即时精确地解析输入数据。

以下是 Cloudflare 团队使用 Clef 的一些亮点：我们的公共 GitHub 文档仓库使用 Clef 来即时 [检测和关闭垃圾问题](https://github.com/cloudflare/cloudflare-docs/pull/34139)。EmDash（我们的内容管理系统）[对插件库进行钓鱼检测](https://emdashcms.com/blog/01M49N4779YCXX3QPKWSSNE3DY)。我们的数据防泄漏团队正在扫描数据以查找潜在的个人信息（PII），如政府身份证件。我们的威胁情报团队正在使用 Clef 来帮助检测恶意域名。

### 试一试！

我们很高兴为您带来 Clef 模型家族的更多内容，包括音频和视频等新模态，以及通过更低的定价和更快的速度使模型更易访问。Clef 完全兼容 Jev-API，并通过 AI Gateway 提供，因此只需更改模型 ID 即可在今天试用 Clef。请查看我们的 [开发者文档](https://developers.cloudflare.com/ai/models/) 以获取更多信息。

感谢大家对我们 Cloudflare 首批模型所给予的喜爱与热情欢迎——我们将继续致力于为您带来更多。欢迎体验我们的 Clef 系列模型，并告诉我们您的想法。

### 相关标签
[AI](https://blog.cloudflare.com/tag/ai/)[开发者](https://blog.cloudflare.com/tag/developers/)[机器学习](https://blog.cloudflare.com/tag/machine-learning/)[开源](https://blog.cloudflare.com/tag/open-source/)[产品动态](https://blog.cloudflare.com/tag/product-news/)[Workers AI](https://blog.cloudflare.com/tag/workers-ai/)

在社交媒体上关注我们

- ![Cloudflare](https://blog.cloudflare.com/images/placeholder__cloudflare.png)Cloudflare[https://blog.cloudflare.com/rss/](https://blog.cloudflare.com/rss/)[https://x.com/Cloudflare](https://x.com/Cloudflare)[https://www.linkedin.com/company/cloudflare-inc-](https://www.linkedin.com/company/cloudflare-inc-)[https://www.youtube.com/cloudflare](https://www.youtube.com/cloudflare)[https://instagram.com/cloudflare](https://instagram.com/cloudflare)[https://github.com/cloudflare](https://github.com/cloudflare)[https://bsky.app/profile/cloudflare.social](https://bsky.app/profile/cloudflare.social)[https://www.threads.com/@cloudflare](https://www.threads.com/@cloudflare)[https://www.tiktok.com/@cloudflare](https://www.tiktok.com/@cloudflare)
- ![Michelle Chen](https://blog.cloudflare.com/_image?href=https%3A%2F%2Fblog.cloudflare.com%2F_emdash%2Fapi%2Fmedia%2Ffile%2F01KW44R95PPSQQ82Z92P51M550.jpg&w=64&h=64&f=webp&fit=cover&position=center)[Michelle Chen](https://blog.cloudflare.com/author/michelle/)[https://x.com/michellechen](https://x.com/michellechen)

### 订阅以接收新文章通知
