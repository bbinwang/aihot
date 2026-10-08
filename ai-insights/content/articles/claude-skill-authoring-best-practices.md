---
title: "Anthropic 官方 Skill 实践指南：怎样写、怎样改、怎样验证它有用"
date: 2026-10-04T00:00:00.000Z
tags: ["会员", "深度", "Agent Skills", "Claude", "实践", "聚合"]
summary: "沿着 PDF 填表和数据查询的官方示例，讲清楚一份技能怎样从真实失败出发，变成可复用的工作方法。"
---
> **原文链接**: [https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
> **来源**: Anthropic
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/claude-skill-authoring-best-practices/) · 2026/10/4
> **说明**: 本文由 AIHot 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

好的技能是简洁、结构清晰且经过实际使用检验的。本指南提供实用的编写决策，帮助你编写能让 Claude 发现并有效使用的技能。

关于技能工作原理的概念背景，请参阅[技能概述](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)。

### 核心原则

#### 简洁是核心

[上下文窗口](https://platform.claude.com/docs/en/build-with-claude/context-windows) 是一种公共资源。你的技能与 Claude 需要知道的其他一切共享上下文窗口，包括：

- 系统提示词
- 对话历史
- 其他技能的元数据
- 你的实际请求

并非技能中的每个 token 都立刻产生成本。在启动时，只会预加载所有技能的元数据（名称和描述）。只有当技能变得相关时，Claude 才会读取 `SKILL.md`，并且仅在需要时读取其他文件。然而，在 `SKILL.md` 中保持简洁仍然重要：一旦 Claude 加载它，每个 token 都会与对话历史和其他上下文竞争。

**默认假设：** Claude 已经非常智能

只添加 Claude 已有的上下文。质疑每条信息：

- “Claude 真的需要这个解释吗？”
- “我能假设 Claude 知道这个吗？”
- “这段文字值得它消耗的 token 成本吗？”

**好示例：简洁**（约 50 个 token）：

```
<span class="line"><span style="--shiki-light:#0550AE;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">## Extract PDF text</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">Use pdfplumber for text extraction:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">```python</span></span>
<span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#C586C0">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> pdfplumber</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#C586C0">with</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> pdfplumber.open(</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">"file.pdf"</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">) </span><span style="--shiki-light:#CF222E;--shiki-dark:#C586C0">as</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> pdf:</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">    text </span><span style="--shiki-light:#CF222E;--shiki-dark:#C586C0">=</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> pdf.pages[</span><span style="--shiki-light:#0550AE;--shiki-dark:#B5CEA8">0</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">].extract_text()</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">```</span></span>
```

**坏示例：过于冗长**（约 150 个 token）：

```
<span class="line"><span style="--shiki-light:#0550AE;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">## Extract PDF text</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">PDF (Portable Document Format) files are a common file format that contains</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">text, images, and other content. To extract text from a PDF, you'll need to</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">use a library. There are many libraries available for PDF processing, but</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">pdfplumber is recommended because it's easy to use and handles most cases well.</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">First, you'll need to install it using pip. Then you can use the code below...</span></span>
```

简洁版假设 Claude 已经了解 PDF 以及库的工作原理。

#### 设置合适的自由度

将具体程度与任务的脆弱性和可变性相匹配。

**高自由度**（基于文本的指令）：

在以下情况使用：

- 多种方法均有效
- 决策取决于上下文
- 启发式方法指导操作

示例：

```
<span class="line"><span style="--shiki-light:#0550AE;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">## 代码审查流程</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">1.</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> 分析代码结构与组织方式</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">2.</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> 检查潜在 bug 或边界情况</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">3.</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> 提出可读性与可维护性改进建议</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">4.</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> 验证是否符合项目约定</span></span>
```

**中自由度**（带参数的伪代码或脚本）：

在以下情况使用：

- 存在首选模式
- 允许一定变化
- 配置影响行为

示例：

```
<span class="line"><span style="--shiki-light:#0550AE;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">## 生成报告</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">使用此模板并根据需要自定义：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">```python</span></span>
<span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#569CD6">def</span><span style="--shiki-light:#8250DF;--shiki-dark:#DCDCAA"> generate_report</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">(</span><span style="--shiki-light:#1F2328;--shiki-dark:#9CDCFE">data</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">, </span><span style="--shiki-light:#1F2328;--shiki-dark:#9CDCFE">format</span><span style="--shiki-light:#CF222E;--shiki-dark:#f3f7f6">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">"markdown"</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">, </span><span style="--shiki-light:#1F2328;--shiki-dark:#9CDCFE">include_charts</span><span style="--shiki-light:#CF222E;--shiki-dark:#f3f7f6">=</span><span style="--shiki-light:#0550AE;--shiki-dark:#569CD6">True</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">):</span></span>
<span class="line"><span style="--shiki-light:#6E7781;--shiki-dark:#6A9955">    # 处理数据</span></span>
<span class="line"><span style="--shiki-light:#6E7781;--shiki-dark:#6A9955">    # 按指定格式生成输出</span></span>
<span class="line"><span style="--shiki-light:#6E7781;--shiki-dark:#6A9955">    # 可选：包含可视化图表</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">```</span></span>
```

**低自由度**（特定脚本，参数极少或无参数）：

在以下情况使用：

- 操作脆弱且容易出错
- 一致性至关重要
- 必须遵循特定顺序

示例：

```
<span class="line"><span style="--shiki-light:#0550AE;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">## 数据库迁移</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">请严格运行此脚本：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">```bash</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#DCDCAA">python</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178"> scripts/migrate.py</span><span style="--shiki-light:#0550AE;--shiki-dark:#569CD6"> --verify</span><span style="--shiki-light:#0550AE;--shiki-dark:#569CD6"> --backup</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">```</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">请勿修改命令或添加额外标志。</span></span>
```

**类比:** 把 Claude 想象成一个探路的机器人:

- **两侧都是悬崖的窄桥:** 只有一条安全的前进道路。提供具体的护栏和精确的指令(低自由度)。示例:必须按精确顺序执行的数据库迁移。
- **没有障碍的开阔地:** 很多路径都能通往成功。给出大致方向,信任 Claude 找到最佳路线(高自由度)。示例:代码评审,最佳方法取决于具体上下文。

#### 用你计划使用的所有模型进行测试

技能是对模型的补充,因此效果取决于底层模型。请用你计划使用该技能的所有模型来测试它。

**按模型划分的测试要点:**

- **Claude Haiku**(快速、经济):该技能是否提供了足够的指导?
- **Claude Sonnet**(均衡):该技能是否清晰高效?
- **Claude Opus**(强大推理):该技能是否避免了过度解释?

对 Opus 来说完美的东西,可能对 Haiku 需要更多细节。如果你打算在多个模型上使用技能,目标应该是让指令对所有模型都适用。

### 技能结构

#### 命名约定

使用一致的命名模式,让技能更容易被引用和讨论。考虑使用 **动名词形式**(动词 + -ing)来命名技能,因为这能清晰地描述技能提供的活动或能力。

请记住,`name` 字段只能使用小写字母、数字和连字符。

**好的命名示例(动名词形式):**

- `processing-pdfs`
- `analyzing-spreadsheets`
- `managing-databases`
- `testing-code`
- `writing-documentation`

**可接受的替代方案:**

- 名词短语:`pdf-processing`、`spreadsheet-analysis`
- 动作导向:`process-pdfs`、`analyze-spreadsheets`

**应避免:**

- 模糊的名字:`helper`、`utils`、`tools`
- 过于通用:`documents`、`data`、`files`
- 保留字:`anthropic-helper`、`claude-tools`
- 技能集合内部命名模式不一致

一致的命名更容易:

- 在文档和对话中引用技能
- 一眼了解技能的作用
- 组织和搜索多个技能
- 维护专业、统一的技能库

#### 编写有效的描述

`description` 字段用于技能发现,应包含技能做什么以及何时使用。

**要具体并包含关键术语。** 同时包含技能做什么,以及何时使用它的具体触发条件/上下文。

每个技能只有一个 description 字段。该描述对技能选择至关重要:Claude 会用它从可能 100+ 个可用技能中选出正确的技能。你的描述必须提供足够的信息让 Claude 知道何时选择该技能,而 SKILL.md 的其余部分提供实现细节。

有效的示例:

**PDF 处理技能:**

```
<span class="line"><span style="--shiki-light:#116329;--shiki-dark:#569CD6">description</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">: </span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">Extract text and tables from PDF files, fill forms, merge documents. Use when working with PDF files or when the user mentions PDFs, forms, or document extraction.</span></span>
```

**Excel 分析技能:**

```
<span class="line"><span style="--shiki-light:#116329;--shiki-dark:#569CD6">description</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">: </span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">Analyze Excel spreadsheets, create pivot tables, generate charts. Use when analyzing Excel files, spreadsheets, tabular data, or .xlsx files.</span></span>
```

**Git 提交助手技能:**

```
<span class="line"><span style="--shiki-light:#116329;--shiki-dark:#569CD6">description</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">: </span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">Generate descriptive commit messages by analyzing git diffs. Use when the user asks for help writing commit messages or reviewing staged changes.</span></span>
```

避免使用模糊的描述，例如：

```
<span class="line"><span style="--shiki-light:#116329;--shiki-dark:#569CD6">description</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">: </span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">Helps with documents</span></span>
```

```
<span class="line"><span style="--shiki-light:#116329;--shiki-dark:#569CD6">description</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">: </span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">Processes data</span></span>
```

```
<span class="line"><span style="--shiki-light:#116329;--shiki-dark:#569CD6">description</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">: </span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">Does stuff with files</span></span>
```

#### 渐进式披露模式

SKILL.md 作为概览，根据需要将 Claude 指向详细材料，类似于入职指南中的目录。关于渐进式披露如何工作的解释，请参阅概述中的 [How Skills work](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview#how-skills-work)。

**实用指南：**

- 保持 SKILL.md 正文在 500 行以内以获得最佳性能
- 接近此限制时将内容拆分为单独的文件
- 使用以下模式有效组织指令、代码和资源

##### 视觉概览：从简单到复杂

一个基本的 Skill 仅从一个包含元数据和指令的 SKILL.md 文件开始：

![简单的 SKILL.md 文件，显示 YAML 前置元数据和 Markdown 正文](https://platform.claude.com/docs/images/agent-skills-simple-file.png)

随着你的 Skill 增长，你可以捆绑额外的内容，Claude 仅在需要时加载：

![捆绑额外的参考文件，如 reference.md 和 forms.md。](https://platform.claude.com/docs/images/agent-skills-bundling-content.png)

完整的 Skill 目录结构可能如下所示：

- `pdf/`
  - `SKILL.md`: 主要指令（触发时加载）
  - `FORMS.md`: 表单填写指南（按需加载）
  - `reference.md`: API 参考（按需加载）
  - `examples.md`: 使用示例（按需加载）
  - `scripts/`
    - `analyze_form.py`: 实用脚本（执行，不加载）
    - `fill_form.py`: 表单填写脚本
    - `validate.py`: 验证脚本

##### 模式 1：带参考的高级指南

```
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">---</span></span>
<span class="line"><span style="--shiki-light:#116329;--shiki-dark:#569CD6">name</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">: </span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">pdf-processing</span></span>
<span class="line"><span style="--shiki-light:#116329;--shiki-dark:#569CD6">description</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">: </span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">Extracts text and tables from PDF files, fills forms, and merges documents. Use when working with PDF files or when the user mentions PDFs, forms, or document extraction.</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">---</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0550AE;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold"># PDF Processing</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0550AE;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">## Quick start</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">Extract text with pdfplumber:</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">```python</span></span>
<span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#C586C0">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> pdfplumber</span></span>
<span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#C586C0">with</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> pdfplumber.open(</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">"file.pdf"</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">) </span><span style="--shiki-light:#CF222E;--shiki-dark:#C586C0">as</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> pdf:</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">    text </span><span style="--shiki-light:#CF222E;--shiki-dark:#f3f7f6">=</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> pdf.pages[</span><span style="--shiki-light:#0550AE;--shiki-dark:#B5CEA8">0</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">].extract_text()</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">```</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0550AE;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">## Advanced features</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">**Form filling**</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">: See [</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">FORMS.md</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">](</span><span style="--shiki-light:#1F2328;--shiki-light-text-decoration:underline;--shiki-dark:#f3f7f6;--shiki-dark-text-decoration:underline">FORMS.md</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">) for complete guide</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">**API reference**</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">: See [</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">REFERENCE.md</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">](</span><span style="--shiki-light:#1F2328;--shiki-light-text-decoration:underline;--shiki-dark:#f3f7f6;--shiki-dark-text-decoration:underline">REFERENCE.md</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">) for all methods</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">**Examples**</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">: See [</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">EXAMPLES.md</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">](</span><span style="--shiki-light:#1F2328;--shiki-light-text-decoration:underline;--shiki-dark:#f3f7f6;--shiki-dark-text-decoration:underline">EXAMPLES.md</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">) for common patterns</span></span>
```

Claude 仅在需要时加载 FORMS.md、REFERENCE.md 或 EXAMPLES.md。

##### 模式 2：按领域组织

对于包含多个领域的 Skill，按领域组织内容以避免加载不相关的上下文。当用户询问销售指标时，Claude 只需读取销售相关的 schema，而无需读取财务或营销数据。这可以保持 token 用量低且上下文聚焦。

- `bigquery-skill/`
  - `SKILL.md`（概览与导航）
  - `reference/`
    - `finance.md`（收入、计费指标）
    - `sales.md`（商机、管道）
    - `product.md`（API 使用、功能）
    - `marketing.md`（活动、归因）

SKILL.md

```
<span class="line"><span style="--shiki-light:#0550AE;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold"># BigQuery 数据分析</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0550AE;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">## 可用数据集</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">**财务**</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">：收入、ARR、计费 → 参见 [</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">reference/finance.md</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">](</span><span style="--shiki-light:#1F2328;--shiki-light-text-decoration:underline;--shiki-dark:#f3f7f6;--shiki-dark-text-decoration:underline">reference/finance.md</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">)</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">**销售**</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">：商机、管道、账户 → 参见 [</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">reference/sales.md</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">](</span><span style="--shiki-light:#1F2328;--shiki-light-text-decoration:underline;--shiki-dark:#f3f7f6;--shiki-dark-text-decoration:underline">reference/sales.md</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">)</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">**产品**</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">：API 使用、功能、采用 → 参见 [</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">reference/product.md</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">](</span><span style="--shiki-light:#1F2328;--shiki-light-text-decoration:underline;--shiki-dark:#f3f7f6;--shiki-dark-text-decoration:underline">reference/product.md</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">)</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">**营销**</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">：活动、归因、邮件 → 参见 [</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">reference/marketing.md</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">](</span><span style="--shiki-light:#1F2328;--shiki-light-text-decoration:underline;--shiki-dark:#f3f7f6;--shiki-dark-text-decoration:underline">reference/marketing.md</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0550AE;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">## 快速搜索</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">使用 grep 查找特定指标：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">```bash</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#DCDCAA">grep</span><span style="--shiki-light:#0550AE;--shiki-dark:#569CD6"> -i</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178"> "revenue"</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178"> reference/finance.md</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#DCDCAA">grep</span><span style="--shiki-light:#0550AE;--shiki-dark:#569CD6"> -i</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178"> "pipeline"</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178"> reference/sales.md</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#DCDCAA">grep</span><span style="--shiki-light:#0550AE;--shiki-dark:#569CD6"> -i</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178"> "api usage"</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178"> reference/product.md</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">```</span></span>
```

##### 模式 3：条件性细节

展示基本内容，链接到高级内容：

```
<span class="line"><span style="--shiki-light:#0550AE;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold"># DOCX Processing</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0550AE;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">## Creating documents</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">Use docx-js for new documents. See [</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">DOCX-JS.md</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">](</span><span style="--shiki-light:#1F2328;--shiki-light-text-decoration:underline;--shiki-dark:#f3f7f6;--shiki-dark-text-decoration:underline">DOCX-JS.md</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">).</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0550AE;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">## Editing documents</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">For simple edits, modify the XML directly.</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">**For tracked changes**</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">: See [</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">REDLINING.md</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">](</span><span style="--shiki-light:#1F2328;--shiki-light-text-decoration:underline;--shiki-dark:#f3f7f6;--shiki-dark-text-decoration:underline">REDLINING.md</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">)</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">**For OOXML details**</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">: See [</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">OOXML.md</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">](</span><span style="--shiki-light:#1F2328;--shiki-light-text-decoration:underline;--shiki-dark:#f3f7f6;--shiki-dark-text-decoration:underline">OOXML.md</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">)</span></span>
```

Claude 仅在用户需要这些功能时才读取 REDLINING.md 或 OOXML.md。

#### 避免深度嵌套的引用

当文件从其他被引用的文件中被引用时，Claude 可能会部分读取文件。遇到嵌套引用时，Claude 可能会使用 `head -100` 等命令预览内容，而不是读取整个文件，导致信息不完整。

**保持引用深度为 SKILL.md 的一层**。所有引用文件应直接从 SKILL.md 链接，以确保 Claude 在需要时读取完整文件。

**错误示例：嵌套过深**：

```
<span class="line"><span style="--shiki-light:#0550AE;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold"># SKILL.md</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">See [</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">advanced.md</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">](</span><span style="--shiki-light:#1F2328;--shiki-light-text-decoration:underline;--shiki-dark:#f3f7f6;--shiki-dark-text-decoration:underline">advanced.md</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">)...</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0550AE;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold"># advanced.md</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">See [</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">details.md</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">](</span><span style="--shiki-light:#1F2328;--shiki-light-text-decoration:underline;--shiki-dark:#f3f7f6;--shiki-dark-text-decoration:underline">details.md</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">)...</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0550AE;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold"># details.md</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">Here's the actual information...</span></span>
```

**好示例：一级深度**：

```
<span class="line"><span style="--shiki-light:#0550AE;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold"># SKILL.md</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">**Basic usage**</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">: [instructions in SKILL.md]</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">**Advanced features**</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">: See [</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">advanced.md</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">](</span><span style="--shiki-light:#1F2328;--shiki-light-text-decoration:underline;--shiki-dark:#f3f7f6;--shiki-dark-text-decoration:underline">advanced.md</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">)</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">**API reference**</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">: See [</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">reference.md</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">](</span><span style="--shiki-light:#1F2328;--shiki-light-text-decoration:underline;--shiki-dark:#f3f7f6;--shiki-dark-text-decoration:underline">reference.md</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">)</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">**Examples**</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">: See [</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">examples.md</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">](</span><span style="--shiki-light:#1F2328;--shiki-light-text-decoration:underline;--shiki-dark:#f3f7f6;--shiki-dark-text-decoration:underline">examples.md</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">)</span></span>
```

#### 使用目录组织较长的参考文件

对于超过100行的参考文件，在顶部包含一个目录。这确保Claude在部分读取预览时能看到可用信息的完整范围。

**示例：**

```
<span class="line"><span style="--shiki-light:#0550AE;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold"># API Reference</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0550AE;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">## Contents</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">-</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> Authentication and setup</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">-</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> Core methods (create, read, update, delete)</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">-</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> Advanced features (batch operations, webhooks)</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">-</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> Error handling patterns</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">-</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> Code examples</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0550AE;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">## Authentication and setup</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">...</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0550AE;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">## Core methods</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">...</span></span>
```

Claude 随后可以读取完整文件或按需跳转到特定章节。

关于这种基于文件系统的架构如何实现渐进式信息呈现的详细信息，请参阅本指南后面的 [运行时环境](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices#runtime-environment) 部分。

### 工作流与反馈循环

#### 为复杂任务使用工作流

将复杂操作拆解为清晰、连续的步骤。对于特别复杂的工作流，提供一份清单，Claude 可以将其复制到回复中，并在执行过程中逐项勾选。

**示例 1：研究综合工作流**（适用于无代码的 Skills）：

```
<span class="line"><span style="--shiki-light:#0550AE;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">## 研究综合工作流</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">复制此清单并跟踪进度：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">```</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">研究进度：</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">- [ ] 步骤1：阅读所有源文档</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">- [ ] 步骤2：识别关键主题</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">- [ ] 步骤3：交叉验证论断</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">- [ ] 步骤4：创建结构化摘要</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">- [ ] 步骤5：验证引用</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">```</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">**步骤1：阅读所有源文档**</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">逐一审阅 </span><span style="--shiki-light:#0550AE;--shiki-dark:#CE9178">`sources/`</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> 目录中的每个文档。记录主要论点及支持证据。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">**步骤2：识别关键主题**</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">寻找各源文档中的模式。哪些主题反复出现？各源文档在何处一致、又在何处相悖？</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">**步骤3：交叉验证论断**</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">针对每个主要论断，验证其是否出现在源材料中。记录每个观点由哪个源文档支持。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">**步骤4：创建结构化摘要**</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">按主题组织发现。包括：</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">-</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> 主要论点</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">-</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> 来自源文档的支持证据</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">-</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> 相左观点（如有）</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">**步骤5：验证引用**</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">确保每个论断都引用了正确的源文档。若引用不完整，返回步骤3。</span></span>
```

此示例展示了工作流如何应用于不需要代码的分析任务。检查清单模式适用于任何复杂的多步骤流程。

**示例2：PDF 表单填充工作流**（适用于有代码的技能）：

```
### PDF 表单填充工作流

复制此检查清单，完成任务时逐项勾选：

```
任务进度：
- [ ] 步骤 1：分析表单 (运行 analyze_form.py)
- [ ] 步骤 2：创建字段映射 (编辑 fields.json)
- [ ] 步骤 3：验证映射 (运行 validate_fields.py)
- [ ] 步骤 4：填充表单 (运行 fill_form.py)
- [ ] 步骤 5：验证输出 (运行 verify_output.py)
```

**步骤 1：分析表单**

运行：`python scripts/analyze_form.py input.pdf`

这会提取表单字段及其位置，并保存到 `fields.json`。

**步骤 2：创建字段映射**

编辑 `fields.json` 为每个字段添加值。

**步骤 3：验证映射**

运行：`python scripts/validate_fields.py fields.json`

在继续之前修复所有验证错误。

**步骤 4：填充表单**

运行：`python scripts/fill_form.py input.pdf fields.json output.pdf`

**步骤 5：验证输出**

运行：`python scripts/verify_output.py output.pdf`

如果验证失败，返回步骤 2。
```

清晰的步骤能防止 Claude 跳过关键验证。清单有助于 Claude 和您在多步骤工作流中跟踪进度。

#### 实施反馈循环

**常见模式:** 运行验证器 → 修复错误 → 重复

这种模式能显著提高输出质量。

**示例 1: 样式指南合规性**（适用于无代码的 Skills）：

```
<span class="line"><span style="--shiki-light:#0550AE;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">## 内容审查流程</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">1.</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> 按照 STYLE_GUIDE.md 中的指南起草您的内容</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">2.</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> 根据清单进行审查：</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">   -</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> 检查术语一致性</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">   -</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> 验证示例是否符合标准格式</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">   -</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> 确认所有必需部分均已包含</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">3.</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> 如果发现问题：</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">   -</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> 记录每个问题并注明具体章节</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">   -</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> 修订内容</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">   -</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> 再次审查清单</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">4.</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> 仅在满足所有要求后才继续</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">5.</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> 定稿并保存文档</span></span>
```

这展示了使用参考文档而非脚本的验证循环模式。"验证器"是 STYLE_GUIDE.md，Claude 通过阅读和比较来执行检查。

**示例 2: 文档编辑流程**（适用于带代码的 Skills）：

```
<span class="line"><span style="--shiki-light:#0550AE;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">## 文档编辑流程</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">1.</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> 对 </span><span style="--shiki-light:#0550AE;--shiki-dark:#CE9178">`word/document.xml`</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> 进行编辑</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">2.</span><span style="--shiki-light:#1F2328;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold"> **立即验证**</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">：</span><span style="--shiki-light:#0550AE;--shiki-dark:#CE9178">`python ooxml/scripts/validate.py unpacked_dir/`</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">3.</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> 如果验证失败：</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">   -</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> 仔细查看错误信息</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">   -</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> 修复 XML 中的问题</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">   -</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> 再次运行验证</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">4.</span><span style="--shiki-light:#1F2328;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold"> **仅在验证通过后才继续**</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">5.</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> 重新打包：</span><span style="--shiki-light:#0550AE;--shiki-dark:#CE9178">`python ooxml/scripts/pack.py unpacked_dir/ output.docx`</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">6.</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> 测试输出文档</span></span>
```

验证循环能及早发现错误。

### 内容指南

#### 避免时效性信息

不要包含会过时的信息：

**错误示例：时效性**（会出错）：

```
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">If you're doing this before August 2025, use the old API.</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">After August 2025, use the new API.</span></span>
```

**正确示例**（使用“旧模式”部分）：

```
<span class="line"><span style="--shiki-light:#0550AE;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">## Current method</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">Use the v2 API endpoint: </span><span style="--shiki-light:#0550AE;--shiki-dark:#CE9178">`api.example.com/v2/messages`</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0550AE;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">## Old patterns</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"><details></span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"><summary>Legacy v1 API (deprecated 2025-08)</summary></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">The v1 API used: </span><span style="--shiki-light:#0550AE;--shiki-dark:#CE9178">`api.example.com/v1/messages`</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">This endpoint is no longer supported.</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"></details></span></span>
```

旧模式部分提供了历史背景，而不会让主要内容显得杂乱。

#### 使用一致的术语

选择一个术语，并在整个Skill中使用它：

**良好 - 一致：**

- 始终使用“API endpoint”
- 始终使用“field”
- 始终使用“extract”

**不佳 - 不一致：**

- 混用“API endpoint”、“URL”、“API route”、“path”
- 混用“field”、“box”、“element”、“control”
- 混用“extract”、“pull”、“get”、“retrieve”

一致性有助于Claude解析和遵循指令。

### 常见模式

#### 模板模式

提供输出格式的模板。根据需求调整严格程度。

**对于严格要求**（如API响应或数据格式）：

```
<span class="line"><span style="--shiki-light:#0550AE;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">## Report structure</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">ALWAYS use this exact template structure:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">```markdown</span></span>
<span class="line"><span style="--shiki-light:#0550AE;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold"># [Analysis Title]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0550AE;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">## Executive summary</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">[One-paragraph overview of key findings]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0550AE;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">## Key findings</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">-</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> Finding 1 with supporting data</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">-</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> Finding 2 with supporting data</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">-</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> Finding 3 with supporting data</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0550AE;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">## Recommendations</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">1.</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> Specific actionable recommendation</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">2.</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> Specific actionable recommendation</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">```</span></span>
```

**灵活指导**（当需要调整时）：

```
### Report structure

Here is a sensible default format, but use your best judgment based on the analysis:

```markdown
## [Analysis Title]

### Executive summary
[Overview]

### Key findings
[Adapt sections based on what you discover]

### Recommendations
[Tailor to the specific context]
```

Adjust sections as needed for the specific analysis type.
```

#### 示例模式

对于输出质量依赖于示例的技能，像常规提示一样提供输入/输出对：

```
### Commit message format

Generate commit messages following these examples:

**Example 1:**
Input: Added user authentication with JWT tokens
Output:
```
feat(auth): implement JWT-based authentication

Add login endpoint and token validation middleware
```

**Example 2:**
Input: Fixed bug where dates displayed incorrectly in reports
Output:
```
fix(reports): correct date formatting in timezone conversion

Use UTC timestamps consistently across report generation
```

**Example 3:**
Input: Updated dependencies and refactored error handling
Output:
```
chore: update dependencies and refactor error handling

- Upgrade lodash to 4.17.21
- Standardize error response format across endpoints
```

Follow this style: type(scope): brief description, then detailed explanation.
```

示例比纯描述更能向 Claude 清晰地传达所需的风格和细节。

#### 条件工作流模式

引导 Claude 通过决策点：

```
<span class="line"><span style="--shiki-light:#0550AE;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">## 文档修改工作流</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">1.</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> 确定修改类型：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">   **创建新内容？**</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> → 遵循下面的“创建工作流”</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">   **编辑现有内容？**</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> → 遵循下面的“编辑工作流”</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">2.</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> 创建工作流：</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">   -</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> 使用 docx-js 库</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">   -</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> 从头构建文档</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">   -</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> 导出为 .docx 格式</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">3.</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> 编辑工作流：</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">   -</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> 解包现有文档</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">   -</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> 直接修改 XML</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">   -</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> 每次更改后验证</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#6796E6">   -</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> 完成后重新打包</span></span>
```

### 评估与迭代

#### 先构建评估

**在编写大量文档之前先创建评估。** 这确保你的 Skill 能解决实际问题，而不是记录想象中的需求。

**评估驱动开发：**

1. **发现差距：** 在没有 Skill 的情况下，让 Claude 执行代表性任务。记录具体的失败或缺失的上下文
2. **创建评估：** 构建三个测试这些差距的场景
3. **建立基线：** 测量没有 Skill 时 Claude 的性能
4. **编写最小指令：** 创建刚好足够的内容来弥补差距并通过评估
5. **迭代：** 执行评估，与基线对比，并优化

这种方法确保你是在解决实际问题，而不是预测可能永远不会出现的需求。

**评估结构：**

```
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">{</span></span>
<span class="line"><span style="--shiki-light:#116329;--shiki-dark:#9CDCFE">  "skills"</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">: [</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">"pdf-processing"</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">],</span></span>
<span class="line"><span style="--shiki-light:#116329;--shiki-dark:#9CDCFE">  "query"</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">: </span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">"Extract all text from this PDF file and save it to output.txt"</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">,</span></span>
<span class="line"><span style="--shiki-light:#116329;--shiki-dark:#9CDCFE">  "files"</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">: [</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">"test-files/document.pdf"</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">],</span></span>
<span class="line"><span style="--shiki-light:#116329;--shiki-dark:#9CDCFE">  "expected_behavior"</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">: [</span></span>
<span class="line"><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">    "Successfully reads the PDF file using an appropriate PDF processing library or command-line tool"</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">,</span></span>
<span class="line"><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">    "Extracts text content from all pages in the document without missing any pages"</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">,</span></span>
<span class="line"><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">    "Saves the extracted text to a file named output.txt in a clear, readable format"</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">  ]</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">}</span></span>
```

#### 使用 Claude 迭代开发技能

最有效的技能开发过程需要 Claude 本身参与。与一个 Claude 实例（"Claude A"）协作创建技能，供其他实例（"Claude B"）使用。Claude A 帮助你设计和优化指令，而 Claude B 在实际任务中测试这些指令。这种方法之所以有效，是因为 Claude 模型既懂得如何编写有效的 Agent 指令，也了解 Agent 需要哪些信息。

**创建新技能：**

1. **不使用技能完成一项任务：** 通过正常提示与 Claude A 一起解决问题。在过程中，你会自然地提供上下文、解释偏好并分享流程知识。注意你反复提供哪些信息。
2. **识别可复用的模式：** 完成任务后，识别你提供的哪些上下文对未来的类似任务有用。
   **示例：** 如果你完成了一次 BigQuery 分析，你可能提供了表名、字段定义、过滤规则（例如"始终排除测试账户"）以及常见查询模式。
3. **请 Claude A 创建技能：** "创建一个技能，捕捉我们刚才使用的 BigQuery 分析模式。包括表结构、命名约定以及关于过滤测试账户的规则。"
4. **检查简洁性：** 确保 Claude A 没有添加不必要的解释。可以要求："删除关于胜率含义的解释——Claude 已经知道这个。"
5. **优化信息架构：** 请 Claude A 更有效地组织内容。例如："这样组织，把表结构放在单独的参考文件中。我们以后可能会添加更多表。"
6. **在类似任务上测试：** 在相关用例中，使用该技能与 Claude B（加载了该技能的新实例）进行测试。观察 Claude B 是否能找到正确的信息、正确应用规则并成功完成任务。
7. **根据观察进行迭代：** 如果 Claude B 遇到困难或遗漏了某些内容，带着具体问题返回 Claude A："当 Claude 使用这个技能时，它忘记了按日期过滤 Q4 的数据。我们是否应该添加一个关于日期过滤模式的部分？"

**迭代现有技能：**

改进技能时，同样的分层模式会持续进行。你在以下步骤之间交替进行：

- **与 Claude A 协作**（帮助优化技能的专家）
- **用 Claude B 测试**（使用技能执行实际工作的 Agent）
- **观察 Claude B 的行为**并将洞察反馈给 Claude A

1. **在实际工作流中使用技能：** 给 Claude B（加载了技能）分配实际任务，而非测试场景
2. **观察 Claude B 的行为：** 注意它在哪些方面遇到困难、成功或做出意外选择
   **观察示例：** "当我要求 Claude B 生成一份区域销售报告时，它编写了查询，但忘记了过滤测试账户，尽管技能中提到了这条规则。"
3. **返回 Claude A 进行改进：** 分享当前的 SKILL.md 并描述你的观察。可以问："我注意到当我要求区域报告时，Claude B 忘记了过滤测试账户。技能中提到了过滤，但可能不够突出？"
4. **审查 Claude A 的建议：** Claude A 可能会建议重新组织以使规则更突出，使用更强硬的措辞如"必须过滤"而非"始终过滤"，或重构工作流部分。
5. **应用并测试更改：** 用 Claude A 的优化更新技能，然后在类似请求上再次用 Claude B 测试
6. **根据使用情况重复：** 随着遇到新场景，继续这个观察-优化-测试循环。每次迭代都基于真实的 Agent 行为而非假设来改进技能。

**收集团队反馈：**

1. 与团队成员分享技能并观察他们的使用情况
2. 询问：技能是否在预期时激活？指令是否清晰？缺少什么？
3. 将反馈纳入，弥补自身使用模式中的不足

**为什么这种方法有效：** Claude A 理解 Agent 的需求，你提供领域专业知识，Claude B 通过实际使用揭示漏洞，而迭代优化基于观察到的行为而非假设来改进技能。

#### 观察 Claude 如何使用 Skills

在迭代 Skills 时，注意观察 Claude 在实际中如何使用它们。留意以下几点：

- **意外的探索路径：** Claude 是否以你未预料到的顺序读取文件？这可能表明你的结构并不像你想象的那么直观
- **遗漏的连接：** Claude 是否未能跟随对重要文件的引用？你的链接可能需要更明确或更突出
- **过度依赖某些部分：** 如果 Claude 反复读取同一个文件，考虑该内容是否应放在主 SKILL.md 中
- **被忽略的内容：** 如果 Claude 从未访问过捆绑文件，它可能是不必要的，或者在主指令中信号不佳

基于这些观察而非假设进行迭代。Skill 元数据中的 'name' 和 'description' 尤其关键。Claude 在决定是否触发该 Skill 以响应当前任务时会使用这些信息。确保它们清楚地描述了 Skill 的功能以及何时使用。

### 应避免的反模式

#### 避免 Windows 风格路径

始终在文件路径中使用正斜杠，即使在 Windows 上也是如此：

- ✓ **好的：** `scripts/helper.py`, `reference/guide.md`
- ✗ **避免：** `scripts\helper.py`, `reference\guide.md`

Unix 风格路径在所有平台上都能工作，而 Windows 风格路径在 Unix 系统上会导致错误。

#### 避免提供过多选项

除非必要，不要提供多种方法：

```
<span class="line"><span style="--shiki-light:#1F2328;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">**Bad example: Too many choices**</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> (confusing):</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">"You can use pypdf, or pdfplumber, or PyMuPDF, or pdf2image, or..."</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">**Good example: Provide a default**</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> (with escape hatch):</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">"Use pdfplumber for text extraction:</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">```python</span></span>
<span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#C586C0">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> pdfplumber</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">```</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">For scanned PDFs requiring OCR, use pdf2image with pytesseract instead."</span></span>
```

### 高级：包含可执行代码的 Skills

以下部分重点介绍包含可执行脚本的 Skills。如果你的 Skill 仅使用 Markdown 指令，请跳转到 [有效 Skills 的检查清单](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices#checklist-for-effective-skills)。

#### 解决问题，而非推迟

在为 Skills 编写脚本时，处理错误情况，而不是推迟给 Claude。

**好的示例：显式处理错误：**

```
<span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#569CD6">def</span><span style="--shiki-light:#8250DF;--shiki-dark:#DCDCAA"> process_file</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">(</span><span style="--shiki-light:#1F2328;--shiki-dark:#9CDCFE">path</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">):</span></span>
<span class="line"><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">    """Process a file, creating it if it doesn't exist."""</span></span>
<span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#C586C0">    try</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">:</span></span>
<span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#C586C0">        with</span><span style="--shiki-light:#0550AE;--shiki-dark:#DCDCAA"> open</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">(path) </span><span style="--shiki-light:#CF222E;--shiki-dark:#C586C0">as</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> f:</span></span>
<span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#C586C0">            return</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> f.read()</span></span>
<span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#C586C0">    except</span><span style="--shiki-light:#0550AE;--shiki-dark:#4EC9B0"> FileNotFoundError</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">:</span></span>
<span class="line"><span style="--shiki-light:#6E7781;--shiki-dark:#6A9955">        # Create file with default content instead of failing</span></span>
<span class="line"><span style="--shiki-light:#0550AE;--shiki-dark:#DCDCAA">        print</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">(</span><span style="--shiki-light:#CF222E;--shiki-dark:#569CD6">f</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">"File </span><span style="--shiki-light:#CF222E;--shiki-dark:#569CD6">{</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">path</span><span style="--shiki-light:#CF222E;--shiki-dark:#569CD6">}</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178"> not found, creating default"</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">)</span></span>
<span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#C586C0">        with</span><span style="--shiki-light:#0550AE;--shiki-dark:#DCDCAA"> open</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">(path, </span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">"w"</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">) </span><span style="--shiki-light:#CF222E;--shiki-dark:#C586C0">as</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> f:</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">            f.write(</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">""</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">)</span></span>
<span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#C586C0">        return</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178"> ""</span></span>
<span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#C586C0">    except</span><span style="--shiki-light:#0550AE;--shiki-dark:#4EC9B0"> PermissionError</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">:</span></span>
<span class="line"><span style="--shiki-light:#6E7781;--shiki-dark:#6A9955">        # Provide alternative instead of failing</span></span>
<span class="line"><span style="--shiki-light:#0550AE;--shiki-dark:#DCDCAA">        print</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">(</span><span style="--shiki-light:#CF222E;--shiki-dark:#569CD6">f</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">"Cannot access </span><span style="--shiki-light:#CF222E;--shiki-dark:#569CD6">{</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">path</span><span style="--shiki-light:#CF222E;--shiki-dark:#569CD6">}</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">, using default"</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">)</span></span>
<span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#C586C0">        return</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178"> ""</span></span>
```

**坏例子：推给 Claude：**

```
<span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#569CD6">def</span><span style="--shiki-light:#8250DF;--shiki-dark:#DCDCAA"> process_file</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">(</span><span style="--shiki-light:#1F2328;--shiki-dark:#9CDCFE">path</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">):</span></span>
<span class="line"><span style="--shiki-light:#6E7781;--shiki-dark:#6A9955">    # 直接失败，让 Claude 自己解决</span></span>
<span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#C586C0">return</span><span style="--shiki-light:#0550AE;--shiki-dark:#DCDCAA"> open</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">(path).read()</span></span>
```

配置参数也应给出理由并记录，以避免“魔法常数”（Ousterhout 定律）。如果你不知道正确的值，Claude 又如何确定呢？

**好例子：自文档化：**

```
<span class="line"><span style="--shiki-light:#6E7781;--shiki-dark:#6A9955"># HTTP 请求通常在 30 秒内完成</span></span>
<span class="line"><span style="--shiki-light:#6E7781;--shiki-dark:#6A9955"># 更长的超时时间用于应对慢速连接</span></span>
<span class="line"><span style="--shiki-light:#0550AE;--shiki-dark:#f3f7f6">REQUEST_TIMEOUT</span><span style="--shiki-light:#CF222E;--shiki-dark:#f3f7f6"> =</span><span style="--shiki-light:#0550AE;--shiki-dark:#B5CEA8"> 30</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6E7781;--shiki-dark:#6A9955"># 三次重试在可靠性与速度之间取得平衡</span></span>
<span class="line"><span style="--shiki-light:#6E7781;--shiki-dark:#6A9955"># 大多数间歇性故障在第二次重试时即可解决</span></span>
<span class="line"><span style="--shiki-light:#0550AE;--shiki-dark:#f3f7f6">MAX_RETRIES</span><span style="--shiki-light:#CF222E;--shiki-dark:#f3f7f6"> =</span><span style="--shiki-light:#0550AE;--shiki-dark:#B5CEA8"> 3</span></span>
```

**坏例子：魔法数字：**

```
<span class="line"><span style="--shiki-light:#0550AE;--shiki-dark:#f3f7f6">TIMEOUT</span><span style="--shiki-light:#CF222E;--shiki-dark:#f3f7f6"> =</span><span style="--shiki-light:#0550AE;--shiki-dark:#B5CEA8"> 47</span><span style="--shiki-light:#6E7781;--shiki-dark:#6A9955">  # 为什么是 47？</span></span>
<span class="line"><span style="--shiki-light:#0550AE;--shiki-dark:#f3f7f6">RETRIES</span><span style="--shiki-light:#CF222E;--shiki-dark:#f3f7f6"> =</span><span style="--shiki-light:#0550AE;--shiki-dark:#B5CEA8"> 5</span><span style="--shiki-light:#6E7781;--shiki-dark:#6A9955">  # 为什么是 5？</span></span>
```

#### 提供实用脚本

即使 Claude 可以编写脚本，预制的脚本也有优势：

**实用脚本的好处：**

- 比生成的代码更可靠
- 节省 token（无需将代码包含在上下文中）
- 节省时间（无需生成代码）
- 确保跨使用场景的一致性

![将可执行脚本与指令文件捆绑在一起](https://platform.claude.com/docs/images/agent-skills-executable-scripts.png)

上图展示了可执行脚本如何与指令文件协同工作。指令文件（forms.md）引用了脚本，Claude 可以执行它而无需将其内容加载到上下文中。

**重要区别：** 在你的指令中明确说明 Claude 应该：

- **执行脚本**（最常见）："运行 `analyze_form.py` 提取字段"
- **作为参考阅读**（用于复杂逻辑）："参见 `analyze_form.py` 了解字段提取算法"

对于大多数实用脚本，优先选择执行，因为它更可靠且更高效。有关脚本执行方式的详细信息，请参见下面的[运行时环境](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices#runtime-environment)部分。

**示例：**

```
<span class="line"><span style="--shiki-light:#0550AE;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">## 实用脚本</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">**analyze_form.py**</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">：从 PDF 中提取所有表单字段</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">```bash</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#DCDCAA">python</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178"> scripts/analyze_form.py</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178"> input.pdf</span><span style="--shiki-light:#CF222E;--shiki-dark:#f3f7f6"> ></span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178"> fields.json</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">```</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">输出格式：</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">```json</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">{</span></span>
<span class="line"><span style="--shiki-light:#116329;--shiki-dark:#9CDCFE">  "field_name"</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">: {</span><span style="--shiki-light:#116329;--shiki-dark:#9CDCFE">"type"</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">: </span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">"text"</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">, </span><span style="--shiki-light:#116329;--shiki-dark:#9CDCFE">"x"</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">: </span><span style="--shiki-light:#0550AE;--shiki-dark:#B5CEA8">100</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">, </span><span style="--shiki-light:#116329;--shiki-dark:#9CDCFE">"y"</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">: </span><span style="--shiki-light:#0550AE;--shiki-dark:#B5CEA8">200</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">},</span></span>
<span class="line"><span style="--shiki-light:#116329;--shiki-dark:#9CDCFE">  "signature"</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">: {</span><span style="--shiki-light:#116329;--shiki-dark:#9CDCFE">"type"</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">: </span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">"sig"</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">, </span><span style="--shiki-light:#116329;--shiki-dark:#9CDCFE">"x"</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">: </span><span style="--shiki-light:#0550AE;--shiki-dark:#B5CEA8">150</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">, </span><span style="--shiki-light:#116329;--shiki-dark:#9CDCFE">"y"</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">: </span><span style="--shiki-light:#0550AE;--shiki-dark:#B5CEA8">500</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">}</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">}</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">```</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">**validate_boxes.py**</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">：检查重叠的边界框</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">```bash</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#DCDCAA">python</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178"> scripts/validate_boxes.py</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178"> fields.json</span></span>
<span class="line"><span style="--shiki-light:#6E7781;--shiki-dark:#6A9955"># 返回："OK" 或列出冲突</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">```</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">**fill_form.py**</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">：将字段值应用到 PDF</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">```bash</span></span>
<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#DCDCAA">python</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178"> scripts/fill_form.py</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178"> input.pdf</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178"> fields.json</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178"> output.pdf</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">```</span></span>
```

#### 使用视觉分析

当输入可以渲染为图像时，让 Claude 对其进行分析：

```
### 表单布局分析

1. 将 PDF 转换为图像：
   ```bash
   python scripts/pdf_to_images.py form.pdf
   ```
2. 分析每页图像以识别表单字段
3. Claude 可以直观地看到字段位置和类型
```

Claude 的视觉能力有助于分析布局和结构。

#### 创建可验证的中间输出

当 Claude 执行复杂、开放式的任务时，可能会出错。"计划-验证-执行"模式通过在执行前让 Claude 先以结构化格式创建计划，然后用脚本验证该计划，从而及早捕获错误。

**示例：** 设想让 Claude 根据电子表格更新 PDF 中的 50 个表单字段。如果没有验证，Claude 可能会引用不存在的字段、创建冲突的值、遗漏必填字段或错误地应用更新。

**解决方案：** 使用前面展示的工作流模式（PDF 表单填写），但添加一个中间文件 `changes.json`，在应用更改前进行验证。工作流变为：分析 → **创建计划文件** → **验证计划** → 执行 → 验证。

**该模式有效的原因：**

- **及早捕获错误：** 验证在应用更改前发现问题
- **机器可验证：** 脚本提供客观验证
- **可逆的计划：** Claude 可以在不触及原始文件的情况下迭代计划
- **清晰的调试：** 错误信息指向具体问题

**使用时机：** 批量操作、破坏性更改、复杂的验证规则、高风险操作。

**实现技巧：** 让验证脚本输出详细的特定错误信息，例如“字段 'signature_date' 未找到。可用字段：customer_name, order_total, signature_date_signed”，以帮助 Claude 修复问题。

#### 包依赖

Skills 在代码执行环境中运行，具有特定平台限制：

- **claude.ai：** 可以从 npm 和 PyPI 安装包，并从 GitHub 仓库拉取
- **Claude API：** 无网络访问权限，无运行时包安装

在 SKILL.md 中列出所需的包，并在[代码执行工具](https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool)文档中确认它们是否可用。

#### 运行时环境

Skills 在代码执行环境中运行，具有文件系统访问、bash 命令和代码执行能力。有关此架构的概念性解释，请参阅概述中的[Skills 架构](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview#the-skills-architecture)。

**这对您的编写有何影响：**

**Claude 如何访问 Skills：**

1. **元数据预加载：** 启动时，所有 Skills 的 YAML 前置元数据中的名称和描述被加载到系统提示中
2. **按需读取文件：** Claude 使用 bash Read 工具在需要时访问文件系统中的 SKILL.md 和其他文件
3. **高效执行脚本：** 实用脚本可以通过 bash 执行，无需将其完整内容加载到上下文中。只有脚本的输出会消耗 token
4. **大文件无上下文惩罚：** 参考文件、数据或文档在实际读取之前不会消耗上下文 token

- **文件路径很重要：** Claude 将你的技能目录视为文件系统。请使用正斜杠（`reference/guide.md`），而非反斜杠
- **描述性地命名文件：** 使用能表明内容的名称：`form_validation_rules.md`，而不是 `doc2.md`
- **为便于发现而组织：** 按领域或功能组织目录结构
  - 好的做法：`reference/finance.md`、`reference/sales.md`
  - 不好的做法：`docs/file1.md`、`docs/file2.md`
- **打包全面的资源：** 包含完整的 API 文档、大量示例、大型数据集；在访问前不消耗上下文 token
- **对于确定性操作，优先使用脚本：** 编写 `validate_form.py`，而不是要求 Claude 生成验证代码
- **明确执行意图：**
  - "运行 `analyze_form.py` 以提取字段"（执行）
  - "参见 `analyze_form.py` 了解提取算法"（作为参考阅读）
- **测试文件访问模式：** 通过实际请求验证 Claude 能否导航你的目录结构

**示例：**

- `bigquery-skill/`
  - `SKILL.md`（概述，指向参考文件）
  - `reference/`
    - `finance.md`（收入指标）
    - `sales.md`（销售管道数据）
    - `product.md`（使用分析）

当用户询问收入时，Claude 读取 SKILL.md，看到对 `reference/finance.md` 的引用，然后调用 bash 仅读取该文件。sales.md 和 product.md 文件保留在文件系统中，在需要之前不消耗任何上下文 token。这种基于文件系统的模型正是实现渐进式信息揭示的关键。Claude 可以导航并按需精确加载每个任务所需的内容。

有关技术架构的完整详细信息，请参阅技能概述中的 [技能工作原理](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview#how-skills-work)。

#### MCP 工具引用

如果你的技能使用 MCP（模型上下文协议）工具，请始终使用完全限定的工具名称，以避免出现"工具未找到"错误。

**格式：** `ServerName:tool_name`

**示例：**

```
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">使用 BigQuery:bigquery_schema 工具检索表 schema。</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">使用 GitHub:create_issue 工具创建 issue。</span></span>
```

其中：

- `BigQuery` 和 `GitHub` 是 MCP 服务器名称
- `bigquery_schema` 和 `create_issue` 是这些服务器内的工具名称

如果没有服务器前缀，Claude 可能无法定位该工具，尤其是在多个 MCP 服务器可用的情况下。

#### 避免假设工具已安装

不要假设软件包已可用：

```
<span class="line"><span style="--shiki-light:#1F2328;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">**不好的示例：假设已安装**</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">：</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">"使用 pdf 库处理文件。"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-light-font-weight:bold;--shiki-dark:#569CD6;--shiki-dark-font-weight:bold">**好的示例：明确说明依赖项**</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">：</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">"安装所需软件包：</span><span style="--shiki-light:#0550AE;--shiki-dark:#CE9178">`pip install pypdf`</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">然后使用它：</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">```python</span></span>
<span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#C586C0">from</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> pypdf </span><span style="--shiki-light:#CF222E;--shiki-dark:#C586C0">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> PdfReader</span></span>
<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">reader </span><span style="--shiki-light:#CF222E;--shiki-dark:#f3f7f6">=</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6"> PdfReader(</span><span style="--shiki-light:#0A3069;--shiki-dark:#CE9178">"file.pdf"</span><span style="--shiki-light:#1F2328;--shiki-dark:#f3f7f6">)</span></span>
<span class="line"><span style="--shiki-light:#82071E;--shiki-light-font-style:italic;--shiki-dark:#F44747;--shiki-dark-font-style:inherit">```</span><span style="--shiki-light:#0A3069;--shiki-light-font-style:italic;--shiki-dark:#CE9178;--shiki-dark-font-style:inherit">"</span></span>
```

### 技术说明

#### YAML 前置元数据要求

SKILL.md 前置元数据中需要 `name` 和 `description` 字段，并遵循特定的校验规则：

- `name`：最多 64 个字符，仅限小写字母/数字/连字符，不含 XML 标签，不使用保留字
- `description`：最多 1,024 个字符，非空，不含 XML 标签

有关完整结构详情，请参阅 [Skills 概述](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview#skill-structure)。

#### Token 预算

为获得最佳性能，请将 SKILL.md 正文控制在 500 行以内。如果内容超出此限制，请使用前面描述的渐进式披露模式将其拆分为多个独立文件。关于架构细节，请参阅 [Skills 概述](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview#how-skills-work)。

### 高效 Skills 检查清单

在分享 Skill 之前，请确认：

#### 核心质量

- 描述具体且包含关键术语
- 描述同时涵盖 Skill 的功能及适用场景
- SKILL.md 正文不超过 500 行
- 额外细节放在独立文件中（如需要）
- 不包含时效性信息（或放在“旧模式”部分）
- 全文术语一致
- 示例具体而非抽象
- 文件引用层级不超过一层
- 合理使用渐进式披露
- 工作流步骤清晰

#### 代码与脚本

- 脚本旨在解决问题，而非推给 Claude 处理
- 错误处理明确且有用
- 无“魔数”（所有值均有合理依据）
- 所需包已在指令中列出，并经确认可用
- 脚本有清晰的文档
- 不带 Windows 风格路径（全部使用正斜杠）
- 对关键操作有验证/校验步骤
- 包含针对质量关键任务的反馈循环

#### 测试

- 已创建至少三个评估用例
- 使用 Haiku、Sonnet 和 Opus 测试通过
- 使用真实使用场景进行测试
- 已纳入团队反馈（如适用）

### 后续步骤

[开始使用 Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/quickstart)

创建你的第一个 Skill
[在 Claude Code 中使用 Skills](https://code.claude.com/docs/en/skills)

在 Claude Code 中创建和管理 Skills
[通过 API 使用 Skills](https://platform.claude.com/docs/en/build-with-claude/skills-guide)

以编程方式上传和使用 Skills

此页面是否有帮助？
