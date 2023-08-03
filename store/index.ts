import { atom } from "jotai"

import { EShowMode, type IAppState } from "~types/appState"
import { EI18nLanguage } from "~types/browser"
import { ETabMode } from "~types/common"

export const appStateStore = atom<IAppState>({
  tabs: [],
  showMode: EShowMode.loading,
  tabsType: "all",
  tabMode: ETabMode.listView,
  searchQuery: "",
  language: EI18nLanguage["zh-CN"]
})
