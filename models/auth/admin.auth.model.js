import mongoose from 'mongoose'
const adminAuthSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
})
export default mongoose.model('adminusers', adminAuthSchema)