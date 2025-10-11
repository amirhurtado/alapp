import { createCommentAction } from "@/actions/comment/comment";
import { socket } from "@/socket";
import { FullCommentType, FullPostType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";


type oldDataType = {
  pages: FullCommentType[][];
  pageParams: unknown[];
};

export const useCreateCommentMutation = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ formData }: { formData: FormData }) => {
      return createCommentAction(formData);
    },
    onSuccess: (response) => {
        const { data, receiverNotificationId } = response;
      const postIdQueryKey = ["post", { id: postId }];
      const commentsQueryKey = ["comments", { postId: postId }];

      queryClient.setQueryData(commentsQueryKey, (oldData: oldDataType) => {
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

      queryClient.setQueryData(postIdQueryKey, (oldData: FullPostType) => {
        if (!oldData) return;

        return {
          ...oldData,
          _count: { comments: oldData._count.comments + 1 },
        };
      });

      queryClient.invalidateQueries({queryKey: ["postsFeed"]});


      if(receiverNotificationId){
        socket.emit("sendNotification", receiverNotificationId )
      }
    },
  });
};
