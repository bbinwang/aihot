---
title: "Claude Opus 5.5 写代码画出一支手绘 MV：拆解做法，教你用开源模板自己做"
date: 2026-09-27T16:18:07.167Z
tags: ["会员", "聚合"]
summary: "原文链接 : https://github.com/JohnHeibel/PDoomVideo 来源 : NotinReality（GitHub：JohnHeibel） 发现于 : 小互 · 会员解读 说明 : 本文由 AIHot 自动聚合"
---
> **原文链接**: [https://github.com/JohnHeibel/PDoomVideo](https://github.com/JohnHeibel/PDoomVideo)
> **来源**: NotinReality（GitHub：JohnHeibel）
> **发现于**: [小互 · 会员解读](https://best.xiaohu.ai/article/opus-5-5-clawd-animation-mv/)
> **说明**: 本文由 AIHot 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

## 我正在提高我的 P(doom)

这是 [Claude Opus 5.5 音乐视频《我正在提高我的 P(doom)》](https://youtu.be/8j-hR4fJywU) 的源代码。



<img width="800" height="450" alt="recursion_loop" src="https://github.com/user-attachments/assets/7d6164ff-6706-40bb-bdf5-099d86e583e1" />


[我还用 Claude Opus 5.5 为制作 Claude 动画打造了一个更可靠、更通用的基础。](https://github.com/JohnHeibel/ClaudeAnimationBase) 

<img width="720" height="405" alt="hello_loop" src="https://github.com/user-attachments/assets/d1c91375-3863-45f5-b7da-5e8b9c987b64" />

强烈推荐去看看！

### 致谢

- **灵感来源：** [X 上的这篇帖子](https://x.com/slimer48484/status/2097752569212756134)
- **歌曲：** 据我所知，它来自 [这个 2024 年的 YouTube 视频](https://www.youtube.com/watch?v=uEB5E67vcPA)
- **歌词** 来自 Osmarks，展示了原始的 udio 生成内容以及 [每句歌词的解读](https://docs.osmarks.net/hypha/p(doom)_song_objectively_correct_interpretation)

### 制作方法

这个视频经历了两次生成，都在 Claude Code 中完成：

1. **第一代** ([`legacy/`](legacy/))：Claude Opus 5.5 (Medium)
2. **第二代**（其余部分）：Claude Opus 5.5

**这个仓库里的所有内容都是由模型生成的。** 没有指定场景创意。唯一的指导是：

- 使用 Clawd 角色设计
- 让每句歌词都有有趣的视觉效果和转场

[`ANIMATION_GUIDE.md`](ANIMATION_GUIDE.md) 由 Opus 编写，用于向其并行运行的子代理提供简介。

[`STORYBOARD.md`](STORYBOARD.md) 也是由 Opus 在第一代之后编写的，当时它被指示使用 P5 笔触、让每个场景在视觉上更有趣，并让每个场景都过渡到下一个场景。

### 这里有什么

| 路径 | 说明 |
|---|---|
| [`src/ch/`](src/ch/) | 视频的九个章节，每个章节一个文件 |
| [`src/`](src/) | 共享代码：Clawd、客串角色、道具、歌词和时间线 |
| [`studio.html`](studio.html) | 每一帧都在这个页面上绘制，使用 p5.js 和 p5.brush |
| [`render.mjs`](render.mjs) | 在无头 Chrome 中渲染帧，并用 ffmpeg 编码 MP4 |
| [`STORYBOARD.md`](STORYBOARD.md) | Opus 的逐镜头计划 |
| [`ANIMATION_GUIDE.md`](ANIMATION_GUIDE.md) | Opus 为子代理编写的风格和代码指南 |
| [`legacy/`](legacy/) | 第一代 |

### 渲染

你需要 Node.js、Google Chrome 和 ffmpeg。歌曲包含在 `assets/pdoom.mp3` 中。

```bash
npm install
node render.mjs --frames=0:156.6 --workers=4   # paint every frame into out/frames (resumable)
node render.mjs --encode --out=out/pdoom.mp4   # join the frames and the song into an MP4
```

如果 Chrome 没有安装在默认的 Windows 路径，请添加 `--chrome=<path to chrome>`。
