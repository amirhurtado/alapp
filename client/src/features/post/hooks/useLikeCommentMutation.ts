import { toggleLikeCommentAction } from "@/actions/comment/comment";
import { FullCommentType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLikeCommentLogic } from "../helpers";
import { socket } from "@/socket";

export const useLikeCommentMutation = (queryKey: any[]) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      currentUserId,
    }: {
      commentId: number;
      currentUserId: string;
    }) => {
      return toggleLikeCommentAction(currentUserId, commentId);
    },
    onMutate: async ({ commentId, currentUserId }) => {


      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData(queryKey);


      queryClient.setQueryData(queryKey, (oldData: any) => {
        if (!oldData) return;
        return {
          ...oldData,
          pages: oldData.pages.map((page: FullCommentType[]) =>
            page.map((comment) => {
              if (comment.id === commentId) {
                return toggleLikeCommentLogic(comment, currentUserId);
              }
              return comment;
            })
          ),
        };
      });

      return { previousData };
    },
    onSuccess : (receiverNotificationId) => {

      if(receiverNotificationId){
        socket.emit("sendNotification", receiverNotificationId)
      }

    },
    onError: (err, variables, context) => {
      if (context) {
        queryClient.setQueryData(queryKey, context?.previousData);
      }
    },
  });
};
