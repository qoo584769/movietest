require('dotenv').config()
const { OAuth2Client } = require('google-auth-library')

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const redirectUri = 'https://movietest-production.up.railway.app/auth/callback'

const controllerAccount = {
  async auth (req, res, next) {
    const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, redirectUri)
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent', // 使用者同意授權
      scope: ['openid', 'email', 'profile'] // 取得使用者的個人資訊
    })
    console.log('轉址第一階段')
    console.log(authorizeUrl)
    res.redirect(authorizeUrl)
  },
  async google (req, res, next) {
    // 引入官方的套件
    const code = req.query.code
    console.log('code', code)
    console.log('轉址第二階段')
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
    const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, redirectUri)
    const { tokens } = await client.getToken(code)
    // const token = req.body.id_token
    // 將token和client_Id放入參數一起去做驗證
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: CLIENT_ID
    })

    // 拿到的ticket就是換回來的使用者資料
    console.log(ticket)
    res.status(200).json({
      status: 'success',
      ticket
    })
  // 以下就個人需求看要拿資料做哪些使用
  // ex 使用者資訊存入資料庫，把資料存到 session內 等等
  }
}

module.exports = controllerAccount
