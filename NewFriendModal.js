import React, {useRef} from "react";
import { Modal, Form, Button } from 'react-bootstrap';
import { useFriends } from "../contexts/FriendsProvider";

export default function NewFriendModal({closeModal}) {
    const idRef = useRef()
    const nameRef = useRef()
    const {createFriend} = useFriends();
    function handleSubmit(e){
        e.preventDefault()

        createFriend(idRef.current.value, nameRef.current.value);
        closeModal();
    }
    return (
        <>
            <Modal.Header closeButton>Create Contact</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="m-2">
                        <Form.Label>Id</Form.Label>
                        <Form.Control type="text" ref={idRef} required/>
                    </Form.Group>
                    <Form.Group className="m-2">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" ref={nameRef} required/>
                    </Form.Group>
                    <Button type="submit" className="m-2">Create</Button>
                </Form>
            </Modal.Body>
        </>
    )
}