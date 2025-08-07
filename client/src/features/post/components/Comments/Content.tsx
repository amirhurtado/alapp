import Avatar from "@/components/ui/Avatar";
import { FullCommentType } from "@/types";
import TimeAgo from "@/components/ui/TimeAgo";

interface ContentCommentProps {
  comment: FullCommentType;
  currentUserId: string;
}

const Content = ({
  comment,
  currentUserId,
}: ContentCommentProps) => {
  const isMyComment = currentUserId === comment.userId;

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
                <span className="text-[0.6rem] text-primary-color"> (Tú)</span>
              )}
            </p>
            <p className="text-text-gray text-[.83rem]">
              @{comment.user.displayName}
            </p>
            <div className="hidden md:block ">
              <TimeAgo createdAt={comment.createdAt} />
            </div>
          </div>
        </div>

        <div className="block md:hidden ">
          <TimeAgo createdAt={comment.createdAt} />
        </div>
        <p className="text-[0.85rem] text-gray-300 mt-1 ">{comment.content}</p>
      </div>

      
    </div>
  );
};

export default Content;
