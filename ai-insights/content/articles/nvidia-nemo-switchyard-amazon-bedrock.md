---
title: "使用 NVIDIA NeMo Switchyard 在 Amazon Bedrock 上为编码代理请求智能路由到合适模型"
date: 2026-11-14T07:12:03.063Z
tags: ["NVIDIA NeMo Switchyard", "Amazon Bedrock", "LiteLLM", "AI Agent", "模型路由", "成本优化"]
summary: "文章总结：使用 NVIDIA NeMo Switchyard 在 Amazon Bedrock 上为编码代理请求智能路由到合适模型 这是一篇 AWS 机器学习博客（2026年11月13日发布），介绍如何通过 NVIDIA NeMo Swit"
---
> **原文链接**: [https://aws.amazon.com/cn/blogs/machine-learning/route-coding-agent-requests-to-the-right-model-on-amazon-bedrock-with-nvidia-nemo-switchyard/](https://aws.amazon.com/cn/blogs/machine-learning/route-coding-agent-requests-to-the-right-model-on-amazon-bedrock-with-nvidia-nemo-switchyard/)
> **来源**: aws.amazon.com
> **发现于**: 管理台手动提交
> **说明**: 本文由 AIHot汪 自动聚合(原文即中文,未翻译)

---

## AI 总结

**文章总结：使用 NVIDIA NeMo Switchyard 在 Amazon Bedrock 上为编码代理请求智能路由到合适模型**

这是一篇 AWS 机器学习博客（2026年11月13日发布），介绍如何通过 **NVIDIA NeMo Switchyard** 开源库，结合 **LiteLLM** 网关，在 Amazon Bedrock 上为编码代理（如 Claude Code、OpenAI Codex CLI）实现智能模型路由，核心目标是**降低“每完成一个任务的成本”（cost per solved task）**，而不是单纯比较 token 单价。

### 核心问题
编码代理完成一个任务通常需要多次模型调用（读取文件、编辑代码、运行测试等）。总成本受以下因素影响：
- 需要多少轮对话
- 每轮重放的历史长度
- 失败重试次数

单纯看 token 价格无法真实反映“解决一个任务”的成本，因此需要按**成功完成任务的总成本**来评估路由策略。

### 解决方案概述
- **NVIDIA NeMo Switchyard**：帮助代理根据请求选择合适模型。支持的主要策略包括：
  - **Stage routing**：根据近期工具调用结果（tool activity）在两个候选模型（强能力模型 + 低成本高效模型）之间切换。不需要额外的裁判模型。
  - **Random routing**：按权重随机分配，适合 A/B 测试。
- 通过 **AWS CDK** 部署 LiteLLM（开源 LLM 网关）+ Switchyard 插件，运行在 Amazon ECS on Fargate 上。
- 所有推理调用走 Amazon Bedrock 的 Converse/ConverseStream API，流量通过 VPC 端点保持在 AWS 网络内。

### 架构关键点
1. 编码代理发送 OpenAI 兼容请求（`model: "switchyard"`）。
2. AWS WAF + Application Load Balancer 过滤并转发请求（仅开放特定路径）。
3. LiteLLM + Switchyard 插件根据策略选择模型。
4. 调用 Bedrock 模型，响应返回时通过 `x-litellm-model-name` header 标明实际使用的模型。

安全措施包括 IP 白名单、WAF 规则、Secrets Manager 管理密钥、私有子网等。

### 实践步骤（简要）
1. **定义模型组**：在 LiteLLM 配置中设置 `switchyard` 路由组（例如 Claude Opus 5.5 作为强模型 + NVIDIA Nemotron 3 Super 120B 作为高效模型），并准备单模型基线组用于对比。
2. **配置 Stage 路由**：通过 `switchyard.toml` 设置 `algorithm = "stage"`，优先使用高效模型，仅在历史信号表明需要时升级到强模型。
3. **部署网关**：使用 CDK 部署到 ECS，支持 HTTPS（推荐）或临时 HTTP 测试。
4. **测试**：通过 curl 或 smoke test 验证路由行为。
5. **测量成本**：使用样本仓库中的基准运行器（`bench/run.py` 和 `bench/multiturn.py`）在简单编码任务（如 slugify、roman numerals、表达式解析等）上对比路由组与单模型基线的 **COST/SOLVED** 指标。

### 关键建议与注意事项
- 优先看 **SOLVED（成功解决任务数）**，再看 **COST/SOLVED**。失败任务也会产生成本。
- 对困难任务单独分析，避免聚合数据掩盖问题。
- 进行足够重复实验以减少随机性影响。
- 样本任务仅作演示，建议替换为自己实际工作负载中的任务。
- 该集成目前是实验性的（基于 Switchyard 0.3.0 和 LiteLLM v1.102.0），不建议直接用于生产环境。

### 结论
通过部署 LiteLLM + Switchyard 并在自己的任务上测量“每解决任务成本”，可以客观评估路由是否比始终使用单一模型更经济。文章提供了完整的样本仓库，方便读者在非生产账户中快速试用和验证。

---
