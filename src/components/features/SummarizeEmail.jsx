import { useState } from 'react'
import { fetchAPI } from '../../api'

export default function SummarizeEmail({ setResult, loading, setLoading, outputLanguage }) {
  const [emailText, setEmailText] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!emailText.trim()) {
      alert('이메일 텍스트를 입력해주세요')
      return
    }

    setLoading(true)
    try {
      const data = await fetchAPI('/email/summarize', {
        method: 'POST',
        body: JSON.stringify({ input: emailText, inputLang: 'auto', outputLang: outputLanguage })
      })
      setResult(data)
    } catch (error) {
      alert(`오류: ${error.message}`)
      setResult(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">요약 & 분석</h2>
      <p className="text-sm text-gray-600">이메일의 핵심 내용, 액션 아이템, 마감일을 추출합니다.</p>
      
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <span className="text-indigo-600 text-lg">📊</span>
          <div className="text-sm text-indigo-900">
            <p className="font-medium mb-1">AI가 추출하는 정보:</p>
            <ul className="list-disc list-inside space-y-1 text-indigo-800">
              <li>핵심 요약 (한 문장)</li>
              <li>주요 내용 (bullet points)</li>
              <li>액션 아이템 (해야 할 일)</li>
              <li>마감일 및 중요 날짜</li>
            </ul>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">이메일 텍스트</label>
          <textarea
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[200px]"
            placeholder="요약하고 싶은 이메일 전체 내용을 붙여넣으세요"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {loading ? '분석 중...' : '요약 & 분석 시작'}
        </button>
      </form>
    </div>
  )
}
