import { useState } from 'react'
import { fetchAPI } from '../../api'

export default function ReplyEmail({ setResult, loading, setLoading }) {
  const [formData, setFormData] = useState({
    originalEmail: '',
    replyIntent: '',
    tone: 'formal'
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.originalEmail.trim() || !formData.replyIntent.trim()) {
      alert('원본 이메일과 답장 의도를 모두 입력해주세요')
      return
    }

    setLoading(true)
    try {
      const data = await fetchAPI('/email/reply', {
        method: 'POST',
        body: JSON.stringify(formData)
      })
      setResult(data.reply)
    } catch (error) {
      alert(`오류: ${error.message}`)
      setResult(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">답장 작성</h2>
      <p className="text-sm text-gray-600">받은 이메일에 대한 답장을 작성합니다.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">원본 이메일</label>
          <textarea
            value={formData.originalEmail}
            onChange={(e) => setFormData({ ...formData, originalEmail: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
            placeholder="답장할 이메일 내용을 붙여넣으세요"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">답장 내용</label>
          <textarea
            value={formData.replyIntent}
            onChange={(e) => setFormData({ ...formData, replyIntent: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
            placeholder="예: 제안에 동의하며, 다음 주 화요일에 미팅을 진행하고 싶습니다"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">톤</label>
          <select
            value={formData.tone}
            onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="formal">격식있게</option>
            <option value="casual">캐주얼</option>
            <option value="friendly">친근하게</option>
            <option value="professional">전문적으로</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {loading ? '답장 생성 중...' : '답장 생성'}
        </button>
      </form>
    </div>
  )
}