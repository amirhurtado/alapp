"use client";

import { useState, useEffect, useRef } from "react";
import { FullCommentType } from "@/types";

export const useInfinityComments = (comments: Array<FullCommentType>, postId: number) => {

  const [page, setPage] = useState<number | null>(null);
  const [data, setData] = useState<Array<FullCommentType>>(comments);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    if (!loadMoreRef.current || !hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (comments.length < 6) {
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
  }, [comments.length, hasMore]);

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

  return { data, hasMore, loadMoreRef };
};