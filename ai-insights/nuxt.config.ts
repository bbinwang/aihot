export default defineNuxtConfig({
  srcDir: 'src',
  compatibilityDate: '2025-07-15',
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'zh-CN' },
      title: 'AIHot · AI 热点洞察',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'AI 热点资讯与洞察:文章、标签、搜索、RSS' },
      ],
      link: [{ rel: 'alternate', type: 'application/rss+xml', title: 'AIHot RSS', href: '/rss.xml' }],
    },
  },
  nitro: {
    routeRules: {
      '/rss.xml': { headers: { 'content-type': 'application/rss+xml; charset=utf-8' } },
    },
    // P2 热点聚合:每天**北京时间 23:59:59** 运行一次(统一单管线,24h 窗口)。
    // 秒级 cron 在北京时区宿主机上准点触发;小时级兜底其他时区与错过的槽位
    // (Nitro cron 按宿主机时区触发,实际执行点由任务内 UTC+8 槽位门控保证;
    //  睡眠/停机错过由 plugins/aggregator-catchup.ts 启动补跑)
    experimental: { tasks: true },
    scheduledTasks: {
      '59 59 23 * * *': ['aggregator:run'],
      '0 * * * *': ['aggregator:run'],
    },
  },
})
