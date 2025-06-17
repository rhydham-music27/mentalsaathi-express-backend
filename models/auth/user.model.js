import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: false
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
    profile_picture: {
        type: String,
        required: true,
        unique: false
    },

})
export default mongoose.model('users', userModel)