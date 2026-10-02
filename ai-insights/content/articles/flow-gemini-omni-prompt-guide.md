---
title: "Google Flow 的 10 条视频创作技巧：让 Gemini Omni 听懂你的镜头要求"
date: 2026-10-01T00:00:00.000Z
tags: ["会员", "深度", "Google", "Flow", "Gemini Omni", "视频生成", "提示词", "聚合"]
summary: "从首尾帧、素材标签到时间码和局部修改，逐条讲清官方指南的用法，配上中文提示词与原始视频示例。"
---
> **原文链接**: [https://x.com/FlowbyGoogle/status/2105398907702595802](https://x.com/FlowbyGoogle/status/2105398907702595802)
> **来源**: Google Flow
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/flow-gemini-omni-prompt-guide/) · 2026/10/1
> **说明**: 本文由 AIHot 自动聚合(原文即中文,未翻译)。上游原文多次抓取失败(含登录墙/反爬,CDP 渲染亦无法获取),正文取自小互 AI 解读

---

想用 AI 做一段产品广告，你可能已经有商品图、人物照片，甚至画好了分镜。但从这些素材到一段满意的视频，中间还有很多要求要交代：人物怎么动、镜头怎么走、什么时候切换画面，以及生成之后怎么只改一个细节。

Google Flow 是 Google 的 AI 创作工作区，供创作者生成和编辑图片、视频。这份官方指南介绍的是 Flow 中的 Gemini Omni Flash：你可以用文字、图片或参考视频告诉它想拍什么，也可以对已有视频继续提出修改要求。

很多人的痛点在于，一句“拍得更有电影感”没有说清具体要求。你想改变的可能只是光线，模型却也换了机位；你想连续拍完一个动作，它却在中间切了镜头。创意有了，怎样把创意准确交代给模型，成了下一步的问题。

Google Flow 团队因此整理了这份创作提示词指南，给出十类方法和具体示例：用参考画面确定主体与构图，用镜头和时间要求安排动作，修改时明确哪些地方要变、哪些要保留。下面结合官方视频和中英文提示词，逐条讲清这些方法怎么用。

英文提示词逐字保留官方原文，包含原文的标点、素材占位符与时间码；中文为对照翻译，使用说明另列。原文少数引号未闭合，也按原样保留。

### 一、先确定画面：文字约束与首尾帧

先确定画面的要求，再安排画面中的运动。环境、服装和镜头风格可以通过文字规定；构图、主体与色调则可以用图片给出更具体的参照。

#### 技巧 1：提供高层创意约束（Provide high-level constraints）

不用去微观指挥每一根头发丝怎么飘，而是向 Gemini Omni 提出高层级的艺术与物理约束。官方建议明确要求模型注意光照一致性、布景、服装质感和动作细节，让它在这些约束内补充画面。

[视频/音频](https://best.xiaohu.ai/media/flow-gemini-omni-prompt-guide/source-05.mp4)

广角鱼眼镜头在室内空间由鞋部自下而上巡视，展示环境光影与服装微观细节

**官方提示词原文与中文对照：**

- **环境与服饰质感约束**
  > **中文：** 细化场景环境。对角色应用服装设计原则，精确指定具体的材质纹理、道具与光影氛围。
  >
  >
  >
  > **English:** “Be extremely detailed in environments. Apply costume design principles to characters, specifying exact textures, props, and lighting.”
  >
  >
  >
  > *用法：告诉模型优先细化哪些环境、服装和道具特征。*
- **微表情与自然对话约束**
  > **中文：** 深入考量细节、面部表情以及节奏停顿，营造出自然的对话状态。
  >
  >
  >
  > **English:** “Consider micro-detail, facial expression, and timing to create a natural dialogue.”
  >
  >
  >
  > *用法：把表情与对话节奏也列入要求，不只给出台词。*
- **特殊摄影镜头约束**
  > **中文：** 用手持鱼眼镜头拍摄房间里的角色。
  >
  >
  >
  > **English:** “Handheld fisheye camera shot of the character in the room.”
  >
  >
  >
  > *作用：直接调用特定光学镜头语言，快速确立画面的透视张力。*

#### 技巧 2：使用首尾帧作为“视觉锚点”（Use visual anchors）

长镜头或复杂运动最怕的是“走样”——镜头一晃，衣服换了颜色，背景甚至变了个城市。上传或预先生成起始帧与结束帧（Start & End Frame），就能给模型提供画面起点与终点的参照。静态帧把构图、色调与主体先交代出来，文字就可以集中描述摄像机与人物怎么运动。官方将这种做法用于减少画面漂移。

[视频/音频](https://best.xiaohu.ai/media/flow-gemini-omni-prompt-guide/source-09.mp4)

主体在石板路与建筑间骑行，这是原文配在视觉锚点技巧下的骑行示例

**官方提示词原文与中文对照：**

- **无人机后撤并升高**
  > **中文：** 基于给定的首尾帧，执行平滑连贯的高速无人机后撤镜头。摄像机快速向后倒退并俯倾，同时爬升数百英尺冲入高空，云雾散开，显露出壮丽雄伟的山脉全貌。
  >
  >
  >
  > **English:** “Smooth, continuous high-speed drone pull-back shot using this start and end frame. The camera rapidly retreats backwards and tilts down, ascending several hundred feet into the air. The mist parts to reveal the massive mountain range.”
- **日夜光影流转延时**
  > **中文：** 基于给定的首尾帧，使用锁定的静止机位进行延时摄影。转场无缝衔接，将环境氛围光从湿冷的暮色平滑过渡为温暖的晨间日光。
  >
  >
  >
  > **English:** “Hyperlapse with a locked-off, static camera using this start and end frame. The transition is seamless, shifting the ambient lighting from cold, wet twilight to warm morning sunlight.”
- **制作无限无缝循环动图**
  > **中文：** 基于给定的首帧和尾帧，制作一个首尾相接、无缝循环的动态视频。
