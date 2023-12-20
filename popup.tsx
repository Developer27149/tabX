import "./style.css";
import "./styles/animation.css";

import { allTabsStore, appPersistentConfig } from "~store"
import { getAppState, setAppState } from "~utils/storage"
import toast, { Toaster } from "react-hot-toast"
import { useEffect, useState } from "react"

import Container from "~components/Container"
import { ErrorBoundary } from "react-error-boundary"
import ErrorBoundaryFallback from "~components/ErrorBoundaryFallback"
import Loading from "~components/Loading"
import Menu from "~components/Menu"
import TabQuery from "~components/TabQuery"
import { asyncWait } from "~utils/common"
import { queryTabs } from "~utils/tabs"
import { useSetAtom } from "jotai"

function IndexPopup() {
  return (
    <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
      <Content />
    </ErrorBoundary>
  )
}

function Content() {
  const [loading, setLoading] = useState(true)
  const setGlobalConfig = useSetAtom(appPersistentConfig)
  const setTabsState = useSetAtom(allTabsStore)
  const init = async () => {
    const [tabs, config] = await Promise.all([
      queryTabs(),
      getAppState(),
      asyncWait()
    ])
    setTabsState(tabs)
    setGlobalConfig(config)
    setLoading(false)
  }

  useEffect(() => {
    globalThis._toast = toast
    init()
    // disableContentMenu()
  }, [])

  if (loading) return <Loading />
  return (
    <div className="w-[800px] h-[420px] flex">
      <Menu />
      <div className="flex-grow h-[420px] overflow-y-scroll relative">
        <TabQuery />
        <Container />
      </div>
      <Toaster />
    </div>
  )
}

export default IndexPopup