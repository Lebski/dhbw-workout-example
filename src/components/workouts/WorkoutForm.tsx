import { useState } from 'react'
import { Plus } from 'lucide-react'
import type { SubmitEvent } from 'react'
import { categories, dateKey } from '../../lib/workouts'

export default function WorkoutForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void
  onCancel: () => void
}) {
  const [type, setType] = useState('Strength')
  return (
    <form onSubmit={onSubmit}>
      <label>
        Workout name
        <input
          autoFocus
          name="name"
          placeholder="e.g. Upper body strength"
          required
          maxLength={80}
        />
      </label>
      <div className="form-grid">
        <label>
          Category
          <select
            name="type"
            value={type}
            onChange={(event) => setType(event.target.value)}
          >
            {categories.slice(1).map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>
        <label>
          Date
          <input
            type="date"
            name="date"
            required
            defaultValue={dateKey(new Date())}
            max={dateKey(new Date())}
          />
        </label>
      </div>
      <label>
        Duration (minutes)
        <input
          name="duration"
          type="number"
          min="1"
          max="1440"
          defaultValue="30"
          required
        />
      </label>
      {type === 'Strength' && (
        <div className="form-grid three">
          <label>
            Sets
            <input
              type="number"
              name="sets"
              min="1"
              max="100"
              defaultValue="3"
              required
            />
          </label>
          <label>
            Reps per set
            <input
              type="number"
              name="reps"
              min="1"
              max="1000"
              defaultValue="12"
              required
            />
          </label>
          <label>
            Weight (kg)
            <input
              type="number"
              name="weight"
              min="0"
              max="1000"
              step="0.5"
              defaultValue="20"
              required
            />
          </label>
        </div>
      )}
      <div className="dialog-actions">
        <button type="button" className="secondary-button" onClick={onCancel}>
          Cancel
        </button>
        <button className="primary-button" type="submit">
          <Plus size={17} />
          Save workout
        </button>
      </div>
    </form>
  )
}
