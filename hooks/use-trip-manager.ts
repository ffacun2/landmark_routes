"use client";
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Landmark, Route } from '@/types/route.types';
import { routesService } from '@/services/routes.service';

export function useTrip(routeId?: string) {
  const [route, setRoute] = useState<Route | null>(null);
  const [landmarks, setLandmarks] = useState<Landmark[]>([]);
  const [routeName, setRouteName] = useState('');
  const [isEditing, setIsEditing] = useState(!routeId); // Si no hay ID, empezamos editando (creando)
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(!!routeId); // Solo cargando si hay ID
  const [error, setError] = useState('');

  // 1. Carga inicial (Solo si es Edición)
  useEffect(() => {
    if (routeId) {
      routesService.getById(routeId)
        .then(data => {
          setRoute(data);
          setRouteName(data.name);
          setLandmarks(data.landmarks);
        })
        .catch(err => setError(err.message))
        .finally(() => setIsLoading(false));
    }
  }, [routeId]);

  // 2. Lógica de manipulación de Landmarks (Compartida)
  const addLandmark = (lat: number, lng: number, name?: string, desc?: string) => {
    const newLandmark: Landmark = {
      id: uuidv4(),
      name: name || `Punto ${landmarks.length + 1}`,
      description: desc || '',
      lat, lng,
      order: landmarks.length,
    };
    setLandmarks(prev => [...prev, newLandmark]);
  };

  const updateLandmark = (id: string, updates: Partial<Landmark>) => {
    setLandmarks(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  const removeLandmark = (id: string) => {
    const updated = landmarks.filter(l => l.id !== id);
    setLandmarks(updated.map((l, idx) => ({ ...l, order: idx })));
  };

  const reorderLandmarks = (newOrder: Landmark[]) => {
    setLandmarks(newOrder.map((l, idx) => ({ ...l, order: idx })));
  };

  const cancel = () => {
    if (route) {
      setRouteName(route.name);
      setLandmarks(route.landmarks);
      setIsEditing(false);
    }
  };

  return {
    route, landmarks, routeName, setRouteName,
    isEditing, setIsEditing, isSaving, setIsSaving, isLoading, error, setError,
    addLandmark, updateLandmark, removeLandmark, reorderLandmarks, cancel
  };
}