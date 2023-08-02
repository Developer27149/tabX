import { ETabType } from "~types/common"
import clsx from "clsx"
import { AiOutlineAudio } from 'react-icons/ai'
import { BsWindowSidebar } from "react-icons/bs"
import { MdMultipleStop } from 'react-icons/md'
import { TbWorldWww } from 'react-icons/tb'
import { VscMultipleWindows } from 'react-icons/vsc'

import Tooltip from "./Tooltip"

export default function Menu() {
  const groupType = [
    {
      intro: ETabType.all,
      icon: <BsWindowSidebar />,
      color: 'blue'
    },
    {
      intro: ETabType.domain,
      icon: <TbWorldWww />,
      color: 'blue'
    },
    {
      intro: ETabType.windowId,
      icon: <VscMultipleWindows />,
      color: 'blue'
    },
    {
      intro: ETabType.audible,
      icon: <AiOutlineAudio />,
      color: 'blue'
    },
    {
      intro: ETabType.status,
      icon: <MdMultipleStop />,
      color: 'blue'
    }
  ]
  return (
    <div className="flex flex-col p-2 bg-gray-50 py-4 gap-4">
      {groupType.map(({ intro, icon,color }) => (
        <Tooltip key={intro} intro={intro}>
          <div className={clsx("cursor-pointer p-1 bg-blue-50 rounded-md text-[16px] hover:text-blue-600 transition-all", {
            'text-blue-500': true,
          })}>
            {icon as any}
          </div>
        </Tooltip>
      ))}
    </div>
  )
}
