"use client";
import CreateCommentReply from "./CreateCommentReply";
import Comment from "../CommentCard";
import { useInfinityRepliesComments } from "@/features/post/hooks/useInfiniteRepliesComents";
import ReplyControls from "./ReplyControls";

interface CommentRepliesProps {
  comment: {
    id: number;
    authorName: string;
    responses: number;
  };
  postId: number;
  currentUserId: string;
}

const CommentReplies = ({
  comment,
  postId,
  currentUserId,
}: CommentRepliesProps) => {
  const { data, hasMore, ocult, handleOcult, showResponses } =
    useInfinityRepliesComments(comment.responses, comment.id);

  return (
    <div className="flex flex-col overflow-hidden gap-3">
      {!ocult && (
        <div className="ml-7">
          {data.map((comment) => (
            <div key={comment.id} className="w-full">
              <Comment
                comment={comment}
                currentUserId={currentUserId}
                commentReply={true}
              />
            </div>
          ))}
        </div>
      )}

      <ReplyControls
        hasMore={hasMore}
        ocult={ocult}
        handleOcult={handleOcult}
        showResponses={showResponses}

        commentReponses={comment.responses}
        dataLength={data.length}
      />

      <CreateCommentReply
        comment={{ id: comment.id, authorName: comment.authorName }}
        postId={postId}
        currentUserId={currentUserId}
      />
    </div>
  );
};

export default CommentReplies;
