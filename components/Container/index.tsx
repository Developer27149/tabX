import { useAtom } from "jotai"
import { useEffect, useMemo } from "react"

import { allTabsStore, appStateStore, refreshTabsSignalStore } from "~store"
import { EGroupId } from "~types/menu"
import { queryTabs } from "~utils/tabs"

import AllTabs from "./AllTabs"
import AnalysisTab from "./AnalysisTab"
import DomainTabs from "./DomainTabs"
import GroupTabs from "./GroupTabs"
import Header from "./Header"
import StatusTab from "./StatusTab"
import WindowTabs from "./WindowTabs"

export default function () {
  const [appState] = useAtom(appStateStore)
  const [tabs, setTabs] = useAtom(allTabsStore)
  const [signal] = useAtom(refreshTabsSignalStore)

  useEffect(() => {
    queryTabs().then((_tabs) => {
      if (appState.searchQuery?.trim() === "") return setTabs(_tabs)
      const keywordOption =
        appState.searchQuery?.trim().toUpperCase().split(" ") ?? []
      const newTabs = _tabs.filter((tab) => {
        return keywordOption?.every((keyword) => {
          return (
            tab.title.toUpperCase().includes(keyword) ||
            tab.url.toUpperCase().includes(keyword)
          )
        })
      })
      // newTabs order by keywordOption
      const newTabsOrder = newTabs.sort((a, b) => {
        // title is 3 score, url is 1 score
        const aScore = keywordOption.reduce((acc, cur) => {
          return (
            acc +
            (a.title.toUpperCase().includes(cur.toUpperCase()) ? 3 : 0) +
            (a.url.toUpperCase().includes(cur.toUpperCase()) ? 1 : 0)
          )
        })
        const bScore = keywordOption.reduce((acc, cur) => {
          return (
            acc +
            (b.title.toUpperCase().includes(cur.toUpperCase()) ? 3 : 0) +
            (b.url.toUpperCase().includes(cur.toUpperCase()) ? 1 : 0)
          )
        })

        return +bScore - +aScore
      })
      setTabs(newTabsOrder)
    })
  }, [appState.searchQuery, signal])

  const resortTabs = useMemo(() => {
    const activeTabs = [] as chrome.tabs.Tab[]
    const sleepTabs = [] as chrome.tabs.Tab[]
    tabs.forEach((tab) => {
      if (tab.active) {
        activeTabs.push(tab)
      } else {
        sleepTabs.push(tab)
      }
    })
    return [...activeTabs, ...sleepTabs]
  }, [tabs])

  const tabComponentMap = {
    [EGroupId.all]: <AllTabs tabs={resortTabs} />,
    [EGroupId.domain]: <DomainTabs tabs={resortTabs} />,
    [EGroupId.windows]: <WindowTabs tabs={resortTabs} />,
    [EGroupId.audible]: <AllTabs audible={true} tabs={resortTabs} />,
    [EGroupId.status]: <StatusTab tabs={resortTabs} />,
    [EGroupId.analysis]: <AnalysisTab />,
    [EGroupId.robot]: <AllTabs tabs={resortTabs} />,
    [EGroupId.unread]: <AllTabs tabs={resortTabs} />,
    [EGroupId.group]: <GroupTabs tabs={resortTabs} />
  }

  return (
    <div className="w-[756px] h-[520px] p-2 pb-16 relative">
      {appState.tabsType === "analysis" ? null : <Header />}
      {tabComponentMap[appState.tabsType]}
    </div>
  )
}
