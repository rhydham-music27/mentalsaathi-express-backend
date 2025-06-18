import mongoose from "mongoose";

const therapistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    expertise: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    profile_picture: {
        type: String,
        required: true
    },
})
export default mongoose.model('therapists', therapistSchema)