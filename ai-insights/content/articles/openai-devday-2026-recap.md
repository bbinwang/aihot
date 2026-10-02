---
title: "OpenAI DevDay 2026 的 25 项更新：会自己干活的 Dots、五分之一价的新模型、500 美元的 Pro"
date: 2026-09-30T00:00:00.000Z
tags: ["产品发布", "OpenAI", "DevDay", "Dots", "GPT-6.1 Sol", "Codex", "Agent", "聚合"]
summary: "会自己干活的 Dots、五分之一价格的 GPT-6.1 Sol、搬上云的 Codex：OpenAI 这次想接手的，是 AI 回答完之后的那些活。25 项更新逐个拆开，哪些现在能用、要花多少钱，一次看清。"
---
> **原文链接**: [https://openai.com/zh-Hans-CN/index/devday-2026-recap/](https://openai.com/zh-Hans-CN/index/devday-2026-recap/)
> **来源**: OpenAI
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/openai-devday-2026-recap/) · 2026/9/30
> **说明**: 本文由 AIHot 自动聚合(原文即中文,未翻译)。上游原文抓取失败,正文取自小互 AI 解读

---

OpenAI 在昨天的 DevDay 上，一口气公布了 25 项重大更新：能持续替你跟进工作的个人 Agent Dots、更便宜的 GPT-6.1 Sol、提速的 Ultrafast，以及重新设计的 Codex 云端体验。

其中最让人想试的，是你离开之后，AI 还能做多少事。合上电脑，Codex 的云端任务继续跑；不用每次重新交代背景，Dot 可以接着跟进项目；写好的文档也有了共享、编辑和交给同事接着做的地方。OpenAI 想让用户交给 AI 的工作，持续到聊天窗口之外。

模型升级同样有看头。按 OpenAI 的评测，GPT-6.1 Sol 在部分编程和专业任务上接近 Astra，标准输入、输出单价却只有它的五分之一。Ultrafast 则走了另一条路：多付钱，换更短的生成等待时间。前者要让复杂任务做得起，后者要让高频使用的人少等一会儿。

这批更新还包括团队文档、会议记录、插件，以及把 ChatGPT 订阅额度带到第三方工具里的新用法。不过，有的已经开放，有的仍在预览或等待推送。下面按官方的 25 项清单逐一展开：分别能做什么、谁能用、要花多少钱，以及哪些变化值得现在就试。

![大屏：每周 12 亿人使用 ChatGPT](https://best.xiaohu.ai/media/openai-devday-2026-recap/kn-12b-weekly.webp)

Altman 讲分发时的大屏：每周 12 亿人使用 ChatGPT，这是 OpenAI 敢把 ChatGPT 做成平台的底气（图：OpenAI 发布会现场）

### 主动智能：一直在线的 Agent、更便宜的模型、更快的速度

#### 1. Dots：一个不下班的 AI 同事

**Dots 是 ChatGPT 里新出的常驻 Agent。** 你给它一个目标、划好权限，它就自己一直做下去，不用你一句一句地问。每个人可以给自己的 Dot 取名字。

[视频/音频](https://best.xiaohu.ai/media/openai-devday-2026-recap/dots-film-bilingual.mp4)

OpenAI 的 Dots 宣传片（中英双语字幕，约 2 分半）：一个 Dot 在一个人的一天里，同时照看工作和生活

![Dots 的几种卡通形象](https://best.xiaohu.ai/media/openai-devday-2026-recap/kn-dots-characters.webp)

每个 Dot 都是一个可以自己挑、自己取名的小角色：戴贝雷帽的蓝色云朵、戴眼镜打领结的黄色三角、绿色青蛙等（图：OpenAI 发布会现场）

先看它怎么工作：

- **有自己的电脑。** 每个 Dot 有独立的云端电脑和浏览器，能写代码、测代码。你可以随时打开它的电脑看它在干什么，甚至接管其中一步再交还给它；除非你主动授权，它碰不到你自己的笔记本。
- **接得到你的软件。** 通过插件，它能连 4000 多款应用。在 ChatGPT（网页、手机、桌面）、Slack、Teams 里都能找它，也能给它打语音电话，短信渠道很快也会开。不管从哪个渠道找它，上下文都是连着的。
- **由 GPT-6 Astra 驱动。** [Astra](https://best.xiaohu.ai/article/gpt-6-astra/) 是 OpenAI 目前最强的模型。

[视频/音频](https://best.xiaohu.ai/media/openai-devday-2026-recap/dots-codex.mp4)

Dot 在自己的云端电脑和浏览器里干活，你随时可以打开看（约 17 秒）

[视频/音频](https://best.xiaohu.ai/media/openai-devday-2026-recap/dots-channels.mp4)

在短信里让 Dot 补全晚餐方案和费用估算（约 28 秒）

交给它的最好是一份长期职责，比如：

- **开发者：** 盯着客户反馈里反复出现的需求，自己划出小改进和 bug 修复的范围，写完、测完，把附着改动演示视频的 PR 交给你审。
- **科学家：** 新数据一到，重跑分析、追查意外结果、更新论文里的图表，并标出要你看的地方。
- **销售负责人：** 对照产品文档核对客户需求，给关键集成做概念验证，随需求变化更新提案。
- **内容创作者：** 收到访谈文字稿，挑出适合剪的片段、写节目笔记，起草社交媒体帖子等你批。

![开发者场景：一个 Dot 在整理 iOS 测试版检查清单的问题](https://best.xiaohu.ai/media/openai-devday-2026-recap/dots-feedback.webp)

开发者场景：Dot 一边和你对话，一边在自己的电脑里处理 iOS 测试版检查清单里的问题（图：OpenAI）

![销售场景：一个 Dot 在讨论企业客户提案](https://best.xiaohu.ai/media/openai-devday-2026-recap/dots-proposal.webp)

销售场景：对话一侧是客户需求的变化，另一侧的文档列出促成交易的下一步（图：OpenAI）

![科学家场景：一个 Dot 在讨论重复试验的发现](https://best.xiaohu.ai/media/openai-devday-2026-recap/dots-analysis.webp)

科学家场景：Dot 汇报重复试验的结果，旁边是邮件草稿和对比图表（图：OpenAI）

Altman 在台上挑了一个难的例子：在旧 API 关停之前把 app 迁出去。旧 API 的调用可能散落在整个代码库里，Dot 会顺着依赖关系找出所有要改的地方，写代码、跑测试，最后提 PR 给团队审。按老办法，这得几个人花不少时间。

现场演示由 OpenAI 产品团队的 Holly Li 来做。她用一个虚构的歌单 app 模拟上线前一天，她的 Dot 叫 Dottie：

- 早上 Dottie 已经把要她看的事理好了：发布评审提前了，日历改好了；昨晚测试用户的反馈看完了；设计临时改了一版首页，设计稿直接推到她手机上。
- 在 Slack 里，同事随手一个 @ 常常会变成一整个项目，她现在直接把讨论串转给 Dottie，一句"你能接一下吗"就交出去。OpenAI 内部甚至出现了一个新习惯：建群聊时先把各自的 Dot 拉进来。
- 她说 OpenAI 工程师的 Dots 每天会修几十个 bug：有人在反馈频道贴一个会话 ID 和用户报的问题，Dot 接手调查，提修复 PR。

演示也翻了车：她问 Dottie 昨晚用户测试的结果，它一直回"还在查"；让它调用笔记本上的 Codex 把新首页做成 iPhone 模拟器里的 app，第一次报错，重试后时间到了也没跑完。

![Holly Li 演示 Dottie 能接触的渠道](https://best.xiaohu.ai/media/openai-devday-2026-recap/kn-dottie-surfaces.webp)

Holly Li 的 Dot 叫 Dottie，大屏列出它能碰到的地方：ChatGPT、Slack、Teams、电话、电脑、虚拟机、手机 app 和插件（图：OpenAI 发布会现场）

它会自己动手，所以控制是 Dots 最要紧的部分：

- 你决定它能访问哪些应用，并设规则：哪些事它可以自己做，哪些必须先问你，哪些永远不许做。
- 没人找它时，它会在后台"主动研究"，找能帮上忙的地方，但这一步只用**只读**工具，不能发消息、不能改内容、不能操作你的浏览器或电脑。
- 会动你账户或往外发信息的操作，先过一道自动审核；改密码这类敏感事，永远得你本人来。登录网站时它能用你存的密码，但密码不会暴露给模型。
- 有一个活动视图，能看它的进度，包括后台在做的事。

价格方面，首个 Dot 含在 Pro（包括 100 美元档）和 Business Premium 套餐里，不另收费，上线首月额度更高；和它聊天不占 ChatGPT 额度，但它替你在 Codex 或 ChatGPT 工作里开的任务照常计。Enterprise 要等管理员打开测试版。首批只能在桌面端创建，Pro 用户里欧洲经济区、英国和瑞士暂时不在首批。

企业还有更进一步的形态，叫**专职 Dot**：不替某个人干活，而是在公司里担一个岗位，有独立身份、凭据和系统权限。OpenAI 内部已经在采购、发票处理、邮件营销、客服、合同签订这些岗位上试过。现在是小范围企业试点，OpenAI 的工程师直接和企业一起定义职责、工具和审批流程；微软那边会把它接进 Agent 365，企业可以用现有的微软工具来管。

我的看法是，Dots 的形态和 Meta 最近的 Muse 很像，连取名字、卡通头像都像；它的很多能力，懂行的人之前用 Codex 之类的 Agent 框架也搭得出来，Dots 做的是把这些打包成普通人不用配置就能用的产品。好不好用，一次演示看不出来，得连续用上一周：看它有没有抓对值得跟进的事、记不记得你的纠正、该停下来问你的时候有没有停。

#### 2. GPT-6.1 Sol：接近最强模型的智力，价格只要五分之一

OpenAI 现在的 GPT-6 家族有三个型号：**Astra 最强，Sol 居中，Luna 最便宜**（[GPT-6 Sol 与 Luna 的发布解读](https://best.xiaohu.ai/article/gpt-6-sol-and-luna/)）。GPT-6.1 Sol 是 Sol 的大升级，主攻 Agent 编程、操作电脑和专业工作，**智力接近 Astra，标准输入输出价格只有 Astra 的五分之一**。

![GPT-6 Astra、GPT-6.1 Sol、GPT-6 Luna 三张模型卡](https://best.xiaohu.ai/media/openai-devday-2026-recap/sol-models.webp)

三个型号的定位：Astra 最聪明，Sol 接近 Astra、价格五分之一，Luna 快而便宜（图：OpenAI）

价格（API，每百万 token）：

| 模型 | 输入 | 缓存输入 | 输出 |
| --- | --- | --- | --- |
| GPT-6 Astra | 10 美元 | 1 美元 | 50 美元 |
| GPT-6.1 Sol | 2 美元 | 0.10 美元 | 10 美元 |
| GPT-6 Luna | 0.10 美元 | 0.01 美元 | 0.50 美元 |

细看价格表，Sol 的标准价和一周前的 GPT-6 Sol 一样，降下来的是缓存价：比标准输入便宜 95%，比上一代 Sol 的缓存价还低一半。缓存价是反复读同一段上下文时的计费，Agent 一个任务要来回请求几十次，账单的大头就在这里，所以做 Agent 的人更该看缓存价。

OpenAI 公布的评测里，Sol 和对手的对比是这样的：

- **DeepSWE（真实代码库里的软件工程任务）：** 以约五分之一的成本追平 Astra，比上一代 Sol 的最好成绩高 6.4 个百分点。
- **GDP.pdf（读复杂 PDF 回答专业问题）：** 各个推理档位都高于 Opus 5.5，单任务成本不到它一半。
- **AutomationBench（用 47 种工具走完多步业务流程）：** 中等推理强度下比 Opus 5.5 高 2.2 个百分点，成本约三分之一。
- **OSWorld 2.0（长流程的电脑操作）：** 和 Astra 差距在 2.1 分以内，单任务成本约七分之一。
- **Terminal-Bench Science（科研任务）：** 单任务平均 5.47 美元，Opus 5.5 是 23.21 美元，Astra 是 23.80 美元；但得分第一的还是 Astra（68.1%），最难的科研活仍该交给 Astra。
- **事实错误：** 专挑容易答错的难题，低推理强度下含事实错误的回答从 11.4% 降到 7.7%；最高档下 Sol 4.1%，Astra 4.0%，几乎持平。
- **诚实度：** 搜索工具坏了该告诉用户，而不是编一个答案。没说出来的比例 Sol 是 2.1%，上一代 Sol 4.9%，Astra 1.5%，Luna 高达 28.7%。

![DeepSWE 1.1 评测图：横轴成本、纵轴得分](https://best.xiaohu.ai/media/openai-devday-2026-recap/kn-eval-deepswe.webp)

DeepSWE 1.1：横轴是单任务成本，纵轴是得分；GPT-6.1 Sol 用更低的成本追到 Astra 的水平（图：OpenAI 发布会现场）

![Terminal-Bench Science 0.1 评测图](https://best.xiaohu.ai/media/openai-devday-2026-recap/kn-eval-terminalbench.webp)

Terminal-Bench Science 0.1：Sol 成本远低，但最高分仍是 Astra（图：OpenAI 发布会现场）

DeepSWE 的原始数据还能看出一件对使用者更有用的事：**推理强度开得越高，不一定越好。**

| 模型 | 推理强度 | 单任务成本 | 得分 |
| --- | --- | --- | --- |
| GPT-6.1 Sol | 中 | 0.42 美元 | 73.0% |
| GPT-6.1 Sol | 高 | 0.65 美元 | 75.2% |
| GPT-6.1 Sol | Max | 1.57 美元 | 71.9% |
| GPT-6 Astra | 中 | 3.08 美元 | 72.8% |
| GPT-6 Astra | 超高 | 4.43 美元 | 74.1% |
| GPT-6 Astra | Max | 7.50 美元 | 73.2% |
| GPT-6 Sol（上一代） | Max | 2.74 美元 | 68.8% |

新 Sol 开到"中"档，花 0.42 美元就略高于 Astra 同档的 3.08 美元；它的最好成绩出现在"高"档，再开到 Max，成本翻了一倍多，分数反而掉了 3 个多点。Astra 也一样，Max 比"超高"更贵、分数更低。所以挑推理强度时，先在自己的任务上试"中"和"高"，别默认开到最大。

放到外部的独立综合榜单上，Sol 52 分、Astra 53 分，每个任务的成本 Sol 大约是 Astra 的 22%，"接近 Astra、约五分之一价格"的说法站得住；排第一的仍是 Anthropic 的 Opus 5.5（58 分）。Sol 拼的是性价比。

**规格：** 上下文窗口 105 万 token，最大输出 12.8 万 token，支持文字和图片输入，推理强度分五档；单次输入超过 27.2 万 token 价格翻倍，Batch 和 Flex 半价。

Sol 目前还没进聊天窗口，开放在 ChatGPT 工作和 Codex 里（Plus、Pro、Business、Enterprise、Edu），开发者用 API 模型名 `gpt-6.1-sol`。

#### 3. 超高速（Ultrafast）：花更多钱，换更快的输出

![Ultrafast 标题卡](https://best.xiaohu.ai/media/openai-devday-2026-recap/item-03.webp)

Ultrafast 可用于 ChatGPT、Codex 和 API（图：OpenAI）

**超高速是一个付费提速档。** 在 Codex 里，token 生成最高快 8 倍，约每秒 300 个 token；在 API 里快 6 到 7 倍。

[视频/音频](https://best.xiaohu.ai/media/openai-devday-2026-recap/ultrafast-bilingual.mp4)

Ultrafast 短片（中英双语字幕，约 45 秒）：给赛车游戏实时生成精灵图，普通档还在跑，超高速已经做完

Agent 做一件事要走几十个小步骤，每一步都在等模型，模型快一截，你等的时间就短一截。现场 Altman 放了一段并排对比：同一句"造一枚 DevDay 配色、带大舷窗的白色火箭，并发射"，超高速那边火箭已经升空，标准档还远没搭完。

代价是钱。API 里超高速是标准价的 6 倍，Astra 超高速每百万输入 60 美元、输出 300 美元；在 ChatGPT 套餐里，用超高速会按 8 倍的速度消耗额度。它跑在 Cerebras 的芯片上。

现在能用的是 **Astra 超高速**：API 已上线，ChatGPT 工作和 Codex 里只有 Pro 500 和 Enterprise 能用。**Sol 超高速**这几天就到，价格大致和原来用 Astra 标准版差不多，却能拿到接近 Astra 的智力和最高 8 倍的速度，这可能是整场发布里对开发者最划算的组合。

适合付这个钱的，是人在盯着等结果的场景，比如在 Codex 里和 AI 结对写代码；批量任务没人在等，用 Sol 标准速度加缓存便宜得多。

#### 4. 隐私智能：给不敢把数据交出去的企业

![按项目设置的隐私策略界面示意](https://best.xiaohu.ai/media/openai-devday-2026-recap/item-04.webp)

按项目设置保留策略：零数据保留加隐私安全处理，外部存储状态显示已验证（图：OpenAI）

医院、银行、律所这类客户，最大的顾虑是数据。**隐私智能**是 OpenAI 给它们的方案，分两块：

- **带隐私安全处理的零数据保留。** 它要解决一个矛盾：企业开了零数据保留，就是不让 OpenAI 留存提示词和回答；可 OpenAI 又得做安全审查，防止模型被滥用。做法是把记录搬到客户那边：被安全系统挑中的对话，加密后写进**客户自己的云存储**，OpenAI 只留一个索引，不留内容。要审查时，只有一个禁止人工访问的硬件环境能解密这些记录，自动审完，只带出一个限定格式的安全信号。
  "零数据保留"的准确意思是：OpenAI 不保留你的内容，安全记录放在你自己的存储里 30 天，由你来管。再加一层企业自己的密钥，撤销之后，这些记录谁也解不开。
- **隐私推理（预览）。** 用机密计算技术，让数据在模型生成回答的那一刻也处在可验证的保护之下，今秋开始预览。

Altman 说，这套体系是和 Cisco、Databricks、Snowflake 这些大客户一起设计的。

### 用 Codex 和 API 构建：让 Agent 上云、给开发者更多零件

Codex 是 OpenAI 的编程 Agent。这一栏 7 项，4 项给 Codex 本身加能力，3 项是给开发者的 API 零件。

#### 5. Codex Cloud：合上电脑，它还在干活

Altman 一上台，先把用户在 X 上呼声最高的三个 Codex 需求打了勾：Codex app 支持 Linux、一个项目可以跨多个文件夹、手机上也能用 Codex。

![大屏上的 Codex on Linux 需求推文墙](https://best.xiaohu.ai/media/openai-devday-2026-recap/kn-codex-linux.webp)

开场大屏：用户在 X 上要 Codex Linux 版的推文被逐一打勾（图：OpenAI 发布会现场）

更大的变化在运行位置。Codex 现在有三种跑法：**在你的电脑上跑、用手机遥控你的电脑跑、或者直接在云端跑**。放到云端，任务就不用靠你的笔记本开着了。

![手机上的 Codex，可选 Cloud 或自己的电脑](https://best.xiaohu.ai/media/openai-devday-2026-recap/item-05.webp)

手机上的 Codex 可以选择跑在云端，或遥控你自己的 Mac（图：OpenAI）

新增的是**可复用的云端开发环境**，配一次，以后每个任务直接开跑，团队还能共用一套批准过的设置和权限。

[视频/音频](https://best.xiaohu.ai/media/openai-devday-2026-recap/codex-cloud-bilingual.mp4)

Codex Cloud 介绍片（中英双语字幕，约 3 分半）

短片里演示了新环境的几种用法：

- **合上电脑照跑：** 任务在云端运行，合上笔记本也不停；可以从手机给正在跑的任务追加内容，甚至戴着耳机用语音发起会话，做完了它来通知你。
- **对话式配置：** 新建环境时把仓库交给它，它自己研究这个仓库需要什么：网络、环境变量、密钥。
- **一次配好反复用：** 配好后存成一个有名字的环境快照，可以从它出发同时开多个独立任务。分享给团队时，成员可以换上自己的密钥。
- **收尾：** 做完可以直接提 PR，或者走新的代码审查流程（第 7 项）。

现场 Romain Huet 演示了本地和云端的接力：新建一个云端任务，只发一句"把整个后端用 Rust 重写"，然后就去演示别的，回头再看结果。

Plus、Pro、Business、Enterprise、Edu 和医疗版都能用。

#### 6. 焕新的 Codex CLI：能对它说话，还能同时管多个任务

CLI 是命令行里的 Codex。这次的变化：

![命令行里的 Codex](https://best.xiaohu.ai/media/openai-devday-2026-recap/item-06.webp)

命令行里让 Codex 加快捷键、补测试（图：OpenAI）

- **语音对话：** 直接说话来启动任务、纠正方向。
- **/agents 视图：** 把活分给多个 Agent，在一个界面里看每件事的进度。
- **日常打磨：** 改提示词更顺手、能恢复之前的会话、内置 Git 工作树（让多个任务在互不干扰的代码副本里跑），长会话更好读。

/agents 视图管的是多任务下的混乱：AI 同时干好几件事时，人最容易搞不清哪个在等回复、哪个在改文件、哪个做完了等审。任务越多，这个视图越有用。

Romain 在台上从一个空项目开始，让 CLI 做一个随机抽三位观众、送下一届 DevDay 门票的 app，几秒后页面就出来了；再说一句"改成六位"，页面立刻更新，现场抽出了六位观众。本来要用语音演示，当天语音没能启动，他改成了打字。所有套餐都能用。

#### 7. 代码审查：你不在的时候，Codex 先看一遍

ChatGPT 桌面应用里有了专门的代码审查界面：先看改动摘要，再深入看具体的 diff，有疑问直接问 Codex；开了**自动审查**，你不在电脑前时 Codex 会在云端先审一遍。支持 GitHub 的 Pull Request 和 GitLab 的合并请求，所有套餐可用。

![代码审查界面](https://best.xiaohu.ai/media/openai-devday-2026-recap/item-07.webp)

Codex 在审查界面里给出评论，并带回复、解决、修复按钮（图：OpenAI）

#### 8. Codex Security Cloud：让 AI 盯着代码里的安全漏洞

Security Cloud 面向安全团队，让 Codex 在云端持续盯着代码仓库找漏洞。

![Security Cloud 仪表盘](https://best.xiaohu.ai/media/openai-devday-2026-recap/item-08.webp)

每个漏洞从发现到修复的流水线（图：OpenAI）

- 可以盯住每一次新提交，也可以按需或定时扫描整个 GitHub 仓库。
- 发现问题后，它自己调查、去重、准备修复补丁，全在云端完成，合上笔记本也照跑。
- 附带用上 OpenAI 网络安全计划里偏防御的 Daybreak Blue 模型，不用再单独申请。

扫描本身不难，费时间的是扫完之后：判断是不是真问题、去重、定位、写补丁。Security Cloud 把这一轮也先替安全团队做了。目前是研究预览，面向 Pro、Business、Enterprise 和 Edu，在 Codex 桌面端和网页版以插件形式提供。

#### 9. Decisions API：只做选择题的快速模型

**问题：** 很多应用里都有一种"小决定"：这张工单转给哪个团队？这条内容算哪一类？Agent 下一步调哪个工具？现在通常是调一个大模型，逼它只输出规定格式，再写代码检查格式、出错重试，又慢又绕。

**做法：** 你定义一个问题和几个固定答案，用文字或图片给上下文，它直接从选项里挑一个返回。背后是 GPT-6 Luna，也就是最便宜的那个型号。

同样把 1 万条客服请求按账单、技术、销售三类分流，走普通的 Responses API 每条约 1.6 秒，走 Decisions API 每条约 150 毫秒，快了差不多 10 倍。

[视频/音频](https://best.xiaohu.ai/media/openai-devday-2026-recap/decisions-api.mp4)

同样分流 1 万条客服请求，Decisions API 每条约 150 毫秒，Responses API 每条约 1.6 秒（画面为 15 倍速，约 29 秒）

现场还演示了用它操作电脑订机票，画面没加速，每一步几乎一闪而过。另一个用法是机器人：Romain 最后请出一台 Hugging Face 还没发布的可编程小鸭子机器人 MicroDuck，视觉用 Astra、画图用 GPT Image 2.5、实时语音用 GPT Live 1。他说做机器人的朋友最期待的，就是用能看图的 Decisions API，让机器人根据看到的东西近乎实时地做动作。

![Hugging Face 的 MicroDuck 小机器人](https://best.xiaohu.ai/media/openai-devday-2026-recap/kn-microduck.webp)

MicroDuck 小机器人，视觉、画图和实时语音分别接了 OpenAI 不同的模型（图：OpenAI 发布会现场）

这类模型有个说法叫 [System One](https://best.xiaohu.ai/article/system-one-models-jev/)（快思考），和 TypeSafe 不久前推出的 Jev 思路相通：让强模型想大方向，让快速的决策模型挑每一步动作。用的时候记得在选项里留一个"需要人工确认"，别让含糊的输入被硬塞进错误的类别。现在是限量预览，几天内全面开放。

#### 10. Agents API 加入"计算机使用"：让你的 Agent 直接操作软件

[Agents API](https://best.xiaohu.ai/article/openai-agents-api/) 是 OpenAI 的云端 Agent 托管服务，本身之前就推出了，这次的新东西是**计算机使用**。

![Agents API 架构示意](https://best.xiaohu.ai/media/openai-devday-2026-recap/item-10.webp)

你的应用把任务交给 OpenAI 托管的 Codex 执行框架，工具调用在沙箱里运行，沙箱可以在 OpenAI 或你自己的基础设施上（图：OpenAI）

做一个能长时间干活的 Agent，光有模型不够，还得管上下文、调工具、协调多个子 Agent，还要一个能连跑几天的运行环境。这一整套叫"执行框架（harness）"，Agents API 把 Codex 用的那一套直接托管给你：

- **一次 API 调用就能建一个云端 Agent**，指定任务、模型、工具和运行环境就行。
- **环境自己选**：OpenAI 托管的沙箱、你自己的基础设施，或者 Cloudflare、Vercel、Modal 这些合作方的环境。
- **自带的能力**：上下文快满时自动压缩、按需加载工具、多个子 Agent 并行干活。
- **计费**：Agents API 本身不收钱，只按 token 和工具用量算。

新加的**计算机使用**，让你的 Agent 能像人一样点击、输入、操作软件界面。现实里很多系统根本没有好用的接口，只能打开网页、看状态、点按钮，计算机使用补的就是这一块。通过 API 就能用；Pro 500 和 Enterprise 用户在 Codex 和 ChatGPT 工作里也能用。

另外，Altman 宣布 **Codex Harness 开源**。它驱动着 Codex、ChatGPT 工作，现在也驱动 Dots，开发者可以直接拿去搭自己的 Agent。

OpenAI 后训练研究负责人 Tejal Patwardhan 讲了计算机使用的两组数据。速度上，他们让模型在循环里反复找能降延迟的改进，再合进正式的框架，电脑操作的延迟改善了一倍多，已经上线。安全上，在电脑操作的安全压力测试里，行为偏离用户意图的比例 Claude Fable 5.1 是 9.5%，Opus 5.5 是 6.1%，GPT-6 Astra 是 2.4%。

![电脑操作安全压力测试柱状图](https://best.xiaohu.ai/media/openai-devday-2026-recap/kn-cua-safety.webp)

电脑操作安全压力测试：偏离用户意图的比例，越低越好（图：OpenAI 发布会现场）

她还给了一个研究进度的数字：人要花一天左右的研究任务，年初模型基本做不下来，到年中，超过三分之一已经能不用人插手做完。

Romain 用几段演示展示了这些能力：Astra 通过浏览器接管一款它没见过的 3D 太空游戏，自己点开始、选飞船、开起来；他对手机模拟器里的一个 app 截了一张 AppShot，说一句"在各种屏幕尺寸下审一遍我的 app"，Codex 就自己去点模拟器、打开 app、逐个试功能、截图。

![Astra 自己玩 3D 太空游戏](https://best.xiaohu.ai/media/openai-devday-2026-recap/kn-astra-game.webp)

Astra 通过浏览器接管一款 3D 太空游戏，一边是它的决策，一边是它按下的键（图：OpenAI 发布会现场）

API 整体也提速了：工具调用快 30% 以上，首个 token 快 45% 以上，Responses API 可用性 99.9% 以上。

![API 性能三组数字](https://best.xiaohu.ai/media/openai-devday-2026-recap/kn-api-perf.webp)

工具调用快 30%+、首 token 快 45%+、可用性 99.9%+（图：OpenAI 发布会现场）

#### 11. Amazon Bedrock 托管 Agent：整个跑在 AWS 里

对数据和采购都在 AWS 的公司，这一项解决"想用 OpenAI 的 Agent，又不想离开 AWS"的问题。Bedrock 托管 Agent 以 Agents API 的核心能力为基础，加上 AWS 的定制和集成，跑在客户自己的 AWS 资源上，紧挨着现有的应用和数据。AWS 客户还能用上 GPT-6 Astra、超高速、Codex 和 ChatGPT 工作。

![OpenAI 与 AWS 合作标识](https://best.xiaohu.ai/media/openai-devday-2026-recap/item-11.webp)

OpenAI 与 AWS 合作推出 Bedrock 托管 Agent（图：OpenAI）

### 用插件定制 ChatGPT：把 ChatGPT 变成你产品的入口

从 2023 年的 GPTs，到后来 ChatGPT 里的应用，现在都统一叫**插件**。每周 12 亿用户的 ChatGPT，这次把自己做功能用的那套平台开放给了开发者。这一栏 4 项都是给开发者的。

#### 12. 插件扩展：在 ChatGPT 里做出一整个应用

**以前的插件更像"一个能被 ChatGPT 调用的工具"，现在能长成"ChatGPT 里的一个完整应用"。** 开发者可以：

![设计工具作为面板嵌在 ChatGPT 里的示例](https://best.xiaohu.ai/media/openai-devday-2026-recap/item-12.webp)

第三方产品作为交互面板嵌进 ChatGPT（图：OpenAI）

- 在侧边栏给插件设一个专属入口；
- 做一个交互面板，让用户一边聊天一边操作；
- 给自家产品支持的文件类型做查看器。

Altman 举了两个例子。一个是 OpenAI 自己新做的会议 app，就是用插件扩展做的：在聊天里看接下来的会议，点"在 ChatGPT 里做纪要"，纪要页直接变成一个资料空间，同事和 Dots 在里面跟进待办。另一个是 Figma：在 ChatGPT 里打开设计稿、看团队评论、让 ChatGPT 改一版，设计和对话并排进行。所有套餐都能用。

#### 13. 更顺手的创建、提交和发现

- **创建：** 有插件创建工具帮你搭。
- **提交：** 提交流程重做了，能看审核进度、看哪里要改、申请人工复审，更新插件也不用从头再提交。
- **被发现：** 除了在插件库里搜，用户提问时 ChatGPT 会判断你的插件能不能帮上忙，当场就能连上。
- **用户说了算：** 用哪个插件由用户自己选，每个插件的权限逐一批准。

![插件创建与发现配图](https://best.xiaohu.ai/media/openai-devday-2026-recap/item-13.webp)

插件的创建、提交与发现（图：OpenAI）

对插件开发者，对话里的自动推荐影响最大，每周 12 亿人的提问都可能变成分发入口。它也很像搜索引擎里的推荐位，以后怎么排序、会不会收费，还要再观察。所有套餐可用。

#### 14. 接入插件的站点：让团队用各自的权限登录同一个应用

Sites 是 ChatGPT 里做网站的功能，上线几个月，用户已经建了几百万个网站。现在这些网站能接入 ChatGPT 插件：团队成员用各自的账号登录同一个应用，用的是自己连接的数据和权限，看到的内容也因人而异。财务仪表盘、活动预订、项目追踪、预算规划、多人小游戏，都能这么做。适用于 Business、Enterprise、医疗版和 Education。

![接入插件的站点示例](https://best.xiaohu.ai/media/openai-devday-2026-recap/item-14.webp)

一个接入了 ChatGPT 插件的网站（图：OpenAI）

#### 15. 用 MCP 事件驱动自动化：有事发生，它自己动起来

MCP 是让 AI 连接外部工具的开放协议。这次 ChatGPT 支持了 MCP 的事件机制：**连接的应用里一发生什么事，就能自动触发插件的工作流。**

![MCP 事件与自动化示意](https://best.xiaohu.ai/media/openai-devday-2026-recap/item-15.webp)

MCP 事件触发插件自动化（图：OpenAI）

它和普通的工具调用方向正好相反。普通调用是 AI 主动去问外部系统"有什么新东西"，得一遍遍回去问；事件是外部系统一有变化，主动把消息推过来。流程大致是：你的服务声明自己支持哪些事件（比如"有人发了新评论"）；用户告诉 ChatGPT 要盯什么、盯到了怎么处理；ChatGPT 通过你的 MCP 服务订阅；之后一有匹配的变化，你的服务就把事件推过来，ChatGPT 在原来的对话里按指令接着干。

比如让 ChatGPT 盯着项目看板，一有新任务，不管你在不在，它就去读关联文档、起草计划。所有套餐可用。

### 人与 AI 协作：一个共享的工作空间

这一栏 7 项可以放在一起看，它们搭起的是一个"人、ChatGPT 和 Dots 一起上班的办公室"。

#### 16. ChatGPT 资料空间：团队和 AI 共用的地方

把团队拉进一个专属空间，包括 ChatGPT 在内的所有成员，都能接着共同的目标和过往成果往下做，不用每次重新交代背景。你可以让 ChatGPT 把一段对话变成页面或幻灯片，它先问清需求，再当着你的面起草，你自己改、让它再改、或者拉同事一起改，全程不用换工具。它取代了原来的 Library，可以理解成"共享网盘加群聊，只不过有些成员是 AI"。

![ChatGPT 资料空间里的页面墙](https://best.xiaohu.ai/media/openai-devday-2026-recap/item-16.webp)

空间里汇集团队成员和 ChatGPT 共同做出的页面、报告、幻灯片（图：OpenAI）

Pro、Business、Enterprise 能用，网页和桌面端可以创建编辑，手机上目前只能看；Plus 不在名单里。

#### 17. 动态页面（Pages）：一种给人和 Agent 一起编辑的新文档

页面适合写项目计划、报告、视觉方案。你可以在里面和 ChatGPT 或你的 Dot 一起生成图表、交互式仪表盘和图片；同事可以评论或直接改，再 @ 你的 Dot 或 ChatGPT 让它改内容、做下一步。

![多人与 ChatGPT 共同编辑一份计划页面](https://best.xiaohu.ai/media/openai-devday-2026-recap/item-17.webp)

同事和 ChatGPT 在同一份 Q4 发布计划里编辑、勾选待办（图：OpenAI）

Holly 在演示里 @ 了两位同事和 Dottie，说一句"chart, please"，页面里就多出一张可以按反馈类型筛选的用户反馈图表，由 Dottie 每小时更新一次。页面还能设成从连接的工具自动更新，比如一个随工作进展变化的待办清单。

团队用之前先注意权限：分享页面不会顺带分享你的私人聊天和记忆，也不会把外部文件的访问权限给出去；但只要 ChatGPT 把其中的内容摘录或总结进了共享页面，所有能看页面的人就都能看到。什么内容能进共享页，最好先定个规矩。适用于 Pro、Business、Enterprise。

#### 18. 协作式幻灯片：多人加 AI 同时改一份 PPT

一个新的演示文稿编辑器：

![协作式幻灯片编辑界面](https://best.xiaohu.ai/media/openai-devday-2026-recap/item-18.webp)

多人和 ChatGPT 同时编辑一份幻灯片，右侧是评论（图：OpenAI）

- 有原生可编辑的图表，以及文本、形状、图片；
- 可以把对话直接变成幻灯片，也可以从自己的模板开始，边做边给 ChatGPT 反馈；
- 多人同时编辑、评论，或者标出希望 ChatGPT 修改的地方；
- 做完可以直接在 ChatGPT 里演示，也能导出到 PowerPoint 或 Google Slides 接着改。

Altman 的说法是，这是"一种 Agent 容易读懂、也容易修改的幻灯片"。它更在意的是多人来回改时，内容、版式和修改意见都留在同一个地方。未来几周上线，Pro、Business、Enterprise 可用。

#### 19. 创建团队，共享任务：把重复的活交给 ChatGPT

在 ChatGPT 里把同事拉进一个团队，就能共享页面、演示文稿、表格。更有用的是**团队任务**：比如每周项目进展汇报，你描述需求，ChatGPT 用连接好的工具收集信息、执行动作，可以定时跑，也可以由变化触发，比如来了一封新邮件或一条新 Slack 消息。团队成员能一起改指令，让任务跟着工作重点变。它用团队的服务账号执行，不借用某个人的全部权限。适用于 Business 和 Enterprise。

![团队任务界面](https://best.xiaohu.ai/media/openai-devday-2026-recap/item-19.webp)

团队里定时运行的任务，每天汇总销售数据（图：OpenAI）

#### 20. Slack 和 Teams 里 @ChatGPT

在频道、消息串或私信里 @ChatGPT，就能让它把一段讨论整理成项目简报、排查 bug 并准备修复方案，或者每天早上发一份客户动态。它能用管理员连好的工具，也能在你授权的范围内用你的工具。一个细节：没有 ChatGPT 账号的同事，也能在同一个对话里补充上下文、一起完善结果。适用于 Business 和 Enterprise。

![在 Slack 和 Teams 里 @ChatGPT](https://best.xiaohu.ai/media/openai-devday-2026-recap/item-20.webp)

在聊天里 @ChatGPT，让它把这段讨论做成幻灯片（图：OpenAI）

#### 21. 会议插件：开完会，纪要和待办自动到位

用会议插件录下会议音频，纪要存进资料空间，可以只给自己看，也可以分享给团队。ChatGPT 会结合你们之前的合作背景，提炼和你最相关的要点、决定和下一步，还能帮你处理待办，比如站会后按新的决定和卡点更新项目计划。

![会议纪要与行动项界面](https://best.xiaohu.ai/media/openai-devday-2026-recap/item-21.webp)

会议纪要页，列出摘要和行动项（图：OpenAI）

纪要生成后录音就删掉，不能回放，要留原始录音的场合别指望它。目前是 macOS 桌面端测试版，面向 Pro 和 Business，Enterprise 随后。

#### 22. 可分享的个人资料页：给你的插件和站点一个名片

个人资料页把你做过的站点和插件集中展示，方便别人发现和复用；团队成员还能发现被共享的"技能"，技能只在工作空间内共享。对做小工具的人来说，这比把链接散落在各个群里好找得多。Enterprise、Edu 和医疗版即将推出，其他套餐已经能用。

![个人资料页示例](https://best.xiaohu.ai/media/openai-devday-2026-recap/item-22.webp)

个人资料页展示活跃度、常用插件和作品（图：OpenAI）

### 用 ChatGPT 订阅做更多：账号、套餐、采购

#### 23. 使用 ChatGPT 登录：一个账号，走到别的产品里

在合作产品里用 ChatGPT 账号登录，不用再设密码。对方只拿到你的姓名、邮箱和头像，聊天记录和记忆不会给出去。

![使用 ChatGPT 登录合作应用的授权界面](https://best.xiaohu.ai/media/openai-devday-2026-recap/item-23.webp)

连接 ChatGPT 和 Devin，并可选择使用 ChatGPT 套餐额度（图：OpenAI）

登录之外还有额度：Plus 和 Pro 用户可以在合作应用里直接花自己 ChatGPT 套餐里的用量，每个应用最多能用多少由你来定。首发 16 家，包括 Devin、Notion、Vercel、Lovable、Warp、Amp、Conductor、Kilo、T3、OpenClaw、Dactyl 等。注意这是从你原有的额度里扣，不会因为多接一个应用就多一份额度。

![使用 ChatGPT 登录的首发合作方](https://best.xiaohu.ai/media/openai-devday-2026-recap/kn-signin-partners.webp)

"用 ChatGPT 登录"的首发合作方（图：OpenAI 发布会现场）

Altman 在台上坦白，这类做法以前试过，"结果好坏参半"。这次给开发者的好处是：推理成本由用户的订阅来付，你不用再替重度用户垫 token 钱。代价是：你的登录、用户的额度和你的成本结构，都压在了 OpenAI 的账号体系上。

#### 24. 新的 Pro 档位：每月 500 美元

OpenAI 推出每月 500 美元的 Pro 500：用量是 Plus 的 25 倍，没有 5 小时限额，额度还能通过"用 ChatGPT 登录"在合作方的应用里花，而且只有这一档能在 ChatGPT 和 Codex 里用超高速，在 100 或 200 美元档上另买额度也解锁不了。现在 Pro 分三档：每月 100、200、500 美元。

![Pro 100、200、500 三档](https://best.xiaohu.ai/media/openai-devday-2026-recap/kn-pro-tiers.webp)

Pro 的三档：100、200 和新的 Pro 500（含超高速、无 5 小时限额、可在合作方应用里用、Plus 的 25 倍用量）（图：OpenAI 发布会现场）

200 美元档也有变化：重新开放订阅，但新订阅的用量缩水了，在 ChatGPT 工作和 Codex 里从 Plus 的 20 倍降到 10 倍，GPT-6 Pro 在聊天里的消息数也从每周 200 条减到 100 条；老用户过渡期内保留原来的额度。200 美元档的重度用户，最好重新算一下自己的用量。

要不要升，看你是不是每天都被额度和等待卡住。整天在 Codex 里干活的人，500 美元换 25 倍用量加超高速可能划算；偶尔用的人，多花的钱换不来相应的体验。

#### 25. OpenAI 软件市场：用你和 OpenAI 的合同额度买别家的软件

符合条件的企业客户，可以把已经承诺给 OpenAI 的一部分消费额度，拿去买合作伙伴的软件，不用为每家供应商单独走采购。首批 32 家：创意领域的 Adobe 和 Figma，客户体验领域的 Sierra、Decagon、HubSpot、Salesforce、ServiceNow，法律领域的 Harvey 和 Legora，安全领域的 Palo Alto Networks 和 CrowdStrike，还有提供开源模型的 Baseten。目前是测试版，企业可以先登记意向。

![OpenAI 软件市场首批合作方](https://best.xiaohu.ai/media/openai-devday-2026-recap/item-25.webp)

软件市场首批合作方（图：OpenAI）

### 一张表看谁现在能用

| 序号 | 项目 | 现在的状态 |
| --- | --- | --- |
| 1 | Dots | 逐步开放：Pro（首批不含欧洲经济区、英国、瑞士）、Business Premium；Enterprise 测试版需管理员开启；首批只能在桌面端创建 |
| 2 | GPT-6.1 Sol | 已上线：ChatGPT 工作和 Codex（Plus、Pro、Business、Enterprise、Edu）、API；聊天窗口暂无 |
| 3 | 超高速 | Astra 版已上线（API；Pro 500 和 Enterprise 的 ChatGPT 工作、Codex）；Sol 版几天内 |
| 4 | 隐私智能 | 零数据保留加隐私安全处理已可用；隐私推理今秋预览 |
| 5 | Codex Cloud | 已上线：Plus、Pro、Business、医疗版、Education、Enterprise |
| 6 | Codex CLI 更新 | 所有套餐 |
| 7 | 代码审查 | 所有套餐 |
| 8 | Codex Security Cloud | 研究预览：Pro、Business、Enterprise、Edu |
| 9 | Decisions API | 限量预览，几天内全面开放 |
| 10 | Agents API 计算机使用 | API 可用；Pro 500 与 Enterprise 可在 Codex、ChatGPT 工作里用 |
| 11 | Bedrock 托管 Agent | 通过 AWS 使用 |
| 12 | 插件扩展 | 所有套餐 |
| 13 | 创建、提交与发现 | 所有套餐 |
| 14 | 接入插件的站点 | Business、Enterprise、医疗版、Education |
| 15 | MCP 事件 | 所有套餐 |
| 16 | 资料空间 | Pro、Business、Enterprise；网页和桌面可创建编辑，手机可查看 |
| 17 | 动态页面 | Pro、Business、Enterprise |
| 18 | 协作式幻灯片 | 未来几周上线：Pro、Business、Enterprise |
| 19 | 团队与团队任务 | Business、Enterprise |
| 20 | Slack、Teams 里的 @ChatGPT | Business、Enterprise |
| 21 | 会议插件 | macOS 测试版：Pro、Business；Enterprise 随后 |
| 22 | 个人资料页 | 多数套餐已可用；Enterprise、Edu、医疗版即将 |
| 23 | 使用 ChatGPT 登录 | 登录全球可用；套餐额度共享面向 Plus、Pro |
| 24 | Pro 500 | 已推出 |
| 25 | 软件市场 | 测试版，符合条件的企业客户 |

### 把 25 项放在一起看

按"它降低了哪一种工作成本"，这 25 项可以归成五组：

- **持续跟进的成本：Dots。** 以前你既要派任务，还得不停提醒 AI 接着做。Dots 要省掉的，是"盯着"本身占用的注意力。
- **能力的价格和等待的价格：GPT-6.1 Sol 和超高速。** 一个让更多复杂任务能交给便宜的模型，一个让着急的任务花钱买速度。这是两笔账，要分开算。
- **任务对"人在场"的依赖：Codex 云端、MCP 事件、团队任务。** 有地方跑、有事件触发、有团队共同管理的身份，自动化才能从一次性脚本变成长期运转的流程。
- **成果交接的方式：资料空间、动态页面、插件扩展。** AI 的产出从聊天记录里搬出来，变成能编辑、能共享、能接着操作的文档。这一组离普通上班族最近。
- **分发和采购的路径：用 ChatGPT 登录、软件市场。** 前者让个人订阅额度走出 ChatGPT，后者让企业的采购预算流向合作软件。这跟模型能力无关，影响的是以后大家在哪用、在哪买 AI 工具。

协作那几项单看有点零碎，放进一次交接流程里看：

| 工作里的问题 | 对应的更新 |
| --- | --- |
| 成果放哪，下次怎么找到 | 资料空间 |
| 一份东西怎么接着编辑、讨论 | 动态页面、协作式幻灯片 |
| 离开对话之后，谁接着干 | Dots、团队任务 |
| 有了新情况，怎么自动开工 | MCP 事件 |
| 同事在哪参与、在哪看到结果 | Slack 和 Teams 里的 @ChatGPT、接入插件的站点 |
| 开完会的待办怎么接上 | 会议插件 |

一次完整的流程是：会议产生待办，待办写进页面，页面放进共享空间，团队任务或 Dot 盯着后续变化，结果回到大家讨论的地方。

### 几个还没有答案的问题

- **现场演示频频卡壳。** Dot 一直"还在查"，语音两次没启动，和宣传片里顺滑的一天对比明显。Dots 这类产品好不好用，要看用上一个月后，你少追了多少事、多返工了多少活。
- **500 美元贵不贵，取决于能不能算出回报。** 一年 6000 美元一个席位，对开发工具不算离谱，前提是你能说清它省了多少时间。500 美元档的价值高度集中在超高速上，而超高速只在人盯着等的场景里才显出来。
- **对话里的插件推荐，会不会变成广告位。** 12 亿人的提问现场是最好的分发渠道，推荐怎么排、谁排在前面，还要看后面怎么做。
- **Dots 和 Muse 撞上了。** 两家都在做"有名字、有头像、一直在线"的个人 Agent。OpenAI 的优势在于它背后连着 Codex、插件和 ChatGPT 的用户盘子；最后比的是谁先让普通人放心把一份职责交出去。

来源DevDay 2026 回顾OpenAI·[查看主材料](https://openai.com/zh-Hans-CN/index/devday-2026-recap/)延伸[隆重推出 Dot](https://openai.com/zh-Hans-CN/index/introducing-dots/)·[推出 GPT-6.1 Sol](https://openai.com/zh-Hans-CN/index/introducing-gpt-6-1-sol/)·[推出 Agents API](https://openai.com/zh-Hans-CN/index/introducing-the-agents-api/)·[OpenAI expands Codex and its API at DevDay](https://the-decoder.com/openai-expands-codex-and-its-api-at-devday-with-security-scans-a-decisions-api-and-ultrafast/)·[OpenAI Gave AI Agents Their Own Computers at DevDay 2026](https://decrypt.co/379584/openai-ai-agents-computers-devday-2026-everything-announced)·[OpenAI DevDay 2026: every announcement, with prices and availability](https://dev.to/axrisi/openai-devday-2026-every-announcement-with-prices-and-availability-1mbh)·[DevDay 2026 announcements and developer resources](https://community.openai.com/t/devday-2026-announcements-and-developer-resources/1402006)

### 一件工作离开聊天框之后，每一段都有人接

1. 谁一直盯着？Dots有自己云端电脑、连着 4000 多个应用的常驻 Agent；动账户、往外发的操作先过自动审核，哪些要问你由你定规则
2. 谁动手干？Codex 云端 · Agents API合上电脑任务照跑；开发者的 Agent 能直接点、输、操作软件
3. 外面有变化怎么办？插件 · MCP 事件别人的产品长在 ChatGPT 里；外部系统一变化就自动开工
4. 成果放哪？资料空间 · 动态页面产出变成能编辑、能共享、能 @ AI 接着改的文档
5. 团队怎么接力？团队任务 · @ChatGPT定时或按事件跑的共享任务；在 Slack、Teams 里直接喊它

串起来：会议产生待办 → 写进页面 → 放进共享空间 → 团队任务或 Dot 盯着后续 → 结果回到大家讨论的地方。

### 两笔账要分开算

一个让复杂任务「做得起」，一个让着急的人「少等一会儿」，不是一回事。

能力的价格

#### GPT-6.1 Sol
**1/5**标准输入输出价格
是 Astra 的五分之一**$0.10**每百万 token 缓存输入
Agent 账单的大头

参照物是 OpenAI 目前最强、也最贵的模型 GPT-6 Astra。Sol 智力接近它，拼的是性价比：外部独立榜单上排第一的仍是 Anthropic 的 Opus 5.5。推理强度也不是越高越好：

DeepSWE 编程评测单任务成本得分Sol · 中$0.4273.0%Sol · 高$0.6575.2%Sol · Max$1.5771.9%Astra · 中$3.0872.8%

先在自己的任务上试「中」和「高」，别默认开到最大。
