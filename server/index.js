import { Server as SocketServer } from 'socket.io'
import http from 'http'
import app from './app.js'
import { PORT } from './config.js'
import { sockets } from './sockets.js'
import { connectDB } from './database.js'

connectDB()

const server = http.createServer(app)

const io = new SocketServer(server, {
    cors: {
        origin: "http://localhost:5173"
    }
})

sockets(io)

server.listen(PORT)
console.log('Server on port', PORT)