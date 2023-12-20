import { EArea, type IWindowsData } from "~types/browser"

import { EStorageKey, getFromStorage, saveToStorage } from "./storage"

// get all chrome windows data from storage
export const getWindows = () =>
  getFromStorage(EStorageKey.windowsData, EArea.local, [] as IWindowsData[])

// save all chrome windows data to storage
export const saveWindows = (winList: IWindowsData[]) =>
  saveToStorage(EStorageKey.windowsData, winList, EArea.local)

export const initAllWindows = async () => {
  const windowList = await chrome.windows.getAll()
  const windowCache = await getWindows()
  const result = windowList.map((win) => {
    const { id } = win
    return {
      id,
      name: windowCache.find((item) => item.id === id)?.name ?? "Window",
      isMaximized: true
    }
  })
  saveWindows(result)
  return result
}

// handle close window
export const closeWindowById = async (windowId: number) => {
  await chrome.windows.remove(windowId)
  const windowCache = await getWindows()
  const newWindowCache = windowCache.filter((item) => item.id !== windowId)
  saveWindows(newWindowCache)
}

export const onFocusWindowById = (id: number) => {
  chrome.windows.update(id, { focused: true })
}
