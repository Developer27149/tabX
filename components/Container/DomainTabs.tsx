import type { TTab } from "~types/browser"
import Tab from "./Tab"
import { resolveDomainFromUrl } from "~utils/tabs"

interface IProps {
  tabs: TTab[]
}
export default function ({ tabs }: IProps) {
  const domains = tabs.map((tab) => resolveDomainFromUrl(tab.url))
  return (
    <div className="h-full overflow-y-auto">
      {tabs.map((tab) => (
        <Tab key={tab.id} tab={tab} />
      ))}
    </div>
  )
}
