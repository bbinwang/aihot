---
title: "传统 RAG 与 Agentic RAG 的本质区别： 从“碰运气式被动回答”升级为“闭环自我纠错与多源探索”"
date: 2026-10-26T00:00:00.000Z
tags: ["技术解读", "RAG", "Agentic RAG", "OAuth", "OIDC", "Linux", "聚合"]
summary: "用“翻书与探案”“临时钥匙与工作胸牌”“文件收纳柜”，理解 RAG、OAuth/OIDC 和 Linux 目录各自解决什么问题。"
---
> **原文链接**: [https://blog.bytebytego.com/p/ep230-rag-vs-agentic-rag](https://blog.bytebytego.com/p/ep230-rag-vs-agentic-rag)
> **来源**: blog.bytebytego.com
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/bytebytego-ep230-rag-agentic-rag/) · 2026/10/26
> **说明**: 本文由 AIHot 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

## EP230: RAG vs Agentic RAG
[https://substack.com/@bytebytego399569](https://substack.com/@bytebytego399569)[ByteByteGo](https://substack.com/@bytebytego399569)2026年10月24日

### 为长远而构建。(赞助内容)

[https://go.bytebytego.com/inngest_102426](https://go.bytebytego.com/inngest_102426)

长时间运行的 Agent 需要耐力。

它们必须忍受等待用户,并经受住工具失败的考验。它们还必须从容应对模型智能的每一次跃升。

Inngest 让长时间运行的 Agent 具备持久性、可观测性,并能随时间不断改进。

快来看看他们慷慨的免费额度,以及用于测试工作流的精美本地 dev server。

[与 Inngest 一起为长远而构建](https://go.bytebytego.com/inngest_102426)

---

本周的系统设计回顾:

- 每位工程师都应该知道的 5 大 AI 构建模块(Youtube 视频)
- RAG vs Agentic RAG
- OAuth(授权)+ OIDC(认证层)
- 理解 Linux 目录结构

---

### 每位工程师都应该知道的 5 大 AI 构建模块

---

### RAG vs Agentic RAG

[https://substackcdn.com/image/fetch/$s_!kwn1!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F406f8bb0-c31d-4fdf-a4b4-ec8242af7c33_2484x3002.png](https://substackcdn.com/image/fetch/$s_!kwn1!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F406f8bb0-c31d-4fdf-a4b4-ec8242af7c33_2484x3002.png)

RAG 是一种将信息检索与 LLM 相结合来生成答案的技术。以下是 RAG 在高层面上如何工作:

- 用户向应用提出问题。
- 检索系统从知识库中获取相关信息。
- 应用将这些信息添加到 prompt 中。
- LLM 使用该上下文生成答案。

RAG 通常遵循预定义的检索流程。其结果的质量取决于所检索上下文的准确性。

Agentic RAG 采用不同的方法。Agent 不是只检索一次,而是可以反复获取并评估信息,直到获得足够的证据来生成答案。以下是它通常的工作方式:

- Agent 根据任务选择合适的工具。
- 这些工具可以搜索文档、API、数据库或网络。
- 然后检查获取的证据是否足以完成任务。
- 如果不充足,Agent 可以调整搜索策略或选择其他工具。
- 一旦获得足够的证据,LLM 就会使用该上下文生成答案。

---

### 感谢开源维护者(赞助内容)

[https://go.bytebytego.com/sentry_102426](https://go.bytebytego.com/sentry_102426)

开源是我们所构建的几乎一切的基础,而背后的维护者让这一切成为可能。好消息是:支持他们的运动正在不断壮大。

两年前,Open Source Pledge 开始致力于让向维护者付费成为常态。如今,37 家成员公司已向维护者和基金会支付了 840 万美元,每一位新成员都为这一势头添砖加瓦。

了解 Sentry 今年如何投入这 100 万美元,或者加入 Pledge,成为未来的一部分。

[了解更多](https://go.bytebytego.com/sentry_102426)

---

### OAuth(授权)+ OIDC(认证层)

如果你想在 Slack 频道中显示 Google Calendar 的事件,就需要读取你日历的权限。如何让 Slack 访问你的日历,而又不把你的 Google 密码交给 Slack?

[https://substackcdn.com/image/fetch/$s_!0jRI!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2557767f-78ba-4262-af26-7d924110f1c0_2484x3002.png](https://substackcdn.com/image/fetch/$s_!0jRI!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2557767f-78ba-4262-af26-7d924110f1c0_2484x3002.png)

这正是 OAuth 2.0 发挥作用的地方。Slack 基本上永远不会看到你的 Google 密码。它让应用在不知道你的凭据的情况下,代表你访问受保护的资源。

基本上,OAuth 2.0 处理的是授权(authorization)。以 Slack 为例,它会将你引导至 Google 的授权服务器(authorization server),在那里登录并授予 Slack 访问你日历的权限。Google 会给你 authorization code,Slack 再用这个 code 换取 access_token。

如果 Slack 还想验证请求访问 Google Calendar 的人的身份,那就需要 OIDC 了。OIDC 负责处理认证(authentication),构建在 OAuth 2.0 之上。

OAuth 回答的是“你被允许访问什么”,而 OIDC 回答的是“你是谁”。除了授权服务器返回的 access_token 之外,这次它还会发送一个 id_token,这是一个经过签名的 JWT,基本上就是告诉 Slack 刚才是谁登录了。

---

### 理解 Linux 目录结构

Linux 目录结构从根目录 "/" 开始。让我们来浏览一下 Linux 的目录结构。

[https://substackcdn.com/image/fetch/$s_!eut4!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8ba580b5-8ba1-4e11-96a9-66430ec89ed6_2360x2960.png](https://substackcdn.com/image/fetch/$s_!eut4!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8ba580b5-8ba1-4e11-96a9-66430ec89ed6_2360x2960.png)

内核镜像和 bootloader 文件存储在 "boot" 目录中。硬盘分区和设备相关的文件位于 "dev" 目录中。

所有的程序和库都存储在 "bin"、"sbin"、"usr" 和 "lib" 目录中。比如,你安装的软件就位于 "usr" 目录。有没有想过 ls、cp 和 cat 这些命令在哪里?"bin" 就是存放这些核心命令的目录。

系统级配置放在 "etc" 中,而 "var" 存放系统运行时不断变化的数据,日志就在这里。

如果你有 U 盘,它会被挂载到 "bin" 文件夹中。任何你想临时挂载到 Linux 机器上的外部驱动器,"media" 就是存放它的目录。如果你有多个用户账户,"home" 就是 Linux 系统中每个用户的目录。

##### 关于本文的讨论
[https://substack.com/profile/95713172-freddy-kruger?utm_source=comment](https://substack.com/profile/95713172-freddy-kruger?utm_source=comment)[Freddy Kruger](https://blog.bytebytego.com/profile/95713172-freddy-kruger)[2 天前](https://blog.bytebytego.com/p/ep230-rag-vs-agentic-rag/comment/369203152)

什么是 "RAG"?如果第一次使用缩写时能写明全称会更有帮助,谢谢!
回复分享[1 条回复](https://blog.bytebytego.com/p/ep230-rag-vs-agentic-rag/comment/369203152)[https://substack.com/profile/45770259-nader-kanounji?utm_source=comment](https://substack.com/profile/45770259-nader-kanounji?utm_source=comment)[Nader Kanounji](https://blog.bytebytego.com/profile/45770259-nader-kanounji)[1 天前](https://blog.bytebytego.com/p/ep230-rag-vs-agentic-rag/comment/369704467)

我不信任的步骤是“检查证据是否充分”。谁来判定这一点?是那个想要给出答案的同一个模型。我的猜测是,对大多数团队来说,先修复检索质量会比在糟糕的检索之上再加一个循环获益更多。
回复分享[还有 6 条评论...](https://blog.bytebytego.com/p/ep230-rag-vs-agentic-rag/comments)

暂无文章

#### 想了解更多?
