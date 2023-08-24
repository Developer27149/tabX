import clsx from "clsx"
import { useAtom } from "jotai"
import { AiOutlineAudio } from "react-icons/ai"
import { BiLogoGithub } from "react-icons/bi"
import { BsWindowSidebar } from "react-icons/bs"
import { HiOutlineRectangleGroup } from "react-icons/hi2"
import { IoIosRefresh } from "react-icons/io"
import { MdMultipleStop } from "react-icons/md"
import { PiTwitterLogoThin } from "react-icons/pi"
import { TbWorldWww } from "react-icons/tb"
import { VscMultipleWindows } from "react-icons/vsc"

import { getI18nByKey } from "~i18n"
import { appStateStore } from "~store"
import { ETabType, type TTabType } from "~types/common"

import Tooltip from "./Tooltip"

export default function Menu() {
  const [appState, setAppState] = useAtom(appStateStore)
  const groupType = [
    {
      intro: getI18nByKey("menuAll"),
      icon: <BsWindowSidebar />,
      id: "all"
    },
    {
      intro: getI18nByKey("menuDomain"),
      icon: <TbWorldWww />,
      id: "domain"
    },
    {
      intro: getI18nByKey("menuWindow"),
      icon: <VscMultipleWindows />,
      id: "windowId"
    },
    {
      intro: getI18nByKey("menuAudible"),
      icon: <AiOutlineAudio />,
      id: "audible"
    },
    {
      intro: getI18nByKey("menuStatus"),
      icon: <MdMultipleStop />,
      id: "status"
    },
    {
      intro: getI18nByKey("menuGroup"),
      icon: <HiOutlineRectangleGroup />,
      id: "group"
    }
  ]
  return (
    <div className="flex flex-col p-2 bg-gray-100 py-4 pt-3 gap-2">
      {groupType.map(({ intro, icon, id }) => (
        <Tooltip key={id} intro={intro}>
          <div
            style={{
              color: appState.tabsType === id ? "white" : "#2463eb",
              opacity: appState.tabsType === id ? 1 : 0.8
            }}
            onClick={() => {
              setAppState((i) => ({ ...i, tabsType: id as TTabType }))
            }}
            className={clsx(
              "cursor-pointer p-1 bg-blue-100 rounded-md text-[20px] hover:scale-105 transform transition-all",
              {
                "bg-blue-500": appState.tabsType === id
              }
            )}>
            {icon}
          </div>
        </Tooltip>
      ))}
      <div className="mt-auto">
        <IoIosRefresh className="text-[20px] mb-2 mx-auto opacity-60 hover:opacity-100 cursor-pointer transition-all" />
        <a
          href="https://github.com/Developer27149"
          target="_blank"
          className="animation_icon-hover">
          <BiLogoGithub className="mt-auto text-[20px] mx-auto mb-2" />
        </a>
        <a
          href="https://twitter.com/miaocai0"
          target="_blank"
          className="animation_icon-hover">
          <PiTwitterLogoThin className="mt-auto text-[20px] mx-auto" />
        </a>
      </div>
    </div>
  )
}
