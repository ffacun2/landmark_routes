"use client";
import { RouteEditor } from "@/components/route/route-editor";
import { useTrip } from "@/hooks/use-trip-manager";
import { routesService } from "@/services/routes.service";
import { useAuth } from "@/lib/context/auth-context";
import { useRouter } from "next/navigation";
import Backbutton from "@/components/backbutton";

export default function CreateRoutePage() {
  const { user } = useAuth();
  const router = useRouter();
  const { 
    landmarks, routeName, setRouteName,
    isSaving, setIsSaving, error, setError,
    addLandmark, updateLandmark, removeLandmark, reorderLandmarks
  } = useTrip();

  const handleSave = async () => {
    if (!routeName) return setError("Asigna un nombre a la ruta");
    if (landmarks.length < 2) return setError("Agrega al menos 2 puntos");
    
    setIsSaving(true);
    try {
      const { routeId } = await routesService.create({
        name: routeName,
        landmarks,
        author: user?.name,
        authorId: user?.id
      });
      router.push(`/view-route/${routeId}`);
    } catch (err: any) {
      setError(err.message);
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Backbutton string="Cancelar" />
      <RouteEditor 
        name={routeName}
        setName={setRouteName}
        landmarks={landmarks}
        isEditing={true}
        isSaving={isSaving}
        isAuthor={true}
        onEdit={() => {}}
        onCancel={() => router.push('/dashboard')}
        onSave={handleSave}
        onAddLandmark={addLandmark}
        onRemoveLandmark={removeLandmark}
        onReorderLandmarks={reorderLandmarks}
        onUpdateLandmark={updateLandmark}
        error={error}
      />
    </main>
  );
}