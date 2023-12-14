import { getI18nByKey } from "~i18n"

export default function ErrorBoundary() {
  return (
    <div className="w-[800px] h-[400px] flex justify-center items-center flex-col gap-8">
      <div className="m-4 text-[16px]">{getI18nByKey("errorTips")}</div>
      <div>
        📮{" "}
        <a href="mailto:rivenqinyy@gmail.com" className="text-blue-500 p-1">
          rivenqinyy@gmail.com
        </a>
      </div>
    </div>
  )
}
