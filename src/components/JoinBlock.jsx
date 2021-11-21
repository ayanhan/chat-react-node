import React, { useState } from "react";
import axios from "axios";
import socket from "../socket";

const JoinBlock = ({onLogin}) => {
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  const onEnter = async () => {
    if (!roomId || !userName) {
      return alert("Please fill all fields");
    }
    setLoading(true)
    const obj = {
      roomId,
      userName,
    }
    await axios.post("/rooms", obj);
    onLogin(obj)
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
      <button disabled={loading} onClick={onEnter} className="btn btn-success"> Enter </button>
    </div>
  );
};

export default JoinBlock;
