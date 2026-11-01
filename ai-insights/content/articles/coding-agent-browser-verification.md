---
title: "一套验收流程：AI 写完代码后，自己开浏览器实操、验证页面效果、交出证据"
date: 2026-10-21T00:00:00.000Z
tags: ["AI 实操", "Agent", "浏览器", "Playwright", "开发工具", "聚合"]
summary: "从读改动、启动应用，到操作、保存、刷新、修复复测和交付证据，把一次完整验收交给 Agent。再用项目规则、Skill 和可选工具把它复用起来。"
---
> **原文链接**: [https://www.freecodecamp.org/news/how-to-make-your-coding-agent-check-its-work-in-the-browser/](https://www.freecodecamp.org/news/how-to-make-your-coding-agent-check-its-work-in-the-browser/)
> **来源**: www.freecodecamp.org
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/coding-agent-browser-verification/) · 2026/10/21
> **说明**: 本文由 AIHot 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

![timothy ogbemudia](https://cdn.hashnode.com/uploads/avatars/5cf591dcaa34a8856803ec56/b865b84e-9ba4-4241-a118-c10865189843.png)
  
        

        
            
                [timothy ogbemudia](https://www.freecodecamp.org/news/author/glamboyosa/)
            
            
        
    

                        
                    
                
                

![如何让你的 Coding Agent 在浏览器中检查自己的工作](https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/cbbc37b8-4405-4aa3-a691-0d7c7301baf2.png)

                
                    
                        
                            

我受够了 coding agents 在根本没有人打开过前端的情况下,就告诉我前端工作已经完成了。

你大概见过这套流程。Agent 改了一些代码,运行格式化工具、类型检查器和测试,一切都返回绿色通过,然后你收到某种版本的“已实现并验证”。

但到底是怎么验证的？通过的测试套件是有用的证据,但它不等于打开应用并实际使用刚刚改动的那个东西。

我遇到过很多次改动,代码看起来合理、测试也通过了,但 UI 依然存在那种一个人大约三秒钟就能发现的问题。一个控件与另一个元素重叠。一个在 store 里存在的选中状态,却没有在屏幕上高亮显示。Reset 在一条路径上正常工作,在另一条路径上却不行。一个更新了状态却把旧数据留在页面上的过滤器。Save 看起来没问题,直到你刷新页面。一个绘制顺序错误的地图图层。一个技术上能打开、却在屏幕上放不下的 modal。

Agent 测试过它的代码,但没有人测试过这个应用。所以我开始把浏览器审查纳入所有面向用户的功能的完成标准中,几周之后,这个习惯变成了一款工具。我会在接近文末的地方介绍它。

在这篇文章中,你将学到如何通过 Playwright MCP 给 coding agent 一个真实的浏览器,以及如何编写指令,让它测试自己刚做的改动,而不是仅仅确认页面能加载。

你将看到如何让 agent 按照你项目已有的方式启动你的应用,如何在 `AGENTS.md` 和一个可复用的 skill 之间拆分这些指令,为什么一个独立的 reviewer agent 能发现作者遗漏的 bug,以及如何让 agent 只清理它自己启动的东西。

在最后一部分,我将介绍 katalepsis——这款工具最终演化成的开源项目,包括它如何判断一项检查是否真正通过。

### 目录

- [前提条件](https://www.freecodecamp.org/news/how-to-make-your-coding-agent-check-its-work-in-the-browser/#heading-prerequisites)
- [Agent 缺失的那个环节](https://www.freecodecamp.org/news/how-to-make-your-coding-agent-check-its-work-in-the-browser/#heading-the-loop-agents-are-missing)
- [为什么仅有浏览器还不够](https://www.freecodecamp.org/news/how-to-make-your-coding-agent-check-its-work-in-the-browser/#heading-why-a-browser-on-its-own-falls-short)
- [如何启动真实的应用](https://www.freecodecamp.org/news/how-to-make-your-coding-agent-check-its-work-in-the-browser/#heading-how-to-start-the-real-app)
- [指令放在哪里](https://www.freecodecamp.org/news/how-to-make-your-coding-agent-check-its-work-in-the-browser/#heading-where-the-instructions-live)
- [为什么 Reviewer 应该独立工作](https://www.freecodecamp.org/news/how-to-make-your-coding-agent-check-its-work-in-the-browser/#heading-why-the-reviewer-should-work-independently)
- [清理你自己启动的东西,且只清理你自己的](https://www.freecodecamp.org/news/how-to-make-your-coding-agent-check-its-work-in-the-browser/#heading-clean-up-after-yourself-and-only-yourself)
- [当 Skill 不再够用的时候](https://www.freecodecamp.org/news/how-to-make-your-coding-agent-check-its-work-in-the-browser/#heading-when-a-skill-stopped-being-enough)
- [如何试用 katalepsis](https://www.freecodecamp.org/news/how-to-make-your-coding-agent-check-its-work-in-the-browser/#heading-how-to-try-katalepsis)
- [katalepsis 的底层工作原理](https://www.freecodecamp.org/news/how-to-make-your-coding-agent-check-its-work-in-the-browser/#heading-how-katalepsis-works-under-the-hood)
- [我使用它之后发生了什么](https://www.freecodecamp.org/news/how-to-make-your-coding-agent-check-its-work-in-the-browser/#heading-what-happened-when-i-used-it)
- [我最终的结论](https://www.freecodecamp.org/news/how-to-make-your-coding-agent-check-its-work-in-the-browser/#heading-where-i-landed)

### 前置条件

这不是一篇入门教程，因此最好具备：

- 有一定的 coding agent 使用经验，要求支持 MCP(Model Context Protocol),比如 Claude Code、Codex 或 Cursor,并且大致知道如何给它下达指令。
- 一个可以通过 dev 脚本在本地运行的 Web 应用，用 JavaScript 或 TypeScript 编写。示例使用的是带 `pnpm` 的 Node 项目，但不依赖任何特定框架。
- 基础的 Playwright 知识：知道 test、locator 和 assertion 长什么样。跟着学习前半部分不需要现成的测试套件。
- 运行 Playwright MCP 需要 Node.js 20 或更新版本；如果想安装 katalepsis,则需要 Node.js 22.12 或更新版本以及 Git。
- 熟悉终端和 Git,因为 agent 会启动进程并查看 `git status`。

### Agent 所缺失的闭环

Coding agent 之所以很快变得实用，很大程度上是因为它们对代码已经有了一套不错的反馈闭环：读取、编辑、运行 formatter 和测试、阅读失败信息、再试一次。谁都不必在一次孤注一掷的尝试中就做到完美。

对于前端工作，明显缺失的输入就是前端本身。我想要的循环要更进一步：编辑代码、运行测试、启动应用、使用被改动的功能、观察发生了什么、修复坏掉的部分，然后再使用一次。

最后这一步比你想的更重要。Agent 们非常乐于告诉你某个修复“现在应该可以了”，而我更希望它们直接重新打开页面去验证。

Playwright MCP 正是给它们这种能力的好方法。我之前已经用 Playwright 做 E2E 测试了，但这个 MCP server 有用是出于另一个原因：它直接把浏览器交到 agent 手里。它可以打开 localhost、读取页面、找到控件、点击和输入、检查变化，并截图。

这和让 agent 运行 `pnpm playwright test` 不是一回事。测试套件告诉你的是：你之前写下的那些场景是否依然通过。而浏览器审查要问的是：这次改动可能影响到哪些地方，然后亲自去看。

如果 agent 重构了一些共享的 map-layer 工具函数，测试可能只覆盖了其中几个 helper。但从 diff 出发，它还能推断出这些代码会在初始渲染、选择、过滤和重置时执行，并逐一尝试。这更接近我自己审查前端工作的方式。

配置很简单。你需要 Node 20 或更新版本，以及一个支持 MCP 的客户端：

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

一个快速的 sanity check 是让 agent 打开 Playwright TodoMVC 演示，添加一个名为 "Browser QA" 的 todo,并确认它显示出来了。如果它能做到这一点，就说明它有浏览器可用。而它能用浏览器做什么，才是更难的部分。

### 为什么仅有浏览器还不够

给 agent 一个浏览器，只是给了它“看”的能力。这并没有告诉它该看什么、看到什么程度、以及什么才算证据；缺少这些，它就会退回到技术上勉强涉及浏览器的最省事做法。拥有 Playwright 的 agent 依然可能做出弱到可笑的 QA。我收到过这样的报告：

```text
Opened /route.
Page loaded successfully.
Browser verification complete.
```

这是一份关于“打开了页面”的报告，而不是关于“测试了改动”的报告。其中没有任何内容能抓住本文开头提到的那些 bug。

所以浏览器需要配套的指令。接下来就是我为“agent 应如何审查自己的前端工作”写下的规则：测什么、查什么、以及要带回什么证据。它们最初只是我在 prompt 里反复重复的几句话，后来演变成了你在后面章节会看到的 browser-review skill。

我确定的第一条规则是：审查必须源于改动本身。如果它改了 filter,就去使用那个 filter。如果它改了重置逻辑，就先修改一些状态再重置。如果它动了持久化，就刷新页面。如果它改了 modal,就打开再关闭 modal;如果它改了响应式布局，就调整 viewport 大小。

这些由人说出来听起来都是显而易见的，但如果你的 agent 指令只写着“验证应用能正常工作”，那这些一点都不明显。

实际上，这意味着 Agent 会先阅读 diff,在接触浏览器之前将其转化为一份简短的测试计划。对于一个 filter bar 的改动，我期望的计划大致如下：

```text
Changed: src/features/projects/FilterBar.tsx, src/features/projects/useFilters.ts

Plan:
1. Open /projects and note how many rows are showing.
2. Filter by Status: Active. Every row should say Active.
3. Add Owner: me on top. The list should narrow again.
4. Clear filters. The original row count should come back.
5. Apply a filter and refresh. The filter lives in the URL, so it should survive.
```

接着，它通过 Playwright MCP 暴露的浏览器工具来执行这份计划。前几步调用的精简版本如下：

```text
browser_navigate   { "url": "http://localhost:5173/projects" }
browser_snapshot   {}                      → table with 40 rows
browser_click      { "element": "Status filter", "ref": "e14" }
browser_click      { "element": "Active option", "ref": "e31" }
browser_snapshot   {}                      → table with 12 rows, all "Active"
browser_click      { "element": "Clear filters", "ref": "e15" }
browser_snapshot   {}                      → table with 40 rows
```

这些 `ref` 值来自 accessibility snapshot,Agent 正是借助它来定位控件，而无需去猜 CSS 选择器。

这在一个修复交互地图上 cursor 卡在 hover 状态的 PR 上得到了回报。该 PR 新增的单元测试在旧代码上同样能通过，因此并不能证明修复确实有效。真正能证明这一点的，是 Agent 打开应用、在 interactive layers 上移入移出，并观察 cursor 是否恰好在应有的时机变化和复位。

第二条规则是检查最终结果，而不是交互过程本身。“我点击了 Reset,没有任何报错”说明不了什么。你真正关心的是 reset 能把一切恢复原状。保存也是如此：真正的断言是，你可以修改一个设置、保存、刷新，它依然还在。

写成 Playwright 测试，这个断言如下所示。重要的是最后一行，它在 reload 之后运行：

```ts
import { test, expect } from "@playwright/test";

test("weekly digest setting survives a reload", async ({ page }) => {
  await page.goto("/settings/notifications");
  await page.getByRole("switch", { name: "Weekly digest" }).click();
  await page.getByRole("button", { name: "Save" }).click();

  await page.reload();

  await expect(page.getByRole("switch", { name: "Weekly digest" })).toBeChecked();
});
```

Agent 并不需要写出这个测试来遵循这条规则。通过 MCP,它手动完成同样的事情：点击、保存、`browser_navigate` 到相同的 URL,然后从一份新的 snapshot 中读取 switch 的状态。

我还会根据问题类型要求不同的证据。URL 是否变化、button 是否被禁用、dialog 是否打开，这些是关于 DOM 和浏览器状态的问题，而非截图的问题。至于 dialog 是否被裁剪、两个元素是否重叠、文字在手机上换行是否糟糕，则是视觉问题，这正是截图派上用场的地方。有时两者都需要，因为一个 modal 可能安然存在于 DOM 中，在屏幕上却无法使用。

对于布局改动，这意味着调整视口尺寸并捕获用户实际会看到的内容：

```text
browser_resize            { "width": 375, "height": 812 }
browser_click             { "element": "Export button", "ref": "e22" }
browser_take_screenshot   { "filename": "export-dialog-375.png" }
browser_resize            { "width": 1440, "height": 900 }
browser_take_screenshot   { "filename": "export-dialog-1440.png" }
```

既然已经进去了，Agent 也不妨顺便看看 console,以及在功能依赖 API 调用时看看 network。不过，我只关心这次改动引入的错误。一个在 `main` 上存在了六个月的 warning 不应该干扰每一次 review,而一个仅发生在客户端的 transition 也用不着 network 审计。但如果一个看似“成功”的保存实际上返回了 `500`,我希望被告知。

`browser_console_messages` 和 `browser_network_requests` 返回的是页面记录的日志和发出的请求，因此即使 UI 看上去一切正常，保存失败也会以这样一行信息暴露出来：

```text
[PUT] http://localhost:5173/api/settings => [500] Internal Server Error
```

把这些规则组合起来，本节开头那份含糊不清的报告就变成了我能真正核查的东西：

```text
Route: /settings/notifications
Did: turned on "Weekly digest", clicked Save, reloaded the page.
Checked: switch still on after reload (aria-checked="true");
  PUT /api/settings returned 200; no new console errors.
Screenshots: settings-375.png, settings-1440.png (label wraps cleanly on mobile)
Tests: pnpm test settings (14 passed)
Found and fixed: Save stayed disabled after the first save. Fixed in
  SettingsForm.tsx, then went through the flow again.
```

### 如何启动真实应用

在应用运行起来之前，Agent 什么都无法测试，而这正是它最容易走捷径的地方。

我不想在每个仓库里都写上"运行 `pnpm dev`",所以流程让 Agent 自己搞清楚项目如何启动。它先查看 `package.json` 里的 `dev` 脚本，再看 README 中记载的内容，只有当应用实在无法以其他方式合理运行时，才会退回到现有的 Docker 配置。

这里的流程就是 browser-review skill 中的 "Start the application" 一节，下一节会完整展示。在一个典型的 Vite 或 Next.js 项目中，按流程操作大致如下：

```bash
## 1. How does this project start?
jq .scripts package.json
## {
##   "dev": "vite",
##   "build": "vite build",
##   "test": "vitest run",
##   "e2e": "playwright test"
## }

## 2. Start the dev server in the background, in a temp folder the agent owns,
##    and record the PID so it can stop exactly this process later.
QA_DIR=$(mktemp -d)
pnpm dev --port 5173 > "$QA_DIR/dev.log" 2>&1 &
echo $! > "$QA_DIR/dev.pid"

## 3. Wait until the server answers before opening a browser.
until curl -sf http://localhost:5173 > /dev/null; do sleep 1; done
```

如果没有 `dev` 脚本，接下来就查 README;如果 README 说应用需要通过 `docker compose up` 启动 Postgres 和 Redis,Agent 就使用那个 compose 文件，并记录它启动了哪些容器，而不是自己另写一个。

我真正不希望的是 Agent 为了让测试更容易而改动应用本身：不要临时的 auth bypass,不要假服务器，不要改 `.env`,也不要仅仅因为搞不清真实配置就添加一条用完即弃的路由。关键是，被测试的必须是我真正要交付的软件。

我说的就是这种改动——当登录页面挡在面前时，Agent 确实很容易伸手去改：

```diff
- if (!session) redirect("/login");
+ if (!session && process.env.NODE_ENV !== "development") redirect("/login");
```

如果 Agent 无法用项目文档中记录的测试账号或 seed data 通过认证，正确的做法是停下来，报告 browser review 被阻塞以及原因。被阻塞的 review 是诚实的；对一个关掉了 auth 的应用所做的 review,已经不是对我这个应用的 review 了。

### 指令放在哪里

我的第一反应是不断往 `AGENTS.md` 里加内容。它已经记录了仓库中每个 Agent 都应该知道的规则：项目结构、约定、测试哲学、改动要精准克制、不要写无意义的注释。

我正准备再加一百来行，内容涉及启动应用、浏览器设置、点什么、截图、console 错误和清理收尾……但总有一天，这个文件就不再是操作说明，而变成一部小小的宗教经文了。

了解这些文件各自实际是如何被使用的会有帮助。`AGENTS.md` 是一个纯 Markdown 文件，Codex 这类 coding agent 在该仓库每次 session 开始时都会自动读取它，Claude Code 对 `CLAUDE.md` 也是同样处理。里面的所有内容都会进入 Agent 处理每个任务时的 context——无论是修一个 CSS 还是做一次数据库迁移。因此它在每次运行中都消耗 context,并且处处生效。

Skill 的工作方式不同。它是一个包含 `SKILL.md` 文件的文件夹,文件开头是简短的 `name` 和 `description`。会话开始时,agent 只能看到那个 name 和 description,每个 skill 仅占一两行。当某个任务与 description 匹配,或者另一条指令指向该 skill 时,agent 才会读取文件的其余部分并遵循它。因此,你可以编写冗长、详细的流程,而在需要之前几乎不占用任何开销。

我最终采取的做法是把 `AGENTS.md` 当作宪法,把 skills 当作操作手册(playbook)。宪法很短,适用于所有情况,只说明什么必须成立,而不解释如何做到。操作手册是针对某一类情境的逐步流程,只有当你身处那种情境时才会把它拿出来用。

在这种设置下,`AGENTS.md` 规定:面向用户的工作在浏览器中检查过之前不算完成,而 browser-review skill 则说明如何进行检查:

```text
/
├── AGENTS.md
└── .agents/
    └── skills/
        ├── browser-review/
        │   └── SKILL.md
        ├── pr-review/
        │   └── SKILL.md
        └── grill-me/
            └── SKILL.md
```

`AGENTS.md` 中的规则保持简短,并且始终可见:

```md
### Browser Verification

User-visible work is not complete until the affected behavior has been
verified in the running application.

For user-visible changes, follow `.agents/skills/browser-review/SKILL.md`.

A successful build, type check, unit test suite, or E2E test suite does
not replace browser verification.

Do not commit browser-verification artifacts. Stop anything you started
for verification and clean up before hand-off.
```

skill 存放具体的流程,只在需要时才被加载。我使用 Codex 和 Claude Code,因此有一个全局的 `AGENTS.md` 供 Claude 的 `CLAUDE.md` 导入,还有一个两者共同读取的共享 skills 文件夹。无论当天我用的是哪个 agent,它都遵循同一套 playbook。

导入只需一行,因为 Claude Code 允许 `CLAUDE.md` 使用 `@` 引入另一个文件:

```md
@~/.codex/AGENTS.md
```

下面是我最初编写的那份的精简版本:

```md
---
name: browser-review
description: Verify user-visible changes in the running application with Playwright MCP.
---

## Browser Review

### Before verification

Run `git status --short` and remember what was already there. Don't touch
pre-existing work.

Read the task and the diff. Work out the affected routes, the changed flow,
the loading, empty, error, selected and disabled states that matter,
whether anything needs to survive a refresh, and what nearby behavior
could regress.

### Start the application

Use the repository's dev script, then its documented local setup, then its
existing Docker setup. Don't invent a new startup config and don't change
app behavior to make QA easier. Record every process and container you start.

### Exercise the change

Don't stop once the page loads. Go through the whole changed flow and check
the final result. Use browser or DOM state for functional claims and
screenshots for visual ones. Report new relevant console errors and failed
requests, not old warnings.

If something is broken, fix the smallest cause, rerun the affected tests
and go through the flow again. Don't assume the fix works.

### Cleanup

Teardown is required even when verification fails. Close browsers, stop
servers and containers, and delete screenshots, traces and other artifacts,
but only the ones you created. Run `git status --short` again before
hand-off. Never run `git add`, `git commit` or `git push`.

### Report

Say which routes you tested, what you did, which states you checked, what
tests you ran and what you found and fixed. If you couldn't finish, say why.
```

这些内容没有任何巧妙之处。价值在于它成为了默认的预期,所以我不必依赖 agent 自行决定是否应该打开浏览器。

### 为什么审查者应当独立工作

明显的弱点在于:判断工作是否完成的 agent,正是编写这些工作的同一个 agent。这仍然有价值,毕竟我自己也会测试自己写的代码,但它一开始就带着一套关于实现如何运作的预设理论。

我所说的 theory,指的是作者对它自己这次改动的心智模型:它动了哪些代码,它认为这些代码会影响什么,以及同样重要的——它认为自己没有影响什么。它的测试计划直接源自这个模型。于是它只测试自己打算改动的路径,这些路径确实正常工作,而它从不去看那些它没意识到也被牵涉进去的路径。这和人们测试自己代码时的盲点一模一样,也正是那些逃过 review 的 bug 往往藏身之处。

因此,当第二个 agent 来 review 一个分支时,我会让它自己推导出测试范围。我的全局规则现在要求一个没有任何对话历史的新 reviewer:它只拿到原始需求、diff 和 review skill,而不带任何关于作者为什么认为它能正常工作的信息。它自行判断这段代码可能影响什么并据此测试,不依赖作者的截图、QA 记录或全绿的测试运行结果。

给这个 reviewer 的 prompt 刻意保持简短:

```text
You are reviewing a branch you did not write.

Original request:
  Make the E2E app URL configurable through E2E_BASE_URL so the
  tests can run against any port.

Run `git diff main...HEAD` to see the change. Follow the browser-review
skill. Work out for yourself what this change could affect, test that,
and report what you checked with evidence.
```

到目前为止最漂亮的一次发现,来自一个让端到端测试 setup 的 app URL 变为可配置的 PR。reviewer 注意到种子测试数据仍然把图片 URL 硬编码到旧端口,并把 app 跑在另一个端口上验证了这一点。三个图片请求发往了错误的端口并失败,页面则悄悄地在原本应该显示图片的位置渲染了 fallback 卡片。没有任何异常抛出。

简化之后,改动完成时全局 setup 大致如下:

```ts
// e2e/global-setup.ts
const baseURL = process.env.E2E_BASE_URL ?? "http://localhost:8080";

await seedDatabase({
  media: [
    { id: "m1", url: "http://localhost:8080/test-media/cover-1.jpg" },
    { id: "m2", url: "http://localhost:8080/test-media/cover-2.jpg" },
    { id: "m3", url: "http://localhost:8080/test-media/cover-3.jpg" },
  ],
});
```

作者的 theory 是"app URL 现在来自 `E2E_BASE_URL`",而它跑的每个测试用的都是默认端口,恰好硬编码的 URL 在这个端口上是对的。reviewer 没有这样的 theory。它通读了 diff 触及的整个 setup 文件,把 app 跑在 8081 端口上,然后带回了下面这份报告:

```text
Found: seeded media URLs in e2e/global-setup.ts still point at :8080.
Ran the app with E2E_BASE_URL=http://localhost:8081.
Network: 3 requests to http://localhost:8080/test-media/... failed
  (net::ERR_CONNECTION_REFUSED).
Screen: the gallery rendered 3 fallback cards instead of images
  (gallery-8081.png).
Suggested fix: build the seeded URLs from E2E_BASE_URL, or make them
  relative.
```

修复只需要每个 URL 改一行:

```ts
{ id: "m1", url: new URL("/test-media/cover-1.jpg", baseURL).href },
```

一个只检查卡片是否存在的测试,无论哪种情况都能通过,因为 fallback 卡片毕竟也是卡片。只有去看页面本身和 network 标签页,你才能发现问题——一个 bug 道尽了本文的全部论点。

### 只清理你自己产生的东西

一旦 agent 能够启动 server 和浏览器,清理就成了设计中的一部分。否则每个 session 都会留下一层残留:一个游离的 node 进程、一个 Chromium 窗口、一些截图、一个 Playwright trace、一个临时 auth 文件,或一个 Docker 容器。

不过,"清理一切"是错误的解法。`pkill node` 不叫清理,那是 agent 在小范围撒野,它会毫不犹豫地把你另一个终端里启动的 dev server 也一并杀掉。`git clean -fd` 会删掉一个和 agent 毫无关系的未跟踪文件。

规则是:清理自己创建的东西,其余一概不动;而前后各一次 `git status`,就是为了让 browser QA 的产物不会悄悄混进我的下一次 commit。

这正是启动步骤会把 PID 记录到临时文件夹的原因。这样,清理就可以做到足够精确:

```bash
## Not cleanup
pkill node
git clean -fd

## Cleanup
kill "$(cat "$QA_DIR/dev.pid")"
rm -rf "$QA_DIR"
```

而这大致就是我希望在一次 review 结束时看到的样子：

```text
Cleanup
- Stopped the dev server I started (pid 48213, pnpm dev --port 5173).
- Closed the Playwright MCP browser.
- Deleted export-dialog-375.png and export-dialog-1440.png.
- Left running: pid 39102 (pnpm dev on :3000). It was already running
  before I started, so it isn't mine.

git status --short before review:
 M src/features/export/ExportDialog.tsx
?? notes/todo.md

git status --short after cleanup:
 M src/features/export/ExportDialog.tsx
?? notes/todo.md
```

两段 `git status` 输出完全一致，这说明 review 中产生的任何东西都没有泄漏到工作区，而那个原本就存在的未跟踪 notes 文件也依然还在。

这条规则也不是我凭空编出来的。在我构建接下来要描述的这个工具时，负责测试它的 Agent 运行了一条 cleanup 命令，把我机器上的所有 Playwright 浏览器都关掉了，而不仅仅是它自己打开的那些。平心而论，它在总结里主动承认了这件事。

### 当 Skill 不再够用时

这个 Skill 确实起作用了——Agent 开始真正打开应用了。但我拿回来的仍然只是一段文字。Agent 会告诉我它打开了页面、点完了整个流程、一切看起来都正常，而我只能选择相信它。

这和我最初面对的是同一个问题，只是上移了一个层级。我不想要一句描述浏览器的更漂亮的话，我想要的是证据：检查了什么、哪些通过、哪些失败，以及支撑这些结论的截图和 trace,而且要以一种能直接放进 PR、供后续 review 的人查看的形式呈现。

于是我写了一份构建计划，花了一个周六把它做出来，与 Claude Code 结对，按里程碑推进并进行多轮独立 review。它叫 [katalepsis](https://www.katalepsis.glamboyosa.xyz/),取自斯多葛学派的一个词，意为把某件事把握得如此清晰，以至于你不可能弄错——对一次 pull request 来说，这似乎是个合理的标准。

你把一个 preview URL 交给它，它就会产出一份报告：HTML、可以直接粘贴进 PR 的 Markdown,以及一个 JSON manifest。

它做两件事。`katalepsis run` 针对 preview 运行你已有的 Playwright 测试，并以 Playwright 的结果为最终结论。katalepsis 只负责整理、脱敏和打包，从不重新解读任何断言。

`katalepsis verify` 接受用平实英文描述的检查项，用于覆盖那些还没有人为之编写测试的行为，由模型驱动一个真实浏览器，使用你自己的 Anthropic、OpenAI 或 OpenRouter key。它还附带一个 MCP server,因此刚刚完成修改的 Agent 可以自己运行其中任何一个命令，并读取生成的报告。

### 如何试用 katalepsis

katalepsis 还没有发布到 npm,因此安装脚本会克隆仓库并进行构建。它需要 Node 22.12 或更新版本、Git,以及 pnpm 10(或 Node 自带的 corepack):

```bash
curl -fsSL https://www.katalepsis.glamboyosa.xyz/install.sh | sh
```

这会在 `~/.local/bin` 中放入两个启动器:`katalepsis` 和 `katalepsis-mcp`。

要针对 preview 运行你已有的测试，你的 Playwright 配置必须使用 katalepsis 传入的 URL。同时建议开启失败证据选项，这样报告里才有内容可以展示：

```ts
// playwright.config.ts
use: {
  baseURL: process.env.KATALEPSIS_BASE_URL ?? "http://localhost:3000",
  screenshot: "only-on-failure",
  video: "retain-on-failure",
  trace: "retain-on-failure",
},
```

仓库中包含一个小型演示应用——一个带有故意埋下的 bug 的注册表单：提交空表单时什么都不做，而不是显示错误提示。它有三个 Playwright 测试。下面是对它的一次真实运行：

```text
$ katalepsis run --cwd apps/demo-form --url http://127.0.0.1:4173
katalepsis: FAILED
  2 passed, 1 failed, 0 blocked, 0 not tested
  Preview commit: not reported, so unconfirmed
  Report: artifacts/katalepsis/2026-10-19T08-21-25-288Z-3dba5a/report.html
  Markdown: artifacts/katalepsis/2026-10-19T08-21-25-288Z-3dba5a/report.md
```

Markdown 报告本来就是用来粘贴进 PR 的。它的开头如下：

```md
## katalepsis report: Failed

**2 passed, 1 failed, 0 blocked** out of 3 checks run.

- Preview: http://127.0.0.1:4173/
- Preview commit: not reported, so unconfirmed
- Runner: katalepsis 0.1.0, Playwright 1.63.0, Node 22.22.0

### Checks

| Status | Check | Project | Location | Duration |
| --- | --- | --- | --- | --- |
| Failed | signup form › empty submission shows a required-field error | chromium | signup.spec.ts:8 | 3.2 s |
| Passed | signup form › valid submission shows a confirmation | chromium | signup.spec.ts:13 | 418 ms |
| Passed | signup form › malformed email shows an email error and does not submit | chromium | signup.spec.ts:20 | 449 ms |

#### Failed: signup form › empty submission shows a required-field error

- Failure type: assertion
- Evidence: screenshot, video, log, trace
```

在那之后,报告还包含 Playwright 自身的失败信息(`getByRole('alert')` 从未出现),以及一系列局限性说明,例如预览未报告它是从哪个 commit 构建的。

对于没有测试覆盖的行为,你可以用平实的英语编写检查项。每个检查项都有一个 intent(意图),即要做什么;以及一个 pass condition(通过条件),即结束时必须满足什么:

```json
{
  "checks": [
    {
      "id": "empty-form",
      "name": "Empty form validation",
      "intent": "Submit the signup form without filling it",
      "passCondition": "A required-field error is visible"
    },
    {
      "id": "invalid-email",
      "name": "Invalid email",
      "intent": "Fill the name, enter an invalid email address and submit",
      "passCondition": "An email validation error is visible and the success confirmation is not shown"
    }
  ]
}
```

然后,你给 katalepsis 提供一个 key 并运行这些检查项。key 存储在操作系统的 keychain 中,或从环境变量读取,绝不会通过命令行传递:

```text
$ katalepsis auth set openrouter
$ katalepsis verify --cwd apps/demo-form --url http://127.0.0.1:4173 --checks checks.json \
    --provider openrouter --model anthropic/claude-haiku-5.5
katalepsis: FAILED (openrouter/anthropic/claude-haiku-5.5)
  2 passed, 1 failed, 0 blocked
  Preview commit: not reported, so unconfirmed
  Report: artifacts/katalepsis/2026-10-10T12-45-05-343Z-b51a0a/report.html
```

示例的完整 `checks.json` 包含三个检查项,其中 agent 检查发现了与 Playwright 测试相同的空表单 bug,而无需任何人编写那个测试。

最后,为了让编码 Agent 自己完成这一切,你需要注册 MCP server。在 Codex 中,命令如下:

```bash
codex mcp add katalepsis -- katalepsis-mcp --root /path/to/your-app
```

该 server 暴露三个工具:`verification_run_tests`、`verification_check_browser` 和 `verification_get_report`,并且只在你指定的文件夹内工作。实践中,给 Agent 的指令就变成了类似这样的话:"修改注册表单后,针对这次修改运行 `verification_check_browser`,并将 Markdown 报告粘贴到你的总结中。"

### katalepsis 的底层工作原理

其中有几个设计决策直接源自本文中讨论的问题。下面来看看它们在代码中是如何实现的。

katalepsis 是一个包含五个包的 TypeScript monorepo:

- `core`(结果 schema、Playwright runner 以及报告渲染器)
- `agent`(`verify` 所用的浏览器工具与证据规则)
- `credentials`(key 与偏好设置)
- `mcp`(MCP server)
- `cli`

它在与错误、取消和依赖关系相关的部分使用 Effect,例如运行 Playwright 和探测预览;报告格式则使用 Effect Schema。`verify` 中的模型循环使用 Vercel AI SDK,因此同一份代码可以与 Anthropic、OpenAI 和 OpenRouter 配合工作。

#### 报告是一个 Schema,而不是一段日志

每次运行,无论来自 Playwright 还是来自模型,都会先解码为同一个 `VerificationRun` 结构,然后才会写入任何内容。单个 check 的精简版本如下:

```ts
export const CheckStatus = Schema.Literals(["passed", "failed", "blocked"]);

export const VerificationCheck = Schema.Struct({
  id: Schema.String,
  source: Schema.Literals(["playwright-test", "agent"]),
  title: Schema.String,
  status: CheckStatus,
  flaky: Schema.Boolean,
  failure: Schema.NullOr(Schema.Struct({ code: FailureCode, message: Schema.String })),
  attempts: Schema.Array(Attempt),
  evidence: Schema.Array(BundlePath),
});
```

从未运行的测试会进入单独的 `notTested` 列表并附带原因,这样最终就有四种结果:passed、failed、blocked 或 not tested。每个证据文件都连同其 SHA-256 hash 一起存储,并且 `BundlePath` 会拒绝绝对路径和 `..`,因此报告无法指向其自身文件夹之外的内容。

#### Blocked 不等于 Failed

如果预览挂了,你会得到一次 blocked 的运行,而不是三个 failed 的测试,后者会让你去追查根本不存在的 bug。在启动 Playwright 之前,katalepsis 会对预览 URL 发起一次请求。下面是这个 probe 的核心部分:

```ts
const UNAVAILABLE_STATUSES = new Set([502, 503, 504]);

const response = await fetch(url, {
  redirect: "manual",
  signal: AbortSignal.any([signal, AbortSignal.timeout(30_000)]),
});
if (UNAVAILABLE_STATUSES.has(response.status)) {
  return { reachable: false, reason: `the preview answered with HTTP ${response.status}` };
}
```

网络错误或网关状态码会阻塞所有选中的测试,Playwright 根本不会启动。把 demo 指向一个没有任何服务监听的端口,你会得到如下结果:

```text
$ katalepsis run --cwd apps/demo-form --url http://127.0.0.1:4999
katalepsis: BLOCKED
  0 passed, 0 failed, 3 blocked, 0 not tested
  preview-unavailable: http://127.0.0.1:4999/ did not respond (connect ECONNREFUSED 127.0.0.1:4999). Playwright was not run.
```

#### Playwright 的判定是最终结论

`run` 会以 `--reporter=json` 参数启动项目自带的 Playwright 并读取结果文件,而不是重新实现任何东西。Playwright 本身就会把重试后通过的测试标记为 `flaky`,所以 katalepsis 保留这个标记,并列出每一次尝试。

它真正增加的是分类。如果失败消息指出 preview 自身的 origin 不可达,该失败会被归为 blocked;而第三方 API 挂掉则保持 failed,因为那是你的应用真实存在的问题。浏览器无法启动同样会被归为 blocked——这正是我第一次为本文运行 demo 时,在一台安装了错误浏览器构建版本的机器上遇到的情况。

#### 模型无权自行宣布通过

`verify` 中的模型可以点击、输入、读取页面,但它无权自行宣布通过。一个检查只有满足以下条件才算 pass:模型引用了 katalepsis 实际执行过、并且通过的某条浏览器 assertion,而且该 assertion 展示的是模型操作之前页面上不存在的东西。否则结果就是 blocked。

具体工作方式如下。模型只有一小组工具可用:`navigate`、`snapshot`、`click`、`fill`、`press`、`assert` 和 `finish`。`assert` 不会返回模型自己的看法。katalepsis 直接在浏览器里执行检查、截图,并给结果记录一个类似 `a3` 的 ID。模型调用 `finish` 时,必须引用这些 ID:

```ts
finish: tool({
  description: "Report the verdict once, citing assertion IDs such as a1.",
  inputSchema: schema(
    Schema.Struct({
      verdict: Schema.Literals(["passed", "failed", "blocked"]),
      summary: Schema.String,
      assertionIds: Schema.Array(Schema.String),
    }),
  ),
  execute: (verdict) => {
    onFinish(verdict);
    return "Recorded.";
  },
}),
```

接着,一个普通函数 `decideOutcome` 会把模型的主张与证据进行比对。以下是 pass 规则的精简版:

```ts
if (!cited.every((assertion) => assertion.passed)) {
  return "The agent reported a pass, but a cited assertion failed.";
}
const shown = cited.filter((assertion) => assertion.expectation === "visible");
if (shown.length === 0) {
  return "The agent reported a pass citing only hidden or URL assertions.";
}
if (!observeOnly && shown.every((assertion) => assertion.trueAtStart === true)) {
  return "The agent reported a pass, but everything it cited was already on the page before it acted.";
}
```

出现上述任何一条消息,该检查都会变成 blocked,错误码为 `no-evidence`。引用一个从未执行过的 assertion ID 同样会被判为 blocked。如果最后一条被引用的 assertion 之后有未被引用的 assertion 失败了,该函数也会阻塞这个 pass,因为最新的证据与结论不符。

之所以有 `trueAtStart` 这个条件,是因为我测试的某个模型试图通过引用 email 字段的标签来证明表单可用——而那个标签从始至终都在那里。

为了捕捉这种行为,每次检查会在两个独立的 browser context 中打开两份相同的起始页面。模型在其中一份上操作,另一份保持原样不动。当模型断言某个元素可见时,katalepsis 会在未被动过的那份页面上查找同一个元素,如果它也在那里,该 assertion 就会被标记 `trueAtStart: true`,无法仅凭它判定 pass。

#### 一次只执行一个操作

最初的实机运行还发现了并行 tool call 互相踩踏的问题,比如姓名被输进了 email 字段。模型喜欢一次发送多个 tool call,而两个相互竞争的 `fill` 调用会把内容输进当前获得焦点的字段。修复方案是让所有浏览器操作都经过一个 promise 队列:

```ts
private exclusive<A>(action: () => Promise<A>): Promise<A> {
  const next = this.queue.then(action, action);
  this.queue = next.catch(() => undefined);
  return next;
}
```

每个 action 都会等待前一个落定，无论它成功还是失败，而且失败不会污染队列、影响下一个 action。

#### 预算与边界

每次 agent 检查都在自己的浏览器上下文中运行，并开启 tracing,因此报告始终有一条 trace 可以回放。导航被限制在 preview 的 origin 加上你通过 `--allow-origin` 允许的范围内。模型有步数限制(`--max-steps`,默认 15)、token 限制(`--max-tokens`,200,000)和时间限制(`--check-timeout`,120 秒)，耗尽其中任何一项都会以原因被报告为 blocked,而不是 failure。查询字符串会从报告中的 URL 里被隐去。

#### 它是如何构建的

在写代码之前，我先写了一份按里程碑划分的构建计划。M0 是回顾我早先两个项目如何处理凭证和 provider,外加第一份架构决策记录和 monorepo 工具。M1 是 Playwright runner 和报告，M2 是使用你自己的 key 的 agent 检查，M3 是 MCP server。每个里程碑结束时，都会让一个没有任何历史记录的全新 agent 对照计划审查这项工作，也就是本文前文提到的那条独立审查者规则。

这些审查对工具的塑造比计划本身还要多。第一次审查返回了 15 项发现，其中包括这样一条规则：只有无法访问的 preview 才算 blocked,其他 host 仍归为 failed。M2 审查发现，模型可以通过引用一个什么也证明不了的 assertion 来拿到 pass,更严格的 pass 规则和那份未被触碰的页面副本正是由此而来。M3 审查发现，客户端中途退出会让 Playwright 及其浏览器继续运行，而且一个构造出来的 symlink 可以让报告工具读取项目之外的文件。所有这些问题现在都已修复并有测试覆盖。

### 我实际使用时发生了什么

在告诉任何人之前，我先对自己两个项目运行了它。Conclave 的测试套件返回 95 个 passed。一个更大的应用返回 137 个 passed 和一个 failure,是关于缩放级别的断言略有偏差。

那是一个我本来就有、却没注意到已经失败的测试，所以与其说 katalepsis 发现了这个 bug,不如说它让这个 bug 无法被忽视。这两个项目还都硬编码了 `baseURL`,这意味着它们的测试从未触及我传入的 URL。katalepsis 现在会对此发出警告，因为针对错误服务器跑出绿灯比不跑还糟。

我把它发到 LinkedIn 之后，有人在评论中指出，你检出的 commit 不一定就是 preview 构建时用的 commit。他们说得对，所以报告现在会同时记录两者，并标记为 confirmed、mismatched 或 unknown,而且 mismatch 会阻断原本可能通过的运行，因为针对过期 preview 的绿灯对你的 diff 毫无说明意义。

preview 通过 `x-commit-sha` 响应头或 `<meta name="commit-sha">` 标签报告自己的 commit,检查可用性的同一个 probe 会读取它们。如果你的主机两者都做不到，你可以自己传入 `--preview-commit`。

我正按照本文所描述的同一套指令进行 dogfooding。browser-review skill 现在会让我的 agent 先运行 katalepsis,对它还无法检查的内容再回退到普通的浏览器自动化：字段值、持久化、console 和 network,以及跨 viewport 的布局。

第一个接手这件事的 Codex 会话去寻找一个 "katalepsis skill",因为我在 `AGENTS.md` 里那句话的措辞，没找到，于是回退到了它原来的浏览器审查。出错的原因很蠢，但回退行为完全按预期执行了，而修复方法就是直白地写明 katalepsis 是一个 CLI,browser-review 才是那个 skill。

几天后，我在一个真实的工作分支上使用了它，这个改动把 GeoJSON 变成了主下载按钮，并把 CSV 和 KML 移进了下拉菜单。Agent 在运行任何东西之前就停了下来，因为 `verify` 会把页面内容发送给模型 provider,而我的规则规定，对某个应用执行这种操作前需要我的许可。这正是我想要的行为。

使用种子合成数据并得到明确 OK 后，检查通过了：一个可见的主按钮，下拉框展开后其他格式就会出现，报告中附有截图和 trace。该 skill 依然会将包含真实数据的页面留在 fallback 路径上。

### 我最终的结论

并非每个任务都需要这些。我不需要用 Playwright 来确认一个 Markdown 拼写错误已被修复，而不影响渲染结果的后端重构也不需要 Chromium。但对于组件、表单、导航、对话框、客户端状态、地图、筛选、响应式布局、持久化，以及任何用户可见的 bug 修复，我都希望用它。

我的经验法则是：如果你要对 UI 在运行时的行为做出断言，那么运行时 UI 就应该成为证据的一部分。

这些都不能取代良好的测试、code review，或是我对重要变更的亲自查看。它只是补上了原本缺失的反馈回路。Agent 已经拥有仓库和 shell，而且它知道自己改了什么。有了浏览器，它就能开始回答自己构建的东西是否真正可用；有了报告，它可以展示给我看，而不是口头告诉我。如果它能写出按钮，它就应该能点击它，并在宣布完成之前向我展示发生了什么。

katalepsis 采用 MIT 许可证，已发布在 [GitHub](https://github.com/glamboyosa/katalepsis) 上。如果 Agent 检查曾给你一个让你不敢相信的结果，我很想听听。

                        
                        
                            
                                
                                    
    
        

合作伙伴推荐的课程

        
            
    
    
        [(在新标签页中打开)](https://www.classcentral.com/?ref=fcc)
        广告
    

            
    
    

- [Udemy 上的 Learn Playwright with TypeScript (Web & API Testing) Pavan Kumar 4.6 星（满分 5 星）(5,047) 来自 5,047 条评分 2天21小时 2 天 21 小时 49 分钟 初级 证书 查看课程（在新标签页中打开）](https://www.classcentral.com/course/udemy-learn-playwright-web-api-testing-with-typescript-499736?go=1&ref=fcc)
- [Udemy 上的 Playwright Automation Testing 2026: TypeScript, AI & MCP Kaniel Outis 4.6 星（满分 5 星）(2,620) 来自 2,620 条评分 12小时59分钟 12 小时 59 分钟 初级 证书 查看课程（在新标签页中打开）](https://www.classcentral.com/course/udemy-automated-software-testing-with-playwright-125554?go=1&ref=fcc)
- [Udemy 上的 Playwright Practice: 30 Real-World Automation Exercises Rafał Podraza 4.9 星（满分 5 星）(37) 来自 37 条评分 7小时 7 小时 初级 证书 查看课程（在新标签页中打开）](https://www.classcentral.com/course/udemy-playwright-practice-automation-exercises-569331?go=1&ref=fcc)
- [Udemy 上的 Playwright: Web Automation Testing From Zero to Hero Artem Bondar 4.7 星（满分 5 星）(13,451) 来自 13,451 条评分 12小时43分钟 12 小时 43 分钟 初级 证书 查看课程（在新标签页中打开）](https://www.classcentral.com/course/udemy-playwright-from-zero-to-hero-294867?go=1&ref=fcc)

    
        [Class Central 上的更多 Playwright 课程 →（在新标签页中打开）](https://www.classcentral.com/subject/playwright?ref=fcc)
    

        
    

                                
                                
                                    
                                    
                                
                            
                        
                    
                    

---

                    
                        
                            
                                
    
    
    

    
        
            
    ![timothy ogbemudia](https://cdn.hashnode.com/uploads/avatars/5cf591dcaa34a8856803ec56/b865b84e-9ba4-4241-a118-c10865189843.png)
  
        

        
            
                [timothy ogbemudia](https://www.freecodecamp.org/news/author/glamboyosa/)
            
            
                
                    

阅读[更多文章](https://www.freecodecamp.org/news/author/glamboyosa/)。

---

如果这篇文章对您有帮助， .



免费学习编程。freeCodeCamp 的开源课程已帮助超过 40,000 人获得开发者工作。[立即开始](https://www.freecodecamp.org/learn)



来自我们合作伙伴的推荐课程


    
        [(在新标签页中打开)](https://www.classcentral.com/?ref=fcc)
        广告
    

            
    
    

- [Udemy 上 Learn Playwright with TypeScript (Web & API Testing) Pavan Kumar 4.6 星（满分 5 星）（5,047）来自 5,047 个评分 2天21小时 2 天 21 小时 49 分钟 初级 证书 查看课程（在新标签页中打开）](https://www.classcentral.com/course/udemy-learn-playwright-web-api-testing-with-typescript-499736?go=1&ref=fcc)
- [Udemy 上 Playwright Automation Testing 2026: TypeScript, AI & MCP Kaniel Outis 4.6 星（满分 5 星）（2,620）来自 2,620 个评分 12小时59分钟 12 小时 59 分钟 初级 证书 查看课程（在新标签页中打开）](https://www.classcentral.com/course/udemy-automated-software-testing-with-playwright-125554?go=1&ref=fcc)
- [Udemy 上 Playwright Practice: 30 Real-World Automation Exercises Rafał Podraza 4.9 星（满分 5 星）（37）来自 37 个评分 7小时 7 小时 初级 证书 查看课程（在新标签页中打开）](https://www.classcentral.com/course/udemy-playwright-practice-automation-exercises-569331?go=1&ref=fcc)
- [Udemy 上 Playwright: Web Automation Testing From Zero to Hero Artem Bondar 4.7 星（满分 5 星）（13,451）来自 13,451 个评分 12小时43分钟 12 小时 43 分钟 初级 证书 查看课程（在新标签页中打开）](https://www.classcentral.com/course/udemy-playwright-from-zero-to-hero-294867?go=1&ref=fcc)

    
        [在 Class Central 上查看更多 Playwright 课程 →（在新标签页中打开）](https://www.classcentral.com/subject/playwright?ref=fcc)
