import { Avatar } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import db from '../firebase';
import './SidebarChat.css';


function SidebarChat({ id, name, addNewChat }) {

    //In react we use useState to declare variable
    const [randomString, setRandomString] = useState('');

    const [messages, setMessages] = useState("");


    // useEffect runs code when the compoment load

    //code for creating random string  
    useEffect(() => {
        setRandomString(Math.floor(Math.random() * 5000));
    }, []);


    //code for retrive all msg of specific room chat in desc. from firebase database and store into messages 
    //when the id changes code will run everytime
    useEffect(() => {
        if (id) {
            db.collection("rooms")
                .doc(id)
                .collection("messages")
                .orderBy("timestamp", "desc")
                .onSnapshot((snapshot) =>
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                );
        }
    }, [id]);



    //code for Taking RoomName form new user using prompt
    const createChat = () => {
        const roomName = prompt("Please enter name for chatRoom");

        //code for push roomName into database
        if (roomName) {
            //do some database stuff...
            db.collection("rooms").add({
                name: roomName,
            });
        }
    };



    return !addNewChat ? (
        //Id is retrive from firebase database
        //(Collection ID)

        <Link to={`/rooms/${id}`}>

            <div className="sidebarChat">

                <Avatar src={`https://avatars.dicebear.com/api/human/${randomString}.svg`} />

                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.messages}</p>
                </div>

            </div>

        </Link>

    ) : (
        <div onClick={createChat} className="sidebarChat">
            <h2>Add new ChatRoom</h2>
        </div>
    );

}


export default SidebarChat
