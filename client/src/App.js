import './App.css';
import io from "socket.io-client";
import { useState, useEffect } from "react";
import Chat from "./Chat"

const socket = io.connect("http://localhost:8000")

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat,setShowChat] = useState(false);
  const [valid,setValid] = useState(false);
  const [pw, setPw] = useState("");

  const joinRoom = () => {
    if(username !== "" && room !== "" && valid){
      socket.emit("join", room/*, socket.id*/);
      setShowChat(true);
    }else{
      console.log("User confirmation unsuccessful")
    }
  }
  const newUser = () => {
    if(username !== "" && pw !== ""){
      socket.emit("new_user", username, pw);
      setValid(true)
    }
  }
  const confirmUser = () => {
    if(username !== "" && pw !== ""){
      socket.emit("check_users", username, pw, socket.id)
    }
  }

  useEffect(() => {
      socket.on("confirm_user", ()=>{
          console.log("User confirmed")
          setValid(true)
      })
  },[socket]);

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
            placeholder="Enter Your Password"
            onChange={(e)=>{
              setPw(e.target.value);
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
          <button onClick={confirmUser}>Confirm User</button>
          <button onClick={newUser}>New User</button>
        </div>
      ):(
        <Chat socket={socket} username={username} room={room}/>
      )}
    </div>
  );
}

export default App;
