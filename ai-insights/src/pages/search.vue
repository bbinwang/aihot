<script setup lang="ts">
import type { ArticleMeta } from '~~/server/utils/articles'

const route = useRoute()
const router = useRouter()
const input = ref(typeof route.query.q === 'string' ? route.query.q : '')
const q = computed(() => (typeof route.query.q === 'string' ? route.query.q : ''))

const { data, pending } = await useFetch<{ q: string; results: Array<ArticleMeta & { score: number }> }>('/api/search', {
  query: { q },
  immediate: !!q.value,
  watch: [q],
})

function submit() {
  const keyword = input.value.trim()
  if (keyword) router.push({ path: '/search', query: { q: keyword } })
}

useHead({ title: () => (q.value ? `搜索“${q.value}” · AIHot` : '搜索 · AIHot') })
</script>

<template>
  <div class="container">
    <h1 class="page-title">搜索</h1>
    <form class="search-form" @submit.prevent="submit">
      <input v-model="input" type="search" placeholder="输入关键词,搜索标题 / 标签 / 正文…" aria-label="搜索关键词" />
      <button class="btn" type="submit">搜索</button>
    </form>

    <template v-if="q">
      <p class="form-tip" style="margin-bottom: 18px">
        “{{ q }}” 共命中 {{ data?.results?.length ?? 0 }} 篇<span v-if="pending">(搜索中…)</span>
      </p>
      <div v-if="data?.results?.length" class="article-list">
        <ArticleCard v-for="a in data.results" :key="a.slug" :article="a" />
      </div>
      <p v-else-if="!pending" class="empty-tip">没有找到相关文章,换个关键词试试</p>
    </template>
    <p v-else class="empty-tip">输入关键词开始全文搜索</p>
  </div>
</template>
