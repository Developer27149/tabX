import { useAtom } from "jotai"
import { useEffect, useMemo } from "react"

import { allTabsStore, appPersistentConfig } from "~store"
import { EMenuId } from "~types/menu"

import AllTabs from "./AllTabs"
import DomainTabs from "./DomainTabs"
import GroupTabs from "./GroupTabs"
import Header from "./Header"
import StatusTab from "./StatusTab"
import WindowTabs from "./WindowTabs"

export default function () {
  const [config] = useAtom(appPersistentConfig)
  const [tabs, setTabs] = useAtom(allTabsStore)
  // const [signal] = useAtom(refreshTabsSignalStore)

  // useEffect(() => {
  //   // queryTabs().then((_tabs) => {
  //   //   if (appState.searchQuery?.trim() === "") return setTabs(_tabs)
  //   //   const keywordOption =
  //   //     appState.searchQuery?.trim().toUpperCase().split(" ") ?? []
  //   //   const newTabs = _tabs.filter((tab) => {
  //   //     return keywordOption?.every((keyword) => {
  //   //       return (
  //   //         tab.title.toUpperCase().includes(keyword) ||
  //   //         tab.url.toUpperCase().includes(keyword)
  //   //       )
  //   //     })
  //   //   })
  //   //   // newTabs order by keywordOption
  //   //   const newTabsOrder = newTabs.sort((a, b) => {
  //   //     // title is 3 score, url is 1 score
  //   //     const aScore = keywordOption.reduce((acc, cur) => {
  //   //       return (
  //   //         acc +
  //   //         (a.title.toUpperCase().includes(cur.toUpperCase()) ? 3 : 0) +
  //   //         (a.url.toUpperCase().includes(cur.toUpperCase()) ? 1 : 0)
  //   //       )
  //   //     })
  //   //     const bScore = keywordOption.reduce((acc, cur) => {
  //   //       return (
  //   //         acc +
  //   //         (b.title.toUpperCase().includes(cur.toUpperCase()) ? 3 : 0) +
  //   //         (b.url.toUpperCase().includes(cur.toUpperCase()) ? 1 : 0)
  //   //       )
  //   //     })
  //   //     return +bScore - +aScore
  //   //   })
  //   //   setTabs(newTabsOrder)
  //   // })
  //   console.log("query tabs", appState.searchQuery, signal)
  // }, [appState.searchQuery, signal])

  // const resortTabs = useMemo(() => {
  //   console.log("update tabs:", tabs)
  //   const activeTabs = [] as chrome.tabs.Tab[]
  //   const sleepTabs = [] as chrome.tabs.Tab[]
  //   tabs.forEach((tab) => {
  //     if (tab.active) {
  //       activeTabs.push(tab)
  //     } else {
  //       sleepTabs.push(tab)
  //     }
  //   })
  //   return [...activeTabs, ...sleepTabs]
  // }, [tabs])

  const tabComponentMap = {
    [EMenuId.all]: <AllTabs />,
    [EMenuId.group]: <GroupTabs />,
    [EMenuId.windows]: <WindowTabs />
    // [EMenuId.domain]: <DomainTabs tabs={resortTabs} />,
    // [EMenuId.audible]: <AllTabs audible={true} tabs={resortTabs} />,
    // [EMenuId.status]: <StatusTab tabs={resortTabs} />,
    // [EMenuId.robot]: <AllTabs tabs={resortTabs} />,
    // [EMenuId.unread]: <AllTabs tabs={resortTabs} />,
  }

  return (
    <div className="p-2 outline-none border-none">
      {tabComponentMap[config.menuId]}
    </div>
  )
}
