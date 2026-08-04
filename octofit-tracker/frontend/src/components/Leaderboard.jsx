import { useEffect, useState } from 'react'
import { fetchResource } from '../api'

const fallbackLeaderboard = [
  { id: 1, name: 'Maya', points: 985 },
  { id: 2, name: 'Luis', points: 912 },
  { id: 3, name: 'Jules', points: 887 },
]

export default function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    fetchResource('leaderboard', fallbackLeaderboard).then((items) => {
      if (isMounted) {
        setEntries(items)
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
            <h2 className="h4 mb-1">Leaderboard</h2>
            <p className="text-muted mb-0">See who is leading the challenge board.</p>
          </div>
          <span className="badge bg-warning text-dark">Points</span>
        </div>

        {loading ? (
          <p className="text-muted">Loading leaderboard…</p>
        ) : (
          <div className="list-group">
            {entries.map((entry, index) => (
              <div key={entry.id || `${entry.name}-${index}`} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <div className="fw-semibold">#{index + 1} {entry.name}</div>
                  <div className="text-muted small">{entry.team || 'Independent'}</div>
                </div>
                <span className="badge bg-dark">{entry.points || 0} pts</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
