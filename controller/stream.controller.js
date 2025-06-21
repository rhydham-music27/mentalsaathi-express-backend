import serverClient from "../config/ServerClient.js";

export const tokenController = (request, response) => {
    const { userId } = request.body;
    if (!userId) return response.status(400).json({ error: 'User ID required' });

    const token = serverClient.createToken(userId);
    response.json({ token });
}
export const initController = async (req, res) => {
  const { therapistId, userId } = req.body;

  const sortedId = [userId, therapistId].sort().join("__");

  const channel = serverClient.channel("messaging", sortedId, {
    name: "Therapist Chat",
    members: [therapistId, userId],
  });

  try {
    await channel.create();
  } catch (err) {
    if (!err.message.includes("already exists")) {
      return res.status(500).json({ message: "Channel creation failed", error: err.message });
    }
  }

  // ✅ Generate token for the USER (not therapist)
  const userToken = serverClient.createToken(userId);

  res.json({
    channelId: sortedId,
    token: userToken,
  });
};

};