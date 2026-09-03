export default function ResultDisplay({ result, loading, activeTab }) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
        <div className="w-12 h-12 border-4 border-stone-200 border-t-stone-900 rounded-full animate-spin mb-4"></div>
        <p className="text-stone-600 font-medium">AI가 처리 중입니다...</p>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-stone-400">
        <svg className="w-24 h-24 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <p className="text-lg font-semibold text-stone-500">결과가 여기에 표시됩니다</p>
        <p className="text-sm mt-2 text-stone-400">왼쪽에서 옵션을 입력하고 생성 버튼을 클릭하세요</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-stone-900">결과</h3>
        <button
          onClick={() => navigator.clipboard.writeText(typeof result === 'string' ? result : JSON.stringify(result, null, 2))}
          className="px-4 py-2 text-sm bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg transition-colors font-medium"
        >
          📋 복사
        </button>
      </div>
      
      <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 max-h-[600px] overflow-y-auto">
        {typeof result === 'string' ? (
          <pre className="whitespace-pre-wrap text-sm text-stone-800 leading-relaxed">{result}</pre>
        ) : (
          <div className="space-y-4">
            {(result.subject || result.content) && (
              <div className="bg-white rounded-lg border border-stone-200 p-4 space-y-3">
                {result.subject && <div><h4 className="font-bold text-stone-700 mb-1">제목</h4><p className="text-sm text-stone-800">{result.subject}</p></div>}
                {result.content && <div><h4 className="font-bold text-stone-700 mb-1">본문</h4><p className="text-sm text-stone-800 whitespace-pre-wrap leading-relaxed">{result.content}</p></div>}
                {result.koreanTranslation && <div className="border-t border-stone-200 pt-3"><h4 className="font-bold text-stone-700 mb-1">한국어 번역</h4><p className="text-sm text-stone-800 whitespace-pre-wrap leading-relaxed">{result.koreanTranslation}</p></div>}
              </div>
            )}
            {Object.entries(result).filter(([key]) => !['subject', 'content', 'koreanTranslation'].includes(key)).map(([key, value]) => (
              <div key={key} className="border-b border-stone-200 pb-4 last:border-0">
                <h4 className="font-bold text-stone-700 mb-2.5 capitalize text-sm">{key.replace(/_/g, ' ')}</h4>
                {Array.isArray(value) ? (
                  <ul className="space-y-2.5">
                    {value.map((item, idx) => (
                      <li key={idx} className="bg-white p-3.5 rounded-lg border border-stone-200">
                        {typeof item === 'object' ? (
                          <pre className="text-xs text-stone-600 whitespace-pre-wrap leading-relaxed">{JSON.stringify(item, null, 2)}</pre>
                        ) : (
                          <p className="text-sm text-stone-800 leading-relaxed">{item}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : typeof value === 'object' ? (
                  <pre className="text-xs text-stone-600 whitespace-pre-wrap bg-white p-3.5 rounded-lg border border-stone-200 leading-relaxed">{JSON.stringify(value, null, 2)}</pre>
                ) : (
                  <p className="text-sm text-stone-800 whitespace-pre-wrap leading-relaxed">{value}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
