import serverClient from "../config/ServerClient.js";

export const tokenController = async (request, response) => {
    const { userId,otherUserId } = request.body;
    if (!userId) return response.status(400).json({ error: 'User ID required' });
    await serverClient.upsertUsers([
        {
            id: userId,
            name: userId,
            image: `https://getstream.io/random_png/?id=${userId}`,
        },
        {
            id: otherUserId,
            name: otherUserId,
            image: `https://getstream.io/random_png/?id=${otherUserId}`,
        },
    ]);

    const token = serverClient.createToken(userId);
    response.json({ token });
}
export const therapistTokenController = async (req, res) => {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'User ID required' });

    try {
        await serverClient.upsertUser({
            id: userId, // or therapist ID
            name: "Therapist", // or actual name
        });

        // 1. Set therapist role to admin
        await serverClient.partialUpdateUser({
            id: userId,
            set: { role: "admin" },
        });

        // 2. Generate token (no options!)
        const token = serverClient.createToken(userId);

        // 3. Send it
        res.json({ token });
    } catch (err) {
        console.error("❌ therapistTokenController error:", err.message);
        res.status(500).json({ error: "Token generation failed", details: err.message });
    }
};
