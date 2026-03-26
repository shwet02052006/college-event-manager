import { useState } from 'react'
import api from '../utils/axiosInstance'

export default function EventForm() {
  const [form, setForm] = useState({ title: '', description: '', date: '', startTime: '', endTime: '', venue: '' })
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      const payload = { ...form, category: 'other' }
      await api.post('/events', payload)
      setMessage('Event created!')
      // TODO: Navigate to detail page
    } catch (err) {
      setMessage(err?.response?.data?.message || 'Failed to create event')
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Create Event</h1>
      {message && <p className="mb-2 text-sm">{message}</p>}
      <form className="space-y-3" onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input type="date" name="date" value={form.date} onChange={handleChange} className="border rounded px-3 py-2" required />
          <input type="time" name="startTime" value={form.startTime} onChange={handleChange} className="border rounded px-3 py-2" required />
          <input type="time" name="endTime" value={form.endTime} onChange={handleChange} className="border rounded px-3 py-2" required />
        </div>
        <input name="venue" placeholder="Venue" value={form.venue} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  )
}
