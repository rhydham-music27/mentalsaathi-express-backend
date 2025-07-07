export const registerIoController = (io) => {
    io.on('connection', (socket) => {
        // console.log(socket.id)
        socket.on('disconnect', () => {
            // console.log(`user having ${socket.id} is disconnected`)
        })
        socket.on('join', ({ room }) => {
            socket.join(room)
            console.log(`user with ${socket.id} joined the room ${room}`)
        })
        socket.on("typing", ({ room }) => {
            socket.to(room).emit("typing");
        });

        socket.on("stopTyping", ({ room }) => {
            socket.to(room).emit("stopTyping");
        });
        socket.on('message', ({ room, message }) => {
            socket.to(room).emit('message', { message: message, sentbyyou: false, timestamp: new Date() })
            console.log("message sent", message, room)
        })
        socket.on("join_room", ({ roomId, userName }) => {
            socket.join(roomId);
            const systemMessage = {
                type: "system",
                message: `${userName} joined the chat`,
                timestamp: new Date(),
            };
            io.to(roomId).emit("system_message", systemMessage);
        });

        socket.on("leave_room", ({ roomId, userName }) => {
            const systemMessage = {
                type: "system",
                message: `${userName} left the chat`,
                timestamp: new Date(),
            };
            io.to(roomId).emit("system_message", systemMessage);
        });
    })
}