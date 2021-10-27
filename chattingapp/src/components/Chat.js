import React from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";
import { useState, useEffect } from "react";
import { MdAccountCircle } from "react-icons/md";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SearchIcon from "@mui/icons-material/Search";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import db from "../Firebase";

function Chat() {
  const [input, setInput] = useState();
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));
    }
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(input);
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <MdAccountCircle size="2.5em" />
        <div className="chat_headerInfo">
          <h3>{roomName}</h3>
          <p> Last seen at ...</p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        <p className="chat_message  chat_receiver">
          <span className="chat_name">Smriti Rani</span>
          Hey guys
          <span className="chat_timestamp">1:00pm</span>
        </p>

        <p className="chat_message">
          <span className="chat_name">Smriti Rani</span>
          Hey guys
          <span className="chat_timestamp">1:00pm</span>
        </p>
      </div>

      <div className="chat_footer">
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <IconButton type="submit" onClick={sendMessage}>
            <SendIcon />
          </IconButton>
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
