const express = require("express")
const http = require("http")
const cors = require("cors")
const { Server } = require("socket.io")
const mongoose = require("mongoose")

const Message = require("./models/Message")
require("dotenv").config()


//App
const app = express()
app.use(cors())

const server = http.createServer(app)

mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})

mongoose.connection.once("open", ()=>{
    console.log("Mongo connected...")
})

const io = new Server(server, {
    cors: {
        origin:"http://localhost:3000",
        methods: ["GET", "POST"],
    },
})

io.on("connection", (socket)=>{
    console.log(`User Connected: ${socket.id}`)

    socket.on("join",(room,id)=>{
        socket.join(room)
        socket.join(id)
        console.log(`User connected to room: ${room}`)
    })

    socket.on("joined", (id, room)=>{
        console.log("joining...")
        Message.find().then(result=>{
            result.map((resultum)=>{
                const datum = {
                    room: resultum.room,
                    author: resultum.author,
                    message: resultum.message,
                    time: resultum.time,
                }
                console.log(datum)
                console.log(room)
                if(datum.room === room){
                    console.log("sending message...")
                    console.log(id)
                    socket.to(id).emit("receive_message",datum)
                }
            })
        })
    })

    socket.on("send_message",(data)=>{
       
        const newMessage = new Message({
            room: data.room,
            author: data.author,
            message: data.message,
            time: data.time

        })

        newMessage.save()

        console.log({data})
        socket.to(data.room).emit("receive_message",data)
    })

    socket.on("disconnect",()=>{
        console.log("User disconnected")
    })

})

server.listen(8000, ()=>{
    console.log("Server Running...")
})