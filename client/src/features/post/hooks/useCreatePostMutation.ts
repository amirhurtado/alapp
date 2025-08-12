import { createPostAction } from "@/actions/post";
import { FullPostType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreatePostMutation = (currenUserId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ formData }: { formData: FormData }) =>
      createPostAction(formData),
    onSuccess: (data) => {
      if (!currenUserId) return;

      const queryKeyFeed = ["posts", currenUserId, {feedSite: "main"}]
      queryClient.setQueryData(queryKeyFeed, (oldData: any) => {
        if (!oldData) return;
        return {
          ...oldData,
          pages: oldData.pages.map((page: FullPostType[], index: number) => {
            if (index === 0) {
              return [data, ...page];
            }
            return page;
          }),
        };
      });

      const queryKeyProfile = ["posts", currenUserId, {feedSite: "profile"}];

      queryClient.setQueryData(queryKeyProfile, (oldData: any) => {
        if (!oldData) return;
        return {
          ...oldData,
          pages: oldData.pages.map((page: FullPostType[], index: number) => {
            if (index === 0) {
              return [data, ...page];
            }
            return page;
          }),
        };
      });
    },
  });
};
