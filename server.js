
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use( express.static('public'))


let listaDeMensajes = []

io.on('connection', (socket)=>{  //Servidor escuchando
    console.log('Un Nuevo usuario se ha conectado')
    socket.emit('messages', listaDeMensajes ) // Emitir todo los mensajes al nuevo  cliente conectado

    socket.on('new-message', (data)=>{
        listaDeMensajes.push(data)
        io.sockets.emit('messages', listaDeMensajes) // Emite la lista de mensajes a todos los clientes
    })
})


const port =  process.env.PORT || 8080

const srv = server.listen(port , ()=> {
    console.log(`Servidor Http con webSocket, escuchando en el puerto ${ srv.address().port}`)
})