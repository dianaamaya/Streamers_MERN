export const sockets = (io) => {
    io.on('connection', (socket) => {
    
        socket.on('createdStreamer', async (streamer) => {
            streamer.newStreamer = true
            socket.broadcast.emit('createdStreamer', streamer)
        })
    
        socket.on('updatedStreamer', (streamer) => {
            streamer.newStreamer = false
            socket.broadcast.emit('updatedStreamer', streamer)
        })
    })
}