const express = require('express')
const cors = require('cors')
const bp = require('body-parser')
import DbContext from "./db/DbConfig"

const port = process.env.PORT || 3000

let server = express()

DbContext.connect()

server.use(express.static(__dirname + '/build'))

let whitelist = ['http://localhost:8080', 'https://hungerhaven.herokuapp.com'];
let corsOptions = {
  origin: function (origin, callback) {
    let originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true
};
// @ts-ignore
server.use(cors(corsOptions))

server.use(bp.urlencoded({ extended: true }))
server.use(bp.json())

import AuthController from './controllers/AuthController'
import Session from "./middleware/session"
server.use(new Session().express)
server.use('/account', new AuthController().router)

import UserController from './controllers/UserController'
import EventController from './controllers/EventController'

server.use('/api/user', new UserController().router)
server.use('/api/events', new EventController().router)

server.use((error, req, res, next) => {
  console.error(error);
  res.status(error.status || 400).send({ error: error.message })
})

server.use('*', (req, res, next) => {
  res.status(404).send("Route not found")
})

server.listen(port, () => { console.log(`Server is running on port: ${port}`) })

// server.listen(port, () => { console.log(`Server is running on port: ${port}`) })
// const io = require('socket.io')(app)

// io.on('connection', function (socket) {
//   socket.on('SEND_BRINGSIDE', function (data) {
//     io.emit('BRINGSIDE', data)
//   })
//   socket.on('SEND_BRINGDRINK', function (data) {
//     io.emit('BRINGDRINK', data)
//   })
//   socket.on('SEND_BRINGDESSERT', function (data) {
//     io.emit('BRINGDESSERT', data)
//   })
//   socket.on('SEND_CHANGEMAINCOURSE', function (data) {
//     io.emit('CHANGEMAINCOURSE', data)
//   })
//   socket.on('SEND_CHANGETIME', function (data) {
//     io.emit('CHANGETIME', data)
//   })
//   socket.on('SEND_CHANGEPLACE', function (data) {
//     io.emit('CHANGEPLACE', data)
//   })
//   socket.on('SEND_REQSIDE', function (data) {
//     io.emit('REQSIDE', data)
//   })
//   socket.on('SEND_REQDRINK', function (data) {
//     io.emit('REQDRINK', data)
//   })
//   socket.on('SEND_REQDESSERT', function (data) {
//     io.emit('REQDESSERT', data)
//   })
//   socket.on('SEND_ADDATTENDEE', function (data) {
//     io.emit('ADDATTENDEE', data)
//   })
//   socket.on('SEND_CHANGESTATUS', function (data) {
//     io.emit('CHANGESTATUS', data)
//   })
// })
// let webSocketServer = require('websocket').server;
// let http = require('http');
// let socketServer = http.createServer(function (request, response) {
//   console.log("hi");
//   response.writeHead(404);
//   response.end();
// });
// server.listen(8080, function () {
//   console.log("server is listening on port 8080")
// });

// let wsServer = new webSocketServer({
//   httpServer: socketServer
// })


// wsServer.on('request', function (request) {
//   let connection = request.accept('echo-protocol', request.origin);
//   console.log("Connection accepted.");
//   connection.on('message', function (message) {
//     console.log('Received Message: ' + message.utf8Data);
//     connection.sendUTF(message.utf8Data)

//   });
//   connection.on('close', function (reasonCode, description) {
//     console.log('Peer ' + connection.remoteAddress + ' disconnected')
//   })

// })