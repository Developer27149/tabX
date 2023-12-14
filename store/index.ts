import { atom } from "jotai"

import { EShowMode, type IAppState } from "~types/appState"
import { EI18nLanguage, type TTab } from "~types/browser"
import { ETabMode, ETabType } from "~types/common"

export const appStateStore = atom<IAppState>({
  showMode: EShowMode.loading,
  tabsType: "all",
  tabMode: ETabMode.listView,
  searchQuery: "",
  language: EI18nLanguage["zh-CN"]
})

export const allTabsStore = atom<TTab[]>([])
export const refreshTabsSignalStore = atom(true)
