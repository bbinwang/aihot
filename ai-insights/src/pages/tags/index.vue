<script setup lang="ts">
const { data: tags } = await useFetch<Array<{ tag: string; count: number }>>('/api/tags')

useHead({ title: '标签 · AIHot' })
</script>

<template>
  <div class="container">
    <h1 class="page-title">全部标签 <small>{{ tags?.length ?? 0 }} 个</small></h1>
    <div v-if="tags?.length" class="tag-cloud">
      <NuxtLink v-for="t in tags" :key="t.tag" :to="`/tags/${encodeURIComponent(t.tag)}`" class="tag-cloud-item">
        <span>#{{ t.tag }}</span><span class="tag-count">{{ t.count }} 篇</span>
      </NuxtLink>
    </div>
    <p v-else class="empty-tip">暂无标签</p>
  </div>
</template>
