import { useAtomValue } from "jotai"

import { appStateStore } from "~store"

export const i18n = {
  "zh-CN": {
    search: "搜索",
    setting: "设置",
    login: "登录",
    copySuccess: "复制成功 🎉",
    getStateFailed: "获取状态失败",
    saveStateFailed: "保存状态失败",
    failedToPreview: "暂无预览数据 🙃",
    inactive: "休眠中",
    menuAll: "全部",
    menuDomain: "域名",
    menuWindow: "窗口",
    menuAudible: "声音",
    menuVisitAnalysis: "访问分析",
    menuStatus: "状态",
    pinned: "已固定",
    incognito: "隐身模式",
    changeToZH: "切换到中文",
    changeToEN: "切换到英文",
    analysisTitle: "访问统计数据，哪个网站是你的最爱？",
    analysisXLabel: "网站",
    analysisYLabel: "访问次数"
  },
  en: {
    search: "Search",
    setting: "Setting",
    login: "Login",
    copySuccess: "Copy Success 🎉",
    getStateFailed: "Failed to get state",
    saveStateFailed: "Failed to save state",
    failedToPreview: "Failed to preview now 🙃",
    inactive: "Inactive",
    menuAll: "All",
    menuDomain: "Domain",
    menuWindow: "Window",
    menuAudible: "Audible",
    menuVisitAnalysis: "Visit Analysis",
    menuStatus: "Status",
    pinned: "Pinned",
    incognito: "Incognito",
    changeToZH: "Change to Chinese",
    changeToEN: "Change to English",
    analysisTitle: "Visit statistics, which website is your favorite?",
    analysisXLabel: "Website",
    analysisYLabel: "Visit Times"
  }
}

export const getI18nByKey = (key: keyof (typeof i18n)["zh-CN"]) => {
  const appState = useAtomValue(appStateStore)
  return (
    i18n?.[appState.language]?.[key] ??
    "Sorry, the translation is not available."
  )
}
