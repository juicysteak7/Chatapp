import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Login from './Login';
import Dashboard from './Dashboard';
import { FriendsProvider } from '../contexts/FriendsProvider';
import { ChatroomsProvider } from '../contexts/ChatroomsProvider'
//import { SocketProvider } from '../contexts/SocketProvider';

function App() {
  const [user, setUser] = useLocalStorage('user');

  const dashboard = (
    //<SocketProvider id={user}>
      <FriendsProvider>
        <ChatroomsProvider id={user}>
          <Dashboard user={user}/>
        </ChatroomsProvider>
      </FriendsProvider>
    //</SocketProvider>
    
  )

  return (
    user ? dashboard : <Login onIdSubmit={setUser}/> 
  );
}

export default App;