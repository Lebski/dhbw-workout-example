import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import type { SubmitEvent } from 'react'
import WorkoutForm from './WorkoutForm'

export default function WorkoutDialog({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean
  onClose: () => void
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (open) dialogRef.current?.showModal()
    else dialogRef.current?.close()
  }, [open])
  return (
    <dialog
      ref={dialogRef}
      className="workout-dialog"
      aria-labelledby="workout-dialog-title"
      onCancel={() => onClose()}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="dialog-heading">
        <div>
          <span className="eyebrow">PUT IT IN THE BOOKS</span>
          <h2 id="workout-dialog-title">Log a workout</h2>
        </div>
        <button
          className="icon-button"
          aria-label="Close dialog"
          onClick={() => onClose()}
        >
          <X size={20} />
        </button>
      </div>
      <p>Big session or a quick stretch. It all counts.</p>
      <WorkoutForm onSubmit={onSubmit} onCancel={() => onClose()} />
    </dialog>
  )
}
