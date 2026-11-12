<script setup lang="ts">
// aihot.汪 站宠:驻扎在品牌右侧,跟随用户行为切换状态,激励阅读
type Mood = 'rest' | 'reading' | 'thinking' | 'confused'

const MOOD_LABEL: Record<Mood, string> = {
  rest: '休息中',
  reading: '努力阅读中',
  thinking: '沉思中',
  confused: '学习中,有点困惑',
}

const THINK_WORDS = ['嗯…有点意思', '让我想想…', '有道理!', '嗯嗯,继续读']
const CONFUSED_WORDS = ['汪?这段好难…', '这里没看懂…', '汪呜,好绕啊', '要不要重读一遍?']
const REST_WORDS = ['在找好文章吗?', '今天读点啥?', '汪~', '点开文章一起读!']

const route = useRoute()
const mood = ref<Mood>('rest')
const petting = ref(false)
const drowsy = ref(false)
const bones = ref(0)
const bubble = ref<{ text: string; id: number } | null>(null)
const hearts = ref<{ id: number; dx: number }[]>([])

let bubbleId = 0
let heartId = 0
let bubbleTimer: ReturnType<typeof setTimeout> | null = null
let tickTimer: ReturnType<typeof setInterval> | null = null

// 阅读跟踪
let inArticle = false
let readSeconds = 0
let maxDepth = 0
let flips: number[] = []
let lastScrollY = 0
let confusedAt = 0
let lastActivity = Date.now()
let lastCurious = 0

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!
}

const bubbleBox = ref<HTMLElement | null>(null)
const bubbleTextEl = ref<HTMLElement | null>(null)
const marquee = ref(false)
const mqShift = ref('-120px')
const mqDur = ref('6s')

function say(text: string, ms = 3000) {
  bubbleId++
  bubble.value = { text, id: bubbleId }
  marquee.value = false
  if (bubbleTimer) clearTimeout(bubbleTimer)
  if (typeof window === 'undefined') return // SSR:无定时器、不测宽
  nextTick(() => {
    const box = bubbleBox.value
    const txt = bubbleTextEl.value
    if (box && txt) {
      // 气泡绝不越出屏幕右缘:按实际位置钳宽
      const left = box.getBoundingClientRect().left
      const avail = Math.round(window.innerWidth - left - 8)
      if (avail > 60 && box.getBoundingClientRect().width > avail) {
        box.style.maxWidth = `${avail}px`
      }
      // 空间不够 → 跑马灯横向滚动展示完整文字
      const overflow = txt.scrollWidth - box.clientWidth
      if (overflow > 4) {
        marquee.value = true
        mqShift.value = `-${overflow + 8}px`
        const dur = Math.max(3, (overflow + 8) / 24) // ~24px/s
        mqDur.value = `${dur.toFixed(1)}s`
        ms = Math.max(ms, (dur * 2 + 1.6) * 1000) // 至少来回滚一遍
      }
    }
    const id = bubbleId
    bubbleTimer = setTimeout(() => {
      if (bubble.value?.id === id) bubble.value = null
    }, ms)
  })
}

function spawnHearts(n: number) {
  for (let i = 0; i < n; i++) {
    const id = heartId++
    const dx = 4 + Math.random() * 40
    hearts.value.push({ id, dx })
    setTimeout(() => {
      hearts.value = hearts.value.filter(h => h.id !== id)
    }, 1200)
  }
}

function pet() {
  petting.value = true
  say(pick(['汪汪!♡', '汪~♡', '(蹭蹭)', '汪!']), 2000)
  spawnHearts(3)
  setTimeout(() => { petting.value = false }, 1100)
}

function celebrate(text: string) {
  petting.value = true
  say(text, 3500)
  spawnHearts(6)
  setTimeout(() => { petting.value = false }, 1300)
}

function readDepth() {
  const total = document.documentElement.scrollHeight - window.innerHeight
  return total > 0 ? Math.min(1, window.scrollY / total) : 1
}

function maybeCurious() {
  if (petting.value || bubble.value) return // 不打断庆祝/对话
  if (Date.now() - lastCurious > 45_000 && Math.random() < 0.3) {
    lastCurious = Date.now()
    say(pick(REST_WORDS), 2200)
  }
}

// 换向检测:平滑滚动/触控板产生大量小位移事件,
// 按方向行程累积(同向累计≥180px 记一段,方向反转时记一次换向)
let runDir = 0
let runDist = 0

function registerFlip() {
  flips.push(Date.now())
  flips = flips.filter(t => Date.now() - t < 30_000)
  if (flips.length >= 4 && mood.value !== 'confused' && inArticle) {
    mood.value = 'confused'
    confusedAt = Date.now()
    say(pick(CONFUSED_WORDS))
  }
}

function onScroll() {
  lastActivity = Date.now()
  drowsy.value = false
  const dy = window.scrollY - lastScrollY
  lastScrollY = window.scrollY

  if (!inArticle) {
    maybeCurious()
    return
  }
  maxDepth = Math.max(maxDepth, readDepth())

  if (Math.abs(dy) < 2) return // 抖动噪声
  const dir = Math.sign(dy)
  if (dir === runDir) {
    runDist += Math.abs(dy)
  } else {
    if (runDir !== 0 && runDist >= 180) registerFlip()
    runDir = dir
    runDist = Math.abs(dy)
  }
}

function enterArticle() {
  inArticle = true
  readSeconds = 0
  maxDepth = 0
  flips = []
  runDir = 0
  runDist = 0
  lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0
  drowsy.value = false
  mood.value = 'reading'
  say('一起读这篇!📖')
}

function settleArticle() {
  if (!inArticle) return
  inArticle = false
  if (maxDepth >= 0.85) {
    bones.value++
    try { localStorage.setItem('dog-bones', String(bones.value)) } catch {}
    celebrate(bones.value > 0 && bones.value % 5 === 0
      ? `汪!已经啃了 ${bones.value} 根骨头啦!🎉`
      : `汪!啃完一根骨头🦴(共 ${bones.value} 根)`)
  } else if (maxDepth >= 0.5) {
    say('读了大半,就差一点!', 2600)
  }
}

watch(() => /^\/articles\//.test(route.path), (now, was) => {
  if (was) settleArticle()
  if (now) enterArticle()
  else mood.value = 'rest'
}, { immediate: true })

onMounted(() => {
  try { bones.value = parseInt(localStorage.getItem('dog-bones') || '0', 10) || 0 } catch {}
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('dog:summon', () => celebrate('汪汪!你来啦!'))

  tickTimer = setInterval(() => {
    if (document.hidden) return
    if (inArticle) {
      readSeconds++
      // 每 3 分钟播报一次陪伴时长
      if (readSeconds >= 180 && readSeconds % 180 === 0) {
        say(`已陪你读 ${readSeconds / 60} 分钟啦`)
      }
      if (mood.value === 'reading' && (maxDepth >= 0.5 || readSeconds >= 45)) {
        mood.value = 'thinking'
        say(pick(THINK_WORDS))
      } else if (mood.value === 'confused') {
        // 困惑后 25 秒内没再反复滚动 → 回到沉思
        const recentFlips = flips.filter(t => Date.now() - t < 25_000).length
        if (Date.now() - confusedAt > 25_000 && recentFlips === 0) {
          mood.value = 'thinking'
          say('嗯,再想想…')
        }
      }
    } else if (mood.value === 'rest' && Date.now() - lastActivity > 60_000) {
      drowsy.value = true
    }
  }, 1000)
})

onBeforeUnmount(() => {
  if (tickTimer) clearInterval(tickTimer)
  if (bubbleTimer) clearTimeout(bubbleTimer)
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div
    class="dog-badge"
    :class="[mood, { petting, drowsy }]"
    :title="`小狗状态:${MOOD_LABEL[mood]}`"
    role="img"
    :aria-label="`桌宠小狗,当前${MOOD_LABEL[mood]}`"
    @click="pet"
  >
    <svg viewBox="0 0 76 58" class="dog-face" aria-hidden="true">
      <!-- 耳朵 -->
      <path d="M22 16 L15 2 L36 10 Z" fill="#efa15f" />
      <path d="M25 14 L20.5 4.5 L33 10.5 Z" fill="#f6c6b8" />
      <path d="M54 16 L61 2 L40 10 Z" fill="#efa15f" />
      <path d="M51 14 L55.5 4.5 L43 10.5 Z" fill="#f6c6b8" />
      <!-- 头 -->
      <circle cx="38" cy="32" r="24" fill="#efa15f" />
      <ellipse cx="38" cy="42" rx="15" ry="11" fill="#fff6ec" />
      <ellipse cx="20" cy="40" rx="4.5" ry="2.8" fill="#f4a09a" opacity=".55" />
      <ellipse cx="56" cy="40" rx="4.5" ry="2.8" fill="#f4a09a" opacity=".55" />

      <!-- 眼睛:常态(会眨眼) -->
      <g class="eyes-open">
        <ellipse class="eye" cx="28" cy="31" rx="2.6" ry="3.4" fill="#4a2f23" />
        <ellipse class="eye" cx="48" cy="31" rx="2.6" ry="3.4" fill="#4a2f23" />
        <circle cx="29" cy="29.8" r=".9" fill="#fff" />
        <circle cx="49" cy="29.8" r=".9" fill="#fff" />
      </g>
      <!-- 眼睛:打盹 ∪ -->
      <g class="eyes-sleep" fill="none" stroke="#4a2f23" stroke-width="1.8" stroke-linecap="round">
        <path d="M24 32 q4 3.4 8 0" />
        <path d="M44 32 q4 3.4 8 0" />
      </g>
      <!-- 眼睛:开心 ∩ -->
      <g class="eyes-happy" fill="none" stroke="#4a2f23" stroke-width="1.8" stroke-linecap="round">
        <path d="M24 33 q4 -4.2 8 0" />
        <path d="M44 33 q4 -4.2 8 0" />
      </g>
      <!-- 困惑皱眉 -->
      <g class="brows" fill="none" stroke="#4a2f23" stroke-width="1.6" stroke-linecap="round">
        <path d="M23 26 l8 2.4" />
        <path d="M53 26 l-8 2.4" />
      </g>

      <!-- 鼻子 + 嘴 -->
      <ellipse cx="38" cy="38" rx="3.6" ry="2.7" fill="#4a2f23" />
      <path d="M38 40.7 v1.6 M38 42.3 q-3 3 -6.5 1 M38 42.3 q3 3 6.5 1" fill="none" stroke="#4a2f23" stroke-width="1.5" stroke-linecap="round" />

      <!-- 努力阅读:眼镜 -->
      <g class="glasses" fill="none" stroke="#4a2f23" stroke-width="1.8" stroke-linecap="round">
        <circle cx="28" cy="31" r="6.8" />
        <circle cx="48" cy="31" r="6.8" />
        <path d="M34.8 31 h6.4 M21.2 29.5 L15.5 27 M54.8 29.5 L60.5 27" />
      </g>

      <!-- 沉思:思考泡泡 -->
      <g class="think-dots">
        <circle class="td" cx="58" cy="13" r="1.8" />
        <circle class="td" cx="64" cy="7.5" r="2.4" />
        <circle class="td" cx="71" cy="2" r="3" />
      </g>

      <!-- 困惑:问号 + 汗滴 -->
      <text class="qmark" x="63" y="17" text-anchor="middle">?</text>
      <path class="sweat" d="M12.5 15 c2.4 3.6 2.4 5.8 0 7 c-2.4 -1.2 -2.4 -3.4 0 -7 Z" fill="#86c9f5" />

      <!-- 打盹:Z z z -->
      <g class="zzz">
        <text x="57" y="15" >z</text>
        <text x="63" y="9">z</text>
        <text x="70" y="3">Z</text>
      </g>
    </svg>

    <span v-if="bones > 0" class="bones" title="读完的文章数">🦴×{{ bones }}</span>
    <div
      v-if="bubble"
      :key="bubble.id"
      ref="bubbleBox"
      class="mood-bubble"
      :class="{ marquee }"
      :style="{ '--mq-shift': mqShift, '--mq-dur': mqDur }"
    ><span ref="bubbleTextEl" class="bubble-text">{{ bubble.text }}</span></div>
    <span v-for="h in hearts" :key="h.id" class="heart" :style="{ left: h.dx + 'px' }">💗</span>
  </div>
</template>

<style scoped>
.dog-badge {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.dog-face {
  width: 50px;
  height: 38px;
  display: block;
  transition: transform .2s ease;
}
.dog-badge:active .dog-face { transform: scale(.9); }

/* 姿态:阅读前倾 / 沉思歪头 / 困惑歪向另一边 */
.dog-badge.reading .dog-face { transform: translateY(1.5px); }
.dog-badge.thinking .dog-face { transform: rotate(-4deg); }
.dog-badge.confused .dog-face { transform: rotate(3deg); }

/* 眨眼 */
.eye { transform-box: fill-box; transform-origin: center; animation: blink 4.2s infinite; }

/* 眼神切换 */
.dog-badge.petting .eyes-open, .dog-badge.drowsy .eyes-open { display: none; }
.dog-badge:not(.petting) .eyes-happy { display: none; }
.dog-badge:not(.drowsy) .eyes-sleep { display: none; }

/* 装饰显隐 */
.glasses, .think-dots, .qmark, .sweat, .brows, .zzz { display: none; }
.dog-badge.reading .glasses { display: block; }
.dog-badge.thinking .think-dots { display: block; }
.dog-badge.confused .qmark, .dog-badge.confused .sweat, .dog-badge.confused .brows { display: block; }
.dog-badge.drowsy .zzz { display: block; }

/* 思考泡泡:依次上浮 */
.think-dots .td { fill: #a89a89; transform-box: fill-box; animation: tdots 1.6s ease-in-out infinite; }
.think-dots .td:nth-child(1) { animation-delay: 0s; }
.think-dots .td:nth-child(2) { animation-delay: .22s; }
.think-dots .td:nth-child(3) { animation-delay: .44s; }

/* 问号摇摆 */
.qmark {
  font-size: 15px;
  font-weight: 700;
  font-family: inherit;
  fill: var(--accent);
  transform-box: fill-box;
  transform-origin: center;
  animation: qshake 1s ease-in-out infinite;
}

/* 汗滴滑落 */
.sweat { transform-box: fill-box; animation: sweat 2.2s ease-in infinite; }

/* Zzz 浮动 */
.zzz text { font-size: 9px; font-weight: 700; font-family: inherit; fill: #a89a89; transform-box: fill-box; animation: zfloat 2.4s ease-in-out infinite; }
.zzz text:nth-child(2) { font-size: 11px; animation-delay: .3s; }
.zzz text:nth-child(3) { font-size: 13px; animation-delay: .6s; }

/* 打盹呼吸 */
.dog-badge.drowsy .dog-face { animation: breath 3.2s ease-in-out infinite; }
.dog-badge.petting .dog-face { animation: bounce .5s ease 2; }

/* 骨头徽章 */
.bones {
  position: absolute;
  bottom: -4px;
  right: -6px;
  font-size: 10px;
  line-height: 1;
  padding: 3px 6px;
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--text-2);
  white-space: nowrap;
}

/* 状态气泡:在狗右侧横向弹出,带左指小三角 */
.mood-bubble {
  position: absolute;
  left: calc(100% + 10px);
  top: 50%;
  transform: translateY(-50%);
  max-width: min(300px, 30vw);
  padding: 4px 10px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--bg-card);
  color: var(--text);
  font-size: 12px;
  white-space: nowrap;
  box-shadow: var(--shadow);
  animation: popSide .18s ease;
  z-index: 60;
  pointer-events: none; /* 纯展示,不挡下层元素点击 */
}
/* 小三角(左侧指向狗) */
.mood-bubble::before {
  content: '';
  position: absolute;
  left: -5px;
  top: 50%;
  margin-top: -4.5px;
  width: 8px;
  height: 8px;
  background: var(--bg-card);
  border-left: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  transform: rotate(45deg);
}
.bubble-text { display: inline-block; white-space: nowrap; }
/* 空间不够:跑马灯来回滚动 */
.mood-bubble.marquee { overflow: hidden; }
.mood-bubble.marquee .bubble-text {
  animation: mqMove var(--mq-dur, 6s) ease-in-out infinite alternate;
}

/* 心心 */
.heart {
  position: absolute;
  bottom: 30px;
  font-size: 12px;
  pointer-events: none;
  animation: heartFloat 1.1s ease-out forwards;
}

/* 手机:狗小一点,排在品牌后;气泡右侧空间更窄,更多依赖跑马灯 */
@media (max-width: 720px) {
  .dog-badge { order: 1; }
  .dog-face { width: 42px; height: 32px; }
  .mood-bubble { max-width: 40vw; }
}
@media (max-width: 360px) {
  .dog-face { width: 36px; height: 27px; }
}

@keyframes blink { 0%, 91%, 100% { transform: scaleY(1); } 94% { transform: scaleY(.1); } }
@keyframes tdots { 0%, 100% { opacity: .25; transform: translateY(0); } 50% { opacity: 1; transform: translateY(-2.5px); } }
@keyframes qshake { 0%, 100% { transform: rotate(-8deg); } 50% { transform: rotate(8deg); } }
@keyframes sweat { 0% { opacity: 0; transform: translateY(-2px); } 30% { opacity: 1; } 100% { opacity: 0; transform: translateY(5px); } }
@keyframes zfloat { 0%, 100% { opacity: .4; transform: translateY(0); } 50% { opacity: 1; transform: translateY(-2.5px); } }
@keyframes breath { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(1.05); } }
@keyframes bounce { 0%, 100% { transform: translateY(0); } 40% { transform: translateY(-8px); } }
@keyframes popSide {
  from { transform: translateY(-50%) scale(.6); opacity: 0; }
  to { transform: translateY(-50%) scale(1); opacity: 1; }
}
@keyframes mqMove {
  from { transform: translateX(0); }
  to { transform: translateX(var(--mq-shift, -120px)); }
}
@keyframes heartFloat {
  from { opacity: 1; transform: translateY(0) scale(.7); }
  to { opacity: 0; transform: translateY(-40px) scale(1.15); }
}
/* 减少动态效果偏好:跑马灯改为静态换行展示完整文字 */
@media (prefers-reduced-motion: reduce) {
  .dog-face, .dog-face * { animation: none !important; }
  .mood-bubble.marquee .bubble-text { animation: none !important; }
  .mood-bubble.marquee { white-space: normal; max-width: 46vw; }
}
</style>
