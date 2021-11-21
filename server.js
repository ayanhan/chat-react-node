const express = require("express");
const usesocket = require("socket.io");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
app.use(express.json());

const rooms = new Map();

app.get("/rooms", function (req, res) {
  res.json(rooms);
});

app.post("/rooms", function (req, res) {
  const { roomId, userName } = req.body;
  if (!rooms.has(rooms)) {
    rooms.set(
      roomId,
      new Map([
        ["users", new Map()],
        ["messages", []],
      ])
    );
  }
  res.send();
});

io.on("connection", (socket) => {
  socket.on("ROOM:JOIN", ({ roomId, userName }) => {
    socket.join(roomId);
    rooms.get(roomId).get("users").set(socket.id, userName);
    const users = [...rooms.get(roomId).get("users").values()];
    socket.to(roomId).broadcast.emit("ROOM:JOINED", users);
  });

  socket.on("disconnected", () => {
    rooms.forEach((value, roomId) => {
      if (value.get("users").delete(socket.id)) {
        const users = [...rooms.get(roomId).get("users").values()];
        socket.to(roomId).broadcast.emit("ROOM:LEFT", users);
      }
    });
  });

  console.log("socket connected", socket.id);
});

server.listen(8888, (err) => {
  if (err) {
    throw Error("Something bad happened...", err);
  }
  console.log("Server started on port 8888");
});
