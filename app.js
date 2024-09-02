const express = require('express')
const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const PORT = 3000

const routes = require('./routes')

mongoose.connect(process.env.MONGOOSE_URI)
const db = mongoose.connection

app.use(routes)

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongoDB connected!')
})

app.get('/', (req, res) => {
  res.send('hello')
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
