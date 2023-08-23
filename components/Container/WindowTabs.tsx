import { useEffect, useState } from "react"
import { CiMaximize1, CiMinimize1 } from "react-icons/ci"
import { IoIosClose } from "react-icons/io"

import type { IWindowsData, TTab } from "~types/browser"
import { closeWindowById, initAllWindows } from "~utils/chrome"

import Tab from "./Tab"

interface IProps {
  tabs: TTab[]
}
export default function ({ tabs }: IProps) {
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
    <div className="flex flex-col gap-4 pb-12 overflow-auto max-h-[450px] pr-2">
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
              {tabs
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
