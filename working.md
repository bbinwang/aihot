# AIHot 工作进度(更新于 2026-10-02)

> 会话续接用:记录本轮任务完成情况、当前状态与待办,下次直接从这里继续。

## 项目背景

- AIHot = Nuxt/Nitro 生产服务,应用在 `ai-insights/`,仓库根目录脚本管理启停
- 远程:`origin` → github.com/bbinwang/aihot.git,分支 `main`
- **服务当前状态:已停止**(所有测试后均已恢复停止,随时可 `./start.sh` 启动)

## 已完成

### 1. 服务管理三件套 + Skill

| 文件 | 说明 |
|---|---|
| `start.sh`(改造) | ① 启动前自动 source `ai-insights/.env`(命令行前缀变量优先);② 修正了写死"默认密码 aihot2026"的提示 |
| `stop.sh`(原有) | SIGTERM 优雅退出 → 超时 SIGKILL → 按入口路径兜底清理残留 |
| `status.sh`(新建,已测) | 进程/端口/健康检查/CPU/内存/**配置值**/日志概况;`-v` 附带最近 30 行日志。退出码 `0` 健康 / `1` 未运行 / `2` 运行但异常 |
| `.claude/skills/aihot-service/SKILL.md`(新建) | skill:启动/停止/重启/状态监控/日志/持续监控 + 环境变量启动前提醒流程 + 排查手册 |

### 2. 环境变量配置

- `ai-insights/.env`(新建,**已被 git 忽略,不会入库**):`ADMIN_PASSWORD='bidc.3edc'`;`ZHIPU_API_KEY` 留了注释行待填
- 关键结论:
  - 生产 Nitro 进程**不会**自动读 `.env` → 由 start.sh 显式 source 解决
  - `ADMIN_PASSWORD` 缺省回退 `aihot2026`(`src/server/utils/auth.ts:5`)
  - `ZHIPU_API_KEY` 不影响启动;AI 功能(翻译 + 每日 23:59 `aggregator:run` 聚合任务)需要,降级链:ZHIPU_API_KEY → ANTHROPIC_AUTH_TOKEN → OpenRouter → 本机 LM Studio(:1234)/mlx_lm(:8080)(`src/server/utils/llm.ts:8`)
  - 本机 shell 已导出 `ANTHROPIC_AUTH_TOKEN`,服务启动会自动继承(所以本机 AI 功能天然可用)

### 3. 验证记录(全部实测通过)

- 启动→状态→停止 全链路:健康检查 200、端口探测、资源占用均正常
- 密码端到端(管理接口 `/api/admin/aggregator` + `x-admin-password` 头):`wrong`→401、旧默认 `aihot2026`→**401 已失效**、新密码 `bidc.3edc`→200 ✓
- `status.sh` 配置行输出示例:`配置 : ADMIN_PASSWORD=bidc.3edc; ANTHROPIC_AUTH_TOKEN=b4df6f…iPBj`(密码明文;API Key 首尾脱敏)
- git pull 已同步:`2f58b88 → 2de8e31`(新增根 `.gitignore`),无冲突

## 当前 git 状态(未提交内容)

```
 M ai-insights/package-lock.json   # 之前的改动
?? .claude/  start.sh  stop.sh  status.sh  working.md   # 本轮新文件,未提交
```

`ai-insights/.env` 被 ignore,不会出现在 status 里。

## 待办 / 下次可继续

1. **ZHIPU_API_KEY 未填**:`ai-insights/.env` 中取消注释并填入智谱 Key(当前靠 shell 的 ANTHROPIC_AUTH_TOKEN 兜底;换启动环境后会失效)
2. **是否提交新文件**:`start.sh / stop.sh / status.sh / .claude/skills/` 尚未入库,确认后可 `git add` + commit + push
3. 小修(可选):根 `.gitignore` 里 `.out/` 是 `.output/` 的笔误,无实际影响(子目录 `ai-insights/.gitignore` 已正确忽略 `.output`),可顺手修正
4. 可选:status.sh 的 API Key 如需显示完整明文(当前首尾脱敏),改 `mask()` 函数即可

## 常用命令速查

```bash
./start.sh [端口]        # 启动(自动加载 .env,默认端口 3000)
./stop.sh                # 停止
./status.sh [-v]         # 状态(-v 带最近日志)
./status.sh; echo $?     # 0健康/1未运行/2异常
tail -f ai-insights/aihot.log   # 跟踪日志
```
