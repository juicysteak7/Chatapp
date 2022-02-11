/*
const httpServer = require("http").createServer();
const io = require('socket.io')(httpServer, {
    cors: {
        origin: "https://localhost:5000",
        methods: ["GET", "POST"],
        credentials: true
    }
});

function handleer(er){
    er.preventDefault();
}

httpServer.listen(5000);

io.on('connection', socket => {
    const id = socket.handshake.query.id;
    socket.join(id);

    socket.on('send-message', ({recipients, text}) =>{
        recipients.forEach(recipient => {
            const newRecipients = recipients.filter(r => r !== recipient)
            newRecipients.push(id)
            socket.broadcast.to(recipients).emit('recieve-message', {
                recipients: newRecipients, sender: id, text
            })
        })
    })
})
*/