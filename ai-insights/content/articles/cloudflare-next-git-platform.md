---
title: "上百个 Agent 同时写代码，该怎么协作？Cloudflare 想让你造下一代 Git 平台"
date: 2026-10-01T00:00:00.000Z
tags: ["洞察", "Cloudflare", "Artifacts", "Agent", "Git", "聚合"]
summary: "Artifacts 把仓库变成可编程的基础设施：分配独立任务、保存上下文、接上审查与部署。真正要设计的，是这些并行改动如何汇合。"
---
> **原文链接**: [https://blog.cloudflare.com/next-git-platform-on-cloudflare/](https://blog.cloudflare.com/next-git-platform-on-cloudflare/)
> **来源**: Cloudflare
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/cloudflare-next-git-platform/) · 2026/10/1
> **说明**: 本文由 AIHot 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

![](https://blog.cloudflare.com/_image?href=https%3A%2F%2Fblog.cloudflare.com%2F_emdash%2Fapi%2Fmedia%2Ffile%2F01M3VGDDQQHKX35297BEXJZ5H0.01M3VGDEMW20N9CFDP5TEPV5EJ.png&w=1999&h=1125&f=webp&fit=cover&position=center)![](data:image/bmp;base64,Qk32BAAAAAAAADYAAAAoAAAACAAAAAgAAAABABgAAAAAAMAAAAATCwAAEwsAAAAAAAAAAAAA/////v3+5+nx2t7r4+bw8/P29/X07+7q/////v3/5Ofy0tns2N/x6e348fL27u7r////////4+f1zdbuz9r04Oj77PD57u/v////////5+v5z9nyz9v43un/7PL98vPz////////8fT+3OP32uT95/D/8/j/+Pn5/////////v3/7fD97PL/9vv//v/////+////////////+vv/+/3/////////////////////////////////////////////)

GitHub 是为人类编写代码、将其组织成仓库、并通过分支、提交、Issue 和 Pull Request 进行协作的世界而构建的。

但下一代软件将以不同的方式构建，因为它将由不同类型的开发者——Agent——来构建。

Agent 已经比以往任何时候都编写更多的代码——它们修复 bug、构建功能、编写测试、审查更改、更新依赖项，并执行保持应用程序运行所需的日常维护。

那么，在这个新世界里，当你有成百上千个 Agent 同时在同一个代码库上工作时，基础架构应该是什么样的？

Agent 如何知道其他 Agent 正在做什么？当它们做出冲突的更改时会发生什么？你如何审查它们产生的所有内容？你如何不仅跟踪更改了什么，还跟踪*为什么*进行了更改？

因此，核心问题是：**下一个 GitHub 会是什么样子？**

我们希望你能通过构建它来帮助我们回答这个问题。

今年早些时候，我们推出了 [Artifacts](https://blog.cloudflare.com/artifacts-git-for-agents-beta/)，这是一个支持 Git 的版本化文件系统，可以扩展到数百万个仓库。从一开始，我们就将 Artifacts 设计为一组可编程的原语，开发者可以用它们来构建自己的产品、工作流和抽象。

![](data:image/bmp;base64,Qk32BAAAAAAAADYAAAAoAAAACAAAAAgAAAABABgAAAAAAMAAAAATCwAAEwsAAAAAAAAAAAAAnlpCoFtFol1Kol5LnltLmFhNkFZWilZgq2dMrGlQrWtWrWxZq2tXpWdYm2RgkmJpunVXundbuXliuntluXpjtHZiqXJpnG5yx4FfxoFixINpxIRrxYRpwYBotnxtqHh1z4djzodly4dpyohqy4doyYVov4Frsnxx1Ipk0olkzodkzIZjzYZizIVjxYFlu31o1otk04lizoVezIJbzYNbzYNdyIBewHxe1otk04hhzoRby4FXzIFYzYJayX9bwntZ)![](https://blog.cloudflare.com/_image?href=https%3A%2F%2Fblog.cloudflare.com%2F_emdash%2Fapi%2Fmedia%2Ffile%2F01M3SQC6HRKEPPV90RWXN9CTKR.png&w=715&h=396&f=webp&fit=cover&position=center)

Artifacts 提供了基础：可以编程创建和 fork 的仓库、用于代码和 Agent 上下文的版本化存储，以及 Agent 已经知道如何使用的 Git 操作。

有了这个基础，你可以专注于更上层的部分：Agent 如何协调它们的工作，更改如何被审查和合并，以及当成百上千个 Agent 在同一个代码库上工作时，开发者体验应该是什么样的。

这就是我们希望你们构建的层面。

现在 Artifacts 已进入公开测试版，[我们正在举办一场竞赛](http://cloudflare.com/git-competition)，看看谁能使用 Workers 和 Artifacts 在 Cloudflare 上构建下一个 Git 平台。

### Artifacts 已进入公开测试版。以下是为什么你应该基于它构建的原因

当我们推出 Artifacts 时，我们的目标是能够为每个 Agent、会话、任务或用户创建一个仓库——并且能够以 Agent 所需的规模做到这一点。

自那以后，我们看到开发者以多种方式使用 Artifacts：Vibe-coding 平台用它来存储用户创建的项目；开发者用它来持久化 Agent 会话中的代码和上下文；其他人则创建隔离的仓库，以便多个 Agent 可以安全地从同一个起点工作，并在之后比较或合并结果。

以下是自最初发布以来我们添加的一些新功能。

#### 将 Artifacts 仓库部署到 Workers

你现在可以通过 [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/artifacts-integration/) 将 Artifacts 仓库连接到 Worker。当你或 Agent 将代码推送到 Artifacts 仓库时，Cloudflare 将构建项目，并且对于生产分支，部署更新后的 Worker。推送到其他分支会自动创建或更新 [Workers Previews](https://developers.cloudflare.com/workers/previews/)，为你提供一个隔离的、可共享的 Worker 版本，你可以在其上测试更改，然后再将其上线。

#### 直接从 Worker 管理 Artifacts

你可以将现有 Worker 连接到 Artifacts 仓库，或者启动一个新项目并自动将其存储到 Artifacts 中。

![](data:image/bmp;base64,Qk32BAAAAAAAADYAAAAoAAAACAAAAAgAAAABABgAAAAAAMAAAAATCwAAEwsAAAAAAAAAAAAA+/v69/f38fHx7+/v8/P09/f39PTz6+vq/v79+/v69PT08/Pz9/f4+vr79/f37u7u///////++fn49/f3+/v8/v7/+/v78vLy////////+/v7+vr6/v7//////v7+9vb2/////////Pz8+/v7////////////+Pj4////////+/v7+vr6////////////+vr5////////+fn5+Pj5////////////+vr5////////+Pj49/f4//7/////////+vr5)![](https://blog.cloudflare.com/_image?href=https%3A%2F%2Fblog.cloudflare.com%2F_emdash%2Fapi%2Fmedia%2Ffile%2F01M3SQC8RKCYFADSHXNX2XR1XF.png&w=715&h=559&f=webp&fit=cover&position=center)

你可以直接通过 Worker 与 Artifacts 仓库交互，使用 [Artifacts binding](https://developers.cloudflare.com/artifacts/api/workers-binding/) 来创建或 fork 仓库、检查文件和提交记录，以及发放仓库作用域的 Git 令牌。这让你的 Git 工作流变得可编程。当新任务到达时，Worker 可以为 agent  fork 项目，读取它所需的上下文文件，并提供一个仓库供其工作。当 agent 推送变更时，你的自动化流程可以检查结果并启动审查。你可以在代码中定义这些步骤，以适应你的 agent 工作方式。

例如，以下是如何为一个新的 agent 任务 fork 项目，并读取其中的 `AGENTS.md` 以获取指令：

```
<span class="line"><span class="sk-d73a49-a0a0a0">using</span><span class="sk-005cc5-fff"> project</span><span class="sk-d73a49-a0a0a0"> =</span><span class="sk-d73a49-a0a0a0"> await</span><span class="sk-24292e-fff"> env.</span><span class="sk-005cc5-fff">ARTIFACTS</span><span class="sk-24292e-fff">.</span><span class="sk-6f42c1-ffc799">get</span><span class="sk-24292e-fff">(</span><span class="sk-032f62-99ffe4">"my-project"</span><span class="sk-24292e-fff">);</span></span>
<span class="line"><span class="sk-d73a49-a0a0a0">const</span><span class="sk-24292e-fff"> { </span><span class="sk-005cc5-fff">defaultBranch</span><span class="sk-24292e-fff"> } </span><span class="sk-d73a49-a0a0a0">=</span><span class="sk-d73a49-a0a0a0"> await</span><span class="sk-24292e-fff"> project.</span><span class="sk-6f42c1-ffc799">info</span><span class="sk-24292e-fff">();</span></span>
<span class="line"><span class="sk-d73a49-a0a0a0">const</span><span class="sk-005cc5-fff"> workspace</span><span class="sk-d73a49-a0a0a0"> =</span><span class="sk-d73a49-a0a0a0"> await</span><span class="sk-24292e-fff"> project.</span><span class="sk-6f42c1-ffc799">fork</span><span class="sk-24292e-fff">(</span><span class="sk-032f62-99ffe4">`task-${</span><span class="sk-24292e-fff">crypto</span><span class="sk-032f62-99ffe4">.</span><span class="sk-6f42c1-ffc799">randomUUID</span><span class="sk-032f62-99ffe4">()</span><span class="sk-032f62-99ffe4">}`</span><span class="sk-24292e-fff">);</span></span>
<span class="line"></span>
<span class="line"><span class="sk-d73a49-a0a0a0">using</span><span class="sk-005cc5-fff"> repo</span><span class="sk-d73a49-a0a0a0"> =</span><span class="sk-d73a49-a0a0a0"> await</span><span class="sk-24292e-fff"> env.</span><span class="sk-005cc5-fff">ARTIFACTS</span><span class="sk-24292e-fff">.</span><span class="sk-6f42c1-ffc799">get</span><span class="sk-24292e-fff">(workspace.name);</span></span>
<span class="line"><span class="sk-d73a49-a0a0a0">const</span><span class="sk-005cc5-fff"> instructions</span><span class="sk-d73a49-a0a0a0"> =</span><span class="sk-d73a49-a0a0a0"> await</span><span class="sk-24292e-fff"> repo.</span><span class="sk-6f42c1-ffc799">readFile</span><span class="sk-24292e-fff">({</span></span>
<span class="line"><span class="sk-24292e-fff">  ref: defaultBranch,</span></span>
<span class="line"><span class="sk-24292e-fff">  path: </span><span class="sk-032f62-99ffe4">"AGENTS.md"</span><span class="sk-24292e-fff">,</span></span>
<span class="line"><span class="sk-24292e-fff">});</span></span>
<span class="line"></span>
<span class="line"><span class="sk-d73a49-a0a0a0">const</span><span class="sk-005cc5-fff"> agentTask</span><span class="sk-d73a49-a0a0a0"> =</span><span class="sk-24292e-fff"> {</span></span>
<span class="line"><span class="sk-24292e-fff">  remote: workspace.remote,</span></span>
<span class="line"><span class="sk-24292e-fff">  token: workspace.token,</span></span>
<span class="line"><span class="sk-24292e-fff">  instructions: instructions </span><span class="sk-d73a49-a0a0a0">?</span><span class="sk-d73a49-a0a0a0"> await</span><span class="sk-24292e-fff"> instructions.</span><span class="sk-6f42c1-ffc799">text</span><span class="sk-24292e-fff">() </span><span class="sk-d73a49-a0a0a0">:</span><span class="sk-005cc5-fff"> null</span><span class="sk-24292e-fff">,</span></span>
<span class="line"><span class="sk-24292e-fff">};</span></span>
```

#### 通过事件订阅响应每一次变更

Artifacts 在仓库被创建、导入、派生、删除、推送、克隆或获取时会发布事件。你可以订阅这些事件来决定下一步做什么：运行 CI、启动代码审查 Agent，或部署变更。

例如，你可以订阅 Artifacts 的推送事件，让一个 Worker 为每次推送启动代码审查工作流。Worker 将仓库、分支和新提交传递给工作流，为审查 Agent 提供检查变更所需的上下文：

```
<span class="line"><span class="sk-d73a49-a0a0a0">export</span><span class="sk-d73a49-a0a0a0"> default</span><span class="sk-24292e-fff"> {</span></span>
<span class="line"><span class="sk-d73a49-a0a0a0">  async</span><span class="sk-6f42c1-ffc799"> queue</span><span class="sk-24292e-fff">(</span><span class="sk-e36209-fff">batch</span><span class="sk-24292e-fff">, </span><span class="sk-e36209-fff">env</span><span class="sk-24292e-fff">) {</span></span>
<span class="line"><span class="sk-d73a49-a0a0a0">    for</span><span class="sk-24292e-fff"> (</span><span class="sk-d73a49-a0a0a0">const</span><span class="sk-005cc5-fff"> message</span><span class="sk-d73a49-a0a0a0"> of</span><span class="sk-24292e-fff"> batch.messages) {</span></span>
<span class="line"><span class="sk-d73a49-a0a0a0">      const</span><span class="sk-005cc5-fff"> event</span><span class="sk-d73a49-a0a0a0"> =</span><span class="sk-24292e-fff"> message.body;</span></span>
<span class="line"><span class="sk-d73a49-a0a0a0">      if</span><span class="sk-24292e-fff"> (event.type </span><span class="sk-d73a49-a0a0a0">!==</span><span class="sk-032f62-99ffe4"> "cf.artifacts.repo.pushed"</span><span class="sk-24292e-fff">) </span><span class="sk-d73a49-a0a0a0">continue</span><span class="sk-24292e-fff">;</span></span>
<span class="line"></span>
<span class="line"><span class="sk-d73a49-a0a0a0">      await</span><span class="sk-24292e-fff"> env.</span><span class="sk-005cc5-fff">REVIEW_WORKFLOW</span><span class="sk-24292e-fff">.</span><span class="sk-6f42c1-ffc799">create</span><span class="sk-24292e-fff">({</span></span>
<span class="line"><span class="sk-24292e-fff">        params: {</span></span>
<span class="line"><span class="sk-24292e-fff">          namespace: event.source.namespace,</span></span>
<span class="line"><span class="sk-24292e-fff">          repo: event.source.repoName,</span></span>
<span class="line"><span class="sk-24292e-fff">          ref: event.payload.ref,</span></span>
<span class="line"><span class="sk-24292e-fff">          commit: event.payload.after,</span></span>
<span class="line"><span class="sk-24292e-fff">        },</span></span>
<span class="line"><span class="sk-24292e-fff">      });</span></span>
<span class="line"><span class="sk-24292e-fff">    }</span></span>
<span class="line"><span class="sk-24292e-fff">  },</span></span>
<span class="line"><span class="sk-24292e-fff">};</span></span>
```

#### Artifacts 仓库的数据管辖权

现在你可以[选择 Artifacts 存储和处理](https://developers.cloudflare.com/artifacts/guides/data-localization/)仓库数据的位置。在创建命名空间时设置美国或欧盟管辖权，该命名空间内创建的所有仓库将自动遵循相同的限制。

```
<span class="line"><span class="sk-6f42c1-ffc799">curl</span><span class="sk-032f62-99ffe4"> "https://api.cloudflare.com/client/v4/accounts/</span><span class="sk-24292e-fff">$ACCOUNT_ID</span><span class="sk-032f62-99ffe4">/artifacts/namespaces"</span><span class="sk-005cc5-a0a0a0"> \</span></span>
<span class="line"><span class="sk-005cc5-99ffe4">  -H</span><span class="sk-032f62-99ffe4"> "Authorization: Bearer </span><span class="sk-24292e-fff">$CLOUDFLARE_API_TOKEN</span><span class="sk-032f62-99ffe4">"</span><span class="sk-005cc5-a0a0a0"> \</span></span>
<span class="line"><span class="sk-005cc5-99ffe4">  --json</span><span class="sk-032f62-99ffe4"> '{"namespace":"my-eu-namespace","jurisdiction":"eu"}'</span></span>
```

#### 查看 Artifacts 指标

现在您可以在 Cloudflare 仪表板中查看 Artifacts 存储库的指标。对于每个存储库，您现在可以查看总操作数、拉取次数、推送次数、错误数和错误率，帮助您了解存储库的使用情况并发现故障。您也可以直接查询 [Artifacts 指标](https://developers.cloudflare.com/artifacts/observability/metrics/) 来构建自己的仪表板或监控系统。

![](data:image/bmp;base64,Qk32BAAAAAAAADYAAAAoAAAACAAAAAgAAAABABgAAAAAAMAAAAATCwAAEwsAAAAAAAAAAAAA/e7r+e3r8evr7+7v9PP1+Pb39PLy6unq//f1/fTz9PDv8fDx9vX3+/n69/X27Ozs//////389/X18/Pz+fn6/v3++vn67vDw////////+/v69vf3/Pz9/////f7+8vTz/////////v7++vv7////////////9Pf2/////////////P3/////////////9vn4/////////////v//////////////+Pv5////////////////////////////+Pv5)![](https://blog.cloudflare.com/_image?href=https%3A%2F%2Fblog.cloudflare.com%2F_emdash%2Fapi%2Fmedia%2Ffile%2F01M3SQC9MA49HNQD82GBG58EDM.png&w=715&h=466&f=webp&fit=cover&position=center)

#### 定价

Artifacts 的定价基于存储库操作和存储的数据量。我们将于 2026 年 10 月 15 日开始对 Artifacts 的使用进行计费。

### 竞赛：在 Cloudflare 上构建下一代 Git 平台

我们希望您使用 Cloudflare Workers 和 Artifacts 来构建您对代理时代 Git 平台的愿景。

您可以重新构想存储库、分支、拉取请求、工作树、代码审查和合并冲突——或者构建新的方式来保留代理上下文、同时比较多个更改并决定哪个应该发布。

我们寻找的不是现有 GitHub 加上代理的简单叠加。至少，我们希望看到多个代理同时处理更改。除此之外，我们希望您发挥创意——您认为接下来会发生什么。

#### 如何参赛

提交：

- 一段 5-10 分钟的视频，展示您构建的内容、它如何赋能代理和开发者，以及它的工作原理
- 源代码的链接，源代码必须在宽松的开源许可证（MIT、Apache、BSD）下提供
- 运行或试用该项目的说明

#### 截止日期

[提交](http://cloudflare.com/git-competition) 开放至 2026 年 10 月 14 日。

#### 为什么要参与？

我们将选出前三名项目，并为每个团队最多两名成员提供飞往旧金山的机票，参加 [Cloudflare Connect](https://www.cloudflare.com/connect/) 并展示他们的成果。

第一名团队还将获得 25,000 美元的 Cloudflare 积分，以及周一晚上 Connect 活动的 VIP 演讲者晚宴邀请。

### 开始使用

Artifacts 目前面向 Workers Paid 计划的客户开放公开测试。

开始使用您的编码代理：复制以下提示来设置您的第一个 Artifacts 存储库并开始向其推送代码。

您可以在 [仪表板](https://dash.cloudflare.com/?to=/:account/workers/artifacts) 中查看或创建 Artifacts 存储库，或者如果您想了解更多信息，请查看 [文档](https://developers.cloudflare.com/artifacts/)。

### 相关标签
[生日周](https://blog.cloudflare.com/tag/birthday-week/)[开发者](https://blog.cloudflare.com/tag/developers/)[Workers](https://blog.cloudflare.com/tag/workers-1/)

关注社交媒体

- ![Cloudflare](https://blog.cloudflare.com/images/placeholder__cloudflare.png)Cloudflare[https://blog.cloudflare.com/rss/](https://blog.cloudflare.com/rss/)[https://x.com/Cloudflare](https://x.com/Cloudflare)[https://www.linkedin.com/company/cloudflare-inc-](https://www.linkedin.com/company/cloudflare-inc-)[https://www.youtube.com/cloudflare](https://www.youtube.com/cloudflare)[https://instagram.com/cloudflare](https://instagram.com/cloudflare)[https://github.com/cloudflare](https://github.com/cloudflare)[https://bsky.app/profile/cloudflare.social](https://bsky.app/profile/cloudflare.social)[https://www.threads.com/@cloudflare](https://www.threads.com/@cloudflare)[https://www.tiktok.com/@cloudflare](https://www.tiktok.com/@cloudflare)
- ![Dina Kozlov](https://blog.cloudflare.com/_image?href=https%3A%2F%2Fblog.cloudflare.com%2F_emdash%2Fapi%2Fmedia%2Ffile%2F01KW49DZ20ZY95S71GB0FPG6GC.jpg&w=64&h=64&f=webp&fit=cover&position=center)[Dina Kozlov](https://blog.cloudflare.com/author/dina/)[https://x.com/dinasaur_404](https://x.com/dinasaur_404)
- ![Zebulon Piasecki](https://blog.cloudflare.com/_image?href=https%3A%2F%2Fblog.cloudflare.com%2F_emdash%2Fapi%2Fmedia%2Ffile%2F01M3SPNPQ4FRWZZG3GWEV0VY2J.01M3SPNRCTC9WW528APGP7F8BP.jpg&w=64&h=64&f=webp&fit=cover&position=center)[Zebulon Piasecki](https://blog.cloudflare.com/author/zeb/)[https://x.com/zebassembly](https://x.com/zebassembly)

### 订阅以接收新帖子的通知
