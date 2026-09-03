import { useState } from 'react'
import { fetchAPI } from '../../api'

export default function ExtractActions({ setResult, loading, setLoading, outputLanguage }) {
  const [emailText, setEmailText] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!emailText.trim()) {
      alert('이메일 텍스트를 입력해주세요')
      return
    }

    setLoading(true)
    try {
      const data = await fetchAPI('/email/extract-actions', {
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
      <h2 className="text-xl font-semibold text-gray-900">액션 추출</h2>
      <p className="text-sm text-gray-600">이메일에서 실행 가능한 작업을 상세하게 추출합니다.</p>
      
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <span className="text-emerald-600 text-lg">✅</span>
          <div className="text-sm text-emerald-900">
            <p className="font-medium mb-1">추출되는 정보:</p>
            <ul className="list-disc list-inside space-y-1 text-emerald-800">
              <li>작업 설명 및 담당자</li>
              <li>마감일 및 우선순위 (critical/high/medium/low)</li>
              <li>상태 (requested/committed/pending/in-progress)</li>
              <li>의존성 및 선행 조건</li>
              <li>예상 결과물</li>
              <li>커밋먼트 vs 요청 구분</li>
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
            placeholder="액션 아이템을 추출하고 싶은 이메일 내용을 붙여넣으세요\n\n예: 프로젝트 회의록, 업무 지시, 협업 요청 등"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {loading ? '추출 중...' : '액션 아이템 추출'}
        </button>
      </form>
    </div>
  )
}
