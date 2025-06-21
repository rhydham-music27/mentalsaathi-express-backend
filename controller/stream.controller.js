import serverClient from "../config/ServerClient.js";

export const tokenController = (request, response) => {
    const { userId } = request.body;
    if (!userId) return response.status(400).json({ error: 'User ID required' });

    const token = serverClient.createToken(userId);
    response.json({ token });
}
export const therapistTokenController = (request, response) => {
    const { userId } = request.body;
    if (!userId) return response.status(400).json({ error: 'User ID required' });

    const token = serverClient.createToken(userId, { role: "admin" });
    response.json({ token });
}