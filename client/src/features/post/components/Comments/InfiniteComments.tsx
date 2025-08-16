"use client";

import { LoaderCircle } from "lucide-react";
import React, { useEffect, useRef } from "react";
import CommentCard from "./CommentCard";
import { FullCommentType } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCommentsAction } from "@/actions/comment";

interface InfiniteCommentsProps {
  comments: Array<FullCommentType>;
  postId: number;
  currentUserId: string;
}

const InfiniteComments = ({
  comments: initialComments,
  postId,
  currentUserId,
}: InfiniteCommentsProps) => {
  const queryKey = ["comments",  {postId : postId}];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: async ({ pageParam = 1 }) => {
        return await getCommentsAction(postId, pageParam);
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 6 ? allPages.length + 1 : undefined;
      },
      initialData: {
        pages: [initialComments],
        pageParams: [1],
      },
      staleTime: Infinity
    });

  const comments = data.pages?.flatMap((page) => page) ?? initialComments;

  const loadmoreRef = useRef(null);

  useEffect(() => {
    if (!loadmoreRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(loadmoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div>
      {comments.map((comment, index) => (
        <div key={index}>
          <CommentCard comment={comment} currentUserId={currentUserId} />
        </div>
      ))}
      <div
        ref={loadmoreRef}
        className="h-[2rem] flex items-center justify-center py-8"
      >
        {isFetchingNextPage && (
          <LoaderCircle
            className="animate-spin mx-auto text-primary-color "
            size={24}
          />
        )}

        {!hasNextPage && (
          <p className="text-center text-text-gray text-sm">
            No hay más comentarios
          </p>
        )}
      </div>
    </div>
  );
};

export default InfiniteComments;
