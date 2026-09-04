import { useEffect, useMemo, useState } from 'react'

const alternatives = {
  plan: { label: 'plan', options: ['protocol', 'study plan', 'development plan'], note: '시험·임상 문맥에서는 protocol이 더 적절할 수 있습니다.' },
  planning: { label: 'planning', options: ['protocol development', 'study planning', 'development planning'], note: '시험계획 수립을 의미할 때 사용합니다.' },
  drug: { label: 'drug', options: ['medicinal product', 'pharmaceutical product', 'investigational product'], note: '임상시험 문맥에서는 investigational product를 검토하세요.' },
  test: { label: 'test', options: ['assay', 'analysis', 'testing'], note: '시험 방법이나 분석 절차를 가리킬 때 assay 또는 analysis를 검토하세요.' },
  issue: { label: 'issue', options: ['deviation', 'nonconformity', 'finding'], note: '품질·GMP 문맥에서는 사실관계에 따라 deviation 또는 nonconformity를 사용합니다.' },
  change: { label: 'change', options: ['change control', 'amendment', 'revision'], note: '승인·평가 절차가 포함되면 change control이 적절할 수 있습니다.' },
  fix: { label: 'fix', options: ['corrective action', 'remediation', 'CAPA'], note: '재발 방지까지 포함하면 CAPA를 검토하세요.' },
  report: { label: 'report', options: ['assessment', 'evaluation', 'technical report'], note: '평가 결과인지 기술문서인지에 따라 선택하세요.' }
}

function splitText(text) {
  const keys = Object.keys(alternatives).join('|')
  return String(text).split(new RegExp(`(\\b(?:${keys})\\b)`, 'gi'))
}

export default function ProfessionalTermText({ text, onChange }) {
  const [currentText, setCurrentText] = useState(String(text))
  const [selected, setSelected] = useState(null)
  useEffect(() => {
    setCurrentText(String(text))
    setSelected(null)
  }, [text])
  const parts = useMemo(() => splitText(currentText), [currentText])

  return (
    <span className="professional-term-text">
      {parts.map((part, index) => {
        const entry = alternatives[part.toLowerCase()]
        if (!entry) return <span key={index}>{part}</span>
        return (
          <span className="professional-term-wrap" key={`${part}-${index}`}>
            <button type="button" className="professional-term" onClick={() => setSelected(selected?.index === index ? null : { ...entry, index })}>
              {part}
            </button>
            {selected?.index === index && (
              <span className="professional-term-popover" role="dialog">
                <strong>{entry.label} 대체 전문 용어</strong>
                <span className="professional-term-options">
                  {entry.options.map((option) => <button type="button" key={option} onClick={() => { const nextText = parts.map((value, partIndex) => partIndex === index ? option : value).join(''); setCurrentText(nextText); onChange?.(nextText); setSelected(null) }}>{option}</button>)}
                </span>
                <small>{entry.note}</small>
              </span>
            )}
          </span>
        )
      })}
    </span>
  )
}
