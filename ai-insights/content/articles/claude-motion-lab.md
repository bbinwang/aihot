---
title: "Claude 动效实战指南：完整提示词、修改方法和导出步骤"
date: 2026-10-11T00:00:00.000Z
tags: ["会员", "深度", "Claude", "动效", "提示词", "教程", "聚合"]
summary: "跟着 Florence 的 Motion Lab，从一个短标题动画开始，再学耳机、液态铬和角色动画怎么做。"
---
> **原文链接**: [https://x.com/flxrnc/status/2105311836190978392](https://x.com/flxrnc/status/2105311836190978392)
> **来源**: Florence (@flxrnc)
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/claude-motion-lab/) · 2026/10/11
> **说明**: 本文由 AIHot 自动聚合(原文即中文,未翻译)。上游原文多次抓取失败(含登录墙/反爬,CDP 渲染亦无法获取),正文取自小互 AI 解读

---

**已核对**Florence (@flxrnc)10-11 · 25 分钟

网上铺天盖地的“一句提示词（One-shot）生成惊艳动效”，看起来像是输入一句话，就能得到一段精致动画。真正上手，你却可能遇到另一番景象：白色陶瓷像塑料，金属反光把文字盖住，盒盖打开时多停了一帧。**从“能动”到“好看”，中间差的是把这些问题逐个改掉的过程。**

用 Claude Opus 5.5 做动效，要先把设计说具体：外壳是什么材质，灯从哪里照，镜头什么时候推进，哪一帧开始开盖。Claude 把这些要求写成动画代码，你再通过静帧和多帧拼图找到问题，带着帧号与参数让它修改。想把开盖提前、把回弹减小，就直接改对应的时间和数值。

下面从一个 4 秒标题动画开始，带你走完写提示词、预览、改画面、加音效和导出的步骤，再拆开耳机、液态铬文字与 3D 吉祥物的完整做法。提示词提供中英双语，初始请求和每轮修改分开放，既能照着做，也能看懂一段成片是怎样调出来的。

---

### 1. 为什么让 Claude 写动画代码

**把动画写成代码，最直接的好处是修改有了明确的位置。** 耳机盒开盖太慢，就改开盖的时间段；金属像塑料，就改材质和反射环境。产品展示、文字动画和角色短循环，都可以这样逐项调整。

Claude 根据你的要求生成 HTML 和 JavaScript，浏览器把代码画成每一帧，FFmpeg 再把这些帧合成 MP4 或 GIF。设计要求决定画面长什么样，代码里的时间和参数决定它怎样动。

- **能定格**：把画面状态写成时间 t 的函数，固定资产、依赖版本和渲染环境后，可以重新渲染同一时刻，比较修改前后。
- **能调参数**：位置、灯光、镜头和运动曲线由代码控制，修改有具体落点。
- **能看图再改**：把静帧或多帧拼图交给 Claude，指出穿模、反光遮字或动作太迟的帧号，让它修改对应代码，再对比同一帧的前后变化。

**提示词怎么用**：中文用于读懂和修改，英文保留作者完整原件；选择一种语言发送即可，不用把两版一起贴。命令、API 名称和参数保持原样。案例中的“追问”是看到上一版结果后再发的修改意见，首次生成只发初始提示词。

在提示词末尾，加上下面的**通用渲染要求**。它让生成的动画更容易定格、检查和导出。

关键是让时间由外部输入，别依赖电脑此刻的时钟。`window.renderAt(t)` 要能画出指定时刻；URL 带 `?t=` 时停用实时动画循环，字体、贴图和场景准备好后再设置 `window.__ready = true`。只加一个定格函数，却让后台动画继续跑，截图仍可能被下一帧覆盖。

**中文译文**

```text
## 渲染要求：粘贴在任何动效提示词下方
输出单文件自包含 HTML。仅使用提示词中指明的库，且必须锁定版本。
除字体和上述锁定的库之外，不得发起任何网络请求。
每一帧必须是以秒为单位的时间 t 的纯函数。
若使用 JavaScript 驱动任何动效，必须暴露 window.renderAt(t) 用于精确绘制该帧。
使用 CSS keyframes、Web Animations API、SVG、Canvas 2D 或 WebGL 进行动画制作。
严禁使用 Date.now，严禁使用 setTimeout 或 setInterval 启动动画，严禁使用未设种子的 Math.random。
循环动效：仅渲染第 0 至第 N-1 帧，且第 N-1 帧必须流畅衔接回第 0 帧。
```

英文原件 · 通用渲染要求（完整可复制）

```text
## The render contract: paste it under any motion prompt
Output one self-contained HTML file. Only the libraries the prompt names, pinned to a version.
No network requests except fonts and those pinned libraries.
Every frame must be a pure function of time t, in seconds.
If JavaScript drives any motion, expose window.renderAt(t) that draws exactly that frame.
Animate with CSS keyframes, the Web Animations API, SVG, Canvas 2D or WebGL.
No Date.now, no setTimeout or setInterval starts, no unseeded Math.random.
Loops: render frames 0 to N-1 only, and frame N-1 must flow into frame 0.
```

一段动效怎样做成可修改的成片

1. **1 · 写清设计**主体、材质、镜头、分镜与帧数
2. **2 · Claude 写代码**固定依赖，用时间 t 控制状态
3. **3 · 浏览器渲染**定格关键帧，导出 PNG 序列
4. **4 · 检查并出片**带帧号反馈，再用 FFmpeg 编码

看到哪一帧有问题，就带着帧号回到代码，调整相关参数或镜头，再对比这一帧的变化。

---

### 2. 把“高级、酷炫”写成具体要求

“高级、现代、酷炫”表达了感觉，却没有说明画面该怎么做。模型会自行选择材质、灯光和动作，你也很难指出下一步要改哪个部分。

先把这些感觉变成设计要求：外壳是什么材质，光从哪里来，镜头何时推进，盒盖哪一帧打开，不想要哪些装饰。下面的耳机实验能直观看出区别。

下面两版都用 Claude 制作无线耳机动画。看左侧的装饰和右侧的材质、布光、开盖动作，有哪些区别：

[视频/音频](https://best.xiaohu.ai/media/claude-motion-lab/source-2105305598052978688.mp4)

无线耳机 A/B 真实渲染对比：左侧为 27 词模糊提示词生成；右侧为 448 词定向提示词加 4 轮 15 次修改生成。

- **左侧（模糊提示词 A）**：仅用 27 个词，要求“酷炫、高级、现代”。这一版出现了深蓝背景、光环、粒子、旋转的耳机和自行添加的标语。
- **右侧（定向提示词 B）**：用了 448 个英文词，写明模型尺寸、陶瓷和铬材质、三点灯光的色值与强度、开盖前的预备动作、弹簧参数和禁用项。

左侧保留首稿，没有追加修改，约用了 30 分钟。右侧画面又改了 4 轮、共 15 次，约用了 90 分钟；声音另改了 12 次，也约 90 分钟。右侧的成片，是把设计写具体后，再逐轮调整出来的。复用时也按这个顺序做：“写清要求 → 看结果 → 再改”。

具体可以这样写：

- **“高级感材质” 变成材质参数**：陶瓷外壳为绸缎白 `#F4F1EC`（粗糙度 0.38、清漆 0.35）（粗糙度越低，反射越清晰；清漆是在表面再加一层透明高光），金属部分为镀铬（金属度 1.0、粗糙度 0.05），仅在耳机座舱内托使用 Claude 品牌橙色 `#D97757`。
- **“专业影棚布光” 变成三点光源系统**：主光为暖白 `#FFF4E8`（强度 3.0，位于左前上方，投射柔和软阴影）；辅光为微冷 `#E8EEF5`（强度 0.6，位于右下方弥补暗部）；轮廓光为纯白 `#FFFFFF`（强度 4.0，位于右后上方勾勒边缘），另外构建影棚反射环境，让金属表面能映照出明暗光带。
- **“现代动效运镜” 变成明确的镜头视场角与轨迹**：指定 30° 视场角；方位角从 34° 移到 10° 再返回；2.0 秒开始推进，耳机升起时镜头和注视点也抬高。
- **“生动自然的开盖动画” 变成弹簧与开盖前的预备动作**：在开盖前的 0.72 至 0.95 秒，先执行一个“预备动作（Anticipation）”——盒盖反向下压 1.5 度，盒身微挤压 2%，定格 3 帧蓄力；随后要求盒盖以阻尼比 0.6 弹开至 100°、过冲约 10%，在 1.4 秒前稳定。
- **“极简纯净” 变成明确的禁用项（BANNED）**：严禁出现紫蓝色渐变、发光球体、全局泛光（bloom）、霓虹灯、散落粒子、原地旋转展台、黑底和浮夸标语。

以下是左侧模糊提示词的中文译文，英文原件可展开对照：

**中文译文**

```text
为一副无线耳机制作一段酷炫的 3D 产品动效。使其看起来高级且具现代感。单文件自包含 HTML，使用 three.js，960x1080，6 秒循环。
```

英文原件 · 耳机模糊提示词（完整可复制）

```text
Create a cool 3D product animation for a pair of wireless earbuds. Make it look premium and modern. One self-contained HTML file using three.js, 960x1080, 6-second loop.
```

下面是右侧完整画面提示词。想复用时，先替换产品描述，第一轮保留动作和材质数值；看到结果后，再按自己的需要逐项调整。

**中文译文**

```text
GOAL: 一部无线耳机的影棚产品短片：耳机盒打开，耳机升起朝向观众，随后全部卡嗒一声合上。
OUTPUT: 单文件自包含 HTML，通过 jsdelivr (importmap) 引入 three.js 0.160.0，960x1080。
TIME: 6 秒循环，60 fps = 360 帧，120 BPM（1 拍 = 30 帧）。关键卡点落在拍点上。

MODEL（1 单位 = 1 cm，带倒角的基础几何体）：耳机盒 6.0 x 4.6 x 2.2，边缘倒角半径 1.0，在 3.3 处分缝，后置铰链盖，分缝倒角 0.06，接缝处绕一圈 0.045 镀铬线。内部：D97757 托盘面，两个深色椭圆插槽。耳机：椭球头部 1.6 x 1.5 x 1.5，车削硅胶耳塞套，1.6 椭圆手柄带镀铬底盖，深色网孔。耳机放入后头部与托盘面齐平。

LOOK: 缎面陶瓷白 F4F1EC（粗糙度 0.38，清漆层 0.35），镀铬（金属度 1，粗糙度 0.05），仅托盘面使用 D97757，墨色 1C1B1A，耳塞套 E4E0DA。背景由中心 F0EDE8 到角落 DEDAD3 抖动渐变。主光 FFF4E8 强度 3.0 位于左前上方，柔和阴影；辅光 E8EEF5 强度 0.6 位于右下方；轮廓光 FFFFFF 强度 4.0 位于右后上方。反射：代码构建的 PMREM 影棚（暖灰穹顶、顶部与主光柔光箱、轮廓光条）。接触阴影，不透明度 0.55。Neutral tone mapping，8% 暗角，每帧使用固定种子的 2% 颗粒。

SHOTS:
0.0 至 0.5 秒：一条 2.4 宽的影棚光条（延续自 5.5 秒）从左向右扫过，在闭合的盒盖与接缝上划过一道亮斑扫光。
0.72 至 0.95 秒：预备动作：盒盖紧压闭合 1.5 度，盒身下压变形 2%，保持 3 帧。
1.0 秒：盒盖弹开至 100 度（阻尼 0.6，约 10% 过冲，在 1.4 秒稳定）。
1.5 秒：耳机从插槽升起 4.0，右耳先升，左耳滞后 4 帧（阻尼 0.7）。从升起第 8 帧开始向外倾斜 14 度，并在更松的弹簧下朝向镜头转动 35 度（阻尼 0.5）：手柄摆动到位并稳定。
2.0 秒：镜头推进。
2.4 至 4.0 秒：定格停留，耳机在 1 秒正弦周期内悬浮漂动 0.05。3.0 秒：第二道亮斑扫光划过耳机。
4.0 秒：耳机回正（0.2 秒）并下落（easeInOutCubic，0.45 秒），到位时带有 0.05 的磁吸下沉感。
4.75 秒：盒盖落下（easeInCubic），在 5.0 秒准时合上，弹跳 3 度，在 5.3 秒稳定；盒身受冲击回弹 1.5%。
5.5 秒：下一轮亮斑扫光开始。

CAMERA: fov 30，镜头永不停滞。方位角从 5.6 秒到 4.0 秒由 34 度过渡至 10 度（easeInOutSine），在 5.6 秒前返回（easeInOutCubic）。距离从 21 缓慢潜移至 20.2，在 2.0 秒推进至 16（easeOutExpo，0.8 秒），在 4.0 至 5.6 秒返回（easeInOutCubic）。耳机升起时：仰角由 12 度升至 19 度，目标注视高度由 2.3 移至 4.2。

BANNED: 蓝紫渐变、发光光球、bloom、霓虹、镜头光晕、粒子、通用自转展台、深色背景、文字。

QA: renderAt(t) 严格绘制时间 t 的画面，仅使用带种子的噪声。围绕每个关键冲击点渲染静止帧；第 359 帧流畅衔接至第 0 帧。
```

英文原件 · 耳机完整提示词（完整可复制）

```text
GOAL: a studio product film for wireless earbuds: case opens, buds rise to the viewer, everything clicks shut.
OUTPUT: one self-contained HTML file, three.js 0.160.0 from jsdelivr (importmap), 960x1080.
TIME: 6-second loop, 60 fps = 360 frames, 120 BPM (1 beat = 30 frames). Hits land on beats.

MODEL (1 unit = 1 cm, primitives with bevels): case 6.0 x 4.6 x 2.2, 1.0 edge radius, split at 3.3, back-hinged lid, 0.06 split bevel, 0.045 chrome wire around the seam. Inside: D97757 deck, two dark elliptical wells. Buds: ellipsoid head 1.6 x 1.5 x 1.5, lathed silicone tip, 1.6 oval stem with a chrome end cap, dark grille. Seated heads sit flush with the deck.

LOOK: satin ceramic white F4F1EC (roughness 0.38, clearcoat 0.35), chrome (metalness 1, roughness 0.05), D97757 on the deck only, ink 1C1B1A, tips E4E0DA. Backdrop F0EDE8 center to DEDAD3 corners, dithered. Key FFF4E8 3.0 upper front left, soft shadows; fill E8EEF5 0.6 low right; rim FFFFFF 4.0 upper back right. Reflections: PMREM studio built in code (warm gray dome, overhead and key softboxes, rim strip). Contact shadows, opacity 0.55. Neutral tone mapping, 8% vignette, 2% grain seeded per frame.

SHOTS:
0.0 to 0.5 s: a 2.4-wide studio strip (from 5.5 s) sweeps left to right, glinting across the closed lid and seam.
0.72 to 0.95 s: anticipation: lid presses 1.5 degrees shut, case squashes 2%, hold 3 frames.
1.0 s: lid springs to 100 degrees (damping 0.6, about 10% overshoot, settled by 1.4 s).
1.5 s: buds rise 4.0 out of the wells, right first, left 4 frames later (damping 0.7). From rise frame 8 they tilt 14 degrees outward and turn 35 degrees to camera on a looser spring (damping 0.5): stems swing through and settle.
2.0 s: camera push-in.
2.4 to 4.0 s: hold, buds float 0.05 on a 1 s sine. 3.0 s: second glint crosses the buds.
4.0 s: buds straighten (0.2 s) and descend (easeInOutCubic, 0.45 s), seating with a 0.05 magnetic dip.
4.75 s: lid falls (easeInCubic), shuts exactly at 5.0 s, bounces 3 degrees, settles by 5.3 s; case recoils 1.5%.
5.5 s: next glint starts.

CAMERA: fov 30, never parked. Azimuth 34 to 10 degrees from 5.6 s to 4.0 s (easeInOutSine), back by 5.6 s (easeInOutCubic). Distance creeps 21 to 20.2, pushes to 16 at 2.0 s (easeOutExpo, 0.8 s), returns 4.0 to 5.6 s (easeInOutCubic). Buds up: elevation 12 to 19 degrees, target height 2.3 to 4.2.

BANNED: purple or blue gradients, glow orbs, bloom, neon, lens flares, particles, generic spinning turntables, dark backgrounds, text.

QA: renderAt(t) draws exactly time t, seeded noise only. Stills around every hit; frame 359 flows into frame 0.
```

展开：耳机案例 4 轮共 15 次视觉修改记录（中英双语）

这 15 次修改依次处理反光、盒盖厚度、耳机造型、扫光和开盖时序。最后，预备动作在第 57–60 帧停了 4 帧，解决方法是把释放时刻提前半帧，让第 60 帧开始开盖。把这些追问当成排查示例，遇到对应问题时再选用。

**中文译文**

```text
## 第 1 轮，初版构建后（在 0、1.25、2.9 和 4.9 秒截取静止帧）
白色外壳与背景融在了一起，镀铬材质看起来发灰。将摄影棚穹顶光降到大约三分之一并推高柔光箱，使暗面暗下去，让镀铬呈现明暗交替的条带。
打开的盒盖看起来像一块扁平厚板。将其掏空：边框厚度 0.16，内凹腔体深 0.62，顶面内侧倒角 0.22。
深色圆形格栅看起来像一只眼睛。将其改为细长缝隙条。
耳机盒底部透出两个暗印：位于 0.3 的座舱底面超出了底部圆弧外壁（该高度处外壁向内缩进 0.29）。将座舱底面抬高到 0.5。
内衬基座看起来发三文鱼色。粗糙度设为 0.7。
## 第 2 轮，测量像素后
正面与顶面明度相同，右侧淹没在背景中。主光调至 (-7, 12, 8)，轮廓光调至 (2, 8, -12)，仍保持左前上方与右后上方。顶部柔光箱 2.2，曝光 0.8。
掠光变成了泛光照明：开关光条会导致 178,864 像素发生明暗改变，因为高 60 的光条照亮了整个正面。让光条仅存在于反射中（用第二个 PMREM 查找镜面反射，静态摄影棚用于漫反射），并恢复需求文档中的 2.4 宽度。
曝光调为 0.9，主柔光箱调为 4.5，使陶瓷质感显出白色。内衬基座镜面反射设为 0.3，避免掠射反光将 D97757 冲淡泛白。
给座舱开孔边缘添加 0.07 的机械加工圆角倒边。
耳机头看起来像老鼠头。将耳柄移到外侧，用短导音管和扁平硅胶耳帽替换球形耳塞头，并将格栅从头部移到耳柄上（它已经两次被看成眼睛了）。
摇臂升降加速：在 2.3 秒前到达高位目标，以便在镜头推进过程中耳机头能保留上方的构图空间。
## 第 3 轮，单独隔离每道掠光后
第一道掠光太弱，不足以抓住眼球。清漆粗糙度设为 0.08，光条峰值强度设为 24，扫掠角度调整为 -80 到 0 度，使光带在第 0 帧时刚好处于正面中央。
第二道掠光闪亮了整个盒盖内凹腔体（在 3.3 秒处有 207,791 像素），因为光条掠过了平面区域的镜面反射方向。将其仰角抬高至 8 到 61 度，宽度设为 4.8：使仅有带曲率的耳机头和耳柄能捕捉到光芒。
画面定格让摄像机完全静止了：在 2.8 到 4.0 秒加入 0.4 的平移微推。左耳机的浮动比右耳机落后 4 帧，如同其升起动作。
## 第 4 轮，单帧级精修
预备动作定格了 4 帧（57 到 60 帧），而不是 3 帧：弹簧在正好 1.0 秒时处于静止起跳点，导致重拍帧仍停在下压姿态。提前半帧释放（59.5/60 秒）：第 57 到 59 帧保持定格（包括其运动模糊子帧），第 60 帧成为首个开启帧。
```

英文原件 · 耳机画面修改（完整可复制）

```text
## Round 1, after the first build (stills at 0, 1.25, 2.9 and 4.9 s)
The white case melts into the backdrop and the chrome reads gray. Drop the studio dome to about a third and push the softboxes, so the unlit sides fall off and the chrome shows dark and bright bands.
The open lid reads as a flat slab. Hollow it: 0.16 rim, 0.62 deep cavity, 0.22 fillet at the ceiling.
The round dark grille reads as an eye. Make it a slim slot.
Two dark marks poke through the bottom of the case: the well floors at 0.3 sit outside the bottom arc, which insets the wall by 0.29 at that height. Raise the floors to 0.5.
The deck reads salmon. Roughness 0.7.
## Round 2, after measuring pixels
Front and top are the same value and the right side vanishes into the backdrop. Key to (-7, 12, 8), rim to (2, 8, -12), still upper front left and upper back right. Overhead softbox 2.2, exposure 0.8.
The glint is a flood light: strip on vs off changes 178,864 pixels because the 60-tall strip lights the whole face. Keep the strip in reflections only (a second PMREM for the specular lookup, the static studio for diffuse) and go back to the 2.4 width from the brief.
Exposure 0.9 and key softbox 4.5 so the ceramic reads white. Deck specular 0.3 so the grazing reflection stops washing out D97757.
Give the wells a 0.07 machined round-over.
The buds read as mouse heads. Move the stem to the outer side, replace the ball tip with a short nozzle and a flattened silicone cap, and move the grille off the head (it read as an eye twice) onto the stem.
Crane faster: reach the high target by 2.3 s, so the heads keep headroom during the push.
## Round 3, after isolating each glint
The first glint is too shy for a hook. Clearcoat roughness 0.08, strip peak 24, and shift the sweep to -80 to 0 degrees so the band is mid-face on frame 0.
The second glint flashes the whole lid cavity (207,791 pixels at 3.3 s) because the strip crosses the mirror direction of the flat faces. Raise it to 8 to 61 degrees elevation, 4.8 wide: only the curved heads and stems catch it.
The hold parks the camera: add a 0.4 dolly creep from 2.8 to 4.0 s. Float the left bud 4 frames behind the right, like its rise.
## Round 4, frame-perfect pass
The anticipation holds 4 frames (57 to 60), not 3: the spring starts at rest exactly on 1.0 s, so the beat frame is still the pressed pose. Release half a frame early (59.5/60 s): frames 57 to 59 hold, including their motion-blur subframes, and frame 60 is the first open frame.
```

展开：耳机案例声音提示词与 4 轮 12 次声音调优记录（中英双语）

首版音轨 80.6% 的能量集中在 60 Hz 以下，低音盖住了开盖、磁吸和落座声。12 次调音围绕低频、响度和峰值时刻展开。先发送 Sound prompt 生成音轨，再对照后面的追问处理具体问题。

**中文译文**

```text
## 声音提示词
为 A/B 视频配乐。使用 Web Audio API 在代码中合成全部声音，不使用采样，不进行下载。120 BPM，6 秒循环，360 帧（60 fps）。每个打击点落在其对应视觉事件后 1 帧，伴奏亦同。
伴奏：每 60 帧一次底鼓，16 分音符沙锤，贝斯与铺底音色和弦为 F，120 帧处为降 B，240 帧处为 G 小调，300 帧处为 C。
仅右半部分：
44 到 60 帧：反向渐强。
60 帧盒盖弹开：咔哒声，880 Hz 琴体共鸣音，120 Hz 闷击声。
90、94 帧磁吸噗声，气流上升至 119 帧。
96 到 120 帧推进渐强。
180 到 216 帧、330 到 30 帧掠光闪烁。
240 到 267 帧下落呼啸，270 帧入座咔哒声。
285 到 300 帧呼啸进入关闭：咔哒声，200 Hz 沉闷撞击声，70 Hz 闷击声；306、312 帧轻微滴答声。
打击点高出伴奏 3 到 6 dB，8 kHz 以上无内容，单声道安全。渲染两次，保留第二次结果。48 kHz 立体声 WAV，约 -14 LUFS，峰值 -1 dBTP。混流合入 MP4 并在解码后的音频中检查每个打击点。
## 声音追问（12 条），原样发送
## 第 1 轮，测量首次渲染后（80.6% 的能量在 60 Hz 以下，3.5% 位于 150 Hz 至 6 kHz，中位数 58 Hz；打击点高出伴奏 0.5 到 1.6 dB；琴体共鸣峰值落后对应帧 2.5 到 5 毫秒）
1. 超低音掩盖了一切。将降 B、G 和 C 提高一个八度演奏（117、98、131 Hz），将贝斯放开到 900 Hz，底鼓缩短至 80 毫秒并赋予 190 Hz 的敲击感。将铺底音色提升 5 dB，每个打击点提升 6 dB，轻微滴答声分别低于关盒声 6 dB 和 10 dB。
2. 将每个琴体共鸣和闷击声以余弦相位起始并设置 0.5 毫秒起音，使首个波形峰值落在对应帧 + 1。
3. 给推进渐强一个清晰的峰值：60 毫秒指数级上升至第 121 帧，随后 25 毫秒衰减进入运镜尾段。
4. 从关盒到滴答 2 期间（301 到 313 帧）将伴奏闪避压低 4 dB。
5. 消除直流偏置：减去各声道的循环均值。
## 第 2 轮，测量第二次渲染后（全局混音 -14.0 LUFS，但在 200 Hz 至 6 kHz 手机频段仅有 -22.9 LUFS；打击点分轨减伴奏分轨，K 计权：snap 为 -0.3，pops 为 -3.1 与 -5.2，seat 为 -6.9，shut 为 +2.6，ticks 为 -0.8 与 -4.3，push-in 为 -9.3 dB；底鼓峰值落后对应帧 + 1 达 5 毫秒，弹开闷击落后 2.4 毫秒）
6. 贝斯依然主导着响度。将其正弦波降至三分之一，锯齿波放开至 1200 Hz，贝斯降低 2 dB，铺底音色提升 4 dB 且更明亮（1600 Hz）。
7. 打击点调至高出伴奏 3 到 6 dB：推进渐强 +8 dB，入座咔哒声 +6 dB，噗声 +4 dB，轻微滴答声分别低于关盒声 4 dB 和 8 dB。
8. 调整每个音色的相位，使首个波形峰值准确落在对应帧 + 1，包括底鼓在内（余弦起始，1 毫秒起音）。
## 第 3 轮，测量第三次渲染后（手机频段 -17.5 LUFS，全局 -14.0 LUFS；手机频段打击点减伴奏：snap 为 6.4，pops 为 5.6 与 3.5，seat 为 2.3，shut 为 8.4，ticks 为 3.0 与 1.8，push-in 为 3.0 dB；底鼓的首个峰值落在对应帧 + 1，但其较宽的第二瓣波形在 2.5 毫秒后响 10%；压限器压降达 4.4 dB）
9. 赋予底鼓一个 3 毫秒的瞬态（电平在对应帧 + 1 后的 3 毫秒内降至 65%），敲击感增加 3 dB，使其最大峰值成为第一个峰值。
10. 关盒声降低 2.5 dB，轻微滴答声保持当前位置（滴答 2 随后提升 3 dB），入座咔哒声 +2 dB，推进渐强 +2 dB。
11. 底鼓的第二瓣波形依然响 6%：敲击声的负半周刚好落在了上面。敲击声衰减 4 毫秒，底鼓起音 0.5 毫秒。滴答声音体在 12 毫秒内衰减，使较早的尾音不会翻转其波瓣。
## 第 4 轮，在 Chrome 中解码混流后的文章 MP4 后（偏移 -0.002 毫秒，每个打击点均在对应帧 + 1 后的 0.0 到 1.3 毫秒，但 AAC 编码将真实峰值从 -1.3 抬高到了 -0.4 dBTP）
12. 将 WAV 限制在 -2.2 dBTP，使解码后的 MP4 保持在 -1 dBTP 以下；保持 -14 LUFS。
```

英文原件 · 耳机音效与调音（完整可复制）

```text
## Sound prompt
Score the A/B video. Synthesize everything in code with the Web Audio API, no samples, no downloads. 120 BPM, 6 s loop, 360 frames at 60 fps. Each hit lands 1 frame after its visual event, and so does the bed.
Bed: kick every 60 frames, 16th shaker, bass and pad F, B flat at 120, G minor at 240, C at 300.
Right half only:
44 to 60 reverse swell.
60 lid snap: click, 880 Hz body, 120 Hz thump.
90, 94 magnetic pops, air lift to 119.
96 to 120 push-in swell.
180 to 216, 330 to 30 glint shimmer.
240 to 267 falling swish, 270 seat click.
285 to 300 whoosh into the shut: click, 200 Hz thock, 70 Hz thump; ticks 306, 312.
Hits 3 to 6 dB over the bed, nothing above 8 kHz, mono-safe. Render twice, keep the second pass. 48 kHz stereo WAV, about -14 LUFS, peak -1 dBTP. Mux into the MP4 and check every hit in its decoded audio.
## Sound follow-ups (12), exactly as they were sent
## Round 1, after measuring the first render (80.6% of the energy under 60 Hz, 3.5% in 150 Hz to 6 kHz, median 58 Hz; hits 0.5 to 1.6 dB over the bed; bodies peaking 2.5 to 5 ms after the frame)
1. The sub buries everything. Play B flat, G and C an octave higher (117, 98, 131 Hz), open the bass to 900 Hz, shorten the kick to 80 ms and give it a 190 Hz knock. Raise the pad 5 dB and every hit 6 dB, ticks 6 and 10 dB under the shut.
2. Start every body and thump in cosine phase with a 0.5 ms attack, so the first waveform peak sits on frame + 1.
3. Give the push-in swell a clear peak: 60 ms exponential rise into frame 121, then a 25 ms drop into the camera tail.
4. Duck the bed 4 dB from the shut through tick 2 (frames 301 to 313).
5. Remove the DC: subtract each channel's loop mean.
## Round 2, after measuring the second render (full mix -14.0 LUFS but only -22.9 LUFS in the 200 Hz to 6 kHz phone band; hit stem minus bed stem, K-weighted: snap -0.3, pops -3.1 and -5.2, seat -6.9, shut +2.6, ticks -0.8 and -4.3, push-in -9.3 dB; kick peak 5 ms and snap thump 2.4 ms after frame + 1)
6. The bass still carries the loudness. Drop its sine to a third, open the saw to 1200 Hz, bass 2 dB down, pad 4 dB up and brighter (1600 Hz).
7. Hits to 3 to 6 dB over the bed: push-in swell +8 dB, seat click +6 dB, pops +4 dB, ticks 4 and 8 dB under the shut.
8. Phase every tone so its first waveform peak lands exactly on frame + 1, the kick included (cosine start, 1 ms attack).
## Round 3, after measuring the third render (phone band -17.5 LUFS against -14.0 full; phone-band hit minus bed: snap 6.4, pops 5.6 and 3.5, seat 2.3, shut 8.4, ticks 3.0 and 1.8, push-in 3.0 dB; the kick's first peak is on frame + 1 but its wider second lobe is 10% louder, 2.5 ms later; limiter up to 4.4 dB)
9. Give the kick a 3 ms transient (its level falls to 65% within 3 ms of frame + 1) and the knock 3 dB more, so its largest peak is the first one.
10. Shut 2.5 dB down with the ticks kept where they are (tick 2 then 3 dB up), seat click +2 dB, push-in swell +2 dB.
11. The kick's second lobe is still 6% louder: the knock's negative half lands on it. Knock decay 4 ms, kick attack 0.5 ms. Tick bodies decay in 12 ms so earlier tails cannot flip their lobes.
## Round 4, after decoding the muxed article MP4 in Chrome (offset -0.002 ms, every hit 0.0 to 1.3 ms after frame + 1, but the AAC encode lifts the true peak from -1.3 to -0.4 dBTP)
12. Limit the WAV to -2.2 dBTP so the decoded MP4 stays under -1 dBTP; keep -14 LUFS.
```

🔒 MEMBERS ONLY

### 后面约 18 分钟，是会员的。

免费部分到这里。墙内还有：

约 18 分钟正文5 处图表与交互
🔓 381 篇存量深度 / 研究解读全文一并解锁🎧 全部播客音频 + 私有播客源⧉ 全文 Markdown 导出
🔥 创始 100 席已售罄 · 350+ 位会员在读

[解锁全站 $59/年](https://best.xiaohu.ai/buy/?plan=year&slug=claude-motion-lab)
[先读这篇 $1.99](https://best.xiaohu.ai/buy/?plan=single&slug=claude-motion-lab)
[按月 $6.99](https://best.xiaohu.ai/buy/?plan=monthly&slug=claude-motion-lab)

单篇费用 30 天内升年卡可全额抵扣（回复收据邮件即可）

[已是会员？邮箱登录 →](https://best.xiaohu.ai/login/?next=%2Farticle%2Fclaude-motion-lab%2F)
美元结算 · 年卡 / 单篇支持支付宝、微信；月卡需银行卡 · 年付 7 天不满意全额退。

暂时不开会员？

留个邮箱，新解读第一时间发你。确认订阅后，我把**这篇的一页纸**一起发过去。

[全部订阅方式（RSS / Telegram / 播客）→](https://best.xiaohu.ai/subscribe/)

↑ 正文结束

[阅读原文 ↗](https://x.com/flxrnc/status/2105311836190978392)

### 相关解读

[深度 Claude Motion 与 Dashboards 完整上手指南 把任何数据和内容做成动画视频 10-09 · 28 分钟](https://best.xiaohu.ai/article/claude-dashboards-motion-guide/)[AI 实操 3 天做完 18 个镜头：Higgsfield 动画团队怎样把 AI 放进传统动画流程 09-28 · 约 15 分钟](https://best.xiaohu.ai/article/higgsfield-passport-rush-animation/)[深度 Opus 5.5 官方提示词指南：effort 怎么设、Agent 为何中途停、哪些提示词该删 09-23 ·](https://best.xiaohu.ai/article/prompting-claude-opus-5-5/)
