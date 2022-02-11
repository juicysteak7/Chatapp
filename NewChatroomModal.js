import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useFriends } from "../contexts/FriendsProvider";
import { useChatrooms } from "../contexts/ChatroomsProvider";

export default function NewChatroomModal({ closeModal }) {
    const [selectedFriendIds, setSelectedFriendIds] = useState([]);
    const { friends } = useFriends();
    const { createChatroom } = useChatrooms();

    function handleSubmit(e) {
        e.preventDefault();
        createChatroom(selectedFriendIds);
        closeModal();
    }

    function handleCheckboxChange(friendId){
        setSelectedFriendIds(prevSelectedFriendIds => {
            if(prevSelectedFriendIds.includes(friendId)){
                return prevSelectedFriendIds.filter(prevId=>{
                    return friendId !== prevId;
                })
            }
            else{
                return [...prevSelectedFriendIds, friendId];
            }
        })
    }
    return (
        <>
            <Modal.Header closeButton>Create Chat Room</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {friends.map(friend=> (
                        <Form.Group className="m-2" controlId={friend.id} key={friend.id}>
                            <Form.Check
                                type="checkbox" 
                                value={selectedFriendIds.includes(friend.id)}
                                label={friend.name}
                                onChange={()=>handleCheckboxChange(friend.id)}
                                className="m-2"
                            />
                        </Form.Group>
                    ))}
                    
                    <Button type="submit" className="m-2">Create</Button>
                </Form>
            </Modal.Body>
        </>
    )
}