# 本地模型链路排查

AIHot 的 LLM 降级链路:智谱(首选) → OpenRouter(可选) → 本地模型。本 skill 排查**本地模型段**的四级链路,定位断点后给出对应修复动作。全链路架构文档见 `docs/claude-model-router.md`。

链路拓扑:

```
aihot(llm.ts callLocal)
  └→ nps 隧道 127.0.0.1:28000  ──(npc 客户端 "acer")──→  Mac mini(192.168.2.122) 的 oMLX :28000

claude-model-router(127.0.0.1:28001, systemd)
  ├→ 本地模型(命中 28000 模型列表) → 同上 nps 隧道
  └→ 其余(glm 系列) → https://open.bigmodel.cn/api/anthropic
```

关键事实(勿再踩坑):

- `127.0.0.1:8080` 是 **nps 的 web 管理口**(`nps.conf: web_port=8080`),不是 mlx_lm,永远别把它加进 `LOCAL_LLM_BASES`。
- `127.0.0.1:18000`、`127.0.0.1:1234` 是历史遗留地址,本机从未部署,已从 `.env` 清除。
- `LOCAL_LLM_BASES` 当前唯一候选是 `http://127.0.0.1:28000/v1`。
- nps 隧道配置在 `/etc/nps/conf/tasks.json`(28000 = 任务 Id 24「omlx 转发到 macmini」),客户端连接状态看 `IsConnect`。
- SSH 隧道 20022 → Mac(192.168.2.122:22)存在,但服务器无密钥,`ssh -p 20022 root@127.0.0.1` 会 Permission denied——Mac 侧操作只能由用户手动做。

## 排查流程(按序执行,遇到第一个失败点即定位)

### 1. nps 隧道进程与客户端在线

```bash
systemctl is-active nps
grep -o '"Id":24[^}]*"IsConnect":[a-z]*' /etc/nps/conf/tasks.json  # 或直接看文件确认任务 24 存在且 Status:true
ss -tlnp | grep :28000   # nps 应在监听
```

失败 → `systemctl restart nps` 后重试。

### 2. 隧道连通性(请求能否到达 Mac 并得到 HTTP 响应)

```bash
curl -s -m 8 -o /dev/null -w '%{http_code} time=%{time_total}\n' http://127.0.0.1:28000/v1/models
```

- `000`(挂起/空回复)或 4xx/5xx → **隧道通但 Mac 侧 oMLX 后端异常**(最常见断点),进入第 3 步确认。
- 200 → 本地链路正常,问题在别处(检查 aihot 的 `.env` `LOCAL_LLM_BASES` 与服务是否重启加载)。

### 3. 区分「隧道断」与「Mac 服务挂」

```bash
journalctl -u nps --since '10 min ago' --no-pager | grep -E '28000|client 2'
journalctl -u claude-model-router --since '10 min ago' --no-pager | tail -20
```

- nps 日志有 `new tcp connection,local port 28000,client 2` 且 router 日志报「模型列表刷新失败: fetch failed」→ npc 在线、请求已转发,**Mac 上 oMLX 没在跑**(或端口被占)。
- nps 日志无新连接、tasks.json 里 `IsConnect:false` → npc 客户端掉线(Mac 侧 npc 停了)。

两种情况的修复都在 **Mac 侧**,服务器无法代劳,请用户在 Mac mini(192.168.2.122)上执行:

- oMLX 挂了 → 重启 oMLX 服务,验证 `curl http://127.0.0.1:28000/v1/models` 返回模型列表。
- npc 掉线 → 重启 Mac 上的 npc 客户端(verify key 见 `/etc/nps/conf/clients.json`)。

### 4. 恢复后验证(服务器侧)

```bash
curl -s -m 8 http://127.0.0.1:28000/v1/models | head -c 300   # 应含 "MacJd-Qwen36-35B"
curl -s -m 8 -o /dev/null -w '%{http_code}\n' http://127.0.0.1:28001/v1/models  # 路由器随即可用
```

均 200 即恢复。`llm.ts` 的模型发现有 10 分钟缓存,缓存过期后会自动重新拉取,无需重启 aihot。

### 5. 顺手检查(整链路视角)

- 智谱是否限流:`tail -n 50 ai-insights/aihot.log | grep '\[llm\]'`——降级时现在会 warn 智谱真实失败原因(2026-11-13 起)。
- aihot 服务状态:仓库根目录 `./status.sh`(退出码 0 为健康)。
