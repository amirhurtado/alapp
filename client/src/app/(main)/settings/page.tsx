import BackNavigation from "@/components/ui/BackNavigation";
import FullSettingsView from "@/features/user/Settings/FullSettingsView"
import { currentUser } from "@clerk/nextjs/server"
import { notFound } from "next/navigation";

const page = async () => {
    const currUser = await currentUser();

    if(!currUser) return notFound();
  return (
    <div className="flex flex-col h-screen overflow-y-hidden">
       <BackNavigation title="Configuración" />

        <FullSettingsView  />
      
    </div>
  )
}

export default page
