import { User as UserType } from "@/generated/prisma";
import { Post as PostType } from "@/generated/prisma";
import { Comment as CommentType } from "@/generated/prisma";
import { Group as GroupType } from "@/generated/prisma";
import { Event as EventType } from "@/generated/prisma";

import { Notification as NotificationType } from "@/generated/prisma";

export type FullUserType = UserType & {
  profile: InfoProfile | null;
  _count: {
    posts: number;
  };
};
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
    comments: number;
  };
};

export type FullCommentType = CommentType & {
  user: {
    id: string;
    name: string;
    displayName: string;
    imageUrl: string;
  };
  likesComment: {
    userId: string;
  }[];
  _count: {
    comments: number;
  };
};

export type InfoProfile = {
  bio: string | null;
  location: string | null;
  website: string | null;
  bg: string | null;
};


export type InfoUserType = {
  id: string;
  name: string;
  displayName: string;
  imageUrl: string;
  isFriend: boolean,
};

export type UserCardType = {
  id: string;
  name: string;
  displayName: string;
  imageUrl: string;
  isFriend?: boolean;
};

export type GroupCardType = GroupType & {
  admin: {
    name: string;
  };
  _count: {
    members: number;
  };
};

export type FullInfoGroup = GroupType & {
  admin: {
    id: string;
    name: string;
    displayName: string;
    imageUrl: string;
  };
  members: {
    user: UserCardType;
  }[];
  isMember: boolean;
};

export type FullEventType = EventType & {
  usersConfirm: {
    userId: string;
  }[];
};

export type fullNotificationType = NotificationType & {
  sender: {
    displayName: string;
    id: string;
    imageUrl: string;
    name: string;
  };
};

export type SimpleChat = {
  conversationId: number;
  otherUser: {
    username: string;
    displayName: string;
    imageUrl: string;
  };
  lastMessage: {
    text: string;
    createdAt: Date;
    sentByMe: boolean
  } | null;
};

export type MessageType = {
  id: number;
  content: string | null;
  imageUrl: string | null;
  createdAt: Date;
  senderId: string;
  receiverId: string;
};
