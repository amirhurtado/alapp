import { FullCommentType } from "@/types";

import CommentReplies from "../CommentReplies/CommentReplies";
import HeaderComment from "./HeaderComment";

interface CommentProps {
  comment: FullCommentType;
  currentUserIdLog: string;
  commentReply?: boolean;
}

export const Comment = ({
  comment,
  currentUserIdLog,
  commentReply,
}: CommentProps) => {
  const isMyComment = currentUserIdLog === comment.userId;

  return (
    <div className={`flex  flex-col gap-2 hover:bg-hover ${!commentReply && 'px-4'} py-6 transition-colors duration-200 ease-in border-y-1 border-border `}>
      <HeaderComment
        comment={comment}
        isMyComment={isMyComment}
        currentUserIdLog={currentUserIdLog}
      />

      {!commentReply && (
        <CommentReplies
          comment={{
            id: comment.id,
            authorName: comment.user.name,
            responses: comment._count.comments,
          }}
          postId={comment.postId}
          currentUserIdLog={currentUserIdLog}
        />
      )}
    </div>
  );
};

export default Comment;
