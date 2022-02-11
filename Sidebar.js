import React, { useState } from "react";
import { Tab, Nav, Button, Modal } from 'react-bootstrap';
import Chatrooms from "./Chatrooms";
import Friends from "./Friends";
import NewChatroomModal from "./NewChatroomModal";
import NewFriendModal from "./NewFriendModal";

const CHATROOMS_KEY = 'chatrooms';
const FRIENDS_KEY = 'friends';

export default function Sidebar({user}) {
    const [activeKey, setActiveKey] = useState(CHATROOMS_KEY);
    const chatroomsOpen = activeKey === CHATROOMS_KEY;
    const [modalOpen, setModalOpen] = useState(false);

    function closeModal() {
        setModalOpen(false);
    }
    return (
        <div style={{ width: '250px' }} className="d-flex flex-column">
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                <Nav variant="tabs" className="justify-content-center bg-secondary">
                    <Nav.Item>
                        <Nav.Link className="bg-light" eventKey={CHATROOMS_KEY}>Chat Rooms</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link className="bg-light" eventKey={FRIENDS_KEY}>Friends</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="border overflow-auto flex-grow-1">
                    <Tab.Pane eventKey={CHATROOMS_KEY}>
                        <Chatrooms />
                    </Tab.Pane>
                    <Tab.Pane eventKey={FRIENDS_KEY}>
                        <Friends />
                    </Tab.Pane>
                </Tab.Content>
                <div className="bg-light p-2 border">
                    Your Username: <span className="text-muted">{user}</span>
                </div>
                <Button onClick={()=>setModalOpen(true)} className="rounded-0">
                    New{ chatroomsOpen ? ' Chat Room': ' Friend'}
                </Button>
            </Tab.Container>

            <Modal show={modalOpen} onHide={closeModal}>
                {chatroomsOpen ? 
                <NewChatroomModal closeModal={closeModal}/> :
                <NewFriendModal closeModal={closeModal}/>
                }
            </Modal>
        </div>
    )
}