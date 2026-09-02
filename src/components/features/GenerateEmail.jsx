import { useState } from 'react'
import { fetchAPI } from '../../api'

export default function GenerateEmail({ setResult, loading, setLoading }) {
  const [formData, setFormData] = useState({
    userInput: '',
    language: 'korean',
    customLanguage: '',
    tone: 'formal',
    length: 'medium'
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.userInput.trim()) {
      alert('이메일 내용을 입력해주세요')
      return
    }

    const finalLanguage = formData.language === 'other' ? formData.customLanguage : formData.language
    if (formData.language === 'other' && !formData.customLanguage.trim()) {
      alert('언어를 입력해주세요')
      return
    }

    setLoading(true)
    try {
      const data = await fetchAPI('/email/generate', {
        method: 'POST',
        body: JSON.stringify({ ...formData, language: finalLanguage })
      })
      setResult(data.email)
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
        <h2 className="text-xl font-bold text-stone-900">이메일 작성</h2>
        <p className="text-sm text-stone-600 mt-1.5">작성하고 싶은 이메일의 내용을 간단히 설명해주세요.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-stone-800 mb-2">이메일 내용</label>
          <textarea
            value={formData.userInput}
            onChange={(e) => setFormData({ ...formData, userInput: e.target.value })}
            className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-stone-900 min-h-[120px] bg-white text-stone-900"
            placeholder="예: 프로젝트 진행 상황 보고서를 팀장님께 보내야 해요"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-bold text-stone-800 mb-2">언어</label>
            <select
              value={formData.language}
              onChange={(e) => setFormData({ ...formData, language: e.target.value })}
              className="w-full px-4 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-stone-900 bg-white text-stone-900 font-medium"
            >
              <option value="korean">한국어</option>
              <option value="english">English</option>
              <option value="japanese">日本語</option>
              <option value="chinese">中文</option>
              <option value="other">기타 (직접입력)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-stone-800 mb-2">톤</label>
            <select
              value={formData.tone}
              onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
              className="w-full px-4 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-stone-900 bg-white text-stone-900 font-medium"
            >
              <option value="formal">격식있게</option>
              <option value="casual">캐주얼</option>
              <option value="friendly">친근하게</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-stone-800 mb-2">길이</label>
            <select
              value={formData.length}
              onChange={(e) => setFormData({ ...formData, length: e.target.value })}
              className="w-full px-4 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-stone-900 bg-white text-stone-900 font-medium"
            >
              <option value="short">짧게</option>
              <option value="medium">보통</option>
              <option value="long">길게</option>
            </select>
          </div>
        </div>

        {formData.language === 'other' && (
          <div>
            <label className="block text-sm font-bold text-stone-800 mb-2">원하는 언어</label>
            <input
              type="text"
              value={formData.customLanguage}
              onChange={(e) => setFormData({ ...formData, customLanguage: e.target.value })}
              className="w-full px-4 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-stone-900 bg-white text-stone-900"
              placeholder="예: Spanish, French, German 등"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-stone-900 text-white rounded-xl hover:bg-stone-800 disabled:bg-stone-400 disabled:cursor-not-allowed transition-colors font-bold text-sm shadow-sm"
        >
          {loading ? '생성 중...' : '이메일 생성'}
        </button>
      </form>
    </div>
  )
}