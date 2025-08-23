import { toggleFollowAction } from "@/actions/follow/follow";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type InfoUser = {
  id: string;
  name: string;
  displayName: string;
  imageUrl: string;
  isFriend: boolean;
};

type PaginatedUserData = {
  pages: InfoUser[][];
  pageParams: unknown[];
};

type Follows = {
  followers: number;
  following: number;
  isFriend: boolean;
};

const getFollowQueries = (currentUserId: string, userProfileId: string) => ({
  recommendationsRightbar: ["recommendations", currentUserId, "rightbar"],
  recommendationsExplore: ["recommendations", currentUserId, "explore"],
  userProfileFollowCount: ["InfoFollowUser", userProfileId],
  currentUserFollowCount: ["InfoFollowUser", currentUserId],
  isFriend: ["isFriend", userProfileId],
});

const toggleIsFriendRecommendations = (
  userProfileId: string,
  oldData: PaginatedUserData
) => {
  if (!oldData) return;
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
      const keys = getFollowQueries(currentUserId, userProfileId);

      queryClient.cancelQueries();

      const previousState = {
        recommendationsRightbar: queryClient.getQueryData<PaginatedUserData>(
          keys.recommendationsRightbar
        ),
        recommendationsExplore: queryClient.getQueryData(
          keys.recommendationsExplore
        ),
        userProfileFollowCount: queryClient.getQueryData(
          keys.userProfileFollowCount
        ),
        currentUserFollowCount: queryClient.getQueryData(
          keys.currentUserFollowCount
        ),
        isFriend: queryClient.getQueryData(
          keys.isFriend
        )
      };

      queryClient.setQueriesData(
        { queryKey: ["recommendations", currentUserId] }, 
        (oldData: PaginatedUserData) => {
          return toggleIsFriendRecommendations(userProfileId, oldData);
        }
      );

      queryClient.setQueriesData(
        { queryKey: ["usersInSearch"] },
        (oldData: PaginatedUserData) => {
          return toggleIsFriendRecommendations(userProfileId, oldData);
        }
      );

      queryClient.setQueryData(keys.isFriend, (oldData: boolean) => {
        return !oldData;
      });

      queryClient.setQueryData(
        keys.userProfileFollowCount,
        (oldData: Follows) => {
          if (!oldData) return;

          return {
            ...oldData,
            isFriend: !previousState.isFriend,
            followers: previousState.isFriend
              ? oldData.followers - 1
              : oldData.followers + 1,
          };
        }
      );

      const wasFriend =
        previousState.recommendationsRightbar?.pages
          .map((page) =>
            page.map((recommendation) => {
              if (recommendation.id === userProfileId) {
                return recommendation.isFriend;
              }
              return false;
            })
          )
          .flat()
          .some((isFriend) => isFriend) ?? false;


      queryClient.setQueryData(
        keys.currentUserFollowCount,
        (oldData: Follows) => {
          if (!oldData) return;


          return {
            ...oldData,
            following: wasFriend
              ? oldData.following - 1
              : oldData.following + 1,
          };
        }
      );

      return {};
    },
  });
};
