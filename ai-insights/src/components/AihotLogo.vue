<script setup lang="ts">
const emit = defineEmits<{ (e: 'wang'): void }>()
</script>

<!--
  aihot 品牌标志,参照设计稿 SVG(430×240 比例不变):
  aihot 字母 + 浅蓝双层圆环 O + 中线 + WANG
  字母用 currentColor 跟随明暗主题;点击 O 圆环召唤站宠小狗(替代原「汪」印章)
-->
<template>
  <svg
    class="aihot-logo"
    viewBox="0 0 430 240"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="aihot wang"
  >
    <!-- aihot 主体 -->
    <g fill="currentColor">
      <!-- A -->
      <path d="M30 110 L75 25 L120 110 L100 110 L75 55 L50 110 Z" />
      <rect x="60" y="80" width="30" height="8" />
      <!-- I -->
      <rect x="140" y="25" width="18" height="85" />
      <rect x="135" y="25" width="28" height="10" />
      <rect x="135" y="100" width="28" height="10" />
      <!-- H -->
      <rect x="180" y="25" width="16" height="85" />
      <rect x="230" y="25" width="16" height="85" />
      <rect x="180" y="60" width="66" height="14" />
      <!-- T -->
      <rect x="350" y="25" width="60" height="14" />
      <rect x="373" y="25" width="14" height="85" />
    </g>

    <!-- O 浅蓝色双层圆环:点我召唤小狗 🐕 -->
    <g class="logo-o" @click.stop.prevent="emit('wang')">
      <title>汪!点我召唤小狗 🐕</title>
      <circle cx="300" cy="67" r="40" fill="none" stroke="#38BDF8" stroke-width="12" />
      <circle cx="300" cy="67" r="18" fill="none" stroke="#7DD3FC" stroke-width="6" />
    </g>

    <!-- 中线 -->
    <line class="logo-divider" x1="30" y1="140" x2="410" y2="140" stroke-width="2" />

    <!-- wang:几何单线字形,严格铺满 x=30→410,与 aihot 像素级等宽 -->
    <g class="logo-wang" fill="none" stroke="currentColor" stroke-width="8">
      <!-- W -->
      <path d="M34 168 L55.5 196 L73 173 L90.5 196 L109 168" />
      <!-- A -->
      <path d="M133 196 L170.5 168 L208 196" />
      <path d="M149 186 L192 186" />
      <!-- N -->
      <path d="M232 196 L232 168 L307 196 L307 168" />
      <!-- G:圆角开口 + 横杠 -->
      <path d="M379 182 L406 182 A14 14 0 0 1 392 196 L345 196 A14 14 0 0 1 331 182 A14 14 0 0 1 345 168 L385 168" />
    </g>
  </svg>
</template>
