import { toggleFollowAction } from "@/actions/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type InfoUser = {
  id: string;
  name: string;
  displayName: string;
  imageUrl: string;
  isFriend: boolean;
};

export const useFollowMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      currentUserId,
      userProfileId,
    }: {
      currentUserId: string;
      userProfileId: string;
    }) => {
      return toggleFollowAction(currentUserId, userProfileId);
    },
    onMutate: async ({ currentUserId, userProfileId }) => {
      const recommendationQueryKey = ["recommendations", currentUserId];
      const isFriendKey = ["isFriendProfile", userProfileId];
      const countFollowOtherUserKey = ["InfoFollowUser", userProfileId];
      const countFollowCurrentUserKey = ["InfoFollowUser", currentUserId];

      await queryClient.cancelQueries({ queryKey: recommendationQueryKey });
      await queryClient.cancelQueries({ queryKey: isFriendKey });
      await queryClient.cancelQueries({ queryKey: countFollowOtherUserKey });

      const previousRecommendationData = queryClient.getQueryData(
        recommendationQueryKey
      );
      const previousIsFriend = queryClient.getQueryData(isFriendKey);

      const previousCountFollow = queryClient.getQueryData(
        countFollowOtherUserKey
      );

      let isCurrentlyFriend = false;
      if (previousRecommendationData) {
        queryClient.setQueryData(recommendationQueryKey, (oldData: any) => {
          return {
            ...oldData,
            pages: oldData.pages.map((page: InfoUser[]) =>
              page.map((user) => {
                if (user.id === userProfileId) {
                  isCurrentlyFriend = user.isFriend;
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
      }

      if (typeof previousIsFriend === "boolean") {
        queryClient.setQueryData(isFriendKey, !previousIsFriend);
      }

      if (previousCountFollow) {
        queryClient.setQueryData(countFollowOtherUserKey, (oldData: any) => {
          if (previousIsFriend) {
            return {
              ...oldData,
              followers: oldData.followers - 1,
            };
          } else {
            return {
              ...oldData,
              followers: oldData.followers + 1,
            };
          }
        });
      } else {
          queryClient.setQueryData(countFollowCurrentUserKey, (oldData: any) => {
          if (isCurrentlyFriend) {
            return {
              ...oldData,
              following: oldData.following - 1,
            };
          } else {
            return {
              ...oldData,
              following: oldData.following + 1,
            };
          }
        });

      }

      return {
        recommendationQueryKey,
        previousRecommendationData,
        isFriendKey,
        previousIsFriend,
      };
    },
    onError: (err, variables, context) => {
      if (context?.previousRecommendationData) {
        queryClient.setQueryData(
          context.recommendationQueryKey,
          context.previousRecommendationData
        );
      }
      if (context?.previousIsFriend) {
        queryClient.setQueryData(context.isFriendKey, context.previousIsFriend);
      }
    },
  });
};
