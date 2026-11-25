export type Workout = {
  id: string
  name: string
  type: string
  date: string
  duration: number
  sets: number
  reps: number
  weight: number
}
export const categories = ['All workouts', 'Strength', 'Cardio', 'Mobility']
export const storageKey = 'rep-workouts-v1'

export function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
function daysAgo(days: number) {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return dateKey(date)
}
export function demoWorkouts(): Workout[] {
  return [
    {
      id: 'demo-1',
      name: 'Upper body strength',
      type: 'Strength',
      date: daysAgo(0),
      duration: 45,
      sets: 4,
      reps: 12,
      weight: 20,
    },
    {
      id: 'demo-2',
      name: 'Morning run',
      type: 'Cardio',
      date: daysAgo(1),
      duration: 30,
      sets: 0,
      reps: 0,
      weight: 0,
    },
    {
      id: 'demo-3',
      name: 'Leg day',
      type: 'Strength',
      date: daysAgo(2),
      duration: 55,
      sets: 4,
      reps: 10,
      weight: 40,
    },
    {
      id: 'demo-4',
      name: 'Full body stretch',
      type: 'Mobility',
      date: daysAgo(3),
      duration: 20,
      sets: 0,
      reps: 0,
      weight: 0,
    },
    {
      id: 'demo-5',
      name: 'Push day',
      type: 'Strength',
      date: daysAgo(5),
      duration: 40,
      sets: 3,
      reps: 12,
      weight: 25,
    },
    {
      id: 'demo-6',
      name: 'Evening walk',
      type: 'Cardio',
      date: daysAgo(8),
      duration: 35,
      sets: 0,
      reps: 0,
      weight: 0,
    },
  ]
}

export function isWorkout(value: unknown): value is Workout {
  if (!value || typeof value !== 'object') return false
  const entry = value as Workout
  return (
    typeof entry.id === 'string' &&
    typeof entry.name === 'string' &&
    ['Strength', 'Cardio', 'Mobility'].includes(entry.type) &&
    typeof entry.date === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/.test(entry.date) &&
    ['duration', 'sets', 'reps', 'weight'].every(
      (key) =>
        typeof entry[key as keyof Workout] === 'number' &&
        Number.isFinite(entry[key as keyof Workout]) &&
        Number(entry[key as keyof Workout]) >= 0,
    )
  )
}
