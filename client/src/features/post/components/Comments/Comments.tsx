import React from "react";

import CreateComment from "./CreateComment";
import { getCommentsAction } from "@/actions/comment";
import { Comment } from "./Comment/Comment";
import InfinityComments from "./InfinityComments";

interface CommentsProps {
  currentUserLog: {
    id: string;
    imgUrl: string;
  };

  postId: number;
}

const Comments = async ({ currentUserLog, postId }: CommentsProps) => {
  const comments = await getCommentsAction(postId);

  return (
    <div className="flex flex-col mt-3 ">
      <CreateComment
        currentUserLog={{
          id: currentUserLog.id,
          imgUrl: currentUserLog.imgUrl,
        }}
        postId={postId}
      />

      {comments.map((comment, index) => (
        <div key={index}>
          <Comment
            comment={comment}
            currentUserId={currentUserLog.id}
          />
        </div>
      ))}

      <InfinityComments commentsLength={comments.length} postId={postId} currentUserId={currentUserLog.id} />

    </div>
  );
};

export default Comments;
