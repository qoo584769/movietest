const { Schema, model } = require('mongoose')

const modelUser = model('user', new Schema({
  account: {
    type: String,
    required: [true, '帳號為必填']
  },
  password: {
    type: String,
    required: [true, '密碼為必填'],
    select: false
  },
  phoneNumber: {
    type: String
  },
  birthdayDay: {
    type: Date
  },
  createAt: {
    type: Date,
    default: Date.now(),
    select: false
  }
}))

module.exports = modelUser
