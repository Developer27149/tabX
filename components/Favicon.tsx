import { type CSSProperties, useState } from "react"

import { getFavicon } from "~utils/common"

interface IProps {
  url: string
  styles?: CSSProperties
}
export default function ({ styles, url }: IProps) {
  return (
    <div className="inline-block p-1 rounded-sm bg-white relative">
      <img
        src={getFavicon(url)}
        style={{ width: "24px", height: "24px", ...styles }}
      />
    </div>
  )
}
