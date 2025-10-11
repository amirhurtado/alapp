import { createCommentAction } from "@/actions/comment/comment";
import { socket } from "@/socket";
import { FullCommentType, FullPostType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateReplyCommentMutation = (
  commentId: number,
  postId: number
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ formData }: { formData: FormData }) => {
      return createCommentAction(formData);
    },
    onSuccess: (response) => {
      const { data, receiverNotificationId } = response;

      const postQueryKey = ["post", { id: postId }];
      const commentsParentsQueryKey = ["comments", { postId: postId }];
      const repliesQueryKey = ["commentsReply", { parentId: commentId }];

      queryClient.setQueryData(repliesQueryKey, (oldData: any) => {
        if (!oldData) return;

        return {
          ...oldData,
          pages: oldData.pages.map((page: FullCommentType[], i: number) => {
            if (i === 0) {
              return [data, ...page];
            }
            return page;
          }),
        };
      });

      queryClient.setQueryData(commentsParentsQueryKey, (oldData: any) => {
        if (!oldData) return;

        return {
          ...oldData,
          pages: oldData.pages.map((page: FullCommentType[]) => {
            return page.map((comment) => {
              if (comment.id === commentId) {
                return {
                  ...comment,
                  _count: { comments: comment._count.comments + 1 },
                };
              }
              return comment;
            });
          }),
        };
      });

      queryClient.setQueryData(postQueryKey, (oldData: FullPostType) => {
        if (!oldData) return;

        return {
          ...oldData,
          _count: { comments: oldData._count.comments + 1 },
        };
      });

      queryClient.invalidateQueries({queryKey: ["postsFeed"]});


      if (receiverNotificationId) {
        socket.emit("sendNotification", receiverNotificationId);
      }
    },
  });
};
