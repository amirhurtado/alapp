'use client'

import { FullPostType } from "@/types";
import { useEffect, useRef, useState } from "react";

export const useInfinitePost = (
  currentUserId: string,
  posts: Array<FullPostType>,
  feed: boolean
) => {
  const [page, setPage] = useState<number | null>(null);
  const [data, setData] = useState<Array<FullPostType>>(posts);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    if (!loadMoreRef.current || !hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (posts.length < 10) {
          setHasMore(false);
          observer.disconnect();

          return;
        }

        setPage((prevPage) => {
          if (prevPage === null) return 2;
          return prevPage + 1;
        });
      }
    });

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [posts.length, hasMore]);

  useEffect(() => {
    if (page === null || !hasMore) return;
    const fetchPosts = async () => {
      const res = await fetch(
        `/api/posts?useridlog=${currentUserId}&feed=${feed}&page=${page}`
      );
      const posts = await res.json();

      setData((prevData) => [...prevData, ...posts]);

      if (posts.length < 10) {
        setHasMore(false);
        return;
      }
    };

    fetchPosts();
  }, [currentUserId, feed, page, hasMore]);


  return { data, hasMore, loadMoreRef}
};
