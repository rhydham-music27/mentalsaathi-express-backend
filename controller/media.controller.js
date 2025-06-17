export const profileUploadController = (request, response) => {
    return response.status(201)
        .send({
            file: request.file
        })
}