import useAuth from '../hooks/useAuth'

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p>Welcome, <span className="font-medium">{user?.name}</span>!</p>
      <p>Your role: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{user?.role}</span></p>
      {/* TODO: Show user's events, registrations, and quick actions */}
    </div>
  )
}
