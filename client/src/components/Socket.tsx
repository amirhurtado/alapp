"use client";

import { useEffect } from "react";
import { socket } from "../socket"; // Asegúrate que la ruta sea correcta
import { useUser } from "@clerk/nextjs";
import { useNotificationCount } from "@/store/useNotification";

export default function Socket() {
  const { user } = useUser();
  const increment = useNotificationCount((state) => state.increment);

  useEffect(() => {
    // Si ya está conectado, ejecuta la lógica de conexión
    if (socket.connected) {
      onConnect();
    }

    // Se ejecuta al establecer la conexión
    function onConnect() {
      if (user) {
        socket.emit("newUser", user.id);
      }
    }

    // Se ejecuta al desconectar
    function onDisconnect() {
      // Puedes añadir lógica aquí si es necesario
    }

    // Maneja notificaciones globales
    function onNotification(receiveruserId: string) {
      if (receiveruserId === user?.id) {
        increment();
      }
    }

    // Suscripción a eventos globales
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("getNotification", onNotification);

    // Función de limpieza para evitar listeners duplicados
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("getNotification", onNotification);
    };
  }, [user, increment]);

  return null;
}