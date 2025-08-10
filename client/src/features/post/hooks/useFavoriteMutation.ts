import { toggleFavoriteAction } from "@/actions/post";
import { FullPostType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleFavoriteLogic } from "../helpers";

export const useFavoriteMutation = (queryKey: any[]) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      userId,
    }: {
      postId: number;
      userId: string;
    }) => {
      return toggleFavoriteAction(postId, userId);
    },
    onMutate: async ({ postId, userId }) => {
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (oldData: any) => {
        if (!oldData) return;

        if(oldData.pages){
           return {
          ...oldData,
          pages: oldData.pages.map((page: FullPostType[]) =>
            page.map((post) => {
              if (post.id === postId) {
                return toggleFavoriteLogic(post, userId)
              }
              return post;
            })
          ),
        };
        }else{
          return toggleFavoriteLogic(oldData, userId);
        }
       
      });

      return { previousData };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(queryKey, context?.previousData);
    },
  });
};
