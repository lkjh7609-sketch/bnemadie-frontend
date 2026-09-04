import { useState } from 'react'
import { fetchAPI } from '../../api'
import RecipientDetails from '../RecipientDetails'

export default function SmartGenerate({ setResult, loading, setLoading, outputLanguage, languageSelector, regulatoryReferenceId }) {
  const [userInput, setUserInput] = useState('')
  const [recipientDetails, setRecipientDetails] = useState({ recipientName: '', recipientCompany: '', recipientRole: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!userInput.trim()) {
      alert('이메일 내용을 입력해주세요')
      return
    }

    setLoading(true)
    try {
      const data = await fetchAPI('/email/smart-generate', {
        method: 'POST',
        body: JSON.stringify({ userInput, inputLang: 'auto', outputLang: outputLanguage, recipientDetails, regulatoryReferenceId })
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
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-stone-900">Smart 작성</h2>
        <p className="text-sm text-stone-600 mt-1.5">상황에 맞는 톤과 스타일을 자동으로 선택합니다.</p>
        {languageSelector}
      </div>
      
      <div className="advice-box bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start gap-2.5">
          <span className="text-amber-600 text-lg">💡</span>
          <div className="text-sm text-amber-900">
            <p className="font-bold mb-1.5">자동으로 분석하는 항목:</p>
            <ul className="list-disc list-inside space-y-1 text-amber-800 leading-relaxed">
            <li>입력·출력 언어에 맞는 이메일 작성</li>
              <li>상황에 맞는 톤 (격식/캐주얼)</li>
              <li>필요한 이메일 길이</li>
            </ul>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <div className="input-label-row"><label className="block text-sm font-bold text-stone-800">이메일 내용</label><RecipientDetails details={recipientDetails} setDetails={setRecipientDetails} /></div>
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-stone-900 min-h-[150px] bg-white text-stone-900"
            placeholder="예: 내일 회의 일정을 다음주로 변경하고 싶다고 부장님께 말씀드려야 해"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-stone-900 text-white rounded-xl hover:bg-stone-800 disabled:bg-stone-400 disabled:cursor-not-allowed transition-colors font-bold text-sm shadow-sm"
        >
          {loading ? '얼른 이메일 보내고 칼퇴하자...' : 'Smart 생성'}
        </button>
      </form>
    </div>
  )
}
