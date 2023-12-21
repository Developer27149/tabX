import clsx from "clsx"
import { useAtom, useAtomValue } from "jotai"
import { ChangeEvent, useMemo } from "react"
import { AiOutlineSound } from "react-icons/ai"
import { TfiSearch } from "react-icons/tfi"

import { getI18nByKey } from "~i18n"
import { appPersistentConfig, defaultFilter, filterStore } from "~store"
import { EMenuId } from "~types/menu"

export default function () {
  const config = useAtomValue(appPersistentConfig)
  const [filter, setFilter] = useAtom(filterStore)
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter({
      ...filter,
      query: e.target.value
    })
  }
  const showSearchOptions = [EMenuId.all, EMenuId.windows]

  const hiddenSelf = useMemo(
    () => !showSearchOptions.includes(config.menuId),
    [config.menuId]
  )

  return (
    <div
      className={clsx(
        "sticky top-0 left-0right-0 flex items-center w-full p-4 bg-white z-10",
        {
          hidden: hiddenSelf
        }
      )}>
      <input
        className="w-[120px] p-1 px-2 border border-gray-100 border-x-transparent border-t-transparent rounded-sm pr-8 focus:w-[200px] transition-all outline-none focus-visible:outline-none focus-visible:border-b-blue-200"
        placeholder={getI18nByKey("search")}
        value={filter.query}
        onChange={onChange}
        autoFocus
        onFocus={() =>
          setFilter((prev) => ({ ...prev, isFocusedSearch: true }))
        }
        onBlur={() =>
          setFilter((prev) => ({ ...prev, isFocusedSearch: false }))
        }
      />
      <button className="relative flex items-center justify-center right-5 select-none outline-none">
        <TfiSearch />
      </button>
      <div className="ml-auto text-blue flex gap-1 cursor-pointer">
        <AiOutlineSound
          onClick={() => {
            setFilter((prev) => ({ ...prev, isAudible: !prev.isAudible }))
          }}
          size={20}
          className={clsx({
            "opacity-20": filter.isAudible === false,
            "text-blue-400": filter.isAudible === true
          })}
        />
        {/* <IconSetting size={20} /> */}
      </div>
    </div>
  )
}
