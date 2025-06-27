import { Server } from "socket.io";

export default function handler(req, res) {
  if (!res.socket.server.io) {
    console.log("Запускаем Socket.IO на сервере...");
    const io = new Server(res.socket.server, {
      path: "/api/socket"
    });

    io.on("connection", (socket) => {
      console.log("Новый клиент подключился");

      socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
      });

      socket.on("disconnect", () => {
        console.log("Клиент отключился");
      });
    });

    res.socket.server.io = io;
  }
  res.end();
}
