---
title: "Hugging Face 发布 “Harness Adapters”（针对 Agent 框架的适配器）"
date: 2026-11-21T03:16:16.253Z
tags: ["LoRA适配器", "Hugging Face", "强化学习", "Qwen3.8-27B", "GRPO", "AI Agent"]
summary: "以下是这篇 Hugging Face 博客《Harness Adapters at Scale》的核心总结： 一句话概括 Hugging Face 提出了一种\"每个智能体外壳（harness）训练一个轻量 LoRA 适配器\"的配方——用强化"
---
> **原文链接**: [https://huggingface.co/blog/harness-adapters-at-scale](https://huggingface.co/blog/harness-adapters-at-scale)
> **来源**: huggingface.co
> **发现于**: 管理台手动提交
> **说明**: 本文由 AIHot汪 自动聚合(原文即中文,未翻译)

---

## AI 总结

以下是这篇 Hugging Face 博客《Harness Adapters at Scale》的核心总结：

一句话概括

Hugging Face 提出了一种"每个智能体外壳（harness）训练一个轻量 LoRA 适配器"的配方——用强化学习在真实 agent 环境中微调，让同一个基座模型在不同编码智能体（pi / OpenCode / Hermes）里都变得更准、更省 token。

核心思路

- 问题：通用大模型针对"平均场景"优化，不针对某个具体 harness + 任务组合，因此在准确率与 token 消耗上都有浪费。
- 方案：冻结基座权重，为每个 harness 单独训练一个 LoRA 适配器（rank 32，挂所有线性层），在未经修改的真实 harness 内用 RL 训练，而不是在训练框架里重新实现 agent loop。
- 基座模型：Qwen3.8-27B（早期版本还测过 LFM2.5-24B-A2B、LFM3-1.7B、TwIL-8B）。
- 三个 harness：pi、OpenCode、Hermes Agent。

训练配方

- 算法：GRPO，用 TRL 的 
"AsyncGRPOTrainer" + tree attention，异步训练不用等全部 rollout 完成。
- 奖励：验证器通过/失败 + 小额"工具效率奖励"（
"0.1 × (1 − 调用次数/15)"，仅对答对的 rollout 发放）。
- 数据：
"harness-hub/agentic-coding-envs" 数据集，871 个任务来自 35 个仓库（SWE-smith / SWE-Gym / Tasksmith）；难度过滤后保留基座"时而解出、时而解不出"的任务（GRPO 需要这种方差才有学习信号）。
- 安全护栏 safeagents：反向代理拦截明显的 reward hacking 调用（改测试文件、写 reward 文件、查答案源等），被拦的 rollout 记 0 分。
- 成本：每台 2×B200（一张跑 vLLM、一张训练）；一个 vLLM 服务可同时托管所有 harness 的适配器策略，评估 1350 个会话 <1 小时、约 $5 GPU，比分开部署便宜约 18 倍。

效果（Qwen3.8-27B，thinking off）

专用适配器 vs 基座（pass@1）：

Harness SWE-bench Pro Terminal-Bench 2.1
pi 40.0% → 64.0% 40.0% → 56.5%
Hermes 29.4% → 43.1% 44.7% → 58.8%
OpenCode 35.3% → 51.0% 47.6% → 52.4%

- 效率：在两者都解出的任务上，工具调用减少 53–72%，单任务 token 从约 2.9K 降到 1.5K——模型推理更少、调用更准、首次成功率更高。
- Super-adapter（合并版）：三个 LoRA 权重更新几乎正交（余弦相似度 0.01–0.02），沿 rank 维度拼接成 rank-96 适配器，权重取 ½ 最佳。不开 thinking 时六个组合平均 pass@1 从 39.5% → 49.0%；开 thinking（训练时未使用）反而最强，平均 55.5% → 63.5%，Hermes 上 SWE-bench Pro +16 分、OpenCode +20 分。

关键结论

1. 专用胜过通用：单一 checkpoint 难适应所有 harness，按 harness 训一个小 LoRA 是更高性价比的杠杆。
2. 合并可行且有效：正交更新让"一个模型服务多个 harness"成为现实，代价是专用适配器的部分增益（pi 损失最大）。
3. 工具调用更少 ≠ 准确率下降：reward shaping + 真实环境 RL 同时带来准确率提升和成本下降。
4. 可复现：环境、safeagents 规则、训练超参、GGUF、被拦截的调用记录全部开源在 Hub 上。

局限与注意：博客中的加速数字多为作者自评的冒烟测试结果，最终 200–400 步长跑在发文时仍在直播；"工具更少、准确率不降"目前主要在冒烟实验层面得到验证。

需要我进一步展开某个部分（比如 safeagents 的拦截规则、GRPO 奖励细节、或 super-adapter 的合并数学）吗？

---
