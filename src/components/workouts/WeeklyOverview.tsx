import {
  ChevronLeft,
  ChevronRight,
  Clock3,
  Dumbbell,
  Flame,
} from 'lucide-react'
import { dateKey } from '../../lib/workouts'
import type { Workout } from '../../lib/workouts'
import Stat from './Stat'
import WeeklyGoal from './WeeklyGoal'

export default function WeeklyOverview({
  workouts,
  weekOffset,
  onWeekChange,
}: {
  workouts: Workout[]
  weekOffset: number
  onWeekChange: (offset: number) => void
}) {
  const today = new Date()
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  start.setDate(start.getDate() - ((start.getDay() + 6) % 7) + weekOffset * 7)
  const weekDays = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start)
    date.setDate(start.getDate() + index)
    return {
      date,
      key: dateKey(date),
      label: date.toLocaleDateString('en', { weekday: 'short' }),
    }
  })
  // filter selects entries; reduce combines them into a single total; map renders lists.
  const thisWeek = workouts.filter((workout) =>
    weekDays.some((day) => day.key === workout.date),
  )
  const minutes = thisWeek.reduce(
    (total, workout) => total + workout.duration,
    0,
  )
  const activeDays = new Set(thisWeek.map((workout) => workout.date)).size
  const dailyMinutes = weekDays.map((day) =>
    thisWeek
      .filter((workout) => workout.date === day.key)
      .reduce((sum, workout) => sum + workout.duration, 0),
  )
  const chartMax = Math.max(90, Math.ceil(Math.max(...dailyMinutes) / 30) * 30)
  const weekLabel = `${start.toLocaleDateString('en', { month: 'short', day: 'numeric' })} – ${weekDays[6].date.toLocaleDateString('en', { month: 'short', day: 'numeric' })}`
  return (
    <>
      <div className="section-top">
        <h2>
          Your week at a glance <span className="tag">THIS WEEK</span>
        </h2>
        <div className="week-controls">
          <button
            aria-label="Previous week"
            onClick={() => onWeekChange(weekOffset - 1)}
          >
            <ChevronLeft size={16} />
          </button>
          <span>{weekLabel}</span>
          <button
            aria-label="Next week"
            disabled={weekOffset >= 0}
            onClick={() => onWeekChange(weekOffset + 1)}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <section className="stats-grid" aria-label="Weekly statistics">
        <Stat
          label="Workouts"
          value={String(thisWeek.length).padStart(2, '0')}
          icon={<Dumbbell size={20} />}
          detail="Times you showed up"
          accent
        />
        <Stat
          label="Time invested"
          value={String(minutes)}
          unit="min"
          icon={<Clock3 size={20} />}
          detail="Time well spent on yourself"
        />
        <Stat
          label="Active days"
          value={String(activeDays).padStart(2, '0')}
          unit="/ 7"
          icon={<Flame size={20} />}
          detail="A little consistency goes a long way"
        />
      </section>
      <section className="activity-panel">
        <div className="activity-chart">
          <div className="chart-heading">
            <div>
              <h2>Find your rhythm</h2>
              <p>Your activity, one day at a time.</p>
            </div>
            <span className="chart-legend">
              <i />
              Workout minutes
            </span>
          </div>
          <div className="chart-area">
            <div className="axis">
              <span>{chartMax} min</span>
              <span>{Math.round((chartMax * 2) / 3)} min</span>
              <span>{Math.round(chartMax / 3)} min</span>
              <span>0</span>
            </div>
            <div className="bars">
              {weekDays.map((day) => {
                const total = thisWeek
                  .filter((workout) => workout.date === day.key)
                  .reduce((sum, workout) => sum + workout.duration, 0)
                return (
                  <div
                    className={`bar-column ${day.key === dateKey(today) ? 'today' : ''}`}
                    key={day.key}
                  >
                    <div className="bar-track">
                      <div
                        className="bar"
                        style={{
                          height: `${(total / chartMax) * 100}%`,
                        }}
                        title={`${day.label}: ${total} minutes`}
                      >
                        {total > 0 && <span>{total}</span>}
                      </div>
                    </div>
                    <span className="day-label">
                      {day.label}
                      <i />
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <WeeklyGoal workoutCount={thisWeek.length} />
      </section>
    </>
  )
}
