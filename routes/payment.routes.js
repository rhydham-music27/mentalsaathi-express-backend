import { Router }from "express"
import { createOrderController, verifyPaymentController } from '../controller/payment.controller.js';

const paymentRouter = Router()



// Create Order Endpoint
paymentRouter.post("/create-order",createOrderController );



// Verification route
paymentRouter.post("/verify",verifyPaymentController);

export default paymentRouter