import { Avatar, IconButton } from '@material-ui/core';
import { Chat, DonutLarge, MoreVert, SearchOutlined } from '@material-ui/icons';
import React, { useState, useEffect } from 'react'
import db from '../firebase';
import { useStateValue } from '../StateProvider';
import './Sidebar.css';
import SidebarChat from './SidebarChat';


function Sidebar() {

    const [rooms, setRooms] = useState([]);
    const [{ user }] = useStateValue();

    //code for retrive rooms data from firebase database
    useEffect(() => {
        // Runs only when side bar Component load
        //onSanpshot generate a snapshot of its expected output given certain data
        const unsubscribe = db.collection("rooms").onSnapshot((snapshot) => {
            setRooms(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            );
        });

        return () => {
            unsubscribe();
        };
    }, []);


    return (
        <div className="sidebar">

            <div className="sidebar__header">

                <IconButton>
                    {/* user.photoURl returns the user Google Account img  */}
                    <Avatar src={user?.photoURL} />
                </IconButton>

                <div className="sidebar__headerRight">
                    {/* IconButton is used for make button clickable */}
                    <IconButton>
                        <DonutLarge />
                    </IconButton>

                    <IconButton>
                        <Chat />
                    </IconButton>

                    <IconButton>
                        <MoreVert />
                    </IconButton>
                    
                </div>

            </div>

            <div className="sidebar__search">

                <div className="sidebar__searchContainer">

                    <IconButton>
                        <SearchOutlined />
                    </IconButton>

                    <input type="text" placeholder="Search or start new chat" />

                </div>

            </div>

            <div className="sidebar__chats">

                <SidebarChat addNewChat />

                {rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id}
                        name={room.data.name} />
                ))}

            </div>

        </div>
    )
}

export default Sidebar
