import clsx from "clsx"
import { useEffect, useMemo, useState } from "react"
import { CiMaximize1, CiMinimize1 } from "react-icons/ci"
import { IoIosClose } from "react-icons/io"
import { TbClearAll } from "react-icons/tb"

import Tooltip from "~components/Tooltip"
import type { IWindowsData, TTab } from "~types/browser"
import { TChromeGroup } from "~types/common"
import { closeWindowById, initAllWindows } from "~utils/chrome"
import { generateGroupListByTabs } from "~utils/groups"

import Tab from "./Tab"

interface IProps {
  tabs: TTab[]
}
export default function ({ tabs }: IProps) {
  const [groups, setGroups] = useState<TChromeGroup[]>([])
  const [currentGroupId, setCurrentGroupId] = useState<number>(0)

  // a better group
  const PopularColors = {
    grey: "#808080",
    blue: "#1a73e8",
    red: "#d93025",
    yellow: "#f9ab00",
    green: "#188038",
    pink: "#d01884",
    purple: "#a142f4",
    cyan: "#007b83",
    orange: "#fa903e"
  } as const

  const onRemoveGroups = (id: number) => () => {
    console.log("remove group", id)
  }

  const onDismissedGroup = (id: number) => () => {
    chrome.tabGroups.update(id, {})
  }

  const onCollapsedGroup = (id: number, collapsed: boolean) => () => {
    chrome.tabGroups.update(id, { collapsed })
  }

  useEffect(() => {
    generateGroupListByTabs(tabs).then((res) => {
      setGroups(res)
      setCurrentGroupId(res[0]?.id)
    })
  }, [tabs])

  const currentGroup = useMemo(() => {
    return groups.find((i) => i.id === currentGroupId)
  }, [currentGroupId, groups])

  return (
    <div className="pb-12 overflow-auto max-h-[450px] pr-2">
      <div className="flex gap-2 flex-wrap">
        {groups
          .sort((prev, cur) => (cur?.title && cur.title.length > 0 ? 1 : -1))
          .map(({ title, id, color, collapsed }) => {
            return (
              <div
                key={id}
                onClick={() => setCurrentGroupId(id)}
                className={clsx(
                  "text-[16px] cursor-pointer text-white",
                  title && title !== ""
                    ? "rounded-md px-2 py-1"
                    : "rounded-full w-8"
                )}
                style={{
                  background: PopularColors[color] ?? "#9c27b0"
                }}>
                {title}
              </div>
            )
          })}
      </div>

      {currentGroup && (
        <div className="mt-4">
          <div className="group flex gap-4 items-center bg-gray-50 rounded-md p-2">
            <div>{currentGroup.title}</div>
            <div className="flex gap-4 items-center ml-auto">
              <Tooltip intro="解散分组下的标签">
                <button>
                  <TbClearAll
                    className="text-[16px] rounded-full text-blue-400 opacity-0.1 group-hover:opacity-100 cursor-pointer"
                    onClick={() => {}}
                  />
                </button>
              </Tooltip>
              <Tooltip intro="删除分组下的所有标签">
                <button
                  onClick={onRemoveGroups(currentGroup.id)}
                  className="text-[16px] p-.5 rounded-full text-blue-300 border border-blue-400">
                  <Tooltip intro={"close"}>
                    <IoIosClose className="cursor-pointer" />
                  </Tooltip>
                </button>
              </Tooltip>
            </div>
          </div>
          {
            <div className="p-1">
              {currentGroup.tabs.map((tab) => (
                <Tab tab={tab} styles={{ marginRight: 0 }} key={tab.id} />
              ))}
            </div>
          }
        </div>
      )}
    </div>
  )
}
