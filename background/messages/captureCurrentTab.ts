import type { PlasmoMessaging } from "@plasmohq/messaging"

import type { ITabPreviewRecord } from "~types/appState"
import { EArea } from "~types/browser"
import { EStorageKey, getFromStorage, saveToStorage } from "~utils/storage"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  chrome.tabs.captureVisibleTab(null, { format: "png" }, async (dataUrl) => {
    if (chrome.runtime.lastError) {
      return
    }
    // console.log("dataUrl", dataUrl)
    // save it to the storage
    try {
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
    } catch (error) {}
  })
  res.send({})
}

export default handler
