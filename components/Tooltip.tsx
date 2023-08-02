import * as Tooltip from "@radix-ui/react-tooltip"

interface IProps {
  children: React.ReactNode
  intro: React.ReactNode
  onClick?: () => void
}
export default function ({ children, intro, onClick }: IProps) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={200}>
        <Tooltip.Trigger asChild onClick={onClick}>
          {children}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            sideOffset={5}
            side="right"
            align="center"
            className="bg-blue-600 p-1 px-2 rounded-sm text-white">
            {intro}
            <Tooltip.Arrow className="fill-blue-600" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
