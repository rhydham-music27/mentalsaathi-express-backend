import express from 'express'
import { emailController } from '../controller/email.controller.js'

const emailRouter = express.Router()
emailRouter.post('/message', emailController)
export default emailRouter