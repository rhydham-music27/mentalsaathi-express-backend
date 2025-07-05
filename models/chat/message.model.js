import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    timestamp: {
        type: String,
        required: true,
    },
    sender_id: {
        type: String,
        required: true
    },
    receiver_id: {
        type: String,
        required: true
    },
    room_id: {
        type: String,
        required: true
    },
})

export default mongoose.model('messages', messageSchema)