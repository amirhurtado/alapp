import { Server } from "socket.io";

const PORT = process.env.PORT || 3001;

let onlineUsers = [];

const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};

const addUser = (userId, socketId) => {
  const isExist = onlineUsers.find((user) => user.socketId === socketId);
  if (!isExist) {
    onlineUsers.push({ userId, socketId });
    console.log("Usuario agregado:", { userId });
  }
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
  console.log("Usuario eliminado:", { socketId });
};

const io = new Server(PORT, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://alapp.site",
      "https://www.alapp.site"
    ],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Nueva conexión:", socket.id);

  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
  });

  socket.on("sendNotification", (receiveruserId) => {
    const receiver = getUser(receiveruserId);
    if (receiver) {
      io.to(receiver.socketId).emit("getNotification", receiveruserId);
    }
  });

  socket.on("sendGroupNotification", (receiversUserId) => {
    receiversUserId.map((receiveruserId) => {
      const receiver = getUser(receiveruserId);
      if (receiver) {
        io.to(receiver.socketId).emit("getNotification", receiveruserId);
      }
    });
  });

  socket.on("newMessageServer", (senderUserId, receiverUserId) => {
    const receiver = getUser(receiverUserId);
    if (receiver) {
      io.to(receiver.socketId).emit("newMessage", senderUserId);
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

console.log(`✅ Socket.IO server running on port ${PORT}`);