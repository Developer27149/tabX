import type { TTab } from "./browser"
import type { ETabMode, TTabType } from "./common"

export enum EShowMode {
  loading,
  setting,
  normal,
  login
}

export interface IAppState {
  tabs: TTab[]
  showMode: EShowMode
  tabsType: TTabType
  tabMode: ETabMode
  searchQuery: string
  language: string
}
