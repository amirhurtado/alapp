"use client";

import { useEffect } from "react";
import { socket } from "../socket";
import { useUser } from "@clerk/nextjs";
import { useNotificationCount } from "@/store/useNotification";

export default function Socket() {
  const { user } = useUser();

  const increment = useNotificationCount((state) => state.increment);

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

    function onNewMessage(senderUserId: string) {
      console.log(
        "ME DEBIO LLEGAR UN NUEVO MENSAJE DE SENDERUSERID",
        senderUserId
      );
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("getNotification", onNotification);
    socket.on("newMessage", onNewMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [user, increment]);

  return null;
}
