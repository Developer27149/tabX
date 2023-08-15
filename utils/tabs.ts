import { sendToBackground } from "@plasmohq/messaging";



import { EArea, type TTab } from "~types/browser";



import { EStorageKey, getFromStorage } from "./storage";





// query all tabs
export const queryTabs = () => chrome.tabs.query({})

// 提取通用逻辑
const groupTabsByProperty = (
  tabs: TTab[],
  getProperty: (tab: TTab) => string | number
) => {
  const groups: Record<string, TTab[]> = {}
  tabs.forEach((tab) => {
    const property = getProperty(tab)
    if (groups[property]) {
      groups[property].push(tab)
    } else {
      groups[property] = [tab]
    }
  })
  return groups
}

// 将所有 tabs 按 windows id 分组
export const groupTabsByWindowId = (tabs: chrome.tabs.Tab[]) => {
  return groupTabsByProperty(tabs, (tab) => tab.windowId)
}

// 将所有 tabs 按域名分组
export const groupTabsByHostname = (tabs: chrome.tabs.Tab[]) => {
  return groupTabsByProperty(tabs, (tab) => new URL(tab.url).hostname)
}

// 将所有 tabs 按状态分组
export const groupTabsByStatus = (tabs: chrome.tabs.Tab[]) => {
  return groupTabsByProperty(tabs, (tab) => tab.status)
}

// 将所有 tabs 按 group 分组
export const groupTabsByGroup = (tabs: chrome.tabs.Tab[]) => {
  return groupTabsByProperty(tabs, (tab) => tab.groupId)
}

// 将所有 tabs 按是否 audible 分组
export const groupTabsByAudible = (tabs: chrome.tabs.Tab[]) => {
  return groupTabsByProperty(tabs, (tab) => tab.audible.toString())
}

// 打开选中的 tab
export const openSelectedTabs = async (tab: TTab) => {
  const body = {
    id: tab.id,
    windowId: tab.windowId
  }
  sendToBackground({
    name: "openTab",
    body
  })
}

// 复制 tab 的 url
export const copyTabUrl = async (tab: TTab, message: string) => {
  const url = tab.url
  await navigator.clipboard.writeText(url)
  window._toast.success(message)
}

export const getPreviewRecord = () =>
  getFromStorage(EStorageKey["pagePreview"], EArea.local, {})

export async function getPagePreviewDataUrlByTabId(tabId: number) {
  const record = await getPreviewRecord()
  return record[tabId]["dataUrl"]
}

export const resolveHostFromUrl = (url: string) => {
  const { host } = new URL(url)
  return host
}