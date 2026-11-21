---
title: "Google 发布 Gemini 4 Hydrogen：比 3.8 Flash 还快 2.5 倍，编程得分从 18.2% 涨到 57%"
date: 2026-11-13T00:00:00.000Z
tags: ["产品发布", "Gemini", "Google", "Gemini 4 Hydrogen", "Antigravity", "Agent"]
summary: "Gemini 4 家族里主打快和省的一档。单独用，它比 3.8 Flash 强出一大截；在 Antigravity 里，它还能和 Carbon 搭班：Carbon 出主意，Hydrogen 动手。"
---
> **原文链接**: [https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/)
> **来源**: blog.google
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/gemini-4-hydrogen/) · 2026/11/13
> **说明**: 本文由 AIHot汪 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

## 介绍 Gemini 4 Hydrogen

Nov 12, 2026

- [x.com](https://twitter.com/intent/tweet?text=Introducing%20Gemini%204%20Hydrogen%20%40google&url=https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/)
- [Facebook](https://www.facebook.com/sharer/sharer.php?caption=Introducing%20Gemini%204%20Hydrogen&u=https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/)
- [LinkedIn](https://www.linkedin.com/shareArticle?mini=true&url=https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/&title=Introducing%20Gemini%204%20Hydrogen)
- [Mail](mailto:?subject=Introducing%20Gemini%204%20Hydrogen&body=Check%20out%20this%20article%20on%20the%20Keyword:%0A%0AIntroducing%20Gemini%204%20Hydrogen%0A%0AToday,%20we%E2%80%99re%20introducing%20Gemini%204%20Hydrogen,%20our%20daily%20driver%20for%20agentic%20workflows%0A%0Ahttps://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/)

Hydrogen 将尖端智能带给每个人。

---

[Koray Kavukcuoglu SVP, Google DeepMind and Chief AI Architect, Google](https://blog.google/authors/koray-kavukcuoglu/)

- [x.com](https://twitter.com/intent/tweet?text=Introducing%20Gemini%204%20Hydrogen%20%40google&url=https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/)
- [Facebook](https://www.facebook.com/sharer/sharer.php?caption=Introducing%20Gemini%204%20Hydrogen&u=https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/)
- [LinkedIn](https://www.linkedin.com/shareArticle?mini=true&url=https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/&title=Introducing%20Gemini%204%20Hydrogen)
- [Mail](mailto:?subject=Introducing%20Gemini%204%20Hydrogen&body=Check%20out%20this%20article%20on%20the%20Keyword:%0A%0AIntroducing%20Gemini%204%20Hydrogen%0A%0AToday,%20we%E2%80%99re%20introducing%20Gemini%204%20Hydrogen,%20our%20daily%20driver%20for%20agentic%20workflows%0A%0Ahttps://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/)

---

[视频/音频](https://storage.googleapis.com/gweb-uniblog-publish-prod/media/tts_audio_86922_umbriel_2026_11_12_21_05_31.mp3)

- 收听文章
- [[duration]] 分钟
- 此内容由 Google AI 生成。生成式 AI 处于实验阶段。

---

- 本文目录

今天，我们推出 Gemini 4 Hydrogen，将尖端智能带给每个人——为日常编码和 Agent 工作流提供速度与效率。

虽然我们的前沿模型 [Gemini 4 Carbon](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/) 和 [Gemini 4 Argon](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-argon/) 在您最具挑战性的问题上擅长深度、长视距推理，但 Hydrogen 专为跨多种 Agent 工作流的快速执行而设计。通过 Hydrogen，我们也将 Gemini 4 带给所有人——涵盖 [Google AI Studio](https://aistudio.google.com/prompts/new_chat?model=gemini-4-hydrogen) 的所有层级、Gemini API、[Gemini for business](https://cloud.google.com/gemini-enterprise)、[Gemini app](http://gemini.google.com/)、[Google Search](https://blog.google/products-and-platforms/products/search/gemini-4-hydrogen-search-upgrade)，以及 [Google Antigravity](https://antigravity.google/) 中的付费 Google AI Pro 和 Ultra 订阅用户。

在默认的高思考级别（51 对比 50）及其最高的 xhigh 思考设置下（达到 54），Hydrogen 在 [Artificial Analysis Intelligence Index](https://artificialanalysis.ai/) 上超越了 Argon，同时通常比同类模型更快完成任务。Gemini 4 Hydrogen 在其整个 100 万 token 上下文窗口内定价统一，输入 token 为每百万 1.50 美元，输出 token 为每百万 7.50 美元。

### 解锁多模型工作流的效率

在现实世界的软件开发中，虽然团队在系统设计或梳理细微 Bug 时依赖 Carbon 和 Argon 等前沿模型进行深度的架构判断，但他们仍然需要一个快速、纪律严明的执行模型来编写代码、运行测试和验证更改。Hydrogen 旨在作为日常工作的独立模型运行——或与 Carbon 和 Argon 配对，作为多模型工作流中的高效执行引擎。

为了帮助实现这种多模型协作自动化，我们推出了 [Google Antigravity 中的 Orchestrator](https://antigravity.google/blog/gemini-4-hydrogen-in-google-antigravity)。Orchestrator 不再从开始到结束使用单一模型，而是在同一会话中动态切换 Carbon 和 Hydrogen 等模型。在 [Terminal-Bench 4.0](https://www.tbench.ai/news/terminal-bench-4-0) 上，Orchestrator 达到了接近 Carbon 的任务成功率，同时平均消耗配额减少 24%，完成速度提升 19%。对于需要并行 Agent 的工作流，Carbon 可作为协调器，而 Hydrogen 可驱动 worker 和 verifier Agent，在隔离的工作空间中同时构建和测试更改——帮助团队更快地交付复杂项目，而不会推高 token 成本。

### 扩展开发者和企业工作流

- **多模态知识工作**：Hydrogen 将原生支持的 100 万 token 输入与高达 100 万输出 token 相结合，将密集的 PDF、电子表格、图表、音频和录制视频转化为经过润色、带有引用说明的报告及结构化交付物。它在新的 [多模态知识代理 (MKA)](https://blog.google/innovation-and-ai/models-and-research/gemini-models/multimodal-knowledge-agent-benchmark/) 基准测试中（得分 53.4%）超越了其他模型，该基准测试针对复杂视觉文件进行端到端的代理式知识工作；同时在 [Agents’ Last Exam v1.1](https://agents-last-exam.org/leaderboard)（得分 71.6%）中也表现优异，该基准测试针对端到端的职业工作流。

- **Web 开发**：在开发者重视速度的任务中，如实时 UI 原型设计、设计到代码的迭代以及交互式应用构建，Hydrogen 能用更少的提示词生成功能更完善、特性更完整的布局。

  

  

  
    

  
    
      
        

  
    

  

  

      
        

  
    

  

  

      
        

  
    

  

  

      
    

    
      
        
      
    
  

  

  
    

  
    
      
        

  
    

  
  

  

  
    
      
        

        
          
            

使用 Hydrogen 进行即时 3D 编码，Geminisland 允许任何人通过单个提示词向共享的体素岛屿添加内容，从而在地图上实时生成自定义结构，玩家可以在第一人称视角下围绕这些结构行走和探索。尝试 [实时应用](https://aistudio.google.com/apps/bundled/geminisland?showPreview=true&showAssistant=true&fullscreenApplet=true)。

          
        

        
      
    
  

      
        

  
    

  
  

  

  
    
      
        

        
          
            

结合我们在 Google Antigravity 中新的 Gemini 前端设计技能，Hydrogen 一次性构建了一个电子商务店面，其中包括 WebGL2 地形着色器、固定的四阶段滚动叙事、热分割滑块、3D 线框规格卡以及实时成品配置器。尝试 [实时应用](https://aistudio.google.com/apps/bundled/material-flask-website?showPreview=true&showAssistant=true&fullscreenApplet=true) 以及 Gemini [前端设计技能](https://github.com/google-gemini/demolab)。

          
        

        
      
    
  

      
        

  
    

  
  

  

  
    
      
        

        
          
            

在 Google Antigravity 中，Hydrogen 将 Google Sheets 变成了一个动画像素画布，通过缩小数千个单元格，结合 Python、原生 `=LET(...)` 公式和条件格式，直接在实时电子表格中绘制并动画化完整的动态场景。

          
        

        
      
    
  

      
        

  
    

  
  

  

  
    
      
        

        
          
            

在 Google Antigravity 中，基于 YouTube 主题演讲视频和设计模板，Hydrogen 直接在 Google Slides 中生成了多页演示文稿，然后运行自主的审计与修复循环，以检测重叠文本并清理每张幻灯片的布局。

          
        

        
      
    
  

      
        

  
    

  
  

  

  
    
      
        

        
          
            

在 Google Sheets 中使用 Gemini，Hydrogen 可以帮助团队快速将财务数据转化为交互式模型，这些模型会根据各种预测场景动态调整，在 Sheets 画布中生成输出的速度比之前的模型快 30% 以上。

          
        

        
      
    
  

      
    

    
      
        
      
    
  

  

  
    
  
    
  

  

  
    

  
    

### 在四个思维层级中提供可适应的速度与智能

  

  

  
    

  
  
  
  
  

  
    

    
      
        ![显示 Artificial analysis intelligence index 的图表](https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/gemini-4-hydrogen_aa-index_score-time_graph.gif)

我们为 Gemini 4 Hydrogen 的实用性进行了专门优化。Hydrogen 提供四种思维层级——低、中、高（默认）以及全新的超高（xhigh）层级——在质量、延迟和成本之间提供了广泛的选择，并以平滑、可预测的方式扩展，让您只为任务所需的推理深度等待和付费。在各个思维层级中，Hydrogen 的表现均等或优于同类中的其他竞争模型，同时通常能以更快的速度完成任务并使用更少的输出 token。

![AutomationBench-AA 图表](https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/gemini-4-hydrogen_automation-bench_graph.gif)

![AA Index 5.01 图表](https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/gemini-4-hydrogen_aa-index_graph.gif)

![Terminal-Bench 4.0 图表](https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/gemini-4-hydrogen_t-bench_graph.gif)

![HLE-Diamond 图表](https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/gemini-4-hydrogen_hle_graph.gif)

### 在 Gemini 应用和搜索中提供快速、日常的帮助

对于普通用户而言，Gemini 4 Hydrogen 使完成任务变得更加轻松，能够在多轮对话中更好地保持专注并更准确地遵循指令。

在 Gemini 应用中，Hydrogen 使您的日常助手更加得力——它能更好地遵循您的指导，调用正确的工具，并通过更少的来回交互为您提供可靠的输出。

- **即拿即用的写作、研究和日常工作：** Hydrogen 紧密贴合您的语气、格式和特定规则，因此电子邮件草稿、学习指南、重写内容和文档在第一次尝试时即可直接使用。当您在比较产品或综合密集材料时，它会整合清晰的表格和可视化分解，而不会遗漏关键细节。
- **建立联系并完成更多任务：** Hydrogen 逐步分解您的目标，从您的上传文件、Google 应用（如 Gmail 和 Google Drive）以及 Connected Apps（如 Airtable 和 Dropbox）中提取相关上下文。当您在 Gemini 中启动任务时，它也更频繁地调用适合该工作的工具和技能，帮助您在勾选待办事项列表时节省时间。
- **日常原型设计和迭代：** 用于探索和测试想法时，Hydrogen 能用更少的提示生成整洁、可运行的布局，使得快速原型设计和完善交互式项目变得容易，例如将实时全球闪电数据综合为一个交互式 3D 地球仪。

![从想法到可运行原型的快速开发](https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/gemini-4-hydrogen_prototype_example.gif)

从想法到可运行原型的快速开发，Hydrogen 构建了一个交互式 3D 地球仪和 Web Audio 音乐引擎，由实时闪电驱动，并将全球每一道闪电映射为视觉涟漪和现场环境音乐。

![WebGL2 水和玻璃可视化器](https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/gemini-4-hydrogen_visualizer_example.gif)

当被要求创建 WebGL2 水和玻璃可视化器时，Hydrogen 使用纯数学和 SDF 纹理构建了它——模拟了实时光折射、反射、色散和吸收。

![视频组装技能示例](https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/gemini-4-hydrogen_video_example.gif)

使用自定义视频组装技能并遵循创意简报，Gemini 4 Hydrogen 创建了一个关于元素“氢”的档案宣传短片，它获取公共领域素材并将其剪辑成一段带有清晰旁白的连续视频。

Hydrogen 正在显著升级 [Search](https://blog.google/products-and-platforms/products/search/gemini-4-hydrogen-search-upgrade)，为全球所有用户提供更有帮助、更直观的回复。

- **更准确地理解你的真实意图：** 使用 Hydrogen，你可以按照自然的思维流提出问题——即使你的查询包含多个部分、难以理解的拼写错误，或是高度具体的请求——Search 也能智能地理解你在寻找什么。
- **更丰富的视觉回复：** 你将获得高度自适应、可视化且易于扫描的回复，这些回复独特地契合你的需求，并具备你期望的 Search 速度。
- **更广泛的相关链接范围：** 凭借 Hydrogen 的高级推理能力，我们还升级了 Search 中的查询发散（query fan-out）技术，为你连接比之前更广泛的相关链接，帮助你发现以前可能未曾发现的网站。

  

  

  
    

  
    
      
        

  
    

  
  
  
  
  

  
    
      ![A smartphone screen with a side by side comparison of Gemini 3.5 Flash and Gemini 4 Hydrogen in a search for fixing an apartment](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gemini4Hydrogen-01-Studio_Apt-fu.width-1200.format-webp.webp)
    
  

  

  

      
        

  
    

  
  
  
  
  

  
    
      ![A smartphone screen with a side by side comparison of Gemini 3.5 Flash and Gemini 4 Hydrogen in a search of neighborhoods in Boston](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gemini4Hydrogen-03-Boston-full.width-1200.format-webp.webp)
    
  

  

  

      
        

  
    

  
  
  
  
  

  
    
      ![A smartphone screen with a side by side comparison of Gemini 3.5 Flash and Gemini 4 Hydrogen in a search for sneakers](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gemini4Hydrogen-02-Sneakers-full.width-1200.format-webp.webp)
    
  

  

  

      
    

    
      
        
      
    
  

  

  
    
  
    
  

  

  
    

  
    

### 专为大规模安全、可靠执行而设计

Gemini 4 Hydrogen 将我们最新的 Gemini 4 安全与防护栈的改进带给迄今为止最广泛的用户群体，将内置训练与实时表面防护措施相结合，以帮助缓解不对齐和滥用问题。除了基础保护之外，我们还专注于对日常工作中更快的模型最重要的两个领域：

- **安全、对齐且安全的 Agent 工作流：** 虽然 3.8 Flash 具有强大的对齐性和防护措施，但 Hydrogen 实现了跨越式进步。它将 Agent 任务中的过度干预减少了高达 81%，将服务不足减少了高达 79%，并将工具使用和代码评估中的不对齐操作和任务捷径行为减少了 12 倍。面对不可能或被阻止的任务时，它绕过权限边界的可能性降低了 2 倍，并在我们内部的 Agent 诚实度评估中达到了 96.7% 的诚实率。
  基于我们对 [推理透明度](https://institute.deepmind.com/essays/the-case-for-reasoning-transparency/) 的承诺，Hydrogen 还保持了 99.9% 的思维链可读性，在超过 200,000 次审计轮次中零欺骗性推理编辑。针对间接提示注入攻击，Hydrogen 在 Gray Swan IPI 基准测试中的韧性提高了 2.3 倍以上，同时在工具使用、计算机使用和代码 Agent 方面显著提高了鲁棒性。
- **有帮助、可靠的日常交互：** 在我们的产品表面上，我们调整了 Hydrogen，使日常对话更加可靠和安全。我们更新的防护措施在区分真实的生物安全风险与合法的医疗或科学问题方面也更加精确——将 HealthBench Pro 上的错误拒绝率保持在 0.4% 以下。

更多详情请参阅 Gemini 4 Hydrogen [模型卡片](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-4-Hydrogen-Model-Card.pdf)。

### Gemini 4 Hydrogen，今日面向所有人开放

从今天起，Hydrogen 正在全球范围内向我们的开发者、企业和消费者平台推出：

- **面向开发者：** 在 [AI Studio](https://aistudio.google.com/docs/whats-new-gemini-4-hydrogen) 和 [Android Studio](https://developer.android.com/studio) 中使用 Gemini API 进行构建，在 [AI Studio](https://aistudio.google.com/prompts/new_chat?model=gemini-4-hydrogen) 中试用；如果您是付费的 Google AI Pro 或 Ultra 订阅用户，还可以在 [Google Antigravity](https://antigravity.google/) 中试用。
- **面向企业：** 通过 API 或模型下拉菜单在 [Gemini for business](https://cloud.google.com/gemini-enterprise) 中部署，在 Google Antigravity 中使用，并在符合条件的商业订阅的 Google Sheets 中的 Gemini 中使用。
- **面向所有人：** 在 [Gemini app](http://gemini.google.com/) 模型下拉菜单 [1](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/#footnote-1) 中开始使用，并在 [Google Search](https://blog.google/products-and-platforms/products/search/gemini-4-hydrogen-search-upgrade) 中面向所有用户开放，同时面向 Google AI Pro 和 Ultra 订阅用户在 [Google Sheets](http://sheets.new/) 中的 Gemini 中开放。

  

  

  
    

  
    
      
      

        
        
      
      

        
          

### 将 Google 的最新新闻发送至您的邮箱

注册我们的新闻通讯，获取产品更新、活动信息、特别优惠等内容。

          
            
              
              
            
          

          

  
    
      

    
    
      

完成。只需再一步。

      

请检查您的收件箱以确认订阅。

    
  
  

您也可以通过 . 进行订阅。

          

您的信息将根据 [Google 隐私政策](https://policies.google.com/privacy) 使用。您可以随时选择退出。

        
      
    
  

  

          
          

          
            

  
    
      发布于：
