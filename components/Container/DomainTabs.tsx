import clsx from "clsx"
import { uniq } from "lodash-es"
import { useMemo, useState } from "react"

import Favicon from "~components/Favicon"
import type { TTab } from "~types/browser"
import { resolveHostFromUrl } from "~utils/tabs"

import Tab from "./Tab"

interface IProps {
  tabs: TTab[]
}
export default function ({ tabs }: IProps) {
  const hostList = useMemo(() => {
    return uniq(tabs.map((tab) => resolveHostFromUrl(tab.url)))
  }, [tabs])

  const [currentDomain, setCurrentDomain] = useState(hostList[0])

  return (
    <div>
      <div className="h-[400px] overflow-y-auto pb-48">
        {tabs
          .filter((i) => i.url.includes(currentDomain))
          .map((tab) => (
            <Tab key={tab.id} tab={tab} />
          ))}
      </div>
      <div className="bg-white flex flex-wrap p-2 border border-gray-100 gap-2 gap-y-0 min-w-[734px] max-w-[734px] fixed bottom-2 z-10 rounded-md">
        {hostList.map((host, idx) => {
          return (
            <button
              key={host}
              onClick={() => setCurrentDomain(host)}
              className={clsx(
                "flex items-center gap-2 relative p-1 transition-all group",
                {
                  "bg-blue-100 rounded-sm": currentDomain === host
                }
              )}>
              <Favicon
                url={tabs.find((i) => i.url.includes(host)).url}
                styles={{ minWidth: "24px" }}
              />
              <span
                className={clsx(
                  "absolute -right-[1px] -top-[1px] rounded-full bg-blue-300 animate-ping opacity-0",
                  {
                    "opacity-100 w-1.5 h-1.5": currentDomain === host
                  }
                )}></span>
              <div
                className={clsx(
                  "z-10 py-2 transition-all hidden group-hover:block absolute -top-[32px] text-white bg-blue-500 truncate rounded-md px-4",
                  {
                    "left-0": idx % 15 <= 7,
                    "right-0": idx % 15 > 7
                  }
                )}>
                {host}
              </div>
              <span
                className={clsx(
                  "opacity-0 group-hover:opacity-100 w-0 h-0 border-[6px] border-transparent border-t-blue-500 border-solid absolute left-[12px] bottom-[27px]"
                )}></span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
