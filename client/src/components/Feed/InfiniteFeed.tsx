"use client";

import { useEffect, useRef, useState } from "react";
import Post from "./Post/Post";
import { FullPostType } from "@/types";
import { LoaderCircle } from "lucide-react";

interface InfiniteFeedProps {
  currentUserIdLog: string;
  feed?: boolean; // Optional prop to indicate if it's a feed
  postsLength: number;
}

const InfiniteFeed = ({
  currentUserIdLog,
  feed = false,
  postsLength,
}: InfiniteFeedProps) => {
  const [page, setPage] = useState<number | null>(null);
  const [data, setData] = useState<Array<FullPostType>>([]);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreRef = useRef(null);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (postsLength < 10) setHasMore(false); return;

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
    console.log("VA A HACER EL FETCH")
    const fetchPosts = async () => {
      const res = await fetch(
        `/api/posts?id=${currentUserIdLog}&feed=${feed}&page=${page}`
      );
      const posts = await res.json();

      if (posts.length === 0) {
        setHasMore(false);
        return;
      }

      setData((prevData) => [...prevData, ...posts]);
    };

    fetchPosts();
  }, [currentUserIdLog, feed, page, hasMore]);

  return (
    <div>
      {data.map((post) => (
        <div key={post.id}>
          <Post post={post} currentUserIdLog={currentUserIdLog} />
        </div>
      ))}

      <div
        ref={loadMoreRef}
        className="h-[2rem] flex items-center justify-center my-8"
      >
        {hasMore ? (
          <LoaderCircle
            className="animate-spin mx-auto text-icon-blue "
            size={24}
          />
        ) : (
          <p className="text-center text-text-gray text-sm">
            No hay más publicaciones
          </p>
        )}
      </div>
    </div>
  );
};

export default InfiniteFeed;
