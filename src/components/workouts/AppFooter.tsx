import { ArrowDownLeft, Dumbbell } from 'lucide-react'

export default function AppFooter() {
  return (
    <footer className="app-footer">
      <span>
        <Dumbbell size={14} />
        Built one rep at a time.  This is a personal project, not a business.  I built it for myself, and I hope it helps you too.
      </span>
      <span>
        No competition. Just you, getting stronger. <ArrowDownLeft size={14} />
      </span>
    </footer>
  )
}