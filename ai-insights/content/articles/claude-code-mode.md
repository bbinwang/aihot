---
title: "Anthropic 推出 Claude Code 实验功能 Code Mode：写一段代码串起多次工具调用，能并行跑命令、只读需要的结果"
date: 2026-11-18T00:00:00.000Z
tags: ["产品发布", "Claude Code", "Anthropic", "Agent", "工具调用", "MCP"]
summary: "以前改一个参数，Claude 要搜一次、看一次、改一次、再看一次；现在它把这几步写进一段代码一口气跑完，只读最后需要的那部分。"
---
> **原文链接**: [https://code.claude.com/docs/en/code-mode](https://code.claude.com/docs/en/code-mode)
> **来源**: code.claude.com
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/claude-code-mode/) · 2026/11/18
> **说明**: 本文由 AIHot汪 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

> ## 文档索引
> 在以下地址获取完整的文档索引：https://code.claude.com/docs/llms.txt
> 使用此文件在进一步探索之前发现所有可用页面。

## 使用 Code Mode 从代码中运行工具调用

> 尝试 Code Mode，这是一个实验性功能，Claude 在其中编写 JavaScript，在一步中完成多个工具调用。

Code Mode 改变了 Claude 使用 [工具](https://code.claude.com/docs/en/tools-reference.md) 的方式。没有 Code Mode 时，Claude 直接请求 Bash、Read 或 Edit 等工具调用，并在决定下一步操作之前读取每个结果。使用 Code Mode 时，Claude 编写一段进行工具调用的 JavaScript 代码，Claude Code 会在你的会话中运行该代码。

> [!NOTE]
>
> Code Mode 是实验性功能，默认处于关闭状态。它可能会在任何版本中发生变化或被移除。要分享反馈，请运行 `/feedback`。

### Code Mode 的工作原理

在 Code Mode 会话中，你仍然在提示中描述任务，Claude 编写 JavaScript 来执行该任务。一段代码可以并行运行命令，在下一个调用中使用前一个结果，并返回 Claude 需要读取的输出部分。

例如，如果你要求 Claude 提高重试限制，Claude 可能会编写以下代码来查找文件、编辑它并运行测试。最后一行将文件路径和测试结果返回给 Claude：

```javascript theme={null}
const files = await $`rg -l "function retryPolicy" src`.text();
const target = files.trim().split("\n")[0];
await edit(target, "maxAttempts: 3", "maxAttempts: 5");
({ edited: target, tests: $`npm test -- retryPolicy`.nothrow() });
```

在对话中，你会看到工具调用（例如 edit 的 diff），而不是代码。要查看代码，请按 `Ctrl+O` 打开 [转录查看器](https://code.claude.com/docs/en/interactive-mode.md#transcript-viewer)。每段代码在那里显示为一个折叠的 **Code** 行，并带有如何展开它的提示。

#### 何时使用 Code Mode

在需要许多相关工具调用的任务上尝试 Code Mode，例如：

* 在多个文件中重复进行的更改
* 需要过滤结果后 Claude 才能读取的搜索
* 可以同时运行的多个独立命令

#### Code Mode 的限制

在开启 Code Mode 之前，请确认你可以接受以下限制：

* **恢复**：你只能在终端中恢复 Code Mode 会话，且 Code Mode 处于开启状态
* **自动模式**：自动模式的分类器 [审查代码，而不是每个工具调用](#permission-checks)
* **长时间运行的代码**：除非 [代码可以在后台运行](#long-running-code)，否则你需要等待它完成，且它在十分钟后停止
* **Hooks**：当 `PreToolUse` hook 无法运行或超时时，你可以看到 [工具调用被拒绝](#tool-call-refused-by-a-hook)，且 `UserPromptSubmit` hook 会 [阻止代码输出](#code-output-withheld-by-a-hook)
* **不可用的功能**：你无法使用 [远程控制](https://code.claude.com/docs/en/remote-control.md)、[Chrome 中的 Claude](https://code.claude.com/docs/en/chrome.md) 或 [计算机使用](https://code.claude.com/docs/en/computer-use.md)
* **移动会话**：你无法将会话移动到桌面应用或将其转换为 [后台会话](https://code.claude.com/docs/en/agent-view.md)，且 `/fork` 无法启动后台副本

### 要求

* **版本**：Claude Code v2.1.323 或更高版本，适用于任一 [发布渠道](https://code.claude.com/docs/en/setup.md#configure-release-channel)。旧版本在没有 Code Mode 的情况下启动，原因可能是 `it isn't open to your account yet`
* **账户**：Claude 订阅或 Console 账户。你无法通过网关、Amazon Bedrock、AWS 上的 Claude Platform、Google Cloud 的 Agent Platform、Microsoft Foundry 或 [Google Cloud 上的 Claude Models (Anthropic managed)](https://code.claude.com/docs/en/claude-models-on-google-cloud-anthropic-managed.md) 使用 Code Mode
* **组织**：你的组织未使用 [HIPAA 配置](https://code.claude.com/docs/en/hipaa-setup.md) 或 [零数据保留](https://code.claude.com/docs/en/zero-data-retention.md)
* **模型**：Claude Opus 5.5、Sonnet 5.5、Haiku 5.5 或 Fable 5.2
* **界面**：终端中的交互式 `claude` 会话。Code Mode 不适用于 `-p`、Agent SDK、VS Code 面板、桌面应用或云会话
* **Agent 团队**：要在 [agent teams](https://code.claude.com/docs/en/agent-teams.md) 上启用 Code Mode，你需要 v2.1.326 或更高版本。队友在默认的 [进程内显示模式](https://code.claude.com/docs/en/agent-teams.md#choose-a-display-mode) 中以 Code Mode 运行，并在拆分窗格中启动时不使用它
* **安装**：Claude Code 的 [原生构建](https://code.claude.com/docs/en/setup.md)
* **Windows**：已安装 [Git for Windows](https://git-scm.com/downloads/win)

如果启用了某些设置（例如 API 密钥助手、OpenTelemetry 导出或 `DISABLE_TELEMETRY`），你也无法启动 Code Mode。有关每种情况的修复方法，请参阅 [Code Mode doesn't start](#code-mode-doesnt-start)。

### 尝试 Code Mode

开启 Code Mode，给 Claude 一个任务，然后查看 Claude 编写的代码。

**1. 检查你的版本**

运行 `claude --version`。如果版本早于 v2.1.323，请运行 `claude update`。如果你处于 `stable` 频道且更新未达到 v2.1.323，请等待 `stable` 频道跟进或 [切换到 `latest`](https://code.claude.com/docs/en/setup#configure-release-channel)。

**2. 以开启 Code Mode 的方式启动 Claude Code**

将 [`CLAUDE_CODE_EXPERIMENTAL_CODE_MODE`](https://code.claude.com/docs/en/env-vars#variables) 环境变量设置为 `1`。若要尝试 Code Mode，请在你的 shell 中设置它。若要为每个新会话开启 Code Mode，请在你的用户设置中设置它。

> [tab] macOS, Linux, WSL
>
> ```bash theme={null}
> CLAUDE_CODE_EXPERIMENTAL_CODE_MODE=1 claude
> ```

> [tab] Windows PowerShell
>
> ```powershell theme={null}
> $env:CLAUDE_CODE_EXPERIMENTAL_CODE_MODE = "1"
> claude
> ```

> [tab] settings.json
>
> 将此 `env` 块保存到 `~/.claude/settings.json` 并启动 `claude`：
>
> ```json theme={null}
> {
>   "env": {
>     "CLAUDE_CODE_EXPERIMENTAL_CODE_MODE": "1"
>   }
> }
> ```
>
> Claude Code [会在项目的设置文件中忽略此变量](https://code.claude.com/docs/en/settings-reference.md#variables-claude-code-ignores-in-env)，因此你克隆的仓库无法为你开启 Code Mode。

**3. 确认你要使用 Code Mode**

Claude Code 会在你的第一次 Code Mode 会话前要求你确认。选择 **Yes, turn on Code Mode**。Claude Code 会重启，并在会话顶部附近显示此行：

```text theme={null}
Code Mode (experimental) is on · this session can be resumed only with Code Mode on
```

如果你看到不同的行或没有行，请参阅 [Code Mode doesn't start](#code-mode-doesnt-start)。

**4. 给 Claude 一个包含多次工具调用的任务**

在你熟悉的项目中，发送如下提示：

```text theme={null}
Read every Markdown file in this project and list the links that point to local files that don't exist.
```

**5. 阅读 Claude 编写的代码**

按 `Ctrl+O` 并展开 **Code** 行，以查看工具调用背后的 JavaScript 代码。再次按 `Ctrl+O` 返回对话。

> [!WARNING]
>
> 若要稍后恢复 Code Mode 会话，请在运行 `claude --continue` 或 `claude --resume` 时保持 `CLAUDE_CODE_EXPERIMENTAL_CODE_MODE` 设置为 `1`。如果 Code Mode 关闭，Claude Code 将拒绝恢复会话。即使设置了该变量，你未以 Code Mode 启动的会话也会以非 Code Mode 方式恢复。

#### 关闭 Code Mode

从你的 shell 和 `~/.claude/settings.json` 中移除 `CLAUDE_CODE_EXPERIMENTAL_CODE_MODE`，然后启动新会话。你也可以保留该变量，并在任一位置将其值更改为 `0`。如果在某一位置设置为 `0`，即使另一位置设置为 `1`，Code Mode 也会保持关闭。

#### 为组织阻止 Code Mode

将 `CLAUDE_CODE_EXPERIMENTAL_CODE_MODE` 及其值 `0` 添加到你的 [托管设置](https://code.claude.com/docs/en/managed-settings.md) 中，以便组织中的任何人都无法使用 Code Mode：

```json theme={null}
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_CODE_MODE": "0"
  }
}
```

处于 Code Mode 会话中的用户会一直留在该会话中，直到他们退出或重启 Claude Code。此后，你的用户将以非 Code Mode 方式启动，并且在 `0` 存在期间无法恢复他们的 Code Mode 会话。你无法通过托管设置为用户开启 Code Mode。

### 权限和长时间运行的代码

你的权限模式决定了如何检查 Claude 编写的代码，以及代码运行时你是否能与 Claude 交流。

#### 权限检查

当 Claude 运行代码时，其中的每个工具调用都会通过你的 `deny` 和 `ask` [权限规则](https://code.claude.com/docs/en/permissions.md) 以及工具常规名称（如 `Bash`）下的 [`PreToolUse` 钩子](https://code.claude.com/docs/en/hooks#pretooluse)。除了规则和钩子外，分类器会在自动模式下审查代码，而在需要询问的模式中，你会回答提示：

* **[Auto mode](https://code.claude.com/docs/en/permission-modes.md#eliminate-prompts-with-auto-mode)**：分类器会在代码运行前审查每一段代码，而不是审查每一次工具调用。它无法看到运行时计算的值（例如从搜索结果中获取的路径），因此对于必须控制的调用，请保留规则或钩子。当新代码在早期代码运行时启动时，你仍然会被 [提示](#permission-prompt-with-a-countdown)。
* **其他 [permission modes](https://code.claude.com/docs/en/permission-modes.md)**：代码在未经审查的情况下启动，并且你会针对在该模式下会触发提示的每次工具调用收到提示。

如果你有一个允许或阻止 shell 命令的 `PreToolUse` 钩子，请让它检查命令的每个部分，就像 [Bash rules do](https://code.claude.com/docs/en/permissions.md#compound-commands) 那样。在 Code Mode 中，在名为 `app` 的文件夹中执行 `git push` 可能会以 `cd 'app' && git push` 的形式传递给你的钩子。

要检查代码本身，请编写一个匹配 `REPL`（运行代码的工具）的 `PreToolUse` 钩子，并从 `tool_input.code` 中读取 JavaScript 代码。

> [!WARNING]
>
> Bash rules 匹配命令文本，因此 Claude 可以以规则不匹配的形式运行被拒绝的命令 [in a form the rule doesn't match](https://code.claude.com/docs/en/permissions.md#bash-rule-limits)，无论是否启用 Code Mode。对于不依赖于命令文本的限制，请参阅 [sandboxing](https://code.claude.com/docs/en/sandboxing.md)。

#### Long-running code

当代码运行长时间的构建或测试时，Claude 要么等待其完成，要么让其继续在后台运行：

* **Waiting**：Claude 在代码完成后回答，代码在十分钟后停止（包括你在 permission prompts 上花费的时间）
* **Background**：你可以继续与 Claude 对话，代码最多可以运行两小时

对于后台代码，请在 auto 或 `bypassPermissions` 模式下启动会话。如果 Claude 仍在等待，请检查你的当前模式以及你启动会话的方式：

* **你切换到了其他模式**：按 `Shift+Tab` 直到回到你最初启动的模式
* **你在其他模式下启动，或从 `claude --resume` 列表中选择了会话**：如果 [auto mode is available](https://code.claude.com/docs/en/permission-modes.md#eliminate-prompts-with-auto-mode) 给你，请退出，然后在启用 Code Mode 的情况下运行 `claude --continue --permission-mode auto`
* **你向 `--tools` 传递了工具名称**：在不使用该标志的情况下以 auto 模式重新启动

### Troubleshooting

#### Code Mode doesn't start

会话顶部附近的 `Code Mode (experimental) isn't available` 表示 Claude Code 是在没有 Code Mode 的情况下启动的。原因在同一行中显示，`/status` 也会显示它。在下面的表中找到原因，进行更改，然后启动新会话。对于未列出的原因，请检查 [requirements](#requirements)。

| Reason includes | What to do |
| :- | :- |
| `it isn't open to your account in this version` 或 `it isn't open to your account yet` | 如果你的版本早于 v2.1.323，请 [update](#try-code-mode)。否则，检查网络连接并重新启动。如果原因仍然存在，请改天再试 |
| `it only works directly with the Anthropic API` 或 `it only works with the Anthropic API` | 删除通过云提供商、网关或自定义 `ANTHROPIC_BASE_URL` 路由请求的设置 |
| `it doesn't work with an API key helper` | 删除 `apiKeyHelper`、`ANTHROPIC_AUTH_TOKEN` 以及 `ANTHROPIC_CUSTOM_HEADERS` 中的任何 `Authorization` 或 `X-Api-Key` 头。然后登录或设置 `ANTHROPIC_API_KEY` |
| `it only works with Opus 5.5, Sonnet 5.5 and later models` | 使用 [supported model](#requirements) 启动，例如使用 `--model opus`。Haiku 5.5 和 Fable 5.2 也可以工作 |
| `it doesn't work in background jobs` | 在前台启动，不使用 `--remote-control`。如果原因在队友的分屏中显示，请使用 [in-process display mode](https://code.claude.com/docs/en/agent-teams.md#choose-a-display-mode) 在 Code Mode 中运行队友 |
| `it needs settings that Claude Code downloads from Anthropic` | 取消设置 [turns off feature-flag fetching](https://code.claude.com/docs/en/env-vars.md#features-that-need-feature-flag-fetching) 的变量，例如 `DISABLE_TELEMETRY` |
| `OpenTelemetry is on` | 如果可以不用 [OpenTelemetry export](https://code.claude.com/docs/en/monitoring-usage.md) 工作，请取消设置 `CLAUDE_CODE_ENABLE_TELEMETRY` 和 `ENABLE_BETA_TRACING_DETAILED` |
| `it doesn't yet work with the plugin` | 在会话中运行 `/plugin` 并禁用原因中提到的每个插件。如果你的组织启用了其中一个，请要求管理员将其关闭 |
| `it doesn't yet work with an installed mod` | 关闭检查工具调用的 [mod](https://code.claude.com/docs/en/plugins/mods/overview.md) |
| `it can't be used together with agent teams yet` | 要保持 agent teams 开启，请将 Claude Code [update](https://code.claude.com/docs/en/setup.md#update-claude-code) 到 v2.1.326 或更高版本。如果要保留当前版本，请取消设置 `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` |
| `this launch's tool options` | 不使用 `--restricted` 启动，将 `REPL` 添加到 `--tools`，并从 `--disallowedTools` 和你的 `deny` 规则中移除 `REPL` |
| `couldn't save your answer` | 使 `~/.claude.json` 可写 |
| `your organization's settings don't allow it` | 向管理员询问关于 [managed setting](#block-code-mode-for-your-organization) 的信息 |

如果未看到关于 Code Mode 的行，请运行 `claude --version`。如果你的版本低于 v2.1.323，请进行更新。然后检查你的 shell 或用户设置中 `CLAUDE_CODE_EXPERIMENTAL_CODE_MODE` 是否为 `1`，并从这些设置以及任何 `--settings` 文件中移除任何 `0`。

#### 带有倒计时的权限提示

当 Claude 在早期代码仍在运行时启动更多自动模式代码时，早期代码将失去其分类器审查。Claude Code 随后会询问你关于早期代码剩余需要审查的调用。在没有连接 IDE 的情况下，提示将显示倒计时：

```text theme={null}
Claude Code 将在 1:59 后自动阻止此请求，以避免挂起无人值守的会话
```

请在倒计时结束前作出回答。否则该调用将被拒绝，且后续会出现倒计时但无提示的调用也会被拒绝。若要再次看到提示，请向 Claude 发送一条消息。

#### 被钩子拒绝的工具调用

如果 Claude 报告被拒绝的工具调用，请让它提供错误文本。这些错误意味着 `PreToolUse` 钩子未作出决定，即使 [`onFailure`](https://code.claude.com/docs/en/hooks#block-the-action-when-a-hook-fails) 未设置，也会拒绝该调用：

* **`the hook failed`**：来自代码的调用中，你的钩子无法启动、被终止、以 126、127 或高于 128 的代码退出，或返回了 HTTP 错误或无效输出。请修复钩子
* **`the hook did not finish`**：你的钩子在来自代码的调用中超时，或在 Claude 已在会话中运行代码后的任何其他工具调用中超时。提高钩子的 [`timeout`](https://code.claude.com/docs/en/hooks#common-fields)

若要在 `command` 或 `http` 钩子失败或超时时让调用继续，请为其设置 `"onFailure": "continue"`。如果 `command` 钩子以普通代码（如 1）退出，除非你设置了 `"onFailure": "block"`，否则调用将继续。

#### 被钩子扣留的代码输出

如果 Claude 报告了你期望从代码中获得输出的钩子阻止原因，请检查你的 [`UserPromptSubmit`](https://code.claude.com/docs/en/hooks#userpromptsubmit) 钩子。当 [代码可以在后台运行](#long-running-code) 时，该事件上的 `command`、`http` 和 `mcp_tool` 钩子也会在代码输出时运行。若要允许输出通过，请更改钩子，使其在输入的 `source` 为 `poll_event` 时不进行阻止。

### 相关资源

* [权限模式](https://code.claude.com/docs/en/permission-modes.md)：将自动模式与需要提示的模式进行比较
* [钩子参考](https://code.claude.com/docs/en/hooks.md)：编写 `PreToolUse` 和 `UserPromptSubmit` 钩子
* [托管设置](https://code.claude.com/docs/en/managed-settings.md)：在整个组织中应用一项配置
