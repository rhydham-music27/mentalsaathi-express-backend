import jwt from 'jsonwebtoken'
import paymentModel from "../models/payment/payment.model.js"

export const createPaymentController = async (request, response) => {
    const { email, amount, UPI_ID, DOP } = request.body
    const id = request.params.id
    if (!email) return response
        .status(400)
        .send({
            success: false,
            message: "email is required"
        })
    if (!amount) return response
        .status(400)
        .send({
            success: false,
            message: "amount is required"
        })
    if (!UPI_ID) return response
        .status(400)
        .send({
            success: false,
            message: "UPI_ID is required"
        })
    if (!DOP) return response
        .status(400)
        .send({
            success: false,
            message: "DOP is required"
        })
    try {
        const paymentData = await paymentModel({ email, amount, UPI_ID, DOP, SubmittedFor: id })
            .save()
        return response
            .status(201)
            .send({
                success: true,
                message: "Payment data sent to admin",
                data: {
                    email: paymentData.email,
                    amount: paymentData.amount,
                    UPI_ID: paymentData.UPI_ID,
                    DOP: paymentData.DOP
                }
            })
    } catch (error) {
        return response
            .status(500)
            .send({
                success: false,
                message: error
            })
    }
}
export const getPaymentController = async (_request, response) => {
    try {
        const paymentData = await paymentModel.find({})
        return response
            .status(200)
            .send({
                success: true,
                message: "data get succesfull",
                data: paymentData
            })
    } catch (error) {
        return response
            .status(503)
            .send({
                success: false,
                message: "Error in database"
            })
    }
}
export const verifyPaymentController = async (request, response) => {
    const payment_id = request.params.id
    try {
        const payment_data = await paymentModel.findByIdAndUpdate(payment_id, { status: "verified" })
        const payment_token =  jwt.sign({ _id: payment_id, post_id: payment_data.SubmittedFor }, process.env.JWT, { expiresIn: '1h' })
        return response
            .status(200)
            .send({
                message: "pyment verified succesfully",
                success: true,
                payment_data,
                token:payment_token
            })

    } catch (error) {
        return response
            .status(503)
            .send({
                message: "unexpected error happened",
                success: false,
            })
    }
}