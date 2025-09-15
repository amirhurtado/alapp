
"use client";

import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import { toast } from "sonner";
import { KeyRound, Eye, EyeOff } from "lucide-react";
import { SubmitButton } from "@/components/ui/SubmitButton";

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

  const renderPasswordField = (
    id: string,
    label: string,
    value: string,
    setter: (val: string) => void,
    isVisible: boolean,
    setIsVisible: (visible: boolean) => void
  ) => (
    <div className="flex flex-col w-full md:w-[22rem] gap-2">
      <label className="text-xs text-text-gray" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          placeholder={label}
          type={isVisible ? "text" : "password"}
          value={value}
          onChange={(e) => setter(e.target.value)}
          className="w-full border-b rounded-lg bg-input py-2 pr-10 pl-10 font-poppins text-sm text-text-gray"
        />
        <KeyRound
          strokeWidth={1}
          size={20}
          className="absolute left-2 top-1/2 -translate-y-[50%] text-text-gray"
        />
        <button
          type="button"
          onClick={() => setIsVisible(!isVisible)}
          className="absolute right-2 top-1/2 -translate-y-[50%] text-text-gray cursor-pointer"
        >
          {isVisible ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h3 className="text-md font-semibold text-white">Seguridad</h3>

      {renderPasswordField(
        "current-password",
        "Contraseña Actual",
        currentPassword,
        setCurrentPassword,
        showCurrentPassword,
        setShowCurrentPassword
      )}
      {renderPasswordField(
        "new-password",
        "Nueva Contraseña",
        newPassword,
        setNewPassword,
        showNewPassword,
        setShowNewPassword
      )}
      {renderPasswordField(
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