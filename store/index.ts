import { atom } from "jotai"

import { EShowMode, type IAppState } from "~types/appState"
import { ETabMode } from "~types/common"

export const appStateStore = atom<IAppState>({
  tabs: [],
  showMode: EShowMode.loading,
  tabsType: "all",
  tabMode: ETabMode.listView,
  searchQuery: ""
})
