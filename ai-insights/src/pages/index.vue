<script setup lang="ts">
import type { ArticleMeta } from '~~/server/utils/articles'

const route = useRoute()
const page = computed(() => Math.max(1, Number.parseInt(String(route.query.page || '1'), 10) || 1))

const { data } = await useFetch<{ total: number; page: number; pageSize: number; items: ArticleMeta[] }>('/api/articles', {
  query: { page, pageSize: 10 },
})

useHead({ title: 'AIHot · AI 热点洞察' })
</script>

<template>
  <div class="container">
    <h1 class="page-title">最新文章 <small>共 {{ data?.total ?? 0 }} 篇</small></h1>
    <div v-if="data?.items?.length" class="article-list">
      <ArticleCard v-for="a in data.items" :key="a.slug" :article="a" />
    </div>
    <p v-else class="empty-tip">还没有文章,去<a href="/admin" style="color: var(--accent)">管理控制台</a>上传第一篇吧</p>
    <Pagination v-if="data" :page="data.page" :page-size="data.pageSize" :total="data.total" />
  </div>
</template>
