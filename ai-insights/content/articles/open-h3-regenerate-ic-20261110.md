---
title: "Open-H3 IC：基于 MiniMax H3 的视频高清再生成方案 让AI视频升到 4K 同时改善人脸、口型、文字和构图的一致性"
date: 2026-11-10T00:00:00.000Z
tags: ["产品发布", "MiniMax H3", "Open-H3 IC", "视频生成", "NVIDIA", "开源", "聚合"]
summary: "把低清 H3 草稿留在每一步的参考里，一边补高清细节，一边保住原来的表演与内容。"
---
> **原文链接**: [https://nvlabs.github.io/Sana/Open-H3-Regenerate-2K/#ic](https://nvlabs.github.io/Sana/Open-H3-Regenerate-2K/#ic)
> **来源**: nvlabs.github.io
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/open-h3-regenerate-ic-20261110/) · 2026/11/10
> **说明**: 本文由 AIHot汪 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

SoL-Engine · 研究博客

## 使用少步扩散进行高分辨率视频精炼

H3 基础模型以低分辨率生成视频草稿，而官方的 H3-Regenerate-2K API 会将其重生成至 2K 分辨率，但该模型并未开源。Open-H3-Regenerate-2K 是一个开源替代方案：它通过三步 H3 扩散过程，以全分辨率重绘草稿的细节。

[观看演示→](https://nvlabs.github.io/Sana/Open-H3-Regenerate-2K/#demo)[SoL-Engine↗](https://nvlabs.github.io/Sana/Sol-Engine/)[代码↗](https://github.com/NVlabs/Sana/tree/sol-engine/models/Open-H3-Regenerate-2K)[SoL-Refiner 代码↗](https://github.com/NVlabs/Sana/tree/sol-engine/models/sol-refiner)[MiniMax H3-Regenerate-2K↗](https://platform.minimax.io/docs/api-reference/video-generation-v2-regeneration)
[Sol-Engine视频推理](https://nvlabs.github.io/Sana/Sol-Engine/)

[视频/音频](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/film/teaser-v29-20261105.mp4)

**演示** 87 秒，带声音

3步扩散步骤，全分辨率
4K原生输出，从 768P 到 4K
5–15秒支持的精炼时长
5.0× 比官方 API 更快 · 单张 B200 显卡

### 摘要

Open-H3-Regenerate-2K 保持 H3 transformer 和视频 VAE 冻结，并添加一个精炼器 LoRA。该 LoRA 的训练方式与 [SoL-Refiner](https://nvlabs.github.io/Sana/Sol-Refiner/) 的 Stage I 类似，使用真实高分辨率片段及其降质副本进行训练。在推理时，草稿被编码一次；社区开发的 3D 卷积网络 [H3-Latent-Upscaler](https://github.com/LBH-123-AI/Comfyui_Minimax_h3_latent_Upscaler) 直接将潜在变量放大到目标网格，无需解码和重新编码；放大后的潜在变量被重新加噪至 σ = 0.909，并使用无分类器引导（classifier-free guidance off）以三个 Euler 步进行去噪（0.909 → 0.857 → 0.667 → 0），每一步仅需一次全分辨率的 transformer 调用。针对这少数几步，精炼器与 [LightX2V](https://github.com/ModelTC/LightX2V) 的 FL2VA Turbo 和 [LMS Sharp](https://huggingface.co/Alissonerdx/Minimax-H3-ComfyUI/blob/main/loras/minimax_h3_lms_v1.0_r64.safetensors) 适配器合并为单个 LoRA。

[官方 API](https://platform.minimax.io/docs/api-reference/video-generation-v2-regeneration) 仅接受未经修改的 H3 768P 输出并返回 2K 结果。Open-H3-Regenerate-2K 接受来自 H3 或其他视频模型生成的任意低分辨率草稿（如 384P、512P、576P 或 768P），并在一次通过中将其原生重生成至 768P、1080P、2K (2560 × 1440) 或 4K (3840 × 2160)，适用于 5 到 15 秒的片段。借助 [SoL-Engine](https://nvlabs.github.io/Sana/Sol-Engine/)（Sol-Attn 稀疏注意力、MXFP8 线性层和 CUDA 图）以及 [StreamRender-H3](https://nvlabs.github.io/Sana/Sol-Engine/StreamRender-H3/#3-2-fast-causal-h3-vae-self-improving-the-streaming-decoder-with-agent-loops) 的快速 H3 VAE 解码器，对于一段 5 秒的 2K 片段，潜在变量上采样、三步扩散和 VAE 解码在单张 B200 显卡上仅需 22.45 秒，而非 87.26 秒。

在 [RefinerBench-150](https://arxiv.org/abs/2609.37969) 上，当两个系统均设置为 2560 × 1440 时，我们的方法在 UniPercept 的三个轴以及 VBench 的美学质量、成像质量和主体一致性上得分均高于官方 API。在盲测用户研究中，我们的方法在 200 次评判中有 87% 被偏好。

### 为何需要开源的重生成模型？

H3 的生成过程分为两步。基础模型在低分辨率下确定内容和运动，此时采样成本较低。H3-Regenerate-2K 随后以 2K 分辨率重绘草稿，使面部、织物、毛发和树叶在放大后依然清晰。

只有第一步是开源的。H3-Regenerate-2K 是一个托管 API，未发布权重，因此基于开源 H3 基础模型构建的人无法在自己的 GPU 上运行它、对其进行适配，或超越该服务提供的功能。

Open-H3-Regenerate-2K 通过提供针对相同步骤的开源模型填补了这一空白：它从 H3 草稿开始，保留其内容和运动，并以全分辨率重生成细节。

![双手，输入](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/crops/B051-1-input.jpg)

输入

![双手，我们的](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/crops/B051-1-ours.jpg)

我们的

![豹子，输入](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/crops/B012-0-input.jpg)

输入

![豹子，我们的](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/crops/B012-0-ours.jpg)

我们的

同一帧，同一窗口。

### 从低分辨率草稿到 2K

Open-H3-Regenerate-2K 封装了一个冻结的 H3 transformer 和视频 VAE。它接收草稿及其提示词，并以目标分辨率返回相同的场景。

1. **编码。** H3 VAE 对草稿进行一次编码。
2. **放大。** [H3-Latent-Upscaler](https://github.com/LBH-123-AI/Comfyui_Minimax_h3_latent_Upscaler) 将潜在表示映射到目标网格。
3. **重生成。** 放大后的潜在表示经过三步的部分重加噪和去噪。
4. **解码。** H3 VAE 解码器将结果转换回帧；快速路径使用来自 [StreamRender-H3](https://nvlabs.github.io/Sana/Sol-Engine/StreamRender-H3/#3-2-fast-causal-h3-vae-self-improving-the-streaming-decoder-with-agent-loops) 的 24 层快速 H3 VAE 解码器。

[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/pipeline.svg](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/pipeline.svg)

2K 下的流水线。

仅放大不会增加细节。它将布局、颜色和运动携带到更大的网格上；三个扩散步骤在该尺寸下绘制表面。

#### 2.1 可视化结果

左侧为输入；中间为官方 H3-Regenerate-2K 输出和我们的输出，均为 2560 × 1440，我们的输出始终在下方；右侧为每个输出中放大镜下的区域。第一组从由 H3 基础模型制作的草稿开始，第二组从由其他视频模型（LTX-2 和 SANA-Video）制作的草稿开始，准备分辨率为 1024 × 576。

##### H3 输入

输入 · H3 基础 · 1344 × 768
H3-Regenerate-2K · 官方 API 我们的 · Open-H3-Regenerate-2K 加载中…

H3 官方 · 细节 H3 官方

我们的 · 细节 我们的

悬停在视频上以移动放大镜

[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C028-ours.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C028-ours.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C028-official.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C028-official.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C028-input.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C028-input.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C026-ours.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C026-ours.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C026-official.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C026-official.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C026-input.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C026-input.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C036-ours.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C036-ours.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C036-official.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C036-official.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C036-input.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C036-input.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C030-ours.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C030-ours.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C030-official.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C030-official.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C030-input.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C030-input.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C049-ours.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C049-ours.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C049-official.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C049-official.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C049-input.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C049-input.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C034-ours.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C034-ours.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C034-official.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C034-official.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C034-input.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C034-input.mp4)

H3 基础草稿。

##### 其他模型输入

输入 · LTX-2 草稿
H3-Regenerate-2K · 官方 API 我们 · Open-H3-Regenerate-2K 加载中…

H3 官方 · 详情 我们

将鼠标悬停在视频上以移动放大镜

[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C019-ours.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C019-ours.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C019-official.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C019-official.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C019-input.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C019-input.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C002-ours.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C002-ours.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C002-official.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C002-official.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C002-input.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C002-input.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C003-ours.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C003-ours.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C003-official.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C003-official.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C003-input.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C003-input.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C006-ours-u15.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C006-ours-u15.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C006-official-u15.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C006-official-u15.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C006-input-u15.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/us/C006-input-u15.mp4)

来自 LTX-2 和 SANA-Video 的草稿。

#### 2.2 从任意分辨率到 4K

Open-H3-Regenerate-2K 并不局限于单一的输入或输出尺寸。它可以接受任何低分辨率的草稿，例如 384P、512P 或 576P，并以原生方式在 768P、1080P、2K 或 4K 下进行重生成：潜在上采样器（latent upscaler）将草稿潜在表示放大到目标网格，随后在目标尺寸下运行三个扩散步骤。下方展示了一个调整大小至 4K 的舞蹈草稿，以及同一草稿在 4K 下原生重生成的结果。

任何低分辨率草稿输入，原生 768P 到 4K 输出。

输入 · 1344 × 768 调整大小至 4K我们的 · 原生 4K · 3840 × 2160加载中…

输入 · 细节输入

我们的 · 细节我们的

将鼠标悬停在视频上以移动放大镜

[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/media/R02-4k-d075.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/media/R02-4k-d075.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/media/R02-input-4k.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/media/R02-input-4k.mp4)

输入调整大小至 4K（顶部）和原生 4K（底部）。

#### 2.35 至 15 秒

5 到 15 秒的片段通过单次传递进行细化。这个 15 秒的片段，360 帧，在一次运行中以 2K 分辨率重新生成。

输入
我们的 · 2K · 15 秒加载中…

输入 · 细节输入

我们的 · 细节我们的

将鼠标悬停在视频上以移动放大镜

[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/media/long15-ours.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/media/long15-ours.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/media/long15-input.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/media/long15-input.mp4)

15 秒，单次传递。

### 关键技术

#### 3.1 训练

我们按照 [SoL-Refiner](https://nvlabs.github.io/Sana/Sol-Refiner/) 的 Stage I 训练细化器，即其高分辨率持续训练，使用相同的配方和数据，但用 H3 替代 SoL-Refiner 的原始基础模型。每个训练对由一个真实的、高质量的 1280 × 704 或 2560 × 1440 片段构建。目标是片段本身；条件是一个降级副本，通过抗锯齿双线性滤波器缩小 8× 到 64× 并重新调整大小。两者都由 H3 VAE 编码。

训练对构建。

H3 transformer 保持冻结状态，仅训练一个细化器 LoRA，使用从 σ = 0.91 向下的噪声级别的流匹配速度损失，这与三步推理开始的级别相同（第 3.3 节）。SoL-Refiner 的后期阶段，使用 ReFL 和 DMD 蒸馏到单步细化器的 RL 后训练，尚未使用。对于推理，细化器 LoRA 与社区蒸馏 LoRA 合并。

训练流程。

#### 3.2 潜在空间上采样

细化器在目标网格上工作，因此草稿首先必须达到输出尺寸。在像素层面完成，这是一个往返过程：使用 VAE 解码低分辨率潜在空间，调整每一帧的大小，然后在 2K 或 4K 下再次编码帧。在这些尺寸下，VAE 运行缓慢。[H3-Latent-Upscaler](https://github.com/LBH-123-AI/Comfyui_Minimax_h3_latent_Upscaler)，一个社区模型，通过直接使用学习到的 3D 卷积网络放大潜在空间来跳过往返过程。我们按发布版本使用它。在 2K 下，它将 36 × 64 的潜在网格映射到 90 × 160，每边 2.5 倍，保持 24 个通道和 37 个潜在帧不变；对于 4K，它应用两次，每次都在其训练范围内。

[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/latent-upscale.svg](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/latent-upscale.svg)

潜在网格和步骤计划。

#### 3.3 三步重新生成

为了速度，我们基于另一个社区工作：[LightX2V](https://github.com/ModelTC/LightX2V) 的 FL2VA Turbo，这是一个 LoRA，允许 H3 在四步内生成而不是数十步。我们按发布版本将其合并，以及 Alissonerdx 的社区 [LMS Sharp](https://huggingface.co/Alissonerdx/Minimax-H3-ComfyUI/blob/main/loras/minimax_h3_lms_v1.0_r64.safetensors) 适配器。四步运行从纯噪声开始，但我们的细化器 LoRA（秩 384，5,000 步 EMA）训练为从部分重新加噪的放大草稿开始，σ₀ = 0.909。草稿已经固定了布局和运动，因此三步就足够了：0.909 → 0.857 → 0.667 → 0。无分类器引导关闭，因此每一步都是目标分辨率下的单个 transformer 调用。

#### 3.4 推理优化

从 1344 × 768 H3 潜在表示开始，将潜在表示放大至 2560 × 1440，三个细化步骤和 VAE 解码在单张 B200 GPU 上，不使用 [SoL-Engine](https://nvlabs.github.io/Sana/Sol-Engine/) 和 [StreamRender-H3](https://nvlabs.github.io/Sana/Sol-Engine/StreamRender-H3/#3-2-fast-causal-h3-vae-self-improving-the-streaming-decoder-with-agent-loops) 的快速 H3 VAE 解码器时耗时 87.26 秒，使用上述技术后耗时 22.45 秒，速度提升 3.9 倍。

每秒视频耗时（5 秒视频）：潜在表示放大 + 细化 + VAE 解码
| 优化措施 | 耗时 | 加速比 |
| :--- | :--- | :--- |
| Open-H3-Regenerate-2K dense attention · BF16 · 发布版 VAE | 87.26 s | 1.0× |
| + Lossless kernels | | |
| strided cuDNN + torch.compile | 81.38 s | 1.1× |
| + Sparse attention Sol-Attn | 41.38 s | 2.1× |
| + MXFP8 linear layers FP8 GEMM, 每阶段重新量化 | 38.12 s | 2.3× |
| + Fused SwiGLU → MXFP8 一次性激活量化 | 37.85 s | 2.3× |
| + CUDA graphs 每个细化步骤一个图 | 35.87 s | 2.4× |
| + Fast H3 VAE decoder 来自 StreamRender-H3 · 24 层，非因果 | 22.45 s | 3.9× |

0 25 50 75 100 s

累计加速比。

稀疏注意力节省最多：Sol-Attn 节省了 39.99 秒。快速 H3 VAE 解码器是从发布的 36 层解码器剪枝并蒸馏得到的 24 层版本，将解码时间从 15.0 秒缩短至 1.6 秒。其余部分由无损内核、带有融合 SwiGLU 量化器的 MXFP8 线性层以及每步 CUDA 图贡献。

各阶段耗时
| 阶段 | Open-H3-Regenerate-2K | + SoL-Engine |
| :--- | :--- | :--- |
| Refine 3 steps · 2560 × 1440 | 71.27 s | 19.75 s |
| VAE decode 121 frames · 2560 × 1440 | 14.99 s | 1.58 s |
| Latent upscale 768P → 2560 × 1440 | 1.01 s | 1.05 s |

0 20 40 60 80 s

各阶段耗时。

在一张 GPU 上进行预热推理，取三次运行的中位数。生成 768P 草稿、模型加载、文本编码和 MP4 写入未包含在内。DiT 模块逐个测量并缩放至测量总值；VAE 行直接测量。

### 实验

我们使用 [RefinerBench-150](https://arxiv.org/abs/2609.37969) 上的两个自动指标以及一项用户研究，与官方 H3-Regenerate-2K API 进行对比。RefinerBench-150 来自 SoL-Refiner 基准测试，包含 150 个视频，涵盖日常场景、体育和舞蹈、动物、车辆、风景、肖像以及快速相机运动。两个系统接收相同的输入，并输出 2560 × 1440 分辨率的视频。

#### 4.1 VBench

VBench 在 0–1 的尺度上对六个维度进行评分。主体和背景一致性检查身份和场景随时间是否保持稳定，运动平滑度和动态度描述运动特征，美学质量和成像质量评判每一帧的外观。遵循 SoL-Refiner 的做法，平均值是这六个维度的未加权均值，而非排行榜总分。

| | H3-Regenerate-2K (official) | Ours |
| :--- | :--- | :--- |
| Average | 0.802 | 0.814 |
| Subject consistency | 0.918 | 0.924 |
| Background consistency | 0.950 | 0.950 |
| Motion smoothness | 0.984 | 0.981 |
| Dynamic degree | 0.765 | 0.752 |
| Aesthetic quality | 0.569 | 0.604 |
| Imaging quality | 0.629 | 0.676 |

RefinerBench-150 上的 VBench 评分。

我们的系统在美学质量、成像质量和主体一致性方面得分更高。官方 API 在运动平滑度和动态度方面略胜一筹，背景一致性持平。

#### 4.2 UniPercept

UniPercept 从三个维度对感知质量进行 0 到 100 的评分：美学 (IAA)、技术图像质量 (IQA) 以及结构和纹理 (ISTA)。平均值为这三个维度的均值。

| | H3-Regenerate-2K (official) | Ours |
| :--- | :--- | :--- |
| Average | 53.4 | 60.0 |
| Aesthetics (IAA) | 59.1 | 67.3 |
| Quality (IQA) | 59.5 | 67.8 |
| Structure & texture (ISTA) | 41.6 | 44.8 |

RefinerBench-150 上的 UniPercept 评分。

我们的系统在三个维度上均得分更高，美学和图像质量高出约八分，结构和纹理高出三分。

#### 4.3 用户研究

该盲测成对研究使用 50 个案例：25 个 RefinerBench-150 视频和 25 个在线共享的提示词，主要来自 [X](https://x.com/)。每次试验将输入作为参考，并以随机顺序展示两个 2560 × 1440 的结果 A 和 B。参与者选择看起来更好的一个，权衡清晰度、细节、自然度、伪影和时间稳定性。每个会话涵盖 10 个案例；20 个完成的会话共产生 200 次判断。

偏好结果，200 次判断。

SoL-Engine · 研究博客 · IC 版本

## 通过上下文学习实现一致的高分辨率视频细化

Open-H3-Regenerate-2K 通过三个步骤对重加噪的草稿进行重绘；它能增加细节，但在面部、嘴唇和文字方面可能会发生漂移。IC 版本则将草稿保留在 Transformer 的上下文中：草稿保持清晰，高分辨率视频是从其旁边的噪声中生成的，并且每一步都会关注它。面部、口型同步、文本和布局遵循草稿，而细节则在 2K 或 4K 分辨率下绘制。

[观看演示→](https://nvlabs.github.io/Sana/Open-H3-Regenerate-2K/#ic-demo)[训练↓](https://nvlabs.github.io/Sana/Open-H3-Regenerate-2K/#ic-training)[SoL-Engine↗](https://nvlabs.github.io/Sana/Sol-Engine/)[代码↗](https://github.com/NVlabs/Sana/tree/sol-engine/models/Open-H3-Regenerate-2K/IC)[SoL-Refiner 代码↗](https://github.com/NVlabs/Sana/tree/sol-engine/models/sol-refiner)[MiniMax H3-Regenerate-2K↗](https://platform.minimax.io/docs/api-reference/video-generation-v2-regeneration)
[Sol-Engine 视频推理](https://nvlabs.github.io/Sana/Sol-Engine/)

[视频/音频](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/ic-demo-d8.mp4)

**Open-H3-Regenerate-2K-IC** 94 秒，带声音

### 训练

H3 提供了一个参考到视频的 Transformer，Ref2VA，它将参考视频作为额外 token 读取，与生成的视频处于同一序列中。我们保持 Ref2VA 冻结，并在其上训练 LoRA。在每一对训练样本中，片段的低分辨率副本作为参考，片段本身作为目标：参考潜在变量保持干净，目标潜在变量沿流匹配路径进行加噪，损失仅针对目标 token 计算。

每对训练样本从 768P 到 4K 的真实片段开始。将其缩小得到类似草稿的低分辨率副本，并且某些副本进一步模糊，以便模型也能看到比清晰缩放更柔和的草稿。两者都在各自分辨率下使用 H3 VAE 进行编码。在序列中，副本的潜在变量位于目标之前，目标潜在变量与高斯噪声混合，噪声水平 σ 在整个路径上抽取，从纯噪声 (σ = 1) 到 0，因此 LoRA 学习从草稿旁边的噪声生成高分辨率片段，而不是修饰其重加噪副本。训练中不使用 HyperFlow 和 LMS Sharp。

训练。LQ 副本的潜在变量位于 Ref2VA 序列中嘈杂的 HQ 目标之前；σ 从纯噪声到干净任意抽取，损失仅针对目标 token 计算。为了说明，噪声以像素空间显示。

### 推理

在推理阶段，768P 的 H3 草稿取代了低分辨率副本。它在自己的分辨率下编码一次，并作为干净的参考行保留在目标之前，其帧和原始 H3 提示词进入 Qwen3-VL 上下文。8 步 [HyperFlow](https://huggingface.co/videorebirth/hyperflow) LoRA 和强度为 1.0 的 [LMS Sharp](https://huggingface.co/Alissonerdx/Minimax-H3-ComfyUI/blob/main/loras/minimax_h3_lms_v1.0_r64.safetensors) 与 IC LoRA 一起合并到 Transformer 中；使用 CFG 1，每一步就是一个 Transformer 调用。采样器仅在 2K 或 4K 潜在变量的起始位置上有所不同。

- **从噪声开始 (`hf8`)。** 目标从纯噪声开始，运行所有八个 HyperFlow 步骤，σ 从 1 → 0。
- **从潜在变量超分器开始 (`up3`, `up4`)。** [潜在变量超分器](https://github.com/LBH-123-AI/Comfyui_Minimax_h3_latent_Upscaler) 是一个 3D 卷积网络，它将草稿潜在变量直接放大到 2K 或 4K 潜在变量网格，无需解码。该潜在变量与噪声混合至 σ 0.835 (`up3`) 或 0.923 (`up4`)，并使用相同 HyperFlow 网格的最后三个或四个步骤完成。超分后的潜在变量设置布局和颜色，剩余步骤绘制细节，草稿在每一步都保持在上下文中。`up3` 是默认设置：每个片段三个 Transformer 调用。

2K 结果使用快速 H3 VAE 解码，4K 使用 H3 VAE 解码；草稿的音轨原样复制。

推理。草稿在每一步都保持在上下文中；`hf8` 从纯噪声开始 2K 潜在变量，`up3` 和 `up4` 从由潜在变量超分器放大的草稿开始。裁剪图显示了来自 768P 草稿和 2K 输出的相同窗口。

在 8 步 HyperFlow 网格上，每个采样器的步数。`up3` 为默认值。

### 与 Open-H3-Regenerate-2K 对比

由 H3 基础模型在 1344 × 768 分辨率下生成的草稿，与之前的开源模型及 IC 版本在 2560 × 1440 分辨率下同步播放；下方行放大了来自各模型的同一窗口。之前的模型绘制了更多纹理，但使眼睛、皱纹和嘴型偏离了草稿；而 IC 版本则保留了这些特征。放大镜跟随指针移动。

输入 · H3 基础 · 768POpen-H3-Regenerate-2KIC 版本 · 2560 × 1440加载中…

输入 · 细节

Open-H3-Regenerate-2K · 细节Open-H3-Regen-2K

IC 版本 · 细节IC 版本

将鼠标悬停在视频上以移动放大镜

[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/U06-input.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/U06-input.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/v2/U06-regen.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/v2/U06-regen.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/v2/U06-ic.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/v2/U06-ic.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/v2/F1-03-input.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/v2/F1-03-input.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/v2/F1-03-regen.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/v2/F1-03-regen.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/v2/F1-03-ic.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/v2/F1-03-ic.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/T05-input.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/T05-input.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/T05-regen.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/T05-regen.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/T05-ic2k.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/T05-ic2k.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/v2/F1-11-input.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/v2/F1-11-input.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/v2/F1-11-regen.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/v2/F1-11-regen.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/v2/F1-11-ic.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/v2/F1-11-ic.mp4)

输入、H3-Regenerate-2K 和 IC 版本使用相同的草稿。

### 与 H3-Regenerate-2K 对比

通过官方 H3-Regenerate-2K API 和 IC 版本处理相同的草稿，分辨率均为 2560 × 1440。在停车场场景中，官方输出将标志变成了无法辨认的标记，而 IC 版本保留了“PRIVATE CAR PARK”字样；在翠鸟和玻璃蘑菇场景中，IC 版本绘制的水雾和苔藓更加清晰。

输入 · H3 base · 768P H3-Regenerate-2K · 官方 API IC 版本 · 2560 × 1440 加载中…

输入 · 详情

H3 官方 · 详情 H3 官方

IC 版本 · 详情 IC 版本

将鼠标悬停在视频上以移动放大镜

[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/v2/PARK768s-input.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/v2/PARK768s-input.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/v2/PARK768s-official.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/v2/PARK768s-official.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/v2/PARK768s-ic.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/v2/PARK768s-ic.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/C036-input.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/C036-input.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/C036-official.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/C036-official.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/v2/C036-ic.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/v2/C036-ic.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/C028-input.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/C028-input.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/C028-official.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/C028-official.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/v2/C028-ic.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/v2/C028-ic.mp4)

输入、官方 H3-Regenerate-2K API 和 IC 版本，所有输出分辨率均为 2560 × 1440。

### 更多 4K 结果

768P 草稿原生再生成至 4096 × 2304。

输入 · H3 base · 768P IC 版本 · 4096 × 2304 加载中…

输入 · 详情

IC 版本 4K · 详情 IC 版本 4K

将鼠标悬停在视频上以移动放大镜

[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/v2/F1-02-input.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/v2/F1-02-input.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/v2/F1-02-ic4k.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/v2/F1-02-ic4k.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/U12-input.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/U12-input.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/U12-ic4k.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/U12-ic4k.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/v2/F1-07-input.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/v2/F1-07-input.mp4)[https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/v2/F1-07-ic4k.mp4](https://huggingface.co/datasets/Efficient-Large-Model/Sana-assets/resolve/main/Open-H3-Regenerate-2K/assets/sol-engine/ic/v2/F1-07-ic4k.mp4)

输入为 768P，IC 版本分辨率为 4096 × 2304。

### 从 384P 到 768P

IC 版本同样从较小的草稿开始。以下每个视频均由 H3 在 672 × 384 分辨率下生成，并在八个 HyperFlow 步骤中重新生成为 1344 × 768。

输入 · H3 base · 384P IC 版本 · 768P

拖动视频进行比较

手柄左侧：放大至相同尺寸的 H3 草稿（672 × 384）。右侧：1344 × 768 的 IC 版本。

致谢

### 鸣谢

作者

Sensen Gao*Haozhe Liu*Yitong LiHaopeng LiTian YeJia-Wang BianSong HanEnze Xie

* 同等贡献

- [HyperFlow](https://huggingface.co/videorebirth/hyperflow)：Open-H3-Regenerate-2K-IC 使用的 8 步蒸馏 LoRA。
- [SoL-H3](https://nvlabs.github.io/Sana/Sol-Engine/Sol-H3/)：光速 H3 推理。
- [SoL-Engine](https://nvlabs.github.io/Sana/Sol-Engine/)：推理引擎及第 3.4 节中的加速技术。
- [Sol-Attn](https://nvlabs.github.io/Sana/Sol-Attn/)：SoL-Engine 中的稀疏注意力机制，第 3.4 节中最大的加速来源。
- [StreamRender-H3](https://nvlabs.github.io/Sana/Sol-Engine/StreamRender-H3/#3-2-fast-causal-h3-vae-self-improving-the-streaming-decoder-with-agent-loops)：用于 VAE 解码的快速 H3 VAE 解码器（其非因果变体）。
- [MiniMax H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)：基础模型和 VAE；官方 H3-Regenerate-2K API 作为基线。
- [H3-Latent-Upscaler](https://github.com/LBH-123-AI/Comfyui_Minimax_h3_latent_Upscaler)：潜在空间超分工具。
- [SoL-Refiner](https://nvlabs.github.io/Sana/Sol-Refiner/)：优化配方及 VBench 协议。
- [LightX2V](https://github.com/ModelTC/LightX2V)：FL2VA Turbo 适配器。
- [LMS Sharp](https://huggingface.co/Alissonerdx/Minimax-H3-ComfyUI/blob/main/loras/minimax_h3_lms_v1.0_r64.safetensors)：Alissonerdx 提供的锐化 LoRA，已合并至我们的 LoRA 中。
- [VBench](https://arxiv.org/abs/2311.17982)：视频质量指标，结合 UniPercept。

如何引用

### 引用

如果 Open-H3-Regenerate-2K 对您的工作有所帮助，请同时引用 [SoL-Refiner](https://arxiv.org/abs/2609.37969) 论文和本博客文章。

BibTeX · SoL-Refiner + 本博客

```
@misc{liu2026solrefiner,
  title         = {{SoL-Refiner}: Speed-of-Light One-Step Refinement for High-Resolution Video},
  author        = {Haozhe Liu and Tian Ye and Shuchen Xue and Sensen Gao and
                   Yitong Li and Junsong Chen and Haopeng Li and Jincheng Yu and
                   Duomin Wang and Ruihua Zhang and Lei Zhu and Jia-Wang Bian and
                   Song Han and Enze Xie},
  year          = {2026},
  eprint        = {2609.37969},
  archivePrefix = {arXiv},
  primaryClass  = {cs.CV},
  url           = {https://arxiv.org/abs/2609.37969}
}

@misc{gao2026openh3regenerate2k,
  title        = {Open-H3-Regenerate-2K: High-Resolution Video Refinement with Few-Step Diffusion},
  author       = {Sensen Gao and Haozhe Liu and Yitong Li and Haopeng Li and Tian Ye and Jia-Wang Bian and Song Han and Enze Xie},
  year         = {2026},
  howpublished = {\url{https://nvlabs.github.io/Sana/Open-H3-Regenerate-2K/}},
  note         = {Project page}
}
```
