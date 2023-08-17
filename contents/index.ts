import type { PlasmoCSConfig } from "plasmo"

import { sendToBackground } from "@plasmohq/messaging"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true
}

const captureCurrentTab = () => {
  try {
    if (document.visibilityState === "visible") {
      // 当前标签页处于显式状态
      sendToBackground({
        name: "captureCurrentTab"
      })
    }
  } catch (error) {}
}

// 加载完成后立即截图
setInterval(captureCurrentTab, 1000 * 10)
captureCurrentTab()
