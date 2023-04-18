const express = require('express')

const serviceError = require('@/services/serviceError')
const serviceResponse = require('@/services/serviceResponse')

const controllerAccount = require('@/controllers/controllerAccount')

const router = express.Router()

router.get('/', serviceError.asyncError(async (req, res, next) => {
  const result = await controllerAccount.google(req, res, next)
  serviceResponse.success(res, result)
}))
module.exports = router
