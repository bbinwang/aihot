---
title: "Anatomy：一句话，让 AI 把复杂机械原理做成可操作的动态图解"
date: 2026-10-13T00:00:00.000Z
tags: ["AI 实操", "Anatomy", "开源", "Agent Skills", "可视化", "聚合"]
summary: "用可操作的结构讲清机械原理与算法规则，再按五步完成安装、生成、预览和修改。"
---
> **原文链接**: [https://x.com/wheresryan22/status/2108948624004526516](https://x.com/wheresryan22/status/2108948624004526516)
> **来源**: Ryan (@wheresryan22)
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/anatomy-interactive-machine-skill/) · 2026/10/13
> **说明**: 本文由 AIHot 自动聚合(原文即中文,未翻译)。正文取自小互 AI 解读

---

**已核对**Ryan (@wheresryan22)10-13 · 约 18 分钟

**Anatomy** 是一个面向 AI 编程助手（Claude Code、Antigravity、OpenCode、Codex）的开源 Agent Skill，能把机械原理与抽象算法做成可操作的等距图解。理解复杂机制时，知道部件叫什么只是起点，还要弄清它们怎样配合：动力从哪里传到哪里，哪个动作改变了状态，什么条件会让下一步停止。结构图和流程图能列出部件、连接与步骤；运行中的变化，往往还需要读者在脑中补齐。

可操作图解把这段过程放到眼前。给机械表上弦，可以观察动力怎样经过齿轮传递、怎样被擒纵机构有节奏地释放；访问缓存中的一个数据项，可以看它怎样移到最近使用的位置，以及容量满时哪个项被淘汰。你能改变输入、放慢过程、拆开结构，追踪动作与结果的关系。这让技术文档、课程与科普文章可以用具体过程解释规则。

Anatomy 的做法是**让物体的动作承担解释**：把 LRU 缓存映射成有限槽位的书架，把令牌桶限流映射成不断补充气体、按请求打孔的装置。书架的移动对应访问顺序，储气与消耗对应额度变化。画面用 SVG、WebGL 或 3D 代码绘制，构件运动与角落读数由同一套状态模型驱动。读者能据此检查表现是否符合规则，原理与参数仍需核对。

你在编程助手中描述机制、关键参数与输出要求，Skill 提供相机、零件绘制、交互和检查方法，助手据此编写可编辑的网页代码。输出可选择独立 HTML、SVG 或 React 组件，适合放进文档、课程与网页；需要调整时继续改代码或追问助手。它生成的是浏览器中的解释图解，不是用于加工制造的 CAD 图纸或工程仿真。

[视频/音频](https://best.xiaohu.ai/media/anatomy-interactive-machine-skill/author-demo.mp4)

涡扇发动机点火、推力变化与发电站电弧演示。视频经过剪辑，播放时长不是生成耗时。

### 从一句请求到可操作图解：按这 5 步做

#### 1. 准备工具，安装 Skill

准备一个已能正常使用的编程助手，以及 Node.js。绘图库要求 Node.js 20.10+；`skills` 安装工具需要较新的 Node.js（如 22.20+）。

Skill 免费，生成与修改消耗编程助手的模型配额。自动截图和线条检查需要 Chrome 或 Chromium。

下面的命令按你使用的工具选择一条执行。带 `-g` 的是全局安装；只在当前项目使用时，选最后一条。

**安装命令：**

```sh
## Claude Code
npx skills add wheresryan22/anatomy -g -a claude-code
## Antigravity
npx skills add wheresryan22/anatomy -g -a antigravity
## OpenCode
npx skills add wheresryan22/anatomy -g -a opencode
## Codex
npx skills add wheresryan22/anatomy -g -a codex
## 仅当前项目（团队共用）
npx skills add wheresryan22/anatomy
```

也可以用 Git 安装：展开对应路径

将仓库克隆至对应工具的技能目录：

```sh
## Claude Code
git clone https://github.com/wheresryan22/anatomy.git ~/.claude/skills/anatomy
## Antigravity
git clone https://github.com/wheresryan22/anatomy.git ~/.gemini/antigravity/skills/anatomy
## OpenCode
git clone https://github.com/wheresryan22/anatomy.git ~/.config/opencode/skills/anatomy
## Codex
git clone https://github.com/wheresryan22/anatomy.git ~/.agents/skills/anatomy
```

安装完成后，Claude Code 正在运行的会话可输入 `/reload-skills` 立即重载；Antigravity、OpenCode 或 Codex 若未自动列出 `/anatomy`，重启客户端即可生效（在 Codex 中以 `$anatomy` 触发）。

#### 2. 创建工作目录，启动编程助手

在终端创建工作目录并启动助手。下面以 Claude Code 为例：

```sh
mkdir anatomy-demo && cd anatomy-demo
## 启动你的 AI 编程助手（例如 claude / antigravity / opencode / codex）
claude
```

`/anatomy ...` 是发给编程助手的请求。先启动 Agent，再在它的会话中发送；不要把它粘到终端的 shell 提示符后。

#### 3. 复制请求，先做一个令牌桶

第一次从令牌桶这样的小机制开始：每个请求消耗 1 个令牌，有令牌才能通过；令牌按固定速率补充，存量达到上限后不再增长。**容量决定能承受多大的短时突发，补充速率决定额度恢复有多快。** 两者一起决定限流行为，不能只写“画一个限流器”。

下面把容量定为 8、补充速率定为每秒 2 个，并明确空桶时阻断请求，让助手有具体规则可建模，也让你能检查结果。要求输出 `build.mjs` 与 `index.html`，是为了同时拿到可修改的构建脚本和可打开的页面：改参数后重新构建，页面便能反映新设置。绝对路径与预览命令则把“生成代码”接到“看到结果”这一步。

下面两版任选一版在 Agent 会话中发送，模板由本文提供。使用 Codex 时，将开头的 `/anatomy` 换成 `$anatomy`。

- **中文指令（复制后在 Agent 会话中发送）：**
  ```text
  /anatomy 请用一个具体的机械装置解释令牌桶限流算法：桶容量固定为 8 个令牌，注水/充气泵以每秒 2 个的固定速率补充令牌，外部请求到来时消耗 1 个令牌并触发物理动作；当桶空时机构互锁阻断请求。请生成独立的 build.mjs 构建脚本与可直接在浏览器打开的 index.html 单页，浅色主题，interactive，并请在回答中给出实际生成文件的绝对路径与本地预览命令。
  ```
- **英文模板：**
  ```text
  /anatomy Explain a token bucket rate limiter using a concrete physical machine: fixed bucket capacity of 8 tokens, a pump replenishing at 2 tokens/sec, incoming requests spend 1 token to trigger an action, and an interlock blocks requests when empty. Output a standalone build.mjs script and an index.html file that opens directly in a browser, light theme, interactive. Please provide the exact output file paths and the local preview command in your response.
  ```

换题材时，讲清机制、数值和输出形式，让助手知道哪些规则必须保持。例如连接池要说明容量、借出归还与满时排队；机械装置要说明哪个构件运动、运动改变什么。`interactive` 要求交互；需要火焰、水面等效果时再加 `WebGL`；需要构件沿深度方向旋转时再选 `3D`（Beta）。

#### 4. 打开结果，检查动作和读数

生成结束后，按实际输出路径打开页面：

1. **确认实际输出文件路径**：
  按助手回复的实际路径打开文件。没有给出路径时，追问：“请给出生成文件的绝对路径，以及在当前目录启动预览的命令。”
2. **启动本地静态服务预览**：
  在工作目录执行下列命令，再按终端显示的地址和文件路径打开页面：
  ```sh
  npx serve .
  ```
3. **检验画面与动作**：
  - 检查卡片四角：图号、标题、交互提示和实时读数是否清楚。随后按图中提示操作，核对规则，而不只看动画是否流畅。
  - **有额度时看消耗**：等待令牌恢复后触发请求，检查一次请求是否消耗 1 个令牌，对应构件是否动作，读数是否同步。
  - **耗尽时看阻断**：快速连续触发请求，使消耗快于补充。余额耗尽时，请求应被阻断，不能让冲头继续动作而读数停在零。
  - **停止请求后看恢复**：观察令牌是否按每秒 2 个的速率补充，恢复到 8 后是否封顶。有了可用令牌，请求应能再次通过，不必等整个桶装满。
4. **自检失败与沙箱拦截排查**：
  - 几何审计在已接入 `kit/audit.mjs` 的构建脚本中运行；截图、线条等浏览器检查才需要 Chrome。请让 Agent 返回实际执行的命令、文件路径与检查结果。
  - 若检查被沙箱拦截，先用浏览器查看页面；自动检查仍未完成。
  - 处理方式：针对具体检查命令使用运行环境提供的授权入口，或在正常终端执行确认过的检查脚本。

#### 5. 针对具体问题追问修改

先操作初稿，再说明具体问题。以下两组修改模板按需使用，每组中英文任选一版。

**画面空、零件像悬浮着：**

- **中文指令：**
  ```text
  初稿整体功能已跑通，但底座与机构中部显得过于平整空旷。请按照 4× 检查标准深化细节：在底座增加边缘倒角、嵌槽与四角螺钉，在滑轨处补充滚珠衬套、行程限位块以及刻度线；让各层实体零件紧密叠放，确保没有悬空面。
  ```
- **英文模板：**
  ```text
  The baseline mechanics work, but the baseplate and central carriage look too bare and flat. Please refine it to meet Anatomy's 4× audit standard: add beveled edges, inset grooves, and corner screws to the plate; add ball bushings, travel stops, and tick scales to the rails; ensure every part rests solidly on another part with zero floating surfaces.
  ```

**数字变化了，构件却没有同步：**

- **中文指令：**
  ```text
  当前的角落读数与物理零件的运动存在偏差。请检查底层状态模型，确保右下角的读数字符串与驱动主构件位移的物理量共享同一套纯函数状态，避免在 UI 层单独运行非同步的定时器。
  ```
- **英文模板：**
  ```text
  The corner readout is currently out of sync with the physical motion. Please refactor the underlying math model so that both the readout string at the bottom right and the displacement of the moving parts read from the exact same pure state function, without independent UI timers.
  ```

换题材：连接池、本生灯、咖啡机的完整双语请求

**数据库连接池：输出 React 组件与静态预览**

- **中文译文：**
  ```text
  /anatomy 为我们的 Next.js 文档制作一个解释数据库连接池的图形：包含容量为 10 的连接池，请求借出连接并在完成后归还，当 10 个连接全忙时新请求在队列中等待。输出为 React 组件并附带静态 HTML 预览，采用深色主题。
  ```
- **英文指令：**
  ```text
  /anatomy a figure for our Next.js docs on database connection pooling: a pool of 10 connections, requests borrow one and give it back, and when all 10 are busy new requests wait in a queue. A React component plus a static HTML preview, dark theme.
  ```

**本生灯：用 WebGL 表现火焰**

- **中文译文：**
  ```text
  /anatomy 实验台上的本生灯：旋转空气调节环将懒散的黄色火焰转变为呼啸的蓝色锥形焰。火焰使用 WebGL，单 HTML 文件，深色主题。
  ```
- **英文指令：**
  ```text
  /anatomy a Bunsen burner on a lab bench: opening the air collar turns the lazy yellow flame into a roaring blue cone. WebGL for the flame, one HTML file, dark theme.
  ```

**咖啡机：展示内部结构与水流**

- **中文译文：**
  ```text
  /anatomy 侧面板拆卸的热交换意式浓缩咖啡机：包含锅炉、热交换管、冲煮头、水泵、蒸汽棒和压力表。萃取咖啡时展示水流流动。独立 HTML，浅色主题。
  ```
- **英文指令：**
  ```text
  /anatomy a heat-exchanger espresso machine with the side panel off: boiler, heat-exchanger tube, group head, pump, steam wand and gauge. Show the water flowing when you pull a shot. Standalone HTML, light theme.
  ```

### 先玩现成图解，再挑一个机制来做

只想体验时，无需安装。切换下面的装置，按提示操作；要用快捷键，先点击图内获得焦点。

6 种装置 · 动手观察机制

#### 指针测量表 · dial-indicator

**怎么操作：**先点一下图，按 Home 和 End 切换滑台位置；也可以在图中横向移动指针。

**看什么：**不同高度的量块经过探针时，探针高度、表针和右下读数一起改变。读数以 px 显示模型高度。

[单独打开此图解 ↗](https://best.xiaohu.ai/article/anatomy-interactive-machine-skill/#xh-component-anatomy-project-examples)[查看当前例子源码 ↗](https://github.com/wheresryan22/anatomy/tree/454a0ef801b6d9b905f08309d094491c7085b3dd/examples/dial-indicator)

图中的标注为英文。选好装置后，在图内点击一下再使用快捷键；触摸设备可直接操作图中控件，也可以单独打开。

#### 从机械表、发动机和算法里找灵感

给机械表上弦，观察能量怎样传到擒纵机构；拖动油门，看三转子与推力怎样变化；改变日期，看地轴倾角怎样影响南北半球的受光。算法也能这样探索：访问一本书触发缓存重排，按住打孔则观察令牌怎样消耗与补充。

[Anatomy Collection 在线合集](https://skills.wheresryan.sh/anatomy/collection) 有 52 个可直接操作的图解，包括 33 个主要案例和 19 个早期探索案例。想体验不同机制，可以从这里选；想运行和修改代码，可以使用仓库中的 8 个完整工程。

点击图片放大查看；点击下方入口，打开图解并动手操作。

![Anatomy 图解：机械表机芯](https://best.xiaohu.ai/media/anatomy-interactive-machine-skill/case-thumbs/watch.webp)

#### 机械表机芯

拖表冠上弦；S 减速，E 拆开
[打开交互图解 ↗](https://skills.wheresryan.sh/anatomy/collection/watch)
![Anatomy 图解：涡扇发动机](https://best.xiaohu.ai/media/anatomy-interactive-machine-skill/case-thumbs/turbofan.webp)

#### 涡扇发动机

推拉油门；Space 起飞工况
[打开交互图解 ↗](https://skills.wheresryan.sh/anatomy/collection/turbofan)
![Anatomy 图解：地球与四季](https://best.xiaohu.ai/media/anatomy-interactive-machine-skill/case-thumbs/seasons.webp)

#### 地球与四季

拖动转向；方向键改日期
[打开交互图解 ↗](https://skills.wheresryan.sh/anatomy/collection/seasons)
![Anatomy 图解：复古电脑](https://best.xiaohu.ai/media/anatomy-interactive-machine-skill/case-thumbs/computer.webp)

#### 复古电脑

点键盘后打字；点机箱开关机
[打开交互图解 ↗](https://skills.wheresryan.sh/anatomy/collection/computer)
![Anatomy 图解：哈希分拣台](https://best.xiaohu.ai/media/anatomy-interactive-machine-skill/case-thumbs/hash-map.webp)

#### 哈希分拣台

点击放置信件；看桶内堆叠
[打开交互图解 ↗](https://skills.wheresryan.sh/anatomy/collection/hash-map)
![Anatomy 图解：消息队列](https://best.xiaohu.ai/media/anatomy-interactive-machine-skill/case-thumbs/message-queue.webp)

#### 消息队列

拖动调速；点击消费滚筒
[打开交互图解 ↗](https://skills.wheresryan.sh/anatomy/collection/message-queue)
![Anatomy 图解：LRU 缓存书架](https://best.xiaohu.ai/media/anatomy-interactive-machine-skill/case-thumbs/lru-cache.webp)

#### LRU 缓存书架

点击一本书；看重排与淘汰
[打开交互图解 ↗](https://skills.wheresryan.sh/anatomy/collection/lru-cache)
![Anatomy 图解：令牌桶工作台](https://best.xiaohu.ai/media/anatomy-interactive-machine-skill/case-thumbs/rate-limiter.webp)

#### 令牌桶工作台

按住打孔；看令牌耗尽后阻断
[打开交互图解 ↗](https://skills.wheresryan.sh/anatomy/collection/rate-limiter)
![Anatomy 图解：托卡马克](https://best.xiaohu.ai/media/anatomy-interactive-machine-skill/case-thumbs/tokamak.webp)

#### 托卡马克

拖动回放；Space 播放脉冲
[打开交互图解 ↗](https://skills.wheresryan.sh/anatomy/collection/tokamak)
![Anatomy 图解：发动机加力燃烧室](https://best.xiaohu.ai/media/anatomy-interactive-machine-skill/case-thumbs/afterburner.webp)

#### 发动机加力燃烧室

点击或方向键调油门
[打开交互图解 ↗](https://skills.wheresryan.sh/anatomy/collection/afterburner)
![Anatomy 图解：等离子切割台](https://best.xiaohu.ai/media/anatomy-interactive-machine-skill/case-thumbs/plasma-cutter.webp)

#### 等离子切割台

悬停或拖动钢板；Space 运行
[打开交互图解 ↗](https://skills.wheresryan.sh/anatomy/collection/plasma-cutter)
![Anatomy 图解：点样盘与融合](https://best.xiaohu.ai/media/anatomy-interactive-machine-skill/case-thumbs/spot-plate.webp)

#### 点样盘与融合

横向滑动展开扇形测隙规
[打开交互图解 ↗](https://skills.wheresryan.sh/anatomy/collection/spot-plate)

[浏览全部 52 个图解（33 个主要案例 + 19 个早期案例）↗](https://skills.wheresryan.sh/anatomy/collection)

**机械表：把连续动力变成计时节拍。** 上弦把能量存进发条，齿轮把动力传向擒纵机构。模型中的摆轮以 4 Hz 摆动，擒纵叉交替卡住和放行擒纵轮，每次放行半个齿距，一秒发生 8 次。因此，看到秒针一步步前进时，可以沿着“储能—传动—节拍控制”追溯原因，而不只是看到一组转动的齿轮。

**令牌桶：短时突发与持续限速怎样共存。** 储气罐中的存量对应令牌，气泵对应每秒 2 个的补充速率，泄压阀限制最多积累 8 个。请求到来时，打孔动作消耗一个令牌；耗尽时，联锁阻止打孔。积累的额度允许一段短时突发，固定补充速率约束长期的请求通过量。重新积累出一个可用令牌后就能继续，不需要等存量恢复到上限。

**四季：地轴方向不变，受光关系却在变。** 三球仪用中央灯代表太阳，齿轮让地球仪绕灯运动时仍保持 23.4° 的地轴倾角和基本不变的指向。公转位置改变，南北半球便轮流更朝向灯源。沿着这个过程看，可以把地轴姿态、太阳照射角度与季节变化连起来，而不是仅记住“地球绕太阳转”这句话。
想改代码，从 [百分表工程](https://github.com/wheresryan22/anatomy/tree/454a0ef801b6d9b905f08309d094491c7085b3dd/examples/dial-indicator) 开始最容易。其余工程可按需要选择：[电脑](https://github.com/wheresryan22/anatomy/tree/454a0ef801b6d9b905f08309d094491c7085b3dd/examples/desk-computer)看输入与屏幕响应，[街机](https://github.com/wheresryan22/anatomy/tree/454a0ef801b6d9b905f08309d094491c7085b3dd/examples/arcade-cabinet)看投币信号，[发动机](https://github.com/wheresryan22/anatomy/tree/454a0ef801b6d9b905f08309d094491c7085b3dd/examples/raptor-engine)看拆解与喷流，[水波槽](https://github.com/wheresryan22/anatomy/tree/454a0ef801b6d9b905f08309d094491c7085b3dd/examples/ripple-tank)看干涉，[密码盘](https://github.com/wheresryan22/anatomy/tree/454a0ef801b6d9b905f08309d094491c7085b3dd/examples/turning-dial)看 3D 旋转。另有 [弹簧测试台](https://github.com/wheresryan22/anatomy/tree/454a0ef801b6d9b905f08309d094491c7085b3dd/examples/test-rig)和 [点滴板](https://github.com/wheresryan22/anatomy/tree/454a0ef801b6d9b905f08309d094491c7085b3dd/examples/spot-plate)两个 React 工程，需要接入前端项目与 `kit/react/`，不能当独立 HTML 打开。

### 进阶：本地改代码，或嵌入现有网页

#### 跑一个可修改的百分表

这条路径需要 Node.js 20.10+ 和 Python 3，不调用模型：

1. **克隆仓库至本地测试目录**：
  ```sh
  git clone https://github.com/wheresryan22/anatomy.git anatomy-examples
  cd anatomy-examples
  ```
2. **执行轻量级构建脚本**：
  运行最小示例百分表（`dial-indicator`），添加 `--light` 参数构建浅色单页：
  ```sh
  node examples/dial-indicator/build.mjs --light
  ```
  *说明*：该脚本仅使用 Node.js 原生模块（要求 Node.js >= 20.10），无需额外执行 `npm install`。构建完成后，脚本会在同级目录下输出 `examples/dial-indicator/dial-indicator-light.html`。
3. **启动本地静态 HTTP 服务**：
  在仓库根目录启动静态服务：
  ```sh
  python3 -m http.server 8000
  ```
4. **浏览器访问确切地址**：
  保持刚才的 Python 服务运行，在浏览器地址栏输入：
  ```text
  http://localhost:8000/examples/dial-indicator/dial-indicator-light.html
  ```
5. **交互检验**：用鼠标在滑台上左右悬停移动，或者敲击键盘方向键（`←` / `→`）、`Home`、`End` 键切换不同厚度的量块，观察百分表测头压下、表盘指针旋转以及右下角 px 高度读数的联动。
6. **改完重新构建**：修改 `examples/dial-indicator/build.mjs` 中的零件尺寸或行程，再次构建并刷新页面。

#### 把现成图解放进网页

在已有前端项目中安装图解组件：

```sh
npm install anatomy-figures
```

- **React（>=18）或 Next.js 项目中引入**：
  直接按名称引入对应组件：
  ```tsx
  import { Watch } from "anatomy-figures";
  export default function Page() {
    return <Watch theme="light" />;
  }
  ```
  或者单独按路径导入对应图解，避免捆绑未使用的其他模型代码：
  ```tsx
  import Watch from "anatomy-figures/watch";
  ```

进阶：自定义主题，或在非 React 网页中使用

- **主题与 Token 配置**：
  主要图解提供 5 种主题（`dark`、`light`、`paper`、`blueprint`、`sepia`），早期例子保持各自的浅色、深色配色。可通过 tokens 覆盖颜色：
  ```tsx
  <Watch
    theme="light"
    tokens={{
      "--anatomy-card": "#ffffff",
      "--anatomy-lit": "#e5484d",
    }}
  />
  ```
  也可使用 `<AnatomyTheme>` 为整棵组件树统一设定主题与主色：
  ```tsx
  import { AnatomyTheme, Turbofan, Watch } from "anatomy-figures";
  <AnatomyTheme theme="paper" tokens={{ "--anatomy-lit": "#e5484d" }}>
    <Watch />
    <Turbofan />
  </AnatomyTheme>
  ```
- **非 React 网页中使用 Custom Element**：
  组件库为每个图解提供了自定义 Web 组件：
  ```html
  <script type="module">
    import { define } from "anatomy-figures/element/watch";
    define();
  </script>
  <anatomy-watch theme="light"></anatomy-watch>
  ```
  ，不能将其当作开箱即用的浏览器本地静态脚本。此外，若使用 `spot-plate` 或 `press-and-pull` 等早期案例的 Custom Element，其内部仍依赖 React 渲染，需在项目中一并安装 `react` 与 `react-dom`。

Skill 和图解组件采用 MIT 许可，使用和分发时需保留原版权及许可声明。

### 怎样判断图解真的讲清了原理？

#### 用缓存检查顺序和淘汰规则

用容量为 4 的 LRU 缓存检查“动作是否讲对了规则”。下面是本文编写的简化教学模型：

- **最近使用变序**：每次点击一个数据键，对应的滑块若已在书架中，就会被抽拉并移到最左侧的最新位置；其余滑块相应右移。
- **满时淘汰**：当 4 个卡槽均已占满，若访问未在缓存中的新数据，最右端久未被访问的滑块将被顶出卡槽淘汰，腾出空间给新入块。

访问数据:

LRU · 最近使用排在最前
4 个槽位 · 简化教学模型

点击 C，再点 E，观察重排和淘汰
容量 4/4 · 命中 0/0 · 本次淘汰 无

**最近 → 最久：**A → B → C → D

初始缓存已装入 A、B、C、D。访问已有项，它移到最前；缓存满后访问新项，最久没用的末项被淘汰。

本文用容量为 4、键为 A–E 的简化模型解释 LRU。它由本文编写，不是 Anatomy 的生成结果；读数表示本次点击序列，未进行 Anatomy 几何审计。

#### 让动作和读数使用同一套计算结果

Anatomy 先建立状态模型，再生成几何与交互。`SKILL.md` 规定构建流程，`kit/` 提供相机与绘图工具，`references/` 补充做法，`scripts/` 用于检查，`examples/` 提供可运行工程。绘制按尺寸、状态、零件、遮挡、交互和自检等十步推进。

水波槽的状态模型（`examples/ripple-tank/model.mjs`）这样计算：

![Anatomy 水波槽：两个波源与下方投影屏](https://best.xiaohu.ai/media/anatomy-interactive-machine-skill/ripple-tank.webp)

两个波源在水面产生干涉，投影屏显示条纹。波纹、投影图案和读数由同一套波动与光学模型驱动。

- 模型固定了水深 6 毫米（0.006 米）、重力加速度与表面张力等物理常数。
- 当用户调节频率时，系统通过包含重力、表面张力与水深的色散关系求解对应的波数，进而计算出水波波长。
- 解算出的状态对象（`stateOf`）同时传递给图形渲染函数（`patternOf`）与文字读数函数（`readoutOf`）。波纹图案绘制水波间距与节点线，读数牌则格式化输出实时频率、波长与节线数量。

调频后，波纹间距和波长读数一起改变；缓存模型则要让顺序和淘汰读数对应每次访问。同步能减少画面与数字脱节，模型本身仍需核对。

#### 图层穿模时，检查遮挡与几何

SVG 绘制主体，WebGL 表现火、水、光，两者共用相机。需要部件沿深度方向转动时，3D 模式才逐帧重新投影。管线穿过机架时，还要检查前后遮挡：

- **分层与切分**：在绘制嵌套构件时（例如套在立柱外的弹簧或包围滑块的机架），设计规范要求将包裹件人工拆分为前后两半，分别插入遮挡链的不同层级。
- **深度测量（`A.settle`）**：在离线构建期，利用射线计算记录的各构件重叠位置的相对深度并确定绘制层级。
- **几何审计（`--audit`）**：该检查根据源码中记录的几何形态、管线走向与采样状态，对构件之间的碰撞、间隙、悬空端点与深度次序进行校对。它检查记录的几何和采样状态；概念是否讲对、参数是否适用，仍需要另外核对。

### 先做小机制，复杂图解留时间打磨

第一次先选一个能用动作讲清的机制，用 `interactive` 做出可运行初稿。Figure 档约 40–80 个零件，不承诺固定生成时间；Hero 档约 80–150 个零件，规划耗时约 2–4 小时；Epic 档规模更大，通常需 6 小时以上，先与助手讨论能否缩小题目。

复杂图解的[活跃开发时间](https://skills.wheresryan.sh/anatomy)可能很长：机械表约 1 小时 54 分钟，猛禽发动机约 10 小时 33 分钟，涡扇发动机约 14 小时。这些是具体案例的制作记录。3D 仍为 Beta，复杂场景会降低帧率；能用常规等距 SVG 讲清时，先从 SVG 开始。

来源Anatomy：可交互机械图解的开源 Agent SkillRyan (@wheresryan22)·[查看主材料](https://github.com/wheresryan22/anatomy)延伸[Anatomy 发布主题贴](https://x.com/wheresryan22/status/2108948624004526516)·[原理说明与作品集](https://skills.wheresryan.sh/anatomy)·[水波槽模型源码](https://github.com/wheresryan22/anatomy/blob/454a0ef801b6d9b905f08309d094491c7085b3dd/examples/ripple-tank/model.mjs)·[Anatomy 交互图解合集（主要与早期图解）](https://skills.wheresryan.sh/anatomy/collection)·[安装与提示词文档](https://github.com/wheresryan22/anatomy/blob/454a0ef801b6d9b905f08309d094491c7085b3dd/README.md)本站说明项目文档与源码解读；文中耗时为作者案例记录。

Agent Skill · Interactive Mechanics

## Anatomy：让动作承担解释的交互机械图解 Skill

一个开源 Agent Skill：让 AI 编程助手把机械原理与算法规则做成可操作的网页图解。

从说明规则到检查结果 · 令牌桶上手路径 · 动作与读数同源

理解复杂机制时，知道部件叫什么只是起点，还要弄清它们怎样配合：动力从哪里传到哪里，哪个动作改变了状态，什么条件会让下一步停止。结构图和流程图能列出部件、连接与步骤；运行中的变化，往往还需要读者在脑中补齐。

Anatomy 让物体的动作承担解释：把 LRU 缓存映射为有限槽位的书架，把令牌桶限流映射为不断充气、按请求打孔的装置。改变输入、放慢过程或拆开结构，就能追踪动作与结果的关系。这适合技术文档、课程与科普网页；动作是否讲对规则，仍要操作检查。

### 先做一个令牌桶，把生成与检验连起来

**准备：**先有能正常使用的 Claude Code、Antigravity、OpenCode 或 Codex，以及 Node.js。绘图库要求 20.10+；skills 安装工具需较新版本，如 22.20+。Skill 免费，生成和修改消耗助手的模型配额。

以 Codex 全局安装为例：

```
npx skills add wheresryan22/anatomy -g -a codex
```

新建工作目录并启动助手。在 Agent 会话中发请求；Codex 用 `$anatomy`，其他工具用 `/anatomy`。不要把提示词当 shell 命令运行。

说明机制＋参数 → Agent 生成 → 本地预览 → 检查动作规则 → 定向修改

01说明机制、参数与输出

容量决定短时突发能有多大，补充速率决定额度恢复有多快。先把规则写清，再让助手生成：
**8**令牌容量**2/s**补充速率**1**每请求消耗

$anatomy 用机械装置解释令牌桶：容量 8，泵每秒补充 2 个令牌，每请求消耗 1 个并触发动作，空桶时互锁阻断。生成独立 build.mjs，以及可直接在浏览器打开的浅色、interactive 单页 index.html，并返回实际绝对路径和本地预览命令。

02让 Agent 生成可修改代码

助手依据 Skill 的相机、零件绘制、交互与检查方法编写代码。build.mjs 用于修改和重新构建，index.html 用于打开预览；检查回复中的实际路径与执行结果。

03打开页面，确认能操作

按实际输出路径打开。在工作目录运行 `npx serve .`，按终端给出的地址预览；没有路径就追问。确认图号、标题、交互提示与读数清楚，再按图中提示操作。

04用三种状态核对规则有额度 → 消耗

单次请求扣除 1 个令牌；构件动作一次，读数同步扣减。
空桶 → 阻断

连续请求使消耗快于补充。耗尽时冲头应停止，不能零余额仍动作。
停请求 → 恢复

以 2/s 补充，达到 8 封顶；至少有 1 个可用令牌就能再次通过，不用等满。

05按发现的问题定向修改

读数与动作不同步：要求二者共用同一套状态计算，避免 UI 层独立定时器。零件悬空或底座空：补倒角、嵌槽、螺钉与限位块，并检查实体支撑。修改后重建、刷新，再检验。

**结果怎么判断？**

能打开、能操作只是起点。三种状态下的动作、数值和规则一致，才能说明这张图解讲清了当前机制；任一不符，就回到具体问题继续修改。

### 动作和读数为什么要共用计算结果？

同一个参数变化，要同时改变图形与读数。水波槽的实现先求出波数与波长，再把同一状态对象交给绘图与读数函数；这样能减少画面与数字脱节，模型本身仍需核对。
水波槽示例：调频 → stateOf 求解状态

包含水深、重力与表面张力的模型，计算对应的波数与波长。
同一状态 → patternOf 绘图

波纹间距、干涉条纹与节点线随计算结果改变。
同一状态 → readoutOf 读数

格式化频率、波长与节线数量，供读者比对。

### 图层穿模时，检查遮挡与几何

套在立柱外的弹簧等嵌套件，需要拆成前后两半，放进不同遮挡层级。离线构建时，`A.settle` 用射线计算记录构件重叠处的相对深度；`--audit` 核对记录的几何与采样状态，检查碰撞、间隙、悬空端点和深度次序。

几何检查不证明概念与参数正确。自动截图和线条检查需要 Chrome / Chromium；若被沙箱拦截，记录尚未完成的检查与实际执行结果。

### 先做小机制，复杂图解留时间打磨
Figure约 40–80 个零件；做可运行初稿，不承诺固定生成时间。Hero约 80–150 个零件；规划耗时约 2–4 小时。Epic规模更大，通常需 6 小时以上；先讨论能否缩小题目。

这些档位用于规划，具体案例的制作记录不能当作每次生成的耗时保证。3D 仍为 Beta，复杂场景会降低帧率；能用等距 SVG 讲清时，先从 SVG 开始。
**输出与用途**

可选择独立 HTML、SVG 或 React 组件，用于文档、课程与网页。它生成浏览器中的解释图解，不是视频导出工具，也不是用于加工制造的 CAD 图纸或工程仿真。

↑ 正文结束
✓ 本篇全文免费开放

会员可复制、下载全文 Markdown，并解锁更多深度内容与播客。
[订年卡 $59/年](https://best.xiaohu.ai/buy/?plan=year)[看权益对比 →](https://best.xiaohu.ai/membership/)

[阅读原文 ↗](https://x.com/wheresryan22/status/2108948624004526516)

📮 新解读第一时间进邮箱

读完觉得有用？留个邮箱，每篇新解读发布就送达，随时退订。

### 相关解读

[深度 Anthropic 官方 Skill 实践指南：怎样写、怎样改、怎样验证它有用 10-04 · 18 min](https://best.xiaohu.ai/article/claude-skill-authoring-best-practices/)[工具 Lieflat Charts：61 种图表、12 套报告模板，能让 AI 直接生成各种好看炫酷的 HTML 图表或报告 09-17 · 约 25 分钟](https://best.xiaohu.ai/article/lieflat-charts/)[工具教程 如何系统评测 Agent Skills：从触发用例到自动化评分的完整指南 09-14 · 约 16 分钟](https://best.xiaohu.ai/article/testing-agent-skills-systematically-with-evals/)
