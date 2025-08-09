"use client";
import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";


interface SubmitButtonProps {
  disabled: boolean
  text: string; 
  className?: string; 
}

export function SubmitButton({ disabled, text, className  }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className={`${className} max-w-max text-center text-black cursor-pointer bg-icon-green py-1 px-3 rounded-lg text-md transition-transform active:scale-[0.95] ${
        (disabled || pending) && "opacity-50" 
      }`}
    >
      {pending ? <LoaderCircle className="animate-spin" /> : text}
    </button>
  );
}