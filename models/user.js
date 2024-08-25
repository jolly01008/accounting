const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: { type: String, required: true, min: 1, max: 8 },
  account: { type: String, required: true, min: 1, max: 20 },
  password: { type: String, required: true, min: 3, max: 15 },
  avatar: { type: String },
  createAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('User', userSchema)
