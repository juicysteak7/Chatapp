const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const {Server} = require("socket.io")
const io = new Server(server)

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/app.html')
})

io.on('connection', (socket) => {

    console.log('a user has connected')

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg)
        io.emit('chat message', msg)
    })

    socket.on('disconnect', () => {
        console.log('a user has disconnected')
    })
})

server.listen(3000, () => {
    console.log('listing on *:3000')
})