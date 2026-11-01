---
title: "Google DeepMind 发布 Genie 4：能实时改场景、与角色对话的世界模型"
date: 2026-10-28T00:00:00.000Z
tags: ["产品发布", "Google DeepMind", "Genie 4", "世界模型", "Gemini", "聚合"]
summary: "在生成中的世界里移动、改天气、加角色，让 Gemini 观察画面并引导多步事件。"
---
> **原文链接**: [https://deepmind.google/blog/genie-4-a-new-generation-of-world-simulation/](https://deepmind.google/blog/genie-4-a-new-generation-of-world-simulation/)
> **来源**: deepmind.google
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/genie-4-interactive-world/) · 2026/10/28
> **说明**: 本文由 AIHot 自动聚合(原文即中文,未翻译)。正文取自小互 AI 解读

---

全文 Markdown · 会员

作者：Google DeepMind10-28![](https://pic.xiaohu.ai/jiedu-media/genie-4-interactive-world/social/zh-89177393c160.png)

Google DeepMind 发布了新一代世界模型 **Genie 4**：用文字或图片建立一个持续生成的环境，用户可以走进去、移动镜头，也可以在运行中改变天气、加入物体，让角色做出动作或说话。

这次更新把几种能力放到了同一个交互过程里：

- **边探索，边改变世界。** 键盘控制移动和视角，文字指令改变正在发生的事。
- **画面和声音一起生成。** 除了风声、水声和音乐，角色还能根据输入和场景事件展开对话。
- **人物与物体运动更自然。** 演示覆盖人物走动、布料随风飘动、种子旋转下落，以及物体碰撞碎裂。
- **Gemini 参与多步引导。** 它观察新画面、拆解目标、检查进度，并根据场景变化调整后续步骤。

Genie 4 当前处于面向受信任测试者的研究预览阶段。普通用户和开发者的后续入口已有计划，仍需等待开放。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/genie-4/x-2115114028338962672-0.mp4)

Genie 4 官方主宣传片。
从雪地冠鹤、摩托车对白到机器人场景，展示在生成环境里移动、输入指令和观察后续变化。

### 一边走，一边决定接下来发生什么

已经生成好的视频，后面的情节不会因为观众按下方向键而改变。Genie 4 则在探索过程中继续生成画面：你移动，观察位置随之变化；你输入新指令，接下来的事件也可以改变。

“世界模型”在这里可以这样理解：它根据当前场景和输入，生成世界后续的样子与变化。你看到的空间、人物和动作都由模型继续生成。

键盘和文字承担两种不同的控制。键盘让你向前、向后、转动视角，决定从哪里看；文字让你修改天气、添加人物或物体，决定这个环境里发生什么。两种操作可以在同一段探索中交替使用。

西瓜演示很直观：石台上原本放着一个完整西瓜，用户中途输入“让一尊沉重的白色大理石古典胸像落在西瓜上”。随后，同一个场景里出现落下的胸像，西瓜被撞开，碎块散落在台面及周围。用户改变的是正在进行的场景的后续事件。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/genie-4/official-06.webm)

中途输入新事件，场景继续演变。
大理石胸像落下，西瓜碎裂，碎块散落在石台及周围。

Gemini 会结合周围场景调整用户的提示词，在用户没有继续输入时也会观察、引导场景推进。

### 画面和动作更逼真，世界也有了声音

在官方后台走廊的并排演示中，人物在挂衣架、化妆镜与门帘之间行走，为观者提供了直观的视觉参照：相较前代，Genie 4 展现出更逼真的空间细节与更自然的肢体动作。角色走动时，世界还会生成相应的声音。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/genie-4/official-02.webm)

左：Genie 3；右：Genie 4。
官方后台场景示意对照，序列经过缩短；可对照人物走动和空间细节。

Genie 4 是 Google DeepMind 首个能够原生生成声音的实时世界模型。环境不再只是会动的画面：树间有风，海边有浪，音乐和背景噪声也可以随着世界一起生成。

人物对话让这种变化更明显。角色会根据用户输入或世界里的事件说话、回应，对话也能在场景运行中改变。

官方的日本乡村车站演示中，近处是制服检票员，旁边有红色列车，乘客在月台上走动。用户输入让检票员提醒乘客、播报下一班发车的指令，镜头则继续穿行和转向列车。人物动作、对白引导与观察位置变化发生在同一个环境里。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/genie-4/official-08.webm)

车站里既能移动视角，也能引导角色。
检票员、来往乘客和近处列车共同构成动态场景；提示词引导检票员提醒与广播。人物对白请开启原片声音收听。

更自然的动作也不只体现在人物身上。其他演示里，粉色丝绸被风掀起、沿草地起伏，枫树种子旋转着落入草丛。这些例子让“空气动力学、碰撞和自然运动”有了可见的含义：模型需要继续生成物体受环境影响后的变化，而不只是把一个静止对象移动到另一个位置。

### Gemini 为什么要不断回看生成的画面

让场景继续动，与让一个多步目标逐步完成，是两件不同的事。比如冠鹤演示里，鸟需要朝雪地上的白色键盘琴靠近，随后低头，再展开翅膀离开。只把几个动作写进一条指令，并不能说明模型已经跟踪了每一步的实际结果。

Google 给出的做法是让 **Gemini 3.8 Flash 充当引导 Agent**。Genie 4 持续生成世界，Flash 则观察场景，把目标拆成步骤，再读取后续画面，检查动作进展。用户插入新指令或场景发生变化时，它会调整计划。

用冠鹤这个例子理解：引导动作是“靠近琴键”，检查对象是新画面里冠鹤与琴的位置；引导动作变成“低头”后，需要观察的又是鸟的姿态。后续指令因此可以结合已经生成的结果，随动作进展继续调整。

**Gemini 3.8 Flash**观察场景 · 拆解目标 · 检查进度
文字步骤 *→**←* 新画面反馈
**Genie 4**继续生成世界的画面与声音

Gemini Omni 提供贴近真实世界的外观和行为基础，Flash 负责图中的观察与引导。

![冠鹤接近雪地上的白色键盘琴](https://pic.xiaohu.ai/jiedu-media/genie-4/crane-step-1.jpg)

**① 接近琴键**先观察鸟与目标的位置关系。

![冠鹤在白色键盘琴旁低头](https://pic.xiaohu.ai/jiedu-media/genie-4/crane-step-2.jpg)

**② 低头靠近**新画面让引导 Agent 跟踪动作进展。

![冠鹤在键盘琴旁展开翅膀](https://pic.xiaohu.ai/jiedu-media/genie-4/crane-step-3.jpg)

**③ 展开翅膀**后续动作继续在同一场景生成。

第 1 帧 / 3

先看位置：冠鹤已经靠近琴键，新画面让引导 Agent 能够跟踪接近目标的进展。

（根据官方说明整理的机制示意，三张截图选自同一段演示；按钮切换观察重点，连续动作和声音见下方原片）

**Gemini Omni 提供外观和行为的基础能力**，让模拟贴近真实世界的样子与运动；**Gemini 3.8 Flash 负责实时观察与引导**，帮助一连串事件按目标推进。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/genie-4/official-14.webm)

观察动作进展，再继续引导。
原片包含流星、冠鹤靠近白色键盘琴、低头与起飞；右上角可见 Gemini 的引导步骤。

### 模拟机器人下棋，展示了哪一步

Google 还探索了 **Gemini 4 Argon 与 Genie 4** 的配合。在模拟 Apptronik 的 Apollo 人形机器人下西洋跳棋时，Argon 把任务拆成描述动作的文字步骤，这些文字与正在生成的画面交错送入 Genie 4，让模拟继续推进。

（这里的 checkers 是圆棋子在方格棋盘上移动的西洋跳棋，与常见的六角星形中国跳棋不同）

这与 Flash 的实时引导演示属于不同的探索。棋盘片段左侧是 Argon 的文字步骤，右侧是 Genie 4 生成的机器人视角：文字描述手和棋子接下来怎样移动，模拟画面随之推进。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/genie-4/official-15.webm)

左边是文字步骤，右边是生成的机器人模拟。
Gemini 4 Argon 与 Genie 4 配合，模拟 Apollo 在棋盘上移动棋子；这是模拟画面，不是真实机器人的执行录像。

这种场景生成对机器人研究有吸引力：研究者希望让 Agent 在不同环境、物体和事件组合中练习或接受测试，减少每一种情境都必须在现实中搭建的负担。官方也展示了 UR5 机械臂拿移液器向多孔板分液的模拟。

这样的模拟能否让真实机械手抓得更稳，还需要训练和实机实验验证。Google 尚未公布这些模拟带来的真实机器人成功率提升，也没有给出碰撞或接触力的量化准确率。

Google 把更长远的方向称为“混合世界模型”：语言和代码负责结构、计划与事件顺序，像素层面的模拟负责呈现世界怎样看起来、听起来、做出响应。Gemini 与 Genie 的配合，是把这两种长处拉近的早期一步；更连贯、更可控的世界仍是研究目标。

### 更近的用途：试镜头、试互动、走进照片

在 Google 邀请的测试者中，影视团队正尝试把 Genie 4 当作构思与预演的“草稿模式”。导演可以进入一个生成中的场景，反复尝试机位、灯光、对白和人物动作，比较不同拍法。它的价值在于让原本需要想象和口头讨论的方案，变成可以即时探索的声画草稿。

游戏开发者和创意技术团队则在测试交互体验原型：先用自然语言尝试视觉风格、材质和互动构想，提前看到构想的效果，再决定哪些值得写进游戏引擎。

新闻与教育相关的探索包括把一张档案照片延展为可进入的动态空间，帮助人体验历史环境；也包括展示山洪、野火等短期环境事件可能怎样展开。照片外的空间、人物动作和声音属于生成补全，原照片并没有为这些细节提供历史证据。

企业合作伙伴还在评估快速“从零到一”生成情境的用途，寻找模型与实际仿真需求之间的差距。这些用途都处在测试者探索阶段。

### 哪些地方仍不稳定，现在谁能用

Genie 4 可以在短会话中维持较连贯的环境，但时间变长、反复进行复杂提示修改，或在场景中穿行后，细节与物体的持续存在仍可能漂移。对读者来说，关键区别是：某一刻看起来逼真，不代表转身再看或继续运行后，所有东西仍保持原样。

复杂物理交互、实时声音准确性、清晰文字、空间准确性和长期一致性，都是 Google 明确列出的持续研究问题。它们直接影响用途：试一组镜头可以容忍部分生成变化，依赖精确位置与重复结果的工程验证则需要更严格的证据。

Google 表示，Genie 4 生成的视频和音频会加入 **SynthID 不可感知数字水印**，帮助识别 AI 生成内容。

目前已开始开放的是受信任测试者研究预览。后续计划包括：

- 面向 Google AI Ultra 订阅者，通过 **Project Genie** 使用。
- 面向早期访问合作伙伴，通过 **Gemini API 和 Google AI Studio** 接入。

这两条后续通道仍是“即将推出”，具体调用价格和使用配额尚未公布。希望参与的用户可以先登记 [Project Genie 的 Genie 4 等候名单](https://forms.gle/WQnSNEM3omF7Uruu7)。

来源Genie 4: A new generation of world simulationRaia Hadsell, Diego Rivas and Hang Qi / Google DeepMind·[查看主材料](https://deepmind.google/blog/genie-4-a-new-generation-of-world-simulation/)延伸[Google DeepMind Genie 4 发布主题帖](https://x.com/GoogleDeepMind/status/2115114028338962672)·[Genie 4 功能与开放计划续帖](https://x.com/GoogleDeepMind/status/2115114030503166385)本站说明依据官方完整串文、长文和原始演示整理；演示为官方录制，未独立试用模型。

Google DeepMind · 世界模型研究

## Genie 4：可交互世界模拟

从单向播放的生成视频，跨入“一边走动、一边注入事件”的实时生成的声画环境。
理解控制方式 · 回看画面 · 未来方向 · 当前边界

实时声画
Google DeepMind 首个原生生成声音的实时世界模型；角色可随输入与场景事件展开对话

双模控制
键盘决定视角与移动，文字实时改变后续事件

闭环引导
Gemini 持续回看画面检查进度，动态调整多步指令

已经生成好的视频，后面的情节不会因为观众按下方向键而改变。Genie 4 则在探索过程中继续生成画面：你移动，观察位置随之变化；你输入新指令，接下来的事件也可以改变。

“世界模型”在这里是根据当前场景和输入，生成世界后续的样子与变化。你看到的空间、人物和动作由模型继续生成。

控制流 A · 空间位移
键盘操控（视角与观察点）
向前、向后、横移与旋转视角。观察位置随移动改变，决定你“从哪里看”。

控制流 B · 事件演变
文字指令（场景与事件）
改变天气、加入人物、让大理石胸像砸向西瓜。生成的画面随之出现撞击、碎裂与散落，改变环境里“发生什么”。

核心机制 · 双模型闭环
Gemini 为什么要不断回看生成的画面？

让场景继续动，与让一个多步目标逐步完成，是两件不同的事。只把几个动作写进一条指令，并不能说明模型已经跟踪了每一步的实际结果。

引导 Agent · Gemini 3.8 Flash
观察画面、拆解目标、检查进度
观察冠鹤与琴的位置关系，再看低头后的姿态；结合新画面，跟踪动作进展并调整后续步骤。

下发即时动作指令
↓

↑
回传最新渲染画面

世界模拟 · Genie 4
继续生成世界的画面与声音
Gemini Omni 提供外观与行为的基础能力；Genie 4 持续生成场景，把后续画面交回 Flash 观察。

**分工本质：**Gemini 拥有推理与视觉理解能力，负责“盯着画面校准计划”；Genie 4 持续生成世界，提供后续画面与声音。
        

另一项探索：模拟机器人下棋

在模拟 Apollo 人形机器人下西洋跳棋时，Gemini 4 Argon 将棋局对弈拆成动作指令，与 Genie 4 生成的画面交错推进。这属于另一项早期探索。Google 希望进一步结合两类能力：

层级
语言与代码能力（未来方向）
像素层面的声画模拟

职责
负责结构、计划与事件顺序
呈现世界怎样看起来、听起来、做出响应

价值
尝试让文字步骤与生成画面交错推进
希望减少现实场景的搭建负担；真实训练收益仍待验证

探索中的实际用途：声画草稿模式

**影视与游戏原型：**导演可在生成场景中即时测试机位、灯光与走位，将想象变为可探索草稿；开发者借此验证玩法风格，再决定是否写入引擎代码。

**照片延展与环境事件：**探索照片中的动态空间，或展示山洪、野火可能怎样展开。照片之外的生成细节不构成历史证据。

现实边界：哪些地方仍不可靠

逼真的某一帧，不等于长期稳定或适合精确工程验证。

长期一致性漂移与物理失真

某一刻看起来逼真，不代表转身再看或继续运行后，所有东西仍保持原样。长时间漫游或复杂指令叠加下，细节与物体的持续存在仍可能漂移。

复杂物理交互、声音准确性、清晰文字、空间准确性和长期一致性仍在研究。真实机器人成功率提升与碰撞、接触力的量化准确率尚未公布。

开放现状
面向受信任测试者（Trusted Tester）研究预览阶段

后续规划
Project Genie 面向 AI Ultra 订阅者；API / AI Studio 面向早期访问合作伙伴。两路尚待开放，价格和配额未公布

合成安全
生成的视频与音频均默认嵌入 SynthID 不可感知数字水印

原文版权归原作者，这里只供对照阅读。 [看原网页 ↗](https://deepmind.google/blog/genie-4-a-new-generation-of-world-simulation/)

## Genie 4: A new generation of world simulation

Genie 4 introduces real-time interactive world simulation with native audio, advanced physics, natural human motion, and steering powered by Gemini models.

October 27, 2026 Models

Raia Hadsell, Diego Rivas and Hang Qi

Today, we are announcing Genie 4, our new world model, which unlocks unprecedented realism and improves real-time interactive simulation. Genie 4 is natively multimodal, enabling audio-like music, ambient noises, and interactive dialogue to be simultaneously generated with the world.

The Genie 4 model incorporates and builds on capabilities from the Gemini family: Gemini Omni anchors the simulations in real-world appearance and behavior, while other Gemini models provide the complex reasoning needed to help maintain a simulation’s coherence and continuity.

With this foundation, you can set an event in motion, and Genie 4 simulates what happens next: how the world responds, how it sounds, and how the people in it move, react, and speak.

Understanding and simulating the world is a crucial aspect of building AGI. Genie 4 advances our ability to create safe, infinitely variable simulations that can help with everything from developing training environments for robots and agents to unlocking the creation of new interactive experiences.

We have started rolling Genie 4 out as a research preview for trusted testers — gathering feedback before we release it to consumers and developers, starting with Google AI Ultra subscribers in Project Genie and early access partners of the Gemini API and Google AI Studio. Join the waitlist for Genie 4 in Project Genie [here](https://forms.gle/WQnSNEM3omF7Uruu7).

Genie 4 delivers enhanced photorealism, fluid movement, and native audio. All accompanying sounds featured above are produced directly by Genie 4.

### Genie 4 advances four key capabilities

The following are recordings of real-time interactions from Genie 4, where users use standard keyboard controls for navigation and camera control, and text prompts to steer the scene as it evolves.

#### Shaping world simulation in real-time

With Genie 4, you can use natural language to modify a simulation in real-time — like changing the weather, moving the camera, or introducing a new person or object — and Gemini will contextually adapt your prompt to match the surrounding scene. Between your inputs, Gemini also monitors and steers the scene to keep the world progressing cohesively.

##### Turn on audio to hear Genie 4 worlds.

#### Pushing the frontier in realism for physics and human action

Genie 4 introduces a new standard of realism to real-time interactive simulation. Built on an advanced physical understanding of the world, Genie 4 simulates real-world physics scenarios, such as aerodynamics, collisions, and more.

The most dramatic leap is how Genie 4 simulates people, creating characters that move naturally, respond organically to their environments, and can be interactively steered in real-time.

#### Modeling how the world sounds

Genie 4 is our first real-time world model to generate audio natively. Every world carries the ambient sound of its own setting, from wind in the trees to waves crashing at the beach.

The true frontier, however, is human speech. Genie 4 introduces interactive dialogue that adapts on the fly. Characters converse and react to your inputs or events in the world, all in real-time.

#### Simulating complex events with Gemini models

Bringing Gemini and Genie 4 together adds a new layer of reasoning to world simulation, allowing us to model complex, multi-step events and test how AI systems navigate different environments before bringing them to the real world.

To achieve this in real-time, Gemini 3.8 Flash serves as a guiding agent in the loop: as Genie 4 generates a world in real-time, Gemini continuously observes the scene, breaks down goals into a sequence of steps, and reviews incoming frames to track the progress and verify that each step succeeded. As the world shifts or the user intervenes, Gemini adapts its plan in the moment, unlocking worlds with reliable causality, procedural behaviors, and multi-step reasoning.

As part of exploring this capability, we have also been experimenting with Gemini 4 Argon and Genie 4 to bring our frontier research together with [Gemini Robotics](https://deepmind.google/models/gemini-robotics/).

In the example below, Argon breaks down a user-instructed task into steps for Genie to render. These steps are interleaved as text captions to Genie 4 as the simulation is rendering. Because Genie 4 can be steered in real-time with text captions using Gemini, this now unlocks the path of adapting the simulation as it progresses towards the completion of that task. This capability becomes a path for simulating a breadth of scenarios in imagined worlds, using Gemini 4 Argon and Genie 4.

Gemini 4 Argon and Genie 4 work together to simulate Apptronik's Apollo humanoid playing a game of checkers, breaking the task down into real-time steps.

### Learnings from trusted testers

While Genie 4 is a major research milestone, it remains an early, experimental model. To understand how interactive world models can support real-world workflows—and where they still need to grow—we’ve been working with cohorts of trusted testers across creative industries, journalism, education, gaming, and engineering.

Testers highlighted how the leap in photorealism, native audio, and real-time steering allows ideas and concepts to be turned into realistic simulations, unlocking new abilities across disciplines:

- **Creative direction**: Creatives and technologists are testing Genie 4 as a rapid "draft mode" for pre-visualization and ideation. For example, filmmakers can step into a live simulation of a scene and run multiple "takes" in real-time, adjusting camera angles, lighting, dialogue, and action on the fly.
- **Historical scenarios & immersive photographs**: Photojournalists are exploring how a single 2D archival photograph can become a grounded simulation of that environment in seconds. Teams are testing how populated, dynamic worlds can help experience historical spaces or visualize how short-term environmental events, like a flash flood or wildfire, unfold.
- **Interactive experience concept design**: Game developers and creative technologists are testing Genie 4 to go from an initial idea to an explorable prototype in seconds, testing visual styles, material aesthetics, and interactive mechanics through natural language prompts before writing a single line of engine code.
- **Simulation**: Aside from our robotics research, enterprise partners across industries are evaluating Genie 4 as a tool for rapid "zero-to-one" scenario generation, and identifying gaps to further improve Genie to best fulfill that simulation need.

### Future Work: Towards hybrid world models

A promising path for future progress lies in hybrid world models, which combine the logical, structured reasoning of code and language models with the rich, sensory representation of pixel-level simulation.

Bringing Genie and Gemini models closer together is an early step in this direction. Gemini works behind the scenes to map the structure and plan the narrative timeline, while Genie generates the immediate physical reality—rendering how the world looks, sounds, and responds, pixel by pixel. Together, these complementary strengths can unlock a new class of world models that are far more coherent, controllable, and grounded than either approach could achieve alone.

### Building world models responsibly

Genie 4 marks a new area of frontier research that merges real-time generation and photorealism, introducing a new range of capabilities and dimensions that we want to roll out and explore in a responsible way. Genie 4 includes strict safety guardrails that are consistent with our safety policies across other models. Before launching this preview, we evaluated Genie 4 through internal rigorous safety evaluations to prevent the generation of harmful or malicious content. Also, we have intentionally deployed it first to trusted tester partners to get early feedback, before we release the model more broadly.

To maintain transparency, all video and audio generated by Genie 4 will include SynthID, our imperceptible digital watermarking technology that helps identify AI-generated content across visual and audio modalities.

### Understanding current limitations

Genie 4 remains an early, evolving area of research.

While it can maintain coherent environments over short sessions, visual details and object permanence can still shift or drift over time—especially as a simulation runs longer, after multiple complex prompt edits, or when navigating throughout the scene. Complex physical interactions, real-time audio accuracy, rendering legible text, spatial accuracy, and long-term consistency are active areas of ongoing research. We are sharing Genie 4 as a preview to learn alongside our community and safely advance the frontier of interactive simulation.

### Next steps for Genie 4

Genie 4 has been released as a research preview to trusted testers, and is coming soon to Google AI Ultra subscribers in Project Genie and early access partners in the Gemini API and Google AI Studio. Join the waitlist for Genie 4 in Project Genie [here](https://forms.gle/WQnSNEM3omF7Uruu7).

We’re excited for users to step inside, experiment, and build their own interactive worlds soon.

### Acknowledgements

Genie 4 was made possible by core contributions from Hang Qi, Diego Rivas, Aleksander Hołyński, Inbar Mosseri, Jack Parker-Holder, Shlomi Fruchter, Tejas Kulkarni, James Assiene, Philip Ball, Jakob Bauer, Eddie Cao, Lucy Chai, Harris Chan, Kleopatra Chatziprimou, Hao Chen, Yoni Choukroun, Mark Collier, Enric Corona, Kurtis David, Ariel Ephrat, Maxime Gazeau, Ruiqi Gao, Chelsee Glover-Odom, Liangke Gui, Swaroop Guntupalli, Shan Han, Tingbo Hou, Jiri Hron, Hui Huang, Drew A. Hudson, Zhouyuan Huo, Linyi Jin, Christos Kaplanis, Dhrupad Karwa, Eunyoung Kim, Congtao Kuang, Eliot Laidlaw, José Lezama, Hao Li, Shuang Li, Yuchen Liu, Hanzi Mao, Mark Matthews, Matt McGill, Kay McKinney, Ricardo Monti, Mark Murphy, Joseph Ortiz, Roni Paiss, Frank Perbet, Ben Poole, Tal Reiss, Konstantinos Rematas, Guy Scully, Jeremy Shar, Shashank Shastry, Sri S, Omer Tov, Ruben Villegas, Andrey Voynov, Hongjie Wang, Luyu Wang, Kaustubh Sridhar, Mo Samsami, Stephen Spencer, Yufei Wang, Will Whitney, Rundi Wu, Joyce (Jingjing) Xie, Jesse Yin, Shiran Zada, Serena Zhang, Xiaofan Zhang, Zhengqi Li, Zhixing Zhang, Yuan Zhong, Shuo-yiin Chang, Dmitry Lagun, Ronny Huang, Yao Su, Ankush Gupta, Genzhi Ye, Haolin Jia, Weiqin Wang, Xi Xiong, Salah Zaiem, Carol Zheng, .

Genie 4 also required close collaborations across partner teams, we thank all our cross-functional partners that made this launch possible: Dina Bashkirova, Emil Bergner, Greta Borisko, Irina Blok, Melissa Byun, Gabe Clapper, Viral Carpenter, Michael Y. Chang, Maximo Cudich-Sieburger, Chloe Doan, Alisa Fortin, Shivani Ghanta, Vikram Gopali, Ezra Gorman, Khyatti Gupta, Sam Hasinoff, Philipp Henzler, Hector Hinestroza, Ed Hirst, Tyler Holland, Kristian Holsheimer, Tiffany Hu, Kapil Joshi, Randeep Katari, Pavan Kumar, Vikhyat Kumeria, Sam Kvaalen, Matthew Levine, Yinxiao Li, Yuchi Liu, Miao Luo, Nick Matarese, Kangfu Mei, Signe Nørly, Moises Oliveira, Eric Paskie, Manika Puri, Susanna Ricco, Andrey Ryabtsev, Cai Schumann, Nicole Brichtova, Andy Sekyere, Grace Shih, Melissa Smith, Duncan Noble Smith, Kenda Stewart, Rod Strougo, Jenn Sturgeon, Amy Zeng, Gaby Pearl, Eleanor Tomlinson, Kenyon Watson, Inês Ayer, Luke Talbot, Han-Yun Tsao, Guillaume Vernade, Karen Wang, Changchang Wu, Ian Wilkinson, Weijuan Xi, Jennifer Yick, Yunhan Zhao, Eric Zhang, Jason Zhang, Annie Zhou, James Zhou, Chris Walker, Alan Yam, Alex Chen, Cliff Lungaretti, Dan Motzenbecker, Kaloyan Kolev, Matthew Carey, Nate Zucker, Sam Lawton, Shashwath Santosh, Suz Chambers.

Thanks to Raia Hadsell, Aäron van den Oord, Josh Woodward, Steve Seitz, Carlos Hernandez, Elias Roman, Jung E. Kim, Abhishek Bapna, Eli Collins, Tulsee Doshi, Carolina Parada, Jie Tan, Koray Kavukcuoglu and Demis Hassabis for their insightful guidance and support throughout the research process.

Lastly, we thank our trusted tester and early access users that have provided feedback to help guide our research forward.

↑ 正文结束
✓ 本篇全文免费开放

会员可复制、下载全文 Markdown，还能让你的 AI 订阅和提问。
[订年卡 $59/年](https://xiaohu.ai/buy/?plan=year)[看权益对比 →](https://xiaohu.ai/membership/)

[阅读原文 ↗](https://deepmind.google/blog/genie-4-a-new-generation-of-world-simulation/)

📮 新解读每晚进邮箱

读完觉得有用？留个邮箱，每晚一封当天的新解读，随时退订。
