"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { LoginFormValues, RegisterFormValues, User } from '@/lib/auth/definitions';
import { useRouter } from 'next/navigation';
import { authClient } from '@/services/auth/auth.client';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginUser: (credentials: LoginFormValues) => void;
  registerUser: (values: RegisterFormValues) => void;
  logoutUser: () => void;
  updateUser: (user:User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Al cargar, verificamos si hay una sesión activa (llamando a un endpoint de perfil)
  useEffect(() => {
    authClient.checkSession()
    .then(data => setUser(data.user))
    .catch(() => setUser(null))
    .finally(() => setIsLoading(false))
  }, []);

  const loginUser = async (credentials: LoginFormValues) => {
    const data = await authClient.login(credentials)
    setUser(data.user);
    router.push('/dashboard');
  };

  const logoutUser = async () => {
    await authClient.logout();
      setUser(null);
      router.push('/');
      router.refresh(); // Limpia la caché de las rutas de servidor
  };

  const registerUser = async (values:RegisterFormValues) => {
    const data = await authClient.register(values);
    
    authClient.login(values)
  }

  const updateUser = async (user: User) => {
    const data = await authClient.updateProfile(user);
    setUser(data.user)
    router.refresh();
  }  

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      loginUser, 
      registerUser,
      logoutUser,
      updateUser
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