import { useEffect, useState } from 'react'
import { fetchAPI } from '../api'

const fallbackTerms = {
  plan: ['protocol', 'study plan', 'development plan'], planning: ['protocol development', 'study planning', 'development planning'],
  drug: ['medicinal product', 'pharmaceutical product', 'investigational product'], test: ['assay', 'analysis', 'testing'],
  issue: ['deviation', 'nonconformity', 'finding'], change: ['change control', 'amendment', 'revision'],
  fix: ['corrective action', 'remediation', 'CAPA'], report: ['assessment', 'evaluation', 'technical report']
}

function cleanSelection(value) {
  return value.trim().replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}%()-]+$/gu, '')
}

function fallbackSuggestions(term) {
  const known = fallbackTerms[term.toLowerCase()]
  return (known || [`${term} assessment`, `${term} evaluation`, `regulated ${term}`]).map((suggestion) => ({ term: suggestion, explanation: '문맥에 따라 제약·규제 업무에서 검토할 수 있는 표현입니다.' }))
}

export default function ProfessionalTermText({ text, onChange }) {
  const [currentText, setCurrentText] = useState(String(text))
  const [selection, setSelection] = useState(null)
  const [suggestions, setSuggestions] = useState([])
  const [suggesting, setSuggesting] = useState(false)

  useEffect(() => { setCurrentText(String(text)); setSelection(null); setSuggestions([]) }, [text])

  const handleDoubleClick = async () => {
    const browserSelection = window.getSelection()
    const rawTerm = browserSelection?.toString() || ''
    const term = cleanSelection(rawTerm)
    if (!term || term.includes('\n') || term.length > 80 || !browserSelection?.rangeCount) return
    const range = browserSelection.getRangeAt(0)
    const offset = Math.min(range.startOffset, range.endOffset)
    const actualTerm = cleanSelection(currentText.slice(offset, offset + rawTerm.length)) || term
    const rect = range.getBoundingClientRect()
    setSelection({ term: actualTerm, index: offset, left: rect.left, top: rect.bottom + 8 })
    setSuggestions(fallbackSuggestions(actualTerm))
    setSuggesting(true)
    try {
      const data = await fetchAPI('/terms/suggest', { method: 'POST', body: JSON.stringify({ term: actualTerm, context: currentText.slice(Math.max(0, offset - 180), offset + rawTerm.length + 180) }) })
      if (data.suggestions?.length) setSuggestions(data.suggestions)
    } catch { /* Fallback suggestions remain available. */ } finally { setSuggesting(false) }
  }

  const replaceTerm = (replacement) => {
    if (!selection) return
    const before = currentText.slice(0, selection.index)
    const selected = currentText.slice(selection.index, selection.index + selection.term.length)
    const suffix = currentText.slice(selection.index + selection.term.length)
    const leading = selected.match(/^[^\p{L}\p{N}]*/u)?.[0] || ''
    const trailing = selected.match(/[^\p{L}\p{N}]*$/u)?.[0] || ''
    const nextText = `${before}${leading}${replacement}${trailing}${suffix}`
    setCurrentText(nextText); onChange?.(nextText); setSelection(null); window.getSelection()?.removeAllRanges()
  }

  return <span className="professional-term-text" onDoubleClick={handleDoubleClick}>
    <span>{currentText}</span>
    {selection && <span className="professional-term-popover" role="dialog" style={{ left: `${Math.max(8, selection.left)}px`, top: `${selection.top}px` }}>
      <strong>“{selection.term}” 대체 전문 용어</strong>
      {suggesting && <small>전문 용어를 확인하는 중...</small>}
      <span className="professional-term-options">{suggestions.map((suggestion) => <button type="button" key={suggestion.term} onClick={() => replaceTerm(suggestion.term)}>{suggestion.term}</button>)}</span>
      {suggestions[0]?.explanation && <small>{suggestions[0].explanation}</small>}
      <button type="button" className="professional-term-close" onClick={() => setSelection(null)}>닫기</button>
    </span>}
  </span>
}
