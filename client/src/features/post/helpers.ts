import { FullPostType } from "@/types";

export const toggleLikeLogic = (post: FullPostType, userId: string) => {
  const liked = post.likesPost.some((like) => like.userId === userId);

  if (liked) {
    return {
      ...post,
      likesPost: post.likesPost.filter((like) => like.userId !== userId),
    };
  } else {
    return {
      ...post,
      likesPost: [...post.likesPost, { userId }],
    };
  }
};

export const toggleFavoriteLogic = (post: FullPostType, userId: string) => {
  const inFavorite = post.favorites.some((fav) => fav.userId === userId);

  if (inFavorite) {
    return {
      ...post,
      favorites: post.favorites.filter((fav) => fav.userId !== userId),
    };
  } else {
    return {
      ...post,
      favorites: [...post.favorites, { userId: userId }],
    };
  }
};

export const toggleRepostLogic = (post: FullPostType, userId: string) => {
  const isReposted = post.reposts.some((rep) => rep.userId === userId);

  if (isReposted) {
    return {
      ...post,
      reposts: post.reposts.filter((rep) => rep.userId !== userId),
    };
  } else {
    return {
      ...post,
      reposts: [...post.reposts, { userId: userId, postId: post.id }],
    };
  }
};
