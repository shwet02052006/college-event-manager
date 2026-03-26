import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded px-3 py-2" required />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  )
}
