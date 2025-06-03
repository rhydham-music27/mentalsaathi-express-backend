import mongoose from 'mongoose';

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to mongodb at ${conn.connection.host}  `)
    } catch (error) {
        console.log(error)
    }

}
export default connectDb