const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

let playerScores = [];

io.on("connection", (socket) => {
  socket.on("playerScores", (data) => {
    playerScores.push({ ...data, socketId: socket.id });
    socket.emit("playerScores", playerScores);
    setInterval(() => {
      socket.emit("playerScores", playerScores);
    }, 5000);
  });
});

httpServer.listen(3000, () => {
  console.log("listening on *:3000");
});
