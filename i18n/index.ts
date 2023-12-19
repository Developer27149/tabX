import { useAtomValue } from "jotai"

import { appPersistentConfig } from "~store"

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
    menuRobot: "AI 辅助",
    pinned: "已固定",
    incognito: "隐身模式",
    changeToZH: "切换到中文",
    changeToEN: "切换到英文",
    analysisTitle: "每日新开标签量",
    analysisXLabel: "日期",
    analysisYLabel: "创建新标签",
    loading: "加载中...",
    menuGroup: "分组",
    menuUnread: "未读",
    errorTips: "发生了神秘的错误 😭",
    notFound: "什么都没找到..."
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
    analysisTitle: "Daily new tab count",
    analysisXLabel: "Date",
    analysisYLabel: "Create new tab",
    loading: "Loading...",
    menuRobot: "AI Assistant",
    menuGroup: "Group",
    menuUnread: "Unread",
    errorTips: "Oh shit.Something went wrong 😭",
    notFound: "Oh, nothing was found..."
  }
}

export const getI18nByKey = (key: keyof (typeof i18n)["zh-CN"]) => {
  const appState = useAtomValue(appPersistentConfig)
  return (
    i18n?.[appState.language]?.[key] ??
    "Sorry, the translation is not available."
  )
}
