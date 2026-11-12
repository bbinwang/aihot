---
title: "OpenAI 发布 GPT-6 Cyber安全模型：找出漏洞后，还能验证攻击、提出修复"
date: 2026-11-06T00:00:00.000Z
tags: ["产品发布", "OpenAI", "网络安全", "Agent", "聚合"]
summary: "从 Firefox 高危漏洞到 Linux 提权验证，看看自动化安全研究走到了哪一步，以及补丁为何仍需要人来把关。"
---
> **原文链接**: [https://the-decoder.com/openais-gpt-6-cyber-can-both-break-into-systems-and-propose-how-to-fix-them/](https://the-decoder.com/openais-gpt-6-cyber-can-both-break-into-systems-and-propose-how-to-fix-them/)
> **来源**: the-decoder.com
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/openai-gpt-6-cyber/) · 2026/11/6
> **说明**: 本文由 AIHot 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

## OpenAI 的 GPT-6 Cyber 既能入侵系统，也能提出修复方案

[https://the-decoder.com/author/matthias-bastian/](https://the-decoder.com/author/matthias-bastian/)

[Matthias Bastian](https://the-decoder.com/author/matthias-bastian/)
[查看 Matthias Bastian 的 LinkedIn 主页](https://www.linkedin.com/in/matthias-bastian-128b71b1/)

2026年11月5日

![Image description](https://the-decoder.com/wp-content/uploads/2026/11/openai_cybersecurity.png)

Nano Banana Pro,由 THE DECODER 提示词生成

### 要点

- OpenAI 发布了 GPT-6 Cyber,一款专门训练用于发现安全漏洞、开发可用 exploit 并提出补丁建议的 AI 模型。
- 在针对性测试中，GPT-6 Cyber 在 Firefox 中发现了 81 个此前未知的严重漏洞，Mozilla 已经发布了补丁。
- 在 Linux 内核中，该模型复现了 1,724 个漏洞，并为其中的 948 个开发了可用的 exploit,是其前代产品的五倍多。

**OpenAI 推出了 GPT-6 Cyber,一款专门训练用于搜寻软件安全漏洞的 AI 模型。**

OpenAI 表示，该模型能够发现缺陷、构建可用的 exploit,并提出补丁建议。它还应保持在被指定的边界之内，而近几个月一些 OpenAI 模型在这方面曾[遇到困难](https://the-decoder.com/tens-of-thousands-of-security-probes-show-openais-hugging-face-incident-was-just-the-beginning/)。

该公司表示，它训练 GPT-6 Cyber 遵守其运行 guardrails(护栏)，其中包括一个受 [Hugging Face 事件](https://the-decoder.com/openais-rogue-ai-collective-was-smart-enough-to-break-out-of-sandboxes-but-dumb-enough-to-fight-a-ghost/)启发的 honeypot(蜜罐)。在没有任何特殊安全指令的情况下，GPT-6 Cyber 在 99.93% 的情况下避免了越界行为，高于其前代的 94.49%。在启用安全指令的情况下，该模型在 100% 的测试中都保持在边界之内。总体而言，OpenAI 在其自有的 [Preparedness Framework](https://the-decoder.com/openai-updates-risk-framework-to-assess-advanced-ai-capabilities/) 的网络安全类别中将 GPT-6 Cyber 评为"Critical"(危急)，与 [GPT-6 Astra 这款"base"模型](https://the-decoder.com/openai-flags-its-new-astra-model-as-potentially-reaching-the-highest-cybersecurity-risk-level-for-the-first-time/)获得的评级相同。

广告

在 ExploitGym(一项测试模型能否在远程系统中利用给定漏洞的 benchmark)上，据 OpenAI 称，GPT-6 Cyber 得分为 48.5%,而其前代 GPT-5.6 Cyber 为 32.1%。在一项新的测试中——即在无法访问源代码的情况下发现 web 应用中的漏洞——OpenAI 报告命中率为 40.3%,而未经网络安全训练的标准模型 GPT-6 Astra 为 32.0%。

广告

![](https://the-decoder.com/wp-content/uploads/2026/11/gpt6_astra_cyber.png)

ExploitGym 结果：GPT-6 Cyber 以 48.5% 领先，其次是得分 42.4% 的 GPT-6 Astra(Daybreak Blue)。启用安全防护措施(safeguards)的 GPT-6 Astra 得分为 0.0%。| 图片：OpenAI

完整结果可在 [system card](https://deploymentsafety.openai.com/gpt-6-cyber) 中查看。所有 benchmark 数据均来自 OpenAI 自身。目前尚未有对该模型的独立测试发布。

### GPT-6 Cyber 已经在 Firefox 和 Linux 内核中发现了真实漏洞

据 OpenAI 称，GPT-6 Cyber 已经在现实世界的安全研究中产出了成果。在一项针对性活动中，该模型发现了 [Firefox 中 81 个此前未知的严重漏洞](https://www.mozilla.org/en-US/security/advisories/mfsa2026-118/),尽管该浏览器此前已经用早期 AI 模型测试过。该模型还证明，30 个已知问题比之前认为的更为严重。Mozilla 接受了这些报告，并已经发布了修复。

广告

据 OpenAI 称，在 Linux 内核测试中，GPT-6 Cyber 复现了 1,724 个安全漏洞，并为其中 948 个开发出了可用的 exploit,是 GPT-5.6 Sol 在相同条件下完成的 166 个的五倍多。该公司表示，304 个严重发现已连同修复建议一并报告给 Linux 维护者。

在 [Linux 内核攻击行动](https://openai.com/index/a-thousand-fewer-paths-to-root/)中，OpenAI 构建了一套由 scout 和 analyst Agent 组成的专用自动化系统。这些 Agent 首先扫描了内核中约 5,034 个与安全相关的位置，约占整个代码库的百分之七，然后将其筛选为 2,308 个候选对象，并在隔离的虚拟机中确认了 1,724 个漏洞。在此基础上，该系统开发出了 OpenAI 此前已报告的 948 个可用 exploit。据 OpenAI 称，整个运行过程耗费了 1,213,430 美元的算力成本，折合每个 exploit 约 1,279 美元。作为对比，Pwn2Own 和 TyphoonPWN 等项目历来对同类发现支付的赏金在 20,000 至 70,000 美元之间。

广告

OpenAI 表示，这些 Agent 使用了至少十种新型攻击技术，这些技术此前甚至不为外部内核安全专家所知。按照 OpenAI 的说法，这些模型既复现了已知的攻击模式，也找到了自己的方法。这一说法有多大分量，取决于你对“自己的方法”定义得有多窄。对于 [AI 模型究竟是真能做出新发现，还是只是在重新组合训练中见过的内容](https://the-decoder.com/top-mathematicians-say-llms-are-strong-calculators-but-poor-creative-thinkers/),研究人员之间仍存在分歧。

广告

### OpenAI 暂时仅向部分客户开放访问权限

据 OpenAI 称，GPT-6 Cyber 初期将通过 API 和 Codex 向一部分 Daybreak Red 客户开放，之后会逐步扩展至所有 Daybreak Red 客户。GPT-5.6 Cyber 将同时向所有 Daybreak Red 用户开放，而 GPT-6 Astra 的 Daybreak Blue alpha 访问权限也将扩大到更多组织和个人安全研究人员。

OpenAI 承认，随着模型能力不断增强，滥用企图也在增加。一些行为者和团体曾试图将模型能力转移到自己的系统中。

OpenAI 列出了多项应对措施：验证模型操作是否与用户权限相符的检查、针对新披露漏洞的定向监控、通过所谓 Private Safety Processing 进行的自动化安全检查、基于 IP 的 Daybreak Red 访问限制，以及在人工监督下于隔离环境中运行模型的建议。

OpenAI 尤其关注对发电厂和水处理设施等关键基础设施的保护。为了让防御者更容易获得访问权限，该公司指出了其十亿美元的 ["Daybreak for Frontline Defenders"](https://openai.com/index/daybreak-for-frontline-defenders/) 资助计划，以及一个名为 "Daybreak Red for Critical Infrastructure" 的新子项目，用于授权测试。

OpenAI 谈到了一个有限的机遇窗口：顶级模型可以被用来保障软件安全。目标是将 Daybreak 计划扩展到各种规模的组织、独立研究人员和开源维护者。这是否真的可行则是另一个问题。Epoch AI 的研究人员刚刚展示了开源 [GLM 模型能够利用已知但尚未修复的 Firefox 漏洞](https://the-decoder.com/open-weight-model-glm-5-3-built-full-firefox-exploit-chains-with-zero-human-input-in-under-48-hours/)。

#### AI 新闻，拒绝炒作 – 人工精选

订阅 THE DECODER,即可享受无广告阅读、每周 AI 新闻通讯、每年六期的独家 "AI Radar" 前沿报告、完整存档访问权限以及评论区访问权限。

[立即订阅](https://the-decoder.com/subscription/)

来源:[OpenAI 1](https://openai.com/index/introducing-gpt-6-cyber/) | [OpenAI 2](https://openai.com/index/a-thousand-fewer-paths-to-root/)
