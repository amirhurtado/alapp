

import { deleteNotificationAction } from "@/actions/notification/deleteNotification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  Trash, Loader2 } from "lucide-react";
import React, { useState } from "react";
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

interface DeleteNotificationProps {
  notificationId: string;
}

const DeleteNotification = ({ notificationId }: DeleteNotificationProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteNotificationAction, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      setIsDialogOpen(false); 
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleDelete = () => {
    mutate(notificationId);
  };

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>

        <button className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
          <Trash size={18} className="text-gray-500 hover:text-red-500" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Esto eliminará permanentemente la
            notificación y sus datos relacionados.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending} 
            className="bg-red-500 hover:bg-red-600"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Eliminando...
              </>
            ) : (
              <>
                <Trash className="mr-2 h-4 w-4" /> 
                Eliminar
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteNotification;