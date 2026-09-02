export default function Header() {
  return (
    <header className="bg-white border-b border-stone-200 px-8 py-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 tracking-tight">AI Business Email</h1>
          <p className="text-sm text-stone-600 mt-1.5 font-medium">Claude AI로 전문적인 이메일을 작성하세요</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-4 py-2 bg-stone-100 text-stone-700 text-sm font-semibold rounded-full">Phase 3</span>
        </div>
      </div>
    </header>
  )
}