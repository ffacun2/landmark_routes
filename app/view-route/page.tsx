
import SearchRouteForm from '@/components/search-route-form'

export default function ViewRoute() {

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex justify-center py-12">
            <h1 className="text-4xl font-bold text-text-primary">Buscar Ruta</h1>   
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchRouteForm />
      </div>
    </main>
  )
}
