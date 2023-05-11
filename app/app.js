const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

app.use(express.static('public'))
const PORT = 3000
server.listen(PORT, () => {
  console.log('Chat app - Listening on port*:' + PORT)
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/chat', (req, res) => {
  res.sendFile(__dirname + '/chat.html')
})

app.get('/create', (req, res) => {
  res.sendFile(__dirname + '/create.html')
})

app.get('/search', (req, res) => {
  res.sendFile(__dirname + '/search.html')
})

app.get('/read', (req, res) => {
  res.sendFile(__dirname + '/read.html')
})

const mainRoom = 'main room'
const waitingRoom = 'waiting room'
let peopleInMainRoom = 0

io.on('connection', (socket) => {
  peopleInMainRoom++
  if (peopleInMainRoom <= 2) {
    socket.join(mainRoom)
    socket.emit('server message', 'Välkommen till chattrummet')
    console.log('People in main room: ' + peopleInMainRoom)
  } else {
    socket.join(waitingRoom)
    socket.emit('server message', 'Välkommen till väntrummet ')
    socket.emit('server message', 'Du är placerad i kö...')
  }

  socket.on('disconnect', () => {
    console.log('A user disconnected')
    peopleInMainRoom--
  })

  socket.on('chat message', (message) => {
    if (socket.rooms.has(mainRoom)) {
      io.to(mainRoom).emit('chat message', message)
    } else {
      socket.emit('chat message', message)
    }
  })
})
