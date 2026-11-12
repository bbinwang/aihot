---
title: "AWS分享生产级智能体上下文工程四层方法"
date: 2026-11-06T04:35:38.300Z
tags: ["上下文过程", "聚合"]
summary: "原文链接 : https://aws.amazon.com/cn/blogs/machine learning/four layers of context engineering for production ai agents how "
---
> **原文链接**: [https://aws.amazon.com/cn/blogs/machine-learning/four-layers-of-context-engineering-for-production-ai-agents-how-deep-insight-applies-them-in-working-code/](https://aws.amazon.com/cn/blogs/machine-learning/four-layers-of-context-engineering-for-production-ai-agents-how-deep-insight-applies-them-in-working-code/)
> **来源**: aws.amazon.com
> **发现于**: 管理台手动提交
> **说明**: 本文由 AIHot 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

### 人工智能

## 面向生产级 AI Agent 的四层上下文工程:Deep Insight 如何在可运行代码中应用

当生产级 AI Agent 处理数据分析和报告生成等任务时，上下文(context)管理可能成为重大瓶颈。200K token 的窗口听起来很充裕，但一个真实任务可能在几分钟内就消耗掉其中大部分。数据分析和报告生成会导致 Agent 在执行中途失败、精度下降或成本攀升。业界已发表的大量指导原则对此有所涉及，但各项技术单看容易，应用起来却难。将这些技术组合应用则会产生可衡量的效果：在本文介绍的参考实现中，一个单一的 write-and-execute 工具将每个脚本添加到上下文中的 token 减少了约 95%,而按需加载 Skills 则将系统提示词缩减了约 97%。

本系列将这些指导原则整理为可直接应用的实践。Anthropic 的工程博客文章，结合 Strands Agents SDK 中内置的功能，归结为上下文工程的四个层次：在架构层面隔离上下文、通过提示词控制上下文、将上下文外置到文件系统，以及通过独立的 Agent 和防护机制验证上下文。在本文(第 2 部分)中，你将了解每个层次的运作方式及其在可运行代码中的具体形态。我们在 *Deep Insight* 中应用了这些技术，这是一个基于 Strands Agents SDK 和 Amazon Bedrock AgentCore 构建的开源多 Agent 数据分析解决方案，并作为贯穿全文的参考实现。

### 系列文章

- [第 1 部分：多 Agent 系统的 5 大生产挑战以及 Deep Insight 如何解决它们。](https://aws.amazon.com/blogs/machine-learning/5-production-challenges-in-multi-agent-systems-and-how-deep-insight-solved-them/)
- 第 2 部分：面向生产级 AI Agent 的四层上下文工程：Deep Insight 如何在可运行代码中应用。
- 第 3 部分：Harness engineering 实践：将 Deep Insight 从开发推向生产。(即将推出！)

第一篇文章定义了生产级多 Agent 系统必须解决的五个核心挑战，并介绍了 [Strands Agents SDK](https://strandsagents.com/)、[Amazon Bedrock](https://aws.amazon.com/bedrock/)、[Bedrock AgentCore](https://aws.amazon.com/bedrock/agentcore/) 和 [AWS Fargate](https://aws.amazon.com/fargate/) 如何分别解决不同层次的问题，并附有代码示例。这第二篇文章将聚焦于该架构之上的四层上下文工程实践，并逐一展示其具体实现。第三篇文章将指导你在 Amazon Virtual Private Cloud(Amazon VPC)的安全私有网络中部署和运维 Agent,涵盖实际生产运维所需的一切内容。

### 什么是上下文工程？

上下文工程是一门优化大语言模型(LLM)有限上下文窗口中信息的学科，目的是让 Agent 发挥最佳性能。Amazon Bedrock 上提供的 Anthropic Claude Sonnet 4.5 拥有 200K 的上下文窗口，但复杂的生产任务很快就会超出这一限制。例如，像“*分析销售数据并生成 DOCX 报告*”这样看似简单的请求，实际上要经过多个阶段：数据加载与探索(5 分钟)、按类别进行销售分析(3 分钟)、为时间序列分析生成五张图表(10 分钟)、统计验证(3 分钟)以及最终报告生成(5 分钟)。这些阶段合计在 15 分钟内消耗超过 150K token。

在单一上下文中处理此类任务会带来诸多问题：窗口在任务中途溢出、过时的上下文导致性能下降，而且一旦出错就需要重新运行整个 pipeline。随着上下文的增长，模型对重要信息的关注度下降，而在按 token 计费的定价模式下，低效还会推高成本。

> *“随着上下文窗口中 token 数量的增加，模型从该上下文中准确回忆信息的能力会下降(Context rot)。”*
>
>
>
> — Anthropic,“[面向 AI Agent 的高效上下文工程](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)”(2025.09)

Context engineering 恰好解决了这些问题,而且它不仅仅是一系列技术的集合。它涵盖架构设计、prompt 编写、工具实现和验证,是一门分层学科,其中每一层都在弥补前面各层的不足。本文详细介绍了一种可用于高效管理 context 的四层方法。

### 如何处理超出 context window 的任务

Anthropic 已发布了多项用于处理 long-horizon 任务的技术。Deep Insight 将这些技术归纳为四个层次,每一层都在解决其他层次的局限性。下表列出了这四个层次。

| **层次** | **实践** | **核心原则** | **局限性** |
| --- | --- | --- | --- |
| Layer 1: 架构 | 通过 Multi-Agent 架构隔离 Context | 每个 Agent 在独立的 context 中运行 | 当仅靠隔离不够时 |
| Layer 2: Prompt | 输出控制与行为规则 | 通过 prompt 限制 context 输入 | 当仅靠 prompt 不够时 |
| Layer 3: 工具 | 基于 File 的 Context 外部化 | 将大量内容保存在 context 之外的文件中 | 当问题仍然出现时 |
| Layer 4: 验证 Agent 与安全防护 | 独立验证与安全防护 | 捕获错误并防止 context 溢出 | 最后一道防线 |

接下来的章节将依次介绍每一层,说明该层规定了什么、为什么仅靠前面的层次不够,以及该实践是如何在 Deep Insight 中实现的。

### 1. 通过 Multi-Agent 架构隔离 context

为每个专门的 Agent 提供各自的 context window,只将压缩后的结果传递给 orchestrator。Deep Insight 通过 Coordinator、Planner、Plan Reviewer、Supervisor 和 Tool Agents(Coder、Validator、Reporter、Tracker、Auditor)的层级结构来实现这一点。

如果只使用单个 Agent,所有信息——从用户请求到数据探索、分析、图表生成、验证和报告——都会累积在同一个 context 中,很容易超出窗口大小。为每个 Agent 提供各自的 context,即使是用量最大的 Coder,总消耗也能保持在 25K token 以内。每个 Agent 只接收它所需的信息,并通过完成通知和简要摘要向其他 Agent 发送信号。

隔离的关键在于最小化共享信息。Deep Insight 使用一个 Python 字典 `shared_state`,其中只存储四项内容:

- `messages`:前一个 Agent 的最终消息(而非完整对话历史)。
- `clues`:从每个 Agent 收集的压缩摘要。
- `full_plan`:由 Planner 生成、由 Tracker 更新的检查清单。
- `history`:Agent 名称和消息的简要日志。

clues 使用固定的 CLUES_FORMAT:不传递每个 Agent 的完整对话(数万 token),而只传递压缩后的核心结果。

```python
## coder_agent_tool.py -- context passing format
CLUES_FORMAT = "Here is clues from {}:\n\n<clues>\n{}\n</clues>\n\n"
RESPONSE_FORMAT = "Response from {}:\n\n<response>\n{}\n</response>\n\n*Please execute the next step.*"

## After Coder completes: add only compressed result to clues
clues += CLUES_FORMAT.format("coder", response["text"])
```

这一模式正是 Anthropic 在《[如何构建我们的 Multi-Agent 研究系统](https://www.anthropic.com/engineering/multi-agent-research-system)》一文中所推荐的模式。该文描述了一种 orchestrator-worker 模式,由一个 lead agent 将任务委派给专门的 subagent,每个 Agent 只在自己的 context 中工作。你无需自行构建:Strands Agents SDK 中的 [agents-as-tools](https://strandsagents.com/docs/user-guide/concepts/multi-agent/agents-as-tools/) 模式已在框架层面提供了这种隔离。

### 2. 通过 prompt 控制 context 流入

仅靠 Layer 1 的隔离是不够的:即使拥有独立的 context,一个生成冗长回复的 Agent 也会使 Supervisor 的 context 膨胀。Layer 2 通过 prompt 限制每个 Agent 的输出。

在 Deep Insight 中，我们通过 prompt 来限制每个 Agent 返回给 Supervisor 的信息量。正如 Deep Insight 的 prompt 所展示的，有三条规则起了主要作用。

> *“从最强的模型和一个简单的 prompt 开始。然后基于实际观察到的失败案例，逐步添加具体的指令。”*
>
>
>
> — Anthropic, "Effective Context Engineering for AI Agents" (2025.09)

#### 实现细节 2-1：为每个 Agent 明确设定输出 token 预算

每个 Agent 的 prompt 都规定了响应 token 的最大数量，防止过长的响应污染 Supervisor 的上下文。

| **Agent** | **输出 token 预算** | **原因** |
| --- | --- | --- |
| Coder | 1,000–1,500 tokens | 分析代码会保存到文件中，因此该 Agent 只返回状态、已完成任务和洞察的摘要 |
| Validator | 800 tokens | 验证结果会保存到 `citations.json`。该 Agent 只返回摘要 |
| Reporter | 1,000 tokens | 该 Agent 以 DOCX 文件的形式生成报告，只返回结果摘要 |

Anthropic 的《[Writing Effective Tools for Agents](https://www.anthropic.com/engineering/writing-tools-for-agents)》一文建议，为了上下文效率，可以给工具提供 CONCISE 或 DETAILED 响应选项。我们把同样的思路向上应用一层，放到每个 Agent 的 system prompt 中。在 Deep Insight 中，所有 Agent 共享一个标准化格式：

```text
### Status
[SUCCESS | PARTIAL_SUCCESS | ERROR]
### Completed Tasks
- [Task 1 from FULL_PLAN -- use exact wording so Tracker can match]
- [Task 2 -- be specific, not generic]
### Key Insights
- [Key finding 1 with numbers and ratios]
- [Key finding 2 with business implications]
### Generated Files
- ./artifacts/chart.png -- brief description
- ./artifacts/calculation_metadata.json -- N calculations
```

#### 实现细节 2-2：自包含代码哲学

Coder Agent 的 prompt 中明确写道 "variables do not persist between scripts"（变量不会在脚本之间持久化）。每个脚本必须包含所有必要的 import 并直接加载数据。prompt 同时提供了错误和正确的示例：

```python
## WRONG -- Attempting to use a variable from Turn 1 in Turn 2
## Turn 1:
df = pd.read_csv('data.csv')
total = df['Amount'].sum()

## Turn 2:
print(f"Total: {total}")  # NameError: name 'total' is not defined

## CORRECT -- Every script is self-contained
import pandas as pd
df = pd.read_csv('./artifacts/cache/df_main.csv')  # Load from cache
total = df['Amount'].sum()
print(f"Total: {total}")
```

这条规则之所以与上下文工程相关，是因为引用之前脚本中的变量需要 Agent “记住”先前的对话，这意味着过去的代码必须保留在上下文中。而自包含原则意味着过去的代码可以从上下文中安全移除。

#### 实现细节 2-3：Supervisor 的章节完成规则

Supervisor 的 prompt 包含如下规则："Do not move to the next agent until all checklist items in the current agent's section are marked `[x]`."（在当前 Agent 章节的所有清单项都被标记为 `[x]` 之前，不要移动到下一个 Agent。）我们把这条规则写进 prompt，是因为判断 Coder 的工作是否完成，需要 Supervisor 借助 Tracker 的更新信息来解读计划。这种判断很难仅靠代码来表达。

### 3. “上下文中只放指针，实际数据放在文件里”

第 1 层在 Agent 之间隔离上下文，第 2 层限制 Agent 内部的输出。但当 Coder Agent 生成 100 行 Python 代码时，代码本身也会进入上下文。即使有“简洁回复”的 prompt 指令，有些代码也无法写得简短。第 3 层通过工具设计，把重内容移出上下文，放入文件系统。正如以下实现细节所示，有四项技术贡献了大部分收益。

#### 实现细节 3-1：用 Write 和 Execute Tool 将代码移出上下文

Coder 读取分析计划，编写 Python 代码并执行以生成可视化。但当代码变长时，常规做法（将文件写入和代码执行拆分为两个独立工具）会让每个脚本直接向上下文中增加 100 行，累积超过 1,000 行。

解决方案是将这两个步骤合并为一个工具，这样代码就永远不会作为消息进入 context。Deep Insight 的 Coder agent 使用一个 `write_and_execute_tool` 来实现这一点。

以下是 write_and_execute_tool 的一部分。在写入并执行文件之后，它只返回一个摘要：“写入了 105 行，执行成功，完成了五个类别的分析。” 代码保留在文件中，context 中只留下大约三行的摘要。根据这个例子，这节省了大约 95% 的 token。

```python
## write_and_execute_tool.py
def _handle_write_and_execute_tool(file_path, content, timeout=300):
    """Write a Python script and immediately execute it."""
    # Step 1: Write file
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    # Step 2: Execute immediately
    result = subprocess.run(
        f"python {file_path}",
        shell=True,
        capture_output=True,
        timeout=timeout
    )
    # Return only summary
    return f"Written {len(content.split(chr(10)))} lines to {file_path}\n" \
        f"Execution successful\n" \
        f"Output: {result.stdout[:500]}"  # Only first 500 chars
```

> *“服务端过滤：在数据到达 context 之前于执行层进行过滤，token 减少了 98.7%（从 150K 降至 2K）。”*
>
>
>
> — Anthropic，“[Code Execution with MCP](https://www.anthropic.com/engineering/code-execution-with-mcp)”(2025.11)

#### 实现细节 3-2：在 Coder agent 中将通用逻辑复用为模块

通用模块会在多次分析中被复用。与其每次都重新生成，不如将常用函数一次性定义为一个模块并导入，从而避免 token 浪费和 context 重复。

如果不这样做，在每次分析中定义诸如 to_python_type() 或 track_calculation() 之类的函数，会在 10 次分析中产生 200–300 行重复代码。Deep Insight 会在第一个任务之前生成一个名为 `coder_analysis_utils.py` 的模块，其中包含转换 numpy 类型、追踪计算元数据以及保存为 JSON 的函数。后续分析直接导入该模块，用两行 import 语句替代 20–30 行重新生成的代码，从而节省 token，并提升一致性和可调试性。

```python
## coder_analysis_utils.py -- common module generated before first task
import numpy as np
import json
from datetime import datetime

_calculations = []

def to_python_type(value):
    """Convert numpy/pandas types to Python native types"""
    if isinstance(value, (np.integer, np.int64)): return int(value)
    elif isinstance(value, (np.floating, np.float64)): return float(value)
    elif isinstance(value, np.ndarray): return value.tolist()
    return value

def track_calculation(calc_id, value, description, formula,
                      source_file, source_columns, importance):
    """Track calculation metadata -- Validator independently verifies later"""
    _calculations.append({
        "id": calc_id, "value": to_python_type(value),
        "description": description, "formula": formula,
        "source_file": source_file, "source_columns": source_columns,
        "importance": importance
    })

def save_calculation_metadata(path="./artifacts/calculation_metadata.json"):
    """Save all tracked calculations to JSON"""
    with open(path, 'w', encoding='utf-8') as f:
        json.dump({"generated_at": datetime.now().isoformat(),
                   "calculations": _calculations}, f, ensure_ascii=False, indent=2)
```

#### 实现细节 3-3：通过结构化笔记保存和共享分析结果

我们使用结构化笔记来共享详细的分析结果，而无需让这些结果经过每个 agent 的 context。Deep Insight 将这些结果存储在一个名为 `all_results.txt` 的文件中，各 agent 按需读取该文件。

例如，Coder agent 在每次分析任务完成后将结果追加到 `all_results.txt` 中：

```python
with open('./artifacts/all_results.txt', 'a', encoding='utf-8') as f:
    f.write(f"""
### Category Sales Analysis (completed at: 14:32)
- Top revenue category: Fruit (417,166,008 KRW, 45% of total)
- Top 3 categories: Fruit, Vegetables, Meat (78% of total)
- Generated file: ./artifacts/category_sales_chart.png
""")
```

       

Coder 在每次分析完成后都会将详细结果记录到该文件中，Reporter 在撰写最终报告时读取它。其他 Agent 也以同样的方式通过 all_results.txt 进行协作。

       

如果没有记笔记机制，Coder 在每个任务完成后都要将详细结果传递给 Supervisor,这些内容会在其上下文中不断累积。有了记笔记机制后，传递的只是一条约 30 token 的消息，例如"品类销售分析完成，发现 3 条关键洞见，详细结果已保存至 all_results.txt",Reporter 在需要时再读取该文件。

       

这一模式可以推广到单个文件之外。文件系统本身就可以充当 Agent 间通信的总线，Deep Insight 正是这么做的：

       

| **文件名** | **生产者** | **消费者** | **作用** |
| --- | --- | --- | --- |
| all_results.txt | Coder | Reporter | 分析结果的累积日志 |
| `calculation_metadata.json` | Coder | Validator | 数值计算记录：来源、公式与数值(用于校验) |
| `citations.json` | Validator | Reporter | 经校验的引用数据(以 [1]、[2] 的形式插入报告) |
| `audit_findings.json` | Auditor | Reporter | 最终报告中发现的引用缺陷(驱动 Reporter 进行针对性重试) |
| `coder_analysis_utils.py` | Coder | 所有脚本 | 共享的工具函数(一次编写，多次导入) |
| full_plan (shared_state) | Planner/Tracker | Supervisor | 清单状态(更新 [x]) |

       

> *"“Just in time”(即时加载)方式在运行时将数据动态加载进上下文，而不是预先处理所有相关数据，使上下文保持新鲜、相关，并能适应任务不断演进的状态。"*
>
>
>
> — Anthropic, "[Effective Context Engineering for AI Agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)" (2025.09)

       

#### 实现细节 3-4:利用 Skills 按需加载所需知识

       

这种方式不是把所有专业知识都塞进 system prompt,而是只在需要时才加载。如果把每一份技能指南(数据结构检查、README 生成、skill 创建、system prompt 编写、工具创建)都包含进来，会增加超过 20K token,使每次调用时 Coder Agent 都要加载不必要的信息，并且新增一个 skill 还得重新部署。

       

Deep Insight 的 Skills 系统在启动时只加载一份约 500 token 的 skill 目录，skill 列表中仅包含名称和简要描述。当用户请求"创建一个 README 文件"时，Agent 会判断"我需要 readme-generator skill",并调用 `skill_tool(skill_name="readme-generator")`。SkillLoader 随后读取 readme-generator/SKILL.md,返回一份约 3K token 的详细指南。

       


```python
## 1. Skill Discovery (at initialization)
from src.utils.skills.skill_utils import initialize_skills
available_skills, skill_prompt = initialize_skills(
    skill_dirs=["./skills"],
    verbose=True
)

## 2. Add to System Prompt (~500-token catalog)
system_prompt = base_prompt + skill_prompt

## 3. Runtime -- Agent loads skill when needed
## Agent decides: "This is README generation, I need the readme-generator skill"
## -> skill_tool(skill_name="readme-generator")
## -> Returns full SKILL.md content (~3K tokens)
```

       

每个 skill 都定义为一个 `SKILL.md` 文件，由 YAML frontmatter 和详细的 markdown 指南组成。其中包含 name、description、license、allowed-tools 等元数据，以及 Overview、When to Use This Skill、详细指令和 Best Practices。要新增一个 skill,只需在 skills/ 目录下创建一个新目录并编写一个 SKILL.md 文件，它就会被自动发现。

启动时，Agent 加载约 500 token 的技能目录，而不是在完整指南上浪费超过 20,000 token（减少约 97%）。需要时，它还可以额外加载数千 token 的技能详细说明。

### 4. 使用验证 Agent 和安全防护机制来验证质量

即使有了第 1–3 层，仍存在一个风险：相互隔离的 Agent 无法看到彼此的工作，因此如果 Coder 计算出错，Reporter 会将该错误带入报告。第 4 层是最后一道防线。

> *“提供测试工具，让 Agent 能够自行验证功能并修复仅从代码中看不出来的 bug。让模型使用描述性的 commit message 将其进度提交到 git，并在进度文件中撰写进度摘要。”*
>
>
>
> — Anthropic, “[Effective Harnesses for Long-Running Agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)” (2025.11)

#### 实现细节 4-1：Tracker、Validator 和 Auditor Agent：进度跟踪与质量保证

Tracker 实时更新计划的检查清单。当 Coder 完成数据加载时，Supervisor 会调用 Tracker，Tracker 根据类似“数据加载完成（1,000 行，5 列）”的信息将计划项从 `[ ]` 更新为 `[x]`。这让用户和系统都能清楚地了解进度进展到了哪一步。

Validator 独立重新执行 Coder 的计算以验证准确性。它读取 `calculation_metadata.json`，从源数据重新执行每项计算并进行比对：误差在 0.01 以内视为通过，不匹配则被标记。经过验证的计算结果写入 `citations.json`，供 Reporter 引用。Reporter 完成后，Auditor 会对照 `citations.json` 和 `calculation_metadata.json` 检查最终的 DOCX，且不会修改这两个文件。它将引用缺陷记录在 `audit_findings.json` 中，并可向 Reporter 请求最多两次针对性重试。

#### 实现细节 4-2：为验证计算设定优先级

验证每一项计算效率低下，因此应按重要性限定验证范围。Deep Insight 的 OptimizedValidator 采用以下阈值：

- 超过 50 项计算：激进过滤，验证全部高优先级，外加仅 10 个中优先级。
- 超过 20 项计算：适度过滤，验证全部高优先级，外加 15 个中优先级。
- 20 项或更少：验证大部分，全部高优先级加全部中优先级，再加 5 个低优先级。

它还采用类型安全的比较：为避免 numpy 与 Python 类型之间的差异问题，所有值都被转换为 `float()` 并检查绝对差值是否小于 0.01：

```python
## validator.md -- type-safe numerical comparison
try:
    match = abs(float(expected) - float(actual)) < 0.01
except:
    match = str(expected) == str(actual)
```

#### 实现细节 4-3：SummarizingConversationManager：最后一道安全网

在极端情况下上下文仍可能溢出，因此需要在其他层之下保留一个安全网。为此，Deep Insight 使用了 Strands Agents SDK 中的 [SummarizingConversationManager](https://strandsagents.com/docs/user-guide/concepts/agents/conversation-management/#summarizingconversationmanager)。

```python
## strands_sdk_utils.py -- safety net configuration at agent creation
agent = Agent(
    model=llm,
    system_prompt=system_prompts,
    tools=tools,
    conversation_manager=SummarizingConversationManager(
        summary_ratio=0.5,  # summarize oldest 50% on overflow
        preserve_recent_messages=10,  # always preserve 10 most recent messages
        summarization_system_prompt=apply_prompt_template("summarization", {})
    )
)
```

发生溢出时，LLM 会将最旧的 50% 消息总结为一条，同时始终保留最近的 10 条消息以维持当前任务的上下文。总结提示词（summarization.md）要求 `clues`、`plans` 和 `tracking status` 必须逐字保留。

#### 实现细节 4-4：用于成本优化的选择性 prompt 缓存

Context engineering 涵盖的不只是节省 token，还包括成本优化。根据每个 Agent 使用相同 prompt 被调用的频率，按 Agent 粒度启用 prompt 缓存。Deep Insight 的按 Agent 设置如下：

| **Agent** | **Prompt Cache** | **Tool Cache** | **原因** |
| --- | --- | --- | --- |
| Supervisor | Yes | Yes | 重复调用频率高，且 system prompt 和工具定义较大 |
| Coder | Yes | Yes | 依次运行多个分析脚本，每次使用相同的 prompt |
| Reporter | Yes | Yes | 按章节逐段增量生成报告，prompt 复用频率高 |
| Auditor | Yes | Yes | 在多轮对话中使用相同的 prompt 和工具检查 DOCX 和 JSON 文件，并在 Reporter 每次重试后重新运行 |
| Coordinator | No | No | 仅一次性调用，没有缓存收益 |
| Planner | No | No | 每个请求仅调用一次，只有当用户要求修订计划时才会再次调用 |
| Validator | No | No | 每次调用的数据都不同，缓存命中率低 |
| Tracker | No | No | 轻量级任务，无工具，无需缓存 |

启用了缓存的 Agent 会在 system prompt 和工具定义中插入缓存点，使重复调用时的输入 token 成本最多降低 90%。这是 Strands Agents SDK 原生支持的功能。Plan Reviewer 未出现在表格中，因为它是一个 human-in-the-loop 步骤，用于收集用户的批准或反馈，而非调用模型。

### 结论

本文详细介绍了四层工程方法，可用于高效管理那些超出上下文窗口的复杂任务的上下文。

- 第 1 层（架构级隔离）：每个 Agent 通过 multi-agent 架构在独立的上下文中工作，仅传递压缩后的摘要。
- 第 2 层（基于 prompt 的控制）：输出 token 预算、标准化响应格式和自包含代码理念，主动限制上下文流入。
- 第 3 层（文件系统的使用）：write_and_execute_tool 将代码保留在上下文之外，文件系统充当 Agent 间的通信总线，知识仅在需要时才延迟加载。
- 第 4 层（验证与保障）：Validator 的独立计算复核、Auditor 对最终报告的只读引用审计、Tracker 的进度跟踪、SummarizingConversationManager 的溢出防护，以及选择性 prompt 缓存，共同兼顾质量与成本。

每一层都构成一道防御系统，弥补前一层遗漏之处。当架构隔离不足时，prompt 限制输出。当 prompt 也不足时，工具将内容保持在上下文之外。而当问题仍然出现时，验证环节将其捕获。

这些层中的每一层都在 Anthropic 的工程博客文章中有详细说明：[“Effective Context Engineering for AI Agents”](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)、[“Code Execution with MCP”](https://www.anthropic.com/engineering/code-execution-with-mcp) 和 [“How We Built Our Multi-Agent Research System”](https://www.anthropic.com/engineering/multi-agent-research-system)。其中大部分推荐做法已经内置于 Strands Agents SDK 中，无需自行构建：SummarizingConversationManager、prompt 缓存以及 agents-as-tools 模式。

在构建生产级 Agent 时，仅靠 LLM 的上下文窗口往往是不够的。应用这些 context engineering 技术来高效管理上下文，并让您的 Agent 扩展以应对生产工作负载。

本文使用的参考实现 Deep Insight 是开源的。欢迎查阅代码并针对您的领域进行扩展。

- [GitHub](https://github.com/aws-samples/sample-deep-insight)
- [Workshop](https://catalog.us-east-1.prod.workshops.aws/workshops/ee17ba6e-edc4-4921-aaf6-ca472841c49b/en-US)

---

### 关于作者
