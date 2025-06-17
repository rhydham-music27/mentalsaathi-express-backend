export const profileUploadController = (request, response) => {
    try {
        return response.status(201)
            .send({
                file: request.file
            })
    } catch (error) {
        return response.status(201)
            .send({
                error
            })
    }
}