const express = require('express')
const router = express.Router()

const serviceResponse = require('@/services/serviceResponse')
const serviceError = require('@/services/serviceError')

const controllerMovieInfo = require('@/controllers/controllerMovieInfo')

router.get('/', serviceError.asyncError(async (req, res, next) => {
  const result = await controllerMovieInfo.get(req, res, next)
  serviceResponse.success(res, result)
}))

router.post('/', serviceError.asyncError(async (req, res, next) => {
  const result = await controllerMovieInfo.post(req, res, next)
  serviceResponse.success(res, result)
}))

module.exports = router
