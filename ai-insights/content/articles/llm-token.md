---
title: "现代大语言模型（LLM）如何编码和处理 token 的位置信息"
date: 2026-11-19T15:09:05.728Z
tags: ["大语言模型", "RoPE", "位置编码", "Transformer", "开源模型"]
summary: "Sebastian Raschka 的文章《Understanding Positional Embeddings in Modern LLMs》总结 文章系统讲解了现代大语言模型（LLM）如何编码和处理 token 的位置信息，涵盖经典方"
---
> **原文链接**: [https://magazine.sebastianraschka.com/p/understanding-positional-embeddings](https://magazine.sebastianraschka.com/p/understanding-positional-embeddings)
> **来源**: magazine.sebastianraschka.com
> **发现于**: 管理台手动提交
> **说明**: 本文由 AIHot汪 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

## AI 总结

**Sebastian Raschka 的文章《Understanding Positional Embeddings in Modern LLMs》总结**

文章系统讲解了现代大语言模型（LLM）如何编码和处理 token 的位置信息，涵盖经典方法到当前主流的 RoPE，并分析了 2025–2026 年开源模型的实际选择趋势。文章技术细节丰富，包含可视化、公式和少量 PyTorch 代码。

### 1. 为什么需要位置信息？
Transformer 的自注意力机制本身是**位置无关**的（permutation-invariant）。相同 token（如两个 “fox”）会得到相同的 embedding，如果没有位置信号，模型无法区分词序。

- **因果掩码（causal mask）** 能提供一定的隐式顺序信息（每个 token 只能看到自己和之前的 token）。
- 但隐式信息不足以区分“相距 1 个位置”和“相距 10 个位置”，因此大多数模型仍使用**显式位置编码**。

### 2. 经典绝对位置方法
**GPT-2 的可学习绝对位置嵌入**：
- 为每个位置学习一个向量 \(P_m\)，直接加到 token embedding 上。
- 公式：\(h_m = E_{\text{token}}(x_m) + P_m\)
- 缺点：位置表大小固定，扩展上下文窗口代价高昂（位置嵌入权重占比会急剧上升）。

**原始 Transformer 的固定正弦/余弦编码**：
- 使用固定的 \(\sin/\cos\) 函数生成位置向量（不可学习）。
- 频率按指数衰减：\(\theta_i = 10000^{-2i/d}\)
- 优点：理论上可外推到训练长度之外；相对偏移对应固定旋转。

### 3. RoPE（Rotary Position Embedding）——当前主流
RoPE（2021 年 RoFormer 提出）是**相对位置**方法，不再把位置向量加到输入 embedding 上，而是**在注意力内部旋转 Query 和 Key**：

1. 将每个注意力头的特征两两配对。
2. 根据 token 位置 \(m\) 和频率 \(\theta_i\) 对每对特征进行旋转。
3. Value 不做旋转。
4. 核心性质：**相对偏移决定点积**。如果两个 token 的相对距离不变，即使整体位置平移，它们的 query-key 点积保持不变。

这使得模型天然擅长学习相对位置关系，且更适合长上下文扩展。

文章详细推导了旋转公式、频率计算（\( \theta_i = b^{-2i/d} \)，通常 \(b=10000\)），并给出了 split-half 和 interleaved 两种特征配对实现的 PyTorch 代码。

### 4. 现代架构的变体与趋势（2025–2026）
根据作者的 LLM Architecture Gallery：

- **全量 RoPE**（每个注意力层都对所有特征旋转）仍然是最常见选择，但占比在下降。
- **Partial RoPE**（只旋转部分特征，如 MiniMax-M3 在 128 维头中只旋转 64 维）变得更流行，主要节省 cos/sin 表内存，但收益有限。
- **NoPE（No Positional Encoding）**：部分或全部层不使用显式位置编码，仅依赖因果掩码提供隐式位置信号。例如 SmolLM3 每 4 层跳过一次 RoPE。
- **Learned relative position bias**：如 Inkling，在注意力分数上直接加一个依赖相对距离和隐藏状态的可学习偏置（类似早期 T5 的思路）。

**趋势观察**：
- 全量 RoPE 使用率从 2025 到 2026 有所下降。
- RoPE + NoPE 混合架构增多。
- Partial RoPE 在使用 RoPE 的模型中占比上升。

### 5. 核心结论
- RoPE 仍是 2026 年最主流的位置编码方法，预计 2027 年仍会主导。
- 模型开始探索更灵活的混合策略（部分层 NoPE、Partial RoPE、相对偏置等）。
- 位置编码虽是“小模块”，但对长上下文性能和架构设计影响显著。

文章最后推荐从 GPT-2 风格模型入手理解基础，再叠加 RoPE 等现代技术，并提供了相关系列文章链接。

---

## 理解现代 LLM 中的位置嵌入

#### LLM 表示 token 位置的方法背后
[https://substack.com/@rasbt](https://substack.com/@rasbt)[Sebastian Raschka, PhD](https://substack.com/@rasbt)2026 年 11 月 15 日

本文讲解 LLM 如何编码和处理 token 位置信息,涵盖从经典到前沿的多种方法,包括 RoPE。这 essentially 是一次全面的旅程,我们将通过直观的图示示例、少量数学和一个小型 PyTorch 实现,逐一剖析其中的机制。当然,之后我们还会探讨现代架构如何调整或干脆省略显式位置编码。

下面是 2026 年开放权重模型所采用的位置嵌入方案一览(预览)。在讲解完底层机制之后,我们稍后会讨论这些选择。

[https://substackcdn.com/image/fetch/$s_!8RKL!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb461a2cb-11ab-474a-affe-0ee99e5a8782_2850x2777.png](https://substackcdn.com/image/fetch/$s_!8RKL!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb461a2cb-11ab-474a-affe-0ee99e5a8782_2850x2777.png)

图 1:画廊中 2026 年架构的预览,按位置编码方式分组。架构图取自我的 [LLM 画廊](https://sebastianraschka.com/llm-architecture-gallery/)。

那么,为什么要花这么多时间来撰写/阅读这个看似不起眼的构件呢?LLM 在不断演进,当我在准备一篇关于今年最新 LLM 架构趋势的新文章时,才意识到我此前从未在任何文章中讲过 LLM 中使用的位置信息方法。所以,为了不让另一篇文章失控膨胀,我觉得不如把这部分内容单独成篇发布,作为即将到来的 LLM 架构与趋势分析的一个独立构件。

此外,多年来许多读者一直向我索取一篇关于相对位置嵌入(即 RoPE)的教程,以接续 GPT 中所使用的可学习绝对嵌入的内容。这件事在我的 TODO 清单上挂了很长时间,所以我终于翻出旧草稿,整理出了这篇 walkthrough,内容将涵盖

- LLM 中不同的位置信息方法;
- (终于要讲)RoPE 是如何工作的;
- 近期开放权重 LLM 所采用的方法。

请注意,本文假设读者对基本的 LLM 架构有一定了解,并且很适合作为 [Build a Large Language Model (From Scratch)](https://sebastianraschka.com/books/#build-a-large-language-model-from-scratch) 一书的后续阅读。如果对注意力机制的内部概念与计算——尤其是 query、key 和 value 向量——还有些模糊,我推荐阅读我的 [self-attention walkthrough](https://magazine.sebastianraschka.com/p/understanding-and-coding-self-attention) 作为复习:
[Understanding and Coding Self-Attention, Multi-Head Attention, Causal-Attention, and Cross-Attention in LLMs2024 年 1 月 14 日阅读全文](https://magazine.sebastianraschka.com/p/understanding-and-coding-self-attention)

这篇文章也非常技术化,对某些读者来说可能过于细节。不过,我真的很希望先把这块基础内容发布出来,以便未来的文章可以引用。别担心,下一篇会回归更轻松的风格。

**PS:我开始试用 Substack 新推出的“perks”系统。为感谢支持者,我添加了来自架构画廊的[图片导出与元数据](https://magazine.sebastianraschka.com/perks),供你在自己的分析中使用。**

PPS:如果你已经熟悉位置嵌入的工作原理,欢迎直接跳到第 6 节,*现代架构中的位置选择*。

请注意,这篇文章更适合在网页浏览器中阅读,而不是在邮件客户端中。我推荐查看[网页版](https://magazine.sebastianraschka.com/p/understanding-positional-embeddings),那里左侧还有一个导航栏。

### 1. 位置信息进入 LLM 的位置

让我们从整体架构开始。tokenizer 将输入文本编码为 token ID。接着，LLM 的输入 token embedding 层将这些 ID 中的每一个映射为一个由数字组成的向量。我们通常把该向量中的这些条目称为 "features"(类似于经典的 ML)。然后，LLM 内部的 transformer block 通过 attention 和 feedforward 层对这些向量进行修改。最后，模型的输出层为下一个 token 生成 logit 分数(再转换为概率)。

下图展示了这一路径在 GPT-2(一个相对经典的 LLM)和 MiniMax-M3(一个今年发布的较新 LLM,这里作为大多数其他近期 LLM 的代表)中的情况。可以看到，两者的架构并没有太大差异，但在讨论位置信息部分之前，我们先聚焦于橙色区块(即 token embedding 层)以及它们上方的 transformer block;其他架构上的差异与这里的讲解无关。

[https://substackcdn.com/image/fetch/$s_!3vjo!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4ab287c2-c3ba-46db-9ed0-1e6eacf78f43_2592x2521.png](https://substackcdn.com/image/fetch/$s_!3vjo!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4ab287c2-c3ba-46db-9ed0-1e6eacf78f43_2592x2521.png)

图 2:GPT-2 和 MiniMax-M3 中的 token embedding 层，以橙色突出显示。(附注：M3 的 60 个 feedforward 层中，前三个是 dense 而非 MoEs。)

如上图所示，token embedding 层将每个 token ID 映射为一个向量，位置信息则在此之后添加。具体来说，正如我们稍后会详细讨论的，GPT-2 会在修改后的 embedding 进入第一个 transformer block 之前，向每个 token embedding 添加一个位置向量；而 MiniMax-M3 则是在每个 transformer block 内部添加位置信息，使用的是一种在 attention 中运用的名为 RoPE 的方法。

我们稍后会更详细地讨论这些方法，但首先，让我们从大局入手，解释为什么需要显式地添加位置信息，或者说为什么位置信息是必要的。

#### 1.1 为什么要添加位置信息？

以以下两个输入句子作为简单示例：

1. "The red fox jumps over the gray fox."(“这只红色的狐狸跳过了那只灰色的狐狸。”)
2. "The gray fox jumps over the red fox."(“这只灰色的狐狸跳过了那只红色的狐狸。”)

改变词序会改变是哪只狐狸在跳跃，如下图所示。

[https://substackcdn.com/image/fetch/$s_!KoQ2!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb8ff5039-8ec8-447c-a444-0345619c8b7b_1846x1304.png](https://substackcdn.com/image/fetch/$s_!KoQ2!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb8ff5039-8ec8-447c-a444-0345619c8b7b_1846x1304.png)

图 3:改变词序会改变是哪只狐狸在跳跃。

在本文的示例中，为了简单起见，我们把每个词都视为一个 token。(如你所知，实际的 tokenizer 会把词拆分成更小的 subword token。)于是，第一个句子共有八个 token 位置，编号从 0 到 7。

![图 4 — token IDs 和位置](https://substackcdn.com/image/fetch/$s_!Bxjt!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff5386e76-8459-4196-a797-430e922fce3b_2238x580.png)

图 4:示例句子中的 token ID 和位置。

```
## Assume the following small vocabulary.
## Real vocabularies typically have 50k to 200k entries
vocab = {
    "The": 0,
    "red": 1,
    "fox": 2,
    "jumps": 3,
    "gray": 4,
    "over": 5,
    "the": 6,
}
```

(如果你对词表是如何构建的感兴趣，可以查看我的 [GitHub 上的 tokenizer 相关材料](https://github.com/rasbt/LLMs-from-scratch/tree/main/ch02/05_bpe-from-scratch)。)

请注意，"fox" 在输入句子中出现了两次，但它在两种情况下得到的 token ID 都是 2。而且，由于二者的 token ID 相同，无论它们在输入句子中处于什么位置，它们都会从 embedding 层获得相同的 embedding 向量。(如果你想进一步了解这种从 embedding 表中进行查找的具体过程，请参阅[附录 A](https://sebastianraschka.com/supplementary/positional-embeddings/#appendix-a-token-embedding-lookups)。)

现在，让我们考虑一种不带位置编码的常规 self-attention 机制（也没有 causal mask），其中每个输入 token 都可以注意到输入中的所有其他 token。在这种情况下，交换任意两个单词，比如 "red" 和 "gray"，每个 token 对之间的 embeddings 和 attention scores 仍会完全相同。

GPT 风格的模型确实使用了 causal（autoregressive）mask，它将每个 token 限制为只能注意到自身及其之前的 token。有趣的是，这种 causal mask 为计算提供了某种隐式的顺序信息。在我们的例子中，"jumps" 在第一句话中可以注意到 "red"，而在第二句话中可以注意到 "gray"。因此，一个使用 causal mask 的 LLM 理论上即使没有显式的 positional embeddings，也已经能够区分这些句子。（稍后在讨论 "NoPE" 概念时，我们会重新回到这个想法。）

尽管如此，GPT-2 和大多数较新的 LLM 仍然包含显式的位置信息，因为它为 attention 提供了关于位置的直接信号。这是因为，虽然 causal mask 决定了哪些 token 是可访问的并提供隐式的顺序信息，但它无法区分，比如说，相隔一个位置与相隔十个位置有什么不同。因此，显式的位置方法仍然是有用的（甚至是必不可少的），因为它们提供了这类信息。

（可选的 [Appendix B](https://sebastianraschka.com/supplementary/positional-embeddings/#appendix-b-attention-masks-and-position-information) 中，针对两句话里的 "jumps"，以及常规 attention 和 causal attention，给出了具体的数值演算。）

如果这些内容听起来让人困惑，别担心，它更多只是一个概览，我们会在文章剩下的部分更平缓地逐步讲解这些概念。

### 2. 向每个 token embedding 添加位置向量

我们简要讨论了通过 causal attention mask 获得 *隐式* 位置信息的方式（稍后我们还会更详细地再次探讨这一点）。不过，现在我们要换个话题，谈谈添加位置信息的 *显式* 方法。

也许最简单、最直接（但并非最“廉价”）的方法，就是为序列中的每个位置分配一个专属向量。我们将该向量加到 token embedding 上，这样得到的、经过修改的 embedding 向量随后会被传入第一个 transformer block。接下来的几个小节将具体讨论这一过程。

#### 2.1 GPT-2 中的可学习绝对 position embeddings

为了说明如何将显式的、可学习的位置向量应用于输入 embeddings，让我们以 GPT-2 作为具体例子。GPT-2 在训练过程中学习一张位置向量表。下图展示了这些向量在架构中的使用位置，即紧接在 token embedding 查询之后、第一个 transformer block 之前。

[https://substackcdn.com/image/fetch/$s_!GDv8!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fda2b0f15-7f45-4aa4-8f1b-a0777a0da4fc_1710x2197.png](https://substackcdn.com/image/fetch/$s_!GDv8!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fda2b0f15-7f45-4aa4-8f1b-a0777a0da4fc_1710x2197.png)

图 5：GPT-2 在 transformer block 之前添加绝对位置信息，如紫色部分所示。图中显示的维度对应 [GPT-2 XL](https://huggingface.co/openai-community/gpt2-xl/blob/main/config.json)。

上图所示的 positional embedding 层与 token embedding 层采用相同的实现方式，也就是说，二者的输出维度完全相同，这样得到的向量才可以彼此相加。下面的代码通过一段 GPT-2 代码实现的摘录展示了这一点：

```
class GPTModel(nn.Module):
    def __init__(self, cfg):
        super().__init__()
        self.tok_emb = nn.Embedding(cfg["vocab_size"], cfg["emb_dim"])
        self.pos_emb = nn.Embedding(cfg["context_length"], cfg["emb_dim"])
        self.drop_emb = nn.Dropout(cfg["drop_rate"])
        
        self.trf_blocks = nn.Sequential(
            *[TransformerBlock(cfg) for _ in range(cfg["n_layers"])])
        
        self.final_norm = LayerNorm(cfg["emb_dim"])
        self.out_head = nn.Linear(
            cfg["emb_dim"], cfg["vocab_size"], bias=False
        )

    def forward(self, in_idx):
        batch_size, seq_len = in_idx.shape
        tok_embeds = self.tok_emb(in_idx)
        pos_embeds = self.pos_emb(torch.arange(seq_len, device=in_idx.device))
        x = tok_embeds + pos_embeds  # Shape [batch_size, num_tokens, emb_size]
        x = self.drop_emb(x)
        x = self.trf_blocks(x)
        x = self.final_norm(x)
        logits = self.out_head(x)
        return logits
```

从数学角度来看，我们可以将其表述如下。设 *m* 为位置索引，*xm* 为该位置的 token ID。第一个模块的输入为

![公式 1：h_m = E_{\text{token}}(x_m) + P_m.](https://substackcdn.com/image/fetch/$s_!AjJR!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F10fa6ac9-e4e7-4b16-b4c3-43d1671030c3_2240x79.png)

其中，

- *E*token 是嵌入层（embedding layer），
- *Pm* 是由 *m* 选择的位置信息向量，
- *hm* 是结果向量，即嵌入向量与位置向量的和。

这两个向量的宽度相同，因此我们按元素对它们进行相加。图 6 通过一个小型数值示例直观地展示了这一过程。

[https://substackcdn.com/image/fetch/$s_!yuT0!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F546edc50-7b1a-40ba-a125-da3fbdaade26_2586x964.png](https://substackcdn.com/image/fetch/$s_!yuT0!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F546edc50-7b1a-40ba-a125-da3fbdaade26_2586x964.png)

图 6：Token 嵌入与位置嵌入按元素相加。（此处遵循惯例，神经网络图通常自下而上阅读。）

在上述图中，在位置 0，将 token 嵌入 `[1, 1, 1]` 与位置嵌入 `[1.1, 1.2, 1.3]` 相加得到 `[2.1, 2.2, 2.3]`。顺便一提，图中的数值是为了简化说明而选取的；在实际应用中，两个嵌入层（查找表）均初始化为较小的随机值，并在训练过程中进行学习。

因此，本节介绍的方法被称为 *绝对* 位置编码方法，因为位置嵌入 *Pm* 依赖于 token 自身的位置 *m*。在之前的例句中，两个 “fox” token 最初具有相同的 token 嵌入，但由于我们加上了不同的位置向量 *P2* 和 *P7*，它们在进入第一个 transformer 模块之前具有不同的值。因此，注意力机制内部的查询（query）、键（key）和值（value）向量接收到的表示也包含了位置信息。

需要注意的是，原始的 [GPT-2 实现](https://github.com/openai/gpt-2/blob/master/src/model.py) 包含 1,024 个可学习的位置向量。这意味着它仅支持包含 1024 个或更少 token 的输入。如果我们希望扩展上下文窗口，就必须扩展这个嵌入表。由于嵌入表（层）在训练过程中像其他层一样进行更新，因此上下文长度必须在训练开始前确定。

扩展上下文成本非常高，因为该表可能会变得非常大。例如，在 GPT-2 Medium 的情况下，位置嵌入层的权重在 1,024 个位置时仅占总权重的 0.30%。然而，如果我们将上下文长度扩展到当今常见的 100k 范围，它们将占总模型权重的 22% 以上，这在经济上是非常不划算的。

#### 2.2 原始 Transformer 中的固定正弦位置编码

2017 年原始的 [“Attention Is All You Need”](https://arxiv.org/abs/1706.03762) Transformer（早于 GPT）使用了相同的加法机制，但其位置向量是通过固定的正弦和余弦函数计算得出的。图 7 展示了编码器堆栈和解码器堆栈之前的加法过程。编码器处理输入序列，而解码器生成输出序列。（此处引入它的原因是，正弦和余弦函数在后续讨论 RoPE 时将再次变得相关。）

[https://substackcdn.com/image/fetch/$s_!d7HH!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5958afa7-673d-44df-a1af-112044196dde_2620x2800.png](https://substackcdn.com/image/fetch/$s_!d7HH!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5958afa7-673d-44df-a1af-112044196dde_2620x2800.png)

图 7：正弦位置编码（紫色高亮部分）被添加到 token 嵌入中。

原始 Transformer 在添加位置向量之前，还会将其 token 嵌入缩放 $\sqrt{d_{\text{model}}}$，其中 $d_{\text{model}}$ 是嵌入宽度。

因此，虽然上一节中的 GPT-2 使用以下公式：

![公式 2：h_m = E_{\text{token}}(x_m) + P_m.](https://substackcdn.com/image/fetch/$s_!AjJR!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F10fa6ac9-e4e7-4b16-b4c3-43d1671030c3_2240x79.png)

原始 Transformer 使用的公式（如图 7 所示）为：

![公式 3：h_m = \sqrt{d_{\text{model}}} E_{\text{token}}(x_m) + P_m.](https://substackcdn.com/image/fetch/$s_!08dk!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa42a0af2-997b-49a7-87e6-3beaf7788bae_2240x95.png)

这种由 $\sqrt{d_{\text{model}}}$ 引起的缩放是一个次要的技术细节，但对于好奇的人来说，Transformer 论文中并未解释这一缩放因子的动机。正如我多年前在 Twitter 线程中与同事讨论的那样，其目的很可能是使 token 嵌入和正弦位置编码在初始化时处于可比的数值量级，从而在我们将它们相加时，位置向量不会主导总和。

在 GPT-2 的情况下，这种缩放是不必要的，因为原始 GPT-2 代码将 token 嵌入初始化为标准差 0.02，将位置嵌入初始化为标准差 0.01，从而使它们大致处于同一量级。

现在，更有趣的一点是位置嵌入 $P_m$ 是如何计算的。

具体来说，每个位置向量包含以下条目：

![公式 4：\begin{aligned} P_{m,2i} &= \sin\left(\frac{m}{10000^{2i/d_{\text{model}}}}\right), \\ P_{m,2i+1} &= \cos\left(\frac{m}{10000^{2i/d_{\text{model}}}}\right). \end{aligned}](https://substackcdn.com/image/fetch/$s_!Z3Wh!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F00bc80dd-1b3c-4c66-90c0-111bfaf26d2d_2240x296.png)

如前所述，$m$ 表示位置。索引 $i$ 对向量中的一对特征进行索引。

在这里，特征是指位置向量中的一个数值。例如，假设我们有一个包含 8 个值的小向量（$d_{\text{model}} = 8$），其条目编号从 0 到 7。（在原始论文中，小模型的 $d_{\text{model}}$ 为 512，大模型为 1024，而不是 8，但这很难可视化。）我们将这些值分成四对，使得 $i$ 从 0 到 3。

[https://substackcdn.com/image/fetch/$s_!HkhF!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe441fd8e-780b-4f66-9254-8ee2a7994a4f_1593x773.png](https://substackcdn.com/image/fetch/$s_!HkhF!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe441fd8e-780b-4f66-9254-8ee2a7994a4f_1593x773.png)

图 8：每个特征对的正弦和余弦条目。

在这里，索引 $2i$ 和 $2i + 1$ 选择对应于对 $i$ 的两个条目。

如前面的公式所示，位置 $m$ 处的角度随后被输入到正弦或余弦函数中以分别获得 $P_{m, 2i}$ 或 $P_{m, 2i+1}$，该角度计算如下：

![图 9 — 角度和频率](https://substackcdn.com/image/fetch/$s_!9Nx0!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fae693dce-b196-480f-ace0-2d8a888bf745_2234x806.png)

图 9：正弦和余弦内部的角度是 token 位置乘以该对的角频率。

图 10 展示了我们在位置 $m = 2$ 时，8 特征示例中所有四对特征的计算过程。

[https://substackcdn.com/image/fetch/$s_!63Px!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa6e0a4d2-6a7c-443d-9be0-102807f8da7a_2600x1063.png](https://substackcdn.com/image/fetch/$s_!63Px!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa6e0a4d2-6a7c-443d-9be0-102807f8da7a_2600x1063.png)

图 10：位置 2 处的四对正弦和余弦值。

对于具有八个特征的嵌入，这四个频率分别为每位置 1、0.1、0.01 和 0.001 弧度。在位置 2 处，第 1 行的第一对为 (sin 2, cos 2) ≈ (0.909, −0.416)。

第 2 行的第二对变化更慢，给出 (sin 0.2, cos 0.2) ≈ (0.199, 0.980)。

下图可视化了不同对的正弦和余弦计算，这些计算随后被收集在一个位置向量中。

[https://substackcdn.com/image/fetch/$s_!UhK9!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2fd5a766-4363-4189-9675-bcf9bd8e700d_2624x2023.png](https://substackcdn.com/image/fetch/$s_!UhK9!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2fd5a766-4363-4189-9675-bcf9bd8e700d_2624x2023.png)

图 11：采样正弦和余弦函数以形成位置向量。

简而言之，与前面讨论的 GPT-2 方法相比，这种方法是一种（更复杂的）获取位置嵌入向量的替代方案。

与 GPT-2 嵌入类似，这些也是绝对嵌入，因为每个向量都是根据其自身位置计算的。然而，与 GPT-2 方法不同，正弦和余弦函数在训练期间保持固定。（此外，它们可以扩展到训练位置之外并进行评估，例如超过 1024 的上下文长度，尽管这本身并不能保证模型在那里的表现良好，因为它们在训练期间没有见过这些位置。）

总之，下图 12 比较了我们到目前为止讨论的获取位置向量的两种方式。

[https://substackcdn.com/image/fetch/$s_!jj3h!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3032a17a-5c43-487e-bcce-560d0a957b12_2616x1804.png](https://substackcdn.com/image/fetch/$s_!jj3h!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3032a17a-5c43-487e-bcce-560d0a957b12_2616x1804.png)

图 12：固定的正弦嵌入和可学习的绝对位置嵌入。

（可选的 [附录 C.1](https://sebastianraschka.com/supplementary/positional-embeddings/#c1-learned-versus-sinusoidal-position-vectors) 通过小型实证实验详细介绍了这两种方法在实际中的比较。）

这种正弦方法看起来可能是一种过于复杂的位置嵌入获取方式，然而，理解它将在下一节讨论 RoPE 时派上用场。

此外，它背后也有一些理由。作者选择正弦和余弦是因为它们使得按特定偏移量移位会产生确定的差异。例如，位置 2 到 5 的差异与 102 到 105 的差异都是 3，这导致相同的旋转。

根据 [Attention Is All You Need](https://arxiv.org/abs/1706.03762) 论文：

> “……可以轻松学习基于相对位置的关注，因为对于任何固定的偏移量 *k*，*PE*pos + *k* 可以表示为 *PE*pos 的线性函数。”

或者用更通俗的话来说，作者假设这种特性会使注意力更容易学习诸如“三个 token 之前”这样的关系。

下图 13 为一个正弦/余弦对说明了这一点。旋转是一种线性变换，并且两个三位置移位使用相同的旋转。

[https://substackcdn.com/image/fetch/$s_!PFDm!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8cfa51c1-e3d5-4791-9899-4f159d43e890_2453x1299.png](https://substackcdn.com/image/fetch/$s_!PFDm!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8cfa51c1-e3d5-4791-9899-4f159d43e890_2453x1299.png)

图 13：对于每位置角频率为 0.1 弧度的一对，三个位置的移位总是将该对旋转 0.3 弧度。

### 3. 使用 RoPE 编码相对位置

因此，上述的正弦方法仍然被视为绝对位置编码，因为添加到每个 token 嵌入中的向量代表该 token 从序列起始位置计数的位置。

如前图所示，例如，位置 2 和 5 的 token 分别接收位置向量 *P2* 和 *P5*。如果我们将这些 token 移动到位置 102 和 105，它们之间仍然相隔三个位置。但是，每个 token 会获得不同的位置向量，因为它们的绝对位置 *m* 发生了变化。

因此，即使 token 嵌入保持不变，它们的注意力分数也可能发生变化。正弦结构仍然为模型提供了一种学习相对关系的方式。

无论如何，我们将在下面讨论的 RoPE 将这种相对关系直接构建到注意力计算中。RoPE（由 [Su 等人在 2021 年的 RoFormer 论文中介绍](https://arxiv.org/abs/2104.09864)）全称为 Rotary Position Embedding（旋转位置嵌入），被认为是一种相对位置方法。

#### 3.1 在 RoPE 中将旋转移至注意力内部

在注意力机制中，每个 token 的当前表示被投影为查询（query）、键（key）和值（value）向量。查询-键的点积决定了注意力分数。经过掩码和 softmax 处理后，生成的权重决定了值向量如何混合。如需回顾，请参阅我的文章 [理解并编码 LLM 中的自注意力、多头注意力、因果注意力和交叉注意力](https://magazine.sebastianraschka.com/p/understanding-and-coding-self-attention)：
[理解并编码 LLM 中的自注意力、多头注意力、因果注意力和交叉注意力2024年1月14日阅读全文](https://magazine.sebastianraschka.com/p/understanding-and-coding-self-attention)

RoPE 使用 token 的位置在其点积之前旋转其查询和键向量。值向量绕过此旋转。下图 14 展示了 RoPE 在相对较新的 MiniMax-M3 模型中的应用位置，其中 QK-Norm 在 RoPE 之前对查询和键进行归一化。

[https://substackcdn.com/image/fetch/$s_!xNEB!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F309c52ca-ad27-4336-a463-cde0050b3425_1764x2311.png](https://substackcdn.com/image/fetch/$s_!xNEB!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F309c52ca-ad27-4336-a463-cde0050b3425_1764x2311.png)

图 14：MiniMax-M3 在注意力内部对查询和键应用 RoPE。

如上图所示，LLM 架构没有在初始 token 嵌入旁边显式添加位置向量。其显式位置信号是在注意力内部注入的。

旁注：MiniMax-M3 仅旋转每个查询和键头的一部分，这种变体称为“部分 RoPE”，我们将在第 6.1 节中介绍。但为了首先理解基本的 RoPE 操作，让我们通过一个小例子逐步 walkthrough 该方法。

#### 3.2 从 token 表示到 RoPE 中的特征对

注意力通常将其查询、键和值特征划分为多个头（heads），这些头并行处理。因此，整个机制通常被称为多头注意力（Multi-head Attention）（注意：分组查询注意力也使用多个头）。在这里，每个注意力头计算其自己的注意力分数和加权总和。RoPE 然后作用于每个查询和键头内的数字对。

为了使这具体化，下图 12 展示了一个 token 表示通过学习的查询和键投影的过程，这些投影是通过权重矩阵 *WQ* 和 *WK* 计算的。在这个玩具示例中，每个投影产生 16 个特征，这些特征被重塑为两个头，每个头有八个特征。在下图中，每个小单元格包含一个标量特征，即向量中的一个数值条目（由于空间原因，数字未显示）。

[https://substackcdn.com/image/fetch/$s_!0J_2!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3a99d70f-f237-4af5-8f0d-9f672e8193a7_2755x2720.png](https://substackcdn.com/image/fetch/$s_!0J_2!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3a99d70f-f237-4af5-8f0d-9f672e8193a7_2755x2720.png)

图 15：将隐藏状态投影，重塑为 heads，并为 RoPE 配对特征。

对于第一个具有 8 个特征的 head，即 `[1, 2, 3, 4, 5, 6, 7, 8]`，我们将前半部分的每个特征与后半部分对应的特征配对。这给出了 `(1, 5)`、`(2, 6)`、`(3, 7)` 和 `(4, 8)`。这种*半拆分*约定被用于 LLM 实现中，包括我的 [Qwen3 实现](https://github.com/rasbt/LLMs-from-scratch/blob/main/ch05/11_qwen3/standalone-qwen3.ipynb)。（在实现基本操作后，我们将将其与原始的、替代的相邻特征配对方法进行对比。）

每对特征获得的旋转角度由 token 位置 *m* 和该对的频率 *θi* 决定。对应的 query 和 key 对使用相同的频率。下面的图 16 展示了我们如何旋转这些对，将更新后的特征放回原始位置，并计算 query-key 的点积。

[https://substackcdn.com/image/fetch/$s_!LQ-n!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe010e216-c965-4313-ace6-6682016a3177_2671x1543.png](https://substackcdn.com/image/fetch/$s_!LQ-n!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe010e216-c965-4313-ace6-6682016a3177_2671x1543.png)

图 16：成对旋转产生用于计算注意力分数的旋转后的 query 和 key 向量。

下一节将更缓慢地逐步讲解这些图。

#### 3.3 在 RoPE 中旋转一对特征

对于以下示例，我们将使用与之前相同的位置。query 来自位置 *m* = 5 处的“the”，key 来自位置 *n* = 2 处的第一个“fox”。由于在此示例中，key 位于 query 之前，因果掩码允许 query 关注它。

为了说明位置的影响，并保持其他所有条件不变，让我们假设我们从相同的两个值 (1, 5) 开始这两对特征。

![图 17 — query 对特写](https://substackcdn.com/image/fetch/$s_!LgZZ!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6690385d-65a0-41e7-b2f8-7d0ce501c264_2650x461.png)

图 17：第一个特征对 (1, 5) 从 query head 的每个半部分取一个条目。

此外，对于此示例，让我们使用 *θ* = 20° 每个 token 位置（即每个位置 *π*/9 弧度）。在位置 2，我们将 key 的箭头逆时针旋转 2 × 20° = 40°。在位置 5，我们将 query 的箭头旋转 5 × 20° = 100°。

[https://substackcdn.com/image/fetch/$s_!RhWQ!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F03367132-6eb1-44cd-85fd-afb47314c6a9_2672x1716.png](https://substackcdn.com/image/fetch/$s_!RhWQ!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F03367132-6eb1-44cd-85fd-afb47314c6a9_2672x1716.png)

图 18：从 (1, 5) 开始，RoPE 在位置 2 将 key 对旋转 40°，在位置 5 将 query 对旋转 100°。

为了说明上图中的情况，例如，将 cos 40° ≈ 0.766 和 sin 40° ≈ 0.643 代入图 16 中的旋转公式，得到新的 key 坐标：

![公式 5: k' = (1\cos40^\circ - 5\sin40^\circ,\;1\sin40^\circ+5\cos40^\circ) \approx (-2.448,\;4.473).](https://substackcdn.com/image/fetch/$s_!DBMJ!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcfe39910-8f5a-4edf-88e2-018f960a0435_2240x82.png)

然后，将 40° 改为 100°，使用与上述相同的方程，旋转后的 query 对变为 *q′* ≈ (−5.098, 0.117)。但重要的是，两个箭头的长度仍然为 √26。只有旋转发生了变化，但向量在变换后保持相同的长度。

因此，对于位置 *m* 处的 query 对 (*a*, *b*)，这里的两个操作是：

![公式 6: \begin{aligned} a' &= a\cos(m\theta)-b\sin(m\theta), \\ b' &= a\sin(m\theta)+b\cos(m\theta). \end{aligned}](https://substackcdn.com/image/fetch/$s_!YiBj!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6de4a384-3c18-4bbc-9346-08ae327ee6f2_2240x154.png)

对于位置 *n* 处的键值对，我们使用相同的方程，但将角度乘以 *nθ*。

![公式 7：\begin{aligned}a' &= a\cos(n\theta)-b\sin(n\theta), \\b' &= a\sin(n\theta)+b\cos(n\theta).\end{aligned}](https://substackcdn.com/image/fetch/$s_!HQdc!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0eccfd5c-a1f5-4f7f-b40a-4ec197d7a218_2240x154.png)

（第 4 节稍后将展示 RoPE 如何为每个特征对计算角频率。）

为了结束本节，对于更习惯于阅读代码的读者，到目前为止所阐述的关于 RoPE 的所有内容都可以写成代码，如下所示：

```
import torch

query_head = torch.tensor([1., 2., 3., 4., 5., 6., 7., 8.])
key_head = query_head.clone()

## 分半配对给出 (1, 5), (2, 6), (3, 7) 和 (4, 8)。
query_pairs = torch.stack(query_head.chunk(2), dim=-1)
key_pairs = torch.stack(key_head.chunk(2), dim=-1)

## 取每个 head 的第一个特征对。
q = query_pairs[0]
k = key_pairs[0]

m = 5  # 查询位置（在我们的例子中，是“the”）
n = 2  # 键位置（在我们的例子中，是第一个“fox”）
theta = torch.deg2rad(torch.tensor(20.0))  # 每个位置对应的弧度

def rotate_pair(pair, angle):
    a, b = pair
    c, s = torch.cos(angle), torch.sin(angle)
    return torch.stack((a * c - b * s, a * s + b * c))

k_rot = rotate_pair(k, n * theta)  # 2 × 20° = 40°
q_rot = rotate_pair(q, m * theta)  # 5 × 20° = 100°

print(f"Original key:   ({k[0]:g}, {k[1]:g})")
print(f"Original query: ({q[0]:g}, {q[1]:g})")
print(f"Rotated key:    ({k_rot[0]:.3f}, {k_rot[1]:.3f})")
print(f"Rotated query:  ({q_rot[0]:.3f}, {q_rot[1]:.3f})")
```

得到的值如下：

```
<code>Original key:   (1, 5)
Original query: (1, 5)
Rotated key:    (-2.448, 4.473)
Rotated query:  (-5.098, 0.117)</code>
```

如果我们旋转 8 特征查询（和键）向量中的所有 4 个对，我们会得到下面的向量。（我们稍后会回到如何从旋转一个对扩展到旋转所有对的问题。）

```
<code>Original key:   (1, 2, 3, 4, 5, 6, 7, 8)
Original query: (1, 2, 3, 4, 5, 6, 7, 8)
Rotated key:    (-2.448, 1.577, 2.951, 3.994, 4.473, 6.125, 7.021, 8.003)
Rotated query:  (-5.098, 0.928, 2.877, 3.986, 0.117, 6.256, 7.051, 8.007)</code>
```

#### 3.4 相对偏移量如何改变 RoPE 中的注意力分数

请注意，如上所示，查询和键 head 各有八个特征，我们之前将它们分组为 4 个对，每对包含两个元素，例如 (1, 5) 和 (2, 6)，依此类推。为了简化，这里我们只跟踪每个 head 中的第一对 (1, 5)，该对由索引 0 和 4 处的条目组成：

```
<code>Original key:   (1, 5)
Original query: (1, 5)
Rotated key:    (-2.448, 4.473)
Rotated query:  (-5.098, 0.117)</code>
```

如上所示，在我们的例子中，这些条目在旋转前在两个 head 中的值均为 (1, 5)。

此外，就像上面的代码一样，让我们使用符号 *q* =(*q1*, *q2*) 和 *k* =(*k1*, *k2*) 来表示这两个对。为了计算它们的点积，使用标准点积公式，我们将对应的坐标相乘并求和：

![公式 8：q\cdot k=q_1k_1+q_2k_2.](https://substackcdn.com/image/fetch/$s_!NqAC!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff26d2b45-d5fd-49cb-ae1c-baae68e98d77_2240x73.png)

旋转前，这对向量的点积为 1 × 1 + 5 × 5 = 26。使用上一张图（图 18）中的近似坐标，可以得到旋转后第一对向量的贡献：

![公式 9：q'\cdot k'\approx(-5.098)(-2.448)+(0.117)(4.473)\approx13.00.](https://substackcdn.com/image/fetch/$s_!scnp!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd175c135-b520-49e6-8d10-f18888e3743c_2240x82.png)

我们可以通过将点积表示为两个向量（图 18 中的箭头）的长度及其之间夹角 *ϕ* 的函数来理解这一点。

![公式 10：q'\cdot k'=\lVert q'\rVert\,\lVert k'\rVert\cos\phi.](https://substackcdn.com/image/fetch/$s_!GpbH!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F176ef9de-46fa-4bf4-8a1c-a90d14c13874_2240x82.png)

在这两种情况下，向量长度均为 √26。查询向量（位置 5）旋转了 100°，键向量（位置 2）旋转了 40°。由于向量（箭头）起始方向相同，旋转后它们之间的夹角为 60°。它们的精确点积为 26 × cos(60°) = 13。

现在让我们看看，如果我们将键从位置 2 移动到位置 3，但保持其起始坐标 (1, 5) 不变，会发生什么。此时键的旋转角度从 2 × 20° = 40° 变为 3 × 20° = 60°。查询向量仍然旋转 100°，因此箭头之间的夹角缩小到 40°，点积从 13 变为 26 × cos(40°) ≈ 19.92。因此，即使我们使用相同的特征值，将键向查询方向移动一个位置也会改变点积。

为什么这些点积很重要？在注意力机制中，我们将所有特征对的贡献求和以获得查询-键点积。RoPE 可以改变这些点积，从而改变 softmax 分配给值向量的权重。

![Equation 11: \operatorname{Attention}(Q',K',V) =\operatorname{softmax}\!\left(\frac{Q'(K')^\top}{\sqrt{d}}\right)V.](https://substackcdn.com/image/fetch/$s_!haoa!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe2351921-4dc0-4904-9d35-941e3de77a9f_2240x162.png)

在上述注意力方程中，*Q′* 和 *K′* 是包含一个头部的旋转查询 *q′* 和键 *k′* 的矩阵，*V* 包含值，*d* 是头部维度。

#### 3.5 为什么在 RoPE 中同时移动两个位置会保持注意力分数不变

既然我们展示了点积的计算过程，而这是注意力机制的核心，让我们回到位置 *m* = 5 和 *n* = 2。如果我们将两个位置同时向右移动三个位置，我们得到 *m* = 8 和 *n* = 5。每个向量的旋转都增加了 60°（查询从 100° 变为 160°，键从 40° 变为 100°），然而，向量之间的夹角保持不变。该特征对的点积仍然是 13。

[https://substackcdn.com/image/fetch/$s_!2bNG!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5c627967-3788-4e17-85ef-8d6e716d2284_2525x785.png](https://substackcdn.com/image/fetch/$s_!2bNG!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5c627967-3788-4e17-85ef-8d6e716d2284_2525x785.png)

图 19：第一对点积在三种不同位置设置下的情况。

关键在于旋转角度之差为

![Equation 12: n\theta-m\theta=(n-m)\theta.](https://substackcdn.com/image/fetch/$s_!Q7jd!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0a220d40-c355-48e0-9bfc-6318fe46e2ef_2240x79.png)

如果我们保持原始查询和键向量不变，并将两个 token 的位置同时移动相同的量，RoPE 会对两个向量添加相同的旋转。它们之间的夹角保持不变，因此它们的点积也保持不变。请注意，下面的图 20 使用了比实际示例（每个位置 20°）更小的角度，以保持图片的可读性。

[https://substackcdn.com/image/fetch/$s_!jxZL!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F88495cb6-f380-43db-aeab-0f50afbd41b0_2610x888.png](https://substackcdn.com/image/fetch/$s_!jxZL!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F88495cb6-f380-43db-aeab-0f50afbd41b0_2610x888.png)

图 20：共享的位置偏移保持了固定查询和键特征的相对角度和点积。

上述示例和图 20 说明了 RoPE 背后的主要思想。我们使用每个 token 的位置来旋转注意力模块中相应的查询和键。在查询-键点积中，重要的是一个向量相对于另一个向量的旋转量。对于每个特征对，这种旋转差异仅取决于两个 token 之间的偏移量。

为了在宏观背景下说明这一点，在图 21 中，每一行收集了一个查询（query）的得分。如果我们看第 5 行，查询为“the”，以及第 2 列，键（key）为“fox”，那么这两个向量之间的注意力得分是通过查询和键向量的两个旋转版本之间的点积计算得出的。

[https://substackcdn.com/image/fetch/$s_!0dw5!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2a413998-3f9a-477b-9fb6-d475bdedf847_2791x1962.png](https://substackcdn.com/image/fetch/$s_!0dw5!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2a413998-3f9a-477b-9fb6-d475bdedf847_2791x1962.png)

图 21：softmax 之前的单个 head 的注意力得分。灰色单元格标记了被因果掩码（causal mask）排除的未来键。

那么，重点是什么？让我们再次考虑句子“The red fox jumps over the gray fox.”。如果在句子之前添加 100 个 token（例如，考虑系统提示），那么第一个“fox”和第二个“the”的位置将从 2 和 5 变为 102 和 105。然而，任何长度的前缀都会使这两个位置同时移动相同的量，因此它们仍然保持恰好三个位置的距离。这意味着，每个向量（箭头）都获得了完全相同的额外旋转，这保持了它们之间的角度以及它们的点积（假设我们保持未旋转的查询和键向量固定；在实际模型中，100 个 token 的新前缀可以通过改变 token 的注意力目标来改变这些向量）。

图 22 在注意力得分矩阵中跟踪了这一比较。右侧面板显示了添加前缀后句子的行和列。在我们的玩具示例中，第一对仍然对点积贡献 13。

[https://substackcdn.com/image/fetch/$s_!yQkh!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F19ac0a71-c4d4-4cbe-b1ec-04371b5b3a58_2691x1745.png](https://substackcdn.com/image/fetch/$s_!yQkh!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F19ac0a71-c4d4-4cbe-b1ec-04371b5b3a58_2691x1745.png)

图 22：高亮的得分从第 5 行、第 2 列移动到了第 105 行、第 102 列。如果我们在旋转前保持查询和键向量固定，它保持相同的值。

正如你可能记得的，在原始 Transformer 的正弦编码中，固定偏移量也对应于每个正弦/余弦对内的固定旋转。但是，这种共享旋转仅适用于位置向量（添加到输入向量中），而不是注意力机制内部的键和查询向量。

图 23 比较了这种偏移在我们目前介绍的三种方法中的变化。

[https://substackcdn.com/image/fetch/$s_!qAmy!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbf8cae0f-aa03-454c-b94e-dde8dd5ae680_2640x2488.png](https://substackcdn.com/image/fetch/$s_!qAmy!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbf8cae0f-aa03-454c-b94e-dde8dd5ae680_2640x2488.png)

图 23：在正弦编码、GPT-2 的学习位置嵌入和 RoPE 下，相同的位置偏移。

#### 3.6 附录：在 RoPE 中将配对组合成完整的 head

为了了解相对偏移如何影响点积，我们专注于查询和键中的一个特征对。现在，让我们将所有四个配对组合在一起，看看 RoPE 如何在单个注意力 head 中旋转完整的八维特征向量。（如果觉得技术细节过多，可以跳过本节。）

图 24 接着图 17 的内容。我们对每一对进行旋转，然后将结果放回查询的原始特征顺序中。

[https://substackcdn.com/image/fetch/$s_!j9TT!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F114f482b-e080-4ce2-9698-f489a9b305eb_2774x2836.png](https://substackcdn.com/image/fetch/$s_!j9TT!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F114f482b-e080-4ce2-9698-f489a9b305eb_2774x2836.png)

图 24：RoPE 以各自的角度旋转每对查询特征。（同样的操作也可应用于键，为了简化图示此处未展示）。

上图 24 展示了旋转后的查询 *q′*（位于底部）。类似地，我们可以在键的位置重复相同的步骤来获得旋转后的键 *k′*。

回顾第 3.3 节中的两个方程。对于输入值为 (*ai*, *bi*) 的查询对 *i*，令 *ci* = cos(*mθi*) 且 *si* = sin(*mθi*)。这些是该查询对在第 *m* 个查询位置处的旋转角度的余弦和正弦值：

![方程 13: \begin{aligned} a_i' &= c_i a_i - s_i b_i, \\ b_i' &= s_i a_i + c_i b_i. \end{aligned}](https://substackcdn.com/image/fetch/$s_!ee1I!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdd9437a4-f85c-4e46-b7c7-673e39afd841_2240x155.png)

下图 25 将图 24 中的四对旋转展示为单个矩阵乘法 *q′* = *Rmq*。

[https://substackcdn.com/image/fetch/$s_!yWYT!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5fd7a9e5-0263-4d31-bae4-787834c245b7_2634x2850.png](https://substackcdn.com/image/fetch/$s_!yWYT!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5fd7a9e5-0263-4d31-bae4-787834c245b7_2634x2850.png)

图 25：将图 24 中的四次旋转写成一个矩阵乘法。配对标签显示了每次旋转在完整矩阵中的位置。

### 4. 如何计算 RoPE 中的旋转频率？

一个完整的注意力头使用多种频率，使得某些特征对随位置变化更剧烈（在 RoPE 术语中称为“快”），而另一些特征对变化更缓慢（在 RoPE 术语中称为“慢”）。这与原始 Transformer 中正弦编码中的多频率具有相同的目的。

然而，我们并不手动分配这些频率，而是对于具有 *d* 个特征的注意力头，标准的全量 RoPE 为其 *d*/2 对特征中的每一对计算一个频率，如下所示：

![方程 14: \theta_i=b^{-2i/d}.](https://substackcdn.com/image/fetch/$s_!UFXx!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Febff1490-d57b-4eb3-a837-0a3426a18f0c_2240x84.png)

其中，

- *d* 是注意力头的维度（它必须是偶数，以便所有特征都能成对排列）。
- *i* 是配对的索引；其范围从 0 到 *d*/2−1。
- *b* 是一个选定的基数（超参数），用于确定频率之间的间距。
- *θi* 是配对 *i* 的频率，单位为弧度/令牌位置。

原始的 [RoFormer 论文](https://arxiv.org/html/2104.09864v5#S3.SS3) 使用 *b* = 10,000，借用了原始 Transformer 的频率公式，用头维度 *d* 替换了嵌入宽度 *d*model。

例如，当头维度 *d* = 8 且基数 *b* = 10,000 时，我们得到的频率为 [1, 0.1, 0.01, 0.001] 弧度/位置。

（可选的 [附录 D](https://sebastianraschka.com/supplementary/positional-embeddings/#appendix-d-longer-contexts-and-yarn) 介绍了一种名为 YaRN 的可选技术，该技术通常用于在训练后修改 RoPE 以扩展上下文。）

### 5. 附加内容：在 PyTorch 中实现 RoPE

如果你想在一个完整的模型中查看 RoPE，我推荐查看我从头开始实现的 [Qwen3](https://github.com/rasbt/LLMs-from-scratch/blob/main/ch05/11_qwen3/standalone-qwen3.ipynb)。

由于代码可以是解释和理解概念的有效媒介，如果你感兴趣，下面的小节将带你回顾我们到目前为止涵盖的核心部分。否则，请随意跳到第 6 节，关于 *现代架构中的位置选择*。

因此，对于以下代码片段，我们将使用前面提到的“分割一半”旋转约定（交错约定也会涵盖，不用担心）。首先，我们将它应用于一个查询向量，然后将其用于注意力机制中的查询和键。

#### 5.1 计算并应用旋转

首先，让我们复用图 24 中的 8 特征查询。为方便起见，以下是旋转前的四个特征对。

![图 24 的局部细节 — 原始查询对](https://substackcdn.com/image/fetch/$s_!Wytv!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4bea76ec-3543-4b3a-a9ff-870d91b41255_1800x178.png)

图 24 的局部细节。八个查询特征在半拆分布局中形成四对。

在前面的非编码示例中，为了简化数学计算，我们为第一对选择了每个 token 位置 20° 的频率。在这里，我们将使用上一节 4 中原始的 RoPE 公式，*θi* = *b*−2*i*/*d*，其中头维度 *d* = 8，基数 *b* = 10,000。

图 26 展示了这两个函数如何协同工作来应用这些旋转。

[https://substackcdn.com/image/fetch/$s_!OZLU!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3b99b926-16c6-443c-bcb0-155ba1e63fc2_2596x1542.png](https://substackcdn.com/image/fetch/$s_!OZLU!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3b99b926-16c6-443c-bcb0-155ba1e63fc2_2596x1542.png)

图 26：*rope_params* 返回 token 位置 2 的余弦和正弦表。*rope_split_half* 接收这些表和原始查询，并返回旋转后的查询。

如上图所示，首先，`rope_params` 确定每对需要旋转的角度，返回存储这些角度的余弦和正弦的两个“表”。换句话说，`rope_params` 计算每个旋转角度的余弦和正弦，这取决于 token 的位置和特征对的频率。

```
import torch

def rope_params(head_dim, positions, base=10_000):
    assert head_dim % 2 == 0
    indices = torch.arange(0, head_dim, 2, device=positions.device)
    inv_freq = base ** (-indices.float() / head_dim)
    angles = positions.float()[:, None] * inv_freq[None, :]
    return angles.cos(), angles.sin()
```

`rope_params` 函数中的 `indices` 数组包含第 4 节频率公式中的 2*i* 值：

![公式 15: \theta_i = b^{-2i/d}.](https://substackcdn.com/image/fetch/$s_!UFXx!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Febff1490-d57b-4eb3-a837-0a3426a18f0c_2240x84.png)

对于我们的八特征查询，`indices` 为 `[0, 2, 4, 6]`，即每个特征对对应一个 2*i* 值。假设我们使用常见的基数 *b* = 10,000。并沿用我们之前的示例，我们选择较小的头维度 *d* = 8。在这种情况下，`inv_freq` 随后计算四个对的频率 *θi* = *b*−2*i*/*d* 如下：

![公式 16: \theta_0,\theta_1,\theta_2,\theta_3 = \left10{,}000^{-0/8},\;10{,}000^{-2/8},\;10{,}000^{-4/8},\;10{,}000^{-6/8}\right = 1,\;0.1,\;0.01,\;0.001.](https://substackcdn.com/image/fetch/$s_!2Mbm!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9a1fef03-0b62-4701-921b-2961ec0efd83_2240x121.png)

如上所示，得到的 `inv_freq` 为每个特征对（以弧度为单位）每个 token 位置提供一个频率 *θi*。

接下来，`angles` 将每对的频率 *θi* 与 token 位置 *m* 相乘，从而计算旋转角度 *mθi*。在我们的示例中，`positions = [2]`，我们得到：

![公式 17: 2\theta_0,\;2\theta_1,\;2\theta_2,\;2\theta_3 = 2\times1,\;2\times0.1,\;2\times0.01,\;2\times0.001 = 2,\;0.2,\;0.02,\;0.002.](https://substackcdn.com/image/fetch/$s_!G-9t!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F14cc892f-79ac-4dec-84cd-039f81e722c9_2240x79.png)

最后，`rope_params` 取每个角度的余弦和正弦，并将它们作为两个所谓的余弦表和正弦表 `cos` 和 `sin` 输出。在这两个表中，每一行是一个 token 位置，每一列是一个特征对。由于我们这里只使用 token 位置 2，每个表的形状为 `(1, 4)`，单行如下所示：

![公式 18: \begin{aligned} \texttt{cos}:\quad \cos(2),\;\cos(0.2),\;\cos(0.02),\;\cos(0.002) &\approx -0.416147,\;0.980067,\;0.999800,\;0.999998, \\ \texttt{sin}:\quad \sin(2),\;\sin(0.2),\;\sin(0.02),\;\sin(0.002) &\approx 0.909297,\;0.198669,\;0.019999,\;0.002000. \end{aligned}](https://substackcdn.com/image/fetch/$s_!bLWh!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa6c52934-fa04-4d92-84d0-7bad016d1208_2240x148.png)

在图 26 的示例中，每个表对于 token 位置 2 有一行，并包含四列，每列对应一个 feature pair（特征对）。图 27 展示了每个对的旋转角度以及两个表中对应的条目。

![图 27 — cos sin 表](https://substackcdn.com/image/fetch/$s_!1YrR!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F871d5113-e3f8-407b-9747-5051495fa9d3_2676x1033.png)

图 27：*rope_params* 为 token 位置 2 返回的两个表。*高亮显示的列* 给出了用于旋转第一个 feature pair (1, 5) 的余弦值和正弦值。

简而言之，`rope_params` 计算每个旋转角度的余弦值和正弦值，该角度取决于 token 的位置和 feature pair 的频率。

在实际场景中，如果我们将 1,024 个 token 位置传递给 `rope_params`，上下文大小为 1024，head 维度为 128，它将返回两个张量 `cos` 和 `sin`，每个张量的形状均为 `(1024, 64)`，因为具有 128 个特征的 head 包含 64 个对。

这些表没有 batch 或 head 维度，我们将每个 `(1024, 64)` 的表在 batch 和 head 维度上进行广播。因此，如果我们使用具有 32 个 head 的多头注意力机制或多查询注意力机制，位于 token 位置 2 的 feature pair 0 在所有 32 个 head 中使用相同的旋转角度。每个 head 旋转其自身的特征值，因此旋转后的查询在各个 head 之间仍然可以不同。此外，相同的条目可以在使用相同位置和频率的查询、键和 head 之间重用。简而言之，我们只需为模型中所有位置（直到最大支持的上下文大小）预先计算这些表一次。

从技术上讲，也可以将这些表与模型权重一起存储；但由于它们的计算成本极低，将它们存储在磁盘上是杀鸡用牛刀。

接下来，`rope_split_half` 使用这些余弦值和正弦值来旋转注意力机制中查询和键向量内的实际特征。

```
def rope_split_half(x, cos, sin):
    first, second = x.float().chunk(2, dim=-1)
    return torch.cat((
        first * cos - second * sin,
        first * sin + second * cos,
    ), dim=-1).to(x.dtype)
```

再次考虑简单的 8 特征示例，上述代码片段中的 `.chunk` 将查询拆分为 `[1, 2, 3, 4]` 和 `[5, 6, 7, 8]`，并将每对中的两个条目对齐。例如，每个半部分的第一个槽位给出 `(1, 5)`，第二个给出 `(2, 6)`，依此类推。`torch.cat` 内的两个表达式使用第 3.3 节中的方程计算旋转后的半部分：

![公式 19: \begin{aligned} a_i' &= a_i\cos(m\theta_i) - b_i\sin(m\theta_i), \\ b_i' &= a_i\sin(m\theta_i) + b_i\cos(m\theta_i). \end{aligned}](https://substackcdn.com/image/fetch/$s_!cIqH!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbcf9b781-1fac-40b7-83e7-54f6c36e3fec_2240x155.png)

请注意，这里所有用 *ai* 表示的内容对应于查询的第一半部分，而所有用 *bi* 表示的内容来自第二半部分。`torch.cat` 内的第一个表达式计算所有的 *ai′* 值，第二个表达式计算所有的 *bi′* 值。

然后，我们将半部分拼接起来，通过 `torch.cat` 将每个值放回其原始索引位置。

以下是生成前面图 26 中旋转查询的代码。所示的 reshape `(1, 1, 1, 8)` 只是将简单的玩具数组调整为预期的格式：一个 batch 项，一个 head，一个 token 和八个特征。

```
positions = torch.tensor([2])
cos, sin = rope_params(8, positions)

q = torch.arange(1., 9.).reshape(1, 1, 1, 8)
q_rot = rope_split_half(q, cos, sin)
print(q_rot[0, 0, 0])
```

对于多个位置，每个 token 只需从 `cos` 和 `sin` 表中选取其对应的行。通过广播机制，PyTorch 会在所有 batch 项和 attention heads 之间复用这些相同的表。

#### 5.2 在因果注意力中使用 RoPE

到目前为止，我们已经编写了 RoPE 的工具函数。现在让我们在实际的注意力机制上下文中使用它。这里我们使用标准的频率调度方案，针对两个 8 特征 heads 和四个 token 位置。我们使用随机的 query、key 和 value 张量来保持示例的独立性，但如前所述，你也可以选择查看端到端的 [Qwen3 从零开始实现](https://github.com/rasbt/LLMs-from-scratch/blob/main/ch05/11_qwen3/standalone-qwen3.ipynb)，其中使用了预训练模型生成的真实 query、key 和 values。

```
torch.manual_seed(123)

q = torch.randn(1, 2, 4, 8) # 1 batch, 2 heads, 4 tokens, 8 head dim
k = torch.randn(1, 2, 4, 8)
v = torch.randn(1, 2, 4, 8)
positions = torch.arange(4)

cos, sin = rope_params(8, positions)
q_rot = rope_split_half(q, cos, sin)
k_rot = rope_split_half(k, cos, sin)
scores = q_rot @ k_rot.transpose(-2, -1) / q.shape[-1] ** 0.5

future_mask = positions[None, :] > positions[:, None]
masked_scores = scores.masked_fill(future_mask, -torch.inf)
weights = torch.softmax(masked_scores, dim=-1)
context = weights @ v
```

请注意，只有 `q` 和 `k` 经过 RoPE，而 `v` 不经过。生成的原始注意力分数存储在一个形状为 `(1, 2, 4, 4)` 的张量中，即每一行对应一个 query 位置，每一列对应一个 key 位置。由于我们有四个 token，且每个 token 都关注其他所有 token，因此维度为 4x4。

然后，使用常规的注意力代码实现，因果掩码将未来 key 的分数替换为负无穷大，以便在 softmax 后将其置零。生成的 `context` 张量形状为 `(1, 2, 4, 8)`；其中 4 表示我们有四个 token，8 表示嵌入维度原本为 8。

我们还可以验证关于相对偏移的主张，即给每个位置加 3 应该改变位置，但保持 query-key 的偏移量不变：

```
cos_shifted, sin_shifted = rope_params(8, positions + 3)
q_shifted = rope_split_half(q, cos_shifted, sin_shifted)
k_shifted = rope_split_half(k, cos_shifted, sin_shifted)
scores_shifted = (
    q_shifted @ k_shifted.transpose(-2, -1) / q.shape[-1] ** 0.5
)
torch.testing.assert_close(scores, scores_shifted) 
## Should return True
```

#### 5.3 另一种特征配对约定

我在本文多次提到了 *split-halves*（分半）约定。[原始 RoPE 论文](https://arxiv.org/abs/2104.09864) 使用了替代的 *interleaved*（交错）约定，[原始 LLaMA 实现](https://github.com/meta-llama/llama/blob/llama_v1/llama/model.py) 也是如此（但如前所述，大多数代码实现现在使用 split-halves，因为它在代码中更容易通过逐元素的正弦和余弦运算一次性旋转所有对）。

为了说明两种布局之间的差异，下面的图 28 在两行中使用了相同的 8 特征向量。

![Figure 28 — feature pairing](https://substackcdn.com/image/fetch/$s_!pSrd!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F376d895d-ffc0-41ec-8cf5-5e84834412fc_2641x804.png)

图 28：Split-half 将前半部分的每个特征与后半部分的相应特征配对。Interleaved 将相邻特征配对。

Interleaved 实现使用相同的两个方程，但选择交替的特征并交错输出。

```
def rope_interleaved(x, cos, sin):
    even, odd = x.float()[..., 0::2], x.float()[..., 1::2]
    return torch.stack((
        even * cos - odd * sin,
        even * sin + odd * cos,
    ), dim=-1).flatten(-2).to(x.dtype)
```

但从数学角度来看，当我们考虑特征顺序时，这些布局是等价的。因此，将条目 `[1, 2, 3, 4, 5, 6, 7, 8]` 重新排列为 `[1, 5, 2, 6, 3, 7, 4, 8]` 可以使分裂半对（split-half pairs）相邻，形成对 (1, 5)、(2, 6) 等。如果我们将相同的重排应用于查询（queries）和键（keys），结果将是相同的点积。

```python
order = torch.tensor([0, 4, 1, 5, 2, 6, 3, 7], device=q.device)
q_rot_interleaved = rope_interleaved(q[..., order], cos, sin)
k_rot_interleaved = rope_interleaved(k[..., order], cos, sin)
scores_interleaved = (
    q_rot_interleaved @ k_rot_interleaved.transpose(-2, -1)
    / q.shape[-1] ** 0.5
)

torch.testing.assert_close(q_rot[..., order], q_rot_interleaved)
torch.testing.assert_close(k_rot[..., order], k_rot_interleaved)
torch.testing.assert_close(scores, scores_interleaved)
## 这应该全部返回 True
```

输出保留了重排后的特征，因此我们使用相同的顺序将它们与分裂半输出进行比较。然而，将这两种布局应用于原始向量会产生不同的分数。

### 6. 现代架构中的位置选择

自 [原始 LLaMA 模型](https://scontent.fcps4-2.fna.fbcdn.net/v/t39.2365-6/333007794_1182140292435357_4481174526219500228_n.pdf?_nc_cat=101&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=3c67a6&_nc_ohc=SrzHHMeB_5gQ7kNvwGdTCab&_nc_oc=AdonSC2oKCA4Qqs-KfR7_70m4s4_1QpPwBxDyuqu_KXyCswnUioaZNf1qyZckeLl6qPZge_29DAoPzzJbtkmdFP2&_nc_zt=14&_nc_ht=scontent.fcps4-2.fna&_nc_gid=aOwcXBC5dn_BAgAvPaHuBA&_nc_ss=7b289&oh=00_AQR_JQr4O14JgKxukyTSvBG_TEEoi37pQAo0flfY68Vquw&oe=6AFEA511) 以来，RoPE 已成为大多数（开源权重）LLM 的标准配置。当然，专有模型也可能使用它，但要对专有模型做出 100% 确定的断言总是很难。

然而，近年来，许多架构正在从每个 Transformer 块中使用完整的 RoPE 转向其他方案。在以下小节中，我们将讨论其中一些变体。

例如，我们在上述章节中讨论和实现的完整 RoPE 实现会旋转 *每个* 查询和键头中的 *每个* 特征对。

在下面的小节示例中，我们将看到，某些模型仅旋转头内的部分特征，某些模型在某些 Transformer 块中跳过 RoPE，而另一些模型则采用不同的方法，直接将位置信息添加到注意力分数中。

#### 6.1 部分 RoPE

正如本文通篇所述，常规的“完整” RoPE 会旋转每个查询和键头中的所有维度。部分 RoPE（Partial RoPE）是一种变体，它仅旋转子集，而保持其余维度不变。

例如，[MiniMax-M3 的配置](https://huggingface.co/MiniMaxAI/MiniMax-M3/blob/main/config.json) 在每个 128 维的头中使用 64 个旋转维度。这给出了 32 个旋转特征对和 64 个未改变的维度。下图说明了其外观。

[https://substackcdn.com/image/fetch/$s_!HikP!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4515ea8c-8759-4aca-a824-64f0f42d080e_2616x1657.png](https://substackcdn.com/image/fetch/$s_!HikP!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4515ea8c-8759-4aca-a824-64f0f42d080e_2616x1657.png)

图 29：128 维头中的完整 RoPE 和部分 RoPE。

请注意，如果我们看穿第一个 Transformer 块，未旋转的特征仍然可以包含从早期 Transformer 块继承的位置信息。

无论如何，部分 RoPE 的意义何在？它节省了一些内存。例如，在上述 MiniMax-M3 示例中，旋转一半的特征会使预计算的余弦和正弦表的大小减半。因此，使用部分 RoPE 时，每个表现在只需要 32 列，而不是 64 列。但是，请注意，KV 缓存仍然为每个缓存令牌存储完整的键和值向量。

对于 MiniMax-M3 的 1M 令牌上下文，旋转 128 个特征中的 64 个会使预计算的余弦和正弦表的大小减半，如果表以 BF16 存储，可节省 0.134 GB（128 MiB）。如果表本身以 NVFP4 存储，则包括块比例在内的节省量为 0.038 GB（36 MiB）。

请注意，在 1B 到 8B 模型的实验中，*《Fractional Rotation, Full potential?》*（[Fractional Rotation, Full potential?](https://arxiv.org/abs/2603.11611)）论文发现，旋转每个 head 约 10% 的特征通常能产生与完整 RoPE 相似的训练损失和基准准确率。然而，完整 RoPE 在某些评估中表现更好。

因此，在我看来，部分 RoPE 几乎不值得采用。

#### 6.2 NoPE 层

NoPE 这一术语出自《[The Impact of Positional Encoding on Length Generalization in Transformers](https://arxiv.org/abs/2305.19466)》一文，意为*无显式位置编码*。其核心思想或观察结果是：即使没有任何显式位置方法的注意力层，仍然拥有因果掩码（causal mask），即查询（query）只能关注自身及之前的 token。这种因果掩码隐式地提供了位置信息。

让我们使用之前示例中的前四个 token：`The red fox jumps`。在图 30 中，位置 2 的 `fox` 的查询可以关注 `The`、`red` 以及它自身。位置 1 的 `red` 的查询可以关注 `The` 以及它自身。

[https://substackcdn.com/image/fetch/$s_!2NXi!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8ebf07fb-5de9-4446-abb3-4fdd15d1f6b1_2357x1614.png](https://substackcdn.com/image/fetch/$s_!2NXi!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8ebf07fb-5de9-4446-abb3-4fdd15d1f6b1_2357x1614.png)

图 30：注意力机制中因果掩码的示例。

那么，下一个问题是模型如何利用因果掩码作为位置信号？这里有一个改编自该论文的玩具示例。

假设值向量（value vectors）的一个特征对于 `The` 为 1，对于其他三个 token 为 0。由于输入中只包含一个 `The`，每个可见的前缀恰好包含一个 1。如果所有非掩码键（keys）获得相同的注意力分数，softmax 会为每个可见 token 分配相等的权重。

因此，在 `fox` 处，注意力对 1、0 和 0 取平均，结果为 1/3。在 `jumps` 处，它对四个值取平均，结果为 1/4。换句话说，该输出特征等于前缀长度的倒数，后续层可以将其用作位置信号。

[https://substackcdn.com/image/fetch/$s_!QWKi!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fae9e1c64-4cd3-4184-a0d8-b17873dd710a_2640x1386.png](https://substackcdn.com/image/fetch/$s_!QWKi!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fae9e1c64-4cd3-4184-a0d8-b17873dd710a_2640x1386.png)

图 31：在均匀注意力下，*The* 的贡献随着前缀的增长而缩小。*fox* 的 *The* 查询为 *The* 分配的权重为 1/3。

NoPE 在实践中有效吗？NoPE 论文的研究人员从头开始训练了一个小型的 107M 参数的仅解码器（decoder-only）Transformer，在复制、排序和加法等任务上进行了一些消融实验。

当他们在比训练期间看到的更长的示例上测试该小模型时，有趣的是，NoPE 在十项任务的整体排名中位列第一，并优于 RoPE。[NoPE 论文](https://arxiv.org/html/2305.19466v2) 背后的研究人员还进行了一项单独的实验，使用在代码数据上训练的更大的 1.3B 参数模型。在这里，NoPE 也能处理超出训练长度的上下文，然而，在测试的最长长度下，其下一个 token 的预测表现变差。

（请参阅可选的[附录 C.3](https://sebastianraschka.com/supplementary/positional-embeddings/#c3-evidence-for-nope)，查看 NoPE、RoPE 及其他方法在不同任务上的实证对比。）

如今的一些开源权重 LLM 甚至走得更远，在所有层中使用 NoPE。然而，现在更常见的做法是在至少某些层中省略 RoPE，这里的层指的是 Transformer 块。

举一个具体的例子，[SmolLM3](https://huggingface.co/blog/smollm3#architecture-and-training-details)（3B 参数）在三层中应用 RoPE，并在第四层跳过它，在 36 层中重复该模式。有趣的是，SmolLM3 的作者提到，这种层模式改善了长上下文性能。

（还要注意，任何后续层，即使它可能跳过旋转，仍然会接收来自前面 Transformer 块的输入，因此它的查询（queries）和键（keys）仍然会从早期层接收到某种形式的位置信息。）

[https://substackcdn.com/image/fetch/$s_!iLab!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F26b1e107-4221-4ca8-a579-ac2603366c99_2804x1737.png](https://substackcdn.com/image/fetch/$s_!iLab!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F26b1e107-4221-4ca8-a579-ac2603366c99_2804x1737.png)

图 32：SmolLM3 的架构（左）及其 36 个 Transformer 块中使用的定位方法（右）。每第四个块跳过 RoPE。架构图来自我的 [LLM Architecture Gallery](https://sebastianraschka.com/llm-architecture-gallery/)。

#### 6.3 学习到的相对位置偏置

在我们概览并查看现代架构使用了哪些方法之前，还有另一种方法需要介绍。例如，Thinky 的 [Inkling](https://thinkingmachines.ai/news/introducing-inkling/#architecture) 在其滑动窗口和全局注意力层中都使用了学习到的相对位置偏置。它计算查询和键之间的常规缩放点积，然后在注意力分数计算的 softmax 之前向该分数添加一个数值。该数值取决于查询 token 的隐藏状态以及键向后移动的位置数。

让我们重新使用我们的示例句子，“The red fox jumps over the gray fox.”（我保证这是最后一次！）在下图中，位置 5 的 “the” 是查询，位置 2 的 “fox” 是键。Inkling 然后利用查询和键之间的三个位置间隔以及 “the” 的隐藏状态来计算偏置，然后将其加到缩放点积中。

[https://substackcdn.com/image/fetch/$s_!U-18!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Feb6d1530-6222-49d1-a269-675b1e013253_2658x1232.png](https://substackcdn.com/image/fetch/$s_!U-18!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Feb6d1530-6222-49d1-a269-675b1e013253_2658x1232.png)

图 33：Inkling 在 softmax 之前将学习到的相对位置偏置添加到缩放的查询-键点积中。数字仅为示意。

这并非一个全新的想法。你们中的一些人可能还记得 Google 在 2019 年推出的流行 [T5](https://arxiv.org/abs/1910.10683)（Text-to-Text Transfer Transformer），它使用了这种思想的简化版本。

[https://substackcdn.com/image/fetch/$s_!PMsu!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2d4cfb41-fe76-49ff-b58f-f88c2bec5f5e_2689x2772.png](https://substackcdn.com/image/fetch/$s_!PMsu!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2d4cfb41-fe76-49ff-b58f-f88c2bec5f5e_2689x2772.png)

图 34：原始 Inkling (975B) 架构。学习到的相对位置偏置输入到注意力模块中。[LLM Architecture Gallery](https://sebastianraschka.com/llm-architecture-gallery/)

（请注意，ALiBi 方法，作为 RoPE 的替代方案，也在 softmax 之前添加偏置，如可选的 [附录 C.2](https://sebastianraschka.com/supplementary/positional-embeddings/#c2-rope-and-alibi) 中所述。）

#### 6.4 这些选择在近期模型中的体现

现在，经过所有这些铺垫，有趣的问题是：哪种架构使用了哪种方法？以及最近的趋势是什么？

为了回答这个问题，我将我的 LLM Architecture Gallery 中的条目按其列出的发布日期分组，并将 2025 年的发布版本与 2026 年快照中的早期和后期发布版本进行了比较。每个画廊卡片只计数一次，因此架构的多个变体可以对结果做出贡献。[LLM Architecture Gallery](https://sebastianraschka.com/llm-architecture-gallery/)

[https://substackcdn.com/image/fetch/$s_!eqMT!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb16bfe6e-e42b-4c9a-917e-2380d612d02a_2705x2244.png](https://substackcdn.com/image/fetch/$s_!eqMT!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb16bfe6e-e42b-4c9a-917e-2380d612d02a_2705x2244.png)

图 35：架构图展示了哪些注意力层使用了 RoPE，柱状图显示了各类别在画廊条目中的占比。架构图来自我的 [LLM Architecture Gallery](https://sebastianraschka.com/llm-architecture-gallery/)。

正如我们在上面的图 35 中看到的，在*每个* softmax 注意力层中使用 RoPE 仍然是最常见的选择。然而，其使用率从 2025 年到 2026 年有所下降，并在 2026 年下半年继续下降，这可能是一个趋势。

因此，混合使用 RoPE 和 NoPE 的模型数量正在增加。由于这些群体的规模仍然较小，很难说这些趋势是否会持续。

*仅 NoPE* 的条目都是循环混合模型，其 softmax 注意力层不使用任何显式位置编码。这里的“其他”类别指的是 xLSTM 7B (2025) 和 Inkling (2026)。xLSTM 没有 softmax 注意力层。Inkling 在 softmax 之前向注意力分数添加了一个可学习的偏置，如第 6.3 节所示。

在使用 RoPE 的模型中，从 2025 年到 2026 年，部分 RoPE 变得更加普遍。如图 36 所示，它在 2025 年的 RoPE 模型中占少数，但在 2026 年的两个群体中均占多数。

[https://substackcdn.com/image/fetch/$s_!p9wN!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F16975bd7-c1e0-443b-8241-63f91bc7e303_2734x938.png](https://substackcdn.com/image/fetch/$s_!p9wN!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F16975bd7-c1e0-443b-8241-63f91bc7e303_2734x938.png)

图 36：在使用 RoPE 的画廊条目中，部分 RoPE 在至少一个注意力层中对查询和键特征的一个子集进行旋转。全宽条目在每个使用 RoPE 的层中旋转所有查询和键特征。

如果您想查找 2026 年群体中的单个模型，下面的图 37 展示了 2026 年的画廊概览，其中各个架构按位置类型进行了标注。您还可以在此处交互式浏览画廊 [here](https://sebastianraschka.com/llm-architecture-gallery/)。

[https://substackcdn.com/image/fetch/$s_!X1PL!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3dbac37d-1290-4ab9-92a8-6fe7f54d62e2_2850x2777.png](https://substackcdn.com/image/fetch/$s_!X1PL!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3dbac37d-1290-4ab9-92a8-6fe7f54d62e2_2850x2777.png)

图 37：图 35 中两个 2026 年柱状图背后的各个 2026 年画廊条目。

### 7. 最终思考

总之，我们讨论了 GPT-2 和原始 transformer，它们在第一个 transformer 块之前将位置向量添加到每个 token 嵌入中。然后，现代 LLM 转向使用 RoPE，通过在注意力机制中旋转查询和键来编码相对位置。令人惊讶的是，RoPE 至今仍然是最受欢迎的位置嵌入方法。

然而，最近 Inkling 借鉴了 T5 的想法，在 softmax 之前向注意力分数添加了一个可学习的相对位置偏置。此外，我们还有 NoPE-RoPE 架构，即在某些层中省略 RoPE。

这可能是一条枯燥的消息，但如前所述，RoPE 仍然是主导的位置嵌入方法，我认为这肯定会延续到 2027 年。不过，也许我们会在 2027 年看到更多采用类似 Inkling 设计的架构。

虽然这听起来可能很“枯燥”，但我很高兴在经过这么多年后，终于完成了这篇关于 RoPE（以及其他位置信息方法）的文章，从而将其添加到我的 LLM “基础” 解释文章集中。

（由于本文已经相当长，我将 YaRN 和 ALiBi 等相关技术的解释外包到了可选的[配套附录](https://sebastianraschka.com/supplementary/positional-embeddings/)中。）

如果您对 LLM 的其他架构构建模块感兴趣，我仍然强烈建议从 GPT-2 风格的模型开始，这将帮助您以最小的阻力扎实地理解这些构建模块。在此基础上，您可以进一步叠加其他方法（例如 RoPE）。

如果您想自己构建那个 GPT-2 风格的模型，我的第一本[《从零开始构建大型语言模型》](https://sebastianraschka.com/books/#build-a-large-language-model-from-scratch)书籍详细讲解了下图所示的所有构建模块。

[https://substackcdn.com/image/fetch/$s_!6MRC!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fea9d5f1c-784e-45a1-ba09-37ad96eb3280_2550x2769.png](https://substackcdn.com/image/fetch/$s_!6MRC!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fea9d5f1c-784e-45a1-ba09-37ad96eb3280_2550x2769.png)

图 38：GPT-2 XL 提供了一个基线，用于观察新架构的变化。[LLM 架构画廊](https://sebastianraschka.com/llm-architecture-gallery/)

对于从 GPT-2 基线衍生出的方法，我在下方收集了一些我的相关文章，首先回顾一下自注意力机制：

- **自注意力、因果掩码和多头注意力：** [理解并编码 LLM 中的自注意力、多头注意力、因果注意力和交叉注意力](https://magazine.sebastianraschka.com/p/understanding-and-coding-self-attention)
- **现代注意力变体（GQA、MLA、滑动窗口注意力、稀疏注意力和混合注意力）：** [现代 LLM 中注意力变体的视觉指南](https://magazine.sebastianraschka.com/p/visual-attention-variants)
- **KV 缓存。** [从零开始理解并编码 LLM 中的 KV 缓存](https://magazine.sebastianraschka.com/p/coding-the-kv-cache-in-llms)
- **SwiGLU 前馈层和归一化（LayerNorm 和 RMSNorm）：** [从 GPT-2 到 gpt-oss：分析架构进展](https://magazine.sebastianraschka.com/p/from-gpt-2-to-gpt-oss-analyzing-the)
- **混合专家层和专家路由。** [大型 LLM 架构对比](https://magazine.sebastianraschka.com/p/the-big-llm-architecture-comparison)
- **残差连接和 DeepSeek 的流形约束超连接（mHC）：** [LLM 架构的最新进展：KV 共享、mHC 和压缩注意力](https://magazine.sebastianraschka.com/p/recent-developments-in-llm-architectures)
- **在 Qwen3 中整合部分组件：** [从零开始理解与实现 Qwen3](https://magazine.sebastianraschka.com/p/qwen3-from-scratch) 详细讲解了如何在 PyTorch 中实现密集型和混合专家版本。

---

**感谢您的阅读与支持！**

附注：我开始尝试 Substack 的新“福利”系统。作为对支持者的感谢，我添加了来自架构画廊的[图像导出和元数据](https://magazine.sebastianraschka.com/perks)，供您用于自己的分析。

##### 关于此帖的讨论
[https://substack.com/profile/303172379-nan-deng?utm_source=comment](https://substack.com/profile/303172379-nan-deng?utm_source=comment)[Nan Deng](https://substack.com/profile/303172379-nan-deng?utm_source=substack-feed-item)[3天前](https://magazine.sebastianraschka.com/p/understanding-positional-embeddings/comment/388672046)

MiniMax-M3 的例子清晰地展示了部分 RoPE 的权衡：你缩小了余弦和正弦表，但 KV 缓存仍然存储完整的 key。如果内存收益如此微小，我想知道为什么它在 2026 年的模型中还会出现——是因为存在表格大小数学计算未能捕捉到的质量原因，还是主要继承自早期的实现？
回复分享[Sebastian Raschka, PhD 等 4 条回复](https://magazine.sebastianraschka.com/p/understanding-positional-embeddings/comment/388672046)[https://substack.com/profile/129677294-daniel-kleine?utm_source=comment](https://substack.com/profile/129677294-daniel-kleine?utm_source=comment)[Daniel Kleine](https://substack.com/profile/129677294-daniel-kleine?utm_source=substack-feed-item)[3天前](https://magazine.sebastianraschka.com/p/understanding-positional-embeddings/comment/389079222)

一如既往的好文章！特别感谢关于 RoPE 的部分！:)
回复分享[Sebastian Raschka, PhD 的 1 条回复](https://magazine.sebastianraschka.com/p/understanding-positional-embeddings/comment/389079222)[还有 11 条评论...](https://magazine.sebastianraschka.com/p/understanding-positional-embeddings/comments)

#### 准备好迎接更多内容了吗？
