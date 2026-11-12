---
title: "Epic 发布虚幻引擎 5.9 预览版：把 Codex 和 Claude Code 接进虚幻编辑器 可以帮你改关卡、找素材、做测试"
date: 2026-11-10T00:00:00.000Z
tags: ["产品发布", "Epic Games", "Unreal Engine", "Codex", "Claude Code", "MCP", "聚合"]
summary: "Epic 让工程师指挥多组 Agent，把 UE6 的 AI 工具带回 UE5。开发者可以在编辑器里调用 Agent，也可以尝试把项目打包成网页。"
---
> **原文链接**: [https://forums.unrealengine.com/t/unreal-engine-5-9-megajam-preview/2852840](https://forums.unrealengine.com/t/unreal-engine-5-9-megajam-preview/2852840)
> **来源**: forums.unrealengine.com
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/unreal-engine-5-9-megajam-preview/) · 2026/11/10
> **说明**: 本文由 AIHot汪 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

## Unreal Engine 5.9 MegaJam 预览版

**URL:** <https://forums.unrealengine.com/t/unreal-engine-5-9-megajam-preview/2852840>\
**分类:** 公告\
**标签:** unreal-engine, Release\
**创建时间:** [2026年11月9日, 下午2:50 UTC](https://forums.unrealengine.com/t/unreal-engine-5-9-megajam-preview/2852840 "2026-11-09T14:50:41Z")\
**本页帖子数:** 17\
**页码:** 1

<div class="post-metadata">

**作者:** ![Flak](https://d1ap1mz92jnks1.cloudfront.net/user_avatar/forums.unrealengine.com/flak/32/769441_2.png) [@Flak](https://forums.unrealengine.com/u/Flak)\
**发帖时间:** [2026年11月9日, 下午2:50 UTC](https://forums.unrealengine.com/t/unreal-engine-5-9-megajam-preview/2852840/1 "2026-11-09T14:50:41Z")

</div>

![unreal-engine-5-9-megajam-forum-header](https://d3kjluh73b9h9o.cloudfront.net/original/4X/5/3/2/532a040afb216bb3062c37b1b296ee81fa4a1261.jpeg)

从 Epic Games [Launcher](https://www.unrealengine.com/en-US/download)、[GitHub](https://github.com/EpicGames/UnrealEngine/releases/tag/5.9.0-preview-1) 或 [此处](https://www.unrealengine.com/linux)（适用于 Linux）下载 Unreal Engine 5.9 MegaJam 预览版。

这并非典型的 Unreal Engine 预览版。

我们一直在 UE5 Main 中积累渲染和动画方面的更改，为明年 5.9 版本的发布做准备。然而，就在上周，我们决定赶在 11 月 12–15 日的 [2026 Epic AI MegaJam](https://www.unrealengine.com/news/2026-epic-ai-megajam) 之前启动 UE 5.9 预览版的开发工作。

这个 UE 5.9 MegaJam 预览版是首个主要基于 agentic workflows（智能体工作流）构建的 Unreal Engine 版本。少数人员指挥着智能体舰队，将 AI 工具从我们的 UE6 开发分支移植过来，并实现了 Web 作为目标平台。智能体编写了 Web 平台代码，起点是 UE4 中已退役的 HTML5 平台，工程师则负责指导、审查和测试这些工作。

我们正利用这个版本来学习如何构建引擎，让多个人指挥成群的智能体并行工作……我们仍有大量知识需要学习。话虽如此，我们已经看到了这种方法带来的好处，它使我们能够**交付更多的 UE5 版本**，提供更快的错误修复和针对特定功能的开发，同时不会影响对 UE6 的关注。

此预览版仅有一周的开发时间，QA 测试周期也比平时短。我们仍在清理部分由智能体编写的代码，Web 渲染器的一些部分仍是原型，我们计划在完整的 5.9 版本发布之前对其进行重构。与所有预览版一样，请预期会有粗糙之处、缺失的部分以及可能导致崩溃的问题。

请在 Epic AI MegaJam 期间或在你项目的副本中测试它，并告诉我们你发现的错误：我们将在预览期间修复问题，智能体将帮助我们快速分类和处理报告。

#### **主要功能概览**

#### **Unreal MCP 更新（实验性）**

Unreal MCP 随编辑器自动启动，提供更可靠的连接，并扩展其工具集以支持渲染、源代码控制、性能分析、调试、游戏测试、几何体、音频、UI 和关卡创建。与 [Lore](https://lore.org/) 的新集成使 AI 智能体能够管理项目更改并自动化源代码控制工作流，而新的 Fab 工具集允许智能体搜索目录、浏览库并将免费或购买的资产直接安装到你的项目中。

#### **Unreal Assistant（实验性）**

在 Unreal Editor 内的编辑器助手面板中，直接使用你首选的 AI 编码智能体（包括 Claude Code、Codex、Cursor 或 OpenCode），并通过连接到 Unreal MCP 来简化 agentic 开发工作流。

#### **扩展的 Python 脚本支持**

通过扩展的 Python API 自动化更多 Unreal Engine 功能，涵盖音频、MetaSounds、建模、物理、Niagara、材质、PCG、网络和 UI。这些功能也扩展到了 AI 智能体，使它们能够在编辑器中直接执行更多任务。

#### **Unreal Canvas（实验性）**

通过 Unreal Canvas 探索 AI 辅助的内容创作，该功能可作为 Web 应用直接在 Unreal Editor 中使用。使用提示词、参考图像或你自己的场景生成概念艺术、图像、3D 网格和视频，同时保留构图和摄像机视角。通过连接的提示词和生成图跟踪你的创作过程。使用你自己的 API 密钥连接你选择的 AI 模型。

#### **在浏览器中运行项目（实验性功能）**

无需安装，即可将虚幻引擎体验直接带入 Web 浏览器。该实验性功能由 WebAssembly 和 WebGPU 驱动，使用移动端渲染器，目前需要源码构建和 C++ 项目，其中 Chrome 提供的体验最佳。随着开发的继续，预计构建时间（cook times）会较长，并可能出现偶尔的性能问题。

还有更多内容等待探索！请查看 [Unreal Engine 5.9 预览版](https://dev.epicgames.com/documentation/unreal-engine/unreal-engine-5-9-release-notes) 中的新功能，并查阅 **[UE 5.9 公共路线图](https://dev.epicgames.com/community/unreal-engine/roadmap)** 以获取更多信息。

* * *

请注意，预览版发布尚未经过完整的质量测试，仍处于活跃开发阶段，在最终版本发布前应被视为不稳定版本。建议您复制项目副本以测试这些构建版本，而不是直接转换您的项目。

如果您发现此预览版发布存在任何问题，请按照以下指南进行报告：[如何报告错误](https://www.unrealengine.com/en-US/support/report-a-bug)

---

<div class="post-metadata">

**作者:** ![Flak](https://d1ap1mz92jnks1.cloudfront.net/user_avatar/forums.unrealengine.com/flak/32/769441_2.png) [@Flak](https://forums.unrealengine.com/u/Flak)\
**发布日期:** [2026年11月9日，下午 2:07 UTC](https://forums.unrealengine.com/t/unreal-engine-5-9-megajam-preview/2852840/2 "2026-11-09T14:07:28Z")

</div>



---

<div class="post-metadata">

**作者:** ![RaghibK](https://d1ap1mz92jnks1.cloudfront.net/user_avatar/forums.unrealengine.com/raghibk/32/1220655_2.png) [@RaghibK](https://forums.unrealengine.com/u/RaghibK)\
**发布日期:** [2026年11月9日，下午 2:54 UTC](https://forums.unrealengine.com/t/unreal-engine-5-9-megajam-preview/2852840/3 "2026-11-09T14:54:59Z")

</div>

以下是虚幻引擎 5.9 Preview 1 版本中已知的问题，请予以注意。

**Mac/Linux 预编译/启动器构建**

**已知问题：**  
Mac 和 Linux 上的预构建版本缺少部分 Wasm（Web）支持文件。

**解决方法：**  
在 Mac/Linux 上使用源码构建来针对 Wasm 平台。目前计划于本周发布一个 [快速修复工程](https://forums.unrealengine.com/t/current-available-quick-fix-solutions/2829) (QFE) 构建版本。

### **Web 崩溃和数据丢失**

**已知问题：**  
UE-412003 - 重新加载时存档/设置丢失（启动器构建的 C++ Web 游戏）

**解决方法：**  
在页面参数（Page Args）中追加 `-project=../../..//.uproject`，保留现有参数，然后重新打包。对于已托管的构建版本，将其追加到 `index.html` 的 `ue-args` 标签中，并重新生成/删除 `index.html.br`。

**已知问题：**  
UE-411671 - 当 Wasm 内存超过 2 GB 时游戏崩溃。

**解决方法：**  
减少内容使用量，并遵循本页中的其他解决方法。

**已知问题：**  
UE-411514, UE-412029 - 由于内存使用量增加，移动设备在启动时可能会因强制多线程而崩溃/冻结。

**解决方法：**  
保持默认的单线程模式。使用启动器引擎时，请使用 Shipping（它使用的内存少得多），尽管它的开发功能较少（如游戏内控制台和大多数命令行选项）。源码构建可以使用 Test 配置，这可能是一个有用的“折中”方案。

**已知问题：**  
UE-412148 - iOS：5.9 Preview 1 的 Web 构建在 iOS 27 上效果最佳。在 iOS 26 的 WebKit 版本中，线程比 webKit 27 使用更多的内存。

**解决方法：**  
在 iOS 26 上：关闭项目设置 \> 平台 \> Wasm \> 线程和声音 \> iOS \> 音频线程（单线程）（bSingleThreadedAudioThread=False）并重新打包；或者，在不重新打包的情况下，使用 `?audiothread=0` 打开页面（或在 `index.html` 中将 `ue-audio-thread` 元数据设置为 0）；或者尝试 Shipping 构建，它将使用更少的内存，并且您可能在预算范围内同时拥有音频线程。无论哪种方式，声音都会保持开启。

**已知问题：**  
UE-411884 - 加载过程中手机旋转会导致图像/触摸控件失效。

**变通方法：**  
等待约 10 秒后再旋转，或者重新加载。

**已知问题：**  
UE-411441 - AMD 浏览器 GPU 在实验性桌面渲染层级上崩溃。

**变通方法：**  
使用默认渲染层级。

**已知问题：**  
UE-411439 - 在移动前向层级（手机使用的层级）上，反射捕获附近的金属和高光表面可能会渲染为黑色。

**变通方法：**  
开启项目设置 \> 渲染 \> 移动 \> 集群反射（在使用 ForwardShading 时），重启编辑器，并重新打包（cook）。移动延迟渲染层级不受影响。

**已知问题：**  
Android 手机和 iPhone 15 Pro 之前的 iPhone 不支持 BC/DXT 纹理支持。使用 BC 纹理打包的应用在这些手机上只会显示兼容性卡片。

**变通方法：**  
使用 ASTC 纹理进行打包（-cookflavor=ASTC 加上 -WasmAddTextureSet）以进行 iPhone 测试。建议：你可以使用 **web-texture-sets** LLM 技能来帮助制作双纹理构建。

**已知问题：**  
UE-411710 - 移动设备：返回前端后开始第二场 Lyra 比赛可能会因内存使用导致标签页崩溃。

**变通方法：**  
在比赛之间重新加载页面。

**已知问题：**  
UE-411672 - Web 上不支持 Bink 视频，在 Web 构建中调用 Bink 媒体播放器蓝图函数预计会导致崩溃。

**变通方法：**  
在 Wasm 上跳过 Bink 调用，例如通过 Get Platform Name 检查来屏蔽。

### **构建和托管阻碍**

**已知问题：**  
[itch.io](http://itch.io) 拒绝过大的浏览器游戏：总大小 500 MB，单个文件 200 MB。Lyra 和 Development 构建超过这些限制。

**变通方法：**  
使用 Shipping 并减少内容；否则请求更高的限制，使用其他主机，或提供可下载的构建。如果存在非 .br 版本的文件，也可以尝试移除 .br 文件——它们是可选文件，仅用于提高初始下载速度。

**已知问题：**  
UE-412027 - 使用 new\_template\_project.py --web-ready 创建的项目无法加入服务器，无论是通过 WebSocket 中继还是其他方式：Web 构建没有 IpNetDriver。

**变通方法：**  
在项目 .uproject 中，从 OnlineSubsystemUtils 和 OnlineSubsystemNull 的 PlatformDenyList 中移除 “Wasm”，然后从头开始重新打包（构建、cook 和 stage）。未使用 --web-ready 创建的项目不受影响。

**已知问题：**  
UE-411774 - Launcher 构建在使用 WebMinimal/DesktopMinimal 修剪配置时失败。

**变通方法：**  
移除 ApplyTrimProfile；在 .uproject 中配置插件，并使用支持的每个目标大小选项。

**已知问题：**  
UE-411525 - 增量打包在使用 -NoCleanStage 时可能会发布陈旧内容。

**变通方法：**  
移除该开关，或在内容更改后清理 staging 文件夹。

**已知问题：**  
UE-411308, UE-411939 - 从磁盘（file://）打开打包后的 index.html 会显示跨域隔离错误或托管卡片，而不是启动游戏。

**变通方法：**  
使用打包文件夹中的 Play\_.bat 启动游戏，或使用 python serve.py --root Wasm --port 8800 提供 staging 服务。

**已知问题：**  
UE-411973 - 下载中断后，该浏览器会话中的每次重新加载都会再次下载游戏（45-49 秒，而不是约 3 秒）。

**变通方法：**  
重启浏览器。

**已知问题：**  
UE-411974 - 从网络共享（UNC 路径）运行 Play\_.bat 失败，且没有服务器启动。

**变通方法：**  
将打包后的构建复制到本地文件夹。

**已知问题：**  
UE-412037 - Launcher 引擎：在 Target.cs 中更改 Wasm SIMD 或分配器设置（bSimd128, bSseEmulation, Malloc）将生成与 Launcher 中发布的代码不兼容的代码，这可能导致内存损坏或崩溃。

**变通方法：**  
使用 Launcher 引擎时，保持这些设置为其默认值；仅在从源代码构建的引擎中更改它们。

### **编辑器崩溃和破坏性脚本**

**已知问题：**  
UE-411502 - Python Blueprint 根节点交换可能导致编辑器崩溃。

**变通方法：**  
使用拥有所需根组件的 C++ 基类，而不是交换 Blueprint 添加的根节点。

**已知问题：**  
UE-410941 - 在脚本化 Deformer Graph 添加操作后执行“撤销”可能导致崩溃并丢失未保存的工作。

**解决方法：**  
通过 Deformer Graph 编辑器的“资源管理器 \> 添加”菜单添加变量/组件绑定；此手动路径支持“撤销/重做”。

**已知问题：**  
UE-411097 - 当选中注释框时，Dataflow 的“添加/移除选项引脚”操作会崩溃。

**解决方法：**  
避免方法：取消选中注释框，仅在更改引脚前选中相关的 Dataflow 节点。

### **AI 代理与 Unreal MCP 服务器**

**已知问题：**  
UE-412135 - 新建项目中 AI 代理无法编辑关卡：Unreal MCP 服务器默认开启，但 Toolset 插件（AllToolsets、EditorToolset、BlueprintToolsets、ConsoleToolset、LiveCodingToolset）处于关闭状态，因此 `list_toolsets` 不提供任何 actor、关卡、资产、Blueprint 或 Python 工具，且系统未告知代理原因。

**解决方法：**  
在连接代理之前，在“编辑 \> 插件”中启用所有 Toolsets，或者在 `.uproject` 文件中添加 `{ "Name": "AllToolsets", "Enabled": true, "TargetAllowList": ["Editor"] }`，然后重启编辑器并重新连接代理。每个项目只需执行一次此操作。

---

<div class="post-metadata">

**作者：** ![user\_b7524e9b77c9fbd47ad1797454da6c7df2b8695d6c7063b06bff7f](https://d1ap1mz92jnks1.cloudfront.net/user_avatar/forums.unrealengine.com/user_b7524e9b77c9fbd47ad1797454da6c7df2b8695d6c7063b06bff7f/32/1220552_2.png) [@user\_b7524e9b77c9fbd47ad1797454da6c7df2b8695d6c7063b06bff7f](https://forums.unrealengine.com/u/user_b7524e9b77c9fbd47ad1797454da6c7df2b8695d6c7063b06bff7f)\
**发帖时间：** [2026年11月9日，UTC 下午 3:57](https://forums.unrealengine.com/t/unreal-engine-5-9-megajam-preview/2852840/4 "2026-11-09T15:57:26Z")

</div>

沙发

---

<div class="post-metadata">

**作者：** ![Uprentiss](https://d3kjluh73b9h9o.cloudfront.net/original/4X/2/8/5/28502927f1d97ba1051b3b47ccfe17233bf41ef0.png) [@Uprentiss](https://forums.unrealengine.com/u/Uprentiss)\
**发帖时间：** [2026年11月9日，UTC 下午 5:49](https://forums.unrealengine.com/t/unreal-engine-5-9-megajam-preview/2852840/5 "2026-11-09T17:49:47Z")

</div>

文档部分做得很烂。用 AI 写文档且写得这么差，真是令人失望。我真希望你们不要什么都让 LLM 去做；我绝不会切换到这个平台。我和我认识的所有人都在考虑转投其他平台。作为一家公司，你们竟然没意识到有多少人正在考虑或已经离开，这对我来说简直不可思议。

---

<div class="post-metadata">

**作者：** ![Rossilaz](https://d3kjluh73b9h9o.cloudfront.net/original/4X/2/8/5/28502927f1d97ba1051b3b47ccfe17233bf41ef0.png) [@Rossilaz](https://forums.unrealengine.com/u/Rossilaz)\
**发帖时间：** [2026年11月9日，UTC 下午 6:33](https://forums.unrealengine.com/t/unreal-engine-5-9-megajam-preview/2852840/6 "2026-11-09T18:33:02Z")

</div>

相当悲剧

---

<div class="post-metadata">

**作者：** ![SilentGarud](https://d1ap1mz92jnks1.cloudfront.net/user_avatar/forums.unrealengine.com/silentgarud/32/1216315_2.png) [@SilentGarud](https://forums.unrealengine.com/u/SilentGarud)\
**发帖时间：** [2026年11月9日，UTC 下午 7:28](https://forums.unrealengine.com/t/unreal-engine-5-9-megajam-preview/2852840/7 "2026-11-09T19:28:39Z")

</div>

能够在编辑器内使用我们自己的代理正是我所期待的。通过截图来调试损坏的 Graph 简直痛苦不堪。

---

<div class="post-metadata">

**作者：** ![KryogenicGames](https://d1ap1mz92jnks1.cloudfront.net/user_avatar/forums.unrealengine.com/kryogenicgames/32/1201049_2.png) [@KryogenicGames](https://forums.unrealengine.com/u/KryogenicGames)\
**发帖时间：** [2026年11月9日，UTC 下午 9:17](https://forums.unrealengine.com/t/unreal-engine-5-9-megajam-preview/2852840/8 "2026-11-09T21:17:56Z")

</div>

哈哈，与其完善实验性插件并修复性能 bug，我们却得到了更多 bug :D:D

---

<div class="post-metadata">

**作者：** ![Recon0303](https://d3kjluh73b9h9o.cloudfront.net/original/4X/2/8/5/28502927f1d97ba1051b3b47ccfe17233bf41ef0.png) [@Recon0303](https://forums.unrealengine.com/u/Recon0303)\
**发帖时间：** [2026年11月9日，UTC 下午 9:29](https://forums.unrealengine.com/t/unreal-engine-5-9-megajam-preview/2852840/9 "2026-11-09T21:29:03Z")

</div>

</div>

作为一名长期的专业用户，我们的许多客户已经离开 Unreal 并且正在继续离开……他们从未完成过 5 的开发，而在 5.8 中我们看到了更多的引擎 Bug，我们知道 5.9 除了增加我们客户的成本以及让我们花费更多工作去修复问题外，不会提供任何有价值的东西……这些人根本不懂行。这就是为什么我们在行业中与许多引擎合作，自 Unreal 的第一个版本以来我一直如此，而这将是我最后一次……这简直是一种耻辱。

附注：我很少发帖，但我对 Epic 感到极度厌恶，他们显然只想做 FLASH 2.0、ROBLOX 2.0 以及重制版、克隆品之类的东西……我这一年来一直在说这一点，现在这更让我确信……玩家正在拒绝这种垃圾。Epic 将会为此付出惨痛的代价。

我已经不得不起诉了几个人，因为他们窃取了我公司的作品……而 Epic 有着双重标准，一旦有人接触他们的东西，他们就会拒绝，但他们却对我们作品被窃取无动于衷……而且 Epic 对 Steam 感到愤怒，如果 AI 真的那么棒，你们应该自豪地说“由 AI 制作”，而不是隐藏它……

但谢谢 Epic，你和你们其他人让我们这样的公司过得不错，通过修复所有可怕的 Bug……我们知道会发生这种情况，这也是我们扩展业务的原因，谢谢 Epic 和其他不断推动 AI 的人。你们让我们赚得盆满钵满，而整个行业却不再产出任何好的东西，我们在游戏的衰退中看到了这一点……

我个人的项目，我在 Unreal 中仅有的几个项目，几周前就被移除了，我知道这是怎么回事，这不是我想要支持的东西。AI 本身不是问题，问题在于 Epic 如何使用它，以及他们不断推出的垃圾。我不支持它，看着许多前 Epic 开发者，他们因为同样的原因离开了，我和其中一些人聊过……看到如此优秀的东西被那些根本不懂行的人毁掉，真是令人难过，他们以为我们想要回到 2016 年的样子，这显示了 Epic 与现实脱节到了何种程度。

---

<div class="post-metadata">

**作者:** ![DavidTveraas](https://d1ap1mz92jnks1.cloudfront.net/user_avatar/forums.unrealengine.com/davidtveraas/32/1058281_2.png) [@DavidTveraas](https://forums.unrealengine.com/u/DavidTveraas)\
**发帖时间:** [2026年11月10日，UTC 凌晨 1:31](https://forums.unrealengine.com/t/unreal-engine-5-9-megajam-preview/2852840/10 "2026-11-10T01:31:17Z")

</div>

Epic MegaAI Jam 的参与者是否被期望/鼓励使用 5.9 预览版参加 Epic AI MegaJam？还是说 5.8 也可以接受？

---

<div class="post-metadata">

**作者:** ![RYRY1002](https://d1ap1mz92jnks1.cloudfront.net/user_avatar/forums.unrealengine.com/ryry1002/32/969704_2.png) [@RYRY1002](https://forums.unrealengine.com/u/RYRY1002)\
**发帖时间:** [2026年11月10日，UTC 凌晨 1:35](https://forums.unrealengine.com/t/unreal-engine-5-9-megajam-preview/2852840/11 "2026-11-10T01:35:48Z")

</div>

这相当可悲。

从基础说起：代码质量差，文档匮乏且语气不确定。

来自 [Lumen World Cache 文档](https://dev.epicgames.com/documentation/unreal-engine/lumen-world-cache-in-unreal-engine)：

> 5.9 的变更日志报告了相对于 Surface Cache 的这些优势：  
> […]  
> 变更日志报告这使得光线采样更快且噪点更少。

你们甚至不再校对你们自己的文档了。更不用说新页面上没有任何图片。

除此之外，Epic 继续优先添加新的 beta 和实验性功能，而这些功能从未完成，而不是构建 LTS 版本并修复引擎和引擎插件中长期存在的问题（Water 仍然是实验性的，自 4.27 以来，5 年前就没有更新过）。

如果 Unreal 要在长期内保持作为一个可行的产品，Tim 需要离开 Twitter，参与实际 Unreal 开发者之间的讨论，而不是仅仅与那些阿谀奉承的 Twitter 机器人互动。

---

<div class="post-metadata">

**作者:** ![gk0r](https://d3kjluh73b9h9o.cloudfront.net/original/4X/2/8/5/28502927f1d97ba1051b3b47ccfe17233bf41ef0.png) [@gk0r](https://forums.unrealengine.com/u/gk0r)\
**发帖时间:** [2026年11月10日，UTC 凌晨 4:28](https://forums.unrealengine.com/t/unreal-engine-5-9-megajam-preview/2852840/12 "2026-11-10T04:28:00Z")

</div>

这是一个令人惊叹的变革，我非常喜欢你们工作的方向。我不明白为什么人们会忍不住发表负面评论。这对行业以及当前和未来的游戏开发者来说都是极好的消息。这一影响将是巨大的，那些写“唱衰文章”的人要么在 6 到 12 个月后后悔，要么变得无关紧要。如果是后者，他们可能今天就已经无关紧要了。

---

<div class="post-metadata">

**作者:** ![Rawalanche](https://d1ap1mz92jnks1.cloudfront.net/user_avatar/forums.unrealengine.com/rawalanche/32/906578_2.png) [@Rawalanche](https://forums.unrealengine.com/u/Rawalanche)\
**发帖日期:** [2026年11月10日，上午 8:41 UTC](https://forums.unrealengine.com/t/unreal-engine-5-9-megajam-preview/2852840/13 "2026-11-10T08:41:45Z")

</div>

![image](https://d3kjluh73b9h9o.cloudfront.net/original/4X/3/9/4/394c55d91687c7dc2f1682042be0b224ed5d1292.jpeg)

至少在过去的两年里，我一直在为使用 AI 工具辩护，即使是在对 AI 充满敌意的社区中。我试图提出合理的论点。最近，我甚至因为拒绝停止提出合理的 AI 支持论点而导致讨论持续进行，从而被 BlenderArtists 论坛上一位反 AI 活动家版主禁言两周。

我的主要论点之一是，AI 只是一种工具。产生“垃圾内容”（slop）的不是工具本身，而是工具的使用者。在 AI 出现之前我们就有垃圾内容，只是现在有了 AI 之后垃圾内容更多了。垃圾内容是缺乏努力和用心的产物。

因此，作为一个 AI 技术爱好者，希望它变得更好，并希望看到它在引擎中有更多应用，我很难说出这样的话，但 Unreal Canvas 编辑器看起来就像是一堆垃圾内容。乍一看，它表现出低努力和缺乏用心的迹象。似乎没有任何负责保持 UI 设计和设计语言一致性的 UI 设计人员对它进行过审查。它看起来只是为了与其他引擎竞争而临时匆忙塞进去的。

我甚至还没有使用过它，但我已经可以预测，只要它打开（即使在另一个显示器上），它就会导致关卡编辑器的 FPS 下降超过一半。这里有太多随机混合的设计语言和 UI 元素风格。它看起来就是一堆垃圾内容。

如果 Epic 真的想改变人们对 AI 工具的看法，他们应该以身作则。这些工具应该用于倍增 Epic 开发人员投入引擎功能中的努力和用心，而不是将其分散。我们不应该陷入重数量轻质量的陷阱。

这些工具的进步如此迅速，以至于如今，对于小团队甚至个人来说，完全自定义且没有不必要冗余的游戏引擎在某种程度上已成为可能。唯一的瓶颈变成了一个人必须在提示框前花费多少时间、努力和用心，经过数周的打磨，使每一个细节、设计、性能和用户体验都达到卓越水平，从而使最终结果成为使用的乐趣。如果 Epic 不这样做，那么引擎可能在几年内就会变得无关紧要。

---

<div class="post-metadata">

**作者:** ![Driver2579](https://d3kjluh73b9h9o.cloudfront.net/original/4X/2/8/5/28502927f1d97ba1051b3b47ccfe17233bf41ef0.png) [@Driver2579](https://forums.unrealengine.com/u/Driver2579)\
**发帖日期:** [2026年11月10日，上午 11:07 UTC](https://forums.unrealengine.com/t/unreal-engine-5-9-megajam-preview/2852840/14 "2026-11-10T11:07:40Z")

</div>

没人喜欢你们的 AI 垃圾内容。把 AI 当作帮助你编写代码的工具是可以的，但把引擎毁成一种靠“氛围编码”（vibe-coded）生成的 AI 垃圾内容是非常糟糕的……

---

<div class="post-metadata">

**作者:** ![stevencasteel](https://d3kjluh73b9h9o.cloudfront.net/original/4X/2/8/5/28502927f1d97ba1051b3b47ccfe17233bf41ef0.png) [@stevencasteel](https://forums.unrealengine.com/u/stevencasteel)\
**发帖日期:** [2026年11月10日，上午 11:08 UTC](https://forums.unrealengine.com/t/unreal-engine-5-9-megajam-preview/2852840/15 "2026-11-10T11:08:20Z")

</div>

我用 Claude 5.5 配合 Computer Use 和 MCP 在 Blender / Godot 中进行了测试，效果非常好。

Unreal Engine 目前对我来说还是太重了，不太符合我的计划。而 Unity 的 AI 进展虽然很酷，但他们的做法让人难以信任。与 Godot 不同，UE 和 Unity 都存在许可限制。

我认为在当前阶段，基于过程代码的建模和 three.js 可能是通往 Steam 发行的最佳 3D 路径。

但我依然为你们加油！最近几周我非常喜欢 Tim Sweeney 在 X 上关于 AI 的帖子。我也很喜欢你们的《星球大战》环绕视频屏幕 / VR 技术。

---

<div class="post-metadata">

**作者:** ![Bencsizy](https://d3kjluh73b9h9o.cloudfront.net/original/4X/2/8/5/28502927f1d97ba1051b3b47ccfe17233bf41ef0.png) [@Bencsizy](https://forums.unrealengine.com/u/Bencsizy)\
**发帖时间:** [2026年11月10日，上午11:57 UTC](https://forums.unrealengine.com/t/unreal-engine-5-9-megajam-preview/2852840/16 "2026-11-10T11:57:59Z")

</div>

请先修复那些一直毒害日常引擎使用的问题，而不是“用 AI 进行情绪化地开发新功能”。有些引擎 bug 几年都没修，有些功能几年后仍然标记为实验性，你们对此有什么解释？

为什么你们不听开发者的声音，去修复开发者们长期以来请求的关键问题，反而去开发没人要求的 AI 相关功能？

---

<div class="post-metadata">

**作者:** ![Miguel1900](https://d1ap1mz92jnks1.cloudfront.net/user_avatar/forums.unrealengine.com/miguel1900/32/1010694_2.png) [@Miguel1900](https://forums.unrealengine.com/u/Miguel1900)\
**发帖时间:** [2026年11月10日，下午1:10 UTC](https://forums.unrealengine.com/t/unreal-engine-5-9-megajam-preview/2852840/17 "2026-11-10T13:10:25Z")

</div>

新版 Epic Games Launcher 中并没有显示。最新版本是 5.8。
