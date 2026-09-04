import { useEffect, useState } from 'react'
import ProfessionalTermText from './ProfessionalTermText'

const labels = {
  original: '원문',
  improved: '개선된 문장',
  changes: '변경 사항',
  before: '변경 전',
  after: '변경 후',
  explanation: '변경 설명',
  summary: '요약',
  keyPoints: '핵심 내용',
  actionItems: '액션 아이템',
  deadline: '마감일',
  tone: '톤',
  reasoning: '분석 이유',
  reviewSummary: '검토 요약'
}

const labelFor = (key) => labels[key] || key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim()

function ValueView({ value }) {
  if (Array.isArray(value)) {
    return <div className="space-y-2">{value.map((item, index) => <div key={index} className="rounded-xl bg-white/70 p-3 shadow-neu-inset">{typeof item === 'object' && item !== null ? <ValueView value={item} /> : <p className="whitespace-pre-wrap text-sm text-stone-800">{String(item)}</p>}</div>)}</div>
  }

  if (typeof value === 'object' && value !== null) {
    return <div className="space-y-2">{Object.entries(value).map(([key, nestedValue]) => <div key={key}><h5 className="text-xs font-bold text-stone-500 mb-1">{labelFor(key)}</h5><ValueView value={nestedValue} /></div>)}</div>
  }

  return <p className="whitespace-pre-wrap text-sm text-stone-800 leading-relaxed">{value === null ? '없음' : String(value)}</p>
}

export default function ResultDisplay({ result, loading }) {
  const [copied, setCopied] = useState(false)
  const [editedContent, setEditedContent] = useState(result?.content || '')

  useEffect(() => {
    setEditedContent(result?.content || '')
  }, [result?.content])

  const copyResult = async () => {
    const text = typeof result === 'string'
      ? result
        : result?.subject || result?.content
        ? [`제목: ${result.subject || ''}`, `본문:\n${editedContent}`, result.koreanTranslation ? `한국어 번역:\n${result.koreanTranslation}` : ''].filter(Boolean).join('\n\n')
        : JSON.stringify(result, null, 2)
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      textarea.remove()
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
        <div className="w-12 h-12 border-4 border-stone-200 border-t-stone-900 rounded-full animate-spin mb-4"></div>
        <p className="text-stone-600 font-medium">얼른 이메일 보내고 칼퇴하자...</p>
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
          onClick={copyResult}
          className="px-4 py-2 text-sm bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg transition-colors font-medium"
        >
          {copied ? '복사됨' : '복사'}
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
                {result.content && <div><h4 className="font-bold text-stone-700 mb-1">본문</h4><p className="text-sm text-stone-800 whitespace-pre-wrap leading-relaxed"><ProfessionalTermText text={editedContent} onChange={setEditedContent} /></p><p className="term-help">밑줄이 있는 단어를 누르면 대체 가능한 전문 용어를 확인할 수 있습니다.</p></div>}
                {result.koreanTranslation && <div className="border-t border-stone-200 pt-3"><h4 className="font-bold text-stone-700 mb-1">한국어 번역</h4><p className="text-sm text-stone-800 whitespace-pre-wrap leading-relaxed"><ProfessionalTermText text={result.koreanTranslation} /></p></div>}
              </div>
            )}
            {Object.entries(result).filter(([key]) => !['subject', 'content', 'koreanTranslation'].includes(key)).map(([key, value]) => (
              <div key={key} className="border-b border-stone-200 pb-4 last:border-0">
                <h4 className="font-bold text-stone-700 mb-2.5 capitalize text-sm">{key.replace(/_/g, ' ')}</h4>
                <ValueView value={value} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
