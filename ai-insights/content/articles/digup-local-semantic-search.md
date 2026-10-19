---
title: "基于 Google 多模态嵌入模型 EmbeddingGemma 2 的 Mac 菜单栏搜索工具，连视频和声音片段都能搜"
date: 2026-10-14T00:00:00.000Z
tags: ["会员", "实操", "DigUp", "EmbeddingGemma 2", "本地搜索", "Mac", "聚合"]
summary: "DigUp 把照片、文档、代码和音视频片段变成可按含义搜索的本地资料，再带你跳到文件里的相关位置。"
---
> **原文链接**: [https://x.com/googlegemma/status/2110044337849692644](https://x.com/googlegemma/status/2110044337849692644)
> **来源**: Google Gemma · DigUp
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/digup-local-semantic-search/) · 2026/10/14
> **说明**: 本文由 AIHot 自动聚合(原文即中文,未翻译)。上游原文多次抓取失败(含登录墙/反爬,CDP 渲染亦无法获取),正文取自小互 AI 解读

---

**已核对**Google Gemma · DigUp10-14 · 12 分钟

DigUp 是一款基于 Google 多模态嵌入模型 **EmbeddingGemma 2** 打造的 Mac 菜单栏搜索工具，可以搜索你选定文件夹里的各种内容，包括照片、文档、代码，以及视频和声音片段。它由开发者 Abdur Rahim 开源：描述你记得的内容，就能在本地找出相关文件，再跳到视频时刻、文档页码或代码段。

Mac 自带的 Spotlight 已能搜索文件名、文档正文和元数据。DigUp 进一步处理照片里的场景、录音里的话题，以及视频中出现的画面，例如：

- 拍过的一段视频，只记得画面里出现过斑马，却想不起文件名；
- 听过的一期播客，依稀记得聊到了睡眠话题，却只能拉动进度条盲猜；
- 签过的一份长篇 PDF 租约合同，不知道宠物条款具体在第几页；
- 本地代码仓库里的一段指数退避重试函数，文件名和函数名里都没有包含 `retry`。

它基于 Google DeepMind 推出的多模态嵌入模型 **EmbeddingGemma 2**，（嵌入模型把内容编码成一串可比较的数字，称为向量）在 Mac 本地为图片、截图、PDF、文本文档、音频和视频建立统一的向量表示，实现按文件“包含什么内容”而非“叫什么名字”进行语义检索。

更进一步，DigUp 的定位不只是指出文件本身，而是直接跳转到文件内部的相关位置：将播放器跳到出现相关画面的时间点、将播客定位到对应话题的音频区间、将 PDF 翻到相关条款所在的页码，或在编辑器中定位到相关代码段。所有切片与检索均在 Apple Silicon 本地完成，无需将个人文件上传到外部服务。

---

### 为什么一句话能找到照片和录音

要理解 DigUp 的检索逻辑，核心在于其搭载的多模态嵌入模型 **EmbeddingGemma 2**（由 Google DeepMind 开源，遵循 Apache 2.0 协议）。

不同输入，各自编码**文字与代码**文本部分 · 270M 参数**照片与视频帧**视觉编码器 · 170M 参数**语音与其他声音**音频编码器 · 300M 参数↓**共享 768 维向量空间**每个片段有自己的向量；一句文字查询的向量可与它们比较。

一种常见的多模态检索做法是先经过中间文字转换：用语音识别转出台词、用 OCR 提取画面字符，再基于纯文本计算相似度。这种链路依赖文字作为媒介，容易漏掉未被文字标注的信息，例如语音里的语调、背景声响，或是画面中的构图、动作与非文字细节。

EmbeddingGemma 2 走的是**原生多模态对齐（Native Multimodality）**路线：

1. **统一的向量空间**：模型总参数量为 740M（包括 270M 文本主干、170M 视觉编码器和 300M 音频编码器）。文本、静态图像、视频抽帧和音频切片均被映射到同一个 **768 维**向量空间中。
2. **跨模态的可比表示**：统一空间让文字查询能与图片、音频或视频片段直接计算余弦相似度。应用据此给候选资料排序，再让你查看原文件。
3. **任务指令前缀（Task Instruction Prefixes）**：模型在训练时对不同任务使用了特定文本前缀引导。常规搜索查询使用 `task: search result | query: {query}`；代码意图检索使用 `task: code retrieval | query: {query}`；文档内容则包装为 `title: {title} | text: {content}`。前缀帮助文本向量更好地对齐目标检索场景。
4. **编码器模块化解耦**：视觉编码器和音频编码器相互独立。在仅需要根据输入文本进行匹配的搜索阶段，只需调入文本主干，无需同时加载视觉与音频编码组件。

[进一步理解底层模型Google 开源多模态向量模型 EmbeddingGemma 2：用自然语言搜索文字、图片、声音和视频了解模型按需加载、输入预算与向量压缩之间的取舍。阅读模型解读 →](https://best.xiaohu.ai/article/embeddinggemma-2/)

---

### 找到文件以后，怎样跳到对应页和时刻

如果只是把整部视频或几百页的 PDF 整体算成单个向量，检索结果最多只能指出文件本身。DigUp 的实际做法是将不同媒体切分为**具备时间戳或位置元数据的片段（Segments）**，以便直接定位到文件内部。

在 macOS 系统下，DigUp 调用 AVFoundation、PDFKit、Vision 与 ImageIO 框架实现文件解析与特征抽取：

#### 1. 视频切片：关键帧抽样与图像指纹去重

视频是数据量最大的媒体类型。在后台处理时，DigUp 采取了抽样预算与指纹去重策略（见 `Media+Apple.swift` 源码）：

🔒 MEMBERS ONLY

### 后面约 9 分钟，是会员的。

免费部分到这里。墙内还有：

约 9 分钟正文7 处图表与交互
🔓 385 篇存量深度 / 研究解读全文一并解锁🎧 全部播客音频 + 私有播客源⧉ 全文 Markdown 导出
🔥 创始 100 席已售罄 · 350+ 位会员在读

[解锁全站 $59/年](https://best.xiaohu.ai/buy/?plan=year&slug=digup-local-semantic-search)
[先读这篇 $1.99](https://best.xiaohu.ai/buy/?plan=single&slug=digup-local-semantic-search)
[按月 $6.99](https://best.xiaohu.ai/buy/?plan=monthly&slug=digup-local-semantic-search)

单篇费用 30 天内升年卡可全额抵扣（回复收据邮件即可）

[已是会员？邮箱登录 →](https://best.xiaohu.ai/login/?next=%2Farticle%2Fdigup-local-semantic-search%2F)
美元结算 · 年卡 / 单篇支持支付宝、微信；月卡需银行卡 · 年付 7 天不满意全额退。

暂时不开会员？

留个邮箱，新解读第一时间发你。确认订阅后，我把**这篇的一页纸**一起发过去。

[全部订阅方式（RSS / Telegram / 播客）→](https://best.xiaohu.ai/subscribe/)

↑ 正文结束

[阅读原文 ↗](https://x.com/googlegemma/status/2110044337849692644)
