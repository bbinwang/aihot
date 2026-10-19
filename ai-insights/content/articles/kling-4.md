---
title: "可灵4.0正式发布：74段视频演示，看懂可灵4.0到底升级了什么"
date: 2026-10-16T00:00:00.000Z
tags: ["产品发布", "可灵", "Kling 4.0", "AI视频", "视频生成", "MCP", "聚合"]
summary: "完整收录74段官方视频与80张参考图，讲清参考素材如何分工、视频如何编辑，并附MCP/CLI接入与生成操作步骤。"
---
> **原文链接**: [https://klingai.com/release-note/release-notes/Kling_4](https://klingai.com/release-note/release-notes/Kling_4)
> **来源**: 可灵 AI 团队
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/kling-4/) · 2026/10/16
> **说明**: 本文由 AIHot 自动聚合(原文即中文,未翻译)。正文取自小互 AI 解读

---

**已核对**可灵 AI 团队10-16 · 约 16 分钟

快手旗下的可灵 AI 团队正式全量上线新一代视频生成模型 Kling 4.0，并同步推出面向高频创作场景的轻量版本 Kling 4.0 Flash。

主要功能如下：

- **动作与视听表现**：支持大幅度肢体动作、复杂运镜、双通道立体声、多语种及方言口音；官方称人物表情与口型匹配有所改善。
- **全能参考体系扩充**：单次任务支持输入最多 15 项参考素材，包括参考图（≤ 10 张）、参考视频（≤ 5 段且总长 ≤ 30 秒）、主体（≤ 7 个）及音色参考；支持三视图、故事板、白模视频、深度视频等多种参考方式。
- **叙事长度与关键节点控制**：单次原生生成最长达 30 秒，支持最多 10 张关键帧设定过渡节点，提示词输入容量提升至 8000 tokens。
- **视频编辑**：支持输入最多 5 段视频（含 1 段主视频），可以在已有视频中增加、删除或替换主体与背景，调整画风、天气、颜色与材质。
- **画幅规格与模型分层**：支持 720p、1080p 与 4K 输出，新增 21:9 超宽画幅；1080p 与 4K 的 10-bit HDR 以及最长 2 分钟视频续拍即将上线；Kling 4.0 Flash 提供 720p、3 至 20 秒、8-bit SDR 的快速高频生成。
- **一体化创作工作流**：网页端提供整合了提示词与多模态参考的统一输入框，支持列表与宫格双视图、可边看边改的时间线，以及支持节点连线排布与 Agent 交互的画布；同时开放 MCP 与 CLI 接口供外部 Agent 调用。

> 本页完整收录官方发布页的74段视频：14段输入参考，以及60段生成结果或展示视频，并配齐80张参考图。可按目录跳转查看；实际效果仍需按具体创作任务检查。

---

### 动作、镜头与人物表演

可灵称，这一代改进了高速运动、连续动作以及跟拍、环绕等复杂镜头，重点处理人物、背景和摄影机同时变化的场面。

#### 多人动作与大场面

人物参考图![多人动作与大场面：人物参考图](https://best.xiaohu.ai/media/kling-4/demos/g01-c1-1-display.webp)

场景参考图![多人动作与大场面：场景参考图](https://best.xiaohu.ai/media/kling-4/demos/g01-c1-2-display.webp)

生成结果 · 15 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g01-c2-1.web-f0cd1e886106.mp4)

先看角色与场景参考，再播放打斗结果，留意快速运动和多人交错时人物、衣服与空间关系的延续。

视频与参考图：可灵官方发布页。点击播放器播放，可全屏查看。

检查动作片段时，先看人物快速转身后是否还是同一张脸，再看交错的手脚是否清楚、场景布局是否前后对应。

#### 奇幻人物与高速特效

首帧图![奇幻人物与高速特效：首帧图](https://best.xiaohu.ai/media/kling-4/demos/g02-c1-1-display.webp)

生成结果 · 片长约 15 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g02-c2-1-fast-e466bde8e8bc.mp4)

首帧是黑发女子、铜钱和红色丝线的奇幻构图；约15秒结果出现手部施展动作、红色线条与飞动铜钱。

视频与参考图：可灵官方发布页。点击播放器播放，参考图可点击放大。

首帧图可以交代特效动作开始时的人物与构图。

#### 人物表演与视听配合

人物表演 · 首帧![人物表演与视听配合：人物表演 · 首帧](https://best.xiaohu.ai/media/kling-4/demos/g05-c1-1-display.webp)

人物表演 · 生成结果 · 11 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g05-c2-1-fast-20f3ed9c0e52.mp4)

录音棚 · 首帧![人物表演与视听配合：录音棚 · 首帧](https://best.xiaohu.ai/media/kling-4/demos/g03-c3-1-display.webp)

录音棚 · 生成结果 · 30 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g03-c4-1-35a0ed1536ae.mp4)

室内对话与录音棚表演。播放时可以对照人物表情、身体动作、台词与口型；耳机试听音效与人声。

视频与参考图：可灵官方发布页。点击播放器播放，可全屏查看。

人物近景重点看眼神、面部表情与身体动作的配合。

#### 一句提示词生成人物自我介绍

**官方提示词：**博主视频，女主在开心地跟观众介绍她自己，注意保持真实感和真实画质

生成结果 · 片长约 7 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g05-c4-1-fast-22f6af3071c1.mp4)

官方提示词为“博主视频，女主在开心地跟观众介绍她自己，注意保持真实感和真实画质。”约7秒结果为女子在室内面对镜头讲话和微笑。

视频与参考图：可灵官方发布页。点击播放器播放，参考图可点击放大。

主模型支持双通道立体声，官方称口型匹配和声画同步有所改善。检查对白、人物近景或音乐内容时，戴耳机试听人声与环境音，同时对照口型和台词。

#### 拼贴海报变成动态短片

参考图 1![拼贴海报变成动态短片：参考图 1](https://best.xiaohu.ai/media/kling-4/demos/g03-c1-1-display.webp)

参考图 2![拼贴海报变成动态短片：参考图 2](https://best.xiaohu.ai/media/kling-4/demos/g03-c1-2-display.webp)

参考图 3![拼贴海报变成动态短片：参考图 3](https://best.xiaohu.ai/media/kling-4/demos/g03-c1-3-display.webp)

参考图 4![拼贴海报变成动态短片：参考图 4](https://best.xiaohu.ai/media/kling-4/demos/g03-c1-4-display.webp)

生成结果 · 片长约 15 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g03-c2-1-fast-445fccea4000.mp4)

四幅参考图为不同人物、撕纸与Kling4.0文字的海报；约15秒结果在拼贴人物、汽车照片和标题版式之间转换。

视频与参考图：可灵官方发布页。点击播放器播放，参考图可点击放大。

镜头和景别决定观众何时看见人物细节，何时看清整场动作的空间关系。

#### 镜头调度与动作组合

官方演示 · 10 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g23-c1-1.web-e6a15e5e4500.mp4)

白色武术服男子室内交手，镜头在近距离、高机位和近景之间转换。重点看动作与视角变化如何配合。

视频与参考图：可灵官方发布页。点击播放器播放，可全屏查看。

检查视角变化能否交代人物的位置和动作过程。镜头调度既包括摄影机移动，也包括不同景别的切换。

#### 海上钢琴：四组关键画面

关键画面参考 1![海上钢琴：四组关键画面：关键画面参考 1](https://best.xiaohu.ai/media/kling-4/demos/g01-c3-1-display.webp)

关键画面参考 2![海上钢琴：四组关键画面：关键画面参考 2](https://best.xiaohu.ai/media/kling-4/demos/g01-c3-2-display.webp)

关键画面参考 3![海上钢琴：四组关键画面：关键画面参考 3](https://best.xiaohu.ai/media/kling-4/demos/g01-c3-3-display.webp)

关键画面参考 4![海上钢琴：四组关键画面：关键画面参考 4](https://best.xiaohu.ai/media/kling-4/demos/g01-c3-4-display.webp)

生成结果 · 片长约 22 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g01-c4-1-fast-b7404bff76a3.mp4)

四张输入图分别为风浪中的船头、甲板钢琴演奏者、弹奏手部及男子面部；约22秒结果展现风浪船体、演奏者、手部近景和海面船只。

视频与参考图：可灵官方发布页。点击播放器播放，参考图可点击放大。

#### 人物与山路关键画面

关键画面参考 1![人物与山路关键画面：关键画面参考 1](https://best.xiaohu.ai/media/kling-4/demos/g04-c3-1-display.webp)

关键画面参考 2![人物与山路关键画面：关键画面参考 2](https://best.xiaohu.ai/media/kling-4/demos/g04-c3-2-display.webp)

关键画面参考 3![人物与山路关键画面：关键画面参考 3](https://best.xiaohu.ai/media/kling-4/demos/g04-c3-3-display.webp)

关键画面参考 4![人物与山路关键画面：关键画面参考 4](https://best.xiaohu.ai/media/kling-4/demos/g04-c3-4-display.webp)

生成结果 · 片长约 10 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g04-c4-1-fast-aed7328af1b0.mp4)

四张输入包括斗笠女子的多角度设定、山路远景、面部近景与手持飞刀姿态；约10秒结果展现山路人物、移动镜头和手部飞刀近景。

视频与参考图：可灵官方发布页。点击播放器播放，参考图可点击放大。

#### 尾帧参考：古典群像画面

尾帧图![尾帧参考：古典群像画面：尾帧图](https://best.xiaohu.ai/media/kling-4/demos/g04-c1-1-display.webp)

生成结果 · 片长约 15 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g04-c2-1-fast-bf33cf897032.mp4)

尾帧图是古典油画风格群像；约15秒视频从人物和器物的近景展开到接近输入构图的群像全景。

视频与参考图：可灵官方发布页。点击播放器播放，参考图可点击放大。

尾帧用于指定希望到达的结束画面；关键帧还可以指定中间的情节或景别。目标是定版群像或海报时，可以先给尾帧；中途必须经过哪些画面，则用关键帧表达。节点间的运镜与形体过渡仍由模型生成，需要检查衔接。

#### 高规格输出的明暗对照

室内喝茶明暗对照 · 片长约 5 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g06-c1-1-sdr-074e44d0b8d6.mp4)

洞穴小动物明暗对照 · 片长约 6 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g06-c2-1-sdr-1889b2372ae4.mp4)

两段约5秒及6秒官方分屏演示，分别为古典室内女子喝茶、暗洞中的小动物举烛；画面带4KHDR标识，分屏展示明暗与颜色差异。功能详细说明仍为即将上线，网页分发片不能证明用户已可生成HDR。

此处播放 SDR 兼容预览。原始 HDR 样片：[茶室](https://pic.xiaohu.ai/jiedu-media/kling-4/g06-c1-1-hdr-7828b150a9af.mp4) · [洞穴小动物](https://pic.xiaohu.ai/jiedu-media/kling-4/g06-c2-1-hdr-99ec987bbf40.mp4)。

视频与参考图：可灵官方发布页。点击播放器播放，参考图可点击放大。

10-bit HDR让明暗与色彩过渡更细腻，为后期调色留出空间；1080p和4K的这项生成能力仍标为即将上线。本页默认播放SDR兼容预览，附原始HDR样片入口。

---

### 全能参考：图片交代外观，视频传递动作与运镜

用图片交代人物长相、商品和场景，用视频示意动作、运镜或拍摄节奏，再用提示词说明每份素材要借用哪一部分。

官方列出的参考上限如下：

- 单次任务最多支持输入 **15 项参考素材**。
- **参考图片**：最多支持 10 张。
- **参考视频**：最多支持 5 段，且所有参考视频总时长累计不超过 30 秒（包含视频主体）。
- **参考主体**：主体总数不超过 7 个，其中视频主体不超过 3 个。
- **参考音频**：支持指定音色参考。

各类上限和15项总上限需要同时满足。例如10张图、5段视频再加1份音色，总量就是16项；视频数量未超限，也可能因累计时长超过30秒而不符合要求。同一素材跨类型登记的计数细节，需以产品界面为准。

#### 多种静态参考共同组成镜头

多角色、车辆与道具参考图![多种静态参考共同组成镜头：多角色、车辆与道具参考图](https://best.xiaohu.ai/media/kling-4/demos/g07-c1-1-display.webp)

生成结果 · 15 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g07-c2-1-049e548a9f5a.mp4)

一张拼图交代多个人物、车辆和道具；生成结果将这些视觉元素组织进驾驶、追逐与爆炸场面。

视频与参考图：可灵官方发布页。点击播放器播放，可全屏查看。

图片可以分别表达角色、道具、布局或风格。准备多份素材时，在提示词中写清各自的用途。

#### 人物参考与一致性

角色 A 参考图![人物参考与一致性：角色 A 参考图](https://best.xiaohu.ai/media/kling-4/demos/g13-c1-1-display.webp)

角色 B 参考图![人物参考与一致性：角色 B 参考图](https://best.xiaohu.ai/media/kling-4/demos/g13-c1-2-display.webp)

生成结果 · 9 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g13-c2-1-fast-21928392efa9.mp4)

两张角色参考与殿堂交手结果。观看人物快速移动和转身时，脸部、体态与衣着怎样延续。

视频与参考图：可灵官方发布页。点击播放器播放，可全屏查看。

做连续剧情时，检查角色在不同姿态下的脸、体态与衣着是否延续。

#### 动画角色与大小关系

参考图 1![动画角色与大小关系：参考图 1](https://best.xiaohu.ai/media/kling-4/demos/g13-c3-1-display.webp)

参考图 2![动画角色与大小关系：参考图 2](https://best.xiaohu.ai/media/kling-4/demos/g13-c3-2-display.webp)

参考图 3![动画角色与大小关系：参考图 3](https://best.xiaohu.ai/media/kling-4/demos/g13-c3-3-display.webp)

参考图 4![动画角色与大小关系：参考图 4](https://best.xiaohu.ai/media/kling-4/demos/g13-c3-4-display.webp)

生成结果 · 片长约 30 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g13-c4-1-fast-5cb77c411128.mp4)

四张图为森林树屋、黄背带裤小鼠、红围巾刺猬及两者体型对照；约30秒结果展示刺猬来到树屋与小鼠会面、递送信件的场面。

视频与参考图：可灵官方发布页。点击播放器播放，参考图可点击放大。

#### 同一人物与多个室内空间

参考图 1![同一人物与多个室内空间：参考图 1](https://best.xiaohu.ai/media/kling-4/demos/g14-c1-1-display.webp)

参考图 2![同一人物与多个室内空间：参考图 2](https://best.xiaohu.ai/media/kling-4/demos/g14-c1-2-display.webp)

参考图 3![同一人物与多个室内空间：参考图 3](https://best.xiaohu.ai/media/kling-4/demos/g14-c1-3-display.webp)

参考图 4![同一人物与多个室内空间：参考图 4](https://best.xiaohu.ai/media/kling-4/demos/g14-c1-4-display.webp)

生成结果 · 片长约 15 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g14-c2-1-fast-3eee6d9cabcb.mp4)

四张图给出桌边、窗边床铺、床的俯视构图及灰色衣裙女子设定；约15秒结果展示女子坐桌前、端杯近景和躺在床上的画面。

视频与参考图：可灵官方发布页。点击播放器播放，参考图可点击放大。

人物、环境和相对体型可以分别提供参考图；比较结果时，同时看角色外观、大小关系和场景是否延续。

#### 参考视频与商品图结合

原参考视频 · 4 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g07-c3-1-f18b3db3c5c8.mp4)

商品参考图![参考视频与商品图结合：商品参考图](https://best.xiaohu.ai/media/kling-4/demos/g07-c3-2-display.webp)

生成结果 · 4 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g07-c4-1-52964022a23a.mp4)

原参考是女子手持棕色饮品转身；加入橙色瓶装商品图后，结果借用相似动作与拍摄节奏，呈现新的商品。

视频与参考图：可灵官方发布页。点击播放器播放，可全屏查看。

饮品案例中，视频交代“怎么拍”，商品图交代“拍什么”。要保留拍摄节奏、更换出镜商品时，可以这样分配参考素材。

#### 动作参考：拳台到绳桥

角色 A 参考图![动作参考：拳台到绳桥：角色 A 参考图](https://best.xiaohu.ai/media/kling-4/demos/g08-c1-1-display.webp)

角色 B 参考图![动作参考：拳台到绳桥：角色 B 参考图](https://best.xiaohu.ai/media/kling-4/demos/g08-c1-2-display.webp)

动作参考视频 · 7 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g08-c1-3-efa50ce77ac6.mp4)

生成结果 · 7 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g08-c2-1-3f043ce42d80.mp4)

上方两张图定义人物，下面对照拳台动作参考与丛林绳桥结果。重点看踢击、交手与倒地的动作顺序。

视频与参考图：可灵官方发布页。点击播放器播放，可全屏查看。

动作参考负责动作安排，人物外观和场景另给条件。对照结果时，检查动作顺序、落点和角色互动。

#### 动作参考：户外扣篮到动画球场

参考图 1![动作参考：户外扣篮到动画球场：参考图 1](https://best.xiaohu.ai/media/kling-4/demos/g08-c3-1-display.webp)

参考图 2![动作参考：户外扣篮到动画球场：参考图 2](https://best.xiaohu.ai/media/kling-4/demos/g08-c3-2-display.webp)

原参考视频 · 片长约 6 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g08-c3-3-fast-ba2db4191cdd.mp4)

生成结果 · 片长约 6 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g08-c4-1-fast-c9d4a4acbbe1.mp4)

人物图为黑色球衣男子设定，场景图为坐满卡通观众的室内球场；约6秒动作参考是在户外球场助跑起跳扣篮，结果将相似动作进程放入动画球场。

视频与参考图：可灵官方发布页。点击播放器播放，参考图可点击放大。

#### 运镜参考：古代石廊到未来走廊

运镜参考视频 · 15 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g09-c1-1-f91a99cdbbac.mp4)

人物参考图![运镜参考：古代石廊到未来走廊：人物参考图](https://best.xiaohu.ai/media/kling-4/demos/g09-c1-2-display.webp)

场景参考图![运镜参考：古代石廊到未来走廊：场景参考图](https://best.xiaohu.ai/media/kling-4/demos/g09-c1-3-display.webp)

生成结果 · 15 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g09-c2-1-872b78d316fa.mp4)

参考镜头跟拍女子在古代石廊奔跑；角色和场景图换成红衣女子与未来走廊。对照两段视频的跟随与转弯方式。

视频与参考图：可灵官方发布页。点击播放器播放，可全屏查看。

运镜参考负责跟随、转弯等拍摄运动，图像补充人物与环境。对照结果时，检查机位、速度和空间衔接。

#### 运镜参考：白天赛道到霓虹港口

参考图 1![运镜参考：白天赛道到霓虹港口：参考图 1](https://best.xiaohu.ai/media/kling-4/demos/g09-c3-2-display.webp)

参考图 2![运镜参考：白天赛道到霓虹港口：参考图 2](https://best.xiaohu.ai/media/kling-4/demos/g09-c3-3-display.webp)

原参考视频 · 片长约 7 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g09-c3-1-fast-769f20f11a8b.mp4)

生成结果 · 片长约 7 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g09-c4-1-fast-f7da79a60cac.mp4)

参考视频是浅色跑车在白天赛道漂移，镜头跟随绕车；车辆图为蓝橙07号赛车，场景图为夜间霓虹港口；约7秒结果呈现赛车在港口漂移的多角度镜头。

视频与参考图：可灵官方发布页。点击播放器播放，参考图可点击放大。

#### 故事板与角色设定

角色设定图![故事板与角色设定：角色设定图](https://best.xiaohu.ai/media/kling-4/demos/g11-c1-1-display.webp)

多格故事板![故事板与角色设定：多格故事板](https://best.xiaohu.ai/media/kling-4/demos/g11-c1-2-display.webp)

生成结果 · 15 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g11-c2-1-d21ed76fb68b.mp4)

角色设定与多格太空故事板共同提供创作意图；下方视频展示毛绒宇航员在金色隧道和太空中的情节。

视频与参考图：可灵官方发布页。点击播放器播放，可全屏查看。

已有角色设定和故事板时，可以一起作为输入：角色图交代外观，故事板交代镜头与情节。

#### 游戏界面与角色、敌人参考

参考图 1![游戏界面与角色、敌人参考：参考图 1](https://best.xiaohu.ai/media/kling-4/demos/g10-c1-1-display.webp)

参考图 2![游戏界面与角色、敌人参考：参考图 2](https://best.xiaohu.ai/media/kling-4/demos/g10-c1-2-display.webp)

参考图 3![游戏界面与角色、敌人参考：参考图 3](https://best.xiaohu.ai/media/kling-4/demos/g10-c1-3-display.webp)

参考图 4![游戏界面与角色、敌人参考：参考图 4](https://best.xiaohu.ai/media/kling-4/demos/g10-c1-4-display.webp)

生成结果 · 片长约 30 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g10-c2-1-fast-ced3c8e65950.mp4)

四张输入包括第三人称游戏界面、探险角色设定、石质洞穴守卫设定及对战界面；约30秒结果有探索、进入石门、与守卫对战等游戏画面，并带任务和状态条。这里是生成视频，不是经验证可操作的游戏。

视频与参考图：可灵官方发布页。点击播放器播放，参考图可点击放大。

#### 宫格参考：高桩舞狮

六格画面参考![宫格参考：高桩舞狮：六格画面参考](https://best.xiaohu.ai/media/kling-4/demos/g10-c3-1-display.webp)

生成结果 · 片长约 15 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g10-c4-1-fast-d5e4c6648171.mp4)

输入为六格舞狮画面；约15秒三维动画结果展示城市高桩上的舞狮，并切到狮身下两位表演者的动作。

视频与参考图：可灵官方发布页。点击播放器播放，参考图可点击放大。

#### 构图参考：线稿人物与莲花

构图线稿 1![构图参考：线稿人物与莲花：构图线稿 1](https://best.xiaohu.ai/media/kling-4/demos/g12-c1-1-display.webp)

构图线稿 2![构图参考：线稿人物与莲花：构图线稿 2](https://best.xiaohu.ai/media/kling-4/demos/g12-c1-2-display.webp)

生成结果 · 片长约 10 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g12-c2-1-fast-66f40f50692f.mp4)

两张简笔线稿分别给出人物面向巨大花朵的侧面构图，以及花朵中心人物的俯视构图；约10秒结果呈现夜色中巨大莲花与人物，并转到俯视花心。

视频与参考图：可灵官方发布页。点击播放器播放，参考图可点击放大。

静态参考也可以分工：游戏界面交代画面布局与镜头形式，宫格图交代动作序列，线稿交代人物与场景的位置、观看角度。游戏界面案例的输出是视频。

---

### 白模与深度视频：把动作预演交给模型

白模是还没有最终材质的简单三维预演：先用灰色人物和几何形体安排站位、动作与镜头，再决定最后长什么样。

#### 白模视频：先安排动作再生成外观

男性角色参考图![白模视频：先安排动作再生成外观：男性角色参考图](https://best.xiaohu.ai/media/kling-4/demos/g11-c3-2-display.webp)

女性角色参考图![白模视频：先安排动作再生成外观：女性角色参考图](https://best.xiaohu.ai/media/kling-4/demos/g11-c3-3-display.webp)

白模参考视频 · 15 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g11-c3-1-a33e4662aa70.mp4)

生成结果 · 15 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g11-c4-1-fast-4fc70721cf46.mp4)

人物图定义外观，灰色白模视频交代动作安排；生成结果换上人物、材质、光影与集装箱环境。

视频与参考图：可灵官方发布页。点击播放器播放，可全屏查看。

输入白模视频时，用角色图补充人物外观；对照结果时，检查预演中的动作安排和镜头是否保留。

深度图视频把画面的距离层次表示为随时间变化的明暗信息。相比完整彩色画面，它更突出形体轮廓与前后关系；具体灰度编码依输入素材而定。

#### 深度图视频：用运动轮廓引导画面

深度参考视频 · 19 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g12-c3-1.web-085df7615cd1.mp4)

角色与场景参考图![深度图视频：用运动轮廓引导画面：角色与场景参考图](https://best.xiaohu.ai/media/kling-4/demos/g12-c3-2-display.webp)

生成结果 · 19 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g12-c4-1.web-1f9aba647ecf.mp4)

黑底灰白动态轮廓提供动作与形体信息；角色图提供红色功夫服和长城环境。结果可与轮廓动作逐段对照。

视频与参考图：可灵官方发布页。点击播放器播放，可全屏查看。

深度视频提供动态轮廓与形体关系，图像指定人物和场景外观。对照结果时，检查动作过程与前后关系。

---

### 创意复刻与后期视频编辑

要沿用已有视频的分镜节奏与叙事结构、更换角色或商品，可以使用“创意复刻”。

#### 创意复刻：把小狗广告改成猫咪版本

原创意参考视频 · 14 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g15-c1-1.web-29bc14c5e2b5.mp4)

猫咪参考图![创意复刻：把小狗广告改成猫咪版本：猫咪参考图](https://best.xiaohu.ai/media/kling-4/demos/g15-c1-2-display.webp)

生成结果 · 14 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g15-c2-1-78055d94ae1a.mp4)

小狗参考片依次呈现特写、全身、抚摸和口袋镜头；结果换成灰白长毛猫，并出现中文文案。本段猫咪结果没有音轨。

视频与参考图：可灵官方发布页。点击播放器播放，可全屏查看。

复刻时对照镜头编排与表达节奏，检查新角色或商品是否适合原来的拍法。猫咪结果文件没有音轨。

#### 创意复刻：蓝色裙装到黑色礼服

参考图![创意复刻：蓝色裙装到黑色礼服：参考图](https://best.xiaohu.ai/media/kling-4/demos/g15-c3-2-display.webp)

原参考视频 · 片长约 12 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g15-c3-1-fast-65477f7f1925.mp4)

生成结果 · 片长约 12 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g15-c4-1-fast-7a171dc5e5c8.mp4)

约12秒参考片展示蓝色纽扣裙装的全貌、领口与面料近景；参考图为黑色V领长裙多角度图，结果借用相似商品全貌和局部特写编排，改成黑色长裙。

视频与参考图：可灵官方发布页。点击播放器播放，参考图可点击放大。

如果手头已经有一段拍摄好的成片，但需要修改其中的演员、背景或穿帮元素，则可以使用 Kling 4.0 的视频编辑功能。根据官方规范，视频编辑最多支持输入 5 段视频（其中 1 段为主视频），单段视频时长在 3 至 30 秒之间，所有输入视频总时长累计不超过 30 秒，推荐搭配参考图共同使用。

#### 视频编辑：人物与场景替换

编辑前原视频 · 7 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g16-c3-1-bfa4d7709fb4.mp4)

人物与场景参考图![视频编辑：人物与场景替换：人物与场景参考图](https://best.xiaohu.ai/media/kling-4/demos/g16-c3-2-display.webp)

生成结果 · 7 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g16-c4-1-0b604d3b5872.mp4)

从红发女子、蓝灰沙发和暖色房间，改为金发红裙女子、白沙发与明亮房间。对照改动区域和保留的镜头构成。

视频与参考图：可灵官方发布页。点击播放器播放，可全屏查看。

已有成片可以增加、删除或替换主体与背景，也可以调整画风、天气、颜色、材质、景别和视角。

#### 视频编辑：在箱中增加小猪

参考图 1![视频编辑：在箱中增加小猪：参考图 1](https://best.xiaohu.ai/media/kling-4/demos/g16-c1-2-display.webp)

参考图 2![视频编辑：在箱中增加小猪：参考图 2](https://best.xiaohu.ai/media/kling-4/demos/g16-c1-3-display.webp)

参考图 3![视频编辑：在箱中增加小猪：参考图 3](https://best.xiaohu.ai/media/kling-4/demos/g16-c1-4-display.webp)

原参考视频 · 片长约 12 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g16-c1-1-fast-dfaf29987eed.mp4)

生成结果 · 片长约 12 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g16-c2-1-fast-0d9594c5800d.mp4)

原视频是多人在古典室内围着木箱，最后给出箱内近景；三张参考图定义粉色卡通小猪的正面侧面等外观；约12秒编辑结果在箱中出现该小猪，保留相近的场景和镜头安排。

视频与参考图：可灵官方发布页。点击播放器播放，参考图可点击放大。

#### 视频编辑：同时替换多名出镜人物

参考图 1![视频编辑：同时替换多名出镜人物：参考图 1](https://best.xiaohu.ai/media/kling-4/demos/g17-c1-2-display.webp)

参考图 2![视频编辑：同时替换多名出镜人物：参考图 2](https://best.xiaohu.ai/media/kling-4/demos/g17-c1-3-display.webp)

参考图 3![视频编辑：同时替换多名出镜人物：参考图 3](https://best.xiaohu.ai/media/kling-4/demos/g17-c1-4-display.webp)

原参考视频 · 片长约 15 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g17-c1-1-fast-96a1b5265266.mp4)

生成结果 · 片长约 15 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g17-c2-1-fast-ecb4ce3720b4.mp4)

约15秒原片为绿色店门前多人依次向镜头走来，包括持包女子、戴帽男子与小女孩；三张角色图提供绿围裙厨师、金发女子与白帽男子，结果改为相应三位穿绿围裙的成年人出镜。

视频与参考图：可灵官方发布页。点击播放器播放，参考图可点击放大。

添加主体后，检查新增元素与原场景的空间关系、边缘和光影。多角色替换后，逐个核对人物是否对应正确，以及外观与服装是否延续。

#### 视频编辑：删除前景遮挡

编辑前原视频 · 7 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g17-c3-1-fast-d8545fed30f7.mp4)

删除遮挡后的结果 · 7 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g17-c4-1-fast-b1d478dab8b0.mp4)

原视频中前景游客遮挡乐队；修改结果减少遮挡。播放时同时检查乐队、喷泉与填补背景的变化。

视频与参考图：可灵官方发布页。点击播放器播放，可全屏查看。

删除遮挡物后，检查露出的背景、乐器、人物边缘和水花，尤其留意有没有不自然的变化。

#### 视频编辑：修改视觉风格

编辑前原视频 · 15 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g18-c1-1-fast-72674df7ab58.mp4)

风格修改后的结果 · 15 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g18-c2-1-c88fba79a88c.mp4)

同一类雪地小狗奔跑画面，从写实外观改为方块体素风格。对照动作进程与材质外观。

视频与参考图：可灵官方发布页。点击播放器播放，可全屏查看。

修改整体风格后，将结果与原片并排看：外观是否达到目标，动作与摄影机运动是否发生意外变化。

---

### 叙事控制：原生 30 秒、关键帧与 8000 tokens 提示词

主模型支持单次原生生成3至30秒。它为一段完整动作、人物互动或情绪变化留出更长时间，但“30秒”表示输出时长上限，并不规定成片只能有一个镜头。

#### 30 秒原生生成案例

人物参考图![30 秒原生生成案例：人物参考图](https://best.xiaohu.ai/media/kling-4/demos/g19-c1-1-display.webp)

生成结果 · 30 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g19-c2-1-a5e87ceb1ce5.mp4)

约30秒的健身房叙事：擦汗、交流、训练、喝水与对镜头讲话。结果包含多个景别及切换，并非一镜到底。

视频与参考图：可灵官方发布页。点击播放器播放，可全屏查看。

健身房样片包含不同景别和切换。上传视频后多次延展、最长到2分钟的续拍功能仍标为即将上线。

#### 长叙事：飞龙与燃烧城堡

参考图 1![长叙事：飞龙与燃烧城堡：参考图 1](https://best.xiaohu.ai/media/kling-4/demos/g19-c3-1-display.webp)

参考图 2![长叙事：飞龙与燃烧城堡：参考图 2](https://best.xiaohu.ai/media/kling-4/demos/g19-c3-2-display.webp)

生成结果 · 片长约 28 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g19-c4-1-fast-5dc274d2f103.mp4)

两张图定义飞龙和燃烧的城堡；约28秒结果展示飞龙掠过海边城堡、喷火、飞行并靠近城墙的多个视角。

视频与参考图：可灵官方发布页。点击播放器播放，参考图可点击放大。

灵活关键帧则把故事中间的重要画面也交代给模型，主模型最多支持10张。首尾帧只指定两端，更多关键帧还可以表达中途的人物状态、场景变化或情节节点。

#### 灵活关键帧：交代中间节点

五幅关键画面![灵活关键帧：交代中间节点：五幅关键画面](https://best.xiaohu.ai/media/kling-4/demos/g20-c1-1-display.webp)

生成结果 · 20 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g20-c2-1-627b6173ee70.mp4)

官方示例用五幅房间画面交代关键节点，再生成约20秒的移动镜头。可以对照已给定的画面与模型生成的过渡。

视频与参考图：可灵官方发布页。点击播放器播放，可全屏查看。

关键帧提供已知画面，节点之间的过渡仍需模型生成。对照输入与结果，检查人物状态、场景变化和动作衔接。

#### 关键帧：同一人物的多种姿态

关键画面参考![关键帧：同一人物的多种姿态：关键画面参考](https://best.xiaohu.ai/media/kling-4/demos/g20-c3-1-display.webp)

生成结果 · 片长约 15 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g20-c4-1-fast-8a9d7e7162bf.mp4)

输入为六格绿发女子在浅绿色房间中的不同画面，含坐姿、卧姿与人物近景；约15秒结果在该人物和房间的不同姿态景别间展开。

视频与参考图：可灵官方发布页。点击播放器播放，参考图可点击放大。

#### 关键帧：街边到拥挤人流

关键画面参考 1![关键帧：街边到拥挤人流：关键画面参考 1](https://best.xiaohu.ai/media/kling-4/demos/g21-c1-1-display.webp)

关键画面参考 2![关键帧：街边到拥挤人流：关键画面参考 2](https://best.xiaohu.ai/media/kling-4/demos/g21-c1-2-display.webp)

生成结果 · 片长约 20 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g21-c2-1-fast-5ee7ed95e6ce.mp4)

两张输入为街边咖啡座与拥挤人流构图；约20秒结果跟随深色衣服女子带包在城市街道奔跑，经过出租车与人群。

视频与参考图：可灵官方发布页。点击播放器播放，参考图可点击放大。

提示词输入上限为8000 tokens；token是文本分词计量单位，不等于中文字数。

#### 短提示词与导演式描述

短提示词生成结果 · 15 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g22-c2-1-18beafe53e2a.mp4)

详细提示词生成结果 · 7 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g22-c4-1-04843fffb8d1.mp4)

左侧由一句简短英文意图生成老人讲话；右侧由详细导演式描述生成街头重逢。两段示例展示不同的提示方式。

视频与参考图：可灵官方发布页。点击播放器播放，可全屏查看。

短提示词把更多细节交给模型补充；需要明确控制时，可以像朋友重逢样例那样，把动作、镜头、光线、环境音和语言要求写清。8000 tokens增加了可写条件的空间，关键仍是条件是否清楚。

#### 运镜与近景：紧张人物表演

官方演示 · 片长约 15 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g23-c2-1-fast-202a44759237.mp4)

约15秒结果呈现男子在暗色斑驳墙边的紧张神态，镜头在其面部、侧身和回头动作附近切换。

视频与参考图：可灵官方发布页。点击播放器播放，参考图可点击放大。

---

### 多元风格、多语种与文字生成

风格参考覆盖日常写实、黏土、故障艺术、毛毡和三维动画等类型。

#### 六种风格样例

Vlog · 15 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g27-c1-1-86a7fce6addd.mp4)

纪录片 · 5 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g27-c2-1.web-e394de1dc3e5.mp4)

黏土动画 · 12 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g27-c3-1-efb066795148.mp4)

故障艺术 · 14 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g28-c1-1.web-4d40d96b6cbd.mp4)

毛毡艺术 · 10 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g28-c2-1.web-215ba9063e92.mp4)

三维赛博动画 · 15 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g28-c3-1.web-605936f0bd37.mp4)

六种官方风格演示，可分别播放。它们展示不同题材与外观方向，并非同一提示词的严格对照。

视频与参考图：可灵官方发布页。点击播放器播放，可全屏查看。

#### 从商品广告到游戏预告等创作场景

下面六组样片分别展示商品广告、UGC带货、游戏预告、短剧、商业设计和国风动画的输入与结果。

#### 应用场景：运动鞋商品广告

参考图 1![应用场景：运动鞋商品广告：参考图 1](https://best.xiaohu.ai/media/kling-4/demos/g24-c1-1-display.webp)

参考图 2![应用场景：运动鞋商品广告：参考图 2](https://best.xiaohu.ai/media/kling-4/demos/g24-c1-2-display.webp)

参考图 3![应用场景：运动鞋商品广告：参考图 3](https://best.xiaohu.ai/media/kling-4/demos/g24-c1-3-display.webp)

生成结果 · 片长约 30 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g24-c2-1-fast-0d7a6b67eb0f.mp4)

输入为运动鞋多角度图与一男一女人物图；约30秒分发样例包含街道、跑步、峡谷和运动鞋近景。文件长度不等于模型原生时长上限变化。

视频与参考图：可灵官方发布页。点击播放器播放，参考图可点击放大。

#### 应用场景：UGC服装带货

参考图![应用场景：UGC服装带货：参考图](https://best.xiaohu.ai/media/kling-4/demos/g24-c3-1-display.webp)

生成结果 · 片长约 15 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g24-c4-1-fast-f7dd914fda5b.mp4)

参考图为店内穿黑色短外套的女子；约15秒竖屏结果展示人物对镜讲话、外套面料与拉链细节。

视频与参考图：可灵官方发布页。点击播放器播放，参考图可点击放大。

#### 应用场景：尾帧控制游戏预告结尾

尾帧图![应用场景：尾帧控制游戏预告结尾：尾帧图](https://best.xiaohu.ai/media/kling-4/demos/g25-c1-1-display.webp)

生成结果 · 片长约 15 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g25-c2-1-fast-6e88823868c9.mp4)

官方标为游戏预告片尾帧的参考图是双人武侠对战宣传构图；约15秒结果为两名角色交手与金紫色视觉效果，并呈现宣传文字画面。

视频与参考图：可灵官方发布页。点击播放器播放，参考图可点击放大。

#### 应用场景：近景对白短剧

参考图![应用场景：近景对白短剧：参考图](https://best.xiaohu.ai/media/kling-4/demos/g25-c3-1-display.webp)

生成结果 · 片长约 15 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g25-c4-1-fast-95558214d387.mp4)

参考图为现代高层公寓中的一男一女；约15秒竖屏结果包含争执、人物面部近景与互动，男子后段触摸脸颊。

视频与参考图：可灵官方发布页。点击播放器播放，参考图可点击放大。

#### 应用场景：商业海报动态化

首帧图![应用场景：商业海报动态化：首帧图](https://best.xiaohu.ai/media/kling-4/demos/g26-c1-1-display.webp)

生成结果 · 片长约 14 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g26-c2-1-fast-ef77fc7c8d0b.mp4)

首帧海报含Kling4.0文字、地球、涂满彩色颜料的手和城市人群拼贴；约14秒结果穿行手指与地球等视觉元素，回到海报式整体构图。

视频与参考图：可灵官方发布页。点击播放器播放，参考图可点击放大。

#### 应用场景：山水与仙鹤动画

参考图![应用场景：山水与仙鹤动画：参考图](https://best.xiaohu.ai/media/kling-4/demos/g26-c3-1-display.webp)

生成结果 · 片长约 7 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g26-c4-1-fast-cc17a67c770f.mp4)

参考图为青绿山水、云端人物与仙鹤；约7秒动画中仙鹤飞过人物，山水与飘带形成移动层次。

视频与参考图：可灵官方发布页。点击播放器播放，参考图可点击放大。

- **商品广告与UGC带货**：用商品图明确外观，人物图明确出镜形象，逐镜核对商品细节、面料与拉链等局部。
- **游戏预告**：要收束到宣传海报时，用尾帧指定结束构图，检查前面动作如何衔接，以及结尾文字。
- **短剧**：重点检查人物近景的表情、口型和肢体互动。
- **海报与国风画面动态化**：用首帧交代主视觉，检查运动后的构图、文字和空间层次。

#### 多角色对话与多语种能力的官方样例

咨询台 · 首帧![多角色对话与多语种能力的官方样例：咨询台 · 首帧](https://best.xiaohu.ai/media/kling-4/demos/g29-c1-1-display.webp)

咨询台 · 生成结果 · 15 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g29-c2-1-b983b7655124.mp4)

角色参考![多角色对话与多语种能力的官方样例：角色参考](https://best.xiaohu.ai/media/kling-4/demos/g29-c3-1-display.webp)

机舱 · 生成结果 · 7 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g29-c4-1.web-f450c23b77a1.mp4)

咨询台交接地图与机舱人物互动的官方演示。可以播放查看轮流讲话和人物表演；具体语种覆盖见正文参数。

视频与参考图：可灵官方发布页。点击播放器播放，可全屏查看。

语音支持中、英、日、韩、西班牙、葡萄牙、德、法、印地语等。中文覆盖北京、台湾、东北口音及四川方言、粤语等，英语覆盖美式、英式、印度口音等。做多语言内容时，分别检查台词、发音、说话角色与口型。

#### 画面文字与动态排版

数字教学与画面文字 · 15 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g30-c1-1.web-5632d9438bb2.mp4)

动态英文排版 · 12 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g30-c2-1-f665bad7131c.mp4)

从彩色数字教学到蓝黄动态英文排版，观看画面中文字本身、出现位置和变化过程。正式文案仍需逐字检查。

视频与参考图：可灵官方发布页。点击播放器播放，可全屏查看。

模型支持中、英、日、韩、德、法等多语种画面文字，以及Logo和Emoji。用于片头、教学字幕或品牌标语时，检查文字是否易读，以及动态变化中是否出现错字或变形。

---

### Kling 4.0 Flash：高频创作的轻量化方案

Flash面向需要快速周转的高频创作与分镜探索。

官方单列的 Flash 规格如下：

- **功能支持范围**：支持文生视频、首帧图生视频以及全能参考；
- **生成时长**：支持 3 至 20 秒；
- **画面分辨率**：720p；
- **动态范围**：8-bit SDR。

主模型支持3至30秒、720p/1080p/4K，以及21:9、16:9、1:1、9:16和智能比例。选择Flash时按上表核对功能、时长与分辨率，其他能力以实际界面为准。

#### Flash 的首帧图生视频

首帧图![Flash 的首帧图生视频：首帧图](https://best.xiaohu.ai/media/kling-4/demos/g31-c3-1-display.webp)

生成结果 · 5 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g31-c4-1-fast-1327ddd18fb5.mp4)

首帧武术画面与约5秒的动态结果。此处秒数是样片长度，Flash 的生成时长与分辨率规格见正文对照。

视频与参考图：可灵官方发布页。点击播放器播放，可全屏查看。

#### Flash：双人物与户外场景

参考图 1![Flash：双人物与户外场景：参考图 1](https://best.xiaohu.ai/media/kling-4/demos/g31-c1-1-display.webp)

参考图 2![Flash：双人物与户外场景：参考图 2](https://best.xiaohu.ai/media/kling-4/demos/g31-c1-2-display.webp)

参考图 3![Flash：双人物与户外场景：参考图 3](https://best.xiaohu.ai/media/kling-4/demos/g31-c1-3-display.webp)

生成结果 · 片长约 15 秒

[视频/音频](https://pic.xiaohu.ai/jiedu-media/kling-4/g31-c2-1-fast-62a107b974cc.mp4)

三张图给出男子头像、女子头像和峡谷草地场景；约15秒结果为穿户外服背包的一男一女在峡谷边相对讲话，含全景与人物近景。

视频与参考图：可灵官方发布页。点击播放器播放，参考图可点击放大。

---

### 创作界面与工作流升级

![统一输入框界面](https://best.xiaohu.ai/media/kling-4/official-84.webp)

统一输入框：在同一处填写提示词、添加参考素材。（官方界面截图）

在统一输入框中添加提示词、参考图、视频、主体或音色，再设置生成参数。生成多个版本后，用宫格视图同屏比较；需要查看单条参数并微调时，切换列表视图。

![时间线创作界面](https://best.xiaohu.ai/media/kling-4/official-87.webp)

时间线：预览与素材排列同屏。（官方界面截图）

在时间线上预览视频，并在需要的位置修改或插入素材，边看边调整。

![画布界面](https://best.xiaohu.ai/media/kling-4/official-88.webp)

画布：通过节点与连线组织素材和结果。（官方界面截图）

将角色图、镜头节点与不同生成结果放到画布上，用连线组织它们的关系；需要协助执行任务时，可以向内置Agent描述需求。

---

### Agent 与 MCP：接入与生成操作指南

在 AI 助手中使用可灵，可以选 MCP（模型上下文协议）连接；在终端或脚本中调用，可以选 CLI（命令行工具）。同一个助手内配置其中一种即可。下面按[可灵官方操作指南](https://kling.ai/app/mcp/guide)连接、提交任务并获取结果。

#### 路线一：通过 MCP 接入 AI 助手

1. **配置 MCP 连接（以 Cursor 为例）**：
  - 打开 Cursor 设置，依次进入 `Settings → Tools & MCPs → Add Custom MCP`。
  - 添加名为 `klingai` 的服务，URL 配置为 `https://kling.ai/mcp`。
  - 点击 `Connect`，在弹出的浏览器页面中登录可灵账号完成授权。
  - 若使用 Claude，可在桌面端或网页端打开 `Customize → Connectors → Add custom connector`，填入相同 URL `https://kling.ai/mcp` 后连接并登录。
2. **查询可用模型与参数**：
  - 首次连接后，先让 Agent 调用 `who_am_i` 工具，查询当前账号可用的具体模型列表及对应输入规格。
  - 选择返回列表中的4.0模型，按它给出的格式提供全能参考或关键帧条件。
3. **自然语言任务模板（教学示例）**：
  ```markdown
  请先调用 who_am_i 查询我账号当前可用的 4.0 视频生成模型及输入参数格式；
  以我提供的产品图保持商品外观与细节质感，按照分镜要求生成 5 秒运镜视频；
  提交前列出模型、时长和画幅，检查付费积分余额与官方计费规则，再提交生成、查询进度并返回成片链接。
  ```

#### 路线二：通过 CLI 终端与脚本工作流

1. **安装与登录**：
  - 在终端通过 npm 安装官方全局命令行工具：
    ```bash
    npm i -g @klingai/cli-global --registry=https://registry.npmjs.org
    ```
  - 安装后登录可灵账号，在浏览器中完成授权：
    ```bash
    kling login
    ```
  - 登录后先查询账号可用的模型与输入参数：
    ```bash
    kling who_am_i
    ```
  - 查看全部支持的命令与参数列表：
    ```bash
    kling --help
    ```
  - 若希望由支持Skill的AI助手协助配置CLI，也可以按官方的快捷路线运行 `npx skills add klingai-tech/skills`，再让助手完成安装与授权。

#### 通用生成语法、异步任务与结果保存

在终端或脚本中提交图生视频任务时，官方通用命令语法如下（本地图片请替换为真实绝对路径并加上半角双引号）：

```bash
kling image_to_video --image "/path/to/product.png" "产品固定在展示台中央，镜头平稳推进环绕，高光反射自然"
```

提交与取回结果按以下顺序处理：

- **补充 4.0 参数**：这条通用命令没有指定模型，默认版本未必是4.0。要用4.0，先根据 `who_am_i` 和命令帮助返回的实际选项补齐模型与生成参数。
- **异步查询结果**：任务提交后会异步返回 `generation_id`。把下面的 `GENERATION_ID` 替换为实际返回的任务ID，再查询进度：
  ```bash
  kling query_tasks GENERATION_ID
  ```
- **及时保存资产**：任务成功完成后，视频下载地址将包含在返回数据的 `works[].url` 列表中。官方生成的成片下载链接**有效期限为 24 小时**，拿到后及时下载保存。
- **积分与工作区限制**：MCP 与 CLI 当前仅支持消耗个人工作区（Personal）的付费积分，团队空间（Team）权益与官方赠送的免费积分当前均不可用。计费规则与官方平台一致；外部调用不享受闲时免费生成。

来源Kling 4.0 全面升级！全能班底，你和可灵。可灵 AI 团队·[查看主材料](https://klingai.com/release-note/release-notes/Kling_4)延伸[Kling MCP & CLI 官方操作指南](https://kling.ai/app/mcp/guide)
KLING 4.0 / 制作方法速览

## 可灵4.0正式发布：74段视频演示，看懂可灵4.0到底升级了什么

图片表达外观，视频示意动作与运镜；关键帧交代重要节点，编辑修改已有结果。
74 段官方视频与 80 张参考图见正文。本页先回答：准备什么素材、怎样交代变化、用哪个版本。

可灵 4.0 用文字和参考素材生成、修改视频，Flash 面向高频创作。先决定什么要保留、什么要变化，再挑选参考。

想保留一段广告的拍摄节奏，却把饮品换成自己的商品？可以同时提供拍法参考视频和商品图，再写清分别借用哪一部分。参考分工，是使用这一代模型的关键。

15 项
单次参考素材总上限（图≤10/视频≤5）

30 秒
主模型单次原生生成上限

8000
提示词容量（tokens，不等于中文字数）

### 先分工：每份参考负责哪一部分

用图片交代人物长相、商品和场景，用视频示意动作、运镜或拍摄节奏，再用提示词说明每份素材要借用哪一部分。准备素材时，可以按下面的用途来分配：

静态图像
最多 10 张：人物、商品、场景与故事板各有用途。生成后检查外观、服装和大小关系是否延续。

动态视频
最多 5 段、累计 ≤ 30 秒：示意动作顺序、运镜和拍摄节奏；人物与场景外观另给参考图。

白模与深度
白模先安排站位、动作与镜头；深度视频突出动态轮廓和前后关系。配合外观图，对照生成结果检查是否延续。
↓ 选用参考，再说明各自用途

提示词分工
明确写出每份素材的用途，以及希望保留和改变什么。8000 tokens 是容量上限；写清条件比填满长度更重要。

**上限要同时满足：**总数 ≤ 15，且分类上限同时满足：10 图 + 5 视频 + 1 音色 = 16 项，已经超限。主体 ≤ 7 个，其中视频主体 ≤ 3 个；跨类型计数以界面为准。
      

        生成后检查：快速动作中的脸与手脚、机位与空间衔接；对白要对照台词与口型，并试听人声和环境音。官方称口型与声画同步有所改善。
      

### 再交代节点，或修改已有成片

主模型单次生成 3 至 30 秒，最多支持 10 张关键帧。只需指定结尾构图时给尾帧；中途必须经过的状态，用关键帧表达。下面是节点分工示意：

01 / 起势
首帧 / 设定构图
交代初始角色姿态、光影氛围与场景机位，确立视觉起点。

02 / 转折
中途 / 关键节点
交代中途人物状态、场景变化或情节节点。

03 / 收束
尾帧 / 终局定版
指定希望到达的结束画面，例如群像或海报构图。

**节点之间的过渡仍由模型生成，需要检查衔接；30 秒也可以包含多个镜头。**

针对已生成成片的二次调整，视频编辑支持输入最多 5 段视频（含 1 段主视频，单段 3-30 秒，总长 ≤ 30 秒）。可以在已有视频中增加、删除或替换主体与背景，调整画风、天气、颜色与材质。改后仍需核对边缘、光影、角色对应与动作是否意外变化。

### 按成片要求选版本，再接入工具

先核对时长、分辨率与输入方式，再决定使用主模型或 Flash。

**待上线：**1080p / 4K 的 10-bit HDR，以及最长 2 分钟续拍，均仍标为即将上线。

Kling 4.0 主模型 3—30 秒

- 分辨率：720p / 1080p / 4K
- 生成时长：3 至 30 秒原生
- 10-bit HDR：1080p / 4K 待上线
- 全能参考、关键帧与视频编辑

Kling 4.0 Flash 高频探索

- 分辨率：720p 快速输出
- 生成时长：3 至 20 秒
- 色彩规格：8-bit SDR
- 聚焦文生视频、首帧生视频与全能参考快速周转

要在 AI 助手内调用，可连接 MCP 地址 `https://kling.ai/mcp` 并登录授权；终端使用 CLI。首次使用先查账号实际可用模型与参数：

kling who_am_i

        接入后：按返回规格选 4.0 模型 → 提交任务 → 用 generation_id 查询结果 → 24 小时内保存下载链接中的视频。外部调用使用个人工作区付费积分，不享受闲时免费生成。
      

↑ 正文结束
✓ 本篇全文免费开放

会员可复制、下载全文 Markdown，并解锁更多深度内容与播客。
[订年卡 $59/年](https://best.xiaohu.ai/buy/?plan=year)[看权益对比 →](https://best.xiaohu.ai/membership/)

[阅读原文 ↗](https://klingai.com/release-note/release-notes/Kling_4)

📮 新解读第一时间进邮箱

读完觉得有用？留个邮箱，每篇新解读发布就送达，随时退订。

### 相关解读

[论文 微软开源 Code Video Model 模型：用代码生成视频 10-13 · 9 分钟](https://best.xiaohu.ai/article/code-video-model/)[AI 实操 小商家怎样用 AI 做视频广告：从产品图到能讲清卖点的素材 10-09 · 约 12 分钟](https://best.xiaohu.ai/article/higgsfield-small-business-video-ads/)[深度 案例：给企业 AI Agents 装上“长期记忆”和“企业上下文”：V7 如何用 Context Graph 跑通复杂商业工作流 09-23 · 约 8 分钟](https://best.xiaohu.ai/article/v7-context-graph-institutional-memory/)
