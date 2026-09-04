import { useEffect, useState } from 'react'
import { fetchAPI } from '../api'

export default function RegulatoryReferenceSelector({ value, onChange }) {
  const [references, setReferences] = useState([])

  useEffect(() => {
    fetchAPI('/regulations')
      .then((data) => setReferences(data.references || []))
      .catch(() => setReferences([]))
  }, [])

  return (
    <div className="regulatory-reference-panel">
      <div className="regulatory-reference-heading">
        <label htmlFor="regulatory-reference">규정 참고</label>
        <span>선택사항 · 공식 용어와 영문 표현을 이메일에 반영합니다</span>
      </div>
      <select id="regulatory-reference" value={value} onChange={(event) => onChange(event.target.value)}>
        {references.map((reference) => (
          <option key={reference.id} value={reference.id}>{reference.agency} · {reference.title}</option>
        ))}
      </select>
      {value !== 'none' && <p className="regulatory-reference-note">결과에 참고한 규정과 적용 용어가 함께 표시됩니다. 규정 준수 여부에 대한 법률 자문은 제공하지 않습니다.</p>}
    </div>
  )
}
