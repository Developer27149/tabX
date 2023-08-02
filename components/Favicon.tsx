import clsx from "clsx"
import { type CSSProperties, useState } from "react"
import { TbWorldWww } from "react-icons/tb"

interface IProps {
  src: string
  styles?: CSSProperties
}
export default function ({ src, styles }: IProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="inline-block p-1 rounded-sm bg-white relative">
      {!isLoaded && (
        <TbWorldWww className="absolute inset-0 w-full h-full p-1 text-blue-400" />
      )}
      <img
        src={src}
        style={{ width: "24px", height: "24px", ...styles }}
        className={clsx({ "opacity-0": !isLoaded })}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  )
}
