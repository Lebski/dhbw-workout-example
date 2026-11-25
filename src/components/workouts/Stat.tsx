import type { ReactNode } from 'react'

export default function Stat({
  label,
  value,
  unit,
  icon,
  detail,
  accent = false,
}: {
  label: string
  value: string
  unit?: string
  icon: ReactNode
  detail: string
  accent?: boolean
}) {
  return (
    <article className={`stat-card ${accent ? 'accent' : ''}`}>
      <div className="stat-top">
        <span>{label}</span>
        <span className="stat-icon">{icon}</span>
      </div>
      <div className="stat-value">
        {value}
        <span>{unit}</span>
      </div>
      <p>{detail}</p>
    </article>
  )
}
