"use client";

import { toggleLikePostAction } from "@/actions/post/interactions";
import { FullPostType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLikePostLogic } from "../helpers";
import { socket } from "@/socket";

export const useLikePostMutation = (queryKey: unknown[]) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, userId }: { postId: number; userId: string }) => {
      return toggleLikePostAction(postId, userId);
    },
    onMutate: async ({ postId, userId }) => {

      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (oldData: any) => {
        if (!oldData) return oldData;

        if(oldData.pages){
          return {
          ...oldData,
          pages: oldData.pages.map((page: FullPostType[]) =>
            page.map((post) => {
              if (post.id === postId) {
                return toggleLikePostLogic(post, userId);
              }
              return post;
            })
          ),
        };

        }else{
          return toggleLikePostLogic(oldData, userId)
        }

        
      });

      return { previousData };
    },
    onSuccess: (receiverNotificationId) => {
      if(receiverNotificationId){
      console.log("ACA ENTRO CLIENTE")

        socket.emit("sendNotification", receiverNotificationId)
      }

    },

    onError: (err, variables, context) => {
      queryClient.setQueryData(queryKey, context?.previousData);
    },
  });
};
