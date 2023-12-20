import { BsMic, BsPin } from "react-icons/bs"
import { allTabsStore, draftTabsStore } from "~store"
import { copyTabUrl, openSelectedTabs, reverseTabPinStatus } from "~utils/tabs"
import { useAtom, useSetAtom } from "jotai"

import { BsMicMute } from "react-icons/bs"
import { CgCopy } from "react-icons/cg"
import { IoIosCloseCircleOutline } from "react-icons/io"
import type { TTab } from "~types/browser"
import clsx from "clsx"
import { getI18nByKey } from "~i18n"
import { useState } from "react"

interface TabActionProps {
  tab: TTab
  isPreview?: boolean
}

const TabAction: React.FC<TabActionProps> = ({ tab, isPreview }) => {
  const [, setTabs] = useAtom(allTabsStore)
  const setDraftTabs = useSetAtom(allTabsStore)
  const onRemoveTab = (tab: TTab) => {
    chrome.tabs.remove(tab.id)
    // setTabs((prev) => prev.filter((t) => t.id !== tab.id))
    setDraftTabs(prev => prev.includes(tab.id) ? prev : [...prev, tab.id])
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
      className={clsx("p-1 flex items-center gap-2 text-blue-400 select-none", {
        "bg-gray-100 bg-opacity-0 group-hover:bg-opacity-100": isPreview,
        "ml-auto": !isPreview
      })}>
      <button
        className="opacity-0 text-[15px]  group-hover:opacity-100"
        onClick={() => copyTabUrl(tab, successMessage)}>
        <CgCopy />
      </button>
      <button
        className="opacity-0 text-[15px]  group-hover:opacity-100"
        onClick={() => onReverseTabMutStatus(tab)}>
        {tab.mutedInfo.muted ? <BsMic /> : <BsMicMute />}
      </button>
      <button
        className="opacity-0 text-[15px]  group-hover:opacity-100"
        onClick={() => {
          reverseTabPinStatus(tab.id, isPin)
          setIsPin(!isPin)
        }}>
        {isPin ? <BsPin className="transform rotate-12" /> : <BsPin />}
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
