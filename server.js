const express = require('express');
const usesocket = require('socket.io');


const app = express();
const server = require('http').Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
app.use(express.json());

const rooms = new Map();

app.get('/rooms', function(req,res){
    res.json(rooms);
});

app.post('/rooms', function(req, res){
  const {roomId, userName} = req.body;
  if (!rooms.has(rooms)) {
    rooms.set(roomId, new Map([
      ['users', new Map()],
      ['messages', []],
    ]));
  } 
  res.send()
})

io.on("connection", socket => {
    console.log("socket connected", socket.id)
})

server.listen(8888, (err) => {
    if (err) {
        throw Error('Something bad happened...', err);
    }
    console.log('Server started on port 8888');
});