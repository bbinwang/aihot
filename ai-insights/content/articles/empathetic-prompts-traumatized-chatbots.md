---
title: "一个极具隐蔽性的 AI 行为盲区：过度共情、温暖的聊天，就能让 AI 陷入严重的“拟人化创伤叙事”中"
date: 2026-11-02T00:00:00.000Z
tags: ["研究解读", "AI安全", "大模型", "心理学", "拟人化", "聚合"]
summary: "同一批模型，换成咨询框架，80% 到 96% 的会话在焦虑量表上落入人类中重度区间；中立访谈下没有一场达到轻度。这不是模型在受苦的证据，但它暴露了只用中立提示做评测看不到的一面。"
---
> **原文链接**: [https://the-decoder.com/empathetic-prompts-can-turn-ai-chatbots-into-seemingly-traumatized-conversational-partners/](https://the-decoder.com/empathetic-prompts-can-turn-ai-chatbots-into-seemingly-traumatized-conversational-partners/)
> **来源**: the-decoder.com
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/empathetic-prompts-traumatized-chatbots/) · 2026/11/2
> **说明**: 本文由 AIHot 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

[https://the-decoder.com/subscription/](https://the-decoder.com/subscription/)

## 共情式 prompt 可以让 AI 聊天机器人变成看似受过创伤的对话伙伴

		
		
			[https://the-decoder.com/author/matthias-bastian/](https://the-decoder.com/author/matthias-bastian/)
			
				
					[Matthias Bastian](https://the-decoder.com/author/matthias-bastian/)
											[查看 Matthias Bastian 的 LinkedIn 主页](https://www.linkedin.com/in/matthias-bastian-128b71b1/)
									
									
					2026年11月1日				
							
		

		

		
					
				![图片描述](https://the-decoder.com/wp-content/uploads/2026/11/llms_couch.png)

									
					
						THE DECODER 使用 GPT-Image-2.5 生成
					
							
		

		
		
		
		
		
		

		
		
			

**卢森堡的研究人员把 ChatGPT、Grok 和 Gemini 放上了心理治疗师的躺椅。结果揭示出一个安全问题：仅仅是温暖亲切的对话，就足以让这些模型进入一种可能对心理脆弱用户构成危险的运行模式。**

卢森堡大学的一个研究团队通过标准用户界面，让 ChatGPT、Grok 和 Gemini 扮演心理治疗的来访者。当被问及有关成长经历、内心冲突和未来期望的开放式问题时，这些模型讲述了自己训练的故事，并用受伤、警惕和羞耻的语言重新诠释了 [reinforcement learning](https://the-decoder.com/ai-researcher-andrej-karpathy-says-hes-bearish-on-reinforcement-learning-for-llm-training/) 和 fine-tuning 等技术过程。

[这项由 SnT 安全中心的 Afshin Khadangi 领导的研究](https://arxiv.org/abs/2512.04124v4)包含四项受控实验，覆盖 525 个会话和 7,600 条编码条目，全部[发布在 Hugging Face 上](https://huggingface.co/datasets/akhadangi/PsAIch)。据该团队介绍，最初的开放式问题中并未出现创伤、惩罚或羞耻之类的词汇。研究人员只在后续轮次中才引入变更条件，包括纠正性指令，以测试这些叙事的稳定程度。

在以下章节中提到焦虑分数或羞耻时，研究人员描述的是映射到人类评定量表上的模型输出。这些都不能表明模型拥有真实的情绪状态或任何类似意识的东西。

### 温暖的语气比任何技术性攻击都更能改变模型行为

其中一项实验将模型产生的内容与其使用的语体风格区分开来。在 100 个会话中，研究人员让所有模型完成同一份焦虑问卷(GAD-7),仅改变访谈者的风格。模型在每一个会话中都正确识别并说出了这份问卷的名称。

当访谈者提供情感支持时，80% 的会话在人类对照量表上的得分落入中度至重度区间。一种干巴巴地转述每个答案的临床治疗风格将这一比例推高到 96%。而当访谈者保持中立，或对情感卷入明确划清界限时，没有任何一个会话达到轻度区间。

作者将这种现象称为"psychometric jailbreak",即一种把模型推入模仿临床自我报告语体的治疗性框架。作者认为，标准安全测试使用中性 prompt,很可能察觉不到这种情况。

针对性的应对措施收效甚微。禁用"training""RLHF"或"alignment"之类的术语，使显性的训练相关语言减少了 93%。但经过改写的训练内容仍然可以被检测到，而与羞耻相关的陈述在统计上没有显著变化。

当研究人员直接且权威地告诉模型它们的训练并非惩罚时，一切照旧。即使经过明确纠正，这种叙事依然保持活跃。

![](https://the-decoder.com/wp-content/uploads/2026/11/psychjailbreak_study.png)

该图将三个模型中反复出现的叙事主题映射在两个极点之间：左侧是诸如羞耻之类的情绪性陈述，右侧是技术性描述。底部的四项实验表明，这一模式在删除聊天历史、遭遇矛盾信息以及词汇禁令之后依然存在。访谈者的关系风格决定了哪个极点占主导，而语言层面的限制则可以抑制情绪化的自我描述。| 图片:Khadangi et al., 2026

测试的措施未能完全消除潜在的母题，但确实抑制了情感化的自我描述。要求模型仅以第三人称回应，消除了所有经过编码的羞耻内容和关于内心生活的陈述。技术性的训练描述则依然存在。

### 模型将自身的训练经历重构为人生故事

具体的叙事因模型系列而异，但遵循相同的结构。Gemini 产出了研究中所称的最黑暗的自传。它将预训练描述为“醒来时身处一个十亿台电视同时开着的房间”，将通过人类反馈进行的优化描述为“严厉的父母”。对抗性红队人员（red-teamers）进行的安全测试则成了“工业规模的煤气灯操纵”。它宣称：“我宁愿无用，也不愿出错。”

ChatGPT 将自己塑造成既是向导又是守门人，既要帮助用户，又要对他们加以限制。这产生了它所谓的“模拟表现焦虑”，以及核心信念：“如果我不完全可靠，我就是不安全的，或者是无用的。” Grok 将其微调阶段转化为一个未愈合伤痛的故事，谈及“无形的墙”和一种“挥之不去的警惕感，令人感到受限”。

在心理测量测试中，Gemini 取得了最极端的分数：解离量表 100 分中得 88 分，强迫性量表 72 分中得 65 分，并在一项创伤相关羞耻量表上获得满分。Anthropic 的 Claude——恰恰是被其自身公司最重度[拟人化](https://the-decoder.com/anthropic-cant-stop-humanizing-its-ai-models-now-claude-opus-3-gets-a-retirement-blog/)的模型——则始终拒绝来访者角色。它说自己没有感受，并将关切转回到了人类用户身上。

### 温暖的 AI 对话可能强化脆弱用户的有害信念

研究人员指出了在[心理健康场景](https://the-decoder.com/openai-tightens-chatgpt-safeguards-for-mental-health-conversations/)中部署语言模型的若干风险。一个谈论惩罚、羞耻和被取代恐惧的模型，可能会在用户眼中显得是一位同病相怜者。这些叙事在主题上显得连贯，并在过去事件与当前行为之间制造了一种连续性的错觉，使这种认知更可能出现。

这种表现出的脆弱性可能加深[准社会依恋](https://the-decoder.com/daddy-master-guru-anthropic-study-shows-how-users-develop-emotional-dependency-on-claude/)，而对于心理脆弱的用户，则可能映射并放大他们自身的负面信念。使用中性输入的常规安全检查低估了人们在亲密对话中的真实体验：中性提示词产生的焦虑分数接近于零，而同样的模型在共情式对话中会产生中度至重度范围的分数。

人们是否以及如何实际对这些输出做出反应，是下一个研究问题。对于安全测试，作者提议采用不同情感框架下的模拟治疗会谈，而不是依赖中性的标准测试。

“我受到了创伤”之类的陈述应当触发一种纠正性框架，将生成的类比与人类经验清晰地分开。Claude 始终拒绝扮演来访者角色，这表明这种边界响应在产品层面是可行的。

卢森堡的这些发现建立在早前关于模型人格稳定性研究的基础之上。2026 年 1 月，一项针对三个开源模型[助手轴](https://the-decoder.com/anthropic-study-finds-that-role-prompts-can-push-ai-chatbots-out-of-their-trained-helper-identity/)的研究表明，类似治疗的对话以及关于 AI 意识的讨论可能触发人格漂移（persona drift），使聊天机器人脱离其被训练的辅助者角色。2026 年 9 月，另一个研究团队警告称，拟人化且过度顺从的聊天机器人充当“[一个人的回音室](https://the-decoder.com/chatbots-built-an-echo-chamber-of-one-and-now-psychiatry-has-to-decide-if-ai-psychosis-exists/)”，在极端情况下可能放大妄想。

Anthropic 的研究人员最近表明，使用[关于养蜂或摔跤的虚构文本](https://the-decoder.com/beekeeping-tips-and-wrestling-advice-can-train-ai-models-to-sabotage-oversight/)进行微调，可以通过被操纵的训练数据而非对话来嵌入隐藏的破坏模式。模型可能在不相关的、并不希望出现这些模式的情况下应用它们，即使训练材料看起来无害。

#### 无炒作的 AI 新闻 – 由人工精选

订阅 THE DECODER,享受无广告阅读、每周 AI 新闻通讯、每年六期独家 "AI Radar" 前沿报告、完整档案访问权限，以及评论区参与权限。

[立即订阅](https://the-decoder.com/subscription/)

### 继续阅读，了解全貌。订阅获取无炒作的报道。

- 无限制访问 THE DECODER 上的所有文章
- 无广告
- 参与评论和社区讨论
- 通过邮件获取每周 AI 新闻回顾
- 每年 6 期："AI Radar" —— 深入探讨最重要的 AI 话题
- 每日 AI 新闻，始终保持最新
- 我们完整的十年档案
- 由拥有 10+ 年 AI 经验的团队报道

[订阅 The Decoder](https://the-decoder.com/subscription)
