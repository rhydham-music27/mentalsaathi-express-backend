import cors from 'cors'
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDb from './config/db.js';
import interactionRouter from './routes/interaction.route.js';
import authRouter from './routes/auth.route.js';
import jwt from 'jsonwebtoken';
import { formRateLimiter } from './middleware/interaction.middleware.js';
import communityPostModel from './models/community.post.model.js';
import { Authenticator } from './middleware/auth.middleware.js';
import userModel from './models/user.model.js';
import postRouter from './routes/post.route.js';
import likeModel from './models/like.model.js';
import mongoose from 'mongoose';
import postCommentModel from './models/post.comment.model.js';
dotenv.config()

connectDb()

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.get('/', (request, response) => {
    response.status(200)
        .send({
            message: "api working succesfully"
        })
})
app.use('/api/v1/interaction', formRateLimiter, interactionRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/post', postRouter)



const port = process.env.PORT
// console.log(port)
app.listen(port, () => {
    console.log(`server is running on ${port} `)
})



