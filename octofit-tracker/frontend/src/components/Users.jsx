import { useEffect, useState } from 'react'
import { fetchResource } from '../api'

const fallbackUsers = [
  { id: 1, name: 'Ada', role: 'admin' },
  { id: 2, name: 'Grace', role: 'member' },
]

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    fetchResource('users', fallbackUsers).then((items) => {
      if (isMounted) {
        setUsers(items)
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
            <h2 className="h4 mb-1">Users</h2>
            <p className="text-muted mb-0">Manage user accounts and profiles.</p>
          </div>
          <span className="badge bg-success">Profiles</span>
        </div>

        {loading ? (
          <p className="text-muted">Loading users…</p>
        ) : (
          <div className="list-group">
            {users.map((user) => (
              <div key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <div className="fw-semibold">{user.name}</div>
                  <div className="text-muted small">{user.email || 'No email provided'}</div>
                </div>
                <span className="badge bg-light text-dark">{user.role || 'member'}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
