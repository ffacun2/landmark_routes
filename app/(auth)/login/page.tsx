"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/context/auth-context"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { PasswordInput } from "@/components/form/passwordInput"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setIsLoading(true)
    try {
      await login({email:email, password:password})
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido de vuelta",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Credenciales incorrectas",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Iniciar Sesión</h2>
            <p className="text-muted-foreground">Accede a tu cuenta para gestionar tus rutas</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <PasswordInput 
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e: { target: { value: React.SetStateAction<string> } }) => setPassword(e.target.value)}
                disabled={isLoading}
                />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              ¿No tienes una cuenta?{" "}
              <Link href="/register" className="text-primary font-medium hover:underline">
                Regístrate gratis
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
