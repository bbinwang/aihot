---
title: "OpenAI 发布全天候个人Agent ：Dot  主动跟进你的目标 可以同时管理你的工作和家庭事物"
date: 2026-09-30T00:00:00.000Z
tags: ["洞察", "OpenAI", "Dot", "Agent", "ChatGPT", "聚合"]
summary: "Dot 能持续留意已授权应用里的变化，在云端电脑处理任务，并同时跟进多个目标；重要动作仍由你批准。"
---
> **原文链接**: [https://openai.com/zh-Hans-CN/index/introducing-dots/](https://openai.com/zh-Hans-CN/index/introducing-dots/)
> **来源**: OpenAI
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/openai-dots/) · 2026/9/30
> **说明**: 本文由 AIHot 自动聚合(原文即中文,未翻译)。上游原文抓取失败,正文取自小互 AI 解读

---

OpenAI 发布了 Dot，一款全天候跟进目标的个人 Agent。它不只是等你提问的聊天工具：你交代目标、连接相关应用后，它能在你离开聊天窗口时继续留意进展，发现需要处理的事，再把结果或待批准的动作带回来。官方演示里，Dot 同时跟进工作项目和家庭安排。

它主要做四件事：

- **主动发现后续工作**：留意已授权应用里的变化，例如客户反馈再次出现，或一项安排有了变动。
- **自己动手准备结果**：在独立的云端电脑里查资料、操作浏览器、写代码和运行测试，不只给你一段建议。
- **同时跟进多个目标**：保留不同项目的进度；你换到 ChatGPT、Slack 或 Teams，也能接着谈同一件事。
- **把关键决定留给你**：发送消息、购买、永久删除等动作需要批准；你能查看进度，也能暂停它。

下面分开看：它怎么发现任务、能把工作推进到哪一步，以及把权限交给它之前需要知道什么。

### 它和 ChatGPT 最大的不同：谁先发现工作

用普通 ChatGPT 聊天时，通常得先由你发现问题，再把材料和要求发进去。Dot 接到一个持续任务后，会留意已授权应用里的变化。例如客户又报了同一个 bug，它可以先查问题、准备修复，把 PR 交给你审；你不必每次重新开一个对话，让它从头理解项目。

OpenAI 举了一个早期测试者的例子：他忘记给一家出版机构开发票，Dot 发现漏项、准备发票，等他批准后才发出。查漏和准备工作交给了 Dot，最后的决定仍由人来做。

OpenAI 把后台寻找线索叫作“主动研究”。这一步使用只读工具：能查看已连接应用里的信息，不能发消息、改内容，也不能控制你的电脑。查到问题之后要动手处理，还得经过相应的应用权限和动作规则。

它要持续跟进任务，至少得记住三件事：

- **目标状态**：这个项目要做到什么、现在卡在哪里、下一步是什么。
- **个人标准**：你偏好的表达方式、判断习惯，以及什么样的结果才算“做得好”。
- **工作状态**：哪些文件、应用和任务发生了变化，哪些动作已经完成，哪些仍等你批准。

宣传片把工作和生活剪在了一起：Dot 更新网站、董事会材料和代码，也处理婚礼蛋糕、课后班和家庭日程。用户仍在改方向、审结果、批准关键动作。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/openai-dots/dots-promo-bilingual-f5c1280d.mp4)

OpenAI 的 Dot 宣传片，小互制作中英双语字幕版。视频展示的是产品设想，并非实际使用测试。

### Dot 靠什么把任务继续做下去

Dot 由 GPT-6 Astra 驱动。它有自己的云端电脑和浏览器，需要时能写代码、运行测试。你可以打开那台电脑查看它做到哪一步；本机访问默认关闭，只有在桌面应用里明确授权，它才能使用你电脑上的文件和浏览器。

它还能连接应用。OpenAI 称插件生态覆盖 4,000 多款应用，但你仍要逐个选择连接什么、给什么权限。连接以后，Dot 可以从这些应用获取项目背景；在 ChatGPT、Slack 或 Teams 里继续同一项工作时，也不用重新交代一遍。它可以同时保留多个项目的进度，等你回来再接着做。

[视频/音频](https://best.xiaohu.ai/media/openai-dots/dots-codex.mp4)

官方演示：左侧是对话和项目材料，右侧是 Dot 操作的云端浏览器。

### 一处发生变化，其他材料也得跟着改

OpenAI 展示了五种工作。它们有一个共同点：事情变了，相关材料也要跟着改，人却常常漏掉其中一处。

开发者收到反复出现的客户反馈，Dot 会界定问题、修复和测试，再交出 PR 和演示视频供人审查。产品发布临时改了范围，它会检查哪些文案、素材和文档需要重做，并准备草稿。

科研数据出现意外结果，它会重新分析、改图表和解释，标出需要研究者复核的地方。销售客户改了需求，它会核查文档、测试集成，更新提案和未决问题。内容创作者改了剪辑意见，它会把修改带到节目笔记和社交帖草稿里。价值在于：你改动一件事，它能帮你找出还得跟着改的那些东西。

![粉色 Dot 发现 iOS beta 清单在部署后从侧栏消失，修复后交给用户合并前审查](https://best.xiaohu.ai/media/openai-dots/dots-feedback.webp)

开发场景：Dot 发现界面回归并准备修复，但是否合并仍由人决定。

![蓝色 Dot 根据产品页面变化准备两套邮件与社交素材方案](https://best.xiaohu.ai/media/openai-dots/dots-launch.webp)

发布场景：需求改变后，Dot 保留既有视觉标准并给出两个方案供审阅。

![绿色 Dot 根据重复试验更新图表、研究结论和待发送邮件](https://best.xiaohu.ai/media/openai-dots/dots-analysis.webp)

科研场景：第一批结果没有复现，Dot 同步更新图表、解释和下一步建议，而不是继续沿用旧结论。

![黄色 Dot 在客户席位变化后更新提案金额，并列出 SSO、安全评审和商业条款三个待办](https://best.xiaohu.ai/media/openai-dots/dots-proposal.webp)

销售场景：数字变化会联动提案，但安全评审、商业条款和客户承诺仍保留明确负责人。

![紫色 Dot 根据创作者反馈缩短帖子文案并保留原照片](https://best.xiaohu.ai/media/openai-dots/dots-content.webp)

内容场景：一次反馈会同步到相关材料；正式发布没有在演示中自动发生。

这些场景说明 OpenAI 希望 Dot 接手哪类工作。它们还没有回答另一个问题：任务一多、情况一变，Dot 能有多稳定，出了错又要花多少时间收拾。

### 换个地方说话，事情还能接着做吗

Dot 能主动汇报进度或找你做决定。官方的短信演示里，它根据日历和菜单提出晚餐方案，连价格、税费和小费都算好了，却明确说还没下单，等用户确认后才继续。这件事从日历开始，在短信里完成决定，中途不用重新解释背景。

[视频/音频](https://best.xiaohu.ai/media/openai-dots/dots-channels.mp4)

官方短信演示：Dot 补全晚餐方案和费用估算，并把真正下单留到用户确认之后。

各渠道的开放程度不同。ChatGPT 电脑端可以创建 Dot，设置好之后才能在移动应用里使用；手机网页暂不支持。短信目前是美国 Pro 用户的限量测试，会经过第三方服务商，Business 和 Enterprise 工作空间不能用。Dot 也还不能主动给你打电话。[OpenAI 帮助中心](https://help.openai.com/en/articles/20001530-getting-started-with-your-dot)列出了这些条件。

### 它能看到什么，什么时候必须问你

Dot 会接触应用里的信息，也可能操作浏览器或写代码。OpenAI 为此设置了几道控制：

| 层级 | 它解决什么问题 | 你能看到或决定什么 |
| --- | --- | --- |
| 隔离环境 | 避免默认接触你的本机与全部文件 | Dot 先在独立云端电脑工作；连接个人设备需要你选择 |
| 应用权限 | 限制它能读写哪些系统 | 你选择应用和权限；受支持的密码由系统管理，不直接暴露给模型 |
| 行动规则 | 区分可自动做、需批准和禁止的事 | 可设自定义规则，但核心安全要求不能关闭 |
| AutoReview | 在动作真正发生前再检查一次 | 系统对照权限、安全规则和对话指令，决定继续、请示或交回给人 |

官方安全视频举了几个例子：新购买、永久删除数据、向他人发送消息等动作要请求批准；修改密码要由用户亲自完成。你可以在活动视图里看它做过什么、正在做什么，也可以暂停工作。

[视频/音频](https://best.xiaohu.ai/media/openai-dots/dots-safety.mp4)

OpenAI 的 Dot 安全说明，依次解释模型红队测试、独立虚拟电脑、沙箱、权限、活动视图、自定义规则与 AutoReview。

这些控制也有实际使用上的麻烦。比如你断开一个应用，Dot 已经从中获取的信息不会随之删除；[帮助中心](https://help.openai.com/en/articles/20001530-getting-started-with-your-dot)说，清除 Dot 自己保存的记忆需要重置整个 Dot，连对话和定时任务也会一起删除。因此，接入邮箱、文件或客户系统之前，要先想清楚它能读哪些内容。OpenAI 也提醒，重要结果仍要由人检查。

Dot 发布前一天，OpenAI 暂停了 GPT-6.1 Astra 的推出；[CBS 报道](https://www.cbsnews.com/news/sam-altman-openai-dots-chatgpt-agents-safety/)提到范围与授权方面的安全问题。Dot 当前使用的是 GPT-6 Astra，不是这款被暂停的模型。两件事不能混为一谈，但也提醒我们：让 Agent 代人行动时，权限边界得经得起实际使用。

### 数据是否训练模型，要看套餐和数据流向

Business、Enterprise 和 Edu 工作空间的内容，默认不用于改进模型。个人套餐用户则可以控制 Dot 对话和工作内容是否用于训练。

主动研究内容和 Dot 自己记的笔记不会直接用于训练；如果这些信息后来进入符合训练条件的对话或任务，则仍可能按你的数据设置使用。Dot 还会读取 ChatGPT 已有记忆，并从已连接应用形成自己的记忆。想撤回这部分记录，单纯断开应用不够。

企业版还有“专职 Dot”试点：它代表一个岗位工作，有自己的身份、凭据和系统访问权限。OpenAI 目前只与少量企业一起确定职责、工具和人工审核方式；与微软 Agent 365 的治理控制集成也还在推进。

### 现在能不能用，取决于市场、套餐和额度

目前要在电脑上的 ChatGPT 创建 Dot，开通会分批到达账户。[OpenAI 帮助中心](https://help.openai.com/en/articles/20001530-getting-started-with-your-dot)写明：Pro 用户的首批开放地区排除欧洲经济区、瑞士和英国；Business Premium 覆盖其支持的 ChatGPT 地区；Enterprise 的测试版默认关闭，需管理员启用。Pro 和 Business Premium 套餐都包含第一个 Dot。

用量最容易看错。帮助中心说，首月符合条件用户的 Dot 用量暂不计入套餐额度，之后各套餐的规则会另行公布；[发布公告](https://openai.com/zh-Hans-CN/index/introducing-dots/)同时说，Dot 发起或管理的 Codex、ChatGPT 工作任务仍按对应产品的额度计算。两份说明针对的用量对象不同。现阶段别把“包含一个 Dot”理解成所有任务都无限量，也别根据首月体验推断长期成本。

宣传片很流畅，[Axios 的现场报道](https://www.axios.com/2026/09/29/openai-dots-ai-assistant-devday)则记录了语音呼叫 Dot 时的一次明显延迟。一次卡顿说明不了长期表现，但足以提醒人：眼下看到的宣传片和你自己实际能用到的产品之间，还有分批开放和现场体验这两层距离。

普通用户目前从一个 Dot 开始。多个 Dot 组队是 OpenAI 提出的后续方向，尚未开放。

### 值不值得把工作交给它

发票漏开、客户反复报 bug、数据变了却忘记改图表，这些事单件不难，难在没人一直记着。Dot 的吸引力就在这里：有人替你盯住变化，把需要处理的事送到你面前，或先做出一版供你审查。

但是否真能省时间，要看它在你的任务里会不会漏看、误改，以及你得花多少精力检查结果。现在适合先给它范围清楚、结果容易核对的工作；接入更多应用或让它碰对外承诺之前，再看实际表现和权限记录。判断时问四个具体问题就够了：**它能读什么？能改什么？哪些动作必须问我？出了错我到哪里查？**

来源隆重推出 DotOpenAI·2026-09-29·[查看主材料](https://openai.com/zh-Hans-CN/index/introducing-dots/)延伸[Altman unveils ‘always-on’ AI agent after OpenAI shelves model over safety concerns](https://apnews.com/article/sam-altman-openai-conference-dots-agent-77b6b8888145869206996d7509d24256)·[OpenAI launches dots AI assistant to take on Meta's Muse](https://www.axios.com/2026/09/29/openai-dots-ai-assistant-devday)·[Sam Altman unveils ‘dots,’ OpenAI's new AI personal agent](https://www.cbsnews.com/news/sam-altman-openai-dots-chatgpt-agents-safety/)·[Getting started with your dot](https://help.openai.com/en/articles/20001530-getting-started-with-your-dot)
