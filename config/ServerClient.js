import { config } from "dotenv";
import { StreamChat } from "stream-chat";
config()
const serverClient = StreamChat.getInstance(process.env.STREAM_API_KEY, process.env.STREAM_SECRET)
export default serverClient