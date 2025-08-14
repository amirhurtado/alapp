import { getPostsLikedByUser } from "@/actions/post"
import { getUserbyNameAction } from "@/actions/user"
import BackNavigation from "@/components/ui/BackNavigation"
import FullInteractionView from "@/features/interactions/components/FullInteractionView"
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

    if(!userInteractionInfo) return

    const likePosts = await getPostsLikedByUser(userInteractionInfo?.id)

    const title = currUser?.username === username ? "Tus interacciones" : `Interacciones de ${username}`

    if(!userInteractionInfo) return

  return (
    <div>
      <BackNavigation title={title} />
      <FullInteractionView  likePosts={likePosts} userIdInteraction={userInteractionInfo.id} />

    </div>
  )
}

export default page
