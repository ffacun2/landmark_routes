"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { RegisterFormValues, User } from '@/lib/auth/definitions';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: User) => void;
  registerUser: (values:RegisterFormValues) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Al cargar, verificamos si hay una sesión activa (llamando a un endpoint de perfil)
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me'); // Endpoint que verifica el JWT en la cookie
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          router.push('/dashboard');
        }
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }
    checkAuth();
  }, []);

  const login = async (userData: User) => {
    const res = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(userData),
    });
    const data = await res.json();
    
    if(!res.ok)
        throw new Error (data.message || "Error de autenticacion")
    setUser(data.user);
    router.push('/dashboard');
  };

  const logout = async () => {
    const res = await fetch('/api/auth/logout', { method: 'POST' });

    if (res.ok) {
      setUser(null);
      router.push('/');
      router.refresh(); // Limpia la caché de las rutas de servidor
    }

  };

  const registerUser = async (values:RegisterFormValues) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || 'Error al crear cuenta');

    login(data.user)
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      login, 
      registerUser,
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de un AuthProvider');
  return context;
};