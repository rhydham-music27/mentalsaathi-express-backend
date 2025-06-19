import userModel from "../models/auth/user.model.js"
import { comparePassword, hashPassword } from "../utils/auth.utils.js"
import jwt from 'jsonwebtoken';
export const signupController = async (request, response) => {
    const { email, name, password, confirmPassword, profile_picture } = request.body
    if (!email) return response.status(400)
        .send({
            message: "enter the email",
            success: false
        })
    if (!name) return response.status(400)
        .send({
            message: "enter the name",
            success: false
        })
    if (!password) return response.status(400)
        .send({
            message: "enter the password",
            success: false
        })
    if (!confirmPassword) return response.status(400)
        .send({
            message: "enter the confirmation password",
            success: false
        })
    if (!profile_picture) return response.status(400)
        .send({
            message: "upload the profile picture",
            success: false
        })
    if (password !== confirmPassword) return response.status(400)
        .send({
            success: false, message: "both passwords do not match"
        })
    const existingUser = await userModel.findOne({ email })
    if (existingUser) return response.status(400)
        .send({
            message: "user already exist , please go to login page",
            success: false
        })
    const hashedPassword = await hashPassword(password)
    const user = {
        email, name, password: hashedPassword, profile_picture
    }
    const creationOfUser = await new userModel(user).save()
    if (!creationOfUser) return response.status(503)
        .send({
            message: "unable to register user on database", success: false
        })
    return response.status(201)
        .send({
            ...user,
            message: "user created succesfully , kindly login",
            success: true
        })
}
export const loginController = async (request, response) => {
    const { email, password } = request.body
    if (!email) return response.status(400).send({
        message: "enter your email",
        success: false
    })
    if (!password) return response.status(400).send({
        message: "enter your password",
        success: false
    })
    const userData = await userModel.findOne({ email })
    if (!userData) return response.status(400).send({
        success: false,
        message: "user not registered kindly register"
    })
    const match = await comparePassword(password, userData.password)
    if (!match) return response.status(403).send({
        success: false,
        message: "either email or password is wrong"
    })
    const token = await jwt.sign({ _id: userData._id }, process.env.JWT, { expiresIn: "3h" })
    return response.status(200)
        .send({
            email: email,
            message: "user login succesfull",
            success: true,
            token
        })

}
export const authenticaterController = async (request, response) => {
    const user = request.user
    const userData = await userModel.findById(user._id)
    // console.log(userData)
    const { _id, email, name, profile_picture } = userData
    // console.log(user)
    return response.status(200).send({

        success: true,
        message: true,
        email, name, profile_picture, _id

    })
}