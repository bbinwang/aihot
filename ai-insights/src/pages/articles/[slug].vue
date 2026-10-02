<script setup lang="ts">
import type { ArticleDetail } from '~~/server/utils/articles'
import { formatDate } from '~/utils/format'

const route = useRoute()

const { data: article, error } = await useFetch<ArticleDetail>(`/api/articles/${route.params.slug}`)

if (error.value || !article.value) {
  throw createError({ statusCode: 404, statusMessage: '文章不存在', fatal: true })
}

useHead({ title: () => `${article.value?.title ?? '文章'} · AIHot` })
</script>

<template>
  <div class="container" v-if="article">
    <header class="article-header">
      <h1 class="article-title">{{ article.title }}</h1>
      <div class="article-meta">
        <span>📅 {{ formatDate(article.date) }}</span>
        <span>⏱ {{ article.readingMinutes }} 分钟阅读</span>
        <div class="card-tags">
          <TagBadge v-for="t in article.tags" :key="t" :tag="t" />
        </div>
      </div>
    </header>
    <!-- 内容由管理后台上传,服务端 marked 渲染 -->
    <div class="markdown-body" v-html="article.html" />
  </div>
</template>
