---
title: "MiniMax 开源 H3-Image：原生 4K 出图，最多用 16 张参考图改图"
date: 2026-11-11T00:00:00.000Z
tags: ["产品发布", "MiniMax", "H3-Image", "图像生成", "图像编辑", "开源"]
summary: "MiniMax 推出 H3 家族的图像生成与编辑模型，同一个模型既能凭文字出图，也能结合多张参考图改图。它直接生成约 1600 万像素的画面，无需再接放大模型。"
---
> **原文链接**: [https://huggingface.co/MiniMaxAI/MiniMax-H3-Image](https://huggingface.co/MiniMaxAI/MiniMax-H3-Image)
> **来源**: huggingface.co
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/minimax-h3-image/) · 2026/11/11
> **说明**: 本文由 AIHot汪 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

## MiniMax-H3-Image
- 作者: MiniMaxAI
- 来源： https://huggingface.co/MiniMaxAI/MiniMax-H3-Image
---

---
pipeline_tag: text-to-image
license: other
license_name: minimax-h3-image-community-license-agreement
license_link: LICENSE
library_name: minimax-h3
language:
- en
tags:
- text-to-image
- image-to-image
- image-editing
- image-generation
- minimax-h3
- diffusers
base_model:
- MiniMaxAI/MiniMax-H3
---

<div align="center">
  <img width="100%" src="assets/minimax-h3-image.jpg" alt="MiniMax H3 图像，开放权重">
</div>

<p align="center">
  <a href="https://hailuoai.video" target="_blank"><img src="https://img.shields.io/badge/Hailuo%20AI-FF6C37?logo=minimax&logoColor=white" alt="Hailuo AI"></a>
  <a href="https://platform.minimax.io" target="_blank"><img src="https://img.shields.io/badge/API-FF6C37?logo=minimax&logoColor=white" alt="API"></a>
  <a href="https://www.minimax.io" target="_blank"><img src="https://img.shields.io/badge/MiniMax%20Website-FF6C37?logo=minimax&logoColor=white" alt="MiniMax 网站"></a>
  <a href="https://github.com/MiniMax-AI/MiniMax-H3-Image" target="_blank"><img src="https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white" alt="GitHub"></a>
  <a href="https://huggingface.co/MiniMaxAI/MiniMax-H3-Image" target="_blank"><img src="https://img.shields.io/badge/Hugging%20Face-FFD21E?logo=huggingface&logoColor=black" alt="Hugging Face"></a>
  <br>
  <a href="https://modelscope.cn/models/MiniMax/MiniMax-H3-Image" target="_blank" rel="noopener noreferrer"><img alt="ModelScope MiniMax AI" src="https://img.shields.io/badge/ModelScope-MiniMax%20AI-white?labelColor=%23EF3D5D"></a>
  <a href="https://platform.minimax.cn/docs/faq/contact-us" target="_blank"><img src="https://img.shields.io/badge/WeChat-07C160?logo=wechat&logoColor=white" alt="微信"></a>
  <a href="https://discord.com/invite/dbMxutw7tP" target="_blank"><img src="https://img.shields.io/badge/Discord-5865F2?logo=discord&logoColor=white" alt="Discord"></a>
  <a href="https://huggingface.co/MiniMaxAI/MiniMax-H3-Image/blob/main/LICENSE"><img src="https://img.shields.io/badge/LICENSE-4CAF50?logo=creativecommons&logoColor=white" alt="LICENSE"></a>
</p>

## MiniMax-H3-Image

### 在线 API

通过 API 直接使用 MiniMax-H3-Image。

- 国际站： [platform.minimax.io](https://platform.minimax.io/docs/guides/image-generation) | 国内站： [platform.minimax.cn](https://platform.minimax.cn/docs/guides/image-generation)

API 文档：
- 文生图: [英文文档](https://platform.minimax.io/docs/api-reference/image-generation-h3-generations), [中文文档](https://platform.minimax.cn/docs/api-reference/image-generation-h3-generations)
- 图像编辑： [英文文档](https://platform.minimax.io/docs/api-reference/image-generation-h3-edits), [中文文档](https://platform.minimax.cn/docs/api-reference/image-generation-h3-edits)
- Prompt 扩写： [英文文档](https://platform.minimax.io/docs/api-reference/image-generation-h3-context-ir), [中文文档](https://platform.minimax.cn/docs/api-reference/image-generation-h3-context-ir)

### 在线应用

通过应用直接使用 MiniMax-H3-Image。

- WebApp 国际站： [hailuoai.video](https://hailuoai.video/) | 国内站： [hailuoai.com](https://hailuoai.com/)
- 桌面端国际站： [agent.minimax.io](https://agent.minimax.io/) | 国内站： [agent.minimax.cn](https://agent.minimax.cn)

### 简介

MiniMax-H3-Image 是源自 [MiniMax H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) 系列的最先进开源图像生成与编辑模型。它将创作意图的智能理解与构建视觉世界的能力相结合：凭借精准的指令遵循能力，将一个创意概念发展为具体的角色、场景与氛围。生成与编辑统一于同一个 checkpoint 中：既支持从文本生成图像(text-to-image),也支持编辑一张或多张参考图像，为创作者和开发者提供灵活且可控的图像创作方式。

它能直接生成约 1600 万像素的图像，涵盖所有宽高比，从 4096x4096(1:1)到 6272x2688(21:9),且无需上采样器(参见 [Sizes](#sizes))。该 checkpoint 经蒸馏至 6 个采样步骤(6 NFEs),无需 classifier-free guidance。其 diffusion transformer(DiT)采用不带音频层的 H3 架构，并原样使用 MiniMax-H3 文本编码器。

![15 张 MiniMax-H3-Image 文生图结果,包含横版与竖版格式:3D 奇幻战斗场景、青绿山水画、树蛙、靛蓝染兔、3D 白发少女、花丛人像、科幻城市、饺子、高地牛、镜中人像、3D 水獭与绵羊、像素风猫、宝石甲虫、巨型樱桃和鱼眼自拍](assets/showcase_hero.jpg)

**核心亮点**

MiniMax-H3-Image 融合了三大核心优势:速度、图像质量和指令遵循能力。

1. **以实用的计算成本生成 1600 万像素图像。** 与当前常见的 1–4 MP 输出相比,16 MP(4096 × 4096)图像能够呈现多得多的细节,但通常需要大幅增加计算量。MiniMax-H3-Image 将这一计算成本控制在可管理的范围内,使 16 MP 生成在日常创作中切实可行。
2. **细节丰富。真实感出众。** MiniMax-H3-Image 超越了人们熟悉的“AI 感”,生成具有精致细节和逼真质感的图像,为创意和专业用途开辟了更多可能。它让生成的图像更加贴近真实视觉世界的丰富性与细腻度。
3. **更强的指令遵循能力。更大的创作掌控力。** 出色的图像生成不止于美丽的画面——它帮助创作者将想法变为现实。MiniMax-H3-Image 在开源模型中提供了最强的指令遵循能力,并支持最多 16 张参考图像,让创作者对最终结果拥有更多控制权。

### Model Zoo

| Model | Role | Precision | Size | Hugging Face |
| --- | --- | --- | --- | --- |
| **MiniMax-H3-Image** | 文生图与图像编辑 | BF16 (DiT) | 68.65 GB | [MiniMaxAI/MiniMax-H3-Image](https://huggingface.co/MiniMaxAI/MiniMax-H3-Image) |
| **MiniMax-H3-Image-PE**(可选) | 用于文生图的提示词扩展器 | NVFP4 | 17.9 GB | [MiniMaxAI/MiniMax-H3-Image-PE](https://huggingface.co/MiniMaxAI/MiniMax-H3-Image-PE) |

### Model Architecture

<!-- TODO(release): architecture figure, e.g. assets/architecture.png, adapted from MiniMax-H3's assets/full-arch.png without the audio branch. -->

MiniMax-H3-Image 遵循 H3-Base 设计,并移除了音频分支。文本提示词和参考图像由 H3 text encoder 编码;参考图像同时也会由图像 VAE 编码。所有 token 组成一个打包序列,输入单流 transformer,由其预测目标图像的 latent。VAE 将该 latent 解码为图像。

- **Text encoder**:MiniMax-H3 的完整 Qwen3-VL text encoder,保持不变。DiT 读取其第 50 层的隐藏状态。
- **Image VAE**:一个 CNN 编码器和一个 2D ViT 解码器(24 层),空间下采样倍率为 16x,latent 通道数为 24。DiT 使用 2x2 patch 对 latent 进行分块,因此每个 transformer token 覆盖 32x32 像素。
- **Diffusion transformer**:33.1B 参数,稠密单流 transformer,包含 50 层(hidden size 5376,56 个 attention heads,FFN size 14336)以及 3D multimodal RoPE,与 H3-Omni-Transformer 相同。权重采用 BF16;embedding、timestep 和输出层采用 FP32。

### Quick Start

#### Download

| Component | Content | Size |
| --- | --- | --- |
| `transformer/` | DiT:BF16,其中 embedding、timestep 和输出层为 FP32。 | 66.28 GB |
| `pdd_fused_heads.safetensors`, `pdd_config.json` | 逐步输出头(用于替换 transformer 的输出层)以及采样时间表。 | 12 MB |
| `vae/` | 图像 VAE,FP32。 | 2.34 GB |
| `tokenizer/`, `processor/` | Qwen3-VL tokenizer 和 processor,与 MiniMax-H3 完全一致。 | 23 MB |
| Text encoder | 不包含在本仓库中。`model_index.json` 会从 [`MiniMaxAI/MiniMax-H3`](https://huggingface.co/MiniMaxAI/MiniMax-H3) 的 `text_encoder/` 文件夹加载它。如果你已经拥有 MiniMax-H3,则不会重复下载。 | 66.7 GB |

```text
MiniMax-H3-Image/
├── model_index.json
├── pdd_config.json
├── pdd_fused_heads.safetensors
├── processor/
├── tokenizer/
├── transformer/
└── vae/
```

将本仓库以及 MiniMax-H3 的 text encoder 下载到 Hugging Face 缓存中：

```bash
hf download MiniMaxAI/MiniMax-H3-Image
hf download MiniMaxAI/MiniMax-H3 --include "text_encoder/*"
## optional prompt expander
hf download MiniMaxAI/MiniMax-H3-Image-PE
```

#### 本地部署

我们推荐使用以下推理框架来部署该模型：

- [SGLang](https://docs.sglang.io/) - 参见 [cookbook](https://docs.sglang.io/cookbook/diffusion/MiniMax/MiniMax-H3-Image)
- [vLLM-Omni](https://github.com/vllm-project/vllm-omni) - 参见 [vllm-omni recipe](https://recipes.vllm.ai/MiniMaxAI/MiniMax-H3-Image)
- [diffusers](https://github.com/huggingface/diffusers) - 参见 [diffusers 文档](https://huggingface.co/docs/diffusers/main/en/api/pipelines/minimax_h3_image)
- [ComfyUI](https://github.com/Comfy-Org/ComfyUI) - 参见 [Comfy 教程](https://docs.comfy.org/tutorials/image/minimax/minimax-h3-image);使用 [T2I 模板](https://github.com/Comfy-Org/workflow_templates/blob/main/templates/image_minimax_h3_image_t2i.json) / [编辑模板](https://github.com/Comfy-Org/workflow_templates/blob/main/templates/image_minimax_h3_image_edit.json)

##### vLLM-Omni 部署

请参阅 [vLLM-Omni recipe](https://recipes.vllm.ai/MiniMaxAI/MiniMax-H3-Image),了解针对各硬件的部署配置及实测延迟。支持 NVIDIA 和 AMD 加速卡，包括 NVIDIA H200、RTX PRO 6000 Blackwell、AMD Instinct MI350X 等。

在单张 GPU 上启动服务器：

```bash
vllm serve MiniMaxAI/MiniMax-H3-Image --omni --host 0.0.0.0 --port 8000
```

如需更低延迟，可使用序列并行(sequence parallelism,Ulysses)将每个请求拆分到多张 GPU 上，例如 4 张 GPU:

```bash
vllm serve MiniMaxAI/MiniMax-H3-Image --omni --host 0.0.0.0 --port 8000 \
  --num-gpus 4 --usp 4 --text-encoder-tp-size 4
```

##### SGLang 部署

这里以 SGLang 作为部署示例。更多部署配置请参阅 [MiniMax-H3-Image 部署指南](https://docs.sglang.io/cookbook/diffusion/MiniMax/MiniMax-H3-Image)。

在单张 GPU 上启动服务器：

```bash
sglang serve --model-path MiniMaxAI/MiniMax-H3-Image --host 0.0.0.0 --port 30000 --warmup-mode off
```

若要使用 MiniMax-H3 `text_encoder/` 文件夹的本地副本而非 Hugging Face 缓存，请添加 `--text-encoder-path <path to text_encoder>`。

如需更低延迟，可使用序列并行(sequence parallelism,Ulysses)将每个请求拆分到多张 GPU 上，例如 4 张 GPU:

```bash
sglang serve --model-path MiniMaxAI/MiniMax-H3-Image --host 0.0.0.0 --port 30000 --warmup-mode off \
  --num-gpus 4 --ulysses-degree 4
```

##### 请求参数

文生图(Text-to-image)请求是发送到 `/v1/images/generations` 的 JSON。图像编辑(Image editing)请求将参考图像以 multipart form data 形式发送到 `/v1/images/edits`;其上传顺序对应 prompt 中的 `<Picture 1>`、`<Picture 2>` 等。两者均通过 `data[0].b64_json` 返回 PNG。可运行示例见 [完整工作流](#full-workflow)。

| 字段 | 文生图 | 图像编辑 | 说明 |
| --- | --- | --- | --- |
| `prompt` | 必填 | 必填 | 按原样使用，截断至 4096 token。参见 [完整工作流](#full-workflow) |
| `size` | 必填 | 必填 | `WIDTHxHEIGHT`。返回的图像尺寸与此完全一致；参见 [尺寸](#sizes) |
| `image` | — | 一个或多个文件 | 按上传顺序对应 prompt 中的 `<Picture 1>`、`<Picture 2>`、…… |
| `seed` | 推荐 | 推荐 | 整数 |
| `generator_device` | 推荐 `cpu` | 推荐 `cpu` | 相同 seed 在任何机器上都产生相同的初始噪声 |
| `response_format` | `b64_json` | `b64_json` | |
| `min_generation_area` | 可选 | 可选 | 最小生成区域(像素)，范围 1024-16777216,默认 4194304(2048x2048)。较小的 `size` 会在更大画布上按相同宽高比生成，再用 LANCZOS 缩放回目标尺寸；传入 1024 可关闭此功能。下表中的所有尺寸均高于该默认值 |
| `num_inference_steps` | 省略或 6 | 省略或 6 | 其他值会返回 HTTP 400 |
| `guidance_scale` | 省略或 1 | 省略或 1 | 其他值会返回 HTTP 400 |
| `negative_prompt` | 不支持 | 不支持 | 会被拒绝 |

##### 尺寸

MiniMax-H3-Image 的有效工作范围约为 4 MP 至 20 MP,通常在 16 MP 左右效果最佳。常见的 16 MP 尺寸如下：

| 宽高比 | 尺寸(宽 x 高) |
| --- | --- |
| 1:1 | 4096x4096 |
| 4:3 / 3:4 | 4736x3552 / 3552x4736 |
| 3:2 / 2:3 | 5024x3360 / 3360x5024 |
| 16:9 / 9:16 | 5472x3072 / 3072x5472 |
| 21:9 | 6272x2688 |

#### 完整工作流程

MiniMax-H3-Image 需要针对整幅图像的详细英文描述。MiniMax API 会在生成前通过 **H3-Image-Context-IR** 将任意语言的简短 prompt 转换为这样的描述。我们还提供了
[MiniMax-H3-Image-PE](https://huggingface.co/MiniMaxAI/MiniMax-H3-Image-PE),可进行本地部署。

本节展示如何使用本地部署的 SGLang 服务器复现 MiniMax API 直接生成图像的质量。脚本位于
[`examples/`](https://huggingface.co/MiniMaxAI/MiniMax-H3-Image/tree/main/examples) 中，仅使用 Python 标准库；请在该文件夹中运行：

```bash
hf download MiniMaxAI/MiniMax-H3-Image --include "examples/*" --local-dir .
cd examples
```

在运行示例之前，请设置你的 MiniMax API endpoint 和 key,以便使用 H3-Image-Context-IR API 和参考脚本。脚本会从环境变量中读取它们：

```bash
## MiniMax API endpoint (choose one)
## CN
export MINIMAX_API_BASE="https://api.minimax.cn"
## Global
## export MINIMAX_API_BASE="https://api.minimax.io"

## API key obtained from the MiniMax platform
export MINIMAX_API_KEY="<api-key>"
```

API 文档：
- H3-Image-Context-IR:使用 /v1/h3_image_context_ir [英文文档](https://platform.minimax.io/docs/api-reference/image-generation-h3-context-ir),[中文文档](https://platform.minimax.cn/docs/api-reference/image-generation-h3-context-ir)
- 文生图：使用 /v1/images/generations [英文文档](https://platform.minimax.io/docs/api-reference/image-generation-h3-generations),[中文文档](https://platform.minimax.cn/docs/api-reference/image-generation-h3-generations)
- 图像编辑：使用 /v1/images/edits [英文文档](https://platform.minimax.io/docs/api-reference/image-generation-h3-edits),[中文文档](https://platform.minimax.cn/docs/api-reference/image-generation-h3-edits)

##### case-T2I

[`instruction.t2i.txt`](https://huggingface.co/MiniMaxAI/MiniMax-H3-Image/blob/main/examples/instruction.t2i.txt)。

<table>
<thead>
<tr><th colspan="2">阶段</th><th>请求</th><th>结果</th></tr>
</thead>
<tbody>
<tr><td rowspan="2">Prompt 增强</td><td>H3-Image-Context-IR(MiniMax API)</td><td><code>python3 context_ir.py t2i</code>(<a href="https://huggingface.co/MiniMaxAI/MiniMax-H3-Image/blob/main/examples/context_ir.py">脚本</a>)</td><td><code>revised_prompt.txt</code>、<code>revised_size.txt</code>;我们的运行结果：<a href="https://huggingface.co/MiniMaxAI/MiniMax-H3-Image/blob/main/examples/revised_prompt.t2i.txt"><code>revised_prompt.t2i.txt</code></a>、<a href="https://huggingface.co/MiniMaxAI/MiniMax-H3-Image/blob/main/examples/revised_size.t2i.txt"><code>revised_size.t2i.txt</code></a>(4736x3552)</td></tr>
<tr><td>本地替代方案：<a href="https://huggingface.co/MiniMaxAI/MiniMax-H3-Image-PE">MiniMax-H3-Image-PE</a></td><td>PE 仓库中的 <code>scripts/expand_prompt.py</code></td><td>将 <code>expanded_caption</code> 保存为 <code>revised_prompt.txt</code>,并将 <code>aspect_ratio</code> 对应的尺寸保存为 <code>revised_size.txt</code></td></tr>
<tr><td colspan="2">MiniMax-H3-Image 生成：本地 SGLang</td><td><code>python3 t2i.py --prompt revised_prompt.txt --size $(cat revised_size.txt)</code>(<a href="https://huggingface.co/MiniMaxAI/MiniMax-H3-Image/blob/main/examples/t2i.py">脚本</a>)</td><td><code>t2i.png</code></td></tr>
<tr><td colspan="2">E2E API 参考：直接调用 MiniMax API 进行文生图</td><td><code>python3 api_generate.py t2i</code>(<a href="https://huggingface.co/MiniMaxAI/MiniMax-H3-Image/blob/main/examples/api_generate.py">脚本</a>)</td><td><code>api_t2i.png</code></td></tr>
</tbody>
</table>

<p align="center">
<img src="assets/workflow_t2i.jpg" alt="左：t2i.png，由本地 SGLang 使用增强后的提示词生成。右：api_t2i.png，来自 MiniMax API。两者均展示了俯视视角的农场到餐桌盛宴，饱经风霜的木桌上摆放着面包、蔬菜和奶酪" width="100%"/>
</p>
<p align="center"><em>t2i.png 来自本地 SGLang（左），api_t2i.png 来自 MiniMax API（右），4736x3552（4:3 由 H3-Image-Context-IR 选定）</em></p>

##### 案例-Edit

使用 [`instruction.edit.txt`](https://huggingface.co/MiniMaxAI/MiniMax-H3-Image/blob/main/examples/instruction.edit.txt)，并将参考图像 [`reference1.png`](https://huggingface.co/MiniMaxAI/MiniMax-H3-Image/blob/main/examples/reference1.png) 作为 `<Picture 1>`。

| 阶段 | 请求 | 结果 |
| --- | --- | --- |
| 提示词增强：H3-Image-Context-IR（MiniMax API） | `python3 context_ir.py edit`（[脚本](https://huggingface.co/MiniMaxAI/MiniMax-H3-Image/blob/main/examples/context_ir.py)） | `revised_prompt.txt`、`revised_size.txt`；我们的运行输出：[`revised_prompt.edit.txt`](https://huggingface.co/MiniMaxAI/MiniMax-H3-Image/blob/main/examples/revised_prompt.edit.txt)、[`revised_size.edit.txt`](https://huggingface.co/MiniMaxAI/MiniMax-H3-Image/blob/main/examples/revised_size.edit.txt)（4096x4096） |
| MiniMax-H3-Image 生成：本地 SGLang | `python3 edit.py --prompt revised_prompt.txt --size $(cat revised_size.txt)`（[脚本](https://huggingface.co/MiniMaxAI/MiniMax-H3-Image/blob/main/examples/edit.py)） | `edit.png` |
| E2E API 参考：直接调用 MiniMax API 进行图像编辑 | `python3 api_generate.py edit`（[脚本](https://huggingface.co/MiniMaxAI/MiniMax-H3-Image/blob/main/examples/api_generate.py)） | `api_edit.png` |

<p align="center">
<img src="assets/workflow_edit.jpg" alt="左：reference1.png，参考图像，两位播客主持人，其中男士戴着耳机。中：edit.png，由本地 SGLang 使用增强后的提示词生成。右：api_edit.png，来自 MiniMax API。两个结果中耳机均被移除，两位主持人在 MONEY TALKS 标志上方碰拳" width="100%"/>
</p>
<p align="center"><em>参考图像 reference1.png（左）、来自本地 SGLang 的 edit.png（中）以及来自 MiniMax API 的 api_edit.png（右），4096x4096（1:1 由 H3-Image-Context-IR 选定）</em></p>

### 效果展示

文生图与图像编辑结果，以缩小尺寸展示。

<p align="center">
<img src="assets/showcase/photo.jpg" alt="三张写实照片：黄昏时分一位女士在满月下的屋顶晾晒白色床单、一位卷发年轻男子手持杯子的侧脸特写，以及在浅水中涉水的火烈鸟" width="100%"/>
</p>
<p align="center"><em>写实摄影</em></p>

<p align="center">
<img src="assets/showcase/surreal.jpg" alt="三张超现实杂志风格照片：理发师为坐在理发椅上的一朵云修剪、一个人在夜晚的草坪上切月亮、一位模特从一只巨大的梨中走出" width="100%"/>
</p>
<p align="center"><em>超现实杂志风格摄影</em></p>

<p align="center">
<img src="assets/showcase/scene.jpg" alt="四幅场景概念图：森林中的古代露天剧场遗迹（标题为 ENVIRONMENT CONCEPT: THE ANCIENT THEATER）、红色岩崖上的龙骑士、带有 ARRIVALS 标志的废弃火车站，以及冰海中冻结的沉船" width="100%"/>
</p>
<p align="center"><em>场景概念图</em></p>

<p align="center">
<img src="assets/showcase/char.jpg" alt="角色、生物与道具：头戴破旧头盔身披铠甲的士兵、森林中一只红鳍的龙形生物、火星上饱经风霜的宇航员头盔，以及冬季着装人物的三视图角色设定图" width="100%"/>
</p>
<p align="center"><em>角色、生物与道具</em></p>

<p align="center">
<img src="assets/showcase/art.jpg" alt="四幅绘画与插画：油画风格的荷塘鸳鸯、淡彩水彩的江南园林、带有兔子的塔罗牌 XVIII THE MOON，以及一幅中国工笔画，画中鹈鹕望着镜子并配有四个书法字" width="100%"/>
</p>
<p align="center"><em>绘画与插画风格</em></p>

<p align="center">
<img src="assets/showcase/text.jpg" alt="两块逻辑谜题板:一块是带有五个条件和推导答案的中文选人谜题,另一块是标题为 CONFIDENTIAL FILE MISSING 的英文谜题板,包含六名嫌疑人、对/错印章和一张验证表格" width="100%"/>
</p>
<p align="center"><em>带推理的文本渲染:中文与英文逻辑谜题,在画板上被正确解答</em></p>

<p align="center">
<img src="assets/showcase/edit_render.jpg" alt="左:未贴图的灰色 3D 渲染月球基地,包含居住舱模块、一辆月球车和一名宇航员。右:同一场景呈现为月球表面上的照片级写实电影剧照" width="100%"/>
</p>
<p align="center"><em>图像编辑,单参考图:未贴图的 3D 渲染(左)转换为月球研究基地的电影剧照(右)</em></p>

<p align="center">
<img src="assets/showcase/edit_map.jpg" alt="左:插画风格的游戏地图,包含河流、瀑布、桥梁、城堡、村庄、矿场和港口,南方湖泊上有一个红色箭头。右:从湖泊望向瀑布、吊桥、矿场和远处城堡的第一人称 3D 游戏视角,左上角以小地图形式显示地图" width="100%"/>
</p>
<p align="center"><em>图像编辑,单参考图:游戏地图(左)转换为从红色箭头位置出发的第一人称 3D 游戏视角,地图作为小地图显示(右)</em></p>

<p align="center">
<img src="assets/showcase/edit_multi.jpg" alt="上:十张参考图像,一间阳光照射的空房间和九件家具。下:空房间布置了全部九件家具,成为一间客厅" width="100%"/>
</p>
<p align="center"><em>图像编辑,十张参考图:空房间和九件家具(上)合成为一间客厅(下)</em></p>

### 许可证

- MiniMax-H3-Image 基于 [MiniMax-H3-Image 社区许可协议](https://huggingface.co/MiniMaxAI/MiniMax-H3-Image/blob/main/LICENSE) 发布。
- T2I PE 模型([MiniMax-H3-Image-PE](https://huggingface.co/MiniMaxAI/MiniMax-H3-Image-PE))是 MiniMax-H3-Image 的组成部分,因此同样受 [MiniMax-H3-Image 社区许可协议](https://huggingface.co/MiniMaxAI/MiniMax-H3-Image/blob/main/LICENSE) 约束。
- 许可证第四节所述的单独书面授权可通过[申请表](https://platform.minimax.io/console/license)获取。

### 联系我们

通过 [model@minimax.io](mailto:model@minimax.io) 联系我们。
