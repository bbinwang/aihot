---
title: "Seedream 5.5 用户手册：同一张图连改 100 轮，没改的地方像素级保持"
date: 2026-11-10T00:00:00.000Z
tags: ["AI 实操", "Seedream 5.5", "即梦", "字节跳动", "AI 生图", "提示词", "聚合"]
summary: "字节跳动发布图像创作模型 Seedream 5.5，多轮编辑更稳，还能直接生成透明素材。配套的用户手册按用途给出一组组提示词和成图，照着抄就能上手。"
---
> **原文链接**: [https://bytedance.larkoffice.com/wiki/HemGw60SaiOEr7kAFDLcMIqin4l](https://bytedance.larkoffice.com/wiki/HemGw60SaiOEr7kAFDLcMIqin4l)
> **来源**: bytedance.larkoffice.com
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/seedream-5-5-user-guide/) · 2026/11/10
> **说明**: 本文由 AIHot汪 自动聚合(原文即中文,未翻译)。正文取自小互 AI 解读

---

全文 Markdown · 会员

作者：字节跳动11-10 · 约 36 分钟⚑ 产品发布

[视频/音频](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/LjWubKsehoD7gIxFoWccgpzvn2g.mp4)

多轮编辑**001**同一张图最多连改 100 轮
RGBA**透明**直接生成透明、半透明素材
文字**0.4%**严重错字、漏字的比例

字节跳动 Seed 团队发布了新一代图像创作模型 Seedream 5.5。官方对它的要求很实在：图像模型要进专业团队的正式流程，就得在交付标准、时间和成本的约束下，持续产出能用的结果。这一版围绕这个目标做了三项升级：

- **多轮编辑更稳：**没让它改的区域做到像素级保持，颜色不偏，细节和画质不随轮数往下掉，官方说支持围绕同一张作品连续改到 100 轮。
- **原生透明素材：**直接输出带透明通道的图，透明、半透明都行，省掉后期抠图修边。
- **质感更自然，文字更清晰：**光照、材质、皮肤纹理更接近真实拍摄，密集小字和笔画多的字写得更准。

官方评测请资深评测专家打分，覆盖电商、营销、影视、游戏、办公、服装设计六类场景。和上一代 Seedream 5.0 Pro 相比，六类场景的生成效果评分和可用率都有提升，其中影视、办公两类的可用率达到上一版的两倍以上。文字方面，生成图里出现严重错字、漏字、结构错乱的比例降到 0.4%，轻微问题降到 1.7%。和 GPT Image 2.5 Sunburst、Nano Banana 2.1 相比，官方的说法是在文字结构、文生图真实感两项上领先。模型正陆续在即梦、豆包、豆包工作、火山方舟上线。

即梦随模型给出了一份用户手册。它先讲四项能力，每项配一句提示词写法；再按个人玩法 5 类、商用场景 7 类，摆出一组组「提示词 + 生成结果」；最后是两张词表（风格词、美学词）和 9 条写提示词的技巧。

这份手册值得细看的地方，在它示范了一种新的用法：先出一张图，再一轮一轮改到位。过去改图像抽奖，改一处，别处也跟着变，所以大家习惯一句话写到底、不满意就整张重来。5.5 的三项升级，加上手册里反复出现的那句「其他部分保持不变」，都在把出图这件事变成改稿。下面按手册的顺序走一遍，示例图全部放上，提示词照原文给出，可以直接抄去用。示例都是官方挑选过的，自己用的效果要以实际为准。

这份手册里有什么一格是一组示例个人玩法 · 5 类46 组示例多轮精准编辑*9*透明素材*3*人像编辑*20*社媒素材*9*风格迁移*5*商用场景 · 7 类50 组示例多轮精准编辑*2*透明素材*2*办公*8*电商场景*12*营销活动*8*UI/UX*4*影视/游戏*14*另有：4 项能力各一句写法 · 风格词 22 个 · 美学词 18 组 · 提示词技巧 9 条

按手册的章节数的：每组示例是一条提示词配它的生成结果，演示视频也算一组。

### 这一版升级了什么

#### 同一张图连改 100 轮，没改的地方不动

用 AI 改过图的人大概都遇到过：让它把杯子换个颜色，人脸悄悄变了一点；再改一轮，背景又糊了一点。官方博客解释了原因：上一轮的输出会成为下一轮的输入，每一轮的细微偏差随着编辑次数不断累积，最后变成细节丢失和画质退化。

下面这张图把这个过程真的算了一遍。同一张像素小图，每轮只让小蛇往右走一格。左边每轮把整张图重画一遍，每个像素都带一点点偏差；右边只动小蛇那几格，其余像素原样保留。

示意图 · 偏差是怎么累积的
**第 000 轮**

每轮整张重画，每次带一点偏差0.0没改的地方，和原图平均差多少（0 到 255）
只动要改的那几格，其余照抄0.0没改的地方，和原图平均差多少（0 到 255）

**示意图：**左边每轮的偏差幅度是我们为演示设定的，不代表任何真实模型的测量值。它说明的是道理：每轮只偏一点点，100 轮叠起来就很明显；右边那种「没点名的像素一个不动」，就是官方说的非编辑区域像素级保持。

Seedream 5.5 为此做了专项训练。官方放出的演示里，围绕同一张作品连续改了 100 轮，每一轮都以上一轮的结果为基础。衣服、配饰、桌上的物件换过很多轮之后，还能精细地改戒指、镜框这样的小东西，配饰和皮肤的接触、遮挡、光影也接得上。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/sd55-e02c-81f62174.mp4)

官方演示：围绕同一张作品的 100 轮连续编辑，每轮都在上一轮结果上接着改。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/Ar9FbOSQZovlWRxOD1fcMoxtnwb.mp4)

手册里的同一组演示（下棋男子）：每一轮只给一句修改要求，画面角上的数字一路跳到 021、058、084、098。

手册里还有一个更好懂的例子：一局贪吃蛇，是一轮一轮「改」出来的，一共 37 轮。每一轮只让蛇往前走一步，或者换一屏内容，屏幕外面那圈电视机边框始终是同一个。

![贪吃蛇多轮编辑：第 1 轮](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/KNrkbZX8Noj2k5xgCeRcXe9Nnig.webp)![贪吃蛇多轮编辑：第 2 轮](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/ArOtbaOj9of0GzxDJnVctlBenxb.webp)![贪吃蛇多轮编辑：第 3 轮](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/UskobMg4ao5ryuxsDeicBNf9nsh.webp)![贪吃蛇多轮编辑：第 4 轮](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/C6lrbWFQ8oOV9KxZXDBc5gDsnYg.webp)![贪吃蛇多轮编辑：第 36 轮](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/GBOsb9WSworGv1xgtakcIF37nMg.webp)![贪吃蛇多轮编辑：第 37 轮](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/W9btbR2q5oyr1kxtda2cPMR6n0b.webp)第 1 轮第 2 轮第 3 轮第 4 轮第 36 轮第 37 轮

手册给出的第 1 到 4 轮和第 36、37 轮。轮播时盯着屏幕外面那圈边框和右上角的按钮看：37 轮下来，没改的地方保持住了。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/DRzabsPskow2t9xV9Amcp5Pln7d.mp4)

37 轮的结果连起来播，就是这段贪吃蛇动画。

官方还用另外几组演示说明两件事。一是东西越加越多时，还能单独改其中一样：花枝和装饰经过多轮增添、替换后，仍然可以调整指定那朵花的形态或材质。二是空间关系跟得上：房间里的家具一轮轮换，同一个箱子不断换位置，透视、遮挡和投影每一轮都对得上，原来被挡住的部分也能合理补出来。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/WkXcbNhfPofjAhxlZ3ocrXGjnFH.mp4)

[视频/音频](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/sd55-e06c-1d0fd793.mp4)

左：桌上的一块石头，一轮轮添成一组花艺静物。右：一只空瓶，一轮轮添上花枝、题字，最后多了一只猫。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/sd55-e01c-82a14c50.mp4)

官方演示：一间旧书房被一轮轮改造成彩色房间，黄色箱子换了几次位置。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/FGr5bGh3Po7JrPxgGRHch0kynxf.mp4)

[视频/音频](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/sd55-e05c-3b26ab45.mp4)

左：手册里的房间改造片段。右：官方演示，人像上一轮轮换发型、戴配饰、贴便签。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/sd55-e03c-b830455e.mp4)

官方演示：手表屏幕上的时间一轮轮更新，从 12:39 走到 13:00。

*手册给的写法*圈定明确的修改对象、说清变化，"把图中 XX 改成 XX 颜色 / 材质 / 形态/内容"

#### 直接生成透明图，不用再抠

做设计的人都知道抠图有多烦：头发丝、羽毛、玻璃杯，边缘总有一圈抠不干净的杂色。Seedream 5.5 换了思路，生成的时候就把「哪里是空的」一起算出来，直接给你一张背景透明的图。

普通图片的每个像素存三个数：红、绿、蓝（RGB）。透明图多存一个数，叫 A（Alpha，透明度）：0 是完全透明，255 是完全不透明，中间的数就是半透明。RGBA 说的就是这四个数。下面这张贴纸是页面现场画出来的，白线扫到哪一行，就把那一行每个像素的 A 值读出来。

示意图 · 第四个数管透明
底：棋盘格

R **0**红G **0**绿B **0**蓝A **0**透明度
第 70 行每个像素的 A 值（柱子越高越不透明）

**A = 0**没有柱子：完全透明，露出下面的底**0 到 255 之间**粉色柱子：半透明，比如玻璃珠、投影、边缘那一圈**A = 255**深色柱子：完全不透明

**示意图：**贴纸是我们画的。换什么底都不用重新抠，因为每个像素自己带着透明度；边缘和玻璃珠的 A 值在 0 和 255 之间，所以放到任何底上都能自然地融进去。

官方对这项能力的描述是：直接输出带 Alpha 通道的透明或半透明图像，细致处理轮廓边缘和透明区域。演示里一只展开翅膀的雪鸮，翅尖的羽毛、羽毛之间的小空隙、爪子的轮廓都保留了下来。官方资料还提醒了一点：玻璃这类透明材质不等于透明背景，哪里半透明、哪里要镂空，得在提示词里写出来。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/FU55bEQnuo8kJrxftYEcs4yOnTg.mp4)

同一批贴纸换了几种底色，照样能用。

*手册给的写法*提示词包含“透明背景”、“PNG 透明底”、“无背景”、“alpha 通道”时触发生成

#### 照片更像拍出来的

AI 图最容易露馅的地方是「太完美」：皮肤油亮、高光过曝、光线哪儿都亮。这一版改善的就是写实场景里的光照、材质和皮肤纹理，减少过度油亮、过曝和斑驳。手册把它拆成四点：构图自然、皮肤质感提升、神态动作真实、光影关系和谐。

![餐馆里托着下巴的老人，身后是红色霓虹灯](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/METWbl0AYojzgCx0vACcvMDmnvb.webp)![餐厅里用餐的客人，画面像随手抓拍](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/H4lBbag1SoaJdvxlqszc8VcUn5g.webp)![酒柜上的白猫，闪光灯直打的质感](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/Mrm3bnCdaoQmayxaHT0c3SmmnVc.webp)![逆光里趴在毯子上睡觉的猫](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/P5yNbNi15obPBfxlnZgc2Gu2nyf.webp)

手册「真实质感」的四张示例：有人挡住镜头一角、有闪光灯直打的生硬感、有逆光里的灰尘和落叶，像随手拍下的照片。

![回眸的女孩和抱着婴儿的父亲](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/4xfa4mw8l7y9u.webp)![紫色布帘和雨中赛车](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/4xfa4mw8l80ol.webp)![五张写实生活照拼图](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/4xfa4mw8l7mqf.webp)

官方博客的示例。上：女孩肩部从高光到暗部的过渡、逆光里的碎发；父亲手臂上的窗边柔光。中：布帘的褶皱投在粗糙的黄墙上；雨中赛车的车身反光和车后的水雾。下：更多生活场景。

![雪山与湖泊的风光照](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/sd55-004-db02817d-l.webp)

官方项目页的风光大图：雪山、冰川湖和近处的红色灌木。

*手册给的写法*图片类别（影视/写真等） + 整体调性 + 谁在什么场景做什么 + 镜头手法及质感

这条公式套到手册「场景设定」里的一条提示词上，是这样对应的：

拆一条手册里的提示词

实拍照片，中景，地铁车厢里一个戴耳机的高中生满脸惶恐地盯着手机屏幕，车窗外飞速划过的隧道灯光，35mm 镜头

**图片类别：**实拍照片**谁在什么场景做什么：**高中生、地铁车厢、盯着手机**镜头手法及质感：**中景、35mm 镜头
![地铁车厢里戴耳机的高中生惶恐地盯着手机，窗外是拖影的灯光](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/WnfVbE9LqoSSXfxlG8rc06QdnYb.webp)

颜色是我们对照公式标的。这条没有单独写「整体调性」，惶恐的表情和飞速划过的灯光已经把气氛带出来了。

#### 小字和笔画多的字，写得更准

海报、信息图、商品标签最怕错字。这一版提升了密集小字的生成和排布，笔画多的汉字在小字号下也能看清。手册列的要点是：复杂场景文字准确、小字清晰、结构合理、画布排版和配色优化。

![人工智能创新应用交流会长图海报，中文小字密集](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/Ytz3b8DRRouZOTx21Iucw4zonac.webp)![宋代点茶信息图，步骤与茶具配小字说明](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/XmyQbUgmWol3BVxhi6CcF1UVnPe.webp)![赛博朋克哈士奇英文海报](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/Mxjnb0QuBoadCtxeK0ZclhsZngb.webp)![游戏《雾与遗迹》宣传图，地图结构与线索小字](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/ZbCcbL8dkoncgExQ61wc5c9inJd.webp)

手册「文字结构」的四张示例：会议长图、宋代点茶图解、英文海报、游戏设定页。小字都是模型直接生成的。

![蓝闪蝶图解，八组局部放大图配中文小字](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/4xfa4mw8l84mx.webp)![莎士比亚主题英文报纸版面](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/4xfa4mw8l891l.webp)

官方博客的两张示例。上：蓝闪蝶图解，八组图文介绍触角、翅脉、翅鳞，局部放大图旁的中文说明字号很小。下：莎士比亚主题的报纸版面，肖像和插图之间穿插多段英文小字。

官方用「文字崩坏率」量这件事，意思是生成图里出现错字、漏字、结构错乱的比例，测试覆盖中英文和密集小字。

官方评测 · 文字崩坏率，越低越好严重崩坏Seedream 5.5*0.4%*Seedream 5.0 Pro*2.8%*Nano Banana 2.1*1.7%*GPT Image 2.5 Sunburst*0.7%*轻微崩坏Seedream 5.5*1.7%*Seedream 5.0 Pro*2.6%*Nano Banana 2.1*3.0%*GPT Image 2.5 Sunburst*7.4%*

数据来自官方博客的评测图，两组用同一把尺子画。严重崩坏从上一代的 2.8% 降到 0.4%；轻微崩坏从 2.6% 降到 1.7%。评测由官方组织。

比例低不等于不会错。手册 UI 一节那组地标图标，6 个英文地名错了 5 个，比如东方明珠标成 NEW YORKA。要紧的字，照下面这句写法逐字给出来。

*手册给的写法*生成指定文字内容时，需用“”引出具体文字，并可进一步说明文字之间的层级关系

#### 官方评测：和上一代比，和对手比

除了文字崩坏率，官方还做了两组评测。第一组看六类生产场景里的可用率和平均主观评分，只和上一代比。

![六类生产场景的可用率和平均主观评分雷达图，Seedream 5.5 对比 5.0 Pro](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/4xfa4mw8pcanf.webp)

官方评测图。左：可用率（Usability Rate）；右：平均主观评分（MOS）。六个方向依次是电商、营销、影视、游戏、办公、服装设计，顶上是总体。深色线是 5.5，浅色线是 5.0 Pro；影视（Film & TV）和办公（Office Productivity）两个方向上，5.5 的可用率是上一版的两倍以上。按图上刻度估读，5.5 的总体可用率约两成（上一版约一成），最高的影视约三成。

第二组看文字结构和真实感，做法是让评测专家比较两个模型的生成结果、选更好的那个，用 GSB（Good/Same/Bad）计分。数值为正，表示专家更偏向 Seedream 5.5。

官方评测 · 专家更偏向谁（GSB）图生图文生图负值：对手更受偏向文字结构对比 GPT Image 2.5 Sunburst图生图*+20.72%*文生图*+16.01%*对比 Nano Banana 2.1图生图*+3.82%*文生图*+5.23%*对比 Seedream 5.0 Pro图生图*+18.54%*文生图*+5.00%*真实感对比 GPT Image 2.5 Sunburst图生图*+36.05%*文生图*+37.29%*对比 Nano Banana 2.1图生图*-6.18%*文生图*+21.79%*对比 Seedream 5.0 Pro图生图*+55.62%*文生图*+39.44%*

数据来自官方博客的评测图。十二项对比里有一项是负的：真实感的图生图任务上，专家更偏向 Nano Banana 2.1（−6.18%）。所以官方的结论写的是「文字结构、文生图真实感」领先。和上一代比，四项都是正的，真实感图生图 +55.62% 最高。
[站内延伸字节跳动发布 Seedream 5.0 Pro：一张图可拆十余个独立图层，密集图表实景一次生成上面评测里的对照组就是它。想知道上一代能做什么，看这篇。](https://xiaohu.ai/article/seedream-5-pro-launch/)

四项能力，四句写法
01 · 多轮编辑**圈定对象，说清变化**

指定区域编辑稳定、多轮细节不劣化、精准指令遵循。
把图中 XX 改成 XX 颜色 / 材质 / 形态 / 内容
02 · RGBA**写上触发词**

支持直接生成全透明和半透明图。
透明背景 · PNG 透明底 · 无背景 · alpha 通道
03 · 真实质感**四段拼起来**

构图自然、皮肤质感提升、神态动作真实、光影关系和谐。
图片类别 + 整体调性 + 谁在什么场景做什么 + 镜头手法及质感
04 · 文字结构**要写的字放进引号**

复杂场景文字准确、小字清晰、结构合理。
用“”引出具体文字，再说明文字之间的层级关系

手册「4 大能力」一节的要点，每项能力各配一句提示词写法。

### 个人玩法：5 类

这一部分是手册的「toC 玩法」，都是普通人拿手机里的照片就能试的。带「原图 / 结果」的对比图会自己左右扫，也可以用手指拖。

#### 1. 多轮精准编辑：框一下、画一下，就知道改哪里

一轮一轮改的效果，前面的下棋男子和贪吃蛇已经演示过。手册给这类操作的通用句式是：

*手册给的写法*将图中XX形态/动作改为XX形态/动作，其他部分保持不变

**框选：**在图上画框、画圈、标数字，提示词里直接说「黄框」「红圈」「1 放在 2 的位置」，模型认得这些记号。

框选 · 把两个人放进指定位置图1![框选 · 把两个人放进指定位置：图1](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/RrMZbxvPIoADKfxRKfpcxXMNnAd.webp)图2![框选 · 把两个人放进指定位置：图2](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/O1NWbmpjwoHhTZxtW6BcSW1ynZc.webp)图3![框选 · 把两个人放进指定位置：图3](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/Nte0b3zUfo3ssRxBR9hcZ8f1nXc.webp)输出![框选 · 把两个人放进指定位置：输出](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/Pr0zbq6uIox6y1x0vPCcfqfUnXc.webp)*提示词*将图二人物放入图一黄框位置，将图三人物放入图一红框位置，图二女生挽着图三女生的手，生成一张胶卷相机质感的合影，并在图片左下角竖直排列写上拍摄时间“2004.04.17”

框选 · 按编号挪东西![框选 · 按编号挪东西：原图](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/NIAOblTnPowm4txijlqcyy8anef.webp)![框选 · 按编号挪东西：结果](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/GcJAbXhzFotN7mxCIhac7dPTnPX.webp)原图结果*提示词*1放在2的位置，3换成几本书籍，4去掉

框选 · 删掉圈出来的路人![框选 · 删掉圈出来的路人：原图](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/J6EZbTAHfoHqk7xH5Yrc6vnhnpf.webp)![框选 · 删掉圈出来的路人：结果](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/W8KublMyKo3qz0xKeizc4aE8njd.webp)原图结果*提示词*删除图中红圈位置的人物，其他主体和背景元素保持不变。

**草图 / 色卡：**一张火柴人草图可以当动作参考，一张色卡可以当配色参考。

草图 · 九个人按草图的动作合影图1![草图 · 九个人按草图的动作合影：图1](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/CDWebzbEooPIvMxlQlPcd62TnNg.webp)图2![草图 · 九个人按草图的动作合影：图2](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/W9QxbD0rZoU75SxziSVcedBZnkd.webp)输出![草图 · 九个人按草图的动作合影：输出](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/G2oEbnssioGyRbxKBnPccQ3Vnkd.webp)*提示词*图1中的9个人物生成一张大合影，动作参考图2

色卡 · 按色卡给房间换配色图1 色卡![色卡 · 按色卡给房间换配色：图1 色卡](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/UFSVbggKMoYBaMxGXNfcQ8h9nIb.webp)![色卡 · 按色卡给房间换配色：图2](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/WrcFbObZvovhqWx8g1YcSt0NnIO.webp)![色卡 · 按色卡给房间换配色：结果](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/Yl3XbFcApog9orxrxPBc013gn3d.webp)图2结果*提示词*根据参考图1中的色卡配色重新生成图2

**多图融合：**把几张图里的东西合到一个画面里，可以直接在拼图上手写标注。

多图融合 · 照着手写标注摆位置输入![多图融合 · 照着手写标注摆位置：输入](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/DaXvb6nxMorSFNxEPGWcND3OnEF.webp)输出![多图融合 · 照着手写标注摆位置：输出](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/V3cCbRpNIomm64x6sbXce3sSnNv.webp)*提示词*根据图中的标注提示生成新的图片

多图融合 · 把沙发换进另一间客厅图1 沙发![多图融合 · 把沙发换进另一间客厅：图1 沙发](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/LRv6bOsWuoP0RUxyVJ0cJbR4nOb.webp)图2 面料![多图融合 · 把沙发换进另一间客厅：图2 面料](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/PzOCbM2KRoi6KnxppLJc8EwanFd.webp)![多图融合 · 把沙发换进另一间客厅：图3](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/AsHrb0QCYoNDlExVnJ0chEqsnWg.webp)![多图融合 · 把沙发换进另一间客厅：结果](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/SGDZbwFDDov51XxmVf0c6lP5nKe.webp)图3结果*提示词*把图1中的沙发更换到图3的场景，保持沙发不变，与背景融合自然，沙发面料是亚麻材质的，图2为面料细节，要求画面清晰，高清不模糊，光影自然，更符合电商产品展示图。

#### 2. 透明贴纸：生成完直接拿去贴

手册在这里放了三段演示：一句话生成一整版互不相连的贴纸，生成同一个角色的一组动作，以及把透明素材放进不同场景里再创作。手册原文还附了一块可以点进去看透明效果的画板，这里看不到。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/D8nbbRB4NoAfiIxumzGcPE3knJh.mp4)

一整版贴纸，每个图案都是独立的透明素材，后面被拿去拼成了几张插画场景。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/Trg5b7OtjohVOOxHoKTclbEmnjg.mp4)

一组连续动作的跑步小人，每张独立，随后被放到挂件、磁贴、徽章、抱枕上。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/FAF1bwXSRoHKLcxiyHgcoCXdnVf.mp4)

一只火烈鸟的透明素材，被放进行李箱贴纸、界面、刺绣、书签等不同场景。

#### 3. 人像编辑：说人话就能修图

这一类最能看出「没改的地方不动」的价值。修图的人最怕修完不像本人，下面每一组都只动了提示词点名的地方。

**美颜修图：**提示词可以很短，也可以把每个部位怎么改一条条写清楚。

美颜修图 · 去皱纹![美颜修图 · 去皱纹：原图](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/J7Byb59E7omV3vxjLFAcGnORnvf.webp)![美颜修图 · 去皱纹：结果](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/ZtJYb0zVVo0uhHx0MtYc8d5Dn2f.webp)原图结果*提示词*Remove the wrinkles from the woman’s face and neck.

美颜修图 · 调脸型![美颜修图 · 调脸型：原图](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/BaSzbLtheojAFkx4mGHc46eQnIe.webp)![美颜修图 · 调脸型：结果](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/D6JEbycDroLzLlx317YcgsCsncg.webp)原图结果*提示词*脸型变流畅点，颧骨收缩变小一点，太阳穴饱满一点，鼻翼缩窄一些，鼻孔变小一点，整体看起来精致一点

美颜修图 · 去痣![美颜修图 · 去痣：原图](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/FCRWb9Owro9njhxURBfcgGygnxb.webp)![美颜修图 · 去痣：结果](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/UpHubSoXsoM5WWxZG3VcNefanGg.webp)原图结果*提示词*去掉她脸上的小痣原图上的红箭头是用户标的位置。

美颜修图 · 修鼻子![美颜修图 · 修鼻子：原图](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/GWxCbTw6ZoSmDOxoFYXcxERYnyg.webp)![美颜修图 · 修鼻子：结果](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/XvhnbQecmop8Chx49mBcl4XNnBh.webp)原图结果*提示词*把这个男生的鼻子变好看

美颜修图 · 改双眼皮![美颜修图 · 改双眼皮：原图](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/A8nKbBCMpo9TfDxsEBjcqxCXnbb.webp)![美颜修图 · 改双眼皮：结果](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/MJ4rbn9Wuol74Lx98Ggcit5lnyd.webp)原图结果*提示词*把这个男生的眼睛改成双眼皮

美颜修图 · 补头发、淡腮红、改表情![美颜修图 · 补头发、淡腮红、改表情：原图](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/LJ9tbkkZZo3TTNxGy1KcCsednfb.webp)![美颜修图 · 补头发、淡腮红、改表情：结果](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/MiY6bzonEoUaSnxmn5ZcSW3rnCc.webp)原图结果*提示词*保持主体不变，增加头顶和头帘的头发，补密一点，淡化腮红，表情改成露齿微笑

美颜修图 · 去痘去汗![美颜修图 · 去痘去汗：原图](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/I2hsbLJvdormNpxUXKbcmAKSnDf.webp)![美颜修图 · 去痘去汗：结果](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/FI5Fbre2NoFrNcx1ZthcETfunrd.webp)原图结果*提示词*男性面部原本分布在额头、双颊、下颌处以及鼻头的红色丘疹、深色痘印、局部泛红与色素沉着等所有痘痘和斑点消失，同时去掉模特脸上的汗珠

美颜修图 · 丰唇![美颜修图 · 丰唇：原图](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/MvsHbscjbox0ggx3v6WckSJEnIe.webp)![美颜修图 · 丰唇：结果](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/PvOObweIHoldrJxso35ceuSLnwf.webp)原图结果*提示词*把这个女生嘴唇变厚

**修复美化：**从一句「一键美化」到一段写得很细的修复要求都行。

修复美化 · 精修写真![修复美化 · 精修写真：原图](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/QwpzbOwbsopnz3xj0SGc2wNInOf.webp)![修复美化 · 精修写真：结果](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/RTKpbp2j2o4LsTxaBinc0yk1nFf.webp)原图结果*提示词*把我变得美一点，精修写真，画面很仙气灵动的感觉。

修复美化 · 去掉红圈里的光斑![修复美化 · 去掉红圈里的光斑：原图](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/SwWabfWHTov9F0x68FkcbVcKn1e.webp)![修复美化 · 去掉红圈里的光斑：结果](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/MgNdbXRjuoZHCJxkw6ncZ9oWnMe.webp)原图结果*提示词*以图一作为唯一原始参考图，仅对红色轮廓线圈出的区域进行局部修复。 移除红圈区域内窗户前方强烈发光的灯源、白色光斑、镜头炫光及其放射状光线。根据周围已有……

修复美化 · 一键美化风景照输入![修复美化 · 一键美化风景照：输入](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/OGC8bNzWJoMJJrx1jcZcItpenrB.webp)输出![修复美化 · 一键美化风景照：输出](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/CaI6bcUTmo5p4ix1UyMcSBSZnMh.webp)*提示词*一键美化，人p掉，天气好一点，构图调一下不要留那么多天空路人被去掉，天空变晴，构图也按要求重新裁过。

修复美化 · 老照片上色![修复美化 · 老照片上色：原图](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/H9VlbgX46o1zqZxeEYEcveVBn9K.webp)![修复美化 · 老照片上色：结果](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/RmT1binZboHLTmxXvKbcz47vnef.webp)原图结果*提示词*对这张老照片进行修复：保留真实皮肤纹理，不过度磨皮，将褪色棕褐色调恢复为准确肤色和服装色彩，保留柔和复古颗粒感。

**美妆：**给一张妆容参考图，把妆搬到自己脸上。

美妆 · 同款彩绘妆图2 妆容![美妆 · 同款彩绘妆：图2 妆容](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/ZcO0bHM99opcoYxZayOcTLAMnXb.webp)![美妆 · 同款彩绘妆：图1](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/HcWkb0izxo6CgyxYzhmcSdvgntd.webp)![美妆 · 同款彩绘妆：结果](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/YqAObS3DQoYMymxqQencG32ynMg.webp)图1结果*提示词*请为我画一个图二同款妆容，妆感要服帖，不要假面。

美妆 · 雀斑烟熏妆图2 妆容![美妆 · 雀斑烟熏妆：图2 妆容](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/As1ibuOjAoWhtNxWePictUtZnid.webp)![美妆 · 雀斑烟熏妆：图1](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/DI7UbnAqQoQNpGxtcQHctY24ndd.webp)![美妆 · 雀斑烟熏妆：结果](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/Mb4tb1O8foNRHYx6SMtc2xatnHf.webp)图1结果*提示词*参考图2的雀斑烟熏妆，替换图1人物的妆容，保持图1的发型、面部特征与背景不变。

**换装造型：**换发型、换妆、换衣服，可以一句话一起改。

换装造型 · 按脸型推荐八款发型输入![换装造型 · 按脸型推荐八款发型：输入](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/Sg7obrjXdo1mQmxBTAFc72a9n2o.webp)输出![换装造型 · 按脸型推荐八款发型：输出](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/HaLkb3CAfoLqXEx1kNAcqtoVnxc.webp)*提示词*看我脸型，适合什么发型，发色？用图片的形式来表达，用我的脸型来设计出图片的效果，可以用最近网上流行的发型设计，以我脸型为主，图片形式，多一点不同发型

换装造型 · 换成狼尾鲻鱼头![换装造型 · 换成狼尾鲻鱼头：原图](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/U0wPblpqooO5ZRxTRDkcCypunEb.webp)![换装造型 · 换成狼尾鲻鱼头：结果](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/FFfeb9wheodeC2xHCuicQdH8nmb.webp)原图结果*提示词*发型改为狼尾鲻鱼头

换装造型 · 韩系妆、卷发、校服一起换输入![换装造型 · 韩系妆、卷发、校服一起换：输入](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/G4xab8jeOokX6YxZO4PcTxvsnGh.webp)输出![换装造型 · 韩系妆、卷发、校服一起换：输出](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/V86obJdiGoLOtsxqOJScje69nwb.webp)*提示词*给图中人物化一个韩系妆容，并将发型改为韩式卷发，并给人物换一身韩式校服

**人像写真：**用一张普通照片换风格、换场景。

人像写真 · 变成唐宫夜宴里的仕女输入![人像写真 · 变成唐宫夜宴里的仕女：输入](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/QoGobH3XRoQmHRxEBk5cPXd1nrf.webp)输出![人像写真 · 变成唐宫夜宴里的仕女：输出](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/QsWcbJZp9oxv53xmtuvcTSrwnig.webp)*提示词*请把这张图片变换一下，把我塑造成唐宫夜宴图里的仕女

人像写真 · 哈苏胶片质感输入![人像写真 · 哈苏胶片质感：输入](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/Of8WbDSAWoE5FZxizdOcdEQ1nOh.webp)输出![人像写真 · 哈苏胶片质感：输出](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/QrUubIvViozrChxYYxXczNq0neg.webp)*提示词*哈苏胶片质感,光影,轮廓光,(((面部高曝光)),美人。清冷色调,光照在脸上,凌乱头发,头发被风飘起,背景窗户树影婆娑,高噪点,对焦,近景特写,深情看向镜头,皮肤清透,慵懒,迷离,高明暗,反射,质感,泛光模糊晕染,皮肤细腻,模糊,唯美,朦胧,细节生动。

人像写真 · 苗疆少女同组另一张![人像写真 · 苗疆少女：同组另一张](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/BzA9bd2LgoP11FxVICAc77RfnQh.webp)输出![人像写真 · 苗疆少女：输出](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/GW0zb4r8Zo65rsx8jCQcBOWvnkd.webp)*提示词*相机拍摄风格，超高分辨率，高清摄影，大师构图，人物写真，画面中是一个非常白皙漂亮的苗疆少女，繁杂的发型，头发长至腰间，繁杂花纹衣服，很多银饰装饰，姿势活泼，背景是苗疆建筑。

#### 4. 社媒素材：封面和表情包

**封面素材：**小红书封面、视频封面这类图，难点在字多、要好看还不能错。注意这几条提示词的写法：主题用引号或「」括出来，再交代版式、配色和每块放什么。

封面 · 自然阅读![封面 · 自然阅读](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/VdXPbheyBoH65exXbf5cArdDnlg.webp)*提示词*一张竖版高质感商业地产与生活方式封面海报，以现代住宅室内的阅读空间为主体，整体呈现温暖、静谧、自然、精致的生活美学。画面主体： 采用正面、居中、近乎对称的室内建筑摄影构图。画面中央是一处嵌入深胡桃木色墙面的落地阅读窗景，下方设置一张横向延伸的深木色书桌，桌面摆放书籍、台灯、装饰摆件及小型文具；桌前……封面 · 青春正好![封面 · 青春正好](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/ZqRHbTWTto3ltBxEvl3cYwpVnGc.webp)*提示词*生成一张竖版 3:4 比例的高质感户外生活方式主题封面，主题为「青“春”正好 SPRING 2026」，以春日田野、自然探索、自由出行为核心概念，呈现自然、松弛、自由且充满生命力的春日氛围。画面主体与摄影场景以真实户外摄影作为整张海报的背景。场景位于……画面中央偏下是一位年轻的东亚男性，黑色短发，面容清秀……封面 · 考公宣传![封面 · 考公宣传](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/CXMUbt9aVoll4RxrIx8c18pBnfh.webp)*提示词*小红书考公宣传海报，严格保持参考图的排版结构：左上角放一个可爱的卡通学习兔子形象（戴眼镜抱书），四行大标题加粗黑色左对齐排列："是我的错觉吗？""都说考公不用报班""结果考上的都是""报班的"，其中"考公"和"报班"两个词用橙色圆圈标注，右下角放一个捂嘴震惊的粉色桃子表情包，整体底色换成清新的淡奶蓝色……封面 · 艺考留学冲刺营![封面 · 艺考留学冲刺营](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/ZeoWbm4YLo37e2xxfCMc0Q5Fnlg.webp)*提示词*设计一张竖版 3:4 比例的艺术留学与作品集培训主题小红书封面，主题为「艺考留学名校冲刺营」，采用日系潮流杂志拼贴风、漫画封面风格、复古复印纹理与现代商业平面设计相结合的视觉语言。整体以高饱和电光蓝、明亮柠檬黄、黑白灰为核心配色，通过超大标题、人物抠图、夸张透视和撕纸标签营造强烈的视觉冲击力……

封面 · 一张照片变穿搭拆解图输入![封面 · 一张照片变穿搭拆解图：输入](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/NL8fb3LfGooO2nxY20mcXk2Tnhd.webp)输出![封面 · 一张照片变穿搭拆解图：输出](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/E2zkbx9wcoWsQJx3xDjcHiskn2g.webp)*提示词*把参考图改为一张ootd图，把人物的穿搭单品抠图并以贴纸形式展现在人物周围，加上适当的小字说明单品；可适当调整图片景别以清晰展示。整体要ins潮流风

封面 · 照着参考封面做 YouTube 封面图1![封面 · 照着参考封面做 YouTube 封面：图1](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/KrlEbcQ3eoX7tuxkwfLcVs6YnBe.webp)图2![封面 · 照着参考封面做 YouTube 封面：图2](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/UrMGbKViqoh1QSxpIYicZTEUnWb.webp)图3![封面 · 照着参考封面做 YouTube 封面：图3](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/LO3QbAI3coggt2xCGUicH6QWnQe.webp)图4![封面 · 照着参考封面做 YouTube 封面：图4](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/TrwHbDzfYol1JZx8tKdcR1eynFd.webp)输出![封面 · 照着参考封面做 YouTube 封面：输出](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/JKiHbYMStoXdFAxF7zsc453FnMf.webp)*提示词*参考图1视频封面的风格和排版局部，为我生成1个Youtube视频封面。素材使用图2-图4，文案：LOOKBOOK。

**表情包：**一张图变一整组，表情、姿势各不相同。

表情包 · 动漫角色的六种表情输入![表情包 · 动漫角色的六种表情：输入](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/MWPrbJKbmo7Rn5xcZ5ScUsYsnLb.webp)输出![表情包 · 动漫角色的六种表情：输出](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/Jj0tb2oI1oHvKOxwuQDcgKfQnzh.webp)*提示词*以该动漫形象生成一组多角度不同表情且符合淑女和叛逆这两种气质特征的头部特写，白色背景

表情包 · 3×3 拍照亭输入![表情包 · 3×3 拍照亭：输入](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/CYDMbpYgyoEMybxQmqbc9gcMnab.webp)输出![表情包 · 3×3 拍照亭：输出](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/WUcnbAXyFoqR4fxptgOcjZy7nVe.webp)*提示词*用这张照片,做一个3*3的拍照亭网格，每张要用不同的姿势和表情不许重复，并带有相册装饰贴纸

表情包 · 自家猫的九宫格输入![表情包 · 自家猫的九宫格：输入](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/Vwbob9TFdoZLslxygDhcI7NynNd.webp)输出![表情包 · 自家猫的九宫格：输出](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/QaqubB87hoNjwExcE8dc71BQnxg.webp)*提示词*把这个猫生成一系列，读书，写作业，喝啤酒，抽雪茄等9宫格表情包，表情整体搞笑调皮😜，拟人化，保留真实猫毛发质感，写实，不要卡通图片

#### 5. 风格迁移：换画风，保留本人

风格迁移 · Q 版 3D 小人冲出手机输入![风格迁移 · Q 版 3D 小人冲出手机：输入](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/OEdqbiXayoMo5DxDSnXc1X6VnEc.webp)输出![风格迁移 · Q 版 3D 小人冲出手机：输出](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/UqHlbRKg1oOuVoxAJX7ckVMrnKb.webp)*提示词*把照片中的人物变成Q版3D风微缩小人站在手机屏幕里，人物下半身在手机屏幕里，上半身冲出手机屏幕边框。手机被一只手拿着，背景是早餐场景，周围有华夫饼、鸡蛋、餐具和水果。左上角用可爱字体写“生日快乐！”。

风格迁移 · 壁画转国潮插画![风格迁移 · 壁画转国潮插画：原图](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/WK9CbLblSo3zikxYagpclFZtnMc.webp)![风格迁移 · 壁画转国潮插画：结果](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/AEFtbnJt7o4Cryxy4LncjmMznLo.webp)原图结果*提示词*将图片转绘为一张国潮风格的插画

风格迁移 · 只借画风，换人换场景风格参考![风格迁移 · 只借画风，换人换场景：风格参考](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/J0irbMTLzomzLBxhpNecgUjxng2.webp)输出![风格迁移 · 只借画风，换人换场景：输出](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/GgfIbJEhlo1JEbxyT1HcHiyWnce.webp)*提示词*参考图片的风格，不要出现图中的人物和场景， 一位20岁嚣张男性，黄色短发，穿着黑色印花短袖T恤，蓝色破洞牛仔裤，表情得意，嘴角上扬，坐在沙发上，在客厅， 二次元漫画风格，动漫风格，32K，完美细节，高质量

风格迁移 · 线稿套用另一张图的画风和排版图1![风格迁移 · 线稿套用另一张图的画风和排版：图1](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/I5kWbj9jFoCEojxcKCAckHGonYI.webp)图2![风格迁移 · 线稿套用另一张图的画风和排版：图2](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/X8JRbrLeQoZPuDxJKVBca3Z7n1e.webp)输出![风格迁移 · 线稿套用另一张图的画风和排版：输出](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/ITjsbWEvBoHDlhxI59LcxdH6nDb.webp)*提示词*图 1 的角色参考图 2 的手绘卡通画风重新生成，排版特点保持一致，色调要蓝色调，男孩裤子黑色，卫衣蓝色，背景色淡蓝色系，男孩动作不变，文字“spescil”。提示词里要求写的字是 spescil，结果图照写了。

风格迁移 · 把本人做成盲盒玩偶图1![风格迁移 · 把本人做成盲盒玩偶：图1](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/WovDbBAm3oq9pUxSbuqcq9wcnTb.webp)图2![风格迁移 · 把本人做成盲盒玩偶：图2](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/ImwEbqSoCouxbNx53W1ceY5unRd.webp)输出![风格迁移 · 把本人做成盲盒玩偶：输出](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/Hl8PbA9MeoJbU2xEpYocMDv9naf.webp)*提示词*参考图 2 的 Q 版盲盒，把图 1 本人做成盲盒玩偶，发型、服饰和背景都要保留。

### 商用场景：7 类

这一部分是手册的「toB 应用」，面向电商、营销、设计、影视游戏这些要交付的活儿。

#### 1. 多轮精准编辑：改款式、改颜色、改位置

[视频/音频](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/IfU9b5mynoqhu7xwx7ycHroYnub.mp4)

室内设计：同一间房一轮轮换家具、换配色，画面下方的编号一路走到 59。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/QEmqbJLfcovoWbx9VrUcy4TfncJ.mp4)

服装搭配：同一张商品展示页上，一件件替换单品。

*手册给的写法*将图中XX款式/颜色/样式/位置改为XX款式/颜色/样式/位置，其他部分保持不变

#### 2. 透明素材：一套角色，到处复用

对团队来说，透明素材的意义是「做一次，用很多次」。同一组透明角色可以当参考，继续生成它们在不同场景里的系列画面，角色特征和质感延续下来，动作、组合、构图可以调整。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/BR3Xbsx87oo64sxaW18cwSqTnHb.mp4)

一个蓝色毛绒 3D 卡通形象：先生成透明底的单体和一组表情，再放进街头大屏、广告牌等场景。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/Sopfb2yr1oFOgCxmbe7ctSyCnDf.mp4)

雪鸮的透明素材存进文件夹，再拿来排一张科普图解。

#### 3. 办公：信息图、简历、PPT

**信息图：**提示词基本是把内容大纲直接交给它，分几部分、每部分写什么。

信息图 · 接线端子松脱![信息图 · 接线端子松脱](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/EBU2bUssyo9B0Qxapsmcr1x1nTh.webp)*提示词*一张信息图表，展示了接线端子松脱的问题。图中需要包含以下几个部分：1. 核心成因：现场压缩机为防爆设备，机组运行状态下控制柜严禁开盖，导致长期维护盲区。2. 风险……信息图 · 校招长图![信息图 · 校招长图](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/TA0obKjbVoxVm8xSpk7cAcQ3nrh.webp)*提示词*请设计一张校招宣传长图，竖版9:16比例，用于视频号封面和校园传播。主题为“【公司名称】2026校园招聘正式启动”。面向应届毕业生……

信息图 · 用自己的机器人形象做科普长图输入![信息图 · 用自己的机器人形象做科普长图：输入](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/IGPwbKeolou1xFxwWrTck6k3ncy.webp)输出![信息图 · 用自己的机器人形象做科普长图：输出](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/L8Nbb4k1moJiYxxA5ipcHTjanOg.webp)*提示词*这是我设计的一个机器人的形象，生成一张高质量中文信息图海报（Infographic），整体采用现代科技感＋扁平插画＋企业培训课件风格。版式参考互联网产品科普长图：……

信息图 · 一张头像生成简历输入![信息图 · 一张头像生成简历：输入](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/KfWkbxe9IogfobxjD21cqpl2nSh.webp)输出![信息图 · 一张头像生成简历：输出](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/Z3Zob8258oY8vgxUXHTcuVSgnqg.webp)*提示词*这是我的头像，给我制作一个简历：凸显我的设计背景和技能优势 姓名:林知夏 电话:138XXXX1234 邮箱……核心能力:界面设计|品牌视觉|用户研究

**PPT：**可以只给一个主题，也可以把每一栏写什么都交代清楚。

PPT · 生物课首页![PPT · 生物课首页](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/O9WMbL542osmOkxT6xoch7dynde.webp)*提示词*为生物老师制作一张PPT首页，主题为看不见的攻防：解码甲流与人体免疫。PPT · 葡萄牙语封面页![PPT · 葡萄牙语封面页](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/LOuBbsJMaohoEXxGzNKcVXlCnVe.webp)*提示词*Slide 1 — Capa,Título: "Falar com seu cachorro: benefícios e armadilhas",Microcopy para a lâmina: "O que a ciência diz sobre conversar com cães — e como usar isso a favor do comportamento."……PPT · 投资金融主题页![PPT · 投资金融主题页](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/ACz5bZDZooy9eMxKbJycdiUmnph.webp)*提示词*一张16:9横向构图的蓝色投资金融主题PPT页面，以写实滨水城市天际线与半透明数据图表叠加呈现，画面中没有人物。整体由左侧浅天蓝、近白色渐变至右上方的深钴蓝，左半部主要排布宣传文字，右半部展示 ……PPT · 英文四栏卡片页![PPT · 英文四栏卡片页](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/L7O4b99M1ookzlxizOQcDyo2ntf.webp)*提示词*PPT页面：顶部字体居中显主标题 "4 Core Geography Learning Tools for Junior High"，下附灰色副标题 "For Grade 1-3 Geography Practice"，背景浅绿渐变。中间设4栏均等白色圆角卡片：左 1……

#### 4. 电商：详情页、主图、试穿试戴

**详情页：**一句话就能出一张拼接长图；有产品图时，要点是写清哪些不能变。

详情页 · 元气森林可乐![详情页 · 元气森林可乐](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/IV9vbbA7pok36exwCKpcPBUunYb.webp)*提示词*做一张元气森林可乐的电商产品拼接详情页长图，突出0糖0脂0卡卖点，包含清凉产品特写和生活化素材。详情页 · 咖啡机（英文）![详情页 · 咖啡机（英文）](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/BMqkbSneYo2AQ2xCZFicHi6UnEf.webp)*提示词*Generate an e-commerce product detail page for coffee machine

详情页 · 一把椅子的侘寂风长图输入![详情页 · 一把椅子的侘寂风长图：输入](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/ZC6PbVCsFo1uxHxu1WKcDHivn9b.webp)输出![详情页 · 一把椅子的侘寂风长图：输出](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/RHuKb033ho0nn0xRIctcJldOntf.webp)*提示词*一张竖版排版的椅子的电商详情页，整体为暖调侘寂风设计，画质清晰细腻，光影柔和自然……

详情页 · 两张项链图合成一页图1![详情页 · 两张项链图合成一页：图1](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/PGyZbg4GuoBNmDxC9cyc8wlQnjc.webp)图2![详情页 · 两张项链图合成一页：图2](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/DaY0by5H6o3QhYxZCtMc96qRnvh.webp)输出![详情页 · 两张项链图合成一页：输出](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/ZwR0bjHlNoySIbxom56c1B7onDe.webp)*提示词*融合两张项链产品图，制作一张电商详情页长图。保留吊坠结构、宝石数量、金属颜色和链条比例，依次展示正面主视觉、细节特写、佩戴或尺寸说明与材质卖点，整体为高级珠宝电商风。

**主图：**给产品图，换场景、加卖点文字。

主图 · 香水卖点图输入![主图 · 香水卖点图：输入](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/YTcCbRyXooTcJ6xgNA3cj20nnSg.webp)输出![主图 · 香水卖点图：输出](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/GuaGbUoEdoDuV4xVg8VcHH4rnIg.webp)*提示词*根据图1生成1:1正方形电商香水卖点图，香水的香型是玫瑰茉莉混合香，专为年轻群体设计，使用全球高品质香料萃取精油调和而成。香气清新淡雅，前调玫瑰香、中调茉莉香、后调木质香，留香持久……

主图 · 实验室风格场景输入![主图 · 实验室风格场景：输入](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/Vg9Bbdpx8oc7iyxv4C5cZAjVnrh.webp)输出![主图 · 实验室风格场景：输出](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/N6V1b4O4xoqor0xuojdc8bKHnac.webp)*提示词*以图片中的产品为主体，生成一张实验室风格的场景渲染，用于宣传“成分党挚爱”的卖点

主图 · 实拍图变纯色背景上架图输入![主图 · 实拍图变纯色背景上架图：输入](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/XzGlbgdCWoIaKwxxId8c1U2Wn5d.webp)输出![主图 · 实拍图变纯色背景上架图：输出](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/FXWBbIXB5obQ33xYQkecmjl5n8m.webp)*提示词*输入图1、2、3是我的一款产品，参考输入图4和5，帮我生成两张1：1的纯色背景产品展示图，要求一张侧视图一张俯视图，不改变输入图1、2、3产品细节及纹理，修复光影瑕疵，无文字，符合电商平台产品上架要求。最后将生成后的两张1：1图片保持原比例原像素拼接为一个竖版长图输出给我提示词里提到的参考图 4 和 5，手册没有放出来。

主图 · 平铺衣服变模特海报输入![主图 · 平铺衣服变模特海报：输入](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/YDwkbT4ceoIsxKxgy7ucfwfUnLe.webp)输出![主图 · 平铺衣服变模特海报：输出](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/NEGYb9WBQo26SHxmsZvcRNYFnOd.webp)*提示词*Generate an e-commerce poster for this outfit. Have a middle-aged or older model wear the clothing from the image and display it in a full-body shot with a blurred background. Use a larger font size for the tagline, price, and other information in English, but make sure they do not obscure the main subject. The output image should be in a 4:3 aspect ratio.

**试穿试戴：**人不变，把饰品、包、衣服穿戴上去。

试戴 · 换耳环图2 耳环![试戴 · 换耳环：图2 耳环](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/Qj4yb8AYUoPnpmxIA06c51kwnkd.webp)![试戴 · 换耳环：图1](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/Vg5bbJ3CToXRzfx4NSoc3AbTnyd.webp)![试戴 · 换耳环：结果](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/Cy5YbqEqyoq8tCxLXIhcPiJHnsd.webp)图1结果*提示词*替换上图 2 的耳环

试戴 · 项链、耳环、戒指一起戴图2 首饰![试戴 · 项链、耳环、戒指一起戴：图2 首饰](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/BDuBb00q5otXpIxSekAcaq44nWh.webp)![试戴 · 项链、耳环、戒指一起戴：图1](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/X7fwb0ZYQoHqwLxFw5Oc91dUnJc.webp)![试戴 · 项链、耳环、戒指一起戴：结果](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/SX0FbDwcTofm1wxuQmmcIM1VnAc.webp)图1结果*提示词*让图一的人物戴上图二的首饰，包括项链，耳环，戒指

试戴 · 模特拎包展示输入![试戴 · 模特拎包展示：输入](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/SG6PbquNwogmSxxJeelcWTgAnCC.webp)输出![试戴 · 模特拎包展示：输出](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/O928bG60qoAYHhx3UhecnkDonFh.webp)*提示词*Generate a product display showing a Western beauty carrying this dog-shaped bag.

试穿 · 老人换一整身穿搭图1![试穿 · 老人换一整身穿搭：图1](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/EyYTbIub6o4XiCx3f0DcQ1tinJf.webp)图2![试穿 · 老人换一整身穿搭：图2](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/Da5IbXvvXoZ2EKxCBSqcE66fn1c.webp)输出![试穿 · 老人换一整身穿搭：输出](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/T4eUbzbXnoWyFMxXBChcuU1dn0b.webp)*提示词*让图一老年人穿上图二的服装、帽子和包，生成一张全身照穿搭图

#### 5. 营销活动：海报、邀请函、整套品牌物料

**活动宣传：**这几条提示词都很长，把版面从上到下、每个位置放什么写得很细。

活动宣传 · 云朵咖啡节海报![活动宣传 · 云朵咖啡节海报](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/SJpIb9nito5DxTx4zFbckoHInVc.webp)*提示词*云朵咖啡节主题插画海报。竖版页面以米白色为底，中央铺设边缘不规则的大面积天蓝色多边形，图形从上部延伸至接近底边，承载角色、标题和活动信息。页眉左侧依次排列蓝色圆角标志及个人设计、青蓝色几何标志及创意设计，中间偏右写有Weilai。顶部中央……活动宣传 · 美业峰会邀请函![活动宣传 · 美业峰会邀请函](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/JyVDb75jNowbqexSFcicSLTsnxb.webp)*提示词*9:16 竖长版商务邀请函，美业品牌峰会线下邀约海报 背景风格 流体丙烯油画肌理，水墨流动波纹，极简轻奢商务风，新中式高级简约，低饱和渐变绿色系 多层流动颜料波纹，深绿→浅绿→米白自然晕染，丝滑颜料笔触肌理，无多余杂物 文字内容 顶部：“春日焕颜”、大号黄绿色英文 “INVITATION”、“即刻变美”……活动宣传 · 游戏测试海报![活动宣传 · 游戏测试海报](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/D5aeb2xAuoUo9xx99igcqajCnBh.webp)*提示词*黑暗生存惊悚游戏海报，标题"天堂——最后的天堂"。迷雾笼罩的韩国城市废墟，破碎街道标牌，建筑残骸错落。幸存者蹲伏于红色屏障后，神情紧绷，敌对人物从阴影中逼近。冷蓝色调为主，戏剧性仰视视角，强烈明暗对比。电影级写实海报风格，氛围压迫感强，适用于游戏Beta测试宣传。

活动宣传 · 城市主视觉，带上两个 logo图1![活动宣传 · 城市主视觉，带上两个 logo：图1](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/VhzcbnDDaoioAHxzFL2coy2gnCd.webp)图2![活动宣传 · 城市主视觉，带上两个 logo：图2](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/AWpfbOCTso7xrrxa9ntctYbCn9d.webp)输出![活动宣传 · 城市主视觉，带上两个 logo：输出](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/Un9Sbs6WAoLzdqxpVl3ckyJrnXe.webp)*提示词*广州要加强文旅宣传，需要做一系列城市视觉系统。你先帮我设计一个主KV，同时要用作横板广告大屏投放。广州的城市定位是“开放、改革、创新、务实”，广告主要宣传标语为“hi，这里是广州”。主视觉画面要用广州的几个经典地标绘制，画风要抽象，不要写实，并带有一点霓虹发光效果。整体采用粉紫色调，点缀一些蓝色，并加上图1图2的logo。

**品牌物料：**从一个 logo、一张排版参考，扩展成一整套应用。

品牌物料 · 照参考排版做一套品牌视觉排版参考![品牌物料 · 照参考排版做一套品牌视觉：排版参考](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/WGt7bwsGGoLga2xrU2McCvM0nGg.webp)输出![品牌物料 · 照参考排版做一套品牌视觉：输出](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/XugPbmNmWoU5yQxnPg9cO4Lnnqh.webp)*提示词*参考图中的排版方式，为咖啡品牌「GREENLY」设计一套品牌视觉系统：以绿色为主色，搭配浅米色；整体风格简洁，插画感强。Logo以咖啡杯为核心图形，配合圆润字体。版面采用大色块分区，并融入重复图案与图标元素，应用于纸杯、手提袋与海报。

品牌物料 · 包装展开图变成品展示输入![品牌物料 · 包装展开图变成品展示：输入](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/J1YHbaMcGoXRDtx21ErccMcsnPg.webp)输出![品牌物料 · 包装展开图变成品展示：输出](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/R8AAbGW0Ro3U1nxaXb2cTs5UnWc.webp)*提示词*包装设计的成品展示，生成这个包装组装后的样子，并包含白底展示、细节图、系列展示、以及放在环境中的展示

品牌物料 · 提取 logo 做应用展示输入![品牌物料 · 提取 logo 做应用展示：输入](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/MuHWbNB4soX1sCxveescfay2nqb.webp)输出![品牌物料 · 提取 logo 做应用展示：输出](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/TjWKbZcJToYwagxoO8xcbnCcnOc.webp)*提示词*Extract the logo from the reference image and create a visual showcase of its applications for a coffee brand identity system. Use a warm, vintage Instagram aesthetic with a dark brown wooden tabletop background, accented by coffee beans and dried eucalyptus leaves for a natural, soothing atmosphere. At the center, ……

品牌物料 · 四张贴纸印到四件产品上图1![品牌物料 · 四张贴纸印到四件产品上：图1](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/RwjQbC2fboONsexkfWSco0QInUf.webp)图2![品牌物料 · 四张贴纸印到四件产品上：图2](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/FJHxbEPuJoVvh0xk6oYcReuGn6e.webp)图3![品牌物料 · 四张贴纸印到四件产品上：图3](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/B53bbfEE4o1GywxLArgcVhA5neh.webp)图4![品牌物料 · 四张贴纸印到四件产品上：图4](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/OIDAboklHo3IywxGu3ic8HyOnzh.webp)输出![品牌物料 · 四张贴纸印到四件产品上：输出](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/Mooobhq4Eo3OBGxQ2RFcFEOJnTc.webp)*提示词*时尚咖啡品牌产品设计，品牌名称为 P·U CLUB，产品包括咖啡罐、咖啡杯、品牌手册和钥匙扣，四个产品上分别印有输入图1到输入图4中的贴纸图案。作为品牌视觉元素，贴纸清晰可见。整体风格年轻时尚，设计感强。产品以蓝、黄、粉、绿为主色调，摆放在灰色纸质纹理的台面上。斜角构图，层次分明。商业产品摄影风格，光影柔和细腻，材质与包装细节清晰。

#### 6. UI/UX：图标和界面

UI · 照已有风格画一组地标图标风格参考![UI · 照已有风格画一组地标图标：风格参考](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/EAAyb8dhnorN47xaRgqc395pnoe.webp)输出![UI · 照已有风格画一组地标图标：输出](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/LgEJbtiAFoVFYBxmv1tc2IqmnQb.webp)*提示词*参考输入图风格，生成长城、故宫、天坛、黄鹤楼、东方明珠、广州塔建筑的图标。图标的线条风格跟上了。图标下方的 6 个英文地名错了 5 个，比如东方明珠标成 NEW YORKA。

UI · 按第一个图标的风格重画第二个图1![UI · 按第一个图标的风格重画第二个：图1](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/KYQNbseZYoH6ulxw7R1cvDClncc.webp)图2![UI · 按第一个图标的风格重画第二个：图2](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/VMEhblElhoRjPQxrLoAc3p8Bnlf.webp)输出![UI · 按第一个图标的风格重画第二个：输出](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/PBAhbCMzKo8yiuxyQDTcj9w8nI5.webp)*提示词*按照第一个图标的风格，重新设计第二个图标

UX · 雅思口语备考 App 界面![UX · 雅思口语备考 App 界面](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/P9VPb02zqoCG9Lx2lsfcxUeBnDg.webp)*提示词*一组展示雅思口语备考APP功能的界面截图，包含语音评分、发音纠错、模考报告、对话练习等功能，界面设计简洁清晰，色调以蓝白为主，科技感。

UX · 三双鞋做成买手网页输入![UX · 三双鞋做成买手网页：输入](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/HjW3bjKFlo1RYNxc07Rcabsinuh.webp)输出![UX · 三双鞋做成买手网页：输出](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/SHhKbAePYozcXKxmRxbc9rlbnSg.webp)*提示词*我是一个买手网页，图中是我们最近新上架的鞋类商品，帮我设计一个网页，内容包含这三双鞋，告知用户订购需要提前预约

#### 7. 影视 / 游戏：特效、设定图

**影视特效：**主体不动，加烟、加火、换背景。

影视特效 · 金鱼灯加烟雾和夜空![影视特效 · 金鱼灯加烟雾和夜空：原图](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/CpEdbjSWboiH9RxUXqscrXoynhd.webp)![影视特效 · 金鱼灯加烟雾和夜空：结果](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/XqhibACYnodPmhxo41kcIWSwnbd.webp)原图结果*提示词*给这些金鱼配一个炫酷的特效，我要那种烟雾缭绕、如同遨游在云端的感觉，背景也换成深蓝色的夜空，主体不要变。

影视特效 · 手臂被火焰包裹![影视特效 · 手臂被火焰包裹：原图](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/CRPebEOBZobkgexejvlcWrnjnUe.webp)![影视特效 · 手臂被火焰包裹：结果](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/CQ1bbqFy8oVTF4xsHEocDdybn24.webp)原图结果*提示词*让他的伸出来的手臂被火焰和烟雾包裹

**概念设定：**建筑、环境这类世界观图，提示词主要在交代结构、氛围和画面里不要出现什么。

概念设定 · 武侠藏宝阁![概念设定 · 武侠藏宝阁](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/EwGlbMMOMo7X4pxcewZckRBMnig.webp)*提示词*MMORPG武侠世界观，原创中式古风藏宝阁单体建筑概念设计，严格遵从传统中式古建筑制式与结构逻辑。融合飞檐翘角、多层楼阁、雕花梁柱等经典古建元素……概念设定 · 废墟公路![概念设定 · 废墟公路](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/BAm2bhVl9oBf8txtCGFcLxyKnXd.webp)*提示词*一幅横向宽画幅、近乎左右对称的高度写实废墟景象，画面中没有人物、动物或行驶车辆，主体是一条向远方笔直延伸的破败多车道公路……呈现电影级写实环境概念图般的质感，气氛空旷、压抑、荒凉而阴郁。概念设定 · 冰封末日世界![概念设定 · 冰封末日世界](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/FYugb5RGxoVafxxmFkscfk3Lnbd.webp)*提示词*为一个冰封末日世界创作一张横版宣传主视觉画面，采用精致细腻的皮克斯风格卡通美学。描绘一片被冰雪彻底吞噬的荒无人烟的末日景观，环境细节精致丰富，强烈传达出刺骨严寒、孤独与荒凉的氛围。通过精心设计的分层光影、清晰的空间纵深以及富有表现力的风格化造型，营造沉浸式的电影级视觉氛围。保留冰雪末日世界特有的萧瑟、荒废与破败感。画面中不出现任何文字、水印或Logo。

**角色设定：**三视图加面部特写的设定板。其中一条写得很细：所有视图保持同一张脸、同一套服装，三张全身视图只改变观察方向，不重新设计角色。

角色设定 · 猞猁摄影师![角色设定 · 猞猁摄影师](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/A6fWb1eghoDRZLxTqwXcJpkDnEd.webp)*提示词*创作一名生活在《疯狂动物城》世界观与动画风格中的原创动物角色：一只成年雌性猞猁……角色设定 · 耳廓狐赛博格卡兹![角色设定 · 耳廓狐赛博格卡兹](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/KUutbezHiozprBxc7ODc0KggnLd.webp)*提示词*一张写实风格的角色设定图，主角是卡兹，一名雄性耳廓狐原型的赛博格，身份是废土拾荒者兼机械工程师。横版 16:9 设计板，左侧依次展示同一角色的正面、侧面、背面全身视图，右侧展示一张清晰面部特写……角色设定 · 西部边境烙印师![角色设定 · 西部边境烙印师](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/Ju8CbpJqlovfW8xMjhycGRwRnpe.webp)*提示词*写实风格角色设定图，一名二十五岁左右的荒凉西部边境烙印师。横版构图，左侧清楚分隔为同一角色的正面、侧面、背面全身视图，右侧是一张面部特写；所有视图保持同一张脸、同一肤色、同一高瘦体型比例、同一发型、同一套服装和同一套装备，三张全身视图只改变观察方向，不重新设计角色……

**道具设定：**单件道具的多角度设定板，也可以给一个灰模让它上色。

道具设定 · 文明光纹碎片![道具设定 · 文明光纹碎片](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/VvNSbyprTodof7xU7uVckoBFnTf.webp)*提示词*道具主设定图，主体是“文明光纹碎片”：一块由遗忘废墟中古老文明残迹留下的磨损碎片，手掌大小，形状像不完整的弯月石片与断裂铭牌之间的结合体，整体薄而有重量感，边缘不规则崩裂，……道具设定 · 1940 年代打字机![道具设定 · 1940 年代打字机](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/WE7cbfN41o1X8gxLBi8cn5eXnMb.webp)*提示词*生成一张1940年代黑色电影的桌面英雄道具。一台深墨绿色便携式机械打字机，铸铁机身圆润厚重，奶白色圆形键帽上的字母部分磨损。……

道具设定 · 灰模剑柄上色![道具设定 · 灰模剑柄上色：原图](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/R7Nib0FdMoo7tbx6tA0cplLHnub.webp)![道具设定 · 灰模剑柄上色：结果](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/DQcDbHk5toxZSyx9IN4cueS9njc.webp)原图结果*提示词*将图 1 中的灰度剑柄和护手重新上色并电影化处理

**场景设定：**年代、地点、陈设写得越具体，画面越像剧照。

场景设定 · 防空洞里的地下录像厅![场景设定 · 防空洞里的地下录像厅](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/YCXWboUynoX6xLxlKricwaLMnlb.webp)*提示词*生成一张1990年代中国西南山城犯罪剧情片场景设定图。场景位于旧防空洞改造的地下录像厅，拱形混凝土洞壁潮湿斑驳，墙面贴满褪色港片海报，入口悬挂厚重塑料门帘。内部摆放不成套的木椅和旧沙发，前方是一台大尺寸显像管电视，旁边堆着录像带与老式录像机。场景设定 · 地铁里的高中生![场景设定 · 地铁里的高中生](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/WnfVbE9LqoSSXfxlG8rc06QdnYb.webp)*提示词*实拍照片，中景，地铁车厢里一个戴耳机的高中生满脸惶恐地盯着手机屏幕，车窗外飞速划过的隧道灯光，35mm 镜头

场景设定 · 同一个人物换一种状态图1![场景设定 · 同一个人物换一种状态：图1](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/FUu2bh285oOS8AxNGX7ctZxEnKc.webp)输出![场景设定 · 同一个人物换一种状态：输出](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/AYjEbto56o5cn8xyIYwcRznAncX.webp)*提示词*参考图1 保持人物的同一身份、脸型、年龄感、身体比例和原有造型气质；生成一张写实中近景状态图：人物是一位 77 岁的巴西老人，傍晚独自站在家中，身体微微侧转，右手把一部智能手机贴在耳边通话，肩颈放松，神情专注而克制，画面只出现她一名角色。她的左侧脸呈现愈合后的严重烧伤疤痕：……

### 两张词表：想要什么感觉，就加什么词

手册最后附了两张对照表：一个词，配一张用了这个词的图。不知道某种感觉该叫什么的时候，来这里找。

#### 风格词：22 个

风格词决定「画成什么样」，比如油画、水彩、偶动画、丝网印刷。

![风格词示例：油画风](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/HJa5bNJ0CoZJ8WxZmNtcTKzMnBf.webp)**油画风**![风格词示例：怪诞风](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/XwMibF39ho9Yq8xmlOfc3Tr2n4V.webp)**怪诞风**![风格词示例：漆画风格](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/F7NWbbFsfoCxFpxhEygcj3M9ny4.webp)**漆画风格**![风格词示例：UE5风格](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/PWudbqxtiosu3NxmOBXcAFz6nId.webp)**UE5风格**![风格词示例：厚涂](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/DIcJbENYroDd3ZxCzLIcRKLenqg.webp)**厚涂**![风格词示例：虚幻引擎](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/KsHHb34kUo5Pd5x7O37csMq9nec.webp)**虚幻引擎**![风格词示例：池核风格](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/BQbWbrpr4om9tbxgCeXcwObAnId.webp)**池核风格**![风格词示例：侘寂风格](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/ZUjsb4isQohfSdxxVA6cT8Cgnbf.webp)**侘寂风格**![风格词示例：酸性设计风格](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/OnFzbkXPcoM95rxQKHKcgFpQnKc.webp)**酸性设计风格**![风格词示例：复古未来主义](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/Gd6wbLCZzopV5Axt9AQcNX2onRb.webp)**复古未来主义**![风格词示例：怪核](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/ArWHbGxm2oSHX3xuYxpcuuaKnXg.webp)**怪核**![风格词示例：老照片滤镜风格](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/YeKHbcu5zocAVoxbFBncTpWkneO.webp)**老照片滤镜风格**![风格词示例：漏光滤镜风格](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/UCKxbBP1PogbfEx5EolcAmBmnmn.webp)**漏光滤镜风格**![风格词示例：原画](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/Rr0FbXq8Rom5O5xhwPoc2aMxnae.webp)**原画**![风格词示例：洛可可](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/PbT2bBorloLp7YxUDAOcyn5AnTh.webp)**洛可可**![风格词示例：水彩](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/DrIfbsADKoHOo7xxcjfc6ao2nmf.webp)**水彩**![风格词示例：工笔风格](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/MpG3bnDW7oNrvBxPGAccdH7gnRQ.webp)**工笔风格**![风格词示例：皴法](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/N3tQb96ywo2IIexTKk0c6sHQnoB.webp)**皴法**![风格词示例：偶动画风格](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/QluBb54GCoKGHAxIrmwca2lFnYf.webp)**偶动画风格**![风格词示例：古早日漫](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/RG0dbwI4QooE5Rx6JK8cTtl8nv5.webp)**古早日漫**![风格词示例：Q版风格](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/FgNcbj62ro0Bw2x37rYcNZIPn5c.webp)**Q版风格**![风格词示例：丝网印刷风格](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/VgC7bR2TWodYSFxUgvRcWNhUnaf.webp)**丝网印刷风格**

手册「风格词」的 22 个词和各自的示例图。

#### 美学词：18 组

美学词决定「拍成什么样」，管的是色调、光线、构图和镜头，通常几个词搭着用。

![美学词示例：冷色调、数字艺术、全景](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/L63PboiHEoSdShxJ5aQcFQaInOf.webp)**冷色调、数字艺术、全景**![美学词示例：胶片摄影、梦核、动态模糊](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/GMZRb88Aro9nHixckfScGveyn6d.webp)**胶片摄影、梦核、动态模糊**![美学词示例：暗调、古典、近景](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/RFMGb1N6yo1QK4xNm4ecS56Injc.webp)**暗调、古典、近景**![美学词示例：闪光灯、过度曝光、高透光感](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/Qk1Cbj9QDoeMSSxoOmVczBtWnze.webp)**闪光灯、过度曝光、高透光感**![美学词示例：微距摄影、暗色调、背景虚化](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/RodkbGLq2oCxaxxgs1KcXr9Pndd.webp)**微距摄影、暗色调、背景虚化**![美学词示例：怪诞电影艺术、荒诞主义](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/Wmzbbqf3cogXTExXBWtcdMd4nTf.webp)**怪诞电影艺术、荒诞主义**![美学词示例：复古摄影、蓝红灰色调、平时视角](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/V1D5btim0oFl0Ixmi2OcGKplnwH.webp)**复古摄影、蓝红灰色调、平时视角**![美学词示例：过度曝光、失焦](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/WSysbalAjoYdmexw6Iccx0oynsb.webp)**过度曝光、失焦**![美学词示例：三角形构图、线性光影、现代感](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/AavibvPamo12nMxeCKGcsBsknsf.webp)**三角形构图、线性光影、现代感**![美学词示例：人像摄影、俯拍、浅景深](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/MmiVbWaBUorooLxYH8RcbhFKnmd.webp)**人像摄影、俯拍、浅景深**![美学词示例：复古色系、蓝绿色调、侧面视角](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/SBgPbGScjoFdH3xw71ScTOKonSg.webp)**复古色系、蓝绿色调、侧面视角**![美学词示例：广告摄影、精致氛围](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/VULLbCHIooHRBxxD94FcVM9jnFh.webp)**广告摄影、精致氛围**![美学词示例：商业广告摄影、玻璃散射光](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/Ikumb0ZI9oBh6rxci3EclDCbn9e.webp)**商业广告摄影、玻璃散射光**![美学词示例：框型构图、高饱和、日暮色系](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/ZuIPblMcloHF3Bxc4Ajcy531nrb.webp)**框型构图、高饱和、日暮色系**![美学词示例：特写镜头、暖色调、高饱和](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/XpccbWQegoB2uexa2o9cOfQenod.webp)**特写镜头、暖色调、高饱和**![美学词示例：动态模糊、低饱和、梦幻氛围](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/IeocbBpaBoOzAqx10jecRpQFnxd.webp)**动态模糊、低饱和、梦幻氛围**![美学词示例：中饱和度、朦胧、柔焦](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/ArtJbk6W2o8X0nxPqlSc0UGOnAh.webp)**中饱和度、朦胧、柔焦**![美学词示例：黑白摄影、逆光、动态模糊](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/YoH9bpdRIogeD2xW74Jc19RIn9e.webp)**黑白摄影、逆光、动态模糊**

手册「美学词」的 18 组词和各自的示例图。

### 九条技巧：怎么写，输出才稳

手册的最后一节叫「如何让输出更稳定」，一共九条。前五条管怎么写一条提示词，后四条管怎么改图。

#### 写提示词：先搭骨架，再填细节

1. **先写任务，再写风格：**先说明要生成什么、改成什么，再补充氛围、质感、风格词。
2. **开头先定整体骨架，不要一上来堆细节：**先讲清这是什么图、什么构图、版面怎么分。是海报还是信息图，左文右图还是中心对称，分几个功能区。模型先拿到全局框架，细节才知道往哪放。
3. **结构比形容词更重要：**尽量写清位置、层级、构图、模块关系，少写「高级感」「氛围感」。
4. **描述落到看得见的东西：**「氛围感」「皮肤变好」这类抽象词，换成具体的氛围或风格词，换成「皮肤细腻、真实、祛痘、磨皮」。
5. **文字要逐字给全、分层级：**要出现的字必须放在引号里，按需要写清字体、字重、颜色、对齐方式、行数。改字时要精确到「什么位置的哪个词换成什么」，并声明原排版、行距、背景补全保持一致。

前三条说的是顺序。以手册里那张「艺考留学名校冲刺营」封面为例，照这个顺序写，模型是这样一步步「听懂」的：

示意图 · 先任务，再骨架，再文字，最后风格

**1 · 任务**一张竖版 3:4 的小红书封面，主题「艺考留学名校冲刺营」**2 · 骨架**版面分几块：标题在上，人物居中，两侧放标签，底部放口号**3 · 文字**每块要写的字，放进引号逐字给全**4 · 风格**日系杂志拼贴风，电光蓝、柠檬黄为主色

**示意图：**画框是我们按手册第 1、2、3、5 条的顺序画的；主题、文字和配色取自手册这张封面的提示词和成图。

![同一主题的两张封面对比：左边没有交代结构层级，右边交代了结构层级](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/NAbRbnh6SotZQjxdFRQcOwsYnkf.webp)

手册的对照：同一个主题，左边的提示词没讲结构层级，右边讲了。右边的标题、人物、标签各在各的位置，主次更清楚。图下方的小字是两条提示词的全文。

![抽象氛围描述和具体氛围描述的两张古风人像对比](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/YpRHbh5gUosDjfxGMOWclTwOn9u.webp)

第四条的对照。左边写的是「低饱和」「整体具有氛围感」这类笼统的词；右边写的是「富士相机拍摄、前景虚化、肌理磨砂、低饱和度色彩、轮廓光、近景拍摄」这些看得见的东西。

第五条关于文字。手册那张考公封面的提示词，就是照这条写的：

拆一条手册里的提示词

小红书考公宣传海报，严格保持参考图的排版结构：左上角放一个可爱的卡通学习兔子形象（戴眼镜抱书），四行大标题加粗黑色左对齐排列："是我的错觉吗？""都说考公不用报班""结果考上的都是""报班的"，其中"考公"和"报班"两个词用橙色圆圈标注，右下角放一个捂嘴震惊的粉色桃子表情包，整体底色换成清新的淡奶蓝色……

**层级和排版：**几行、多粗、什么颜色、怎么对齐**逐字给全：**每一行要写的字都在引号里**精确到词：**哪两个词要特别处理
![考公宣传封面：四行大标题，考公和报班两个词被橙色圆圈圈出](https://pic.xiaohu.ai/jiedu-media/seedream-5-5-user-guide/CXMUbt9aVoll4RxrIx8c18pBnfh.webp)

颜色是我们标的。成图里四行标题一字不差，「考公」「报班」被橙色圈了出来。

#### 改图：分清留什么、变什么

1. **多图参考先判角色，指令前置：**用参考图时，先用一句话说清每张图提供什么，是主体形象、配色风格还是版式骨架。编辑指令以「将参考图 X……」起句，紧跟「改什么、留什么、新增什么」；相同的地方直接声明「保持一致」，变化的地方写清从什么状态变成什么状态。
2. **分清「保留」和「变化」：**哪些内容保持不变，哪些需要新增、替换、删除，明确分开写。
3. **多轮编辑每轮都要自包含：**不要写「上一轮那个」，直接说明这次改什么、其他什么保持不变。
4. **复杂动作拆开写：**人物多、动作复杂、连续性要求高的时候，越要收紧约束、分步迭代。

第六、七条在手册的示例里随处可见。比如美妆那条，一句话里三件事分得清清楚楚：

拆一条手册里的提示词

参考图2的雀斑烟熏妆，替换图1人物的妆容，保持图1的发型、面部特征与背景不变

**每张图给什么：**图 2 只提供妆容**改什么：**图 1 人物的妆**留什么：**发型、面部特征、背景

颜色是我们标的。对应的成图见上文「美妆 · 雀斑烟熏妆」。

第八条最容易被忽略。你自己记得上一轮加了什么，但每一轮的指令最好单独拿出来也看得懂：

✕ 靠前文才看得懂把上一轮加的那个换成蓝色
✓ 单独拿出来也看得懂把图中桌面右侧的红色马克杯改成蓝色，其他部分保持不变

两句例句是我们按第八条的要求写的，不是手册原文。

### 上哪儿用

Seedream 5.5 正陆续在下面几个地方上线，官方给的入口是：

- **即梦网页版：**创作 → 生成 / 画布 → 选择 Seedream 5.5。
- **豆包 App / 网页版：**图像生成 → 选择模型 Seedream 5.5。
- **豆包工作：**技能 → Seedream5.5。
- **火山方舟体验中心：**视觉模型 → 图片生成 → Doubao-Seedream-5.5。

官方还预告，Seedream 5.5 系列后续会推出 Pro 版本，并会支持更复杂的上下文输入和创作指令。

第一次上手，建议从最小的一步开始：拿一张自己的照片，只改一处，提示词写「把图中某某改成某某，其他部分保持不变」，然后在结果上接着改第二处、第三处。改到第五轮还像原来那张图，你就知道这一版的价值在哪了。
[站内延伸豆包创意设计操作手册：从一张参考图做到整套可改的设计想在豆包里把一张主视觉扩展成详情页、海报整套物料，这篇有完整的操作步骤。](https://xiaohu.ai/article/doubao-creative-design-upgrade/)来源即梦 Seedream 5.5 用户手册字节跳动·2026-11-09·[查看主材料](https://bytedance.larkoffice.com/wiki/HemGw60SaiOEr7kAFDLcMIqin4l)延伸[生成更真实，百轮编辑更稳定｜Seedream 5.5 发布（Seed 官方博客）](https://seed.bytedance.com/zh/blog/more-realistic-images-more-stable-editing-across-100-rounds-introducing-seedream-5-5)·[Seedream 5.5 项目主页](https://seed.bytedance.com/seedream5_5)本站说明另参考官方《Seedream 5.5 稿件资料包》。图片和视频均来自手册、官方博客和项目主页；标「示意图」的为本文自绘。

↑ 正文结束
✓ 本篇全文免费开放

读完还有疑问？会员每天能问小互 30 次，每句带出处；还有一份按你口味挑好的每日 AI 日报。
[成为会员 $59/年](https://xiaohu.ai/buy/?plan=year&slug=seedream-5-5-user-guide&from=tail)[按月 $6.99](https://xiaohu.ai/buy/?plan=monthly&slug=seedream-5-5-user-guide&from=tail)

7 天内不满意全额退 · [看会员能多什么 →](https://xiaohu.ai/membership/)

[阅读原文 ↗](https://bytedance.larkoffice.com/wiki/HemGw60SaiOEr7kAFDLcMIqin4l)

📮 新解读每晚进邮箱

读完觉得有用？留个邮箱，每晚一封当天的新解读，随时退订。
