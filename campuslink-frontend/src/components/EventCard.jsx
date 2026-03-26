export default function EventCard({ event }) {
  return (
    <div className="border rounded p-4 bg-white shadow-sm">
      <h3 className="text-lg font-semibold">{event.title}</h3>
      <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()} • {event.venue}</p>
      <p className="mt-2 text-gray-700 line-clamp-2">{event.description}</p>
    </div>
  )
}
