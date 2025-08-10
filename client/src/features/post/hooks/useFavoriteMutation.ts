import { toggleFavoriteAction } from "@/actions/post";
import { FullPostType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useFavoriteMutation = (queryKey: string[]) => {
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

        return {
          ...oldData,
          pages: oldData.pages.map((page: FullPostType[]) =>
            page.map((post) => {
              if (post.id === postId) {
                const inFavorite = post.favorites.some(
                  (fav) => fav.userId === userId
                );

                if (inFavorite) {
                  return {
                    ...post,
                    favorites: post.favorites.filter(
                      (fav) => fav.userId !== userId
                    ),
                  };
                } else {
                  return {
                    ...post,
                    favorites: [...post.favorites, { userId: userId }],
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
