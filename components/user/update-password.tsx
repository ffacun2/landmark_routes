import { Loader2, Lock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { PasswordInput } from "../form/passwordInput";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";


export default function UpdatePasswordPanel() {
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isChangingPassword, setIsChangingPassword] = useState(false)

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault()
    
        if (newPassword !== confirmPassword) {
          toast({
            title: "Error",
            description: "Las contraseñas no coinciden",
            variant: "destructive",
          })
          return
        }
    
        if (newPassword.length < 6) {
          toast({
            title: "Error",
            description: "La contraseña debe tener al menos 6 caracteres",
            variant: "destructive",
          })
          return
        }
    
        setIsChangingPassword(true)
    
        try {
          const response = await fetch("/api/auth/change-password", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
            body: JSON.stringify({ currentPassword, newPassword }),
          })
    
          const data = await response.json()
    
          if (!response.ok) {
            throw new Error(data.error || "Error al cambiar contraseña")
          }
    
          toast({
            title: "Contraseña actualizada",
            description: "Tu contraseña se cambió correctamente",
          })
    
          // Limpiar campos
          setCurrentPassword("")
          setNewPassword("")
          setConfirmPassword("")
        } catch (error: any) {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          })
        } finally {
          setIsChangingPassword(false)
        }
      }

    return (
        <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Seguridad
              </CardTitle>
              <CardDescription>Cambia tu contraseña para mantener tu cuenta segura</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Contraseña Actual</Label>
                  <PasswordInput
                    id="currentPassword"
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e: { target: { value: React.SetStateAction<string> } }) => setCurrentPassword(e.target.value)}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nueva Contraseña</Label>
                  <PasswordInput
                    id="newPassword"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e: { target: { value: React.SetStateAction<string> } }) => setNewPassword(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Mínimo 6 caracteres</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
                  <PasswordInput
                    id="confirmPassword"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e: { target: { value: React.SetStateAction<string> } }) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <Button type="submit" disabled={isChangingPassword} className="w-full sm:w-auto">
                  {isChangingPassword ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Cambiando...
                    </>
                  ) : (
                    "Cambiar Contraseña"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
    )
}