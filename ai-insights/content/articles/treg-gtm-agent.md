---
title: "查对手、找买家、等时机：8 个 Agent 接力做市场研究，8 段提示词全公开"
date: 2026-11-10T00:00:00.000Z
tags: ["AI 实操", "Agent", "GTM", "提示词", "增长", "技能", "聚合"]
summary: "Agustin 用一个 Agent 加 treg 按次付费的工具市场，搭起自家的 GTM 研究流水线：看对手流量和广告、查 AI 回答引用了谁、找人找邮箱、盯买家信号、审花费，8 段提示词和他的实测账单全部摊开。"
---
> **原文链接**: [https://x.com/agustingrowth/status/2119444106334101617](https://x.com/agustingrowth/status/2119444106334101617)
> **来源**: x.com
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/treg-gtm-agent/) · 2026/11/10
> **说明**: 本文由 AIHot汪 自动聚合(原文即中文,未翻译)。正文取自小互 AI 解读

---

全文 Markdown · 会员

作者：Agustin（X 长文）11-10 · 约 11 分钟⚑ 方法教程![](https://pic.xiaohu.ai/jiedu-media/treg-gtm-agent/social/zh-fbe380cd6609.png)

同样是研究竞品，两种付钱的方式

**订阅账单**每月自动扣款
Clay Launch*$185*
Apollo Basic 起*$49*
Hunter Starter 起*$49*
Brand24 Individual*$249*
每月合计**$532 /月**
一行数据还没跑

**treg 小票**摘自他的调用日志
17 家公司一整年的流量*$0.38*
5 家公司 13 个月流量*$0.126*
100 条在投的 Meta 广告*$0.00165*
1 个 ChatGPT 回答，连同 32 个来源*$0.0028*
搜人，返回 0 行*$0.00*
问一次，付一次；没答案，不收钱

左边是常见订阅工具的最低月费，一行数据没跑就要付；右边几笔都出自 Agustin 的调用日志。按次付费也有贵的时候：一次批量找邮箱就花了十几美元，后文的账本里有。

想摸清一个赛道，要回答的问题其实就那几个：几家对手这一年流量是涨是跌，谁在 Facebook、Instagram 上猛投广告，买家问 ChatGPT「哪家最好」时 AI 点了谁的名，对方管市场的是谁、邮箱多少，什么时候找上门最合适。

按老办法，每个问题背后都是一个按月收费的工具：查流量一套，找联系人一套，找邮箱一套，盯舆情又一套。常见那几家的最低档加起来每月 $532，一行数据还没跑就得先付，哪怕这个月你只查了两回。

Agustin（X 上的 [@agustingrowth](https://x.com/agustingrowth)）换了个做法：一个 Agent，加一个 treg 账户里的余额，用到哪个工具就付哪一次的钱。某天早上，他的 Agent 拉了 17 家公司一整年的流量，花了 $0.38。

他写了一篇长文，把这套自家养的 GTM（go-to-market，把产品推向市场、找到买家的那一整套活） 研究 Agent 完整摊开：8 个机器人（每个就是一个专干一件事的 Agent）各管一件事，每个都附了能直接粘贴的提示词，最后串成一条流水线。

### treg 是什么：一份余额接上几千个工具，问一次付一次

**它把各家数据工具接到同一个入口，Agent 按任务找工具、看报价、调用，钱从同一份余额里扣。**

先说 OpenRouter。做 AI 应用的人常用它：一个账户、一个接口，就能调用各家大模型，不用挨个去 OpenAI、Anthropic、Google 开户。treg 自称「工具版的 OpenRouter」，只是接的从模型换成了 Agent 干活要用的数据和工具：网站流量和外链、社交媒体、人和公司的信息、广告库、网页抓取。它的官网列出了 126 家供应商的 4100 多个接口。treg 最初是给 Superdesign 团队自己用的，代码在 GitHub 上开源，也可以自己部署。

用起来是这样：Agent 手里只有一个 treg 的 token（相当于一张储值卡的卡号，所有工具通用）。要干活时，它按任务去目录里搜，比如「找某个域名的营销负责人」，看到报价，再调用。你不用先去每家供应商注册、绑卡、订套餐。

技能（skill）是叠在上面的一层：一套打包好的操作说明。装一次，Agent 就知道怎么完成一整件事，比如找人、拆解一个对手的增长、检查 AI 的回答，而不是一次只会调一个接口。用过 Claude Code 技能的人对这个形式不陌生：一个文件夹里放着说明书，碰到这类活，Agent 自己去读。

[背景手把手教你给Claude装"技能"：Claude官方Skills创建指南 没写过技能的话，这篇讲清技能文件夹里有什么、怎么从零做一个阅读介绍文章 →](https://xiaohu.ai/article/claude-skills-official-guide/)

在 Agustin 看来，有四点让它适合团队自己内部用：

- **一份余额管所有技能。**不用每个工具买一个席位，也不用每家供应商订一个套餐。
- **按次付费。**他某天早上的 4 次调研调用，分别花了 $0.326、$0.00165、$0.0028 和 $0.0005。
- **没答案不收钱。**他第一次搜人，返回 0 行，花费 $0.00。
- **一家答不上，自动换下一家。**同样的数据常有好几家供应商在卖。他用 treg 搜人时，它跳过了 14 家答不了这个具体问题的供应商，换到能答的那家，省得你自己挨家去试。

**哪些调用会自动换家？**只有 treg 替你挑供应商的「路由接口」，名字以 treg. 开头，比如上面的搜人、后面的找邮箱，结果里会写明是哪家答的。其余接口由你自己指定用哪一家，答不上就是答不上。所以搜人、找邮箱、搜网页这类常见的活，treg 的说明建议优先让 Agent 走路由接口。

![treg 的用法和四个优点](https://pic.xiaohu.ai/jiedu-media/treg-gtm-agent/img01.jpg)

原文配图。上排是用法：你的 Agent（Claude Code、Codex、Cursor 或任何 MCP 客户端）→ 一个 treg token（按任务要、看价、调用）→ 一个技能（装一次）→ 一整件事做完。下排就是上面四点。

### 比订阅工具强在哪：为问题付钱，不为月份付钱

**便宜的查询真便宜；每次调用都告诉你是谁答的；技能代码公开，先读再跑。**

订阅制是先交月费，再看你用多少；treg 反过来，问一个问题付一次钱。研究型的活儿最吃这个差别：查一次对手的流量、翻一次广告库、问一次 ChatGPT，一个月可能就几回，却要为整月买单。

You pay for the question, not the month.你为问题付钱，不为月份付钱。

便宜的答案是真的便宜。开头小票里那几笔就是例子：100 条在投广告、一个 ChatGPT 回答连同 32 个来源，都不到一美分。

每次调用都写明是哪家答的、跳过了谁，结果不对能查到源头，哪家供应商不划算也有据可依。

技能都放在公开的代码仓库里。Agent 动手之前，你可以先把它要做的每一步读一遍。

![比订阅强的四点](https://pic.xiaohu.ai/jiedu-media/treg-gtm-agent/img03.jpg)

原文配图：为问题付钱不为月份付钱；便宜的答案真便宜；告诉你是哪家供应商答的；技能开源。

### 怎么搭起来：15 分钟，五步加一条规矩

**装 treg，装技能，给 Agent 一个带上限的 token，先手动跑一次真的，每次调用都记账；第一天再定一条：一张表就是 Agent 的记忆。**

Agustin 估计整个过程大约 15 分钟。不写代码的话，在 claude.ai 或 ChatGPT 里加一个连接器就能用（第一步后半）；那几条命令是给用 Claude Code、Codex、Cursor 的人的。

#### 第一步：装 treg

在 Claude Code、Codex 或 Cursor 里，用命令行安装，再登录：

安装 treg 命令行

```
curl -fsSL https://treg.to/install.sh | sh
```

登录

```
treg login
```

在网页版 claude.ai 或 ChatGPT 里，把这个地址添加为自定义连接器（custom connector，也就是 MCP 连接器）：

MCP 连接器地址

```
https://treg.to/mcp/
```

#### 第二步：装技能

三条命令任选一条。想一次装全部：

装全部技能

```
npx skills add superdesigndev/treg
```

只想装一个，比如找购买信号的 lead‑signals：

只装一个（以 lead-signals 为例）

```
npx skills add superdesigndev/treg --skill lead-signals
```

已经装好 treg 命令行的，也可以用它装同一套：

用 treg 命令行装

```
treg skill bootstrap --skills all
```

#### 第三步：给 Agent 一个单独的、带上限的 token

每次付费调用都带上单次花费上限：Agent 发请求时附带一个叫 `X-Treg-Route-Max-Cost` 的参数（技术上叫请求头），写明这次最多花多少。token 本身再设一个总额上限。Agent 哪天写错一个循环，也烧不穿你的余额。

#### 第四步：自动化之前，先手动跑一次真的

按任务去目录里搜工具，看清价格，拿 5 行数据跑一遍，人工逐条检查输出。这一步过了，再让它批量跑。

#### 第五步：每次调用都记账

记三样：用了哪个工具、花了多少、得到什么结果。他文章里的每个数字都出自这份记录，后面的「花费审计员」也靠它干活。

Log every call. Tool, cost, result. Every number in this article comes from my logs.每次调用都记下来：工具、花费、结果。这篇文章里的每个数字都来自我的日志。

#### 第一天就该定的规矩：一张表就是 Agent 的记忆

Agent 每次开新会话都不记得上次干过什么，表格不会忘。所以让所有 Agent 都往同一张表里写、从同一张表里读：上一个的产出，就是下一个的输入。Agustin 做内容的几个 Agent 就靠一张 Google 表格互相交接，从周五开始的短短几天里记了 468 条 X 和 LinkedIn 帖子，treg 一共花了 $0.28。

![搭建五步和第一天的规矩](https://pic.xiaohu.ai/jiedu-media/treg-gtm-agent/img02.jpg)

原文配图：五步，加右下角那条第一天的规矩「一张表 = 记忆，每个 Agent 都在那里读写」。

### 8 个机器人：各管一段，各有节奏

**分三组：看市场的 3 个，找人的 2 个，持续盯着的 3 个。每个都写清做什么、什么时候跑，附一段可直接粘贴的提示词。**

提示词可以粘进 Claude Code，或任何接上了 treg 的 Agent。每段提示词都放了英文原版和中文版，两份都能直接用；方括号里的内容换成你自己的。

![8 个机器人总览](https://pic.xiaohu.ai/jiedu-media/treg-gtm-agent/img04.jpg)

原文配图：蓝色一组看市场，橙色一组找人，黄色一组持续盯着；每格下面的标签是运行频率。本页图里「看市场」「持续盯」沿用蓝、黄，「找人」改用紫色，免得和表示花钱多、往下跌的红色混在一起。

#### 1. 增长拆解器（Growth Decoder）

一次调用，拉出一串对手每个月的流量，看它们在哪个月分道扬镳。流量分两种：自然流量（在搜索引擎里自然排上来带来的访问）和付费流量（买搜索广告带来的访问）。这类数据平时要订 Semrush 这类 SEO 工具才看得到。

看市场每月一次，做预算决定前加跑一次

**自然流量****+34%**搜索里自然排上来的访问，一年下来
**付费搜索流量****−77%**买搜索广告带来的访问，8 月到 10 月

*↓↓↓↓↓*5 家的付费搜索一家不落都在跌，各跌了 52% 到 97%

他的一次实测：**5 家公司、13 个月**，自然和付费流量一起拉，一次调用 **$0.126**。

两个数说的是两种流量：搜索上自然来的访问在涨，花钱买来的访问在缩，同时成立。只看自家后台，你分不清是自己一家在掉，还是整个赛道都在撤。把几家放在同一张表里按月对齐，转向发生在哪个月一目了然。

英文原版

```
Using treg, pull monthly organic and paid traffic estimates for [list of competitor domains] from [start month] to today in one call. Put it in a sheet with one row per domain per month. Then tell me, in 5 lines, which domains grew, which fell, and the month each one changed direction. Cap the call at $0.20.
```

中文版

```
用 treg，一次调用拉取 [竞品域名列表] 从 [起始月份] 到今天每个月的自然流量和付费流量估算。放进一张表，每个域名每个月一行。然后用 5 行告诉我：哪些域名涨了，哪些跌了，各自在哪个月掉头。这次调用的花费上限是 $0.20。
```

#### 2. 广告观察员（Ad Watcher）

从 Meta 广告资料库（Meta 公开的广告库，谁在 Facebook、Instagram 上投什么广告，任何人都能查）里拉出你这个品类正在投放的广告，按广告主归堆。

看市场每周一次

**31 条**来自同一家公司的 4 个地区主页其余 69 条来自其他广告主

他所在的细分市场：**100 条**在投广告，来自 **34 个**广告主，花了 **$0.00165**。这 100 条里有 40 条是 10 月才开始投的。

谁在砸钱、砸在哪个卖点上、最近是不是突然加码，都能从这张表里看出来。提示词最后一句专门让它标出本月新开 5 条以上广告的广告主，就是在抓这种加码。

英文原版

```
Using treg, pull up to 100 active Meta Ad Library ads for the keyword [category]. Drop advertisers that aren't in my market. Group the rest by advertiser: number of ads, start dates, call to action and the main promise in the copy. Flag anyone who started 5+ new ads this month.
```

中文版

```
用 treg，按关键词 [品类] 从 Meta 广告资料库拉取最多 100 条正在投放的广告。去掉不在我这个市场的广告主。剩下的按广告主分组：广告条数、开始投放日期、行动号召，以及文案里的主要卖点。本月新开了 5 条及以上广告的广告主，单独标出来。
```

#### 3. AI 答案检查员（AI Answer Checker）

它的另一个名字叫 AEO 工具包。AEO 是 answer engine optimization 的缩写，意思是想办法让 AI 的回答里提到你、引用你，和不少人说的 GEO 差不多是一回事。越来越多人买东西前先问 AI，AI 点了谁的名，谁就先进了候选名单。做法是拿买家会问的问题去问 ChatGPT，把它点名的品牌和引用的每一个来源都记下来。

看市场每周一次，问你的 10 到 20 个「赚钱的问题」

**10 个**是被推荐公司自己的页面**22 个**是评测站、对比页和博客

他问的是「现在最好的公司有哪些？」，一次 **$0.0028**，回答引用了 **32 个**来源。

这组数说明：至少在他问的这个问题上，AI 引用的大头是别人写的评测和对比，想被 AI 推荐，只改自家官网不够。所以提示词最后一步让它列出出现最多的 10 个第三方页面，告诉你该去哪里露脸。「赚钱的问题」指买家掏钱前会问的那种，比如「X 类工具哪家最好」。

英文原版

```
Using treg, ask ChatGPT these questions from [country]: [list]. For each answer, save the brands named, their order, and every cited source URL. Mark each source as our site, a competitor's site, or third party. Then list the 10 third-party pages that show up most, so I know where we need to be mentioned.
```

中文版

```
用 treg，以 [国家] 的用户身份向 ChatGPT 提这些问题：[问题列表]。每个回答都记下：点名了哪些品牌、排在第几、引用的每一个来源网址。把每个来源标成我们的网站、竞品的网站或第三方。最后列出出现次数最多的 10 个第三方页面，让我知道我们需要在哪些地方被提到。
```

[接着做Ranking on AI 创始人分享 GEO 操作指南：如何让 AI 推荐你的 SaaS 产品 拿到那 10 个第三方页面之后怎么办：换链话术、对比文写法和真实报价阅读介绍文章 →](https://xiaohu.ai/article/ai-visibility-playbook/)

#### 4. 找人（People Finder）

按公司域名和职位，找出每家公司里你该聊的人。

找人选定目标公司之后，绝不提前

**771**家公司
→ 按职位找人 →
**1,794**个人

他的一次批量运行找到的人数和公司数。

为什么非要等公司选定了再找？看市场那几步几分钱甚至不到一分钱，找人、找邮箱是要真花钱的环节。先用便宜的步骤把名单筛小，钱只花在剩下的公司上。提示词里那句「先不要查任何邮箱」也是这个道理：查邮箱单独收费，留到下一步，只对真要联系的人做。

英文原版

```
Using treg people search, find people at [domain] whose title includes [marketing / growth / partnerships]. Return name, title, seniority and LinkedIn. If nobody is director level or above, run a second search for seniority director, vp and c_level. Don't look up any emails yet.
```

中文版

```
用 treg 的人员搜索，找出 [域名] 这家公司里职位名称包含 [marketing / growth / partnerships] 的人。返回姓名、职位、职级和 LinkedIn。如果没有总监及以上级别的人，再按职级 director（总监）、vp（副总裁）和 c_level（C 级高管）搜第二次。先不要查任何邮箱。
```

#### 5. 邮箱查找和验证（Email Finder and Checker）

给留下来的每个人找到工作邮箱，再逐个验证能不能收信。

找人紧跟在第 4 步「找人」之后，只对真会联系的人跑

**找邮箱***$12.90*2,654 次调用，按他的数字算，平均每次不到 0.5 美分
**验证邮箱***$2.57*剔掉了 109 个无效地址

和上面找人是同一次批量运行。

验证这一步不贵，却能挡掉一百多封注定退信的邮件。提示词要求「什么都不删」：有风险的地址单独放一个标签页，留给人来判断。

英文原版

```
For each person in [sheet], find a work email with treg's routed email finder, then verify every address. Keep valid ones, put risky ones in their own tab, delete nothing. Set a per-call ceiling of $0.02 and stop if total spend passes $5.
```

中文版

```
对 [表格] 里的每个人，用 treg 的路由式邮箱查找工具找到工作邮箱，然后逐个验证。有效的保留，有风险的单独放一个标签页，什么都不要删。每次调用上限 $0.02，总花费超过 $5 就停。
```

**$5 封顶和他花的 $12.90 对得上吗？**对不上，因为不是一回事：提示词里的 $5 是一个示例总额上限，他那次跑了两千多次调用。名单越长，上限要跟着名单规模定。

#### 6. 信号监听（Signal Listener，技能名 lead‑signals）

盯住那些说明一家公司「正在找解决方案」的公开迹象：有人公开吐槽现在用的产品、关键岗位换了人、拿到融资、开始招人。

持续盯每天，盯你的目标公司

**他还没跑过这个技能**，这里没有他的实测数字。

提示词设了一道门槛：同一家公司一周内出现 3 条及以上信号才提醒，免得每条零星消息都来打扰你。

英文原版

```
Using treg's lead-signals skill, watch [list of companies] for new hires in marketing, funding news and public complaints about [competitor]. Add each signal to [sheet] with the date, the source link and one line on why it matters. Only alert me on 3+ signals for one company in a week.
```

中文版

```
用 treg 的 lead-signals 技能，盯住 [公司列表]：市场岗位的新入职、融资消息，以及公开吐槽 [竞品] 的内容。每条信号都加进 [表格]，写上日期、来源链接，再用一句话说明为什么重要。同一家公司一周内出现 3 条及以上信号时，才提醒我。
```

#### 7. 社媒侦察（Social Scout，用的是 treg 的社媒接口）

跟踪你这个领域的创作者和帖子，把表现异常好的挑出来。怎么算「异常好」：拿每条帖子和**这个作者自己**的中位数比。把他的帖子按浏览量从低到高排成一队，站在正中间那条的浏览量就是中位数，代表他平常的水平。大号的普通帖，浏览量也常常压过小号的爆款；各跟各的中位数比，小号的爆款才不会被埋掉。

持续盯做内容一天 4 次，做市场调研每周一次

示意图。他做内容的几个 Agent 用的就是这套社媒数据：几天里记了 **468 条**帖子，每条都和作者自己的中位数比过，一共花了 **$0.28**。

提示词把回复和转帖排除在外，只看原创帖。

英文原版

```
Using treg, pull the latest posts from [list of accounts] on X. Log every original post (no replies, no reposts) to [sheet] with views, likes, replies and bookmarks. Score each post against that author's median views and flag anything at 3x or more.
```

中文版

```
用 treg 拉取 X 上 [账号列表] 的最新帖子。每条原创帖（不要回复，不要转帖）都记进 [表格]，带上浏览、点赞、回复和收藏数。拿每条帖子的浏览量和该作者的浏览量中位数比，达到 3 倍及以上的标出来。
```

#### 8. 花费审计员（Spend Auditor）

读调用日志，给每个工具排名。排名看的不是每次调用多少钱，而是**每条有用结果花了多少钱**：有用结果就是你最后留在表里的那一行。一个工具单次很便宜，返回的却多半是用不上的行，摊到留下的那几行上，可能反而最贵。

持续盯跑完前 20 行一次，1,000 行一次，之后每周

整条是那一轮的全部花费；红色那段 **$11.49**，占 21%

他做过的一次审计：按每条留下的结果算，有 **5 个**付费工具在他这个细分市场里不值这个价。具体是哪 5 个，他没有列。

提示词让它从最差的排起，直接给出哪个该设上限、哪个该砍。

英文原版

```
Read [call log]. For each tool, show total spend, calls, and cost per usable result (a row I kept). Rank them worst first and tell me which to cap or cut.
```

中文版

```
读 [调用日志]。每个工具列出总花费、调用次数，以及每条有用结果的成本（有用结果＝我留下的那一行）。从最差的排起，告诉我哪些该设上限、哪些该砍掉。
```

treg 的仓库里还有几个技能，Agustin 还没拿来做 GTM：recruit 把一则招聘帖变成排好序的候选人名单，make‑ugc 做短视频，jev‑memory 让 Claude Code 记住你的偏好。

### 怎么串成一条流水线：接力写同一张表

**每个机器人单独跑通之后，再让它们在同一张表上接力：先挑公司，再看它们在哪赢，再找人，再等时机，最后对账。**

五棒接力，写的都是同一张表

**GTM 研究表**一张 Google 表格，所有 Agent 共用
1增长拆解器 + 广告观察员每月流量在投广告卖点挑出值得盯的公司
2AI 答案检查员AI 回答里的名次引用来源看它们在哪赢
3找人 + 邮箱查找和验证姓名、职位LinkedIn验证过的邮箱找到该聊的人
4信号监听信号日期来源链接知道什么时候找
5花费审计员读调用日志最后对账：哪个工具该限额、该砍
公司联系人有风险的邮箱调用日志

示意图。表里的列和标签页按 8 段提示词要写的东西整理；表格本身由你建。

串起来有两条规矩。**先便宜，后付费：**几分钱的查询先把名单筛小，找人找邮箱这种贵的步骤只花在剩下的人身上。**长链别在笔记本上跑：**放到服务器上，或一直在线的云端 Agent 里。一条链要跑几千次调用，笔记本一合盖、一休眠，跑到一半就断了。

[对照Grok Bot 企业 GTM 指南：客户专家、媒体周报与会议中的演示文稿 另一套 GTM Bot 的做法：Agent 有一台 24 小时在线的云端电脑，人下班了它还在跑夜间背调阅读介绍文章 →](https://xiaohu.ai/article/grok-bot-for-gtm/)

社媒侦察不在这条链上，它另跑一路：做内容一天 4 次，做市场调研每周一次。整条链跑起来之前，前面那几条纪律都得先到位：单次上限、总额上限、每次记账。

![原文的串链图](https://pic.xiaohu.ai/jiedu-media/treg-gtm-agent/img05.jpg)

原文配图：同一条链，底下是「全在一张表上」和两条规矩。

### 一年 $6,384 的订阅换成按次付费，省不省看你跑多大的量

**订阅栈一行没跑就是每月 $532；按次付费的账，取决于你跑多大的量。**

Agustin 拿来对比的是常见的那套订阅工具：

![原文封面：Clay、Apollo、Hunter、Brand24 加起来等于一大笔钱](https://pic.xiaohu.ai/jiedu-media/treg-gtm-agent/cover.jpg)

原文封面。四个图标从左到右是 Clay、Apollo、Hunter、Brand24，加起来是一大笔钱。

- **Clay Launch，$185/月**：把多个数据源拼在一起，给销售线索补全公司和联系人信息。
- **Apollo Basic，$49/月起**：B2B 联系人数据库，带邮件外联。
- **Hunter Starter，$49/月起**：查找和验证工作邮箱。
- **Brand24 Individual，$249/月（按月付）**：监测网上和社交媒体上谁在提你的品牌。

合计每月 $532，一年 $6,384。（文章开头估的是一年约 $7,000，结尾逐项算出的是 $6,384，本文用后者。）

**他的账本**调用日志里最贵的几笔

**找邮箱***$12.90*一次批量运行，2,654 次调用
**5 个不值的付费工具***$11.49*花费审计员查出来的，占那一轮花费的 21%；按这个比例倒推，那一轮总花费在 $55 上下
**验证邮箱***$2.57*剔掉 109 个无效地址
**内容 Agent 记 468 条帖子***$0.28*几天的量

**$6,384**订阅栈一年的最低门槛
**$0.38**17 家公司一整年的流量

两边比的不是同一样东西。左边是订阅的最低门槛，原话是「一行数据还没跑」就要付的钱；右边是他按自己用量跑出来的账，大批量找人找邮箱，一轮就是几十美元。按次付费最占便宜的，是「偶尔问一次」的研究：查一次流量、翻一次广告库、问一次 ChatGPT，花几分钱甚至不到一分钱。名单一长、天天在跑，钱要靠那几条纪律管住。

还有一层：Clay、Apollo 这类订阅工具卖的不只是数据，还有现成的界面、流程和团队协作。换成 Agent，这些要你自己用提示词和一张表搭出来。8 段提示词和那张表，就是 Agustin 搭出来的样子。

不必一上来就搭满 8 个。挑一个你每月只用两三回、却一直按月付费的查询，让 Agent 用 treg 跑一次，记下花了多少、留下几行。这张小票会告诉你，那份月费还值不值得续。

### 给动手的人：treg 自己的说明里几条有用的补充

以下来自 treg 在 GitHub 上的说明文档，不在 Agustin 的文章里。

- Claude Code 里也能当插件装：先 `/plugin marketplace add superdesigndev/treg`，再 `/plugin install treg@treg`，然后在 `/mcp` 里选 treg 登录。
- 第四步「按任务搜目录、看价格」用的命令：`treg catalog search "find a work email"` 按要做的事搜工具；`treg catalog get <工具名>` 看参数、价格和返回示例；`treg balance` 看还剩多少、最近花了多少。
- 新验证的账户在创建符合条件的团队时，一次性送 $1 额度。
- 你自己已经付费的供应商账号可以接进 treg，走自己 key 的调用不从 treg 余额里扣。

来源How To Build an In-House GTM Agent on treg (every skill + prompts)Agustin (@agustingrowth)·2026-11-08·[查看主材料](https://x.com/agustingrowth/status/2119444106334101617)延伸[treg 官网](https://treg.to/)·[treg 技能仓库 superdesigndev/treg](https://github.com/superdesigndev/treg)

GTM 研究 · treg · 按次付费的 Agent

## 在 treg 上自建 GTM 研究 Agent：8 个机器人、一张表、问一次付一次

常见做法是每个问题配一套按月收费的工具，最低档加起来每月 $532。Agustin 用的是一个 Agent 加一份 treg 余额：某天早上拉 17 家公司一整年的流量，花了 $0.38。

先看为什么换 → treg 怎么计费 → 核心是那条「先便宜、后付费」的接力链 → 最后算账

01 · 起因

### 为什么要换：一个问题一份月费

想摸清一个赛道，要回答的问题就那几个：几家对手这一年流量是涨是跌，谁在 Facebook、Instagram 上猛投广告，买家问 ChatGPT「哪家最好」时 AI 点了谁的名，对方管市场的是谁、邮箱多少，什么时候找上门最合适。

老办法是每个问题配一个按月收费的工具。常见那几家的最低档加起来每月 $532，一行数据还没跑就得先付，哪怕这个月只查了两回。

$532/月常见订阅栈的最低档，一行没跑就要付（不是他的旧账单）
$0.38某天早上拉 17 家公司一整年的流量
$0.00第一次搜人返回 0 行，不收钱

Agustin（X 上的 @agustingrowth）换了个做法：一个 Agent，加一个 treg 账户里的余额，用到哪个工具就付哪一次的钱。他把这套自家养的 GTM（go-to-market，把产品推向市场、找到买家的那一整套活）研究 Agent 写成长文：8 个机器人各管一件事，每个附可直接粘贴的提示词，最后串成一条流水线。

02 · 计费方式

### treg 是什么：一份余额接上几千个工具

**它把各家数据工具接到同一个入口，Agent 按任务找工具、看报价、调用，钱从同一份余额里扣。**

做 AI 应用的人常用 OpenRouter：一个账户、一个接口调用各家大模型。treg 自称「工具版的 OpenRouter」，接的换成了 Agent 干活要用的数据和工具：网站流量和外链、社交媒体、人和公司的信息、广告库、网页抓取。官网列出 126 家供应商的 4100 多个接口。它最初是 Superdesign 团队自用的，代码在 GitHub 上开源，也能自己部署。

Agent 手里只有一个 treg token，相当于一张所有工具通用的储值卡卡号。要干活时按任务去目录里搜，比如「找某个域名的营销负责人」，看到报价再调用；你不用挨家注册、绑卡、订套餐。

1. **你的 Agent**Claude Code、Codex、Cursor 或任何 MCP 客户端
2. **一个 treg token**所有工具通用的储值卡号
3. **按任务找工具**搜目录 → 看报价 → 调用
4. **同一份余额**问一次，扣一次

同样的数据常有好几家供应商在卖。他用 treg 搜人时，它跳过了 14 家答不了这个具体问题的供应商，换到能答的那家，不用你自己挨家去试。

技能（skill）叠在上面一层：一套打包好的操作说明，装一次，Agent 就会完成一整件事，比如找人、拆解对手的增长、检查 AI 的回答，而不是一次只会调一个接口。用过 Claude Code 技能的人对这个形式不陌生。

Agustin 认为适合团队内部用的四点

某天早上 · 4 次调研调用（和拉 17 家流量那次不是同一批）
调用 1$0.326
调用 2$0.00165
调用 3$0.0028
调用 4$0.0005
另一次：第一次搜人 · 返回 0 行$0.00

- **一份余额管所有技能：**不用每个工具买席位，也不用每家供应商订套餐。
- **便宜的答案真便宜：**100 条在投广告、一个 ChatGPT 回答连同 32 个来源，都不到一美分。
- **没答案不收钱：**他第一次搜人返回 0 行，花费 $0.00。**走路由接口的调用答不上会自动换下一家**，比如 treg. 开头的搜人、找邮箱；其余接口由你指定哪一家，答不上就是答不上。
- **查得到源头：**走路由接口的调用会写明是哪家答的、跳过了谁；技能代码公开，Agent 动手前你可以先读它要做的每一步。

03 · 搭建

### 搭起来：15 分钟，五步，先把护栏装好

Agustin 估计大约 15 分钟。用 Claude Code、Codex、Cursor 的人走命令行；不写代码的，在 claude.ai 或 ChatGPT 里把 treg 加成自定义连接器（MCP 连接器）就能用。五步里后三步不是在装东西，而是在防 Agent 乱花钱。

1. 1**装 treg。**命令行安装并登录，或在网页版加连接器。
2. 2**装技能。**一次装全部，或只装一个，比如找购买信号的 lead‑signals。
3. 3**给 Agent 一个单独的、带上限的 token。**每次付费调用带上 `X-Treg-Route-Max-Cost` 请求头，写明这次最多花多少；token 本身再设总额上限。Agent 哪天写错一个循环，也烧不穿你的余额。
4. 4**自动化之前，先手动跑一次真的。**搜目录、看清价格、拿 5 行数据跑一遍，人工逐条检查输出，过了再批量。
5. 5**每次调用都记账。**记用了哪个工具、花了多少、得到什么结果。他文章里的每个数字都出自这份记录，后面的花费审计员也靠它干活。

**第一天就定的规矩：一张表就是 Agent 的记忆。**Agent 每次开新会话都不记得上次干过什么，表格不会忘。所有 Agent 往同一张表里写、从同一张表里读：上一个的产出，就是下一个的输入。Agustin 做内容的几个 Agent 靠一张 Google 表格交接，从周五开始的几天里记了 468 条 X 和 LinkedIn 帖子，treg 一共花了 $0.28。

04 · 核心机制

### 核心：8 个机器人，在同一张表上接力

8 个机器人分三组：看市场的 3 个，找人的 2 个，持续盯着的 3 个。每个先单独跑通，再串起来。顺序不是随便排的：看市场那几步几分钱到几毛钱，广告库、ChatGPT 查询不到一分钱；找人、找邮箱才是真要花钱的环节，一轮找邮箱他花了 $12.90（2,654 次）。所以先用便宜的步骤把名单筛小，钱只花在剩下的公司和人身上。

接力顺序 · 先便宜，后付费
先挑公司，再看它们在哪赢，再找人，再等时机，最后对账。

同一张表 · 上一个的产出 = 下一个的输入

1. 挑公司再看它们在哪赢**看市场 · 3 个**增长拆解器：一次调用拉出几家对手每月的自然流量和付费流量，看它们在哪个月分道扬镳。广告观察员：从 Meta 广告资料库拉出品类在投广告，按广告主归堆。AI 答案检查员（AEO 工具包，AEO 指让 AI 的回答提到你、引用你）：拿买家会问的问题去问 ChatGPT，记下点名的品牌和每个引用来源。几分钱到几毛钱，有的不到一分钱
2. 再找人名单已经筛小**找人 · 2 个**找人：按公司域名和职位找出该聊的人，这一步先不查任何邮箱。邮箱查找和验证：给留下来的每个人找工作邮箱，再逐个验证能不能收信。真花钱：只花在剩下的人身上
3. 再等时机**持续盯 · 信号监听 lead‑signals（他还没跑过）**盯公开吐槽现用产品、关键岗位换人、拿到融资、开始招人这些「正在找解决方案」的迹象；同一家公司一周内 3 条及以上信号才提醒。门槛：一周 ≥ 3 条
4. 最后对账**持续盯 · 花费审计员**读调用日志，按每条有用结果的花费给工具排名，从最差的排起，直接说哪个该设上限、哪个该砍。依据：第 5 步的调用记录

条形只示意「便宜 / 真花钱」的相对关系，不按实际金额画比例。

**先便宜，后付费**几分钱到几毛钱的查询先把名单筛小，找人找邮箱这种贵的步骤只花在剩下的人身上。
**长链别在笔记本上跑**一条链要跑几千次调用，笔记本一合盖、一休眠，跑到一半就断；放到服务器或一直在线的云端 Agent 里。

第 8 个，社媒侦察，不在这条链上，另跑一路：做内容一天 4 次，做市场调研每周一次。

整条链跑起来之前，前面那几条纪律都得先到位：单次上限、总额上限、每次记账。

05 · 提示词里的判断

### 拆开看：每个机器人里藏着一条判断

提示词有英文原版和中文版，全文在正文第四节，都能直接粘进 Claude Code 或任何接上 treg 的 Agent，方括号里的内容换成你自己的。比提示词本身更值得带走的，是每段里写进去的判断：

增长拆解器看市场
自然流量在涨、付费流量在缩，可以同时成立。只看自家后台，分不清是自己一家在掉，还是整个赛道都在撤；几家放进同一张表按月对齐，转向发生在哪个月一目了然。
广告观察员看市场
专门标出本月新开 5 条以上广告的广告主，抓的就是「最近突然加码」。
AI 答案检查员看市场
至少在他问的那个问题上，AI 引用的大头是别人写的评测和对比。想被 AI 推荐，只改自家官网不够，所以最后列出出现最多的 10 个第三方页面：该去哪里露脸。
邮箱查找和验证找人
验证这一步不贵，却能挡掉一百多封注定退信的邮件。什么都不删：有风险的地址单独放一个标签页，留给人来判断。
社媒侦察持续盯
每条帖子跟**这个作者自己**的浏览量中位数（他平常的水平）比。大号的普通帖常常压过小号的爆款，各比各的，小号的爆款才不会被埋掉。回复和转帖不算，只看原创帖。
花费审计员持续盯
看**每条有用结果**（最后留在表里的那一行）花多少钱，而不是每次调用多少钱。一个工具单次很便宜，返回的却多半是用不上的行，摊到留下的那几行上，可能反而最贵。

treg 仓库里还有几个技能，Agustin 还没拿来做 GTM：recruit 把招聘帖变成排好序的候选人名单，make‑ugc 做短视频，jev‑memory 让 Claude Code 记住你的偏好。

06 · 对账

### 账怎么算：一年 $6,384，比的是门槛

Agustin 拿来对比的是常见那套订阅工具的最低档：

| Clay Launch拼多个数据源，给销售线索补全公司和联系人信息 | $185/月 |
| --- | --- |
| Apollo BasicB2B 联系人数据库，带邮件外联 | $49/月起 |
| Hunter Starter查找和验证工作邮箱 | $49/月起 |
| Brand24 Individual监测网上和社交媒体上谁在提你的品牌（按月付） | $249/月 |
| 合计 · 一年 | $532/月 · $6,384 |

文章开头估的是一年约 $7,000，结尾逐项算出 $6,384，这里用后者。

但两边比的不是同一样东西。$532 是「一行数据还没跑」就要付的门槛；按次付费的账取决于你的用量：查一次流量几毛钱，翻一次广告库、问一次 ChatGPT 不到一分钱；大批量找人找邮箱，一轮就是几十美元。按次付费最占便宜的，是偶尔问一次的研究；名单一长、天天在跑，钱要靠那几条纪律管住。

你的用量更像：偶尔问一次名单长、天天跑
**偶尔问一次：**按次付费最占便宜。研究型的活一个月可能就几回，订阅却要为整月买单；换成按次，几笔查询花几分钱到几毛钱。
**名单长、天天跑：**省不省要看量。大批量找人找邮箱一轮就是几十美元。钱得靠单次上限、总额上限、每次记账这几条纪律管住。

还有一层：Clay、Apollo 这类订阅卖的不只是数据，还有现成的界面、流程和团队协作。换成 Agent，这些要你自己用提示词和一张表搭出来；那 8 段提示词和那张表，就是 Agustin 搭出来的样子。

**不必一上来就搭满 8 个。**挑一个你每月只用两三回、却一直按月付费的查询，让 Agent 用 treg 跑一次，记下花了多少、留下几行。这张小票会告诉你，那份月费还值不值得续。

07 · 补充

### 动手前的几条补充

以下来自 treg 在 GitHub 上的说明文档，不在 Agustin 的文章里。

- Claude Code 里可以当插件装：先 `/plugin marketplace add superdesigndev/treg`，再 `/plugin install treg@treg`，然后在 `/mcp` 里选 treg 登录。
- 第四步用的命令：`treg catalog search 'find a work email'` 按要做的事搜工具；`treg catalog get <工具名>` 看参数、价格和返回示例；`treg balance` 看还剩多少、最近花了多少。
- 新验证的账户在创建符合条件的团队时，一次性送 $1 额度。
- 你已经付费的供应商账号可以接进 treg，走自己 key 的调用不从 treg 余额里扣。

原文版权归原作者，这里只供对照阅读。 [看原网页 ↗](https://x.com/agustingrowth/status/2119444106334101617)

## How To Build an In-House GTM Agent on treg (every skill + prompts)

![](https://pbs.twimg.com/media/HWnD-gmWEAAmQB6.jpg)

This morning my GTM agent pulled 1 YEAR of traffic from 17 companies for $0.38.

What I'm about to share is how to run your whole GTM research in-house, with one agent and one treg balance, instead of paying $7,000/yr in subscriptions.

Bookmark so you save the prompts attached at the end of each section.

### I. What treg Skills Actually Are

![](https://pbs.twimg.com/media/HWnERr9WkAAoMTd.jpg)

treg (treg.to) calls itself "OpenRouter, but for agent tools." Your agent holds one token, asks for a job, reads the price and calls it.

A skill is a packaged set of instructions on top of that. You install it once and your agent knows how to do a whole job (find people, decode a competitor's growth, check AI answers) instead of one API call at a time.

A few things make them useful for an in-house team:

1. One balance for every skill. No seat per tool, no plan per vendor.
2. Pay per call. My 4 research calls this morning cost $0.326, $0.00165, $0.0028 and $0.0005.
3. Empty answers are free. My first people search returned 0 rows and cost $0.00.
4. Routed tools fall back. treg.people.search skipped 14 providers that couldn't answer that exact question before one did.

### II. How to Set It Up

![](https://pbs.twimg.com/media/HWnEWjjWYAApIDt.jpg)

This takes about 15 minutes.

Install treg. In Claude Code, Codex or Cursor: curl -fsSL https://treg.to/install.sh | sh, then treg login. In claude.ai or ChatGPT, add https://treg.to/mcp/ as a custom connector.

Install the skills. All of them: npx skills add superdesigndev/treg. Or one at a time: npx skills add superdesigndev/treg --skill lead-signals. The treg CLI does the same with treg skill bootstrap --skills all.

Give the agent its own token with a cap. A per-call ceiling header (X-Treg-Route-Max-Cost) on every paid call, and a cap on the token.

Make one real call before you automate anything. Search the catalog by job, read the price, run it on 5 rows, check the output by hand.

Log every call. Tool, cost, result. Every number in this article comes from my logs.

1 rule I'd set on day 1: one sheet is the agent's memory.

My content agents hand work to each other through one Google Sheet, and since Friday they've logged 468 X and LinkedIn posts for $0.28 of treg spend.

### III. What It Does Well

![](https://pbs.twimg.com/media/HWnGLlmXkAAg2In.jpg)

Where it's clearly better than a subscription stack:

You pay for the question, not the month.

Cheap answers are really cheap. 100 live Meta ads for one keyword cost $0.00165. One ChatGPT answer with all 32 of its sources cost $0.0028.

It shows its work. Every routed call tells you which provider answered and which ones it skipped and why.

It's open source. The skills are in a public repo, so you can read exactly what your agent will do before it does it.

### IV. The GTM Bots I Run on It

![](https://pbs.twimg.com/media/HWnEbHEXoAA5AX6.jpg)

Each one has what it does, when it runs, and a prompt you can paste into Claude Code or any agent with treg connected.

**1. Growth Decoder**

What it does: Pulls monthly traffic for a list of competitors in one call and shows where they diverged. For 5 companies it pulled 13 months, organic and paid, for $0.126. Organic grew 34% from Oct 2025 to Oct 2026. Paid search fell 77% from August to October, and every one of the 5 dropped (52% to 97%).

When it runs: Monthly, plus before any budget decision.

Prompt: "Using treg, pull monthly organic and paid traffic estimates for [list of competitor domains] from [start month] to today in one call. Put it in a sheet with one row per domain per month. Then tell me, in 5 lines, which domains grew, which fell, and the month each one changed direction. Cap the call at $0.20."

**2. Ad Watcher**

What it does: Pulls the live Meta ads for your category and groups them by advertiser. My niche returned 100 active ads from 34 advertisers for $0.00165. One companie's 4 regional pages ran 31 of them, and 40 of the 100 started in October.

When it runs: Weekly.

Prompt: "Using treg, pull up to 100 active Meta Ad Library ads for the keyword [category]. Drop advertisers that aren't in my market. Group the rest by advertiser: number of ads, start dates, call to action and the main promise in the copy. Flag anyone who started 5+ new ads this month."

**3. AI Answer Checker (AEO Toolkit)**

What it does: Asks ChatGPT the question your buyer asks and logs every source it cites. "What are the best companies right now?" cost $0.0028 and came back with 32 sources. Only 10 were pages their own. The other 22 were review sites, comparison pages and blogs.

When it runs: Weekly, on your 10 to 20 money questions.

Prompt: "Using treg, ask ChatGPT these questions from [country]: [list]. For each answer, save the brands named, their order, and every cited source URL. Mark each source as our site, a competitor's site, or third party. Then list the 10 third-party pages that show up most, so I know where we need to be mentioned."

**4. People Finder**

What it does: Finds the people at each company, by domain and title. In my Nov 4 run it found 1,794 people at 771 companies.

When it runs: After you've picked the companies, never before.

Prompt: "Using treg people search, find people at [domain] whose title includes [marketing / growth / partnerships]. Return name, title, seniority and LinkedIn. If nobody is director level or above, run a second search for seniority director, vp and c_level. Don't look up any emails yet."

**5. Email Finder and Checker**

What it does: Finds and verifies a work email for each person you kept. In my Nov 4 run the finder cost $12.90 for 2,654 calls and the checker removed 109 bad addresses for $2.57.

When it runs: Right after People Finder, only on the people you'll actually contact.

Prompt: "For each person in [sheet], find a work email with treg's routed email finder, then verify every address. Keep valid ones, put risky ones in their own tab, delete nothing. Set a per-call ceiling of $0.02 and stop if total spend passes $5."

**6. Signal Listener (lead-signals)**

What it does: Watches public signals that mean a company is in market: complaints, job changes, funding, hiring. I haven't run this skill yet, so no numbers from me.

When it runs: Daily, on your target accounts.

Prompt: "Using treg's lead-signals skill, watch [list of companies] for new hires in marketing, funding news and public complaints about [competitor]. Add each signal to [sheet] with the date, the source link and one line on why it matters. Only alert me on 3+ signals for one company in a week."

**7. Social Scout (Social API)**

What it does: Tracks creators and posts in your niche and flags the outliers. My content agents run on the same social data through treg: 468 posts logged since Friday, each scored against its own author's median, for $0.28 total.

When it runs: 4 times a day for content, weekly for market research.

Prompt: "Using treg, pull the latest posts from [list of accounts] on X. Log every original post (no replies, no reposts) to [sheet] with views, likes, replies and bookmarks. Score each post against that author's median views and flag anything at 3x or more."

**8. Spend Auditor**

What it does: Reads the call log and ranks every tool by cost per usable result, not cost per call. On Nov 4 this found five paid tools that didn't earn their place for my niche: $11.49, 21% of spend.

When it runs: After the first 20 rows, after 1,000, then weekly.

Prompt: "Read [call log]. For each tool, show total spend, calls, and cost per usable result (a row I kept). Rank them worst first and tell me which to cap or cut."

The other skills, in one line each: recruit turns a job post into a ranked shortlist, make-ugc makes short videos, and jev-memory gives Claude Code a memory of your preferences. I haven't run them for GTM yet.

### V. Chain Them Together

![](https://pbs.twimg.com/media/HWnEd7MXoAEF2e2.jpg)

Once each bot works alone, run them as one chain on one sheet: Growth Decoder and Ad Watcher pick the companies worth watching, AI Answer Checker shows where they're winning, People Finder and Email Finder find who to talk to, Signal Listener tells you when. Spend Auditor reads the log at the end.

Two rules hold it together. Cheap first, then the paid step. And never run a long chain on a laptop, put it on a server or a cloud agent that stays awake.

### I just saved you $6.3k/yr

For comparison, the subscription floor of the usual stack is $532 a month before a single row runs: Clay Launch $185, Apollo Basic from $49, Hunter Starter from $49 and Brand24 Individual $249 billed monthly.

That's $6,384 a year.

If there's something here you find helpful, send me a DM and I can help you set it up (for free, I don't sell courses lol).

You're welcome.

↑ 正文结束
✓ 本篇全文免费开放

读完还有疑问？会员每天能问小互 30 次，每句带出处；还有一份按你口味挑好的每日 AI 日报。
[成为会员 $59/年](https://xiaohu.ai/buy/?plan=year&slug=treg-gtm-agent&from=tail)[按月 $6.99](https://xiaohu.ai/buy/?plan=monthly&slug=treg-gtm-agent&from=tail)

7 天内不满意全额退 · [看会员能多什么 →](https://xiaohu.ai/membership/)

[阅读原文 ↗](https://x.com/agustingrowth/status/2119444106334101617)

📮 新解读每晚进邮箱

读完觉得有用？留个邮箱，每晚一封当天的新解读，随时退订。
