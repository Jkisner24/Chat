import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import config from './config/config.js'
import mongoose from 'mongoose'
import router from './routes/index.js'
import cors from 'cors'; 
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Obtiene la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/* Instancia de Express */
const app = express()
app.use(cors())

// Configuración para servir archivos estáticos de Vite 
app.use(express.static(path.join(__dirname, 'client/dist')));

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
    console.log(socket.id);
  
    socket.on('message', (message) => {
      console.log(message);
      socket.broadcast.emit('message', message);
    });
});
  
app.use(express.json()); 

/* Inicio servidor http */

app.use(router)

const PORT = config.PORT 
server.listen(PORT)
console.log('Server on port', PORT)

