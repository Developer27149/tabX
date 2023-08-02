import { useState } from "react"

import type { TTab } from "~types/browser"
import { ETabMode } from "~types/common"

import Tab from "./Tab"

interface IProps {
  tabs: TTab[]
}
export default function ({ tabs }: IProps) {
  const [tabMode, setTabMode] = useState(ETabMode.listView)
  return (
    <div>
      {tabs.map((tab) => (
        <Tab mode={tabMode} key={tab.id} tab={tab} />
      ))}
    </div>
  )
}
