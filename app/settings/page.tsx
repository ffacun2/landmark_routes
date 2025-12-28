"use client"

import { useAuth } from "@/lib/context/auth-context"
import UpdateProfilePanel from "@/components/user/update-profile"
import UpdatePasswordPanel from "@/components/user/update-password"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function SettingsPage() {
  const { user, isAuthenticated, isLoading } = useAuth()


  if (isLoading) <LoadingSpinner/>

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Configuración de Cuenta</h1>
          <p className="text-muted-foreground">Administra tu perfil y preferencias de seguridad</p>
        </div>

        <div className="space-y-6">
          {/* Información de la cuenta */}
          <UpdateProfilePanel />

          {/* Cambiar contraseña */}
          <UpdatePasswordPanel/>
        </div>
      </div>
    </div>
  )
}
