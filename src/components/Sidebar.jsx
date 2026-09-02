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
    <aside className="w-72 bg-white border-r border-stone-200 flex flex-col">
      <div className="p-6 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-stone-700 to-stone-900 rounded-2xl flex items-center justify-center text-white text-2xl shadow-sm">
            ✉️
          </div>
          <div>
            <h2 className="font-bold text-stone-900 text-lg">Email Tools</h2>
            <p className="text-xs text-stone-500 font-medium">기능을 선택하세요</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1.5">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onTabChange(item.id)}
                className={`w-full text-left px-4 py-3.5 rounded-xl transition-all font-medium ${
                  activeTab === item.id
                    ? 'bg-stone-900 text-white shadow-md'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{item.label}</div>
                    <div className="text-xs opacity-80 mt-0.5">{item.description}</div>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-stone-100">
        <div className="bg-stone-50 rounded-xl p-4 text-xs text-stone-600">
          <p className="font-bold mb-1.5 text-stone-800">💡 Tip</p>
          <p className="leading-relaxed">Claude AI가 비즈니스 이메일 작성을 도와드립니다.</p>
        </div>
      </div>
    </aside>
  )
}