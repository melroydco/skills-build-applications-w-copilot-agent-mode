import { useEffect, useState } from 'react'
import { fetchResource } from '../api'

const fallbackTeams = [
  { id: 1, name: 'North Stars', members: 6 },
  { id: 2, name: 'River Runners', members: 5 },
]

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    fetchResource('teams', fallbackTeams).then((items) => {
      if (isMounted) {
        setTeams(items)
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
            <h2 className="h4 mb-1">Teams</h2>
            <p className="text-muted mb-0">Group members into collaborative challenges.</p>
          </div>
          <span className="badge bg-info text-dark">Group view</span>
        </div>

        {loading ? (
          <p className="text-muted">Loading teams…</p>
        ) : (
          <div className="row g-3">
            {teams.map((team) => (
              <div key={team.id} className="col-md-6">
                <div className="border rounded p-3 h-100">
                  <h3 className="h6 mb-2">{team.name}</h3>
                  <p className="mb-0 text-muted">{team.members || 0} members</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
