import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

const sections = [
  { title: 'Users', description: 'Review profiles and roles.', to: '/users', badge: 'Profiles' },
  { title: 'Activities', description: 'Inspect recent training sessions.', to: '/activities', badge: 'Tracking' },
  { title: 'Teams', description: 'Monitor groups and collaboration.', to: '/teams', badge: 'Groups' },
  { title: 'Leaderboard', description: 'Compare scores and performance.', to: '/leaderboard', badge: 'Rankings' },
  { title: 'Workouts', description: 'Discover workout suggestions.', to: '/workouts', badge: 'Ideas' },
]

function Home({ environment }) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

  return (
    <div className="container py-3">
      <div className="p-4 p-lg-5 rounded border shadow-sm bg-light mb-4">
        <h1 className="display-5 mb-3">OctoFit Tracker</h1>
        <p className="lead">A modern multi-tier fitness and team tracking experience.</p>
        <p className="text-muted mb-0">Environment: {environment}</p>
        {!codespaceName && (
          <p className="text-muted mt-2 mb-0">
            Define VITE_CODESPACE_NAME in .env.local so the app targets your GitHub Codespaces backend.
          </p>
        )}
      </div>

      <div className="row g-3">
        {sections.map((section) => (
          <div className="col-md-6 col-xl-4" key={section.to}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <span className="badge bg-secondary mb-2">{section.badge}</span>
                <h2 className="h5">{section.title}</h2>
                <p className="text-muted">{section.description}</p>
                <NavLink className="btn btn-outline-primary btn-sm mt-2" to={section.to}>
                  Open view
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function App({ environment }) {
  return (
    <div className="container py-4">
      <nav className="navbar navbar-expand-lg border rounded px-3 py-2 mb-4 bg-white shadow-sm">
        <span className="navbar-brand fw-semibold">OctoFit Tracker</span>
        <div className="navbar-nav ms-auto">
          <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/">
            Overview
          </NavLink>
          <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/users">
            Users
          </NavLink>
          <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/activities">
            Activities
          </NavLink>
          <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/teams">
            Teams
          </NavLink>
          <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/leaderboard">
            Leaderboard
          </NavLink>
          <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/workouts">
            Workouts
          </NavLink>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home environment={environment} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  )
}
