---
title: "Neuralink 首款产品 Telepathy（心灵感应）：用意念指挥 Grok Bot 干活"
date: 2026-10-30T00:00:00.000Z
tags: ["产品动态", "Neuralink", "脑机接口", "Telepathy", "Grok", "辅助沟通", "聚合"]
summary: "工程师来到参与者家中，与语音研究参与者一起打磨 8 项改进：少按键、好改错、锁屏开口，还能把合成语音接入电话。"
---
> **原文链接**: [https://neuralink.com/updates/72-hour-voice-hackathon/](https://neuralink.com/updates/72-hour-voice-hackathon/)
> **来源**: neuralink.com
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/neuralink-72-hour-speech-hackathon/) · 2026/10/30
> **说明**: 本文由 AIHot 自动聚合(原文即中文,未翻译)。正文取自小互 AI 解读

---

全文 Markdown · 会员

作者：Neuralink10-30 · 7 分钟

> “Neuralink 的首款产品名为 Telepathy（心灵感应）。它让人仅凭思考就能与电脑或他人进行高速沟通。几年之内，它的输出带宽将大幅超过人类最快的说话或打字速度。请把这句话再读一遍。”

这是马斯克转发 Neuralink 最新开发记录时写下的话。Neuralink 研发的是植入式脑机接口（BCI）：用植入设备记录脑内的神经活动，让人通过这些信号操作电脑或与他人交流。Telepathy 是它的首款产品名称；这次展示的，是 VOICE 语音恢复临床研究中的一次实地开发。

工程师来到有言语障碍的参与者 Kenneth 家中，与他和妻子一起工作了 72 小时，改进“尝试说话 → 解码成文字 → 由设备发声”的体验。让他少按一次按钮、直接在锁屏上发起交流，乃至自己接听电话，都是这场开发要解决的具体问题。

![马斯克转发 Neuralink 语音黑客松推文截图](https://pic.xiaohu.ai/jiedu-media/neuralink-72-hour-speech-hackathon/musk-tweet-original.png)

马斯克转发 Neuralink 记录本次 72 小时开发的原帖。

“几年内超过人类最快语速或打字速度”是马斯克的预测。这次记录里已经能看到的进展，是把脑机接口接入点咖啡、写文字、打电话这些日常动作。

先看一次交流怎样发生：Kenneth 在大脑中尝试说出一句话，植入设备记录相关神经活动，解码模型把这些信号转换为文字。文字随后可以由 Bloom 手机应用合成为声音，也可以送入其他应用，或作为 AI 执行任务的指令。

从尝试说话，到对方听见或电脑行动

#### 同一段神经信号，经过不同环节

1. 01**尝试说话**参与者主动尝试说出一句话
2. 02**植入物记录信号**记录与尝试说话相关的神经活动
3. 03**检测何时说话**轻量 CNN 估计说话意图，控制解码启停
4. 04**解码为文字**把神经活动转换为要表达的文字

得到文字之后，接入具体用途 ↓

**让别人听见**

Bloom 合成语音，也可送入电话音频流。

**在 App 中写字**

通过 iOS 键盘输入文字，再按需要修改。

**让电脑做事**

把“Hey Neuralink ＋ 任务”交给 Grok Agent 执行。

检测何时说话、解码文字、执行任务分别承担不同工作。Grok 接收的是解码后的指令。

### 为什么要坐在用户身边写代码

语音脑机接口的输入信号是使用者自身的神经活动，而这些信号会随着疲劳程度、注意力以及想象说话的方式而发生变化。开始录音需要多久、修改错误是否方便、手机使用前是否需要先解锁，这些细节往往决定了一个工具是让人勉强忍受，还是愿意每天主动拿来交流。

这类真实体验很难单纯依靠远程收集的数据与分析来评估。参与开发的工程师脑内没有植入设备，无法亲身体会软件设计带来的差异与阻碍，只有参与者本人能够感知。因此，最有价值的反馈往往来自直接坐在参与者身边，观察他在哪里出现迟疑、了解哪些地方让他感到不便，并迅速做出修改。

![Neuralink 工程师在参与者 Kenneth 家中协同工作](https://pic.xiaohu.ai/jiedu-media/neuralink-72-hour-speech-hackathon/blog-kitchen-collaboration.jpg)

工程师在 Kenneth 家中共同测试与讨论。

    画面中 Kenneth 坐在轮椅上手持手机，右侧工程师手持笔记本电脑在一旁观察。

在这场为期三天的黑客松中，团队来到临床研究参与者 Kenneth 的家中。工程师观察 Kenneth 使用设备的过程，在白板上梳理想法、做出原型，并在同一场景下直接由他上手测试，不好用的方案则迅速放弃。测试中双方约定了简单的手势反馈：竖起两个大拇指代表“完美（perfect）”，竖起一个大拇指代表“还行（good）”。

在视频回顾里，工程师估计三天推进了约两到三周的工作，试了 30 多个 App 版本。这种面对面的快速迭代，让许多此前需要数周沟通的反馈回路缩短到了几个小时之内。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/neuralink-72-hour-speech-hackathon/video-overview-bilingual-9983f908a490.mp4)

72 小时现场开发的完整回顾，约 4 分 39 秒，中英双语字幕。
可以看到参与者探索神经活动反馈、测试自动检测，以及团队为独立接听电话设计音频通路的过程。

### 8 项改进怎样让交流更容易

团队在这次黑客松期间围绕日常沟通体验，尝试并推进了多项功能改进，部分功能在此后数周继续进行了迭代。以下是视频与官方博客记录的 8 项主要改进：

#### 1. 神经活动语音检测：减少按键操作

以往的语音解码需要通过按按钮来开始和停止记录说话意图。团队开发了一套自动检测系统，用于识别使用者何时尝试说话、何时没有尝试说话，从而让应用能够自主开始和停止记录。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/neuralink-72-hour-speech-hackathon/video-01-bilingual.mp4)

轻量卷积神经网络实时判断尝试发声状态。
上方显示神经活动脉冲，下方动态输出模型预测的尝试说话概率，当参与者尝试动嘴构音时活动信号明显上升。

工程师训练了一个轻量卷积神经网络（CNN），在后台实时预测使用者尝试说话的概率。演示界面上方显示采集到的神经脉冲，下方则实时显示模型预测出的概率值。当检测到说话意图时，系统便能自动触发和停止记录。减少对按键的依赖，是让言语障碍者实现免触控沟通的重要一步。

#### 2. 实时神经活动可视化：协助自主探索信号

解码模型对使用者而言有时像一个黑盒子，但模型的输入完全取决于植入设备采集到的神经信号。为了摸索哪些预期的动作或发音想象能产生更强的神经活动，团队为 Kenneth 提供了多种实时可视化界面。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/neuralink-72-hour-speech-hackathon/video-02-bilingual.mp4)

工程师向参与者展示两套实时神经数据栅格视图。
左侧以首次打开时的静态基准窗口做归一化并随时间滚动；右侧基于滚动窗口实时更新瞬时信号强度。

屏幕左侧把神经活动随时间的变化滚动展开，右侧展示各通道接近当前瞬间的强弱。为了让变化看得更清楚，两幅图都把信号与一个参考水平比较：左侧固定使用刚打开界面时采集的一屏数据，右侧的参考水平则持续滚动更新。因此，颜色明暗表示相对活动强弱，并不直接表示解码准确率。

在完整现场影片里，Kenneth 看着反馈尝试不同动作和发音方式，工程师也辨认出他动口型时的活动；团队还试了被称为“派对模式”的显示效果。有了实时视觉反馈，参与者可以自主摸索何种方式能激发出更明显的信号，而不再只是被动等待工程师调整模型。

#### 3. 电脑操作 Agent：通过指令执行任务

除了发声交流，团队还希望探索借助意念操作电脑。团队在笔记本电脑上接入了 Grok Agent 的原型功能。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/neuralink-72-hour-speech-hackathon/video-03-bilingual.mp4)

通过发声意图唤起电脑端 Grok Agent。
参与者发出“Hey Neuralink 帮我在 YouTube 找个喂养吉娃娃的视频”指令，电脑上的 Agent 自主打开浏览器并搜索相关视频。

Kenneth 在脑海中尝试说出唤醒词“Hey Neuralink”及具体需求，设备将意图解码为任务文本后，由电脑后端的 Grok Agent 自主执行操作。在现场演示中，Kenneth 让它在 YouTube 上找一个喂养吉娃娃狗的视频，电脑随后自动打开并展示了相关页面。这一步把脑机解码出的指令接到了软件操作上：参与者提出要找什么，Grok 再完成查找。

#### 4. 移动应用 Bloom：在公共场所点咖啡

在黑客松之前的几个月里，Neuralink 已经投入大量精力开发名为 Bloom 的移动应用，旨在让语音脑机接口更便于日常使用。黑客松为团队提供了观察其在实验室之外实际使用情况的机会。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/neuralink-72-hour-speech-hackathon/video-04-bilingual.mp4)

在公共场所借助 Bloom 移动应用完成饮品点单。
参与者在柜台通过脑机发声完成点单问答（点单南瓜香料拿铁并确认超大杯）。

在公开演示中，Kenneth 在公共场所使用手机上的 Bloom 点了一杯南瓜香料拿铁（pumpkin spice latte）；当对方询问杯型时，他继续通过应用回答需要超大杯（venti）。现场观察真实的使用过程，有助于团队发现实际交互中的卡点并针对性改进。

#### 5. 系统键盘集成：直接向任意应用输入文本

对于言语或肢体活动受限的人士，标准键盘和系统自带听写往往很难使用。如果脑机输入只能停留在专属应用里，用户就需要反复复制粘贴。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/neuralink-72-hour-speech-hackathon/video-keyboard-dictation-bilingual.mp4)

在备忘录中调用 Bloom 键盘进行听写。
活动中开发的键盘输入功能，录屏展示了此后数周进一步迭代后的操作界面。

团队制作了 iOS 键盘集成，直接把基于脑机接口的听写文字送入任意应用程序，减少了在不同模式或应用之间来回切换的麻烦。在黑客松后数周进一步迭代的录屏中，Kenneth 在备忘录中调出该键盘，直接输入了一句关于鸡蛋价格比超市自有品牌贵得多的文字。

#### 6. 编辑流程：缩短改错时间

解码模型难免会出现错误，改错所需的时间（time-to-edit）对输入体验至关重要，团队的目标是尽可能缩短这一时间。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/neuralink-72-hour-speech-hackathon/video-editing-flow-bilingual.mp4)

在键盘中修改已解码的文字。
活动中开发的编辑功能，录屏展示了此后数周进一步迭代后的修改界面。

团队尝试了几种将建议词与键盘结合的编辑界面，方便用户在任意应用中快速修改文本。在黑客松后数周继续迭代的演示中，使用者利用键盘将原本关于鸡蛋价格的陈述句直接改成了疑问句（将“它们比超市自有品牌贵多了”改为“它们比超市自有品牌贵很多吗”）。允许局部修改而不需要把整句话全部重新输入，大幅减少了修正文字时的操作成本。

#### 7. 锁屏实时活动：免解锁发起交流

发起对话不应该每次都要求先解锁手机并打开应用。团队利用 iOS 的实时活动（Live Activity）功能，把 Bloom 的状态与快捷入口放在锁屏界面上。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/neuralink-72-hour-speech-hackathon/video-live-activity-bilingual.mp4)

通过锁屏实时活动启动语音功能。
活动中开发的锁屏集成，录屏展示了此后数周进一步迭代后的界面；画面中仍包含点按“Tap to record”的操作。

在黑客松后继续迭代的录屏中，使用者无需解锁手机，直接在锁屏界面点击“轻触录音（Tap to record）”即可开始记录说话意图，从而减少开启交流的操作步骤。

#### 8. 电话通话集成：让语音直接进入通话

电话是日常交流的重要途径。在拍摄这段视频时，Kenneth 接听电话还需要妻子 Cheryl 的协助。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/neuralink-72-hour-speech-hackathon/video-05-bilingual.mp4)

脑机接口生成语音直接注入 iPhone 通话麦克风音频流。
参与者与妻子通过电话交流（商量晚餐吃韩餐、开玩笑说不用妻子再帮忙传话），对方能够听到清晰稳定的音频。

团队将 Bloom 生成的语音直接接入 iPhone 通话的麦克风音频流中。实现这一功能需要同时兼顾三件事：把应用生成的语音送入对方听到的音频流、让 Kenneth 本人清楚自己正在说什么，同时避免在通话中产生重复的回声。此外，团队还测试了可选的通话开场问候语（例如提示“本通电话来自辅助沟通设备使用者”）。

Kenneth 与妻子 Cheryl 当初正是通过电话建立起感情的。在通话测试中，Kenneth 通过设备对妻子说，也许以后由自己来接电话会更好，妻子也打趣说这样不用帮忙传话会轻松不少；两人还聊到挂断电话做晚饭、吃韩餐，像普通夫妻一样闲聊、逗趣。这里最有分量的变化，是让原本需要家人代为接听、传话的交流，有机会由 Kenneth 自己完成。

### 从“能说出话”到“愿意每天用”

这场为期三天的实地开发，给团队带来了两个核心体会：

一是便利性不仅取决于背后的解码算法。从减少按键、锁屏直接发起，到更方便地修改错误、把语音直接送入电话通话，每个交互环节上的细节，都在决定使用者是否愿意在日常生活中每天使用它。

二是真实使用者的参与是推动技术改进的关键。在整个过程中，Kenneth、他的妻子以及照护者都是紧密的合作者：他们开放了家庭环境，提供直率的反馈，提出实际需求，并推动工程团队不断修正方案。对工程师而言，能够亲眼看到使用者用当天做出的功能与家人交谈，也是持续推进这项工作最直接的动力。

Neuralink 设备仍处于研究阶段，尚未获得 FDA 或其他监管机构批准。本次展示的是一位自愿临床研究参与者的个人体验。

来源Neuralink：72小时语音脑机接口开发主题帖Neuralink·[查看主材料](https://x.com/neuralink/status/2115878416423784939)延伸[A 72-Hour Engineering Sprint for Translating Thought to Speech](https://neuralink.com/updates/72-hour-voice-hackathon/)·[Elon Musk：Telepathy 与未来沟通带宽](https://x.com/elonmusk/status/2116018780111597911)

原文版权归原作者，这里只供对照阅读。 [看原网页 ↗](https://neuralink.com/updates/72-hour-voice-hackathon/)

Our engineers recently visited one of our VOICE study participants for a 72-hour hackathon. This blog post highlights some of the things we built.

Neuralink's website stores data in your browser to function. If you click Accept All, we will store some additional data to improve the website by learning how visitors use it.

You can change your settings anytime by clicking the button in the main website footer.

[视频/音频](https://content.neuralink.com/videos/updates/72-hour-voice-hackathon/keyboard-dictation.mp4)

[视频/音频](https://content.neuralink.com/videos/updates/72-hour-voice-hackathon/editing-flow.mp4)

[视频/音频](https://content.neuralink.com/videos/updates/72-hour-voice-hackathon/live-activity.mp4)

Engineering October 29, 2026 6 min read A 72-Hour Engineering Sprint for Translating Thought to Speech Our engineers recently spent 72 hours with a participant in our VOICE study, at his home, for a hackathon. The goal was simple: rapidly prototype as many features as possible to improve the experience of using Neuralink to communicate with thought, and test every one of them with the end user. Why build next to the user The input to a speech brain-computer interface (BCI) is a person’s own neural activity, which varies with fatigue, attention, and the way someone imagines speaking. Small details like how long it takes to start a recording, how easy it is to fix a mistake, or whether the phone needs to be unlocked first can be the difference between a tool someone tolerates and a tool someone reaches for every day. This can be challenging to assess purely from virtually collected data and analytics, and it is not something we can simply try for ourselves. None of the engineers building this software have an implant, so we cannot feel the difference between a good design and a frustrating one; only our participants can. The highest signal often comes from sitting next to a participant, watching where they hesitate, hearing what frustrates them, and shipping a fix shortly afterwards. Working side by side with a participant compressed weeks of feedback loops into hours. Ideas went from whiteboard to prototype to real-world test in a single sitting, and the ones that did not work were discarded just as quickly. Here is some of what we built. 1. Neural voice activity detection Speech decoding used to require pressing a button to start and stop recording. We built a system that automatically detects when a user is and is not trying to speak, so the app can start and stop on its own. This is a big step towards making communication completely hands-free for people with speech impairment. 2. Real-time neural visualizations One of the hard problems in BCI is figuring out which intended or imagined actions produce the strongest neural activity, since that directly affects decoder performance. We built visualizations that give participants real-time feedback on the intensity and distribution of signals detected by the implant. Our participant used them to test different imagined speaking patterns and see which ones recruited the most activity, turning model tuning into something closer to a game. 3. A computer use agent We prototyped a way for users to trigger a Grok agent by thinking of saying “Hey Neuralink” followed by a task, which the agent then carries out autonomously on the computer. It is an early illustration of how increasing the bandwidth between the brain and computers could help close the gap between thought and action. 4. A mobile app for speech BCI Over the last few months, we have put significant effort into Bloom, our mobile app designed to make speech BCI more accessible. The hackathon was a chance to watch Bloom in daily use, outside the lab, and fix what got in the way. 5. Keyboard dictation with BCI Standard keyboards and built-in dictation can be difficult or impossible for people with ALS to use. We built an iOS keyboard integration that routes BCI-based dictation into any app, streamlining text entry and reducing the need to switch between modes. 6. A faster editing flow Decoders are not perfect, and mistakes can be awkward or costly. Driving time-to-edit toward zero is crucial for dictation. To do this, we iterated on several editing interfaces that integrate our own suggestions into the keyboard and let users quickly correct text in any app. There is still more to optimize, but the result is a dramatic improvement over the first version of Bloom. 7. Lock screen Live Activity Starting a conversation should not require unlocking a phone and opening an app. We added Bloom as a Live Activity so speech can begin right from the lock screen, with at-a-glance status and quick controls. The goal is to drive everyday communication friction toward zero. 8. Phone call integration Voice calls are an essential part of daily life. We integrated Bloom with iPhone calling so BCI-generated speech is injected directly into the call’s microphone stream, giving the person on the other end clear, consistent audio. We also tested an optional greeting at the start of calls, such as “This call is from someone using an assistive communication device.” This one meant a lot to the team. Our participant and his wife started their relationship over phone calls, and watching the two of them joke with each other on the phone again was one of the most memorable moments of the week. What we took away The features matter, but the bigger lesson is about how we work. When engineers build next to the people they are building for, priorities become clearer as they observe first-hand where the user experience shines and where it needs to be improved. And the motivation is hard to overstate: there are few things in engineering as rewarding as watching someone use something you built that morning to talk to the people they love. Our participant, along with his wife and caregiver, were integral collaborators in the process; opening up their home, giving candid feedback, suggesting ideas, and pushing the team to go further. Join us The hackathon is over, but we are just getting started. The list of things we want to improve and build keeps growing. We need exceptional engineers across machine learning, software, and many other disciplines to help shape a technology that will transform human interaction and advance human agency in an era of AI. If this resonates, visit neuralink.com/careers. *Neuralink devices are investigational and have not been approved by the FDA or other regulatory authorities. This post features a voluntary clinical trial participant sharing his personal experience, which may not reflect all participants or future outcomes.*

↑ 正文结束
✓ 本篇全文免费开放

会员可复制、下载全文 Markdown，还能让你的 AI 订阅和提问。
[订年卡 $59/年](https://xiaohu.ai/buy/?plan=year)[看权益对比 →](https://xiaohu.ai/membership/)

[阅读原文 ↗](https://neuralink.com/updates/72-hour-voice-hackathon/)

📮 新解读每晚进邮箱

读完觉得有用？留个邮箱，每晚一封当天的新解读，随时退订。
