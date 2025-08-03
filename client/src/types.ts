import { User as UserType } from "@/generated/prisma";
import { Post as PostType } from "@/generated/prisma";
import { Comment as CommentType } from "@/generated/prisma";

export type FullUserType = UserType & {
  _count: {
      posts: number;
      followers: number;
      following: number;
    };
}

export type FullPostType = PostType & {
  author: {
    id: string;
    name: string;
    displayName: string;
    imageUrl: string;
  };
  likesPost: {
    userId: string;
  }[];
  favorites: {
    userId: string;
  }[];
  reposts: {
    userId: string;
  }[];
  _count: {
    comments: number
  }
};

export type FullCommentType = CommentType & {
  user: {
    id: string;
    name: string;
    displayName: string;
    imageUrl: string;
  };
  likesComment: {
    userId: string
  }[]
};
