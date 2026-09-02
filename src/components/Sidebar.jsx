const menuItems = [
  { id: 'generate', label: '이메일 작성', icon: '✍️', description: '새 이메일 생성' },
  { id: 'smart-generate', label: 'Smart 작성', icon: '🧠', description: 'AI 자동 분석' },
  { id: 'reply', label: '답장 작성', icon: '↩️', description: '이메일 답장' },
  { id: 'grammar', label: '문법 검사', icon: '✓', description: '영문 교정' },
  { id: 'summarize', label: '요약 & 분석', icon: '📋', description: '핵심 요약' },
  { id: 'analyze', label: '구조 분석', icon: '🔍', description: '심층 분석' },
  { id: 'extract-actions', label: '액션 추출', icon: '📌', description: '작업 항목' },
  { id: 'regenerate', label: '톤 변경', icon: '🔄', description: '스타일 변경' },
]

export default function Sidebar({ activeTab, onTabChange }) {
  return (
    <aside className="w-72 bg-white border-r border-beige-100 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20">
      <div className="p-7 border-b border-beige-50">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 bg-beige-100 rounded-2xl flex items-center justify-center text-2xl shadow-inner border border-beige-200/50">
            ✉️
          </div>
          <div>
            <h2 className="font-bold text-stone-800 text-lg tracking-tight">Email Tools</h2>
            <p className="text-xs text-stone-400 font-medium mt-0.5">원하시는 기능을 선택하세요</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-5 scrollbar-hide">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onTabChange(item.id)}
                className={`w-full text-left px-4 py-3.5 rounded-2xl transition-all duration-300 ease-out font-medium group ${
                  activeTab === item.id
                    ? 'bg-beige-50 border border-beige-200/60 shadow-sm text-beige-900 translate-x-1'
                    : 'bg-transparent text-stone-500 hover:bg-beige-50/50 hover:text-stone-700 hover:translate-x-1'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className={`text-xl transition-transform duration-300 ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                    {item.icon}
                  </span>
                  <div className="flex-1">
                    <div className={`text-sm ${activeTab === item.id ? 'font-bold' : 'font-semibold'}`}>
                      {item.label}
                    </div>
                    <div className={`text-xs mt-0.5 ${activeTab === item.id ? 'text-beige-600' : 'text-stone-400'}`}>
                      {item.description}
                    </div>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-5">
        <div className="bg-gradient-to-br from-beige-50 to-white border border-beige-100 rounded-2xl p-4 text-xs text-stone-600 shadow-sm">
          <p className="font-bold mb-1.5 text-beige-800 flex items-center gap-1.5">
            <span className="animate-pulse">💡</span> Tip
          </p>
          <p className="leading-relaxed text-stone-500">Claude AI가 비즈니스 이메일 작성을 스마트하게 도와드립니다.</p>
        </div>
      </div>
    </aside>
  )
}