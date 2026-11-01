---
title: "代码还没写完，也能请同事接着做：Delta 为 Claude Code 加上多人协作"
date: 2026-10-28T00:00:00.000Z
tags: ["工具教程", "Claude Code", "Delta", "协作", "聚合"]
summary: "发给队友一个链接，让他拿到当前代码和你与 Claude 的排查记录，再用自己的 Claude 继续。"
---
> **原文链接**: [https://delta.dev/blog/claude-code-multiplayer](https://delta.dev/blog/claude-code-multiplayer)
> **来源**: delta.dev
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/delta-claude-code-multiplayer/) · 2026/10/28
> **说明**: 本文由 AIHot 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

---
title: "Claude Code 现已支持多人协作 — Delta Blog"
url: "https://delta.dev/blog/claude-code-multiplayer"
description: "与队友共享你的 Claude Code 对话和未完成的代码改动。"
---

博客

## Claude Code 现已支持多人协作

Franciska Dethlefsen2026年10月27日

现在，你可以与队友共享你的 Claude Code 工作，并让他们从自己的 Claude Code 会话中加入。对话和未完成的代码改动会被共享，因此他们可以看到你尝试过的内容、提出问题并参与贡献，无需等待 commit,也不必依赖粘贴过来的摘要来工作。

此功能目前以 beta 形式通过 [Delta CLI](https://delta.dev/docs/cli/get-started) 和我们的 [Claude Code 插件](https://delta.dev/docs/cli/claude-code) 提供。

### [共享工作，继续使用 Claude Code](#share-the-work-keep-using-claude-code)

运行 `/delta share` 获取一个链接，然后将其发送给队友。他们在 Claude Code 中运行 `/delta join <link>` 即可加入共享的线程。

该插件通过 Delta 共享你的 Claude Code 对话和 worktree。CLI 保持各机器之间的文件同步。每个人使用自己的 Claude 会话，共享的对话可作为上下文使用。

### [当你需要另一个人时](#when-you-need-another-human)

我们整天在 Delta 中协作。能够加入队友的会话并直接与他们的 agent 交流，改变了我们共同构建软件的方式。但现在每个开发者都在选择自己的 agent 和工具，我们认为协作不应该要求所有人都切换工具。

我们的团队分布在多个时区，一个人的傍晚常常是另一个人的清晨。我们中的一人可以合上笔记本电脑，下一个人打开自己的电脑，接着继续这条线程。

现在你可以在 Claude Code 中做到同样的事。共享会话让你可以在任务还没准备好提交 PR 之前就交出去，并提供仅凭 diff 无法传达给队友的上下文。

而且，如果你已经在使用 Delta,但不打算放弃 Claude Code 的同事也想参与，你可以把他们拉进同一个线程。他们留在 Claude Code,你留在 Delta,大家一起协作。

### [更多 harness 即将支持](#more-harnesses-to-come)

我们正在为更多 harness 构建支持，首先是 [Pi](https://pi.dev/),我们也欢迎大家一起帮助添加其他 harness。[Claude Code 插件是开源的](https://github.com/zed-industries/delta-claude),为连接你偏好的 harness 提供了参考实现。我们的[构建你自己的插件指南](https://delta.dev/docs/cli/build-a-plugin)说明了从哪里入手。

要开始共享 Claude Code 会话，请安装 [Delta CLI](https://delta.dev/docs/cli/get-started) 和 [Claude Code 插件](https://delta.dev/docs/cli/claude-code)。

### 博客更多内容

*   ### [请别再给我发 Google Docs 了](/blog/please-stop-sending-me-google-docs)
    
    ![Franciska Dethlefsen](https://avatars.githubusercontent.com/u/10458212?v=4 "Franciska Dethlefsen")2026年10月8日
    
*   ### [你的 plan.md 缺少对话](/blog/planning-together-in-delta)
    
    ![Nathan Sobo](https://avatars.githubusercontent.com/u/1789?v=4 "Nathan Sobo")2026年10月1日
    
*   ### [Delta 简介](https://zed.dev/blog/introducing-delta)
    
    精选![Nathan Sobo](https://avatars.githubusercontent.com/u/1789?v=4 "Nathan Sobo")2026年8月12日
    

[立即下载 Delta](/download)[打开 Delta](/threads)
