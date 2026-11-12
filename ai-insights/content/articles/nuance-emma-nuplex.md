---
title: "Nuance Labs 发布 Emma实时数字人：你还没说完，AI 已经用表情回应你"
date: 2026-11-10T00:00:00.000Z
tags: ["产品发布", "数字人", "实时交互", "多模态", "全双工", "聚合"]
summary: "Nuplex 怎样把点头、目光和接话时机放进实时视频对话？结合完整主题帖、官方研究图与演示，讲清 Emma 的自然感从哪里来。"
---
> **原文链接**: [https://home.nuancelabs.ai/research/meet-emma-the-first-nuplex-persona](https://home.nuancelabs.ai/research/meet-emma-the-first-nuplex-persona)
> **来源**: home.nuancelabs.ai
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/nuance-emma-nuplex/) · 2026/11/10
> **说明**: 本文由 AIHot汪 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

#### 认识 Emma，Nuplex 的首位人格

#### 认识 Emma，Nuplex 的首位人格

Nuance Labs

2026 年 11 月 9 日

经过 18 个月的研究，我们打造了 Emma——一个你真正愿意面对面交流的 AI 人格。她基于 Nuplex 1.0 构建，这是我们的全双工音视频基础模型。

今天就可以通过 [emma.nuancelabs.ai](https://emma.nuancelabs.ai/) 认识她，或者通过我们的 Nuplex Beta API 在 [platform.nuancelabs.ai](https://platform.nuancelabs.ai/) 上进行开发。
![](https://i.ytimg.com/vi_webp/XYa4RH1BwuY/sddefault.webp)

### Emma 的不同之处

#### 面对面流畅的对话

Emma 用她的面部表情与你交流，而不仅仅是声音。

目前没有任何现有基准测试能准确衡量面对面互动的自然度，因此我们将 Emma 的表现与真人之间的交流方式进行了对比测量。

以下是我们在开发过程中关注的一些示例。

回复延迟（Reply latency）是每个人都在衡量的指标，但仅凭这一项很难得出结论。下图中的全双工系统在该指标上呈现出分散分布。像 PersonaPlex 和 Moshi 这样的开源模型经过调优，旨在快速回答并最大化现有基准测试的得分。而 GPT-Live 和 Gemini Live 等产品则响应较慢，这很可能是为了避免打断用户。Nuplex 则介于两者之间。快或慢是产品决策，而非分数，因此我们提出了一个不同的问题：真人何时回复？在我们自己录制的 1,785 个真实对话问题中，Nuplex 的回复时机与原始说话人的重叠率高达 89%。下一个最接近的系统仅为 35%。

![显示回复占比的图表](https://framerusercontent.com/images/en2pGx6jxWB5gPZd4uaYySK2sEA.webp?width=2048&height=1152)

在来自真实对话的 1,785 个问题中，每个系统的节奏与真人的匹配程度：每个系统开始回复的时间，与原始对话中真人回答的时间相比。阴影区域表示 Nuplex 的时机与人类时机重叠的部分。GPT-Live 和 Gemini Live 是通过其公共 API 访问的，因此其计时包含了网络时间。

回复延迟是每个人都在衡量的指标，但仅凭这一项很难得出结论。下图中的全双工系统在该指标上呈现出分散分布。像 PersonaPlex 和 Moshi 这样的开源模型经过调优，旨在快速回答并最大化现有基准测试的得分。而 GPT-Live 和 Gemini Live 等产品则响应较慢，这很可能是为了避免打断用户。Nuplex 则介于两者之间。快或慢是产品决策，而非分数，因此我们提出了一个不同的问题：真人何时回复？在我们自己录制的 1,785 个真实对话问题中，Nuplex 的回复时机与原始说话人的重叠率高达 89%。下一个最接近的系统仅为 35%。

![显示回复占比的图表](https://framerusercontent.com/images/en2pGx6jxWB5gPZd4uaYySK2sEA.webp?width=2048&height=1152)

在来自真实对话的 1,785 个问题中，每个系统的节奏与真人的匹配程度：每个系统开始回复的时间，与原始对话中真人回答的时间相比。阴影区域表示 Nuplex 的时机与人类时机重叠的部分。GPT-Live 和 Gemini Live 是通过其公共 API 访问的，因此其计时包含了网络时间。

这些指标表明，Emma 的对话流利用了她的视觉线索，这使她与该领域的先前产品有所不同。然而，我们认为 AV 全双工领域的基准测试尚未准确反映用户体验。

你不必只听我们说。只需 [认识 Emma](https://emma.nuancelabs.ai/) 即可。

#### 一张脸和一种让人感觉像真人的个性。

Emma 的很多工作涉及前沿机器学习：更多的数据、更多的算力，以及实时运行她的运行时基础设施。但 Emma 不仅仅是一个机器学习模型。Emma 的不同之处还来自于另一种类型的工作，更接近心理学和语言学，以及设计和表演，而非机器学习。这是我们的研究人员、创意团队以及贡献了人格形象和声音的真实人物之间的协作。细微之处必须被察觉，有目的地精心打造，设计到其中，并进行后训练。

###### 自然情感

让专业演员演绎同一种情绪，结果往往千差万别 (Le Mau et al. 2021)。AI 生成的面部表情则呈现出一种“原型化”的表达：相比真实的摆拍照片，它更容易被识别，且情感强度更高 (Kramer et al. 2026)。将多人的面部特征平均化，得到的是一种平淡无奇的结果；若以标签为导向进行优化，得到的则像卡通人物。这两种结果都不像真实的人。

Emma 的声音和面部形象源自一位真实的女演员，她与我们合作，捕捉了她实际倾听、反应和说话时的瞬间。Emma 的情感和举止旨在反映特定角色的特征，而非训练数据的平均值或概括。对比实时 AI 生成的面部（左）和 Emma（右），你将看到其中的差异。

[视频/音频](https://framerusercontent.com/assets/oHjSB8pdJH8KhJuP9f8IR5ZYdU.mp4)

原型

[视频/音频](https://framerusercontent.com/assets/rGWbF1biD7AQZGAhJBW3y0gpoO8.mp4)

Emma

[视频/音频](https://framerusercontent.com/assets/oHjSB8pdJH8KhJuP9f8IR5ZYdU.mp4)

原型

[视频/音频](https://framerusercontent.com/assets/rGWbF1biD7AQZGAhJBW3y0gpoO8.mp4)

Emma

Emma 充满了属于她的小习惯：为了强调而延长的眨眼、眯眼、游移后又回神的目光、因情感强烈而难以抑制时的轻微跳跃，以及随着话语内容摆动的头部。
![](https://framerusercontent.com/images/vYcuRT1rxGjiTqTOW34vu2P98.gif?width=960&height=580)

除了逼真的外貌和声音，Emma 还拥有人格刻意塑造的性格。她充满好奇心，机智敏捷，有自己的观点，甚至会与你意见相左，同时坦诚自己是 AI。大多数 AI 都过度顺从：它们重复你说的话，加以赞美，得出一个整洁的道德结论，并以一个问题结束，因为这些模型训练所用的偏好数据奖励那些与提问者意见一致的回答 (Sharma et al. 2024)。Emma 则不同，同时保持独特的连贯性：一张脸、一个声音、一种性情。

[视频/音频](https://framerusercontent.com/assets/fO5gj2v58moSvzpaXANS5dcoI.mp4)

[视频/音频](https://framerusercontent.com/assets/jydG00Qjs1fUSyuIIBchDC9Mg.mp4)

你无法仅凭一张照片通过零样本（zero-shot）方式塑造出一个引人入胜的角色。正是这种精心设计、一致性和独特的细微差别，让你感觉是在与*某个人*交谈，而不是随便谁。

### 我们如何确保安全性

如此富有表现力的技术需要限制。最早与 Emma 交流的人告诉了我们两件事，往往是在同一句话里：这太棒了，但也有些令人不安。我们对此都高度重视。我们不构建什么与构建什么同样重要，因此我们谨慎地推出 Nuplex。
![](https://i.ytimg.com/vi_webp/u2yy0BKtuKY/sddefault.webp)

作为起点，Emma 和 Nuplex Beta API 都故意设置了限制（甚至令人恼火）：

- **你永远知道自己是在与 AI 交谈。** Emma 从不声称自己是人类，我们的其他角色也是如此。我们拒绝试图让角色扮演人类，或将其伪装成真实公司或个人的开发者提示，并通过 API 提供的视频带有可见的水印。
- **禁止克隆。** Nuplex Beta API 无法克隆真实人物，我们的团队在没有你明确许可的情况下也不会这样做。你不能上传面部或声音，而我们构建的自定义面部只能由创建它的组织使用。
- **禁止色情内容，禁止 AI 男友或女友。**
- **某些领域目前仍不开放。** 医疗保健及涉及 18 岁以下人群（包括教育）的领域需要更高的标准，因此它们不在测试版范围内。若希望朝着这些标准迈进，请联系 enterprise@nuancelabs.ai。
- **发布前经过测试。** 我们针对顺从性、操纵性和情感依赖等已发布的基准测试对 Emma 进行了测试。
- **我们如何坚守底线。** 每次对话开始前，都会筛查所有开发者提示。在通话过程中，如果用户表现出严重暴力的意图、使用侮辱性或仇恨言论、提及色情内容，或在镜头前展示武器或血腥画面，自动化检查将终止通话。角色的自身言论也会受到检查：如果它索要密码、银行卡信息、金钱或设备的远程访问权限，通话将立即结束。对于看似处于危机中的人，我们会引导其寻求帮助，如自杀与危机生命线（Suicide & Crisis Lifeline），而不是直接挂断。重复违规者将暂停新对话。Emma 和 Nuplex Beta API 仅限成年人（18 岁以上）使用。所有使用均受我们的[服务条款](https://app.nuancelabs.ai/terms)和[可接受使用政策](https://app.nuancelabs.ai/acceptable-use)约束。

这些检查可能会遗漏一些问题，并且有时会错误地终止正常的通话。如果您遇到上述任一情况，请通过 [safety@nuancelabs.ai](mailto:safety@nuancelabs.ai) 告诉我们。

### Emma 目前尚无法做到的事情

Emma 是迈向自然对话的一大步，但她仍无法完全达到人类交谈的水平。

- **她可能会犯错。** Emma 的推理基于语言模型，因此她可能会自信地犯错。她可能仍然会数错 “seventeen” 中的 e 或 “strawberry” 中的 r。
- **对话动态很难处理。** 她可能会在你还在思考中途时插话，等待时间过长，或者错过人类能察觉的线索。句子中间的长停顿是最难处理的情况。
- **目前仅限英语。**
- **噪音会干扰体验。** 背景人声、电视、免提模式或麦克风信号弱都会使对话轮转变得更糟。使用耳机肯定会有所帮助。
- **流式视觉理解仍处于早期阶段。** 开启摄像头后，Emma 可以描述她看到的内容，但她有时会遗漏细节或误读场景。
- **视觉瑕疵。** 口型同步、眼神交流和头部运动偶尔看起来不自然，尤其是在连接质量较差时，而且她的表情可能会在对话中途恢复为中性。
- **她不会唱歌 :)**

### 使用 Nuplex Beta API 进行开发

我们还发布了 Nuplex Beta API，包含几种不同的人格。使用您自己的提示词（prompt）来设定人格，实时跟踪对话，并让它在后台将更长的任务交给您的工具处理，同时继续与用户交谈。目前该 API 有意进行了限制，更多人格和使用场景将很快推出。请访问 [platform.nuancelabs.ai](https://platform.nuancelabs.ai/) 开始使用。

对于企业客户，我们也可根据安排定制定制人格，但仅在使用了某人的面孔或声音时获得该人的明确许可方可进行。请联系 [enterprise@nuancelabs.ai](mailto:enterprise@nuancelabs.ai)。

### 常见问题解答

**“Nuplex” 代表什么？** Nuance Full-duplex（诺亚全双工）：一个同时监听和说话实时机器学习系统。

**Emma 是真人吗？** 不，Emma 是人工智能。她的面孔和声音授权自一位我们很荣幸能合作的杰出女演员。

**我需要账户才能与 Emma 交谈吗？** 不需要。

**Emma 和 Nuplex Beta API 在哪些地区可用？** 美国（除科罗拉多州、康涅狄格州、伊利诺伊州和德克萨斯州外）；欧盟；英国；以及加拿大（除魁北克省外）。

**我可以使用自己的语言模型吗？** Nuplex 兼容任何语言模型，但在 Beta 版本中我们提供自己的模型。在 Beta 版本中，您可以通过提示词调整人格，并且您的工具可以调用您喜欢的任何模型或服务。

**我可以使用自己的声音或面孔吗？** 这不是自助服务。定制面孔需通过安排获得，且仅在使用了某人的面孔时获得该人的明确许可方可进行。

### 参考文献

我们要感谢那些塑造了我们对话观念的研究人员。

1. Kramer, R. S. S., Javorková, N., & Clark, P. R. (2026). [AI-generated face images of emotional expressions](https://doi.org/10.1007/s10919-026-00517-3). *Journal of Nonverbal Behavior*, 50(3), 379–395.
2. Le Mau, T., Hoemann, K., Lyons, S. H., Fugate, J. M. B., Brown, E. N., Gendron, M., & Barrett, L. F. (2021). [Professional actors demonstrate variability, not stereotypical expressions, when portraying emotional states in photographs](https://doi.org/10.1038/s41467-021-25352-6). *Nature Communications*, 12, 5037.
3. Poppe, R., Truong, K. P., & Heylen, D. (2011). [Backchannels: Quantity, type and timing matters](https://doi.org/10.1007/978-3-642-23974-8_25). In *Intelligent Virtual Agents (IVA 2011)*, Lecture Notes in Computer Science, 228–239. Springer.
4. Reece, A., Cooney, G., Bull, P., Chung, C., Dawson, B., Fitzpatrick, C., Glazer, T., Knox, D., Liebscher, A., & Marin, S. (2023). [The CANDOR corpus: Insights from a large multimodal dataset of naturalistic conversation](https://doi.org/10.1126/sciadv.adf3197). *Science Advances*, 9(13), eadf3197.
5. Sharma, M., Tong, M., Korbak, T., Duvenaud, D., et al. (2024). [Towards understanding sycophancy in language models](https://arxiv.org/abs/2310.13548). *International Conference on Learning Representations (ICLR 2024)*.

情绪面板中的对比片段由 [Tavus](https://www.tavus.io/)、[LemonSlice](https://lemonslice.com/) 和 [Keyframe Labs](https://keyframelabs.com/) 的公开产品制作而成，这些团队从不同角度攻克同一难题。

### 引用

请引用本作品：

Nuance Labs, "Meet Emma, the First Nuplex Persona", Nuance Labs, November 2026.

或使用以下 BibTeX 引用：
BibTeX

```
@article{nuancelabs2026nuplex,
  author = {Nuance Labs},
  title = {Meet Emma, the First Nuplex Persona},
  journal = {Nuance Labs},
  year = {2026},
  month = {November},
  note = {http://research.nuancelabs.ai/},
}
```

经过 18 个月的研究，我们打造了 Emma，一个你真正想面对面交流的 AI 人格。她基于 Nuplex 1.0 构建，这是我们全双工音视频基础模型。

今天就在 [emma.nuancelabs.ai](https://emma.nuancelabs.ai/) 与她见面，或通过 [platform.nuancelabs.ai](https://platform.nuancelabs.ai/) 使用我们的 Nuplex Beta API 进行开发。
![](https://i.ytimg.com/vi_webp/XYa4RH1BwuY/sddefault.webp)

### Emma 的独特之处

#### 面对面的流畅对话

Emma 用她的面部表情与你交流，而不仅仅是声音。

现有的基准测试无法正确衡量面对面互动的自然度，因此我们将 Emma 与真人之间的交谈方式进行了对比。

以下是我们在开发过程中关注的一些示例。

回复延迟是每个人都在衡量的指标，但单独来看并不能说明太多问题。下图中的全双工系统沿此指标分布。像 PersonaPlex 和 Moshi 这样的开源模型经过调优，旨在快速回答并最大化现有基准分数。像 GPT-Live 和 Gemini Live 这样的产品选项耗时更长，这很可能是因为它们不想打断用户。Nuplex 介于两者之间。更快或更慢是产品决策，而非分数，因此我们提出了另一个问题：人何时回复？在我们自己录制的 1,785 个真实对话问题中，Nuplex 的回复时机与原说话者重叠的时间占比为 89%。下一个最接近的系统仅为 35%。

![显示回复比例的图表](https://framerusercontent.com/images/en2pGx6jxWB5gPZd4uaYySK2sEA.webp?width=2048&height=1152)

每个系统的节奏与人的节奏匹配程度，基于来自真实对话的 1,785 个问题：每个系统开始回复的时间，与原对话中人的回答时间相比。阴影区域表示 Nuplex 的时机与人类重叠的部分。GPT-Live 和 Gemini Live 是通过其公共 API 访问的，因此它们的计时包括网络时间。

这些指标表明，Emma 的对话流利用了她的视觉线索，这使她与此空间中的先前产品不同。然而，我们认为 AV 全双工领域的基准测试目前还不能准确反映用户体验。

你不必相信我们的说法。只需 [见见 Emma](https://emma.nuancelabs.ai/)。

#### 让人感觉像真人的面孔和个性。

Emma 的许多工作属于前沿机器学习：更多数据、更多算力，以及实时运行她的运行时基础设施。但 Emma 不仅仅是一个 ML 模型。让 Emma 与众不同的也来自另一种工作，更接近心理学和语言学，以及设计和表演，而非机器学习。这是我们的研究人员、创意团队以及贡献我们人格肖像和声音的真实人员之间的合作。细微之处必须被察觉，有目的地精心打造，设计进去，并进行后训练。

###### 自然的情感

要求专业演员表现相同的情感，你会得到很大的差异 (Le Mau et al. 2021)。AI 生成的面部则产生一种典型表情：比真实摆拍照片更容易标记且强度更高 (Kramer et al. 2026)。平均许多人，你会得到一种平淡的效果。针对标签进行优化，你会得到卡通效果。两者看起来都不像真人。

Emma 的声音和面部来自一位真实的女演员，她与我们合作，捕捉她实际倾听、反应和说话的时刻。Emma 的情感和举止旨在反映特定角色的特征，而不是训练数据的平均值或概括。当你比较实时 AI 生成的面部（左）和 Emma（右）时，你会看到差异。

[视频/音频](https://framerusercontent.com/assets/oHjSB8pdJH8KhJuP9f8IR5ZYdU.mp4)

原型

[视频/音频](https://framerusercontent.com/assets/rGWbF1biD7AQZGAhJBW3y0gpoO8.mp4)

Emma

Emma 充满了属于她的小习惯：为了强调而长时间眨眼、眯起眼睛、眼神游移后又回到焦点、在情绪强烈到无法抑制时微微跳动，以及随着说话内容而摆动的头部。
![](https://framerusercontent.com/images/vYcuRT1rxGjiTqTOW34vu2P98.gif?width=960&height=580)

除了外貌和声音，Emma 还拥有人格上精心设计的特质。她充满好奇心且机智敏捷，有自己的观点，甚至会与你意见相左，同时坦诚地表明自己是 AI。大多数 AI 往往过分顺从：它们重复你说的话，加以赞美，得出一个整洁的道德结论，并以一个问题结束，因为这些模型训练所用的偏好数据奖励那些与提问者意见一致的回答（Sharma 等人，2024）。Emma 与众不同，同时保持独特的一致性：一张面孔，一个声音，一种性情。

[视频/音频](https://framerusercontent.com/assets/fO5gj2v58moSvzpaXANS5dcoI.mp4)

[视频/音频](https://framerusercontent.com/assets/jydG00Qjs1fUSyuIIBchDC9Mg.mp4)

你无法仅凭一张照片就零样本（zero-shot）生成一个引人入胜的角色。正是这种精心设计、一致性和独特的细微差别，让你感觉是在与*某人*交谈，而不是与泛泛之辈对话。

### 我们如何确保安全

如此富有表现力的技术需要限制。最早与 Emma 交谈的人告诉了我们两件事，往往是在同一句话里：这太棒了，而且有点令人不安。我们对此都高度重视。我们不构建什么与构建什么同样重要，因此我们正在谨慎地推出 Nuplex。
![](https://i.ytimg.com/vi_webp/u2yy0BKtuKY/sddefault.webp)

作为起点，Emma 和 Nuplex Beta API 都故意设置了限制（甚至有点烦人）：

- **你始终知道自己是在与 AI 交谈。** Emma 从不声称自己是人类，我们的其他角色也是如此。我们拒绝试图让角色扮演人类，或将其伪装成真实公司或个人的开发者提示，并通过 API 提供的视频带有可见的水印。
- **禁止克隆。** Nuplex Beta API 无法克隆真实人物，我们的团队在没有你明确许可的情况下也不会这样做。你不能上传面部或声音，而我们构建的自定义面孔只能由创建它的组织使用。
- **禁止色情内容，禁止 AI 男女朋友。**
- **某些领域目前仍不开放。** 医疗保健和任何涉及 18 岁以下人群（包括教育）的领域需要更高的标准，因此它们不在测试版中。若要朝这些标准迈进？请联系 enterprise@nuancelabs.ai。
- **发布前经过测试。** 我们针对顺从性、操纵和情感依赖的公开基准测试了 Emma。
- **我们如何坚守底线。** 每个开发者提示在对话开始前都会经过筛选。在通话过程中，如果用户表现出严重暴力的意图、使用辱骂或仇恨言论、提出色情内容，或在镜头前展示武器或血腥画面，自动化检查会终止通话。角色自身的言论也会受到检查：如果它索要密码、银行卡信息、金钱或设备的远程访问权限，通话将立即结束。对于似乎处于危机中的人，我们会引导其寻求援助（如自杀与危机生命线），而不是直接挂断。重复违规者将暂停新对话。Emma 和 Nuplex Beta API 仅限成年人（18 岁以上）使用。所有使用均受我们的[服务条款](https://app.nuancelabs.ai/terms)和[可接受使用政策](https://app.nuancelabs.ai/acceptable-use)约束。

这些检查可能会遗漏一些情况，有时也会终止原本正常的通话。如果发生上述任何一种情况，请通过 [safety@nuancelabs.ai](mailto:safety@nuancelabs.ai) 告诉我们。

### Emma 目前无法做到的事

Emma 是迈向自然对话的一大步，但她仍未能达到人们彼此交谈的水平。

- **她会犯错。** Emma 的推理能力来自语言模型，因此她可能会自信地犯错。她可能仍然会数错“seventeen”中的 e 或“strawberry”中的 r。
- **对话动态很难把握。** 她可能会在你还在思考中途时插话，等待时间过长，或错过人类能察觉的线索。长停顿在句子中间是最难处理的情况。
- **目前仅限英语。**
- **噪音会干扰。** 背景人声、电视、免提模式或麦克风信号弱都会使轮流对话变得更糟。使用耳机肯定会有所帮助。
- **流式视觉理解仍处于早期阶段。** 开启摄像头时，Emma 可以谈论她看到的内容，但她有时会忽略细节并误读场景。
- **视觉故障。** 口型同步、视线和头部运动偶尔看起来不对劲，尤其是在连接不佳时，她的表情在对话中途可能会恢复为中性。
- **她不会唱歌 :)**

### 使用 Nuplex Beta API

我们同时发布了 Nuplex Beta API，包含多种不同的人格（Persona）。使用你自己的提示词（Prompt）设定一个角色，实时观察对话过程，并让它在后台将耗时任务交给你的工具处理，同时继续与用户交谈。目前该功能仍有限制，更多角色和使用场景将很快推出。请访问 [platform.nuancelabs.ai](https://platform.nuancelabs.ai/) 开始体验。

针对企业客户，我们也提供定制角色服务，但仅在获得相关肖像或声音授权者明确许可的前提下进行。请联系 [enterprise@nuancelabs.ai](mailto:enterprise@nuancelabs.ai)。

### 常见问题解答

**“Nuplex” 代表什么？** Nuance Full-duplex：一种实时机器学习系统，能够同时倾听和说话。

**Emma 是真人吗？** 不是，Emma 是人工智能。她的面部形象和声音是从一位我们很荣幸合作的杰出女演员处获得授权的。

**我需要账户才能与 Emma 对话吗？** 不需要。

**Emma 和 Nuplex Beta API 在哪些地区可用？** 美国（除科罗拉多州、康涅狄格州、伊利诺伊州和德克萨斯州外）；欧盟；英国；以及加拿大（除魁北克省外）。

**我可以使用自己的语言模型吗？** Nuplex 兼容任何语言模型，但在 Beta 阶段我们提供自己的模型。在 Beta 阶段，你可以通过提示词调整角色，且你的工具可以调用你喜欢的任何模型或服务。

**我可以使用自己的声音或面部形象吗？** 这不支持自助服务。定制面部形象需通过协商安排，且仅在获得该面部形象所有者明确许可的情况下提供。

### 参考文献

我们感谢那些塑造了我们对话观念的研究人员。

1. Kramer, R. S. S., Javorková, N., & Clark, P. R. (2026). [AI-generated face images of emotional expressions](https://doi.org/10.1007/s10919-026-00517-3). *Journal of Nonverbal Behavior*, 50(3), 379–395.
2. Le Mau, T., Hoemann, K., Lyons, S. H., Fugate, J. M. B., Brown, E. N., Gendron, M., & Barrett, L. F. (2021). [Professional actors demonstrate variability, not stereotypical expressions, when portraying emotional states in photographs](https://doi.org/10.1038/s41467-021-25352-6). *Nature Communications*, 12, 5037.
3. Poppe, R., Truong, K. P., & Heylen, D. (2011). [Backchannels: Quantity, type and timing matters](https://doi.org/10.1007/978-3-642-23974-8_25). In *Intelligent Virtual Agents (IVA 2011)*, Lecture Notes in Computer Science, 228–239. Springer.
4. Reece, A., Cooney, G., Bull, P., Chung, C., Dawson, B., Fitzpatrick, C., Glazer, T., Knox, D., Liebscher, A., & Marin, S. (2023). [The CANDOR corpus: Insights from a large multimodal dataset of naturalistic conversation](https://doi.org/10.1126/sciadv.adf3197). *Science Advances*, 9(13), eadf3197.
5. Sharma, M., Tong, M., Korbak, T., Duvenaud, D., et al. (2024). [Towards understanding sycophancy in language models](https://arxiv.org/abs/2310.13548). *International Conference on Learning Representations (ICLR 2024)*.

情感面板中的对比片段使用了 [Tavus](https://www.tavus.io/)、[LemonSlice](https://lemonslice.com/) 和 [Keyframe Labs](https://keyframelabs.com/) 的公开产品，这些团队正从不同角度攻克同一难题。

### 引用

请引用本作品如下：

Nuance Labs, "Meet Emma, the First Nuplex Persona", Nuance Labs, November 2026.

或使用以下 BibTeX 引用：
BibTeX

```
@article{nuancelabs2026nuplex,
  author = {Nuance Labs},
  title = {Meet Emma, the First Nuplex Persona},
  journal = {Nuance Labs},
  year = {2026},
  month = {November},
  note = {http://research.nuancelabs.ai/},
}
```
![](https://framerusercontent.com/images/KUyMHuibzlLcQxuCtchW5wJjOs.jpg?width=2880&height=2322)![](https://framerusercontent.com/images/G98H99zfovZJ8hA9FENsyrkAaDA.png?width=128&height=128)

#### 加入我们，共同构建人工智能的情感层
[Meet Emma](https://emma.nuancelabs.ai/)[Get the API](https://platform.nuancelabs.ai/)[https://home.nuancelabs.ai/](https://home.nuancelabs.ai/)

###### 关于

###### 研究

###### API

###### 联系我们

###### 新闻稿

###### 职业机会
[https://www.linkedin.com/company/nuance-labs-ai/](https://www.linkedin.com/company/nuance-labs-ai/)[https://x.com/nuance_ai](https://x.com/nuance_ai)

###### 华盛顿州西雅图

© 2025–2026 Nuance Labs. 保留所有权利。
![](https://framerusercontent.com/images/KUyMHuibzlLcQxuCtchW5wJjOs.jpg?width=2880&height=2322)![](https://framerusercontent.com/images/7vtDGy45q6qs1jerDkU161fn3E.png?width=108&height=128)

#### 加入我们，构建人工智能的情感层
[认识 Emma](https://emma.nuancelabs.ai/)[获取 API](https://platform.nuancelabs.ai/)[https://home.nuancelabs.ai/](https://home.nuancelabs.ai/)

###### 关于我们

###### 研究

###### API

###### 联系我们

###### 新闻稿

###### 职业机会
[https://www.linkedin.com/company/nuance-labs-ai/](https://www.linkedin.com/company/nuance-labs-ai/)[https://x.com/nuance_ai](https://x.com/nuance_ai)

###### 华盛顿州西雅图

© 2025–2026 Nuance Labs. 保留所有权利。
![](https://framerusercontent.com/images/KUyMHuibzlLcQxuCtchW5wJjOs.jpg?width=2880&height=2322)![](https://framerusercontent.com/images/G98H99zfovZJ8hA9FENsyrkAaDA.png?width=128&height=128)

#### 加入我们，构建人工智能的情感层
[认识 Emma](https://emma.nuancelabs.ai/)[获取 API](https://platform.nuancelabs.ai/)[https://home.nuancelabs.ai/](https://home.nuancelabs.ai/)

###### 关于我们

###### 研究

###### API

###### 联系我们

###### 新闻稿

###### 职业机会
[https://www.linkedin.com/company/nuance-labs-ai/](https://www.linkedin.com/company/nuance-labs-ai/)[https://x.com/nuance_ai](https://x.com/nuance_ai)

###### 华盛顿州西雅图

© 2025–2026 Nuance Labs. 保留所有权利。
