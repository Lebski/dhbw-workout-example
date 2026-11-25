import { Plus } from 'lucide-react'

export default function PageHeading({
  view,
  onLogWorkout,
}: {
  view: string
  onLogWorkout: () => void
}) {
  return (
    <div className="page-heading">
      <div>
        <div className="eyebrow">A LITTLE BETTER, EVERY DAY</div>
        <h1>
          {view === 'Overview'
            ? 'Make every rep count.'
            : 'Your work, in the books.'}
        </h1>
        <p>
          {view === 'Overview'
            ? 'Show up, put in the work, and watch your progress add up.'
            : 'A little history of showing up. Keep it going.'}
        </p>
      </div>
      <button className="primary-button" onClick={() => onLogWorkout()}>
        <Plus size={18} />
        Log workout
      </button>
    </div>
  )
}
