import { Settings, TriangleAlert } from "lucide-react";
import React, { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { useRouter } from "next/navigation";

interface DeleteGroupProps {
  onDelete: () => void;
}

const DeleteGroup = ({ onDelete }: DeleteGroupProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    onDelete();

    router.back();
  };
  return (
    <div>
      <AlertDialog>
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <Settings
              size={29}
              strokeWidth={1}
              className="text-text-gray hover:text-primary-color cursor-pointer transition-colors duration-200 ease-in"
            />
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2">
            <AlertDialogTrigger asChild>
              <button
                type="button"
                onClick={() => {
                  setPopoverOpen(false);
                }}
                className="w-full text-center flex gap-2 py-2 cursor-pointer bg-red-500 hover:bg-red-600 text-white  px-4 rounded-md text-sm font-medium transition-colors active:scale-[0.98]"
              >
                <TriangleAlert size={16} />

                <p className="text-xs "> Borrar Grupo</p>
              </button>
            </AlertDialogTrigger>
          </PopoverContent>
        </Popover>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente
              el grupo y el contenido en él.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteGroup;
