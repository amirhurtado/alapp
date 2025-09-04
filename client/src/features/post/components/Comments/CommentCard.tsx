import { FullCommentType } from "@/types";

import CommentReplies from "./CommentReplies/CommentReplies";
import Content from "./Content";
import Like from "./Like";
import { useLikeCommentMutation } from "../../hooks/useLikeCommentMutation";
import { useDeleteCommentMutation } from "../../hooks/useDeleteCommentMutation";
import DeleteComment from "./CommentReplies/DeleteComment";

interface CommentCardProps {
  comment: FullCommentType;
  currentUserId: string;
  commentReply?: boolean;
}

export const CommentCard = ({
  comment,
  currentUserId,
  commentReply,
}: CommentCardProps) => {

  const getQueryKey = commentReply ? ["commentsReply",  {parentId: comment.parentId}] : ["comments", {postId: comment.postId}]

  const onLike = useLikeCommentMutation(getQueryKey);
  const onDelete = useDeleteCommentMutation();

  
  return (
    <div
      className={`flex  flex-col gap-2 hover:bg-hover ${
        !commentReply && "px-4"
      } py-6 transition-colors duration-200 ease-in border-y-1 border-border `}
    >
      <div className="flex w-full gap-3 ">
        <Content comment={comment} currentUserId={currentUserId} />

        <div className="flex flex-col justify-between items-end">
          <DeleteComment onDelete={() => onDelete.mutate({commendId: comment.id})}/>
          <Like
          likes={comment.likesComment}
          currentUserId={currentUserId}
          onLike={() => onLike.mutate({commentId: comment.id, currentUserId: currentUserId})}
        />

        </div>
        
        
      </div>

      {!commentReply && (
        <CommentReplies
          comment={{
            id: comment.id,
            authorName: comment.user.name,
            responses: comment._count.comments,
          }}
          postId={comment.postId}
          currentUserId={currentUserId}
        />
      )}
    </div>
  );
};

export default CommentCard;
