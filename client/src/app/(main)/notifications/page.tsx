import { getNoticationsAction } from "@/actions/notification/getNotification";
import BackNavigation from "@/components/ui/BackNavigation";
import FullNotificationsView from "@/features/notifications/components/FullNotificationsView";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const page = async () => {
  const currUser = await currentUser();

  if (!currUser) return;

  const notifications = await getNoticationsAction(currUser.id);

  return (
    <div className="flex flex-col h-[100dvh] overflow-hidden ">
      <BackNavigation
        title="Notificaciones"
        subtitle="Aqui encuentras todas tus notificaciones"
      />
      <FullNotificationsView
        notifications={notifications}
        currentUserId={currUser.id}
      />
    </div>
  );
};

export default page;
