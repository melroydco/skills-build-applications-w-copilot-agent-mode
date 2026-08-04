import { useEffect, useState } from 'react'
import { fetchResource } from '../api'

const fallbackActivities = [
  { id: 1, type: 'Run', durationMinutes: 30, note: 'Morning jog around the park' },
  { id: 2, type: 'Strength', durationMinutes: 45, note: 'Upper body circuit' },
]

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    fetchResource('activities', fallbackActivities).then((items) => {
      if (isMounted) {
        setActivities(items)
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
            <h2 className="h4 mb-1">Activities</h2>
            <p className="text-muted mb-0">Track recent workouts and training sessions.</p>
          </div>
          <span className="badge bg-primary">Live data</span>
        </div>

        {loading ? (
          <p className="text-muted">Loading activities…</p>
        ) : (
          <div className="list-group">
            {activities.map((activity) => (
              <div key={activity.id} className="list-group-item">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h3 className="h6 mb-1">{activity.type}</h3>
                    <p className="mb-0 text-muted">{activity.note || 'No notes provided'}</p>
                  </div>
                  <span className="badge bg-secondary">{activity.durationMinutes || 0} min</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
