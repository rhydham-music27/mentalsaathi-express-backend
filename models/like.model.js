import mongoose from 'mongoose';
const PostLikeSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true
    },
    userMail: {
        type: String,
        required: true
    }
})
export default mongoose.model('postlikes', PostLikeSchema)