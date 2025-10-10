import { getUserLikesInPostAction } from "@/actions/post/interactions";
import BackNavigation from "@/components/ui/BackNavigation";
import FullPostInteractionsView from "@/features/interactions/components/post/FullPostInteractionsView";
import { currentUser } from "@clerk/nextjs/server";

type Props = {
  params: Promise<{
    postId: string;
  }>;
};

const page = async ({ params }: Props) => {
  const [{ postId }, currUser] = await Promise.all([
    await params,
    currentUser(),
  ]);

  if (!currUser) return;

  const userLikesInPost = await getUserLikesInPostAction(
    currUser.id,
    parseInt(postId, 10)
  );

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <BackNavigation title="Información de interacciones" />
      <FullPostInteractionsView
        userLikesInPost={userLikesInPost}
        postId={parseInt(postId, 10)}
        currentUserId={currUser.id}
      />
    </div>
  );
};

export default page;
