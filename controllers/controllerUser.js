
const hash = require('@/utilities/hash')
const modelUser = require('@/models/modelUser')
const serviceResponse = require('@/services/serviceResponse')
const token = require('@/utilities/jwt')

const controllerUser = {
  // 註冊
  async signup (req, res, next) {
    const { account, password, phoneNumber, birthdayDay } = req.body
    const newPassword = await hash.password(password)
    const data = {
      account,
      password: newPassword,
      phoneNumber,
      birthdayDay
    }
    const result = await modelUser.create(data)
    console.log(result)
    return result
  },
  // 登入
  async signin (req, res, next) {
    const { account, password } = req.body
    const userData = {
      account, password
    }
    if (!userData.account || !userData.password) {
      serviceResponse.error(400, '帳號密碼必填')
    }
    const dbRes = await modelUser.findOne({ account: userData.account }).select('+password')
    const compaire = await hash.compaire(userData.password, dbRes.password)

    if (!compaire) {
      serviceResponse.error(400, '密碼錯誤')
    }

    const signinToken = await token.signinToken(dbRes.id)

    const authData = {
      token: signinToken,
      account: dbRes.account,
      phoneNumber: dbRes.phoneNumber,
      birthdayDay: dbRes.birthdayDay
    }

    return authData
  },
  async updateUser (req, res, next) {
    const { user } = req
    console.log(user)
    const { password, confirmPassword } = req.body
    if (!password || !confirmPassword) {
      serviceResponse.error(400, '密碼不能為空')
    }
    if (password !== confirmPassword) {
      serviceResponse.error(400, '密碼不一致')
    }
    const newPassword = await hash.password(password)
    console.log(newPassword)
    const editUser = await modelUser.findByIdAndUpdate(user, { password: newPassword }, { returnDocument: 'after', runValidators: true })

    if (!editUser) {
      serviceResponse.error(400, '更新資料庫發生錯誤')
    }

    return editUser
  },
  async deleteUser (req, res, next) {}
}

module.exports = controllerUser
