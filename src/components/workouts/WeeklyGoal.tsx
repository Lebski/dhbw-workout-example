import { Check, Target, TrendingUp } from 'lucide-react'

export default function WeeklyGoal({ workoutCount }: { workoutCount: number }) {
  return (
    <div className="weekly-goal">
      <span className="goal-icon">
        <Target size={22} />
      </span>
      <h3>Build the habit.</h3>
      <p>
        Aim for 4 workouts a week.
        <br />
        Progress starts with showing up.
      </p>
      <div className="goal-progress">
        <strong>
          {workoutCount}
          <span> / 4 workouts</span>
        </strong>
        <span>{Math.min(Math.round((workoutCount / 4) * 100), 100)}%</span>
      </div>
      <div className="progress-track">
        <div
          style={{
            width: `${Math.min((workoutCount / 4) * 100, 100)}%`,
          }}
        />
      </div>
      <div className="goal-note">
        {workoutCount >= 4 ? (
          <>
            <Check size={15} />
            Weekly goal? Nailed it.
          </>
        ) : (
          <>
            <TrendingUp size={15} />
            You've got this. Keep going.
          </>
        )}
      </div>
    </div>
  )
}
