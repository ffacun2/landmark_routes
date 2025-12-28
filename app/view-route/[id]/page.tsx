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

  if (error && !route) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-error text-lg">{error}</p>
          <button
            onClick={() => router.push('/view-route')}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors"
          >
            Volver a Buscar
          </button>
        </div>
      </main>
    )}

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