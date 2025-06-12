import jwt from 'jsonwebtoken';
import redis from "../config/redis.js"
import adminAuthModel from "../models/auth/admin.auth.model.js"
import userModel from "../models/auth/user.model.js"
import therapistModels from '../models/admin/therapist.models.js';
import availableTherapistModel from '../models/therapist/available.therapist.model.js';

export const PingController = async (request, response) => {
    const userId = request.user.id
    const timestamp = Date.now()
    await redis.set(`active_user:${userId}`, timestamp, 'EX', 300)
    response.status(200).send({
        message: 'user is online',
        userId
    })
}
export const getActiveController = async (_req, res) => {
    const keys = await redis.keys('active_user:*');
    res.json({ activeUsers: keys.length });
}
export const getUserController = async (_request, response) => {
    const totalUser = (await userModel.find({})).length
    response.status(200)
        .send({
            message: "total user get succesfull",
            success: true,
            totalUser
        })
}
export const getNecessaryController = async (_request, response) => {
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
export const adminAuthLoginController = async (request, response) => {
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
    const token = await jwt.sign({ _id: AdminExists._id }, process.env.JWT)
    return response.status(200)
        .send({
            message: "admin authenticated successfully",
            success: true,
            token

        })
}
export const addTherapistController = async (request, response) => {
    try {
        const { name, email, phone_number, experience, gender, expertise, bio } = request.body
        if (!name) return response.status(400)
            .send({
                message: "name is required",
                success: false
            })
        if (!email) return response.status(400)
            .send({
                message: "email is required",
                success: false
            })
        if (!phone_number) return response.status(400)
            .send({
                message: "phone_number is required",
                success: false
            })
        if (!experience) return response.status(400)
            .send({
                message: "experience is required",
                success: false
            })
        if (!gender) return response.status(400)
            .send({
                message: "gender is required",
                success: false
            })
        if (!expertise) return response.status(400)
            .send({
                message: "expertise is required",
                success: false
            })
        if (!bio) return response.status(400)
            .send({
                message: "bio is required",
                success: false
            })

        const exist = await therapistModels.findOne({ email })
        if (exist) return response.status(409).send({
            message: "therapist is present there",
            success: false
        })
        try {
            const therapistData = await therapistModels({ name, email, phone_number, experience, gender, expertise, bio }).save()
            await availableTherapistModel({ email }).save()
            return response.status(201)
                .send({
                    message: "therapist added to database succesfully",
                    success: true,
                    ...therapistData
                })
        } catch (error) {
            return response.status(503)
                .send({
                    message: "database error",
                    success: false
                })
        }
    } catch (error) {
        return response.status(304).send(
            {
                message: error
            }
        )
    }

}