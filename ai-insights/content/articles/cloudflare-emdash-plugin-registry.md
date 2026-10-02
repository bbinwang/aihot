---
title: "Cloudflare 发布 EmDash 1.0，Agent 友好的开源 CMS"
date: 2026-09-30T00:00:00.000Z
tags: ["产品发布", "Cloudflare", "EmDash", "CMS", "聚合"]
summary: "EmDash 是免费开源的 WordPress 替代品：Agent 能直接改内容，插件默认关进沙箱，插件目录也不归任何公司，1.0 起可用于正式网站。"
---
> **原文链接**: [https://blog.cloudflare.com/emdash-cms-plugin-registry/](https://blog.cloudflare.com/emdash-cms-plugin-registry/)
> **来源**: Cloudflare
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/cloudflare-emdash-plugin-registry/) · 2026/9/30
> **说明**: 本文由 AIHot 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

![BLOG-3519: Hero Image](https://blog.cloudflare.com/_image?href=https%3A%2F%2Fblog.cloudflare.com%2F_emdash%2Fapi%2Fmedia%2Ffile%2F01M3D0T7XHPBZM8YB0PX5W78EQ.png&w=1999&h=1125&f=webp&fit=cover&position=center)![](data:image/bmp;base64,Qk32BAAAAAAAADYAAAAoAAAACAAAAAgAAAABABgAAAAAAMAAAAATCwAAEwsAAAAAAAAAAAAAJgAAJgAAKgAEMAAPNgYWOQUVNwAKMwAAJQAAJwAELggUNxchPh4qPx0qOREeMAAAKAAGKwgONRgeQCQtSCs4SCo4QB8rMwYKLwcMMw8SPR0iSSkyUjA+Uy8+TCUxPw4ROQUNPAwSRRogUCYwWi48Xi09WiIxUQwUQwANRQEPTA8ZVhwoYSQ0ZyQ2ZhksYgAUSgALSwAKUAAPWgodZRUpbRYtbwsmbQASTAAKTQAHUgAJWwAXZgskbw4ocgIicQAS)

当我们[在4月1日推出EmDash](https://blog.cloudflare.com/emdash-wordpress/)作为“WordPress的精神继承者”时，这股热潮让人难以忽视。那个月，在WordPress大会上走不了几步，就能听到与会者低声讨论EmDash。

但在兴奋与好奇之余，行业内一些人也心存疑虑：这难道只是个愚人节玩笑吗？

并非如此。今天，我们正式发布EmDash 1.0：一个基于Astro构建的稳定、免费、开源的CMS，可用于支撑生产级网站、你的代理公司的氛围编码平台，或你的托管公司的网站构建体验。

开发者用Astro构建，编辑通过EmDash管理后台管理内容，而Agent则可通过API、CLI或内置MCP服务器工作。EmDash 1.0将这些组件整合在一起，提供了经过生产验证的编辑、媒体、本地化、迁移和部署工作流。

我们还推出了一个去中心化的插件注册表，让开发者无需将身份或版本控制权交给中心化市场即可发布插件，同时网站所有者可以直接在EmDash内部发现并安装这些插件。

![](data:image/bmp;base64,Qk32BAAAAAAAADYAAAAoAAAACAAAAAgAAAABABgAAAAAAMAAAAATCwAAEwsAAAAAAAAAAAAA////9/f34+Pj2tra5OTk8vLy8/Pz6Ojo////+fn55eXl3d3d6Ojo9fX19vb26+vr/////Pz86urq4uLi7e3d+vr6+vr67+/v////////7+/v6Ojo8/Pz/////v7+8/Pz////////9PT07+/v+fn5////////9/f3////////+fn59PT0/v7+////////+vr6/////////f39+Pj4/////////////Pz8/////////v7++fn5/////////////f39)![EmDash 文章编辑器](https://blog.cloudflare.com/_image?href=https%3A%2F%2Fblog.cloudflare.com%2F_emdash%2Fapi%2Fmedia%2Ffile%2F01M3D0T6QE9CBJPJH0GREKTWEM.png&w=715&h=414&f=webp&fit=cover&position=center)

EmDash 文章编辑器。

### 通往 1.0 之路

自EmDash首个beta版本以来，开发者已经用它构建了真实的网站。即便如此，我们仍不断听到一个合理的回应：“这看起来很有趣。等它到1.0版本时再告诉我。”在依赖EmDash搭建网站之前，他们希望确信它稳定、安全，升级能保护内容，并且我们完全致力于维护它。

EmDash 1.0就是我们对这一需求的回应。过去五个月里，我们与贡献者和生产用户一起，打磨了每个网站都依赖的CMS核心部分：数据安全、数据库迁移、编辑工作流、本地化、插件安全、性能，以及管理后台、API、MCP和媒体体验的可靠性。

真实的部署场景推动了大部分工作，揭示了只有在网站承载真实流量并被真实编辑团队使用时才会出现的边缘情况和需求。

举个例子，[Avulux](https://avulux.com/) 在长期承受WordPress维护负担后，将一个定制微站点迁移到了EmDash。由于EmDash是Agent的最佳搭档，使用[EmDash Agent Skills](https://github.com/emdash-cms/emdash/tree/main/skills) 让这次迁移在不到一天内完成。

“这个网站必须使用起来快速，并且让我们的团队易于更新，”Avulux创新与系统总监Greg Barbosa表示。“WordPress已经变得恰恰相反。有了EmDash，我们现在拥有一个共享平台，开发者可以扩展，营销人员可以编辑内容。”

今年8月，作为“Customer Zero”策略的一部分，我们[将Cloudflare博客迁移到了EmDash](https://blog.cloudflare.com/cloudflare-blog-uses-emdash/)。与内容工程团队的合作，为我们提供了关于本地化、媒体管理、管理后台编辑器体验以及扩展性方面的可操作见解。平稳处理Cloudflare博客的流量负载，意味着要准备好应对每周数百万的页面浏览量、高达每秒5000次请求（RPS）的合法流量峰值，或偶发的DDoS攻击。可选的[KV对象缓存](https://docs.emdashcms.com/deployment/object-cache/)、[Hyperdrive数据库适配器](https://docs.emdashcms.com/deployment/database/#hyperdrive)和[Workers Cache兼容性](https://docs.emdashcms.com/deployment/cloudflare/#workers-cache)都是我们迁移项目中催生出的功能，现已广泛开放给所有客户使用。

### 公开构建，向所有人开放

CMS 处于组织网络形象的核心位置。它承载着组织最重要的数据，并且每天常被数十位编辑使用。他们需要确信自己可以依赖它，而不必担心供应商锁定或业务优先级变动。因此，EmDash 是[完全免费且开源的](https://github.com/emdash-cms/emdash)，采用灵活且宽松的 MIT 许可证。

EmDash 1.0 离不开其开源开发社区。在撰写本文时，已有超过 175 人为该项目做出了贡献，提交次数超过 1,800 次。智能体编码工具的兴起为开源项目带来了挑战和机遇，我们刻意构建了一个让智能体能够帮助人类开发者、而非令其不堪重负的项目。

我们特别感谢由最投入的贡献者组成的核心团队，他们共同为项目的各个领域交付了数百项改进。其中包括 [@swissky](https://github.com/swissky)、[@danielmlr](https://github.com/danielmlr)、[@MA2153](https://github.com/MA2153)、[@marcusbellamyshaw-cell](https://github.com/marcusbellamyshaw-cell) 以及数十位其他贡献者。贡献者们已将 EmDash 翻译成 25 种语言，从阿拉伯语到乌克兰语。

特别值得一提的是 Noah Pham，他以实习生身份加入 Cloudflare，并成为 EmDash 的联合维护者（与 Matt 一同）。Noah 贡献了超过 80 项更改，负责了媒体库、内容编辑器和管理界面的主要部分。我们曾说过，[实习生会在 Cloudflare 交付有意义的工作](https://blog.cloudflare.com/cloudflare-1111-intern-program/)；Noah 的工作如今已成为 EmDash 1.0 的核心。

还有更多的内容有待构建，而贡献并不一定意味着编写代码。如果你想在代码、翻译、文档、测试、设计、问题分类、回答问题或只是欢迎新用户方面提供帮助，欢迎[加入 Discord 上的 EmDash 社区，与 800 多位成员交流](https://discord.gg/YY9vBaQRYt)。

### 不断增长的生态系统

当内容管理系统周围的生态系统健康且受支持时，它便会蓬勃发展。我们对于使用 EmDash 创建新服务和产品的主题公司、插件商店、代理机构和平台感到兴奋。

- [Lexington Themes](https://lexingtonthemes.com/templates/astro-emdash-templates) 提供了 44 款带有 EmDash 变体的 Astro 主题，为团队提供了美观且实用的网站起点，并包含可复用组件和内置内容集合。
- [Urumi](https://urumi.ai/otta-is-the-ecommerce-plugin-for-cloudflares-em-dash) 正在利用其 WooCommerce 专业知识，发布 EmDash 的首个电子商务插件。
- [Empress](http://tryempress.dev/) 正在推出一个面向多品牌实体的平台，提供使用自然语言或传统 CMS 管理面板来管理多个站点的灵活性。

“如果没有 EmDash 奠定的基础——快速、易于扩展且便于人员和智能体读取和操作的站点——Empress 令人愉悦的多站点体验是不可能实现的。”Empress 创始人 Raj Makker 表示。“EmDash 提供了对网站的强有力控制，而 Empress 在此基础上构建，让你能够完全控制任意数量的网站。我们很高兴能参与这一旅程。”

### 一个不拥有生态系统的插件注册中心

![](data:image/bmp;base64,Qk32BAAAAAAAADYAAAAoAAAACAAAAAgAAAABABgAAAAAAMAAAAATCwAAEwsAAAAAAAAAAAAA+Pn69PT17Ovs6Ojo7Ozs7/Dx7O3u5OTl8fH07u7w6Ojp5+fn7e3t8fHy7u7v5eXl6+vv6ejs5ebn6Ojo7+/v9PT18PDx5ufn6+vw6ent5+fp6+zr9PTz+fj59PT16urq9PP38fH07u7w8fLx+vr5//7++vn67u7v/////Pz+9/f4+Pj5////////////8vL1/////////////v7+////////////9vX6////////////////////////////9/b8)![](https://blog.cloudflare.com/_image?href=https%3A%2F%2Fblog.cloudflare.com%2F_emdash%2Fapi%2Fmedia%2Ffile%2F01M3D0T91A1E9C60CW4Z61XA7X.png&w=715&h=447&f=webp&fit=cover&position=center)

通过 EmDash 1.0，开发者可以发布沙盒化插件，站点所有者可以从 [EmDash 插件注册表](https://plugins.emdashcms.com/) 发现、检查并安装它们。

传统的插件注册表通常合并了三个角色：它们提供发布者的账户，持有权威的软件包记录，并运营用户发现它的目录。这很方便，但也让一家公司成为身份和分发的把关者。如果某个账户被暂停、某个列表被移除、规则发生变化或服务关闭，发布者无法将相同的身份和发布历史带到其他地方。

EmDash 将插件与目录分离。发布者保留对其软件包和发布历史的控制权，而 EmDash 为

Agent 让这种复用更具价值。一个 Agent 可以构建一次性的集成，但它仍然需要理解问题、生成并测试代码，然后进行后续维护。而插件则封装了这些工作。另一个 Agent 可以直接安装和配置一个经过验证的解决方案，而无需从头开始。

这种便利性也带来了严重的安全隐患：插件是你未编写的代码，却与有价值的内容和客户数据一同运行。在 WordPress 中，插件与应用程序的其他部分运行在同一个 PHP 进程中，可以直接访问其数据库、文件系统和网络。一个联系表单插件理论上可以读取未发布的文章、修改另一个插件，或将数据发送到任何地方。网站所有者必须信任它不会这样做——并且未来的更新也不会改变其行为。

沙盒化的 EmDash 插件采用了不同的模型。每个插件在独立的运行时中运行，只能访问其自身的私有存储，而无法访问网站的内容、媒体、用户、密钥、环境、文件系统或网络。只有当插件声明了额外的能力，并且网站管理员批准后，它才能获得这些能力。

![](data:image/bmp;base64,Qk32BAAAAAAAADYAAAAoAAAACAAAAAgAAAABABgAAAAAAMAAAAATCwAAEwsAAAAAAAAAAAAA9fj+9fj78/b16ezw1dzuws3susjovczj/Pz++/v6+Pby8O7t4uXv1t7xz9ruztnn///////6/vfw+PHs8fDy6/D45e315efs///////+//ry//bv/fn3+/3/9fv87/Ly///////////5//v1//78/////v//9/j3///////////////9////////////+fj8/////////////////////////vz/+Pf+//////////////////////3//Pr/9/b/)![](https://blog.cloudflare.com/_image?href=https%3A%2F%2Fblog.cloudflare.com%2F_emdash%2Fapi%2Fmedia%2Ffile%2F01M3D0T4FG646PMGKA5P8969MS.png&w=715&h=423&f=webp&fit=cover&position=center)

WordPress 与 EmDash 运行时架构的对比。

因此，安装一个沙盒化插件的感觉更像是安装一个移动应用，而非传统的 CMS 插件。EmDash 会在插件运行前展示其想要执行的操作，而运行时则将其限制在已批准的能力范围内。

这使得插件能够在没有无关权限的情况下执行有用的工作：

| **一个插件可以……** | **它可能需要……** | **它仍然不能……** |
| --- | --- | --- |
| 为搜索功能索引已发布的文章 | 读取内容并联系搜索服务 | 编辑文章或联系其他主机 |
| 优化上传的图片 | 读取和管理媒体 | 读取用户内容 |
| 发送发布通知 | 观察发布事件并发送邮件 | 更改正在发布的内容 |
| 提供可配置的 webhook | 读取选定事件并联系公开目标 | 访问私有网络或其他插件的存储 |

关键在于这些能力是相互独立的。授予插件访问媒体的权限，并不会同时暴露用户或未发布的内容。允许它联系一个服务，并不会开放整个网络的其他部分。这些边界由运行时强制执行，而非依赖插件作者的良好意图。

这种隔离并不局限于 Cloudflare 部署。在 Cloudflare 上，EmDash 通过 Worker Loader 将每个插件作为 Dynamic Worker 运行。在 Node.js 上，EmDash 将 workerd（开源的 Workers 运行时）作为独立进程启动，并在其中将每个插件作为隔离的服务运行。插件在两个平台上使用相同的清单和基于能力的 API。有关设置和运行时差异，请参阅插件沙盒文档。

![](data:image/bmp;base64,Qk32BAAAAAAAADYAAAAoAAAACAAAAAgAAAABABgAAAAAAMAAAAATCwAAEwsAAAAAAAAAAAAA/f379/j37u/v6+vs8fHx+Pf39fT16+rt/////P378/Pz8PDw9vb1/Pz6+fn37+/v////////+Pj39fX0+/v5///9/f379PPy/////////Pv6+Pf2/f37///////99vb1////////+/v79vX2+/v6////////9fX4////////+Pf78PDz9vb3/v7+/Pz/8vL5////////9PT56+vw8fH0+/v8+fn/7u/7////////8/L56env7+/z+fn8+Pj/7e77)![](https://blog.cloudflare.com/_image?href=https%3A%2F%2Fblog.cloudflare.com%2F_emdash%2Fapi%2Fmedia%2Ffile%2F01M3D0TA6WP04V10GX4RCHQFBV.png&w=715&h=525&f=webp&fit=cover&position=center)

Cloudflare Email Sending 是全新 EmDash 插件注册表中众多可用插件之一。

### 从单个站点到网站平台

EmDash 可以为单个 Astro 站点提供支持，但它同时也为构建网站创建和托管产品的公司而设计。

[Workers for Platforms](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/) 让这些公司能够在 Cloudflare 全球网络上以 Worker 的形式运行每个客户的站点。它们无需为每个站点配置服务器，也无需自行构建相关的网络和部署基础设施。这样它们就能专注于客户用来创建和管理网站的体验。

EmDash 为这种体验提供了内容层。平台可以直接使用管理界面，在 API 和 CLI 上构建自己的界面，或者在内置的 MCP 服务器前面放置一个 Agent。面包店老板可以通过简单的语言请求修改营业时间；平台的 Agent 会负责读取、更新和保存内容。

沙盒化的插件模型也为平台提供了一种更安全的方式，跨多个客户站点提供扩展。插件仅获得经批准的访问权限，可访问内容、媒体、用户、电子邮件或外部服务，而不是以对整个应用程序拥有无限制访问权限的方式运行。平台可以访问完整注册表来运营自己的插件市场，或者精选一组预先批准的插件。

我们一直在寻找更多的托管合作伙伴，希望与我们一同开发全新的面向 Agent 的 CMS 体验。如果您想了解更多关于使用 EmDash 进行重构的信息，[请联系我们](mailto:emdash@cloudflare.com)。

### EmDash Build：一款开源的 AI 网站构建器

我们还发布并开源了 EmDash Build 的 alpha 版本，这是一款 AI 网站构建器，托管服务商、网站构建者和平台可以自行运行并将其与自己的系统集成。立即在 [http://build.emdashcms.com/](http://build.emdashcms.com/) [build.emdashcms.com](http://build.emdashcms.com/) 试用演示，或者[探索代码](https://github.com/emdash-cms/emdash-build)。

如果今天你要为自己或客户构建一个网站，你不会从 IDE 开始。你更有可能从一个聊天框开始，向 Agent 描述你的需求。但一旦你有了初步成果，你可能会发现，修改简单的东西需要你回到那个提示框，要么碰运气看结果，要么为了一个单行修改而消耗积分。

EmDash Build 转而创建一个 EmDash 站点，它带来了完整的堆栈：服务端渲染的 Astro 页面、数据库、媒体存储以及一个管理界面。Agent 根据需求设计内容模型，通过 EmDash 的 MCP 服务器填充内容，并编写用于展示内容的页面。之后，你或你的客户可以直接在页面上编辑文本、安排帖子，或者让 Agent 为你完成这些操作。

在 EmDash Build 中，每个项目都有自己的 Cloudflare Sandbox 容器，基于 Agents SDK 构建的 Agent 会在其中验证自身的工作。Artifact 将每一次更改都记录为 git 提交。当站点发布时，内容会迁移到生产环境的 EmDash 站点，并部署到托管商的 Workers for Platforms 命名空间。

![](data:image/bmp;base64,Qk32BAAAAAAAADYAAAAoAAAACAAAAAgAAAABABgAAAAAAMAAAAATCwAAEwsAAAAAAAAAAAAABQAAHhISNC4tOzQ1Ni0yMiwyPD9BS1NTHxoVKiglOjo2QT46QTs1Rj87VVRSZWloLCwnMzYxPkM9RUc+SkU4VU1CZ2NeeHh3MDEtNTo1P0Y/Rko/TEk5WVFEbGdhfHt6KSopMDQxO0I8Qkc8SEU2Uks9YlxXcG9uFxMaIiMlMjYzOz41PTswQDkwSENAUlFSAAAADAETKCgoMjMvLy0qJB4eGhUaGhshAAAAAAAEJCAiLy0sKCYnDAYTAAAAAAAA)![](https://blog.cloudflare.com/_image?href=https%3A%2F%2Fblog.cloudflare.com%2F_emdash%2Fapi%2Fmedia%2Ffile%2F01M3D0T5MQJMXA8BDCPF96D46D.png&w=715&h=415&f=webp&fit=cover&position=center)

一个使用 EmDash Build 创建的网站：从一个提示开始，现在运行在完整堆栈上。

### 开始使用并参与其中

随着 EmDash 1.0 的发布，现在是迁移公司营销网站，或者让 Agent 快速搭建你一直谈论的副项目的好时机。[在此试用 EmDash 演示站点。](https://try.emdashcms.com/)

要在本地通过 CLI 创建新的 EmDash 站点，请运行：

```
<span class="line"><span>npm create emdash@latest</span></span>
```

或者，你也可以通过下方的 Cloudflare 仪表板完成相同操作：
[https://deploy.workers.cloudflare.com/?url=https://github.com/emdash-cms/templates/tree/main/blog-cloudflare](https://deploy.workers.cloudflare.com/?url=https://github.com/emdash-cms/templates/tree/main/blog-cloudflare)

如果你已准备好开发 EmDash 插件，[我们的文档提供了逐步指南](https://docs.emdashcms.com/plugins/creating-plugins/your-first-plugin/)，介绍如何创建插件并将其发布到注册表。

我们也欢迎你加入我们不断壮大的贡献者社区，请访问 [Discord](https://discord.gg/YY9vBaQRYt)。你不必是工程师才能参与——我们欢迎翻译人员、问题分类管理员、用户体验设计师、市场营销人员以及所有对内容管理系统未来充满热情的人。

### 相关标签
[生日周](https://blog.cloudflare.com/tag/birthday-week/)[Cloudflare Workers](https://blog.cloudflare.com/tag/workers/)[开发者](https://blog.cloudflare.com/tag/developers/)[EmDash](https://blog.cloudflare.com/tag/emdash/)[实习经历](https://blog.cloudflare.com/tag/internship-experience/)[开源](https://blog.cloudflare.com/tag/open-source/)[产品新闻](https://blog.cloudflare.com/tag/product-news/)

关注社交媒体

- ![Cloudflare](https://blog.cloudflare.com/images/placeholder__cloudflare.png)Cloudflare[https://blog.cloudflare.com/rss/](https://blog.cloudflare.com/rss/)[https://x.com/Cloudflare](https://x.com/Cloudflare)[https://www.linkedin.com/company/cloudflare-inc-](https://www.linkedin.com/company/cloudflare-inc-)[https://www.youtube.com/cloudflare](https://www.youtube.com/cloudflare)[https://instagram.com/cloudflare](https://instagram.com/cloudflare)[https://github.com/cloudflare](https://github.com/cloudflare)[https://bsky.app/profile/cloudflare.social](https://bsky.app/profile/cloudflare.social)[https://www.threads.com/@cloudflare](https://www.threads.com/@cloudflare)[https://www.tiktok.com/@cloudflare](https://www.tiktok.com/@cloudflare)
- ![Scott Buscemi](https://blog.cloudflare.com/_image?href=https%3A%2F%2Fblog.cloudflare.com%2F_emdash%2Fapi%2Fmedia%2Ffile%2F01M34Y0F0APEJCYXC3H3YPCJPZ.01M34Y0FH8QVBMSAQHS2BJF8V6.webp&w=64&h=64&f=webp&fit=cover&position=center)[Scott Buscemi](https://blog.cloudflare.com/author/scott-buscemi/)[https://www.cloudflare.com/](https://www.cloudflare.com/)
- ![Matt Kane](https://blog.cloudflare.com/_image?href=https%3A%2F%2Fblog.cloudflare.com%2F_emdash%2Fapi%2Fmedia%2Ffile%2F01KW475N68VWP3E9MWJKN27Q2B.webp&w=64&h=64&f=webp&fit=cover&position=center)[Matt Kane](https://blog.cloudflare.com/author/matt-kane/)[https://mk.gg/](https://mk.gg/)[http://linkedin.com/in/mattkane](http://linkedin.com/in/mattkane)[https://github.com/ascorbic](https://github.com/ascorbic)[https://bsky.app/profile/mk.gg](https://bsky.app/profile/mk.gg)
- ![Noah Pham](https://blog.cloudflare.com/_image?href=https%3A%2F%2Fblog.cloudflare.com%2F_emdash%2Fapi%2Fmedia%2Ffile%2F01M3D1JXK13M9EP94QXP0D1YXY.01M3D1JZCG0GRHXDJA178BGQ26.jpg&w=64&h=64&f=webp&fit=cover&position=center)[Noah Pham](https://blog.cloudflare.com/author/noah-pham/)[https://noahpham.me/](https://noahpham.me/)[https://x.com/itsNoahPham](https://x.com/itsNoahPham)[https://www.linkedin.com/in/phamtrankhoinguyen-noah/](https://www.linkedin.com/in/phamtrankhoinguyen-noah/)[https://www.youtube.com/@khoinguyen_pham](https://www.youtube.com/@khoinguyen_pham)[https://www.instagram.com/khoinguyen_pham/](https://www.instagram.com/khoinguyen_pham/)[https://github.com/khoinguyenpham04](https://github.com/khoinguyenpham04)

### 订阅以接收新文章通知
