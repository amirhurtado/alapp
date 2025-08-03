import React from "react";

import CreateComment from "./CreateComment";
import { getComments } from "@/actions/comment";
import { Comment } from "./Comment";



interface CommentsProps {
  currentUserId : string,
  userId: string;
  userImageUrl: string;
  postId: number
}

const Comments = async ({ currentUserId, userId, userImageUrl, postId }: CommentsProps) => {

  const comments = await getComments(postId);


  return (
    <div className="flex flex-col gap-4 mt-3">
      <CreateComment userImageUrl={userImageUrl} postId={postId} userId={userId} />

      {comments.map((comment, index) => (
        <div key={index}>
          <Comment comment={comment} isMyComment={currentUserId === comment.userId} />
        </div>
        
      ))}

      {comments.length === 0 && (
        <div className="border-t-1 border-border w-full">
        <p className="text-sm text-text-gray mt-5 text-center">Se el primero en comentar!</p>


        </div>
      )}
    </div>
  );
};

export default Comments;
