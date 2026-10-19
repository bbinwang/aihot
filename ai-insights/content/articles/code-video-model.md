---
title: "微软开源 Code Video Model 模型：用代码生成视频"
date: 2026-10-13T00:00:00.000Z
tags: ["论文", "AI视频", "三维预演", "可控生成", "聚合"]
summary: "先用代码搭场景、排动作和运镜，再让视频模型生成材质与光影。像拍电影做动态预演一样，让 AI 视频多一个可查看、可修改的中间环节。"
---
> **原文链接**: [https://code-video-model.github.io/](https://code-video-model.github.io/)
> **来源**: Microsoft Research · Code Video Model
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/code-video-model/) · 2026/10/13
> **说明**: 本文由 AIHot 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

## Code Video Model

![Microsoft](https://code-video-model.github.io/assets/logo.png)

- [https://zhiyangliang.github.io/](https://zhiyangliang.github.io/)
- [https://zjwsite.github.io/](https://zjwsite.github.io/)
- [https://guochengqian.github.io/](https://guochengqian.github.io/)
- [https://www.dongdongchen.bid/](https://www.dongdongchen.bid/)
- [http://raywzy.com/](http://raywzy.com/)

### 演示视频

**TL;DR:** 我们将 prompt 转化为代码驱动的视频预览，再利用 early-step conditioning 生成遵循预览结构与参考外观的视频——无需额外训练。

### 摘要

视频扩散模型以黑盒方式生成逼真的视频。物理过程是被“想象”出来的，而非计算出来的；物体的摆放、运动和相机轨迹都在内部解决，只有到最终片段才可见。受电影制作流程启发，我们提出 Code Video Model,它为视频生成提供了可执行的 previs,并以代码作为引擎。给定一个 prompt,Code Video Model 会编写一个程序，用于布置场景、为物体制作动画、放置相机并根据方程计算动力学；渲染该程序会得到一个 proxy video 和一张参考图像。渲染生成的 proxy video 用时不到一分钟，因而预览十分*快速*；它是 *grounded* 的，因为动力学是计算得出的；它还*直接且精确可控*，因为代码可以修改其中每个元素。随后，以 proxy video 和参考图像为条件，驱动一个预训练视频模型生成最终片段。
然而，我们观察到现有视频模型倾向于将 proxy video 的扁平外观复制到生成的片段中。为解决这一问题，Code Video Model 进一步引入 early-step conditioning——一种免训练的调度策略，仅在结构成形的早期采样步骤中关注 proxy video,此后便移除这一条件。由此，Code Video Model 能够生成既遵循 proxy video 结构、又保留参考图像外观的最终片段。
我们提出 CodeVideoBench,用于评估涵盖多种应用的可控视频生成，包括游戏、场景编辑、世界模型数据、物理 grounding、子弹时间以及 3D/4D 重建。在 CodeVideoBench 上，Code Video Model 搭配 MiniMax-H3 在 QwenVL-3.8-27B、GPT-5.6 和 GPT-6 下分别取得 85.2、82.1 和 85.8 的总分，而最强学习型基线 VACE 分别为 74.3、73.1 和 80.6。

Three.js

Code Video Model

### 动漫

Three.js

Code Video Model

### 子弹时间

Three.js

Code Video Model

### 游戏

Three.js

Code Video Model

### 场景编辑

Three.js

Code Video Model

### 机器人与轨迹控制

Three.js

Code Video Model

### 建筑运镜

Three.js

Code Video Model

### 产品电影级拍摄

Three.js

输出

### 物理 Grounding

Three.js

Code Video Model

### 3D / 4D 重建
