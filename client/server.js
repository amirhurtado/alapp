import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

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

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    socket.on("newUser", (userId) => {
      addUser(userId, socket.id);
    });

    socket.on("sendNotification", (receiveruserId) => {
      const receiver = getUser(receiveruserId);
      if (receiver)
        io.to(receiver.socketId).emit("getNotification", receiveruserId);
    });

    socket.on("sendGroupNotification", (receiversUserId) => {
      console.log("PASO 3", receiversUserId);

      receiversUserId.map((receiveruserId) => {
        const receiver = getUser(receiveruserId);

        if (receiver)
          console.log("PASOOOO 4")
          io.to(receiver.socketId).emit("getNotification", receiveruserId);
      });
    });

    socket.on("disconnect", () => {
      removeUser(socket.id);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
