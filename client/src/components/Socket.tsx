"use client";

import { useEffect } from "react";
import { socket } from "../socket"; 
import { useUser } from "@clerk/nextjs";
import { useNotificationCount } from "@/store/useNotification";
// 👇 1. Importa el store para el contador de mensajes
import { useGlobalMessageUnreadCount } from "@/store/GlobalMessageUnreadCountStore";

export default function Socket() {
  const { user } = useUser();
  const increment = useNotificationCount((state) => state.increment);

  // 👇 2. Obtén la función para incrementar los mensajes
  const { increment: incrementMessage } = useGlobalMessageUnreadCount();

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

    // 👇 3. Crea la función que maneja la llegada de un nuevo mensaje
    function onNewMessage() {
      incrementMessage();
    }

    // Suscripción a eventos globales
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("getNotification", onNotification);
    // 👇 4. Suscríbete al evento 'newMessage' que envía el servidor
    socket.on("newMessage", onNewMessage);

    // Función de limpieza para evitar listeners duplicados
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("getNotification", onNotification);
      // 👇 5. Asegúrate de limpiar la suscripción al evento 'newMessage'
      socket.off("newMessage", onNewMessage);
    };
  }, [user, increment, incrementMessage]); // 👇 6. Agrega la nueva función a las dependencias

  return null;
}