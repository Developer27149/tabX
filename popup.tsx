import "./style.css"
import "./styles/animation.css"

import { allTabsStore, appStateStore } from "~store"
import {
  asyncWait,
  delayAsyncCallback,
  disableContentMenu
} from "~utils/common"
import { getAppState, setAppState } from "~utils/storage"
import toast, { Toaster } from "react-hot-toast"

import Container from "~components/Container"
import { EShowMode } from "~types/appState"
import Loading from "~components/Loading"
import Menu from "~components/Menu"
import Setting from "~components/Setting"
import { queryTabs } from "~utils/tabs"
import { useAtom } from "jotai"
import { useEffect } from "react"

function IndexPopup() {
  const [state, setState] = useAtom(appStateStore)
  const [, setTabsState] = useAtom(allTabsStore)
  useEffect(() => {
    const init = async () => {
      const tabs = await queryTabs()
      const prevAppState = await getAppState()
      await asyncWait()
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
