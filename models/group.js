const mongoose = require('mongoose')
const Schema = mongoose.Schema

const groupSchema = new Schema({
  gpName: { type: String, required: true },
  gpCreater: { type: String, required: true },
  gpMembers: { type: Array, required: true },
  gpRecord: [
    {
      item: { type: String, required: true },
      lender: { type: String, required: true },
      borrower: { type: String, required: true },
      price: { type: Number, required: true },
      time: { type: Date }
    },
  ],
})

module.exports = mongoose.model('Group', groupSchema)
