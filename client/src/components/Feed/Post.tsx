import { Image } from "@imagekit/next";
import PostInfo from "./PostInfo";
import { Repeat2, Dot } from "lucide-react";
import PostInteractions from "./PostInteractions";

import Avatar from "../Avatar";
import { FullPostType } from "@/types";

interface PostProps {
  post: FullPostType;
  currentUserId?: string;
}

const Post = ({ post, currentUserId }: PostProps) => {

  const isMyPost = currentUserId === post.author?.id;

  return (
    <div className="p-4 border-y-1 border-border hover:bg-hover transition-colors duration-200 ease-in">
      {/*reposted*/}
      <div className="flex items-center gap-2 text-sm mb-2 text-text-gray">
        <Repeat2 size={16} />
        <p className="text-xs">Username ha reposteado</p>
      </div>
      {/*Post content*/}
      <div className="flex w-full gap-3">
        {/* AVATAR */}
        <Avatar src={post.author?.imageUrl || "user-default"} />

        <div className="w-full">
          {/* POST HEADER */}
          <div className="flex justify-between items-top">
            <div className="flex gap-1 items-center flex-1">
              <p className={`font-semibold text-[.92rem] cursor-pointer hover:underline ${isMyPost && "text-icon-blue"}`}>
                {isMyPost ? "Tú" : post.author?.name}
              </p>
              <p className="text-text-gray text-[.83rem]">
                @{post.author?.displayName}
              </p>
              <Dot size={10} className="text-text-gray" />
              <p className="text-text-gray text-[.83rem]">2h</p>
            </div>
            <PostInfo />
          </div>
          {/* POST TEXT & MEDIA */}
          <div className="mt-1">
            <p className="text-[0.85rem] text-gray-300">
              {post.description || ""}
            </p>

            {post.imageUrl && (
              <Image
                src={post.imageUrl}
                alt="Picture of the author"
                width={500}
                height={500}
                className="object-cover mt-4 border-1 border-border rounded-xl"
              />
            )}
          </div>

          <PostInteractions favorites={post.favorites.map((fav) => fav.userId)}  />
        </div>
      </div>
    </div>
  );
};

export default Post;
