import { Router } from "express"
import { createPaymentController, getPaymentController, verifyPaymentController } from "../controller/payment.controller.js"
import { AdminAuthenticator } from "../middleware/auth.middleware.js"

const paymentRouter = Router()


paymentRouter.post('/create-payments/:id',createPaymentController )
paymentRouter.get('/get', AdminAuthenticator,getPaymentController)
paymentRouter.patch('/verify/:id', verifyPaymentController)
export default paymentRouter