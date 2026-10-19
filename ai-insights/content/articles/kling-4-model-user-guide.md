---
title: "可灵 4.0 官方使用指南：21 组视频案例，原版提示词拿来就能练"
date: 2026-10-16T00:00:00.000Z
tags: ["AI 实操", "可灵", "AI视频", "提示词", "聚合"]
summary: "用官方视频与参考图看懂素材分工、视频编辑和关键帧，附21组完整案例提示词、原始素材下载、配额计算及双语练习。"
---
> **原文链接**: [https://kling.ai/quickstart/review/kling-4-model-user-guide](https://kling.ai/quickstart/review/kling-4-model-user-guide)
> **来源**: Kling AI
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/kling-4-model-user-guide/) · 2026/10/16
> **说明**: 本文由 AIHot 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)。正文取自小互 AI 解读

---

**已核对**Kling AI10-16 · 20 分钟

快手正式发布可灵 4.0（Kling 4.0）视频生成模型。作为新一代原生多模态视频创作模型，其核心能力升级集中在六个维度：

- **单次生成时长提升至 3–30 秒**：支持 1 秒步进调节，单次可生成最长 30 秒视频；
- **输出规格最高列至 4K**：支持 720p、1080p 与 4K 三档生成，画幅覆盖 21:9、16:9、1:1、9:16 及 Auto；
- **全能参考（Omni Reference）**：单个任务最多支持 15 个参考素材组合输入（涵盖图片、视频、元素与音色）；
- **时间轴多关键帧控制**：支持首帧、首尾帧及最多 10 个关键帧节点的时间轴锚定；
- **双声道立体声与原生口型同步**：支持中、英、日、韩、法、德等多语种对话与地方方言，音画同步与智能分镜默认开启；
- **提示词上限扩展至 8,000 tokens**：支持输入更丰富的镜头语言、分镜细节与运动描述，但长文本不等于保证模型完全理解物理规律。

有两项能力仍标为 **即将推出（coming soon）**：虽然规格表中列出了 10-bit HDR，但官方功能概述明确标记其为即将推出，不可将当前的 4K 分辨率与 10-bit HDR 混为一谈；同时，单次生成的上限为 30 秒，延长至 2 分钟的多轮扩展能力同样处于即将推出状态。轻量快速的 Kling 4.0 Flash 模式最高支持 720p 分辨率与 20 秒时长，暂不支持首尾帧与多关键帧控制。指南文字规格列出了 4K，但工作区示意图里的 4K 按钮仍标着 Coming Soon，实际开放选项请以账户界面为准。这些是官方指南列出的规格与示范；指南未提供独立成功率或售价。

---

### 先选入口：组合素材，还是安排时间点画面

在可灵 4.0 的创作工作区中，创作者首先要在两个入口之间做出选择：**全能参考（Omni Reference）**与**关键帧（Keyframes）**。其中**全能参考是默认入口**，功能最全面，既支持多素材参考，也完全支持从纯文字创意概念起步（文生视频）；单次任务默认生成时长为 10 秒、画幅默认为 Auto。独立关键帧未传图时可选 21:9、16:9、1:1、9:16，传图后跟随首张关键帧图片比例，画幅规则保持不变。

这两套入口分别对应不同的创作目标与输入约定，且在单次生成任务中互斥，无法合并：

| 对比维度 | 全能参考（Omni Reference） | 独立关键帧（Keyframes） |
| --- | --- | --- |
| **核心控制目标** | 生成画面的外观、风格、动作轨迹与镜头语言来源 | 视频时间轴上特定时间节点（秒数）的关键画面状态 |
| **支持素材类型** | 图片（≤10）、视频（≤5）、音色（≤3）、元素（≤7），总数 ≤15 | **仅支持图片（≤10 张）**，不支持任何参考视频或参考音色 |
| **首尾帧与关键帧支持** | 可在提示词中指定首帧语法（如 `@Image1 is the first frame`） | 原生关键帧时间轴面板，支持首帧、首尾帧、中继帧自由打点 |
| **画幅与比例** | 可选 21:9、16:9、1:1、9:16、Auto；默认为 Auto | 未传图时可选 21:9、16:9、1:1、9:16；上传关键帧后跟随首张图片比例 |
| **最适合的任务** | 跨素材借用动作/运镜、角色换装置换、原片局部编辑、多模态广告 | 已有严谨分镜图、手工绘制概念稿、首尾状态明确的工艺演变展示 |

![官方工作区示意：模型、入口、分辨率、时长与画幅选项](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-10.webp)

官方工作区示意：模型、入口、分辨率、时长与画幅选项

输入框下方可见 VIDEO 4.0 与 Omni reference，右侧参数面板设置分辨率、时长和画幅。该示意图的 4K 按钮仍带 Coming Soon 标记；文字规格已列出 4K，请以实际账户可选项为准。

独立关键帧入口不支持上传参考素材（仅支持最多 10 张图片，用于在时间轴上指定画面时间点、谁入画或场景变化）。官方指南在“首帧”小节中给出的示例同时使用了图片与参考视频（`@Image1 is the first frame. @Video1 is the reference...`）；若创作者既需要指定首帧又需要参考视频提供动作节奏或运镜轨迹，按该需求应在全能参考入口内组织提示词。

---

### 每份素材都要有明确分工

全能参考允许单一任务输入多达 15 个参考素材，但素材组织受两项明确的输入规则约束：

1. **总素材限额与多重约束**：15 个是单任务素材总数的上限。同一项素材可能同时受几种额度限制。单项上限分别为图片 ≤10 张、视频 ≤5 段、元素 ≤7 个、音色 ≤3 个；每个素材计入总数一次。其中“视频元素”既属于元素（最多 3 个），同时也占用视频额度，但按单个素材仅在总数中统计一次。
2. **视频共享额度池**：参考视频、待编辑视频和视频元素共享同一个视频额度池，合计最多 5 段，且累计总时长不超过 30 秒（单段视频需在 3–30 秒之间，视频元素素材需在 3–8 秒之间）。

上传前还要检查文件本身。数量合规，不代表文件大小、长宽比或片长也合规：

| 素材 | 单个文件要求 |
| --- | --- |
| 图片 | ≤30 MB，长宽比在 2:5–5:2 之间；独立关键帧图片同样适用 |
| 普通参考视频、待编辑视频 | 3–30 秒，≤300 MB，长宽比在 2:5–5:2 之间 |
| 建立音色的音频 | 5–30 秒，≤50 MB |
| 建立视频元素的素材 | 3–8 秒；仍受共享视频数量与总时长限制 |

#### 给素材编号，也给它分工

上传的素材会按顺序自动编号为 `@Image1`、`@Video1`、`@Element1`。官方指南指出，若仅在提示词中提供素材 ID 而不明确其职责，模型会自行推断各素材用途，生成结果的不确定性会增加。

素材分工可按“**指定用途、说明保留、排除多余内容**”三步原则：

- **指定职责**：写明该资产向模型贡献何种维度的特征（例如官方原句中的 “`@Image1: preserve the character's appearance`” 或 “`@Video1: reference the action pacing`”）；
- **说明保留**：指明期望延续的细节（例如人物五官、服装剪裁、特定物体结构或字体）；
- **明确排除**：显式声明不继承素材中自带的不需要属性。

创作起步并不需要一开始就写复杂的长篇文本：可以先用一句话描述主体与核心事件起步，让模型自动拓展剧情、走位与运镜；待构想清晰后，再围绕主体特征、场景空间、镜头轨迹、时间轴与声音补充真正影响画面的实质细节，避免单纯堆砌无意义的抽象形容词。

官方原文 · 通用模板与短句
查看完整官方英文提示词 · 素材分工、设置、时间轴与声音：官方通用模板

```
[Asset Roles]
@Image1 defines ___; preserve its ___.
@Image2 defines ___; preserve its ___.  Reference the ___ of @Video1.
[Overall Settings]
Scene and texture: ___; visual style: ___; camera tone: ___.
[Sequence of Events]
0–X s: ___ (visuals + action + emotion)
X–Y s: ___ (camera movement + additional details)
Y s–end: ___ (closing shot)
[Audio]
Dialogue/voiceover + ambient sounds + music + sound effects
```
查看完整官方英文提示词 · 角色与场景素材分工：官方示例

```
@Image1 defines the scene. Preserve its spatial layout, furnishings, and lighting.
@Image2 defines the female protagonist. Preserve her facial features, hairstyle, and clothing.
The female protagonist walks toward the window, stops, and looks back.
```
查看完整官方英文提示词 · 一句话探索：官方示例

```
An old man ranting about AI.
```
查看完整官方英文提示词 · 指定西班牙语对白：官方示例

```
A Spanish female tourist looks at the interpreter in the middle and raises the map in her hand. She speaks in natural, clear, slightly slow Spanish: “¿Dónde está la estación de metro más cercana?”
```
查看完整官方英文提示词 · 描述声音：官方示例（保留原文措辞）

此处保留官方“15-year-old adult woman”的原文措辞，年龄与成年描述相互矛盾；实际创作应指定一致的年龄设定。

```
The promotional character has the voice of a 15-year-old adult woman. She speaks in English with sincerity and emotional engagement: “I honestly love this Kling jacket—the cropped fit feels so confident, and it goes with everything.” Start with warm appreciation, emphasizing “love” and “confident.”
```

查看完整官方英文提示词 · 字幕位置、样式与时间：官方示例

```
Subtitles Burn in English subtitles, bottom-center within the title-safe area, positioned 10% above the bottom edge of the frame. Use no more than one or two lines. Rounded cream-colored felt subtitle panels with bold, dark chocolate-brown text, high contrast, and stable positioning. Each subtitle appears and disappears in sync with the corresponding voiceover: 0.78–1.38 sec: “ONE.” 1.98–3.84 sec: “ONE MEANS JUST ONE.” 4.16–4.66 sec: “TWO.” 4.86–6.82 sec: “TWO MEANS ONE AND ONE TOGETHER.” 7.26–7.78 sec: “THREE.” 8.04–10.16 sec: “THREE MEANS TWO AND ONE MORE.” 10.32–10.80 sec: “FOUR.” 11.06–13.08 sec: “FOUR MEANS THREE AND ONE MORE.” 13.32–14.24 sec: “ONE, TWO, THREE, FOUR.” 14.40–15.00 sec: “GREAT JOB!”
```

查看完整官方英文提示词 · 只改风格：官方短句

```
Edit @Video1. Replace the video’s style with the felt style of @Image1. Preserve the original composition, shots, and actions. Change only the style; do not alter the characters’ clothing designs, motorcycle design, scene elements, or event sequence.
```

在儿童认知数字教学案例中，官方为了呈现羊毛毡定格动画质感，同时引入了教学视频 `@Video1` 与黏土羊毛毡风格图 `@Image1`。如果直接提示同时参考两者而不作区分，生成结果容易混入不想要的内容。官方提示词通过明确分工进行约定：教学视频只借内容进展、逐步讲解与结尾总结的节奏和旁白，明确排除原视频的环境与视觉风格；风格图只借手工黏土与羊毛毡的世界观材质，明确排除原图既有的角色、数字与构图。教学内容与画面材质分开交代，模型才知道各自要借用什么。

#### 试着分配一次全能参考任务

教学计算器，只核对指南中的素材额度。视频元素计入元素数量，也占用视频额度；总项数只数一次。

图片（最多 10 张）
普通视频（含待编辑原片）
全部元素（最多 7 个）
其中视频元素（最多 3 个）
音色（最多 3 个）
所有视频类合计时长（秒）

总素材：2 图 + 1 视频 + 0 元素 + 0 音色 = 3 / 15 项

视频共享额度：1 普通视频 + 0 视频元素 = 1 / 5 段；10 / 30 秒

这组数量在限额内。还需检查文件规格、素材角色与生成结果。

图片 ≤30 MB；普通视频每段 3–30 秒、≤300 MB；建视频元素的素材为 3–8 秒；建音色用 5–30 秒、≤50 MB 的人声。此工具不校验文件本身。

#### 看一次运镜参考怎样分工

同样是漂移镜头，视频可以负责“怎么拍”，两张图分别负责“车长什么样、在什么地方”。下面保留白车白天赛道原片与更换车辆、环境后的官方结果。对照机位、绕车方向与切镜节奏，再看车辆与背景分别对应哪张图。

官方案例 · 运镜参考

![@Image1：赛车外观](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-04.webp)

@Image1：赛车外观

![@Image2：霓虹港口夜景](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-05.webp)

@Image2：霓虹港口夜景

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-04-678ec45c0b3a4fab.mp4)

输入参考视频：白车在白天赛道漂移

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-05-ccbbf354e66defb9.mp4)

官方生成结果：更换车辆与环境

查看完整官方英文提示词 · 运镜参考：白天赛道到霓虹港口

```
Use @Video 1 as the reference for camera movements and shot pacing. Replace the Element with the car from @Image 1 and the background with @Image 2.
```

不同任务可从这些官方短句开始，再补自己的场景、动作与声音要求。素材编号按实际上传顺序调整：

| 想借用什么 | 官方提示词写法（节选） |
| --- | --- |
| 多人外观 | `Reference the facial features of the characters in @Image1, @Image2, and @Image3, keeping them strictly consistent.` |
| 动作与出招节奏 | `Reference the fighting moves and attack timing in @Video1. Use @Image1 and @Image2 as the character appearance references.` |
| 运镜与节奏 | `Reference the camera path and pacing of @Video1. Replace the element with the car in @Image1 and the background with @Image2.` |
| 构图 | `Reference the composition of @Image1 and preserve it exactly.` |
| 角色与故事板 | `Reference the character design in @Image1 and use the storyboard in @Image2 as the director-approved sequence of shots, framing, camera paths, screen direction, and emotional progression for this scene.` |

故事板参考要说明生成的是最终动画画面，避免把分镜格、铅笔线稿或导演注释也拍进视频。完整太空小狗案例在文末保留了这些排除项；该案例长提示词的图片编号与上面通用短句不同，须按素材内容逐项对应。

---

### 借用一段视频，和修改这段视频有什么区别

针对已有视频素材进行创作时，指南区分了两种操作方式：**创意重做（Creative Recreation）**与**视频编辑（Video Editing）**。两者的提示词写法对应不同的输入约定。

```
已有视频素材 (@Video1)
   │
   ├─► [动词：Replace / Borrow] 创意重做 (Creative Recreation)
   │     └── 借用原片节奏、运镜或分镜，替换主体或场景生成新视频
   │
   └─► [动词：Edit @Video1] 视频编辑 (Video Editing)
         └── 明确编辑意图，指定修改目标并追加保留要求
               └── 官方推荐写入：“Keep everything else unchanged”
```

##### 1. 创意重做（Creative Recreation）：借节奏换主体

- **使用目的**：官方指南介绍，当创作者认可某个参考视频的叙事节奏、分镜构图或运镜方式时，可借用其运动框架，将角色、产品或场景替换为自己的素材。
- **提示词写法**：
  例如指南中的示例语句：
  > “`Replace the element in @Video1 with @Image1. Keep everything else unchanged.`”
- **能力说明**：重做不仅可以全场景替换，也可以只替换主体并要求保留其余部分。官方指出，参考视频与目标素材在节奏和构图上越接近，生成结果越容易符合预期；不过生成画面仍需复看确认。

##### 2. 视频编辑（Video Editing）：明确改动与保留范围

- **使用目的**：对已有视频进行靶向修改，如调整人物动作与神态、替换道具、增删画面元素或变换局部美术风格。视频编辑最多支持 5 段视频（包含 1 段主视频），每段时长需在 3–30 秒之间且总时长不超过 30 秒。
- **提示词编写约定**：
  - **明确编辑动词**：使用 `Edit @Video1` 开头明确编辑意图。指南提示，若仅写 `Reference @Video1`，模型可能将其理解为基于参考视频生成新内容而非局部编辑。
  - **显式指定保留范围**：在提示词中追加 `Keep everything else unchanged`。若不写明保留要求，未指定的画面内容可能也会随之变动；但写明保留要求是提出约束，并不保证未改像素绝对原封不动，仍需复看检查。

官方示例清晰展示了“改什么、保留什么”的实际分工：

##### 便利店换人案例

原片为三人依次走出便利店。提示词指定用 `@Image1`、`@Image2`、`@Image3` 分别替换三人的外貌、发型与服装，并细化每人的动作；同时指定在右侧玻璃橱窗固定一块文字招牌。而在保留要求中，明确写明保留绿色门框、门面构图、店内货架、日光与行走方向等不变。

官方案例 · 依次替换三个人

![按提示词上传为 @Image1：白帽男子](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-19.webp)

按提示词上传为 @Image1：白帽男子

![按提示词上传为 @Image2：红衣女子](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-18.webp)

按提示词上传为 @Image2：红衣女子

![按提示词上传为 @Image3：抱羊玩偶的厨师帽男子](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-17.webp)

按提示词上传为 @Image3：抱羊玩偶的厨师帽男子

这里按提示词的人物描述重排了三张参考图；官网表格的图片排列与提示词编号不同，上传后请逐个核对。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-13-a8cc69a2030a1d04.mp4)

待编辑原片：三人依次走出便利店

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-14-99a05ed5488d3097.mp4)

官方编辑结果：按对应参考图换人
查看完整官方英文提示词 · 编辑：便利店三人依次换人

```
Edit @Video1. Replace the three people who walk out of the convenience store one after another with the following characters: First character: use the identity, face, dark curly hair, white sun hat, white short-sleeved shirt with a black-and-white striped inner top, green apron, loose light gray jeans, and dark sneakers of the man in @Image1. Second character: use the identity, short light blonde hair, red sweatshirt, green apron, white knee-high socks, and red shoes of the woman in @Image2. Third character: use the identity, short light blonde hair, white chef hat, black-framed glasses, blue-green-and-black patterned knit outfit, green apron, white shoes, and the same off-white plush sheep held in his arms as the man in @Image3. The order in which the three characters appear, their movements from inside the store to the doorway, their pauses to pose, and their approach toward the camera and exit through the foreground should follow the actions and camera timing of @Video1: the first character slightly lifts the brim of his sun hat before approaching the camera; the second character naturally adjusts her apron and gives a slight wave at the doorway before approaching the camera; the third character holds the plush sheep, adjusts his glasses, then approaches the camera and slightly raises the plush sheep as he gets closer. Fix a clear, stable, readable sign with the exact uppercase text `KLING AI OPEN 24 hours` in the middle of the convenience store's right-side glass window. The text must remain correctly spelled, undistorted, and free of flickering throughout the video. Keep the sign fixed to the inside of the glass window without obstructing any characters. Keep everything else unchanged: preserve the green convenience store doorframe, doorway composition, interior shelves, fluorescent lights, glass reflections, daylight, camera position, walking direction, duration, pacing, and aspect ratio of @Video1. Do not add any characters, change the store structure or camera movement, or introduce subtitles, logos, watermarks, or extra text.
```

先看三人的出场顺序，再检查门框、货架、招牌与行走方向。只看人物近景，容易漏掉背景的意外变化。

##### 雪地柯基风格替换案例

提示词要求仅将雪地中奔跑跳跃的三色柯基替换为 3D 像素方块狗，并遵循原动作轨迹；其余木质走廊、积雪地面、栅栏、树木与天空等环境保持实拍写实状态，原片音频也要求保持不变。

官方案例 · 只改主体风格

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-17-ab777316db015731.mp4)

待编辑原片：雪地中的柯基

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-18-c88fba79a88c25f9.mp4)

官方编辑结果：方块像素狗
查看完整官方英文提示词 · 编辑：雪地柯基变为像素狗

```
Edit @Video 1 by replacing the tricolor Corgi puppy hopping in the snow with a 3D blocky pixel-art Corgi. The entire body must be constructed from cubes: a rectangular torso, a cubic head, two upright square triangular ears, four short cuboid legs, and a small block-shaped tail. All edges must have sharp, hard right angles, with no rounded curves.
The surface uses low-resolution 16×16 pixel textures, preserving the original Corgi's tricolor distribution: a tan body, a black saddle-shaped patch across the back, a white facial blaze, a white collar, a white chest, and white paws. The eyes are two black square pixels, the nose is a single black cube, and the tongue is a small pink pixel block. Lit surfaces are bright and side surfaces are dark, with flat-shaded, block-based lighting. There must be no fur texture or soft tonal transitions.
Keep the Corgi exactly the same size as the original, without scaling it up or down. The blocky Corgi must follow the original Corgi's position, actions, and movement trajectory frame by frame: standing beside the porch, jumping into deep snow and disappearing, leaving a hole in the snow, peeking out with its blocky head, repeatedly leaping forward into the snow, and finally sitting in the snow pit. During jumps, its body and legs should move as rigid blocks, like a creature animation in a video game, without bending.
The depth to which it sinks into the snow, the snow kicked up by its paws, the snow settling on its body, and its shadow cast onto the snow must all follow the blocky body accurately. Whenever it reappears after being covered by snow, it must remain the exact same blocky Corgi with consistent textures.
Important: Only the Corgi should be transformed into a blocky style. The wooden porch, snowy ground, wooden fence, trees, and gray-white sky must remain completely realistic, as in the original live-action footage. Do not apply any blocky or pixelated effects to the environment. Only one animal should appear in the footage, and no realistic, fur-covered Corgi may appear in any frame.
Keep the audio exactly identical to the original video. Do not add any new sounds. Preserve the handheld camera perspective and all camera movements. Everything else must remain unchanged.
```

分别核对狗的运动轨迹与雪地、木廊等环境：只改主体风格，与把整个场景都变成像素风，是两种不同的要求。

---

### 铁块变成剑，中间的动作由谁安排

在独立关键帧入口或首尾帧模式下，容易误以为只要喂给模型一张起始图和一张终点图，模型就会自动推演出合理的物理演变过程。

首尾两张图给出了起止画面，却没有交代谁拿起铁块、在哪里加工、最后怎样把剑放回桌上。动作、接触与剪辑安排仍要写进提示词，成片也要逐项核对。

官方锻造案例的提示词安排 · 15 秒、六个镜头
![首帧参考：工作台上的五块生铁](https://best.xiaohu.ai/media/kling-4-model-user-guide/forge-reference-26.webp)首帧：五块生铁![尾帧参考：同一工作台上完成的大剑](https://best.xiaohu.ai/media/kling-4-model-user-guide/forge-reference-27.webp)尾帧：成品剑回到桌面

1. 0–3 秒**取料**
  双手托起最大铁块并移出画面。
2. 3–5 秒**加热**
  切到火炉，铁钳夹住红热铁坯。
3. 5–8 秒**锻打**
  切到铁砧，左手固定，右手锤打。
4. 8–10 秒**打磨**
  切到砂轮，接触位置出现火花。
5. 10–11 秒**装配**
  扶稳剑柄，拧紧剑首。
6. 11–15 秒**放回**
  先显示空桌面，双手托剑放下，接触后松手退出。

首尾图提出两端的画面要求；中间镜头交代谁用什么工具完成动作。剪辑省略耗时工序，不能把这段示范理解成真实锻造只需 15 秒。时间与动作是原提示词的安排，观看结果时仍要逐项对照。

官方展示的 15 秒锻造大剑示例说明了如何通过分镜描述连接首尾状态：

- **首帧（Image 1）**：斜俯视工坊工作台上整齐摆放着 5 块深灰色生铁块，背景散落着铁匠工具。
- **尾帧（Image 2）**：同一工作台上横放着一把锻造完毕的精致金属大剑，剑柄朝向左上，剑尖朝向右下。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-28-f4d6dc7783b8ebc5.mp4)

官方锻造示例片段。

    对照上方起止画面与时间线，查看动作接触及剪辑过渡。

若仅上传首尾两张图而写一句“展示从生铁锻造成大剑的过程”，缺少具体动作约束，生成结果容易在端点间出现不自然的变形或突变。

官方示例的处理方式，是通过**剪辑时间跳切（Editorial Time Jump）**将锻造过程划分为六个镜头，配合具体的双手动作来跨越工艺时间。剪辑省略了耗时工序，每个镜头保留可见的取料、加工或放置动作：

1. **0.0–3.0 秒（搬取原料）**：画面严格从首帧五块生铁开始，戴着棕色皮手套、穿着烟灰袖子的铁匠双手入画，抱起中间最大的铁块向左侧移出画框，其余四块铁保持原状；
2. **3.0–5.0 秒（火炉加热）**：硬切（Hard cut）到特写，同一双工装手用长铁钳夹着红热铁坯在炉火中受热，伴随热气扰动；
3. **5.0–8.0 秒（铁砧锻打）**：硬切到砧台，左手钳固定，右手挥锤进行三次受控敲击，击打伴随局部压缩、手腕后坐与飞溅的深色金属氧化皮（dark scale）；
4. **8.0–10.0 秒（砂轮打磨）**：硬切到成型剑条接触旋转砂轮，火花成束飞溅，金属表面显露反光倒角；
5. **10.0–11.0 秒（装配剑柄）**：硬切到组装台，左手扶稳剑柄，右手给多面体剑首完成最后一圈拧紧；
6. **11.0–15.0 秒（放置成剑）**：硬切回最初的工作台，此时台面已完全清空，双手托着大剑从左侧入画，平稳斜放至桌面上，随后双手松脱收回并移出画框，画面在时间轴终点承接尾帧要求的构图形态。

这一案例体现了首尾帧的关键要点：**端点负责设定起止画面的状态约束，提示词负责设计动作主体、分镜剪辑与接触受力；生成后仍需重点复看手部接触与端点一致性。**

查看完整官方英文提示词 · 首尾帧：生铁锻造成大剑

```
场景上下文：精确 1 个角色——无重复。室内，一个破旧的黑smith 工作坊，白天。同一位黑smith 取出原材料，将其锻造成一把大剑，并将完成的大剑放回原桌面上。15 秒，六个镜头。通过剪辑压缩制造时间；单个动作保留自然的重量感和速度。
主动参考：@Image1：精确的首帧锚点。保留所有五块生铁、它们的排列方式、桌面、背景工具、透视和光照。此图像是活动拾取镜头的起始状态。@Image2：精确的尾帧锚点和完成的大剑设计。保留剑身轮廓、中央血槽、角形弯曲护手、螺旋金属握柄、刻面剑首、对角线放置、透视和背景。此构图通过可见的物理放置过程达成。
位置地图：工作台占据前景。工具桶位于其后左边缘处，棒架占据后右侧，铁砧位于右侧。黑smith 在两个端点镜头中均从桌子左侧工作。摄像机保持在桌子面向观众的一侧。在锻造剑身的插入镜头中，剑茎指向屏幕左侧，剑尖指向屏幕右侧。最终大剑的位置从左上角的剑首延伸到右下角的剑尖。
首帧和空间布局：在 0.0 秒时，画面精确匹配原材料参考，有五块生铁且看不到手。同一位黑smith 立即从左侧边缘伸手进来。戴着手套的双手从相反方向接近最大的中央块，准备进行支撑性的双手抬起。黑smith 穿着烟灰灰色的袖子、棕色皮革手套，并在右袖口系着一条深色带子。这些细节在每个镜头中保持完全一致。
格式模式：总共 15 秒，六个镜头。在 3.0、5.0、8.0、10.0 和 11.0 秒处硬切。剪辑省略了制造工作和清理工作台的过程。开头的拾取和结尾的放置均作为连续的动作呈现。无淡入淡出、溶解或物体变形过渡。
光学：镜头 1 和 6：匹配参考的高角度四分之三构图，对角线视场角约为 63°，距离桌面中心约 1.8 米。精确的端点构图优先于估计的光学测量。镜头 2–5：对角线视场角 40°，距离工作接触点约 0.8 米。焦点跟随手和金属接触点；工作坊背景保持柔和可读。每个镜头保持固定的视场角。
摄像机：真实的摄像师从工作区面向观众的一侧持机拍摄。所有镜头使用手持稳定：可见的呼吸晃动、轻微的滚动和微小的延迟校正。开镜头在铁块离开画面时保持位置。闭镜头在剑进入时保持空桌面的构图，然后稳定到精确的最终参考。黑smith 是唯一可见的工人；摄像师保持在画面之外。
动作时间线：0.0–3.0 秒——拿起铁块。从精确的首帧参考开始；在 0.0–0.6 秒期间，黑smith 匹配的戴手套的双手从屏幕左侧进入，抓住最大的中央块的相反两端。在 0.6–1.5 秒期间，手腕支撑，双手将铁块从桌面上抬起，露出下方的桌面区域。在 1.5–3.0 秒期间，黑smith 将支撑的铁块从屏幕左侧搬出；其他四块铁块在剪辑期间仍静置在桌面上。3.0–5.0 秒——加热坯料。时间硬切，一块厚坯料已在炉煤中烧得橙红。相同的灰色袖子、棕色手套和右袖带出现在屏幕左侧，黑smith 用长钳夹住坯料。短促受控的拉动将坯料拉向炉口，热量 shimmer 在其鳞状表面上方升起。5.0–8.0 秒——锻造剑身。硬切向前，延长的橙红色剑坯支撑在铁砧上，剑茎在左，伸出的剑尖在右。同一位黑smith 用左手钳固定剑茎，并用右手沿剑身平面进行三次有意的锤击。每次锤击产生局部压缩、手腕反冲和少量黑色氧化皮的飞溅。8.0–10.0 秒——完成金属加工。硬切向前，冷却的剑身已形成血槽，由相同的戴手套的手持握，抵住研磨轮。黑smith 沿斜面进行一次受控的精加工。一股狭窄的火花流从实际接触点落下，露出更明亮的金属条。10.0–11.0 秒——完成剑柄。硬切向前，几乎完成的大剑支撑在单独的组装台上，护手和螺旋金属握柄已安装完毕。同一位黑smith 的左手支撑握柄，右手将刻面剑首拧紧最后一圈。完成的大剑现在具有最终图像所需的精确结构和 finish。11.0–15.0 秒——放置完成的大剑。硬切回原始工作台，现在完全清空；在相同的戴手套的双手从屏幕左侧携带完成的大剑进入之前，展示其空表面 0.4 秒，一只手握住握柄，另一只手在重心附近支撑剑身平面。从 11.4–13.8 秒，黑smith 将整把刚性大剑对角线放下，手柄朝向左上，剑尖朝向右下，轻轻将其放在桌面上，并在重量转移到桌面时滑开支撑的手。从 13.8–15.0 秒，双手释放并通过屏幕左侧退出；大剑保持静止在精确的最终参考位置，摄像机稳定到最后一帧。
物理：原始铁块在拾取过程中保持其形状和质量。双手持续支撑它；前臂紧绷，抬起在重量作用下缓慢加速。铁砧在锻造期间支撑热剑身。形状的巨大变化发生在剪辑的时间跳跃中。完成的大剑在携带和放置过程中保持刚性。支撑剑身的手在剑身沉降时有可见的间隙以滑开；手从未穿过剑身或桌面。金属接触产生短暂的刮擦声和低沉沉重的撞击声，随后是静止。同一位黑smith 在最后一个镜头之前省略的时间内清理剩余的原材料。
光照：原始桌面镜头使用来自摄像机左上方的柔和日光，与两个参考匹配。保留铁中的暗部细节并保护银色剑身高光。锻造插入镜头使用来自左下方的橙色炉煤辉光作为主要光源。在剑进入最终桌面镜头之前恢复原始中性日光。
音频：安静的作坊空气和远处的炉风形成环境底噪。开头：皮革吱吱声、短暂的铁刮擦声和沉重的铁块抬起时克制的用力呼吸声。中间：炉火噼啪声、钳子接触声、三次同步的锤击声、研磨刮擦声和短暂的装配声。结尾：袖子移动声、手套与金属的摩擦声、沉重的大剑撞击桌面的声音，然后是安静的作坊环境音。黑smith 不说任何台词。仅 SFX，无音乐，无配乐，无歌曲，无原声带。
角色表演：一位一致的黑smith 执行所有可见动作。烟灰灰色袖子、棕色皮革手套和深色右袖带保持不变。双手动作 deliberate：抬起前支撑，保持牢固的工具接触，并在放下完成的大剑前降低速度。物理节奏从原始铁块拾取时的费力转变为最终放置时的谨慎控制。面部和躯干保持在裁剪范围之外。
风格：接地气的作坊纪录片，具有触觉感的铁器、磨损的工具和令人信服的手工劳动。柔和的老照片质感，克制的颗粒感和自然的运动模糊；无数字锐化。炭黑色金属和暗淡的棕色表面占主导地位，带有银色高光和局部的炉火橙色。首帧和末帧保留所提供图像的外观。
质量：保持手、手套、袖子细节、金属几何形状和接触阴影的一致性。抬起的铁块露出下方的桌面。闭镜头在剑进入之前明显建立空桌面的构图。保持完整最终大剑的可读性，包括其剑尖、护手、握柄和剑首。避免重复的肢体、闪烁的几何形状和相交的实体表面。
正面约束：首帧恰好包含五块生铁。最大的中央块在物理上由同一位黑smith 的双手离开桌面。最后一个镜头以空桌子开始。完成的大剑在由同一位黑smith 明显支撑的情况下进入，接触桌面，并在双手退出后保持静止。最后一帧精确匹配完成的大剑参考。开头的拾取和最终的放置各自保持连续性，可见手与物体的接触。恰好有一把完成的大剑。无文字叠加、字幕或音乐。
```

#### 首帧、尾帧和中间帧：补全四种写法

官方给出的通用格式如下。方括号部分填入自己的画面与过程描述；独立关键帧入口还需上传对应图片并安排时间点。

```text
首帧：
Use @Image1 as the first frame. [Describe what happens next.]

首尾帧：
Use @Image1 as the first frame and @Image2 as the last frame, then describe the [process] in between.

尾帧：
Use @Image1 as the last frame. [Describe what happens before it.]

中间帧：
X–Y sec | Keyframe 1: [Describe what happens]
Y–Z sec | Keyframe 2: [Describe what happens]
A–B sec | Keyframe 3: [Describe what happens]
```

只确定结尾时，可以像《夜巡》案例那样，用尾帧交代最终画作，提示词安排前面的真人场景怎样逐渐收束过去。已有多幅分镜时，则为每张图交代时间段、人物状态，以及镜头怎样到达下一幅画面。

##### 尾帧：从真人场景收束到《夜巡》

![尾帧参考：完整画作与构图](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-30.webp)

尾帧参考：完整画作与构图

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-30-676f748a5424d847.mp4)

官方尾帧样片：真人场景逐渐成为画作
查看完整官方英文提示词 · 尾帧：真人场景收束为《夜巡》

```
SCENE CONTEXT — EXACTLY ONE HISTORICAL SCENE, NO ADDITIONAL CHARACTERS. Use @Image1 as the exact final-frame reference for character costumes, positioning, lighting, composition, and painterly color palette. Create a 15-second cinematic short film depicting a 17th-century civic militia gathering to march out from a dimly lit archway. The first half must look entirely like live-action footage, with a high degree of photorealism. Only toward the end should the scene gradually transform into the original painting within the same continuous shot. Characters must not emerge from the painting, and no oil-paint textures may appear at the beginning.
LOCATION AND ATMOSPHERE: A dark urban archway opens onto stone pavement where a civic militia gathers to march. Urban dust hangs in the air, and a warm shaft of sunlight enters from the side. Use dramatic Rembrandt-style chiaroscuro while keeping the space shrouded in nighttime darkness. Do not create a moonlit-night appearance.
CAMERA AND OPTICS: Use cinematic photorealism, finely rendered textures, realistic lens depth of field, subtle handheld breathing, and smooth tracking and pullback movements. The camera begins low to the ground, tracks naturally through the marching crowd, then gradually pulls back and rises slightly. The entire sequence remains one continuous shot, maintaining spatial continuity between the live-action scene, the transforming painting, and the surrounding dark environment.
FORMAT MODE: 15 seconds total, one continuous shot. No hard cuts, white flashes, page-turn effects, or transitions that interrupt spatial continuity. The transformation from live action to painting occurs gradually within the same shot, progressing from the edges toward the center.
ACTION TIMING:
0.0–3.0s — THE MILITIA MARCHES. Track low to the ground as boots march across stone pavement. Drumsticks strike, and a red sleeve sweeps past the camera. The camera naturally tilts upward, following a musket as it passes beneath a flag. All movements feel realistic and weighty, with natural walking speed and no slow motion. The scene remains entirely photorealistic, with no visible oil-paint textures.
3.0–8.0s — MOVE THROUGH THE CROWD. The camera moves steadily through the crowd, finding the captain dressed in black with a red sash. He turns to check the formation and extends his hand forward to give a command. Beside him, a lieutenant dressed in pale gold steps forward. In the background, guards raise their pikes and adjust their formation. A blonde little girl briefly looks back at the group. Expressions and movements remain natural and restrained, as if spontaneously captured by a camera in a historical film. Maintain fully realistic skin, fabric, metal, and architectural details.
8.0–12.0s — REVEAL THE COMPOSITION. The camera continuously pulls back and rises slightly. As the group continues moving, the characters gradually settle into their precise positions in the original painting. The captain's outstretched hand, the lieutenant's pose, the red-clad guard in the doorway, the Afghan girl, the weapons, and the drummer on the right all come into view simultaneously. At this moment, the drumbeat abruptly stops, and everyone freezes for half a second. Preserve realistic live-action appearance as the composition becomes fully readable.
12.0–15.0s — TRANSFORM INTO THE PAINTING. Continue the same slow pullback without cutting. The realistic skin, fabric, metal, and architectural details gradually transform from the edges toward the center into rich oil paint and visible brushstrokes. The surrounding scene progressively resolves into the original painting,
The Night Watch
, fully revealing @Image1. Preserve the exact positions, character costumes, proportions, lighting, color palette, and composition of the original painting. By the end, the transformation is complete, and the image remains motionless.
FINAL FRAME AND COMPOSITION: The final painting must retain its complete original aspect ratio and be displayed centered in the frame, with seamless spatial continuity between the painting and the surrounding dark environment. Do not crop the original painting, alter its composition, or introduce any additional characters. Hold the completed image motionless until the end.
LIGHTING AND COLOR: Begin with nighttime darkness, dramatic Rembrandt-style chiaroscuro, warm side lighting, and dust suspended in the air. Do not introduce moonlight. During the live-action portion, maintain realistic cinematic lighting and natural material textures. As the painting transformation progresses, preserve the original painting's distinctive lighting, rich oil-paint colors, and visible brushwork.
PHYSICS AND MOTION: Boots maintain convincing contact with the stone pavement. Weapons, clothing, and equipment move with realistic weight and inertia. The captain's gestures, the lieutenant's forward movement, the guards' formation adjustments, and the girl's brief backward glance remain physically natural. The transition into the painting changes the visual rendering of the existing scene rather than causing characters to emerge from or move out of the painting.
AUDIO: Environmental audio consists of boots on stone, rustling fabric, subtle metallic clinks, and live drums. Add low strings and gradually intensifying orchestral music, building to a climax as the camera pulls back. At the moment the scene freezes, the drums stop, leaving only a brief musical resonance. The sound design must support the cinematic progression from a living historical scene to a motionless painted composition.
STYLE: Cinematic historical realism transitioning into the original oil painting. The opening and middle sections must look entirely like live-action footage, with realistic skin, fabric, metal, architectural surfaces, lens depth of field, and natural motion. Rich oil-paint textures and visible brushstrokes appear only toward the end, gradually replacing the photorealistic rendering.
POSITIVE CONSTRAINTS: Maintain consistent character identities, costumes, positions, weapons, and spatial relationships throughout the continuous shot. Preserve the exact final composition of @Image1. The first half remains fully photorealistic. The transformation progresses from the edges toward the center and completes by 15.0 seconds. No characters emerge from the painting. No additional characters, cropped painting, hard cuts, white flashes, page-turn effects, or premature oil-paint textures. The final frame matches the original painting's full aspect ratio and composition, centered within the surrounding dark environment.
```

##### 中间帧：为六个画面安排过渡

![官方关键帧参考图 1](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-31.webp)

官方关键帧参考图 1

![官方关键帧参考图 2](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-32.webp)

官方关键帧参考图 2

![官方关键帧参考图 3](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-33.webp)

官方关键帧参考图 3

![官方关键帧参考图 4](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-34.webp)

官方关键帧参考图 4

![官方关键帧参考图 5](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-35.webp)

官方关键帧参考图 5

![官方关键帧参考图 6](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-36.webp)

官方关键帧参考图 6

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-31-e7dacbb6eca1540a.mp4)

官方中间帧样片：少女六段分镜
查看完整官方英文提示词 · 中间帧：六幅少女分镜

```
SCENE CONTEXT EXACT 1 CHARACTER — NO DUPLICATES. 0.0–2.1s | Keyframe 1: Looking Up from the Floor. Strictly match Image Node_23. Wide, static composition: The girl sits on mint-green tiled flooring, leaning against a cabinet and the corner of a wall, with her legs naturally extended apart and both hands resting lightly between her knees. Soft light filters through the plaid curtains and falls across the tiles. She initially keeps her gaze lowered, then slowly lifts her head toward the window light, lips slightly parted, as if hearing a melody from far away. The curtains sway only slightly, while the lace hem of her skirt and the tips of her hair show the faintest hint of movement with her breathing. The camera slowly pushes in by approximately 3% without changing the composition.
2.1–4.3s | Keyframe 2: Close-Up of the Recorder, Sound-Matched Cut. At the peak of the girl's head-lifting motion, a clear, brief recorder note enters 0.1 seconds early. Hard cut to the medium close-up from Image Node_29 (2). The girl closes her eyes and gently plays a white recorder, completing one full but brief exhalation. Only two or three fingers make subtle adjustments over the holes. Her cheeks puff out slightly, then relax. Do not distort the recorder, exaggerate her puffed cheeks, or add extra fingers. Keep the camera steady and the plaid curtains softly out of focus in the background.
4.3–6.5s | Keyframe 3: Hands and Gaze, Action-Matched Cut. The instant the recorder note ends, hard cut to Image Node_18. The girl stands by the window in front of mint-green wall paneling, with both hands held beside the right side of her face, as if gathering the melody into her palms. She keeps her gaze lowered for approximately 0.4 seconds, then gently raises her eyes to look directly into the camera. Her fingers make one extremely subtle closing motion, and her beaded bracelet catches a glint of window light. The camera pushes in extremely slowly from a medium shot, keeping her centered and the interior clean and uncluttered.
6.5–8.5s | Keyframe 4: Detail of Dangling Legs, Skirt-Matched Cut. As her hands slowly move away from the sides of her face, use the moment they drop out of the bottom edge of the frame as the cut point. Hard cut to Image Node_21. Low-angle close-up: The girl sits on the edge of a tall mint-green cabinet. Only her mint-green lace skirt, white stockings, pale green Mary Jane shoes, and one hand lightly touching the cabinet edge are visible. Her legs remain together and dangle freely. Her toes gently swing forward once, pause, then naturally return to a vertical resting position. The lace hem sways slightly with the movement. Do not exaggerate the swinging motion, let her legs touch the floor, or change the positions of the cabinet and bathtub.
8.5–10.8s | Keyframe 5: Still Gaze on the Bed, Shoe-Tip-Matched Cut. As both shoes swing back downward, hard cut to Image Node_22. The girl lies on her stomach on a mint-green bed, resting her face in both hands with her feet raised behind her. The composition is gentle, with ample negative space. She looks at the camera first, then softly shifts her gaze toward the window light on the left before returning it to the camera. Her feet perform only one small, synchronized crossing motion at the shoe tips, then relax. The bedsheet develops only the faintest soft folds. Do not turn her into a side-lying pose or change the positions of the pillows, bedsheet, table lamp, plants, or framed pictures.
10.8–13.5s | Keyframe 6: Paper in the Foreground, Final Gaze. Use a corner of the pale bedsheet passing across the frame as an occlusion transition, then hard cut to Image Node_20. The girl sits on a white chair, with her transparent glasses strictly matching the keyframe. A sheet of white paper slowly drifts across the frame from the lower left and upper edge, briefly obscuring part of her forehead and shoulder, but must never cover her entire face for more than 0.3 seconds. She gazes quietly at the camera through the moving sheet of paper. After blinking once, she tilts her head slightly to the right by approximately 3 degrees and holds the position. The paper drifts out of frame. Keep the camera steady, and do not create a storm-like flurry of paper.
13.5–15.0s | Gentle Fade to Black. Maintain the final composition of Keyframe 6. After the paper leaves the frame, the girl remains still, maintaining a calm, direct gaze. The daylight by the window gradually dims like a soft light being slowly turned down. The mint-green walls, curtains, girl, and chair all fade evenly into shadow. Do not abruptly switch off the lights, change the color temperature, or add any text.
```

少女案例原文保留了 `Image Node_23` 等素材名，不是通用编号。使用时先按姿态找对图片，再换成自己工作区的实际编号；各段时间也要与选定生成时长一致。

---

### 把声音、文字和画面要求写具体

##### 1. 声音生成的真实边界

可灵 4.0 支持双声道立体声与原生口型同步，音频输入存在以下规则边界：

- **音频输入仅支持“音色（Voice profile）”**：支持上传 5–30 秒单一人声音频作为音色参考，但生成后仍需试听声音是否符合要求；
- **不支持直接上传背景音乐或音效文件**：无法通过上传音频指定 BGM 或音效。所需的配乐风格、环境底噪或动作音效，需在提示词的 `[Audio]` 区域用文字描述，由模型生成；
- **音画同步与智能分镜默认开启**：音画同步与智能分镜默认启用，没有单独的开关。对话生成时，建议在提示词中明确说话人角色、使用该语言的原语言台词并用引号注明（如西语 `“¿Dónde está la estación de metro más cercana?”`），并具体描述年龄、音色、语速与情绪等声音特征。

官方的三人对话案例只使用两种语言：游客用西班牙语问最近的地铁站，翻译先用中文转述，工作人员用中文回答，翻译再用西班牙语说明路线。提示词分别规定说话人、台词、停顿，以及其余人保持安静。

![三人站位参考：游客、翻译、工作人员](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-21.webp)

三人站位参考：游客、翻译、工作人员

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-21-b983b76551245d08.mp4)

官方样片：西班牙语与中文的三人对话
查看完整官方英文提示词 · 三人多语言对话

```
SCENE CONTEXT EXACT 3 UNIQUE HUMAN CHARACTERS ACROSS THE VIDEO: Three people are in a bright, clean, fictional city tourist information center. Maintain consistent color tones throughout. The tourist stands on the left, the interpreter stands in the middle, and the tourism staff member stands on the right. A city map and route diagram are placed on the information desk. Background text and map labels must be blurred and unreadable. No real brands, organization names, logos, or watermarks may appear.
ACTION TIMING:
0–3 seconds: Medium shot of all three people. The Spanish female tourist looks at the interpreter in the middle, raises the map in her hand, and speaks in natural, clear, slightly slow Spanish: “¿Dónde está la estación de metro más cercana?” After she finishes speaking, pause for approximately 0.5 seconds. The interpreter turns to the tourism staff member and translates into Chinese: “她想知道最近的地铁站在哪里。”
3–7 seconds: Cut to the interpreter and the tourism staff member. The tourism staff member looks at the map (do not use a close-up of the map) and answers in natural, clear Chinese: “沿这条路直走，步行大约五分钟就能到。” After the staff member finishes speaking, pause for approximately 0.5 seconds. The interpreter confirms understanding and turns toward the tourist.
7–11 seconds: The interpreter translates the staff member's answer into natural, clear, slightly slow Spanish: “La estación de metro está a unos cinco minutos a pie. Siga recto por esta calle.” While speaking, the interpreter points to the route on the map, and the tourist studies it attentively.
11–15 seconds: Return to a medium shot of all three people. After understanding the directions, the Spanish tourist smiles, nods, and says in Spanish: “Muchas gracias.” All three maintain a natural service interaction as the scene ends.
AUDIO:
- The Spanish tourist speaks only Spanish.
- The Chinese tourism staff member speaks only Chinese.
- The Chinese interpreter speaks Chinese first, then Spanish.
- Each person has a distinct voice.
- When one person is speaking, the others remain silent. No interruptions or overlapping dialogue.
- All dialogue must have clear vocals, with lip movements synchronized to the corresponding language.
- Spanish pronunciation must be natural and standard, without English-accented pronunciation.
- Speech should be slightly slow, with natural pauses between sentences.
- Retain subtle ambient sounds from a tourist information center. Do not add background music. Ambient sounds must not overpower the dialogue.
CAMERA: Begin with a medium shot of all three people to establish their relationships. When the tourist speaks, cut to a two-shot of the tourist and interpreter. When the interpreter relays the question, cut to the interpreter and staff member. During the staff member's response, include a close-up of the map route. When the interpreter translates into Spanish, return to a two-shot of the interpreter and tourist. End with a medium shot of all three people. Maintain consistent character positions, eyelines, and clothing throughout. Do not abruptly replace characters or change their spatial relationships.
STYLE: Realistic, natural, professional travel-service documentary style. Bright, clean lighting, natural facial expressions, and restrained movements. The scene should resemble an authentic interaction at an airport or city tourist information center.
```

指南列出的语言包括中文、英语、日语、韩语、西班牙语、葡萄牙语、德语、法语和印地语；方言包括四川话、粤语。中文口音包括北京、东北与台湾口音，英语口音包括美式、英式与印度口音。实际配音仍要逐句听，检查语言、台词和说话人是否对应。

##### 2. 视频内文字生成与字幕设定

可灵 4.0 支持在视频中渲染多语种文字、emoji 与 logo，官方宣称即使在镜头运动和切镜过渡时，画面文字也能保持稳定清晰，适合用于品牌广告、产品包装、门面招牌与屏幕界面等画内文字展示。若需要直接生成字幕，提示词中需指定字幕的屏幕位置（如底部安全区）、字号、显示时段以及与台词的严格同步；但官方宣传不能当作逐字无错的保证，生成后仍需检查文字拼写、字符数量与出现时序。

前面的儿童计数案例也可以这样对照看：数字 1–4 的写法、实物数量、加法过程、英文字幕的出现时间，要分别检查。风格像毛毡，不代表数量和字幕就一定正确。官网在这组案例中提供了风格图与结果，没有附提示词引用的教学参考视频 `@Video1`。

![@Image1：仅借手工材质与视觉世界](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-23.webp)

@Image1：仅借手工材质与视觉世界

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-23-a409399a2985edf9.mp4)

官方样片：1—4计数与英文字幕

指南该表格未附提示词中引用的教学参考视频 @Video1；这里提供已公开的风格图、结果和完整提示词。
查看完整官方英文提示词 · 儿童计数：素材分工与文字

```
SCENE CONTEXT: EXACTLY 3 UNIQUE CHARACTERS ACROSS THE VIDEO — NO DUPLICATES.EXT. Enchanted counting forest classroom, warm morning. One soft cream cloud teacher teaches the numbers 1, 2, 3 and 4 in four separate shots. Two tiny yellow chick pupils appear only in the number-two shot.3 characters across the video, 5 hard-cut shots, 15s, real time.ACTIVE REFERENCES@Video1: content, narration and timing reference only — preserve the educational progression, additive explanations and final recap. Never inherit its white studio environment or visual style.@Image1: visual-world reference only — handmade clay-and-felt materials, rounded toy-like forms, pastel forest trunks, mossy ground, rainbow colours, warm diffused backlight and shallow storybook depth. Never inherit its existing characters, numerals or composition.
LOCATION MAP: All five shots occur on the same circular moss stage inside one enchanted forest classroom.One broad warm-brown tree trunk anchors frame-left; a second tree trunk anchors frame-right. A curved pastel rainbow root crosses the background. The central teaching pedestal remains in the same position in every shot. Camera always stays on the front side of the teaching axis, between 3.0 and 3.3 m from the pedestal. The sun always comes from upper frame-right. Background geometry, material scale and colour palette remain identical after every cut.
FIRST FRAME AND SPATIAL BLOCKING: Shot 1: the cloud teacher floats centre-left, facing a large red felt numeral 1 on the central pedestal. One red apple is concealed inside the moss below it. Shot 2: The cloud teacher floats centre-left, facing a large amber felt numeral 2. Two yellow chicks begin concealed behind the pedestal. Shot 3: the cloud teacher floats centre-left, facing a large green felt numeral 3. Three blue felt stars begin nested inside the moss. Shot 4: the cloud teacher floats centre-left, facing a large blue felt numeral 4. Four purple clay blocks begin below the pedestal. Shot 5: the cloud teacher floats alone at centre, facing the viewer beneath the rainbow root. Every shot begins mid-gesture with the teacher already pointing toward the active numeral. No empty establishing beat.
FORMAT MODE: Horizontal 16:9, total 15s, real time, 5 shots connected by clean hard cuts.Shot 1 — 0.00–4.00s: number 1 and one apple.Shot 2 — 4.00–7.08s: number 2 and two chicks.Shot 3 — 7.08–10.21s: number 3 and three stars.Shot 4 — 10.21–13.08s: number 4 and four blocks.Shot 5 — 13.08–15.00s: spoken recap and celebration. Each number receives its own separate shot. Numerals 1, 2, 3 and 4 never share the same teaching frame.No fades, dissolves or split screens.
OPTICS: 35mm equivalent, 54° horizontal FOV, locked across all five shots. Identical natural perspective, camera height, background scale and depth-of-field character after every cut. Focal plane remains on the cloud teacher, active numeral and active quantity. Foreground flowers softly obscure the lower corners. Distant trees dissolve into the same creamy storybook blur.
CAMERA: Every shot is operated handheld at approximately 105 cm height from the front side of the teaching axis. World register: gentle SETTLE. Shot 1: slow 10 cm push toward numeral 1. Shot 2: slow 10 cm push toward numeral 2. Shot 3: slow 10 cm push toward numeral 3.Shot 4: slow 10 cm push toward numeral 4. Shot 5: slow 8 cm push toward the celebrating teacher.Visible handheld character throughout: breath sway, micro-roll, late tiny corrections and gentle but obvious handmade shake. Numerals and subtitles remain readable. Camera height, axis and movement speed match across all cuts.Not a gimbal, slider, tripod lock-off, drone or digitally stabilised camera.
ACTION TIMING 0.00–0.78s: Shot 1 begins. The cloud teacher already points toward the red numeral 1. 0.78–1.98s: numeral 1 rises and completes one soft bounce. 1.98–4.00s: one red apple rises from the moss and settles beneath numeral 1. 4.00–4.86s: hard cut to Shot 2. The amber numeral 2 rises and completes one soft bounce. 4.86–7.08s: one yellow chick hops out from the left, then a second chick joins from the right; they touch shoulders and settle together. 7.08–8.04s: hard cut to Shot 3. The green numeral 3 rises and completes one soft bounce. 8.04–10.21s: two blue felt stars rise together, followed by one additional star; the three stars settle into a clear triangular arrangement. 10.21–11.06s: hard cut to Shot 4. The blue numeral 4 rises and completes one soft bounce. 11.06–13.08s: three purple blocks assemble first; one additional block clicks into the fourth position. 13.08–14.40s: hard cut to Shot 5. Four tiny coloured fireflies pulse sequentially red, amber, green and blue while the teacher points from left to right. 14.40–15.00s: the teacher opens both arms; a small clay sun unfolds above the rainbow and releases a brief sparkle burst.
PHYSICS: The cloud teacher has the buoyancy of a lightweight stuffed felt puppet, with soft vertical drift and delayed arm movement. Each numeral has padded felt weight: it compresses, rebounds once and settles. The apple lands with soft clay weight. The chicks’ feet squash slightly into the moss. Stars descend with gentle air resistance. Blocks connect with firm edge-to-edge contact. Every quantity remains stable and readable until its shot ends. Hard cuts reset the teaching pedestal cleanly while preserving the same forest, teacher identity, material scale and lighting.
LIGHTING: One identical motivated source in every shot: warm morning sunlight filtering through the trees from upper frame-right.The teacher’s lower-left side remains slightly darker in all five shots. Soft rim light separates the felt fibres from the forest. Protect the cream cloud, pastel numerals and rainbow highlights from clipping. The direction, colour temperature, haze density and exposure remain unchanged across every cut.
AUDIO VOICEOVER: The cloud teacher speaks in English with the same warm, clear, medium-high preschool-teacher voice in every shot. Pronunciation is slow, encouraging and rhythmically precise.0.78s: “One.”1.98s: “One means just one.”4.16s: “Two.”4.86s: “Two means one and one together.”7.26s: “Three.”8.04s: “Three means two and one more.”10.32s: “Four.”11.06s: “Four means three and one more.”13.32s: “One, two, three, four.”14.40s: “Great job!”
MUSIC: one continuous original children’s instrumental across all cuts, using soft marimba, toy piano, light ukulele, felt-drum taps and gentle handclaps. The same melody, tempo and instrumentation continue seamlessly through every shot. It rises slightly with each new number and ends with a short celebratory flourish.SFX: one soft felt pop for each numeral bounce; one clay plop for the apple; two tiny moss footsteps for the chicks; three sparkle chimes for the stars; four wooden clicks for the blocks; four soft firefly pings during the recap; one bright celebration chime at the end.
AMBIENCE: continuous close grass rustle, mid-distance leaves and faint woodland birds. The ambience never resets at the cuts.MIX: narration remains clear and centred. Music ducks beneath every spoken line. Sound effects synchronise exactly with the quantities. Music and ambience remain continuous across every hard cut.
SUBTITLES: Burned-in English subtitles, bottom-centre inside the title-safe area, positioned 10% above the lower edge.One or two lines maximum. Rounded cream felt subtitle panel with dark chocolate-brown bold lettering, high contrast and stable placement. Subtitles appear and disappear exactly with the matching narration:0.78–1.38s: “ONE.”1.98–3.84s: “ONE MEANS JUST ONE.”4.16–4.66s: “TWO.”4.86–6.82s: “TWO MEANS ONE AND ONE TOGETHER.”7.26–7.78s: “THREE.”8.04–10.16s: “THREE MEANS TWO AND ONE MORE.”10.32–10.80s: “FOUR.”11.06–13.08s: “FOUR MEANS THREE AND ONE MORE.”13.32–14.24s: “ONE, TWO, THREE, FOUR.”14.40–15.00s: “GREAT JOB!”
CHARACTER ACTING: Cloud teacher: identical body proportions, cream felt texture, tiny arms, dot eyes, rosy cheeks and a small smiling mouth in every shot. Uses slow preschool-teaching gestures. The gaze always lands on the active numeral or quantity. The expression gradually changes from patient concentration in Shot 1 to a broad celebratory smile in Shot 5.Shot 1: points with one hand and watches the single apple settle.Shot 2: brings both hands together as the two chicks join.Shot 3: traces a small triangle after the third star appears.Shot 4: raises four soft fingertips after the final block connects.Shot 5: points across four firefly pulses, then opens both arms toward the viewer.Two chick pupils: appear only in Shot 2. The first chick leaves a visible space beside itself; the second fills that space. Both look up at the teacher and blink once after joining.
STYLE: One perfectly consistent handmade clay-and-felt stop-motion storybook world across every shot.Rounded silhouettes, tactile fingerprints, plush fibres, softly imperfect surfaces, oversized friendly trees, moss carpet, tiny flowers and pastel rainbow details.Identical teacher model, forest geometry, prop scale, material softness, lens character and lighting direction after every cut.Soft vintage optical character, old-photograph texture, subtle film grain, slight halation and natural motion blur.Colour 60:30:10 = moss green and warm wood / cream and pastel numeral colours / coral-red and sunny-yellow accents. Vintage photo softness, no sharpening.
QUALITY: The cloud teacher, active numeral, active quantity and subtitles remain readable in every shot. Numeral shapes are conventional, upright and unambiguous. Subtitle spelling, punctuation and timing match the specified script exactly. Subtitle size, typeface, panel shape and screen position remain identical across all cuts. Soft old-photo resolution, never digitally sharpened.Natural motion blur without ghosting, duplicated limbs, malformed numerals, incorrect quantities or plastic CGI surfaces.
POSITIVE CONSTRAINTS: Numbers 1, 2, 3 and 4 each receive one separate teaching shot. Only one large numeral appears in each teaching shot. Shot 1 contains exactly one apple. Shot 2 contains exactly two yellow chicks. Shot 3 contains exactly three blue stars. Shot 4 contains exactly four purple blocks. Shot 5 contains only the cloud teacher, four sequential firefly pulses and the final clay sun. The same cloud teacher identity, forest style, light direction, optics, colour palette, music and subtitle design continue across every cut. Speech count: exactly 10 lines. Every subtitle matches its spoken line word for word. A shared 1–4 teaching frame, split screen, incorrect quantity, extra character, style change, lighting change, malformed subtitle or mismatched narration = failed shot.
```

##### 3. 告别抽象词：可灵 4.0 的视觉语言翻译

提示词支持最长 8,000 tokens。token 是文本分词的计量单位，不等于 8,000 个中文字。长提示词不等于必然产出高质量画面。指南建议使用具体描述语言，尽量减少抽象词与否定句。否定句有实际用途，例如在不需要字幕或背景音乐时，可按需写入 **`no subtitles`** 或 **`no background music`** 显式排除；在风格控制中，也可通过排除写实风格来避免动画风格混杂。

在正向描述中，应将模糊的评价词转化为画面中具体可见的光学、材质与构图参数：

- ❌ **“画面有高级感 / 电影质感”**
  👉 ✅ “侧逆光勾勒主体边缘轮廓，浅景深、背景虚化，物体表面呈现细微哑光颗粒感与微弱手持呼吸抖动。”
- ❌ **“复古怀旧风格”**
  👉 ✅ “泛黄的粗糙墙面，家具边缘带有磨损掉漆痕迹，低色温暖色白炽灯照明，微弱胶片噪点与光晕。”
- ❌ **“一个中产家庭的厨房”**
  👉 ✅ “深色木纹橱柜，台面上摆放着电饭煲与透明调料罐，冰箱门贴有手写便签，清晨柔和侧光透过百叶窗照入。”

---

### 跟着官方漂移案例做一次素材分工

可以直接使用官方运镜参考案例（赛车漂移）作为上手跟做练习，体验在全能参考中如何将运镜、主体与背景分别交给三份不同素材分工处理。

本次练习使用的素材均可从文末第 3 组案例中直接下载：

- **素材准备与上传顺序**：
  - `@Image1`：彩色赛车多视图（`source-image-04.png`），负责定义替换车辆的外观造型与涂装细节；
  - `@Image2`：夜间霓虹港口（`source-image-05.png`），负责提供替换后的夜景环境与光影氛围；
  - `@Video1`：7.04 秒日间白车赛道漂移原参考视频，负责提供运镜轨迹、镜头跟随与切镜节奏。
  > 提示：在全能参考工作区上传时，请严格核对素材编号顺序（先上传两张图片分别为 `@Image1`、`@Image2`，再上传视频为 `@Video1`）。

##### 练习设置（教学操作起点）

- **创作入口**：全能参考（Omni Reference）
- **生成模式**：标准版 Kling 4.0
- **分辨率**：`1080p`
- **画幅比例**：`16:9`
- **生成时长**：`7s`

（官方未披露这次任务的生成参数；以上为教学练习设置。）

##### 官方英文提示词（逐字来自官方指南）：

```text
Use @Video 1 as the reference for camera movements and shot pacing. Replace the Element with the car from @Image 1 and the background with @Image 2.
```

##### 中文释义/译文（任选一版发送）：

```text
以 @Video 1 作为运镜与镜头节奏的参考。将画面主体替换为 @Image 1 中的赛车，背景替换为 @Image 2。
```

> 如需扩写，请将修改版另存，保留这段官方原文用于对照。

##### 生成路径与复看检查

在全能参考入口完成素材上传与提示词输入后发送生成。生成后可对照前面展示的官方演示片段或文末第 3 组案例进行效果核对（注意官方样片仅作为对照目标，不是本次练习已跑出的成片结果）。重点复看以下三项：

1. **车辆外观与细节**：生成的赛车是否准确还原了 `@Image1` 的车体结构与彩色涂装，在高速运动与转弯过程中车身是否稳定、有无异常形变；
2. **夜景环境与光影**：白天赛道是否完整替换为 `@Image2` 的夜间霓虹港口，车身表面是否有港口灯光与霓虹倒影的自然反射；
3. **运镜与切镜节奏**：原参考视频 `@Video1` 的镜头推拉、绕车追随与切镜节点，是否被准确借用并自然衔接。

若生成结果不符合预期，排查时应遵循**单变量排查路径**：一次只改动一份素材，或只修改一条具体描述，便于准确定位影响因素。若在尝试中修改了提示词，需明确这是在原文基础上的调整，官方原提示词仍需完整保留。

---

### 为下一次生成留下准备与复看记录

在开启新的可灵 4.0 视频生成任务时，建议复制以下两份模板，生成前确认素材分工，生成后记录实际偏差。

复制或下载：拍摄前简报 + 生成后复看记录

两份空白模板，不包含你在配额计算器中填写的数字。
## 可灵 4.0 镜头准备与复看工具包

拍摄前简报 + 生成后复看与调整记录。下载的是空白模板；文中的示例仅用于说明填写方式。

### 拍摄前简报

#### 可灵 4.0 拍摄前简报

**1. 基础设定**
- 镜头名称 / 场次：
- 创作入口：[ ] 全能参考（Omni Reference）  [ ] 独立关键帧（Keyframes）
- 选用模式与规格：
  - [ ] 标准版：时长 ___ 秒（3–30s） ｜ 分辨率 [ ] 720p  [ ] 1080p  [ ] 4K ｜ 画幅比 ___
  - [ ] Flash 版：时长 ___ 秒（≤20s） ｜ 最高 720p（不支持首尾帧与多关键帧） ｜ 画幅比 ___

**2. 素材规划（总素材限额 ≤15 仅适用于全能参考）**
- 图片素材：___ 张（图片 ≤10）
- 视频素材：___ 段，累计 ___ 秒（共享视频池 ≤5段且累计 ≤30s）
- 音色素材：___ 个（≤3个，单段 5–30s）
- 独立元素：___ 个（≤7个，其中视频元素 ≤3 且计入视频额度）
- 素材总数核算（全能参考）：___ / 15（每个素材计 1 次）

**3. 素材分工与提示词约定**
- 素材角色：明确各素材贡献（如 @Image1 定义外观，@Video1 参考运镜与节奏）
- 保留与排除：编辑任务注明改动目标与保留要求；按需写入 `no subtitles` / `no background music` 排除字幕或配乐
- 时间轴动作：按秒划分镜头动作、运镜与受力细节

### 生成后复看与调整记录

#### 可灵 4.0 生成后复看与调整记录

- 镜头标识：Shot_01_v1
- 生成参数：Kling 4.0 标准版 ｜ 1080p ｜ 10s ｜ 16:9

**一、生成结果多维度复看**
1. 主体与材质：[ ] 符合设定  [ ] 存在局部漂移  [ ] 结构形变
2. 动作与运镜：[ ] 节奏契合  [ ] 移动过冲或不连贯  [ ] 未按时间段执行
3. 接触与受力：[ ] 接触自然  [ ] 穿模或漂浮  [ ] 边缘软化
4. 音画表现：[ ] 口型与音效对应良好  [ ] 声音错位或有杂音  [ ] 出现未预期字幕/配乐

**二、调整建议与待验证假设**
> **排查建议**：调整时建议每次只改动一个变量（如修改提示词中的一处动作描述，或仅替换一张参考图），便于定位影响因素。

- 观察到的现象：
  例如：03–06 秒处手部接触产品时边缘软化，放置支架时过程交代不足。
- 待验证假设（排查方向）：
  [ ] 缺少接触承重与手部受力细节描述
  [ ] 未在提示词中交代支撑物的预先存在与接触过程
  [ ] 参考视频与目标动作在节奏上差异较大
- 本次调整动作：
  细化手部拿起与放回支架的接触描述，明确支架起始存在。
- 下一版本：Shot_01_v2（保持其余条件不变，重新生成对比）

#### 《可灵 4.0 拍摄前简报（Pre-shoot Briefing）》

```markdown
#### 可灵 4.0 拍摄前简报

**1. 基础设定**
- 镜头名称 / 场次：
- 创作入口：[ ] 全能参考（Omni Reference）  [ ] 独立关键帧（Keyframes）
- 选用模式与规格：
  - [ ] 标准版：时长 ___ 秒（3–30s） ｜ 分辨率 [ ] 720p  [ ] 1080p  [ ] 4K ｜ 画幅比 ___
  - [ ] Flash 版：时长 ___ 秒（≤20s） ｜ 最高 720p（不支持首尾帧与多关键帧） ｜ 画幅比 ___

**2. 素材规划（总素材限额 ≤15 仅适用于全能参考）**
- 图片素材：___ 张（图片 ≤10）
- 视频素材：___ 段，累计 ___ 秒（共享视频池 ≤5段且累计 ≤30s）
- 音色素材：___ 个（≤3个，单段 5–30s）
- 独立元素：___ 个（≤7个，其中视频元素 ≤3 且计入视频额度）
- 素材总数核算（全能参考）：___ / 15（每个素材计 1 次）

**3. 素材分工与提示词约定**
- 素材角色：明确各素材贡献（如 @Image1 定义外观，@Video1 参考运镜与节奏）
- 保留与排除：编辑任务注明改动目标与保留要求；按需写入 `no subtitles` / `no background music` 排除字幕或配乐
- 时间轴动作：按秒划分镜头动作、运镜与受力细节
```

#### 《生成后复看与单变量调整记录（Iteration Log）》

```markdown
#### 可灵 4.0 生成后复看与调整记录

- 镜头标识：Shot_01_v1
- 生成参数：Kling 4.0 标准版 ｜ 1080p ｜ 10s ｜ 16:9

**一、生成结果多维度复看**
1. 主体与材质：[ ] 符合设定  [ ] 存在局部漂移  [ ] 结构形变
2. 动作与运镜：[ ] 节奏契合  [ ] 移动过冲或不连贯  [ ] 未按时间段执行
3. 接触与受力：[ ] 接触自然  [ ] 穿模或漂浮  [ ] 边缘软化
4. 音画表现：[ ] 口型与音效对应良好  [ ] 声音错位或有杂音  [ ] 出现未预期字幕/配乐

**二、调整建议与待验证假设**
> **排查建议**：调整时建议每次只改动一个变量（如修改提示词中的一处动作描述，或仅替换一张参考图），便于定位影响因素。

- 观察到的现象：
  例如：03–06 秒处手部接触产品时边缘软化，放置支架时过程交代不足。
- 待验证假设（排查方向）：
  [ ] 缺少接触承重与手部受力细节描述
  [ ] 未在提示词中交代支撑物的预先存在与接触过程
  [ ] 参考视频与目标动作在节奏上差异较大
- 本次调整动作：
  细化手部拿起与放回支架的接触描述，明确支架起始存在。
- 下一版本：Shot_01_v2（保持其余条件不变，重新生成对比）
```

---

### 官方案例素材与完整提示词

以下保留了指南中的 **21 组完整案例**：每组均可展开查看输入参考图、参考视频、官方生成结果与完整英文提示词，原图和原视频可分别下载。支持按任务查找多人参考、动作、运镜、构图、故事板、增删替换、创意重做、声音文字、首尾及中间帧等功能。

长提示词中的时间轴、台词、音频、保留项与排除项均保留原文。使用前请根据您上传的素材核对 `@` 编号；下方标明了官网未提供素材的情况，以及原表排列与提示词编号不同的情况。完整提示词也可整份下载。

[下载全部官方提示词（Markdown）](https://best.xiaohu.ai/media/kling-4-model-user-guide/kling-4-model-user-guide-official-prompts.md)

按任务展开查看输入图、参考视频、官方结果与完整提示词。图片与视频均可下载原件；中文为查询标题，英文保留全部约束。

#### 01 · 多人、多道具参考

##### 输入参考素材

官网将多人、车辆与器材拼在一张素材总览中，但提示词却按六个图片编号引用。复现时请将其拆分为相应的参考图，并按实际上传编号进行改写。

![多人、多道具参考 · 官网参考图 image-01](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-01.webp)

官网参考图 image-01 · [下载原图](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-image-01-718638a1415f12a8.png)

##### 官方结果

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-01-61ef61635eebee71.mp4)

多人、多道具参考 · 官方结果

[下载原始视频 · 15.00 秒](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-01-61ef61635eebee71.mp4)

输入参考：[image-01](https://static-50.klingai-cdn-aws.com/kling-blog/file_by_url/718638a1415f12a8a259928d829f6b96678acf35f7ed493643ddd9acd835b832.png)

官方结果：[video-01](https://static--59.klingai-cdn-aws.com/kling-blog/presigned_url/f671c2ce-6245-44f4-851a-ed927d4949da_1-1-1.mp4)

```
【Overall Style】
15 seconds, realistic live-action cinematic quality. A coastal city street at dusk connects to a staged banquet scene.
Natural handheld cinematography with noticeable vertical movement from footsteps, subtle irregular shake, and framing corrections. Whip pans follow vehicle and character movements, producing brief motion blur before settling back on the target. Movement is intense during the car chase and running sequences, then gradually slows during the banquet sequence.
Characters have slight perspiration, loose strands of hair, and natural clothing wrinkles. Road surfaces, clothing, and equipment show realistic signs of use. Natural colors create visual contrast between the red sports car, flames, and the warm tones of the banquet.
【Characters and Vehicles】
Male Actor:
Around 30 years old, with short dark hair, light stubble, and a lean, athletic build.
While driving and rolling on the ground, he wears a complete spy-action outfit:
A fitted dark charcoal-gray tactical top with a closed neckline;
Matching tactical trousers;
Black leather ankle boots.
The outer costume has tear-away seams designed for quick changes on set. The top opens along the center front and both sides, while the trousers open along the outer seams of both legs.
A white shirt, black bow tie, and dark navy dress trousers are already worn underneath the outer costume.
When the outer costume remains intact, he clearly appears in the dark tactical outfit.
Two additional crew members help him put on the suit jacket later.
The hems of the navy dress trousers cover the shafts of the black ankle boots.
The actor's face, hairstyle, and physique must remain consistent throughout.
Sports Car:
An original red concept sports car with a low, rounded wedge-shaped body, a short front end, a curved cockpit, and wide rear wheel arches.
The front features a continuous horizontal white light bar. The rear has three small circular taillights on each side.
The center of the hood is uninterrupted, smooth red paint. The dark gray wheels have plain metal center caps.
The center of the steering wheel has a solid black leather surface.
The driver's side window is open. The car's overall shape and lighting design must remain consistent across all shots.
Motorcycle Camera Operator:
Wearing dark workwear and a protective helmet, he stands alone on both stunt footpegs of a dark blue sport motorcycle, with his hips higher than the seat. He holds a camera on his shoulder with both hands, leaving the handlebars unoccupied.
He controls the motorcycle using his legs and center of gravity, compensating for bumps with his upper body. The camera is aimed at the sports car's driver.
During the reveal, his full standing posture, both feet, the motorcycle, and the camera must all be clearly visible.
Director:
In his forties, with some gray hair and naturally textured facial features.
He wears a worn-in, short dark brown jacket over a beige crew-neck T-shirt, paired with dark straight-leg trousers.
He holds a digital stopwatch, actively turning his body and gaze to follow the filming action.
A script supervisor, camera assistants, and lighting crew stand nearby. People and equipment in the foreground, beside him, and in the distance create layered depth.
Wardrobe Crew:
Six crew members in ordinary on-set workwear.
The first four, two on the left and two on the right, pull open and remove the outer tactical costume.
The remaining two unfold and help him put on the dark navy suit jacket.
Each person performs a clearly defined action. After removing a garment, the corresponding crew member holds it in their hands.
Female Companion:
Wearing a champagne-gold evening gown and holding her own champagne flute. She stands a few steps inside the banquet entrance.
Waiter:
Standing to one side of the entrance, holding a tray of champagne flutes for the male actor to pick one up as he passes.
【Shots and Actions】
00:00–00:03 | Five Rapid Cuts During the Car Chase
Tire close-up: The rear tire grips the road as the red sports car accelerates.
Foot close-up: The actor's black leather boot presses down on the accelerator.
Eye close-up: The actor quickly assesses the traffic ahead, his face vibrating with the movement of the car.
Hand close-up: Both hands turn the steering wheel decisively.
Slightly wider side shot: The sports car squeezes past an adjacent vehicle, rapidly closing the gap before pulling away again.
The first four shots are brief and punchy. Let the final shot run slightly longer to clearly establish the car weaving through traffic.
00:03–00:09 | Pull Out of the Car, Reveal the Camera Operator, Whip Pan to the Director
Film the driver from near the passenger seat.
The camera moves through the open driver's side window, fully exits the car, and continues pulling outward.
Establish a wide exterior side view:
The red sports car and dark blue motorcycle travel side by side. The camera operator is fully visible from head to toe, standing alone with the camera on his shoulder, aimed directly at the driver.
The sports car steers around a vehicle ahead. The motorcycle leans into the turn in sync, then returns to parallel alignment.
The camera naturally bobs with the speed and road bumps.
As the vehicles pass the director's working area, the camera whips toward the roadside.
A camera assistant's shoulder briefly sweeps through the foreground before the camera settles into an oblique medium close-up of the director.
The director leans forward, his gaze tracking the sports car.
A script supervisor takes notes beside him, while lighting crew and equipment in the distance create a deep, layered production-set background.
He gestures forward and shouts:
“Stay with it! Keep going!”
The entire line must be delivered while the director is on screen.
00:09–00:12 | Sports Car Explosion
Cut to a wider tracking shot alongside the sports car.
A missile with a visible flaming trail enters from the rear left and clearly strikes the rear of the car.
A flash erupts at the point of impact, followed immediately by an explosion at the rear of the vehicle. Flames, black smoke, and debris expand outward.
The car body is thrown upward while continuing its momentum toward the right.
The handheld camera jolts briefly from the impact.
00:12–00:14 | The Actor Rolls into Frame from the Left
Cut to the ground near the adjacent film set.
Wearing the complete dark tactical outfit, the actor rolls close to the ground into frame from the left, moving toward the center.
Burning flames and rising smoke remain visible in the rear left.
Orange light sweeps across his left shoulder, the side of his face, and the ground.
He finishes in a heroic kneeling pose, with one knee on the ground and one hand braced against the ground. His entire body remains visible, and his clothes are covered in dust.
The camera briefly dips with his landing, then readjusts to find the actor.
00:14–00:15 | Facial Close-Up Leading into the Run
Cut to the actor's face.
He exhales, with sweat and dust visible on his face and flickering firelight on his left side.
He raises his eyes and locks his gaze on something ahead. His shoulders lift, and his body begins to launch into a run.
The handheld camera makes small natural movements and quickly rises with him as he gets up, transitioning into the running sequence.
```

02 · 动作参考：格斗编排

##### 输入参考素材

![动作参考：格斗编排 · 官网参考图 image-02](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-02.webp)

官网参考图 image-02 · [下载原图](https://best.xiaohu.ai/media/kling-4-model-user-guide/originals/source-image-02.png)

![动作参考：格斗编排 · 官网参考图 image-03](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-03.webp)

官网参考图 image-03 · [下载原图](https://best.xiaohu.ai/media/kling-4-model-user-guide/originals/source-image-03.png)

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-02-efa50ce77ac627f1.mp4)

动作参考：格斗编排 · 输入参考素材

[下载原始视频 · 7.04 秒](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-02-efa50ce77ac627f1.mp4)

##### 官方结果

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-03-3f043ce42d80cf41.mp4)

动作参考：格斗编排 · 官方结果

[下载原始视频 · 7.04 秒](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-03-3f043ce42d80cf41.mp4)

输入参考：[video-02](https://static--34.klingai-cdn-aws.com/kling-blog/presigned_url/bd79f738-8bdf-4cf8-b02a-be0fad27c733_1-2-1.mp4) · [image-02](https://static--45.klingai-cdn-aws.com/kling-blog/file_by_url/9603ebbdfda76122fdbef0275af4dbad96108fcbb7e46bad56e621feba73c892.png) · [image-03](https://static-10.klingai-cdn-aws.com/kling-blog/file_by_url/ef4f3b49db4eab2d135518404005e67da24472f824e27b2ddf1c86c2699d9217.png)

官方结果：[video-03](https://static-17.klingai-cdn-aws.com/kling-blog/presigned_url/ed604ee7-c243-4375-9dc7-38c5964d81e2_1-2.mp4)

```
Use @Video 1 as the reference for the fight choreography and attack timing. Use @Image 1 and @Image 2 as the references for the character designs.
```
03 · 运镜参考：白天赛道到霓虹港口

##### 输入参考素材

![运镜参考：白天赛道到霓虹港口 · 官网参考图 image-04](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-04.webp)

官网参考图 image-04 · [下载原图](https://best.xiaohu.ai/media/kling-4-model-user-guide/originals/source-image-04.png)

![运镜参考：白天赛道到霓虹港口 · 官网参考图 image-05](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-05.webp)

官网参考图 image-05 · [下载原图](https://best.xiaohu.ai/media/kling-4-model-user-guide/originals/source-image-05.png)

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-04-678ec45c0b3a4fab.mp4)

运镜参考：白天赛道到霓虹港口 · 输入参考素材

[下载原始视频 · 7.04 秒](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-04-678ec45c0b3a4fab.mp4)

##### 官方结果

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-05-ccbbf354e66defb9.mp4)

运镜参考：白天赛道到霓虹港口 · 官方结果

[下载原始视频 · 7.06 秒](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-05-ccbbf354e66defb9.mp4)

输入参考：[video-04](https://static--68.klingai-cdn-aws.com/kling-blog/presigned_url/d948f107-f702-4591-842f-c502eaf4e446_1-3-1.mp4) · [image-04](https://static--54.klingai-cdn-aws.com/kling-blog/file_by_url/5a2591442bc22e9f30c9c01a908746abf2ee781a2f2791f024f9ff727b240966.png) · [image-05](https://static-58.klingai-cdn-aws.com/kling-blog/file_by_url/515ab05993934539ab58c7ab75862b3282d18fd063246deb918114a6dda943af.png)

官方结果：[video-05](https://static--94.klingai-cdn-aws.com/kling-blog/presigned_url/2a2039c8-2a39-48cb-83b6-a3a4f95b4446_1-3.mp4)

```
Use @Video 1 as the reference for camera movements and shot pacing. Replace the Element with the car from @Image 1 and the background with @Image 2.
```
04 · 构图参考：月下巨莲

##### 输入参考素材

![构图参考：月下巨莲 · 官网参考图 image-06](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-06.webp)

官网参考图 image-06 · [下载原图](https://best.xiaohu.ai/media/kling-4-model-user-guide/originals/source-image-06.png)

![构图参考：月下巨莲 · 官网参考图 image-07](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-07.webp)

官网参考图 image-07 · [下载原图](https://best.xiaohu.ai/media/kling-4-model-user-guide/originals/source-image-07.png)

##### 官方结果

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-06-9857bbb78e717a47.mp4)

构图参考：月下巨莲 · 官方结果

[下载原始视频 · 10.04 秒](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-06-9857bbb78e717a47.mp4)

05 · 故事板参考：太空小狗

##### 输入参考素材

完整提示词规定 Image 1 为故事板、Image 2 为角色设定；与官网表格排列不同，请按素材内容核对后上传。

![故事板参考：太空小狗 · 官网参考图 image-08](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-08.webp)

官网参考图 image-08 · [下载原图](https://best.xiaohu.ai/media/kling-4-model-user-guide/originals/source-image-08.png)

![故事板参考：太空小狗 · 官网参考图 image-09](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-09.webp)

官网参考图 image-09 · [下载原图](https://best.xiaohu.ai/media/kling-4-model-user-guide/originals/source-image-09.png)

##### 官方结果

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-07-d21ed76fb68b4b9a.mp4)

故事板参考：太空小狗 · 官方结果

[下载原始视频 · 15.04 秒](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-07-d21ed76fb68b4b9a.mp4)

输入参考：[image-08](https://static-6.klingai-cdn-aws.com/kling-blog/file_by_url/982c5566ed9dc356c626105c4777b31163f3de2537b0a12de2e7583d49b39918.png) · [image-09](https://static--57.klingai-cdn-aws.com/kling-blog/file_by_url/961d42867186eca64dd753536ed8a3646dc475680b377e629066fef22b5c7b94.png)

官方结果：[video-07](https://static-24.klingai-cdn-aws.com/kling-blog/presigned_url/1b9b38b5-2381-4f54-a5e2-c6510075ea1f_1-5.mp4)

```
严格遵循附件中的故事板（Image 1）作为基础，遵守导演批准的镜头顺序、构图、摄像机运动路径、屏幕运动方向和情感递进。呈现故事板面板所描述的定格动画最终帧；不要拍摄或重新制作故事板本身。视频不得包含铅笔素描纹理、故事板网格、标题、中文标签或导演笔记。
附件中的人物设计表（Image 2）是 BISCUIT（C1）的唯一权威参考：一只小型、圆润、丰满的粘土梗犬，毛发蓬松呈棕色，一只耳朵耷拉着，另一只耳朵竖立，有一个大的黑色粘土鼻子，睁得大大的、充满期待的眼睛，以及一条短尾巴。他穿着一件带有橙色领口和袖口的微型白色粘土宇航服；他的圆形玻璃头盔前部开口，让鼻子伸出来。他背着一个带有弯曲天线的背包，穿着过大的月球靴，手里拿着一把比他身体还大的粘土叉子。同一只狗、宇航服和叉子在每一帧中必须保持视觉一致性。C2 是一只友好的粘土奶酪老鼠，体型如公交车般大小。
时长：15 秒，宽高比 16:9。整个序列必须是一个连续的长镜头，没有可见的剪辑。单个虚拟摄像机首先在他跳跃时与他并肩晃动，然后与他一起潜入洞中，从隧道底部向上倾斜，跟随他从洞中冲出，最后上升到极远景。所有镜头比例的变化必须通过这种连续的摄像机运动来实现。
视觉风格：Aardman Animations 风格的纯手工粘土定格动画。保留清晰可见的指纹、粘土纹理和略微不平整的表面，以及 12 fps 定格动画特有的阶梯式运动。使用类似真实微缩场景的照明和微距摄影风格的浅景深。奶酪月亮像果冻一样晃动。天空由黑色毛毡制成，装饰着锡箔星星和粘土地球。整体氛围温暖、舒适且充满奇思妙想。
视觉概念：饥饿与勇气。一只小狗、一把巨大的叉子、一个晃动的奶酪月亮和一个新朋友。
环境：布满孔洞的黄色奶酪月亮、地下奶酪隧道、一辆歪歪扭扭的粘土小火箭，以及天空中的地球。
音频：前 12 秒没有音乐。在最后三秒，播放欢快的长号和小提琴二重奏。音效包括吱吱作响的粘土脚步声、缓慢的低重力跳跃时富有弹性的“boing-whoing”声、月亮震动时深沉的果冻般轰鸣声、洞口打开时橡胶般的“pop”声、翻滚时的呼啸声、大老鼠的大口咀嚼声和受惊的尖叫声、 frantic 的爪子抓挠声、Biscuit 终于吃到奶酪时令人满足的咬合声、满足的咀嚼声以及他的尾巴拍打地面的声音。
情感递进：L1 好奇 → L3 惊讶 → L4 恐慌 → L5 追逐达到顶峰 → L5 吃到第一口奶酪时的狂喜 → L1 温暖与满足。
故事板节拍（连续贯穿，无剪辑）：
0–2 秒（P01）：摄像机以低角度近距离停留在奶酪表面。Biscuit 从歪歪扭扭的小火箭中走出来，一只爪子踩在奶酪上。他闻了闻，眼睛因期待而睁得更大。他将叉子扛在肩上，天空中可以看到地球。
2–4.5 秒（P02）：摄像机随着他的每一次跳跃与他并肩晃动。他在奶酪景观上做出缓慢、夸张的低重力跳跃，耳朵弹起并向上拍打。他将叉子插入一大块奶酪中，整个表面立即像果冻一样晃动，脚下出现了一个巨大的洞。
4.5–7 秒（P03）：摄像机与他一起潜入洞中。Biscuit 仍紧握着叉子，在一个布满孔洞的奶酪隧道中缓慢翻滚，经过一只正在啃食隧道壁的、如公交车般巨大的粘土奶酪老鼠。Biscuit 的出现吓到了老鼠。
7–9.5 秒（P04）：摄像机到达隧道底部并向上倾斜。大老鼠转过身来，胡须颤抖，在隧道中追逐 Biscuit。惊慌失措的 Biscuit 在隧道壁之间反弹，叉子后面拖着卷曲的奶酪丝带。
9.5–12 秒（P05）：摄像机跟随他们冲出洞口。Biscuit 以缓慢的高弧线向上发射，大老鼠的头立即从他身后的开口处探出。Biscuit 在空中倒悬，用叉子舀起一大卷奶酪放进嘴里，瞬间体验到压倒性的幸福感。
12–15 秒（P06）：摄像机上升并拉远至极远景。Biscuit 和大老鼠并排坐在洞口边缘，开心地分享奶酪。火箭停在他们身后，地球在远处缓缓升起，锡箔星星点缀着天空。Biscuit 满足地呼出一口气，使他的头盔玻璃起雾，尾巴开心地摇摆。长号和小提琴二重奏开始。保持这个最终构图。
```

06 · 长段分镜：巨龙袭城

##### 输入参考素材

![长段分镜：巨龙袭城 · 官网参考图 image-11](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-11.webp)

官网参考图 image-11 · [下载原图](https://best.xiaohu.ai/media/kling-4-model-user-guide/originals/source-image-11.png)

![长段分镜：巨龙袭城 · 官网参考图 image-12](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-12.webp)

官网参考图 image-12 · [下载原图](https://best.xiaohu.ai/media/kling-4-model-user-guide/originals/source-image-12.png)

##### 官方结果

[视频/音频](https://static-2.klingai-cdn-aws.com/kling-blog/presigned_url/9214134d-57a9-4702-a064-c72fe4f02ab3_1-1.mov)

长段分镜：巨龙袭城 · 官方结果

[打开原始视频（可另存）](https://static-2.klingai-cdn-aws.com/kling-blog/presigned_url/9214134d-57a9-4702-a064-c72fe4f02ab3_1-1.mov)

输入参考：[image-11](https://static--88.klingai-cdn-aws.com/kling-blog/file_by_url/f5a55a529cc09483b9d9fce05d2a08683d2a37a58aeeeb18ff8a6b0470ac74c3.png) · [image-12](https://static-18.klingai-cdn-aws.com/kling-blog/file_by_url/3014c9b125142780247c3ee4fd35592a878350d3b17f4a2b3c9c9ec79e4cf159.png)

官方结果：[video-08](https://static-2.klingai-cdn-aws.com/kling-blog/presigned_url/9214134d-57a9-4702-a064-c72fe4f02ab3_1-1.mov)

```
1. 场景背景：严格限定为 1 条巨龙——严禁重复。一段 30 秒、包含六个镜头的黑暗奇幻动作序列。一条巨大的巨龙咆哮着，从山峰顶端起飞，加速飞向一座燃烧中的沿海城市，在塔楼间俯冲并实施毁灭性的空中火攻。史诗般的规模，节奏极快，实时运动效果。
2. 主动参考：控制燃烧中的沿海城市、哥特式建筑、港口、山脉地平线、现有火灾、烟柱、风暴云和闪电。控制巨龙的特征：黑灰色鳞片、红棕色翼膜、角、背脊、四条腿、双翼、长尾以及张开的岩石峰顶。
3. 位置地图：峰顶俯瞰沿海城市。港口位于屏幕左侧，中央城堡位于正前方，燃烧最密集的区域位于中心偏右。运动方向始终是从山脉朝向城市中心。摄像机保持在巨龙的后方、下方或左侧，且不反转运动轴。
4. 第一帧与空间调度：巨龙已蹲伏在峰顶，双翼展开，后腿压缩，头部朝向城市。它的嘴张开发出一次咆哮。下方的火焰闪烁；相连的烟柱随风弯曲，整个风暴云层明显移动。
5. 格式模式：六个镜头，硬切：镜头 1 — 0.0–4.0 秒：咆哮与起飞。镜头 2 — 4.0–9.0 秒：高速追逐港口。镜头 3 — 9.0–13.5 秒：低空飞越水面朝向城市。镜头 4 — 13.5–19.0 秒：在塔楼间进行第一次火攻。镜头 5 — 19.0–25.0 秒：倾斜追逐与扫射火攻。镜头 6 — 25.0–30.0 秒：巨龙飞越燃烧的城市上空。切镜由翅膀遮挡、烟雾遮挡和近距离建筑掠过触发。无淡入淡出或溶解效果。
6. 光学镜头：镜头 1：24mm，74° 水平视场角，低角度环境广角。镜头 2：18mm，90° 视场角，后方追逐视角。镜头 3：24mm，74° 视场角，低水面的追逐镜头。镜头 4：28mm，65° 视场角，屋顶高度的跟踪镜头。镜头 5：24mm，74° 视场角，近距离侧后方追逐。镜头 6：18mm，90° 视场角，宏大的空中广角。中等深度景深。翅膀尖端、水面、烟雾、余烬和附近建筑物上有强烈的自然运动模糊。
7. 摄像机：所有摄像机都有明显的物理手持不稳定性。镜头 1：巨龙起飞时迅速向上倾斜；翅膀的压力剧烈震动操作员。镜头 2：在巨龙尾巴后方 12 米处跟随，伴有强烈的风阻和快速的垂直振动。镜头 3：在巨龙后方的水面上方疾驰；波浪和燃烧的船只掠过画面边缘。镜头 4：在屋顶高度的街道峡谷中跟踪。镜头 5：跟随巨龙完成一个急转弯，随着塔楼危险地靠近，几乎失去构图。镜头 6：向上追逐，然后稳定在毁灭性城市的广角视野中。没有平滑的漂浮或机械完美的运动。
8. 动作时序：0.0–0.8 秒：巨龙发出一声震耳欲聋的咆哮，颈部伸展，眼睛紧盯城市。0.8–2.0 秒：后腿蹬入峰顶；爪子碎裂岩石。2.0–4.0 秒：巨龙起飞并做出两次有力的翅膀拍打。尘土和石块向后爆炸。4.0–6.5 秒：硬切至已在高速加速的巨龙身后。6.5–9.0 秒：它将腿折叠在身体下方，向港口俯冲。烟雾掠过其翅膀。9.0–11.5 秒：巨龙在粗糙的水面上快速低飞。翼尖几乎触及波浪。11.5–13.5 秒：它掠过燃烧的船只并飞上海堤。一座塔楼掠过镜头。13.5–15.0 秒：硬切至城市内部。巨龙在哥特式塔楼间的烟雾中冲出。15.0–19.0 秒：它喷射出一道连续的橙白色火焰流，在保持全速的同时扫过左侧一排屋顶。19.0–21.5 秒：巨龙围绕中央塔楼急转右弯；尾巴因延迟惯性而摆动。21.5–25.0 秒：其连续的火焰流扫过大道并击中右侧塔楼。燃烧的砖石和余烬在它身后落下。25.0–27.0 秒：巨龙停止喷火，有力地拍打翅膀并飞越屋顶上方。27.0–30.0 秒：它升入风暴光线中，滑翔于燃烧的城市上空。镜头拉远，展现出蔓延的火焰、烟柱和下方的港口。
9. 物理效果：尽管速度极快，但巨龙具有令人信服的巨大质量。翅膀拍打起源于肩部；翼膜在空气动力负载下拉伸。躯干、腿和尾巴以延迟惯性做出反应。翅膀尾流在烟雾中撕开缺口，扰动水面并吹拂附近的火焰。火焰仅从张开的口中喷出，形成压力驱动的射流，具有白热核心、橙色湍流边缘和可见的热扭曲。建筑物在可见的冲击点逐渐点燃。碎片遵循重力和巨龙的尾流。
10. 光照：冷色调的风暴日光从左上角射入。现有的火焰在巨龙下方提供橙色底光。火焰射流成为移动的主动主光，在鳞片、塔楼和烟雾上投射出移动的高光。在最后的攀升过程中，阳光穿透云层。保留火焰核心的细节，并保持巨龙剪影的可读性。
11. 音频：无对白。同步的巨龙咆哮、爪子刮擦声、岩石碎裂声、皮革翅膀的雷鸣声、猛烈的风声、波浪撞击声、燃烧的船只声、坍塌的砖石声、余烬的嘶嘶声和加压的火焰爆炸声。史诗般的原创配乐：快速的战鼓、低铜管持续音和急促的弦乐立即开始。无词的低音合唱在起飞时进入。追逐期间打击乐加速。每次火攻时全管弦乐队重击，随后在攀升过程中扩展为黑暗的胜利终曲。咆哮、翅膀和火焰的声音始终大于音乐。
12. 角色表演：巨龙表现出专注的捕食意图。它的眼睛始终锁定飞行路径和连续的建筑目标。在加速过程中，它的头部降低，肩部猛烈驱动。在城市内部，颈部刻意引导火焰流，而尾巴控制每次转弯。在最后一个镜头中，它的胸膛张开，姿态从攻击性转变为空中统治力。
13. 风格：宏大的末日黑暗奇幻电影，侵略性的追逐摄影，宏大的规模和战场能量。炭黑色和风暴蓝色占据调色板的 60%，烟褐色石头占 30%，火焰橙色占 10%。风化的 35mm 胶片质感，带有老照片的柔和感、有机颗粒感，无数字锐化。
14. 质量：每个镜头中巨龙的身份和解剖结构保持一致：一个头、两个翅膀、四条腿和一条尾巴。稳定的城市建筑、连贯的翅膀循环、连接的嘴部火焰、体积烟雾和物理连接的破坏效果。自然的快速运动模糊，无鬼影、解剖结构变异或脱节的火焰。
15. 正向约束：整个序列中始终只有一条巨龙可见。它在 2 秒前起飞，9 秒前到达港口，13.5 秒进入城市，并在飞离前完成两次快速火攻掠过。每个镜头都保持从山脉到城市的方向。强烈的摄像机抖动传达出极端速度，同时巨龙保持清晰可读。城市火灾持续释放烟雾，云层明显横跨天空，新的破坏仅出现在连接的火焰射流击中的地方。
```

07 · 编辑：在魔术箱里添加小猪

##### 输入参考素材

三张小猪图片是同一主体的多视图；先建立相应主体，再用界面实际生成的 @Element 编号引用。

![编辑：在魔术箱里添加小猪 · 官网参考图 image-13](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-13.webp)

官网参考图 image-13 · [下载原图](https://best.xiaohu.ai/media/kling-4-model-user-guide/originals/source-image-13.png)

![编辑：在魔术箱里添加小猪 · 官网参考图 image-14](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-14.webp)

官网参考图 image-14 · [下载原图](https://best.xiaohu.ai/media/kling-4-model-user-guide/originals/source-image-14.png)

![编辑：在魔术箱里添加小猪 · 官网参考图 image-15](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-15.webp)

官网参考图 image-15 · [下载原图](https://best.xiaohu.ai/media/kling-4-model-user-guide/originals/source-image-15.png)

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-09-e951dbafed16aaaa.mp4)

编辑：在魔术箱里添加小猪 · 输入参考素材

[下载原始视频 · 12.04 秒](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-09-e951dbafed16aaaa.mp4)

##### 官方结果

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-10-63efb6a523d2b810.mp4)

编辑：在魔术箱里添加小猪 · 官方结果

[下载原始视频 · 12.04 秒](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-10-63efb6a523d2b810.mp4)

输入参考：[video-09](https://static--78.klingai-cdn-aws.com/kling-blog/presigned_url/84cd82e3-8d57-4e41-bb95-b2cf8e035a9e_1-1-1.mp4) · [image-13](https://static-69.klingai-cdn-aws.com/kling-blog/file_by_url/05e5537073a5b777a556a6ca1d7674084e5062c074bc7a7a2b9ee5c1b291d55c.png) · [image-14](https://static-96.klingai-cdn-aws.com/kling-blog/file_by_url/d75de72f10aa9c6378f0837551a337fb0e60ebe0f3b7532d0eacb10f8496eebc.png) · [image-15](https://static-88.klingai-cdn-aws.com/kling-blog/file_by_url/5a5caf66b2695099249e7bd573ca117d2ceec8168c1d044818f66bb97c3f8ef8.png)

官方结果：[video-10](https://static--86.klingai-cdn-aws.com/kling-blog/presigned_url/d0d3136c-1bf1-4940-b24e-4d056c5e9af6_1-1.mp4)

```
Edit @Video1. When the box is opened again at the end of the video, @Element1 is lying inside, asleep. Replace the final line, “Ah, it's all old stuff,” with “Why is there a pig here?”
```
08 · 编辑：替换人物与室内场景

##### 输入参考素材

![编辑：替换人物与室内场景 · 官网参考图 image-16](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-16.webp)

官网参考图 image-16 · [下载原图](https://best.xiaohu.ai/media/kling-4-model-user-guide/originals/source-image-16.png)

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-11-bfa4d7709fb46135.mp4)

编辑：替换人物与室内场景 · 输入参考素材

[下载原始视频 · 7.04 秒](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-11-bfa4d7709fb46135.mp4)

##### 官方结果

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-12-0b604d3b58724d19.mp4)

编辑：替换人物与室内场景 · 官方结果

[下载原始视频 · 7.04 秒](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-12-0b604d3b58724d19.mp4)

输入参考：[video-11](https://static-90.klingai-cdn-aws.com/kling-blog/presigned_url/42801baf-9a37-471f-ae55-68cd75001eb4_1-2-1.mp4) · [image-16](https://static--63.klingai-cdn-aws.com/kling-blog/file_by_url/a755279b2ec2b77e49b1de97efb9f838564c2e3ca37d4f00d956e1f4ea522600.png)

官方结果：[video-12](https://static--76.klingai-cdn-aws.com/kling-blog/presigned_url/c7048822-9f71-49e4-b9d7-b5a254893ffe_1-2.mp4)

```
Edit @Video1. Replace the environment and characters throughout the video with the content from @Image1.
```
09 · 编辑：便利店三人依次换人

##### 输入参考素材

原表图序与提示词人物编号不同；按人物外观核对后，可依次上传白帽男子、红衣女子、抱羊玩偶的厨师帽男子。

![编辑：便利店三人依次换人 · 官网参考图 image-17](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-17.webp)

官网参考图 image-17 · [下载原图](https://best.xiaohu.ai/media/kling-4-model-user-guide/originals/source-image-17.png)

![编辑：便利店三人依次换人 · 官网参考图 image-18](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-18.webp)

官网参考图 image-18 · [下载原图](https://best.xiaohu.ai/media/kling-4-model-user-guide/originals/source-image-18.png)

![编辑：便利店三人依次换人 · 官网参考图 image-19](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-19.webp)

官网参考图 image-19 · [下载原图](https://best.xiaohu.ai/media/kling-4-model-user-guide/originals/source-image-19.png)

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-13-a8cc69a2030a1d04.mp4)

编辑：便利店三人依次换人 · 输入参考素材

[下载原始视频 · 15.04 秒](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-13-a8cc69a2030a1d04.mp4)

##### 官方结果

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-14-99a05ed5488d3097.mp4)

编辑：便利店三人依次换人 · 官方结果

[下载原始视频 · 15.04 秒](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-14-99a05ed5488d3097.mp4)

输入参考：[video-13](https://static-2.klingai-cdn-aws.com/kling-blog/presigned_url/2a3d6487-b5c8-409a-9030-11f7ebcd8d57_1-3-1.mp4) · [image-17](https://static--29.klingai-cdn-aws.com/kling-blog/file_by_url/b543db1d109219975a68d1221b2c2527ee57423b5e310d2d3c6c0777f0e6cee1.png) · [image-18](https://static--21.klingai-cdn-aws.com/kling-blog/file_by_url/1a46d27b44af66db489c3493198babfbd51d8cfee16801fdff9f631f199c779a.png) · [image-19](https://static-45.klingai-cdn-aws.com/kling-blog/file_by_url/215c8a0540de5d336ff1c4d56794041bb2fca70f2a03afc7940473ea7a42d0bf.png)

官方结果：[video-14](https://static--59.klingai-cdn-aws.com/kling-blog/presigned_url/9c6d3aaf-422d-46ed-be7d-aff4e26957e1_1-3.mp4)

```
Edit @Video1. Replace the three people who walk out of the convenience store one after another with the following characters: First character: use the identity, face, dark curly hair, white sun hat, white short-sleeved shirt with a black-and-white striped inner top, green apron, loose light gray jeans, and dark sneakers of the man in @Image1. Second character: use the identity, short light blonde hair, red sweatshirt, green apron, white knee-high socks, and red shoes of the woman in @Image2. Third character: use the identity, short light blonde hair, white chef hat, black-framed glasses, blue-green-and-black patterned knit outfit, green apron, white shoes, and the same off-white plush sheep held in his arms as the man in @Image3. The order in which the three characters appear, their movements from inside the store to the doorway, their pauses to pose, and their approach toward the camera and exit through the foreground should follow the actions and camera timing of @Video1: the first character slightly lifts the brim of his sun hat before approaching the camera; the second character naturally adjusts her apron and gives a slight wave at the doorway before approaching the camera; the third character holds the plush sheep, adjusts his glasses, then approaches the camera and slightly raises the plush sheep as he gets closer. Fix a clear, stable, readable sign with the exact uppercase text `KLING AI OPEN 24 hours` in the middle of the convenience store's right-side glass window. The text must remain correctly spelled, undistorted, and free of flickering throughout the video. Keep the sign fixed to the inside of the glass window without obstructing any characters. Keep everything else unchanged: preserve the green convenience store doorframe, doorway composition, interior shelves, fluorescent lights, glass reflections, daylight, camera position, walking direction, duration, pacing, and aspect ratio of @Video1. Do not add any characters, change the store structure or camera movement, or introduce subtitles, logos, watermarks, or extra text.
```
10 · 编辑：移除前景人物

##### 输入参考素材

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-15-17b84c09d55cbdc7.mp4)

编辑：移除前景人物 · 输入参考素材

[下载原始视频 · 7.04 秒](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-15-17b84c09d55cbdc7.mp4)

##### 官方结果

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-16-c296ed14aa010d18.mp4)

编辑：移除前景人物 · 官方结果

[下载原始视频 · 7.03 秒](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-16-c296ed14aa010d18.mp4)

输入参考：[video-15](https://static--19.klingai-cdn-aws.com/kling-blog/presigned_url/968b27e4-43a2-4757-b744-074878d87095_1-4-1.mp4)

官方结果：[video-16](https://static-60.klingai-cdn-aws.com/kling-blog/presigned_url/13c66fc3-b663-4e6e-b50c-208bbd080a5c_1-4.mp4)

```
编辑 @Video 1，移除前景中的人物。保持其他所有内容不变，包括背景、其他主体、摄像机运动、光照、构图和视频时长。无缝重建此前被人物遮挡的区域，确保细节自然、一致且无明显伪影。
```
11 · 编辑：雪地柯基变为像素狗

##### 输入参考素材

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-17-ab777316db015731.mp4)

编辑：雪地柯基变为像素狗 · 输入参考素材

[下载原始视频 · 14.80 秒](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-17-ab777316db015731.mp4)

##### 官方结果

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-18-c88fba79a88c25f9.mp4)

编辑：雪地柯基变为像素狗 · 官方结果

[下载原始视频 · 15.04 秒](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-18-c88fba79a88c25f9.mp4)

输入参考：[video-17](https://static-81.klingai-cdn-aws.com/kling-blog/presigned_url/458f58fa-6934-4de1-a967-73e50bfbde62_1-5-1.mp4)

官方结果：[video-18](https://static-9.klingai-cdn-aws.com/kling-blog/presigned_url/e195bd1a-13ae-4d52-a67b-00b14f3972b6_1-5.mp4)

```
编辑 @Video 1，将雪地里跳跃的三色柯基幼犬替换为 3D 方块像素风格的柯基。整个身体必须由立方体构成：长方形的躯干、立方体的头部、两个直立的方形三角耳、四个短小的长方体腿以及一个小型块状尾巴。所有边缘必须具有锋利、硬朗的直角，不得有任何圆润曲线。

表面采用低分辨率 16×16 像素纹理，保留原柯基的三色分布：棕色的身体、背部黑色的马鞍状斑块、白色的面部条纹、白色的项圈、白色的胸部以及白色的爪子。眼睛是两个黑色方形像素，鼻子是一个黑色立方体，舌头是一个小型粉色像素块。受光面明亮，侧面较暗，采用平面着色和基于方块的光照。不得出现毛发纹理或柔和的色调过渡。

保持柯基的大小与原版完全一致，不得放大或缩小。方块柯基必须逐帧跟随原版柯基的位置、动作和运动轨迹：站在门廊旁、跳入深雪中消失并在雪地上留下一个坑洞、用方块头探出头来、反复向前跃入雪中，最后坐在雪坑里。跳跃时，其身体和腿部应像视频游戏中的角色动画一样作为刚性块体运动，不得弯曲。

它陷入雪中的深度、爪子扬起的雪、落在身上的雪以及投射在雪地上的阴影，都必须准确符合方块身体的特征。每当它从雪中重新出现时，必须保持完全相同的方块柯基形态，纹理保持一致。

重要提示：仅将柯基转换为方块风格。木制门廊、雪地地面、木栅栏、树木以及灰白色的天空必须保持完全写实，如同原始实拍素材。不得对环境应用任何方块或像素化效果。画面中只能出现一种动物，任何帧中不得出现写实、带毛发的柯基。

保持音频与原始视频完全一致。不得添加任何新声音。保留手持摄像机视角及所有摄像机运动。其他所有内容必须保持不变。
```
12 · 创意重做：狗换成猫

##### 输入参考素材

![创意重做：狗换成猫 · 官网参考图 image-20](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-20.webp)

官网参考图 image-20 · [下载原图](https://best.xiaohu.ai/media/kling-4-model-user-guide/originals/source-image-20.png)

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-19-934125084210e823.mp4)

创意重做：狗换成猫 · 输入参考素材

[下载原始视频 · 14.07 秒](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-19-934125084210e823.mp4)

##### 官方结果

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-20-738e062be782df1a.mp4)

创意重做：将狗替换为猫 · 官方结果

[下载原始视频 · 14.04 秒](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-20-738e062be782df1a.mp4)

输入参考：[video-19](https://static--88.klingai-cdn-aws.com/kling-blog/presigned_url/8ed131ae-de43-402f-a70c-8a8cb57ff635_1-1-1.mov) · [image-20](https://static-15.klingai-cdn-aws.com/kling-blog/file_by_url/d534117094084549b75edb5744e1c97527daf3f56ecc79696eb17e6adf64684b.png)

官方结果：[video-20](https://static--73.klingai-cdn-aws.com/kling-blog/presigned_url/a69b8de9-efb4-45a5-8da2-68e7ce0fcd74_1-1.mp4)

```
将 @Video 1 中的元素替换为 @Image 1 中的元素。保持其他所有内容不变，包括背景构图、镜头运动、灯光、阴影、音频和视频时长。确保替换后的元素与原视频自然融合，并匹配原元素的位置、比例、运动和轨迹。
```
13 · 三人多语言对话

##### 输入参考素材

![三人多语言对话 · 官网参考图 image-21](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-21.webp)

官网参考图 image-21 · [下载原图](https://best.xiaohu.ai/media/kling-4-model-user-guide/originals/source-image-21.png)

##### 官方结果

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-21-b983b76551245d08.mp4)

三人多语言对话 · 官方结果

[下载原始视频 · 15.04 秒](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-21-b983b76551245d08.mp4)

输入参考：[image-21](https://static--70.klingai-cdn-aws.com/kling-blog/file_by_url/ec20a9573046207984f3c03dbea8d63a9e979ee34029d070ac4ae13132cb2e4a.png)

官方结果：[video-21](https://static--47.klingai-cdn-aws.com/kling-blog/presigned_url/ffc66c6b-2566-4ab4-b556-6305b928cad6_1-1.mp4)

```
场景背景：视频中精确包含 3 个独特的人类角色：三个人位于明亮、整洁的虚构城市游客信息中心。保持整体色调一致。游客站在左侧，翻译站在中间，旅游工作人员站在右侧。信息台上放置着城市地图和路线图。背景文字和地图标签必须模糊且不可读。不得出现任何真实品牌、组织名称、标志或水印。
动作时序：
0–3 秒：三人中景镜头。西班牙女游客看着中间的翻译，举起手中的地图，用自然、清晰、稍慢的西班牙语说道：“¿Dónde está la estación de metro más cercana?”（最近的地铁站在哪里？）说完后，停顿约 0.5 秒。翻译转向旅游工作人员，将其翻译成中文：“她想知道最近的地铁站在哪里。”
3–7 秒：切换到翻译和旅游工作人员的特写。旅游工作人员看着地图（不要使用地图的特写镜头），用自然、清晰的中文回答：“沿这条路直走，步行大约五分钟就能到。”工作人员说完后，停顿约 0.5 秒。翻译确认理解并转向游客。
7–11 秒：翻译将工作人员的回答翻译成自然、清晰、稍慢的西班牙语：“La estación de metro está a unos cinco minutos a pie. Siga recto por esta calle.”（地铁站步行约五分钟。请沿这条街直走。）说话时，翻译用手指着地图上的路线，游客认真查看。
11–15 秒：切回三人的中景镜头。西班牙游客听懂指示后，微笑、点头，并用西班牙语说道：“Muchas gracias.”（非常感谢。）三人保持自然的互动，场景结束。
音频：
- 西班牙游客只说西班牙语。
- 中国旅游工作人员只说中文。
- 中国翻译先说中文，后说西班牙语。
- 每个人的声音都各不相同。
- 当一人说话时，其他人保持沉默。不得打断或重叠对话。
- 所有对话必须人声清晰，口型与相应语言同步。
- 西班牙语发音必须自然标准，不得带有英语口音。
- 语速稍慢，句子之间要有自然的停顿。
- 保留游客信息中心的细微环境音。不要添加背景音乐。环境音不得盖过对话。
镜头：以三人的中景镜头开始，确立人物关系。当游客说话时，切换至游客和翻译的双人镜头。当翻译转述问题时，切换至翻译和工作人员的双人镜头。在工作人员回答时，包含地图路线的特写。当翻译翻译成西班牙语时，切回翻译和游客的双人镜头。最后以三人的中景镜头结束。全程保持人物位置、视线和服装的一致性。不得突然更换人物或改变他们的空间关系。
风格：写实、自然、专业的旅游服务纪录片风格。明亮、干净的灯光，自然的表情，克制的动作。场景应类似于机场或城市游客信息中心的真实互动。
```
14 · 羽绒服展示与口播

##### 输入参考素材

![羽绒服展示与口播 · 官网参考图 image-22](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-22.webp)

官网参考图 image-22 · [下载原图](https://best.xiaohu.ai/media/kling-4-model-user-guide/originals/source-image-22.png)

##### 官方结果

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-22-3ac64c5ff30cde55.mp4)

羽绒服展示与口播 · 官方结果

[下载原始视频 · 15.04 秒](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-22-3ac64c5ff30cde55.mp4)

输入参考：[image-22](https://static--4.klingai-cdn-aws.com/kling-blog/file_by_url/6558ef2c22518d1a3785727664f30c49075ea8b36534b5b4919b7eae55b99cc0.png)

官方结果：[video-22](https://static--88.klingai-cdn-aws.com/kling-blog/presigned_url/f09400a3-ad6f-4259-85c5-d976b1a39b2b_1-2.mp4)

```
1. 场景上下文：严格限定为 1 个人物角色——无重复。一位女士在极简主义时尚展厅内，热情地展示她身穿的黑色 Kling 短款羽绒服。她保持温暖、自信的眼神与镜头交流，同时演示衣领、胸前徽标、绗缝工艺、短款剪裁和口袋。这是一个连续的 15 秒竖屏时尚镜头。
2. 主动参考
@image1 控制女士的精确身份、直棕发、蓝眼睛、小耳环、黑色 Kling 短款羽绒服、高领、银色拉链、白色胸前徽标、绗缝面板、松紧袖口、侧袋、宽松蓝色牛仔裤、黑色腰带、展厅衣架、窗户以及竖屏构图。精确保留所有细节。
3. 位置映射：女士保持在两个衣架之间居中。左侧衣架保持在画面左侧后方，第二个衣架保持在右后方，大窗户保持在画面右侧。摄像机位于她正前方，仅略微向她的左侧移动。
4. 第一帧与空间布局：匹配参考构图。她以放松的三分侧面姿势站立，双臂自然垂于身体两侧。完整的夹克、腰线、腰带和上半部分牛仔裤均可见。她的头转向镜头，眼神自然锁定镜头。
5. 格式模式：一个不间断的 15 秒竖屏 9:16 镜头。无剪辑、淡入淡出、溶解、速度变速、服装变换、场景切换或重复姿势。
6. 光学：50mm 等效镜头，水平视场角 40°。中等时尚构图确保她的眼睛、面部表情、衣领、徽标、拉链、袖子、下摆、口袋和腰线清晰可读。适度的景深将她与衣架柔和分离。
7. 摄像机：一名人类操作员站在约 2.5 米远的胸部高度，执行一次小于 1 米的缓慢手持顺时针弧线运动。呼吸漂移、小步伐、轻微滚动和延迟重新构图依然可见。摄像机从不变得机械稳定，也不会裁剪掉夹克下摆。
8. 动作时间线
0.0–2.0 秒：她找到镜头，深吸一口轻气，露出真诚的欢迎微笑。
2.0–5.5 秒：在开始说话时，她触摸结构化的衣领，并用指尖沿拉链向下移动，眼睛始终盯着镜头。
5.5–8.5 秒：随着手停在白色 Kling 徽标旁，她的声音变得更加生动，另一只手做出一个小巧 expressive 的手势。
8.5–11.5 秒：她转向三分侧面轮廓，将双手插入口袋，带着自信的微笑看向镜头。
11.5–15.0 秒：她再次面向前方，放松肩膀，以明亮的眼睛和温暖、满足的表情结束展示。
9. 物理特性：垫子夹克在她的指尖下自然压缩，松开后恢复。绗缝面板保持体积一致。袖子在肘部弯曲和起皱，短款下摆在她转身时移动并在重力作用下沉降。头发和耳环响应以微小的延迟运动。
10. 灯光：来自画面右侧大窗户的柔和日光作为唯一的动机主光源。它在她的眼睛、头发、黑色面料、银色拉链和颧骨上产生克制的反光，同时保留绗缝面板的细节。天花板轨道灯作为微妙的背景实用光源。
11. 音频：分层展厅环境音：安静的房间底噪、远处的通风声、柔和的夹克摩擦声、拉链接触声、牛仔裤移动声和克制的脚步声。用真诚、情感投入的英语声音，她说：“I honestly love this Kling jacket—the cropped fit feels so confident, and it goes with everything.”（我真心喜欢这件 Kling 夹克——短款剪裁让人感觉如此自信，而且它百搭。）以温暖的欣赏开始，强调“love”（爱）和“confident”（自信），最后以可听见的微笑结束。她的嘴唇、呼吸、表情和服装手势与句子完全同步。仅 SFX，无音乐、无配乐、无歌曲、无原声带。
12. 角色表演：她说话时表现出对夹克带来的感受的真正兴奋。她的眼睛始终与镜头保持连接，拥有生动的反光和不规则的自然眨眼。说到“love”时眉毛微微抬起，说到“confident”时脸颊上扬，最后的微笑直达双眼。她在说话时从不低头看服装；她的手通过触摸自然地定位每个特征。内心未说出的话：“这完全就是我。”
13. 风格：极简当代时尚内容，由不完美的同伴拍摄。明显的手持亲密感、老照片般的柔和感、有机胶片颗粒、克制的对比度、天然面料纹理、柔和的窗户光晕，以及无数字锐化。色彩平衡：60% 黑色和炭灰色，25% 冷白色展厅色调，15% 褪色蓝色牛仔布和自然肤色。
14. 质量：女士的身份、眼色、发型、耳环、夹克几何形状、绗缝面板、衣领、拉链、袖口、口袋、牛仔裤和腰带保持一致。白色 Kling 单词拼写正确、稳定，并附着在相同的胸部位置。眼睛、嘴唇、手、手指、袖子和面料褶皱在解剖学上保持连贯。
15. 正面约束：全程只有一位女士穿着 exactly one 黑色 Kling 夹克。她在说话时保持与镜头的直接连接，并在侧面姿势时看向镜头。她只说一段充满情感的英语段落，并执行一次连续的服装展示。夹克始终保持完全拉上拉链，且在正面朝向时徽标可见。不得添加第二人、服装变化、字幕、价格、促销叠加、镜面反射、音乐或 T 台走秀。平淡、无感情的表演、游移的眼神、拼写错误的徽标、变化的夹克长度、额外的肢体或面料穿过她的身体均视为失败镜头。
```

15 · 儿童计数：素材分工与文字

##### 输入参考素材

@Video1 教学参考视频未在官网该表格提供；以下是实际公开的风格图。

![儿童计数：素材分工与文字 · 官网参考图 image-23](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-23.webp)

官网参考图 image-23 · [下载原图](https://best.xiaohu.ai/media/kling-4-model-user-guide/originals/source-image-23.png)

##### 官方结果

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-23-a409399a2985edf9.mp4)

儿童计数：素材分工与文字 · 官方结果

[下载原始视频 · 15.04 秒](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-23-a409399a2985edf9.mp4)

输入参考：[image-23](https://static-29.klingai-cdn-aws.com/kling-blog/file_by_url/5c612de9b2a3a866c24704652186c8a37d57cfc480e6748e24137cf2aa8215ca.webp)

官方结果：[video-23](https://static-77.klingai-cdn-aws.com/kling-blog/presigned_url/c025c539-645d-4cb3-8950-a1582dbba7ec_1-1.mov)

```
SCENE CONTEXT: EXACTLY 3 UNIQUE CHARACTERS ACROSS THE VIDEO — NO DUPLICATES.EXT. Enchanted counting forest classroom, warm morning. One soft cream cloud teacher teaches the numbers 1, 2, 3 and 4 in four separate shots. Two tiny yellow chick pupils appear only in the number-two shot.3 characters across the video, 5 hard-cut shots, 15s, real time.ACTIVE REFERENCES@Video1: content, narration and timing reference only — preserve the educational progression, additive explanations and final recap. Never inherit its white studio environment or visual style.@Image1: visual-world reference only — handmade clay-and-felt materials, rounded toy-like forms, pastel forest trunks, mossy ground, rainbow colours, warm diffused backlight and shallow storybook depth. Never inherit its existing characters, numerals or composition.
LOCATION MAP: All five shots occur on the same circular moss stage inside one enchanted forest classroom.One broad warm-brown tree trunk anchors frame-left; a second tree trunk anchors frame-right. A curved pastel rainbow root crosses the background. The central teaching pedestal remains in the same position in every shot. Camera always stays on the front side of the teaching axis, between 3.0 and 3.3 m from the pedestal. The sun always comes from upper frame-right. Background geometry, material scale and colour palette remain identical after every cut.
FIRST FRAME AND SPATIAL BLOCKING: Shot 1: the cloud teacher floats centre-left, facing a large red felt numeral 1 on the central pedestal. One red apple is concealed inside the moss below it. Shot 2: The cloud teacher floats centre-left, facing a large amber felt numeral 2. Two yellow chicks begin concealed behind the pedestal. Shot 3: the cloud teacher floats centre-left, facing a large green felt numeral 3. Three blue felt stars begin nested inside the moss. Shot 4: the cloud teacher floats centre-left, facing a large blue felt numeral 4. Four purple clay blocks begin below the pedestal. Shot 5: the cloud teacher floats alone at centre, facing the viewer beneath the rainbow root. Every shot begins mid-gesture with the teacher already pointing toward the active numeral. No empty establishing beat.
FORMAT MODE: Horizontal 16:9, total 15s, real time, 5 shots connected by clean hard cuts.Shot 1 — 0.00–4.00s: number 1 and one apple.Shot 2 — 4.00–7.08s: number 2 and two chicks.Shot 3 — 7.08–10.21s: number 3 and three stars.Shot 4 — 10.21–13.08s: number 4 and four blocks.Shot 5 — 13.08–15.00s: spoken recap and celebration. Each number receives its own separate shot. Numerals 1, 2, 3 and 4 never share the same teaching frame.No fades, dissolves or split screens.
OPTICS: 35mm equivalent, 54° horizontal FOV, locked across all five shots. Identical natural perspective, camera height, background scale and depth-of-field character after every cut. Focal plane remains on the cloud teacher, active numeral and active quantity. Foreground flowers softly obscure the lower corners. Distant trees dissolve into the same creamy storybook blur.
CAMERA: Every shot is operated handheld at approximately 105 cm height from the front side of the teaching axis. World register: gentle SETTLE. Shot 1: slow 10 cm push toward numeral 1. Shot 2: slow 10 cm push toward numeral 2. Shot 3: slow 10 cm push toward numeral 3.Shot 4: slow 10 cm push toward numeral 4. Shot 5: slow 8 cm push toward the celebrating teacher.Visible handheld character throughout: breath sway, micro-roll, late tiny corrections and gentle but obvious handmade shake. Numerals and subtitles remain readable. Camera height, axis and movement speed match across all cuts.Not a gimbal, slider, tripod lock-off, drone or digitally stabilised camera.
ACTION TIMING 0.00–0.78s: Shot 1 begins. The cloud teacher already points toward the red numeral 1. 0.78–1.98s: numeral 1 rises and completes one soft bounce. 1.98–4.00s: one red apple rises from the moss and settles beneath numeral 1. 4.00–4.86s: hard cut to Shot 2. The amber numeral 2 rises and completes one soft bounce. 4.86–7.08s: one yellow chick hops out from the left, then a second chick joins from the right; they touch shoulders and settle together. 7.08–8.04s: hard cut to Shot 3. The green numeral 3 rises and completes one soft bounce. 8.04–10.21s: two blue felt stars rise together, followed by one additional star; the three stars settle into a clear triangular arrangement. 10.21–11.06s: hard cut to Shot 4. The blue numeral 4 rises and completes one soft bounce. 11.06–13.08s: three purple blocks assemble first; one additional block clicks into the fourth position. 13.08–14.40s: hard cut to Shot 5. Four tiny coloured fireflies pulse sequentially red, amber, green and blue while the teacher points from left to right. 14.40–15.00s: the teacher opens both arms; a small clay sun unfolds above the rainbow and releases a brief sparkle burst.
PHYSICS: The cloud teacher has the buoyancy of a lightweight stuffed felt puppet, with soft vertical drift and delayed arm movement. Each numeral has padded felt weight: it compresses, rebounds once and settles. The apple lands with soft clay weight. The chicks’ feet squash slightly into the moss. Stars descend with gentle air resistance. Blocks connect with firm edge-to-edge contact. Every quantity remains stable and readable until its shot ends. Hard cuts reset the teaching pedestal cleanly while preserving the same forest, teacher identity, material scale and lighting.
LIGHTING: One identical motivated source in every shot: warm morning sunlight filtering through the trees from upper frame-right.The teacher’s lower-left side remains slightly darker in all five shots. Soft rim light separates the felt fibres from the forest. Protect the cream cloud, pastel numerals and rainbow highlights from clipping. The direction, colour temperature, haze density and exposure remain unchanged across every cut.
AUDIO VOICEOVER: The cloud teacher speaks in English with the same warm, clear, medium-high preschool-teacher voice in every shot. Pronunciation is slow, encouraging and rhythmically precise.0.78s: “One.”1.98s: “One means just one.”4.16s: “Two.”4.86s: “Two means one and one together.”7.26s: “Three.”8.04s: “Three means two and one more.”10.32s: “Four.”11.06s: “Four means three and one more.”13.32s: “One, two, three, four.”14.40s: “Great job!”
MUSIC: one continuous original children’s instrumental across all cuts, using soft marimba, toy piano, light ukulele, felt-drum taps and gentle handclaps. The same melody, tempo and instrumentation continue seamlessly through every shot. It rises slightly with each new number and ends with a short celebratory flourish.SFX: one soft felt pop for each numeral bounce; one clay plop for the apple; two tiny moss footsteps for the chicks; three sparkle chimes for the stars; four wooden clicks for the blocks; four soft firefly pings during the recap; one bright celebration chime at the end.
AMBIENCE: continuous close grass rustle, mid-distance leaves and faint woodland birds. The ambience never resets at the cuts.MIX: narration remains clear and centred. Music ducks beneath every spoken line. Sound effects synchronise exactly with the quantities. Music and ambience remain continuous across every hard cut.
SUBTITLES: Burned-in English subtitles, bottom-centre inside the title-safe area, positioned 10% above the lower edge.One or two lines maximum. Rounded cream felt subtitle panel with dark chocolate-brown bold lettering, high contrast and stable placement. Subtitles appear and disappear exactly with the matching narration:0.78–1.38s: “ONE.”1.98–3.84s: “ONE MEANS JUST ONE.”4.16–4.66s: “TWO.”4.86–6.82s: “TWO MEANS ONE AND ONE TOGETHER.”7.26–7.78s: “THREE.”8.04–10.16s: “THREE MEANS TWO AND ONE MORE.”10.32–10.80s: “FOUR.”11.06–13.08s: “FOUR MEANS THREE AND ONE MORE.”13.32–14.24s: “ONE, TWO, THREE, FOUR.”14.40–15.00s: “GREAT JOB!”
CHARACTER ACTING: Cloud teacher: identical body proportions, cream felt texture, tiny arms, dot eyes, rosy cheeks and a small smiling mouth in every shot. Uses slow preschool-teaching gestures. The gaze always lands on the active numeral or quantity. The expression gradually changes from patient concentration in Shot 1 to a broad celebratory smile in Shot 5.Shot 1: points with one hand and watches the single apple settle.Shot 2: brings both hands together as the two chicks join.Shot 3: traces a small triangle after the third star appears.Shot 4: raises four soft fingertips after the final block connects.Shot 5: points across four firefly pulses, then opens both arms toward the viewer.Two chick pupils: appear only in Shot 2. The first chick leaves a visible space beside itself; the second fills that space. Both look up at the teacher and blink once after joining.
STYLE: One perfectly consistent handmade clay-and-felt stop-motion storybook world across every shot.Rounded silhouettes, tactile fingerprints, plush fibres, softly imperfect surfaces, oversized friendly trees, moss carpet, tiny flowers and pastel rainbow details.Identical teacher model, forest geometry, prop scale, material softness, lens character and lighting direction after every cut.Soft vintage optical character, old-photograph texture, subtle film grain, slight halation and natural motion blur.Colour 60:30:10 = moss green and warm wood / cream and pastel numeral colours / coral-red and sunny-yellow accents. Vintage photo softness, no sharpening.
QUALITY: The cloud teacher, active numeral, active quantity and subtitles remain readable in every shot. Numeral shapes are conventional, upright and unambiguous. Subtitle spelling, punctuation and timing match the specified script exactly. Subtitle size, typeface, panel shape and screen position remain identical across all cuts. Soft old-photo resolution, never digitally sharpened.Natural motion blur without ghosting, duplicated limbs, malformed numerals, incorrect quantities or plastic CGI surfaces.
POSITIVE CONSTRAINTS: Numbers 1, 2, 3 and 4 each receive one separate teaching shot. Only one large numeral appears in each teaching shot. Shot 1 contains exactly one apple. Shot 2 contains exactly two yellow chicks. Shot 3 contains exactly three blue stars. Shot 4 contains exactly four purple blocks. Shot 5 contains only the cloud teacher, four sequential firefly pulses and the final clay sun. The same cloud teacher identity, forest style, light direction, optics, colour palette, music and subtitle design continue across every cut. Speech count: exactly 10 lines. Every subtitle matches its spoken line word for word. A shared 1–4 teaching frame, split screen, incorrect quantity, extra character, style change, lighting change, malformed subtitle or mismatched narration = failed shot.
```

16 · 编辑：将整体转换为毛毡风格

##### 输入参考素材

![编辑：将整体转换为毛毡风格 · 官网参考图 image-24](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-24.webp)

官网参考图 image-24 · [下载原图](https://best.xiaohu.ai/media/kling-4-model-user-guide/originals/source-image-24.png)

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-24-45b690f1c115e4bd.mp4)

编辑：将整体转换为毛毡风格 · 输入参考素材

[下载原始视频 · 15.07 秒](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-24-45b690f1c115e4bd.mp4)

##### 官方结果

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-25-d09ee4210fcaa18a.mp4)

编辑：将整体转换为毛毡风格 · 官方结果

[下载原始视频 · 15.04 秒](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-25-d09ee4210fcaa18a.mp4)

输入参考：[video-24](https://static-53.klingai-cdn-aws.com/kling-blog/presigned_url/243e4698-e9f5-4192-bdf5-c3aa01bbd121_1-1-1.mov) · [image-24](https://static-12.klingai-cdn-aws.com/kling-blog/file_by_url/df26de15d0723c4dc3063da47dea63cdffa4310fbfe00165f12034dca85e358d.png)

官方结果：[video-25](https://static--4.klingai-cdn-aws.com/kling-blog/presigned_url/04e6bce0-f983-482a-b9e1-10f816d9321b_1-1.mp4)

```
Edit @Video 1 by transforming the entire video into the felt style shown in @Image 1. Preserve the original video's composition, camera shots, camera movements, character actions, timing, and sequence exactly. Change only the visual style to match the felt aesthetic of @Image 1. All characters, objects, and environments should have consistent felt textures and a handcrafted felt appearance. Do not alter the original scene content, character identities, or movements. Everything else must remain unchanged.
```
17 · 首帧加视频参考：椅子跳崖

##### 输入参考素材

![首帧加视频参考：椅子跳崖 · 官网参考图 image-25](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-25.webp)

官网参考图 image-25 · [下载原图](https://best.xiaohu.ai/media/kling-4-model-user-guide/originals/source-image-25.png)

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-26-c8e0e98dd520b31c.mp4)

首帧加视频参考：椅子跳崖 · 输入参考素材

[下载原始视频 · 15.03 秒](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-26-c8e0e98dd520b31c.mp4)

##### 官方结果

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-27-4a00b441bf182815.mp4)

首帧加视频参考：椅子跳崖 · 官方结果

[下载原始视频 · 15.04 秒](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-27-4a00b441bf182815.mp4)

输入参考：[image-25](https://static--11.klingai-cdn-aws.com/kling-blog/file_by_url/a587a7581557e29314065a81c742d18edb842696f595a220c4bd757d9c7a8c83.png) · [video-26](https://static-96.klingai-cdn-aws.com/kling-blog/presigned_url/bdac1b40-c32d-4f3a-b565-40d258f1d78b_1-1-1.mp4)

官方结果：[video-27](https://static--89.klingai-cdn-aws.com/kling-blog/presigned_url/6277f31b-5c85-4c24-9974-d5254c0fa23c_1-1.mp4)

```
@Image1 is the first frame.  @Video1 is the reference for camera, motion, timing and cuts. Recreate @Video1 shot-for-shot and cut-for-cut, but starting from @Image1: the rider is SITTING in a black office swivel chair instead of standing on a bike. Same chest-mounted GoPro fisheye POV, same ramp, canyon, river, orange parachute with white ring, airboat and cheering crew; same three jump-cuts and audio as video. Wherever the video shows the bike — under the rider on the ramp, shoved away at the cliff, tumbling below in free-fall, and the tiny silhouette during the parachute opening — show the office chair (mesh backrest, padded seat, chrome column, five-spoke base, casters). Before the launch, the rider stays seated exactly as in @Image1: thighs and knees at the bottom of frame, sneakers on the star base, hands on the armrests. No bicycle, handlebar, tyres or pedals anywhere.
```
18 · 首尾帧：生铁锻造成大剑

##### 输入参考素材

![首尾帧：生铁锻造成大剑 · 官网参考图 image-26](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-26.webp)

官网参考图 image-26 · [下载原图](https://best.xiaohu.ai/media/kling-4-model-user-guide/originals/source-image-26.png)

![首尾帧：生铁锻造成大剑 · 官网参考图 image-27](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-27.webp)

官网参考图 image-27 · [下载原图](https://best.xiaohu.ai/media/kling-4-model-user-guide/originals/source-image-27.png)

##### 官方结果

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-28-f4d6dc7783b8ebc5.mp4)

首尾帧：生铁锻造成大剑 · 官方结果

[下载原始视频 · 15.04 秒](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-28-f4d6dc7783b8ebc5.mp4)

输入参考：[image-26](https://static-84.klingai-cdn-aws.com/kling-blog/file_by_url/19ce60e842cb8fb4c613ed685c77e1c4d4cf027c6e827611fe944122945eccf1.png) · [image-27](https://static--59.klingai-cdn-aws.com/kling-blog/file_by_url/0b1daaccfe88e3810a5249fa9b1b81d8270e3a89ba88adda865ec5cfe0fa6ae1.png)

官方结果：[video-28](https://static--34.klingai-cdn-aws.com/kling-blog/presigned_url/e8b7cc55-4cb6-4a0c-b175-e22d1f378f5f_1-2.mp4)

```
场景上下文：严格限定 1 个角色，严禁重复。室内，一间陈旧的铁匠铺，白天。同一位铁匠取下原材料，将其锻造成一把大剑，并将完成后的剑放回原桌。时长 15 秒，共六个镜头。通过剪辑压缩制造时间；单个动作保留自然的重量感和速度。
活动参考：@Image1：精确的首帧锚点。保留所有五块铁块、它们的排列方式、桌面、背景工具、透视和光照。此图像是主动拍摄镜头的起始状态。@Image2：精确的尾帧锚点和成品剑设计。保留剑身轮廓、中央血槽、角形弯曲护手、螺旋金属握柄、多面剑首、对角线放置位置、透视和背景。此构图是通过可见的物理放置达成的。
位置地图：工作台占据前景。工具桶位于其左后边缘后方，棒架占据右后方，铁砧位于右侧。在首尾镜头中，铁匠都在桌子左侧工作。摄像机保持在面向观众的工作台一侧。在锻造剑身的特写镜头中，剑茎指向屏幕左侧，剑尖指向屏幕右侧。最终剑的位置从左上角的剑首延伸至右下角的剑尖。
首帧与空间布局：0.0 秒时，画面与原材料参考完全一致，可见五块铁块，无双手可见。同一位铁匠立即从左侧边缘伸手入画。戴着手套的双手从两端接近最大的中央铁块，准备进行支撑性双手提拉。铁匠穿着烟灰灰色袖子、棕色皮手套，右袖口系着一条深色带子。这些细节在所有镜头中保持一致。
格式模式：总时长 15 秒，六个镜头。在 3.0、5.0、8.0、10.0 和 11.0 秒处硬切。剪辑压缩了省略的制造工作和清理工作台的过程。开头的取放和结尾的放置均作为连续的物理动作呈现。无淡入淡出、溶解或物体变形过渡。
光学：镜头 1 和 6：与参考匹配的抬高三分之四构图，对角线视场角约为 63°，距离桌面中心约 1.8 米。精确的端点构图优先于估计的光学测量。镜头 2–5：对角线视场角 40°，距离工作接触点约 0.8 米。焦点跟随双手和金属接触点；工作间背景保持柔和可读。每个镜头保持固定的视场角。
摄像机：真人摄像师从工作区面向观众的一侧持机拍摄。所有镜头均使用手持模式：SETTLE：可见的呼吸晃动、轻微滚动和微小的延迟修正。开场摄像机在铁块离开画面时保持位置。结尾摄像机在剑进入时保持空桌面的构图，然后稳定到与最终参考完全一致。铁匠是唯一可见的工作人员；摄像机操作员不在画面内。
动作时序：0.0–3.0 秒 — 取铁。从精确的首帧参考开始；在 0.0–0.6 秒期间，铁匠匹配的戴手套双手从屏幕左侧进入，抓住最大的中央铁块的两端。在 0.6–1.5 秒期间，手腕固定，双手将铁块从桌面抬起，露出下方的桌面区域。在 1.5–3.0 秒期间，铁匠将支撑的铁块从屏幕左侧带走；其他四块铁块在剪辑前仍静置于桌上。3.0–5.0 秒 — 加热坯料。时间硬切，一块已烧至橙红色的厚钢坯已置于炉煤中。相同的灰色袖子、棕色手套和右袖口带子出现在屏幕左侧，铁匠用长钳夹住钢坯。短促受控的拉动将钢坯拉向炉口，热量 shimmer 在其鳞片状表面之上升起。5.0–8.0 秒 — 锻造剑身。时间硬切，延长的橙红色剑坯支撑在铁砧上，剑茎在左，伸出的剑尖在右。同一位铁匠用左手钳固定剑茎，并用右手沿剑面进行三次 deliberate 的锤击。每次锤击产生局部压缩、手腕反冲和短暂的黑色氧化皮飞溅。8.0–10.0 秒 — 精加工金属。时间硬切，冷却后的剑已成型血槽，由相同的戴手套双手持握，抵住研磨轮。铁匠沿斜面进行一次受控的精加工行程。明亮的金属条出现，一股狭窄的火花流从实际接触点落下。10.0–11.0 秒 — 完成剑柄。时间硬切，几乎完成的剑支撑在单独的组装台上，护手和螺旋金属握柄已安装完毕。同一位铁匠的左手固定握柄，右手将多面剑首拧紧最后一圈。完成的剑现在具有最终图像所需的精确结构和外观。11.0–15.0 秒 — 放置成品剑。硬切回原始工作台，现在完全清空；在相同的戴手套双手从屏幕左侧携带成品剑进入之前，展示其空表面 0.4 秒，一只手握住握柄，另一只手在平衡点附近支撑剑面。从 11.4–13.8 秒，铁匠将整把刚性剑对角线放下，剑柄朝向左上，剑尖朝向右下，轻轻将其放在桌面上，并在重量转移到桌面时滑开支撑手。从 13.8–15.0 秒，双手释放并从屏幕左侧退出；剑在摄像机稳定到最后一帧时保持静止在精确的最终参考位置。
物理：原始铁块在提拉过程中保持其形状和质量。双手持续支撑它；前臂紧绷，提升在重量作用下缓慢加速。铁砧在锻造期间支撑热剑。形状的大幅变化发生在剪辑的时间跳跃中。完成的剑在携带和放置过程中保持刚性。支撑剑的手在剑稳定时有可见的间隙以滑开；手从未穿过剑或桌面。金属接触产生短暂的刮擦声和低沉沉重的撞击声，随后归于寂静。同一位铁匠在最终镜头前省略的时间内清理剩余的原材料。
光照：原始桌面镜头使用来自摄像机左上方的柔和日光，与两个参考一致。保留铁中的暗部细节，并保护银色剑身高光。锻造特写镜头使用来自左下方的橙色煤炭发光作为主要光源。在剑进入最终桌面镜头前恢复原始中性日光。
音频：安静的车间空气和远处的炉风构成环境底噪。开头：皮革吱吱声、短暂的铁刮擦声和沉重的铁块升起时的克制用力呼吸声。中间：炉火噼啪声、钳子接触声、三次同步的锤击声、研磨刮擦声和短暂的装配声。结尾：袖子移动声、手套与金属的摩擦声、沉重的剑击桌面声，然后是安静的车间环境音。铁匠没有台词。仅 SFX，无音乐，无配乐，无歌曲，无原声带。
角色表演：一位一致的铁匠执行所有可见动作。烟灰灰色袖子、棕色皮手套和深色右袖口带子保持不变。双手动作 deliberate：提拉前固定，保持牢固的工具接触，并在放下成品剑前降低速度。物理节奏从原始铁块提拉时的费力转变为最终放置时的谨慎控制。面部和躯干保持在裁剪范围之外。
风格：接地气的车间纪录片风格，具有触感铁器、陈旧工具和令人信服的体力劳动。柔和的老照片质感，克制的颗粒感和自然的运动模糊；无数字锐化。炭色金属和暗淡的棕色表面占主导地位，带有银色高光和局部锻造橙色。首帧和末帧保留所提供图像的外观。
质量：保持手、手套、袖子细节、金属几何形状和接触阴影的一致性。被提起的铁块露出下方的桌面。结尾镜头在剑进入前明显建立空桌面的构图。保持完整的最终剑可读，包括其剑尖、护手、握柄和剑首。避免重复的肢体、闪烁的几何形状和相交的实体表面。
正面约束：首帧恰好包含五块铁块。最大的中央铁块在同一个铁匠的双手中物理离开桌子。最后一个镜头以空桌子开始。完成的剑在由同一位铁匠明显支撑的情况下进入，接触桌面，并在双手退出后保持静止。最后一帧与成品剑参考完全一致。开头的取放和最终的放置各自保持连续，可见手与物体的接触。恰好有一把完成的剑。无文字叠加、字幕或音乐。
```

19 · 首尾帧：街头逃离

##### 输入参考素材

![首尾帧：街头逃离 · 官网参考图 image-28](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-28.webp)

官网参考图 image-28 · [下载原图](https://best.xiaohu.ai/media/kling-4-model-user-guide/originals/source-image-28.png)

![首尾帧：街头逃离 · 官网参考图 image-29](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-29.webp)

官网参考图 image-29 · [下载原图](https://best.xiaohu.ai/media/kling-4-model-user-guide/originals/source-image-29.png)

##### 官方结果

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-29-8fe39d3506f09702.mp4)

首尾帧：街头逃离 · 官方结果

[下载原始视频 · 20.04 秒](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-29-8fe39d3506f09702.mp4)

输入参考：[image-28](https://static-73.klingai-cdn-aws.com/kling-blog/file_by_url/8cacca42bc6f30b6b7005d79689b1514c8aa39570c940406880e1cf7299d3f3f.png) · [image-29](https://static-18.klingai-cdn-aws.com/kling-blog/file_by_url/981929584e94d954726e341a62ff98315c2bee8aea21d711002dc3f5c4509d72.png)

官方结果：[video-29](https://static-60.klingai-cdn-aws.com/kling-blog/presigned_url/a9525d30-1b22-4f61-a7ca-7478eb835d24_1-3.mp4)

```
Generate a 30-second, horizontal 16:9 realistic cinematic street escape video. The entire video must be one continuous lateral side-tracking long take, filmed in a single shot with no cuts, no angle changes, and no scene changes. The scene takes place on a busy Manhattan-style street. Use a cool-toned, low-saturation film look, shallow depth of field, and realistic handheld shoulder-rig or gimbal camera movement. The street features outdoor restaurant seating, yellow taxis, parked vehicles, newspaper stands, fire hydrants, construction scaffolding, storefront windows, white steam rising from subway ventilation grates, pedestrians, and dense crowds in the distance. Foreground objects continuously sweep rapidly across the frame, creating natural occlusions and a convincing sense of street depth. The camera remains parallel to the street, moving laterally to the left while following a young woman running. She carries a large, overstuffed travel bag that is visibly heavy. As she runs, the bag swings with a delayed motion and thuds heavily against the side of her leg, causing her body to tilt slightly off balance. She looks tense and exhausted, breathing rapidly and occasionally glancing back over her shoulder, but no pursuers should appear anywhere in the frame.
0–5s: Establishing shot of a calm street. The camera initially frames an outdoor restaurant seating area. A passerby is lifting a cup of coffee, with round metal tables, wicker chairs, awnings, and pedestrians nearby. Realistic street ambience dominates the audio: traffic, voices, footsteps, and distant horns. The camera moves slowly to the left, keeping the scene calm. A blurred figure of the female protagonist gradually appears at the far right edge of the frame, rushing in at high speed.
5–12s: The woman rushes into frame, and the camera catches up with her. She bursts in from the right, and the camera rapidly accelerates laterally to the left as if her movement is pulling it along, catching up with her. The focus shifts from the street scenery to her face, with slight overshooting and refocusing allowed during the transition. She runs at full speed, mouth open as she gasps for air, brows tightly furrowed, jaw clenched. She looks back over her shoulder twice, with the second glance more pronounced, revealing fear and exhaustion. She carries the heavy, oversized travel bag, which swings with a delay in response to each arm movement and thuds heavily against her leg, throwing her body slightly off balance. She brushes past outdoor seating and runs over subway ventilation grates, stirring up white steam. Pedestrians and street objects in the foreground sweep rapidly across the frame.
12–15s: Occlusion and losing sight of her. A yellow taxi or a group of pedestrians quickly passes between the camera and the woman, completely obscuring the frame for approximately half a second to one second. When the obstruction clears, the woman is no longer at the center of the frame. The camera continues moving laterally but noticeably slows down and briefly loses focus, as if the camera operator is searching for her. The camera sweeps past a lamppost, pedestrians from behind, a newspaper stand, parked vehicles, and reflections in storefront windows.
15–21s: Finding the woman again. The camera continues searching along the sidewalk. Focus briefly shifts back and forth between foreground pedestrians, storefront reflections, and street objects before reacquiring the woman's back and profile farther away. She is still running to the left, but she is more exhausted than before. The camera accelerates again to catch up with her, pulling focus from the foreground pedestrians back to her body and face. Her pace begins to slow, her breathing becomes heavier, her strides shorten, and the travel bag feels increasingly burdensome. She briefly switches the bag to her other hand, then immediately switches it back, gripping the handle tightly as the weight pulls her body increasingly off balance.
21–30s: Running into the crowd and gradually disappearing. The camera reacquires a full-body side view of the woman. She runs past construction scaffolding, while green safety netting and metal poles sweep rapidly across the foreground one by one. Her running reflection briefly appears in storefront glass. Sweat is visible on her face, and her expression shifts from panic to exhausted determination. Finally, she rushes into the dense crowd at the entrance to a pedestrian street, using her shoulder to push past people blocking her way. Her figure is repeatedly obscured by foreground pedestrians, leaving only intermittent glimpses of her profile, jacket, and heavy travel bag. The camera continues moving slowly to the left, struggling to keep her in frame but gradually falling behind. The final shot remains on the flowing crowd, with only her back and a corner of the travel bag visible before they disappear between people.
Audio: No dialogue, no voice-over, and no background music. The soundscape should consist primarily of realistic street ambience: traffic, voices, footsteps, and distant horns. When the camera catches up with the woman, her rapid breathing, footsteps, and the sound of the travel bag thudding against her leg should dominate the center of the soundscape. During occlusion, the whoosh of a passing taxi or the footsteps of the crowd should overpower everything else. When the camera loses sight of her, her breathing should become more distant. After she is found again, her breathing should grow louder and closer. Toward the end, the footsteps and voices of the crowd should gradually swallow her sounds.
Visual style: Realistic cinematic street-chase atmosphere, cool-toned, low-saturation film color grading, detailed shadows, soft highlights, and fine film grain. Shallow depth of field, with foreground and background naturally blurring during movement. Focus should exhibit slight overshooting, refocusing, and brief moments of defocus, resembling manual focus adjustments by a real camera operator. Camera movement should have the authentic feel of a handheld shoulder rig or gimbal, with subtle vertical bobbing, lateral sway, and the inertia of acceleration and deceleration, but no violent shaking.
Negative Constraints: No cuts, no jump cuts, no white flashes, no dissolves, no slow motion, no speed changes, no subtitles, no watermarks, no UI, and no background music. No pursuers, no three men in suits, and no additional clearly identifiable antagonist characters. No mechanical, rail-mounted camera movement. No sliding character motion; the running must convey realistic footfalls and physical weight. Do not make the travel bag appear weightless. Do not make the woman run gracefully or calmly. No body intersections or clipping, no merging of people in the crowd, and no sudden changes of street, character, clothing, or camera angle.
```

20 · 尾帧：真人场景收束为《夜巡》

##### 输入参考素材

![尾帧：真人场景收束为《夜巡》 · 官网参考图 image-30](https://best.xiaohu.ai/media/kling-4-model-user-guide/guide-reference-30.webp)

官网参考图 image-30 · [下载原图](https://best.xiaohu.ai/media/kling-4-model-user-guide/originals/source-image-30.jpg)

##### 官方结果

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-30-676f748a5424d847.mp4)

尾帧：真人场景收束为《夜巡》 · 官方结果

[下载原始视频 · 15.04 秒](https://pic.xiaohu.ai/jiedu-media/kling-4-model-user-guide/source-video-30-676f748a5424d847.mp4)

输入参考：[image-30](https://static-90.klingai-cdn-aws.com/kling-blog/file_by_url/4b16c7bb953ef321eeaff771e559b35cecd573838d2e1f42a55a4e8e0c4e0278.jpg)

官方结果：[video-30](https://static-77.klingai-cdn-aws.com/kling-blog/presigned_url/4205f3d5-fbac-4bfa-9ae3-2826fe780925_1-4.mp4)

```
场景上下文 — 仅包含一个历史场景，无其他额外角色。使用 @Image1 作为精确的尾帧参考，用于角色服装、位置、布光、构图和绘画色彩基调。创作一部 15 秒的电影短片，描绘一支 17 世纪的市民民兵队伍从昏暗的拱门中集结出发。前半部分必须完全呈现为真人实拍 footage，具有高度的照片级真实感。仅在结尾处，场景才会在同一个连续镜头中逐渐转化为原始画作。角色不得从画中走出，开头不得出现油画质感。

地点与氛围：黑暗的都市拱门通向石板路面，市民民兵在此集结准备行进。空气中弥漫着城市尘埃，一束温暖的阳光从侧面射入。使用具有戏剧性的伦勃朗式明暗对照法（chiaroscuro），同时让空间笼罩在夜色黑暗中。不要营造月光夜景的效果。

摄影与光学：使用电影级照片真实感，精细渲染的纹理， realistic 镜头景深，细微的手持呼吸感，以及平滑的跟踪和拉远运镜。摄像机起始于地面低角度，自然跟踪穿过行进的人群，然后逐渐拉远并略微上升。整个序列保持为单一连续镜头，在真人场景、转化中的画作以及周围黑暗环境之间保持空间连续性。

格式模式：总时长 15 秒，单一连续镜头。无硬切、白光闪烁、翻页效果或中断空间连续性的转场。从真人到画作的转化在同一镜头内逐渐发生，从边缘向中心推进。

动作时间轴：
0.0–3.0 秒 — 民兵行进。摄像机贴近地面跟踪，靴子在石板路面上行进。鼓槌敲击，红色袖摆掠过镜头。摄像机自然向上倾斜，跟随一支滑过旗帜下方的火枪。所有动作感觉真实且沉重，步速自然，无慢动作。场景保持完全照片级真实感，无可见的油画质感。

3.0–8.0 秒 — 穿越人群。摄像机平稳穿过人群，找到身穿黑衣、系红色绶带的队长。他转身检查队形，并向前伸出手发出指令。在他身旁，一位身穿浅金色服装的中尉向前迈出一步。背景中，卫兵举起长矛并调整队形。一个金发小女孩短暂地回头看向队伍。表情和动作保持自然克制，仿佛被历史电影的摄像机即兴捕捉。保持完全逼真的皮肤、织物、金属和建筑细节。

8.0–12.0 秒 — 揭示构图。摄像机持续拉远并略微上升。随着队伍继续移动，角色逐渐定格在原始画作中的精确位置。队长的伸出的手、中尉的姿势、门口穿红衣的卫兵、阿富汗女孩、武器以及右侧的鼓手同时进入视野。此刻，鼓声突然停止，所有人定格半秒。在构图完全可辨识时，保留逼真的真人外观。

12.0–15.0 秒 — 转化为画作。继续相同的缓慢拉远，不切断画面。逼真的皮肤、织物、金属和建筑细节逐渐从边缘向中心转化为浓郁的油画和可见的笔触。周围场景逐渐解析为原始画作
《夜巡》
，完全揭示 @Image1。保留原始画作的精确位置、角色服装、比例、布光、色彩基调和构图。结尾时，转化完成，画面保持静止。

尾帧与构图：最终画作必须保留其完整的原始宽高比，并居中显示在画面中，画作与周围黑暗环境之间保持无缝的空间连续性。不要裁剪原始画作，不要改变其构图，也不要引入任何额外角色。保持完成后的画面静止直到结束。

布光与色彩：起始于夜色黑暗，戏剧性的伦勃朗式明暗对照法，暖色侧光，以及悬浮在空气中的尘埃。不要引入月光。在真人部分，保持逼真的电影布光和自然材质纹理。随着画作转化的进行，保留原始画作独特的布光、浓郁的油画色彩和可见的笔触。

物理与运动：靴子与石板路面保持令人信服的接触。武器、衣物和装备的移动具有真实的重量感和惯性。队长的手势、中尉的前进、卫兵的队形调整以及女孩短暂的回头都保持物理上的自然。转化为画作的过程改变的是现有场景的视觉渲染，而不是导致角色从画中走出或移出画作。

音频：环境音频包括靴子踩在石头上的声音、织物摩擦声、细微的金属碰撞声和现场鼓声。加入低音弦乐并逐渐增强管弦乐音乐，随着摄像机拉远推向高潮。在场景定格的那一刻，鼓声停止，只留下短暂的音乐共鸣。声音设计必须支持从生动的历史场景到静止绘画构图的电影化进程。

风格：电影历史现实主义过渡到原始油画。开头和中间部分必须完全看起来像真人实拍 footage，具有逼真的皮肤、织物、金属、建筑表面、镜头景深和自然运动。浓郁的油画质感和可见笔触仅在结尾出现，逐渐取代照片级真实感渲染。

正向约束：在连续镜头中保持角色身份、服装、位置、武器和空间关系的一致性。保留 @Image1 的确切最终构图。前半部分保持完全照片级真实感。转化从边缘向中心推进，并在 15.0 秒时完成。角色不得从画中走出。无额外角色、无裁剪画作、无硬切、无白光闪烁、无翻页效果、无过早出现的油画质感。最终帧匹配原始画作的完整宽高比和构图，居中于周围黑暗环境中。
```

> ⚠️ 原文较长,超出部分未翻译,请通过上方原文链接查看完整内容。
