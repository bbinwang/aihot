# AIHot 会话续接(更新于 2026-10-07)

> 下次会话从这里继续。服务操作规范见 skill `aihot-service`(`/status.sh` 退出码判断状态:`0` 健康 / `1` 未运行 / `2` 异常)。更早的历史进度见 `working.md`(2026-10-02,部分信息已过时,以本文件为准)。

## 当前状态(2026-10-07)

- **服务运行中**:端口 **3000**,健康检查通过(`/api/articles?pageSize=1` → 200)
- 已完成 `npm install && npm run build`,产物 `ai-insights/.output/server/index.mjs` 为最新
- `ai-insights/.env` 已配置齐:**ADMIN_PASSWORD + ZHIPU_API_KEY**(值不写在此文件,`.env` 被 gitignore;`status.sh` 的"配置"行可查看实际生效值,Key 首尾脱敏)
- AI 翻译 + 每日 23:59 `aggregator:run` 聚合任务现已可用

## 进行中的任务:通过 nps 让 AIHot 走 80 端口对外

### 本机 nps 情况(已调研,进程 PID 会变,以 `ss -ltnp` 为准)

| 端口 | 用途 |
|---|---|
| 80 | `http_proxy_port`(HTTP 域名代理入口,`/etc/nps/conf/nps.conf`) |
| 443 | `https_proxy_port`,`https_just_proxy=true`(纯透传不终结 TLS → 3000 是明文 HTTP,暂不可用) |
| 8024 | bridge(npc 客户端连接通道) |
| 8080 | nps 管理面板(admin,web_password 在 nps.conf) |
| 20022/23608/23006 | 既有 TCP 隧道(**由其他机器上的 npc 建立,非本机**) |

### 结论:选 HTTP 代理(域名模式)

- 80 就是 nps 的 http_proxy_port,只有 HTTP 域名转发能共享 80;TCP 隧道独占端口抢不到 80;UDP 无关
- **前提:需要一个域名** A 记录指向本机公网 IP;没有域名则只能 TCP 隧道换端口(如 8081→3000)

### 待办步骤

1. 用户在面板 `http://<本机IP>:8080` → 客户端 → 新建,提供 `vkey`
2. **本机安装 npc 并运行**:`npc -server=127.0.0.1:8024 -vkey=<vkey>`,注册 systemd 服务开机自启(本机当前没有 npc!)
3. 面板 → 该客户端 → 域名解析(HTTP)→ 新增:`aihot.<域名>` → `127.0.0.1:3000`
4. DNS 配好 A 记录后验证:`curl -H 'Host: aihot.<域名>' http://127.0.0.1:3000/` 之外,还要从外网实测

### 关键坑

- ⚠️ NPS 转发目标(`127.0.0.1:3000`)在 **npc 所在机器**上解析。现有隧道都是别的机器的 npc 建的,不能在那些客户端下加规则,必须**本机单独跑 npc**
- 8080 面板暴露公网,确认 admin 是强密码
- 卡点:等用户提供 vkey(面板建客户端后),以及是否已有域名
