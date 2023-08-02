import type { IAppState } from "~types/appState"

import { errorMessage } from "./common"

export enum EStorageKey {
  appState = "appState"
}

export const getSyncStorage = async (key: EStorageKey) => {
  const result = await chrome.storage.sync.get(key)
  return result[key]
}

export const setSyncStorage = async (key: EStorageKey, value: any) => {
  await chrome.storage.sync.set({ [key]: value })
}

export const setSyncAppState = async (value: IAppState) => {
  try {
    await setSyncStorage(EStorageKey.appState, value)
  } catch (error) {
    errorMessage("Failed to save app state to storage")
  }
}

export const getSyncAppState = async (): Promise<IAppState> => {
  try {
    const result = await getSyncStorage(EStorageKey.appState)
    return result[EStorageKey.appState]
  } catch (error) {
    errorMessage("Failed to load app state from storage")
  }
}
