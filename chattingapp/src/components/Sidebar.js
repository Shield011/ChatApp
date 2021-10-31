import React from 'react'
import { useState, useEffect } from 'react';
import {MdAccountCircle} from 'react-icons/md';
import {AiOutlineSearch} from 'react-icons/ai'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';
import './Sidebar.css'
import SidebarChat from './SidebarChat';
import db from '../Firebase';
import { useStateValue } from '../StateProvider';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        db.collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => 
                ({
                    id: doc.id,
                    data: doc.data(),
                })))
        ))

    }, [])


    return (
        <div className = "sidebar">
            <div className = "sidebar_header">
           
              <MdAccountCircle src = {user?.photoURL}  size = "2em"/>

              <div className = "sidebar_headerRight">
                  <IconButton>
                  <DonutLargeIcon />
                  </IconButton>
                  <IconButton>
                  <ChatIcon />
                  </IconButton>
                  <IconButton>
                  <MoreVertIcon />
                  </IconButton>

              </div>
            
              
            </div>
            <div className = "sidebar_search">
                <div className = "sidebar_searchContainer">
                <AiOutlineSearch className = "searchIcon" />
                <input placeholder = "Search" type = "text" />
                </div>
               

            </div>
            <div className = "sidebar_chats">
               <SidebarChat addNewChat/>
               {rooms.map(room => (
                   <SidebarChat key ={room.id} id = {room.id} name = {room.data.name} />
               ))}
               <IconButton>
                <AddCircleIcon />
               </IconButton>
            </div>
    
        </div>
    );
}

export default Sidebar
