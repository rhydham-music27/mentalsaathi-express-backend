import mongoose from 'mongoose';
import moongoose from 'mongoose';
const availableSchema = new moongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: Boolean,//0 for unavailable , 1 for available 
        // required:true
        default: 0
    },
})
export default mongoose.model('availables', availableSchema)