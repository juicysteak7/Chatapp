import './App.css';
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat"

const socket = io.connect("http://localhost:8000")

function App() {
  const [username, setUsername] =useState("");
  const [room, setRoom] = useState("");
  const [showChat,setShowChat] = useState(false);

  const joinRoom = () => {
    if(username !== "" && room !== ""){
      socket.emit("join_room", room);
      setShowChat(true);
    }
  }
  return (
    <div>
      {!showChat ? (
        <div>
          Join a Chatroom
          <form id="user-setup-container">
            <input 
              type="text"
              placeholder="Enter Your Username"
              id="username-input"
              onChange={(event)=>{
                setUsername(event.target.value);
              }}
            />
            <input 
              type="text"
              placeholder="Enter the Room ID"
              id="room-input"
              onChange={(event)=>{
                setRoom(event.target.value);
              }}
            />
            <button onClick={joinRoom}>Join a Room</button>
          </form>
        </div>
      ):(
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
