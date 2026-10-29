import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header className="navbar">

      <div>
        <h2>Dashboard</h2>
        <p>Welcome back to IntelliCore</p>
      </div>

      <Link
        to="/profile"
        className="navbar-profile-button"
      >
        <span>👤</span>
        <span>Student</span>
      </Link>

    </header>
  )
}

export default Navbar