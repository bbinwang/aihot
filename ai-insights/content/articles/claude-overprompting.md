---
title: "Claude Code工程师：你可能给 Claude 写了太多提示词：哪些该删，哪些要讲清楚"
date: 2026-10-30T00:00:00.000Z
tags: ["洞察", "Claude Code", "提示词", "Agent", "聚合"]
summary: "Addy Osmani 建议重新检查旧模型时代的指令：把目标与检查方法交代好，再考虑子 Agent、云端运行和项目协调。"
---
> **原文链接**: [https://x.com/addyosmani/status/2115688494865465370](https://x.com/addyosmani/status/2115688494865465370)
> **来源**: x.com
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/claude-overprompting/) · 2026/10/30
> **说明**: 本文由 AIHot 自动聚合(原文即中文,未翻译)。正文取自小互 AI 解读

---

全文 Markdown · 会员

作者：Addy Osmani10-30 · 12 分钟🎧 听播客版0:00 / --:--

[视频/音频](https://xiaohu.ai/media/claude-overprompting/podcast.zh-c2ac3fef8742.mp3)
0:00 / --:--![](https://pic.xiaohu.ai/jiedu-media/claude-overprompting/social/zh-031dd70d7aa3.png)

Claude Code 能在终端里读取项目文件、修改代码、运行命令。你提出任务，它可以通过工具去执行，再读回执行结果，决定下一步做什么。

在 Anthropic 从事 Claude Code 工作的 Addy Osmani 最近提出一个建议：用新模型时，重新检查那些越写越长的提示词。过去为了弥补模型不足而增加的指令，现在可能已经用不上；但业务背景、具体偏好和完成标准，仍要讲清楚。

他引用的一个结果很有分量：针对 Claude Opus 5 和 Fable 5 等模型，Claude Code 删去了超过 80% 的系统提示词，其编码评测没有出现可测量的下降。这是团队对自身系统指令的调整，不能换算成用户也该删掉八成规则。

这套建议的重点，是把“告诉 AI 怎么想”的精力，转向说明要完成什么、怎样检查、什么时候需要人作决定。它也延伸到子 Agent 分工、云端任务和代码审查。

### 先让 Claude 知道，怎样才算做完

假设你的网站在手机上点不开菜单。只说“帮我修好”，Claude 需要自己猜：要修哪个行为，哪些样式可以动，拿什么判断修好了。

Addy 建议，把完整任务和完成标准一起交给模型。你可以先从 `/effort medium` 起步，再根据任务调整思考力度。这个命令用于 Claude Code 会话，表示使用中等思考力度，并不是所有任务的最佳固定设置。

在已经打开目标项目的 Claude Code 会话中，可以发送这样的请求。以下为自拟教学提示词，英文为对应译文，任选一种语言发送。

**中文：**

```text
修复当前网站手机端菜单无法展开的问题，保留现有配色与字体。
先查看项目已有的测试入口和运行方式，再修改相关代码，不要编造测试文件名或命令。
完成后，运行与这次修改相关的现有测试；用390px宽的浏览器页面检查：按钮能打开和关闭菜单，表示展开状态的 aria-expanded 属性随之更新，菜单关闭后正文没有被遮挡。
交付时给我实际执行的命令、完整结果、页面截图和代码改动差异。
常规读取、修改与检查可以继续做，不需要逐步等我确认；需要新的访问凭据、无法排除的需求冲突或破坏性操作时先问我。不要直接部署。
```

**英文译文：**

```text
Fix the mobile menu that fails to open on the current website. Preserve the existing colors and fonts.
Inspect the project's existing test entry points and run instructions before changing the relevant code. Do not invent test filenames or commands.
After making the change, run the relevant existing tests. In a browser at a viewport width of 390px, verify that the button opens and closes the menu, the aria-expanded attribute updates with the open state, and the closed menu does not obscure the page content.
Report the commands you actually ran, their full results, page screenshots, and the code diff.
Continue routine reading, editing, and verification without waiting for approval at each step. Ask me before using new access credentials, resolving a requirement conflict you cannot settle, or taking a destructive action. Do not deploy.
```

#### 检查结果怎样变成下一步动作

这段请求让“修好”有了可观察的含义。菜单出现还不够：它必须能关上，状态属性要同步，关闭后也不能留下遮挡正文的层。

Claude 可以通过工具修改项目、运行检查，再读取工具返回的结果。假设第一轮检查发现菜单能展开，但表示展开状态的属性仍然没有更新，这个具体报错就成为下一轮修改的依据。模型据此调整相关代码，再运行检查，你不用每次手动复制报错给它。

这个过程反复进行：**改动 → 检查 → 读取失败反馈 → 再改动**。检查通过以后，才有对应的结果可供交付。它能检查什么，取决于工具是否可用、环境和权限是否允许；缺少测试入口或访问条件时，也可能需要先补齐这些条件。

Claude 通常会在自己认为任务完成时停下。可读的通过/失败结果，或一个需要达到的数值目标，给模型提供了判断下一步的依据。检查只覆盖它实际测过的内容，因此还要核对交付证据是否兑现了原始需求。

一个修手机导航的教学示意 · 不运行模型

#### 检查结果，决定下一步

同一项任务：手机菜单能够开关，展开状态正确，正文不被遮挡。改变检查结果，看任务该继续、交付还是等待条件补齐。

交代任务**目标与验收**说明要修什么、如何检查
执行**读取并修改文件**工具把修改与运行结果交回
检查**检查失败，有报错**读取结果，判断是否满足目标
交付**报告结果与证据**命令输出、截图和代码差异

↶ 检查失败 → 读报错 → 返回修改，再检查

有可读的失败反馈，Claude 才能据此分析并尝试修正。继续执行仍受工具访问、权限和预算等条件限制。

有验收方法，才有可核对的完成依据。检查只能证明它覆盖的内容；页面是否符合你的需求，仍需验收。

#### 少一些确认弹窗，仍要查看交付证据

Claude Code 的 auto mode 会用分类器检查准备执行的动作，减少常规操作的确认弹窗，尝试拦截风险动作。官方说明面向 Pro、Max 和 Team 的默认会话设置；Enterprise、API 等环境有各自的启用和管理规则。

自动审核仍可能判断出错。任务结束时，让 Claude 展示实际命令与输出、截图及代码差异，能帮助你确认它做了什么、哪些检查确实执行过。减少逐步确认以后，交付证据依然重要。

### 还没想清楚，就先把需求问明白

有时困难发生在写代码之前：你还没决定手机菜单里放哪些入口、哪些用户能看到、打开和关闭时应该怎样表现。继续追加零散指令，可能让前后要求相互冲突。

Addy 建议，先让 Claude 采访你，直到能写出一份需求规格，再拿定稿规格开新会话执行。规格就是把准备做什么、哪些规则必须满足、怎样验收写成一份可反复查看的说明。

在前面的导航任务里，可以先发送这段自拟请求。英文为对应译文，选一种发送。

**中文：**

```text
我想调整当前网站的手机导航，但还没想清楚菜单内容、用户权限和交互细节。
请向我提问，直到你有足够信息写出需求规格。遇到我还没决定的问题，先列出来，不要替我编造业务规则，也先不要修改实现。
讨论完成后，整理目标、范围、业务规则、具体偏好、验收方法和未决问题，给我确认。
确认后，将定稿保存为当前项目仓库里的 spec.md，并告诉我实际保存路径。
```

**英文译文：**

```text
I want to change the mobile navigation on the current website, but I have not settled the menu content, user permissions, or interaction details.
Interview me until you have enough information to write a specification. List unresolved decisions instead of inventing business rules. Do not change the implementation yet.
When the discussion is complete, summarize the goal, scope, business rules, specific preferences, acceptance checks, and open questions for my confirmation.
After I confirm it, save the final specification as spec.md in the current project repository and report the actual path.
```

#### 让新会话明确拿到定稿规格

确认 `spec.md` 写明了目标、必要规则和验收方法以后，在同一个项目目录打开新会话，并明确让它读取这个文件。新会话不应依赖你在旧聊天里说过的话；文件提供了可重新读取的定稿依据。

执行阶段可以发送下面这段自拟请求。英文为对应译文，选一种发送。

**中文：**

```text
先读取当前项目仓库的 spec.md，按其中已确认的需求完成修改并执行验收。
若文件不存在、仍有会阻碍实现的未决问题，或当前代码与规格存在冲突，先告诉我具体位置，不要猜测旧会话的内容。
完成时给出实际改动、运行的检查、结果和未能验证的项目；不要直接部署。
```

**英文译文：**

```text
Read spec.md in the current project repository first. Implement the confirmed requirements and run the acceptance checks it defines.
If the file is missing, contains an unresolved decision that blocks implementation, or conflicts with the current code, identify the specific issue instead of guessing what was discussed in an earlier session.
Report the changes, checks actually run, their results, and anything you could not verify. Do not deploy.
```

如果用的是纯聊天界面，没有文件读写能力，就复制定稿规格到新会话。这个做法把前期讨论中的已放弃方案留在旧会话里，让执行会话集中读取确认后的要求；需求已经明确的小任务，也可以直接在当前会话完成。

### 旧指令该删哪些，实际跑一次再决定

Addy 引述的内部结果是：在针对 Claude Opus 5 与 Fable 5 等模型的内部迭代中，**Claude Code 的系统提示词被砍掉了 80% 以上，而其官方编程基准评测（Coding Evals）没有任何可测量的下降**。

这个结果没有测量普通用户的提示词，不能据此承诺你的规则删掉八成也能保持效果。

系统提示词是产品给模型的长期工作指令，和你交代某次任务的背景、目标有不同作用。检查自己的指令时，也要分清它究竟在补充什么信息。

#### 先试着减少重复的催促和安排

- **重复催促思考**：Opus 5.5 在回复前已经会思考。官方指南建议删去“think carefully”“think step by step”之类句子；其聊天产品测试中，删去一句“think carefully”后，回复开始得更快，质量没有明显下降。这个观察不能推广成所有任务都不受提示写法影响。
- **已经没有用途的汇报要求**：检查每一条格式规定是否服务当前交付。需要结构化输出供程序读取时，格式就是必要要求；仅因过去某次回答不理想而永久追加的规则，可以拿出来重新测试。
- **过细的任务安排**：一个小修改也强制经历规划、执行、检查等多个独立角色，会增加模型调用和信息交接。先确认这种安排解决了什么实际问题，再决定是否保留。

#### 业务规则、验收方法和具体偏好仍要交代

- **真实的业务背景与领域不变式**：例如“超过业务规定金额的退款要先交人工确认”、“导出的用户手机号必须脱敏”。这些规定来自你的业务，模型无法凭能力推断出你没提供的信息。
- **明确的可执行验证命令**：例如编译检查命令、特定单元测试套件、Lint 校验脚本。
- **排他性偏好（Negative Constraints）**：Addy 在官方指南中特别提醒，面对设计或页面需求时，宽泛地说“避免平庸风格”只会让模型从一种默认模板跳到另一种默认模板。**更有效的做法是明确写出你“不想要”的元素**，例如：*“不要使用米白色背景、不要在标题中使用斜体强调词、不要使用 01/02/03 数字序号标签、不要使用药丸状圆角按钮”*。明确列出排他项，模型更容易避开你不接受的具体元素。
- **操作权限和需要询问的边界**：写清哪些操作需要你先确认，例如强制推送代码和清空数据库。

删改对照 · 自拟教学示例

#### 删掉一句，看看少了什么

勾选表示暂时删去对应句子。右侧直接显示剩余的请求，观察目标、验收、偏好和权限信息是否还在。这个演示不预测模型速度或质量。
**目标**修复网站手机端菜单无法展开的问题。提供要完成的事**思考催促**请认真思考，一步一步思考，再认真检查。Opus 5.5 可先尝试删去重复催促**过程安排**每改一行都先停下来等我同意。是否保留，取决于你要结对操作还是自主执行**验收**检查手机端菜单开关、展开状态与正文遮挡，给出命令结果和截图。提供检查对象和交付证据**具体偏好**保留网站现有配色和字体。提供模型无法替你决定的偏好**权限边界**不要直接部署；需要访问凭据时先问我。提供这次任务的授权范围删改后的完整请求

```
修复网站手机端菜单无法展开的问题。
请认真思考，一步一步思考，再认真检查。
每改一行都先停下来等我同意。
检查手机端菜单开关、展开状态与正文遮挡，给出命令结果和截图。
保留网站现有配色和字体。
不要直接部署；需要访问凭据时先问我。
```

目前保留全部句子。可以先试着删去思考催促，再用同一个真实任务观察是否有遗漏。

官方删去超过 80% 系统提示词的结果，不是用户指令的删减目标。是否保留某句，最终要用任务表现来判断。

#### 删一部分，观察遗漏，再补回需要的规则

怎么知道哪些属于该删的旧指令？Addy 推荐采用三步循环法：

1. **删除一部分怀疑过时的指令（Remove some）**；
2. **观察模型在实际任务中是否真的遗漏（See what it misses）**；
3. **只针对模型确实会漏掉的地方精准加回（Add back only those）**。

用任务表现校准指令

#### 删一点，试一遍，只补真正缺的

1. 1**先删一部分**
  挑出怀疑过时的指令，其余任务要求先保留。
2. 2**用同一个任务观察**
  按原来的验收方法检查，看它有没有漏掉要求。
3. 3**只补回缺的规则**
  出现哪项遗漏，就补能解决它的指令。

继续调整；换模型后再走一轮

第 2 步未发现遗漏 → 先保留精简版，不为凑长度加回旧规则。

仍然检查原来的导航任务菜单能否开关展开状态是否同步正文是否被遮挡

依据原文三步循环中文重绘。比较的是同一任务的完成情况，不把删掉的字数当作效果指标。

在 Claude Code 工具链中，可利用 `/doctor prompt-audit` 命令（该子命令要求 Claude Code v2.1.283 及以上），它能自动扫描你的项目说明文件（如 `CLAUDE.md`）或提示词，标记出那些专门为老模型编写的冗余过时指令，并提供优化修改建议。

### 子 Agent 能分工，也会增加交接

子 Agent 是由主 Agent 分配工作、在自己的一段上下文中处理任务的独立会话。它可以同时调查另一条问题，也可以在没看过实现讨论的情况下审查结果。

Addy 提醒，小任务拆给多个子 Agent，会增加成本和等待时间。它们可以并行干活、提供第二意见，但数量增加并不自动提高质量。

每个子 Agent 都有独立的上下文窗口，也就是它在处理任务时能读到的信息。主 Agent 交过去一份任务，子 Agent 再返回结果；中间若依赖摘要，可能漏掉后续步骤需要的细节。独立审查则利用了这种分隔：审查者按规格重新看结果，而不必沿着实现者的讨论过程下结论。

[延伸阅读 · 怎样划分 Agent 的工作Anthropic 官方指南：随着模型能力的提升，很多子 Agent 其实可以换成技能和工具进一步理解共享上下文、技能按需加载，以及哪些独立工作值得保留子 Agent。阅读介绍文章 →](https://xiaohu.ai/article/claude-fold-subagents/)

在实际使用中，我们该如何划定子 Agent 的边界？

- **无需手动指派子 Agent**：新版 Claude 会在需要时自主派发后台任务，你通常不需要刻意去构造复杂的编排提示。
- **适合交给子 Agent 的独立工作**：体量较大、边界清晰、适合并行的工作，例如全仓库范围的漏洞排查（Security Audit）、跨几十个微服务的文件迁移（Migration）。拆分时要交代各自检查的范围、必要背景和返回证据；依赖较少的子任务更容易并行，最终仍需核对汇总结果。
- **也可以先尝试一个 Agent 配合技能和工具**：让同一个 Agent 持续处理任务，按需使用技能和工具。技能存放处理某类任务的具体流程，需要时再读；工具负责查询或执行操作。同一个 Agent 可以保留用户要求和工具结果，减少摘要交接。Anthropic 在几家企业部署的对比中发现，这种方式经常有更好的质量和成本表现；是否适合自己的任务仍需比较。

### 单个任务能跑通，再决定在哪里并行

同时运行多个会话时，你需要给每个会话交代目标、跟进结果并处理提问。单个会话若还离不开你持续补充指令，多开几个也会增加需要你处理的中断。

Addy 的建议是：**只有当单次会话能够脱离人工干预独立完成交付时，并行才有意义（Parallel sessions only pay off once a single session can finish without you）**。

#### 电脑合上还能工作，靠的是任务运行在云端

在 Claude Code 中，任务可以在本机终端运行，也可以启动云端会话（Cloud Sessions）：

- **留在本机终端**：如果任务高度依赖你电脑独有的环境资源——例如挂在本地私有网络后的数据库、本机设备或移动端模拟器、需要频繁查看本地浏览器渲染效果的极短反馈回路。
- **派发到云端沙箱（`claude --cloud` 或网页/手机端）**：
  - 云端会话运行在由官方托管的独立虚拟机（VM）中，拥有独立的 CPU、内存与隔离环境。
  - **重要操作注意**：因为云端 VM 会重新克隆你的代码仓库，**在运行 `claude --cloud` 派发任务前，需要先将本次任务需要的本地提交推送到 GitHub（Push your commits first）**！否则云端 VM 拿到的是落后的代码。
  - **合上电脑去喝咖啡**：云端任务不会因为你的笔记本休眠或断网而中断。你可以随时在手机端 Claude App 里查看进展、解答它提出的关键疑问、阅读生成的差异对比（diff），并发起 Pull Request。（简称 PR，即把一组代码改动提交给团队审查、等待合并的请求）diff 则列出修改前后的代码差异，帮助你查看它具体改了哪里。

#### Claude Code 的 Projects 把多个任务的协调放进一个会话

如果同时有 5 个独立的 Bug 要修，没有统一的项目中枢，你就必须在 5 个会话间来回切换，重复输入相同的分支命名规则与测试规范。

**Claude Code 的 Projects（项目）** 把这部分协调集中起来（Projects 在 Pro 和 Max 公测，并逐步开放，账号可能暂时看不到入口）。入口可以在 [claude.ai/code](https://claude.ai/code) 或桌面 App 的 Code 标签中查找。

两种方式的区别在于谁负责协调：

- **没有 Project 时**：你必须担任多个 session 的调度经理（Manager），手动跟踪哪一个卡住了、哪一个跑完了；
- **引入 Project 后**：
  - **一处设定，全局继承**：在项目说明（Project Instructions）中写明通用规则（如所有分支基于 main 分支拉出、PR 命名规范、提测指令），项目下启动的新任务线程会继承这些说明。
  - **对话即调度器**：你只需在一个常驻的项目主会话中粘贴堆栈报错或 Issue，Claude 会为相应任务启动独立线程，通常在云端并行运行。
  - **Overview 看板**：集中查看哪些任务已完成、哪些已有 PR 待审，还有哪些仍在运行或需要你答复。

Projects 的结构对照

#### 同样是多个任务，谁在负责协调？

##### 你分别管理每个会话

逐个交代任务，逐个查看进度和处理提问。

**你**

**会话 A**自己跟进
**会话 B**自己跟进
**会话 C**自己跟进

每多一个会话，你就多一份协调工作。

##### Projects 代管任务线程

向项目聊天交代需求，由它组织并行线程。

**你**
**项目长期聊天**统一说明 · 分发任务
汇总进度与待办状态

**线程 A**✓ 已完成
**线程 B**改动待审
**线程 C**待你答复

任务仍分头进行，协调与状态集中到一处。

你主要跟进一个项目聊天；需要你判断的事，仍会交回给你。

依据原文 Projects 对照图中文重绘。线程数量与状态只作结构示意。

### 把实现过程交出去，把独立审查留下

把代码写出来只是第一步，如何确保交给人类审阅的代码不是漏洞百出的“半成品”？

Addy 透露，在 Claude Code 团队内部，**多数代码变更先经过自动审查和修复**：多数变更在呈现在人类工程师面前之前，已经被 Claude 至少自动审查并修复了一轮。

在个人和团队实践中，可以采用以下审查回路：

1. **内建代码审查工具**：
  - 在 Team / Enterprise 方案中可以使用平台级 Code Review，或在终端中使用轻量级的 `/code-review` 命令。
  - `/code-review` 会在一个**从未看过当前对话历史的全新子 Agent** 中打开你的代码 diff。审查者没有实现讨论中的全部推导，可以从规格和改动重新检查问题；它仍可能漏错。
2. **另起独立会话交叉审查**：
  - 也可以随时新开一个独立会话，将初期的 `spec.md` 和最终的 `git diff` 投喂给它，并附加明确指令：*“根据此规格审查 diff，只指出阻碍合并的正确性与边界错误，忽略无意义的代码风格说教。”*
3. **长任务的轮后检查：`/goal` 命令**：
  - 对于需要持续数小时甚至跨夜执行的复杂背景任务，可使用 `/goal <condition>` 设定完成条件。系统会用另一个模型在每轮结束后检查是否满足目标，未满足时继续推进；权限、预算或环境等限制仍可能让任务停下。

### 换了模型，也重新检查工作方法

每隔几个月，都值得重新检查一次提示词和工作流，看看它们还在解决什么问题。

可以从一项常做的任务开始：保留目标、必要背景和验收标准，减少一部分疑似过时的指令，用同样的任务观察变化。若出现遗漏，补回能解决这个遗漏的规则。

让单个任务能带着证据交付以后，再考虑更多会话、云端运行和项目协调。否则，打开的窗口越多，需要你处理的中断也可能越多。

**值得追求的是少一些不必要的指挥，同时保留足够的信息和检查，让任务有条件自己向前走。**

来源You're probably overprompting ClaudeAddy Osmani·[查看主材料](https://x.com/addyosmani/status/2115688494865465370)延伸[Getting the most out of Opus 5.5](https://claude.dev/blog/getting-the-most-out-of-opus-5-5/)·[When to fold subagents into your main agent loop](https://claude.com/resources/articles/building-agents-when-to-fold-subagents-into-your-main-agent-loop)·[Claude Code commands](https://code.claude.com/docs/en/commands)·[Cloud sessions](https://claude.dev/blog/claude-code-in-the-cloud/)·[Projects](https://code.claude.com/docs/en/claude-projects)·[Auto mode](https://claude.com/resources/articles/auto-mode-default-in-claude-code)
Claude Code · Prompt Engineering

## Claude Code工程师：你可能给 Claude 写了太多提示词：哪些该删，哪些要讲清楚

从指挥 AI 怎么思考，转向定义完成标准与自动化验证闭环
基于 Addy Osmani 的 Claude Code 实践建议；示例用于说明方法。

Claude Code 能在终端里读取项目文件、修改代码、运行检查并读回结果。Addy Osmani 在 Anthropic 从事 Claude Code 工作。他建议用新模型时重新检查旧指令：过去为弥补模型不足而加的规则，现在可能已经用不上。

针对 Opus 5 和 Fable 5 等模型，Claude Code 删去了超过 80% 的系统提示词，编码评测没有出现可测量的下降。这是团队调整，不能推导成用户也该删八成。更有用的起点是讲清目标、必要背景和验收方法。

让检查结果决定下一步

例如修手机菜单：不只要求能打开，还要能关闭、展开状态正确、关闭后不挡正文。Claude 运行检查并读取结果；失败反馈成为下一轮修改的依据，检查通过后再交付证据。工具、权限或环境条件缺失时，需要先补齐。

STEP 01
交代目标与验收
说明业务规则、偏好与怎样检查。

STEP 02
读取并修改文件
在可用工具与授权范围内执行。

STEP 03
运行并读取检查
失败：根据报错返回修改，再检查。

STEP 04
交付结果与证据
通过：给命令输出、截图与代码差异。

检查失败 ↶ 返回修改　｜　检查通过 → 核对需求覆盖 → 交付

可先减少的安排
反复催促认真思考、为小任务强行安排多个角色，可能增加等待和交接。

仍要明确的信息
业务背景、具体偏好、验收方法和权限边界。可先用 /effort medium，再按任务调整。

### 还没想清楚，先采访成规格

菜单放什么入口、哪些用户能看到还没决定时，先让 Claude 提问，直到能写出需求规格；确认后保存为项目里的 spec.md，再开新会话明确读取它。

新会话读取确认后的目标、规则和验收方法，减少已放弃方案的干扰。它仍须查看项目代码；文件缺失或规格有冲突时应先指出。需求明确的小任务可直接在当前会话完成。

### 删掉重复指挥，保留模型无法猜到的信息

先试着删一部分，再用真实任务观察遗漏。不能只凭某句看起来多余，就承诺删后效果不变。

#### 可以拿来重测

- 重复的“认真思考”“一步一步思考”。官方指南报告过删一句催促后更快、质量未明显下降的局部测试。
- 已无当前用途的格式要求；供程序读取的结构仍须保留。
- 小修改也强制规划、执行、审查多角色交接。

#### 仍要明确交代

- 业务规则：如退款超过规定金额须人工确认。
- 验收入口：实际可执行的测试或页面检查。
- 具体偏好：例如不接受哪些颜色或按钮样式。
- 权限边界：如不要直接部署，破坏性操作先询问。

新模型发布后，可重复以下循环；/doctor prompt-audit 帮助标记为旧模型编写的指令。

删一部分疑似旧指令
→
用实际任务查遗漏
→
只补回确实需要的规则
↶ 换新模型后再检查

### 一项任务能独立交付，再增加并行

小任务拆给多个子 Agent 会增加成本和等待；独立上下文之间的摘要交接也可能丢细节。体量大、边界清晰的审计或迁移适合分工，独立审查可提供第二意见。通常不必主动要求子 Agent，Claude 会按需委派；也可先比较一个 Agent 配技能和工具的效果。

单会话还需要你不断补充指令时，多开会话也会增加中断。先让它能自己完成，再选择运行位置和协调方式：

- **本地或云端：**依赖仅在本机的资源就留本地。想合上电脑继续运行，可用 claude --cloud、claude.ai/code 或 Claude App 启动独立云端虚拟机（VM）；先推送任务所需提交，再用手机跟进、回答提问、查看代码差异（diff）并发起合并审查请求（PR）。
- **Projects 协调：**长期主会话为任务创建独立线程，通常在云端并行；统一说明由新线程继承，Overview 区分已完成、PR 待审与待你输入。Pro/Max 公测逐步开放。
- **独立审查：**团队多数改动在人看之前，先由 Claude 至少审查并修复一轮。/code-review 使用未见实现对话的子 Agent；也可新会话给 spec.md 与 git diff，忽略风格，只查实际问题。
- **长任务检查：**/goal <condition> 可让另一个模型在每轮后检查目标；权限、预算或环境仍可能让任务停下。

**工作方法核心原则：**
每隔几个月重新检查指令和工作流。auto mode 用分类器尝试拦截风险动作，仍可能判断出错；交付时要核对实际检查与证据是否兑现需求。

原文版权归原作者，这里只供对照阅读。 [看原网页 ↗](https://x.com/addyosmani/status/2115688494865465370)

## You're probably overprompting Claude

![](https://pbs.twimg.com/media/HVxuqqUagAA_bVB.jpg)

**Newer models require less prompting than most of us still do.**

For [Opus 5.5](https://claude.dev/blog/getting-the-most-out-of-opus-5-5/), try giving Claude a single prompt with a **clear goal** of what you want to do and how Claude should **verify** it has achieved it, and let Claude work on it. Start with /effort medium and adjust as needed.

![](https://pbs.twimg.com/media/HVxsQYpbEAES48q.jpg)

If you don't know yet what you're trying to do, ask Claude to interview you until it could write a spec. Then start a new session and use that spec to build what you want.

Claude will stop on its own when it believes it's done.

If it can execute something that checks in terms of pass/fail or a number to beat, with reports in a way it can read, Claude can keep going without you having to watch.

For long background tasks, you can use /goal to specify a condition that a separate model to check after every turn.

Recent versions of Claude Code have also adopted [auto mode as the default](https://claude.com/resources/articles/auto-mode-default-in-claude-code) starting mode for interactive terminal sessions. In that mode, a classifier analyzes Claude's actions rather than relying on the usual permission prompts. This is not a guarantee of safe behavior - neither is blindly approving every prompt. When Claude reports back, ask it to show you the command and output or a screenshot.

**For models like Claude Opus 5 and Claude Fable 5, over [80% of the Claude Code system prompt](https://x.com/trq212/status/2080710971228918066) was removed with no measurable degradation of its coding evals.**

When a new model like Opus 5.5 comes out, you can do the same experiment with your own instructions: remove some, then add back only those that the model misses. The [/doctor prompt-audit](https://code.claude.com/docs/en/commands#:~:text=/doctor%20%5Bprompt%2Daudit%20%5Bpath%5D%5D) command flags those written for older models.

![](https://pbs.twimg.com/media/HVxshHaaUAAHco5.jpg)

Another area to reduce your own work is [subagents](https://claude.com/resources/articles/building-agents-when-to-fold-subagents-into-your-main-agent-loop).

Claude delegates to them on its own, so you rarely need to ask. Ask only for substantial, standalone work like long audits or migrations, which Opus 5.5 can split across parallel subagents. For small jobs, subagents multiply cost and latency. Subagents can parallelize work or provide a second opinion, but they don't, by default, make things smarter.

For agents you build, a single agent with skills can outperform a subagent design on quality, often at lower cost and latency from what I’ve seen.

Use [Claude cloud sessions](https://claude.dev/blog/claude-code-in-the-cloud/) when you want to shut your laptop. Start one from claude.ai/code, the Claude app or via claude --cloud. Cloud sessions run in a separate VM with a fresh clone of your repo, so be sure to push any commits before you start. Check in from your phone, address any questions the session posed, then review the diff and open the PR. Keep a session local if the task requires resources that are only available on your machine.

Parallel sessions only pay off once a single session can finish without you. If you have [Projects](https://code.claude.com/docs/en/claude-projects) in Claude Code, I think you'd find them very useful. Without a project, you are the manager of multiple sessions and must track what each session is doing, and which ones have completed.

![](https://pbs.twimg.com/media/HVxs35AboAA87A4.jpg)

A project is one long-running chat that does most of the project management for you: as issues and jobs come up, paste them in, and Claude creates a separate thread (usually a cloud session) for each and runs them in parallel. You provide instructions once, and they are applied to all new threads. And the Overview shows which tasks have completed, which PRs are ready and what's pending your input.

Projects are in [public beta](https://x.com/ClaudeDevs/status/2100633571543367691) on Pro and Max, so you may not have them yet, but hopefully soon!

Review still matters. On the Claude Code team, however, most of the reading has become automated: most changes are reviewed and fixed by Claude at least once before a human is asked to look.

You can use [Code Review](https://claude.dev/blog/solving-code-review-at-anthropic/) on Team and Enterprise plans or the lighter /code-review, which reviews your diff in a subagent that hasn't seen the conversation. You can also simply start a new session. If you do, give it the spec and tell it to ignore stylistic stuff.

**Every few months, audit how you work to make sure you aren't building for how older models used to work.**

↑ 正文结束
✓ 本篇全文免费开放

会员可复制、下载全文 Markdown，还能让你的 AI 订阅和提问。
[订年卡 $59/年](https://xiaohu.ai/buy/?plan=year)[看权益对比 →](https://xiaohu.ai/membership/)

[阅读原文 ↗](https://x.com/addyosmani/status/2115688494865465370)

📮 新解读每晚进邮箱

读完觉得有用？留个邮箱，每晚一封当天的新解读，随时退订。
