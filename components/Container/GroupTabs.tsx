import clsx from "clsx"
import { useSetAtom } from "jotai"
import { useEffect, useMemo, useState } from "react"
import { AiOutlineEnter } from "react-icons/ai"
import { FaArrowRight } from "react-icons/fa"
import { IoIosClose } from "react-icons/io"
import { SlSizeActual } from "react-icons/sl"
import { SlSizeFullscreen } from "react-icons/sl"
import { TbClearAll } from "react-icons/tb"

import Tooltip from "~components/Tooltip"
import { allTabsStore } from "~store"
import type { TTab } from "~types/browser"
import { TChromeGroup } from "~types/common"
import { generateGroupListByTabs } from "~utils/groups"

import Tab from "./Tab"

interface IProps {
  tabs: TTab[]
}
export default function ({ tabs }: IProps) {
  const setAllTabs = useSetAtom(allTabsStore)
  const [groups, setGroups] = useState<TChromeGroup[]>([])
  const [currentGroupId, setCurrentGroupId] = useState<number>(0)
  const [currentGroupTitle, setCurrentGroupTitle] = useState<string>("")

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

  // 删除组和组内的标签
  const onRemoveTabs = async () => {
    try {
      const { tabs } = currentGroup
      await Promise.all(
        tabs.map((tab) => {
          return chrome.tabs.remove(tab.id)
        })
      )
      setAllTabs((prev) => prev.filter((i) => i.id !== currentGroup.id))
      window._toast.success("删除成功")
    } catch (error) {
      window._toast.error("删除失败")
    }
  }

  // 解散分组，将分组下的标签全部移出分组
  const onDismissedGroup = async () => {
    await chrome.tabs.ungroup(currentGroup.tabs.map((i) => i.id))
    window._toast.success("分组已解散")
  }

  const onCollapsedGroup = () => {
    chrome.tabGroups.update(currentGroup.id, {
      collapsed: !currentGroup.collapsed
    })
    setGroups((prev) => {
      return prev.map((i) => {
        if (i.id === currentGroup.id) {
          return {
            ...i,
            collapsed: !currentGroup.collapsed
          }
        }
        return i
      })
    })
  }

  const onFocusGroupWindow = () => {
    const { windowId } = currentGroup
    chrome.windows.update(windowId, { focused: true })
  }

  const onUpdateCurrentGroupTitle = async () => {
    await chrome.tabGroups.update(currentGroup.id, {
      title: currentGroupTitle
    })
    setGroups((prev) => {
      return prev.map((i) => {
        if (i.id === currentGroup.id) {
          return {
            ...i,
            title: currentGroupTitle
          }
        }
        return i
      })
    })
  }

  useEffect(() => {
    generateGroupListByTabs(tabs).then((res) => {
      setGroups(res)
      setCurrentGroupId(res[0]?.id)
    })
  }, [tabs])

  const currentGroup = useMemo(() => {
    const currentGroup = groups.find((i) => i.id === currentGroupId)
    setCurrentGroupTitle(currentGroup?.title ? currentGroup.title : "")
    return currentGroup
  }, [currentGroupId, groups])

  return (
    <div className="pb-12 overflow-auto max-h-[450px] pr-2">
      <div className="flex gap-2 flex-wrap">
        {[
          ...groups.filter((i) => i.title !== ""),
          ...groups.filter((i) => i.title === "")
        ].map(({ title, id, color }) => {
          return (
            <div
              onClick={() => setCurrentGroupId(id)}
              className={clsx(
                "text-[16px] cursor-pointer text-white max-w-[128px] truncate",
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
            <div className="truncate max-w-[400px] flex gap-2 items-center cursor-pointer text-blue-500">
              <FaArrowRight onClick={onFocusGroupWindow} />
              {currentGroupTitle.length > 0 && (
                <>
                  <input
                    className="border-none outline-none px-2 py-1 mr-1"
                    value={currentGroupTitle}
                    onChange={(v) => {
                      const { value } = v.target
                      setCurrentGroupTitle(value)
                    }}
                  />
                  <AiOutlineEnter
                    onClick={onUpdateCurrentGroupTitle}
                    className={clsx(
                      {
                        hidden: currentGroupTitle === currentGroup.title
                      },
                      "opacity-70 hover:opacity-100 transition-opacity"
                    )}
                  />
                </>
              )}
            </div>
            <div className="flex gap-4 items-center ml-auto">
              <Tooltip intro={currentGroup.collapsed ? "展开分组" : "折叠分组"}>
                <button onClick={onCollapsedGroup}>
                  {currentGroup.collapsed ? (
                    <SlSizeFullscreen className="text-[16px] rounded-full text-blue-400 opacity-0.1 group-hover:opacity-100 cursor-pointer" />
                  ) : (
                    <SlSizeActual className="text-[16px] rounded-full text-blue-400 opacity-0.1 group-hover:opacity-100 cursor-pointer" />
                  )}
                </button>
              </Tooltip>
              <Tooltip side="top" intro="解散分组，移出标签">
                <button className="cursor-pointer" onClick={onDismissedGroup}>
                  <TbClearAll className="text-[16px] rounded-full text-blue-400 opacity-0.1 group-hover:opacity-100 cursor-pointer" />
                </button>
              </Tooltip>
              <Tooltip
                side="top"
                intro="删除分组及其内部标签"
                className="cursor-pointer">
                <button onClick={onRemoveTabs}>
                  <IoIosClose className="text-[16px] p-.5 rounded-full text-blue-300 border border-blue-400" />
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
