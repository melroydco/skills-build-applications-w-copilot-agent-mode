import { Routes, Route, Link } from 'react-router-dom'

function Home() {
  return (
    <div className="container py-5">
      <h1 className="display-4 mb-3">OctoFit Tracker</h1>
      <p className="lead">A modern multi-tier fitness and team tracking app.</p>
      <Link className="btn btn-primary" to="/about">Learn more</Link>
    </div>
  )
}

function About() {
  return (
    <div className="container py-5">
      <h2>About OctoFit</h2>
      <p>This app will support authentication, activity logging, teams, leaderboards, and workout suggestions.</p>
      <Link className="btn btn-outline-secondary" to="/">Back home</Link>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}
