import { FullCommentType } from "@/types";

import CommentReplies from "../CommentReplies/CommentReplies";
import HeaderComment from "./HeaderComment";

interface CommentProps {
  comment: FullCommentType;
  currentUserId: string;
  commentReply?: boolean;
}

export const Comment = ({
  comment,
  currentUserId,
  commentReply,
}: CommentProps) => {
  const isMyComment = currentUserId === comment.userId;

  return (
    <div className={`flex  flex-col gap-2 hover:bg-hover ${!commentReply && 'px-4'} py-6 transition-colors duration-200 ease-in border-y-1 border-border `}>
      <HeaderComment
        comment={comment}
        isMyComment={isMyComment}
        currentUserId={currentUserId}
      />

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

export default Comment;
