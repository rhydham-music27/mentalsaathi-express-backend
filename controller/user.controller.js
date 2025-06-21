import userModel from "../models/auth/user.model.js"

export const verifyController = async (request, response) => {
    const _id = request.params.id
    const data = await userModel.findById({ _id })
    return response.status(200).send({
        data
    })
}