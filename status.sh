#!/usr/bin/env bash
# AIHot 状态监控脚本 —— 进程 / 端口 / 健康检查 / 资源占用 / 日志
# 用法: ./status.sh [-v]   (-v 附带最近 30 行日志)
# 退出码: 0=运行且健康  1=未运行  2=运行中但异常(健康检查未通过或端口未知)
set -uo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/ai-insights" && pwd)"
PID_FILE="$APP_DIR/aihot.pid"
LOG_FILE="$APP_DIR/aihot.log"
ENTRY="$APP_DIR/.output/server/index.mjs"
HEALTH_PATH="/api/articles?pageSize=1"
VERBOSE=0
[[ "${1:-}" == "-v" || "${1:-}" == "--verbose" ]] && VERBOSE=1

# ── 1. 进程检测(优先 PID 文件,失效则按入口路径全局搜索)────────
PID=""
[[ -f "$PID_FILE" ]] && PID="$(tr -dc '0-9' <"$PID_FILE" 2>/dev/null || true)"
if [[ -z "$PID" ]] || ! kill -0 "$PID" 2>/dev/null; then
  PID="$(pgrep -f "node.*${ENTRY}" | head -n 1 || true)"
fi

if [[ -z "$PID" ]]; then
  echo "● AIHot 服务状态: ✗ 未运行"
  [[ -f "$PID_FILE" ]] && echo "  ! 残留 PID 文件($PID_FILE),进程已退出,可删除"
  [[ -f "$LOG_FILE" ]] && echo "  查看历史日志: tail -n 30 $LOG_FILE"
  exit 1
fi

# ── 2. 端口探测(主进程及其子进程监听的端口)──────────────────
ALL_PIDS="$PID $(pgrep -P "$PID" 2>/dev/null | tr '\n' ' ')"
PID_RE="$(echo "$ALL_PIDS" | tr -s ' ' '\n' | sed '/^$/d' | paste -sd'|')"
PORTS="$(ss -ltnp 2>/dev/null \
  | grep -E "pid=(${PID_RE})[,.]" \
  | awk '{print $4}' \
  | sed -E 's/.*:([0-9]+)$/\1/' \
  | sort -un | paste -sd' ')"
MAIN_PORT="${PORTS%% *}"

# ── 3. 健康检查 ──────────────────────────────────────────────
HEALTH_OK=0
HEALTH_INFO="端口未知,跳过健康检查"
if [[ -n "$MAIN_PORT" ]]; then
  T0="$(date +%s%3N)"
  HTTP_CODE="$(curl -s -o /dev/null -w '%{http_code}' --max-time 5 \
    "http://127.0.0.1:${MAIN_PORT}${HEALTH_PATH}" || true)"
  T1="$(date +%s%3N)"
  if [[ "$HTTP_CODE" == "200" ]]; then
    HEALTH_OK=1
    HEALTH_INFO="✓ http://127.0.0.1:${MAIN_PORT}${HEALTH_PATH} → 200 ($((T1-T0))ms)"
  else
    HEALTH_INFO="✗ http://127.0.0.1:${MAIN_PORT}${HEALTH_PATH} → HTTP ${HTTP_CODE:-超时/无响应}"
  fi
fi

# ── 4. 资源占用 ──────────────────────────────────────────────
read -r ELAPSED CPU RSS <<<"$(ps -o etime=,%cpu=,rss= -p "$PID" 2>/dev/null || echo '? ? ?')"
RSS_MB="$(awk -v r="${RSS:-0}" 'BEGIN{printf "%.0f", r/1024}')"

# ── 5. 汇总输出 ──────────────────────────────────────────────
STATE="✓ 运行中(健康)"
[[ $HEALTH_OK -eq 1 ]] || STATE="! 运行中(健康检查未通过)"
echo "● AIHot 服务状态: ${STATE}"
echo "  进程    : PID $PID  已运行 ${ELAPSED:-?}"
echo "  端口    : ${PORTS:-未知}"
echo "  健康检查: $HEALTH_INFO"
echo "  资源    : CPU ${CPU:-?}%  内存 ${RSS_MB}MB"

# ── 4.5 运行进程实际生效的环境变量(打印具体值;API Key 脱敏)──
PROC_ENV="$(tr '\0' '\n' </proc/$PID/environ 2>/dev/null || true)"
env_val() { grep -m1 "^$1=" <<<"$PROC_ENV" | cut -d= -f2-; }
mask() { local v="$1"; (( ${#v} <= 10 )) && echo "$v" || echo "${v:0:6}…${v: -4}"; }
PWD_VAL="$(env_val ADMIN_PASSWORD)"
[[ -n "$PWD_VAL" ]] && CFG="ADMIN_PASSWORD=${PWD_VAL}" || CFG="ADMIN_PASSWORD 未设置(默认密码 aihot2026)"
KEY_VAL="$(env_val ZHIPU_API_KEY)"; KEY_SRC="ZHIPU_API_KEY"
[[ -z "$KEY_VAL" ]] && { KEY_VAL="$(env_val ANTHROPIC_AUTH_TOKEN)"; KEY_SRC="ANTHROPIC_AUTH_TOKEN"; }
if [[ -n "$KEY_VAL" ]]; then CFG="$CFG; ${KEY_SRC}=$(mask "$KEY_VAL")"; else CFG="$CFG; AI Key 未设置(仅剩 OpenRouter/本机模型兜底)"; fi
echo "  配置    : $CFG"
if [[ -f "$LOG_FILE" ]]; then
  ERR_N="$(grep -ciE 'error|fatal|unhandled' "$LOG_FILE" 2>/dev/null || true)"
  echo "  日志    : $LOG_FILE ($(du -h "$LOG_FILE" | cut -f1), 历史错误 ${ERR_N:-0} 条)"
else
  echo "  日志    : 无日志文件"
fi
echo "  管理    : http://<主机>:${MAIN_PORT:-3000}/admin"

if [[ $VERBOSE -eq 1 && -f "$LOG_FILE" ]]; then
  echo ""
  echo "── 最近日志 (tail -n 30 $LOG_FILE) ──"
  tail -n 30 "$LOG_FILE"
fi

[[ $HEALTH_OK -eq 1 ]] && exit 0 || exit 2
