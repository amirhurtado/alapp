"use client";

import { useEffect, useRef, useState } from "react";
import Post from "./Post";
import { FullPostType } from "@/types";

interface InfiniteFeedProps {
  currentUserId: string;
  feed?: boolean; // Optional prop to indicate if it's a feed
}

const InfiniteFeed = ({ currentUserId, feed = false }: InfiniteFeedProps) => {
  const [page, setPage] = useState<number | null>(null);
  const [data, setData] = useState<Array<FullPostType>>([]);
  const [hasMore, setHasMore] = useState(true);


  const loadMoreRef = useRef(null);

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
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
  }, []);

  useEffect(() => {
    if (page === null || !hasMore) return;
    const fetchPosts = async () => {
      const res = await fetch(
        `/api/posts?id=${currentUserId}&feed=${feed}&page=${page}`
      );
      const posts = await res.json();

      if (posts.length === 0) {
        setHasMore(false);
        return;
      }

      setData((prevData) => [...prevData, ...posts]);
    };

    fetchPosts();
  }, [currentUserId, feed, page]);

  return (
    <div>
      {data.map((post) => (
        <div key={post.id}>
          <Post post={post} currentUserId={currentUserId} />
        </div>
      ))}

      <div ref={loadMoreRef} className="h-[3.5rem]">
        <p>Cargando</p>
      </div>
    </div>
  );
};

export default InfiniteFeed;
