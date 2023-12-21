import clsx from "clsx";
import { useAtom } from "jotai"
import { useState } from "react"
import { BsMic, BsPin } from "react-icons/bs"
import { BsMicMute } from "react-icons/bs"
import { CgCopy } from "react-icons/cg"
import { IoIosCloseCircleOutline } from "react-icons/io"

import { getI18nByKey } from "~i18n"
import { draftTabsStore } from "~store"
import type { TTab } from "~types/browser"
import { copyTabUrl, reverseTabPinStatus } from "~utils/tabs"

interface TabActionProps {
  tab: TTab
}

const TabAction: React.FC<TabActionProps> = ({ tab }) => {
  const [currentTab, setCurrentTab] = useState<TTab>(tab)
  const [, setDraftTabs] = useAtom(draftTabsStore)
  const onRemoveTab = () => {
    chrome.tabs.remove(currentTab.id)
    setDraftTabs((prev) =>
      prev.includes(currentTab.id) ? prev : [...prev, currentTab.id]
    )
  }
  const onReverseTabMutStatus = () => {
    chrome.tabs.update(currentTab.id, { muted: !currentTab.mutedInfo.muted })
    setCurrentTab((prev) => ({
      ...prev,
      mutedInfo: { muted: !prev.mutedInfo.muted }
    }))
  }
  const successMessage = getI18nByKey("copySuccess")
  return (
    <div
      className={clsx(
        "p-1 flex items-center gap-2 text-blue-400 select-none ml-auto"
      )}>
      <button
        className="opacity-0 text-[15px]  group-hover:opacity-100"
        onClick={() => copyTabUrl(currentTab, successMessage)}>
        <CgCopy />
      </button>
      <button
        className="opacity-0 text-[15px]  group-hover:opacity-100"
        onClick={() => onReverseTabMutStatus()}>
        {currentTab.mutedInfo.muted ? <BsMic /> : <BsMicMute />}
      </button>
      <button
        className="opacity-0 text-[15px]  group-hover:opacity-100"
        onClick={() => {
          reverseTabPinStatus(currentTab.id, currentTab.pinned)
        }}>
        {currentTab.pinned ? (
          <BsPin className="transform rotate-12" />
        ) : (
          <BsPin />
        )}
      </button>

      <button
        className="opacity-0 text-[15px]  group-hover:opacity-100"
        onClick={onRemoveTab}>
        <IoIosCloseCircleOutline />
      </button>
    </div>
  )
}

export default TabAction