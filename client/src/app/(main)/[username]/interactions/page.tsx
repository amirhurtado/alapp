import { getPostsLikedByUserAction } from "@/actions/post/getPost"
import { getUserbyNameAction } from "@/actions/user/getUser"
import BackNavigation from "@/components/ui/BackNavigation"
import FullUserInteractionsView from "@/features/interactions/components/user/FullUserInteractionsView"
import { currentUser } from "@clerk/nextjs/server"


type Props = {
    params: {
        username: string
    }
}

const page = async ({params} : Props) => {



    const {username} = await params

    const [currUser, userInteractionInfo] = await Promise.all([
        currentUser(), getUserbyNameAction(username)
    ])

    if(!currUser || !userInteractionInfo) return

    const likePosts = await getPostsLikedByUserAction(userInteractionInfo?.id)

    const title = currUser?.username === username ? "Tus interacciones" : `Interacciones de ${username}`

    if(!userInteractionInfo) return

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <BackNavigation title={title} />
      <FullUserInteractionsView  likePosts={likePosts} userIdInteraction={userInteractionInfo.id} currentUserId={currUser.id} />

    </div>
  )
}

export default page
