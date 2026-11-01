---
title: "让 Claude Code、Codex 接上已登录的 Chrome：六种方案怎么选"
date: 2026-10-26T00:00:00.000Z
tags: ["AI 实操", "Agent", "浏览器", "Chrome", "开发工具", "聚合"]
summary: "复用浏览器里的登录状态，让编程 Agent 读网页、填表、检查真实页面；扩展与远程调试的接法、操作范围和使用条件各不相同。"
---
> **原文链接**: [https://browser-use.com/posts/coding-agent-logged-in-chrome](https://browser-use.com/posts/coding-agent-logged-in-chrome)
> **来源**: browser-use.com
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/coding-agent-logged-in-chrome/) · 2026/10/26
> **说明**: 本文由 AIHot 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

BROWSER USE

- Browser Use Agents：给 Browser Use 一个任务，即可获得完成好的工作。新集成请使用当前的 API V4。
- Browser Infrastructure：通过 SDK、REST 或 CDP 将你的 Agent 或自动化连接到托管浏览器。价格低至 $0.02/浏览器·小时。
- Developer tools：Open Source、Browser Harness、SDK 与 MCP 为上述两款产品提供支持。

[开发者索引](https://browser-use.com/index.md)
[产品地图](https://browser-use.com/llms.txt)
[完整产品上下文](https://browser-use.com/llms-full.txt)
[定价](https://browser-use.com/pricing.md)
[云端文档](https://docs.browser-use.com/cloud/quickstart)
[Open Source 文档](https://docs.browser-use.com/open-source/introduction)

---

## 如何让你的编程 Agent 使用你已登录的 Chrome (2026)

**作者：** Gregor Zunic
**日期：** 2026-10-25
> 把你已登录的 Chrome 交给 Claude Code、Codex、Gemini CLI 或 Cursor 使用：对比 Claude in Chrome、Playwright MCP、Chrome DevTools MCP 与 Browser Harness。

---

要让编程 Agent 在你真实的、已登录的 Chrome 中工作，可以安装一个将标签页交给它的浏览器扩展，或者开启 Chrome 的远程调试开关，让工具能够附加到你已经打开的 Chrome 上。对于搭配付费 Claude 计划的 Claude Code，**Claude in Chrome**（`claude --chrome`）是最快捷的路径；下面的列表为其他所有 Agent 和登录情形给出了推荐选择。

我们开发 Browser Use 和 Browser Harness。其他工具的所有信息均来自它们各自的文档和 README，核对日期为 2026 年 10 月 25 日，并在引用之处附上链接。

### 哪一款适合你的 Agent

- **Claude Code：**如果你使用 Pro、Max、Team 或 Enterprise 计划登录，选择 Claude in Chrome。若使用 API key、Bedrock 或其他 provider，该功能保持关闭，请改用 Browser Harness、Playwright MCP 的 extension 模式或 Chrome DevTools MCP。
- **Codex：**在 ChatGPT 桌面应用中使用 OpenAI 的浏览器扩展；在 Codex CLI 中使用 Browser Harness 或两个 MCP server 之一。
- **Gemini CLI：**使用其内置浏览器 Agent 并将 `sessionMode` 设为 `"existing"`，或任选一种 MCP 方案。
- **Cursor：**其内置 Browser 在每个 workspace 中保存自己的 cookies，而不是你的 Chrome 登录状态。要接入你的 Chrome，请在 `.cursor/mcp.json` 中添加 Browser Harness、Playwright MCP 或 Chrome DevTools MCP。
- **任意 MCP client：**extension 模式下的 **Playwright MCP** 让 Agent 只能使用你选定的标签页；自动连接模式下的 **Chrome DevTools MCP** 或我们的 **Browser Harness** 则把整个运行中的 Chrome 交给它。

### 为什么不把 cookies 复制到一个全新的浏览器里？

因为全新的自动化浏览器相当于另一台设备。你可以导出 cookies 再加载它们，例如使用 Playwright MCP 的 `--storage-state`，它会把文件中的 cookies 和 local storage 加载到隔离的浏览器 context 中（[README](https://github.com/microsoft/playwright-mcp#user-profile)）。这在某些网站上有效，但在将会话绑定到你的设备或要求你重新登录的网站上可能失效：

- **会话绑定到设备。**通过 [Device Bound Session Credentials](https://developer.chrome.com/docs/web-platform/device-bound-session-credentials)，Chrome 会把私钥保存在 TPM 等安全硬件中；当网站的短期 session cookies 过期时，Chrome 只有在证明持有该私钥后才会刷新它们。在启用该机制的网站上，复制的 cookies 会过期，且无法在另一台机器上续期。
- **需要重新登录。**全新的 profile 初始处于全部登出的状态，你得在其中重新完成每一次登录和二次验证。Chrome DevTools MCP 文档指出，当浏览器通过 WebDriver 受控时，某些账号可能会阻止登录（[Chrome DevTools MCP 文档](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/docs/advanced-usage.md#connecting-to-a-running-chrome-instance)）。
- **旧的捷径已被封死。**从 Chrome 136 开始，`--remote-debugging-port` 和 `--remote-debugging-pipe` 在默认的 Chrome 数据目录上会被忽略；它们需要 `--user-data-dir` 指向其他位置。Google 做出这一更改，是因为攻击者曾利用远程调试从 Chrome 中窃取 cookies（[Chrome 博客，2025 年 3 月 17 日](https://developer.chrome.com/blog/remote-debugging-port)）。

下面的每种方案都是在你的真实浏览器中运行,因此你的登录状态、设备验证和二次验证都保持原位不变。

### 1. Claude in Chrome

Anthropic 的 Chrome 扩展,Claude Code 可以从 CLI 或 VS Code 扩展连接到它([文档](https://code.claude.com/docs/en/chrome))。

- **适用范围:** 仅限 Claude Code。
- **安装设置:** 安装 [Claude in Chrome 扩展](https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn)(版本 1.0.36 或更高),使用 `/login` 登录 Claude Code,然后运行 `claude --chrome`。运行 `/chrome` 可检查连接状态或将其设为默认开启。
- **用的是你的 Chrome 吗?** 是的。Claude 会在一个标签组中打开新标签页,共享你浏览器的登录状态,并在可见窗口中工作。文档列出了 Google Chrome 和 Microsoft Edge,并表示 Claude Code 也会自动配置 Brave、Arc、Vivaldi 和 Opera。
- **限制:** 需要直接的 Anthropic 订阅(Pro、Max、Team 或 Enterprise)。使用 API key 或 `claude setup-token` token、通过 Amazon Bedrock、Google Cloud 的 Agent Platform 或 Microsoft Foundry,以及在 WSL 中运行时,该功能均不可用。遇到登录页面和 CAPTCHA 时会暂停,由你亲自处理。站点权限来自扩展的设置。

如果你只用 Claude Code 并且已经付费订阅了 Claude 计划,我会推荐用它。另请参阅我们的 [Claude in Chrome 页面](https://browser-use.com/claude-in-chrome)。

### 2. Playwright MCP,扩展模式

Microsoft 的 [Playwright MCP](https://github.com/microsoft/playwright-mcp) 服务器通常会为每个工作区启动一个带有持久化配置文件的专属浏览器。使用 `--extension` 标志后,它将通过 [Playwright Extension](https://chromewebstore.google.com/detail/playwright-extension/mmlmfjhmonkocbjadbfplnigmagldckm) 连接到你正在运行的 Chrome 或 Edge([扩展 README](https://github.com/microsoft/playwright/tree/main/packages/extension#readme))。

- **适用范围:** 任何 MCP 客户端,包括 Claude Code、Codex、Gemini CLI 和 Cursor。
- **安装设置:** 安装 Playwright Extension,然后用 `--extension` 添加服务器:

```json
{
  "mcpServers": {
    "playwright-extension": {
      "command": "npx",
      "args": ["@playwright/mcp@latest", "--extension"]
    }
  }
}
```

- **用的是你的 Chrome 吗?** 是的,且限于你选择的标签页。Agent 第一次使用浏览器时,会打开一个页面,由你选择它连接的标签页。多个客户端可以同时连接;每个客户端拥有自己的标签组,并且只能看到该标签组中的标签页。
- **限制:** 你需要逐次批准每个连接,除非将扩展中的 `PLAYWRIGHT_MCP_EXTENSION_TOKEN` 复制到服务器的 `env` 中。如果扩展安装在多个 Chrome profile 中,它会连接到你最近使用的那一个;可用 `--profile-dir-name` 指定。仅支持 Chrome 或 Edge。

如果你希望把 Agent 限制在特定标签页内,我会推荐用它。免费,Apache-2.0 许可。我们的 [Playwright MCP 对比](https://browser-use.com/playwright-mcp) 有更多内容。

### 3. Chrome DevTools MCP,自动连接模式

Google 的 [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp) 围绕调试构建:性能跟踪、网络请求、控制台消息。默认情况下,它会启动一个带有专用配置文件的新 Chrome。在 Chrome 144 或更高版本上,`--autoConnect` 可将其附加到你已经在运行的 Chrome([高级用法](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/docs/advanced-usage.md#automatically-connecting-to-a-running-chrome-instance),[Chrome 博客](https://developer.chrome.com/blog/chrome-devtools-mcp-debug-your-browser-session))。

- **适用范围:** 任何 MCP 客户端。
- **安装设置:** 在 Chrome 中打开 `chrome://inspect/#remote-debugging` 并开启远程调试,然后用 `--autoConnect` 添加服务器:

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["chrome-devtools-mcp@latest", "--autoConnect"]
    }
  }
}
```

- **用的是你的 Chrome 吗?** 是的。Chrome 会显示对话框,要求你允许该会话,运行期间则显示"Chrome 正受自动测试软件控制"横幅。如果打开了多个 profile,它会连接 Chrome 的默认 profile,并能看到该 profile 的所有已打开窗口。
- **限制:** Chrome 需要由你自行启动。旧方案 `--browser-url=http://127.0.0.1:9222` 需要 Chrome 以 `--remote-debugging-port` 启动并使用单独的 `--user-data-dir`,因此那是一个独立的 profile,不是你日常使用的那个。Google 默认会收集使用情况统计信息;可用 `--no-usage-statistics` 关闭。

当任务是用你自己的登录状态来调试你自己的应用时，我会用它。免费，Apache-2.0 许可。我们的 [Chrome DevTools MCP 对比](https://browser-use.com/chrome-devtools-mcp)有更多内容。

### 4. Gemini CLI 的浏览器 agent

Gemini CLI 自带一个浏览器 subagent，它运行一个内置的 Chrome DevTools MCP（[文档](https://geminicli.com/docs/core/subagents/)）。

- **适用于：** Gemini CLI。
- **安装配置：** 默认关闭。在 `chrome://inspect/#remote-debugging` 启用 remote debugging（需要 Chrome 144 或更高版本），然后在 `settings.json` 中开启该 agent，并将 session mode 设为 `"existing"`：

```json
{
  "agents": {
    "overrides": { "browser_agent": { "enabled": true } },
    "browser": { "sessionMode": "existing" }
  }
}
```

- **能用你的 Chrome 吗？** 只有 `"existing"` 模式可以，它会连接到你正在运行的 Chrome。默认的 `"persistent"` 模式会以自己的 profile 启动 Chrome，profile 位于 `~/.gemini/cli-browser-profile/`。
- **限制：** 表单填写总是需要确认。`allowedDomains` 限制它可以访问的范围，`maxActionsPerTask` 默认在 100 次 tool call 后停止。首次使用时会显示同意对话框。

如果 Gemini CLI 就是你的 agent，我会用它：无需额外安装。我们的 [Gemini 浏览器页面](https://browser-use.com/gemini-browser)列出了其他选项。

### 5. ChatGPT 桌面应用中的 Codex

OpenAI 的 [ChatGPT 浏览器扩展](https://learn.chatgpt.com/docs/chrome-extension)让 ChatGPT 桌面应用中的 Codex 和 Work 对话能够使用你的 Chrome、Edge、Brave、Opera 或 Vivaldi。

- **适用于：** ChatGPT 桌面应用中的 Codex。文档只描述了桌面应用，没有提到 Codex CLI。
- **安装配置：** 在桌面应用中，打开 Settings > Computer Use，在你的浏览器旁选择 Install，然后在聊天中用 @-mention 选中该浏览器。
- **能用你的 Chrome 吗？** 可以，是你安装扩展的那个浏览器 profile，因此它能在你已登录的网站上执行操作。
- **限制：** 默认情况下，它在对每个新网站执行操作前都会先询问。你可以选择允许一次、允许该网站，或允许所有网站——OpenAI 将最后一种标记为 Elevated Risk。

对于 Codex CLI，请使用 Browser Harness 或某个 MCP server。我们的 [Codex 浏览器页面](https://browser-use.com/codex-browser)有相关配置命令。

### 6. Browser Harness

我们的开源工具（[GitHub](https://github.com/browser-use/browser-harness)，MIT 许可）。它通过 Chrome DevTools Protocol 连接到你已打开的 Chrome。agent 如何使用它取决于具体的 agent：

- **适用于：** Claude Code 和 Codex 通过其 skill 将它作为命令行工具运行，在这种模式下，agent 会在工作过程中自行编写所缺失的辅助代码。Cursor 和其他 MCP 客户端（如 Gemini CLI）则使用 `browser-harness-mcp`，它提供一组固定的 `browser_*` 工具（[MCP 文档](https://github.com/browser-use/browser-harness/blob/main/docs/MCP.md)）。
- **安装配置：** 将 README 中的 setup prompt 粘贴到你的 agent 里。它会用 `uv` 安装 Browser Harness、注册 skill，并打开 `chrome://inspect/#remote-debugging`，在那里你只需勾选一次 "Allow remote debugging for this browser instance"（[install.md](https://github.com/browser-use/browser-harness/blob/main/install.md)）。之后 Chrome 会请求你允许（Allow）该连接。
- **能用你的 Chrome 吗？** 可以，是整个正在运行的浏览器，包括你的标签页和登录状态。它控制的标签页标题开头会显示一个马的表情符号（horse emoji），而且它在后台工作，因此你当前可见的标签页仍然是你的。
- **限制：** 它能看到你的整个 Chrome，而不是选定的标签页或网站。开关功能需要 Chrome 144 或更高版本。除非你在 setup 过程中同意，否则本地录制是关闭的。命令行工具默认会发送使用情况 telemetry，包括 agent 通过管道传给它的代码以及这些代码打印的内容；`browser-harness telemetry disable` 可以将其关闭（[telemetry 代码](https://github.com/browser-use/browser-harness/blob/main/src/browser_harness/telemetry.py)、[install.md](https://github.com/browser-use/browser-harness/blob/main/install.md)）。

当你想要一个可以从 Claude Code、Codex、Gemini CLI 和 Cursor 中使用、且不限任何套餐或 API key 的工具时，我会用它。产品页面：[Browser Harness](https://browser-use.com/browser-harness)。

### 并排对比



| 选项 | Agent | 能用你真实登录的 Chrome? | 设置方式 | 费用、许可证 | 备注 |
| --- | --- | --- | --- | --- | --- |
| Claude in Chrome | Claude Code | 是,它会打开一个标签组 | 先安装扩展,再运行 claude --chrome | 需要 Pro、Max、Team 或 Enterprise 计划 | 不支持 API key、Bedrock、Google Cloud、Foundry 和 WSL;在登录页和 CAPTCHA 处会暂停 |
| Playwright MCP,extension 模式 | 任意 MCP 客户端 | 是,你选定的标签页 | Playwright Extension 加 extension 标志 | 免费,Apache-2.0 | 每次连接都需批准,除非你设置了 extension token;支持 Chrome 或 Edge |
| Chrome DevTools MCP | 任意 MCP 客户端 | auto-connect 模式下是;默认使用它自己的 profile | Chrome 的远程调试开关加 auto-connect 标志 | 免费,Apache-2.0 | Chrome 144+;Allow 对话框;使用统计默认开启 |
| Gemini CLI 浏览器 agent | Gemini CLI | "existing" 会话模式下是;默认使用它自己的 profile | 设置文件加 Chrome 的远程调试开关 | 内置于 Gemini CLI,Apache-2.0 | Chrome 144+;表单填写总是先询问 |
| ChatGPT 浏览器扩展 | ChatGPT 桌面应用中的 Codex | 是,装有扩展的那个 profile | Settings → Computer Use → Install | 文档中未说明所需计划 | 每个新网站都会先询问;不涵盖 Codex CLI |
| Browser Harness(我们的) | Claude Code、Codex;通过 MCP 还支持 Cursor、Gemini CLI 及其他 MCP 客户端 | 是,整个浏览器 | setup prompt(或 MCP 配置)加 Chrome 的远程调试开关 | 免费,MIT | Chrome 144+;Allow 对话框;使用遥测默认开启,一条命令即可关闭;CLI 模式下 agent 会补写缺失的辅助函数 |
| 复制的 cookies | 任意 | 否,是一个全新的浏览器 | 导出 cookies,然后加载到新浏览器中 | 免费 | 与设备绑定的会话无法刷新;你需要在其他地方重新登录 |



### 各 Agent 快速配置

这些配置将各工具文档中的标志与各 agent 文档中的 MCP 语法结合使用。在 Claude Code 和 Codex 中,`--` 之后的所有内容都会传递给服务器。

**Claude Code**([MCP 文档](https://code.claude.com/docs/en/mcp))

```bash
claude --chrome
claude mcp add playwright-extension -- npx @playwright/mcp@latest --extension
claude mcp add chrome-devtools --scope user -- npx chrome-devtools-mcp@latest --autoConnect
```

对于 Browser Harness,粘贴 [setup prompt](https://github.com/browser-use/browser-harness#setup-prompt) 即可。我们文档中的 [Claude Code 教程](https://docs.browser-use.com/cloud/tutorials/integrations/claude-code) 配置的是 [Browser Use CLI](https://browser-use.com/coding-agents),它构建在 Browser Harness 之上,同样能驱动你已登录的 Chrome。[/claude-code-browser](https://browser-use.com/claude-code-browser) 对这些选项进行了对比。

**Codex CLI**([MCP 文档](https://learn.chatgpt.com/docs/extend/mcp?surface=cli))

```bash
codex mcp add playwright-extension -- npx @playwright/mcp@latest --extension
codex mcp add chrome-devtools -- npx chrome-devtools-mcp@latest --autoConnect
```

对于 Browser Harness,将同样的 setup prompt 粘贴到 Codex 中即可。

**Gemini CLI**([MCP 文档](https://geminicli.com/docs/tools/mcp-server/))

使用第 4 节中带 `"sessionMode": "existing"` 的内置浏览器 agent,或通过其 MCP server 添加 Browser Harness:

```bash
gemini mcp add browser-harness uvx -- --from "browser-harness[mcp]" browser-harness-mcp
```

上文中的 Playwright 和 Chrome DevTools JSON 配置块可原样放入 `settings.json` 的 `mcpServers` 下。

**Cursor**([MCP 文档](https://cursor.com/docs/mcp))

将上述某个 JSON 配置块或 Browser Harness 添加到 `.cursor/mcp.json` 的 `mcpServers` 下(若要对每个项目生效,则添加到 `~/.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "browser-harness": {
      "type": "stdio",
      "command": "uvx",
      "args": ["--from", "browser-harness[mcp]", "browser-harness-mcp"]
    }
  }
}
```

Cursor 内置的 [Browser](https://cursor.com/docs/agent/browser) 无需配置即可操作 localhost 上你自己的应用,但它在每个 workspace 中保存自己的 cookies,而不是使用你 Chrome 的 cookies。更多信息见 [/cursor-browser](https://browser-use.com/cursor-browser)。

### 安全性

已登录浏览器中的 Agent 能做你能做的一切：发送邮件、更改设置、购买商品。厂商们对此直言不讳。

- **Prompt injection 是主要风险。** Anthropic 称其为“使用浏览器的 AI 工具面临的最大风险”:隐藏在页面、邮件或文档中的指令可以诱骗 Agent 执行你没有要求的操作，比如把你的数据发送到某处。在 Anthropic 的内部测试中，借助 Claude Opus 4.8 及其当前防御，攻击成功率低于 0.08%,但 Anthropic 表示风险仍不为零([Anthropic](https://support.claude.com/en/articles/12902428-using-claude-in-chrome-safely))。OpenAI 建议将页面内容视为不可信,除非万不得已，不要通过浏览器任务发送机密信息([OpenAI](https://learn.chatgpt.com/docs/chrome-extension))。
- **尽可能使用单独的 Chrome profile。** Anthropic 建议使用一个无法访问银行、医疗和政府等敏感账户的独立浏览器 profile。如果是扩展，请只在那个 profile 中安装;Playwright MCP 的 `--profile-dir-name` 用于选择它连接到哪个 profile。像 Chrome DevTools MCP 和 Browser Harness 这类附着到整个浏览器的工具,能看到该 Chrome 打开的一切，因此请把敏感账户放在一个你不连接的 Chrome 里。
- **了解 Agent 能触及什么。** Chrome DevTools MCP 警告称，它会把浏览器的内容暴露给你的 MCP client([README](https://github.com/ChromeDevTools/chrome-devtools-mcp#disclaimers))。对于手动设置——即使用 `--remote-debugging-port` 启动 Chrome——它警告说,你机器上的任何应用程序都可以连接到该端口并控制浏览器([advanced usage](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/docs/advanced-usage.md#manual-connection-using-port-forwarding))。自动连接模式、Gemini CLI 的 `"existing"` 模式和 Browser Harness 所使用的 Chrome 144+ 开关则会弹出对话框,要求你允许(Allow)每个连接([Chrome 博客，2025 年 12 月 11 日](https://developer.chrome.com/blog/chrome-devtools-mcp-debug-your-browser-session))。无论哪种方式，用完之后请关闭 remote debugging。
- **审查在邮件和支付网站上的操作。** 对任何涉及发送、支付或删除的操作，保持审批提示开启。Claude in Chrome 在使用金融网站前会询问，ChatGPT 扩展在每个新网站前会询问，Gemini CLI 在每次填写表单前会询问。

### 更多

- 我们的开源 Python 库可以使用你某个 Chrome profile 的副本来启动 Chrome([Real Browser docs](https://docs.browser-use.com/open-source/customize/browser/real-browser))。由于这是新浏览器中的副本，上述关于 device-bound-session 的注意事项同样适用。
- 各 Agent 的专属页面:[Claude Code](https://browser-use.com/claude-code-browser)、[Claude in Chrome](https://browser-use.com/claude-in-chrome)、[Codex](https://browser-use.com/codex-browser)、[Gemini CLI](https://browser-use.com/gemini-browser)、[Cursor](https://browser-use.com/cursor-browser)。
- 面向 coding Agent 的所有浏览器 MCP server,附我们配套的 eval:[控制浏览器的最佳 MCP Server](https://browser-use.com/posts/best-mcp-servers-to-control-a-browser)。
