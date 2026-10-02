<script setup lang="ts">
const route = useRoute()
const q = ref(typeof route.query.q === 'string' ? route.query.q : '')

function goSearch() {
  const keyword = q.value.trim()
  if (keyword) navigateTo({ path: '/search', query: { q: keyword } })
}
</script>

<template>
  <header class="app-header">
    <div class="container header-inner">
      <NuxtLink to="/" class="brand">
        <span class="brand-mark">AI</span>
        <span class="brand-text">Hot<span class="brand-dot">·</span>热点洞察</span>
      </NuxtLink>

      <nav class="nav">
        <NuxtLink to="/" class="nav-link" :class="{ active: route.path === '/' }">首页</NuxtLink>
        <NuxtLink to="/tags" class="nav-link" :class="{ active: route.path.startsWith('/tags') }">标签</NuxtLink>
        <NuxtLink to="/about" class="nav-link" :class="{ active: route.path === '/about' }">关于</NuxtLink>
        <NuxtLink to="/admin" class="nav-link admin-link">管理</NuxtLink>
      </nav>

      <div class="header-right">
        <div class="search-box">
          <input
            v-model="q"
            type="search"
            placeholder="搜索文章…"
            aria-label="搜索文章"
            @keyup.enter="goSearch"
          />
        </div>
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>
