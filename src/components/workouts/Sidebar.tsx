import { ArrowUpRight, Code2, Dumbbell, LayoutDashboard } from 'lucide-react'

export default function Sidebar({
  view,
  workoutCount,
  onViewChange,
  onShowConcepts,
}: {
  view: string
  workoutCount: number
  onViewChange: (view: string) => void
  onShowConcepts: () => void
}) {
  return (
    <aside className="sidebar">
      <a href="/" className="brand">
        <span className="brand-symbol">
          <Dumbbell size={23} />
        </span>
        rep<span className="brand-dot">.</span>
      </a>
      <div className="workspace-label">YOUR WORKSPACE</div>
      <nav aria-label="Main navigation">
        <button
          className={view === 'Overview' ? 'nav-item active' : 'nav-item'}
          onClick={() => onViewChange('Overview')}
        >
          <LayoutDashboard size={19} />
          Overview
        </button>
        <button
          className={view === 'Workouts' ? 'nav-item active' : 'nav-item'}
          onClick={() => onViewChange('Workouts')}
        >
          <Dumbbell size={19} />
          My workouts<span className="nav-count">{workoutCount}</span>
        </button>
      </nav>
      <div className="sidebar-tip">
        <span className="tip-icon">
          <Code2 size={21} />
        </span>
        <h3>Small app. Big ideas.</h3>
        <p>
          A little practice in fitness.
          <br />A little practice in JavaScript.
        </p>
        <button onClick={() => onShowConcepts()}>
          Under the hood <ArrowUpRight size={15} />
        </button>
      </div>
      <div className="profile">
        <span className="avatar">Y</span>
        <div>
          <strong>Your workspace</strong>
          <span>Personal fitness journal</span>
        </div>
        <span className="online-dot" />
      </div>
    </aside>
  )
}
