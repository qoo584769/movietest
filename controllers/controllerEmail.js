require('dotenv').config()
const nodemailer = require('nodemailer')
const crypto = require('crypto')

const controllerEmail = {
  async sendMail (req, res, next) {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      // host: 'smtp.ethereal.email',
      // port: 587,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASS_KEY
      }
    })

    const result = await transporter.sendMail({
      from: '"管理者" <crazymovie@gmail.com>',
      to: 'uh584697213@gmail.com',
      // 副本
      // cc:'testaccount@gmail.com',
      // 密件副本
      // bcc:'testaccount2@gmail.com',
      subject: '測試信件123',
      text:
        'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n' +
        //   + `https://codepen.io/fxq14103/pen/QWQZJaO/${token}\n\n`
        // `https://codepen.io/fxq14103/pen/QWQZJaO/515152\n\n` +
        '測試用' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n',
      //   html: '',
      // 附加檔案 陣列
      attachments: [
        {
          filename: 'test.txt',
          content: '純文字附加檔案'
        }
        // {
        //   filename: 'mon1.png',
        //   path: `${path.join(__dirname, '../utilities/mon.png')}`,
        //   cid: '001'
        // }
      ]
    })
    // console.log(result)
    // res.status(200).json(result)
    return result
  },
  // 忘記密碼發信
  async forgotPassword (req, res, next) {
    if (req.body.email === '' || req.body.email === undefined) {
      return res.status(400).send('信箱必填')
    }
    const token = crypto.randomBytes(20).toString('hex')

    const resetToken = {
      email: req.body.email,
      resetPasswordToken: token,
      resetPasswordExpires: Date.now() + 3600000
    }

    // const emailCheck = await forgotPasswordDB(resetToken)

    // 驗證信箱是不是有註冊 沒驗證直接寄也可以 就是寄給不存在的信箱
    // if (!emailCheck) {
    //   return next(appErr(400, '信箱不存在', next))
    // }

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASS_KEY
      }
    })

    const result = await transporter.sendMail({
      from: 'demo@gmail.com',
      // to: emailCheck.email,
      to: resetToken.email,
      subject: '密碼重置信件',
      text:
      'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
      'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n' +
      `https://codepen.io/fxq14103/pen/QWQZJaO?editors=1111&token=${token}\n\n` +
      'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    //   html: '',
    })

    return result
    // res.status(200).json('密碼重置信已發送')
  }
}

module.exports = controllerEmail
