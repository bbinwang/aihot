---
title: "Chrome 推出 HTML-in-Canvas，网页文字和表单可以画进 3D 场景"
date: 2026-11-10T00:00:00.000Z
tags: ["产品发布", "Google", "Chrome", "网页开发", "聚合"]
summary: "HTML-in-Canvas 是 Chrome 157 的网页开发 API。它把真实 HTML 元素画进画布，同时让浏览器继续读到文字和控件。"
---
> **原文链接**: [https://developer.chrome.com/blog/html-in-canvas](https://developer.chrome.com/blog/html-in-canvas)
> **来源**: developer.chrome.com
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/chrome-157-html-in-canvas/) · 2026/11/10
> **说明**: 本文由 AIHot汪 自动聚合(原文即中文,未翻译)。正文取自小互 AI 解读

---

全文 Markdown · 会员

作者：Chrome for Developers11-10 · 约 8 分钟⚑ 产品动态![](https://pic.xiaohu.ai/jiedu-media/chrome-157-html-in-canvas/social/zh-9165c93e6deb.png)

Google 在 Chrome 157 中推出 HTML-in-Canvas。这套网页开发 API 把文字、按钮和表单的外观画进 2D 画布，也能把它们贴到 3D 物体表面，作为物体的纹理。浏览器仍能读取这些元素的内容和结构，因此选字、页面查找、翻译、自动填充和读屏都能继续工作。

ChromiumDev 的演示里，3D 广告牌转动时，牌面上的视频继续播放。用浏览器查找「Video」，结果直接高亮在倾斜的广告牌上。开发者需要在网页里接入这套 API，才能做出这样的效果。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/chrome-157-html-in-canvas/chromiumdev-x-bilingual.mp4)

ChromiumDev 官方演示，约 7 秒。浏览器的查找结果直接显示在 3D 广告牌上。中英双语画面说明。

进了画面
仍然是文字
3D 场景中的网页面板这行字可以选中文字与按钮的身份，仍留在浏览器里。
页面查找　「文字」**可以找到**
蓝色代表真实 HTML，网格代表画布场景。

能力示意。这里的面板是图解，实际交互效果可看下方的官方演示。

### 同样看得见的字，浏览器未必认得

普通网页上的一段文字，浏览器知道它写了什么、属于哪个段落。一只按钮，浏览器知道它能被点击，也能把它的名称交给读屏软件。这套网页元素结构，开发者称为 DOM。

网页画布 canvas 则允许程序直接决定每个位置画什么。在线设计工具、数据密集的界面和网页游戏，常用它绘制复杂画面，再借助图形芯片 GPU 处理大量图形工作。

**问题出在把文字也直接画成像素的时候。**人看见的是一句话，浏览器拿到的却只是像素。选中复制、页面查找、翻译和读屏，无法凭空知道这片像素代表什么。

开发者可以另外维护一份看不见的网页结构，补上辅助功能。复杂文字排版也可能要自己实现，连换行、不同语言的文字方向都得处理。同一份内容，画面和网页功能要分头照顾。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/chrome-157-html-in-canvas/chrome-canvas-comparison-bilingual.mp4)

官方对比演示，约 44 秒。左边用 HTML‑in‑Canvas，右边直接把文字和控件画成像素。留意左侧的选字、输入与翻译，画面相似，浏览器能做的事不同。中英双语画面说明。

想亲手点一下，可以打开 Chrome 的[画布内输入框示例](https://chrome.dev/html-in-canvas/demos/text-input.html)。它需要浏览器支持这套 API。

### 把真实网页元素画进去，省掉悬在上面的那一层

另一种常见办法，是在画布上方盖一层普通网页元素。这样文字当然可以复制，但滚动、缩放或转动 3D 镜头时，两层内容要不断对齐。帧时机没跟上，就会出现抖动和错位。

浮层还有一个空间上的局限。它盖在整块画布上面，想让一段文字藏到 3D 物体后面、进入玻璃材质或出现在镜中，就很难自然融入场景。

HTML‑in‑Canvas 把这两件事接了起来。开发者把真实 HTML 元素放进画布内部，再将它们的外观绘到画布里。在 3D 场景中，外观会成为贴到物体表面的画面，也就是纹理。**外观进入图形系统，文字、按钮和表单的结构仍然保留。**

同一份 HTML，两条路径一起工作
**真实网页元素**文字、表单、按钮与样式输入框　姓名

**外观 → 画布**绘成像素或纹理
移动、缩放
参加 3D 场景与特效
**结构 → 浏览器**知道字写了什么
知道哪里是按钮
搜索、读屏、输入

最后对齐同一处屏幕位置
**看见的按钮，才正好是能点的按钮**

机制示意。HTML 的结构不会因为外观画进画布就消失，图形绘制与网页交互需要保持对应。

假设画面里的一只按钮从左边移到右边。过去用浮层时，应用每一帧都要重新计算它该在哪，再修改上层按钮的 CSS 位置，让它跟住下面的画面。浏览器还要重新处理这些样式。

现在，按钮直接画进画布，应用省掉了反复修改浮层 CSS、让两层画面追着对齐的步骤。具体快多少，仍取决于应用。

### 复制和翻译回来，背后是一整套网页能力

对使用者来说，最明显的改变就是习惯的动作重新有效。画布里的段落可以选中、复制粘贴、右键操作，用页面查找定位，或者让浏览器翻译。输入框则可以接上自动填充。

Users can translate or search for text inside WebGL and WebGPU textures.用户可以翻译或搜索 WebGL、WebGPU 纹理中的文字。

WebGL 和 WebGPU 是网页调用图形芯片的两种技术。文字贴进它们绘制的场景后，只要真实 HTML 还在，浏览器就仍能读取其中的内容。

恢复的能力还包括几组容易被忽略的细节。

- **排版与表单继续交给浏览器。**多行换行、双向文字、CSS 样式以及原生表单控件，都能与画布效果结合，减少应用自己另造一套排版系统的负担。
- **辅助工具仍有结构可读。**读屏软件可以辨认这些文字与控件。爬虫和 Agent 也能读取、索引保留下来的 DOM 内容，无须只面对一片像素。
- **扩展和开发工具也能参与。**文字替换扩展改动网页文字后，3D 物体上的内容可以随之更新。开发者则能在 Chrome DevTools 里检查这些元素，直接调整 CSS。

这里仍有一个前提。按钮本身要有合适的名称和结构，应用也要正确绘制、同步位置。保留 HTML 给了辅助功能工作的基础，应用的交互设计仍要做好。

### 按钮变了颜色，画布还得再画一次

保留网页元素之后，还要让它的外观跟得上变化。一次绘制只把那个时刻的外观画进去。鼠标移到按钮上，网页样式已经变色，画布中的旧画面却需要更新。

浏览器为此提供了一种重绘通知，名叫 `paint`。文字、布局、样式或 CSS 动画有变化时，浏览器通知应用。应用接到通知，再把变化后的元素画回画布。

提交**旧画面**已经画进画布
提交**收到通知**样式变了
触发 paint
提交**应用重绘**新颜色出现

重绘过程示意。浏览器通知变化，应用负责把新外观更新到画布，两步都需要。

画面更新了，点击区域也得跟上。例如游戏里的终端屏幕从正面转向侧面，屏幕上的按钮在你眼里变窄了。浏览器需要知道这个变化，才能让点击区域和读屏、放大镜等辅助工具使用的边界一起对准它。

二维画布默认随绘制完成这件事。在 WebGL、WebGPU 的 3D 场景中，图形程序可以把画面移动、转向或拉伸，浏览器无法自动知道按钮最后出现在哪里。**应用要把按钮的新位置、大小和朝向报给浏览器。**否则，画面已经转过去，能点中的区域还可能留在原处。

因此，把 HTML 放进 canvas 只是开始。能否跟手、能否点准，还要看更新与位置同步有没有接好。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/chrome-157-html-in-canvas/chrome-canvas-overview-bilingual-570893ef5588.mp4?v=570893ef5588)

官方概览，约 14 分钟。3:15 后进入接入步骤，6:30 后讲重绘，9:56 后讲点击位置同步。配有中英双语字幕。

### 游戏里的终端、设计工具的文字，都能用上

在 3D 游戏和沉浸式网页中，终端屏幕、可阅读的书本，可以直接容纳真实网页元素。它们随场景移动，又能保留文本选择和输入能力。官方的 [3D 广告牌示例](https://chrome.dev/html-in-canvas/demos/billboard.html)展示了这种结合。

在大型画布应用中，界面控件能够进入工作区。应用不必为每一种控件重复补上浏览器早已提供的排版和辅助功能，也有机会减少随应用加载的实现代码。

创作工具还可以让排版好的网页文字参与图形特效。比如给文字加上波纹、扭曲效果，再把整个画布一起导出，省去把网页浮层另行拼回成品的麻烦。

图片导出对应 `toDataURL()`、`toBlob()`，视频流对应 `captureStream()`。导出的图片和视频保存的是合成画面，文字选择、按钮点击这些网页交互留在应用中。

在画面里编辑
把整个画面带走
**应用里**文字可选，表单可填
与 3D 场景、像素效果共存
**导出后**文字与图形一起保存
成品是图片或视频画面

导出结果示意。画面可整体带走，网页交互不会随图片或视频一同保留。

### Chrome 已正式支持，其他浏览器要有备用方案

HTML‑in‑Canvas 已在 Chrome 157 稳定版推出。开发者仍应先检测浏览器有没有这项能力，再决定使用哪条渲染路径。缺少支持时，可以保留普通网页界面、使用 HTML 浮层，或按需求采用截图渲染类工具。

已有图形库开始接入，使用这些工具的开发者可以少写一部分底层代码。

| 工具 | 已有接入方式 |
| --- | --- |
| Three.js | 通过 `HTMLTexture` 提供实验性支持。 |
| PlayCanvas | 用 `setSource()` 更新 HTML 纹理。 |
| Babylon.js | 提供 `HtmlTexture` 绑定。 |
| PixiJS | 从 v8.19.0 起内置 `HTMLSource` 支持。 |
| CanvasUI | 为 HTML‑in‑Canvas 设计的开源组件库。 |

这些属于社区项目，不由 Google 或 Chrome 团队维护和正式支持。回退时常见的 three‑html‑render、html2canvas、dom‑to‑image 也是第三方工具，选用时要核对它们能保留哪些交互，不能只比较截图像不像。

对于做网页工具的人，这项能力最值得尝试的地方，是原本不得不在画布外再补一层文字或控件的区域。先把一个输入框、一张卡片接好，再检查复制、搜索、缩放和点击是否都跟得上，才容易判断它能替自己的产品省下什么。

### 给动手的人

接入路径有三步。先声明哪些 HTML 可以绘制，再在内容变化时更新画面，最后让交互位置与画面一致。二维、WebGL 和 WebGPU 共用第一步，后两步各有分工。

1. **准备画布。**在 canvas 上设 `content="drawable"`，并给需要独立绘制的元素加 `drawable`。嵌套元素也可单独标记，它会从父元素的绘制内容中分出来，位置和动画可以单独控制，HTML 的语义关系仍保留。
2. **绘制并监听变化。**二维用 `drawElementImage()`。WebGL 先分配纹理存储，再用 `texElementSubImage2D()` 更新。WebGPU 先创建纹理，再调用 `drawElementImageToTexture()`。监听 `paint`，把变化后的内容重绘。
3. **同步交互位置。**二维默认自动同步。3D 需要构造 `DOMMatrix`，通过 `updateElementGeometry()` 传入对应位置变换。看得见的区域、实际点击区域与辅助工具的边界要对齐。

**查看二维接入骨架与特性检测**

以下是便于核对步骤的骨架。CSS 尺寸、设备像素比例及业务点击逻辑应按实际应用补齐。

```
<canvas id="canvas" width="600" height="400"
        content="drawable">
  <div id="card" drawable>
    <p>可以选择的文字</p>
    <button>提交</button>
  </div>
</canvas>
```

```
function supportsHtmlInCanvas() {
  if (typeof document === 'undefined') return false;
  const probe = document.createElement('canvas');
  probe.setAttribute('content', 'drawable');
  return probe.content === 'drawable';
}

if (supportsHtmlInCanvas()) {
  const canvas = document.getElementById('canvas');
  const card = document.getElementById('card');
  const ctx = canvas.getContext('2d');

  canvas.addEventListener('paint', () => {
    ctx.reset();
    ctx.drawElementImage(card, 20, 20);
  });
  canvas.requestPaint();
} else {
  // 在这里启用应用自己的备用界面。
}
```

接入时还要留意几处边界。

- 在 `paint` 里改动 DOM，变化要到下一帧才可绘制，还可能再次触发重绘。通常在更早的更新阶段修改内容。
- 连续动画可以用 `requestPaint()` 主动请求下一帧。嵌套画布会先绘内部，再让外部合成已经更新的结果。
- 默认后更新几何的元素优先接收点击。更新背景时可用 `preserveHitTestOrder` 保留顺序，移除元素的画布交互区域则用 `clearElementGeometry()`。
- 用 `ResizeObserver` 让画布网格匹配显示区域的设备像素，减少拉伸模糊。DOM 测量、画布绘制和几何同步使用的单位不同，需按[官方尺寸说明](https://developer.chrome.com/docs/web-platform/html-in-canvas/concepts#sizing-and-units)换算。

[官方完整文档](https://developer.chrome.com/docs/web-platform/html-in-canvas) · [二维接入](https://developer.chrome.com/docs/web-platform/html-in-canvas/2d) · [WebGL 接入](https://developer.chrome.com/docs/web-platform/html-in-canvas/webgl) · [WebGPU 接入](https://developer.chrome.com/docs/web-platform/html-in-canvas/webgpu)

让编程 Agent 帮忙接入时，可参考 [Modern Web Guidance](https://developer.chrome.com/docs/modern-web-guidance)。更多效果见[社区演示集合](https://github.com/GoogleChromeLabs/css-web-ui-demos/blob/main/html-in-canvas/awesome-html-in-canvas.md)，实现问题可向 [WICG 仓库](https://github.com/WICG/html-in-canvas/issues)反馈。

来源HTML-in-Canvas in Chrome 157: Interactive DOM inside 2D, WebGL, and WebGPUNatalia Markoborodova · Chrome for Developers·2026-10-26·[查看主材料](https://developer.chrome.com/blog/html-in-canvas)延伸[Chrome 的 HTML-in-Canvas 技术文档](https://developer.chrome.com/docs/web-platform/html-in-canvas)·[Chrome 157 平台更新记录](https://chromestatus.com/release-notes/157#html-in-canvas)·[ChromiumDev 的 3D 广告牌演示](https://x.com/ChromiumDev/status/2119814186561638756)

### 为什么画面一样，能做的事却不同？

Chrome 157 推出的 HTML-in-Canvas，让真实网页元素的外观进入二维画布或三维物体表面，同时保留浏览器能理解的结构。它要解决的，是图形效果与网页功能长期分开维护的问题。

普通网页用 DOM 记录文字内容、按钮名称和元素关系。canvas 则让程序直接绘制画面；**如果文字只被画成像素，浏览器就无法仅凭这些像素完成选字、查找、翻译和读屏。**

常见补救是在画布上盖一层 HTML。网页功能回来了，但滚动、缩放或转动镜头时，两层要持续对齐；浮层也很难自然参与三维场景的遮挡、玻璃和镜面效果。

### 同一份 HTML，连接两套能力

开发者把真实 HTML 元素放进 canvas，再把它们的外观绘入画布；在三维场景里，这份外观成为物体表面的纹理。这样，内容能随场景移动，浏览器也仍有网页结构可读。

#### 外观进入图形系统，结构留给浏览器

**外观进入图形系统，文字、按钮和表单的结构仍然保留。**

**真实 HTML**文字 · 按钮 · 表单
外观 → 图形**2D 画布／3D 纹理**参与场景移动、遮挡与图形效果
结构 → 浏览器**DOM 内容与语义保留**支撑选字、查找、翻译、自动填充与读屏

ChromiumDev 的演示中，广告牌转动、视频继续播放，页面查找「Video」的高亮直接出现在倾斜的牌面上。

换行、双向文字、CSS 和原生表单也能继续交给浏览器，减少应用另造排版系统的负担。开发者仍须提供合适的名称、语义和交互设计。

### 能显示，还要能更新、能点准

一次绘制只记录当时的外观。文字、布局、样式或 CSS 动画改变时，浏览器通过 `paint` 通知应用，由应用重新绘制。**仅保留 DOM，不会让旧画面自行更新。**

位置同步是另一件事：二维画布默认随绘制同步；WebGL、WebGPU 的三维场景需要应用把元素的新位置、大小和朝向报给浏览器，否则可见按钮与实际点击区域可能错开，辅助工具的边界也会不准。

**更新外观**内容或样式变化 → `paint` 通知 → 应用重绘通知发生后，仍由应用把新外观画回去。
**对齐位置**三维位置变化 → 应用上报几何变换 → 点击与辅助边界对齐2D Canvas 默认随绘制同步。WebGL 和 WebGPU 需显式上报。

### 用在图形与网页功能交汇的地方

游戏终端和三维书本可以容纳可读、可输入的网页内容；设计工具可以让文字与控件进入工作区，减少另做排版、辅助功能和浮层对齐的负担。**省掉这些步骤不等于固定幅度的性能提升，具体收益取决于应用。**

文字也能参与波纹、扭曲等图形效果，并随画布一起导出，减少把网页浮层另行拼回成品的麻烦。

### 从一个输入框开始接入

HTML-in-Canvas 已在 Chrome 157 稳定版推出。开发者仍应先检测能力，缺少支持时保留普通网页界面、HTML 浮层或合适的截图渲染路径；截图相似不代表保留了交互。

接入分三步：**声明可绘制元素 → 监听变化并重绘 → 同步交互位置。**可以先接一只输入框或一张卡片，检查复制、搜索、缩放和点击是否都跟得上，再判断是否扩大使用。

展开接入要点：声明、绘制、位置同步

① 声明可绘制内容在 canvas 上设置 `content="drawable"`，给需要独立绘制的元素加 `drawable`。先检测浏览器能力，再选择渲染路径。
② 绘制并监听 paint二维用 `drawElementImage()`；WebGL 先分配纹理存储，再用 `texElementSubImage2D()` 更新；WebGPU 先创建纹理，再调用 `drawElementImageToTexture()`。
③ 同步交互位置2D Canvas 默认随绘制同步。WebGL 和 WebGPU 用 `DOMMatrix` 构造变换，再通过 `updateElementGeometry()` 上报，让可见区域、点击区域与辅助边界对齐。
更新时机与尺寸在 `paint` 回调中修改 DOM，要到下一帧才能绘制，还可能再次触发重绘。连续动画可以用 `requestPaint()` 请求下一帧；尺寸换算与设备像素比例也要按实际应用处理。

原文版权归原作者，这里只供对照阅读。 [看原网页 ↗](https://developer.chrome.com/blog/html-in-canvas)

## HTML-in-Canvas in Chrome 157: Interactive DOM inside 2D, WebGL, and WebGPU | Blog | Chrome for Developers

Chrome 157 ships the HTML-in-Canvas API, letting you render live, interactive, and accessible DOM subtrees into 2D, WebGL, and WebGPU canvases.

Skip to main content

### HTML-in-Canvas in Chrome 157: Interactive DOM inside 2D, WebGL, and WebGPU

![Natalia Markoborodova](https://web.dev/images/authors/nmarkoborodova.jpg)

Published: October 26, 2026

Following a [successful origin trial](https://developer.chrome.com/blog/html-in-canvas-origin-trial), Chrome 157 marks the official stable release of the HTML-in-Canvas API. The HTML-in-Canvas API bridges the gap between the interactive, accessible world of the DOM and the high-performance, pixel-level control of `<canvas>`. This API gives you the best of both worlds—rich browser capabilities and GPU-accelerated canvas graphics.

Video overview of the HTML-in-Canvas API.

### The canvas versus DOM dilemma

Previously, when creating visually demanding web apps, you had to choose between standard HTML elements and raw canvas contexts.

| Technology | Strengths | Limitations |
| --- | --- | --- |
| `<canvas>` | Low-level pixel control with GPU access to drive 2D and 3D graphics pipelines, custom shaders, and offscreen workers. High-performance rendering for heavy, data-dense UIs. | No built-in web platform features such as text selection, copy and paste, right-click actions, and text wrapping. The opaque pixel grid doesn't support screen readers, Find-in-Page, auto-translate, or autofill by default, and requires a fallback implementation. |
| `HTML` | Semantic UI out of the box with built-in form controls, responsive typography, and CSS styling. Deep browser integration for screen readers, Find-in-Page, and DevTools. | Limited ability to control performance for complex UIs. Visual effects are restricted to standard CSS and SVG without direct pixel manipulation or shaders. |

#### Before HTML-in-Canvas

Before this API, if you built canvas-heavy UIs, you had to choose between two approaches, each with its own downsides:

1. **Rendering text directly as canvas pixels ([fillText()](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/fillText))**: Apps drew text and UI controls imperatively as raw pixels. This approach resulted in the following downsides: **Accessibility breakdown**: Screen readers and assistive tools can't read canvas pixels unless you manually construct and sync an invisible fallback DOM. **Loss of browser features**: Users can't search with Find-in-Page (Ctrl/Cmd+F), copy and paste text naturally, trigger context menus, or use browser translation and spellcheck. **Complex typography engines**: Supporting internationalization requires bundling large JavaScript layout engines.
2. **Floating HTML overlays on top of the canvas**: For example, using libraries that position standard HTML elements over the canvas by calculating bounding boxes and matrix transforms in JavaScript. The downsides of this approach include: **Synchronization lag and visual tearing**: Scrolling, zooming, or camera movements in 3D can cause the overlay DOM elements to drift or jitter relative to the canvas pixels due to frame-timing differences. **Clipping and z-ordering limitations**: HTML overlays always sit *on top* of the entire canvas buffer. Embedding HTML *inside* a 3D scene (for example, behind a 3D object, inside a glass material, or reflected in a mirror) wasn't possible without complex iframe-to-image workarounds. **Performance overhead**: To keep overlays aligned with the canvas, you have to recalculate each overlay's transform in JavaScript and write it to `style.transform` on every frame. The browser then parses each string and recalculates the element's style before it can render the frame, so main-thread work grows with every overlay that you add. In a 2D context, `drawElementImage()` updates the element's position for you. In WebGL and WebGPU, you pass the transform that you calculate to `updateElementGeometry()` as a matrix. Either way, the browser doesn't parse CSS or recalculate styles.

### Key benefits of HTML-in-Canvas

HTML-in-Canvas eliminates these trade-offs. By placing HTML inside the `<canvas>` element, the content remains interactive, and all browser integrations function automatically.

HTML content rendered inside a `<canvas>` has the same capabilities of HTML outside of `<canvas>`:

- **Text layout and formatting**: support for text layout and formatting, including multiline or bidirectional text with CSS styles applied.
- **Form controls**: expressive form controls with extensive CSS and shader customization options.
- **Text selection, copy and paste, and right-click**: Users can highlight text inside 3D scenes or trigger context menus.
- **Accessibility**: HTML content rendered inside the canvas is exposed to the accessibility tree for screen readers.
- **Browser features integration**: Browser features such as translate, autofill, and Find-in-Page work out of the box. Users can translate or search for text inside WebGL and WebGPU textures.
- **Extension integration**: Browser extensions work on the content. For example, a text-replacement extension automatically updates the text rendered on your 3D meshes.
- **DevTools integration**: Inspect and tweak CSS styles for canvas UI elements directly in Chrome DevTools.
- **Indexability and AI agents**: Web crawlers and AI agents can index DOM content rendered into 2D and 3D scenes.
- **Media editing and export**: Export full canvas composites containing live DOM elements directly to images (`toDataURL()`, `toBlob()`) or video streams (`captureStream()`).

[视频/音频](https://developer.chrome.com/static/blog/html-in-canvas/video/html-in-canvas-demo-comparison.mp4)

Demo comparing feature integration of text rendered directly into a canvas and HTML-in-Canvas. In the HTML-in-Canvas pane, the content is selectable and translatable, and browser features such as autofill work out of the box. In the standard canvas pane, the content is rendered directly into a canvas using the `fillText` method and isn't interactive.

### Primary use cases

HTML-in-Canvas unlocks capabilities across several areas:

- **Large canvas-based apps**: Heavyweight web apps can render UI components directly into canvas workspaces, improving accessibility and reducing bundle size.
- **3D scenes and games**: Immersive WebXR experiences and games can position interactive DOM elements—such as in-game terminals or readable 3D books—directly inside scenes.
- **Media editing and export**: Creative tools combining rich HTML typography with shader effects can export composite scenes directly into images or video streams.
- **Expressive UIs**: You can manipulate HTML content as raw pixels to build shader-driven visual effects.

### HTML-in-Canvas quickstart

Rendering HTML in a canvas requires the following steps:

1. **Prepare your canvas.** Declaratively set the right attributes to let the browser know it should render HTML into a canvas. This setup is identical across 2D, WebGL, and WebGPU contexts. Learn how to [set your canvas up](https://developer.chrome.com/docs/web-platform/html-in-canvas/concepts#prepare) and how to [declare HTML elements to be drawn independently](https://developer.chrome.com/docs/web-platform/html-in-canvas/concepts#drawable). `<!-- Prepare your canvas by setting the `content` attribute --> <canvas id="canvas" width="600" height="400" content="drawable"> <!-- Mark child as `drawable` to render to canvas --> <div id="myElement" drawable> <!-- Your HTML here --> </div> </canvas>`
2. **Draw the element image into the canvas.** The exact implementation depends on whether you render HTML in a [2D](https://developer.chrome.com/docs/web-platform/html-in-canvas/2d), [WebGL](https://developer.chrome.com/docs/web-platform/html-in-canvas/webgl), or [WebGPU](https://developer.chrome.com/docs/web-platform/html-in-canvas/webgpu) context. `const ctx = canvas.getContext("2d"); // Draw HTML element into canvas in 2D ctx.drawElementImage(myElement, myElementX, myElementY);`
3. Optional: **Synchronize the DOM and the pixels.** Geometry synchronization also depends on the context you use. In 2D, the browser handles it automatically by default, while in 3D contexts you need to construct a transform and pass it to the `updateElementGeometry` method. `// In 3D, construct a transform as needed, for example: const transform = new DOMMatrix().translate(x, y); // Synchronize the element's DOM and pixels canvas.updateElementGeometry(myElement, { canvasTransform: transform });`

### Framework and ecosystem support

Major WebGL and 3D graphics libraries support HTML-in-Canvas:

- **Three.js**: offers experimental support using `THREE.HTMLTexture`. `const material = new THREE.MeshBasicMaterial(); material.map = new THREE.HTMLTexture(uiElement); const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material); scene.add(mesh);`
- **PlayCanvas**: supports HTML texture streaming using `setSource()`. `canvas.addEventListener('paint', () => { htmlTexture.setSource(htmlElement); }, { once: true });`
- **Babylon.js**: provides built-in binding through `BABYLON.HtmlTexture`. `const htmlTexture = new BABYLON.HtmlTexture("htmlTexture", uiElement, scene); material.diffuseTexture = htmlTexture;`
- **PixiJS**: shipped built-in support in version `v8.19.0` with `HTMLSource`. `import { HTMLSource } from 'pixi.js/html-source'; const sprite = Sprite.from(new HTMLSource({ resource: form, autoUpdate: true })); app.stage.addChild(sprite);`
- **CanvasUI**: an open-source component library designed specifically for HTML-in-Canvas.

For more implementation details, check each framework's documentation.

### Feature detection and fallback strategies

To ensure cross-browser compatibility, verify API support before running your code:

```
export function supportsHtmlInCanvas() {
  if (typeof document === "undefined") return false;
  const canvas = document.createElement("canvas");
  canvas.setAttribute("content", "drawable");
  return canvas.content === "drawable";
}
```

If the API is unavailable, you can fall back to alternative UIs, floating HTML overlays, or one of the available libraries (for example, `three-html-render`, `html2canvas`, or `dom-to-image`).

### Next steps

- Explore the complete [Chrome for Developers HTML-in-Canvas documentation](https://developer.chrome.com/docs/web-platform/html-in-canvas).
- Upgrade coding assistants using [Modern Web Guidance](https://developer.chrome.com/docs/modern-web-guidance).
- Share feedback on the [WICG GitHub repository](https://github.com/WICG/html-in-canvas/issues).
- Check out the [HTML-in-Canvas community demos](https://github.com/GoogleChromeLabs/css-web-ui-demos/blob/main/html-in-canvas/awesome-html-in-canvas.md).

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-10-26 UTC.

↑ 正文结束
✓ 本篇全文免费开放

读完还有疑问？会员每天能问小互 30 次，每句带出处；还有一份按你口味挑好的每日 AI 日报。
[成为会员 $59/年](https://xiaohu.ai/buy/?plan=year&slug=chrome-157-html-in-canvas&from=tail)[按月 $6.99](https://xiaohu.ai/buy/?plan=monthly&slug=chrome-157-html-in-canvas&from=tail)

7 天内不满意全额退 · [看会员能多什么 →](https://xiaohu.ai/membership/)

[阅读原文 ↗](https://developer.chrome.com/blog/html-in-canvas)

📮 新解读每晚进邮箱

读完觉得有用？留个邮箱，每晚一封当天的新解读，随时退订。
