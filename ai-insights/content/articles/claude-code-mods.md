---
title: "你可以定制自己的 Claude Code 了：改界面、拦住危险命令、逐步查看代码改动"
date: 2026-10-02T00:00:00.000Z
tags: ["AI 实操", "Claude Code", "Mods", "插件", "AI 编程", "聚合"]
summary: "把上下文读数放在输入框上方，在危险命令执行前查看影响，再按步骤复核一轮修改：三个官方例子讲清 Mods 的作用与写法。"
---
> **原文链接**: [https://claude.dev/blog/getting-started-with-claude-code-mods/](https://claude.dev/blog/getting-started-with-claude-code-mods/)
> **来源**: Anthropic / Addy Osmani
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/claude-code-mods/) · 2026/10/2
> **说明**: 本文由 AIHot 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

## Claude Code 模组入门指南

从空文件夹开始构建你的第一个 Claude Code 模组，然后看看 API 还能做什么。

- 作者：Addy Osmani（技术团队成员）
- 发布时间：2026-10-01
- URL：<https://claude.dev/blog/getting-started-with-claude-code-mods/>

---

Claude Code 已经允许你更改很多行为：设置、权限规则、斜杠命令、技能和状态栏。模组更进一步。模组可以重写或替换 Claude Code 的行为，甚至可以绘制自定义 UI。在底层，模组是钩子（hooks），它们被打包在插件内。每个模组都是一个小的 JavaScript 或 TypeScript 模块，在你的会话中运行，并观察发生的每一个事件。

这使得模组能够将 Claude Code 适配到你的工作方式。你可以添加一个随时检查的读数，在你担心的命令前设置一道防护，或者构建一个你喜欢的审查视图来查看更改。

本指南从一个空文件夹构建一个模组：**Token Weather**，一个在提示符上方实时显示上下文窗口的预报。大约 80 行代码。然后它会介绍两个更大的模组：**Blast Radius** 和 **Replay Theater**，以展示 API 还能做什么。

[视频（终端）：Token Weather、Blast Radius 和 Replay Theater，在终端会话中依次展示](https://claude.dev/media/a4e8983c1c68c9549dbf74a7478c8e2b7932e65d881a978d51a5191e2c7ce5ac.mp4) — 深色终端中三个演示之间的标题卡片：Token Weather 的色带从 18% 的 Clear 上升到 81% 的 Storm，Blast Radius 显示 `rm -rf build` 及其会删除的 9 个文件，Replay Theater 逐步演示将 `greet` 重命名为 `welcome`。

[视频（桌面）：Token Weather、Blast Radius 和 Replay Theater，在桌面版 Claude Code 中依次展示](https://claude.dev/media/22d3a880ab0b467434221682c05a569487d8d5c5adb91de208ef24242d36662d.mp4) — 浅色 Code 标签页中三个演示之间的标题卡片：Token Weather 的色带从 10% 的 Clear 上升到 77% 的 Storm，Blast Radius 卡片列出 `rm -rf build` 会删除的 9 个文件，Replay Theater 逐步演示将 `greet` 重命名为 `welcome`。

[视频：Token Weather 的色带随着上下文窗口填充而变化：18% 的 Clear、67% 的 Showers、81% 的 Storm](https://claude.dev/media/1ee841af92c8762c69891048acf16f04442067349d5ae9715970324039765ca0.mp4) — 一行终端色带循环显示三种预报：Clear 的黄色太阳、Showers 的蓝色雨伞、Storm 的粉色闪电，每个都显示在 200k 中的 token 数量以及最近轮次的小型柱状图。

**需要 Claude Code 2.1.287 或更高版本。** 模组默认开启，无需额外启用。API 在不同版本之间可能发生变化。每次 Claude Code 加载模组时，它会将用于构建的类型声明写入模组的 `.claude-plugin/types/` 文件夹，这些声明是你当前版本的权威依据。

### 模组的工作原理

模组是一个 Claude Code 插件，其行为位于 JavaScript 或 TypeScript 模块中：

- 文件夹是一个普通插件，包含 `.claude-plugin/plugin.json` 清单文件。
- `hooks/hooks.json` 在 `modules` 下指定一个模块。
- 该模块导出 `register(on, options)`。在其中，`on(event, matcher?, hook)` 添加一个钩子。

每个钩子都具有相同的结构：

```javascript
on("tool.call", { tool: "Bash" }, async ($, e, next) => {
  // $    模组 API：ui, session, state, store, fs, process, clock, http, tool, command, model, ...
  // e    此事件的输入，作为纯数据
  // next 将 e 传递给其他插件，然后传递给 Claude Code 自身的行为
  return next(e);
});
```

钩子形成一个链，类似于中间件。你的钩子运行后，`next(e)` 将事件传递给下一个插件，最后 Claude Code 执行它原本会执行的操作。钩子可以做三件事之一：

*图示：一个事件依次经过你的钩子、其他插件、然后 Claude Code。每个都调用 next(e) 将其传递下去，结果再流回。一个直接回答的钩子会返回而不调用 next。*

| 行为       | 方式                                            | 示例                                                 |
| ---------- | ----------------------------------------------- | ---------------------------------------------------- |
| **观察**   | `const r = await next(e); /* 查看 */ return r`  | 记录每次文件编辑。每次轮次后获取一个读数。           |
| **重写**   | `return next({ ...e, command: safer })`         | 改变链中其余部分看到的内容。                         |
| **回答**   | `return { deny: "…" }` 而不调用 `next`          | 拒绝工具调用。自己提供命令或工具。                   |

事件涵盖工具调用、提交的提示词、回合开始与结束、会话开始与结束、斜杠命令以及 `ui.render`：界面绘制的每一个部分。该模块在其自己的沙箱中运行，没有 DOM 也没有 Node，因此外部的一切都通过 `$` 传递。

**这与 settings hooks 的区别。** 一个 settings hook 为每个事件运行一个 shell 命令，并通过 stdin 和 stdout 传递 JSON。而一个 mod 仅加载一次，并在会话中保持。它可以保持状态、绘制随事件更新而变化的 UI，并回调 Claude Code：打开面板、运行进程、注册斜杠命令或注册模型可调用的工具。

**Claude Code 自身也使用它们。** Claude Code 的某些功能本身就是作为 mod 构建的，包括 AGENTS.md 支持和对话旁的 `/diff` 面板。它们的源码及测试位于公开的 [anthropics/claude-code](https://github.com/anthropics/claude-code) 仓库的 `mods/` 目录下，因此你可以了解团队是如何构建它们的。

### 构建你的第一个 mod：Token Weather

Token Weather 在每个回合后读取上下文窗口的填充程度，并在提示词上方绘制一行：一个天气图标、百分比、窗口中已使用的 token、最近几个回合的小图表，以及上一回合新增的 token 数量。

| 已使用       | 预测             |
| ------------ | ---------------- |
| 25% 以下     | ☀ 晴朗           |
| 25–49%       | ☁ 多云           |
| 50–74%       | ☂ 阵雨           |
| 75–89%       | ☇ 暴风雨         |
| 90% 及以上   | ↯ 即将压缩       |

以下是在真实会话中的表现。每个回合读取更多文件，色带从 ☀ 晴朗填充到 ☂ 阵雨再到 ☇ 暴风雨：

[视频（终端）：Token Weather 在完整终端会话中经过三个回合：一个 200k 窗口中分别达到 18%、67%、81%](https://claude.dev/media/eccd73c962a5b22578cf5bfd4fa214f6ecd9e602a1cb8df519db737b99932f05.mp4) — 一个深色终端窗口，每个回合要求 Claude 读取更多 Python 文件，同时提示词上方的色带从黄色晴朗变为蓝色阵雨再到粉色暴风雨。

[视频（桌面）：Token Weather 在桌面版 Claude Code 中经过三个回合：一个 200k 窗口中分别达到 10%、54%、77%](https://claude.dev/media/96e98ae4d0f6fe3369dbd264e7764764e7b288eeab5b5c246b2acf8c414c235a.mp4) — Claude 桌面应用的浅色 Code 标签页，每个回合要求 Claude 读取更多气象站服务的文件、日志和读数，然后是测试，同时提示框上方的色带从黄色晴朗变为蓝色阵雨再到粉色暴风雨。

#### 捷径：让 Claude 来构建

你可以跳过以下六个步骤。Claude Code 知道如何编写 mod，因此你可以描述你想要的 mod，让它来完成工作。使用 `claude` 启动会话并粘贴以下提示词：

```text
为我制作一个名为 token-weather 的 Claude Code mod：一个上下文窗口的实时预报，显示在提示词上方的色带中。

它应在一行中显示以下内容：
- 一个天气图标和文字，表示上下文窗口的填充程度：低于 25% ☀ 晴朗（黄色），25–49% ☁ 多云（青色），50–74% ☂ 阵雨（蓝色），75–89% ☇ 暴风雨（洋红色），90% 及以上 ↯ 即将压缩（红色）。
- 使用的百分比，然后是窗口中使用的 token，例如 "134.4k / 200k"。
- 一个最近 12 个回合的小图表，使用 ▁▂▃▄▅▆▇█ 绘制。
- 上一回合新增了多少，例如 "▲ +98.3k last turn"。

它应在每个回合后更新。
```

Claude 会询问一次是否启用当前会话的热重载。允许它，当 Claude 的回合结束时，色带就会出现在提示词上方。此后，每次更改都会在原地重新加载，因此你可以不断要求调整（"将暴风雨的起始值改为 70%"，"在末尾添加美元成本"），并观察色带的变化。该 mod 仅在此会话中加载，其文件夹稍后会被清理，因此要保留它，请将文件夹复制出来并像任何插件一样安装（[步骤 6](https://claude.dev/blog/getting-started-with-claude-code-mods/#step-6-share-it)）。

注意，提示词只描述了你希望看到的内容。你不需要了解 API 就能编写一个。Claude Code 内置的 mod 编写指南涵盖了如何操作：在哪里保持状态以使其在重载后仍能存活，如何使用 `claude plugin validate` 检查插件，以及要钩住哪些事件。更改 "它应显示以下内容" 这几行，它就是你的 mod，而不是我们的。

如果你更想先了解它是如何组合的，或者想检查Claude写了什么，请继续阅读。

#### 步骤1：创建文件夹

检查你的 Claude Code 版本是否足够新：

```shell
claude --version   # 2.1.287 或更新版本
```

创建如下目录结构：

```text
token-weather/
├── .claude-plugin/
│   ├── plugin.json
│   └── types/            (Claude Code 加载 mod 时会写入)
├── hooks/
│   ├── hooks.json
│   └── token-weather.mjs
├── types/
│   └── index.d.ts        (步骤3中添加)
└── tests/
    └── token-weather.test.ts   (步骤5中添加)
```

`.claude-plugin/plugin.json` 是标准的插件清单：

```json
{
  "name": "token-weather",
  "version": "0.1.0",
  "description": "在提示区域上方绘制上下文的实时预报。",
  "author": { "name": "You" }
}
```

`hooks/hooks.json` 指向模块。一个 mod 有且只有一个：

```json
{
  "modules": ["./token-weather.mjs"]
}
```

#### 步骤2：绘制一些内容

提示框正上方的区域是一个名为 `AbovePrompt` 的组件。Claude Code 本身不会在此区域绘制任何内容，因此它是很好的首个目标。挂接其 `ui.render` 事件并返回一个元素树：

```javascript
// hooks/token-weather.mjs
export function register(on) {
  on("ui.render", { component: "AbovePrompt" }, ($, e, next) => {
    const { Box, Text } = $.ui.resolve(e);
    return Box({
      paddingX: 1,
      children: [Text({ color: "yellow", bold: true, children: "☀  Clear skies" })],
    });
  });
}
```

这些元素并非全局变量。`$.ui.resolve(e)` 返回当前绘制表面的构造函数，因为 Claude Code 所绘制的每个表面支持的组件略有不同。JSX 也可以使用，工厂函数为 `h`。

在加载了插件的情况下启动一个会话：

```shell
claude --plugin-dir ./token-weather
```

提示框上方会出现 "☀ Clear skies"。保持会话打开。该文件夹会被监听，因此每次保存都会就地重新加载模块，无需重启。这种快速的反馈循环正是编写 mod 的乐趣所在。

**提示：** 一旦掌握了模式，就可以像[快捷方式](https://claude.dev/blog/getting-started-with-claude-code-mods/#the-shortcut-let-claude-build-it)那样描述下一个 mod 给 Claude。它会将插件写入一个文件夹，并在同一会话中热重载。

#### 步骤3：读取真实数据并将其保存在 `$.state` 中

`$.session.usage()` 返回与状态行相同的数字。`context.tokens` 是上次回复所依据的输入 tokens，`context.window` 是模型的窗口大小，`context.percent` 则是前者与后者的比值。该调用是免费的：仅在请求 `breakdown` 时才会发送 token 计数请求。

在会话启动时以及每次对话轮次结束后读取数据：

```javascript
on("session.start", async ($, e, next) => {
  const result = await next(e);
  await takeReading($);
  return result;
});

on("turn.complete", async ($, e, next) => {
  const result = await next(e);
  if (!e.agentId) {
    await takeReading($); // 仅主循环轮次，不包括子代理
  }
  return result;
});
```

两个钩子都先调用 `next(e)` 然后进行观察。两者都不会改变实际发生的行为。

**历史数据应保存在哪里。** 模块级的 `let readings = []` 看起来是直观的选择，但热重载相当于全新加载：`register` 会再次运行，`session.start` 会再次触发，模块变量会重新开始。因此，将历史记录放入 `$.state` 中。它会在宿主中为整个会话保存命名的值，并且这些值能在重载后继续存在。

```javascript
// 由宿主持有，因此该文件的热重载不会影响历史记录。
const readings = { plugin: "token-weather", key: "readings" };

async function takeReading($) {
  const { context } = await $.session.usage();
  if (!context?.window) return;
  const tokens = context.tokens ?? 0;
  const percent = context.percent ?? Math.round((tokens / context.window) * 100);
  const { value: history = [] } = await $.state.get(readings);
  await $.state.set(readings, [...history, { tokens, window: context.window, percent }].slice(-HISTORY));
}
```

状态值需要在插件的 **类型合约** 中声明，这是一个小的 `.d.ts` 文件，清单会指向它。添加 `types/index.d.ts`：

```typescript
export type TokenWeatherReading = { tokens: number; window: number; percent: number };

declare module "claude-code" {
  interface PluginState {
    "token-weather": { readings: TokenWeatherReading[] };
  }
}
```

然后将 `"types": "./types/index.d.ts"` 添加到 `plugin.json`。如果跳过此步骤，`claude plugin validate` 会报错并指出修复方法：`token-weather.readings is not declared: the manifest's types contract must name it in interface PluginState { … }`。

作为回报，你可以免费获得重绘。在渲染钩子运行时进行的 `$.state.get` 会订阅该绘制，因此后续每次 `$.state.set` 都会重绘该条带。你永远不需要调用 `$.ui.invalidate`。

#### 步骤 4：绘制预测

以下是整个模块：

```javascript
// Token Weather：提示上方的上下文窗口实时预测。

const HISTORY = 12;
const BARS = "▁▂▃▄▅▆▇█";
const FORECAST = [
  { upTo: 25, icon: "☀", word: "晴朗", color: "yellow" },
  { upTo: 50, icon: "☁", word: "多云", color: "cyan" },
  { upTo: 75, icon: "☂", word: "阵雨", color: "blue" },
  { upTo: 90, icon: "☇", word: "暴风雨", color: "magenta" },
  { upTo: Infinity, icon: "↯", word: "即将压缩", color: "red" },
];

// 由宿主持有，因此历史记录在文件热重载后仍然存在。
const readings = { plugin: "token-weather", key: "readings" };

export function register(on) {
  on("session.start", async ($, e, next) => {
    const result = await next(e);
    await takeReading($);
    return result;
  });

  on("turn.complete", async ($, e, next) => {
    const result = await next(e);
    if (!e.agentId) {
      await takeReading($); // 仅主循环轮次，不包括子代理
    }
    return result;
  });

  on("ui.render", { component: "AbovePrompt" }, async ($, e, next) => {
    const { value: history = [] } = await $.state.get(readings);
    if (e.props.hasSurvey || history.length === 0) {
      return next(e);
    }
    const { Box, Text } = $.ui.resolve(e);
    return band(Box, Text, history, e.props.bodyColumns);
  });
}

async function takeReading($) {
  const { context } = await $.session.usage();
  if (!context?.window) return;
  const tokens = context.tokens ?? 0;
  const percent = context.percent ?? Math.round((tokens / context.window) * 100);
  const { value: history = [] } = await $.state.get(readings);
  await $.state.set(readings, [...history, { tokens, window: context.window, percent }].slice(-HISTORY));
}

function band(Box, Text, history, columns) {
  const now = history[history.length - 1];
  const f = FORECAST.find((b) => now.percent < b.upTo);
  const parts = [
    Text({ color: f.color, bold: true, children: `${f.icon}  ${f.word}` }),
    Text({ children: `  ${now.percent}% of context` }),
    Text({ dimColor: true, children: `  ${short(now.tokens)} / ${short(now.window)}` }),
  ];
  if (columns >= 60) {
    parts.push(Text({ dimColor: true, children: "   last turns " }));
    parts.push(Text({ color: f.color, children: sparkline(history) }));
    if (history.length > 1) {
      parts.push(Text({ dimColor: true, children: trend(history) }));
    }
  }
  return Box({ flexDirection: "row", paddingX: 1, children: parts });
}

function sparkline(history) {
  const top = Math.max(...history.map((r) => r.tokens), 1);
  return history.map((r) => BARS[Math.floor((r.tokens / top) * (BARS.length - 1))]).join("");
}

function trend(history) {
  const delta = history[history.length - 1].tokens - history[history.length - 2].tokens;
  if (delta === 0) return "  steady";
  return delta > 0 ? `  ▲ +${short(delta)} last turn` : `  ▼ ${short(-delta)} last turn`;
}

function short(n) {
  if (n >= 1_000_000) return `${+(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${+(n / 1_000).toFixed(1)}k`;
  return String(n);
}
```

有三个细节值得复制到你自己的 mod 中：

- **组件的 props 位于 `e.props` 上。** `hasSurvey` 告诉你一个调查想要这个条带，因此钩子通过 `next(e)` 让出。`bodyColumns` 是条带的实际宽度，当面板停靠在记录旁边时，它比终端窄。根据它调整树的大小。只有 `e.component`、`e.surface`、`e.requestId` 和 `e.viewport` 位于 `e` 的顶层。
- **当没有内容可绘制时，直接传递。** 返回 `next(e)` 将条带交还给 Claude Code 和其他 mod。
- **使用单宽度符号，而不是 emoji。** ☀ ☁ ☂ ☇ ↯ 在每个终端字体中对齐。

保存文件后，正在运行的会话会自动加载它。经过几次读取大文件的轮次后，指示条从 Clear 变为 Showers 再到 Storm，就像本节开头记录的那样。

#### 步骤 5：验证和测试

`claude plugin validate` 会像 Claude Code 一样读取 manifest 和模块的源代码，并报告模块钩子和调用的内容：

```text
$ claude plugin validate ./token-weather
  > types ./types/index.d.ts declares state: token-weather.readings
  > ./token-weather.mjs hooks: session.start, turn.complete, ui.render{component=AbovePrompt}
  > ./token-weather.mjs calls: $.session.usage (via takeReading), $.state.get, $.state.set (via takeReading), $.ui.resolve
  > ./token-weather.mjs state writes: token-weather.readings
  > ./token-weather.mjs state reads: token-weather.readings
√ Validation passed
```

`claude plugin test` 会在真实的 Claude Code 运行时中运行插件的 `*.test.ts` 文件。测试通过 `on` 注册的钩子会在链中该 mod 之后运行，并桩化 Claude Code 会回答的内容，因此你可以精确控制 `$.session.usage()` 返回的内容：

```typescript
// tests/token-weather.test.ts
import { describe, expect, test } from "claude-code/testing";

describe("token-weather", () => {
  test("指示条跟随上下文窗口", async ($, on) => {
    // 此处注册的钩子在 mod 之后运行，并桩化 Claude Code 会回答的内容。
    let tokens = 36_100;
    on("session.start", ($, e) => ({ cwd: e.cwd }));
    on("session.usage", () => ({
      value: { startedAt: 0, rateLimits: [], context: { tokens, window: 200_000, percent: Math.round(tokens / 2_000) } },
    }));
    on("turn.complete", () => ({ text: "" }));

    await $.session.start({ surface: "terminal", isInteractive: true, cwd: "/work" } as any);
    const ui = await $.ui.mount({
      plugin: "token-weather",
      surface: "terminal",
      component: "AbovePrompt",
      props: { hasSurvey: false, isWorking: false, maxRows: 10, bodyColumns: 120 },
    } as any);
    expect(await ui.find({ type: "Text", text: /Clear/ })).toBeDefined();

    tokens = 134_400;
    await $.turn.complete({ reason: "answer", answer: "ok", durationMs: 1 } as any);
    expect(await ui.find({ type: "Text", text: /Showers/ })).toBeDefined();
    expect(await ui.find({ type: "Text", text: /67% of context/ })).toBeDefined();
    expect(await ui.find({ type: "Text", text: /▲ \+98\.3k last turn/ })).toBeDefined();
    await ui.unmount();
  });
});
```

```text
$ claude plugin test ./token-weather
(pass) token-weather > 指示条跟随上下文窗口
 1 pass
 0 fail
```

该测试还检查了步骤 3 中的重绘行为。指示条在 `turn.complete` 后更新，而 mod 从未请求重绘。

#### 步骤 6：分享它

mod 是一种插件，因此它的发布方式相同。将其放入一个市场，市场可以简单到只是一个包含 `.claude-plugin/marketplace.json` 的文件夹：

```json
{
  "name": "my-mods",
  "owner": { "name": "You" },
  "plugins": [{ "name": "token-weather", "source": "./token-weather" }]
}
```

```shell
claude plugin marketplace add ./my-mods
claude plugin install token-weather@my-mods --scope user
```

### 分享你的 mod

mod 是 Claude Code 插件，因此你可以像分享任何其他插件一样分享它，无需学习新内容。将 mod 放入一个包含市场文件的 GitHub 仓库中，该仓库就成为你的市场。任何人都可以从中安装，你可以通过普通推送进行更新。

在 Claude Code 中安装需要三个命令：

```text
/plugin marketplace add your-org/my-mods
/plugin install token-weather@my-mods
/reload-plugins
```

重新加载后 mod 即启动。如果它没有显示，请重启 Claude Code。

mod 是在你的机器上 Claude Code 内部运行的代码，具有与 Claude Code 相同的访问权限，并且由其发布者（而非 Anthropic）编写。因此，安装 mod 的方式应与安装包一样：先阅读仓库，只从你信任的人那里安装。只有在你运行命令后，才会安装任何内容。

Claude 目录接受包含模组（mods）的插件，你可以通过 [claude.ai/directory/manage](https://claude.ai/directory/manage) 提交你自己的模组，这样其他人无需你的链接就能找到它。

### 另外两个模组

Token Weather 只负责监视和绘图。接下来的两个模组则会进入事件、打开窗格并接收输入。

#### Blast Radius：在运行前查看危险命令会更改什么

当 Claude 调用 Bash 执行 `rm -rf`、`git reset --hard`、`git clean`、强制推送或数据库迁移时，Blast Radius 会拦截该调用。它会计算出该命令会触及哪些内容，并打开一个带有 **Proceed** 和 **Cancel** 按钮的窗格。按下 `2`，Claude 会收到一条包含原因的拒绝信息。按下 `1`，命令会按原样执行。

[视频（终端）：Blast Radius 拦截 rm -rf build，并列出它将删除的 9 个文件（1.1 MB）。Cancel 拒绝执行；第二次尝试时，Proceed 执行了该命令。](https://claude.dev/media/75748f2aa5232025acdbe254ddea99a0b573152035fd289437d2953b8f6061e7.mp4) — 一个深色终端，Claude 被要求删除 build 文件夹，一个带黄色边框的 Blast Radius 窗格显示了命令名称、列出了 build/ 下将被删除的文件，并提供了带编号的 Proceed 和 Cancel 选项。

[视频（桌面）：在桌面端，Blast Radius 拦截 rm -rf build，并列出它将删除的 9 个文件（498 KB）。Cancel 拒绝执行；第二次尝试时，Proceed 执行了该命令。](https://claude.dev/media/3a6c6f96319a339b88ae1221b1269daab8c9f01c71184630235abed7aa91ef23.mp4) — Claude 桌面应用的浅色 Code 标签页，Claude 被要求清除旧的构建输出，一个带黄色边框的 Blast Radius 卡片显示了命令名称、列出了 build/ 下将被删除的文件，并提供了带编号的 Proceed 和 Cancel 选项。

它使用了三个钩子：针对 Bash 的 `tool.call`，以及针对 `Pane` 和 `AbovePrompt` 的 `ui.render`。其核心是上表中的“answer”动作：

```javascript
on("tool.call", { tool: "Bash" }, async ($, e, next) => {
  const risk = classify(String(e.command ?? ""));
  if (risk === null) return next(e);                 // 其他一切正常执行

  const report = await measure($, risk, await $.session.cwd());  // git status, git clean -n, du, ...
  held = { command: e.command, risk, report, decision: null };
  const opened = await $.ui.open({ id: "blast-radius", title: "Blast Radius", focus: true });
  if (!opened.isPlaced) held.where = "band";         // 窗口太窄，无法显示窗格：在提示符上方绘制

  while (held.decision === null && !next.signal.aborted) {
    await $.process.run(["sleep", "0.25"]);          // $ 调用内部的时间不计入钩子的时间限制
  }
  if (held.decision === "proceed") return next(e);   // 让它执行
  return { deny: `Blast Radius held this command: the user pressed Cancel. It would have: ${report.summary}.` };
});
```

它教会我们：

- **使用 `$.process.run` 进行试运行。** 报告来自工具自身的命令：`git status --porcelain`、`git clean -n`、`git log HEAD..origin/main`、`showmigrations`。参数以 argv 数组的形式传入，因此路径中的任何内容都不会作为 Shell 代码执行。
- **拦截调用。** 每次分发时，钩子拥有 10 秒的自有时间，但在 `$` 调用内部等待的时间不计入。循环会通过短暂的 `sleep` 进程等待，直到某个按钮的 `onPress` 设置了决策；当 `next.signal` 中止（你按下了 Esc 键）时，它会放弃。
- **带热键的按钮。** `Button({ label: "Proceed", hotkey: "1", onPress })` 可通过点击、Tab 键+回车键或数字键触发。
- **降级到 band。** 当终端足够宽时，终端会在对话记录旁边停靠一个窗格。当 `$.ui.open` 返回 `isPlaced: false` 时，相同的报告会在提示符上方绘制：

![一个没有侧边窗格的终端：提示符上方有一个带黄色边框的框，显示了命令、该命令将丢弃的两个含有未提交更改的文件，以及带编号的 Proceed 和 Cancel 选项。](https://claude.dev/media/ac53d89fc2dbe36603c30639b12fdc7edcfba5072b9b417e656a65a2d196cc37.png)

*在 120 列宽下，Blast Radius 在提示符上方的 band 中绘制其针对 git reset --hard 的报告*

这是一个安全网，而非权限系统。它读取命令文本，因此 `$(…)`、别名以及调用 `rm` 的脚本都能绕过它。如需硬性阻止，请使用权限规则。

#### Replay Theater：逐步回放上一轮的编辑

当一轮运行时，Replay Theater 会记录每一次 Edit 和 Write 调用：文件、编辑前后的文本。当轮次结束时，提示符上方会出现一个提示。按下 `r`（或输入 `/replay`），一个面板会逐步展示每次编辑的差异，并附带编号步骤条以及 **Prev**、**Next** 和 **Close** 按钮。

[视频（终端）：Replay Theater：在 3 个文件中进行 5 次编辑的重命名后，提示符上方出现提示，然后面板中逐步展示步骤 1 到 5](https://claude.dev/media/e616623b87187bf2439108f0f566448fa74f8cfee6fd5b4c5d8703da2ce4e331.mp4) — 一个深色终端转录，显示将 greet 重命名为 welcome 的红色和绿色差异，提示符上方有一个洋红色 Replay 提示，然后是一个洋红色边框的面板，逐步展示每次编辑的差异，带有 Prev、Next 和 Close 按钮。

[视频（桌面）：桌面版 Replay Theater：在 4 个文件中进行 6 次编辑的重命名后，提示符上方出现提示，然后面板中逐步展示步骤 1 到 6](https://claude.dev/media/3cda5555b57901647c1c4001055481b38482816c883a68ea3a5245e5a4bf8fad.mp4) — Claude 桌面应用的浅色 Code 标签页，Claude 在四个文件中将 greet 重命名为 welcome，提示框上方出现一个洋红色 Replay 提示和一个 Replay 按钮，然后是一个洋红色边框的面板，逐步展示每次编辑的差异，带有 Prev、Next 和 Close 按钮。

它从不阻止或修改编辑。它只是观察：

```javascript
on("tool.call", async ($, e, next) => {
  if (EDIT_TOOLS.has(e.tool)) state.pending.push(...(await stepsFor($, e)));  // old/new text → diff
  return next(e);                                                              // the edit runs untouched
});

on("turn.start", ($, e, next) => { if (!e.agentId) state.pending = []; return next(e); });

on("turn.complete", async ($, e, next) => {
  const r = await next(e);
  if (!e.agentId && state.pending.length) state.replay = state.pending;       // one replay per turn
  return r;
});

on("session.start", async ($, e, next) => {
  const r = await next(e);
  await $.command.register({ name: "replay", description: "Step through the last turn's file edits" });
  return r;
});
on("command.run", { command: "replay" }, async ($, e) => ({ text: (await openReplay($)) ? "Replaying" : "No edits" }));
```

它教会我们：

- **配对事件。** `turn.start` 和 `turn.complete` 将编辑限定为每轮一次回放，而 `e.agentId` 确保子代理的轮次不参与分组。
- **注册斜杠命令。** 在 `session.start` 中使用 `$.command.register`，然后在 `command.run` 上响应它。
- **读取文件。** 对于 Write 操作，`$.fs.read` 在写入生效前获取旧内容，因此差异是真实的。
- **放置位置是界面的职责。** 在全屏模式下，面板停靠在右侧。在 80 列宽度下，它以内联方式在提示符上方打开。无论哪种方式，mod 都绘制相同的树。

![一个高大的终端窗口，提示符上方有一个洋红色边框的方框：编号步骤条、文件 greet.js、一行差异，以及 Prev、Next 和 Close 按钮。](https://claude.dev/media/bb2b908077c752f4e43672b5d5e7b0d262756bf27303d0884634cd142487f996.png)

*80 列宽度下的 Replay Theater，以内联方式绘制在提示符上方*

### 值得养成的四个习惯

- **依赖 Claude Code 为你编写的类型。** 每次加载你的 mod 时，Claude Code 都会将你的构建声明写入 mod 的 `.claude-plugin/types/` 文件夹，因此你的编辑器和 `tsc -p` 无需额外步骤即可正常工作。它们是每个事件、`$` 上的每个方法以及每个元素属性的参考。
- **从 `e.props` 读取属性。** `hasSurvey`、`bodyColumns` 等属性都位于此处，而不是 `e` 本身。
- **为热重载做好准备。** 每次保存都会再次运行 `register` 和 `session.start`，因此请将数据保存在 `$.state` 中，而不是模块变量中。
- **当绘图不显示时，读取日志。** 运行 `claude --debug`，查找提示某个钩子返回了无法验证的树的日志行。

### 你将 mod 什么？

这里的三个 mod 各源于一个问题：*我的上下文有多满？*、*这个命令将要删除什么？*以及*Claude 刚刚改变了什么？* 你的问题会不同，而这正是关键所在。以下是一些可以开始的思路：

- 来自 `$.session.usage()` 的成本或速率限制仪表，以 `$.ui.status` 作为状态行
- 一个 `prompt.submit` 钩子，为每个提示添加你团队的约定
- 一个列出 Claude 本次会话所读取文件的窗格，作为它所看到内容的实时地图
- 一个专注计时器，当长时间轮次结束时通过 `$.ui.toast` 发送提示
- 一个针对你的技术栈调优的 `tool.call` 防护，例如生产环境的 kubectl 上下文或 `terraform apply`

#### 分享你构建的作品

你做了一个现在每天都使用的 mod 吗？在 X 或 LinkedIn 上发布它，附上 GIF 或运行中的截图，这样其他开发者就能看到可能实现的功能。将插件放到市场上（[分享你的 mod](https://claude.dev/blog/getting-started-with-claude-code-mods/#sharing-your-mod)）并附上链接，这样任何喜欢它的人都可以通过三条命令安装。
