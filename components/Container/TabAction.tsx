import clsx from "clsx"
import { useAtom } from "jotai"
import { useState } from "react"
import { BsMic, BsPin } from "react-icons/bs"
import { BsMicMute } from "react-icons/bs"
import { CgCopy } from "react-icons/cg"
import { IoIosCloseCircleOutline } from "react-icons/io"

import { getI18nByKey } from "~i18n"
import { allTabsStore } from "~store"
import type { TTab } from "~types/browser"
import { copyTabUrl, openSelectedTabs, reverseTabPinStatus } from "~utils/tabs"

interface TabActionProps {
  tab: TTab
  isPreview?: boolean
}

const TabAction: React.FC<TabActionProps> = ({ tab, isPreview }) => {
  const [, setTabs] = useAtom(allTabsStore)
  const onRemoveTab = (tab: TTab) => {
    chrome.tabs.remove(tab.id)
    setTabs((prev) => prev.filter((t) => t.id !== tab.id))
  }
  const onReverseTabMutStatus = (tab: TTab) => {
    chrome.tabs.update(tab.id, { muted: !tab.mutedInfo.muted })
    setTabs((prev) => {
      return prev.map((t) => {
        if (t.id === tab.id) {
          return { ...t, mutedInfo: { muted: !t.mutedInfo.muted } }
        }
        return t
      })
    })
  }
  const successMessage = getI18nByKey("copySuccess")
  const [isPin, setIsPin] = useState<boolean>(tab.pinned)
  return (
    <div
      className={clsx("p-1 flex items-center gap-2", {
        "bg-gray-100 bg-opacity-0 group-hover:bg-opacity-100": isPreview,
        "ml-auto": !isPreview
      })}>
      <button
        className="opacity-0 text-[15px]  group-hover:opacity-100"
        onClick={() => copyTabUrl(tab, successMessage)}>
        <CgCopy />
      </button>
      {/* {tab.mutedInfo.muted && (
        <button
          className="opacity-0 text-[15px]  group-hover:opacity-100"
          onClick={() => onReverseTabMutStatus(tab)}>
          {tab.mutedInfo.muted ? <BsMic /> : <BsMicMute />}
        </button>
      )} */}
      <button
        className="opacity-0 text-[15px]  group-hover:opacity-100"
        onClick={() => {
          reverseTabPinStatus(tab.id, isPin)
          setIsPin(!isPin)
        }}>
        {isPin ? <BsPin className="transform rotate-12" /> : <BsPin />}
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
      <button
        className="opacity-0 text-[15px]  group-hover:opacity-100"
        onClick={() => onRemoveTab(tab)}>
        <IoIosCloseCircleOutline />
      </button>
    </div>
  )
}

export default TabAction
