import {
  allTabsStore,
  appPersistentConfig,
  defaultFilter,
  draftTabsStore,
  filterStore
} from "~store"
import { getI18nByKey, i18n } from "~i18n"
import { useAtom, useSetAtom } from "jotai"

import { AiOutlineAudio } from "react-icons/ai"
import { BiLogoGithub } from "react-icons/bi"
import { BsCollection } from "react-icons/bs"
import { EI18nLanguage } from "~types/browser"
import { EMenuId } from "~types/menu"
import { GoTasklist } from "react-icons/go"
import { HiOutlineLanguage } from "react-icons/hi2"
import { HiOutlineRectangleGroup } from "react-icons/hi2"
import { IoIosRefresh } from "react-icons/io"
import { MdMultipleStop } from "react-icons/md"
import { PiTwitterLogoThin } from "react-icons/pi"
import { TbRobot } from "react-icons/tb"
import { TbWorldWww } from "react-icons/tb"
import Tooltip from "./Tooltip"
import { VscMultipleWindows } from "react-icons/vsc"
import { VscTools } from "react-icons/vsc";
import { cloneDeep } from "lodash-es"
import clsx from "clsx"
import { queryTabs } from "~utils/tabs"
import { setAppState } from "~utils/storage"

export default function Menu() {
  const [config, setConfig] = useAtom(appPersistentConfig)
  const setAllTabs = useSetAtom(allTabsStore)
  const setDraftTabs = useSetAtom(draftTabsStore)
  const setFilter = useSetAtom(filterStore)

  const onChangeLanguage = () => {
    setConfig((i) => {
      const newLanguage =
        i.language === EI18nLanguage["zh-CN"]
          ? EI18nLanguage.en
          : EI18nLanguage["zh-CN"]
      const zhTip = i18n[newLanguage]["changeToEN"]
      const enTip = i18n[newLanguage]["changeToZH"]
      const tip = newLanguage === EI18nLanguage.en ? zhTip : enTip
      window._toast.success(tip)
      const newConfig = { ...i, language: newLanguage }
      setAppState(newConfig)
      return newConfig
    })
  }

  const onRefresh = async () => {
    const tabs = await queryTabs()
    setAllTabs(tabs)
  }

  const groupType = [
    {
      intro: getI18nByKey("menuAll"),
      icon: <BsCollection />,
      id: EMenuId.all
    },
    {
      intro: getI18nByKey("menuGroup"),
      icon: <HiOutlineRectangleGroup />,
      id: EMenuId.group
    },
    {
      intro: getI18nByKey("menuWindow"),
      icon: <VscMultipleWindows />,
      id: EMenuId.windows
    },
    {
      intro: getI18nByKey("menuTools"),
      icon: <VscTools />,
      id: EMenuId.tools
    }
    // {
    //   intro: getI18nByKey("menuUnread"),
    //   icon: <GoTasklist />,
    //   id: EMenuId.unread
    // },
    // {
    //   intro: getI18nByKey("menuDomain"),
    //   icon: <TbWorldWww />,
    //   id: EMenuId.domain
    // },

    // {
    //   intro: getI18nByKey("menuAudible"),
    //   icon: <AiOutlineAudio />,
    //   id: EMenuId.audible
    // },
    // {
    //   intro: getI18nByKey("menuStatus"),
    //   icon: <MdMultipleStop />,
    //   id: EMenuId.status
    // },
    // {
    //   intro: getI18nByKey("menuRobot"),
    //   icon: <TbRobot />,
    //   id: EMenuId.robot
    // }
  ]
  return (
    <div className="flex flex-col p-2 bg-gray-100 py-4 pt-3 gap-3 min-w-[56px] max-w-[56px]">
      {groupType.map(({ intro, icon, id }) => (
        <div className="flex flex-col items-center justify-center" key={id}>
          <div
            style={{
              color: config.menuId === id ? "#fff" : "#2463eb",
              opacity: config.menuId === id ? 1 : 0.8,
              background: config.menuId === id ? "var(--p-color)" : "white"
            }}
            onClick={() => {
              setConfig((i) => {
                const newConfig = { ...i, menuId: id }
                setAppState(newConfig)
                setDraftTabs([])
                setFilter(cloneDeep(defaultFilter))
                onRefresh()
                return newConfig
              })
            }}
            className={clsx(
              "cursor-pointer p-1 bg-blue-50 rounded-sm text-[24px] hover:scale-105 transform transition-all flex justify-center"
            )}>
            {icon}
          </div>
          <div className={clsx("text-[12px] text-center transform", {
            'opacity-50': id !== config.menuId
          })}>{intro}</div>
        </div>
      ))}
      <div className="mt-auto text-blue">
        <IoIosRefresh
          onClick={onRefresh}
          className="text-[18px] mb-2 mx-auto opacity-60 hover:opacity-100 hover:text-blue-500 cursor-pointer transition-all"
        />
        <HiOutlineLanguage
          onClick={onChangeLanguage}
          className="text-[18px] mb-2 mx-auto hover:opacity-100 hover:text-blue-500 cursor-pointer transition-all"
        />
        {/* <span className="h-[1px] w-8 bg-gray-200 my-4 inline-block"></span>
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
        </a> */}
      </div>
    </div>
  )
}
