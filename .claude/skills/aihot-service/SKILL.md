---
name: aihot-service
description: AIHot 生产服务(Nuxt/Nitro)的启动、停止、重启、状态监控与日志查看。当用户提到 aihot / ai-insights 服务的启动、停止、重启、运行状态、健康检查、端口、内存/CPU 占用、日志,或 start / stop / restart / status / monitor / logs 时使用。
---

# AIHot 服务管理

AIHot 是 Nuxt/Nitro 生产服务,应用位于 `ai-insights/`,由仓库根目录的三个脚本管理(均可在任意目录执行,脚本内部自行解析路径):

| 操作 | 命令 | 说明 |
|---|---|---|
| 启动 | `./start.sh [端口]` | 端口默认 3000(参数 > 环境变量 `PORT`);`nohup` 后台启动,自带 15 秒健康检查,失败会自动打印日志尾并退出非 0 |
| 停止 | `./stop.sh` | 先 SIGTERM 优雅退出(5 秒),超时 SIGKILL;最后按入口路径兜底清理残留进程 |
| 状态 | `./status.sh [-v]` | 汇总进程/端口/健康检查/CPU/内存/日志;`-v` 附带最近 30 行日志 |

`./status.sh` 退出码:`0` 运行且健康、`1` 未运行、`2` 运行中但异常(健康检查未通过或端口未知)。判断状态时**以退出码为准**,不要只看输出文字。

## 关键路径

- 服务入口:`ai-insights/.output/server/index.mjs`(`nuxt build` 产物,缺失时启动会失败)
- PID 文件:`ai-insights/aihot.pid`;日志:`ai-insights/aihot.log`(追加式)
- 健康检查端点:`/api/articles?pageSize=1`(期望 200)
- 管理台:`http://<主机>:<端口>/admin`(默认密码 aihot2026)

## 环境变量(启动/重启前必须检查并提醒用户)

配置的推荐方式是写入 `ai-insights/.env` —— start.sh 启动时自动加载(值含空格/特殊字符用引号包裹),该文件已被 `.gitignore` 忽略不会入库。命令行前缀 `VAR=... ./start.sh` 仍可用且**优先于** `.env`:

```bash
# ai-insights/.env
ADMIN_PASSWORD='强密码'
ZHIPU_API_KEY='智谱Key'
```

| 变量 | 必需性 | 未设置的后果 |
|---|---|---|
| `ADMIN_PASSWORD` | 可选;对外/公网部署强烈建议 | 管理台用默认密码 `aihot2026`,有被入侵风险 |
| `ZHIPU_API_KEY` | AI 功能必需:文章翻译 + 每日 23:59 自动热点聚合任务(`aggregator:run`)| 先回退 `ANTHROPIC_AUTH_TOKEN`;再无则依次尝试 OpenRouter(需 `OPENROUTER_API_KEY`)和本机 OpenAI 兼容服务(LM Studio `127.0.0.1:1234` / mlx_lm `:8080`),全部不可用时 AI 功能报错。**不影响服务启动与健康检查** |

**每次启动/重启前**:若用户未提供这两个变量,启动前必须提醒并等确认——

- `ADMIN_PASSWORD` 未提供 → 提示"将使用默认密码 aihot2026,是否继续?"
- `ZHIPU_API_KEY` 未提供 → 提示"AI 翻译与每日聚合任务将不可用,是否继续?"

用户确认继续、或补齐变量(写入 `ai-insights/.env`)后再执行启动。用 `.env` 持久化后重启无需重复传参;若只是命令行前缀传值,则重启必须带相同变量。查看运行中进程实际生效的配置:看 `./status.sh` 输出的"配置"行——**打印具体参数值**(ADMIN_PASSWORD 显示明文;API Key 首尾脱敏,如 `abc123…wxyz`,完整密钥不外显)。

## 操作流程

1. **查状态**:先跑 `./status.sh`(需要看日志加 `-v`),把汇总面板转述给用户。
2. **启动**:先按上面"环境变量"一节检查并提醒用户,再以 `ADMIN_PASSWORD=... ZHIPU_API_KEY=... ./start.sh [端口]` 启动。若报"未找到构建产物",先 `cd ai-insights && npm install && npm run build` 再重试;若报"服务已在运行",提示用户先停止或改用重启。
3. **停止**:跑 `./stop.sh`,确认输出"已停止/已清理"。
4. **重启**:`./stop.sh && ./start.sh [端口]`(start.sh 拒绝重复启动,必须先停)。
5. **持续监控**:仅在用户明确要求时,用 CronCreate 定时执行 `./status.sh`(如每 5 分钟),只在状态变化或异常(退出码 2)时向用户汇报;结束时用 CronDelete 清理。

## 排查

- 启动健康检查失败 / 退出码 2:`tail -n 50 ai-insights/aihot.log` 看报错;常见为端口被占(`ss -ltnp | grep :<端口>`)或内容目录缺少文章数据。
- 日志出现"未配置智谱 API Key"或聚合/翻译失败:说明启动时未带 `ZHIPU_API_KEY`(或 `ANTHROPIC_AUTH_TOKEN`),重启时补上即可。
- 端口冲突:换端口启动(`./start.sh 3001`)或停掉占用进程。
- PID 文件残留(进程已退出):`status.sh` 会提示,直接 `rm ai-insights/aihot.pid` 即可,不影响后续启动(start.sh 也会自动清理)。
- 服务莫名退出:对比 `aihot.log` 尾部与时间戳,检查系统 OOM:`dmesg | grep -i oom`。
