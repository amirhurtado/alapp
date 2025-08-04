import Avatar from "@/components/Profile/Avatar";
import Like from "./Like";
import { FullCommentType } from "@/types";
import CreatedAt from "../../CreatedAt";

interface HeaderComponentProps {
  comment: FullCommentType;
  isMyComment: boolean;
  currentUserIdLog: string;
}

const HeaderComment = ({
  comment,
  isMyComment,
  currentUserIdLog,
}: HeaderComponentProps) => {
  return (
    <div className="flex w-full gap-3 ">
      <Avatar src={comment.user.imageUrl} />

      <div className="w-full flex flex-col gap-1">
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
            <div className="hidden md:block ">
              <CreatedAt createdAt={comment.createdAt} />
            </div>
          </div>
        </div>

        <div className="block md:hidden ">
          <CreatedAt createdAt={comment.createdAt} />
        </div>
        <p className="text-[0.85rem] text-gray-300 mt-1 ">{comment.content}</p>
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
  );
};

export default HeaderComment;
