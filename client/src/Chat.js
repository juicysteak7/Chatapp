import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([])

    const sendMessage = async() => {
        if(currentMessage !== ""){
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time:
                    new Date(Date.now().getHours()+":"+Date.now().getMinutes())
            };

            await socket.emit("send_message", messageData);
            setMessageList((list)=>[...list,messageData]);
            setCurrentMessage("")
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data)=>{
            setMessageList((list)=>[...list,data]);
        });
    },[socket]);

    return(
    <div>
        <p>Hello There</p>
    </div>
    );
};

export default Chat;