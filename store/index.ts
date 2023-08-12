import { EShowMode, IAppState, type } from "~types/appState"
import { EI18nLanguage, TTab, type } from "~types/browser"
import { ETabMode } from "~types/common"
import { atom } from "jotai"

export const appStateStore = atom<IAppState>({
  showMode: EShowMode.loading,
  tabsType: "all",
  tabMode: ETabMode.listView,
  searchQuery: "",
  language: EI18nLanguage["zh-CN"]
})

export const allTabsStore = atom<TTab[]>([])
