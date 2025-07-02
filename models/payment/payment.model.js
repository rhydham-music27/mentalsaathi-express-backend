// const { default: mongoose } = require("mongoose");
import mongoose  from 'mongoose';

const paymentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    UPI_ID: {
        type: String,
        required: true
    },
    DOP: {
        type: String,
        required: true
    },
    SubmittedFor: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    },
    
})
export default mongoose.model('payments', paymentSchema)