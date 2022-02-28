const express = require("express")
const http = require("http")
const cors = require("cors")
const { Server } = require("socket.io")

//App
const app = express()
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin:"http://localhost:3000",
        methods: ["GET", "POST"],
    },
})

io.on("connection", (socket)=>{
    console.log(`User Connected: ${socket.id}`)

})

server.listen(8000, ()=>{
    console.log("Server Running...")
})