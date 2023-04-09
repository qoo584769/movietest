const { Schema, model } = require('mongoose')

const modelMovieInfo = model('movie', new Schema({
  name: {
    type: String,
    require: [true, '電影名稱必填']
  },
  img: {
    type: Array
  },
  status: {
    type: Array,
    required: [true, '上映狀態必填']
  },
  box_office: {
    type: Number
  },
  // 預告片
  trailer: {
    type: String
  },
  // 分級
  rating: {
    type: Array
  },
  release_date: {
    type: Date
  },
  language: {
    type: String
  },
  // 廳別
  auditorium: {
    type: Array
  },
  // 電影種類
  genre: {
    type: Array
  },
  // 放映版本
  edition: {
    type: Array
  },
  director: {
    type: String
  },
  actor: {
    type: Array
  },
  // 片長
  run_time: {
    type: String
  },
  // 場次
  show_time: {
    type: Array
  },
  // 電影簡介
  synopsis: {
    type: String
  }

}))

module.exports = modelMovieInfo
