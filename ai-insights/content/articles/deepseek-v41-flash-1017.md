---
title: "DeepSeek V4.1 Flash 更新：做游戏、搭 3D 场景更拿手，也更快、更省"
date: 2026-10-18T00:00:00.000Z
tags: ["产品发布", "DeepSeek", "Agent", "编程", "搜索 API", "聚合"]
summary: "赛车能从开赛跑到结算，故宫可以换视角看，河谷会随时代变样。这次更新能做什么，又能给使用者省下哪些事？"
---
> **原文链接**: [https://mp.weixin.qq.com/s/X-5kbBkedQ5Oct9byUunag](https://mp.weixin.qq.com/s/X-5kbBkedQ5Oct9byUunag)
> **来源**: 深度求索
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/deepseek-v41-flash-1017/) · 2026/10/18
> **说明**: 本文由 AIHot 自动聚合(原文即中文,未翻译)

---

## DeepSeek V4.1 Flash 新版本：许愿式编程一键成真

          
                                      原创
                                                      
                                      深度求索
                    深度求索
                                  
                                      
                        
              DeepSeek
              
              
            
            
            
              
              
              
                            
            
            
          

          
          
            
            
              
                
              
              
                在小说阅读器读本章
                
              
            
            去阅读
            
            
              
                
                  
                
                
                  
                  在公众号小说中沉浸阅读
                
              
            
            
          

          
          
          
            
              
              
            
              
              
                
              
            
          

          
          

          
                                        

          
                    

          
                    
                    
          
          
          
          
          
                                                            

DeepSeek V4.1 Flash 现已更新至 V4.1-Flash-1017 版本，官方网页端、APP 与 API 模型已同步变更为新模型。

### 性能–费用的帕累托改进

### 相比上一版本的 DeepSeek V4.1 Flash，新模型在各方面的基准测试中取得了长足的提升。
![](https://mmbiz.qpic.cn/sz_mmbiz_png/T5aPbYwzUBN1FvxsawRAiakMxyjTEcWpXWicK4DQPbzhuqCH7zUCHtv3Yhw6s3xnv9GicTq3YOQT6bqHSa6ltcFVIgZaqtTCpicVOyaI0eAXRyc/640?wx_fmt=png&from=appmsg)

在提升性能的同时，我们还缩短了模型的任务运行时间与输出长度，让用户能够以更低成本、更快速度完成任务（如下图所示），在多个 Harness 下达到了新的性能-费用帕累托最优。特别地，本次我们着重针对 DeepSeek Harness、腾讯 CodeBuddy、WorkBuddy 等平台框架进行了优化。请升级到 DeepSeek Harness 0.2.1-rc.1 及以上版本，以获得适配新版模型的最优体验。
![](https://mmbiz.qpic.cn/sz_mmbiz_png/T5aPbYwzUBO6M8lzAMkzFnkDgc2pN66QZMerwX6rtckAbDfYTOnXiakicGHcJKTWLLRHQaVVoqN8RKIPHszOOtKjRibyf01IfEmUicU3NmszlNs/640?wx_fmt=png&from=appmsg)

DeepSeek V4.1 Flash 1017 使用 mini-swe-v2 框架测试 DeepSWE 的性能/成本图

#### 从零开始的完整项目开发

DeepSeek V4.1 Flash 1017 通过基于自反馈的强化学习（RL）训练技术，提升了在游戏开发、3D 建模等方面从零开始构建完整项目的能力，能够支持实现更多“许愿式”编程任务及项目开发请求。以下案例展示了新版本模型在较少的提示词与素材参考条件下，在 DeepSeek Harness 框架环境内通过极短的交互轮次直接实现的项目效果：
![](https://mmbiz.qpic.cn/mmbiz_gif/T5aPbYwzUBMBcNV3F1NRkda1xAXKia4pEbM9fNrAERJLY82VD3Z8N9CCB1iakKicVOSSfmDQTCr76BPKBxKlE5wZrKkLtlTbyFa6XeVtf7za0E/640?wx_fmt=gif&from=appmsg)示例1：故宫 3D 建模展示效果![](https://mmbiz.qpic.cn/mmbiz_gif/T5aPbYwzUBNTROFyunMiaiadgdejTmqrldfK9X6z0DgVPhm8PGs8kiaE4mJ0Hajuqlh6CuWvhEicpftFuAYW62RLtBhcdiaVMI2NvG4ibiaReAVQ3Q/640?wx_fmt=gif&from=appmsg)示例2：网页版赛车游戏开发效果![](https://mmbiz.qpic.cn/sz_mmbiz_gif/T5aPbYwzUBOaf19Zbj8qibAUjhJCDfWSbHtfoPn43CrLeQZ0afNRvdU2icsYp8NtOMmdTDMic3Du1BdT9cPTkWyY6wgoicZxic7Siasy4VkibbticmA/640?wx_fmt=gif&from=appmsg)示例3：基于 godot 引擎开发的《传送门2》游戏复刻效果![](https://mmbiz.qpic.cn/sz_mmbiz_gif/T5aPbYwzUBPfn2Qarvmf9XNxiag1RWeX1KUQBrNOtqQhBvaaqAX1ORKZf9Mco3SYf7YWhLx7ibv6fFIuOkWx2MI6Q5SJMYffpnrSmfmoicKKibo/640?wx_fmt=gif&from=appmsg)

示例4：Valley of Ages-以 3D 场景动态展现从史前时代到现代的发展历程

### 开放自研搜索 API

长期以来，DeepSeek 网页端与 API 端的搜索能力均由自研 DeepSeek 搜索引擎提供底层支持，稳定处理每天来自全球各地的数亿次搜索请求。

DeepSeek 搜索是 AI 原生的通用搜索引擎，索引了全球千亿级网页，支持多语言搜索，实时返回高相关、高权威、高时效的优质结果。针对 SEO 作弊、GEO 操纵和低质 AIGC，我们通过严格的识别机制对其进行过滤，确保向用户与 LLM 呈现权威可信的信息。

本次新版本发布 DeepSeek API 新增对 Search 与 Fetch 接口的支持，相关能力正式向公众开放。两个接口价格均为 5 元 / 千次，**详细使用方法请****参考官方 API 文档：****API 指南 - 网页搜索与抓取****。**

请注意，当前用户在 DeepSeek Harness / Claude Code / Codex 中使用 DeepSeek API 时，已经会通过 Server 端工具调用访问到 Search/Fetch 接口，这部分 Search/Fetch 接口调用目前未计费，并将在两周后（北京时间 2026 年 11 月 1 日 00:00）开始按次收取调用费用。

### 模型开源

DeepSeek-V4.1-Flash-1017 模型权重下载地址如下：

### HuggingFace:

### https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017

### ModelScope:

### https://modelscope.cn/models/deepseek-ai/DeepSeek-V4.1-Flash-1017
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/pkWC42uvwkkzHicnc3yYQtiaReJIG84YPl7XRAYlia89diatyex4jjq8n90q9ViajyVBcqxsAkXhpDiaFg9vM2kzg9cA/640?wx_fmt=jpeg&from=appmsg&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=4)
          
        
                

                预览时标签不可点
                
        
        
         
        
        

        
        
          

    
    
                  
    
      
            
            
            
      
        
        不喜欢
      
    
  
  

        

                
              
    

    

    
    
      
        
        
      
    

    
    
      
        
          
          

微信扫一扫
关注该公众号

        
      
    
  

  
    
  

  
  
    
    
      知道了
    
  

  
      
          
          微信扫一扫
使用小程序
      
  

  
  
      
          
      
      
      
      
          取消
          允许
      
  

  
  
    
      
    
    
    
    
      取消
      允许
    
  

  
  
    
      
    
    
    
    
      取消
      允许
    
  

  
  

  
  
    
      
      
        
                
          ![作者头像](http://mmbiz.qpic.cn/mmbiz_png/pkWC42uvwklIwhickZDNXFfOCcSJIec3BAdnyNpapzVcwZXk49xMutQThibB0WMD4hZcscdg4RBMwseMMBlnIQaA/0?wx_fmt=png)
        
              
    
    
      

微信扫一扫可打开此内容，
使用完整服务

    
  

  
  
    
      
    
  

    
    

：
，
，
，
，
，
，
，
，
，
，
，
，
。
 

视频
小程序

赞
，轻点两下取消赞
在看
，轻点两下取消在看
分享
留言
收藏
听过
