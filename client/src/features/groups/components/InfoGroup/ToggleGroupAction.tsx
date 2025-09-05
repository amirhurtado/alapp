import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ToggleGroupActionprops {
  isMember: boolean;
  onJoinAction: () => void;
}

const ToggleGroupAction = ({
  isMember,
  onJoinAction,
}: ToggleGroupActionprops) => {
  return (
    <div>
      {isMember ? (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div className="hover:text-white px-3 rounded-lg h-8 flex items-center cursor-pointer bg-red-400 active:scale-[0.95] transition-all duration-200 ease-in">
              <button
                aria-label="Abandonar"
                className="text-sm cursor-pointer"
              >
                Abandonar
              </button>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Seguro que quieres abandonar?</AlertDialogTitle>
              <AlertDialogDescription>
                Si abandonas el grupo, dejarás de recibir notificaciones y ya
                no podrás ver su contenido.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={onJoinAction} className="bg-red-400 hover:bg-red-400 text-white cursor-pointer">
                Sí, abandonar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <div className="flex flex-col gap-2 items-end">
          <div className="text-black hover:text-white px-3 rounded-lg h-8 flex items-center cursor-pointer bg-primary-color active:scale-[0.95] transition-all duration-200 ease-in">
            <button
              onClick={onJoinAction}
              aria-label="Unirte"
              className="text-sm cursor-pointer"
            >
              Unirte
            </button>
          </div>
          <p className="text-xs text-text-gray">
            Únete para recibir notificaciones.
          </p>
        </div>
      )}
    </div>
  );
};

export default ToggleGroupAction;