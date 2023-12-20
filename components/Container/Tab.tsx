import clsx from "clsx";
import { useAtomValue } from "jotai";
import { AiOutlineSound } from "react-icons/ai";
import { GiNightSleep } from "react-icons/gi";



import Favicon from "~components/Favicon";
import { draftTabsStore } from "~store";
import type { TTab } from "~types/browser";
import { openSelectedTabs } from "~utils/tabs";



import TabAction from "./TabAction";





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
        {
          "hover:bg-blue-50": tab.active === true,
          hidden: draftTabs.includes(tab.id)
        }
      )}
      style={styles}>
      <Favicon
        url={tab.url}
        styles={{ cursor: "pointer", width: "24px", height: "24px" }}
        onClick={() => openSelectedTabs(tab)}
      />
      <div
        className={clsx("max-w-[480px] p-2 truncate text-blue")}
        onClick={() => openSelectedTabs(tab)}>
        {tab.discarded === true && (
          <GiNightSleep className="inline-block mr-1 text-blue-400" size={16} />
        )}
        {/* mic */}
        {tab.audible && (
          <AiOutlineSound className="inline-block mr-1 text-blue-400 animation-mic" />
        )}
        {tab.title}
      </div>
      <TabAction tab={tab} />
    </div>
  )
}