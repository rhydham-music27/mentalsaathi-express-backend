import mongoose from 'mongoose';
const PostCommentSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    profile_picture: {
        type: String,
        required: true
    },

})

export default mongoose.model('comments', PostCommentSchema)