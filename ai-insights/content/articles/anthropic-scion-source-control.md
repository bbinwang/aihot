---
title: "Anthropic 放弃代码管理工具 Git，自己开发了一套名为 Scion 的版本控制系统，来适应 AI 开发需要"
date: 2026-10-14T00:00:00.000Z
tags: ["深度", "Anthropic", "Scion", "AI编程", "Agent", "软件工程", "聚合"]
summary: "原文链接 : https://www.anthropic.com/engineering/redesigning source control 来源 : Anthropic Engineering 发现于 : 小互 · AI 解读站 · 2"
---
> **原文链接**: [https://www.anthropic.com/engineering/redesigning-source-control](https://www.anthropic.com/engineering/redesigning-source-control)
> **来源**: Anthropic Engineering
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/anthropic-scion-source-control/) · 2026/10/14
> **说明**: 本文由 AIHot 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

[Anthropic 工程](https://www.anthropic.com/engineering)

## 在 Anthropic 重新设计源码控制

发布于 2026 年 10 月 13 日

随着我们每日合并次数增长超过十倍，source control 成了我们最大的开发瓶颈。在这里，我们分享如何在五个月内迁移到一套自研的 version control 系统。

在 Anthropic,编写代码已不再是构建系统或开展研究的瓶颈。Claude 能够自主迭代研究循环、对复杂程序进行微优化，并以我们前所未见的速度和规模从零开始构建新服务。如今的瓶颈，是所有为人类规模而设计的开发者基础设施：source control、构建，以及 CI。

2026 年 5 月，Anthropic 平均每天合并约 2,500 个代码变更；到 9 月，我们每天的合并量已超过 30,000 个。我们不预期这一增长速度会在近期放缓：合并代码的潜在需求几乎是无限的，而每移除一个瓶颈，都会立即带来代码产量的进一步增长。

![](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2F1e2a750dba61db4a76b72eec5b0cf50b8a7f878c-3840x2160.png&w=3840&q=75)

2026 年 1 月至 9 月，每日合并到我们 monorepo 的变更数量。

为了支撑这一增长，我们构建了 Scion——一套自研的 version control 系统——并在五个月内将我们的 monorepo 从 git 完全迁移了过来。在同一时期，我们还构建并上线了代码评审界面(称为 Antique)、代码搜索、一套丰富的 source control IAM 系统，以及管理和落地大量已评审代码的新方式等等。在本文中，我们将重点介绍我们是如何构建 Scion 的。这是一个很有意思的案例研究：Claude 的代码编写能力既是最初让我们陷入这种局面的原因，*也*是让我们得以快速构建一套高质量、可扩展的系统来应对这一局面的手段。

### 不断增长的 monorepo

在深入探讨我们所构建的东西之前，我们应当承认，我们的工作负载有多么不同寻常。不出所料，Anthropic 使用 Claude 编写软件的程度远超几乎所有其他公司，因此我们往往是第一批看到为人类规模设计的工具开始吃紧的人。Source control 只是其中一个例子。虽然我们预计近期内不会有太多组织遇到这些问题，但我们怀疑，用不了多久，其他使用 AI 编程工具的人也会碰到相同的压力点，这正是我们想要分享我们所构建的东西以及所学到的经验的原因。

Git 是一个去中心化的系统：每个 clone 都是一个完整、自包含的仓库，可以在完全离线的情况下计算 diff、读取历史和 blame,并 checkout 任意 revision。对于绝大多数仓库而言，这是正确的设计，也是 git 能成为事实标准的重要原因。

随着我们 monorepo 的增长，它越来越不符合这一设计空间。仅 main branch 的历史就接近 100 GB,一份*压缩后*的工作副本也超过 25 GB。我们每天为 CI 执行约 2,500 万次代码 checkout,这还未计入开发者环境、agent 沙箱和研究任务。如果按最原始的方式 fetch,这将意味着每天超过 600 PB 的 git 流量。

Git 提供了一些处理仓库切片的工具，例如 shallow clones、sparse checkouts 和 promisor remotes。除此之外，针对大型 monorepo 还有一些标准的变通方案，比如内部 git mirrors,以及保存在 blob storage 中的仓库快照(seeds)。这些我们都用过——在高峰期，我们运维了数百个内部 git mirrors 来应对负载。这为我们争取了时间，但随着合并速率的上升，它们的运维变得越来越困难。两次刷新之间，seeds 会离 main 的最新 tip 越来越远；要让 diff、blame 这类依赖历史的操作在 partial clones 上继续正常工作，也需要越来越多的细心维护。

![](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2Fff019752973f6d83d2f6ba3bf56636aced3ea82c-3840x1238.png&w=3840&q=75)

扩展 git checkout 的典型设置。

回过头来看，我们注意到，与大多数公司一样，我们把 git 当作一个只有一份权威副本的中心化系统来使用，而我们几乎所有的客户端都是天然在线的 Agent 和作业。git 那些使其擅长分布式、离线工作的特性，随着仓库规模的增长，反而在切实地阻碍我们的扩展能力。于是我们自问：如果从设计之初就把 Agent 始终在线这一事实纳入考量，版本控制系统会是什么样子？

### Agent 规模版本控制的原则

随着 agentic coding 的兴起，关于软件开发方式的许多常见假设都在演变。我们在构建 Scion 时拥抱了这些变化，这使我们能够在几项核心原则上采取与 git 截然不同的做法。面向超大型 monorepo 的版本控制已有先例，其中最著名的是 Google 的 [Piper](https://en.wikipedia.org/wiki/Piper_(source_control_system)) 和 Meta 的 [Sapling](https://sapling-scm.com/)，因此我们在构建 Scion 时得以借鉴它们来之不易的经验。我们的原则是：

**客户端始终在线。** git 假定客户端离线工作，需要仓库的完整副本。但由于我们几乎所有的客户端都是 Agent 和作业，Scion 的客户端和协议是围绕一台始终可访问的服务器设计的，由客户端在需要时获取数据。

**客户端-服务器不对称。** 在 git 中，每个客户端都有能力成为一台功能完备的服务器。而在 Scion 中，由服务器来解答有关文件历史和 blame 的疑问、创建 commit、执行 merge 和 rebase 等操作。客户端则维护一个有界的本地对象缓存，在磁盘上布置工作副本文件，监控文件系统变更，并为用户提供一种便捷的方式与服务器协作。它自身几乎无法进行任何计算，但作为交换，它在本地需要的数据也少得多。

**一个全面的版本控制服务能够支撑许多新颖的应用。** 在 git 中，需要向仓库提问的 CI 作业或工具——比如“谁最后修改了这一行”或“这两个 commit 之间有何关联”——必须维护一份本地仓库副本，或者寄希望于厂商专属 API 提供答案。而在 Scion 中，客户端所使用的所有版本控制查询也都通过 API 对外暴露，因此在许多情况下，作业根本不需要本地仓库。许多内部工具，例如我们的自动化 bisect 和 revert 流水线，如果没有这种廉价、可编程的版本控制访问能力，在大规模下将无法实用。

**一切必须支持水平扩展。** 在峰值时期，我们运行了数百个 git 镜像，这给容量带来了沉重压力，而且一旦仓库超出镜像的磁盘或内存上限，就无法继续扩展。在 Scion 中，仓库数据是分布式的，每个组件都可以独立扩展；任何地方都不存在完全物化的仓库副本，即便是服务器上也没有。也不存在 packfiles（git 的压缩对象包）的对应物，因此无需任何仓库维护。

**commit 必须廉价、增量且无锁。** 在 git 中，你在本地 commit，然后 push 来共享你的工作。在 Scion 中，每一次 commit、rebase 或 merge 都发生在服务器上，因此没有什么可 push 的，但这些操作中的每一个都必须足够快。创建 commit 并更新其下游数据结构的开销必须与变更的大小成正比，而不是与仓库的整体大小成正比，否则服务器无法跟上。Scion 的开发生命周期不鼓励使用 refs（指向 commit 的指针，例如 branch 和 tag），主 ref 或发布分支除外，因为需要每台服务器都达成一致的 *全局* 状态是一个日益迫近的扩展难题。

**工作副本是可选的，且在设计上是稀疏的。** 由于我们的 monorepo 非常庞大，而且我们每天为 CI 进行数千万次代码 checkout，因此我们希望尽可能避免 checkout。在 Scion 中，例如，需要某个 commit 与其 merge base 之间 diff 的 CI 作业可以直接向服务器请求。写入操作同理：许多写入型工作负载也可以跳过 checkout，完全通过 API 完成。Scion 的协议围绕稀疏 checkout（sparse checkouts，仅包含客户端请求的目录）和虚拟化 checkout（virtualized checkouts，按需物化文件）构建，因此当作业确实需要磁盘上的文件时，客户端只需为它实际读取的内容付出代价。

### Scion 的工作原理

在构建 Scion 时，了解这些原则如何在实践中结合起来是很有帮助的。这些经验可以应用于其他源码控制系统，或者更广泛地说，应用于软件开发生命周期的其他阶段。

#### 数据结构

在 Scion 中，工作的基本单位是 "changeset",即 write-ahead log 中的一条记录。一个 changeset 存储了你在 git commit 中所能期望的大部分内容。但 git commit 存储的是一个指向 tree 的指针，而 changeset 存储的是相对于其第一个 parent 发生变更的文件列表，[1](https://www.anthropic.com/engineering/redesigning-source-control#footnote-1) 以及指向 blob 存储中压缩后文件内容的内容寻址指针。Changeset 在服务端创建，并可以立即在任何地方使用。

![](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2F71c83868210b4b571abb068ea4cd76de749566b1-3840x2995.png&w=3840&q=75)

Scion 中 changeset 的结构。

这种结构使我们能够以极高的吞吐量接受 changeset,因为不需要接受任何 packfile,没有锁或跨服务器协调，也不需要移动任何 ref。从技术上讲，Scion 确实支持 ref,但由于创建或获取 commit 都不涉及 ref,移动一个 ref 只是对单个 Spanner 行的 compare-and-swap 操作，该操作与创建 changeset 是分开进行的。

changeset 只记录变更内容，因此仅凭其自身，无法快速回答诸如“谁最后编辑了某一行”或“哪些 commit 影响了某个文件”之类的问题。为了回答这些问题，Scion 基于 changeset 构建了额外的数据结构，包括用于文件 blame 和路径历史的专用结构，以及用于 commit graph 的 skip list。我们将所有不直接属于 changeset 的内容称为 "derived data",并通过一个通用机制来计算它们。每种类型的 derived data 都是递归定义的，因此它针对某个 changeset 的值是根据该 changeset 的 parent 的值计算得出的。

这种机制有三个好处。第一，当新的数据结构能让某些操作更快时，我们可以轻松添加新类型的 derived data。第二，对于每种类型，我们可以选择立即计算还是延迟计算，从而避免生成我们不需要的数据。第三，由于客户端永远看不到这些数据结构的内部实现，我们可以在不改动客户端的情况下对其进行优化。随着系统的成长，我们已经多次添加新类型的 derived data,例如用于执行 copy detection 或基于路径的文件搜索的新索引。

#### Scion 的扩展

一小队 Scion 服务器为客户端所需的任何操作提供源码控制 API,例如获取 changeset、计算 diff、查找 merge base 以及获取 blob。所有源码控制数据都是内容寻址的，因此数据一旦存储就永远不会改变，任何服务器都可以缓存它，而无需与其他服务器确认。因此，这些服务器可以水平扩展，几乎不需要协调。它们本质上是大型缓存，同时还能即时计算 derived data 并将结果写回 Spanner。

Scion 的众多使用方不再需要维护自己的本地 repository。过去，获取和维护 repository 对 CI 任务或需要查询源码控制信息的工具来说是一项沉重的维护负担，尤其是关于 commit 祖先关系和 blame 的查询。在迁移早期，在我们拥有自己的客户端、repo 格式或协议之前，Scion 只回答这些“元数据”查询。获取文件内容和生成 working copy 是数据密集得多的操作，需要单独的设计。

Scion 的 scn 客户端在几个重要方面偏离了 git 的 fetch 协议，因此它适用于一种高度可扩展的架构，所需 CPU 远少于 git 服务器。Scion 的协商过程不会告诉服务器客户端已经拥有什么；相反，它只针对客户端想要的 tree 和 blob 进行操作。从 root tree 开始，客户端检查其本地存储中缺失的 tree 并递归地请求它们，然后对 blob 重复这一过程。每个请求都是针对一个永不改变的特定对象，因此任何缓存都可以响应它，这种架构非常接近传统的分层缓存。这个过程也很高效且可恢复，因为不存在单个数 GB 的 packfile 响应。Sparse checkout 甚至是虚拟化 checkout 都不需要特殊支持，因为客户端根本不会请求它不想要的 tree。

在整个集群中，客户端通过 socket 与一个守护进程 scion-daemon 通信，该守护进程为整个节点存储对象。我们的大多数节点都需要访问 monorepo,同一节点上的任务会复用大部分相同的对象。每个 daemon 从一个定期刷新的快照开始，之后只与其所在区域的 tree 和 blob 缓存服务器通信，这些服务器称为 scion-cache。这些缓存服务器直接从内存中以 daemon 将要消费的磁盘格式流式传输对象，因此它们无需花时间计算客户端缺失的对象，也无需执行 delta 压缩。当某个缓存缺少一个对象时，它会向权威的 scion-server 请求，后者按需从 Spanner 或云存储中读取。

scion-daemon、scion-cache 和 scion-server 都响应该协议下完全相同的 RPC,因此客户端无需了解缓存拓扑。理论上任何一层都可以与任何其他层通信，但我们严格执行分层，以隔离故障域。我们希望避免出现这样的情形：某个区域级 scion-cache 的故障压垮上游的 scion-server,进而拖垮整个系统。

![](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2Fcba1eaaa67385fd00f210badaacd147de480120b-3840x1718.png&w=3840&q=75)

Scion 的 checkout 架构。

该系统的每一层都保持着超过 99% 的缓存命中率，且不需要长期保存的状态，因此在需要时可以轻松扩容。在 CPU 和内存需求方面，我们的 Scion 基础设施占用规模现在比之前的 git 镜像基础设施小 200 倍。CI 和研究任务 checkout 代码的速度快了两个数量级(以秒计而非以分钟计)，这在整个集群中释放了相当可观的容量；仅 CI 一项就获得了 25% 的 CPU 容量收益。客户端和缓存都不再需要执行仓库维护，这简化了我们任务的生命周期管理。

### 我们在构建 Scion 时的收获

我们开始构建 Scion 的时间，大约与 [Claude Mythos Preview](https://www.anthropic.com/claude/mythos) 和 [Claude Tag](https://www.anthropic.com/news/introducing-claude-tag) 在内部可用的时间相同。这两个版本的发布既放大了对 Scion 的需求，又显著加快了我们构建它的速度。

这里有一个特别引人注目的例子。今年早些时候，我们主要以手写方式完成了 git-to-Scion 摄取流水线的第一版原型。我们原以为它还不错——直到我们拿到了 Claude Mythos Preview 的早期内部快照。我们让它重写了整个东西，在没有任何进一步指示的情况下，它产出了一个内存占用减少 20 倍、速度快 4 倍的版本，同时完整保留了围绕摄取顺序和数据结构的所有隐式不变量。

![](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2Fdd91296719203f38229824bb9bc9e9a61c76ed67-3840x2160.png&w=3840&q=75)

2026 年 1 月至 9 月期间，每周合并到 Scion 和 Antique 代码库的变更数量。

我们在构建和运营 Scion 过程中学到的东西，为构建 Agent 规模的软件可能是什么样子提供了一些有趣的启示。

**小团队的快速开发将变得更加普遍。**一个七人团队不仅构建了 Scion *和* Antique(我们的代码审查工具，关于它我们完全可以另写一整篇博客文章)，还构建了另外六套相关系统，并在五个月内完全迁移到了这些系统上。在完成这一切的同时，每天合并的代码量增长了 10 倍。在过去，开发和部署这样一套源代码控制系统，公司需要投入多得多的工程师、花费数年时间进行迭代迁移。我们认为，这种快速、敏捷的迁移在未来会变得更加常见。

**工程师的价值丝毫没有降低，但他们的工作正在改变。**参与构建该系统的所有工程师现在都会认为，Claude 在*编写*代码方面比他们更强。但我们的工程师仍然提供了对高层级系统间组件和设计层面权衡的宝贵理解，围绕我们想要解决的问题以及我们知道自己需要达到的规模，做出了明智的决策。很多时候，我们发现工程师的角色就是对 Claude 说“不”。Agent 有时会违反核心系统约束，以满足一种本就不该被允许的模式。这在我们的迁移过程中尤为常见。例如，有多个系统试图通过线性读取 commit log 来暴力查找某个变更何时合并到 main,而不是询问我们的代码审查工具。Anthropic 也大量使用对抗性审查，虽然这种方式在很多方面极其有效，但它也可能存在短视的问题，因此经验丰富的工程师需要引导 Claude,避免它出于假设性的顾虑而对系统的某些部分进行过度设计。例如，有一次这样的审查对信任另一个内部服务过于防御，导致 Claude 添加了过多的验证和复杂性。我们的团队成员仍然会审查该系统的每一次变更请求，但他们现在审视的是变更的*意图*，而不是逐行阅读代码。

**我们显著提升了优化效果与代码质量。** 得益于 Claude 能够以远超我们自身速度的能力编写海量代码，Scion 成为我们参与过的测试最充分、防御最严密的代码库之一。即使在紧迫的时间表下，我们也能够构建出针对所有非平凡的基础设施交互和源代码控制交互的封闭模拟环境，以及模糊测试（fuzzing）和复杂的速率限制机制。Claude 还轻松发现了一些重要的优化方案——例如，针对祖先查询的一项算法优化，该优化遗漏了我们现有的某个索引——这原本需要专家花费数天甚至数周的分析与调优……而 Claude 在第二天又重复完成了所有这些工作。

![](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2Fc706fa6efb4b9e5cd2566cb080acbfce7218042d-3840x4684.png&w=3840&q=75)

原生 Scion 仓库中观察到的性能提升。

**我们为新型单体仓库（monorepo）安全奠定了基础。** 在庞大的单体仓库中，管理安全性、合规性与代码规模同等重要。我们从一开始就将这些因素纳入 Scion 的设计考量中。它支持对仓库实施细粒度的访问控制，并允许对单个目录应用权限，从而在保留单体仓库优势的同时保护最敏感的代码。此外，我们构建的代码审查工具能够对审批流程表达复杂的语义约束，这使得我们能够区分诸如“仅包含注释的更改”与“敏感的逻辑更改”，从而使人工审查员能够专注于最具影响力的更改。

**运营卓越达到了新水平。** 我们的团队重度使用 Claude Tag，这帮助我们监控系统的每个组件。例如，我们创建了 Slack 频道，指派 Claude  obsessively（痴迷般地）关注单个组件的健康状况。我们将这些 Claude 实例称为“超级粉丝”（superfans）。我们拥有 scion-daemon 超级粉丝、scion-cache 超级粉丝、Antique 合并队列超级粉丝等。它们可以访问我们的遥测数据和日志，表现得像一位资深工程师，其唯一任务就是刷新图表并寻找任何异常。虽然我们对所有系统都设有传统警报，但我们的超级粉丝能够检测到细微且新颖的问题，相比之下，传统警报显得过于单一。

**我们正在彻底重新审视我们的先验假设。** 该项目促使我们仔细审视那些为人类规模设计的其他工作流。例如，在 Agent 规模下，传统的合并队列（merge queue）概念已不再适用。当数百甚至数千个更改在测试运行期间同时合并时，持续集成（CI）的意义何在？由于我们无法有效复现合并队列中全局仓库锁这一行业标准，因此我们转而投入资源进行合并后和部署前的自动化测试。这意味着并发更改可能会发生冲突，但 Claude 通常能够比人类更快地解决这些冲突。

### 为更广泛的生态系统做出贡献

我们将 Scion 视为应对日益强大的 AI Agent 所引发的扩展问题的答案之一。我们分享这些细节，旨在作为团队如何应对类似挑战的示例，但我们并不认为我们的解决方案或考量适用于所有情况。

Scion 绝非适用于一般用途的 git 的合适替代品。此处概述的概念仅适用于真正的超大规模单体仓库，即拥有数万工程师或大量 Agent  prolifically（大量地）编写代码的场景。此外，Anthropic 的独特之处在于，我们内部使用 token 的能力远超任何其他企业实际愿意投入的成本。我们这样做既是为了满足自身的软件开发需求，也是为了测试 Claude 的能力。

从实际角度来看，很难将 Scion 以对其他组织具有广泛实用性的形式提供。它与 git 存在显著差异，这意味着公司需要迁移开发生命周期的每一个环节，并且它需要自己的代码审查、代码搜索和 CI 系统。我们内部对这些组件的版本高度定制化，因此其他组织难以采用。我们担心，试图构建一个试图取悦所有人的公共版本，实际上并不会很有用。

然而，我们预计这类问题在未来六到十二个月内将变得更加普遍，如果每个使用 git 的公司都独自面对类似的挑战，那将是工程资源的低效利用。鉴于此，我们认为最有影响力的做法是分享我们的思考，以便其他开发者能够在不偏离整体模型的前提下，将 Scion 中一些最成功的部分应用到 git 中。git 服务器的工作方式不必与 git 客户端完全相同；存在新颖的服务器架构，能够提供显著的扩展性提升。Git 平台可以提供全面的服务器端 RPC（如 Scion 所做的那样），甚至可以通过一种标准化的方式，让 git 客户端能够与之通信。协商协议也不必完全像今天这样，git 中的各种稀疏（sparse）和浅层（shallow）功能也可以更好地组合使用。

最后，我们要承认，git 社区在过去近二十年中为数百万开发者扩展了该平台。我们的贡献范围要窄得多：分享我们对代理式软件开发（agentic software development）如何与这些系统交互的早期见解，以便我们能够与 GitHub、GitLab 以及开源社区合作，支持开发者不断变化的需求。随着软件开发生命周期与 AI 指数级增长相交，我们都在其中共同努力。

### 致谢

本文由 Nick G. 和源代码控制团队撰写：S.G.、R.K.、Dan C.、Garrett H.、Ben L.、Colin M.、Joe P.。我们要感谢 Vilas J. 和 Sergiu D. 对源代码控制团队在这项雄心勃勃的旅程中的支持，以及 Amir O. 对 Antique 的早期贡献。

### 脚注

1. 将更改的文件相对于合并的第一个父提交进行存储是一种风格选择；在实践中，我们发现人们只关心在 monorepo 中基于主干的开发模式下，主干上提交的提交历史或 blame 信息。[https://www.anthropic.com/engineering/redesigning-source-control#footnote-ref-1](https://www.anthropic.com/engineering/redesigning-source-control#footnote-ref-1)

### 获取开发者通讯

产品更新、操作指南、社区亮点等。每月发送至您的邮箱。
