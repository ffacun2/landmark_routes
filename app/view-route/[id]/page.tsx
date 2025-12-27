"use client";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/auth-context";
import { RouteEditor } from "@/components/route/route-editor";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import Backbutton from "@/components/backbutton";
import { useTrip } from "@/hooks/use-trip-manager";
import { routesService } from "@/services/routes.service";
import { toast } from "@/hooks/use-toast";


export default function ViewRoutePage() {
  const { id } = useParams();
  const { user } = useAuth();
  const router = useRouter();

  const { 
    route, setRoute,landmarks, setLandmarks, routeName, setRouteName,
    isEditing, setIsEditing, isSaving, setIsSaving, isLoading, error, setError,
    addLandmark, updateLandmark, removeLandmark, reorderLandmarks, cancel
  } = useTrip(id as string);

  if (isLoading) return <LoadingSpinner />;

  const handleDelete = async () => {
    try {
      await routesService.deleteRoute(id as string);
      router.push('/dashboard'); 
      router.refresh();
      toast({
        title:"Ruta eliminada",
      })
    } catch (err: any) {
      toast({
        title:"No se pudo eliminar la ruta",
        variant:"destructive"
      })
    }
  };

  const handleUpdate = async () => {
    setIsSaving(true);
    try {
      const updatedRoute = await routesService.update(id as string, { 
        name: routeName, 
        landmarks: landmarks 
      });
      setRoute(updatedRoute); 
      setRouteName(updatedRoute.name);
      setLandmarks(updatedRoute.landmarks);
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
        onDelete={handleDelete}
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