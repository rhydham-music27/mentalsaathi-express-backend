// import moduleName from 'a/';
import cors from 'cors'
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
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
import axios from 'axios';
import hfRouter from './routes/hf.route.js';
// import ava from './models/therapist/available.therapist.model.js';
dotenv.config()

connectDb()

const app = express()
app.use(cors({
    origin: ['http://localhost:3000', 'https://www.mentalsaathi.in', 'https://mentalsaathi.in'],
    allowedHeaders: ["Content-Type", "Authorization"],
}))
app.use(express.json())
app.use(morgan('dev'))
app.get('/', (_request, response) => {
    response.status(200)
        .send({
            message: "api working succesfully"
        })
})
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
app.use('/api/v1/huggingface',hfRouter )
// controllers/chatController.js








const port = process.env.PORT
// console.log(port)
app.listen(port, () => {
    console.log(`server is running on ${port} `)
})



