import { toggleFollowAction } from "@/actions/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type InfoUser = {
  id: string;
  name: string;
  displayName: string;
  imageUrl: string;
  isFriend: boolean;
};

export const useFollowMutation = (queryKey: string[]) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      currentUserId,
      otherUserId,
    }: {
      currentUserId: string;
      otherUserId: string;
    }) => {
      return toggleFollowAction(currentUserId, otherUserId);
    },
    onMutate: async ({  otherUserId }) => {
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (oldData: any) => {
        if (!oldData) return;

        return {
          ...oldData,
          pages: oldData.pages.map((page: InfoUser[]) =>
            page.map((user) => {
              if (user.id === otherUserId) {
                return {
                  ...user,
                  isFriend: !user.isFriend,
                };
              }
              return user;
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
