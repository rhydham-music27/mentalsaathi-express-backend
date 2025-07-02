import { Server } from "socket.io";
import { server } from "./server.js";

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000', 'https://www.mentalsaathi.in', 'https://mentalsaathi.in'],
        allowedHeaders: ["Content-Type", "Authorization"],
    }
})

export default io