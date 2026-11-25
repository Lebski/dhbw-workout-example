import { useEffect, useRef } from 'react'
import { Code2, X } from 'lucide-react'

export default function ConceptsDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const conceptsRef = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (open) conceptsRef.current?.showModal()
    else conceptsRef.current?.close()
  }, [open])
  return (
    <dialog
      ref={conceptsRef}
      className="concept-panel"
      aria-labelledby="concept-title"
      onCancel={() => onClose()}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <button
        className="icon-button"
        aria-label="Close explanation"
        onClick={() => onClose()}
      >
        <X size={20} />
      </button>
      <Code2 size={28} />
      <h2 id="concept-title">A few modern JavaScript ideas.</h2>
      <p>
        Explore <code>src/routes/index.tsx</code> and{' '}
        <code>src/components/workouts</code> to see these in action.
      </p>
      {[
        [
          'React state',
          'useState remembers workouts, filters, and search input. Changing state updates the screen.',
        ],
        [
          'Array methods',
          'filter selects workouts, map creates rows, and reduce adds up workout minutes.',
        ],
        [
          'Immutable updates',
          'Spread syntax adds entries to a new array. filter removes an entry without changing the original.',
        ],
        [
          'Browser storage & effects',
          'useEffect reads and writes JSON in localStorage so your workouts survive a refresh.',
        ],
        [
          'Events & forms',
          'onClick handles buttons. onSubmit reads FormData and creates a workout object.',
        ],
        [
          'TypeScript',
          'The Workout type describes each entry and helps catch mistakes while you code.',
        ],
      ].map(([title, description]) => (
        <div className="concept" key={title}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      ))}
    </dialog>
  )
}
