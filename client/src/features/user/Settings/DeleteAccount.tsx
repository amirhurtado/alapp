// src/components/settings/DeleteAccount.tsx

"use client";

import React, { useState } from "react";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Trash2 } from "lucide-react";

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
import { deleteAccountAction } from "@/actions/user/deleteUser"; // Asegúrate que la ruta sea correcta
import InputPassword from "./InputPassword";

const DeleteAccount = () => {
  const { signOut } = useClerk();
  const router = useRouter();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleDeleteAccount = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!password) {
      toast.error("Por favor, ingresa tu contraseña para confirmar.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Llamamos a la Server Action segura con la contraseña del usuario.
      const result = await deleteAccountAction(password);

      // 2. Verificamos el resultado que nos devolvió la acción.
      if (result.success) {
        toast.success("Tu cuenta ha sido eliminada permanentemente.");
        // 3. Cerramos la sesión del cliente y lo redirigimos al inicio.
        await signOut(() => router.push("/"));
      } else {
        // Si la acción devolvió un error (ej. contraseña incorrecta), lo mostramos.
        toast.error(result.error || "Ocurrió un error inesperado.");
      }
    } catch {
      // Este catch es para errores de red o si la acción falla por completo.
      toast.error("No se pudo conectar con el servidor. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
      // Limpiamos la contraseña solo si la eliminación no fue exitosa.
      // Si fue exitosa, el componente se desmontará de todos modos.
      setPassword("");
    }
  };

  return (
    <div>
      <h3 className="text-md font-semibold text-white">Zona de Peligro</h3>
      <p className="text-sm text-text-gray mt-2">
        Una vez que eliminas tu cuenta, no hay vuelta atrás. Por favor, ten la
        certeza.
      </p>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogTrigger asChild>
          <button className="mt-4 bg-red-400 text-black py-1 px-3 rounded-lg text-md inline-flex items-center gap-2 transition-colors cursor-pointer hover:bg-red-500 ease-in duration-200">
            <Trash2 size={16} />
            Eliminar mi cuenta
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción es irreversible. Se eliminará permanentemente tu
              cuenta y todos tus datos asociados. Para confirmar, por favor
              ingresa tu contraseña actual.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="my-4">
            {InputPassword(
              "password-confirm",
              "Contraseña",
              password,
              setPassword,
              showPassword,
              setShowPassword
            )}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              disabled={!password || isSubmitting}
              className="bg-red-400 hover:bg-red-500"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Eliminando...
                </>
              ) : (
                "Eliminar cuenta permanentemente"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteAccount;