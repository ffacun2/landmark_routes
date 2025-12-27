"use client";
import MapComponent from '@/components/map-component'
import RouteDetails from '@/components/route-details'
import { ActionButtons } from '@/components/route/action-buttons'
import { PlaceSearch } from '@/components/route/place-search'
import { Landmark, Route } from '@/types/route.types'

interface RouteEditorProps {
  name: string;
  setName: (name: string) => void;
  landmarks: Landmark[];
  isEditing: boolean;
  isSaving: boolean;
  isAuthor: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onAddLandmark: (lat: number, lng: number, name?: string, desc?: string) => void;
  onRemoveLandmark: (id: string) => void;
  onReorderLandmarks: (l: Landmark[]) => void;
  onUpdateLandmark: (id: string, u: Partial<Landmark>) => void;
  route?: Route; 
  error?: string;
}

export function RouteEditor(props: RouteEditorProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="flex justify-center mb-6">
        {props.isEditing ? (
          <input
            type="text"
            value={props.name}
            onChange={(e) => props.setName(e.target.value)}
            className="text-2xl font-bold px-3 py-1 border-2 border-primary rounded w-full max-w-md bg-background"
            placeholder="Nombre de la ruta"
          />
        ) : (
          <h1 className="text-3xl font-bold truncate">{props.name || "Nueva Ruta"}</h1>
        )}
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-surface rounded-2xl border-2 border-border overflow-hidden shadow-lg h-[500px]">
            <MapComponent 
              landmarks={props.landmarks} 
              onMapClick={(lat, lng) => props.onAddLandmark(lat, lng)} 
            />
          </div>
        </div>

        <aside className="space-y-6">
          <ActionButtons 
            isAuthor={props.isAuthor}
            isEditing={props.isEditing}
            isSaving={props.isSaving}
            onEdit={props.onEdit}
            onCancel={props.onCancel}
            onSave={props.onSave}
          />

          {props.isEditing && (
            <PlaceSearch onSelect={(lat, lng, name, desc) => props.onAddLandmark(lat, lng, name, desc)} />
          )}

          {props.error && <p className="text-destructive text-sm bg-destructive/10 p-2 rounded">{props.error}</p>}

          <RouteDetails
            route={props.route || ({ name: props.name, id: 'preview', author: 'Tú', landmarks: props.landmarks, createdAt: new Date().toISOString() } as Route)}
            isEditing={props.isEditing}
            editedLandmarks={props.landmarks}
            onRemoveLandmark={props.onRemoveLandmark}
            onReorderLandmarks={props.onReorderLandmarks}
            onUpdateLandmark={props.onUpdateLandmark}
          />
        </aside>
      </div>
    </div>
  );
}