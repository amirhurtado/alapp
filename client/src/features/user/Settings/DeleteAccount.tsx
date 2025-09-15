// src/components/settings/DeleteAccount.tsx

"use client";

import React, { useState } from "react";
// 1. Importamos el hook 'useSignIn' que es el que necesitamos
import { useUser, useClerk, useSignIn } from "@clerk/nextjs";
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
import { deleteAccountAction } from "@/actions/user/deleteUser";
import InputPassword from "./InputPassword";


interface ClerkError {
  errors: { longMessage: string }[];
}

const DeleteAccount = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  // 2. Obtenemos la instancia de 'signIn' y su estado de carga
  const { signIn, isLoaded: isSignInLoaded } = useSignIn();
  const router = useRouter();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleDeleteAccount = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Verificamos que todo esté cargado antes de proceder
    if (!isSignInLoaded || !user) {
      toast.error("El servicio no está listo, por favor espera un momento.");
      return;
    }
    if (!password) {
      toast.error("Por favor, ingresa tu contraseña para confirmar.");
      return;
    }

    setIsSubmitting(true);
    try {

      const identifier = user.primaryEmailAddress?.emailAddress;
      if (!identifier) {
        throw new Error("No se pudo encontrar el email del usuario.");
      }

      await signIn.create({
        identifier,
        password,
        strategy: "password", 
      });

      await user.delete();
      await deleteAccountAction(user.id);

      toast.success("Tu cuenta ha sido eliminada permanentemente.");
      await signOut(() => router.push("/"));

    } catch (err: unknown) {
      let errorMessage = "Ocurrió un error. Inténtalo de nuevo.";
      const clerkError = err as ClerkError;
      if (clerkError.errors && clerkError.errors.length > 0) {
        errorMessage = clerkError.errors[0].longMessage;
      }
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
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
          <button className="mt-4 bg-red-400  text-black py-1 px-3 rounded-lg text-md  inline-flex items-center gap-2 transition-colors cursor-pointer hover:bg-red-500 ease-in duration-200">
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
              disabled={isSubmitting}
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