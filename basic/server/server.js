const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("message", (data) => {
    console.log(data);
  });
  socket.emit("message", "Hello, world!"); //('event key', 'data to send')
});

httpServer.listen(3000, () => {
  console.log("listening on *:3000");
});
