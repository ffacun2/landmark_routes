import { Button } from "@/components/ui/button";

interface ActionButtonsProps {
  isAuthor: boolean;
  isEditing: boolean;
  isSaving: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
}

export function ActionButtons({ isAuthor, isEditing, isSaving, onEdit, onCancel, onSave }: ActionButtonsProps) {
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
        <Button onClick={onEdit} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
          Editar Ruta
        </Button>
      )}
    </div>
  );
}