"use client";
import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";

export function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-label="Publicar"
      disabled={disabled || pending}
      className={`text-black cursor-pointer bg-icon-green py-1 px-3 rounded-xl text-md transition-transform active:scale-[0.95] ${
        (disabled || pending) && "opacity-50 "
      }`}
    >
      {pending ? <LoaderCircle className="animate-spin" /> : "Publicar"}
    </button>
  );
}