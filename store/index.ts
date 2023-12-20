import { EI18nLanguage, TTab, type } from "~types/browser"
import { EMenuId } from "~types/menu"
import { atom } from "jotai"

export const appPersistentConfig = atom({
  language: EI18nLanguage["zh-CN"],
  menuId: EMenuId.all
})

export const allTabsStore = atom<TTab[]>([])
export const draftTabsStore = atom<TTab[]>([])

export const defaultFilter = {
  query: "", // 搜索
  isAudible: false // 有声音
}
export const filterStore = atom(defaultFilter)

