const languages = [
  ['korean', '한국어'],
  ['english', '영어'],
  ['japanese', '일본어'],
  ['chinese', '중국어']
]

export default function LanguageSelector({ outputLanguage, customLanguage, setOutputLanguage, setCustomLanguage }) {
  return (
    <div className="language-settings">
      <div className="language-chip">
        <label htmlFor="input-language">입력 언어</label>
        <select id="input-language" value="auto" disabled className="language-auto">
          <option value="auto">자동 감지</option>
        </select>
      </div>
      <div className="language-chip">
        <label htmlFor="output-language">출력 언어</label>
        <select id="output-language" value={outputLanguage} onChange={(e) => setOutputLanguage(e.target.value)}>
          {languages.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          <option value="other">기타</option>
        </select>
      </div>
      {outputLanguage === 'other' && (
        <div className="language-chip language-custom">
          <label htmlFor="custom-language">직접 입력</label>
          <input id="custom-language" value={customLanguage} onChange={(e) => setCustomLanguage(e.target.value)} placeholder="예: 스페인어" />
        </div>
      )}
    </div>
  )
}
