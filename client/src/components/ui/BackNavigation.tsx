import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BackNavigationProps{
    title: string
    subtitle?: string
}

const BackNavigation = ({title, subtitle} : BackNavigationProps) => {
  return (
    <div className="bg-[#00000084] p-3 flex gap-9 items-center backdrop-blur-md z-10 sticky top-0 border-b-1 border-border">
        <Link aria-label="Ir a principal" href="/">
          <ArrowLeft size={20} className="cursor-pointer" />
        </Link>
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
