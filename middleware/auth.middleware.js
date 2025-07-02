import jwt from 'jsonwebtoken';

export const Authenticator = (request, response, next) => {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return response.status(401).json({
            message: "Authorization token missing or malformed",
            success: false
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT);
        request.user = decoded; // Ensure `decoded` contains `.id`
        next();
    } catch (error) {
        return response.status(403).json({
            message: "Invalid or expired token",
            success: false
        });
    }
};
export const AdminAuthenticator = (request, response, next) => {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return response.status(401).json({
            message: "Authorization token missing or malformed",
            success: false
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT);
        request.admin = decoded; // Ensure `decoded` contains `.id`
        next();
    } catch (error) {
        return response.status(403).json({
            message: "Invalid or expired token",
            success: false
        });
    }
};
