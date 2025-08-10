"use client";

import { toggleLikePostAction } from "@/actions/post";
import { FullPostType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLikeMutation = (queryKey: string[]) => {
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

        return {
          ...oldData,
          pages: oldData.pages.map((page: FullPostType[]) =>
            page.map((post) => {
              if (post.id === postId) {
                const liked = post.likesPost.some(
                  (like) => like.userId === userId
                );

                if (liked) {
                  return {
                    ...post,
                    likesPost: post.likesPost.filter(
                      (like) => like.userId !== userId
                    ),
                  };
                } else {
                  return {
                    ...post,
                    likesPost: [...post.likesPost, { userId }],
                  };
                }
              }
              return post;
            })
          ),
        };
      });

      return { previousData };
    },

    onError: (err, variables, context) => {
      queryClient.setQueryData(queryKey, context?.previousData);
    },
  });
};
