import { FullCommentType } from "@/types";

import CommentReplies from "./CommentReplies/CommentReplies";
import Content from "./Content";
import Like from "./Like";

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
  return (
    <div
      className={`flex  flex-col gap-2 hover:bg-hover ${
        !commentReply && "px-4"
      } py-6 transition-colors duration-200 ease-in border-y-1 border-border `}
    >
      <div className="flex w-full gap-3 ">
        <Content comment={comment} currentUserId={currentUserId} />
        <Like
          likes={comment.likesComment}
          currentUserId={currentUserId}
          commentId={comment.id}
        />
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
