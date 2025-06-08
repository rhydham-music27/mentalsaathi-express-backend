import mongoose from "mongoose";

const journalSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    journal: {
        type: String,
        required: true
    }
})
export default mongoose.model('journal', journalSchema)