import { BsWindowSidebar } from "react-icons/bs"

import { ETabType } from "~types/common"

import Tooltip from "./Tooltip"

export default function Menu() {
  const groupType = [
    {
      intro: ETabType.all,
      icon: <BsWindowSidebar />
    },
    {
      intro: ETabType.domain,
      icon: <BsWindowSidebar />
    },
    {
      intro: ETabType.windowId,
      icon: <BsWindowSidebar />
    },
    {
      intro: ETabType.audible,
      icon: <BsWindowSidebar />
    },
    {
      intro: ETabType.status,
      icon: <BsWindowSidebar />
    }
  ]
  return (
    <div className="flex flex-col p-2 bg-gray-50 py-4">
      {groupType.map(({ intro, icon }) => (
        <Tooltip key={intro} intro={intro}>
          <div className="p-1 bg-blue-50 rounded-md text-blue-500 text-[16px]">
            {icon as any}
          </div>
        </Tooltip>
      ))}
    </div>
  )
}
