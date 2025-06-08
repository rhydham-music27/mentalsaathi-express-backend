import redis from "../config/redis.js"
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