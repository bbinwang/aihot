---
title: "MiniMax H3-Image 量化版：实现“平民级显卡跑顶级画质” 最低8G 显卡就能跑"
date: 2026-11-14T00:00:00.000Z
tags: ["AI 实操", "MiniMax", "H3-Image", "ComfyUI", "GGUF", "本地部署"]
summary: "MiniMax 开源的 331 亿参数生图模型 H3-Image，官方版光主模型就有 66 GB。社区把主模型压成 7 到 14 GB 的 GGUF 文件，装了插件的 ComfyUI 直接能读。这篇帮你算清该下哪档、一共要下多少、参数怎么设"
---
> **原文链接**: [https://huggingface.co/Abiray/MiniMax-H3-Image-GGUF](https://huggingface.co/Abiray/MiniMax-H3-Image-GGUF)
> **来源**: huggingface.co
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/minimax-h3-image-gguf/) · 2026/11/14
> **说明**: 本文由 AIHot汪 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

## MiniMax-H3-Image (Pruned DiT) — GGUF 量化版本
- 作者: Abiray
- 来源: https://huggingface.co/Abiray/MiniMax-H3-Image-GGUF
---

---
license: other
license_name: minimax-h3-image-community-license-agreement
license_link: https://huggingface.co/MiniMaxAI/MiniMax-H3-Image/blob/main/LICENSE
language:
- en
tags:
- text-to-image
- image-to-image
- image-editing
- gguf
- minimax
- minimax-h3
- minimax-h3-image
- comfyui
- dit
- quantized
base_model:
- MiniMaxAI/MiniMax-H3-Image
pipeline_tag: text-to-image
widget:
  - text: "Showcase Image 1"
    output:
      url: images/minimax_h3_image_t2i_00003_.png
  - text: "Showcase Image 2"
    output:
      url: images/minimax_h3_image_t2i_00004_.png
  - text: "Showcase Image 3"
    output:
      url: images/minimax_h3_image_t2i_00005_.png
  - text: "Showcase Image 4"
    output:
      url: images/minimax_h3_image_t2i_00006_.png
  - text: "Showcase Image 5"
    output:
      url: images/minimax_h3_image_t2i_00007_.png
  - text: "Showcase Image 6"
    output:
      url: images/minimax_h3_image_t2i_00008_.png
---

## MiniMax-H3-Image (Pruned DiT) — GGUF 量化版本

这是 **[MiniMax-H3-Image](https://huggingface.co/MiniMaxAI/MiniMax-H3-Image)** 的量化 **GGUF** 权重，直接由 **[Comfy-Org](https://huggingface.co/Comfy-Org/MiniMax-H3-Image)** (`minimax_h3_image_pruned_bf16.safetensors`) 提供的结构剪枝 BF16 主检查点转换而来。

MiniMax-H3-Image 是一款最先进的 **331 亿参数单流扩散 Transformer (DiT)**，旨在仅需 **6 步蒸馏采样** 的情况下，实现超高分辨率（最高 1600 万像素 / 4096 × 4096）的文生图和多参考图像编辑。

本仓库中的所有 GGUF 文件均严格保留了敏感层（24 通道输入 patchifier `video_patch_proj`、6 步 PDD 输出头 `final_layer` 以及低秩 AdaLN 调制基 `adaln_basis` / `adaln_t_table`）为 **未量化的 FP32** 格式，以消除量化噪声和网格伪影。

> **✅ 更新 — 原生支持 ComfyUI-GGUF：** 本仓库中的所有 GGUF 文件现在都包含嵌入的 `config`（6 步调度 `pdd_sigmas`）头元数据，并可在原版 **ComfyUI-GGUF (`Unet Loader (GGUF)`)** 中开箱即用，无需任何自定义脚本或补丁！*（注意：[`minimax_h3_image_gguf_fix.py`](./minimax_h3_image_gguf_fix.py) 仍保留在仓库中，仅作为 ComfyUI-GGUF 旧版本用户的可选回退方案。）*
---

### 模型文件与量化概览

| 文件名 | 大小 | 量化类型 | 推荐硬件 / 显存 | 质量 / 用途 |
| :--- | :---: | :---: | :---: | :--- |
| **`MiniMax-H3-Image-Pruned-Q2_K.gguf`** | **6.88 GB** | `Q2_K` | 8 GB – 10 GB 显存 | 最大内存节省。轻松适配消费级笔记本及入门级 GPU。 |
| **`MiniMax-H3-Image-Pruned-Q3_K_M.gguf`** | **8.91 GB** | `Q3_K_M` | 12 GB 显存 | 高效率，量化损失显著低于 2 位量化。 |
| **`MiniMax-H3-Image-Pruned-Q4_K_S.gguf`** | **11.60 GB** | `Q4_K_S` | 12 GB – 16 GB 显存 | 快速的 4 位小变体。平衡的占用空间。 |
| **`MiniMax-H3-Image-Pruned-Q4_K_M.gguf`** | **11.60 GB** | `Q4_K_M` | 16 GB 显存 | **推荐的最佳平衡点。** 标准 GPU 上近乎无损的视觉质量。 |
| **`MiniMax-H3-Image-Pruned-Q5_K_M.gguf`** | **14.10 GB** | `Q5_K_M` | 16 GB – 24 GB 显存 | 最大保真度。与完整 BF16 难以区分。 |

---

### 🖼️ 样本生成 (Q4_K_M)
<Gallery />

### 必需配套文件

MiniMax-H3-Image 需要一个专用的 **24 通道图像 VAE** 和 **Qwen3-VL-32B** 文本编码器（读取第 50 层隐藏状态）。

#### 1. 图像 VAE (24 通道)
* **官方 / Comfy-Org FP16 VAE:** [`minimax_h3_image_vae_fp16.safetensors`](https://huggingface.co/Comfy-Org/MiniMax-H3-Image/tree/main/vae)  
  *(请将其放置在 `ComfyUI/models/vae/` 目录下)*

> **注意：** 图像 VAE 使用 24 个潜在通道和 2D ViT 解码器。**不要**使用标准的 4 通道 SD/Flux VAE 或早期 H3 版本中的 16 通道视频 VAE。

#### 2. 文本编码器 (Qwen3-VL-32B)
你可以选择预量化的 safetensors 格式或独立的 GGUF 文本编码器：

* **GGUF 文本编码器 (由 Abiray 提供):**
  * **Q4_K_M (14.6 GB):** [`qwen3vl_32b_minimax_h3-Q4_K_M.gguf`](https://huggingface.co/Abiray/MiniMax-H3-GGUF/blob/main/text_encoders/qwen3vl_32b_minimax_h3-Q4_K_M.gguf)
  * **Q3_K_M (12 GB):** [`Qwen3vl_32b_h3-Q3_K_M.gguf`](https://huggingface.co/Abiray/Qwen3-VL-32B-Instruct-GGUF/blob/main/Qwen3vl_32b_h3-Q3_K_M.gguf)
* **官方 / Comfy-Org 文本编码器:**
  * **NVFP4 / AWQ / BF16:** 可在 [Comfy-Org 文本编码器目录](https://huggingface.co/Comfy-Org/MiniMax-H3-Image/tree/main/text_encoders) 中找到 (`qwen3vl_32b_minimax_h3_nvfp4_awq.safetensors` 或 `qwen3vl_32b_minimax_h3_int8_convrot.safetensors`)

*(请将其放置在 `ComfyUI/models/clip/` 或 `ComfyUI/models/text_encoders/` 目录下)*


---
#### 📋 示例工作流

从此仓库直接下载并导入即用型 ComfyUI 工作流：
👉 [image_minimax_h3_image_t2i_gguf.json](https://huggingface.co/Abiray/MiniMax-H3-Image-GGUF/blob/main/image_minimax_h3_image_t2i_gguf.json)

---
### 在 ComfyUI 中的安装与文件路径

请确保已更新至 **ComfyUI v0.45.0+** 并安装了 **[ComfyUI-GGUF](https://github.com/city96/ComfyUI-GGUF)**。

```text
ComfyUI/
├── models/
│   ├── unet/ (或 diffusion_models/)
│   │   └── MiniMax-H3-Image-Pruned-Q4_K_M.gguf
│   ├── vae/
│   │   └── minimax_h3_image_vae_fp16.safetensors
│   └── clip/ (或 text_encoders/)
│       ├── qwen3vl_32b_minimax_h3-Q4_K_M.gguf
│       └── (或 qwen3vl_32b_minimax_h3_nvfp4_awq.safetensors)
```

---

### 推荐生成参数

MiniMax-H3-Image 是一个经过蒸馏的 **分段解耦扩散 (Piecewise Decoupled Diffusion, PDD)** 模型，专为单流 6 步推理进行训练：

- **采样器 (Sampler):** `euler`
- **调度器 (Scheduler):** `simple` 或 `sgm_uniform`
- **采样步数 (Sampling Steps):** `6` (融合后的 PDD 头针对恰好 6 步进行了校准)
- **CFG 比例 (CFG Scale):** `1.0` (**无需 CFG**；请勿使用高 CFG 或负提示词缩放)
- **降噪强度 (Denoise):** `1.0`
- **潜在维度 (Latent Dimensions):** 原生 24 通道 (2 × 2 分块，每个 token 对应 32 × 32 像素)
- **分辨率:** 1024 × 1024 (100 万像素), 2048 × 2048 (400 万像素), 或最高 4096 × 4096 (1600 万像素)

---

### 提示词指南

MiniMax-H3-Image 对**密集、描述性的英文描述**响应最佳，这些描述应明确指定空间布局、材质属性、光照条件和排版设计。

#### 示例提示词 (包装设计与排版)
```text
The image is a cheerful toy-packaging poster built around a handmade plush fox floating above a summer meadow, drawn in a warm, fairly saturated palette: clear sky blue deepening toward the top, rich burnt-sienna and terracotta plush for the fox, warm cream, fresh sage green in the meadow, cornflower and cherry-red accents on the small props, and buttercup yellow in the lettering, with bright afternoon sun from the upper left and crisp short shadows. The fox is the hero, sewn from long-staple mohair-type plush in warm burnt sienna and hand-stuffed so its silhouette is slightly lumpy; the pile is long and irregular, single fibres catching the light along its outline as a bright hairy halo against the sky, with cream muzzle and sock paws. Across the top of the frame the word "MINIMAX" is inflatable and rounded in thick felted wool; directly beneath, smaller and centred, "H3" sits between two small dots. Along the bottom, a heavy bold sans-serif logotype reads "TEXT TO IMAGE" in saturated cornflower blue. All lettering is English only, with no Chinese characters.
```

#### 示例提示词 (写实主义微距静物)
```text
A raw, high-resolution 35mm documentary portrait of an artisan ceramicist in her sunlit studio loft, shot on a Leica M11 with a 50mm f/1.4 lens. Bathed in cool morning daylight streaming from a tall steel-framed window on the left. Authentic, unretouched skin texture with visible pores, fine smile lines, and a faint dusting of dry white clay powder across her cheekbone. Her hands rest on a weathered pine workbench scattered with trimming tools and a half-empty stoneware coffee mug. Organic shallow depth of field, natural color grading, no plastic skin smoothing or HDR halos.
```
---

### 许可证与使用

本模型受 **[MiniMax-H3-Image 社区许可证协议](https://huggingface.co/MiniMaxAI/MiniMax-H3-Image/blob/main/LICENSE)** 约束。

* 在《社区许可证协议》条款范围内，可免费用于研究、个人用途及商业创作。
* 如果您的月/年收入超过许可证第四条规定的阈值，或您提供托管 API 服务，请参阅 [platform.minimax.io/license](https://platform.minimax.io/license) 中的商业许可条款。

---

### 致谢

* **[MiniMax AI](https://huggingface.co/MiniMaxAI)** 开发并发布了 MiniMax-H3-Image 的权重。
* **[city96](https://github.com/city96/ComfyUI-GGUF)** 提供了 `ComfyUI-GGUF` 加载器套件。
* 量化由 **[Abiray](https://huggingface.co/Abiray)** 完成。
