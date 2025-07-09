import dotenv from 'dotenv';
import connectDb from './config/db.js';
import interactionRouter from './routes/interaction.route.js';
import authRouter from './routes/auth.route.js';
import { formRateLimiter } from './middleware/interaction.middleware.js';
import postRouter from './routes/post.route.js';
import toolsRouter from './routes/tools.route.js';
import adminRouter from './routes/admin.route.js';
import therapyRouter from './routes/therapist.route.js';
import emailRouter from './routes/email.route.js';
import mediaRouter from './routes/media.routes.js';
import streamRouter from './routes/stream.route.js';
import userRouter from './routes/user.routes.js';
import hfRouter from './routes/hf.route.js';
import { app, server } from './config/server.js';
import { baseController } from './controller/base.controller.js';
import io from './config/socket.js';
import { registerIoController } from './controller/socket.controller.js';
import messageRouter from './routes/messages.route.js';
import messageModel from './models/chat/message.model.js';
import paymentModel from './models/payment/payment.model.js';
import paymentRouter from './routes/payment.routes.js';
dotenv.config()
connectDb()
const port = process.env.PORT
app.get('/', baseController)
app.use('/api/v1/interaction', formRateLimiter, interactionRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/post', postRouter)
app.use('/api/v1/tools', toolsRouter)
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/therapist', therapyRouter)
app.use('/api/v1/email', emailRouter)
app.use('/api/v1/media', mediaRouter)
app.use('/api/v1/stream', streamRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/huggingface', hfRouter)
app.use('/api/v1/message', messageRouter)
app.use('/api/v1/payment', paymentRouter)


registerIoController(io)

server.listen(port, () => {
    console.log(`server is running on ${port} `)
})