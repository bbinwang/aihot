<script setup lang="ts">
import type { ArticleMeta } from '~~/server/utils/articles'

const route = useRoute()
const tag = computed(() => decodeURIComponent(String(route.params.tag)))

const { data } = await useFetch<{ total: number; items: ArticleMeta[] }>('/api/articles', {
  query: { tag, pageSize: 50 },
})

useHead({ title: () => `#${tag.value} · AIHot` })
</script>

<template>
  <div class="container">
    <h1 class="page-title">#{{ tag }} <small>{{ data?.total ?? 0 }} 篇</small></h1>
    <div v-if="data?.items?.length" class="article-list">
      <ArticleCard v-for="a in data.items" :key="a.slug" :article="a" />
    </div>
    <p v-else class="empty-tip">该标签下暂无文章</p>
    <p style="margin-top: 24px"><NuxtLink to="/tags" style="color: var(--accent)">← 全部标签</NuxtLink></p>
  </div>
</template>
