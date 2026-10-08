---
title: "Claude 写代码，能做出什么视频和游戏？十个开源项目拆解"
date: 2026-10-03T00:00:00.000Z
tags: ["会员", "深度", "Claude", "Opus 5.5", "视频", "开源", "游戏", "聚合"]
summary: "从手绘动画到产品宣传片、海岛钓鱼游戏，看懂十个社区项目的制作方式、复用入口和实际门槛。"
---
> **原文链接**: [https://x.com/charliejhills/status/2105963768446632219](https://x.com/charliejhills/status/2105963768446632219)
> **来源**: Charlie Hills
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/opus-5-5-code-creative-projects/) · 2026/10/3
> **说明**: 本文由 AIHot 自动聚合(原文即中文,未翻译)。上游原文多次抓取失败(含登录墙/反爬,CDP 渲染亦无法获取),正文取自小互 AI 解读

---

Charlie Hills 整理了一份围绕 Claude Opus 5.5 的社区项目清单，涵盖从动态图形到完整网页游戏的 10 个开源项目。

在这份清单中，代码既能用于制作动画视频，也能直接构建可交互的网页游戏：动画项目通常由模型编写绘图逻辑，在浏览器中逐帧渲染并压制成 MP4 视频；而游戏项目则直接运行在浏览器前端，由玩家输入实时驱动状态机与画面渲染。在这条制作路线里，Claude 主要负责写可执行的前端与图形代码，浏览器负责画出画面；另一些项目还会调用外部图像、视频模型。

---

#### Claude 写代码，浏览器把画面画出来

清单中的项目走的是程序化路径：模型编写前端绘图与逻辑代码，通过浏览器执行并呈现结果：

1. **时间驱动与状态机建模**：在动画短片中，模型设计分镜和时间轴，使用 HTML5 Canvas、SVG、WebGL、Three.js 或 p5.js 将视觉元素组织为关于时间的函数；在游戏项目中，画面并非纯时间函数，而是受玩家键盘、鼠标等输入与实时状态驱动。确定时间渲染有利于画面复现与代码局部修改，但并不保证代码本身不存在逻辑或渲染错误。
2. **虚拟时钟与逐帧截屏**：动画项目通常在 Node.js 中调度无头 Chrome（Headless Chrome），通过注入虚拟时间轴驱动绘制并逐帧截取图像序列。
3. **音源对齐与压制导出**：动画的声音来源多样，可以来自用户提供的既有歌曲（例如 PDoomVideo 采用既有歌曲）、免费采样库或 TTS 语音合成；渲染出的图像序列随后由 ffmpeg 与音频对齐压制为 MP4。需要注意，源码文件本身虽然轻量，但多帧渲染导出的临时图像序列与成片 MP4 仍需占用相应磁盘空间。

在 Charlie Hills 列出的这 10 个项目中，它们在技术架构和应用目标上分化成了五种形态。

---

#### 第一组：手绘水彩动画与脚手架

这一流派专注于利用 p5.js 与 p5.brush 笔刷库，生成具有水彩质感和手绘线条的 2D 角色动画。

##### 1. PDoomVideo：代码手绘音乐短片

- **项目地址**：[JohnHeibel/PDoomVideo](https://github.com/JohnHeibel/PDoomVideo)
- **它做了什么**：这是一支为既有歌曲《I'm Upping My P(doom)》（采用既有音源）制作的音乐录影带（MV）。视频里的每一个分镜、角色动作和笔刷效果均由 Claude Opus 5.5 在 Claude Code 中编写代码生成，未人工指定具体分镜创意。
- **运行机制**：作者给出了使用吉祥物 Clawd 形象并契合歌词转场的要求。Opus 5.5 生成了分镜计划（`STORYBOARD.md`）与风格规范指南（`ANIMATION_GUIDE.md`），并调用子代理协同写代码。全片分为 9 个章节，每帧在 `studio.html` 中通过 p5.brush 绘制，由无头 Chrome 和 ffmpeg 完成渲染和音画合成。
- **用途**：展示了利用前端绘图代码进行长篇叙事和音乐视觉呈现的实现机制。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/opus-5-5-code-creative-projects/demo-pdoom-loop-0ed6ff7e4028.mp4)

PDoomVideo 仓库的原始循环动画片段（约 3 秒，无声），用于查看手绘笔触与角色动作。不是完整 MV。 [作品来源](https://github.com/JohnHeibel/PDoomVideo)

##### 2. ClaudeAnimationBase：标准化动画脚手架

- **项目地址**：[JohnHeibel/ClaudeAnimationBase](https://github.com/JohnHeibel/ClaudeAnimationBase)
- **它做了什么**：在完成 PDoomVideo 后，作者 John Heibel 总结了模型的表现特征，将可复用模块提炼为通用的动画入门套件。
- **运行机制**：套件内置了主角 Clawd 的多视角、情绪表情、肢体构件与镜头辅助模块。用户克隆后在编程 Agent中输入提示词：
  > Read ANIMATION_GUIDE.md, then make a 15-second video of Clawd trying to catch a butterfly.
  模型先生成分镜故事板，分镜头编写代码并渲染出镜头缩略图拼成的检查表（Contact Sheets）来检查画面，最后导出视频。若在无独显环境下运行，由于 p5.brush 的水彩填充计算较慢，作者建议改用扁平填色以提升渲染速度。
