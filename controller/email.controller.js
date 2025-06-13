import { config } from "dotenv"
import emailTransporter from "../utils/email.utils.js"
config()
export const emailController = async (request, response) => {
    const { to, subject, text } = request.body
    if (!to) return response.status(400).send({
        message: "to is required",
        success: false
    })
    if (!subject) return response.status(400).send({
        message: "subject is required",
        success: false
    })
    if (!text) return response.status(400).send({
        message: "text is required",
        success: false
    })
    try {
        await emailTransporter.sendMail({ from: process.env.EMAIL_USER, to, subject, text })
        return response.status(201)
            .send({
                success: true,
                message: "email sent"
            })
    } catch (error) {
        return response.status(503)
            .send({
                success: false,
                message: " email cannot be sent due to some error "
            })
    }
}