<script setup lang="ts">
import type { ArticleMeta } from '~~/server/utils/articles'
import { formatDate } from '~/utils/format'

defineProps<{ article: ArticleMeta }>()
</script>

<template>
  <article class="article-card">
    <NuxtLink :to="`/articles/${article.slug}`" class="card-title">{{ article.title }}</NuxtLink>
    <p class="card-summary">{{ article.summary }}</p>
    <div class="card-meta">
      <span class="card-date">{{ formatDate(article.date) }}</span>
      <span class="card-reading">{{ article.readingMinutes }} 分钟阅读</span>
      <div class="card-tags">
        <TagBadge v-for="t in article.tags" :key="t" :tag="t" />
      </div>
    </div>
  </article>
</template>
