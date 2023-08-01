import "./style.css"

import { useEffect, useState } from "react"

import Container from "~components/Container"
import Loading from "~components/Loading"
import Menu from "~components/Menu"
import Setting from "~components/Setting"
import type { IAppState } from "~types/appState"

function IndexPopup() {
  const [state, setState] = useState<IAppState>()
  const [isSetting, setIsSetting] = useState(false)
  useEffect(() => {
    // init fetch data
    const init = async () => {
      const tabs = await chrome.tabs.query({})
      console.log(tabs)
      setState({ tabs })
    }
    init()
  }, [])
  if (state === undefined) return <Loading />
  if (isSetting) return <Setting />
  return (
    <div className="w-[800px] flex h-[400px]">
      <Menu />
      <Container />
    </div>
  )
}

export default IndexPopup
