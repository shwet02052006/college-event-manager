import { Link, NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="bg-white shadow sticky top-0 z-10">
      <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="font-semibold">CampusLink</Link>
        <div className="flex items-center gap-4">
          <NavLink to="/" className={({ isActive }) => isActive ? 'text-blue-600' : ''}>Events</NavLink>
          {user ? (
            <>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'text-blue-600' : ''}>Dashboard</NavLink>
              <button onClick={handleLogout} className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200">Logout</button>
            </>
          ) : (
            <NavLink to="/login" className={({ isActive }) => isActive ? 'text-blue-600' : ''}>Login</NavLink>
          )}
        </div>
      </nav>
    </header>
  )
}
