---
title: "CopilotKit 发布 OpenBot 1.0：MIT 开源、可自托管的 AI 同事，内置治理机制"
date: 2026-11-19T14:48:29.997Z
tags: ["CopilotKit", "OpenBot", "AI Agent", "开源项目", "自托管"]
summary: "CopilotKit 发布 OpenBot 1.0：MIT 开源、可自托管的 AI 同事，内置治理机制 CopilotKit 于 2026 年 11 月 9 日正式发布了 OpenBot 1.0 。这是一款 MIT 许可证 的开源、可自托管"
---
> **原文链接**: [https://www.marktechpost.com/2026/11/12/copilotkit-openbot-1-0-open-source-ai-coworker/?amp=1](https://www.marktechpost.com/2026/11/12/copilotkit-openbot-1-0-open-source-ai-coworker/?amp=1)
> **来源**: www.marktechpost.com
> **发现于**: 管理台手动提交
> **说明**: 本文由 AIHot汪 自动聚合(原文即中文,未翻译)

---

## AI 总结

**CopilotKit 发布 OpenBot 1.0：MIT 开源、可自托管的 AI 同事，内置治理机制**

CopilotKit 于 2026 年 11 月 9 日正式发布了 **OpenBot 1.0**。这是一款 **MIT 许可证** 的开源、可自托管 AI 代理工作空间（AI coworker），与大多数闭源、厂商锁定的 AI 产品形成鲜明对比。用户可以自行带来模型、代理和基础设施，所有 Bot 操作都会先经过策略检查。

### 核心特点
- **独立工作环境**：每个 Bot 拥有独立容器，内含 Chromium 浏览器、登录信息和文件，只能访问用户授权的工具。
- **交互方式**：用户可观察 Bot 工作过程、审查结果，并在同一对话中批准下一步操作。v1.0 默认以 Markdown 回复，并支持绘制组件。
- **治理网关**：所有浏览器点击、文件写入、MCP 工具调用等操作都必须先通过 CEL 策略评估，审计日志优先写入，拒绝规则优先于允许规则，规则异常时默认拒绝（fail closed）。

### 商业版额外功能
- SSO / SCIM 同步（支持 Google、Microsoft Entra、Okta 等）
- 按 Bot / 角色 / 人员的工具授权与访问请求
- 敏感操作可路由至人工审批
- 按 Bot / 团队 / 人员的花费可见性与 Token 限额
- 完整审计轨迹（支持 SIEM 导出）、多租户、管理后台
- 符合 EU AI Act 内容标注、保留与删除要求
- CopilotKit 本身持有 SOC 2 Type II

### 支持的模型与代理
- **模型**：OpenAI、Claude、Gemini、Grok，以及开源模型如 Kimi、DeepSeek、Qwen、Nemotron、Mistral 等。
- **代理框架**：任何支持 AG-UI 协议的代理均可接入，官方列出 Claude Agent SDK、OpenAI Agents SDK、LangChain、Google ADK、Mastra、AWS Strands、Microsoft Agent Framework、CrewAI 等，仓库中还提供 Agno、AG2、LlamaIndex、Pydantic AI 示例。

### 1.0 新功能
- 桌面应用（Mac / Windows，支持签名更新）
- **Teach a Bot**：录制一次任务，自动转化为可复用技能
- 通过 Composio 和 Arcade 支持多账户，可设置审批规则
- 编排能力：一个 Bot 可向其他专业 Bot 委派任务（受管理员权限限制）
- iOS、Android、Slack、Microsoft Teams 早期访问

### 部署与定价
- **个人版**：免费，可本地运行。
- **商业版**：最高 $29 / 活跃用户 / 月；模型花费超过 $5,000 / 月时额外收取 5%。年度计划支持气隙（air-gapped）部署和 7×24 支持。
- 企业部署：通过单个 Helm Chart 部署到 AWS、Azure、Google Cloud 或任意 Kubernetes 集群。

### 典型用例
- 工单分流（审批后发到 Slack）
- 费用审核（对照政策标记超支）
- 运维工作流（发现问题并起草修复方案供人工确认）

### 总结
OpenBot 1.0 的核心价值在于**开放、可控、可自托管**：MIT 开源、支持自带模型与代理、每步操作都有策略把关，同时提供从个人到企业的完整治理与部署方案。相关资源可查看 GitHub 仓库、v1.0.0 发布说明和官网 open.bot。

---
