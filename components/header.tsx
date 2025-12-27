
import Link from "next/link"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AuthNav } from "@/components/auth-nav" 


export function Header() {

  return (
    <header className="border-b border-border bg-card sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold text-foreground">RouteShare</h1>
        </Link>
        
        <nav className="hidden md:flex items-center gap-3">
          <Link href="/view-route"><Button variant="ghost">Buscar Ruta</Button></Link>
          <Link href="/create-route"><Button variant="ghost">Crear Ruta</Button></Link>
                   
          <AuthNav />
        </nav>
      </div>
    </header>
  )
}