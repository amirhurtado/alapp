
"use client";

import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import { toast } from "sonner";
import { SubmitButton } from "@/components/ui/SubmitButton";
import InputPassword from "./InputPassword";

export const ChangePasswordForm = () => {
  const { user } = useUser();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("La nueva contraseña y la confirmación no coinciden.");
      return;
    }
    if (!currentPassword || !newPassword) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    setIsSubmitting(true);
    try {
      await user?.updatePassword({
        currentPassword,
        newPassword,
      });
      toast.success("¡Contraseña actualizada exitosamente!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      toast.error("Contraseña actual incorrecta");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h3 className="text-md font-semibold text-white">Cambiar contraseña</h3>

      {InputPassword(
        "current-password",
        "Contraseña Actual",
        currentPassword,
        setCurrentPassword,
        showCurrentPassword,
        setShowCurrentPassword
      )}
      {InputPassword(
        "new-password",
        "Nueva Contraseña",
        newPassword,
        setNewPassword,
        showNewPassword,
        setShowNewPassword
      )}
      {InputPassword(
        "confirm-password",
        "Confirmar Nueva Contraseña",
        confirmPassword,
        setConfirmPassword,
        showConfirmPassword,
        setShowConfirmPassword
      )}

      <div className="flex justify-start mt-4">
        <SubmitButton
          text="Actualizar"
          disabled={
            isSubmitting ||
            currentPassword === "" ||
            newPassword === "" ||
            confirmPassword === ""
          }
        />
      </div>
    </form>
  );
};