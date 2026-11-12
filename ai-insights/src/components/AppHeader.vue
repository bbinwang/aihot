<script setup lang="ts">
const route = useRoute()
const q = ref(typeof route.query.q === 'string' ? route.query.q : '')

const links = [
  { to: '/', label: '首页', exact: true },
  { to: '/models', label: '模型动态' },
  { to: '/links', label: '热链' },
  { to: '/tags', label: '标签' },
  { to: '/about', label: '关于' },
  { to: '/admin', label: '管理', admin: true },
]

function isActive(link: { to: string; exact?: boolean }) {
  return link.exact ? route.path === link.to : route.path.startsWith(link.to)
}

function goSearch() {
  const keyword = q.value.trim()
  if (keyword) navigateTo({ path: '/search', query: { q: keyword } })
}

function summonDog() {
  window.dispatchEvent(new CustomEvent('dog:summon'))
}
</script>

<template>
  <header class="app-header">
    <div class="container header-inner">
      <div class="brand-zone">
        <NuxtLink to="/" class="brand" aria-label="AIHot 首页">
          <AihotLogo @wang="summonDog" />
        </NuxtLink>
        <DogPet />
      </div>

      <nav class="nav">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="nav-link"
          :class="{ active: isActive(link), 'admin-link': link.admin }"
        >{{ link.label }}</NuxtLink>
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
