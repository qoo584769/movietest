require('dotenv').config()
const express = require('express')
const router = express.Router()

const serviceResponse = require('@/services/serviceResponse')
const serviceError = require('@/services/serviceError')

const controllerEmail = require('@/controllers/controllerEmail')

// 寄信用
router.post('/', serviceError.asyncError(async (req, res, next) => {
  const result = await controllerEmail.sendMail(req, res, next)
  console.log(result)
  serviceResponse.success(res, result)
}))

// 重設密碼
router.post('/forgotPassword', serviceError.asyncError(async (req, res, next) => {
  const result = await controllerEmail.forgotPassword(req, res, next)
  console.log(result)
  serviceResponse.success(res, result)
}))

module.exports = router
