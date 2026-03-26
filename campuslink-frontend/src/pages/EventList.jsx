import { useEffect, useState } from 'react'
import api from '../utils/axiosInstance'
import EventCard from '../components/EventCard'
import Loader from '../components/Loader'

export default function EventList() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/events')
      .then((res) => setEvents(res.data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loader />

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((evt) => (
        <EventCard key={evt._id} event={evt} />
      ))}
    </div>
  )
}
