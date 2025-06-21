import therapistModels from "../models/admin/therapist.models.js"
import jwt from 'jsonwebtoken';
import availableTherapistModel from "../models/therapist/available.therapist.model.js";

export const therapistLoginController = async (request, response) => {
    const { email, password } = request.body
    if (!email) return response.status(400).send({
        success: false,
        message: "email is required"
    })
    if (!password) return response.status(400).send({
        success: false,
        message: "password is required"
    })
    const Exists = await therapistModels.findOne({ email })
    if (!Exists) return response.status(404).send({
        success: false,
        message: "user dont exists please contact admin"
    })
    const Password = `${Exists.name.slice(0, 3)}${Exists.phone_number.slice(-4)}`
    if (password !== Password) return response.status(403).send({
        message: "invalid email or password",
        success: false
    })
    const token = jwt.sign({ _id: Exists._id }, process.env.JWT, { expiresIn: '2h' })
    return response.status(200).send({
        message: "therapist login succesfully",
        token,
        success: true
    })


}
export const therapistToggleController = async (request, response) => {
    try {
        const userId = request.user._id
        const userData = await therapistModels.findById(userId)
        if (!userData) return response.status(404).send({
            message: "user not found here",
            success: false,
            userId
        })
        const email = userData.email
        const availabletherapist = await availableTherapistModel.findOne({ email })
        if (!availabletherapist) return response.status(404).send({
            message: "user not found there",
            success: false
        })
        if (availabletherapist.status === true) {
            await availableTherapistModel.findOneAndUpdate({ email }, {
                $set: { status: 0 }
            }, { new: true })
        }
        if (availabletherapist.status === false) {
            await availableTherapistModel.findOneAndUpdate({ email }, {
                $set: { status: 1 }
            }, { new: true })
        }
        return response.status(201).send({
            message: "toggled",
            success: true,
            ...availabletherapist
        })
    } catch (error) {
        return response.status(500).send({
            message: error.message,
            success: false
        })
    }

}
export const getAvailableController = async (_request, response) => {
    const data = await therapistModels.find({})
    return response.status(200).send({
        message: "get succesfull",
        success: true,
        data
    })
}
export const getAvailablityStatusController = async (request, response) => {
    const employeeId = request.params.id
    const data = await availableTherapistModel.findOne({ employeeId })
    return response.status(200).send({
        message: "get succesfull",
        success: true,
        data
    })
}
export const getContainer = async (request, response) => {
    const id = request.params.id
    try {
        const { _id, email, name, profile_picture } = await therapistModels.findById(id)
        return response.status(200).send({
            _id, email, name, profile_picture, success: true
        })
    } catch (error) {
        return response.status(500).send({
            success: false, message: "data not found"
        })
    }
}
export const verifyController = async (request, response) => {
    const id = request.user._id
    const data = await therapistModels.findById({ _id: id })
    return response.status(200).send({
        _id: id,
        success: true,
        data
    })
}