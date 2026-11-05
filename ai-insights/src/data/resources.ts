/**
 * 热链(Hot Links)—— 精选外部资源与资讯站点导航
 *
 * 数据结构:每个「资源站点」(ResourceSite)是一组相关外链的集合,
 * 后续新增站点时在 resourceSites 数组里追加即可。
 */

export interface ResourceLink {
  /** 展示名 */
  name: string
  /** 外链地址(https) */
  url: string
  /** 一句话简介 */
  description?: string
}

export interface ResourceSite {
  /** 站点唯一 id */
  id: string
  /** 站点名(资源组标题) */
  name: string
  /** 短标签,如域名 */
  tagline?: string
  /** 站点介绍 */
  description?: string
  /** 站点主页(可选) */
  homepage?: string
  links: ResourceLink[]
}

export const resourceSites: ResourceSite[] = [
  {
    id: 'qiaomu-podcast',
    name: '向阳乔木 · 播客精读站',
    tagline: 'qiaomu.ai',
    description:
      '向阳乔木出品的中文播客 AI 精读站,把热门播客节目整理成可读、可检索的精读笔记,用"读"的方式消化每一期干货。',
    homepage: 'https://qiaomu.ai',
    links: [
      {
        name: '张小珺商业访谈录',
        url: 'https://zhangxiaojun.qiaomu.ai',
        description: '科技与商业人物深度访谈',
      },
      {
        name: '42章经',
        url: 'https://42zhangjing.qiaomu.ai',
        description: '创投与商业的深度思考',
      },
      {
        name: '晚点聊 LateTalk',
        url: 'https://latetalk.qiaomu.ai',
        description: '《晚点》团队的科技商业对话',
      },
      {
        name: '十字路口 Crossing',
        url: 'https://crossing.qiaomu.ai',
        description: 'AI 变局中的人物与行业观察',
      },
      {
        name: 'AI炼金术',
        url: 'https://aialchemy.qiaomu.ai',
        description: 'AI 领域的深度对谈',
      },
      {
        name: '三五环',
        url: 'https://35huan.qiaomu.ai',
        description: '互联网、产品与行业观察',
      },
      {
        name: '知行小酒馆',
        url: 'https://zhixing.qiaomu.ai',
        description: '有知有行出品,聊聊投资与生活',
      },
      {
        name: '面基',
        url: 'https://mianji.qiaomu.ai',
        description: '投资理财与个人成长话题',
      },
    ],
  },
]
