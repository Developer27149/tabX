import "../styles/loading.css"

import { getI18nByKey } from "~i18n"

export default function () {
  const msg = getI18nByKey("loading")
  return (
    <div className="w-[600px] h-[400px] flex justify-center items-center flex-col gap-8">
      <div id="loader">
        <div id="shadow"></div>
        <div id="box"></div>
      </div>
      <div className="text-[15px] relative top-32 text-blue">
        {msg}
      </div>
    </div>
  )
}
