import React, { useState } from "react";
import axios from "axios";
import socket from "../socket";

const JoinBlock = () => {
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");

  const onEnter = () => {
    if (!roomId || !userName) {
      return alert("Please fill all fields");
    }
    axios.post("/rooms", {
      roomId,
      userName,
    })
    // socket.emit("join", { roomId, userName });
  }

  return (
    <div className="join-block">
      <input
        type="text"
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Your name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button onClick={onEnter} className="btn btn-success"> Enter </button>
    </div>
  );
};

export default JoinBlock;
