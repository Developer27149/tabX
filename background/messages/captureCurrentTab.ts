import { EStorageKey, getFromStorage, saveToStorage } from "~utils/storage"

import { EArea } from "~types/browser"
import type { ITabPreviewRecord } from "~types/appState"
import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  // console.log("captureCurrentTab", req)
  chrome.tabs.captureVisibleTab(null, { format: "png" }, async (dataUrl) => {
    if (chrome.runtime.lastError) {
      console.log("error", chrome.runtime.lastError)
      return
    }
    // console.log("dataUrl", dataUrl)
    // save it to the storage
    const record = await getFromStorage<ITabPreviewRecord>(
      EStorageKey.pagePreview,
      EArea.local,
      {}
    )
    // check size
    if (Object.keys(record).length > 200) {
      // remove the oldest one
      const oldest = Object.entries(record).sort(
        (a, b) => a[1].timestamp - b[1].timestamp
      )[0]
      delete record[oldest[0]]
    }
    saveToStorage(
      EStorageKey.pagePreview,
      {
        ...record,
        [req.sender.tab.id.toString()]: {
          dataUrl,
          timestamp: Date.now()
        }
      },
      EArea.local
    )
  })
  res.send({})
}

export default handler
