import crypto from 'crypto';
import { Router } from "express"
import paymentModel from "../models/payment/payment.model.js"
import { verifyPaymentController } from '../controller/payment.controller.js';

const paymentRouter = Router()
paymentRouter.post('/post', async (request, response) => {
    const { upi_id } = request.body
    const model = await new paymentModel({ upi_id: upi_id }).save()
    response.status(201).send({
        success: true,
        message: "post succesfull"
    })
}
)


// Verification route
paymentRouter.post("/verify",verifyPaymentController);

export default paymentRouter