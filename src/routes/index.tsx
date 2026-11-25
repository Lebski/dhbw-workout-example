import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Check } from 'lucide-react'
import type { SubmitEvent } from 'react'
import { demoWorkouts, isWorkout, storageKey } from '../lib/workouts'
import type { Workout } from '../lib/workouts'
import Sidebar from '../components/workouts/Sidebar'
import Topbar from '../components/workouts/Topbar'
import PageHeading from '../components/workouts/PageHeading'
import WeeklyOverview from '../components/workouts/WeeklyOverview'
import WorkoutList from '../components/workouts/WorkoutList'
import AppFooter from '../components/workouts/AppFooter'
import WorkoutDialog from '../components/workouts/WorkoutDialog'
import ConceptsDialog from '../components/workouts/ConceptsDialog'

export const Route = createFileRoute('/')({ component: App })

function App() {
  // State drives the UI. Updating it automatically renders the affected components.
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [loaded, setLoaded] = useState(false)
  const [storageNotice, setStorageNotice] = useState('')
  const [view, setView] = useState('Overview')
  const [weekOffset, setWeekOffset] = useState(0)
  const [modal, setModal] = useState(false)
  const [showConcepts, setShowConcepts] = useState(false)
  const [notice, setNotice] = useState('')

  // Effects synchronize React with browser APIs. Load once, then save on changes.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey)
      const parsed: unknown = stored ? JSON.parse(stored) : demoWorkouts()
      if (!Array.isArray(parsed) || !parsed.every(isWorkout))
        throw new Error('Invalid saved data')
      setWorkouts(parsed)
    } catch {
      setWorkouts(demoWorkouts())
      setStorageNotice(
        'Saved data could not be loaded. Showing sample workouts.',
      )
    }
    setLoaded(true)
  }, [])
  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(storageKey, JSON.stringify(workouts))
    } catch {
      setStorageNotice(
        'Browser storage is unavailable. Changes last for this session only.',
      )
    }
  }, [workouts, loaded])
  useEffect(() => {
    if (!notice) return
    const timeout = setTimeout(() => setNotice(''), 3500)
    return () => clearTimeout(timeout)
  }, [notice])

  function addWorkout(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const type = String(data.get('type'))
    const workout: Workout = {
      id: crypto.randomUUID(),
      name: String(data.get('name')).trim(),
      type,
      date: String(data.get('date')),
      duration: Number(data.get('duration')),
      sets: type === 'Strength' ? Number(data.get('sets')) : 0,
      reps: type === 'Strength' ? Number(data.get('reps')) : 0,
      weight: type === 'Strength' ? Number(data.get('weight')) : 0,
    }
    if (!workout.name) return
    // Spread creates a new array instead of mutating the existing state.
    setWorkouts((current) => [workout, ...current])
    setModal(false)
    setNotice('Workout logged. One more in the books!')
  }

  function deleteWorkout(id: string) {
    setWorkouts((current) => current.filter((workout) => workout.id !== id))
    setNotice('Workout removed.')
  }

  return (
    <div className="app-shell">
      <Sidebar
        view={view}
        workoutCount={workouts.length}
        onViewChange={setView}
        onShowConcepts={() => setShowConcepts(true)}
      />
      <div className="main-shell">
        <Topbar view={view} />
        <main>
          <PageHeading view={view} onLogWorkout={() => setModal(true)} />
          {storageNotice && (
            <p className="storage-notice" role="status">
              {storageNotice}
            </p>
          )}
          {view === 'Overview' && (
            <WeeklyOverview
              workouts={workouts}
              weekOffset={weekOffset}
              onWeekChange={setWeekOffset}
            />
          )}
          <WorkoutList
            workouts={workouts}
            view={view}
            onDelete={deleteWorkout}
            onLogWorkout={() => setModal(true)}
          />
          <AppFooter />
        </main>
      </div>
      <WorkoutDialog
        open={modal}
        onClose={() => setModal(false)}
        onSubmit={addWorkout}
      />
      <ConceptsDialog
        open={showConcepts}
        onClose={() => setShowConcepts(false)}
      />
      <div className={`toast ${notice ? 'visible' : ''}`} role="status">
        {notice && (
          <>
            <Check size={18} />
            {notice}
          </>
        )}
      </div>
    </div>
  )
}
