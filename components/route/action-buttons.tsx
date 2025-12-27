import { Button } from "@/components/ui/button";
import { Edit3, Trash2 } from "lucide-react";

interface ActionButtonsProps {
  isAuthor: boolean;
  isEditing: boolean;
  isSaving: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onDelete: () => void;
}

export function ActionButtons({ isAuthor, isEditing, isSaving, onEdit, onCancel, onSave, onDelete}: ActionButtonsProps) {
  if (!isAuthor) return null;

  return (
    <div className="pb-4">
      {isEditing ? (
        <div className="flex justify-around gap-4">
          <Button variant="outline" onClick={onCancel} disabled={isSaving} className="w-40">
            Cancelar
          </Button>
          <Button onClick={onSave} disabled={isSaving} className="w-40 bg-green-600 hover:bg-green-700 text-white">
            {isSaving ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Button onClick={onEdit} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
            <Edit3 className="w-4 h-4 mr-2" /> Editar Ruta
          </Button>
          <Button 
            variant="destructive" 
            onClick={() => {
              if(confirm("¿Estás seguro de que quieres eliminar esta ruta?")) {
                onDelete?.();
              }
            }} 
            className="px-3"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}