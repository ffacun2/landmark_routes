import { useState, useEffect } from 'react';
import { routesService } from '@/services/routes.service';
import { Route, Landmark } from '@/types/route.types';

export function useRouteEditor(routeId: string) {
  const [route, setRoute] = useState<Route | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editedLandmarks, setEditedLandmarks] = useState<Landmark[]>([]);
  const [editedName, setEditedName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    routesService.getById(routeId)
      .then(data => {
        setRoute(data);
        setEditedName(data.name);
        setEditedLandmarks(data.landmarks);
      })
      .catch(err => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [routeId]);

  const save = async () => {
    if (!editedName.trim()) return setError('El nombre no puede estar vacío');
    
    setIsSaving(true);
    try {
      const updated = await routesService.update(routeId, { 
        name: editedName, 
        landmarks: editedLandmarks 
      });
      setRoute(updated);
      setIsEditing(false);
      setError('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const cancel = () => {
    if (route) {
      setEditedName(route.name);
      setEditedLandmarks(route.landmarks);
      setIsEditing(false);
      setError('');
    }
  };

  const handleRemoveLandmark = (id: string) => {
    const updated = editedLandmarks.filter(l => l.id !== id);
    setEditedLandmarks(updated.map((l, idx) => ({ ...l, order: idx })));
  };

  const handleReorderLandmarks = (newOrder: Landmark[]) => {
    setEditedLandmarks(newOrder.map((l, idx) => ({ ...l, order: idx })));
  };

  const handleUpdateLandmark = (id: string, updates: Partial<Landmark>) => {
    setEditedLandmarks(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  return { 
    route, isEditing, setIsEditing, isSaving, editedName, setEditedName, 
    editedLandmarks, isLoading, error, save, cancel,
    handleRemoveLandmark, handleReorderLandmarks, handleUpdateLandmark 
  };
}