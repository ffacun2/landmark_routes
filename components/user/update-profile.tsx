"use client"
import { Loader2, User as UserIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/context/auth-context";



export default function UpdateProfilePanel () {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)
    const {user, updateUser} = useAuth();

    useEffect(() => {
        if (user) {
          setName(user.name)
          setEmail(user.email)
        }
      }, [user])


    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsUpdatingProfile(true)
    
        try {
          const updated = await updateUser({name, email})
          
          toast({
            title: "Perfil actualizado",
            description: "Tus datos se actualizaron correctamente",
          })
    
          // Recargar la página para actualizar el contexto
          window.location.reload()
        } 
        catch (error: any) {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          })
        } finally {
          setIsUpdatingProfile(false)
        }
      }

    return (
        <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="w-5 h-5" />
            Información Personal
          </CardTitle>
          <CardDescription>Actualiza tu nombre y correo electrónico</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                type="text"
                placeholder="Tu nombre completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>


            <Button type="submit" disabled={isUpdatingProfile} className="w-full sm:w-auto">
              {isUpdatingProfile ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : (
                "Guardar Cambios"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    )
}