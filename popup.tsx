import "./style.css"
import "./styles/animation.css"

import { useAtom } from "jotai"
import { useEffect } from "react"
import toast, { Toaster } from "react-hot-toast"

import Container from "~components/Container"
import ErrorBoundary from "~components/ErrorBoundary"
import Loading from "~components/Loading"
import Menu from "~components/Menu"
import Setting from "~components/Setting"
import { allTabsStore, appStateStore } from "~store"
import { EShowMode } from "~types/appState"
import { asyncWait } from "~utils/common"
import { getAppState, setAppState } from "~utils/storage"
import { queryTabs } from "~utils/tabs"

function IndexPopup() {
  const [state, setState] = useAtom(appStateStore)
  const [, setTabsState] = useAtom(allTabsStore)
  useEffect(() => {
    const init = async () => {
      try {
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
      } catch (error) {
        console.error("init error", error)
        setState((prev) => ({ ...prev, showMode: EShowMode.error }))
      }
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
  if (state.showMode === EShowMode.error) return <ErrorBoundary />
  return (
    <div className="w-[800px] flex">
      <Menu />
      <Container />
      <Toaster />
    </div>
  )
}

export default IndexPopup
