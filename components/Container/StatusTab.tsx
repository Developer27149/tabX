import { useEffect, useState } from "react"
import { IoIosClose } from "react-icons/io"

import { getI18nByKey } from "~i18n"
import type { TTab } from "~types/browser"

import Tab from "./Tab"

interface IProps {
  tabs: TTab[]
}

export default function StatusTab({ tabs }: IProps) {
  const [pinnedTabs, setPinnedTabs] = useState<TTab[]>([])
  const [inactiveList, setInactiveList] = useState<TTab[]>([])

  const data = [
    {
      title: getI18nByKey("pinned"),
      tabs: pinnedTabs
    },
    {
      title: getI18nByKey("inactive"),
      tabs: inactiveList
    }
  ]

  useEffect(() => {
    console.log("tabs:", tabs)
    setPinnedTabs(tabs.filter((i) => i.pinned))
    setInactiveList(tabs.filter((i) => i.status !== "complete"))
  }, [tabs])

  return (
    <div className="flex flex-col gap-4 pb-12 overflow-auto max-h-[450px] pr-2">
      {data.map(({ title, tabs }, idx) => {
        return (
          <>
            <div
              key={idx}
              className="border border-blue-50 hover:border-blue-500 rounded-md transition-all">
              <div className="group flex gap-4 items-center bg-gray-50 rounded-md p-2">
                <h1 className="text-[16px] font-bold text-blue-400 opacity-80 group-hover:opacity-100 transition-all">
                  {title}
                </h1>
                <div className="flex gap-4 items-center ml-auto">
                  <button
                    onClick={() => {}}
                    className="text-[16px] p-.5 group-hover:bg-blue-500 rounded-full text-white">
                    <IoIosClose />
                  </button>
                </div>
              </div>
              <div className="p-1">
                {tabs.map((tab) => (
                  <Tab tab={tab} styles={{ marginRight: 0 }} key={tab.id} />
                ))}
              </div>
            </div>
          </>
        )
      })}
    </div>
  )
}
