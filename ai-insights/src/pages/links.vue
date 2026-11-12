<script setup lang="ts">
import { resourceSites } from '~/data/resources'

useHead({ title: '热链 · AIHot汪' })

/** 取名字首个字符作头像字 */
function initial(name: string) {
  return name.trim().charAt(0).toUpperCase()
}

/** 由名字确定性挑一个头像配色,同名永远同色 */
function colorIndex(name: string) {
  let hash = 0
  for (const ch of name) hash = (hash * 31 + ch.codePointAt(0)!) >>> 0
  return hash % 8
}

/** 展示域名,如 zhangxiaojun.qiaomu.ai */
function host(url: string) {
  try {
    return new URL(url).host
  }
  catch {
    return url
  }
}

const total = computed(() => resourceSites.reduce((n, s) => n + s.links.length, 0))
</script>

<template>
  <div class="container">
    <h1 class="page-title">热链 <small>共 {{ total }} 个精选外链</small></h1>
    <p class="links-intro">热门资源与资讯站点导航——好内容值得被看见,点击卡片直达原文站点。</p>

    <section v-for="site in resourceSites" :key="site.id" class="res-group">
      <div class="res-group-head">
        <h2 class="res-group-title">{{ site.name }}</h2>
        <span v-if="site.tagline" class="res-group-tag">{{ site.tagline }}</span>
        <a
          v-if="site.homepage"
          :href="site.homepage"
          target="_blank"
          rel="noopener noreferrer"
          class="res-group-home"
        >站点主页 ↗</a>
      </div>
      <p v-if="site.description" class="res-group-desc">{{ site.description }}</p>

      <div class="res-grid">
        <a
          v-for="link in site.links"
          :key="link.url"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="res-card"
        >
          <span class="res-avatar" :class="`res-a${colorIndex(link.name)}`">{{ initial(link.name) }}</span>
          <span class="res-body">
            <span class="res-name">{{ link.name }} <span class="res-ext">↗</span></span>
            <span v-if="link.description" class="res-desc">{{ link.description }}</span>
            <span class="res-host">{{ host(link.url) }}</span>
          </span>
        </a>
      </div>
    </section>

    <p class="links-more">🚀 更多好站点陆续收录中</p>
  </div>
</template>
