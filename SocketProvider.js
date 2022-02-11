/*
import React, { useContext, useEffect, useState } from "react";
//import io from 'socket.io-client';

const io = require("socket.io-client");

const SocketContext = React.createContext();

export function useSocket(){
    return useContext(SocketContext);
}

export function SocketProvider({id, children}){
    const socket = io("https://localhost:5000", {
        withCredentials: true,
    });
    const setSocket = useState();

    useEffect(() => {
        const newSocket = io('http://localhost:5000', {
            withCredentials: true,
            query: {id}})
        setSocket(newSocket);
        return () => newSocket.close()
    }, [id])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}*/