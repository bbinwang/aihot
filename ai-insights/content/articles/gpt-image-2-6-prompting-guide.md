---
title: "GPT Image 2.6 官方提示指南 从参考图到局部改图 提示词该怎么写"
date: 2026-11-06T00:00:00.000Z
tags: ["AI 实操", "OpenAI", "图像生成", "提示词", "聚合"]
summary: "从一次花瓶改色看懂 GPT Image 2.6 的局部编辑，再用同一套方法写构图、参考图和文字要求。"
---
> **原文链接**: [https://developers.openai.com/api/docs/guides/image-prompting](https://developers.openai.com/api/docs/guides/image-prompting)
> **来源**: developers.openai.com
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/gpt-image-2-6-prompting-guide/) · 2026/11/6
> **说明**: 本文由 AIHot 自动聚合(原文即中文,未翻译)。正文取自小互 AI 解读

---

全文 Markdown · 会员

作者：OpenAI11-06 · 约 10 分钟⚑ 方法教程![](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/social/zh-46a4bfc4be45.png)

OpenAI 发布了新一代图像生成与编辑模型 GPT Image 2.6，并在 ChatGPT 和 Codex 同步上线。在 ChatGPT 里，可以用文字或图片生成循环 GIF，也可以保存人物、宠物或角色的参考图，在新作品里继续用。

开发者可以通过 API 调用 **GPT Image 2.6 Flare** 和 **Sunburst** 两个版本。Flare 出图更快，适合多试几个草稿。Sunburst 更适合细节多、需要反复改的图，比如每轮都要保住商品外形或人物长相。开发者还可以用单独的标注图层指明改哪里，输出可继续编辑的 SVG，并把构图规划和画质分开调。[站内发布解读](https://xiaohu.ai/article/openai-images-2-6/)

标注图层能指出要改哪件东西。改成什么样、哪些细节要留下，还得在提示词里说清楚。OpenAI 发布了 GPT Image 2.6 官方提示指南，用实际案例讲解构图、参考图和局部编辑的提示词怎么写。[OpenAI 官方提示指南](https://developers.openai.com/api/docs/guides/image-prompting)

指南拿一张厨房照片做演示。桌上的条纹花瓶要换成钴蓝色，原来的瓶形、里面的干花和厨房里的其他东西都要留下。

文中的中英双语提示词可直接拿去复练，按官方案例改写。原图、参考图和成图均来自官方指南。每组都附官方原文入口，想按原提示词逐字复现时可以直接查看。

### 用红圈标出要改的物件

调用 `POST /v1/images/edits`，用 multipart 把原图和透明圈图分开传。这两张输入都是 1200×900。圈图只作用于首张输入，后续图是参考。发送 `markup` 时省略 `mask` 和 `prompt_rewriter`。

提示词写清把红圈里的条纹花瓶改成钴蓝色陶瓷，保留瓶形和干花，成图去掉红圈。

1. **准备原图与同尺寸标注层**上传第一张需要修改的原始图片，同时准备一张宽高像素完全相同的透明 PNG 图像。
2. **在标注层绘制闭合红圈**使用纯红色画笔在透明图层上圈出需要改变的目标物体或局部范围。
3. **以多部分请求提交两个文件**将原图填入 image 字段，将红圈透明图填入 markup 字段，在此请求中省略 mask 与 prompt_rewriter。
4. **提示词锁定变更与保留边界**明确要求将圈内物体替换为指定目标，同时强调保留圈外光影、环境与物体接触阴影，并要求抹除红圈标记。

两款模型均成功将花瓶变蓝、保留干花并去除了红圈，但仍需对照原图核查圈外区域。若业务要求其余区域像素绝对一致，可把验收通过的编辑结果合成回原图。

#### 圈出花瓶，只改它的颜色

原照和透明红圈图都是 1200×900。原照放 image，红圈层放 markup；第三张只是叠加预览。两款模型都是 size=auto、画质 medium、PNG。对照原照检查圈外。

![原始厨房照片](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/kitchen.webp)

原始厨房照片

![单独上传的透明红圈图层](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/markup-vase-overlay-gpt-image-2-6.png)

单独上传的透明红圈图层

![原图叠上红圈后的定位预览](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/markup-vase-input-gpt-image-2-6.webp)

原图叠上红圈后的定位预览

中文提示词

```
请把红圈指向的条纹花瓶改成纯钴蓝色陶瓷。沿用它现在的形状，瓶里的干花和厨房陈设都要保留。交付照片里不要出现红圈。
```

English prompt

```
The red annotation identifies the striped vase. Give that vase an even cobalt-blue ceramic finish, keeping its form, the dried arrangement and the kitchen intact. Deliver a clean photograph without the annotation.
```

![Flare · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/markup-vase-gpt-image-2-6-flare.webp)

Flare · 官方成图

![Sunburst · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/markup-vase-gpt-image-2-6-sunburst.webp)

Sunburst · 官方成图

[查看官方原提示词与例图](https://developers.openai.com/api/docs/guides/image-prompting#guide-an-edit-with-markup)

移走物品也能用同一写法。请移除蓝帽男子手里的花，保留表情、手势和砖墙。出图后尤其检查花后面补出来的手指。

#### 从手里移走一朵花

1024×1536，画质 medium。编辑后检查手指、姿势、光线和周围画面。

![男士拿花的原图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/man-with-blue-hat.webp)

男士拿花的原图

中文提示词

```
请把男子手里拿的花去掉。保留他的手势、姿势、表情、光线和原构图。
```

English prompt

```
Take away the flower held by the man while leaving his gesture, pose, expression, lighting and framing as they are.
```

![Flare · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/man-with-no-flower-gpt-image-2-6-flare.webp)

Flare · 官方成图

![Sunburst · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/man-with-no-flower-gpt-image-2-6-sunburst.webp)

Sunburst · 官方成图

[查看官方原提示词与例图](https://developers.openai.com/api/docs/guides/image-prompting#remove-an-object)

换家具时写明只把白餐椅换成木椅，保留机位、采光、地砖和其余家具。出图后看椅腿有没有落在地上，也检查接触阴影和玻璃桌上的倒影。

#### 只把白色餐椅换成木椅

1536×1024，画质 medium。核对机位、原有采光和椅腿接触地面时的阴影。

![原始厨房照片](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/kitchen.webp)

原始厨房照片

中文提示词

```
把这张室内照片里的白餐椅换成木椅，其他家具和陈设留在原位。保留相机角度、室内光线和原来的地面阴影，让新椅腿和地面的接触阴影、材质细节看起来自然。
```

English prompt

```
Swap the white dining chairs for wooden chairs in the supplied room photo. Keep the camera position, existing light, floor shadows and surrounding furnishings. Give the new chairs convincing material texture and believable shadows where they meet the floor.
```

![Flare · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/kitchen-chairs-gpt-image-2-6-flare.webp)

Flare · 官方成图

![Sunburst · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/kitchen-chairs-gpt-image-2-6-sunburst.webp)

Sunburst · 官方成图

[查看官方原提示词与例图](https://developers.openai.com/api/docs/guides/image-prompting#change-furniture-in-a-room)

### 什么时候用 Flare，什么时候用 Sunburst

任务看重出图速度，就先试较小的 Flare。布局复杂、小字多、局部修改要求高时，先试 Sunburst。

速度优先工作流

##### GPT Image 2.6 Flare

适用于高吞吐量接口、即时交互界面与构图相对常规的日常生成，在保障可用画质的同时提供极低响应延迟。

精度优先工作流

##### GPT Image 2.6 Sunburst

适用于密集文字海报、复杂信息图表、多参考图换装以及严苛的局部标注修改，构图规划与细节还原能力更强。

原来用 2.5 Flare 或 2.5 Sunburst，就先测对应的 2.6 型号。用 GPT Image 2 时，手头任务已达标可先试 Flare，原来做不好的复杂任务先试 Sunburst。Sunburst 通过验收后，可以用同一提示词、参考图、尺寸、画质和输出格式复试 Flare，再比较成图通过率、耗时与成本。

#### 把写实感拆成可见的细节

1024×1536，画质 medium。看眼平视角、人物姿态、柔光和旧物的纹理。

中文提示词

```
做一张自然抓拍风格的照片。年长的渔民站在小船上整理渔网，狗蹲在旁边的甲板上。保留晒痕、皱纹、毛孔和褪色的水手纹身。用 35 毫米胶片的颗粒感，50 毫米镜头风格，眼平中近景和浅景深。海边日光柔和，颜色自然，衣物和工具带磨损感，避免摆拍和重度修饰。
```

English prompt

```
Show an older fisherman tending a net aboard a small boat, with his dog sitting on the deck. Frame him at eye level in a medium close-up, evoking a 50 mm lens and fine-grained 35 mm film. Use muted coastal daylight and a gently blurred background. Keep weathered skin, pores, old arm tattoos and used equipment visible. Let the moment feel unposed, with natural colors and light retouching at most.
```

![Flare · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/photorealism-gpt-image-2-6-flare.webp)

Flare · 官方成图

![Sunburst · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/photorealism-gpt-image-2-6-sunburst.webp)

Sunburst · 官方成图

[查看官方原提示词与例图](https://developers.openai.com/api/docs/guides/image-prompting#control-style-and-lighting)

### 构图怎么排，细节怎么画

把构图规划和细节渲染分开调。同一份提示词，可以先看版面和物件关系是否对，再看字和材质是否够清楚。

参数 complexity 专门控制模型在正式落笔前的构图推演深度，包含 low、medium、high 三档可选，在缺省状态下 Flare 与 Sunburst 均默认开启 high。另一个核心参数 quality 则负责控制画面能容纳的微观信息量，提供 auto、low、medium、high、xhigh 与 max 六档调节。

官方用 Sunburst 比较三档。每档各出一张，固定同一提示词、`1024x1536`、`quality="medium"` 和 PNG 格式。如果已写清布局、文字和风格，升档的变化可能很小。只改一个细节，可以从 `low` 试起。

对比调优时，版面排布有问题应固定 quality 比较 complexity。若版面合理但小字发糊，则应固定 complexity 比较 quality 档位。

#### 足球剪纸比较规划复杂度

Sunburst 固定画质 medium、1024×1536 和 PNG，complexity 分别设 low、medium、high。观察冠军牌子摆在哪儿、奖杯怎么设计，以及前景留给了谁。

中文提示词

```
请用手工叠纸的质感做一张足球插画。座无虚席的球场里，一支球队正在庆祝夺冠。让不同高度的纸层形成真实阴影，呈现精致的手工细节。队服、奖杯和标语的位置由你安排。
```

English prompt

```
Illustrate a title-winning football squad celebrating in a stadium full of spectators. Build the scene as a carefully crafted paper collage, with stacked cutouts that cast small shadows. Decide how the kits, trophy and any celebration signage should fit the composition.
```

![Sunburst · complexity low](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/paper-cut-football-effort-low-gpt-image-2-6-sunburst.webp)

Sunburst · complexity low

![Sunburst · complexity medium](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/paper-cut-football-effort-medium-gpt-image-2-6-sunburst.webp)

Sunburst · complexity medium

![Sunburst · complexity high](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/paper-cut-football-effort-high-gpt-image-2-6-sunburst.webp)

Sunburst · complexity high

[查看官方原提示词与例图](https://developers.openai.com/api/docs/guides/image-prompting#compare-complexity)

常用尺寸有 `1024x1024`、`1536x1024` 和 `1024x1536`。自定义尺寸的宽和高都要是 16 的倍数，比例在 1:3 到 3:1 之间，还要符合模型的尺寸限制。横版幻灯片示例用 `1536x864`。2.6 编辑请求省略 `input_fidelity`，模型不支持 `reasoning.summary`。透明位图设置 `background="transparent"` 和 PNG 或 WebP。`background` 也可选 `auto`、`opaque`。只有 JPEG 和 WebP 支持 `output_compression`。

### 把想看到的画面写清楚

一行自然语言、完整段落或有标签的分块都可以。先交代图的用途和画幅，再描述主体位置、人物动作与视线、材质和光从哪里来。镜头规格给模型的是视觉线索。必须印在画面上的文字用引号标出，写清位置、字体和出现次数。少见的品牌名可以逐字母拼写，成图再逐字核对。

结构化提示词模版

```
[场景定位] 明确交付形式，如电商产品白底图、科技企业路演幻灯片或四格故事条漫。
[核心主体] 描述人物或物体外观、姿态、相对比例与动作细节，避免模糊修饰词。
[视觉特征] 指定真实材质、光影方向、镜头景深与色彩基调，写实场景明确要求实拍质感。
[排除约束] 引号包裹必须完全一致的字样，声明禁止额外文字、多余杂物与过度磨皮。
```

画有明确年代的场景时，把时间、地点和可见特征一起写进去。官方用 1969 年的伍德斯托克音乐节示范，给了地点和观众、舞台等线索。成图可用来呈现当时的场景，涉及史实的服装、人物和位置仍需查证。

#### 用时间和地点写清历史场景

1024×1536，画质 medium。两幅都是模型生成的历史场景示意，衣着、舞台和环境仍需核对史料。

中文提示词

```
做一张像现场摄影的户外人群图，地点是纽约州贝瑟尔，时间是 1969 年 8 月 16 日。服装、舞台布置和周围环境应符合当时当地的情景。用纪实拍摄的视角表现人群。
```

English prompt

```
Depict an outdoor crowd in Bethel, New York, on August 16, 1969, as if photographed on location. Set the clothes, stage setup and surroundings in that specific place and period. Use an observational documentary framing.
```

![Flare · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/world-knowledge-gpt-image-2-6-flare.webp)

Flare · 官方成图

![Sunburst · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/world-knowledge-gpt-image-2-6-sunburst.webp)

Sunburst · 官方成图

[查看官方原提示词与例图](https://developers.openai.com/api/docs/guides/image-prompting#use-historical-and-real-world-context)

比如做品牌海报，可以写清只显示指定标语、文字放哪、用什么字体，再限制多余文字和水印。

#### 让街头海报准确写出指定文案

1024×1536，画质 medium。交稿前逐字核对拼写、标点和出现次数。

中文提示词

```
为青年街头服饰品牌 Thread 做一张时尚广告。一群朋友自然地聚在一起，画面有当代街头感、鲜明色彩和专业服装摄影的质感。把“Yours to Create.”放进构图，字要清晰，全文只出现一次。不要另加文字、水印或无关标志。
```

English prompt

```
Design a polished youth streetwear campaign for Thread. Photograph a group of friends in relaxed poses, with a strong color palette and contemporary fashion styling. Place the line “Yours to Create.” once where it can be read easily. Exclude unrelated logos, watermarks and any other lettering.
```

![Flare · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/thread-ad-gpt-image-2-6-flare.webp)

Flare · 官方成图

![Sunburst · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/thread-ad-gpt-image-2-6-sunburst.webp)

Sunburst · 官方成图

[查看官方原提示词与例图](https://developers.openai.com/api/docs/guides/image-prompting#render-exact-text)

面向科学图解或商业路演等场景时，准确性要求需转为具体核查步骤。官方路演幻灯片中的市场规模数字与引文纯属虚构，成图还自行添加了 CAGR 和逐年柱值，使用前必须逐一核准。

#### 给路演幻灯片写一份版式要求

1536×864，画质 high。下列数字与脚注用于演示，正式使用前应换成可核实的数据，逐项核对模型添加的数值。

中文提示词

```
做一张标题为“Market Opportunity”的横版 A 轮路演页。白底，用 Inter 一类无衬线字体。把 TAM 420 亿美元、SAM 87 亿美元、SOM 3.4 亿美元放进低饱和蓝灰同心圆。下方放 2021 到 2026 年略有上升的柱状图；这些年份未提供实际值，图表只演示版式。底部保留示例脚注“AGI Research, 2024”和“Internal analysis”，右下角留一个标志占位。去掉装饰、渐变和阴影。
```

English prompt

```
Lay out a clean Series A deck slide titled “Market Opportunity.” Put TAM of $42B, SAM of $8.7B and SOM of $340M into nested blue-gray circles. Below them, show a gently rising 2021–2026 bar chart as a layout demonstration with no verified annual figures. Place “AGI Research, 2024” and “Internal analysis” in the footnote area and leave a logo placeholder at the lower right. Use a white canvas, modern sans-serif type and restrained spacing, without stock art, shadows or gradients.
```

![Flare · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/market-opportunity-slide-gpt-image-2-6-flare.webp)

Flare · 官方成图

![Sunburst · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/market-opportunity-slide-gpt-image-2-6-sunburst.webp)

Sunburst · 官方成图

[查看官方原提示词与例图](https://developers.openai.com/api/docs/guides/image-prompting#build-slides-diagrams-and-charts)

科学教育图解要给出受众、必要的反应阶段和分子标签。成图后检查每条箭头、物质关系与标注。

#### 为高中生画一张细胞呼吸图

1536×1024，画质 high。图中每个分子、箭头和位置都要用教材核对。

中文提示词

```
为高中生画一页题为“Cellular Respiration at a Glance”的讲义图。用箭头串起糖酵解、克雷布斯循环和电子传递链，说明细胞怎样从葡萄糖获得能量。标出葡萄糖、丙酮酸、ATP、NADH、FADH₂、CO₂、O₂ 和 H₂O。白底，符号简单，文字足够大，不加会干扰理解的装饰。
```

English prompt

```
Make a high-school handout headed “Cellular Respiration at a Glance.” Use arrows to show how glycolysis, the Krebs cycle and the electron transport chain relate as the cell obtains energy from glucose. Label glucose, pyruvate, ATP, NADH, FADH₂, CO₂, O₂ and H₂O. Keep the background white, symbols simple and type readable at handout size.
```

![Flare · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/scientific-educational-cellular-respiration-gpt-image-2-6-flare.webp)

Flare · 官方成图

![Sunburst · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/scientific-educational-cellular-respiration-gpt-image-2-6-sunburst.webp)

Sunburst · 官方成图

[查看官方原提示词与例图](https://developers.openai.com/api/docs/guides/image-prompting#create-scientific-and-educational-visuals)

面向移动端界面原型展示时，提示词应当假定该应用已经真实发布，明确写出顶部导航状态、摊位列表图文排布、当日特价卡片与底部标签栏组件，要求套入真实的手机边框中展示，避免产生模糊的概念草图感。

#### 让界面草图像真实产品页面

1024×1536，画质 medium。看功能层级和排版，画面是界面预览。

中文提示词

```
设计一个本地农夫市集的手机应用首页。顶部告诉用户今天开市，下面用小图和分类列出几家摊位，加一个今日特价区，并让地点和营业时间容易找到。白底，配少量自然色，字体清楚。把完成的界面放入 iPhone 外框。
```

English prompt

```
Mock up the home screen of a working farmers’ market app. Lead with today’s market, then show a few vendors with thumbnails and category labels. Include a small specials section and make the hours and location easy to find. Use white space, restrained nature-inspired accents and readable type. Present the screen inside an iPhone frame.
```

![Flare · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/ui-farmers-market-gpt-image-2-6-flare.webp)

Flare · 官方成图

![Sunburst · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/ui-farmers-market-gpt-image-2-6-sunburst.webp)

Sunburst · 官方成图

[查看官方原提示词与例图](https://developers.openai.com/api/docs/guides/image-prompting#create-an-interface-preview)

画四格条漫时，逐格交代动作和视线落点，再看人物和动作能不能接起来。

#### 把宠物的一场闹剧拆成四格

1024×1536，画质 medium。用四个清楚的动作节点讲完故事。

中文提示词

```
画一条四格竖版漫画。第一格主人离家，宠物趴在窗上，睁大眼睛看着门口。第二格门锁咔哒一声，宠物回头望向空荡荡的屋子，准备行动。第三格它横躺在沙发上，旁边是碎屑，阳光照得像舞台。第四格主人推门回来，宠物已经端端正正坐在门边，像什么也没发生。
```

English prompt

```
Draw a four-panel comic in a single vertical column. Open with the owner leaving and the pet watching wide-eyed from the window. After the latch clicks, have the pet turn to survey the now-empty home. Give the third panel to the pet sprawled across the couch, with crumbs nearby and a shaft of light like a stage spotlight. End as the owner returns to find the pet sitting neatly at the entrance.
```

![Flare · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/comic-reel-gpt-image-2-6-flare.webp)

Flare · 官方成图

![Sunburst · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/comic-reel-gpt-image-2-6-sunburst.webp)

Sunburst · 官方成图

[查看官方原提示词与例图](https://developers.openai.com/api/docs/guides/image-prompting#turn-a-story-into-a-comic-strip)

#### 用同一张流程图做西语版

让模型按顺序画清咖啡机各部件和流向，再把成图交回去，只换成西语标签。对照检查译文、原来的版式、箭头，以及是否还留着英文。

#### 把咖啡机的流程画出来

1024×1536，画质 medium。先看物料怎么流动，再核对标签、箭头和部件关系。

中文提示词

```
画一张全自动咖啡机的技术信息图，让第一次拆解机器的人看懂咖啡豆和水各自走哪条路线。把豆仓、研磨、称量、水箱和加热部件画出来，用标注和箭头连起流程，清楚区分每条路线。
```

English prompt

```
Make a technical illustration that helps a newcomer trace coffee and water through a bean-to-cup machine. Identify the bean hopper, grinder, weighing stage, reservoir and heater. Label the parts and use directional arrows to distinguish the paths through the machine.
```

![Flare · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/infographic-coffee-machine-gpt-image-2-6-flare.webp)

Flare · 官方成图

![Sunburst · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/infographic-coffee-machine-gpt-image-2-6-sunburst.webp)

Sunburst · 官方成图

[查看官方原提示词与例图](https://developers.openai.com/api/docs/guides/image-prompting#explain-a-process-visually)

#### 把咖啡机图改成西语，保留原排版

1024×1536，画质 high。两款模型各自以上一节对应的英文咖啡机成图为输入。核对西语译文、漏译、箭头和版面。 [对应模型的英文咖啡机图](https://xiaohu.ai/article/gpt-image-2-6-prompting-guide/#case-explain-a-process-visually)。

中文提示词

```
把输入信息图里读得到的文字都换成西班牙语。图标、箭头、排版和其他画面元素沿用原图。
```

English prompt

```
Replace the infographic’s lettering with Spanish translations. Retain its existing layout, illustrations, arrows and other visual details.
```

![Flare · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/infographic-coffee-machine-sp-gpt-image-2-6-flare.webp)

Flare · 官方成图

![Sunburst · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/infographic-coffee-machine-sp-gpt-image-2-6-sunburst.webp)

Sunburst · 官方成图

[查看官方原提示词与例图](https://developers.openai.com/api/docs/guides/image-prompting#translate-while-preserving-layout)

### 给每张参考图分一项工作

还可以把同一写法用到几种小任务。线稿转实景时保留透视和比例，并写明不要增添新元素或文字。把人放进新场景时交代人物和环境的相对尺度、受光方向及动作。做贺卡或玩具包装时给出唯一要印的文案、文字位置和材质，并要求用原创图样、避开现有商标。

给参考图编号，再说明每张只提供什么。人物、衣服、背景和画风可以各用不同图片，最后交代哪样东西要移到哪里。

在人物换装测试中，将博物馆内的一名女士作为身份基准图，另外传入米色西装外套、白色背心与灰色高筒靴三张单品商品图。提示词必须明确要求禁止改变女士的面部特征、肤色、发型、体态与站姿，仅仅允许将指定的衣物贴合人体结构穿戴在身上，并使新服装的布料褶皱与场景原本的暖色室内光照完美交融。

#### 参考图分工，让同一位女士换装

1024×1536，画质 medium。第一张提供人物身份、姿势和场景，后三张分别提供外套、背心和靴子。

![人物身份参考原图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/woman-in-museum.webp)

人物身份参考原图

![服装参考 · 外套](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/jacket.webp)

服装参考 · 外套

![服装参考 · 背心](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/tank-top.webp)

服装参考 · 背心

![服装参考 · 长靴](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/boots.webp)

服装参考 · 长靴

中文提示词

```
给博物馆照片中的女士换上参考图里的外套、背心和长靴。让衣服顺着她原来的身形和站姿自然起褶，并匹配现场光线和阴影。她的脸、肤色、表情、发型、身材比例与姿势都要保留，相机角度、画面裁切和背景也沿用原照。不要另加配饰、文字、标识或水印。
```

English prompt

```
Dress the museum subject in the jacket, tank and tall boots shown in the other three inputs. Fit the garments to her existing stance and proportions, with fabric folds and shadows that match the room. Keep her likeness, complexion, expression, hair and pose, as well as the original camera position, framing and setting. Add no accessories, lettering, branding or watermark.
```

![Flare · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/outfit-gpt-image-2-6-flare.webp)

Flare · 官方成图

![Sunburst · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/outfit-gpt-image-2-6-sunburst.webp)

Sunburst · 官方成图

[查看官方原提示词与例图](https://developers.openai.com/api/docs/guides/image-prompting#preserve-identity-and-change-clothing)

把街景人物照作为图一，带狗的照片作为图二。只把图二的狗放到图一人物旁边，沿用图一背景，匹配原画面的比例和受光。

#### 只把第二张照片里的狗加到第一张

1024×1536，画质 medium。图一提供街景与女主角，图二只提供狗。

![图一 · 街景与女主角](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/test-woman.webp)

图一 · 街景与女主角

![图二 · 只借用照片里的狗](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/test-woman-2.webp)

图二 · 只借用照片里的狗

中文提示词

```
以第一张照片为底图，把第二张里的狗放在第一张女士身边。保留街景、女主角和原构图，给狗匹配图一的比例、受光和地面阴影。不要把图二的人也带进来。
```

English prompt

```
Use photo one as the base and bring over only the dog from photo two, placing it beside the woman. Match its scale, illumination and ground shadow to the street scene. Keep the woman, background and framing from the first photograph.
```

![Flare · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/test-woman-with-dog-gpt-image-2-6-flare.webp)

Flare · 官方成图

![Sunburst · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/test-woman-with-dog-gpt-image-2-6-sunburst.webp)

Sunburst · 官方成图

[查看官方原提示词与例图](https://developers.openai.com/api/docs/guides/image-prompting#combine-references)

在风格提取场景中，把像素游戏截图作为风格参考图，独立描述想要绘制的主体为骑摩托车的男子，模型便能纯粹提取像素点阵与高对比度色彩语言，在纯白背景上重新绘制全新的动势人物。

#### 借像素画风格，换成骑摩托车的人

1024×1536，画质 medium。第一张提供像素画媒介和配色，成图不沿用原游戏角色。

![像素风格参考](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/pixels.webp)

像素风格参考

中文提示词

```
参考输入图的像素笔触、色块和造型方式。在白底上画一个骑摩托车的男子，把参考图只当作画风示意。
```

English prompt

```
Draw a motorcyclist on a plain white field. Use the supplied artwork to guide the pixel treatment, palette and shapes. Treat it as a style sample while drawing a new subject.
```

![Flare · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/motorcycle-gpt-image-2-6-flare.webp)

Flare · 官方成图

![Sunburst · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/motorcycle-gpt-image-2-6-sunburst.webp)

Sunburst · 官方成图

[查看官方原提示词与例图](https://developers.openai.com/api/docs/guides/image-prompting#transfer-a-visual-style)

用山谷线稿做实景图时，说明保留原有布局、比例和透视。材料、光线可改成写实，画面里不要另加元素或文字。

#### 把山谷线稿变成实景，保留透视

1024×1536，画质 medium。按原图对照地形、河流走向和视角。

![原始山谷线稿](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/drawings.webp)

原始山谷线稿

中文提示词

```
用这张山谷线稿做一幅写实景观。维持草图的物件位置、比例和透视，给岩石、植被和水面配上合理的材质与光线。不要加入草图里没有的物件或文字。
```

English prompt

```
Render the supplied valley sketch as a photographic landscape. Keep the arrangement, scale and viewpoint of the drawing. Use plausible surfaces and light for the terrain, foliage and river. Introduce no extra objects or text.
```

![Flare · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/realistic-valley-gpt-image-2-6-flare.webp)

Flare · 官方成图

![Sunburst · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/realistic-valley-gpt-image-2-6-sunburst.webp)

Sunburst · 官方成图

[查看官方原提示词与例图](https://developers.openai.com/api/docs/guides/image-prompting#turn-a-drawing-into-a-realistic-image)

#### 把同一人物放到熊袭营地的新场景

1024×1536，画质 medium。博物馆人物照片用于核对身份，场景、服装和动作按新设定生成。

![人物身份参考原图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/woman-in-museum.webp)

人物身份参考原图

中文提示词

```
用参考照片中的女士做主角，保留她可辨识的五官和身体比例。场景是黄昏的优胜美地露营地，一只棕熊正在破坏营地，她穿着户外衣服逃离，脸上沾泥，衣服有破损，目光朝逃跑方向。用自然暮光和纪实色彩拍成像现场抓拍的画面，避开电影海报式打光和调色。
```

English prompt

```
Keep the woman from the reference recognizable by her face and proportions. Put her in a Yosemite campsite at dusk, fleeing a large brown bear that is tearing through the camp. Give her outdoor clothes, some dirt and torn fabric, with her eyes on the way out. Frame it as an on-the-spot photograph with natural evening light and grounded colors, without a movie-poster treatment.
```

![Flare · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/scene-gpt-image-2-6-flare.webp)

Flare · 官方成图

![Sunburst · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/scene-gpt-image-2-6-sunburst.webp)

Sunburst · 官方成图

[查看官方原提示词与例图](https://developers.openai.com/api/docs/guides/image-prompting#insert-a-person-into-a-scene)

### 拿上一次的成图接着改

每次拿上一轮满意的图接着改，一次只提出一个变化，关键的保留项再写一遍。

以公路户外大牌广告为例，首轮调用先根据洗发水商品图生成公路黄昏场景，并在大牌上精准打出 Fresh and clean 广告语。

#### 第一轮先做公路洗发水广告牌

1024×1536，画质 medium。用洗发水照片做产品参考，核对广告牌主标语和商品包装。

![原始洗发水商品图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/shampoo.webp)

原始洗发水商品图

中文提示词

```
把参考图里的洗发水放进一张黄昏公路广告牌效果图。牌面只写一次“Fresh and clean”，用居中、醒目、对比清楚的粗体无衬线字。保留商品包装的辨识度，不要另加标志或水印。
```

English prompt

```
Mock up a roadside billboard at sunset featuring the shampoo from the reference photo. Print “Fresh and clean” once, centered in bold high-contrast sans-serif type with comfortable spacing. Keep the package identifiable and leave off added logos or watermarks.
```

![Flare · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/billboard-gpt-image-2-6-flare.webp)

Flare · 官方成图

![Sunburst · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/billboard-gpt-image-2-6-sunburst.webp)

Sunburst · 官方成图

[查看官方原提示词与例图](https://developers.openai.com/api/docs/guides/image-prompting#create-the-starting-image)

把黄昏广告牌成图传给下一轮，请它改成下雪的冬日傍晚。结果保留了主标语，可以再对照牌框、瓶子和公路，看它们有没有跟着改。

#### 第二轮只把广告牌场景改成下雪

1024×1536，画质 medium。每款模型继续编辑自己第一轮的广告牌，核对场景与原标语。 [第一轮的两张广告牌](https://xiaohu.ai/article/gpt-image-2-6-prompting-guide/#case-create-the-starting-image)。

中文提示词

```
把这张公路广告牌照片改成冬日晚间飘雪的样子。保留广告牌的构图、原标语和商品布局，只换季节、天气及相应光线。
```

English prompt

```
Set this same roadside billboard in a snowy winter evening. Preserve the billboard composition, its existing headline and product arrangement while changing the weather, season and corresponding light.
```

![Flare · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/billboard-winter-gpt-image-2-6-flare.webp)

Flare · 官方成图

![Sunburst · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/billboard-winter-gpt-image-2-6-sunburst.webp)

Sunburst · 官方成图

[查看官方原提示词与例图](https://developers.openai.com/api/docs/guides/image-prompting#change-one-condition)

绘本也可以先做一张角色图。绿兜帽、腰包、小弓和水彩质感都能在下一页继续用。

#### 先画一张森林小英雄的角色参考

1024×1536，画质 medium。先确定容易在后续分镜复用的识别细节。

中文提示词

```
画一张儿童绘本角色图。主角是原创的年轻森林小英雄，戴绿色兜帽、穿软棕靴、腰间有小包，手里拿一把只用来帮忙的小木弓。表情温和，勇敢而亲切，会保护松鼠、鸟和兔子。用手绘水彩、柔边和暖色，略大的头和富有表情的脸。背景是一片简单的林地，不加字或水印。
```

English prompt

```
Introduce an original young woodland hero on a picture-book reference page. Give the child a green hood, soft brown boots, a little belt pouch and a wooden bow used to help rather than hurt. The hero has an expressive face, a slightly oversized head and a kind, courageous air. Use soft watercolor outlines and earthy colors against a simple forest setting. Leave the page free of lettering and watermarks.
```

![Flare · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/childrens-book-illustration-1-gpt-image-2-6-flare.webp)

Flare · 官方成图

![Sunburst · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/childrens-book-illustration-1-gpt-image-2-6-sunburst.webp)

Sunburst · 官方成图

[查看官方原提示词与例图](https://developers.openai.com/api/docs/guides/image-prompting#establish-the-character)

到了第二页需要推进故事情节时，将第一张图作为参考输入，场景更换为冬日暴风雪过后解救被困在倒塌树洞里的小松鼠。提示词重复绿罩衫、相同五官比例与温暖柔和神态的约束，模型便能在全新的白雪覆盖环境下，让同一个小男孩以半跪姿态向松鼠伸出温暖的双手，交稿前把两页放在一起，检查兜帽、五官和画风是否还连贯。

#### 把同一角色带进雪地里的下一页

1024×1536，画质 medium。沿用同一模型上一页的角色图，对照兜帽、五官、比例和水彩风格。 [第一页的两张角色参考](https://xiaohu.ai/article/gpt-image-2-6-prompting-guide/#case-establish-the-character)。

中文提示词

```
沿用参考图里的森林小英雄。冬季风暴后，它跪在倒下的树旁，安抚并帮助一只受惊的松鼠出来。保留绿兜帽、五官、比例和原配色，角色依然温和勇敢。画成柔光下的雪地水彩绘本，气氛让人安心，不加文字和水印。
```

English prompt

```
Continue the picture book with the hero from the reference. After a winter storm, the child kneels at a fallen tree to coax a frightened squirrel out. Keep the green hood, face, proportions and color palette recognizable, along with the hero’s gentle courage. Paint a reassuring snowy scene in soft watercolor light, with no text or watermark.
```

![Flare · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/childrens-book-illustration-2-gpt-image-2-6-flare.webp)

Flare · 官方成图

![Sunburst · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/childrens-book-illustration-2-gpt-image-2-6-sunburst.webp)

Sunburst · 官方成图

[查看官方原提示词与例图](https://developers.openai.com/api/docs/guides/image-prompting#continue-the-story)

贺卡和玩具包装展示了另一种写法。明确唯一要印的文案，写清玩具、窗台或吸塑壳在画面里的位置，再具体描述布料、掉漆和硬纸板。

#### 让一张圣诞贺卡有旧物的质感

1024×1536，画质 medium。重点看针脚、旧绒毛、窗边光线和唯一的指定贺词。

中文提示词

```
做一张温暖怀旧的圣诞贺卡。旧泰迪熊坐在窗边的纪念品盒里，绒毛有磨损和缝补痕迹，窗外下雪。用柔光、浅景深和自然虚化表现一张能印刷的贺卡。画面只出现“Merry Christmas — some memories never fade.”这一行，不加商标、标识或水印。
```

English prompt

```
Create an original Christmas card built around a worn teddy bear in a keepsake box by a snowy window. Let mended stitches, soft fur and gentle out-of-focus lights convey a memory kept into adulthood. Compose it like a softly lit, print-ready photograph. Use “Merry Christmas — some memories never fade.” as the only copy, without logos, trademarks or watermarks.
```

![Flare · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/christmas-holiday-card-teddy-gpt-image-2-6-flare.webp)

Flare · 官方成图

![Sunburst · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/christmas-holiday-card-teddy-gpt-image-2-6-sunburst.webp)

Sunburst · 官方成图

[查看官方原提示词与例图](https://developers.openai.com/api/docs/guides/image-prompting#design-a-holiday-card)

#### 给复古玩具飞机做一款吸塑包装

1024×1536，画质 medium。检查泡罩材质、印字和原创性。

中文提示词

```
设计一款怀旧收藏玩具。圆翼螺旋桨飞机装进透明吸塑罩，机身有经典玩具的比例，涂漆边缘略有磨损。用商品摄影的布光表现透明塑料、彩绘金属和清楚的印刷。纸卡上只写“Christmas Memories Edition”，不加现有商标、标识或水印。
```

English prompt

```
Photograph an original holiday collectible as a retail mockup: a rounded-wing propeller toy airplane in a clear blister, with classic toy proportions and lightly chipped paint. Light the plastic and painted metal like a product shoot and keep the card printing sharp. Use only “Christmas Memories Edition” on the package, with no existing brand marks or watermark.
```

![Flare · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/christmas-collectible-toy-airplane-gpt-image-2-6-flare.webp)

Flare · 官方成图

![Sunburst · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/christmas-collectible-toy-airplane-gpt-image-2-6-sunburst.webp)

Sunburst · 官方成图

[查看官方原提示词与例图](https://developers.openai.com/api/docs/guides/image-prompting#design-collectible-merchandise)

### 透明位图、SVG 和循环 GIF 怎么做

#### 设计能在小标签上看清的透明 Logo

官方例图使用 1024×1536、画质 medium、n=1，生成时请求透明 PNG。核对小尺寸轮廓和实际透明像素。

中文提示词

```
为社区面包房 Field & Flour 设计一个原创标志。用少量扁平形状、清晰外轮廓和足够留白，让它印在小标签或放到大招牌上都好认。图标居中，四周留出空间，边缘干净，背景完全透明。不要用实色底、棋盘格、场景或水印。
```

English prompt

```
Design an original mark for the neighborhood bakery Field & Flour. Favor a memorable outline, a few flat shapes and open space so the mark reads on both a tiny label and a storefront sign. Center one mark with comfortable margins and clean edges on a genuinely transparent canvas. Leave out scenery, simulated checkerboards and watermarks.
```

![Flare · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/logo-generation-1-gpt-image-2-6-flare.webp)

Flare · 官方成图

![Sunburst · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/logo-generation-1-gpt-image-2-6-sunburst.webp)

Sunburst · 官方成图

[查看官方原提示词与例图](https://developers.openai.com/api/docs/guides/image-prompting#design-a-reusable-logo)

SVG 适合需要放大或后续改色的标志。它用路径和形状表达图形，可以进矢量工具编辑。

用 `POST /v1/images/generations` 生成 SVG 时，把 `output_format` 设为 `svg`，`n` 设为 `1`。可以指定透明背景。请求中省略 `stream`、`partial_images`、`output_compression` 和 `prompt_rewriter`。把 `data[0].b64_json` 解码为 XML 文件后保存为 `.svg`，就能在矢量工具里改路径和颜色。

#### 同一 Logo 导出为可编辑 SVG

复用上面的 Logo 提示词。生成端点指定 output_format=svg、n=1。图中是 OpenAI 给出的 SVG 文件。

[查看这个 Logo 的中英双语提示词](https://xiaohu.ai/article/gpt-image-2-6-prompting-guide/#case-design-a-reusable-logo)

![Flare · 官方 SVG](https://xiaohu.ai/media/gpt-image-2-6-prompting-guide/field-and-flour-gpt-image-2-6-flare.svg)

Flare · 官方 SVG

![Sunburst · 官方 SVG](https://xiaohu.ai/media/gpt-image-2-6-prompting-guide/field-and-flour-gpt-image-2-6-sunburst.svg)

Sunburst · 官方 SVG

[查看官方原提示词与例图](https://developers.openai.com/api/docs/guides/image-prompting#generate-svg-output)

如果依然需要位图格式的透明资产，必须在调用时将 background 参数明确设置为 transparent，并将 output_format 指定为 png 或 webp。代码在落地前必须切实检验解码后的 Alpha 透明通道，检查物体边缘有没有发灰。还要核对透明区域确实有 Alpha，继续编辑时再次要求保留透明背景。

#### 把商品抠出来并保留真正的透明背景

1024×1536，画质 medium。例程用透明 PNG；交付也可选 WebP。查实际 Alpha，继续编辑时再强调保留透明背景。

![原始洗发水商品图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/shampoo.webp)

原始洗发水商品图

中文提示词

```
把参考图里的洗发水瓶单独抠出来，居中放在完全透明的画布上。保留瓶身轮廓、比例和标签可读性，边缘干净，没有杂边或光晕。只做轻微整理，别重新设计瓶子，不要加底色、棋盘格、场景或阴影。
```

English prompt

```
Isolate the shampoo bottle and center it on a canvas with real alpha transparency. Preserve the bottle’s silhouette, proportions and legible label. Clean the edge without creating a halo or changing the packaging. Leave out painted backdrops, checkerboards, scenery and shadows.
```

![Flare · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/extract-product-gpt-image-2-6-flare.webp)

Flare · 官方成图

![Sunburst · 官方成图](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/extract-product-gpt-image-2-6-sunburst.webp)

Sunburst · 官方成图

[查看官方原提示词与例图](https://developers.openai.com/api/docs/guides/image-prompting#create-a-transparent-product-cutout)

把 `output_format` 设为 `gif`。要做循环动图，交代主体的起始姿势、怎么动、怎么回到原位，以及镜头要不要动。API 用 `frame_count` 指定帧数，用 `frame_duration_ms` 指定每帧时长。可以直接生成，也可以通过编辑端点传入静态参考图来引导动画。

#### 小猴提灯做成循环 GIF

Sunburst，512×512、画质 high、默认复杂度，9 帧，每帧 200 毫秒。注意起止姿势能否接上、灯笼是否一直握在手中。

中文提示词

```
镜头固定在黄昏雪林，背景有一间亮着暖灯的木屋。穿橄榄绿连帽外套的小猴双手在胸前捧着琥珀色纸灯笼。它慢慢举灯，仰头眨眼，再把灯笼放回开头的高度。整段动作首尾连起来，灯笼始终留在手里。
```

English prompt

```
Use a locked camera in a pine wood at twilight, with snow on the ground and warm light in a cabin behind the subject. A young monkey in a hooded olive coat starts with an amber paper lantern against its chest. It raises the lantern, glances upward and blinks, then brings it back to that first position without letting go. Let the final moment flow into the first.
```

![Sunburst · 官方循环 GIF](https://pic.xiaohu.ai/jiedu-media/gpt-image-2-6-prompting-guide/monkey-lantern-gpt-image-2-6-sunburst.gif)

Sunburst · 官方循环 GIF

[查看官方原提示词与例图](https://developers.openai.com/api/docs/guides/image-prompting#generate-a-looping-gif)

提灯示例用 Sunburst、`512x512`、`quality="high"` 和默认的高规划复杂度。它固定镜头，让小猴举灯、抬眼眨眼，再放回原位。9 帧，每帧 200 毫秒，一轮 1.8 秒。

### 用实际任务试模型

将新的图像模型引入线上业务管线时，切忌全量一次性切换。必须建立标准化对比基线，搜集生产环境中具有代表性的难点用例，包括密集文字排版、多人物换装、细长物体透视与商品透明抠图，记录原有用例的通过率与开销。

第一轮固定提示词、参考图、输出尺寸、画质和格式，复杂度先用默认值。记录旧模型和新模型各自的达标结果。

上线前质量自查清单

- **文字逐字对齐**画面中所有被双引号引用的文案均无拼写错误且仅出现一次。
- **检查改动范围**对照原图查看圈外的人物面容、背景、透视和阴影有没有变化。
- **透明通道真实生效**导出的 PNG 或 WebP 具备真正的 Alpha 透明背景，杜绝模型手绘的黑白棋盘格。
- **多轮迭代锚点稳定**连续修改天气或环境时，主体物件的比例、标签与朝向保持严格一致。

官方指南在 [官方完整例程](https://developers.openai.com/api/docs/guides/image-prompting#run-a-complete-example) 提供了完整 Python 与 Ruby 例程。配置 SDK、环境变量 `OPENAI_API_KEY` 并将原始洗发水图存为 input_images/shampoo.webp 后，脚本先生成四张透明 PNG 标识，再通过编辑接口提取单品并解码落盘。放量前应持续观测延迟、重试率与成本，稳步推进迁移。

准备好 SDK、环境变量和输入图后，可用 `python demo.py gpt-image-2.6-flare` 或 `ruby demo.rb gpt-image-2.6-flare` 跑官方例程。把模型 ID 换成 `gpt-image-2.6-sunburst` 就能跑另一款。它会保存四张 `logo-generation-*.png` 和一张 `extract-product.png`。例程里的两组任务对应上面的 [透明 Logo](https://xiaohu.ai/article/gpt-image-2-6-prompting-guide/#case-design-a-reusable-logo) 和 [洗发水抠图](https://xiaohu.ai/article/gpt-image-2-6-prompting-guide/#case-create-a-transparent-product-cutout)。

来源GPT Image 2.6 prompting guideOpenAI·[查看主材料](https://developers.openai.com/api/docs/guides/image-prompting)延伸[Image generation](https://developers.openai.com/api/docs/guides/image-generation)
OpenAI GPT Image 2.6 官方提示指南解读

## GPT Image 2.6 生图与改图速查

从一张厨房照片开始。把桌上的条纹花瓶换成钴蓝色，瓶形、干花和周围陈设都要保留。
圈出要改的物件，写清改动与保留项，最后拿成图对照原图。

OpenAI 发布了 GPT Image 2.6，并在 ChatGPT 和 Codex 上线。开发者可通过 API 调用 Flare 和 Sunburst。官方指南用这张厨房照演示了标注图层怎么配合提示词。

给花瓶改色

通过 POST /v1/images/edits 发送同一个 multipart 请求。原图和透明红圈 PNG 都是 1200×900。标注只作用于首张输入，后续图仍可作为参考。发送 markup 时省略 mask 和 prompt_rewriter。

1. 圈出目标
原图放 image，同尺寸的透明红圈图放 markup。叠在一起的图仅用于定位预览。

2. 写明改法
把条纹花瓶换成钴蓝色，保留瓶形、干花和厨房其他部分。成图去掉红圈。

3. 对照原图
检查圈外是否也被改了。要求逐像素保留时，把验收通过的改动合成回原图。

在官方花瓶案例里，两款模型都改了颜色、保留了干花并去掉红圈。成图仍需和原照对照。这套写法也可以拿来摘掉手里的花或更换餐椅。

要快就先试 Flare。布局复杂、小字多或要反复改图，先试 Sunburst。

Flare
适合先出草稿、快速做多个方向。

Sunburst
适合检验细节、版式和连续编辑的一致性。

同条件复试
Sunburst 达标后，可固定提示词、参考图、尺寸、画质和输出格式复试 Flare。

从旧流程迁移，先保留代表性输入和旧成图。2.5 先试对应的 2.6 型号。首轮按上面五项固定条件对照旧模型，complexity 用默认值。验收后小流量试用，记录耗时、失败、重试与每张合格图成本。

先判断是画面排错了，还是画得不够清楚。两个问题用不同参数比较。

构图规划轴 · complexity
专门控制模型在正式落笔前的构图推演深度，包含 low、medium、high 三档（缺省均为 high）。**若版面排布有问题，应固定 quality 比较 complexity。**只改一个局部细节时，可从 low 试起。

细节渲染轴 · quality
负责控制画面能容纳的微观信息量与清晰度，提供 auto、low、medium、high、xhigh 与 max 六档调节。**若版面合理但小字发糊，则应固定 complexity 比较 quality 档位。**

自定义尺寸的宽和高须是 16 的倍数，比例在 1:3 到 3:1 之间，且符合模型尺寸限制。官方横版幻灯片示例为 1536×864。

一行短句、整段描述或按标签分块都可以。写清图用来做什么、主体在哪里、光从哪儿来，以及要排除哪些东西。

[场景定位]
明确交付形式与比例，如电商白底图、科技企业路演幻灯片或四格条漫。

[核心主体]
具体描述人物或物体外观、姿态、相对比例与视线动作，避免使用主观模糊修饰词。

[视觉特征]
指定真实材质、光影受光方向、镜头景深与色彩基调，写实场景明确要求实拍质感。

[排除约束]
用引号标出必须出现的文案，写清排版和出现次数。不要额外添加无关文字。

给参考图编号，再说明每张只提供什么。人物、衣服、背景和画风可以各用不同图片，最后交代哪样东西要移到哪里。例如在换装测试中，将女士照片作为身份基准图，另传入米色西装、白背心与高筒靴商品图，提示词严格禁止改变女士的面部特征、肤色、发型与体态，仅允许将指定衣物贴合人体穿戴并融入原场景的室内暖光。

用上一轮满意的图接着改，一次只改一项，再写一遍要保留的细节。

例如把黄昏广告牌改成下雪的冬日傍晚。每轮拿结果和上一版对照，检查牌框、标语和商品瓶身有没有跟着变化。

SVG 适合要继续改路径的标志，通过生成端点指定 output_format=svg、n=1。透明位图要请求透明背景，输出 PNG 或 WebP 后解码检查 Alpha。做循环 GIF 时交代动作如何回到起点，再设帧数和每帧时长。

交图前逐项核查。用在生产流程时，再拿代表性任务比较模型通过率、耗时和成本。

01 文字

文字逐字对齐
按提示词核对拼写、标点和指定次数。图表里的数值、标签和箭头回到原始材料核查。

02 范围

检查改动范围
对照原图查看圈外的人物面容、背景、透视和阴影有没有变化，防止局部修改破坏全局一致性。

03 通道

透明通道真实生效
导出的 PNG 或 WebP 具备真正的 Alpha 透明背景，杜绝模型手绘的黑白棋盘格伪透明底。

04 锚点

多轮迭代锚点稳定
每次更换天气或环境后，对照上一轮的比例、标签和朝向。

原文版权归原作者，这里只供对照阅读。 [看原网页 ↗](https://developers.openai.com/api/docs/guides/image-prompting)

### GPT Image 2.6 prompting guide

OpenAI Developers maintains the [full guide and original prompts](https://developers.openai.com/api/docs/guides/image-prompting).

↑ 正文结束
✓ 本篇全文免费开放

读完还有疑问？会员每天能问小互 30 次，每句带出处；还有一份按你口味挑好的每日 AI 日报。
[成为会员 $59/年](https://xiaohu.ai/buy/?plan=year&slug=gpt-image-2-6-prompting-guide&from=tail)[按月 $6.99](https://xiaohu.ai/buy/?plan=monthly&slug=gpt-image-2-6-prompting-guide&from=tail)

7 天内不满意全额退 · [看会员能多什么 →](https://xiaohu.ai/membership/)

[阅读原文 ↗](https://developers.openai.com/api/docs/guides/image-prompting)

📮 新解读每晚进邮箱

读完觉得有用？留个邮箱，每晚一封当天的新解读，随时退订。
