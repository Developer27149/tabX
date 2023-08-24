import type { TTab } from "~types/browser"

import Tab from "./Tab"

interface IProps {
  tabs: TTab[]
  audible?: boolean
}
export default function ({ tabs, audible }: IProps) {
  return (
    <div className="h-full overflow-y-auto">
      {tabs
        .filter((t) => {
          if (audible) {
            return t.audible === true
          }
          return true
        })
        .map((tab) => (
          <Tab key={tab.id} tab={tab} />
        ))}
    </div>
  )
}
