/**
 * 模型动态 —— 模型分类选项(管理台「模型动态」表单下拉 + 前台筛选 chips 共用)。
 * 客户端与服务端共享(纯常量,无服务端依赖);调整选项只需改这里。
 */
export const MODEL_CATEGORIES = [
  '大语言模型',
  '推理模型',
  '多模态模型',
  '图像生成',
  '视频生成',
  '三维重建',
  '语音模型',
  '编程模型',
  'Agent 模型',
  '嵌入模型',
  '开源权重',
  '端侧小模型',
  '决策模型',
] as const

export type ModelCategory = (typeof MODEL_CATEGORIES)[number]
