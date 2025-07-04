import messageModel from "../models/chat/message.model.js"

export const addMessageController = async (request, response) => {
    const { message, timestamp, room_id, sender_id, reciever_id } = request.body
    if (!message) return response
        .status(400)
        .send({
            success: false,
            message: "message is required"
        })
    if (!timestamp) return response
        .status(400)
        .send({
            success: false,
            message: "timespamp is required"
        })
    if (!sender_id) return response
        .status(400)
        .send({
            success: false,
            message: "sender_id is required"
        })
    if (!reciever_id) return response
        .status(400)
        .send({
            success: false,
            message: "reciever_id is required"
        })
    if (!room_id) return response
        .status(400)
        .send({
            success: false,
            message: "room_id is required"
        })
    try {
        const messageData = await new messageModel({ message, timestamp, sender_id, receiver_id: reciever_id, room_id }).save()
        return response.status(201).send({
            message: "sent succesfull"
        })
    } catch (error) {
        return response.status(500).send({
            error
        })
    }


}
export const getMessageController = async (request, response) => {
    try {
        const messageData = await messageModel.find({ room_id: request.params.roomId })
        return response
            .status(200)
            .send({
                message: "get succesfull",
                data: messageData
            })
    } catch (error) {
        return response
            .status(503)
            .send({
                message: "get unsuccesfull",
                error: error
            })
    }
}