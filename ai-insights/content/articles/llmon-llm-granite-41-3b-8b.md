---
title: "LLMON：一种面向 LLM 的原生标记语言，现已集成到 Granite 4.1 的 3B 和 8B 模型中"
date: 2026-11-13T12:06:21.685Z
tags: ["LLMON", "Granite 4.1", "IBM", "提示注入", "标记语言", "大模型安全"]
summary: "LLMON：一种面向 LLM 的原生标记语言，现已集成到 Granite 4.1 的 3B 和 8B 模型中 IBM 发布了 LLMON （LLM Object Notation，发音类似 “lemon”），一种专为 LLM 设计的标记语言"
---
> **原文链接**: [https://huggingface.co/blog/ibm-granite/llmon-an-llm-native-markup-language-now-in-granite](https://huggingface.co/blog/ibm-granite/llmon-an-llm-native-markup-language-now-in-granite)
> **来源**: huggingface.co
> **发现于**: 管理台手动提交
> **说明**: 本文由 AIHot汪 自动聚合(原文即中文,未翻译)

---

## AI 总结

**LLMON：一种面向 LLM 的原生标记语言，现已集成到 Granite 4.1 的 3B 和 8B 模型中**

IBM 发布了 **LLMON**（LLM Object Notation，发音类似 “lemon”），一种专为 LLM 设计的标记语言，用于在上下文中显式传达结构和语义。它已集成到两个实验性预览模型中：`granite-4.1-3b-LLMON-preview` 和 `granite-4.1-8b-LLMON-preview`。

### 核心问题与解决方案
LLM 的上下文通常包含系统提示、对话历史、检索文档、工具响应、约束条件、推理链等，结构大多是隐式的或用 JSON 等非 LLM 友好格式编码。这导致小模型尤其脆弱，易受提示注入攻击。

LLMON 用有意义的标签标记语义相关组件，并用**保留的特殊 token 分隔符**包裹。它支持：
- 明确的数据 schema 和嵌套结构
- 唯一 ID，可精准指向任意位置的指令并绑定到对应数据（类似编程中的函数调用与参数传递）

### 主要优势
- **显著提升提示注入鲁棒性**：通过显式指令/数据分离，间接提示注入（隐藏在用户数据、检索文档或工具响应中）几乎被忽略。在 OPI 等基准上，攻击成功率接近零，远优于普通指令微调模型和前沿模型，同时保持与 Granite 4.1 Instruct 相当的通用能力。
- 避免无关内容干扰：指令精确绑定到对应数据，旧对话或无关段落不会被错误拉入回答。
- 结构清晰：指令、数据、要求等被明确标记，便于模型利用应用层结构。
- 可与现有 JSON 管道无缝转换（有无损转换工具），也可自定义标签并用 LoRA 微调适配。

### 为何不用 JSON？
JSON 为解析器设计，而非因果语言模型。结构依赖 `{`、`"`、`:` 等普通字符，模型难以区分结构符号与文本内容，嵌套深度跟踪也较弱。LLMON 使用专用特殊 token 作为结构分隔符，标签前置，边界明确，嵌套局部声明，更适合 Transformer。

### 使用方式
LLMON 不替代 chat template，而是增强它。模型自带 chat template，用户仍用标准 `messages` 列表，只需为 turn 的各部分命名（如 `instruction`、`data`、`requirement`）并标记 `exec: True/False`。模板会自动渲染成带地址的 LLMON 块，并通过 `exec` 块绑定“执行哪个指令、作用于哪些数据、满足哪些要求、输出到哪里”。

### 训练与扩展
从 Granite 4.1 **base** 模型开始后训练（而非已有 instruct 模型），在常规指令数据上用 LLMON 重新序列化，并加入“诱饵”块训练模型只遵循 `exec` 绑定关系。后续有多阶段 GRPO + DPO。

支持**自定义词汇**：可定义领域标签（如 ScienceWorld 科学任务中的目标、规划规则、状态等），用 LoRA 微调后让模型按新结构输出动作。

### 资源
- 模型：Hugging Face 上的两个预览模型
- GitHub 仓库（含工具包、转换器、示例）
- 注意力可视化 Demo
- 相关论文与 Mellea 集成支持

这是实验性预览，适合探索和评估，暂不建议生产使用。总体目标是让 LLM 更可靠地理解上下文结构，同时大幅降低提示注入风险。

---
