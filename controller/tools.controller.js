import journalModel from "../models/tools/journal.model.js"

export const journalController = async (request, response) => {
    const { journal, preview, content, mood } = request.body
    if (!journal) return response.status(400).send({
        message: "journal must be entered",
        success: true
    })
    if (!preview) return response.status(400).send({
        message: "preview must be entered",
        success: true
    })
    if (!content) return response.status(400).send({
        message: "content must be entered",
        success: true
    })
    if (!mood) return response.status(400).send({
        message: "mood must be entered",
        success: true
    })
    try {
        const journalData = await new journalModel({ journal, userId: request.user._id, preview, mood, content }).save()
        return response.status(201).send({
            message: "journal uploaded succesfully",
            success: true,
            ...journalData
        })
    } catch (error) {
        return response.status(500).send({
            message: "unknown error occured",
            success: false,
        })
    }

}
export const getJournalController = async (request, response) => {
    try {
        const journalData = await journalModel.find({ userId: request.user._id })
        return response.status(200).send({
            message: "journal data get succesfully",
            success: true,
            journalData
        })
    } catch (error) {
        console.log(error)
        return response.status(503).send(
            {
                message: "cannot get journal data due to server error",
                success: false
            }
        )
    }

}