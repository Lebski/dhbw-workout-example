import { useState } from 'react'
import {
  Activity,
  ArrowUpRight,
  Clock3,
  Dumbbell,
  Footprints,
  Search,
  Trash2,
} from 'lucide-react'
import { categories } from '../../lib/workouts'
import type { Workout } from '../../lib/workouts'

const workoutIcon = (type: string) =>
  type === 'Strength' ? Dumbbell : type === 'Cardio' ? Footprints : Activity

export default function WorkoutList({
  workouts,
  view,
  onDelete,
  onLogWorkout,
}: {
  workouts: Workout[]
  view: string
  onDelete: (id: string) => void
  onLogWorkout: () => void
}) {
  const [filter, setFilter] = useState('All workouts')
  const [search, setSearch] = useState('')
  const visible = workouts
    .filter(
      (workout) =>
        (filter === 'All workouts' || workout.type === filter) &&
        workout.name.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => b.date.localeCompare(a.date))

  return (
    <section className="workouts-section">
      <div className="section-top">
        <div>
          <h2>
            {view === 'Overview' ? 'Recent workouts' : 'My workouts'}
            <span className="total-pill">{workouts.length}</span>
          </h2>
          <p>Your effort deserves a record.</p>
        </div>
        <span className="sample-label">
          Sample entries included · make it yours
        </span>
      </div>
      <div className="table-toolbar">
        <div className="filters" aria-label="Filter workouts">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={filter === category ? 'selected' : ''}
            >
              {category}
            </button>
          ))}
        </div>
        <label className="search-box">
          <Search size={16} />
          <input
            aria-label="Search workouts"
            placeholder="Search workouts…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>WORKOUT</th>
              <th>DATE</th>
              <th>DURATION</th>
              <th>DETAILS</th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {visible.map((workout) => {
              const Icon = workoutIcon(workout.type)
              return (
                <tr key={workout.id}>
                  <td>
                    <div className="workout-name">
                      <span
                        className={`exercise-icon ${workout.type.toLowerCase()}`}
                      >
                        <Icon size={20} />
                      </span>
                      <div>
                        <strong>{workout.name}</strong>
                        <span>{workout.type}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    {new Date(`${workout.date}T12:00:00`).toLocaleDateString(
                      'en',
                      {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      },
                    )}
                  </td>
                  <td>
                    <span className="duration">
                      <Clock3 size={14} />
                      {workout.duration} min
                    </span>
                  </td>
                  <td>
                    {workout.type === 'Strength' ? (
                      <span>
                        {workout.sets} sets{' '}
                        <span className="detail-dot">·</span> {workout.reps}{' '}
                        reps <span className="detail-dot">·</span>{' '}
                        {workout.weight} kg
                      </span>
                    ) : (
                      <span className="type-tag">
                        {workout.type === 'Cardio'
                          ? 'Keep moving'
                          : 'Recover & recharge'}
                      </span>
                    )}
                  </td>
                  <td>
                    <button
                      className="delete-button"
                      aria-label={`Delete ${workout.name}`}
                      onClick={() => onDelete(workout.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {visible.length === 0 && (
          <div className="empty-state">
            <Dumbbell size={30} />
            <h3>
              {workouts.length
                ? 'No matching workouts'
                : 'Your first rep starts here.'}
            </h3>
            <p>
              {workouts.length
                ? 'Try a different search or category.'
                : 'Log a workout to start building your story.'}
            </p>
            <button
              className="text-button"
              onClick={() =>
                workouts.length
                  ? (setFilter('All workouts'), setSearch(''))
                  : onLogWorkout()
              }
            >
              {workouts.length ? 'Clear filters' : 'Log your first workout'}
              <ArrowUpRight size={15} />
            </button>
          </div>
        )}
      </div>
      <div className="table-footer">
        <span>
          {visible.length} workout{visible.length !== 1 ? 's' : ''}
        </span>
        <span>
          <span className="tiny-dot" />
          Your progress, saved automatically
        </span>
      </div>
    </section>
  )
}
