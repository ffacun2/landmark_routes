import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Share2, RouteIcon, UserPlus } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Crea y comparte rutas turísticas increíbles
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty">
            Diseña itinerarios personalizados con múltiples puntos de interés, visualiza tus rutas en mapas interactivos
            y compártelas con un solo enlace.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                <UserPlus className="w-5 h-5" />
                Comenzar Gratis
              </Button>
            </Link>
            <Link href="/login">
                <Button
                  size="lg"
                  variant="secondary"
                  className="border-primary-foreground w-full sm:w-auto"
                >
                  Ya tengo cuenta
                </Button>
              </Link>
          </div>

          <p className="text-sm text-muted-foreground">Crea una cuenta para guardar y gestionar tus rutas</p>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Múltiples Landmarks</h3>
            <p className="text-muted-foreground">
              Añade tantos puntos de interés como quieras. Cada uno con nombre, descripción y ubicación precisa en el
              mapa.
            </p>
          </Card>

          <Card className="p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <RouteIcon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Visualización Interactiva</h3>
            <p className="text-muted-foreground">
              Visualiza tu ruta completa con líneas conectando todos los landmarks en orden. Reordénalos fácilmente
              arrastrando.
            </p>
          </Card>

          <Card className="p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Share2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Compartir con Enlace</h3>
            <p className="text-muted-foreground">
              Genera un enlace único para compartir tu ruta. Cualquiera puede visualizarla sin necesidad de registro.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-primary text-primary-foreground p-8 md:p-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">¿Listo para crear tu primera ruta?</h3>
            <p className="text-primary-foreground/90 mb-6">
              Regístrate gratis para guardar tus rutas, editarlas en cualquier momento y acceder desde cualquier
              dispositivo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-background text-foreground hover:bg-background/90 w-full sm:w-auto"
                >
                  Crear Cuenta Gratis
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 w-full sm:w-auto bg-transparent"
                >
                  Ya tengo cuenta
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}
