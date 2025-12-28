"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterSchema, type RegisterFormValues } from "@/lib/auth/definitions"
import { useAuth } from "@/lib/context/auth-context"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { PasswordInput } from "@/components/form/passwordInput"

export default function RegisterPage() {
  const { registerUser, isLoading } = useAuth() 
  const { toast } = useToast()
  const [acceptTerms, setAcceptTerms] = useState(false)

  // Inicializamos React Hook Form con Zod
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })


  const onSubmit = async (values: RegisterFormValues) => {
    if (!acceptTerms) {
      toast({
        title: "Atención",
        description: "Debes aceptar los términos y condiciones",
        variant: "destructive",
      })
      return
    }

    try {
      const data = await registerUser(values);
      toast({
        title: "¡Bienvenido!",
        description: "Cuenta creada exitosamente",
      })    
    } 
    catch (error: any) {
      toast({
        title: "Error de registro",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <Card className="w-full max-w-md p-8 shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Crear Cuenta</h2>
            <p className="text-muted-foreground">Únete a RouteShare y empieza a crear rutas</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Campo Nombre */}
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <Input
                id="name"
                placeholder="Juan Pérez"
                {...register("name")}
                disabled={isLoading}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
            </div>

            {/* Campo Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                {...register("email")}
                disabled={isLoading}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>

            {/* Campo Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <PasswordInput 
                id="password"
                placeholder="Mínimo 8 caracteres"
                {...register("password")}
                disabled={isLoading}
                className={errors.password ? "border-destructive" : ""}
                />
              {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
            </div>

            {/* Términos y Condiciones */}
            <div className="flex items-start gap-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                disabled={isLoading}
              />
              <Label htmlFor="terms" className="text-xs leading-relaxed cursor-pointer select-none">
                Acepto los{" "}
                <Link href="/terms" className="text-primary hover:underline font-medium">términos</Link>
                {" "}y la{" "}
                <Link href="/privacy" className="text-primary hover:underline font-medium">política de privacidad</Link>
              </Label>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creando cuenta...
                </>
              ) : (
                "Crear Cuenta"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="text-primary font-semibold hover:underline">
                Iniciar sesión
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}