import { Post as PostType } from "@/generated/prisma";

export type FullPostType = PostType & {
  author: {
    id: string;
    name: string;
    displayName: string;
    imageUrl: string;
  };
};
