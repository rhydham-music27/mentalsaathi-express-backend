import mongoose, { mongo } from "mongoose";

const VideoModel = new mongoose.Schema({
    video_url: {
        type: String,
        required: true
    },
    thumbnail_url: {
        type: String,
        required: true
    },
    admin: {
        type: String,
        default: "Admin"
    }
})
export default mongoose.model('therapyvideos', VideoModel)