import { useAtomValue } from "jotai";
import { useEffect, useMemo, useState } from "react"
import { CiMaximize1, CiMinimize1 } from "react-icons/ci"
import { FaLocationArrow } from "react-icons/fa6"
import { IoIosClose } from "react-icons/io"

import NotFound from "~components/NotFound"
import { allTabsStore, filterStore } from "~store"
import type { IWindowsData } from "~types/browser"
import {
  closeWindowById,
  initAllWindows,
  onFocusWindowById
} from "~utils/chrome"

import Tab from "./Tab"

export default function () {
  const allTabs = useAtomValue(allTabsStore)
  const [windows, setWindows] = useState<IWindowsData[]>([])
  const filter = useAtomValue(filterStore)

  const tabs = useMemo(() => {
    return allTabs
      .filter((i) => i.audible === filter.isAudible)
      .filter(
        (i) =>
          i.title.toUpperCase().includes(filter.query.toUpperCase()) ||
          i.url.toUpperCase().includes(filter.query.toUpperCase())
      )
  }, [allTabs, filter])

  const onRemoveWindow = (id: number) => () => {
    closeWindowById(id)
    setWindows(windows.filter((i) => i.id !== id))
  }

  useEffect(() => {
    initAllWindows().then(setWindows)
  }, [])

  return (
    <div className="flex flex-col gap-4 p-3 pb-12 relative">
      {windows.map(({ name, id, isMaximized }, idx) => (
        <div key={id} className="rounded-md shadow p-4">
          <div className="group flex gap-4 items-center rounded-md p-3">
            <h1 className="text-[16px] font-bold text-blue-500">
              {name} {idx + 1}
            </h1>
            <div className="flex gap-4 items-center ml-auto">
              <button>
                <FaLocationArrow
                  onClick={() => {
                    console.log("fuck:", id)
                    onFocusWindowById(id)
                  }}
                  className="text-[16px] rounded-full text-blue-400"
                />
              </button>
              <button>
                {isMaximized ? (
                  <CiMinimize1
                    className="text-[16px] rounded-full text-blue-400"
                    onClick={() => {
                      setWindows((prev) => {
                        prev[idx].isMaximized = false
                        return [...prev]
                      })
                    }}
                  />
                ) : (
                  <CiMaximize1
                    className="text-[16px] rounded-full text-blue-400"
                    onClick={() => {
                      setWindows((prev) => {
                        prev[idx].isMaximized = true
                        return [...prev]
                      })
                    }}
                  />
                )}
              </button>
              <button
                onClick={onRemoveWindow(id)}
                className="text-[16px] p-.5 bg-blue-500 rounded-full text-white">
                <IoIosClose />
              </button>
            </div>
          </div>
          {isMaximized && (
            <div className="p-4 border border-blue-400 rounded-md m-4">
              {tabs.filter((i) => i.windowId === id).length > 0 ? (
                tabs
                  .filter((i) => i.windowId === id)
                  .map((tab) => (
                    <Tab tab={tab} styles={{ marginRight: 0 }} key={tab.id} />
                  ))
              ) : (
                <NotFound />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}