import mongoose from 'mongoose';

const CommunityPostSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    post: {
        type: [],
        required: true
    },
})
export default mongoose.model('posts', CommunityPostSchema)