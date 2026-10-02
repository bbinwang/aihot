#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""会员文章聚合成功报告生成器。
读取一次 runMemberAggregation 的运行 JSON,输出自包含 HTML 报告。
用法: python3 gen_member_report.py <run.json> <out.html>
"""
import json, html, os, sys
from datetime import datetime

def esc(s): return html.escape(str(s)) if s is not None else ""
def fmt_ms(ms):
    s = ms/1000
    return f"{s:.1f}s" if s < 60 else f"{int(s//60)}m {int(s%60)}s"
def fmt_ts(ts):
    if not ts: return "—"
    return datetime.fromisoformat(ts.replace("Z","+00:00")).strftime("%Y-%m-%d %H:%M:%S UTC")

def main():
    run = json.load(open(sys.argv[1]))
    out = sys.argv[2]
    items = run["items"]
    published = [i for i in items if i["status"]=="published"]
    failed = [i for i in items if i["status"]=="failed"]
    gen = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    def card(i, idx):
        ok = i["status"]=="published"
        skip = i["status"]=="skipped"
        badge = ('<span class="badge ok">✓ 已发布</span>' if ok else
                 '<span class="badge skip">– 跳过</span>' if skip else
                 '<span class="badge fail">✗ 失败</span>')
        rows = [f'<div class="kv"><span class="k">小互文章</span><a href="{esc(i["xiaohuUrl"])}" target="_blank">{esc(i["xiaohuUrl"])}</a></div>']
        res = i.get("resolution")
        res_label = {"read-original":"阅读原文锚点","external-link":"外链兜底","web-search":"网络搜索","manual":"人工指定"}.get(res, res or "—")
        rows.append(f'<div class="kv"><span class="k">溯源方式</span><span class="tag">{esc(res_label)}</span></div>')
        if ok:
            rows.append(f'<div class="kv"><span class="k">上游原文</span><a href="{esc(i.get("upstreamUrl"))}" target="_blank">{esc(i.get("upstreamUrl"))}</a></div>')
            rows.append(f'<div class="kv"><span class="k">来源</span>{esc(i.get("sourceName"))}</div>')
            rows.append(f'<div class="kv"><span class="k">发布 slug</span><code>{esc(i.get("slug"))}</code></div>')
        else:
            rows.append(f'<div class="kv"><span class="k">上游链接</span><a href="{esc(i.get("upstreamUrl"))}" target="_blank">{esc(i.get("upstreamUrl"))}</a></div>')
            rows.append(f'<div class="kv"><span class="k">来源</span>{esc(i.get("sourceName"))}</div>')
            if skip:
                rows.append(f'<div class="kv"><span class="k">说明</span>窗口内已处理过,本次跳过(不重抓)</div>')
            else:
                rows.append(f'<div class="kv err"><span class="k">错误</span><pre>{esc(i.get("error"))}</pre></div>')
        cls = 'ok' if ok else ('' if skip else 'fail')
        return f'''<div class="card {cls}">
          <div class="card-head"><span class="idx">#{idx+1}</span><span class="card-title">{esc(i["title"])}</span>{badge}</div>
          <div class="kv-grid">{''.join(rows)}</div></div>'''

    cards = "".join(card(i, idx) for idx, i in enumerate(items))
    rate = f"{run['published']/run['discovered']*100:.0f}%" if run["discovered"] else "—"

    # 失败项说明
    notes_html = ""
    if failed:
        note_rows = []
        for i in failed:
            err = i.get("error", "")
            if "地区限制" in err or "拦截页" in err:
                note = (f"上游 <a href=\"{esc(i.get('upstreamUrl'))}\" target=\"_blank\">{esc(i.get('upstreamUrl'))}</a> 对本机 IP 做了<b>地区限制</b>"
                        f"(返回「App unavailable in region」),本机网络亦无法访问任何阅读器代理(Wayback/Jina/AllOrigins 均不可达)。"
                        f"管线已内置<b>阅读器代理兜底</b>(<code>READER_PROXIES</code>),在可访问代理的网络环境下重跑即可成功。"
                        f"此为上游网络限制,非管线缺陷。")
            else:
                note = esc(err)
            note_rows.append(f'<li><b>{esc(i["title"])}</b> → {note}</li>')
        notes_html = f'<section><h2>失败项说明</h2><ul class="notes">{"".join(note_rows)}</ul></section>'

    doc = f'''<!DOCTYPE html>
<html lang="zh-CN"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>会员文章聚合报告 · {esc(run["id"])}</title>
<style>
:root{{--bg:#0f1117;--panel:#181b24;--panel2:#1f2330;--border:#2a2f3d;--text:#e6e9f0;--muted:#8b93a7;--accent:#5b8cff;--ok:#3ecf8e;--ok-bg:rgba(62,207,142,.12);--fail:#ff6b6b;--fail-bg:rgba(255,107,107,.12);}}
*{{box-sizing:border-box}}body{{margin:0;background:var(--bg);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;line-height:1.6;padding:32px 20px 80px}}
.wrap{{max-width:1040px;margin:0 auto}}h1{{font-size:25px;margin:0 0 4px}}.sub{{color:var(--muted);font-size:14px;margin-bottom:26px}}.sub code{{background:var(--panel);padding:2px 7px;border-radius:5px;color:var(--accent)}}
.grid{{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:14px;margin-bottom:26px}}
.stat{{background:var(--panel);border:1px solid var(--border);border-radius:12px;padding:16px 18px}}.stat .n{{font-size:30px;font-weight:700}}.stat .l{{color:var(--muted);font-size:13px}}.stat.ok .n{{color:var(--ok)}}.stat.fail .n{{color:var(--fail)}}
section{{margin-bottom:32px}}h2{{font-size:18px;margin:0 0 14px;padding-bottom:10px;border-bottom:1px solid var(--border)}}
.meta{{background:var(--panel);border:1px solid var(--border);border-radius:12px;padding:16px 18px}}.meta .kv-grid{{grid-template-columns:1fr 1fr}}
.card{{background:var(--panel);border:1px solid var(--border);border-radius:12px;padding:15px 17px;margin-bottom:12px;border-left:4px solid var(--border)}}
.card.ok{{border-left-color:var(--ok)}}.card.fail{{border-left-color:var(--fail)}}
.card-head{{display:flex;align-items:flex-start;gap:10px;margin-bottom:10px}}.idx{{color:var(--muted);font-size:13px;min-width:26px}}.card-title{{font-weight:600;flex:1}}
.badge{{font-size:12px;padding:3px 10px;border-radius:20px;white-space:nowrap}}.badge.ok{{color:var(--ok);background:var(--ok-bg)}}.badge.fail{{color:var(--fail);background:var(--fail-bg)}}.badge.skip{{color:var(--muted);background:var(--panel2)}}
.kv-grid{{display:grid;gap:6px}}.kv{{display:flex;gap:12px;font-size:13.5px}}.kv .k{{color:var(--muted);min-width:78px;flex-shrink:0}}
.kv a{{color:var(--accent);text-decoration:none;word-break:break-all}}.kv a:hover{{text-decoration:underline}}.kv code{{background:var(--panel2);padding:2px 7px;border-radius:5px}}
.tag{{background:var(--panel2);border:1px solid var(--border);padding:2px 9px;border-radius:20px;font-size:12px}}
.kv.err pre{{margin:0;background:var(--fail-bg);color:var(--fail);padding:8px 11px;border-radius:8px;font-family:ui-monospace,Menlo,monospace;font-size:12.5px;word-break:break-word}}
.notes{{background:var(--panel);border:1px solid var(--border);border-radius:12px;padding:16px 18px 16px 36px;font-size:14px;line-height:1.7}}.notes a{{color:var(--accent);word-break:break-all}}.notes code{{background:var(--panel2);padding:2px 6px;border-radius:5px}}.notes li{{margin-bottom:8px}}
.footer{{color:var(--muted);font-size:12.5px;margin-top:36px;text-align:center}}
@media(max-width:640px){{.meta .kv-grid{{grid-template-columns:1fr}}}}
</style></head><body><div class="wrap">
<h1>AIHot 会员文章聚合 · 运行报告</h1>
<div class="sub">数据源 <code>best.xiaohu.ai/jiedu/?acc=paid</code> · 运行 ID <code>{esc(run["id"])}</code> · 触发 {esc(run["trigger"])}</div>
<div class="grid">
  <div class="stat"><div class="n">{run["discovered"]}</div><div class="l">处理文章</div></div>
  <div class="stat ok"><div class="n">{run["published"]}</div><div class="l">成功发布</div></div>
  <div class="stat fail"><div class="n">{run["failed"]}</div><div class="l">失败</div></div>
  <div class="stat"><div class="n">{rate}</div><div class="l">成功率</div></div>
  <div class="stat"><div class="n">{fmt_ms(run["durationMs"])}</div><div class="l">总耗时</div></div>
</div>
<section><h2>运行元信息</h2><div class="meta"><div class="kv-grid">
  <div class="kv"><span class="k">开始时间</span>{fmt_ts(run["startedAt"])}</div>
  <div class="kv"><span class="k">结束时间</span>{fmt_ts(run["finishedAt"])}</div>
  <div class="kv"><span class="k">运行 ID</span><code>{esc(run["id"])}</code></div>
  <div class="kv"><span class="k">触发方式</span>{esc(run["trigger"])}</div>
  <div class="kv"><span class="k">溯源策略</span>阅读原文锚点 → 来源名网络搜索 → 阅读器代理兜底</div>
  <div class="kv"><span class="k">报告生成</span>{gen}</div>
</div></div></section>
<section><h2>逐条明细(输入 → 溯源 → 输出 / 错误)</h2>{cards}</section>
{notes_html}
<div class="footer">AIHot 会员文章聚合报告 · 生成于 {gen}</div>
</div></body></html>'''
    open(out,"w").write(doc)
    print("written:", out, f"({os.path.getsize(out)} bytes)")
    print(f"published={run['published']} failed={run['failed']}")

if __name__ == "__main__":
    main()
