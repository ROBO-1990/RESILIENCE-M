import { useEffect, useState } from 'react'

const API_URL = 'http://127.0.0.1:8000/api/services/'

const statusColors = {
  healthy: '#15a34a',
  degraded: '#ca8a04',
  down: '#dc2626',
}

export default function App() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  async function loadServices() {
    const response = await fetch(API_URL)
    const data = await response.json()
    setServices(data)
    setLoading(false)
  }

  async function cycleStatus(service) {
    const order = ['healthy', 'degraded', 'down']
    const nextStatus = order[(order.indexOf(service.status) + 1) % order.length]

    await fetch(`${API_URL}${service.id}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: nextStatus }),
    })

    loadServices()
  }

  useEffect(() => {
    loadServices()
  }, [])

  return (
    <main className="container">
      <h1>Resilience Monitor</h1>
      <p>Application React + Django pour suivre l'état des services.</p>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="grid">
          {services.map((service) => (
            <button key={service.id} className="card" onClick={() => cycleStatus(service)}>
              <h2>{service.name}</h2>
              <p>{service.description}</p>
              <span
                className="badge"
                style={{ backgroundColor: statusColors[service.status] || '#334155' }}
              >
                {service.status}
              </span>
            </button>
          ))}
        </div>
      )}
    </main>
  )
}
