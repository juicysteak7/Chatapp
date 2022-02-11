import React from "react";
import { ListGroup } from "react-bootstrap";
import { useChatrooms } from "../contexts/ChatroomsProvider";

export default function Chatrooms() {
const {chatrooms, selectChatroomIndex} = useChatrooms();
    return (
        <ListGroup variant="flush">
            {chatrooms?.map((chatroom, index) => (
                <ListGroup.Item 
                key={index}
                action
                onClick={()=> selectChatroomIndex(index)}
                active={chatroom.selected}
                >
                    {chatroom.recipients.map(r => r.name).join(', ')}
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}