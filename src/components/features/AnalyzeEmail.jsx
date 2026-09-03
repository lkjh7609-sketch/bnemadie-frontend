import { useState } from 'react'
import { fetchAPI } from '../../api'

export default function AnalyzeEmail({ setResult, loading, setLoading, outputLanguage }) {
  const [emailText, setEmailText] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!emailText.trim()) {
      alert('이메일 텍스트를 입력해주세요')
      return
    }

    setLoading(true)
    try {
      const data = await fetchAPI('/email/analyze', {
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
      <h2 className="text-xl font-semibold text-gray-900">구조 분석</h2>
      <p className="text-sm text-gray-600">이메일의 맥락, 관계, 비즈니스 의미를 심층 분석합니다.</p>
      
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <span className="text-purple-600 text-lg">🔬</span>
          <div className="text-sm text-purple-900">
            <p className="font-medium mb-1">심층 분석 항목:</p>
            <ul className="list-disc list-inside space-y-1 text-purple-800">
              <li>발신자/수신자 관계 (상사/동료/고객)</li>
              <li>긴급도 및 우선순위</li>
              <li>감정 톤 및 의도</li>
              <li>비즈니스 맥락 및 리스크</li>
              <li>응답 필요 여부 및 권장 타임라인</li>
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
            placeholder="분석하고 싶은 이메일 전체 내용을 붙여넣으세요\n\n발신자, 수신자 정보가 포함되면 더 정확한 분석이 가능합니다"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {loading ? '얼른 이메일 보내고 칼퇴하자...' : '구조 분석 시작'}
        </button>
      </form>
    </div>
  )
}
