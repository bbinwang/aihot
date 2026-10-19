---
title: "如何构建靠谱、不易出错的自主 Agent 定时自动化工作流 Anthropic 自动化简报的六条设计规则"
date: 2026-10-09T00:00:00.000Z
tags: ["会员", "深度", "Agent", "自动化", "Claude", "聚合"]
summary: "Anthropic 自动化简报的六条设计规则：从设定任务、定时触发，到筛选、确认送达和恢复失败，搭起有明确权限与记忆的工作流。"
---
> **原文链接**: [https://claude.dev/blog/building-effective-agent-automations/](https://claude.dev/blog/building-effective-agent-automations/)
> **来源**: Lance Martin 与 CJ Avilla
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/effective-agent-automations/) · 2026/10/9
> **说明**: 本文由 AIHot 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

## 构建高效的 Agent 自动化

参考实现 walkthrough 与常见失败模式

- 作者：Lance Martin 和 CJ Avilla（技术团队成员）
- 发布日期：2026-10-08
- URL: <https://claude.dev/blog/building-effective-agent-automations/>

---

随着 AI 加速我们的工作，跟上节奏变得越来越难。在 Anthropic，简单的 Agent 自动化经常被用来提供帮助。它们通常按计划运行，在后台收集上下文，并主动告诉我们所需的信息。但是，构建高效的 Agent 自动化很困难：它们可能会在无人察觉的情况下失去对某个数据源的访问权限，或者未能遵循我们的偏好设置。

使用 [Claude Managed Agents](https://platform.claude.com/docs/en/managed-agents/overview)（测试版），我们构建了一个参考实现，该实现按计划读取自定义源（例如 Slack 和 GitHub 仓库），跟踪自上次运行以来发生的变化，并发送你需要知道的信息（例如发送到 Slack）。在本文中，我们将逐步介绍每个步骤，分享参考实现，并提供一个可在 Claude Code 中运行的命令，为你配置 Agent。

### 获取代码

参考实现位于 [此处](https://github.com/anthropics/claude-quickstarts/tree/main/managed-agents/daily-brief)。要进行交互式 walkthrough，请在 Claude Code 中运行以下命令。`claude-api` 技能可以根据本文的指导帮助设置 Agent：

```prompt
/claude-api managed-agents-onboard https://claude.dev/blog/building-effective-agent-automations/
```

对于此参考实现，你需要一个 Slack 应用（[从 manifest 创建](https://api.slack.com/apps?new_app=1\&manifest_yaml=display_information%3A%0A%20%20name%3A%20Daily%20brief%0A%20%20description%3A%20Posts%20one%20short%20brief%20each%20weekday%20morning.%0Afeatures%3A%0A%20%20bot_user%3A%0A%20%20%20%20display_name%3A%20Daily%20brief%0A%20%20%20%20always_online%3A%20false%0A%20%20app_home%3A%0A%20%20%20%20home_tab_enabled%3A%20false%0A%20%20%20%20messages_tab_enabled%3A%20true%0A%20%20%20%20messages_tab_read_only_enabled%3A%20true%0Aoauth_config%3A%0A%20%20scopes%3A%0A%20%20%20%20bot%3A%0A%20%20%20%20%20%20-%20channels%3Ahistory%0A%20%20%20%20%20%20-%20chat%3Awrite%0Asettings%3A%0A%20%20org_deploy_enabled%3A%20false%0A%20%20socket_mode_enabled%3A%20false%0A%20%20token_rotation_enabled%3A%20false%0A)) 和一个 [GitHub token](https://github.com/settings/personal-access-tokens/new)。提供的文件（如下所示）是 Claude API 资源的配置，包括 Agent、其环境、记忆存储、保险库和部署。

```text
daily-brief/
├── agent.md                        模型、工具、指令
├── deployment.md                   计划、时区、预算、输入消息
├── environment.yaml                网络白名单
├── memory_store_preferences.yaml   用户偏好
├── memory_store_state.yaml         Agent 的书签、账本、笔记和运行记录
├── vault.yaml                      存放凭据的保险库
├── claude-lock.json                资源 ID，由 ant apply 写入
└── slack/manifest.yaml             一个 Bot 应用
```

[`ant apply`](https://platform.claude.com/docs/en/cli-sdks-libraries/cli/apply) 是 ant CLI 中的一个命令，它读取这些文件，在你的 Claude API 工作区（平台存储和运行它们的地方）创建资源，并将 ID 记录在 `claude-lock.json` 中。

我们将在下面的部分中使用此命令。配置完成后，自动化将在 Anthropic 的基础设施上按计划运行，因此你的机器上无需保持任何进程运行。

### 概述

我们将构建的 Agent 有六个组件，按以下顺序介绍：

- Sources（数据源）- 一个已命名的读取位置列表
- Destination（目标）- Agent 可以写入的一个位置
- Agent - `agent.md` 中的模型、工具和运行步骤
- Schedule - cron 计划
- Memory - 你的偏好和 Agent 自己的记忆
- Guardrails（护栏）- 在 Agent 仅读取的地方提供只读访问，并设置每次运行的支出上限

![Agent 架构：计划唤醒 Agent，它从数据源读取并将简报发布到一个目标供读者阅读。记忆存储 Agent 的状态和读者的偏好，护栏围绕在 Agent 周围。](https://claude.dev/media/fdbe45db5e3ce9afbb00bf62f87e64078a683800bc492d4ac6cf716a2d313a00.png)

### 来源

智能体默认读取两个来源：Slack 频道和 GitHub 拉取请求。这些频道和仓库列在你的 `preferences` 文件中。模板可以扩展以使用其他来源。

![带有高亮显示的 Sources 的架构图。Sources 是只读的，通过 MCP 或 HTTPS（使用来自密钥库的凭据）访问，并馈送给智能体。](https://claude.dev/media/d8508de61bb90f3bfccf6184dd3d7cbe9c65e2e76bd00477efd1620e3910dae7.png)

#### 为智能体提供其自身的、作用域受限的凭据

借助 [Managed Agents](https://platform.claude.com/docs/en/managed-agents/overview)，凭据存储在 [vaults](https://platform.claude.com/docs/en/managed-agents/vaults) 中。智能体可以引用这些凭据，但实际值保留在密钥库中，位于 Claude 代码运行的沙箱之外（参见 [此处](https://www.anthropic.com/engineering/managed-agents) 和 [此处](https://x.com/katelyn_lesse/status/2099315903884415400)）：

- **MCP 服务器（GitHub）。** 智能体通过运行在沙箱外的代理调用 MCP 工具。代理查找与服务器 URL 匹配的密钥库凭据。

- **Shell（Slack）。** 智能体在沙箱内使用 bash 工具通过 curl 调用 Slack API。沙箱中仅保留一个不透明的占位符 `$SLACK_BOT_TOKEN`。当请求离开沙箱时，平台会将真实令牌替换为你允许的主机。

使用 `ant` CLI 和仓库中的模板文件创建密钥库：

```shell
ant apply vault.yaml
```

这会在你的 Claude API 工作区中创建密钥库，平台在此存储它，并将密钥库 ID 记录在 `claude-lock.json` 中。然后，使用 [TypeScript SDK](https://platform.claude.com/docs/en/cli-sdks-libraries/sdks/typescript) 将每个凭据添加到密钥库中。以下是添加 Slack 凭据的示例：

```typescript
const vaultId = process.env.VAULT_ID!; // 密钥库的 ID，来自 claude-lock.json

await client.beta.vaults.credentials.create(vaultId, {
  display_name: "SLACK_BOT_TOKEN",
  auth: {
    type: "environment_variable",
    secret_name: "SLACK_BOT_TOKEN",
    secret_value: process.env.SLACK_BOT_TOKEN!,
    networking: { type: "limited", allowed_hosts: ["slack.com"] },
    injection_location: { header: true },
  },
});
```

创建密钥库并添加每个凭据后，将密钥库附加到部署中。将 `claude-lock.json` 中的密钥库 ID 复制到部署文件 `deployment.md` 中的 `vault_ids` 中。

#### 从上次中断处继续读取

一个常见的错误是要求智能体读取一个固定窗口，例如“*过去 24 小时*”。运行较晚会留下空白，运行较早则会重复项目。相反，应为每个来源提供一个书签。在每次运行结束时，智能体会将每个来源中最新读取项的时间戳写入一个文件 `bookmarks.json`，每个来源一个条目：`"slack": "2026-09-14T13:02:11Z"`。

下一次运行将从这些书签开始，因此其窗口会扩展或收缩以覆盖自上次运行以来的所有内容。书签位于称为 `state` 的 [memory store](https://platform.claude.com/docs/en/managed-agents/memory) 中：这是一个文本文件文件夹，平台将其挂载到每次运行的沙箱下的 `/mnt/memory/` 中，并在运行之间保持持久化。智能体使用其常规文件工具读取和写入它，`agent.md` 中的指令告诉它如何操作。

#### 不要将读取失败误认为是平静的一天

如果 MCP 服务器宕机或其令牌已过期，运行仍然会启动，只是没有该服务器的工具。会话日志会记录错误，但智能体不会看到来自该来源的任何内容，并报告“没有新内容”。

`agent.md` 中的三条规则有助于解决此问题。当来源失败时，智能体将：保持该来源的书签不变，编写来自其他来源的简报，并在简报末尾用一行命名它无法读取的内容（“本次运行中拉取请求不可用”），以便读者知晓。

### 目标

我们的模板每次运行时都会发布到一个 Slack 频道，并附带日期标记的帖子。

![带有高亮显示的 Destination 的架构图。在检查今天的简报尚未发布后，智能体发布到一个目标，该目标将简报传递给读者。](https://claude.dev/media/15481dc4dff01b4a613e8ff36039bc14036ab97781eddeaf749746533b97bd16.png)

Agent 使用沙箱中的 bash 工具，通过读取到的相同 bot token 向 Slack 发布消息。

发布操作无需人工审批。Agent 通过 bash 命令发送消息，内置的 bash 工具默认在无需请求批准的情况下运行。`slack.com` 也在 Agent 的 [环境](https://platform.claude.com/docs/en/managed-agents/environments)（即其运行的沙箱）的白名单中。发布操作是一次请求：

```bash
curl -s https://slack.com/api/chat.postMessage \
  -H "Authorization: Bearer $SLACK_BOT_TOKEN" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{"channel": "C0123456789", "text": "Daily brief, Tue Sep 15 ..."}'
```

#### 在记录之前确认发布成功

一旦确认发布成功，Agent 会更新其报告项账本和书签。如果这些记录与实际发布的内容不匹配，会出现两种问题。如果 Agent 记录了一个从未成功发布的消息，书签会跳过这些项，导致它们永远不会被报告。如果因为不确定第一次发布是否成功而再次发布，读者会收到重复的简报。

`agent.md` 中的三条规则可防止这种情况发生。首先，Agent 会在频道的最近消息中查找当天的标题，如果该期简报已存在，则不再发布。其次，只有当 Slack 返回 `"ok": true` 和消息时间戳（ts）时，发布才算成功。第三，Agent 仅在收到确认后才更新账本和书签。如果结果不明确，它会将运行标记为“可能已发布”，且不进行其他任何更改，从而确保不会丢失任何信息。

Agent 在内存存储中保留运行记录（`runs/<date>.md`）。它在发布前将运行标记为“发布中”，然后在发布成功后标记为“已发布”并附带消息 ID，或者标记为“可能已发布”。

### Agent

在 Claude Managed Agents 中，[agent](https://platform.claude.com/docs/en/managed-agents/agent-setup) 是一个版本化的配置：包括模型、系统提示词和工具。每次运行都遵循其运行步骤并终止。

![架构图中高亮显示的 Agent：一个模型加上一个包含运行循环和判断规则的提示词。](https://claude.dev/media/8b00d803c6eee8a1c6419c15961f688cba2f6fbff5031e1bd0539725cba1780b.png)

在我们的参考实现中，Agent 配置为 `agent.md`：

```markdown
---
name: Daily brief
model: claude-sonnet-5-5
mcp_servers:
  - type: url
    name: github
    url: https://api.githubcopilot.com/mcp/
tools:
  - type: agent_toolset_20260401
    configs:
      - name: web_search
        enabled: false
      - name: web_fetch
        enabled: false
  - type: mcp_toolset
    mcp_server_name: github
    default_config:
      permission_policy:
        type: always_allow
---

[八个编号的运行步骤；完整文本见仓库中的 agent.md。]
```

Frontmatter 提供了 Agent 名称、模型、工具和 MCP 服务器。正文提供了 Agent 指令。MCP 工具默认需要批准，但此处无人批准，因此 GitHub 工具集设置为 `always_allow`，且 GitHub token 为 `read-only`。

#### 保持简报简短

`agent.md` 引导 Claude 保持简洁：

```text
4. 决定。如果读者今天会采取行动，或者它会改变他们即将做出的决定，则该条目值得占一行。如果不确定，则省略。大多数情况下只有几条，有时甚至没有。数量（如“12 个未决审查”）不是条目；链接那些被阻塞的条目。账本中已存在且仍开放的条目作为标记行保留（如“仍在等待，第 3 天”），不重新报告；已关闭的条目直接删除，不作说明。不要重新引入偏好文件已废弃的主题。
```

#### 在发布前重新检查所有仍开放的项

在 Agent 读取源数据和发布之间，项的状态可能会发生变化。在发布前，`agent.md` 指示 Agent 重新检查每个项的实时状态：

```text
5. 验证。在你阅读期间，世界发生了变化。对于你将要报告的每个条目，在发布前重新检查其源数据：如果自你阅读以来已解决，则删除；如果仍开放但已变更，则修正该行；如果无法确认，则删除并在运行记录的“已截断”部分列出。一条过时的“仍在等待你”比十条缺失的条目更损害信任，因此永远不要对条目的状态含糊其辞：要么断言它，要么删除它。每个链接都直接复制自源数据的链接字段（如 pull request 的 html_url、Slack 的 permalink），绝不手动组装。
```

### 调度

借助 Claude Managed Agents，Agent 仅是一个配置文件；[部署](https://platform.claude.com/docs/en/managed-agents/scheduled-deployments)负责运行它。部署名称指定了 Agent、环境以及每次运行的第一条消息。它还包含调度、vault、memory stores 和预算。每次调度触发时，平台都会启动一个新的 Agent [会话](https://platform.claude.com/docs/en/managed-agents/sessions)。

![架构图中突出显示了 Schedule：一个在每次运行时唤醒 Agent 的计划部署。](https://claude.dev/media/a206f78f34b18dcf7a51bc9bca1acaaf3b68df80ee4034ff521cfbf353af7bc5.png)

在我们的模板中，部署信息保存在 `deployment.md` 中，第一条消息作为其正文：

```markdown
---
name: Daily brief
agent: ./agent.md
environment_id: ./environment.yaml
schedule:
  type: cron
  expression: "32 7 * * 1-5"
  timezone: America/New_York
vault_ids: [vlt_...]   # the vault you create under Sources
resources:
  - path: ./memory_store_preferences.yaml
    access: read_only
    instructions: The reader's preferences. Re-read them every run. Never write here.
  - path: ./memory_store_state.yaml
    access: read_write
    instructions: Your state. Bookmarks, ledger, notes, proposals, and run records.

---

Write today's brief.
The reader's time zone is America/New_York. Work out every date in that zone.

Follow your run steps in order. Today's edition is titled "Daily brief, <weekday> <month> <day>".
```

这将创建包含 Agent、环境以及通过路径命名的 memory stores 的部署。

```shell
ant apply deployment.md
```

要测试它而无需等待调度，可以使用 `ant beta:deployments run --deployment-id <id>` 手动启动一次运行，使用来自 `claude-lock.json` 的 ID。

#### 在你的时区计算日期

一个常见的错误是 Agent 将“今天早上”称为“昨天”，因为它在服务器的时区中计算日期。在 `deployment.md` 中，`timezone` 字段设置运行触发的时间，正文的第二行告诉 Agent 使用哪个时区来计算日期。

### 记忆

每次运行都在一个新的沙盒中开始，没有上次运行的记忆。没有记忆，反馈就无法保留。然而，过时的记忆可能会混淆 Agent：它在项目已解决后仍报告该项目仍在等待中，或者因为该项目“已被报告”而丢弃了仍处于开放状态的项目。

![架构图中突出显示了 Memory。State 是 Agent 读写的内容，而 Preferences 是读者写入且 Agent 仅读取的内容。](https://claude.dev/media/30e51eab0381bb583fe355fe412162b4e8868643b8d58b2c76c4aa2d0eafea57.png)

我们的模板保留了两个 [memory stores](https://platform.claude.com/docs/en/managed-agents/memory)，即挂载在 /mnt/memory/ 下的文件夹（参见 Sources）：

- **preferences**（你的，对 Agent 只读）：要读取的频道和仓库、要排除的内容、长度上限、目标以及何时停止。

- **state**（Agent 的，读写）：书签、已报告项目的账本、每次运行的记录、对偏好设置的更改建议，以及关于每个源行为方式的笔记（“仅返回最新的 50 个项目”）。

`ant apply deployment.md` 创建偏好设置 store，但不创建其中的文件。在第一次运行之前，使用仓库的 `scripts/seed-preferences.sh` 在其中写入你的 preferences.md。

#### 在每次运行开始时重新读取你的偏好设置

一个常见的问题是偏好设置的副本被烘焙到提示词中，这会导致应用你已经更改过的规则。让 Agent 每次运行都重新读取文件。如果它无法读取文件，它应该停止并说明情况，而不是使用默认值继续运行。

#### 保留已报告项目的账本，并报告变更

Agent 维护一个账本 `ledger.md`，记录它报告的每一个项目，以便简报不会重复。每一行记录项目被报告的时间、来源、不改变的 ID（Slack 消息时间戳或拉取请求编号）以及其最后已知状态：

```text
2026-09-09 slack:C0123456789 1788963600.000100 refund thread: customer waiting on a decision
2026-09-11 github 481 review blocked, day 2 (still waiting)
2026-09-11 slack:C0234567891 1789117333.000300 enterprise escalation: owner named, in progress
```

### 护栏 (Guardrails)

由于我们的自动化是在后台按计划运行的，因此我们为 Agent 可以执行的操作以及可以花费的金额设置了限制。

![包含 Guardrails 的架构图：围绕 Agent 的边界，限制了轮次、时间和花费，并有一个心跳信号供人工监控。](https://claude.dev/media/746533f20f4e2bf093d08a04f368a8c5eca739de6579c384e9742b86d5385f50.png)

#### 限制其可执行的操作

Agent 会阅读其他人撰写的消息和 Issue，这些文本可能被解读为指令。如果 Agent 遵循这些指令，请限制其可执行的操作。在我们的示例中，GitHub token 和 `preferences` 存储是只读的，且环境仅能访问白名单中的主机。植入的指令仍可能更改 brief 的内容，包括通过 Agent 在运行之间保留的笔记。它无法写入 GitHub 或编辑你的规则。

Slack 是例外情况：相同的 token 用于发布消息，因此仅将 bot 邀请到它需要读取或发布消息的地方。

#### 从实际运行中设置花费上限

花费上限可防止成本失控。从正常运行成本的三到五倍开始，然后根据实际数据进行调整。达到上限的运行会暂停而不是失败，因此设置过低的上限看起来就像 brief 没有响应。该上限是 `deployment.md` 中的 [`budget`](https://platform.claude.com/docs/en/managed-agents/budgets)。每次运行都会获得全额预算，当达到该上限时，运行会暂停并返回 `budget_reached` 停止原因：

```yaml
budget:
  type: limit
  max_list_cost:
    amount: "500" # 字符串，单位为分："500" 表示 $5.00
    currency: USD
```

### 入门指南

我们的参考实现归结为六条规则：

- 从书签读取每个来源，而不是固定的时间窗口。
- 将读取失败报告为不可读，而不是静默的一天。
- 在发布前重新检查每一项。
- 仅当 Slack 确认发送后才将发布计为已发送，然后更新书签和分类账。
- 每次运行都重新读取你的偏好设置，从 Agent 无法编辑的存储中读取。
- 在 Agent 仅进行读取操作的地方提供只读访问权限，并限制每次运行可以花费的金额。

Claude Code 可以引导你完成本文提供的指南。首先，更新：

```shell
claude update
```

然后，使用 claude-api skill：

```prompt
/claude-api managed-agents-onboard https://claude.dev/blog/building-effective-agent-automations/
```

claude-api skill 会阅读此文章，提议设置方案，将文件写入项目中的 `agents/` 文件夹，并使用 `ant apply` 创建资源。将其作为起点，并根据你的来源、目标或记忆偏好定制 Agent。
