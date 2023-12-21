import { CSSProperties } from "react"
import { getI18nByKey } from "~i18n"
import notFound from "data-base64:~assets//cat-not-found.png"

export default function ({
  style = {},
  tip
}: {
  style?: CSSProperties
  tip?: string
}) {
  return (
    <div
      className={"flex flex-col gap-0 items-center justify-center text-blue"}
      style={style}>
      <img src={notFound} className="w-[320px]" />
      <div>{tip ?? getI18nByKey("notFound")}</div>
    </div>
  )
}
