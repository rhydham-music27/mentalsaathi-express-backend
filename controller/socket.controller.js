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
    })
}