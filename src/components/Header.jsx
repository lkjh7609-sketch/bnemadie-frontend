export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-beige-100 px-8 py-6 sticky top-0 z-10">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div>
          <h1 className="text-2xl font-extrabold text-stone-800 tracking-tight flex items-center gap-2">
            ✨ 신과장 이메일 잘쓰세요 툴
          </h1>
          <p className="text-sm text-stone-500 mt-1 font-medium tracking-wide">
            신과장 전용 이메일 툴
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-4 py-1.5 bg-beige-50 border border-beige-200 text-beige-800 text-xs font-bold rounded-full shadow-sm">
            Phase 3
          </span>
        </div>
      </div>
    </header>
  )
}