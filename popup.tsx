import "./style.css";
import "./styles/animation.css";



import { useAtom } from "jotai";
import { useEffect } from "react"
import toast, { Toaster } from "react-hot-toast"

import Container from "~components/Container"
import Loading from "~components/Loading"
import Menu from "~components/Menu"
import Setting from "~components/Setting"
import { allTabsStore, appStateStore } from "~store"
import { EShowMode } from "~types/appState"
import { delayAsyncCallback, disableContentMenu } from "~utils/common"
import { getAppState, setAppState } from "~utils/storage"
import { queryTabs } from "~utils/tabs"

function IndexPopup() {
  const [state, setState] = useAtom(appStateStore)
  const [, setTabsState] = useAtom(allTabsStore)
  useEffect(() => {
    const init = async () => {
      // get app state from storage
      const [tabs, prevAppState] = await Promise.all([
        delayAsyncCallback(queryTabs, 10),
        getAppState()
      ])
      setTabsState(tabs)
      setState({ ...prevAppState, showMode: EShowMode.normal })
      window._toast = toast
    }
    init()
    // disableContentMenu()
  }, [])

  // sync app state to storage
  useEffect(() => {
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