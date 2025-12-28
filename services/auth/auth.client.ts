import { LoginFormValues, RegisterFormValues, User } from "@/lib/auth/definitions";


export const authClient = {

    async login (credentials: LoginFormValues): Promise<{ user:User }> {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
    
        if(!res.ok){
            const error = await res.json();
            throw new Error (error.message || "Error de autenticacion")
        }

        return res.json();
    },

    async register (values: RegisterFormValues): Promise<{ user: User }> {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
          });
          
          if (!res.ok){
            const data = await res.json();
            throw new Error(data.message || 'Error al crear cuenta');
            } 

          return res.json();
    },

    async checkSession(): Promise<{ user: User }> {
        const res = await fetch('/api/auth/me');
        if (!res.ok) throw new Error('Sesión no encontrada');
        return res.json();
      },

    async logout(): Promise<void> {
        const res = await fetch('/api/auth/logout', { 
            method: 'POST' 
        });
        if (!res.ok) 
            throw new Error('Error al cerrar sesión');
    },

    async updateProfile(userData: { name?: string; email?: string; password?: string }) {
        const res = await fetch('/api/auth/update-profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });
    
        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message || 'No se pudo actualizar el perfil');
        }
    
        return res.json();
      }
}