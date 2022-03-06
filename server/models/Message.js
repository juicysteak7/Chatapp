const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    room:{
        type:String,
        required:true,
        ref:"room",
    },
    author:{
        type:String,
        required:true,
        ref:"author",
    },
    message:{
        type:String,
        required:true,
        ref:"message",
    },
    time:{
        type:String,
        required:true,
        ref:"time",
    },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;