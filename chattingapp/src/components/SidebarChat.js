import React, { useEffect, useState} from 'react'
import './SidebarChat.css';
import {MdAccountCircle} from 'react-icons/md';
import db from "../Firebase"
import { Link } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton } from '@mui/material';


function SidebarChat({id, name,addNewChat}) {

    const[messages, setMessages] = useState("")

    useEffect(() => {
        if(id){
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => (setMessages(snapshot.docs.map((doc) => doc.data()))

            ))
        }
    }, [id])
    const createChat = () => {
        const roomName = prompt ("Please enter name for chat");

        if (roomName) {
            db.collection('rooms').add({
                name: roomName,
            });

        }

    }
    return  !addNewChat ? (
        
        <Link to = { `/rooms/${id}`}>
        <div className = "sidebarChat">
            <MdAccountCircle size = "2.5em"/>
            <div className = "sidebarChat_info">
                <h2>{name}</h2>
                <p> {messages[0]?.message}</p>
            </div>
        
        </div>

        </Link>
        
        
    ) : (
        
        <div onClick = {createChat}
        className = "sidebarChat">
        {/* <IconButton>
             <AddCircleIcon />
        </IconButton> */}
        <h2> Add new chat </h2>
        </div>
    )
    
}

export default SidebarChat
