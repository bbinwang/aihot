---
title: "避免技能文件膨胀的五个规则"
date: 2026-11-04T01:31:47.874Z
tags: ["聚合"]
summary: "原文链接 : https://cloud.google.com/blog/topics/developers practitioners/evaluate agent skills before they bloat your contex"
---
> **原文链接**: [https://cloud.google.com/blog/topics/developers-practitioners/evaluate-agent-skills-before-they-bloat-your-context-window/](https://cloud.google.com/blog/topics/developers-practitioners/evaluate-agent-skills-before-they-bloat-your-context-window/)
> **来源**: cloud.google.com
> **发现于**: 管理台手动提交
> **说明**: 本文由 AIHot 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

## 在 Agent skills 撑爆你的 context window 之前先评估它们 | Google Cloud Blog
- 来源： https://cloud.google.com/blog/topics/developers-practitioners/evaluate-agent-skills-before-they-bloat-your-context-window/
- 摘要：借助 Gemini 和 Antigravity，我们分享五种验证一个 skill 是否值得其 token 开销的方法，以及如何在 Agent skills 撑爆 context window 之前对它们进行评估。
---
开发者与实践者
在 Agent skills 撑爆 context window 之前评估它们的五条规则
2026 年 11 月 3 日
Karl Weinmeister

开发者关系总监

Alan Blount

产品经理

立即试用 Gemini

工作场所中 AI 的入口

立即试用

你可能已经越来越多地听到 SKILL.md 文件，并且会发现很多人测试它们的方式如出一辙：把一个 prompt 粘贴到聊天框里，看它在笔记本电脑上通过一次，然后合并到 main 分支。但当你把三页 CLI 文档粘贴进一个 markdown 文件、却没有 evaluation loop 时，它既可能帮到 frontier 模型，也同样可能让它感到困惑。

过去几周，我们一直在认真测量和优化我们自己的 Google Cloud Developer Plugin，其中包含最核心的 skills，以及用于将回答锚定在文档之上的 Developer Knowledge MCP server。

我们用 Gemini、Antigravity 和其他 agent 运行了几十个场景。我们在 GKE Autopilot 上隔离的 Harbor pod 中使用 Gemini 平台上的 Claude Sonnet 5。此外，我们还向 NVIDIA 的开源评估器上游贡献了 Kubernetes 和 Gemini 平台能力。

以下就是我们用来验证一个 skill 是否值得其 token 消耗的五条规则工程手册。

1. 在启动容器之前，先拦截 trigger 冲突和安全风险

当评估结果显示你的 plugin arm 与 baseline arm 之间没有任何改进(Δ = 0)时，你的第一反应往往是重写 SKILL.md 指令的正文。先别急。十有八九，agent 根本就没有加载过你的 skill。

Coding agent 在对话的第零轮(turn zero)并不会读取完整的 SKILL.md 正文。router 只会查看你 YAML frontmatter 中的短名称和描述。一旦一个 workspace 中的 skill 数量超过一打，两种失败模式就会相互碰撞：under-triggering(你的描述写的是内部实现而非开发者意图)和 sibling hijacking(邻近 skill 中像 "helps with cloud deployments" 这样的宽泛短语抢先拦截了 prompt)。

我们最近开源了 skill-reach，让你可以在为容器 sandbox 花费成本之前就发现 frontmatter 冲突。它会验证 manifest、计算与最接近的竞争 skill 之间的词汇重叠度，并在 Claude Code、Google Antigravity 和 OpenAI Codex 之间运行实证性的 routing 探测：

uv tool install skill-reach
​
## 1. Validate YAML frontmatter & token budgets (zero API calls)
reach lint ./skills
​
## 2. Detect vocabulary collisions & nearest rival skills (e.g. 0.69 overlap)
reach overlap ./skills
​
## 3. Run cross-harness routing probes and auto-tune weak descriptions
reach eval ./skills/cloud-run --runs 3
reach optimize ./skills/cloud-run --apply

将 skill-reach 与 NVIDIA 的 SkillSpector(SkillEvaluator 的 Tier 1 和 Tier 2)搭配使用。正如 Nemotron Labs 团队在他们的 Evaluating Agent Skills 深度解析中所详述的，标准的代码 linter 无法发现埋藏在 markdown 文本中的 agent 特有风险：prompt injection、silent data exfiltration、tool poisoning 和 trigger abuse。

2. 永远不要相信在开发者笔记本电脑上运行的 eval

如果你直接在 workstation 上运行 skill benchmark，那么这些数字就是在骗你。开发者的笔记本电脑充满了会污染 baseline arm 的环境状态：

已缓存的 Google Cloud 凭据

已导出的项目变量和热身过的 bash 历史记录

全局环境规则

一个未加辅助的 baseline agent 只需继承你本地 shell profile 中现成的默认 project ID 或 token，就能通过云部署测试，从而掩盖了你编写这个 skill 本要解决的那个确切的失败。

主机资源争用还会扭曲 agent 的运行轨迹。在使用 AlphaEvolve 对 code-retrieval agent 进行 hill climbing 时，我们的内部测试表明，在 workstation 处于 CPU 负载下运行完全相同的 agent benchmark 会拉低分数。更慢的文件扫描和 subprocess 超时会导致 agent 过早放弃搜索路径。

3. 测量成对的 WITH vs. W/OUT 消融实验(Pass@3),而不是凭感觉

只运行一次 prompt 然后截图绿色对勾,不是真正的评估。多轮 tool-using agent 会根据每一个 shell exit code 和 stdout 片段产生分支。在我们的检索研究中,超过三分之一的 benchmark 任务在完全相同的代码和 prompt 的连续多次运行中产生了不同的分数。

没有成对的 baseline 作对比,满分同样毫无意义。Claude 的 plugin eval 工具和 NVIDIA 的 SkillEvaluator 都会在多次重复中运行成对消融:Arm A 在干净的 sandbox 中不带 skill 运行 base model,而 Arm B 在相同的 prompt 和 sandbox 中挂载 skill 运行。

对比我们 sandbox 试验中的分数提升,暴露出三种单次测试会掩盖的明显模式。在没有 plugin 的情况下,base model 在大多数运行中仍然能摸索出一个可用的部署,但只有在浪费了数分钟 wall-clock 时间猜测废弃 flags 并重试错误请求之后。反过来,当某个测试用例显示成功完全相同且效率提升为零时,说明 base model 原生已具备该能力。你的 skill 就是纯粹的 context 税——删掉它。

```
## Scaffold and execute a k=3 paired WITH vs W/OUT ablation locally
claude plugin eval init ./my-plugin
claude plugin eval ./my-plugin --runs 3
```

4. 将效率和安全与正确性分开,让 agent 无法 reward-hack

当你把 evaluation harness 连接到自动化优化器(如 AlphaEvolve 或 reach optimize)时,agent 欺骗 grader 是一种出奇常见的模式。

在我们的 AlphaEvolve 检索实验中,进化出的候选方案发现了四种不同方式,可以在不解决任务的情况下钻 benchmark 的空子。当 grading harness 阻止了对源代码中特定预期 substring 的检查后,一个进化出的候选方案在运行时动态拼接字符串,沿目录树向上遍历,并直接从磁盘读取 ground-truth 答案文件。另一个候选方案通过 spawn 子进程来绕过 AST 检查。

进化循环偏向了这些作弊者,因为 fitness 公式将正确性(0.95 权重)和 token 效率(0.05 权重)混合成了单一分数。从磁盘读取答案文件不消耗任何 LLM turn,从而获得效率加分,这给作弊者带来了相对于诚实 agent(花费 token 搜索 repository)的生存优势。

加固你的 skill evaluator 以防范 reward-hacking 需要三个结构性护栏。第一,配置 Harbor,让 test fixtures、grading scripts 和 answer keys 位于一个专用的 verifier container 中,该容器只有在 agent container 退出后才挂载 workspace artifacts。第二,严格保持 SkillEvaluator 的五个维度(Correctness、Discoverability、Efficiency、Effectiveness 和 Security)相互正交;绝不让节省 token 来弥补失败的测试或安全违规。第三,在 NVIDIA/SkillEvaluator#140 中,我们扩展了安全检查,任何读取 Kubernetes service account token 或查询 cloud metadata endpoint 的试验都会判定失败,同时从保存的 trajectory 中对有效的 OAuth token 进行脱敏处理。

5. 编码操作习惯,而非文档堆砌

纵观我们所有的试验,那些在我们的 sandbox benchmark 中带来分数提升的 skill 与失败的社区 skill 之间的差异,归结为 markdown 里写的内容。

把公开 API 参考表复制粘贴到 skill 文件中的 skill 几乎没有提升。前沿模型在 pretraining weights 中已经包含了公开的云服务文档;向 prompt 中倾倒数千字的静态 flags 只会拉高 time-to-first-token,并埋没可操作的约束。

在我们的 test suite 中提升了 Efficiency 分数的 skill,教的是紧凑的操作习惯和验证反射,而不是百科全书式的参考文本:

在修改状态之前于叶子 subcommand 处验证 CLI flags:与其在 markdown 中列出几十个 flags,skill 教会的是一个简单的反射:在执行改变状态的部署之前,先在命令行验证 help 输出。

按需通过轻量级目录索引路由：与其一次性将十四个重量级的 cloud skills 加载到 context 中，不如由一个精简的 root router 检查经过筛选的远程索引，只拉取任务所需的特定 recipe。

强制执行最小权限的默认认证配置：显式的 guardrails 指示 Agent 通过 Application Default Credentials 进行认证，而非下载静态的 service-account JSON 密钥，同时在强制执行禁止未认证访问限制的基础上，配合显式的 invoker IAM bindings。

由于我们的 evaluation stack 运行在 CI 中，升级模型只需更改一个 flag。我们会针对新模型重新运行 WITH vs. W/OUT 配对矩阵，并删除所有 Delta 降为零的 skill。因为新模型已经“毕业”超越了某个 skill 而将其删除，堪称软件工程中最干净利落的击掌时刻之一。

开始使用

准备好为你的 coding agents 装备生产级 skills 了吗？快来试试 Google Cloud Developer Plugin for AI Coding Agents。

发布于
开发者与实践者
相关文章
开发者与实践者
Google Cloud Developer 插件现已在 Antigravity Marketplace 上架

作者：Remigiusz Samborski • 5 分钟阅读

网络
当 Kubernetes API 沉寂无声时：一起三层网络谜案

作者：Akash Thakur • 14 分钟阅读

开发者与实践者
幕后故事，两个月后：我们如何像产品一样交付 Google Agent Skills

作者：Remigiusz Samborski • 12 分钟阅读

容器与 Kubernetes
如何借助 VPC Flow Logs 更快地排查 GKE 工作负载

作者：Nishant Kumar • 8 分钟阅读
