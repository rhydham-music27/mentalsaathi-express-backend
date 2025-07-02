export const baseController = (_request, response) => {
    response
        .status(200)
        .send({
            message: "api working succesfully"
        })
}