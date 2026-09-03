const menuItems = [
  { id: 'generate', label: '이메일 작성', description: '새 이메일 생성' },
  { id: 'smart-generate', label: 'Smart 작성', description: '상황 자동 분석' },
  { id: 'reply', label: '답장 작성', description: '이메일 답장' },
  { id: 'grammar', label: '문법 검사', description: '영문 교정' },
  { id: 'summarize', label: '요약 & 분석', description: '핵심 요약' },
  { id: 'analyze', label: '구조 분석', description: '심층 분석' },
  { id: 'extract-actions', label: '액션 추출', description: '작업 항목' },
  { id: 'regenerate', label: '톤 변경', description: '스타일 변경' },
]

export default function Sidebar({ activeTab, onTabChange }) {
  return (
    <aside className="w-72 bg-white border-r border-beige-100 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20">
      <div className="p-7 border-b border-beige-50">
        <div>
          <h2 className="font-bold text-stone-800 text-lg tracking-tight">Ben Lee's Workplace</h2>
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
                <div className="flex items-center">
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

    </aside>
  )
}
