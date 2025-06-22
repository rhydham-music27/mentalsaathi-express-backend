import axios from "axios";
import { config } from "dotenv";

config()

export const detectControllerasync = async (req, res) => {
    const emojiMap = {
        joy: "😄",
        sadness: "😢",
        anger: "😡",
        fear: "😨",
        surprise: "😲",
        disgust: "🤢",
        neutral: "😐",
        love: "❤️",
    };

    const { text } = req.body;
    const API_URL = "https://api-inference.huggingface.co/models/j-hartmann/emotion-english-distilroberta-base"
    const headers = {
        Authorization: `Bearer ${process.env.HF_API}`,
    };

    try {
        const response = await axios.post(API_URL, { inputs: text }, { headers });
        const emotions = response.data[0]; // it's a list of label/score
        const topEmotion = emotions.reduce((max, curr) => (curr.score > max.score ? curr : max));

        const mood = topEmotion.label.toLowerCase();  // Normalize label casing
        const emoji = emojiMap[mood] || "🙂"; // fallback emoji

        res.json({
            mood,
            emoji,
            confidence: Number(topEmotion.score.toFixed(2)),
        });

    } catch (error) {
        console.error("HuggingFace Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Mood detection failed" });
    }
}