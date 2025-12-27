import { DELETE } from "@/app/api/routes/[id]/route";
import { NewRouteData } from "@/types/route.types";

// services/routes.service.ts
export const routesService = {

  async create(data: NewRouteData) {
    const res = await fetch('/api/routes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Error al crear la ruta');
    }

    return res.json(); 
  },


    async getById(id: string) {
      const res = await fetch(`/api/routes/${id}`);
      if (!res.ok) throw new Error('Route not found');
      return res.json();
    },
  
    async update(id: string, data: { name: string; landmarks: any[] }) {
      const res = await fetch(`/api/routes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to save changes');
      return res.json();
    },


    async deleteRoute(id: string) {
      const res = await fetch(`/api/routes/${id}`,{
        method: 'DELETE',
      })
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'No se pudo eliminar la ruta');
      }
      return data;
    }
  };