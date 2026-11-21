---
title: "美团开源数字人模型 LongCat-Video-Avatar 1.6：一张照片加一段语音，连说 10 分钟不走样"
date: 2026-11-16T00:00:00.000Z
tags: ["产品发布", "美团", "LongCat", "数字人", "视频生成", "开源模型"]
summary: "美团 LongCat 团队开源了数字人视频模型的 1.6 版：嘴型更放松，长视频里嘴唇不再越说越红，能连续生成 10 分钟以上。它在美团自己组织的人工对比评测里排第二，仅次于字节的 OmniHuman-2.0。"
---
> **原文链接**: [https://huggingface.co/meituan-longcat/LongCat-Video-Avatar-1.6](https://huggingface.co/meituan-longcat/LongCat-Video-Avatar-1.6)
> **来源**: huggingface.co
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/longcat-video-avatar-1-6/) · 2026/11/16
> **说明**: 本文由 AIHot汪 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

## LongCat-Video-Avatar-1.6
- 作者: meituan-longcat
- 来源: https://huggingface.co/meituan-longcat/LongCat-Video-Avatar-1.6
---

---
base_model:
  - meituan-longcat/LongCat-Video
license: mit
language:
- en
- zh
library_name: longcat-video-avatar-1.6
tags:
- audio-text-to-video
- audio-image-text-to-video
- audio-driven-video-continuation
- diffusers
- transformers
- avatar
- video-generation
---
## LongCat-Video-Avatar-1.6

<div align="center">
  <img src="assets/logo.png" width="50%" alt="LongCat-Video" />
</div>
<hr>

<div align="center" style="line-height: 1;">
  <a href='https://meigen-ai.github.io/LongCat-Video-Avatar-1.6-Page/'><img src='https://img.shields.io/badge/Project-Page-green'></a>
  <a href='https://github.com/meituan-longcat/LongCat-Video/blob/main/assets/LongCat-Video-Avatar-1.6-Tech-Report.pdf'><img src='https://img.shields.io/badge/Technique-Report-red'></a>
  <a href='https://huggingface.co/meituan-longcat/LongCat-Video-Avatar-1.6'><img src='https://img.shields.io/badge/%F0%9F%A4%97%20Hugging%20Face-Model-blue'></a>
  <a href='https://www.modelscope.cn/models/meituan-longcat/LongCat-Video-Avatar-1.6'><img src='https://img.shields.io/badge/ModelScope-Model-purple'></a>
</div>

<div align="center" style="line-height: 1;">
  <a href='https://github.com/meituan-longcat/LongCat-Flash-Chat/blob/main/figures/wechat_official_accounts.png'><img src='https://img.shields.io/badge/WeChat-LongCat-brightgreen?logo=wechat&logoColor=white'></a>  
  <a href='https://x.com/Meituan_LongCat'><img src='https://img.shields.io/badge/Twitter-LongCat-white?logo=x&logoColor=white'></a>
</div>

<div align="center" style="line-height: 1;">
  <a href='LICENSE'><img src='https://img.shields.io/badge/License-MIT-f5de53?&color=f5de53'></a>
</div>

### 🚀 模型介绍
我们很高兴地宣布发布 LongCat-Video-Avatar 1.6，这是我们对开源音频驱动人类视频生成框架的最新升级。在 LongCat-Video-Avatar 1.5 的基础上，1.6 版本提升了表达的自然度、唇音同步性、面部与身体动作的协调性，以及在长视频生成过程中的视觉一致性。此外，它还引入了全面的推理优化，以实现更快、更高效的部署。

#### 核心特性
- 🌟 **更自然稳定的唇部动画**：减少了夸张或紧绷的口部动作、过于红润的唇色以及口部区域的时间不稳定性。
- 🌟 **稳定的长视频生成**：缓解了自回归视频延续过程中的误差累积问题，支持生成超过 10 分钟的视频，同时保持视觉质量、身份一致性和时间连贯性。
- 🌟 **更快的端到端推理**：通过端到端管道和模型执行优化加速视频生成，从而实现更高效地部署和服务。

更多详情，请参阅完整的 [***LongCat-Video-Avatar-1.6 技术报告***](https://github.com/meituan-longcat/LongCat-Video/blob/main/assets/LongCat-Video-Avatar-1.6-Tech-Report.pdf)。

### 🌀 预览画廊

LongCat-Video-Avatar 1.6 在生成超过 10 分钟的视频时，能够提供更自然的唇部动作和富有表现力的运动，同时保持视觉质量和时间一致性。

<table align="center" width="100%" cellspacing="8" cellpadding="0">
  <tr>
    <td width="50%">
      <video src="https://www.modelscope.cn/models/meituan-longcat/LongCat-Video-Avatar-1.6/resolve/master/assets/1.mp4" width="100%" controls preload="metadata" playsinline></video>
    </td>
    <td width="50%">
      <video src="https://www.modelscope.cn/models/meituan-longcat/LongCat-Video-Avatar-1.6/resolve/master/assets/2.mp4" width="100%" controls preload="metadata" playsinline></video>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <video src="https://www.modelscope.cn/models/meituan-longcat/LongCat-Video-Avatar-1.6/resolve/master/assets/3.mp4" width="100%" controls preload="metadata" playsinline></video>
    </td>
    <td width="50%">
      <video src="https://www.modelscope.cn/models/meituan-longcat/LongCat-Video-Avatar-1.6/resolve/master/assets/4.mp4" width="100%" controls preload="metadata" playsinline></video>
    </td>
  </tr>
  <tr>
    <td colspan="2" width="100%">
      <video src="https://www.modelscope.cn/models/meituan-longcat/LongCat-Video-Avatar-1.6/resolve/master/assets/5.mp4" width="100%" controls preload="metadata" playsinline></video>
    </td>
  </tr>
  <tr>
    <td colspan="2" width="100%">
      <video src="https://www.modelscope.cn/models/meituan-longcat/LongCat-Video-Avatar-1.6/resolve/master/assets/6.mp4" width="100%" controls preload="metadata" playsinline></video>
    </td>
  </tr>
</table>

### 📊 人工评估
我们将 LongCat-Video-Avatar 1.6 与其前身 LongCat-Video-Avatar 1.5 以及四个商业系统（OmniHuman-2.0、HeyGen、OmniHuman-1.5 和 Kling Avatar 2.0）进行了比较。所有成对的人工偏好研究涵盖了所有 15 组模型配对，共计 33,051 个有效单独投票。在包含 33,051 个有效单独投票的人工偏好竞技场（Human Preference Arena）中，LongCat-Video-Avatar 1.6 在六个评估系统中排名第二。其 Bradley–Terry Elo 得分为 1068.1，排名位于 OmniHuman-2.0 之后，但在 LongCat-Video-Avatar 1.5、HeyGen、OmniHuman-1.5 和 Kling Avatar 2.0 之前。

<div align="center">
  <img src="assets/fig.png" width="60%" alt="LongCat-Video-Avatar" />
</div>

### 💡 快速开始
克隆仓库

```shell
git clone --single-branch --branch main https://github.com/meituan-longcat/LongCat-Video
cd LongCat-Video
```

安装依赖

```shell
## 创建 conda 环境
conda create -n longcat-video python=3.10
conda activate longcat-video

## 安装 torch（根据你的 CUDA 版本进行配置）
pip install torch==2.6.0+cu124 torchvision==0.21.0+cu124 torchaudio==2.6.0 --index-url https://download.pytorch.org/whl/cu124

## 安装 flash-attn-2
pip install ninja
pip install psutil
pip install packaging
pip install flash_attn==2.7.4.post1

## 安装其他依赖
pip install -r requirements.txt

## 安装 longcat-video-avatar 依赖
conda install -c conda-forge librosa
conda install -c conda-forge ffmpeg
pip install -r requirements_avatar.txt
```

模型配置中默认启用 FlashAttention-2；你也可以修改模型配置以使用 FlashAttention-3 或 xformers。

#### ⛽️ 模型下载

| 模型 | 描述 | 下载链接 |
| --- | --- | --- |
| LongCat-Video | 基础视频生成 | 🤗 [Huggingface](https://huggingface.co/meituan-longcat/LongCat-Video) |
| LongCat-Video-Avatar-1.6 | 单人和多人音频驱动视频生成 | 🤗 [Huggingface](https://huggingface.co/meituan-longcat/LongCat-Video-Avatar-1.6) |

使用 huggingface-cli 下载模型：
```shell
pip install "huggingface_hub[cli]"
huggingface-cli download meituan-longcat/LongCat-Video --local-dir ./weights/LongCat-Video
huggingface-cli download meituan-longcat/LongCat-Video-Avatar-1.6 --local-dir ./weights/LongCat-Video-Avatar-1.6
```

#### 🔑 快速推理
使用提示
> 1. **检查点组成与 LoRA 混合**
>
>    LongCat-Video-Avatar 1.6 使用与
>    LongCat-Video-Avatar 1.5 相同的基础架构，并包含两个特定任务的 LoRA 适配器：
>
>    - `loraA/lora.safetensors`: DMD LoRA。
>    - `loraB/lora.safetensors`: OPSD LoRA。
>
>    检查点包还提供了 `base_model_int8`，这是一个可选的仅权重 INT8 DiT，可通过 `--use_int8` 启用。
>
>    使用 `--mix_steps=N` 时，前 `N` 个去噪步骤使用
>    `mix_alpha * DMD + (1 - mix_alpha) * OPSD`，而剩余的
>    `8 - N` 个步骤仅使用 OPSD。增加 `--mix_steps` 或
>    `--mix_alpha` 会使 DMD LoRA 在早期去噪步骤中具有更大的影响力，这可能会提高结构稳定性并减少视觉失真。
>
>    使用默认设置 `--mix_steps=4 --mix_alpha=1.0` 时，前四个去噪步骤仅使用 DMD，剩余四个步骤仅使用 OPSD。
>
> 2. **FP8 依赖与 INT8 互斥**
>
>    在启用 `--use_fp8` 之前，请先安装支持 PyTorch 和 CUDA 的 Transformer Engine。请勿同时使用 `--use_fp8` 和 `--use_int8`；每次仅启用一种量化模式。如果输出质量是首要考虑因素，请减少使用 FP8 的层数。
>
> 3. **编译预热**
>
>    当启用 `--compile_dit` 和 `--compile_vae` 时，前几次推理运行包含图追踪和编译开销，因此可能会较慢。随后具有相同输入形状的推理运行将重用已编译的图，速度显著加快。新的输入形状可能会触发重新编译。
>
> 4. **FlashAttention 3**
>
>    对于 Hopper GPU（如 H20、H100、H200 和 H800），请安装并启用 FlashAttention 3。FA3 相比 FA2 可提供显著的推理加速。确认模型配置中包含：
>
>    ```json
>    {
>      "enable_flashattn3": true,
>      "enable_flashattn2": false
>    }
>    ```
>
> 5. **多 GPU 通信**
>
>    当在两个以上的 GPU 上运行时，启用优化的 All-to-All 工作区以减少上下文并行通信开销：
>
>    ```shell
>    export LONGCAT_A2A_WORKSPACE=1
>    ```
>
>    将 `--nproc_per_node` 和 `--context_parallel_size` 设置为用于推理的 GPU 数量。

##### 单人动画
```shell
## 语音-文本到视频
torchrun --nproc_per_node=2 run_demo_avatar_single_audio_to_video.py --context_parallel_size=2 --checkpoint_dir=./weights/LongCat-Video-Avatar-1.6 --stage_1=at2v --input_json=assets/avatar/single_example_1.json --use_distill --lora_path loraB/lora.safetensors --model_type avatar-v1.6 --mix_steps=4 --mix_alpha=1.0

## 语音-图像到视频
torchrun --nproc_per_node=2 run_demo_avatar_single_audio_to_video.py --context_parallel_size=2 --checkpoint_dir=./weights/LongCat-Video-Avatar-1.6 --stage_1=ai2v --input_json=assets/avatar/single_example_1.json --use_distill --lora_path loraB/lora.safetensors --model_type avatar-v1.6 --mix_steps=4 --mix_alpha=1.0

## 语音-文本到视频及视频续写
torchrun --nproc_per_node=2 run_demo_avatar_single_audio_to_video.py --context_parallel_size=2 --checkpoint_dir=./weights/LongCat-Video-Avatar-1.6 --stage_1=at2v --input_json=assets/avatar/single_example_1.json --num_segments=5 --ref_img_index=10 --mask_frame_range=0 --use_distill --lora_path loraB/lora.safetensors --model_type avatar-v1.6 --mix_steps=4 --mix_alpha=1.0

## 语音-图像到视频及视频续写
torchrun --nproc_per_node=2 run_demo_avatar_single_audio_to_video.py --context_parallel_size=2 --checkpoint_dir=./weights/LongCat-Video-Avatar-1.6 --stage_1=ai2v --input_json=assets/avatar/single_example_1.json --num_segments=5 --ref_img_index=10 --mask_frame_range=0 --use_distill --lora_path loraB/lora.safetensors --model_type avatar-v1.6 --mix_steps=4 --mix_alpha=1.0
```

##### 多人动画
```shell
## 语音-图像到视频
torchrun --nproc_per_node=2 run_demo_avatar_multi_audio_to_video.py --context_parallel_size=2 --checkpoint_dir=./weights/LongCat-Video-Avatar-1.6 --input_json=assets/avatar/multi_example_1.json --use_distill --lora_path loraB/lora.safetensors --model_type avatar-v1.6 --mix_steps=4 --mix_alpha=1.0

## 语音-图像到视频及视频续写
torchrun --nproc_per_node=2 run_demo_avatar_multi_audio_to_video.py --context_parallel_size=2 --checkpoint_dir=./weights/LongCat-Video-Avatar-1.6 --input_json=assets/avatar/multi_example_1.json --num_segments=5 --ref_img_index=10 --mask_frame_range=0 --use_distill --lora_path loraB/lora.safetensors --model_type avatar-v1.6 --mix_steps=4 --mix_alpha=1.0
```

### ⚖️ 许可协议

**模型权重**在 **MIT 许可证**下发布。

除非另有说明，对本仓库的任何贡献均在 MIT 许可证下授权。此许可证不授予使用美团商标或专利的任何权利。

完整许可文本请参阅 [LICENSE](LICENSE) 文件。


### 🧠 使用注意事项

该模型并非针对每种可能的下游应用进行专门设计或全面评估。

开发人员应考虑大型语言模型的已知局限性，包括不同语言之间的性能差异，并在将模型部署到敏感或高风险场景之前，仔细评估其准确性、安全性和公平性。

开发人员及下游用户有责任了解并遵守与其用例相关的所有适用法律和法规，包括但不限于数据保护、隐私和内容安全要求。

本模型说明书中的任何内容均不应被解释为改变或限制模型发布所依据的 MIT 许可证条款。

### 📖 引用
如果您觉得我们的工作有用，我们恳请您引用我们的成果。

```
@misc{meituanlongcatteam2026longcatvideoavatar16technicalreport,
      title={LongCat-Video-Avatar 1.6 Technical Report}, 
      author={Meituan LongCat Team},
      year={2026},
      eprint={},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      url={}, 
}
```

### 🙏 致谢

我们要感谢 [Wan](https://huggingface.co/Wan-AI)、[UMT5-XXL](https://huggingface.co/google/umt5-xxl)、[Diffusers](https://github.com/huggingface/diffusers) 和 [HuggingFace](https://huggingface.co) 仓库的贡献者，感谢他们的开源研究。

### 📞 联系方式
如有任何问题，请通过 <a href="mailto:longcat-team@meituan.com">longcat-team@meituan.com</a> 联系我们，或加入我们的微信群。
