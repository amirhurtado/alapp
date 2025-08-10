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
      await queryClient.cancelQueries({ queryKey: countFollowCurrentUserKey });

      const previousRecommendationData = queryClient.getQueryData(
        recommendationQueryKey
      );
      const previousIsFriend = queryClient.getQueryData(isFriendKey);
      const previousCountFollowOtherUser = queryClient.getQueryData(
        countFollowOtherUserKey
      );
      const previousCountFollowCurrentUser = queryClient.getQueryData(
        countFollowCurrentUserKey
      );

      // Obtener isCurrentlyFriend antes del setQueryData
      let isCurrentlyFriend = false;
      if (previousRecommendationData) {
        for (const page of previousRecommendationData.pages) {
          const foundUser = page.find(
            (user: InfoUser) => user.id === userProfileId
          );
          if (foundUser) {
            isCurrentlyFriend = foundUser.isFriend;
            break;
          }
        }
      }

      if (previousRecommendationData) {
        queryClient.setQueryData(recommendationQueryKey, (oldData: any) => {
          return {
            ...oldData,
            pages: oldData.pages.map((page: InfoUser[]) =>
              page.map((user) => {
                if (user.id === userProfileId) {
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

      if (previousCountFollowOtherUser) {
        queryClient.setQueryData(countFollowOtherUserKey, (oldData: any) => ({
          ...oldData,
          followers: isCurrentlyFriend
            ? oldData.followers - 1
            : oldData.followers + 1,
        }));
      }

      if (previousCountFollowCurrentUser) {
        queryClient.setQueryData(countFollowCurrentUserKey, (oldData: any) => ({
          ...oldData,
          following: isCurrentlyFriend
            ? oldData.following - 1
            : oldData.following + 1,
        }));
      }

      return {
        recommendationQueryKey,
        previousRecommendationData,
        isFriendKey,
        previousIsFriend,
        countFollowOtherUserKey,
        previousCountFollowOtherUser,
        countFollowCurrentUserKey,
        previousCountFollowCurrentUser,
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
      if (context?.previousCountFollowOtherUser) {
        queryClient.setQueryData(
          context.countFollowOtherUserKey,
          context.previousCountFollowOtherUser
        );
      }
      if (context?.previousCountFollowCurrentUser) {
        queryClient.setQueryData(
          context.countFollowCurrentUserKey,
          context.previousCountFollowCurrentUser
        );
      }
    },
  });
};
