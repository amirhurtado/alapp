import React from "react";
import { fullNotificationType } from "@/types";
import Avatar from "@/components/ui/Avatar";
import Link from "next/link";
import TimeAgo from "@/components/ui/TimeAgo";

interface NotificationCardProps {
  // Define the props for NotificationCard here
  notification: fullNotificationType;
}

const NotificationCard = ({ notification }: NotificationCardProps) => {
  return (
    <Link href={notification.link} className="border-border border-1 rounded-lg p-4 bg-hover flex flex-col">
      <div className="flex gap-3 items-center">
        <Avatar src={notification.sender.imageUrl} />
        <div>
          <p className="font-semibold text-sm">
            {notification.sender.displayName}{" "}
            <span className="text-xs text-primary-color">
              ({notification.sender.name}){" "}
            </span>
            <span className="text-sm">
              {notification.message}.
            </span>
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
