<script setup lang="ts">
const props = defineProps<{ page: number; pageSize: number; total: number }>()

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))

function pageLink(p: number) {
  return p === 1 ? { path: '/', query: {} } : { path: '/', query: { page: String(p) } }
}
</script>

<template>
  <nav v-if="totalPages > 1" class="pagination" aria-label="分页">
    <NuxtLink
      v-if="page > 1"
      :to="pageLink(page - 1)"
      class="page-btn"
    >‹ 上一页</NuxtLink>
    <span class="page-info">第 {{ page }} / {{ totalPages }} 页 · 共 {{ total }} 篇</span>
    <NuxtLink
      v-if="page < totalPages"
      :to="pageLink(page + 1)"
      class="page-btn"
    >下一页 ›</NuxtLink>
  </nav>
</template>
