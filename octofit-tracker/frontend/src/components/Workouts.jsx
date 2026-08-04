import { useEffect, useState } from 'react'
import { fetchResource } from '../api'

const fallbackWorkouts = [
  { id: 1, name: 'Recovery Flow', focus: 'mobility' },
  { id: 2, name: 'Power Circuit', focus: 'strength' },
]

const workoutsUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    fetchResource(workoutsUrl, fallbackWorkouts).then((items) => {
      if (isMounted) {
        setWorkouts(items)
        setLoading(false)
      }
    })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="h4 mb-1">Workouts</h2>
            <p className="text-muted mb-0">Discover training ideas for the next session.</p>
          </div>
          <span className="badge bg-secondary">Suggestions</span>
        </div>

        {loading ? (
          <p className="text-muted">Loading workouts…</p>
        ) : (
          <div className="row g-3">
            {workouts.map((workout) => (
              <div key={workout.id} className="col-md-6">
                <div className="border rounded p-3 h-100">
                  <h3 className="h6 mb-2">{workout.name}</h3>
                  <p className="mb-0 text-muted">Focus: {workout.focus || 'general fitness'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
