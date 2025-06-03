import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    message: {
        type: String,
        required: true,
        unique: false,
    },

})
export default mongoose.model('contactus', contactUsSchema)