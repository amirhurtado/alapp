import CreateComment from "./CreateComment";
import InfinityComments from "./InfinityComments";
import { FullCommentType } from "@/types";

interface CommentsProps {
  comments : Array<FullCommentType>
  currentUser: {
    id: string;
    imgUrl: string;
  };
  postId: number;
}

const CommentSection = ({ comments, currentUser, postId }: CommentsProps) => {
  return (
    <div className="flex flex-col mt-3 ">
      <CreateComment
        currentUser={{
          id: currentUser.id,
          imgUrl: currentUser.imgUrl,
        }}
        postId={postId}
      />
      
      <InfinityComments comments={comments} postId={postId} currentUserId={currentUser.id} />
    </div>
  );
};

export default CommentSection;
