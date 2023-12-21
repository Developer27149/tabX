import NotFound from "~components/NotFound"
import { allTabsStore, filterStore } from "~store"
import hotkeys from "hotkeys-js";
import { useAtomValue } from "jotai"
import { useEffect, useMemo, useRef, useState } from "react"

import type { TTab } from "~types/browser"

import Tab from "./Tab"

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
  const currentTabId = useRef<number>()
  const tabList = useMemo(() => filterTabs(allTabs), [allTabs, filter])
  const hadInit = useRef(false)
  useEffect(() => {
    if (hadInit.current === false) {
      hadInit.current = true
      hotkeys("j", (event) => {
        const activeTab = document.querySelector(".tab.bg-blue-light")
        if (activeTab) {
          // remove it's active class, set to it's next sibling
          activeTab.classList.remove("bg-blue-light")
          const nextTab = activeTab.nextElementSibling as HTMLElement
          if (nextTab && nextTab.classList.contains("tab")) {
            nextTab.classList.add("bg-blue-light")
            currentTabId.current = +nextTab.dataset.id
          } else {
            currentTabId.current = undefined
          }
        } else {
          const firstTab: HTMLElement = document.querySelector(".tab")
          if (firstTab) {
            firstTab.classList.add("bg-blue-light")
            currentTabId.current = +firstTab.dataset.id
          } else {
            currentTabId.current = undefined
          }
        }
      })
      hotkeys("k", () => {
        const activeTab = document.querySelector(".tab.bg-blue-light")
        if (activeTab) {
          // remove it's active class, set to it's next sibling
          activeTab.classList.remove("bg-blue-light")
          const prevTab = activeTab.previousElementSibling as HTMLElement
          if (prevTab && prevTab.classList.contains("tab")) {
            prevTab.classList.add("bg-blue-light")
            currentTabId.current = +prevTab.dataset.id
          } else {
            currentTabId.current = undefined
          }
        } else {
          const lastTab: HTMLElement = document.querySelector(".tab:last-child")
          if (lastTab) {
            lastTab.classList.add("bg-blue-light")
            currentTabId.current = +lastTab.dataset.id
          } else {
            currentTabId.current = undefined
          }
        }
      })
    }
    return () => {
      hotkeys.unbind("j")
      hotkeys.unbind("k")
    }
  }, [filter])

  return (
    <div className="h-full overflow-y-auto pb-32 outline-none scene">
      {tabList.map((tab) => (
        <Tab
          key={tab.id}
          tab={tab}
          onMouseEnter={(e) => {
            const prevElem = document.querySelector(".tab.bg-blue-light")
            prevElem?.classList.remove("bg-blue-light")
            e.currentTarget.classList.add("bg-blue-light")
            currentTabId.current = tab.id
          }}
          onMouseLeave={(e) => {
            e.currentTarget.classList.remove("bg-blue-light")
            currentTabId.current = undefined
          }}
          data-id={tab.id}
        />
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