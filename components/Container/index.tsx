import { useAtom } from "jotai"

import { appStateStore } from "~store"

import AllTabs from "./AllTabs"

export default function () {
  const [appState] = useAtom(appStateStore)

  return (
    <div className="bg-white w-full p-2">
      <AllTabs tabs={appState.tabs} />
    </div>
  )
}
