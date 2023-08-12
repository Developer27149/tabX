import { appStateStore } from "~store"
import { useAtomValue } from "jotai"

export const i18n = {
  "zh-CN": {
    search: "搜索",
    setting: "设置",
    login: "登录",
    copySuccess: "复制成功 🎉",
    getStateFailed: "获取状态失败",
    saveStateFailed: "保存状态失败",
    failedToPreview: "暂无预览数据 🙃"
  },
  en: {
    search: "Search",
    setting: "Setting",
    login: "Login",
    copySuccess: "Copy Success 🎉",
    getStateFailed: "Failed to get state",
    saveStateFailed: "Failed to save state",
    failedToPreview: "Failed to preview now 🙃"
  }
}

export const getI18nByKey = (key: keyof (typeof i18n)["zh-CN"]) => {
  const appState = useAtomValue(appStateStore)
  return (
    i18n?.[appState.language]?.[key] ??
    "Sorry, the translation is not available."
  )
}
