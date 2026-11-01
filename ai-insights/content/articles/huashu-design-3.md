---
title: "AI 做设计总像套模板？huashu-design 3.0：让 AI 多看、多试，少把设计做成同一个样子"
date: 2026-10-24T00:00:00.000Z
tags: ["AI 实操", "AI设计", "Skill", "开源", "聚合"]
summary: "先做六个候选，再挑三个真稿；用真实参考、可见样张与本机记录，让设计方向拉开差别。"
---
> **原文链接**: [https://x.com/AlchainHust/status/2113650413170049529](https://x.com/AlchainHust/status/2113650413170049529)
> **来源**: x.com
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/huashu-design-3/) · 2026/10/24
> **说明**: 本文由 AIHot 自动聚合(原文即中文,未翻译)。正文取自小互 AI 解读

---

作者：花叔10-24 · 约 20 分钟

花叔发布 huashu-design 3.0。这是一个开源设计 skill，也就是交给 Agent 读取的一套设计说明、参考资料和检查脚本。在终端里工作的 Agent 读完这些资料，就能按这套方法制作网页、PPT 和 App 原型。

安装后，用户在支持 skill 机制的 Agent 命令行中输入一句话需求，Agent 会自己寻找素材、排布版面并输出 HTML 文件。主要覆盖的形态包括：

- **交互原型与落地页**：单文件 HTML 构成的交互式 Web 原型、官网与 App 多屏展示板；
- **可编辑幻灯片**：采用 1920×1080 固定画布的 HTML Deck，支持导出为可二次编辑的 PPTX 演示文稿；
- **动态影像与信息图**：基于时间轴的 CSS/Canvas 动画、视频分镜板，以及结合真实开放数据资料的长图可视化；
- **三方向初稿**：面对新视觉需求，Agent 默认先出三种不同方向的设计方案，让用户看着真稿挑选后再继续做完整。

从适用范围来看，huashu-design 适合用于视觉原型探索与物料设计，不适用于需要后端交互的生产级 Web 应用或系统开发。如果不习惯直接阅读长篇文档，也可以先看[作者亲录的 16 分钟上手教程视频](https://www.youtube.com/watch?v=m-_BlUdcIvw)，直观了解实际效果与操作流程。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/huashu-design-3/huashu-design-3-launch-3.0.mp4)

3.0 发布短片（32秒，带配乐；剪辑用 huashu-motion）。

---

#### 为什么加了更多规则，设计反而更无聊

经常使用 AI 编写网页或幻灯片的创作者，往往会遇到一种隐性疲劳：单个生成的页面看起来工整精美，但连续做几个项目后，页面结构和色彩便开始高度雷同。

在 2.0 版本中，skill 试图用最佳设计师、现实参照、秒数轮盘三套逻辑拉开方案差异。但用了几个月后，作者发现了一个新问题：单个项目看都不错，放在一起却长得很像。暖纸底、衬线标题、陶土色点缀这套外观在不同项目里反复出现。作者回头检查旧版跑过的测试题，5 组里有 3 组三个方向撞了色、撞了同一个外观家族。根子在旧 skill 里写死了一条默认外观：暖奶油底加衬线加陶土色。暖纸和衬线本身可以很好看；问题是不同题材都往这套长相上靠。

作者用落地页、众筹 PPT、信息图与 App 原型作为测试题，把修改前后的方案打乱顺序贴成一面墙，自己盲选。三轮结果很有意思：

- **第一轮（4 题只赢 1 题）**：要求每个方向都有一个大隐喻。结果很多页面被做成了具象道具：众筹 PPT 做成一张借书卡，App 原型被整个套进地铁线路图，风格用力过头，反而遮蔽了核心信息。
- **第二轮（2 题全输）**：增加了一份“2026 年 AI 默认外观清单”和几道护栏，试图用负面清单把 Agent 从常见长相里赶出来。结果 Agent 变得极为保守，方案全变成了浅冷色和整齐网格，显得格外平淡无聊；而此前在旧版中表现不错的深色卡片或暖纸留白也被规则挡在门外。
- **第三轮（2 题全赢）**：把思路反了过来，改为“加选项，不加禁令”——让 Agent 先看看得见的真实样张与参考作品。这里并不是取消所有规则，模板装饰清理与字号、对比度等可读性底线依然保留，但在风格探索上不再用负面清单去限制。

第三轮的“两题全赢”只是作者在少量题目上的个人选择，不能换算成原标题里的“审美提升 100%”。这次改法值得借鉴的地方，是多给看得见的选项，让 Agent 有具体参照可以探索。

![第一轮测试的众筹PPT方案](https://pic.xiaohu.ai/jiedu-media/huashu-design-3/huashu-design-3-source-2.jpg)

第一轮原始对照图：借书卡式和高饱和方案，帮助理解作者所说的“风格过头”。

![第二轮植物App三个方向](https://pic.xiaohu.ai/jiedu-media/huashu-design-3/huashu-design-3-source-3.jpg)

第二轮原始对照图：三组植物 App 原型都偏浅色、规整；输赢来自作者个人盲选。

---

#### 六个方向先试一遍，再挑三个做深

3.0 默认要求新视觉设计先通过“三方向门”；同一项目已选方向后的迭代、纯机械操作或用户明确要求跳过时，可以豁免。这个流程并不是凭空只做三套图，而是规定 Agent 按照三条路径探索，各出 2 个候选，共产生 6 个候选方案。在支持多 Agent 的环境下可以并行制作，而在资源吃紧的弱 runtime 环境下也可以串行执行。方案经过初筛后，挑出 3 个骨架真正拉开的设计做成相应媒介的真实初稿。

##### 1. 六个候选从何而来

Agent 沿着三条路径分别构思 2 个候选：

- **最佳设计师（从零构思）**：思考哪位适合当前题材的设计师或工作室（例如原研哉、田中一光、吕敬人、Irma Boom），借鉴其版式构图与留白思维从头设计，而不是表面临摹其代表作。
- **现实参照（同媒介对标）**：在同一种媒介里寻找出色的真实作品——做 App 找 App（如设计奖作品），做网页找优秀网站，做幻灯片找优质出版物。通过内置脚本 `ref_board.py` 把参考截成参考板，让 Agent 亲眼看清网格、字号比与图文关系，避免仅凭文字印象拼凑。
- **秒数轮盘（样张抽选）**：根据执行时的系统秒数取模，分别在当前媒介分区与跨媒介的东亚分区各抽一个风格，而不是从 84 种里均匀抽签。风格库由 60 种扩至 84 种，明确划分为网页 20 种、PPT 20 种、信息图 20 种、App 12 种，以及中文与东亚 12 种。每种风格都配有样张图，Agent 必须先查看样张做到位的样子再构思。轮盘的作用是把 Agent 带到平时不常想到的视觉方向。

![中文与东亚12种风格样张](https://pic.xiaohu.ai/jiedu-media/huashu-design-3/huashu-design-3-sheet-east.jpg)

新增中文与东亚分区的 12 张样张。画面中的题材与数字是风格示意。

![App12种风格样张](https://pic.xiaohu.ai/jiedu-media/huashu-design-3/huashu-design-3-sheet-app.jpg)

新增 App 分区的 12 张样张；可直接比较硬件面板、户外地形和编辑式阅读等不同布局。

##### 2. 缩略图初筛降低试错成本

生成 6 个候选后，Agent 不会直接写 6 套完整代码，而是先生成一个名为 `design-demos/thumbs.html` 的六格缩略图面板（每格约 480×300 像素），包含真实字体、配色、版式骨架和标题，先省略交互细节。Agent 借助看图能力审查缩略图：如果在缩略图阶段结构就撑不住，完整稿也难以成立，此时撤换方案的代价很小。

##### 3. 怎样筛选方案

从 6 个候选挑选 3 个升级为完整方案，按照四条标准筛选。挑选出的方案是按规则筛出的候选，并不代表算法能必然保证设计质量，三张也不强制要求每条路径各留一张（例如两张最佳设计师加一张轮盘也可以）：

1. **单看立得住**：视觉重心明确，层级不散。缩略图立不住的，完整版也救不回来。
2. **三张彼此不一样**：避开“换皮”。换皮是指网格和字号完全一样只换颜色；真正的差异是排版骨架、图文关系与阅读动线不同。
3. **避开近期账本**：读取本机历史记录，如果最近几个项目刚用过类似外观或参照，本次主动避开。
4. **隐喻不过头**：判定标准只有一个——**把这个手法去掉，核心信息是变清楚还是变模糊？** 去掉反而更清楚的，就属于用力过猛（如把页面做成借书卡或套进地铁图）。整页做成道具或套强隐喻这类手法，三版里最多保留一版，而且只在内容确有需要时使用。

工作流程示意
先把路走宽，再挑三版做深

**最佳设计师**两位气质不同的设计师
各提供一种构思路径**2 个候选**
**现实参照**同媒介的两份真实作品
截图后拆解具体关系**2 个候选**
**秒数轮盘**当前媒介与东亚风格库
抽样后先看对应样张**2 个候选**

↓
6**先画缩略图**

真字体、真配色、真骨架。此时换方向，比做完六套完整稿再推倒更省工。

**挑选时同时看四件事**

- 单看是否成立
- 三版骨架是否不同
- 是否重复近期项目
- 形式是否妨碍内容

↓
3**三个方向做成真实初稿，交给用户选**

另外三张仍作为备选。最终三版可以有两版来自同一条路径。

这是仓库规定的探索流程；初稿形态随网页、幻灯片、动画等媒介调整，不是本次生成测试的记录。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/huashu-design-3/huashu-design-3-w3-fallback-advisor.mp4)

旧版三套逻辑直接出三版的演示（12秒，2.0流程；3.0已改为先六选三）。

#### 参考怎样变成具体设计：四个案例

作者公开的四个案例，能看出这些方法在版面上的具体落点。

##### 案例一：葛饰北斋《富岳三十六景》线上特展（Web）

面对该文化题材，系统生成的三个方向呈现出截然不同的视觉温度：第一版采用阿姆斯特丹国立博物馆（Rijksmuseum）式的深色暗场展柜；第二版提取田中一光的几何三角窗；第三版则采用东方装帧的书衣题签。

![葛饰北斋《富岳三十六景》线上展览暗场首屏](https://pic.xiaohu.ai/jiedu-media/huashu-design-3/huashu-design-3-source-4.jpg)

暗底展厅突出画作本身的视觉重心。

    首屏原选《神奈川冲浪里》，作者报告体检发现两版首图重复后换成了《山下白雨》，避开同题材多方案撞车；底标大字宋体建立特展质感。

在该案例中，真实内容组织影响了具体排版决策：

- 示例中全 46 幅画作素材均来自芝加哥艺术博物馆和大都会艺术博物馆的开放馆藏。
- 在介绍“普鲁士蓝”的章节中，页面版式围绕大都会博物馆的研究组织，展示深色叠印与浅色纯普鲁士蓝的对比，并在底部如实注明屏幕色样取自数字图像像素仅作示意，不是颜料测量值。
- 作者报告体检发现两版首屏都选用了《神奈川冲浪里》出现重复，随后把暗场那版换成了《山下白雨》，拉开画面差异。

![北斋展览的普鲁士蓝章节](https://pic.xiaohu.ai/jiedu-media/huashu-design-3/huashu-design-3-source-5.jpg)

普鲁士蓝章节把原画局部、叠印位置与两块蓝色样本放在一起。图中已注明：屏幕色样不是颜料实测。

![北斋展览全46幅作品墙](https://pic.xiaohu.ai/jiedu-media/huashu-design-3/huashu-design-3-source-6.jpg)

同一网站的全 46 幅作品墙，展示从首屏到馆藏浏览的内容展开。

##### 案例二：“鸣迹”观鸟记录应用（App 原型展示板）

传统原型展示常把多台手机等距平铺，画面容易显得单调。作者在参考板中展示了获得苹果设计奖的 CapWords，用它作为同媒介参考，借用其照片贴纸的收集质感。

![CapWords真实参考板](https://pic.xiaohu.ai/jiedu-media/huashu-design-3/huashu-design-3-source-7.jpg)

动手前截取的 CapWords 参考板。随后可对照鸣迹结果，查看照片贴纸的视觉关系怎样被迁移。

![鸣迹观鸟 App 原型展示板](https://pic.xiaohu.ai/jiedu-media/huashu-design-3/huashu-design-3-source-8.jpg)

多屏错落构图打破了等距手机排列的单调。

    鸟类素材从照片中分割出带白边的手账贴纸；界面中的 92% 与评分等为原型展示数值，不证明真实识别能力。

从参考作品中借用的是“从照片里撕下一张贴纸”的交互质感：

- 鸟类素材从 Wikimedia 的真实照片中分割出来，做成带白边的贴纸，贴进一年的记录本中。
- 叫声波形是根据真实录音计算生成的，使原型界面更贴近真实记录场景。

![绿拇指植物健康App展示板](https://pic.xiaohu.ai/jiedu-media/huashu-design-3/huashu-design-3-source-13.jpg)

第三轮盲选中获选的植物 App 展示板：深底与多屏错落构图。画面指标为原型示例。

##### 案例三：“今晚吃啥”家常菜谱（App 原型）

在该题目中，秒数轮盘抽中了吕敬人的书籍设计风格。

![今晚吃啥家常菜谱 App 原型展示板](https://pic.xiaohu.ai/jiedu-media/huashu-design-3/huashu-design-3-source-10.jpg)

书籍排版元素向移动界面的迁移。

    一道菜一页方子，切口旁设独立旁注栏呈现经验提醒，朱砂印突出“开做”入口；图示为展示原型，不代表真实投产系统。

书籍设计的排版规则被迁移到移动界面中，突出了烹饪关键信息：

- **一道菜一页方子**：页面像翻开的菜谱一样组织，版面结构清晰，步骤明确。
- **独立旁注栏**：在页面切口旁边留出专门的旁注栏，写上“擦干再煎才不溅油”“老抽只要几滴”等经验之谈，使正文步骤与窍门提示互不干扰。
- **朱砂印章**：全屏只将一枚朱砂红印留给“开做”操作，突出主要入口，避免界面被杂乱色块干扰。

##### 案例四：《千里江山图》讲座演示文稿（Deck）

制作幻灯片时，Agent 在“最佳设计师”路径中参考了 Abbott Miller 式的暗场展陈思路。

![《千里江山图》演示文稿封面与长卷缩略定位条](https://pic.xiaohu.ai/jiedu-media/huashu-design-3/huashu-design-3-source-11.jpg)

暗底展陈调性与长卷位置定位条。

    页面底色取自绢地最暗处的颜色，封面底部细长条展开全卷缩略图，框出当前页对应长卷的具体位置。

版面设计紧扣长卷观赏的体验：

- 幻灯片暗底直接取自画作绢地最暗处的颜色。
- 封面下方设计了一条细长的全卷缩略定位条，框出这一页在 11.9 米长卷中所处的位置，帮助观众建立全局感。
- 往后的页面则按画作内容展开，讲解画作尺寸、“希孟年十八岁”、小如豆的人物细节与石青石绿矿物颜料。

![千里江山图PPT四个内容页](https://pic.xiaohu.ai/jiedu-media/huashu-design-3/huashu-design-3-source-12.jpg)

从尺寸、题跋中的年龄、微小人物到矿物颜料，四页分别用与所讲内容对应的原画局部。

---

#### 脚本查硬伤，记录帮下一次选择

在整个流程中，huashu-design 将不同性质的判断拆分得很明确：

- **可测问题由脚本查**：字号是否过小、对比度是否达标、图片是否裂开等物理事实，由 `design_lint.py` 通过无头浏览器直接测量。
- **审美由用户判断**：脚本不负责判断设计好看与否，审查 Agent 打出的高分也不能代替用户买账，好看与否最终完全由用户决定。
- **内容事实要另对原文**：文字与数据事实不能靠排版或对比度脚本发现。例如在韦伯望远镜科普题目中，初稿把一篇研究里的“数量多约 100 倍”误读成了“亮 100 倍”，最终是由另开的独立核查 Agent 对着原文核查才纠正出来的。

![黑洞科普PPT四页](https://pic.xiaohu.ai/jiedu-media/huashu-design-3/huashu-design-3-source-15.jpg)

另一个原始 PPT 案例：黑底突出照片，标注写在图上，每页保留出处。

##### 1. design_lint.py：只量事实，不评审美

该脚本驱动浏览器渲染页面，提取文字和截图信息，只检查能被核对的事实：

- **红灯（阻断交付，必须修复）**：检测图片是否断链失效、正文与标签字号是否低于下限、文字与背景的相对亮度对比度是否达标（常规文字需满足 4.5:1，大字需满足 3:1），以及页面控制台是否有报错。
- **黄灯（清理模板装饰）**：检测全大写拉字距小标签、无意义的中点连缀（`A · B · C`）、按钮尾部多余的箭头（`→`）、标题中孤立给单词换色，以及非序列内容强加的 `01/02/03` 编号。此类顺手生成的装饰应直接删掉。
- **外观指纹与相似提示**：脚本通过提取页面的底色、字体、主色板以及版式骨架向量来进行比对。色板间的平均距离使用 Oklab 颜色空间计算。这些相似度检查只作为换皮或撞车的提示，而非绝对的审美裁决。如果用户任务本身指定了品牌颜色与字体，可以只比对骨架；对于 App 多屏并排这类骨架天然相同的形态，也可以忽略版式相似提示。流行外观家族本身并不是毛病，看起来相近也不一定差，不能以启发式规则直接代替审美判断。

##### 2. 本机记忆：让新项目避开重复

要让新会话用上此前项目的具体偏好和外观历史，就需要把这些信息保存下来并重新读入。为了避免反复做出雷同外观，3.0 在本地目录 `~/.huashu-design/` 维护了三类记录：

1. **品味档案（`experience.md`）**：逐字记录用户亲口表达的偏好原话，并写明适用范围。例如作者在制作个人旅居档案时顺口说了句“尽量不要遗漏”，系统便将要求记入档案，但明确注明仅适用于照片档案，不外溢到产品界面。
2. **外观账本（`ledger.jsonl`）**：每次成功交付后，记录其底色分类、主色板、标题字体与版式骨架。下次开工前运行检查，主动避开最近常用的组合。例如外观账本发现作者最近 6 个交付里有 5 个使用了无衬线标题，在后续项目中菜谱和北斋展的大字便主动挑了宋体，避开字体重复。
3. **经验与坑**：将单个项目里初次观察到的现象（observed）与经过多次复现或测量验证过的结论（verified）区分记录。只有通用且验证过的规则，才会沉淀到随 skill 分发的经验文档中。

![作者的旅居照片档案](https://pic.xiaohu.ai/jiedu-media/huashu-design-3/huashu-design-3-source-14.jpg)

旅居档案原图：卫星地图串起旅程，往下一段旅程一章。“尽量不要遗漏”的偏好只适用于这一类照片档案。

新任务开工前，Agent 把相关文本读回上下文，便能据此调整选择；模型权重没有因此改变。

记录用户品味时，Agent 需要先告诉用户；用户说不要，就不记。这些记录保存在本机，不随 skill 分发。Agent 读入记录后采用本地还是云端模型处理，取决于你使用的环境。

---

#### 如何开始使用

第一次用，可以先跟着做一套 PPT：装好技能并自检，发出需求，看三版代表页，再选方向、补余页和导出。下面给出每轮能直接发给 Agent 的提示词，网页、App 和动画另有对应练习。

作者为较早版本录制了一期 16 分钟的实际操作视频，尽管其中的部分机制在 3.0 中已演进（例如三方向由直接出三版升级为先出六个缩略图再挑三版），但核心交互逻辑与设计理念一脉相承。读者可以在动手前观看作者的演示：

除了观看[完整的 16:13 教程视频](https://www.youtube.com/watch?v=m-_BlUdcIvw)，也可以根据手头任务直接跳转至作者记录的对应章节：

- [03:09 幻灯片（PPT）实战演练](https://www.youtube.com/watch?v=m-_BlUdcIvw&t=189s)
- [06:39 个人主页与照片提色](https://www.youtube.com/watch?v=m-_BlUdcIvw&t=399s)
- [10:43 iOS 待办管理 App 原型](https://www.youtube.com/watch?v=m-_BlUdcIvw&t=643s)
- [12:47 产品宣传动画与时间轴](https://www.youtube.com/watch?v=m-_BlUdcIvw&t=767s)
- [15:46 安装方式与常见接入](https://www.youtube.com/watch?v=m-_BlUdcIvw&t=946s)

---

##### 1. 准备工作：区分系统终端与 Agent 对话

在开始之前，初学者最容易混淆的是操作界面：

- **系统终端**（macOS 的 Terminal/iTerm，或 Windows 的 PowerShell/CMD）：用于运行 Node.js 环境检查、执行安装或更新命令。
- **Agent 对话窗口**（如 Claude Code 终端会话、Cursor 的 Chat 侧边栏、Codex 等）：用于向已经加载了 Skill 的模型发送具体设计需求与修改意见。

huashu-design 本身是一个 Skill（技能扩展包），**它不是一个带图形界面的独立 App，也不是独立的云端 SaaS**。它必须依托一个已经具备可用模型和基本执行权限的 Coding Agent。设计生成质量与代码编写能力，取决于你宿主 Agent 所接入模型的推理与多模态水平。

在电脑终端中，首先检查本机是否已经具备 Node.js 和 npx 环境：

```bash
node --version
npx --version
```

如果终端提示命令不存在（command not found），说明本机尚未安装运行环境。请前往 Node.js 官方网站 [nodejs.org](https://nodejs.org/) 下载并安装当前的 LTS（长期支持）版本。安装后重新打开终端，再运行这两条命令确认。

为了避免生成的文件散落在系统各处，建议在终端中为本次练习创建一个专门的项目文件夹并进入：

```bash
mkdir huashu-demo
cd huashu-demo
```

不同宿主 Agent 的技能安装路径各不相同，切勿假设所有宿主都会将配置写在同一个全局目录下。

---

##### 2. 安装、目录结构检查与会话加载

在系统终端中，运行官方推荐的安装命令：

```bash
npx skills add alchaincyf/huashu-design
```

执行后，交互式安装器通常会列出检测到的宿主环境（例如 Claude Code、Cursor、Codex 等）。请根据你自己实际日常使用的 Agent 移动光标选择，确认安装。

###### 检查安装目录完整性

安装完成后，**务必先检查安装目录的文件结构**。huashu-design 包含大量的样张、风格参考、导出脚本与预制组件，绝非只有 `SKILL.md` 一个单文件。以 Claude Code 默认路径（`~/.claude/skills/huashu-design/`）为例，合格的目录必须至少包含以下内容：

- `SKILL.md`：核心工作流与规范协议说明；
- `references/`：网页、幻灯片、信息图、动画等模块手册及排版字体指南；
- `assets/`：84 种原生风格样张、设备边框组件（`ios_frame.jsx` 等）与音效库；
- `scripts/`：体检脚本（`design_lint.py`）、参考板生成工具（`ref_board.py`）与记忆管理脚本；
- `demos/`：各能力模块的基础演示。

如果查看安装路径后发现只有单个 `SKILL.md` 文件，README 记录过旧版 `skills` CLI（≤1.5.15）只同步单文件的问题。可以先使用带有 `@latest` 标签的命令重新安装：

```bash
## 在系统终端运行
npx skills@latest add alchaincyf/huashu-design
```

###### 确认 Agent 正确加载

不要以为在已经打开的旧会话中直接提问就能自动加载新 Skill。建议在宿主 Agent 中新开一个会话，发送明确的指令让模型读取并自检：

```text
任务说明：
请读取已安装的 huashu-design SKILL，向我报告你检测到的版本号以及当前 skill 的根目录路径。
```

当 Agent 明确回复已经加载 3.0.0 版本并能够定位到 references 与 scripts 路径时，即可正常开始任务。

若 CLI 安装不完整，仓库还提供了基于 Git 的克隆方式；它同样需要能够访问 GitHub。以 README 明确给出的 Claude Code 路径为例：

```bash
## 在系统终端运行
git clone https://github.com/alchaincyf/huashu-design.git ~/.claude/skills/huashu-design
```

如果目标目录已存在同名旧版本文件夹，请先备份或确认路径，不要盲目直接覆盖。后续日常需要更新时，在实际克隆目录下运行 `git pull` 即可，或者重新运行一次安装命令。

---

##### 3. 完整实战演练：30 分钟演示文稿（四轮对话）

幻灯片（Deck）是串联需求澄清、三方向门、内容细化与可编辑导出的典型场景。以下流程参考作者视频中 03:09–06:39 的案例：为一个给非技术白领讲解 Coding Agent 与 Claude Code 的 30 分钟线下分享制作课件。

这套练习把制作分成四轮，每轮看见结果后再继续，避免做到最后才发现方向不合适。

###### 第一轮：初始提示词（明确受众、题材与三方向门约束）

在新建的练习目录中打开 Agent 对话，发送以下结构完整的初始指令。说明：本文提示词依据作者演示逻辑整理，读者可在中英文本中任选一种发给 Agent：

```text
任务说明：
我想制作一份用于线下演讲的幻灯片，主题是向非技术白领员工介绍什么是 Coding Agent 以及 Claude Code 的基本使用逻辑。整场分享时长约 30 分钟。请遵守 huashu-design 规范：
1. 听众没有任何编程基础，请基于 Anthropic 官方公开材料与品牌调性设计，不要凭空捏造不存在的功能；
2. 严格执行“三方向门”，先构思 6 个候选缩略图并推荐 3 个不同骨架方向，每个方向只做 2 页最具代表性的页面（封面与核心内容页）；
3. 生成好 3 个方向的代表页后请停下来等我查看，在我确认前不要批量生成后续页面；
4. 最终交付物需包含浏览器可直接播放的 HTML Deck、矢量可搜索文本的 PDF，以及可在演示软件中双击编辑文字的 PPTX。
```

英文初始提示词对照（English Reference）

```text
Task:
I need to create a slide deck for an in-person presentation introducing Coding Agents and the core concepts of Claude Code to non-technical white-collar professionals. The presentation will last about 30 minutes. Please follow the huashu-design workflow:
1. The audience has no programming background. Base the design on official public materials and authentic brand style, without inventing non-existent features;
2. Strictly follow the Three Directions Gate: first generate a 6-candidate thumbnail board, pick 3 structurally distinct directions, and build only 2 representative showcase slides per direction (cover and key content slide);
3. Stop and wait for my visual review once the 3 directions are ready; do not batch-generate the rest of the deck without approval;
4. The final delivery must include a browser-playable HTML Deck, a vector-searchable PDF, and an editable PPTX file with double-clickable text boxes.
```

**本轮应见结果**：Agent 会创建 `design-demos/thumbs.html`（6 格缩略图总览）以及 `design-demos/dir-1/`、`dir-2/`、`dir-3/` 三个子目录，分别输出 2 页代表页的 HTML 与截图。同时 Agent 会列出针对受众深度或重点案例的简要提问，等待你的反馈。

###### 第二轮：补充背景与确认方向（早对齐）

在这个阶段，Agent 会像初级设计师一样先呈现实体方案并核对假设。读者需要根据截图挑选心仪的视觉结构，并对未解问题予以回应：

[视频/音频](https://pic.xiaohu.ai/jiedu-media/huashu-design-3/huashu-design-3-w2-junior-designer.mp4)

先对齐再细化的过程演示（12秒，2.0示例）。

发送指令确认方向或提出混搭要求。下面的方向编号和特征只是写法示例，请替换成你实际看到、实际选中的方案：

```text
我已经查看了三个方向的代表页截图：
1. 整体选定 Direction 1 的深色展陈骨架与文字对比层级，但希望融入 Direction 3 中温和的卡片重点色；
2. 听众核心痛点在于日常办公文档处理与信息收集，请把案例重心放在日常白领场景，略去底层命令行参数；
3. 请把我的选择记录进 direction-approved.md，锁定当前设计系统，并输出完整的 8-10 页幻灯片大纲草案供我过目。
```

英文第二轮指令对照（English Reference）

```text
Task:
I have reviewed the screenshots of the three directions:
1. I choose Direction 1's dark exhibition layout and typography hierarchy, but blend in Direction 3's softer card accent color;
2. The audience's main pain point is daily office document processing and info gathering; focus the examples on everyday white-collar tasks, skipping low-level CLI parameters;
3. Record my choice into direction-approved.md, lock this design system, and draft a complete 8-10 slide outline for my review.
```

**本轮应见结果**：Agent 在项目根目录下生成 `direction-approved.md`，记录下你的原话与混搭决定；随后提供包含封面、痛点引出、产品概念、白领实战案例、常见顾虑与总结的大纲清单。

###### 第三轮：认可结构，生成余页并就地微调

大纲认可后，Agent 开始批量编写单页组件。由于幻灯片默认采用“多文件 + 概览墙”架构，每一页都应当是一个独立的 HTML 文件：

```text
任务说明：
大纲结构没有问题，请按已锁定的设计系统生成剩余所有幻灯片单页。要求：
1. 每页独立存为 slides/slide-*.html，页面内部绝不硬编码自带页码，统一由外壳概览墙驱动；
2. 第 4 页“核心案例对比”，请采用左右分栏结构清晰呈现同一个办公任务中“人工逐步处理”与“Agent 协作处理”的步骤对比；没有实测记录时不要添加耗时或效率数字；
3. 严格遵守可读性下限：正文字号 ≥24px，注释标签 ≥16px，保持全局版式统一。
```

英文第三轮指令对照（English Reference）

```text
Task:
The outline looks good. Please generate the remaining slide HTML files according to the locked design system:
1. Save each page independently as slides/slide-*.html. Never hardcode page numbers inside slide content; let the shell overview manage indexing;
2. For Slide 4 (Case Comparison), use a side-by-side card layout comparing manual steps and Agent-assisted steps for the same office task; do not add time or efficiency figures without measured records;
3. Strictly enforce readability thresholds: body text >= 24px, label/annotation >= 16px, maintaining global visual coherence.
```

**本轮应见结果**：项目目录下生成各单页文件以及用于拼装概览的 `index.html`。用浏览器打开 `index.html`，通过页面提供的翻页与概览入口查看整套幻灯片，再试按页面标出的键盘翻页键，确认有效。

###### 第四轮：导出交付与逐页验收

完成 HTML 走查后，要求 Agent 调用内置导出工具链生成正式交付文件：

[视频/音频](https://pic.xiaohu.ai/jiedu-media/huashu-design-3/huashu-design-3-c2-slides-pptx.mp4)

HTML幻灯片与可编辑PPTX演示（约10秒，2.0示例）。

发送导出指令：

```text
全套幻灯片走查完成，请执行导出与体检：
1. 从你已确认的 huashu-design 安装根目录调用 PDF 导出脚本，为当前项目生成可检索文本的 PDF；
2. 按当前 HTML 的结构选择合适的 PPTX 导出路线，目标是文字可编辑，不要把整页做成一张截图；
3. 从安装根目录调用 design_lint.py 检查字号、对比度、裂图和控制台；另用逐页截图检查裁切、遮挡，报告 PPTX 文本比对结果与仍未通过的项。
```

英文第四轮指令对照（English Reference）

```text
Task:
The slides have been verified in browser. Please proceed with export and linting:
1. Call the PDF export script from the confirmed huashu-design installation root for this project;
2. Choose the PPTX export route suited to the current HTML, aiming for editable text rather than a full-page screenshot;
3. Run design_lint.py from the installation root for typography, contrast, broken images and console errors. Separately inspect slide screenshots for clipping and overlap, and report PPTX text comparisons and any failed checks.
```

**本轮应见结果**：生成同名 `.pdf` 与 `.pptx` 文档。仓库按 HTML 的结构区分导出路线：按导出约束编写的 Deck 可用 `export_deck_pptx.mjs`；已有视觉 HTML 则可能使用 `pptx_from_rendered.py`，从浏览器渲染结果提取文本与坐标。让 Agent 报告实际用了哪条路线及文本比对结果。比对通过后，仍要用演示软件打开，检查可编辑性和版面。

---

##### 4. 网页、App 原型、动画与信息图的实操区别

通用流程（三方向门与需求澄清）在所有任务中均有效，但在面对其他媒介时，各模块有其独特的输入规范与技术边界：

###### A. 网页与个人主页（照片提色与品牌规范）

在作者 06:39–10:43 的演示中，制作个人主页并非套用现成的主题模板，而是通过用户投喂的真实照片或品牌资料提炼出独特的色彩系统：

[视频/音频](https://pic.xiaohu.ai/jiedu-media/huashu-design-3/huashu-design-3-w1-brand-protocol.mp4)

品牌资产到设计规范的流程演示（12秒，2.0示例）。

- **输入要求**：将你喜欢的海报、门店实拍照片或品牌 Logo 文件放入项目目录（例如 `assets/sample.jpg`），明确要求 Agent 提取主辅色并固化为 `brand-spec.md`。提供真实的个人简介与社交账号，**不要让 Agent 编造经历、报道或名言**。
- **可复制初始指令（本文依据演示整理）**：
  ```text
  任务说明：
  我想制作一个个人简介与项目聚合落地页。请读取我提供的参考照片 assets/sample.jpg，通过脚本分析并提取其中的代表性色值，写入 brand-spec.md 固化为设计规范。随后遵循三方向门给出 3 种版式初稿。内容上据实展示我的项目与社交链接，不要编造任何未经提供的头衔。
  ```
- **追问微调指令**：
  ```text
  任务说明：
  三版中我选定 Direction 2。首屏主视觉请将抽象占位图替换为我提供的真实肖像照片 avatar.jpg；在移动端（375px 宽度）走查导航栏与正文字号，确保正文字号不低于 16px。
  ```

英文主页指令对照（English Reference）

```text
Initial prompt:
I want to build a personal profile and portfolio landing page. Please inspect my reference image assets/sample.jpg, extract its dominant and accent color values into brand-spec.md as CSS variables, and follow the Three Directions Gate to present 3 distinct layout concepts. Display my actual projects and links honestly; do not fabricate credentials or quotes.

Follow-up prompt:
I choose Direction 2. Replace the abstract hero placeholder with my actual photo avatar.jpg. Check the navigation and typography on mobile (375px viewport) to ensure body text is >= 16px.
```

###### B. 移动 App 原型（把四屏真正点通）

在作者 10:43–12:47 的案例中，展示了一个基于《高效能人士的 7 个习惯》理念的待办管理 App 原型：

[视频/音频](https://pic.xiaohu.ai/jiedu-media/huashu-design-3/huashu-design-3-c1-ios-prototype.mp4)

iOS 原型能力演示（番茄钟示例，约10秒，2.0版本）。

- **操作关键**：可以让 Agent 复用技能包的 `assets/ios_frame.jsx` 设备外壳，并把核心屏幕组成展示板。展示板方便看整体；跟做时还要把主要操作点通，例如新建待办、关闭弹层、勾选完成、返回首页。好看的四屏截图本身不能证明这些流程已实现。
- **4 屏练习可复制提示词（标明本文练习，选自实际任务自行组织）**：
  ```text
  任务说明：
  【本文练习】请制作一个四象限时间管理 iOS App 的高保真可交互原型。要求：
  1. 使用 assets/ios_frame.jsx 提供的 iPhone 15 Pro 标准设备框，不要手写灵动岛与电池栏；
  2. 平铺呈现 4 个核心屏幕并做成展示板构图：①“今日四象限”首页、②“新建待办”弹层、③“任务详情与影响圈分析”页、④“完成归档与每周回顾”页；
  3. 提供可点击的四屏原型：支持 Tab 切换、弹层展开与关闭、勾选完成，并在屏幕间提供清晰返回路径；
  4. 界面数据采用符合四象限逻辑的高质量预置示例，明确这是前端交互演示原型，不连接真实后端数据库。
  ```

英文 App 原型提示词对照（English Reference）

```text
Task:
[Practice Exercise] Please create a high-fidelity interactive iOS app prototype for Eisenhower Matrix task management:
1. Bind strictly to assets/ios_frame.jsx for the standard iPhone 15 Pro bezel; do not handwrite dynamic islands or status bars;
2. Lay out 4 core screens on a composed presentation board: ① Matrix Dashboard Home, ② New Task Modal, ③ Task Detail & Circle of Influence, ④ Archive & Weekly Review;
3. Make the four-screen prototype clickable, including tab switching, modal toggles and task completion, with clear back-navigation routes;
4. Populate with realistic task data, explicitly marking this as an interactive front-end demo rather than a production backend system.
```

###### C. 宣传与概念短动画（真实资产确认与时间轴）

在作者 12:47 的案例中，展示了为 B 站新推出的 AI 视频产品“花生”制作的一段 15–20 秒 16:9 横屏宣传动画：

[视频/音频](https://pic.xiaohu.ai/jiedu-media/huashu-design-3/huashu-design-3-c3-motion-design.mp4)

动画时间轴与运动变化演示（约10秒，2.0示例）。

- **操作关键**：动效不是静态 PPT 的文字逐行淡入（Fade-up）。制作前 Agent 必须先通过 WebSearch 确认产品存在性并抓取真实官方 Logo 与渐变色；在三方向阶段先交出渲染好的关键帧方向板与分镜卡，经确认后再编写代码。
- **环境与性能说明**：导出 MP4/GIF、合成背景音乐或解说配音，高度依赖本地宿主环境是否配置了 Node.js、Playwright 以及 ffmpeg。可以先在浏览器查看 HTML 动画，缺少的导出依赖仍要补齐。基础 25fps 视频派生的 60fps 可能采用帧复制或补帧，另有逐帧 seek 的真 60fps 路线；文件标成 60fps，并不单独证明运动细节更丰富。非官方宣传要如实标注归属。
- **可复制初始指令（本文依据演示整理）**：
  ```text
  任务说明：
  我想为一个名为“花生 AI”的视频生成工具制作一段 15-20 秒、16:9 比例的非官方产品宣传短动画：
  1. 首先通过网络核验该产品的官方 Logo、核心视觉色调与主要特性；
  2. 遵循三方向门要求，先提供包含关键帧静止截图与色板的方向板，并附带简要分镜脚本供我挑选；
  3. 选定后使用时间轴驱动连续叙事，突出“输入提示词到一键成片”的动态变化过程，不要做成单页幻灯片切换；
  4. 片尾右下角如实保留“Created by Huashu-Design · 非官方致敬”水印。
  ```

英文动画提示词对照（English Reference）

```text
Task:
I want to produce a 15-20 second, 16:9 ratio unofficial motion promo for a video AI tool named "Huasheng AI":
1. First verify the official brand logo, color gradient, and key feature list via WebSearch;
2. Comply with the Three Directions Gate: present motion moodboards with rendered keyframe screenshots and a light storyboard first;
3. Once approved, build a timeline-driven continuous narrative highlighting the "prompt to final video" transformation, avoiding slide-like fade-up cuts;
4. Keep the "Created by Huashu-Design · Unofficial Tribute" watermark at the bottom right of the outro.
```

###### D. 信息图与数据长图（数据真实性与字号换算）

在数据可视化与科普长图中，核心原则是**数据是画面的主角，不是排版装饰**：

[视频/音频](https://pic.xiaohu.ai/jiedu-media/huashu-design-3/huashu-design-3-c5-infographic.mp4)

信息图排版演示（约10秒，2.0示例；图中模型数字不作当前评测）。

- **输入要求**：提供确凿的数据源与阅读场景（如移动端 1080px 宽的小红书长图，或嵌在文章内的横向图表）。根据数值关系决定表达形态（比例关系用实物面积、时间演进用连续曲线、多维对比用对照网格）。演示中所展示的大模型 Benchmark 跑分等数值仅为版式演示，不代表当前的真实性能评测。
- **按手机上的最终大小检查字号**：仓库给出的 1080px 长图画布起点是正文 ≥36px、标签 ≥28px。但整张缩到 390px 手机宽度后，两者约为 13px 和 10px，不能据此保证舒适可读。导出后要按实际展示宽度看一遍；注释太小就加大字号或拆图，别只检查大画布上的效果。

---

##### 5. 局部调整、Tweaks 调参与五维评审

在初稿完成之后，如何精细修改并验证交付物，直接决定了最终作品的完成度：

###### 局部修改与已选风格保持

当作品大体满意、只需微调某一处文案或间距时，必须明确告知 Agent“只修改指明区域，严格保持已确定的色彩变量、字体与其余组件”，避免 Agent 误以为重新设计而把已经通过的版面重写。

###### 使用 Tweaks 实时调参

可以让 Agent 给 HTML 加上 Tweaks 面板，用滑杆或选项调整几个真正影响设计的参数，例如颜色、字号、密度或布局。具体控件按作品决定，不是每份产物固定自带四个开关。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/huashu-design-3/huashu-design-3-c4-tweaks.mp4)

Tweaks实时调参演示（约10秒，2.0示例）。

在页面里打开调参按钮，一边改一边看效果。若实现使用 `localStorage`，设置可在当前浏览器保存，但不会自动写回 HTML 源文件，换浏览器或把文件发给别人也未必保留。选定后再发一句：

```text
任务说明：
请把我当前选定的颜色、字号和布局固化成 HTML 默认值，重新导出交付文件。随后清空本地设置或换一个浏览器打开，确认看到的仍是这一版。只改这些参数，保留已选方向和其他内容。
```

###### 五维专家评审的使用边界

在对话中输入“帮我对这个设计做一次 5 维度评审”，Agent 会调用内置规范对页面进行打分：

[视频/音频](https://pic.xiaohu.ai/jiedu-media/huashu-design-3/huashu-design-3-c6-expert-review.mp4)

五维评审演示（约10秒，2.0示例；模型评分不作客观品味分数）。

**重要认知**：五维评审（哲学一致性、视觉层级、细节执行、功能性、创新性）给出的 0–10 分与雷达图，本质上是模型根据预设规则生成的启发式评估，**绝不能被当成客观的设计品味得分**。它的核心价值在于产出具体的 `Keep / Fix / Quick Wins` 修复清单，帮助你发现对比度不足、间距失衡等硬伤。如果模型的高分建议与你自己的直觉冲突，始终以你自己的直觉为准。

###### 最终交付逐项验收清单

在向他人正式交付或上线物料前，请按照以下硬标准逐一核对：

1. **HTML 原型**：必须在桌面与移动端浏览器中真正打开，实际点击所有 Tab、按钮和展开层，按 F12 打开开发者工具确认控制台（Console）零红字报错；
2. **PDF 演示文件**：逐页检查边缘文字是否存在裁切丢失，文本能否被鼠标划词选中和复制搜索；
3. **PPTX 演示文稿**：必须使用真实的 PowerPoint、WPS Office 或 Keynote 打开，双击各页文本框，确认文字能够自由编辑、换行与改字，而不是整页被贴成了一张锁死的图片；
4. **视频与动画**：完整播放一遍，确认画面首尾没有闪烁的黑帧或白屏，音轨中 BGM 音乐与音效（SFX）正常出声；
5. **响应式宽度**：使用浏览器开发者工具切换至 375px 手机宽度，检查是否存在横向滚动条或文字溢出破损。

---

##### 6. 常见问题排查与修复指令

遇到问题时，可以把实际报错或截图一并发给 Agent，而不是只说“坏了”。

**体检脚本缺少 playwright 或 pillow。** 让 Agent 检查运行脚本所用的 Python 环境，在同一环境补齐依赖与浏览器，再重跑。暂时补不齐，就先用实际浏览器截图和点击检查，并在交付里注明自动体检未执行，不能把它记成通过。

**没有出现六格候选和三版代表页。** 先检查安装目录是否完整、当前会话是否读到了技能，再发：“请读取已安装的 huashu-design 规范，先给我六格候选缩略图与三个不同方向的代表页，展示后停下来，等我选择再做后续内容。” 模型没遵守步骤也可能是指令执行失败，不能只凭结果断言安装坏了。

**PPTX 双击只能选中一整张图。** 发：“请检查当前 HTML 适合技能包里的哪条 PPTX 导出路线，从已确认的安装根目录调用相应脚本，保留真实文本框；请报告文字比对结果，并用演示软件打开确认可编辑。”

**HTML 移到别处后图片消失。** 先检查图片是否用了项目内相对路径或临时链接，再要求：“请把交付所需素材一起打包，或在适合的情况下嵌入单个 HTML。把交付文件复制到新目录，再打开检查图片和链接。”

---

##### 7. 模块化演进、缺陷修复与开源许可证说明

发布说明还提到两项工程调整：`SKILL.md` 从 593 行缩到 215 行，把各媒介说明拆到子模块；以及修复 PPTX 裸文字丢失问题（#56），加入导出后的文本核对。这些改动有助于组织规则与检查结果，不保证每次生成或导出都正确。

当前仓库采用 **MIT 许可证**，可以用于个人与商业项目；模型调用、宿主 Agent 或外部服务仍按各自资费计费，作品中使用的第三方图片、字体和品牌素材也要分别检查授权。huashu-design 主要帮助制作视觉方案和可点击原型，涉及鉴权、数据库和运维的完整产品还需要后续工程实现。

从第一次练习到正式交付，最值得保留的习惯是：先看得见的方案，再明确选哪版；修改后重新打开，导出后用目标软件检查。这样，更多设计选项才能变成你实际能用的文件。

来源huashu-design 3.0发布！让你的设计审美再提升100%！花叔·[查看主材料](https://x.com/AlchainHust/status/2113650413170049529)延伸[huashu-design 开源仓库](https://github.com/alchaincyf/huashu-design)·[三方向生成规则](https://github.com/alchaincyf/huashu-design/blob/4fc7bfdbd5ec3fa2d43ce7a6433de60976a5e4b1/references/directions.md)·[本机记录与进化协议](https://github.com/alchaincyf/huashu-design/blob/4fc7bfdbd5ec3fa2d43ce7a6433de60976a5e4b1/references/evolution.md)·[CapWords：Apple Design Awards获奖记录](https://developer.apple.com/design/awards/2025/)·[作者完整上手教程（16:13，较早版本）](https://www.youtube.com/watch?v=m-_BlUdcIvw)
Huashu-Design 3.0 · 开源设计 Skill 解读

## 从默认外观到样张探索：用“三方向门”打破 AI 设计的同质疲劳

先看六格缩略图，再挑三个不同骨架做深。用更多真实参考与可见样张，帮助 Agent 避开反复套用同一种外观。

网页 / PPT / App 原型 · 方法与上手路径

huashu-design 是交给 Agent 读取的开源设计 Skill：把设计说明、参考资料和检查脚本放在一起，帮助它制作网页、PPT 与 App 原型。

使用 AI 编写网页或幻灯片时，创作者最常遇到的困境不是做不出好看的版面，而是**连续做几个项目后，页面结构与色彩高度雷同**。旧版本试图拉开方案差异，但在 5 组测试题中仍有 3 组撞了同一个外观家族。根子在旧 skill 里写死了一条默认外观：暖奶油底加衬线加陶土色。暖纸和衬线本身可以很好看；问题是不同题材都往这套长相上靠。

为解决雷同，作者进行了三轮打乱盲选：第一轮盲目追求大隐喻，页面被做成具象借书卡或套进地铁图，风格用力过猛反而遮蔽核心信息（4 题只赢 1 题）；第二轮增加负面清单与护栏，试图把 Agent 赶出常见外观，却导致方案极度保守，沦为平淡的浅冷色整齐网格（2 题全输）。最终作者将思路反转为**“加选项，不加禁令”**：保留字号、对比度等可读性底线，给 Agent 看得见的真实样张去探索，第三轮两题都被作者选中。这是少量题目上的个人盲选，不代表普遍的审美提升倍数。

84 种
可见风格样张库
覆盖网页/PPT/App/东亚

6 → 3
三路径各出 2 候选
缩略图初筛后深化 3 版

少设禁令
风格探索放开
物理硬伤交由脚本量测

核心突破：六候选初筛与三方向门机制

面对新视觉需求，3.0 默认要求先过“三方向门”。系统不再凭空只写 3 套代码，而是规定 Agent 按照三条路径探索，各出 2 个候选，共产生 6 个候选方案；先生成六格缩略图快速走查，再按四项筛选标准挑选 3 个骨架真正拉开的设计深化为真稿。

Step 1 · 构思发散
三条路径生成 6 个候选方案

沿三条截然不同的探索路线分别构思 2 个候选，多 Agent 环境可并行制作，弱环境可串行执行：

最佳设计师 · 从零构思
借鉴原研哉、田中一光、吕敬人等版式与留白思维，而非表面临摹

现实参照 · 同媒介对标
做 App 找设计奖作品，网页找优秀网站，ref_board.py 截图看清真实网格字号

秒数轮盘 · 跨区抽选
系统秒数取模，在 84 种样张库中抽选当前媒介与东亚分区风格，打破惯性

Step 2 · 低成本走查
design-demos/thumbs.html 六格缩略图初筛

生成 6 个候选后，Agent 不直接写 6 套完整代码，而是先生成六格缩略图面板（每格约 480×300 像素），包含真实字体、配色与骨架，略去复杂交互细节。Agent 借助多模态审查：视觉重心明确，层级不散。缩略图立不住的，完整版也救不回来，此时撤换成本极低。

Step 3 · 准则筛选
四条准则挑选 3 个深化方案

挑选出的 3 套方案不强制路径配额，核心是结构拉开，符合四项判定条件：

1. 单看立得住
视觉重心明确，层级秩序分明，在缩略图阶段就能撑起版面

2. 彼此真正不同
坚决避开“换皮”（同一网格只换颜色），排版骨架与动线必须异构

3. 避开近期账本
读取本机历史账本，主动规避最近几个项目已高频使用的字体与色板

4. 隐喻不过头
唯一裁决：“把这个手法去掉，核心信息是变清楚还是变模糊？”

在设计质量保障上，huashu-design 建立了清晰的权责分工：**物理事实由自动化脚本量测，而审美买账权始终留给用户**。

design_lint.py：只测事实，不评审美

驱动无头浏览器渲染页面，提取文字与截图进行硬指标测量：

 • **红灯（阻断交付）**：图片断链、正文字号过小、文字对比度不足（常规 <4.5:1、大字 <3:1）、控制台报错；

 • **黄灯（模板清理）**：清理全大写拉字距、无意义中点连缀（A·B·C）、按钮多余箭头、无序 01/02 编号；

 • **指纹比对**：以 Oklab 颜色空间计算色板距离，提示换皮或撞车，仅作参考而非审美裁决。

用户选择：模型高分不等于好设计

脚本不负责判断设计好看与否，审查 Agent 打出的高分也不能代替用户买账，好看与否最终完全由用户决定。

 对话中可调用“5 维度专家评审”生成雷达图与评语，但本质仍是启发式规则，用于提供修复清单，绝非客观品味得分。一旦模型建议与创作者直觉冲突，始终以人的直觉为准。

**内容事实另需原文对齐：**排版脚本无法识别事实错误。例如在韦伯望远镜科普中，初稿把“数量多约 100 倍”误读为“亮 100 倍”，必须由独立核查 Agent 对着原文复核纠正，无法依赖外观检查发现。

为了防止新会话再次掉入同一套用色和排版习惯，系统在本地维护**跨会话的记忆账本**，在开工前动态加载：

每次成功交付后，记录其底色分类、主色板、标题字体与版式骨架。下次开工前运行检查，主动避开最近常用的组合。在 `~/.huashu-design/` 目录下沉淀三类本地资产：

品味档案与外观账本

• **experience.md**：逐字记录用户亲口表达的偏好原话及明确适用范围（如“尽量不要遗漏”仅限个人旅居档案，不外溢到产品界面）；

 • **ledger.jsonl**：记录历史交付的外观向量。例如发现最近 6 个交付里有 5 个用了无衬线标题，后续项目便主动换用宋体。

经验分级与隐私边界

• **双层经验沉淀**：严格区分单次观察到的现象（observed）与多次复现验证的结论（verified），仅将已验证规则沉淀到分发文档；

 • **本地存储与知情权**：记偏好前先告知；用户说不要，就不记。这些记录不随 skill 分发，读入后由本地还是云端模型处理，取决于使用环境。

从安装到交付的跟做路径

先运行 `npx skills add alchaincyf/huashu-design`，检查安装目录包含 references、assets、scripts、demos，并让 Agent 报告版本和根路径。

**第一轮·立规矩**：说明受众、目标和交付格式，要求先出 6 缩略图与 3 方向代表页，展示后停下等待选择。
**第二轮·早对齐**：查看真稿截图选定骨架或混搭，将偏好固化至 `direction-approved.md` 锁定设计系统。
**第三轮·补余页**：按锁定系统补余页。用 Tweaks 调好后，让 Agent 将选定值写回 HTML 默认值，换浏览器再打开检查。
**第四轮·硬验收**：要求导出可编辑 PPTX 与可检索 PDF；用演示软件打开并双击改字，另外在浏览器检查交互、裁切和控制台。

↑ 正文结束
✓ 本篇全文免费开放

会员可复制、下载全文 Markdown，还能让你的 AI 订阅和提问。
[订年卡 $59/年](https://best.xiaohu.ai/buy/?plan=year)[看权益对比 →](https://best.xiaohu.ai/membership/)

[阅读原文 ↗](https://x.com/AlchainHust/status/2113650413170049529)

📮 新解读第一时间进邮箱

读完觉得有用？留个邮箱，每篇新解读发布就送达，随时退订。

### 相关解读

[产品发布 让显卡少做无用功 DeepSeek 开源了其背后的核心推理引擎 10-21 · 13 分钟](https://best.xiaohu.ai/article/deepseek-deepinfer/)[AI 实操 Anatomy：一句话，让 AI 把复杂机械原理做成可操作的动态图解 10-13 · 约 18 分钟](https://best.xiaohu.ai/article/anatomy-interactive-machine-skill/)[洞察 AI 开始逆向一切，软件开发还值钱吗？ 10-12 ·](https://best.xiaohu.ai/article/rea-agent-reverse-engineering/)
