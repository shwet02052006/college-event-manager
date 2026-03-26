import { useParams } from 'react-router-dom'
import { useState } from 'react'
import api from '../utils/axiosInstance'

export default function RegisterEvent() {
  const { id } = useParams()
  const [message, setMessage] = useState('')

  const handleRegister = async () => {
    setMessage('')
    try {
      await api.post('/registrations', { eventId: id })
      setMessage('Registered successfully!')
    } catch (err) {
      setMessage(err?.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Register for Event</h1>
      <button onClick={handleRegister} className="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
      {message && <p className="mt-3">{message}</p>}
    </div>
  )
}
