---
title: "Lemo-Opuscar：43 种通用风格、98 种电影风格，精选 9 支完整样片，让 Claude Opus 学做大片"
date: 2026-10-13T00:00:00.000Z
tags: ["AI 实操", "Claude", "代码视频", "Lemo-Opuscar", "电影风格", "聚合"]
summary: "看全 43 种通用风格与 98 种电影画风，播放本文精选的 9 支完整样片。按作者使用的 Claude Opus 5.5 路线，从安装到第一帧、故事板与成片逐步跟做。"
---
> **原文链接**: [https://x.com/lemomo_ai/status/2108537182273290694](https://x.com/lemomo_ai/status/2108537182273290694)
> **来源**: Lemomo
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/lemo-opuscar-code-filmmaking/) · 2026/10/13
> **说明**: 本文由 AIHot 自动聚合(原文即中文,未翻译)。正文取自小互 AI 解读

---

**已核对**Lemomo10-13 · 20 分钟

想把自己的故事做成 30 秒短片，可以在 Claude Code 中运行 Lemomo 开源的 [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar)。Agent 会读取画风规则与示例源码，编写自己的视频工程代码，实现逐帧绘图、配乐与混音，最后把完整成片和工程文件一起交给你。

项目包含两条入口：**43 种通用风格库**每种均配有规则与代码样片（本文按类别精选 9 支完整样片供直接播放，并非仓库只有 9 支）；**《Opuscar 98》则公开了 98 个电影风格案例**，供复制画风提示词。所有片子均由作者围绕 Claude Opus 5.5 调试生成，换用其他模型效果未作保证。本文把两份清单列全，再带你用 No. 14 威尔士山谷水粉实操。手机适合选风格，实际制作在电脑上完成。

先看作者使用这套工具制作的 6 分 31 秒全代码短片《Opuscar 98》：

[视频/音频](https://pic.xiaohu.ai/jiedu-media/lemo-opuscar-code-filmmaking/opuscar98-5dcc89c424a7.mp4)

《Opuscar 98》原片（6:31，内含完整音频，建议佩戴耳机观看）：每一帧画面、每一个音符、每一刀剪辑均由 Claude Opus 5.5 编写代码合成。

![Lemo-Opuscar 98 种奥斯卡风格海报](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/source-update.jpg)

图 1：作者公布的《Opuscar 98》98 部最佳影片风格总览海报。

作者说，这部原片的音乐、美术与剪辑制作由 Opus 完成，导演工作由自己与 Opus“一人一半”。跟做时，你也需要看预览、判断故事和画面是否达到目标。

你负责给出题材、选画风和检查预览，Agent 负责写代码与运行工具。先从短片开始，能更早发现人物、画法和动作是否合适。

---

### 选风格的两条入口：43 种通用库与 98 种电影图鉴

先根据内容选画风：讲知识可以看白板讲解，讲流程可以看等距信息图；想做温暖的小故事，可以先看水彩或水粉。项目提供了两条入口：

1. **43 种通用风格库**：每种风格都有独立的文件夹、规则说明（`STYLE.md`）和演示说明（`DEMO.md`）与样片源码。在让 Agent 做片时，**直接告诉它中文风格名**即可（例如：“用油画厚涂风格做一支 30 秒短片”）。样片用于参考画法，自己的故事与分镜要重新设计。
2. **98 种电影案例图鉴**：打开官方 [OPUSCAR 98 图鉴页](https://lemomo-ai.github.io/lemo-opuscar/opuscar98/#styles)，在清单上方切到“中文”，找到想要的电影，展开画风提示词并点复制按钮。选择英文时先切回“EN”。复制的是完整画风词（对应数据中的 `prompt_zh` / `prompt_en`），再把它发给 Agent。**注意：只复制画风提示词，不要把电影原片的分镜（shots）或主角 Clawd 当成你自己的故事剧本。**

#### 43 种官方通用风格：9 大类别速查

通用库按照表现形式分为 9 个官方类别，可以先按你想表达的内容挑选：

- **手绘与绘画（7 种）**：蜡笔儿童绘本、水彩笔刷、中国水墨、油画厚涂、一笔画、白板讲解、钢笔淡彩。
- **东方传统（4 种）**：皮影戏、浮世绘、红色窗花剪纸、纸雕灯影。
- **印刷与版画（5 种）**：Risograph 丝网印刷、复古半调案卷、木刻版画、铜版画、丝印旅行海报。
- **图形与排版（7 种）**：瑞士动态排版、60s 间谍片头、装饰艺术、蓝图 / 工程制图、彩色玻璃窗、象形运动图形、ASCII / CRT 终端。
- **信息与发布（5 种）**：数据叙事、等距信息图、暗色科技发布、活体实机录屏、科幻全息界面。
- **卡通与动画（4 种）**：1930s 橡皮管卡通、80 年代赛璐璐动画、科幻情景喜剧卡通、50s 扁平卡通。
- **游戏（4 种）**：16-bit 像素 RPG、HD-2D、微游戏快闪（瓦里奥制造式）、综艺节奏扁平。
- **电影与时代（2 种）**：1920s 默片、后室 / 新怪谈。
- **材质与 3D（5 种）**：积木玩具、纸片立体书、移轴微缩、低多边形等距、玻璃质感产品。

##### 看图挑画风，播放样片看动作

先看样帧的颜色、材质与构图，喜欢这种画法，再播放样片看人物动作、镜头和文字怎样变化。下面列全了 43 种通用风格的官方图片，每类各有一支可直接播放的完整样片，其余风格可以点“打开作者原片”。视频保留了作者原音轨。

点图片可放大。每类附一支可直接播放的作者样片；其他风格保留作者原片入口。

手绘与绘画 · 7 张样帧

![蜡笔儿童绘本官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/crayon-book.jpg)

**蜡笔儿童绘本**The Moon Can't Sleep[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/crayon-book.mp4)

![水彩笔刷官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/watercolor.jpg)

**水彩笔刷**Follow the Rain[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/watercolor.mp4)

![中国水墨官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/ink-wash.jpg)

**中国水墨**The Swordsman and the River[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/ink-wash.mp4)

![油画厚涂官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/impasto.jpg)

**油画厚涂**The Colour of Rain[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/impasto.mp4)

![一笔画官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/one-line.jpg)

**一笔画**The Line That Never Lifted[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/one-line.mp4)

![白板讲解官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/whiteboard.jpg)

**白板讲解**Einstein in Your Pocket[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/whiteboard.mp4)

![钢笔淡彩官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/urban-sketch.jpg)

**钢笔淡彩**Where the Wind Went[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/urban-sketch.mp4)

[视频/音频](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/samples/whiteboard.mp4)

**播放样片：白板讲解 · 1:51**看地图、时钟和公式怎样接续出现；做知识解释时，可以借鉴它让文字与图形互相配合的方式。作者完整样片，保留原音轨；网页使用较小分辨率版本。

东方传统 · 4 张样帧

![皮影戏官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/shadow-puppet.jpg)

**皮影戏**Hou Yi Shoots the Suns[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/shadow-puppet.mp4)

![浮世绘官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/ukiyoe.jpg)

**浮世绘**A Journey Toward the Mountain[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/ukiyoe.mp4)

![红色窗花剪纸官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/papercut-red.jpg)

**红色窗花剪纸**Nian Comes to Town[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/papercut-red.mp4)

![纸雕灯影官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/paper-lantern.jpg)

**纸雕灯影**A Mooncake's Longing[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/paper-lantern.mp4)

[视频/音频](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/samples/paper-lantern.mp4)

**播放样片：纸雕灯影 · 2:02**看层叠纸张、窗灯和月亮怎样组织空间；做节日或思念题材时，可先参考这种透光层次。作者完整样片，保留原音轨；网页使用较小分辨率版本。

印刷与版画 · 5 张样帧

![Risograph 丝网印刷官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/risograph.jpg)

**Risograph 丝网印刷**Sunday Ride[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/risograph.mp4)

![复古半调案卷官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/halftone-dossier.jpg)

**复古半调案卷**Case File: Chubby[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/halftone-dossier.mp4)

![木刻版画官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/woodcut.jpg)

**木刻版画**The Bell Founder[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/woodcut.mp4)

![铜版画官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/engraving.jpg)

**铜版画**The Honeybee, Plate VII[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/engraving.mp4)

![丝印旅行海报官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/silkscreen-poster.jpg)

**丝印旅行海报**Three Trails[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/silkscreen-poster.mp4)

[视频/音频](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/samples/woodcut.mp4)

**播放样片：木刻版画 · 0:58**看黑白刻线与炉火色块怎样区分场景；选择这种画法时，先检查人物和环境是否能从刻线中读出来。作者完整样片，保留原音轨；网页使用较小分辨率版本。

图形与排版 · 7 张样帧

![瑞士动态排版官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/swiss-motion.jpg)

**瑞士动态排版**Five Rules for a Poster[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/swiss-motion.mp4)

![60s 间谍片头官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/spy-titles.jpg)

**60s 间谍片头**The Velvet Cipher[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/spy-titles.mp4)

![装饰艺术官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/art-deco.jpg)

**装饰艺术**Midnight at the Starlight Hotel[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/art-deco.mp4)

![蓝图 / 工程制图官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/blueprint.jpg)

**蓝图 / 工程制图**Patent Pending: The Cloud Catcher[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/blueprint.mp4)

![彩色玻璃窗官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/stained-glass.jpg)

**彩色玻璃窗**The Dragon of the East Window[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/stained-glass.mp4)

![象形运动图形官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/pictogram-motion.jpg)

**象形运动图形**Aichi-Nagoya 2026 — All 43 Sports[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/pictogram-motion.mp4)

![ASCII / CRT 终端官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/ascii-crt.jpg)

**ASCII / CRT 终端**Tranquility.log[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/ascii-crt.mp4)

[视频/音频](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/samples/swiss-motion.mp4)

**播放样片：瑞士动态排版 · 0:44**看网格、数字与字块怎样组成一张海报；做动效排版时，重点比较文字出现的顺序和停留。作者完整样片，保留原音轨；网页使用较小分辨率版本。

信息与发布 · 5 张样帧

![数据叙事官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/dataviz.jpg)

**数据叙事**A Hundred Summers[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/dataviz.mp4)

![等距信息图官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/iso-infographic.jpg)

**等距信息图**From Bean to Cup[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/iso-infographic.mp4)

![暗色科技发布官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/dark-keynote.jpg)

**暗色科技发布**Room to Think[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/dark-keynote.mp4)

![活体实机录屏官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/living-screencast.jpg)

**活体实机录屏**Clawd Moves In[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/living-screencast.mp4)

![科幻全息界面官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/hologram-hud.jpg)

**科幻全息界面**Volt · Spec Scan[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/hologram-hud.mp4)

[视频/音频](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/samples/iso-infographic.mp4)

**播放样片：等距信息图 · 0:59**从咖啡果到货轮、烘焙与萃取，场景连成一条流程；适合参考怎样把步骤放进同一张空间图。作者完整样片，保留原音轨；网页使用较小分辨率版本。

卡通与动画 · 4 张样帧

![1930s 橡皮管卡通官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/rubber-hose.jpg)

**1930s 橡皮管卡通**Coffee Cup Chase[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/rubber-hose.mp4)

![80 年代赛璐璐动画官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/cel-anime-80s.jpg)

**80 年代赛璐璐动画**City Lights, 1987[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/cel-anime-80s.mp4)

![科幻情景喜剧卡通官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/scifi-toon.jpg)

**科幻情景喜剧卡通**Coffee Run[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/scifi-toon.mp4)

![50s 扁平卡通官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/midcentury-toon.jpg)

**50s 扁平卡通**Meet Pip[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/midcentury-toon.mp4)

[视频/音频](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/samples/cel-anime-80s.mp4)

**播放样片：80 年代赛璐璐动画 · 0:59**看摩托骑手经过霓虹街道与日出天际线；先检查角色、车辆与背景在不同镜头中是否一致。作者完整样片，保留原音轨；网页使用较小分辨率版本。

游戏 · 4 张样帧

![16-bit 像素 RPG官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/pixel-rpg.jpg)

**16-bit 像素 RPG**The Last Save Point[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/pixel-rpg.mp4)

![HD-2D官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/hd-2d.jpg)

**HD-2D**The Lampbearer[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/hd-2d.mp4)

![微游戏快闪（瓦里奥制造式）官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/microgame.jpg)

**微游戏快闪（瓦里奥制造式）**Five-Second Astronaut[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/microgame.mp4)

![综艺节奏扁平官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/game-show.jpg)

**综艺节奏扁平**Rhythm of AI, 1997 → 2026[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/game-show.mp4)

[视频/音频](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/samples/pixel-rpg.mp4)

**播放样片：16-bit 像素 RPG · 0:54**看存档页、森林对话和战斗界面怎样接起来；像素风格也需要可读的角色和UI。作者完整样片，保留原音轨；网页使用较小分辨率版本。

电影与时代 · 2 张样帧

![1920s 默片官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/silent-film.jpg)

**1920s 默片**The Runaway Loaf[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/silent-film.mp4)

![后室 / 新怪谈官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/backrooms.jpg)

**后室 / 新怪谈**Night Shift Orientation[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/backrooms.mp4)

[视频/音频](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/samples/silent-film.mp4)

**播放样片：1920s 默片 · 0:54**看厨师追赶面包、字幕卡与人物近景的节奏；没有口型对白时，也可以靠动作和镜头交代故事。作者完整样片，保留原音轨；网页使用较小分辨率版本。

材质与 3D · 5 张样帧

![积木玩具官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/brick-toy.jpg)

**积木玩具**Rocket from Spare Parts[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/brick-toy.mp4)

![纸片立体书官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/paper-popup.jpg)

**纸片立体书**Pip's Paper Adventure[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/paper-popup.mp4)

![移轴微缩官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/tilt-shift.jpg)

**移轴微缩**Toy Town Rush Hour[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/tilt-shift.mp4)

![低多边形等距官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/lowpoly-island.jpg)

**低多边形等距**The Island That Grew[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/lowpoly-island.mp4)

![玻璃质感产品官方样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/general/glass-product.jpg)

**玻璃质感产品**Aura — Hear the Light[打开作者原片 ↗](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/glass-product.mp4)

[视频/音频](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/samples/glass-product.mp4)

**播放样片：玻璃质感产品 · 0:32**看耳机盒、耳机单体和内部零件的分解，以及玻璃高光；产品展示可以参考从整体到细节再回到全貌的顺序。作者完整样片，保留原音轨；网页使用较小分辨率版本。

#### 98 个电影风格，按画面类型选

以下按画面媒介与用途整理，编号、影片名和风格名沿用原清单；同一种风格也可能适合其他题材。官方数据中，二维（2D）有 77 条，2.5D 有 4 条，三维（3D）有 17 条；2.5D 指把三维模型渲染成平面层。展开下方类别后，既能查看每部电影对应的样帧，也能查阅完整风格名；选中后，到上方官方图鉴链接复制对应的画风提示词。

手绘与绘画 · 24 种

![乱世佳人：Technicolor 厚涂油画样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-12.jpg)

12 · 乱世佳人

![蝴蝶梦：哥特炭笔画样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-13.jpg)

13 · 蝴蝶梦

![青山翠谷：威尔士山谷水粉样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-14.jpg)

14 · 青山翠谷

![君子协定：40 年代杂志铅笔插画样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-20.jpg)

20 · 君子协定

![一个美国人在巴黎：杜飞水彩芭蕾样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-24.jpg)

24 · 一个美国人在巴黎

![码头风云：本·沙恩社会现实主义样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-27.jpg)

27 · 码头风云

![阿拉伯的劳伦斯：Terpning 史诗海报水粉样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-35.jpg)

35 · 阿拉伯的劳伦斯

![窈窕淑女：Bob Peak 时装插画样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-37.jpg)

37 · 窈窕淑女

![日月精忠：霍尔拜因都铎肖像油画样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-39.jpg)

39 · 日月精忠

![教父：伦勃朗顶光明暗油画样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-45.jpg)

45 · 教父

![飞越疯人院：霍珀式美国写实油画样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-48.jpg)

48 · 飞越疯人院

![猎鹿人：安德鲁·怀斯蛋彩样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-51.jpg)

51 · 猎鹿人

![普通人：秋日透明水彩样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-53.jpg)

53 · 普通人

![野战排：越战随军速写 · 钢笔淡彩样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-59.jpg)

59 · 野战排

![末代皇帝：工笔重彩 · 绢本宫廷画样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-60.jpg)

60 · 末代皇帝

![雨人：80 年代喷枪插画 + 雷蒙的计数样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-61.jpg)

61 · 雨人

![为黛西小姐开车：洛克威尔式油画插画样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-62.jpg)

62 · 为黛西小姐开车

![与狼共舞：邓巴日记 · 铅笔 + 透明水彩样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-63.jpg)

63 · 与狼共舞

![不可饶恕：雷明顿西部油画 · 晚霞与雨夜样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-65.jpg)

65 · 不可饶恕

![英国病人：探险家剪贴本水彩样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-69.jpg)

69 · 英国病人

![莎翁情史：希利亚德伊丽莎白细密画样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-71.jpg)

71 · 莎翁情史

![指环王：王者无敌：艾伦·李式水彩 + 托尔金地图样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-76.jpg)

76 · 指环王：王者无敌

![月光男孩：月光蓝调油画肖像样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-89.jpg)

89 · 月光男孩

![无依之地：魔幻时刻色粉画样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-93.jpg)

93 · 无依之地

画面有笔触、纸张或颜料感，适合温暖故事、旅行、人物与情绪短片。

- 12 · 乱世佳人：Technicolor 厚涂油画
- 13 · 蝴蝶梦：哥特炭笔画
- 14 · 青山翠谷：威尔士山谷水粉
- 20 · 君子协定：40 年代杂志铅笔插画
- 24 · 一个美国人在巴黎：杜飞水彩芭蕾
- 27 · 码头风云：本·沙恩社会现实主义
- 35 · 阿拉伯的劳伦斯：Terpning 史诗海报水粉
- 37 · 窈窕淑女：Bob Peak 时装插画
- 39 · 日月精忠：霍尔拜因都铎肖像油画
- 45 · 教父：伦勃朗顶光明暗油画
- 48 · 飞越疯人院：霍珀式美国写实油画
- 51 · 猎鹿人：安德鲁·怀斯蛋彩
- 53 · 普通人：秋日透明水彩
- 59 · 野战排：越战随军速写 · 钢笔淡彩
- 60 · 末代皇帝：工笔重彩 · 绢本宫廷画
- 61 · 雨人：80 年代喷枪插画 + 雷蒙的计数
- 62 · 为黛西小姐开车：洛克威尔式油画插画
- 63 · 与狼共舞：邓巴日记 · 铅笔 + 透明水彩
- 65 · 不可饶恕：雷明顿西部油画 · 晚霞与雨夜
- 69 · 英国病人：探险家剪贴本水彩
- 71 · 莎翁情史：希利亚德伊丽莎白细密画
- 76 · 指环王：王者无敌：艾伦·李式水彩 + 托尔金地图
- 89 · 月光男孩：月光蓝调油画肖像
- 93 · 无依之地：魔幻时刻色粉画

版画与印刷海报 · 19 种

![百老汇旋律：黑金银装饰艺术歌舞海报样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-02.jpg)

02 · 百老汇旋律

![西线无战事：珂勒惠支式反战木刻样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-03.jpg)

03 · 西线无战事

![乱世春秋：慕夏新艺术装饰画样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-06.jpg)

06 · 乱世春秋

![叛舰喋血记：海军部海图铜版画样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-08.jpg)

08 · 叛舰喋血记

![左拉传：报纸活字印刷 + 线刻插图样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-10.jpg)

10 · 左拉传

![浮生若梦：WPA 丝网海报样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-11.jpg)

11 · 浮生若梦

![忠勇之家：英国战时石印海报样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-15.jpg)

15 · 忠勇之家

![国王班底：南方竞选木活字海报样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-22.jpg)

22 · 国王班底

![戏王之王：Strobridge 马戏团彩色石印样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-25.jpg)

25 · 戏王之王

![金粉世界：罗特列克美好年代石印样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-31.jpg)

31 · 金粉世界

![汤姆·琼斯：手工上色讽刺铜版画样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-36.jpg)

36 · 汤姆·琼斯

![炎热的夜晚：三色 Risograph 夜景样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-40.jpg)

40 · 炎热的夜晚

![午夜牛郎：沃霍尔照片丝网 · Double Elvis样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-42.jpg)

42 · 午夜牛郎

![巴顿将军：二战战争债券石印海报样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-43.jpg)

43 · 巴顿将军

![烈火战车：1924 巴黎奥运石印海报样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-54.jpg)

54 · 烈火战车

![沉默的羔羊：手工上色的博物学铜版画样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-64.jpg)

64 · 沉默的羔羊

![无间行者：波士顿红砖墙模板涂鸦样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-79.jpg)

79 · 无间行者

![聚焦：缩微胶片阅读机 · 报纸网点样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-88.jpg)

88 · 聚焦

![绿皮书：60 年代亚麻纹明信片样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-91.jpg)

91 · 绿皮书

色块、刻线和印刷网点突出，适合复古片头、历史叙事、宣传海报动效。

- 02 · 百老汇旋律：黑金银装饰艺术歌舞海报
- 03 · 西线无战事：珂勒惠支式反战木刻
- 06 · 乱世春秋：慕夏新艺术装饰画
- 08 · 叛舰喋血记：海军部海图铜版画
- 10 · 左拉传：报纸活字印刷 + 线刻插图
- 11 · 浮生若梦：WPA 丝网海报
- 15 · 忠勇之家：英国战时石印海报
- 22 · 国王班底：南方竞选木活字海报
- 25 · 戏王之王：Strobridge 马戏团彩色石印
- 31 · 金粉世界：罗特列克美好年代石印
- 36 · 汤姆·琼斯：手工上色讽刺铜版画
- 40 · 炎热的夜晚：三色 Risograph 夜景
- 42 · 午夜牛郎：沃霍尔照片丝网 · Double Elvis
- 43 · 巴顿将军：二战战争债券石印海报
- 54 · 烈火战车：1924 巴黎奥运石印海报
- 64 · 沉默的羔羊：手工上色的博物学铜版画
- 79 · 无间行者：波士顿红砖墙模板涂鸦
- 88 · 聚焦：缩微胶片阅读机 · 报纸网点
- 91 · 绿皮书：60 年代亚麻纹明信片

插画、卡通与游戏 · 9 种

![一夜风流：30 年代黑白橡皮管卡通样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-07.jpg)

07 · 一夜风流

![彗星美人：赫希菲尔德一笔画漫画样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-23.jpg)

23 · 彗星美人

![环游地球八十天：50 年代 UPA 现代主义卡通样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-29.jpg)

29 · 环游地球八十天

![骗中骗：《星期六晚邮报》插画样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-46.jpg)

46 · 骗中骗

![安妮·霍尔：《纽约客》单格漫画 · 墨线淡彩样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-50.jpg)

50 · 安妮·霍尔

![克莱默夫妇：儿童蜡笔画样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-52.jpg)

52 · 克莱默夫妇

![百万美元宝贝：16-bit 像素格斗游戏样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-77.jpg)

77 · 百万美元宝贝

![贫民窟的百万富翁：答题节目演播室 + 孟买橙青样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-81.jpg)

81 · 贫民窟的百万富翁

![逃离德黑兰：杰克·柯比 70 年代漫画页样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-85.jpg)

85 · 逃离德黑兰

角色与图形更概括，适合轻松故事、儿童内容、喜剧或游戏感短片。

- 07 · 一夜风流：30 年代黑白橡皮管卡通
- 23 · 彗星美人：赫希菲尔德一笔画漫画
- 29 · 环游地球八十天：50 年代 UPA 现代主义卡通
- 46 · 骗中骗：《星期六晚邮报》插画
- 50 · 安妮·霍尔：《纽约客》单格漫画 · 墨线淡彩
- 52 · 克莱默夫妇：儿童蜡笔画
- 77 · 百万美元宝贝：16-bit 像素格斗游戏
- 81 · 贫民窟的百万富翁：答题节目演播室 + 孟买橙青
- 85 · 逃离德黑兰：杰克·柯比 70 年代漫画页

老照片与电影质感 · 12 种

![壮志千秋：1889 棕褐蛋白印相全景样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-04.jpg)

04 · 壮志千秋

![卡萨布兰卡：好莱坞片厂柔光黑白样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-16.jpg)

16 · 卡萨布兰卡

![乱世忠魂：高调海滩黑白银幕样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-26.jpg)

26 · 乱世忠魂

![君子好逑：50 年代电视显像管录像样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-28.jpg)

28 · 君子好逑

![母女情深：家庭相册宝丽来样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-56.jpg)

56 · 母女情深

![辛德勒的名单：黑白胶片 · 唯一的红大衣样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-66.jpg)

66 · 辛德勒的名单

![美国丽人：郊区对称电影画面 + DV 录像样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-72.jpg)

72 · 美国丽人

![撞车：洛杉矶夜景光轨 + 飘雪样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-78.jpg)

78 · 撞车

![国王的演讲：斑驳墙 + 金色广播间样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-83.jpg)

83 · 国王的演讲

![艺术家：2011 精致默片黑白样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-84.jpg)

84 · 艺术家

![为奴十二年：显影中的银版老照片样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-86.jpg)

86 · 为奴十二年

![阿诺拉：雪夜霓虹样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-97.jpg)

97 · 阿诺拉

强调黑白、老照片、胶片、电视或霓虹气氛，适合回忆、纪实感和城市故事。

- 04 · 壮志千秋：1889 棕褐蛋白印相全景
- 16 · 卡萨布兰卡：好莱坞片厂柔光黑白
- 26 · 乱世忠魂：高调海滩黑白银幕
- 28 · 君子好逑：50 年代电视显像管录像
- 56 · 母女情深：家庭相册宝丽来
- 66 · 辛德勒的名单：黑白胶片 · 唯一的红大衣
- 72 · 美国丽人：郊区对称电影画面 + DV 录像
- 78 · 撞车：洛杉矶夜景光轨 + 飘雪
- 83 · 国王的演讲：斑驳墙 + 金色广播间
- 84 · 艺术家：2011 精致默片黑白
- 86 · 为奴十二年：显影中的银版老照片
- 97 · 阿诺拉：雪夜霓虹

文字、图解与工程制图 · 6 种

![失去的周末：打字机字符画样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-18.jpg)

18 · 失去的周末

![桂河大桥：氰版工程蓝图样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-30.jpg)

30 · 桂河大桥

![桃色公寓：Saul Bass 线条片头 · 黑白样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-33.jpg)

33 · 桃色公寓

![美丽心灵：窗上公式与黑板粉笔 + 金色连线样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-74.jpg)

74 · 美丽心灵

![拆弹部队：拆弹教范线图样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-82.jpg)

82 · 拆弹部队

![寄生虫：建筑剖面轴测图样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-92.jpg)

92 · 寄生虫

文字、地图、公式或剖面图能参与叙事，适合知识解释、空间关系与过程说明。

- 18 · 失去的周末：打字机字符画
- 30 · 桂河大桥：氰版工程蓝图
- 33 · 桃色公寓：Saul Bass 线条片头 · 黑白
- 74 · 美丽心灵：窗上公式与黑板粉笔 + 金色连线
- 82 · 拆弹部队：拆弹教范线图
- 92 · 寄生虫：建筑剖面轴测图

装饰、剪影与传统工艺 · 7 种

![与我同行：逆光哥特彩色玻璃窗样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-17.jpg)

17 · 与我同行

![甘地传：拉贾斯坦手工木刻印花布样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-55.jpg)

55 · 甘地传

![莫扎特传：洛可可剪影 · 烛光金色歌剧院样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-57.jpg)

57 · 莫扎特传

![勇敢的心：泥金手抄本 · 贴金细密画样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-68.jpg)

68 · 勇敢的心

![角斗士：罗马地面马赛克样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-73.jpg)

73 · 角斗士

![芝加哥：福斯舞台：红黑聚光剪影样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-75.jpg)

75 · 芝加哥

![健听女孩：鲸牙骨雕（Scrimshaw）样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-94.jpg)

94 · 健听女孩

用玻璃、印花、剪影、贴金或雕刻的材料特征组织画面，适合文化题材与舞台感表达。

- 17 · 与我同行：逆光哥特彩色玻璃窗
- 55 · 甘地传：拉贾斯坦手工木刻印花布
- 57 · 莫扎特传：洛可可剪影 · 烛光金色歌剧院
- 68 · 勇敢的心：泥金手抄本 · 贴金细密画
- 73 · 角斗士：罗马地面马赛克
- 75 · 芝加哥：福斯舞台：红黑聚光剪影
- 94 · 健听女孩：鲸牙骨雕（Scrimshaw）

立体纸艺与平面层次 · 4 种

![黄金时代：画报新闻摄影半调跨页样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-19.jpg)

19 · 黄金时代

![雾都孤儿：维多利亚玩具纸剧场样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-41.jpg)

41 · 雾都孤儿

![教父2：手工上色棕褐老照片样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-47.jpg)

47 · 教父2

![阿甘正传：立体书 · 真实书桌上的纸艺样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-67.jpg)

67 · 阿甘正传

官方标为2.5D：3D模型渲染为平面层。适合纸剧场、立体书与有景深的平面画面。

- 19 · 黄金时代：画报新闻摄影半调跨页
- 41 · 雾都孤儿：维多利亚玩具纸剧场
- 47 · 教父2：手工上色棕褐老照片
- 67 · 阿甘正传：立体书 · 真实书桌上的纸艺

3D空间与电影运镜 · 17 种

![翼：默片 3D 空战 · 正色片黑白 + 琥珀染色样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-01.jpg)

01 · 翼

![大饭店：米高梅银色黑白 3D 大堂样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-05.jpg)

05 · 大饭店

![歌舞大王齐格飞：银色黑白 3D 螺旋婚礼蛋糕舞台样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-09.jpg)

09 · 歌舞大王齐格飞

![王子复仇记：黑白 3D 雾中城堡样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-21.jpg)

21 · 王子复仇记

![宾虚：3D 大竞技场战车赛 · 65mm 史诗样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-32.jpg)

32 · 宾虚

![西区故事：特艺七彩 3D 舞台样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-34.jpg)

34 · 西区故事

![音乐之声：绘本感 3D 阿尔卑斯航拍样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-38.jpg)

38 · 音乐之声

![法国贩毒网：高架铁下追车 · 16mm 颗粒 3D样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-44.jpg)

44 · 法国贩毒网

![洛奇：费城台阶日出 3D · 35mm 调色样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-49.jpg)

49 · 洛奇

![走出非洲：3D 双翼机飞越东非裂谷样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-58.jpg)

58 · 走出非洲

![泰坦尼克号：蓝图显影成 3D 实景样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-70.jpg)

70 · 泰坦尼克号

![老无所依：3D 西德州荒原黄昏（迪金斯光）样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-80.jpg)

80 · 老无所依

![鸟人：3D 后台走廊长镜头样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-87.jpg)

87 · 鸟人

![水形物语：3D 水下青绿焦散样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-90.jpg)

90 · 水形物语

![瞬息全宇宙：光线步进多元宇宙跳切样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-95.jpg)

95 · 瞬息全宇宙

![奥本海默：3D 粒子火球 · IMAX 颗粒样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-96.jpg)

96 · 奥本海默

![一战再战：3D 起伏公路追车 · 长焦压缩样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/opuscar98/no-98.jpg)

98 · 一战再战

利用空间纵深、航拍、追车或长镜头，适合需要明显空间运动的题材；先做短动作验证。

- 01 · 翼：默片 3D 空战 · 正色片黑白 + 琥珀染色
- 05 · 大饭店：米高梅银色黑白 3D 大堂
- 09 · 歌舞大王齐格飞：银色黑白 3D 螺旋婚礼蛋糕舞台
- 21 · 王子复仇记：黑白 3D 雾中城堡
- 32 · 宾虚：3D 大竞技场战车赛 · 65mm 史诗
- 34 · 西区故事：特艺七彩 3D 舞台
- 38 · 音乐之声：绘本感 3D 阿尔卑斯航拍
- 44 · 法国贩毒网：高架铁下追车 · 16mm 颗粒 3D
- 49 · 洛奇：费城台阶日出 3D · 35mm 调色
- 58 · 走出非洲：3D 双翼机飞越东非裂谷
- 70 · 泰坦尼克号：蓝图显影成 3D 实景
- 80 · 老无所依：3D 西德州荒原黄昏（迪金斯光）
- 87 · 鸟人：3D 后台走廊长镜头
- 90 · 水形物语：3D 水下青绿焦散
- 95 · 瞬息全宇宙：光线步进多元宇宙跳切
- 96 · 奥本海默：3D 粒子火球 · IMAX 颗粒
- 98 · 一战再战：3D 起伏公路追车 · 长焦压缩

---

### 零基础第一步：从打开终端到装好工具

许多读者卡在第一步，是因为分不清“系统终端”和“Claude 对话界面”。跟着以下步骤操作，即可建立起清晰的运行环境：

#### 1. 先确认账号和电脑能用

- **账号要求**：需要具备使用 Claude Code 权限的账号（支持 Claude Code 的 Claude 订阅，或充值有额度的 Anthropic Console 开发者账号）。
- **工具认知**：官方 Claude Code 原生安装采用独立二进制，本身不需要 Node.js；**但 Lemo-Opuscar 的媒体后端**（截图无头浏览器、配音脚本、混音器）需要本地安装有 `Node 20+`、`Python 3.11+`（或 uv）以及 **ffmpeg**。如果电脑上还没装这些工具，先不用着急，后文提供了一段自检指令让 Agent 协助配置。

#### 2. 打开系统终端

- **Mac 用户**：按键盘上的快捷键 `Command + 空格` 调出聚焦搜索（Spotlight），输入 `终端` 或 `Terminal` 并回车。
- **Windows 用户**：项目底层大量依赖 Bash 脚本（如 `setup.sh` 和 `mux.sh`），因此强烈建议使用 **WSL2（Ubuntu）** 路线。在 WSL 终端中操作，不要在普通 PowerShell 中直接混跑 Mac/Linux 的 Bash 命令。

#### 3. 安装 Claude Code 并验证

在系统终端中粘贴官方原生安装命令并回车（如果以前已经安装过，直接跳过本步）：

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

安装完成后，新开一个终端窗口，再输入以下命令进行验证：

```bash
claude --version
```

**必须看到类似 `2.1.x (Claude Code)` 的版本号输出后，再继续下一步。** 如果提示找不到命令，请关闭当前终端窗口重新打开一次。

接着输入 `claude` 并回车，根据终端提示在浏览器中完成登录授权。

#### 4. 安装 Lemo-Opuscar 插件（在系统终端执行）

这是许多新手最容易混淆的地方：**安装插件的两条命令必须在操作系统终端中运行，不要把它们当作自然语言聊天发给 Claude Code！**

如果你刚才启动了 `claude`，输入 `/exit` 退出会话，回到系统终端提示符下，依次粘贴执行：

```bash
claude plugin marketplace add lemomo-ai/lemo-opuscar
claude plugin install lemo-opuscar@lemolab
```

两条命令分别添加插件来源、安装 Lemo-Opuscar。看到成功提示后继续；如果出现错误，先按文末报错方法处理。在第一次做片时，它会自动在你的主目录下建立 `~/lemo-opuscar` 共享库，把通用规则和渲染工具缓存好。

#### 5. 新建专属短片目录并启动

为了让生成的代码、海报和视频整齐有序，不要在根目录或乱七八糟的下载文件夹里直接开工。在终端中创建一个专门的英文路径并启动 Claude：

```bash
mkdir -p ~/Movies/lemo-first-film
cd ~/Movies/lemo-first-film
claude
```

看到 Claude Code 的欢迎界面、模型名称和当前文件夹后，就进入了 Agent 会话。从这里开始，把下方的做片请求发给它，而不是当作终端命令执行。

在 Claude Code 会话中输入 `/model`，从菜单中选择账号实际可用的 Opus 5.5。注意会话默认模型不一定就是 Opus 5.5（不同账号类型、企业策略或云端供应商的默认模型各异）。如果菜单中找不到 Opus 5.5，请检查账号订阅权限、企业模型限制或供应商可用模型范围。全套风格库均按 Opus 5.5 调试，换用其他模型时不保证原片画质与效果，建议先出一帧检查画面合格后再继续。详见 [Claude Code 模型设置](https://code.claude.com/docs/en/model-config)。

#### 6. 环境体检：双语环境自检模板

如果不确定电脑上是否已经装好 Node 20+、Python 3.11+ 和 ffmpeg，**可以直接把下面这段请求发给 Claude Code**。Agent 会自动检查当前系统的环境，并根据你的操作系统给出精确的补齐指令，无需盲目复制网络上的安装命令：

查看环境自检双语模板（点击折叠 / 展开）

**中文指令**：

```prompt
你好！我准备使用 lemo-opuscar 制作短片。请先不要开始写剧本，帮我检查当前系统的制片底层依赖：
1. 检查 Node.js 版本是否达到 20+，并检查 Git 是否可用；
2. 检查 Python 版本是否达到 3.11+（或是否安装了 uv）；
3. 检查系统是否安装了 ffmpeg。
如果缺少任何工具，请给出适配我当前操作系统的安装命令和执行位置。安装完成后重新检查版本，全部通过后再告诉我可以开始。
```

**English Prompt**:

```prompt
Hi! I am preparing to produce a short film using lemo-opuscar. Before writing any script, please check my system dependencies for the media pipeline:
1. Verify Node.js is at version 20 or higher and Git is available;
2. Verify if Python is at version 3.11+ (or if uv is installed);
3. Verify if ffmpeg is installed and accessible.
If a dependency is missing, give installation commands for my operating system and say where to run them. Recheck the versions after installation and tell me to proceed only when all checks pass.
```

---

### 手把手做片示范：以 30 秒《深夜面馆》为例

下面以自拟的 30 秒短片《深夜面馆》为例，演示从画风选择到成片交付的完整交互过程。本例采用 **No. 14 威尔士山谷水粉** 画风，默认规格为 1920×1080、24 fps。

《深夜面馆》是本文设计的跟做例子；下面给的是请求模板，没有把它写成已生成的成片。换成你的故事时，保持先看预览、再继续制作的顺序。

#### 第一轮：画风原件 + “先出一帧”验证

拿到画风后，**第一次尝试先检查一帧**。因为一旦基础材质、颜色比例或人物造型不合预期，重新渲染 30 秒视频需要耗费大量时间和 Token。先把完整画风原件与你的题材结合，要求用代码绘制一帧静态画面。

可以用这个组合台换题材、复制原件与单帧请求；想完整照做《深夜面馆》，用紧接着的模板。中文和英文任选一种发送。

把画风留住，把故事换成你的

选一条真实画风原件，填自己的题材；下方把原件与「先一帧」请求分开。这里组合文字，不调用 AI 或生成视频。

画风
提示词语言
你的题材

威尔士山谷水粉 · 2D
完整画风原件 + 单帧请求（选择一种语言发送）
【完整画风原件】
仿威尔士画家 Kyffin Williams 的不透明水粉。方向性笔触宽为画幅宽 1/80–1/40，长是宽的 2–5 倍，边缘毛糙，完全覆盖；房子、墙、山脊用断续深色短线勾边；暗山上刮几笔亮绿或灰蓝。色板：天空和光淡金 #F1C565（别成芥末黄），田野绿 #86A03F，暗部煤黑 #1D1B1E，远山和水面灰蓝 #48505E，小点缀黄 #F6CF2F，其他颜色由这几色调出；故事围绕的那个主角用 #D97757，至少占画面高八分之一。田野和天空偏亮（约六成），山和房子偏暗。暖色调色不超过一成，暗角，颗粒。默认傍晚低角度侧光，田野受光，山脊有轮廓光。从高处真透视取景，一条路把视线引下去；小房子（或墙、石块）顺山坡一级级排开。动起来：烟或云循环飘动，横向跟拍。避免：水彩透明感、矢量平涂、发暗发脏。

【本文补充：先一帧请求】
请按上面的画风做一帧真实代码渲染的预览，题材是：深夜面馆里，老李给最后一位客人煮面。
主角与故事由我的题材决定，不沿用样片的 Clawd 或原电影剧情。
先展示这一帧及对应源码位置，暂不制作整片。单帧先核对材质、用色、光线和构图，运镜留到后续。
画风原件未删改；请求模板为本文补充。

第一轮：“先出一帧”双语请求模板（点击折叠 / 展开）

**中文指令**：

```prompt
【完整画风原件】
仿威尔士画家 Kyffin Williams 的不透明水粉。方向性笔触宽为画幅宽 1/80–1/40，长是宽的 2–5 倍，边缘毛糙，完全覆盖；房子、墙、山脊用断续深色短线勾边；暗山上刮几笔亮绿或灰蓝。色板：天空和光淡金 #F1C565（别成芥末黄），田野绿 #86A03F，暗部煤黑 #1D1B1E，远山和水面灰蓝 #48505E，小点缀黄 #F6CF2F，其他颜色由这几色调出；故事围绕的那个主角用 #D97757，至少占画面高八分之一。田野和天空偏亮（约六成），山和房子偏暗。暖色调色不超过一成，暗角，颗粒。默认傍晚低角度侧光，田野受光，山脊有轮廓光。从高处真透视取景，一条路把视线引下去；小房子（或墙、石块）顺山坡一级级排开。动起来：烟或云循环飘动，横向跟拍。避免：水彩透明感、矢量平涂、发暗发脏。

【本文补充：先一帧请求】
请使用 lemo-opuscar 技能，在当前工作文件夹下建立 midnight-noodles 工程。采用上述《青山翠谷》的不透明水粉画风规则，先不要生成完整短片，用真实的前端绘图代码为我绘制一帧静态画面：
【题材场景】深夜雨后狭窄胡同里的小面馆。
【关键构图】老厨师老李（围裙使用主角专属色 #D97757，高度至少占画面 1/4）站在沸腾的面锅前，用竹筷挑起热气腾腾的细面；店内挂着一盏淡金暖灯（#F1C565），照亮升腾的蒸汽与粗木案板；窗外是深煤黑（#1D1B1E）的湿润石板路与灰蓝（#48505E）远墙。
【任务目标】请编写 index.html 渲染该静态帧，展示实际渲染出的图片绝对路径与源码位置，暂不制作整片。保持水粉的厚重刮刀色块与断续勾边，将光线合理转化为夜景光池，避免半透明水彩与塑料平涂。
```

**English Prompt**:

```prompt
[Complete Style Rules]
Opaque gouache after Welsh painter Kyffin Williams. Directional strokes 1/80-1/40 of frame width, 2-5 times as long, ragged, fully covering; broken dark dashes outline buildings, walls and ridges; dark hills flecked with lighter green or slate knife marks. Palette: sky and light pale gold #F1C565 (not mustard), fields green #86A03F, darks coal #1D1B1E, far hills and water slate #48505E, small accents yellow #F6CF2F, other colours mixed from these; the hero the story centres on #D97757, at least 1/8 of frame height. Fields and sky light (~60%), hills and buildings dark. Warm grade under 10%, vignette, grain. Default low late-afternoon side light: fields lit, ridges rim-lit. From high ground in true perspective, a path leading the eye down; small repeated buildings (or walls, rocks) stepping along slopes. Motion: looping smoke or cloud, a lateral track. Avoid: watercolour transparency, vector fills, mud.

[Single Frame Request]
Use the lemo-opuscar skill. Create the midnight-noodles project inside the current working folder and apply the Welsh Valley Gouache style above. Do not generate the full film yet; render a single static frame using real drawing code:
[Subject & Scene] A small noodle shop in a narrow alley on a wet night.
[Key Composition] The old chef Lao Li (wearing an apron in #D97757, occupying at least 1/4 of frame height) stands before a boiling pot lifting steaming noodles; a warm hanging lantern in pale gold (#F1C565) lights up the steam and wooden counter; outside are wet cobblestone streets in coal dark (#1D1B1E) and distant walls in slate blue (#48505E).
[Task] Write index.html to render this still. Report the absolute path of the rendered image and source code, without producing the full film yet. Maintain opaque gouache strokes and broken outlines, adapt lighting for a night scene, and avoid watercolor transparency or flat vector fills.
```

![No. 14 青山翠谷原片画面参考](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/film-14.jpg)

作者《青山翠谷》原片画面参照（非面馆生成成果）：对照观察厚实的不透明笔触、鲜明的主体剪影，以及暗部中依然分明的煤黑与灰蓝层次。

##### 怎么看这一帧好不好？

Agent 执行后会在终端返回渲染出的图片路径（例如 `~/Movies/lemo-first-film/midnight-noodles/stills/t_0.jpg`；实际文件名以 Agent 返回的路径为准）。Mac 上打开 Finder，按 `Command + Shift + G`，粘贴 Agent 返回的图片路径并回车，就能找到它；再用预览打开。若 Agent 只给了文件名，先让它补上完整路径。按以下要点检查：

- **合格标准**：面锅上升腾的蒸汽由厚实的白色与淡金刮色组成，有明显笔触质感；老李的人物剪影清晰，衣服色号符合 `#D97757`；窗外雨夜虽暗，但煤黑路面与灰蓝墙面层次可读。
- **不合格表现**：蒸汽变成了半透明渐变水彩；人物和背景变成了大面积纯色平涂（塑料矢量感）；或者整个画面黑作一团、泥泞脏污。如果画面不合格，直接告诉 Agent 哪里发虚、哪里平涂，让它在这一帧上重新调整。

---

#### 第二轮：给故事、声音要求，并索取故事板

单帧画质确认合格后，把完整的故事剧情、镜头节奏与声音需求交给 Agent。**此时明确要求先看 6–9 个关键镜头拼成的故事板（Storyboard）与分镜方案（TREATMENT.md），不要跳过确认直接开跑。**

第二轮：故事与故事板请求模板（点击折叠 / 展开）

**中文指令**：

```prompt
单帧画面的水粉笔触与用色非常满意！请以此画风为基础，规划 30 秒短片《深夜面馆》：
【故事弧线】
- 起（0–3 秒）：深夜小巷冷雨寂静，突然，面馆挑帘亮起一团淡金暖光（视觉钩子）。
- 承（3–18 秒）：老李熟练地揉面、滚水沸腾、挑起银丝细面，店内暖意渐浓。
- 转（18–24 秒）：一名疲惫的雨夜加班族推门而入，门上风铃脆响，带来一身风雨寒气。
- 合（24–30 秒）：老李端上一碗热汤面，年轻人低头喝汤露出释怀笑容；镜头慢慢拉出小店，暖光映亮湿润小巷。
【视听与导演要求】
1. 本例不需要旁白或对白，配乐采用民间拨弦乐器（物理建模），搭配环境雨声、沸水煮面拟音与风铃声；
2. 先为我生成包含 6–9 个关键镜头的故事板拼图（Storyboard）与 TREATMENT.md，汇报各镜头的景别与秒数规划；
3. 先停在这里等我确认故事板，不要直接开始全片渲染。
```

**English Prompt**:

```prompt
The gouache texture and palette in the static frame look great! Please proceed to plan the 30-second short film "Midnight Noodles" using this style:
[Story Arc]
- Hook (0–3s): A quiet alley in the night rain; suddenly, the noodle shop's warm lantern lights up.
- Setup (3–18s): Lao Li kneads dough, boils water, and lifts steaming noodles; warm atmosphere builds up.
- Turn (18–24s): A weary commuter pushes open the door; the wind chime rings against the cold rain outside.
- Resolution (24–30s): Lao Li serves a hot bowl of noodles; the customer smiles; camera slowly pulls back, framing the warm glow over the alley.
[Audio & Directing]
1. No narration or dialogue is needed for this example. Use folk plucked string instruments for the score with ambient rain, boiling water foley, and a wind chime;
2. Generate a contact sheet storyboard with 6–9 key frames and TREATMENT.md, showing shot types and duration breakdown;
3. Pause here and wait for my approval before full rendering.
```

##### 怎么看故事板好不好？

![10.2 秒 · 人物与环境](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/guide/silent-context.jpg)10.2 秒 · 人物与环境
![16.9 秒 · 追逐动作](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/guide/silent-action.jpg)16.9 秒 · 追逐动作
![44.0 秒 · 人物反应](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/guide/silent-reaction.jpg)44.0 秒 · 人物反应

画面来自作者《The Runaway Loaf》原片。并列的是三个实际时刻，用来观察故事变化；它们不是《深夜面馆》的生成结果。

这三幅原片画面依次展示人物与环境、追逐动作、人物反应。看你自己的故事板时，也要能顺着镜头读出事情怎样发生、人物有什么变化。Agent 会把关键帧拼成一张图（例如 `storyboard.jpg`），再按以下检查点核对：

- 机位景别是否有变化（全景交代环境、中景看人物、特写看煮面；推、拉、跟拍等运镜是否服务故事，而非全片只用一个机位）；
- 人物与道具在不同镜头中的视觉比例是否稳定，不会忽大忽小；
- 故事的转折点（加班族进门）是否有清晰的镜头停顿让观众理解。

---

#### 第三轮：下达开工指令与成片交付物检查

对故事板的镜头调度和时间规划满意后，给 Agent 下达正式开工指令：

第三轮：开工渲染双语指令（点击折叠 / 展开）

**中文指令**：

```prompt
故事板分镜与节奏确认无误，请正式启动全片合成：
1. 渲染输出标准 1920×1080、24 fps 的 30 秒 MP4 成片；
2. 完成配乐、拟音与多轨混音，将整片响度归一化至约 -14 LUFS；
3. 如有对白台词请同步导出对应时间轴的 .srt 字幕文件；
4. 交付物完整保留在当前工程目录下：MP4 成片、代表性高光海报 poster.jpg、TREATMENT.md、第三方素材声明 CREDITS、以及可以在本地重新执行构建的 build.sh；
5. 完成后请告诉我所有产出文件的具体绝对路径。
```

**English Prompt**:

```prompt
The storyboard and pacing are approved. Please proceed to full film rendering:
1. Render a 30-second MP4 at standard 1920×1080, 24 fps;
2. Complete score synthesis, foley, and multi-track mastering normalized to ~-14 LUFS;
3. Export an aligned .srt subtitle file if there are voice lines;
4. Deliver all assets inside the project folder: final MP4, highlight poster.jpg, TREATMENT.md, CREDITS, and a reproducible build.sh;
5. Report the exact absolute file paths once completed.
```

##### 产出文件在哪里找到？

渲染完成后，Agent 会汇报你的工程目录（例如 `~/Movies/lemo-first-film/midnight-noodles/`）。Mac 上打开 Finder，按 `Command + Shift + G`，粘贴 Agent 返回的工程目录并回车。找到 MP4 后双击播放，先从头看一遍，再检查动作、声音和文字是否清楚。一套完整工程包含：

1. **`midnight-noodles.mp4`**：最终合成好的成片，带完整配乐与音效，可直接双击用播放器观看；
2. **`poster.jpg`**：Agent 从最精彩的镜头中截取的封面海报；
3. **`midnight-noodles.srt`**：如果含有旁白或台词，按请求生成的外挂字幕；本例没有对白，可以没有这个文件；
4. **`TREATMENT.md`**：记录了本片创作对标、秒级分镜、运镜理由与声音设计表的方案；
5. **`CREDITS`**：列明了本次所使用的合成音色库、字体及开源协议清单；
6. **`build.sh`**：本地重新构建脚本。以后你若想修改代码重新生成视频，在工程目录中执行 `sh build.sh`。不想找命令时，也可以告诉 Agent：“请用这份工程的 build.sh 重新生成，并告诉我新文件路径”。

---

#### 第四轮：精准局部修改（按需追问）

以下追问是假设你在自己的成片中看到了对应问题。亮度提高 15%、延长 0.8 秒都是试调起点，先看修改后的片段再决定是否合适。延长镜头会改变总时长；想保持 30 秒时，要让 Agent 同步压缩别处。

看完自己的成片后，如果发现某一秒的灯光暗了、动作快了或声音没对齐，**先指出具体问题，让 Agent 修改相应代码**。因为整个项目是纯代码构建的，时间轴与参数均有迹可循。直接指出具体秒数与要修改的参数：

第四轮：精准局部追问双语模板（点击折叠 / 展开）

**中文指令**：

```prompt
成片整体效果很好！请仅针对以下三处做局部代码微调，保持其他镜头与逻辑不变：
1. 【光影提亮】：第 6–10 秒老李下面镜头的店内主光偏暗，请将面锅上方的淡金光池（#F1C565）受光面亮度提高 15%，让水蒸气的高光轮廓更清晰。
2. 【动作停留】：第 20 秒推门进店的特写切换过快，请将该镜头延长 0.8 秒，给门上风铃摇晃一个清晰的视觉停顿，后续镜头时间点顺延。
3. 【音画对齐】：面碗落桌的撞击拟音比画面提前了约 6 帧（0.25 秒），请在统一时间轴 timeline.js 中将该音效事件后移 0.25 秒，精确对齐碗底接触木桌的瞬间。
修改后请执行 build.sh 重新生成成片，并给出新成片路径。
```

**English Prompt**:

```prompt
The overall film looks great! Please make targeted local adjustments to the code without altering other shots:
1. [Lighting]: The key light in the noodle cooking shot (6–10s) feels a bit dim. Increase the intensity of the pale-gold light pool (#F1C565) above the pot by 15% to enhance the rim light on the steam.
2. [Pacing]: The close-up shot of pushing open the door at 20s cuts too quickly. Extend this shot by 0.8s to give the swinging wind chime a clear visual pause, shifting subsequent cues accordingly.
3. [Audio Sync]: The foley for the bowl hitting the counter triggers about 6 frames (0.25s) too early. In timeline.js, delay this event by 0.25s to align exactly with the moment the bowl touches the wood.
After updating, execute build.sh to rebuild the film and report the new file path.
```

---

### 制作卡住了？常见故障与排查求助

在首次上手过程中，如果遇到卡壳，不要慌张，对照以下典型场景排查：

1. **终端提示 `command not found: claude`**：
  - 可能是安装没完成，或终端还找不到安装目录。
  - 先新开终端再运行 `claude --version`；仍然失败时，对照 [官方安装故障排查](https://code.claude.com/docs/en/troubleshooting) 检查安装与 PATH。
2. **在 Claude Code 里输入做片需求，它却像普通聊天一样回复，没有调用制片工具**：
  - 原因：插件未正确生效，或者当前目录未被识别。
  - 解决：输入 `/exit` 退出，在系统终端重跑上面的两条插件安装命令，查看是否报错；回到短片文件夹重新启动 `claude`，明确说“请使用 lemo-opuscar 技能”。
3. **单帧画面很好看，但生成的一段小动作特别僵硬、卡顿**：
  - 单帧只能检查画法，连续动作还需要单独检查。
  - 告诉 Agent：“先只输出这段动作的几秒预览，检查姿势是否跳变、动作是否连贯，修好后再重建整片。”
4. **配音报错或声音缺失**：
  - 原因：中文配音默认采用微软在线语音（edge-tts），如果电脑网络波动会导致失败；英文离线 Kokoro 则需要本地模型就绪。
  - 解决：检查网络连通性；或者将你自己录制好的 `.wav` 音频文件直接拷贝进工程目录，告诉 Agent：“我有自己的配音文件，请直接读取使用并提取时间轴”。
5. **画面里的字幕或标题被遮挡，或者一闪而过看不清**：
  - 文字的字号、位置或停留时间可能没安排好。
  - 告诉 Agent：“增大第 X 秒的文字、避开人物，并延长到能完整读完；重新运行 readcheck 检查，再输出这一段给我看。”
6. **终端报出一大串英文 Error / Exit code 1 时**：
  - 选中终端里的报错文字，把最后一段错误及其前面的相关命令完整复制给 Agent，方便它查到具体失败位置。

以下是通用报错修复请求模板：

查看通用故障排查修复模板（点击折叠 / 展开）

**中文指令**：

```prompt
在执行制片构建时遇到了以下错误，请仔细阅读报错上下文，定位是依赖缺失、页面脚本错误还是 ffmpeg 参数问题，并直接修改源码修复它：
【终端报错信息】
（在此处完整粘贴终端中的错误输出文字）
请在修复代码后重新执行 build.sh，确保能够顺利输出 MP4。
```

**English Prompt**:

```prompt
An error occurred during build/render execution. Please analyze the error context, identify whether it is a missing dependency, page script failure, or ffmpeg parameter mismatch, and fix the codebase directly:
[Terminal Error Output]
(Paste the exact error log lines here)
After fixing, please rerun build.sh and confirm the MP4 renders successfully.
```

---

### 经典画风提示词长什么样？三个代表案例拆解

为什么有些提示词能让代码画出高度统一的艺术风格？关键在于**具体的绘图要求**（笔触大小、精确色号、光影占比与明确的负向剔除），而不是泛泛地写“油画感”或“电影级大师质感”。以下拆解三部代表作品：

#### 案例 1：No. 14《青山翠谷》（威尔士山谷水粉 · 2D）

![青山翠谷样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/film-14.jpg)

图 2：《青山翠谷》样帧——山顶黄水仙丛中俯瞰：戴平顶帽、系红围巾的 Clawd 坐在左前景，远眺山谷排屋、井架与煤渣山。

- **为什么能成立**：提示词明确要求仿照画家 Kyffin Williams 的调色刀刮法：笔触宽度严格限制在画幅的 `1/80–1/40`，长度为宽度的 `2–5` 倍，暗山用断续深色短线勾边。规定了精确色板（淡金 `#F1C565`、煤黑 `#1D1B1E`、灰蓝 `#48505E`），主角固定使用 `#D97757` 并占画面高至少八分之一。最后明确排除“水彩透明感、矢量平涂、发暗发脏”，给 Agent 明确的笔触与材质要求；预览时检查它有没有画出这些特征。

查看 No. 14 完整双语提示词原件（可直接复制）

**中文原件（prompt_zh）**：

```prompt
仿威尔士画家 Kyffin Williams 的不透明水粉。方向性笔触宽为画幅宽 1/80–1/40，长是宽的 2–5 倍，边缘毛糙，完全覆盖；房子、墙、山脊用断续深色短线勾边；暗山上刮几笔亮绿或灰蓝。色板：天空和光淡金 #F1C565（别成芥末黄），田野绿 #86A03F，暗部煤黑 #1D1B1E，远山和水面灰蓝 #48505E，小点缀黄 #F6CF2F，其他颜色由这几色调出；故事围绕的那个主角用 #D97757，至少占画面高八分之一。田野和天空偏亮（约六成），山和房子偏暗。暖色调色不超过一成，暗角，颗粒。默认傍晚低角度侧光，田野受光，山脊有轮廓光。从高处真透视取景，一条路把视线引下去；小房子（或墙、石块）顺山坡一级级排开。动起来：烟或云循环飘动，横向跟拍。避免：水彩透明感、矢量平涂、发暗发脏。
```

**英文原件（prompt_en）**：

```prompt
Opaque gouache after Welsh painter Kyffin Williams. Directional strokes 1/80-1/40 of frame width, 2-5 times as long, ragged, fully covering; broken dark dashes outline buildings, walls and ridges; dark hills flecked with lighter green or slate knife marks. Palette: sky and light pale gold #F1C565 (not mustard), fields green #86A03F, darks coal #1D1B1E, far hills and water slate #48505E, small accents yellow #F6CF2F, other colours mixed from these; the hero the story centres on #D97757, at least 1/8 of frame height. Fields and sky light (~60%), hills and buildings dark. Warm grade under 10%, vignette, grain. Default low late-afternoon side light: fields lit, ridges rim-lit. From high ground in true perspective, a path leading the eye down; small repeated buildings (or walls, rocks) stepping along slopes. Motion: looping smoke or cloud, a lateral track. Avoid: watercolour transparency, vector fills, mud.
```

---

#### 案例 2：No. 45《教父》（伦勃朗顶光明暗油画 · 2D）

![教父样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/film-45.jpg)

图 3：《教父》样帧——昏暗书房顶光下的 Clawd 与膝前的猫，胸前佩戴红玫瑰，上方降下提线木偶之手。

- **为什么能成立**：借鉴摄影指导 Gordon Willis 的顶光安排。提示词规定“约七成画面是看得出形体的暖暗部”（赭褐 `#24150B`，近黑 `#070403` 仅留于深角），主角站在光池中，眉骨把眼睛压进阴影。全画仅留一处饱和红（`#9C1A1A`），暗部用薄罩染、亮部用带笔脊的厚涂，严禁“提亮暗部、平光、人脸跳出来”，在 2D 画布上建立了极强的戏剧张力。

查看 No. 45 完整双语提示词原件（可直接复制）

**中文原件（prompt_zh）**：

```prompt
伦勃朗、卡拉瓦乔式明暗油画，只有一盏顶光。约七成画面是看得出形体的暖暗部，大多是赭褐 #24150B，近黑 #070403 只在最深的角落。琥珀 #8F5D2A 中间调约两成；朝上的面亮到 #E2B673。主角整个站在光池里，受光部分至少占画面高的四分之一；眉骨把眼睛压进阴影。一处饱和的红 #9C1A1A。暗部薄而平滑地罩染，亮部是带亮笔脊的厚涂，笔触约画面宽的 1/100；过渡柔和，不用刮擦线条。琥珀光油，重暗角，细画布纹（±3%）。背景可有一处暖色亮口（窗、门洞、发亮的天边）；画内的小灯只是一小团光，不算第二个主光。镜头慢拉、慢推。对标 Francis Ford Coppola《教父》（1972），摄影师 Gordon Willis。避免：提亮暗部、平光、人脸跳出来、暗到看不清。
```

**英文原件（prompt_en）**：

```prompt
Chiaroscuro oil painting after Rembrandt and Caravaggio, one overhead light. About 70% of the frame is readable warm dark, mostly umber #24150B, near-black #070403 only in the deepest corners. Amber #8F5D2A mid-tones about 20%; top planes reach #E2B673. The hero stands in the light pool, lit area at least 1/4 of frame height; brows shade the eyes. One red accent #9C1A1A. Darks thin smooth glazes; lights thick impasto, ridged strokes about 1/100 of frame width; modelling soft, never scratchy. Amber varnish, heavy vignette, canvas grain (±3%). A warm bright opening (window, doorway, horizon) may glow behind; a small lamp in frame is a small glow, not a second key. Camera: slow pull-backs and pushes. Reference: Francis Ford Coppola, *The Godfather* (1972), cinematographer Gordon Willis. Avoid: lifting the darks, flat light, faces popping out, frames too dark to read.
```

---

#### 案例 3：No. 92《寄生虫》（建筑剖面轴测图 · 2D）

![寄生虫样帧](https://best.xiaohu.ai/media/lemo-opuscar-code-filmmaking/film-92.jpg)

图 4：《寄生虫》样帧——白天的玻璃豪宅建筑剖面与修剪整齐的绿草坪，Clawd 站在花园门口举起山水石。

- **为什么能成立**：通过建筑制图呈现阶级垂直落差。提示词采用工程学的低角度二等角视图（7° 水平轴、42° 进深轴），将屋顶与近墙剥离展示室内空间；切面填涂黑混凝土骨料，任何缩放均为 1 像素细灰线。夜景则通过“叠乘 30–40% 月光蓝、亮灯房间涂回暖色”处理，镜头沿剖面上下运镜，让空间对比一目了然。

查看 No. 92 完整双语提示词原件（可直接复制）

**中文原件（prompt_zh）**：

```prompt
矢量建筑剖面轴测图，用低角度二等角视图：剖切面沿接近水平的 7° 轴正对观众，进深沿 42° 轴、按一半缩短；屋顶和近侧墙剖掉，露出房间。剖切穿过主体所在之处（房子、塔、船、山坡）。切面填涂黑：深色混凝土带骨料，土层画 45° 斜线夹小石块。任何缩放都是 1 像素深灰线。默认白天、淡色天空：混凝土 #b3ada2、橡木 #d6b58a、炭灰 #3e4146、松绿 #3f6b3e，白墙、绿草坪、半透明蓝水。房间配家具和简洁的小比例人。夜景或其他暗光只是变体：叠乘三到四成月光蓝，亮灯的房间涂回暖色。镜头沿剖面慢慢升降，框住两三个房间，跟主体走一条不断的路线，最后停在占画面约八成的整张图上。避免：30° 等轴测、粗卡通描边、楼层间切镜头、图太小。
```

**英文原件（prompt_en）**：

```prompt
Vector section axonometric, low dimetric view: the cut face lies along the near-flat 7° axis, facing us, depth along the 42° axis at half scale; roof and near walls cut away to show the rooms. Cut through the subject's place (a house, a tower, a ship, a hillside). Poché on cut faces: dark concrete with aggregate, earth hatched at 45° with stones. 1 px dark-grey lines at every zoom. Default daylight under a pale sky: concrete #b3ada2, oak #d6b58a, charcoal #3e4146, pine #3f6b3e, white walls, green lawn, translucent blue water. Furnished rooms, simple scale figures. Night or other low light is a variation: multiply 30–40% moonlit blue, lit rooms painted back warm. Crane slowly framing 2–3 rooms along one continuous path; end on the whole drawing at ~80% of the frame. Avoid: 30° isometric, thick outlines, cuts between levels, a small drawing.
```

---

### 背后机制：它怎么把代码变成视频？

理解项目在底层是如何运转的，能帮助你在遇到性能或修改问题时做出合理预期：

规则与工具共享，故事和源码归每支片子

**共享库 · ~/lemo-opuscar**
DIRECTOR.md
故事、镜头与声音判断styles/ + demo/
画风约束与实现参考core/
渲染、声音与检查工具

Skill 接入 → Agent 读取规则、调用工具 ↓

**独立短片工程 · <片名>/**

1. **创作方案**TREATMENT.md
  故事、镜头、声音设计
2. **制作代码**index.html · timeline.js
  画法、运动、同步时间
3. **重建与交付**build.sh · CREDITS
  MP4、海报、适用的字幕

工程文件名沿用指南约定；采用仓库方式时，短片位于 films/<片名>/。

1. **规则和工具共享，每支片子另有工程**：
  - `~/lemo-opuscar`：这是由插件管理的全局共享库，存放着通用的导演法（`DIRECTOR.md`）、渲染工具（`core/`）与风格字典。所有短片共用一份，不会因为新建工程而重复下载几个 G 的音源与依赖。
  - `<你的短片名>/`：这是你每次发起做片时所在的独立工程。所有的源码（`index.html`）、时间轴（`timeline.js`）、海报、字幕与交付 MP4 均完整存放在这里，方便继续修改与重建。
2. **纯函数式的逐帧抓取**：
  页面中通过 `window.render(t)` 将每一帧画面定义为“由时间 t 决定的画面”。代码中禁止使用不可控的 `Date.now()`，所有随机效果均采用固定种子的算法。无头浏览器（Headless Chromium）启动多个并行工作进程，按帧编号和帧率计算时间，逐帧截取 JPEG，再通过管道交给 ffmpeg 编码为视频。JPEG 是有损截图；确定性便于重建某一帧，画面质量仍取决于绘图代码。
3. **同一条时间轴绑定视听**：
  所有画面动作、节拍重音、台词起止与程序化拟音，都读取同一个 `timeline.js`。用一个教学例子说明：如果第 3.0 秒茶杯落地，画面坐标刚好计算到触地瞬间，音频系统在精准的 3.0 秒触发物理碰撞声，配乐在此处降落，制作时据此检查画面和音效是否在同一时刻发生。

#### 时间、算力与硬件成本评估

- **单片制作耗时**：根据官方指南，制作一支 30–60 秒的短片，Agent 通常需要编写代码、渲染多张样帧自检、调整音频，整个过程通常需要耗时 **30 至 60 分钟**，伴随着多次代码迭代与较高的 Token 消耗。片长若超过 2–3 分钟，制作时间与模型消耗会明显增加。
- **真实配额消耗案例**：作者透露，制作全长 6 分 31 秒的《Opuscar 98》时，大约消耗了一个 Claude Max 账号单周配额的 60%（作者原话为“一个 Max 20 号的 60% 周限”）。
- **硬件配置建议**：先用电脑做一帧与几秒动作，观察渲染速度。3D 与着色器较重的风格需要 GPU 支持；指南没有要求所有作品都必须配独立显卡。
- **开源协议归属**：项目框架遵循 MIT 开源协议。短片合成所调用的真实乐器音源、开源字体与离线语音模型遵循各自的原始开源授权（如 OFL、CC0、CC BY 等），所有引用的第三方素材必须在工程的 `CREDITS` 文件中逐一列出；创作者对自己引入的剧情文本、图像素材版权全权负责。

[比较其他起步方案Claude 写代码，能做出什么视频和游戏？十个开源项目拆解继续了解成品源码、制作模板与风格技能各适合怎样的起点。阅读项目拆解 →](https://best.xiaohu.ai/article/opus-5-5-code-creative-projects/)来源Lemo-Opuscar 98 种电影风格公开Lemomo·[查看主材料](https://x.com/lemomo_ai/status/2108537182273290694)延伸[原片与作者制作分工、成本回复](https://x.com/lemomo_ai/status/2104525988130680990)·[Lemo-Opuscar 开源仓库与制作指南](https://github.com/lemomo-ai/lemo-opuscar)·[98 个完整风格与镜头案例](https://lemomo-ai.github.io/lemo-opuscar/opuscar98/#styles)·[Claude Code 官方安装与登录指南](https://code.claude.com/docs/en/quickstart)

## Lemo-Opuscar：用代码做短片，先预览再制作

你定题材与画风，Agent 编写前端绘图与音频代码。通过「先一帧、再故事板、再成片」的预览顺序，更早发现画法与故事问题，减少返工。

人机分工与运行环境

**分工：**你定题材、选画风、检查预览；Agent 负责写代码与运行工具。

**前提：**需 Claude Code 账号（围绕 Opus 5.5 调试，换模型未作保证）；本地需 Node 20+、Python 3.11+ 或 uv、ffmpeg。

选画风的两条入口

**43 种通用风格：**涵盖 9 大类（本文精选 9 支样片），直接告诉 Agent 中文风格名。

**98 个电影案例：**只复制完整画风词给 Agent，不要套用原片故事或分镜。

核心制作路径：先预览再制作
先看预览能更早看出画法、动作与节奏问题，确认后再做整片，减少返工：

01
先出一帧看画法
用代码画单张静态帧。核对笔触质感与主体色号，排查发虚或塑料平涂。

02
看故事板看节奏
给出剧情与音效，明确索取 6–9 帧故事板。检查景别推拉、比例与叙事节奏。

03
批准成片出交付
确认后合成 1080p 24fps 视频与混音，交付 MP4、海报与 build.sh 脚本。

04
修改代码再重建
指出具体秒数与参数（如提亮 15% 或延时），改代码后执行 build.sh 重新构建。

渲染机制与制作耗时

按时间 t 与固定种子算法画帧，浏览器截取有损 JPEG，ffmpeg 编码；统一时间轴安排视听。作者指南估计一支短片需 30–60 分钟。

↑ 正文结束
✓ 本篇全文免费开放

会员可复制、下载全文 Markdown，并解锁更多深度内容与播客。
[订年卡 $59/年](https://best.xiaohu.ai/buy/?plan=year)[看权益对比 →](https://best.xiaohu.ai/membership/)

[阅读原文 ↗](https://x.com/lemomo_ai/status/2108537182273290694)

📮 新解读第一时间进邮箱

读完觉得有用？留个邮箱，每篇新解读发布就送达，随时退订。

### 相关解读

[深度 Claude 动效实战指南：完整提示词、修改方法和导出步骤 10-11 · 25 分钟](https://best.xiaohu.ai/article/claude-motion-lab/)[产品发布 Claude 动态工作流：主 Agent 写程序，让一批 Agent 分阶段完成大任务 10-10 · 9 分钟](https://best.xiaohu.ai/article/claude-managed-agents-dynamic-workflows/)[深度 如何构建靠谱、不易出错的自主 Agent 定时自动化工作流 Anthropic 自动化简报的六条设计规则 10-09 · 约 25 分钟](https://best.xiaohu.ai/article/effective-agent-automations/)
