"use client"

import { useAuth } from "@/lib/context/auth-context";
import { User, LogOut, LogIn, UserPlus, Menu, Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";


export function AuthNav() {
  const { user, isAuthenticated, logoutUser, isLoading } = useAuth();

  if (isLoading)
    return <div className="w-10 h-10 animate-pulse bg-muted rounded-full" />;

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <nav className="md:flex items-center gap-3">
        <Link href="/dashboard"><Button variant="ghost">Mis Rutas</Button></Link>
      </nav>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-60 z-500">
          


          {!isLoading && (
            <>
              {isAuthenticated ? (
                <>
                  <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="cursor-pointer">
                    <Settings className="w-4 h-4 mr-2"/>
                      Configurar cuenta
                    </Link>
                  </DropdownMenuItem>


                  <DropdownMenuItem
                    onClick={logoutUser}
                    className="cursor-pointer text-destructive"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/login" className="cursor-pointer">
                      Iniciar Sesión
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/register" className="cursor-pointer">
                      Registrarse
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
