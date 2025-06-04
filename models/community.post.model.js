import mongoose from 'mongoose';

const CommunityPostSchema = new mongoose.Schema({


    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true,
        default: Date.now()
    },
    replies: {
        type: Number,
        required: true,
        default: 0
    },
    likes: {
        type: Number,
        required: true,
        default: 0
    },
    category: {
        type: String,
        required: true
    },
    preview: {
        type: String,
        required: true
    },


})
export default mongoose.model('posts', CommunityPostSchema)