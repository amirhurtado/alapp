"use client";
import { useFormStatus } from "react-dom";
import { LoaderCircle, SendHorizontal } from "lucide-react";


interface SubmitButtonProps {
  disabled: boolean
  text?: string; 
  className?: string; 
}

export function SubmitButton({ disabled, text, className = "base"}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  let applyclassName = null

  if(className === "base"){
    applyclassName = "text-black bg-icon-green py-1 px-3 rounded-lg text-md "
  }else if(className === "comment"){
    applyclassName = "text-icon-green font-semibold text-sm"
  }else if(className === "comment-xs"){
    applyclassName = "text-icon-green font-semibold text-xs"} 

  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className={`${applyclassName} max-w-max text-center  cursor-pointer  transition-transform duration-200 ease-in active:scale-[0.95] ${
        (disabled || pending) && "opacity-50" 
      }`}
    >
      {pending ? <LoaderCircle className="animate-spin" /> : text ? text :  <SendHorizontal size={22} className="text-white"/>}
    </button>
  );
}