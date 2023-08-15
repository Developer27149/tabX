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
    <div className="">
      <div className="h-[400px] overflow-y-auto">
        {tabs.map((tab) => (
          <Tab key={tab.id} tab={tab} />
        ))}
      </div>
      <div className="flex p-2 bg-white border border-gray-100 gap-2 min-w-[734px] max-w-[734px] fixed bottom-2 z-10 rounded-md">
        {hostList.map((host) => {
          return (
            <button
              onClick={() => setCurrentDomain(host)}
              className={clsx("flex items-center gap-2 relative", {
                "text-blue-500": currentDomain === host
              })}>
              <Favicon
                url={tabs.find((i) => i.url.includes(host)).url}
                styles={{ minWidth: "24px" }}
              />
              <span className="hidden">{host}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
