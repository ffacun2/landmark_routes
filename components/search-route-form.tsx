'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'


export default function SearchRouteForm() {
  const [routeId, setRouteId] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()


  const handleSearchRoute = (routeId: string) => {
    router.push(`/view-route/${routeId}`)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!routeId.trim()) {
      setError('Por favor, ingrese la ruta ID')
      return
    }

    setError('')
    handleSearchRoute(routeId.trim())
  }

  return (
    <div className="bg-surface rounded-2xl border-2 border-border p-8">
      <h2 className="text-3xl font-bold text-text-primary mb-6">Encuentra la Ruta</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="routeId" className="block text-sm font-semibold text-text-primary mb-3">
            Ruta ID
          </label>
          <input
            id="routeId"
            type="text"
            value={routeId}
            onChange={(e) => {
              setRouteId(e.target.value)
              setError('')
            }}
            placeholder="Pega la ruta ID aquí"
            className="w-full px-4 py-3 rounded-lg border-2 border-border focus:border-primary focus:outline-none transition-colors"
          />
          {error && <p className="text-error text-sm mt-2">{error}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-linear-to-r from-accent to-accent text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200"
        >
          Buscar Ruta
        </button>
      </form>

      <div className="mt-8 pt-8 border-t border-border">
        <h3 className="font-semibold text-text-primary mb-3">¿Cómo encontrar rutas?</h3>
        <ul className="space-y-2 text-text-secondary text-sm">
          <li className="flex gap-2">
            <span>📋</span>
            <span>Solicita al creador de la ruta su ID.</span>
          </li>
          <li className="flex gap-2">
            <span>🔗</span>
            <span>El ID se muestra al guardar una ruta.</span>
          </li>
          <li className="flex gap-2">
            <span>✅</span>
            <span>Pégalo aquí para ver la ruta completa con todos los puntos de referencia.</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
