import type { EI18nLanguage, TTab } from "./browser";
import type { ETabMode, TMenuId } from "./common"









export enum EShowMode {
  loading,
  setting,
  normal,
  login,
  error
}

export interface IAppPersistentState {
  menuId: TMenuId
  language: EI18nLanguage
}

export interface ITabPreviewRecord {
  [key: string]: {
    dataUrl: string
    timestamp: number
  }
}