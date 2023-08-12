import {
  copyTabUrl,
  getPagePreviewDataUrlByTabId,
  openSelectedTabs
} from "~utils/tabs"
import { useEffect, useState } from "react"

import { CgCopy } from "react-icons/cg"
import { ETabMode } from "~types/common"
import Favicon from "~components/Favicon"
import type { TTab } from "~types/browser"
import { appStateStore } from "~store"
import { getI18nByKey } from "~i18n"
import { useAtomValue } from "jotai"

interface IProps {
  tab: TTab
}
export default function ({ tab }: IProps) {
  const appState = useAtomValue(appStateStore)
  const successMessage = getI18nByKey("copySuccess")
  const [previewDataUrl, setPreviewDataUrl] = useState<string>("")

  const failedMessage = getI18nByKey("failedToPreview")

  useEffect(() => {
    if (appState.tabMode === ETabMode.pagePreview) {
      getPagePreviewDataUrlByTabId(tab.id).then((dataUrl) => {
        setPreviewDataUrl(dataUrl)
      })
    }
  }, [appState.tabMode])

  if (appState.tabMode === ETabMode.listView) {
    return (
      <div className="flex gap-2 items-center p-1 rounded-sm bg-white hover:bg-blue-500 hover:text-white transition-all mr-4 group">
        <Favicon url={tab.url} />
        <div className="truncate max-w-[620px]">{tab.title}</div>
        <div className="p-1 flex items-center gap-1 ml-auto">
          <button
            className="opacity-0 text-[15px]  group-hover:opacity-100"
            onClick={() => copyTabUrl(tab, successMessage)}>
            <CgCopy color="white" />
          </button>
          <button
            className="opacity-0 group-hover:opacity-100"
            onClick={() => openSelectedTabs(tab)}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3 2C2.44772 2 2 2.44772 2 3V12C2 12.5523 2.44772 13 3 13H12C12.5523 13 13 12.5523 13 12V8.5C13 8.22386 12.7761 8 12.5 8C12.2239 8 12 8.22386 12 8.5V12H3V3L6.5 3C6.77614 3 7 2.77614 7 2.5C7 2.22386 6.77614 2 6.5 2H3ZM12.8536 2.14645C12.9015 2.19439 12.9377 2.24964 12.9621 2.30861C12.9861 2.36669 12.9996 2.4303 13 2.497L13 2.5V2.50049V5.5C13 5.77614 12.7761 6 12.5 6C12.2239 6 12 5.77614 12 5.5V3.70711L6.85355 8.85355C6.65829 9.04882 6.34171 9.04882 6.14645 8.85355C5.95118 8.65829 5.95118 8.34171 6.14645 8.14645L11.2929 3H9.5C9.22386 3 9 2.77614 9 2.5C9 2.22386 9.22386 2 9.5 2H12.4999H12.5C12.5678 2 12.6324 2.01349 12.6914 2.03794C12.7504 2.06234 12.8056 2.09851 12.8536 2.14645Z"
                fill="currentColor"></path>
            </svg>
          </button>
        </div>
      </div>
    )
  }
  // preview mode
  return (
    <div className="inline-block bg-white m-2 min-w-[340px] max-w-[340px] h-[160px] overflow-hidden border border-gray-100 rounded-md group">
      <div className="p-1 px-2 bg-gray-100 flex justify-between items-center">
        <a href={tab.url} target="_blank" className="flex items-center">
          <Favicon url={tab.url} styles={{ width: "16px", height: "16px" }} />
        </a>
        <div className="ml-2 w-[70%] truncate">{tab.title}VFi</div>
        <div className="p-1 flex items-center gap-1 ml-auto">
          <button
            className="opacity-0 text-[15px]  group-hover:opacity-100 hover:bg-gray-100 p-[2px]"
            onClick={() => copyTabUrl(tab, successMessage)}>
            <CgCopy />
          </button>
          <button
            className="opacity-0 group-hover:opacity-100 hover:bg-gray-100 p-[2px]"
            onClick={() => openSelectedTabs(tab)}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3 2C2.44772 2 2 2.44772 2 3V12C2 12.5523 2.44772 13 3 13H12C12.5523 13 13 12.5523 13 12V8.5C13 8.22386 12.7761 8 12.5 8C12.2239 8 12 8.22386 12 8.5V12H3V3L6.5 3C6.77614 3 7 2.77614 7 2.5C7 2.22386 6.77614 2 6.5 2H3ZM12.8536 2.14645C12.9015 2.19439 12.9377 2.24964 12.9621 2.30861C12.9861 2.36669 12.9996 2.4303 13 2.497L13 2.5V2.50049V5.5C13 5.77614 12.7761 6 12.5 6C12.2239 6 12 5.77614 12 5.5V3.70711L6.85355 8.85355C6.65829 9.04882 6.34171 9.04882 6.14645 8.85355C5.95118 8.65829 5.95118 8.34171 6.14645 8.14645L11.2929 3H9.5C9.22386 3 9 2.77614 9 2.5C9 2.22386 9.22386 2 9.5 2H12.4999H12.5C12.5678 2 12.6324 2.01349 12.6914 2.03794C12.7504 2.06234 12.8056 2.09851 12.8536 2.14645Z"
                fill="currentColor"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="p-1 cursor-pointer" onClick={() => openSelectedTabs(tab)}>
        {previewDataUrl ? (
          <img src={previewDataUrl} className="w-full h-[120px]" />
        ) : (
          <div className="flex justify-center items-center h-[120px]">
            {failedMessage}
          </div>
        )}
      </div>
    </div>
  )
}
