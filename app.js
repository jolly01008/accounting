const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const cors = require('cors')

const { createServer } = require("http")
const { Server } = require("socket.io")

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
require('./config/passport')

const app = express()
const PORT = 3001

const router = require('./routes')
const { connect } = require('./services/socketio')

mongoose.connect(process.env.MONGOOSE_URI)
const db = mongoose.connection

const httpServer = createServer(app)

app.use(cors({
  origin: "http://localhost:3000"  // 允許的前端 URL
}))

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000'
  }
})

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

httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`App is running on http://localhost:${PORT}`)
})

