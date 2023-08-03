import { useAtomValue } from "jotai"

import { appStateStore } from "~store"

export const i18n = {
  "zh-CN": {
    search: "搜索",
    setting: "设置",
    login: "登录",
    copySuccess: "复制成功 🎉"
  },
  en: {
    search: "Search",
    setting: "Setting",
    login: "Login",
    copySuccess: "Copy Success 🎉"
  }
}

export const getI18nByKey = (key: keyof (typeof i18n)["zh-CN"]) => {
  const appState = useAtomValue(appStateStore)
  return (
    i18n?.[appState.language]?.[key] ??
    "Sorry, the translation is not available."
  )
}
