import React from "react";
import { useChatrooms } from "../contexts/ChatroomsProvider";
import OpenChatroom from "./OpenChatrooom";
import Sidebar from "./Sidebar";

export default function Dashboard({user}) {
    const {selectedChatroom} = useChatrooms();
    return (
        <div className="d-flex" style={{ height:'100vh' }}>
        <Sidebar user={user} />
        {selectedChatroom && <OpenChatroom />}
        </div>
    )
}