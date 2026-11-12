---
title: "数据推送改成基于 OpenSharing 的数据拉取机制"
date: 2026-11-11T12:26:36.315Z
tags: []
summary: "原文链接 : https://www.databricks.com/blog/read dont copy replacing file feeds opensharing part 2 how implement 来源 : www.dat"
---
> **原文链接**: [https://www.databricks.com/blog/read-dont-copy-replacing-file-feeds-opensharing-part-2-how-implement](https://www.databricks.com/blog/read-dont-copy-replacing-file-feeds-opensharing-part-2-how-implement)
> **来源**: www.databricks.com
> **发现于**: 管理台手动提交
> **说明**: 本文由 AIHot汪 自动聚合,并由 GLM 翻译为中文(保留全部代码与链接)

---

[跳转到主要内容](https://www.databricks.com/blog/read-dont-copy-replacing-file-feeds-opensharing-part-2-how-implement#main)

- OpenSharing 通过开放协议暴露 Delta 表，接收方可以直接实时读取，而无需从定时的文件或 API 导出中摄取数据。
- 它消除了文件和 API feed 所必需的针对每个接收方的导出作业、文件跟踪和对账工作。
- 接收方将共享表读取为带有 checkpoint 的增量流，通过 Change Data Feed 接收行级的插入、更新和删除。

许多数据共享架构都始于一种常见的模式：

- 提供方按计划导出文件。
- 文件落入存储桶，或通过 SFTP 端点传输。
- 接收方检测到新文件后，加载它、去重，并跟踪已处理的内容。
- 更新和删除则需要额外的约定或对账作业。

本博客的第 1 部分介绍了为什么共享表可以比定期的文件或 API feed 更好。现在让我们看看接收方实际上如何使用该表。

本篇演练聚焦于 Databricks 到 Databricks（D2D）的共享。接收方拥有一个启用了 [Unity Catalog](https://docs.databricks.com/aws/en/data-governance/unity-catalog/) 的 Databricks workspace，并通过共享 catalog 访问共享表。提供方共享该表及其历史记录，使接收方可以将其用作 [Structured Streaming](https://docs.databricks.com/aws/en/structured-streaming/) 源。我们将在文章后面再讨论 Databricks 到开放平台（D2O）的共享。

### OpenSharing 如何取代 feed

Delta 表会保存对其所做的每一次更改的[有序历史记录](https://docs.databricks.com/aws/en/delta/history)。OpenSharing 通过开放协议暴露该表，而无需复制它。数据保留在提供方的存储中，接收方实时读取。

在接收方一侧，你将一个 [Structured Streaming](https://docs.databricks.com/aws/en/structured-streaming/concepts) 读取器指向共享表。Spark 会在 checkpoint 中记录已读取到的位置，因此每次运行只获取自上次运行以来所做的更改。跟踪“自上次查看以来有什么新内容”成为引擎的任务，并且在保留血缘和访问控制的前提下运行于受治理的数据之上。

### 设置共享（双方）

让我们来看一个例子：一家零售商维护着一个实时 orders 表，并与一个运行 Databricks 的外部接收方共享。接收方无需接收每晚的 CSV，而是可以直接查询共享的 orders 表。如果接收方需要本地副本用于分析或下游工作负载，它可以将数据增量物化为 Delta 表。设置只需进行一次，并由提供方和接收方分别完成。

#### 提供方

创建源表并开启 Change Data Feed，然后在 share 中以 WITH HISTORY 方式发布它。历史记录是让表成为增量源的关键。没有它，接收方只能获得静态快照。对于下文的主要增量读取而言，启用 Change Data Feed（delta.enableChangeDataFeed）是可选的。只有当你计划稍后使用 upsert 和删除路径时才开启它。如果你使用的是 Databricks Runtime 19 或更高版本，则可以跳过该属性，而依赖[自动 Change Data Feed](https://docs.databricks.com/aws/en/tables/features/change-data-feed#automatic-change-data-feed)，它会在查询时为启用了 row tracking 的表计算行级更改，并支持 Databricks 到 Databricks 的 OpenSharing。

通过接收方的共享标识符注册接收方，然后对 share 进行授权：

请注意，CREATE SHARE 和 CREATE RECIPIENT 需要 metastore 级别的权限，而不仅仅是 workspace admin 权限。

#### 接收方

此时 share 会作为 provider 出现在你的 metastore 中。将其挂载为 catalog，你就可以像读取任何其他表一样读取它。

### 读取流

将 share 挂载为 shared_in 后，读取工作由 Structured Streaming 处理。

Trigger.AvailableNow 使用一个或多个微批处理当前所有可用的、未处理的数据，然后终止。这使它非常适合定时增量作业。除了固定计划之外，你还可以为作业配置针对共享表的[table update trigger](https://docs.databricks.com/aws/en/jobs/trigger-table-update)，这样作业只在提供方提交新数据时运行。建议将 checkpoint 存储在持久化的云存储中，例如 [UC Volumes](https://docs.databricks.com/aws/en/volumes/)。

注意：本示例通过 Delta Sharing 读取共享表，因此使用 ignoreChanges。如果你直接从普通 Delta 表进行流式读取，较新的 Databricks runtime 会使用 skipChangeCommits 来进行仅追加(append-only)处理。

为了证明它确实是增量的，先对一组初始行运行一次流式处理，然后等 provider 端出现新行后再运行一次。目标表的 commit 历史将显示两次流式写入:

| **版本** | **操作** | **操作指标** |
| --- | --- | --- |
| 2 | STREAMING UPDATE | numRemovedFiles: 0, numOutputRows: 200, numOutputBytes: 2307, numAddedFiles: 1 |
| 1 | STREAMING UPDATE | numRemovedFiles: 0, numOutputRows: 1000, numOutputBytes: 4958, numAddedFiles: 1 |
| 0 | CREATE TABLE | {} |

第二次运行写入了 200 行,而不是 1200 行。checkpoint 记录了上次读取的版本，因此这次运行只拉取了新增的行。

ignoreChanges 适用于这种增量落地(landing)模式，但它可能会重复发出已有的行，并且不会传播删除操作。如果下游消费者需要插入、更新和删除事件，应改为读取共享表的 Change Data Feed:

### 运维层面的变化

当新增一个客户时，provider 无需创建新的 SFTP endpoint,也无需实现新的导出作业。provider 只需授予 recipient 访问该 share 的权限。recipient 使用同样通用的模式，同时保持自己的目标表和下游业务逻辑相互独立。这种运维差异非常显著:

- provider 只需管理一个受治理的源表,而不再是单独的导出。
- 访问通过 share 进行管理:D2D recipient 使用共享 Unity Catalog 上的权限,而 D2O recipient 使用相应的 OpenSharing 凭证流程。
- recipient 从表历史中获取数据,而无需通过自定义文件或时间戳来跟踪。
- 回填(backfill)可以使用历史表版本,而无需 provider 重新生成旧文件。
- 当需要这种能力时,Change Data Feed 会为 recipient 提供明确的插入、更新和删除事件。
- 双方的边界更加清晰:provider 拥有共享的数据产品,recipient 拥有自己的下游处理。

### 非 Databricks 平台上的 recipient(D2O)

上述一切之所以可行,是因为 recipient 在 Databricks 上运行 Spark,这正是实现带 checkpoint 的流式处理和 CDF 的关键。其他 recipient(pandas、BI 工具、Snowflake)则通过 OpenSharing 使用凭证文件进行连接,而不是使用 metastore 共享 ID。

如果它们运行 OSS Spark,读取方式仍是通过 delta-sharing connector 使用相同的 spark.readStream 代码。如果没有 Spark,则没有持续的流,因此它们按版本范围拉取变更:

### 使用 OpenSharing 开始摄取数据

一个有用的首个项目无需解决所有共享场景。从一个普通 Delta 表和一个 recipient 开始。

在实现流式处理之前,请回答以下问题:

- recipient 是 D2D 还是 D2O?
- recipient 需要快照、增量读取,还是行级 CDC?
- share 是否包含历史数据?
- 如果必须传播更新和删除,是否已启用 CDF?
- recipient 将使用哪个 Databricks Runtime 或 OpenSharing connector 版本?
- recipient 将如何处理重试、重复数据、删除和 schema 变更?
- share 投入生产后,由谁负责监控和支持?

明确这些答案后,验证尽可能小的端到端流程:创建 share、读取初始快照、写入一行新数据、更新一行、删除一行,并确认 recipient 看到的是预期结果。

这就是 OpenSharing 所带来的实际转变。你无需为每个客户构建新的传输通道和摄取工作流,而是可以建立一个受治理的数据共享契约,让每个 recipient 通过适合其平台的路径来消费数据。

#### 参考资料

- [读取通过 Databricks-to-Databricks OpenSharing 共享的数据](https://docs.databricks.com/aws/en/opensharing/read-data-databricks)
- [使用 Apache Spark DataFrames 读取 OpenSharing 共享的表](https://docs.databricks.com/aws/en/query/formats/opensharing)
- [什么是 OpenSharing?](https://docs.databricks.com/aws/en/opensharing)
- [为 OpenSharing 创建 share](https://docs.databricks.com/aws/en/opensharing/create-share)
- [在 Databricks 上使用 Change Data Feed](https://docs.databricks.com/aws/en/tables/features/change-data-feed)
- [Delta Lake 表的流式读取和写入](https://docs.databricks.com/aws/en/structured-streaming/delta-lake)

是 OpenSharing 新手？请先阅读 [什么是 OpenSharing？](https://docs.databricks.com/aws/en/opensharing) 和 [为 OpenSharing 创建 share](https://docs.databricks.com/aws/en/opensharing/create-share)，然后针对一个表和一个 recipient 搭建上文中的最小端到端流程。
相关标签：

[Tutorials](https://www.databricks.com/blog/tag/tutorials)

#### 在您的收件箱中获取最新文章

订阅我们的博客，将最新文章第一时间送达您的收件箱。

### 注册
[查看所有博客](https://www.databricks.com/blog)
