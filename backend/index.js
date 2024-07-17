import express from 'express';
import http from 'http';
const app = express()
const server = http.createServer(app)

import { Server } from 'socket.io'

const io= new Server(server,{
  cors:{
    origin:'*'
  }
})


io.on('connection',(socket)=>{
  console.log('connection')

  socket.on('client-ready',()=>{
    socket.broadcast.emit('get-canvas-state')
  })

  socket.on('draw-line',({prevPoint,currentPoint,color})=>{
    socket.broadcast.emit('draw-line',{prevPoint,currentPoint,color})
  })

  socket.on('clear',()=>io.emit('clear'))

})

server.listen(3001,()=>{
  console.log('server is listening on 3001')
})