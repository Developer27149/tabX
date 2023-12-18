import "./style.css";
import "./styles/animation.css";

import { allTabsStore, appStateStore } from "~store";
import { getAppState, setAppState } from "~utils/storage";
import toast, { Toaster } from "react-hot-toast";

import Container from "~components/Container";
import { EShowMode } from "~types/appState";
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryFallback from "~components/ErrorBoundaryFallback";
import Loading from "~components/Loading";
import Menu from "~components/Menu";
import Setting from "~components/Setting";
import { queryTabs } from "~utils/tabs";
import { useAtom } from "jotai";
import { useEffect } from "react";

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
    window._toast = toast
    const init = async () => {
      try {
        const [tabs, prevAppState] = await Promise.all([
          queryTabs(),
          getAppState()
        ])
        setTabsState(tabs)
        const newState = { ...prevAppState, showMode: EShowMode.normal }
        if (newState.showMode === EShowMode.loading) {
          newState.showMode = EShowMode.normal
        }
        setState(newState)
      } catch (error) {
        console.log("init failed", error)
      }
    }
    init()
    // disableContentMenu()
  }, [])

  // sync app state to storage
  useEffect(() => {
    // if (state.showMode !== EShowMode.loading) {

    // }
    setAppState(state)
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