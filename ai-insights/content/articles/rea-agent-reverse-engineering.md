---
title: "AI 开始逆向一切，软件开发还值钱吗？"
date: 2026-10-12T00:00:00.000Z
tags: ["洞察", "AI", "逆向工程", "软件商业模式", "开源", "护城河", "聚合"]
summary: "原作者不交源码，竞争者也可能做出够用的替代品。AI 逆向正在挑战实现保密的价值，软件的定价、用户控制权和开发者的护城河会怎样变化？"
---
> **原文链接**: [https://github.com/morluto/rea](https://github.com/morluto/rea)
> **来源**: REA / ESR / 开发者讨论
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/rea-agent-reverse-engineering/) · 2026/10/12
> **说明**: 本文由 AIHot 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

<div align="center">

**English** · [简体中文](README_zh.md) · [繁體中文](README_zh-TW.md) · [日本語](README_ja.md) · [한국어](README_ko.md) · [Türkçe](README_tr.md) · [Русский](README_ru.md) · [Tiếng Việt](README_vi.md) · [ไทย](README_th.md) · [Deutsch](README_de.md) · [Español](README_es.md) · [Français](README_fr.md) · [Українська](README_uk.md) · [Polski](README_pl.md) · [Português (Brasil)](README_pt-BR.md) · [العربية](README_ar.md) · [فارسی](README_fa.md) · [Bahasa Indonesia](README_id.md) · [Italiano](README_it.md)

## REA:逆向工程万物

#### 一个 MCP,覆盖二进制文件、应用程序与运行时行为的逆向工程。

**看到喜欢的功能？深入二进制层面，理解它的实现原理。**

[![npm version](https://img.shields.io/npm/v/rea-agents?style=flat-square&color=cb3837)](https://www.npmjs.com/package/rea-agents)
[![MCP tool catalog](https://img.shields.io/badge/MCP-tool_catalog-5c4ee5?style=flat-square)](docs/mcp-contracts.md#generated-catalog)
[![Node.js requirements](https://img.shields.io/badge/Node.js-requirements-339933?style=flat-square&logo=nodedotjs&logoColor=white)](#what-you-can-analyze)
[![skills.sh](https://skills.sh/b/morluto/rea?style=flat-square)](https://skills.sh/morluto/rea/reverse-engineer-anything)
[![MIT license](https://img.shields.io/badge/license-MIT-f4c430?style=flat-square)](LICENSE)
[![Discord](https://img.shields.io/discord/1556595354999332884?logo=discord&logoColor=white&label=Discord&color=5865F2)](https://discord.gg/GkcryMnJDM)

<a href="https://trendshift.io/repositories/82054?utm_source=repository-badge&amp;utm_medium=badge&amp;utm_campaign=badge-repository-82054" target="_blank" rel="noopener noreferrer"><img src="https://trendshift.io/api/badge/repositories/82054" alt="morluto%2Frea | Trendshift" width="250" height="55"/></a>

**[网站](https://rea.tools/) · [指南](https://rea.tools/guides/) · [案例展示](https://rea.tools/showcase/)**

[快速开始](#quick-start) · [REA 的工作原理](#how-rea-works) · [可分析的内容](#what-you-can-analyze) · [案例展示](#showcases) · [常见问题](#faq) · [文档](#documentation)

<code>npx rea-agents setup</code>

<br />

<img src="docs/assets/rea-hopper-analysis.png" alt="REA 在检查原生二进制文件时于 Hopper 内启动分析桥接" width="1200" />

<br /><br />

<table aria-label="REA 社区">
<tr>
<td align="center" width="360">
  <a href="https://discord.gg/GkcryMnJDM">
    <img src="docs/assets/discord.svg" height="42" alt="Discord" /><br />
    <strong>加入逆向工程社区</strong>
  </a><br />
  <sub>Discord · 问答 · 成果展示</sub>
</td>
</tr>
</table>

<br />

</div>

---

看到某个应用里有你想要的功能，想加进自己的产品？让你的 Agent 用 REA 来调研它。它可以在没有源代码的情况下分析该应用，解释这个功能是如何实现的，展示证据，并为你的项目构建一个版本。

REA 将你的 Agent 连接到一系列工具，用于分析原生二进制文件、JavaScript 和 Electron 应用、.NET 程序集以及网站。你也可以在终端中直接使用这些工具。分析在本地运行，结果包含每条结论背后的证据与局限。

Setup 会为你的 Agent 注册 REA,并安装配套的工作流说明。原生分析可以使用已有的 Hopper、Ghidra 或 IDA 安装；setup 也可以在征得同意后安装 Hopper。静态 JavaScript 分析无需原生分析引擎。

> **[访问 REA 网站](https://rea.tools/)**，获取安装说明、图文指南和真实案例研究。

### 快速开始

#### 设置你的 Agent

在已安装 Node.js 和 npm 的环境中，运行：

```bash
npx rea-agents setup
```

选择你的 Agent,查看将要进行的更改并批准。Setup 会添加 REA 的 MCP server 及配套的工作流说明，并备份现有配置。之后请重启你的 Agent。

Setup 支持 Claude Code、Codex、Cursor、Gemini CLI、Grok Build 以及[其他 Agent](docs/installation.md#supported-agents)。有关 provider 配置和手动 MCP 注册，请参阅[安装与设置](docs/installation.md)。

#### 询问你的 agent

```text
Understand how search works in the Notes app, show me the evidence, and build a
similar feature for my project.
```

将 Notes 替换为你的目标应用以及想要了解的功能。

#### 使用终端

检查一个已解压的 JavaScript/Electron 应用目录或 ASAR:

```bash
npx -y rea-agents@latest analyze-javascript-application /absolute/path/to/app --json
```

结果包含模块、imports、Electron 边界及其证据。将路径替换为你的目标,例如在 Windows 上为 `"D:/apps/example"`。

要安装 `rea` 命令以便日常使用:

```bash
npm install --global rea-agents
rea --help
```

若要进行原生分析,请先配置 provider。原生命令、provider 选择、快照和脚本编写请参阅 [CLI 与 Evidence 指南](docs/cli.md)。

#### 更新 REA

REA 迭代很快,新版本会频繁包含 bug 修复。请保持你的安装为最新版本。

对于通过 `npm install --global` 或 `bun add --global` 安装的 CLI:

```bash
rea update
```

Bun 全局更新需要 Bun 1.2.17 或更高版本。如果使用较旧的 Bun 版本,请先手动升级 Bun,再运行 `rea update`。

要刷新你的 agent 注册和 skill,请运行更新时输出的 setup 命令。

如果你使用 `npx`,请用以下命令更新你的 agent setup:

```bash
npx rea-agents@latest setup
```

检查 setup 变更并重启你的 agent。对于一次性 CLI 命令,使用 `npx rea-agents@latest` 后跟具体命令。使用 Bun 时,用 `bunx rea-agents@latest` 代替 `npx rea-agents@latest`。

### REA 的工作原理

你的 agent 通过 MCP 调用 REA 来检查目标并追踪相关代码。REA 会连同证据一起返回发现结果。Agent 利用这些结果提出后续问题、解释行为,或编写并测试实现。CLI 命令使用相同的工作流程。

![REA 调查流程:你的 agent 就本地目标提问,REA 使用分析工具对其进行检查和追踪,agent 利用返回的代码、引用和未知项进行解释、实现和测试。](website/public/assets/figures/rea-investigation-flow.svg)

[查看完整尺寸图片](website/public/assets/figures/rea-investigation-flow.svg)。

<a id="current-status"></a>

### 你可以分析什么

REA 需要 Node.js 22.x(>=22.19)、24.x(>=24.11)或 26+,以及 npm。其他工具和宿主支持取决于目标:

| 目标 | REA 返回的内容 | 要求与指南 |
| -------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------- |
| 原生二进制文件 | 伪代码、汇编、字符串、符号、调用和引用 | Hopper、Ghidra 或 IDA;[原生分析](https://rea.tools/guides/native/) |
| 离线 ELF 布局 | 节区、段、原始符号/重定位以及静态缓解候选项 | 调用方提供的 pwntools(Linux x64);[二进制诊断](docs/binary-diagnostics.md) |
| Go 二进制文件 | 内嵌的编译器版本、模块、替换项和构建设置 | 内置静态 ELF/PE/thin Mach-O 检查;无需安装 Go |
| WASM 工件 | 验证结果、节区、精确的 import/export WAT 形式以及解码后的 WAT | 调用方提供的 WABT 1.0.42;`inspect_wasm_artifact` |
| EVM 字节码 | 分发选择器、字节偏移、推断出的参数和可变性 | Linux x64 上的本地 raw/hex 载体;[离线 EVM 指南](docs/evm-bytecode.md) |
| 已记录的 Linux 崩溃 | 原始记录、每个已记录线程的寄存器/信号以及可选的映射候选项 | 调用方提供的 pwntools(Linux x64);可选 GDB/pwndbg;[已记录崩溃](docs/recorded-crashes.md) |
| JavaScript / Electron | 模块、imports、source maps、路由、IPC 和原生插件关系 | Node.js 和 npm;[应用分析](https://rea.tools/guides/javascript/) |
| 网站 | 页面结构、脚本、网络观察结果和请求的截图 | 一款 Chrome 系浏览器;[浏览器分析](https://rea.tools/guides/browser/) |
| 已保存的网络捕获 | 请求、响应、暴露的负载和来源位置 | HAR;对于原生 mitmproxy 捕获,需要 Linux 上的 mitmdump;[网络捕获指南](docs/web-network-captures.md) |
| .NET 程序集 | 元数据、CIL 指令、声明的原生依赖项和构建比较 | 无(仅静态分析);[托管代码指南](docs/managed-code-analysis.md) |
| Android APK | Manifest 声明、类、反编译后的方法和引用 | Linux/macOS/Windows x64 上的 headless JADX 和完整 JDK;[Android 指南](docs/android-analysis.md) |
| Android 设备 | 设备、包、进程、日志、dump、屏幕截图以及 APK/文件传输 | 调用方提供的 adb(模拟器或硬件设备);[ADB 指南](docs/adb-device-analysis.md) |

| JEB 项目 | 由引擎支持的项目单元、artifact 摘要以及类型/方法伪代码 | 由调用方启动的、提供 MCP 服务的 JEB 客户端，通过 REA_JEB_MCP_URL 选择；[JEB 指南](docs/jeb-analysis.md) |
| Android 资源 | 解码后的 manifest、字符串表、locale 和版本信息 | 由调用方提供的 Apktool 启动器；[资源指南](docs/apktool-resource-analysis.md) |
| Flutter 应用 | Dart 快照哈希、各 ABI 的库摘要以及引擎构建溯源 | 无(静态 APK 解析);[Flutter 指南](docs/flutter-analysis.md) |
| 固件 | 区域、提取结果以及原生分析交接 | Linux 上的 Binwalk / Unblob;[固件指南](docs/firmware-analysis.md) |
| 软件包和资源 | 文件清单、摘要、plist、Apple bundle 结构以及提取的资源 | [Artifact 与 JavaScript 指南](docs/javascript-artifact-reconstruction.md)、[Apple 应用](docs/apple-application-analysis.md) |
| 进程行为 | 终端输出、交互、退出与文件系统观察结果，以及运行对比 | 具备原生 PTY 的 Linux/macOS;[进程捕获](docs/process-capture.md) |

静态 JavaScript 和 .NET 检查在不运行应用程序的情况下读取所提供的文件。运行时捕获会以你的用户权限运行或与所选目标交互；每份运行时指南都会描述其具体影响。

<a id="choosing-a-deep-analysis-provider"></a>

原生格式和宿主支持因 provider 而异。请参阅 [Hopper 和 Ghidra 设置](docs/installation.md#hopper)、[IDA 指南](docs/ida-provider.md)以及[实验性的 Windows Ghidra 支持](docs/windows-ghidra-p0.md)。Ghidra 还支持 [16 位 DOS 分析](docs/ghidra-dos.md)。对于大型二进制文件，可使用 `REA_GHIDRA_STARTUP_TIMEOUT_MS` 或 `REA_HOPPER_STARTUP_TIMEOUT_MS` 提高 provider 的启动时限。关于 provider 的选择，请参阅 [CLI 指南](docs/cli.md#choose-a-provider)。要了解最新 npm 发布之后新增的功能，请查看[发布可用性](docs/installation.md#released-package-and-main)。

### 案例展示

[![DX-Ball 声像调节、Notion 剪贴板桥接和 TH04 子弹环案例展示插图](docs/assets/rea-showcases.png)](https://rea.tools/showcase/)

#### DX-Ball:重构声像(sound-pan)计算

追踪一次声音调用，进入其位置到声像的辅助函数，检查指令，并将不完整的伪代码转换为 C。重构结果通过了 3,205 个原始 x86 测试用例，并重现了编译后函数的全部 63 个字节。

[阅读案例研究](https://rea.tools/showcase/dx-ball/) ·
[重构代码仓库](https://github.com/N0zoM1z0/dx-ball)

#### Notion:追踪 Electron 剪贴板桥接

找到渲染进程的剪贴板 API,追踪其经 preload 和 IPC 进入主进程的路径，并检查富剪贴板格式。

[阅读案例研究](https://rea.tools/showcase/notion/)

#### TH04:恢复 DOS 子弹环计算

检查原版 PC-98 游戏的 16 位指令，恢复固定角度和瞄准角度的计算，并将重构后的 C++ 与历史编译器输出进行对比。

[阅读案例研究](https://rea.tools/showcase/th04/) ·
[重构代码仓库](https://github.com/N0zoM1z0/th04)

如果你曾用 REA 分析过有趣的东西，我们很乐意看到。欢迎通过 [issue](https://github.com/morluto/rea/issues) 或 [pull request](https://github.com/morluto/rea/pulls) 分享你的案例，内容包括目标对象、你的问题、REA 如何提供帮助，以及你的发现。

### FAQ

<details>
<summary><strong>哪些 Agent 可以使用 REA?</strong></summary>

任何支持本地 MCP 服务器的 Agent 均可使用。安装过程会配置[受支持的 Agent](docs/installation.md#supported-agents);其他客户端可以使用[手动 MCP 注册](docs/installation.md#mcp-registry)。

</details>

<details>
<summary><strong>我需要 Hopper、Ghidra 或 IDA 吗？</strong></summary>

深度原生分析需要其中之一。静态 JavaScript 与 .NET 检查无需原生分析引擎即可工作。Setup 可在你批准后安装 Hopper；Ghidra 和 IDA 则使用你现有的安装。参见 [provider 设置](docs/installation.md#hopper)。

</details>

<details>
<summary><strong>我需要先启动 Hopper 吗？</strong></summary>

当操作需要 Hopper 时，REA 会启动它。在 macOS 上，首次运行对话框可能会要求你选择演示模式或激活许可证。请在首次 CLI/MCP 操作或无人值守任务之前，在同一用户会话中完成该提示。如有需要，可手动打开 Hopper。参见 [Hopper 启动与故障排除](docs/installation.md#launcher-paths-and-troubleshooting)。

</details>

<details>
<summary><strong>从 skills.sh 安装 skill 有什么作用？</strong></summary>

该 skill 为你的 Agent 提供调查指令。使用 `npx rea-agents setup` 注册 REA 的 MCP server 并安装对应的指令，然后重启你的 Agent。参见 [仅安装 skill](docs/installation.md#skill-only-installation)。

</details>

<details>
<summary><strong>REA 会返回什么代码？</strong></summary>

原生分析返回伪代码和汇编代码。JavaScript/Electron 分析会还原模块及其相互关系。你的 Agent 利用这些发现来编写并测试实现；[showcases](#showcases) 提供了完整的实操示例。

</details>

<details>
<summary><strong>REA 会上传我的应用吗？</strong></summary>

REA 在本地分析目标。你的 Agent 接收工具结果，而其模型提供方有自己的数据政策。

</details>

<details>
<summary><strong>遇到 bug 该怎么办？</strong></summary>

请先更新；最近的版本可能已修复该问题。

对于通过 `npm install --global` 或 `bun add --global` 安装的 CLI：

```bash
rea update
```

对于通过 `npx` 进行的 agent setup：

```bash
npx rea-agents@latest setup
```

如果你正在使用 Agent，请完成 [setup 刷新](#update-rea) 并重启它，然后重试同一任务。如果问题仍然存在，请 [提交 issue](https://github.com/morluto/rea/issues)，附上你的 REA 版本、目标类型、复现步骤和错误输出。

</details>

### 文档

可以从网站上的[实操指南](https://rea.tools/guides/)入手。有关确切的选项、前置条件和结果契约：

- [安装与设置](docs/installation.md)：Agent 注册、provider 配置、更新与卸载。
- [就绪状态与故障排除](docs/installation.md#check-readiness-for-your-task)：诊断单个 Agent 或分析引擎。
- [CLI 与 Evidence](docs/cli.md)：命令、provider 选择、快照、导入/导出与退出状态。
- [MCP 契约](docs/mcp-contracts.md) 与 [Agent 提示词](docs/mcp-prompts.md)：工具结果、会话与引导式调查。
- [工具目录](docs/mcp-contracts.md#generated-catalog)：自动生成的工具、provider 与 CLI 命令清单。
- [Roadmap](docs/roadmap.md)：规划中的工作与能力追踪。

请通过 [SECURITY.md](SECURITY.md) 报告安全漏洞。

### Star 历史

🎉 **110,000 GitHub stars —— 感谢大家！**

感谢每一位使用 REA、报告 bug、提出功能需求、测试构建版本并贡献修复的用户。

<a href="https://www.star-history.com/?repos=morluto%2Frea&amp;type=date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=morluto/rea&amp;type=date&amp;theme=dark&amp;legend=top-left" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=morluto/rea&amp;type=date" />
    <img alt="REA GitHub star history" src="https://api.star-history.com/chart?repos=morluto/rea&amp;type=date" />
  </picture>
</a>

### 免责声明

负责任使用指南请参见 [DISCLAIMER.md](DISCLAIMER.md)。

本项目对非法或未授权使用的立场适用于所有 REA 版本、分发渠道和平台；每个副本均保留其适用的许可证。

REA 用于合法的研究、教育、互操作性、软件保存，以及对你拥有或被授权检查的软件进行分析。

### 参与贡献

我们非常欢迎你为 REA 做出贡献！你可以 [提交 issue](https://github.com/morluto/rea/issues) 来报告 bug 或建议新功能，也可以 [发送 pull request](https://github.com/morluto/rea/pulls) 来改进代码或文档。

开发环境搭建与检查请参阅 [CONTRIBUTING.md](CONTRIBUTING.md),验证流程请参阅 [测试](docs/testing.md),项目结构请参阅 [架构图](docs/architecture.mermaid)。

### 许可证

[MIT](LICENSE)

REA 自有代码基于 MIT 许可证发布。第三方材料保留其自身的许可证和版权声明；依赖清单、保留的许可证文本以及外部工具条款请参阅 [第三方声明](THIRD_PARTY_NOTICES.md)。

**你必须合法获取商业工具，并在其适用许可证授权下使用**，包括 IDA Pro / Hex-Rays 反编译器、Hopper 和 JEB。REA 不提供任何工具许可、密钥或激活权益。试用版和演示版仍受供应商条款约束，包括用户、功能、自动化以及输出共享方面的限制。破解版、窃取的密钥、未经授权的密钥共享以及绕过许可证限制的行为均未获授权。本说明不会修改 MIT 许可证或第三方许可证。
