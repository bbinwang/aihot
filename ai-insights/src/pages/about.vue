<script setup lang="ts">
useHead({ title: '关于 · AIHot' })
</script>

<template>
  <div class="container">
    <h1 class="page-title">关于 AIHot</h1>
    <div class="markdown-body">
      <p>AIHot 是一个 AI 热点资讯与洞察分享站点。</p>
      <ul>
        <li>文章以 Markdown 存储,支持在 <a href="/admin">管理控制台</a> 直接上传</li>
        <li>支持标签分类、全文搜索、RSS 订阅与暗色模式</li>
      </ul>
      <p>技术栈:Nuxt 3 + Nitro + marked + gray-matter。</p>
    </div>
  </div>
</template>
