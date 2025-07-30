"use client";

import { pruebaAction } from "@/actions";
import Post from "./Post";

  await pruebaAction();  


const Feed = () => {
  return (
    <div className="">

      <Post />
      <Post />
      <Post />
      <Post />
      
    </div>
  );
};

export default Feed;
