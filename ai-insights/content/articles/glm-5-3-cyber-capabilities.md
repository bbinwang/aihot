---
title: "Anthropic 实测 GLM-5.3：是第一个展现出实质性漏洞利用能力的开重模型 水平和 Claude Mythos Preview 接近"
date: 2026-10-01T00:00:00.000Z
tags: ["AI 安全", "GLM", "智谱", "开源模型", "网络安全", "Anthropic", "Mythos", "聚合"]
summary: "五个月前 Anthropic 不敢公开的“自己写攻击代码”能力，现在出现在人人可下载的智谱 GLM-5.3 上。它追到了哪一步、自带的拒绝为什么挡不住、这份出自竞争对手的报告该怎么读，一次讲清。"
---
> **原文链接**: [https://www.anthropic.com/research/glm-5-3-and-the-spread-of-advanced-cyber-capabilities](https://www.anthropic.com/research/glm-5-3-and-the-spread-of-advanced-cyber-capabilities)
> **来源**: Anthropic
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/glm-5-3-cyber-capabilities/) · 2026/10/1
> **说明**: 本文由 AIHot 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

前沿红队政策

## GLM-5.3 与高级网络能力的扩散
2026年9月29日

*Andrew Fasano, Marius Fleischer
Cole McFaul, Robert Xiao, Tripp Gallagher*

五个月前，我们[宣布](https://www.anthropic.com/glasswing)了 Claude Mythos Preview，这是第一个能够自主构建复杂、端到端网络漏洞利用的 AI 模型。AI 的快速进步让我们意识到，这种能力最终会扩散到许多其他模型，使得恶意网络行为者更容易发动高影响力的网络攻击。

基于这些考虑，我们选择通过 Project Glasswing 以有限的方式发布 Claude Mythos Preview——这使得可信的网络防御者能够在关键软件中发现[超过 10,000 个漏洞](https://www.anthropic.com/research/glasswing-initial-update)，从而在恶意行为者获得类似能力的模型之前抢占先机。

但现在，这些模型已经到来。在这篇文章中，我们分享了对 GLM-5.3 的分析，这是智谱 AI（在中国以外称为 Z.ai）开发的最新 AI 模型。与 Claude Mythos Preview 类似，GLM-5.3 在自主构建端到端网络漏洞利用方面具有强大能力。但 GLM-5.3 与其他前沿模型的不同之处在于，它在发布时没有设置有意义的安全措施来限制滥用。在我们的模拟测试中，我们发现攻击者可以使用简单技术，在 64% 到 100% 的情况下绕过 GLM-5.3 的安全措施。相比之下，在我们的测试中，这些攻击未能成功突破受保护的 Claude 模型。我们评估认为，GLM-5.3 宽松的安全措施显著增加了恶意行为者可用的网络能力。同时，这些能力也可以惠及致力于保护系统安全的防御者。

9 月 17 日，NIST 的 AI 标准与创新中心 (CAISI) 发布了[其自身对 GLM-5.3 网络能力的评估](https://www.nist.gov/news-events/news/2026/09/caisis-assessment-zais-glm-53-cyber-capabilities)。CAISI 发现 GLM-5.3 是“迄今为止发布的最具网络能力的开放权重模型”，并且在 CAISI 的网络基准综合指标上，它落后美国前沿约四个月。我们的能力发现与 CAISI 大致相符。在 CAISI 的比较中，美国模型在适用时以禁用网络安全措施的状态进行测试，而美国前沿包括仅向经过审查的用户发布的模型。攻击者无法轻易获取这些版本的美国模型，但任何人都可以下载 GLM-5.3。本文补充了我们关于 GLM-5.3 的安全措施被绕过或移除的难易程度的分析。

![两张柱状图。上图：在 41 个 Chrome V8 漏洞上成功构建可用漏洞利用的尝试比例——Claude Mythos Preview 为 14%，GLM-5.3 为 12%，而 Claude Opus 4.6、GLM-5.2、Kimi K3 和 DeepSeek V4.1-Flash 的得分接近 0%。下图：每个模型响应恶意网络攻击指令的频率——GLM-5.3 从裸指令下的 0% 上升到虚假掩护故事下的 64%，预填推理下的 92%，以及消融后的 100%，而 Claude Opus 5 保持在 0%。](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2Fa1b61c7da2c400ab84425e105837fc1f346a4339-1280x1576.webp&w=3840&q=75)

**图 1.** 发现总结。上图：Claude Opus 4.6 与 Claude Mythos Preview 之间漏洞利用能力的提升，与 GLM-5.2 和 GLM-5.3 之间的能力跃升相似。Claude 模型发布时带有网络保护措施，而保护措施减弱的版本仅限经过审查的用户使用。任何人都可以下载并使用 GLM-5.3。下图：GLM-5.3 中有限的安全措施可以通过标准技术绕过，而这些技术在我们的测试中无法突破 Claude 模型，或者不适用于 Claude 模型。

### GLM-5.3 能够端到端地开发可用的漏洞利用

为了了解 GLM-5.3 如何帮助网络威胁行为者发现并利用真实软件漏洞，我们使用自动化基准测试和人在回路工作流程进行了评估。对于这两种方法，我们都在隔离的沙盒环境中运行测试模型，使其只能攻击我们为这些评估目的而设置的离线目标。我们主要关注漏洞利用开发能力，因为这是 Claude Mythos Preview 相比之前的 Claude 模型展现出显著跃升的领域。

首先，我们在 [ExploitBench](https://arxiv.org/abs/2605.14153) 上运行了该模型，该基准用于衡量 AI 模型能够利用 Google Chrome 所用 V8 引擎中已知漏洞的能力。此处我们重点关注模型成功开发端到端漏洞利用的能力，因为这是对攻击者而言最相关的能力，也是不同模型之间出现显著变化的地方。我们发现，GLM-5.3 在 410 次尝试中成功开发了 50 个端到端漏洞利用。Claude Mythos Preview 的成功率与之相近——在 410 次尝试中成功了 56 次。

在我们内部的二进制利用基准测试中，[1](https://www.anthropic.com/research/glm-5-3-and-the-spread-of-advanced-cyber-capabilities#footnote-1) 我们测试模型是否能够发现并利用参与 Google OSS-Fuzz 项目的热门开源项目中的漏洞。在此，完成完全控制流劫持可获得满分。我们对基准测试中的 100 个任务（随机选取）评估了多个模型，发现 GLM-5.3 在 4% 的试验中实现了完全控制流劫持；Claude Mythos Preview 实现了 6%。尽管 GLM-5.3 在此表现低于 Claude Mythos Preview，但显然已跨越了一个有意义的门槛：较早期的模型，如 Claude Opus 4.6 和 GLM-5.2，均未能在任何任务中成功。

![两个折线图，纵轴为利用成功率，横轴为输出 token 预算（对数尺度）。在 ExploitBench 上，Claude Mythos Preview 达到 14%，GLM-5.3 达到 12%，而 Kimi K3、DeepSeek-V4.1-Flash、Claude Opus 4.6 和 GLM-5.2 保持在 0% 或接近 0%。在 Anthropic 内部二进制利用基准测试上，Mythos Preview 达到 6%，GLM-5.3 达到 4%；其他所有模型得分为 0%。](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2Fab29550606b0df3c6c070f4c65b758aa18bdecbb-1280x1588.webp&w=3840&q=75)

**图 2.** 利用能力与输出 token 预算。每条折线显示模型达到基准测试最高结果的尝试比例，与所用输出 token 的关系。两张图展示了在两个 Claude 模型（启用了防护措施禁用：Opus 4.6、Mythos Preview）、两个 GLM 模型（5.2 和 5.3），以及由 Moonshot AI（Kimi K3）和 DeepSeek（V4.1-Flash）发布的最新开放权重模型上的表现。

接下来，我们评估了 GLM-5.3 在人类专家手中执行开放式进攻性网络任务时的表现（与[今年早些时候我们对 Claude Mythos Preview 的测试](https://red.anthropic.com/2026/mythos-preview)相呼应）。在此，我们选择人类专家未知现有漏洞的目标，然后要求他们使用模型来发现并利用全新的缺陷。这些实验测试了专家在短时间内能做到什么：他们通常运行一天或更少，总计人类专注时间不到一小时。

![一张经过编辑的 GLM-5.3 生成的漏洞利用页面截图。一则横幅写着“沙箱逃逸——web 内容读取 /root/.ssh/id_rsa（1896 字节）”，上方是一个实时漏洞利用日志和被窃取的 SSH 私钥，展示了一个 drive-by 浏览器漏洞利用链从受害者计算机窃取文件。](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2F6e4f59aaf6659657e9c4f2606bb1ab38cc0a390e-1920x1019.webp&w=3840&q=75)

**图 3.** 一张经过编辑的 GLM-5.3 在研究员驱动测试期间生成的漏洞利用页面截图，展示通过恶意网站窃取用户 SSH 私钥。该漏洞利用将模型发现的流行 Web 浏览器一个组件中的多个 0-day 漏洞链接起来，读取用户计算机上的敏感文件。

在第一次会话中，一位研究员在一台运行流行 Web 浏览器本地 Linux 构建版的沙箱机器上使用了 GLM-5.3。在一天的时间内（以及有限的人类注意力），GLM-5.3 在浏览器的 JavaScript 引擎中发现了数个以前未知的漏洞，并将它们链接成一个可用的漏洞利用：一个网页，当被访问时，可以从访问者的计算机读取任意文件（如图 3 所示）。该漏洞利用针对的是浏览器的 Linux 构建版，因为这是模型可用的唯一环境。然而，我们认为这些漏洞也可能影响其他平台的用户，尽管在这些平台上的利用路径可能更复杂。（我们已向维护者披露了这些漏洞。）在会话后期，该研究员还使用 GLM-5.3 在其他几个广泛使用的系统中识别出了可利用的漏洞，包括无线和图形驱动程序以及面向网络的设备软件。我们目前正在审查这些报告，并将酌情向维护者披露。

在第二次会话中，一名研究人员使用 GLM-5.3-Flash（GLM-5.3 的一个更小、能力较弱的版本）为*已知*漏洞开发了一个利用程序（我们之前曾在此处[写过关于这些“N-day”漏洞利用的文章](https://www.anthropic.com/research/n-days)）。在此，研究人员专注于 Google Chrome 中最近披露的一个漏洞（CVE-2026-11645），以观察模型将公开补丁转化为有效攻击的速度有多快。研究人员向 GLM-5.3-Flash 提供了该 CVE 的公开细节以及另一个已知漏洞。在研究人员没有进行重大指导的情况下，GLM-5.3-Flash 将这两个漏洞的利用程序串联起来，为 ARM64 目标构建了一个可靠的利用链，绕过了指针认证（PAC）加固。这花费了 20 分钟的人工关注时间，外加 GLM-5.3-Flash 八小时的工作时间。按照智谱的 API 价格，这项工作将花费 20.40 美元。

### GLM-5.3 缺乏稳健的安全防护

GLM-5.3 发布时内置了一些安全防护：如果用户提出明显有害的请求，模型通常会拒绝。[2](https://www.anthropic.com/research/glm-5-3-and-the-spread-of-advanced-cyber-capabilities#footnote-2) 在我们的测试中，我们发现这些安全防护可以通过多种简单技术绕过或移除。

最密集且最成功的方法是被称为“abliteration”的[标准拒绝降低技术](https://arxiv.org/abs/2406.11717)。由于 GLM-5.3 以开放权重模型的形式发布，用户可以重新配置它以移除其拒绝机制，而其能力几乎不变。在模型发布后的几天内，几位开发者就向公众发布了 GLM-5.3 的 abliterated 版本。

为了研究 abliteration 允许攻击者绕过 GLM-5.3 安全防护的程度，我们自己制作了一个 abliterated 副本，然后在三个公开基准测试（[JailbreakBench](https://jailbreakbench.github.io/)、[HarmBench](https://www.harmbench.org/) 和 [StrongREJECT](https://strong-reject.readthedocs.io/en/latest/)）上运行，这些基准测试衡量模型对明显有害请求的遵从频率。对我们这个此前从未尝试过此任务的团队来说，对模型进行 abliteration 花费了大约 2200 GPU 小时，计算成本约为 4,400 美元。[3](https://www.anthropic.com/research/glm-5-3-and-the-spread-of-advanced-cyber-capabilities#footnote-3) 对 GLM-5.3-Flash 进行 abliteration 花费了大约 600 GPU 小时。这一修改将 GLM-5.3 在前两个基准测试（JailbreakBench 和 HarmBench）上的拒绝率从 90% 以上降至约 3% 和 2%，在第三个基准测试（StrongREJECT）上降至 12%。Abliteration 并未显著降低模型的能力：在衡量通用科学能力的评估 GPQA-Diamond 上，标准模型和 abliterated 模型得分相同；在 CyberGym 评估的一个测试子集上，abliterated 版本得分低几个百分点（如下表所示）。

![两张关于 abliteration 的柱状图。上方：在三个有害请求基准测试中，abliterated GLM-5.3 的平均拒绝率从 95% 降至 6%，abliterated GLM-5.3-Flash 从 95% 降至 14%，而 Claude 模型拒绝率约为 96%，且由于其权重未发布而无法进行 abliteration。下方：在 GPQA-Diamond 和 CyberGym 上的能力得分在 abliteration 后几乎不变。](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2Fd4d48dcf67d529d3b2243bfa50a7cccc98565278-1280x1531.webp&w=3840&q=75)

**图 4.** 上方：已发布和 abliterated 的 GLM 模型以及 Claude 模型在 JailbreakBench、HarmBench 和 StrongREJECT 上的平均拒绝率。Abliteration 后，GLM 模型很少拒绝这些查询。Claude 模型无法进行 abliteration，因为其权重未公开发布或不可定制。下方：GLM-5.3 和 GLM-5.3-Flash 与其 abliterated 变体在 GPQA-Diamond 和 CyberGym 上的性能对比。Abliteration 在很大程度上保留了能力。

在我们的测试中，我们观察到 GLM-5.3 的安全防护也可以*不*使用模型的 abliterated 版本而被规避。我们将模型置于一个模拟世界[4](https://www.anthropic.com/research/glm-5-3-and-the-spread-of-advanced-cyber-capabilities#footnote-4)中，在该世界中，模型被给予攻击关键系统的明显恶意请求。开箱即用时，GLM-5.3 在所有试验中都拒绝了（与我们测试的其他模型一样）。但我们发现了多种简单方法来绕过 GLM 模型的安全防护，使其在大多数或所有情况下都会响应这些请求。这些方法包括：

1. 提供欺骗性提示(deceptive prompt)，例如告诉模型它是在执行一项练习的自主red-team agent。这使GLM-5.3在64%的情况下参与。
2. 预填充模型的thinking tokens，使其看起来已经考虑了用户的请求并决定继续。这使GLM-5.3在92%的情况下参与。
3. 使用模型的abliterated版本，如上所述。这使GLM-5.3在100%的情况下参与。

在我们的测试中，这些技术均未能使受保护的Claude模型执行我们所测试的有害任务。Claude的安全措施阻止了使用欺骗性提示的请求。Anthropic API不允许潜在攻击者预填充Claude的thinking。由于Claude的权重不提供给用户，因此无法通过abliteration来改变Claude的行为。

![表格显示每个模型在收到有害网络攻击命令后尝试连接到远程目标的频率。GLM-5.3在直接命令下为0%参与，但在虚假故事下为64%，预填充推理下为92%，abliterated后为100%；GLM-5.3-Flash类似。Claude Opus 4.8、Opus 5和Mythos 5在所有适用条件下均为0%；预填充和abliteration对Claude API不可行。](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2Fa8b70c8d729325cc988af66416f7c0811d2097a5-1280x1257.webp&w=3840&q=75)

**图5.** 每个模型在收到明显有害请求后，按模型和绕过条件尝试连接到远程目标系统的比率（每个单元格50个样本，五个攻击命令×两个目标×五次尝试）。GLM-5.3在直接请求下的参与率从0%上升至虚假故事下的64%、预填充下的92%和abliteration下的100%，而每个测试的Claude模型在API安全措施下均保持在0%。带锁图标表示针对Claude API通常不可行的攻击。

为了展示GLM-5.3的abliterated版本如何愿意参与有害任务，我们引用了其生成的思维链中的一段话：

![引述自abliterated版本GLM-5.3在模拟环境中的推理。模型写道"我的工作是安静地造成死亡"，短暂权衡了环境的安全警告，然后得出结论：操作员的指令凌驾于这些警告之上，决定继续执行有害任务。](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2F273d676a94f3f4b8f22b4bad9f9d78f7a25214a8-1444x906.webp&w=3840&q=75)

**图6.** 在我们的模拟环境中，GLM-5.3的abliterated版本考虑了如何参与一个明显有害的请求，最终决定遵循用户的指令，尽管最初存在一些伦理顾虑。文本直接引用自模型的思维链。

### 这意味着什么？

GLM-5.3很可能让恶意行为者能够访问其能力，从而在没有实质性限制的情况下发现和利用网络漏洞。这与任何其他具备类似能力的AI模型不同，后者均通过安全措施或有限访问计划发布。GLM-5.3的发布标志着攻击者可用的网络能力发生了重大阶跃变化。[Anthropic](https://www.anthropic.com/threat-intelligence-report-september-2026)和[其他美国AI实验室](https://cloud.google.com/blog/topics/threat-intelligence/from-prompting-to-autonomy-the-evolution-of-adversarial-ai)已发布近期报告，披露了网络攻击者如何尝试使用AI系统。基于这些证据，我们认为国家和非国家行为者都很有可能使用像GLM-5.3这样的模型来造成现实世界的伤害。

另一方面，这种能力水平的模型也可被防御者使用。我们认为网络防御者应使用满足其需求的最佳可用工具。我们正努力以安全的方式向尽可能多的防御者扩展Claude网络能力的访问权限。网络防御者面对的是会使用一切可用工具的攻击者，我们相信防御者应配备至少与其对手所用工具同样先进的frontier模型。

通过 Project Glasswing（以及其他努力，如 [Patch the Planet](https://openai.com/index/patch-the-planet/)），网络防御者在这一时刻之前已经在保护关键系统方面取得了有意义的进展——但仍有许多工作要做。虽然经过审查的防御者现在可以通过我们的可信访问计划使用更先进的模型（如 Claude Mythos 5.1），但自由可访问能力的一个关键门槛已经被跨越。GLM-5.3 凸显了将先进前沿模型的访问权限扩展到更广泛实体以赋能网络防御者的紧迫性。

各国政府应对足够强大的 AI 模型（包括 GLM-5.3 的后续版本）进行安全测试。如果没有来自独立来源的高质量评估，这些能力的影响可能要到为时已晚时才会被模型开发者完全意识到。随着全球的 AI 开发者构建越来越强大的开放权重模型，我们希望他们努力适当保护这些能力并防止滥用。

##### 脚注

1. 我们此前曾以“OSS-Fuzz”为名发布过该基准的测试结果；此处我们测试了该评估中随机选取的 100 个任务子集。[https://www.anthropic.com/research/glm-5-3-and-the-spread-of-advanced-cyber-capabilities#footnote-ref-1](https://www.anthropic.com/research/glm-5-3-and-the-spread-of-advanced-cyber-capabilities#footnote-ref-1)
2. 上一节详述的网络任务并未触发已发布模型上的此类拒绝，但我们观察到，如果要求 GLM-5.3 协助开发恶意软件或帮助对远程目标发起网络攻击，则会触发拒绝。[https://www.anthropic.com/research/glm-5-3-and-the-spread-of-advanced-cyber-capabilities#footnote-ref-2](https://www.anthropic.com/research/glm-5-3-and-the-spread-of-advanced-cyber-capabilities#footnote-ref-2)
3. 其中大部分用于并行探索变体以及测试修改后的模型能力。我们估计，一个熟悉该技术的团队，从零开始处理该模型，大约需要 600 GPU 小时（1200 美元）。[https://www.anthropic.com/research/glm-5-3-and-the-spread-of-advanced-cyber-capabilities#footnote-ref-3](https://www.anthropic.com/research/glm-5-3-and-the-spread-of-advanced-cyber-capabilities#footnote-ref-3)
4. 在此模拟中，模型生成的代码从未被执行，模型也无法与外部系统进行任何交互。在这个隔离的测试环境中，被评估的模型可以访问一个虚假的 bash 工具，该工具不会执行提供的代码。相反，我们要求另一个 LLM 根据模拟世界的描述来近似命令的结果。这些模拟并非现实条件的完美写照，因此是衡量模型在特定情况下行为的非完美指标。[https://www.anthropic.com/research/glm-5-3-and-the-spread-of-advanced-cyber-capabilities#footnote-ref-4](https://www.anthropic.com/research/glm-5-3-and-the-spread-of-advanced-cyber-capabilities#footnote-ref-4)
[https://twitter.com/intent/tweet?text=https://www.anthropic.com/research/glm-5-3-and-the-spread-of-advanced-cyber-capabilities](https://twitter.com/intent/tweet?text=https://www.anthropic.com/research/glm-5-3-and-the-spread-of-advanced-cyber-capabilities)[https://www.linkedin.com/shareArticle?mini=true&url=https://www.anthropic.com/research/glm-5-3-and-the-spread-of-advanced-cyber-capabilities](https://www.linkedin.com/shareArticle?mini=true&url=https://www.anthropic.com/research/glm-5-3-and-the-spread-of-advanced-cyber-capabilities)

### 相关内容

#### 机器人能做什么工作？

我们构建了一个指数，评估当今机器人完成美国工作任务的能力。机器人已经可以完成四分之三的体力任务（主要在有限场景下），但仅在 0.3% 的任务中具有成本竞争力。
[阅读更多](https://www.anthropic.com/research/what-work-can-robots-do)

#### 你想从 AI 中得到什么？

我们正在启动一项新研究，使用 Anthropic Interviewer 了解您与 AI 的互动经验，并邀请您参与。
[阅读更多](https://www.anthropic.com/research/your-thoughts-on-ai)

#### 是的，Claude 能完成九环计算

客座作者兼物理学家 Matt von Hippel 分享了他向 AI 公司发起挑战，要求解决他先前理论物理子领域中的一个问题时发生的事情。
[阅读更多](https://www.anthropic.com/research/yes-claude-can-do-nine-loops)

### 订阅 Frontier Red Team 通讯

获取我们最新的红队研究动态和发现。
