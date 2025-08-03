import Avatar from "@/components/Avatar";
import TimeAgo from "@/components/TimeAgo";
import { FullCommentType } from "@/types";
import { Dot } from "lucide-react";
import Like from "./Like";
import CommentRepliesSection from "./CommentRepliesSection/CommentRepliesSection";

interface CommentProps {
  comment: FullCommentType;
  isMyComment: boolean;
  currentUserIdLog: string;
}

export const Comment = ({
  comment,
  isMyComment,
  currentUserIdLog,
}: CommentProps) => {

  return (
    <div className="flex  py-3 flex-col gap-2 hover:bg-hover p-4 transition-colors duration-200 ease-in border-y-1 border-border ">
      <div className="flex w-full gap-3  ">
        {/* AVATAR */}
        <Avatar src={comment.user.imageUrl} />

        <div className="w-full flex flex-col gap-2">
          {/* POST HEADER */}
          <div className="flex justify-between items-top">
            <div className="flex gap-1 items-center flex-1">
              <p className=" font-semibold text-[.92rem] cursor-pointer hover:underline">
                {comment.user.name}
                {isMyComment && (
                  <span className="text-[0.6rem] text-icon-blue"> (Tú)</span>
                )}
              </p>
              <p className="text-text-gray text-[.83rem]">
                @{comment.user.displayName}
              </p>
              <Dot size={10} className="text-text-gray" />
              <TimeAgo date={comment.createdAt} />
            </div>
            {/*<PostInfo />*/}
          </div>
          {/* POST TEXT & MEDIA */}
          <p className="text-[0.85rem] text-gray-300 ">{comment.content}</p>
        </div>

          <Like
          liked={comment.likesComment.some(
            (like) => like.userId === currentUserIdLog
          )}
          likes={comment.likesComment.length}
          currentUserIdLog={currentUserIdLog}
          commentId={comment.id}
        />
      
        
      </div>

      <CommentRepliesSection comment={{id:comment.id, authorName:comment.user.name, responses:comment._count.comments}}  postId={comment.postId} currentUserIdLog={currentUserIdLog} />
    </div>
  );
};
