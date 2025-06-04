import jwt from 'jsonwebtoken';
export const Authenticator = (request, response, next) => {
    const token = request.headers.authorization.split(" ")[1]
    try {
        const decode = jwt.verify(token, process.env.JWT)
        request.user = decode
        next()
    } catch (error) {
        response.status(403).send({
            message: "you need to login",
            success:false
        })
    }

}