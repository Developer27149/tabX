import Favicon from "~components/Favicon"
import type { TTab } from "~types/browser"
import { ETabMode } from "~types/common"

interface IProps {
  tab: TTab
  mode: ETabMode
}
export default function ({ tab, mode }: IProps) {
  if (mode === ETabMode.listView) {
    return (
      <div className="flex gap-4 items-center p-1 rounded-sm bg-white hover:bg-blue-400 hover:text-white transition-all">
        <Favicon src={tab.favIconUrl} />
        <div>{tab.title}</div>
      </div>
    )
  }
  return (
    <div>
      <div>tab</div>
    </div>
  )
}
