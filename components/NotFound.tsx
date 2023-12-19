import notFound from "data-base64:~assets//cat-not-found.png"
import { CSSProperties } from "react"

import { getI18nByKey } from "~i18n"

export default function ({ style = {} }: { style?: CSSProperties }) {
  return (
    <div
      className={"flex flex-col gap-0 items-center justify-center text-blue"}
      style={style}>
      <img src={notFound} className="w-[320px]" />
      <div>{getI18nByKey("notFound")}</div>
    </div>
  )
}
