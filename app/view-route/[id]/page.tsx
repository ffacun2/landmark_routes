"use client";
import { useParams } from "next/navigation";
import { useAuth } from "@/lib/context/auth-context";
import { useRouteEditor } from "@/hooks/use-route-editor";
import { RouteEditor } from "@/components/route/route-editor";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import Backbutton from "@/components/backbutton";
import { useTrip } from "@/hooks/use-trip-manager";
import { routesService } from "@/services/routes.service";

export default function ViewRoutePage() {
  const { id } = useParams();
  const { user } = useAuth();
  const { 
    route, landmarks, routeName, setRouteName,
    isEditing, setIsEditing, isSaving, setIsSaving, isLoading, error, setError,
    addLandmark, updateLandmark, removeLandmark, reorderLandmarks, cancel
  } = useTrip(id as string);

  if (isLoading) return <LoadingSpinner />;

  const handleUpdate = async () => {
    setIsSaving(true);
    try {
      await routesService.update(id as string, { 
        name: routeName, 
        landmarks: landmarks 
      });
      // Opcional: recargar datos o mostrar éxito
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Backbutton string="Volver" />
      <RouteEditor 
        name={isEditing ? routeName : route?.name || ""}
        setName={setRouteName}
        landmarks={isEditing ? landmarks : route?.landmarks || []}
        isEditing={isEditing}
        isSaving={isSaving}
        isAuthor={user?.id === route?.authorId}
        onEdit={() => setIsEditing(true)}
        onCancel={cancel}
        onSave={handleUpdate}
        onAddLandmark={addLandmark} 
        onRemoveLandmark={removeLandmark}
        onReorderLandmarks={reorderLandmarks}
        onUpdateLandmark={updateLandmark}
        route={route!}
        error={error}
      />
    </main>
  );
}