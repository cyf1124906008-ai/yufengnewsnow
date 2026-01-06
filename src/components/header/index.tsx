import { Link } from "@tanstack/react-router"
import { useIsFetching } from "@tanstack/react-query"
import type { SourceID } from "@shared/types"
import { NavBar } from "../navbar"
import { currentSourcesAtom, goToTopAtom } from "~/atoms"

function GoTop() {
  const { ok, fn: goToTop } = useAtomValue(goToTopAtom)
  return (
    <button
      type="button"
      title="Go To Top"
      className={$("i-ph:arrow-fat-up-duotone", ok ? "op-50 btn" : "op-0")}
      onClick={goToTop}
    />
  )
}

function Refresh() {
  const currentSources = useAtomValue(currentSourcesAtom)
  const { refresh } = useRefetch()
  const refreshAll = useCallback(() => refresh(...currentSources), [refresh, currentSources])

  const isFetching = useIsFetching({
    predicate: (query) => {
      const [type, id] = query.queryKey as ["source" | "entire", SourceID]
      return (type === "source" && currentSources.includes(id)) || type === "entire"
    },
  })

  return (
    <button
      type="button"
      title="Refresh"
      // 保持之前的修改：刷新按钮大一点 (text-3xl)
      className={$("i-ph:arrow-counter-clockwise-duotone btn text-3xl", isFetching && "animate-spin i-ph:circle-dashed-duotone")}
      onClick={refreshAll}
    />
  )
}

export function Header() {
  return (
    <>
      <span className="flex justify-self-start pl-6">
        {/* 👇 修改点1：间距加大到 gap-8，防止文字挡住大图 */}
        <Link to="/" className="flex gap-8 items-center">
          
          {/* 👇 修改点2：图片放大到 h-20 w-20 (80px)，加了圆角和居中 */}
          {/* 注意：这里已经帮你改成了 icon.png */}
          <div 
            className="h-20 w-20 bg-cover bg-center rounded-md" 
            title="logo" 
            style={{ backgroundImage: "url(/icon.png)" }} 
          />
          
          <span className="text-2xl font-brand font-bold flex items-center gap-1">
            <span className="color-primary-6">YF</span>
            <span>新闻热榜</span>
          </span>
        </Link>
      </span>
      <span className="justify-self-center">
        <span className="hidden md:(inline-block)">
          <NavBar />
        </span>
      </span>
      <span className="justify-self-end flex gap-2 items-center text-xl text-primary-600 dark:text-primary">
        <GoTop />
        <Refresh />
      </span>
    </>
  )
}
