import { useAtom } from "jotai"
import { useEffect } from "react"
import { ErrorBoundary } from "react-error-boundary"
import toast, { Toaster } from "react-hot-toast"

import Container from "~components/Container"
import ErrorBoundaryFallback from "~components/ErrorBoundaryFallback"
import Loading from "~components/Loading"
import Menu from "~components/Menu"
import Setting from "~components/Setting"
import { allTabsStore, appStateStore } from "~store"
import { EShowMode } from "~types/appState"
import { getAppState, setAppState } from "~utils/storage"
import { queryTabs } from "~utils/tabs"

import "./style.css"
import "./styles/animation.css"

function IndexPopup() {
  return (
    <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
      <Content />
    </ErrorBoundary>
  )
}

function Content() {
  const [state, setState] = useAtom(appStateStore)
  const [, setTabsState] = useAtom(allTabsStore)
  useEffect(() => {
    globalThis["x"]()
    const init = async () => {
      const [tabs, prevAppState] = await Promise.all([
        queryTabs(),
        getAppState()
      ])
      // await asyncWait()
      setTabsState(tabs)
      const newState = { ...prevAppState, showMode: EShowMode.normal }
      if (newState.showMode === EShowMode.loading) {
        newState.showMode = EShowMode.normal
      }
      setState(newState)
      window._toast = toast
    }
    init()
    // disableContentMenu()
  }, [])

  // sync app state to storage
  useEffect(() => {
    if (state.showMode !== EShowMode.loading) {
      setAppState(state)
    }
  }, [state])
  if (state.showMode === EShowMode.loading) return <Loading />
  if (state.showMode === EShowMode.setting) return <Setting />
  return (
    <div className="w-[800px] flex">
      <Menu />
      <Container />
      <Toaster />
    </div>
  )
}

export default IndexPopup
