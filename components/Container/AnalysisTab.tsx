import chartXkcd from "chart.xkcd"
import { Bar } from "chart.xkcd-react"
import { useAtom } from "jotai"
import { useEffect, useMemo, useState } from "react"

import { getI18nByKey, i18n } from "~i18n"
import { allTabsStore, appStateStore } from "~store"
import { EArea } from "~types/browser"
import { EStorageKey, getFromStorage } from "~utils/storage"
import { getDefaultAnalysisData } from "~utils/tabs"

interface IConfig {
  title: string
  xLabel: string
  yLabel: string
  data: {
    labels: string[]
    datasets: {
      data: number[]
    }[]
  }
  options: {
    yTickCount: number
    legendPosition?: string
  }
}

export default function () {
  const [appState] = useAtom(appStateStore)
  const [tabs] = useAtom(allTabsStore)

  const [config, setConfig] = useState<IConfig>()
  const xLabel = getI18nByKey("analysisXLabel")
  const yLabel = getI18nByKey("analysisYLabel")

  useEffect(() => {
    const zhTitle = i18n["zh-CN"].analysisTitle
    const enTitle = i18n.en.analysisTitle
    getFromStorage<Record<string, number>[]>(
      EStorageKey.dailyOpenTabs,
      EArea.sync,
      []
    ).then(async (res) => {
      let _res = res.length === 0 ? await getDefaultAnalysisData() : res
      console.log("tab analysis", _res)

      setConfig({
        title: appState.language === "zh-CN" ? zhTitle : enTitle,
        xLabel,
        yLabel,
        data: {
          labels: _res.map((item) => Object.keys(item)[0]?.slice(5)),
          datasets: [
            {
              data: _res.map((item) => Object.values(item)[0])
            }
          ]
        },
        options: {
          // optional
          yTickCount: 2
          // legendPosition: chartXkcd.config.positionType.upLeft
        }
      })
    })
  }, [appState.language, xLabel, yLabel])

  return <div>{config && <Bar config={config} />}</div>
}
