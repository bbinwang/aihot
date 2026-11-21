---
title: "Hugging Face 发布 3D 生成模型微调权威指南：通用模型在你的品类上不准？只训该训的那两步"
date: 2026-11-14T00:00:00.000Z
tags: ["AI 实操", "3D 生成", "LoRA", "微调", "TRELLIS.2", "Hugging Face"]
summary: "通用 3D 生成模型常在你最在意的细节上出错，想自己调又不知从哪下手、该训哪一步。Hugging Face 这份指南给了两个现成容器和一套「训哪步、冻哪步」的判断方法：用 188 只鞋只训 TRELLIS.2 管形状的两步，没见过的鞋形状贴"
---
> **原文链接**: [https://huggingface.co/blog/3d-lora-finetuning](https://huggingface.co/blog/3d-lora-finetuning)
> **来源**: huggingface.co
> **发现于**: [小互 · AI 解读站](https://xiaohu.ai/article/3d-lora-finetuning/) · 2026/11/14
> **说明**: 本文由 AIHot汪 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)。正文取自小互 AI 解读

---

## 全文 Markdown · 会员

作者：Hugging Face11-14 · 约 18 分钟

![同一只训练时没见过的钉鞋：左边是原版 TRELLIS.2 生成的结果，右边是挂上鞋类 LoRA 之后的结果，两边一起旋转](https://pic.xiaohu.ai/jiedu-media/3d-lora-finetuning/sole_orbit_base_vs_lora.gif)

**同一只训练时没见过的钉鞋，转一圈看鞋底：**左边是原版 TRELLIS.2 的结果（已经替它转到最贴合的角度，原版连朝向也会弄错），右边挂上鞋类 LoRA。图里的 F-score 是形状贴合度（满分 1），这一只鞋从 0.40 升到 0.87；速览里的 0.276 → 0.803 是 9 只留出鞋的平均。动图：HUGGING FACE

让 AI 从一张照片生成一个能转着看的 3D 模型，已经不算新鲜事。微软开源的 TRELLIS.2 是这类模型里常用的一个：40 亿参数，MIT 协议，给它一张图，它输出带材质的 3D 网格。可真拿它干具体的活，问题就来了：通用模型偏偏会在你那一行最在意的细节上出错。做家具模型的人要的是准确的几何形状；Hugging Face 的工程师拿它生成鞋子，外形大体像样，**鞋底却经常是错的**。

想自己动手调一调，又会碰上三道坎：

- **没有现成的路：**TRELLIS 两代都没给出把模型改造成具体任务的简单办法，光是 3D 模型的运行环境，就有一长串依赖和安装步骤。
- **不知道该训哪儿：**照片变 3D 靠的不是一个模型，是好几个模型串起来的流水线，分别管粗结构、细几何和材质。训错了地方，模型可能把照片里的光影学成物体表面的颜色，还会把原来会的东西忘掉（灾难性遗忘）。
- **全量微调不划算：**手里往往只有一小批数据，把整个模型重训一遍既贵，又可能冲掉模型本来做得好的东西。

Hugging Face 博客上这份《3D 生成模型微调权威指南》，就是冲这三道坎来的。运行环境打包成两个现成的 Docker 容器，一个做预处理、一个做训练，在 Hugging Face Jobs（按需租云端显卡跑容器的服务）或你自己的显卡上，预处理一条命令，两步训练各一条。该训哪儿，给出一套判断方法：先看问题出在流水线的哪一步，再看手里的数据能教对哪一步，只给这几步挂 LoRA 小补丁，其余冻住。他们用 188 只鞋（从谷歌扫描的 1030 件真实物品 3D 数据集 Google Scanned Objects 里挑出）实打实做了一遍：只训管形状的两步，材质那步不动，两次训练各用一张 A100，分别 7.2 小时和 3.6 小时。拿训练时没见过的 9 只鞋来考，形状贴合度 F-score（满分 1）平均从 0.276 升到 0.803，9 只全部变好。脚本、处理好的鞋类数据和训练好的补丁也都公开了。

指南先拆开 TRELLIS.2 的五步流水线，讲清楚动哪两步、为什么不动材质那步；再给出运行命令；最后打开容器看训练代码、看结果。我们觉得最值得带走的是那套判断方法：冻结什么，和微调什么一样重要。想让通用模型在你自己的品类上变准，不管是家具、零件还是玩具，先想清楚这一步。

### 鞋看着像鞋，鞋底却不对

先补一点背景。3D 生成在机器人、仿真、影视和游戏里都有用处，难的是让生成的东西守规矩。光文件格式就有 GLB、PLY 好几种，表示方法也多，比如神经辐射场（NeRF）、3D 高斯泼溅（3DGS），各有长短。初代 TRELLIS 的做法是先在模型内部用一种统一的「潜在表示」（latent，模型内部压缩过的一组数字）描述物体，最后由解码器转成需要的格式，不必为每种格式各训一个模型。TRELLIS.2 是同一团队的第二代，把 3D 结构表示得更好。

![原版 TRELLIS.2 对一只没见过的钉鞋生成的结果，旋转展示](https://pic.xiaohu.ai/jiedu-media/3d-lora-finetuning/sole_orbit_base.gif)

**原版的结果单独转一圈：**输入是一只钉鞋，原版生成的东西大致是只鞋，鞋底却和输入对不上。这只鞋训练时没给模型看过。动图：HUGGING FACE

这就是指南拿来开刀的问题：作者最初测试时，预训练模型生成的鞋通常看着没问题，鞋底却是错的。接下来要验证的是，挂一个 LoRA 能不能把鞋底调准。

### 一张照片变成 3D，要走五步

想知道该训哪里，先得知道 TRELLIS.2 是怎么干活的。它把「照片 → 3D」拆成五步，最后导出一个带贴图的网格：

TRELLIS.2 的五步，和这次各动了哪一步
图像 token 是第 3、4、5 步共用的「参考照片」。橙色两步挂了 LoRA，其余三步原样冻结。
DINOv3 的图像 token 送到第 3、4、5 步

第 1 步抠掉背景BiRefNet冻结
第 2 步把图变成 tokenDINOv3-L冻结
第 3 步搭粗结构稀疏结构 DiT · 秩 8挂 LoRA
第 4 步雕细几何形状 DiT · 秩 16挂 LoRA
第 5 步上材质材质 DiT冻结

合成带贴图的网格，导出 GLB 文件
小图为示意。秩（rank）决定补丁的大小，后文细说。

[https://pic.xiaohu.ai/jiedu-media/3d-lora-finetuning/pipeline_lr.png](https://pic.xiaohu.ai/jiedu-media/3d-lora-finetuning/pipeline_lr.png)

**原文的流水线图：**三个流匹配 Transformer 先生成几何、再生成材质，看的都是同一组图像 token。橙色是挂 LoRA 的部分，灰色是冻结的部分。三个 DiT 每个约 13 亿参数。图：HUGGING FACE · 点图看大图

#### 第 1、2 步：抠图，再把图翻译成数字

BiRefNet 先把照片背景抠掉。DINOv3-L（Meta 的图像编码模型）再把图切成小块，每块翻译成一串数字，叫特征 token。后面三步生成模型每一步都回头看这些 token，确保自己照着这张图在做。

[https://pic.xiaohu.ai/jiedu-media/3d-lora-finetuning/image_to_tokens.png](https://pic.xiaohu.ai/jiedu-media/3d-lora-finetuning/image_to_tokens.png)

**从像素到 token：**抠图后缩到 512×512，切成 32×32 共 1024 个小块，每块变成一个 token，每个 token 是 1024 个数字。这两个模型在整个流程里都是冻结的。图：HUGGING FACE · 点图看大图

#### 第 3 步：先在格子里标出「哪里有东西」

体素就是三维的像素。这一步用一个扩散 Transformer（DiT，一种从噪声里一步步「洗」出结果的生成模型）先生成一小块 16³×8 的潜在表示，再由 VAE 解码器（把压缩表示还原出来的部分）放大成 64×64×64 的占位网格。每个格子只回答一个问题：这里是不是物体的一部分。

这一步定的是鞋的大轮廓，后面的细节都在它圈出来的格子里长，所以原文在这里挂了 LoRA。

先粗后细：第 3 步圈格子，第 4 步只在圈中的格子里细化
橙框是第 3 步圈出的格子，黑点是第 4 步只在这些格子里细分出的表面，空格子直接跳过。

示意图：用二维切面代替三维，只画鞋的表面（O-Voxel 只存表面上的体素），格子数不代表真实比例。真实模型第 3 步输出 64³ 的占位网格，第 4 步在 32³ 的网格上细化到 512³。

[https://pic.xiaohu.ai/jiedu-media/3d-lora-finetuning/stage1_sparse_structure.png](https://pic.xiaohu.ai/jiedu-media/3d-lora-finetuning/stage1_sparse_structure.png)

**原文的第 3 步：**DiT 把噪声变成 16³×8 的潜在表示，冻结的 VAE 解码器把它放大成 64³ 的占位网格。图里这只没见过的钉鞋，在 64³ 的占位网格里只占了 2.6% 的格子。图：HUGGING FACE · 点图看大图

#### 为什么只算「有东西」的格子

O-Voxel 是 TRELLIS.2 自己的 3D 格式，只存物体表面上的体素，每个体素记着局部几何（比如一个网格顶点）和材质属性。格式小，CPU 几秒就能把网格转成 O-Voxel，GPU 几秒就能转回网格。

它还沿用了初代 TRELLIS 的稀疏结构潜在表示：数据存成稀疏张量，空格子不花算力。原文说，模型只用到网格里约 10% 的体素。所以第 4、5 步的 DiT 是「稀疏」的：它们在 32³ 的网格上干活，只算被占的格子。第 3 步的 DiT 是「稠密」的：它面对的那块 16³ 小潜在表示，不管空不空，每一格都要算。

[https://pic.xiaohu.ai/jiedu-media/3d-lora-finetuning/ovoxel_sparse.png](https://pic.xiaohu.ai/jiedu-media/3d-lora-finetuning/ovoxel_sparse.png)

**左侧，O-Voxel 格式：**每个体素存储一个网格顶点（几何信息）以及底色、金属度、粗糙度、透明度（材质属性）。**右侧，稠密与稀疏：**第 3 步的 DiT 对每个网格单元进行计算；第 4、5 步仅对 32³ 网格中被占用的单元进行计算，原文中这批鞋子仅占 3% 到 10%。图：HUGGING FACE · 点击查看大图

#### 第 4 步：在选定的网格中雕刻细节

形状 DiT 在 32³ 的网格上运行：利用第 3 步筛选出的网格和 DINOv3 的 token，为每个被占用的网格生成形状的潜在表示，随后由另一个 VAE 解码器放大 16 倍（32×16=512），生成分辨率为 512×512×512 的 O-Voxel 几何体。物体的具体形态由这一步决定，原文在此处也应用了 LoRA。

[https://pic.xiaohu.ai/jiedu-media/3d-lora-finetuning/stage2_shape.png](https://pic.xiaohu.ai/jiedu-media/3d-lora-finetuning/stage2_shape.png)

**原文的第 4 步：**稀疏 DiT 在 32³ 的网格上，为每个被占用的网格填充 32 个数值，冻结的解码器将其放大 16 倍（32×16=512），得到 512³ 的几何体。最右侧的对比框展示了同一只未见过的钉鞋的底部视图：上方为原版，下方为应用了鞋类 LoRA 的结果。图：HUGGING FACE · 点击查看大图

#### 第 5 步：赋予材质并打包

材质 DiT 以形状的潜在表示和 DINOv3 的 token 为输入，决定表面的材质和纹理，并解码为每个体素的底色、金属度、粗糙度和透明度。最后，几何体和材质合成一个带有贴图的网格，导出为 GLB 文件。这一步原文未应用 LoRA，原因将在下一节说明。

[https://pic.xiaohu.ai/jiedu-media/3d-lora-finetuning/stage3_texture.png](https://pic.xiaohu.ai/jiedu-media/3d-lora-finetuning/stage3_texture.png)

**原文的第 5 步：**冻结的材质 DiT 为形状「上色」，解码为每个体素的四种材质数值，随后与第 4 步的几何体合成 .glb 文件。图中金属度、粗糙度、透明度的颜色仅为示意。图：HUGGING FACE · 点击查看大图

### 仅训练涉及形状的两步，冻结材质那一步

> 选择冻结什么，与选择微调什么同样重要。

这是原文开篇写下的一句话，也是全篇的核心主旨。既然问题出在鞋的形状上，那就只训练与形状相关的两步：第 3 步（稀疏结构）和第 4 步（形状）。第 5 步保持冻结，以保留其现有能力。原因有三。

**原因一，数据无法正确教导它：**GSO 数据集中的鞋子附带的是漫反射颜色贴图，拍摄时的光照（亮部、暗部）已经「烘焙」进了颜色中。而材质这一步需要学习的是分离的材质贴图：底色归底色，金属度、粗糙度各归各的。混合了光照的颜色贴图，并非这一步应该学习的正确答案。强行使用它训练，模型可能会将光影效果误认为是鞋面本身的属性。

为什么不使用扫描颜色来训练材质这一步
用一个球体代替一块鞋面。上排：扫描颜色 = 底色 × 拍摄时的光照。下排：改变打光方向后重新渲染。

示意图：球体和光照效果仅为说明原理绘制，并非原文实验。原文仅提到「可能会将光照表现成表面属性」，此处将这种后果描绘为「旧的亮面被死板地画在表面上」。

**原因二，会导致遗忘原有知识：**强行训练还可能导致其丢失以前学会的东西，这个问题被称为灾难性遗忘。

**原因三，没有必要：**本次的问题在于鞋的形状，原版生成的颜色和纹理原本就表现良好。
[站内 · 什么是灾难性遗忘Google 让大模型学会“睡觉”：白天临时记忆，晚上写入参数，学习新知识时基本不遗忘旧知识为什么修改参数容易导致旧能力受损，以及一种仅向新打开的小专家中写入、其余参数冻结的方法。](https://xiaohu.ai/article/google-sleep-continual-learning/)

原文最后更直白地总结了这条经验：选择训练目标，必须与你要解决的问题以及手头的数据相匹配。

### LoRA：原模型不动，旁边挂载一个小补丁

**LoRA 是什么：**全称低秩适配（low-rank adaptation）。训练时原模型的权重全部冻结，仅在部分层旁边添加两个很小的矩阵进行学习，输出等于「原始结果 + 补丁的修正」。需要训练的参数量减少，存储梯度和优化器状态所需的显存也随之减少。挂载补丁使用的是 Hugging Face 的 PEFT 库。

补丁挂载的位置及大小

**≈0.7%**每个 DiT 约有 13 亿参数，补丁仅占约 0.7%，就像下面 1000 个格子中亮起的 7 个格子。

冻结的原权重与可训练的补丁

左侧为示意图。右侧的 0.7% 和 13 亿取自原文配图《Preparing the LoRA adapters》。

为什么不直接进行全量微调：188 只鞋子是一个非常小的数据集。全量微调成本高昂，且可能会改变模型原本表现良好的部分（即其学到的「先验」知识）。

原文的配置为每个 DiT 训练约 930 万个补丁参数（配图中两块均为 9,338,880 个），两步的挂载方式不同：

- **稀疏结构 DiT（第 3 步）：**注意力层和前馈层（MLP）均挂载补丁，秩（rank）为 8。
- **形状 DiT（第 4 步）：**仅挂载注意力层，秩为 16。其前馈层是稀疏线性层，PEFT 无法直接处理，因此仅挂载注意力层，并使用更高的秩来弥补。

秩决定了补丁矩阵的大小，秩越高，补丁能学习的内容越多。

[https://pic.xiaohu.ai/jiedu-media/3d-lora-finetuning/lora_adapters.png](https://pic.xiaohu.ai/jiedu-media/3d-lora-finetuning/lora_adapters.png)

**原文配图：**A 栏是一个挂载补丁的线性层，y = Wx + (α/r)·BAx，B 初始全为 0，因此刚挂载时不改变原模型的输出；B 栏显示补丁挂载在 30 个 Transformer 块的哪些层上，底部标注两块补丁各含 9,338,880 个参数；C 栏显示插入方式和精度设置。图：HUGGING FACE · 点击查看大图
[站内 · 在自己的电脑上尝试 LoRAUnsloth 发布桌面版应用：不仅可以运行本地模型，还能在你的电脑上直接训练和微调模型想先在语言模型上体验 LoRA：拖入一个 PDF 或表格即可开始训练的桌面应用。](https://xiaohu.ai/article/unsloth-desktop/)

### 动手实践：两个容器，四步完成

3D 模型的环境依赖复杂，安装麻烦。作者打包了两个 Docker 镜像，一个用于预处理，一个用于训练，可在 Hugging Face Jobs（按需租用云端显卡运行容器的服务）或你自己的机器上运行。流程共四步：将数据交给容器、设置参数、运行预处理、运行训练。

从你的 3D 文件到一块训练好的补丁
条的长短依据原文提供的耗时绘制，均在一张 80GB 显存的 A100 上运行。

将 3D 网格上传至 Hub需要的是网格，而非图片：训练需要真实的几何体作为答案。.glb、.obj、.fbx、.ply、.stl 等 Blender 能导入的格式均可，一个文件代表一个物体。
预处理容器 `trellis2-prep`Blender 为每个物体渲染 16 个视角；冻结的编码器将网格转换为潜在表示并保存；留出 5% 的物体作为测试集。仅执行一次，之后每次训练直接读取。
188 只鞋子约耗时 1 小时
训练容器 `trellis2-train`，运行两次`ss` 训练第 3 步（稀疏结构，粗略结构），`shape` 训练第 4 步（形状，精细几何），各 3000 步。两次互不依赖，可同时开启两个任务。
`--config ss`7.2 小时
`--config shape`3.6 小时
获取补丁每 500 步向 Hub 存储一个检查点（补丁权重约 37MB，并非整个模型的拷贝），训练曲线实时记录在 Trackio 看板上。

**开始前需准备：**

- 一个具有写入权限的 HF_TOKEN（Hugging Face 访问令牌）。
- 账号需申请 DINOv3 的使用权限。该模型需申请后方可下载，训练时需要，预处理时不需要。
- 若使用自有数据，需先将网格上传至 Hub。
- 若在本机运行：需要一块显存 24GB 以上的 NVIDIA 显卡，以及安装了 NVIDIA 运行时的 Docker。若在 Hugging Face Jobs 上运行，则无需安装任何内容。

#### 第一步：预处理

预处理容器使用 Blender 为每个物体渲染 16 个视角，作为训练时的输入照片；Blender 在无显示器环境下通过 xvfb-run 运行。它还会对每个物体执行 TRELLIS.2 官方的预处理流程。188 只鞋子在 a100-large 上运行约耗时 1 小时。

```
export HF_TOKEN=hf_xxx
## 将 your-username 替换为你的 Hugging Face 用户名
hf jobs run -d --flavor a100-large --timeout 6h --secrets HF_TOKEN \
  cr.hf.co/suvadityamuk/trellis2-finetuning-prep:latest \
  trellis2-prep \
    --meshes your-username/my-meshes \
    --push-to your-username/my-meshes-trellis2 \
    --private --holdout 0.05 \
    --views 16 --workers 8
```

这些参数是什么意思

| 参数 | 含义 |
| --- | --- |
| -d | 后台运行：打印任务 ID 和网址后返回。若要查看日志，请使用 `hf jobs logs -f <id>` |
| --flavor a100-large | 指定使用的硬件，a100-large 代表 80GB 显存的 A100。使用 `hf jobs hardware` 可列出所有选项 |
| --timeout 6h | 超时自动停止。两个容器均支持断点续跑：预处理会跳过已完成的物体，训练会从 `--push-to` 中最新的检查点继续 |
| --secrets HF_TOKEN | 将令牌加密传入任务，不会写入镜像中 |
| cr.hf.co/…:latest | 要运行的镜像，其后的内容是在容器内执行的命令 |
| --meshes | 存放网格的 Hub 仓库 |
| --push-to | 结果推送到哪个数据集仓库，若不存在则自动创建；若不填写，则仅保留在本地 |
| --private | 将推送的仓库设置为私有 |
| --holdout 0.05 | 留出 5% 的物体用于评估，不参与训练 |
| --views 16 | 每个物体渲染多少个视角，训练时每一步随机选择一个 |
| --workers 8 | 同时启动多少个 Blender 进程。作者在测试中发现，超过 8 个进程时 Blender 可能在启动时崩溃 |

#### 第二步：训练两个补丁（Patch）

训练容器读取预处理好的数据和一份配置文件，通过 `--config` 选择训练哪一步：`ss` 用于训练第 3 步的稀疏结构 DiT，`shape` 用于训练第 4 步的形状 DiT，背后各自对应一份配置文件。训练指标会实时记录到 Trackio 看板上。如果设置了 `--push-to`，检查点会自动上传到 Hub。

训练两个补丁的命令（Hugging Face Jobs）

```
export HF_TOKEN=hf_xxx

hf jobs run -d --flavor a100-large --timeout 12h --secrets HF_TOKEN \
  cr.hf.co/suvadityamuk/trellis2-finetuning-train:latest \
  trellis2-train --config ss \
    --latents your-username/my-meshes-trellis2 \
    --push-to your-username/my-trellis2-lora \
    --run-name ss_lora \
    --push-path ss_lora \
    --trackio-space your-username/trellis2-trackio

hf jobs run -d --flavor a100-large --timeout 12h --secrets HF_TOKEN \
  cr.hf.co/suvadityamuk/trellis2-finetuning-train:latest \
  trellis2-train --config shape \
    --latents your-username/my-meshes-trellis2 \
    --push-to your-username/my-trellis2-lora \
    --run-name shape_lora \
    --push-path shape_lora \
    --trackio-space your-username/trellis2-trackio \
    --set max_steps=3000 i_save=500
```

训练容器的参数

| 参数 | 含义 |
| --- | --- |
| --config ss \| shape | 指定训练哪一步。也可以提供自定义的 JSON 配置文件、hf:// 路径或网址 |
| --latents | 预处理生成的数据集仓库 |
| --push-to | 检查点上传到哪个模型仓库，若不存在则自动创建 |
| --push-path | 上传到仓库中的哪个文件夹 |
| --run-name | Trackio 中本次训练的名称 |
| --trackio-space | 存放看板的 Space，若不存在则自动创建 |
| --set max_steps=3000 i_save=500 | 临时修改配置：训练 3000 步，每 500 步保存一次 |

如果不希望自行准备数据，可以直接使用作者处理好的鞋类数据集 [suvadityamuk/gso-footwear-trellis2-latents](https://huggingface.co/datasets/suvadityamuk/gso-footwear-trellis2-latents) 进行练习，只需将 `--latents` 替换为该数据集即可。作者训练好的两个补丁模型存放在 [suvadityamuk/trellis-2-finetune-gso](https://huggingface.co/suvadityamuk/trellis-2-finetune-gso)。

使用作者处理好的鞋类数据进行训练（Hugging Face Jobs）

```
export HF_TOKEN=hf_xxx

## 稀疏结构 DiT（第 3 步）
hf jobs run -d --flavor a100-large --timeout 12h --secrets HF_TOKEN \
  cr.hf.co/suvadityamuk/trellis2-finetuning-train:latest \
  trellis2-train \
    --config ss \
    --latents suvadityamuk/gso-footwear-trellis2-latents \
    --push-to your-username/trellis2-footwear-lora \
    --run-name ss_lora \
    --push-path ss_lora \
    --trackio-space your-username/trellis2-trackio \
    --set max_steps=3000 i_save=500

## 形状 DiT（第 4 步）
hf jobs run -d --flavor a100-large --timeout 12h --secrets HF_TOKEN \
  cr.hf.co/suvadityamuk/trellis2-finetuning-train:latest \
  trellis2-train \
    --config shape \
    --latents suvadityamuk/gso-footwear-trellis2-latents \
    --push-to your-username/trellis2-footwear-lora \
    --run-name shape_lora \
    --push-path shape_lora \
    --trackio-space your-username/trellis2-trackio \
    --set max_steps=3000 i_save=500
```

#### 使用本地显卡运行

命令和参数完全相同，只是将外部的 `hf jobs run` 替换为 `docker run`。对于显存仅为 24GB 的显卡（如 L4、A10、RTX 3090、4090），在训练时添加 `--set batch_size=2 grad_accum=8`，有效批量大小仍为 16。作者在 L4 显卡上测试过这组设置。

本地 Docker：预处理 + 训练两个补丁

```
## 预处理为潜在表示（Latents）
docker run --gpus all --rm --shm-size 16g -e HF_TOKEN=hf_xxx \
  -v hf-cache:/root/.cache/huggingface -v "$PWD/work":/workspace/work \
  cr.hf.co/suvadityamuk/trellis2-finetuning-prep:latest \
  trellis2-prep --meshes your-username/my-meshes --push-to your-username/my-meshes-trellis2

## 稀疏结构 DiT（第 3 步）
docker run --gpus all --rm --shm-size 16g \
  -v hf-cache:/root/.cache/huggingface -v "$PWD/work":/workspace/work \
  cr.hf.co/suvadityamuk/trellis2-finetuning-train:latest \
  trellis2-train --config ss --latents your-username/my-meshes-trellis2 \
    --push-to your-username/my-trellis2-lora --trackio-space your-username/trellis2-trackio

## 形状 DiT（第 4 步）
docker run --gpus all --rm --shm-size 16g \
  -v hf-cache:/root/.cache/huggingface -v "$PWD/work":/workspace/work \
  cr.hf.co/suvadityamuk/trellis2-finetuning-train:latest \
  trellis2-train --config shape --latents your-username/my-meshes-trellis2 \
    --push-to your-username/my-trellis2-lora --trackio-space your-username/trellis2-trackio
```

本地 Docker：使用作者预处理好的鞋类数据进行训练

```
export HF_TOKEN=hf_xxx

## 稀疏结构 DiT（第 3 步）
docker run --gpus all --rm --shm-size 16g -e HF_TOKEN \
  -v hf-cache:/root/.cache/huggingface \
  -v "$PWD/work":/workspace/work \
  cr.hf.co/suvadityamuk/trellis2-finetuning-train:latest \
  trellis2-train \
    --config ss \
    --latents suvadityamuk/gso-footwear-trellis2-latents \
    --push-to your-username/trellis2-footwear-lora \
    --trackio-space your-username/trellis2-trackio \
    --set max_steps=3000 i_save=500

## 形状 DiT（第 4 步）
docker run --gpus all --rm --shm-size 16g -e HF_TOKEN \
  -v hf-cache:/root/.cache/huggingface \
  -v "$PWD/work":/workspace/work \
  cr.hf.co/suvadityamuk/trellis2-finetuning-train:latest \
  trellis2-train \
    --config shape \
    --latents suvadityamuk/gso-footwear-trellis2-latents \
    --push-to your-username/trellis2-footwear-lora \
    --trackio-space your-username/trellis2-trackio \
    --set max_steps=3000 i_save=500
```

完整的训练设置包含在两个配置文件中，位于代码仓库的 [container/trellis2/configs/lora](https://github.com/suvadityamuk/trellis2-finetuning/tree/master/container/trellis2/configs/lora) 目录：第 3 步使用 `ss_flow_lora_gso.json`，第 4 步使用 `slat_flow_img2shape_lora_gso.json`。原文正文中的这两个链接都指向了第 4 步的配置，若要查找第 3 步的配置，需要进入该目录查看。

### 打开容器：数据、补丁、训练循环

想要自行修改的读者，原文也详细拆解了容器内的关键代码。仓库中还提供了两个单文件版本 `preprocess.py` 和 `finetune.py`，从头到尾阅读即可理解。

#### 数据：188 只鞋，预留 9 只供模型不可见

预处理阶段使用 TRELLIS.2 冻结的编码器将每个网格转换为训练用的潜在表示（latents）并保存，这样在后续每次训练时无需重新编码。此外，每个物体还在 Blender 中渲染了 16 个视角，在训练时，每个样本会随机选取一张作为输入图像。

在 188 个物体中，预留 9 个仅用于评估，使用其余 179 个进行训练。这 9 只鞋用于验证补丁对训练期间未见过的物体是否有效。数据加载时，每批包含 4 个样本，累积 4 批后才更新一次参数，有效批量大小（effective batch size）为 16。

[https://pic.xiaohu.ai/jiedu-media/3d-lora-finetuning/preprocessing.png](https://pic.xiaohu.ai/jiedu-media/3d-lora-finetuning/preprocessing.png)

**预处理原图：**上路将网格编码为潜在表示（训练的目标/答案），下路渲染 16 张图像（训练的输入）；右侧显示 179 个用于训练、9 个预留。同一款鞋的不同配色会被分在同一侧，以防止测试题与练习题“撞脸”。每个训练样本 = 一份潜在表示 + 随机选取的一张视角图。图：HUGGING FACE · 点击图像查看大图

![Blender 为一只鞋渲染的部分视角](https://pic.xiaohu.ai/jiedu-media/3d-lora-finetuning/conditioning_views.png)

Blender 为其中一只鞋渲染的部分视角。图：HUGGING FACE

代码：读取配置、构建数据集、剔除预留物体

```
cfg = json.load(
    open(
        {
            "ss": "/workspace/TRELLIS.2/configs/lora/ss_flow_lora_gso.json",
            "shape": "/workspace/TRELLIS.2/configs/lora/slat_flow_img2shape_lora_gso.json",
        }[FLOW]
    )
)

key, latents = {
    "ss": ("ss_latent", "ss_latents/ss_enc_conv3d_16l8_fp16_64"),
    "shape": ("shape_latent", "shape_latents/shape_enc_next_dc_f16c32_fp16_512"),
}[FLOW]

roots = json.dumps(
    {
        "gso": {
            key: f"{DATA}/{latents}",
            "render_cond": f"{DATA}/renders_cond",
            "meta": DATA,
        }
    }
)

ds = getattr(datasets, cfg["dataset"])(roots, **cfg["dataset_args"])

holdout = set(open(f"{DATA}/holdout.txt").read().split())
ds.instances = [(root, sha) for root, sha in ds.instances if sha not in holdout]

batches = cycle(
    DataLoader(
        ds,
        batch_size=BATCH,
        shuffle=True,
        drop_last=True,
        num_workers=4,
        collate_fn=getattr(ds, "collate_fn", None),
    )
)
```

#### 补丁如何挂载

TRELLIS.2 的前向计算是自定义的，PEFT 常用的 `PeftModel()` 包装会阻碍其运行，因此改用 `inject_adapter_in_model()`，直接将补丁注入模型，保持原有的调用方式不变。补丁权重使用 32 位浮点数（fp32）存储，以确保数值稳定性；前向计算使用 bf16 自动混合精度，部分运算降低精度以节省显存。冻结的原始权重如何存储不受影响。

代码：加载模型、注入补丁、仅让补丁参与训练

```
model = models.from_pretrained(cfg["ckpt"])
for block in model.blocks:
    block.use_checkpoint = True

inject_adapter_in_model(
    LoraConfig(
        r=cfg["rank"], lora_alpha=cfg["alpha"], target_modules=cfg["lora_targets"]
    ),
    model,
)

params = []
for name, p in model.named_parameters():
    p.requires_grad_("lora_" in name)
    if p.requires_grad:
        p.data = p.data.float()  # fp32 master weights for LoRA
        params.append(p)

model.cuda().train()
```

#### 训练循环：给答案加噪，让模型预测回去的方向

训练目标是整流流匹配（rectified flow matching），Stable Diffusion 3、Flux 2 等图像模型也使用此目标。TRELLIS.2 预训练使用的正是此目标，微调阶段沿用该目标最为合适。整个训练过程仅更新两个 DiT 中的补丁参数，原始模型的权重保持不变。每一轮训练执行以下五个步骤：

1. 为每个样本随机选取一个时间步 t。第 3 步按 logit-normal 分布选取，第 4 步均匀选取，直接沿用 TRELLIS.2 的原始配置。
2. 生成一份与数据形状相同的随机噪声。
3. 根据 t 将干净数据与噪声混合：t = 0 时几乎为干净数据，t = 1 时为纯噪声。
4. 让模型在 t×1000 这个时间点预测「速度」，条件设置与预训练时保持一致。
5. 损失 = 预测速度与目标速度之差的均方误差。目标速度是混合结果对 t 的导数，大致相当于「噪声 − 数据」。

**为什么叫「速度」：**把从干净数据到纯噪声想成一条路，t 是走到了哪儿，速度就是这条路的方向和步幅。生成时反过来走：从纯噪声出发，每一步按模型猜出的速度往回退一点，退到 t = 0 就是一个干净的结果。猜得越准，退回来的形状越对。

把一只「像素鞋」真的混一遍噪声
每格的颜色就是那个位置的数值：深色为正，蓝色为负。混合那一格按当前的 t 实时算出。

示意图：用 32×16 的二维小格代替真实的三维潜在表示，并省去了公式里很小的 σmin。模型看到混合后的样子、t 和图像 token，要猜出最后那张「速度」。

每一批先用 DINOv3 编码输入图；再按比例 p_uncond 把一部分样本的图像条件随机清零，这是为了无分类器引导（CFG，生成时能调「多听图片的话」的技巧）。然后用 bf16 算流匹配损失。4 批的梯度累加完，先把梯度裁剪一下防止更新过猛，再让优化器走一步。梯度检查点会在反向传播时重算部分中间结果来省显存。每 10 步记一次损失，每 500 步存一次补丁。

[https://pic.xiaohu.ai/jiedu-media/3d-lora-finetuning/training_loop.png](https://pic.xiaohu.ai/jiedu-media/3d-lora-finetuning/training_loop.png)

**训练循环原图：**内圈累加 4 批梯度，外圈一共 3000 次优化器更新。CFG 丢弃比例 10%，AdamW 学习率 1e-4，梯度裁剪上限 1.0。图：HUGGING FACE · 点图看大图

代码：优化器、流匹配损失和训练循环

```
opt = torch.optim.AdamW(
    params, lr=cfg["lr"], weight_decay=cfg["weight_decay"], betas=(0.9, 0.95)
)

dino = DinoV3FeatureExtractor(
    cfg["image_cond_model"], image_size=cfg["image_size"]
).cuda()

def flow_loss(x0, cond):
    s = cfg["t_schedule"]

    t = (
        torch.rand(x0.shape[0])
        if s["name"] == "uniform"
        else torch.sigmoid(
            torch.randn(x0.shape[0]) * s["args"]["std"] + s["args"]["mean"]
        )
    )
    t = t.cuda()

    noise = (
        x0.replace(torch.randn_like(x0.feats))
        if cfg["sparse"]
        else torch.randn_like(x0)
    )

    tv = t.view(-1, *[1] * (len(x0.shape) - 1))

    x_t = (1 - tv) * x0 + (cfg["sigma_min"] + (1 - cfg["sigma_min"]) * tv) * noise

    pred, target = model(x_t, t * 1000, cond), (1 - cfg["sigma_min"]) * noise - x0

    return (
        F.mse_loss(pred.feats, target.feats)
        if cfg["sparse"]
        else F.mse_loss(pred, target)
    )

for step in range(1, STEPS + 1):
    for _ in range(ACCUM):
        batch = next(batches)
        x0 = recursive_to_device(batch["x_0"], "cuda")

        with torch.no_grad():
            cond = dino(batch["cond"])
            cond[torch.rand(len(cond), device="cuda") < cfg["p_uncond"]] = 0

        with torch.autocast("cuda", dtype=torch.bfloat16):
            loss = flow_loss(x0, cond) / ACCUM

            loss.backward()

    torch.nn.utils.clip_grad_norm_(params, cfg["grad_clip"])

    opt.step()
    opt.zero_grad()
```

原文提醒，这些片段比容器里的代码简化过，省了一些准备步骤，完整流程请用容器命令。

### 结果：没见过的 9 只鞋，F-score 全部提高

#### 损失曲线说明不了几何好不好

第 3 步那次训练，损失开头降得快，后来变慢；第 4 步那次基本持平。原文特意提醒：这些曲线只反映训练目标在怎么变，**不直接衡量生成的几何质量**。流匹配损失还会随抽到的物体、噪声和时间点上下跳。要知道几何到底有没有变好，得拿留出的鞋去比。

[https://pic.xiaohu.ai/jiedu-media/3d-lora-finetuning/training_loss.png](https://pic.xiaohu.ai/jiedu-media/3d-lora-finetuning/training_loss.png)

**两次训练的损失：**浅色是每 10 步记一次的原始损失，深色是平滑后的走势。左为第 3 步（秩 8，注意力 + 前馈层），右为第 4 步（秩 16，只挂注意力）。右边一直持平，不代表没练出东西。图：HUGGING FACE · 点图看大图

#### 三把量几何的尺子

原文用三个指标比较生成的形状和真实扫描：

- **Chamfer 距离：**一个表面上的点到另一个表面最近点的距离，两个方向都量。越低越好。
- **[[email protected]](https://xiaohu.ai/cdn-cgi/l/email-protection)：**综合两件事，生成的表面有多少落在真实表面附近（精确率），真实表面有多少被生成的表面盖住（召回率）。「附近」的标准是扫描物体包围盒对角线长度的 2%。越高越好。
- **法线一致性：**两个表面的朝向有多一致。法线是垂直于表面的那根箭头。越高越好。

三把尺子各量什么：拿一段鞋底剖面算一遍
灰线是真实扫描的鞋底，橙线是生成的：一颗鞋钉偏了位，一颗没长出来，一颗太浅。

示意图：二维鞋底剖面，数字由图上的点实时算出（长度以鞋底长为 1），只为说明三个指标的算法，和原文的实验数字无关。

#### 量出来的结果

9 只留出鞋的平均成绩：原版 vs 挂上鞋类补丁
三项都朝好的方向走了一大截。

[[email protected]](https://xiaohu.ai/cdn-cgi/l/email-protection)越高越好
原版0.276
加补丁0.803
Chamfer 距离越低越好
原版0.174
加补丁0.033
法线一致性越高越好
原版0.530
加补丁0.804
**9 / 9**两块补丁都挂上后，9 只留出鞋的 F-score 一只不落都提高了

F-score 和法线一致性按 0 到 1 画，Chamfer 距离按 0 到 0.2 画。

换成数字：9 只留出鞋的平均 F-score 从 0.276 升到 0.803，Chamfer 距离从 0.174 降到 0.033，法线一致性从 0.530 升到 0.804。

[https://pic.xiaohu.ai/jiedu-media/3d-lora-finetuning/heldout_metrics.png](https://pic.xiaohu.ai/jiedu-media/3d-lora-finetuning/heldout_metrics.png)

**原文的指标图，多了两根斜线条：**原版模型连朝向也常弄错。作者把其中 5 只的原版结果转到最贴合的角度再算，原版 F-score 是 0.475，同样 5 只加补丁是 0.855。原版的低分有一部分来自朝向，但转正之后差距仍然很大。图：HUGGING FACE · 点图看大图

[https://pic.xiaohu.ai/jiedu-media/3d-lora-finetuning/per_object_fscore.png](https://pic.xiaohu.ai/jiedu-media/3d-lora-finetuning/per_object_fscore.png)

**每只鞋一行：**灰点是原版，橙点是加补丁，9 只全部往右移。最下面那只提高得最少。图：HUGGING FACE · 点图看大图

[https://pic.xiaohu.ai/jiedu-media/3d-lora-finetuning/heldout_meshes.png](https://pic.xiaohu.ai/jiedu-media/3d-lora-finetuning/heldout_meshes.png)

**从左到右的 5 个例子（共 9 个）：**输入图像、原始直接生成、原始调整至最佳角度、添加鞋类补丁、真实扫描。原文的判断是：在这些例子中，添加补丁后的鞋底更接近扫描结果。图：HUGGING FACE · 点击图片查看大图

所有训练记录均公开在作者的 [Trackio 看板](https://suvadityamuk-trellis2-geoflow-lora-trackio.hf.space/media?project=trellis2-geoflow-lora&runs=blog-results)上。

### 换成你自己的数据时，需要注意什么

本次可复用的是一套方法论：数据只准备一次，两个补丁分别训练，最后用训练时未见过的物体进行测试。最关键的一步在开头：先明确问题出在哪个环节，你的数据能教会模型哪个环节，只针对那几个环节进行训练。

要检验自己的补丁，镜像中自带评估脚本 `scripts/eval_geometry.py`：对每个保留的物体生成一张渲染图，使用相同的随机种子，分别使用原版和挂载两个补丁（通过 `--ss_adapter`、`--shape_adapter` 指定）各生成一次网格，然后与真实网格计算 Chamfer 距离、F-score 和法线一致性。这也是素材中唯一明确说明如何将两个补丁挂载回去的地方。

代码仓库中列出了几条限制：

- **仅调整几何：**纹理贴图仍来自原始模型。
- **保留规则基于 GSO 的命名：**同一款鞋的不同配色会被分到同一侧。如果换成其他命名方式，基本上等同于按随机种子随机分配。希望同一款式的变体保持在一起，请使用 `<型号>_in_<变体>` 命名，或者先去重。
- **一个网格文件算作一个物体：**多部件场景需先合并为一个文件。

作者的下一步计划是观察同样的取舍对其他 3D 生成模型（Pixal3D、UniLat3D）是否有效；3D 高斯和世界生成模型（腾讯混元 HunyuanWorld 2.0、NVIDIA Lyra 2.0）也在候选名单中，不过它们的表示方法和训练流程不同，可能需要更换方法。

[站内 · 另一个单图生成 3D 的开源模型 Idol：仅从一张图像生成完整的 3D 对象，仅 6 亿参数，可在消费级 GPU 上运行] 同样是一张图生成 3D，Idol 输出的是 3D 高斯，8GB 显存的消费级显卡可尝试运行。[查看原文](https://xiaohu.ai/article/speridlabs-idol-image-to-3d/)来源 The Definitive Fine-Tuning Guide for 3D Generation Models Suvaditya Mukherjee、merve、Pedro Cuenca（Hugging Face）· 2026-11-12 · [查看主材料](https://huggingface.co/blog/3d-lora-finetuning) 延伸 [trellis2-finetuning 代码仓库](https://github.com/suvadityamuk/trellis2-finetuning) · [microsoft/TRELLIS.2 官方仓库](https://github.com/microsoft/TRELLIS.2) · [TRELLIS.2 论文：Native and Compact Structured Latents for 3D Generation](https://huggingface.co/papers/2512.14692) · [训练好的鞋类 LoRA：suvadityamuk/trellis-2-finetune-gso](https://huggingface.co/suvadityamuk/trellis-2-finetune-gso) 本站说明文中图片和动图均来自 Hugging Face 原文；TRELLIS.2 的参数量和开源协议取自微软官方仓库与微调代码仓库说明。

原文版权归原作者，这里只供对照阅读。 [查看原网页 ↗](https://huggingface.co/blog/3d-lora-finetuning)

## 3D 生成模型的终极微调指南

我们正致力于通过开源和开放科学来推进和普及人工智能。

[[[Image]](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/3d-lora-finetuning/sole_orbit_base_vs_lora.gif)](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/3d-lora-finetuning/sole_orbit_base_vs_lora.gif)

> 简而言之；在本博客中，我们提供了用于在您的 3D 资产上微调 TRELLIS.2（一种流行的 3D 模型）的微调脚本和容器，该模型既可以在本地运行，也可以在 Hugging Face Jobs 上运行。如果您对微调感兴趣，可以使用我们的脚本，只需少量参数（假设您已将数据集更新到 Hugging Face Hub），或者自己使用 [此仓库](https://github.com/suvadityamuk/trellis2-finetuning) 进行调试。如果您想了解更多，我们将介绍脚本的工作原理。让我们开始吧！

### 引言

3D 生成在机器人技术、模拟、媒体和娱乐等领域有许多用途。在这些领域中，很难使生成的对象遵守严格的规则并标准化模型和数据表示。存在许多文件格式，例如 [GLB](https://en.wikipedia.org/wiki/GlTF) 和 [PLY](https://en.wikipedia.org/wiki/PLY%3C/em%3E(file_format))。还存在 [多种表示方法](https://huggingface.co/spaces/suvadityamuk/3d-representations-guide)，例如 [神经辐射场 (NeRFs)](https://www.matthewtancik.com/nerf) 和 [3D 高斯泼溅 (3DGS)](https://en.wikipedia.org/wiki/Gaussian_splatting)。每种方法都有其优缺点。

[TRELLIS](https://huggingface.co/papers/2412.01506) 引入了一种通用的内部表示，称为统一潜在表示。其解码器将此表示转换为所需输出格式的 3D 模型。因此，您无需为每种表示格式使用不同的模型。

同一团队随后发布了 [TRELLIS.2](https://huggingface.co/papers/2512.14692)，该模型改进了对 3D 结构的表示。但是，这两个模型都没有提供适应特定任务的简便方法。

#### 我们希望改进的内容

通用模型（如 TRELLIS.2）可能在特定应用中的重要细节上出错。例如，用户可能需要家具模型的精确几何结构。如果没有针对该任务进行微调，预训练模型可能会产生精度不足的几何结构。我们使用 GSO 的一个子集，其中包含 188 个鞋类对象进行实验。在初步测试中，预训练模型通常会产生外观正确的鞋子，但鞋底不正确。我们测试 LoRA 是否能使鞋底更准确。

[[[Image]](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/3d-lora-finetuning/sole_orbit_base.gif)](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/3d-lora-finetuning/sole_orbit_base.gif)

我们的目标是使用 [Google Scanned Objects (GSO)](https://huggingface.co/datasets/hugging-3d/google-scanned-objects) 数据集来提升 TRELLIS.2 在特定物体类别上的性能。我们将解释在训练过程中应微调哪些流水线组件，以及哪些应保持不变。该流水线将结构、详细几何形状和材质分离开来。因此，我们仅微调对任务至关重要的组件。

[[[Image]](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/3d-lora-finetuning/meme.jpg)](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/3d-lora-finetuning/meme.jpg)

> *选择冻结哪些部分与选择微调哪些部分同样重要。*

#### 我们将使用什么？

##### LoRA

LoRA（低秩适应）通过训练小型适配器矩阵来微调模型，同时保持原始权重冻结。这减少了可训练参数的数量，以及存储其梯度和优化器状态所需的内存。我们使用 Hugging Face 的 PEFT 库来添加和训练这些适配器。更多信息，请阅读我们的 [LoRA 指南](https://huggingface.co/docs/peft/package_reference/lora)。

##### Hugging Face Jobs

Hugging Face Jobs 在云端硬件上运行容器化工作负载。我们使用它进行预处理和训练。若要使用自己的 GPU，请参阅下面的本地 Docker 命令。在开始之前，请确保你拥有：

- 一个 HF_TOKEN，你可以 [从这里](https://huggingface.co/settings/tokens/new) 获取
- 你的 Hugging Face 账户必须 [有权访问 DINOv3](https://huggingface.co/collections/facebook/dinov3)，因为 DINOv3 是一个受限模型
- 如果你使用自己的数据集，请在开始之前将其网格上传到 Hub。

### TRELLIS.2 的工作原理

在训练之前，让我们看看 TRELLIS.2 如何生成 3D 对象，以及我们在哪里添加 LoRA 适配器。

TRELLIS.2 有五个主要阶段：移除图像背景、编码图像、预测粗略结构、生成详细几何形状和生成材质。流水线随后将结果导出为带有纹理的网格。

[[[Image]](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/3d-lora-finetuning/pipeline_lr.png)](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/3d-lora-finetuning/pipeline_lr.png)

#### 编码输入图像

首先，BiRefNet 移除输入图像的背景。然后，DINOv3-L 将图像编码为特征 token。生成模型使用这些 token 来指导 3D 对象的生成。

[[[Image]](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/3d-lora-finetuning/image_to_tokens.png)](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/3d-lora-finetuning/image_to_tokens.png)

#### 稀疏结构生成（Sparse Structure Flow）

稀疏结构流 DiT 预测对象的粗略形状。它是一个扩散 Transformer (DiT)，生成大小为 16³ × 8 的小型潜在表示。随后，变分自编码器 (VAE) 解码器将此潜在表示转换为 64 × 64 × 64 的占用网格。网格中的每个体素表示该位置是否属于对象的一部分。体素是三维空间中的像素。我们在此模型中添加 LoRA 适配器，因为其输出指导几何生成阶段。 [[[Image]](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/3d-lora-finetuning/stage1_sparse_structure.png)](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/3d-lora-finetuning/stage1_sparse_structure.png)

#### O-Voxel 和结构化潜在表示

O-Voxel 是 TRELLIS.2 的 3D 格式。它是一个稀疏体素网格。它仅保留对象表面上的体素。每个体素保留局部几何信息（如网格顶点）和材质属性。由于格式小巧，CPU 可以在几秒钟内将网格转换为 O-Voxel，而 GPU 可以在几秒钟内将 O-Voxel 转换回网格。

结构化稀疏潜在变量来自 TRELLIS。它们将 3D 数据保存在稀疏张量中，从而加快了计算速度。该模型仅使用网格中约 10% 的体素，因此不会在空体素上消耗计算资源。因此，形状流 DiT 和纹理流 DiT 是稀疏 Transformer。稀疏结构流 DiT 是密集 Transformer。 [[[Image]](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/3d-lora-finetuning/ovoxel_sparse.png)](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/3d-lora-finetuning/ovoxel_sparse.png)

#### 几何生成（形状流）

形状流 DiT 使用占用网格和 DINOv3 特征 token 生成潜在变量。另一个 VAE 解码器随后将此潜在变量转换为分辨率为 512 × 512 × 512 的 O-Voxel 几何结构。

在此阶段，我们在 DiT 中添加 LoRA 适配器，因为它控制对象的形状。

[[[Image]](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/3d-lora-finetuning/stage2_shape.png)](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/3d-lora-finetuning/stage2_shape.png)

#### 材质生成 + 网格创建

在最后阶段，纹理流 DiT 使用形状潜在变量和 DINOv3 特征作为输入。它定义了几何表面的材质和纹理。VAE 解码器随后将潜在变量转换为每个体素的基础色、金属度、粗糙度和 alpha 值。我们在此阶段不添加 LoRA 适配器。我们的数据集包含漫反射颜色贴图，但缺乏此阶段训练所需的单独材质贴图。此外，我们的问题在于鞋子的形状。基础模型已经能生成良好的颜色和纹理。

最后，管道将几何结构和材质属性组合成带纹理的网格，并将其导出为 GLB 文件。

[[[Image]](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/3d-lora-finetuning/stage3_texture.png)](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/3d-lora-finetuning/stage3_texture.png)

### 规划

#### 微调哪些组件

我们仅在稀疏结构流 DiT 和形状流 DiT 中添加 LoRA 适配器。这些 DiT 控制对象的形状和几何结构。我们冻结纹理流 DiT 以保持其现有能力。

我们的数据集包含包含烘焙光照效果的漫反射颜色贴图。为了训练纹理流 DiT，我们需要单独的材质贴图。我们数据集中的颜色贴图将表面颜色与光照混合在一起。因此，它们不是此训练的合适目标。

如果在这些贴图上调教纹理流 DiT，它可能会学会将光照显示为表面属性。它还可能会忘记之前学到的知识，这种现象称为灾难性遗忘。

#### 为什么使用 LoRA

我们的子集包含 GSO 中 1,030 个对象中的 188 双鞋。对于如此小的数据集，LoRA 是比全量微调更好的选择。全量微调成本要高得多。它还可能会覆盖模型已经擅长的部分（其学习到的先验知识）。我们的配置总共为两个目标 DiT 训练约 930 万个适配器参数。我们在稀疏结构流 DiT 的注意力和前馈（MLP）层中使用 rank 8 适配器。我们在形状流 DiT 的注意力层中使用 rank 16 适配器。Rank 决定了适配器矩阵的大小。更高的 rank 允许适配器学习更多内容。

#### 你将运行什么

3D 模型设置可能需要许多依赖项和安装步骤。我们提供两个 Docker 镜像（你可以在 [Jobs](https://hf.co/jobs) 或自己的机器上运行），其中包含必要的软件。一个镜像用于预处理，另一个用于微调。

要训练你的 LoRA 适配器并将其上传到 Hub：

1. 让容器访问你的数据。
2. 设置任务参数。
3. 运行预处理容器。
4. 运行微调容器。

然后，我们将解释微调脚本、其设置以及每个设置对训练的影响。

#### 实验概览

我们将分三个部分进行实验：

1. **准备数据。** 将 GLB 或 OBJ 网格转换为 TRELLIS.2 用于训练的潜在表示，并渲染输入图像。
2. **训练适配器。** 为每个 DiT 运行一个作业，使用准备好的数据集和 LoRA 配置。
3. **解释代码。** 检查容器如何加载数据、添加适配器以及训练模型。

我们保存预处理后的数据集，以便所有训练运行都可以重复使用它。

### 逐步指南

#### 在 Hugging Face Jobs 上运行

##### 预处理

预处理容器使用 Blender 渲染每个对象的 16 个视角。LoRA 训练将使用这些视角作为条件图像。Blender 通过 `xvfb-run` 工具在无显示器的情况下运行。该容器还通过 [预处理管道](https://github.com/microsoft/TRELLIS.2/blob/main/data_toolkit/README.md) 处理每个对象。请参阅 [此处的人鞋数据集](https://huggingface.co/datasets/suvadityamuk/gso-footwear-trellis2-latents) 以获取中间输出示例。对于我们的 188 个对象，整个运行在 a100-large 作业上大约耗时 1 小时。[此配套仓库](https://github.com/suvadityamuk/trellis2-finetuning/blob/master/preprocess.py) 中也提供了预处理管道的精简版本。

```
export HF_TOKEN=hf_xxx  

## 将 your-username 替换为你的 Hugging Face 用户名

hf jobs run -d --flavor a100-large --timeout 6h --secrets HF_TOKEN \
  cr.hf.co/suvadityamuk/trellis2-finetuning-prep:latest \
  trellis2-prep \
    --meshes your-username/my-meshes \
    --push-to your-username/my-meshes-trellis2 \
    --private --holdout 0.05 \
    --views 16 --workers 8
```

对于 Hugging Face Jobs，我们传递以下参数：

| 标志 | 含义 |
| --- | --- |
| `-d` | 分离模式：打印作业 ID 和 URL，然后返回。要跟踪作业，请运行 `hf jobs logs -f <id>` |
| `--flavor a100-large` | 硬件配置。我们使用 a100-large (80 GB)。要查看所有选项，请运行 `hf jobs hardware` |
| `--timeout 6h` | 作业在此时间后停止。两个命令均可恢复。预处理会跳过已完成的对象。训练从 `--push-to` 中的最新检查点继续 |
| `--secrets HF_TOKEN` | 将你的令牌（来自 `HF_TOKEN` 或 `hf auth login`）作为加密环境变量发送给作业。令牌不会写入镜像中 |
| `cr.hf.co/...:latest` | 要运行的镜像。其后的所有文本均为在容器中运行的命令 |

无论是否在 Hugging Face Jobs 上运行，此容器还接受一些其他参数，你可以在 [此处](https://github.com/suvadityamuk/trellis2-finetuning#1-preprocess-trellis2-prep) 找到相关文档。预处理管道中执行的步骤将在本节后面进行记录。

##### LoRA 微调

训练容器加载准备好的数据集和配置预设或文件。它使用 Trackio 记录训练指标。使用 Trackio 仪表板监控运行过程。

我们使用 ‘ss’ 和 ‘shape’ 来表示训练 LoRA 的两种模式。‘ss’ 模式仅微调 Sparse-Structure Flow DiT，而 ‘shape’ 模式微调 Shape Flow DiT。在底层，它们只是引用不同的 `config.json` 文件用于各个阶段。有关该过程的更多详细信息可在本节后面找到。

```
export HF_TOKEN=hf_xxx  # 将 your-username 替换为你的 Hugging Face 用户名

hf jobs run -d --flavor a100-large --timeout 12h --secrets HF_TOKEN \
  cr.hf.co/suvadityamuk/trellis2-finetuning-train:latest \
  trellis2-train --config ss \
    --latents your-username/my-meshes-trellis2 \
    --push-to your-username/my-trellis2-lora \
    --run-name ss_lora \
    --push-path ss_lora \
    --trackio-space your-username/trellis2-trackio

hf jobs run -d --flavor a100-large --timeout 12h --secrets HF_TOKEN \
  cr.hf.co/suvadityamuk/trellis2-finetuning-train:latest \
  trellis2-train --config shape \
    --latents your-username/my-meshes-trellis2 \
    --push-to your-username/my-trellis2-lora \
    --run-name shape_lora \
    --push-path shape_lora \
    --trackio-space your-username/trellis2-trackio \
    --set max_steps=3000 i_save=500
```

如果设置了 `--push-to`，容器会将适配器检查点上传至 Hub。容器接受的参数也在[此处有文档说明](https://github.com/suvadityamuk/trellis2-finetuning#3-train-trellis2-train)（为简洁起见）。[同一仓库](https://github.com/suvadityamuk/trellis2-finetuning/blob/master/finetune.py)中还提供了一个紧凑的脚本。

如果你想试用并微调[我们已经处理好的数据集](https://huggingface.co/datasets/suvadityamuk/gso-footwear-trellis2-latents)，请随意使用以下命令集。

```
export HF_TOKEN=hf_xxx  

## 将 your-username 替换为你的 Hugging Face 用户名

## 针对 Sparse-Structure Flow DiT
hf jobs run -d --flavor a100-large --timeout 12h --secrets HF_TOKEN \
  cr.hf.co/suvadityamuk/trellis2-finetuning-train:latest \
  trellis2-train \
    --config ss \
    --latents suvadityamuk/gso-footwear-trellis2-latents \
    --push-to your-username/trellis2-footwear-lora \
    --run-name ss_lora \
    --push-path ss_lora \
    --trackio-space your-username/trellis2-trackio \
    --set max_steps=3000 i_save=500

## 针对 Shape Flow DiT
hf jobs run -d --flavor a100-large --timeout 12h --secrets HF_TOKEN \
  cr.hf.co/suvadityamuk/trellis2-finetuning-train:latest \
  trellis2-train \
    --config shape \
    --latents suvadityamuk/gso-footwear-trellis2-latents \
    --push-to your-username/trellis2-footwear-lora \
    --run-name shape_lora \
    --push-path shape_lora \
    --trackio-space your-username/trellis2-trackio \
    --set max_steps=3000 i_save=500
```

#### 使用 Docker 在本地运行

##### 预处理

命令和标志与 Hugging Face Jobs 相同，仅 Docker 选项不同。

```
## 用于预处理为 latents
docker run --gpus all --rm --shm-size 16g -e HF_TOKEN=hf_xxx \
  -v hf-cache:/root/.cache/huggingface -v "$PWD/work":/workspace/work \
  cr.hf.co/suvadityamuk/trellis2-finetuning-prep:latest \
  trellis2-prep --meshes your-username/my-meshes --push-to your-username/my-meshes-trellis2
```

##### LoRA 微调

```
## 针对 Sparse-structure Flow DiT
docker run --gpus all --rm --shm-size 16g \
  -v hf-cache:/root/.cache/huggingface -v "$PWD/work":/workspace/work \
  cr.hf.co/suvadityamuk/trellis2-finetuning-train:latest \
  trellis2-train --config ss --latents your-username/my-meshes-trellis2 \
    --push-to your-username/my-trellis2-lora --trackio-space your-username/trellis2-trackio

## 针对 Shape Flow DiT
docker run --gpus all --rm --shm-size 16g \
  -v hf-cache:/root/.cache/huggingface -v "$PWD/work":/workspace/work \
  cr.hf.co/suvadityamuk/trellis2-finetuning-train:latest \
  trellis2-train --config shape --latents your-username/my-meshes-trellis2 \
    --push-to your-username/my-trellis2-lora --trackio-space your-username/trellis2-trackio
```

如果你想在所选机器上本地使用我们[已经预处理好的数据集](https://huggingface.co/datasets/suvadityamuk/gso-footwear-trellis2-latents)，请使用以下命令：

```
export HF_TOKEN=hf_xxx  # 将 your-username 替换为你的 Hugging Face 用户名

## 针对 Sparse-structure Flow DiT
docker run --gpus all --rm --shm-size 16g -e HF_TOKEN \
  -v hf-cache:/root/.cache/huggingface \
  -v "$PWD/work":/workspace/work \
  cr.hf.co/suvadityamuk/trellis2-finetuning-train:latest \
  trellis2-train \
    --config ss \
    --latents suvadityamuk/gso-footwear-trellis2-latents \
    --push-to your-username/trellis2-footwear-lora \
    --trackio-space your-username/trellis2-trackio \
    --set max_steps=3000 i_save=500

## 针对 Shape Flow DiT
docker run --gpus all --rm --shm-size 16g -e HF_TOKEN \
  -v hf-cache:/root/.cache/huggingface \
  -v "$PWD/work":/workspace/work \
  cr.hf.co/suvadityamuk/trellis2-finetuning-train:latest \
  trellis2-train \
    --config shape \
    --latents suvadityamuk/gso-footwear-trellis2-latents \
    --push-to your-username/trellis2-footwear-lora \
    --trackio-space your-username/trellis2-trackio \
    --set max_steps=3000 i_save=500
```

我们的训练好的 LoRA 适配器位于此仓库：[suvadityamuk/trellis-2-finetune-gso](https://huggingface.co/suvadityamuk/trellis-2-finetune-gso)

### 训练流程内部

##### 预处理为潜变量

[[[Image]](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/3d-lora-finetuning/preprocessing.png)](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/3d-lora-finetuning/preprocessing.png) 我们使用 TRELLIS.2 的冻结编码器将输入网格转换为训练潜变量。我们保存这些潜变量，以便后续运行时无需再次对网格进行编码。

我们还在 Blender 中渲染每个对象的 16 个视图。在训练过程中，我们为每个样本选择一个随机视图作为条件图像。我们从 188 个对象中保留 9 个用于评估，并在其余 179 个对象上进行训练。这些保留的对象展示了适配器是否能在模型训练期间未见过的对象上发挥作用。

[[[Image]](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/3d-lora-finetuning/conditioning_views.png)](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/3d-lora-finetuning/conditioning_views.png)

> *Blender 为某个对象渲染的部分视图*

第一个代码片段用于设置数据。`FLOW` 选择要训练的 flow DiT（`ss` 或 `shape`），`STEPS` 设置优化器的步数。批次大小（batch size）为 4，梯度累积步数为 4，因此有效批次大小为 16。然后，该片段加载所选 flow DiT 的 LoRA 配置文件，以 TRELLIS.2 格式构建数据集，移除保留的对象，并创建用于微调的数据加载器。

```
cfg = json.load(
    open(
        {
            "ss": "/workspace/TRELLIS.2/configs/lora/ss_flow_lora_gso.json",
            "shape": "/workspace/TRELLIS.2/configs/lora/slat_flow_img2shape_lora_gso.json",
        }[FLOW]
    )
)

key, latents = {
    "ss": ("ss_latent", "ss_latents/ss_enc_conv3d_16l8_fp16_64"),
    "shape": ("shape_latent", "shape_latents/shape_enc_next_dc_f16c32_fp16_512"),
}[FLOW]

roots = json.dumps(
    {
        "gso": {
            key: f"{DATA}/{latents}",
            "render_cond": f"{DATA}/renders_cond",
            "meta": DATA,
        }
    }
)

ds = getattr(datasets, cfg["dataset"])(roots, **cfg["dataset_args"])

holdout = set(open(f"{DATA}/holdout.txt").read().split())
ds.instances = [(root, sha) for root, sha in ds.instances if sha not in holdout]

batches = cycle(
    DataLoader(
        ds,
        batch_size=BATCH,
        shuffle=True,
        drop_last=True,
        num_workers=4,
        collate_fn=getattr(ds, "collate_fn", None),
    )
)
```

##### 准备 LoRA 适配器

[[[Image]](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/3d-lora-finetuning/lora_adapters.png)](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/3d-lora-finetuning/lora_adapters.png) 我们使用 `peft` 库将 LoRA 适配器插入到选定的层中。TRELLIS.2 具有自定义的前向传播过程，因此标准的 `PeftModel()` 包装器不起作用。相反，我们调用 `inject_adapter_in_model()`。此函数将适配器直接添加到模型中，并保留其自定义接口。

我们将可训练的适配器权重保持为 32 位浮点数（`fp32`）以确保数值稳定性，并在前向传播中使用 bfloat16（`bf16`）自动混合精度。自动混合精度允许 PyTorch 对某些操作使用较低的精度，从而降低内存使用量。自动混合精度不会改变冻结的主干权重的存储方式。

```
model = models.from_pretrained(cfg["ckpt"])
for block in model.blocks:
    block.use_checkpoint = True

inject_adapter_in_model(
    LoraConfig(
        r=cfg["rank"], lora_alpha=cfg["alpha"], target_modules=cfg["lora_targets"]
    ),
    model,
)

params = []
for name, p in model.named_parameters():
    p.requires_grad_("lora_" in name)
    if p.requires_grad:
        p.data = p.data.float()  # LoRA 的 fp32 主权重
        params.append(p)

model.cuda().train()
```

##### 训练

[[[图片]](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/3d-lora-finetuning/training_loop.png)](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/3d-lora-finetuning/training_loop.png) 需要注意的是，此处的目标函数是经典的整流流匹配（rectified flow matching）（如 [Stable Diffusion 3](https://huggingface.co/collections/stabilityai/stable-diffusion-3)、[Flux 2](https://huggingface.co/collections/black-forest-labs/flux2) 等流行图像生成模型中所见）。TRELLIS.2 在预训练中也使用了相同的目标函数，因此它是微调的良好选择。有关理论细节，请参阅关于流匹配的 [这篇博客](https://huggingface.co/spaces/ariG23498/flow-matching)。

我们仅更新稀疏结构和形状 DiT 中的 LoRA 参数。所有原始模型权重保持冻结。

> 以下代码片段展示了一个阶段的训练循环核心部分。它们比容器代码更简单，不包含某些设置步骤。如需完整工作流程，请使用容器命令。

我们初始化优化器并加载 DINOv3 以从输入图像中提取特征。

```
opt = torch.optim.AdamW(
    params, lr=cfg["lr"], weight_decay=cfg["weight_decay"], betas=(0.9, 0.95)
)

dino = DinoV3FeatureExtractor(
    cfg["image_cond_model"], image_size=cfg["image_size"]
).cuda()
```

随后，我们在训练循环中执行以下步骤：

- 为每个样本采样一个时间步 *t*（基于 TRELLIS.2 配置，对于稀疏结构流 DiT 使用 logitNormal，对于形状流 DiT 使用 uniform）。
- 生成与数据形状匹配的随机噪声，并重塑 *t* 以进行广播。
- 根据 *t* 混合干净数据与噪声（其中 *t = 0* 表示噪声最小的数据，*t = 1* 表示纯噪声）。
- 预测 *t × 1000* 处的速度以匹配预训练条件。
- 计算预测速度与目标速度（*x_t* 的一阶导数）之间的均方误差作为损失。

```
def flow_loss(x0, cond):
    s = cfg["t_schedule"]

    t = (
        torch.rand(x0.shape[0])
        if s["name"] == "uniform"
        else torch.sigmoid(
            torch.randn(x0.shape[0]) * s["args"]["std"] + s["args"]["mean"]
        )
    )
    t = t.cuda()

    noise = (
        x0.replace(torch.randn_like(x0.feats))
        if cfg["sparse"]
        else torch.randn_like(x0)
    )

    tv = t.view(-1, *[1] * (len(x0.shape) - 1))

    x_t = (1 - tv) * x0 + (cfg["sigma_min"] + (1 - cfg["sigma_min"]) * tv) * noise

    pred, target = model(x_t, t * 1000, cond), (1 - cfg["sigma_min"]) * noise - x0

    return (
        F.mse_loss(pred.feats, target.feats)
        if cfg["sparse"]
        else F.mse_loss(pred, target)
    )
```

训练循环计算损失并更新适配器权重。梯度累积在每次优化器步骤之前累加来自 4 个小批量的梯度。梯度检查点通过在反向传播期间重新计算某些中间值来节省 GPU 内存。外层循环运行指定的优化器步骤数，而内层循环在一组批次上累积梯度。

对于每个批次，DINOv3 对条件图像进行编码。对于 [无分类器引导](https://huggingface.co/papers/2207.12598) (CFG) 丢弃，循环将随机比例 (p_uncond) 样本的条件设置为零。然后，它使用 bf16 自动混合精度计算流匹配损失。在内层循环之后，它裁剪梯度以防止过大的更新，并执行优化器步骤。它每 10 步记录一次损失，并每 500 步保存一个适配器检查点。

```
for step in range(1, STEPS + 1):
    for _ in range(ACCUM):
        batch = next(batches)
        x0 = recursive_to_device(batch["x_0"], "cuda")

        with torch.no_grad():
            cond = dino(batch["cond"])
            cond[torch.rand(len(cond), device="cuda") < cfg["p_uncond"]] = 0

        with torch.autocast("cuda", dtype=torch.bfloat16):
            loss = flow_loss(x0, cond) / ACCUM

            loss.backward()

    torch.nn.utils.clip_grad_norm_(params, cfg["grad_clip"])

    opt.step()
    opt.zero_grad()
```

#### 结果

我们训练了两个适配器：一个用于稀疏结构 DiT，另一个用于形状 DiT。容器镜像中的 LoRA 配置文件包含了完整的训练设置：[ss_flow_lora_gso.json](https://github.com/suvadityamuk/trellis2-finetuning/blob/master/container/trellis2/configs/lora/slat_flow_img2shape_lora_gso.json) 用于稀疏结构 flow DiT，[slat_flow_img2shape_lora_gso.json](https://github.com/suvadityamuk/trellis2-finetuning/blob/master/container/trellis2/configs/lora/slat_flow_img2shape_lora_gso.json) 用于形状 flow DiT。每次运行均在 Hugging Face Jobs 上使用一块 A100 80 GB 显卡。稀疏结构运行耗时 7.2 小时，形状运行耗时 3.6 小时。

稀疏结构 flow DiT 的训练损失在开始时迅速下降，随后减缓。形状 flow DiT 的损失则保持在大致相同的水平。这些曲线展示了训练目标的变化，但它们并不能直接衡量生成几何体的质量。 [[[Image]](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/3d-lora-finetuning/training_loss.png)](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/3d-lora-finetuning/training_loss.png)

Flow-matching 损失随采样对象、噪声和时间步长而变化。为了确定微调是否改善了几何体质量，我们还必须比较在保留对象上的输出结果。

下图比较了九个保留对象中五个的输出结果。它展示了输入图像、基础模型生成的输出、经过旋转调整后的基础输出、带有鞋类适配器的输出以及参考扫描。在这些示例中，微调模型的鞋底更接近扫描结果。

[[[Image]](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/3d-lora-finetuning/heldout_meshes.png)](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/3d-lora-finetuning/heldout_meshes.png)

我们还使用三个指标来评估测试集上的几何体质量：

| 指标 | 含义 |
| --- | --- |
| Chamfer distance（ Chamfer 距离） | 一个表面上的点到另一个表面上最近点的距离，双向测量。越低越好。 |
| F-score @ 0.02 | 精确率（生成表面有多少位于参考表面附近）和召回率（生成表面覆盖了多少参考表面）的组合。此处匹配阈值为扫描边界框对角线的 2%。越高越好。 |
| Normal consistency（法线一致性） | 表面方向的一致性程度。表面法线是垂直于表面的向量。越高越好。 |

#### [[[Image]](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/3d-lora-finetuning/heldout_metrics.png)](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/3d-lora-finetuning/heldout_metrics.png)

在图表的九个对象比较中，基础模型的平均 F-score 为 0.276，而带有鞋类适配器的模型为 0.803。Chamfer 距离从 0.174 降至 0.033，法线一致性从 0.530 升至 0.804。使用两个适配器后，所有九个保留对象的 F-score 均有所提升。 [[[Image]](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/3d-lora-finetuning/per_object_fscore.png)](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/3d-lora-finetuning/per_object_fscore.png)

所有运行的统计数据请参阅此 [Trackio space](https://suvadityamuk-trellis2-geoflow-lora-trackio.hf.space/media?project=trellis2-geoflow-lora&runs=blog-results)。

### 未来方向

好了，这就是我们的成果！我们通过向控制几何体的两个模型组件添加 LoRA 适配器，对 TRELLIS.2 进行了微调以生成鞋类。我们准备了一次数据，在单独的任务中训练了适配器，并在保留对象上评估了输出结果。

主要的经验教训是选择一个与问题和数据相符的训练目标。在本实验中，我们微调了结构和形状阶段，并冻结了纹理阶段。

接下来，我们可以探讨同样的选择是否有助于其他 3D 生成模型，例如 [Pixal3D](https://github.com/TencentARC/Pixal3D) 和 [UniLat3D](https://github.com/UniLat3D)。

Gaussian-splat 和世界生成模型，如 [HunyuanWorld 2.0](https://github.com/Tencent-Hunyuan/HY-World-2.0) 和 [NVIDIA Lyra 2.0](https://nv-tlabs.github.io/Project-Lyra/)，也是接下来可能的步骤。它们的表示方法和训练流程可能需要不同的方法。

感谢你的阅读，我们下期再见！ 👋🤗

↑ 正文结束
✓ 本篇全文免费开放

读完还有疑问？会员每天能问小互 30 次，每句带出处；还有一份按你口味挑好的每日 AI 日报。
[成为会员 $59/年](https://xiaohu.ai/buy/?plan=year&slug=3d-lora-finetuning&from=tail)[按月 $6.99](https://xiaohu.ai/buy/?plan=monthly&slug=3d-lora-finetuning&from=tail)

7 天内不满意全额退 · [看会员能多什么 →](https://xiaohu.ai/membership/)

[阅读原文 ↗](https://huggingface.co/blog/3d-lora-finetuning)

📮 新解读每晚进邮箱

读完觉得有用？留个邮箱，每晚一封当天的新解读，随时退订。
