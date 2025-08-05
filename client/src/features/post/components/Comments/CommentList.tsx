import CreateComment from "./CreateComment";
import { getCommentsAction } from "@/actions/comment";
import { Comment } from "./Comment/Comment";
import InfinityComments from "./InfinityComments";

interface CommentsProps {
  currentUser: {
    id: string;
    imgUrl: string;
  };

  postId: number;
}

const CommentList = async ({ currentUser, postId }: CommentsProps) => {
  const comments = await getCommentsAction(postId);

  return (
    <div className="flex flex-col mt-3 ">
      <CreateComment
        currentUser={{
          id: currentUser.id,
          imgUrl: currentUser.imgUrl,
        }}
        postId={postId}
      />

      {comments.map((comment, index) => (
        <div key={index}>
          <Comment
            comment={comment}
            currentUserId={currentUser.id}
          />
        </div>
      ))}

      <InfinityComments commentsLength={comments.length} postId={postId} currentUserId={currentUser.id} />

    </div>
  );
};

export default CommentList;
