# Claude Code 模型路由器

> 配置日期：2026-10-07。让 Claude Code 的 `/model` 列表同时可用**本地大模型**与**智谱 glm 系列**，按模型名自动分流。
>
> ⚠️ 本文档不含任何密钥明文，密钥存放位置见下文「密钥管理」。

## TL;DR

- Claude Code 所有请求发往 `http://127.0.0.1:28001`（本机路由器，systemd 常驻）
- 路由器按请求体里的 `model` 字段分流：本地模型 → `127.0.0.1:28000`，其余 → 智谱
- `/model` 列表：`glm-4.7`、`glm-5.1`、`MacJd-Qwen36-35B`
- 日常运维：`systemctl status|restart claude-model-router`，日志 `journalctl -u claude-model-router -f`

## 架构

```
Claude Code
    │  ANTHROPIC_BASE_URL = http://127.0.0.1:28001
    ▼
┌─────────────────────────────────────────────┐
│  claude-model-router (Node, systemd 常驻)    │
│  /root/.claude/model-router/proxy.js        │
│                                             │
│  model ∈ 本地模型列表?                        │
│    ├─ 是 → 127.0.0.1:28000 (omlx, 本地 key) │
│    └─ 否 → open.bigmodel.cn (透传原 token)   │
└─────────────────────────────────────────────┘
```

- 两端上游均为 **Anthropic `/v1/messages` 格式**，路由器纯字节级转发（含 SSE 流式），不做协议翻译
- 本地模型列表从 `http://127.0.0.1:28000/v1/models` 动态拉取（每 60s 刷新），**新增本地模型无需改路由器代码**

## 本地大模型服务（上游 28000）

| 项 | 值 |
|---|---|
| 监听 | `*:28000`（由 `nps` 进程隧道转发到远程 omlx 服务） |
| 协议 | 同时支持 OpenAI `/v1/chat/completions` 与 **Anthropic `/v1/messages`** |
| 鉴权 | `Authorization: Bearer <key>` 或 `x-api-key`（key 见 `/etc/systemd/system/claude-model-router.service` 的 `LOCAL_API_KEY`） |

当前可用模型（`max_model_len`）：

| 模型 | 上下文 |
|---|---|
| **MacJd-Qwen36-35B**（已加入 /model） | 100000 |
| Qwen3.6-35B-A3B-DFlash / -8bit | 262144 |
| Mac_Qwen3.6-35B | 262144 |
| MacJd-Qwen35-27B | 262144 |
| Qwen3.5-27B-Distilled | 262144 |
| Mac-Qwen35bDflash | 262144 |
| aufklarer--Silero-VAD-MLX | 128000（VAD 语音活动检测，非对话模型，勿加入 /model） |

## 相关文件

| 文件 | 作用 |
|---|---|
| `/root/.claude/model-router/proxy.js` | 路由器代码（无第三方依赖，Node 标准库） |
| `/etc/systemd/system/claude-model-router.service` | systemd 单元：`enable --now` 已开机自启，`Restart=always` 崩溃 2s 自动拉起；环境变量含端口与本地 key |
| `~/.claude/settings.json` | `env.ANTHROPIC_BASE_URL=http://127.0.0.1:28001`；`modelPicker.options` 控制 `/model` 显示行，`availableModels` 为允许名单 |
| `~/.claude/settings.json.bak` | 修改前备份（2026-10-07，回滚用） |

## 新增本地模型到 /model

1. 确认模型已在 28000 的 `/v1/models` 列表中（路由器自动识别，无需改代码）
2. 往 `~/.claude/settings.json` 的 `modelPicker.options` 数组追加一行：
   ```json
   { "model": "<模型名>", "label": "<显示名>", "behavesAs": "claude-sonnet-5-5" }
   ```
   - `behavesAs` 必填：CLI 不认识的模型需映射到一个已知 Claude 模型 ID，继承其客户端行为（prompt profile、能力档位）；**不填则该行在 `/model` 里根本不会显示**（未知模型不被提供）
   - 默认追加在内置模型列表之后；`replaceBuiltInOptions: true` 可整体替换内置列表（未使用）
3. 同时把模型名加进 `availableModels`（这是**允许名单**而非显示列表，限制可切换的模型范围）
4. **重启 Claude Code** 生效（env 与 settings 只在启动时读取）

> 踩坑记录：`availableModels` **不是** `/model` 显示列表——它只是允许名单。控制 `/model` 界面显示的是 `modelPicker.options`（schema 从 claude.exe 二进制中确认：`{ model, label?, description?, behavesAs? }`）。

补充要点（来自官方文档 code.claude.com/docs/en/model-config.md，与本机 2.1.292 行为核对）：

- `modelPicker` 只从 **user / --settings / managed** 文件读取，project/local 里的无效（防克隆仓库篡改）——所以必须写在 `~/.claude/settings.json`
- 未知模型 ID 的上下文窗口默认按 **200k** 假设；MacJd-Qwen36-35B 实际只有 100k，长会话可能压缩过晚。如需精确：env 加 `CLAUDE_CODE_MAX_CONTEXT_TOKENS=100000`（注意它会同时作用于 glm 会话，导致 glm 也提前压缩，按需权衡）
- 不输 `/model` 直接敲 `/model MacJd-Qwen36-35B` 也能切换，无需列表行（列表只是可发现性）
- 网关模型发现（`CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1`）对我们**无效**：它只保留 ID 中含 `claude`/`anthropic` 字样的模型，Qwen/glm 命名的会被丢弃

## 排障

| 症状 | 排查 |
|---|---|
| Claude Code 所有请求失败 | `systemctl status claude-model-router`；`ss -tlnp \| grep 28001` 确认监听 |
| 本地模型 401/连接失败 | 28000 上游（nps 隧道）是否存活：`curl -H "Authorization: Bearer <key>" http://127.0.0.1:28000/v1/models` |
| glm 也走不通 | 智谱侧问题；看路由日志确认分流目标是否为 `remote` |
| 看实时分流 | `journalctl -u claude-model-router -f`（每条请求打印 model 与去向） |
| 改了 proxy.js | `systemctl restart claude-model-router` |

已知设计点：路由器**未**设置请求总超时（长生成不中断），仅 headers 超时 60s；仅监听 `127.0.0.1`，不对外暴露。

## 回滚（恢复直连智谱）

```bash
cp ~/.claude/settings.json.bak ~/.claude/settings.json   # 或手改 BASE_URL 回 https://open.bigmodel.cn/api/anthropic
systemctl disable --now claude-model-router              # 停用路由（文件保留）
```

## 密钥管理

- 本地 omlx key：仅存于 systemd unit 文件（root 可读）与路由进程环境，**不写入本仓库**
- 智谱 key：仍在 `~/.claude/settings.json` 的 `ANTHROPIC_AUTH_TOKEN`，路由器对 remote 流量原样透传该 token，行为与直连一致
- 本文档与仓库任何文件都不应出现密钥明文
