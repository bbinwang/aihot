---
title: "开箱即用、省钱省电，速度飞快  苹果APP应用接入AI 不一定非要用顶级模型"
date: 2026-11-01T00:00:00.000Z
tags: ["产品发布", "Apple", "Swift", "开源模型", "语音识别", "AI应用", "聚合"]
summary: "AnySpeechRecognizer 让开发者更换听写引擎、标注发言人；AnyDecisionModel 直接返回选项、概率和评分。从一通客服电话，看应用怎样按任务选择模型和处理方式。"
---
> **原文链接**: [https://huggingface.co/blog/anydecisionmodel](https://huggingface.co/blog/anydecisionmodel)
> **来源**: huggingface.co
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/apple-speech-decision-models/) · 2026/11/1
> **说明**: 本文由 AIHot 自动聚合(原文即中文,未翻译)。正文取自小互 AI 解读

---

全文 Markdown · 会员

作者：Mattt / Hugging Face11-01 · 15 分钟⚑ 产品发布![](https://pic.xiaohu.ai/jiedu-media/apple-speech-decision-models/social/zh-0088becede7e.png)

给应用接入 AI 时，一个很直接的做法，是把各种需求都交给同一个“万能”大模型。比如用户打来客服电话：“订单被扣了两次钱，申请退款时又被退出登录。”应用先让模型听录音、转成文字，再让它判断该交给哪个部门。

这种“一包到底”的方式看起来省事，却可能像开着重型卡车送一份外卖：任务做成了，也动用了本来可以省下的计算和内存。分类还要再从模型写出的文本中提取部门名；如果用云端服务，还会产生调用费用和网络等待。

听写要的是文字，分流要的是一个部门选择。按任务选模型、换一种取结果的方式，就有可能更快拿到需要的答案，也减少不必要的开销。

开发者 Mattt 发布的两个开源工具包，让苹果应用更方便地接上这两种能力：**AnySpeechRecognizer** 让听写可以换模型，并增加发言人标注；**AnyDecisionModel** 让分类和打分直接返回选项与概率，程序拿到结果就能继续处理。

这延续了他此前的 AnyLanguageModel 的思路：开发者使用熟悉的 Swift 接口，底下的模型可以按需要选择。两个新工具可以前后接力，也能各自使用——会议记录可以只接语音包，已有的文字工单可以直接交给决策包。

---

### 先听清对话：听写能换“发动机”，也能标出谁在说话

苹果在 macOS 26 和 iOS 26 中提供了新的听写接口 `SpeechAnalyzer`。应用把录音文件或持续传来的音频交进去，就能陆续拿回转写文字。

这套接口底下用的是苹果自己的识别引擎，也没有区分发言人的模块。开发者想换一种语音模型，或者给对话加上发言人标签，还需要另外处理。

AnySpeechRecognizer 保留了相近的调用方式，让底下的识别引擎可以替换。就像沿用原来的操作面板，按用途换一台发动机，后面的提交音频、读取结果流程仍然熟悉。

#### 换哪种模型？先看要听什么语言、怎样拿结果

这些语音模型已经转换成苹果设备可运行的 Core ML 格式。模型文件由应用主动请求下载，开发者可以按需要选择：

- **Parakeet 系列**：NVIDIA 的 **Parakeet v3** 支持 25 种欧洲语言并能自动识别语种；Moondream 后训练的 **Parakeet Ultra** 在多数测试中识别更准确；NVIDIA 的 **Parakeet Unified** 则专用于英语。这三个变体均支持文件与实时音频输入，能一边听一边交回临时文字，再随着后续声音修正；还会给每个词标出出现的时间和识别置信度。
- **Qwen3-ASR**：阿里巴巴开源的语音模型，支持 30 种语言与 22 种中文方言，包括普通话、粤语，也覆盖日语、韩语等 Parakeet 不支持的语种。它按段交回最终文本，每段最长 40 秒，不提供临时文字、逐词时间或转写置信度。当前解码运行在 GPU 上，比 Parakeet 慢，更适合转写现成的音频文件。

例如，英文或欧洲语言的实时听写，可以选 Parakeet；一份中文或粤语录音，则可以交给 Qwen3-ASR。选哪个，还取决于应用要边听边显示文字，还是能等一段录音处理完再看结果。

#### 一段录音，怎样分清是哪一个人在说话？

回到客服电话。只拿到“重复扣款”“我查一下”这些文字还不够，应用还要知道哪些话出自同一位发言人。这项能力叫说话人分离。

AnySpeechRecognizer 为此增加了 `SpeakerDiarizer` 模块，使用 NVIDIA 的 **Streaming Sortformer** 模型，在本地追踪最多 4 位发言者。它提供 v2 和使用更多会议数据训练的 v2.1 两个版本。

两路处理同一份声音，再把结果按时间拼起来：

1. **把同一份录音交给两路**：同一个分析器接收音频输入，同时传送给转写模块（如 Parakeet）和说话人分离模块（Sortformer）。
2. **给每个词标上时间**：转写引擎在识别出每个词时，输出该词在音频中的起止时间范围（例如教学示意：“扣款”出现在 1.1–1.6 秒）。
3. **标出各人的发言时段**：Sortformer 同步计算各位发言者的活跃时间线。当两人同时说话时，会输出重叠的时间区间（例如教学示意：发言人 0 在 1.0–3.0 秒发言，发言人 1 在 2.0–4.0 秒发言）。
4. **按重叠时间，把词标给发言人**：`SpeakerTimeline` 汇总时间线，比对每个词的时间范围与哪位发言者的活跃区间重叠最多，将该词归入重叠时间最长的发言人。

这句话是谁说的？把两条时间线对齐

一边记录词和它出现的时间，一边标出各人的发言时段。比较两边的时间，就能把词标给相应的发言人。

0 秒12345 秒*发言人 0**发言人 1*

点一个词，看它落在哪个人的发言时段里

**“重复” · 0.5–1 秒**

与发言人 0 重叠 0.50 秒；与发言人 1 重叠 0.00 秒。

该词与发言人 0 的区间重叠最多，标给发言人 0。

轮流说话时，词的时间通常只落在一人的发言区间里。

教学示意：词、时间与区间均为假设。当前按词归属需要 Apple 或 Parakeet 提供词级时间；Qwen3-ASR 暂不提供。标记发言人不能补回漏转写的词，也不会自动识别真人姓名。

这条按词归属发言人的路径，需要转写器先给出每个词的时间，因此当前要配合 Apple 或 Parakeet 使用。Qwen3-ASR 另有一个给每个词补上出现时间的强制对齐模型，但这个包还没接入，暂时无法用它完成这一步。此外，Sortformer 用会话内编号标记发言人（如发言人 0、发言人 1），这些编号不会自动变成客户、客服等角色或真人姓名；若两人重叠发言时转写引擎漏识别了较弱的声音，分离模块也无法补回缺失的文本。

---

### 工单交给谁？让模型直接给选项和概率

录音转成文字后，应用就能拿这段内容继续做判断。例如开头那句：“订单被扣了两次钱，申请退款时又被退出登录。”

应用预先列好可分配的部门和评分等级，再围绕这张工单问三道题：

1. **“这句诉求是否紧急？”**（是非判断）
2. **“工单应分配给账单组、技术组还是销售组？”**（有限单选）
3. **“按平静、沮丧、很生气三个等级，客户有多不满？”**（有序分级）

常见做法是让语言模型回答“建议交给账单部门”，再由程序从文本或 JSON 里提取部门名。AnyDecisionModel 让应用直接拿到选中的部门，以及各部门分别有多大概率。省去生成回答、再提取标签这一步，结果也更方便交给代码处理。

三道题拿回的结果各不相同：

- **急不急**：返回“紧急”成立的概率，是一个 0 到 1 的数；
- **交给谁**：返回概率最高的部门、各部门的概率，以及反映概率集中程度的置信度；
- **有多不满**：把上面三档依次编号为 0、1、2，再按各档概率加权，返回一个可能落在两档之间的平均值；同时给出各档概率和置信度。这个平均值叫期望等级，和只选概率最高的一档不同。

例如，工具返回的是预先定义好的“账单组”这个部门值，程序就把工单送入账单处理流程。模型负责判断，应用负责执行分流。

这种固定返回类型的方式叫强类型：程序知道拿到的一定是允许的部门值，不必从自由文本里抓标签。但如果模型把这张退款工单交给销售组，格式虽然合规，事情仍然办错了。**程序能接住答案，与模型选得正确，是两件事。**

#### 不写回答，模型怎样给出这些概率？

在本地运行时，可以继续用通用语言模型，也可以使用专门训练来做判断的模型。两种方式取得答案的位置不同。

##### 沿用通用语言模型：读出 A、B、C 的分数

例如开源的 Qwen3-4B，仍然是一个 40 亿参数的通用语言模型。MLX、Core AI 和 llama.cpp 这几种本地运行方式，会借用它原本就有的下一词预测能力。

语言模型准备写下一个词时，会先给候选词打分。把账单、技术、销售分别标成 A、B、C，再把工单、问题和选项一起交给模型，它就会算出这些字母下一步出现的分数。

AnyDecisionModel 在这里取出 A、B、C 的分数，换算成三个选项的相对概率，然后停下来，不再继续生成回答。这一次把输入送进模型计算的过程，就叫一次前向计算。

（候选词的原始分数叫 logits；把选项分数换算成概率的计算叫 softmax。）

##### 使用专门训练的输出部分：直接给出各题判断

Cloudflare 的 Clef 则有一部分专门训练来输出判断，这部分叫“决策头”。

对于同一张工单，它可以在一次前向计算中，把“急不急”“交给谁”“有多不满”这一组问题一起算完，直接给出各题的选项概率。前一种方法从“下一个词是什么”的分数里取答案；这一种从专门负责判断的输出部分取答案。

这个工具包通过 MLX 接入 Clef-Flash。虽然 Clef 本身能读图像和视频，当前这个后端只接受文本和 JSON。

同一张工单，三种取答案的方法

用户说：“订单被扣了两次钱，申请退款时又被退出登录。”应用需要在账单、技术、销售部门里选一个。

**先写答案，再提取部门**读工单 → 逐词生成建议 → 程序提取部门

模型先组织一段回答，应用再处理文本格式和解析。

**通用模型：读出各部门的分数**把部门对应到 A / B / C → 计算下一词分数 → 取出选项概率

仍可用 Qwen3 4B。借用它的下一词预测，得到概率后不继续生成答案。

**专门训练的输出部分：直接给判断**读工单与整组问题 → 专门训练的判断输出部分 → 各题选项概率

Clef 的决策头专门为判断任务输出概率，可一次计算同一工单的多道题。

后两条是本地取结果的不同路径。它们返回的部门值都由应用用来分流；模型不直接操作客服系统。

模型更偏向一个部门，就一定选对了吗？

以下用假设分数演示。“温度”是控制概率分布集中或平缓的参数；拖动时没有重新判断工单，也不调用真实模型。

温度 1.0

A · 账单 billing87.7%
B · 技术 technical10.7%
C · 销售 sales1.6%

程序拿到的部门：`.billing`　分布置信度：**61.6%**

程序收到部门值后，可以进入账单处理分支；是否直接处理或转人工，由应用的业务规则决定。

温度调高，会让这些示意分数对应的概率更平缓；它没有补充任何新事实，因此无法单凭分布变化证明答案更准确。

计算采用示意分数的 softmax；置信度按 1 − H(p) / ln(3) 计算。真正校准需在一份数据上拟合，再用另一份数据评估。

---

### 输入“冬天穿的东西”，图标为什么会浮起来？

**Emoji Magnet** 是官方提供的 macOS 示例应用。它把同样的判断能力用在了一个看得见的地方：挑出符合描述的表情图标。

应用界面上方是一个文本输入框，下方堆叠着 343 个 Emoji 图标。在输入框中输入 `"things you wear"`（穿戴之物）并稍作停顿，符合描述的衣物图标便会向上浮起排列；若将描述进一步修改为 `"things you wear in winter"`（冬季穿戴之物），不再符合描述的图标便会落回底部，符合条件的冬装则继续保持在上方。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/apple-speech-decision-models/emoji-magnet.mp4)

Emoji Magnet 应用根据输入的语义短语动态筛选 343 个表情符号（原作者演示采用云端 Jev 后端）。

整个筛选过程没有预设的关键词对照表，而是由程序与模型协同完成：

1. **逐题构造**：输入短语后，程序为词库中的 343 个 Emoji 各自构造一道是非题（例如判断“大衣符合‘冬季穿戴之物’这一说法是否成立”）。
2. **模型给出概率**：模型为每个图标计算出一个代表“符合描述”的概率。
3. **程序判定**：示例设定了明确的业务规则——概率大于 0.50 的图标加入吸附名单。
4. **程序执行动画**：界面中的 SpriteKit 物理引擎根据名单施加弹簧拉力，让符合条件的图标向上浮起，其余图标则在重力作用下自然下坠。

模型给概率，程序让图标动起来

冬衣 🧥 符合“冬天穿的东西”吗？拖动假设的匹配概率，看程序怎样让它上浮或回落。这里不调用真实模型。

匹配概率 0.82
**0.82 ＞ 0.50**应用把冬衣加入匹配名单**显示层让它上浮**
匹配项的目标区域底部图标堆🧥

官方示例的规则是概率严格大于 0.5 才匹配，等于 0.5 也不匹配。阈值是应用规则，上浮和回落是程序动画；这个阈值不是其他业务的推荐值。

在这个流程中，AI 负责给出概率，应用按自己的规则决定图标怎样动。

这段演示走云端，也可以换成本机运行，速度和条件各不相同：

- **云端 Jev 后端**：在原作者演示中通过专用服务单次请求处理全部 343 道题，图标稳定下来耗时约 0.5 秒。
- **本地 MLX 后端**：在本地运行 Qwen3 4B，模型必须先下载并加载完成；准备就绪后完全在本地离线运行，无需 API Key。在该示例的配置下，同一个短语只处理一遍，并把这部分计算保存下来，供后面的独立问题复用，这叫前缀缓存。程序再把 16 道独立题分成一批并行计算：在 M4 Max 芯片上每批约 0.45 秒，完整判定 343 个图标约需 10 秒，每算完一批就更新一批图标。

---

### 模型很有把握，就一定选对了吗？

回到工单分流。程序拿到了部门和概率，还要决定这次结果能否直接采纳，还是交给人工复核。

工具给本地选择和评分附带的置信度，衡量的是概率有多集中：大部分概率押在一个部门上，数值就高；几个部门难分高下，数值就低。模型也可能很自信地押错部门，所以这个数值不等于答案正确的概率。Jev 等服务可能采用不同的置信度公式，也不能拿不同后端的数字直接比高低。

校准的目标，是让模型报出的概率更贴近已标注数据里的实际表现。开发者可以拿一批已经由人工分好部门的历史工单，对照模型的概率和真实答案，用 `Calibration` 拟合参数：“温度”控制分布有多集中或平缓；二元题的偏置调整回答“是”或“否”的倾向。

这些调整改变的是概率表达。调好后，还要换另一批工单检查错误率，再决定什么情况自动分流、什么情况交给人工。同一批数据既调参又证明效果，会高估实际表现。

模型还可能偏爱排在前面的选项。对读取下一词概率的后端，开启 `rotationDebiasing` 后，工具会把选项轮换位置、分别计算，再取平均概率。这样可以缓解位置偏好，代价是多算几轮：三个选项就要计算三次。

还可以检查“允许答案的概率总量”（allowed-answer mass）。例如，模型给 A、B、C 之外的词分配了大部分概率，即使 A 在这三个字母内部排名第一，也值得再检查。这项诊断让开发者看见：模型究竟把多少概率放在允许的答案上，避免只盯着三个选项内部的高低。

---

### 跑在自己设备上，要多快、占多少内存？

原作者在搭载 M4 Max 芯片的 Mac Studio（macOS 27.0.1）上，使用 `hear` 命令行工具测试了语音相关模型的资源消耗与识别表现。

- **Parakeet**：0.6B（约 6 亿参数）的基础模型下载约 600 MB，实时编码器另约 590 MB。Core ML 编译后常驻内存约 100 MB，编译期间峰值约 680 MB。转写一小时音频在文件模式下耗时约 20–40 秒；在实时模式下处理已有音频约需 1.5–2.5 分钟。
- **Qwen3-ASR**：0.6B 与 1.7B 两种规格，下载约 0.9 GB 和 2.4 GB，推理内存约 1.7 GB 和 4.4 GB，解码运行在 GPU 上。作者测得每小时音频约需 8–21 分钟处理时间。
- **Sortformer**：模型下载体积约 246 MB。在神经引擎（cpuAndNeuralEngine）模式下内存占用约 135 MB，在 GPU（cpuAndGPU）模式下约 530 MB。这些内存要在转写器之外另计。

下载体积和运行内存是两回事，选不同引擎需要的资源也不同。决策模型同样有大有小：Clef-Flash 是 9B（90 亿参数）版本，4-bit 文件下载约 6.2 GB，模型卡建议使用至少 16 GB 内存的 Mac。

在 3–8 分钟的 LibriSpeech test-clean 干净朗读音频测试中，Parakeet v3 文件模式的词错误率（WER）为 1.55%，实时模式为 4.73%；Apple 原生转写器文件模式为 2.12%。在这些已有音频的测试中，文件模式处理得更快，词错误率也更低；实时模式的用途则是让应用在声音持续传来时陆续显示文字。

（live 模式的 1.5–2.5 分钟是处理已有音频的计算耗时；如果现场收音，仍要等实际声音传来。）

面对多人重叠发言的会议录音（AMI 测试集），所有受测转写引擎的词错误率均超过 23%。在同一分析器中配合 Parakeet v3 运行时，Sortformer 的说话人分离错误率（DER）为：v2 版本 25.73%，加入更多会议数据训练的 v2.1 版本为 23.42%。
这也解释了为什么试用时要放进真实会议：干净朗读里的低错误率，不能直接代表多人抢话时的效果。

---

### 开发者怎样把它们接进应用？

#### 先确认系统、设备和依赖

- **基础环境**：两个工具包均要求 Swift 6.2 或更高版本，以及 macOS 26+ 或 iOS 26+。本地运行的 Parakeet、Sortformer 与 MLX 后端需要 Apple Silicon 设备。
- **构建工具**：AnyDecisionModel 的 MLX 特性构建需要 Xcode 的 Swift 6.4+ 与 Metal 工具链（可通过 `xcodebuild -downloadComponent MetalToolchain` 获取）；Core AI 特性需要 Xcode 27 构建并在 macOS 27 或 iOS 27 运行。
- **真机与系统测试范围**：AnySpeechRecognizer 目前仅在 macOS 27 上完成了实测，在实体 iPhone、系统版本 26 以及最低 Swift 6.2 工具链上的表现尚未实测验证。
- **依赖冲突注意**：AnyDecisionModel 的 `CoreAI` 特性依赖 `coreai-kit 0.7.3`（要求 `swift-huggingface < 1.0`），而 AnySpeechRecognizer 要求 `swift-huggingface 1.x`，两者的这些特性目前无法在同一个工程中混用。

#### 判断放在本机，还是交给服务？

“后端”指应用实际调用模型的那一层：有的直接在设备上跑模型，有的连接本机或云端服务。AnyDecisionModel 提供六种选择：

1. **MLX**：通过 mlx-swift-lm 在 Apple Silicon 本地运行开源语言模型（如 `Qwen3-4B-Instruct`），从单次前向的下一词概率读取答案。
2. **MLX decision heads**：在本地运行自带训练决策头的模型（如 `mlx-community/clef-flash-4bit`）。
3. **Core AI**：在 macOS 27 和 iOS 27 上运行 Core AI 语言模型包。
4. **llama.cpp**：通过 llama.swift 在本地运行 GGUF 格式的模型文件。
5. **Jev**：调用 TypeSafe Jev 的 System One 云端 API，或兼容该接口的本地服务（如 Kev）。
6. **Ollama**：调用本地 Ollama（需 0.35.0+）或其云端服务（需 0.40.5+）中的决策模型。

该工具包使用 Swift 特性（traits）管理依赖。不启用任何本地 traits 时，核心库没有第三方依赖，仅提供核心类型以及 Jev 和 Ollama 后端，并可在 Linux 上构建。本地后端需按需开启 `MLX`、`CoreAI` 或 `Llama` 特性。

在选项数量上，基于下一词预测的后端采用单 Token 标签（yes/no、A–Z、0–9），单选最多支持 26 个选项，评分最多支持 10 个等级；自带决策头的模型则不受此限制。

#### 沿用熟悉的接口，把结果交给业务代码

语音包对应苹果的现代 Speech API：使用共享 API 的代码可以替换 `import Speech` 为 `import AnySpeechRecognizer`，默认仍用苹果引擎；选 Parakeet 等模型时，再改创建转写器的配置。旧版 `SFSpeechRecognizer` 不在兼容范围。

决策包没有一套苹果现成的决策接口可以直接替换，它借鉴的是 Foundation Models 和 AnyLanguageModel 的“模型＋会话”写法。`DecisionSession` 持有一份不可变的状态（支持文本或 JSON 格式，可调用 `prewarm()` 预先加载模型并处理状态）。同一个会话中的各项问题相互独立，先前的回答不会成为后续问题的输入；多个问题也可以通过 `decide(_:)` 一次性传入数组批量提问。

```swift
import AnyDecisionModel

enum Department: String, Choosable {
    case billing, technical, sales

    var optionDescription: String? {
        switch self {
        case .billing: "payments, charges, refunds, invoices"
        case .technical: "bugs, outages, errors, login problems"
        case .sales: "pricing questions, upgrades, new purchases"
        }
    }
}

let ticket = "I was charged twice for my order, and now the app logs me out when I try to ask for a refund."

let model = MLXDecisionModel(modelID: "mlx-community/Qwen3-4B-Instruct-2507-4bit")
let session = DecisionSession(model: model, state: .text(ticket))

let urgent = try await session.probability(of: "Does this convey urgency?")
let team = try await session.choice("Which team?", from: Department.self)
let anger = try await session.score(
    "How frustrated?",
    levels: ["Calm", "Frustrated", "Very angry"]
)
```

上述调用中，`urgent` 返回一个浮点数；`team` 返回 `Choice<Department>` 结构体（包含选中的枚举值 `team.value`、各选项概率及置信度）；`anger` 返回 `Score` 结构体（包含期望等级、各级概率及置信度）。

在 `Package.swift` 中声明依赖：

```swift
dependencies: [
    .package(url: "https://github.com/mattt/AnySpeechRecognizer", from: "0.1.0"),
    .package(
        url: "https://github.com/mattt/AnyDecisionModel",
        from: "0.6.0",
        traits: ["MLX"]
    ),
]
```

回到那通客服电话，应用先要得到文字和发言人标注，再取得部门选择和概率。AnySpeechRecognizer 让开发者按语言和结果形式选听写引擎，AnyDecisionModel 让程序直接接住判断，继续处理工单。

原先交给一个通用大模型统包的流程，由此多了按任务拆开处理的选择。可以只用其中一个工具，也可以把它们串起来；具体选哪个引擎、决策放在本机还是服务、何时转人工，则由应用的需求、设备和验证结果决定。

来源Introducing AnySpeechRecognizer and AnyDecisionModel: Open Models for Speech and Decisions on Apple PlatformsMattt·2026-10-29·[查看主材料](https://huggingface.co/blog/anydecisionmodel)延伸[AnySpeechRecognizer · 项目说明与测试](https://github.com/mattt/AnySpeechRecognizer)·[AnyDecisionModel · 项目说明](https://github.com/mattt/AnyDecisionModel)·[Emoji Magnet · 官方示例源码](https://github.com/mattt/AnyDecisionModel-Examples/tree/main/Examples/EmojiMagnet)·[选择与评分结果 · 官方源码](https://github.com/mattt/AnyDecisionModel/blob/66b2fe218989c26e53267b91271278256863f8a7/Sources/AnyDecisionModel/Answer.swift)

Apple Platforms · Speech & Decisions

## 听写换引擎，分类给概率：苹果平台的端侧模型接力

Mattt 开源 AnySpeechRecognizer 与 AnyDecisionModel，让应用按需选择听写引擎与发言人标注；判断既可读通用模型的选项分数，也可用专门训练的决策头，返回选项、概率与评分。
线索梳理：大模型全包的算力损耗 → 语音双轨时间线重叠对齐 → 核心机制：读下一词分数，或用专门决策头 → 概率驱动物理动效 → 现实工程边界与测试表现

### 一包到底还是各司其职：从万能大模型到端侧任务解耦

给应用接入 AI 时，一个很直接的做法是把所有需求都交给同一个“万能”大模型：让它听客服录音转写文字，再让它分析该分配给哪个部门。这种“一包到底”的方式看起来省事，却可能像开着重型卡车送一份外卖：任务做成了，也动用了本来可以省下的计算和内存。

听写要的是文字，分流要的是一个部门选择。让大模型生成回复后，应用还要从文本或 JSON 中提取部门标签；一旦走云端服务，还会带来调用成本与网络延迟。开发者 Mattt 发布的两个开源工具包改变了这种困境：**AnySpeechRecognizer** 让语音转写可自由换模型并标注发言人，**AnyDecisionModel** 让分类与打分直接返回选项与概率，可分别使用，也可前后接力。

这两个工具包延续了 AnyLanguageModel 的 Swift 接口风格：相同的上层调用面板，底下的模型按需拔插。会议记录可单独接入语音包，现有工单文本也可直接送入决策包。

### 先听清对话：换用 Core ML 发动机与双轨时间线对齐

苹果在 macOS 26 与 iOS 26 中提供了新的 `SpeechAnalyzer`，但固定采用官方引擎且无法区分发言人。AnySpeechRecognizer 保留了苹果现代语音接口风格，底层可按需选苹果引擎，或已转换的 Core ML 模型：

英文与欧洲语言的实时听写可选 NVIDIA 的 **Parakeet**（支持逐词起止时间、置信度与随后续声音更新临时转写；作者在 M4 Max 上测得 Core ML 编译后常驻内存约 100MB，不含其他模型）；面对中文、普通话及粤语等方言录音，则可切换为阿里巴巴的 **Qwen3-ASR**（支持 30 种语言与 22 种方言，GPU 解码）。

在多人通话场景中，知道每句话是谁说的尤为关键。工具包通过 `SpeakerDiarizer` 引入 NVIDIA **Streaming Sortformer**（本地追踪最多 4 位发言者），按两条时间线的重叠规则，给词标上会话内发言人编号：

转写轨 · Parakeet
识别文本并输出每个词的绝对起止区间（如“扣款”定位在 1.1–1.6s）

发言时段轨 · Sortformer
同步检测发言区间（发言人 0 在 1.0–3.0s 活跃，发言人 1 在 2.0–4.0s 活跃）

**时间线重叠对齐：**`SpeakerTimeline` 比对每个词的时间范围与哪位发言者的活跃区间重叠最多，将该词归入重叠时间最长的发言人。
      

按词归属需要逐词时间戳，当前配合 Apple 或 Parakeet；Qwen3-ASR 尚不能用于这条路径。发言人编号不是姓名或业务角色，分离模块也补不回转写器漏掉的插话。上面的词与时间是教学示意。

Core Mechanism · 核心机制

#### 不写回答，模型怎样单次前向直接给出选项概率？

传统大模型分流需要逐词自回归生成一段话（如“建议交给账单部门”），再由程序二次解析。通用语言模型写下一个词前，会先给候选词打分。AnyDecisionModel 可以从这些分数取选项概率，也可以从专门训练的决策头取判断。下面对比的是通用语言模型这条路径：

传统生成模式（重型卡车）
输入工单与多行 Prompt 提示词
逐词生成一段回答，生成长度取决于回复
输出：“我认为应该转交给账单组...”
程序提取部门标签 易解析失败

通用语言模型路径（读取选项分数）
工单绑定选项 A:账单、B:技术、C:销售
单次前向（Forward Pass）计算下一词 Logits
取出 A/B/C 原始分数，Softmax 换算相对概率
立即停机，返回强类型 Swift 结构体 零多余生成

针对通用语言模型（如 MLX 运行的 Qwen3-4B），工具通过读取下一词的原始 Logits 完成概率归一化；而针对自带决策头的模型（如 Cloudflare Clef-Flash），则可在单次计算中同时输出“是否紧急”（是非）、“交给谁”（单选）与“多不满”（分级期望值）。

**强类型契约与业务正确性的分界：**程序拿到 `Choice<Department>` 结构体，其中 `team.value` 是允许的部门枚举值，无需从自由文本抓标签；但如果模型把退款工单误分给销售组，格式合规事情依然办错。程序能接住答案，与模型选得正确，是两件事。

### 概率与界面协同：Emoji Magnet 的物理规则驱动

官方 macOS 示例 Emoji Magnet 直观展示了概率如何赋能动态交互：界面中堆叠着 343 个 Emoji 图标，当用户输入 `"things you wear in winter"`（冬季穿戴物）时，冬装图标便会自然上浮吸附在顶部。

这一过程完全没有预设静态关键字映射，而是清晰贯彻了“模型负责概率、程序负责规则与动作”的解耦架构：

01
**逐题构造：**程序为 343 个 Emoji 各自构造一道是非题（判断该图标是否符合“冬季穿戴物”）。

02
**模型出分：**模型计算各图标符合描述的概率（原作者云端 Jev 演示：单请求处理343题，图标约0.5秒稳定；本地 Qwen3-4B 在 M4 Max 每16题约0.45秒、全部约10秒，下载加载后可离线）。

03
**业务裁决：**程序执行明确的业务规则——凡是判定概率大于 0.50 的图标加入吸附名单。

04
**引擎渲染：**SpriteKit 物理引擎对名单内的图标施加向上弹簧拉力，其余图标在重力作用下自然下坠。

### 置信度不等于正确率：校准、消偏与真实落地边界

本地选择与评分返回的置信度衡量概率分布的集中程度（大部分概率押在某一项时数值偏高），但模型完全可能极有把握地选错。为此，在工程落地前必须经过严格校准与边界检验：

开发者可利用带标注的历史工单通过 `Calibration` 拟合温度与偏置参数；开启 `rotationDebiasing` 轮换选项顺序计算并求均值，可缓解位置偏好；仅适用于读取下一词概率的后端，代价是多算几轮（三个选项计算三次）；同时检查“允许答案的概率总量”，防范模型将概率分散在合法选项之外。

100 MB
Parakeet / Core ML 编译后常驻
不含其他模型

30+22
Qwen3-ASR 覆盖语言与中文方言数量

23.42%
AMI / Sortformer v2.1 配 Parakeet v3
DER 23.42%

这也印证了为何端侧模型必须在真实复杂场景中实测：在 LibriSpeech 干净朗读中，Parakeet v3 文件模式的 WER 为 1.55%（实时4.73%）；样本为3–8分钟 test-clean 干净朗读；而面对真实多人重叠抢话的会议录音（AMI 测试集），所有转写引擎的词错误率均飙升至 23% 以上，Sortformer 配 Parakeet v3 的 DER 为 v2 25.73%、v2.1 23.42%。干净环境下的亮眼数字不能直接外推到嘈杂生产环境。

```
import AnyDecisionModel

enum Department: String, Choosable {
    case billing, technical, sales
}

let session = DecisionSession(model: model, state: .text(ticket))
let team = try await session.choice("Which team?", from: Department.self)
// 返回 team.value (强类型枚举), team.probabilities, team.confidence
```

**架构取舍小结：**从万能大模型一包到底，转向按任务选择的语音与决策模型，有可能减少不必要开销，并让程序直接处理允许的选项值。使用本地模型且下载加载完成后可离线；调用云端服务仍需网络。选哪个引擎、放本地还是云端、何时由模型自动分流还是转人工复核，应始终由应用场景、设备算力与真实验证结果共同决定。
    

Jev 等后端的置信度公式可能不同，不能横比。校准改变的是概率表达，需另用一批标注工单验证，再设自动处理与人工复核阈值。

以上语音指标来自作者的 M4 Max Mac Studio（macOS 27.0.1）测试。决策模型也有大小之分：Clef-Flash 为9B，4-bit文件约6.2GB，建议至少16GB内存的Mac。

接入条件：基础需 Swift6.2、macOS/iOS26；本地 MLX 需 Apple Silicon、Xcode Swift6.4+与Metal工具链。语音包目前仅macOS27实测，iPhone/26未验证；CoreAI后端需27且当前与语音包依赖冲突。

原文版权归原作者，这里只供对照阅读。 [看原网页 ↗](https://huggingface.co/blog/anydecisionmodel)

## Introducing AnySpeechRecognizer and AnyDecisionModel: Open Models for Speech and Decisions on Apple Platforms

We’re on a journey to advance and democratize artificial intelligence through open source and open science.

Language models can do a lot. They write, summarize, translate, and call tools. But they're only a small part of what machine learning can do.

Say a customer calls your support line. First, you want to know what they said (speech recognition). Then, you want to decide where to send them (decision). You *could* hand both to a language model, but there are models built for each that are better, faster, and less expensive.

In our [AnyLanguageModel 1.0 recap](https://huggingface.co/blog/anylanguagemodel-1-0), we looked at a year of local and hosted models in Swift. With AnyLanguageModel and swift-huggingface now on their 1.x releases, we're extending the same approach to speech and decisions: familiar Swift APIs with a choice of model.

Today we're announcing two packages:

- [AnySpeechRecognizer](https://github.com/mattt/AnySpeechRecognizer) implements Apple's new speech-to-text API with a choice of recognition engine, including NVIDIA's Parakeet and Alibaba's Qwen3-ASR running locally on Core ML, and adds speaker diarization to track who speaks when.
- [AnyDecisionModel](https://github.com/mattt/AnyDecisionModel) answers yes-or-no, multiple-choice, and rating-scale questions with typed results and probabilities. It derives each answer from the model's probabilities instead of generating text, using a model on your device with MLX, Core AI, or llama.cpp, or a decision model from Jev or Ollama.

Both packages can download open models from the Hugging Face Hub and run them on device.

### AnySpeechRecognizer

Computers have been transcribing speech for decades, and in the past few years, they've gotten very good at it. Apple platforms already have an API for it. macOS 26 and iOS 26 introduced `SpeechAnalyzer`, Apple's new speech-to-text API. You add modules such as `SpeechTranscriber` and `SpeechDetector` to an analyzer, give it a file or a stream of audio buffers, and read results from async sequences as they arrive. `AssetInventory` installs the models, so your app decides when downloads happen.

It's a well-designed API, but the only engine behind it is Apple's. AnySpeechRecognizer keeps the API and lets you choose the engine:

```
- import Speech
+ import AnySpeechRecognizer
```

The package mirrors `SpeechAnalyzer`, `SpeechTranscriber`, `DictationTranscriber`, `SpeechDetector`, and `AssetInventory`, with Apple's Speech framework as the default engine. If your code uses that shared API, changing the import is enough. To use Parakeet instead, change only how you create the transcriber:

```
let transcriber = SpeechTranscriber(
    model: ParakeetSpeechModel(variant: .v3),
    transcriptionOptions: [],
    reportingOptions: [.volatileResults],
    attributeOptions: [.audioTimeRange]
)
```

The steps for installing assets, running the analyzer, and reading results stay the same. The [README](https://github.com/mattt/AnySpeechRecognizer#transcribe-a-file) has a complete example and [lists the differences](https://github.com/mattt/AnySpeechRecognizer#differences-from-apples-speech-framework) from Apple's framework.

#### Meet the models

**Parakeet v3** is NVIDIA's [Parakeet TDT 0.6B v3](https://huggingface.co/nvidia/parakeet-tdt-0.6b-v3). It's a polyglot: it recognizes 25 European languages and works out which one it's hearing, so you don't pass a locale.

**Parakeet Ultra** is Moondream's [post-trained take on v3](https://huggingface.co/moondream/parakeet-ultra). It was more accurate in most of our measurements.

**Parakeet Unified** is NVIDIA's [English-only Parakeet](https://huggingface.co/nvidia/parakeet-unified-en-0.6b).

All three Parakeets run on the package's own Core ML runtime, which supports file and live input, volatile results, word timing, and word confidence.

**Qwen3-ASR** is Alibaba's speech model, in [0.6B](https://huggingface.co/Qwen/Qwen3-ASR-0.6B-hf) and [1.7B](https://huggingface.co/Qwen/Qwen3-ASR-1.7B-hf) sizes. It recognizes 30 languages and 22 Chinese dialects, including Mandarin, Cantonese, Japanese, and Korean, which Parakeet doesn't cover. It detects the language automatically, or you can set one:

```
let transcriber = SpeechTranscriber(
    model: QwenSpeechModel(variant: .large, language: Locale.Language(identifier: "yue")),
    transcriptionOptions: [],
    reportingOptions: [],
    attributeOptions: []
)
```

Qwen3-ASR gives one final result for each segment of up to 40 seconds, without volatile results, word timing, or confidence. It runs on the GPU and is slower than Parakeet, so it's better suited to transcribing files than live input.

To add another engine, implement `SpeechRecognitionModel` for its configuration and `SpeechRecognitionExecutor` for one module's session. The README includes a [small provider](https://github.com/mattt/AnySpeechRecognizer#custom-providers) that reports placeholder text to help you get started.

#### Core ML models on the Hub

To run these models in apps, we converted them to Core ML and published them on the Hub:

| Model | Core ML conversion | Original checkpoint | License |
| --- | --- | --- | --- |
| Parakeet TDT 0.6B v3 | [mattt/parakeet-tdt-0.6b-v3-coreml](https://huggingface.co/mattt/parakeet-tdt-0.6b-v3-coreml) | [nvidia/parakeet-tdt-0.6b-v3](https://huggingface.co/nvidia/parakeet-tdt-0.6b-v3) | CC BY 4.0 |
| Parakeet Ultra | [mattt/parakeet-ultra-coreml](https://huggingface.co/mattt/parakeet-ultra-coreml) | [moondream/parakeet-ultra](https://huggingface.co/moondream/parakeet-ultra) | CC BY 4.0 |
| Parakeet Unified EN 0.6B | [mattt/parakeet-unified-en-0.6b-coreml](https://huggingface.co/mattt/parakeet-unified-en-0.6b-coreml) | [nvidia/parakeet-unified-en-0.6b](https://huggingface.co/nvidia/parakeet-unified-en-0.6b) | [NVIDIA Open Model License](https://www.nvidia.com/en-us/agreements/enterprise-software/nvidia-open-model-license/) |
| Qwen3-ASR 0.6B | [mattt/qwen3-asr-0.6b-coreml](https://huggingface.co/mattt/qwen3-asr-0.6b-coreml) | [Qwen/Qwen3-ASR-0.6B-hf](https://huggingface.co/Qwen/Qwen3-ASR-0.6B-hf) | Apache 2.0 |
| Qwen3-ASR 1.7B | [mattt/qwen3-asr-1.7b-coreml](https://huggingface.co/mattt/qwen3-asr-1.7b-coreml) | [Qwen/Qwen3-ASR-1.7B-hf](https://huggingface.co/Qwen/Qwen3-ASR-1.7B-hf) | Apache 2.0 |
| Streaming Sortformer 4spk v2 | [mattt/diar-streaming-sortformer-4spk-v2-coreml](https://huggingface.co/mattt/diar-streaming-sortformer-4spk-v2-coreml) | [nvidia/diar_streaming_sortformer_4spk-v2](https://huggingface.co/nvidia/diar_streaming_sortformer_4spk-v2) | CC BY 4.0 |
| Streaming Sortformer 4spk v2.1 | [mattt/diar-streaming-sortformer-4spk-v2.1-coreml](https://huggingface.co/mattt/diar-streaming-sortformer-4spk-v2.1-coreml) | [nvidia/diar_streaming_sortformer_4spk-v2.1](https://huggingface.co/nvidia/diar_streaming_sortformer_4spk-v2.1) | [NVIDIA Open Model License](https://www.nvidia.com/en-us/agreements/enterprise-software/nvidia-open-model-license/) |

Each repository records its source checkpoint and a checksum for every file, and the package pins it to a fixed revision. The Parakeet repositories add an 8-second encoder for live input, which cuts live analysis time by about a third at the cost of a somewhat higher word error rate. The repository also has the conversion workflows, most of which follow FluidInference's [mobius](https://github.com/FluidInference/mobius) scripts, and checks each conversion against the original model.

Downloads happen only when your app asks for them: about 600 MB for each Parakeet, plus about 590 MB for the live encoder, 0.9 to 2.4 GB for Qwen3-ASR, and about 250 MB for Sortformer. Files go in the standard Hugging Face cache, so a Mac app outside the sandbox shares them with Python and other Hugging Face tools.

#### Speaker diarization

When you transcribe a conversation, you often want to know who said what. That's speaker diarization, and Apple's Speech framework doesn't have a module for it, so AnySpeechRecognizer adds one. `SpeakerDiarizer` runs NVIDIA's [Streaming Sortformer](https://huggingface.co/nvidia/diar_streaming_sortformer_4spk-v2) on Core ML alongside an Apple or Parakeet transcriber, on the same timeline:

```
let diarizer = SpeakerDiarizer(model: SortformerDiarizationModel())
if let request = try await AssetInventory.assetInstallationRequest(
    supporting: [transcriber, diarizer]
) {
    try await request.downloadAndInstall()
}
let analyzer = SpeechAnalyzer(modules: [transcriber, diarizer])
```

The diarizer tracks up to four speakers, even when they talk over each other. A `SpeakerTimeline` collects its results and attributes each timed word to a speaker, so you can print a transcript by speaker turn. Like image support in AnyLanguageModel, this goes beyond what Apple's API offers today.

The diarizer uses Sortformer v2 by default. You can also choose [v2.1](https://huggingface.co/nvidia/diar_streaming_sortformer_4spk-v2.1), which NVIDIA trained with more meeting data and which was more accurate on meetings in our measurements, too.

#### How well does it work?

We measured the package with its `hear` command-line tool on an M4 Max Mac Studio with macOS 27.0.1. Here are the word error rates on LibriSpeech files of 3 to 8 minutes:

| Transcriber | test-clean | test-other |
| --- | --- | --- |
| Parakeet v3, file | 1.55% | 2.78% |
| Parakeet v3, live | 4.73% | 4.29% |
| Parakeet Ultra, file | 1.66% | 2.55% |
| Parakeet Ultra, live | 2.65% | 3.28% |
| Parakeet Unified, file | 1.43% | 2.19% |
| Parakeet Unified, live | 1.45% | 2.42% |
| Apple's transcriber, file | 2.12% | 3.97% |

Parakeet transcribes an hour of audio in about 20 to 40 seconds from a file, or about 1.5 to 2.5 minutes live, with about 100 MB of memory once Core ML has compiled the model. Qwen3-ASR is much slower and needs a few gigabytes of memory. Meetings are hard for everyone: on AMI recordings, where people talk over each other, every engine we tested had a word error rate above 23%.

These numbers come from one machine and a few datasets, so measure with your own hardware and audio. `hear evaluate` works on your own files, and the repository's `natural-speech-eval.py` tool [reproduces these measurements](https://github.com/mattt/AnySpeechRecognizer#accuracy-and-performance). So far, we've tested only on macOS 27, not on an iPhone.

Next, we'd like to add more engines, including Core AI on macOS 27 and iOS 27.

### AnyDecisionModel

AnyDecisionModel is a different story. There's no Apple framework to map onto, and decision models aren't new, exactly.

> It's only a decision model if it comes from the Décision region of France; otherwise, it's sparkling zero-shot classification.

What's new is the name, a lot of hype, and a crop of models trained to make decisions. We think that's where things are going, so we wanted a Swift API that's ready for them.

Apps often ask language models to make decisions. *Is this message urgent?* *Which team should handle this ticket?* *How frustrated is this customer?* The usual approach is to prompt a language model and parse the text that it generates. That gives you one answer, but doesn't show the probabilities it assigned to the alternatives.

Here's what a decision looks like in Swift:

```
import AnyDecisionModel

enum Department: String, Choosable {
    case billing, technical, sales
}

let ticket = "I was charged twice for my order, and now the app logs me out when I try to ask for a refund."

let model = MLXDecisionModel(modelID: "mlx-community/Qwen3-4B-Instruct-2507-4bit")
let session = DecisionSession(model: model, state: .text(ticket))

let urgent = try await session.probability(of: "Does this convey urgency?")
let team = try await session.choice("Which team?", from: Department.self)
let anger = try await session.score(
    "How frustrated?",
    levels: ["Calm", "Frustrated", "Very angry"]
)
```

`urgent` is a `Double`. `team` is a `Choice<Department>` containing the selected case, a probability for each option, and a confidence value. `anger` is a `Score` containing the expected level, a probability for each level, and a confidence value. Because `Department` conforms to `Choosable`, `team.value` is a `Department` that you can use in an exhaustive `switch`.

If you've used Foundation Models or AnyLanguageModel, the model-and-session pattern will look familiar. A `DecisionSession` holds a single state, which can be text or JSON, and every question is about that state. Questions are independent: an answer never becomes input to a later question. To ask several questions at once, pass them to `decide(_:)` as a batch.

For each question, the MLX backend builds a prompt with a one-token label for each allowed answer, then reads the probability of each label from one forward pass.

#### Try it out: Emoji Magnet

[视频/音频](https://pic.xiaohu.ai/jiedu-media/apple-speech-decision-models/emoji-magnet.mp4)

Emoji Magnet is a macOS app with a text field above a pile of 343 emoji. Type a phrase, such as "things you wear", and the emoji that match rise out of the pile. Refine it to "things you wear in winter", and the emoji that no longer match fall back.

The app has no built-in keyword rules; the model decides everything at inference time. When you pause typing, it asks the model one yes-or-no question for each emoji, for example:

```
Statement: a heavy winter coat fits the description "things you wear". Is this statement true?
```

The session's state holds the phrase. The demo above uses the hosted Jev backend, which answers all 343 questions in one request, so the emoji settle in about half a second for each phrase. Without a `TYPESAFE_AI_API_KEY`, the app runs Qwen3 4B on your Mac with the MLX backend. That backend uses prefix caching to evaluate the state once, then answers 16 questions per forward pass. On an M4 Max, a group of 16 takes about 0.45 seconds after the model loads. A full pass over all 343 emoji takes about 10 seconds, and each group's results appear as soon as they arrive.

Emoji Magnet is in the [AnyDecisionModel-Examples](https://github.com/mattt/AnyDecisionModel-Examples) repository.

#### Decision heads and Clef

Reading next-token probabilities works with general-purpose language models, but those models weren't trained to make decisions. Cloudflare's [Clef](https://huggingface.co/Cloudflare/clef) models are an example of a newer approach: a model with a trained decision head that turns a state and a schema of typed questions into decisions, returning probabilities for all allowed options across the questions in one forward pass. [Clef-Flash](https://huggingface.co/Cloudflare/clef-flash) is the 9B variant.

AnyDecisionModel runs Clef-Flash on a Mac with MLX:

```
let model = MLXHeadDecisionModel(
    modelID: "mlx-community/clef-flash-4bit",
    head: .jointSchema
)
```

You use the same sessions and questions, but `MLXHeadDecisionModel` reads each decision from Clef's trained decision head instead of from next-token probabilities. The [4-bit model](https://huggingface.co/mlx-community/clef-flash-4bit) is a 6.2 GB download, and its model card recommends a Mac with at least 16 GB of memory. Clef can read images and video, but this backend accepts only text and JSON states.

#### Calibrating and checking probabilities

Raw probabilities from language models are often overconfident. The local backends accept a `Calibration`, which applies a temperature to every answer and a bias to yes-or-no answers. Use separate datasets to fit the calibration and evaluate the results.

Language models can also favor an option because of its position in a list. On the MLX, Core AI, and llama.cpp next-token backends, turn on `rotationDebiasing` to ask a choice question once for each rotation of the options and average the probabilities. That costs one prompt evaluation per rotation.

Each local choice and score also includes a confidence value based on the entropy of its probabilities. It measures how concentrated the probabilities are, not whether the answer is right, so check the error rate on your own data before you pick a threshold. The next-token backends' diagnostics report how much probability the model assigned to the allowed answers. A low value means it assigned most of the probability elsewhere.

#### Backends

AnyDecisionModel has six backends:

- **MLX** runs a small language model on Apple silicon with [mlx-swift-lm](https://github.com/ml-explore/mlx-swift-lm) and downloads it from the Hub.
- **MLX decision heads** run a model with its own trained decision head, such as Clef.
- **Core AI** does the same as MLX with a Core AI model on macOS 27 and iOS 27.
- **llama.cpp** reads decisions from a local GGUF model through [llama.swift](https://github.com/mattt/llama.swift).
- **Jev** calls TypeSafe's Jev through the [System One API](https://docs.typesafe.ai/api/system-one), or any server that implements it, such as [Kev](https://github.com/jaredpalmer/kev).
- **Ollama** calls a System One decision model on a local Ollama server or in Ollama's cloud. It requires Ollama 0.35.0 or later, or 0.40.5 or later for cloud models.

The next-token backends label answers "yes" and "no", A to Z, or 0 to 9, so a choice can have at most 26 options, and a score at most 10 levels. Decision heads have no such limit.

Like AnyLanguageModel, the package uses Swift package traits. Without traits, it has no third-party dependencies. You get the core types and the Jev and Ollama backends, which also build on Linux. Enable the `MLX`, `CoreAI`, or `Llama` trait for the local backends.

### Get started

Both packages require Swift 6.2 or later and macOS 26 or iOS 26 or later. The Parakeet and Sortformer runtimes and the MLX backend require Apple silicon. AnyDecisionModel's MLX build tasks use Xcode's Swift 6.4 or later and the Metal toolchain; Core AI requires Xcode 27 and an OS 27 runtime.

Add the packages to your `Package.swift`:

```
dependencies: [
    .package(url: "https://github.com/mattt/AnySpeechRecognizer", from: "0.1.0"),
    .package(
        url: "https://github.com/mattt/AnyDecisionModel",
        from: "0.6.0",
        traits: ["MLX"]
    ),
]
```

For now, AnyDecisionModel's `CoreAI` trait can't be combined with AnySpeechRecognizer, because coreai-kit 0.7.3 requires swift-huggingface below 1.0 and AnySpeechRecognizer requires 1.x.

Each README has more examples and details about requirements and backends. AnySpeechRecognizer also includes a command-line tool, `hear`, that transcribes local files, labels their speakers, and evaluates the results. Every `hear` command requires `--backend apple`, `--backend parakeet`, or `--backend qwen`; run `hear prepare` with the same backend and model options before analysis to install the needed assets.

Try them in your apps and tell us what works and what doesn't. Issues and pull requests are welcome on both repositories.

### Links

- [AnySpeechRecognizer on GitHub](https://github.com/mattt/AnySpeechRecognizer)
- [AnyDecisionModel on GitHub](https://github.com/mattt/AnyDecisionModel)
- [AnyDecisionModel-Examples on GitHub](https://github.com/mattt/AnyDecisionModel-Examples)
- [AnyLanguageModel on GitHub](https://github.com/huggingface/AnyLanguageModel)
- [swift-huggingface on GitHub](https://github.com/huggingface/swift-huggingface)

*Thanks to NVIDIA for Parakeet, Sortformer, and NeMo, to Moondream for Parakeet Ultra, to FluidInference, whose FluidAudio and mobius projects documented the conventions that the Parakeet runtime and the Core ML conversions follow, to Cloudflare for Clef, and to everyone who contributed to AnyLanguageModel, whose patterns both packages borrow.*

↑ 正文结束
✓ 本篇全文免费开放

会员可复制、下载全文 Markdown，还能让你的 AI 订阅和提问。
[订年卡 $59/年](https://xiaohu.ai/buy/?plan=year)[看权益对比 →](https://xiaohu.ai/membership/)

[阅读原文 ↗](https://huggingface.co/blog/anydecisionmodel)

📮 新解读每晚进邮箱

读完觉得有用？留个邮箱，每晚一封当天的新解读，随时退订。
