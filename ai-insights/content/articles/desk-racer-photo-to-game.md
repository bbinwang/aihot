---
title: "把你的书桌变成3D赛车场：从照片、建模到录屏的手把手教程"
date: 2026-10-14T00:00:00.000Z
tags: ["会员", "深度", "Gemini 4 Argon", "3D游戏", "Agent", "Blender MCP", "教程", "聚合"]
summary: "拆解 Desk Racer 的完整制作流程，用 Gemini、Blender MCP 和 Three.js 做出可玩的桌面赛车，再录成演示视频。附双语过程视频和逐轮中英文提示词。"
---
> **原文链接**: [https://x.com/genevieve__h/status/2110041611455353197](https://x.com/genevieve__h/status/2110041611455353197)
> **来源**: Geneviève Huskens · Google AI Studio
> **发现于**: [小互 · AI 解读站](https://best.xiaohu.ai/article/desk-racer-photo-to-game/) · 2026/10/14
> **说明**: 本文由 AIHot 自动聚合(原文即中文,未翻译)。上游原文多次抓取失败(含登录墙/反爬,CDP 渲染亦无法获取),正文取自小互 AI 解读

---

**已核对**Geneviève Huskens · Google AI Studio10-14 · 20 分钟

Google 开发者关系工程师 Geneviève Huskens 分享一个使用 Gemini 4 Argon 将她的办公桌变成赛车场的炫酷案例：她用手机给自己的办公桌拍了一组照片，随后在 Google Antigravity 环境中调用 Gemini 4 Argon 模型，通过 Agent 任务编排，连接 Blender MCP 与 Three.js，将键盘、显示器和桌面摆件变成了一款可在浏览器中驾驶的 3D 桌面赛车游戏《Desk Racer》。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/desk-racer-photo-to-game/video-03-original-c4fbe2af849f.mp4)

作者的80秒成品演示：可玩的桌面赛车游戏，赛道绕过键盘、鼠标和台灯。

如果你用手工制作这样的游戏，要安排道具的位置与尺寸、建模和贴材质，再编写驾驶、碰撞和镜头控制。而在这套新流程中，AI 可以直接分析多角度照片中的桌面空间布局，通过模型上下文协议（MCP）向 3D 建模软件注入 Python 脚本生成几何体，自动编写前端渲染与赛车控制代码，并在浏览器运行环境中通过截屏自我审视画面缺陷，分步迭代材质与灯光。

这是她第一次认真制作 3D 项目。跟做时，照片提供布局参考，你决定赛道走向和画面风格，AI 负责把这些要求落实为模型、代码与可玩的场景。

---

### 先选路线：在线试玩改编，还是本地自建书桌赛道

先分清各工具的作用：

| 工具 | 在这个项目中做什么 |
| --- | --- |
| Gemini 4 Argon | 看照片、问清需求、制定计划、编写和修改代码 |
| Nano Banana | 生成概念图与木纹、路面等表面贴图 |
| Blender MCP | 让 Agent 通过 Python 脚本建模，并导出 GLB 道具文件 |
| Three.js | 在浏览器中加载场景、渲染画面并响应驾驶操作 |

只想做简洁的低多边形场景，可以先用 Three.js 的基础几何体，跳过 Blender；需要更细致的道具结构时再加入建模流程。

```
【路径 A：在线快速体验与改编 (AI Studio)】
无需本地环境 ──> 浏览器打开 Desk Racer ──> 点击「Remix」──> 直接修改赛车速度/赛道颜色
适合：想立刻上手体验操控手感、观察现成代码结构、暂不配置本地环境的读者。

【路径 B：打造自己的书桌赛场 (本地全套管线)】
手机拍自己的桌子 ──> Antigravity / 智能体编排 ──> Blender MCP (建模) ──> Three.js (可玩游戏)
适合：希望将个人工位、卧室书桌转化为专属 3D 场景并录制高质量演示视频的读者。
```

#### 1. 路径 A：在线体验与改编（无需安装）

官方已在 Google AI Studio 应用库中公开了[《Desk Racer》的在线运行页面](https://aistudio.google.com/apps/bundled/desk-racer)。在页面中可以直接看到：

- **预览与操作**：点击进入游戏，按 `W` 加速，`A` / `D` 转向，`S` 刹车；按数字键 `1`（跟车视角）、`2`（座舱视角）、`3`（桌面全景俯瞰）、`4`（无人机漫游）自由切换机位；按 `Enter` 开启三圈计时挑战。
- **源码与资产入口**：页面顶部提供 `Preview`（实时画面）、`Code`（Three.js 与物理脚本源码）、`Artifacts`（模型与贴图资源）以及 `Remix`（分叉复制为自己的云端项目）。
- **改编入口**：点击 Remix，把现有作品复制到自己的项目后，可以向助手提出修改需求。先改速度或颜色容易观察效果；要换成自己的书桌，还需重新设计道具布局与资产。

#### 2. 路径 B：从零自建你的专属书桌赛道

自建方案需要模型理解你的真实空间几何。原作者在演示中使用的是结合 Gemini 4 Argon 驱动的 Blender MCP 流程。作者未公布所用无头（Headless）Blender MCP 的具体安装配置，本教程采用有公开安装文档、需要保持 Blender 开启的桌面端 `mcp-for-blender` 替代路线，配合本地运行的 Three.js 项目实现从照片到游戏的闭环。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/desk-racer-photo-to-game/desk-racer-tutorial-bilingual-safe-35d3fff198b1.mp4)

作者的156秒制作过程讲解，已加中英双语字幕并保留原声。字幕放在画面下方独立留白区，便于看清演示界面。

账户与环境条件：

在官方演示环境中，Gemini 4 Argon 在 Antigravity 中面向 Google AI Ultra 订阅者开放，而在 AI Studio Build 中面向 Ultra 或绑定结算的付费 Gemini API 用户。由于各平台模型选择器与配额策略会动态调整，请以你当前工作区的实际可用模型为准。如果在 Cursor、VS Code、Claude Desktop 或其他支持 MCP 的编程工具中跟做，通过自然语言调用对应 MCP 协议也可以执行建模与工程构建，需要分别确认该工具的文件编辑、MCP 调用、截图和任务持续执行能力。

---

### 第一阶段：配置 Blender MCP 与 Three.js 本地开发环境

要让 AI 替你操作 3D 软件并驱动网页游戏，必须在电脑中建立一条“代码助手 ↔ 3D 建模工具 ↔ 网页渲染环境”的通信管道。

![真实书桌环境参考照片与工作流起点](https://best.xiaohu.ai/media/desk-racer-photo-to-game/frame-2110041614685282336-15.jpg)

工作流起点：多角度拍摄的真实书桌参考照片。
制作过程视频 15 秒处，展示白木纹理桌面、显示器底座、键盘与台灯等待转化的真实道具。

本文的提示词均为跟做而改写的模板；尺寸、灯光数值和帧率目标是教学初值，按自己的桌面实测与电脑表现调整。原视频的录屏和剪辑软件未披露，后面的录制步骤是本文补充。

#### 1. 安装基础依赖与软件入口

在开始之前，请访问对应官方网站下载并安装以下四个基础工具：

1. **[Google Antigravity](https://antigravity.google/)**（或支持 MCP 客户端的编辑器如 Cursor、VS Code、Claude Desktop）。
2. **[Blender 3.0 或更高版本](https://www.blender.org/download/)**：开源三维建模套件，安装后确认可正常启动进入三维视口。
3. **[Node.js LTS](https://nodejs.org/)**：JavaScript 运行时，自带 npm 包管理器，用于启动本地前端服务器。
4. **[uv 包管理器](https://docs.astral.sh/uv/getting-started/installation/)**：用于快速执行 Python 工具包而无需污染系统 Python 环境。
  - **macOS 终端安装**：若系统中已配置 [Homebrew](https://brew.sh/)，执行 `brew install uv`；若未安装 Homebrew，可在终端直接执行官方安装脚本：
    ```bash
    curl -LsSf https://astral.sh/uv/install.sh | sh
    ```
  - **Linux 终端安装**：
    ```bash
    curl -LsSf https://astral.sh/uv/install.sh | sh
    ```
  - **Windows PowerShell 安装**：
    ```powershell
    powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
    ```

#### 2. 安装与激活 Blender MCP 插件

我们将使用社区开源项目 [mcp-for-blender](https://github.com/ahujasid/mcp-for-blender)，它通过本地 TCP Socket 让外部智能体可以向 Blender 注入 Python 脚本并取回几何数据。

在终端中执行以下命令自动安装插件到 Blender：

```bash
uvx mcp-for-blender install-addon
```

安装完成后，进行如下操作：

1. 打开 Blender，点击顶部菜单栏 **Edit（编辑）→ Preferences（偏好设置）→ Add-ons（插件）**。
2. 在右上角搜索框输入 `MCP for Blender`，勾选启用该插件。
3. 回到 3D 视口，在英文输入法状态下按键盘上的 `N` 键，呼出右侧侧边栏。
4. 找到 **MCP for Blender** 选项卡，确认状态显示为已启动或点击 **Start MCP Server**（默认监听本地端口为 `9876`）。
5. **在后续的所有生成过程中，请保持 Blender 窗口处于开启状态**。

#### 3. 配置 Antigravity MCP 连接

在 Antigravity 中，你可以通过项目级配置文件或全局配置文件接入该服务：

- 全局配置路径：`~/.gemini/config/mcp_config.json`
- 项目专属路径：项目根目录下的 `.agents/mcp_config.json`

在现有的 `mcpServers` 键内追加（注意保留已有其他服务配置）：

```json
{
  "mcpServers": {
    "blender": {
      "command": "uvx",
      "args": ["mcp-for-blender"],
      "env": {
        "BLENDER_HOST": "localhost",
        "BLENDER_PORT": "9876"
      }
    }
  }
}
```

*排错提示*：如果在启动时提示找不到命令 `spawn uvx ENOENT`，说明 GUI 编辑器未继承系统终端的环境变量。在 macOS/Linux 终端中运行 `which uvx`（Windows PowerShell 运行 `where.exe uvx`），将输出的绝对路径（如 `/opt/homebrew/bin/uvx` 或 `C:\Users\username\.local\bin\uvx.exe`）替换配置中的 `"command": "uvx"`。

**连通性检查点**：
完全重启 AI 编辑器，向智能体发送一条测试指令：`"请调用 blender 工具，读取当前场景信息，并新建一个名为 TestCube 的红色立方体"`。如果你看到 Blender 视口中立刻生成了一个红色立方体，并且 AI 正确汇报了物体名称，即表明 3D 控制通道已打通。

#### 4. 创建工程目录并安装 Three.js

先建好项目目录和依赖，确认概念与计划后，再在第四阶段生成 HTML 和游戏代码。

根据操作系统执行目录创建与依赖安装：

- **macOS / Linux 终端**：
  ```bash
  mkdir desk-racer
  cd desk-racer
  npm init -y
  npm install three
  npm install --save-dev vite
  mkdir -p public/models
  mkdir -p public/textures
  mkdir src
  ```
- **Windows 命令行 / PowerShell**：
  ```powershell
  mkdir desk-racer
  cd desk-racer
  npm init -y
  npm install three
  npm install --save-dev vite
  mkdir public\models
  mkdir public\textures
  mkdir src
  ```

保留 `npm install` 写入的依赖版本，在 `package.json` 中合并以下字段；不要整文件覆盖已安装的 dependencies 和 devDependencies：

```json
{
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

工具安装完成、Blender 连通后，继续拍照并确认视觉方向。正式生成游戏代码放在第四阶段。

---

### 第二阶段：拍照片，确定赛道外观与尺寸

先用 Nano Banana 做概念图，比较赛道绕哪些物体、灯光偏暖还是偏冷、赛车显得多小。选定一版后，后续建模和灯光调整就有共同参照。

#### 1. 拍摄实物照片与多模态参考素材

参考素材可以是照片、草图，或约 15 秒的绕物视频。这次先拍清楚桌面全貌与关键道具，照片足够作为起点。

拍摄实物照片时，把握以下 4 个要点：

- **光照均匀充足**：选择室内均匀明亮光线下拍摄，避免大面积死黑阴影干扰对物体边缘轮廓的提取。
- **全景布局照片**：站在桌前拍 1~2 张包含整张书桌全貌的视角照片，明确显示器底座、键盘、鼠标与杯子之间的相对距离与朝向。
- **局部关键物特写**：贴近键盘按键、台灯支架各拍 1 张特写，记录物体的厚度与材质反光特征。
- **清理无关杂物**：移走散乱电线团与纸巾，保留具有明确几何特征的文具或摆件。

概念图生成后，先和 AI 一起评审 2D 概念图并挑选满意的视觉方向，确认后再开始编写 3D 代码。

**官方概念构思参考过程（点击展开）**

[视频/音频](https://best.xiaohu.ai/media/desk-racer-photo-to-game/guide-concept-process.mp4)

Google 指南中的另一款奇幻桌游：先比较概念图，再整理视觉风格。18 秒，无旁白。

#### 2. 概念图生成提示词

将拍摄的照片上传至多模态图像生成界面，发送以下提示词生成概念图：

**模板 1：从桌面实拍照片生成微缩赛车概念图**

**中文可复制版本：**

```text
请分析我上传的书桌照片中的物品布局（显示器、机械键盘、鼠标、台灯摆件）。以这些真实物品为地形障碍，生成一张具有强烈微缩模型玩具质感（Tilt-Shift Macro Photography）的 3D 赛车赛道概念图。
视觉要求：
1. 一辆鲜红色的微型卡丁车正在键盘前方疾驰，车身尺寸与单个机械键帽相仿。
2. 赛道是一条高架曲面轨道，配有红白相间的减速路缘与柔光防撞护栏，轻巧地从显示器支架下方穿过并环绕鼠标。
3. 灯光具有戏剧性对比：暗调房间背景，屏幕背后的深紫色氛围光，机械键盘缝隙透出的青色背光，以及桌面台灯投下的高对比暖白主光。
4. 整体呈现出精致小巧的微缩玩具世界视觉质感。
```

**English Copyable Version (Teaching Adaptation):**

```text
Analyze the desktop layout in the uploaded photos (monitor, mechanical keyboard, mouse, desk lamp). Using these real objects as miniature terrain obstacles, generate a 3D racing concept art with strong tilt-shift macro toy aesthetic.
Key requirements:
1. A vibrant red miniature go-kart racing in front of the keyboard, scaled proportionally to single keycaps.
2. An elevated curved track with red-and-white rumble strips and glowing barriers, looping under the monitor stand and around the mouse.
3. Dramatic lighting contrast: dim room ambience, deep purple backlight behind monitor, cyan glow between keycaps, and warm white key light from desk lamp.
4. Premium stylized game aesthetics reminiscent of a micro miniature toy universe.
```

#### 3. 复杂桌面或多遮挡布局的 2D 空间规划分支（普通桌面可跳过）

对于摆放简单的小书桌，完成概念图后即可直接进入下一阶段。但如果你的桌面布局复杂（例如有多层置物架、双屏幕支架或错综复杂的外设摆件），或者希望赛车道严格贴合真实物体尺寸，还需要实测尺寸作为比例标尺。

先量桌面宽深和主要道具的长宽、高度，再让 Argon 生成带米制尺寸的俯视图 `PLAN/layout.svg`，并给照片加编号网格。确认物体位置和道路间隙后再建模，避免细节做好了才发现车道穿过键盘。

![官方复杂空间 2D 平面规划与米制坐标标注示例](https://best.xiaohu.ai/media/desk-racer-photo-to-game/guide-spatial-plan.webp)

Google 指南中的法隆寺建筑示例：先确定米制平面与剖面，再生成 3D。复杂桌面可借用这一方法。

**模板 2：复杂桌面 2D 俯视平面图与米制坐标生成（本文改写）**

**中文可复制版本：**

```text
请查看我上传的书桌照片与实测尺寸。以下以宽 1.2m、深 0.6m 为示例，先让我替换为自己的桌面和道具尺寸，缺少的尺寸向我确认。
因为本场景需要精确贴合物体间隙，请先不要生成任何 3D 网格代码：
1. **生成 2D 矢量平面图**：以米为单位，生成一份顶视图 2D 矢量图并保存至 `PLAN/layout.svg`，明确标注显示器底座、键盘、鼠标与边缘留白的绝对长宽与中心坐标（原点设在桌面几何中心）。
2. **叠加参考编号网格**：写一段轻量脚本或在 SVG 中绘制带编号的 X/Y 米制网格（间距 0.05m），标明计划中的闭环赛道走线与关键转弯控制点。
3. **空间通行检验**：检查键盘与显示器底座之间的预留间隙是否大于赛道宽度（0.08m），确认无阻挡后再输出坐标总结。
完成上述 2D 尺寸验证后，我们再依据这些已锁定的绝对坐标构建 3D 几何网格。
```

**English Copyable Version (Teaching Adaptation):**

```text
Review my desk photos and measured dimensions. The example tabletop is 1.2m wide and 0.6m deep; ask me to replace these and supply the measured prop sizes before fixing coordinates.
Since this build requires spatial accuracy, do NOT generate any 3D meshes yet:
1. **Generate 2D Vector Plan**: Create a top-down 2D floorplan in metric units and save it to `PLAN/layout.svg`. Map out the exact bounding boxes and center coordinates for the monitor base, keyboard, mouse, and margins (origin at desk center).
2. **Numbered Reference Grid**: Overlay a numbered X/Y metric grid (0.05m spacing) across the layout, plotting the planned closed track loop and key spline control points.
3. **Clearance Verification**: Verify that the gap between the keyboard and monitor base exceeds the road width (0.08m) without collisions before outputting coordinate tables.
Once we verify these 2D spatial dimensions, we will use these locked coordinates to build the 3D scene.
```

---

### 第三阶段：先问清需求，再分工执行

在 Antigravity 中发送 `/grill-me`，让模型先问清操控、机位和道具处理方式。确认第二阶段的概念图后，请它写出 `PLAN.md` 和对应的 `/goal` 指令，再开始执行。

[视频/音频](https://best.xiaohu.ai/media/desk-racer-photo-to-game/guide-parallel-agents.mp4)

《Desk Racer》的实际任务编排：氛围与界面、道具建模、纹理与标识三个子 Agent 同时工作。

#### 1. 确认玩法、机位和建模方式

先回答这些会影响实现的问题：

- *“赛车的物理操控倾向于轻快灵敏的街机手感，还是带惯性与漂移的模拟手感？”*
- *“桌面道具是直接用 Three.js 原生几何体拼装，还是通过 Blender MCP 建立带倒角与独立坐标的 GLB 模型？”*
- *“赛道高架段与键盘、显示器底座之间如何预留落点净空，防止支柱穿模？”*

**标准执行顺序**：

1. **输入素材并发起盘问**：在 Antigravity 中输入 `/grill-me`，上传桌面参考照片，要求模型此时**先不要写任何 3D 代码**。
2. **确认概念图**：让模型使用第二阶段选中的概念图；需要调整时再生成候选，在聊天窗口或 Markdown 中展示。
3. **固化计划与长期目标**：开发者确认概念图并回答盘问问题后，让模型将分步执行计划写入 `PLAN.md`，并生成一段就绪可运行的 `/goal` 指令。
4. **启动长期自主循环**：运行该 `/goal` 指令，模型将围绕“赛车能顺畅跑圈、多机位可用、资产正确加载无报错”等具体检验指标持续推进任务。

#### 2. 三个专业角色的任务分工与防冲突机制

图中是原作的三个子 Agent。跟做时可按下面的文件分工安排任务：

- **3D Desk & Props Architect（道具与场景架构师）**：负责通过 Blender MCP 编写 Python 脚本，自动化建模显示器底座、键盘与鼠标的低多边形网格，并导出为 `public/models/desk-props.glb`。
- **Nano Banana Texture & Logo Artist（纹理贴图艺术家）**：负责调用 Nano Banana 生成无缝木纹、沥青及赛道减速带贴图，为 Three.js 提供材质贴图。
- **Atmosphere & HUD Engineer（氛围打光与界面工程师）**：负责配置 Three.js 聚光灯、环境点光源、多机位跟随控制器与基础界面。

**防冲突的核心规约**：
并行不自动消除冲突。把这三项约定写入计划，由总控检查合并结果：

1. **共享单位与坐标系**：各角色统一采用米（meters）为单位，遵循 Three.js Y 轴向上坐标约定（Blender 建模时统一映射为 Z=0 桌平面），以桌面几何中心为共享世界原点。
2. **清晰的文件边界**：子 Agent 各自独立维护专属文件（`props.js`、`textures.js`、`lights.js`），跨模块修改先交给总控协调。
3. **总控智能体合并**：由主 Agent 统一在 `main.js` 与 `track.js` 中引入各模块资产，并执行射线碰撞与立柱对齐，确保所有部件无缝拼合。

🔒 MEMBERS ONLY

### 后面约 15 分钟，是会员的。

免费部分到这里。墙内还有：

约 15 分钟正文14 处图表与交互
🔓 385 篇存量深度 / 研究解读全文一并解锁🎧 全部播客音频 + 私有播客源⧉ 全文 Markdown 导出
🔥 创始 100 席已售罄 · 350+ 位会员在读

[解锁全站 $59/年](https://best.xiaohu.ai/buy/?plan=year&slug=desk-racer-photo-to-game)
[先读这篇 $1.99](https://best.xiaohu.ai/buy/?plan=single&slug=desk-racer-photo-to-game)
[按月 $6.99](https://best.xiaohu.ai/buy/?plan=monthly&slug=desk-racer-photo-to-game)

单篇费用 30 天内升年卡可全额抵扣（回复收据邮件即可）

[已是会员？邮箱登录 →](https://best.xiaohu.ai/login/?next=%2Farticle%2Fdesk-racer-photo-to-game%2F)
美元结算 · 年卡 / 单篇支持支付宝、微信；月卡需银行卡 · 年付 7 天不满意全额退。

暂时不开会员？

留个邮箱，新解读第一时间发你。确认订阅后，我把**这篇的一页纸**一起发过去。

[全部订阅方式（RSS / Telegram / 播客）→](https://best.xiaohu.ai/subscribe/)

### 实操带走包

滚动查看原始 Markdown，复制后可按团队实际系统与政策修改。
Markdown · 会员

```
正在载入 Markdown…
```

↑ 正文结束

[阅读原文 ↗](https://x.com/genevieve__h/status/2110041611455353197)

### 相关解读

[深度 Claude 动效实战指南：完整提示词、修改方法和导出步骤 10-11 · 25 分钟](https://best.xiaohu.ai/article/claude-motion-lab/)[深度 Claude Motion 与 Dashboards 完整上手指南 把任何数据和内容做成动画视频 10-09 · 28 分钟](https://best.xiaohu.ai/article/claude-dashboards-motion-guide/)[深度 Claude Opus 5.5 写代码画出一支手绘 MV：拆解做法，教你用开源模板自己做 09-24 · 约 15 分钟](https://best.xiaohu.ai/article/opus-5-5-clawd-animation-mv/)
