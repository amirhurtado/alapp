"use client";

import { Ellipsis } from "lucide-react";
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
import Link from "next/link";

interface OtherOptionsPostProps {
  onDelete?: () => void;
  fromPostInfo?: boolean;
  postId: number;
}

const OtherOptionsPost = ({
  onDelete,
  fromPostInfo,
  postId,
}: OtherOptionsPostProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (onDelete) onDelete();
    if (fromPostInfo) router.back();
  };

  return (
    <AlertDialog>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <Ellipsis
            size={18}
            className="text-text-gray hover:text-primary-color cursor-pointer transition-colors duration-200 ease-in"
          />
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2 flex flex-col gap-2">
          <Link
            href={`/edit-post/${postId}`}
            className="w-full text-center cursor-pointer border-1 border-border text-white py-1 px-4 rounded-md text-sm font-medium transition-colors active:scale-[0.98]"
          >
            Editar
          </Link>

          {onDelete ? (
            <AlertDialogTrigger asChild>
              <button
                type="button"
                onClick={() => {
                  setPopoverOpen(false);
                }}
                className="w-full text-center cursor-pointer !border-none !outline-none focus:outline-none  bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-md text-sm font-medium transition-colors active:scale-[0.98]"
              >
                Borrar
              </button>
            </AlertDialogTrigger>
          ) : (
            <p className="text-xs text-text-gray">No eres el autor</p>
          )}
        </PopoverContent>
      </Popover>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Esto eliminará permanentemente el
            post de nuestros servidores.
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
  );
};

export default OtherOptionsPost;
