import mongoose from "mongoose";

const waitingListSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    }

}, { timestamps: true })
export default mongoose.model('waitinglist', waitingListSchema)