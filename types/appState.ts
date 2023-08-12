import type { EI18nLanguage, TTab } from "./browser"
import type { ETabMode, TTabType } from "./common"

export enum EShowMode {
  loading,
  setting,
  normal,
  login
}

export interface IAppState {
  showMode: EShowMode
  tabsType: TTabType
  tabMode: ETabMode
  searchQuery: string
  language: EI18nLanguage
}

export interface ITabPreviewRecord {
  [key: string]: {
    dataUrl: string
    timestamp: number
  }
}
