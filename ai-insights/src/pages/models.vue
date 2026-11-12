<script setup lang="ts">
import type { ModelUpdate } from '~~/server/utils/modelUpdates'
import { formatDate } from '~/utils/format'

useHead({ title: '模型动态 · AIHot汪' })

const { data } = await useFetch<{ items: ModelUpdate[]; total: number }>('/api/models')

const activeCategory = ref('')

/** 前台按分类过滤(保持 chips 基于全量数据稳定展示) */
const filtered = computed(() => {
  const all = data.value?.items || []
  return activeCategory.value ? all.filter(it => it.category === activeCategory.value) : all
})

/** 筛选 chips:全部 + 数据中实际出现的分类(按数量倒序) */
const categories = computed(() => {
  const count = new Map<string, number>()
  for (const it of data.value?.items || []) count.set(it.category, (count.get(it.category) || 0) + 1)
  return [...count.entries()].sort((a, b) => b[1] - a[1]).map(([c]) => c)
})

function host(url: string) {
  try {
    return new URL(url).host
  } catch {
    return url
  }
}
</script>

<template>
  <div class="container">
    <h1 class="page-title">模型动态 <small>共 {{ data?.total ?? 0 }} 条</small></h1>
    <p class="links-intro">模型发布与更新一览——点击卡片直达信源原文。</p>

    <div class="model-filter">
      <button class="model-chip" :class="{ on: !activeCategory }" @click="activeCategory = ''">全部</button>
      <button
        v-for="c in categories"
        :key="c"
        class="model-chip"
        :class="{ on: activeCategory === c }"
        @click="activeCategory = c"
      >{{ c }}</button>
    </div>

    <div v-if="filtered.length" class="model-list">
      <a
        v-for="m in filtered"
        :key="m.id"
        :href="m.sourceUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="model-card"
      >
        <div class="model-card-head">
          <span class="model-title">{{ m.title }} <span class="res-ext">↗</span></span>
          <span class="tag-badge">{{ m.category }}</span>
        </div>
        <p v-if="m.description" class="model-desc">{{ m.description }}</p>
        <div class="card-meta">
          <span>{{ host(m.sourceUrl) }}</span>
          <span>{{ formatDate(m.date) }}</span>
        </div>
      </a>
    </div>
    <p v-else class="empty-tip">还没有模型动态,去<a href="/admin" style="color: var(--accent)">管理控制台</a>添加第一条吧</p>
  </div>
</template>
