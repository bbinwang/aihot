---
title: "Higgsfield 发布 AI 品牌吉祥物教程：不训练模型，靠固定描述和三张参考表画同一只熊"
date: 2026-11-17T00:00:00.000Z
tags: ["AI 实操", "品牌吉祥物", "角色一致性", "GPT Image 2.6", "Higgsfield", "提示词"]
summary: "AI 画一只可爱小熊只要几秒，难的是画到第十张还是同一只。这套做法不用训练模型，靠参考图和固定措辞，走样在第一张就修掉。"
---
> **原文链接**: [https://higgsfield.ai/zh/blog/consistent-brand-mascot-ai](https://higgsfield.ai/zh/blog/consistent-brand-mascot-ai)
> **来源**: higgsfield.ai
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/higgsfield-brand-mascot/) · 2026/11/17
> **说明**: 本文由 AIHot汪 自动聚合(原文即中文,未翻译)

---

[返回](https://higgsfield.ai/zh/blog)

要用 AI 制作风格一致的品牌吉祥物，需要先确定基础设计，创建参考表，并在每条提示词中逐字复用同一段身份描述。本指南在 Higgsfield 上用 GPT Image 2.6 创建一个吉祥物，从基础设计到可复用提示词和动画 GIF，最后汇总成一套可复用的吉祥物套件。示例吉祥物是 Biscuit，一只虚构的奶油色毛绒小熊。

### 核心要点

- **用固定的措辞描述吉祥物一次。** 同一段身份描述逐字放入每条提示词。
- **选定固定的视觉标志。** 轮廓、配色和一个标志性特征，让吉祥物在小尺寸下也能被认出。
- **在制作营销素材之前先创建参考表。** 角度、表情和姿势分别制作参考表，为后续生成提供一致的视觉参考。
- **把每条提示词拆分为固定部分和可变部分。** 身份描述、约束条件和已保存的 Element（在 Higgsfield 中用 @ 调用）保持不变，而动作、场景和构图可以变化。
- **将每个结果与参考图对照检查。** 漂移在第一张图时修复，比生成五十张后再修复容易得多。

### 是什么让 AI 品牌吉祥物保持一致？

要保持 AI 品牌吉祥物的一致性，先定义其固定特征，并通过提示词和参考图把这些特征纳入每次生成。在本工作流程中，每次创建新图像时都附上已确定的角色参考图。

以下内容在每张图像中都应保持不变：

- **身体比例和轮廓。** 整体形状是人们最先认出的部分，即使在缩略图大小下也是如此。
- **面部结构和辨识细节。** 在允许表情变化的同时，保持相同的眼睛位置、鼻子、脸颊和基础脸型。
- **配色和色彩位置。** Biscuit 的毛发保持奶油白色，针织围巾保持青柠绿色，方形徽章保持在既定位置。
- **材质和插画风格。** 无论是平涂、黏土、光面 3D 还是水彩，一旦选定就不再更改。
- **标志性特征和配饰。** Biscuit 的环形天线、针织围巾和方形徽章在不同姿势和场景中都保持可辨识。

只要角色的核心特征保持一致，姿势、表情、动作、背景和镜头角度都可以变化。第 8 步中的吉祥物套件会同时记录固定设计和允许的变化。

### 完整工作流：分步指南

### 第 1 步：定义吉祥物的角色和性格

在生成图像之前，先确定吉祥物代表什么，以及哪些特征应保持一致。

本指南使用 Biscuit，一只圆滚滚的奶油白色毛绒小熊，带有环形天线、青柠绿针织围巾和配套的方形徽章。

| 决策项 | 需要定义的内容 | 示例：Biscuit |
| --- | --- | --- |
| 品牌角色 | 吉祥物出现在哪里、为何出现 | 欢迎访客、介绍功能，并帮助说明数字服务 |
| 受众 | 吉祥物面向的对象 | 新用户和回访用户 |
| 性格 | 三到四个具体性格特质 | 俏皮、好奇、友好、令人安心 |
| 角色类型 | 人类、动物、物品或虚构生物 | 一只带环形天线的毛绒小熊 |
| 视觉风格 | 材质和渲染风格 | 柔和的 3D 渲染，带蓬松人造毛和针织面料 |
| 标志性特征 | 让角色具有辨识度的细节 | 奶油色环形天线、青柠绿围巾和腹部方形徽章 |
| 主要使用场景 | 吉祥物的使用位置 | 网站、新手引导界面、客服图形、社交帖子和 GIF |

把固定特征与可变特征分开。Biscuit 的比例、材质、颜色和配饰定义了这个角色；表情、姿势、环境和道具可以变化。

### 第 2 步：生成并细化基础设计

创建初始概念时使用 **GPT Image 2.6 Flare**，细化所选草稿时则使用 **GPT Image 2.6 Sunburst**。

### 生成 Flare 草稿

打开 **图像**,切换到 **手动**，然后选择 **GPT Image 2.6 Flare**。

| 设置项 | 值 |
| --- | --- |
| 分辨率 | 2K |
| 画面比例 | 1:1 |
| 画质 | 高 |
| 参考图片 | 无 |

最初探索了两个方向：粗糙 3D 版本和扁平 2D 版本。

**粗糙 3D 提示词：**
Mascot character concept: a round, chubby cream-white bear with small round ears, a little curly antenna on top of its head, big black eyes, rosy pink cheeks and a small open smile. Generic glossy 3D render, smooth plastic-looking fur, simple lighting. Full body, standing, front three-quarter view, centered. Plain solid pale-blue background #CFE8F7. No text.[重新创作](https://higgsfield.ai/generate?recreate=Mascot+character+concept%3A+a+round%2C+chubby+cream-white+bear+with+small+round+ears%2C+a+little+curly+antenna+on+top+of+its+head%2C+big+black+eyes%2C+rosy+pink+cheeks+and+a+small+open+smile.+Generic+glossy+3D+render%2C+smooth+plastic-looking+fur%2C+simple+lighting.+Full+body%2C+standing%2C+front+three-quarter+view%2C+centered.+Plain+solid+pale-blue+background+%23CFE8F7.+No+text.)

![](https://higgsfield.ai/cdn-cgi/image/fit=scale-down,format=webp,onerror=redirect,width=1920,quality=85/https://cdn.sanity.io/images/s479xw3z/production/f4c6d6a29499eeeb9d099635e920a363dc974f8a-2048x2048.png)

**扁平 2D 备选方案：**
Mascot character concept: a round, chubby cream-white bear with small round ears, a little curly antenna on top of its head, big black eyes, rosy pink cheeks and a small open smile. Simple flat 2D cartoon illustration, plain outlines, flat colors. Full body, standing, front three-quarter view, centered. Plain solid pale-blue background #CFE8F7. No text.[重新创作](https://higgsfield.ai/generate?recreate=Mascot+character+concept%3A+a+round%2C+chubby+cream-white+bear+with+small+round+ears%2C+a+little+curly+antenna+on+top+of+its+head%2C+big+black+eyes%2C+rosy+pink+cheeks+and+a+small+open+smile.+Simple+flat+2D+cartoon+illustration%2C+plain+outlines%2C+flat+colors.+Full+body%2C+standing%2C+front+three-quarter+view%2C+centered.+Plain+solid+pale-blue+background+%23CFE8F7.+No+text.)

![](https://higgsfield.ai/cdn-cgi/image/fit=scale-down,format=webp,onerror=redirect,width=1920,quality=85/https://cdn.sanity.io/images/s479xw3z/production/8c5ebbf8a9a28ea94dd3ea142383c3e709fee42c-2048x2048.png)

对比整体形状、面部比例以及小尺寸下的可读性。此处最终的吉祥物选用了粗糙 3D 草稿。

### 在 Sunburst 中细化设计

切换到 **GPT Image 2.6 Sunburst**，保持 **2K**、 **1:1**以及 **高** 画质。

按以下顺序附上两张参考图：

1. **图像 1：** 选定的 Flare 草稿。
2. **图像 2：** 已确定的吉祥物成品图，用作风格参考。

草稿提供角色的初始形状，第二张参考图定义最终的毛发、颜色和配饰。

**细化提示词：**
Turn the draft mascot from image 1 into the final brand mascot exactly as it appears in image 2. Keep the character from image 1 recognizable: the same round chubby bear shape, small round ears, the curly antenna, big black eyes, pink cheeks and happy open smile.
Finish it like image 2: a real soft plush mascot made of fluffy cream-white faux fur #F6F0DA with visible fibers, glossy black eyes with a white highlight, soft pink blush, a tiny pink nose, a small open smile with a pink tongue, a cream loop antenna on top of the head, a lime-green knitted scarf #C8E632 wrapped around the neck with one end hanging down the chest, and a small square lime-green badge pinned on the belly.
Full body, standing, front three-quarter view, centered. Soft even studio light, a plain solid pale-blue background #CFE8F7 with a soft contact shadow under the feet.[重新创作](https://higgsfield.ai/generate?recreate=Turn+the+draft+mascot+from+image+1+into+the+final+brand+mascot+exactly+as+it+appears+in+image+2.+Keep+the+character+from+image+1+recognizable%3A+the+same+round+chubby+bear+shape%2C+small+round+ears%2C+the+curly+antenna%2C+big+black+eyes%2C+pink+cheeks+and+happy+open+smile.%0AFinish+it+like+image+2%3A+a+real+soft+plush+mascot+made+of+fluffy+cream-white+faux+fur+%23F6F0DA+with+visible+fibers%2C+glossy+black+eyes+with+a+white+highlight%2C+soft+pink+blush%2C+a+tiny+pink+nose%2C+a+small+open+smile+with+a+pink+tongue%2C+a+cream+loop+antenna+on+top+of+the+head%2C+a+lime-green+knitted+scarf+%23C8E632+wrapped+around+the+neck+with+one+end+hanging+down+the+chest%2C+and+a+small+square+lime-green+badge+pinned+on+the+belly.%0AFull+body%2C+standing%2C+front+three-quarter+view%2C+centered.+Soft+even+studio+light%2C+a+plain+solid+pale-blue+background+%23CFE8F7+with+a+soft+contact+shadow+under+the+feet.)

将结果与两张参考图对照检查。确认角色的比例、毛发质感、面部、天线、围巾和徽章后再继续。这张图像就是基础设计。

### 第 3 步：创建三张参考表

分别为 **角度、情绪和姿势**创建参考表。它们共同提供了从不同视角、不同情境绘制同一角色的参考。

三张参考表均使用以下设置：

| 设置项 | 值 |
| --- | --- |
| 模型 | GPT Image 2.6 Sunburst |
| 分辨率 | 2K |
| 画面比例 | 16:9 |
| 画质 | 高 |
| 图片 1 | 已确定的最终吉祥物 |
| 图像 2 | 已确定的风格参考 |
| 背景 | 纯浅蓝色，#CFE8F7 |

每条提示词都由相同的身份描述块、针对该参考表的指令和相同的背景指令组成。

**三条提示词都以这个身份描述块开头：**
Use image 1 as the exact character reference; image 2 shows the same mascot as the approved style reference. The mascot: a round, chubby plush bear made of fluffy cream-white faux fur with visible fibers, small round ears, a cream loop antenna on top of the head, big glossy black eyes with a white highlight, soft pink blush, a tiny pink nose, a small open smile, a lime-green knitted scarf with one end hanging down the chest and a small square lime-green badge on the belly. Keep the identical design in every drawing: the same proportions, fur, colors, scarf and badge; real plush-toy materials, soft even studio light.[重新创作](https://higgsfield.ai/generate?recreate=Use+image+1+as+the+exact+character+reference%3B+image+2+shows+the+same+mascot+as+the+approved+style+reference.+The+mascot%3A+a+round%2C+chubby+plush+bear+made+of+fluffy+cream-white+faux+fur+with+visible+fibers%2C+small+round+ears%2C+a+cream+loop+antenna+on+top+of+the+head%2C+big+glossy+black+eyes+with+a+white+highlight%2C+soft+pink+blush%2C+a+tiny+pink+nose%2C+a+small+open+smile%2C+a+lime-green+knitted+scarf+with+one+end+hanging+down+the+chest+and+a+small+square+lime-green+badge+on+the+belly.+Keep+the+identical+design+in+every+drawing%3A+the+same+proportions%2C+fur%2C+colors%2C+scarf+and+badge%3B+real+plush-toy+materials%2C+soft+even+studio+light.)

### 参考表 1：角度

在身份描述块后添加这条指令：
Character turnaround reference sheet: five full-body views of the mascot standing in a row on one shared floor line, evenly spaced and the same size: front view, three-quarter front view, side profile facing right, three-quarter back view, back view with the scarf knot and a short round tail visible. Neutral happy expression in every view. The mascot fills most of the sheet height.[重新创作](https://higgsfield.ai/generate?recreate=Character+turnaround+reference+sheet%3A+five+full-body+views+of+the+mascot+standing+in+a+row+on+one+shared+floor+line%2C+evenly+spaced+and+the+same+size%3A+front+view%2C+three-quarter+front+view%2C+side+profile+facing+right%2C+three-quarter+back+view%2C+back+view+with+the+scarf+knot+and+a+short+round+tail+visible.+Neutral+happy+expression+in+every+view.+The+mascot+fills+most+of+the+sheet+height.)

检查五个视角是否共享相同的比例。配饰应固定在相同位置，只在各角度自然可见时出现。

![](https://higgsfield.ai/cdn-cgi/image/fit=scale-down,format=webp,onerror=redirect,width=1920,quality=85/https://cdn.sanity.io/images/s479xw3z/production/c30c0cabca4f2eda7401a826dea7ef46343f3563-2688x1520.png)

### 参考表 2：情绪

在身份描述块后添加这条指令：
Expression reference sheet: six head-and-shoulders portraits of the mascot in a neat 3 by 2 arrangement, the same size and the same three-quarter angle, scarf visible in each: 1) happy with an open smile, 2) laughing with eyes squeezed shut and paws up to the cheeks, 3) surprised with a small round mouth and the antenna springing up, 4) sad with droopy ears and teary eyes, 5) grumpy with a furrowed brow and a pout, 6) sleepy with closed eyes and a tiny yawn.[重新创作](https://higgsfield.ai/generate?recreate=Expression+reference+sheet%3A+six+head-and-shoulders+portraits+of+the+mascot+in+a+neat+3+by+2+arrangement%2C+the+same+size+and+the+same+three-quarter+angle%2C+scarf+visible+in+each%3A+1%29+happy+with+an+open+smile%2C+2%29+laughing+with+eyes+squeezed+shut+and+paws+up+to+the+cheeks%2C+3%29+surprised+with+a+small+round+mouth+and+the+antenna+springing+up%2C+4%29+sad+with+droopy+ears+and+teary+eyes%2C+5%29+grumpy+with+a+furrowed+brow+and+a+pout%2C+6%29+sleepy+with+closed+eyes+and+a+tiny+yawn.)

眼睛、嘴巴、耳朵和天线可以随表情变化。基础头型、面部比例、毛发和配饰应保持可辨识。

![](https://higgsfield.ai/cdn-cgi/image/fit=scale-down,format=webp,onerror=redirect,width=1920,quality=85/https://cdn.sanity.io/images/s479xw3z/production/b0f86054b81c6c2a799cee88c322b621351c66ae-2688x1520.png)

### 参考表 3：姿势

在身份描述块后添加这条指令：
Pose reference sheet: six full-body poses of the mascot in a neat 3 by 2 arrangement, the same size: 1) waving one paw, 2) sitting on the floor with legs out, 3) jumping with both arms up, 4) running with the scarf flying, 5) hugging a big lime-green phone handset, 6) lying on its belly with the chin on its paws.[重新创作](https://higgsfield.ai/generate?recreate=Pose+reference+sheet%3A+six+full-body+poses+of+the+mascot+in+a+neat+3+by+2+arrangement%2C+the+same+size%3A+1%29+waving+one+paw%2C+2%29+sitting+on+the+floor+with+legs+out%2C+3%29+jumping+with+both+arms+up%2C+4%29+running+with+the+scarf+flying%2C+5%29+hugging+a+big+lime-green+phone+handset%2C+6%29+lying+on+its+belly+with+the+chin+on+its+paws.)

![](https://higgsfield.ai/cdn-cgi/image/fit=scale-down,format=webp,onerror=redirect,width=1920,quality=85/https://cdn.sanity.io/images/s479xw3z/production/cd3cb1d9a59d912813e8ec1252517d7afd2dbe38-2688x1520.png)

电话听筒只属于其中一个姿势。把它与固定的角色描述分开，以免它出现在无关场景中。

**三条提示词都以这条背景指令结尾：**

> “背景：整张参考表为单一纯浅蓝色 #CFE8F7，仅带柔和的接触阴影；无面板、无边框、无网格线。无文字、无标签、无标识。”

将每个结果与基础设计对照审查。对改变了角色的视角重新生成或修正。如需干净的参考表，移除多余的文字或装饰符号。

### 第 4 步：创建可复用的吉祥物提示词

将已确定的吉祥物保存为 **元素**，之后在后续提示词中引用它时使用 **@**。

下方模板使用 **@Biscuit**。将其替换为你创建的 Element ID。

按以下顺序组织每条提示词：

**角色身份 → 动作 → 场景 → 构图 → 光线 → 约束条件**

保持身份描述段落和约束条件一致。每张图像只更改动作、场景、构图和光线。

附上与任务最相关的参考图：反应图用表情参考，动作用姿势参考，不同视角用角度参考。

### 第 5 步：用同一个吉祥物生成不同场景

使用可复用提示词为不同使用场景创建图像。以下示例在保持 Biscuit 身份不变的情况下更换场景。

| 位置 | 场景指令 | 检查项 |
| --- | --- | --- |
| 网站欢迎图 | Biscuit 站在左侧，挥动一只爪子。浅蓝色背景上的全身视图，右侧留白放标题。柔和的摄影棚灯光。 | 面部、天线、比例、围巾和徽章 |
| 产品介绍 | Biscuit 在面部下方捧着一个小产品盒。浅蓝色背景上的四分之三视角。包装上无文字。 | 道具不遮挡或扭曲面部和身体 |
| 客户支持 | Biscuit 抱着一个青柠绿大电话听筒，闭眼微笑。居中构图，柔和的摄影棚灯光。 | 表情与参考图一致；听筒仍是独立道具 |
| 季节性帖子 | Biscuit 坐在薄雪中，用一只爪子接住雪花。保留原有的青柠绿围巾。柔和的冬日日光。 | 毛发保持奶油白色；配饰保持原有颜色和质感 |
| 庆祝图 | Biscuit 双臂高举跳起，表情欣喜。全身构图，天线上方留出空间，下方有柔和阴影。 | 运动中保持短四肢、圆润身体和可辨识的天线 |

如需用于其他版式的抠图，选择透明背景。使用导出文件前，检查毛发边缘和环形天线内部的镂空。

![](https://higgsfield.ai/cdn-cgi/image/fit=scale-down,format=webp,onerror=redirect,width=1920,quality=85/https://cdn.sanity.io/images/s479xw3z/production/92ad364589f49c137e7080181033d36106534e85-2048x2048.png)

### 第 6 步：修复角色漂移

将每个新结果与已确定的设计对比。图像并排摆放时，细微变化更容易发现。

| 问题 | 调整方法 |
| --- | --- |
| 头部或身体比例变化 | 附上已确定的全身参考图，并重申圆润胖乎乎的体型和短四肢 |
| 毛发变得光滑或像塑料 | 指明带可见纤维的蓬松人造毛，并以最终的 Sunburst 图像作为参考 |
| 毛发或围巾颜色偏移 | 重复说明配色，并在相似光线下对比图像 |
| 天线消失或形状改变 | 明确描述奶油色环形天线，并提供一张天线清晰可见的参考图 |
| 徽章消失或移位 | 要求方形徽章位置与已确定的参考图一致 |
| 道具出现在无关图像中 | 将其从提示词中移除，并使用不含该道具的参考图 |
| 复杂姿势扭曲了角色 | 简化动作，确认角色后再添加周围场景 |

例如，笼统的指令可能留下过多解读空间：

“Biscuit 跑过公园。”

更具体的版本将动作锚定在已确定的设计上：
@Biscuit runs through a park in a full-body three-quarter view. Preserve the round, chubby body, short limbs, cream fluffy fur, and loop antenna from the reference. Keep the lime-green knitted scarf and square belly badge in their original positions. Let the scarf trail naturally with the movement. Soft 3D rendering with visible fur fibers.[重新创作](https://higgsfield.ai/generate?recreate=%40Biscuit+runs+through+a+park+in+a+full-body+three-quarter+view.+Preserve+the+round%2C+chubby+body%2C+short+limbs%2C+cream+fluffy+fur%2C+and+loop+antenna+from+the+reference.+Keep+the+lime-green+knitted+scarf+and+square+belly+badge+in+their+original+positions.+Let+the+scarf+trail+naturally+with+the+movement.+Soft+3D+rendering+with+visible+fur+fibers.)

对于小的局部瑕疵，使用 **Markup-guided editing**：标记受影响的区域并描述修正内容。

**修正提示词示例：**
Restore the small square lime-green badge on the belly, matching its size, position, and appearance in the approved reference. Preserve the surrounding fur, scarf, pose, lighting, and background.[重新创作](https://higgsfield.ai/generate?recreate=Restore+the+small+square+lime-green+badge+on+the+belly%2C+matching+its+size%2C+position%2C+and+appearance+in+the+approved+reference.+Preserve+the+surrounding+fur%2C+scarf%2C+pose%2C+lighting%2C+and+background.)

批准前审查整张编辑后的图像，包括所请求修正之外的区域。

### 第 7 步：为已确定的吉祥物制作动画

从一张已确定的图像和一个简单动作开始。挥手给 Biscuit 一个清晰的动作，同时面部和配饰仍易于检查。

使用已保存的 Element 和已确定的挥手姿势作为参考。

**动画提示词：**
@Biscuit stands in place and gently waves one paw, then returns to the starting pose for a seamless loop. Fixed camera, full-body view, pale-blue background #CFE8F7, soft studio lighting. Preserve the round plush body, short limbs, cream-white fluffy fur, small rounded ears, cream loop antenna, glossy black eyes, pink nose, and rosy cheeks. Keep the lime-green knitted scarf and square belly badge attached in their original positions. Maintain consistent fur texture and lighting. No additional props, characters, text, or logos.[重新创作](https://higgsfield.ai/generate?recreate=%40Biscuit+stands+in+place+and+gently+waves+one+paw%2C+then+returns+to+the+starting+pose+for+a+seamless+loop.+Fixed+camera%2C+full-body+view%2C+pale-blue+background+%23CFE8F7%2C+soft+studio+lighting.+Preserve+the+round+plush+body%2C+short+limbs%2C+cream-white+fluffy+fur%2C+small+rounded+ears%2C+cream+loop+antenna%2C+glossy+black+eyes%2C+pink+nose%2C+and+rosy+cheeks.+Keep+the+lime-green+knitted+scarf+and+square+belly+badge+attached+in+their+original+positions.+Maintain+consistent+fur+texture+and+lighting.+No+additional+props%2C+characters%2C+text%2C+or+logos.)

选择 **GIF** 作为输出格式，并检查帧设置。9 帧、每帧 200 毫秒，可生成时长 1.8 秒的循环。

观看完整循环，然后逐帧检查：

- 表情变化时面部比例应保持稳定。
- 四肢应保持长度和形状。
- 天线在移动中应保持可辨识。
- 围巾和徽章应保持贴合不脱落。
- 毛发和光线不应闪烁。
- 最后一帧应与第一帧平滑衔接。

如果运动扭曲了角色，简化动作并生成新版本。

### 第 8 步：整理一套可复用的吉祥物套件

收集已确定的素材，让其他设计师无需重建角色即可创建新素材。

包括：

- 最终的基础设计。
- 角度、情绪和姿势参考表。
- 角色描述和可复用提示词模板。
- 各已确定生成结果所用的模型、设置和参考图。
- 已保存的 Element 名称和 ID。
- 可接受变化的示例，以及需要修正的变化示例。
- 最终 PNG 文件、透明抠图和已确定的 GIF。

记录目标配色：

| 元素 | 目标颜色 |
| --- | --- |
| 奶油白色毛发 | #F6F0DA |
| 青柠绿围巾 | #C8E632 |
| 方形徽章 | 与已确定的青柠绿徽章参考一致 |
| 参考表背景 | #CFE8F7 |

十六进制色值表达预期颜色，但光线和材质渲染会影响其呈现效果。将最终素材与已确定的参考图对照检查，在需要精确匹配品牌色的地方调整颜色。

让浅蓝色背景独立于角色身份之外。Biscuit 可以出现在不同环境中，同时保持相同的比例、面部、毛发、天线、围巾和徽章。

### 发布前如何检查吉祥物一致性？

发布前要检查吉祥物的一致性，可将每张新图像与基础设计和参考表对比、缩小查看、放入系列中查看，并观看每个 GIF 的完整循环。

1. 把新图像放在基础设计和参考表旁边。比例、面部、颜色和标志性特征应保持一致。
2. 缩小到小尺寸，看轮廓是否仍然清晰可辨。
3. 将它与其他吉祥物图像放入同一系列。任何一张图像都不应看起来像另一个角色。
4. 对于 GIF，观看完整循环，检查每次转身以及面部被部分遮挡的瞬间。

### 还有疑问吗？
你可以通过文字提示词生成吉祥物，细化选定的设计，并为后续图像创建参考表。复用这些参考图和一致的角色描述有助于保持其外观，但每个结果仍需检查。不需要。本指南的流程在 Higgsfield 上使用 GPT Image 2.6，配合参考表、可复用提示词和 Element，这些都不涉及训练模型。可以。在提示词的可变部分描述新服装，同时保留角色的比例、面部特征、毛发和标志性细节。对于 Biscuit，检查服装是否让围巾和徽章保持可见，并且除预期的服装外没有改变其轮廓。将参考表、身份描述和提示词模板放在一起，在每个工具中都以它们为起点。各工具的结果仍会有差异，因此每个输出都要与参考表对照检查。可以。以已确定的 2D 设计为参考，描述想要的 3D 材质、光线和景深。检查结果的轮廓和面部比例是否发生变化，然后为确定的 3D 版本创建参考表。在本指南中，最终吉祥物由粗糙 3D 草稿发展而来；扁平 2D 图像是备选概念。运动会引入新的姿势、角度以及角色部分被遮挡的瞬间，这些都可能暴露面部、比例或配饰上的不一致。先从一个简单动作、固定镜头和已确定的角色参考开始，然后逐帧检查完整循环。

作者：Higgsfield

### 发现更多
[查看全部](https://higgsfield.ai/zh/blog)[对比评测2026 年 AI 动画平台推荐15 min·11月 7, 2026](https://higgsfield.ai/zh/blog/best-ai-animation-platforms-2026)[指南如何在 Higgsfield 上用 AI 制作动漫剧集10 min·10月 31, 2026](https://higgsfield.ai/zh/blog/how-to-make-anime-series-with-ai)[指南如何在 2026 年制作 AI 动画短片10 min·9月 26, 2026](https://higgsfield.ai/zh/blog/ai-animated-short-film-2026)[编辑专栏Higgsfield 上的 GPT Image 2.6：GIF 动图、SVG 矢量图和透明图像10 min·11月 4, 2026](https://higgsfield.ai/zh/blog/gpt-image-2-6-higgsfield)[指南如何让 AI 动画系列的角色和美术风格保持一致10 min·10月 5, 2026](https://higgsfield.ai/zh/blog/keep-characters-consistent-ai-animated-series)[指南如何不切换工具就做出完整 AI 视频：Higgsfield Supercomputer 指南9 min·7月 3, 2026](https://higgsfield.ai/zh/blog/higgsfield-supercomputer-guide)
