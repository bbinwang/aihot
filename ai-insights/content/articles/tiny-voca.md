---
title: "tiny-voca：一个从未听过真实人类声音的文本到语音模型 训练只花了 9.56 美元 能在浏览器里跑"
date: 2026-11-17T00:00:00.000Z
tags: ["产品发布", "TTS", "语音合成", "开源模型", "端侧模型", "Qwen3-TTS"]
summary: "它出声不靠又大又重的神经网络，而是照着「声带振动、口腔塑形」的原理现场合成，这一段只占整个模型的 0.57%。"
---
> **原文链接**: [https://huggingface.co/n4ze3m/tiny-voca](https://huggingface.co/n4ze3m/tiny-voca)
> **来源**: huggingface.co
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/tiny-voca/) · 2026/11/17
> **说明**: 本文由 AIHot汪 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

## tiny-voca
- 作者： n4ze3m
- 来源： https://huggingface.co/n4ze3m/tiny-voca
---
---
license: apache-2.0
language:
- en
pipeline_tag: text-to-speech
tags:
- text-to-speech
- onnx
datasets:
- n4ze3m/tiny-voca
---
## tiny-voca

tiny-voca 是一个小型英语 text-to-speech 模型，提供两种音色：F2(女声)和 M2(男声)。完整模型(包括波形生成器)共有 450 万参数，从零开始在约 18 小时的合成语音上训练而成。在四个 CPU 线程上，其运行速度约为实时速度的 70 倍。

<audio controls src="https://huggingface.co/n4ze3m/tiny-voca/resolve/main/samples/F2-1.wav"></audio>

- 代码：https://github.com/n4ze3m/tiny-voca
- Phonemizer:https://github.com/n4ze3m/dizione
- 数据集：https://huggingface.co/datasets/n4ze3m/tiny-voca
- 在浏览器中试用：https://huggingface.co/spaces/n4ze3m/tiny-voca-studio

| | |
|---|---|
| 参数量 | 4,537,291 |
| 音色 | F2、M2(美式英语) |
| 输出 | 24 kHz 单声道 |
| 输入 | 文本，使用 dizione 转换为音素 |
| 模型中的预训练权重 | 无 |
| 许可证 | Apache-2.0 |

### 文件

| 文件 | 大小 | 内容 |
|---|---:|---|
| `tiny-voca.pt` | 18.2 MB | PyTorch 权重，float32 |
| `onnx/model.onnx` | 21.4 MB | ONNX 导出，float32,opset 17 |
| `config.json` | | 模型设置、音素词表、音色 |
| `phonemizer/` | 5.4 MB | dizione 的数据文件 |
| `samples/` | | 本页面的音频 |

SHA256:

- `tiny-voca.pt`: `ebb22871524c5732520fb1652e6aefcec708a7452e83bdd00adcf6181db5ef70`
- `onnx/model.onnx`: `fe6d918791a15b82e37465981d7f27a070e46b46635e5a3482fc8dff87a1ae46`

### 示例

| 文本 | F2 | M2 |
|---|---|---|
| 你好！这里是 tiny voca,一个可以在手机或浏览器中运行的小型 text-to-speech 模型。 | <audio controls preload="none" src="https://huggingface.co/n4ze3m/tiny-voca/resolve/main/samples/F2-1.wav"></audio> | <audio controls preload="none" src="https://huggingface.co/n4ze3m/tiny-voca/resolve/main/samples/M2-1.wav"></audio> |
| 会议改到了 3 月 14 日下午 3:30,所以我们还剩大约 45 分钟。 | <audio controls preload="none" src="https://huggingface.co/n4ze3m/tiny-voca/resolve/main/samples/F2-2.wav"></audio> | <audio controls preload="none" src="https://huggingface.co/n4ze3m/tiny-voca/resolve/main/samples/M2-2.wav"></audio> |
| 你真以为我会忘记你的生日？ | <audio controls preload="none" src="https://huggingface.co/n4ze3m/tiny-voca/resolve/main/samples/F2-3.wav"></audio> | <audio controls preload="none" src="https://huggingface.co/n4ze3m/tiny-voca/resolve/main/samples/M2-3.wav"></audio> |
| 她从未见过大海，好一阵子她站在水边，一言不发。 | <audio controls preload="none" src="https://huggingface.co/n4ze3m/tiny-voca/resolve/main/samples/F2-4.wav"></audio> | <audio controls preload="none" src="https://huggingface.co/n4ze3m/tiny-voca/resolve/main/samples/M2-4.wav"></audio> |

### 用法

#### PyTorch

```bash
pip install git+https://github.com/n4ze3m/dizione git+https://github.com/n4ze3m/tiny-voca
hf download n4ze3m/tiny-voca --local-dir tiny-voca
export DIZIONE_DATA=tiny-voca/phonemizer

python -m tiny_voca.infer \
  --checkpoint tiny-voca/tiny-voca.pt \
  --voice F2 \
  --text "Hello! This is tiny voca." \
  --output hello.wav
```

| 选项 | 默认值 | 含义 |
|---|---|---|
| `--text-file` | | 从文件读取文本，而不是使用 `--text`。 |
| `--voice` | `F2` | `F2` 或 `M2` |
| `--speed` | 1.0 | 语速 |
| `--pitch-shift` | 0 | 加到 log F0 上。0.058 约等于一个半音。 |
| `--pitch-range` | 1.0 | 围绕整句的平均值缩放音高变化。 |

任意长度的文本都可以处理。该命令会逐句读取文本并将音频拼接起来。结尾没有标点的文本会自动补上句号。没有可读内容的句子(例如使用其他文字系统的句子)会被跳过。保存的音频峰值从不会超过 0.99。

#### ONNX

该计算图接收音素 id 和重音值，并返回波形。文本在计算图之外由 dizione 转换为 id;这些 id 对应 `config.json` 中 `vocab` 里的位置。

```python
import numpy as np
import onnxruntime as ort
import soundfile as sf
import dizione   # needs DIZIONE_DATA=tiny-voca/phonemizer

phones = dizione.phonemize("Hello! This is tiny voca.")
one = lambda value: np.array([value], dtype=np.float32)

session = ort.InferenceSession("tiny-voca/onnx/model.onnx")
audio, durations = session.run(None, {
    "tokens": np.array([phones.ids], dtype=np.int64),
    "stress": np.array([phones.stress], dtype=np.int64),
    "voice": np.array([0], dtype=np.int64),      # 0 = F2, 1 = M2
    "speed": one(1.0),
    "pitch_shift": one(0.0),
    "pitch_range": one(1.0),
})
audio = audio[0]
audio = audio * min(1.0, 0.99 / np.abs(audio).max())    # the model can peak above 1.0
sf.write("hello.wav", audio, 24000)
```

| 输入 | 类型 | 形状 | 含义 |
|---|---|---|---|
| `tokens` | int64 | [1, N] | 音素 id,包含起始和结束 token |
| `stress` | int64 | [1, N] | 0 无,1 主重音,2 次重音 |
| `voice` | int64 | [1] | 0 = F2,1 = M2 |
| `speed` | float32 | [1] | 1.0 为模型预测值;数值越大语速越快 |
| `pitch_shift` | float32 | [1] | 加到 log F0 上 |
| `pitch_range` | float32 | [1] | 缩放音高变化幅度 |

| 输出 | 类型 | 形状 | 含义 |
|---|---|---|---|
| `audio` | float32 | [1, samples] | 24 kHz 波形 |
| `durations` | int64 | [1, N] | 每个 token 的帧长度,每帧 256 个采样点 |

模型每次调用读取一条话语,最多 512 个 token 和 32 秒。请将更长的文本拆分成句子;`tiny_voca.infer.speak_text` 在 Python 中完成这一操作。每条话语应以标点结尾,例如句号:若没有标点,最后一个词会中断。
音频可能略微超过 1.0(约二十句话中出现一次),因此在保存 16 位采样点之前,请按上文方式缩放音量。同一文件可在 onnxruntime-web(WebAssembly)中运行。除每次由各运行时自行生成的随机噪声信号外,其音频与 PyTorch 模型的差异在峰值振幅的 0.6% 以内。

### 模型

文本被转换为带重音标记的音素。一个 Transformer 编码器(4 个 block)读取音素,一个时长预测器为每个音素分配帧长度,两个帧级 Transformer(2 个和 5 个 block)先预测音高、浊音和能量,再预测波形生成器的参数。所有 block 均使用 192 通道、4 个 head 以及 rotary position embeddings。

波形由一个声源-滤波器(source-filter)合成器生成,而非神经声码器。处于预测音高的带限脉冲串和一个噪声信号各自经过一个时变滤波器整形,该滤波器的倒频谱由网络逐帧预测一次(每帧 256 个采样点,10.7 ms)。这一部分有 25,862 个参数。

| 组件 | 参数量 |
|---|---:|
| Embeddings(音素、重音、声音) | 16,704 |
| 文本编码器 | 1,588,864 |
| 时长与停顿预测器 | 123,906 |
| 帧级 Transformer A、韵律头 | 795,971 |
| 帧级 Transformer B | 1,985,984 |
| 声源-滤波器波形头 | 25,862 |
| 总计 | 4,537,291 |

### 训练

| | |
|---|---|
| 数据 | [n4ze3m/tiny-voca](https://huggingface.co/datasets/n4ze3m/tiny-voca):16,018 条音频,17.6 小时,两个声音 |
| 步数 | 104,737 |
| 硬件 | 一块 RTX 4090,7.7 小时 |
| 损失 | 多分辨率频谱损失;从第 8,000 步起加入采用 multi-period 和 multi-resolution 判别器的对抗损失 |

训练音频为合成音频。两个声音均由 Qwen3-TTS VoiceDesign 根据文本描述创建,录音由 Qwen3-TTS 1.7B Base 生成,不涉及任何真实说话者的录音。音素时长来自与 `facebook/wav2vec2-lv-60-espeak-cv-ft` 的强制对齐,该模型仅用于标注训练数据。模型中不包含任何预训练权重。

### 评估

合成语音的词错误率,使用 Whisper small.en 转录。相同句子的录音以同样方式评分作为参照。

| 句子 | 音频条数 | WER,tiny-voca | WER,录音 |
|---|---:|---:|---:|
| 验证集 | 8 | 0.6% | 0.6% |
| 测试集 | 8 | 0.9% | 0.9% |
| 数据集中未包含的新句子 | 16 | 0.0% | |

这些数据集规模很小，分数仅作 sanity check 之用，并非基准测试。尚未进行正式的听感测试。

#### Open TTS Leaderboard

官方排行榜快照：**2026 年 11 月 16 日**(v1.6.3),英语，**不含 voice cloning**,取 Seed-TTS、CV3-Eval 与 MiniMax 三者的等权平均；共 50 个上榜模型(英语全覆盖)。tiny-voca 的每个音色单独占一行；**M2** 目前按平均 WER 排名**第 8**,**F2** 排名**第 13**。托管的排行榜注明 tiny-voca 的两行均为 CPU-only。

| Rank | Model | Params | Average WER % ↓ | UTMOS22 ↑ |
| ---: | :--- | ---: | ---: | ---: |
| 6 | phonon-31m-en | 41 M | 0.730 | 4.45 |
| 7 | Inflect Micro v3 | 12 M | 0.730 | 4.37 |
| **8** | **tiny-voca (M2)** | **4.5 M** | **0.733** | **4.34** |
| 9 | phonon-40m-en | 51 M | 0.737 | 4.45 |
| 10 | supertonic-3 | 100 M | 0.743 | 4.45 |
| … | … | … | … | … |
| 12 | PiVo-1.4M | 1.4 M | 0.767 | 4.33 |
| **13** | **tiny-voca (F2)** | **4.5 M** | **0.773** | **4.43** |
| 14 | LFM3-Audio-2B | 2.05 B | 0.797 | 4.45 |

📊 [Open TTS Leaderboard(2026 年 11 月 16 日快照)](https://huggingface.co/spaces/hf-audio/open_tts_leaderboard?version=v1.6.3)

🎧 [对比模型输出](https://huggingface.co/spaces/hf-audio/open_tts_leaderboard?listen=n4ze3m%2Ftiny-voca+%28M2%29%2CQwen%2FQwen3-TTS-12Hz-1.7B-CustomVoice%2Chexgrad%2FKokoro-82M)——与 Qwen3 TTS(训练所用的模型)及 Kokoro 对比

### 局限性

- 仅支持英语，两个固定音色，无 voice cloning。
- 音色清晰，但有时听感略显合成。
- F2 音色听起来比预期年轻。它本应是一个成人音色(提示词要求的是一位二十五岁左右的美国成年女性；参见数据集中的 voices.json)。后续计划提供更成熟的音色。
- 同一段文本总是以相同方式朗读，韵律没有随机采样。
- 默认语速下，语音比训练录音略快。
- 外国名字和非常见拼写常常被读错。数字、缩写和多音词的处理依赖 phonemizer。
- 不支持 streaming。
- 训练数据本身是合成的，因此模型不可能比生成它的模型更自然。

### 成本

整个项目在租用的一块 RTX 4090 上花费了 $9.56 的 GPU 时间。这包括数据集、失败的尝试以及最终的训练运行。

![成本构成](https://huggingface.co/n4ze3m/tiny-voca/resolve/main/cost.png)

### 支持

制作成本还不到一个披萨。如果你喜欢它，可以请我吃一个：
https://ko-fi.com/n4ze3m

### 许可证

权重和代码以 Apache-2.0 发布。`phonemizer/` 中的文件派生自 CMU Pronouncing Dictionary 及其他来源；其许可证见 `phonemizer/LICENSE.cmudict` 和 `phonemizer/LICENSE.homograph-data`。

### 引用

```bibtex
@software{nazeem2026tinyvoca,
  author = {Nazeem, Muhammed},
  title  = {tiny-voca: a 4.5M-parameter two-voice English text-to-speech model},
  year   = {2026},
  url    = {https://huggingface.co/n4ze3m/tiny-voca}
}
```

作者:Muhammed Nazeem([ORCID 0009-0002-9991-0217](https://orcid.org/0009-0002-9991-0217))。

### 致谢

本设计建立在 FastSpeech 2(显式的时长与韵律预测)、DDSP 与神经同态声码器(使用预测滤波器进行 source-filter 合成)，以及 HiFi-GAN 和 UnivNet(判别器)之上。未使用这些项目的任何代码或权重。
