"use client";

import { useEffect } from "react";
import { socket } from "../socket";
import { useUser } from "@clerk/nextjs";

export default function Socket() {
  const { user } = useUser();

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

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [user]);

  return null;
}
