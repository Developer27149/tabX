import { Bar, Line, Pie, XY } from "chart.xkcd-react"
import { EStorageKey, getFromStorage } from "~utils/storage"
import { allTabsStore, appStateStore } from "~store"
import { getI18nByKey, i18n } from "~i18n"
import { useEffect, useMemo, useState } from "react"

import { EArea } from "~types/browser"
import chartXkcd from "chart.xkcd"
import { queryTabs } from "~utils/tabs"
import { useAtom } from "jotai"

interface IConfig {
  title: string
  xLabel: string
  yLabel: string
  data: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
    }[]
  }
  options: {
    yTickCount: number
    legendPosition: string
  }
}

export default function () {
  const [appState] = useAtom(appStateStore)
  const [tabs] = useAtom(allTabsStore)

  const [labels, setLabels] = useState([1, 2, 3, 4, 5, 6, 7])
  const [config, setConfig] = useState<IConfig>()

  useEffect(() => {
    const zhTitle = i18n["zh-CN"].analysisTitle
    const enTitle = i18n.en.analysisTitle
    getFromStorage(EStorageKey.dailyOpenTabs, EArea.sync, []).then((res) => {
      setConfig({
        title: appState.language === "zh-CN" ? zhTitle : enTitle,
        xLabel: getI18nByKey("analysisXLabel"),
        yLabel: getI18nByKey("analysisYLabel"),
        data: {
          labels: Array.from({ length: res.length }, (_, i) => `${i + 1}`),
        }
      })
    })
  }, [appState.language])

  return (
    <div>
      <Line
        config={{
          title: "ok", // optional
          xLabel: "Month", // optional
          yLabel: "$ Dollors", // optional
          data: {
            labels,
            datasets: [
              {
                label: "Plan",
                data: [30, 70, 200, 300, 500, 800, 1500, 2900, 5000, 8000]
              },
              {
                label: "Reality",
                data: [0, 1, 30, 70, 80, 100, 50, 80, 40, 150]
              }
            ]
          },
          options: {
            // optional
            yTickCount: 3,
            legendPosition: chartXkcd.config.positionType.upLeft
          }
        }}
      />
    </div>
  )
}
