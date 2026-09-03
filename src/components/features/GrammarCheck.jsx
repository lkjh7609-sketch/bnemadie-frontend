import { useState } from 'react'
import { fetchAPI } from '../../api'

export default function GrammarCheck({ setResult, loading, setLoading }) {
  const [emailText, setEmailText] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!emailText.trim()) {
      alert('이메일 텍스트를 입력해주세요')
      return
    }

    setLoading(true)
    try {
      const data = await fetchAPI('/email/grammar', {
        method: 'POST',
        body: JSON.stringify({ input: emailText })
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
      <h2 className="text-xl font-semibold text-gray-900">문법 검사</h2>
      <p className="text-sm text-gray-600">영문 이메일의 문법, 철자, 스타일을 개선합니다.</p>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <span className="text-yellow-600 text-lg">⚠️</span>
          <div className="text-sm text-yellow-900">
            <p className="font-medium mb-1">영어 이메일 전용</p>
            <p className="text-yellow-800">이 기능은 영문 이메일의 문법 및 스타일 개선에 최적화되어 있습니다.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">이메일 텍스트</label>
          <textarea
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[200px] font-mono text-sm"
            placeholder="Dear Mr. Smith,\n\nI hope your doing well. I wanted to reach out regarding...\n\nBest regard,\nJohn"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {loading ? '검사 중...' : '문법 검사 시작'}
        </button>
      </form>
    </div>
  )
}
