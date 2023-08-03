import { useAtom } from "jotai"
import { useEffect, useState } from "react"

import { appStateStore } from "~store"
import type { TTab } from "~types/browser"

import AllTabs from "./AllTabs"
import DomainTabs from "./DomainTabs"
import Header from "./Header"

export default function () {
  const [appState, setAppState] = useAtom(appStateStore)
  const [tabs, setTabs] = useState<TTab[]>([])

  useEffect(() => {
    if (appState.searchQuery.trim() === "") return setTabs(appState.tabs)
    const keywordOption = appState.searchQuery.trim().toUpperCase().split(" ")
    const newTabs = appState.tabs.filter((tab) => {
      return keywordOption.every((keyword) => {
        return (
          tab.title.toUpperCase().includes(keyword) ||
          tab.url.toUpperCase().includes(keyword)
        )
      })
    })
    console.log("new tabs:", newTabs)
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
  }, [appState.searchQuery])

  const tabComponentMap = {
    all: <AllTabs tabs={tabs} />,
    domain: <DomainTabs tabs={tabs} />
  }

  return (
    <div className="w-[756px] h-[500px] p-2 pb-16 relative">
      <Header />
      {tabComponentMap[appState.tabsType]}
    </div>
  )
}
