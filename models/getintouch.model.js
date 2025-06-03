import mongoose from "mongoose";

const getInTouchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
        unique: false,
    },
    institution: {
        type: String,
        required: true,
        unique: false,
    },

})
export default mongoose.model('getintouch', getInTouchSchema)