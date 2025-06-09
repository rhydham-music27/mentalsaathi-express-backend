import jwt from 'jsonwebtoken';
import redis from "../config/redis.js"
import adminAuthModel from "../models/auth/admin.auth.model.js"
import userModel from "../models/auth/user.model.js"

export const PingController = async (request, response) => {
    const userId = request.user.id
    const timestamp = Date.now()
    await redis.set(`active_user:${userId}`, timestamp, 'EX', 300)
    response.status(200).send({
        message: 'user is online'
    })
}
export const getActiveController = async (req, res) => {
    const keys = await redis.keys('active_user:*');
    res.json({ activeUsers: keys.length });
}
export const getUserController = async (request, response) => {
    const totalUser = (await userModel.find({})).length
    response.status(200)
        .send({
            message: "total user get succesfull",
            success: true,
            totalUser
        })
}
export const getNecessaryController = async (request, response) => {
    const totalUser = (await userModel.find({})).length
    const keys = await redis.keys('active_user:*');
    response.status(200)
        .send({
            message: "total user get succesfull",
            success: true,
            totalUser,
            active: keys.length
        })
}
export const adminAuthLoginController =  async (request, response) => {
    const { email, password } = request.body
    if (!email) return response.status(400)
        .send({
            message: "email is not entered"
        })
    if (!password) return response.status(400)
        .send({
            message: "password is not entered"
        })
    const AdminExists = await adminAuthModel.findOne({ email, password })
    if (!AdminExists) return response.status(403)
        .send({
            message: "incorrect username and password",
            success: false
        })
    const token = await jwt.sign({ _id: AdminExists._id },process.env.JWT)
    return response.status(200)
        .send({
            message: "admin authenticated successfully",
            success: true,
            token

        })
}