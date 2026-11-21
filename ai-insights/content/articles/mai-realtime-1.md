---
title: "微软发布 MAI Realtime 1 语音模型：每分钟 0.01 美元起，口头推理准确率 98.9%"
date: 2026-11-18T00:00:00.000Z
tags: ["产品发布", "微软", "MAI Realtime 1", "语音模型", "语音 Agent", "实时语音"]
summary: "同一套口头推理题，它比 GPT-Realtime-2.1 High 答得准，折算到每小时的成本却只有对方的约八分之一。"
---
> **原文链接**: [https://microsoft.ai/news/introducing-mai-realtime-1/](https://microsoft.ai/news/introducing-mai-realtime-1/)
> **来源**: microsoft.ai
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/mai-realtime-1/) · 2026/11/18
> **说明**: 本文由 AIHot汪 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

![](https://microsoft.ai/wp-content/uploads/2026/11/Realtime-1-No-text.jpg)
            
        
    

    
        [返回新闻](https://microsoft.ai/blog/)
        
            
                分享            
            
                
                    

### 分享此文章

                    
                
                

- [LinkedIn (在新标签页中打开)](https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fmicrosoft.ai%2Fnews%2Fintroducing-mai-realtime-1%2F)
- [X (在新标签页中打开)](https://x.com/intent/tweet?text=MAI%20Realtime%201%3A%20Leading%20voice%20AI%20at%20%240.01%20per%20audio%20minute&url=https%3A%2F%2Fmicrosoft.ai%2Fnews%2Fintroducing-mai-realtime-1%2F)
- [Facebook (在新标签页中打开)](https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fmicrosoft.ai%2Fnews%2Fintroducing-mai-realtime-1%2F)

                
                    文章链接                
                
                
                
            
        
        
        
            

        
    
      
      
        

MAI Realtime 1 是我们的首款语音到语音模型，专为现实世界中的企业应用设计，支持自然流畅的对话，起步价为 **$0.01/音频分钟**[1](https://microsoft.ai/news/introducing-mai-realtime-1/#fn-1)。

在公共基准测试和微软产品评估中，我们的模型在质量、速度和价格方面均优于 GPT Realtime 2.1。它在 Big Bench Audio 语音推理以及 Tau-Voice 智能体任务完成基准测试中，均处于性能-价格帕累托前沿[2](https://microsoft.ai/news/introducing-mai-realtime-1/#fn-2)。

      

      
    

    
                    
                                
            
        
            

        
    
      
      
        

### 自然对话，高效执行

打造人们真正愿意交谈的语音智能体，不仅仅需要良好的声音。它需要对话、智能和行动三者的恰当结合，并同时进行。MAI Realtime 1 通过以下能力实现这一目标：

- **自然对话：** MAI Realtime 1 能够处理插话，遵循快速确认，并知道何时等待对方说完

- **自适应智能：** 快速响应的系统保持对话实时流动。当任务需要更深层次的思考时，它会调用更强大的推理引擎，提供深思熟虑的答案，避免尴尬的停顿

- **强大的理解力：** 即使在背景噪音或其他人说话的情况下，它也能识别请求

- **现实世界的行动：** 它处理复杂请求并连接企业系统和工具，使语音智能体不仅能回答问题，还能执行更多操作

- **可适配的人设：** 通过提示调整语气、风格和行为，以适应不同的客户、领域和使用场景

      

      
    

    
                    
                                
            
        
            

        
    
      
      
              

      
    

        
    
      
      
              

      
    

        
    
      
      
              

      
    

        
    
      
      
        

MAI Realtime 1 还与 OpenAI Realtime API 兼容，使开发人员能够轻松测试模型并迁移现有的语音应用。

      

      
    

        
    
      
      
        

### 准备就绪，面向现实世界应用

Agoda 和 Reservations.ai 等公司已经在测试 MAI Realtime 1。

我们还将 MAI Realtime 1 引入 Dynamics 365 Contact Center，用于客户服务应用，并引入 Dragon Copilot，以支持 AI 模拟患者对话，帮助护士练习临床互动。

      

      
    

        
    
      
      
        

### 开始使用

在 [MAI Labs](https://labs.microsoft.ai/?model=mai-realtime-1) 中试用 MAI Realtime 1，或注册 [Foundry](https://azure.microsoft.com/en-us/products/ai-foundry) 的有限访问预览。预览客户在公开预览开始之前不会产生费用。

[注册兴趣](https://forms.cloud.microsoft/r/AQcVUgqpZZ)

**关于这些结果**

*结果反映了特定的评估配置和工作负载。性能、延迟和成本比较因应用和方法而异。*

1. **定价：** 基础语音到语音使用费用为每分钟 0.01 美元。推理费用单独计算，输入 token 为每百万 1 美元，输出 token 为每百万 5 美元。
2. **竞争性性能：** MAI Realtime 1 使用包括 Big Bench Audio 和 τ-Voice 在内的公开基准，以及 Dynamics 365 Contact Center 评估，与 GPT Realtime 2.1 进行了对比评估。

### 相关故事

[https://microsoft.ai/news/microsoft-ignite-2026/](https://microsoft.ai/news/microsoft-ignite-2026/)

#### 七款具备可扩展性价比的世界级模型

2026 年 11 月 17 日

![](https://microsoft.ai/wp-content/uploads/2026/11/All-Up-Blog.jpg)

[https://microsoft.ai/news/introducing-mai-image-2-5-pro-and-mai-voice-2-flash/](https://microsoft.ai/news/introducing-mai-image-2-5-pro-and-mai-voice-2-flash/)

#### 推出 MAI Image 2.5 Pro 和 MAI Voice 2 Flash

2026 年 7 月 23 日

![两个重叠的水彩对话气泡，一个粉色，一个绿色，中间交汇处画有一朵花，背景为浅色。](https://microsoft.ai/wp-content/uploads/2026/07/Voice_Image_Blog_Illustration_v6-1.png)

[https://microsoft.ai/news/mai-transcribe-2-is-the-fastest-most-accurate-and-cheapest-speech-recognition-model-in-the-world/](https://microsoft.ai/news/mai-transcribe-2-is-the-fastest-most-accurate-and-cheapest-speech-recognition-model-in-the-world/)

#### MAI Transcribe 2 是全球最快、最准确且最便宜的语音识别模型

2026 年 9 月 3 日

![抽象图像，带有水平的绿色、黄色和粉色色带，营造出日落时分模糊的风景或海景的感觉，整体呈现柔和、朦胧和渐变效果。](https://microsoft.ai/wp-content/uploads/2026/09/Transcribe-2_Final_No_Text.webp)

[https://microsoft.ai/news/ode-poetry-mai/](https://microsoft.ai/news/ode-poetry-mai/)

#### 利用 MAI 的音频模型让《颂歌》诗歌栩栩如生

2026 年 7 月 9 日

![一群人站在日落时分的草坡悬崖上，鸟儿在上方飞翔；场景由水下视角框定，展示了水泡和涟漪。](https://microsoft.ai/wp-content/uploads/2026/07/Ode-Poetry-Thumb-Mobile-Friendly.jpg)
