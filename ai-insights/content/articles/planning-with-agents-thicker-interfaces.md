---
title: "GitHub 研究员谈 Agent 规划：先看见方案的后果，再决定怎么做"
date: 2026-10-28T00:00:00.000Z
tags: ["洞察", "Agent", "界面设计", "GitHub", "Chopin", "聚合"]
summary: "Maggie Appleton 用阴影、播放器和重试重构，说明怎样把长篇计划变成能试、能比较、能与同事共同决定的界面。"
---
> **原文链接**: [https://maggieappleton.com/planning-agents](https://maggieappleton.com/planning-agents)
> **来源**: maggieappleton.com
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/planning-with-agents-thicker-interfaces/) · 2026/10/28
> **说明**: 本文由 AIHot 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

我最近一直在深思熟虑地思考关于规划的问题。与 Agent 相关的规划。也许“规划”这个词并不完全准确，更像是在与 Agent 进行循环思考，或与 Agent 共同进行决策。大家都在争相迈向超自动化：循环、Agent 工作流、软件工厂，以及派遣 Agent 群自主解决问题。我们正竭尽全力让 Agent 在我们不在场时也能高效产出；而当我们不在场时，我们可能在睡觉、慢跑，或者阅读令人作呕的 [Hugging Face 攻击事件](https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/) 细节。

然而，为了让所有这些 Agent token 产生*有用*的结果，我们需要赋予它们一个优秀的计划。我们需要以极其细致的细节清晰地阐述我们的愿望和愿景。我们保持清醒、专注并与 Agent 处于同一循环中的时刻是珍贵的。而我们目前与 Agent 进行“规划”的方式——即我们与 Agent 共同思考具体问题并做出决策的方式——显得陈旧且计算上过于基础。是的，这些 [短破折号](https://english.stackexchange.com/questions/497006/in-britain-which-is-more-common-the-em-dash-or-the-en-dash) 是我自己写的，你们不能把它们拿走。至少它们不是长破折号。

因此，我写了这篇演讲，作为探索问题沼泽并开始感知解决方案形态的一种方式。事实证明，我对我们规划系统和界面存在的问题有一些理论。我刚刚在一次微软内部会议上展示了这个演讲的第一个版本，但我计划继续完善它，并希望有机会在一些更大的舞台上分享。

       ![](https://maggieappleton.com/_astro/planning-agents.001.xIyrYXhI_WX70x.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.002.B72MMcwg_1e4ybI.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.003.BrdFustt_RYpdq.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.004.DD7iVArP_ZUriBv.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.005.CzlPw500_ZGbqj2.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.006.DQnjUjXb_Z1Fx8T.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.007.C5ea-RqB_Z142shD.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.008.SYRZV_SG_ZNIaQG.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.009.rozxzlga_1sXrmR.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.010.D6YG_2RF_ZcsRdi.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.011.DW4rcE4r_19vetx.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.012.XTHl-MMB_Z1XSFpE.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.013.DWZVlxib_Z2qbGnm.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.014.CLiH1_1V_AryhC.jpg) 

[视频/音频](https://media.maggieappleton.com/videos/planning-agents/plan-mode-questions.mp4)
   ![](https://maggieappleton.com/_astro/planning-agents.016.CTGL6-N__ZcDKoG.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.017.oU3ALW4r_18GbXS.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.018.B4bjMirh_16Foze.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.019.O3vMGcGn_Z1CakXa.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.020.0F12s4LI_Zjww86.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.021.Cu3kqQgu_Z1Uscpt.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.022.CZdXfrBQ_Z6LAF.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.023.Ctew3F4G_ZbKIFK.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.024.WZ5_ZVFG_Z1uBAOe.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.025.BAaQZy38_1fykuo.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.026.Dsvy793C_7ycxe.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.027.mX0xKyC5_1s2NDf.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.028.DrXarSZO_2eTfSv.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.029.DOw_76Ec_ZVf26b.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.030.CnEcyNYX_Z1XQipl.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.031.DCbFXdNK_Z11kKEi.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.032.DIN8wH1Q_1YOAGg.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.033.B1p0GyH3_xeVaG.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.034.B3tfLXp9_1aqeI.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.035.DNRFdgkF_p4ewT.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.036.q2w0YzS1_Z4stK7.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.037.COEHpo7e_Z2p9d0b.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.038.Bn6ghnWE_vIfa.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.039.VrZIJwmF_Z1CzHe2.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.040.CEb6yYYu_Z7vol7.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.041.DoNJOcxl_Z2gONK3.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.042.BROK-q12_ZFPlhP.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.043.DvqSG6FL_Z1VsVti.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.044.uj3RcGiz_kLQvH.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.045.CcBPD0hl_Z11Hmoo.jpg)

[视频/音频](https://media.maggieappleton.com/videos/planning-agents/agent-trace.mp4)
   ![](https://maggieappleton.com/_astro/planning-agents.047.LxJRhSIH_Z1zWXmq.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.048.CVriIZ6e_ZxUq4r.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.049.Da_AJt8t_ZCicU4.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.050.DBnIa3Zy_vVj9b.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.051.hglmpZYh_Z1g4cdl.jpg) 

[视频/音频](https://media.maggieappleton.com/videos/planning-agents/shadow-interface.mp4)
   ![](https://maggieappleton.com/_astro/planning-agents.053.D3-giot8_ZeGUCJ.jpg) 

[视频/音频](https://media.maggieappleton.com/videos/planning-agents/state-machine.mp4)
   ![](https://maggieappleton.com/_astro/planning-agents.055.ulsdzogu_1CkBEn.jpg) 

[视频/音频](https://media.maggieappleton.com/videos/planning-agents/retry-report.mp4)

[视频/音频](https://media.maggieappleton.com/videos/planning-agents/chopin-multiplayer.mp4)

[视频/音频](https://media.maggieappleton.com/videos/planning-agents/chopin-editor.mp4)

[视频/音频](https://media.maggieappleton.com/videos/planning-agents/chopin-project-page.mp4)
   ![](https://maggieappleton.com/_astro/planning-agents.059.DFt4ERJw_ZAeTal.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.060.BAnm5XAK_Z1nIXmm.jpg)    ![](https://maggieappleton.com/_astro/planning-agents.061.DmrttfSY_Z1vaepv.jpg)          ![](https://maggieappleton.com/_astro/planning-agents.001.xIyrYXhI_WX70x.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.002.B72MMcwg_1e4ybI.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.003.BrdFustt_RYpdq.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.004.DD7iVArP_ZUriBv.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.005.CzlPw500_ZGbqj2.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.006.DQnjUjXb_Z1Fx8T.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.007.C5ea-RqB_Z142shD.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.008.SYRZV_SG_ZNIaQG.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.009.rozxzlga_1sXrmR.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.010.D6YG_2RF_ZcsRdi.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.011.DW4rcE4r_19vetx.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.012.XTHl-MMB_Z1XSFpE.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.013.DWZVlxib_Z2qbGnm.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.014.CLiH1_1V_AryhC.jpg)   

[视频/音频](https://media.maggieappleton.com/videos/planning-agents/plan-mode-questions.mp4)
     ![](https://maggieappleton.com/_astro/planning-agents.016.CTGL6-N__ZcDKoG.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.017.oU3ALW4r_18GbXS.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.018.B4bjMirh_16Foze.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.019.O3vMGcGn_Z1CakXa.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.020.0F12s4LI_Zjww86.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.021.Cu3kqQgu_Z1Uscpt.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.022.CZdXfrBQ_Z6LAF.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.023.Ctew3F4G_ZbKIFK.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.024.WZ5_ZVFG_Z1uBAOe.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.025.BAaQZy38_1fykuo.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.026.Dsvy793C_7ycxe.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.027.mX0xKyC5_1s2NDf.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.028.DrXarSZO_2eTfSv.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.029.DOw_76Ec_ZVf26b.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.030.CnEcyNYX_Z1XQipl.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.031.DCbFXdNK_Z11kKEi.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.032.DIN8wH1Q_1YOAGg.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.033.B1p0GyH3_xeVaG.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.034.B3tfLXp9_1aqeI.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.035.DNRFdgkF_p4ewT.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.036.q2w0YzS1_Z4stK7.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.037.COEHpo7e_Z2p9d0b.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.038.Bn6ghnWE_vIfa.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.039.VrZIJwmF_Z1CzHe2.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.040.CEb6yYYu_Z7vol7.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.041.DoNJOcxl_Z2gONK3.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.042.BROK-q12_ZFPlhP.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.043.DvqSG6FL_Z1VsVti.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.044.uj3RcGiz_kLQvH.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.045.CcBPD0hl_Z11Hmoo.jpg)

[视频/音频](https://media.maggieappleton.com/videos/planning-agents/agent-trace.mp4)
     ![](https://maggieappleton.com/_astro/planning-agents.047.LxJRhSIH_Z1zWXmq.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.048.CVriIZ6e_ZxUq4r.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.049.Da_AJt8t_ZCicU4.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.050.DBnIa3Zy_vVj9b.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.051.hglmpZYh_Z1g4cdl.jpg)   

[视频/音频](https://media.maggieappleton.com/videos/planning-agents/shadow-interface.mp4)
     ![](https://maggieappleton.com/_astro/planning-agents.053.D3-giot8_ZeGUCJ.jpg)   

[视频/音频](https://media.maggieappleton.com/videos/planning-agents/state-machine.mp4)
     ![](https://maggieappleton.com/_astro/planning-agents.055.ulsdzogu_1CkBEn.jpg)   

[视频/音频](https://media.maggieappleton.com/videos/planning-agents/retry-report.mp4)
  

[视频/音频](https://media.maggieappleton.com/videos/planning-agents/chopin-multiplayer.mp4)
  

[视频/音频](https://media.maggieappleton.com/videos/planning-agents/chopin-editor.mp4)
  

[视频/音频](https://media.maggieappleton.com/videos/planning-agents/chopin-project-page.mp4)
     ![](https://maggieappleton.com/_astro/planning-agents.059.DFt4ERJw_ZAeTal.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.060.BAnm5XAK_Z1nIXmm.jpg)      ![](https://maggieappleton.com/_astro/planning-agents.061.DmrttfSY_Z1vaepv.jpg)   

本次演讲探讨的是与 Agent 的协作规划：分割的世界、边界对象以及更厚重的接口。

但让我们先谈谈 [Thomas Gladwin](https://archive.org/details/eastisbigbirdnav0000glad) ，一位在 20 世纪 40 年代至 60 年代期间居住在密克罗尼西亚 [Chuukese 人](https://maps.app.goo.gl/rZWuj2sJpc3wtfuc7) 中间的人类学家。

这些人居住在太平洋中部非常偏远的一组岛屿上。他研究的是他们与欧洲航海家相比如何在公海上导航。

欧洲航海家在每次航行开始时都会制定计划。他们会根据地图和一般的抽象原则绘制航线，试图在事前完成大部分思考。

一旦出海，他们会将每一个动作与计划进行对比，并努力保持在设定的航线上。当发生意外情况时，他们必须修订计划。

Chuukese 航海家的工作方式不同：他们不会提前制定计划。

相反，他们以目标（如到达某个特定岛屿）为起点，在没有固定路线的情况下出发。

相反，他们根据出现的情况做出反应，观察风、浪、洋流、太阳和鸟类，并据此调整航向。他们不断思考如何达成目标并做出临时决定，根据上下文不断即兴发挥。

我在 [Lucy Suchman](https://en.wikipedia.org/wiki/Lucy_Suchman) 的著作 [Plans and Situated Actions](https://archive.org/details/planssituatedact0000such) 的开头发现了这个轶事，我会在后面几次引用这本书。

Suchman 是一位著名的人机交互 (HCI) 研究人员和文化人类学家，曾在 80 年代和 90 年代在 [Xerox PARC](https://en.wikipedia.org/wiki/Xerox_PARC) 工作。她的书主要关于与机器进行规划和沟通，尽管写于 1987 年，但它对于解决我们当前与 Agent 相关的问题仍然非常相关。

我们总是喜欢认为技术发展如此之快，以至于历史对我们几乎无关紧要。但实际上，我认为计算机科学领域往往未能吸取过去的教训，如果能重新审视 80 年代和 90 年代的许多理论，将会受益匪浅。

无论如何，Suchman 在书中引用这个轶事来讨论计划能做什么和不能做什么。

这并不是说哪种导航方法更好。重点在于，即使你提前制定了计划，一旦你在现实世界的背景下采取情境化行动，该计划很快就会变得无关紧要。旅途中的每个人都在对环境做出反应并做出临时决定，无论他们是否有计划。

正如 Suchman 所说：“计划最好被视为一种针对临时性活动的薄弱资源。”她说：“我们都表现得像楚克岛人（Chuukese），尽管我们中的一些人可能说着像欧洲人一样的话。”

欧洲人的错误在于假设一旦制定了计划，就直接执行即可。认为地图就是领土，现实会符合你的预期。

换句话说，正如迈克·泰森所说：“每个人在挨了一拳之前都有计划。”

在工程领域，你通常会被复杂性和棘手问题（wicked problems）击中。

因此，本次演讲的主题是关于使用 Agent 来规划软件工程工作。这是我目前的研究痴迷点。

为了提供背景信息，我是 [GitHub Next](https://githubnext.com/) 的设计师、工程师和研究员，这是 GitHub 的研发实验室部门。我们致力于探索 GitHub 的下一步发展方向，但重点关注那些比常规组织所考虑的问题更具风险性和更远期的事物。

而我目前的研究重点是，我们如何为与 Agent 进行协作式规划制作更好的工具。

所谓“协作式”，我指的是人类和 Agent 处于相同的上下文中，所有人实时共同规划。

目前，这真的做得不好。

当你或我开始与 Agent 进行规划时，我们通常独自处于我们选择的 CLI 或桌面应用中，并且通常以某种“计划模式”或启用 [/grill-me](https://github.com/mattpocock/skills/blob/main/skills/productivity/grill-me/SKILL.md) 技能开始，然后继续回答 40 道多项选择题。

我们在第八题左右感到疲惫，并开始选择选项 A，即推荐选项。

也许是因为我们没有完全理解问题，因为被问及的内容如此复杂，以至于我们无法在这个界面中进行推理，或者因为这个问题超出了我们的知识范围。

最终，Agent 停止提问，并给我一大段 Markdown 文本让我阅读。然后它问：你批准这个计划吗，是还是否？

这里有一些非常明显的问题。特别是在 CLI 界面中，我无法直接编辑计划。尽管经过了“拷问”过程，计划中几乎总是存在未决问题，而我没有任何界面来回答这些问题。

我无法在任何问题上暂停，说我们需要深入探讨这一点，或要求 Agent 研究这一点，或帮助我原型化这一点。整个体验缺乏节奏感。

这不是一个做出深思熟虑、知情决策的理想环境。
而且，无论我决定什么，Agent 都将其视为不可更改的铁律。

这也显得奇怪地私密。我和同事们都各自制定计划，我们无法看到彼此的工作。我们无法就这些决策征求彼此的意见。我们甚至无法对此发表评论或进行辩论。

这不是一个复杂的流程。
这不是一个良好的流程。

所以，除了我对 CLI 的表面抱怨之外，这个系统真正的问题是什么？

第一个问题是我们的“欧洲导航员”方法。

我们正在为一个想象中的代码库和运行时之旅编写计划。试图在遭遇现实之前预测最佳方法。

但我们面临着一个不利的转折：规划者和旅行者不是同一个实体。我们处于一种奇怪的位置，必须提前做出所有重要决定，因为 Agent *必须* 独自踏上旅程。

而它将需要做出临时决定并采取情境化行动，但没有人类在场来帮助进行判断。

这很难，因为为了结果良好或有价值，人类的意图和愿望需要与 Agent 的情境化行动高度一致。

第二个问题是，当前的规划媒介是一个设计不良的环境，不利于人类进行高质量的思考。

目前的规划全是文字墙。我们向 Agent 写文字墙；它向我们回写文字墙。

人类不是高效的阅读者。我们每分钟大约能读 240 个单词，而 Agent 每分钟大约能写 4,500 个单词，这比我们能读的快 19 倍。因此，Agent 产生的文本量与我们能消耗的量之间存在巨大差异。

我们会感到疲惫，会跳读，从而错过重要细节。这也是为什么那么多人报告在代理工作中感到倦怠和精疲力竭的原因之一。

他们整天都在密集且难以使用的界面中挣扎，同时试图做出艰难的抉择。这是一种不利于深度工作和复杂问题解决的低效媒介。

之所以说这是一个难以解决的问题，归根结底是因为人类和代理是截然不同的存在，拥有各自完全不同的世界，且彼此之间的可理解性非常有限。

让我们暂时回到 Suchman 的研究。

她进行了一项[著名研究](https://www.youtube.com/watch?v=DUwXN01ARYg)，录像记录了两位博士研究人员试图使用一台内置“智能专家帮助系统”的 [Xerox PARC 复印机](https://en.wikipedia.org/wiki/Xerox_PARC)。用我们现在的眼光来看，这属于原始的人工智能。

当然，他们花了很长时间试图按照说明进行复印，但最终失败了。

但这不仅仅是一个关于界面设计失败的故事。
这是一个关于人类与机器之间信息获取的差异，以及彼此心智模型的故事。

Suchman 指出，复印机无法获取关于人类世界中正在发生的大多数信息，例如研究人员的犹豫、争论、查看说明、做出手势，以及他们对正在发生的事情的预期。

它只能看到按钮按下或纸盘被打开。同样地，人类也只能看到屏幕上打印的消息，而无法看到机器的内部状态或程序设计。

她说，这就像双方都在通过钥匙孔互相窥视。

在我看来，这与我们如何与代理交互的方式并没有太大不同。

当然，自物理按钮和小屏幕时代以来，我们的界面已经取得了长足的进步。我不想淡化这种进步与能够将大量自然语言转录内容输入代理之间的差异。

但感觉仍然像是在通过输入框发送简短的文本消息。

就像是在这两个截然不同的世界之间传递纸条。

人类生活在一个由具身性、物理空间、丰富的视觉、色彩、手势、情感、声音、表情、社会和文化构成的世界中。而代理在这些方面都表现得很糟糕。

而代理生活在一个由向量、权重、奖励、统计概率和梯度下降构成的世界中。

这两个世界各自丰富而复杂，但彼此都无法完全相互理解。*我们*难以理解代理系统内部正在发生什么。可解释性仍然是一个未解决的问题。

我应该承认，代理可以从我们这里获取比文本更多的信息。
它们可以理解并生成图像、音频和视频。
但是，代理的*语言*模型部分仍然是主导媒介。而且我们知道，语言并不能完全捕捉人类的知识。

这就是为什么目前有许多人正在尝试教代理构建世界模型并解释物理现实。
但在我们解决这个问题之前，挑战在于如何将人类的意图、决策和专业能力传递给一个通过非常陌生、以语言为中心的视角来看待世界的代理。

我认为，最好的解释方式是尝试想象你理想的规划功能或产品的方式，结合人类和代理，超越当前界面所能实现的能力。

这种愿望的一个小版本是：我和一位同事在通话中，与代理协作。

代理可以通过我们的网络摄像头实时看到我们。

看到我们的视线、面部表情和手势。
听到我和同事之间的对话，以及我们的语速、停顿和声音中的情感基调。
同时看到我们屏幕上的内容，以及我们点击和悬停的位置。

它们不需要询问我们它们的表现如何，或者我们是否喜欢结果。它们可以直接看到，并暂停、重定向或尝试修复问题。

这感觉与我们目前拥有的技术相去甚远，但在几年内实现仍然是现实的。

但那个梦想甚至都不是真正的理想。它是一个受限的梦想，只是在我们当前的界面中仍然可行。

那么，在不严格受限于当前约束的情况下，我真正理想的解决问题环境是什么？

对我来说，它应该是面对面，在白板上与同事一起。
交谈、指点、绘图、手势、察觉困惑、兴奋、紧张和沉默。通过眼神交流来引导房间里的注意力。多台笔记本电脑打开运行原型。将屏幕投射到墙上，以便我们访问计算输出。

这类似于人类思考的理想语境。Agent 无法理解其中的大部分内容。它没有任何正确的输入。

一种解决方案：摄像头、传感器、麦克风。让 Agent 能够看到和听到我们。观察我们的手，追踪我们的视线，并在白板周围跟随我们。

这是一个非常 [通用计算](https://en.wikipedia.org/wiki/Ubiquitous_computing) 的梦想，而且我们有充分的理由尚未实现它。

我刚刚描绘的这个梦想的小版本和大版本都充满了复杂的挑战。Agent 需要实时处理、存储和理解的数据量是巨大的。
不仅仅是物理输入，还有社会语境、角色和背景。它充满了复杂的问题。
我不知道我们是否真的需要它来实现我们的目标。

我们不需要将 Agent 完全带入我们的世界……

……也不需要完全理解它们的世界

我们只需要在两个世界之间进行有效协作的方法。

我们需要的是有效的 [边界对象](https://en.wikipedia.org/wiki/Boundary_object) 。

边界对象理论来自社会学家 Susan Leigh Star 和 James Griesemer 1989 年的论文 [机构生态学、“翻译”与边界对象](https://doi.org/10.1177/030631289019003001) ，该论文讲述了伯克利 [脊椎动物博物馆](https://en.wikipedia.org/wiki/Museum_of_Vertebrate_Zoology) 的创立过程。

在博物馆创立期间，它成功地将许多具有不同文化、信仰、培训和优先事项的社会群体聚集在一起：生物学家、捕兽者、资助者和大学管理员。

所有群体都能通过边界对象进行有效协作。

标本、标签、野外笔记、绘图和地图——它们以略微不同的方式存在于这些社会世界中。

它们对不同的人意味着不同的东西。生物学家和资助者以不同的方式阅读地图，但对加利福尼亚的概念有共同的理解。

这就是有效的边界对象需要做的事情：适应每个群体的本地需求，并向正确的人提供正确的信息，使他们能够创建共享的现实。

我们当前与 Agent 的边界对象是计划、提示、技能和 AGENT.md 文件。它们运作得还可以……

……但它们主要是为 Agent 看待世界的方式设计的；它们优化了 Agent 的性能。

我们目前向人类和 Agent 展示完全相同的 Markdown 文件，并期望它们对我们双方都同样有效。
Agent 可以愉快地消费大量的文本、一堆工具调用和调试日志。但对于人类来说，阅读所有这些内容既缓慢又疲劳，而且成本高昂。

我们正在让人类适应 Agent 的理想工作方式，而不是创建适应双方的对象。

换一种说法，我们人类和 Agent 之间的界面非常薄。

人类看到的和 Agent 看到的之间没有太多的翻译。

我认为它们需要变得更厚，也就是说，我们需要利用 Agent 相对廉价且无限的劳动力，构建丰富的翻译层，以很好地服务于人类。

在这个交互中，Agent 不是优先方。我们才是。

Agent 应该为人类的利益做更多工作。

那么，更厚的界面和更好的边界对象会是什么样子？

首先，它们需要针对人类的理解和可读性进行优化。这意味着超越文本，利用视觉、空间、互动和社会化的思维方式。

文本显然非常出色。它精确、灵活，并且非常擅长表达思想。但它也是软件工程中所需要看到的和理解的所有复杂事物的一个狭窄通道。

写作只有大约 5,000 年的历史。但我们的复杂视觉系统可以追溯到 5 亿多年前。

我们在进化上被设计为在物理环境中移动，追踪地平线上的事物，注意颜色和运动，判断距离，在空间中排列物体，并比较形状。其中大部分过程是快速且自动发生的。

这就是为什么视觉表现如此有效。我们可以将复杂的数据映射到颜色、形状和空间中，使事物变得可见和可触摸，向我们展示以前无法看到的东西。

这将工作从工作记忆中转移到了世界中。

而且我们有很多视觉语言来实现这一点。

图表揭示比较。地图展示空间中的移动。时间线使序列和重叠变得可见。

每种表现形式都揭示了一种不同类型的结构。而软件工程在利用这一点方面有着适中的历史。

例如，状态机。

以及架构图。

我看到人们正在探索新颖的视觉方式来展示 Agent 活动，比如 [Mindwalk](https://github.com/cosmtrek/mindwalk)，它追踪一个 Agent 的运行过程，显示它在代码库中触及了哪些文件。

这个演示最棒的地方在于它是交互式的。你可以点击四处探索。当然，人类通过行动思考得最好。点和手势；我们移动事物来测试会发生什么。我们让来自世界的反馈更新我们的理解。

理想情况下，它还应该是多人协作的！
这里应该有很多同事和我们在一起。
我们是社会性动物，在与他人一起发展思想、互相质疑并建立共同理解时学习效果最好。

但大多数 Agent 接口将所有这些简化为单人的文本流。因此，文本承担了过多的工作，而我们的视觉、具身和社会能力大多处于闲置状态。

因此，更好的边界对象应该使关系变得可见，让我们直接操作计划，并为人们提供一个可以指向和讨论的共同事物。这是降低与 Agent 协作的认知负荷的具体方法。

改进这些对象的第二种方法是解决我们的欧洲导航员问题。

当我们把计划交出去时，它应该已经与现实中的重要部分建立了有意义的联系。

幸运的是，这不是十九世纪的航海探险，我们可以提前探索地形。

规划 Agent 已经在某种程度上做到了这一点：它们搜索代码库，读取文件，并追踪依赖关系。这给了它们有用的鸟瞰视角，并捕捉到明显的问题。

但它们目前止步于观察。它们预测哪种实现会起作用，而不制作原型、运行它们或基于结果进行比较。

相反，它们可以通过在多个 Git 分支上分配子任务给子 Agent，同时实现多种方法，然后评估结果，从而做更多的前期工作。

这将在人类参与的过程中将现实带入规划过程，并帮助做出明智的决策。

我确信你在想：“好吧，这会很昂贵。”
在 [Next](https://githubnext.com/) 中，我们的哲学是，为了发明未来，你必须生活在其中。假设 Agent 劳动力是功能上免费的；最终它会变得便宜且充足，所以我们应该像它真的是这样去探索。

那么在实践中这看起来是什么样的呢？
这是一个在终端中的规划 Agent，帮助我为我的设计系统开发一组一致的阴影。

它向我提供了三个选项：你想要阴影是清晰的、柔和的还是明显的吗？

这种以文本形式在 CLI 中向我呈现决策的方式，使得做出明智的决定变得不可能。我不知道我当前应用中的阴影看起来是什么样，也不知道它提供的每个选项看起来会是什么样。

显然，对于这种问题的形状，我需要一个更像这样的界面。

首先，这与我的实时应用相连，因此它向我展示系统中当前存在的实际阴影。

然后，我可以直接操纵这些阴影的属性，并实时查看结果。也许我想更改阴影的颜色或强度。当我对它们感到满意时，我可以将该决定保存回计划中。

类似地，假设我有这些卡片，当鼠标悬停时会有轻微动画。我应该有一个专门的界面来帮助我调整其缓动和速度。

请注意，此界面中可供我选择的选项数量呈指数级增长，远不止三个。

这些是能够实质性地促进人类决策的界面。界面应根植于现实（我的代码库），并允许我对其进行操纵以做出正确的决策。

当然，视觉问题自然地适合交互式界面，那么更抽象的逻辑问题呢？

我最近在调试视频播放器和 reducer 时遇到了一些混乱，并在 CLI 中回答越来越复杂的问题。我们显然需要对其进行重新架构。同样，这也不是解决该问题的正确界面。

但是，状态机可以让我查看并探索组件的所有可能状态，查看添加不同转换时会发生什么，并了解缓冲循环的情况。

我们已经有了像状态机这样的编程接口的良好约定。我们现在可以让 Agent 动态构建这种探索，以帮助我们在当下解决特定问题。

这将现实中的重要部分带入规划过程，而不是让 Agent 在独自旅程的后期才遇到它们。

最后一个演示：我正在处理一些重试逻辑，Agent 让我在特定语法之间做出选择，例如选项对象、包装函数或客户端策略。

从这个界面来看，很难推理出这些选择的后果，这正是这类问题的特点。

这是一个很好的例子，说明我们可以让子 Agent 分支到不同的分支上，构建所有三个选项，评估结果，并向我们汇报。

因此，我让 Agent 尝试所有三种方案，然后根据一些关键指标（如解决方案与每个调用点的契合度以及影响范围）生成交互式报告。

这些选项的可视化揭示了更多内容。
它显示选项 A 覆盖了所有 60 个调用点。大多数更改是机械性的，但有八个需要判断。
选项 B 也覆盖了所有 60 个调用点，但 16 个会 silently 改变其行为。
选项 C 起初看起来很有希望，因为它只有 14 个更改，且都是机械性的。直到你意识到其他 46 个调用点不受支持。

它还提供了一些可衡量的指标，如恢复 P95 和放大效应，这些都有助于指导决策。这些都帮助我们看到选项 A 显然是正确的选择。

我们和这个通过丰富界面工作的美妙世界之间的挑战在于，Agent 目前还不擅长制作视觉解释。
当然，如果没有我大量的引导，并且本质上由我自己设计所有这些示例，它们是做不到的。

其次，我们需要在此处战略性地规划推理时间，这样我就不会等待太久才能进行这些探索；我们需要让 Agent 并行工作，提前五步，并在我回答其他问题时完成这些操作。

这些丰富的交互式计划是我目前正在 [Chopin](https://githubnext.com/projects/chopin) 项目中探索的内容。这是一个多人实时规划原型，由我的同事 [Krzysztof](https://github.com/krzysztof-cieslak) 和我共同开发。

目前它是一个非常基础的概念验证和探索空间。

你和你的同事以及 Agent 在一个漂亮的 Markdown 编辑器中共同编写计划。但这个编辑器包含许多交互式可视化元素。它是使用 MDX 构建的。

我在演示中没有过多涉及社交部分，但拥有更好的决策界面的关键部分之一是，你的同事也可以看到它们，参与辩论，并集体做出决定。

在这里你可以看到，我正在回应一个决策，随后系统记录了我做出该决策的具体时间和日期。

如果你想了解更多关于 Chopin 的信息，我们在 GitHub Next 网站上发布了一篇[文章](https://githubnext.com/projects/chopin)，其中包含我们的初步研究成果以及更多演示。

那么，让我们总结一下并回顾一下我们学到的内容：

- 计划旨在指导行动。它们无法预测整个旅程。
- 人类和智能体（Agent）不需要共享的理解。他们需要良好的边界对象（boundary objects）和厚接口（thick interfaces）。
- 创建可视化的、交互式的以及社交化的边界对象。
- 改善人类思考的环境条件。人类是优先的主体。智能体应该并且能够承担 1000 倍的工作量，以使人类更加高效。

在你构建的任何事物中，可以问自己以下问题：

- 我在何处让人类接触到了智能体的看待方式？智能体可以构建哪些翻译层来解决这个问题？
- 我如何优化环境以促进人类的理解和深度思考？

感谢阅读！请访问 [GitHub Next](https://githubnext.com/) 查看更多我们的研究成果。并阅读我们关于 [GitHub Chopin](https://githubnext.com/projects/chopin) 的文章，以了解更多关于该项目的信息。

#### 网络上的相关提及

[charlie-essays.surge.sh 提及：《边界对象并非读者》2026 年 9 月 20 日](https://charlie-essays.surge.sh/the-boundary-object-is-not-the-reader/) Maggie Appleton 上周发表了一篇关于与智能体（Agent）协作规划的演讲。她的观点是：人类和智能体不需要共享的理解，他们只需要良好的边界对象和厚接口，并且“智能体应该并且能够承担 1000 倍的工作量，以使人类更加高效。” 她是正确的
