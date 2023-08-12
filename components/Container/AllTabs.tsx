import type { TTab } from "~types/browser"
import Tab from "./Tab"

interface IProps {
  tabs: TTab[]
}
export default function ({ tabs }: IProps) {
  return (
    <div className="h-full overflow-y-auto">
      {tabs.map((tab) => (
        <Tab key={tab.id} tab={tab} />
      ))}
    </div>
  )
}
