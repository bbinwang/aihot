---
title: "AI 时代的下一个万亿级平台机会：一个记录“决策过程与理由”而非仅仅“业务对象”的全新底层系统"
date: 2026-10-31T00:00:00.000Z
tags: ["洞察", "企业AI", "Agent", "上下文图谱", "聚合"]
summary: "客户、合同和账本已有权威底账，企业却常查不到一次决定为什么获准。当 Agent 开始办事，把这些依据留成可复用的记录，可能催生一层新的业务底账，成为下一代平台的起点。"
---
> **原文链接**: [https://x.com/jayagup10/status/2003525933534179480](https://x.com/jayagup10/status/2003525933534179480)
> **来源**: x.com
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/jaya-context-graphs/) · 2026/10/31
> **说明**: 本文由 AIHot 自动聚合(原文即中文,未翻译)。正文取自小互 AI 解读

---

全文 Markdown · 会员

作者：Jaya Gupta、Ashu Garg10-31 · 13 分钟🎧 听播客版0:00 / --:--

[视频/音频](https://xiaohu.ai/media/jaya-context-graphs/podcast.zh-cde6e9f76663.mp3)
0:00 / --:--![](https://pic.xiaohu.ai/jiedu-media/jaya-context-graphs/social/zh-b5d290e078b6.png)

过去，公司用 Salesforce 管客户，用 Workday 管员工，用 SAP 管经营。这些软件记清了客户是谁、员工是谁、合同多少钱，构成了企业日常运转的基础底账。业务人员要查资料、核对数字、推进工作，都得以这些记录为准。掌握权威记录，软件就进入了公司的日常工作流，也越来越难被替换。上一代企业软件正是由此形成了万亿美元级的生态。

现在，越来越多公司开始让 Agent（能调用软件完成具体任务的 AI 程序）协助处理日常业务，比如审查合同、跟进工单或核算续约折扣。但在真正上手时，人们很快发现 Agent 经常卡在各种特殊情况上：系统里明明存着各种字段和数字，可一旦遇到需要变通的业务，AI 往往不知道该照章办事还是破例通融。这类卡点光靠把数据整理干净、打通接口还不够：员工遇到例外时依据什么判断、找谁批准，往往没记在软件里。

#### 现在的软件到底缺了啥？

公司里有两套规则：一套写在纸上，一套活在老员工脑子里。

拿一笔老客户续约举例，明文规定和实际处理可能是这样：

- **写在纸上的规则**：老客户续约，常规最多优惠 10%（即打九折）。
- **实际发生的事情**：因为这位客户此前遭遇过严重系统故障，业务负责人参考了上季度类似情况的特批先例，并在向上级沟通请示后获得批准，这次破例批了 20% 的优惠（即打八折）。

如果这笔业务交给老员工经手，他往往能把事情办下去。他不会只盯着系统里的折扣上限，而是会主动去监控系统里翻看客户遭遇过几次故障、去工单系统里查看有没有积压未决的投诉，再去翻看以前的即时沟通记录，甚至私下向同事打听之前的处置惯例，最后找有审批权的主管说明原委并拿到特批。

然而，这套综合判断做完之后，录入客户管理软件的往往只有最后那行冷冰冰的结果：“折扣 20%”。当初为什么能破例、调取了哪些故障证据、参考了哪位领导批准的先例，全都没有随之存入系统。传统软件记住了最终办成的结果，却把人类当初做出判断与特批的依据全留在了系统之外。

这种缺失在企业日常运转中随处可见，主要集中在四类信息上：

1. **口耳相传的非正式经验**：比如老销售都知道，医疗行业客户采购流程长，谈折扣时大家私下都习惯多给点让步。这种经验通常是在带新人或私下闲聊时口头相传的，客户管理软件里没有这条经验的记录，新接手的人查遍系统也无从得知这一背景。
2. **散落在过去的办事先例**：比如上个季度团队给某家情况类似的客户批过某种特殊方案。以往经办人全凭个人记忆去参考旧例，但在软件里，这两笔交易各自独立存在，没有任何链接把它们关联起来，更没记录当时为何破例，后来者根本查不到以往的参照依据。
3. **跨越多个系统的综合判断**：技术支持负责人决定把某张工单直接升到三级支持时，通常要先在客户软件里查客户每年贡献的收入，又去工单软件里核对两条还没解决的升级工单，最后在即时通讯软件里看到客户有流失风险的讨论，综合各处信息才拍板升级。可工单系统最终只留下一句“已升级至三级支持”，外界查不到这套横跨多套系统的权衡过程。
4. **系统之外的特批审批**：员工在开会、视频通话或私聊中向主管汇报了特殊情况，主管口头同意破例。最终录入系统的只有改动后的折扣数字，至于为什么能破例、哪位主管在什么条件下批准，全留在了系统外部的聊天记录或脑海里，最终业务记录里看不到这些批准凭据。

当企业尝试让 Agent 接手这套业务时，麻烦就来了。

如果把 Agent 放到同样的续约场景中，它能查到明文规定写着“最多优惠 10%（九折）”，也能在历史库里查到曾有一笔批出“20%（八折）”的成交记录。但系统记录既没告诉它那次八折为什么获批，也没写明哪些故障情况具有可比性，也没留下那次具体由谁批准、批准时看了哪些条件。

这时，两种最直接的做法都可能出问题：

- **如果机械按常规规章办**，直接拒绝给予更多优惠，就无法处理原本合情合理的特批例外，可能导致遭遇严重事故的重要客户流失；
- **如果盲目照抄历史上的特批八折**，又可能误把一次针对特定事故的通融，当成人人适用的普遍规则，造成无谓的利润损失。

要让事情继续往前走，团队还是得回头找人补齐背景、确认先例，再按权限申请批准。原本期望自动化的业务流程，转了一圈又重新依赖老员工的个人经验和跨系统打听。AI 拿到了业务数字，却没拿到当初从这些信息走向特批决定的依据；这一段，单看最终结果补不出来。

#### 把这次特批的依据，留给下一次处理

要让下一位接手的人或 Agent 少找人、少重查，得先把这次特批怎样获准留下来。投资机构 Foundation Capital 的两位合伙人 Jaya Gupta 与 Ashu Garg 提出的办法，是让 Agent 一边办理业务，一边把取证、判断、请批和执行的记录保存下来。

![分散在邮件、聊天与会议中的决策依据汇入统一漏斗](https://pic.xiaohu.ai/jiedu-media/jaya-context-graphs/original-cover.jpg)

分散在沟通中的依据汇入可查记录。

沿着前面的续约问题，原文给出了一个具体场景：常规最多优惠 10%（九折），受到严重服务影响的客户可以申请例外。Agent 提议给客户优惠 20%（八折），随后从监控系统里找出该客户遭遇的 3 起严重故障（SEV-1），从工单系统找到一张写着“不解决就退订”的未结工单，还翻出了上一季度副总裁批准过类似例外的记录。

这些材料凑齐后，Agent 把方案和依据交给财务审批。财务批准，客户管理软件才写入“优惠 20%”。

同一次续约，两种记录

##### 最后批了八折，为什么能批也要记下来

按原文续约案例示意。常规最多优惠一成，也就是九折；这次方案是优惠两成，也就是八折。

当前规则**最多优惠 10%（九折）**

服务受影响可走例外审批。
本次证据**3 起严重服务故障**

故障监控软件 PagerDuty 中的记录。
客户诉求**“不解决就取消”**

客服工单软件 Zendesk 中尚未解决的升级工单。
历史先例**上季度副总裁批准过类似例外**

这次可以拿来比较，仍要取得本次批准。

↓**Agent 汇总证据、核对政策，交财务审批**
财务已批准**八折方案可以写进客户管理软件**

批准记录与依据一起保留；下次可以查到这次怎样获得授权。

###### 只看最终结果

优惠 20%（八折）

修改记录可补充谁在何时改了什么，但不会自动说明为什么获批。

###### 再看这次决定的依据

客户与续约 → 事件、工单、政策和先例 → 财务批准 → 写入结果

这些关联保留下来，才方便回查与复用。

结果仍然是八折，多留下来的却是一份可回查的办事记录：哪个 Agent 在办理哪笔续约、提出了什么方案、引用了哪些故障和工单、核对的是哪一版政策、走了哪条例外审批通道、参考了哪次先例，以及本次由谁批准、最后写入了什么。原文把这样一次从材料到行动的记录称为**决策轨迹**。

这里发生了一个重要变化：系统除了保存客户、合同、工单这些“业务对象”，还把**“这次特批决定”本身作为一份记录**。以后既可以打开合同查最后打了几折，也可以查这次决定，看到当时的证据、规则和批准依据。决定引用了哪些业务对象、又参考了哪次旧决定，都成为这份记录的一部分。

这条轨迹把客户、续约、故障、工单、政策和审批人联系起来，还指向了上季度那次特批。以后别的续约又可能引用这次决定，或者用到同一条政策。把这些跨越不同业务对象和时间的关联积累起来，就形成了**上下文图谱（Context Graph）**。它保存的是企业实际办事的证据与批准记录，不是模型内部的思维链。

下次再遇到服务受损的客户，处理者就能顺着关联找到旧案：当时发生了哪些故障、客户提出了什么要求、什么条件下获准破例。拿这些条件与本次情况比较后，再按当前政策和权限处理，就有了参照，不必每个季度都在聊天群里重新问一遍“以前这种事怎么办”。先例提供参考，本次需要的批准仍得取得。

企业也不用等到 AI 能独立拍板才开始做。起初，Agent 负责找资料、提方案、递交审批，人来决定；只要这次的依据和批准留下来，记录就增加了一条。下次办理可以查到它，再把新的处理过程存进去。随着同类情况反复出现，企业才有条件把其中一些重复环节逐步交给 Agent。即使最后仍由人批准，这份可查的经验也一直在增长。

#### 决策记录为什么可能成为新的业务底账？

记下一次特批，确实方便以后查。但为什么这件事值得成为一类新的底层系统，甚至带来新的平台机会？

仍以续约为例。查客户身份、合同金额、当前折扣，企业可以以客户管理软件为准；查这次为什么允许八折、当时依据什么、由谁批准，则需要一份可靠的决策记录。两份记录分别回答业务现在是什么状态，以及这个状态当初怎样获得批准。新的一层，便是为后一类问题保存权威依据。

这里的“底层”，指的是它可以支撑后续的人和 Agent 办事。Agent 在不同软件上操作，客户资料和总账仍可留在旧系统；执行时产生的决定与这些业务对象关联，形成一套可以反复查询和引用的决策底账。

当后续业务开始持续引用这些依据，保存它们的系统就会逐渐进入日常工作流：申请例外要查它，审核要核对它，出了错也要回到这里追查。记录从办完一件事后的留档，变成继续办事所需的输入。

这份历史还有独立于某次 Agent 运行的价值。更换办事的模型或工具，企业仍需要知道过去按哪版政策、凭哪些证据、经过谁批准。

这正是两位作者看重的平台机会：谁能成为企业查询和复用决策依据的权威入口，谁就有机会建立长期的软件价值。记录能否持续被业务使用，是从“多留一份日志”走向新底层系统的关键。

#### 客户软件和数据仓库都有记录，为什么还会缺？

读到这里，很容易想到：客户管理软件本来就有修改记录，数据仓库也能查历史，为什么还要增加一层？

先看修改记录能回答什么。它可以告诉你，谁在什么时候，把某笔续约的优惠从 10% 改成了 20%。但那三起故障、客户的退订要求，以及财务当时批准的理由，分散在其他地方；改一个折扣字段，并不会自动把这些依据一并收齐。字段历史有用，完整的办事依据还需要另行记录。

数仓解决的是把已有数据汇总起来的问题。它能保留历史、分析折扣怎样变化；如果源头已经存下了决策轨迹，也能接收和分析这些轨迹。但如果源头只留下“20%”，事后把这个数字同步到数仓，就补不出当初没记录的批准理由。

因此，关键在于由谁在事情发生时，把依据连同结果一起留下。安排 Agent 实际办事的平台会经历整个过程：调取故障和工单、核对政策、引用旧例、提交财务、取得批准，再写入折扣。在结果落地的这一刻，这些信息都经过它，正好可以同时保存。仅仅提供开发 Agent 的工具，还不代表参与了这次业务的实际处理。

看位置，也看是否实际记录

##### 决策依据要在流程里留下来

按原文讨论的传统分工示意，三层可以协作，也可能由同一家厂商提供。

业务系统

###### 提供资料，接收最终结果

客户软件管客户和合同，财务软件管账本。修改记录能留住变更，但各处依据不会因数字变化而自动聚齐。
↓ 读取资料安排 Agent 实际操作的平台

###### 决策发生时，收集并保存整条依据

读取事件和工单 → 核对当时政策 → 引用先例 → 请求批准 → 写入结果。

在这些动作发生时，把记录与客户、续约和审批人连接起来，积累为上下文图谱。
↓ 汇总已记录的数据数据仓库

###### 保存、查询和分析已有记录

若源头只写下“八折”，事后同步不会自动找回批准理由。若源头记录了决策轨迹，数仓也能接收和分析它。

关键在于谁真正进入跨系统流程并记录依据。现有平台也能通过集成进入这个位置；“新公司必胜”仍是投资判断。

这也是作者看好新平台的原因：一套软件如果负责跨系统办理业务，就更有机会留下各个系统单独看不到的处理依据。不过，老厂商同样可以把产品延伸到这个位置。行业分析师 Jamin Ball 的反方观点是，Agent 仍需要权威的基础记录，老系统可以通过升级继续承担这一角色。Salesforce 已有字段历史，其架构文档也列出了跨系统调用工具、让不同平台上的 Agent 分工协作的做法；这些都为进入执行流程提供了条件。

作者预期，竞争还会涉及收购执行工具、限制接口、提高数据导出费用，以及推广自家 Agent 框架、把业务留在自家生态里。谁能更容易进入实际工作流程，谁就更有条件积累记录。竞争的关键是能否持续留下完整依据，不能只凭新公司或老厂商的身份判断输赢。

#### 增加这层能力，要把旧软件整套换掉吗？

要成为企业的决策底账，新平台得先进入实际业务。但客户、合同和账本已经在旧软件里运转，增加 Agent 办事和记录依据的能力，是否意味着这些都得重来？作者梳理了三条路，接管范围各不相同。

**第一条，重做一整套业务平台。** 从基本设计开始，就让 Agent 能参与执行，并把当时的政策和处理记录一起保存。销售领域的 Regie 是作者举的例子：它为人和 Agent 共同工作重建销售执行平台，让 Agent 找线索、生成触达内容、持续跟进、分流任务，并在需要时交给人。这样接管的是一段完整的销售执行流程，超出了单独帮销售写邮件的工具。

这条路可以把执行和留痕一起设计，却也要面对旧平台根深蒂固的阻力。企业正准备更换或升级系统时，才更可能出现切入口。Regie 的案例针对销售触达与跟进平台，不意味着企业整个客户管理系统都已被替换。

**第二条，只接管一个子流程，旧系统继续当底账。** 企业未必愿意换掉总账，但可以把例外和审批集中的一段工作交给新平台。比如财务领域的 Maximor，处理现金、关账与核心会计流程，原有 ERP 仍保存总账。新平台保留具体的对账逻辑和处理依据，再把最终状态同步回旧系统。

这样，企业仍能在旧账本里看最后的账，却要到新平台查这次账是怎样核对、调整的。新平台有了自己的必用价值，也无需一开始就承担整套替换。

**第三条，为过去没有系统保存的依据，建立新的记录系统。** 比如线上服务出故障，支持人员、开发、运维和测试都可能掌握一部分信息，却需要有人把代码、配置、基础设施与客户行为串起来，才能理解发生了什么。这正是 PlayerZero 切入的工作交界：先从二、三级技术支持入手，逐渐积累这些关联。

作者看重的是，这些记录有望帮助团队回答“线上为什么会出故障”，并进一步判断“这次代码改动会不会影响生产环境”。这一条路的重点，是在协助处理问题的过程中，建立原先没有统一存处的记录。新平台的价值也随之延伸：以后团队要追问当初为什么这样处理，就会回到这里查依据。

这些平台办理的业务越来越多，还需要解决一个配套问题：出了错，怎样定位原因、持续评估质量？例如某次折扣处理有误，团队要沿着轨迹查取到的资料是否属于这个客户、政策版本对不对、本次是否取得所需批准；积累更多运行记录后，还要看 Agent 常在哪些环节失败、决策效果怎样变化。

作者用 Arize 说明这一层机会：为团队提供 Agent 行为及决策效果的可见性，支持监控、排错和评估。执行与决策记录系统逐渐发展，也会带动管理这些自动化业务的配套基础设施。

#### 哪些工作值得先做？

企业里有很多流程，并非每一项都需要这样的图谱。如果规则固定、结果确定，Agent 照规则执行即可。复杂决策记录最有用的地方，是人经常得说“要看具体情况”的业务。

作者给出两个适用于上述三条路的信号：

- **大量人手在反复衔接多个系统。** 比如分派工单、筛查请求、核对各处数据。要看这些人具体在忙什么：如果他们不断比较背景、处理冲突、找人确认，就说明流程里有传统固定脚本难以接住的判断。
- **例外多，经常要参考以前怎样办。** 比如大单特批、商业核保、合规审查、工单升级。单一规则无法覆盖所有情况，过去的批准条件和处置先例才会影响下一次处理，因此留下这些记录更有用。

如果考虑第三条“新建记录系统”，还可以看公司为什么设置了某些跨部门协调岗位。业务运营要对齐销售、市场、财务和客户成功；开发运维要衔接开发、IT 和支持；安全运营要横跨工程、IT 和合规。这些岗位常被称为 RevOps、DevOps、Security Ops。它们的一项重要工作，就是替多套软件携带、对齐上下文。

让 Agent 协助这类岗位时，如果只把操作加快，业务经验仍可能留在沟通里；把每次处理用到的信息、例外、先例和批准也留下来，才有机会形成新的权威记录。这里寻找的是软件尚未承接的工作，而不是看见一个岗位就认定有市场。

#### 下一代平台争的是哪份权威记录？

客户、员工、合同和账本仍是企业的基础记录。随着 Agent 接手更多工作，规则如何被应用、冲突如何被处理、例外凭什么获准，也需要成为可保存、可查询、可复用的记录。新的机会，就出现在这类过去常被留在人脑和沟通中的信息上。

Foundation Capital 的两位作者把这称为潜在的“万亿美元机会”。这是他们对下一代企业软件的投资判断：当办事入口逐渐交给 Agent，支撑它们行动的决策依据，也可能成为企业日常离不开的一层权威记录。新平台的起点，是把一次业务怎样办成的依据留下；它能走多远，要看这些依据能否持续支撑下一次业务。

来源AI’s trillion-dollar opportunity: Context graphsJaya Gupta、Ashu Garg·2025-12-22·[查看主材料](https://x.com/jayagup10/status/2003525933534179480)延伸[Foundation Capital 官网同文](https://foundationcapital.com/ideas/context-graphs-ais-trillion-dollar-opportunity)·[Salesforce：字段历史追踪](https://trailhead.salesforce.com/en/content/learn/projects/customize-a-salesforce-object/account-field-history-tracking)·[Salesforce：Agent 集成模式](https://architect.salesforce.com/docs/architect/fundamentals/guide/agentic-integration-patterns)本站说明原帖经 FxTwitter 恢复全文，并与官网同文核对；Salesforce 当前官方材料用于本次解读的补充核查。
Context Graphs · 决策记录

## AI 时代的下一个万亿级平台机会：一个记录“决策过程与理由”而非仅仅“业务对象”的全新底层系统

旧软件管客户、合同和账本。Agent 开始办事后，企业还需要一套能查清“这次为什么获准”的记录。

### 规则写九折，旧案批过八折：这次该怎么办？

**九折**常规上限**八折**服务受损后获批的例外

老员工会查故障、看投诉、翻先例，再找有权限的人批准。系统最后往往只留下“优惠 20%”。Agent 接手时，就少了判断本次能否申请例外的依据：守死规则可能丢客户，照抄旧案又可能让利过度。

- 口耳相传的经验
- 散落的历史先例
- 跨系统的综合判断
- 业务记录之外的批准

### 让这次决定，也成为一份记录

Agent 在办理时，把证据、政策、先例、审批和写入一起留下。原文的续约场景说明了怎样做：

#### 八折方案，先取证，再申请本次批准

证据与先例

- **3 起严重故障**
  监控中的 SEV-1 记录
- **尚未解决的工单**
  客户要求“不解决就退订”
- **上季度类似特批**
  副总裁曾批准，可作比较

规则与本次审批

常规最多优惠 10%；严重服务影响可申请例外。

Agent 汇总材料，交财务审批。

**未批准：**八折仍是方案。
**财务批准：**客户软件才写入优惠 20%。

旧先例供参考，仍要取得本次所需的批准。

合同里的最终状态**优惠 20%**保留客户、合同等业务对象。这次决定的记录

为何提出八折 → 引用了什么 → 哪版政策 → 谁批准 → 最后写入什么
把决定本身保存下来，关联故障、工单、政策、审批人和旧决定。

一次决定形成一条“决策轨迹”；多次决定按客户、政策、引用先例等关联起来，就是**上下文图谱**。记录的是业务证据与批准，不是模型内部思维链。

#### 留档怎样变成企业持续依赖的底账？

**本次留下依据**

人仍审批时，也能把处理过程保存下来。
→**下次比较引用**

按旧案条件核对本次情况，再按当前权限处理。
→**日常工作依赖**

办理例外、审核和排错持续回到这里查依据。

新决定继续增加记录；同类情况反复出现后，企业才有条件逐步自动化更多环节。更换模型或工具，过去按哪版政策、凭什么、由谁批准的历史仍有价值。

**只有后续业务持续引用这些记录，保存它们的系统才可能成为新的权威入口。**这是平台价值的来由。

### 谁适合在办事时把依据留下？

修改记录能查谁在何时改了什么；外部故障、工单和批准理由不会随改值自动聚齐。数据仓库能汇总历史，也能接收已保存的轨迹；源头没记下的理由，事后搬数字补不出来。实际执行方经历取证、查规则、请批、写入，适合边办边记。客户和总账仍可留在旧系统。

老厂商也能通过集成进入执行流程。竞争在于能否真正收齐并持续保存依据，不取决于新旧厂商身份。作者还预期围绕收购、接口、数据导出费用和自家框架的竞争。

### 新系统怎样进入已经运转的企业？

#### 重做业务平台 Regie

为人和 Agent 共作重建销售执行流程：找线索、触达、跟进、分流给人。旧平台难替换，更换或升级时才更可能出现入口。

#### 接管子流程 Maximor

接现金、关账与会计流程；ERP 保留总账，新层保存对账逻辑和处理依据，再把最终状态同步回旧系统。

#### 新建决策记录 PlayerZero

从二、三级支持进入，关联代码、配置、基础设施和客户行为；作者看重其解释故障、判断改动影响的潜力。

Agent 处理规模扩大，还需要监控、定位失败与评估决策效果。作者以 Arize 说明这类配套基础设施机会。

### 先找经常需要说“看情况”的工作

**两个通用信号：**大量人手跨系统比较、协调和确认；例外多、经常需要查旧案。规则固定、结果确定的流程未必需要复杂图谱。

**新建记录系统再看一种信号：**有人专门对齐销售与财务、开发与支持，或工程与合规。这些协调岗位替多套软件携带上下文；Agent 协助办理并留下依据，才可能补上原先没有的记录。

原文版权归原作者，这里只供对照阅读。 [看原网页 ↗](https://x.com/jayagup10/status/2003525933534179480)

## AI’s trillion-dollar opportunity: Context graphs

![](https://pbs.twimg.com/media/G83zx64XkAE-f-X.jpg)

The last generation of enterprise software created a trillion-dollar ecosystem by becoming systems of record. Salesforce for customers. Workday for employees. SAP for operations. Own the canonical data, own the workflow, own the lock-in.

The debate right now is whether those systems survive the shift to agents. Jamin Ball’s recent post “[Long Live Systems of Record](https://cloudedjudgement.substack.com/p/clouded-judgement-121225-long-live)” hit a nerve. Pushing back on the “agents kill everything” narrative, he argues that agents don’t replace systems of record, they raise the bar for what a good one looks like.

We agree. Agents are cross-system and action-oriented. The UX of work is separating from the underlying data plane. Agents become the interface, but something still has to be canonical underneath.

Where we go further is this: Ball’s framing assumes the data agents need already lives somewhere, and agents just need better access to it plus better governance, semantic contracts, and explicit rules about which definition wins for which purpose.

That’s half the picture. The other half is the missing layer that actually runs enterprises: **the decision traces** – the exceptions, overrides, precedents, and cross-system context that currently live in Slack threads, deal desk conversations, escalation calls, and people’s heads.

This is the distinction that matters:

**Rules** tell an agent *what should happen in general* (“use official ARR for reporting”)

**Decision traces** capture *what happened in this specific case* (“we used X definition, under policy v3.2, with a VP exception, based on precedent Z, and here’s what we changed”).

Agents don’t just need rules. They need access to the decision traces that show how rules were applied in the past, where exceptions were granted, how conflicts were resolved, who approved what, and which precedents actually govern reality.

This is where systems of agents startups have a structural advantage. They sit **in the execution path**. They see the full context at decision time: what inputs were gathered across systems, what policy was evaluated, what exception route was invoked, who approved, and what state was written. If you persist those traces, you get something that doesn’t exist in most enterprises today: a queryable record of how decisions were made.

We call the accumulated structure formed by those traces a **context graph**: not “the model’s chain-of-thought,” but a living record of decision traces stitched across entities and time so precedent becomes searchable. Over time, that context graph becomes the real source of truth for autonomy – because it explains not just *what* happened, but *why it was allowed* to happen.

The core question isn’t whether existing systems of record survive. It’s whether entirely new ones emerge – systems of record for decisions, not just objects – and whether those become the next trillion-dollar platforms.

### What systems of record don’t capture

Agents are shipping into real workflows – contract review, quote-to-cash, support resolution – and teams are hitting a wall that governance alone can’t solve.

The wall isn’t missing data. It’s missing decision traces. Agents run into the same ambiguity humans resolve every day with judgment and organizational memory. But the inputs to those judgments aren’t stored as durable artifacts. Specifically:

- **Exception logic that lives in people’s heads.** “We always give healthcare companies an extra 10% because their procurement cycles are brutal.” That’s not in the CRM. It’s tribal knowledge passed down through onboarding and side conversations.
- **Precedent from past decisions.** “We structured a similar deal for Company X last quarter – we should be consistent.” No system links those two deals or records why the structure was chosen.
- **Cross-system synthesis.** The support lead checks the customer’s ARR in Salesforce, sees two open escalations in Zendesk, reads a Slack thread flagging churn risk, and decides to escalate. That synthesis happens in their head. The ticket just says “escalated to Tier 3.”
- **Approval chains that happen outside systems.** A VP approves a discount on a Zoom call or in a Slack DM. The opportunity record shows the final price. It doesn’t show who approved the deviation or why.

This is what “never captured” means. Not that the data is dirty or siloed, but that the reasoning connecting data to action was never treated as data in the first place.

### The context graph is the enduring layer

When startups instrument the agent orchestration layer to emit a decision trace on every run, they get something enterprises almost never have today: a structured, replayable history of how context turned into action.

*What does this look like in practice?* A renewal agent proposes a 20% discount. Policy caps renewals at 10% unless a service-impact exception is approved. The agent pulls three SEV-1 incidents from PagerDuty, an open “cancel unless fixed” escalation in Zendesk, and the prior renewal thread where a VP approved a similar exception last quarter. It routes the exception to Finance. Finance approves. The CRM ends up with one fact: “20% discount.”

Once you have decision records, the “why” becomes first-class data. Over time, these records naturally form a **context graph**: the entities the business already cares about (accounts, renewals, tickets, incidents, policies, approvers, agent runs) connected by decision events (the moments that matter) and “why” links. Companies can now audit and debug autonomy and turn exceptions into precedent instead of re-learning the same edge case in Slack every quarter.

**The feedback loop is what makes this compound.** Captured decision traces become searchable precedent. And every automated decision adds another trace to the graph.

None of this requires full autonomy on day one. It starts with human-in-the-loop: the agent proposes, gathers context, routes approvals, and records the trace. Over time, as similar cases repeat, more of the path can be automated because the system has a structured library of prior decisions and exceptions. Even when a human still makes the call, the graph keeps growing, because the workflow layer captures the inputs, approval, and rationale as durable precedent instead of letting it die in Slack.

### Why incumbents can’t build the context graph

Ball is optimistic that existing players evolve into this architecture. Warehouses become “truth registries,” while CRMs become “state machines with APIs.” His is a narrative of evolution, not replacement.

That might work for making existing data more accessible. It doesn’t work for capturing decision traces.

**Operational incumbents are siloed and prioritize current state.**

Salesforce is pushing Agentforce, ServiceNow has Now Assist, and Workday is building agents for HR. Their pitch is “we have the data, now we add the intelligence.”

But these agents inherit their parent’s architectural limitations. Salesforce is built on current state storage: it knows what the opportunity looks like now, not what it looked like when the decision was made. When a discount gets approved, the context that justified it isn’t preserved. You can’t replay the state of the world at decision time, which means you can’t audit the decision, learn from it, or use it as precedent.

They also inherit their parent’s blind spots. A support escalation doesn’t live in Zendesk alone. It depends on customer tier from the CRM, SLA terms from billing, recent outages from PagerDuty, and the Slack thread flagging churn risk. No incumbent sees this because no incumbent sits in the cross-system path.

**The warehouse players have a different problem: they’re in the read path, not the write path.**

Ball positions @Snowflake and Databricks as the “truth registry” layer. Both are leaning in – Snowflake pushing Cortex and acquiring Streamlit, Databricks acquiring Neon and launching Lakebase and AgentBricks. The pitch: data platforms replace systems of record and become the foundation for AI agents.

Warehouses do have a time-based view. You can query historical snapshots, track how metrics changed, and compare state across periods. But warehouses receive data via ETL after decisions are made. By the time data lands in Snowflake, the decision context is gone.

A system that only sees reads, after the fact, can’t be the system of record for decision lineage. It can tell you what happened, but it can’t tell you why.

Databricks is further along in putting the pieces together. But being close to where agents get built isn’t the same as being in the execution path where decisions happen.

**Systems of agents startups have a structural advantage: they’re in the orchestration path.**

When an agent triages an escalation, responds to an incident, or decides on a discount, it pulls context from multiple systems, evaluates rules, resolves conflicts, and acts. The orchestration layer sees the full picture: what inputs were gathered, what policies applied, what exceptions were granted, and why. Because it’s executing the workflow, it can capture that context at decision time – not after the fact via ETL, but in the moment, as a first-class record.

**That’s the context graph, and that will be the single most valuable asset for companies in the era of AI.**

**Incumbents will fight back.** They’ll try acquisitions to bolt on orchestration capabilities. They’ll lock down APIs and adopt egress fees to make data extraction expensive – the same playbook hyperscalers used. They’ll build their own agent frameworks and push “keep everything in our ecosystem” narratives.

But capturing decision traces requires being in the execution path at commit time, not bolting on governance after the fact. Incumbents can make extraction harder, but they can’t insert themselves into an orchestration layer they were never part of.

### Three paths for startups

Systems of agents startups will take different paths, each of which has its own tradeoffs.

**Some will replace existing system of records from day one.** A CRM or ERP rebuilt around agentic execution, with event-sourced state and policy capture native to the architecture. This is hard because incumbents are entrenched, but it becomes viable at transition moments.

Of the many startups going after the AI SDR category, [Regie](https://www.regie.ai/) has chosen to build an AI-native sales engagement platform to replace legacy platforms like Outreach/Salesloft, which were designed for humans executing sequences across a fragmented toolchain. Regie is designed for a mixed team where the agent is a first-class actor: it can prospect, generate outreach, run follow-ups, handle routing, and escalate to humans.

**Some will replace modules rather than entire systems.** These startups target specific sub-workflows where exceptions and approvals concentrate, then become the system of record for those decisions while syncing final state back to the incumbent.

[Maximor](https://www.maximor.ai/) is doing this in finance: automating cash, close management, and core accounting workflows without ripping out the GL. The ERP remains the ledger, but Maximor becomes the source of truth where the reconciliation logic lives.

**Some will create entirely new systems of record.** These startups start as orchestration layers, but they persist what enterprises never systematically stored: the decision-making trace. Over time that replayable lineage becomes the authoritative artifact. The agent layer stops being “just automation” and becomes the place the business goes to answer “why did we do that?”

[PlayerZero](https://playerzero.ai/?matchtype=&utm_source=google&utm_medium=cpc&utm_campaign=23361480948&utm_content=&utm_term=&hsa_acc=6526734515&hsa_cam=23361480948&hsa_grp=&hsa_ad=&hsa_src=x&hsa_tgt=&hsa_kw=&hsa_mt=&hsa_net=adwords&hsa_ver=3&gad_source=1&gad_campaignid=23370607165&gbraid=0AAAAABaTSHE2ca_tvJn9RsT1IJaFH_3wo&gclid=Cj0KCQiAjJTKBhCjARIsAIMC44-P3pLng0LsFJ7xbLVAtsAaJAlgiyzjnC3gezNwboiSvZdDlNkGS1YaAkNDEALw_wcB) exemplifies this pattern. Production engineering sits at the intersection of SRE, support, QA, and dev: a classic “glue function” where humans carry context that software doesn’t capture. PlayerZero starts by automating L2/L3 support, but the real asset is the context graph it builds: a living model of how code, config, infrastructure, and customer behavior interact in reality. That graph becomes the source of truth for “why did this break?” and “will this change break production?”: questions no existing system can answer.

**As startups pursue these paths, observability for agents will become critical infrastructure.** As decision traces accumulate and context graphs grow, enterprises will need to monitor, debug, and evaluate agent behavior at scale.

[Arize](https://arize.com/) is building the observability layer for this new stack – giving teams visibility into how agents reason, where they fail, and how their decisions perform over time. Just as Datadog became essential infrastructure for monitoring applications, Arize is positioned to become essential infrastructure for monitoring and improving agent decision quality.

### Key signals for founders

The signals for where to build overlap, but they aren’t identical.

**Two signals apply to all three opportunities:**

**High headcount.** If a company has 50 people doing a workflow manually (routing tickets, triaging requests, or reconciling data between systems), that’s a signal. The labor exists because the decision logic is too complex to automate with traditional tooling.

**Exception-heavy decisions.** Routine, deterministic workflows don’t need decision lineage: the agent just executes. The interesting surfaces are where the logic is complex, where precedent matters, and where “it depends” is the honest answer. Think use cases like deal desks, underwriting, compliance reviews, and escalation management.

**One signal points specifically to new system of record opportunities:**

**Organizations that exist at the intersection of systems.** RevOps exists because someone has to reconcile sales, finance, marketing, and customer success. DevOps exists because someone has to bridge development, IT, and support. Security Ops sits between IT, engineering, and compliance.

These “glue” functions are a tell. They emerge precisely because no single system of record owns the cross-functional workflow. The org chart creates a role to carry the context that software doesn’t capture.

An agent that automates that role doesn’t just run steps faster. It can persist the decisions, exceptions, and precedents the role was created to produce. That’s the path to a new system of record: not by ripping out an incumbent, but by capturing a category of truth that only becomes visible once agents sit in the workflow.

### Systems of record, reimagined

The question isn’t whether systems of record survive – they will. The question is whether the next trillion-dollar platforms are built by adding AI to existing data, or by capturing the decision traces that make data actionable.

We think it’s the latter. And the startups building context graphs today are laying the foundation.

Published on 12.22.2025 Written by Jaya Gupta and Ashu Garg

- [Facebook](https://www.facebook.com/sharer/sharer.php?u=https://foundationcapital.com/)
- [Twitter](https://twitter.com/intent/tweet?url=https://foundationcapital.com//&text=&via=)

↑ 正文结束
✓ 本篇全文免费开放

会员可复制、下载全文 Markdown，还能让你的 AI 订阅和提问。
[订年卡 $59/年](https://xiaohu.ai/buy/?plan=year)[看权益对比 →](https://xiaohu.ai/membership/)

[阅读原文 ↗](https://x.com/jayagup10/status/2003525933534179480)

📮 新解读每晚进邮箱

读完觉得有用？留个邮箱，每晚一封当天的新解读，随时退订。
