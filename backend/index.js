const express = require('express')
const http = require('http')
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
  socket.on('draw-line',({prevPoint,currentPoint,color})=>{
    socket.broadcast.emit('draw-line',{prevPoint,currentPoint,color})
  })
})

server.listen(3001,()=>{
  console.log('server is listening on 3001')
})