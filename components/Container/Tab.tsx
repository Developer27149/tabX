import { AiOutlineSound } from "react-icons/ai"
import Favicon from "~components/Favicon"
import { GiNightSleep } from "react-icons/gi"
import type { TTab } from "~types/browser"
import TabAction from "./TabAction"
import clsx from "clsx"
import { draftTabsStore } from "~store"
import { openSelectedTabs } from "~utils/tabs"
import { useAtomValue } from "jotai"

interface IProps {
  tab: TTab
  styles?: React.CSSProperties
}
export default function ({ tab, styles }: IProps) {  
  const draftTabs = useAtomValue(draftTabsStore)
  return (
    <div
      className={clsx(
        "flex gap-1 items-center p-1 rounded-sm bg-white transition-color group",
        { "hover:bg-blue-50": tab.active === true, "hidden": draftTabs.includes(tab.id) }
      )}
      style={styles}>
      <Favicon
        url={tab.url}
        styles={{ cursor: "pointer", width: "24px", height: "24px" }}
        onClick={() => openSelectedTabs(tab)}
      />
      <div
        className={clsx("max-w-[480px] p-2 truncate text-blue")}
        onClick={() => {
          console.log(draftTabs)
        }}>
        {tab.discarded === true && (
          <GiNightSleep className="inline-block mr-1 text-blue-400" size={16} />
        )}
        {/* mic */}
        {tab.audible && (
          <AiOutlineSound className="inline-block mr-1 text-blue-400 animation-mic" />
        )}
        <span>{draftTabs.includes(tab.id) ? '已删除': '#'}</span>
        {tab.title}
      </div>
      <TabAction tab={tab} />
    </div>
  )
}
