import Avatar from "@/components/Avatar";
import TimeAgo from "@/components/TimeAgo";
import { FullCommentType } from "@/types";
import { Dot } from "lucide-react";


interface CommentProps  {
    comment: FullCommentType
    isMyComment: boolean

}

export const Comment = ({comment, isMyComment} : CommentProps ) => {
  return (
    <div className="flex w-full gap-3 p-4 hover:bg-hover transition-colors duration-200 ease-in border-y-1 border-border">
      {/* AVATAR */}
      <Avatar src={comment.user.imageUrl} />

      <div className="w-full">
        {/* POST HEADER */}
        <div className="flex justify-between items-top">
          <div className="flex gap-1 items-center flex-1">
            <p className=" font-semibold text-[.92rem] cursor-pointer hover:underline">
              {comment.user.name}
               {isMyComment && <span className="text-[0.6rem] text-icon-blue"> (Tú)</span>}
            </p>
            <p className="text-text-gray text-[.83rem]">@{comment.user.displayName}</p>
            <Dot size={10} className="text-text-gray" />
            <TimeAgo date={comment.createdAt} />
          </div>
          {/*<PostInfo />*/}
        </div>
        {/* POST TEXT & MEDIA */}
        <p className="text-[0.85rem] text-gray-300">
          {comment.content}
        </p>
      </div>
    </div>
  );
};