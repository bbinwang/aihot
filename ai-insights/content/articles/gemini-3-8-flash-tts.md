---
title: "Google 发布 Gemini 3.8 Flash TTS语音模型 让你像导演一样逐行指导配音"
date: 2026-09-24T00:00:00.000Z
tags: ["产品发布", "Gemini", "Google", "语音合成", "TTS", "声音克隆", "聚合"]
summary: "新的文字转语音模型支持用描述设计声音、用短录音复刻声音，并用剧本标记控制语气、叹气、笑声和对方插话。本文讲清两款模型的区别、脚本写法、评测里的领先与落后，以及在哪能用。"
---
> **原文链接**: [https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-text-to-speech/](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-text-to-speech/)
> **来源**: Google
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/gemini-3-8-flash-tts/) · 2026/9/24
> **说明**: 本文由 AIHot 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

## Gemini 3.8 text-to-speech 问好啦

2026年9月23日

- [x.com](https://twitter.com/intent/tweet?text=Gemini%203.8%20text-to-speech%20says%20hello%20%40google&url=https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-text-to-speech/)
- [Facebook](https://www.facebook.com/sharer/sharer.php?caption=Gemini%203.8%20text-to-speech%20says%20hello&u=https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-text-to-speech/)
- [LinkedIn](https://www.linkedin.com/shareArticle?mini=true&url=https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-text-to-speech/&title=Gemini%203.8%20text-to-speech%20says%20hello)
- [邮件](mailto:?subject=Gemini%203.8%20text-to-speech%20says%20hello&body=Check%20out%20this%20article%20on%20the%20Keyword:%0A%0AGemini%203.8%20text-to-speech%20says%20hello%0A%0AGemini%203.8%20Flash-Lite%20TTS%20and%20Gemini%203.8%20Flash%20TTS%20are%20our%20most%20expressive%20audio%20models%20yet.%0A%0Ahttps://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-text-to-speech/)

Gemini 3.8 Flash TTS 和 Gemini 3.8 Flash-Lite TTS 是我们迄今为止最具表现力的音频生成模型。你可以在 Google AI Studio、Gemini API、Gemini Enterprise、Gemini Notebook 和 Google Vids 中生成自定义角色语音，并执导场景对话。

---

Leland Rechis

集团产品经理

Alan Cowen

研究科学总监，谨代表 Gemini 音频团队

分享

- [x.com](https://twitter.com/intent/tweet?text=Gemini%203.8%20text-to-speech%20says%20hello%20%40google&url=https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-text-to-speech/)
- [Facebook](https://www.facebook.com/sharer/sharer.php?caption=Gemini%203.8%20text-to-speech%20says%20hello&u=https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-text-to-speech/)
- [LinkedIn](https://www.linkedin.com/shareArticle?mini=true&url=https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-text-to-speech/&title=Gemini%203.8%20text-to-speech%20says%20hello)
- [邮件](mailto:?subject=Gemini%203.8%20text-to-speech%20says%20hello&body=Check%20out%20this%20article%20on%20the%20Keyword:%0A%0AGemini%203.8%20text-to-speech%20says%20hello%0A%0AGemini%203.8%20Flash-Lite%20TTS%20and%20Gemini%203.8%20Flash%20TTS%20are%20our%20most%20expressive%20audio%20models%20yet.%0A%0Ahttps://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-text-to-speech/)

---

![一张文字卡片图片，上面写着“隆重推出 Gemini 3.8 Flash TTS 和 3.8 Flash-Lite TTS"](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/gemini-audio__keyword__metacard__.width-200.format-webp.webp)

---

- 查看《Gemini 3.8 text-to-speech 问好啦》，了解我们的新模型是如何工作的。
- 通过简单的自然语言提示词，从零开始创建自定义语音，或复刻现有语音。
- 逐行执导你的音频，掌控节奏、情感，甚至逼真的对话音效。
- 将这些模型用于大规模生成高质量的有声书、播客或实时语音 Agent。
- 我们内置了水印等安全工具，保障你生成音频的安全。

摘要由 Google AI 生成。生成式 AI 处于实验阶段。Google 刚刚推出了全新 AI 工具，让你可以从零开始创建和定制逼真的声音。你可以对这些声音进行“导演式”的调控，让它们完全按照你的设想发声，从口音到情感语调皆可掌控。它非常适合制作听起来像真人交谈的有声书、游戏或播客。此外，Google 还加入了安全功能，确保这些声音得到负责任的使用。

            
            
              摘要由 Google AI 生成。生成式 AI 处于实验阶段。#### 探索其他风格：今天，我们为 Gemini 家族推出两款全新的 text-to-speech 模型，将语音生成从静态预设转变为动态创意工作室。这些模型让创作者、开发者和企业能够打造更丰富、更具表现力的音频体验，同时改进 [Gemini Notebook](https://notebook.google.com/) 和 [Google Vids](http://vids.new/) 等产品中的用户体验。

- **Gemini 3.8 Flash TTS:** 专为深度创意指导和角色设计而构建。使用自然语言 prompt 从零开始创造全新的声音，让角色在游戏、沉浸式有声书、播客和互动媒体中栩栩如生。可逐行指导每一段表演，并对表演提示、节奏、方言转换和 backchanneling 进行精细控制。
- **Gemini 3.8 Flash-Lite TTS:** 专为大规模、高性价比的应用场景而构建。针对大批量配音、音频内容创作和富有表现力的语音 Agent 进行优化，可对语气、节奏和表达上的细微差别进行精细控制。

这些模型是对我们快速壮大的 Gemini Audio 家族的补充，继 [3.5 Live Translate](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-live-3-5-translate/)、[3.5 Transcribe](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5-transcribe/)、[3.8 Live 与 3.8 Live Extended Thinking](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-live-gemini-3-8-live-extended-thinking/) 之后推出。

### 创建并定制你自己的声音

  

  

  
    
  
    

  

  

  
    

  
    

从 30 个原始声音扩展到无限的语音库。无论你需要的是完全原创的角色声音，还是始终如一的品牌代言人，我们的 3.8 Flash TTS 模型都能提供一个完整的语音工作室。这让你能够为每个场景创建并使用富有表现力、自然逼真的声音，同时助力开发者和企业轻松构建定制化的音频体验。

- **生成式语音设计：** 借助 Gemini 3.8 Flash TTS，你可以使用自然语言 prompt 来定制角色、口音和声音特征，在超过 100 种语言和方言中从零开始打造定制化声音——无论是让一条气势磅礴、口喷烈焰的巨龙活灵活现，还是塑造一位带有鲜明地域韵律、魅力十足的叙述者。

  

  

  
    

  
    
      
        

  
    

  

  

  
    
      
        

        
          
            

听听 Gemini 3.8 Flash TTS 如何生成来自墨尔本、活力四射的 DJ 声音。

          
        

        
      
    
  

      
        

  
    

  

  

  
    
      
        

        
          
            

听听 Gemini 3.8 Flash TTS 如何生成极其单薄尖细、语调单一的机器人声音。

          
        

        
      
    
  

      
        

  
    

  

  

  
    
      
        

        
          
            

听听 Gemini 3.8 Flash TTS 如何让一条日本龙活灵活现。

          
        

        
      
    
  

      
    

    
      
        
      
    
  

  

  
    

  
    

- **丰富的语音库：** 提供 2,000+ 个可直接投入生产的声音，语言覆盖广泛——包括墨西哥西班牙语、魁北克法语和苏格兰英语等地域变体。
- **声音复刻：** 只需 30 秒的音频样本(你本人的声音，或你拥有使用授权的声音)，即可重建一致的声纹特征，并由内置的同意验证、SynthID 水印和 C2PA 凭证作为保障，同时保护开发者及其配音人才双方。
- **保存与扩展：** 保存并管理你设计的自定义声音，确保在持续进行的项目中保持一致的表演效果，并最大限度减少声音漂移。
- **声音混音：** 即将推出，你可以从我们的语音库中挑选一个声音，并微调其音色、音高、语速和口音。使用 prompt 来精细调校声音特征(例如“添加轻微的美国南方口音”或“让表达更柔和”)。

### 逐行执导语音表演

选好声音后，两款 TTS 模型都能让你精确掌控每一句台词的表达方式。

- **逐行执导表演：** 你可以撰写自己的舞台指示，也可以让 Gemini 通过自然的剧本提示来引导语音表达——从沉稳的客服 Agent,到低声耳语的悬疑场景。

  

  

  
    

  
    
      
        


  
    

  

  

  
    
      
        

        
          
            

听听 Gemini 3.8 Flash TTS 如何为交互式语音 Agent 带来自然且极富表现力的对话。

          
        
      
    
  

      
        

  
    

  

  

  
    
      
        

        
          
            

观看并聆听 Gemini 3.8 Flash TTS 如何运用精细的剧本控制，打造深度沉浸、引人入胜的音频体验。

          
        
      
    
  

      
    

    
      
        
      
    
  

  

  
    

  
    

- **长文本生成：** 在数小时的连续音频中保持高语音质量、自然的节奏和角色音色，几乎不会出现说话人漂移(speaker drift)——非常适合播客和有声书。
- **原生双说话人场景编排：** 仅凭一份剧本即可流畅执导多轮对话——无论是播客还是戏剧化叙事——同时让两个声音清晰区分，并呈现自然的对话轮替。
- **剧本化发声与附和：** 使用非语言提示(如 <laughs>、<sigh>、<gasp> )以及倾听附和语(如 |mhm| 或 |yeah|),为对话增添真实的质感，精准把控喜剧时机与反应节拍。

  

  

  
    

  
    
      
        


  
    

  

  

  
    
      
        

        
          
            

*看看 Gemini 3.8 Flash TTS 如何从零开始，把自然语言提示塑造成定制化的语音人设。*

          
        
      
    
  

      
        

  
    

  

  

  
    
      
        

        
          
            

*观看 Gemini 3.8 Flash TTS 如何让创作者设计自定义场景，让动画对白栩栩如生。*

          
        
      
    
  

      
        

  
    

  

  

  
    
      
        

        
          
            

*看看 Gemini 3.8 Flash TTS 如何把剧本变成完整的对白表演场景，让创作者执导语音表达与自然的对话轮替。*

          
        
      
    
  

      
    

    
      
        
      
    
  

  

  
    

  
    

### 获取为全球规模打造、富有表现力的高质量语音生成

Gemini 3.8 Flash TTS 提供领先的语音定制能力，在 [Hume AI](https://www.hume.ai/rw-voice-eq) 的 Voice Design Benchmark(71.4)上斩获综合排名第一，并在口音建模(accent modeling)方面同样领先(60.8)。

Gemini 3.8 Flash TTS 和 Gemini 3.8 Flash-Lite TTS 在不牺牲可靠性的情况下实现了真正富有表现力的语音表演，并在 Hume AI 的 Overall Quality Index 上分别斩获第一和第二。与 Gemini 3.1 Flash TTS 相比，该模型在长文本内容、双说话人剧本控制等广泛用例上均有显著提升。

在 [Voice Arena](https://voicearena.com/tts-leaderboard/us-english)) 的盲测人类偏好评估中，Gemini 3.8 Flash 和 Flash-Lite TTS 在多个关键全球语言中位居竞品前列，包括日语、巴西葡萄牙语、越南语、现代标准阿拉伯语(MSA)、墨西哥西班牙语和印地语。凭借对超过 100 种语言的支持，这些模型助力创作者、开发者和企业在全球范围内构建高质量的多语言语音体验。

  

  

  
    

  
    
      
        


  
  
  

  
    
      ![展示 Hume AI 文本转语音质量基准的评估图表](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/blog-gemini-3.8-flash-tts__evals_.width-100.format-webp_21WnKg9.webp)
    
  

  

  

      
        

  
    

  
  
  

  
    
      ![展示 Hume AI 文本转语音语音设计排行榜的评估图表](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/blog-gemini-3.8-flash-tts__evals_.width-100.format-webp_tbi15co.webp)

![展示 Voice Arena 文本转语音排行榜的评估图表](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/blog-gemini-3.8-flash-tts__evals_.width-100.format-webp_47W1vK6.webp)

### 以信任、授权和透明为核心构建

我们在构建语音创建与复刻功能时采用了严格的安全保障措施，以帮助保护配音演员的权益、尊重个人身份并确保内容透明。在语音复刻方面，我们的系统采用了授权验证机制：用户必须提供语音所有者的口头授权录音，且该录音需与参考说话人相匹配，才能创建语音。

更广泛地说，我们的 Gemini Audio 模型生成的每个音频片段都带有 [SynthID](https://deepmind.google/models/synthid/) 水印。这种难以察觉的水印直接融入音频输出中，确保 AI 生成的语音仍可被检测，从而帮助防范错误信息传播。有关我们在安全与责任方面做法的更多详情，请查阅[模型卡](https://deepmind.google/models/model-cards/gemini-3-8-audio/)。

### 试用我们全新的 Google AI Studio audio playground

从今天开始，开发者可以在 [Google AI Studio](https://aistudio.google.com/generate-speech?model=gemini-3.8-flash-tts) 中体验这些全新的[语音生成](https://aistudio.google.com/docs/speech-generation)功能。它就像一个语音设计工作区，你可以通过提示词从零创建全新的声音形象，或复刻你自己的声音

[1](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-text-to-speech/#footnote-1)

，然后将其直接引入双说话人剧本编辑器中，逐行指导台词的演绎方式。

在 Google AI Studio 中试用语音复刻功能。

### 轻松部署高性能语音接口

借助 Gemini API,[Agora](http://docs.agora.io/en/ai/models/tts/gemini)、[LiveKit](https://docs.livekit.io/agents/models/tts/gemini/)、[Pipecat](https://docs.pipecat.ai/api-reference/server/services/tts/google#geminittsservice)、[Vercel](https://vercel.com/docs/ai-gateway/modalities/text-to-speech) 等开发者平台使开发者能够轻松构建和部署高性能的语音生成体验。

我们正在与 Figma、HeyGen、Linguana、Wondercraft、99.co 和 Ollang 等公司合作，这些公司正在集成我们最新的 TTS 模型，以帮助加速全球配音、通过细腻的地方口音实现媒体本地化，并大规模驱动对话式语音 Agent。

![来自 99 Group 首席执行官兼联合创始人 Darius Cheung 的引言](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/gemini-audio__testimonial-99-grou.width-100.format-webp.webp)

![来自 Agora 开发者布道师 Mason Adams 的引言](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/gemini-audio__testimonial-agora__.width-100.format-webp.webp)

![来自 Figma Weave 产品总监 Jonathan Gur-Zeev 的引言](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/gemini-audio__testimonial-figma-w.width-100.format-webp.webp)

![来自 Hygen 工程副总裁 Bin Liu 的引言](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/gemini-audio__testimonial-heygen_.width-100.format-webp.webp)

![来自 katsuyo 开发者 Luke Pane 的引言卡片](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/gemini-audio__testimonial-katsuyo.width-100.format-webp.webp)

![来自 kuku AI/ML 副总监 Ritwik Baranwal 的评价。](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/gemini-audio__testimonial-kuku-FM.width-100.format-webp.webp)

![来自 linguana 联合创始人兼 CTO Oded Shafran 的评价](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/gemini-audio__testimonial-linguan.width-100.format-webp.webp)

![Ollang CTO 兼联合创始人 Aziz Ulak](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/gemini-audio__testimonial-olang__.width-100.format-webp.webp)

![来自 Spoken 创始人兼 CEO Phil Marshall 的评价](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/gemini-audio__testimonial-spoken_.width-100.format-webp.webp)

![来自 Transforms.AI 联合创始人兼 CEO Zina Rahman 的评价](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/gemini-audio__testimonial-transit.width-100.format-webp.webp)

![来自 Wondercraft CTO Mei Ki Yiu 的评价](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/gemini-audio__testimonial-wonderc.width-100.format-webp.webp)

### 立即开始使用我们最新的 Gemini Audio 模型：

Gemini 3.8 Flash TTS 即日起推出：

- **面向开发者**：可在 [Gemini API](https://aistudio.google.com/docs/speech-generation) 和 [Google AI Studio](https://aistudio.google.com/generate-speech?model=gemini-3.8-flash-tts) 中使用
- **面向企业**：即将通过 API 在 [Gemini Enterprise](https://docs.cloud.google.com/gemini-enterprise-agent-platform) 中推出
- **面向所有人**：在 [Gemini Notebook](https://notebook.google.com/) 中使用。

Gemini 3.8 Flash-Lite TTS 即日起推出：

- **面向开发者**：可在 [Gemini API](https://aistudio.google.com/docs/speech-generation) 和 [Google AI Studio](https://aistudio.google.com/generate-speech?model=gemini-3.8-flash-lite-tts) 中使用
- **面向企业**：即将通过 API 在 [Gemini Enterprise](https://docs.cloud.google.com/gemini-enterprise-agent-platform) 中推出
- **面向所有人**：在 [Google Vids](http://vids.new/) 中使用

### 在您的收件箱中获取 Google 最新资讯

订阅我们的新闻通讯，获取产品更新、活动信息、特别优惠等更多内容。

完成。还差最后一步。

请查看您的收件箱以确认订阅。

您也可以通过以下方式订阅。

您的信息将按照 [Google 隐私政策](https://policies.google.com/privacy) 进行使用。您可以随时选择退订。

发布于：
