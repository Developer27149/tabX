import { CiMaximize1, CiMinimize1 } from "react-icons/ci"
import type { IWindowsData, TTab } from "~types/browser"
import { closeWindowById, initAllWindows } from "~utils/chrome"
import { useEffect, useState } from "react"

import { IoIosClose } from "react-icons/io"
import Tab from "./Tab"
import { allTabsStore } from "~store"
import { useAtomValue } from "jotai"

export default function () {
  const allTabs = useAtomValue(allTabsStore)
  const [windows, setWindows] = useState<IWindowsData[]>([])

  const onRemoveWindow = (id: number) => () => {
    closeWindowById(id)
    setWindows(windows.filter((i) => i.id !== id))
  }

  useEffect(() => {
    initAllWindows().then((winList) => {
      setWindows(winList)
    })
  }, [])
  return (
    <div className="flex flex-col gap-4 pb-12 pr-2">
      <div className="flex justify-end flex-nowrap gap-2 bg-light-300 sticky top-0 left-0 right-0 p-4 group w-full overflow-x-scroll">
        {
        windows.map((_,idx) => {
          return (
            <div className="px-1 group-hover:p-4 h-8 rounded-sm flex items-center justify-center opacity-50 hover:opacity-100 bg-white text-blue transform skew-x-[-10deg] group-hover:skew-x-0 transition-all text-white border shadow shadow-blue-400">
              <span className="w-0 group-hover:w-auto opacity-0 group-hover:opacity-100">Window {idx+1}</span>
            </div>
          )
        })
      }
      </div>
      {windows.map(({ name, id, isMaximized }, idx) => (
        <div
          key={id}
          className="border border-blue-50 hover:border-blue-500 rounded-md transition-all">
          <div className="group flex gap-4 items-center bg-gray-50 rounded-md p-2">
            <span className="rounded-full bg-blue-100 w-4 h-4 flex justify-center items-center">
              <span className="rounded-full bg-white w-3 h-3 text-center flex justify-center items-center text-blue-500">
                {idx + 1}
              </span>
            </span>
            <h1 className="text-[16px] font-bold text-blue-400 opacity-80 group-hover:opacity-100 transition-all">
              {name}
            </h1>
            <div className="flex gap-4 items-center ml-auto">
              <button>
                {isMaximized ? (
                  <CiMaximize1
                    className="text-[16px] rounded-full text-blue-400 opacity-0 group-hover:opacity-100"
                    onClick={() => {
                      setWindows((prev) => {
                        prev[idx].isMaximized = false
                        return [...prev]
                      })
                    }}
                  />
                ) : (
                  <CiMinimize1
                    className="text-[16px] rounded-full text-blue-400 opacity-0 group-hover:opacity-100"
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
                className="text-[16px] p-.5 group-hover:bg-blue-500 rounded-full text-white">
                <IoIosClose />
              </button>
            </div>
          </div>
          {isMaximized && (
            <div className="p-1">
              {/* items */}
              {allTabs
                .filter((i) => i.windowId === id)
                .map((tab) => (
                  <Tab tab={tab} styles={{ marginRight: 0 }} key={tab.id} />
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
