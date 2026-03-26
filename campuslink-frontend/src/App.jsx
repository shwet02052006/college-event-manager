import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import EventList from './pages/EventList.jsx'
import EventForm from './pages/EventForm.jsx'
import RegisterEvent from './pages/RegisterEvent.jsx'
import { AuthProvider, useAuthContext } from './context/AuthContext.jsx'

function PrivateRoute({ children }) {
  const { user } = useAuthContext()
  return user ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <Navbar />
        <main className="max-w-6xl mx-auto p-4">
          <Routes>
            <Route path="/" element={<EventList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/events/new" element={<PrivateRoute><EventForm /></PrivateRoute>} />
            <Route path="/events/:id/register" element={<PrivateRoute><RegisterEvent /></PrivateRoute>} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  )
}
