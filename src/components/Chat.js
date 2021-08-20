import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons';

import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import db from '../firebase';
import "./Chat.css";
import { useStateValue } from '../StateProvider';
import firebase from 'firebase';




function Chat() {

    //In react we use useState to declare variable
    const [input, setInput] = useState("");
    const [randomString, setRandomString] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);

    //Here we pull the user from useStateValue (StateProvider)
    const [{ user }] = useStateValue();


    // useEffect runs code when the compoment load
    useEffect(() => {
        setRandomString(Math.floor(Math.random() * 5000));
    }, [roomId]);



    //retrive Room Name form database using RoomId
    useEffect(() => {
        if (roomId) {
            db.collection("rooms")
                .doc(roomId)
                .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

            //retrive messages form database using RoomId
            db.collection("rooms").doc(roomId).collection("messages").orderBy('timestamp', 'asc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()
                ))
            ));
        }
    }, [roomId])




    //when user somthing type in input tag and press enter the the below funcion calls 
    const sendMessage = (e) => {
        e.preventDefault();
        // console.log(input); 
        //code for pushing messages , name and timestamp into the firebase database
        db.collection('rooms').doc(roomId).collection('messages').add({
            messages: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput("");
    }

    return (
        <div className="chat">

            <div className="chat__header">

                <Avatar src={`https://avatars.dicebear.com/api/human/${randomString}.svg`} />

                <div className="chat__headerInfo">

                    <h3>{roomName}</h3>

                    <p>
                        {/* last seen gate form last msg which is send in that chat group */}
                        last seen at {" "}
                        {new Date(
                            messages[messages.length - 1]?.timestamp?.toDate()
                        ).toLocaleString()}

                    </p>

                </div>

                <div className="chat__headerRight">

                    <IconButton>
                        <SearchOutlined />
                    </IconButton>

                    <IconButton>
                        <MoreVert />
                    </IconButton>

                </div>
            </div>

            <div className="chat__body">

                {messages.map((message) => (

                    <p className={`chat__message ${message.name === user.displayName && "chat__receiver"
                        }`}
                    >

                        <span className="chat__name">
                            {message.name}
                        </span>

                        {message.messages}

                        <span className="chat__timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>

                ))}

            </div>

            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticon />
                </IconButton>

                <IconButton>
                    <AttachFile />
                </IconButton>


                <form>
                    <input type="text" value={input}
                        onChange={e => setInput(e.target.value)} placeholder="Type a message" />

                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>


                <IconButton>
                    <Mic />
                </IconButton>


            </div>
        </div>
    )
}

export default Chat
