export function Header() {
  return (
    <>
      {/* 这里的 pl-6 保持不变，控制整体离屏幕左边的距离 */}
      <span className="flex justify-self-start pl-6">
        {/* 👇 关键修改：把 gap-2 改成了 gap-6，大大增加了图标和文字的距离 */}
        <Link to="/" className="flex gap-6 items-center">
          <div className="h-10 w-10 bg-cover" title="logo" style={{ backgroundImage: "url(/icon.svg)" }} />
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
