---
title: "Claude Code 工程师 Addy Osmani：像带你的开发团队一样管理你的 Agent 一份五行任务说明和九条管法"
date: 2026-11-09T00:00:00.000Z
tags: ["深度", "Agent", "Claude Code", "AI 编程", "团队管理", "聚合"]
summary: "Claude Code 团队的 Addy Osmani 把好经理带团队的十条做法，一条条对到用 Agent 写代码上：怎么交代、怎么验收、怎么放手，以及这个比喻在哪里不成立。"
---
> **原文链接**: [https://x.com/addyosmani/status/2119332146485891501](https://x.com/addyosmani/status/2119332146485891501)
> **来源**: x.com
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/coding-agents-made-you-a-manager/) · 2026/11/9
> **说明**: 本文由 AIHot汪 自动聚合(原文即中文,未翻译)。正文取自小互 AI 解读

---

全文 Markdown · 会员

作者：Addy Osmani11-09 · 约 12 分钟⚑ 大佬观点 · 个人立场🎧 听播客版0:00 / --:--

[视频/音频](https://xiaohu.ai/media/coding-agents-made-you-a-manager/podcast.zh-4f2ee5ae28d3.mp3)
0:00 / --:--![](https://pic.xiaohu.ai/jiedu-media/coding-agents-made-you-a-manager/social/zh-eebc3db01f5b.png)

一张便利贴的交接，问题全留在脑子里

**把仪表盘弄快点**—— 就这一句

- 快到多少算快？
- 为谁快？
- 数据库能动吗？
- 拿什么交差？

**Agent**：收到，马上开干。

一句话交代完就走，问题全留在你脑子里。Agent 不会追问，接了就干。

用 Agent 写代码，很多人都碰到过这种事：你交代一句「把仪表盘弄快点」，它马上开干，交回来的东西看着是做完了，一跑才发现不对。你指出问题，它改，改完又歪到别处。同一件事，今天纠正一遍，明天开个新会话还得再纠正一遍。Agent 开得越多，你越像个跟在后面验收的人。

Claude Code 团队的工程师 Addy Osmani 最近写了一篇长文，专门讲怎么走出这种状态。他自己多数时候同时开着四五个 Agent。办法说起来很简单：把好经理带团队的那一套，搬到 Agent 身上。

交代清楚它在代码里看不到的背景；给它一个能自己判断过没过的检查；同一件事纠正过两次，就写下来；活可以交出去，拍板的事留给自己。他一共整理了十条，越靠前越管用。

### 为什么说用 Agent 就是在当经理？

**你一整天做的，正是经理那几件事。**

回想一下你用 Agent 的一天：挑一件活，写说明，交给它，过一会儿去看进度，检查它交回来的东西，最后决定哪些留、哪些上线。一遍遍地转。这就是下面这张图的外圈。

你转外圈，Agent 转内圈

你Agent检查过关

**给它一个检查办法，内圈它自己就能转到过关。**你的力气留在外圈：交代什么、读多少、留什么证据、什么必须你签字。

按原文开头的六个动作和「内圈 / 外圈」一段画成，示意图。

Addy 说的「管」，指的是一件具体的事：**帮别人把活干好，由此做出好结果**。他不是劝你去当那种日程表排满、整天泡在会里的经理。很多他佩服的工程师，正是看到朋友当了经理就「消失」在会议里，才选择一直做一线工程师（不带人、自己干活的工程师）。他也明确说了，Agent 不能替代经理，也不能替代同事。

The engineers who get the most out of agents aren't necessarily the ones who are best at prompt engineering. They're the ones who learned how to manage, intentionally or otherwise.把 Agent 用得最好的工程师，不一定是最会写提示词的人，而是学会了怎么管的人，不管是有意学的还是不知不觉学会的。

Addy 有个说法：你对坏老板的每一句吐槽，都是一份用 Agent 时的 bug 报告。对一线工程师来说，这其实是个好消息。你接了这么多年的活，挨过含糊的需求、缺背景的交接、中途改口的期望，所以你其实知道一次好的交接长什么样。现在轮到你来交接了。开头那个仪表盘的例子，就改编自 Addy 文中的示例，后面会把它改成一份完整的任务说明。

这些经验一半来自好经理带团队的做法，一半来自 Anthropic 自己用 Claude Code、做 Claude Code 攒下的教训。

### 最该先做的：让它能自己验收，拿证据来交差

**给它一个能跑出「过 / 不过」的检查办法，让它把结果拿给你看；别把「看着做完了」当成做完了。**

问一个老练的经理：你不可能每行代码都看，怎么确定团队干得好？他会告诉你：靠护栏，比如每次提交自动跑检查、代码审查、监控面板、轮流值班。没搭护栏的新经理只能什么都自己验，用不了一个季度，他自己就成了整个团队最堵的那个口子。

Agent 一样。它会在活「看起来做完了」的时候停下。如果没有任何检查，「看起来做完了」就是它唯一的标准，验收的活全落回你头上，**你变成了它的测试**。

有了检查办法就不一样了：它写完自己跑检查，看到哪里没过，自己改，再跑，直到过关。这就是图里的内圈。改界面的活，可以让它真的在浏览器里打开页面，一遍遍改到能用、好看为止。

检查办法几乎什么都行，只要能给出明确的「过」或「不过」。写代码时常用的有：测试（一套自动检查代码对不对的程序）；能不能顺利打包成可运行的程序；写法合不合团队的规范；把结果和标准答案逐行比对；截一张图看页面长什么样。Claude Code 的官方最佳实践指南说，**跑这些检查的那条命令，是 CLAUDE.md 里最有用的一行**。CLAUDE.md 就是 Agent 每次开工先读的那份说明文件。

有了检查办法，接进日常有四种做法：

- **直接要求**：交活时说一句「改完跑一遍登录相关的测试，没过就接着改，直到全过」。
- **设一个目标**：给它定一个完成条件。每干完一轮，由另外一个模型来判断条件达到没有，而不是让干活的模型自己说「好了」。长时间在后台跑的活最用得上。
- **强制**：设一个它想收工时必定先跑的自动检查。比如代码里有数据类型对不上的错误，这一轮就不许结束。
- **送审**：把改动交给一个新开的子 Agent 审。它没看过你们的对话，就像写代码的人不给自己批改动。

交活时贴在任务末尾

```
改完之后跑一遍相关的测试，没全过就接着改，直到全部通过。最后把测试结果原样贴给我，作为做完的证据。
```

送审时可以限定范围。叫它「找问题」，它总能找出点什么；叫它「只找会出错的地方，风格别管」，它就照做。好经理找人要反馈，也是这么问的。

请人审改动时这样限定

```
帮我审这次改动：只找会导致功能出错的问题，代码风格、命名习惯都不用管。每个问题写清在哪一行、为什么会错。
```

Claude Code 里的 skill（打包好的一套做法）、钩子（到点必定执行的自动程序，不由模型决定）、子 Agent（另派出去干一小块活的帮手）、MCP（把外部工具接给它的通道），大多是为这件事准备的：让它干完马上能验，验不过马上能改。你只用操心它自己验不了的那部分。

**不写代码，检查办法怎么给？**Addy 讲的是写代码，道理可以照搬：交活时就写清能逐条核对的标准，让它做完先自己对一遍，再拿结果给你。比如写文案，给出字数上限、必须讲到的三个点、不许用的词；做表格，让它把合计和原始数据核对一遍，列出对不上的地方。

### 只交代它读不到的东西

**说清楚代码里看不出来的东西：目标、为什么、约束、哪些不做、怎样算成功。**

好经理讲清楚要什么结果、有哪些限制，至于怎么做，交给干活的人自己想。军队里叫「指挥官意图」，Netflix 叫「给背景，不控制」。

难点在于，你很难知道 Agent 缺哪些背景。它接到任何任务，第一件事都是读你的代码。目录怎么分、命名有什么习惯、测试怎么搭，现在的模型摸清这些，比你讲给它听快得多。

所以动笔前先想一想：**它读代码就能知道、而且真的会去读的，就别写**。把字花在仓库外面的东西上。

字该花在哪：水面下的那部分

露在水面上：代码仓库里

- 目录怎么分
- 命名习惯
- 测试怎么搭

Agent 开工先读这些，不用写

沉在水面下：只在你脑子里

- 会上定下的事
- 同事的上线流程
- 为什么要做这件事
- 这次怎样算完成

只有你知道，要写进说明

两边的例子都来自原文。

常见的错法有两种：一种是丢一句话就走，真正的期待全在你脑子里；另一种是反过来，把它自己读代码就能发现的东西塞满一大段。

[站内相关Claude Code工程师：你可能给 Claude 写了太多提示词：哪些该删，哪些要讲清楚第二种错法的展开：哪些话是多余的，哪些必须讲清。去读](https://xiaohu.ai/article/claude-overprompting/)

回到开头那句「把仪表盘弄快点」。Addy 把它改写成了一份五行的任务说明，下面是中文版。里面的数字只是举例。

任务说明示例（路径和数字换成你自己的）

```
目标：在成员 1 万以上的组织里，把团队仪表盘（/team）的 p95 加载时间降到 2 秒以内。
为什么：企业管理员每天都要打开它，加载慢是他们提得最多的工单。
约束：不改数据库结构；接口返回的数据格式保持不变。
不做：不改界面；不给整个页面加缓存。
验收：运行 scripts/perf/team.sh，把改动前后的数字都给我看。
```

每一行都在补一块它读代码读不出来的东西：

**目标**把「快一点」变成能量的数：哪个页面，哪些用户，到多少算过关。p95 加载时间（100 次打开里，有 95 次不超过这个时间）盯的是慢的那一头：只看平均数，少数很慢的几次会被大多数快的拉平。

**为什么**告诉它这活是为谁做的。遇到两条路都能走的时候，它知道往哪边偏。这就是「指挥官意图」：讲清目的，不规定动作。

**约束**是代码里看不出来的红线。数据库结构能不能动，接口格式（别的程序来取数据时，拿到的数据长什么样）能不能改，往往取决于仓库外面的事，它读代码猜不到。

**不做**把范围画死。整页加缓存、顺手改界面，都是看起来能交差、但不是这次要的做法。先写明，把这些路堵上。

**验收**就是上一节说的检查办法：一条能跑的命令，加上改动前后的对比数字，当作交差的证据。

**不是每个任务都要写这么全。**探索性的活，写一句泛泛的提示词完全没问题，边做边调就行。还没想清楚要什么时，可以反过来让 Agent 采访你：「先别写代码，一个一个问我问题，直到你能写出完整的需求说明，然后存成文件。」再新开一个会话照着这份说明做，做完还能拿它来对照验收。

有些背景不在仓库里，在别的系统里，比如任务管理系统、报错监控、团队聊天。那就把这些工具接给它，像给新同事开账号一样。它本来就会用的常见工具，比如 GitHub 的命令行工具，通常不用多交代。

### 同一件事纠正两次，就写下来

**纠正过两次以上的事，写进团队共用的 CLAUDE.md，或者做成大家共用的 skill。**

很多人是每开一个新会话，就把同一件事再纠正一遍；或者靠只存在自己电脑上的默契，换个人用就没了。

把 CLAUDE.md 用出价值的团队，会隔三岔五更新它，把值得防的错误教训写进去。有的团队在代码审查里直接 @claude，让一条审查意见变成以后都生效的规矩。

CLAUDE.md 要写短。该放进去的有四类：

- 怎么验证，写具体的命令；
- 代码里容易让人误会的地方；
- 仓库里看不到的决定；
- 任何你纠正过两次的事。

[站内相关Anthropic 官方 Skill 实践指南重复的流程想做成 skill，怎么写才好用。去读](https://xiaohu.ai/article/claude-skill-authoring-best-practices/)

写下来的东西会累积：人换了组、模型换了代，它还在。还有一个反方向的动作也别忘：隔段时间看看，新模型是不是已经不用再纠正这些了，不用的就删。

### 管多严？大多数事让它自己拿主意

**默认放手让它判断，只对少数「必须做」「绝不能做」的事上硬约束。**

英特尔前 CEO 格鲁夫在《格鲁夫给经理人的第一课》里讲过「任务相关成熟度（这个人在这件具体事上的表现记录）」：管多严，要看这个人在这件具体的事上过去做得怎么样，不看他整体有多能干。给新经理的老建议也是一个意思：给人的空间比你觉得舒服的再多一点，同时给他兜底，也让他对结果负责。

Claude Code 把这件事分得很清楚，就两类：

它自己看情况强制执行

请求模型会考虑，再自己决定提示词、CLAUDE.md、skill大多数事放在这里。看着真实代码的模型，往往比你提前定的规矩更清楚这条规矩在这里适不适用。
要求一律强制执行钩子、禁止规则、统一管控的设置只留给少数硬红线，比如「绝不改自动生成的那部分代码」「每次都要跑加版权声明的脚本」。

刻度左边是 Agent 自己拿主意的，右边是你定死的；左边占得多，是因为大多数事都该放在左边。示意。

另外，最危险的那几类操作，也不全靠你自己写规矩去防。现在新开一个 Claude Code 会话，默认是「自动模式」：旁边有一个专门判断操作危不危险的检查器，像把改动直接发布到真实用户在用的线上系统、强行用自己的版本盖掉同事已经交上去的代码，这类动作会被它拦下。

判断用哪一类，官方指南的建议有两头。一条写在 CLAUDE.md 里的话，你一再加重语气它还是不照做，那它该变成钩子。反过来，一个钩子表达的只是你的偏好、不是硬要求，就该删掉，让 Agent 自己拿主意。这就像团队把一个已经没用的流程废掉。

换了新模型，也要跟着调。用老模型时，很多人养成了给它「加重语气」的习惯，官方指南列了几条现在可以戒掉的：把规则全用大写字母写，英文里这就相当于扯着嗓子喊；叫它「想得更努力点」，现在它想多深是一个可以直接调的设置，不用靠喊；叫它「别偷懒」。对现在的模型这么喊，反而容易让它把规矩执行过头，活也做过头。

With agents, over-process is the new micromanagement.对 Agent 来说，流程过度就是新的微观管理。

### 先对计划，再让它动手

**开工前先定一份双方认可的计划，读出里面藏着的假设，把活拆成不重叠的几块再并行。**

好用的流程是：先进计划模式（只出计划、不动代码的模式），把计划改到对，再把写代码交出去。计划好的话，模型常常一遍就能写完。大一点的活，再开一个会话，让它像资深工程师那样审一遍计划。这就是设计评审，是发现方向走错的最便宜的地方。

审计划时，重点找它**暗含的假设**。放在一对一谈话里，就是问一句：「你哪里还没把握？」

拆活这件事，也越来越多地交给 Agent 了。Claude Code 里有个批量命令，能把一大批机械改动拆成 5 到 30 个任务，先给你看计划，再在各自独立的一份代码副本里分头做，每块开一个 PR（一份等人审、审过才合进主代码的改动）。你不用自己切了，只要检查切出来的块有没有重叠，并且让几块都要依赖的公共部分（比如各块之间约定好的对接方式）先做完、先合进去。

切不好，就是假并行。

五个 Agent，不等于五倍产出

切片重叠

五个 Agent 改到同一处：换来一个合并冲突，作者有五个。

切片不重叠

先切开、公共部分先做好：五份改动各自能合进去。

切片一重叠，一整个下午就花在解合并冲突、收拾重复做的决定上了。

### 跑偏了早点拉，拉两次不回就重来

**盯住开头那一分钟，一跑偏马上纠正；纠正两次还不行，就开新会话、重写说明。**

有经验的经理知道：一个能干的人接连失手，问题多半出在上游，是说明、背景或范围没给对。

换到 Agent 身上，规矩更明确：一看它走偏，按 Esc 打断。已经纠正了两次还不对，就清空会话，把这两次学到的东西写进新的说明，重新开始。第三次、第四次接着纠正，大多只是给模型塞了更多要反复重读的内容，连失败的那几次尝试也在里面。**该改的是需求，不是再多纠正一次。**

撤回变便宜，也改变了玩法。Claude Code 的回退命令能把代码和对话一起退回到之前某个点，所以不妨先试一个更大胆的做法。好经理带人也是这样：犯了错撤回成本低，就放手让人大胆试，事后复盘，能推广的教训写进 CLAUDE.md。

### 活可以交，判断不能交

**活让 Agent 干，要紧的事你来定：产品怎么取舍、安全边界在哪、什么能上线。**

没有哪个经理能说「那是我手下上线的，不关我事」。你跑的每一个 Agent 也一样。Addy 的标准是：**看每一份改动时，都假设它一出事，被叫去救火的就是你**。

这一条他前几天专门写过一整篇，讲人怎么一步步把判断交给 AI。这次他拿自己举了个例子：他让一个 Agent 去研究自家产品和竞品差在哪，再写几份本地改动把差距补上。他读了调研，扫了一眼代码，差一点就推了上去。那些改动给用户增加了复杂度，换来的好处却很少。活交出去了，判断也差点跟着交出去。

这个坑很容易掉：改动有 600 行，命名看着挺合理，测试全绿，那就批了吧。

This is not code review, this is code ratification.这不叫审代码，这叫给代码盖章。

Addy 的分法是：代码风格、规范检查、审查意见的后续修改、常见的 bug、单元测试，交给 Agent；安全边界、合规（是否符合法律和行业规定）、产品决定，留给人。协调也一样，Agent 能帮你记住谁交接了什么，但在互相冲突的需求之间取舍、让人真正拍板承诺，还是人的活。

[站内相关AI 越来越强，人们正在让渡思考和判断：Claude 工程师 Addy Osmani 的防「认知投降」手册同一位作者的前一篇：哪些判断能交、哪些必须留在自己手里。去读](https://xiaohu.ai/article/critical-thinking-agents/)

你不用参与每一个改动的内圈。但外圈你得握住：**约束是什么，它的产出你真正读多少，留下哪些证据，哪些事必须人来签字。**还有一条：每份改动都要小。你一次审多少，才能真正看懂多少；600 行一起审，审过了也不等于看懂了。

### 通宵跑之前，先问五个问题

**放它自己长时间跑之前，先定好：怎样算完、它怎么自查、边界在哪、护栏是什么、谁来批。**

最怕的是这种情况：睡前开一个长任务，既没说怎样算完，也没设停止点，第二天醒来，发现它在一个错误的前提上干了一整夜。

隔级经理（经理的经理）不管每个工程师具体怎么干活，他管的是目标、护栏、检查点和下面的组长。Agent 也在往这个方向走：它已经会把任务的一部分分给子 Agent，也能按时间表、在自动检查失败后、在有人交上新改动后自己启动。再往前，是能自己开工、自己验收、只在需要做决定时才叫人的系统。

你的角色，也从盯着一次会话，变成设计这些循环。设计一次无人值守的运行，要问自己的五个问题，和好经理把项目交给资深工程师、自己去度假之前问的一模一样：

**无人值守任务单**五栏填完，再放它自己跑
**怎样算完**一个目标条件、一份写好的需求文件，或者一个现在还通不过、要它负责改到通过的测试。
**怎么自查**一套测试、一个收工前必跑的检查，或者一步送审。
**边界在哪**它能动什么、不能动什么：权限设置；沙盒，就是一个隔离的环境，搞坏了也碰不到外面；一份独立的代码副本；或者只许它往指定的那一条分支上交代码（分支是代码的一条独立支线，不影响主线）。
**护栏是什么**最多跑多少轮，最多花多少钱。
**交给谁批**结果以一份 PR 或一份总结交上来；任何撤不回的动作，都要人批。

官方指南还有两个习惯，当经理的人一看就熟。一是试点：批量的活，先在 3 个文件上跑，把提示词改顺了，再跑剩下的。二是新东西的头几次运行，要看着它跑，信得过了再放它自己干。就当是试用期。

### 想多开几个 Agent？先让「盯」的活变少

**Agent 能加多快，取决于检查、目标和新的审查者能替你接过多少盯梢；除了产量，还要量质量。**

经理很快就会知道自己的管理幅度（一个经理能带好多少人）：直接下属超过一定人数，每个人分到的经理就变少，质量开始往下走。Agent 也一样。Addy 管这个叫「编排税」：过了头几个之后，每多开一个 Agent，要你付出的注意力都比上一个更多。他自己多数时候同时跑四五个后台 Agent，再加几个本地会话，有些天这已经太多了。

最容易犯的错，是开的会话比你审得过来的多，再拿「AI 写了多少代码」来算成绩。

同时管很多会话，诀窍是把大部分盯梢交出去：交给它的自我检查、交给目标条件、交给没看过上下文的新审查者，自己的注意力只留给做决定。用通知代替你一遍遍去看，把后台任务放在一个地方集中看，也都有帮助。**能加多少 Agent，不取决于你能盯多少，而取决于需要你盯的有多少。**

然后量整个系统，别量动作。有用的指标是：一份 PR 从开到合要多久，新人多久能上手，回滚和返工有多频繁。AI 写的代码占多少比例不是个好目标，你要的是质量和可靠。

**格鲁夫的「配对指标」是什么？**量一个数，就同时量一个能拆穿它的数。比如量合并了多少 PR，就同时量回滚和返工，免得大家为了冲数字而牺牲质量。

### 做起来便宜了，更要会说「不」

**动手前问三件事：谁需要它，怎么知道它成了，什么情况下停；同时在做的事要限量。**

经理最重要的一个字，常常是「不」。有了 Agent，这个字更难说出口：开工几乎不花钱，任何一个说得过去的点子，午饭前就能变成一份 PR。

可这些 PR 都要团队去审、去保证安全、去支持和维护。攒多了，就是一个谁都得收拾的杂物抽屉。现在真正稀缺的，是**审查和验证**。

所以那几个老问题反而比以前更要紧：谁要的？怎么衡量成功？什么时候该停？做起来便宜的时候，难的问题从「能不能做」变成了「该不该做」。

### 这个比喻在哪里不成立

**管理的经验照着用，但要算上 Agent 和人不一样的地方：返工便宜、太容易点头、长处每次换模型都在变。**

Addy 也专门写了这个比喻不成立的地方。最容易想偏的有两种：把 Agent 当成一个初级程序员；或者觉得自己能跑五个 Agent，就能管好五个人。

七个不一样的地方

带人带 Agent
**管人更难**激励、冲突、职业发展、花几个月建立信任，都得你来管。这些在 Agent 这边都没有对应。跑过五个 Agent，不代表你能管五个人，本事不能反着用。
**返工几乎免费**有些事，你绝不会让一个人去做。可以让它做。比如白板前的技术争论，让它把两三种方案都做出来，摆在一起比。
**没有经验**多年攒下经验和判断。只有一个笔记本：自动记忆只记在一台电脑上，不会传到队友的会话里。教训要写下来，给全队用。
**太积极、太自信**好工程师接到错的要求，会顶回来。更可能照做，你也更容易过度信任它。沃顿商学院关于「认知投降」的研究里，参与者大多数时候都接受了错误的 AI 答案，而且变得更有信心。对策：让它反驳自己的答案。
**只有一种人**团队里各有所长。所有 Agent 的长处和短处都一样，而且每几个月换一次模型，就变一次。
**新人还得带**初级工程师靠入门活学基本功。入门活被 Agent 拿走了，当经理的就要有意给新人造练手的机会。
**人的团队仍重要**把团队拧成一股绳，要花时间。有时你管了一整天 Agent，都没发现挤掉了这段时间。别这样。

### 不想当经理，也值得学这一套

**力气花在让好软件发生上：给背景，定义什么叫完成，好好审。**

反过来的样子是：拿自己写了多少行代码给自己打分，手下却跑着一堆没交代清楚、也没人检查的 Agent。

好的资深工程师一直是这样干的：写设计文档，给大家讲清背景，认真审，让身边的人变得更强。Agent 让每个工程师从第一天起就能这么干。它是一堂管理速成课：反馈几分钟就来，不用等一个季度；犯了错，自己就能撤回。

这份工作越来越不在于亲手写代码，而在于**成为好代码被写出来的那个原因**。没有人天生就是好经理，好工程师也一样，都是练出来的。只是有了 Agent，练习变得很便宜。

Addy 最后留了六条马上能试的：

明天就能试的六条

- **每个任务配一个它能跑的检查**要它拿出证据。
- **告诉它看不到的，省掉它看得到的**字花在仓库外面的事上。
- **先聊计划，再写代码**审计划时找它没把握的假设。
- **纠正过两次，写进 CLAUDE.md**重复的流程，做成 skill。
- **纠正两次不成，就重开**改写说明，别第三次纠正。
- **审改动时，当作出事会叫醒你**别因为测试绿了就盖章。

你不必想当经理。但用 Agent 用得好的工程师，都会在路上顺手学会怎么管。

开头那张便利贴，最后该长成这样

**派工单：团队仪表盘提速**把仪表盘弄快点
**目标**1 万成员以上的组织，p95 加载时间 2 秒以内
**为什么**管理员每天都打开，慢是提得最多的工单
**约束**不改数据库结构，接口格式不变
**不做**不改界面，不给整页加缓存
**验收**跑测速脚本，给改动前后的数字
**Agent** 交回：改动，加上**测速脚本跑出的前后数字**
**你**：读过、判断、签字*签字*

单子你来开，活它来干、自己验，字你来签。数字沿用原文示例，只是举例。

### 给动手的人：这些做法对应 Claude Code 的哪些功能

正文用白话讲了功能，这里对上名字，方便去查。

- **/goal**：设一个目标条件，每轮结束后由另一个模型检查是否达到。适合长时间的后台活。
- **Stop hook（停止前钩子）**：这一轮想结束时必定先跑，比如类型检查不过就不让结束。
- **/code‑review**：把改动交给一个没看过对话的新子 Agent 审。可以要求只查正确性。
- **计划模式**：英文 plan mode，先出计划不改代码，改到满意再开工。
- **/batch**：把一大批机械改动拆成 5–30 个任务，展示计划，在各自的 worktree（独立工作副本）里做，每个开一个 PR。
- **Esc、/rewind**：Esc 当场打断；/rewind 把代码和对话一起退回到之前某个点。
- **硬约束**：hooks（钩子）、deny rules（禁止规则）、managed settings（统一管控的设置）一律强制；提示词、CLAUDE.md、skill 只是请求。
- **自动模式**：英文 auto mode。新开的终端和 VS Code 会话默认开启，带分类器，拦部署生产、强推覆盖这类危险动作。
- **自动记忆**：英文 auto memory，只存在当前这台机器上，不会同步给队友。

文中多处引用的是 [Claude Code 官方最佳实践指南](https://code.claude.com/docs/en/best-practices)。Addy 的两篇旧文：[《你的编程 Agent 需要一个经理》](https://addyosmani.com/blog/coding-agents-manager/)、[《认知投降》](https://xiaohu.ai/article/critical-thinking-agents/)（站内中文解读；[英文原文](https://addyosmani.com/blog/cognitive-surrender/)）。

![Pangram 检测结果：AI 10%，AI 辅助 0%，人写 90%](https://pic.xiaohu.ai/jiedu-media/coding-agents-made-you-a-manager/img-01.png)

附：原文最后贴了这张截图，文字检测工具 Pangram 判断这篇长文 90% 是人写的、10% 是 AI 写的。它和正文的方法无关，放在这里只为把原文交代完整。

来源Your coding agents made you a managerAddy Osmani·[查看主材料](https://x.com/addyosmani/status/2119332146485891501)延伸[Your coding agents need a manager](https://addyosmani.com/blog/coding-agents-manager/)·[Cognitive surrender](https://addyosmani.com/blog/cognitive-surrender/)

Engineering Practice · Claude Code

## 当 Agent 让你变成经理：Claude Code 团队的双环工作法

别当跟在后面擦屁股的测试员。把好经理带团队的做法搬给 Agent：外圈你转（交代、审计划、拍板），内圈 Agent 自己转到检查过关。活交给它跑，判断留给自己。
核心提炼 · 深度约 5 分钟 · 适配桌面与移动端

用 Agent 写代码，很多人都碰到过这种事：交代一句「把仪表盘弄快点」，它马上开干，交回来的东西看着是做完了，一跑才发现不对；你指出问题，它改，改完又歪到别处。同一件事，今天纠正一遍，明天开个新会话还得再纠正一遍。**Agent 开得越多，你越像个跟在后面验收的人。**

Anthropic Claude Code 团队的工程师 Addy Osmani 多数时候同时开着四五个 Agent。他的办法是：**把好经理带团队的那一套，搬到 Agent 身上。**他说的「管」不是泡在会里，而是「帮别人把活干好，由此做出好结果」。他还有个说法：你对坏老板的每一句吐槽，都是一份用 Agent 时的 bug 报告。你挨过含糊的需求、缺背景的交接，所以知道一次好的交接长什么样，现在轮到你来交接了。

核心机制 · 双环模型

给它一个能跑出「过 / 不过」的检查办法，让它把结果拿给你看；别把「看着做完了」当成做完了。

没搭护栏的新经理只能什么都自己验，最后自己成了整个团队最堵的口子。用 Agent 一样：没有任何检查，「看起来做完了」就是它唯一的标准，验收的活全落回你头上，你变成了它的测试。

外圈 · 人类主导
宏观定界与战略拍板

输入仓库外背景、划定红线、在关键分叉口拍板并做最终合规验收。

1**意图交付**：交代目标与不可碰的红线
2**审阅计划**：在计划模式下纠偏暗含假设
3**终审上线**：审每份改动都假设出事被叫去救火的是你

内圈 · Agent 自治
自主验证与证据交付

运行检查命令，没过就自己改了再跑，直到通过。

✓**跑检查**：写在 CLAUDE.md 里的那条检查命令
✓**自主修复**：根据报错反馈自动微调实现
✓**交付证据**：把检查结果原样拿给你看

**内圈落地的四种日常做法：**直接要求（改完跑测试，全过为止）；设一个目标（/goal，每轮由另一个模型判断达到没有）；强制（停止前钩子 Stop hook，比如类型检查不过就不许收工）；送审（/code-review，交给一个没看过对话的新子 Agent 审，可以限定只找会出错的地方）。
    

只交代它读不到的东西

好经理讲清楚要什么结果、有哪些限制，至于怎么做，交给干活的人自己想。动笔前先想一想：**它读代码就能知道、而且真的会去读的，就别写。把字花在仓库外面的东西上。**

任务说明示例：从「弄快点」到五行交接
示例 · 数字只是举例

目标
在成员 1 万以上的组织里，把团队仪表盘（/team）的 p95 加载时间降到 2 秒以内。把「快一点」变成能量的数。p95 指 100 次打开里有 95 次不超过这个时间，盯的是慢的那一头。

为什么
企业管理员每天都要打开它，加载慢是他们提得最多的工单。讲清为谁做，两条路都能走时它知道往哪边偏。

约束
不改数据库结构；接口返回的数据格式保持不变。代码里看不出来的红线，取决于仓库外面的事。

不做
不改界面；不给整个页面加缓存。把看起来能交差、但不是这次要的做法先堵上。

验收
运行 `scripts/perf/team.sh`，把改动前后的数字都给我看。一条能跑的命令，加上前后对比数字，当作交差的证据。

**两遍原则：**任何一件事纠正过两次以上，就写进团队共用的 CLAUDE.md 或封装为 Skill；换了新模型后，如果它已不再犯，及时清理精简。
    

跑偏干预与管理成熟度阶梯

管多严，看它在这件具体的事上过去做得怎么样，不看整体多能干（格鲁夫说的「任务相关成熟度」）。给新经理的老建议同样适用：给的空间比你觉得舒服的再多一点，同时给兜底，也让它对结果负责。放了手，还要会拉回来、分清哪些锁死：

STEP 01 · 介入原则
首分钟观察，漂移立断

盯住开工第一分钟，一看出方向偏了，按 Esc 当场打断。

STEP 02 · 止损机制
纠偏两次不回即重来

纠正两次还不对，就清空会话，把这两次学到的写进新说明重来。再接着纠正，大多只是给它塞了更多要反复重读的内容，连失败的尝试也在里面。

STEP 03 · 防御分级
少数锁死，其余放手

少数硬红线用钩子、禁止规则锁死；部署生产、强推覆盖这类危险动作，由新会话默认开启的自动模式里的检查器拦下；其余让它自己拿主意。CLAUDE.md 里说了不听的改成钩子，只是偏好的钩子删掉。

边界
这个比喻在哪里不成立

1返工几乎免费：可以让它把两三种方案都做出来比。
2它太容易点头：错的要求也更可能照做，要让它反驳自己。
3它不攒经验：自动记忆只存在本机，教训要写下来给全队。
4跑得动五个 Agent，不等于能管好五个人。

别漏
还有四个判断

1并行先拆成不重叠的块，公共部分先合，否则是假并行。
2通宵跑之前先定：怎样算完、怎么自查、边界、护栏、谁来批。
3能开多少 Agent，看需要你盯的有多少；量返工和回滚，别量 AI 写了多少代码。
4做起来便宜了更要会说「不」：现在稀缺的是审查和验证。

**活可以交，判断不能交**

代码风格、规范检查、审查意见的后续修改、常见的 bug、单元测试，交给 Agent；产品取舍、安全边界、合规和什么能上线，由人来定。审改动时始终假定：**它一出事，被叫去救火的就是你。**

这份工作越来越不在于亲手逐行敲代码，而在于成为好代码被写出来的那个原因。

原文版权归原作者，这里只供对照阅读。 [看原网页 ↗](https://x.com/addyosmani/status/2119332146485891501)

## Your coding agents made you a manager

![](https://pbs.twimg.com/media/HWfhdJTasAAa-X_.jpg)

*The skills for managing agents are pretty much the skills for managing a team, and you don't need to be a manager to learn them.*

If you're spending all day with a coding agent, you are managing. You're repeatedly selecting tasks, writing instructions, delegating, following up, evaluating results, and deciding what ships. The engineers who get the most out of agents aren't necessarily the ones who are best at prompt engineering. They're the ones who learned how to manage, intentionally or otherwise.

This might be an unwelcome idea. Many of the engineers I admire took an individual contributor (IC) career path because they want to stay close to the work. They've seen friends become managers and disappear into their calendars. But I'm not telling you to become a manager like that. I'm using "management" in a specific sense: producing good outcomes by enabling others' work. And I'm certainly not saying agents are a substitute for managers or colleagues.

Every gripe you have about bad managers is a bug report for interacting with agents. Think about handoffs. If you’ve experienced a bad one you may have got an ask that felt vague, lacked context or just had expectations shift a lot. The good news for ICs is that since you’ve been on the receiving end of handoffs for years, you might know what a good one looks like.

I've written before that [your coding agents need a manager](https://addyosmani.com/blog/coding-agents-manager/). I've also written about the quiet risk of delegation, [cognitive surrender](https://addyosmani.com/blog/cognitive-surrender/). This piece compares good engineering managers' practices with what we've learned from using and creating Claude Code. The sections are roughly ordered by impact, so that the most high-leverage habit comes first.

### Give it a way to check its work

**Best practice:** Provide the agent with a mechanism to validate its work, like a test suite, build, or screenshot, and have it show you the results as proof.

**Anti-pattern:** Taking "looks done" as confirmation. This forces you to do all the validation, becoming the agent's test suite.

Ask an experienced manager how they can be confident their team is producing good work without reading everything, and they'll talk about guardrails. CI, code review, dashboards, on-call, etc. Inexperienced managers who don't build guardrails end up validating everything themselves, and within a quarter they're the bottleneck. The same is true for agents. As the [Claude Code best-practices guide](https://code.claude.com/docs/en/best-practices) explains, agents stop when the work looks done. If there's no validation, "looks done" is the only validation the agent has. Providing a mechanism to validate the work allows the agent to do the work, run the validator, see the failure, and correct it on its own. For a UI change, this can mean actually opening the page in a browser and iterating until it works and looks good.

The validation mechanism can be almost anything, as long as it's something that yields a definitive pass/fail result. Think tests, build exit codes, linters, diff scripts, and screenshots. The guide notes that the command that runs these validations is the single most useful line you can have in your CLAUDE.md, the instructions file the agent starts each session with. Once you have the validation mechanism, here are some ways you can bring it into your workflow:

- **Ask.** "Run the auth tests after, and continue until they pass."
- **Set a goal.** With /goal, a separate model runs a condition check after every turn, which is most useful when doing long background work.
- **Enforce.** A Stop hook can prevent the turn from completing until the typecheck passes.
- **Have it reviewed.** /code-review sends the diff to a new subagent (which didn't see your conversation) for review, like how authors don't approve their own PRs.

You can even control the scope of the review. If you ask it to find problems, it will always find something. But if you ask it to find correctness issues and ignore style, it will do that. This is how good managers learn to ask for feedback, as well. Most of the functionality in the Claude Code toolkit is all about tightening this loop. Skills, hooks, subagents, and MCP all exist to bridge the gap between doing the work and validating the work, so your focus is only on the things the agent couldn't validate. This is what experienced engineering managers do.

### Set clear context

**Best practice:** Provide a clear summary of what the agent can't know by inspecting the repo, including: the task's objective and why it's important, constraints, out-of-scope items, and success criteria.

**Anti-pattern:** Passing a one-line task, while the real expectations live in your head, or padding the brief with things the agent would discover by reading the code.

Effective managers provide clear descriptions of the desired outcome, constraints, and objectives. They articulate what the work should accomplish, but give the person doing the work the freedom to figure out how to do it. In the military, they call it commander's intent. At Netflix, they call it "context, not control."

The challenge of working with agents is that it's hard to know what context the agent is missing. The first thing a coding agent does on every task is read your code. Current models are fantastic at picking up on your folder structure, conventions, and test set-up much faster than you could describe them.

Before you write anything down, think about what the agent can figure out on its own. If the agent can read it in your code, and it would actually go read it, you don't need to say anything. Spend your words on the parts that are not in the repo - e.g. a meeting decision, someone's internal process for deploying, why this task is important, and what it means to be done this time.

Let's take the example of a vague task, "make the dashboard faster", and turn it into a prompt. The numbers here are just for example.

```
Get p95 load time for the /team dashboard under 2s for orgs with 10k+ members.

Why: enterprise admins open it daily, and slow loads are their top support ticket.

Constraints: no schema changes; keep the API response shape.

Out of scope: UI changes; caching the whole page.
Check: run scripts/perf/team.sh and show before and after numbers.
```

You don't need to do this for every task. If you're doing discovery work, it's totally fine to write a generic prompt. You'll just refine a little more as you go. If you're not ready to write a prompt, have the agent interview you until it could write the spec, save that spec to a file, and then start a new session with the agent to build from that. You can use that spec to review against later.

You might also need to give your agent access to other tools, like your issue tracker, error dashboard, or team chat. Treat your agent the same way you'd treat a new hire on your team. If it's a CLI tool it already knows about, like gh, you often won't need to tell it anything.

### Make every correction compound

**Best practice:** When you correct the same thing more than once, document it in the team's [CLAUDE.md](http://claude.md/) or turn it into a shared skill. Over time, check if newer models reduce the need for these corrections.

**Anti-pattern:** Manually correcting the same thing every session or relying on tacit knowledge that only exists on your own machine.

Teams that maximize the value of CLAUDE.md update it semi often and write down lessons learned from mistakes worth preventing. Some teams even mention @claude in code reviews, turning feedback into a permanent policy. Keep CLAUDE.md concise. Here are the types of things that belong in it:

- How to verify something (exact commands)
- Misleading areas of the code
- Decisions that don't exist in the repo
- Anything you've corrected twice

These are all examples of the compounding nature of written information. It outlasts people changing teams and models getting replaced.

### Let it decide, and enforce only what can't bend

**Best practice:** Let the agent decide by default and only use hard enforcement (e.g. hooks, deny rules) for the few things that must always or never happen.

**Anti-pattern:** You write rules in ALL CAPS, define hooks for optional preferences, or keep habits from older models long after newer models outgrew them.

Andy Grove's *High Output Management* describes this as task-relevant maturity: the level of supervision should depend on a person's history of performance in that specific task, not their overall capability.

An old piece of advice for new managers says the same thing: give people a little more latitude than you're comfortable with while backing them up and holding them accountable.

Claude Code takes this and makes it explicit: prompts, CLAUDE.md, and skills are requests that the model can consider and choose to act on; hooks, deny rules, and managed settings are requirements that are always enforced. In most cases, you want the agent to make the call. There are often cases where the model, looking at real code, is better placed to judge if a guideline applies than a rule you set ahead of time. Use enforcement to set hard requirements such as "never edit the generated client" or "always run the license-header script." In particular, new terminal and VS Code sessions start in auto mode, with a classifier that will filter out unsafe behaviors like deploying to production or force pushing over someone's work.

The guide's advice has two sides. If you're putting more emphasis on a CLAUDE.md line and the agent still isn't picking it up, it should be a hook. If a hook is expressing a preference instead of a requirement, it should be removed in favor of letting the agent call the shots. It's like your team deciding to retire a process that is no longer useful. This also means adjusting when you have a new model. The guide keeps a list of habits you can stop: ALL CAPS directions, "think harder" (effort is a setting now), and "don't be lazy." With current models, these tend to lead to over-enforced rules and overwork. With agents, over-process is the new micromanagement.

### Plan before it builds

**Best practice:** Set an agreed-upon plan before the agent starts coding, read for underlying assumptions, and partition tasks into non-overlapping parallel work.

**Anti-pattern:** Allowing multiple agents to tackle overlapping tasks simultaneously, then spending the afternoon resolving merge conflicts and duplicated decisions.

A good workflow here is to first enter plan mode and iterate on your plan until you have the right one, then delegate the coding. With a good plan, the model can often build it all in a single pass. For larger tasks, use a second session to look through the plan as a staff engineer would; it's a design review, which is the cheapest place to catch a wrong turn. When reviewing the plan, look for underlying assumptions (in a 1:1 this would be asking, "What are you unsure about?").

Decomposition is increasingly being delegated to agents. /batch in Claude Code takes a big mechanical change and creates 5 to 30 tasks, displays the plan, executes them in separate worktrees (separate checkouts of the repo), and creates a PR for each one. You no longer need to divide up the work, just check the slices for overlap and make sure shared interfaces land first. Without this, you might get a false level of parallelism. Five agents taking on overlapping tasks won't lead to five times the output, it leads to one merge conflict with five authors.

### Steer early, reset fast

**Best practice:** Watch the first minute and steer the agent. As soon as you see it go off course, correct. If you've already made two failed attempts to correct the agent, start anew with a fresh session and better prompt.

**Anti-pattern:** Adding a third or fourth attempt to correct the agent, instead of correcting the request.

An experienced manager knows that if a capable person has a miss multiple times, the problem might be upstream with the instructions, context or scope. The agent version is explicit: as soon as the agent goes off course, hit Esc. If you've already made two failed attempts to correct the agent, clear the session and write a better prompt, incorporating the lessons you learned. A third attempt to correct the agent is mostly just more information that the model has to keep re-reading and re-processing (including failed attempts).

Cheap rollback is also changing the game. /rewind rolls the code and conversation to an earlier point, making it low-risk to try a more ambitious approach first. Good managers do the same with employees: if undoing a mistake is cheap, let them try an ambitious approach. Then run the retro afterwards, and generalize the fix into CLAUDE.md if applicable.

### Delegate the task, never the judgment

**Best practice:** The agent does the work, you decide the important things: product calls, security boundaries, what ships. Treat every diff like you're going to get paged for it.

**Anti-pattern:** Approving large diffs because the tests are green and the names look reasonable. This is not code review, this is code ratification.

No manager can say "my report shipped that, not me." The same is true for every agent you run. I've fallen into this trap myself. I told an agent to research gaps with competitors and write local PRs to close those gaps. I read the research, skimmed the code and almost went ahead and pushed changes that added complexity for users for little gain. I had delegated the work, and almost delegated the decision as well. It's an easy trap to fall into: it's a 600-line diff, the names look reasonable, the tests are green, approve.

It makes sense to split tasks this way: let agents do the style, linting, follow-ups to reviews, typical bugs and unit testing, but let humans handle security boundaries, compliance and product decisions.

Coordination works the same way. An agent can keep track of handoffs, but deciding between competing requests and getting people to actually commit is still a human job.

You don't need to be in the inner loop of every change. What you do need to own are the outer loops: what the constraints are, how much of the output you actually read, what evidence you keep, and what a human has to sign off on. And keep changes small, since the unit of review is the unit of comprehension.

### Design the run that doesn't need you

**Best practice:** Before deploying an autonomous task, define done, the self-verification, the boundaries, the guardrails, and the human approval.

**Anti-pattern:** Starting a long-running process before bed, without a definition of done or a stopping point, and waking up the next morning to find out that your model has been working overnight on a faulty premise.

Skip-level managers don't manage the work of individual engineers; they manage the work of goals, guardrails, checkpoints, and leads. AI agents are following a similar trajectory. They are already delegating parts of a task to sub-agents, and they can run autonomously on schedules, after CI failures or after new pull requests are opened. The frontier is self-governing systems that can autonomously start, self-verify, and only call for human intervention when decisions are needed.

The role shifts from controlling the session to designing your loops. The five questions to ask yourself when designing an unattended run are the same questions a good manager asks before giving a senior engineer a project and going on vacation:

- **Does it know what done looks like?** (Goal condition, spec file, or a failing test it has to turn green.)
- **Does it have a self-verification mechanism?** (Test suite, Stop hook, or review step.)
- **What are its boundaries?** (Permission controls, sandbox, worktree, or the one branch it's allowed to push to.)
- **What are its guardrails?** (Turn limit or spend limit.)
- **Where does it produce output, and who approves it?** (A PR or summary, and a human approval of any non-reversible actions.)

The guide has two more habits that managers will recognize as good practices: pilot, i.e., get a batch job to run on three files, iterate the prompt, then run the rest; and watch the first few runs of anything new before you trust it unattended. Think of it as a probation period.

### Scale verification, not attention

**Best practice:** Scale up the use of agents only as fast as checks, goals and fresh reviewers can take over the watching, and measure quality in addition to throughput.

**Anti-pattern:** Opening more sessions than you can review well, and measuring success by how much code the AI wrote.

Managers learn their span of control pretty quickly. Past a certain number of direct reports, everyone gets less of the manager and the quality goes down. The same is true for agents. It's what I call the orchestration tax: Past the first few agents, each additional agent requires more of your attention than the last. Most days I run four or five background agents and a few local sessions, and some days that's too many.

Managing lots of sessions isn't about being super-focused, it's about delegating most of the monitoring to self-evaluation, goals and new-context reviewers and reserving attention for decisions. It also helps to have notifications instead of polling and a centralized view of the background jobs. You can't scale the number of agents by monitoring more, only by needing to monitor less. Then measure the system rather than the activity. Useful metrics include cycle time for PRs, ramp up time for new employees and the frequency of reverts or rework. Measuring the percentage of AI-written code isn't a useful goal, because what you're aiming for is quality and reliability. Grove's rule of measuring with a countermeasure applies here: If you measure the number of PRs merged, then also measure reverts and rework.

### Decide what not to build

**Best practice:** Ask who needs it, how you'll know it worked and what would make you stop, and limit WIP.

**Anti-pattern:** Just throwing every plausible idea into a PR; after all it's cheap to build. You'll now have a junk drawer the team needs to review, secure and maintain.

The most important word a manager says is often "no." With agents, it's harder to say no. It's nearly free to start work and you can throw any plausible idea into a PR by lunch. But you'll now have a bunch of PRs that the team needs to review, secure, support and maintain. Review and validation are the scarce resources now.

In fact, the old management questions matter now more than they used to. Who asked for it? How do we measure success? How do we know when to stop? If it's cheap to build the hard question is not "can we?" but "should we?"

### Where the analogy breaks

**Best practice:** Follow management best practices, but account for the differences in the agent model, like cheap rework, how quick they are to agree, and strengths that shift with every model release.

**Anti-pattern:** Thinking that an agent is just like a junior developer, or that you're prepared to manage five people because you can run five agents.

The analogy is a useful but imperfect one, and the best practitioners of this work are aware of where it is imperfect:

- **Managing people is harder, and the skills don't transfer back.** You're not prepared to manage five people because you've run five agents. There is no equivalent for motivation, conflict, career development, or months-long trust building.
- **Rework is almost free.** You can ask an agent things you would never ask of a person. If a technical debate happens at the whiteboard, the agent can build two or three options and you can compare them.
- **Agents don't have experience, just a notebook.** Auto memory only records notes on one machine. They don't transfer to your teammates' sessions. They aren't the experience and judgment you develop over the course of your career, and you need to write those lessons down for the whole team.
- **Agents are eager and confident.** If you ask a good engineer to do something wrong, they push back. Agents are more likely to do what you ask, and you're likely to overtrust them. In Wharton research on cognitive surrender, participants accepted faulty AI answers most of the time, and grew more confident. You can counter the overconfidence by asking the agent to argue against its own answer.
- **You only have one agent archetype, and it changes every few months.** Human teams have diverse skills and strengths. All your agents have the same strengths and weaknesses, which shift with each model release.
- **You still have to train your junior devs.** When agents take over the starter work junior devs need to learn the fundamentals of the craft, you have to create those reps intentionally as a manager.
- **The human team still matters.** Sometimes you can spend a day managing agents without realizing that you've crowded out the time it takes to build a cohesive team. Don't do this.

### You don't need the title

**Best practice:** Focus your effort on making good software happen: setting the context, defining done, and reviewing well.

**Anti-pattern:** Evaluating yourself by lines of code while running under-briefed, unchecked agents.

Good staff engineers have always been like this. They write the design doc. They set the context. They do a thorough review. They make the people around them better. Agents let all engineers do this on day one. They give you a crash course on management. You get feedback in minutes, not quarters. You can undo your own mistakes. The job is becoming less about writing the code and more about being the reason good code gets written.

Nobody's born a great manager (or a great engineer). You build skills the same way you always have, through practice. But with agents, practice is cheap.

Try these ideas:

- Every task needs a check it can run. Ask for the proof.
- Tell the agent what it can't see and leave out what it can.
- Talk through the plan before writing the code.
- Corrected something twice? Log it in CLAUDE.md. Repeated workflows? Turn them into skills.
- Two failed corrections? Restart and rephrase the prompt.
- Review the diff as if you'll get paged for it.

You don't have to want to be a manager. But the engineers who do well with agents will have learned to manage along the way.

![](https://pbs.twimg.com/media/HWfkvYrbgAARn-i.png)

↑ 正文结束
✓ 本篇全文免费开放

读完还有疑问？会员每天能问小互 30 次，每句带出处；还有一份按你口味挑好的每日 AI 日报。
[成为会员 $59/年](https://xiaohu.ai/buy/?plan=year&slug=coding-agents-made-you-a-manager&from=tail)[按月 $6.99](https://xiaohu.ai/buy/?plan=monthly&slug=coding-agents-made-you-a-manager&from=tail)

7 天内不满意全额退 · [看会员能多什么 →](https://xiaohu.ai/membership/)

[阅读原文 ↗](https://x.com/addyosmani/status/2119332146485891501)

📮 新解读每晚进邮箱

读完觉得有用？留个邮箱，每晚一封当天的新解读，随时退订。
