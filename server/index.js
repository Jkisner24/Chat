import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

io.on('connection', socket => {
    console.log(socket.id)
    
    socket.on('message', (body)=> {
        console.log(body)
        socket.broadcast.emit('message', {
            body,
            from: socket.id.slice(6)
        })
    })
})

server.listen(3001)
console.log('Server on port', 3001)

