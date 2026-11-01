---
title: "Grok Imagine 公开《奥德赛》短片制作教程：小团队怎样把 AI 镜头连成故事"
date: 2026-10-28T00:00:00.000Z
tags: ["实操", "Grok Imagine", "AI视频", "电影制作", "关键帧", "聚合"]
summary: "从角色三视图、雨田关键帧到剪辑成片，看懂小团队怎样控制 AI 视频的外观、构图与节奏，附三组完整中英提示词。"
---
> **原文链接**: [https://x.com/imagine/status/2115214583983935517](https://x.com/imagine/status/2115214583983935517)
> **来源**: x.com
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/grok-imagine-odyssey-film-workflow/) · 2026/10/28
> **说明**: 本文由 AIHot 自动聚合(原文即中文,未翻译)。正文取自小互 AI 解读

---

全文 Markdown · 会员

作者：Grok Imagine / Wonder Studios / Dev Walker10-28 · 约 12 分钟![](https://pic.xiaohu.ai/jiedu-media/grok-imagine-odyssey-film-workflow/social/zh-f9af55f6b66e.png)

Grok Imagine 公开了与 Wonder Studios 合作制作《奥德赛》系列短片的教程，由导演 Dev Walker 和团队讲解首集《誓言》（The Oath）的做法。参与这一系列的是 3—5 名创作者的小团队，他们把剧本、角色图、镜头生成和后期剪辑串成了一条制作链。

对想用 AI 做叙事短片的人，这套方法最有用的地方是：同一个人要在多个镜头里保持外观，动物要按剧情需要进入画面，生成的片段还要能剪在一起。角色参考图、静态关键帧和文字提示词分别负责不同的要求，创作者再从多次生成里挑选、检查和剪辑。

![教程封面：雾中船队，Grok Imagine与Wonder的Odyssey Prompting Guide](https://pic.xiaohu.ai/jiedu-media/grok-imagine-odyssey-film-workflow/HVq6G1ZW4AAAqvA.jpg)

Grok Imagine 与 Wonder Studios 公开的《奥德赛》短片制作教程。

### 先写故事，再决定观众每一镜看到什么

首集取材于失传史诗《库普利亚》（Cypria）留下的故事梗概：奥德修斯为了躲避特洛伊战争而装疯，最终被识破。具体对白与人物长相，则由团队重新创作。

剧本把故事落实成可制作的场景。例如海岸送别这一页，佩涅洛佩把一只粗糙雕刻的小木马放进奥德修斯手里，让他把它带回给孩子。道具、动作和对白在生成画面前就已有安排，后面的镜头需要把这个动作拍清楚。

![剧组剧本第3页：海岸送别与小木马道具](https://pic.xiaohu.ai/jiedu-media/grok-imagine-odyssey-film-workflow/HVoPGefXAAAlW7b.png)

团队创作的剧本页：天气、道具、人物动作和对白都有具体规定。

接着列镜头清单。每一镜写清景别、镜头、运镜、动作和准确对白。雨田段落中的四镜头设计很直观：先俯视躺在土里的婴儿，听到画外越来越近的重响；再贴近地面看牛马的蹄子；然后用宽一些的画面让观众看到动物与婴儿之间的逼近关系；最后跟拍奔跑的母亲。危险感随着观众获得的信息逐步建立。

![雨田序列四镜头清单：婴儿、兽蹄、危险逼近、母亲奔跑](https://pic.xiaohu.ai/jiedu-media/grok-imagine-odyssey-film-workflow/HVqWaY4WwAAqtpA.png)

同一场戏拆成四镜：先分别看到婴儿和兽蹄，再看清它们的空间关系。

这份清单也便于分工和归档。团队按场景建立文件夹，再区分主叙事镜头与辅助画面，例如 `SCENE1_FIELD_BROLL`。一个镜头会生成几十个候选版本，尽早命名才能在剪辑时找到要用的片段。

### 用三视角角色表，让不同镜头有同一份外观参照

一张好看的人像还不够拍完整场戏。人物转身后披风是什么样，换成全景时衣服和鞋子怎样搭配，都需要保持前后对应。

团队的角色设定表采用灰色背景，放三个视角：面部近景、全身正面和全身背面。近景提供五官、头发与胡须的参照；正面交代服装和配饰；背面补齐披风的垂落方式与发型。制作新镜头时，可以据此检查画面里的角色是否仍像同一个人。

![奥德修斯三套角色表，每套含面部近景、全身正面和背面](https://pic.xiaohu.ai/jiedu-media/grok-imagine-odyssey-film-workflow/HVqa6P2WsAE-y1x.jpg)

奥德修斯有三套角色表：年龄或服装变化时，团队建议另做一套参考。

角色提示词也写得具体。奥德修斯穿什么材质的衣服、披风怎样搭在肩上，甚至右肩黄金胸针上的猎犬与斑点幼鹿，都被列为需要保留的细节。这样的描述给出了检查服饰是否一致的对象。团队也提醒，有参考表仍会偶尔出现面部漂移，生成后要逐镜核对。

### 先把人物放进场景，把静止画面修好再让它动

首集规划了田野、宫殿、海岸、船和特洛伊城外营地五个地点。场景提示词写明景别、时段、氛围、摄影机、镜头和胶片风格，先确定这场戏的空间与观感。

![地点设定示例：绿叶大树、草地、远山与树前人物](https://pic.xiaohu.ai/jiedu-media/grok-imagine-odyssey-film-workflow/HVqcwBjWQAEPvUz.jpg)

地点设定示例：树木、地形、远山和光线共同构成可供人物进入的空间。

全片的观感从情绪板或风格参考图出发，再把摄影机、镜头和胶片描述写进每条提示词。团队参考的是 2000 年代初历史史诗片的视觉风格，没有在提示词里点名某位导演。提示词中的 35mm 胶片、复古球面镜头等描述，是想要的画面风格；实际导出规格要看工具中的设置。

![古船甲板视角：人物背影、船帆、海面与岸上建筑](https://pic.xiaohu.ai/jiedu-media/grok-imagine-odyssey-film-workflow/HVqdTPvXkAA_MW7.jpg)

船上镜头示例：角色、环境和色调需要在不同场景之间接得上。

有了角色表与地点图，再生成角色置身其中的静态关键帧。这里的“关键帧”，就是希望视频在某个时间点呈现的画面：谁站在哪里、穿什么、镜头从什么方向看。先把这些关系修到满意，再交给视频模型生成运动，可以避免把起始画面里已有的错误带入后续片段。

雨田配图展示了两种构图状态：左边已经安排好两名男子和地上的婴儿，右边加入牛马、木犁与奥德修斯。人物位置、远山和天气有了视觉参照，不必全靠一句“在雨里推犁”让模型自行补齐。

![雨田关键帧两帧对照：相同环境下，右图加入牛马与推犁者](https://pic.xiaohu.ai/jiedu-media/grok-imagine-odyssey-film-workflow/HVqeYReW0AAoboY.jpg)

两幅参考画面保留场景与站位，再改变牛马和推犁者是否出现在画面中。

### 中间关键帧，再规定“途中什么时候到达这幅构图”

只给开始和结束的图片，途中怎样过渡、何时出现某种构图，仍有没有说清的部分。Grok Imagine 可以在首尾帧之间加入中间关键帧，并指定它出现的时间。团队用它安排奥德修斯推犁入画的节奏。

教程界面中的图片用途菜单勾选了 `Intermediate frame`，时间设为 `3.0s`。所选画面里已经能看到牛马和推犁者；它给模型的要求是，希望到第 3 秒时接近这幅构图。首帧交代开始的样子，中间帧给途中增加一个目标，尾帧规定结束的样子。

![Grok Imagine 图片用途菜单，中间关键帧显示3.0秒](https://pic.xiaohu.ai/jiedu-media/grok-imagine-odyssey-film-workflow/HVqsq28WkAAMooT.jpg)

截图把中间帧设在 3 秒，参数栏显示 6 秒长度。这是该次示范的安排，其他项目可按镜头需要调整。

时间点是生成指导，不能据此认定每一帧都会精确服从。仍要看牛马是否在希望的时刻到位、过渡是否自然、木犁是否一直连着动物，以及奥德修斯的手有没有离开犁把。关键帧能补充时间与构图要求，结果需要重新检查。

把构图放到时间轴上

#### 同一张中间参考图，放在第几秒？

首尾图规定开始和结束的样子；中间图再指定途中希望到达的构图。这里沿用教程截图的 6 秒长度、3 秒中间帧作为教学起点，拖动只改变输入安排，不播放或预测生成结果。

起始 · 0 秒

按起始参考图建立雨田构图。

中间 · 3 秒

希望到达所选参考图：牛马与推犁者已在画面中。

结束 · 6 秒

按结束参考图，让全部人物与动物完整可见。

0 秒6 秒
中间参考图的指定时间 3 秒

从起始图到中间图留 3 秒，从中间图到结束图留 3 秒。

移动时间点改变的是给模型的要求。实际是否按时接近参考构图、牛马与木犁是否连贯，仍要看生成结果；这条时间轴不代表原片的逐秒动作。

教程的长提示词还引用了三张连续参考图，要求固定机位、单镜头到底、牛马从右向左走。它和前面的四镜头清单是两种不同的镜头示例：前者在同一画面里安排人物动作，后者通过切镜逐步揭示危险。不能把长提示词当作一次生成四个分镜的指令。

### 提示词分七块，失败时先检查核心要求

雨田长提示词分成七块，各自回答不同问题：

- 机位与风格：从哪里看，镜头能不能移动，想要什么画面质感。
- 主体动作：谁从右侧进入、往哪走，牛马和推犁者怎样配合。
- 环境：雨、风、远山和前景植物怎样表现。
- 物理细节：蹄子踩泥、木犁连接、衣物受风等接触与运动关系。
- 音频：保留自然声，不要音乐和对白。
- 音效：雨打水洼、湿布拍动、挽具摩擦等具体声音。
- 限制：不切镜、不摇移、棕牛靠近镜头、黑马在较远一侧等需保持的条件。

分块让创作者容易核对遗漏，也方便定位哪类要求没有实现。长提示词提供了这个镜头的完整意图；教程同时建议，生成失败时先把提示词缩短，增加细节通常不能直接解决问题。

实际排查可以从出错的关系开始。例如牛马位置颠倒，就先核对参考图与文字中的远近关系；机位自己动了，就检查固定机位的要求。暂时减少不影响当前问题的修饰，再生成一版比较。这是依据教程建议整理的尝试方法，不能保证删到某个长度就会成功。

机位本身也参与叙事。团队用固定镜头交代场景，进入战斗时换成手持风格。手持提示词具体写出晃动、地平线倾斜和对焦变化，并要求实时速度、不要慢动作；这些描述比只写“紧张的打斗”更明确地交代了拍摄观感。

### 把候选摆在一起，最后用剪辑把故事接起来

多次生成之后，挑选工作和生成同样重要。团队把每帧、提示词和候选片段放在 Grok Imagine 的同一画布上，按镜头分组，再并排比较。一段画面单独看可能不错，接上前后镜头后，还要检查人物的脸、服装和光照是否连贯。

团队自报，剪辑、声音和调色用了约 18 小时。这只说明后期这几项工作的用时，不能当作整部片子的总制作时间。大部分音效来自 Grok Imagine，团队另外加入音乐和调色，完成影片的节奏与整体观感。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/grok-imagine-odyssey-film-workflow/episode-1-the-oath-616714af306be32a.mp4)

首集《誓言》官方正片，约 7 分 12 秒。每集约 5 分钟是最初规划，和已发布首集的实际长度不同。

第一次尝试可以先完成一个短镜头：写清动作与机位，准备角色表和场景，修好静态画面，再安排所需关键帧与提示词。生成后检查外观、空间关系、动作和声音，把可用版本归档，再进入剪辑。这样可以先走通从参考到片段的完整过程，再扩展成多场戏。

### 三组完整提示词：中文或英文任选一种发送

为方便创作者在实际项目中对照参考或在支持的工具中测试，下文忠实收录教程公开的三套核心提示词。英文为官方原件，中文为完整对译。中文和英文任选一种发送。角色表提示词用于先生成静态参考；视频提示词需先准备并绑定对应参考图。本次取得的雨田两帧图不足以重现长提示词的全部三图输入，复用时请先准备自己的起始、中间和结束画面。

#### 1. 奥德修斯角色基准表提示词

- **用途**：生成 16:9 画幅的三联中灰背景角色设定图，提供面部、服饰材质与胸针细节参照。
- **发送建议**：中文或英文任选一种发送；不可用于直接生成视频，属于第一阶段的静态基准资产。

点击展开：角色基准表完整提示词（英文原件与中文对照）

##### 英文原件（逐字保留）

```text
An ultra-photorealistic cinematic character reference sheet for ODYSSEUS, King of Ithaca, ancient Mycenaean Greece circa 1200 BCE.

CHARACTER: Rugged Greek man, late 30s to early 40s, olive skin, strong Mediterranean features, deep-set brown eyes, prominent nose, shoulder-length wavy black hair, thick full black beard. Lean, muscular build. Weathered, intelligent face with a serious, commanding expression.

COSTUME: Dark brown knee-length wool tunic with subtle embroidered trim, weathered dark leather scale armor, leather belt, forearm bracers, wrapped leather boots, and a short bronze sword in a leather scabbard. A heavy charcoal-brown wool cloak draped asymmetrically over his shoulders, fastened with an ornate golden brooch depicting a hunting dog gripping a spotted fawn in its forepaws, the fawn struggling to escape, intricately sculpted in raised gold. The brooch is prominently visible on his right shoulder. Authentic handmade materials, worn leather, heavy textured wool, aged bronze.

LAYOUT: Single wide 16:9 image divided into THREE VERTICAL PANELS with thin white dividing lines.
LEFT: Large three-quarter facial close-up, looking slightly toward frame right. Detailed facial features, hair, beard, cloak, and gold fawn brooch.
CENTER: Full-body FRONT VIEW, standing naturally with arms relaxed, entire costume visible from head to boots.
RIGHT: Full-body BACK VIEW, showing the cloak's full drape, hairstyle, and footwear.
All three panels must depict the EXACT SAME MAN wearing the EXACT SAME COSTUME, with identical proportions, materials, and accessories.

PHOTOGRAPHY: Professional Hollywood costume reference photography. Neutral medium-gray seamless studio background, soft diffused studio lighting, natural skin texture, realistic fabric and leather detail, subtle film grain. Grounded historical realism, not fantasy.

STRICTLY PHOTOREALISTIC. No illustrations, no CGI appearance, no text, no labels, no additional characters.
```

##### 中文译文

```text
一张极其写实的电影级角色参考基准表，用于伊萨卡国王奥德修斯，公元前约 1200 年古迈锡尼希腊时期。

【角色】：饱经风霜的希腊男性，三十多岁后段至四十岁出头，橄榄色皮肤，强烈的地中海五官特征，深邃的褐色眼睛，轮廓分明的挺拔鼻梁，齐肩微卷黑发，浓密茂密的黑胡须。体态精悍精壮。一张带有岁月磨砺感、充满智慧的面庞，神情严肃而威严。

【服装】：深棕色齐膝羊毛长袍，带有内敛的刺绣饰边；做旧深色皮革鳞甲；皮质腰带、前臂护腕、裹带皮靴；皮鞘内插一把短青铜剑。一件厚重的炭棕色羊毛斗篷不对称地搭在肩头，由一枚精致华丽的黄金胸针固定——胸针由浮雕黄金精雕细琢而成，雕刻着一只猎犬用前爪死死按住一只正在挣扎逃脱的斑点幼鹿。该胸针醒目地显露于其右肩。所有用料需体现真实手工质感：磨损皮革、厚实质感羊毛、带有包浆的青铜。

【版面】：单张 16:9 宽画幅画面，由细白分割线划分为三个垂直画幅。
左侧：大幅 3/4 侧面面部特写，视线微朝画框右侧。细致呈现面部特征、发丝、胡须、斗篷以及黄金幼鹿胸针。
中间：全身正面视图，双臂自然放松垂落站立，从头至靴全身服装完整可见。
右侧：全身背面视图，完整展示斗篷垂坠走势、后发型及足部鞋履。
三个画幅中必须呈现完全相同的男子、身着完全相同的服装，保持毫无二致的体型比例、材质与配饰细节。

【摄影风格】：专业好莱坞服装设计参考摄影。中性纯中灰无缝影棚背景，柔和漫射影棚光照，真实皮肤肌理，极其逼真的面料与皮革细节，细腻微胶片颗粒。扎根于历史现实主义，非奇幻风格。

【硬性限制】：严格写实照片级质感。严禁插画、严禁 CGI 质感、严禁出现任何文字、标签或多余角色。
```

---

#### 2. 开场推犁极远景七块长提示词

- **用途**：描述雨田开场的极远景固定长镜头。原文要求 3 张连续参考图；复用时可按起始、途中、结束的关系准备并绑定。
- **发送建议**：中文或英文任选一种发送；先准备自己的 3 张参考图，再核对 Image 1、Image 2、Image 3 分别指向哪张图。

点击展开：开场推犁七块完整提示词（英文原件与中文对照）

##### 英文原件（逐字保留）

```text
[Camera & Style]
Photorealistic 2000s historical epic, ancient Aegean world circa 1200 BCE. Shot on 35mm film with vintage spherical lenses. Naturalistic 24fps motion, subtle film grain. MASTERFUL CINEMATOGRAPHY.
ONE CONTINUOUS SHOT. Use the three reference images as sequential visual guides for the action. Preserve the EXACT camera composition, perspective, landscape, lighting, and character appearances.
EXTREME WIDE SIDE PROFILE. Completely STATIC, LOCKED-OFF CAMERA. No camera movement throughout the shot.

[Subject Motion / Action]
The shot begins matching IMAGE 1.
FRAME LEFT: Menelaus and Palamedes stand together in the muddy field, watching toward FRAME RIGHT. Their bodies remain mostly still as strong gusts of wind blow their heavy cloaks.
CENTER: Infant Telemachus lies on a cream linen blanket directly on the flat muddy ground, surrounded by shallow puddles.
FRAME RIGHT: The black horse and brown ox gradually enter from OFFSCREEN RIGHT, walking toward FRAME LEFT.
The BROWN OX is closest to camera, with the BLACK HORSE walking alongside it on the far side.
Their movement progresses naturally through the composition shown in IMAGE 2.
Odysseus follows behind the animals, gripping BOTH wooden handles of the primitive plough.
By the end of the shot, the composition matches IMAGE 3, with Odysseus, the plough, and both animals fully visible.
The animals continue walking slowly toward FRAME LEFT, pulling the plough through the thick mud.
Palamedes and Menelaus remain standing together, watching their approach.

[Environment & Atmosphere]
Heavy rain falls continuously across the vast, desolate agricultural field.
Strong, irregular gusts of wind sweep across the landscape.
CRITICAL: THE WIND VISIBLY BLOWS THE MEN’S CLOAKS.
Menelaus’ dark red cloak billows and flutters in the wind. Palamedes’ dark brown cloak moves naturally around his body.
Odysseus’ dark cloak also blows and ripples as he walks behind the plough.
CRITICAL: THE PLANTS AND TALL GRASS IN THE EXTREME FOREGROUND SWAY AND WHIP NATURALLY IN THE WIND.
The blurred foreground vegetation bends under stronger gusts, then partially returns upright. Individual stems and leaves move independently.
Rain falls diagonally during stronger gusts.
Dark storm clouds hang over the distant mountains. Atmospheric mist softens the horizon.

[Physics & Details]
Realistic animal walking mechanics and weight distribution.
The brown ox and black horse move together at a steady pace, their hooves sinking into the saturated soil.
Mud compresses beneath their weight. Small splashes and displaced water accompany each step.
The wooden plough remains physically connected to both animals and cuts through the muddy earth.
Odysseus maintains a firm grip on both handles while walking behind it.
Clothing responds realistically to changing wind intensity. Heavy, rain-soaked wool moves with believable weight and resistance.
Foreground plants react continuously to the wind, with occasional stronger gusts producing more pronounced movement.
Rain creates visible ripples across puddles and runs naturally over the muddy furrows.

[Audio]
NO MUSIC. NATURAL SOUND ONLY. NO DIALOGUE.
Heavy rainfall, gusting wind, distant thunder, animal breathing, hooves squelching through mud, wooden plough creaking, and wet footsteps.

[SFX]
Wind rushing through foreground vegetation, rain striking puddles, wet fabric flapping during stronger gusts, subtle harness creaking, and mud displacement beneath the animals’ hooves.

[Restrictions / Constraints]
ONE CONTINUOUS SHOT. NO CUTS.
IMAGE 1 IS THE EXACT STARTING COMPOSITION.
IMAGE 2 ESTABLISHES THE ANIMALS ENTERING FRAME.
IMAGE 3 IS THE EXACT ENDING COMPOSITION.
STATIC LOCKED-OFF CAMERA THROUGHOUT.
NO PAN, TILT, ZOOM, DOLLY, TRACKING, OR CAMERA SHAKE.
PRESERVE THE EXACT LANDSCAPE AND FRAMING.
MENELAUS AND PALAMEDES REMAIN FRAME LEFT.
TELEMACHUS REMAINS CENTER.
ODYSSEUS AND ANIMALS ENTER FROM FRAME RIGHT.
THE BROWN OX MUST BE CLOSEST TO CAMERA.
THE BLACK HORSE MUST BE FARTHER FROM CAMERA.
ODYSSEUS ALWAYS WALKS BEHIND THE PLOUGH HOLDING BOTH HANDLES.
THE ANIMALS MUST WALK TOWARD FRAME LEFT.
ALL CHARACTERS AND ANIMALS MUST BE FULLY VISIBLE BY THE FINAL FRAME.
HEAVY RAIN THROUGHOUT.
STRONG WIND MUST VISIBLY MOVE THE MEN’S CLOAKS.
FOREGROUND PLANTS MUST SWAY AND BEND IN THE WIND THROUGHOUT THE SHOT.
REALISTIC WIND AND FABRIC PHYSICS.
```

##### 中文译文

```text
【摄影机与风格】
逼真写实的 2000 年代历史史诗电影质感，公元前约 1200 年的古代爱琴海世界。以 35mm 胶片及复古球面镜头拍摄。自然的 24 帧动态感，细腻胶片颗粒。大师级摄影构图。
单一连续长镜头。使用所提供的三张参考图像作为动作的连续视觉基准。绝对保持原始相机的构图、透视、地貌、光线以及人物外观。
极远景侧身构图。彻底固定锁死机位。全镜头严禁任何摄影机运动。

【主体动作】
镜头起始构图完全对齐 IMAGE 1。
画框左侧：梅内劳斯与帕拉墨得斯并肩立于泥泞田野中，朝画框右侧注视。伴随阵阵狂风吹打沉重披风，其躯体基本保持静止。
画框中央：幼年忒勒玛科斯躺在平整泥地的一块米白色亚麻毯上，四周环绕着浅水洼。
画框右侧：黑马与棕牛从画外右侧逐渐踱入，朝画框左侧行进。
棕牛距离镜头最近，黑马在较远一侧与其并排走动。
它们的行进走位自然过渡到 IMAGE 2 所展示的构图。
奥德修斯紧跟牲畜之后，双手死死握住简易木犁的两侧手柄。
镜头结束时，整体构图与 IMAGE 3 完全对齐，奥德修斯、木犁及两头牲畜完整显露。
牲畜继续平缓向画框左侧走去，拉动木犁破开厚重泥泞。
帕拉墨得斯与梅内劳斯保持并肩伫立，注视着他们的逼近。

【环境与氛围】
倾盆大雨持续笼罩广袤苍凉的农田。
强劲而不规则的狂风横扫地表。
【极为关键】：强风必须清晰吹动男人们的斗篷。
梅内劳斯的暗红斗篷迎风鼓胀翻飞；帕拉墨得斯的深棕斗篷围绕躯体自然摆动。
奥德修斯走在犁后时，其深色斗篷同样被风吹拂翻起波澜。
【极为关键】：极前景的植被与高草必须在狂风中自然摇摆抽打。
前景虚焦的植物在强风吹袭下弯折，随后部分弹回直立。每根茎叶独立摆动。
阵风加剧时雨滴呈对角斜落。
远山上空压着低沉雷雨云，地平线被水汽薄雾软化。

【物理规律与细节】
逼真的动物行进动力学与重量分布。
棕牛与黑马以稳健节奏协同移动，蹄足深深陷入饱水土壤。
泥土在其重压下挤压形变，每一步都伴随细微泥水飞溅。
木犁与两头牲畜保持物理连接，切开泥泞泥土。
奥德修斯走在后方时始终牢牢控制双把。
衣物真实响应风力强弱变化，吸饱雨水的沉重羊毛面料呈现可信的垂坠与抗力。
前景植物持续对风力作出反应，强阵风引发更大幅度的摆幅。
雨水在水洼表面激起清晰涟漪，顺着泥泞犁沟自然流淌。

【音频】
严禁音乐。仅保留自然原声。无对白。
暴雨声、呼啸风声、远方闷雷、动物喘息、蹄足踩入泥沼的黏稠声、木犁摩擦吱呀声以及湿漉漉的脚步声。

【音效】
狂风席卷前景植被声、雨水敲击水洼声、湿透布料在强风中的拍打声、皮革挽具的轻微挤压声、动物蹄下泥土被挤开的声音。

【硬性限制 / 约束】
单一连续长镜头。严禁切镜。
IMAGE 1 为绝对起始构图。
IMAGE 2 确立动物踏入画框的位置。
IMAGE 3 为绝对结束构图。
全程固定锁死摄影机。
严禁横摇、俯仰、变焦、推拉、跟拍或任何机位晃动。
严格保留原始地形与画幅构图。
梅内劳斯与帕拉墨得斯始终居于画框左侧。
忒勒玛科斯始终居于中央。
奥德修斯与牲畜自右侧画外走入。
棕牛必须最靠近镜头。
黑马必须处于较远侧。
奥德修斯必须始终走在木犁之后且双手握把。
牲畜必须朝着画框左侧行进。
至最终帧时全部人物与动物必须完整可见。
全程保持暴雨。
强风必须清晰吹动男人们的斗篷。
前景植物必须全程在风中摇摆弯折。
符合现实的风力与织物物理响应。
```

---

#### 3. 手持混乱战斗机位提示词

- **用途**：当故事从平静叙事转向贴身搏杀时使用，通过剧烈晃动、失焦拉扯与视平线倾斜营造窒息临场感。
- **发送建议**：中文或英文任选一种发送；先写好自己的战斗人物、场景与动作，再把这段机位描述加入视频提示词；它只规定镜头怎样运动。使用参考图生成时，还要准备对应画面。

点击展开：手持战斗机位提示词（英文原件与中文对照）

##### 英文原件（逐字保留）

```text
Unstabilized handheld combat camera POV, violent jagged shake, the camera swinging, rolling and tilting wildly, the horizon tipping off-level with every stride, hard vertical bounces, sudden sideways whips, lurching drops and jolts, focus hunting and snapping, the frame barely holding the chaos. Chaotic, never aligned, never smooth, like a camera held by someone crouching inside a shadowed threshold tracking urgent movement. Fast, urgent, real-time speed, no slow motion.
```

##### 中文译文

```text
无防抖手持战斗摄影机视角，极其剧烈参差的晃动；摄影机狂乱地摆荡、滚转与倾斜；随着每一次大步踏出，地平线瞬间剧烈失衡倾倒；生硬剧烈的垂直颠簸、骤然的侧向横甩、失重般的下沉与剧震；对焦反复拉扯拉风箱后瞬间咬合；画框边缘几乎快要兜不住画内的狂暴混乱。彻底混乱失序，绝不居中对齐，绝无丝滑稳定感；宛如一个人正蹲伏在阴暗门槛内部、死死追踪前方紧急战局运动所手持拍摄的机位。高速、紧急、纯真实时速率，严禁慢动作。
```

来源Inside Episode 1: The OathGrok Imagine / Wonder Studios / Dev Walker·[查看主材料](https://x.com/imagine/status/2115214583983935517)延伸[Episode 1: The Oath 官方正片](https://x.com/imagine/status/2113712964419063911)
PRODUCTION WORKFLOW · GROK IMAGINE X WONDER STUDIOS

## Grok Imagine《奥德赛》制作链：先定外观与构图，再生成、挑选和剪辑

Grok Imagine 与 Wonder Studios 公开《奥德赛》首集《誓言》的教程：小团队用参考图和文字安排外观、构图与节奏，再挑选、剪辑。
故事分镜 → 角色与场景 → 静态关键帧 → 时间目标与提示词 → 候选筛选、剪辑

3—5人参与该系列的创作者团队规模
3.0s6 秒示范中的中间帧设置
约18小时团队自报的剪辑、声音与调色用时

### 一、先决定每一镜让观众看到什么

剧本先规定小木马交接等动作，镜头清单再写清景别、运镜、动作与对白。

雨田四镜依次给观众看婴儿、兽蹄、逼近关系与奔跑的母亲，逐步建立危险感。按场景归档，便于找回每镜几十个候选。

### 二、角色表提供跨镜头的外观参照

面部照片看不到转身后的披风。团队用一张灰底图放面部近景、全身正面、全身背面。

近景核对脸，正面核对服饰，背面核对披风与发型。

**生成后仍要核对：**有参考表仍可能面部漂移；换年龄或服装时，团队建议另做一套。

### 三、修好人物与场景的静态关系，再让它动

地点图结合角色表生成静态关键帧，确定谁站哪里、穿什么、从哪看。35mm 胶片描述是风格，导出规格另看设置。

雨田两图保留站位、远山与天气，改变牛马和推犁者是否入画。先修好静态关系，可避免起始图错误带入视频。

### 四、中间关键帧：途中何时接近这幅构图

首尾图交代两端，中间图与时间再为途中补一个构图目标。

这里是固定机位的单长镜头，和前面的四镜头剪辑是两种示例。

FRAME TIMING · 中间构图目标
希望第 3 秒时，牛马与推犁者已在画面中
教程将 Intermediate frame 设为 3.0s，长度 6 秒。下图示意输入安排，不代表原片逐秒动作或精确服从。

0.0s · 起始帧 (IMAGE 1)规定开始的样子雨田中的两名男子与婴儿。
3.0s · 中间关键帧 (IMAGE 2)给途中增加构图目标参考图已含牛马与推犁者，希望此时接近它。
6.0s · 结束帧 (IMAGE 3)规定结束的样子要求人物、动物完整可见，并向左行进。

只给首尾图

两端有参照，途中何时到位还未说清。

再指定中间图与时间

补充途中目标；仍需检查入画时机、过渡、木犁连接与握把。

**复用输入：**长提示词需要 Image 1/2/3 三张图；文章两帧不足复现。自备起始、中间、结束图，核对编号与绑定。

### 五、七块便于核对，出错先减少无关修饰

雨田长提示词分七块，各管一类要求：

1. 机位与风格

极远景、固定机位与胶片观感。

2. 主体动作

从右进入、向左行进、双手握犁把。

3. 环境

雨、风、远山与前景植物。

4. 物理细节

蹄子踩泥、木犁连接、衣物受风。

5. 音频

自然声，不要音乐与对白。

6. 音效

雨打水洼、湿布拍动、挽具摩擦。

7. 限制

不切镜、不摇移；牛近、马远。

教程建议失败时先缩短，增加细节通常不能直接解决问题。牛马颠倒就查图文远近；机位乱动就查固定要求。减少无关修饰，再生成比较，是尝试方法而非成功保证。

**机位也参与叙事：**固定镜头交代场景，战斗用手持晃动、倾斜与对焦变化；实时速度，不要慢动作。

### 六、并排筛选，再剪成故事

参考帧、提示词与候选片段按镜头分组，在同一画布并排比较。接上前后镜头，还要检查脸、服装、光照。

团队自报剪辑、声音与调色约 18 小时，并非总制作时间。大部分音效来自 Grok Imagine，后期另加音乐与调色。

**先走通一个短镜头：**动作与机位 → 角色/场景 → 静态画面 → 所需关键帧与文字 → 生成检查、归档 → 剪辑，再扩展多场戏。

原文版权归原作者，这里只供对照阅读。 [看原网页 ↗](https://x.com/imagine/status/2115214583983935517)

## Inside Episode 1: The Oath

![](https://pbs.twimg.com/media/HVq6G1ZW4AAAqvA.jpg)

We're sharing our workflows, from script to final edit, so you can learn alongside us and use these techniques in your own creative projects.

Recently, we’ve partnered with Wonder Studios on a series of short episodes drawn from *The Odyssey* and the wider Epic Cycle.

**Our goal is simple: get honest, critical feedback from filmmakers and use it to improve Grok Imagine’s image and video models.**

We’re building these episodes in public with a small crew of **3-5 creatives**. **The quick turnaround on each episode lets us improve quickly and share what we learn with anyone curious about using AI in their creative work.**

Below, director **Dev Walker** and the **Wonder Studios** team share their tips on using Grok Imagine in making [Episode 1: The Oath](https://x.com/imagine/status/2113712964419063911?a=y38xs7DeQj1T-110TO8&s=20).

---

### Write Your Script

[Episode 1](https://x.com/imagine/status/2113712964419063911?a=y38xs7DeQj1T-110TO8&s=20) adapts a scene from the *Cypria*, the lost prequel to the *Iliad*. All that remains is a brief summary of the story: Odysseus fakes madness to escape the Trojan War, and is found out. We had to imagine everything else, from the dialogue to the characters’ faces.

Because the episodes live on social media, we originally planned to keep them to about 5 minutes each. We’re giving upcoming episodes even more runtime to allow the story and the characters to develop, though the episodes will still be short.

![](https://pbs.twimg.com/media/HVoPGefXAAAlW7b.png)

---

### List Every Shot

Before you generate anything, write a **shot list.**

For every shot, note the **shot size, lens, camera movement, action and the exact dialogue.** The more specific you are, the more consistent your results will be.

Keep your files organized from the start. **Name folders by scene, then by A-roll or B-roll, for example SCENE1_FIELD_BROLL.** Once you’re generating dozens of takes per shot, this makes it far easier to find the right clip when you’re editing.

![](https://pbs.twimg.com/media/HVqWaY4WwAAqtpA.png)

---

### Use the Canvas on Grok Imagine

Put everything on one canvas. Every frame, prompt and take lives there, grouped by shot. Lay takes side by side to pick the best one and check continuity across a scene: faces, wardrobe, lighting.

---

### Make Your Character Sheet

Keep it simple. A close-up, a full front and a full back, on plain grey.

If the character ages or changes costume, make a new sheet.

For example, Odysseus has three.

![](https://pbs.twimg.com/media/HVqa6P2WsAE-y1x.jpg)

---

### Build Your Character Prompt

The character prompt helps keep their face the same in every shot. You'll still see the occasional face drift, but here is an example of the prompt we used for Odysseus.

> An ultra-photorealistic cinematic character reference sheet for ODYSSEUS, King of Ithaca, ancient Mycenaean Greece circa 1200 BCE.

> CHARACTER: Rugged Greek man, late 30s to early 40s, olive skin, strong Mediterranean features, deep-set brown eyes, prominent nose, shoulder-length wavy black hair, thick full black beard. Lean, muscular build. Weathered, intelligent face with a serious, commanding expression.

> COSTUME: Dark brown knee-length wool tunic with subtle embroidered trim, weathered dark leather scale armor, leather belt, forearm bracers, wrapped leather boots, and a short bronze sword in a leather scabbard. A heavy charcoal-brown wool cloak draped asymmetrically over his shoulders, fastened with an ornate golden brooch depicting a hunting dog gripping a spotted fawn in its forepaws, the fawn struggling to escape, intricately sculpted in raised gold. The brooch is prominently visible on his right shoulder. Authentic handmade materials, worn leather, heavy textured wool, aged bronze.

> LAYOUT: Single wide 16:9 image divided into THREE VERTICAL PANELS with thin white dividing lines. LEFT: Large three-quarter facial close-up, looking slightly toward frame right. Detailed facial features, hair, beard, cloak, and gold fawn brooch. CENTER: Full-body FRONT VIEW, standing naturally with arms relaxed, entire costume visible from head to boots. RIGHT: Full-body BACK VIEW, showing the cloak's full drape, hairstyle, and footwear. All three panels must depict the EXACT SAME MAN wearing the EXACT SAME COSTUME, with identical proportions, materials, and accessories.

> PHOTOGRAPHY: Professional Hollywood costume reference photography. Neutral medium-gray seamless studio background, soft diffused studio lighting, natural skin texture, realistic fabric and leather detail, subtle film grain. Grounded historical realism, not fantasy.

> STRICTLY PHOTOREALISTIC. No illustrations, no CGI appearance, no text, no labels, no additional characters.

---

### Build Your Locations

[Episode 1](https://x.com/imagine/status/2113712964419063911?a=uhMTbtgFS_1kEMwg7PY&s=20) has five locations:

- the field
- the palace
- the shore
- the ship
- the camp outside of Troy

Every prompt names the shot size, time of day, mood, camera, lens and film stock.

![](https://pbs.twimg.com/media/HVqcwBjWQAEPvUz.jpg)

---

### Keep One Look Across All Shots

Start from a mood board or a style reference image, then name the camera, lens and film stock in every prompt.

We did not name any director when prompting; rather, the look came from early-2000s period epics.

![](https://pbs.twimg.com/media/HVqdTPvXkAA_MW7.jpg)

---

### Build Your Keyframes

Put the character from your sheet into each relevant location to get the keyframes you'll animate. If the still frame isn't right, your animated video won't be right either. We recommend spending time on making sure that your keyframe shots are great before moving on to animating.

![](https://pbs.twimg.com/media/HVqeYReW0AAoboY.jpg)

---

### Write Your Video Prompts in Blocks

Use 7 blocks:

- camera
- action
- environment
- physics
- audio
- SFX
- constraints

**If a prompt fails, make it shorter. More detail rarely fixes the issue.**

Here's the full prompt for our opening shot.

> [Camera & Style] Photorealistic 2000s historical epic, ancient Aegean world circa 1200 BCE. Shot on 35mm film with vintage spherical lenses. Naturalistic 24fps motion, subtle film grain. MASTERFUL CINEMATOGRAPHY. ONE CONTINUOUS SHOT. Use the three reference images as sequential visual guides for the action. Preserve the EXACT camera composition, perspective, landscape, lighting, and character appearances. EXTREME WIDE SIDE PROFILE. Completely STATIC, LOCKED-OFF CAMERA. No camera movement throughout the shot. [Subject Motion / Action] The shot begins matching IMAGE 1. FRAME LEFT: Menelaus and Palamedes stand together in the muddy field, watching toward FRAME RIGHT. Their bodies remain mostly still as strong gusts of wind blow their heavy cloaks. CENTER: Infant Telemachus lies on a cream linen blanket directly on the flat muddy ground, surrounded by shallow puddles. FRAME RIGHT: The black horse and brown ox gradually enter from OFFSCREEN RIGHT, walking toward FRAME LEFT. The BROWN OX is closest to camera, with the BLACK HORSE walking alongside it on the far side. Their movement progresses naturally through the composition shown in IMAGE 2. Odysseus follows behind the animals, gripping BOTH wooden handles of the primitive plough. By the end of the shot, the composition matches IMAGE 3, with Odysseus, the plough, and both animals fully visible. The animals continue walking slowly toward FRAME LEFT, pulling the plough through the thick mud. Palamedes and Menelaus remain standing together, watching their approach. [Environment & Atmosphere] Heavy rain falls continuously across the vast, desolate agricultural field. Strong, irregular gusts of wind sweep across the landscape. CRITICAL: THE WIND VISIBLY BLOWS THE MEN’S CLOAKS. Menelaus’ dark red cloak billows and flutters in the wind. Palamedes’ dark brown cloak moves naturally around his body. Odysseus’ dark cloak also blows and ripples as he walks behind the plough. CRITICAL: THE PLANTS AND TALL GRASS IN THE EXTREME FOREGROUND SWAY AND WHIP NATURALLY IN THE WIND. The blurred foreground vegetation bends under stronger gusts, then partially returns upright. Individual stems and leaves move independently. Rain falls diagonally during stronger gusts. Dark storm clouds hang over the distant mountains. Atmospheric mist softens the horizon. [Physics & Details] Realistic animal walking mechanics and weight distribution. The brown ox and black horse move together at a steady pace, their hooves sinking into the saturated soil. Mud compresses beneath their weight. Small splashes and displaced water accompany each step. The wooden plough remains physically connected to both animals and cuts through the muddy earth. Odysseus maintains a firm grip on both handles while walking behind it. Clothing responds realistically to changing wind intensity. Heavy, rain-soaked wool moves with believable weight and resistance. Foreground plants react continuously to the wind, with occasional stronger gusts producing more pronounced movement. Rain creates visible ripples across puddles and runs naturally over the muddy furrows. [Audio] NO MUSIC. NATURAL SOUND ONLY. NO DIALOGUE. Heavy rainfall, gusting wind, distant thunder, animal breathing, hooves squelching through mud, wooden plough creaking, and wet footsteps. [SFX] Wind rushing through foreground vegetation, rain striking puddles, wet fabric flapping during stronger gusts, subtle harness creaking, and mud displacement beneath the animals’ hooves. [Restrictions / Constraints] ONE CONTINUOUS SHOT. NO CUTS. IMAGE 1 IS THE EXACT STARTING COMPOSITION. IMAGE 2 ESTABLISHES THE ANIMALS ENTERING FRAME. IMAGE 3 IS THE EXACT ENDING COMPOSITION. STATIC LOCKED-OFF CAMERA THROUGHOUT. NO PAN, TILT, ZOOM, DOLLY, TRACKING, OR CAMERA SHAKE. PRESERVE THE EXACT LANDSCAPE AND FRAMING. MENELAUS AND PALAMEDES REMAIN FRAME LEFT. TELEMACHUS REMAINS CENTER. ODYSSEUS AND ANIMALS ENTER FROM FRAME RIGHT. THE BROWN OX MUST BE CLOSEST TO CAMERA. THE BLACK HORSE MUST BE FARTHER FROM CAMERA. ODYSSEUS ALWAYS WALKS BEHIND THE PLOUGH HOLDING BOTH HANDLES. THE ANIMALS MUST WALK TOWARD FRAME LEFT. ALL CHARACTERS AND ANIMALS MUST BE FULLY VISIBLE BY THE FINAL FRAME. HEAVY RAIN THROUGHOUT. STRONG WIND MUST VISIBLY MOVE THE MEN’S CLOAKS. FOREGROUND PLANTS MUST SWAY AND BEND IN THE WIND THROUGHOUT THE SHOT. REALISTIC WIND AND FABRIC PHYSICS.

---

### Use Middle Keyframes

Grok Imagine lets you add a **frame between the start and end frames.**

You can choose the exact time when it lands.

For example, we used this when we needed Odysseus to enter on cue with a plough.

![](https://pbs.twimg.com/media/HVqsq28WkAAMooT.jpg)

---

### Write the Camera into Every Prompt

Use a static camera to set the scene. Go handheld when the fighting starts.

Here's our go-to handheld prompt:

> Unstabilized handheld combat camera POV, violent jagged shake, the camera swinging, rolling and tilting wildly, the horizon tipping off-level with every stride, hard vertical bounces, sudden sideways whips, lurching drops and jolts, focus hunting and snapping, the frame barely holding the chaos. Chaotic, never aligned, never smooth, like a camera held by someone crouching inside a shadowed threshold tracking urgent movement. Fast, urgent, real-time speed, no slow motion.

---

### Finish in the Edit

Editing, sound and color took about 18 hours. Most sound effects came straight from Grok Imagine. We added music and a color grade on top.

### Now it's your turn!

Make the short film that's been stuck in your head forever, and keep going until it looks the way you pictured it.

Watch Episode 1: The Oath [here](https://x.com/imagine/status/2113712964419063911?a=IHmsJND46PwHMtiExXM&s=20).

Try Grok Imagine at [grok.com/imagine](https://grok.com/imagine)

↑ 正文结束
✓ 本篇全文免费开放

会员可复制、下载全文 Markdown，还能让你的 AI 订阅和提问。
[订年卡 $59/年](https://xiaohu.ai/buy/?plan=year)[看权益对比 →](https://xiaohu.ai/membership/)

[阅读原文 ↗](https://x.com/imagine/status/2115214583983935517)

📮 新解读每晚进邮箱

读完觉得有用？留个邮箱，每晚一封当天的新解读，随时退订。
