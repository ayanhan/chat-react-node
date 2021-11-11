const express = require('express');
const usesocket = require('socket.io');


const app = express();
const server = require('http').Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const rooms = new Map();

app.get('/users', function(req,res){
    res.json(rooms);
});

io.on("connection", socket => {
    console.log("socket connected", socket.id)
})

server.listen(8888, (err) => {
    if (err) {
        throw Error('Something bad happened...', err);
    }
    console.log('Server started on port 8888');
});