import mongoose, { mongo } from "mongoose";

const paymentSchema = new mongoose.Schema({
    amount:{
        type:String,
        default:"20"
    },
    upi_id:{
        type:String,
        required:true
    }
})
export default mongoose.model('payments',paymentSchema)