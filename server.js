import cors from 'cors'
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDb from './config/db.js';
import interactionRouter from './routes/interaction.route.js';
import emailTransporter from './utils/email.utils.js';
import getintouchModel from './models/getintouch.model.js';
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
app.use('/api/v1/interaction',interactionRouter)




const port = process.env.PORT
// console.log(port)
app.listen(port, () => {
    console.log(`server is running on ${port} `)
})
