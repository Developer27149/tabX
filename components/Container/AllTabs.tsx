import { allTabsStore, filterStore } from "~store"

import NotFound from "~components/NotFound"
import type { TTab } from "~types/browser"
import Tab from "./Tab"
import { useAtomValue } from "jotai"
import { useMemo } from "react"

export default function () {
  const allTabs = useAtomValue(allTabsStore)
  const filter = useAtomValue(filterStore)

  // 默认采用状态过滤，搜索后采用分数排序
  const filterTabs = (tabs: TTab[]) => {
    if (filter.query.trim() === "") {
      return tabs
        .sort((_, b) => (b.active ? 1 : -1))
        .filter(({ audible }) => audible === filter.isAudible)
    }
    return tabs
      .filter((tab) => {
        const { query } = filter
        const { title, url } = tab
        if (query?.trim() === "") return true
        // 筛选
        const keywordOption = query?.trim().toUpperCase().split(" ") ?? []
        return keywordOption?.some((keyword) => {
          return (
            title.toUpperCase().includes(keyword) ||
            url.toUpperCase().includes(keyword)
          )
        })
      })
      .sort((a, b) => {
        // 标题 3 分，URL 2 分，分数越高越靠前
        const { query } = filter
        const keywordOption = query?.trim().toUpperCase().split(" ") ?? []
        const aScore = keywordOption.reduce((acc, cur) => {
          return (
            acc +
            (a.title.toUpperCase().includes(cur.toUpperCase()) ? 3 : 0) +
            (a.url.toUpperCase().includes(cur.toUpperCase()) ? 2 : 0)
          )
        }, 0)
        const bScore = keywordOption.reduce((acc, cur) => {
          return (
            acc +
            (b.title.toUpperCase().includes(cur.toUpperCase()) ? 3 : 0) +
            (b.url.toUpperCase().includes(cur.toUpperCase()) ? 2 : 0)
          )
        })
        return +bScore - +aScore
      })
      .filter((tab) => {
        return filter.isAudible ? tab.audible : true
      })
  }

  const tabList = useMemo(() => filterTabs(allTabs), [allTabs, filter])

  return (
    <div className="h-full overflow-y-auto pb-32">
      {tabList.map((tab) => (
        <Tab key={tab.id} tab={tab} />
      ))}
      {tabList.length === 0 && filter.query.trim() !== "" && (
        <NotFound
          style={{
            height: "320px"
          }}
        />
      )}
    </div>
  )
}
