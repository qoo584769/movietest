const jwt = require('jsonwebtoken')
require('dotenv').config()

const token = {
  async signinToken (userId) {
    return jwt.sign(
      // data的內容可以在登入解密出來
      {
        id: userId
      },
      // 給jwt一個字串當作加密編碼參考 需要隱藏起來 否則會有被反推的機會
      // 驗證的時候要用一樣的字串去解 不然會算不出原本的資料
      process.env.SECRET,
      {
        algorithm: 'HS256', // 加密方式
        // 多久之後到期 60一分鐘到期 60*60一小時
        // 也可以不用exp直接在secret後面加上{ expiresIn: '1h' }
        // exp: Math.floor(Date.now() / 1000) + 60 * 60,
        expiresIn: process.env.EXPIRES_IN
      }
    )
  }
}

module.exports = token
