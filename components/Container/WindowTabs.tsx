import type { TTab } from "~types/browser"

interface IProps {
  tabs: TTab[]
}
export default function ({ tabs }: IProps) {
  return (
    <div>
      <span>windows</span>
    </div>
  )
}
