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
import journalModel from './models/tools/journal.model.js';
import userModel from './models/auth/user.model.js';
import { Authenticator } from './middleware/auth.middleware.js';
import redis from './config/redis.js';
import adminRouter from './routes/admin.route.js';
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
app.use('/api/v1/tools', toolsRouter)
app.use('/api/v1/admin', adminRouter)



const port = process.env.PORT
// console.log(port)
app.listen(port, () => {
    console.log(`server is running on ${port} `)
})



