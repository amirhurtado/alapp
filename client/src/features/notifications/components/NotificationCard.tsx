import React from "react";
import { fullNotificationType } from "@/types";
import Avatar from "@/components/ui/Avatar";
import Link from "next/link";
import TimeAgo from "@/components/ui/TimeAgo";
import { Heart, MessageSquare, Repeat2, Star } from "lucide-react";

interface NotificationCardProps {
  // Define the props for NotificationCard here
  notification: fullNotificationType;
}

const NotificationCard = ({ notification }: NotificationCardProps) => {
  return (
    <Link
      href={notification.link}
      className="border-border border-1 rounded-lg p-2 md:p-4 bg-hover flex flex-col"
    >
      <div className="flex gap-3 items-center">
        <Avatar src={notification.sender.imageUrl} />
        <div className="flex items-center gap-2">
          {notification.type === "like" ? (
            <Heart   className=" min-w-[18px] min-h-[18px] text-icon-pink"/>
          ) : notification.type === "favorite" ? (
            <Star    className=" min-w-[18px] min-h-[18px] text-icon-yellow"/>
          ) : notification.type === "repost" ?  (
            <Repeat2    className=" min-w-[18px] min-h-[18px] text-icon-green"/>
           ) : notification.type === "commment" ?  <MessageSquare  size={18}  className=" min-w-[18px] min-h-[18px] text-primary-color"/>
           : <h1></h1>

          }

          <p className="font-semibold text-xs md:text-sm ">
            <span className="text-xs text-primary-color">
              @{notification.sender.name}{" "}
            </span>
            <span className="text-">{notification.message}.</span>
          </p>
        </div>
      </div>
      <div className="flex justify-end">
        <TimeAgo createdAt={notification.createdAt} />
      </div>
    </Link>
  );
};

export default NotificationCard;
