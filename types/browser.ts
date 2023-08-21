export type TTab = chrome.tabs.Tab

export enum EI18nLanguage {
  "en" = "en",
  "zh-CN" = "zh-CN"
}

export enum EArea {
  "sync" = "sync",
  "local" = "local"
}

export interface IWindowsData {
  id: number
  name: string
}