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

app.get("/rooms/:id", function (req, res) {
  const {id: roomId} = req.params;
  const obj = rooms.has(roomId) ? {
    users: [...rooms.get(roomId).get("users").values()],
    messages: [...rooms.get(roomId).get("messages").values()],
  } : {users: [], messages: []}; 
  res.json(obj)
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

  socket.on("ROOM:NEW_MESSAGE", ({ roomId, userName, text }) => {
    const obj = { userName, text };
    rooms.get(roomId).get("messages").push(obj);
    socket.to(roomId).broadcast.emit("ROOM:NEW_MESSAGE ", obj);
  });

  socket.on("disconnect", () => {
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
