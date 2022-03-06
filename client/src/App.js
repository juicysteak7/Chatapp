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
      socket.emit("join", room, socket.id);
      setShowChat(true);
    }
  }


  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h2>Join a Chatroom</h2>
          <input 
            type="text"
            placeholder="Enter Your Username"
            onChange={(e)=>{
              setUsername(e.target.value);
            }}
          />
          <input 
            type="text"
            placeholder="Enter the Room ID"
            onChange={(e)=>{
              setRoom(e.target.value);
            }}
          />
          <button onClick={joinRoom}>Join a Room</button>
        </div>
      ):(
        <Chat socket={socket} username={username} room={room}/>
      )}
    </div>
  );
}

export default App;
