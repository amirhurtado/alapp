import { createCommentAction } from "@/actions/comment";
import { FullCommentType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateCommentMutation = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ formData }: { formData: FormData }) => {
      return createCommentAction(formData);
    },
    onSuccess: (data) => {

      const queryKey = ["comments", postId]


      queryClient.setQueryData(queryKey, (oldData: any) => {
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
    },
  });
};
