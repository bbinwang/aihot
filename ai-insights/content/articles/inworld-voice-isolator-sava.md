---
title: "Inworld 开源两款语音模型：降噪时留下笑声和呼吸，能智能判断你「说完了」笔记本就能跑"
date: 2026-11-19T00:00:00.000Z
tags: ["产品发布", "Inworld", "语音 Agent", "降噪", "开源模型", "TTS"]
summary: "语音 Agent 最招人烦的两件事：一吵就听错，你停下来想个词它就抢话。这两个毛病，现在各有一个能在 CPU 上跑的开源模型来治。"
---
> **原文链接**: [https://x.com/inworld/status/2123120546908926300](https://x.com/inworld/status/2123120546908926300)
> **来源**: x.com
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/inworld-voice-isolator-sava/) · 2026/11/19
> **说明**: 本文由 AIHot汪 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

## 今天，我们开源了 Inworld 的 Voice Isolator 和 SAVA（语义-声学语音活动）模型
- 作者: Inworld AI (@inworld)
- 日期: 2026年11月18日 星期三 18:25:58 +0000
- 来源: https://x.com/inworld/status/2123120546908926300
---
今天，我们开源了 Inworld 的 Voice Isolator 和 SAVA（Semantic-Acoustic Voice Activity，语义-声学语音活动）模型，并发布了 Realtime TTS-2 背后的技术报告。

1/ Voice Isolator：保留说话人的声音。

它在去除背景嘈杂声、音乐和噪音的同时，保留了原录音中的笑声、呼吸声和人物特征。它支持 48 kHz 采样率，提供用于录音的离线模型以及具有 20 ms 前瞻能力的实时流式模型。

2/ SAVA：给人留出说完想法的空间。

我们的 Semantic-Acoustic Voice Activity（语义-声学语音活动）模型结合语音的声音和含义，来检测某人何时在说话以及何时说完。它目前已运行在我们的语音产品中，并且只需单个笔记本电脑 CPU 线程即可运行。在针对真实会议录音的测试中，它检测完整话轮的中位时间为 71 毫秒，而我们要对比的开源模型则为 210 毫秒。

3/ TTS-2 技术报告：分享我们如何构建另一端的语音。

我们解释了如何训练 TTS-2 以遵循关于演绎方式的指令，如何在不同语言间使用相同的参考语音，以及如何生成流式语音。我们还介绍了 Flash 更快、更高效的服务背后的工作，包括训练方法、评估结果以及开发过程中从失败中汲取的经验教训。

Voice Isolator 和 SAVA 均在 Apache 2.0 许可下提供代码和模型权重。

在此探索发布内容并自行尝试处理您的音频：https://inworld.ai/open-source

[视频] https://video.twimg.com/ext_tw_video/2123120491275636736/pu/vid/avc1/1280x720/vsA-zpMTIeh2WXWs.mp4?tag=12

点赞 581 · 转发 73 · 回复 29 · 浏览 51.0K
