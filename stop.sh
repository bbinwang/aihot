#!/usr/bin/env bash
# AIHot 停止脚本 —— 优雅停止生产服务
# 用法: ./stop.sh
set -uo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/ai-insights" && pwd)"
PID_FILE="$APP_DIR/aihot.pid"
LOG_FILE="$APP_DIR/aihot.log"
EXIT=0

stop_by_pid() {
  local pid="$1"
  if kill -0 "$pid" 2>/dev/null; then
    kill "$pid" 2>/dev/null                    # 先 SIGTERM 优雅退出
    for i in $(seq 1 10); do
      sleep 0.5
      kill -0 "$pid" 2>/dev/null || { echo "✓ 已停止 (PID $pid)"; return 0; }
    done
    echo "! 优雅退出超时,强制 SIGKILL (PID $pid)"
    kill -9 "$pid" 2>/dev/null
    sleep 1
    kill -0 "$pid" 2>/dev/null || { echo "✓ 已强制停止 (PID $pid)"; return 0; }
    return 1
  fi
  echo "– PID $pid 已不存在"
  return 0
}

# 优先按 PID 文件停止
if [[ -f "$PID_FILE" ]]; then
  PID="$(cat "$PID_FILE")"
  stop_by_pid "$PID" || EXIT=1
  rm -f "$PID_FILE"
else
  echo "– 无 PID 文件($PID_FILE)"
fi

# 兜底:清理 PID 文件未覆盖的同服务残留进程(按入口路径精确匹配)
REMAINING="$(pgrep -f "node.*${APP_DIR}/.output/server/index.mjs" || true)"
if [[ -n "$REMAINING" ]]; then
  echo "→ 发现残留进程: $REMAINING"
  kill $REMAINING 2>/dev/null
  sleep 2
  STILL="$(pgrep -f "node.*${APP_DIR}/.output/server/index.mjs" || true)"
  [[ -n "$STILL" ]] && kill -9 $STILL 2>/dev/null
  echo "✓ 残留进程已清理"
fi

[[ $EXIT -eq 0 ]] && echo "完成。日志保留在: $LOG_FILE"
exit $EXIT
