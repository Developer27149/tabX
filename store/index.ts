import { atom } from "jotai"

import { EShowMode, type IAppState } from "~types/appState"

export const appStateStore = atom<IAppState>({
  tabs: [],
  showMode: EShowMode.loading,
  tabsType: "all"
})
