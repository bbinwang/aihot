/**
 * HTML → Markdown:提取正文(忽略导航/页脚等噪音)并转换,
 * 用于抓取上游原文页面。基于 node-html-parser,无浏览器依赖。
 */
import { parse, type HTMLElement } from 'node-html-parser'

const NOISE_SELECTORS = 'script,style,noscript,iframe,svg,canvas,form,button,select,input,nav,footer,header,aside,template,link,meta'

/** 正文候选容器,按命中优先级 */
const MAIN_CANDIDATES = [
  'article',
  'main',
  '[role="main"]',
  '#content',
  '#article',
  '.post-content',
  '.article-content',
  '.markdown-body',
  '.prose',
  '.entry-content',
  '.doc-content',
]

function absolutize(href: string, baseUrl: string): string {
  if (!href || href.startsWith('data:')) return href
  try {
    return new URL(href, baseUrl || 'http://localhost').toString()
  } catch {
    return href
  }
}

function escapeCell(text: string): string {
  return text.replace(/\|/g, '\\|').replace(/\n/g, ' ').trim()
}

/** 递归深度上限(防御畸形深嵌套 HTML) */
const MAX_DEPTH = 60

/** 节点转 Markdown(递归;严禁把 node 自身再次传入,否则爆栈) */
function convertNode(node: HTMLElement, baseUrl: string, depth = 0): string {
  if (depth > MAX_DEPTH) return node.text || ''
  if (node.nodeType !== 1) return node.text || ''
  const tag = node.rawTagName?.toLowerCase()
  if (!tag) return ''

  const childrenMd = () => node.childNodes.map(c => convertNode(c as HTMLElement, baseUrl, depth + 1)).join('')

  switch (tag) {
    case 'h1': case 'h2': case 'h3': case 'h4': case 'h5': case 'h6': {
      const level = '#'.repeat(Number(tag[1]))
      const text = node.text.replace(/\s+/g, ' ').trim()
      return text ? `\n\n${level} ${text}\n` : ''
    }
    case 'p': {
      const text = inlineContent(node, baseUrl, depth).trim()
      return text ? `\n\n${text}\n` : ''
    }
    case 'a': {
      const href = absolutize(node.getAttribute('href') || '', baseUrl)
      const text = node.text.replace(/\s+/g, ' ').trim() || href
      if (!href || href.startsWith('#') || href.startsWith('javascript:')) return text
      return `[${text}](${href})`
    }
    case 'img': {
      const src = absolutize(node.getAttribute('src') || node.getAttribute('data-src') || '', baseUrl)
      const alt = (node.getAttribute('alt') || '').replace(/[\[\]]/g, '')
      return src ? `![${alt}](${src})` : ''
    }
    case 'strong': case 'b': {
      const text = inlineContent(node, baseUrl, depth).trim()
      return text ? `**${text}**` : ''
    }
    case 'em': case 'i': {
      const text = inlineContent(node, baseUrl, depth).trim()
      return text ? `*${text}*` : ''
    }
    case 'code': {
      const text = node.textContent || ''
      return node.closest('pre') ? text : `\`${text}\``
    }
    case 'pre': {
      // node-html-parser 把 pre 内容保留为原始文本(内层 <code> 不会解析成元素)
      let raw = node.text || ''
      let lang = ''
      const wrap = raw.match(/^\s*<code\b([^>]*)>([\s\S]*)<\/code>\s*$/i)
      if (wrap) {
        raw = wrap[2]
        const lm = wrap[1].match(/(?:language|lang)-([\w+-]+)/)
        if (lm) lang = lm[1]
      }
      raw = raw
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
      return `\n\n\`\`\`${lang}\n${raw.replace(/\n+$/, '')}\n\`\`\`\n`
    }
    case 'blockquote': {
      const inner = childrenMd().trim()
      const quoted = inner.split('\n').map(l => (l.trim() ? `> ${l}` : '>')).join('\n')
      return `\n\n${quoted}\n`
    }
    case 'ul': case 'ol': {
      const items: string[] = []
      const listItems = node.querySelectorAll(':scope > li')
      listItems.forEach((li, i) => {
        const marker = tag === 'ol' ? `${i + 1}.` : '-'
        const inner = li.childNodes.map(c => convertNode(c as HTMLElement, baseUrl, depth + 1)).join('').replace(/\n{2,}/g, '\n').trim()
        items.push(inner ? `${marker} ${inner.replace(/\n/g, '\n  ')}` : '')
      })
      return items.length ? `\n\n${items.filter(Boolean).join('\n')}\n` : ''
    }
    case 'li': {
      // 被 ul/ol 处理;独立出现时退化为子节点文本
      return childrenMd().trim()
    }
    case 'table': {
      const rows = node.querySelectorAll('tr')
      if (!rows.length) return ''
      const lines: string[] = []
      rows.forEach((tr, idx) => {
        const cells = tr.querySelectorAll('th,td').map(td => escapeCell(inlineContent(td, baseUrl, depth)))
        lines.push(`| ${cells.join(' | ')} |`)
        if (idx === 0) lines.push(`|${cells.map(() => ' --- ').join('|')}|`)
      })
      return `\n\n${lines.join('\n')}\n`
    }
    case 'hr':
      return '\n\n---\n'
    case 'br':
      return '\n'
    case 'figure': case 'figcaption': {
      // 回归:曾误写 convertNode(node) 自递归导致爆栈,必须走 childrenMd()
      const inner = childrenMd().trim()
      return inner ? `\n\n${inner}\n` : ''
    }
    case 'video': case 'audio': case 'source': {
      const src = node.getAttribute('src') || node.querySelector('source')?.getAttribute('src') || ''
      return src ? `\n\n[视频/音频](${absolutize(src, baseUrl)})\n` : ''
    }
    default:
      return childrenMd()
  }
}

/** 行内内容(链接/加粗/代码等保留格式,纯文本折行) */
function inlineContent(node: HTMLElement, baseUrl: string, depth = 0): string {
  return node.childNodes.map(c => convertNode(c as HTMLElement, baseUrl, depth + 1)).join('').replace(/[ \t]+/g, ' ')
}

/**
 * 提取页面正文并转为 Markdown。
 * 选择文本量最大的候选容器;全部未命中时退回 body。
 */
export function extractMarkdown(html: string, baseUrl = ''): string {
  if (!html.trim()) return ''
  // 明显不是 HTML(可能本身就是 markdown 文本)
  if (!/<[a-z][\s\S]*>/i.test(html)) return html

  const root = parse(html)
  root.querySelectorAll(NOISE_SELECTORS).forEach(el => el.remove())

  let container: HTMLElement | null = null
  let bestLen = 0
  for (const sel of MAIN_CANDIDATES) {
    for (const el of root.querySelectorAll(sel)) {
      const len = (el.textContent || '').length
      if (len > bestLen) {
        bestLen = len
        container = el
      }
    }
  }
  if (!container || bestLen < 200) container = root.querySelector('body') || root

  let md = convertNode(container, baseUrl)
  md = md
    .replace(/\n{3,}/g, '\n\n')           // 折叠多余空行
    .replace(/\u00a0/g, ' ')              // nbsp
    .replace(/\[([^\]]*)\]\(\s*\)/g, '$1') // 空链接退化为文本
    .trim()
  return md
}
