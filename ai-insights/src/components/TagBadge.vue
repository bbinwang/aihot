<script setup lang="ts">
defineProps<{ tag: string }>()
</script>

<template>
  <NuxtLink :to="`/tags/${encodeURIComponent(tag)}`" class="tag-badge">#{{ tag }}</NuxtLink>
</template>
