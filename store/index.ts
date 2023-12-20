import { atom } from "jotai"

import { EI18nLanguage, TTab } from "~types/browser"
import { EMenuId } from "~types/menu"

export const appPersistentConfig = atom({
  language: EI18nLanguage["zh-CN"],
  menuId: EMenuId.all
})

export const allTabsStore = atom<TTab[]>([])
export const draftTabsStore = atom<number[]>([])

export const defaultFilter = {
  query: "", // 搜索
  isAudible: false // 有声音
}
export const filterStore = atom(defaultFilter)
