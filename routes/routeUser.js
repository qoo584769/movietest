const express = require('express')

const serviceResponse = require('@/services/serviceResponse')
const serviceError = require('@/services/serviceError')

const middlewareAuth = require('@/middlewares/middlewareAuth')

const router = express.Router()

const controllerUser = require('@/controllers/controllerUser')
router.options('/', serviceError.asyncError(async (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'content-type')
  res.end()
}))
router.post('/signin', serviceError.asyncError(async (req, res, next) => {
  const result = await controllerUser.signin(req, res, next)
  serviceResponse.success(res, result)
}))

router.options('/signup', serviceError.asyncError(async (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'content-type')
  res.end()
}))
  .post('/signup', serviceError.asyncError(async (req, res, next) => {
    const result = await controllerUser.signup(req, res, next)
    serviceResponse.success(res, result)
  }))

router.post('/updateUser', middlewareAuth.loginAuth, serviceError.asyncError(async (req, res, next) => {
  const result = await controllerUser.updateUser(req, res, next)
  serviceResponse.success(res, result)
}))

module.exports = router
