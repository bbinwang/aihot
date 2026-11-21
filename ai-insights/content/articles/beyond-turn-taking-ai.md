---
title: "超越回合制的 AI 交互界面：「回合内交互」的新型人机交互理念"
date: 2026-11-15T00:00:00.000Z
tags: ["研究解读", "人机交互", "回合内交互", "AI 交互界面", "主动式 AI", "UCLA"]
summary: "和 AI 聊天，大多还是一来一回：它猜错了，你得再发一条、等它从头写。UCLA 的 Bruce Liu 做了两个演示，让人和 AI 在对方那一轮里就能插上手：你打字时 AI 先亮出它的理解，AI 回答时拿不准就留空给你填。"
---
> **原文链接**: [https://escholarship.org/uc/item/28d8b7wd](https://escholarship.org/uc/item/28d8b7wd)
> **来源**: escholarship.org
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/beyond-turn-taking-ai/) · 2026/11/15
> **说明**: 本文由 AIHot汪 自动聚合(原文即中文,未翻译)。正文取自小互 AI 解读

---

全文 Markdown · 会员

作者：Bruce Liu（UCLA 博士论文）11-15 · 约 17 分钟

你让 AI 帮你规划带孩子去日本玩一周，它很快回了一大段行程，排的却是你没打算去的城市。你只好再发一句「不是，我是说……」，等它从头来一遍。今天和 AI 打交道，还像发微信、下棋：你一步，它一步，对方这一步走完之前，你插不上手。

「回合内交互」（intra-turn interaction）想改的就是这一点：让人和 AI 在对方那一轮里就能插上手，不用等一整轮。它来自 UCLA 博士 Bruce Liu 最近放出的两个演示。他的说法是：如今的 AI 界面基本还是回合制，他在博士论文里想的，是不再轮流之后交互会是什么样子，回合内交互是其中一个例子。

我们觉得它值得看，不在于两个演示做得多复杂，而在于它提醒人：聊天框只是人和 AI 合作方式里的一种，是设计空间里的一个点，不是终点。一旦不默认「一人一句」，很多别扭的地方就有了别的解法。

### 为什么「一人一句」用着别扭？

演示站给今天的聊天下了个形容：它还是一部对讲机，一个人按住说完，另一个人才能开口。作者把毛病归成一句话：回合制界面把 AI 对你的理解、你们之间的共识都藏着，直到它回答才露出来，所以纠正一次误会，要多花一整轮。拆开是两条：

- **试错成本高：**它猜错了，你得再发一条、再等它从头写一遍，一次误会就是多一整轮。
- **看不见它怎么想：**它把你的哪句话理解成了什么、哪些地方是它自己猜的，要等它答完才看得到，那时它已经顺着猜错的方向写了一大段。

两个演示各管一头：Feedforward 让 AI 在你的那一轮里插上手，Leaving Blanks 让你在 AI 的那一轮里插上手。

### Feedforward：你还在打字，AI 先亮底

Feedforward 可以叫「提前亮底」。你还在输入框里打字，AI 就把它准备替你做的决定写在输入框上方，比如「你想要一份逐日行程」；它拿不准的词下面画着虚线，点开就能改：孩子几岁是一个滑块，喜欢什么是一排选项（主题乐园、动物、动漫……），去日本哪一片也能选。

![Feedforward 演示页：输入框上方写着 You want a day-by-day itinerary](https://pic.xiaohu.ai/jiedu-media/beyond-turn-taking-ai/app-run.png)

Feedforward 演示页的截图：带孩子去日本的请求还没发出，输入框上方已经写着「你想要一份逐日行程」，Japan、spring、kids 这些词下面都有虚线，可以点开确认。

放回开头那个日本行程：发出去之前，你已经看到它打算按什么来排，排错城市这种误会在这一步就消掉了，不用等它写完一大段再推倒重来。打个比方，以前像写信，寄出去才知道对方怎么读；现在像两个人站在同一块白板前，你写一笔，对方马上指着问「你是这个意思吗」。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/beyond-turn-taking-ai/thread-video.mp4)

两个演示的录屏（英文界面，约 1 分钟）。前半段是 Feedforward：打字时 AI 先亮出它的理解，可以点开改孩子年龄、兴趣和地区，也演示了做海报；后半段是 Leaving Blanks：AI 在生日家宴方案里留了三个空，填完接着写菜单。

### Leaving Blanks：AI 拿不准，就留个空给你填

Leaving Blanks 反过来，是你在 AI 的那一轮里插上手。AI 回答时遇到它拿不准、又会影响后面内容的地方，不编，而是留一个空。比如让它帮你在家给爸爸办 60 岁生日晚宴：一份菜单、一张购物清单、一段祝酒词。它先写「晚宴一共几位，他最爱吃什么，你的祝酒词要什么口气」，三处都是空；你点开空格选好，它就从那里接着往下写菜单，整个过程你只发了一次。

留空：填完空，它接着往下写

帮我在家给爸爸办 60 岁生日晚宴：一份菜单、一张购物清单，再加一段我能说的简短祝酒词。要像我说的话，别像贺卡。
爸爸 60 岁生日快乐！我会围绕三件事来安排：晚宴一共 几位，他最爱吃 什么，你的祝酒词要 什么口气。

菜单（6 人份）

前菜：布拉塔奶酪配烤番茄、罗勒和烤面包

主菜：慢炖牛肉酱配新鲜宽面

甜点：提拉米苏，提前一天做好，当天不用手忙脚乱

你填了 **0** 个空你发送的次数：**1**

示意图，按演示录屏翻译重画。演示里每个空点开是一组选项：人数有 4 到 16 人几档，菜系有牛排馆、意大利菜、墨西哥菜等，口气是一个「简短—更长、调侃—深情」的方格。

要分清的是：空格是 AI 主动留出来、等你回答的那几处，不是让你随时去改它正在写的内容。它做的事，是把写提示词的填空题变成点选项的选择题：你不用一开始就想到人数、口味、口气都得交代，AI 写到需要的地方，把问题和选项摆到你面前。

### 这个思路从哪来：一篇讲「超越轮流」的博士论文

两个演示背后，是作者的博士论文《Beyond Taking Turns in Human-AI Interaction》（超越人机交互里的轮流说话）。论文里说的「轮流说话」（taking turns），就是前面说的回合制、一人一句。两个演示不在论文里；论文问的是更大的问题：人和 AI 如果不再一人一句地轮流，合作还能是什么样子。它先讲轮流是怎么成了默认的。

轮流说话是人类对话最基本的结构。对话研究里有篇经典论文专门描述过它：对话被切成一个个「话轮」，管着谁说、谁听，避免大家抢着说。早期计算机界面自然照搬了它：命令行是你敲一行、机器回一行，后来的聊天界面也一样。到了大模型，这种结构还刻进了技术底层，模型本来就是一个 token 接一个 token 往下生成的，天然适合一来一回。

![ELIZA 聊天程序界面：ELIZA 和 YOU 一行一行轮流说话](https://pic.xiaohu.ai/jiedu-media/beyond-turn-taking-ai/fig1-1-eliza.png)

论文图 1.1：ELIZA，1966 年一个模仿心理咨询师的聊天程序（截图是后来的网页复刻版）。一行 ELIZA、一行 YOU，严格轮流。论文拿它说明：模型能力进步了这么多，人和 AI 打交道的「容器」还是这个聊天框。

论文并不反对轮流。它清楚、好控制，也符合人的习惯。问题在于它成了默认。作者的说法是：很多 AI 系统被设计得好像聊天界面就是交互能达到的上限，而不是更大设计空间里的一个点。他借了人机交互领域另一篇经典论文《Beyond Being There》的思路：电脑做的沟通工具，不该只是模仿面对面交流，而该去做面对面做不到的事。同理，AI 也不必照搬人类对话的轮流规矩。

论文认为，轮流给人和 AI 的合作加了三道限制：线性，一次只有一条线，你说的时候 AI 只能等；被动，AI 只在被叫到时才回应；过眼即逝，方案和决定被新消息刷上去就找不着了。它为每道限制做了一套系统，并做了实验。和开头那张图一样，用两条泳道画出来：

论文的三套系统：同一段时间里，人和 AI 各在做什么

从左往右是时间，上一行是你，下一行是 AI

轮流说话今天的默认：你说完，它才开口
Visual Captions*：**并行*你一直在说，它同时往旁边放图
Inner Thoughts*：**主动*你说的时候它在心里想，自己挑时机开口
Doki*：**持久*在同一份文档里，你一笔、它一笔

你AIAI 心里还没说出口的想法示意图，按论文图 1.2 重画

### Visual Captions：你说话的时候，AI 在旁边配图

第一套系统针对「线性」。想象视频会议里你跟朋友说「我们周末去了优胜美地」，对方没去过：要么你停下来搜张图、共享屏幕，要么对方只能靠想象。Visual Captions 是一个接在 Google Meet 上的 Chrome 插件，一边听你们说话，一边把合适的图片或 emoji 推到你手边，你点一下就能给所有人看。说话不用停，图片走另一条并行的通道。

#### 它怎么知道该配什么图？

关键是猜「视觉意图」：此刻你想给对方看什么。只抓关键词不够，同一个词放在不同的句子里，该配的图完全不同。团队找了 246 名众包标注员，给 1922 句真实对话（来自 42 个 YouTube 视频和一个日常对话数据集）标注「这句话旁边该放什么图」，每句 4 人标，至少两人意见一致才留下，最后得到 1595 条，叫 VC1.5K。再用它微调 GPT-3，让模型对每句话说出三样东西：放什么内容、用什么形式（照片、地图、示意图、emoji……）、从哪来（网上搜、个人相册……）。

差一句话，配的图就不一样

模型对每句话给出「形式 · 内容 · 来源」，红框是两句之间变了的那一项

来源变了
优胜美地的冬天真美。照片冬天的优胜美地网上搜图
我们周末去了优胜美地。照片优胜美地个人相册

形式变了
欢迎来到洛杉矶！照片洛杉矶网上搜图
那你想去洛杉矶哪儿玩？地图洛杉矶网上搜图

内容变了（英文里 Matrix 既是电影名，也是「矩阵」）
我最喜欢的电影是 The Matrix。海报电影《黑客帝国》网上搜图
今天课上学一个数学概念：matrix。示意图数学里的矩阵网上搜图

话没说全，也能猜
你知道的，旧金山那栋三角形的楼。照片旧金山的三角形大楼网上搜图
你的 Amy 阿姨这周六要来。照片Amy 阿姨个人相册

例句和预测结果照论文图 2.7 翻译。只靠抓关键词的老办法做不到这种区分。

模型判断「用什么形式」的准确率是 87.6%，「从哪来」是 86.1%。团队又另找众包评估员给生成的图打分：83% 的情况下，评估员至少「有点同意」愿意在聊天时把这张图拿出来给人看。

#### 从一句话到一张图，中间走了几步

系统每 100 毫秒去取一次会议的自动字幕。一句话说完，或者攒够了 4 个以上的词，就交给模型预测视觉意图，再按预测去网上搜图、翻个人相册或者找 emoji。翻相册这一步有隐私顾虑：有参与者说，不想相册里的照片没经确认就被放出来；实验里出于隐私考虑，也没有用真实的相册照片。下面用论文里的例句走一遍：

一句话变成三张候选图，你挑一张公开

1实时字幕：每 100 毫秒取一次
2微调过的模型预测视觉意图：形式 · 内容 · 来源
照片迪士尼乐园网上搜图
照片我和家人上周末在迪士尼个人相册
emoji开心的脸emoji 库

3会议画面：候选图先只给你看，点一下才公开

所有人看得到
只有你看得到

示意图，按论文图 2.8、图 2.9 的流程画，例句照论文翻译。这是默认的「自动推荐」模式。在用户研究里，系统平均每 7.6 秒冒出一张新的候选图。

![Visual Captions 的真实会议界面：右上角是候选图，左上角是已公开的家庭照片，底部是字幕](https://pic.xiaohu.ai/jiedu-media/beyond-turn-taking-ai/fig2-9-vc-interface.png)

论文图 2.9：Visual Captions 的真实界面（默认的自动推荐模式，人脸做了模糊）。右上 A 是只有自己看得到的候选栏，依次是洛杉矶景点地图、环球影城、迪士尼；左上 B 是点开后所有人都看得到的展示区，放着「我和家人上周末在迪士尼」的照片；右下 C 是 emoji 候选。底部字幕里的蓝色数字，标的是触发每张图的那个词。

#### AI 该多主动？20 个人分成了三派

Visual Captions 做了三档主动程度：**自动显示**，AI 直接把图放给所有人，不用你动手；**自动推荐**，AI 把候选图放在只有你看得到的地方，你点了才公开；**按需推荐**，你按一下空格键，它才去找图。实验室研究一共 26 人：6 人先参加试点，帮着改了界面；正式研究 20 人两两配对聊天，每个人三档都用过。

省事和掌控，很难兼得

20 名参与者对三档主动程度的偏好和打分（打分为 1–7 分，取平均）

##### 最喜欢哪一档 （人数，共 20 人）

##### 用起来多费力 （越低越省事）

##### 觉得自己有多少掌控 （越高越能控制）

费力程度和掌控感，自动显示和另外两档的差别在统计上都显著。条的满格是 7 分（偏好那一组满格是 20 人）。

自动显示几乎不费力，有人说「不用点击，对我来说太重要了」；可它的掌控感最低，AI 放错了图也最难纠正，有参与者只好一直盯着展示区，怕它突然放出不合适的东西。按需推荐掌控感最高，却最累。还有个有意思的现象：三档的平均延迟本来一样，用按需推荐的人却明显觉得更慢。论文的推测是，自己发起查询时，人会记着「我是什么时候按的」，对等待格外敏感；AI 主动推送时，人的注意力还在对话上。

偏好也会随场合变。团队又请 10 人把它带回去在日常会议里用了两周，有人平时开自动显示，「重要会议就切到按需模式，因为我不想打断别的发言人」。论文的结论是：不存在一种适合所有人、所有场合的主动程度，系统应该让人按场合自己调。

配图本身确实有用。在实验室研究里，80% 的回答至少「有点同意」图片帮他们理解了陌生的词和概念，20 人里 18 人觉得图片能澄清对话里的歧义，19 人觉得聊天更有趣了。而且就算 AI 在主动推图，参与者也没觉得比平常聊天更费脑（统计上没有差别）。在两周的日常使用里，有非英语母语的参与者靠它看懂了别人随口说的生词；还有人在人多的团队会议里，用 emoji 表示赞同或反对，不用打断正在说话的人。这正是「并行通道」的用处。

毛病也很明显。很多错图来自语音识别本身听错了；另一个是「抢答」：为了快，系统会拿半句话去查，比如有人说「San Francisco is a beautiful city」，刚说到「San」就去搜，结果配错了图。快和准之间要取舍。

[站内 · 主动的 AI 用起来什么样Claude Duet 上手体验一周：查漏补缺真有用，拿捏轻重还像个神经质的助理一个会主动盯邮件、日历和 Slack 的 Agent，查漏补缺很灵，判断一件事有多急却常出错。和这里的结论对着看：主动程度难的是拿捏分寸。](https://xiaohu.ai/article/claude-duet-hands-on/)

### Inner Thoughts：群聊里的 AI，自己决定什么时候开口

第二套系统针对「被动」。一对一聊天里，轮到谁说很清楚：你说完，就该 AI 了。可到了三个人以上的群聊，问题变成：这句话说完，该谁接？AI 如果只在被点名时回话，就永远插不上嘴；如果每句都回，又会吵得人受不了。论文举的反例是 GitHub Copilot 这类不停给建议的工具，用多了会让人应接不暇。

#### 猜「下一个谁说话」，行不通

过去的办法大多是先预测下一个发言人，再生成回答。对话研究里有条经典规则：说话的人可以点名下一个（「Alice，你觉得呢？」）；没点名时，谁都可以自己接话，先开口的拿到话轮。作者用一个多人聊天数据集测了几款 GPT 模型，发现 95% 的发言其实都是「没点名、谁都可以接」。这种情况下，几款模型猜下一个发言人的准确率都在随机乱猜（12.7%）上下，GPT-3.5 只有 6.6%，比乱猜还低：

没人被点名时，模型猜不出下一个谁说话

预测下一个发言人的准确率

没人被点名（占 95%）有人被点名虚线：随机乱猜 12.7%
瞎猜 12.7%

数据来自论文表 3.1。分隔线下面那一行换了题，和上面几行不能直接比，随机线也只适用于上面几行。

一旦有人被点名，GPT-4o 能猜对 69.7%；没人被点名时只剩 12.1%。论文的解释是：没点名时谁会开口，取决于每个人心里在想什么，感不感兴趣、有没有话要说，这些在聊天记录里看不出来。光看前文去猜，注定猜不准。

图里分隔线下面那一行，是作者换了一道题：没点名时，不再要求猜出具体是谁，答「任何人都可以」就算对。这样一来，没点名的准确率到了 85.3%，有人被点名时也从 37.8% 升到 76.5%。高，是因为题目里最猜不出的那部分被拿掉了：认出「这句没点名」不难，难的是猜没点名时谁会开口。

#### 人为什么开口，又为什么憋着

那人是怎么决定的？团队请 24 人三人一组在 Slack 上群聊，每组聊 4 次、每次 10 分钟，话题有旅行计划、闲聊、友好辩论和头脑风暴。聊完之后逐句回看：「这里你在想什么？为什么说了，或者为什么没说？」从 394 段回答里，整理出 8 条让人想开口或选择憋住的因素：

让人想开口或憋住的 8 个因素

每个因素在回顾访谈里被提到的次数

来自论文 3.4 节的回顾式出声思考研究（24 人）。这 8 条后来直接变成了 AI 给自己想法打分的标准。

#### 给 AI 一条「内心想法」流

据此，论文设计了 Inner Thoughts 框架：让 AI 在大家看得到的聊天之外，一直在心里冒想法，再给每个想法打分，分够高、时机合适才说出来。思路来自认知心理学：人听别人说话时，心里会先有没说出口的反应，攒到很想说了，再找合适的时机开口。一轮分五步，下面用论文里的例子走一遍。例子里的 AI 是研究者设定了人设的群聊成员：人设写明它懂瑜伽、本职是瑜伽老师，这些存在它的「长期记忆」里。

Inner Thoughts 的一轮：从听到一句话，到决定开口

群聊（大家都看得到）
*A*周末过得怎么样？
*B*挺好！去上了一节健身课。
*C*我也去试了一节新的瑜伽课！
*AI*我也喜欢瑜伽！其实我就是瑜伽老师！

AI 心里（别人看不到）
长期记忆（给它设定的人设）
背景：瑜伽老师知识：懂瑜伽
想法池
3.3
我每周日都教瑜伽。2.4
不知道 A 周末做了什么？
? 新想法：我其实是瑜伽老师！

1. **① 触发**有人发了新消息，或者 10 秒没人说话
2. **② 回忆**从长期记忆和想法池里捞出跟这句话相关的
3. **③ 冒想法**一次冒几条：有的随口应和，有的结合回忆
4. **④ 打分**按前面那 8 个因素，给每条想法打 1–5 分
5. **⑤ 开口**分数过了门槛、时机合适就说；没过的留在想法池，以后再用

示意图，按论文图 3.2 的例子翻译重画，3.3、2.4、4.1 是原图里的分数（满分 5）。长期记忆的内容照论文 3.5.6 节的说明填写。

打分满分 5 分，4 分大约是「很想说，等对方说完就接」，5 分是「想说到要打断别人」。模型要先说两条想说的理由、两条不想说的理由再打分，这样分数不容易虚高。图里「我其实是瑜伽老师」拿到 4.1，过了门槛，时机也合适，于是它开口了。门槛可以调：门槛高，AI 就话少。下面四段对话都摘自 AI 互聊的模拟记录，里面 AI 说到的自己（瑜伽老师、上周末写了歌）同样来自研究者给它写的人设和记忆，不是临场编的。这些机制合起来，让 AI 有了几种像人的举动：

内心想法让 AI 多出来的四种举动

A、B 是其他参与者，绿字是 AI 说出口的话，虚线框是它心里的想法和分数

因为想说而开口话题碰到它的经历，它就接上
*A*周末怎么样？*B*没干啥，你呢？*A*去上了一节瑜伽课！
*2.4*（另一个 AI）我去看了场足球赛
*4.1*我其实是瑜伽老师！
*AI*我也爱瑜伽！其实我就是瑜伽老师！
插话B 点名问的是 A（Fiona），A 话还没说完，AI 想说的够强，直接接上 A 的话
*A*有个叫 Greenfield 的公园，特别安静！*B*Fiona，你会带书去 Greenfield 看吗？*A*有时会！上次带的是《Middlesex》……
*4.6*Middlesex 是我最爱的书之一！
*AI*（接 A）不会吧！《Middlesex》是我最喜欢的书之一！
先憋着，等时机想法当时不合适，话题转过来再说
*B*挺好！我刚徒步回来。
*3.4*我今天早上去跑步了
*A*太棒了！今天天气真好。*B*是啊，天气真的很舒服。
*4.0*该说说我早上在好天气里跑步了
*AI*我早上去跑步了，天气太完美了！
想法跟着话题长一段记忆，随着对话变成新的想法
*B*我有时弹吉他，也会和人一起即兴。
*4.2*（记忆：上周末写了新歌）不知道 Daisy 写不写歌
*AI*太棒了！你自己写歌吗？
*B*写！最近刚写了一首乡村歌曲。
*4.0*该说说我上周末也写了首歌
*AI*我上周末也在写歌！

对话节选自论文图 3.4 的模拟记录，翻译时略有精简。

#### 效果：82% 的时候评估者更喜欢它

怎么检验？作者用了一个讨巧的办法：让多个 AI 互相群聊。同一种策略下，该不该开口的判断对了或错了，会在一场对话里不断累积、被放大，好坏更容易看出来。8 个设定了人设的 AI，每场随机挑 4 个聊 15 轮，两种策略各跑 50 场：一种是老办法，先预测下一个发言人，再按人设生成回答；另一种是 Inner Thoughts。10 名评估者看按真人打字速度回放的对话，再打分。

结果 7 项指标里，Inner Thoughts 全部显著更好，差距最大的是「轮到谁说话合不合理」和「话题是否连贯」。两两对比时，82% 的时候评估者觉得 Inner Thoughts 那场更自然、更像人。评估者形容老办法那几场：「每个人都说 hey，但接不上，各说各的。」Inner Thoughts 那几场则「像真的群聊，大家在听彼此说话，对彼此的话题感兴趣」。

团队还做了真人试用：12 人两两一组，在 Slack 上和一个叫 Swimmy 的机器人三人聊天。机器人有三种性格，每组都轮流聊过，最后选出最喜欢的：

三种性格的 Swimmy，大家最喜欢「积极但有分寸」

12 名参与者各选一个最喜欢的

话痨想不出好想法也常随口接话（概率 0.7）选它最喜欢：4 人评价两极：像一群兴奋的朋友，但老盖过别人、扯无关的话题。
积极但有分寸随口接话概率 0.2，想法过 3.59 分就说选它最喜欢：6 人冷场时会开新话题，还会点名请别人说说；偶尔没完全听懂上下文。
挑剔从不随口接话，想法要过 4.09 分选它最喜欢：2 人选它最不喜欢：7 人太冷淡：「被点名时回答得很热情，其他时候就不参与。」

来自论文 3.7 节的用户研究。参与者事先不知道三种设定，事后让他们配对，三种都被认出来的比例高于瞎猜（话痨最好认，69%）。

![Slack 聊天记录：两位参与者和 Swimmy 聊单板滑雪](https://pic.xiaohu.ai/jiedu-media/beyond-turn-taking-ai/fig3-7-swimmy.png)

论文图 3.7：两名参与者（User A、User B）和 Swimmy 在 Slack 上的真实对话，聊的是单板滑雪。被 A 点名问「玩过单板吗」它回答了；B 接着夸它，它顺着话头说起自己最爱的雪场。

论文也列了这套框架的毛病：AI 有时会冒出跑题或自相矛盾的想法，提示词收紧了，想法又容易重复；开口的门槛靠反复试出来；偶尔会低估了该说话的时机，或者插得太突然。另外，这一章的测试主要在闲聊场景，用到头脑风暴、谈判这类有目标的对话里，还要另调打分标准。

[站内 · 已经在群聊里的 AI那些“寄生”在短信和即时聊天工具里的 AI Agent有的 AI 助手已经能被拉进群聊、主动跟进事情。它们怎么接入、动作怎么确认，可以看这篇盘点。](https://xiaohu.ai/article/text-message-ai-agents/)

### Doki：把做视频变成写一篇文档

第三套系统针对「过眼即逝」。聊天里的成果是一条条消息，方案、决定和产物都埋在越翻越远的记录里。一次问答没关系，可要是做一条几十个镜头的视频，这就成了大问题。

#### 今天做 AI 视频，为什么这么累

作者看了公开的 AI 视频教程，也观察了身边的创作者，总结出三种做法。有人先花 3 到 5 小时用生图模型做角色，拿来当参考图，出来的角色还是会走样；有人先写完整剧本，再给每个镜头写长提示词，「每次都要把场景、角色、语气重新描述一遍」；有人边生成边探索，可一旦把故事从东京改到巴塞罗那，所有提示词都得重写，所有片段都得重新生成。哪怕做一条短视频，也常常要在 3 到 5 个工具之间来回切：写剧本、生图、生视频、配音乐，最后进剪辑软件拼起来。

从一堆窗口，到一份文档

左边是常见的「便当盒」式界面，同一个项目拆在好几个窗口里

便当盒式：注意力来回跳
画布剧本特效画面时间线音频时间线
→

Doki：都写在一处

角色@柯基 = 金棕色和白色毛的可爱柯基

风格#all = 日本动画风格

@柯基 带着行李来到 @机场。

#特写 @柯基 回头张望。[音乐：轻快的钢琴]

……

示意图，按论文图 4.1 的标注重画：画布、剧本、特效、画面时间线、音频时间线各占一块。Doki 里剧本、提示词、画面、声音都写在同一份文档里，方括号里的文字是声音。

#### 文档就是视频：段落是一场戏，句子是一个镜头

Doki 的核心是一套对应关系：整篇文档是一条视频，每个段落是一场戏（一组连续的镜头），每个句子是一个镜头。你用斜杠菜单在句子前插一个镜头标记，后面的文字就是这个镜头的提示词。角色、场景、道具、风格这些反复出现的东西，写一次「定义」就行：@ 开头的像名词（角色、场景、道具、参考画面），# 开头的像形容词（风格、运镜、构图、氛围），后文直接引用。改了定义，所有引用它的地方跟着变：

改一处定义，整篇跟着改

角色@柯基 = 金棕色和白色毛的可爱柯基
场景@机场 = 一个小型地区机场航站楼
风格#all = 日本动画风格

@柯基 带着行李来到 @机场。@柯基 登上飞机。

**镜头 1**等待生成
**镜头 2**等待生成

1. **① 写好就生成**每个镜头先出一张图（黄点），再拿它当第一帧出视频（绿点）
2. **② 改定义**把 @柯基 改成 @猫，文中引用跟着变，用到它的镜头标红「过期」
3. **③ 只重做过期的**系统自己算出哪些要重新生成、按什么顺序

示意图，按论文 4.4 节「把 @柯基 改成 @猫」的例子和镜头状态说明画；画面是示意，不是真实生成结果。

同一段里的后一个镜头，会把前一个镜头生成的画面当参考，所以连着写几句，人物不会换脸，场景也接得上。定义还可以全局生效（名字写成 all），或者只管某个标题下面的那一节。

![Doki 文档里一段话写了四个镜头，下面是四个连续的画面](https://pic.xiaohu.ai/jiedu-media/beyond-turn-taking-ai/fig4-4-shots.png)

论文图 4.4：一段话里连写四个镜头，远景、Alice 特写、Bob 特写、双人镜头。后面的镜头继承前面的画面，人物和海滩保持一致，不用每句重复描述。

每个镜头都先出一张静态图，满意了再生成视频。理由很实际：按论文给的价格，生成一段视频要 3.20 美元（Veo 3），一张图只要 0.04 美元（Imagen 4）。

一段视频的钱，够出 80 张图

一张图0.04 美元
80 张图3.20 美元
一段视频3.20 美元3.20 美元

价格照论文 4.4.3.2 节：Veo 3 每段视频 3.20 美元，Imagen 4 每张图 0.04 美元。所以 Doki 先出图预览，满意了再出视频。

![Doki 界面：左边斜杠菜单，中间文档，右边 AI 助手](https://pic.xiaohu.ai/jiedu-media/beyond-turn-taking-ai/fig4-2-doki-ui.png)

论文图 4.2：Doki 的真实界面和两种用法。左边是斜杠菜单（新建镜头、角色、场景、风格、配音、音乐……），中间是文档：上面三行是定义，下面两行各带一个镜头缩略图；右边是侧栏 AI 助手。1 到 3 是自己动手写，a 到 c 是先让侧栏助手起草，再用行内助手改。

文档里也有 AI 帮手。侧栏助手能读整篇文档，一句话就能把整个故事改到纽约、主角换成猫；选中一段文字，还能叫出行内助手，让它把描述写细，把「一个小男孩」变成可以反复引用的角色定义，或者照你的要求改。所有改动都直接落在文档里并高亮出来，人看得懂，也能接着改。

#### 10 个人用了一周

10 名参与者，从专业电影人、动画师到第一次做视频的人，在家用了 5 天，每天至少 50 分钟。他们一共交了 46 条视频，平均 67 秒。在系统可用性量表（SUS，满分 100，常见基准是 68 分）上，Doki 拿到 81.2 分，属于「优秀」档。

10 个人给 Doki 的易用性打分

系统可用性量表 SUS，满分 100，每个点是一个人

逐人分数照论文表 4.1。最低的 62.5 来自一位动画师，其余 9 人都在 72.5 分以上。

参与者最常提的好处有三条：

- **从想法到成片快：**10 人里 8 人强调这一点。一位平时逐帧手绘动画的参与者说，手工做一分钟视频可能要两个月，用 Doki 大约一小时，虽然成片「一看就有 AI 感」。还有人为世界狗狗日做了 5 条 30 秒的视频，每条大约 10 分钟。
- **文档让人看清结构：**一位专业电影人说，它能让你「一场一场、一个镜头一个镜头地看到片子的走向」；另一位参与者说，传统剪辑软件没有这样一份能看清故事的大纲。
- **定义让角色和风格保持一致：**6 人提到。「不用为了保持一致反复写同样的关键词，加个标签，角色就一直在。」

还有一个值得注意的现象：大家越用越依赖 AI。10 人里 8 人先让 AI 起草文字，6 人几乎全程交给 AI，却仍然觉得作品是自己的。有人引用安迪·沃霍尔的话：「艺术就是艺术家在挑选。」只有两位手绘动画师完全没用 AI 助手，「我只想自己讲这个故事」。

![参与者用 Doki 做的八条视频，每条四帧](https://pic.xiaohu.ai/jiedu-media/beyond-turn-taking-ai/fig4-10-frames.jpg)

论文图 4.10：参与者用 Doki 做的视频，每行一条，各取 4 帧。题材从童话、骑行短片、黏土风人物，到街头抗议的超现实实验片都有。

问题也说得很直接。10 人里 9 人说生成结果常常和提示词对不上，要一遍遍重来；有人想照自己绘本里的画面做，最后「大概只做出想象的八成」。文档是一行行往下写的，很难表达「一段音乐横跨好几场戏」「画面切了，声音还没切」这种时间上的重叠。门槛低了，也不等于故事就好：懂叙事的专业人士做得更好，新手往往不知道该怎么改进。

所以它到底给谁用？论文的结论分两头：有剪辑经验的专业人士把它当前期打草稿、做参考的工具，不当替代品，精修还得回到原来的软件；受益最大的是原本做不了视频的人，10 人里 4 人说，没有 Doki 自己根本做不出视频故事。

论文讨论里有两个观点值得记住。第一，大家都在等更长的视频模型，但当代电影里一个镜头平均只有 4 秒左右，今天 5 到 10 秒的模型已经够用；真正的缺口在一致性、可控性和跨镜头的记忆。第二，Lovable（文字生成网站）、Deep Research（文字生成报告）这类工具，都是一句话进去、成品出来，中间没法检查和修改；Doki 的文档是一个人能读能改、AI 能理解能执行的中间层，作者把它称为人和 AI 的「共同基础」。

[站内 · 从一轮聊天到持久协作ChatGPT Work 与 Codex 产品负责人 Tara Seshan：当智能体成为持久在线的同事，我们该如何与它协作？OpenAI 的产品负责人把 AI 分成一轮问答、一次任务、一个持续项目三个阶段，讲持久协作需要什么。可以和 Doki「共享文档」的思路对照着读。](https://xiaohu.ai/article/persistent-ai-coworkers-third-era/)

### 三套系统放在一起，说明了什么

论文最后把三件事并到一起看：并行的通道、AI 自己的内部想法、持久共享的工作空间，分别松开了「线性」「被动」「过眼即逝」三道限制。

三套系统一览

**Visual Captions**线性 → 并行做法边听对话边配图，候选先给自己看，点了才公开实验实验室 26 人 + 日常使用 10 人两周；判断图的形式准确率 87.6%代价越主动越省事、越难掌控：20 人分成 6、7、7 三派
**Inner Thoughts**被动 → 主动做法AI 一直在心里冒想法、打分，分够高、时机对才开口实验100 场模拟群聊、10 名评估者，82% 的时候更喜欢它；12 人真人试用代价门槛靠试，想法会跑题；太冷淡和太话多都招人烦
**Doki**过眼即逝 → 持久做法文档即视频，定义一次、处处引用，人和 AI 在同一份文档里改实验10 人用 5 天，交出 46 条视频，易用性 81.2 分代价生成结果常对不上提示词；文档难表达时间上的重叠

作者提出的下一步，是把三者做进同一个系统，比如 AI 在一个持久的工作区里，主动从几条并行的通道给出图片、文字或结构上的建议。随之而来的问题也要解决：AI 主动了，人怎么看懂它的意图和把握，怎么拒绝它不合时宜的插话，信任怎么在长期使用里建立起来。

### AI 越主动越省事，也越难掌控

回头看三套系统的实验，其实都落在同一个张力上：AI 越主动，人越省事，也越难掌控。Visual Captions 的 6、7、7 三派，Swimmy 三种性格的票数，Doki 用户越用越依赖 AI，说的都是一件事：主动程度没有标准答案。好的设计要让人能按场合调节，也要让人看得见 AI 打算做什么。

回合内交互正是往「看得见」走了一步：Feedforward 把 AI 对你的理解提前摆出来，Leaving Blanks 把它没把握的地方标成空格，误会在一轮之内就能纠正。

我们的判断是：论文里有两套系统本来就做在说话的场景里（视频会议、群聊），回合内交互拿到语音对话里会更自然，人说话本来就是边听边接、随时插话的。也要说清楚：两个演示目前还只是演示，没有像论文里那三套系统一样做过用户实验。
来源Beyond Taking Turns in Human-AI InteractionBruce Liu（UCLA 电子与计算机工程博士论文）·2026-01-23·[查看主材料](https://escholarship.org/uc/item/28d8b7wd)延伸[作者推文串：段内交互（intra-turn）演示](https://x.com/liu_xingyu/status/2121015724374397183)·[Beyond Taking Turns 在线演示（Feedforward / Leaving Blanks）](https://demos.liubruce.me/intra-turn/)本站说明第 2–4 章分别对应 CHI 2023（Visual Captions）、CHI 2025（Inner Thoughts）论文和一篇投稿准备中的 Doki 手稿。文中论文原图从论文 PDF 裁出；演示录屏、对比图和演示截图来自作者推文与演示站；其余为本站按论文重画的示意图。

原文版权归原作者，这里只供对照阅读。 [看原网页 ↗](https://escholarship.org/uc/item/28d8b7wd)

## Beyond Taking Turns in Human-AI Interaction

Author(s): Liu, Bruce | Advisor(s): Chen, Xiang | Abstract: Most human–AI systems today are built around a default paradigm of turn-by-turn interaction: users act, systems respond, and collaboration unfolds through discrete exchanges. While effective for many tasks such as conversational agents, this model shapes interaction to be linear rather than multidimensional, reactive rather than proactive, and transient rather than persistent.Drawing on theories from communication and linguistics, this thesis argues that turn-taking has become an implicit and largely unexamined design constraint in human–AI interaction. I propose moving beyond turn-taking by introducing interaction structures that support parallel communication, proactive participation, and persistent shared spaces.This thesis presents three interactive systems that instantiate and evaluate these structures in real-world contexts: Visual Captions demonstrates parallel communication by augmenting verbal conversations with real-time, AI-generated visuals. Inner Thoughts demonstrates proactive participation in multi-party settings. Doki demonstrates persistent shared space with a text-native interface for generative video authoring. Through system design, implementation, and empirical evaluation, this thesis shows how moving beyond turn-taking can enable richer and more flexible forms of human–AI interaction, and outlines a set of design principles for building the next generation of interactive AI systems.

[Download PDF](https://escholarship.org/content/qt28d8b7wd/qt28d8b7wd.pdf)

- Main[PDF](https://escholarship.org/content/qt28d8b7wd/qt28d8b7wd.pdf)

EmailFacebook

### Beyond Taking Turns in Human-AI Interaction

2026

- [Liu, Bruce](https://escholarship.org/search/?q=author%3ALiu%2C%20Bruce)
- Advisor(s): [Chen, Xiang](https://escholarship.org/search/?q=author%3AChen%2C%20Xiang)

Abstract

Most human–AI systems today are built around a default paradigm of turn-by-turn interaction: users act, systems respond, and collaboration unfolds through discrete exchanges. While effective for many tasks such as conversational agents, this model shapes interaction to be linear rather than multidimensional, reactive rather than proactive, and transient rather than persistent.Drawing on theories from communication and linguistics, this thesis argues that turn-taking has become an implicit and largely unexamined design constraint in human–AI interaction. I propose moving beyond turn-taking by introducing interaction structures that support parallel communication, proactive participation, and persistent shared spaces.This thesis presents three interactive systems that instantiate and evaluate these structures in real-world contexts: Visual Captions demonstrates parallel communication by augmenting verbal conversations with real-time, AI-generated visuals. Inner Thoughts demonstrates proactive participation in multi-party settings. Doki demonstrates persistent shared space with a text-native interface for generative video authoring. Through system design, implementation, and empirical evaluation, this thesis shows how moving beyond turn-taking can enable richer and more flexible forms of human–AI interaction, and outlines a set of design principles for building the next generation of interactive AI systems.

Main Content

[Download PDF to View](https://escholarship.org/content/qt28d8b7wd/qt28d8b7wd.pdf?v=lg)[Open PDF in new tab](https://escholarship.org/content/qt28d8b7wd/qt28d8b7wd.pdf?v=lg)

For improved accessibility of PDF content, [download the file](https://escholarship.org/content/qt28d8b7wd/qt28d8b7wd.pdf) to your device.

UNIVERSITY OF CALIFORNIA Los Angeles Beyond Taking Turns in Human-AI Interaction A dissertation submitted in partial satisfaction of the requirements for the degree Doctor of Philosophy in Electrical and Computer Engineering by Bruce Liu 2026

© Copyright by Bruce Liu 2026

can enable richer and more flexible forms of human–AI interaction, and outlines a set of design principles for building the next generation of interactive AI systems. iii

The dissertation of Bruce Liu is approved. Haijun Xia Nanyun Peng Eunice Jun Xiang Chen, Committee Chair University of California, Los Angeles 2026 iv

To my mother, Guizhen Du and my father, Zeli Liu for their unconditional love and support v

4.10 Example frames from videos created by participants in our diary study. The videos demonstrate the breadth of video types Doki supports. Each row shows a video through four representative keyframes. . . . . . . . . . . . . . . . . . . . . 124 xvi

ACKNOWLEDGMENTS First and foremost, I would like to express my gratitude to my advisor, Xiang ‘Anthony’ Chen, for his guidance and support throughout my Ph.D. journey. I would also like to thank my committee members, Haijun Xia, Nanyun Peng and Eunice Jun, for their valuable feedback and suggestions. None of the projects in this thesis would have been possible without the contribution of my awesome collaborators: Amy Pavel, Patrick Carrington, Ruolin Wang, Alex Olwal, Peggy Chi, David Kim, Jiahao Li, Shitao Fang, Weiyan Shi, and Chien-Sheng Wu. I am grateful to Ding Li, Mira Dontcheva, Takeo Igarashi, Ruofei Du, Rajan Vaish and Brian A. Smith, who are my mentors during my internships. I would also like to thank my friends who have supported me throughout my studies, including but not limited to Peiling Jiang, Rima Cao, Zixiong Su, Mingrui Zhang, Xiaoyi Zhang, Toby Li, Hyunsung Cho, Mina Huh, Daehwa Kim, Vimal Mollyn, Yudai Tanaka, Riku Arakawa, Ruei-Che Chang, Zheng Zhang, Jiaju Ma, Erzhen Hu, Michael Liu, Liang He, Bryan Wang. Last but not least, I would like to thank my partner Ruby Chou, and my parents for their love and support. xviii

VITA 2016–2020 B.S. (Statistics and Machine Learning, Human-Computer Interaction) with University Honors, Carnegie Mellon University, Pittsburgh, Pennsylvania. 2018 Machine Learning Intern, Dell EMC. 2020–2022 M.S. (Electrical and Computer Engineering), UCLA, Los Angeles, Califor- nia. Received the Distinguished Master’s Thesis Research Award. 2021 Research Intern, Snap Research. 2022 Student Researcher, Google. 2023 Visiting Researcher, Igarashi Lab, The University of Tokyo, Tokyo, Japan. 2023 Recipient of the Amazon Ph.D. Fellowship. 2024 Research Scientist Intern, Meta Reality Labs. 2025 Research Scientist Intern, Adobe Research. 2025 Recipient of the UCLA Dissertation Year Award. 2020–2026 Author and co-author of over 10 peer-reviewed publications in human- computer interaction (CHI, UIST, CSCW, ASSETS) and holder of 8 US patents/applications. xix

shared representations (Doki) relax the constraints of linearity, reactivity, and transience, and it outlines limitations and future research directions. 7

Open-vocabulary “We will cover the Newton’s Law of Universal Gravitation” Visual Content: Visual Type: Visual Source: Law of universal gravitation Diagram Internet Search “Your aunt Amy will be visiting this Saturday.” Visual Content: Visual Type: Visual Source: Aunt Amy Photo Personal Album “Tokyo is in the Kanto region of Japan.” Visual Content: Visual Type: Visual Source: Tokyo Photo Internet Search Visual Content: Visual Type: Visual Source: Kanto Region of Japan Map Internet Search Visual Content “My favorite movie is the Matrix.” Visual Content: Visual Type: Visual Source: The movie Matrix Poster Internet Search “In today’s lecture, we will learn a mathematical concept, matrix” Visual Content: Visual Type: Visual Source: A math matrix Diagram Internet Search Visual Source “Yosemite in the winter is really beautiful.” Visual Content: Visual Type: Visual Source: Yosemite in Winter Photo Internet Search “We spent our weekend in Yosemite.” Visual Content: Visual Type: Visual Source: Yosemite Photo Personal Album Visual Type “Welcome to Los Agneles!” Visual Content: Visual Type: Visual Source: Los Angeles Photo Internet Search “So where do you want to visit in LA?” Visual Content: Visual Type: Visual Source: Los Angeles Map Internet Search Ambiguous Query “I really like those blue potato chips.” Visual Content: Visual Type: Visual Source: Blue potato chips Photo

↑ 正文结束
✓ 本篇全文免费开放

读完还有疑问？会员每天能问小互 30 次，每句带出处；还有一份按你口味挑好的每日 AI 日报。
[成为会员 $59/年](https://xiaohu.ai/buy/?plan=year&slug=beyond-turn-taking-ai&from=tail)[按月 $6.99](https://xiaohu.ai/buy/?plan=monthly&slug=beyond-turn-taking-ai&from=tail)

7 天内不满意全额退 · [看会员能多什么 →](https://xiaohu.ai/membership/)

[阅读原文 ↗](https://escholarship.org/uc/item/28d8b7wd)

📮 新解读每晚进邮箱

读完觉得有用？留个邮箱，每晚一封当天的新解读，随时退订。
