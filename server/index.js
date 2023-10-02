import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import config from './config/config.js'
import mongoose from 'mongoose'

/* Instancia de Express */
const app = express()

/* Servidor HTTP con Express */
const server = http.createServer(app)

/* Config socket.io */
const io = new Server(server)

/* Conexion a la base de datos */
async function connectToDataBase(){
    try{
        await mongoose.connect(config.URL_MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        })
        console.log('Conexión exitosa a MongoDB');

    }catch(error){
        console.log('Error en conexion a MongoDB', error)
  }
}

connectToDataBase()

/* Conexion de socket */
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

/* Inicio servidor http */

const PORT = config.PORT
server.listen(PORT)
console.log('Server on port', PORT)

