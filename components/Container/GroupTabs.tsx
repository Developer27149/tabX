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

  // a better group color map
  const colorMap = {
    red: "#f44336",
    pink: "#e91e63",
    purple: "#9c27b0",
    deepPurple: "#673ab7",
    indigo: "#3f51b5",
    blue: "#2196f3",
    lightBlue: "#03a9f4",
    cyan: "#00bcd4",
    teal: "#009688"
  }

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
        {groups.map(({ title, id, color, collapsed }) => {
          return (
            <div
              key={id}
              className="text-[16px] px-2 py-1 rounded-sm cursor-pointer text-white"
              style={{
                background: colorMap[color] ?? "#9c27b0"
              }}>
              {title}
            </div>
          )
        })}
      </div>

      {currentGroup && (
        <div className="mt-4">
          <div className="group flex gap-4 items-center bg-gray-50 rounded-md p-2">
            <div>{currentGroup.collapsed ? "折叠" : "展开"}的分组</div>
            <div className="flex gap-4 items-center ml-auto">
              <Tooltip intro="解散分组下的标签">
                <button>
                  <TbClearAll
                    className="text-[16px] rounded-full text-blue-400 opacity-0 group-hover:opacity-100"
                    onClick={() => {}}
                  />
                </button>
              </Tooltip>
              <Tooltip intro="删除分组下的所有标签">
                <button
                  onClick={onRemoveGroups(currentGroup.id)}
                  className="text-[16px] p-.5 group-hover:bg-blue-500 rounded-full text-white">
                  <Tooltip intro={"close"}>
                    <IoIosClose />
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
