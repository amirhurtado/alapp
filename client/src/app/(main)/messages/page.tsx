import { getFollowingsAction } from "@/actions/follow/follow";
import { getChatsAction } from "@/actions/messages/getChats";
import BackNavigation from "@/components/ui/BackNavigation";
import FullChatsView from "@/features/messages/components/FullChatsView";
import { currentUser } from "@clerk/nextjs/server"
import { notFound } from "next/navigation";

const page = async () => {
    const currUser = await currentUser();

    if(!currUser) return notFound();

    const [chats, followings] = await Promise.all ([
        getChatsAction(currUser.id),
        getFollowingsAction(currUser.id)
    ]) 




  return (
    <div className="flex flex-col h-[100dvh] overflow-hidden">
        <BackNavigation title="Tús mensajes" />
        <FullChatsView chats={chats} followings={followings} currentUserId={currUser.id} />
    </div>
  )
}

export default page
