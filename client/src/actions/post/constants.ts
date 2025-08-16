export const postIncludes = {
  author: {
    select: {
      id: true,
      name: true,
      displayName: true,
      imageUrl: true,
    },
  },
  likesPost: {
    select: { userId: true },
  },
  favorites: {
    select: { userId: true },
  },
  reposts: {
    select: { userId: true },
  },
  _count: {
    select: {
      comments: true,
    },
  },
};
