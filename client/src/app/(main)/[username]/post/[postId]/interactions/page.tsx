import BackNavigation from "@/components/ui/BackNavigation"
import FullPostInteractionsView from "@/features/interactions/components/post/FullPostInteractionsView"


type Props = {
    params : {
        postId: number
    }
}

const page = async ({params}: Props) => {
    const {postId} = await params

    console.log("POST ID", postId)

  return (
    <div>
      <BackNavigation title="Información de interacciones" />
      <FullPostInteractionsView />
    </div>
  )
}

export default page
