---
title: "Google 公布 EmbeddingGemma 2 技术报告，详解一个小模型怎样搜文字、图片、声音和视频"
date: 2026-11-06T00:00:00.000Z
tags: ["研究解读", "Google", "EmbeddingGemma", "多模态检索", "端侧 AI", "聚合"]
summary: "同一个模型给文字、图片、声音和视频编码。论文用对照实验解释了小模型怎么练，以及哪些细节值得花算力。"
---
> **原文链接**: [https://arxiv.org/abs/2610.37364](https://arxiv.org/abs/2610.37364)
> **来源**: arxiv.org
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/embeddinggemma-2-paper/) · 2026/11/6
> **说明**: 本文由 AIHot 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

## 计算机科学 > 机器学习

    

    
      **arXiv:2610.37364** (cs)
    

  
    
  [提交于 2026年10月27日]
    

## 标题：EmbeddingGemma 2:统一且高效的多模态表示

作者:[Henrique Schechter Vera](https://arxiv.org/search/cs?searchtype=author&query=Vera,+H+S)、[Sahil Dua](https://arxiv.org/search/cs?searchtype=author&query=Dua,+S)、[Jovan Andonov](https://arxiv.org/search/cs?searchtype=author&query=Andonov,+J)、[Sara Smoot](https://arxiv.org/search/cs?searchtype=author&query=Smoot,+S)、[Sebastian Russo](https://arxiv.org/search/cs?searchtype=author&query=Russo,+S)、[Ivan Llanos](https://arxiv.org/search/cs?searchtype=author&query=Llanos,+I)、[Max Matveev](https://arxiv.org/search/cs?searchtype=author&query=Matveev,+M)、[Jae Hyeon Yoo](https://arxiv.org/search/cs?searchtype=author&query=Yoo,+J+H)、[Kat Black](https://arxiv.org/search/cs?searchtype=author&query=Black,+K)、[Shih-Cheng Huang](https://arxiv.org/search/cs?searchtype=author&query=Huang,+S)、[Josiah Aklilu](https://arxiv.org/search/cs?searchtype=author&query=Aklilu,+J)、[Maarten Grootendorst](https://arxiv.org/search/cs?searchtype=author&query=Grootendorst,+M)、[Omar Sanseviero](https://arxiv.org/search/cs?searchtype=author&query=Sanseviero,+O)、[Chandramouli Amarnath](https://arxiv.org/search/cs?searchtype=author&query=Amarnath,+C)、[Ian Ballantyne](https://arxiv.org/search/cs?searchtype=author&query=Ballantyne,+I)、[Zhe Li](https://arxiv.org/search/cs?searchtype=author&query=Li,+Z)、[Daniel Salz](https://arxiv.org/search/cs?searchtype=author&query=Salz,+D)、[Ibrahim Alabdulmohsin](https://arxiv.org/search/cs?searchtype=author&query=Alabdulmohsin,+I)、[Ilya Philippov](https://arxiv.org/search/cs?searchtype=author&query=Philippov,+I)、[Kristen Quan](https://arxiv.org/search/cs?searchtype=author&query=Quan,+K)、[Glenn Cameron](https://arxiv.org/search/cs?searchtype=author&query=Cameron,+G)、[Edouard Yvinec](https://arxiv.org/search/cs?searchtype=author&query=Yvinec,+E)、[Luciano Martins](https://arxiv.org/search/cs?searchtype=author&query=Martins,+L)、[Doug Reid](https://arxiv.org/search/cs?searchtype=author&query=Reid,+D)、[Sindhu Raghuram Panyam](https://arxiv.org/search/cs?searchtype=author&query=Panyam,+S+R)、[Weiyi Wang](https://arxiv.org/search/cs?searchtype=author&query=Wang,+W)、[Hengxuan Ying](https://arxiv.org/search/cs?searchtype=author&query=Ying,+H)、[Madhuri Shanbhogue](https://arxiv.org/search/cs?searchtype=author&query=Shanbhogue,+M)、[Tanmaya Dabral](https://arxiv.org/search/cs?searchtype=author&query=Dabral,+T)、[Shanfeng Zhang](https://arxiv.org/search/cs?searchtype=author&query=Zhang,+S)、[Juyeong Ji](https://arxiv.org/search/cs?searchtype=author&query=Ji,+J)、[Renjie Wu](https://arxiv.org/search/cs?searchtype=author&query=Wu,+R)、[Joe Zou](https://arxiv.org/search/cs?searchtype=author&query=Zou,+J)、[Xu Chen](https://arxiv.org/search/cs?searchtype=author&query=Chen,+X)、[Yunan Zhang](https://arxiv.org/search/cs?searchtype=author&query=Zhang,+Y)、[Yu-Hui Chen](https://arxiv.org/search/cs?searchtype=author&query=Chen,+Y)、[Matthew Soulanille](https://arxiv.org/search/cs?searchtype=author&query=Soulanille,+M)、[Vinod Mamillapalli](https://arxiv.org/search/cs?searchtype=author&query=Mamillapalli,+V)、[Yi-Chun Kuo](https://arxiv.org/search/cs?searchtype=author&query=Kuo,+Y)、[Wai Hon Law](https://arxiv.org/search/cs?searchtype=author&query=Law,+W+H)、[Matt Kreileder](https://arxiv.org/search/cs?searchtype=author&query=Kreileder,+M)、[Alice Zheng](https://arxiv.org/search/cs?searchtype=author&query=Zheng,+A)、[Suril Shah](https://arxiv.org/search/cs?searchtype=author&query=Shah,+S)、[Mogan Shieh](https://arxiv.org/search/cs?searchtype=author&query=Shieh,+M)、[Pooja Consul](https://arxiv.org/search/cs?searchtype=author&query=Consul,+P)、[Alberto Montes](https://arxiv.org/search/cs?searchtype=author&query=Montes,+A)、[Andreas Hess](https://arxiv.org/search/cs?searchtype=author&query=Hess,+A)、[Andres Sevilla](https://arxiv.org/search/cs?searchtype=author&query=Sevilla,+A)、[Babak Samari](https://arxiv.org/search/cs?searchtype=author&query=Samari,+B)、[Brendan McCloskey](https://arxiv.org/search/cs?searchtype=author&query=McCloskey,+B)、[Brian Potetz](https://arxiv.org/search/cs?searchtype=author&query=Potetz,+B)、[Daniel Cer](https://arxiv.org/search/cs?searchtype=author&query=Cer,+D)、[Georgios Kathareios](https://arxiv.org/search/cs?searchtype=author&query=Kathareios,+G)、[Gustavo Hernández Ábrego](https://arxiv.org/search/cs?searchtype=author&query=%C3%81brego,+G+H)、[Hesen Zhang](https://arxiv.org/search/cs?searchtype=author&query=Zhang,+H)、[Ji Ma](https://arxiv.org/search/cs?searchtype=author&query=Ma,+J)、[Jiaxing Wu](https://arxiv.org/search/cs?searchtype=author&query=Wu,+J)、[Keegan Mosley](https://arxiv.org/search/cs?searchtype=author&query=Mosley,+K)、[Paul Suganthan](https://arxiv.org/search/cs?searchtype=author&query=Suganthan,+P)、[Rui Meng](https://arxiv.org/search/cs?searchtype=author&query=Meng,+R)、[Shen Gao](https://arxiv.org/search/cs?searchtype=author&query=Gao,+S)、[Shengcao Cao](https://arxiv.org/search/cs?searchtype=author&query=Cao,+S)、[Yi-Ting Chen](https://arxiv.org/search/cs?searchtype=author&query=Chen,+Y)、[Yichang Chen](https://arxiv.org/search/cs?searchtype=author&query=Chen,+Y)、[Zhongli Ding](https://arxiv.org/search/cs?searchtype=author&query=Ding,+Z)、[Kendra Byrne](https://arxiv.org/search/cs?searchtype=author&query=Byrne,+K)、[Cormac Brick](https://arxiv.org/search/cs?searchtype=author&query=Brick,+C)、[Olivier Lacombe](https://arxiv.org/search/cs?searchtype=author&query=Lacombe,+O)、[Qin Yin](https://arxiv.org/search/cs?searchtype=author&query=Yin,+Q)、[Tris Warkentin](https://arxiv.org/search/cs?searchtype=author&query=Warkentin,+T)、[Armand Joulin](https://arxiv.org/search/cs?searchtype=author&query=Joulin,+A)、[Tom Duerig](https://arxiv.org/search/cs?searchtype=author&query=Duerig,+T)、[Mojtaba Seyedhosseini](https://arxiv.org/search/cs?searchtype=author&query=Seyedhosseini,+M)            查看论文《EmbeddingGemma 2:统一且高效的多模态表示》的 PDF,作者为 Henrique Schechter Vera、Sahil Dua、Jovan Andonov、Sara Smoot、Sebastian Russo、Ivan Llanos、Max Matveev、Jae Hyeon Yoo、Kat Black、Shih-Cheng Huang、Josiah Aklilu、Maarten Grootendorst、Omar Sanseviero、Chandramouli Amarnath、Ian Ballantyne、Zhe Li、Daniel Salz、Ibrahim Alabdulmohsin、Ilya Philippov、Kristen Quan、Glenn Cameron、Edouard Yvinec、Luciano Martins、Doug Reid、Sindhu Raghuram Panyam、Weiyi Wang、Hengxuan Ying、Madhuri Shanbhogue、Tanmaya Dabral、Shanfeng Zhang、Juyeong Ji、Renjie Wu、Joe Zou、Xu Chen、Yunan Zhang、Yu-Hui Chen、Matthew Soulanille、Vinod Mamillapalli、Yi-Chun Kuo、Wai Hon Law、Matt Kreileder、Alice Zheng、Suril Shah、Mogan Shieh、Pooja Consul、Alberto Montes、Andreas Hess、Andres Sevilla、Babak Samari、Brendan McCloskey、Brian Potetz、Daniel Cer、Georgios Kathareios、Gustavo Hern\'andez \'Abrego、Hesen Zhang、Ji Ma、Jiaxing Wu、Keegan Mosley、Paul Suganthan、Rui Meng、Shen Gao、Shengcao Cao、Yi-Ting Chen、Yichang Chen、Zhongli Ding、Kendra Byrne、Cormac Brick、Olivier Lacombe、Qin Yin、Tris Warkentin、Armand Joulin、Tom Duerig、Mojtaba Seyedhosseini

[查看 PDF](https://arxiv.org/pdf/2610.37364)
    [HTML(实验性)](https://arxiv.org/html/2610.37364v1)

    

> **摘要:** 我们提出 EmbeddingGemma 2,这是一个开放的多模态 embedding 模型,能够原生地在统一空间中表示文本、图像、音频、视频及其组合。我们的方法引入了多项改进,例如简化的逐层(per-layer)embeddings,以及带有模态与目标递进的多阶段课程(curriculum),从而确保在单模态、跨模态和混合模态评估中均具有出色的质量。值得注意的是,在涵盖所有模态的综合性 embedding 基准测试中,EmbeddingGemma 2 确立了新的 Pareto 前沿,其表现优于专用模型以及比它大 2 到 12 倍的模型。此外,我们的设计为资源受限环境提供了灵活性,支持按需选择性加载模态编码器、可调节的 vision token 预算、可截断的 embedding 维度以及量化权重。我们通过消融实验(ablation)分析了关键设计决策,并发布 EmbeddingGemma 2 以促进进一步研究。

    
    
      

| 备注: | 28 页。模型可在 HuggingFace([此 https 链接](https://huggingface.co/google/embeddinggemma-2))和 LiteRT([此 https 链接](https://huggingface.co/litert-community/embeddinggemma-2-740m-litert-lm))上获取 |
| --- | --- |
| 学科: | 机器学习(cs.LG);计算与语言(cs.CL);计算机视觉与模式识别(cs.CV);声音(cs.SD) |
| 引用方式: | [arXiv:2610.37364](https://arxiv.org/abs/2610.37364) [cs.LG] |
|  | (或 [arXiv:2610.37364v1](https://arxiv.org/abs/2610.37364v1) [cs.LG] 指向此版本) |
|  | [https://doi.org/10.48550/arXiv.2610.37364](https://doi.org/10.48550/arXiv.2610.37364)        由 DataCite 提供的 arXiv 签发 DOI |

    
  

    
      

### 提交历史
 来自:Henrique Schechter Vera [[查看邮箱](https://arxiv.org/show-email/7a0020a4/2610.37364)]      
    **[v1]**
        2026年10月27日 星期二 15:00:42 UTC (383 KB)

  
  
    
      
      全文链接:
      

### 获取论文:

      

- [查看 PDF](https://arxiv.org/pdf/2610.37364)
- [HTML(实验性)](https://arxiv.org/html/2610.37364v1)
- [TeX 源码](https://arxiv.org/src/2610.37364)

      [查看许可证](http://creativecommons.org/licenses/by/4.0/)
    
        
      

#### 附加功能

      

- [音频摘要](https://arxiv.org/audio/2610.37364)

    
    
    

#### 当前浏览上下文:

  cs.LG

  

      [< 上一篇](https://arxiv.org/prevnext?id=2610.37364&function=prev&context=cs.LG)
    
      |      
      [下一篇 >](https://arxiv.org/prevnext?id=2610.37364&function=next&context=cs.LG)
    

  
    [新论文](https://arxiv.org/list/cs.LG/new)
     | 
    [近期论文](https://arxiv.org/list/cs.LG/recent)
     | [2026-10](https://arxiv.org/list/cs.LG/2026-10)
  
    更改浏览类别:
    
        [cs](https://arxiv.org/abs/2610.37364?context=cs)

        [cs.CL](https://arxiv.org/abs/2610.37364?context=cs.CL)

        [cs.CV](https://arxiv.org/abs/2610.37364?context=cs.CV)

        [cs.SD](https://arxiv.org/abs/2610.37364?context=cs.SD)

    
  

    
      
        

#### 参考文献与引用

        

- [SciX](https://scixplorer.org/abs/arXiv:2610.37364)
- [Google Scholar](https://scholar.google.com/scholar_lookup?arxiv_id=2610.37364)
- [Semantic Scholar](https://api.semanticscholar.org/arXiv:2610.37364)

        
      

    
    加载中...

    
        
            

### BibTeX 格式引用

            
        
        
            加载中...
        
        
            数据提供方:
            
        
    

  

#### 书签
[http://www.bibsonomy.org/BibtexHandler?requTask=upload&url=https://arxiv.org/abs/2610.37364&description=EmbeddingGemma%202:%20Unified%20and%20Efficient%20Multimodal%20Representations](http://www.bibsonomy.org/BibtexHandler?requTask=upload&url=https://arxiv.org/abs/2610.37364&description=EmbeddingGemma%202:%20Unified%20and%20Efficient%20Multimodal%20Representations)
  [https://reddit.com/submit?url=https://arxiv.org/abs/2610.37364&title=EmbeddingGemma%202:%20Unified%20and%20Efficient%20Multimodal%20Representations](https://reddit.com/submit?url=https://arxiv.org/abs/2610.37364&title=EmbeddingGemma%202:%20Unified%20and%20Efficient%20Multimodal%20Representations)

## 书目与引用工具

- Bibliographic Explorer 开关
  - Bibliographic Explorer *([Explorer 是什么?](https://info.arxiv.org/labs/showcase.html#arxiv-bibliographic-explorer))*
- Connected Papers 开关
  - Connected Papers *([Connected Papers 是什么?](https://www.connectedpapers.com/about))*
- Litmaps 开关
  - Litmaps *([Litmaps 是什么?](https://www.litmaps.co/))*
- scite.ai 开关
  - scite Smart Citations *([什么是 Smart Citations?](https://www.scite.ai/))*

## 与本文相关的代码、数据和媒体

- alphaXiv 开关
  - alphaXiv *([alphaXiv 是什么?](https://alphaxiv.org/))*
- 代码链接开关
  - CatalyzeX Code Finder for Papers *([CatalyzeX 是什么?](https://www.catalyzex.com/))*
- DagsHub 开关
  - DagsHub *([DagsHub 是什么?](https://dagshub.com/))*
- GotitPub 开关
  - Gotit.pub *([GotitPub 是什么?](http://gotit.pub/faq))*
- Huggingface 开关
  - Hugging Face *([Huggingface 是什么?](https://huggingface.co/huggingface))*
- ScienceCast 开关
  - ScienceCast *([ScienceCast 是什么?](https://sciencecast.org/welcome))*

## 演示

- Replicate 开关
  - Replicate *([Replicate 是什么?](https://replicate.com/docs/arxiv/about))*
- Spaces 开关
  - Hugging Face Spaces *([Spaces 是什么?](https://huggingface.co/docs/hub/spaces))*
- Spaces 开关
  - TXYZ.AI *([TXYZ.AI 是什么?](https://txyz.ai/))*

## 相关论文

## 推荐与搜索工具

- Influence Flower 链接
  - Influence Flower *([什么是 Influence Flowers?](https://influencemap.cmlab.dev/))*
- 核心推荐器开关

CORE Recommender *([CORE 是什么？](https://core.ac.uk/services/recommender))*

IArxiv 推荐系统切换开关

IArxiv 推荐系统
*([IArxiv 是什么？](https://iarxiv.org/about))*

- 作者
- 发表平台
- 机构
- 主题

关于 arXivLabs

## arXivLabs:与社区合作者共同开展的实验性项目

arXivLabs 是一个框架，允许合作者直接在我们的网站上开发和分享新的 arXiv 功能。

与 arXivLabs 合作的个人和组织均已接受并认同我们开放、社区、卓越和用户数据隐私的价值观。arXiv 坚守这些价值观，并且只与遵循这些价值观的合作伙伴合作。

有能为 arXiv 社区增值的项目想法吗？[了解更多关于 arXivLabs 的信息](https://info.arxiv.org/labs/index.html)。

[本文的哪些作者是认可者（endorsers）？](https://arxiv.org/auth/show-endorsers/2610.37364) |
禁用 MathJax（[MathJax 是什么？](https://info.arxiv.org/help/mathjax.html))
