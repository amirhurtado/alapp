"use client";

import { useEffect, useState } from "react";
import Post from "./Post";
import { FullPostType } from "@/types";

interface InfiniteFeedProps {
    currentUserId: string;
    feed?: boolean; // Optional prop to indicate if it's a feed
}

const InfiniteFeed = ({ currentUserId, feed = false }: InfiniteFeedProps) => {
const [data, setData] = useState<Array<FullPostType>>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/posts?id=${currentUserId}&feed=${feed}`);
      setData(await res.json());
    };

    fetchPosts();
  }, [currentUserId, feed]);


  return <div>
    {data.map((post) => (

        <div key={post.id}>
          <Post post={post} currentUserId={currentUserId} />
        </div>

      ))}
  </div>;
};

export default InfiniteFeed;
