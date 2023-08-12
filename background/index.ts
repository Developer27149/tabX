import { EStorageKey, getFromStorage, saveToStorage } from "~utils/storage"

import { EArea } from "~types/browser"
import { omit } from "lodash-es"

export {}

/**
 * 关闭标签页时，删除对应的预览记录
 */
chrome.tabs.onRemoved.addListener(async (tabId) => {
  const record = await getFromStorage(EStorageKey["pagePreview"], EArea.local)
  if (record && record[tabId]) {
    const newRecord = omit(record, tabId)
    saveToStorage(EStorageKey["pagePreview"], newRecord, EArea.local)
  }
})
