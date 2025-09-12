"use client";

import { useEffect } from "react";
import { socket } from "../socket";
import { useUser } from "@clerk/nextjs";
import { useNotificationCount } from "@/store/useNotification";

export default function Socket() {
  const { user } = useUser();


  const increment = useNotificationCount((state) => state.increment)

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      if (user) {
        socket.emit("newUser", user.id);
      }
    }

    function onDisconnect() {}

    function onNotification(receiveruserId: string) {
      if (receiveruserId === user?.id) {
        increment();
      }
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("getNotification", onNotification);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [user, increment]);

  return null;
}
