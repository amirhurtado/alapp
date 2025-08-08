'use client'
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface BackNavigationProps{
    title: string
    subtitle?: string
}

const BackNavigation = ({title, subtitle} : BackNavigationProps) => {
  const router = useRouter();
  return (
    <div className="bg-[#00000084] p-3 flex gap-9 items-center backdrop-blur-md z-10 sticky top-0 border-b-1 border-border">
        <div aria-label="Ir a principal" onClick={() => router.back()}>
          <ArrowLeft size={20} className="cursor-pointer" />
        </div>
         <div className="flex flex-col ">
          <p className="font-semibold text-md">
            {title}
          </p>
          <p className="text-xs text-text-gray">
            {subtitle}
          </p>
        </div>
      </div>
  )
}

export default BackNavigation
