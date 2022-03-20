const { model, Schema } = require('mongoose')

const twisterSchema = new Schema({
  twister: { type: String, unique: true },
  level: { type: Number, default: 0 },
  createdAt: { type: String },
  createdBy: { type: String, default: "Unknown Person" }
})

module.exports = model('Twister', twisterSchema)