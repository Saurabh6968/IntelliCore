import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>IntelliCore</h2>

      <nav>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/resume">Resume Analysis</NavLink>
        <NavLink to="/ats">ATS Score</NavLink>
        <NavLink to="/skills">Skill Gap</NavLink>
        <NavLink to="/roadmap">Learning Roadmap</NavLink>
        <NavLink to="/interview">AI Interview</NavLink>
        <NavLink to="/readiness">Readiness Score</NavLink>
        <NavLink to="/career">Career Guidance</NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar