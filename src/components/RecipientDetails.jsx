import { useState } from 'react'

const fields = [
  ['recipientName', '수신인', '예: 김민수'],
  ['recipientCompany', '수신회사', '예: ABC 주식회사'],
  ['recipientRole', '직책/직무', '예: 마케팅팀 팀장']
]

export default function RecipientDetails({ details, setDetails }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="recipient-details">
      <button type="button" className="recipient-toggle" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        <span className={`recipient-arrow ${open ? 'is-open' : ''}`}>›</span>
        <span>상세정보 <small>(선택사항)</small></span>
      </button>
      {open && (
        <div className="recipient-fields">
          {fields.map(([key, label, placeholder]) => (
            <label key={key}>
              <span>{label}</span>
              <input
                value={details[key]}
                onChange={(event) => setDetails({ ...details, [key]: event.target.value })}
                placeholder={placeholder}
              />
            </label>
          ))}
        </div>
      )}
    </div>
  )
}
