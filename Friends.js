import React from "react";
import { useFriends } from "../contexts/FriendsProvider";
import { ListGroup } from "react-bootstrap";

export default function Friends() {
    const {friends} = useFriends();

    return (
        <ListGroup variant="flush">
            {friends.map(friend => (
                <ListGroup.Item key={friend.id}>
                    {friend.name}
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
    
}