import { config, configDotenv } from 'dotenv';
import nodemailer from 'nodemailer';
config()
const emailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
})
// console.log( ` user:${ process.env.EMAIL_USER},
        // pass: ${process.env.EMAIL_PASSWORD}`)
export default emailTransporter