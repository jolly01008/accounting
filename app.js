const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')

const { createServer } = require("http")
const { Server } = require("socket.io")

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
require('./config/passport')

const app = express()
const PORT = 3000

const router = require('./routes')
const { connect } = require('./services/socketio')

mongoose.connect(process.env.MONGOOSE_URI)
const db = mongoose.connection

const httpServer = createServer(app)

const io = new Server(httpServer)

connect(io)  // socket connect

app.use(express.json())
app.use(passport.initialize())

app.use('/api', router)

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongoDB connected!')
})

httpServer.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
