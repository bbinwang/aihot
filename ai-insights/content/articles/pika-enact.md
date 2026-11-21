---
title: "Pika 发布了一个全新的 AI视频工具Enact：能模仿片场当导演现场实时导戏 视频一边播一边改，能拖人摆位、还能给 AI 演员说戏"
date: 2026-11-20T00:00:00.000Z
tags: ["产品发布", "Pika", "Pika Enact", "AI 视频", "实时生成", "交互视频"]
summary: "以前想改一个镜头，得重写提示词、再等一整段；在 Enact 里画面一直在播，拖一下、说一句，接下来的画面就跟着改。"
---
> **原文链接**: [https://pika.art/blog/pika-enact](https://pika.art/blog/pika-enact)
> **来源**: pika.art
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/pika-enact/) · 2026/11/20
> **说明**: 本文由 AIHot汪 自动聚合(原文即中文,未翻译)。正文取自小互 AI 解读

---

全文 Markdown · 会员

作者：Pika11-20 · 约 11 分钟

示意图

提示词框*做完再看*

① 写提示词
② 等它生成一整段
③ 从头看一遍
④ 哪里不对，回到 ① 重来

Enact*边播边改*

拖：把她挪到左边
说：Alice，这里爆发
镜头：推近

每一格是不到一秒的一小块画面。黑线是正在播的位置，模型总在它前面几块生成；指令从下一块开始生效，画面不停。
![](https://pic.xiaohu.ai/jiedu-media/pika-enact/social/zh-b5ddad1a0670.png)

Pika 发布了研究预览 Pika Enact：一个模仿片场当导演的实时视频生成环境。它建在 Pika 自己的视频模型 Pika H3 Flex 上，把视频和声音切成不到一秒的小块，一块接一块地生成；每一块都带着前面的场景往下走，同时把你刚给的新指令揉进去。所以画面一直在播，你随时可以插手。

#### Pika Enact 的三种实时操作：

- **实时摆位：**用鼠标把人或物体拖进正在播放的画面，放到你想要的位置，场景照常往下播。生成速度是播放的 1.8 倍。
- **实时指导演员：**打字或开口给演员说戏，演员照着演，还会用自己的声音回你的话。演员记得你给过的戏，排练完喊 Action，整场从第一帧重新拍成一条。画面连声音，生成速度是播放的 1.75 倍。
- **实时运镜：**边播边用鼠标摇镜头、推近、绕着人物转。不需要现成视频，一张外观参考图加一个没贴图的 3D 动作代理就能开拍。生成速度是播放的 1.5 倍。

**现在还用不了：**Enact 是研究预览，不对普通用户开放。想试用或谈集成，要发邮件给 Pika 企业团队（[[email protected]](https://xiaohu.ai/cdn-cgi/l/email-protection)）。

用 AI 做视频，到现在都是同一个循环：写提示词，等它生成一整段，从头看一遍，哪里不对再改提示词重来。模型越来越快，这个循环没变过。Enact 把循环拆掉了：生成成了一个一直在跑的过程，导演的动作（拖一下、说一句、转一下镜头）直接落在正在播的画面上。它把「片场」这套工作方式搬进了 AI 视频。三种操作背后，训练数据怎么造、模型怎么改，其实是同一个思路，读完你会知道「实时」二字难在哪。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/pika-enact/f238c1d54d34caca664f8949605fd0cc.mp4)

Enact 发布短片：先和两位演员对台词，调暗灯光又调回来，把场景换成厨房，再喊 Action 拍一条。中文字幕是我们加的。

### 底座：比播放还快的 Pika H3 Flex

Enact 用的模型是 Pika H3 Flex：Pika 在 MiniMax H3 上做后训练（在别人训练好的模型上接着训练）得到的版本，权重开放。它在 DesignArena 文生视频榜上排第 7，是榜上排名最高的开放权重模型；生成速度平均是 H3 Max 的 1.8 倍，15 秒的 768p 片段最快约 7 秒算完（只算模型本身的计算时间，不是端到端的等待）。
[站内旧文 · 同一个底座视频生成快过播放：fal 对 MiniMax H3 后训练后 让其能实时生成视频同样在 MiniMax H3 上后训练，fal 把 15 秒内容压到播放结束前就能生成下一段。可以对照看「快过播放」之后，还差哪一步才能「边播边改」。](https://xiaohu.ai/article/minimax-h3-max-realtime-video/)

可它仍然是一次交一整段：15 秒的片子，你得等它算完才能看；看完想改，再等一遍。Enact 做的改造，是让它一边算一边播：把一整段拆成不到一秒的小块，算完一块就送出去播，同时开始算下一块。只要算一块的时间比播一块短，画面就不会卡住；你的新指令也只需等到下一块就能生效。三种操作各自的速度：

同样一段画面，算出来比播完更快

**实时摆位**单台服务器
*播放 1 秒*
*生成约 0.56 秒***1.8 倍速**

**实时指导演员**画面和声音一起生成
*播放 1 秒*
*生成约 0.57 秒***1.75 倍速**

**实时运镜**一台 8 卡 B300 服务器 · 640×480 · 每秒 24 帧
*播放一块 0.708 秒*
*生成 0.473 秒***1.5 倍速**

倍速 = 生成速度是播放的几倍。紫色条越短越快，只要生成比播放短，画面就不用停下来等。前两项的「约 0.56 / 0.57 秒」是按倍数换算的；三项测试条件不同，不能直接横比。

### 一、实时摆位：拖到哪，人就站到哪

拍戏先要定好人站哪、怎么走位。用提示词做这件事又慢又不准：你只能写「往左一点」，然后等生成出来，再看左了多少。Enact 里画面一边播，你一边用鼠标把人拎起来、挪过去、放下，马上就能看到结果。

- **位置精确：**提示词只能说「往左一点」，鼠标能把人拖到你要的那个点。
- **和环境融在一起：**被拖的人或椅子由模型和整个场景一起生成，拖动时姿势、光线、影子跟着周围变。没有抠图的毛边，原来站的地方不会留个洞，也不用事后再做一遍合成。
- **人会对被拖做出反应：**被拎在半空时会挪重心、调整姿势，松手后自然站稳。
- **跟得上手：**单台服务器上，生成速度是播放的 1.8 倍；低延迟设置下，在 H100（英伟达的数据中心显卡）上 0.4 秒内就有反应，解码也算在内。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/pika-enact/b950fd87ddd1a92f64bbacf6c62e8240.mp4)

在美术馆、台球室、走廊等几个场景里把人拎起、挪动、放下。红点表示按住鼠标，白圈表示松开。注意人在半空时的姿势变化和落地后的影子。

#### 训练数据：现实里拍不到「被拖过去」的对照

要教会模型跟着鼠标拖人，得有严格对齐的成对视频：一段是原样，一段是同一个场景里只有那个人被拖走，还要逐帧记下鼠标在哪、按没按着。现实中拍的视频给不了这种东西。

Pika 的办法是自己造。拿一段没人动过的视频，让一个 3D 替身沿着拖拽路径运动，模拟真实的重量和惯性；再用视频模型把它渲染成照片级的目标视频，同时自动记下每一帧的鼠标位置和按键状态。这样得到的训练对不用人工标注，可以大量生产，而且两段视频之间只有被拖的那个人不一样。覆盖的动作有拎起、分几步搬运，以及把照片里的人放进正在播的场景。这套数据贯穿了整条流程：完整模型的训练、实时版的蒸馏，到最后的评测。

示意图
一对训练数据：只有被拖的人在动，鼠标逐帧自动记下

##### 原视频：没人碰

##### 目标：被拎起搬走

| 帧（每秒 24 帧） | 鼠标 x | 鼠标 y | 按键 |
| --- | --- | --- | --- |

红点是按住鼠标，空心圈是松开。3D 替身沿拖拽路径运动、再渲染成真实画面，鼠标位置和按键状态是自动记下的，不用人标。表里的数是示意。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/pika-enact/34c2816869056219f74a5db1f3464426.mp4)

真实的训练对：左边是原视频，没人碰那个人；右边是训练目标，人被拎起来搬走。两边除了这个人，别的都一样。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/pika-enact/28d3f848c2889deba8e9652bbcba4c60.mp4)

城市广场：左边是正在播的视频加一张人物照片，右边是把这个人拖进场景的结果。

#### 怎么跟上鼠标：一小块一小块地生成

要让 H3 Flex 能被实时拖动，它得学会两件事：跟着光标走；从「一次生成一整段」改成「源源不断往外流」。

跟光标，靠三路和画面逐帧对齐的信号：每秒 24 次的鼠标状态（按下、按住、松开和位置），一张标出「抓在哪」的热力图，以及没人动过的原视频，用来保住背景不变。这三路信号通过几个轻量的附加模块接进原模型，不用重训整个模型。

![实时摆位架构图：鼠标流、动作特征和光标热力图进入因果视频 DiT，经流式解码器推到浏览器播放器](https://pic.xiaohu.ai/jiedu-media/pika-enact/image.jpg)

实时摆位的整条链路：每 0.17 到 0.7 秒，模型读进最新的鼠标数据，接着自己已经生成的画面生成下一块，解码后推到浏览器。你看着画面继续拖，新的鼠标数据跟着下一块进去。中间大框（Causal video DiT）里那一排小格就是下面要讲的「记忆」：prefix 是提示词和原视频，sink 是第一块，t-4 到 t-1 是最近四块，紫色的 current 是正在生成的一块；框底写着每块去噪 4 步。

生成方式也改了：不再一次出整段，而是一块接一块，每块只看前面已经生成的内容，不偷看未来（这叫「因果」生成）。标准设置下一块 0.7 秒，低延迟设置下 0.17 秒。块越小，从你拖一下到画面有反应就越快。

一块接一块会遇到一个麻烦：越往后前面的内容越多，要是每块都把前面全部重看一遍，会越算越慢，最后跟不上播放。Enact 的办法是只留一部分「记忆」（技术上叫 KV 缓存，就是模型给前文做的笔记，算一次、反复用）：提示词、原视频、第一块和最近四块，更早的就扔掉。这样不管播了多久，每块要算的量都一样，可以一直播下去。

记忆只留开头和最近四块，所以能一直播下去
已经生成的块（划掉的已经移出记忆）
12345678910111213
生成下一块时，模型要看的记忆

**一直留着**提示词原视频第 1 块
**最近四块**····
**正在生成**第 3 块

不管已经播了多久，每生成一块看的东西都一样多。最近四块记住刚才发生了什么，第一块和原视频记住这场戏原本的样子。

#### 蒸馏：从 20 步压到几步，还不能越播越歪

视频模型生成一块画面，要从一团噪点开始一遍遍擦干净，这叫去噪。完整模型要擦 20 遍，太慢，跟不上鼠标。办法是蒸馏：让一个只擦几遍的「学生」模型去模仿完整模型这个「老师」（架构图里写的是 4 遍）。

还有一个坑。每块都接着前几块往下生成，前面一点小偏差会被一路放大，画面越播越走样，这叫漂移。根源在于学生练习时接的是标准答案，上场后接的却是自己的输出。Pika 的做法叫 self-forcing（大意是「逼它接自己的话」）：练习时就让学生接着自己生成的内容往下写，再由老师给它纠偏。结果是去噪从 20 遍降到几遍，光标仍然跟得准、跟得稳。

示意图

一块画面要算几遍
完整模型：20 步第 20 遍才好
蒸馏后的学生：4 步第 4 遍就好

练的时候接谁的上文
**只拿标准答案练：**上场后接的是自己的输出，偏差一块块累积

**self-forcing：**练习时就接自己的输出，由老师纠偏

上半：每个格子是一次去噪，同样的速度，4 步的学生早早交出这一块。下半：圆点代表画面里同一个人的位置，越往后偏得越多就是漂移。技术名是 self-forcing 分布匹配蒸馏（DMD），纠偏的除了完整版老师，还有一个一起训练的评判模型。
[站内旧文 · 同一套技术路线Runway Solaris：把视频模型变成实时生成界面的操作层同样是逐帧自回归、少步蒸馏、用自己的输出训练，Runway 拿它来实时生成可以点、可以拖的软件界面。](https://xiaohu.ai/article/introducing-solaris-interface-world-model/)

### 二、实时指导演员：说一句戏，演员接着演

人摆好了，下一步是给演员说戏。在 Enact 里，画面里的人就是能对话的演员：打字或直接说一句，比如「走近她一点」「告诉他你为什么难过」「把这里换成夜里的厨房」，他们会接着演，视频不停。

- **像聊天一样说戏：**给一句指示，演员照着演；跟他们说话，他们会以角色的身份、用自己的声音回答。画面连声音，生成速度是播放的 1.75 倍，所以对话是实时的节奏。
- **先排练，再开拍：**一遍遍调表演，给意见、让演员再试，觉得对了就喊 Action。排练过的东西会变成干净的一条，从第一帧重新拍。
- **演员有自己的想法和记忆：**每个演员都是一个有独立性格和逻辑的 AI Agent，记得你喜欢什么、不喜欢什么，以及这场戏里发生过的一切。一句意见不用说两遍，也不用从头再来。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/pika-enact/6161174eeab86619b73e16d998722090.mp4)

一次排练：先跟 Alice 和 Bob 打招呼，再一句句教台词，最后喊 Action 拍一条。视频剪短过，英文字幕和导演的摄像头小窗是后期加的，中文字幕是我们加的。

#### 一个负责想，一个负责演

实时指导背后是一个边想边演的 Agent：理解你的意思，规划接下来发生什么，记住你给过的意见，再把戏连画面带声音演出来。分工是两个模型：剧本模型负责想，实时视频模型负责演。你跟它说话的时候，表演不会停。

剧本模型读你的指令，加上开场画面和这场戏的记忆，通过调用工具把它翻译成一个个结构化的「节拍」（一段戏里最小的动作单位）：动作、台词、情绪、视线、灯光。每个节拍对应一句提示，演成好几块画面。没有新指令的时候，场景会自然停在原处，人物轻轻呼吸、眨眼。

示意图

你（导演）
→
剧本模型

**动作**转向 Bob
**台词**「如果我总是一个人，就没有『我们』。」
**情绪**压不住，爆发
**视线**盯着 Bob
**灯光**不变

已演完Alice：你说七点的……
正在演Bob：我在工作……
下一拍Alice 低声回一句
之后保持：呼吸、眨眼

每个节拍演成好几块画面，1 块 = 0.708 秒视频

新的指令只替换还没开始演的节拍，正在演的那一拍不会被打断。台词取自上面那段排练，节拍里的其他内容是示意。

演的那一半，是把 H3 Flex 蒸馏成一个少步、因果的音视频模型，同样只留部分记忆、练习时接自己的输出。它一直盯着开场的「锚定帧」和最近几秒的内容，所以长镜头里人物、布景和原声都能保持一致。锚定帧也有副作用：场景一闲下来，就会被它往开场的样子拉回去。所以每个节拍都写明演员看哪儿；系统还会定期悄悄插入「保持」节拍，让改过的灯光或站位留住。

![实时指导演员架构图：导演指令进入剧本模型，生成节拍表，再由因果音视频模型逐块生成画面和声音](https://pic.xiaohu.ai/jiedu-media/pika-enact/image-2.jpg)

实时指导演员的整体结构：你的意见经剧本模型变成节拍，节拍变成一块块画面和声音，演员的回话在这一条还在播的时候传回给你。底下三格分别是排练、Action 和「保持」节拍。

#### 排练完喊 Action：从第一帧重拍一条

排练时，演员知道镜头在那儿，会和你对话，每一句（你的和他们的）都被逐字记下。喊 Action 后，剧本模型把这段来回改写成一场连贯、不间断的表演，从第一帧重新开始拍。排练里的磕绊、你插的话，都不会出现在正式的这一条里。

示意图

##### 排练：每一句都逐字记下

**导演**Alice，你先开口，你说……
**Alice**你说七点的。现在都快半夜了。
**导演**Bob，你要为自己辩解，你说……
**Bob**我在工作，Alice。我一整天都没停过。
**导演**然后 Alice，你爆发了，带着情绪说……
**Alice**如果我总是一个人，就没有「我们」。
**导演**最后一句说完，推一下 Bob 的肩膀，转身走出画面；Bob 愣在原地。

Action

##### 正式一条：从第一帧重新拍

**Alice**你说七点的。现在都快半夜了。我给你打了两次电话……
**Bob**我在工作，Alice。我一整天都没停过。我做这一切都是为了我们。
**Alice**如果我总是一个人，就没有「我们」。
Alice 推 Bob 的肩膀，转身走出画面
Bob 站在原地，愣住

「排练」一栏的台词和导演要求取自上面那段排练视频（有删节）；「正式一条」是喊 Action 之后改写出的那一条：导演的话不再出现，导演要求的动作进了表演。

训练上，实时模型在蒸馏时向 H3 Flex 自己学：它用自己的输出一块块生成带声音的视频，再以完整版 H3 Flex 对这些片段的评判作为学习目标。

### 三、实时运镜：边播边转镜头

取景和运镜决定一场戏有没有电影感。Enact 让你在场景持续生成时用鼠标操控一台虚拟摄影机：横摇、推近给特写，或者绕着人物转。

- **实时掌镜：**画面播放中拖动鼠标，调整角度、视角和运动，改变的是接下来的画面，不用等离线渲染。
- **不需要现成视频：**和在已有片段上做后期修改不同，它从零生成画面和声音。一张外观参考图定下演员和布景，一个轻量的 3D 动作代理（比如 Blender 里没贴图的视口画面）引导镜头路径。
- **比播放更快：**在一台装 8 张 B300 的服务器上（B300 是英伟达比 H100 更新一代的数据中心显卡；画面 640×480、每秒 24 帧），首帧 0.51 秒出来，之后生成速度是播放的 1.5 倍，省出的时间留给代理画面采集和推流。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/pika-enact/ea51913fd8ac6ac49d39cfec55995625.mp4)

一次实时运镜。左栏标着 Input Video，是固定机位的参照画面，给出演员的动作和场景；右栏是 Enact 边播边生成的结果：同一段表演，镜头被实时移到舞台另一侧、推近，人物和大厅保持一致。歌声也是一起生成的，可以开声音听。

#### 训练数据：在 Blender 里搭一个虚拟摄影棚

要让模型学会自由移动的镜头怎样同时影响画面透视和空间里的声音，训练数据得逐帧严格同步。Pika 搭了一条从 Blender 到视频的自动合成流水线，在可控的 3D 环境里同时录下四样东西：多角度的镜头轨迹、没贴图的 3D 动作参考、目标画面，以及空间音频。再用光流检查（看相邻帧之间像素怎么移动）和跨帧身份核对，把穿模和人物前后不一致的样本筛掉，只留干净的训练对。

#### 老师看全片，学生一块一块生成

训练分两步。第一步，训练一个「全参考老师」：它能看到完整的镜头运动序列、外观参考和目标音视频，学会整段生成。第二步，用前面讲过的办法训练学生：学生一块一块地生成，接着自己生成的内容往下写，由不再变动的老师和评判模型给它打分。

老师先学整段，学生学一块块接着往下拍
第一步 · 离线训练老师学整段完整镜头轨迹外观参考目标画面和声音*→*老师：学会一次生成整段
第二步 · 离线训练学生边看自己生成的边学当前这一块的参考自己生成的上几块*→*学生：生成下一块*←*老师和评判模型打分
上线 · 只跑学生边播边出画面和声音鼠标*→*Blender 里的镜头*+*外观参考*+*已生成的历史*→*一块约 0.71 秒的画面和声音

把下面那张英文架构图压成三行。老师只在训练时用；真正上线干活的是学生，所以能一块一块跟着鼠标走。

![实时运镜训练架构图：第一阶段训练全参考老师，第二阶段用 self-forcing DMD 训练因果学生，推理时只用学生](https://pic.xiaohu.ai/jiedu-media/pika-enact/image-3.jpg)

原图（英文）。上面两格是离线训练的两个阶段：全参考老师看完整序列学习；学生在自己的连续生成上接受老师和评判模型打分。下面一格是实际使用：鼠标变成 Blender 里的镜头控制，学生读当前的参考块、外观参考和自己已生成的历史，连续产出音视频块。

实际使用时只跑学生。它读实时的 3D 镜头运动、外观参考和自己的历史，每次生成约 0.71 秒的同步音视频块，每块只走几步去噪。它盯着开场锚定帧和一段滑动的历史窗口，所以长时间环绕拍摄时，人物长相和房间结构都不走样，内存占用也有上限。

为了跑得比播放快，还做了几处工程优化：把不变的外观部分缓存起来跨块复用，复用固定的内存布局，用流式视频解码器边生成边解码。稳态下每块 0.708 秒的画面只需 0.473 秒计算，也就是生成速度是播放的 1.5 倍。

### 现在能做什么

Enact 目前只是研究预览，普通用户用不了；想试用或谈集成，联系 [[email protected]](https://xiaohu.ai/cdn-cgi/l/email-protection)。Pika 团队说自己测试时，被这样生成视频的真实感和临场感吓了一跳，认为这是一种新创作方式的开始：现实里当导演的即时感，加上生成式媒体几乎不设限的可能。底座 H3 Flex 的权重已经开放，可以从 Hugging Face 和 GitHub 下载。

对做视频的人来说，值得留意的是工作方式的变化：从「写一段描述，等结果」变成「对着画面直接动手、开口」。分辨率、可用范围这些都还早，三种操作的速度是在不同硬件和设置下测的。但拖、说、转这三个动作已经能落在正在播的画面上，提示词框不再是唯一的入口。

Pika 团队上 The Neuron 节目聊 Enact（英文，点封面才加载）。[去 YouTube 看](https://youtu.be/7ufTrKiOxi0)
[站内旧文 · 另一种实时可交互的生成Google DeepMind 发布 Genie 4：能实时改场景、与角色对话的世界模型同样是研究预览：在一边生成的世界里移动、改天气、让角色说话。Genie 4 偏「走进一个世界」，Enact 偏「在片场拍一场戏」。](https://xiaohu.ai/article/genie-4-interactive-world/)来源Research Preview: Pika EnactPika·2026-11-18·[查看主材料](https://pika.art/blog/pika-enact)延伸[Pika H3 Flex 产品页](https://pika.art/pika-h3-flex)·[Pika 官方 X 发布帖](https://twitter.com/pika_labs/status/2123127584342921652)·[Pika 团队在 The Neuron 聊 Enact（YouTube）](https://youtu.be/7ufTrKiOxi0)本站说明图片和视频均来自 Pika；两段有人声视频的中文字幕为本站添加。

原文版权归原作者，这里只供对照阅读。 [看原网页 ↗](https://pika.art/blog/pika-enact)

## Research Preview: Pika Enact

Pika Enact explores a future of AI filmmaking where creators can talk to their cast, rehearse performances, and shape scenes as they unfold.

At Pika, we believe the next generation of AI creation should go beyond the prompt box, and more closely resemble how we already make films. Pika Enact is an exciting step in that direction.

Pika Enact is **designed to mimic the experience of directing on set.** It’s an experimental live-streaming environment built on [Pika H3 Flex](https://pika.art/pika-h3-flex) that generates video and sound in sub-second chunks, carrying scene context forward while incorporating new direction into the ongoing generation.

This allows the creator to interact with “actors,” manually re-stage a scene, and manipulate the camera—all in real time.

##### Pika Enact enables three new modes of interaction:

1. **Live Staging**. Place and reposition actors or objects within a running video with your mouse. The scene continues while you move them.
2. **Live Actor Direction:** Speak directly to actors on set, and shape their performances. They’ll remember your notes, and deliver a fresh, continuous take when you call “Action.”
3. **Live Camera Control**. Direct camera movement with your mouse around a live, playing scene.

Below, we walk through each one: the data they learn from, their technical architecture, and some demo videos.

### 1. Live Staging

Scene design and actor blocking are mainstays of a live directing experience. But AI video creation makes that process inexact and time-consuming. With Enact, rather than waiting for a generation to load in order to see the outcome of your direction, you get instantaneous feedback; **you can manually shape the scene as it plays.**

Lifting, moving and setting down people across several scenes. A red dot marks a held mouse button; a white ring marks release.

The live staging within Pika Enact lets the creator drag an object or actor into place with their mouse, which creates several key benefits:

- **Precise placement:** Where a prompt can only suggest “a bit to the left,” a cursor drags subjects to the exact intended spot.
- **Consistency with environment:** The model generates whatever you move—a person or a chair—together with the rest of the scene. As you drag, the subject responds naturally to the movement, while its pose, lighting, and shadows adapt to its surroundings. The result has no cut-out edges, no hole where it stood, and no compositing pass to clean up afterwards.
- **Real-time responsiveness**: The video keeps playing while you drag, and on a single server the model generates it **1.8× faster than it plays.** Additionally, the subject actively reacts to being moved, shifting weight and adjusting posture mid-air before settling naturally where you let go.

To keep up with the cursor movement, we distill the model to a few steps and stream the mouse input and decoding in small pieces. In our low-latency setting, the picture responds in **under 0.4 seconds on H100**, decoding included.

### The Data Engine

Training interactive video dragging requires strictly consistent before-and-after video pairs synchronized with frame-level cursor trajectories, which real-world footage cannot provide.

We built a physics-driven synthetic data engine to solve this. Starting from an untouched video, we animate a 3D stand-in along a drag path to simulate natural weight and momentum. Our video models then render photorealistic target clips while automatically logging mouse positions and button states.

This produces scalable, zero-labeling training pairs where only the dragged subject changes, covering lifting, multi-step carries, and inserting new subjects from photos into live scenes. The dataset drives our entire pipeline, from full-clip training and real-time distillation to evaluation.

For data access or more detail on how the data was made, contact our team at [[email protected]](https://xiaohu.ai/cdn-cgi/l/email-protection).

City square: bringing a person into the playing scene.

Left: source video, nobody touches the person. Right: training target, the person is lifted and carried.

### Technical Architecture

To make [Pika H3 Flex](https://pika.art/pika-h3-flex) draggable in real time, it has to learn two things: follow a cursor, and generate a stream instead of a clip.

![Live Staging: mouse in, video out. The system watches how the mouse moves and uses that to predict what the video should show next. ](https://cdn.pika.art/v2/creation/cms/notion/5fe8ad69f8243bea73c82170ca6ddfd0.webp)

Live Staging: mouse in, video out. The system watches how the mouse moves and uses that to predict what the video should show next.

To follow a drag in real time, Pika H3 Flex injects three frame-aligned signals via lightweight, zero-initialized modules: 24 fps mouse states, a spatial grab heatmap, and the untouched source video to keep the background intact. Rather than generating full clips at once, the model streams short causal chunks (0.7 s standard, 0.17 s low-latency) through a sliding key-value cache that retains the prompt, source video, first chunk, and four most recent chunks, with re-based positional embeddings for infinite sessions at constant cost.

To cut latency and prevent autoregressive drift, we apply self-forcing distribution matching distillation (DMD). A few-step student generates chunks directly from its own past outputs, guided by a trainable critic and the full-clip teacher with emphasized cursor signals. This reduces sampling from twenty steps to just a few while keeping cursor tracking sharp and stable.

### 2. Live Actor Direction

Once everything has been staged, the next step is typically directing your cast. With Enact, the people in a video become actors you can talk to. Type or say a note, such as “move closer to her”, “tell him why you’re upset” or “make it a kitchen at night”, and they play it out while the video keeps running.

A rehearsal with Enact: greeting the actors, then running the scene line by line. Edited for length; subtitles and the director’s webcam inset were added afterwards.

This mimics the experience of directing on set in several important ways:

- **Communicate conversationally**: Give a note and the actors act on it; talk to them and they answer you in character, in their own voices. The video generates picture and sound 1.75× faster than they play, so the interaction happens at a real-time pace.
- **Rehearse first, then shoot.** Work through a performance iteratively. Give notes, have the actors try gain, and when it feels right, call Action. Everything you rehearsed becomes one clean take, shot fresh from the first frame.
- **The actors have minds and memories of their own.** Each is an AI agent with a distinct personality, its own logic, and the ability to think and respond in character. They remember what you liked, what you didn't, and everything that's happened in the scene. You never have to repeat a note or start from scratch. Every interaction builds on the last, making the characters feel more natural, consistent, and alive.

### Data

During distillation, the real-time model learns from Pika H3 Flex itself: it generates audio-video clips chunk by chunk from its own output, and the full Pika H3 Flex model’s judgment of those clips is what it learns toward. For more on the training data, data access or custom training, contact our team at [[email protected]](https://xiaohu.ai/cdn-cgi/l/email-protection).

### Technical Architecture

Live Direction is an agentic model within Pika Enact that thinks and performs at the same time. It understands what you mean, plans what should happen next, remembers your notes, and acts the scene out live, picture and voices together. A script model does the thinking and a real-time video model does the acting. And while you talk to the agent, the performance never stops.

![The Live Actor Direction works as one agent: notes become beats, beats become chunks of picture and sound, and the actors’ answers come back to you while the take keeps running.](https://cdn.pika.art/v2/creation/cms/notion/e74a29829416d05dfde6ef666737a12a.webp)

The Live Actor Direction works as one agent: notes become beats, beats become chunks of picture and sound, and the actors’ answers come back to you while the take keeps running.

A script language model reads your notes together with the opening frame and session memory. Through tool calls, it translates directorial input into structured beats: action, dialogue, emotion, gaze, and lighting. When no instruction is queued, the scene holds naturally with subtle breathing and blinking.

At its core, Pika H3 Flex is distilled into a few-step causal audio-video model. This model uses a sliding key-value cache and self-forcing distribution matching distillation (DMD). By attending to the opening anchor frame and recent seconds of context, it keeps characters, sets, and native voices consistent across long takes. The opening anchor can pull idle scenes back toward the opening state. To counter this, each beat specifies actor gaze. In addition, Real-Time Director silently injects periodic hold beats to preserve lighting or staging changes.

During rehearsal, actors acknowledge the camera and converse with you. Every line is logged verbatim. Calling Action prompts the script model to rewrite that exchange into a seamless, uninterrupted performance that starts fresh from the first frame.

### 3. Live Camera Control

Framing and camera movement are what turn a scene into something cinematic. Pika Enact lets you steer a virtual camera with your mouse while a scene is continuously generating—panning, dollying in for a close-up, or orbiting around the subjects.

A live session with Live Camera Control: starting from an appearance reference and a 3D motion proxy, moving the virtual camera on the fly while the characters and room stay consistent.

- **You direct the lens in real time.** Move and drag your mouse while the stream is playing to adjust camera angles, perspective, and movement on the fly—shaping upcoming frames as the scene unfolds instead of waiting for offline renders.
- **No existing video needed:** Unlike post-hoc video editing that modifies an existing clip, the system generates audio and video from scratch. An appearance image anchors the cast and set, while a lightweight 3D motion proxy (such as an untextured Blender viewport) guides the camera path.
- **It runs faster than real time.** On an 8×NVIDIA B300 node (640×480 @ 24 fps), the model renders initial frames in 0.51 s and generates subsequent chunks at 1.50× real-time speed, leaving headroom for proxy capture and streaming.

### Data

To teach Pika H3 Flex how free-roaming 3D camera moves affect both visual perspective and spatial acoustics, training data must be tightly synchronized down to the frame level.

1. **Virtual Soundstage Capture:** We built an automated Blender-to-Video synthesis pipeline that simultaneously records multi-angle camera trajectories, untextured 3D motion reference streams, target RGB video frames, and spatial audio tracks in controllable 3D environments.
2. **Rigorous Quality Filtering:** Using automated optical flow checks and cross-frame identity verification, we filter out clipping artifacts and subject inconsistencies, retaining only high-signal-to-noise pairs for training.

### Technical Architecture

Two stages turn offline 3D supervision into a live, responsive camera generator: a full-reference teacher that sees the entire sequence, and a causal student that generates chunk by chunk as you move the mouse.

![Two offline training stages: the full-reference teacher learns from paired sequences; DMD trains the causal student on its own rollouts. At inference, the student reads current Blender references and generated history to produce successive audio-video chunks.](https://cdn.pika.art/v2/creation/cms/notion/23dc2230ec08505500b2e28567d5a5a2.webp)

Two offline training stages: the full-reference teacher learns from paired sequences; DMD trains the causal student on its own rollouts. At inference, the student reads current Blender references and generated history to produce successive audio-video chunks.

During streaming, the causal student reads live 3D camera motion, the appearance reference, and its own history. It generates about 0.71 s chunks of synchronized audio and video. These chunks respond immediately to virtual camera movement. The student is distilled from the full-reference H3 teacher with self-forcing distribution matching distillation (DMD) to few denoising steps per chunk. It attends to the opening anchor frame and a sliding history window. The window carries synchronized relative positions. This design preserves character likeness and room geometry across long orbits at bounded memory cost.

To exceed real-time playback speed, we cache static appearance prefixes across chunks. We reuse fixed memory layouts and routing metadata with zero numerical loss. We also decode latents through a streaming video decoder. Together, these optimizations cut steady-state compute to 0.473 s per 0.708 s chunk, or 1.50 x real time.

### What’s Next

Enact is an early look at what happens when video listens to you—and responds—while it plays. In our own tests, we were startled by how much more real and visceral it feels to generate video this way. So, while it’s only in research preview right now, we think this is the beginning of a new paradigm for creation. It’s the immediacy of directing in real life paired with the expansive possibilities of generative media.

### Contact Us

Currently, Enact is a research preview, unavailable for consumer use. If you’re interested in trying it or talking about integration opportunities, contact our team at [[email protected]](https://xiaohu.ai/cdn-cgi/l/email-protection).

↑ 正文结束
✓ 本篇全文免费开放

读完还有疑问？会员每天能问小互 30 次，每句带出处；还有一份按你口味挑好的每日 AI 日报。
[成为会员 $59/年](https://xiaohu.ai/buy/?plan=year&slug=pika-enact&from=tail)[按月 $6.99](https://xiaohu.ai/buy/?plan=monthly&slug=pika-enact&from=tail)

7 天内不满意全额退 · [看会员能多什么 →](https://xiaohu.ai/membership/)

[阅读原文 ↗](https://pika.art/blog/pika-enact)

📮 新解读每晚进邮箱

读完觉得有用？留个邮箱，每晚一封当天的新解读，随时退订。
