import { deletePostAction } from "@/actions/post/deletePost";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postId }: { postId: number }) => {
      return await deletePostAction(postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postsFeed"] });
    },
  });
};
