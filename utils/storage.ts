import { getI18nByKey } from "~i18n"
import type { IAppState } from "~types/appState"
import { EArea, EI18nLanguage } from "~types/browser"

import { errorMessage } from "./common"

export enum EStorageKey {
  appState = "appState",
  customTabs = "customTabs",
  pagePreview = "pagePreview",
  windowsData = "windowsData",
  dailyOpenTabs = "dailyOpenTabs"
}

export const getFromStorage = async <T = any>(
  key: EStorageKey,
  area = "sync" as EArea,
  defaultValue?: T
) => {
  const result = await chrome.storage[area].get(key)
  return (result[key] as T) ?? defaultValue
}

export const saveToStorage = async (
  key: EStorageKey,
  value: any,
  area = "sync" as EArea
) => {
  await chrome.storage[area].set({ [key]: value })
}

export const setAppState = async (value: IAppState) => {
  try {
    await saveToStorage(EStorageKey.appState, value)
  } catch (error) {
    errorMessage(getI18nByKey("saveStateFailed"))
    console.log(error)
  }
}

export const getAppState = async (): Promise<IAppState> => {
  try {
    const result = await getFromStorage(EStorageKey.appState)
    if (result["language"] === undefined) {
      result["language"] = EI18nLanguage["zh-CN"]
    }
    console.log("result", result)
    return result ?? {}
  } catch (error) {
    errorMessage(getI18nByKey("getStateFailed"))
    console.log(error)
  }
}

export const getCustomTabs = async (): Promise<chrome.tabs.Tab[]> => {
  try {
    const tabs = await getFromStorage(EStorageKey["customTabs"], EArea.local)
    return tabs
  } catch (error) {
    errorMessage(getI18nByKey("getStateFailed"))
    console.log(error)
  }
}
