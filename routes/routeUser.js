const express = require('express')

const serviceResponse = require('@/services/serviceResponse')
const serviceError = require('@/services/serviceError')

const middlewareAuth = require('@/middlewares/middlewareAuth')

const router = express.Router()

const controllerUser = require('@/controllers/controllerUser')

router.post('/signin', serviceError.asyncError(async (req, res, next) => {
  const result = await controllerUser.signin(req, res, next)
  serviceResponse.success(res, result)
}))

router.post('/signup', serviceError.asyncError(async (req, res, next) => {
  const result = await controllerUser.signup(req, res, next)
  serviceResponse.success(res, result)
}))

router.post('/updateUser', middlewareAuth.loginAuth, serviceError.asyncError(async (req, res, next) => {
  const result = await controllerUser.updateUser(req, res, next)
  serviceResponse.success(res, result)
}))

module.exports = router
