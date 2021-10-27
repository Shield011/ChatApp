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
import firebase from "firebase";
import { useStateValue } from "../StateProvider"

function Chat() {
  const [input, setInput] = useState();
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([])
  const [{ user }, dispatch] = useStateValue();


  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection('rooms').doc(roomId).collection("messages").orderBy('timestamp', 'asc').onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data()
      )));
    }
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(input);

    db.collection('rooms').doc(roomId).collection('messages').add({
      message : input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <MdAccountCircle size="2.5em" />
        <div className="chat_headerInfo">
          <h3>{roomName}</h3>
          <p>Last seen{" "}{new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
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
        {messages.map(message => (<p className= { `chat_message ${message.name === user.displayName && "chat_receiver"}`}>
          <span className="chat_name">{message.name}</span>
          {message.message}
          <span className="chat_timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
        </p>
        ))}
        
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
