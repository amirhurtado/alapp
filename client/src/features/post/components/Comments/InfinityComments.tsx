"use client";

import { FullCommentType } from "@/types";
import { LoaderCircle } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Comment } from "./Comment/Comment";

interface InfinityComments {
  commentsLength: number;
  postId: number;
  currentUserId: string
}

const InfinityComments = ({ commentsLength, postId, currentUserId }: InfinityComments) => {
  const [page, setPage] = useState<number | null>(null);
  const [data, setData] = useState<Array<FullCommentType>>([]);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    if (!loadMoreRef.current || !hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (commentsLength < 6) {
          setHasMore(false);
          observer.disconnect();

          return;
        }
        setPage((prevPage) => {
          if (!prevPage) return 2;
          return prevPage + 1;
        });
      }
    });

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [commentsLength, hasMore]);

  useEffect(() => {
    if (!page || !hasMore) return;


    const fechComments = async () => {
      const res = await fetch(`/api/comments?postId=${postId}&page=${page}`);
      const coments = await res.json();

      setData((prevData) => [...prevData, ...coments]);

      if (coments.length < 6) {
        setHasMore(false);
        return;
      }

      
    };

    fechComments();
  }, [page, hasMore, postId]);

  return (
    <div className="h-8">
      {data.map((comment, index) => (
        <div key={index}>
          <Comment
            comment={comment}
            currentUserId={currentUserId}
            commentReply={true}
          />
        </div>
      ))}
      <div
        ref={loadMoreRef}
        className="h-[2rem] flex items-center justify-center py-8"
      >
        {hasMore ? (
          <LoaderCircle
            className="animate-spin mx-auto text-icon-blue "
            size={24}
          />
        ) : (
          <p className="text-center text-text-gray text-sm">
            No hay más comentarios
          </p>
        )}
      </div>
    </div>
  );
};

export default InfinityComments;
