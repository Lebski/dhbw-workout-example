import { ChevronRight } from 'lucide-react'

export default function Topbar({ view }: { view: string }) {
  return (
    <header className="topbar">
      <span>
        Workspace <ChevronRight size={14} />
        <strong>{view}</strong>
      </span>
      <span className="local-badge">
        <span />
        Stored on your device
      </span>
    </header>
  )
}
