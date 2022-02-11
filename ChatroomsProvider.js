import React, { useContext, useEffect, useState, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useFriends } from "./FriendsProvider";
//import { useSocket } from "./SocketProvider";

const ChatroomsContext = React.createContext();

export function useChatrooms() {
    return useContext(ChatroomsContext);
}

export function ChatroomsProvider({id, children}) {
    const [chatrooms, setChatrooms] = useLocalStorage('chatrooms', []);
    const [selectedChatroomIndex, setSelectedChatroomIndex] = useState(0);
    const {friends} = useFriends();
    //const socket = useSocket();

    function createChatroom(recipients){
        setChatrooms(prevChatrooms => {
            return [...prevChatrooms, {recipients, messages: []}];
        })
    }

    const addMessageToChatroom = useCallback(({recipients, text, sender})=>{
        setChatrooms(prevChatrooms => {
            let madeChange = false;
            const newMessage = {sender, text}
            const newChatrooms = prevChatrooms.map(chatroom => {
                if(arrayEquality(chatroom.recipients, recipients)){
                    madeChange = true;
                    return { ...chatroom, messages: [...chatroom.messages, newMessage]};
                }
                return chatroom;
            })

            if(madeChange){
                return newChatrooms;
            }else{
                return [...prevChatrooms, {recipients, messages: [newMessage]}]
            }
        })
    }, [setChatrooms])

    /*
    useEffect(() => {
        if(socket == null) return

        socket.on('receive-message', addMessageToChatroom)
        return () => socket.off('receive-message');
    }, [socket, addMessageToChatroom])
    */

    function sendMessage(recipients, text){
        //socket.emit('send-message', {recipients,text});
        addMessageToChatroom({recipients,text,sender: id});
    }

    const formattedChatrooms = chatrooms.map((chatroom, index) => {
        const recipients = chatroom.recipients.map(recipient => {
            const friend = friends.find(friend => {
                return friend.id === recipient;
            })
            const name = (friend && friend.name) || recipient;
            return{ id: recipient, name }
        })
        const messages = chatroom.messages.map(message => {
            const friend = friends.find(friend => {
                return friend.id === message.sender;
            })
            const name = (friend && friend.name) || message.sender;
            const fromMe = id === message.sender;
            return { ...message, senderName: name, fromMe }
        })
        const selected = index === selectedChatroomIndex;
        return { ...chatroom, messages, recipients, selected }
    })

    /*
    const output = {
        chatrooms: formattedChatrooms,
        selectChatroomIndex: setSelectedChatroomIndex,
        createChatroom
    }*/

    return (
        <ChatroomsContext.Provider value={{
        chatrooms: formattedChatrooms,
        selectedChatroom: formattedChatrooms[selectedChatroomIndex],
        sendMessage,
        selectChatroomIndex: setSelectedChatroomIndex,
        createChatroom
        }}>
            {children}
        </ChatroomsContext.Provider>
    )
}

function arrayEquality(a, b){
    if(a.length !== b.length) return false

    a.sort();
    b.sort();

    return a.every((element, index)=>{
        return element === b[index];
    })
}