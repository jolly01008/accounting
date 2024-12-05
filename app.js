const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
require('./config/passport')

const app = express()
const PORT = 3000

const router = require('./routes')

mongoose.connect(process.env.MONGOOSE_URI)
const db = mongoose.connection

app.use(express.json())
app.use(passport.initialize())

app.use('/api', router)

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongoDB connected!')
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
