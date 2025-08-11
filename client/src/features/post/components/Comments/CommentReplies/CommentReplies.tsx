"use client";
import CreateCommentReply from "./CreateCommentReply";
import CommentCard from "../CommentCard";
import ReplyControls from "./ReplyControls";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCommentsByParentIdAction } from "@/actions/comment";
import { useState } from "react";
import Loader from "@/components/ui/Loader";

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

  const queryKey = ["commentsReply", comment.id]

  const [ocult, setOcult] = useState(true);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey,
      queryFn: async ({ pageParam = 1 }) => {
        return await getCommentsByParentIdAction(comment.id, pageParam);
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const fetchedRepliesCount = allPages.flat().length;
        return fetchedRepliesCount === comment.responses
          ? undefined
          : allPages.length + 1;
      },
    });

  if (isLoading) {
    return <Loader />;
  }

  const replies = data?.pages.flatMap((page) => page) ?? [];

  const showResponses = () => {
    if (ocult) {
      setOcult(false);
      return;
    }
    fetchNextPage();
  };

  return (
    <div className="flex flex-col overflow-hidden gap-3">
      {!ocult && (
        <div className="ml-7">
          {replies.map((replie) => (
            <div key={replie.id} className="w-full">
              <CommentCard
                comment={replie}
                currentUserId={currentUserId}
                commentReply={true}
              />
            </div>
          ))}
        </div>
      )}

      {!isFetchingNextPage ? (
        <ReplyControls
          hasMore={hasNextPage}
          ocult={ocult}
          setOcult={setOcult}
          showResponses={showResponses}
          commentReponses={comment.responses}
          repliesLength={replies.length}
        />
      ) : (
        <Loader />
      )}

      <CreateCommentReply
        comment={{ id: comment.id, authorName: comment.authorName }}
        postId={postId}
        currentUserId={currentUserId}
      />
    </div>
  );
};

export default CommentReplies;
