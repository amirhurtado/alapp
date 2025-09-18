import BackNavigation from "@/components/ui/BackNavigation";
import FullMessagesView from "@/features/messages/components/FullMessagesView";
import { currentUser } from "@clerk/nextjs/server"
import { notFound } from "next/navigation";

const page = async () => {
    const currUser = await currentUser();

    if(!currUser) return notFound();

  return (
    <div>
        <BackNavigation title="Tús mensajes" />
        <FullMessagesView />
    </div>
  )
}

export default page
