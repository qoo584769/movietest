const modelMovieInfo = require('../models/modelMovieInfo')

const controllerMovieInfo = {
  async get (req, res, next) {
    const result = await modelMovieInfo.find()
    console.log(result)
    return result
  },
  async post (req, res, next) {
    const data = {
      name: '超級瑪利歐兄弟電影版',
      img: ['https://www.ambassador.com.tw/assets/img/movies/TheSuperMarioBrosMovie_180x270_Poster.jpg'],
      status: ['上映中'],
      box_office: 45678912,
      // 預告片
      trailer: 'https://youtu.be/sov-IOMEYbY',
      // 分級
      rating: ['普遍級'],
      release_date: new Date(2023, 9, 4),
      language: '日語中字',
      // 廳別
      auditorium: ['A廳', 'B廳', 'C廳'],
      // 電影種類
      genre: ['動畫'],
      // 放映版本
      edition: ['數位', '數位3D', '4DX'],
      director: '亞倫霍瓦斯、麥可傑勒尼克',
      actor: ['(配音)克里斯普瑞特', '安雅泰勒喬伊', '查理戴', '傑克布萊克', '基根麥可基', '塞斯羅根', '弗萊德阿米森凱里佩頓'],
      // 片長
      run_time: '92分鐘',
      // 場次
      show_time: ['06:10', '08:20', '10:30', '12:40', '14:50', '17:00', '19:10', '21:20', '23:30'],
      // 電影簡介
      synopsis: '任天堂暨照明娛樂共同出品一部改編自最受歡迎電玩遊戲《超級瑪利歐兄弟》的全新動畫片《超級瑪利歐兄弟電影版》。'
    }
    // console.log(data)
    const result = await modelMovieInfo.create(data)
    console.log(result)
    return req.body
  }
}

module.exports = controllerMovieInfo
