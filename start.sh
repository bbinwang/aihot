#!/usr/bin/env bash
# AIHot 启动脚本 —— 生产模式启动 Nuxt/Nitro 服务
# 用法: ./start.sh [端口]   或   PORT=3210 ./start.sh
set -euo pipefail

# ── 路径与配置 ────────────────────────────────────────────────
APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/ai-insights" && pwd)"   # 应用根(nuxt.config.ts 所在)
SERVER_ENTRY="$APP_DIR/.output/server/index.mjs"                       # 构建产物入口
PID_FILE="$APP_DIR/aihot.pid"
LOG_FILE="$APP_DIR/aihot.log"
# 自动加载 .env(若存在);命令行前缀传入的变量优先于 .env
if [[ -f "$APP_DIR/.env" ]]; then
  set -a; . "$APP_DIR/.env"; set +a
fi
PORT="${1:-${PORT:-3000}}"                                             # 参数 > 环境变量/.env > 默认 3000

# ── 前置检查 ────────────────────────────────────────────────
if [[ ! -f "$SERVER_ENTRY" ]]; then
  echo "✗ 未找到构建产物 $SERVER_ENTRY"
  echo "  请先编译: cd ai-insights && npm install && npm run build"
  exit 1
fi
command -v node >/dev/null || { echo "✗ 未安装 Node.js"; exit 1; }

# 已在运行则拒绝重复启动(进程存活校验,残留 PID 文件自动清理)
if [[ -f "$PID_FILE" ]] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
  echo "✗ 服务已在运行 (PID $(cat "$PID_FILE"), 端口 ${PORT})"
  echo "  如需重启请先执行: ./stop.sh"
  exit 1
fi
rm -f "$PID_FILE"

# ── 启动 ────────────────────────────────────────────────────
cd "$APP_DIR"
echo "→ 启动 AIHot (端口 ${PORT}) ..."
HOSTNAME=0.0.0.0 PORT="$PORT" nohup node "$SERVER_ENTRY" \
  >>"$LOG_FILE" 2>&1 &
PID=$!
echo "$PID" >"$PID_FILE"

# ── 健康检查(最多等 15 秒) ────────────────────────────────────
for i in $(seq 1 15); do
  sleep 1
  if ! kill -0 "$PID" 2>/dev/null; then
    echo "✗ 进程已退出,最近日志:"
    tail -n 20 "$LOG_FILE"
    rm -f "$PID_FILE"
    exit 1
  fi
  if curl -sf -o /dev/null "http://127.0.0.1:${PORT}/api/articles?pageSize=1"; then
    echo "✓ 启动成功  PID=$PID  端口=$PORT"
    echo "  首页    http://<主机>:${PORT}/"
    echo "  管理台  http://<主机>:${PORT}/admin  (密码为 ADMIN_PASSWORD,未配置时默认 aihot2026)"
    echo "  日志    $LOG_FILE"
    exit 0
  fi
done
echo "✗ 15 秒内未通过健康检查,请查看日志: $LOG_FILE"
exit 1
