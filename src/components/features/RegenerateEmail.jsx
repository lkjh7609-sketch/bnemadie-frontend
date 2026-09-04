import { useState } from 'react'
import { fetchAPI } from '../../api'
import RecipientDetails from '../RecipientDetails'

export default function RegenerateEmail({ setResult, loading, setLoading, outputLanguage, languageSelector, regulatoryReferenceId }) {
  const [formData, setFormData] = useState({
    originalEmail: '',
    newTone: 'formal'
  })
  const [recipientDetails, setRecipientDetails] = useState({ recipientName: '', recipientCompany: '', recipientRole: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.originalEmail.trim()) {
      alert('원본 이메일을 입력해주세요')
      return
    }

    setLoading(true)
    try {
      const data = await fetchAPI('/email/regenerate', {
        method: 'POST',
        body: JSON.stringify({
          content: formData.originalEmail,
          tone: formData.newTone,
          outputLang: outputLanguage,
          recipientDetails,
          regulatoryReferenceId
        })
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
      <h2 className="text-xl font-semibold text-gray-900">톤 변경</h2>
      <p className="text-sm text-gray-600">기존 이메일의 톤과 스타일을 다르게 재작성합니다.</p>
      {languageSelector}
      
      <div className="advice-box bg-rose-50 border border-rose-200 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <span className="text-rose-600 text-lg">🎭</span>
          <div className="text-sm text-rose-900">
            <p className="font-medium mb-1">사용 예시:</p>
            <ul className="list-disc list-inside space-y-1 text-rose-800">
              <li>격식있는 이메일을 친근하게 변경</li>
              <li>캐주얼한 표현을 전문적으로 변경</li>
              <li>감사 메일을 정중한 톤으로 재작성</li>
            </ul>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="input-label-row"><label className="block text-sm font-medium text-gray-700">원본 이메일</label><RecipientDetails details={recipientDetails} setDetails={setRecipientDetails} /></div>
          <textarea
            value={formData.originalEmail}
            onChange={(e) => setFormData({ ...formData, originalEmail: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[150px]"
            placeholder="톤을 변경하고 싶은 이메일 내용을 입력하세요"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">새로운 톤</label>
          <select
            value={formData.newTone}
            onChange={(e) => setFormData({ ...formData, newTone: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="formal">격식있게 (Formal)</option>
            <option value="casual">캐주얼 (Casual)</option>
            <option value="friendly">친근하게 (Friendly)</option>
            <option value="professional">전문적으로 (Professional)</option>
            <option value="apologetic">사과 톤 (Apologetic)</option>
            <option value="enthusiastic">열정적으로 (Enthusiastic)</option>
            <option value="direct">직설적으로 (Direct)</option>
            <option value="diplomatic">외교적으로 (Diplomatic)</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {loading ? '얼른 이메일 보내고 칼퇴하자...' : '톤 변경하여 재작성'}
        </button>
      </form>
    </div>
  )
}
