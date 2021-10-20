import React from 'react'
import {MdAccountCircle} from 'react-icons/md';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';
import './Sidebar.css'
import { SearchOutlined } from '@material-ui/icons';


function Sidebar() {
    return (
        <div className = "sidebar">
            <div className = "sidebar_header">
           
              < MdAccountCircle  size = "2em"/>

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
                <SearchOutlined />
                <input placeholder = "Search" type = "text" />
                </div>
               

            </div>
            <div className = "sidebar_chats">
                
            </div>
    
        </div>
    );
}

export default Sidebar
