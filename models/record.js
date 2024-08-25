const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  item: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  time: { type: Date, required: true, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
})

module.exports = mongoose.model('Record', recordSchema)
