import { getUserLikesInPostAction } from "@/actions/post/interactions"
import BackNavigation from "@/components/ui/BackNavigation"
import FullPostInteractionsView from "@/features/interactions/components/post/FullPostInteractionsView"


type Props = {
    params : {
        postId: string
    }
}

const page = async ({params}: Props) => {
    const {postId} = await params

    const userLikesInPost = await getUserLikesInPostAction(parseInt(postId, 10));


  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <BackNavigation title="Información de interacciones" />
      <FullPostInteractionsView userLikesInPost={userLikesInPost} postId={parseInt(postId, 10)} />
    </div>
  )
}

export default page
