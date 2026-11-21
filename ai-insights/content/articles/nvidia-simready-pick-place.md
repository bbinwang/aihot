---
title: "Hugging Face 发布基于 SimReady 的机器人仿真教程：Agent 组装并写抓取控制"
date: 2026-11-14T00:00:00.000Z
tags: ["AI 实操", "NVIDIA", "机器人仿真", "Isaac Sim", "Hugging Face", "AI Agent"]
summary: "想让机械臂在仿真里练抓一个易拉罐，难点在于厂商给的 3D 模型只有外形，碰撞、质量、关节得开发者自己一样样补，补完还说不准对不对。这份教程的解法是：这些设置已经做好的资产直接从 Hugging Face 下载，组装和抓取控制交给 Agent"
---
> **原文链接**: [https://huggingface.co/blog/nvidia/simready-assets-robot-pick-and-place](https://huggingface.co/blog/nvidia/simready-assets-robot-pick-and-place)
> **来源**: huggingface.co
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/nvidia-simready-pick-place/) · 2026/11/14
> **说明**: 本文由 AIHot汪 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)。正文取自小互 AI 解读

---

## Full Markdown · Membership

**Author:** NVIDIA11-14 · **Approx. 10 mins**

**UR17G Robotic Arm**
Universal Robots · **Joint** driven **Collision** mass**

**Robotiq 2F-140 Gripper**
Robotiq · **Joint** driven **Collision** mass**

**Soda Can**
NVIDIA · **Collision** mass** texture**

Agent assembly · Write control

ISAAC SIM 6.2

[Video/Audio](https://pic.xiaohu.ai/jiedu-media/nvidia-simready-pick-place/pp-hero.mp4)

Three assets are downloaded from SimReady Central, complete with the physics settings required for simulation. The Agent uses Isaac Sim's built-in skills to assemble them into a robot and write the control code. The video is the finished product from the beginning of the tutorial.

To teach a robotic arm to grasp a soda can, one usually first practices in a simulation environment on a computer: repeatedly training and testing in a virtual scene, and then deploying to the real machine once it's ready. This is troublesome from the very first step. CAD models provided by manufacturers only have the external shape; for simulation, you also need to know the weight of each part, the shape of contact when hitting objects, surface friction, joint rotation, and what drives them. Developers have to fill these in one by one. If filled incorrectly, the model looks perfectly normal when static, but fails when running: if collision shapes are not written, the can will pass directly through the gripper; if joints are set incorrectly, the arm segments cannot move in coordination; if mass and friction are incorrect, the grasped object will not be held firmly. When multiple manufacturers' equipment is used in the scene, this work must be done several times, and even after completion, you cannot be sure if your settings are correct.

Even if the models are all filled in, you still need to assemble the robotic arm and gripper into a robot that can be controlled uniformly, and then write the control code for approach, clamping, lifting, transporting, and releasing. This step originally had to be done manually step-by-step according to Isaac Sim (NVIDIA's robot simulation software) official tutorials. NVIDIA's tutorial released on Hugging Face delegates these steps: the robotic arm, gripper, and soda can are downloaded directly from SimReady Central, an open library of over 2,000 "Simulation Ready" (SimReady) 3D assets, free and without application. The collision, mass, and joint settings for the robotic arm and gripper are done by Universal Robots and Robotiq, accompanied by verification reports; assembly and grasping control are handed over to an AI Agent equipped with Isaac Sim skills.

The tutorial uses a UR17G robotic arm, a Robotiq 2F-140 gripper, and a soda can to complete the download, assembly, and pick-and-place steps in Isaac Sim 6.2, finally moving the can from the yellow point to the green point. What is worth watching is the change in division of labor: this tedious work of filling in physical attributes has been moved forward to manufacturers, assembly and writing control are handed over to the Agent, and the remaining work for humans becomes three: reading the report, setting acceptance criteria, and judging how far the results can be trusted. The tutorial clearly defines the boundaries of this demonstration, and the original verification report contains information not detailed in the main text, which is laid out below.

### What kind of asset counts as SimReady?

The failures mentioned at the beginning cannot be seen when the model is still. Let's slow down the most typical one below: the same gripper, one with only the external shape, one with the settings required for simulation written out.

The same gripper, looks the same, moves differently
Schematic: Left has only the external shape, right has collision shape, mass, and joint drive written out

Only external shape, no collision shape or joint drive written

**Passed through:** When fingers close, they pass directly through the can body; after lifting, the can remains in place.

SimReady asset collision shape, mass, joint drive all written out

**Grasped:** Fingers stop at the can body surface (dashed line is the can's collision shape), lifting the can by contact and friction.

SimReady is designed to plug these holes in advance. According to the original definition: an OpenUSD asset that has the necessary attributes prepared for a specific simulation purpose, such as collision, mass, joints, and joint drive, is called SimReady. OpenUSD is an open 3D scene description format that can write geometry, assembly structure, materials, and physical attributes into the same set of files. Joint drive can be understood as the settings for the "motor" on the joint: how the joint is pushed to rotate, how fast it rotates, and the maximum force it can output.

What "prepared" specifically refers to is determined by NVIDIA's SimReady Foundation specification. It is divided into three layers:

Three layers of SimReady specification: Purpose → Capability → Checkable settings per item
Taking one item actually verified for the two robot assets in this task as an example

Profile
**A complete set of functions required for a type of purpose**
Example: The robotic arm is verified according to the "Robot Base" profile, and the gripper is verified according to the "Robot Gripper" profile.

Feature
**Capabilities that must be possessed for this type of purpose**
Example: Joints can be controlled to rotate. Under the PhysX physics engine, this item is called FET_022_PHYSX (PhysX driven joint).

Requirement
**Settings checked item by item under each capability: FET_022_PHYSX has 8 items in total, such as**

- `DJ.004` Each joint has drive or follow settings
- `DJ.005` Joint has maximum speed written
- `DJ.011` Joint chain cannot form a loop at the head and tail

Requirement names are translated according to the SimReady Foundation documentation. "Follow" refers to settings where one joint follows another, such as the two fingers of a gripper. The verification tool checks item by item, and the report records whether each capability passed or failed.

Focusing on this task, the key points are the joints of the robotic arm and gripper, and the collision shape and mass of the soda can. The verification tool checks whether these settings are written correctly according to the profile requirements; simulation checks whether the assembled robot can actually pick up and move the can relying on these settings. These two matters need to be viewed separately, which will be useful when reading the report later.

### What is in the downloaded package, and what do you still need to fill in?

The packages for the three assets contain the models themselves and their simulation settings:

- The robot's model, joints, and gripper;
- The soda can's model and texture;
- Collision bodies, mass attributes, and physical materials, and joint drives where needed;
- Profile names, versions, and verification records.

What is not in the package is the "task". You need to supplement (or let the Agent supplement) the workbench and where the robot is placed, where the can starts from and where it needs to be placed, the controller to move the robotic arm and open/close the gripper, and the sequence and checks for the entire pick-and-place action.

![Original Image 2: The left column is the content brought by the SimReady Central asset package, the right column is the task part supplemented by the Agent in Isaac Sim](https://pic.xiaohu.ai/jiedu-media/nvidia-simready-pick-place/J7YL_C3mUh7MWUNJ_pVtN.png)

Original Image 2: The left column (✓) is what the asset package brings, which are the four items listed above; the right column (+) is the task part supplemented by the Agent in Isaac Sim. The small text at the bottom reminds: which attributes and which verification records each asset carries vary by asset and profile.

### Three steps to assemble: Download, Assemble, Run

Before starting, you need to prepare three things: Isaac Sim 6.2 used in the tutorial (check its hardware requirements first); an AI Agent capable of loading Isaac Sim skills; and if you plan to download assets via the command line, install a Hugging Face command-line tool.

The Agent used in the tutorial is backed by GPT-6 Sol. The original text says that other Agent and model combinations may also work, provided they can load the required skills and execute Python on Isaac Sim. The generated code and results will vary. The Agent can "get hands-on" with Isaac Sim relying on the following connection:

How the Agent operates a running Isaac Sim
The Agent sends Python code to Isaac Sim to execute, and takes back screenshots and logs to judge the next step.

**AI Agent** In this example, GPT-6 Sol. It must be started from the Isaac Sim installation directory to find the skills bundled with the software.
Python Code →← Screenshots, Logs *Localhost port 8226*
**Isaac Sim 6.2** Starts the Python service (python_server) so that external programs can send code into it.

Skills are a set of manuals built into Isaac Sim (each skill in the skills folder has a SKILL.md). The Agent first looks at the introduction of each, and only reads the full text if the task matches. Four are used this time:

`isaac-sim-remote` Steps 2 and 3
Remotely control the running Isaac Sim via Python service: execute code, open scenes, modify objects, take screenshots, advance physics, read logs.
`usd-articulation` Step 2
Check and assemble multi-joint chains, connecting the robotic arm and gripper into a whole.
`manipulation-ik` Step 3
Inverse kinematics and grasping coordinates: given the position the gripper needs to reach, calculate backwards how much each joint should rotate.
`physics-simulation` Step 3
Physics settings: rigid bodies, collisions, joint drives, contact materials, and choosing between PhysX or Newton physics engines.

Skill descriptions and port numbers come from the Isaac Sim 6.2 Agent skill documentation. The documentation also reminds: the Python service must be bound to the local address 127.0.0.1; changing it to 0.0.0.0 means allowing any machine on the LAN to execute arbitrary code in your Isaac Sim. Agents like Cursor, Claude Code, and Codex command line have ready-made connection methods.

#### Step 1: Download the robotic arm, gripper, and soda can

Open SimReady Central, find these three assets, click Download for each, and choose "Save to folder" or copy the given Hugging Face command. The three asset folders must be kept intact for Isaac Sim to find their supporting files. Use the versions in the tutorial link to tell the Agent the USD file paths of the three assets on the local machine. The gripper path looks roughly like this, depending on where you downloaded it:

```
~/ASSETS/hf/src/simready-assets-c7fa7615/Robotiq_2F_140/simready_usd/Robotiq_2F_140.usda
```

[Video/Audio](https://pic.xiaohu.ai/jiedu-media/nvidia-simready-pick-place/find-robotiq.mp4)

在 SimReady Central 中搜索 robotiq，点击 Robotiq_2F_140：右侧可以旋转预览，还列出了尺寸、活动关节数及其对应的档案（Robot-Gripper）。同一家厂商通常有多个型号，请仔细确认后再下载；易拉罐也是同样方式查找。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/nvidia-simready-pick-place/download-can.mp4)

易拉罐的下载窗口：点击橙色按钮「Save to folder」将整个包保存到文件夹，下方提供了可直接复制的 Hugging Face 命令行。

#### 第二步：让 Agent 将机械臂和夹爪组装成一台机器人

在 Isaac Sim 安装目录下，通过 Python 服务启动它，以便 Agent 能够使用 Python 与仿真进行交互：

```
./isaac-sim.sh --enable isaacsim.code_editor.python_server
```

Agent 也从该目录启动。首先确认这三项资产都能加载，没有缺失文件的报错，然后让 Agent 查看机械臂和夹爪的关节限位和驱动设置，你也可以在 Isaac Sim 界面中自行查看。接下来，需要将机械臂和夹爪组装成一个 articulation（即关节链），将其视为一个整体进行控制：机械臂的六个关节加上夹爪的开合，由同一套控制器指挥。手动组装可以参考 Isaac Sim 的机器人组装教程，该教程也提供给了 Agent：

第二步使用的提示词
根据 Isaac Sim 的机器人组装教程，将机械臂〈本地 UR17G 的 USD 路径〉和夹爪〈本地 Robotiq_2F_140 的 USD 路径〉组装起来。完成后验证此次组装。

```
Assemble the robot arm <local path to Simready ur17g robot usd>
with the gripper <local path to downloded simready Robotiq_2F_140 gripper usd>
using the Robot Assembly tutorial in Isaac Sim
https://docs.isaacsim.omniverse.nvidia.com/6.2.0/robot_setup/assemble_robots.html.

Validate the assembly on completion.
```

上面是中文意译，下面是原文。Agent 实际使用的技能：`isaac-sim-remote` `usd-articulation`

Agent 使用 Isaac Sim 自带的两个技能完成组装：isaac-sim-remote 负责远程控制正在运行的 Isaac Sim，usd-articulation 负责将机械臂和夹爪连接成关节链并进行检查，最后还验证了机器人的物理设置。至此，抓取和放置所需的要素已准备就绪：一台组装好的机器人和一个易拉罐。

[视频/音频](https://pic.xiaohu.ai/jiedu-media/nvidia-simready-pick-place/joint-settings.mp4)

原文图 5：在 Isaac Sim 中查看关节设置，前半部分是 UR17G 机械臂，后半部分是 Robotiq 2F-140 夹爪（封面这一帧是夹爪，右侧结构树中列出了左右两侧的各个指节）。这一步需要关注的是每个关节的可旋转范围以及驱动设置。

#### 运行前检查三项内容

原文特别提醒：机器人静止时看起来没问题，并不代表运动时也没问题。在正式进行抓取和放置之前，让 Agent 或者你自己先在 Isaac Sim 中过一遍：

- **关节：**即上一步中查看过的限位和驱动设置；
- **动作：**让机械臂小幅移动一下，让夹爪开合一次；
- **接触：**确认罐子稳稳立在台面上，不会掉穿下去。

在抓取和放置过程中，重点观察罐子在机械臂移动时是否会从夹爪中滑落。不同资产的内部结构不同，请以你加载的场景中的实际设置为准。

#### 第三步：让 Agent 编写控制代码并执行抓取和放置

控制器负责协调两件事：UR17G 机械臂如何移动，Robotiq 夹爪何时打开、何时闭合。这部分代码由 Agent 生成，如果你想自己阅读或修改，可以阅读 Isaac Sim 的[「添加机械臂」教程](https://docs.isaacsim.omniverse.nvidia.com/6.2.0/core_api_tutorials/tutorial_core_adding_manipulator.html)。第三步的提示词：

第三步使用的提示词
在 Isaac Sim 中，使用组装好的机器人和易拉罐〈SimReady 库中易拉罐的 USD 路径〉执行一次抓取和放置。抓取必须通过接触完成，并验证此次抓取和放置的精度及放置误差。

```
Run pick and place with the assembled robot and soda can
<path to soda can USD from SimReady library> in Isaac Sim.

Ensure you do a contact based grasp for picking up the can and validate
the accuracy/placement error for the pick and place as well.
```

「通过接触完成」指罐子必须被两根手指真正夹住，依靠摩擦力带走，不能使用将罐子直接粘在夹爪上的捷径。使用的技能：`isaac-sim-remote` `manipulation-ik` `physics-simulation`

完整任务测试的是：机械臂移动时夹爪能否一直夹住罐子，到达目标点后能否松开并放好。先将场景复位，再执行完整的六段动作：

一次抓取和放置的六段动作
示意图（侧视）。虚线和圆点是预先设定的路点，机械臂按此路径移动，途中不重新规划；关节角度按逆运动学实时计算

接近、夹紧、抬起、停住、平移、松开
**接近：**沿预先设定的路点移动到罐子正上方，然后下降到抓取高度

教程中，Agent 生成的控制代码运行出了以下结果：

[视频/音频](https://pic.xiaohu.ai/jiedu-media/nvidia-simready-pick-place/pp-run.mp4)

原文图 6：UR17G 机械臂带着 2F-140 夹爪，将易拉罐从黄色取货点搬运到绿色目标点。4 倍速播放。

如果你运行的结果不同，请记录是在哪一段出现问题，让 Agent 检查场景并重新生成控制代码。每次重试前，将罐子和机器人复位到相同的初始状态，以便比较前后几次的结果。Agent 生成的代码也需要你自己检查一遍，然后再将其修改为你的任务所用。

### 如何阅读验证报告？

两件机器人资产各带一份验证报告：机械臂按「机器人本体」档案验证，夹爪按「机器人夹爪」档案验证。原文提到，两份报告中检查关节驱动设置的那一项（PhysX 驱动关节）都通过了。将两份报告原件逐项展开，可以看到更完整的情况：

两份验证报告：在哪个物理引擎下验证，结论就只到哪
每个点是一项功能检查，按它针对的运行环境分行

**UR17G 机械臂**机器人本体档案**29** / 35 项通过*阻断项 0*

**Robotiq 2F-140 夹爪**机器人夹爪档案**27** / 36 项通过*阻断项 0*

通过/未通过带黑圈的是关节驱动检查（FET_022）

数据取自两份验证报告原件（验证工具 2026.8.0 版）。同一项功能会拆分为一条不分引擎的「通用」要求和各运行环境各自的要求，因此关节驱动的黑圈在好几行中都有；对照原文，需要看的是 **PhysX 那一行的黑圈**。Isaac 一行是 Isaac Sim 自己的检查；PhysX、Newton、MuJoCo 是三种物理引擎；MDL、OpenPBR 是两种材质格式；ROS 是常用的机器人软件框架。未通过的项在报告中都记在「可选要求」名下，没有一项标为阻断。

两份报告都不是全绿，未通过的地方很有规律：

- **机械臂：**PhysX 和 Newton 两行全过；MuJoCo 一行有两项未通过，其中一项正是关节驱动检查；另有一项通用检查和 ROS 那一项未通过。
- **夹爪：**PhysX 一行的关节驱动检查通过了，同一行另有一项检查未通过；Newton 一行 6 项只通过了 3 项，关节驱动也在未通过之列；MuJoCo 一行 7 项通过了 4 项。
- **两件都有的：**MDL、OpenPBR 两种材质格式的检查都未通过。

对用户来说，这说明「SimReady」是有前提的：按某个档案、在某个物理引擎下验证过。原文拿来当依据的是 PhysX 驱动关节检查，两份报告中这一项都通过了；同一项检查，夹爪在 Newton 下未通过，两件在 MuJoCo 下都未通过。打算换引擎运行同一台机器人，关节驱动需要自己再验证一遍。

还有一点：报告检查的是设置是否符合规格，不保证机器人一定能搬动罐子。原文的说法是，档案验证为资产复用提供了一条共同的底线，抓取和放置仿真才是在拼好的场景中检验机械臂、夹爪、罐子和控制器是否匹配。
[站内相关 · 物理引擎 NVIDIA 推出开源机器人模型 GR00T 2：给机械手装上懂物理因果的「运动小脑」可以拿捏草莓 报告里的 PhysX 和 Newton 是 NVIDIA 同时维护的两种物理引擎。这篇讲了 Isaac Lab 3.0 怎样在两者间切换，以及 Newton 在训练里快多少。](https://xiaohu.ai/article/robotics-simulation-advancements-corl/)

### 这次演示证明了什么，没证明什么？

原文用一节专门写了「仿真假设」，结论很克制：这些结果只适用于这套脚本化的设定。把它的条件和它明说不能推出的东西放在一起看：

这次抓放成功的前提
左边是演示的设定，右边是原文明说这次结果不能说明的事

##### 演示的设定

- **固定场景：**罐子起点已知，机器人固定住，工作区平整、没有杂物
- **不用视觉：**没有用摄像头找罐子，碰撞检查也只做了有限的几项
- **简化的罐子：**不模拟罐体变形和里面液体的晃动
- **夹紧力：**水平夹取，驱动力矩上限 2 N·m 是在仿真里反复试出来的，没按指尖实际受力标定，也不是厂商推荐值
- **固定路线：**机械臂沿事先定好的路点走，途中不重新规划，罐子靠接触和摩擦夹住

##### 还不能说明

- 罐子位置不确定时也能抓到
- 换成轻重不同的东西也能搬
- 换到真机器人上也一样
- 会不会把罐子捏扁（原文说这个例子没测）

2 N·m 是夹爪驱动允许出的最大力矩，在这里是让仿真夹得住的一个参数。真实夹爪的夹持力指标，原文让读者去查 [Robotiq 的产品手册](https://robotiq.com/hubfs/Product-sheets/Adaptive%20Grippers/Product-sheet-Adaptive-Grippers-EN.pdf)。

所以这次演示证明的是整条链路走得通：从公开库下载的三件资产，能在 Agent 的帮助下拼成一台机器人，在仿真里靠真实的接触和摩擦把罐子搬到位。离「这台机器人在工厂里能可靠地抓罐子」还隔着好几步：罐子位置随机、物体轻重不一、加上视觉识别，最后上真机检验。仿真资产省下的是搭场景的工夫，这几步该做的测试一样都省不了。
[站内相关 · 从仿真回到真机 Google DeepMind 发布 Gemini Robotics 2.5 机器人模型 机器人在奔驰产线开始工作 仿真练习怎样和真实示范配在一起训练、再回到真机上检验，这篇有完整的一圈。](https://xiaohu.ai/article/gemini-robotics-2-5/)

### 想自己动手，从哪开始？

- **找资产：**在 Hugging Face 上逛 [SimReady Central](https://huggingface.co/spaces/nvidia/simready-central)，也可以用它的[搜索接口](https://nvidia-simready-central.hf.space/)用自然语言找厂商上传的资产。
- **先看它能干什么：**对照 [SimReady Foundation](https://nvidia.github.io/simready-foundation/latest/) 里的档案和要求，读资产自带的验证报告，尤其看你要用的那个物理引擎那一行。
- **装软件、接 Agent：**装 [Isaac Sim](https://docs.isaacsim.omniverse.nvidia.com/latest/introduction/quickstart_index.html)（教程用 6.2 版），按 [Agent 技能文档](https://docs.isaacsim.omniverse.nvidia.com/6.2.0/development_tools/agent_skills.html)把自带技能接到你的 Agent 上；想手动组装，照[机器人组装教程](https://docs.isaacsim.omniverse.nvidia.com/6.2.0/robot_setup/assemble_robots.html)做。
- **做自己的资产：**NVIDIA 另有一篇「5 步把 CAD 做成 SimReady 资产」的[教程](https://developer.nvidia.com/blog/5-steps-to-create-simready-assets-for-robotics-with-frontier-ai-models/)，用 ABB 的双臂机器人 YuMi 从 STEP 图纸一路做到抓放；做好的资产可以按[提交指南](https://github.com/NVIDIA-Omniverse/simready-central/blob/main/.agents/skills/submit-simready-assets/SKILL.md)发到 SimReady Central。

这套演示最实用的地方，是把「这个模型能不能直接拿来仿真」变成了一件能查证的事：资产附报告，报告写明按哪个档案、在哪个引擎下验过；组装和写控制代码这类苦活，Agent 接了过去。剩下要人拿主意的，是报告里那些没过的格子和你的用途有没有关系，以及一次脚本化的成功，离你真正要的结果还有多远。
来源Build a Robot Pick-and-Place Simulation with SimReady AssetsNVIDIA·2026-11-13·[查看主材料](https://huggingface.co/blog/nvidia/simready-assets-robot-pick-and-place)延伸[Announcing SimReady Central: An Open Library of Simulation-Ready 3D Assets for Robotics and AI Factories](https://huggingface.co/blog/nvidia/simready-central-assets-robotics-ai-factories)·[SimReady Foundation：FET_022_PHYSX（PhysX 驱动关节）](https://nvidia.github.io/simready-foundation/latest/features/FET_022_PHYSX.html)·[Isaac Sim 6.2 文档：Agent Skills](https://docs.isaacsim.omniverse.nvidia.com/6.2.0/development_tools/agent_skills.html)·[5 Steps to Create SimReady Assets for Robotics with Frontier AI Models](https://developer.nvidia.com/blog/5-steps-to-create-simready-assets-for-robotics-with-frontier-ai-models/)·[UR17G 验证报告原件](https://huggingface.co/datasets/TeradyneRobotics/UniversalRobots/blob/d5d8eb795a487a5c929909bc337ee4834d62b0da/ur17g_1300/.metadata/ur17g_1300_validation.json)·[Robotiq 2F-140 验证报告原件](https://huggingface.co/datasets/Robotiq-Official/simready-assets/blob/c7fa7615a353ebac03990208cbc2aa57426f4c48/Robotiq_2F_140/.metadata/Robotiq_2F_140_validation.json)本站说明图片和视频来自 NVIDIA 原文；原文 GIF 已转成静音循环 MP4。验证报告图块的数据由两份报告原件逐项统计。

原文版权归原作者，这里只供对照阅读。 [看原网页 ↗](https://huggingface.co/blog/nvidia/simready-assets-robot-pick-and-place)

## Build a Robot Pick-and-Place Simulation with SimReady Assets

![figure-01-pick-and-place-highlight](https://cdn-uploads.huggingface.co/production/uploads/6abfe9e7d7cf09a9b38ef308/NlngGWIKZEQ8kuWKZtoyM.gif)

This walkthrough showcases a beverage can pick-and-place task that uses the [UR17G arm](https://huggingface.co/datasets/TeradyneRobotics/UniversalRobots/blob/d5d8eb795a487a5c929909bc337ee4834d62b0da/ur17g_1300/simready_usd/ur17g_1300.usda), [Robotiq 2F-140 gripper](https://huggingface.co/datasets/Robotiq-Official/simready-assets/blob/9c6b0cedf0066efd474b3bf473e7eaf7ae7e569f/Robotiq_2F_85/simready_usd/Robotiq_2F_85.usda), and [beverage can](https://huggingface.co/datasets/nvidia/simready-assets/blob/653d91e182011f357cf1644013cc94ddf194d349/food_beverage_can_n01/simready_usd/sm_food_beverage_can_n01_01.usd) to compose a scene in Isaac Sim, check their behavior, and run a pick-and-place example with agent-generated controls.

对于机器人工作流，SimReady 意味着 [OpenUSD](https://www.nvidia.com/en-us/glossary/openusd/) 资产已针对特定的仿真用例准备了所需的属性，例如碰撞、质量、关节和关节驱动器。[SimReady Central](https://huggingface.co/spaces/nvidia/simready-central) 是 Hugging Face 上的一个开放资产库，允许您重用具有已编写仿真属性和配置文件验证证据的机器人和对象资产。有关该库及其发布的更多信息，请阅读 [公告博客](https://huggingface.co/blog/nvidia/simready-central-assets-robotics-ai-factories)。

### 什么使机器人资产具备 SimReady 特性？

[SimReady Foundation](https://nvidia.github.io/simready-foundation/) 定义了 OpenUSD 资产在仿真用例中所需的功能。其规范连接了三个层级：

- 配置文件（Profile）：针对特定用例的一组功能，例如机器人主体。
- 功能（Features）：用例所需的能力，例如可控制的关节。
- 要求（Requirements）：针对每个功能所需的设置进行的检查，例如关节的驱动器设置。

在此任务中，这些属性包括机械臂和夹爪的关节，以及饮料罐资产的碰撞和质量。验证过程会将这些设置与配置文件的要求进行比对。随后，仿真将测试组装好的机器人是否能利用这些属性来拾取和移动罐子。

### 资产包含什么，你需要添加什么？

[UR17G](https://huggingface.co/datasets/TeradyneRobotics/UniversalRobots/blob/d5d8eb795a487a5c929909bc337ee4834d62b0da/ur17g_1300/simready_usd/ur17g_1300.usda)、[Robotiq 2F-140](https://huggingface.co/datasets/Robotiq-Official/simready-assets/blob/9c6b0cedf0066efd474b3bf473e7eaf7ae7e569f/Robotiq_2F_85/simready_usd/Robotiq_2F_85.usda) 和 [饮料罐](https://huggingface.co/datasets/nvidia/simready-assets/blob/653d91e182011f357cf1644013cc94ddf194d349/food_beverage_can_n01/simready_usd/sm_food_beverage_can_n01_01.usd) 包包含了模型及其仿真设置。你需要组装场景，并添加任务代码以定义臂-夹爪组件、工作表面、起始位置以及移动机械臂和开合夹爪的控制逻辑。

![Figure 2](https://cdn-uploads.huggingface.co/production/uploads/6abfe9e7d7cf09a9b38ef308/J7YL_C3mUh7MWUNJ_pVtN.png)

*图 2. SimReady Central 提供资产模型和仿真设置，而示例场景和控制逻辑定义了抓取和放置任务。*

### 在运行抓取和放置任务前，你应该检查什么？

机器人在 Isaac Sim 中静止时可能看起来视觉正确，但在仿真运行时移动或与物体交互时可能不正确。在运行抓取和放置任务之前，测试其关节、运动和接触行为。你可以要求 Agent 执行这些测试，或在 Isaac Sim 中手动执行。

- **关节设置：** 检查机械臂和夹爪的关节限位和驱动器设置。
- **运动：** 测试小幅度的机械臂移动以及夹爪的开合。
- **接触：** 确认罐子平稳地放置在工作表面上，而不会掉落。

在执行抓取和放置任务期间，观察饮料罐在机械臂移动时是否保持在夹爪中。由于资产结构各异，请使用加载场景中的设置作为起点。我们将在以下步骤中详细介绍下载资产和组合场景的整体流程。

### 在 Isaac Sim 中构建抓取和放置仿真

此示例在 Isaac Sim 中结合了 [UR17G](https://huggingface.co/datasets/TeradyneRobotics/UniversalRobots/blob/d5d8eb795a487a5c929909bc337ee4834d62b0da/ur17g_1300/simready_usd/ur17g_1300.usda) 机械臂、[Robotiq 2F-140](https://huggingface.co/datasets/Robotiq-Official/simready-assets/blob/9c6b0cedf0066efd474b3bf473e7eaf7ae7e569f/Robotiq_2F_85/simready_usd/Robotiq_2F_85.usda) 夹爪和 [饮料罐](https://huggingface.co/datasets/nvidia/simready-assets/blob/653d91e182011f357cf1644013cc94ddf194d349/food_beverage_can_n01/simready_usd/sm_food_beverage_can_n01_01.usd)。任务目标是抓取罐子，将其举起，移动到目标位置，然后释放。你还可以利用 [SimReady Central Space](http://nvidia-simready-central.hf.space/) 搜索服务端点来查找由 OEM 筛选的内容。

我们还将使用前沿 AI 模型来协助在开放的 Isaac Sim 场景中创建和运行任务代码。在本示例中，我们使用 GPT-6 Sol，但如果其他 Agent 和模型组合能够加载所需的技能并对 Isaac Sim 执行 Python 代码（生成的代码和结果可能有所不同），它们也可以正常工作。提示词（Prompt）提供了一个起点。在调整任务之前，请检查生成的代码并验证其行为结果。

**所需软件：**

- 安装 [Isaac Sim](https://docs.isaacsim.omniverse.nvidia.com/latest/introduction/quickstart_index.html) 6.2（本示例使用的版本），并检查其系统要求。
- 设置一个可以使用 Isaac Sim 技能的 Agent。请遵循 [Agent Skills 文档](https://docs.isaacsim.omniverse.nvidia.com/6.2.0/development_tools/agent_skills.html) 操作，以便让你的 Agent 能够使用捆绑的技能。
- 仅当你选择命令行资产下载选项时，才安装 [Hugging Face CLI](https://huggingface.co/docs/huggingface_hub/guides/cli)。
- 使用 [USD Search 端点](http://nvidia-simready-central.hf.space/)。

### 步骤 1：下载机械臂、夹爪和饮料罐资产

打开 [SimReady Central](https://huggingface.co/spaces/nvidia/simready-central)，找到此处使用的 [UR17G](https://huggingface.co/datasets/TeradyneRobotics/UniversalRobots/blob/d5d8eb795a487a5c929909bc337ee4834d62b0da/ur17g_1300/simready_usd/ur17g_1300.usda) 机械臂、[Robotiq 2F-140](https://huggingface.co/datasets/Robotiq-Official/simready-assets/blob/9c6b0cedf0066efd474b3bf473e7eaf7ae7e569f/Robotiq_2F_85/simready_usd/Robotiq_2F_85.usda) 夹爪和 [饮料罐](https://huggingface.co/datasets/nvidia/simready-assets/blob/653d91e182011f357cf1644013cc94ddf194d349/food_beverage_can_n01/simready_usd/sm_food_beverage_can_n01_01.usd)。对每个资产选择“Download”，然后使用“Save to folder”或提供的 Hugging Face 命令进行保存。保持这三个完整资产文件夹的完整性，以便 Isaac Sim 能够找到它们的支撑文件。

请使用本示例中链接的资产版本，并为你的 Agent 提供机械臂、夹爪和饮料罐的本地 USD 文件路径。下方展示了一个夹爪路径示例；你的下载位置可能有所不同。

```
~/ASSETS/hf/src/simready-assets-c7fa7615/Robotiq_2F_140/simready_usd/Robotiq_2F_140.usda
```

![figure-05-find-robotiq](https://cdn-uploads.huggingface.co/production/uploads/6abfe9e7d7cf09a9b38ef308/FSec580RNJKj0DIXx9703.gif)

*图 3. SimReady Central 的搜索和交互式预览有助于识别本示例中使用的 Robotiq 2F-140 夹爪和饮料罐。*

![figure-04-download-assets](https://cdn-uploads.huggingface.co/production/uploads/6abfe9e7d7cf09a9b38ef308/LJpqYrl3l5QkQ2T4JJzYd.gif)

*图 4. 饮料罐的下载选项包括将资产包保存到文件夹或使用 Hugging Face CLI。*

### 资产验证告诉你什么？

[机械臂验证报告](https://huggingface.co/datasets/TeradyneRobotics/UniversalRobots/blob/d5d8eb795a487a5c929909bc337ee4834d62b0da/ur17g_1300/.metadata/ur17g_1300_validation.json) 使用 Robot-Body 4.0.0 配置文件，[夹爪验证报告](https://huggingface.co/datasets/Robotiq-Official/simready-assets/blob/c7fa7615a353ebac03990208cbc2aa57426f4c48/Robotiq_2F_140/.metadata/Robotiq_2F_140_validation.json) 使用 Robot-Gripper 3.0.0。两者都记录了通过的 [PhysX 驱动关节检查](https://nvidia.github.io/simready-foundation/latest/features/FET_022_PHYSX.html)，该检查会审查关节驱动设置。

SimReady 配置文件验证为重用这些资产提供了共享基线。随后的抓取放置运行则测试机械臂、夹爪、罐体和控制器在组装场景中如何协同工作。

### 步骤 2：组装机器人并构建抓取放置场景

资产下载完成后，使用带有 Isaac Sim 技能的 Agent 来协助组装机器人、运行验证工具以及创建抓取放置控制逻辑。你也可以使用链接的文档手动执行这些步骤。

从安装目录启动 Isaac Sim，并启用远程 Python 服务器，以便 Agent 能够通过 Python 与仿真进行交互：

```
./isaac-sim.sh --enable isaacsim.code_editor.python_server
```

如果你使用的是 Agent，请确保从 Isaac Sim 目录启动它，以便它在执行以下步骤时能够访问所需的技能。

确认所有三个资产均正常显示，没有缺失文件的错误。让 Agent 检查机械臂和夹爪的关节限制及驱动设置，或者你自己也可以在 Isaac Sim 中查看它们。机器人和夹爪包含物理关节，这些关节也可以在 Isaac Sim 的 GUI 中进行测试和验证。接下来，我们将组装机械臂和夹爪，以便我们可以将组装后的整体作为一个单一的运动链（articulation）进行控制。

你可以参考 [机器人组装教程](https://docs.isaacsim.omniverse.nvidia.com/6.2.0/robot_setup/assemble_robots.html) 进行手动组装。在这里，我们将要求我们的 Agent 完成组装并为我们进行验证：

**本示例中使用的提示词：**

```
使用 Isaac Sim 中的机器人组装教程
https://docs.isaacsim.omniverse.nvidia.com/6.2.0/robot_setup/assemble_robots.html，
将机械臂 <Simready ur17g 机器人 USD 的本地路径>
与夹爪 <下载的 simready Robotiq_2F_140 夹爪 USD 的本地路径>
进行组装。

组装完成后验证组装结果。
```

Agent 最终使用了随 Isaac Sim 打包的 `isaac-sim-remote` 和 `usd-articulation` 技能来完成组装并验证机器人的物理特性。现在，我们拥有了运行抓取和放置任务所需的所有资产：组装好的机器人和易拉罐。接下来，我们将继续执行工作流的最后部分。

![figure-05-joint-settings](https://cdn-uploads.huggingface.co/production/uploads/6abfe9e7d7cf09a9b38ef308/NcKj9Cbp2iBlXh65rUf0T.gif)

*图 5. Isaac Sim 中 UR17G 机械臂和 Robotiq 2F-140 夹爪的关节设置。*

在场景中有了组装好的机器人和易拉罐后，要求 Agent 运行任务。使用下一步中的检查项来评估仿真行为。

### 步骤 3：测试控制并运行抓取和放置

既然资产已包含仿真属性并通过了配置文件验证，我们现在可以在组装好的场景和控制器中进行测试。控制器协调 UR17G 机械臂的运动与 Robotiq 2F-140 夹爪的开合。使用下面的行为检查项来评估 Agent 生成的任务。如果你想了解或自行调整控制器，请参阅 [添加机械臂机器人教程](https://docs.isaacsim.omniverse.nvidia.com/6.2.0/core_api_tutorials/tutorial_core_adding_manipulator.html)。

**本示例中使用的提示词：**

```
在 Isaac Sim 中使用组装好的机器人和易拉罐
<SimReady 库中的易拉罐 USD 路径>
运行抓取和放置任务。

确保执行基于接触的抓取动作来拾取易拉罐，并验证
抓取和放置的准确性/放置误差。
```

**使用的技能**：`isaac-sim-remote`、`manipulaiton-ik` 和 `physics-simulation`

完整任务测试夹爪在移动过程中是否保持握住易拉罐，并在目标位置释放它。重置场景，然后执行接近、抓取、提升、保持、转移和释放序列。将你的运行结果与开场视频和下面的成功标准进行比较。

![figure-06-pick-and-place-landscape](https://cdn-uploads.huggingface.co/production/uploads/6abfe9e7d7cf09a9b38ef308/TBsKTaclDU8oJvkXYCie8.gif)

*图 6. UR17G 机械臂和 Robotiq 2F-140 夹爪在 Isaac Sim 中将饮料罐从黄色拾取标记移动到绿色目标。显示速度为 4 倍速。*

如果你的运行结果有所不同，请记录序列失败的位置，并要求 Agent 检查场景并生成控制指令。在重试之前，将易拉罐和机器人重置为相同的初始状态，以便你可以比较结果。

**仿真假设：**

- **固定设置：** 易拉罐起始于已知位置，机器人固定，工作空间清晰平坦。未使用视觉，碰撞检查也有限。
- **简化的易拉罐：** 未对变形和液体运动进行建模，因此本示例不测试挤压情况。
- **脚本化抓取和运动：** 水平抓取使用了通过仿真测试选择的 2 N·m 驱动努力上限，该值并非根据指尖力校准或由制造商推荐。接触和摩擦力使饮料罐保持在原位，机械臂沿着固定的航点移动而不进行重新规划。有关硬件抓持力规格，请参阅 [Robotiq 产品表](https://robotiq.com/hubfs/Product-sheets/Adaptive%20Grippers/Product-sheet-Adaptive-Grippers-EN.pdf)。

这些结果仅适用于此脚本化设置。它们并未证明在物体位置不确定、负载不同或真实硬件环境下的鲁棒性。

### 使用 SimReady 资产构建您的下一个仿真

使用来自 [SimReady Central](https://huggingface.co/spaces/nvidia/simready-central) 的资产构建您自己的抓取放置任务，然后使用您选择的 Agent 帮助组装场景并在 Isaac Sim 中运行。

**发现资产**

- **查找机器人和物体：** 在 Hugging Face 上浏览 [SimReady Central](https://huggingface.co/spaces/nvidia/simready-central)。
- **检查资产支持的功能：** 结合 [SimReady Foundation](https://nvidia.github.io/simready-foundation/latest/) 中的配置档案和要求以及资产的验证报告进行审查。

**构建抓取放置场景**

- **设置仿真器：** 遵循本示例所用版本的 [Isaac Sim 安装指南](https://docs.isaacsim.omniverse.nvidia.com/latest/introduction/quickstart_index.html)。
- **连接您的 Agent：** 遵循 [Isaac Sim Agent Skills 文档](https://docs.isaacsim.omniverse.nvidia.com/6.2.0/development_tools/agent_skills.html) 以使捆绑技能对您的 Agent 可用。
- **组装机器人：** 如果您倾向于手动连接机械臂和夹爪，请遵循 [机器人组装教程](https://docs.isaacsim.omniverse.nvidia.com/6.2.0/robot_setup/assemble_robots.html#assembling-robots)。

**准备和贡献内容**

- **从 CAD 开始：** 遵循 [使用 Frontier AI 模型为机器人创建 SimReady 资产的 5 个步骤](https://developer.nvidia.com/blog/5-steps-to-create-simready-assets-for-robotics-with-frontier-ai-models/) 来准备您自己的机器人资产。
- **验证并提交资产：** 遵循 [SimReady Central 提交指南](https://github.com/NVIDIA-Omniverse/simready-central/blob/main/.agents/skills/submit-simready-assets/SKILL.md) 使您的资产对其他开发者可用。

获取灵感，请探索 [Michael Wagner 的语音控制 VR 演示](https://lnkd.in/p/g3-5svW6) 或 [Maziyar Panahi 的 Microduck 仿真](https://lnkd.in/p/gnxQ3YS8)。两者都展示了开发者如何在他们的项目中使用 SimReady 资产。

您将构建什么？在 Hugging Face 评论中分享您的场景和结果，包括您使用的资产和 Isaac Sim 版本。

祝构建愉快！

↑ 正文结束
✓ 本篇全文免费开放

读完还有疑问？会员每天能问小互 30 次，每句带出处；还有一份按你口味挑好的每日 AI 日报。
[成为会员 $59/年](https://xiaohu.ai/buy/?plan=year&slug=nvidia-simready-pick-place&from=tail)[按月 $6.99](https://xiaohu.ai/buy/?plan=monthly&slug=nvidia-simready-pick-place&from=tail)

7 天内不满意全额退 · [看会员能多什么 →](https://xiaohu.ai/membership/)

[阅读原文 ↗](https://huggingface.co/blog/nvidia/simready-assets-robot-pick-and-place)

📮 新解读每晚进邮箱

读完觉得有用？留个邮箱，每晚一封当天的新解读，随时退订。
